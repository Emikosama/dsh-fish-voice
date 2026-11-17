"""Production capture lifecycle with finite fake-device barriers, no audio hardware."""
import copy
import importlib.util
import os
from pathlib import Path
import tempfile
import threading
import time
import types
import unittest
from contextlib import ExitStack
from unittest.mock import patch

import numpy as np


class CaptureDeviceOwnershipTests(unittest.TestCase):
    def setUp(self):
        self.stack = ExitStack()
        self.addCleanup(self.stack.close)
        home = self.stack.enter_context(tempfile.TemporaryDirectory())
        spec = importlib.util.spec_from_file_location('capture_ownership', Path(__file__).resolve().parents[1] / 'helper/voice_helper.py')
        self.h = h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': home}):
            spec.loader.exec_module(h)
        h.CFG = copy.deepcopy(h.DEFAULTS)
        h.CFG.update(voiceSessionId='owner', voiceSessionEpoch='epoch')
        self.events, self.streams, self.errors = [], [], []
        self.barriers, self.workers = [], []
        self.constructed, self.started = threading.Event(), threading.Event()
        self.close_entered, self.close_release = threading.Event(), threading.Event()
        self.block_close = True
        self.fail_construct = self.fail_start = self.fail_stop = self.fail_close = False
        self.construct_hook = self.start_hook = lambda: None
        outer = self

        class Stream:
            def __init__(self, **kwargs):
                if outer.fail_construct:
                    raise OSError('construct-failed')
                self.index = len(outer.streams)
                self.callback = kwargs['callback']
                self.closed = False
                self.start_calls = self.stop_calls = self.close_calls = 0
                outer.streams.append(self)
                if any(not stream.closed for stream in outer.streams[:-1]):
                    outer.errors.append('overlapping native streams')
                outer.constructed.set()
                outer.construct_hook()
            def start(self):
                self.start_calls += 1
                outer.start_hook()
                if outer.fail_start:
                    raise OSError('start-failed')
                outer.started.set()
            def stop(self):
                self.stop_calls += 1
                if outer.fail_stop:
                    raise OSError('stop-failed')
            def close(self):
                self.close_calls += 1
                if self.index == 0 and outer.block_close:
                    outer.close_entered.set()
                    if not outer.close_release.wait(5):
                        raise AssertionError('test close barrier not released')
                if outer.fail_close:
                    raise OSError('close-failed')
                self.closed = True

        self.stack.enter_context(patch.dict('sys.modules', {'sounddevice': types.SimpleNamespace(RawInputStream=Stream)}))
        self.stack.enter_context(patch.object(h, 'reload_cfg', return_value=True))
        self.stack.enter_context(patch.object(h, 'device_info', return_value={}))
        self.stack.enter_context(patch.object(h, '_make_input_stream', lambda device, callback: Stream(device=device, callback=callback)))
        self.stack.enter_context(patch.object(h, 'log'))
        self.stack.enter_context(patch.object(h, '_emit_payload', lambda event, fields: self.events.append({'event': event, **fields})))
        self.stack.enter_context(patch.object(h, 'full_result', return_value={'error': 'empty test audio'}))
        self.addCleanup(self.cleanup_workers)

    def cleanup_workers(self):
        self.close_release.set()
        for barrier in self.barriers:
            barrier.set()
        self.h.release_recorder(cancel=True)
        if self.h._always is not None:
            self.h._always.stop_event.set()
        for worker in self.workers + list(self.h._threads):
            worker.join(3)
            self.assertFalse(worker.is_alive(), 'test worker did not finish')

    def wait_until(self, condition, timeout=1):
        deadline = time.monotonic() + timeout
        while not condition() and time.monotonic() < deadline:
            time.sleep(.005)
        self.assertTrue(condition())

    def begin_closing_ptt(self, klass='mouse'):
        ptt = self.h.MousePtt(2, 15) if klass == 'mouse' else self.h.KeyboardPtt({'code': 'F8', 'modifiers': []}, 15)
        ptt._handle_down()
        self.assertTrue(self.started.wait(1))
        ptt._handle_up()
        self.assertTrue(self.close_entered.wait(1))
        return ptt

    def test_missing_endpoint_before_native_construct_releases_lease_and_reports_stop(self):
        recorder = self.h.Recorder()
        with patch.object(self.h, '_make_input_stream', side_effect=RuntimeError('INPUT_DEVICE_UNAVAILABLE')):
            with self.assertRaisesRegex(RuntimeError, 'INPUT_DEVICE_UNAVAILABLE'):
                recorder.run()
        self.assertTrue(recorder.stop_event.is_set())
        self.assertEqual(self.h._capture_device.status(), {'state': 'released'})
        self.assertIsNone(recorder.stream)

    def test_failed_constructor_cleanup_cannot_report_a_released_capture_lease(self):
        recorder = self.h.Recorder()
        with patch.object(self.h, '_make_input_stream', side_effect=self.h._CaptureCloseUnconfirmed('failed constructor cleanup')):
            with self.assertRaises(self.h._CaptureCloseUnconfirmed):
                recorder.run()
        self.assertEqual(self.h._capture_device.status(), {'state': 'close-unconfirmed'})
        self.assertIsNone(recorder.stream)

    def test_next_ptt_waits_for_real_close_without_blocking_key_handler(self):
        ptt = self.begin_closing_ptt()
        before = time.monotonic()
        ptt._handle_down()
        self.assertLess(time.monotonic() - before, .25)
        newer = ptt.rec
        time.sleep(.1)
        self.assertEqual(len(self.streams), 1, 'second native constructor ran before first close completed')
        self.close_release.set()
        self.wait_until(lambda: len(self.streams) == 2)
        self.assertIs(ptt.rec, newer, 'old finish must not clear the newer PTT')
        self.assertTrue(ptt.active)
        self.assertEqual(self.errors, [])
        ptt._handle_up()

    def test_waiting_key_release_does_not_open_later_and_new_press_can_continue(self):
        ptt = self.begin_closing_ptt('keyboard')
        ptt._handle_down()
        cancelled = ptt.rec
        ptt._handle_up()
        self.assertTrue(cancelled.stop_event.is_set())
        ptt._handle_down()
        latest = ptt.rec
        self.close_release.set()
        self.wait_until(lambda: len(self.streams) == 2)
        self.assertIs(ptt.rec, latest)
        self.assertIsNone(cancelled.stream)
        self.assertEqual(self.errors, [])
        ptt._handle_up()

    def test_wait_timeout_keeps_physical_lease_until_native_close_finishes(self):
        self.stack.enter_context(patch.object(self.h, 'CAPTURE_DEVICE_WAIT_S', .12, create=True))
        ptt = self.begin_closing_ptt()
        ptt._handle_down()
        timed_out = ptt.rec
        self.wait_until(lambda: not ptt.active)
        self.assertIsNone(timed_out.stream)
        self.assertEqual(len(self.streams), 1)
        errors = [event for event in self.events if event['event'] == 'voice-input' and event['state'] == 'error']
        self.assertEqual(len(errors), 1)
        self.assertEqual(errors[0]['code'], 'device')
        self.assertEqual(errors[0]['inputTurnId'], timed_out.input_turn.id)
        ptt._handle_down()  # A held key must not silently retry after timeout.
        self.assertFalse(ptt.active)
        ptt._handle_up()
        self.close_release.set()
        self.wait_until(lambda: self.streams[0].closed)
        ptt._handle_down()
        self.wait_until(lambda: len(self.streams) == 2)
        self.assertEqual(self.errors, [])
        ptt._handle_up()

    def test_close_error_poison_blocks_reopen_even_after_logical_finish(self):
        self.block_close = False
        self.fail_close = True
        ptt = self.h.MousePtt(2, 15)
        ptt._handle_down()
        self.assertTrue(self.started.wait(1))
        ptt._handle_up()
        self.wait_until(lambda: not self.h._threads)
        self.fail_close = False
        ptt._handle_down()
        self.wait_until(lambda: not ptt.active)
        self.assertEqual(len(self.streams), 1)
        self.assertFalse(self.streams[0].closed)
        self.assertEqual(self.streams[0].close_calls, 1)
        self.assertEqual(self.errors, [])

    def test_revocation_during_device_wait_never_opens_old_grant(self):
        ptt = self.begin_closing_ptt()
        ptt._handle_down()
        waiting = ptt.rec
        self.h.CFG['voiceSessionEpoch'] = 'new-epoch'
        self.close_release.set()
        self.wait_until(lambda: not ptt.active)
        self.assertIsNone(waiting.stream)
        self.assertEqual(len(self.streams), 1)
        self.assertFalse(any(event.get('state') == 'error' for event in self.events if event['event'] == 'voice-input'))

    def test_always_pause_is_bounded_and_ptt_cannot_bypass_pending_close(self):
        listener = self.h.AlwaysListener('wake', self.h._capture_id)
        listener._open_stream()
        old_callback = self.streams[0].callback
        pause_done = threading.Event()
        pause_result = []
        worker = threading.Thread(target=lambda: (pause_result.append(listener.pause()), pause_done.set()))
        worker.start(); self.workers.append(worker)
        self.assertTrue(self.close_entered.wait(1))
        self.assertTrue(pause_done.wait(.25), 'pause blocked the key handler on native close')
        self.assertEqual(pause_result, [False], 'pending close must not report released')
        self.assertTrue(listener._wake_snapshot()['streamOpen'])
        rec = self.h.start_recording()
        time.sleep(.1)
        self.assertEqual(len(self.streams), 1)
        listener.resume()
        old_callback(b'old', 1, None, None)
        self.assertEqual(listener._blocks, [], 'old stream callback leaked after resume')
        self.close_release.set()
        self.wait_until(lambda: len(self.streams) == 2)
        self.h.release_recorder(expected=rec)
        self.wait_until(lambda: self.streams[-1].closed)
        listener._open_stream()
        self.assertEqual(len(self.streams), 3)
        listener.stop(wait_s=.1)
        self.assertEqual(self.errors, [])

    def test_ptt_to_always_waits_and_stop_cancels_wait_without_global_locks(self):
        self.begin_closing_ptt()
        listener = self.h.AlwaysListener('always', self.h._capture_id)
        done = threading.Event()
        worker = threading.Thread(target=lambda: (listener._open_stream(), done.set()))
        worker.start(); self.workers.append(worker)
        time.sleep(.1)
        self.assertEqual(len(self.streams), 1)
        before = time.monotonic()
        listener.stop(wait_s=.1)
        self.assertLess(time.monotonic() - before, .25)
        self.assertTrue(done.wait(.3))
        self.close_release.set()
        worker.join(1)
        self.assertEqual(len(self.streams), 1)

    def test_quick_press_stress_discards_waiters_without_devices_or_errors(self):
        ptt = self.begin_closing_ptt('keyboard')
        for _ in range(40):
            before = time.monotonic()
            ptt._handle_down()
            ptt._handle_up()
            self.assertLess(time.monotonic() - before, .25)
        self.wait_until(lambda: len(self.h._threads) == 1)
        self.assertEqual(len(self.streams), 1)
        self.assertFalse(any(event.get('state') == 'error' for event in self.events if event['event'] == 'voice-input'))
        self.assertEqual(self.h._capture_device.status()['state'], 'closing')
        self.close_release.set()
        self.wait_until(lambda: not self.h._threads)
        self.assertEqual(self.h._capture_device.status()['state'], 'released')

    def test_constructor_start_and_stop_failures_release_only_after_successful_close(self):
        self.block_close = False
        for stage in ['construct', 'start', 'stop']:
            with self.subTest(stage=stage):
                self.started.clear()
                setattr(self, 'fail_' + stage, True)
                rec = self.h.start_recording()
                if stage == 'stop':
                    self.assertTrue(self.started.wait(1))
                    self.h.release_recorder(expected=rec)
                self.wait_until(lambda: not self.h._threads)
                self.assertEqual(self.h._capture_device.status()['state'], 'released')
                self.assertTrue(all(stream.closed for stream in self.streams))
                setattr(self, 'fail_' + stage, False)
        self.assertEqual(self.errors, [])

    def test_start_failure_and_close_failure_preserve_original_error_and_lease(self):
        self.block_close = False
        self.fail_start = self.fail_close = True
        self.h.start_recording()
        self.wait_until(lambda: not self.h._threads)
        errors = [event for event in self.events if event['event'] == 'error']
        self.assertEqual(len(errors), 1)
        self.assertIn('start-failed', errors[0]['message'])
        self.assertEqual(self.h._capture_device.status()['state'], 'close-unconfirmed')
        self.fail_start = self.fail_close = False
        self.h.start_recording()
        self.wait_until(lambda: not self.h._threads)
        self.assertEqual(len(self.streams), 1)

    def test_always_start_failure_and_close_failure_keep_poisoned_lease(self):
        self.block_close = False
        self.fail_start = self.fail_close = True
        listener = self.h.AlwaysListener('always', self.h._capture_id)
        with self.assertRaisesRegex(OSError, 'start-failed'):
            listener._open_stream()
        self.assertEqual(self.h._capture_device.status()['state'], 'close-unconfirmed')
        self.fail_start = self.fail_close = False
        with self.assertRaisesRegex(RuntimeError, '关闭未确认'):
            listener._open_stream()
        self.assertEqual(len(self.streams), 1)
        self.assertEqual(self.streams[0].close_calls, 1)

    def test_duplicate_always_close_and_resume_cannot_spawn_more_closers(self):
        listener = self.h.AlwaysListener('always', self.h._capture_id)
        listener._open_stream()
        listener.pause()
        self.assertTrue(self.close_entered.wait(1))
        for _ in range(20):
            listener.resume()
            listener._open_stream()
            self.assertFalse(listener.pause())
        self.assertEqual(self.streams[0].close_calls, 1)
        self.assertEqual(len(self.h._threads), 1)
        self.close_release.set()
        self.wait_until(lambda: not self.h._threads)
        listener.resume()
        listener._open_stream()
        self.assertEqual(len(self.streams), 2)
        listener.stop(.1)
        self.assertEqual(self.errors, [])

    def test_always_inflight_constructor_cannot_start_after_pause_or_regrant(self):
        for action in ['pause', 'epoch', 'capture']:
            with self.subTest(action=action):
                self.block_close = False
                entered, leave = threading.Event(), threading.Event()
                self.barriers.append(leave)
                self.construct_hook = lambda: (entered.set(), leave.wait(3))
                listener = self.h.AlwaysListener('always', self.h._capture_id)
                results = []
                worker = threading.Thread(target=lambda: results.append(listener._open_stream()))
                self.workers.append(worker); worker.start()
                self.assertTrue(entered.wait(1))
                before = time.monotonic()
                if action == 'pause':
                    self.assertFalse(listener.pause())
                    listener.resume()
                elif action == 'epoch':
                    self.h.CFG['voiceSessionEpoch'] = 'next-epoch'
                else:
                    self.h._capture_id = 'next-capture'
                self.assertLess(time.monotonic() - before, .25)
                leave.set(); worker.join(1)
                self.assertFalse(worker.is_alive())
                self.assertEqual(results, [False])
                self.assertEqual(self.streams[-1].start_calls, 0)
                self.assertTrue(self.streams[-1].closed)
                self.assertEqual(self.h._capture_device.status()['state'], 'released')

    def test_quit_reaches_exit_when_native_close_is_pending(self):
        ptt = self.begin_closing_ptt()
        ptt._handle_down()
        before = time.monotonic()
        with patch.object(self.h.os, '_exit', side_effect=SystemExit(0)):
            with self.assertRaises(SystemExit):
                self.h.op_quit({})
        self.assertLess(time.monotonic() - before, 3.1)
        self.assertEqual(len(self.streams), 1)
        self.assertEqual(self.h._capture_device.status()['state'], 'closing')

    def test_key_up_between_gate_predicate_and_poison_check_is_silent(self):
        self.block_close = False
        self.fail_close = True
        rec = self.h.start_recording()
        self.assertTrue(self.started.wait(1))
        self.h.release_recorder(expected=rec)
        self.wait_until(lambda: not self.h._threads)
        self.fail_close = False
        checked = threading.Event()
        gate = self.h._capture_device
        acquire = gate.acquire
        def tracked_acquire(lease, current):
            def probe():
                result = current()
                checked.set()
                return result
            return acquire(lease, probe)
        with patch.object(gate, 'acquire', tracked_acquire):
            with gate._condition:
                waiting = self.h.start_recording()
                self.assertTrue(checked.wait(1))
                self.h.release_recorder(expected=waiting)
            self.wait_until(lambda: not self.h._threads)
        self.assertIsNone(waiting.stream)
        self.assertFalse(any(event.get('state') == 'error' and event.get('inputTurnId') == waiting.input_turn.id
                             for event in self.events if event['event'] == 'voice-input'))
        self.assertEqual(len(self.streams), 1)

    def test_resuming_listener_with_own_failed_close_reports_once_and_stops_retrying(self):
        self.block_close = False
        listener = self.h.AlwaysListener('always', self.h._capture_id)
        self.h._always = listener
        listener._open_stream()
        self.fail_close = True
        listener.pause()
        self.wait_until(lambda: not self.h._threads)
        self.assertEqual(self.h._capture_device.status()['state'], 'close-unconfirmed')
        listener.resume()
        listener.start()
        self.wait_until(lambda: not listener.is_alive())
        errors = [event for event in self.events if event['event'] == 'voice-input' and event['state'] == 'error']
        self.assertEqual(len(errors), 1)
        self.assertEqual(errors[0]['code'], 'device')
        self.assertEqual(errors[0]['voiceSessionEpoch'], 'epoch')
        self.assertEqual(len(self.streams), 1)
        self.assertEqual(self.streams[0].close_calls, 1)
        self.assertTrue(listener.status()['streamOpen'])

    def test_automatic_finish_rejects_callbacks_while_native_close_is_pending(self):
        rec = self.h.start_recording(max_seconds=.03)
        self.assertTrue(self.close_entered.wait(1))
        self.streams[0].callback(b'late audio', 1, None, None)
        self.assertEqual(rec.blocks, [])
        self.assertTrue(rec.stop_event.is_set())
        self.assertEqual(self.h._capture_device.status()['state'], 'closing')
        self.close_release.set()
        self.wait_until(lambda: not self.h._threads)


    def test_lightweight_capture_status_waits_for_native_release_without_other_probes(self):
        lease = self.h._CaptureLease()
        self.assertTrue(self.h._capture_device.acquire(lease, lambda: True))
        worker = threading.Thread(target=lambda: self.h.op_capture_status({}))
        self.workers.append(worker)
        with patch.object(self.h, 'device_info', side_effect=AssertionError('device probe')), \
             patch.object(self.h, 'loaded_models', side_effect=AssertionError('model probe')), \
             patch.object(self.h, 'reload_cfg', side_effect=AssertionError('config reload')):
            worker.start()
            self.assertFalse(any(event['event'] == 'capture-status' for event in self.events))
            self.h._capture_device.release(lease)
            worker.join(1)
        self.assertFalse(worker.is_alive())
        self.assertEqual(self.events[-1], {'event': 'capture-status', 'captureDevice': {'state': 'released'}})

    def test_lightweight_capture_status_is_bounded_and_does_not_release_owned_device(self):
        lease = self.h._CaptureLease()
        self.assertTrue(self.h._capture_device.acquire(lease, lambda: True))
        worker = threading.Thread(target=lambda: self.h.op_capture_status({}))
        self.workers.append(worker)
        worker.start(); worker.join(1.5)
        self.assertFalse(worker.is_alive())
        self.assertEqual(self.events[-1]['captureDevice']['state'], 'owned')
        self.assertIs(self.h._capture_device._owner, lease)
        self.h._capture_device.release(lease, failed=True)
        self.h.op_capture_status({})
        self.assertEqual(self.events[-1]['captureDevice']['state'], 'close-unconfirmed')


if __name__ == '__main__':
    unittest.main()
