import test from 'node:test'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import { syncBuiltinESMExports } from 'node:module'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { createServer } from 'node:http'
import { mkdtemp, readFile, writeFile, rm, symlink, mkdir, chmod, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createModelInstaller } from '../voice-model-installer.mjs'

const bytes = Buffer.alloc(192 * 1024, 'Whale Voice public synthetic model data.')
const digest = createHash('sha256').update(bytes).digest('hex')
const probe = async () => ({ schema: 1, default: 'cpu', backends: { sensevoice: { cpu: { available: true }, cuda: { available: false, reason: 'No backend CUDA' } } } })
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
async function waitUntil(fn) { for (let i = 0; i < 200; i++) { if (fn()) return; await sleep(5) } throw Error('wait timeout') }
async function fixture(t, handler) {
  const requests = []
  const server = createServer((req, res) => {
    requests.push({ url: req.url, headers: req.headers })
    if (handler) return handler(req, res, requests.length)
    serve(req, res)
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  const root = await mkdtemp(join(tmpdir(), 'whale-installer-'))
  const origin = `http://127.0.0.1:${server.address().port}`
  const catalog = { schema: 1, verification_scope: 'Synthetic local test only', models: [{ id: 'sensevoice-int8-2024-07-17', revision: 'a'.repeat(40), publisher: 'test', source_repository: origin, license_urls: [origin + '/license'], license_note: 'test', files: [{ file: 'model.int8.onnx', bytes: bytes.length, sha256: digest, source_url: origin + '/model' }] }] }
  const instances = []
  const create = extra => { const x = createModelInstaller({ root, catalog, probe, allowUrl: url => new URL(url).origin === origin, minFreeBytes: 0, ...extra }); instances.push(x); return x }
  const installer = create()
  t.after(async () => { await Promise.all(instances.map(x => x.close())); server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); await rm(root, { recursive: true, force: true }) })
  return { installer, create, root, catalog, origin, requests }
}
function serve(req, res, { data = bytes, etag = '"v1"', slow = false, ignoreRange = false } = {}) {
  let start = 0
  if (req.headers.range && !ignoreRange && req.headers['if-range'] === etag) start = Number(/bytes=(\d+)-/.exec(req.headers.range)[1])
  const headers = { 'Content-Length': data.length - start, ...(etag ? { ETag: etag } : {}), ...(start ? { 'Content-Range': `bytes ${start}-${data.length - 1}/${data.length}` } : {}) }
  res.writeHead(start ? 206 : 200, headers)
  if (!slow) return res.end(data.subarray(start))
  const timer = setInterval(() => { if (start >= data.length) { clearInterval(timer); res.end(); return } const end = Math.min(start + 8192, data.length); res.write(data.subarray(start, end)); start = end }, 5)
  res.on('close', () => clearInterval(timer))
}
function start(installer, compute = 'cpu') {
  const plan = installer.plan('sensevoice-int8-2024-07-17', compute)
  return installer.start({ modelId: plan.modelId, compute, planHash: plan.planHash, accepted: true })
}

test('explicit pinned plan only; no network on read/construct; completes and never uploads keys', async t => {
  const { installer, requests } = await fixture(t)
  assert.equal(requests.length, 0)
  assert.throws(() => installer.start({ modelId: 'sensevoice-int8-2024-07-17' }), /确认/)
  const plan = installer.plan('sensevoice-int8-2024-07-17')
  assert.throws(() => installer.start({ modelId: plan.modelId, accepted: true, planHash: 'old' }), /变化/)
  const job = start(installer)
  const stages = new Set()
  installer.subscribe(s => stages.add(s.jobs[0].stage))
  const completed = await installer.settled(job.id)
  assert.equal(completed.status, 'installed')
  assert.equal(completed.runtimeLoaded, false)
  assert.equal(completed.compute, 'cpu')
  assert.equal(completed.receivedBytes, bytes.length)
  assert.deepEqual(await readFile(join(completed.installedPath, 'model.int8.onnx')), bytes)
  assert(stages.has('downloading') && stages.has('verifying'))
  assert.equal(requests.length, 1)
  assert.equal(requests[0].headers.authorization, undefined)
  assert.equal(requests[0].headers.cookie, undefined)
  assert.equal(requests[0].headers['x-api-key'], undefined)
  await assert.rejects(installer.cancel(job.id), /已安装/)
})

test('unverified model unavailable and unavailable runtime/CUDA never downloads', async t => {
  const { installer, requests } = await fixture(t)
  assert.throws(() => installer.plan('qwen-unknown'), /暂不可/)
  assert.throws(() => start(installer, 'cuda'), { code:'INVALID_COMPUTE' })
  assert.equal(requests.length, 0)
})

test('pause is durable, UI unsubscribing does not stop; resume uses strong ETag and Range', async t => {
  const { installer, requests } = await fixture(t, (req, res) => serve(req, res, { slow: true }))
  const job = start(installer)
  const unsubscribe = installer.subscribe(() => {})
  unsubscribe()
  await waitUntil(() => installer.snapshot().jobs[0].receivedBytes > 0)
  const paused = await installer.pause(job.id)
  assert.equal(paused.status, 'paused')
  assert(paused.receivedBytes > 0 && paused.receivedBytes < bytes.length)
  installer.resume(job.id)
  assert.equal((await installer.settled(job.id)).status, 'installed')
  assert.match(requests[1].headers.range, /^bytes=\d+-$/)
  assert.equal(requests[1].headers['if-range'], '"v1"')
})

test('offline disconnect preserves partial bytes and resumes to a valid hash', async t => {
  const { installer, requests } = await fixture(t, (req, res, count) => {
    if (count > 1) return serve(req, res)
    res.writeHead(200, { 'Content-Length': bytes.length, ETag: '"v1"' }); res.write(bytes.subarray(0, 8192)); setTimeout(() => res.destroy(), 20)
  })
  const job = start(installer)
  const failed = await installer.settled(job.id)
  assert.equal(failed.status, 'failed'); assert.equal(failed.receivedBytes, 8192)
  installer.resume(job.id)
  assert.equal((await installer.settled(job.id)).status, 'installed')
  assert.equal(requests[1].headers.range, 'bytes=8192-')
})

test('Range ignored or changed ETag with 200 safely restarts instead of appending', async t => {
  const { installer, requests } = await fixture(t, (req, res, count) => serve(req, res, { slow: true, etag: count === 1 ? '"v1"' : '"v2"', ignoreRange: count > 1 }))
  const job = start(installer)
  await waitUntil(() => installer.snapshot().jobs[0].receivedBytes > 0)
  await installer.pause(job.id); installer.resume(job.id)
  const result = await installer.settled(job.id)
  assert.equal(result.status, 'installed')
  assert.equal((await readFile(join(result.installedPath, 'model.int8.onnx'))).length, bytes.length)
  assert(requests[1].headers.range)
})

test('invalid Content-Range and changed 206 ETag are rejected without mixing data', async t => {
  const { installer } = await fixture(t, (req, res, count) => {
    if (count === 1) return serve(req, res, { slow: true })
    res.writeHead(206, { ETag: '"v2"', 'Content-Range': `bytes 0-${bytes.length - 1}/${bytes.length}`, 'Content-Length': bytes.length }); res.end(bytes)
  })
  const job = start(installer)
  await waitUntil(() => installer.snapshot().jobs[0].receivedBytes > 0)
  const paused = await installer.pause(job.id); installer.resume(job.id)
  const failed = await installer.settled(job.id)
  assert.equal(failed.error.code, 'RANGE_MISMATCH')
  assert.equal(failed.receivedBytes, paused.receivedBytes)
})

test('missing ETag restarts partial download; weak validator never used for Range', async t => {
  const { installer, requests } = await fixture(t, (req, res) => serve(req, res, { slow: true, etag: 'W/"v1"' }))
  const job = start(installer)
  await waitUntil(() => installer.snapshot().jobs[0].receivedBytes > 0)
  await installer.pause(job.id); installer.resume(job.id)
  assert.equal((await installer.settled(job.id)).status, 'installed')
  assert.equal(requests[1].headers.range, undefined)
})

test('hash mismatch is not installed or activated; resume replaces corrupt file', async t => {
  const { installer, requests } = await fixture(t, (req, res, count) => serve(req, res, { data: count === 1 ? Buffer.alloc(bytes.length, 0) : bytes }))
  const job = start(installer)
  const failed = await installer.settled(job.id)
  assert.equal(failed.status, 'failed')
  assert.equal(failed.error.code, 'HASH_MISMATCH'); assert.equal(failed.installedPath, undefined)
  assert.equal(failed.files[0].verified, false)
  assert.equal(failed.runtimeLoaded, false)
  assert.equal(installer.resume(job.id).status, 'queued')
  const completed = await installer.settled(job.id)
  assert.equal(completed.status, 'installed', JSON.stringify(completed.error))
  assert.equal(completed.runtimeLoaded, false)
  assert.equal(requests.length, 2)
  assert.equal(requests[1].headers.range, undefined)
  assert.equal(requests[1].headers['if-range'], undefined)
  assert.deepEqual(await readFile(join(completed.installedPath, 'model.int8.onnx')), bytes)
})

test('corrupt-file reset uses a checked existing handle, not truncating open', async t => {
  const { installer, requests } = await fixture(t, (req, res, count) => serve(req, res, { data: count === 1 ? Buffer.alloc(bytes.length) : bytes }))
  const originalOpen = fsPromises.open
  let resets = 0, closed = 0
  t.mock.method(fsPromises, 'open', async (path, flags, ...rest) => {
    if ((flags & fs.constants.O_TRUNC) && !(flags & fs.constants.O_CREAT)) {
      throw Object.assign(new Error('Windows truncating open regression'), { code: 'EINVAL' })
    }
    const fd = await originalOpen(path, flags, ...rest)
    if (String(path).endsWith('model.int8.onnx') && (flags & fs.constants.O_WRONLY) && !(flags & fs.constants.O_CREAT)) {
      let checked = false
      const stat = fd.stat.bind(fd), truncate = fd.truncate.bind(fd), close = fd.close.bind(fd)
      fd.stat = async (...args) => { checked = true; return stat(...args) }
      fd.truncate = async length => {
        assert.equal(checked, true, 'Check opened file before truncating it')
        assert.equal(length, 0)
        resets++
        return truncate(length)
      }
      fd.close = async () => { await close(); closed++ }
    }
    return fd
  })
  syncBuiltinESMExports()
  try {
    const job = start(installer)
    assert.equal((await installer.settled(job.id)).error.code, 'HASH_MISMATCH')
    installer.resume(job.id)
    const completed = await installer.settled(job.id)
    assert.equal(completed.status, 'installed', JSON.stringify(completed.error))
    assert.equal(resets, 1)
    assert.equal(closed, 1)
    assert.equal(requests.length, 2)
    assert.equal(requests[1].headers.range, undefined)
    assert.deepEqual(await readFile(join(completed.installedPath, 'model.int8.onnx')), bytes)
  } finally { t.mock.restoreAll(); syncBuiltinESMExports() }
})

test('corrupt-file reset fails closed on changed identity or truncate failure', async t => {
  for (const mode of ['identity', 'truncate']) {
    await t.test(mode, async t => {
      const { installer, requests, root } = await fixture(t, (req, res) => serve(req, res, { data: Buffer.alloc(bytes.length) }))
      const job = start(installer)
      assert.equal((await installer.settled(job.id)).error.code, 'HASH_MISMATCH')
      const originalOpen = fsPromises.open
      let closed = 0, truncates = 0
      t.mock.method(fsPromises, 'open', async (path, flags, ...rest) => {
        const fd = await originalOpen(path, flags, ...rest)
        if (String(path).endsWith('model.int8.onnx') && (flags & fs.constants.O_WRONLY) && !(flags & fs.constants.O_CREAT)) {
          const stat = fd.stat.bind(fd), close = fd.close.bind(fd)
          fd.stat = async () => {
            const info = await stat()
            if (mode === 'identity') { const original = info.ino; info.ino = original === 0 ? 1 : 0; assert.notEqual(info.ino, original, 'fault must change even a large NTFS inode') }
            return info
          }
          fd.truncate = async () => { truncates++; throw Object.assign(new Error('Injected truncate failure'), { code: 'EPERM' }) }
          fd.close = async () => { await close(); closed++ }
        }
        return fd
      })
      syncBuiltinESMExports()
      try {
        installer.resume(job.id)
        const failed = await installer.settled(job.id)
        assert.equal(failed.status, 'failed')
        assert.equal(failed.error.code, mode === 'identity' ? 'UNSAFE_PATH' : 'EPERM')
        assert.equal(failed.installedPath, undefined)
        assert.equal(closed, 1)
        assert.equal(truncates, mode === 'identity' ? 0 : 1)
        assert.equal(requests.length, 1)
        assert.deepEqual(await readFile(join(root, '.jobs', job.id, 'model.int8.onnx')), Buffer.alloc(bytes.length))
      } finally { t.mock.restoreAll(); syncBuiltinESMExports() }
    })
  }
})

// Model Windows-style sharing failures deterministically on every platform. This
// does not claim to reproduce an antivirus or the original Windows machine.
test('checkpoint failure closes the download handle before an explicit retry', async t => {
  const { installer, root } = await fixture(t)
  const handles = new Set()
  const originalOpen = fsPromises.open
  const originalRename = fs.renameSync
  let injected = false
  t.mock.method(fsPromises, 'open', async (...args) => {
    const fd = await originalOpen(...args)
    if (String(args[0]).endsWith('model.int8.onnx')) {
      handles.add(fd)
      const close = fd.close.bind(fd)
      fd.close = async () => { await close(); handles.delete(fd) }
    }
    return fd
  })
  t.mock.method(fs, 'renameSync', (...args) => {
    if (!injected && args[1] === join(root, 'jobs.json') && handles.size) {
      injected = true
      throw Object.assign(new Error('Injected state-file sharing violation'), { code: 'EPERM' })
    }
    return originalRename(...args)
  })
  // Windows cannot promote a directory while a child is open without delete
  // sharing. Fail instead of hiding a leaked handle behind copy/delete/retries.
  const originalPromote = fsPromises.rename
  t.mock.method(fsPromises, 'rename', async (...args) => {
    if (handles.size) throw Object.assign(new Error('Open model handle prevents promotion'), { code: 'EBUSY' })
    return originalPromote(...args)
  })
  syncBuiltinESMExports()
  try {
    const job = start(installer)
    const failed = await installer.settled(job.id)
    assert.equal(injected, true)
    assert.equal(failed.status, 'failed')
    assert.equal(failed.error.code, 'EPERM')
    assert.equal(failed.installedPath, undefined)
    assert.equal(failed.runtimeLoaded, false)
    assert.equal(handles.size, 0, 'All model handles must close even if the first checkpoint fails')
    installer.resume(job.id)
    const completed = await installer.settled(job.id)
    assert.equal(completed.status, 'installed', JSON.stringify(completed.error))
    assert.deepEqual(await readFile(join(completed.installedPath, 'model.int8.onnx')), bytes)
  } finally {
    await Promise.all([...handles].map(fd => fd.close()))
    t.mock.restoreAll()
    syncBuiltinESMExports()
  }
})

test('promotion sharing failure preserves verified files for an explicit retry', async t => {
  const { installer, requests } = await fixture(t)
  const originalRename = fsPromises.rename
  let attempts = 0
  t.mock.method(fsPromises, 'rename', async (...args) => {
    if (++attempts === 1) throw Object.assign(new Error('Injected directory sharing violation'), { code: 'EPERM' })
    return originalRename(...args)
  })
  syncBuiltinESMExports()
  try {
    const job = start(installer)
    const failed = await installer.settled(job.id)
    assert.equal(failed.status, 'failed')
    assert.equal(failed.error.code, 'EPERM')
    assert.equal(failed.installedPath, undefined)
    assert.equal(failed.runtimeLoaded, false)
    assert.equal(attempts, 1, 'Do not retry a failed filesystem operation automatically')
    assert.equal(failed.files[0].verified, true)
    installer.resume(job.id)
    const completed = await installer.settled(job.id)
    assert.equal(completed.status, 'installed', JSON.stringify(completed.error))
    assert.equal(attempts, 2)
    assert.equal(requests.length, 1, 'Re-verify intact staged files instead of downloading again')
    assert.deepEqual(await readFile(join(completed.installedPath, 'model.int8.onnx')), bytes)
  } finally {
    t.mock.restoreAll()
    syncBuiltinESMExports()
  }
})

test('hash mismatch survives restart and resumes with a fresh full request', async t => {
  const { installer, create, requests } = await fixture(t, (req, res, count) => serve(req, res, { data: count === 1 ? Buffer.alloc(bytes.length, 0) : bytes }))
  const job = start(installer)
  const failed = await installer.settled(job.id)
  assert.equal(failed.error.code, 'HASH_MISMATCH')
  await installer.close()
  const reopened = create()
  assert.equal(reopened.snapshot().jobs[0].status, 'failed')
  assert.deepEqual(reopened.snapshot().jobs[0].error, failed.error)
  assert.equal(requests.length, 1)
  reopened.resume(job.id)
  const completed = await reopened.settled(job.id)
  assert.equal(completed.status, 'installed', JSON.stringify(completed.error))
  assert.equal(completed.runtimeLoaded, false)
  assert.equal(requests.length, 2)
  assert.equal(requests[1].headers.range, undefined)
  assert.equal(requests[1].headers['if-range'], undefined)
  assert.deepEqual(await readFile(join(completed.installedPath, 'model.int8.onnx')), bytes)
})

function rejectNextCheckpoint(t, root) {
  const statePath = join(root, 'jobs.json')
  const originalRename = fs.renameSync
  let denyCheckpoint = true
  t.mock.method(fs, 'renameSync', (from, to) => {
    if (to === statePath && denyCheckpoint) {
      denyCheckpoint = false
      throw Object.assign(new Error('Injected state-file sharing violation'), { code: 'EPERM' })
    }
    return originalRename(from, to)
  })
  syncBuiltinESMExports()
  t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports() })
  return statePath
}

