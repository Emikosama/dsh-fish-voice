import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { execFile } from 'node:child_process'
import { probeFileSymlink, requireFileSymlink } from './helpers/symlink.mjs'

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'whale symlink probe-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  return root
}
const throwing = (code, syscall = 'symlink') => () => { throw Object.assign(new Error(code), { code, syscall }) }

test('symlink probe skips only known capability errors and cleans its temporary files', t => {
  const root = fixture(t)
  for (const code of ['EPERM', 'EACCES', 'ENOSYS', 'ENOTSUP', 'EOPNOTSUPP']) {
    let reason
    assert.equal(requireFileSymlink({ skip(value) { reason = value } }, root, { required: false, createLink: throwing(code) }), false)
    assert.match(reason, new RegExp(`file symlink capability unavailable \\(${code}\\)`))
    assert.deepEqual(readdirSync(root), [])
  }
})
test('symlink probe does not hide unexpected errors or a failed setup/verification', t => {
  const root = fixture(t)
  for (const code of ['EEXIST', 'ENOENT', 'ENOSPC', 'EIO']) {
    assert.throws(() => probeFileSymlink(root, { createLink: throwing(code) }), { code })
    assert.deepEqual(readdirSync(root), [])
  }
  assert.throws(() => probeFileSymlink(root, { createLink: throwing('EPERM', 'open') }), { code: 'EPERM' })
  assert.throws(() => probeFileSymlink(join(root, 'absent')), { code: 'ENOENT' })
  assert.throws(() => probeFileSymlink(root, { createLink: (_target, link) => writeFileSync(link, 'not a link') }), { code: 'ERR_ASSERTION' })
  assert.deepEqual(readdirSync(root), [])
})
test('required symlink coverage fails rather than silently skipping', t => {
  const root = fixture(t)
  assert.throws(() => requireFileSymlink({ skip() { assert.fail('must not skip') } }, root, { required: true, createLink: throwing('EPERM') }), /requires real symlink security coverage/)
  assert.deepEqual(readdirSync(root), [])
})
test('without symlink privilege only the three real-link fixtures skip; other safety checks run', { timeout: 60000 }, async () => {
  const cwd = fileURLToPath(new URL('../', import.meta.url))
  const files = ['test_tts_install_intent_bridge.mjs', 'test_tts_model_installer.mjs', 'test_voice_tts_local.mjs']
  const env = { ...process.env, WHALE_TEST_REQUIRE_SYMLINK: '0' }
  delete env.NODE_TEST_CONTEXT
  const { stdout, stderr } = await promisify(execFile)(process.execPath, [
    '--import', new URL('./helpers/deny-symlink.mjs', import.meta.url).href,
    '--test', '--test-reporter=tap', ...files.map(name => join(cwd, 'tests', name)),
  ], { cwd, env, timeout: 55000, maxBuffer: 2 * 1024 * 1024, windowsHide: true })
  assert.equal(stderr, '')
  assert.match(stdout, /# fail 0\r?\n/)
  const skipped = stdout.split(/\r?\n/).filter(line => /^ok .*# SKIP file symlink capability unavailable/.test(line))
  assert.equal(skipped.length, 3, stdout)
  for (const name of [
    'unsafe intent ledger (symlink) neither breaks reads nor starts download',
    'extraction refuses output symlink without touching victim',
    'asset gate rejects linked files without touching their target',
  ]) assert.ok(skipped.some(line => line.includes(name)), name)
  for (const name of [
    'asset gate rejects missing and wrong-sized files; unknown models cannot execute',
    'archive extraction fails closed for traversal, links, digest and size mismatches',
    'ZIP only writes manifest ordinary files and rejects symlinks, traversal and corrupt index',
    ...['json', 'oversized', 'shape'].map(kind => `unsafe intent ledger (${kind}) neither breaks reads nor starts download`),
  ]) assert.ok(stdout.split(/\r?\n/).some(line => /^ok /.test(line) && line.endsWith(name)), name)
})
