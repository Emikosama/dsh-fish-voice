# Same compiler/runtime as production. Invalid headers only: never opens speakers.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Add-Type -Path @((Join-Path $root 'helper/whale_audio_windows.cs'), (Join-Path $root 'helper/whale_pcm_stream_windows.cs'), (Join-Path $root 'tests/windows_pcm_stream_tests.cs'))
[WindowsPcmStreamTests]::Run()
