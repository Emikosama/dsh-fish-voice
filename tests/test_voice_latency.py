"""Offline regressions: synthetic samples only; no models, microphone, or HTTP.

Run: python -m unittest discover -s tests -p 'test_voice_latency.py' -v
"""
import copy
import importlib.util
import math
import os
from pathlib import Path
import sys
import tempfile
import types
import unittest
from contextlib import ExitStack
from unittest.mock import Mock, patch

import numpy as np


class VoiceLatencyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.home = tempfile.TemporaryDirectory(prefix="whale-ear-tests-")
        source = Path(__file__).resolve().parents[1] / "helper" / "voice_helper.py"
        spec = importlib.util.spec_from_file_location("voice_helper_latency_tests", source)
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
        h.CFG["voiceSessionId"] = "session-a"
        h.CFG["semantic"]["enabled"] = False
        self.stack.enter_context(patch.object(h, "_SEM_CACHE", {}))
        self.stack.enter_context(patch.object(h, "_SEM_STATE", copy.deepcopy(h._SEM_STATE)))
        self.stack.enter_context(patch.object(h, "_current_recorder", None))
        self.stack.enter_context(patch.object(h, "_gen", 0))
        self.stack.enter_context(patch.object(h, "_threads", set()))
        self.stack.enter_context(patch.object(h, "reload_cfg"))
        self.emit = self.stack.enter_context(patch.object(h, "emit"))
        self.stack.enter_context(patch.object(h, "log"))
        self.stack.enter_context(patch.object(h.urllib.request, "urlopen", side_effect=AssertionError("network forbidden")))
        self.stack.enter_context(patch.object(h, "get_embedder", side_effect=AssertionError("model load forbidden")))
        self.stack.enter_context(patch.object(h, "get_recognizer", side_effect=AssertionError("model load forbidden")))
        self.audio = np.zeros(h.SR * 2, dtype="float32")
        self.asr_result = {"text": "依依你好", "lang": "zh", "emotion": "HAPPY", "event_tag": "Speech"}

    def enable(self):
        self.h.CFG["speakerVerification"] = {"enabled": True}

    def mock_pipeline(self):
        asr = self.stack.enter_context(patch.object(self.h, "transcribe_audio", return_value=dict(self.asr_result)))
        prosody = self.stack.enter_context(patch.object(self.h, "prosody", return_value={"meanF0": 130.0}))
        identify = self.stack.enter_context(patch.object(self.h, "identify", return_value=(0.9, True, "owner")))
        return asr, prosody, identify

    def events(self, name):
        return [c.kwargs for c in self.emit.call_args_list if c.kwargs.get("event", c.args[0] if c.args else None) == name]

    def assert_timings(self, result):
        self.assertRegex(result["traceId"], r"^[a-f0-9]{16}$")
        for key, value in result["timings"].items():
            self.assertTrue(key.endswith("Ms"))
            self.assertIsInstance(value, (float, int))
            self.assertTrue(math.isfinite(value))
            self.assertGreaterEqual(value, 0)

    def test_free_and_wake_recognition_errors_are_content_free_and_scoped(self):
        h = self.h
        h.CFG['voiceSessionEpoch'] = 'captured-epoch'
        for mode in ['always', 'wake']:
            with self.subTest(mode=mode):
                self.emit.reset_mock()
                listener = h.AlwaysListener(mode, 'captured-stream')
                turn = h.InputTurn(mode)
                turn.capture_id = listener.capture_id
                if mode == 'wake':
                    turn.attempt()
                else:
                    turn.start()
                with patch.object(h, 'transcribe_audio', side_effect=RuntimeError('PRIVATE speech /private/model')):
                    listener._handle_segment(np.ones(h.SR, dtype='float32'), listener._settings(), turn)
                failures = [event for event in self.events('voice-input') if event['state'] == 'error']
                self.assertEqual(len(failures), 1)
                self.assertEqual((failures[0]['code'], failures[0]['inputTurnId']), ('recognition', turn.id))
                self.assertEqual((failures[0]['voiceSessionEpoch'], failures[0]['captureId']), ('captured-epoch', 'captured-stream'))
                self.assertNotIn('PRIVATE', str(failures))

    def test_default_and_malformed_settings_require_literal_true(self):
        self.assertEqual(self.h.DEFAULTS["speakerVerification"], {"enabled": False})
        for setting in (None, False, True, "true", 1, [], {}, {"enabled": "true"}, {"enabled": 1}, {"enabled": None}, {"enabled": False}):
            with self.subTest(setting=setting):
                self.h.CFG["speakerVerification"] = setting
                self.assertFalse(self.h.speaker_verification_enabled())
        self.h.CFG.pop("speakerVerification")
        self.assertFalse(self.h.speaker_verification_enabled())
        self.enable()
        self.assertTrue(self.h.speaker_verification_enabled())

    def test_identify_off_bypasses_stored_prints_and_embedding(self):
        with patch.object(self.h, "load_voiceprints", return_value={"owner": {"embedding": [1, 0]}}) as load, patch.object(self.h, "embed_audio") as embed:
            self.assertEqual(self.h.identify(self.audio), (None, None, None))
            load.assert_not_called()
            embed.assert_not_called()

    def test_identify_enabled_matching_rejection_and_unknown(self):
        self.enable()
        with patch.object(self.h, "load_voiceprints", return_value={"owner": {"embedding": [1, 0]}}), patch.object(self.h, "embed_audio", return_value=np.array([0.6, 0.8])) as embed:
            self.assertEqual(self.h.identify(self.audio), (0.6, True, "owner"))
            self.h.CFG["threshold"] = 0.7
            self.assertEqual(self.h.identify(self.audio), (0.6, False, "owner"))
            embed.return_value = None
            self.assertEqual(self.h.identify(self.audio), (None, None, None))
        with patch.object(self.h, "load_voiceprints", return_value={}), patch.object(self.h, "embed_audio") as embed:
            self.assertEqual(self.h.identify(self.audio), (None, None, None))
            embed.assert_not_called()

    def test_full_result_off_keeps_asr_emotion_and_prosody(self):
        asr, prosody, identify = self.mock_pipeline()
        out = self.h.full_result(self.audio)
        self.assertEqual({k: out[k] for k in self.asr_result}, self.asr_result)
        self.assertEqual(out["prosody"], {"meanF0": 130.0})
        self.assertFalse(out["speaker_verification"])
        for key in ("speaker_score", "speaker_ok", "speaker_name"):
            self.assertIsNone(out[key])
        asr.assert_called_once()
        prosody.assert_called_once()
        identify.assert_not_called()
        self.assertNotIn("speakerMs", out["timings"])
        self.assert_timings(out)

    def test_full_result_enabled_preserves_metadata(self):
        self.enable()
        _, _, identify = self.mock_pipeline()
        out = self.h.full_result(self.audio)
        identify.assert_called_once()
        self.assertEqual((out["speaker_score"], out["speaker_ok"], out["speaker_name"]), (0.9, True, "owner"))
        self.assertIn("speakerMs", out["timings"])
        self.assert_timings(out)

    def test_short_audio_runs_no_inference(self):
        asr, prosody, identify = self.mock_pipeline()
        self.assertIn("error", self.h.full_result(np.zeros(100, dtype="float32")))
        for mock in (asr, prosody, identify):
            mock.assert_not_called()

    def test_always_off_delivers_wake_without_identification(self):
        self.h.CFG["semantic"]["experimentalEnabled"] = True
        asr, prosody, identify = self.mock_pipeline()
        listener = self.h.AlwaysListener()
        listener._handle_segment(self.audio, listener._settings())
        identify.assert_not_called()
        asr.assert_called_once()
        prosody.assert_called_once()
        out, = self.events("transcript")
        self.assertEqual(out["voiceSessionId"], "session-a")
        self.assertEqual(out["wake_source"], "wakeword")
        self.assertFalse(out["speaker_verification"])
        self.assert_timings(out)

    def test_always_enabled_rejects_before_asr(self):
        self.enable()
        asr, prosody, identify = self.mock_pipeline()
        identify.return_value = (0.1, False, "owner")
        listener = self.h.AlwaysListener()
        listener._handle_segment(self.audio, listener._settings())
        asr.assert_not_called()
        prosody.assert_not_called()
        self.assertFalse(self.events("transcript"))
        self.assertEqual(self.events("always-drop")[0]["reason"], "speaker")

    def test_always_no_wake_still_drops_when_verification_off(self):
        self.h.CFG["semantic"]["experimentalEnabled"] = True
        asr, _, identify = self.mock_pipeline()
        asr.return_value = {**self.asr_result, "text": "今天阳光很好"}
        listener = self.h.AlwaysListener()
        listener._handle_segment(self.audio, listener._settings())
        identify.assert_not_called()
        self.assertFalse(self.events("transcript"))
        dropped, = self.events("always-drop")
        self.assertEqual(dropped["reason"], "no-wake")
        self.assertNotIn("text", dropped)
        self.assertNotIn("text", listener.last_drop)

    def test_free_microphone_default_delivers_without_wake_or_semantic_network(self):
        asr, _, identify = self.mock_pipeline()
        asr.return_value = {**self.asr_result, "text": "今天阳光很好"}
        listener = self.h.AlwaysListener()
        with patch.object(self.h, "semantic_score") as score, patch.object(self.h, "_match_wake") as wake:
            listener._handle_segment(self.audio, listener._settings())
        score.assert_not_called()
        wake.assert_not_called()
        identify.assert_not_called()
        out, = self.events("transcript")
        self.assertEqual(out["text"], "今天阳光很好")
        self.assertNotIn("wake_source", out)
        self.assertNotIn("semantic_score", out)

    def test_legacy_or_truthy_semantic_flags_do_not_opt_in_or_probe(self):
        for value in [None, False, "true", 1, {}, []]:
            with self.subTest(value=value):
                self.h.CFG["semantic"] = {"enabled": True, "experimentalEnabled": value}
                with patch.object(self.h, "_embed_http") as http, patch.object(self.h, "_embed_cached") as cached:
                    self.assertFalse(self.h.semantic_settings()["enabled"])
                    self.assertEqual(self.h.semantic_score("你好"), (None, None, "disabled"))
                    self.assertIsNone(self.h.semantic_probe())
                    self.h.semantic_status(probe=True)
                    self.h.warm_semantic()
                    http.assert_not_called()
                    cached.assert_not_called()
        self.assertFalse(self.h.DEFAULTS["semantic"]["experimentalEnabled"])

    def test_free_microphone_still_filters_garbage_and_repeated_segments(self):
        asr, _, _ = self.mock_pipeline()
        listener = self.h.AlwaysListener()
        asr.return_value = {**self.asr_result, "text": "The."}
        listener._handle_segment(self.audio, listener._settings())
        self.assertFalse(self.events("transcript"))
        self.assertEqual(self.events("always-drop")[-1]["reason"], "garbage")
        asr.return_value = {**self.asr_result, "text": "请帮我看一下屏幕"}
        listener._handle_segment(self.audio, listener._settings())
        listener._handle_segment(self.audio, listener._settings())
        self.assertEqual(len(self.events("transcript")), 1)
        self.assertEqual(self.events("always-drop")[-1]["reason"], "repeat")

    def test_free_microphone_stopped_paused_or_ungranted_does_no_inference(self):
        asr, _, _ = self.mock_pipeline()
        for reason in ["stopped", "paused", "ungranted"]:
            with self.subTest(reason=reason):
                self.h.CFG["voiceSessionId"] = "session-a"
                listener = self.h.AlwaysListener()
                if reason == "stopped":
                    listener.stop_event.set()
                elif reason == "paused":
                    listener.paused.set()
                else:
                    self.h.CFG["voiceSessionId"] = None
                listener._handle_segment(self.audio, listener._settings())
        asr.assert_not_called()
        self.assertFalse(self.events("transcript"))

    def test_disabling_experiment_during_score_removes_wake_gate(self):
        self.h.CFG["semantic"]["experimentalEnabled"] = True
        asr, _, _ = self.mock_pipeline()
        asr.return_value = {**self.asr_result, "text": "今天阳光很好"}
        listener = self.h.AlwaysListener()
        def score(_text):
            self.h.CFG["semantic"]["experimentalEnabled"] = False
            return 0.01, "not-a-match", None
        with patch.object(self.h, "semantic_score", side_effect=score):
            listener._handle_segment(self.audio, listener._settings())
        self.assertEqual(len(self.events("transcript")), 1)
        self.assertFalse(self.events("always-drop"))

    def test_enrollment_remains_available_off_without_enabling(self):
        with patch.object(self.h, "embed_audio", return_value=np.array([1.0, 0.0])) as embed, patch.object(self.h, "load_voiceprints", return_value={}), patch.object(self.h, "save_voiceprints") as save:
            self.h._enroll_from_audio("test-owner", self.audio)
        embed.assert_called_once()
        self.assertEqual(save.call_args.args[0]["test-owner"]["embedding"], [1.0, 0.0])
        self.assertEqual(len(self.events("enrolled")), 1)
        self.assertFalse(self.h.speaker_verification_enabled())

    def test_preload_uses_the_native_recognizer_and_optional_campplus(self):
        fake_modules = {name: types.ModuleType(name) for name in ("sounddevice", "sherpa_onnx", "parselmouth")}
        for backend in ("native", "managed"):
            for speaker in (False, True):
                with self.subTest(backend=backend, speaker=speaker), \
                        patch.dict(os.environ, {"SENSEVOICE_ASR_BACKEND": backend}), \
                        patch.dict(sys.modules, fake_modules), \
                        patch.object(self.h, "get_recognizer") as sense, patch.object(self.h, "get_embedder") as camp:
                    self.h.CFG["speakerVerification"] = {"enabled": speaker}
                    self.assertEqual(self.h.preload(), [])
                    self.assertEqual(sense.call_count, int(backend == "native"))
                    self.assertEqual(camp.call_count, int(speaker))

    def test_stage_timings_use_monotonic_and_record_exceptions(self):
        with patch.object(self.h.time, "perf_counter", side_effect=[10, 10.1, 10.35, 10.5]), patch.object(self.h.time, "time", side_effect=AssertionError("wall clock forbidden")):
            timer = self.h.StageTimings()
            with self.assertRaises(ValueError):
                with timer.stage("asrMs"):
                    raise ValueError("synthetic failure")
            self.assertEqual(timer.snapshot(), {"asrMs": 250.0, "processingMs": 500.0})

    def semantic_config(self):
        self.h.CFG["semantic"].update(experimentalEnabled=True, timeoutMs=1000, refs=["ref1", "ref2"])
        return self.h.semantic_settings()

    def test_semantic_budget_is_shared_by_query_and_missing_refs(self):
        self.semantic_config()
        clock = [100.0]
        timeouts = []
        def http(text, settings, timeout_ms=None):
            timeouts.append(timeout_ms)
            clock[0] += 0.4
            return np.array([1.0, 0.0])
        with patch.object(self.h.time, "monotonic", side_effect=lambda: clock[0]), patch.object(self.h, "_embed_http", side_effect=http):
            score, ref, error = self.h.semantic_score("query")
        self.assertIsNone(score)
        self.assertIsNone(ref)
        self.assertIn("预算", error)
        np.testing.assert_allclose(timeouts, [1000, 600, 200], atol=1e-6)

    def test_semantic_expired_budget_prevents_request(self):
        st = self.semantic_config()
        with patch.object(self.h.time, "monotonic", return_value=101), patch.object(self.h, "_embed_http") as http:
            with self.assertRaises(TimeoutError):
                self.h._embed_cached("missing", st, deadline=100)
            http.assert_not_called()

    def test_semantic_cache_separates_urls_and_models(self):
        st = self.semantic_config()
        with patch.object(self.h, "_embed_http", return_value=np.array([1.0, 0.0])) as http:
            self.h._embed_cached("query", st)
            self.h._embed_cached("query", st)
            self.h._embed_cached("query", {**st, "url": "http://127.0.0.1:9999/v1/embeddings"})
            self.h._embed_cached("query", {**st, "model": "other-local-model"})
        self.assertEqual(http.call_count, 3)

    def test_semantic_cached_refs_succeed_and_network_failure_degrades(self):
        st = self.semantic_config()
        for text in ("query", "ref1", "ref2"):
            self.h._SEM_CACHE[(st["url"], st["model"], text)] = np.array([1.0, 0.0])
        with patch.object(self.h, "_embed_http") as http:
            self.assertEqual(self.h.semantic_score("query"), (1.0, "ref1", None))
            http.assert_not_called()
        self.h._SEM_CACHE.clear()
        with patch.object(self.h, "_embed_http", side_effect=OSError("local service unavailable")):
            self.assertEqual(self.h.semantic_score("query"), (None, None, "OSError: local service unavailable"))

    def run_fake_ptt(self, during_inference=None):
        h = self.h
        audio = self.audio
        class FakeRecorder:
            def __init__(self, **kwargs):
                self.stop_event = h.threading.Event()
                self.reason = "stopped"
                self.duration = 2.0
            def run(self):
                return audio
        class InlineThread:
            def __init__(self, target, **kwargs):
                self.target = target
            def start(self):
                self.target()
        def result(_audio, is_current=None):
            if during_inference:
                during_inference()
            return {"event": "transcript", "text": "这是测试", "speaker_ok": None}
        with patch.object(h, "Recorder", FakeRecorder), patch.object(h.threading, "Thread", InlineThread), patch.object(h, "reload_cfg"), patch.object(h, "_always_pause"), patch.object(h, "_always_resume"), patch.object(h, "save_recording"), patch.object(h, "full_result", side_effect=result):
            h.start_recording()

    def test_ptt_current_generation_delivers_once(self):
        self.run_fake_ptt()
        out, = self.events("transcript")
        self.assertEqual(out["voiceSessionId"], "session-a")
        self.assertGreaterEqual(out["timings"]["stopToTranscriptMs"], 0)
        self.assertFalse(self.events("error"))

    def test_ptt_new_generation_during_inference_drops(self):
        self.run_fake_ptt(lambda: setattr(self.h, "_gen", self.h._gen + 1))
        self.assertFalse(self.events("transcript"))
        self.assertFalse(self.events("error"))

    def test_ptt_revoked_or_changed_session_during_inference_drops(self):
        for owner in (None, "session-b"):
            with self.subTest(owner=owner):
                self.emit.reset_mock()
                self.h.CFG["voiceSessionId"] = "session-a"
                self.run_fake_ptt(lambda: self.h.CFG.update(voiceSessionId=owner))
                self.assertFalse(self.events("transcript"))
                self.assertFalse(self.events("error"))


    def test_ptt_same_session_new_epoch_during_inference_drops(self):
        self.h.CFG["voiceSessionEpoch"] = "grant-a"
        self.run_fake_ptt(lambda: self.h.CFG.update(voiceSessionEpoch="grant-b"))
        self.assertFalse(self.events("transcript"))
        self.assertFalse(self.events("error"))

    def test_ptt_carries_epoch_and_legacy_unset_epoch(self):
        for epoch in (None, "grant-a"):
            with self.subTest(epoch=epoch):
                self.emit.reset_mock()
                self.h.CFG["voiceSessionEpoch"] = epoch
                self.run_fake_ptt()
                out, = self.events("transcript")
                self.assertEqual(out["voiceSessionEpoch"], epoch)

    def test_always_carries_current_epoch(self):
        self.h.CFG["voiceSessionEpoch"] = "grant-a"
        self.mock_pipeline()
        listener = self.h.AlwaysListener()
        listener._handle_segment(self.audio, listener._settings())
        out, = self.events("transcript")
        self.assertEqual(out["voiceSessionEpoch"], "grant-a")

    def test_always_cancellation_during_asr_emits_no_wake_or_transcript(self):
        asr, _, _ = self.mock_pipeline()
        for cancellation in ("epoch", "owner", "revoke", "stop", "pause"):
            with self.subTest(cancellation=cancellation):
                self.emit.reset_mock()
                self.h.CFG.update(voiceSessionId="session-a", voiceSessionEpoch="grant-a")
                listener = self.h.AlwaysListener()
                def cancel(_audio):
                    if cancellation == "epoch":
                        self.h.CFG["voiceSessionEpoch"] = "grant-b"
                    elif cancellation == "owner":
                        self.h.CFG["voiceSessionId"] = "session-b"
                    elif cancellation == "revoke":
                        self.h.CFG["voiceSessionId"] = None
                    elif cancellation == "stop":
                        listener.stop_event.set()
                    else:
                        listener.paused.set()
                    return dict(self.asr_result)
                asr.side_effect = cancel
                listener._handle_segment(self.audio, listener._settings())
                self.assertFalse(self.events("transcript"))
                self.assertFalse(self.events("always-event"))
                self.assertFalse(listener.in_conversation)
                self.assertEqual(listener.delivered, 0)
                self.assertEqual(len(listener.recent), 0)

    def test_always_epoch_change_during_semantic_emits_no_wake(self):
        self.h.CFG["voiceSessionEpoch"] = "grant-a"
        self.h.CFG["semantic"]["experimentalEnabled"] = True
        asr, _, _ = self.mock_pipeline()
        asr.return_value = {**self.asr_result, "text": "帮忙看一下"}
        listener = self.h.AlwaysListener()
        def semantic(_text):
            self.h.CFG["voiceSessionEpoch"] = "grant-b"
            return 0.99, "reference", None
        with patch.object(self.h, "semantic_score", side_effect=semantic):
            listener._handle_segment(self.audio, listener._settings())
        self.assertFalse(self.events("transcript"))
        self.assertFalse(self.events("always-event"))
        self.assertFalse(listener.in_conversation)

    def test_always_rechecks_before_transcript_after_wake_event(self):
        self.h.CFG["semantic"]["experimentalEnabled"] = True
        self.mock_pipeline()
        listener = self.h.AlwaysListener()
        def on_emit(*args, **kwargs):
            if kwargs.get("event") == "always-event":
                listener.stop_event.set()
        self.emit.side_effect = on_emit
        listener._handle_segment(self.audio, listener._settings())
        self.assertEqual(len(self.events("always-event")), 1)
        self.assertFalse(self.events("transcript"))
        self.assertEqual(listener.delivered, 0)


if __name__ == "__main__":
    unittest.main()
