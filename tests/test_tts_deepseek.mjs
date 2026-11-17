import test from 'node:test'
import assert from 'node:assert/strict'
import { createDeepSeekTtsAdapter, deepSeekTtsBilledCharacters } from '../voice-tts-deepseek.mjs'
import { createTtsRuntime, TTS_DEFAULTS, TTS_SAMPLE, ttsSettings, validateTtsSettings } from '../voice-tts.mjs'

const audio = Buffer.from(Array.from({ length: 6000 }, (_, index) => index & 0xff))
const makeResponse = (status = 200, body = audio, contentType = 'audio/pcm') => ({
  ok: status >= 200 && status < 300,
  status,
  headers: new Headers({
    'content-type': contentType,
    ...(body?.length ? { 'content-length': String(body.length) } : {}),
  }),
  body: body === null ? null : new ReadableStream({
    start(controller) {
      controller.enqueue(body.subarray(0, 1))
      controller.enqueue(body.subarray(1, 4096))
      controller.enqueue(body.subarray(4096))
      controller.close()
    },
  }),
})
function playbackFixture({ failWrite = false, unconfirmed = false } = {}) {
  const state = { calls: [], frames: [], writes: 0, playing: false, cancelled: false, ended: false }
  let resolveDone, rejectDone
  const done = new Promise((resolve, reject) => { resolveDone = resolve; rejectDone = reject })
  const startPcmPlayback = options => {
    state.calls.push(options)
    return {
      ready: Promise.resolve(),
      done,
      async write(frame) {
        state.writes++
        state.frames.push(Buffer.from(frame))
        state.playing = true
        if (failWrite && state.writes === 2) throw Object.assign(new Error('private sink detail'), { code: 'PCM_PROCESS_FAILED' })
      },
      async end() {
        state.ended = true
        resolveDone({ completed: true })
      },
      async cancel() {
        state.cancelled = true
        const error = unconfirmed
          ? Object.assign(new Error('private process detail'), { code: 'PCM_TERMINATION_UNCONFIRMED', uncertain: true })
          : Object.assign(new Error('cancelled'), { code: 'PCM_ABORTED' })
        rejectDone(error)
        throw error
      },
    }
  }
  return { state, startPcmPlayback }
}

const settings = extra => ({ ...TTS_DEFAULTS, provider: 'deepseek', deepseekTextTransmissionAccepted: true, ...extra })

test('DeepSeek settings add an opt-in female default and read old saved configurations', () => {
  assert.equal(TTS_DEFAULTS.deepseekVoice, 'stella')
  assert.equal(TTS_DEFAULTS.deepseekTextTransmissionAccepted, false)
  assert.deepEqual(ttsSettings({ provider: 'off' }).deepseekVoice, 'stella')
  assert.throws(() => validateTtsSettings(settings({ deepseekTextTransmissionAccepted: false })), { code: 'TTS_DEEPSEEK_CONSENT_REQUIRED' })
  assert.throws(() => ttsSettings(settings({ deepseekVoice: 'unknown' })), { code: 'TTS_INVALID_SETTINGS' })
  assert.throws(() => ttsSettings({ ...settings(), deepseekApiKey: 'must-never-be-a-config-field' }), { code: 'TTS_INVALID_SETTINGS' })
})

test('DeepSeek billed-character limit counts Han characters twice', () => {
  assert.equal(deepSeekTtsBilledCharacters('你好 Hello 123'), 4 + 10)
  assert.equal(deepSeekTtsBilledCharacters('😀'), 1)
  assert.equal(deepSeekTtsBilledCharacters(null), 0)
})

test('missing DSH credentials fail before HTTP and expose only a boolean capability', async () => {
  let fetches = 0, playbacks = 0
  const adapter = createDeepSeekTtsAdapter({
    resolveDeepSeekApiKey: async () => undefined,
    fetch: async () => { fetches++; return makeResponse() },
    startPcmPlayback: () => { playbacks++; throw new Error('must not play') },
    platform: 'win32',
  })
  assert.equal(await adapter.keyAvailable(), false)
  await assert.rejects(adapter.synthesize({ text: TTS_SAMPLE, volume: .8 }), { code: 'TTS_DEEPSEEK_CREDENTIAL_MISSING' })
  assert.equal(fetches, 0)
  assert.equal(playbacks, 0)
})

