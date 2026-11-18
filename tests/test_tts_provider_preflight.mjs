import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { existsSync } from 'node:fs'
import { rm, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { createTtsRuntime, createWindowsTtsAdapter, runTtsProcess, TTS_DEFAULTS } from '../voice-tts.mjs'

const voices = { ok: true, systemSupported: false, edgePlaybackSupported: true, voices: [] }
const tick = () => new Promise(resolve => setImmediate(resolve))

function fakeEdgePlayer(events, { playDelayMs = 0, failPlayAt = -1, startupError = null } = {}) {
  const child = new EventEmitter()
  child.pid = 4321
  child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough()
  let buffer = '', closed = false, running = false, playIndex = 0
  const queued = []
  const close = code => { if (closed) return; closed = true; child.emit('close', code) }
  const processNext = () => {
    if (running || closed || !queued.length) return
    const request = queued.shift()
    if (request.op === 'edge-start') {
      if (startupError) {
        child.stdout.write(JSON.stringify(startupError) + '\n')
        close(1)
        return
      }
      events.push('player-ready')
      child.stdout.write('{"ok":true,"ready":true}\n')
      processNext()
    } else if (request.op === 'edge-play') {
      const index = playIndex++
      events.push(`play-start-${index}`)
      running = true
      setTimeout(() => {
        if (failPlayAt === index) {
          child.stdout.write('{"ok":false,"code":"AUDIO_OUTPUT_DEVICE_UNAVAILABLE"}\n')
          close(1)
          return
        }
        events.push(`play-ack-${index}`)
        child.stdout.write('{"ok":true,"played":true}\n')
        running = false
        processNext()
      }, playDelayMs)
    } else if (request.op === 'edge-end') {
      events.push('player-end')
      child.stdout.write('{"ok":true,"completed":true}\n')
    } else close(1)
  }
  child.stdin.on('data', chunk => {
    buffer += chunk.toString('utf8')
    let boundary
    while ((boundary = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, boundary)
      buffer = buffer.slice(boundary + 1)
      try { queued.push(JSON.parse(line)) } catch { close(1); return }
      processNext()
    }
  })
  child.stdin.on('finish', () => setImmediate(() => close(0)))
  child.kill = () => { setImmediate(() => close(null)); return true }
  return child
}

test('local speech runs only the local model and native media player', async () => {
  const provider = 'local'
  const calls = []
  let pythonLookups = 0
  let failOutputProbe = false
  const adapter = createWindowsTtsAdapter({ platform: 'win32', pythonPath: () => { pythonLookups++; return 'python' }, runner: async (command, _args, payload) => {
    calls.push([command, payload.op])
    if (failOutputProbe && command === 'powershell.exe') throw Object.assign(new Error('output probe did not exit'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
    return payload.op === 'voices' ? voices : { ok: true, completed: true }
  } })
  const localAdapter = {
    async inspect() { calls.push(['local', 'inspect']); return { localReady: true } },
    async speak() { calls.push(['local', 'speak']); return { completed: true } },
  }
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider }), adapter, localAdapter })
  for (let i = 0; i < 2; i++) assert.equal((await runtime.speak('你好')).provider, provider)
  assert.equal(pythonLookups, 0)
  const operation = [['powershell.exe', 'voices'], ['local', 'inspect'], ['local', 'speak']]
  assert.deepEqual(calls, [...operation, ...operation])
  assert.equal(runtime.status().blocked, false)
  // Public diagnostics check the local worker files and preserve output failures.
  failOutputProbe = true
  await assert.rejects(runtime.inspect(), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  assert.equal(pythonLookups, 0)
  assert.equal(runtime.status().blocked, true)
  await assert.rejects(runtime.speak('你好'), { code: 'TTS_BLOCKED' })
})

test('skipped Edge dependency is unchecked, while public inspection always reports a full fresh diagnosis', async () => {
  const calls = []
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async (command, _args, payload) => {
    calls.push([command, payload.op])
    return voices
  } })
  assert.equal((await adapter.inspect(undefined, { checkEdgeDependency: false })).edgeDependency, 'unchecked')
  assert.deepEqual(calls.splice(0), [['powershell.exe', 'voices']])
  for (const provider of ['system', 'local', 'off', 'unconfigured', 'edge']) {
    const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider, edgeTextTransmissionAccepted: true }) , adapter,
      localAdapter: { async inspect() { return { localReady: true } } },
    })
    assert.equal((await runtime.inspect()).edgeDependency, 'installed')
    assert.deepEqual(calls.splice(0), [['powershell.exe', 'voices']])
  }
})

