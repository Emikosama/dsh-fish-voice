"""WinMM ownership/identity/concurrency tests. Every native call is fake.

These verify Python behavior, pointer layout assumptions and cleanup decisions,
not Windows API execution, real microphone audio or hardware hot-plug behavior.
"""
import ctypes
import importlib.util
import pathlib
import struct
import sys
import threading
import time
import types
import unittest
from unittest.mock import patch

ROOT = pathlib.Path(__file__).resolve().parents[1]


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


audio = load("native_input_device_types", ROOT / "helper/audio_devices.py")
stream_module = load("native_input_under_test", ROOT / "helper/audio_input_windows.py")


class FakeWinMM:
    def __init__(self):
        self.calls = []
        self.counts = {}
        self.fail = {}
        self.hooks = {}
        self.headers = []
        self.queued = []
        self.default_index = 0
        self.actual_index = 0
        self.open_override = None
        self.endpoints = {0: "endpoint-a", 1: "endpoint-b"}
        self.running = False
        self.lock = threading.Lock()

    def call(self, name, *details):
        self.calls.append((name, *details))
        self.counts[name] = self.counts.get(name, 0) + 1
        hook = self.hooks.get(name)
        if hook:
            hook(self.counts[name])
        failure = self.fail.get((name, self.counts[name]), self.fail.get(name, 0))
        if isinstance(failure, Exception):
            raise failure
        return failure

    def waveInOpen(self, handle, device, fmt, callback, instance, flags):
        result = self.call("open", device)
        if not result:
            handle._obj.value = 123
            self.actual_index = self.default_index if device == 0xFFFFFFFF else device
            if self.open_override is not None:
                self.actual_index = self.open_override
        return result

    def waveInGetID(self, handle, index):
        result = self.call("get_id")
        if not result:
            index._obj.value = self.actual_index
        return result

    def waveInPrepareHeader(self, handle, header, size):
        result = self.call("prepare", id(header._obj))
        if not result:
            self.headers.append(header._obj)
            header._obj.flags |= 2
        return result

    def waveInAddBuffer(self, handle, header, size):
        result = self.call("queue", id(header._obj))
        if not result:
            with self.lock:
                item = header._obj
                item.flags = (item.flags | 16) & ~1
                self.queued.append(item)
        return result

    def waveInStart(self, handle):
        result = self.call("start")
        if not result:
            self.running = True
        return result

    def waveInStop(self, handle):
        result = self.call("stop")
        if not result:
            self.running = False
        return result

    def waveInReset(self, handle):
        result = self.call("reset")
        if not result:
            self.running = False
            with self.lock:
                for header in self.queued:
                    header.flags = (header.flags | 1) & ~16
                self.queued.clear()
        return result

    def waveInUnprepareHeader(self, handle, header, size):
        result = self.call("unprepare", id(header._obj))
        if not result:
            header._obj.flags &= ~2
        return result

    def waveInClose(self, handle):
        return self.call("close")

    def complete(self, samples, recorded=None):
        with self.lock:
            if not self.queued:
                raise AssertionError("No queued fake input buffer")
            header = self.queued.pop(0)
            pcm = struct.pack("<" + "h" * len(samples), *samples)
            if len(pcm) > header.length:
                raise AssertionError("Fixture exceeds allocated buffer")
            ctypes.memmove(header.data, pcm, len(pcm))
            header.recorded = len(pcm) if recorded is None else recorded
            header.flags = (header.flags | 1) & ~16


