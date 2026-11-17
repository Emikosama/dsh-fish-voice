"""Device identity and short cue playback. Enumeration never opens a stream."""
import ctypes
import hashlib
import json
import sys
import time


def selection(value):
    if value is None:
        return None
    if (not isinstance(value, dict) or set(value) != {"backend", "id", "name"}
            or value.get("backend") not in ("winmm", "portaudio")
            or not isinstance(value.get("id"), str) or not 0 < len(value["id"]) <= 1024
            or not isinstance(value.get("name"), str) or not 0 < len(value["name"]) <= 256
            or any(ord(c) < 32 for c in value["id"] + value["name"])):
        raise ValueError("AUDIO_DEVICE_INVALID")
    return value


def _winmm():
    if sys.platform != "win32":
        raise RuntimeError("AUDIO_PLATFORM_UNSUPPORTED")
    dll = ctypes.WinDLL("winmm", use_last_error=True)
    for direction in ("In", "Out"):
        message = getattr(dll, "wave" + direction + "Message")
        message.argtypes = [ctypes.c_void_p, ctypes.c_uint, ctypes.c_void_p, ctypes.c_size_t]
        message.restype = ctypes.c_uint
        caps = getattr(dll, "wave" + direction + "GetDevCapsW")
        caps.argtypes = [ctypes.c_size_t, ctypes.c_void_p, ctypes.c_uint]
        caps.restype = ctypes.c_uint
    return dll


class _WaveCaps(ctypes.Structure):
    _fields_ = [("manufacturer", ctypes.c_ushort), ("product", ctypes.c_ushort),
                ("version", ctypes.c_uint), ("name", ctypes.c_wchar * 32),
                ("formats", ctypes.c_uint), ("channels", ctypes.c_ushort),
                ("reserved", ctypes.c_ushort), ("support", ctypes.c_uint)]


