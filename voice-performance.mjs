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
  return { performanceMode, policy: strict ? 'strict' : 'legacy_compatible', reasoningEffort: strict ? PERFORMANCE_MODES[performanceMode] : raw.reasoningEffort ?? 'off', preferenceSource: hasMode ? 'performanceMode' : hasLegacy ? 'legacy_reasoningEffort' : 'default' }
}
export function inspectPerformanceModes(info, raw = {}, probe = null) {
  const preference = performancePreference(raw)
  const advertisedEfforts = [...new Set(Array.isArray(info?.reasoning?.efforts) ? info.reasoning.efforts.map(item => item?.id).filter(id => typeof id === 'string' && id.trim() && id.length <= 256) : [])]
  return {
    ...preference, advertisedEfforts, probe, providerEnforcement: 'not_verified',
    modes: Object.entries(PERFORMANCE_MODES).map(([performanceMode, requestedEffort]) => ({ performanceMode, requestedEffort, available: probe?.results?.[requestedEffort]?.status !== 'unsupported', reason: probe?.results?.[requestedEffort]?.reason ?? 'unknown' })),
  }
}
export function chooseVoiceEffort(info, raw = {}, probe = null) {
  const availability = inspectPerformanceModes(info, raw, probe)
  const requestedAdvertised = availability.advertisedEfforts.includes(availability.reasoningEffort)
  if (!requestedAdvertised && availability.policy === 'legacy_compatible') {
    const defaultAdvertised = availability.advertisedEfforts.includes(info?.reasoning?.defaultEffort)
    return { selectedEffort: defaultAdvertised ? info.reasoning.defaultEffort : undefined, advertisedEfforts: availability.advertisedEfforts, requestedAdvertised: false, selectedAdvertised: defaultAdvertised, selectionReason: defaultAdvertised ? 'advertised_default' : 'provider_default_unverified' }
  }
  if (probe?.results?.[availability.reasoningEffort]?.status === 'unsupported') {
    throw Object.assign(new Error('The provider explicitly rejected this reasoning effort; select another mode.'), { code: 'VOICE_UNSUPPORTED_REASONING_EFFORT', stage: 'provider_probe', requestedEffort: availability.reasoningEffort })
  }
  // A catalog miss is unknown, not an unsupported provider response. Strict
  // selection always carries the requested spelling to the host, never a default.
  return { selectedEffort: availability.reasoningEffort, advertisedEfforts: availability.advertisedEfforts, requestedAdvertised, selectedAdvertised: requestedAdvertised, selectionReason: requestedAdvertised ? 'requested_advertised' : 'explicit_unadvertised' }

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

