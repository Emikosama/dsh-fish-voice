/** Input cues and output cancellation. No audio/model/network dependencies.
 *
 * A real output adapter must implement the acknowledgement contract before a
 * cancellation can be called confirmed. Legacy cancel() is only requested.
 * A cue adapter may play only on a confirmed headphone route or verified AEC.
 */
import { randomUUID } from 'node:crypto'

export const CANCEL_PROTOCOL = 'whale-voice-cancel/1'
export const DEFAULT_TURN_SIGNALS = Object.freeze({
  enabled: true,
  volume: 0.2,
  endDelayMs: 750,
  experimentalAutomaticBargeIn: false,
  headphonesConfirmed: false,
})

export function turnSignalSettings(value = {}) {
  const v = value && typeof value === 'object' ? value : {}
  return {
    enabled: v.enabled !== false,
    volume: Number.isFinite(v.volume) ? Math.min(1, Math.max(0, v.volume)) : 0.2,
    // The requested interval is fixed; this is not an ASR endpoint setting.
    endDelayMs: 750,
    experimentalAutomaticBargeIn: v.experimentalAutomaticBargeIn === true,
    headphonesConfirmed: v.headphonesConfirmed === true,
  }
}

export function isConfirmedCancellation(ack, request) {
  return ack?.protocol === CANCEL_PROTOCOL && ack?.status === 'confirmed'
    && ack?.requestId === request?.requestId && ack?.generation === request?.generation
    && ack?.queueFlushed === true && ack?.staleGenerationDiscarded === true
}

