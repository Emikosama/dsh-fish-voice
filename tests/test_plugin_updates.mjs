import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, rm, rmdir, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { createVoiceUpdateService, voiceUpdateInstalling } from '../voice-update-service.mjs'
import { UPDATE_CATALOG, UPDATE_PACKAGE, UPDATE_REGISTRY } from '../voice-update-catalog.mjs'
import { satisfies } from '../voice-update-semver.mjs'
import manifest from '../package.json' with { type: 'json' }
import { conversationRemote } from '../ui/conversation-contract.mjs'
import { apply as mountRemote } from '../ui/conversation-remote.mjs'

const current = '0.5.39-rc.21'
const target = '0.5.39-rc.22'
const next = '0.5.39-rc.23'
const integrity = 'sha512-' + Buffer.alloc(64, 10).toString('base64')
const release = (version = target, fields = {}) => ({
  version, integrity, channel: version.includes('-') ? 'preview' : 'stable', announcement: '已审核的测试公告。',
  dsh: '>=0.2.2-rc.3 <0.3.0', platforms: ['win32'], architectures: ['x64'], ...fields,
})
const npmUrl = version => `${UPDATE_REGISTRY}${UPDATE_PACKAGE}/${version}`
const packageOf = (version, overrides = {}) => ({
  name: UPDATE_PACKAGE, version, engines: { node: '>=24.9.0' }, dsh: { bundle: { patch: './cordis.patch.yml' } },
  dist: { integrity, tarball: `${UPDATE_REGISTRY}${UPDATE_PACKAGE}/-/${UPDATE_PACKAGE}-${version}.tgz` },
  ...overrides,
})
const readDsh = () => ({
  dshVersion: '0.2.2-rc.3',
  evaluateDsh(manifest, _exemptions, version) {
    const range = manifest.engines.dsh ?? manifest.peerDependencies?.['@deepseek-ai/dsh']
    return range && !satisfies(version, range, { includePrerelease: true }) ? { requirements: { range } } : undefined
  },
})
const applied = (version, application = 'applied', enabled = true) => ({
  step: 'install', from: current, to: version,
  result: { application, bundle: UPDATE_PACKAGE, version, enabled },
})

function scenario(t, overrides = {}) {
  const calls = []
  const fixture = {
    releases: [release()],
    bundles: [{ name: UPDATE_PACKAGE, version: overrides.currentVersion ?? current, installed: true, enabled: true, update: 'registry' }],
    manifests: {},
    update: version => applied(version),
  }
  const manager = {
    async listBundles() { return fixture.bundles },
    async updateBundle(name, version, options) {
      calls.push({ name, version, options })
      return fixture.update(version)
    },
  }
  const fetchImpl = async (url, options) => {
    assert.equal(options.redirect, 'error')
    assert.equal(options.credentials, 'omit')
    calls.push(url)
    if (url === UPDATE_CATALOG) return Response.json({ schema: 1, releases: fixture.releases })
    const version = url.slice(npmUrl('').length)
    assert.equal(npmUrl(version), url)
    return Response.json(fixture.manifests[version] ?? packageOf(version))
  }
  const service = createVoiceUpdateService({
    currentVersion: current, readDsh, getManager: () => manager, platform: 'win32', arch: 'x64',
    nodeVersion: '24.15.0', fetchImpl, ...overrides,
  })
  t.after(() => service.dispose())
  return { service, fixture, manager, calls }
}

test('reviewed catalog and npm exact version drive a host-owned, deduplicated installation', async t => {
  const { service, calls, fixture } = scenario(t)
  const states = []
  service.subscribe(() => states.push(service.read().status))
  assert.equal(await service.install(target), service.read(), 'a version cannot be installed before its offer')
  const firstCheck = service.check()
  assert.equal(service.check(), firstCheck)
  assert.deepEqual((await firstCheck).release, {
    version: target, announcement: '已审核的测试公告。',
    url: `https://github.com/Emikosama/dsh-fish-voice/releases/tag/v${target}`,
  })
  assert.deepEqual(calls, [UPDATE_CATALOG, npmUrl(target)])
  assert.equal((await service.install(next)).status, 'available')
  fixture.update = version => applied(version, 'restart-required')
  const install = service.install(target)
  assert.equal(service.install(target), install)
  assert.equal(service.check(), install)
  const result = await install
  assert.equal(result.status, 'restart-required')
  assert.match(result.message, /重启 DSH/)
  assert.equal((await service.check()).status, 'restart-required')
  assert.deepEqual(states, ['checking', 'available', 'installing', 'restart-required'])
  const installs = calls.filter(value => typeof value === 'object')
  assert.equal(installs.length, 1)
  assert.equal(installs[0].name, UPDATE_PACKAGE)
  assert.equal(installs[0].version, target)
  assert.equal(installs[0].options.registry, UPDATE_REGISTRY)
  assert.equal(typeof installs[0].options.requestId, 'string')
})

