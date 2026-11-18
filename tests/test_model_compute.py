"""Synthetic backend probes and opt-in compute settings. No dependencies or model weights required."""
import importlib.util
import json
import os
import subprocess
import sys
from pathlib import Path
import types
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('model_compute', ROOT/'helper/model_compute.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ComputeProbeTests(unittest.TestCase):
    def test_probe_json_can_be_decoded_as_utf8_under_a_gbk_pipe(self):
        env = {**os.environ, "PYTHONIOENCODING": "cp936", "PYTHONUTF8": "0", "PYTHONPATH": ""}
        run = subprocess.run(
            [sys.executable, "-S", str(ROOT / "helper/model_compute.py")],
            env=env, capture_output=True, check=True, timeout=10,
        )
        output = json.loads(run.stdout.decode("utf-8"))
        self.assertEqual(output["backends"]["sensevoice"]["cpu"]["reason"], "未安装 sherpa-onnx。")

    def test_missing_dependencies_are_not_claimed_available(self):
        with patch.object(module.importlib, 'import_module', side_effect=ImportError()):
            result = module.probe()
        self.assertEqual(result['default'], 'cpu')
        self.assertFalse(result['backends']['sensevoice']['cpu']['available'])
        self.assertEqual(set(result['backends']), {'sensevoice'})

    def test_gpu_brand_or_onnx_package_is_not_backend_proof(self):
        sherpa = types.SimpleNamespace(OfflineRecognizer=types.SimpleNamespace(from_sense_voice=lambda: None), get_available_providers=lambda: ['cpu', 'cuda'])
        with patch.object(module.importlib, 'import_module', side_effect=lambda name: sherpa if name == 'sherpa_onnx' else (_ for _ in ()).throw(ImportError())):
            result = module.probe()
        self.assertTrue(result['backends']['sensevoice']['cpu']['available'])
        self.assertFalse(result['backends']['sensevoice']['cuda']['available'])
        self.assertTrue(result['backends']['sensevoice']['cuda']['providerAdvertised'])


if __name__ == '__main__':
    unittest.main()