test('HTTP streaming keeps frame alignment, bounds chunks and sends the DeepSeek wire contract', async () => {
  const playback = playbackFixture()
  const requests = []
  let resolves = 0
  const adapter = createDeepSeekTtsAdapter({
    async resolveDeepSeekApiKey() { resolves++; return { value: 'sk-PRIVATE-KEY', source: 'test-store' } },
    fetch: async (url, init) => { requests.push({ url, init }); return makeResponse() },
    startPcmPlayback: playback.startPcmPlayback,
    outputDevice: () => ({ backend: 'winmm', id: 'device-private' }),
    platform: 'win32',
  })
  assert.equal(await adapter.keyAvailable(), true)
  const result = await adapter.synthesize({ text: '你好，鲸语。', voice: 'stella', volume: .65 })
  assert.equal(resolves, 2, 'inspect and each synthesis resolve the key from the DSH credential seam')
  assert.equal(requests[0].url, 'https://api.deepseek.com/v1/tools/tts')
  assert.deepEqual(requests[0].init, {
    method: 'POST',
    headers: { Authorization: 'Bearer sk-PRIVATE-KEY', 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: '你好，鲸语。', voice_id: 'stella', format: 'pcm', filter_markdown: true }),
    redirect: 'error',
    signal: requests[0].init.signal,
  })
  assert.equal(requests[0].init.signal.aborted, false)
  assert.equal(playback.state.calls[0].format.encoding, 'pcm_s16le')
  assert.equal(playback.state.calls[0].format.sampleRate, 24000)
  assert.equal(playback.state.calls[0].format.channels, 1)
  assert.equal(playback.state.calls[0].volume, .65)
  assert.deepEqual(playback.state.calls[0].outputDevice, { backend: 'winmm', id: 'device-private' })
  assert.equal(playback.state.frames.reduce((sum, frame) => sum + frame.length, 0), audio.length)
  assert.ok(playback.state.frames.every(frame => frame.length > 0 && frame.length <= 4096 && frame.length % 2 === 0))
  assert.equal(playback.state.ended, true)
  assert.equal(result.completed, true)
  assert.equal(result.bytes, audio.length)
  assert.equal(result.audioSeconds, audio.length / (24000 * 2))
})

test('HTTP statuses map to fixed messages without returning provider response text', async t => {
  const cases = [
    [400, 'TTS_DEEPSEEK_REQUEST_REJECTED'],
    [401, 'TTS_DEEPSEEK_API_KEY_INVALID'],
    [402, 'TTS_DEEPSEEK_QUOTA_EXCEEDED'],
    [429, 'TTS_DEEPSEEK_RATE_LIMITED'],
    [503, 'TTS_DEEPSEEK_BUSY'],
    [504, 'TTS_DEEPSEEK_TIMEOUT'],
  ]
  for (const [status, code] of cases) await t.test(String(status), async () => {
    const playback = playbackFixture()
    const adapter = createDeepSeekTtsAdapter({
      resolveDeepSeekApiKey: async () => 'sk-private',
      fetch: async () => makeResponse(status, Buffer.from('PRIVATE_PROVIDER_RESPONSE')),
      startPcmPlayback: playback.startPcmPlayback,
      platform: 'win32',
    })
    await assert.rejects(adapter.synthesize({ text: 'PRIVATE-USER-TEXT', volume: .8 }), error => {
      assert.equal(error.code, code)
      assert.doesNotMatch(error.message, /PRIVATE|sk-private/)
      return true
    })
    assert.equal(playback.state.calls.length, 0)
  })
})

test('caller cancellation stops the response reader and waits for PCM playback closure', async () => {
  const playback = playbackFixture()
  const controller = new AbortController()
  let readerCancelled = false, first = true
  const reader = {
    async read() {
      if (first) {
        first = false
        return { value: audio.subarray(0, 4096), done: false }
      }
      return new Promise((resolve, reject) => controller.signal.addEventListener('abort', () => reject(new Error('fetch stream aborted')), { once: true }))
    },
    async cancel() { readerCancelled = true },
    releaseLock() {},
  }
  const adapter = createDeepSeekTtsAdapter({
    resolveDeepSeekApiKey: async () => 'sk-private',
    fetch: async (_url, init) => {
      assert.equal(init.signal.aborted, false)
      return { ok: true, status: 200, headers: new Headers({ 'content-type': 'audio/pcm' }), body: { getReader: () => reader } }
    },
    startPcmPlayback: playback.startPcmPlayback,
    platform: 'win32',
  })
  const request = adapter.synthesize({ text: TTS_SAMPLE, volume: .8, signal: controller.signal })
  const deadline = Date.now() + 1000
  while (playback.state.writes === 0 && Date.now() < deadline) await new Promise(resolve => setTimeout(resolve, 1))
  assert.equal(playback.state.writes, 1)
  controller.abort()
  await assert.rejects(request, { code: 'TTS_CANCELLED' })
  assert.equal(readerCancelled, true)
  assert.equal(playback.state.cancelled, true)
})

