import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import { syncBuiltinESMExports } from 'node:module'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink, link } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createModelInstaller } from '../voice-model-installer.mjs'
import { requireFileSymlink } from './helpers/symlink.mjs'
const hash = value => createHash('sha256').update(value).digest('hex')
const main = 'Qwen3-TTS-12Hz-1.7B-Base-Q4_K_M.gguf', mmproj = 'mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf'
function archiveFixture() {
  const bytes = Buffer.from('Synthetic runtime; never executed'), header = Buffer.alloc(512)
  header.write('bin/llama-tts'); header.write('0000700\0', 100); header.write(bytes.length.toString(8).padStart(11, '0') + '\0', 124); header.fill(32, 148, 156); header.write('0', 156); header.write('ustar\0', 257)
  header.write([...header].reduce((a, b) => a + b, 0).toString(8).padStart(6, '0') + '\0 ', 148)
  const archive = gzipSync(Buffer.concat([header, bytes, Buffer.alloc((512 - bytes.length % 512) % 512), Buffer.alloc(1024)]))
  return { archive, runtime: { file: 'runtime.tar.gz', source_url: 'https://test.invalid/runtime.tar.gz', format: 'tar.gz', bytes: archive.length, sha256: hash(archive), executable: 'llama-tts', entries: [{ entry: 'bin/llama-tts', file: 'llama-tts', bytes: bytes.length, sha256: hash(bytes), executable: true }] } }
}
async function fixture(t, { tts = false, reuse = false } = {}) {
  const base = await mkdtemp(join(tmpdir(), 'whale-repair-')), root = join(base, 'managed'), source = join(base, 'original-models')
  const id = tts ? 'qwen3-tts-base-1.7b-gguf' : 'sensevoice-int8-2024-07-17', names = tts ? [main, mmproj] : ['model.int8.onnx', 'tokens.txt']
  const assets = new Map(names.map((name, index) => [name, Buffer.from('synthetic fixed asset ' + index)])), requests = [], instances = []
  const { archive, runtime } = archiveFixture(); if (tts) assets.set(runtime.file, archive)
  if (reuse) { await mkdir(source); for (const name of names) await writeFile(join(source, name), assets.get(name)) }
  const files = [...assets].map(([file, bytes]) => ({ file, bytes: bytes.length, sha256: hash(bytes), source_url: 'https://test.invalid/' + file }))
  let response = async (name) => new Response(assets.get(name), { headers: { 'content-length': String(assets.get(name).length), etag: '"v1"' } })
  const options = { root, catalog: { schema: 1, models: [{ id, revision: 'a'.repeat(40), files, ...(tts ? { runtimePackage: runtime } : {}) }] }, allowUrl: url => new URL(url).hostname === 'test.invalid', minFreeBytes: 0, probe: async () => ({ schema: 1, backends: { sensevoice: { cpu: { available: true } } } }), runtimeRunner: async () => ({ stdout: 'version: 12110', stderr: '' }), fetchImpl: async (url, request) => { const name = url.split('/').pop(); requests.push(name); return response(name, request) } }
  const create = () => { const installer = createModelInstaller(options); instances.push(installer); return installer }
  const start = installer => { const extra = reuse ? { sourceDirectory: source, modelVariant: 'q4_k_m' } : {}, plan = installer.plan(id, 'cpu', extra); return installer.start({ modelId: id, compute: 'cpu', planHash: plan.planHash, accepted: true, ...extra }) }
  const installer = create(), job = start(installer), done = await installer.settled(job.id)
  assert.equal(done.status, 'installed', JSON.stringify(done.error))
  t.after(async () => { await Promise.allSettled(instances.map(i => i.close())); await rm(base, { recursive: true, force: true }) })
  return { base, root, source, assets, names, requests, create, start, installer, done, id, stage: join(root, '.jobs', job.id), setResponse: fn => response = fn }
}
for (const tts of [false, true]) for (const damage of ['missing', 'shortened']) test(`installed ${tts ? 'TTS' : 'ASR'} ${damage} repairs same path and downloads only broken asset`, async t => {
  const f = await fixture(t, { tts }), other = await f.installer.settled(f.start(f.installer).id)
  await f.installer.close()
  const broken = join(f.done.installedPath, f.names[0]); if (damage === 'missing') await rm(broken); else await writeFile(broken, 'bad')
  const i = f.create(), before = f.requests.length
  assert.equal(i.snapshot().jobs.find(j => j.id === f.done.id).error.code, 'INSTALLED_FILES_MISSING')
  assert.equal(fs.existsSync(f.done.installedPath), true, 'startup does not move damaged installed path')
  i.resume(f.done.id); const repaired = await i.settled(f.done.id)
  assert.equal(repaired.status, 'installed', JSON.stringify(repaired.error)); assert.equal(repaired.installedPath, f.done.installedPath)
  assert.deepEqual(f.requests.slice(before), [f.names[0]])
  assert.deepEqual(await readFile(join(other.installedPath, f.names[0])), f.assets.get(f.names[0]))
  assert.equal(fs.existsSync(join(repaired.installedPath, '.recovery-install')), false)
  assert.equal((await i.verifyInstalled(repaired.id)).status, 'installed')
})
test('legacy staging and destination merge only verified candidates without duplicate network', async t => {
  const f = await fixture(t, { tts: true }); await f.installer.close(); await rm(join(f.done.installedPath, main))
  await mkdir(f.stage); await writeFile(join(f.stage, main), f.assets.get(main)); await writeFile(join(f.stage, mmproj), Buffer.alloc(f.assets.get(mmproj).length))
  const i = f.create(), before = f.requests.length; i.resume(f.done.id); const repaired = await i.settled(f.done.id)
  assert.equal(repaired.status, 'installed', JSON.stringify(repaired.error)); assert.equal(f.requests.length, before)
  assert.deepEqual(await readFile(join(repaired.installedPath, mmproj)), f.assets.get(mmproj))
})
for (const operation of ['resume', 'cancel']) test(`paused repair survives restart then ${operation} without resurrecting or touching other installation`, async t => {
  const f = await fixture(t), other = await f.installer.settled(f.start(f.installer).id); await f.installer.close(); await rm(join(f.done.installedPath, f.names[0]))
  await mkdir(f.stage)
  let i = f.create(), paused
  const off = i.subscribe(snapshot => { const job = snapshot.jobs.find(j => j.id === f.done.id); if (!paused && job.stage === 'downloading') paused = i.pause(job.id) })
  i.resume(f.done.id); await i.settled(f.done.id); off(); await paused
  assert.equal(fs.existsSync(join(f.stage, '.recovery-install')), true); await i.close(); i = f.create()
  assert.equal(i.snapshot().jobs.find(j => j.id === f.done.id).status, 'paused')
  if (operation === 'resume') { i.resume(f.done.id); assert.equal((await i.settled(f.done.id)).status, 'installed') }
  else { await i.cancel(f.done.id); assert.equal(fs.existsSync(f.stage), false); await i.close(); i = f.create(); assert.equal(i.snapshot().jobs.find(j => j.id === f.done.id).status, 'cancelled'); assert.throws(() => i.resume(f.done.id), { code: 'NOT_RESUMABLE' }) }
  assert.deepEqual(await readFile(join(other.installedPath, f.names[0])), f.assets.get(f.names[0]))
})
test('cancel before repairing leaves damaged destination intact and never resurrects it on restart', async t => {
  const f = await fixture(t); await f.installer.close(); await rm(join(f.done.installedPath, f.names[0])); let i = f.create()
  await i.cancel(f.done.id); assert.equal(fs.existsSync(f.done.installedPath), true); await i.close(); i = f.create()
  assert.equal(i.snapshot().jobs[0].status, 'cancelled'); assert.equal(fs.existsSync(f.done.installedPath), true); assert.equal(fs.existsSync(f.stage), false)
})
for (const damage of ['unknown', 'symlink', 'hardlink']) test(`repair refuses ${damage} in damaged destination before moving or downloading`, async t => {
  const f = await fixture(t); await f.installer.close(); await rm(join(f.done.installedPath, f.names[0]))
  if (damage === 'unknown') await writeFile(join(f.done.installedPath, 'unapproved.bin'), 'do not delete')
  else { const target = join(f.done.installedPath, f.names[1]); await rm(target); await writeFile(join(f.base, 'outside'), f.assets.get(f.names[1])); if (damage === 'symlink') { if (!requireFileSymlink(t, f.base)) return; await symlink(join(f.base, 'outside'), target, 'file') } else await link(join(f.base, 'outside'), target) }
  if (damage !== 'unknown') { assert.throws(() => f.create(), { code: 'UNSAFE_PATH' }); return }
  const i = f.create(), before = f.requests.length; i.resume(f.done.id); assert.equal((await i.settled(f.done.id)).error.code, 'UNSAFE_PATH'); assert.equal(fs.existsSync(f.done.installedPath), true); assert.equal(f.requests.length, before)
})
test('three managed locations fail closed instead of guessing which installation to overwrite', async t => {
  const f = await fixture(t); await f.installer.close(); await rm(join(f.done.installedPath, f.names[0])); await mkdir(join(f.stage, '.recovery-install'), { recursive: true })
  const i = f.create(), before = f.requests.length; i.resume(f.done.id); assert.equal((await i.settled(f.done.id)).error.code, 'RECOVERY_CONFLICT'); assert.equal(fs.existsSync(f.done.installedPath), true); assert.equal(f.requests.length, before)
})
for (const missingSource of [false, true]) test(`reuse damaged managed archive repair keeps external model read-only (${missingSource ? 'missing source' : 'available source'})`, async t => {
  const f = await fixture(t, { tts: true, reuse: true }); await f.installer.close(); await writeFile(join(f.done.installedPath, 'runtime.tar.gz'), 'bad'); if (missingSource) await rm(f.source, { recursive: true })
  const i = f.create(), before = f.requests.length; i.resume(f.done.id); const result = await i.settled(f.done.id)
  if (missingSource) { assert.equal(result.error.code, 'SOURCE_DIRECTORY_MISSING'); assert.equal(f.requests.length, before); assert.equal(fs.existsSync(f.done.installedPath), true); await i.cancel(f.done.id); assert.equal(fs.existsSync(f.source), false) }
  else { assert.equal(result.status, 'installed', JSON.stringify(result.error)); assert.deepEqual(f.requests.slice(before), ['runtime.tar.gz']); for (const file of f.names) assert.deepEqual(await readFile(join(f.source, file)), f.assets.get(file)) }
})
test('cancel latch prevents same-job resume while cleanup awaits filesystem and close waits cleanup', async t => {
  const f = await fixture(t); await f.installer.close(); await rm(join(f.done.installedPath, f.names[0])); const i = f.create(); await mkdir(f.stage)
  const original = fsPromises.rm; let enter, release; const entered = new Promise(r => enter = r), gate = new Promise(r => release = r)
  t.mock.method(fsPromises, 'rm', async (path, options) => { if (String(path) === f.stage) { enter(); await gate } return original(path, options) }); syncBuiltinESMExports(); t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports() })
  const before = f.requests.length, cancelling = i.cancel(f.done.id); await entered
  assert.throws(() => i.resume(f.done.id), { code: 'CANCEL_IN_PROGRESS' }); let closed = false; const closing = i.close().then(() => closed = true); await new Promise(r => setImmediate(r)); assert.equal(closed, false)
  release(); await cancelling; await closing; assert.equal(f.requests.length, before); assert.equal(i.snapshot().jobs[0].status, 'cancelled')
})
test('cancel racing atomic promotion keeps successful installation and reports already installed', async t => {
  const f = await fixture(t), original = fsPromises.rename
  let enter, release; const entered = new Promise(r => enter = r), gate = new Promise(r => release = r)
  t.mock.method(fsPromises, 'rename', async (from, to) => { if (String(to).startsWith(join(f.root, 'installed'))) { enter(); await gate } return original(from, to) }); syncBuiltinESMExports(); t.after(() => { t.mock.restoreAll(); syncBuiltinESMExports() })
  const job = f.start(f.installer); await entered; const cancelling = f.installer.cancel(job.id); const rejected = assert.rejects(cancelling, { code: 'ALREADY_INSTALLED' }); release(); await rejected
  assert.equal((await f.installer.settled(job.id)).status, 'installed'); assert.equal(fs.existsSync(join(f.root, 'installed', job.id)), true)
})
test('second restart cannot bypass unknown-file recovery check by moving destination into staging', async t => {
  const f = await fixture(t); await f.installer.close(); await rm(join(f.done.installedPath, f.names[0])); await writeFile(join(f.done.installedPath, 'private-note.txt'), 'leave untouched')
  let i = f.create(); assert.equal(i.snapshot().jobs[0].status, 'failed'); await i.close(); i = f.create(); const before = f.requests.length
  assert.equal(fs.existsSync(f.done.installedPath), true); assert.equal(fs.existsSync(f.stage), false)
  i.resume(f.done.id); assert.equal((await i.settled(f.done.id)).error.code, 'UNSAFE_PATH'); assert.equal(f.requests.length, before)
  assert.equal(await readFile(join(f.done.installedPath, 'private-note.txt'), 'utf8'), 'leave untouched')
})
test('crash after directory promotion waits for explicit recovery and reuses all verified files', async t => {
  const f = await fixture(t); await f.installer.close()
  const statePath = join(f.root, 'jobs.json'), state = JSON.parse(await readFile(statePath, 'utf8')); state.jobs[0].status = 'running'; state.jobs[0].stage = 'installing'; await writeFile(statePath, JSON.stringify(state))
  const i = f.create(), before = f.requests.length; assert.equal(i.snapshot().jobs[0].status, 'paused'); assert.equal(fs.existsSync(f.done.installedPath), true); assert.equal(fs.existsSync(f.stage), false)
  i.resume(f.done.id); assert.equal((await i.settled(f.done.id)).status, 'installed'); assert.equal(f.requests.length, before)
})

