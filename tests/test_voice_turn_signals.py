"""Synthetic input/event/output tests. No real mic, model, HTTP or speaker access."""
import copy
import importlib.util
import os
from pathlib import Path
import sys
import tempfile
import threading
import types
import unittest
from contextlib import ExitStack
from unittest.mock import Mock, patch

import numpy as np


class VoiceTurnSignalsTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.home = tempfile.TemporaryDirectory(prefix="whale-signals-")
        spec = importlib.util.spec_from_file_location("whale_signals_helper", Path(__file__).resolve().parents[1] / "helper" / "voice_helper.py")
        cls.h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {"DSH_HOME": cls.home.name}):
            spec.loader.exec_module(cls.h)

    @classmethod
    def tearDownClass(cls):
        cls.home.cleanup()

    def setUp(self):
        h = self.h
        self.stack = ExitStack()
        self.addCleanup(self.stack.close)
        self.stack.enter_context(patch.object(h, "CFG", copy.deepcopy(h.DEFAULTS)))
        h.CFG.update(voiceSessionId="session-a", voiceSessionEpoch="epoch-a")
        # These existing float32 cue tests exercise the legacy PortAudio branch.
        # Native WinMM cue tests use injected APIs in test_audio_devices.py.
        self.stack.enter_context(patch.object(sys, "platform", "linux"))
        self.emit = self.stack.enter_context(patch.object(h, "emit"))
        self.stack.enter_context(patch.object(h, "log"))
        self.stack.enter_context(patch.object(h, "reload_cfg"))
        self.stack.enter_context(patch.object(h, "_cue_turn_id", None))
        self.stack.enter_context(patch.object(h, "_cue_phase", "idle"))
        self.stack.enter_context(patch.object(h, "_cue_stop", threading.Event()))
        self.stack.enter_context(patch.object(h.urllib.request, "urlopen", side_effect=AssertionError("No HTTP")))
        for name in ("get_recognizer", "get_whisper", "get_embedder"):
            self.stack.enter_context(patch.object(h, name, side_effect=AssertionError("No models")))

    def events(self, kind):
        return [c.kwargs for c in self.emit.call_args_list if c.kwargs.get("event", c.args[0] if c.args else None) == kind]

    def test_input_turn_contains_identity_and_last_voice_without_content(self):
        turn = self.h.InputTurn("always")
        turn.start(1000); turn.start(1100); turn.voiced(2000); turn.end("silence", 2600)
        events = self.events("voice-input")
        self.assertEqual([e["state"] for e in events], ["start", "end"])
        self.assertEqual(events[1]["lastVoicedAt"], 2000)
        self.assertEqual(events[1]["endAt"], 2000)
        self.assertEqual(events[1]["detectedAt"], 2600)
        self.assertEqual(events[1]["voiceSessionEpoch"], "epoch-a")
        self.assertEqual(events[1]["voiceSessionId"], "session-a")
        self.assertEqual(events[0]["inputTurnId"], events[1]["inputTurnId"])
        self.assertNotIn("text", events[1])
        self.assertNotIn("audio", events[1])

    def test_ptt_release_time_wins_and_blank_press_cancels(self):
        h = self.h
        turn = h.InputTurn("ptt-mouse"); turn.start(1000); turn.voiced(1100)
        recorder = types.SimpleNamespace(input_turn=turn, stop_event=threading.Event())
        with patch.object(h, "_current_recorder", recorder), patch.object(h.time, "time", return_value=2.0):
            h.release_recorder()
        turn.end("stopped", 2030)
        self.assertEqual(self.events("voice-input")[-1]["releasedAt"], 2000)
        self.assertTrue(recorder.stop_event.is_set())
        blank = h.InputTurn("ptt"); blank.start(3000); blank.end("no-speech")
        self.assertEqual(self.events("voice-input")[-1]["state"], "cancel")
        self.assertEqual(self.events("voice-input")[-1]["reason"], "no-speech")

    def test_superseded_recording_never_emits_end(self):
        h = self.h
        turn = h.InputTurn("ptt"); turn.start(); turn.voiced(1100)
        rec = types.SimpleNamespace(input_turn=turn, stop_event=threading.Event())
        with patch.object(h, "_current_recorder", rec):
            h.release_recorder(cancel=True, reason="superseded")
        turn.end()
        self.assertEqual([e["state"] for e in self.events("voice-input")], ["start", "cancel"])

    def test_synthetic_always_onset_and_offset_precede_pipeline_and_preserve_voice(self):
        h = self.h
        listener = h.AlwaysListener(); settings = listener._settings(); state = listener._new_state()
        # 400ms of speech, followed by the configured 600ms endpoint silence.
        rows = np.concatenate([np.full((20,h.FRAME),0.1,dtype="float32"), np.zeros((30,h.FRAME),dtype="float32")])
        inspected = []
        def pipeline(audio, st, input_turn=None):
            inspected.extend(self.events("voice-input"))
            self.assertEqual(input_turn.id, inspected[-1]["inputTurnId"])
            self.assertEqual(len(audio), 20*h.FRAME)
            np.testing.assert_array_equal(audio, rows[:20].reshape(-1))
        with patch.object(listener, "_handle_segment", side_effect=pipeline):
            listener._consume_frames(rows,state,settings,captured_at=2000)
        self.assertEqual([e["state"] for e in inspected], ["start", "end"])
        self.assertEqual(inspected[0]["at"], 1060)
        self.assertEqual(inspected[1]["lastVoicedAt"], 1400)
        self.assertEqual(inspected[1]["endAt"], 1400)
        # Node schedules end at 2150, only 150ms after this endpoint at 2000.
        self.assertEqual(inspected[1]["endAt"] + 750 - 2000, 150)

    def test_always_capture_keeps_original_grant_if_authorization_changes_before_asr(self):
        h=self.h; listener=h.AlwaysListener(); turn=h.InputTurn("always");turn.start()
        h.CFG["voiceSessionEpoch"]="new-epoch"
        with patch.object(h,"transcribe_audio",return_value={"text":"依依你好"}), patch.object(h,"prosody",return_value={}):
            listener._handle_segment(np.zeros(h.SR,dtype="float32"),listener._settings(),input_turn=turn)
        self.assertEqual(self.events("transcript"),[])

    def test_short_always_segment_cancels_and_never_runs_asr(self):
        h = self.h; listener=h.AlwaysListener(); state=listener._new_state()
        rows=np.concatenate([np.full((3,h.FRAME),0.1,dtype="float32"), np.zeros((30,h.FRAME),dtype="float32")])
        with patch.object(listener,"_handle_segment") as process:
            listener._consume_frames(rows,state,listener._settings(),captured_at=2000)
        process.assert_not_called()
        self.assertEqual([e["state"] for e in self.events("voice-input")], ["start","cancel"])
        self.assertEqual(self.events("voice-input")[-1]["reason"],"too-short")

    def request(self, turn, kind="start"):
        return {"kind":kind,"inputTurnId":turn.id,"generation":7,
                "voiceSessionId":"session-a","voiceSessionEpoch":"epoch-a"}

    def test_default_cue_reports_unsupported_without_accessing_audio(self):
        h=self.h; turn=h.InputTurn("ptt");turn.start()
        with patch.dict(sys.modules,{"sounddevice":None}):
            h.op_cue(self.request(turn))
        self.assertEqual(self.events("cue")[-1]["status"],"unsupported")
        self.assertEqual(self.events("cue")[-1]["reason"],"headphones-not-confirmed")
        self.assertFalse(h.cue_status()["verifiedAec"])

    def test_headphones_and_epoch_validation_are_literal_and_fail_closed(self):
        h=self.h; turn=h.InputTurn("ptt");turn.start()
        for setting in ("true",1,None,False):
            h.CFG["turnSignals"]["headphonesConfirmed"]=setting
            self.assertFalse(h.cue_status()["available"])
        h.CFG["turnSignals"]["headphonesConfirmed"]=True
        with patch.dict(sys.modules,{"sounddevice":None}):
            h.op_cue({**self.request(turn),"voiceSessionEpoch":"old"})
        self.assertEqual(self.events("cue")[-1]["reason"],"stale-permission")

    def fake_playback(self):
        tasks=[]; writes=[]
        class DeferredThread:
            def __init__(self,*,target,**kwargs): self.target=target
            def start(self): tasks.append(self.target)
        class Output:
            def __init__(self,**kwargs): self.options=kwargs
            def __enter__(self): return self
            def __exit__(self,*args): return False
            def write(self,data): writes.append(data)
            def abort(self): writes.append("aborted")
        self.stack.enter_context(patch.object(self.h.threading,"Thread",DeferredThread))
        self.stack.enter_context(patch.dict(sys.modules,{"sounddevice":types.SimpleNamespace(RawOutputStream=Output)}))
        return tasks,writes

    def test_playback_runs_only_in_worker_and_acknowledges_actual_mock_output(self):
        h=self.h; h.CFG["turnSignals"]["headphonesConfirmed"]=True
        tasks,writes=self.fake_playback(); turn=h.InputTurn("ptt");turn.start()
        h.op_cue(self.request(turn))
        self.assertEqual(writes,[])
        self.assertEqual(self.events("cue")[-1]["status"],"requested")
        tasks.pop()()
        self.assertTrue(writes)
        self.assertEqual(self.events("cue")[-1]["status"],"played")
        samples=np.frombuffer(b"".join(writes),dtype="float32")
        self.assertEqual(samples.size,2640)
        self.assertLess(np.max(np.abs(samples)),0.05)
        self.assertEqual(samples[0],0)

    def test_native_output_default_overrides_legacy_route_and_never_requires_portaudio(self):
        h = self.h
        h.CFG["turnSignals"].update(headphonesConfirmed=True, outputDevice=7)
        tasks, writes = self.fake_playback()
        selected = {"backend": "winmm", "id": "headphones", "name": "USB"}
        with patch.object(sys, "platform", "win32"), patch.dict(sys.modules, {"sounddevice": None}), patch.object(h._audio_devices, "play_cue") as native:
            for choice in (None, selected):
                h.CFG["outputDevice"] = choice
                turn = h.InputTurn("ptt")
                turn.start()
                h.op_cue(self.request(turn))
                tasks.pop()()
                self.assertEqual(native.call_args.args[2], choice)
                self.assertEqual(native.call_args.args[1], 48000)
                self.assertEqual(self.events("cue")[-1]["status"], "played")
        self.assertEqual(writes, [])

    def test_new_turn_and_response_start_cancel_pending_playback(self):
        h=self.h;h.CFG["turnSignals"]["headphonesConfirmed"]=True
        tasks,writes=self.fake_playback(); old=h.InputTurn("ptt");old.start();h.op_cue(self.request(old))
        new=h.InputTurn("ptt");new.start();tasks.pop()()
        self.assertEqual(writes,[])
        h.op_cue_cancel({**self.request(old),"reason":"response-started"})
        h.op_cue(self.request(new)); self.assertEqual(len(tasks),1)
        h.op_cue_cancel({**self.request(new),"reason":"response-started"}); tasks.pop()()
        self.assertEqual(writes,[])
        h.op_cue(self.request(new))
        self.assertEqual(self.events("cue")[-1]["status"],"cancelled")

    def test_new_input_ipc_cancel_does_not_invalidate_the_current_helper_turn(self):
        h=self.h;h.CFG["turnSignals"]["headphonesConfirmed"]=True
        tasks,_=self.fake_playback();turn=h.InputTurn("ptt");turn.start()
        h.op_cue_cancel({**self.request(turn),"reason":"new-input","inputTurnId":None})
        h.op_cue(self.request(turn));self.assertEqual(len(tasks),1)

    def test_prompt_output_does_not_mute_or_trim_ptt_or_always_input_samples(self):
        h=self.h;h.CFG["turnSignals"]["headphonesConfirmed"]=True
        tasks,_=self.fake_playback();turn=h.InputTurn("ptt");turn.start()
        recorder=h.Recorder(); listener=h.AlwaysListener()
        samples=np.linspace(-0.2,0.2,h.FRAME,dtype="float32")
        recorder._callback(samples.tobytes(),h.FRAME,None,None)
        listener._callback(samples.tobytes(),h.FRAME,None,None)
        h.op_cue(self.request(turn));tasks.pop()()
        np.testing.assert_array_equal(recorder._pull(),samples)
        np.testing.assert_array_equal(listener._pull(),samples)

    def test_delayed_empty_ptt_cancel_does_not_erase_new_helper_onset(self):
        h=self.h;h.CFG["turnSignals"]["headphonesConfirmed"]=True
        tasks,_=self.fake_playback();turn=h.InputTurn("ptt-mouse");turn.start()
        h.op_cue_cancel({**self.request(turn),"reason":"voice-input","inputTurnId":None})
        h.op_cue(self.request(turn));self.assertEqual(len(tasks),1)

    def test_device_failure_is_unsupported_not_played(self):
        h=self.h;h.CFG["turnSignals"]["headphonesConfirmed"]=True
        tasks,_=self.fake_playback();turn=h.InputTurn("ptt");turn.start();h.op_cue(self.request(turn))
        with patch.dict(sys.modules,{"sounddevice":types.SimpleNamespace(RawOutputStream=Mock(side_effect=RuntimeError("no device")))}):
            tasks.pop()()
        self.assertEqual(self.events("cue")[-1]["status"],"unsupported")
        self.assertEqual(self.events("cue")[-1]["reason"],"output-device-unavailable")

    def test_volume_zero_disables_output_and_tones_are_distinct_and_short(self):
        h=self.h;h.CFG["turnSignals"].update(headphonesConfirmed=True,volume=0)
        tasks,_=self.fake_playback();turn=h.InputTurn("ptt");turn.start();h.op_cue(self.request(turn))
        self.assertEqual(tasks,[])
        self.assertEqual(self.events("cue")[-1]["status"],"disabled")
        self.assertEqual(h._cue_wave("start",1).size,2640)
        self.assertEqual(h._cue_wave("end",1).size,3600)
        self.assertFalse(np.array_equal(h._cue_wave("start",1),h._cue_wave("end",1)[:2640]))


if __name__ == "__main__":
    unittest.main()
