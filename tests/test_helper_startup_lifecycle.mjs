/** Real plugin entry, deterministic process events and startup/exit clock. No audio. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { registerHooks } from 'node:module'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { decodeReply } from '../ui/src/protocol.mjs'

const tick = () => new Promise(resolve => setImmediate(resolve))
const indexUrl = new URL('../index.mjs', import.meta.url).href
async function fixture(t, { spawnError = null, runtime = null, inspectDevices = null } = {}) {
  const home = mkdtempSync(join(tmpdir(), 'whale-helper-lifecycle-'))
  const previousHome = process.env.DSH_HOME
  process.env.DSH_HOME = home
  mkdirSync(join(home, 'whale-ear'))
  const config = { autoStart: false, voiceSession: { enabled: false }, tts: { provider: 'off' } }
  const setConfig = values => writeFileSync(join(home, 'whale-ear', 'config.json'), JSON.stringify({ ...config, ...values }))
  setConfig({})
  const children = [], instances = []
  const key = '__helperLifecycle' + randomUUID().replaceAll('-', '')
  globalThis[key] = () => {
    if (spawnError) { const error = spawnError; spawnError = null; throw error }
    const child = new EventEmitter()
    child.pid = 1000 + children.length; child.exitCode = null; child.signalCode = null; child.killed = false
    child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough()
    const record = { child, kills: [], writes: [], closed: false, captureState: 'released', captureReply: true,
      emit(value) { child.stdout.write(JSON.stringify(value) + '\n') },
      ready(capabilities = {}) { this.emit({ event: 'ready', requestProtocol: 'whale-request/1', captureProtocol: 'whale-capture/1', captureDeviceProtocol: 'whale-capture-device/1', pid: child.pid, ...capabilities }) },
      exit() { if (this.closed) return; this.closed = true; child.exitCode = 0; child.emit('exit', 0, null); child.emit('close', 0, null) },
    }
    child.kill = signal => { record.kills.push(signal ?? 'SIGTERM'); child.killed = true; return true }
    child.stdin.on('data', chunk => {
      for (const line of String(chunk).trim().split('\n')) {
        const message = JSON.parse(line); record.writes.push(message)
        if (message.op === 'capture-status') {
          if (record.captureReply) queueMicrotask(() => record.emit({ event: 'capture-status', requestId: message.requestId, captureDevice: { state: record.captureState } }))
          continue
        }
        const event = { transcribe: 'transcript', prosody: 'prosody', 'ptt-status': 'ptt-status', always: 'always', stop: 'stopped' }[message.op]
        if (event) queueMicrotask(() => record.emit({ event, requestId: message.requestId, path: message.path, text: message.path }))
      }
    })
    children.push(record)
    return child
  }
  globalThis[key + 'InspectDevices'] = inspectDevices
  globalThis[key + 'Runtime'] = runtime ?? { resolve: async () => ({ executable: 'python', version: 'synthetic', optionalMissing: [] }), cancel: async () => {} }
  const hook = registerHooks({ resolve(specifier, context, next) {
    if (inspectDevices && context.parentURL?.startsWith(`${indexUrl}?`) && specifier === './voice-audio-devices.mjs') return { url: 'data:text/javascript,' + encodeURIComponent(`export const inspectAudioDevices = globalThis.${key}InspectDevices;`), shortCircuit: true }
    if (context.parentURL?.startsWith(`${indexUrl}?`) && specifier === './voice-python-runtime.mjs') return { url: 'data:text/javascript,' + encodeURIComponent(`const runtime = globalThis.${key}Runtime; export const createPythonRuntimeResolver = () => runtime;`), shortCircuit: true }
    if (context.parentURL?.startsWith(`${indexUrl}?`) && specifier === 'node:child_process') return { url: 'data:text/javascript,' + encodeURIComponent(`export const spawn = globalThis.${key}`), shortCircuit: true }
    return next(specifier, context)
  } })
  const actor = { id: 'owner', session: { id: 'owner' } }
  const ctx = { agents: new Map([['owner', actor]]), tools: { register() { return () => {} } }, sessions: {}, provide() {}, effect() {}, on() { return () => {} }, get(name) {
    if (name === 'loader') return { import: async () => ({ z, defineDomain: value => value, domainTable: value => value }) }
    if (name === 'storageDomain') return { open: async () => ({ table: () => new Map() }) }
  } }
  let plugin
  try { plugin = await import(`${indexUrl}?helperLifecycle=${randomUUID()}`) } finally { hook.deregister(); delete globalThis[key]; delete globalThis[key + 'Runtime']; delete globalThis[key + 'InspectDevices'] }
  const reload = () => { plugin.apply(ctx, { autoStart: false }); const instance = globalThis.__dshWhaleEar__; assert.ok(instance); instances.push(instance); return instance }
  const instance = reload()
  t.mock.timers.enable({ apis: ['setTimeout'] })
  t.after(async () => {
    for (const record of children) record.exit()
    for (const instance of instances) await instance.dispose().catch(() => {})
    delete globalThis.__dshWhaleEar__
    if (previousHome === undefined) delete process.env.DSH_HOME; else process.env.DSH_HOME = previousHome
    rmSync(home, { recursive: true, force: true })
  })
  return { instance, children, actor, reload, setConfig }
}

test('startup timeout terminates its owned process and ignores late ready', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /启动超时/)
  await tick(); assert.equal(f.children.length, 1)
  t.mock.timers.tick(45_000); await failure
  const old = f.children[0]
  old.ready()
  assert.equal(f.instance.uiBridge.status(f.actor).helper.online, false, 'timed-out ready must not reactivate this helper')
  assert.ok(old.kills.length, 'timeout must request termination, not just forget starting')
})

test('startup timeout cannot replace a child whose exit is still unknown', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /启动超时/)
  await tick(); t.mock.timers.tick(45_000); await failure
  const next = f.instance.ear.transcribe('retry'); next.catch(() => {})
  await tick()
  assert.equal(f.children.length, 1, 'old process handle must remain owned until exit')
  await assert.rejects(next, /退出|停止|终止/)
})

test('stdin error cannot replace a killed child before confirmed exit', async t => {
  const f = await fixture(t)
  const first = f.instance.ear.transcribe('first')
  await tick(); f.children[0].ready(); await first
  f.children[0].child.stdin.emit('error', Object.assign(new Error('synthetic EPIPE'), { code: 'EPIPE' }))
  const next = f.instance.ear.transcribe('retry'); next.catch(() => {})
  await tick()
  assert.equal(f.children.length, 1, 'kill() true is not proof of process exit')
  await assert.rejects(next, /退出|停止|终止/)
})

test('concurrent startup callers share one child and recover only after confirmed exit', async t => {
  const f = await fixture(t)
  const one = f.instance.ear.transcribe('one'), two = f.instance.ear.prosody('two')
  const failures = Promise.all([assert.rejects(one, /启动超时/), assert.rejects(two, /启动超时/)])
  await tick(); assert.equal(f.children.length, 1)
  t.mock.timers.tick(45_000); await failures
  const old = f.children[0]
  old.exit(); await tick()
  t.mock.timers.tick(1000); await tick()
  assert.equal(f.children.length, 1, 'intentional termination must not automatically restart')
  const next = f.instance.ear.transcribe('new')
  await tick(); assert.equal(f.children.length, 2)
  old.ready(); old.child.emit('exit', 0, null)
  assert.equal(f.instance.uiBridge.status(f.actor).helper.online, false)
  f.children[1].ready(); assert.equal((await next).text, 'new')
  assert.equal(f.instance.uiBridge.status(f.actor).helper.online, true)
})

test('unconfirmed shutdown stays blocked after late exit and through hot reload', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /启动超时/)
  await tick(); t.mock.timers.tick(45_000); await failure
  t.mock.timers.tick(5000); await tick()
  await assert.rejects(f.instance.ear.transcribe('retry'), { code: 'VOICE_HELPER_STOP_UNCONFIRMED' })
  f.children[0].ready(); f.children[0].exit(); await tick()
  await assert.rejects(f.instance.ear.transcribe('late retry'), { code: 'VOICE_HELPER_STOP_UNCONFIRMED' })
  await assert.rejects(f.instance.dispose(), AggregateError)
  const next = f.reload()
  await assert.rejects(next.ear.transcribe('reload'), /cleanup is unconfirmed/)
  assert.equal(f.children.length, 1)
})

test('dispose cancels startup immediately and waits for actual exit', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /插件已卸载/)
  await tick()
  let disposed = false
  const disposal = f.instance.dispose().then(() => { disposed = true })
  await failure; await tick()
  assert.equal(disposed, false)
  assert.deepEqual(f.children[0].writes.map(message => message.op), ['quit'])
  f.children[0].ready()
  assert.equal(f.instance.uiBridge.status(f.actor).helper.online, false)
  t.mock.timers.tick(1500)
  assert.deepEqual(f.children[0].kills, ['SIGKILL'])
  f.children[0].exit(); await disposal
  assert.equal(disposed, true)
  t.mock.timers.tick(45_000); await tick()
  assert.equal(f.children.length, 1)
})

for (const operation of ['stop', 'alwaysOff']) test(`${operation} cancels startup without starting a replacement`, async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /启动已取消/)
  await tick()
  let stopped = false
  const stopping = f.instance.ear[operation]().then(() => { stopped = true })
  await failure; await tick()
  assert.equal(stopped, false)
  assert.deepEqual(f.children[0].kills, ['SIGKILL'])
  f.children[0].ready()
  assert.equal(f.instance.uiBridge.status(f.actor).helper.online, false)
  f.children[0].exit(); await stopping
  await f.instance.ear.stop(); await f.instance.ear.alwaysOff()
  t.mock.timers.tick(45_000); await tick()
  assert.equal(f.children.length, 1)
})

test('protocol mismatch rejects remaining ready messages in the same stdout chunk', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /协议不兼容/)
  await tick()
  f.children[0].child.stdout.write(JSON.stringify({ event: 'ready' }) + '\n' + JSON.stringify({ event: 'ready', requestProtocol: 'whale-request/1' }) + '\n')
  await failure
  assert.equal(f.instance.uiBridge.status(f.actor).helper.online, false)
  assert.deepEqual(f.children[0].kills, ['SIGKILL'])
})

test('stop before startup admission resumes cancels the queued spawn', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /启动已取消/)
  await f.instance.ear.stop(); await failure
  assert.equal(f.children.length, 0)
})

test('ready followed immediately by stop cannot send the original command', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /停止|退出/)
  await tick()
  f.children[0].ready()
  const stopping = f.instance.dispose()
  await failure
  assert.equal(f.children[0].writes.some(message => message.op === 'transcribe'), false)
  f.children[0].exit(); await stopping
})

test('failed spawn close confirms no process exists, without an exit event', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /ENOENT/)
  await tick()
  const record = f.children[0]
  record.child.pid = undefined
  record.child.emit('error', Object.assign(new Error('spawn ENOENT'), { code: 'ENOENT' }))
  await failure
  await assert.rejects(f.instance.ear.transcribe('before close'), { code: 'VOICE_HELPER_STOPPING' })
  record.closed = true; record.child.emit('close', -2, null)
  await tick()
  const next = f.instance.ear.transcribe('new')
  await tick(); assert.equal(f.children.length, 2)
  f.children[1].ready(); assert.equal((await next).text, 'new')
})

test('voice close cancels an already starting helper and does not respawn for status', async t => {
  const f = await fixture(t)
  const failure = assert.rejects(f.instance.ear.transcribe('first'), /启动已取消/)
  await tick()
  const closing = f.instance.sessionControl.change('owner', false)
  await failure
  assert.deepEqual(f.children[0].kills, ['SIGKILL'])
  f.children[0].exit(); await closing
  assert.equal(f.children.length, 1)
})


test('missing helper script can recover after the configuration is corrected', async t => {
  const f = await fixture(t)
  f.setConfig({ helperPath: join(tmpdir(), `missing-helper-${randomUUID()}.py`) })
  await assert.rejects(f.instance.ear.transcribe('first'), /脚本不存在/)
  f.setConfig({})
  const next = f.instance.ear.transcribe('new'); next.catch(() => {})
  await tick(); assert.equal(f.children.length, 1)
  f.children[0].ready(); assert.equal((await next).text, 'new')
})

test('synchronous spawn failure does not permanently cache the rejected startup', async t => {
  const f = await fixture(t, { spawnError: new Error('synthetic spawn failure') })
  await assert.rejects(f.instance.ear.transcribe('first'), /synthetic spawn failure/)
  const next = f.instance.ear.transcribe('new'); next.catch(() => {})
  await tick(); assert.equal(f.children.length, 1)
  f.children[0].ready(); assert.equal((await next).text, 'new')
})

async function readyCaptureFixture(t, state = 'released') {
  const f = await fixture(t)
  const first = f.instance.ear.transcribe('prepare-helper')
  await tick(); f.children[0].ready(); await first
  f.children[0].captureState = state
  return f
}

test('native-close uncertainty stays blocked after unknown process exit and status readback', async t => {
  const f = await readyCaptureFixture(t, 'close-unconfirmed')
  const stopping = assert.rejects(f.instance.sessionControl.change('owner', false), { code: 'VOICE_HELPER_STOP_UNCONFIRMED' })
  await tick()
  assert.equal(f.children[0].writes.at(-1).op, 'quit')
  assert.equal(f.instance.uiBridge.status().voiceSession.fullyStopped, false)
  t.mock.timers.tick(5000); await stopping
  let readback = decodeReply('status', f.instance.uiBridge.status())
  assert.equal(readback.voiceSession.fullyStopped, false)
  assert.equal(readback.voiceSession.recovery.stopVerified, false)
  assert.equal(readback.voiceSession.recovery.kind, 'helper-stop-unconfirmed')
  assert.deepEqual(f.children[0].kills, ['SIGKILL'])
  f.children[0].exit(); await tick()
  readback = decodeReply('status', f.instance.uiBridge.status())
  assert.equal(readback.voiceSession.recovery.kind, 'helper-stop-unconfirmed', 'late exit cannot erase unknown termination')
  await assert.rejects(f.instance.sessionControl.change('owner', true), { code: 'VOICE_HELPER_STOP_UNCONFIRMED' })
  assert.equal(f.children.length, 1)
})

test('missing physical release receipt requires confirmed exit rather than a successful stop', async t => {
  const f = await readyCaptureFixture(t)
  f.children[0].captureReply = false
  let completed = false
  const stopping = f.instance.sessionControl.change('owner', false).then(() => { completed = true })
  await tick(); assert.equal(f.children[0].writes.at(-1).op, 'capture-status')
  t.mock.timers.tick(1500); await tick()
  assert.equal(f.children[0].writes.at(-1).op, 'quit')
  assert.equal(completed, false)
  f.children[0].exit(); await stopping
  assert.equal(f.instance.uiBridge.status().voiceSession.recovery.stopVerified, true)
})

test('old physical cleanup cannot terminate a new grant queued behind its exit', async t => {
  const f = await readyCaptureFixture(t, 'closing'), old = f.children[0]
  const stopping = f.instance.sessionControl.change('owner', false)
  const enabling = f.instance.sessionControl.change('owner', true)
  await tick(); assert.equal(f.children.length, 1)
  assert.equal(old.writes.at(-1).op, 'quit')
  old.exit(); await stopping; await tick()
  assert.equal(f.children.length, 2)
  f.children[1].ready(); await enabling
  old.emit({ event: 'capture-status', captureDevice: { state: 'released' } })
  old.child.emit('exit', 0, null)
  t.mock.timers.tick(6000); await tick()
  assert.deepEqual(f.children[1].kills, [])
  assert.equal(f.instance.uiBridge.status().enabled, true)
  assert.equal(f.instance.uiBridge.status().helper.online, true)
})

test('older helper without physical receipt support must exit on explicit voice stop', async t => {
  const f = await fixture(t)
  const first = f.instance.ear.transcribe('prepare-helper')
  await tick(); f.children[0].ready({ captureDeviceProtocol: undefined }); await first
  const stopping = f.instance.sessionControl.change('owner', false)
  await tick()
  assert.equal(f.children[0].writes.some(message => message.op === 'capture-status'), false)
  assert.equal(f.children[0].writes.at(-1).op, 'quit')
  assert.equal(f.instance.uiBridge.status().voiceSession.fullyStopped, false)
  f.children[0].exit(); await stopping
  assert.equal(f.instance.uiBridge.status().voiceSession.recovery.stopVerified, true)
})

test('rapid post-ready crashes exhaust five backoff retries, not five ready packets', async t => {
  const f = await fixture(t)
  const first = f.instance.ear.pttStatus()
  await tick(); f.children[0].ready(); await first
  for (const [attempt, delay] of [1000, 2000, 4000, 8000, 16000].entries()) {
    f.children.at(-1).exit()
    t.mock.timers.tick(delay - 1); await tick()
    assert.equal(f.children.length, attempt + 1, 'ready alone cannot reset the crash budget')
    t.mock.timers.tick(1); await tick()
    assert.equal(f.children.length, attempt + 2)
    f.children.at(-1).ready(); await tick()
  }
  f.children.at(-1).exit()
  t.mock.timers.tick(60_000); await tick()
  assert.equal(f.children.length, 6, 'initial child plus at most five automatic retries')
  const stopped = decodeReply('status', f.instance.uiBridge.status(f.actor))
  assert.equal(stopped.helper.online, false)
  assert.equal(f.children.length, 6, 'cached status cannot re-arm exhausted retries')
})

test('only the same ready child surviving a full stable window resets retry backoff', async t => {
  const f = await fixture(t)
  const first = f.instance.ear.pttStatus()
  await tick(); f.children[0].ready(); await first
  f.children[0].exit()
  t.mock.timers.tick(1000); await tick(); f.children[1].ready(); await tick()
  t.mock.timers.tick(29_999); await tick()
  f.children[1].exit()
  // Both the old child stability timer and time spent offline must not reset it.
  t.mock.timers.tick(1999); await tick(); assert.equal(f.children.length, 2)
  t.mock.timers.tick(1); await tick(); assert.equal(f.children.length, 3)
  f.children[0].ready(); f.children[1].ready(); f.children[0].child.emit('exit', 1, null)
  f.children[2].ready(); await tick()
  t.mock.timers.tick(30_000); await tick(); f.children[2].exit()
  t.mock.timers.tick(999); await tick(); assert.equal(f.children.length, 3)
  t.mock.timers.tick(1); await tick(); assert.equal(f.children.length, 4, 'stable ready lifetime restores one-second first retry')
})

test('explicit stop cancels pending restart and readiness probation timers', async t => {
  const f = await fixture(t)
  const first = f.instance.ear.pttStatus()
  await tick(); f.children[0].ready(); await first
  f.children[0].exit()
  await f.instance.ear.stop()
  t.mock.timers.tick(60_000); await tick()
  assert.equal(f.children.length, 1)
})

test('dependency preflight failure cannot spawn a helper and reaches cached diagnostics', async t => {
  const runtime = { resolve: async () => { throw Object.assign(new Error('Python 3.13 缺少 numpy、sounddevice；尚未启动麦克风'), { code: 'VOICE_PYTHON_DEPENDENCIES' }) }, cancel: async () => {} }
  const f = await fixture(t, { runtime })
  await assert.rejects(f.instance.ear.transcribe('synthetic.wav'), { code: 'VOICE_PYTHON_DEPENDENCIES' })
  assert.equal(f.children.length, 0)
  assert.match(f.instance.uiBridge.status(f.actor).helper.lastError, /3.13.*numpy/)
})

test('stop during interpreter preflight cancels it and fences a late successful result', async t => {
  let resolve, started = false, cancels = 0
  const pending = new Promise(done => { resolve = done })
  const runtime = { resolve: () => { started = true; return pending }, cancel: async () => { cancels++; resolve({ executable: 'verified-python', version: '3.11', optionalMissing: [] }) } }
  const f = await fixture(t, { runtime })
  const starting = f.instance.ear.transcribe('synthetic.wav')
  const rejected = assert.rejects(starting, /启动已取消/)
  await tick(); assert.equal(started, true); assert.equal(f.children.length, 0)
  await f.instance.dispose(); await rejected
  assert.ok(cancels > 0)
  assert.equal(f.children.length, 0, 'late checked runtime cannot create a helper after stop')
})


for (const [name, change] of [
  ['input route', { device: 'legacy PortAudio input' }],
  ['output route', { outputDevice: { backend: 'winmm', id: 'headphones', name: 'Headphones' } }],
  ['cue routing', { turnSignals: { enabled: true, headphonesConfirmed: true, outputDevice: 2 } }],
]) test(`changed ${name} during interpreter preflight cannot launch a stale helper`, async t => {
  let release
  const pending = new Promise(done => { release = done })
  const runtime = { resolve: () => pending, cancel: async () => {} }
  const f = await fixture(t, { runtime })
  const starting = f.instance.ear.transcribe('synthetic.wav')
  const rejected = assert.rejects(starting, /配置已改变/)
  await tick(); assert.equal(f.children.length, 0)
  f.setConfig(change)
  release({ executable: 'verified-python', version: '3.11', optionalMissing: [] })
  await rejected
  assert.equal(f.children.length, 0, 'new route needs its own dependency check')
})


test('device enumeration reuses pinned Python without starting ASR preflight or capture', async t => {
  const calls = []
  const runtime = {
    boundExecutable: config => { assert.equal(config.pythonPath, 'missing-python-alias'); return 'verified-python' },
    resolve: () => assert.fail('reading devices must not probe ASR'), cancel: async () => {},
  }
  const inventory = { schema: 1, input: { status: 'available', items: [{ backend: 'winmm', id: 'in', name: 'Input' }], reason: null }, output: { status: 'available', items: [{ backend: 'winmm', id: 'out', name: 'Output' }], reason: null } }
  const f = await fixture(t, { runtime, inspectDevices: async request => { calls.push(request); return inventory } })
  f.setConfig({ pythonPath: 'missing-python-alias' })
  await f.instance.uiBridge.readAudioDevices(f.actor)
  assert.equal(calls[0].pythonPath, 'verified-python')
  assert.equal(f.children.length, 0)
})