for (const missingSource of [false, true]) test(`missing Qwen archive preserves installed CLI route without network (${missingSource ? 'missing source' : 'available source'})`, async t => {
  const f = await fixture(t, { tts: true, reuse: true }); await f.installer.close()
  await rm(join(f.done.installedPath, 'runtime.tar.gz')); if (missingSource) await rm(f.source, {recursive:true})
  const before = f.requests.length, i = f.create()
  assert.equal(i.snapshot().jobs[0].status, 'installed')
  assert.throws(() => i.resume(f.done.id), {code:'NOT_RESUMABLE'})
  if (missingSource) {
    await assert.rejects(i.resolveManagedLocalTts(f.done.recommendedSettings.tts), {code:'SOURCE_DIRECTORY_MISSING'})
    assert.equal(fs.existsSync(f.source), false, 'lookup must not recreate external models')
  } else {
    const descriptor = await i.resolveManagedLocalTts(f.done.recommendedSettings.tts)
    assert.equal(descriptor.serverRuntime, undefined)
    assert.equal(descriptor.executable, join(f.done.installedPath, 'runtime', 'llama-tts'))
    for (const file of f.names) assert.deepEqual(await readFile(join(f.source,file)),f.assets.get(file))
  }
  assert.equal(f.requests.length,before)
  assert.equal(fs.existsSync(join(f.done.installedPath,'runtime.tar.gz')),false)
  assert.equal(fs.existsSync(f.stage),false)
})
for (const damage of ['directory','symlink','dangling-symlink','hardlink']) test(`Qwen archive compatibility rejects ${damage} during lookup and recovery`, async t => {
  const f = await fixture(t,{tts:true}), archive = join(f.done.installedPath,'runtime.tar.gz'), outside=join(f.base,'outside-archive')
  if (damage.includes('symlink') && !requireFileSymlink(t,f.base)) return
  await rm(archive)
  if (damage === 'directory') await mkdir(archive)
  else if (damage === 'dangling-symlink') await symlink(outside,archive,'file')
  else {
    await writeFile(outside,f.assets.get('runtime.tar.gz'))
    if (damage === 'symlink') await symlink(outside,archive,'file')
    else await link(outside,archive)
  }
  const before=f.requests.length
  await assert.rejects(f.installer.resolveManagedLocalTts(f.done.recommendedSettings.tts),{code:'UNSAFE_PATH'})
  await f.installer.close()
  assert.throws(()=>f.create(),{code:'UNSAFE_PATH'})
  assert.equal(f.requests.length,before)
  if (damage !== 'directory' && damage !== 'dangling-symlink') assert.deepEqual(await readFile(outside),f.assets.get('runtime.tar.gz'))
})
test('missing archive never promotes interrupted Qwen installation to installed',async t=>{
  const f=await fixture(t,{tts:true});await f.installer.close();await rm(join(f.done.installedPath,'runtime.tar.gz'))
  const path=join(f.root,'jobs.json'),state=JSON.parse(await readFile(path,'utf8'));state.jobs[0].status='running';state.jobs[0].stage='installing';await writeFile(path,JSON.stringify(state))
  const before=f.requests.length,i=f.create();assert.equal(i.snapshot().jobs[0].status,'paused');assert.equal(f.requests.length,before)
  await assert.rejects(i.resolveManagedLocalTts(f.done.recommendedSettings.tts),{code:'NOT_INSTALLED'})
})
