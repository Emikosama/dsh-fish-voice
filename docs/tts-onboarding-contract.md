# Official DeepSeek speech, managed local voices and text replies

## Runtime choices and privacy

The available providers are `deepseek`, `local` and `off`. New installations
and legacy Edge installations preselect DeepSeek's `stella` voice. The other
official voice is `tide`. A user who already chose DeepSeek keeps that voice
and their DeepSeek consent. Explicit local and text-only choices are preserved.
The retired Windows system speech choice continues to resolve to text only.

The default configuration has `deepseekTextTransmissionAccepted: false`. Only
the owner can enable transmission. The UI discloses the recipient, billed
characters and how to configure the official API key in DSH. General microphone
authorization and former Microsoft consent never authorize a new recipient.
The plugin looks up `DEEPSEEK_API_KEY` through DSH's credential resolver, with
the existing environment fallback. The client receives availability only.

A speech tool sends its explicit reply text by HTTPS and streams mono 24 kHz
16-bit PCM from the official endpoint to the selected Windows audio output.
A failed or interrupted stream may already have produced sound. Playback
completion relies on the native player acknowledgement. The tool stays scoped
to the active session and existing authorization. Microphone recordings, keys
and speech text do not enter the seven-day operation log.
[Official speech API](https://api-docs.deepseek.com/guides/tts/)

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
- `inspect-tts` probes local playback support and whether an official key is
  available. It does not submit text or verify the account's balance.
- `save-tts`: `{ revision, values: ttsSetup }`. Validates all fields and consent,
  uses stopped-only compare-and-swap, atomically saves only `tts`, then returns
  a fresh `read-settings` result. There is no auto-apply download or speech.
- `complete-setup`: `{ revision }`. Uses the same stopped-only CAS. An explicit `off` choice is valid. Saves only
  `onboarding.version=1, completed=true`, returns `read-settings`. Completion
  means the user finished choosing; it does **not** mean ASR/models are installed
  or TTS has passed a real hardware test. Closing/dismissing UI must not call it.
- `preview-tts` reads the saved selection or a revision-checked draft and
  plays the fixed public sample. A draft cannot grant itself consent.
  Successful playback returns `playbackCompleted: true` and
  `acousticConfirmation: false`. Cancellation follows the command's signal.
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

DeepSeek errors distinguish missing consent, unavailable credentials, invalid
keys, insufficient balance, rate limiting, timeouts, invalid audio and local
playback failures. Cancellation and unconfirmed native termination retain the
existing stop semantics. The local model installer owns hardware selection
and artifact verification for local engines.

Verify with `node --test tests/test_tts_deepseek.mjs tests/test_voice_tts.mjs
tests/test_voice_ui_bridge.mjs` (on one command line) and the package tests.
Isolated integration tests use synthetic credentials and responses. A live
account test requires a separate explicit choice to send and bill its sample.

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
