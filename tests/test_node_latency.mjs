import assert from 'node:assert/strict'
import { after, beforeEach, test } from 'node:test'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Isolated fake host: no Python process, microphone, network or real session.
const home = mkdtempSync(join(tmpdir(), 'whale-latency-'))
process.env.DSH_HOME = home
const { apply } = await import('../index.mjs')
const configPath = join(home, 'whale-ear', 'config.json')
let delivered, ear, settings, initialGrantEpoch
function save(overrides = {}) {
  settings = { ...settings, ...overrides }
  writeFileSync(configPath, JSON.stringify(settings))
}
beforeEach(async () => {
  globalThis.__dshWhaleEar__?.dispose()
  mkdirSync(join(home, 'whale-ear'), { recursive: true })
  settings = { autoStart: false, voiceSessionId: 'isolated-test', maxPerMinute: 100, voiceSession: { enabled: false } }
  save()
  delivered = []
  const handle = { id: 'isolated-test', status: 'idle', session: { id: 'isolated-test' }, async followup(message) { delivered.push(message) } }
  apply({
    provide() {}, effect() {},
    agents: { get(id) { return id === 'isolated-test' ? handle : null } },
    tools: { register() {} }, sessions: { flush() {} },
  }, { autoStart: false })
  ear = globalThis.__dshWhaleEar__.ear
  // Cold startup correctly withdraws disk-only grants. Exercise the real
  // explicit grant transition; replace only audio I/O so this latency fixture
  // still starts no Python process and touches no microphone or network.
  ear.alwaysOff = async () => ({ status: { enabled: false } })
  ear.stop = async () => ({ event: 'stopped' })
  ear.pttStatus = async () => ({ event: 'ptt-status' })
  await globalThis.__dshWhaleEar__.sessionControl.change(handle.id, true, new AbortController().signal)
  settings = JSON.parse(readFileSync(configPath, 'utf8'))
  initialGrantEpoch = settings.voiceSessionEpoch
})
after(() => {
  globalThis.__dshWhaleEar__?.dispose()
  rmSync(home, { recursive: true, force: true })
})
const result = (overrides = {}) => ({
  text: '你好，测试语句。', voiceSessionId: 'isolated-test', voiceSessionEpoch: initialGrantEpoch, speaker_ok: null,
  speaker_score: null, dur: 3, emotion: 'NEUTRAL', prosody: { meanF0: 180 }, ...overrides,
})

test('migrates old config to experimental speaker verification disabled', () => {
  assert.deepEqual(JSON.parse(readFileSync(configPath)).speakerVerification, { enabled: false })
})
test('disabled speaker gate accepts transcript and does not fabricate score zero', async () => {
  assert.equal(await ear.deliver(result({ speaker_ok: false, speaker_score: 0.2 })), true)
  assert.equal(delivered.length, 1)
  const message = delivered[0]
  assert.ok(!message.content[0].text.includes('声纹:'))
  assert.ok(message.content[0].text.includes('情感:NEUTRAL'))
  assert.ok(message.content[0].text.includes('音高:180Hz'))
  assert.ok(message.source.summary.includes('实验功能关闭'))
})
test('explicit enabled speaker gate blocks mismatch and retains matched metadata', async () => {
  save({ speakerVerification: { enabled: true } })
  assert.equal(await ear.deliver(result({ speaker_ok: false, speaker_score: 0.2 })), false)
  assert.equal(await ear.deliver(result({ speaker_ok: true, speaker_score: 0.8 })), true)
  assert.equal(delivered.length, 1)
  assert.ok(delivered[0].content[0].text.includes('声纹:0.80'))
})
test('unregistered score is not displayed as zero with feature enabled', async () => {
  save({ speakerVerification: { enabled: true } })
  assert.equal(await ear.deliver(result()), true)
  assert.ok(!delivered[0].content[0].text.includes('声纹:0.00'))
  assert.ok(delivered[0].source.summary.includes('未注册'))
})
test('only literal true enables experimental gate', async () => {
  for (const enabled of [false, null, 'true', 1]) {
    save({ speakerVerification: { enabled } })
    assert.equal(await ear.deliver(result({ speaker_ok: false })), true)
  }
})
test('disabled feature does not bypass single-session authorization or empty text guard', async () => {
  assert.equal(await ear.deliver(result({ voiceSessionId: 'old-session' })), false)
  assert.equal(await ear.deliver(result({ text: '  ' })), false)
  save({ voiceSessionId: null })
  assert.equal(await ear.deliver(result()), false)
  assert.equal(delivered.length, 0)
})
test('re-enable of the same owner rejects old authorization epoch', async () => {
  save({ voiceSessionEpoch: 'new-grant' })
  assert.equal(await ear.deliver(result({ voiceSessionEpoch: 'old-grant' })), false)
  assert.equal(await ear.deliver(result()), false)
  assert.equal(await ear.deliver(result({ voiceSessionEpoch: 'new-grant' })), true)
  assert.equal(delivered.length, 1)
})
test('latency telemetry allows only finite content-free durations and generated trace IDs', async () => {
  await ear.deliver(result({ traceId: '0123456789abcdef', timings: {
    asrMs: 42, processingMs: 50, speakerMs: null, prosodyMs: -3,
    semanticMs: Infinity, privateText: 'must not be in timing log',
  } }))
  const timing = ear.latency()
  assert.equal(timing.traceId, '0123456789abcdef')
  assert.equal(timing.asrMs, 42)
  assert.equal(timing.processingMs, 50)
  assert.ok(timing.receiptToDispatchMs >= 0 && timing.dispatchAwaitMs >= 0)
  assert.ok(!('privateText' in timing) && !('speakerMs' in timing) && !('prosodyMs' in timing) && !('semanticMs' in timing))
  const lines = readFileSync(join(home, 'whale-ear', 'whale-ear.log'), 'utf8').split('\n').filter(line => line.includes('latency:'))
  assert.ok(lines.length)
  assert.ok(lines.every(line => !line.includes('测试语句') && !line.includes('must not')))
  timing.asrMs = 0
  assert.equal(ear.latency().asrMs, 42)
  await ear.deliver(result({ traceId: 'private-text' }))
  assert.equal(ear.latency().traceId, null)
})
