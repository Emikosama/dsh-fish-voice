"""Exercise the shipped Edge worker and vendor stream through the UTF-8 stdin protocol."""
from email.utils import formatdate
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os
from pathlib import Path
import subprocess
import tempfile
from threading import Thread
import time
import unittest

ROOT = Path(__file__).resolve().parents[1]
WORKER = ROOT / "voice-tts-edge-worker.mjs"
VOICE = "zh-CN-XiaoyiNeural"


class TtsEdgeTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.preload = self.root / "offline-edge.cjs"
        # A complete mono MPEG-2 layer III frame at the worker's 24 kHz / 48 kbps.
        self.frame = bytes.fromhex("fff364c0") + bytes(140)
        self.preload.write_text(r"""
const { EventEmitter } = require('node:events')
const id = require.resolve(process.env.EDGE_TEST_VENDOR)
const scenario = process.env.EDGE_TEST_CASE
const { EdgeTTS } = require(id)
if (scenario === 'vendor') require.cache[id].exports = {}
const handshakeStatus = { forbidden: 403, rate: 429, unavailable: 503, rejected: 400 }[scenario]
const networkErrors = { reset: 'ECONNRESET', dns: 'ENOTFOUND', timeout: 'ETIMEDOUT', 'private-network': 'ERR_TLS_PRIVATE' }
EdgeTTS.prototype._connectWebSocket = async function() {
  if (handshakeStatus) throw new Error('Unexpected server response: ' + handshakeStatus)
  if (scenario === 'connect-timeout') throw new Error('Timed out while connecting to Edge TTS')
  if (networkErrors[scenario]) {
    throw Object.assign(new Error('PRIVATE-HOST'), { code: networkErrors[scenario] })
  }
  if (scenario === 'stream-timeout') this.timeout = 1
  const socket = new EventEmitter()
  socket.readyState = 1
  socket.close = () => {}
  socket.terminate = () => {}
  socket.send = message => {
    if (!message.includes('Path:ssml\r\n')) return
    if (scenario === 'private') throw new Error(message)
    if (scenario === 'stream-timeout') return
    setImmediate(() => {
      if (scenario === 'closed' || scenario === 'policy') {
        socket.emit('close', scenario === 'closed' ? 1006 : 1008, Buffer.from('PRIVATE-REASON'))
        return
      }
      if (scenario === 'frame') {
        socket.emit('message', Buffer.from([255, 255]), true)
        return
      }
      if (scenario !== 'empty') {
        const frame = Buffer.alloc(144)
        Buffer.from('fff364c0', 'hex').copy(frame)
        const payload = scenario === 'mp3' ? frame.subarray(0, 143) : frame
        const header = Buffer.from('Path:audio\r\n')
        const headerLength = Buffer.alloc(2)
        headerLength.writeUInt16BE(header.length)
        for (const part of [payload.subarray(0, 3), payload.subarray(3)]) {
          socket.emit('message', Buffer.concat([headerLength, header, part]), true)
        }
      }
      socket.emit('message', Buffer.from('Path:turn.end\r\n'), false)
    })
  }
  return socket
}
""", encoding="utf-8")
        self.handshake_preload = self.root / "loopback-edge.cjs"
        self.env = {**os.environ, "EDGE_TEST_VENDOR": str(ROOT / "vendor/edge-tts.cjs")}

    def request(self, text, output, voice=VOICE, scenario="audio", port=None):
        request = {"op": "synthesize", "text": text, "voice": voice, "output": str(output)}
        preload = self.preload if port is None else self.handshake_preload
        return subprocess.run(["node", "--require", str(preload), str(WORKER)],
                              input=json.dumps(request, ensure_ascii=False), text=True,
                              encoding="utf-8", capture_output=True,
                              env={**self.env, "EDGE_TEST_CASE": scenario, "EDGE_TEST_PORT": str(port)}, timeout=10)

    def test_probe_only_reports_existing_dependency(self):
        # The parent adapter now owns dependency inspection. Inspect without a player.
        script = """import {createWindowsTtsAdapter} from './voice-tts.mjs';
            const adapter = createWindowsTtsAdapter({ platform:'win32', runner(){throw Error('unexpected playback')} });
            console.log(JSON.stringify(await adapter.inspect(undefined,{checkPlayback:false,checkEdgeDependency:true})));"""
        result = subprocess.run(["node", "--input-type=module", "-e", script], cwd=ROOT,
                                text=True, encoding="utf-8", capture_output=True, check=True)
        self.assertEqual(json.loads(result.stdout)["edgeDependency"], "installed")
        self.assertFalse((self.root / "speech.mp3").exists())

    def test_synthesis_writes_only_requested_temporary_audio(self):
        path = self.root / "speech.mp3"
        result = self.request("你好", path)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout), {"ok": True, "synthesized": True, "durationMs": 24})
        self.assertEqual(path.read_bytes(), self.frame)
        self.assertEqual(set(self.root.iterdir()), {path, self.preload})
        self.assertNotIn("你好", result.stdout + result.stderr)

    def test_protocol_uses_utf8_with_unicode_output_path(self):
        path = self.root / "语音.mp3"
        result = self.request("你好，鱼应", path)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertTrue(json.loads(result.stdout)["synthesized"])
        self.assertEqual(path.read_bytes(), self.frame)

    def test_invalid_voice_or_oversize_text_never_writes(self):
        path = self.root / "speech.mp3"
        for text, voice in [("hello", "unlisted"), ("x" * 70000, VOICE)]:
            result = self.request(text, path, voice)
            self.assertEqual(result.returncode, 1)
            self.assertEqual(json.loads(result.stdout), {"ok": False, "code": "EDGE_INVALID_REQUEST"})
            self.assertFalse(path.exists())

    def test_worker_reports_only_bounded_failure_details(self):
        path = self.root / "PRIVATE-PATH.mp3"
        outcomes = {
            "vendor": ("EDGE_VENDOR_UNAVAILABLE", {}),
            "forbidden": ("EDGE_HTTP_FORBIDDEN", {"httpStatus": 403}),
            "rate": ("EDGE_HTTP_RATE_LIMITED", {"httpStatus": 429}),
            "unavailable": ("EDGE_HTTP_UNAVAILABLE", {"httpStatus": 503}),
            "rejected": ("EDGE_HTTP_REJECTED", {"httpStatus": 400}),
            "connect-timeout": ("EDGE_TIMEOUT", {}),
            "stream-timeout": ("EDGE_TIMEOUT", {}),
            "timeout": ("EDGE_TIMEOUT", {"networkCode": "ETIMEDOUT"}),
            "reset": ("EDGE_NETWORK_FAILED", {"networkCode": "ECONNRESET"}),
            "dns": ("EDGE_CONNECTION_FAILED", {"networkCode": "ENOTFOUND"}),
            "private-network": ("EDGE_CONNECTION_FAILED", {}),
            "closed": ("EDGE_STREAM_CLOSED", {"closeCode": 1006}),
            "policy": ("EDGE_STREAM_FAILED", {"closeCode": 1008}),
            "frame": ("EDGE_STREAM_FAILED", {}),
            "private": ("EDGE_STREAM_FAILED", {}),
            "empty": ("EDGE_EMPTY_AUDIO", {}),
            "mp3": ("EDGE_INVALID_AUDIO", {}),
        }
        for scenario, (code, details) in outcomes.items():
            with self.subTest(scenario=scenario):
                result = self.request("PRIVATE-TEXT", path, scenario=scenario)
                self.assertEqual(result.returncode, 1)
                self.assertEqual(json.loads(result.stdout), {"ok": False, "code": code, **details})
                self.assertEqual(result.stderr, "")
                self.assertNotIn("PRIVATE", result.stdout)
                self.assertFalse(path.exists())

    def test_existing_file_is_not_overwritten(self):
        path = self.root / "speech.mp3"
        path.write_bytes(b"keep")
        result = self.request("你好", path)
        self.assertEqual(result.returncode, 1)
        self.assertEqual(json.loads(result.stdout), {"ok": False, "code": "EDGE_INVALID_OUTPUT"})
        self.assertEqual(path.read_bytes(), b"keep")

    def test_real_vendor_handshake_reports_only_a_valid_retry_after(self):
        # Keep the real vendored WebSocket handshake and reroute its Node HTTP request to loopback.
        self.handshake_preload.write_text("""
const http = require('node:http')
require('node:https').request = options => http.request({
  ...options,
  protocol: 'http:',
  hostname: '127.0.0.1',
  port: Number(process.env.EDGE_TEST_PORT),
  path: '/',
  headers: { ...options.headers, host: options.host },
  createConnection: undefined,
  agent: false,
})
""", encoding="utf-8")

        class RateLimitHandler(BaseHTTPRequestHandler):
            def do_GET(self):
                self.send_response(self.server.status)
                self.send_header("Content-Length", "0")
                if self.server.retry_after is not None:
                    self.send_header("Retry-After", self.server.retry_after)
                self.send_header("X-Private", "PRIVATE-HEADER")
                self.end_headers()

            def log_message(self, *_):
                pass

        path = self.root / "PRIVATE-PATH.mp3"
        rate_limited = {"ok": False, "code": "EDGE_HTTP_RATE_LIMITED", "httpStatus": 429}
        unavailable = {"ok": False, "code": "EDGE_HTTP_UNAVAILABLE", "httpStatus": 503}
        future = time.time() + 120
        with HTTPServer(("127.0.0.1", 0), RateLimitHandler) as server:
            thread = Thread(target=server.serve_forever, kwargs={"poll_interval": 0.01}, daemon=True)
            thread.start()
            try:
                cases = [
                    (429, "7", {**rate_limited, "retryAfterMs": 7000}),
                    (429, formatdate(0, usegmt=True), {**rate_limited, "retryAfterMs": 0}),
                    (429, "Sunday, 06-Nov-94 08:49:37 GMT", {**rate_limited, "retryAfterMs": 0}),
                    (429, "Sun Nov  6 08:49:37 1994", {**rate_limited, "retryAfterMs": 0}),
                    (429, "999999999999999999999999", {**rate_limited, "retryAfterMs": 2**53 - 1}),
                    (429, formatdate(future, usegmt=True), None),
                    (429, "PRIVATE-HEADER", rate_limited),
                    (429, None, rate_limited),
                    (503, "9", {**unavailable, "retryAfterMs": 9000}),
                    (503, None, unavailable),
                    (502, "7", {"ok": False, "code": "EDGE_HTTP_UNAVAILABLE", "httpStatus": 502}),
                    (403, "7", {"ok": False, "code": "EDGE_HTTP_FORBIDDEN", "httpStatus": 403}),
                ]
                for status, retry_after, expected in cases:
                    with self.subTest(status=status, retry_after=retry_after):
                        server.status = status
                        server.retry_after = retry_after
                        result = self.request("PRIVATE-TEXT", path, port=server.server_port)
                        self.assertEqual(result.returncode, 1)
                        self.assertEqual(result.stderr, "")
                        self.assertNotIn("PRIVATE", result.stdout)
                        self.assertFalse(path.exists())
                        body = json.loads(result.stdout)
                        if expected is None:
                            delay = body.pop("retryAfterMs", -1)
                            self.assertGreaterEqual(delay, 100000)
                            self.assertLessEqual(delay, 120000)
                            self.assertEqual(body, rate_limited)
                        else:
                            self.assertEqual(body, expected)
            finally:
                server.shutdown()
                thread.join(timeout=3)


if __name__ == "__main__":
    unittest.main()
