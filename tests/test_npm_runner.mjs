import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm, realpath } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { resolveNpmCli, runNpm } from './helpers/npm.mjs'

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'whale npm runner & spaces-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  return dir
}

async function writeCli(path) {
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, 'console.log(JSON.stringify({ args: process.argv.slice(2), cwd: process.cwd() }))')
  return path
}

test('npm runner preserves paths, quotes and shell metacharacters without a shell', async t => {
  const dir = await fixture(t)
  const cli = await writeCli(join(dir, 'npm-cli.js'))
  const args = ['pack', '--cache', join(dir, 'cache & data'), 'literal "quotes"', 'a & echo injected', '%PATH%', '$(echo injected)', 'a;b', '']
  const { stdout } = await runNpm(args, { cwd: dir, env: { ...process.env, npm_execpath: cli }, shell: true })
  assert.deepEqual(JSON.parse(stdout), { args, cwd: dir })
})

// realpath expands Windows 8.3 temp paths (RUNNER~1) to their long names.
test('npm CLI resolver uses the Node installation when called directly by node --test', async t => {
  const dir = await fixture(t)
  const cli = await writeCli(join(dir, 'node_modules/npm/bin/npm-cli.js'))
  assert.equal(await resolveNpmCli({ env: {}, execPath: join(dir, 'node.exe') }), await realpath(cli))
})

test('npm CLI resolver supports PATH installations and Windows Path capitalization', async t => {
  const dir = await fixture(t)
  const cli = await writeCli(join(dir, 'node_modules/npm/bin/npm-cli.js'))
  assert.equal(await resolveNpmCli({ env: { Path: dir }, execPath: join(dir, 'absent', 'node.exe') }), await realpath(cli))
})

test('npm CLI resolver rejects non-npm launchers and reports missing npm clearly', async t => {
  const dir = await fixture(t)
  const unrelated = join(dir, 'pnpm.cjs')
  await writeFile(unrelated, 'throw new Error("must not execute")')
  await assert.rejects(resolveNpmCli({ env: { npm_execpath: unrelated }, execPath: join(dir, 'node.exe') }), /Cannot find npm-cli.js/)
})