test('failed initial checkpoint leaves no queued job, publication, or download', async t => {
  const { installer, requests, root } = await fixture(t)
  const statePath = rejectNextCheckpoint(t, root)
  const published = []
  installer.subscribe(snapshot => published.push(snapshot.jobs.map(job => job.status)))
  assert.throws(() => start(installer), { code: 'EPERM' })
  assert.deepEqual(installer.snapshot().jobs, [])
  assert.deepEqual(published, [])
  assert.equal(requests.length, 0)
  await assert.rejects(stat(statePath), { code: 'ENOENT' })
  const job = start(installer)
  assert.equal((await installer.settled(job.id)).status, 'installed')
  assert.equal(requests.length, 1)
})

test('failed resume checkpoint preserves the recovery state, receipt, and retry', async t => {
  const { installer, requests, root } = await fixture(t, (req, res, count) => serve(req, res, { data: count === 1 ? Buffer.alloc(bytes.length) : bytes }))
  const job = start(installer)
  const failed = await installer.settled(job.id)
  assert.equal(failed.error.code, 'HASH_MISMATCH')
  const statePath = rejectNextCheckpoint(t, root)
  const saved = await readFile(statePath, 'utf8')
  const published = []
  installer.subscribe(snapshot => published.push(snapshot.jobs.map(job => job.status)))
  assert.throws(() => installer.resume(job.id), { code: 'EPERM' })
  assert.deepEqual(installer.snapshot().jobs[0], failed)
  assert.deepEqual(published, [])
  assert.equal(requests.length, 1)
  assert.equal(await readFile(statePath, 'utf8'), saved)
  assert.equal(installer.resume(job.id).status, 'queued')
  assert.equal((await installer.settled(job.id)).status, 'installed')
  assert.equal(requests.length, 2)
})

