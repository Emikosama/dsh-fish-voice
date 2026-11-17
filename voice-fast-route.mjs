/** Stock DeepSeek Messages detection and strict fast-call preparation for DSH rc.3. */

const NATIVE_DEEPSEEK_ROUTES = Object.freeze({
  'deepseek-account': 'DeepSeek Account',
  'deepseek-official': 'DeepSeek',
})

/**
 * Read the rc.3 runtime registration and report only the two stock Messages routes.
 *
 * DSH 0.2.2-rc.3 exposes its TypeScript-private adapter registry as the plain
 * runtime field `llm.adapters`. This probe reads that field and the captured
 * adapter only; if the field, registration, or provider metadata changes, it
 * fails closed. A display name by itself never establishes native ownership.
 *
 * @param {object} llm - The live DSH LLM runtime.
 * @param {string} provider - The exact provider route to inspect.
 * @returns {{supported: true, provider: string, owner: string, protocol: 'deepseek-messages-v1', reasoningEffort: 'off', thinkingType: 'disabled'} | {supported: false, reason: string}}
 */
export function inspectNativeDeepSeekFastRoute(llm, provider) {
  const expectedName = Object.hasOwn(NATIVE_DEEPSEEK_ROUTES, provider) ? NATIVE_DEEPSEEK_ROUTES[provider] : undefined
  if (expectedName === undefined) return unsupported('provider_not_stock_deepseek')

  const registrations = llm?.adapters
  if (!(registrations instanceof Map)) return unsupported('host_registration_shape_changed')

  const registration = registrations.get(provider)
  const adapter = registration?.adapter
  if (adapter === undefined) return unsupported('provider_not_registered')

  try {
    if (adapter.constructor?.name !== 'DeepSeekAdapter') return unsupported('adapter_not_stock_deepseek')
    const info = adapter.providerInfo?.(provider)
    if (info?.id !== provider || info?.name !== expectedName) return unsupported('provider_identity_mismatch')
  } catch (_adapterInspectionFailed) {
    return unsupported('adapter_inspection_failed')
  }

  return Object.freeze({
    supported: true,
    provider,
    owner: expectedName,
    protocol: 'deepseek-messages-v1',
    reasoningEffort: 'off',
    thinkingType: 'disabled',
  })
}

/**
 * Prepare the normal host call with explicit off for a verified native route.
 * The returned handle is not dispatched here; callers use `call.stream(...)`
 * only for the actual voice turn. Preparation can still perform adapter-owned
 * connection or catalog work, so do not use it as an activation probe. Provider
 * admission and host validation remain active, and any rejection is propagated
 * without selecting another effort.
 *
 * @param {object} llm - The live DSH LLM runtime.
 * @param {{provider: string, model: string, maxTokens?: number, signal?: AbortSignal}} request - Exact route, optional output cap, and cancellation signal.
 * @returns {Promise<{route: Exclude<ReturnType<typeof inspectNativeDeepSeekFastRoute>, {supported: false}>, call: object}>} Native route evidence and the one-shot prepared call.
 */
export async function prepareNativeDeepSeekFastCall(llm, { provider, model, maxTokens, signal }) {
  const route = inspectNativeDeepSeekFastRoute(llm, provider)
  if (!route.supported) {
    throw routeError(`Fast no-thinking is unavailable for ${provider}: ${route.reason}`, 'VOICE_FAST_ROUTE_UNSUPPORTED')
  }
  if (typeof llm?.prepareCall !== 'function') {
    throw routeError('The host does not expose the rc.3 LLM prepareCall API', 'VOICE_FAST_HOST_UNSUPPORTED')
  }

  const call = await llm.prepareCall({ provider, model, ...(maxTokens === undefined ? {} : { maxTokens }), reasoningEffort: 'off' }, signal)
  if (call?.config?.reasoningEffort !== 'off') {
    throw routeError('The host did not preserve the explicit off effort', 'VOICE_FAST_PREPARATION_MISMATCH')
  }
  return Object.freeze({ route, call })
}

function unsupported(reason) {
  return Object.freeze({ supported: false, reason })
}

function routeError(message, code) {
  return Object.assign(new Error(message), { code })
}
