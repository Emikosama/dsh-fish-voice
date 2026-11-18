"""Synthetic wake-mode regression tests. No real microphone, ASR model or network."""
import copy
import base64
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import threading
import unittest
from contextlib import ExitStack
from unittest.mock import Mock, patch
import numpy as np


class WakeModeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.home = tempfile.TemporaryDirectory(prefix="whale-wake-tests-")
        spec = importlib.util.spec_from_file_location("whale_wake_tests", Path(__file__).resolve().parents[1] / "helper" / "voice_helper.py")
        cls.h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {"DSH_HOME": cls.home.name}):
            spec.loader.exec_module(cls.h)

    @classmethod
    def tearDownClass(cls):
        cls.home.cleanup()

    def setUp(self):
        self.stack = ExitStack(); self.addCleanup(self.stack.close)
        h = self.h
        self.stack.enter_context(patch.object(h, "CFG", copy.deepcopy(h.DEFAULTS)))
        h.CFG.update(voiceSessionId="owner", voiceSessionEpoch="epoch")
        self.stack.enter_context(patch.object(h, "reload_cfg"))
        self.stack.enter_context(patch.object(h, "log"))
        self.emit = self.stack.enter_context(patch.object(h, "emit"))
        self.asr = self.stack.enter_context(patch.object(h, "transcribe_audio", return_value={"text": "小鲸鱼，告诉我天气"}))
        self.stack.enter_context(patch.object(h, "prosody", return_value={}))
        self.stack.enter_context(patch.object(h, "device_info", return_value={}))
        self.stack.enter_context(patch.object(h, "semantic_score", side_effect=AssertionError("semantic forbidden")))
        self.stack.enter_context(patch.object(h.urllib.request, "urlopen", side_effect=AssertionError("network forbidden")))
        self.stack.enter_context(patch.object(h.threading, "Timer", return_value=Mock()))
        self.listener = h.AlwaysListener("wake", "capture-a")
        self.addCleanup(self.listener._reset_capture, "test-cleanup")
        self.audio = np.zeros(h.SR, dtype="float32")

    def events(self, name):
        return [c.kwargs for c in self.emit.call_args_list if c.kwargs.get("event", c.args[0] if c.args else None) == name]

    def say(self, text):
        self.asr.return_value = {"text": text}
        self.listener._handle_segment(self.audio, self.listener._settings())

    def test_new_defaults_never_inherit_legacy_homophones(self):
        self.h.CFG["wakeWords"] = ["一一", "依依", "emik"]
        self.assertEqual(self.h.wake_settings(), {"wakeWordAliases": ["小鲸鱼"], "wakeListenTimeoutMs": 10000})
        for words in ([], "小鲸鱼", ["a"], ["\n小鲸鱼"], [None], ["!！"]):
            self.h.CFG["wakeWordAliases"] = words
            self.assertEqual(self.h.wake_settings()["wakeWordAliases"], ["小鲸鱼"])
        for timeout in (True, "5000", 0, 30001, float("nan")):
            self.h.CFG["wakeListenTimeoutMs"] = timeout
            self.assertEqual(self.h.wake_settings()["wakeListenTimeoutMs"], 10000)

    def test_strict_prefix_standalone_latin_boundaries_and_aliases(self):
        match = self.h.match_wake_prefix
        for value in ("我提到了小鲸鱼", "一一处理这些任务", "小 鲸 鱼", "emikology help", "emiko help"):
            self.assertEqual(match(value, ["小鲸鱼", "emik"]), (None, None))
        self.assertEqual(match("  “小鲸鱼”，设置提醒", ["小鲸鱼"]), ("小鲸鱼", "设置提醒"))
        self.assertEqual(match("小鲸鱼告诉我天气", ["小鲸鱼"]), ("小鲸鱼", "告诉我天气"))
        self.assertEqual(match("EMIK, help me", ["emik"]), ("emik", "help me"))
        self.assertEqual(match("小鲸鱼！", ["小鲸鱼"]), ("小鲸鱼", ""))

    def test_offline_phonetic_aliases_strip_only_matched_prefix(self):
        match = self.h.match_wake_prefix
        for spoken, alias in (("小静雨", "小鲸鱼"), ("小金鱼", "小鲸鱼"),
                              ("一一", "依依"), ("虫情", "重庆"),
                              ("小鯨魚", "小鲸鱼"), ("小诗子", "小狮子"),
                              ("小思子", "小狮子"), ("旅旅", "吕吕")):
            with self.subTest(spoken=spoken, alias=alias):
                self.assertEqual(match("  “" + spoken + "”，打开日程！", [alias]),
                                 (alias, "打开日程!"))
        self.assertEqual(match("小金鱼告诉我天气", ["小鲸鱼"]), ("小鲸鱼", "告诉我天气"))
        self.assertEqual(match("小金鱼", ["小鲸鱼", "小金鱼"]), ("小金鱼", ""))
        self.assertEqual(match("小金鱼儿开灯", ["小鲸鱼", "小鲸鱼儿"]), ("小鲸鱼儿", "开灯"))

    def test_phonetic_false_trigger_boundaries(self):
        match = self.h.match_wake_prefix
        for spoken, alias in (("小白兔", "小鲸鱼"), ("小金", "小鲸鱼"),
                              ("我提到小金鱼", "小鲸鱼"), ("小 金鱼", "小鲸鱼"),
                              ("小，金鱼", "小鲸鱼"), ("金鱼", "鲸鱼"),
                              ("小金雨", "少鲸旅"), ("中情", "重庆"),
                              ("路路", "吕吕"), ("一", "依"),
                              ("emiko help", "emik"), ("emik_help", "emik"),
                              ("emikology", "emik"), ("emick help", "emik"),
                              ("小金A", "小鲸A")):
            with self.subTest(spoken=spoken, alias=alias):
                self.assertEqual(match(spoken, [alias]), (None, None))

    def test_near_sound_requires_only_one_explicit_difference(self):
        near = self.h._wake_near_syllable
        for a, b in (("zang", "zhang"), ("cin", "chin"), ("san", "shan"),
                     ("jin", "jing"), ("lan", "lang"), ("sen", "seng")):
            self.assertTrue(near(a, b)); self.assertTrue(near(b, a))
        for a, b in (("zan", "zhang"), ("jin", "qin"), ("lu", "lv"), ("n", "ng")):
            self.assertFalse(near(a, b))
        self.assertFalse(self.h._wake_phonetic_prefix("小思思", "小狮狮"))

    def test_phonetic_word_only_and_command_follow_existing_lifecycle(self):
        self.listener._stream = object()
        self.say("小金鱼")
        self.assertEqual(self.events("transcript"), [])
        self.assertEqual(self.events("wake-state")[-1]["state"], "listening")
        self.say("打开日程")
        self.assertEqual(self.events("transcript")[0]["text"], "打开日程")
        self.assertEqual(self.events("wake-state")[-1]["state"], "waiting")
        self.say("还有天气")
        self.assertEqual(len(self.events("transcript")), 1)
        self.say("小静雨告诉我天气")
        self.assertEqual(self.events("transcript")[-1]["text"], "告诉我天气")
        self.assertEqual(self.listener._wake_deadline, 0)

    def test_bundled_dictionary_and_missing_data_are_not_silent(self):
        chars, phrases, _ = self.h._wake_pinyin_data()
        self.assertEqual(len(chars), 41923)
        self.assertEqual(len(phrases), 8756)
        self.assertEqual(self.h._wake_pronunciation("重庆"), ("chong", "qing"))
        self.assertEqual(self.h._wake_pronunciation("重庆", with_tones=True), ("chóng", "qìng"))
        self.assertEqual(self.h._wake_pronunciation("吕吕"), ("lv", "lv"))
        self.h._wake_pronunciation.cache_clear()
        with patch.object(self.h, "_wake_pinyin_data", side_effect=FileNotFoundError("bundled pinyin missing")):
            with self.assertRaises(FileNotFoundError):
                self.h.match_wake_prefix("小金鱼", ["小鲸鱼"])
        self.assertEqual(self.h.match_wake_prefix("小金鱼", ["小鲸鱼"]), ("小鲸鱼", ""))

    def test_acoustic_names_form_toned_keyword_candidates(self):
        encoded = self.h._wake_candidates(["emik", "小鲸鱼", "重庆"])
        candidates = json.loads(base64.b64decode(encoded))
        self.assertIn({"id": 1, "variant": False, "phones": ["x", "iǎo", "j", "īng", "y", "ú"]}, candidates)
        self.assertIn({"id": 1, "variant": True, "phones": ["x", "iǎo", "j", "ìng", "y", "ú"]}, candidates)
        self.assertIn({"id": 2, "variant": False, "phones": ["ch", "óng", "q", "ìng"]}, candidates)
        self.assertIsNone(self.h._wake_candidates(["emik"]))

    def test_acoustic_match_arms_despite_empty_asr_if_only_name(self):
        self.listener._stream = object()
        with patch.object(self.h._wake_acoustic, "binding", return_value=("http://127.0.0.1", "token")), \
                patch.object(self.h._wake_acoustic, "detect", return_value=(True, (0, 120, 800))):
            self.say("")
        self.assertEqual(self.asr.call_count, 1)
        self.assertEqual(self.events("wake-state")[-1]["state"], "listening")
        self.assertEqual(self.events("transcript"), [])

    def test_acoustic_match_retranscribes_contiguous_command(self):
        h = self.h
        audio = np.sin(np.arange(h.SR * 2) / 10).astype("float32") * 0.2
        self.asr.side_effect = [{"text": "消失了，打开日程"}, {"text": "打开日程"}]
        with patch.object(h._wake_acoustic, "binding", return_value=("http://127.0.0.1", "token")), \
                patch.object(h._wake_acoustic, "detect", return_value=(True, (0, 120, 750))):
            self.listener._handle_segment(audio, self.listener._settings())
        result, = self.events("transcript")
        self.assertEqual((result["wake"], result["wake_source"], result["text"]), ("小鲸鱼", "acoustic", "打开日程"))
        self.assertEqual(len(self.asr.call_args.args[0]), h.SR * 2 - int(0.780 * h.SR))

    def test_acoustic_command_keeps_a_corroborated_first_pass_suffix(self):
        self.assertEqual(self.h._preserve_wake_command("胡蘿褒明天出門記得提醒我", "胡萝卜", "出門記得提醒我"),
                         "明天出門記得提醒我")
        self.assertEqual(self.h._preserve_wake_command("识别失败", "小鲸鱼", "打开日程"), "打开日程")

    def test_acoustic_short_crop_retries_instead_of_delivering_asr_repetition(self):
        h = self.h
        audio = np.sin(np.arange(h.SR) / 10).astype("float32") * 0.2
        self.asr.side_effect = [{"text": "识别失败"}, {"text": "4-" * 150}, {"text": "几点了"}]
        with patch.object(h._wake_acoustic, "binding", return_value=("http://127.0.0.1", "token")), \
                patch.object(h._wake_acoustic, "detect", return_value=(True, (0, 120, 620))):
            self.listener._handle_segment(audio, self.listener._settings())
        self.assertEqual(self.events("transcript")[0]["text"], "几点了")

    def test_acoustic_match_survives_a_failed_tail_asr(self):
        h = self.h
        audio = np.sin(np.arange(h.SR) / 10).astype("float32") * 0.2
        self.asr.side_effect = [{"text": "识别失败"}, RuntimeError("ASR unavailable for first cut"), {"text": "几点了"}]
        with patch.object(h._wake_acoustic, "binding", return_value=("http://127.0.0.1", "token")), \
                patch.object(h._wake_acoustic, "detect", return_value=(True, (0, 120, 620))):
            self.listener._handle_segment(audio, self.listener._settings())
        result, = self.events("transcript")
        self.assertEqual((result["wake_source"], result["text"]), ("acoustic", "几点了"))

    def test_acoustic_match_waits_for_next_utterance_when_both_tail_cuts_fail(self):
        h = self.h
        self.listener._stream = object()
        audio = np.sin(np.arange(h.SR) / 10).astype("float32") * 0.2
        self.asr.side_effect = [{"text": "识别失败"}, RuntimeError("first cut"), RuntimeError("wider cut")]
        with patch.object(h._wake_acoustic, "binding", return_value=("http://127.0.0.1", "token")), \
                patch.object(h._wake_acoustic, "detect", return_value=(True, (0, 120, 620))):
            self.listener._handle_segment(audio, self.listener._settings())
        self.assertEqual(self.events("transcript"), [])
        self.assertEqual(self.events("wake-state")[-1]["state"], "listening")
        self.asr.side_effect = None
        self.say("几点了")
        result, = self.events("transcript")
        self.assertEqual(result["text"], "几点了")

    def test_acoustic_match_cannot_override_clear_conflicting_syllable(self):
        with patch.object(self.h._wake_acoustic, "binding", return_value=("http://127.0.0.1", "token")), \
                patch.object(self.h._wake_acoustic, "detect", return_value=(True, (0, 120, 750))):
            self.say("小青鱼帮我打开日程")
        self.assertEqual(self.events("transcript"), [])
        self.assertEqual(self.listener._wake_deadline, 0)

    def test_stale_acoustic_match_is_discarded_after_ptt_override(self):
        def late_match(*args):
            self.listener.pause()
            self.listener.resume()
            return True, (0, 120, 750)
        with patch.object(self.h._wake_acoustic, "binding", return_value=("http://127.0.0.1", "token")), \
                patch.object(self.h._wake_acoustic, "detect", side_effect=late_match):
            self.say("没识别出来")
        self.assertEqual(self.events("transcript"), [])
        self.assertEqual(self.listener._wake_deadline, 0)

    def test_phonetic_stale_asr_after_pause_cannot_arm_or_deliver(self):
        def late_asr(audio):
            self.listener.pause(); self.listener.resume()
            return {"text": "小金鱼旧指令"}
        self.asr.side_effect = late_asr
        self.say("unused")
        self.assertEqual(self.events("transcript"), [])
        self.assertEqual(self.listener._wake_deadline, 0)

    def test_unrelated_speech_has_no_transcript_recent_input_event_or_text_log(self):
        self.say("今天说一个私人的秘密")
        self.say("小鲸鱼告诉我天气")
        result, = self.events("transcript")
        self.assertEqual(result["text"], "告诉我天气")
        self.assertEqual(result["recent"], [])
        self.assertEqual(result["mode"], "wake")
        self.assertEqual(result["captureId"], "capture-a")
        self.assertEqual(self.listener.recent_window()["count"], 0)
        self.assertNotIn("私人的秘密", str(self.emit.call_args_list))

    def test_word_only_arms_then_accepts_exactly_one_next_utterance(self):
        self.listener._stream = object()
        self.say("小鲸鱼")
        self.assertEqual(self.events("transcript"), [])
        state = self.events("wake-state")[-1]
        self.assertEqual(state["state"], "listening")
        self.assertGreater(state["deadlineAt"], 1_000_000_000_000)
        self.say("帮我安排明天的计划")
        self.assertEqual(len(self.events("transcript")), 1)
        self.assertEqual(self.events("wake-state")[-1]["state"], "waiting")
        self.say("这句话不应该投递")
        self.assertEqual(len(self.events("transcript")), 1)

    def test_keyword_plus_command_strips_prefix_and_ignores_semantic_setting(self):
        self.h.CFG["semantic"]["experimentalEnabled"] = True
        self.say("小鲸鱼，请帮我看看日程")
        result, = self.events("transcript")
        self.assertEqual(result["text"], "请帮我看看日程")
        self.assertEqual(result["wake_source"], "wakeword")
        self.assertNotIn("semantic_score", result)
        self.assertEqual(self.listener._wake_deadline, 0)

    def test_timeout_uses_monotonic_not_wall_clock_and_clears_buffer(self):
        self.listener._stream = object()
        with patch.object(self.h.time, "monotonic", return_value=50), patch.object(self.h.time, "time", return_value=1700000000):
            self.say("小鲸鱼")
        self.listener._blocks = [b"old"]
        self.listener._block_bytes = 3
        with patch.object(self.h.time, "monotonic", return_value=59), patch.object(self.h.time, "time", return_value=1800000000):
            self.listener._check_idle(self.listener._settings())
            self.assertEqual(self.listener._wake_deadline, 60)
        with patch.object(self.h.time, "monotonic", return_value=61), patch.object(self.h.time, "time", return_value=1600000000):
            self.listener._check_idle(self.listener._settings())
        self.assertEqual(self.events("wake-state")[-1]["reason"], "timeout")
        self.assertEqual(self.listener._blocks, [])
        self.assertEqual(self.listener._wake_deadline, 0)

    def test_arming_discards_audio_already_captured_in_same_vad_batch(self):
        h=self.h; state=self.listener._new_state()
        utterance=np.concatenate([np.full((20,h.FRAME),0.1,dtype="float32"),np.zeros((30,h.FRAME),dtype="float32")])
        self.asr.side_effect=[{"text":"小鲸鱼"},{"text":"不能作为唤醒后命令"}]
        self.listener._consume_frames(np.concatenate([utterance,utterance]),state,self.listener._settings())
        self.assertEqual(self.asr.call_count, 1)
        self.assertEqual(self.events("transcript"), [])
        self.assertEqual([event["state"] for event in self.events("voice-input")], ["attempt"])
        self.assertFalse(state["in_seg"])

    def test_ptt_override_invalidates_old_inference_even_after_resume(self):
        def late_asr(audio):
            self.listener.pause(); self.listener.resume()
            return {"text":"小鲸鱼旧指令"}
        self.asr.side_effect=late_asr
        self.say("unused")
        self.assertEqual(self.events("transcript"), [])
        self.assertEqual(self.listener._wake_deadline, 0)

    def test_ptt_can_pause_while_prosody_is_blocked_without_stale_delivery(self):
        entered=threading.Event();release=threading.Event();paused=threading.Event()
        def slow_prosody(*args):
            entered.set();release.wait(2);return {}
        with patch.object(self.h,"prosody",side_effect=slow_prosody):
            worker=threading.Thread(target=lambda:self.say("小鲸鱼告诉我天气"))
            worker.start();self.assertTrue(entered.wait(1))
            interrupter=threading.Thread(target=lambda:(self.listener.pause(),paused.set()))
            interrupter.start()
            try:
                self.assertTrue(paused.wait(0.5),"PTT must not await prosody")
            finally:
                release.set();worker.join(2);interrupter.join(2)
        self.assertEqual(self.events("transcript"),[])

    def test_short_next_command_is_valid_after_explicit_wake(self):
        self.say("小鲸鱼")
        self.say("yes")
        self.assertEqual(self.events("transcript")[0]["text"],"yes")

    def test_revoke_or_stop_during_asr_never_arms_or_delivers(self):
        for action in (lambda: self.listener.stop_event.set(), lambda: self.h.CFG.update(voiceSessionEpoch="changed")):
            self.listener.stop_event.clear(); self.h.CFG["voiceSessionEpoch"]="epoch"
            def late_asr(audio):
                action(); return {"text":"小鲸鱼告诉我天气"}
            self.asr.side_effect=late_asr
            self.say("unused")
        self.assertEqual(self.events("transcript"), [])
        self.assertEqual(self.events("wake-state"), [])

    def test_no_stream_is_starting_not_waiting_and_pause_is_explicit(self):
        self.assertEqual(self.listener._wake_snapshot()["state"], "starting")
        self.listener.pause()
        self.assertEqual(self.listener._wake_snapshot()["state"], "paused")
        self.listener.resume()
        self.assertEqual(self.listener._wake_snapshot()["state"], "starting")

    def test_duplicate_commands_and_speaker_rejection_stay_gated(self):
        self.say("小鲸鱼告诉我天气"); self.say("小鲸鱼告诉我天气")
        self.assertEqual(len(self.events("transcript")), 1)
        self.h.CFG["speakerVerification"]={"enabled":True}
        with patch.object(self.h,"identify",return_value=(0.1,False,"other")):
            self.say("小鲸鱼帮我读日程")
        self.assertEqual(len(self.events("transcript")), 1)
        self.assertEqual(self.events("always-drop")[-1]["reason"],"speaker")

    def test_recording_retention_requires_literal_manual_opt_in(self):
        for setting in (None, False, "true", 1):
            self.h.CFG["retainRecordings"]=setting
            with patch.object(self.h.os,"makedirs") as mkdir:
                self.assertIsNone(self.h.save_recording(self.audio))
                mkdir.assert_not_called()
        self.h.CFG["retainRecordings"]=True
        with tempfile.TemporaryDirectory() as directory, patch.object(self.h,"RECORDINGS_DIR",directory):
            path=self.h.save_recording(self.audio)
            self.assertTrue(Path(path).is_file())

    def test_listener_mode_switch_stops_old_queue_and_starts_clean(self):
        old=self.listener
        old.recent.append({"text":"old private","at":1})
        old._blocks=[b"old"]; old._block_bytes=3
        with patch.object(self.h,"_always",old), patch.object(old,"is_alive",return_value=True), patch.object(self.h.AlwaysListener,"start"), patch.object(self.h,"ptt_status",return_value={}):
            self.h.op_always({"enabled":True,"mode":"always","captureId":"capture-b"})
            self.assertTrue(old.stop_event.is_set())
            self.assertEqual(old._blocks,[])
            self.assertEqual(list(old.recent),[])
            self.assertEqual(self.h._always.mode,"always")
            self.assertEqual(self.h._always.capture_id,"capture-b")
            self.assertIsNot(self.h._always,old)


if __name__ == "__main__":
    unittest.main()