test('restart restores paused task and does not automatically fetch', async t => {
  const { installer, create, requests } = await fixture(t, (req, res) => serve(req, res, { slow: true }))
  const job = start(installer)
  await waitUntil(() => installer.snapshot().jobs[0].receivedBytes > 0)
  await installer.close()
  const reopened = create()
  assert.equal(reopened.snapshot().jobs[0].status, 'paused')
  await sleep(30); assert.equal(requests.length, 1)
  reopened.resume(job.id)
  assert.equal((await reopened.settled(job.id)).status, 'installed')
})

test('cancel deletes only owned staging files and cannot resume', async t => {
  const { installer, root } = await fixture(t, (req, res) => serve(req, res, { slow: true }))
  await writeFile(join(root, 'private-user-file.txt'), 'untouched')
  const job = start(installer)
  await waitUntil(() => installer.snapshot().jobs[0].receivedBytes > 0)
  const cancelled = await installer.cancel(job.id)
  assert.equal(cancelled.receivedBytes, 0); assert.equal(cancelled.status, 'cancelled')
  assert.throws(() => installer.resume(job.id), /取消/)
  await assert.rejects(stat(join(root, '.jobs', job.id)), { code: 'ENOENT' })
  assert.equal(await readFile(join(root, 'private-user-file.txt'), 'utf8'), 'untouched')
})

