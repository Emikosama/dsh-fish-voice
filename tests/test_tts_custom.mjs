import test from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { access, readFile } from 'node:fs/promises'
import http, { createServer } from 'node:http'
import { dirname, extname } from 'node:path'
import { createCustomTtsAdapter } from '../voice-tts-custom.mjs'
import { createTtsRuntime, TTS_DEFAULTS, TTS_SAMPLE, ttsSettings, validateTtsSettings } from '../voice-tts.mjs'

const wav = Buffer.alloc(2444)
wav.write('RIFF', 0)
wav.writeUInt32LE(wav.length - 8, 4)
wav.write('WAVEfmt ', 8)
wav.writeUInt32LE(16, 16)
wav.writeUInt16LE(1, 20)
wav.writeUInt16LE(1, 22)
wav.writeUInt32LE(24000, 24)
wav.writeUInt32LE(48000, 28)
wav.writeUInt16LE(2, 32)
wav.writeUInt16LE(16, 34)
wav.write('data', 36)
wav.writeUInt32LE(wav.length - 44, 40)

const settings = (baseUrl, extra) => ({
  ...TTS_DEFAULTS, provider: 'custom',
  customTts: { baseUrl, model: 'test-model', voice: 'test-voice', apiKeyEnv: null, format: 'wav', textTransmissionAccepted: true, ...extra },
})

