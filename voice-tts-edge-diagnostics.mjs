/** Closed set of one-shot Edge worker failures allowed through the process boundary. */
export const EDGE_WORKER_FAILURE_STAGES = Object.freeze({
  EDGE_INVALID_REQUEST: 'request',
  EDGE_VENDOR_UNAVAILABLE: 'vendor',
  EDGE_INVALID_OUTPUT: 'output',
  EDGE_OUTPUT_FAILED: 'output',
  EDGE_TIMEOUT: 'network',
  EDGE_HTTP_FORBIDDEN: 'network',
  EDGE_HTTP_RATE_LIMITED: 'network',
  EDGE_HTTP_UNAVAILABLE: 'network',
  EDGE_HTTP_REJECTED: 'network',
  EDGE_NETWORK_FAILED: 'network',
  EDGE_CONNECTION_FAILED: 'network',
  EDGE_STREAM_CLOSED: 'stream',
  EDGE_STREAM_FAILED: 'stream',
  EDGE_EMPTY_AUDIO: 'audio',
  EDGE_INVALID_AUDIO: 'audio',
  EDGE_SYNTHESIS_FAILED: 'worker',
})

const stages = new Set(['preflight', 'player-start', 'synthesis', 'playback', 'player-stop', ...Object.values(EDGE_WORKER_FAILURE_STAGES)])

export function edgeWorkerFailureStage(code) {
  if (typeof code !== 'string' || !code.startsWith('TTS_EDGE_')) return
  const workerCode = code.slice(4)
  return Object.hasOwn(EDGE_WORKER_FAILURE_STAGES, workerCode) ? EDGE_WORKER_FAILURE_STAGES[workerCode] : undefined
}

function edgeRetryAfterMs(value) {
  return Number.isSafeInteger(value) && value >= 0 ? value : undefined
}

const networkCodes = new Set(['EAI_AGAIN', 'ENOTFOUND', 'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT'])

export function safeEdgeWorkerFacts(value, code) {
  const facts = {}
  if (!value || !edgeWorkerFailureStage(code)) return facts
  const { httpStatus, closeCode, networkCode } = value
  if (code.startsWith('TTS_EDGE_HTTP_') && Number.isSafeInteger(httpStatus) && httpStatus >= 100 && httpStatus <= 599) {
    facts.httpStatus = httpStatus
  }
  if (code === 'TTS_EDGE_HTTP_RATE_LIMITED' || code === 'TTS_EDGE_HTTP_UNAVAILABLE' && facts.httpStatus === 503) {
    const retryAfterMs = edgeRetryAfterMs(value.retryAfterMs)
    if (retryAfterMs !== undefined) facts.retryAfterMs = retryAfterMs
  }
  if (code.startsWith('TTS_EDGE_STREAM_') && Number.isSafeInteger(closeCode) && closeCode >= 1000 && closeCode <= 4999) {
    facts.closeCode = closeCode
  }
  if (['TTS_EDGE_NETWORK_FAILED', 'TTS_EDGE_CONNECTION_FAILED', 'TTS_EDGE_TIMEOUT'].includes(code) && networkCodes.has(networkCode)) {
    facts.networkCode = networkCode
  }
  return facts
}

export function safeEdgeDiagnostic(value, code) {
  if (!stages.has(value?.stage)) return
  const { stage, segment, segments, attempt, firstFailureCode, playedSegments, playbackPossible } = value
  const result = { stage, ...safeEdgeWorkerFacts(value, code) }
  if (stage === 'network') {
    const cooldownMs = edgeRetryAfterMs(value.cooldownMs)
    if (cooldownMs !== undefined) result.cooldownMs = cooldownMs
  }
  if (Number.isSafeInteger(segments) && segments >= 1 && segments <= 180) {
    result.segments = segments
    if (Number.isSafeInteger(segment) && segment >= 1 && segment <= segments) {
      result.segment = segment
      if (attempt === 1 || attempt === 2) result.attempt = attempt
      if (attempt === 2 && edgeWorkerFailureStage(firstFailureCode)) result.firstFailureCode = firstFailureCode
    }
    if (typeof playbackPossible === 'boolean' && Number.isSafeInteger(playedSegments)
      && playedSegments >= 0 && playedSegments <= (playbackPossible ? segments : 0)) {
      result.playedSegments = playedSegments
      result.playbackPossible = playbackPossible
    }
  }
  return result
}
