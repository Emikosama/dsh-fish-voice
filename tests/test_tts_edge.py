"""Exercise the shipped Node Edge worker offline through its UTF-8 stdin protocol."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
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
        self.preload.write_text("""
const id = require.resolve(process.env.EDGE_TEST_VENDOR)
class EdgeTTS {
  async *streamAudio(text) {
    if (text === 'FAIL-PRIVATE-TEXT') throw new Error(text)
    const frame = Buffer.alloc(144)
    Buffer.from('fff364c0', 'hex').copy(frame)
    yield frame
  }
}
require.cache[id] = { id, loaded: true, exports: { EdgeTTS } }
""", encoding="utf-8")
        self.env = {**os.environ, "EDGE_TEST_VENDOR": str(ROOT / "vendor/edge-tts.cjs")}

    def request(self, text, output, voice=VOICE):
        request = {"op": "synthesize", "text": text, "voice": voice, "output": str(output)}
        return subprocess.run(["node", "--require", str(self.preload), str(WORKER)],
                              input=json.dumps(request, ensure_ascii=False), text=True,
                              encoding="utf-8", capture_output=True, env=self.env, timeout=10)

    def test_probe_only_reports_existing_dependency(self):
        # The parent adapter now owns dependency inspection. Inspect without a player.
        script = """import {createWindowsTtsAdapter} from './voice-tts.mjs';
            const adapter = createWindowsTtsAdapter({ platform:'win32', runner(){throw Error('unexpected playback')} });
            console.log(JSON.stringify(await adapter.inspect({checkPlayback:false,checkEdgeDependency:true})));"""
        result = subprocess.run(["node", "--input-type=module", "-e", script], cwd=ROOT,
                                text=True, encoding="utf-8", capture_output=True, check=True)
        self.assertEqual(json.loads(result.stdout)["edgeDependency"], "installed")
        self.assertFalse((self.root / "speech.mp3").exists())

    def test_synthesis_writes_only_requested_temporary_audio(self):
        path = self.root / "speech.mp3"
        result = self.request("你好", path)
        self.assertEqual(result.returncode, 0, result.stderr)
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
            self.assertFalse(path.exists())

    def test_exception_never_emits_private_text(self):
        result = self.request("FAIL-PRIVATE-TEXT", self.root / "speech.mp3")
        self.assertEqual(result.returncode, 1)
        self.assertNotIn("PRIVATE", result.stdout + result.stderr)
        self.assertEqual(json.loads(result.stdout)["code"], "EDGE_SYNTHESIS_FAILED")

    def test_existing_file_is_not_overwritten(self):
        path = self.root / "speech.mp3"
        path.write_bytes(b"keep")
        self.assertEqual(self.request("你好", path).returncode, 1)
        self.assertEqual(path.read_bytes(), b"keep")


if __name__ == "__main__":
    unittest.main()
