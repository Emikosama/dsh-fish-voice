"""Offline Edge helper protocol tests; fake edge_tts never contacts Microsoft."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

HELPER = Path(__file__).resolve().parents[1] / 'helper' / 'tts_edge.py'

class TtsEdgeTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        (self.root / 'edge_tts.py').write_text('''
class Communicate:
    def __init__(self, text, voice, connect_timeout, receive_timeout):
        self.text = text
    async def stream(self):
        if self.text == "FAIL-PRIVATE-TEXT":
            raise RuntimeError(self.text)
        yield {"type": "audio", "data": b"ID3FAKE-AUDIO"}
''')
        self.env = {**os.environ, 'PYTHONPATH': str(self.root)}
    def tearDown(self):
        self.directory.cleanup()
    def request(self, value):
        return subprocess.run([sys.executable, '-B', str(HELPER)], input=json.dumps(value, ensure_ascii=False), text=True, encoding='utf-8', capture_output=True, env=self.env, timeout=5)
    def test_probe_only_reports_existing_dependency(self):
        result = self.request({'op': 'inspect'})
        self.assertEqual(result.returncode, 0)
        self.assertEqual(json.loads(result.stdout), {'ok': True, 'available': True})
        self.assertFalse((self.root / 'speech.mp3').exists())
    def test_synthesis_writes_only_requested_temporary_audio(self):
        path = self.root / 'speech.mp3'
        result = self.request({'op': 'synthesize', 'text': '你好', 'voice': 'zh-CN-XiaoxiaoNeural', 'output': str(path)})
        self.assertEqual(result.returncode, 0, result.stdout)
        self.assertEqual(path.read_bytes(), b'ID3FAKE-AUDIO')
        self.assertNotIn('你好', result.stdout + result.stderr)
        # Windows stat mode bits do not represent POSIX permissions or verify ACLs.
        if os.name == 'posix':
            self.assertEqual(path.stat().st_mode & 0o777, 0o600)
    def test_protocol_uses_utf8_with_non_utf8_default_encoding(self):
        path = self.root / '语音.mp3'
        # Emulate the subprocess default on a CP1252 Windows installation.
        # The real helper must still receive UTF-8 text and the Unicode path.
        with patch('subprocess._text_encoding', return_value='cp1252') as default_encoding:
            result = self.request({'op': 'synthesize', 'text': '你好', 'voice': 'zh-CN-XiaoxiaoNeural', 'output': str(path)})
        default_encoding.assert_not_called()
        self.assertEqual(result.returncode, 0, result.stdout)
        self.assertEqual(json.loads(result.stdout), {'ok': True, 'synthesized': True})
        self.assertEqual(path.read_bytes(), b'ID3FAKE-AUDIO')
        self.assertNotIn('你好', result.stdout + result.stderr)
    def test_invalid_voice_or_oversize_text_never_writes(self):
        path = self.root / 'speech.mp3'
        for text, voice in [('hello', 'custom-unapproved-voice'), ('x' * 4001, 'zh-CN-XiaoxiaoNeural')]:
            result = self.request({'op': 'synthesize', 'text': text, 'voice': voice, 'output': str(path)})
            self.assertEqual(result.returncode, 1)
            self.assertFalse(path.exists())
    def test_exception_never_emits_private_text(self):
        result = self.request({'op': 'synthesize', 'text': 'FAIL-PRIVATE-TEXT', 'voice': 'zh-CN-XiaoxiaoNeural', 'output': str(self.root / 'speech.mp3')})
        self.assertEqual(result.returncode, 1)
        self.assertNotIn('PRIVATE', result.stdout + result.stderr)
        self.assertEqual(json.loads(result.stdout)['code'], 'EDGE_SYNTHESIS_FAILED')
    def test_existing_file_is_not_overwritten(self):
        path = self.root / 'speech.mp3'
        path.write_bytes(b'keep')
        result = self.request({'op': 'synthesize', 'text': 'hello', 'voice': 'zh-CN-XiaoxiaoNeural', 'output': str(path)})
        self.assertEqual(result.returncode, 1)
        self.assertEqual(path.read_bytes(), b'keep')

if __name__ == '__main__':
    unittest.main()
