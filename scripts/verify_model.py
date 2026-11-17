#!/usr/bin/env python3
"""Read-only local hash check. Never downloads, loads, moves or uploads a model."""
import argparse
import hashlib
import json
from pathlib import Path


def verify(manifest, model_id, directory, selected=None):
    models = [m for m in manifest['models'] if m.get('id') == model_id]
    if len(models) != 1:
        raise ValueError('Choose one exact model ID from the catalog')
    files = models[0]['files']
    if selected:
        wanted = set(selected)
        if wanted - {f['file'] for f in files}:
            raise ValueError('Selected file is not in this pinned model catalog')
        files = [f for f in files if f['file'] in wanted]
    results = []
    base = Path(directory).resolve(strict=True)
    for f in files:
        relative = Path(f['file'])
        if relative.is_absolute() or '..' in relative.parts:
            raise ValueError('Catalog file must stay within the selected directory')
        path = (base / relative).resolve()
        if not path.is_relative_to(base):
            raise ValueError('Model file symlink escapes the selected directory')
        if not path.is_file():
            results.append({'file': f['file'], 'status': 'missing'})
            continue
        h = hashlib.sha256()
        size = 0
        with path.open('rb') as stream:
            for block in iter(lambda: stream.read(1024 * 1024), b''):
                size += len(block)
                h.update(block)
        results.append({'file': f['file'], 'status': 'verified' if size == f['bytes'] and h.hexdigest() == f['sha256'] else 'mismatch'})
    return results


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('model_id')
    parser.add_argument('directory')
    parser.add_argument('--file', action='append', help='Select one or more Qwen main/mmproj files; otherwise checks all catalog files')
    parser.add_argument('--catalog', default=str(Path(__file__).resolve().parents[1] / 'model-catalog.json'))
    args = parser.parse_args()
    try:
        result = verify(json.loads(Path(args.catalog).read_text(encoding='utf-8')), args.model_id, args.directory, args.file)
        print(json.dumps({'files': result, 'runtimeCompatibilityVerified': False}, ensure_ascii=False, indent=2))
        return 0 if all(r['status'] == 'verified' for r in result) else 1
    except (OSError, ValueError, KeyError, TypeError) as error:
        print('Model verification failed: ' + str(error))
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
