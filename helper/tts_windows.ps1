# Windows process. Arguments contain no speech text; parent observes exit.
# Native media uses the same bounded, per-endpoint PCM player. Cancellation kills
# this process; Windows then releases its output handle and queued audio buffers.
$ErrorActionPreference = 'Stop'
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$exitCode = 0
try {
  # Bound the request before JSON parsing.
  $buffer = New-Object char[] 65537
  $length = 0
  while ($length -lt $buffer.Length) {
    $read = [Console]::In.Read($buffer, $length, $buffer.Length - $length)
    if ($read -eq 0) { break }
    $length += $read
  }
  if ($length -lt 2 -or $length -gt 65536) { throw 'invalid request size' }
  $request = (-join $buffer[0..($length - 1)]) | ConvertFrom-Json
  Add-Type -Path (Join-Path $PSScriptRoot 'whale_audio_windows.cs')

  if ($request.op -ceq 'play') {
    # JSON numbers only; do not coerce absent, string or boolean volume to zero.
    if ($null -eq $request.volume -or $request.volume -is [string] -or $request.volume -is [bool]) { throw 'invalid volume' }
    $volume = [double]$request.volume
    if ([double]::IsNaN($volume) -or [double]::IsInfinity($volume) -or $volume -lt 0 -or $volume -gt 1) { throw 'invalid volume' }
  } elseif ($request.op -cne 'inspect') { throw 'unsupported operation' }

  $explicitOutput = $null -ne $request.outputDevice
  if ($explicitOutput) {
    if ($request.outputDevice -isnot [pscustomobject] -or $request.outputDevice.backend -cne 'winmm' -or $request.outputDevice.id -isnot [string]) { throw [WhaleAudio.AudioException]::new('AUDIO_OUTPUT_DEVICE_INVALID') }
    [WhaleAudio.WindowsAudio]::ValidateOutput([string]$request.outputDevice.backend, [string]$request.outputDevice.id)
  }
  if ($request.op -ceq 'inspect') {
    if (-not $explicitOutput) { [WhaleAudio.WindowsAudio]::ValidateOutput([NullString]::Value, [NullString]::Value) }
    @{ ok = $true; playbackSupported = $true; filePlaybackSupported = [WhaleAudio.WindowsAudio]::DecoderAvailable() } | ConvertTo-Json -Compress
  } else {
    if ($request.path -isnot [string]) { throw 'invalid audio request' }
    $audio = [WhaleAudio.WindowsAudio]::Decode([WhaleAudio.WindowsAudio]::ReadAudioFile([string]$request.path))
    if ($explicitOutput) {
      [WhaleAudio.WindowsAudio]::Play($audio, $volume, [string]$request.outputDevice.backend, [string]$request.outputDevice.id)
    } else {
      [WhaleAudio.WindowsAudio]::PlayDefault($audio, $volume)
    }
    '{"ok":true,"completed":true}'
  }
} catch {
  # Return only a bounded allowlisted machine code. Exception messages may contain
  # private speech text, device identities, or local paths and must never be logged.
  $code = 'WINDOWS_TTS_FAILED'
  $errorObject = $_.Exception
  for ($depth = 0; $depth -lt 8 -and $null -ne $errorObject; $depth++) {
    if ($errorObject.GetType().FullName -eq 'WhaleAudio.AudioException' -and $errorObject.Code -match '^AUDIO_[A-Z_]{1,48}$') {
      $code = $errorObject.Code
      break
    }
    $errorObject = $errorObject.InnerException
  }
  @{ ok = $false; code = $code } | ConvertTo-Json -Compress
  $exitCode = 1
}
exit $exitCode
