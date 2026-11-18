# Fast mode and load-time effort checks

Strict voice modes carry an explicit effort: fast = `off`, balanced = `low`, high = `high`. The voice controls and activation use the same check for availability. An advertised `low` or `high` is usable through the host's standard model selection. Fast needs confirmed host support for sending an explicit no-thinking request, even if the model advertises an `off` label.

These controls apply to dedicated voice chats. A linked DSH chat keeps its own model and effort. Select Follow model to use the DSH selection's effort on the automatic route. When an exact model is selected in Fish Voice, Follow model leaves the effort to the adapter default. Older preferences stored without a named mode retain their previous fallback behavior.

## Host requirement

On the bundled DSH rc.3 DeepSeek account and API-key routes, the adapter owns the Messages protocol and maps `off` to `thinking.type = disabled`. The adapter's resolved model metadata exposes `off`, including for models absent from the server's listing. Fish Voice reads this capability without a model probe before opening the voice root.

The separate compatibility patch targets a pinned DSH source revision and requires a separate host install. The unmodified published LLM runtime rejects efforts absent from the adapter's resolved metadata. Other adapters can also omit the wire field for off. The interface explains when a route cannot confirm no-thinking support and offers Follow model if Fast was already saved. For those routes fast/off and unadvertised-effort activation require the exact host contract. Previously advertised low/high modes remain usable on the old host, with enforcement explicitly unverified.

The separate host patch supplies exact support for:

- The official DeepSeek Messages adapter, using `thinking.type = disabled` for off.
- The pi-ai resolved model `deepseek-v4.1-flash` with API `openai-completions`, `compat.thinkingFormat = deepseek` and `compat.maxTokensField = max_tokens`, regardless of the provider ID, using explicit `reasoning_effort = off` and `thinking.type = disabled`.

The current read-only desktop configuration check found no explicit `compat` fields at either the custom provider or model level. Static files do not establish its resolved `thinkingFormat` or `maxTokensField`, so this route is **not verified to meet the exact contract**, even after a host update. Its settings have not been changed.

Model names alone do not establish a protocol. Other routes remain unknown/host-contract-blocked, not provider-unsupported. A provider can still reject the attempted parameter. Successful requests mean the provider accepted the request, not that its internal reasoning or token accounting was independently verified.

## Check cost and privacy

The paid probe below applies to routes with the separate exact-effort contract. Native DeepSeek Messages routes use their known wire mapping and do not run these extra requests.

On plugin load, a fully configured provider/model is checked immediately. If the route depends on a source session, the plugin does not guess a global default or create a session: the UI initiates one bounded check when its actual source session becomes available. Before a strict voice root is prepared, the same exact route is checked again using current configuration-aware cache results.

One uncached check uses up to three sequential requests, one per effort, each containing only `Reply OK.`. It sends no tools, history, recordings, system instructions or session identifier. Each request has a 16-token shared output/reasoning limit on the supported protocol and a five-second client timeout. There are no automatic retries. The provider may bill these requests; the plugin cannot guarantee a charge ceiling or verify a provider's accounting. The first setup screen and performance settings disclose this cost.

A structured, attributable provider rejection is shown separately from lack of host support. Authentication, rate limiting, transport failures, timeout, exhausted output budget and unrecognized errors stay unknown and can be retried. If the host can confirm the request format, these transient probe results alone do not block an effort. Selecting a different mode or changing settings still requires the existing owner and stopped-voice checks.

## Cache and lifetime

Cache keys include provider, model and a non-secret host revision covering effective adapter configuration and credentials generation. A real plugin load requests a fresh pass, with a short 15-second shared cooldown/single-flight window for duplicate mounts. Within one loaded instance, definitive results are cached for 30 minutes; unknown results for 15 seconds. Expiry itself does not start a polling loop. Opening/checking performance again explicitly allows a retry. A newly selected route/configuration invalidates the applicable result, and responses arriving from an old route or revision cannot authorize the new one. Unload aborts checks. If cancellation, a route change, unload or timeout occurs while the host prepares an adapter, a late preparation result cannot start a provider request. Preparation or transport that has not stopped keeps the single-flight slot occupied; an explicit retry becomes possible only after it drains. Requests already sent cannot be recalled or made unbillable by cancellation.

## Verification boundaries

Published-host tests verify the old host refuses unadvertised off before adapter dispatch. Patched-host tests use real host/SDK code and synthetic transport to inspect serialized requests, with no external model calls. Unit tests cover classification, cache invalidation, request limits, route/configuration races and shutdown. These checks are not microphone, live-provider, Windows app or model-quality acceptance. The running user's host and configuration remain untouched.
