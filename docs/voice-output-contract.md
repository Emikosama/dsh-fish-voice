# Voice reply projection and output volume

## Official cloud speech and diagnostic receipts

Each speech call gets its own operation ID. DeepSeek returns 24 kHz mono PCM
from a single HTTPS request. The adapter forwards audio to the selected native
output and requires its completion receipt. If the response or player fails
after audio starts, the caller must account for possible partial playback.
The seven-day operation log records the tool and playback outcome with the
same ID. It excludes speech text and credentials. Older diagnostic entries
keep their original provider and outcome until expiry.

`ui/conversation-client.mjs` exports `mountConversationClient(ctx)`. Mount once
per UI plugin; dispose with that plugin. Its `subscribe(sessionId, onValue,
onError)` returns a disposer. Unsubscribe before changing the selected session;
the disposer synchronously emits an empty snapshot. Transport failure also clears
text. This is a narrow Typert Gateway stream, not a human command or a globally
forwarded text event. The Host requires an authenticated owner Peer and resolves
an exact live Agent. Only the active voice root or its authorizing origin can read
its projection. Unrelated foreground sessions receive an empty snapshot.

Snapshots contain `revision`, `rootSessionId`, `title` (currently null), `latest`,
`items`, `inputActive` and `playbackConfirmed: false`. Items have `id`, `role`,
`text`, `state` and `at`. The bounded in-memory cache holds at most 40 items and
8,000 characters per item. It is not saved, and does not backfill persisted
history. Only delivered microphone transcripts and the exact current voice root's
allowed `speak` / `whale_voice_speak` execution arguments enter it. The Host
observes native `tools/execute` and `tools/result`; ordinary `assistant/message`
text, reasoning, unrelated tools, workers and other chats do not enter it.
This prevents post-tool model text from replacing the words requested for speech.
Items are `speech-requested` while the call runs, `reply` after a successful tool
result, `speech-failed` after a failed result and `interrupted` after cancellation.
These states do not claim acoustic confirmation; `playbackConfirmed` stays false.
Failed and interrupted captions are explicitly labelled in the UI. Calls are
matched by native execution token and fenced to the original root, owner and epoch.
Cancellation uses the Host's canonical `ABORTED` / `ABORTED_BEFORE_DISPATCH`
result codes as well as the caller signal. The built-in runtime can be stopped
by new microphone input without aborting that caller signal; its trusted
`TTS_CANCELLED` outcome is recorded against the same execution token before the
legacy tool envelope is returned. This preserves the `interrupted` label without
parsing display text or importing a host error class. Neither path confirms
that any sound was heard.
Built-in PTT and explicit TTS stop also invalidate the old output generation.
The session manager observes the exact root's native `agent/pre-step` turn/step,
then binds that stamp to `ToolBatchInput.toolSet` before the native executor starts
any call. Each `whale_voice_speak` checks the same admission object before TTS.
This covers queued speech, a slow non-speech tool before first speech, and a model
response that arrives after PTT. It never aborts the caller's signal or unrelated
tools. Per-call timeout wrappers may replace signals, so signals are not step IDs.
Cancelled captions remain `interrupted`; queue-flush confirmation cannot coexist
with another queued speech request from that old generation.

An automatic later step in the same interrupted native turn stays muted. A new
voice transcript is different: the manager records its exact generated message ID
and output generation before `steer`. Owner text entered in the visible root is
also admitted through native `agent/inbox/inserted`, requiring that exact live
Agent, a user message, and the host-computed `source.kind:user` with nonempty
`rpcId` and no non-owner `principal`. Only the native pre-step that actually
claims the recorded ID can reopen speech in that same turn. Inputs queued before
the stop, guest prompts, source-less messages and worker feedback cannot reopen
it. A pending ID retains its first generation when native queue edit/steer
reinserts it. The registry retains only IDs and generations until claim, failed
delivery or root disposal; it does not evict still-pending IDs from long queues. A later native turn and direct invocations
outside a model step retain independent admission. Missing/mismatched model-step
identity fails closed with `TTS_OUTPUT_SCOPE_UNVERIFIED`. No transcript text is
stored by this fence and no synthetic `stepId` is added to host executions.

A normally completed dedicated voice turn with claimed microphone input can
queue a single fixed speech reminder in the same Agent's native inbox. It
requires configured speech permission, a visible final text reply, and no
explicit speech attempt in that turn. The reminder carries no reply or
transcript text. The model may choose to invoke its authorized speech tool.
Ordinary typed input and reminder turns cannot schedule a reminder. A newer
input withdraws the queued notice by identity or fences its old speech when
the notice has already been claimed.

Root, authorization epoch or owner changes clear
previous content; a shared 1-second Host liveness check also detects out-of-band
authorization changes without invoking commands or reading chat history.

`inputActive` means a currently accepted PTT/VAD input segment, not microphone
permission or general listening readiness. It is set only after validated helper
start signals and clears on end/cancel, helper exit, revocation or root change.
A logo may breathe for this state; enabled permission alone must remain static.

`readVolume(sessionId, signal)` and
`setVolume(sessionId, { revision, volume }, signal)` resolve to plain values
(the client unwraps RemoteResult). Volume is 0–1; the underlying Windows
`dsh-speak` value is an integer 0–100. The narrow settings mutation uses the
namespace revision and edits only `volume`, preserving secrets and other settings.
It applies to the next output, not a sound already playing. Unsupported adapters
return `supported:false`, null volume/revision and a reason. Do not enable a
slider for them. This adapter never changes system or input cue volume.

