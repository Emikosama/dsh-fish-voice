/** Internal opt-in b12110 transport. No installer, spawn, default, or UI side effects.
 * launchVerifiedServer must use installer-verified assets, bind 127.0.0.1, apply
 * apiKey through LLAMA_API_KEY in its private child environment, disable UI, and
 * resolve only when ready. It returns
 * {port, stop(): Promise<void>} where stop confirms this owned child has exited.
 * A rejected launch MUST reap its child. Never attach to an existing server.
 */
import { randomBytes } from 'node:crypto'
import { requestQwenLoopback } from './voice-qwen-loopback.mjs'
import { validateLocalTtsWav } from './voice-tts-local.mjs'
const error = (code, message) => Object.assign(new Error(message), { code })
export function parseQwenPcmFormat(contentType) {
  const fields = String(contentType ?? '').toLowerCase().split(';').map(v => v.trim())
  if (fields.shift() !== 'audio/pcm') throw error('TTS_INVALID_AUDIO', 'Expected PCM audio')
  const values = new Map()
  for (const field of fields) {
    const pair = field.split('=')
    if (pair.length !== 2 || values.has(pair[0])) throw error('TTS_INVALID_AUDIO', 'Invalid PCM format')
    values.set(...pair)
  }
  const sampleRate = Number(values.get('rate'))
  if (values.size !== 3 || values.get('encoding') !== 'float' || values.get('bits') !== '32' || !/^\d+$/.test(values.get('rate') ?? '') || !Number.isInteger(sampleRate) || sampleRate < 8000 || sampleRate > 96000) throw error('TTS_INVALID_AUDIO', 'Unsupported PCM format')
  return Object.freeze({ encoding: 'pcm_f32le', sampleRate, channels: 1 })
}
/** HTTP chunks need not align with samples. Bound duration and validate floats
 * before handing bytes to playback. No full-utterance buffer or network retry. */
