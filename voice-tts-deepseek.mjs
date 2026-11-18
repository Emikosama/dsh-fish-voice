import { MAX_PCM_STREAM_CHUNK, startPcmPlayback as playPcm } from './voice-pcm-stream.mjs'

const endpoint = 'https://api.deepseek.com/v1/tools/tts'
const sampleRate = 24000
const maximumAudioSeconds = 120
const maximumAudioBytes = sampleRate * 2 * maximumAudioSeconds
const maximumBodyBytes = 64 * 1024
const fault = (code, message, extra = {}) => Object.assign(new Error(message), { code, ...extra })

const statusFailures = new Map([
  [400, ['TTS_DEEPSEEK_REQUEST_REJECTED', 'DeepSeek 拒绝了这段朗读文本']],
  [401, ['TTS_DEEPSEEK_API_KEY_INVALID', 'DeepSeek API Key 无效或已失效']],
  [402, ['TTS_DEEPSEEK_QUOTA_EXCEEDED', 'DeepSeek API 额度不足（402）']],
  [429, ['TTS_DEEPSEEK_RATE_LIMITED', 'DeepSeek TTS 请求过多，请稍后重试']],
  [503, ['TTS_DEEPSEEK_BUSY', 'DeepSeek TTS 服务繁忙，请稍后重试']],
  [504, ['TTS_DEEPSEEK_TIMEOUT', 'DeepSeek TTS 请求超时']],
])

const isHan = character => /\p{Script=Han}/u.test(character)

export function deepSeekTtsBilledCharacters(text) {
  if (typeof text !== 'string') return 0
  let count = 0
  for (const character of text) count += isHan(character) ? 2 : 1
  return count
}

function validatedKey(value) {
  const key = typeof value === 'string' ? value : value && typeof value.value === 'string' ? value.value : null
  return key && key.trim() && key.length <= 8192 && !/[\u0000-\u0020\u007f-\u009f]/u.test(key) ? key : null
}

function responseContentLength(headers) {
  const value = headers?.get?.('content-length')
  if (value == null) return null
  if (!/^\d{1,10}$/u.test(value)) throw fault('TTS_INVALID_AUDIO', 'DeepSeek 返回的音频无效')
  const length = Number(value)
  if (!Number.isSafeInteger(length) || length <= 0 || length > maximumAudioBytes) throw fault('TTS_INVALID_AUDIO', 'DeepSeek 返回的音频超出大小限制')
  return length
}

function mapFailure(error, { signal, timeoutSignal, playbackFailure }) {
  if (playbackFailure) error = playbackFailure
  if (signal?.aborted) return fault('TTS_CANCELLED', '朗读已取消')
  if (timeoutSignal?.aborted) return fault('TTS_DEEPSEEK_TIMEOUT', 'DeepSeek TTS 请求超时')
  switch (error?.code) {
    case 'PCM_PLATFORM_UNSUPPORTED':
      return fault('TTS_PLATFORM_UNSUPPORTED', '当前平台不支持 DeepSeek 语音播放')
    case 'PCM_TERMINATION_UNCONFIRMED':
      return fault('TTS_TERMINATION_UNCONFIRMED', '未能确认音频播放已停止，请关闭鱼应后重启宿主', { uncertain: true })
    case 'PCM_TIMEOUT':
      return fault('TTS_DEEPSEEK_TIMEOUT', 'DeepSeek 语音播放超时')
    case 'PCM_FORMAT_INVALID':
    case 'PCM_DEVICE_INVALID':
    case 'PCM_CHUNK_INVALID':
    case 'PCM_PROTOCOL_INVALID':
    case 'PCM_PROCESS_FAILED':
    case 'PCM_PIPE_FAILED':
    case 'PCM_PROCESS_START_FAILED':
    case 'PCM_STREAM_CLOSED':
    case 'PCM_EMPTY':
      return fault('TTS_DEEPSEEK_PLAYBACK_FAILED', 'DeepSeek 音频播放失败')
    case 'TTS_DEEPSEEK_REQUEST_REJECTED':
    case 'TTS_DEEPSEEK_API_KEY_INVALID':
    case 'TTS_DEEPSEEK_QUOTA_EXCEEDED':
    case 'TTS_DEEPSEEK_RATE_LIMITED':
    case 'TTS_DEEPSEEK_BUSY':
    case 'TTS_DEEPSEEK_TIMEOUT':
    case 'TTS_DEEPSEEK_NETWORK':
    case 'TTS_DEEPSEEK_CREDENTIAL_MISSING':
    case 'TTS_DEEPSEEK_CREDENTIAL_UNAVAILABLE':
    case 'TTS_DEEPSEEK_INVALID_CREDENTIAL':
    case 'TTS_INVALID_AUDIO':
    case 'TTS_INVALID_TEXT':
      return error
    default:
      return fault('TTS_DEEPSEEK_NETWORK', '无法连接 DeepSeek TTS')
  }
}

