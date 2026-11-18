# Edge, managed local TTS and text replies

Speech playback uses the Windows native media helper.
Managed local TTS is installed through the separate model installer. Installing/loading the plugin itself does not
install Python packages or voices, contact Microsoft, scan chat history, subscribe
assistant text to a speech service, open a microphone, or play audio.

## Runtime choices and privacy

`tts` in the existing configuration file has exactly these fields:

```json
{
  "provider": "unconfigured",
  "edgeVoice": "zh-CN-XiaoyiNeural",
  "systemVoice": null,
  "systemFallback": false,
  "edgeTextTransmissionAccepted": false,
  "volume": 0.8,
  "localModelId": null,
  "localModelPath": null
}
```

Providers are `unconfigured`, `edge`, `local`, and `off`. The first-run wizard
preselects Edge Xiaoyi. Selecting “启用在线朗读并继续” saves the choice and the
Microsoft text-transmission acknowledgement. A legacy `system` selection
resolves to `off` and the obsolete system settings are cleared on save. The voice-root whitelist selects
`whale_voice_speak` and the other four permitted voice tools. The tool checks the exact live
voice Agent, active root, authorization epoch, and grant. Other sessions and
workers cannot invoke it, even though its definition is registered globally.
For `unconfigured` and `off`, the voice tool returns `textOnly: true` with playback and acoustic confirmation both false. The projected reply text appears in Whale's panel.

The wizard discloses Microsoft text transmission next to the Edge choice. The
owner confirms with the explicit enable button; the settings page uses a save
action after showing the same disclosure. `edgeTextTransmissionAccepted: true`
is required before Edge use. This choice **does not override** separate
confirmation requirements for sensitive personal information. Do not interpret
it as permission to upload arbitrary chat history, files, microphones, voiceprints,
or content from unrelated sessions. Only the tool's explicit text is synthesized.
Do not configure this value from a model/tool or inferred consent.

The packaged Edge worker uses the curated voice IDs and bundled Node client in
a killable subprocess. The host validates consent before starting network
synthesis. Native playback starts after synthesis succeeds and the output file
has passed size checks.

A confirmed pre-playback Edge failure yields a text-only reply. Cancellation
and uncertain termination remain distinct outcomes: exit must be observed, and
unconfirmed termination blocks new playback until host restart. The voice
session keeps the requested reply text in Whale’s panel. Completion indicates
the player’s acknowledgement, with acoustic confirmation remaining false.

Synthesized MP3 is held in a private temporary directory, bounded at 10 MiB, and
removed after the operation. Text travels on subprocess stdin, not command-line
arguments, and stderr is drained without logging or returning it. A host crash
may leave an OS temp file; production hardening needs recovery cleanup and
Windows filesystem/antivirus testing. The existing host may persist the tool
call text as ordinary chat history. This adapter does not introduce a second
text log. It does not promise suppression of unrelated host/provider logging.

## Human command contract

The existing `whale-ear-ui` native command still has `recordInput: false`.
It accepts only the listed fields. Native invocation supplies the exact Agent
and AbortSignal; a request cannot forge either. Results use the existing envelope:
`{ protocol: 1, action, value }`. Failure is the existing error result and a
bounded safe message, with `[TTS_CODE]` when applicable.

- `read-settings`: adds `ttsSetup`,
  `onboarding: { version: 1, completed: boolean }`, and `ttsRuntime` (below).
  Its SHA-256 `revision` covers all existing settings, TTS, onboarding and the
  source file, so old settings writes cannot silently overwrite a new consent.
- `inspect-tts`: no request fields. Only local discovery, no speech/network.
  Returns `{ platform, playbackSupported, systemSupported, edgePlaybackSupported,
  edgeDependency: 'installed'|'missing'|'unchecked', installedChineseVoices: [], reason: string|null, edgeOfficialApi:false,
  edgeRecipient:'Microsoft', edgePurpose:'speech-synthesis', autoDownload:false,
  gpuSupported:false, executionTargets:{edge:'microsoft-service',local:...} }`.
  This is component discovery, **not a live Edge reachability test**.
- `save-tts`: `{ revision, values: ttsSetup }`. Validates all fields and consent,
  uses stopped-only compare-and-swap, atomically saves only `tts`, then returns
  a fresh `read-settings` result. There is no auto-apply download or speech.