export async function* decodeQwenPcm(body, { signal, sampleRate, maxSeconds = 300 } = {}) {
  const reader = body?.getReader?.()
  if (!reader || !Number.isInteger(sampleRate) || sampleRate < 8000 || sampleRate > 96000 || !Number.isFinite(maxSeconds) || maxSeconds <= 0 || maxSeconds > 300) throw error('TTS_INVALID_AUDIO', 'Invalid PCM stream')
  let tail = Buffer.alloc(0), count = 0, finished = false
  const abort = () => { void reader.cancel().catch(() => {}) }
  signal?.addEventListener('abort', abort, { once: true })
  try {
    for (;;) {
      signal?.throwIfAborted()
      const { value, done } = await reader.read()
      signal?.throwIfAborted()
      if (done) { finished = true; break }
      const bytes = Buffer.from(value.buffer, value.byteOffset, value.byteLength)
      count += bytes.length
      if (count > sampleRate * 4 * maxSeconds) throw error('TTS_INVALID_AUDIO', 'PCM duration exceeded')
      // Slice first, preventing an extra allocation proportional to a large chunk.
      for (let offset = 0; offset < bytes.length;) {
        const length = Math.min(4096 - tail.length, bytes.length - offset)
        const block = Buffer.concat([tail, bytes.subarray(offset, offset + length)])
        offset += length
        const aligned = block.length - block.length % 4
        tail = Buffer.from(block.subarray(aligned))
        if (!aligned) continue
        const pcm = block.subarray(0, aligned)
        for (let i = 0; i < pcm.length; i += 4) if (!Number.isFinite(pcm.readFloatLE(i))) throw error('TTS_INVALID_AUDIO', 'Non-finite PCM sample')
        yield pcm
      }
    }
    if (tail.length || !count) throw error('TTS_INVALID_AUDIO', 'Truncated or empty PCM stream')
  } finally {
    signal?.removeEventListener('abort', abort)
    if (!finished) await reader.cancel().catch(() => {})
    reader.releaseLock()
  }
}
export function createQwenResidentSession({ launchVerifiedServer, startPcmPlayback, startWavPlayback, fetch: request = requestQwenLoopback, timeoutMs = 180000 } = {}) {
  if (typeof launchVerifiedServer !== 'function' || (typeof startPcmPlayback !== 'function' && typeof startWavPlayback !== 'function') || typeof request !== 'function' || !Number.isFinite(timeoutMs) || timeoutMs <= 0 || timeoutMs > 600000) throw new TypeError('Verified launcher and PCM player required')
  let server, starting, active, stoppingServer, disposed = false
  const apiKey = randomBytes(32).toString('hex')
  const lifetime = new AbortController()
  async function dropServer() {
    if (stoppingServer) return stoppingServer
    stoppingServer = (async () => {
      // Await an in-flight launch even if it ignores cancellation; never orphan it.
      const owned = server ?? await starting?.catch(() => undefined)
      if (owned) { await owned.stop(); if (server === owned) server = undefined }
    })()
    try { await stoppingServer } catch (cause) {
      disposed = true // uncertain process ownership must never be reused.
      lifetime.abort(cause)
      throw cause
    } finally { stoppingServer = undefined }
  }
  async function ensureServer(signal) {
    if (server) {
      if (server.status?.()?.running !== false) return server
      // The owned child stopped between utterances. Retire it before using
      // another port, since the old port may no longer belong to the child.
      await dropServer()
      signal.throwIfAborted()
    }
    starting = Promise.resolve().then(() => launchVerifiedServer({ host: '127.0.0.1', apiKey, signal }))
    try {
      const owned = await starting
      if (!owned || !Number.isInteger(owned.port) || owned.port < 1 || owned.port > 65535 || typeof owned.stop !== 'function') {
        await owned?.stop?.()
        throw error('TTS_INVALID_RUNTIME', 'Invalid owned server')
      }
      server = owned
      signal.throwIfAborted()
      return owned
    } finally { starting = undefined }
  }
  return Object.freeze({
    async speak({ text, mode = 'wav', lang = 'zh', voice = '', referenceAudio, signal, outputDevice, volume } = {}) {
      if (disposed) throw error('TTS_SESSION_CLOSED', 'Session closed')
      if (active) throw error('TTS_BUSY', 'Speech already active')
      if (!['wav', 'experimental-pcm'].includes(mode) || typeof (mode === 'wav' ? startWavPlayback : startPcmPlayback) !== 'function' || typeof text !== 'string' || !text.trim() || text.length > 16000 || typeof lang !== 'string' || lang.length > 64 || typeof voice !== 'string' || voice.length > 128 || (referenceAudio && (!Buffer.isBuffer(referenceAudio) || !referenceAudio.length || referenceAudio.length > 12 * 1024 * 1024 || voice))) throw error('TTS_INVALID_REQUEST', 'Invalid speech input')
      if (referenceAudio) validateLocalTtsWav(referenceAudio, { reference: true })
      const controller = new AbortController()
      const combined = AbortSignal.any([controller.signal, lifetime.signal, ...(signal ? [signal] : [])])
      const timeout = setTimeout(() => controller.abort(error('TTS_TIMEOUT', 'Speech timed out')), timeoutMs)
      timeout.unref?.()
      let player, response, outputCommitted = false, requestStarted = false, bytes = 0
      // Claim synchronously before first await, including server startup.
      let resolveDone
      active = { controller, done: new Promise(resolve => { resolveDone = resolve }) }
      try {
        combined.throwIfAborted()
        const owned = await ensureServer(combined)
        combined.throwIfAborted()
        requestStarted = true // Even a rejected fetch may have reached the owned server.
        response = await request(`http://127.0.0.1:${owned.port}/tts`, {
          method: 'POST', redirect: 'error', signal: combined,
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: text, lang, ...(voice ? { voice } : {}), ...(referenceAudio ? { speaker_ref_b64: referenceAudio.toString('base64') } : {}), stream: mode !== 'wav', response_format: mode === 'wav' ? 'wav' : 'pcm', n_predict: 2048, repeat_penalty: 1.0, top_k: 40, top_p: 0.95, seed: 42 }),
        })
        if (!response.ok) throw error('TTS_INVALID_RESPONSE', `Local speech HTTP ${response.status}`)
        if (mode === 'wav') {
          if (response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'audio/wav') throw error('TTS_INVALID_AUDIO', 'Expected WAV audio')
          const reader = response.body?.getReader()
          if (!reader) throw error('TTS_INVALID_AUDIO', 'Missing WAV body')
          const parts = []
          try {
            for (;;) {
              combined.throwIfAborted()
              const { value, done } = await reader.read()
              combined.throwIfAborted()
              if (done) break
              bytes += value.byteLength
              if (bytes > 96000 * 4 * 300 + 65536) throw error('TTS_INVALID_AUDIO', 'WAV exceeds duration bound')
              parts.push(Buffer.from(value))
            }
          } finally { await reader.cancel().catch(() => {}); reader.releaseLock() }
          const wav = Buffer.concat(parts)
          const audio = validateLocalTtsWav(wav)
          combined.throwIfAborted()
          outputCommitted = true
          player = await startWavPlayback({ wav, outputDevice, volume, signal: combined })
          await player.done
          combined.throwIfAborted()
          return { ...audio, bytes, outputCommitted, completion: 'complete', naturalEosVerified: false }
        }
        const format = parseQwenPcmFormat(response.headers.get('content-type'))
        player = await startPcmPlayback({ format, outputDevice, volume, signal: combined })
        // Attach immediately: native playback can fail before its first write.
        const playerDone = Promise.resolve(player.done)
        playerDone.catch(cause => controller.abort(cause))
        for await (const chunk of decodeQwenPcm(response.body, { signal: combined, sampleRate: format.sampleRate })) {
          combined.throwIfAborted()
          outputCommitted = true // write can partially succeed before rejecting.
          await player.write(chunk)
          bytes += chunk.length
        }
        await player.end()
        await playerDone
        combined.throwIfAborted()
        // b12110 does not frame a final success marker; synthesis errors after
        // response headers can be indistinguishable from a normal HTTP EOF.
        return { bytes, audioSeconds: bytes / (format.sampleRate * 4), sampleRate: format.sampleRate, outputCommitted, completion: 'transport-eof-unconfirmed' }
      } catch (cause) {
        controller.abort(cause)
        let uncertain = cause?.uncertain === true
        try { await player?.cancel() } catch (cancelError) {
          // Native PCM helper rejects normal cancellation only after confirmed close.
          if (cancelError?.code !== 'PCM_ABORTED' || cancelError?.uncertain) uncertain = true
        }
        try { await dropServer() } catch { uncertain = true }
        const failure = error(cause?.code ?? 'TTS_STREAM_FAILED', 'Local speech stream stopped')
        Object.assign(failure, { outputCommitted, requestStarted, startupClosed: !requestStarted && !uncertain && cause?.startupClosed === true, retrySafe: false, uncertain, cause })
        throw failure
      } finally {
        await response?.body?.cancel().catch(() => {})
        clearTimeout(timeout)
        active = undefined
        resolveDone()
      }
    },
    residency() {
      const state = server?.status?.()
      return { supported: true, modelResident: state?.running === true && !disposed, blocked: state?.uncertain === true, compute: server?.compute ?? null }
    },
    async stop() {
      // Stopping disposes this ownership scope; create a new session to restart.
      disposed = true
      lifetime.abort(error('TTS_CANCELLED', 'Speech cancelled'))
      const pending = active
      pending?.controller.abort()
      if (pending) await pending.done
      await dropServer()
    },
  })
}