test('directory permission failure and symbolic links fail closed', { skip: process.platform === 'win32' ? 'POSIX chmod and symlink privilege fixture' : false }, async t => {
  const { installer, root } = await fixture(t)
  const linked = join(root, 'linked'); await symlink(tmpdir(), linked)
  assert.throws(() => createModelInstaller({ root: linked }), /符号链接/)
  const stage = join(root, '.jobs'); await chmod(stage, 0o500)
  try {
    const job = start(installer)
    const result = await installer.settled(job.id)
    assert.equal(result.status, 'failed'); assert.equal(result.error.code, 'EACCES')
  } finally { await chmod(stage, 0o700) }
})

test('unexpected redirect host rejected and no credential forwarding', async t => {
  const { installer } = await fixture(t, (_req, res) => { res.writeHead(302, { Location: 'https://untrusted.example/model?secret=no' }); res.end() })
  const job = start(installer)
  const result = await installer.settled(job.id)
  assert.equal(result.error.code, 'UNTRUSTED_SOURCE')
  assert(!JSON.stringify(result).includes('secret'))
})

test('a second host instance cannot write the same queue', async t => {
  const { create } = await fixture(t)
  assert.throws(() => create(), /另一个/)
})

test('tampered catalog requires a new explicit plan', async t => {
  const { installer, create, catalog, requests } = await fixture(t)
  const modelId = catalog.models[0].id
  const oldPlan = installer.plan(modelId)
  const job = start(installer)
  assert.equal((await installer.settled(job.id)).status, 'installed')
  await installer.close()
  catalog.models[0].files[0].sha256 = 'b'.repeat(64)
  const restarted = create()
  assert.equal(restarted.snapshot().jobs[0].status, 'blocked')
  assert.throws(() => restarted.resume(job.id), { code: 'CATALOG_CHANGED' })
  assert.throws(() => restarted.start({ modelId, compute: oldPlan.compute, planHash: oldPlan.planHash, accepted: true }), { code: 'PLAN_CHANGED' })
  assert.equal(requests.length, 1)
  const next = start(restarted)
  assert.notEqual(next.id, job.id)
  assert.equal((await restarted.settled(next.id)).error.code, 'HASH_MISMATCH')
})