async function listen(t, handler) {
  const calls = []
  const server = createServer(async (request, response) => {
    const chunks = []
    for await (const chunk of request) chunks.push(chunk)
    const body = Buffer.concat(chunks).toString('utf8')
    calls.push({ method: request.method, path: request.url, headers: request.headers, body })
    handler(response)
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  t.after(() => new Promise(resolve => {
    server.close(resolve)
    server.closeAllConnections()
  }))
  return { baseUrl: `http://127.0.0.1:${server.address().port}`, calls }
}

function fixture(t, providerConfig, { inspect, play, resolveCustomTtsKey } = {}) {
  let config = providerConfig
  let deepSeekKeyReads = 0
  const runtime = createTtsRuntime({
    getConfig: () => config,
    resolveDeepSeekApiKey: () => { deepSeekKeyReads++; return 'test-deepseek-secret' },
    resolveCustomTtsKey,
    adapter: {
      inspect: inspect ?? (async () => ({ platform: 'win32', playbackSupported: true, filePlaybackSupported: true })),
      play: play ?? (() => assert.fail('No playback expected')),
    },
  })
  t.after(() => runtime.dispose())
  return { runtime, deepSeekKeyReads: () => deepSeekKeyReads, update: extra => { config = { ...config, customTts: { ...config.customTts, ...extra } } } }
}

test('custom settings canonicalize API base URLs and preserve the exact legacy shape', () => {
  assert.deepEqual(ttsSettings(), TTS_DEFAULTS)
  assert.deepEqual(validateTtsSettings(TTS_DEFAULTS), TTS_DEFAULTS)
  assert.equal(ttsSettings(settings(' HTTPS://Example.COM:443/gateway/v1/// ')).customTts.baseUrl, 'https://example.com/gateway/v1')
  assert.equal(ttsSettings(settings('https://example.com/gateway/v1/audio/speech/')).customTts.baseUrl, 'https://example.com/gateway/v1')
  for (const baseUrl of ['http://localhost:9876', 'http://127.0.0.1', 'http://[::1]:9876']) {
    assert.equal(ttsSettings(settings(baseUrl)).customTts.baseUrl, baseUrl)
  }
  for (const baseUrl of [
    'http://example.com', 'http://127.0.0.2', 'http://127.1', 'http://2130706433', 'http://localhost.',
    'http://[0:0::1]', 'http://localhost@remote.invalid', 'https://@example.com', 'https://a:b@example.com/v1',
    'https://example.com/v1?', 'https://example.com/v1#', 'https://example.com/v1\n', 'https://example.com\\v1', 'file:///C:/v1',
  ]) assert.throws(() => ttsSettings(settings(baseUrl)), { code: 'TTS_INVALID_SETTINGS' }, baseUrl)
  for (const extra of [{ apiKey: 'private' }, { model: '  ' }, { voice: '\tbad' }, { apiKeyEnv: 'env.ref' }, { format: 'pcm' }, { textTransmissionAccepted: 'true' }]) {
    assert.throws(() => ttsSettings(settings('https://example.com', extra)), { code: 'TTS_INVALID_SETTINGS' })
  }
  assert.throws(() => ttsSettings({ provider: 'custom' }), { code: 'TTS_INVALID_SETTINGS' })
  const savedElsewhere = { ...settings('https://example.com'), provider: 'off' }
  assert.deepEqual(ttsSettings(savedElsewhere), savedElsewhere)
})

test('preview posts the fixed sample with the configured bearer alias and waits for the file player', async t => {
  const endpoint = await listen(t, response => response.writeHead(200, { 'Content-Type': 'application/octet-stream' }).end(wav))
  const phases = []
  let playedPath
  const { runtime, deepSeekKeyReads } = fixture(t, settings(`${endpoint.baseUrl}/gateway/v1/audio/speech/`, { apiKeyEnv: 'CUSTOM_TTS_KEY' }), {
    resolveCustomTtsKey(name) { assert.equal(name, 'CUSTOM_TTS_KEY'); return 'test-secret' },
    async play(path, config) {
      phases.push('play')
      playedPath = path
      assert.equal(extname(path), '.wav')
      assert.deepEqual(await readFile(path), wav)
      assert.equal(config.volume, 0.8)
      return { completed: true }
    },
  })
  const capabilities = await runtime.inspect()
  assert.equal(capabilities.executionTargets.custom, 'custom-api')
  assert.equal(capabilities.deepseekKeyAvailable, true)
  assert.equal(deepSeekKeyReads(), 1)
  assert.deepEqual(endpoint.calls, [])
  const result = await runtime.preview({ beforeRequest: () => phases.push('authorize') })
  assert.equal(deepSeekKeyReads(), 1)
  assert.deepEqual(result, { provider: 'custom', fallback: false, playbackCompleted: true, acousticConfirmation: false, audioBytes: wav.length })
  assert.deepEqual(phases, ['authorize', 'authorize', 'play'])
  const [request] = endpoint.calls
  assert.equal(request.method, 'POST')
  assert.equal(request.path, '/gateway/v1/audio/speech')
  assert.equal(request.headers.authorization, 'Bearer test-secret')
  assert.equal(request.headers['content-type'], 'application/json')
  assert.deepEqual(JSON.parse(request.body), { model: 'test-model', voice: 'test-voice', input: TTS_SAMPLE, response_format: 'wav' })
  assert.equal(runtime.status().state, 'completed')
  await assert.rejects(access(dirname(playedPath)), { code: 'ENOENT' })
})

test('anonymous MP3 synthesis uses the same file player and requires confirmed completion', async t => {
  const mp3 = await readFile(new URL('./fixtures/native-audio/tone.mp3', import.meta.url))
  const endpoint = await listen(t, response => response.writeHead(200, { 'Content-Type': 'audio/mpeg' }).end(mp3))
  let playedPath
  const { runtime, deepSeekKeyReads } = fixture(t, settings(endpoint.baseUrl, { format: 'mp3' }), {
    resolveCustomTtsKey: () => assert.fail('An anonymous request has no credential lookup'),
    async play(path) { playedPath = path; assert.equal(extname(path), '.mp3'); assert.deepEqual(await readFile(path), mp3); return { completed: false } },
  })
  await assert.rejects(runtime.speak('这段文本应原样发送'), { code: 'TTS_COMPLETION_UNCONFIRMED' })
  assert.equal(deepSeekKeyReads(), 0)
  assert.equal(endpoint.calls.length, 1)
  const [request] = endpoint.calls
  assert.equal(request.headers.authorization, undefined)
  assert.equal(request.path, '/audio/speech')
  assert.deepEqual(JSON.parse(request.body), { model: 'test-model', voice: 'test-voice', input: '这段文本应原样发送', response_format: 'mp3' })
  await assert.rejects(access(dirname(playedPath)), { code: 'ENOENT' })
})

test('HTTP loopback reaches localhost directly even with the global proxy enabled', async t => {
  if (typeof http.setGlobalProxyFromEnv !== 'function') return t.skip('requires Node 24.14+ global proxy test support')
  const proxy = await listen(t, response => response.writeHead(502).end())
  const endpoint = await listen(t, response => response.end(wav))
  const restoreProxy = http.setGlobalProxyFromEnv({ HTTP_PROXY: proxy.baseUrl, NO_PROXY: '' })
  try {
    // Prove that a request using the ambient agent really is intercepted.
    const status = await new Promise((resolve, reject) => {
      http.get(endpoint.baseUrl, response => { response.resume(); resolve(response.statusCode) }).on('error', reject)
    })
    assert.equal(status, 502)
    assert.equal(proxy.calls.length, 1)
    assert.equal(endpoint.calls.length, 0)
    const { runtime } = fixture(t, settings(endpoint.baseUrl.replace('127.0.0.1', 'localhost')), {
      play: async () => ({ completed: true }),
    })
    assert.equal((await runtime.preview()).playbackCompleted, true)
    assert.equal(proxy.calls.length, 1)
    assert.equal(endpoint.calls.length, 1)
  } finally { restoreProxy() }
})

test('consent, file playback capability and configured credentials are required before HTTP', async t => {
  const endpoint = await listen(t, response => response.end(wav))
  const config = settings(endpoint.baseUrl, { apiKeyEnv: 'CUSTOM_TTS_KEY', textTransmissionAccepted: false })
  const noConsent = fixture(t, config, { inspect: () => assert.fail('Playback inspection is unnecessary without consent') })
  await assert.rejects(noConsent.runtime.preview(), { code: 'TTS_CUSTOM_CONSENT_REQUIRED' })
  const noDecoder = fixture(t, settings(endpoint.baseUrl, { apiKeyEnv: 'CUSTOM_TTS_KEY' }), {
    inspect: async () => ({ playbackSupported: true, filePlaybackSupported: false }),
    resolveCustomTtsKey: () => assert.fail('Playback capability must be checked first'),
  })
  await assert.rejects(noDecoder.runtime.preview(), { code: 'TTS_CUSTOM_PLAYBACK_UNAVAILABLE' })
  const missing = fixture(t, settings(endpoint.baseUrl, { apiKeyEnv: 'CUSTOM_TTS_KEY' }))
  await assert.rejects(missing.runtime.preview(), { code: 'TTS_CUSTOM_CREDENTIAL_MISSING' })
  assert.equal(endpoint.calls.length, 0)
})

test('credential resolution and the playback boundary recheck settings and authorization', async t => {
  const endpoint = await listen(t, response => response.end(wav))
  const began = Promise.withResolvers()
  const credential = Promise.withResolvers()
  const { runtime, update } = fixture(t, settings(endpoint.baseUrl, { apiKeyEnv: 'CUSTOM_TTS_KEY' }), {
    resolveCustomTtsKey() { began.resolve(); return credential.promise },
  })
  const rejected = assert.rejects(runtime.preview(), { code: 'TTS_CONFIG_CHANGED' })
  await began.promise
  update({ textTransmissionAccepted: false })
  credential.resolve('test-secret')
  await rejected
  assert.equal(endpoint.calls.length, 0)

  update({ textTransmissionAccepted: true })
  let checks = 0
  await assert.rejects(runtime.preview({ beforeRequest() {
    if (++checks === 2) throw Object.assign(new Error('authorization revoked'), { code: 'AUTHORIZATION_REQUIRED' })
  } }), { code: 'AUTHORIZATION_REQUIRED' })
  assert.equal(endpoint.calls.length, 1)
})

test('redirects never reach the target and remote response text stays out of errors', async t => {
  const other = await listen(t, response => response.end(wav))
  const redirected = await listen(t, response => response.writeHead(307, { Location: `${other.baseUrl}/private-target` }).end('private-response'))
  const { runtime } = fixture(t, settings(redirected.baseUrl, { apiKeyEnv: 'CUSTOM_TTS_KEY' }), { resolveCustomTtsKey: () => 'test-secret' })
  await assert.rejects(runtime.preview(), { code: 'TTS_CUSTOM_REDIRECT' })
  assert.equal(other.calls.length, 0)
  assert.equal(redirected.calls.length, 1)

  const unauthorized = await listen(t, response => response.writeHead(401).end('private-response'))
  const denied = fixture(t, settings(unauthorized.baseUrl, { apiKeyEnv: 'CUSTOM_TTS_KEY' }), { resolveCustomTtsKey: () => 'test-secret' })
  await assert.rejects(denied.runtime.speak('private-input'), error => {
    assert.equal(error.code, 'TTS_CUSTOM_API_KEY_INVALID')
    assert.doesNotMatch(error.stack, /private-response|private-input|test-secret|127\.0\.0\.1/u)
    return true
  })
})

test('WAV/MP3 mismatch and oversized responses cannot reach the player', async t => {
  const oversized = 32 * 1024 * 1024 + 1
  for (const [label, handler] of [
    ['mismatched audio bytes', response => response.end('ID3not-a-wav-file')],
    ['non-audio content type', response => response.writeHead(200, { 'Content-Type': 'application/json' }).end(wav)],
    ['oversized content length', response => response.writeHead(200, { 'Content-Length': oversized }).end(wav)],
    ['oversized chunked response', response => {
      const chunk = Buffer.alloc(1024 * 1024)
      for (let n = 0; n < 33; n++) response.write(chunk)
      response.end()
    }],
  ]) await t.test(label, async subtest => {
    const endpoint = await listen(subtest, handler)
    const { runtime } = fixture(subtest, settings(endpoint.baseUrl))
    await assert.rejects(runtime.preview(), { code: 'TTS_INVALID_AUDIO' })
  })
})

test('cancel during download stops before playback, and a download timeout has a distinct receipt', async t => {
  const started = Promise.withResolvers()
  const endpoint = await listen(t, response => {
    response.write(wav.subarray(0, 12))
    started.resolve()
  })
  const config = settings(endpoint.baseUrl)
  const { runtime } = fixture(t, config)
  const rejected = assert.rejects(runtime.preview(), { code: 'TTS_CANCELLED' })
  await started.promise
  assert.deepEqual(await runtime.cancel(), { status: 'cancelled' })
  await rejected
  const adapter = createCustomTtsAdapter({ timeoutMs: 30, playback: () => assert.fail('No playback expected') })
  await assert.rejects(adapter.synthesize({ text: 'test', config }), { code: 'TTS_CUSTOM_TIMEOUT' })
})

test('cancel during playback waits for the player to stop and then removes the file', async t => {
  const endpoint = await listen(t, response => response.end(wav))
  const playing = Promise.withResolvers(), interrupted = Promise.withResolvers(), stopped = Promise.withResolvers()
  const { runtime } = fixture(t, settings(endpoint.baseUrl), {
    async play(path, config, signal) {
      signal.addEventListener('abort', () => interrupted.resolve(), { once: true })
      playing.resolve(path)
      await stopped.promise
      signal.throwIfAborted()
    },
  })
  const rejected = assert.rejects(runtime.preview(), { code: 'TTS_CANCELLED' })
  const path = await playing.promise
  const cancel = runtime.cancel()
  await interrupted.promise
  await access(path)
  stopped.resolve()
  assert.deepEqual(await cancel, { status: 'cancelled' })
  await rejected
  await assert.rejects(access(dirname(path)), { code: 'ENOENT' })
})
