/** Requested effort is a contract, not a hint. Provider enforcement remains unverified. */
export const PERFORMANCE_MODES = Object.freeze({ fast: 'off', balanced: 'low', high: 'high' })
const owns = (value, key) => Object.prototype.hasOwnProperty.call(value, key)
// A higher-precedence preference replaces a lower-precedence alias; conflicts
// within a single source remain visible to validation.
export function mergeVoiceSessionConfig(...layers) {
  const result = {}
  for (const layer of layers) {
    if (owns(layer, 'performanceMode') && !owns(layer, 'reasoningEffort')) delete result.reasoningEffort
    if (owns(layer, 'reasoningEffort') && !owns(layer, 'performanceMode')) delete result.performanceMode
    Object.assign(result, layer)
  }
  return result
}
export function performancePreference(raw = {}) {
  const hasMode = owns(raw, 'performanceMode'), hasLegacy = owns(raw, 'reasoningEffort') && raw.reasoningEffort != null
  if (hasMode && (typeof raw.performanceMode !== 'string' || raw.performanceMode !== 'compatibility' && !owns(PERFORMANCE_MODES, raw.performanceMode))) throw new Error('Voice performanceMode must be fast, balanced, high or compatibility')
  const legacyMode = Object.keys(PERFORMANCE_MODES).find(mode => PERFORMANCE_MODES[mode] === raw.reasoningEffort)
  if (hasLegacy && !legacyMode) throw new Error('Voice reasoningEffort must be off, low or high')
  if (hasMode && raw.performanceMode !== 'compatibility' && hasLegacy && raw.performanceMode !== legacyMode) throw new Error('Conflicting voice performanceMode and legacy reasoningEffort')
  const performanceMode = hasMode ? raw.performanceMode : null
  const strict = hasMode && performanceMode !== 'compatibility'
  const reasoningEffort = strict ? PERFORMANCE_MODES[performanceMode] : performanceMode === 'compatibility' ? null : raw.reasoningEffort ?? 'off'
  return { performanceMode, policy: strict ? 'strict' : 'legacy_compatible', reasoningEffort, preferenceSource: hasMode ? 'performanceMode' : hasLegacy ? 'legacy_reasoningEffort' : 'default' }
}
export function inspectPerformanceModes(info, raw = {}, probe = null, { nativeFast = false } = {}) {
  const preference = performancePreference(raw)
  const advertisedEfforts = [...new Set(Array.isArray(info?.reasoning?.efforts) ? info.reasoning.efforts.map(item => item?.id).filter(id => typeof id === 'string' && id.trim() && id.length <= 256) : [])]
  const modes = Object.entries(PERFORMANCE_MODES).map(([performanceMode, requestedEffort]) => {
    const result = probe?.results?.[requestedEffort]
    const advertised = advertisedEfforts.includes(requestedEffort)
    let available = true, reason
    if (result?.status === 'unsupported') {
      available = false
      reason = 'provider_unsupported'
    } else if (nativeFast && requestedEffort === 'off' && advertised) {
      reason = 'explicit_off'
    } else if (probe?.revision && result && result.reason !== 'host_contract_blocked') {
      reason = result.reason
    } else if (requestedEffort !== 'off' && advertised) {
      reason = 'advertised'
    } else {
      available = false
      reason = !info || probe?.status === 'unknown' && !probe.revision ? 'unknown' : 'host_contract_blocked'
    }
    return { performanceMode, requestedEffort, available, reason }
  })
  return {
    ...preference, advertisedEfforts, probe, providerEnforcement: 'not_verified',
    modes,
  }
}
export function chooseVoiceEffort(info, raw = {}, probe = null, { nativeFast = false, sourceEffort } = {}) {
  const availability = inspectPerformanceModes(info, raw, probe, { nativeFast })
  const { performanceMode, advertisedEfforts, policy, reasoningEffort } = availability
  if (performanceMode === 'compatibility') {
    const sourceAdvertised = advertisedEfforts.includes(sourceEffort)
    return { selectedEffort: sourceAdvertised ? sourceEffort : undefined, advertisedEfforts, requestedAdvertised: false, selectedAdvertised: sourceAdvertised, selectionReason: sourceAdvertised ? 'source_model_selection' : 'provider_default_unverified' }
  }
  const requestedAdvertised = advertisedEfforts.includes(reasoningEffort)
  if (!requestedAdvertised && policy === 'legacy_compatible') {
    const defaultAdvertised = advertisedEfforts.includes(info?.reasoning?.defaultEffort)
    return { selectedEffort: defaultAdvertised ? info.reasoning.defaultEffort : undefined, advertisedEfforts, requestedAdvertised: false, selectedAdvertised: defaultAdvertised, selectionReason: defaultAdvertised ? 'advertised_default' : 'provider_default_unverified' }
  }
  if (probe?.results?.[reasoningEffort]?.status === 'unsupported') {
    throw Object.assign(new Error('The provider explicitly rejected this reasoning effort; select another mode.'), { code: 'VOICE_UNSUPPORTED_REASONING_EFFORT', stage: 'provider_probe', requestedEffort: reasoningEffort })
  }
  if (policy === 'strict' && !availability.modes.find(mode => mode.performanceMode === performanceMode).available) {
    throw Object.assign(new Error(performanceMode === 'fast' ? '当前模型路线无法确认关闭思考。请改选「跟随模型」，或更换支持无思考的对话模型。' : '当前模型路线无法使用所选思考档位。请改选「跟随模型」或换用其他可用档位。'), { code: 'VOICE_EXACT_EFFORT_HOST_REQUIRED', stage: 'host_contract', requestedEffort: reasoningEffort })
  }
  return { selectedEffort: reasoningEffort, advertisedEfforts, requestedAdvertised, selectedAdvertised: requestedAdvertised, selectionReason: requestedAdvertised ? 'requested_advertised' : 'explicit_unadvertised' }
}
/** A passive owned-runtime snapshot, never an inspection or residency lease renewal. */
export function ttsResidencyCapability(readState) {
  const unknown = () => ({ supported: false, status: 'unverified', reason: 'No verified owned speech residency status is available.' })
  try {
    const state = typeof readState === 'function' ? readState() : readState
    if (!state || typeof state !== 'object' || Array.isArray(state)) return unknown()
    const supported = state.supported === true
    // Already-projected session snapshots remain safe to project at the UI boundary.
    // Explicit runtime flags take precedence over any stale diagnostic labels.
    const projected = !owns(state, 'modelResident') && !owns(state, 'blocked')
    if (state.blocked === true || projected && state.status === 'blocked') return { supported, status: 'blocked', reason: 'Owned speech engine termination is unconfirmed.' }
    if (!supported) return unknown()
    if (state.modelResident === true || projected && state.status === 'resident') return { supported, status: 'resident', reason: 'The owned speech engine is currently resident.' }
    if (state.modelResident === false || projected && state.status === 'not-resident') return { supported, status: 'not-resident', reason: 'The owned speech engine is not currently resident.' }
    return unknown()
  } catch { return unknown() }
}