test('HTTP and fixed length mismatch never produce installed state', async t => {
  for (const status of [403,404,416]) {
    const { installer } = await fixture(t, (_req,res) => { res.writeHead(status); res.end() })
    const job = start(installer)
    assert.equal((await installer.settled(job.id)).error.code, 'DOWNLOAD_HTTP')
  }
  const { installer } = await fixture(t, (_req,res) => { res.writeHead(200, { 'Content-Length': 3 }); res.end('abc') })
  const job = start(installer)
  assert.equal((await installer.settled(job.id)).error.code, 'SIZE_MISMATCH')
})

test('unsafe persisted paths and staging symlinks are never followed', async t => {
  const { installer, root } = await fixture(t)
  const job = start(installer)
  await installer.settled(job.id); await installer.close()
  const doc = JSON.parse(await readFile(join(root, 'jobs.json'), 'utf8'))
  doc.jobs[0].id = '../../outside'
  await writeFile(join(root, 'jobs.json'), JSON.stringify(doc))
  assert.throws(() => createModelInstaller({ root }), /记录无效/)
})

test('Qwen recommendation stays separate from installation, with unknown states', async () => {
  const { recommendModel, inspectModelHardware } = await import('../voice-model-installer.mjs')
  const recommendation = recommendModel('qwen3-tts-base-1.7b-gguf', { totalMemoryBytes: 16 * 1024 ** 3, availableMemoryBytes: 6 * 1024 ** 3 })
  assert.equal(recommendation.recommended, true)
  assert.equal(recommendation.runtimeValidated, false)
  assert.equal(recommendModel('qwen3-tts-base-1.7b-gguf', {totalMemoryBytes: 16 * 1024 ** 3, availableMemoryBytes: 4 * 1024 ** 3}).state, 'busy-memory')
  assert.match(recommendation.policy, /不是模型最低要求/)
  assert.equal(recommendModel('qwen3-tts-base-1.7b-gguf', {}).state, 'unknown')
  assert.equal(recommendModel('qwen3-tts-base-1.7b-gguf', { totalMemoryBytes: 4 * 1024 ** 3, availableMemoryBytes: 1024 ** 3 }).recommended, false)
  const hardware = inspectModelHardware()
  assert.equal(hardware.gpuMemoryBytes, null)
  assert.equal(hardware.scope, 'plugin-host')
})

