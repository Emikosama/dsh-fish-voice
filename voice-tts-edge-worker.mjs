/** One-shot Edge TTS worker. Text stays on stdin and never appears in diagnostics. */
import { createRequire } from 'node:module'
import { channel } from 'node:diagnostics_channel'
import { open, lstat, rm } from 'node:fs/promises'
import { StringDecoder } from 'node:string_decoder'
import { extname, dirname, isAbsolute, normalize } from 'node:path'
import { EDGE_VOICES, splitLocalTtsText } from './voice-tts.mjs'
import { EDGE_WORKER_FAILURE_STAGES, safeEdgeWorkerFacts } from './voice-tts-edge-diagnostics.mjs'

const MAX_STDIN_BYTES = 128 * 1024
const MAX_TEXT_BYTES = 64 * 1024
const MAX_AUDIO_BYTES = 10 * 1024 * 1024
const TOTAL_BUDGET_MS = 21_000
const MAX_CHUNK_TIMEOUT_MS = 12_000
const OUTPUT_FORMAT = 'audio-24khz-48kbitrate-mono-mp3'
const edgeResponse = channel('http.client.response.finish')
const voiceSet = new Set(EDGE_VOICES)
const transientNetworkCodes = new Set(['EAI_AGAIN', 'ECONNABORTED', 'ECONNRESET', 'ECONNREFUSED', 'ENETUNREACH', 'EHOSTUNREACH', 'EPIPE'])
const transientCloseCodes = new Set([1001, 1006, 1011, 1012, 1013, 1014])
const reply = value => process.stdout.write(JSON.stringify(value))

class EdgeWorkerFailure extends Error {
  constructor(code, details) {
    super()
    this.code = code
    this.details = details
  }
}

function parseRetryAfter(value) {
  if (typeof value !== 'string') return
  const header = value.trim()
  if (/^\d+$/u.test(header)) return Math.min(Number(header) * 1000, Number.MAX_SAFE_INTEGER)

  const now = Date.now()
  let date
  const rfc850 = /^([A-Z][a-z]{5,8}, \d{2}-[A-Z][a-z]{2}-)(\d{2})( \d{2}:\d{2}:\d{2} GMT)$/u.exec(header)
  if (rfc850) {
    // RFC 9110 interprets a two-digit year more than 50 years ahead as a past year.
    const limit = new Date(now)
    limit.setUTCFullYear(limit.getUTCFullYear() + 50)
    const year = Math.trunc(limit.getUTCFullYear() / 100) * 100 + Number(rfc850[2])
    date = Date.parse(rfc850[1] + year + rfc850[3])
    if (date > limit.getTime()) date = Date.parse(rfc850[1] + (year - 100) + rfc850[3])
  } else if (/^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT$/u.test(header)) {
    date = Date.parse(header)
  } else if (/^[A-Z][a-z]{2} [A-Z][a-z]{2} (?: \d|\d{2}) \d{2}:\d{2}:\d{2} \d{4}$/u.test(header)) {
    date = Date.parse(header + ' GMT')
  }
  if (Number.isFinite(date)) return Math.max(0, date - now)
}

function edgeStreamFailure(error, handshake) {
  const networkCode = error?.code
  const message = typeof error?.message === 'string' ? error.message : ''
  // node-edge-tts@1.2.12 and its bundled ws expose some conditions only as messages.
  // Match only their fixed formats. The stdout boundary validates each diagnostic field.
  if (networkCode === 'ETIMEDOUT' || networkCode === 'ERR_TLS_HANDSHAKE_TIMEOUT' ||
    message === 'Timed out while connecting to Edge TTS' || message === 'Timed out waiting for Edge TTS' ||
    message === 'Opening handshake has timed out') return new EdgeWorkerFailure('EDGE_TIMEOUT', { networkCode })
  const response = /^Unexpected server response: ([1-5]\d{2})$/u.exec(message)
  if (response) {
    const httpStatus = Number(response[1])
    const retryAfterMs = handshake?.httpStatus === httpStatus ? handshake.retryAfterMs : undefined
    const details = { httpStatus, retryAfterMs }
    if (httpStatus === 403) return new EdgeWorkerFailure('EDGE_HTTP_FORBIDDEN', details)
    if (httpStatus === 429) return new EdgeWorkerFailure('EDGE_HTTP_RATE_LIMITED', details)
    if (httpStatus >= 500) return new EdgeWorkerFailure('EDGE_HTTP_UNAVAILABLE', details)
    return new EdgeWorkerFailure('EDGE_HTTP_REJECTED', details)
  }
  if (transientNetworkCodes.has(networkCode)) return new EdgeWorkerFailure('EDGE_NETWORK_FAILED', { networkCode })
  if (typeof networkCode === 'string' && /^(?:ENOTFOUND$|ERR_TLS_|ERR_SSL_|CERT_|UNABLE_TO_|DEPTH_ZERO_SELF_SIGNED_CERT$|SELF_SIGNED_CERT_IN_CHAIN$)/u.test(networkCode)) {
    return new EdgeWorkerFailure('EDGE_CONNECTION_FAILED', { networkCode })
  }
  const close = /^WebSocket closed before turn\.end \(code ([1-4]\d{3})\)$/u.exec(message)
  if (close) {
    const closeCode = Number(close[1])
    const code = transientCloseCodes.has(closeCode) ? 'EDGE_STREAM_CLOSED' : 'EDGE_STREAM_FAILED'
    return new EdgeWorkerFailure(code, { closeCode })
  }
  if (message === 'WebSocket closed before the connection was established' ||
    message === 'WebSocket closed before synthesis started') return new EdgeWorkerFailure('EDGE_STREAM_CLOSED')
  return new EdgeWorkerFailure('EDGE_STREAM_FAILED')
}

