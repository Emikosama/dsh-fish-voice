import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { mkdtemp, readFile, rmdir, unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createTtsRuntime, createWindowsTtsAdapter, runTtsProcess, TTS_DEFAULTS, TTS_SAMPLE, ttsSettings, validateTtsSettings } from '../voice-tts.mjs'

const voice = { id: 'TTS_MS_EN-US_ZIRA_11.0', name: 'Microsoft Zira Desktop', language: 'en-US' }
const inventory = { ok: true, systemVoices: [voice], systemDefaultVoiceId: voice.id }

test('defaults and legacy unresolved speech are local Windows, and explicitly saved choices survive', () => {
  for (const previous of [undefined, { provider: 'edge', edgeTextTransmissionAccepted: true }, { provider: 'unconfigured' }, { provider: 'deepseek' }, { provider: 'deepseek', deepseekTextTransmissionAccepted: false }, { provider: 'system', systemVoice: 'legacy' }]) {
    assert.deepEqual(ttsSettings(previous), { ...TTS_DEFAULTS, provider: 'system', systemVoiceId: null, deepseekTextTransmissionAccepted: false })
  }
  for (const provider of ['deepseek', 'off', 'local']) assert.equal(ttsSettings({ provider, deepseekTextTransmissionAccepted: true }).provider, provider)
  const { systemVoiceId, ...old } = TTS_DEFAULTS
  assert.deepEqual(validateTtsSettings(old), TTS_DEFAULTS)
  assert.equal(validateTtsSettings({ ...old, systemVoiceId: voice.id }).systemVoiceId, voice.id)
  for (const systemVoiceId of [12, '', '  ', '\u0000', 'a'.repeat(513)]) {
    assert.throws(() => validateTtsSettings({ ...old, systemVoiceId }), { code: 'TTS_INVALID_SETTINGS' })
  }
})

test('default system preview reads installed voices and plays without loading the legacy decoder or sending text in argv', async () => {
  const calls = []
  const adapter = createWindowsTtsAdapter({ platform: 'win32', async runner(command, args, request, options) {
    calls.push(request)
    assert.equal(command, 'powershell.exe')
    assert.match(args.at(-1), /tts_system_windows\.ps1$/)
    assert.ok(!args.includes(TTS_SAMPLE))
    assert.ok(options.signal instanceof AbortSignal)
    if (request.op === 'inspect') return { ...inventory, systemVoices: [voice, voice, { ...voice, id: 'invalid\u0001' }] }
    return { ok: true, completed: true, systemVoiceId: voice.id }
  } })
  const runtime = createTtsRuntime({ getConfig: () => undefined, adapter, deepseekAdapter: {
    async keyAvailable() { return false },
    async synthesize() { assert.fail('The default must stay on this computer') },
  } })
  const info = await runtime.inspect()
  assert.deepEqual(info.systemVoices, [voice])
  assert.equal(info.systemDefaultVoiceId, voice.id)
  assert.equal(info.playbackSupported, true)
  const result = await runtime.preview({ beforeRequest: () => calls.push('authorization') })
  assert.deepEqual(result, { provider: 'system', fallback: false, playbackCompleted: true, acousticConfirmation: false, systemVoiceId: voice.id })
  assert.deepEqual(calls, [{ op: 'inspect' }, 'authorization', {
    op: 'speak', text: TTS_SAMPLE, preview: true, preferChinese: true, systemVoiceId: null, volume: 0.8,
  }])
})

