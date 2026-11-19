import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { createTtsRuntime, createWindowsTtsAdapter, runTtsProcess, TTS_DEFAULTS, TTS_SAMPLE, ttsSettings, validateTtsSettings } from '../voice-tts.mjs'

function fixture(options = {}) {
  let config = { ...TTS_DEFAULTS, provider: 'deepseek', deepseekTextTransmissionAccepted: true, ...options.config }
  const calls = []
  const adapter = {
    async inspect() { calls.push(['inspect']); return { platform: 'win32', playbackSupported: true, filePlaybackSupported: true } },
    ...options.adapter,
  }
  const deepseekAdapter = {
    async keyAvailable() { return true },
    async synthesize({ text }) { calls.push(['deepseek', text]); return { completed: true } },
    ...options.deepseekAdapter,
  }
  const runtime = createTtsRuntime({ getConfig: () => config, adapter, deepseekAdapter })
  return { runtime, calls, adapter, set: v => { config = { ...config, ...v } } }
}

test('fresh and migrated settings use installed Windows voices and preserve an enabled DeepSeek choice', () => {
  assert.deepEqual(ttsSettings(), TTS_DEFAULTS)
  assert.equal(TTS_DEFAULTS.provider, 'system')
  assert.equal(TTS_DEFAULTS.deepseekVoice, 'stella')
  for (const provider of [undefined, 'unconfigured', 'edge']) {
    const legacy = {
      provider, edgeVoice: 'zh-CN-XiaoyiNeural', edgeTextTransmissionAccepted: true,
      deepseekTextTransmissionAccepted: true, deepseekVoice: 'tide', volume: 0.45,
    }
    assert.deepEqual(ttsSettings(legacy), { ...TTS_DEFAULTS, volume: 0.45 })
  }
  for (const provider of ['deepseek', 'local', 'off']) {
    const expected = { ...TTS_DEFAULTS, provider, deepseekVoice: 'tide', deepseekTextTransmissionAccepted: true }
    assert.deepEqual(ttsSettings({ ...expected, systemFallback: true, edgeTextTransmissionAccepted: true }), expected)
  }
  const legacySystem = { provider: 'system', systemVoice: 'legacy', systemFallback: true }
  assert.deepEqual(ttsSettings(legacySystem), TTS_DEFAULTS)
  assert.deepEqual(ttsSettings({ ...TTS_DEFAULTS, provider: 'deepseek' }), TTS_DEFAULTS)
})

test('strict settings validate current provider, exact schema and consent type', () => {
  assert.deepEqual(validateTtsSettings(TTS_DEFAULTS), TTS_DEFAULTS)
  for (const provider of ['edge', 'unconfigured', 'arbitrary-provider']) {
    assert.throws(() => validateTtsSettings({ ...TTS_DEFAULTS, provider }), { code: 'TTS_INVALID_SETTINGS' })
  }
  assert.throws(() => validateTtsSettings({ ...TTS_DEFAULTS, edgeTextTransmissionAccepted: true }), { code: 'TTS_INVALID_SETTINGS' })
  assert.throws(() => validateTtsSettings({ ...TTS_DEFAULTS, deepseekTextTransmissionAccepted: 'true' }), { code: 'TTS_INVALID_SETTINGS' })
  assert.throws(() => ttsSettings({ endpoint: 'https://evil.invalid' }), { code: 'TTS_INVALID_SETTINGS' })
  assert.throws(() => ttsSettings({ provider: 'arbitrary-provider' }), { code: 'TTS_INVALID_SETTINGS' })
})

test('inspection reads capability only and preview uses the fixed sample', async () => {
  const f = fixture()
  assert.equal((await f.runtime.inspect()).gpuSupported, false)
  assert.deepEqual(f.calls, [['inspect']])
  const out = await f.runtime.preview()
  assert.deepEqual(f.calls.at(-1), ['deepseek', TTS_SAMPLE])
  assert.deepEqual(out, { provider: 'deepseek', fallback: false, playbackCompleted: true, acousticConfirmation: false })
})

