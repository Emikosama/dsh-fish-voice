"""Live inference pressure regressions: real capture/PTT/segment pipelines.

Only audio hardware, native model work, configuration I/O and protocol output
are substituted. No real-model performance or device acceptance is claimed.
WHALE_HELPER_SOURCE can point at a baseline helper to reproduce the failures.
"""
import copy
import importlib.util
import os
from pathlib import Path
import tempfile
import threading
import time
import unittest
from contextlib import ExitStack
from unittest.mock import patch

import numpy as np


class LiveInferenceTests(unittest.TestCase):
    def setUp(self):
        self.stack = ExitStack()
        self.addCleanup(self.stack.close)
        home = self.stack.enter_context(tempfile.TemporaryDirectory())
        source = os.environ.get('WHALE_HELPER_SOURCE') or Path(__file__).resolve().parents[1] / 'helper/voice_helper.py'
        spec = importlib.util.spec_from_file_location('live_inference_test', source)
        self.h = h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': home}):
            spec.loader.exec_module(h)
        h.CFG = copy.deepcopy(h.DEFAULTS)
        h.CFG.update(voiceSessionId='owner', voiceSessionEpoch='epoch')
        self.events, self.captures, self.calls, self.speakers, self.prosodies = [], [], [], [], []
        self.release = threading.Event()
        self.changed = threading.Condition()
        self.extra_threads = []
        self.fail_inference = False

        def capture(rec):
            with self.changed:
                rec.test_id = len(self.captures) + 1
                rec.test_worker = threading.current_thread()
                self.captures.append(rec)
                self.changed.notify_all()
            if not rec.stop_event.wait(3):
                raise AssertionError('test did not release capture')
            rec.reason = 'stopped'
            rec.audio = self.audio(rec.test_id)
            return rec.audio

        def model(audio):
            with self.changed:
                self.calls.append(self.audio_id(audio))
                self.changed.notify_all()
            if not self.release.wait(3):
                raise AssertionError('test did not release native ASR')
            if self.fail_inference:
                raise ValueError('synthetic inference failure')
            return {'text': '第%d句有效短句' % self.audio_id(audio), 'lang': 'zh'}

        def identify(audio):
            self.speakers.append(self.audio_id(audio))
            return 0.9, True, 'owner'

        def prosody(audio, *_args):
            self.prosodies.append(self.audio_id(audio))
            return {}

        for item in [patch.object(h, 'reload_cfg', return_value=True),
                     patch.object(h, 'log'), patch.object(h, 'device_info', return_value={}),
                     patch.object(h, '_always_pause'), patch.object(h, '_always_resume'),
                     patch.object(h, '_emit_payload', lambda event, fields: self.events.append({'event': event, **fields})),
                     patch.object(h.Recorder, 'run', capture),
                     patch.object(h, 'asr_sensevoice', model),
                     patch.object(h, 'identify', identify), patch.object(h, 'prosody', prosody)]:
            self.stack.enter_context(item)
        self.addCleanup(self.finish)

    def audio(self, identifier):
        return np.sin(np.arange(self.h.SR + identifier) * .1).astype('float32')

    def audio_id(self, audio):
        return len(audio) - self.h.SR

    def wait_for(self, predicate):
        deadline = time.monotonic() + 1
        while not predicate() and time.monotonic() < deadline:
            time.sleep(.002)
        self.assertTrue(predicate(), 'condition was not reached')

    def finish(self):
        for rec in self.captures:
            rec.stop_event.set()
        self.release.set()
        for worker in list(self.h._threads) + self.extra_threads:
            worker.join(2)
            self.assertFalse(worker.is_alive(), 'worker did not clean up')

    def start(self, ptt=None, **kwargs):
        count = len(self.captures)
        if ptt:
            ptt._handle_down()
        else:
            self.h.start_recording(**kwargs)
        self.wait_for(lambda: len(self.captures) == count + 1)
        return self.captures[-1]

    def stop(self, rec, ptt=None):
        if ptt:
            ptt._handle_up()
        else:
            self.h.release_recorder(expected=rec)
        self.wait_for(lambda: rec.audio is not None and self.h._current_recorder is None)

    def transcripts(self):
        return [e for e in self.events if e['event'] == 'transcript']

    def listener_segment(self, listener, identifier):
        thread = threading.Thread(target=listener._handle_segment,
                                  args=(self.audio(identifier), listener._settings()), daemon=True)
        self.extra_threads.append(thread)
        thread.start()
        return thread

    def test_repeated_ptt_runs_first_and_latest_only(self):
        self.stack.enter_context(patch.object(self.h, 'speaker_verification_enabled', return_value=True))
        ptt = self.h.MousePtt(2, 15)
        for ordinal in range(1, 9):
            rec = self.start(ptt)
            if ordinal > 2:
                self.captures[-2].test_worker.join(.3)
            self.stop(rec, ptt)
            if ordinal == 1:
                self.wait_for(lambda: self.calls == [1])
        self.assertEqual(self.calls, [1])
        self.assertEqual(sum(t.is_alive() for t in self.h._threads), 2)
        self.finish()
        self.assertEqual(self.calls, [1, 8])
        self.assertEqual([e['text'] for e in self.transcripts()], ['第8句有效短句'])
        self.assertEqual(self.speakers, [8])
        self.assertEqual(self.prosodies, [8])

    def test_new_capture_releases_old_waiter_before_key_up(self):
        first = self.start(); self.stop(first)
        self.wait_for(lambda: self.calls == [1])
        second = self.start(); self.stop(second)
        third = self.start()
        second.test_worker.join(.3)
        self.assertFalse(second.test_worker.is_alive())
        self.assertIs(self.h._current_recorder, third)
        self.assertFalse(third.stop_event.is_set())
        self.assertEqual(self.calls, [1])
        self.h.release_recorder(cancel=True, expected=third)
        self.finish()
        self.assertEqual(self.calls, [1])
        self.assertFalse(self.transcripts())

    def test_withdrawn_waiter_never_runs_after_native_finishes(self):
        for change in ('cancel', 'revoke', 'epoch', 'capture'):
            with self.subTest(change=change):
                # Each scenario has its own production helper and gate.
                case = LiveInferenceTests(); case.setUp()
                try:
                    h = case.h
                    first = case.start(); case.stop(first)
                    case.wait_for(lambda: case.calls == [1])
                    second = case.start(); case.stop(second)
                    if change == 'cancel': h.release_recorder(cancel=True, expected=second)
                    elif change == 'revoke': h.CFG['voiceSessionId'] = None
                    elif change == 'epoch': h.CFG['voiceSessionEpoch'] = 'new-epoch'
                    else: h._capture_id = 'new-capture'
                    second.test_worker.join(.5)
                    self.assertFalse(second.test_worker.is_alive())
                    case.finish()
                    self.assertEqual(case.calls, [1])
                    self.assertFalse(case.transcripts())
                    self.assertFalse(case.prosodies)
                finally:
                    case.doCleanups()

    def test_cancelling_waiter_does_not_release_running_native_token(self):
        first = self.start(); self.stop(first)
        self.wait_for(lambda: self.calls == [1])
        second = self.start(); self.stop(second)
        self.h.release_recorder(cancel=True, expected=second)
        second.test_worker.join(.3)
        third = self.start(); self.stop(third)
        self.assertEqual(self.calls, [1])
        self.finish()
        self.assertEqual(self.calls, [1, 3])
        self.assertEqual([e['text'] for e in self.transcripts()], ['第3句有效短句'])

    def test_listener_stop_pause_and_restart_share_live_gate(self):
        first = self.h.AlwaysListener(capture_id='first')
        self.listener_segment(first, 101)
        self.wait_for(lambda: self.calls == [101])
        first.stop(wait_s=.01)
        for identifier in range(102, 108):
            listener = self.h.AlwaysListener(capture_id=str(identifier))
            worker = self.listener_segment(listener, identifier)
            # Wait until its reservation is observable, then pause/stop it.
            self.wait_for(lambda: listener._inference_token is not None)
            if identifier % 2: listener.pause()
            else: listener.stop(wait_s=.01)
            worker.join(.3)
            self.assertFalse(worker.is_alive())
        latest = self.h.AlwaysListener(capture_id='latest')
        self.listener_segment(latest, 108)
        self.wait_for(lambda: latest._inference_token is not None)
        self.assertEqual(self.calls, [101])
        # Unmodified callback keeps the existing 20-second buffer bound.
        for _ in range(25): latest._callback(self.audio(0).tobytes(), self.h.SR, None, None)
        self.assertLessEqual(latest._block_bytes, self.h.SR * 4 * 20)
        self.finish()
        self.assertEqual(self.calls, [101, 108])
        self.assertEqual(self.prosodies, [108])
        self.assertEqual([e['text'] for e in self.transcripts()], ['第108句有效短句'])

    def test_listener_to_ptt_never_overlaps_native_work(self):
        listener = self.h.AlwaysListener(capture_id='listener')
        self.listener_segment(listener, 101)
        self.wait_for(lambda: self.calls == [101])
        with patch.object(self.h, '_always_pause', listener.pause):
            rec = self.start(); self.stop(rec)
        self.assertTrue(listener.paused.is_set())
        self.assertEqual(self.calls, [101])
        self.finish()
        self.assertEqual(self.calls, [101, 1])
        self.assertEqual([e['text'] for e in self.transcripts()], ['第1句有效短句'])

    def test_exception_releases_gate_for_next_capture(self):
        self.fail_inference = True; self.release.set()
        rec = self.start(); self.stop(rec); rec.test_worker.join(1)
        self.assertFalse(rec.test_worker.is_alive())
        self.assertEqual(len([e for e in self.events if e['event'] == 'error']), 1)
        self.fail_inference = False
        rec = self.start(); self.stop(rec); rec.test_worker.join(1)
        self.assertEqual(self.calls, [1, 2])
        self.assertEqual(len(self.transcripts()), 1)

    def test_file_and_on_done_paths_do_not_wait_for_live_gate(self):
        rec = self.start(); self.stop(rec)
        self.wait_for(lambda: self.calls == [1])
        # Explicit file transcription still starts while live native work is
        # running, with its own request result and no live identity predicate.
        path = Path(self.stack.enter_context(tempfile.TemporaryDirectory())) / 'audio.wav'
        path.touch()
        with patch.object(self.h, 'decode_file', return_value=self.audio(201)):
            self.h.op_transcribe({'path': str(path)})
            self.wait_for(lambda: self.calls == [1, 201])
        completed = threading.Event()
        enrollment = self.start(tag='enroll', on_done=lambda _rec, _audio: completed.set())
        self.stop(enrollment)
        self.assertTrue(completed.wait(.3))
        self.finish()
        result, = self.transcripts()
        self.assertEqual(result['path'], str(path))
        self.assertEqual(result['text'], '第201句有效短句')
        self.assertEqual(self.prosodies, [201])


if __name__ == '__main__':
    unittest.main()
