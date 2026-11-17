"""Capture failure recovery without audio hardware, models or network."""
import copy
import importlib.util
import os
from pathlib import Path
import tempfile
import threading
import types
import unittest
from unittest.mock import patch

import numpy as np  # Load before temporary sys.modules isolation.


class RecordingFailureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.home = tempfile.TemporaryDirectory()
        spec = importlib.util.spec_from_file_location('recording_failures', Path(__file__).resolve().parents[1] / 'helper/voice_helper.py')
        cls.h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': cls.home.name}):
            spec.loader.exec_module(cls.h)

    @classmethod
    def tearDownClass(cls):
        cls.home.cleanup()

    def setUp(self):
        self.h.CFG = copy.deepcopy(self.h.DEFAULTS)
        self.h.CFG.update(voiceSessionId='owner', voiceSessionEpoch='epoch')
        self.h._request_context.current = None
        self.h._current_recorder = None
        # Each test models a fresh helper. A real failed native close keeps its
        # physical lease poisoned until process restart, not the next request.
        self.h._capture_device = self.h._CaptureDevice()
        self.h._threads = set()
        self.events, self.logs, self.uncaught = [], [], []
        self.entered, self.release = threading.Event(), threading.Event()
        self.streams = []
        self.stage, self.cleanup_fails = 'start', False
        self.pause, self.resume = [], []
        outer = self
        class Stream:
            def __init__(self, **kwargs):
                if outer.stage == 'construct':
                    outer.entered.set(); outer.release.wait(2)
                    raise OSError('capture-construct')
                self.stop_calls = self.close_calls = 0
                outer.streams.append(self)
            def start(self):
                if outer.stage == 'start':
                    outer.entered.set(); outer.release.wait(2)
                    raise OSError('capture-start')
            def stop(self):
                self.stop_calls += 1
                if outer.cleanup_fails: raise OSError('cleanup-stop')
            def close(self):
                self.close_calls += 1
                if outer.cleanup_fails: raise OSError('cleanup-close')
        def pull(rec):
            self.entered.set(); self.release.wait(2)
            raise OSError('capture-run')
        patches = [patch.dict('sys.modules', {'sounddevice': types.SimpleNamespace(RawInputStream=Stream)}),
                   patch.object(self.h, 'reload_cfg', lambda: True),
                   patch.object(self.h, 'device_info', lambda: {}),
                   patch.object(self.h, '_make_input_stream', lambda device, callback: Stream(device=device, callback=callback)),
                   patch.object(self.h, '_always_pause', lambda: self.pause.append(True)),
                   patch.object(self.h, '_always_resume', lambda: self.resume.append(True)),
                   patch.object(self.h, '_emit_payload', lambda event, fields: self.events.append({'event': event, **fields})),
                   patch.object(self.h, 'log', lambda message: self.logs.append(message)),
                   patch.object(self.h.Recorder, '_pull', pull),
                   patch.object(threading, 'excepthook', lambda args: self.uncaught.append(args.exc_value))]
        for item in patches:
            item.start(); self.addCleanup(item.stop)
        self.addCleanup(self.release.set)

    def complete_failure(self):
        self.assertTrue(self.entered.wait(1))
        threads = list(self.h._threads)
        self.release.set()
        for thread in threads:
            thread.join(1)
            self.assertFalse(thread.is_alive())
        self.assertEqual(self.h._threads, set())
        self.assertEqual(self.uncaught, [])

    def errors(self):
        return [event for event in self.events if event['event'] == 'error']

    def test_listen_once_capture_failures_are_correlated_and_background_start_is_not(self):
        for stage in ['construct', 'start', 'run']:
            for await_transcript in [False, True]:
                with self.subTest(stage=stage, await_transcript=await_transcript):
                    self.stage = stage
                    self.entered.clear(); self.release.clear(); self.events.clear(); self.streams.clear()
                    self.h._request_context.current = {'requestId': 'listen-request', 'lock': threading.Lock()}
                    self.h.op_start({'awaitTranscript': await_transcript})
                    self.h._request_context.current = None
                    self.complete_failure()
                    self.assertIsNone(self.h._current_recorder)
                    self.assertEqual(len(self.errors()), 1)
                    ui = [event for event in self.events if event['event'] == 'voice-input' and event['state'] == 'error']
                    self.assertEqual(len(ui), 1)
                    self.assertEqual(ui[0]['code'], 'device')
                    self.assertEqual((ui[0]['voiceSessionId'], ui[0]['voiceSessionEpoch'], ui[0]['captureId']), ('owner', 'epoch', self.h._capture_id))
                    self.assertNotIn('requestId', ui[0])
                    self.assertNotIn('message', ui[0])
                    self.assertNotIn('detail', ui[0])
                    self.assertIn('capture-' + stage, self.errors()[0]['message'])
                    self.assertEqual(self.errors()[0].get('requestId'), 'listen-request' if await_transcript else None)
                    if self.streams:
                        self.assertEqual(self.streams[0].stop_calls, 1)
                        self.assertEqual(self.streams[0].close_calls, 1)

    def test_mouse_and_keyboard_recover_after_release_without_restarting_held_key(self):
        for klass in ['mouse', 'keyboard']:
            with self.subTest(kind=klass):
                self.entered.clear(); self.release.clear(); self.events.clear(); self.streams.clear()
                p = self.h.MousePtt(2, 1) if klass == 'mouse' else self.h.KeyboardPtt({'code': 'F8', 'modifiers': []}, 1)
                p._handle_down()
                self.complete_failure()
                self.assertIsNone(self.h._current_recorder)
                self.assertFalse(p.active)
                self.assertTrue(p.held)
                p._handle_down()
                self.assertEqual(len(self.streams), 1)
                p._handle_up()
                self.entered.clear(); self.release.clear()
                p._handle_down()
                self.complete_failure()
                self.assertEqual(len(self.streams), 2)
                self.assertEqual(len(self.errors()), 2)
                self.assertFalse(any(e.get('reason') == 'busy' for e in self.events))

    def test_constructor_failure_preserves_existing_capture_and_sync_start_failures_finish(self):
        old = types.SimpleNamespace(stop_event=threading.Event())
        self.h._current_recorder = old
        with patch.object(self.h, 'Recorder', side_effect=ValueError('bad recorder config')):
            with self.assertRaisesRegex(ValueError, 'bad recorder config'): self.h.start_recording()
        self.assertIs(self.h._current_recorder, old)
        self.assertFalse(old.stop_event.is_set())
        self.assertEqual(self.pause, [])
        for target in ['input-turn', 'thread']:
            with self.subTest(target=target):
                self.h._current_recorder = None
                finished = []
                item = patch.object(self.h.InputTurn, 'start', side_effect=OSError('sync-start')) if target == 'input-turn' else patch.object(threading.Thread, 'start', side_effect=OSError('sync-start'))
                with item:
                    with self.assertRaisesRegex(OSError, 'sync-start'):
                        self.h.start_recording(on_finish=lambda rec: finished.append(rec))
                self.assertIsNone(self.h._current_recorder)
                self.assertEqual(self.h._threads, set())
                self.assertEqual(len(finished), 1)
        self.assertEqual(len(self.resume), 2)

    def test_superseded_failure_does_not_release_new_recorder_or_resume_listener(self):
        self.h.start_recording()
        self.assertTrue(self.entered.wait(1))
        new = types.SimpleNamespace(stop_event=threading.Event())
        with self.h._rec_lock:
            self.h._current_recorder = new
            self.h._gen += 1
        self.complete_failure()
        self.assertIs(self.h._current_recorder, new)
        self.assertFalse(new.stop_event.is_set())
        self.assertEqual(self.resume, [])
        self.assertEqual(self.errors(), [])
        self.assertTrue(any('capture-start' in line for line in self.logs))

    def test_stop_or_revocation_during_slow_pause_prevents_stream_open(self):
        for action in ['stop', 'revoke', 'epoch', 'capture']:
            with self.subTest(action=action):
                paused, leave_pause = threading.Event(), threading.Event()
                failures = []
                self.streams.clear(); self.release.clear(); self.resume.clear()
                self.h.CFG.update(voiceSessionId='owner', voiceSessionEpoch='epoch')
                capture_id = self.h._capture_id
                def pause():
                    paused.set(); leave_pause.wait(2)
                def start():
                    try:
                        self.h.start_recording()
                    except Exception as exc:
                        failures.append(exc)
                with patch.object(self.h, '_always_pause', pause):
                    starter = threading.Thread(target=start)
                    starter.start()
                    try:
                        self.assertTrue(paused.wait(1))
                        acquired = self.h._rec_lock.acquire(blocking=False)
                        if acquired:
                            self.h._rec_lock.release()
                        self.assertTrue(acquired, 'device I/O must not hold the stop lock')
                        if action == 'stop':
                            rec = self.h._current_recorder
                            self.h.op_stop({})
                            self.assertTrue(rec.stop_event.is_set())
                        elif action == 'revoke':
                            self.h.CFG['voiceSessionId'] = None
                        elif action == 'epoch':
                            self.h.CFG['voiceSessionEpoch'] = 'new-epoch'
                        else:
                            self.h._capture_id = 'new-capture'
                    finally:
                        leave_pause.set(); starter.join(2)
                        self.release.set()
                        for worker in list(self.h._threads):
                            worker.join(2)
                        self.h._capture_id = capture_id
                self.assertFalse(starter.is_alive())
                self.assertIsNone(self.h._current_recorder)
                self.assertEqual(self.h._threads, set())
                self.assertEqual(self.streams, [], 'cancelled startup must not open a stream')
                self.assertEqual(len(failures), 1)
                self.assertIsInstance(failures[0], RuntimeError)
                self.assertEqual(self.resume, [True] if action == 'stop' else [],
                                 'revocation must not reopen the always-on listener')

    def test_delayed_startup_pause_cannot_outlive_a_new_capture_resume(self):
        entered, leave, completed = threading.Event(), threading.Event(), threading.Event()
        pauses, state, failures = [], {'paused': False}, []
        def pause():
            pauses.append(True)
            if len(pauses) == 1:
                entered.set(); leave.wait(2)
            state['paused'] = True
        def resume():
            state['paused'] = False
        def no_speech(rec):
            rec.reason = 'no-speech'; rec.audio = np.zeros(0, dtype='float32')
            return rec.audio
        def start(new=False):
            try:
                self.h.start_recording(on_finish=(lambda rec: completed.set()) if new else None)
            except Exception as exc:
                failures.append(exc)
        with patch.object(self.h, '_always_pause', pause), \
             patch.object(self.h, '_always_resume', resume), \
             patch.object(self.h.Recorder, 'run', no_speech):
            old = threading.Thread(target=start)
            newer = threading.Thread(target=lambda: start(True))
            old.start()
            try:
                self.assertTrue(entered.wait(1))
                newer.start()
                # The second startup may safely wait, but it must never finish
                # and then have its resume undone by the first delayed pause.
                if completed.wait(.05):
                    self.assertFalse(state['paused'])
            finally:
                leave.set(); old.join(2)
                if newer.ident is not None:
                    newer.join(2)
                for worker in list(self.h._threads):
                    worker.join(2)
        self.assertFalse(old.is_alive()); self.assertFalse(newer.is_alive())
        self.assertTrue(completed.is_set())
        self.assertFalse(state['paused'])
        self.assertEqual(failures, [])
        self.assertEqual(self.h._threads, set())

    def test_failed_cleanup_preserves_capture_error_and_does_not_skip_ptt_finish(self):
        self.cleanup_fails = True
        finished = []
        with patch.object(self.h.InputTurn, 'cancel', side_effect=OSError('cue cleanup')), \
             patch.object(self.h, '_always_resume', side_effect=OSError('listener resume')):
            self.h.start_recording(on_finish=lambda rec: finished.append(rec))
            self.complete_failure()
        self.assertIsNone(self.h._current_recorder)
        self.assertEqual(len(finished), 1)
        self.assertEqual(len(self.errors()), 1)
        self.assertIn('capture-start', self.errors()[0]['message'])
        self.assertEqual(self.streams[0].stop_calls, 1)
        self.assertEqual(self.streams[0].close_calls, 1)
        for reason in ['cleanup-stop', 'cleanup-close', 'cue cleanup', 'listener resume']:
            self.assertTrue(any(reason in line for line in self.logs), reason)


    def test_recognition_failure_uses_safe_code_and_original_input_identity(self):
        private = 'PRIVATE recognized words /user/private/model'
        def run(rec):
            rec.audio = np.ones(self.h.SR, dtype='float32')
            rec.reason = 'stopped'
            rec.input_turn.voiced(1000)
            return rec.audio
        with patch.object(self.h.Recorder, 'run', run), patch.object(self.h, 'full_result', side_effect=RuntimeError(private)):
            rec = self.h.start_recording()
            for thread in list(self.h._threads):
                thread.join(1)
        ui = [event for event in self.events if event['event'] == 'voice-input' and event['state'] == 'error']
        self.assertEqual(len(ui), 1)
        self.assertEqual((ui[0]['code'], ui[0]['inputTurnId']), ('recognition', rec.input_turn.id))
        self.assertNotIn(private, str(ui))

    def test_listener_open_failure_keeps_captured_grant_without_claiming_capture_started(self):
        listener = self.h.AlwaysListener('always', 'listener-capture')
        def start():
            self.h.CFG['voiceSessionEpoch'] = 'new-epoch'
            raise OSError('PRIVATE device path')
        stream = types.SimpleNamespace(start=start, close=lambda: None)
        with patch.object(self.h, '_make_input_stream', return_value=stream):
            with self.assertRaises(OSError):
                listener._open_stream()
        ui = [event for event in self.events if event['event'] == 'voice-input']
        self.assertEqual([event['state'] for event in ui], ['attempt', 'error'])
        self.assertEqual(ui[-1]['code'], 'device')
        self.assertEqual((ui[-1]['voiceSessionEpoch'], ui[-1]['captureId']), ('epoch', 'listener-capture'))
        self.assertNotIn('PRIVATE', str(ui))

    def test_revoked_capture_failure_does_not_publish_safe_error_into_new_grant(self):
        self.h.start_recording()
        self.assertTrue(self.entered.wait(1))
        self.h.CFG['voiceSessionEpoch'] = 'new-epoch'
        self.complete_failure()
        self.assertFalse(any(event.get('state') == 'error' for event in self.events if event['event'] == 'voice-input'))