test('approval withdrawal and a newly approved version supersede the previous offer', async t => {
  const { service, fixture, calls } = scenario(t)
  await service.check()
  fixture.releases = [release(next)]
  const changed = await service.install(target)
  assert.equal(changed.release.version, next)
  assert.equal(calls.some(value => typeof value === 'object'), false)
  fixture.releases = []
  assert.equal((await service.install(next)).status, 'current')
  assert.equal(calls.some(value => typeof value === 'object'), false)
})

test('revised notes for the same version are presented before the install proceeds', async t => {
  const { service, fixture, calls } = scenario(t)
  const revisions = [service.read().revision]
  service.subscribe(() => revisions.push(service.read().revision))
  await service.check()
  fixture.releases = [release(target, { announcement: '本次公告已修订。' })]
  const changed = await service.install(target)
  assert.equal(changed.status, 'available')
  assert.equal(changed.release.announcement, '本次公告已修订。')
  assert.equal(calls.some(value => typeof value === 'object'), false)
  assert.equal((await service.install(target)).status, 'installed')
  assert.deepEqual(revisions, [0, 1, 2, 3, 4, 5, 6])
})

test('stable installations ignore prerelease announcements and any older versions', async t => {
  const { service, fixture, calls } = scenario(t, { currentVersion: '0.5.40' })
  fixture.releases = [release('0.5.41-rc.10'), release(target), release('0.5.40'), release('0.5.40-rc.30')]
  const result = await service.check()
  assert.equal(result.status, 'current')
  assert.equal(result.channel, 'stable')
  assert.equal(result.release, null)
  assert.deepEqual(calls, [UPDATE_CATALOG])
})

test('newest compatible non-deprecated reviewed release wins on the current platform and runtime', async t => {
  const { service, fixture } = scenario(t)
  fixture.releases = [
    release('0.5.39-rc.27', { dsh: '>=0.3.0' }),
    release('0.5.39-rc.26', { architectures: ['arm64'] }),
    release('0.5.39-rc.25', { platforms: ['linux'] }),
    release('0.5.39-rc.24'), release(next), release(target),
  ]
  fixture.manifests['0.5.39-rc.24'] = packageOf('0.5.39-rc.24', { deprecated: 'retracted' })
  fixture.manifests[next] = packageOf(next, { engines: { node: '>=25.0.0' } })
  assert.equal((await service.check()).release.version, target)
  fixture.manifests[target] = packageOf(target, { peerDependencies: { '@deepseek-ai/dsh': '>=0.3.0' } })
  assert.equal((await service.check()).status, 'incompatible')
})

test('the official dist address and sha512 must agree with the approved publication before announcing', async t => {
  const { service, fixture } = scenario(t)
  fixture.manifests[target] = packageOf(target, { dist: { integrity, tarball: 'https://somewhere.invalid/copy.tgz' } })
  let result = await service.check()
  assert.equal(result.status, 'error')
  assert.equal(result.release, null)
  fixture.manifests[target] = packageOf(target)
  fixture.releases[0].integrity = 'sha512-' + Buffer.alloc(64, 11).toString('base64')
  result = await service.check()
  assert.equal(result.status, 'error')
  assert.equal(result.release, null)
})

test('unsupported source and a higher package already installed never lead to downgrade', async t => {
  const { service, fixture, calls } = scenario(t)
  fixture.bundles[0].update = 'git'
  const git = await service.check()
  assert.equal(git.status, 'unsupported')
  assert.equal(git.canInstall, false)
  fixture.bundles[0].update = 'registry'
  await service.check()
  fixture.bundles[0].version = next
  const pending = await service.install(target)
  assert.equal(pending.status, 'restart-required')
  assert.equal(pending.release, null)
  assert.equal(calls.some(value => typeof value === 'object'), false)
})

