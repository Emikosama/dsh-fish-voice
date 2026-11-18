# Run with Windows PowerShell 5.1, the same runtime used by the production helper.
# Compiles actual production C#, decodes actual WAV/MP3, never opens a speaker.
param([switch]$ManagedOnly)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root 'helper/whale_audio_windows.cs'
$tests = Join-Path $root 'tests/windows_audio_native_tests.cs'
Add-Type -Path @($source, $tests)
[WindowsAudioNativeTests]::RunManaged()
if ($ManagedOnly) { return }
[WindowsAudioNativeTests]::RunNative((Join-Path $root 'tests/fixtures/native-audio/tone.mp3'))

# Exercise the exact JSON process contracts. Requests either stop before
# playback or select an endpoint that cannot be opened.
function Invoke-NativeHelper($requests, [switch]$EdgeStream) {
  $start = New-Object Diagnostics.ProcessStartInfo
  $start.FileName = Join-Path $PSHOME 'powershell.exe'
  $helper = Join-Path $root 'helper/tts_windows.ps1'
  $start.Arguments = '-NoLogo -NoProfile -NonInteractive -ExecutionPolicy Bypass -File "' + $helper + '"'
  if ($EdgeStream) { $start.Arguments += ' -EdgeStream' }
  $start.UseShellExecute = $false
  $start.CreateNoWindow = $true
  $start.RedirectStandardInput = $true
  $start.RedirectStandardOutput = $true
  $start.RedirectStandardError = $true
  $process = New-Object Diagnostics.Process
  $process.StartInfo = $start
  try {
    [void]$process.Start()
    $stdout = $process.StandardOutput.ReadToEndAsync()
    $stderr = $process.StandardError.ReadToEndAsync()
    foreach ($request in $requests) { $process.StandardInput.WriteLine(($request | ConvertTo-Json -Depth 5 -Compress)) }
    $process.StandardInput.Close()
    if (!$process.WaitForExit(30000)) { $process.Kill(); throw 'Native helper timeout' }
    $resultText = $stdout.Result
    if ($resultText -match 'private speech|private path|missing-endpoint' -or $stderr.Result.Length -ne 0) { throw 'Native helper exposed private error details' }
    $rows = @($resultText -split '[\r\n]+' | Where-Object { $_ } | ForEach-Object { $_ | ConvertFrom-Json })
    return @{ exitCode = $process.ExitCode; rows = $rows }
  } finally { $process.Dispose() }
}
function Assert-HelperFailure($result, $expectedCode) {
  if ($result.exitCode -ne 1 -or $result.rows.Count -ne 1 -or $result.rows[0].ok -ne $false -or $result.rows[0].code -ne $expectedCode) {
    throw ('Native helper expected ' + $expectedCode + ', got exit=' + $result.exitCode + ', code=' + $result.rows[0].code)
  }
}
$missing = @{ backend = 'winmm'; id = ('missing-endpoint-' + [Guid]::NewGuid().ToString('N')); name = 'Duplicate name' }
Assert-HelperFailure (Invoke-NativeHelper @{ op = 'play'; volume = 0.5; path = 'C:\private path.wav'; outputDevice = $missing }) 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE'
Assert-HelperFailure (Invoke-NativeHelper @{ op = 'speak'; volume = 0.5; text = 'private speech'; voice = 'unknown'; outputDevice = $missing }) 'WINDOWS_TTS_FAILED'
Assert-HelperFailure (Invoke-NativeHelper @{ op = 'play'; volume = '0.5'; path = 'C:\private path.wav'; outputDevice = $missing }) 'WINDOWS_TTS_FAILED'
Assert-HelperFailure (Invoke-NativeHelper @{ op = 'edge-start'; volume = 0.5; outputDevice = $missing } -EdgeStream) 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE'

# Check the system-default route without opening it, including headless runners
# where validation must return unavailable instead of rejecting the null device.
$defaultAvailable = $true
try { [WhaleAudio.WindowsAudio]::ValidateOutput([NullString]::Value, [NullString]::Value) }
catch {
  if ($_.Exception.InnerException.Code -ne 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE') { throw }
  $defaultAvailable = $false
}
$defaultOutput = Invoke-NativeHelper @(@{ op = 'edge-start'; volume = 0.5; outputDevice = $null }, @{ op = 'edge-end' }) -EdgeStream
if ($defaultAvailable) {
  if ($defaultOutput.exitCode -ne 0 -or $defaultOutput.rows.Count -ne 2 -or !$defaultOutput.rows[0].ready -or !$defaultOutput.rows[1].completed) {
    throw ('Default output did not initialize and end the Edge player: ' + $defaultOutput.rows[0].code)
  }
} else { Assert-HelperFailure $defaultOutput 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE' }
Write-Output 'Native helper process contract checks passed'
