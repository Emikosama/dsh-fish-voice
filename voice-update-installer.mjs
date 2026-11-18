import { createHash, randomUUID } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { lstat, mkdir, open, unlink } from 'node:fs/promises'
import { dirname, isAbsolute, join } from 'node:path'
import { UPDATE_PACKAGE, UPDATE_REGISTRY, readOfficialUpdatePackage } from './voice-update-catalog.mjs'

const MAX_ARCHIVE_BYTES = 32 * 1024 * 1024
const localAbsolute = path => typeof path === 'string' && isAbsolute(path)
  && (process.platform !== 'win32' || /^[a-z]:[\\/]/i.test(path))

async function readLocalArchive(path, signal) {
  const info = await lstat(path)
  if (!info.isFile() || info.size <= 0 || info.size > MAX_ARCHIVE_BYTES) return null
  const chunks = []
  let length = 0
  for await (const chunk of createReadStream(path, { signal })) {
    length += chunk.length
    if (length > info.size) return null
    chunks.push(chunk)
  }
  return length === info.size ? Buffer.concat(chunks, length) : null
}

// DSH's listBundles returns an absolute path after the file: prefix. Reject
// directories, symlinks and Windows network paths before opening the archive.
export async function verifiedLocalUpdateArchive(bundle, { fetchImpl, signal }) {
  if (!bundle.removable || bundle.error || typeof bundle.source !== 'string'
    || !/^file:.+\.tgz$/i.test(bundle.source)) return null
  const path = bundle.source.slice('file:'.length)
  if (!localAbsolute(path)) return null
  try {
    const bytes = await readLocalArchive(path, signal)
    if (!bytes) return null
    const official = await readOfficialUpdatePackage(bundle.version, fetchImpl, signal)
    const hash = createHash('sha512').update(bytes).digest('base64')
    if (`sha512-${hash}` === official.dist.integrity) return { path, bytes }
    return null
  } catch {
    signal?.throwIfAborted()
    return null
  }
}

function rollbackPath(manager, archive, version) {
  const profile = manager.profile?.dir
  const directory = localAbsolute(profile) ? profile : dirname(archive.path)
  return join(directory, '.dsh-fish-voice-rollback', `${UPDATE_PACKAGE}-${version}.tgz`)
}

async function archiveMatches(path, archive) {
  const observed = await readLocalArchive(path).catch(() => null)
  return observed?.equals(archive.bytes) === true
}

async function rollbackSource(manager, archive, version) {
  if (await archiveMatches(archive.path, archive)) return archive.path
  const path = rollbackPath(manager, archive, version)
  await mkdir(dirname(path), { recursive: true })
  let handle
  try { handle = await open(path, 'wx', 0o600) }
  catch (error) {
    if (error.code === 'EEXIST' && await archiveMatches(path, archive)) return path
    throw error
  }
  try {
    try {
      await handle.writeFile(archive.bytes)
      await handle.sync()
    } finally { await handle.close() }
    return path
  } catch (error) {
    await unlink(path).catch(() => {})
    throw error
  }
}

const failed = result => !result || !['applied', 'restart-required', 'overridden'].includes(result.application)
const settle = async operation => {
  try { return await operation() }
  catch { return { application: 'failed', error: { code: 'operation-error' } } }
}

export async function installReviewedBundle(manager, version, plan, hmr) {
  const options = { registry: UPDATE_REGISTRY, requestId: randomUUID() }
  if (!plan.archive) return manager.updateBundle(UPDATE_PACKAGE, version, options)

  const { bundle, archive } = plan
  const stillInstalled = (await manager.listBundles()).find(item => item.name === UPDATE_PACKAGE)
  if (stillInstalled?.version !== bundle.version || stillInstalled?.source !== bundle.source
    || stillInstalled?.enabled !== bundle.enabled) {
    return { step: 'check', result: { application: 'failed', error: { code: 'invalid-spec' } } }
  }
  const targetOptions = {
    ...options, saveExact: true, enabled: bundle.enabled,
    expected: { name: UPDATE_PACKAGE, version },
  }
  const install = async () => {
    const result = await settle(() => manager.installBundle(`${UPDATE_PACKAGE}@${version}`, targetOptions))
    if (!failed(result) && archive.path === rollbackPath(manager, archive, bundle.version)) {
      // Keep this plugin-owned archive until DSH has selected another source.
      const updated = await manager.listBundles().catch(() => [])
      const selected = updated.find(item => item.name === UPDATE_PACKAGE)
      if (selected?.version === version && selected.source !== bundle.source && await archiveMatches(archive.path, archive)) {
        await unlink(archive.path).catch(() => {})
      }
    }
    return result
  }
  if (!hmr) return { step: 'install', result: await install() }

  const removal = await settle(() => manager.removeBundle(UPDATE_PACKAGE))
  if (failed(removal)) {
    // A failed remove can still have deselected the bundle before pnpm failed.
    const remaining = (await manager.listBundles()).find(item => item.name === UPDATE_PACKAGE)
    const restore = remaining?.version === bundle.version && bundle.enabled && !remaining.enabled
      ? await settle(() => manager.setBundleEnabled(UPDATE_PACKAGE, true)) : undefined
    return { step: 'remove', result: removal, restore }
  }
  const result = await install()
  if (!failed(result)) return { step: 'install', result }

  if (result.stage === 'enable') {
    // DSH can retain a successfully installed package on an enable error.
    const remaining = (await manager.listBundles()).find(item => item.name === UPDATE_PACKAGE)
    if (remaining?.version === version) await settle(() => manager.removeBundle(UPDATE_PACKAGE))
  }
  const restore = await settle(async () => manager.installBundle(await rollbackSource(manager, archive, bundle.version), {
    enabled: bundle.enabled, expected: { name: UPDATE_PACKAGE, version: bundle.version },
  }))
  return { step: 'install', result, restore }
}
