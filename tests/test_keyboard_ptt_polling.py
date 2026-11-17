"""Real hook-event queue/worker/Recorder with synthetic audio and finite barriers.

No Windows hooks, microphone, model or network. WHALE_HELPER_SOURCE can point
at an older helper to reproduce the queued-keyup polling regression.
"""
import copy
import importlib.util
import os
from pathlib import Path
import sys
import tempfile
import threading
import time
import types
import unittest
from contextlib import ExitStack
from unittest.mock import patch

import numpy as np


class KeyboardPttPollingTests(unittest.TestCase):
    def setUp(self):
        self.stack = ExitStack()
        self.addCleanup(self.stack.close)
        home = self.stack.enter_context(tempfile.TemporaryDirectory())
        source = os.environ.get('WHALE_HELPER_SOURCE') or Path(__file__).resolve().parents[1] / 'helper/voice_helper.py'
        spec = importlib.util.spec_from_file_location('keyboard_ptt_polling', source)
        self.h = h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': home}):
            spec.loader.exec_module(h)
        h.CFG = copy.deepcopy(h.DEFAULTS)
        h.CFG.update(voiceSessionId='owner', voiceSessionEpoch='epoch',
                     pttKeyboard={'code': 'F8', 'modifiers': []}, device=0)
        self.events, self.streams, self.workers = [], [], []
        self.physical = {'key': False, 'modifier': True, 'window': 123}
        self.poll_armed = False
        self.poll_entered, self.poll_release = threading.Event(), threading.Event()
        self.poll_worker = None
        outer = self

        class Stream:
            def __init__(self, **kwargs):
                self.callback = kwargs['callback']
                self.device = kwargs['device']
                self.closed = False
                self.overlapped = any(not stream.closed for stream in outer.streams)
                outer.streams.append(self)
            def start(self):
                # Silence establishes the production VAD noise floor, then a
                # finite voiced block makes normal key-up eligible to submit.
                audio = np.concatenate([np.zeros(h.FRAME * 10), np.full(h.FRAME * 30, .2)]).astype('float32')
                self.callback(audio.tobytes(), len(audio), None, None)
            def stop(self):
                pass
            def close(self):
                self.closed = True

        def reload_cfg():
            # Only the PTT worker's next periodic check is delayed. Capture,
            # ASR and hook callback continue as separate production threads.
            if threading.current_thread() is self.poll_worker and self.poll_armed:
                self.poll_armed = False
                self.poll_entered.set()
                if not self.poll_release.wait(3):
                    raise AssertionError('test poll barrier expired')
            return True

        for item in [patch.dict(sys.modules, {'sounddevice': types.SimpleNamespace(RawInputStream=Stream)}),
                     patch.object(h, 'reload_cfg', reload_cfg),
                     patch.object(h, '_make_input_stream', lambda device, callback: Stream(device=device, callback=callback)),
                     patch.object(h, 'device_info', return_value={}), patch.object(h, 'log'),
                     patch.object(h, '_emit_payload', lambda event, fields: self.events.append({'event': event, **fields})),
                     patch.object(h, 'asr_sensevoice', return_value={'text': '请帮我检查文件'}),
                     patch.object(h, 'prosody', return_value={})]:
            self.stack.enter_context(item)
        self.keyboard = h.KeyboardPtt(h.CFG['pttKeyboard'], 15)
        self.keyboard.foreground = lambda: self.physical['window']
        self.keyboard.key_pressed = lambda: self.physical['key']
        self.keyboard.modifiers_pressed = lambda: self.physical['modifier']
        self.controls = [self.keyboard]
        self.addCleanup(self.cleanup_workers)

    def wait_for(self, predicate, timeout=2):
        deadline = time.monotonic() + timeout
        while not predicate() and time.monotonic() < deadline:
            time.sleep(.002)
        self.assertTrue(predicate(), 'condition was not reached')

    def start_worker(self, control):
        worker = threading.Thread(target=control._worker_loop, daemon=True)
        self.workers.append(worker)
        if control is self.keyboard:
            self.poll_worker = worker
        worker.start()
        return worker

    def configure_modifier(self):
        self.h.CFG['pttKeyboard'] = {'code': 'F8', 'modifiers': ['Control']}
        self.keyboard.binding = dict(self.h.CFG['pttKeyboard'])
        self.keyboard._on_key_event(self.h.WM_KEYDOWN, 0xA2)

    def key_down(self):
        self.physical['key'] = True
        self.keyboard._on_key_event(self.h.WM_KEYDOWN, self.keyboard.vk)

    def key_up(self, deliver=True):
        self.physical['key'] = False
        if deliver:
            self.keyboard._on_key_event(self.h.WM_KEYUP, self.keyboard.vk)

    def modifier_up(self, deliver=True):
        self.physical['modifier'] = False
        if deliver:
            self.keyboard._on_key_event(self.h.WM_KEYUP, 0xA2)

    def recording(self):
        rec = self.h._current_recorder
        return rec is not None and rec.input_turn.last_voiced_at is not None

    def begin_recording(self, modifier=False):
        if modifier:
            self.configure_modifier()
        self.start_worker(self.keyboard)
        self.key_down()
        self.wait_for(self.recording)
        return self.h._current_recorder

    def block_poll(self):
        self.poll_armed = True
        self.assertTrue(self.poll_entered.wait(2), 'worker did not enter periodic hold check')

    def finish_capture(self):
        self.wait_for(lambda: not self.h._threads and self.keyboard.events.empty())
        self.assertTrue(all(stream.closed for stream in self.streams))
        self.assertFalse(any(stream.overlapped for stream in self.streams))

    def transcripts(self):
        return [event for event in self.events if event['event'] == 'transcript']

    def cancels(self):
        return [event for event in self.events if event['event'] == 'voice-input' and event['state'] == 'cancel']

    def cleanup_workers(self):
        self.poll_release.set()
        for control in self.controls:
            control.stop()
        self.h.release_recorder(cancel=True)
        for worker in self.workers + list(self.h._threads):
            worker.join(3)
            self.assertFalse(worker.is_alive(), 'test worker did not finish')

    def assert_queued_release_submits(self, modifier=False):
        rec = self.begin_recording(modifier)
        self.block_poll()
        (self.modifier_up if modifier else self.key_up)()
        self.assertFalse(self.keyboard.events.empty(), 'the real release must already be queued')
        self.poll_release.set()
        self.finish_capture()
        self.assertEqual([event['inputTurnId'] for event in self.transcripts()], [rec.input_turn.id])
        self.assertEqual(self.cancels(), [])
        self.assertEqual(self.keyboard.held, modifier)
        if modifier:
            # The primary remains latched after modifier release. Neither
            # repeat nor restoring the modifier may reopen until primary up.
            self.physical['modifier'] = True
            self.keyboard._on_key_event(self.h.WM_KEYDOWN, 0xA2)
            self.key_down()
            time.sleep(.06)
            self.assertEqual(len(self.streams), 1)
            self.key_up()
            self.wait_for(lambda: not self.keyboard.held)
        self.key_down()
        self.wait_for(lambda: len(self.streams) == 2 and self.recording())
        self.key_up()
        self.finish_capture()
        self.assertEqual(len(self.transcripts()), 2)

    def test_primary_keyup_queued_during_poll_submits_once_and_next_press_works(self):
        self.assert_queued_release_submits()

    def test_modifier_release_queued_during_poll_submits_once_and_keeps_latch(self):
        self.assert_queued_release_submits(modifier=True)

    def test_genuinely_missing_primary_or_modifier_release_still_cancels(self):
        for modifier in (False, True):
            with self.subTest(modifier=modifier):
                case = KeyboardPttPollingTests(); case.setUp()
                try:
                    case.begin_recording(modifier)
                    (case.modifier_up if modifier else case.key_up)(deliver=False)
                    case.finish_capture()
                    self.assertEqual([event['reason'] for event in case.cancels()], ['key-up-missed'])
                    self.assertEqual(case.transcripts(), [])
                finally:
                    case.doCleanups()

    def test_queued_release_never_overrides_context_withdrawal(self):
        for change in ('epoch', 'focus', 'binding', 'escape', 'stop'):
            with self.subTest(change=change):
                case = KeyboardPttPollingTests(); case.setUp()
                try:
                    case.begin_recording(); case.block_poll()
                    if change == 'epoch':
                        case.h.CFG['voiceSessionEpoch'] = 'new-epoch'
                    elif change == 'focus':
                        case.physical['window'] = 456
                    elif change == 'binding':
                        case.h.CFG['pttKeyboard'] = None
                    elif change == 'escape':
                        case.keyboard._on_key_event(case.h.WM_KEYDOWN, 0x1B)
                    else:
                        case.keyboard.stop()
                    case.key_up(); case.poll_release.set()
                    # A stopped worker deliberately leaves its queue untouched.
                    case.wait_for(lambda: not case.h._threads)
                    self.assertEqual(case.transcripts(), [])
                    self.assertEqual(len(case.cancels()), 1)
                    self.assertTrue(all(stream.closed for stream in case.streams))
                finally:
                    case.doCleanups()

    def test_queued_up_then_new_down_keeps_new_recording_owned_and_live(self):
        first = self.begin_recording()
        asr_entered, asr_release = threading.Event(), threading.Event()
        old_workers = []

        def blocked_asr(audio):
            old_workers.append(threading.current_thread())
            asr_entered.set()
            if not asr_release.wait(3):
                raise AssertionError('test old ASR barrier expired')
            return {'text': '旧录音的迟到结果'}

        with patch.object(self.h, 'asr_sensevoice', blocked_asr):
            try:
                self.block_poll()
                self.key_up(); self.poll_release.set()
                self.assertTrue(asr_entered.wait(2), 'old take did not reach ASR')
                self.key_down()
                self.wait_for(lambda: len(self.streams) == 2 and self.recording())
                newer = self.keyboard.rec
                self.assertIsNot(newer, first)
                self.assertIs(self.h._current_recorder, newer)
                self.assertFalse(newer.stop_event.is_set())
                # Old ASR cannot commit before the new capture owns the slot.
                # Joining its actual worker also proves on_finish has returned.
                asr_release.set()
                old_workers[0].join(2)
                self.assertFalse(old_workers[0].is_alive(), 'old finish callback did not complete')
                self.assertIs(self.keyboard.rec, newer)
                self.assertTrue(self.keyboard.active)
                self.assertFalse(newer.stop_event.is_set())
                self.assertEqual(self.transcripts(), [])
            finally:
                asr_release.set()
        self.key_up(); self.finish_capture()
        self.assertEqual([event['inputTurnId'] for event in self.transcripts()], [newer.input_turn.id])

    def test_pending_keyboard_release_cannot_stop_mouse_that_was_already_busy(self):
        mouse = self.h.MousePtt(2, 15); self.controls.append(mouse)
        self.start_worker(mouse); self.start_worker(self.keyboard)
        mouse._on_hook_event(self.h.WM_XBUTTONDOWN)
        self.wait_for(self.recording)
        owned = self.h._current_recorder
        self.key_down()
        self.wait_for(lambda: self.keyboard.held and self.keyboard.events.empty())
        self.assertFalse(self.keyboard.active)
        self.key_up()
        self.wait_for(lambda: not self.keyboard.held)
        self.assertIs(self.h._current_recorder, owned)
        self.assertFalse(owned.stop_event.is_set())
        mouse._on_hook_event(self.h.WM_XBUTTONUP)
        self.finish_capture()
        self.assertEqual([event['inputTurnId'] for event in self.transcripts()], [owned.input_turn.id])

    def test_mouse_release_during_keyboard_poll_cannot_stop_keyboard(self):
        owned = self.begin_recording()
        mouse = self.h.MousePtt(2, 15); self.controls.append(mouse); self.start_worker(mouse)
        mouse._on_hook_event(self.h.WM_XBUTTONDOWN)
        self.wait_for(lambda: mouse.held and mouse.events.empty())
        self.assertFalse(mouse.active)
        self.block_poll()
        mouse._on_hook_event(self.h.WM_XBUTTONUP)
        self.wait_for(lambda: not mouse.held)
        self.assertFalse(owned.stop_event.is_set())
        self.key_up(); self.poll_release.set(); self.finish_capture()
        self.assertEqual([event['inputTurnId'] for event in self.transcripts()], [owned.input_turn.id])

    def test_device_change_while_held_applies_only_to_next_recording(self):
        self.begin_recording()
        self.h.CFG['device'] = 7
        self.key_up(); self.finish_capture()
        self.key_down()
        self.wait_for(lambda: len(self.streams) == 2 and self.recording())
        self.key_up(); self.finish_capture()
        self.assertEqual([stream.device for stream in self.streams], [0, 7])
        self.assertEqual(len(self.transcripts()), 2)


if __name__ == '__main__':
    unittest.main()