- `complete-setup`: `{ revision }`. Same stopped-only CAS; rejects
  `provider:'unconfigured'`. An explicit `off` choice is valid. Saves only
  `onboarding.version=1, completed=true`, returns `read-settings`. Completion
  means the user finished choosing; it does **not** mean ASR/models are installed
  or TTS has passed a real hardware test. Closing/dismissing UI must not call it.
- `preview-tts`: no request fields. Reads saved settings and speaks only the
  fixed public text `你好，我是鱼应。这是一段语音试听。`. Arbitrary `text` is
  rejected at the human gateway. A completed preview returns `playbackCompleted:true`. A confirmed Edge failure
  before playback returns `textOnly:true, playbackCompleted:false` with a bounded
  reason. Both return `acousticConfirmation:false`.
  Use the command's AbortSignal on UI close/navigation; never fake cancellation
  merely by dropping the response.
- `cancel-tts`: no request fields. Waits for the owned process to finish and
  returns `{status:'idle'|'cancelled'|'unconfirmed'}`. `unconfirmed` must keep
  controls locked and ask for host restart, not invite automatic retry.

`save-tts`, `complete-setup`, and `preview-tts` require all of:
`voiceControlBusy=false`, `enabled=false`, `ownerSessionId=null`, live control
owner null, voice root `id=null` and `fullyStopped=true`; TTS must not be busy or
blocked. They never implicitly stop a worker, revoke a grant, or alter history.
`inspect-tts` is read-only; `cancel-tts` is separately available to stop preview.
Do not retry any configuration mutation after an uncertain command outcome;
read back first using the existing UI controller's unknown-outcome discipline.

`status` also returns `ttsRuntime`, so uncertainty remains visible outside settings.
Enabling/changing the active voice root waits for confirmed TTS shutdown; an
unconfirmed process cannot be bypassed by opening a new voice session.

`ttsRuntime` has `{state,provider,fallback,reason,at,busy,blocked,inspected}`.
States include `idle`, `preparing`, `synthesizing`, `playback-requested`, `text-only`,
`completed`, `cancelled`, `failed`, and `blocked`. No start state claims a speaker
has audibly begun. The existing conversation projection retains
`playbackConfirmed:false`. The old dsh-speak volume slider is disabled for the new
providers; their independent 0–1 volume is saved within TTS settings.

Important failure codes include `TTS_CONSENT_REQUIRED`, `TTS_NOT_CONFIGURED`,
`TTS_VOICE_ACTIVE`, `TTS_BUSY`, `TTS_CONFIG_CHANGED`, `TTS_PLATFORM_UNSUPPORTED`,
`TTS_EDGE_DEPENDENCY_MISSING`, `TTS_EDGE_PLAYBACK_UNAVAILABLE`,
`TTS_TIMEOUT`, `TTS_CANCELLED`,
`TTS_TERMINATION_UNCONFIRMED`, `TTS_COMPLETION_UNCONFIRMED`, and `TTS_BLOCKED`.
Ordinary revision conflicts retain existing bridge wording.

## CPU / GPU / onboarding

Edge synthesis runs at Microsoft’s service. GPU capability describes only a
verified local model runtime. A future local model
provider needs its own model manifest, runtime, hardware probe, download consent,
integrity verification and measured load-placement state. The independent model
installer owns those contracts and must not auto-install this TTS dependency.

## Verification / limitations

Run `node --test tests/test_voice_tts.mjs tests/test_voice_ui_bridge.mjs` plus
`npm test`. Published package verification uses the existing isolated
`tests/host/published-rc1` harness and `single-package.spec.mjs`, which installs the
actual npm tarball into a disposable profile and mounts through the published
DSH 0.2.2-rc.1 Loader. It does not use the user's device or account.

Offline tests cover explicit consent, static preview, local-only inspection,
Edge text fallback, legacy system retirement, no replay after possible partial
playback, busy/double-click, caller identity, stale settings, full-stop gates,
cancellation, timeout, unconfirmed exit and secret-free errors. Production
bridge/core regression tests cover tool isolation and explicit `off` routing.

**Not verified here:** actual Windows SAPI/WPF codecs and sound output, packaged
PowerShell execution-policy environments, Microsoft network compatibility/rate
limits, edge-tts installed-version compatibility, acoustic latency/quality,
Windows process-kill behavior, and temporary-file recovery after a host crash.
Linux reports unsupported instead of launching a different synthesizer. Do not
ship UI text claiming those paths are fully tested or always available.


