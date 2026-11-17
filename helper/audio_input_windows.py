"""One-shot, exact-endpoint Windows microphone stream (no PortAudio cache).

The constructor opens/prepares but never starts capture. The owning capture lease
must call stop()/close(), and inspect error while running. Native calls can block
inside a broken driver; the parent's process/lease timeout remains the hard fence.
No callback, retry or failure path changes the selected endpoint or starts again.
Tests inject the complete WinMM boundary and never open a physical microphone.
"""
import array
import ctypes
import importlib.util
import pathlib
import sys
import threading
import time

# The host normally injects its already-loaded audio_devices module. The local
# fallback only reads our adjacent package source, never searches another DLL.
devices = None
_registry_lock = threading.RLock()
_active_input = None
_unreleased_inputs = []
_JOIN_TIMEOUT = 1.0
_READ_TIMEOUT = 2.0


def _device_module():
    global devices
    if devices is None:
        spec = importlib.util.spec_from_file_location(
            "whale_native_input_devices", pathlib.Path(__file__).with_name("audio_devices.py"))
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        devices = module
    return devices


class InputError(RuntimeError):
    """Bounded error code, without local paths, device names or driver messages."""


class InputStatus:
    def __init__(self, input_overflow=False):
        self.input_overflow = bool(input_overflow)

    def __bool__(self):
        return self.input_overflow

    def __str__(self):
        return "Input overflow" if self.input_overflow else ""


def _float32(pcm):
    values = array.array("h")
    values.frombytes(pcm)
    if sys.byteorder != "little":
        values.byteswap()
    result = array.array("f", (value / 32768.0 for value in values))
    if sys.byteorder != "little":
        result.byteswap()
    return result.tobytes()


