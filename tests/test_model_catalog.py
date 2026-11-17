import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('verify_model', ROOT/'scripts/verify_model.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class ModelCatalogTests(unittest.TestCase):
    def test_pinned_sources_and_hashes(self):
        data = json.loads((ROOT/'model-catalog.json').read_text())
        for model in data['models']:
            self.assertTrue(model.get('license_urls'))
            for f in model['files']:
                self.assertRegex(f['sha256'], r'^[a-f0-9]{64}$')
                self.assertGreater(f['bytes'], 0)
                self.assertIn('Revision=', f['source_url'])
                self.assertNotIn('Revision=master', f['source_url'])
        self.assertFalse(data['speaker_verification']['enabled_by_default'])
    def test_read_only_success_missing_mismatch_and_selection(self):
        with tempfile.TemporaryDirectory() as d:
            path = Path(d)/'a.bin'; path.write_bytes(b'abc')
            catalog = {'models':[{'id':'test','files':[{'file':'a.bin','bytes':3,'sha256':hashlib.sha256(b'abc').hexdigest()},{'file':'b.bin','bytes':1,'sha256':'0'*64}]}]}
            self.assertEqual([r['status'] for r in module.verify(catalog,'test',d)],['verified','missing'])
            path.write_bytes(b'bad')
            self.assertEqual(module.verify(catalog,'test',d,['a.bin'])[0]['status'],'mismatch')
            self.assertEqual(path.read_bytes(), b'bad')
            with self.assertRaises(ValueError): module.verify(catalog,'test',d,['unknown.bin'])
    def test_no_path_escape(self):
        with tempfile.TemporaryDirectory() as d:
            with self.assertRaises(ValueError): module.verify({'models':[{'id':'test','files':[{'file':'../x'}]}]},'test',d)