test('host reports explicit enable, restoration success and restoration failure', async t => {
  const first = scenario(t)
  await first.service.check()
  first.fixture.update = version => applied(version, 'overridden')
  assert.equal((await first.service.install(target)).status, 'enable-required')
  const second = scenario(t)
  await second.service.check()
  second.fixture.update = () => ({ step: 'install', result: { application: 'failed' }, restore: { application: 'applied' } })
  const restored = await second.service.install(target)
  assert.equal(restored.status, 'error')
  assert.equal(restored.canInstall, true)
  assert.match(restored.message, /已恢复/)
  second.fixture.update = () => ({ step: 'install', result: { application: 'failed' }, restore: { application: 'failed' } })
  const failed = await second.service.install(target)
  assert.equal(failed.canInstall, false)
  assert.match(failed.message, /恢复均未完成/)
})

test('a bundle remounted by HMR receives the install outcome from the host-owned job', async t => {
  const older = scenario(t)
  const started = Promise.withResolvers()
  const complete = Promise.withResolvers()
  older.fixture.update = () => { started.resolve(); return complete.promise }
  await older.service.check()
  const oldJob = older.service.install(target)
  await started.promise
  older.service.dispose()
  const currentMount = scenario(t, { currentVersion: target }).service
  assert.equal((await currentMount.check()).status, 'installing')
  assert.equal(voiceUpdateInstalling(), true)
  complete.resolve(applied(target))
  await oldJob
  assert.equal(voiceUpdateInstalling(), false)
  assert.equal(currentMount.read().status, 'installed')
  assert.equal(currentMount.read().currentVersion, target)
  assert.equal((await currentMount.check()).status, 'current')
})

test('an unavailable update listener does not break checks or silence other listeners', async t => {
  const { service } = scenario(t)
  const observed = []
  service.subscribe(() => { throw Error('listener has gone away') })
  service.subscribe(() => observed.push(service.read().status))
  assert.equal((await service.check()).status, 'available')
  assert.deepEqual(observed, ['checking', 'available'])
})

test('a disposed diagnostic sink cannot replace a confirmed HMR rollback receipt', async t => {
  const untilRemoved = Promise.withResolvers()
  const restored = Promise.withResolvers()
  const errors = []
  const old = scenario(t, { onHostError(stage) { errors.push(stage); throw Error('diagnostic service is disposed') } })
  await old.service.check()
  old.fixture.update = () => { untilRemoved.resolve(); return restored.promise }
  const installing = old.service.install(target)
  await untilRemoved.promise
  old.service.dispose()
  const reloaded = scenario(t).service
  restored.resolve({ step: 'install', result: { application: 'failed' }, restore: { application: 'applied' } })
  await installing
  assert.match(reloaded.read().message, /已恢复/)
  assert.equal(reloaded.read().canInstall, true)
  assert.deepEqual(errors, ['update-installation'])
})

test('verified official local tgz migrates to exact npm and is used for rollback', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'fish-update-'))
  const source = join(directory, 'fish-current.tgz')
  t.after(() => rm(source, { force: true }).then(() => rmdir(directory)))
  const officialBytes = Buffer.from('sample archive bytes')
  const checksum = 'sha512-' + createHash('sha512').update(officialBytes).digest('base64')
  const { service, fixture, manager, calls } = scenario(t, { hasHmr: () => true })
  fixture.bundles[0] = { ...fixture.bundles[0], update: undefined, removable: true, source: 'file:' + source }
  fixture.manifests[current] = packageOf(current)
  fixture.manifests[current].dist.integrity = checksum
  manager.installBundle = async (spec, options) => {
    assert.equal(voiceUpdateInstalling(), true)
    calls.push({ spec, options })
    return spec === source ? applied(current).result : { application: 'failed', stage: 'install' }
  }
  manager.removeBundle = async name => {
    calls.push({ name, action: 'remove' })
    return { application: 'applied' }
  }
  manager.setBundleEnabled = () => { throw new Error('enable restoration must be part of reinstallation') }
  await writeFile(source, 'unpublished local bytes')
  assert.equal((await service.check()).status, 'unsupported')
  await writeFile(source, officialBytes)
  assert.equal((await service.check()).canInstall, true)
  const result = await service.install(target)
  assert.match(result.message, /已恢复/)
  assert.equal(voiceUpdateInstalling(), false)
  const installation = calls.filter(call => typeof call === 'object')
  assert.deepEqual(installation[0], { name: UPDATE_PACKAGE, action: 'remove' })
  assert.equal(installation[1].spec, `${UPDATE_PACKAGE}@${target}`)
  assert.equal(installation[1].options.saveExact, true)
  assert.deepEqual(installation[1].options.expected, { name: UPDATE_PACKAGE, version: target })
  assert.equal(installation[2].spec, source)
  assert.deepEqual(installation[2].options.expected, { name: UPDATE_PACKAGE, version: current })
})