function playerStopError(error) {
  if (error?.uncertain || error?.code === 'PCM_TERMINATION_UNCONFIRMED') {
    return fault('TTS_TERMINATION_UNCONFIRMED', '未能确认音频播放已停止，请关闭鱼应后重启宿主', { uncertain: true })
  }
  return null
}

export function createDeepSeekTtsAdapter({
  resolveDeepSeekApiKey,
  outputDevice = () => null,
  fetch: request = globalThis.fetch,
  startPcmPlayback = playPcm,
  platform = process.platform,
  timeoutMs = 150000,
} = {}) {
  if (typeof outputDevice !== 'function' || typeof request !== 'function' || typeof startPcmPlayback !== 'function'
    || !Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 150000) {
    throw new TypeError('DeepSeek TTS requires a credential resolver, fetch and PCM playback adapter')
  }

  async function resolveKey(signal) {
    signal?.throwIfAborted()
    if (typeof resolveDeepSeekApiKey !== 'function') {
      throw fault('TTS_DEEPSEEK_CREDENTIAL_MISSING', '请先在 DSH 模型设置中配置 DeepSeek API Key')
    }
    let value
    try { value = await resolveDeepSeekApiKey() }
    catch { signal?.throwIfAborted(); throw fault('TTS_DEEPSEEK_CREDENTIAL_UNAVAILABLE', '无法读取 DSH 中保存的 DeepSeek API Key') }
    signal?.throwIfAborted()
    const key = validatedKey(value)
    if (!key) throw fault('TTS_DEEPSEEK_CREDENTIAL_MISSING', '请先在 DSH 模型设置中配置 DeepSeek API Key')
    return key
  }

  async function keyAvailable(signal) {
    try { return !!await resolveKey(signal) }
    catch (error) {
      if (signal?.aborted) throw fault('TTS_CANCELLED', '朗读已取消')
      return false
    }
  }

  async function synthesize({ text, voice = 'stella', volume = 0.8, signal } = {}) {
    signal?.throwIfAborted()
    if (typeof text !== 'string' || !text.trim() || text.length > 4000 || deepSeekTtsBilledCharacters(text) > 10000
      || Buffer.byteLength(text, 'utf8') > maximumBodyBytes
      || !['stella', 'tide'].includes(voice) || typeof volume !== 'number' || !Number.isFinite(volume) || volume < 0 || volume > 1) {
      throw fault('TTS_INVALID_TEXT', 'DeepSeek TTS 文本或音色无效')
    }

    const apiKey = await resolveKey(signal)
    signal?.throwIfAborted()
    const payload = { text, voice_id: voice, format: 'pcm', filter_markdown: true }
    const body = JSON.stringify(payload)
    if (Buffer.byteLength(body, 'utf8') > maximumBodyBytes) throw fault('TTS_INVALID_TEXT', 'DeepSeek TTS 文本过长')

    const timeoutController = new AbortController()
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      timeoutController.abort()
    }, timeoutMs)
    timer.unref?.()
    const combined = signal ? AbortSignal.any([signal, timeoutController.signal]) : timeoutController.signal
    let response, reader, player, playbackFailure = null, receivedBytes = 0, stopFailure = null, complete = false
    try {
      response = await request(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body,
        redirect: 'error',
        signal: combined,
      })
      combined.throwIfAborted()
      if (!response?.ok) {
        const status = Number(response?.status)
        const [code, message] = statusFailures.get(status) ?? ['TTS_DEEPSEEK_NETWORK', 'DeepSeek TTS 请求失败']
        await response?.body?.cancel?.().catch(() => {})
        throw fault(code, message)
      }
      const contentType = response.headers?.get?.('content-type')?.split(';', 1)[0]?.trim().toLowerCase()
      if (contentType !== 'audio/pcm') throw fault('TTS_INVALID_AUDIO', 'DeepSeek 返回的音频格式无效')
      const contentLength = responseContentLength(response.headers)
      reader = response.body?.getReader?.()
      if (!reader) throw fault('TTS_INVALID_AUDIO', 'DeepSeek 未返回音频')

      player = startPcmPlayback({
        format: { encoding: 'pcm_s16le', sampleRate, channels: 1 },
        outputDevice: outputDevice() ?? null,
        volume,
        signal: combined,
        platform,
        timeoutMs,
      })
      const playerDone = Promise.resolve(player.done)
      playerDone.catch(error => {
        playbackFailure ??= error
        if (!timeoutController.signal.aborted && !signal?.aborted) timeoutController.abort(error)
      })
      await player.ready
      combined.throwIfAborted()

      let tail = Buffer.alloc(0)
      for (;;) {
        combined.throwIfAborted()
        if (playbackFailure) throw playbackFailure
        const { value, done } = await reader.read()
        combined.throwIfAborted()
        if (done) break
        const bytes = Buffer.from(value.buffer, value.byteOffset, value.byteLength)
        receivedBytes += bytes.length
        if (!bytes.length || receivedBytes > maximumAudioBytes) throw fault('TTS_INVALID_AUDIO', 'DeepSeek 返回的音频超出大小限制')

        for (let offset = 0; offset < bytes.length;) {
          const length = Math.min(MAX_PCM_STREAM_CHUNK - tail.length, bytes.length - offset)
          const block = tail.length
            ? Buffer.concat([tail, bytes.subarray(offset, offset + length)])
            : bytes.subarray(offset, offset + length)
          offset += length
          const alignedLength = block.length - block.length % 2
          tail = Buffer.from(block.subarray(alignedLength))
          if (alignedLength) await player.write(block.subarray(0, alignedLength))
          combined.throwIfAborted()
          if (playbackFailure) throw playbackFailure
        }
      }
      if (tail.length !== 0 || receivedBytes === 0 || receivedBytes % 2 !== 0 || contentLength !== null && receivedBytes !== contentLength) {
        throw fault('TTS_INVALID_AUDIO', 'DeepSeek 返回的音频不完整')
      }
      await player.end()
      await player.done
      combined.throwIfAborted()
      complete = true
      return { completed: true, bytes: receivedBytes, sampleRate, audioSeconds: receivedBytes / (sampleRate * 2) }
    } catch (error) {
      const failure = mapFailure(error, { signal, timeoutSignal: timedOut ? timeoutController.signal : null, playbackFailure })
      if (!complete) timeoutController.abort(error)
      if (reader) {
        try { await reader.cancel() } catch {}
      }
      if (player) {
        try { await player.cancel() }
        catch (stopError) {
          stopFailure = playerStopError(stopError)
          if (!stopFailure && stopError?.code !== 'PCM_ABORTED') stopFailure = playerStopError(playbackFailure)
        }
        try { await player.done }
        catch (stopError) {
          stopFailure ??= playerStopError(stopError)
        }
      }
      if (stopFailure) throw stopFailure
      throw failure
    } finally {
      clearTimeout(timer)
      if (reader) {
        try { reader.releaseLock() } catch {}
      }
      response?.body?.cancel?.().catch(() => {})
    }
  }

  return Object.freeze({ keyAvailable, synthesize })
}