export function createVoiceTurnSignals({
  getConfig = () => ({}), getOutput = () => null, getCueOutput = () => null,
  onState = () => {}, now = Date.now, setTimer = setTimeout, clearTimer = clearTimeout,
} = {}) {
  let generation = 0, current = null, timer = null, disposed = false
  let cancellation = { status: 'unsupported', reason: 'output-adapter-unavailable' }
  let cue = { status: 'unsupported', reason: 'cue-adapter-unavailable' }
  let phase = 'idle'
  const seen = new Set()
  const settings = () => turnSignalSettings(getConfig())
  const status = () => ({ phase, inputTurnId: current?.id ?? null, generation, settings: settings(), cancellation: { ...cancellation }, cue: { ...cue } })
  const publish = () => { try { onState(status()) } catch {} }
  const clearEnd = () => { if (timer !== null) clearTimer(timer); timer = null }
  const safely = (fn, fallback = null) => { try { return fn() } catch { return fallback } }
  function cancelCues(reason) {
    clearEnd()
    safely(() => getCueOutput()?.cancelCue?.({ reason, generation, inputTurnId: current?.id ?? null }))
  }
  function safeRoute(adapter) {
    const caps = safely(() => typeof adapter?.capabilities === 'function' ? adapter.capabilities() : adapter?.capabilities, {}) ?? {}
    if (caps.acousticIsolation === 'aec-verified') return true
    return settings().headphonesConfirmed && caps.acousticIsolation === 'headphones-confirmed'
  }
  function play(kind, token) {
    if (disposed || token !== generation || !current || current.responseStarted || (kind === 'end' && current.endCueSuppressed)) return
    const config = settings()
    if (!config.enabled || config.volume === 0) { cue = { status: 'disabled' }; publish(); return }
    const adapter = safely(getCueOutput)
    if (typeof adapter?.playCue !== 'function' || !safeRoute(adapter)) {
      cue = { status: 'unsupported', reason: typeof adapter?.playCue !== 'function' ? 'cue-adapter-unavailable' : 'echo-safe-output-unavailable' }
      publish(); return
    }
    cue = { status: 'requested', kind, inputTurnId: current.id }
    publish()
    try {
      Promise.resolve(adapter.playCue({ kind, volume: config.volume, inputTurnId: current.id, generation: token })).then(result => {
        if (disposed || token !== generation || current?.responseStarted || (kind === 'end' && current?.endCueSuppressed)) return
        // Playback success must come from the output, not from scheduling it.
        cue = { ...cue, ...(result?.status === 'played' ? { status: 'played' } : result?.status === 'unsupported' ? { status: 'unsupported', reason: result.reason ?? 'playback-unsupported' } : {}) }
        publish()
      }, () => { if (!disposed && token === generation) { cue = { status: 'unsupported', reason: 'playback-failed' }; publish() } })
    } catch { cue = { status: 'unsupported', reason: 'playback-failed' }; publish() }
  }
  function requestCancellation(reason = 'voice-input') {
    if (disposed) return cancellation
    const adapter = safely(getOutput)
    const request = { protocol: CANCEL_PROTOCOL, requestId: randomUUID(), generation, inputTurnId: current?.id ?? null, reason }
    if (typeof adapter?.requestCancel !== 'function' && typeof adapter?.cancel !== 'function') {
      cancellation = { status: 'unsupported', reason: 'output-adapter-unavailable' }; publish(); return cancellation
    }
    cancellation = { status: 'requested', ...request }
    publish()
    try {
      // Invoke immediately. Neither input capture nor ASR waits on this promise.
      const response = typeof adapter.requestCancel === 'function' ? adapter.requestCancel(request) : adapter.cancel(reason, request)
      Promise.resolve(response).then(ack => {
        if (disposed || cancellation.requestId !== request.requestId || generation !== request.generation) return
        if (isConfirmedCancellation(ack, request)) cancellation = { ...cancellation, status: 'confirmed', queueFlushed: true, staleGenerationDiscarded: true }
        else if (ack?.status === 'unsupported') cancellation = { ...cancellation, status: 'unsupported', reason: 'backend-cancellation-unsupported' }
        publish()
      }, () => {
        if (!disposed && cancellation.requestId === request.requestId) { cancellation = { ...cancellation, status: 'requested', error: 'cancellation-failed-or-unconfirmed' }; publish() }
      })
    } catch { cancellation = { ...cancellation, status: 'requested', error: 'cancellation-failed-or-unconfirmed' }; publish() }
    return { ...cancellation }
  }
  function inputStart(event) {
    if (disposed || typeof event?.inputTurnId !== 'string' || !event.inputTurnId || seen.has(event.inputTurnId)) return false
    generation += 1
    cancelCues('new-input')
    seen.add(event.inputTurnId)
    if (seen.size > 256) seen.delete(seen.values().next().value)
    current = { id: event.inputTurnId, mode: event.mode ?? 'always', responseStarted: false, ended: false }
    phase = 'listening'
    const config = settings()
    // Energy-only VAD is not echo cancellation, even at a higher threshold.
    const trusted = current.mode.startsWith('ptt')
    const automaticSafe = config.experimentalAutomaticBargeIn && safeRoute(safely(getOutput))
    if (trusted || automaticSafe) requestCancellation('voice-input')
    else cancellation = { status: 'unsupported', reason: 'automatic-barge-in-disabled-without-isolation' }
    publish()
    play('start', generation)
    return true
  }
  function inputEnd(event) {
    if (disposed || !current || current.id !== event?.inputTurnId || current.ended || current.responseStarted) return false
    current.ended = true
    phase = 'processing'
    // PTT release wins over the last voiced frame. For VAD use that frame,
    // not the later segment-finished time (otherwise silenceMs + 750).
    const base = current.mode.startsWith('ptt') && Number.isFinite(event.releasedAt)
      ? event.releasedAt : Number.isFinite(event.lastVoicedAt) ? event.lastVoicedAt : event.endAt
    if (!Number.isFinite(base)) { cue = { status: 'unsupported', reason: 'input-end-timestamp-missing' }; publish(); return false }
    const token = generation
    clearEnd()
    timer = setTimer(() => { timer = null; play('end', token) }, Math.max(0, base + settings().endDelayMs - now()))
    timer?.unref?.()
    publish()
    return true
  }
  function reportCue(event) {
    if (disposed || event?.inputTurnId !== current?.id || event?.generation !== generation
      || current?.responseStarted || (event?.kind === 'end' && current?.endCueSuppressed)) return false
    if (!['played', 'requested', 'unsupported', 'disabled', 'cancelled'].includes(event.status)) return false
    cue = { status: event.status, kind: event.kind, inputTurnId: event.inputTurnId, ...(event.reason ? { reason: event.reason } : {}) }
    publish()
    return true
  }
  function suppressEndCue(reason = 'speech_requested') {
    // A native speak request is useful conservative suppression, NOT evidence
    // of first audio. Only a pending end cue is suppressed, never input audio.
    if (disposed || !current?.ended || current.responseStarted) return false
    current.endCueSuppressed = true
    cancelCues(reason)
    cue = { status: 'cancelled', reason }
    publish()
    return true
  }
  function responseStarted(inputTurnId = current?.id) {
    if (disposed || !current || current.id !== inputTurnId) return false
    current.responseStarted = true
    phase = 'responding'
    cancelCues('response-started')
    publish()
    return true
  }
  function cancel(reason = 'cancelled') {
    if (disposed) return
    generation += 1
    cancelCues(reason)
    current = null
    cue = { status: 'cancelled', reason }
    cancellation = { status: 'unsupported', reason: 'no-active-turn' }
    phase = 'idle'
    publish()
  }
  function handleInput(event) {
    if (event?.state === 'start') return inputStart(event)
    if (event?.state === 'end') return inputEnd(event)
    if (event?.state === 'cancel' && current?.id === event.inputTurnId) { cancel(event.reason); return true }
    return false
  }
  return { handleInput, inputStart, inputEnd, responseStarted, requestCancellation, reportCue, suppressEndCue, cancel, status,
    dispose() { cancel('dispose'); disposed = true },
  }
}
