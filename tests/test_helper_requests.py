"""Offline request/watchdog races: no microphone, model, or network."""
import importlib.util
import io
import json
import os
from pathlib import Path
import tempfile
import threading
import time
import types
import unittest
from unittest.mock import patch


class HelperRequestTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.home = tempfile.TemporaryDirectory()
        spec = importlib.util.spec_from_file_location('helper_requests', Path(__file__).resolve().parents[1] / 'helper/voice_helper.py')
        cls.h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': cls.home.name}):
            spec.loader.exec_module(cls.h)

    @classmethod
    def tearDownClass(cls):
        cls.home.cleanup()

    def setUp(self):
        self.output = io.StringIO()
        self.stdout = patch.object(self.h.sys, 'stdout', self.output)
        self.stdout.start()
        self.addCleanup(self.stdout.stop)
        self.h._request_context.current = None
        self.h._current_recorder = None
        self.h._threads = set()

    def spawn(self, name, fn, timeout=.02):
        self.h._request_context.current = {'requestId': name}
        try:
            return self.h._spawn(name, fn, timeout)
        finally:
            self.h._request_context.current = None

    def events(self):
        return [json.loads(line) for line in self.output.getvalue().splitlines()]

    def test_instant_success_cancels_watchdog(self):
        t = self.spawn('instant', lambda: self.h.emit('prosody', value=1))
        t.join(1); time.sleep(.04)
        self.assertEqual(self.events(), [{'event': 'prosody', 'value': 1, 'requestId': 'instant'}])
        self.assertTrue(t._whale_timer.finished.is_set())
        self.assertNotIn(t, self.h._threads)

    def test_instant_return_without_event_cancels_watchdog(self):
        t = self.spawn('return', lambda: None)
        t.join(1); time.sleep(.04)
        self.assertEqual(self.events(), [])
        self.assertTrue(t._whale_timer.finished.is_set())

    def test_exception_cancels_watchdog(self):
        def fail():
            raise ValueError('synthetic')
        t = self.spawn('failed', fail); t.join(1); time.sleep(.04)
        self.assertEqual(len(self.events()), 1)
        self.assertEqual(self.events()[0]['requestId'], 'failed')
        self.assertIn('synthetic', self.events()[0]['message'])

    def test_timeout_suppresses_late_result_and_exception(self):
        gate = threading.Event()
        def work():
            gate.wait(1)
            self.h.emit('transcript', text='late')
            raise ValueError('late exception')
        rec = types.SimpleNamespace(stop_event=threading.Event())
        self.h._current_recorder = rec
        t = self.spawn('old', work)
        time.sleep(.05); gate.set(); t.join(1)
        self.assertEqual(len(self.events()), 1)
        self.assertEqual(self.events()[0]['event'], 'error')
        self.assertFalse(rec.stop_event.is_set(), 'file timeout must not release recorder')

    def test_concurrent_requests_do_not_share_context(self):
        gate = threading.Event()
        a = self.spawn('a', lambda: (gate.wait(1), self.h.emit('transcript', text='a')), .2)
        b = self.spawn('b', lambda: self.h.emit('prosody', value='b'), .2)
        b.join(1); gate.set(); a.join(1)
        self.assertEqual([x['requestId'] for x in self.events()], ['b', 'a'])

    def test_timeout_completion_race_has_one_terminal_outcome(self):
        for n in range(40):
            gate = threading.Event()
            t = self.spawn(str(n), lambda: (gate.wait(1), self.h.emit('prosody')), .005)
            timer_thread = threading.Thread(target=t._whale_timer.function)
            timer_thread.start(); gate.set()
            timer_thread.join(1); t.join(1)
        events = self.events()
        self.assertEqual(len(events), 40)
        self.assertEqual(len({x['requestId'] for x in events}), 40)

    def test_old_enrollment_timeout_cannot_stop_new_recorder(self):
        gate = threading.Event(); registered = threading.Event()
        old = types.SimpleNamespace(stop_event=threading.Event())
        new = types.SimpleNamespace(stop_event=threading.Event())
        def work():
            self.h._request_context.current['recorder'] = old
            registered.set(); gate.wait(1)
        t = self.spawn('enroll', work, .5)
        registered.wait(1)
        self.h._current_recorder = new
        t._whale_timer.function()
        self.assertIs(self.h._current_recorder, new)
        self.assertFalse(new.stop_event.is_set())
        gate.set(); t.join(1)

    def test_enrollment_timeout_stops_exact_owner_and_invalidates_generation(self):
        gate = threading.Event(); registered = threading.Event()
        rec = types.SimpleNamespace(stop_event=threading.Event())
        generation = self.h._gen
        def work():
            self.h._request_context.current['recorder'] = rec
            self.h._current_recorder = rec
            registered.set(); gate.wait(1)
        t = self.spawn('enroll', work, .5); registered.wait(1)
        t._whale_timer.function()
        self.assertTrue(rec.stop_event.is_set())
        self.assertIsNone(self.h._current_recorder)
        self.assertGreater(self.h._gen, generation)
        gate.set(); t.join(1)

    def test_timeout_reporting_failure_still_releases_owned_recorder(self):
        gate = threading.Event(); registered = threading.Event()
        rec = types.SimpleNamespace(stop_event=threading.Event())
        def work():
            self.h._request_context.current['recorder'] = rec
            self.h._current_recorder = rec
            registered.set(); gate.wait(1)
        t = self.spawn('enroll', work, .5); registered.wait(1)
        with patch.object(self.h, '_emit_payload', side_effect=OSError('closed output')):
            t._whale_timer.function()
        self.assertTrue(rec.stop_event.is_set())
        self.assertIsNone(self.h._current_recorder)
        gate.set(); t.join(1)

    def test_expired_task_cannot_acquire_microphone(self):
        self.h._request_context.current = {'watchdog': True, 'done': True, 'lock': threading.RLock()}
        with patch.object(self.h, '_start_recording') as start:
            with self.assertRaises(RuntimeError): self.h.start_recording()
            start.assert_not_called()
        self.h._request_context.current = None

    def test_enrollment_timeout_prevents_late_file_commit(self):
        import numpy as np
        entered = threading.Event(); release = threading.Event()
        def embedding(audio):
            entered.set(); release.wait(1)
            return np.ones(3)
        with patch.object(self.h, 'embed_audio', side_effect=embedding), \
             patch.object(self.h, 'save_voiceprints') as save:
            t = self.spawn('enroll-file', lambda: self.h._enroll_from_audio('test', np.ones(self.h.SR * 2)), .5)
            self.assertTrue(entered.wait(1))
            t._whale_timer.function()
            release.set(); t.join(1)
            save.assert_not_called()
        self.assertEqual(len(self.events()), 1)
        self.assertEqual(self.events()[0]['event'], 'error')

    def test_background_start_and_correlated_listen_contexts(self):
        context = {'requestId': 'listen', 'lock': threading.Lock()}
        self.h._request_context.current = context
        seen = []
        with patch.object(self.h, 'start_recording', side_effect=lambda: seen.append(self.h._request_context.current)):
            self.h.op_start({})
            self.h.op_start({'awaitTranscript': True})
        self.assertEqual(seen, [None, context])
        self.assertTrue(all(x['requestId'] == 'listen' for x in self.events()))
        self.h._request_context.current = None

if __name__ == '__main__':
    unittest.main()
