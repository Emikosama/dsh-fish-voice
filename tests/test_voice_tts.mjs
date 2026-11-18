import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { createTtsRuntime, createWindowsTtsAdapter, runTtsProcess, splitEdgeTtsText, TTS_DEFAULTS, TTS_SAMPLE, ttsSettings, validateTtsSettings } from '../voice-tts.mjs'

function fixture(options = {}) {
  let config = { ...TTS_DEFAULTS, provider: 'edge', edgeTextTransmissionAccepted: true, ...options.config }
  const calls = []
  const adapter = {
    async inspect(signal) { calls.push(['inspect']); return { platform: 'win32', playbackSupported: true, systemSupported: false, edgePlaybackSupported: true, edgeDependency: 'installed', installedChineseVoices: [] } },
    async edge(text, settings, signal) { calls.push(['edge', text]); return { completed: true } },
    ...options.adapter,
  }
  const runtime = createTtsRuntime({ getConfig: () => config, adapter })
  return { runtime, calls, adapter, set: v => { config = { ...config, ...v } } }
}

test('defaults cannot transmit; Edge consent is independent of selecting a provider', async () => {
  const f = fixture({ config: { provider: 'unconfigured', edgeTextTransmissionAccepted: false } })
  assert.equal(TTS_DEFAULTS.provider, 'unconfigured')
  assert.equal(TTS_DEFAULTS.edgeVoice, 'zh-CN-XiaoyiNeural')
  await assert.rejects(f.runtime.preview(), { code: 'TTS_NOT_CONFIGURED' })
  assert.equal(f.calls.length, 0)
  f.set({ provider: 'edge' })
  await assert.rejects(f.runtime.speak('PRIVATE'), { code: 'TTS_CONSENT_REQUIRED' })
  assert.equal(f.calls.length, 0)
  assert.throws(() => validateTtsSettings({ ...TTS_DEFAULTS, endpoint: 'https://evil.invalid' }), { code: 'TTS_INVALID_SETTINGS' })
  assert.throws(() => ttsSettings({ provider: 'arbitrary-provider' }), { code: 'TTS_INVALID_SETTINGS' })
  assert.deepEqual(
    Object.fromEntries(['provider', 'systemVoice', 'systemFallback'].map(key => [key, ttsSettings({ provider: 'system', systemVoice: 'legacy', systemFallback: true })[key]])),
    { provider: 'off', systemVoice: null, systemFallback: false },
  )
  assert.deepEqual(Object.keys(ttsSettings({ provider: 'system' })), Object.keys(TTS_DEFAULTS))
})

test('Edge segments keep sentence punctuation and pair a short leading fragment', () => {
  const text = '“嗯。” 你好，我是晓伊！' + '今天的天气适合散步。'.repeat(10)
  const chunks = splitEdgeTtsText(text)
  assert.equal(chunks.join(''), text)
  assert.equal(chunks[0], '“嗯。” 你好，我是晓伊！')
  assert.ok(chunks.every(chunk => chunk.length <= 400 && Buffer.byteLength(chunk, 'utf8') <= 1200))
  assert.deepEqual(splitEdgeTtsText('嗯。接着说'), ['嗯。接着说'])
})

test('a short Edge reply makes a single synthesis request across sentence boundaries', () => {
  const reply = '今天的测试已经开始，稍后查看结果。' + '天气预报'.repeat(12) + '请确认。'
  assert.ok([...reply].length > 60)
  assert.deepEqual(splitEdgeTtsText(reply), [reply])
  const threshold = '收到了。' + '好'.repeat(92)
  assert.deepEqual(splitEdgeTtsText(threshold), [threshold])
  assert.deepEqual(splitEdgeTtsText('   '), [])
})

test('inspect is local, static sample only in preview, no acoustic claim', async () => {
  const f = fixture()
  assert.equal((await f.runtime.inspect()).gpuSupported, false)
  assert.deepEqual(f.calls, [['inspect']])
  const out = await f.runtime.preview()
  assert.deepEqual(f.calls.at(-1), ['edge', TTS_SAMPLE])
  assert.deepEqual(out, { provider: 'edge', fallback: false, playbackCompleted: true, acousticConfirmation: false })
})

