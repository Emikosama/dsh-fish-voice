"""Model loading is local-only; synthetic data, no network or model weights."""
import copy
import importlib.util
import os
from pathlib import Path
import sys
import tempfile
import types
import unittest
from unittest.mock import Mock, patch


class LocalModelOnlyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.home = tempfile.TemporaryDirectory(prefix="whale-local-model-tests-")
        spec = importlib.util.spec_from_file_location("whale_local_model_tests", Path(__file__).resolve().parents[1] / "helper" / "voice_helper.py")
        cls.h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {"DSH_HOME": cls.home.name}):
            spec.loader.exec_module(cls.h)

    @classmethod
    def tearDownClass(cls):
        cls.home.cleanup()

    def setUp(self):
        self.config = patch.object(self.h, "CFG", copy.deepcopy(self.h.DEFAULTS))
        self.models = patch.object(self.h, "_models", {})
        self.config.start()
        self.models.start()
        self.addCleanup(self.config.stop)
        self.addCleanup(self.models.stop)

    def test_sensevoice_errors_never_fall_back_or_download(self):
        self.h.CFG["asr"] = "sensevoice"
        for cause in [FileNotFoundError("missing model"), OSError("damaged model"), ValueError("inference failed")]:
            with self.subTest(kind=type(cause).__name__), patch.object(self.h, "asr_sensevoice", side_effect=cause), patch.object(self.h, "asr_whisper") as fallback, patch.object(self.h, "log"), patch.object(self.h.urllib.request, "urlopen", side_effect=AssertionError("network forbidden")) as network:
                with self.assertRaisesRegex(RuntimeError, "不会自动回落 Whisper 或下载模型"):
                    self.h.transcribe_audio([])
                fallback.assert_not_called()
                network.assert_not_called()

    def test_whisper_alias_and_directory_both_use_local_files_only(self):
        for selected in ["small", "/already-prepared/local-whisper"]:
            with self.subTest(selected=selected):
                self.h._models.clear()
                self.h.CFG["models"]["whisper"] = selected
                constructor = Mock(return_value=object())
                module = types.ModuleType("faster_whisper")
                module.WhisperModel = constructor
                with patch.dict(sys.modules, {"faster_whisper": module}):
                    first = self.h.get_whisper()
                    self.assertIs(self.h.get_whisper(), first)
                constructor.assert_called_once_with(selected, device="cpu", compute_type="int8", local_files_only=True)

    def test_missing_whisper_cache_is_an_actionable_failure_without_retry(self):
        constructor = Mock(side_effect=FileNotFoundError("not cached"))
        module = types.ModuleType("faster_whisper")
        module.WhisperModel = constructor
        with patch.dict(sys.modules, {"faster_whisper": module}):
            with self.assertRaisesRegex(RuntimeError, "不会联网下载模型"):
                self.h.get_whisper()
        self.assertEqual(constructor.call_count, 1)
        self.assertTrue(constructor.call_args.kwargs["local_files_only"])
        self.assertIsNone(self.h._models.get("whisper"))

    def test_unknown_engine_does_not_choose_another_model(self):
        self.h.CFG["asr"] = "unknown"
        with patch.object(self.h, "asr_sensevoice") as sense, patch.object(self.h, "asr_whisper") as whisper:
            with self.assertRaisesRegex(ValueError, "未知 ASR"):
                self.h.transcribe_audio([])
        sense.assert_not_called()
        whisper.assert_not_called()


if __name__ == "__main__":
    unittest.main()