test('legacy system settings stay text-only and Edge reuses one player without a speech-time probe', async () => {
  let config = { ...TTS_DEFAULTS, provider: 'system' }
  const calls = [], events = []
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async (command, args, payload, options = {}) => {
    calls.push([command, payload.op])
    if (command === process.execPath) {
      assert.match(args[0], /voice-tts-edge-worker\.mjs$/)
      assert.equal(options.env.ELECTRON_RUN_AS_NODE, '1')
      assert.ok(options.timeoutMs > 0 && options.timeoutMs <= 21000)
      assert.equal(payload.voice, 'zh-CN-XiaoyiNeural')
      await writeFile(payload.output, Buffer.from('fake mp3'))
      return { ok: true, synthesized: true, durationMs: 1000 }
    }
    return payload.op === 'voices' ? voices : { ok: true, completed: true }
  }, spawnProcess(command, args) {
    assert.equal(command, 'powershell.exe')
    assert.ok(args.includes('-EdgeStream'))
    events.push('player-spawn')
    return fakeEdgePlayer(events)
  } })
  const runtime = createTtsRuntime({ getConfig: () => config, adapter })
  await assert.rejects(runtime.speak('你好'), { code: 'TTS_NOT_CONFIGURED' })
  assert.deepEqual(calls, [])
  config = { ...config, provider: 'edge' }
  await assert.rejects(runtime.speak('你好'), { code: 'TTS_CONSENT_REQUIRED' })
  assert.deepEqual(calls, [])
  config = { ...config, edgeTextTransmissionAccepted: true, systemFallback: true }
  const result = await runtime.speak('你好')
  assert.deepEqual(result, { provider: 'edge', fallback: false, playbackCompleted: true, acousticConfirmation: false })
  assert.deepEqual(calls.splice(0), [[process.execPath, 'synthesize']])
  assert.deepEqual(events, ['player-spawn', 'player-ready', 'play-start-0', 'play-ack-0', 'player-end'])
  config = { ...config, systemFallback: false }
  assert.equal((await runtime.speak('你好')).provider, 'edge')
  assert.deepEqual(calls, [[process.execPath, 'synthesize']])
  assert.equal(events.filter(event => event === 'player-spawn').length, 2)
})

test('Edge starts after complete sentence audio and overlaps the next synthesis with playback', async () => {
  const events = [], workerTexts = []
  let activeWorkers = 0, maxActiveWorkers = 0
  const text = '你好，我是晓伊。鲸语已经准备好了。你可以按住快捷键跟我说话。'
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async (_command, _args, payload) => {
    const index = workerTexts.length
    workerTexts.push(payload.text)
    activeWorkers++
    maxActiveWorkers = Math.max(maxActiveWorkers, activeWorkers)
    events.push(`worker-start-${index}`)
    try {
      if (index === 1) await new Promise(resolve => setTimeout(resolve, 70))
      await writeFile(payload.output, Buffer.from('fake mp3'))
      events.push(`worker-finish-${index}`)
      return { ok: true, synthesized: true, durationMs: 1000 }
    } finally { activeWorkers-- }
  }, spawnProcess(_command, _args) {
    events.push('player-spawn')
    return fakeEdgePlayer(events, { playDelayMs: 50 })
  } })
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider: 'edge', edgeTextTransmissionAccepted: true }), adapter })
  assert.equal((await runtime.speak(text)).playbackCompleted, true)
  assert.deepEqual(workerTexts, ['你好，我是晓伊。', '鲸语已经准备好了。你可以按住快捷键跟我说话。'])
  assert.equal(maxActiveWorkers, 2)
  assert.equal(events.filter(event => event === 'player-spawn').length, 1)
  assert.ok(events.indexOf('worker-start-1') < events.indexOf('worker-finish-0'), 'lookahead synthesis starts while the first worker is active')
  assert.ok(events.indexOf('play-start-0') < events.indexOf('worker-finish-1'), 'lookahead synthesis overlaps first-segment playback')
  assert.deepEqual(events.filter(event => event.startsWith('play-start-')), ['play-start-0', 'play-start-1'])
})

