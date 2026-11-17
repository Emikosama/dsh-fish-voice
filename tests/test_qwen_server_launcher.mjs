import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { readFile, writeFile, mkdtemp, rm, stat } from 'node:fs/promises'
import { tmpdir, availableParallelism } from 'node:os'
import { join } from 'node:path'
import { createVerifiedQwenServerLauncher } from '../voice-qwen-server.mjs'
import { validRuntimeManifest, extractRuntimeArchive } from '../voice-runtime-archive.mjs'
const catalog = JSON.parse(await readFile(new URL('../qwen-server-catalog.json', import.meta.url))).servers
const cpu = Object.values(catalog).find(r => r.platform === process.platform && r.backend === 'cpu')
const gpu = Object.values(catalog).find(r => r.platform === process.platform && r.backend === 'vulkan')
const root = await mkdtemp(join(tmpdir(), 'whale-server-tests-'))
const model = join(root, 'model.gguf'), mmproj = join(root, 'mmproj.gguf')
await writeFile(model, 'verified model fixture'); await writeFile(mmproj, 'verified mmproj fixture')
const descriptor = { archivePath: model, runtimeId: cpu.sha256, model, mmproj, backend: 'cpu' }
const apiKey = '0123456789abcdef'.repeat(4)
const ready = child => child.stderr.write('srv init: model loaded\nsrv on_listening: listening on http://127.0.0.1:43210\n')
function fake(mode = ready, killClose = true) {
 let child, options, args, executable, kills = 0
 return {
  spawn(exe, argv, opts) { executable = exe; args = argv; options = opts; child = new EventEmitter(); child.pid = 123456; child.stdout = new PassThrough(); child.stderr = new PassThrough(); child.kill = () => { kills++; if (killClose) setTimeout(() => child.emit('close', null, 'SIGKILL'), 20); return true }; setImmediate(() => mode(child)); return child },
  get child() { return child }, get options() { return options }, get args() { return args }, get executable() { return executable }, get kills() { return kills },
 }
}
const launch = (f, opts = {}, desc = descriptor) => createVerifiedQwenServerLauncher({ resolveDescriptor: async () => desc, spawn: f.spawn, extractArchive: async (archive, directory, runtime) => { await writeFile(join(directory, runtime.executable), 'test-owned child fixture') }, startupTimeoutMs: 2000, stopTimeoutMs: 100, ...opts })
test.after(async () => rm(root, { recursive: true, force: true }))
test('supplemental manifests allow only exact server executable names', () => {
 for (const r of Object.values(catalog)) { assert.ok(validRuntimeManifest(r)); assert.ok(r.entries.some(e => /server-impl/.test(e.file))) }
 const r = structuredClone(cpu); r.entries.at(-2).file = r.executable = 'arbitrary'; assert.equal(validRuntimeManifest(r), false)
 const unsafe = structuredClone(cpu); unsafe.entries[0].entry = '../unsafe'; assert.equal(validRuntimeManifest(unsafe), false)
})
test('owned loaded/listening spawn uses port zero, private env, no key argv; stop awaits close and cleans', async () => {
 const f = fake(); process.env.LLAMA_ARG_MODEL = 'hostile'; process.env.OPENAI_API_KEY = 'host-secret'
 const server = await launch(f)({ apiKey }); assert.equal(server.port, 43210)
 assert.deepEqual(server.compute, { backend: 'cpu', gpuLayers: 0, gpuOffloadConfirmed: false })
 assert.equal(f.args[f.args.indexOf('--port') + 1], '0'); assert.equal(f.args[f.args.indexOf('-t') + 1], String(Math.min(4, availableParallelism()))); assert.equal(f.options.shell, false)
 assert.equal(f.options.env.LLAMA_API_KEY, apiKey); assert.equal(f.options.env.LLAMA_ARG_MODEL, undefined); assert.equal(f.options.env.OPENAI_API_KEY, undefined)
 assert.ok(!f.args.includes(apiKey)); assert.equal(server.status().running, true)
 let done = false; const stopping = server.stop().then(() => { done = true }); await new Promise(r => setTimeout(r, 5)); assert.equal(done, false)
 await stopping; await server.stop(); assert.equal(f.kills, 1); assert.equal(server.status().closed, true)
 await assert.rejects(stat(f.options.cwd), { code: 'ENOENT' })
})
test('listening alone does not resolve startup; split bounded diagnostics parse only actual numeric offload', async () => {
 const f = fake(c => { c.stdout.write('x'.repeat(20000) + '\nprivate driver/model path\n'); c.stderr.write('offloaded 17/28 layers to GPU\nsrv listening on http://127.0.0.1:43210\n'); setTimeout(() => c.stderr.write('srv model loa'), 10); setTimeout(() => c.stderr.write('ded\n'), 20) })
 const d = { ...descriptor, backend: 'vulkan', device: 'Vulkan0', runtimeId: gpu.sha256, archivePath: model }
 const s = await launch(f, {}, d)({ apiKey }); assert.equal(s.compute.gpuLayers, 17); assert.equal(s.compute.gpuOffloadConfirmed, true); assert.ok(!JSON.stringify(s).includes('private')); await s.stop()
})
test('GPU flags without positive offload evidence never prove GPU use', async () => {
 const f = fake(c => { c.stderr.write('offloaded 0/28 layers to GPU\noffloaded 999/28 layers to GPU\n'); ready(c) })
 const d = { ...descriptor, backend: 'vulkan', device: 'Vulkan0', runtimeId: gpu.sha256, archivePath: model }
 await assert.rejects(launch(f, {}, d)({ apiKey }), { code: 'TTS_GPU_OFFLOAD_UNCONFIRMED', startupClosed: true }); assert.equal(f.kills, 1)
})
test('timeout kills owned child and waits for close before rejection', async () => {
 const f = fake(() => {}); await assert.rejects(launch(f, { startupTimeoutMs: 1200 })({ apiKey }), { code: 'TTS_TIMEOUT', startupClosed: true }); assert.equal(f.kills, 1); await assert.rejects(stat(f.options.cwd), { code: 'ENOENT' })
})
test('abort during startup drains and closes before cleanup', async () => {
 const ac = new AbortController(); const f = fake(() => ac.abort()); await assert.rejects(launch(f)({ apiKey, signal: ac.signal }), error => error.code === 'TTS_CANCELLED' && error.startupClosed === undefined); assert.equal(f.kills, 1); await assert.rejects(stat(f.options.cwd), { code: 'ENOENT' })
})
test('spawn error with PID requires close; private errors are sanitized', async () => {
 const f = fake(c => c.emit('error', new Error(apiKey + '/private/model'))); await assert.rejects(launch(f)({ apiKey }), e => e.code === 'TTS_PROCESS_START_FAILED' && e.startupClosed === true && !e.message.includes(apiKey)); assert.equal(f.kills, 1)
})
test('uncertain stop poisons launcher and preserves temporary files even after late close', async () => {
 const f = fake(ready, false); const start = launch(f); const s = await start({ apiKey }); await assert.rejects(s.stop(), { code: 'TTS_PROCESS_STOP_UNCONFIRMED', uncertain: true }); assert.equal(s.status().uncertain, true)
 assert.ok((await stat(f.executable)).isFile()); await assert.rejects(start({ apiKey }), { uncertain: true }); f.child.emit('close'); assert.ok((await stat(f.executable)).isFile()); await rm(f.options.cwd, { recursive: true, force: true })
})
test('uncertain spawn failure also preserves and poisons rather than retrying', async () => {
 const f = fake(c => c.emit('error', new Error('secret')), false); const start = launch(f); await assert.rejects(start({ apiKey }), { uncertain: true }); assert.ok((await stat(f.executable)).isFile()); await assert.rejects(start({ apiKey }), { uncertain: true }); f.child.emit('close'); await rm(f.options.cwd, { recursive: true, force: true })
})
test('pre-abort and unknown runtime cannot spawn; concurrent launch cannot steal child', async () => {
 const f = fake(); await assert.rejects(launch(f)({ apiKey, signal: AbortSignal.abort() }), error => error.code === 'TTS_CANCELLED' && error.startupClosed === undefined); assert.equal(f.child, undefined)
 await assert.rejects(launch(f, {}, { ...descriptor, runtimeId: '0'.repeat(64) })({ apiKey }), error => error.code === 'TTS_INVALID_RUNTIME' && error.startupClosed === undefined); assert.equal(f.child, undefined)
 const start = launch(f); const pending = start({ apiKey }); await assert.rejects(start({ apiKey }), { code: 'TTS_BUSY' }); const s = await pending; await s.stop()
})
test('tampered installed archive cannot produce an executable or spawn', async () => {
 const archivePath = join(root, cpu.file); await writeFile(archivePath, 'bad'); const f = fake(); await assert.rejects(launch(f, { extractArchive: extractRuntimeArchive }, { ...descriptor, archivePath })({ apiKey }), { code: 'INVALID_RUNTIME_ARCHIVE' }); assert.equal(f.child, undefined)
})
test('unexpected close is reflected in passive status', async () => {
 const f = fake(); const s = await launch(f)({ apiKey }); f.child.emit('close', 1); assert.deepEqual(s.status(), { running: false, closed: true, uncertain: false }); await s.stop(); assert.equal(f.kills, 0)
})

test('synchronous spawn failure cleans owned temp and does not expose source error', async () => {
 let directory
 const start = launch(fake(), {spawn: (exe, args, options) => { directory = options.cwd; throw new Error(apiKey + '/private') }})
 await assert.rejects(start({apiKey}), e => e.code === 'TTS_PROCESS_START_FAILED' && e.startupClosed === true && !e.message.includes(apiKey))
 await assert.rejects(stat(directory), {code:'ENOENT'})
})
test('missing child stdio during setup still observes close rejection and awaits cleanup', async () => {
 const f = fake(() => {})
 const start = launch(f, {spawn: (...args) => { const child = f.spawn(...args); child.stdout = null; return child }})
 await assert.rejects(start({apiKey}), {code:'TTS_PROCESS_START_FAILED',startupClosed:true})
 assert.equal(f.kills, 1); await assert.rejects(stat(f.options.cwd), {code:'ENOENT'})
})