class NativeInputTests(unittest.TestCase):
    def setUp(self):
        self.native = FakeWinMM()
        self.streams = []
        stream_module._active_input = None
        stream_module._unreleased_inputs = []
        self.devices = types.SimpleNamespace(
            selection=audio.selection, _WaveHeader=audio._WaveHeader,
            _WaveFormat=audio._WaveFormat, resolve_native_input=self.resolve,
            _endpoint=lambda native, direction, index: native.endpoints[index])

    def tearDown(self):
        for stream in self.streams:
            try:
                stream.close()
            except Exception:
                pass
        for stream in stream_module._unreleased_inputs:
            if stream._thread is not None:
                stream._thread.join(timeout=0.2)
        stream_module._active_input = None
        stream_module._unreleased_inputs = []

    def selected(self, value="endpoint-a"):
        return {"backend": "winmm", "id": value, "name": "Duplicate name"}

    def resolve(self, selected, native):
        if selected is None:
            return 0xFFFFFFFF
        matches = [index for index, identity in native.endpoints.items() if identity == selected["id"]]
        if len(matches) != 1:
            raise RuntimeError("INPUT_DEVICE_UNAVAILABLE")
        return matches[0]

    def make(self, callback=None, **kwargs):
        options = dict(samplerate=16000, blocksize=320, device=self.selected(),
                       channels=1, dtype="float32", callback=callback or (lambda *args: None),
                       native=self.native, devices=self.devices)
        options.update(kwargs)
        stream = stream_module.RawInputStream(**options)
        self.streams.append(stream)
        return stream

    def await_condition(self, condition):
        deadline = time.monotonic() + 1
        while not condition() and time.monotonic() < deadline:
            time.sleep(0.003)
        self.assertTrue(condition(), "Polling worker did not reach expected state")

    def names(self):
        return [call[0] for call in self.native.calls]

    def test_constructor_prepares_but_does_not_capture_or_queue(self):
        stream = self.make()
        self.assertFalse(stream.active)
        self.assertIsNone(stream.error)
        self.assertEqual(self.names().count("prepare"), 4)
        self.assertNotIn("start", self.names())
        self.assertNotIn("queue", self.names())
        self.assertEqual(ctypes.sizeof(audio._WaveFormat), 18)
        self.assertEqual(ctypes.sizeof(audio._WaveHeader), 48 if ctypes.sizeof(ctypes.c_void_p) == 8 else 32)

    def test_default_mapper_is_opened_fresh_each_stream(self):
        first = self.make(device=None)
        self.assertEqual(self.native.actual_index, 0)
        first.close()
        self.native.default_index = 1
        second = self.make(device=None)
        self.assertEqual(self.native.actual_index, 1)
        self.assertEqual([row[1] for row in self.native.calls if row[0] == "open"], [0xFFFFFFFF, 0xFFFFFFFF])
        second.close()

    def test_missing_endpoint_never_opens_default_or_any_device(self):
        with self.assertRaisesRegex(RuntimeError, "INPUT_DEVICE_UNAVAILABLE"):
            self.make(device=self.selected("missing"))
        self.assertNotIn("open", self.names())
        self.assertIsNone(stream_module._active_input)

    def test_opened_wrong_endpoint_is_closed_before_prepare_start(self):
        self.native.open_override = 1
        with self.assertRaisesRegex(RuntimeError, "INPUT_DEVICE_UNAVAILABLE"):
            self.make()
        self.assertEqual(self.names().count("open"), 1)
        self.assertIn("close", self.names())
        self.assertNotIn("prepare", self.names())
        self.assertNotIn("start", self.names())

    def test_endpoint_change_between_constructor_and_start_never_captures(self):
        stream = self.make()
        self.native.endpoints[0] = "replacement"
        with self.assertRaisesRegex(RuntimeError, "INPUT_DEVICE_UNAVAILABLE"):
            stream.start()
        self.assertNotIn("start", self.names())
        self.assertNotIn("queue", self.names())
        self.assertTrue(stream.closed)

    def test_selection_is_snapshotted_and_duplicate_names_are_irrelevant(self):
        selected = self.selected()
        stream = self.make(device=selected)
        selected["id"] = "endpoint-b"
        stream.start()
        self.assertTrue(stream.active)
        self.assertEqual(self.native.calls[0], ("open", 0))

    def test_native_pcm16_delivers_float32_and_original_frame_size(self):
        packets = []
        stream = self.make(callback=lambda *args: packets.append(args), blocksize=480)
        stream.start()
        self.native.complete([-32768, -16384, 0, 16384, 32767] + [0] * 475)
        self.await_condition(lambda: len(packets) == 1)
        data, frames, timestamp, status = packets[0]
        self.assertEqual(frames, 480)
        self.assertIsNone(timestamp)
        self.assertFalse(status)
        self.assertEqual(len(data), 480 * 4)
        self.assertEqual(struct.unpack("<5f", data[:20]), (-1, -0.5, 0, 0.5, 32767 / 32768))
        self.assertEqual(self.names().count("queue"), 5)

    def test_partial_return_uses_actual_frames_not_buffer_capacity(self):
        packets = []
        stream = self.make(callback=lambda *args: packets.append(args))
        stream.start()
        self.native.complete([123, -456])
        self.await_condition(lambda: len(packets) == 1)
        self.assertEqual(packets[0][1], 2)
        self.assertEqual(len(packets[0][0]), 8)

    def test_stop_reset_join_precedes_unprepare_close_and_is_idempotent(self):
        packets = []
        stream = self.make(callback=lambda *args: packets.append(args))
        stream.start()
        stream.stop()
        self.assertFalse(stream.active)
        self.assertFalse(stream._thread.is_alive())
        self.assertNotIn("unprepare", self.names())
        stream.close()
        stream.close()
        stream.stop()
        names = self.names()
        self.assertLess(names.index("stop"), names.index("reset"))
        self.assertLess(names.index("reset"), names.index("unprepare"))
        self.assertLess(names.index("unprepare"), names.index("close"))
        self.assertEqual(names.count("close"), 1)
        self.assertEqual(stream._buffers, [])
        self.assertEqual(packets, [])
        with self.assertRaisesRegex(RuntimeError, "INPUT_STREAM_STOPPED"):
            stream.start()

    def test_constructor_prepare_failure_releases_partial_preparations(self):
        self.native.fail[("prepare", 3)] = 7
        with self.assertRaisesRegex(RuntimeError, "INPUT_PREPARE_FAILED"):
            self.make()
        self.assertEqual(self.names().count("unprepare"), 2)
        self.assertEqual(self.names().count("close"), 1)
        self.assertIsNone(stream_module._active_input)

    def test_constructor_open_failure_has_no_dangling_owner(self):
        self.native.fail["open"] = 2
        with self.assertRaisesRegex(RuntimeError, "INPUT_DEVICE_UNAVAILABLE"):
            self.make()
        self.assertNotIn("close", self.names())
        self.assertIsNone(stream_module._active_input)

    def test_start_queue_failure_resets_prepared_buffers_and_never_starts(self):
        stream = self.make()
        self.native.fail[("queue", 3)] = 7
        with self.assertRaisesRegex(RuntimeError, "INPUT_QUEUE_FAILED"):
            stream.start()
        self.assertNotIn("start", self.names())
        self.assertIn("reset", self.names())
        self.assertTrue(stream.closed)

    def test_start_driver_failure_closes_without_retry(self):
        stream = self.make()
        self.native.fail["start"] = 7
        with self.assertRaisesRegex(RuntimeError, "INPUT_START_FAILED"):
            stream.start()
        self.assertEqual(self.names().count("open"), 1)
        self.assertEqual(self.names().count("start"), 1)
        self.assertTrue(stream.closed)

    def test_requeue_error_sets_error_and_stops_hardware(self):
        stream = self.make()
        self.native.fail[("queue", 5)] = 7
        stream.start()
        self.native.complete([1] * 320)
        self.await_condition(lambda: stream.error is not None)
        self.await_condition(lambda: not stream._thread.is_alive())
        self.assertEqual(str(stream.error), "INPUT_QUEUE_FAILED")
        self.assertFalse(self.native.running)
        self.assertIn("reset", self.names())
        stream.close()
        self.assertEqual(self.names().count("start"), 1)

    def test_unplug_during_capture_stops_without_fallback(self):
        stream = self.make()
        stream.start()
        self.native.endpoints[0] = "different"
        self.await_condition(lambda: stream.error is not None)
        self.await_condition(lambda: not stream._thread.is_alive())
        self.assertEqual(str(stream.error), "INPUT_DEVICE_UNAVAILABLE")
        self.assertEqual(self.names().count("open"), 1)
        self.assertFalse(self.native.running)

    def test_callback_exception_is_redacted_and_capture_stops(self):
        def callback(*args):
            raise ValueError("private transcript and path")
        stream = self.make(callback=callback)
        stream.start()
        self.native.complete([1] * 320)
        self.await_condition(lambda: stream.error is not None)
        self.assertEqual(str(stream.error), "INPUT_CALLBACK_FAILED")
        stream.close()

    def test_invalid_native_byte_count_never_reads_beyond_owned_buffer(self):
        for count in (3, 642):
            stream = self.make()
            stream.start()
            self.native.complete([], recorded=count)
            self.await_condition(lambda: stream.error is not None)
            self.assertEqual(str(stream.error), "INPUT_DATA_INVALID")
            stream.close()

    def test_cancel_while_callback_runs_never_requeues_after_reset(self):
        entered, release = threading.Event(), threading.Event()
        def callback(*args):
            entered.set()
            release.wait(1)
        stream = self.make(callback=callback)
        stream.start()
        self.native.complete([1] * 320)
        self.assertTrue(entered.wait(1))
        stop_errors = []
        def stop():
            try:
                stream.stop()
            except Exception as exc:
                stop_errors.append(exc)
        stopper = threading.Thread(target=stop)
        stopper.start()
        self.await_condition(lambda: "reset" in self.names())
        self.assertTrue(stopper.is_alive())  # Must wait for callback completion.
        release.set()
        stopper.join(1)
        self.assertFalse(stopper.is_alive())
        self.assertEqual(stop_errors, [])
        after_reset = self.names()[self.names().index("reset") + 1:]
        self.assertNotIn("queue", after_reset)
        stream.close()

    def test_cancel_racing_native_queue_has_no_after_reset_queue(self):
        entered, release = threading.Event(), threading.Event()
        def queue_hook(count):
            if count == 5:
                entered.set()
                release.wait(1)
        self.native.hooks["queue"] = queue_hook
        stream = self.make()
        stream.start()
        self.native.complete([1] * 320)
        self.assertTrue(entered.wait(1))
        stopper = threading.Thread(target=stream.stop)
        stopper.start()
        self.assertTrue(stream._stop_event.wait(1))
        release.set()
        stopper.join(1)
        self.assertFalse(stopper.is_alive())
        self.assertNotIn("queue", self.names()[self.names().index("reset") + 1:])

    def test_cleanup_failure_retains_all_buffers_and_poison_blocks_open(self):
        for operation in ("reset", "unprepare", "close"):
            with self.subTest(operation=operation):
                stream_module._active_input = None
                stream_module._unreleased_inputs = []
                self.native = FakeWinMM()
                stream = self.make()
                original = list(stream._buffers)
                self.native.fail[operation] = 7
                with self.assertRaisesRegex(RuntimeError, "INPUT_CLOSE_UNCONFIRMED"):
                    stream.close()
                self.assertEqual(stream._buffers, original)
                self.assertIn(stream, stream_module._unreleased_inputs)
                with self.assertRaisesRegex(RuntimeError, "INPUT_CLOSE_UNCONFIRMED"):
                    self.make()
                self.assertEqual(self.names().count("open"), 1)

    def test_callback_join_timeout_retains_buffers_without_unprepare(self):
        entered, release = threading.Event(), threading.Event()
        stream = self.make(callback=lambda *args: (entered.set(), release.wait(1)))
        stream.start()
        self.native.complete([0] * 320)
        self.assertTrue(entered.wait(1))
        try:
            with patch.object(stream_module, "_JOIN_TIMEOUT", 0.02):
                with self.assertRaisesRegex(RuntimeError, "INPUT_CLOSE_UNCONFIRMED"):
                    stream.close()
            self.assertNotIn("unprepare", self.names())
            self.assertNotIn("close", self.names())
            self.assertEqual(len(stream._buffers), 4)
        finally:
            release.set()
            stream._thread.join(1)

    def test_invalid_format_and_device_reject_before_open(self):
        for kwargs in ({"samplerate": 44100}, {"channels": 2}, {"dtype": "int16"},
                       {"blocksize": 0}, {"blocksize": 100000}, {"device": 1},
                       {"device": self.selected("bad\0id")}):
            with self.subTest(kwargs=kwargs):
                with self.assertRaises(RuntimeError):
                    self.make(**kwargs)
        self.assertNotIn("open", self.names())

    def test_missing_native_progress_reports_error_and_resets(self):
        stream = self.make()
        with patch.object(stream_module, "_READ_TIMEOUT", 0.025):
            stream.start()
            self.await_condition(lambda: stream.error is not None)
            self.await_condition(lambda: not stream._thread.is_alive())
        self.assertEqual(str(stream.error), "INPUT_READ_TIMEOUT")
        self.assertIn("reset", self.names())
        self.assertFalse(self.native.running)

    def test_constructor_cleanup_failure_retains_partial_buffers(self):
        self.native.fail[("prepare", 2)] = 7
        self.native.fail["close"] = 7
        with self.assertRaisesRegex(RuntimeError, "INPUT_CLOSE_UNCONFIRMED"):
            self.make()
        self.assertEqual(len(stream_module._unreleased_inputs), 1)
        retained = stream_module._unreleased_inputs[0]
        self.assertEqual(len(retained._buffers), 2)
        self.assertIs(stream_module._active_input, retained)
        with self.assertRaisesRegex(RuntimeError, "INPUT_CLOSE_UNCONFIRMED"):
            self.make()
        self.assertEqual(self.names().count("open"), 1)

    def test_opaque_driver_exception_does_not_leak_details(self):
        self.native.fail["prepare"] = ValueError("private endpoint name and path")
        with self.assertRaisesRegex(RuntimeError, "^INPUT_DEVICE_UNAVAILABLE$"):
            self.make()
        self.assertIn("close", self.names())

    @unittest.skipUnless(sys.platform == "win32", "Windows ABI/export binding only")
    def test_real_windows_abi_and_export_binding_without_opening_microphone(self):
        # Only loads the OS DLL and resolves exports. No waveInOpen/Start,
        # enumeration, device access, recording or microphone permission request.
        self.assertEqual(ctypes.sizeof(ctypes.c_wchar), 2)
        self.assertEqual(ctypes.sizeof(audio._WaveFormat), 18)
        for field, expected in (("tag", 0), ("channels", 2), ("rate", 4),
                                ("bytesPerSecond", 8), ("blockAlign", 12),
                                ("bits", 14), ("extra", 16)):
            self.assertEqual(getattr(audio._WaveFormat, field).offset, expected)
        width = ctypes.sizeof(ctypes.c_void_p)
        expected = ((0, 8, 12, 16, 24, 28, 32, 40) if width == 8
                    else (0, 4, 8, 12, 16, 20, 24, 28))
        fields = ("data", "length", "recorded", "user", "flags", "loops", "next", "reserved")
        self.assertEqual(ctypes.sizeof(audio._WaveHeader), 48 if width == 8 else 32)
        for field, offset in zip(fields, expected):
            self.assertEqual(getattr(audio._WaveHeader, field).offset, offset)
        dll = audio._winmm()
        probe = stream_module.RawInputStream.__new__(stream_module.RawInputStream)
        probe._dll, probe._devices = dll, audio
        probe._configure_native()
        for name in ("waveInOpen", "waveInGetID", "waveInPrepareHeader", "waveInAddBuffer",
                     "waveInUnprepareHeader", "waveInStart", "waveInStop", "waveInReset", "waveInClose"):
            function = getattr(dll, name)
            self.assertIsInstance(function, ctypes._CFuncPtr)
            self.assertIs(function.restype, ctypes.c_uint)
            self.assertTrue(function.argtypes)
        self.assertIs(dll.waveInOpen.argtypes[0], ctypes.POINTER(ctypes.c_void_p))
        self.assertIs(dll.waveInOpen.argtypes[1], ctypes.c_uint)
        self.assertIs(dll.waveInOpen.argtypes[3], ctypes.c_size_t)

    def test_second_owner_is_rejected_until_confirmed_close(self):
        first = self.make()
        with self.assertRaisesRegex(RuntimeError, "INPUT_DEVICE_BUSY"):
            self.make()
        first.close()
        second = self.make()
        second.close()
        self.assertEqual(self.names().count("open"), 2)


if __name__ == "__main__":
    unittest.main()