function mp3DurationMs(audio) {
  if (audio.length < 4) return null
  const mpeg1Bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]
  const mpeg2Bitrates = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
  const baseRates = [44100, 48000, 32000]
  let offset = 0, frames = 0
  while (offset < audio.length) {
    if (offset + 4 > audio.length) return null
    const header = audio.readUInt32BE(offset)
    const version = (header >>> 19) & 0b11
    const layer = (header >>> 17) & 0b11
    const bitrateIndex = (header >>> 12) & 0b1111
    const rateIndex = (header >>> 10) & 0b11
    const padding = (header >>> 9) & 1
    const channelMode = (header >>> 6) & 0b11
    if ((header >>> 21) !== 0x7ff || version === 0b01 || layer !== 0b01 || bitrateIndex === 0 || bitrateIndex === 0b1111 || rateIndex === 0b11) return null
    const sampleRate = Math.floor(baseRates[rateIndex] / (version === 0b11 ? 1 : version === 0b10 ? 2 : 4))
    const bitrate = (version === 0b11 ? mpeg1Bitrates : mpeg2Bitrates)[bitrateIndex] * 1000
    const frameBytes = Math.floor((version === 0b11 ? 144 : 72) * bitrate / sampleRate) + padding
    const channels = channelMode === 0b11 ? 1 : 2
    if (sampleRate !== 24000 || channels !== 1 || frameBytes < 4 || offset + frameBytes > audio.length) return null
    offset += frameBytes
    frames++
  }
  return Math.ceil(frames * 576 * 1000 / 24000)
}

async function decodeRequest() {
  try {
    const decoder = new StringDecoder('utf8')
    let body = '', bytes = 0
    for await (const chunk of process.stdin) {
      bytes += chunk.length
      if (bytes > MAX_STDIN_BYTES) throw new Error('request too large')
      body += decoder.write(chunk)
    }
    body += decoder.end()
    return JSON.parse(body)
  } catch {
    throw new EdgeWorkerFailure('EDGE_INVALID_REQUEST')
  }
}

async function requireOutputPath(output) {
  try {
    if (typeof output !== 'string' || output.length > 4096 || !isAbsolute(output) || normalize(output) !== output || /[\x00-\x1f]/.test(output) || extname(output).toLowerCase() !== '.mp3') throw new Error('invalid output')
    const dirInfo = await lstat(dirname(output))
    if (!dirInfo.isDirectory()) throw new Error('invalid output directory')
    try {
      await lstat(output)
      throw new Error('output already exists')
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error
    }
  } catch {
    throw new EdgeWorkerFailure('EDGE_INVALID_OUTPUT')
  }
}

