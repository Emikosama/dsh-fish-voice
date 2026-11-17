# Native decoder fixture

`tone.mp3` is a generated 880 Hz sine tone, not recorded speech. It is used only
for in-memory Media Foundation decoder tests. The tests do not play this file.

Generated with FFmpeg:

```
ffmpeg -f lavfi -i 'sine=frequency=880:sample_rate=24000:duration=0.12' \
  -ac 1 -codec:a libmp3lame -b:a 48k -map_metadata -1 -write_xing 0 tone.mp3
```

The WAV fixtures are generated in memory by the regression test. No microphone,
network, system-default-device change, or speaker output is needed.