class RecordingCancellationTests(unittest.TestCase):
    """The real PTT pipeline, with only capture/model/device work substituted."""
    @classmethod
    def setUpClass(cls):
        cls.home = tempfile.TemporaryDirectory()
        spec = importlib.util.spec_from_file_location('recording_cancel', Path(__file__).resolve().parents[1] / 'helper/voice_helper.py')
        cls.h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': cls.home.name}):
            spec.loader.exec_module(cls.h)

    @classmethod
    def tearDownClass(cls):
        cls.home.cleanup()

    def setUp(self):
        h = self.h
        h.CFG = copy.deepcopy(h.DEFAULTS)
        h.CFG.update(voiceSessionId='owner', voiceSessionEpoch='epoch',
                     pttKeyboard={'code': 'F8', 'modifiers': []}, retainRecordings=True)
        h._current_recorder = None
        h._request_context.current = None
        h._threads = set()
        self.events = []
        self.capture, self.inference, self.entered = threading.Event(), threading.Event(), threading.Event()
        self.fail_inference = False
        def run(rec):
            if not self.capture.wait(2): raise AssertionError('capture barrier expired')
            rec.reason = 'max-seconds'
            rec.audio = np.ones(h.SR, dtype='float32')
            rec.input_turn.voiced(1000)
            return rec.audio
        def result(audio, is_current=None):
            self.entered.set()
            if not self.inference.wait(2): raise AssertionError('ASR barrier expired')
            if self.fail_inference: raise ValueError('late ASR failure')
            return {'event': 'transcript', 'text': '请帮我查看这个文件'}
        patches = [patch.object(h, 'reload_cfg', return_value=True),
                   patch.object(h, '_always_pause'), patch.object(h, '_always_resume'),
                   patch.object(h, 'log'), patch.object(h.Recorder, 'run', run),
                   patch.object(h, 'full_result', result), patch.object(h, 'save_recording'),
                   patch.object(h, '_emit_payload', lambda event, fields: self.events.append({'event': event, **fields}))]
        for item in patches:
            value = item.start(); self.addCleanup(item.stop)
            if item.attribute == 'save_recording': self.save = value
        self.addCleanup(self.finish_workers)
        self.ptt = h.KeyboardPtt({'code': 'F8', 'modifiers': []}, 1)
        self.ptt.foreground = lambda: 123

    def finish_workers(self):
        self.capture.set(); self.inference.set()
        for thread in list(self.h._threads):
            thread.join(2)
            self.assertFalse(thread.is_alive())

    def processing(self):
        self.ptt._handle_down()
        rec = self.ptt.rec
        self.capture.set()
        self.assertTrue(self.entered.wait(1))
        self.assertIsNone(self.h._current_recorder)
        self.assertTrue(self.ptt.active)
        return rec

    def cancel(self, kind):
        if kind == 'escape':
            self.ptt._on_key_event(self.h.WM_KEYDOWN, 0x1B)
            action = self.ptt.events.get_nowait()
            self.assertEqual(action, 'escape')
            self.ptt._cancel(action)
        else:
            self.ptt.foreground = lambda: 456
            self.ptt._check_hold()

    def assert_cancelled_input(self, kind):
        rec = self.processing()
        self.cancel(kind)
        self.h.release_recorder(cancel=True, reason='duplicate-cancel', expected=rec)
        self.finish_workers()
        self.assertEqual([e['state'] for e in self.events if e['event'] == 'voice-input'], ['start', 'end', 'cancel'])
        self.assertFalse(any(e['event'] in ('transcript', 'error') for e in self.events))
        self.save.assert_not_called()

    def test_escape_cancels_after_capture_before_asr_finishes(self):
        self.assert_cancelled_input('escape')

    def test_focus_change_cancels_after_capture_before_asr_finishes(self):
        self.assert_cancelled_input('focus')

    def test_cancelled_inference_exception_stays_diagnostic_only(self):
        self.processing(); self.fail_inference = True
        self.cancel('escape'); self.finish_workers()
        self.assertFalse(any(e['event'] in ('transcript', 'error') for e in self.events))
        self.save.assert_not_called()

    def test_cancel_after_final_authorization_read_suppresses_output_and_retention(self):
        self.processing()
        with patch.object(self.h, 'reload_cfg', side_effect=lambda: (self.cancel('escape'), True)[1]):
            self.finish_workers()
        self.assertFalse(any(e['event'] in ('transcript', 'error') for e in self.events))
        self.save.assert_not_called()

    def test_cancel_during_started_retention_still_blocks_final_protocol_result(self):
        # A file write already started cannot be recalled; cancellation still
        # wins the protocol commit that follows it and clears the pending cue.
        self.processing()
        with patch.object(self.h, 'save_recording', side_effect=lambda *args: self.cancel('escape')):
            self.finish_workers()
        self.assertFalse(any(e['event'] in ('transcript', 'error') for e in self.events))
        self.assertEqual([e['state'] for e in self.events if e['event'] == 'voice-input'], ['start', 'end', 'cancel'])

    def test_old_cancel_preserves_new_capture_generation_and_result(self):
        old = self.processing()
        # Keep a new actual capture pending while cancelling the old ASR owner.
        self.capture.clear(); self.entered.clear()
        new = self.h.start_recording()
        generation = self.h._gen
        self.cancel('escape')
        self.assertIs(self.h._current_recorder, new)
        self.assertFalse(new.stop_event.is_set())
        self.assertEqual(self.h._gen, generation)
        self.finish_workers()
        transcripts = [e for e in self.events if e['event'] == 'transcript']
        self.assertEqual([e['inputTurnId'] for e in transcripts], [new.input_turn.id])
        self.assertNotEqual(old.input_turn.id, new.input_turn.id)
        self.assertEqual(self.save.call_count, 1)

    def test_successful_finished_input_does_not_emit_cleanup_cancel(self):
        self.processing(); self.finish_workers()
        self.assertEqual([e['state'] for e in self.events if e['event'] == 'voice-input'], ['start', 'end'])
        self.assertEqual(len([e for e in self.events if e['event'] == 'transcript']), 1)


if __name__ == '__main__':
    unittest.main()
