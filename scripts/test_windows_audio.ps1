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

# Exercise the exact one-shot JSON process contract. Always use a missing
# explicit endpoint, so even a runner with speakers can never play the fixture.
function Invoke-HelperCheck($payload, $expectedCode) {
  $start = New-Object Diagnostics.ProcessStartInfo
  $start.FileName = Join-Path $PSHOME 'powershell.exe'
  $helper = Join-Path $root 'helper/tts_windows.ps1'
  $start.Arguments = '-NoLogo -NoProfile -NonInteractive -File "' + $helper + '"'
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
    $process.StandardInput.Write(($payload | ConvertTo-Json -Depth 5 -Compress))
    $process.StandardInput.Close()
    if (!$process.WaitForExit(30000)) { $process.Kill(); throw 'Native helper timeout' }
    $resultText = $stdout.Result
    $result = $resultText | ConvertFrom-Json
    if ($process.ExitCode -ne 1 -or $result.ok -ne $false -or $result.code -ne $expectedCode) { throw 'Native helper did not fail closed with the expected code' }
    if ($resultText -match 'private speech|private path|missing-endpoint' -or $stderr.Result.Length -ne 0) { throw 'Native helper exposed private error details' }
  } finally { $process.Dispose() }
}
$missing = @{ backend = 'winmm'; id = ('missing-endpoint-' + [Guid]::NewGuid().ToString('N')); name = 'Duplicate name' }
Invoke-HelperCheck @{ op = 'play'; volume = 0.5; path = 'C:\private path.wav'; outputDevice = $missing } 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE'
Invoke-HelperCheck @{ op = 'speak'; volume = 0.5; text = 'private speech'; voice = 'unknown'; outputDevice = $missing } 'WINDOWS_TTS_FAILED'
Invoke-HelperCheck @{ op = 'play'; volume = '0.5'; path = 'C:\private path.wav'; outputDevice = $missing } 'WINDOWS_TTS_FAILED'
Write-Output 'Native helper process contract checks passed'