test('a failed lookahead waits for the ready first sentence to finish', async () => {
  const events = []
  let workers = 0
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async (_command, _args, payload) => {
    if (workers++ === 0) {
      await new Promise(resolve => setTimeout(resolve, 20))
      await writeFile(payload.output, Buffer.from('fake mp3'))
      return { ok: true, synthesized: true, durationMs: 1000 }
    }
    throw Object.assign(new Error('later sentence failed'), { code: 'TTS_PROCESS_FAILED' })
  }, spawnProcess() { return fakeEdgePlayer(events, { playDelayMs: 50 }) } })
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider: 'edge', edgeTextTransmissionAccepted: true }), adapter })
  const started = Date.now()
  await assert.rejects(runtime.speak('你好，我是晓伊。鲸语已经准备好了。'), { code: 'TTS_PROCESS_FAILED' })
  assert.ok(Date.now() - started >= 50, 'the first segment is allowed to finish before a later synthesis failure')
  assert.ok(events.indexOf('play-ack-0') >= 0)
  assert.ok(events.indexOf('play-ack-0') < events.indexOf('player-end'))
  assert.equal(runtime.status().state === 'text-only', false)
})

test('Edge playback failure aborts and waits for an in-flight next synthesis', async () => {
  const events = [], workerTexts = []
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async (_command, _args, payload, options) => {
    const index = workerTexts.length
    workerTexts.push(payload.text)
    events.push(`worker-start-${index}`)
    if (index === 0) {
      await writeFile(payload.output, Buffer.from('fake mp3'))
      return { ok: true, synthesized: true, durationMs: 1000 }
    }
    return new Promise((resolve, reject) => options.signal.addEventListener('abort', () => setTimeout(() => {
      events.push('worker-terminal')
      reject(Object.assign(new Error('cancelled'), { code: 'TTS_CANCELLED' }))
    }, 20), { once: true }))
  }, spawnProcess() { return fakeEdgePlayer(events, { failPlayAt: 0 }) } })
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider: 'edge', edgeTextTransmissionAccepted: true }), adapter })
  await assert.rejects(runtime.speak('你好，我是晓伊。鲸语已经准备好了。'), { code: 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE' })
  assert.equal(workerTexts.length, 2)
  assert.ok(events.includes('worker-terminal'), 'the Edge worker settles before speak releases its active lifecycle')
  assert.equal(runtime.status().busy, false)
  assert.equal(runtime.status().state === 'text-only', false)
})

test('Edge player validation preserves a recognized device error before sending reply text', async () => {
  for (const [startupError, reason] of [
    [{ ok: false, code: 'AUDIO_OUTPUT_DEVICE_INVALID' }, 'AUDIO_OUTPUT_DEVICE_INVALID'],
    [{ ok: false, code: 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE' }, 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE'],
    [{ ok: false, code: 'private endpoint' }, 'TTS_EDGE_PLAYBACK_UNAVAILABLE'],
    [{ ok: false, code: 'AUDIO_OUTPUT_DEVICE_INVALID', detail: 'private endpoint' }, 'TTS_EDGE_PLAYBACK_UNAVAILABLE'],
  ]) {
    let synthesisRequests = 0
    const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async () => { synthesisRequests++ },
      spawnProcess: () => fakeEdgePlayer([], { startupError }),
    })
    const runtime = createTtsRuntime({ getConfig: () => ({ provider: 'edge', edgeTextTransmissionAccepted: true }), adapter })
    const result = await runtime.speak('合成测试文本')
    assert.equal(result.playbackCompleted, false)
    assert.equal(result.textOnly, true)
    assert.equal(result.reason, reason)
    assert.equal(runtime.status().reason, reason)
    assert.equal(synthesisRequests, 0)
  }
})