test('active voice can defer install without losing the approved version or running an installer', async t => {
  const { service, calls } = scenario(t, { beforeInstall: () => '请先结束语音会话。' })
  await service.check()
  const result = await service.install(target)
  assert.equal(result.status, 'available')
  assert.match(result.message, /结束语音会话/)
  assert.equal(calls.some(value => typeof value === 'object'), false)
})

test('unconfirmed playback cleanup defers installation on the owner remote', async t => {
  const installed = manifest.version
  const offered = (Number(installed.split('.')[0]) + 1) + '.0.0'
  const { manager, fixture, calls } = scenario(t, { currentVersion: installed })
  fixture.releases = [release(offered, { platforms: [process.platform], architectures: [process.arch] })]
  t.mock.method(globalThis, 'fetch', async url => url === UPDATE_CATALOG
    ? Response.json({ schema: 1, releases: fixture.releases }) : Response.json(packageOf(offered)))
  const effects = []
  let remote
  const ctx = {
    invocation: { peer: { principal: { kind: 'owner' } } },
    get(name) {
      if (name === 'pluginManager') return manager
      if (name === 'loader') return { import: async spec => spec.endsWith('app-boot')
        ? { getDshRuntimeVersion: () => readDsh().dshVersion, evaluatePluginCompatibility: readDsh().evaluateDsh }
        : { TypertRemoteService: class { constructor(context) { this.ctx = context } } } }
    },
    whaleVoiceSession: { status: () => ({ voiceSession: { fullyStopped: true }, ttsRuntime: { busy: false, blocked: true } }) },
    effect(setup) { const close = setup(); if (close) effects.push(close) },
    plugin(Service) { remote = new Service(ctx) }, typert: { register() {} },
  }
  await mountRemote(ctx)
  t.after(() => effects.forEach(close => close()))
  const offer = await remote.updateAction({ action: 'check' })
  assert.equal(offer.canInstall, true)
  const stream = remote.followUpdates()
  t.after(() => stream.return())
  await stream.next()
  await remote.updateAction({ action: 'install', version: offered })
  let value
  do { ({ value } = await stream.next()) } while (value.status === 'installing')
  assert.equal(value.status, 'available')
  assert.match(value.message, /朗读/)
  assert.equal(calls.some(call => typeof call === 'object'), false)
})

test('startup and scheduled checks do not start installation', async t => {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] })
  const { service, calls } = scenario(t)
  const observed = []
  service.subscribe(() => observed.push(service.read().status))
  service.start()
  service.start()
  t.mock.timers.tick(5_000)
  await service.check()
  t.mock.timers.tick(6 * 60 * 60_000)
  await service.check()
  assert.deepEqual(observed, ['checking', 'available', 'checking', 'available'])
  assert.deepEqual(calls, [UPDATE_CATALOG, npmUrl(target), UPDATE_CATALOG, npmUrl(target)])
})

test('update remotes are owner-only, sessionless and reject arbitrary install inputs', async t => {
  const install = conversationRemote.descriptors.find(item => item.method === 'updateAction')
  const follow = conversationRemote.descriptors.find(item => item.method === 'followUpdates')
  const codec = install.parameters[0].codec.create()
  assert.deepEqual(codec.parse({ action: 'install', version: target }), { action: 'install', version: target })
  for (const request of [{ action: 'install' }, { action: 'check', repo: 'https://other.invalid' }, { action: 'install', version: target, registry: 'https://other.invalid' }]) {
    assert.equal(codec.safeParse(request).success, false)
  }
  assert.equal(follow.mode, 'stream')
  assert.deepEqual(follow.parameters, [])
  let service
  const effects = []
  const ctx = {
    get: () => ({ import: async () => ({ TypertRemoteService: class { constructor(scope) { this.ctx = scope } } }) }),
    effect(factory) { const cleanup = factory(); if (cleanup) effects.push(cleanup) },
    plugin(Service) { service = new Service(ctx) },
    typert: { register() {} },
    invocation: { peer: { principal: { kind: 'agent' } } },
  }
  await mountRemote(ctx)
  t.after(() => effects.forEach(cleanup => cleanup()))
  await assert.rejects(service.updateAction({ action: 'install', version: target }), /所有者/)
  await assert.rejects(service.followUpdates().next(), /所有者/)
  ctx.invocation.peer.principal.kind = 'owner'
  const stream = service.followUpdates()
  const initial = (await stream.next()).value
  assert.deepEqual(follow.result.create().parse(initial), initial)
  await stream.return()
})
