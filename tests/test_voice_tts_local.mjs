import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, truncate, rm, symlink, access, realpath } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { createTtsRuntime, TTS_DEFAULTS, ttsSettings, runTtsProcess, localTimingStatus } from '../voice-tts.mjs'
import { LOCAL_TTS_ASSETS, LOCAL_TTS_MODEL_ID, createLocalTtsAdapter, validateLocalTtsAssets } from '../voice-tts-local.mjs'
import { requireFileSymlink } from './helpers/symlink.mjs'
function sampleWav() {
  const wav = Buffer.alloc(46); wav.write('RIFF'); wav.writeUInt32LE(38, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(24000, 24); wav.writeUInt32LE(48000, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(2, 40); return wav
}
async function assets() {
  const root = await mkdtemp(join(tmpdir(), 'whale-tts-test-'))
  for (const [name, size] of Object.entries(LOCAL_TTS_ASSETS)) {
    const path = join(root, name); await mkdir(join(path, '..'), { recursive: true }); await writeFile(path, ''); await truncate(path, size)
  }
  return root
}
function setup(localAdapter) {
  const calls = []
  const config = { ...TTS_DEFAULTS, provider: 'local', localModelId: LOCAL_TTS_MODEL_ID, localModelPath: '/managed/model' }
  const adapter = { async inspect() { return { playbackSupported: true, edgePlaybackSupported: true } }, async system() { calls.push('system') }, async edge() { calls.push('edge') } }
  return { runtime: createTtsRuntime({ getConfig: () => config, adapter, localAdapter }), calls, config }
}
test('legacy settings preserve explicit Edge selection; local settings are additive', () => {
  assert.equal(ttsSettings({ provider: 'edge', edgeTextTransmissionAccepted: true }).provider, 'edge')
  assert.equal(ttsSettings({ provider: 'off' }).provider, 'off')
  assert.throws(() => ttsSettings({ provider: 'local', localModelPath: 'relative' }), { code: 'TTS_INVALID_SETTINGS' })
})
test('local playback requires actual loaded capability and completion, never system/Edge fallback', async () => {
  let supported = false, completed = false
  const f = setup({ async inspect() { return { localSynthesisSupported: supported } }, async speak() { return { completed } } })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_LOCAL_UNAVAILABLE' })
  supported = true
  await assert.rejects(f.runtime.preview(), { code: 'TTS_COMPLETION_UNCONFIRMED' })
  completed = true
  assert.deepEqual(await f.runtime.preview(), { provider: 'local', fallback: false, playbackCompleted: true, acousticConfirmation: false })
  assert.deepEqual(f.calls, [])
})
test('local uncertain termination locks runtime and never starts another provider', async () => {
  const f = setup({ async inspect() { return { localSynthesisSupported: true } }, async speak() { throw Object.assign(new Error('stopping'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true }) } })
  await assert.rejects(f.runtime.preview(), { code: 'TTS_TERMINATION_UNCONFIRMED' })
  assert.equal(f.runtime.status().blocked, true)
  await assert.rejects(f.runtime.preview(), { code: 'TTS_BLOCKED' })
  assert.deepEqual(f.calls, [])
})
test('asset gate rejects missing and wrong-sized files; unknown models cannot execute', async () => {
  const root = await assets()
  try {
    assert.equal(await validateLocalTtsAssets(root), await realpath(root))
    const adapter = createLocalTtsAdapter({ runner: () => { throw Error('must not run') } })
    assert.equal((await adapter.inspect({ localModelId: 'arbitrary', localModelPath: root })).localSynthesisSupported, false)
    await assert.rejects(adapter.synthesize('test', { localModelId: 'arbitrary', localModelPath: root }), { code: 'TTS_LOCAL_MODEL_UNSUPPORTED' })
    await truncate(join(root, 'tokens.txt'), 1)
    await assert.rejects(validateLocalTtsAssets(root), { code: 'TTS_LOCAL_MODEL_INVALID' })
    await rm(join(root, 'tokens.txt'))
    await assert.rejects(validateLocalTtsAssets(root), { code: 'ENOENT' })
  } finally { await rm(root, { recursive: true, force: true }) }
})
test('asset gate rejects linked files without touching their target', async t => {
  const root = await assets()
  try {
    if (!requireFileSymlink(t, root)) return
    const { readFile } = await import('node:fs/promises')
    const target = join(root, 'original-tokens.txt'), before = await readFile(join(root, 'tokens.txt'))
    await writeFile(target, before)
    await rm(join(root, 'tokens.txt')); await symlink(target, join(root, 'tokens.txt'), 'file')
    await assert.rejects(validateLocalTtsAssets(root), { code: 'TTS_LOCAL_MODEL_INVALID' })
    assert.deepEqual(await readFile(target), before)
  } finally { await rm(root, { recursive: true, force: true }) }
})
test('synthesis passes private text only via stdin and cleans temporary WAV after consumption', async () => {
  const root = await assets(); let output
  try {
    await writeFile(join(root, 'sherpa-entry.js'), '')
    const adapter = createLocalTtsAdapter({ modulePath: join(root, 'sherpa-entry.js'), runner: async (exe, args, payload, options) => {
      assert.equal(args.some(x => x.includes('PRIVATE')), false)
      assert.equal(options.env.ELECTRON_RUN_AS_NODE, '1')
      assert.equal(payload.text, 'PRIVATE'); output = payload.output
      const wav = sampleWav()
      await writeFile(output, wav)
      return { ok: true, synthesized: true }
    } })
    assert.equal(await adapter.synthesize('PRIVATE', { localModelId: LOCAL_TTS_MODEL_ID, localModelPath: root }, new AbortController().signal, async path => { await access(path); return 'consumed' }), 'consumed')
    await assert.rejects(access(output))
  } finally { await rm(root, { recursive: true, force: true }) }
})
test('real subprocess invalid private request returns only sanitized error', async () => {
  const worker = fileURLToPath(new URL('../voice-tts-local-worker.mjs', import.meta.url))
  const payload = { op: 'bad', text: 'PRIVATE' }
  const result = spawnSync(process.execPath, [worker], { input: JSON.stringify(payload), encoding: 'utf8', timeout: 10000, windowsHide: true })
  assert.equal(result.error, undefined)
  assert.equal(result.status, 1)
  assert.equal(result.stderr, '')
  assert.deepEqual(JSON.parse(result.stdout), { ok: false, code: 'TTS_LOCAL_SYNTHESIS_FAILED' })
  await assert.rejects(runTtsProcess(process.execPath, [worker], payload), error => error.code === 'TTS_PROCESS_FAILED' && !error.message.includes('PRIVATE'))
})

test('managed Qwen uses approved paths and private file, no prompt argv, then cleans up', async () => {
  const { createManagedLocalTtsAdapter } = await import('../voice-tts-local.mjs')
  const { readFile } = await import('node:fs/promises')
  const root = await mkdtemp(join(tmpdir(), 'whale-qwen-test-'))
  let promptPath, outputPath, calls = 0, played = 0
  try {
    for (const name of ['llama-tts', 'model.gguf', 'tokenizer.gguf']) await writeFile(join(root, name), 'stub')
    const adapter = createManagedLocalTtsAdapter({ resolveManagedLocalTts: async () => ({ engine: 'llama-qwen3', modelId: 'qwen', executable: join(root, 'llama-tts'), model: join(root, 'model.gguf'), mmproj: join(root, 'tokenizer.gguf') }),
      runner: async (exe, args, payload, options) => {
        calls++; assert.equal(args[args.indexOf('-c') + 1], '4096'); assert.ok(Number(args[args.indexOf('-t') + 1]) <= 4); assert.equal(options.captureJson, false); assert.equal(args.includes('PRIVATE'), false)
        promptPath = args[args.indexOf('-f') + 1]; outputPath = args[args.indexOf('--output') + 1]
        assert.equal(await readFile(promptPath, 'utf8'), calls === 1 ? '你好。' : 'PRIVATE')
        const wav = sampleWav(); await writeFile(outputPath, wav)
        return { ok: true, audioFrames: 10 }
      }, playback: async path => { played++; await access(path); return { completed: true } } })
    const cfg = { localModelId: 'qwen' }
    assert.equal((await adapter.inspect(cfg)).localSynthesisSupported, false)
    assert.equal(calls, 0)
    const probe = await adapter.probe(cfg)
    assert.equal(probe.localSynthesisSupported, true)
    assert.equal(probe.synthesisVerified, true)
    assert.equal(probe.modelResident, false)
    assert.equal(probe.localRuntime, 'ready')
    assert.equal((await adapter.inspect(cfg)).localSynthesisSupported, true)
    assert.equal(calls, 1)
    const spoken = await adapter.speak('PRIVATE', cfg)
    assert.deepEqual(localTimingStatus(spoken), {localTimings: spoken.localTimings})
    assert.equal(spoken.localTimings.modelResident, false)
    const {localTimings, ...speechResult} = spoken
    assert.deepEqual(speechResult, { completed: true, localComputeRequested: 'cpu', localComputeBackend: 'cpu', localComputeDevice: null, localComputeVerified: true, localComputeFallback: false, localComputeReason: null })
    assert.equal(played, 1); await assert.rejects(adapter.speak('字'.repeat(401), cfg), { code: 'TTS_INVALID_TEXT' }); assert.equal(calls, 2); await assert.rejects(access(promptPath)); await assert.rejects(access(outputPath))
  } finally { await rm(root, { recursive: true, force: true }) }
})

test('native completion metadata extracts counters without returning diagnostic text', async () => {
  const result = await runTtsProcess(process.execPath, ['-e', "process.stderr.write('PRIVATE\\ngenerated 12 frames, 8000 bytes of WAV audio (24000 Hz)\\n')"], null, { captureJson: false })
  assert.deepEqual(result, { ok: true, completed: true, audioFrames: 12 })
  assert.equal(JSON.stringify(result).includes('PRIVATE'), false)
})
test('native environment excludes preload hooks and host credentials', async () => {
  const { localTtsProcessEnvironment } = await import('../voice-tts-local.mjs')
  assert.deepEqual(localTtsProcessEnvironment({ PATH: '/usr/bin', HOME: '/tmp/home', LD_PRELOAD: 'bad', LD_LIBRARY_PATH: 'bad', DYLD_INSERT_LIBRARIES: 'bad', GGML_BACKEND_PATH: 'bad', NODE_OPTIONS: 'bad', HF_TOKEN: 'secret', DSH_TOKEN: 'secret' }), { PATH: '/usr/bin', HOME: '/tmp/home' })
})
test('verifyLocalTts is explicit, silent and cancellable through the same output lock', async () => {
  let begin
  const started = new Promise(resolve => { begin = resolve })
  const f = setup({ async inspect() { return { localReady: true, localSynthesisSupported: false } },
    async probe(_config, signal) { begin(); await new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(Object.assign(new Error('cancelled'), { code: 'TTS_CANCELLED' })), { once: true })) } })
  await f.runtime.inspect()
  const pending = f.runtime.verifyLocalTts(); const rejected = assert.rejects(pending, { code: 'TTS_CANCELLED' })
  await started
  await assert.rejects(f.runtime.speak('test'), { code: 'TTS_BUSY' })
  assert.equal((await f.runtime.cancel()).status, 'cancelled')
  await rejected
  assert.deepEqual(f.calls, [])
})