test('DeepSeek failure preserves its exact code and bounded playback facts', async () => {
  const f = fixture({ deepseekAdapter: {
    async synthesize() {
      throw Object.assign(new Error('DeepSeek TTS 请求过多'), {
        code: 'TTS_DEEPSEEK_RATE_LIMITED',
        deepseekDiagnostic: { playbackPossible: false, httpStatus: 429, private: 'response body' },
      })
    },
  } })
  await assert.rejects(f.runtime.speak('test'), {
    code: 'TTS_DEEPSEEK_RATE_LIMITED', deepseekDiagnostic: { playbackPossible: false, httpStatus: 429 },
  })
  assert.equal(f.runtime.status().state, 'failed')
  assert.equal(f.runtime.status().fallback, false)
})

test('cancellation stops pending DeepSeek and rejects concurrent double-click', async () => {
  const { promise: started, resolve: began } = Promise.withResolvers()
  const f = fixture({ deepseekAdapter: { async synthesize({ signal }) {
    const cancel = new Promise((_, reject) => signal.addEventListener('abort', () => reject(new Error('cancelled')), { once: true }))
    began()
    await cancel
  } } })
  const pending = f.runtime.preview()
  const failed = assert.rejects(pending, { code: 'TTS_CANCELLED' })
  await started
  await assert.rejects(f.runtime.preview(), { code: 'TTS_BUSY' })
  assert.deepEqual(await f.runtime.cancel(), { status: 'cancelled' })
  await failed
  assert.equal(f.runtime.status().state, 'cancelled')
})

test('consent changes while inspecting prevent network transmission', async () => {
  const f = fixture()
  const original = f.adapter.inspect
  f.adapter.inspect = async signal => {
    const caps = await original(signal)
    f.set({ deepseekTextTransmissionAccepted: false })
    return caps
  }
  await assert.rejects(f.runtime.preview(), { code: 'TTS_CONFIG_CHANGED' })
  assert.deepEqual(f.calls, [['inspect']])
})

