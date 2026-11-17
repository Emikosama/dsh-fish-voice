"""Rebuild bundled offline Mandarin data from the hash-pinned PyPI wheel.

Usage: python scripts/build_wake_pinyin.py /path/to/pypinyin-0.55.0-py2.py3-none-any.whl
This script does not download or execute the wheel.
"""
import gzip
import hashlib
import json
from pathlib import Path
import sys
import unicodedata
import zipfile

WHEEL_SHA256 = 'd53b1e8ad2cdb815fb2cb604ed3123372f5a28c6f447571244aca36fc62a286f'


def toneless(value):
    # Preserve ü (v), removing only Mandarin tone marks, not its diaeresis.
    value = ''.join(c for c in unicodedata.normalize('NFD', value)
                    if c not in '\u0300\u0301\u0304\u030c')
    return unicodedata.normalize('NFC', value).replace('ü', 'v')


def build(wheel, destination):
    raw = Path(wheel).read_bytes()
    if hashlib.sha256(raw).hexdigest() != WHEEL_SHA256:
        raise ValueError('Unexpected pypinyin wheel hash')
    with zipfile.ZipFile(wheel) as archive:
        chars = {chr(int(k)): toneless(v.split(',')[0]) for k, v in
                 json.loads(archive.read('pypinyin/pinyin_dict.json')).items()}
        phrases = {k: [toneless(x[0]) for x in v] for k, v in
                   json.loads(archive.read('pypinyin/phrases_dict.json')).items()}
        # Keep only phrase readings that differ from per-character defaults.
        phrases = {k: v for k, v in phrases.items() if len(k) >= 2 and
                   any(chars.get(c) != s for c, s in zip(k, v))}
        groups = {}
        for char, syllable in sorted(chars.items()):
            groups[syllable] = groups.get(syllable, '') + char
        payload = json.dumps({'characters': groups, 'phrases': phrases},
                             ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode('utf-8')
        destination.mkdir(parents=True, exist_ok=True)
        (destination / 'wake_pinyin.json.gz').write_bytes(gzip.compress(payload, compresslevel=9, mtime=0))
        (destination / 'wake_pinyin.LICENSE').write_bytes(
            archive.read('pypinyin-0.55.0.dist-info/licenses/LICENSE.txt'))
        print(f'{len(chars)} characters, {len(phrases)} phrase overrides, '
              f'{len(payload)} raw bytes, {(destination / "wake_pinyin.json.gz").stat().st_size} gzip bytes')


if __name__ == '__main__':
    build(sys.argv[1], Path(__file__).resolve().parents[1] / 'helper')