test('explicit output plays the synthesized WAV at the chosen endpoint and removes it after playback', async () => {
  const selected = { backend: 'winmm', id: 'fixture', name: 'Fixture Output' }
  let device = selected, tempPath, gates = 0
  const adapter = createWindowsTtsAdapter({ platform: 'win32', outputDevice: () => device, async runner(_command, args, request) {
    if (request.op === 'synthesize') {
      assert.match(args.at(-1), /tts_system_windows\.ps1$/)
      assert.equal(gates, 1)
      assert.equal(request.systemVoiceId, voice.id)
      assert.equal(request.text, 'preview checks <speech> as plain text')
      assert.equal(request.preview, false)
      assert.equal(request.preferChinese, false)
      tempPath = request.path
      await writeFile(tempPath, 'fixture')
      device = null
      return { completed: true, systemVoiceId: voice.id }
    }
    assert.match(args.at(-1), /tts_windows\.ps1$/)
    assert.deepEqual(request, { op: 'play', path: tempPath, volume: 0.55, outputDevice: selected })
    assert.equal(gates, 2)
    assert.equal(await readFile(tempPath, 'utf8'), 'fixture')
    return { completed: true }
  } })
  const runtime = createTtsRuntime({ getConfig: () => ({ provider: 'system', systemVoiceId: voice.id, volume: 0.55 }), adapter })
  const result = await runtime.speak('preview checks <speech> as plain text', { beforeRequest: () => gates++ })
  assert.equal(result.playbackCompleted, true)
  await assert.rejects(readFile(tempPath), { code: 'ENOENT' })
})

test('cancelling system speech observes process exit before another request can speak', async () => {
  let child, kills = 0
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner(command, args, request, options) {
    child = new EventEmitter()
    child.pid = 100
    child.stdin = new PassThrough()
    child.stdout = new PassThrough()
    child.stderr = new PassThrough()
    child.kill = () => { kills++ }
    return runTtsProcess(command, args, request, { ...options, spawnProcess: () => child })
  } })
  const runtime = createTtsRuntime({ getConfig: () => TTS_DEFAULTS, adapter })
  const speech = assert.rejects(runtime.speak('Test'), { code: 'TTS_CANCELLED' })
  const cancelling = runtime.cancel()
  assert.equal(kills, 1)
  assert.equal(runtime.status().busy, true)
  await assert.rejects(runtime.preview(), { code: 'TTS_BLOCKED' })
  child.emit('close', null)
  await speech
  assert.deepEqual(await cancelling, { status: 'cancelled' })
  assert.equal(runtime.status().busy, false)
})

test('opt-in real Windows helper produces non-silent PCM without opening audio output', { skip: process.platform !== 'win32' || process.env.FISH_TEST_SYSTEM_TTS_NATIVE !== '1' }, async () => {
  const path = fileURLToPath(new URL('../helper/tts_system_windows.ps1', import.meta.url))
  const call = input => runTtsProcess('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-MTA', '-ExecutionPolicy', 'RemoteSigned', '-File', path], input, { nativeAudioErrors: true })
  const info = await call({ op: 'inspect' })
  assert.ok(info.systemVoices.length > 0)
  const directory = await mkdtemp(join(tmpdir(), 'fish-os-tts-test-'))
  const wave = join(directory, 'test.wav')
  try {
    const fixture = { op: 'synthesize', path: wave, preview: true, preferChinese: true, text: TTS_SAMPLE }
    await assert.rejects(call({ ...fixture, systemVoiceId: 'absent-fixture-voice' }), { code: 'TTS_SYSTEM_VOICE_UNAVAILABLE' })
    const selected = await call({ ...fixture, systemVoiceId: null })
    const expectedVoices = info.systemVoices.filter(voice => /^zh(?:-|$)/i.test(voice.language))
    assert.ok(expectedVoices.length ? expectedVoices.some(voice => voice.id === selected.systemVoiceId) : selected.systemVoiceId === (info.systemDefaultVoiceId ?? info.systemVoices[0].id))
    const bytes = await readFile(wave)
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.equal(bytes.toString('ascii', 8, 12), 'WAVE')
    assert.ok(bytes.length > 8000)
    assert.ok(bytes.subarray(128).some(sample => sample !== 0))
  } finally {
    await unlink(wave).catch(() => {})
    await rmdir(directory)
  }
})
