"""Exercise enumeration in isolation: no sounddevice, microphone or model load."""
import ast
import pathlib
import sys
import types
import unittest
from unittest.mock import patch


class InputDevicesTests(unittest.TestCase):
    def load_functions(self, names=('input_devices', 'op_input_devices')):
        source = pathlib.Path(__file__).resolve().parents[1] / 'helper' / 'voice_helper.py'
        tree = ast.parse(source.read_text(encoding='utf-8'))
        selected = [node for node in tree.body if isinstance(node, ast.FunctionDef)
                    and node.name in names]
        output = []
        scope = {'emit': lambda event, **fields: output.append((event, fields))}
        exec(compile(ast.Module(body=selected, type_ignores=[]), str(source), 'exec'), scope)
        return scope, output

    def test_enumeration_only_excludes_outputs_and_bounds_candidates(self):
        scope, output = self.load_functions()
        devices = [{'name': 'Speaker', 'max_input_channels': 0}] + [
            {'name': f'Mic {i}', 'max_input_channels': 1, 'hostapi': 0} for i in range(140)]
        fake = types.SimpleNamespace(query_devices=lambda: devices,
                                     query_hostapis=lambda _: {'name': 'Fixture'})
        with patch.dict(sys.modules, {'sounddevice': fake}):
            scope['op_input_devices']({})
        self.assertEqual(output[0][0], 'input-devices')
        items = output[0][1]['inputDevices']
        self.assertEqual(len(items), 128)
        self.assertEqual(items[0]['index'], 1)
        self.assertEqual(items[0]['name'], 'Mic 0')
        # Only extracted functions + emit exist. Accidental reload, hooks or model
        # calls would raise NameError, failing this side-effect regression.

    def test_status_preserves_the_same_inventory_as_explicit_enumeration(self):
        scope, output = self.load_functions(('input_devices', 'op_input_devices', 'op_status'))
        # Only isolate the unrelated status probes. Both production enumeration
        # paths run against the same inventory, with no stream or model backend.
        scope.update({name: lambda *args, **kwargs: {} for name in (
            'load_voiceprints', 'reload_cfg', '_ptt_sync', 'device_info',
            'speaker_verification_enabled', 'cue_status', '_sensevoice_dir',
            'loaded_models', 'always_status', 'ptt_status', 'semantic_status', 'inference_compute_status')})
        scope.update(os=types.SimpleNamespace(getpid=lambda: 1),
                     cfg=lambda *args, default=None: default,
                     _current_recorder=None,
                     _capture_device=types.SimpleNamespace(status=lambda: {}),
                     DATA_DIR='unused')
        devices = [{'name': f'Mic {i}', 'max_input_channels': 1, 'hostapi': 0}
                   for i in range(12)]
        fake = types.SimpleNamespace(query_devices=lambda: devices,
                                     query_hostapis=lambda _: {'name': 'Fixture'})
        with patch.dict(sys.modules, {'sounddevice': fake}):
            scope['op_input_devices']({})
            scope['op_status']({})
        self.assertEqual([event for event, _ in output], ['input-devices', 'status'])
        self.assertEqual(len(output[0][1]['inputDevices']), 12)
        self.assertEqual(output[1][1]['inputDevices'], output[0][1]['inputDevices'])

    def test_empty_and_query_failure_remain_distinct(self):
        scope, output = self.load_functions()
        with patch.dict(sys.modules, {'sounddevice': types.SimpleNamespace(query_devices=lambda: [])}):
            scope['op_input_devices']({})
        self.assertEqual(output[-1][1]['inputDevices'], [])
        def fail():
            raise RuntimeError('No backend')
        with patch.dict(sys.modules, {'sounddevice': types.SimpleNamespace(query_devices=fail)}):
            scope['op_input_devices']({})
        self.assertIn('error', output[-1][1]['inputDevices'][0])


if __name__ == '__main__':
    unittest.main()
