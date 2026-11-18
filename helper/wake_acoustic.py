"""Stdlib client and Mandarin keyword tokenization for the local wake detector."""

import base64
from functools import lru_cache
import json
import os
import unicodedata
import urllib.parse
import urllib.request


_TONE_MARKS = "\u0304\u0301\u030c\u0300"
_INITIALS = ("zh", "ch", "sh") + tuple("bpmfdtnlgkhjqxrzcswy")
_SAMPLE_RATE = 16000
_CLOSE_INITIALS = (("z", "zh"), ("c", "ch"), ("s", "sh"))
_CLOSE_FINALS = (("an", "ang"), ("en", "eng"), ("in", "ing"))


def toneless(syllable):
    """Keep the distinction between ü and u when discarding tone marks."""
    value = "".join(c for c in unicodedata.normalize("NFD", syllable) if c not in _TONE_MARKS)
    return unicodedata.normalize("NFC", value)


def _with_tone(syllable, tone):
    for preferred in ("a", "e", "ou"):
        position = syllable.find(preferred)
        if position >= 0:
            break
    else:
        position = max((i for i, c in enumerate(syllable) if c in "aeiouü"), default=-1)
    if position < 0:
        return syllable
    return unicodedata.normalize("NFC", syllable[:position + 1] + tone + syllable[position + 1:])


def _phones(syllables):
    phones = []
    for syllable in syllables:
        initial = next((x for x in _INITIALS if syllable.startswith(x) and len(syllable) > len(x)), "")
        if initial:
            phones.append(initial)
        phones.append(syllable[len(initial):])
    return tuple(phones)


def nearby_syllables(syllable):
    for flat, curled in _CLOSE_INITIALS:
        if syllable.startswith(curled):
            yield flat + syllable[len(curled):]
        elif syllable.startswith(flat):
            yield curled + syllable[len(flat):]
    for front, back in _CLOSE_FINALS:
        if syllable.endswith(back):
            yield syllable[:-len(back)] + front
        elif syllable.endswith(front):
            yield syllable[:-len(front)] + back


@lru_cache(maxsize=32)
def candidates(readings):
    """Each named alias gets a canonical pronunciation and bounded tonal variants."""
    canonical, similar, variants = {}, {}, {}
    for index, syllables in enumerate(readings):
        if not syllables or not 2 <= len(syllables) <= 10:
            continue
        canonical.setdefault(_phones(syllables), {"id": index, "variant": False})
        if len(syllables) < 3:
            continue
        for position, syllable in enumerate(syllables):
            base = toneless(syllable)
            mark = next((ch for ch in unicodedata.normalize("NFD", syllable) if ch in _TONE_MARKS), "")
            for neighbor in nearby_syllables(base):
                changed = _with_tone(neighbor, mark)
                phones = _phones(syllables[:position] + (changed,) + syllables[position + 1:])
                similar.setdefault(phones, {"id": index, "variant": True})
            for tone in _TONE_MARKS:
                changed = _with_tone(base, tone)
                if changed != syllable:
                    phones = _phones(syllables[:position] + (changed,) + syllables[position + 1:])
                    variants.setdefault(phones, {"id": index, "variant": True})
    rows = [{"phones": phones, **row} for phones, row in canonical.items()]
    rows.extend({"phones": phones, **row} for phones, row in {**similar, **variants}.items() if phones not in canonical)
    rows = rows[:72]
    while rows:
        encoded = base64.b64encode(json.dumps(rows, ensure_ascii=False, separators=(",", ":")).encode("utf-8")).decode("ascii")
        if len(encoded) <= 12000:
            return encoded
        rows.pop()
    return None


def binding(pcm):
    return pcm.binding_from_env({
        "WHALE_ASR_WASM_URL": os.environ.get("WHALE_WAKE_URL"),
        "WHALE_ASR_WASM_TOKEN": os.environ.get("WHALE_WAKE_TOKEN"),
    })


def _request(pcm, endpoint, data=None, phones=None):
    configured = binding(pcm)
    if configured is None:
        return None
    url, token = configured
    url = urllib.parse.urlsplit(url)._replace(path=endpoint, query="").geturl()
    headers = {"Authorization": "Bearer " + token}
    if data is not None:
        headers.update({"Content-Type": "application/octet-stream", "X-Wake-Keywords": phones})
    request = urllib.request.Request(url, headers=headers, data=data)
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), pcm._NoRedirect())
    try:
        with opener.open(request, timeout=3.5 if data is not None else 0.25) as response:
            payload = response.read(1025)
        result = json.loads(payload)
        return result if len(payload) <= 1024 and isinstance(result, dict) else None
    except (OSError, ValueError):
        return None


def ready(pcm):
    return (_request(pcm, "/status") or {}).get("state") == "ready"


def detect(pcm, audio, phones):
    """Return availability and the match from the first five seconds of audio."""
    if not phones or binding(pcm) is None:
        return False, None
    body = pcm._pcm_bytes(audio[:5 * _SAMPLE_RATE])
    result = _request(pcm, "/wake", body, phones)
    if not result or result.get("supported") is not True:
        return False, None
    match = result.get("match")
    if not isinstance(match, dict):
        return True, None
    index, start, end = (match.get(key) for key in ("id", "startMs", "endMs"))
    if any(type(value) is not int for value in (index, start, end)) or not (0 <= index < 8 and 0 <= start < end <= 5080):
        return True, None
    return True, (index, start, end)