test('Edge pre-play failure returns text-only and never starts legacy system speech', async () => {
  const states = []
  const f = fixture({ config: { systemFallback: true }, adapter: { async edge() { throw Object.assign(new Error('failed'), { code: 'TTS_TIMEOUT', fallbackSafe: true }) } } })
  f.runtime.subscribe(s => states.push(s))
  assert.deepEqual(await f.runtime.speak('test'), { provider: 'edge', textOnly: true, fallback: false, playbackCompleted: false, acousticConfirmation: false, reason: 'TTS_TIMEOUT' })
  assert.equal(f.calls.some(x => x[0] === 'system'), false)
  assert.equal(states.some(s => s.state === 'text-only' && s.provider === 'edge' && s.reason === 'TTS_TIMEOUT'), true)
  assert.equal(f.runtime.status().state, 'text-only')
  assert.equal(f.runtime.status().fallback, false)
})

test('Edge capability transport failure returns only a bounded text-only reason', async () => {
  const f = fixture({ config: { systemFallback: true }, adapter: { async inspect() { throw Object.assign(new Error('PRIVATE host path'), { code: 'PRIVATE_HOST_PATH' }) } } })
  const result = await f.runtime.speak('test')
  assert.deepEqual(result, { provider: 'edge', textOnly: true, fallback: false, playbackCompleted: false, acousticConfirmation: false, reason: 'TTS_EDGE_FAILED' })
  assert.equal(f.runtime.status().state, 'text-only')
  assert.equal(f.runtime.status().reason, 'TTS_EDGE_FAILED')
  assert.equal(f.calls.some(x => ['edge', 'system'].includes(x[0])), false)
})

test('no duplicate local playback after possible partial Edge playback', async () => {
  const f = fixture({ config: { systemFallback: true }, adapter: { async edge() { throw Object.assign(new Error('playback failed'), { code: 'TTS_PROCESS_FAILED', fallbackSafe: false }) } } })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_PROCESS_FAILED' })
  assert.equal(f.calls.some(x => x[0] === 'system'), false)
})

test('missing Edge dependency returns text-only despite a legacy fallback flag', async () => {
  const f = fixture({ config: { systemFallback: true } })
  const original = f.adapter.inspect
  f.adapter.inspect = async signal => ({ ...await original(signal), edgeDependency: 'missing' })
  assert.deepEqual(await f.runtime.preview(), { provider: 'edge', textOnly: true, fallback: false, playbackCompleted: false, acousticConfirmation: false, reason: 'TTS_EDGE_DEPENDENCY_MISSING' })
  assert.deepEqual(f.calls, [['inspect']])
  assert.equal(f.calls.some(c => c[0] === 'edge'), false)
})

test('legacy system provider becomes text-only and never invokes either speech adapter', async () => {
  const f = fixture({ config: { provider: 'system', systemVoice: 'missing' } })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_NOT_CONFIGURED' })
  assert.equal(f.calls.some(c => ['edge', 'system'].includes(c[0])), false)
})

test('cancellation stops pending Edge with no system fallback and rejects concurrent double-click', async () => {
  let began
  const started = new Promise(resolve => { began = resolve })
  const f = fixture({ adapter: { edge: async (_text, _cfg, signal) => { began(); await new Promise((_, reject) => signal.addEventListener('abort', () => reject(new Error('cancelled')), { once: true })) } } })
  const pending = f.runtime.preview()
  const failed = assert.rejects(pending, { code: 'TTS_CANCELLED' })
  await started
  await assert.rejects(f.runtime.preview(), { code: 'TTS_BUSY' })
  assert.deepEqual(await f.runtime.cancel(), { status: 'cancelled' })
  await failed
  assert.equal(f.calls.some(c => c[0] === 'system'), false)
  assert.equal(f.runtime.status().state, 'cancelled')
})

