"""Stdlib-only route tests; the HTTP fixture binds loopback only."""
import builtins
import copy
import importlib.util
import json
import os
from pathlib import Path
import struct
import tempfile
import threading
import time
import unittest
import wave
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN_IMPORTS = {"numpy", "av", "sherpa_onnx", "faster_whisper"}


def load_helper(home, url=None, token=None, reset=True):
    env = {"DSH_HOME": str(home)}
    if url is not None:
        env["WHALE_ASR_WASM_URL"] = url
    if token is not None:
        env["WHALE_ASR_WASM_TOKEN"] = token
    spec = importlib.util.spec_from_file_location(
        "whale_wasm_test_" + str(time.time_ns()), ROOT / "helper/voice_helper.py")
    helper = importlib.util.module_from_spec(spec)
    with patch.dict(os.environ, env, clear=False):
        spec.loader.exec_module(helper)
    if reset:
        helper.CFG = copy.deepcopy(helper.DEFAULTS)
    return helper


class LoopbackAsr:
    def __init__(self, response=None, status=200):
        self.response = response or {"text": " 你好，鲸鱼。 ", "language": "zh"}
        self.status = status
        self.last_request = None

        owner = self

        class Handler(BaseHTTPRequestHandler):
            def do_POST(self):
                size = int(self.headers.get("Content-Length", "0"))
                owner.last_request = (dict(self.headers.items()), self.rfile.read(size))
                if owner.status in (301, 302, 303, 307, 308):
                    self.send_response(owner.status)
                    self.send_header("Location", "http://192.0.2.1/should-not-be-followed")
                    self.end_headers()
                    return
                body = json.dumps(owner.response).encode("utf-8")
                self.send_response(owner.status)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def log_message(self, *_args):
                pass

        self.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.url = "http://127.0.0.1:%d/asr" % self.server.server_address[1]

    def close(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(1)


class WhisperWasmTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.server = LoopbackAsr()
        self.addCleanup(self.server.close)
        self.env_patch = patch.dict(os.environ, {
            "WHALE_ASR_WASM_URL": self.server.url,
            "WHALE_ASR_WASM_TOKEN": "test-local-token",
        }, clear=False)
        self.env_patch.start()
        self.addCleanup(self.env_patch.stop)
        self.h = load_helper(self.temp.name, self.server.url, "test-local-token")
        self.h.CFG["asr"] = "whisper-wasm"

    def no_heavy_import(self, name, *args, **kwargs):
        if name.split(".", 1)[0] in FORBIDDEN_IMPORTS:
            raise AssertionError("unexpected heavy import: " + name)
        return self.original_import(name, *args, **kwargs)

    def block_heavy_imports(self):
        self.original_import = builtins.__import__
        return patch("builtins.__import__", side_effect=self.no_heavy_import)

    def samples(self, count=8000):
        return self.h._whale_asr_wasm.Float32Audio.from_samples(
            0.2 * __import__("math").sin(i * 0.04) for i in range(count))

    def test_valid_node_binding_selects_implicit_route_and_preload_stays_stdlib(self):
        helper = load_helper(self.temp.name + "-implicit", self.server.url, "test-local-token", reset=False)
        self.assertEqual(helper.asr_engine(), "whisper-wasm")
        with self.block_heavy_imports():
            self.assertEqual(helper.preload(), [])
        self.assertEqual(helper.loaded_models(), [])

    def test_explicit_legacy_config_keeps_its_selected_route(self):
        home = Path(self.temp.name + "-legacy")
        data = home / "whale-ear"
        data.mkdir(parents=True)
        (data / "config.json").write_text('{"asr":"sensevoice"}', encoding="utf-8")
        helper = load_helper(home, self.server.url, "test-local-token", reset=False)
        self.assertEqual(helper.asr_engine(), "sensevoice")

    def test_capture_normalize_asr_and_prosody_need_no_numpy_pyav_or_sherpa(self):
        h = self.h
        audio = self.samples()
        with self.block_heavy_imports():
            result = h.full_result(audio)
        self.assertEqual(result["text"], "你好，鲸鱼。")
        self.assertEqual(result["lang"], "zh")
        self.assertEqual(result["prosody"]["voicedFrames"], audio.size // h.FRAME)
        self.assertEqual(h.inference_compute_status()["engine"], "whisper-wasm")
        headers, body = self.server.last_request
        self.assertEqual(body, audio.normalized().raw)
        self.assertEqual(headers["Authorization"], "Bearer test-local-token")
        self.assertEqual(headers["Content-Type"], "application/octet-stream")
        self.assertEqual(headers["X-Audio-Sample-Rate"], "16000")
        self.assertEqual(headers["X-Audio-Channels"], "1")
        self.assertEqual(headers["X-Audio-Format"], "float32le")

    def test_ptt_recorder_uses_stdlib_sample_buffer_and_vad(self):
        h = self.h
        source = self.samples(640)
        raw = source.raw

        class CaptureGate:
            def acquire(self, _lease, current):
                return bool(current())

            def release(self, *_args, **_kwargs):
                return None

        class Stream:
            error = None

            def __init__(self, callback):
                self.callback = callback

            def start(self):
                self.callback(raw, len(raw) // 4, None, None)

            def stop(self):
                pass

            def close(self):
                pass

        with self.block_heavy_imports(), patch.object(h, "_capture_device", CaptureGate()), \
                patch.object(h, "_close_capture"), patch.object(h, "device_info", return_value={"name": "fixture"}), \
                patch.object(h, "_make_input_stream", side_effect=lambda _device, callback: Stream(callback)):
            recorder = h.Recorder(max_seconds=0.03, silence_ms=10000, no_speech_ms=10000)
            recorder.run()
        self.assertIsInstance(recorder.audio, h._whale_asr_wasm.Float32Audio)
        self.assertEqual(recorder.audio.raw, raw)
        self.assertEqual(recorder.audio.size, 640)

    def test_always_and_wake_vad_segment_stdlib_frames(self):
        h = self.h
        frame = h._whale_asr_wasm.Float32Audio.from_samples([0.2] * h.FRAME)
        silence = h._whale_asr_wasm.Float32Audio.empty()
        silence.append([0.0] * h.FRAME)
        for mode in ("always", "wake"):
            listener = h.AlwaysListener(mode=mode, capture_id="capture")
            state = listener._new_state()
            settings = listener._settings()
            settings.update(startFrames=1, minSpeechMs=20, silenceMs=40, maxSegmentMs=1000)
            seen = []
            with self.subTest(mode=mode), self.block_heavy_imports(), \
                    patch.object(listener, "_handle_segment", side_effect=lambda audio, *_a, **_kw: seen.append(audio)):
                listener._consume_frames([frame, frame, silence, silence], state, settings,
                                         captured_at=time.time() * 1000)
            self.assertEqual(len(seen), 1)
            self.assertIsInstance(seen[0], h._whale_asr_wasm.Float32Audio)
            self.assertEqual(seen[0].size, 2 * h.FRAME)

    def test_pcm_wav_decodes_without_faster_whisper(self):
        h = self.h
        path = Path(self.temp.name) / "input.wav"
        values = [0, 16384, -16384, 32767]
        with wave.open(str(path), "wb") as output:
            output.setnchannels(1)
            output.setsampwidth(2)
            output.setframerate(16000)
            output.writeframes(struct.pack("<4h", *values))
        with patch.object(h, "_stdlib_pcm_route", return_value=True), self.block_heavy_imports():
            audio = h.decode_file(str(path))
        self.assertIsInstance(audio, h._whale_asr_wasm.Float32Audio)
        self.assertEqual(audio.size, 4)
        self.assertAlmostEqual(audio[1], 0.5, places=5)

    def test_truncated_pcm_wav_cannot_return_a_partial_transcript(self):
        h = self.h
        path = Path(self.temp.name) / "truncated.wav"
        with wave.open(str(path), "wb") as output:
            output.setnchannels(1)
            output.setsampwidth(2)
            output.setframerate(16000)
            output.writeframes(struct.pack("<4h", 0, 16384, -16384, 32767))
        path.write_bytes(path.read_bytes()[:-2])
        with patch.object(h, "_stdlib_pcm_route", return_value=True), self.block_heavy_imports():
            with self.assertRaisesRegex(ValueError, "WAV 音频数据不完整"):
                h.decode_file(str(path))

    @unittest.skipUnless(os.name == "nt", "Windows Media Foundation")
    def test_default_file_route_decodes_mp3_with_only_standard_library(self):
        import subprocess
        import sys
        script = (
            "import importlib.util, sys\n"
            "spec = importlib.util.spec_from_file_location('voice', sys.argv[1])\n"
            "helper = importlib.util.module_from_spec(spec)\n"
            "spec.loader.exec_module(helper)\n"
            "helper.CFG['asr'] = 'whisper-wasm'\n"
            "samples = helper.decode_file(sys.argv[2])\n"
            "assert len(samples) > 1000 and max(map(abs, samples)) > 0.01\n"
        )
        subprocess.run([sys.executable, "-I", "-S", "-B", "-c", script,
                        str(ROOT / "helper/voice_helper.py"),
                        str(ROOT / "tests/fixtures/native-audio/tone.mp3")],
                       env={**os.environ, "DSH_HOME": self.temp.name}, check=True, timeout=55)

    def test_remote_binding_is_rejected_and_redirect_is_not_followed(self):
        client = self.h._whale_asr_wasm
        self.assertIsNone(client.binding_from_env({
            "WHALE_ASR_WASM_URL": "http://example.com/asr",
            "WHALE_ASR_WASM_TOKEN": "token",
        }))
        with self.assertRaisesRegex(client.WasmAsrError, "binding-invalid"):
            client.transcribe(self.samples(), "http://192.0.2.1/asr", "token")
        self.server.status = 302
        with self.assertRaisesRegex(client.WasmAsrError, "http-302"):
            client.transcribe(self.samples(), self.server.url, "test-local-token")

    def test_explicit_route_without_binding_fails_closed(self):
        with patch.dict(os.environ, {
            "WHALE_ASR_WASM_URL": "",
            "WHALE_ASR_WASM_TOKEN": "",
        }, clear=False):
            with self.assertRaisesRegex(RuntimeError, "未绑定"):
                self.h.transcribe_audio(self.samples())
        self.assertEqual(self.h.loaded_models(), [])


if __name__ == "__main__":
    unittest.main()
