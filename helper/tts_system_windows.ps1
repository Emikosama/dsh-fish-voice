# Windows PowerShell 5.1 accesses installed OneCore and desktop SAPI voices.
# The speech text is plain UTF-8 JSON on stdin. No cloud service is called.
$ErrorActionPreference = 'Stop'
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$code = 'TTS_SYSTEM_UNAVAILABLE'
$synth = $null
$sapi = $null
$stream = $null
$wave = $null
$player = $null
try {
  $request = ConvertFrom-Json -InputObject ([Console]::In.ReadToEnd())
  $voices = @()
  $defaultId = $null
  try {
    $synthType = [Windows.Media.SpeechSynthesis.SpeechSynthesizer, Windows.Media.SpeechSynthesis, ContentType=WindowsRuntime]
    $voices += @(foreach ($voice in $synthType::AllVoices) {
      [pscustomobject]@{ id = $voice.Id; name = $voice.DisplayName; language = $voice.Language; oneCore = $voice }
    })
    $defaultId = $synthType::DefaultVoice.Id
  } catch {
    # OneCore registration can be missing on stripped-down Windows images.
    $defaultId = $null
  }
  try {
    Add-Type -AssemblyName System.Speech
    $sapi = [System.Speech.Synthesis.SpeechSynthesizer]::new()
    if ($null -eq $defaultId) { $defaultId = $sapi.Voice.Id }
    $voices += @(foreach ($installed in $sapi.GetInstalledVoices()) {
      if ($installed.Enabled) {
        $voice = $installed.VoiceInfo
        # Some Windows images leave voice tokens registered without their engine.
        try {
          $sapi.SelectVoice($voice.Name)
          if ($sapi.Voice.Id -ceq $voice.Id) {
            [pscustomobject]@{ id = $voice.Id; name = $voice.Name; language = $voice.Culture.Name }
          }
        } catch {}
      }
    })
  } catch {
    # SAPI is optional when OneCore is present.
  }
  $defaultVoice = $voices | Where-Object { $_.id -ceq $defaultId } | Select-Object -First 1
  if ($request.op -ceq 'inspect') {
    $response = @{ ok = $true; systemVoices = @($voices | Select-Object id, name, language); systemDefaultVoiceId = $defaultVoice.id }
  } elseif ($request.op -cin 'speak', 'synthesize') {
    if (!$voices.Count) { $code = 'TTS_SYSTEM_NO_VOICES'; throw 'no installed voices' }
    if ($request.text -isnot [string] -or [string]::IsNullOrWhiteSpace($request.text) -or $request.text.Length -gt 4000) { throw 'invalid speech text' }

    $text = $request.text
    $selectedVoice = $defaultVoice
    if ($request.systemVoiceId) {
      $selectedVoice = $voices | Where-Object { $_.id -ceq $request.systemVoiceId } | Select-Object -First 1
      if ($null -eq $selectedVoice) { $code = 'TTS_SYSTEM_VOICE_UNAVAILABLE'; throw 'voice is not installed' }
    } elseif ($request.preferChinese -eq $true -and $defaultVoice.language -notmatch '^zh(?:-|$)') {
      $chineseVoice = $voices | Where-Object { $_.language -match '^zh(?:-|$)' } | Select-Object -First 1
      if ($chineseVoice) { $selectedVoice = $chineseVoice }
    }
    if ($null -eq $selectedVoice) { $selectedVoice = $voices[0] }
    if ($request.preview -eq $true) {
      if ($selectedVoice.language -match '^en(?:-|$)') {
        $text = 'Hello, this is a preview of your system voice.'
      } elseif ($selectedVoice.language -notmatch '^zh(?:-|$)') {
        $text = [System.Globalization.CultureInfo]::GetCultureInfo($selectedVoice.language).NativeName
      }
    }

    $direct = $request.op -ceq 'speak'
    $volume = if ($direct) { [double]$request.volume } else { 1.0 }
    if ($selectedVoice.oneCore) {
      # Load the framework's WinRT adapter without compiling any code.
      Add-Type -AssemblyName System.Runtime.WindowsRuntime
      $streamType = [Windows.Media.SpeechSynthesis.SpeechSynthesisStream, Windows.Media.SpeechSynthesis, ContentType=WindowsRuntime]
      $asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
        $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetGenericArguments().Length -eq 1 -and
          $_.GetParameters().Length -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
      } | Select-Object -First 1
      $synth = $synthType::new()
      $synth.Voice = $selectedVoice.oneCore
      $synth.Options.AudioVolume = $volume
      $pending = $synth.SynthesizeTextToStreamAsync($text)
      $task = $asTask.MakeGenericMethod($streamType).Invoke($null, @($pending))
      $stream = $task.GetAwaiter().GetResult()
      $wave = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($stream)
      if ($direct) {
        $code = 'TTS_SYSTEM_PLAYBACK_FAILED'
        $player = [System.Media.SoundPlayer]::new($wave)
        $player.PlaySync()
      } else {
        $file = [System.IO.File]::Open($request.path, [System.IO.FileMode]::CreateNew, [System.IO.FileAccess]::Write)
        try { $wave.CopyTo($file) } finally { $file.Dispose() }
      }
    } else {
      $sapi.SelectVoice($selectedVoice.name)
      if ($sapi.Voice.Id -cne $selectedVoice.id) { $code = 'TTS_SYSTEM_VOICE_UNAVAILABLE'; throw 'voice did not resolve' }
      $sapi.Volume = [int][Math]::Round($volume * 100)
      if ($direct) {
        $code = 'TTS_SYSTEM_PLAYBACK_FAILED'
        $sapi.SetOutputToDefaultAudioDevice()
        $sapi.Speak($text)
      } else {
        $file = [System.IO.File]::Open($request.path, [System.IO.FileMode]::CreateNew, [System.IO.FileAccess]::Write)
        try {
          $sapi.SetOutputToWaveStream($file)
          $sapi.Speak($text)
          $sapi.SetOutputToNull()
        } finally { $file.Dispose() }
      }
    }
    $response = @{ ok = $true; completed = $true; systemVoiceId = $selectedVoice.id }
  } else { throw 'unsupported operation' }
  [Console]::WriteLine(($response | ConvertTo-Json -Compress -Depth 4))
} catch {
  # Keep local paths and speech text out of subprocess errors.
  [Console]::WriteLine((@{ ok = $false; code = $code } | ConvertTo-Json -Compress))
  exit 1
} finally {
  if ($null -ne $player) { $player.Dispose() }
  if ($null -ne $wave) { $wave.Dispose() }
  elseif ($null -ne $stream) { $stream.Dispose() }
  if ($null -ne $synth) { $synth.Dispose() }
  if ($null -ne $sapi) { $sapi.Dispose() }
}
