import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, mkdtemp, mkdir, rm } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runNpm } from './helpers/npm.mjs'
import vm from 'node:vm'

const root = fileURLToPath(new URL('../', import.meta.url))
const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url)))

test('one package declares a host entry, browser export and exactly one bundle activation row', async () => {
  assert.equal(manifest.name, 'dsh-fish-voice')
  const hostEntry = new URL('../index.mjs', import.meta.url)
  const entry = await readFile(hostEntry, 'utf8')
  assert.equal(entry.match(/const VERSION = '([^']+)'/)?.[1], manifest.version, 'runtime and installable package report the same version')
  const fileMountEntry = new URL('../index-v0538-dev1.mjs', import.meta.url)
  const [host, mounted] = await Promise.all([import(hostEntry), import(fileMountEntry)])
  assert.deepEqual(Object.keys(mounted), Object.keys(host), 'the existing file-mount path exposes the same plugin interface')
  for (const key of Object.keys(host)) assert.equal(mounted[key], host[key], `file mount shares the canonical ${key} export`)
  assert.equal(manifest.exports['.'], './bundle.mjs')
  assert.equal(manifest.exports['./client'], './lib/client.js')
  assert.equal(manifest.dsh.client.platform, 'web')
  assert.equal(manifest.dsh.bundle.patch, './cordis.patch.yml')
  const patch = await readFile(new URL('../cordis.patch.yml', import.meta.url), 'utf8')
  assert.equal((patch.match(/^\s+name:/gm) || []).length, 1)
  assert.match(patch, /name: dsh-fish-voice\s*$/)
  assert.match(patch, /id: dsh-whale-ear\s*$/m) // Preserve profile overrides, not the old import name.
  assert.deepEqual(manifest.dependencies ?? {}, {}, 'the installed plugin must not need bare runtime dependencies')
  for (const hook of ['preinstall', 'install', 'postinstall', 'prepare', 'prepack']) assert.equal(manifest.scripts[hook], undefined)
})

test('single-package browser factory mounts only one session-aware overlay without host navigation', async () => {
  let module
  vm.runInNewContext(await readFile(new URL('../lib/client.js', import.meta.url), 'utf8'), { setTimeout, clearTimeout, window: { __ModuleLoader__: { load(value) { module = value } }, addEventListener() {}, removeEventListener() {} } })
  assert.equal(module.id, manifest.name)
  const exported = module.factory(name => name === 'react/jsx-runtime' ? {} : { forwardRef: value => value })
  assert.equal(typeof exported.apply, 'function')
  assert.ok(!exported.inject.includes('pluginNavigation'))
  const registrations = []
  const ctx = {
    remote: { commands: { execute() {} } },
    effect() {},
    inject(dependencies) { assert.deepEqual(Array.from(dependencies), ['whaleFloatingLayout'], 'only optional layout dependency is added') },
    slots: { inject(name, register) { assert.notEqual(name, 'plugins.bundle.config'); register() }, register(spec) { registrations.push(spec) } },
  }
  exported.apply(ctx)
  assert.equal(registrations.filter(spec => spec.name === 'shell.overlay').length, 1)
  assert.equal(registrations.filter(spec => spec.name === 'plugins.bundle.config').length, 0)
  const overlay = registrations.find(spec => spec.name === 'shell.overlay')
  for (const child of Object.values(overlay.children)) assert.equal(child.scope, 'root', 'switching native chats must preserve the control surface')
})

