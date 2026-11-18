"""Model loading is local-only; synthetic data, no network or model weights."""
import copy
import importlib.util
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch


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
        for cause in [FileNotFoundError("missing model"), OSError("damaged model"), ValueError("inference failed")]:
            with self.subTest(kind=type(cause).__name__), \
                    patch.dict(os.environ, {"SENSEVOICE_ASR_BACKEND": "native"}), \
                    patch.object(self.h, "asr_sensevoice", side_effect=cause), \
                    patch.object(self.h, "_asr_managed") as fallback, patch.object(self.h, "log"), \
                    patch.object(self.h.urllib.request, "urlopen", side_effect=AssertionError("network forbidden")) as network:
                with self.assertRaisesRegex(RuntimeError, "请在设置中检查模型和运行环境后重试"):
                    self.h.transcribe_audio([])
                fallback.assert_not_called()
                network.assert_not_called()

    def test_missing_model_is_detected_before_native_loading(self):
        with patch.dict(os.environ, {"SENSEVOICE_MODEL_DIR": self.home.name}), \
                patch.dict(sys.modules, {"sherpa_onnx": None}):
            with self.assertRaisesRegex(FileNotFoundError, "缺少模型或词表"):
                self.h.get_recognizer()
        self.assertEqual(self.h.loaded_models(), [])


if __name__ == "__main__":
    unittest.main()