## Managed local engines

Local provider settings identify a managed model, never an executable or shell
command. Host integration supplies `resolveManagedLocalTts(config)`; this trusted
resolver must validate pinned installer paths and hashes before returning one of:

- Qwen: `{ engine: 'llama-qwen3', modelId, executable, model, mmproj }`.
- Melo: `{ engine: 'sherpa-melo', modelId, directory, modulePath }`.

Qwen invokes the pinned official `llama-tts` binary directly with CPU-only flags,
`--offline`, `--no-escape`, and `-f` for a private temporary prompt file. The
prompt is never placed in command-line arguments. No reference voice is uploaded
or used. This Base-model path does not claim CustomVoice presets or voice cloning.
The CLI's frame-limit exit can still be success; the adapter rejects a missing
completion counter or a generation that reaches its 2048-frame cap instead of
playing potentially truncated output. Text/audio are removed after completion or
cancellation. The CPU deadline is 300 seconds, with observed process exit required.

Melo uses the normal host package loader to resolve `sherpa-onnx-node`, not copied
host SDK files or guessed ASAR paths. Native model loading and generation run in a
separate one-shot Node process. It receives text on stdin, loads only bounded
model/dictionary assets, and generates a mono PCM WAV. The process runs with
`ELECTRON_RUN_AS_NODE=1` when the host executable is Electron. Missing dependency
fails closed. Melo is a separate lower-resource option, not an equivalent Qwen
voice or a silent replacement.

`inspect()` never synthesizes or plays a sample. `ready` means verified local
artifacts/dependencies were found, not that inference has succeeded. An explicit
`verifyLocalTts()` performs fixed public text synthesis without playback and can
be cancelled through `cancel()`. A successful one-shot probe reports `synthesisVerified: true` and
`modelResident: false`; the native process has exited. Qwen probe success is cached against the current
artifact paths, sizes and modification times, with manifest verification still
owned by the resolver. Ordinary speech loads the chosen engine once per request.
No local failure silently switches to Windows or an online provider.

Generated WAVs are validated for RIFF layout, mono PCM/float format, sample rate,
byte rate, alignment, nonempty audio and a maximum five-minute duration before
Windows WPF playback. Sound-device/acoustic verification is a separate test;
successful CPU synthesis or player completion never asserts audible output.

Regression checks: `node --test tests/test_voice_tts*.mjs`. Mock engine tests are
contract tests, not proof of model quality or real-device playback. Record real
pinned-runtime/model CPU smoke evidence separately before making that claim.

Production local TTS fails closed without the trusted managed-model resolver.
The exported low-level Melo adapter is for explicitly trusted integration/smoke
use only, not a fallback for arbitrary saved model paths.

Qwen uses context 4096, at most four available CPU threads and at most 2048
output frames. The public runtime keeps its 1–4000 character contract and splits local speech
sequentially at punctuation/Unicode-safe boundaries, each at most 400 JavaScript
characters and 1200 UTF-8 bytes. The low-level adapter rejects larger chunks
as a defense against context overflow; text is never silently truncated. A
single cancellation signal spans all chunks. A failed or unconfirmed chunk
stops the remaining sequence, without starting another speaker or pre-generating
audio in parallel. This is a
conservative input boundary, not an exact tokenizer estimate. Fixed short public
samples on Linux used approximately 4.6 GiB peak memory; that is not a bound for
all input lengths or a Windows sound-device result.

### Production-adapter CPU verification, 2026-11-12

Verified on Linux x86_64 with the pinned b12110 runtime and catalog Q4_K_M/Q8_0
Qwen files: the real `createManagedLocalTtsAdapter` plus `runTtsProcess` completed
its fixed public-text probe in 11,336 ms. The generated WAV passed the production
RIFF/format/rate/duration checks. Inspections before and after the probe caused no
synthesis: the instrumented runner count remained exactly one. The initial
`synthesisVerified: false` changed to `true`, while `modelResident` remained
`false`. The set of private temporary directories was unchanged afterward.
This verifies CPU synthesis and cleanup through the actual adapter, not acoustic
playback, long-text reliability, or Windows device output.