test('application re-verifies installed bytes and refuses later corruption', async t => {
  const { installer } = await fixture(t)
  const job = start(installer)
  const result = await installer.settled(job.id)
  assert.equal((await installer.verifyInstalled(job.id)).status, 'installed')
  await writeFile(join(result.installedPath, 'model.int8.onnx'), Buffer.alloc(bytes.length))
  await assert.rejects(installer.verifyInstalled(job.id), { code: 'HASH_MISMATCH' })
})

test('abrupt process exit recovers the persisted job paused, never auto-started', async t => {
  const { spawn } = await import('node:child_process')
  const { installer, root, catalog, origin, requests, create } = await fixture(t, (req, res) => serve(req, res, { slow: true }))
  await installer.close()
  const code = `import {createModelInstaller} from ${JSON.stringify(new URL('../voice-model-installer.mjs', import.meta.url).href)};
  const i=createModelInstaller({root:${JSON.stringify(root)},catalog:${JSON.stringify(catalog)},allowUrl:u=>new URL(u).origin===${JSON.stringify(origin)},minFreeBytes:0,probe:async()=>({backends:{sensevoice:{cpu:{available:true}}}})});
  const p=i.plan('sensevoice-int8-2024-07-17');i.start({modelId:p.modelId,compute:'cpu',planHash:p.planHash,accepted:true});setInterval(()=>{},1000);`
  const child = spawn(process.execPath, ['--input-type=module', '-e', code], { stdio: 'ignore' })
  t.after(() => { if (child.exitCode === null) child.kill('SIGKILL') })
  await waitUntil(() => requests.length === 1)
  await sleep(25)
  await new Promise(resolve => { child.once('exit', resolve); child.kill('SIGKILL') })
  const reopened = create()
  const recovered = reopened.snapshot().jobs[0]
  assert.equal(recovered.status, 'paused')
  assert.equal(recovered.error.code, 'HOST_RESTARTED')
  await reopened.close()
  const reopenedAgain = create()
  assert.deepEqual(reopenedAgain.snapshot().jobs[0].error, recovered.error)
  await sleep(20); assert.equal(requests.length, 1)
  reopenedAgain.resume(recovered.id)
  assert.equal((await reopenedAgain.settled(recovered.id)).status, 'installed')
})