test('production local provider fails closed without a trusted managed resolver', async () => {
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider: 'local', localModelId: LOCAL_TTS_MODEL_ID, localModelPath: '/arbitrary' }), adapter: { async inspect() { return { playbackSupported: true } } } })
  const capabilities = await runtime.inspect()
  assert.equal(capabilities.localReady, false)
  assert.equal(capabilities.synthesisVerified, false)
  await assert.rejects(runtime.speak('PRIVATE'), { code: 'TTS_LOCAL_RESOLVER_MISSING' })
  await assert.rejects(runtime.verifyLocalTts(), { code: 'TTS_LOCAL_RESOLVER_MISSING' })
})

test('local long text splits sequentially without dropping Unicode content', async () => {
  const spoken = []; let running = false
  const f = setup({ async inspect() { return { localReady: true } }, async speak(text) { assert.equal(running, false); running = true; assert.ok(text.length <= 400); assert.ok(Buffer.byteLength(text) <= 1200); await new Promise(resolve => setImmediate(resolve)); spoken.push(text); running = false; return { completed: true } } })
  const text = ('你好😀，这是连续朗读。'.repeat(150))
  assert.equal((await f.runtime.speak(text)).playbackCompleted, true)
  assert.equal(spoken.join(''), text)
  assert.ok(spoken.length > 1)
  assert.ok(spoken.every(chunk => !/[\uD800-\uDBFF]$/.test(chunk) && !/^[\uDC00-\uDFFF]/.test(chunk)))
})
test('cancellation during a later local chunk confirms stop and never begins remaining chunks', async () => {
  const spoken = []; let begin
  const started = new Promise(resolve => { begin = resolve })
  const f = setup({ async inspect() { return { localReady: true } }, async speak(text, _config, signal) {
    spoken.push(text)
    if (spoken.length === 1) return { completed: true }
    begin(); await new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(Object.assign(new Error('cancelled'), { code: 'TTS_CANCELLED' })), { once: true }))
  } })
  const pending = f.runtime.speak('字'.repeat(1600)); const rejected = assert.rejects(pending, { code: 'TTS_CANCELLED' })
  await started; assert.equal((await f.runtime.cancel()).status, 'cancelled'); await rejected
  assert.equal(spoken.length, 2)
})
test('failed local chunk prevents later generation and never falls back', async () => {
  let calls = 0
  const f = setup({ async inspect() { return { localReady: true } }, async speak() { calls++; if (calls === 2) throw Object.assign(new Error('failed'), { code: 'TTS_PROCESS_FAILED' }); return { completed: true } } })
  await assert.rejects(f.runtime.speak('字'.repeat(1600)), { code: 'TTS_PROCESS_FAILED' })
  assert.equal(calls, 2); assert.deepEqual(f.calls, [])
})
