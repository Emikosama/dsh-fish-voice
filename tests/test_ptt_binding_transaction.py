"""Binding lifecycle tests with fake hooks. Not a Windows hardware acceptance."""
import copy
import importlib.util
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch


class Thread:
    def __init__(self):
        self.alive = True
    def join(self, timeout):
        pass
    def is_alive(self):
        return self.alive


class BindingTransactionTests(unittest.TestCase):
    def setUp(self):
        self.home = tempfile.TemporaryDirectory()
        self.addCleanup(self.home.cleanup)
        spec = importlib.util.spec_from_file_location('bindings_helper', Path(__file__).resolve().parents[1] / 'helper/voice_helper.py')
        self.h = h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': self.home.name}):
            spec.loader.exec_module(h)
        h.CFG = copy.deepcopy(h.DEFAULTS)
        h.CFG.update(voiceSessionId='owner', voiceSessionEpoch='epoch', pttMouse=1, pttKeyboard={'code': 'F8', 'modifiers': []})
        self.disk = copy.deepcopy(h.CFG)
        self.events = []
        h.emit = lambda event, **kwargs: self.events.append({'event': event, **kwargs})
        h.reload_cfg = lambda: (setattr(h, 'CFG', copy.deepcopy(self.disk)) or True)
        h._binding_keys_released = lambda *args: True
        self.started = []
        self.fail_keys = set()
        self.stop_unconfirmed = False
        outer = self
        def start(inst):
            outer.started.append(inst)
            inst.thread, inst.worker = Thread(), Thread()
            inst.hook = 123
            key = getattr(inst, 'binding', {}).get('code')
            return key not in outer.fail_keys
        def stop(inst, wait_s=2):
            inst.stop_event.set()
            if not outer.stop_unconfirmed:
                inst.thread.alive = inst.worker.alive = False
                inst.hook = None
        self.addCleanup(patch.stopall)
        patch.object(h.MousePtt, 'start', start).start()
        patch.object(h.MousePtt, 'stop', stop).start()
        h._binding_install(h._binding_disk_values())
        self.old = h._binding_disk_values()
        self.new = {'pttMouse': 2, 'pttKeyboard': {'code': 'F9', 'modifiers': ['Control']}}
        self.msg = {'transactionId': 'tx', 'expectedSessionId': 'owner', 'expectedSessionEpoch': 'epoch', **self.new}
        self.addCleanup(lambda: h._binding_transaction and h._binding_transaction.get('timer') and h._binding_transaction['timer'].cancel())

    def prepare(self):
        self.h.op_bindings_prepare(self.msg)
        return self.events[-1]

    def test_active_session_commits_without_touching_microphone_or_grant(self):
        h = self.h
        sentinel = object()
        h._always = sentinel
        self.assertEqual(self.prepare()['phase'], 'prepared')
        self.assertTrue(h._binding_gate.is_set())
        self.disk.update(self.new)
        h.op_bindings_commit(self.msg)
        self.assertEqual(self.events[-1]['phase'], 'committed')
        self.assertFalse(h._binding_gate.is_set())
        self.assertIs(h._always, sentinel)
        self.assertEqual(h.cfg('voiceSessionId'), 'owner')
        self.assertEqual(h.cfg('voiceSessionEpoch'), 'epoch')
        h.op_bindings_status(self.msg)
        self.assertEqual(self.events[-1]['phase'], 'committed')
        h.op_bindings_commit(self.msg)
        self.assertEqual(self.events[-1]['phase'], 'committed')

    def test_recording_and_processing_rejected_before_stop(self):
        h = self.h
        h._current_recorder = object()
        self.assertEqual(self.prepare()['code'], 'PTT_BINDINGS_RECORDING')
        self.assertFalse(h._binding_gate.is_set())
        h._current_recorder = None
        thread = Thread(); thread.name = 'whale-rec-ptt-mouse'
        h._threads.add(thread)
        self.assertEqual(self.prepare()['code'], 'PTT_BINDINGS_RECORDING')
        self.assertTrue(h._ptt.thread.is_alive())

    def test_stale_session_rejected(self):
        self.msg['expectedSessionEpoch'] = 'stale'
        self.assertEqual(self.prepare()['code'], 'PTT_BINDINGS_STALE_SESSION')
        self.assertFalse(self.h._binding_gate.is_set())

    def test_old_hook_stop_unconfirmed_never_installs_new(self):
        self.stop_unconfirmed = True
        before = len(self.started)
        result = self.prepare()
        self.assertEqual(result['code'], 'PTT_BINDINGS_STOP_UNCONFIRMED')
        self.assertTrue(result['blocked'])
        self.assertEqual(len(self.started), before)
        self.assertTrue(self.h._binding_gate.is_set())

    def test_apply_failure_restores_old(self):
        self.fail_keys.add('F9')
        result = self.prepare()
        self.assertTrue(result['restored'])
        self.assertEqual(self.h._keyboard_ptt.binding, self.old['pttKeyboard'])
        self.assertFalse(self.h._binding_gate.is_set())

    def test_rollback_failure_stays_failclosed(self):
        self.fail_keys.update(('F8', 'F9'))
        result = self.prepare()
        self.assertEqual(result['code'], 'PTT_BINDINGS_ROLLBACK_UNCONFIRMED')
        self.assertTrue(result['blocked'])
        self.assertTrue(self.h._binding_gate.is_set())

    def test_abort_restores_old_after_host_compensation(self):
        h = self.h
        self.prepare()
        self.disk.update(self.new)
        h.op_bindings_abort(self.msg)
        self.assertEqual(self.events[-1]['code'], 'PTT_BINDINGS_CONFIG_MISMATCH')
        self.assertTrue(h._binding_gate.is_set())
        self.disk.update(self.old)
        h.op_bindings_abort(self.msg)
        self.assertEqual(self.events[-1]['phase'], 'aborted')
        self.assertEqual(h._keyboard_ptt.binding, self.old['pttKeyboard'])
        self.assertFalse(h._binding_gate.is_set())

    def test_held_keys_and_queued_down_do_not_record_or_submit(self):
        h = self.h
        self.prepare()
        called = []
        h.start_recording = lambda **kwargs: called.append('record')
        h._ptt._handle_down()
        self.assertEqual(called, [])
        self.disk.update(self.new)
        h._binding_keys_released = lambda *args: False
        h.op_bindings_commit(self.msg)
        self.assertEqual(self.events[-1]['code'], 'PTT_BINDINGS_KEYS_HELD')
        self.assertTrue(h._binding_gate.is_set())
        self.assertEqual(called, [])

    def test_expiry_fails_closed_and_cannot_commit(self):
        h = self.h
        self.prepare()
        h._binding_expire('tx')
        self.disk.update(self.new)
        h.op_bindings_commit(self.msg)
        self.assertEqual(self.events[-1]['code'], 'PTT_BINDINGS_EXPIRED')
        self.assertTrue(h._binding_gate.is_set())

    def test_mouse_and_keyboard_can_be_independently_disabled(self):
        for new in ({'pttMouse': 0, 'pttKeyboard': self.old['pttKeyboard']}, {'pttMouse': 1, 'pttKeyboard': None}):
            self.msg.update(new)
            self.msg['transactionId'] += 'x'
            self.assertEqual(self.prepare()['phase'], 'prepared')
            self.disk.update(new)
            self.h.op_bindings_commit(self.msg)
            self.assertEqual(self.events[-1]['phase'], 'committed')
            self.assertEqual(self.h._ptt is None, new['pttMouse'] == 0)
            self.assertEqual(self.h._keyboard_ptt is None, new['pttKeyboard'] is None)

    def test_still_alive_worker_blocks_even_after_hook_thread_exits(self):
        h = self.h
        def stop(inst, wait_s=2):
            inst.stop_event.set()
            inst.thread.alive = False
            inst.hook = None
        with patch.object(h.MousePtt, 'stop', stop):
            self.assertEqual(self.prepare()['code'], 'PTT_BINDINGS_STOP_UNCONFIRMED')
        self.assertTrue(h._binding_gate.is_set())

    def test_hook_events_and_explicit_start_are_blocked_while_prepared(self):
        h = self.h
        self.prepare()
        h._ptt._on_hook_event(h.WM_XBUTTONDOWN)
        h._keyboard_ptt._on_key_event(h.WM_KEYDOWN, h.PTT_KEY_CODES['F9'])
        self.assertTrue(h._ptt.events.empty())
        self.assertTrue(h._keyboard_ptt.events.empty())
        with self.assertRaisesRegex(RuntimeError, 'PTT_BINDINGS_BUSY'):
            h.op_start({})
        before = len(self.started)
        h._ptt_sync()
        self.assertEqual(len(self.started), before)

    def test_commit_session_change_is_failclosed(self):
        h = self.h
        self.prepare()
        self.disk.update(self.new, voiceSessionEpoch='new-epoch')
        h.op_bindings_commit(self.msg)
        self.assertEqual(self.events[-1]['code'], 'PTT_BINDINGS_STALE_SESSION')
        self.assertTrue(h._binding_gate.is_set())

    def test_prepare_rejects_held_key_without_stopping_listener(self):
        self.h._binding_keys_released = lambda *args: False
        self.assertEqual(self.prepare()['code'], 'PTT_BINDINGS_KEYS_HELD')
        self.assertFalse(self.h._binding_gate.is_set())
        self.assertTrue(self.h._ptt.thread.is_alive())

    def test_retry_abort_after_stop_recovers_only_confirmed_threads(self):
        h = self.h
        self.stop_unconfirmed = True
        self.prepare()
        self.stop_unconfirmed = False
        h.op_bindings_abort(self.msg)
        self.assertEqual(self.events[-1]['phase'], 'aborted')
        self.assertFalse(h._binding_gate.is_set())

    def test_stale_abort_does_not_disable_active_bindings(self):
        self.h.op_bindings_abort({'transactionId': 'other'})
        self.assertEqual(self.events[-1]['code'], 'PTT_BINDINGS_STALE_TRANSACTION')
        self.assertFalse(self.h._binding_gate.is_set())


if __name__ == '__main__':
    unittest.main()
