import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, writeFile, readFile, rm, access } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { setTimeout as sleep } from 'node:timers/promises'
import { inspectModelCompute, createModelInstaller } from '../voice-model-installer.mjs'

const modelId = 'sensevoice-int8-2024-07-17'
const catalog = { schema: 1, models: [{ id: modelId, revision: 'a'.repeat(40), files: [{ file: 'model.int8.onnx', bytes: 1, sha256: 'a'.repeat(64), source_url: 'https://test.invalid/model' }] }] }
const alive = pid => { try { process.kill(pid, 0); return true } catch (error) { if (error.code === 'ESRCH') return false; throw error } }
const native = { skip: process.platform === 'win32' || spawnSync('python3', ['--version']).status !== 0 }
const uncertain = () => Object.assign(new Error('compute probe exit unconfirmed'), { code: 'TTS_TERMINATION_UNCONFIRMED', uncertain: true })
async function fixture(t, probe) {
  const root = await mkdtemp(join(tmpdir(), 'whale-compute-lifecycle-'))
  const pidFile = join(root, 'pid'), modeFile = join(root, 'mode'), pythonPath = join(root, 'python')
  const pids = new Set(), instances = []
  t.after(async () => {
    // Failures must not leave a stubborn child behind, even if waiting for its PID failed.
    try { pids.add(Number(await readFile(pidFile, 'utf8'))) } catch {}
    for (const pid of pids) if (pid > 0 && alive(pid)) process.kill(pid, 'SIGKILL')
    await Promise.all(instances.map(i => i.close().catch(() => {})))
    for (const pid of pids) {
      for (let n = 0; n < 200 && alive(pid); n++) await sleep(10)
      assert.equal(alive(pid), false, 'fixture must reap every real child')
    }
    await rm(root, { recursive: true, force: true })
  })
  // Execute the unchanged bundled helper, with only local synthetic imports and no site packages.
  await writeFile(pythonPath, `#!/bin/sh\nexport PYTHONPATH='${root}'\nexec python3 -S "$@"\n`, { mode: 0o700 })
  await writeFile(join(root, 'sherpa_onnx.py'), `import os, signal, time\nsignal.signal(signal.SIGTERM, signal.SIG_IGN)\nwith open(${JSON.stringify(modeFile)}) as f: mode = f.read()\nwith open(${JSON.stringify(pidFile)}, 'w') as f: f.write(str(os.getpid()))\nif mode == 'overflow': print('界' * 11000, flush=True)\nif mode != 'normal':\n    while True: time.sleep(.05)\n`)
  await writeFile(join(root, 'faster_whisper.py'), 'raise ImportError("synthetic unavailable")\n')
  await writeFile(modeFile, 'hang')
  // Only the explicitly controlled compute helper participates in this lifecycle.
  const options = { root: join(root, 'models'), catalog, gpuProbe: async () => ({ gpuMemoryBytes: null, gpuMemoryReason: 'Synthetic GPU inventory' }), allowUrl: () => true, pythonPath: () => pythonPath, ...(probe ? { probe } : {}), fetchImpl: () => { throw new Error('unexpected network') } }
  const create = () => { const i = createModelInstaller(options); instances.push(i); return i }
  const installer = create()
  return { root, pythonPath, installer, create, mode: value => writeFile(modeFile, value), start() { const plan = installer.plan(modelId); return installer.start({ modelId, compute: 'cpu', accepted: true, planHash: plan.planHash }) }, async pid() {
    for (let n = 0; n < 300; n++) { try { const pid = Number(await readFile(pidFile, 'utf8')); if (pid > 0) { pids.add(pid); return pid } } catch {} await sleep(10) }
    throw new Error('compute probe did not start')
  } }
}

test('compute abort waits for the exact bundled helper process to exit', native, async t => {
  const f = await fixture(t), controller = new AbortController()
  const result = inspectModelCompute({ pythonPath: f.pythonPath, signal: controller.signal }).catch(error => error)
  const pid = await f.pid(); controller.abort()
  assert.equal((await result).code, 'TTS_CANCELLED')
  assert.equal(alive(pid), false)
})

test('compute timeout escalates and drains the helper before returning unavailable', native, async t => {
  const f = await fixture(t), start = Date.now()
  const result = inspectModelCompute({ pythonPath: f.pythonPath })
  const pid = await f.pid()
  assert.deepEqual((await result).backends, {})
  assert.ok(Date.now() - start >= 12000, 'production 12 second deadline is retained')
  assert.equal(alive(pid), false)
})

test('compute byte limit stops multibyte output and confirms exit', native, async t => {
  const f = await fixture(t); await f.mode('overflow')
  const result = inspectModelCompute({ pythonPath: f.pythonPath }), pid = await f.pid()
  assert.deepEqual((await result).backends, {})
  assert.equal(alive(pid), false)
})

test('normal missing dependencies and missing Python preserve unavailable behavior', native, async t => {
  const f = await fixture(t); await f.mode('normal')
  const result = await inspectModelCompute({ pythonPath: f.pythonPath })
  assert.equal(result.schema, 1)
  assert.equal(result.backends.sensevoice.cpu.available, false)
  assert.equal(result.backends.whisper.cpu.available, false)
  assert.deepEqual((await inspectModelCompute({ pythonPath: join(f.root, 'missing-python') })).backends, {})
})

