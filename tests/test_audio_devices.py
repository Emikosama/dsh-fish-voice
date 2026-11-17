"""Identity/default/hot-plug routing tests without opening any real audio device."""
import importlib.util
import pathlib
import sys
import types
import unittest
from unittest.mock import patch

PATH = pathlib.Path(__file__).resolve().parents[1] / "helper" / "audio_devices.py"
spec = importlib.util.spec_from_file_location("audio_devices_under_test", PATH)
audio = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audio)


class AudioDevicesTests(unittest.TestCase):
    def device(self, identity="endpoint-a", name="USB Mic", backend="winmm"):
        return {"id": identity, "name": name, "backend": backend}

    def sd(self, names):
        return types.SimpleNamespace(query_devices=lambda: [
            {"name": name, "max_input_channels": 1, "hostapi": 0} for name in names],
            query_hostapis=lambda _: {"name": "MME"})

    def test_legacy_input_configuration_is_preserved(self):
        for value in (0, 7, "USB mic", "0"):
            self.assertEqual(audio.resolve_input(value, None), value)

    def test_windows_selected_endpoint_resolves_after_device_reorder(self):
        devices = [{**self.device(), "nativeIndex": 0}]
        with patch.object(sys, "platform", "win32"), patch.object(audio, "winmm_devices", return_value=devices):
            self.assertEqual(audio.resolve_native_input(self.device()), 0)
            devices[0]["nativeIndex"] = 9
            self.assertEqual(audio.resolve_native_input(self.device()), 9)

    def test_disconnect_never_falls_back_and_reconnect_keeps_identity(self):
        selected = self.device()
        with patch.object(sys, "platform", "win32"), patch.object(audio, "winmm_devices", return_value=[]):
            with self.assertRaisesRegex(RuntimeError, "INPUT_DEVICE_UNAVAILABLE"):
                audio.resolve_native_input(selected)
            with self.assertRaisesRegex(RuntimeError, "OUTPUT_DEVICE_UNAVAILABLE"):
                audio.resolve_output(selected, object())
        with patch.object(audio, "winmm_devices", return_value=[{**selected, "nativeIndex": 9}]):
            self.assertEqual(audio.resolve_output(selected, object()), 9)
        self.assertEqual(selected, self.device())

    def test_native_duplicate_identity_is_not_offered_or_resolved(self):
        devices = [{**self.device(), "nativeIndex": 0}, {**self.device(), "nativeIndex": 1}]
        with patch.object(sys, "platform", "win32"), patch.object(audio, "winmm_devices", return_value=devices):
            with self.assertRaisesRegex(RuntimeError, "UNAVAILABLE"):
                audio.resolve_native_input(self.device())
            self.assertEqual(audio.inventory()["input"]["items"], [])

    def test_system_default_is_resolved_again_for_every_new_input(self):
        preferred = [0]
        def message(handle, code, destination, flags):
            self.assertEqual(code, 0x2015)
            destination._obj.value = preferred[0]
            return 0
        native = types.SimpleNamespace(waveInMessage=message)
        devices = [{**self.device("a", "A"), "nativeIndex": 0}, {**self.device("b", "B"), "nativeIndex": 1}]
        with patch.object(sys, "platform", "win32"), patch.object(audio, "winmm_devices", return_value=devices), \
                patch.object(audio, "_winmm", return_value=native), patch.object(audio, "_endpoint", side_effect=lambda dll, side, index: ["a", "b"][index]):
            self.assertEqual(audio.native_input_info(None)["name"], "A")
            preferred[0] = 1
            self.assertEqual(audio.native_input_info(None)["name"], "B")
        self.assertEqual(audio.resolve_output(None), 0xffffffff)
        self.assertEqual(audio.resolve_native_input(None), 0xffffffff)

    def test_nonwindows_identity_is_independent_of_enumeration_position(self):
        with patch.object(sys, "platform", "linux"):
            listing = audio.inventory(self.sd(["A", "B"]))
            chosen = listing["input"]["items"][0]
            self.assertEqual(audio.resolve_input(chosen, self.sd(["B", "A"])), 1)
            self.assertEqual(listing["output"]["reason"], "AUDIO_PLATFORM_UNSUPPORTED")
            with self.assertRaisesRegex(RuntimeError, "UNAVAILABLE"):
                audio.resolve_input(chosen, self.sd(["B"]))

    def test_enumeration_does_not_construct_streams_or_leak_exceptions(self):
        def failed():
            raise ValueError("private-local-path")
        with patch.object(sys, "platform", "linux"):
            listing = audio.inventory(types.SimpleNamespace(query_devices=failed))
        self.assertEqual(listing["input"]["status"], "unavailable")
        self.assertNotIn("private-local-path", str(listing))

    def test_endpoint_query_constants_and_bounded_length(self):
        seen = []
        def message(handle, code, destination, length):
            seen.append(code)
            if code == 0x812:
                destination._obj.value = 20
            else:
                destination.value = "endpoint"
            return 0
        self.assertEqual(audio._endpoint(types.SimpleNamespace(waveOutMessage=message), "Out", 0), "endpoint")
        self.assertEqual(seen, [0x812, 0x811])


    def test_native_names_may_repeat_but_endpoint_identity_controls_selection(self):
        devices = [{**self.device("a"), "nativeIndex": 0}, {**self.device("b"), "nativeIndex": 1}]
        with patch.object(sys, "platform", "win32"), patch.object(audio, "winmm_devices", return_value=devices):
            self.assertEqual(len(audio.inventory()["input"]["items"]), 2)
            self.assertEqual(audio.resolve_native_input(self.device("b")), 1)
            with self.assertRaisesRegex(RuntimeError, "NATIVE_CAPTURE_REQUIRED"):
                audio.resolve_input(self.device("b"), self.sd(["USB Mic"]))

    def native(self, *, changed=False, cleanup_fails=False):
        calls = []
        def call(name, *args):
            calls.append(name)
            if name == "waveOutOpen": args[0]._obj.value = 123
            if name == "waveOutGetID": args[1]._obj.value = 9
            if name == "waveOutWrite": args[1]._obj.flags |= 1
            if name == "waveOutUnprepareHeader" and cleanup_fails: return 7
            return 0
        native = types.SimpleNamespace()
        for name in ["waveOutOpen", "waveOutGetID", "waveOutPrepareHeader", "waveOutWrite", "waveOutReset", "waveOutUnprepareHeader", "waveOutClose"]:
            setattr(native, name, lambda *args, name=name: call(name, *args))
        return native, calls

    def test_cue_checks_opened_identity_before_write_and_does_not_retry_default(self):
        import threading
        native, calls = self.native()
        with patch.object(audio, "_winmm", return_value=native), patch.object(audio, "resolve_output", return_value=9), patch.object(audio, "_endpoint", return_value="different"):
            with self.assertRaisesRegex(RuntimeError, "OUTPUT_DEVICE_UNAVAILABLE"):
                audio.play_cue(bytes(100), 24000, self.device(), threading.Event())
        self.assertEqual(calls.count("waveOutOpen"), 1)
        self.assertNotIn("waveOutWrite", calls)
        self.assertIn("waveOutClose", calls)

    def test_cue_cleanup_failure_retains_native_buffers_and_blocks_further_cues(self):
        import threading
        native, calls = self.native(cleanup_fails=True)
        with patch.object(audio, "_unreleased_audio", []), patch.object(audio, "_winmm", return_value=native), patch.object(audio, "resolve_output", return_value=9), patch.object(audio, "_endpoint", return_value="endpoint-a"):
            for _ in range(2):
                with self.assertRaisesRegex(RuntimeError, "AUDIO_CLEANUP_FAILED"):
                    audio.play_cue(bytes(100), 24000, self.device(), threading.Event())
            self.assertEqual(len(audio._unreleased_audio), 1)
            self.assertEqual(calls.count("waveOutOpen"), 1)
            self.assertIn("waveOutReset", calls)


    def test_helper_factory_forwards_stable_native_choice_without_portaudio_enumeration(self):
        import os
        import tempfile
        from unittest.mock import Mock
        path = PATH.parent / "voice_helper.py"
        spec = importlib.util.spec_from_file_location("audio_route_helper_test", path)
        helper = importlib.util.module_from_spec(spec)
        with tempfile.TemporaryDirectory() as home, patch.dict(os.environ, {"DSH_HOME": home}):
            spec.loader.exec_module(helper)
        native = Mock(return_value=types.SimpleNamespace(error=None))
        legacy = Mock(return_value=object())
        callback = lambda *args: None
        with patch.object(sys, "platform", "win32"), patch.object(helper, "_native_input_module", types.SimpleNamespace(RawInputStream=native), create=True), patch.dict(sys.modules, {"sounddevice": types.SimpleNamespace(RawInputStream=legacy)}):
            for selected in (None, self.device()):
                helper._make_input_stream(selected, callback)
                self.assertEqual(native.call_args.kwargs["device"], selected)
                self.assertEqual(native.call_args.kwargs["blocksize"], helper.FRAME)
                self.assertIs(native.call_args.kwargs["callback"], callback)
            legacy.assert_not_called()
            native.side_effect = RuntimeError("INPUT_CLOSE_UNCONFIRMED")
            with self.assertRaises(helper._CaptureCloseUnconfirmed):
                helper._make_input_stream(None, callback)
            helper._make_input_stream(7, callback)
            self.assertEqual(legacy.call_args.kwargs["device"], 7)
        error = RuntimeError("INPUT_DEVICE_UNAVAILABLE")
        with self.assertRaisesRegex(RuntimeError, "INPUT_DEVICE_UNAVAILABLE"):
            helper._check_input_error(types.SimpleNamespace(error=error))
        self.assertTrue(error.audioDeviceFailure)


if __name__ == "__main__":
    unittest.main()