test('uncertain Edge worker exit propagates and retains its temporary audio directory', async () => {
  const events = [], workerTexts = []
  let workerOutput = null
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: async (_command, _args, payload, options) => {
    const index = workerTexts.length
    workerTexts.push(payload.text)
    if (index === 0) {
      await writeFile(payload.output, Buffer.from('fake mp3'))
      return { ok: true, synthesized: true, durationMs: 1000 }
    }
    workerOutput = payload.output
    return new Promise((resolve, reject) => options.signal.addEventListener('abort', () => setTimeout(() => {
      events.push('worker-uncertain')
      reject(Object.assign(new Error('uncertain'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true }))
    }, 20), { once: true }))
  }, spawnProcess() { return fakeEdgePlayer(events, { failPlayAt: 0 }) } })
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider: 'edge', edgeTextTransmissionAccepted: true }), adapter })
  await assert.rejects(runtime.speak('你好，我是晓伊。鲸语已经准备好了。'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  assert.equal(runtime.status().blocked, true)
  assert.ok(events.includes('worker-uncertain'))
  assert.ok(workerOutput && existsSync(dirname(workerOutput)), 'an unconfirmed worker may still own the temporary directory')
  await rm(dirname(workerOutput), { recursive: true, force: true })
})

test('pre-aborted Edge playback does not invent an unconfirmed child', async () => {
  let spawned = 0
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner() { assert.fail('pre-abort must not synthesize') }, spawnProcess() { spawned++; assert.fail('pre-abort must not spawn') } })
  const signal = new AbortController()
  signal.abort()
  await assert.rejects(adapter.edge('你好。', { edgeVoice: 'zh-CN-XiaoyiNeural', volume: 0.8 }, signal.signal), { code: 'TTS_CANCELLED' })
  assert.equal(spawned, 0)
})

for (const provider of ['local']) for (const stopKind of ['cancel', 'dispose', 'unconfirmed']) {
  test(`${provider} preflight shares active lifecycle through ${stopKind}`, async () => {
    const children = []
    let localChecks = 0, stopped = false
    const adapter = createWindowsTtsAdapter({ platform: 'win32', runner(command, args, payload, options) {
      const child = new EventEmitter(), kills = []
      child.pid = 1234; child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough()
      child.kill = signal => { kills.push(signal); return true }
      children.push({ child, kills, command, payload })
      return runTtsProcess(command, args, payload, { ...options, spawnProcess: () => child, killGraceMs: 50 })
    } })
    const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider }), adapter,
      localAdapter: { async inspect() { localChecks++; return { localReady: true } }, async speak() { assert.fail('must not synthesize after stop') } },
    })
    const failed = assert.rejects(runtime.preview(), { code: stopKind === 'unconfirmed' ? 'TTS_TERMINATION_UNCONFIRMED' : 'TTS_CANCELLED' })
    assert.equal(children.length, 1)
    assert.equal(children[0].command, 'powershell.exe')
    assert.equal(children[0].payload.op, 'voices')
    await assert.rejects(runtime.inspect(), { code: 'TTS_BUSY' })
    await assert.rejects(runtime.preview(), { code: 'TTS_BUSY' })
    await assert.rejects(runtime.verifyLocalTts(), { code: 'TTS_BUSY' })
    const stopping = (stopKind === 'dispose' ? runtime.dispose() : runtime.cancel()).then(value => { stopped = true; return value })
    assert.equal(children[0].kills.length, 1)
    await tick()
    assert.equal(stopped, false)
    assert.equal(runtime.status().busy, true)
    if (stopKind === 'dispose') await assert.rejects(runtime.inspect(), { code: 'TTS_BLOCKED' })
    if (stopKind !== 'unconfirmed') children[0].child.emit('close', null)
    const stopResult = await stopping
    await failed
    assert.equal(runtime.status().busy, false)
    assert.equal(runtime.status().blocked, stopKind === 'unconfirmed')
    assert.equal(runtime.status().inspected, false)
    assert.equal(localChecks, 0)
    assert.equal(children.length, 1)
    if (stopKind !== 'dispose') assert.equal(stopResult.status, stopKind === 'unconfirmed' ? 'unconfirmed' : 'cancelled')
    if (stopKind !== 'cancel') {
      await assert.rejects(runtime.inspect(), { code: 'TTS_BLOCKED' })
      await assert.rejects(runtime.preview(), { code: 'TTS_BLOCKED' })
      await assert.rejects(runtime.verifyLocalTts(), { code: 'TTS_BLOCKED' })
      children[0].child.emit('close', null)
      await tick()
      if (stopKind === 'unconfirmed') assert.equal(runtime.status().blocked, true, 'late close cannot clear an unknown-exit block')
    }
  })
}
