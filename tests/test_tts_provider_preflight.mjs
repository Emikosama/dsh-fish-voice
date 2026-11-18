import test from 'node:test'
import assert from 'node:assert/strict'
import { createTtsRuntime, createWindowsTtsAdapter, TTS_DEFAULTS } from '../voice-tts.mjs'

const device = { backend: 'winmm', id: 'test-device' }
const nativeCapabilities = { ok: true, playbackSupported: true, filePlaybackSupported: true }
const makeConfig = extra => ({ ...TTS_DEFAULTS, deepseekTextTransmissionAccepted: true, ...extra })

test('local speech checks its output, then uses only the local model and native file player', async t => {
  const calls = []
  let failOutputProbe = false
  const adapter = createWindowsTtsAdapter({
    platform: 'win32', outputDevice: () => device,
    async runner(command, args, payload, options) {
      assert.equal(command, 'powershell.exe')
      assert.match(args.at(-1), /tts_windows\.ps1$/)
      assert.equal(options.nativeAudioErrors, true)
      calls.push(payload)
      if (payload.op === 'inspect') {
        if (failOutputProbe) throw Object.assign(new Error('output probe did not exit'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
        return nativeCapabilities
      }
      assert.equal(payload.op, 'play')
      return { ok: true, completed: true }
    },
  })
  const localAdapter = {
    async inspect() { return { localReady: true } },
    async speak(_text, config, signal) { return adapter.play('test.wav', config, signal) },
  }
  const runtime = createTtsRuntime({
    getConfig: () => makeConfig({ provider: 'local' }), adapter, localAdapter,
    async resolveDeepSeekApiKey() { assert.fail('local speech must not read the DeepSeek credential') },
  })
  t.after(() => runtime.dispose())
  assert.equal((await runtime.speak('你好')).provider, 'local')
  assert.deepEqual(calls, [
    { op: 'inspect', outputDevice: device },
    { op: 'play', path: 'test.wav', volume: 0.8, outputDevice: device },
  ])
  failOutputProbe = true
  await assert.rejects(runtime.inspect(), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  assert.equal(runtime.status().blocked, true)
  await assert.rejects(runtime.speak('你好'), { code: 'TTS_BLOCKED' })
})

test('native output device failures reject DeepSeek speech before credential lookup and preserve the exact error', async t => {
  const adapter = createWindowsTtsAdapter({
    platform: 'win32', outputDevice: () => device,
    async runner(_command, _args, payload) {
      assert.deepEqual(payload, { op: 'inspect', outputDevice: device })
      throw Object.assign(new Error('private output endpoint'), { code: 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE' })
    },
  })
  const runtime = createTtsRuntime({
    getConfig: () => makeConfig(), adapter,
    async resolveDeepSeekApiKey() { assert.fail('the selected device is unavailable') },
  })
  t.after(() => runtime.dispose())
  await assert.rejects(runtime.speak('PRIVATE'), error => {
    assert.equal(error.code, 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE')
    assert.doesNotMatch(error.message, /test-device|PRIVATE|private/)
    return true
  })
})

test('Windows playback probe failures keep their safe reason and a local next step', async t => {
  let reason
  const adapter = createWindowsTtsAdapter({
    platform: 'win32',
    async runner() { throw Object.assign(new Error('private PowerShell failure'), { code: reason }) },
  })
  const runtime = createTtsRuntime({
    getConfig: () => makeConfig(), adapter,
    async resolveDeepSeekApiKey() { assert.fail('the Windows audio check failed') },
  })
  t.after(() => runtime.dispose())
  for (reason of ['TTS_PROCESS_FAILED', 'TTS_PROCESS_START_FAILED', 'TTS_INVALID_RESPONSE', 'TTS_TIMEOUT']) {
    assert.equal((await runtime.inspect()).reason, reason)
    await assert.rejects(runtime.speak('PRIVATE'), error => {
      assert.equal(error.code, reason)
      assert.match(error.message, /Windows.*检查系统播放组件/)
      assert.doesNotMatch(error.message, /PRIVATE|private/)
      return true
    })
  }
})

test('DeepSeek PCM works when the Windows file decoder is unavailable', async t => {
  const adapter = createWindowsTtsAdapter({
    platform: 'win32',
    async runner() { return { ...nativeCapabilities, filePlaybackSupported: false } },
  })
  let config = makeConfig()
  const runtime = createTtsRuntime({
    getConfig: () => config, adapter,
    deepseekAdapter: {
      async keyAvailable() { return true },
      async synthesize() { return { completed: true } },
    },
    localAdapter: {
      async inspect() { return { localReady: true } },
      async speak() { assert.fail('local files require the decoder') },
    },
  })
  t.after(() => runtime.dispose())
  const status = await runtime.inspect()
  assert.equal(status.playbackSupported, true)
  assert.equal(status.filePlaybackSupported, false)
  assert.equal(status.deepseekKeyAvailable, true)
  assert.equal((await runtime.speak('你好')).provider, 'deepseek')
  config = { ...config, provider: 'local' }
  await assert.rejects(runtime.speak('你好'), { code: 'TTS_LOCAL_PLAYBACK_UNAVAILABLE' })
})
