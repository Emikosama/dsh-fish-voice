import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, symlinkSync, lstatSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const unavailableCodes = new Set(['EPERM', 'EACCES', 'ENOSYS', 'ENOTSUP', 'EOPNOTSUPP'])

// Probe on the fixture's filesystem, not by OS name or administrator status.
// Only the symlink syscall's known capability errors may skip an attack fixture.
// Setup, verification, cleanup and the actual product assertions must still fail.
export function probeFileSymlink(parent, { createLink = symlinkSync } = {}) {
  const dir = mkdtempSync(join(parent, '.symlink-probe-'))
  try {
    const target = join(dir, 'target'), link = join(dir, 'link')
    writeFileSync(target, 'symlink capability probe')
    try { createLink(target, link, 'file') }
    catch (error) {
      if (error?.syscall !== 'symlink' || !unavailableCodes.has(error.code)) throw error
      return { supported: false, reason: `file symlink capability unavailable (${error.code}); Windows may require Developer Mode or SeCreateSymbolicLinkPrivilege` }
    }
    assert.equal(lstatSync(link).isSymbolicLink(), true)
    assert.equal(readFileSync(link, 'utf8'), 'symlink capability probe')
    return { supported: true }
  } finally { rmSync(dir, { recursive: true, force: true }) }
}

export function requireFileSymlink(t, parent, { required = process.env.WHALE_TEST_REQUIRE_SYMLINK === '1', ...options } = {}) {
  const capability = probeFileSymlink(parent, options)
  if (capability.supported) return true
  assert.equal(required, false, `${capability.reason}; this run requires real symlink security coverage`)
  t.skip(capability.reason)
  return false
}
