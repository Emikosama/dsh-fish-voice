"""Generate the bundled ASR dictionary from the pinned local OpenCC sources."""

import argparse
import gzip
import hashlib
from pathlib import Path


SOURCE_HASHES = {
    "TSCharacters.txt": "737c21c66f55a419dd6956cb3089476cdefc5a36877452631617696df1e5d925",
    "TSPhrases.txt": "362fa1b9a7d6edd04b462a32e12c9fef3adae822ab1dee9c83561cc37c06cb1f",
    "STPhrases.txt": "f6eab5e5c6dd7640597878d3dfc6599ee1279d2bc91561eadd8e114194e2925a",
}


def read_dictionary(directory, name):
    raw = (directory / name).read_bytes()
    if hashlib.sha256(raw).hexdigest() != SOURCE_HASHES[name]:
        raise SystemExit(f"{name} differs from the pinned OpenCC source")
    rows = (line.split("\t", 1) for line in raw.decode("utf-8").splitlines()
            if line and not line.startswith("#"))
    return {key: values.split() for key, values in rows}


def build_dictionary(directory):
    characters = read_dictionary(directory, "TSCharacters.txt")
    changed = {key: values[0] for key, values in characters.items() if key != values[0]}
    ambiguous = {key for key in changed if key in characters[key]}
    # 麽 is also a spelling of 麼, used by Mandarin models for common words
    # such as 什麽. Keep OpenCC's first candidate and its lexical exceptions.
    ambiguous.discard("麽")
    words = {key: value for key, value in changed.items() if key not in ambiguous}
    phrases = read_dictionary(directory, "TSPhrases.txt")
    for key, values in phrases.items():
        if key == values[0] or any(char in changed for char in key):
            words[key] = values[0]

    # Recover known words such as 乾燥 without rewriting names such as 郭乾.
    # A reverse phrase must agree with the preferred t2s characters.
    for simplified, values in read_dictionary(directory, "STPhrases.txt").items():
        traditional = values[0]
        if (traditional not in phrases and traditional != simplified
                and any(char in ambiguous for char in traditional)
                and "".join(changed.get(char, char) for char in traditional) == simplified):
            words.setdefault(traditional, simplified)
    return words


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("dictionary_directory", type=Path)
    parser.add_argument("output", type=Path)
    options = parser.parse_args()
    dictionary = build_dictionary(options.dictionary_directory)
    content = "".join(f"{key}\t{dictionary[key]}\n" for key in sorted(dictionary))
    with options.output.open("wb") as output:
        with gzip.GzipFile(fileobj=output, mode="wb", filename="", mtime=0) as archive:
            archive.write(content.encode("utf-8"))
