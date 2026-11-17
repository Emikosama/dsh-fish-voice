"""Synthetic compute/cancellation regressions. No real GPU/model acceptance claim."""
import builtins
import copy
import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile
import threading
import time
import types
import unittest
from contextlib import ExitStack
from unittest.mock import Mock, patch

import numpy as np


class ASRComputeFallbackTests(unittest.TestCase):
    def setUp(self):
        self.stack = ExitStack()
        self.addCleanup(self.stack.close)
        home = self.stack.enter_context(tempfile.TemporaryDirectory())
        spec = importlib.util.spec_from_file_location('whale_compute_test', Path(__file__).resolve().parents[1] / 'helper/voice_helper.py')
        self.h = h = importlib.util.module_from_spec(spec)
        with patch.dict(os.environ, {'DSH_HOME': home}):
            spec.loader.exec_module(h)
        h.CFG = copy.deepcopy(h.DEFAULTS)
        h.CFG.update(asr='whisper', modelCompute='auto', voiceSessionId='owner', voiceSessionEpoch='epoch')
        h.CFG['models']['whisper'] = '/private/prepared-whisper'
        self.events = []
        self.reload_cfg = h.reload_cfg
        self.stack.enter_context(patch.object(h, '_emit_payload', lambda event, fields: self.events.append({'event': event, **fields})))
        self.stack.enter_context(patch.object(h, 'reload_cfg', return_value=True))
        self.stack.enter_context(patch.object(h, 'log'))
        self.stack.enter_context(patch.object(h.urllib.request, 'urlopen', side_effect=AssertionError('network forbidden')))
        self.ct = types.SimpleNamespace(get_cuda_device_count=Mock(return_value=1),
                                        get_supported_compute_types=Mock(return_value={'int8_float16', 'float16', 'float32'}))
        self.models = {device: types.SimpleNamespace(transcribe=Mock(side_effect=lambda *_a, _device=device, **_kw: self.transcript(_device)))
                       for device in ['cpu', 'cuda']}
        self.construct = Mock(side_effect=lambda _path, **kw: self.models[kw['device']])
        self.stack.enter_context(patch.dict(sys.modules, {'ctranslate2': self.ct,
                                                         'faster_whisper': types.SimpleNamespace(WhisperModel=self.construct)}))
        self.audio = np.sin(np.arange(16000) * .1).astype('float32')

    @staticmethod
    def transcript(text):
        return iter([types.SimpleNamespace(text=text)]), types.SimpleNamespace(language='zh')

    def devices(self):
        return [call.kwargs['device'] for call in self.construct.call_args_list]

    def status(self, **expected):
        status = self.h.inference_compute_status()
        self.assertEqual(set(status), {'requested', 'actual', 'engine', 'computeType', 'deviceIndex', 'fallbackReason', 'validated'})
        for key, value in expected.items():
            self.assertEqual(status[key], value, key)
        return status

    def test_default_and_explicit_cpu_never_probe_or_import_ct2(self):
        for explicit in [False, True]:
            self.h.CFG['modelCompute'] = 'cpu'
            if not explicit:
                self.h.CFG.pop('modelCompute')
            original_import = builtins.__import__
            def importing(name, *args, **kwargs):
                if name == 'ctranslate2':
                    self.fail('CPU selection must not import CT2 for a GPU probe')
                return original_import(name, *args, **kwargs)
            with patch('builtins.__import__', side_effect=importing):
                self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'cpu')
        self.ct.get_cuda_device_count.assert_not_called()
        self.construct.assert_called_once_with('/private/prepared-whisper', device='cpu', compute_type='int8', local_files_only=True)
        self.status(requested='cpu', actual='cpu', deviceIndex=None, fallbackReason=None, validated=True)

    def test_gpu_device_precision_and_actual_success(self):
        self.ct.get_cuda_device_count.return_value = 3
        self.ct.get_supported_compute_types.side_effect = [RuntimeError('failed device'), {'float32'}]
        self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'cuda')
        self.construct.assert_called_once_with('/private/prepared-whisper', device='cuda', device_index=1,
                                               compute_type='float32', local_files_only=True)
        self.status(requested='auto', actual='cuda', computeType='float32', deviceIndex=1, fallbackReason=None, validated=True)

    def test_unavailable_gpu_falls_back_once_and_stays_cpu(self):
        for requested in ['auto', 'cuda']:
            self.h.CFG['modelCompute'] = requested
            self.ct.get_cuda_device_count.return_value = 0
            for _ in range(3):
                self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'cpu')
            self.status(requested=requested, actual='cpu', fallbackReason='gpu-unavailable', validated=True)
        self.assertEqual(self.devices(), ['cpu', 'cpu'])
        self.assertEqual(self.ct.get_cuda_device_count.call_count, 2)

    def test_missing_ct2_falls_back_without_network(self):
        with patch.dict(sys.modules, {'ctranslate2': None}):
            self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'cpu')
        self.status(actual='cpu', fallbackReason='gpu-unavailable')

    def test_load_failure_uses_same_local_model_once_and_is_sticky(self):
        def construct(_path, **kwargs):
            if kwargs['device'] == 'cuda':
                raise RuntimeError('/secret/path and raw driver details')
            return self.models['cpu']
        self.construct.side_effect = construct
        for _ in range(3):
            self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'cpu')
        self.assertEqual(self.devices(), ['cuda', 'cpu'])
        self.assertEqual({call.args[0] for call in self.construct.call_args_list}, {'/private/prepared-whisper'})
        self.assertTrue(all(call.kwargs['local_files_only'] for call in self.construct.call_args_list))
        self.status(actual='cpu', fallbackReason='gpu-load-failed', validated=True)
        self.assertNotIn('/secret', json.dumps(self.events))
        self.assertNotIn('/private', json.dumps(self.events))

    def test_config_change_during_load_cannot_redirect_cpu_retry(self):
        def construct(_path, **kwargs):
            if kwargs['device'] == 'cuda':
                self.h.CFG['models']['whisper'] = '/new/model-not-authorized-for-this-attempt'
                raise RuntimeError('gpu load failed')
            return self.models['cpu']
        self.construct.side_effect = construct
        self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'cpu')
        self.assertEqual([call.args[0] for call in self.construct.call_args_list], ['/private/prepared-whisper'] * 2)
        self.status(actual=None, validated=False)
        self.assertFalse(any(e['inferenceCompute']['actual'] == 'cpu' for e in self.events))

    def test_lazy_partial_failure_discards_partial_output_and_closes_iterator(self):
        closed = []
        def segments():
            try:
                yield types.SimpleNamespace(text='partial must not escape')
                raise RuntimeError('driver lost')
            finally:
                closed.append(True)
        self.models['cuda'].transcribe.side_effect = lambda *_a, **_kw: (segments(), types.SimpleNamespace(language='en'))
        self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'cpu')
        self.assertEqual(closed, [True])
        self.assertEqual(self.devices(), ['cuda', 'cpu'])
        self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'cpu')
        self.models['cuda'].transcribe.assert_called_once()
        self.status(actual='cpu', fallbackReason='gpu-inference-failed', validated=True)
        self.assertNotIn('partial must not escape', json.dumps(self.events))

    def test_immediate_gpu_inference_error_and_failed_cpu_retry_never_loop(self):
        self.models['cuda'].transcribe.side_effect = RuntimeError('GPU failed')
        self.models['cpu'].transcribe.side_effect = RuntimeError('CPU failed')
        for _ in range(2):
            with self.assertRaisesRegex(RuntimeError, 'CPU failed'):
                self.h.transcribe_audio(self.audio)
        self.assertEqual(self.devices(), ['cuda', 'cpu'])
        self.models['cuda'].transcribe.assert_called_once()
        self.assertEqual(self.models['cpu'].transcribe.call_count, 2)
        self.status(actual='cpu', fallbackReason='gpu-inference-failed', validated=False)

    def test_both_loads_fail_and_gpu_stays_disabled(self):
        self.construct.side_effect = OSError('bad local runtime')
        for _ in range(2):
            with self.assertRaisesRegex(RuntimeError, '不会联网下载模型'):
                self.h.get_whisper()
        self.assertEqual(self.devices(), ['cuda', 'cpu', 'cpu'])
        self.status(actual=None, fallbackReason='gpu-load-failed', validated=False)

    def test_non_backend_exception_does_not_claim_recovery(self):
        self.models['cuda'].transcribe.side_effect = AssertionError('programming failure')
        with self.assertRaises(AssertionError):
            self.h.transcribe_audio(self.audio)
        self.assertEqual(self.devices(), ['cuda'])

    def test_cancelled_before_call_does_not_load_or_probe(self):
        with self.h._inference_authorization(lambda: False), self.assertRaises(self.h._InferenceCancelled):
            self.h.transcribe_audio(self.audio)
        self.construct.assert_not_called()
        self.ct.get_cuda_device_count.assert_not_called()

    def test_cancel_after_gpu_load_error_never_starts_cpu(self):
        allowed = [True]
        def fail(*_args, **_kwargs):
            allowed[0] = False
            raise RuntimeError('gpu load failed')
        self.construct.side_effect = fail
        with self.h._inference_authorization(lambda: allowed[0]), self.assertRaises(self.h._InferenceCancelled):
            self.h.transcribe_audio(self.audio)
        self.assertEqual(self.devices(), ['cuda'])
        self.status(actual=None, fallbackReason='gpu-load-failed', validated=False)

    def test_cancel_or_watchdog_after_inference_error_never_retries(self):
        for cause in ['predicate', 'watchdog']:
            self.h._models.clear()
            self.h._whisper_state.clear()
            self.construct.reset_mock()
            allowed = [True]
            context = {'done': False, 'lock': threading.RLock(), 'requestId': 'private-request'}
            self.h._request_context.current = context
            def fail(*_args, **_kwargs):
                if cause == 'watchdog':
                    context['done'] = True
                else:
                    allowed[0] = False
                raise RuntimeError('gpu inference failed')
            self.models['cuda'].transcribe.side_effect = fail
            with self.h._inference_authorization(lambda: allowed[0]), self.assertRaises(self.h._InferenceCancelled):
                self.h.transcribe_audio(self.audio)
            self.assertEqual(self.devices(), ['cuda'])
            self.assertTrue(all('requestId' not in event for event in self.events))
            self.h._request_context.current = None

    def test_watchdog_expiring_inside_predicate_prevents_start(self):
        context = {'done': False}
        self.h._request_context.current = context
        def predicate():
            context['done'] = True
            return True
        with self.h._inference_authorization(predicate), self.assertRaises(self.h._InferenceCancelled):
            self.h.transcribe_audio(self.audio)
        self.construct.assert_not_called()

    def test_full_result_preserves_predicate_without_changing_transcribe_signature(self):
        allowed = [True]
        def fail(*_args, **_kwargs):
            allowed[0] = False
            raise RuntimeError('gpu inference failed')
        self.models['cuda'].transcribe.side_effect = fail
        with self.assertRaises(self.h._InferenceCancelled):
            self.h.full_result(self.audio, is_current=lambda: allowed[0])
        self.assertEqual(self.devices(), ['cuda'])
        self.assertIsNone(getattr(self.h._inference_context, 'predicate', None))

    def test_always_listener_revocation_prevents_fallback_and_output(self):
        listener = self.h.AlwaysListener()
        def fail(*_args, **_kwargs):
            self.h.CFG['voiceSessionId'] = None
            raise RuntimeError('gpu inference failed')
        self.models['cuda'].transcribe.side_effect = fail
        listener._handle_segment(self.audio, listener._settings())
        self.assertEqual(self.devices(), ['cuda'])
        self.assertFalse(any(e['event'] == 'transcript' for e in self.events))
        self.assertIsNone(getattr(self.h._inference_context, 'predicate', None))

    def test_config_change_invalidates_path_request_and_precision_cache(self):
        self.h.transcribe_audio(self.audio)
        self.h.CFG['models']['whisper'] = '/second/prepared-whisper'
        self.ct.get_supported_compute_types.return_value = {'float16'}
        self.h.transcribe_audio(self.audio)
        self.h.CFG['modelCompute'] = 'cpu'
        self.h.transcribe_audio(self.audio)
        self.h.CFG['modelCompute'] = 'auto'
        self.h.transcribe_audio(self.audio)
        self.assertEqual(self.devices(), ['cuda', 'cuda', 'cpu', 'cuda'])
        self.assertEqual(self.construct.call_args_list[1].kwargs['compute_type'], 'float16')
        self.assertEqual(self.construct.call_args_list[1].args, ('/second/prepared-whisper',))
        self.assertEqual(self.ct.get_cuda_device_count.call_count, 3)

    def test_changed_model_retries_gpu_after_sticky_failure(self):
        self.models['cuda'].transcribe.side_effect = RuntimeError('first model failed')
        self.h.transcribe_audio(self.audio)
        self.h.transcribe_audio(self.audio)
        self.assertEqual(self.devices(), ['cuda', 'cpu'])
        self.h.CFG['models']['whisper'] = '/replacement/model'
        self.models['cuda'].transcribe.side_effect = lambda *_a, **_kw: self.transcript('new GPU model')
        self.ct.get_supported_compute_types.return_value = {'int8_float32'}
        self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'new GPU model')
        self.assertEqual(self.devices(), ['cuda', 'cpu', 'cuda'])
        self.status(actual='cuda', computeType='int8_float32', fallbackReason=None, validated=True)

    def test_observed_settings_toggle_resets_sticky_failure_without_intermediate_inference(self):
        self.models['cuda'].transcribe.side_effect = RuntimeError('first GPU attempt failed')
        self.h.transcribe_audio(self.audio)
        for requested in ['cpu', 'auto']:
            config = copy.deepcopy(self.h.CFG)
            config['modelCompute'] = requested
            with patch.object(self.h, 'load_config', return_value=config):
                self.reload_cfg()
        self.models['cuda'].transcribe.side_effect = lambda *_a, **_kw: self.transcript('recovered')
        self.status(actual=None, validated=False)
        self.assertEqual(self.h.transcribe_audio(self.audio)['text'], 'recovered')
        self.assertEqual(self.devices(), ['cuda', 'cpu', 'cuda'])

    def test_invalid_compute_never_silently_selects_device(self):
        for requested in ['vulkan', '', False]:
            self.h.CFG['modelCompute'] = requested
            with self.assertRaises(ValueError):
                self.h.get_whisper()
        self.construct.assert_not_called()
        self.ct.get_cuda_device_count.assert_not_called()

    def test_status_is_unvalidated_before_inference_and_resets_on_change(self):
        self.status(actual=None, validated=False)
        self.h.get_whisper()
        self.status(actual='cuda', validated=False)
        self.h.transcribe_audio(self.audio)
        self.status(actual='cuda', validated=True)
        self.h.CFG['models']['whisper'] = '/different/model'
        self.status(actual=None, validated=False)

    def test_sensevoice_auto_cpu_and_explicit_cuda_remain_fail_closed_even_cached(self):
        self.h.CFG.update(asr='sensevoice', modelCompute='auto')
        result = types.SimpleNamespace(text='本地识别', lang='zh', emotion=None, event=None)
        stream = types.SimpleNamespace(accept_waveform=Mock(), result=result)
        recognizer = types.SimpleNamespace(create_stream=lambda: stream, decode_stream=Mock())
        construct = Mock(return_value=recognizer)
        sherpa = types.SimpleNamespace(OfflineRecognizer=types.SimpleNamespace(from_sense_voice=construct))
        with patch.dict(sys.modules, {'sherpa_onnx': sherpa}):
            self.assertEqual(self.h.transcribe_audio(self.audio)['text'], '本地识别')
            self.status(requested='auto', actual='cpu', engine='sensevoice', fallbackReason='model-gpu-unverified', validated=True)
            self.h.CFG['modelCompute'] = 'cuda'
            with self.assertRaises(RuntimeError):
                self.h.get_recognizer()
            self.status(requested='cuda', actual=None, fallbackReason='model-gpu-unverified', validated=False)
        construct.assert_called_once()
        self.ct.get_cuda_device_count.assert_not_called()

    def test_whisper_lock_keeps_cache_during_inflight_generator(self):
        entered, release = threading.Event(), threading.Event()
        failures = []
        def segments():
            entered.set()
            if not release.wait(3):
                raise AssertionError('test did not release GPU')
            yield types.SimpleNamespace(text='cuda')
        self.models['cuda'].transcribe.side_effect = lambda *_a, **_kw: (segments(), types.SimpleNamespace(language='zh'))
        def run():
            try:
                self.h.transcribe_audio(self.audio)
            except Exception as error:
                failures.append(error)
        first = threading.Thread(target=run)
        second = threading.Thread(target=run)
        first.start()
        try:
            self.assertTrue(entered.wait(1))
            self.h.CFG['modelCompute'] = 'cpu'
            second.start()
            time.sleep(.03)
            self.assertEqual(self.devices(), ['cuda'])
            self.assertIs(self.h._models['whisper'], self.models['cuda'])
        finally:
            release.set()
            first.join(2)
            if second.ident is not None:
                second.join(2)
        self.assertFalse(first.is_alive())
        self.assertFalse(second.is_alive())
        self.assertFalse(failures)
        self.assertEqual(self.devices(), ['cuda', 'cpu'])


if __name__ == '__main__':
    unittest.main()
