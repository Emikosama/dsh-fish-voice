import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import fsPromises from 'node:fs/promises'
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises'
import { join, sep } from 'node:path'
import childProcess from 'node:child_process'
import { syncBuiltinESMExports } from 'node:module'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { tmpdir } from 'node:os'
import { createModelInstaller } from '../voice-model-installer.mjs'
import { createTtsRuntime, runTtsProcess, TTS_DEFAULTS } from '../voice-tts.mjs'

const hash = bytes => createHash('sha256').update(bytes).digest('hex')
function tar(name, bytes) {
  const header = Buffer.alloc(512)
  header.write(name); header.write('0000700\0', 100); header.write(bytes.length.toString(8).padStart(11, '0') + '\0', 124)
  header.fill(32, 148, 156); header.write('0', 156); header.write('ustar\0', 257)
  header.write([...header].reduce((sum, byte) => sum + byte, 0).toString(8).padStart(6, '0') + '\0 ', 148)
  return Buffer.concat([header, bytes, Buffer.alloc((512 - bytes.length % 512) % 512), Buffer.alloc(1024)])
}
// Uses the production runtime-created managed adapter and installer, with a real
// small Node child on POSIX, or a controlled child-process contract on Windows
// (also runnable on POSIX explicitly). Neither tests model inference or Windows
// audio. The installer always verifies the real fixture bytes and SHA hashes.
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'whale-managed-preflight-')), log = join(root, 'syntheses')
  const originalSpawn = childProcess.spawn
  if (process.platform === 'win32' || process.env.WHALE_TTS_TEST_CONTROLLED_PROCESS === '1') {
    childProcess.spawn = (command, args, options) => {
      if (!String(command).startsWith(root + sep) || !String(command).endsWith('llama-tts')) return originalSpawn(command, args, options)
      const child = new EventEmitter()
      child.pid = 1234; child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough()
      let killed = false
      child.kill = () => { killed = true; setImmediate(() => child.emit('close', null)); return true }
      setImmediate(async () => {
        if (killed) return
        try {
          if (args.includes('--version')) child.stdout.end('version: 12110\n')
          else {
            await writeFile(log, (await readFile(log, 'utf8').catch(error => { if (error.code === 'ENOENT') return ''; throw error })) + 'synthesis\n')
            const wav = Buffer.alloc(46)
            wav.write('RIFF'); wav.writeUInt32LE(38, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16)
            wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(24000, 24); wav.writeUInt32LE(48000, 28)
            wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(2, 40)
            await writeFile(args[args.indexOf('--output') + 1], wav)
            child.stderr.end('generated 1 frames, 46 bytes of WAV audio (24000 Hz)\n')
          }
          if (!killed) child.emit('close', 0)
        } catch { if (!killed) child.emit('close', 1) }
      })
      return child
    }
    syncBuiltinESMExports()
  }
  t.after(() => { childProcess.spawn = originalSpawn; syncBuiltinESMExports() })
  const executable = Buffer.from(`#!${process.execPath}\nconst fs = require('node:fs'); if (process.argv.includes('--version')) console.log('version: 12110'); else { fs.appendFileSync(${JSON.stringify(log)}, 'synthesis\\n'); const wav = Buffer.alloc(46); wav.write('RIFF'); wav.writeUInt32LE(38,4); wav.write('WAVEfmt ',8); wav.writeUInt32LE(16,16); wav.writeUInt16LE(1,20); wav.writeUInt16LE(1,22); wav.writeUInt32LE(24000,24); wav.writeUInt32LE(48000,28); wav.writeUInt16LE(2,32); wav.writeUInt16LE(16,34); wav.write('data',36); wav.writeUInt32LE(2,40); fs.writeFileSync(process.argv[process.argv.indexOf('--output')+1],wav); process.stderr.write('generated 1 frames, 46 bytes of WAV audio (24000 Hz)\\n'); }\n`)
  const archive = gzipSync(tar('bin/llama-tts', executable)), weights = Buffer.alloc(1024, 42)
  const runtimePackage = { file: 'runtime.tar.gz', format: 'tar.gz', bytes: archive.length, sha256: hash(archive), executable: 'llama-tts', source_url: 'https://test.invalid/runtime', entries: [{ entry: 'bin/llama-tts', file: 'llama-tts', bytes: executable.length, sha256: hash(executable), executable: true }] }
  const modelId = 'qwen3-tts-base-1.7b-gguf', main = 'Qwen3-TTS-12Hz-1.7B-Base-Q4_K_M.gguf', mmproj = 'mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf'
  const files = [main, mmproj].map(file => ({ file, bytes: weights.length, sha256: hash(weights), source_url: 'https://test.invalid/model' }))
  files.push({ file: runtimePackage.file, bytes: archive.length, sha256: hash(archive), source_url: runtimePackage.source_url })
  const counts = { verify: 0, version: 0, playback: 0, capabilities: 0 }
  const hooks = { verified: async () => {}, verificationStarted: () => {}, playback: async () => {} }
  const installer = createModelInstaller({ root: join(root, 'models'), catalog: { schema: 1, models: [{ id: modelId, revision: 'a'.repeat(40), runtimePackage, files }] }, allowUrl: url => new URL(url).hostname === 'test.invalid',
    runtimeRunner: async (...args) => { const result = await runTtsProcess(...args); counts.version++; return result },
    fetchImpl: async url => { const bytes = url.endsWith('/runtime') ? archive : weights; return new Response(bytes, { headers: { 'content-length': String(bytes.length) } }) },
  })
  let runtime
  t.after(async () => { await runtime?.dispose(); await installer.close(); await rm(root, { recursive: true, force: true }) })
  const plan = installer.plan(modelId), job = installer.start({ modelId, compute: 'cpu', planHash: plan.planHash, accepted: true }), installed = await installer.settled(job.id)
  assert.equal(installed.status, 'installed', JSON.stringify(installed.error)); counts.version = 0
  const original = installer.verifyInstalled.bind(installer)
  installer.verifyInstalled = async (...args) => { counts.verify++; hooks.verificationStarted(args[1]); const result = await original(...args); await hooks.verified(args[1]); return result }
  let config = { ...TTS_DEFAULTS, ...installed.recommendedSettings.tts }
  runtime = createTtsRuntime({ getConfig: () => config, resolveManagedLocalTts: installer.resolveManagedLocalTts.bind(installer), adapter: {
    async inspect() { counts.capabilities++; return { playbackSupported: true, filePlaybackSupported: true } },
    async play() { counts.playback++; await hooks.playback(); return { completed: true } },
  } })
  return { runtime, installer, counts, hooks, directory: installed.installedPath, main, mmproj,
    changeConfig: () => { config = { ...config, provider: 'off' } },
    syntheses: async () => { try { return (await readFile(log, 'utf8')).trim().split('\n').length } catch (error) { if (error.code === 'ENOENT') return 0; throw error } },
  }
}

