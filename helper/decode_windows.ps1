# Binary reply: little-endian sample rate and channel count (int32), then signed PCM16.
$ErrorActionPreference = 'Stop'
[Console]::InputEncoding = [Text.UTF8Encoding]::new($false)
try {
    $request = [Console]::In.ReadToEnd() | ConvertFrom-Json
    Add-Type -Path (Join-Path $PSScriptRoot 'whale_audio_windows.cs')
    [WhaleAudio.WindowsAudio]::WriteFilePcm($request.path, [Console]::OpenStandardOutput(), [int]$request.owner)
} catch {
    $failure = $_.Exception
    while ($failure.InnerException) { $failure = $failure.InnerException }
    if ($failure.Message -match '^AUDIO_[A-Z_]+$') { [Console]::Error.WriteLine($failure.Message) }
    exit 1
}