Verified source contracts:
- DSH `fcc0ad462172522aaf5c93a7b2e01f6b9f0b0159`,
  `packages/core/tools/src/events.ts`, `contracts.ts`, and `pipeline.ts`:
  `tools/execute` exposes the dispatched arguments and execution token;
  `tools/result` receives the same execution with a frozen normalized result.
  Cancellation after dispatch drains and reports an error; cancellation before
  execution does not create a speech caption. This is a tool-result contract,
  not acoustic playback evidence.
- DSH `packages/core/session/src/types.ts`: committed `assistant/message`, text
  parts and interrupted prefix semantics; `session/event` receives exact Session.
- DSH `packages/settings/settings/src/index.ts`: redacted describe and
  `mutate(namespace, pathOps, expectedRevision)`.
- https://github.com/Alan2Z/dsh-speak/blob/main/adapters/dsh/speech-hook.js (1.8.4):
  live `volume` config, Windows engine `-Volume`, loader volatile updates.
- https://github.com/Alan2Z/dsh-speak/blob/main/engine/speak.ps1:
  `$synth.Volume = $Volume`, an independent synthesizer gain.
- macOS dsh-speak does not pass volume to its engine, so is unsupported.
- https://github.com/T-MS-Reyes/dsh-DSTuber/blob/main/src/voice.js (0.1.0):
  no exported output-gain setter. DSTuber remains unsupported, even if its
  unrelated speech callbacks exist. Installing dsh-speak alongside DSTuber does
  not make the latter volume controllable.

Tests: `npm test`; additionally, with a verified DSH source checkout:
`DSH_SOURCE_ROOT=/path/to/dsh /path/to/dsh/node_modules/.bin/vitest run --config tests/output-gateway.config.mjs`.
The latter mounts the real Host registry/Gateway/owner Peer and real Client
Gateway contribution, checks scoped streaming, non-owner rejection, revocation,
input state, volume read, and cancellation. No microphone, actual Windows audio
hardware, or live third-party plugin process is exercised by these tests.

Speech-generation host contract checks:
- Pinned DSH source `fcc0ad462172522aaf5c93a7b2e01f6b9f0b0159`:
  `packages/core/agent-loop/src/agent.ts` resolves a fresh step toolSet, emits
  `agent/pre-step` with turn/step/messages, passes `log:{turn,step}` and that same
  toolSet to `tools.execute`, then disposes it after the step settles.
  `packages/core/tools/src/batch.ts` and `pipeline.ts` preserve toolSet identity
  in each call; `ToolExecution` itself has no turn/step field.
- Official npm `@deepseek-ai/dsh-agent-loop`, `dsh-tools`, and
  `dsh-tool-executor-native` at `0.2.2-rc.1` preserve the same contract.
  `tests/host/published-rc1/speech-fence.spec.mjs` runs the actual published
  AgentLoop, native executor and pipeline with the production manager and TTS
  runtime. It verifies queued cancellation, same-turn retry suppression, same-turn
  microphone and owner-text recovery, guest rejection, later-turn recovery,
  repeated-RPC deduplication, and per-call wrapper signals.
  The scripted model and native child pipes are synthetic: no online model,
  microphone, PowerShell playback or acoustic verification is exercised.

- Pinned source `packages/api/session-controller/src/index.ts` constructs prompt
  source from the validated request ID and `principalOf(ctx.invocation)`;
  `commands.ts` creates the message and steers the live Agent. Published
  `@deepseek-ai/dsh-api-session-controller@0.2.2-rc.1` has the same owner-source
  contract and rejects empty prompt content. The pinned source additionally
  labels empty retries `kind:retry`; these do not reopen speech. `principalOf`
  omits the owner principal (and trusted in-process calls), preserving non-owner
  principals. This is a trusted host-plugin boundary, not proof against malicious
  plugins fabricating native events.
- Native inbox append records the splice before `agent/inbox/inserted`; pre-step
  receives the exact claimed IDs. Queue edits/moves preserve an existing ID.
  The real controller deduplicates repeated RPC IDs in pending queues and durable
  accepted user events, so replay does not create a fresh admission.
- The published test exercises the real Remote method and command implementation
  (a test-only export exposes the private command class) with owner/guest invocation
  metadata and text-only attachment stubs. It verifies source construction rather
  than Gateway authentication. The official controller dependency is confined to
  the locked published-host test fixture; production dependencies are unchanged.

Caption replay regression coverage also retains live native execution identities
with weak keys after the 40-row window rolls over. Re-observing an existing token
does not append a second caption. Distinct executions with identical text remain
visible, including repeats explicitly requested in later user inputs: the UI must
not hide a real second speech request. Ordinary final text and repeated snapshots
do not create additional rows. Voice instructions explicitly tell the model that
a successful speech call delivers the acknowledgment once, without another speech
call or final-text echo. This prompt is guidance, not an exactly-once execution
guarantee. The two-bubble screenshot alone does not establish why a second native
execution occurred or whether audio played twice; live native call tracing remains
necessary to confirm that cause.