test('managed ordinary speech verifies once per chunk, each call; public inspect verifies hashes without launching a version probe', async t => {
  const f = await fixture(t)
  for (let i = 0; i < 2; i++) assert.equal((await f.runtime.speak('你好')).provider, 'local')
  assert.equal(f.counts.verify, 2); assert.equal(f.counts.version, 0); assert.equal(await f.syntheses(), 2)
  assert.equal(f.counts.playback, 2)
  await f.runtime.speak('字'.repeat(801))
  assert.equal(f.counts.verify, 5); assert.equal(f.counts.version, 0); assert.equal(await f.syntheses(), 5)
  assert.equal(f.counts.playback, 5)
  assert.equal(f.counts.capabilities, 3)
  const status = await f.runtime.inspect()
  assert.equal(f.counts.verify, 6); assert.equal(f.counts.version, 0)
  assert.equal(status.localRuntime, 'ready'); assert.equal(status.localReady, true)
  assert.equal(status.synthesisVerified, false, 'ordinary speech must not manufacture a diagnostic probe result')
  assert.equal(status.localSynthesisSupported, false)
  assert.equal(f.counts.capabilities, 4)
})

for (const target of ['main', 'mmproj', 'runtime.tar.gz', 'runtime/llama-tts']) test(`managed speech rejects same-size changed ${target} before synthesis`, async t => {
  const f = await fixture(t), path = join(f.directory, f[target] ?? target), bytes = await readFile(path)
  bytes[bytes.length - 1] ^= 1; await writeFile(path, bytes)
  await assert.rejects(f.runtime.speak('你好'), { code: 'HASH_MISMATCH' })
  assert.equal(f.counts.version, 0); assert.equal(await f.syntheses(), 0); assert.equal(f.counts.playback, 0)
  const status = await f.runtime.inspect()
  assert.equal(status.localReady, undefined); assert.equal(status.localSynthesisSupported, false); assert.equal(status.localReason, 'HASH_MISMATCH')
})

