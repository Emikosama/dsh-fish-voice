import { mkdtemp, rmdir, unlink, writeFile } from 'node:fs/promises'
import { request as httpRequest } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'

// Match the encoded-file limit in the Windows audio player.
const maximumAudioBytes = 32 * 1024 * 1024
const control = /[\u0000-\u001f\u007f-\u009f]/u
const fields = ['baseUrl', 'model', 'voice', 'apiKeyEnv', 'format', 'textTransmissionAccepted']
const audioTypes = {
  wav: ['audio/wav', 'audio/x-wav', 'audio/wave', 'audio/vnd.wave'],
  mp3: ['audio/mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg-3'],
}
const fault = (code, message) => Object.assign(new Error(message), { code })
const invalidSettings = message => fault('TTS_INVALID_SETTINGS', message)
const invalidAudio = () => fault('TTS_INVALID_AUDIO', '自定义朗读服务返回了无效、超出限制或格式不匹配的音频')

function normalizeBaseUrl(value) {
  const invalid = () => invalidSettings('服务地址须使用 HTTPS，或使用 HTTP 访问 localhost、127.0.0.1 或 [::1]。请填写 API 基础地址。')
  if (typeof value !== 'string' || value.length > 2048 || control.test(value)) throw invalid()
  const base = value.trim()
  if (/[\\?#\s]/u.test(base)) throw invalid()
  const authority = /^https?:\/\/([^/]+)/iu.exec(base)?.[1]
  const url = URL.parse(base)
  if (!authority || authority.includes('@') || !url || url.username || url.password) throw invalid()
  // Check the original spelling, since URL parsing accepts aliases such as 127.1.
  if (url.protocol === 'http:' && !/^(?:localhost|127\.0\.0\.1|\[::1\])(?::[0-9]+)?$/iu.test(authority)) throw invalid()
  const path = url.pathname.replace(/\/+$/u, '').replace(/(?:\/+audio\/speech)+$/u, '')
  const normalized = url.origin + path
  if (normalized.length > 2048) throw invalid()
  return normalized
}

export function normalizeCustomTtsSettings(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).length !== fields.length || fields.some(field => !Object.hasOwn(value, field))) {
    throw invalidSettings('请填写完整的自定义朗读设置')
  }
  const { baseUrl, model, voice, apiKeyEnv, format, textTransmissionAccepted } = value
  const identifier = name => typeof name === 'string' && name.trim().length > 0 && name.length <= 256 && !control.test(name)
  if (!identifier(model) || !identifier(voice)) throw invalidSettings('请填写自定义朗读的模型和音色')
  if (apiKeyEnv !== null && (typeof apiKeyEnv !== 'string' || !/^[A-Za-z_][A-Za-z0-9_]{0,127}$/u.test(apiKeyEnv))) throw invalidSettings('API Key 环境变量名无效')
  if (!['wav', 'mp3'].includes(format) || typeof textTransmissionAccepted !== 'boolean') throw invalidSettings('自定义朗读的音频格式或同意选项无效')
  return { baseUrl: normalizeBaseUrl(baseUrl), model: model.trim(), voice: voice.trim(), apiKeyEnv, format, textTransmissionAccepted }
}

function matchesAudioFormat(bytes, format) {
  if (bytes.length < 12) return false
  if (format === 'wav') return bytes.toString('latin1', 0, 4) === 'RIFF' && bytes.toString('latin1', 8, 12) === 'WAVE'
  return bytes.toString('latin1', 0, 3) === 'ID3' || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)
}

function requestLoopback(url, { headers, body, signal }) {
  return new Promise((resolve, reject) => {
    const request = httpRequest(url, {
      method: 'POST', agent: false, signal, autoSelectFamily: true,
      // Bypass the global proxy and resolve localhost through numeric loopback only.
      lookup(_hostname, { all }, callback) {
        if (all) callback(null, [{ address: '127.0.0.1', family: 4 }, { address: '::1', family: 6 }])
        else callback(null, '127.0.0.1', 4)
      },
      headers: { ...headers, 'Content-Length': Buffer.byteLength(body), 'Accept-Encoding': 'identity' },
    }, incoming => {
      const status = incoming.statusCode
      const body = Readable.toWeb(incoming, { strategy: { highWaterMark: incoming.readableHighWaterMark, size: chunk => chunk.byteLength } })
      resolve({ status, ok: status >= 200 && status < 300, headers: { get: name => incoming.headers[name] ?? null }, body })
    })
    request.on('error', reject)
    request.end(body)
  })
}

export function assertCustomTtsConsent(settings) {
  if (settings.textTransmissionAccepted !== true) throw fault('TTS_CUSTOM_CONSENT_REQUIRED', '请在鱼应设置中确认将朗读文本发送到自定义服务，再开始朗读。')
}

