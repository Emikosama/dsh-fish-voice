"""Synthetic backend probes and opt-in compute settings. No dependencies or model weights required."""
import importlib.util
from pathlib import Path
import types
import unittest
from unittest.mock import Mock, patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('model_compute', ROOT/'helper/model_compute.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ComputeProbeTests(unittest.TestCase):
    def test_missing_dependencies_are_not_claimed_available(self):
        with patch.object(module.importlib, 'import_module', side_effect=ImportError()):
            result = module.probe()
        self.assertEqual(result['default'], 'cpu')
        self.assertFalse(result['backends']['sensevoice']['cpu']['available'])
        self.assertFalse(result['backends']['whisper']['cuda']['available'])

    def test_gpu_brand_or_onnx_package_is_not_backend_proof(self):
        sherpa = types.SimpleNamespace(OfflineRecognizer=types.SimpleNamespace(from_sense_voice=lambda: None), get_available_providers=lambda: ['cpu', 'cuda'])
        with patch.object(module.importlib, 'import_module', side_effect=lambda name: sherpa if name == 'sherpa_onnx' else (_ for _ in ()).throw(ImportError())):
            result = module.probe()
        self.assertTrue(result['backends']['sensevoice']['cpu']['available'])
        self.assertFalse(result['backends']['sensevoice']['cuda']['available'])
        self.assertTrue(result['backends']['sensevoice']['cuda']['providerAdvertised'])

    def test_whisper_queries_actual_backend_devices_and_types(self):
        ct = types.SimpleNamespace(get_cuda_device_count=Mock(return_value=1), get_supported_compute_types=Mock(side_effect=lambda device, *args: {'int8'} if device == 'cpu' else {'int8_float16','float16'}))
        fw = types.SimpleNamespace(WhisperModel=lambda: None)
        with patch.object(module.importlib, 'import_module', side_effect=lambda name: {'ctranslate2':ct,'faster_whisper':fw}[name]):
            result = module.probe()
        self.assertTrue(result['backends']['whisper']['cpu']['available'])
        self.assertTrue(result['backends']['whisper']['cuda']['available'])
        self.assertFalse(result['backends']['whisper']['cuda']['runtimeLoaded'])
        ct.get_cuda_device_count.assert_called_once()
        self.assertEqual(ct.get_supported_compute_types.call_args.args, ('cuda', 0))
        self.assertEqual(result['backends']['whisper']['cuda']['deviceIndex'], 0)

    def test_precision_priority_uses_only_supported_types(self):
        priority = ['int8_float16', 'float16', 'int8_float32', 'float32', 'int8']
        for offset, expected in enumerate(priority):
            with self.subTest(expected=expected):
                ct = types.SimpleNamespace(get_cuda_device_count=lambda: 1,
                                           get_supported_compute_types=lambda *_: set(priority[offset:]))
                self.assertEqual(module.select_whisper_gpu(ct)['computeType'], expected)

    def test_bad_first_device_does_not_hide_later_usable_device(self):
        query = Mock(side_effect=[RuntimeError('driver failed'), {'bfloat16'}, {'float32'}])
        ct = types.SimpleNamespace(get_cuda_device_count=lambda: 3, get_supported_compute_types=query)
        result = module.select_whisper_gpu(ct)
        self.assertEqual(result['deviceIndex'], 2)
        self.assertEqual(result['computeType'], 'float32')
        self.assertEqual([call.args for call in query.call_args_list], [('cuda', 0), ('cuda', 1), ('cuda', 2)])

    def test_device_enumeration_is_bounded_and_validated(self):
        for count in [0, -1, True, '8', 1.5, 1000000]:
            with self.subTest(count=count):
                query = Mock(return_value={'unsupported'})
                ct = types.SimpleNamespace(get_cuda_device_count=lambda: count, get_supported_compute_types=query)
                self.assertIsNone(module.select_whisper_gpu(ct))
                self.assertEqual(query.call_count, 8 if count == 1000000 else 0)

    def test_cpu_query_failure_does_not_hide_gpu(self):
        def query(device, *_):
            if device == 'cpu':
                raise RuntimeError('cpu unavailable')
            return {'float16'}
        ct = types.SimpleNamespace(get_cuda_device_count=lambda: 1, get_supported_compute_types=query)
        fw = types.SimpleNamespace(WhisperModel=lambda: None)
        with patch.object(module.importlib, 'import_module', side_effect=lambda name: {'ctranslate2': ct, 'faster_whisper': fw}[name]):
            result = module.probe()
        self.assertFalse(result['backends']['whisper']['cpu']['available'])
        self.assertTrue(result['backends']['whisper']['cuda']['available'])
        self.assertEqual(result['backends']['whisper']['cuda']['computeType'], 'float16')

    def test_device_query_errors_are_unavailable(self):
        for error in [ImportError(), AttributeError(), RuntimeError(), OSError(), MemoryError()]:
            ct = types.SimpleNamespace(get_cuda_device_count=Mock(side_effect=error))
            self.assertIsNone(module.select_whisper_gpu(ct))


if __name__ == '__main__':
    unittest.main()