test('managed speech checks bytes again between chunks and does not fall back', async t => {
  const f = await fixture(t)
  f.hooks.playback = async () => { const path = join(f.directory, f.main), bytes = await readFile(path); bytes[0] ^= 1; await writeFile(path, bytes) }
  await assert.rejects(f.runtime.speak('字'.repeat(401)), { code: 'HASH_MISMATCH' })
  assert.equal(f.counts.verify, 2); assert.equal(f.counts.version, 0); assert.equal(await f.syntheses(), 1); assert.equal(f.counts.playback, 1)
  assert.equal(f.runtime.status().fallback, false)
})

test('managed speech rechecks configuration after the per-chunk full verification before synthesis', async t => {
  const f = await fixture(t)
  // Change configuration after the real full hash verification completes,
  // before its descriptor is admitted for synthesis. No subprocess is needed.
  f.hooks.verified = async () => { if (f.runtime.status().state === 'synthesizing') f.changeConfig() }
  await assert.rejects(f.runtime.speak('你好'), { code: 'TTS_CONFIG_CHANGED' })
  assert.equal(await f.syntheses(), 0); assert.equal(f.counts.playback, 0); assert.equal(f.counts.version, 0)
})

for (const method of ['cancel', 'dispose']) test(`managed ${method} waits for in-progress verification and never synthesizes afterward`, async t => {
  const f = await fixture(t), entered = Promise.withResolvers(), release = Promise.withResolvers()
  let verificationSignal, blocked = false
  f.hooks.verificationStarted = signal => { verificationSignal = signal }
  const originalOpen = fsPromises.open
  t.mock.method(fsPromises, 'open', async (path, ...args) => {
    const handle = await originalOpen(path, ...args)
    if (String(path) === join(f.directory, f.main)) {
      const originalRead = handle.read.bind(handle)
      handle.read = async (...readArgs) => {
        if (!blocked) { blocked = true; entered.resolve(verificationSignal); await release.promise }
        return originalRead(...readArgs)
      }
    }
    return handle
  })
  syncBuiltinESMExports()
  t.after(() => { release.resolve(); t.mock.restoreAll(); syncBuiltinESMExports() })
  const failed = assert.rejects(f.runtime.speak('你好'), { code: 'TTS_CANCELLED' })
  const signal = await entered.promise
  let stopped = false
  const stopping = f.runtime[method]().then(() => { stopped = true })
  try {
    await new Promise(resolve => setImmediate(resolve))
    assert.equal(signal.aborted, true); assert.equal(stopped, false); assert.equal(f.runtime.status().busy, true)
  } finally { release.resolve() }
  await stopping; await failed
  assert.equal(await f.syntheses(), 0); assert.equal(f.counts.playback, 0); assert.equal(f.counts.version, 0)
})

test('injected adapters retain inspect gating even alongside a managed resolver', async () => {
  let inspections = 0, speeches = 0, ready = false
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider: 'local' }),
    resolveManagedLocalTts: async () => { assert.fail('injected adapter must not use managed resolver') },
    adapter: { async inspect() { return { playbackSupported: true } } },
    localAdapter: { async inspect() { inspections++; return { localReady: ready } }, async speak() { speeches++; return { completed: true } } },
  })
  try {
    await assert.rejects(runtime.speak('你好'), { code: 'TTS_LOCAL_UNAVAILABLE' })
    assert.equal(inspections, 1); assert.equal(speeches, 0)
    ready = true; await runtime.speak('你好')
    assert.equal(inspections, 2); assert.equal(speeches, 1)
  } finally { await runtime.dispose() }
})

test('missing managed resolver still fails closed for speech and public diagnostics', async () => {
  let plays = 0
  const runtime = createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, provider: 'local' }), adapter: {
    async inspect() { return { playbackSupported: true } }, async play() { plays++; return { completed: true } },
  } })
  try {
    await assert.rejects(runtime.speak('你好'), { code: 'TTS_LOCAL_RESOLVER_MISSING' })
    const status = await runtime.inspect()
    assert.equal(status.localReady, false); assert.equal(status.synthesisVerified, false); assert.equal(plays, 0)
  } finally { await runtime.dispose() }
})
