import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import test from 'node:test'
import { UPDATE_PACKAGE, UPDATE_REGISTRY } from '../voice-update-catalog.mjs'
import { installReviewedBundle, verifiedLocalUpdateArchive } from '../voice-update-installer.mjs'

const current = '0.5.39-rc.19'
const target = '0.5.39-rc.22'
const bytes = Buffer.from('verified archive fixture')
const integrity = 'sha512-' + createHash('sha512').update(bytes).digest('base64')
const fetchImpl = async url => {
  assert.equal(url, `${UPDATE_REGISTRY}${UPDATE_PACKAGE}/${current}`)
  return Response.json({
    name: UPDATE_PACKAGE,
    version: current,
    dist: { integrity, tarball: `${UPDATE_REGISTRY}${UPDATE_PACKAGE}/-/${UPDATE_PACKAGE}-${current}.tgz` },
    dsh: { bundle: {} },
  })
}

async function fixture(t, { changeOriginal, targetSucceeds = false } = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'fish-update-rollback-'))
  t.after(() => rm(directory, { force: true, recursive: true }))
  const profile = { dir: join(directory, 'dsh-profile') }
  await mkdir(profile.dir)
  const source = join(directory, 'original.tgz')
  await writeFile(source, bytes)
  const bundle = { name: UPDATE_PACKAGE, version: current, enabled: true, installed: true, removable: true, source: 'file:' + source }
  const archive = await verifiedLocalUpdateArchive(bundle, { fetchImpl, signal: new AbortController().signal })
  assert.ok(archive)
  let installed = bundle, targetAllowed = targetSucceeds
  const attempts = []
  const manager = {
    profile,
    async listBundles() { return installed ? [installed] : [] },
    async removeBundle() {
      installed = null
      await changeOriginal?.(source)
      return { application: 'applied' }
    },
    async installBundle(spec, options) {
      attempts.push({ spec, options })
      if (spec === `${UPDATE_PACKAGE}@${target}`) {
        if (!targetAllowed) return { application: 'failed', stage: 'install' }
        installed = { ...bundle, version: target, source: spec }
        return { application: 'applied', bundle: UPDATE_PACKAGE, version: target }
      }
      assert.deepEqual(await readFile(spec), bytes)
      installed = { ...bundle, source: 'file:' + spec }
      return { application: 'applied', bundle: UPDATE_PACKAGE, version: current }
    },
  }
  return { profile, bundle, archive, manager, source, attempts, allowTarget: () => { targetAllowed = true } }
}

test('healthy rollback uses the original verified location without creating any backup file', async t => {
  const f = await fixture(t)
  const receipt = await installReviewedBundle(f.manager, target, f, true)
  assert.equal(receipt.restore.application, 'applied')
  assert.equal(f.attempts.at(-1).spec, f.source)
  assert.deepEqual(await readdir(f.profile.dir), [])
})

for (const [change, changeOriginal] of [
  ['moved', path => rename(path, path + '.moved')],
  ['replaced', path => writeFile(path, 'unverified replacement')],
]) test(`rollback restores verified bytes into a durable profile path if the original is ${change}`, async t => {
  const f = await fixture(t, { changeOriginal })
  const receipt = await installReviewedBundle(f.manager, target, f, true)
  assert.equal(receipt.restore.application, 'applied')
  const { spec, options } = f.attempts.at(-1)
  const profilePath = relative(f.profile.dir, spec)
  assert.ok(profilePath && !profilePath.startsWith('..'))
  assert.notEqual(spec, f.source)
  assert.deepEqual(options.expected, { name: UPDATE_PACKAGE, version: current })
  assert.equal(options.enabled, true)
  assert.equal((await f.manager.listBundles())[0].source, 'file:' + spec)
  assert.deepEqual(await readFile(spec), bytes)
})

test('successful update creates no backup even if the original is moved during removal', async t => {
  const f = await fixture(t, { changeOriginal: path => rename(path, path + '.moved'), targetSucceeds: true })
  const receipt = await installReviewedBundle(f.manager, target, f, true)
  assert.equal(receipt.result.application, 'applied')
  assert.equal(f.attempts.length, 1)
  assert.deepEqual(await readdir(f.profile.dir), [])
})

test('successful migration retires a recovered profile archive after DSH selects the registry version', async t => {
  let moved = false
  const f = await fixture(t, { changeOriginal: async path => {
    if (moved) return
    await rename(path, path + '.moved')
    moved = true
  } })
  await installReviewedBundle(f.manager, target, f, true)
  const [bundle] = await f.manager.listBundles()
  const recoveredSource = bundle.source.slice('file:'.length)
  assert.deepEqual(await readFile(recoveredSource), bytes)
  const archive = await verifiedLocalUpdateArchive(bundle, { fetchImpl, signal: new AbortController().signal })
  f.allowTarget()
  const result = await installReviewedBundle(f.manager, target, { bundle, archive }, true)
  assert.equal(result.result.application, 'applied')
  assert.equal((await f.manager.listBundles())[0].version, target)
  await assert.rejects(readFile(recoveredSource), { code: 'ENOENT' })
  assert.deepEqual(await readFile(f.source + '.moved'), bytes)
})
