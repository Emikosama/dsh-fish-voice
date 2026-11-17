"""Stdlib-only PCM and loopback Whisper-WASM client for whale-ear.

This module deliberately imports no audio, ML, or numerical packages. The
service receives one raw 16 kHz mono float32 little-endian buffer per utterance.
"""

import array
import ipaddress
import json
import math
import os
import sys
import struct
import urllib.error
import urllib.parse
import urllib.request
import wave


SAMPLE_RATE = 16000
SAMPLE_WIDTH = 4
MAX_RESPONSE_BYTES = 64 * 1024
REQUEST_TIMEOUT_SECONDS = 30


class WasmAsrError(RuntimeError):
    """Safe, bounded error code; never includes a token, path, or response body."""

    def __init__(self, code):
        self.code = str(code)[:48]
        super().__init__(self.code)


class UnsupportedPcmWav(ValueError):
    """A WAV file this small stdlib decoder cannot faithfully decode."""


class Float32Audio:
    """A compact little-endian float32 sample buffer with stdlib operations."""

    __slots__ = ("_data",)

    def __init__(self, data=b""):
        if isinstance(data, Float32Audio):
            data = data._data
        self._data = bytearray(data)
        if len(self._data) % SAMPLE_WIDTH:
            raise ValueError("float32 audio buffer has an incomplete sample")

    @classmethod
    def empty(cls):
        return cls()

    @classmethod
    def from_native_bytes(cls, data):
        """Read sounddevice/WinMM float32 bytes and store them as little-endian."""
        raw = bytes(data)
        if len(raw) % SAMPLE_WIDTH:
            raise ValueError("float32 audio buffer has an incomplete sample")
        if sys.byteorder == "little":
            return cls(raw)
        samples = array.array("f")
        samples.frombytes(raw)
        samples.byteswap()
        return cls(samples.tobytes())

    @classmethod
    def from_samples(cls, samples):
        values = array.array("f", (float(value) for value in samples))
        if sys.byteorder != "little":
            values.byteswap()
        return cls(values.tobytes())

    @classmethod
    def concatenate(cls, chunks):
        result = bytearray()
        for chunk in chunks:
            if isinstance(chunk, Float32Audio):
                result.extend(chunk._data)
            else:
                result.extend(cls.from_samples(chunk)._data)
        return cls(result)

    @property
    def size(self):
        return len(self._data) // SAMPLE_WIDTH

    @property
    def nbytes(self):
        return len(self._data)

    @property
    def raw(self):
        return bytes(self._data)

    def __len__(self):
        return self.size

    def __bool__(self):
        return bool(self._data)

    def __iter__(self):
        return (sample[0] for sample in struct.iter_unpack("<f", self._data))

    def __getitem__(self, index):
        if isinstance(index, slice):
            start, stop, step = index.indices(self.size)
            if step == 1:
                return Float32Audio(self._data[start * SAMPLE_WIDTH:stop * SAMPLE_WIDTH])
            return Float32Audio.from_samples(self[i] for i in range(start, stop, step))
        if index < 0:
            index += self.size
        if index < 0 or index >= self.size:
            raise IndexError(index)
        return struct.unpack_from("<f", self._data, index * SAMPLE_WIDTH)[0]

    def append(self, samples):
        """Append another buffer in place; used by bounded capture frame queues."""
        if isinstance(samples, Float32Audio):
            self._data.extend(samples._data)
        else:
            self._data.extend(Float32Audio.from_samples(samples)._data)

    def rms(self):
        count = self.size
        if not count:
            return 0.0
        total = 0.0
        for value in self:
            total += value * value
        return math.sqrt(total / count)

    def normalized(self):
        if not self.size:
            return Float32Audio.empty()
        mean = sum(self) / self.size
        values = [value - mean for value in self]
        peak = max(abs(value) for value in values)
        gain = min(6.0, 0.9 / peak) if 1e-5 < peak < 0.5 else 1.0
        return Float32Audio.from_samples(value * gain for value in values)

    def to_pcm16_bytes(self):
        pcm = array.array("h", (int(max(-1.0, min(1.0, value)) * 32767.0) for value in self))
        if sys.byteorder != "little":
            pcm.byteswap()
        return pcm.tobytes()

    def tobytes(self):
        return self.raw


def binding_from_env(environ=None):
    """Return a validated (loopback_url, bearer_token) pair or None."""
    env = os.environ if environ is None else environ
    url = env.get("WHALE_ASR_WASM_URL")
    token = env.get("WHALE_ASR_WASM_TOKEN")
    if (not isinstance(url, str) or not url.strip() or len(url) > 4096
            or any(ord(ch) < 32 or ord(ch) == 127 for ch in url)
            or not isinstance(token, str) or not token):
        return None
    if len(token) > 2048 or any(ord(ch) < 33 or ord(ch) > 126 for ch in token):
        return None
    try:
        parts = urllib.parse.urlsplit(url.strip())
        if parts.scheme.lower() != "http" or parts.username is not None or parts.password is not None:
            return None
        if parts.fragment:
            return None
        host = parts.hostname
        if not host or "%" in host:
            return None
        address = ipaddress.ip_address(host)
        if not address.is_loopback:
            return None
        port = parts.port
        if port is not None and not 1 <= port <= 65535:
            return None
    except (ValueError, TypeError):
        return None
    return parts.geturl(), token


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def _pcm_bytes(audio):
    if isinstance(audio, Float32Audio):
        return audio.raw
    if isinstance(audio, (bytes, bytearray, memoryview)):
        raw = bytes(audio)
        if len(raw) % SAMPLE_WIDTH:
            raise WasmAsrError("invalid-audio")
        return raw
    try:
        return Float32Audio.from_samples(audio).raw
    except Exception:
        raise WasmAsrError("invalid-audio") from None


