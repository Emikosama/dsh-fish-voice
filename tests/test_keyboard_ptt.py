"""Deterministic PTT state tests: no Windows hooks, microphone, models or network."""
import importlib.util
import os
from pathlib import Path
import tempfile
import threading
import types
import unittest
from unittest.mock import patch


class KeyboardPttTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.home = tempfile.TemporaryDirectory()
        spec = importlib.util.spec_from_file_location('keyboard_helper', Path(__file__).resolve().parents[1] / 'helper/voice_helper.py')
        cls.h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': cls.home.name}):
            spec.loader.exec_module(cls.h)

    @classmethod
    def tearDownClass(cls):
        cls.home.cleanup()

    def setUp(self):
        self.settings = {'voiceSessionId': 'voice', 'voiceSessionEpoch': 'epoch', 'pttKeyboard': {'code':'Space', 'modifiers':['Control']}}
        self.started = []
        self.h._current_recorder = None
        self.h._request_context.current = None
        self.p = self.h.KeyboardPtt(self.settings['pttKeyboard'], 1)
        self.p.foreground = lambda: 123
        self.callbacks = []
        def start(**kwargs):
            rec = types.SimpleNamespace(stop_event=threading.Event(), reason='timeout', duration=1)
            self.h._current_recorder = rec
            self.started.append(rec)
            self.callbacks.append(kwargs['on_finish'])
            return rec
        for name, replacement in [('cfg', lambda k, default=None: self.settings.get(k, default)), ('reload_cfg', lambda: None), ('start_recording', start), ('emit', lambda *a, **k: None), ('log', lambda *a: None)]:
            p = patch.object(self.h, name, replacement); p.start(); self.addCleanup(p.stop)

    def test_letter_shortcut_matches_scan_position_not_ime_or_layout_character(self):
        binding = {'code': 'KeyQ', 'modifiers': []}
        self.settings['pttKeyboard'] = binding
        keyboard = self.h.KeyboardPtt(binding, 1)
        keyboard._on_key_event(self.h.WM_KEYDOWN, ord('Q'), 0x1E, 0)
        keyboard._on_key_event(self.h.WM_KEYDOWN, 0xB1, 0x10, 1)
        self.assertTrue(keyboard.events.empty())
        keyboard._on_key_event(self.h.WM_KEYDOWN, ord('A'), 0x10, 0)
        self.assertEqual(keyboard.events.get_nowait(), 'down')
        self.assertEqual(keyboard.press_vk, ord('A'))
        keyboard._on_key_event(self.h.WM_KEYUP, 0xE5, 0x10, 0)
        self.assertEqual(keyboard.events.get_nowait(), 'up')
        keyboard._on_key_event(self.h.WM_KEYDOWN, 0xE5, 0x10, 0)
        self.assertEqual(keyboard.events.get_nowait(), 'down')

    def event(self, vk, down=True):
        self.p._on_key_event(self.h.WM_KEYDOWN if down else self.h.WM_KEYUP, vk)
        while not self.p.events.empty():
            kind = self.p.events.get_nowait()
            if kind == 'down': self.p._handle_down()
            elif kind == 'up': self.p._handle_up()
            elif kind == 'release': self.p._handle_up(retain_hold=True)
            else: self.p._cancel(kind)

    def press(self):
        self.event(0xA2)
        self.event(0x20)

    def test_chord_requires_modifier_before_primary_and_release_submits_once(self):
        self.event(0x20)
        self.assertEqual(self.started, [])
        self.event(0xA2)
        self.event(0x20)  # OS repeats never acquire a chord halfway through.
        self.assertEqual(self.started, [])
        self.event(0x20, False)
        self.event(0x20)
        self.assertEqual(len(self.started), 1)
        self.event(0x20)
        self.assertEqual(len(self.started), 1)
        self.event(0xA2, False)
        self.assertTrue(self.started[0].stop_event.is_set())
        self.assertFalse(hasattr(self.started[0], 'cancelled_generation'))
        self.event(0xA2)
        self.event(0x20)
        self.assertEqual(len(self.started), 1)
        self.event(0x20, False)
        self.event(0x20)
        self.assertEqual(len(self.started), 2)

    def test_timeout_does_not_restart_on_repeat(self):
        self.press()
        self.h._current_recorder = None; self.callbacks[0](self.started[0])
        self.assertFalse(self.p.active)
        for _ in range(5): self.event(0x20)
        self.assertEqual(len(self.started), 1)
        self.event(0x20, False)
        self.event(0x20)
        self.assertEqual(len(self.started), 2)

    def test_escape_cancels_without_submission(self):
        self.press(); self.event(0x1B)
        self.assertTrue(hasattr(self.started[0], 'cancelled_generation'))
        self.assertFalse(self.p.active)
        self.event(0x20)
        self.assertEqual(len(self.started), 1)

    def test_focus_change_cancels(self):
        self.press(); self.p.foreground = lambda: 456
        self.p._check_hold()
        self.assertTrue(hasattr(self.started[0], 'cancelled_generation'))

    def test_focus_change_before_key_up_cancels_without_poll(self):
        self.press(); self.p.foreground = lambda: 456
        self.event(0x20, False)
        self.assertTrue(hasattr(self.started[0], 'cancelled_generation'))

    def test_revoke_and_reconfigure_cancel(self):
        for change in [{'voiceSessionEpoch':'new'}, {'pttKeyboard':None}]:
            with self.subTest(change=change):
                self.setUp()
                self.press(); self.settings.update(change); self.p._check_hold()
                self.assertTrue(hasattr(self.started[0], 'cancelled_generation'))

    def test_lost_up_cancels_and_unlatches(self):
        self.press(); self.p.key_pressed = lambda: False
        self.p._check_hold()
        self.assertTrue(hasattr(self.started[0], 'cancelled_generation'))
        self.assertFalse(self.p.held)
        self.assertFalse(self.p.physical_down)

    def test_stop_cancels_owned_recorder_and_rejects_new_down(self):
        self.press(); self.p.stop()
        self.assertTrue(hasattr(self.started[0], 'cancelled_generation'))
        self.event(0x20, False); self.event(0x20)
        self.assertEqual(len(self.started), 1)

    def test_old_release_cannot_stop_unrelated_recorder(self):
        self.press()
        newer = types.SimpleNamespace(stop_event=threading.Event())
        self.h._current_recorder = newer
        self.event(0x20, False)
        self.assertFalse(newer.stop_event.is_set())

    def test_cancel_while_starting_releases_returned_recorder(self):
        def start(**kwargs):
            rec = types.SimpleNamespace(stop_event=threading.Event())
            self.h._current_recorder = rec
            self.p._cancel('reconfigured')
            self.started.append(rec)
            return rec
        with patch.object(self.h, 'start_recording', start): self.press()
        self.assertTrue(self.started[0].stop_event.is_set())
        self.assertIsNone(self.p.rec)

    def test_platform_support_and_validation_fail_closed(self):
        with patch.object(self.h, '_PTT_HOOKPROC', None):
            self.assertFalse(self.p.start())
            self.assertIsNone(self.p.worker)
            self.assertFalse(self.h.keyboard_ptt_status()['supported'])
        for binding in [{'code':'F4','modifiers':['Alt']}, {'code':'F8','modifiers':['Meta']}, {'code':'KeyA'}, {'code':'Space','modifiers':['Control','Control']}]:
            self.settings['pttKeyboard'] = binding
            self.assertIsNone(self.h.ptt_keyboard_binding())

    def test_mouse_compatibility_and_timeout_latch(self):
        p = self.h.MousePtt(2, 1)
        p._handle_down(); p._handle_down()
        self.assertEqual(len(self.started), 1)
        self.h._current_recorder = None; self.callbacks[0](self.started[0]); p._handle_down()
        self.assertEqual(len(self.started), 1)
        p._handle_up(); p._handle_down()
        self.assertEqual(len(self.started), 2)
        p.stop()
        self.assertTrue(self.started[1].stop_event.is_set())


if __name__ == '__main__': unittest.main()
