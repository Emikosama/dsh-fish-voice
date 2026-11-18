import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { registerHooks } from 'node:module'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
const indexUrl = new URL('../index.mjs', import.meta.url).href
const ttsUrl = new URL('../voice-tts.mjs', import.meta.url).href
const { createWindowsTtsAdapter, createTtsRuntime, runTtsProcess } = await import(ttsUrl)
const tick = () => new Promise(resolve => setImmediate(resolve))
async function fixture({ uncertainFirst = false, killGraceMs = 80, candidate = false, services = {} } = {}) {
  const home = mkdtempSync(join(tmpdir(), 'whale-public-inspect-'))
  const previousHome = process.env.DSH_HOME
  process.env.DSH_HOME = home
  mkdirSync(join(home, 'whale-ear'))
  writeFileSync(join(home, 'whale-ear', 'config.json'), JSON.stringify({ autoStart: false, voiceSession: { enabled: false }, tts: { provider: 'off' } }))
  const children = []
  const adapterFactory = options => createWindowsTtsAdapter({ ...options, platform: 'win32', runner(command, args, payload, processOptions) {
    const child = new EventEmitter(), kills = [], index = children.length
    child.pid = 1000 + index
    child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough()
    child.kill = signal => { kills.push(signal ?? 'SIGTERM'); return true }
    const record = { child, kills, payload, closed: false, signal: processOptions.signal, close(value) {
      if (this.closed) return
      this.closed = true
      child.stdout.write(JSON.stringify(value)); child.emit('close', 0)
    } }
    children.push(record)
    return runTtsProcess(command, args, payload, { ...processOptions, timeoutMs: 2000, killGraceMs, spawnProcess: () => child })
  } })
  const key = '__publicInspectRepro' + randomUUID().replaceAll('-', '')
  let probeResolve, probeReject, probeSignal, probeCalls = 0, runtimeCount = 0
  const probe = new Promise((resolve, reject) => { probeResolve = resolve; probeReject = reject }); probe.catch(() => {})
  const job = { id: 'job', modelId: 'qwen', purpose: 'tts', status: 'installed', recommendedSettings: { tts: { provider: 'local', localModelId: 'qwen', localModelPath: '/managed/qwen' } } }
  globalThis[key] = { adapterFactory,
    createTtsRuntime: options => createTtsRuntime(runtimeCount++ ? { ...options, localAdapter: { async probe(config, signal) { probeCalls++; probeSignal = signal; return probe } } } : options),
    createModelInstaller: () => ({ snapshot: () => ({ jobs: [job], models: [] }), verifyInstalled: async () => job, subscribe: () => () => {}, close: async () => {} }),
  }
  const hook = registerHooks({ resolve(specifier, context, next) {
    if (context.parentURL?.startsWith(`${indexUrl}?`) && specifier === './voice-tts.mjs') return { url: 'data:text/javascript,' + encodeURIComponent(`export { TTS_DEFAULTS, ttsSettings } from ${JSON.stringify(ttsUrl)}; export const createWindowsTtsAdapter = globalThis.${key}.adapterFactory; export const createTtsRuntime = globalThis.${key}.createTtsRuntime;`), shortCircuit: true }
    if (candidate && context.parentURL?.startsWith(`${indexUrl}?`) && specifier === './voice-model-installer.mjs') return { url: 'data:text/javascript,' + encodeURIComponent(`export const createModelInstaller = globalThis.${key}.createModelInstaller;`), shortCircuit: true }
    return next(specifier, context)
  } })
  const actor = { session: { id: 'owner' } }
  const agents = new Map([['owner', actor]])
  const ctx = { agents, tools: { register() { return () => {} } }, sessions: {}, provide() {}, effect() {}, on() { return () => {} }, get(name) { return services[name] } }
  let instance
  try {
    const module = await import(`${indexUrl}?inspectRace=${randomUUID()}`)
    module.apply(ctx, { autoStart: false })
    instance = globalThis.__dshWhaleEar__
    assert.ok(instance)
  } finally { hook.deregister(); delete globalThis[key] }
  // apply() retires the idle owned engine when voice starts disabled. Wait for
  // that lifecycle fence before testing admission into a fresh public inspection.
  await tick()
  const replyInspection = from => {
    children[from].close({ ok: true, playbackSupported: true, filePlaybackSupported: true })
  }
  return { instance, ui: instance.uiBridge, actor, children, replyInspection, probeResolve, probeReject, probeSignal: () => probeSignal, probeCalls: () => probeCalls, async cleanup() {
    probeReject(new Error('cleanup'))
    for (const child of children) child.close({ ok: true, completed: true })
    await instance.dispose().catch(() => {})
    delete globalThis.__dshWhaleEar__
    if (previousHome === undefined) delete process.env.DSH_HOME; else process.env.DSH_HOME = previousHome
    rmSync(home, { recursive: true, force: true })
  } }
}
test('real entry public inspect owns cancellation through the native output probe', async () => {
  const f = await fixture({ killGraceMs: 1000 })
  try {
    const pending = f.ui.inspectTts(f.actor)
    const failed = assert.rejects(pending, { code: 'TTS_CANCELLED' })
    assert.equal(f.children.length, 1)
    assert.equal(f.ui.status(f.actor).ttsRuntime.busy, true)
    assert.equal(f.instance.tts.status().inspected, false)
    await assert.rejects(f.ui.previewTts(f.actor), { code: 'TTS_BUSY' })
    await assert.rejects(f.ui.inspectTts(f.actor), { code: 'TTS_BUSY' })
    await assert.rejects(f.instance.tts.verifyLocalTts(), { code: 'TTS_BUSY' })
    assert.equal(f.children.length, 1)
    let cancelled = false
    const stop = f.ui.cancelTts(f.actor).then(result => { cancelled = true; return result })
    assert.ok(f.children.every(child => child.kills.length === 1))
    await tick()
    assert.equal(cancelled, false, 'stop waits until the native output process exits')
    assert.equal(f.ui.status(f.actor).ttsRuntime.busy, true)
    f.children[0].close({ ok: true })
    await tick()
    assert.equal((await stop).status, 'cancelled')
    assert.equal(cancelled, true)
    await failed
    assert.equal(f.instance.tts.status().inspected, false)
    assert.equal(f.instance.tts.status().busy, false)
    assert.equal(f.instance.tts.status().blocked, false)
  } finally { await f.cleanup() }
})
test('real entry unload waits for public inspection, rejects new admission', async () => {
  const f = await fixture({ killGraceMs: 1000 })
  try {
    const failed = assert.rejects(f.ui.inspectTts(f.actor), { code: 'TTS_CANCELLED' })
    let disposed = false
    const disposal = f.instance.dispose().then(() => { disposed = true })
    await tick()
    assert.equal(disposed, false)
    assert.ok(f.children.every(child => child.kills.length === 1))
    f.children[0].close({ ok: true })
    await disposal; await failed
    await assert.rejects(f.instance.tts.inspect(), { code: 'TTS_BLOCKED' })
    assert.equal(f.instance.tts.status().inspected, false)
    assert.equal(f.children.length, 1)
  } finally { await f.cleanup() }
})
test('real entry uncertain inspection exit locks every new operation', async () => {
  const f = await fixture()
  try {
    const failed = assert.rejects(f.ui.inspectTts(f.actor), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
    const stopping = assert.rejects(f.ui.cancelTts(f.actor), { code: 'TTS_TERMINATION_UNCONFIRMED' })
    await stopping; await failed
    const status = f.instance.tts.status()
    assert.equal(status.state, 'blocked'); assert.equal(status.blocked, true); assert.equal(status.inspected, false)
    await assert.rejects(f.instance.tts.inspect(), { code: 'TTS_BLOCKED' })
    await assert.rejects(f.instance.tts.preview(), { code: 'TTS_BLOCKED' })
    await assert.rejects(f.instance.tts.verifyLocalTts(), { code: 'TTS_BLOCKED' })
    f.children[0].close({ ok: true })
    await tick()
    assert.equal(f.instance.tts.status().state, 'blocked')
    assert.equal(f.instance.tts.status().blocked, true)
    assert.equal(f.children.length, 1)
    await assert.rejects(f.instance.dispose(), AggregateError)
  } finally { await f.cleanup() }
})
test('real entry complete inspection commits once; disabled speech cannot be previewed', async () => {
  const f = await fixture()
  try {
    const pending = f.ui.inspectTts(f.actor)
    f.replyInspection(0)
    const info = await pending
    assert.equal(info.playbackSupported, true)
    assert.equal(info.filePlaybackSupported, true)
    assert.equal(f.instance.tts.status().inspected, true)
    assert.equal(f.instance.tts.status().busy, false)
    await assert.rejects(f.ui.previewTts(f.actor), { code: 'TTS_NOT_CONFIGURED' })
    assert.equal(f.children.length, 1, 'disabled preview must not start a speech process')
  } finally { await f.cleanup() }
})

test('real entry checks the credential selected by the native official model settings', async () => {
  class DeepSeekAdapter {
    providerInfo(id) { return { id, name: 'DeepSeek' } }
  }
  const references = []
  const f = await fixture({ services: {
    llm: {
      adapters: new Map([['deepseek-official', { adapter: new DeepSeekAdapter() }]]),
      listConfigurableProviders: () => [{ provider: 'deepseek-official', settingsNs: 'llm-deepseek', settingsPath: [] }],
    },
    settings: { describe: () => [{ ns: 'llm-deepseek', value: { apiKeyEnv: 'OFFICIAL_TEST_KEY' } }] },
    credentials: { async resolve(ref) { references.push(ref); return ref === 'OFFICIAL_TEST_KEY' ? { value: 'sk-test' } : undefined } },
  } })
  try {
    const pending = f.ui.inspectTts(f.actor)
    f.replyInspection(0)
    assert.equal((await pending).deepseekKeyAvailable, true)
    assert.deepEqual(references, ['OFFICIAL_TEST_KEY'])
  } finally { await f.cleanup() }
})
