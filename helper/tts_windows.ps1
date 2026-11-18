param([switch]$EdgeStream)
# Windows process. Arguments contain no speech text; parent observes exit.
# Native media uses the same bounded, per-endpoint PCM player. Cancellation kills
# this process; Windows then releases its output handle and queued audio buffers.
$ErrorActionPreference = 'Stop'
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$script:audioPath = Join-Path $PSScriptRoot 'whale_audio_windows.cs'
if ($EdgeStream) {
  $edgeExitCode = 0
  try {
    Add-Type -Path $script:audioPath
    $ready = $false
    $outputBackend = $null
    $outputId = $null
    $volume = 0.8
    while ($true) {
      $line = [Console]::In.ReadLine()
      if ($null -eq $line) { break }
      if ($line.Length -lt 2 -or $line.Length -gt 8192) { throw 'invalid request size' }
      $request = $line | ConvertFrom-Json
      if (-not $ready) {
        if ($request.op -cne 'edge-start') { throw 'invalid start request' }
        if ($null -eq $request.volume -or $request.volume -is [string] -or $request.volume -is [bool]) { throw 'invalid volume' }
        $volume = [double]$request.volume
        if ([double]::IsNaN($volume) -or [double]::IsInfinity($volume) -or $volume -lt 0 -or $volume -gt 1) { throw 'invalid volume' }
        if (-not [WhaleAudio.WindowsAudio]::DecoderAvailable()) { throw 'decoder unavailable' }
        if ($null -ne $request.outputDevice) {
          if ($request.outputDevice -isnot [pscustomobject] -or $request.outputDevice.backend -cne 'winmm' -or $request.outputDevice.id -isnot [string]) { throw 'invalid output device' }
          $outputBackend = [string]$request.outputDevice.backend
          $outputId = [string]$request.outputDevice.id
          [WhaleAudio.WindowsAudio]::ValidateOutput($outputBackend, $outputId)
        } else {
          # PowerShell coerces untyped $null to an empty CLR string.
          [WhaleAudio.WindowsAudio]::ValidateOutput([NullString]::Value, [NullString]::Value)
        }
        $ready = $true
        [Console]::Out.WriteLine('{"ok":true,"ready":true}')
        continue
      }
      if ($request.op -ceq 'edge-play') {
        if ($request.path -isnot [string]) { throw 'invalid audio request' }
        $audio = [WhaleAudio.WindowsAudio]::Decode([WhaleAudio.WindowsAudio]::ReadAudioFile([string]$request.path))
        if ($null -ne $outputBackend) {
          [WhaleAudio.WindowsAudio]::Play($audio, $volume, $outputBackend, $outputId)
        } else {
          [WhaleAudio.WindowsAudio]::PlayDefault($audio, $volume)
        }
        [Console]::Out.WriteLine('{"ok":true,"played":true}')
        continue
      }
      if ($request.op -ceq 'edge-end') {
        [Console]::Out.WriteLine('{"ok":true,"completed":true}')
        break
      }
      throw 'unsupported operation'
    }
    if (-not $ready) { throw 'missing start request' }
  } catch {
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
    $edgeExitCode = 1
  }
  exit $edgeExitCode
}
$exitCode = 0
try {
  # Bound the request before JSON parsing (speech text is further limited below).
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

  if ($request.op -eq 'voices') {
    $decoderSupported = [WhaleAudio.WindowsAudio]::DecoderAvailable()
    @{ ok = $true; systemSupported = $false; edgePlaybackSupported = $decoderSupported; voices = @() } | ConvertTo-Json -Depth 4 -Compress
  } elseif ($request.op -eq 'play') {
    # JSON numbers only; do not coerce absent, string or boolean volume to zero.
    if ($null -eq $request.volume -or $request.volume -is [string] -or $request.volume -is [bool]) { throw 'invalid volume' }
    $volume = [double]$request.volume
    if ([double]::IsNaN($volume) -or [double]::IsInfinity($volume) -or $volume -lt 0 -or $volume -gt 1) { throw 'invalid volume' }
    $explicitOutput = $null -ne $request.outputDevice
    if ($explicitOutput) {
      if ($request.outputDevice -isnot [pscustomobject] -or $request.outputDevice.backend -cne 'winmm' -or $request.outputDevice.id -isnot [string]) { throw 'invalid output device' }
      [WhaleAudio.WindowsAudio]::ValidateOutput([string]$request.outputDevice.backend, [string]$request.outputDevice.id)
    }

    if ($request.path -isnot [string]) { throw 'invalid audio request' }
    $audio = [WhaleAudio.WindowsAudio]::Decode([WhaleAudio.WindowsAudio]::ReadAudioFile([string]$request.path))
    if ($explicitOutput) {
      [WhaleAudio.WindowsAudio]::Play($audio, $volume, [string]$request.outputDevice.backend, [string]$request.outputDevice.id)
    } else {
      [WhaleAudio.WindowsAudio]::PlayDefault($audio, $volume)
    }
    '{"ok":true,"completed":true}'
  } else { throw 'unsupported operation' }
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