def transcribe(audio, url=None, token=None, timeout=REQUEST_TIMEOUT_SECONDS):
    """POST raw 16 kHz mono float32 LE to a validated local-only endpoint."""
    if url is None or token is None:
        binding = binding_from_env()
        if binding is None:
            raise WasmAsrError("binding-unavailable")
        url, token = binding
    else:
        binding = binding_from_env({"WHALE_ASR_WASM_URL": str(url), "WHALE_ASR_WASM_TOKEN": str(token)})
        if binding is None:
            raise WasmAsrError("binding-invalid")
        url, token = binding
    body = _pcm_bytes(audio)
    if not body:
        raise WasmAsrError("empty-audio")
    request = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": "Bearer " + token,
            "Content-Type": "application/octet-stream",
            "Accept": "application/json",
            "X-Audio-Sample-Rate": str(SAMPLE_RATE),
            "X-Audio-Channels": "1",
            "X-Audio-Format": "float32le",
        },
        method="POST",
    )
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), _NoRedirect())
    try:
        with opener.open(request, timeout=float(timeout)) as response:
            if not 200 <= int(response.status) < 300:
                raise WasmAsrError("http-%d" % int(response.status))
            payload = response.read(MAX_RESPONSE_BYTES + 1)
    except WasmAsrError:
        raise
    except urllib.error.HTTPError as exc:
        raise WasmAsrError("http-%d" % int(exc.code)) from None
    except (urllib.error.URLError, TimeoutError, OSError, ValueError):
        raise WasmAsrError("service-unavailable") from None
    except Exception:
        raise WasmAsrError("service-unavailable") from None
    if len(payload) > MAX_RESPONSE_BYTES:
        raise WasmAsrError("response-too-large")
    try:
        result = json.loads(payload.decode("utf-8"))
    except (UnicodeDecodeError, ValueError):
        raise WasmAsrError("invalid-response") from None
    if not isinstance(result, dict) or not isinstance(result.get("text"), str):
        raise WasmAsrError("invalid-response")
    language = result.get("language")
    if language is not None and not isinstance(language, str):
        language = None
    return {"text": result["text"][:16000].strip(),
            "language": language[:32].strip() if language else None}


def _decode_pcm_samples(raw, width):
    if width == 1:
        return array.array("f", ((value - 128) / 128.0 for value in raw))
    if width == 2:
        values = array.array("h")
        values.frombytes(raw)
        if sys.byteorder != "little":
            values.byteswap()
        return array.array("f", (value / 32768.0 for value in values))
    if width == 3:
        out = array.array("f")
        for offset in range(0, len(raw), 3):
            value = int.from_bytes(raw[offset:offset + 3], "little", signed=True)
            out.append(value / 8388608.0)
        return out
    if width == 4:
        values = array.array("i")
        values.frombytes(raw)
        if sys.byteorder != "little":
            values.byteswap()
        return array.array("f", (value / 2147483648.0 for value in values))
    raise UnsupportedPcmWav("unsupported PCM width")


def decode_pcm_wav(path, sample_rate=SAMPLE_RATE):
    """Decode uncompressed integer PCM WAV, downmix, and linearly resample."""
    try:
        with wave.open(path, "rb") as source:
            channels = source.getnchannels()
            width = source.getsampwidth()
            source_rate = source.getframerate()
            count = source.getnframes()
            if source.getcomptype() != "NONE" or channels < 1 or source_rate < 1:
                raise UnsupportedPcmWav("unsupported WAV encoding")
            raw = source.readframes(count)
    except (wave.Error, EOFError) as exc:
        raise UnsupportedPcmWav("unsupported WAV encoding") from exc
    samples = _decode_pcm_samples(raw, width)
    frame_count = len(samples) // channels
    if not frame_count:
        return Float32Audio.empty()
    if channels == 1:
        mono = samples[:frame_count]
    else:
        mono = array.array("f", (
            sum(float(samples[frame * channels + channel]) for channel in range(channels)) / channels
            for frame in range(frame_count)
        ))
    if source_rate == sample_rate:
        return Float32Audio.from_samples(mono)
    output_count = max(1, int(round(frame_count * float(sample_rate) / source_rate)))
    ratio = float(source_rate) / sample_rate
    resampled = array.array("f")
    for index in range(output_count):
        position = index * ratio
        left = min(frame_count - 1, int(position))
        right = min(frame_count - 1, left + 1)
        fraction = position - left
        resampled.append(mono[left] * (1.0 - fraction) + mono[right] * fraction)
    return Float32Audio.from_samples(resampled)