test('unconfirmed process termination locks output', async () => {
  const f = fixture({ deepseekAdapter: { async synthesize() {
    throw Object.assign(new Error('uncertain'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  } } })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_TERMINATION_UNCONFIRMED' })
  assert.equal(f.runtime.status().blocked, true)
  assert.deepEqual(await f.runtime.cancel(), { status: 'unconfirmed' })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_BLOCKED' })
})

test('non-Windows inspection and speech never launch a native process or an online request', async () => {
  const adapter = createWindowsTtsAdapter({ platform: 'linux', runner: () => { throw new Error('must not spawn') } })
  assert.equal((await adapter.inspect()).playbackSupported, false)
  const f = fixture({ adapter })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_PLATFORM_UNSUPPORTED' })
  assert.deepEqual(f.calls, [])
})

function childFixture({ closeOnKill = true, autoReply } = {}) {
  const child = new EventEmitter(), writes = [], kills = []
  child.stdout = new PassThrough(); child.stderr = new PassThrough(); child.stdin = new PassThrough()
  child.stdin.on('data', c => writes.push(c.toString()))
  child.kill = kind => { kills.push(kind); if (closeOnKill) setTimeout(() => child.emit('close', null), 2); return true }
  const spawnProcess = (command, args, options) => {
    child.invocation = { command, args, options }
    if (autoReply) setTimeout(() => { child.stdout.write(autoReply); child.emit('close', 0) }, 5)
    return child
  }
  return { child, spawnProcess, writes, kills }
}

test('process runner uses stdin, no shell, and waits for close on cancellation', async () => {
  const f = childFixture(), controller = new AbortController()
  const p = runTtsProcess('python', ['helper.py'], { text: 'PRIVATE' }, { signal: controller.signal, spawnProcess: f.spawnProcess })
  const failure = assert.rejects(p, { code: 'TTS_CANCELLED' })
  controller.abort()
  assert.equal(f.child.invocation.options.shell, false)
  assert.equal(JSON.stringify(f.child.invocation).includes('PRIVATE'), false)
  assert.equal(f.writes.join('').includes('PRIVATE'), true)
  await failure
  assert.equal(f.kills.length, 1)
})

test('process timeout observes termination; refusal to exit is explicitly unconfirmed', async () => {
  const closed = childFixture()
  await assert.rejects(runTtsProcess('x', [], {}, { spawnProcess: closed.spawnProcess, timeoutMs: 4, killGraceMs: 30 }), { code: 'TTS_TIMEOUT' })
  const stuck = childFixture({ closeOnKill: false })
  await assert.rejects(runTtsProcess('x', [], {}, { spawnProcess: stuck.spawnProcess, timeoutMs: 2, killGraceMs: 12 }), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  assert.equal(stuck.kills.length, 2)
})

test('process output is bounded and errors do not contain stderr text', async () => {
  const f = childFixture()
  const p = runTtsProcess('x', [], {}, { spawnProcess: f.spawnProcess, timeoutMs: 100 })
  f.child.stderr.write('PRIVATE SECRET')
  f.child.emit('close', 1)
  await assert.rejects(p, error => error.code === 'TTS_PROCESS_FAILED' && !error.message.includes('PRIVATE'))
  const good = childFixture({ autoReply: '{"ok":true,"completed":true}' })
  assert.equal((await runTtsProcess('x', [], {}, { spawnProcess: good.spawnProcess })).completed, true)
  const big = childFixture({ autoReply: 'x'.repeat(200) })
  await assert.rejects(runTtsProcess('x', [], {}, { spawnProcess: big.spawnProcess, maxOutput: 100 }), { code: 'TTS_INVALID_RESPONSE' })
})

test('child error after spawn does not falsely confirm termination', async () => {
  const f = childFixture({ closeOnKill: false })
  f.child.pid = 1234
  const pending = runTtsProcess('x', [], {}, { spawnProcess: f.spawnProcess, timeoutMs: 100, killGraceMs: 12 })
  f.child.emit('error', new Error('synthetic kill permission error'))
  await assert.rejects(pending, { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
})

test('native completion survives diagnostics coalesced after the completion line', async () => {
  const marker = 'generated 12 frames, 8000 bytes of WAV audio (24000 Hz)\n'
  const diagnostic = 'PRIVATE diagnostic detail\n'.repeat(200)
  const f = childFixture()
  const pending = runTtsProcess('x', [], null, { spawnProcess: f.spawnProcess, captureJson: false })
  f.child.stderr.write(diagnostic + marker + diagnostic)
  f.child.emit('close', 0)
  assert.deepEqual(await pending, { ok: true, completed: true, audioFrames: 12 })
})

test('native completion survives every marker split followed by a long output path', async () => {
  const marker = 'generated 23 frames, 16000 bytes of WAV audio (24000 Hz)'
  const trailing = '\ntimings: prompt eval 1.00s + generation 2.00s + vocoder 1.00s = total 4.00s\nwrote ' + 'PRIVATE-directory/'.repeat(40) + 'speech.wav\n'
  for (let at = 1; at < marker.length; at++) {
    const f = childFixture()
    const pending = runTtsProcess('x', [], null, { spawnProcess: f.spawnProcess, captureJson: false })
    f.child.stderr.write('PRIVATE prompt\n' + marker.slice(0, at))
    f.child.stderr.write(marker.slice(at) + trailing)
    f.child.emit('close', 0)
    assert.deepEqual(await pending, { ok: true, completed: true, audioFrames: 23 }, `split ${at}`)
  }
})

test('native diagnostics without a complete marker never confirm generated frames', async () => {
  const f = childFixture()
  const pending = runTtsProcess('x', [], null, { spawnProcess: f.spawnProcess, captureJson: false })
  f.child.stderr.write('generated 23 frames, 16000 bytes of WAV audio (' + 'PRIVATE'.repeat(1000))
  f.child.stderr.write('24000 Hz)\n')
  f.child.emit('close', 0)
  assert.deepEqual(await pending, { ok: true, completed: true, audioFrames: null })
})

test('static runtime checks capture both UTF-8 streams only after confirmed close', async () => {
  const f = childFixture()
  let settled = false
  const pending = runTtsProcess('x', [], null, { spawnProcess: f.spawnProcess, captureText: true })
    .then(value => { settled = true; return value })
  for (const byte of Buffer.from('版本 12110\n')) f.child.stdout.write(Buffer.of(byte))
  for (const byte of Buffer.from('诊断 🐳\n')) f.child.stderr.write(Buffer.of(byte))
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(settled, false)
  f.child.emit('close', 0)
  assert.deepEqual(await pending, { ok: true, stdout: '版本 12110\n', stderr: '诊断 🐳\n' })
})

test('static runtime capture bounds the combined raw bytes of both streams', async () => {
  for (const over of [false, true]) {
    const f = childFixture()
    const pending = runTtsProcess('x', [], null, { spawnProcess: f.spawnProcess, captureText: true, maxOutput: 8 })
    const expected = over ? assert.rejects(pending, { code: 'TTS_INVALID_RESPONSE' }) : pending
    f.child.stdout.write(Buffer.from('你好'))
    f.child.stderr.write(over ? '123' : '12')
    if (!over) f.child.emit('close', 0)
    const result = await expected
    if (!over) assert.deepEqual(result, { ok: true, stdout: '你好', stderr: '12' })
    else assert.equal(f.kills.length, 1)
  }
})

test('failed static runtime checks never expose captured diagnostic text', async () => {
  const f = childFixture()
  const pending = runTtsProcess('x', [], null, { spawnProcess: f.spawnProcess, captureText: true })
  const failed = assert.rejects(pending, error => error.code === 'TTS_PROCESS_FAILED' && !JSON.stringify(error).includes('PRIVATE') && !error.message.includes('PRIVATE'))
  f.child.stdout.write('PRIVATE output'); f.child.stderr.write('PRIVATE error')
  f.child.emit('close', 1)
  await failed
})

const nextTurn = () => new Promise(resolve => setImmediate(resolve))

test('Windows inspection preserves success and ordinary degraded results', async () => {
  for (const failed of [null, 'powershell.exe']) {
    const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async (command, _args, payload) => {
      assert.deepEqual(payload, { op: 'inspect', outputDevice: null })
      if (command === failed) throw Object.assign(new Error('failure'), { code: 'TTS_PROCESS_FAILED' })
      return { ok: true, playbackSupported: true, filePlaybackSupported: false }
    } })
    const result = await adapter.inspect()
    assert.equal(result.playbackSupported, failed !== 'powershell.exe')
    assert.equal(result.filePlaybackSupported, false)
    assert.equal(result.reason, failed === 'powershell.exe' ? 'TTS_PROCESS_FAILED' : null)
  }
})

test('process JSON decoding preserves Chinese and emoji across every UTF-8 chunk boundary', async () => {
  const expected = { ok: true, voices: [{ id: '中文🐳', name: '鲸语', culture: 'zh-CN' }] }
  const bytes = Buffer.from(JSON.stringify(expected))
  for (let cut = 1; cut < bytes.length; cut++) {
    const f = childFixture()
    const pending = runTtsProcess('x', [], {}, { spawnProcess: f.spawnProcess })
    f.child.stdout.write(bytes.subarray(0, cut))
    f.child.stdout.write(bytes.subarray(cut))
    f.child.emit('close', 0)
    assert.deepEqual(await pending, expected, `split at byte ${cut}`)
  }
})

test('multibyte process output enforces the exact raw-byte limit', async () => {
  const expected = { ok: true, voice: '中文🐳' }, bytes = Buffer.from(JSON.stringify(expected))
  for (const maxOutput of [bytes.length, bytes.length - 1]) {
    const f = childFixture()
    const pending = runTtsProcess('x', [], {}, { spawnProcess: f.spawnProcess, maxOutput })
    const oversized = maxOutput < bytes.length ? assert.rejects(pending, { code: 'TTS_INVALID_RESPONSE' }) : null
    for (const byte of bytes) f.child.stdout.write(Buffer.from([byte]))
    if (oversized) await oversized
    else { f.child.emit('close', 0); assert.deepEqual(await pending, expected) }
  }
})

test('public inspection and every output entry share one active operation', async () => {
  const f = fixture()
  const original = f.adapter.inspect
  let release
  f.adapter.inspect = async signal => { await new Promise(resolve => { release = resolve }); return original(signal) }
  for (const start of [() => f.runtime.inspect(), () => f.runtime.preview()]) {
    const pending = start()
    assert.equal(f.runtime.status().busy, true)
    await assert.rejects(f.runtime.inspect(), { code: 'TTS_BUSY' })
    await assert.rejects(f.runtime.speak('test'), { code: 'TTS_BUSY' })
    await assert.rejects(f.runtime.verifyLocalTts(), { code: 'TTS_BUSY' })
    release()
    await pending
    assert.equal(f.runtime.status().busy, false)
  }
})

test('public inspection rejects pre-abort, synchronous failure and calls after disposal without retaining active', async () => {
  const f = fixture()
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(f.runtime.inspect(controller.signal), { name: 'AbortError' })
  assert.equal(f.calls.length, 0)
  const original = f.adapter.inspect
  f.adapter.inspect = () => { throw Object.assign(new Error('failure'), { code: 'TTS_PROCESS_FAILED' }) }
  await assert.rejects(f.runtime.inspect(), { code: 'TTS_PROCESS_FAILED' })
  assert.equal(f.runtime.status().busy, false)
  assert.equal(f.runtime.status().inspected, false)
  f.adapter.inspect = original
  await f.runtime.inspect()
  await f.runtime.dispose()
  await assert.rejects(f.runtime.inspect(), { code: 'TTS_BLOCKED' })
  assert.deepEqual(f.calls, [['inspect']])
})

test('public inspection cannot commit partial, cancelled or stale local capability results', async () => {
  for (const outcome of ['cancelled', 'changed', 'uncertain']) {
    let release, localSignal
    let config = { ...TTS_DEFAULTS, provider: 'local' }
    const localResult = new Promise(resolve => { release = resolve })
    const f = fixture()
    const runtime = createTtsRuntime({ getConfig: () => config, adapter: f.adapter, localAdapter: {
      inspect(_config, signal) { localSignal = signal; return localResult },
    } })
    const controller = new AbortController()
    const pending = runtime.inspect(controller.signal)
    const failed = assert.rejects(pending, { code: outcome === 'cancelled' ? 'TTS_CANCELLED' : outcome === 'changed' ? 'TTS_CONFIG_CHANGED' : 'TTS_TERMINATION_UNCONFIRMED' })
    await nextTurn()
    assert.equal(runtime.status().inspected, false, 'native inspection alone is not a complete capability check')
    assert.equal(runtime.status().busy, true)
    if (outcome === 'changed') config = { ...config, provider: 'off' }
    else controller.abort()
    if (outcome !== 'changed') assert.equal(localSignal.aborted, true)
    if (outcome === 'uncertain') release(Promise.reject(Object.assign(new Error('uncertain'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })))
    else release({ localReady: true })
    await failed
    assert.equal(runtime.status().inspected, false)
    assert.equal(runtime.status().busy, false)
    assert.equal(runtime.status().blocked, outcome === 'uncertain')
    if (outcome === 'uncertain') await assert.rejects(runtime.inspect(), { code: 'TTS_BLOCKED' })
  }
})

test('reentrant cancel from inspection startup waits for the registered operation', async () => {
  const f = fixture()
  let release, stop, stopped = false
  f.adapter.inspect = signal => {
    stop = f.runtime.cancel().then(result => { stopped = true; return result })
    assert.equal(signal.aborted, true)
    return new Promise(resolve => { release = resolve })
  }
  const failed = assert.rejects(f.runtime.inspect(), { code: 'TTS_CANCELLED' })
  await nextTurn()
  assert.equal(stopped, false)
  assert.equal(f.runtime.status().busy, true)
  release({ playbackSupported: true })
  await failed
  assert.deepEqual(await stop, { status: 'cancelled' })
  assert.equal(f.runtime.status().inspected, false)
})

test('status subscriber cancellation prevents synthesis and verification startup', async () => {
  for (const provider of ['deepseek', 'local']) {
    const f = fixture({ config: { provider } })
    f.runtime.subscribe(state => {
      if (['synthesizing', 'playback-requested', 'verifying'].includes(state.state)) void f.runtime.cancel()
    })
    if (provider === 'local') {
      let probes = 0
      const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider }), adapter: f.adapter, localAdapter: { async probe() { probes++; return {} } } })
      runtime.subscribe(() => { void runtime.cancel() })
      await assert.rejects(runtime.verifyLocalTts(), { code: 'TTS_CANCELLED' })
      assert.equal(probes, 0)
    } else {
      await assert.rejects(f.runtime.preview(), { code: 'TTS_CANCELLED' })
      assert.deepEqual(f.calls, [['inspect']])
    }
  }
})