async function synthesize(request) {
  const keys = ['op', 'text', 'voice', 'output']
  if (!request || typeof request !== 'object' || Array.isArray(request) || Object.keys(request).length !== keys.length || keys.some(key => !Object.hasOwn(request, key))) throw new EdgeWorkerFailure('EDGE_INVALID_REQUEST')
  if (request.op !== 'synthesize' || typeof request.text !== 'string' || !request.text.trim() || !voiceSet.has(request.voice)) throw new EdgeWorkerFailure('EDGE_INVALID_REQUEST')
  const textBytes = Buffer.byteLength(request.text, 'utf8')
  if (textBytes > MAX_TEXT_BYTES || !request.text.isWellFormed()) throw new EdgeWorkerFailure('EDGE_INVALID_REQUEST')

  const chunks = splitLocalTtsText(request.text)
  if (!chunks.length || chunks.length > 180) throw new EdgeWorkerFailure('EDGE_INVALID_REQUEST')
  const startedAt = Date.now()
  const deadline = startedAt + TOTAL_BUDGET_MS
  const language = request.voice.split('-').slice(0, 2).join('-')
  let EdgeTTS
  try {
    EdgeTTS = createRequire(import.meta.url)('./vendor/edge-tts.cjs').EdgeTTS
    if (typeof EdgeTTS !== 'function') throw new Error('vendor unavailable')
  } catch {
    throw new EdgeWorkerFailure('EDGE_VENDOR_UNAVAILABLE')
  }

  await requireOutputPath(request.output)
  const audioSegments = []
  let outputBytes = 0, outputDurationMs = 0
  for (let index = 0; index < chunks.length; index++) {
    const remaining = deadline - Date.now()
    if (remaining <= 0) throw new EdgeWorkerFailure('EDGE_TIMEOUT')
    const fairShare = Math.max(1, Math.floor(remaining / (chunks.length - index)))
    const timeout = Math.min(MAX_CHUNK_TIMEOUT_MS, fairShare)
    const audioParts = []
    let chunkBytes = 0
    let handshake
    const observeHandshake = ({ request, response }) => {
      const httpStatus = response.statusCode
      if ((httpStatus === 429 || httpStatus === 503) && request.getHeader('host') === 'api.msedgeservices.com' &&
        request.getHeader('upgrade') === 'websocket') {
        handshake = { httpStatus, retryAfterMs: parseRetryAfter(response.headers['retry-after']) }
      }
    }
    // The bundled WebSocket error supplies the status but drops the response headers.
    edgeResponse.subscribe(observeHandshake)
    try {
      const tts = new EdgeTTS({ voice: request.voice, lang: language, outputFormat: OUTPUT_FORMAT, saveSubtitles: false, timeout })
      for await (const part of tts.streamAudio(chunks[index])) {
        if (!Buffer.isBuffer(part)) throw new EdgeWorkerFailure('EDGE_STREAM_FAILED')
        chunkBytes += part.length
        if (outputBytes + chunkBytes > MAX_AUDIO_BYTES) throw new EdgeWorkerFailure('EDGE_INVALID_AUDIO')
        audioParts.push(part)
      }
    } catch (error) {
      if (error instanceof EdgeWorkerFailure) throw error
      throw edgeStreamFailure(error, handshake)
    } finally {
      edgeResponse.unsubscribe(observeHandshake)
    }
    if (!chunkBytes) throw new EdgeWorkerFailure('EDGE_EMPTY_AUDIO')
    const audio = Buffer.concat(audioParts, chunkBytes)
    const durationMs = mp3DurationMs(audio)
    if (!durationMs) throw new EdgeWorkerFailure('EDGE_INVALID_AUDIO')
    outputBytes += audio.length
    outputDurationMs += durationMs
    audioSegments.push(audio)
    if (Date.now() >= deadline) throw new EdgeWorkerFailure('EDGE_TIMEOUT')
  }

  const completeAudio = Buffer.concat(audioSegments, outputBytes)
  let outputFile = null, ownsOutput = false, committed = false
  try {
    outputFile = await open(request.output, 'wx', 0o600)
    ownsOutput = true
    await outputFile.writeFile(completeAudio)
    await outputFile.sync()
    await outputFile.close()
    outputFile = null
    const info = await lstat(request.output)
    if (!info.isFile() || info.isSymbolicLink() || info.size !== outputBytes) throw new Error('incomplete output')
    if (Date.now() >= deadline) throw new EdgeWorkerFailure('EDGE_TIMEOUT')
    committed = true
    return { ok: true, synthesized: true, durationMs: outputDurationMs }
  } catch (error) {
    if (error instanceof EdgeWorkerFailure) throw error
    throw new EdgeWorkerFailure('EDGE_OUTPUT_FAILED')
  } finally {
    if (outputFile) await outputFile.close().catch(() => {})
    if (ownsOutput && !committed) await rm(request.output, { force: true }).catch(() => {})
  }
}

try {
  const request = await decodeRequest()
  reply(await synthesize(request))
} catch (error) {
  const failure = error instanceof EdgeWorkerFailure && Object.hasOwn(EDGE_WORKER_FAILURE_STAGES, error.code) ? error : null
  const code = failure?.code ?? 'EDGE_SYNTHESIS_FAILED'
  reply({ ok: false, code, ...safeEdgeWorkerFacts(failure?.details, 'TTS_' + code) })
  process.exitCode = 1
}