test('corrupt-file reset rejects an OS open denial before any truncation or new download', async t => {
  const { installer, requests, root } = await fixture(t, (req, res) => serve(req, res, { data: Buffer.alloc(bytes.length) }))
  const job = start(installer)
  assert.equal((await installer.settled(job.id)).error.code, 'HASH_MISMATCH')
  const originalOpen = fsPromises.open
  let denied = 0
  t.mock.method(fsPromises, 'open', async (path, flags, ...rest) => {
    if (String(path).endsWith('model.int8.onnx') && (flags & fs.constants.O_WRONLY) && !(flags & fs.constants.O_CREAT)) {
      denied++
      throw Object.assign(new Error('Synthetic Windows sharing denial before open'), { code: 'EPERM' })
    }
    return originalOpen(path, flags, ...rest)
  })
  syncBuiltinESMExports()
  try {
    installer.resume(job.id)
    const failed = await installer.settled(job.id)
    assert.equal(failed.status, 'failed'); assert.equal(failed.error.code, 'EPERM')
    assert.equal(failed.installedPath, undefined); assert.equal(denied, 1); assert.equal(requests.length, 1)
    assert.deepEqual(await readFile(join(root, '.jobs', job.id, 'model.int8.onnx')), Buffer.alloc(bytes.length))
  } finally { t.mock.restoreAll(); syncBuiltinESMExports() }
})

test('identity fault sentinel differs even when Windows inode is beyond safe integer range', () => {
  const large = 2 ** 54
  assert.equal(large + 1, large, 'old increment could silently leave the identity unchanged')
  for (const ino of [0, 1, large, Number.MAX_SAFE_INTEGER]) assert.notEqual(ino === 0 ? 1 : 0, ino)
})
