import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, symlink, realpath, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { resolveHostReactAliases } from './build-fixture.mjs'

async function resolvedAliases(root) {
  const aliases = resolveHostReactAliases(root)
  return Object.fromEntries(await Promise.all(Object.entries(aliases).map(async ([name, path]) => [name, await realpath(path)])))
}

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'whale pnpm fixture-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const renderer = join(root, 'packages/client/ui-renderer')
  await mkdir(renderer, { recursive: true })
  await writeFile(join(root, 'package.json'), JSON.stringify({ private: true }))
  await writeFile(join(renderer, 'package.json'), JSON.stringify({ name: '@deepseek-ai/dsh-client-ui-renderer', devDependencies: { react: '^18.2.0', 'react-dom': '^18.2.0' } }))
  async function dependency(owner, name, version) {
    const store = join(root, 'store', `${name}-${version}`)
    await mkdir(store, { recursive: true })
    await writeFile(join(store, 'package.json'), JSON.stringify({ name, version, exports: { './package.json': './package.json' } }))
    await mkdir(join(owner, 'node_modules'), { recursive: true })
    await symlink(store, join(owner, 'node_modules', name), process.platform === 'win32' ? 'junction' : 'dir')
    return realpath(store)
  }
  return { root, renderer, dependency }
}

test('fixture resolves one renderer React instance under strict pnpm package-local links', async t => {
  const f = await fixture(t)
  const expected = { react: await f.dependency(f.renderer, 'react', '18.3.1'), 'react-dom': await f.dependency(f.renderer, 'react-dom', '18.3.1') }
  assert.throws(() => createRequire(join(f.root, 'package.json')).resolve('react/package.json'), { code: 'MODULE_NOT_FOUND' }, 'monorepo root has no React dependency')
  await f.dependency(join(f.root, 'packages/client/ui-primitives'), 'react', '18.2.0')
  assert.deepEqual(await resolvedAliases(f.root), expected, 'a different primitives React cannot split renderer hooks')
  await rm(join(f.renderer, 'node_modules/react-dom'))
  assert.throws(() => resolveHostReactAliases(f.root), { code: 'MODULE_NOT_FOUND' }, 'missing declared React DOM must still fail')
})

test('fixture also resolves a flat disposable host dependency layout', async t => {
  const f = await fixture(t)
  const expected = { react: await f.dependency(f.root, 'react', '18.3.1'), 'react-dom': await f.dependency(f.root, 'react-dom', '18.3.1') }
  assert.deepEqual(await resolvedAliases(f.root), expected)
})