export function createCustomTtsAdapter({ playback, resolveCustomTtsKey, timeoutMs = 120000 } = {}) {
  async function resolveKey(name, signal) {
    if (name === null) return null
    let key
    try { key = await resolveCustomTtsKey?.(name) }
    catch {
      signal?.throwIfAborted()
      throw fault('TTS_CUSTOM_CREDENTIAL_UNAVAILABLE', '无法读取自定义朗读 API Key，请检查宿主环境变量。')
    }
    signal?.throwIfAborted()
    const trimmed = typeof key === 'string' ? key.trim() : ''
    if (!trimmed) throw fault('TTS_CUSTOM_CREDENTIAL_MISSING', '未读取到自定义朗读 API Key，请配置对应的环境变量并重启宿主。')
    if (key.length > 8192 || !/^[\x21-\x7e]+$/u.test(trimmed) || control.test(key)) {
      throw fault('TTS_CUSTOM_INVALID_CREDENTIAL', '自定义朗读 API Key 无效，请检查 DSH 宿主环境变量中的密钥值。')
    }
    return trimmed
  }

  async function download(text, settings, key, signal, beforeRequest) {
    const { baseUrl, model, voice, format } = settings
    const timeout = AbortSignal.timeout(timeoutMs)
    const requestSignal = signal ? AbortSignal.any([signal, timeout]) : timeout
    const body = JSON.stringify({ model, voice, input: text, response_format: format })
    const headers = { 'Content-Type': 'application/json', ...(key !== null ? { Authorization: `Bearer ${key}` } : {}) }
    const networkFailure = () => {
      signal?.throwIfAborted()
      if (timeout.aborted) return fault('TTS_CUSTOM_TIMEOUT', '自定义朗读服务请求超时，请稍后重试。')
      return fault('TTS_CUSTOM_NETWORK', '无法连接自定义朗读服务或下载音频，请检查服务地址与连接。')
    }
    beforeRequest?.()
    requestSignal.throwIfAborted()
    let response
    try {
      const url = `${baseUrl}/audio/speech`
      const options = { method: 'POST', headers, body, redirect: 'manual', signal: requestSignal }
      response = await (url.startsWith('http:') ? requestLoopback(url, options) : fetch(url, options))
    } catch { throw networkFailure() }
    try {
      if (response.status >= 300 && response.status < 400) throw fault('TTS_CUSTOM_REDIRECT', '自定义朗读服务返回了重定向，请直接填写目标服务的基础地址。')
      if (response.status === 401 || response.status === 403) throw fault('TTS_CUSTOM_API_KEY_INVALID', '自定义朗读服务拒绝授权，请检查 API Key。')
      if (!response.ok) throw fault('TTS_CUSTOM_REQUEST_REJECTED', `自定义朗读服务请求失败（HTTP ${response.status}），请检查模型、音色与服务状态。`)
      const contentType = response.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()
      if (contentType && contentType !== 'application/octet-stream' && !audioTypes[format].includes(contentType)) throw invalidAudio()
      const advertisedLength = response.headers.get('content-length')
      if (advertisedLength !== null && (!/^\d+$/u.test(advertisedLength) || Number(advertisedLength) > maximumAudioBytes || Number(advertisedLength) < 12)) throw invalidAudio()
      if (!response.body) throw invalidAudio()
      let length = 0
      const chunks = []
      const reader = response.body.getReader()
      try {
        for (;;) {
          let packet
          try { packet = await reader.read() }
          catch { throw networkFailure() }
          if (packet.done) break
          length += packet.value.byteLength
          if (length > maximumAudioBytes) throw invalidAudio()
          chunks.push(packet.value)
        }
      } finally { reader.releaseLock() }
      const bytes = Buffer.concat(chunks, length)
      if (!matchesAudioFormat(bytes, format)) throw invalidAudio()
      return bytes
    } finally {
      await response.body?.cancel().catch(() => {})
    }
  }

  async function synthesize({ text, config, signal, beforeRequest }) {
    signal?.throwIfAborted()
    const settings = normalizeCustomTtsSettings(config.customTts)
    assertCustomTtsConsent(settings)
    const key = await resolveKey(settings.apiKeyEnv, signal)
    const bytes = await download(text, settings, key, signal, beforeRequest)
    signal?.throwIfAborted()
    let directory, path
    try {
      try {
        directory = await mkdtemp(join(tmpdir(), 'whale-custom-tts-'))
        path = join(directory, `speech.${settings.format}`)
        await writeFile(path, bytes, { flag: 'wx', mode: 0o600, signal })
      } catch {
        signal?.throwIfAborted()
        throw fault('TTS_CUSTOM_AUDIO_FILE_FAILED', '无法准备自定义朗读音频文件，请检查系统临时目录。')
      }
      beforeRequest?.()
      signal?.throwIfAborted()
      const result = await playback(path, config, signal)
      return { completed: result?.completed === true, bytes: bytes.length }
    } finally {
      if (path) await unlink(path).catch(() => {})
      if (directory) await rmdir(directory).catch(() => {})
    }
  }

  return { synthesize }
}
