"""SenseVoice CPU status represents the selected model and verified inference."""

import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import Mock, patch


ROOT = Path(__file__).resolve().parents[1]


class SenseVoiceComputeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.home = Path(self.temp.name)
        self.config = self.home / "whale-ear" / "config.json"
        self.config.parent.mkdir()
        self.model = self.home / "prepared"
        self.model.mkdir()
        for name in ("model.int8.onnx", "tokens.txt"):
            (self.model / name).write_bytes(b"fixture")
        self.write_config(self.model)
        spec = importlib.util.spec_from_file_location("sensevoice_compute_test", ROOT / "helper/voice_helper.py")
        self.h = importlib.util.module_from_spec(spec)
        env = patch.dict(os.environ, {"DSH_HOME": str(self.home), "SENSEVOICE_ASR_BACKEND": "native",
                                      "SENSEVOICE_MODEL_DIR": ""})
        env.start()
        self.addCleanup(env.stop)
        spec.loader.exec_module(self.h)

    def write_config(self, path):
        self.config.write_text(json.dumps({"asr": "whisper", "modelCompute": "cuda",
                                           "models": {"sensevoiceDir": str(path)}}), encoding="utf-8")

    def test_cpu_reports_loaded_then_validated_without_consulting_retired_settings(self):
        h = self.h
        result = SimpleNamespace(text="實際辨識", lang="<|zh|>", emotion="<|HAPPY|>", event="<|Speech|>")
        stream = SimpleNamespace(accept_waveform=Mock(), result=result)
        recognizer = SimpleNamespace(create_stream=lambda: stream, decode_stream=Mock())
        factory = Mock(return_value=recognizer)
        sherpa = SimpleNamespace(OfflineRecognizer=SimpleNamespace(from_sense_voice=factory))
        with patch.dict(sys.modules, {"sherpa_onnx": sherpa}), patch.object(h, "emit"):
            self.assertIsNone(h.inference_compute_status()["actual"])
            self.assertIs(h.get_recognizer(), recognizer)
            self.assertEqual(h.inference_compute_status()["actual"], "cpu")
            self.assertFalse(h.inference_compute_status()["validated"])
            self.assertEqual(h.transcribe_audio([0.2]), {
                "text": "实际辨识", "lang": "zh", "emotion": "HAPPY", "event_tag": "Speech",
            })
            self.assertEqual(h.inference_compute_status(), {
                "requested": "cpu", "actual": "cpu", "engine": "sensevoice", "computeType": "int8",
                "deviceIndex": None, "fallbackReason": None, "validated": True,
            })
        factory.assert_called_once_with(model=str(self.model / "model.int8.onnx"),
                                        tokens=str(self.model / "tokens.txt"), use_itn=True,
                                        language="auto", provider="cpu", num_threads=4)

    def test_late_compute_status_for_old_selection_does_not_replace_current_status(self):
        h = self.h
        previous = h._compute_key()
        self.write_config(self.home / "different")
        self.assertTrue(h.reload_cfg())
        self.write_config(self.model)
        self.assertTrue(h.reload_cfg())
        with patch.object(h, "emit") as emit:
            h._publish_compute(previous, validated=True)
        emit.assert_not_called()
        self.assertIsNone(h.inference_compute_status()["actual"])

    def test_handoff_effective_model_directory_overrides_stale_config(self):
        self.write_config(self.home / "obsolete")
        with patch.dict(os.environ, {"SENSEVOICE_MODEL_DIR": str(self.model)}):
            self.assertTrue(self.h.reload_cfg())
            self.assertEqual(self.h._sensevoice_dir(), str(self.model))


if __name__ == "__main__":
    unittest.main()
