import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { mkdtemp, writeFile, readFile, rm, access } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { setTimeout as sleep } from 'node:timers/promises'
import { createModelInstaller } from '../voice-model-installer.mjs'
import { createTtsRuntime, TTS_DEFAULTS } from '../voice-tts.mjs'

const hash = bytes => createHash('sha256').update(bytes).digest('hex')
function tar(name, bytes) {
  const header = Buffer.alloc(512)
  header.write(name); header.write('0000700\0', 100); header.write(bytes.length.toString(8).padStart(11, '0') + '\0', 124)
  header.fill(32, 148, 156); header.write('0', 156); header.write('ustar\0', 257)
  header.write([...header].reduce((sum, byte) => sum + byte, 0).toString(8).padStart(6, '0') + '\0 ', 148)
  return Buffer.concat([header, bytes, Buffer.alloc((512 - bytes.length % 512) % 512), Buffer.alloc(1024)])
}
async function fixture(t, runtimeRunner) {
  const root = await mkdtemp(join(tmpdir(), 'whale-probe-lifecycle-'))
  const marker = join(root, 'hang'), pidFile = join(root, 'pid')
  let pid
  t.after(async () => {
    if (pid) { try { process.kill(pid, 'SIGKILL') } catch {} }
    await rm(root, { recursive: true, force: true })
  })
  const executable = Buffer.from(`#!${process.execPath}\nconst fs = require('fs'); if (fs.existsSync(${JSON.stringify(marker)})) { process.on('SIGTERM', () => {}); fs.writeFileSync(${JSON.stringify(pidFile)}, String(process.pid)); setInterval(() => {}, 100); } else { console.log('version: 12110'); }\n`)
  const archive = gzipSync(tar('bin/llama-tts', executable)), weights = Buffer.from('synthetic fixed model')
  const runtime = { file: 'runtime.tar.gz', format: 'tar.gz', bytes: archive.length, sha256: hash(archive), executable: 'llama-tts', source_url: 'https://test.invalid/runtime', entries: [{ entry: 'bin/llama-tts', file: 'llama-tts', bytes: executable.length, sha256: hash(executable), executable: true }] }
  const modelId = 'qwen3-tts-base-1.7b-gguf'
  const files = ['Qwen3-TTS-12Hz-1.7B-Base-Q4_K_M.gguf', 'mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf'].map(file => ({ file, bytes: weights.length, sha256: hash(weights), source_url: 'https://test.invalid/model' }))
  files.push({ file: runtime.file, bytes: archive.length, sha256: hash(archive), source_url: runtime.source_url })
  const options = { root: join(root, 'models'), catalog: { schema: 1, models: [{ id: modelId, revision: 'a'.repeat(40), runtimePackage: runtime, files }] }, allowUrl: url => new URL(url).hostname === 'test.invalid', runtimeRunner, fetchImpl: async url => { const bytes = url.endsWith('/runtime') ? archive : weights; return new Response(bytes, { headers: { 'content-length': String(bytes.length) } }) } }
  const installer = createModelInstaller(options)
  t.after(() => installer.close().catch(() => {}))
  const start = () => { const plan = installer.plan(modelId); return installer.start({ modelId, compute: 'cpu', planHash: plan.planHash, accepted: true }) }
  return { installer, root, start, reopen: () => createModelInstaller(options), hang: () => writeFile(marker, '1'), async waitForPid() {
    for (let attempt = 0; attempt < 200; attempt++) {
      try { pid = Number(await readFile(pidFile, 'utf8')); return pid } catch {}
      await sleep(10)
    }
    throw new Error('runtime probe did not start')
  } }
}
const alive = pid => { try { process.kill(pid, 0); return true } catch (error) { if (error.code === 'ESRCH') return false; throw error } }
const runtimeFor = (installer, config) => createTtsRuntime({ getConfig: () => ({ ...TTS_DEFAULTS, ...config }), adapter: { inspect: async () => ({ playbackSupported: true }), play: async () => ({ completed: true }) }, resolveManagedLocalTts: installer.resolveManagedLocalTts.bind(installer) })

test('TTS cancel waits for stubborn managed synthesis child to exit', { skip: process.platform === 'win32' }, async t => {
  const f = await fixture(t), job = f.start(), installed = await f.installer.settled(job.id)
  assert.equal(installed.status, 'installed', JSON.stringify(installed.error))
  const tts = runtimeFor(f.installer, installed.recommendedSettings.tts)
  t.after(() => tts.dispose())
  await f.hang()
  const speech = tts.speak('你好').catch(error => error)
  const pid = await f.waitForPid()
  assert.equal(alive(pid), true)
  assert.deepEqual(await tts.cancel(), { status: 'cancelled' })
  assert.equal((await speech).code, 'TTS_CANCELLED')
  assert.equal(alive(pid), false, 'confirmed cancellation must not leave the synthesis child alive')
  assert.equal(tts.status().busy, false)
})