test('ASR close drains compute, reports paused only after exit, and permits clean replacement', native, async t => {
  const f = await fixture(t), job = f.start(), pid = await f.pid()
  await Promise.all([f.installer.close(), f.installer.close()])
  assert.equal(alive(pid), false)
  assert.equal((await f.installer.settled(job.id)).status, 'paused')
  await f.create().close()
})

test('ASR repeated cancel drains compute before reporting cancelled', native, async t => {
  const f = await fixture(t), job = f.start(), pid = await f.pid()
  assert.equal((await f.installer.cancel(job.id)).status, 'cancelled')
  assert.equal(alive(pid), false)
  assert.equal((await f.installer.cancel(job.id)).status, 'cancelled')
})

test('standalone compute is aborted and drained by repeated close; closed probes cannot start', native, async t => {
  const f = await fixture(t), result = f.installer.inspectCompute().catch(error => error), pid = await f.pid()
  await Promise.all([f.installer.close(), f.installer.close()])
  assert.equal((await result).code, 'TTS_CANCELLED')
  assert.equal(alive(pid), false)
  await assert.rejects(f.installer.inspectCompute(), { code: 'INSTALLER_CLOSED' })
  await f.create().close()
})

for (const standalone of [false, true]) test(`uncertain ${standalone ? 'standalone' : 'ASR'} compute blocks retries and replacement without hiding read-only state`, async t => {
  const error = uncertain(); let calls = 0, entered
  const started = new Promise(resolve => { entered = resolve })
  const f = await fixture(t, ({ signal }) => {
    calls++; entered()
    return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(error), { once: true }))
  })
  let job, result
  const controller = new AbortController()
  if (standalone) result = f.installer.inspectCompute(controller.signal).catch(error => error)
  else job = f.start()
  await started
  if (standalone) {
    controller.abort()
    assert.equal(await result, error)
    await assert.rejects(f.installer.inspectCompute(), { uncertain: true })
    assert.throws(f.start, { uncertain: true })
    assert.equal(f.installer.snapshot().jobs.length, 0)
  } else {
    await assert.rejects(f.installer.pause(job.id), { uncertain: true })
    assert.equal((await f.installer.settled(job.id)).status, 'failed')
    assert.throws(() => f.installer.resume(job.id), { uncertain: true })
    await assert.rejects(f.installer.cancel(job.id), { uncertain: true })
    await assert.rejects(f.installer.inspectCompute(), { uncertain: true })
  }
  assert.ok(f.installer.snapshot())
  assert.equal(f.installer.plan(modelId).modelId, modelId)
  await assert.rejects(f.installer.close(), { uncertain: true })
  await assert.rejects(f.installer.close(), { uncertain: true })
  assert.throws(f.create, { code: 'INSTALLER_BUSY' })
  await access(join(f.root, 'models', 'installer.lock'))
  assert.equal(calls, 1)
})

test('close drains every concurrent inspection, including an already-aborted caller', async t => {
  let completed = 0
  const f = await fixture(t, ({ signal }) => new Promise(resolve => {
    const finish = () => { setTimeout(() => { completed++; resolve({ schema: 1, backends: {} }) }, 10) }
    if (signal.aborted) finish()
    else signal.addEventListener('abort', finish, { once: true })
  }))
  const controller = new AbortController(); controller.abort()
  const probes = [f.installer.inspectCompute(), f.installer.inspectCompute(controller.signal), f.installer.inspectCompute()].map(p => p.catch(error => error))
  await sleep(0)
  await Promise.all([f.installer.close(), f.installer.close()])
  assert.ok((await Promise.all(probes)).every(error => error.code === 'TTS_CANCELLED'))
  assert.equal(completed, 2, 'already-aborted caller must not start a probe')
  await f.create().close()
})

for (const installation of [false, true]) test(`concurrent uncertainty fences late ${installation ? 'ASR installation' : 'inspection'} success`, async t => {
  const pending = [], error = uncertain()
  const f = await fixture(t, () => new Promise((resolve, reject) => pending.push({ resolve, reject })))
  const first = f.installer.inspectCompute().catch(error => error)
  const job = installation ? f.start() : null
  const second = installation ? null : f.installer.inspectCompute().catch(error => error)
  for (let n = 0; n < 100 && pending.length < 2; n++) await sleep(1)
  assert.equal(pending.length, 2)
  pending[0].reject(error)
  assert.equal(await first, error)
  pending[1].resolve({ schema: 1, backends: { sensevoice: { cpu: { available: true } } } })
  if (installation) {
    const result = await f.installer.settled(job.id)
    assert.equal(result.status, 'failed')
    assert.equal(result.error.code, error.code, 'late success cannot proceed into fetching')
    assert.equal(result.receivedBytes, 0)
  } else assert.equal(await second, error)
  assert.equal(f.installer.snapshot().compute.backends.sensevoice, undefined)
  await assert.rejects(f.installer.close(), { uncertain: true })
})
