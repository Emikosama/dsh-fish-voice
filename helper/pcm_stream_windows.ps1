# Dedicated one-shot streaming helper; no speech, PCM or native diagnostics on disk.
$ErrorActionPreference = 'Stop'
try {
  Add-Type -Path @((Join-Path $PSScriptRoot 'whale_audio_windows.cs'), (Join-Path $PSScriptRoot 'whale_pcm_stream_windows.cs'))
  [WhaleAudio.WindowsAudio]::PlayPcmStream([Console]::OpenStandardInput(), [Console]::Out)
  exit 0
} catch {
  # Do not emit exceptions: they may contain private device identities or paths.
  [Console]::Out.WriteLine('failed')
  exit 1
}