test('settings changes while inspecting prevent text network transmission', async () => {
  const f = fixture()
  const original = f.adapter.inspect
  f.adapter.inspect = async signal => { const caps = await original(signal); f.set({ provider: 'off', edgeTextTransmissionAccepted: false }); return caps }
  await assert.rejects(f.runtime.preview(), { code: 'TTS_CONFIG_CHANGED' })
  assert.equal(f.calls.some(c => c[0] === 'edge' || c[0] === 'system'), false)
})

test('unconfirmed process termination locks output, never falls back or pretends stopped', async () => {
  const f = fixture({ adapter: { async edge() { throw Object.assign(new Error('uncertain'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true }) } } })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_TERMINATION_UNCONFIRMED' })
  assert.equal(f.runtime.status().blocked, true)
  assert.deepEqual(await f.runtime.cancel(), { status: 'unconfirmed' })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_BLOCKED' })
  assert.equal(f.calls.some(c => c[0] === 'system'), false)
})

test('non-Windows does not spawn, install, or invoke another provider', async () => {
  const adapter = createWindowsTtsAdapter({ platform: 'linux', runner: () => { throw new Error('must not spawn') } })
  assert.equal((await adapter.inspect()).playbackSupported, false)
  const f = fixture({ adapter })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_PLATFORM_UNSUPPORTED' })
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

function edgePlayerInspectionFixture() {
  const children = []
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner() { assert.fail('synthesis must wait for player readiness') }, spawnProcess(command, args, options) {
    const f = childFixture({ closeOnKill: false })
    f.child.pid = 1234
    f.child.invocation = { command, args, options }
    children.push(f)
    return f.child
  } })
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider: 'edge', edgeTextTransmissionAccepted: true }), adapter })
  return { runtime, children }
}
const nextTurn = () => new Promise(resolve => setImmediate(resolve))
async function waitFor(check) {
  const deadline = Date.now() + 1000
  while (!check()) {
    if (Date.now() >= deadline) throw new Error('timed out waiting for test event')
    await new Promise(resolve => setTimeout(resolve, 1))
  }
}

test('Edge player cancellation waits for the output process to exit', async () => {
  const { runtime, children } = edgePlayerInspectionFixture()
  const speech = assert.rejects(runtime.preview(), { code: 'TTS_CANCELLED' })
  await waitFor(() => children.length === 1)
  assert.equal(children.length, 1)
  let settled = false
  const stopping = runtime.cancel().then(result => { settled = true; return result })
  children[0].child.emit('close', null)
  assert.deepEqual(await stopping, { status: 'cancelled' })
  await speech
  assert.equal(settled, true)
  assert.equal(runtime.status().busy, false)
  assert.equal(runtime.status().blocked, false)
})

test('Edge player cancellation locks output when process exit is unconfirmed', async () => {
  const { runtime, children } = edgePlayerInspectionFixture()
  const speech = assert.rejects(runtime.preview(), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  await waitFor(() => children.length === 1)
  const stopping = runtime.cancel()
  assert.equal(children.length, 1)
  assert.deepEqual(await stopping, { status: 'unconfirmed' })
  await speech
  assert.equal(runtime.status().blocked, true)
  assert.equal(runtime.status().busy, false)
  await assert.rejects(runtime.preview(), { code: 'TTS_BLOCKED' })
  assert.equal(children.length, 1, 'blocked output must not launch another player')
})

test('Windows inspection preserves success and ordinary degraded results', async () => {
  for (const failed of [null, 'powershell.exe']) {
    const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async command => {
      if (command === failed) throw Object.assign(new Error('failure'), { code: 'TTS_PROCESS_FAILED' })
      return { ok: true, systemSupported: false, edgePlaybackSupported: true, voices: [] }
    } })
    const result = await adapter.inspect()
    assert.equal(result.playbackSupported, failed !== 'powershell.exe')
    assert.equal(result.edgeDependency, 'installed')
    assert.deepEqual(result.installedChineseVoices, [])
    assert.equal(result.systemSupported, false)
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
  for (const provider of ['edge', 'local']) {
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
      assert.equal(f.calls.some(c => ['edge', 'system'].includes(c[0])), false)
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