class RawInputStream:
    """The small RawInputStream surface required by the recorder and wake loop.

    Four PCM16 buffers are owned until reset, thread exit, unprepare and close
    have all been confirmed. A failed cleanup permanently poisons this module's
    subsequent opens, retaining both headers and data until helper-process exit.
    Control methods belong to the owning lease, not the audio callback.
    """
    def __init__(self, *, samplerate=16000, blocksize=480, device=None,
                 channels=1, dtype="float32", callback, native=None, devices=None):
        global _active_input
        if (samplerate != 16000 or isinstance(samplerate, bool) or channels != 1
                or isinstance(channels, bool) or dtype != "float32"
                or not isinstance(blocksize, int) or isinstance(blocksize, bool)
                or not 80 <= blocksize <= 4096 or not callable(callback)):
            raise InputError("INPUT_FORMAT_UNSUPPORTED")
        self._devices = devices if devices is not None else _device_module()
        try:
            selected = self._devices.selection(device)
            if selected is not None and selected["backend"] != "winmm":
                raise ValueError()
            self._selected = dict(selected) if selected is not None else None
        except Exception:
            raise InputError("INPUT_DEVICE_INVALID") from None
        self.samplerate, self.blocksize = 16000, blocksize
        self.channels, self.dtype = 1, "float32"
        self.error = None
        self._callback = callback
        try:
            self._dll = native if native is not None else self._devices._winmm()
        except Exception:
            raise InputError("INPUT_API_UNAVAILABLE") from None
        self._handle = ctypes.c_void_p()
        self._buffers = []
        self._prepared = []
        self._thread = None
        self._stop_event = threading.Event()
        self._control = threading.RLock()
        self._io = threading.Lock()
        self._started = False
        self._closed = False
        self._quiesce_attempted = False
        self._quiesced = False
        self._cleanup_failed = False
        self._retained = False
        try:
            self._configure_native()
        except Exception:
            raise InputError("INPUT_API_UNAVAILABLE") from None
        with _registry_lock:
            if _unreleased_inputs:
                raise InputError("INPUT_CLOSE_UNCONFIRMED")
            if _active_input is not None:
                raise InputError("INPUT_DEVICE_BUSY")
            _active_input = self  # Keep every native pointer alive, even if owner drops it.
        try:
            index = self._devices.resolve_native_input(self._selected, self._dll)
            fmt = self._devices._WaveFormat(1, 1, 16000, 32000, 2, 16, 0)
            result = self._dll.waveInOpen(ctypes.byref(self._handle), index,
                                          ctypes.byref(fmt), 0, 0, 0)
            if result or not self._handle.value:
                raise InputError("INPUT_DEVICE_UNAVAILABLE")
            self._assert_endpoint()
            for _ in range(4):
                data = ctypes.create_string_buffer(blocksize * 2)
                header = self._devices._WaveHeader(
                    ctypes.cast(data, ctypes.c_void_p), blocksize * 2,
                    0, 0, 0, 0, None, 0)
                self._buffers.append((data, header))
                self._prepared.append(False)
                if self._dll.waveInPrepareHeader(self._handle, ctypes.byref(header), ctypes.sizeof(header)):
                    raise InputError("INPUT_PREPARE_FAILED")
                self._prepared[-1] = True
        except Exception as exc:
            code = str(exc) if isinstance(exc, InputError) else "INPUT_DEVICE_UNAVAILABLE"
            self._set_error(code)
            # Constructor failure still owns the handle and partially prepared
            # headers; it must use the same verified cleanup as a normal lease.
            self.close()
            raise self.error from None

    def _configure_native(self):
        header = ctypes.POINTER(self._devices._WaveHeader)
        signatures = {
            "waveInOpen": [ctypes.POINTER(ctypes.c_void_p), ctypes.c_uint,
                           ctypes.POINTER(self._devices._WaveFormat), ctypes.c_size_t,
                           ctypes.c_size_t, ctypes.c_uint],
            "waveInGetID": [ctypes.c_void_p, ctypes.POINTER(ctypes.c_uint)],
            "waveInPrepareHeader": [ctypes.c_void_p, header, ctypes.c_uint],
            "waveInAddBuffer": [ctypes.c_void_p, header, ctypes.c_uint],
            "waveInUnprepareHeader": [ctypes.c_void_p, header, ctypes.c_uint],
            "waveInStart": [ctypes.c_void_p],
            "waveInStop": [ctypes.c_void_p],
            "waveInReset": [ctypes.c_void_p],
            "waveInClose": [ctypes.c_void_p],
        }
        for name, args in signatures.items():
            function = getattr(self._dll, name)
            # Python bound-method fakes have no argtypes. Real ctypes functions
            # always receive pointer-width-correct signatures and MMRESULT types.
            if isinstance(function, ctypes._CFuncPtr):
                function.argtypes, function.restype = args, ctypes.c_uint

    @property
    def closed(self):
        return self._closed

    @property
    def active(self):
        return self._started and not self._stop_event.is_set() and not self._closed

    @property
    def stopped(self):
        return not self.active

    def _set_error(self, code):
        if self.error is None:
            self.error = InputError(code)

    def _poison(self):
        self._cleanup_failed = True
        self._set_error("INPUT_CLOSE_UNCONFIRMED")
        with _registry_lock:
            if not self._retained:
                _unreleased_inputs.append(self)
                self._retained = True

    def _assert_endpoint(self):
        # waveInGetID uses the real opened HWAVEIN, never a cached PA index.
        actual = ctypes.c_uint()
        try:
            if self._dll.waveInGetID(self._handle, ctypes.byref(actual)):
                raise ValueError()
            if self._selected is not None and self._devices._endpoint(
                    self._dll, "In", actual.value) != self._selected["id"]:
                raise ValueError()
        except Exception:
            raise InputError("INPUT_DEVICE_UNAVAILABLE") from None

    def start(self):
        with self._control:
            if self._closed or self._stop_event.is_set() or self.error is not None:
                raise self.error or InputError("INPUT_STREAM_STOPPED")
            if self._started:
                return self
            try:
                with self._io:
                    self._assert_endpoint()
                    for _, header in self._buffers:
                        if self._stop_event.is_set():
                            raise InputError("INPUT_STREAM_STOPPED")
                        if self._dll.waveInAddBuffer(self._handle, ctypes.byref(header), ctypes.sizeof(header)):
                            raise InputError("INPUT_QUEUE_FAILED")
                    # Check once more after queueing but before acquiring samples.
                    self._assert_endpoint()
                    if self._dll.waveInStart(self._handle):
                        raise InputError("INPUT_START_FAILED")
                    self._started = True
                self._thread = threading.Thread(target=self._poll, name="whale-winmm-input", daemon=True)
                self._thread.start()
                return self
            except Exception as exc:
                self._set_error(str(exc) if isinstance(exc, InputError) else "INPUT_START_FAILED")
                self.close()
                raise self.error from None

    def _poll(self):
        current, empty = 0, 0
        next_identity_check = 0.0
        last_data = time.monotonic()
        try:
            while not self._stop_event.is_set():
                pcm, status = None, None
                with self._io:
                    if self._stop_event.is_set():
                        break
                    now = time.monotonic()
                    if now - last_data > _READ_TIMEOUT:
                        raise InputError("INPUT_READ_TIMEOUT")
                    if now >= next_identity_check:
                        self._assert_endpoint()
                        next_identity_check = now + 0.1
                    data, header = self._buffers[current]
                    if header.flags & 1:  # WHDR_DONE, returned by the driver.
                        count = int(header.recorded)
                        if count > self.blocksize * 2 or count % 2:
                            raise InputError("INPUT_DATA_INVALID")
                        if count:
                            last_data = now
                            empty = 0
                            pcm = ctypes.string_at(ctypes.addressof(data), count)
                        else:
                            empty += 1
                            if empty >= 16:
                                raise InputError("INPUT_READ_FAILED")
                        # All buffers returned means the producer may have run
                        # out of space while the callback was busy.
                        status = InputStatus(all(item.flags & 1 for _, item in self._buffers))
                        header.recorded = 0
                        # Queue and reset share this lock. stop_event is set before
                        # reset takes the lock, so no after-reset requeue is possible.
                        if not self._stop_event.is_set():
                            if self._dll.waveInAddBuffer(self._handle, ctypes.byref(header), ctypes.sizeof(header)):
                                raise InputError("INPUT_QUEUE_FAILED")
                        current = (current + 1) % len(self._buffers)
                if pcm is not None and not self._stop_event.is_set():
                    try:
                        self._callback(_float32(pcm), len(pcm) // 2, None, status)
                    except Exception:
                        raise InputError("INPUT_CALLBACK_FAILED") from None
                elif self._stop_event.wait(0.005):
                    break
        except Exception as exc:
            self._set_error(str(exc) if isinstance(exc, InputError) else "INPUT_CAPTURE_FAILED")
            self._stop_event.set()
        finally:
            # Stop hardware on failure without waiting for the parent loop. Never
            # take _control here: the owner may hold it while joining this thread.
            with self._io:
                self._quiesce_locked()

    def _quiesce_locked(self):
        if self._quiesce_attempted or not self._handle.value:
            return
        self._quiesce_attempted = True
        try:
            if self._dll.waveInStop(self._handle):
                self._set_error("INPUT_STOP_FAILED")
        except Exception:
            self._set_error("INPUT_STOP_FAILED")
        try:
            self._quiesced = self._dll.waveInReset(self._handle) == 0
        except Exception:
            self._quiesced = False
        if not self._quiesced:
            self._poison()

    def stop(self, ignore_errors=False):
        # Do not discard cleanup uncertainty even if a compatibility caller passes
        # ignore_errors=True. The enclosing lease must not grant a second opener.
        with self._control:
            if self._closed:
                return
            self._stop_event.set()
            with self._io:
                self._quiesce_locked()
            thread = self._thread
            if thread is not None and thread.ident is not None:
                if thread is threading.current_thread():
                    self._poison()
                    raise InputError("INPUT_CLOSE_UNCONFIRMED")
                thread.join(timeout=_JOIN_TIMEOUT)
                if thread.is_alive():
                    self._poison()
            if self._cleanup_failed:
                raise InputError("INPUT_CLOSE_UNCONFIRMED")

    def close(self, ignore_errors=False):
        global _active_input
        with self._control:
            if self._closed:
                if self._cleanup_failed:
                    raise InputError("INPUT_CLOSE_UNCONFIRMED")
                return
            try:
                self.stop()
            except Exception:
                self._poison()
            # A live polling/callback thread might still access headers. Do not
            # unprepare, close or release them until its exit is confirmed.
            if self._thread is not None and self._thread.is_alive():
                self._poison()
                raise InputError("INPUT_CLOSE_UNCONFIRMED")
            if self._handle.value:
                with self._io:
                    for index, (_, header) in enumerate(self._buffers):
                        if not self._prepared[index]:
                            continue
                        result = None
                        for _ in range(50):
                            try:
                                result = self._dll.waveInUnprepareHeader(
                                    self._handle, ctypes.byref(header), ctypes.sizeof(header))
                            except Exception:
                                break
                            if result != 33:  # WAVERR_STILLPLAYING
                                break
                            time.sleep(0.01)
                        if result == 0:
                            self._prepared[index] = False
                        else:
                            self._poison()
                    try:
                        closed = self._dll.waveInClose(self._handle) == 0
                    except Exception:
                        closed = False
                    if not closed:
                        self._poison()
                    else:
                        self._handle = ctypes.c_void_p()
            if self._cleanup_failed:
                self._poison()
                raise InputError("INPUT_CLOSE_UNCONFIRMED")
            self._closed = True
            self._buffers.clear()
            self._prepared.clear()
            with _registry_lock:
                if _active_input is self:
                    _active_input = None

    def __enter__(self):
        return self.start()

    def __exit__(self, *args):
        self.close()