test('uncertain native inspection failure blocks further output', async () => {
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner() {
    throw Object.assign(new Error('uncertain'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  } })
  const runtime = createTtsRuntime({ getConfig: () => TTS_DEFAULTS, adapter })
  await assert.rejects(runtime.inspect(), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  assert.deepEqual(await runtime.cancel(), { status: 'unconfirmed' })
  assert.equal(runtime.status().busy, false)
  assert.equal(runtime.status().blocked, true)
  assert.equal(runtime.status().state, 'blocked')
})

test('empty rejection and caller abort reasons always settle the inspection lifecycle', async () => {
  for (const abort of [false, true]) {
    const f = fixture(), controller = new AbortController()
    let release
    f.adapter.inspect = () => new Promise((resolve, reject) => { release = abort ? resolve : reject })
    const failed = assert.rejects(f.runtime.inspect(controller.signal), { code: abort ? 'TTS_CANCELLED' : 'TTS_FAILED' })
    release(null)
    if (abort) controller.abort(null)
    await failed
    assert.equal(f.runtime.status().inspected, false)
    assert.equal(f.runtime.status().busy, false)
    assert.deepEqual(await f.runtime.cancel(), { status: 'idle' })
  }
})

test('native output failures preserve only allowlisted codes without child text', async () => {
  for (const [payload, enabled, code] of [
    [{ok:false,code:'AUDIO_OUTPUT_DEVICE_UNAVAILABLE'},true,'AUDIO_OUTPUT_DEVICE_UNAVAILABLE'],
    [{ok:false,code:'AUDIO_OUTPUT_DEVICE_UNAVAILABLE'},false,'TTS_PROCESS_FAILED'],
    [{ok:false,code:'private-path-secret'},true,'TTS_PROCESS_FAILED'],
    [{ok:false,code:'AUDIO_OUTPUT_DEVICE_UNAVAILABLE',message:'private-path-secret'},true,'TTS_PROCESS_FAILED'],
  ]) {
    const f=childFixture()
    const pending=runTtsProcess('powershell.exe',[],{}, {spawnProcess:f.spawnProcess,nativeAudioErrors:enabled})
    f.child.stdout.write(JSON.stringify(payload));f.child.stderr.write('private-path-secret');f.child.emit('close',1)
    await assert.rejects(pending, error=>error.code===code && !error.message.includes('private-path-secret'))
  }
})