def _endpoint(dll, direction, index):
    message = getattr(dll, "wave" + direction + "Message")
    size = ctypes.c_uint()
    # DRV_QUERYFUNCTIONINSTANCEIDSIZE / DRV_QUERYFUNCTIONINSTANCEID.
    if message(ctypes.c_void_p(index), 0x0800 + 18, ctypes.byref(size), 0) != 0:
        raise RuntimeError("AUDIO_ENDPOINT_UNAVAILABLE")
    if size.value < 4 or size.value > 8192 or size.value % 2:
        raise RuntimeError("AUDIO_ENDPOINT_INVALID")
    buffer = ctypes.create_unicode_buffer((size.value + 1) // 2)
    if message(ctypes.c_void_p(index), 0x0800 + 17, buffer, size.value) != 0:
        raise RuntimeError("AUDIO_ENDPOINT_UNAVAILABLE")
    value = buffer.value
    if not value or len(value) > 1024 or any(ord(c) < 32 for c in value):
        raise RuntimeError("AUDIO_ENDPOINT_INVALID")
    return value


def winmm_devices(direction, dll=None):
    dll = dll or _winmm()
    side = "In" if direction == "input" else "Out"
    count = min(int(getattr(dll, "wave" + side + "GetNumDevs")()), 128)
    items = []
    for index in range(count):
        caps = _WaveCaps()
        # WAVEINCAPS is 80 bytes on Windows; WAVEOUTCAPS includes support (84).
        length = ctypes.sizeof(caps) - (4 if side == "In" else 0)
        if getattr(dll, "wave" + side + "GetDevCapsW")(index, ctypes.byref(caps), length):
            continue
        try:
            endpoint = _endpoint(dll, side, index)
        except Exception:
            continue
        items.append({"backend": "winmm", "id": endpoint, "name": caps.name,
                      "nativeIndex": index})
    return items


def _portaudio_rows(sd, direction):
    key = "max_input_channels" if direction == "input" else "max_output_channels"
    rows = []
    for index, device in enumerate(sd.query_devices()):
        if device.get(key, 0) <= 0:
            continue
        host = sd.query_hostapis(device["hostapi"])["name"]
        name = device["name"]
        identity = hashlib.sha256((direction + "\0" + host + "\0" + name).encode("utf-8")).hexdigest()
        rows.append({"backend": "portaudio", "id": identity, "name": name,
                     "hostApi": host, "index": index})
    return rows


def inventory(sd=None):
    def result(items, reason=None):
        return {"status": "unavailable" if reason else "available" if items else "empty",
                "items": items, "reason": reason}
    incoming = result([], "INPUT_ENUMERATION_FAILED")
    outgoing = result([], "AUDIO_PLATFORM_UNSUPPORTED")
    if sys.platform == "win32":
        for direction in ("input", "output"):
            try:
                rows = winmm_devices(direction)
                # Duplicate native identities are not a usable choice. Friendly
                # names may repeat because routing uses the opened endpoint ID.
                counts = {}
                for row in rows:
                    counts[row["id"]] = counts.get(row["id"], 0) + 1
                items = [{key: row[key] for key in ("backend", "id", "name")}
                         for row in rows if counts[row["id"]] == 1]
                side = result(items)
            except Exception:
                side = result([], "INPUT_ENUMERATION_FAILED" if direction == "input" else "OUTPUT_ENUMERATION_FAILED")
            if direction == "input": incoming = side
            else: outgoing = side
    else:
        try:
            if sd is None:
                import sounddevice as sd
            rows = _portaudio_rows(sd, "input")
            counts = {}
            for row in rows:
                counts[row["id"]] = counts.get(row["id"], 0) + 1
            items = [{key: row[key] for key in ("backend", "id", "name")}
                     for row in rows if counts[row["id"]] == 1]
            incoming = result(items[:128])
        except Exception:
            pass
    return {"ok": True, "schema": 1, "input": incoming, "output": outgoing}


def resolve_native_input(value, dll=None):
    selected = selection(value)
    if selected is None:
        return 0xffffffff
    if selected["backend"] != "winmm":
        raise RuntimeError("INPUT_DEVICE_UNAVAILABLE")
    matches = [row for row in winmm_devices("input", dll) if row["id"] == selected["id"]]
    if len(matches) != 1:
        raise RuntimeError("INPUT_DEVICE_UNAVAILABLE")
    return matches[0]["nativeIndex"]


def native_input_info(value):
    dll = _winmm()
    index = resolve_native_input(value, dll)
    if index == 0xffffffff:
        preferred, flags = ctypes.c_uint(0xffffffff), ctypes.c_uint()
        if dll.waveInMessage(ctypes.c_void_p(0xffffffff), 0x2015, ctypes.byref(preferred),
                             ctypes.cast(ctypes.byref(flags), ctypes.c_void_p).value) != 0:
            raise RuntimeError("INPUT_DEFAULT_UNAVAILABLE")
        index = preferred.value
    rows = [row for row in winmm_devices("input", dll) if row["nativeIndex"] == index]
    if len(rows) != 1:
        raise RuntimeError("INPUT_DEVICE_UNAVAILABLE")
    return {"index": index, "name": rows[0]["name"]}


def resolve_input(value, sd):
    # Legacy numeric and string configuration remains supported unchanged. Native
    # Windows identities must use the native stream, never PortAudio's cached IDs.
    if value is not None and not isinstance(value, dict):
        return value
    selected = selection(value)
    if selected is None:
        return None
    if selected["backend"] != "portaudio" or sys.platform == "win32":
        raise RuntimeError("INPUT_NATIVE_CAPTURE_REQUIRED")
    matches = [row for row in _portaudio_rows(sd, "input") if row["id"] == selected["id"]]
    if len(matches) != 1:
        raise RuntimeError("INPUT_DEVICE_UNAVAILABLE")
    return matches[0]["index"]


def resolve_output(value, dll=None):
    selected = selection(value)
    if selected is None:
        return 0xffffffff
    if selected["backend"] != "winmm":
        raise RuntimeError("OUTPUT_DEVICE_UNAVAILABLE")
    matches = [row for row in winmm_devices("output", dll) if row["id"] == selected["id"]]
    if len(matches) != 1:
        raise RuntimeError("OUTPUT_DEVICE_UNAVAILABLE")
    return matches[0]["nativeIndex"]


class _WaveFormat(ctypes.Structure):
    _pack_ = 2
    _fields_ = [("tag", ctypes.c_ushort), ("channels", ctypes.c_ushort),
                ("rate", ctypes.c_uint), ("bytesPerSecond", ctypes.c_uint),
                ("blockAlign", ctypes.c_ushort), ("bits", ctypes.c_ushort),
                ("extra", ctypes.c_ushort)]


class _WaveHeader(ctypes.Structure):
    _fields_ = [("data", ctypes.c_void_p), ("length", ctypes.c_uint),
                ("recorded", ctypes.c_uint), ("user", ctypes.c_size_t),
                ("flags", ctypes.c_uint), ("loops", ctypes.c_uint),
                ("next", ctypes.c_void_p), ("reserved", ctypes.c_size_t)]


# A malfunctioning driver must never retain a pointer to a collected Python buffer.
# A cleanup failure disables further cues until helper restart, bounding retention.
_unreleased_audio = []


def _assert_opened_endpoint(dll, handle, selected):
    if selected is None:
        return
    actual = ctypes.c_uint()
    if dll.waveOutGetID(handle, ctypes.byref(actual)) or _endpoint(dll, "Out", actual.value) != selected["id"]:
        raise RuntimeError("OUTPUT_DEVICE_UNAVAILABLE")


def play_cue(pcm, rate, value, stop):
    """Own one short WinMM stream; no global mixer/default-device changes."""
    if _unreleased_audio:
        raise RuntimeError("AUDIO_CLEANUP_FAILED")
    selected = selection(value)
    if not isinstance(rate, int) or not 8000 <= rate <= 192000 or not isinstance(pcm, bytes) or not pcm or len(pcm) > rate * 2 * 5 or len(pcm) % 2:
        raise ValueError("AUDIO_DATA_INVALID")
    dll = _winmm()
    handle = ctypes.c_void_p()
    for name in ("waveOutPrepareHeader", "waveOutWrite", "waveOutUnprepareHeader"):
        getattr(dll, name).argtypes = [ctypes.c_void_p, ctypes.POINTER(_WaveHeader), ctypes.c_uint]
    for name in ("waveOutReset", "waveOutClose"):
        getattr(dll, name).argtypes = [ctypes.c_void_p]
    dll.waveOutOpen.argtypes = [ctypes.POINTER(ctypes.c_void_p), ctypes.c_uint,
                               ctypes.POINTER(_WaveFormat), ctypes.c_size_t, ctypes.c_size_t, ctypes.c_uint]
    dll.waveOutGetID.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_uint)]
    fmt = _WaveFormat(1, 1, rate, rate * 2, 2, 16, 0)
    endpoint = resolve_output(value, dll)
    if stop.is_set():
        return
    if dll.waveOutOpen(ctypes.byref(handle), endpoint, ctypes.byref(fmt), 0, 0, 0):
        raise RuntimeError("OUTPUT_DEVICE_UNAVAILABLE")
    data = ctypes.create_string_buffer(pcm)
    header = _WaveHeader(ctypes.cast(data, ctypes.c_void_p), len(pcm), 0, 0, 0, 0, None, 0)
    prepared = False
    try:
        _assert_opened_endpoint(dll, handle, selected)
        if dll.waveOutPrepareHeader(handle, ctypes.byref(header), ctypes.sizeof(header)):
            raise RuntimeError("AUDIO_PREPARE_FAILED")
        prepared = True
        if stop.is_set():
            return
        _assert_opened_endpoint(dll, handle, selected)
        if dll.waveOutWrite(handle, ctypes.byref(header), ctypes.sizeof(header)):
            raise RuntimeError("AUDIO_PLAYBACK_FAILED")
        deadline = time.monotonic() + 6
        next_check = 0
        while not header.flags & 1:
            if stop.wait(.01):
                return
            if time.monotonic() > deadline:
                raise RuntimeError("AUDIO_PLAYBACK_TIMEOUT")
            if time.monotonic() >= next_check:
                _assert_opened_endpoint(dll, handle, selected)
                next_check = time.monotonic() + .1
        _assert_opened_endpoint(dll, handle, selected)
    finally:
        dll.waveOutReset(handle)
        released = not prepared
        if prepared:
            for _ in range(50):
                result = dll.waveOutUnprepareHeader(handle, ctypes.byref(header), ctypes.sizeof(header))
                if result == 0:
                    released = True
                    break
                if result != 33:  # WAVERR_STILLPLAYING
                    break
                time.sleep(.01)
        if dll.waveOutClose(handle) != 0:
            released = False
        if not released:
            _unreleased_audio.append((dll, handle, data, header))
            raise RuntimeError("AUDIO_CLEANUP_FAILED")


if __name__ == "__main__":
    # No config, hooks, audio streams, model loads, or microphone permission requests.
    if sys.argv[1:] != ["enumerate"]:
        raise SystemExit(2)
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="strict")
    print(json.dumps(inventory(), ensure_ascii=False))