test('redirects are rejected before credentials can be forwarded', async () => {
  let request
  const playback = playbackFixture()
  const adapter = createDeepSeekTtsAdapter({
    resolveDeepSeekApiKey: async () => 'sk-private',
    fetch: async (url, init) => { request = { url, init }; throw new TypeError('private redirect detail') },
    startPcmPlayback: playback.startPcmPlayback,
    platform: 'win32',
  })
  await assert.rejects(adapter.synthesize({ text: 'PRIVATE-USER-TEXT', volume: .8 }), error => {
    assert.equal(error.code, 'TTS_DEEPSEEK_NETWORK')
    assert.doesNotMatch(error.message, /PRIVATE|sk-private/)
    return true
  })
  assert.equal(request.init.redirect, 'error')
  assert.equal(playback.state.calls.length, 0)
})

test('malformed or oversized audio never reaches PCM playback completion', async () => {
  for (const response of [makeResponse(200, audio, 'audio/wav'), makeResponse(200, Buffer.from([1]), 'audio/pcm')]) {
    const playback = playbackFixture()
    const adapter = createDeepSeekTtsAdapter({
      resolveDeepSeekApiKey: async () => 'sk-private',
      fetch: async () => response,
      startPcmPlayback: playback.startPcmPlayback,
      platform: 'win32',
    })
    await assert.rejects(adapter.synthesize({ text: 'PRIVATE-USER-TEXT', volume: .8 }), { code: 'TTS_INVALID_AUDIO' })
    assert.equal(playback.state.ended, false)
  }
})

test('PCM process failure is sanitized and an unconfirmed stop blocks playback', async t => {
  await t.test('confirmed process failure', async () => {
    const playback = playbackFixture({ failWrite: true })
    const adapter = createDeepSeekTtsAdapter({
      resolveDeepSeekApiKey: async () => 'sk-private',
      fetch: async () => makeResponse(),
      startPcmPlayback: playback.startPcmPlayback,
      platform: 'win32',
    })
    await assert.rejects(adapter.synthesize({ text: TTS_SAMPLE, volume: .8 }), error => {
      assert.equal(error.code, 'TTS_DEEPSEEK_PLAYBACK_FAILED')
      assert.doesNotMatch(error.message, /private|sk-private/)
      assert.equal(playback.state.cancelled, true)
      return true
    })
  })
  await t.test('uncertain native stop', async () => {
    const playback = playbackFixture({ failWrite: true, unconfirmed: true })
    const adapter = createDeepSeekTtsAdapter({
      resolveDeepSeekApiKey: async () => 'sk-private',
      fetch: async () => makeResponse(),
      startPcmPlayback: playback.startPcmPlayback,
      platform: 'win32',
    })
    await assert.rejects(adapter.synthesize({ text: TTS_SAMPLE, volume: .8 }), error => error.code === 'TTS_TERMINATION_UNCONFIRMED' && error.uncertain)
  })
})

test('runtime preview uses the DeepSeek provider and exposes key presence without the key', async () => {
  let config = settings()
  let keyReads = 0
  const playback = playbackFixture()
  const adapter = createDeepSeekTtsAdapter({
    resolveDeepSeekApiKey: async () => { keyReads++; return 'sk-secret' },
    fetch: async () => makeResponse(),
    startPcmPlayback: playback.startPcmPlayback,
    platform: 'win32',
  })
  const runtime = createTtsRuntime({
    getConfig: () => config,
    adapter: { async inspect() { return { platform: 'win32', playbackSupported: true, edgePlaybackSupported: true, edgeDependency: 'unchecked' } } },
    deepseekAdapter: adapter,
  })
  assert.equal((await runtime.inspect()).deepseekKeyAvailable, true)
  assert.equal(keyReads, 1, 'public inspection resolves the key once and exposes presence only')
  const result = await runtime.preview()
  assert.equal(keyReads, 2, 'synthesis resolves the key once immediately before its request')
  assert.equal(result.provider, 'deepseek')
  assert.equal(result.playbackCompleted, true)
  assert.equal(result.acousticConfirmation, false)
  assert.equal(playback.state.ended, true)
  await runtime.dispose()
})

test('Edge and local speech never query the DeepSeek credential resolver', async () => {
  for (const provider of ['edge', 'local']) {
    let keyReads = 0
    const config = provider === 'edge'
      ? { ...TTS_DEFAULTS, provider, edgeTextTransmissionAccepted: true }
      : { ...TTS_DEFAULTS, provider, localModelId: 'fixture-model', localModelPath: process.cwd() }
    const runtime = createTtsRuntime({
      getConfig: () => config,
      resolveDeepSeekApiKey: async () => { keyReads++; return 'sk-secret' },
      adapter: {
        async inspect() { return { platform: 'win32', playbackSupported: true, edgePlaybackSupported: true, edgeDependency: 'installed' } },
        async edge() { return { completed: true } },
      },
      localAdapter: {
        async inspect() { return { localReady: true, localSynthesisSupported: true } },
        async speak() { return { completed: true } },
        async probe() { return { localReady: true } },
      },
    })
    await runtime.preview()
    assert.equal(keyReads, 0)
    await runtime.dispose()
  }
})