test('installer cancel waits for runtime exit before deleting staging', { skip: process.platform === 'win32' }, async t => {
  const f = await fixture(t)
  await f.hang()
  const job = f.start(), pid = await f.waitForPid()
  const cancelled = await f.installer.cancel(job.id)
  assert.equal(cancelled.status, 'cancelled')
  assert.equal(alive(pid), false, 'staging must not be deleted while its runtime is alive')
  await assert.rejects(access(join(f.root, 'models', '.jobs', job.id)), { code: 'ENOENT' })
})

test('uncertain runtime termination reaches TTS lock and blocks installer reuse', async t => {
  let uncertain = false
  const failure = Object.assign(new Error('runtime exit unconfirmed'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  const f = await fixture(t, async () => { if (uncertain) throw failure; return { ok: true, stdout: '12110', stderr: '' } })
  const job = f.start(), installed = await f.installer.settled(job.id)
  assert.equal(installed.status, 'installed', JSON.stringify(installed.error))
  const tts = runtimeFor(f.installer, installed.recommendedSettings.tts)
  t.after(() => tts.dispose())
  uncertain = true
  // Explicit verification still executes the version probe and owns its child.
  // A later hash-only descriptor lookup must honor that established quarantine.
  await assert.rejects(f.installer.verifyInstalled(job.id), { code: failure.code, uncertain: true })
  await assert.rejects(tts.speak('你好'), { code: failure.code, uncertain: true })
  assert.equal(tts.status().blocked, true)
  assert.deepEqual(await tts.cancel(), { status: 'unconfirmed' })
  await assert.rejects(f.installer.verifyInstalled(job.id), { code: failure.code, uncertain: true })
  assert.equal(f.installer.snapshot().jobs.length, 1, 'read-only state remains available')
  const otherJob = f.start()
  assert.notEqual(otherJob.id, job.id, 'a fresh immutable directory is not quarantined')
  await f.installer.settled(otherJob.id)
  await assert.rejects(f.installer.close(), { code: failure.code, uncertain: true })
  assert.throws(() => f.reopen(), { code: 'INSTALLER_BUSY' })
  await access(join(f.root, 'models', 'installer.lock'))
})

test('unconfirmed install probe cannot become paused or cancelled or delete its files', async t => {
  const failure = Object.assign(new Error('runtime exit unconfirmed'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  let entered
  const started = new Promise(resolve => { entered = resolve })
  const f = await fixture(t, async (_exe, _args, _payload, options) => {
    entered()
    return new Promise((_resolve, reject) => { options.signal.addEventListener('abort', () => reject(failure), { once: true }) })
  })
  const job = f.start()
  await started
  await assert.rejects(f.installer.cancel(job.id), { code: failure.code, uncertain: true })
  const failed = await f.installer.settled(job.id)
  assert.equal(failed.status, 'failed')
  assert.equal(failed.error.code, failure.code)
  assert.deepEqual(Object.keys(failed.error).sort(), ['code', 'message'], 'public error keeps the strict wire shape')
  await access(join(f.root, 'models', '.jobs', job.id, 'runtime', 'llama-tts'))
  assert.throws(() => f.installer.resume(job.id), { code: failure.code, uncertain: true })
  await assert.rejects(f.installer.pause(job.id), { code: failure.code, uncertain: true })
})

test('installer close aborts and waits for installed verification before releasing its root', { skip: process.platform === 'win32' }, async t => {
  const f = await fixture(t), job = f.start()
  assert.equal((await f.installer.settled(job.id)).status, 'installed')
  await f.hang()
  const verification = f.installer.verifyInstalled(job.id).catch(error => error)
  const pid = await f.waitForPid()
  await f.installer.close()
  assert.equal((await verification).code, 'TTS_CANCELLED')
  assert.equal(alive(pid), false)
  await assert.rejects(f.installer.verifyInstalled(job.id), { code: 'INSTALLER_CLOSED' })
  const replacement = f.reopen()
  await replacement.close()
})

test('close retains the root lock when installed verification cannot confirm exit', async t => {
  const failure = Object.assign(new Error('runtime exit unconfirmed'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
  let hang = false, entered
  const started = new Promise(resolve => { entered = resolve })
  const f = await fixture(t, async (_exe, _args, _payload, options) => {
    if (!hang) return { ok: true, stdout: '12110', stderr: '' }
    entered()
    return new Promise((_resolve, reject) => { options.signal.addEventListener('abort', () => reject(failure), { once: true }) })
  })
  const job = f.start()
  assert.equal((await f.installer.settled(job.id)).status, 'installed')
  hang = true
  const verification = f.installer.verifyInstalled(job.id).catch(error => error)
  await started
  await assert.rejects(f.installer.close(), { code: failure.code, uncertain: true })
  assert.equal((await verification).uncertain, true)
  assert.throws(() => f.reopen(), { code: 'INSTALLER_BUSY' })
})