test('tarball contains the built UI, matching helper and all runtime imports, without models or user data', async t => {
  const cache = await mkdtemp(join(tmpdir(), 'whale package cache-'))
  t.after(() => rm(cache, { recursive: true, force: true }))
  const { stdout } = await runNpm( ['pack', '--dry-run', '--ignore-scripts', '--json', '--cache', cache], { cwd: root, maxBuffer: 2 * 1024 * 1024 })
  const [packed] = JSON.parse(stdout)
  assert.equal(packed.name, manifest.name)
  assert.equal(packed.filename, `${manifest.name}-${manifest.version}.tgz`)
  const files = new Set(packed.files.map(file => file.path))
  for (const file of ['voice-qwen-loopback.mjs','voice-tts-resident.mjs','voice-qwen-server.mjs','voice-qwen-stream.mjs','voice-pcm-stream.mjs','qwen-server-catalog.json','helper/whale_pcm_stream_windows.cs','helper/pcm_stream_windows.ps1','bundle.mjs', 'index.mjs', 'voice-session.mjs','voice-cache-warmup.mjs','voice-fast-route.mjs', 'voice-agent-control.mjs', 'voice-agent-policy.mjs', 'voice-performance.mjs', 'voice-effort-probe.mjs', 'voice-catalog.mjs', 'voice-handoff.mjs', 'voice-handoff-compat.mjs', 'voice-ui-bridge.mjs', 'voice-turn-signals.mjs', 'voice-output.mjs', 'voice-tts.mjs', 'voice-tts-local.mjs', 'voice-tts-local-worker.mjs', 'voice-tts-install-intent.mjs', 'voice-runtime-archive.mjs', 'runtime-catalog.json', 'melo-catalog.json', 'voice-model-installer.mjs', 'voice-tts-edge-worker.mjs', 'vendor/edge-tts.cjs', 'vendor/edge-tts.NOTICES.txt', 'helper/tts_windows.ps1', 'helper/audio_devices.py', 'helper/audio_input_windows.py', 'helper/whale_audio_windows.cs', 'voice-audio-devices.mjs', 'voice-audio-device-contract.mjs', 'helper/model_compute.py', 'docs/setup-ui.md', 'ui/conversation-contract.mjs', 'ui/conversation-contract.LICENSE', 'ui/conversation-client.mjs', 'ui/conversation-remote.mjs', 'helper/voice_helper.py', 'helper/wake_pinyin.json.gz', 'helper/wake_pinyin.LICENSE', 'ui/host.mjs', 'lib/client.js', 'model-catalog.json', 'scripts/verify_model.py', 'docs/install-single-package.md', 'docs/package-name-migration.md']) assert.ok(files.has(file), file)
  for (const file of files) assert.ok(!/(?:^|\/)(?:node_modules|models|\.git|config\.json|voiceprints\.json)(?:\/|$)|\.(?:onnx|gguf|safetensors|wav|mp3|m4a|log|pyc)$/.test(file), file)
  for (const file of ['voice-whisper-asr.mjs', 'voice-whisper-assets.mjs', 'voice-whisper-worker.mjs', 'whisper-base-catalog.json', 'whisper-native-catalog.json', 'vendor/onnxruntime.LICENSE.txt', 'helper/whale_asr_wasm.py']) assert.ok(files.has(file), file)
  assert.ok(!files.has('ui/tests/fixtures/floating-layout.mjs'),'cross-plugin test fixture is not shipped as a second layout provider')
  for (const file of ['voice-wake-worker.mjs', 'wake-spotter-catalog.json', 'helper/wake_acoustic.py',
    'vendor/wake-spotter.LICENSE', 'helper/decode_windows.ps1', 'voice-update-service.mjs',
    'voice-update-semver.mjs', 'voice-operation-log.mjs', 'voice-operation-log-contract.mjs',
    'docs/plugin-updates.md']) assert.ok(files.has(file), file)
  assert.ok(![...files].some(file => file.endsWith('.wasm')), 'inference runtimes download separately')
  for (const retired of ['voice-config-assistant.mjs', 'voice-config-repairs.mjs', 'voice-config-repair-runtime.mjs']) {
    assert.ok(!files.has(retired), 'AI configuration assistant must be absent: ' + retired)
  }
  // rc.21 includes the tone dictionary, updater, and acoustic worker. Weights stay external.
  assert.ok(packed.size < 900 * 1024, `Packaged plugin exceeds 900 KiB: ${packed.size} bytes`)
})

test('legacy standalone UI keeps its own package and browser identity', async () => {
  const legacy = JSON.parse(await readFile(new URL('../ui/package.json', import.meta.url)))
  let registration
  vm.runInNewContext(await readFile(new URL('../ui/lib/client.js', import.meta.url), 'utf8'), { window: { __ModuleLoader__: { load(value) { registration = value } } } })
  assert.equal(legacy.name, 'dsh-whale-ear-ui')
  assert.equal(registration.id, legacy.name)
})


test('packed bundle imports in isolation with no node_modules and no dependency resolution', async t => {
  const disk = await mkdtemp(join(tmpdir(), 'whale isolated package-'))
  t.after(() => rm(disk, { recursive: true, force: true }))
  const { stdout } = await runNpm(['pack', '--ignore-scripts', '--json', '--pack-destination', disk, '--cache', join(disk, 'cache')], { cwd: root, maxBuffer: 2 * 1024 * 1024 })
  const [packed] = JSON.parse(stdout)
  const installed = join(disk, 'package')
  await mkdir(installed)
  const exec = promisify(execFile)
  await exec('tar', ['-xzf', join(disk, packed.filename), '--strip-components=1', '-C', installed])
  const script = `
    import assert from 'node:assert/strict'
    import { registerHooks, isBuiltin } from 'node:module'
    import { pathToFileURL } from 'node:url'
    import { join } from 'node:path'
    const base = pathToFileURL(process.cwd() + '/').href
    registerHooks({ resolve(specifier, context, next) {
      if (context.parentURL?.startsWith(base) && !isBuiltin(specifier)
        && !specifier.startsWith('.') && !specifier.startsWith('file:')) {
        throw new Error('Unexpected external runtime import: ' + specifier)
      }
      return next(specifier, context)
    } })
    const bundle = await import(pathToFileURL(join(process.cwd(), 'bundle.mjs')))
    assert.equal(bundle.name, 'dsh-fish-voice')
    assert.equal(typeof bundle.apply, 'function')
    const { conversationRemote } = await import(pathToFileURL(join(process.cwd(), 'ui/conversation-contract.mjs')))
    const volume = conversationRemote.descriptors.find(item => item.method === 'setVolume').parameters[1].codec.create()
    assert.equal(volume.safeParse({ revision: 0, volume: 0.5 }).success, true)
    assert.equal(volume.safeParse({ revision: 0, volume: 2 }).success, false)
    assert.equal(volume.safeParse({ revision: 0, volume: 0.5, secret: 'must-not-cross' }).success, false)
    assert.equal(globalThis.__dshWhaleEar__, undefined, 'importing must not activate audio')
  `
  await exec(process.execPath, ['--input-type=module', '--eval', script], { cwd: installed, timeout: 10000 })
})
