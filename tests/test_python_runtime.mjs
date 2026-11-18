/** Interpreter selection uses synthetic installs; one real stdlib-only probe. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { createPythonRuntimeResolver, pythonRequirements, pythonProbeEnvironment, discoverPythonCandidates, parsePythonLauncherPaths, PYTHON_PROBE, runPythonProbeProcess } from '../voice-python-runtime.mjs'

test('Managed SenseVoice uses stdlib on the default Windows endpoint and preserves optional feature requirements', () => {
  assert.deepEqual(pythonRequirements({ asr: 'sensevoice' }, 'win32'), [])
  assert.deepEqual(pythonRequirements({ asr: 'sensevoice', device: 1 }, 'win32'), ['sounddevice'])
  assert.deepEqual(pythonRequirements({ asr: 'sensevoice', speakerVerification: { enabled: true } }, 'win32'), ['numpy', 'sherpa_onnx'])
})

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'whale-python-binding-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const bindingPath = join(root, 'python-runtime.json'), calls = [], candidates = []
  const versions = new Map()
  const execute = async (executable, args, { signal }) => {
    signal?.throwIfAborted(); calls.push(executable)
    const value = versions.get(executable)
    if (!value) throw Object.assign(Error('not found'), { code: 'ENOENT' })
    const modules = JSON.parse(args[2])
    return { stdout: 'WHALE_PYTHON_PROBE=' + JSON.stringify({ schema: 1, executable, version: value.version, modules: Object.fromEntries(modules.map(name => [name, { available: !value.missing?.includes(name), error: 'synthetic import failure' }])) }) + '\n', stderr: '' }
  }
  const options = { bindingPath, execute, platform: 'linux', discover: async () => [...candidates] }
  return { root, bindingPath, versions, calls, candidates, options }
}

test('PATH drift from missing Python 3.13 dependencies chooses and persists verified 3.11', async t => {
  const f = fixture(t), newer = join(f.root, 'Python313', 'python.exe'), older = join(f.root, 'Python311', 'python.exe')
  f.candidates.push(newer, older)
  f.versions.set(newer, { version: '3.13.18', missing: ['numpy','sounddevice','sherpa_onnx','parselmouth','av'] })
  f.versions.set(older, { version: '3.11.9' })
  const selected = await createPythonRuntimeResolver(f.options).resolve({ pythonPath: 'python' })
  assert.equal(selected.executable, older)
  assert.deepEqual(f.calls, [newer, older])
  assert.equal(JSON.parse(readFileSync(f.bindingPath, 'utf8')).executable, older)
  // A new plugin instance validates the pinned executable before consulting a
  // changed PATH, even if the newer installation has become usable meanwhile.
  f.versions.set(newer, { version: '3.13.18' }); f.calls.length = 0
  const next = createPythonRuntimeResolver({ ...f.options, discover: () => { assert.fail('valid binding should win before discovery') } })
  assert.equal((await next.resolve({ pythonPath: 'python' })).executable, older)
  assert.deepEqual(f.calls, [older])
})

test('one Windows interpreter selects native SenseVoice when available and managed SenseVoice without native wheels', async t => {
  const f=fixture(t), python=join(f.root,'python')
  f.candidates.push(python)
  f.versions.set(python,{version:'3.11.9',missing:['numpy','sherpa_onnx','av','parselmouth']})
  const resolver=createPythonRuntimeResolver({...f.options,platform:'win32'})
  assert.equal((await resolver.resolve({asr:'sensevoice'})).senseVoiceBackend,'managed')
  f.versions.set(python,{version:'3.11.9'})
  assert.equal((await resolver.resolve({asr:'sensevoice'})).senseVoiceBackend,'native')
})

test('a deleted or newly broken binding is revalidated and safely rediscovered', async t => {
  const f = fixture(t), old = join(f.root, 'old-python'), next = join(f.root, 'new-python')
  writeFileSync(f.bindingPath, JSON.stringify({ schema: 1, requested: 'python', executable: old }))
  f.candidates.push(old, next); f.versions.set(next, { version: '3.12.1' })
  assert.equal((await createPythonRuntimeResolver(f.options).resolve({ pythonPath: 'python' })).executable, next)
  assert.deepEqual(f.calls, [old, next], 'duplicate candidates are not probed twice')
})

test('changing the configured interpreter invalidates the previous binding', async t => {
  const f = fixture(t), old = join(f.root, 'old'), explicit = join(f.root, 'explicit')
  writeFileSync(f.bindingPath, JSON.stringify({ schema: 1, requested: 'python', executable: old }))
  f.candidates.push(explicit); f.versions.set(explicit, { version: '3.11.9' })
  await createPythonRuntimeResolver(f.options).resolve({ pythonPath: explicit })
  assert.deepEqual(f.calls, [explicit])
})

test('backend and speaker settings select required imports without blocking optional features', async t => {
  assert.deepEqual(pythonRequirements({ asr: 'sensevoice' }, 'linux'), ['sounddevice'])
  assert.deepEqual(pythonRequirements({ asr: 'sensevoice', speakerVerification: { enabled: true } }, 'linux'), ['numpy','sounddevice','sherpa_onnx'])
  const f = fixture(t), python = join(f.root, 'python')
  f.candidates.push(python); f.versions.set(python, { version: '3.11.9', missing: ['parselmouth','av'] })
  const selected = await createPythonRuntimeResolver(f.options).resolve({ asr: 'sensevoice' })
  assert.deepEqual(selected.optionalMissing, ['parselmouth','av'])
})

test('missing required imports produce a specific diagnostic without persisting false readiness', async t => {
  const f = fixture(t), python = join(f.root, 'python')
  f.candidates.push(python); f.versions.set(python, { version: '3.13.18', missing: ['numpy','sounddevice'] })
  await assert.rejects(createPythonRuntimeResolver(f.options).resolve({speakerVerification:{enabled:true}}), error => error.code === 'VOICE_PYTHON_DEPENDENCIES' && /3.13.18.*numpy.*sounddevice.*尚未启动麦克风/.test(error.message))
  assert.equal(existsSync(f.bindingPath), false)
})

test('invalid probe output and an unwritable binding never yield a usable runtime', async t => {
  const f = fixture(t), python = join(f.root, 'python')
  f.candidates.push(python); f.versions.set(python, { version: '3.11.9' })
  await assert.rejects(createPythonRuntimeResolver({ ...f.options, execute: async () => ({ stdout: '{}', stderr: '' }) }).resolve({}), { code: 'VOICE_PYTHON_DEPENDENCIES' })
  mkdirSync(f.bindingPath)
  await assert.rejects(createPythonRuntimeResolver(f.options).resolve({}), { code: 'VOICE_PYTHON_BINDING_WRITE' })
})

test('explicit executables discover only that path and never silently fall back', async t => {
  const f = fixture(t), explicit = join(f.root, 'custom-python')
  assert.deepEqual(await discoverPythonCandidates(explicit, { env: { PATH: '/other' } }), [explicit])
  assert.deepEqual(await discoverPythonCandidates('missing-custom-python', { env: { PATH: f.root } }), [])
})

test('native PATH discovery finds installed candidates, ignores relative entries, and preserves order', async t => {
  const f = fixture(t), one = join(f.root, 'one'), two = join(f.root, 'two')
  mkdirSync(one); mkdirSync(two)
  const windows = process.platform === 'win32'
  const expected = windows ? [join(one,'python.exe'), join(two,'python.exe')]
    : [join(one,'python'), join(one,'python3.13'), join(two,'python3.11')]
  for (const path of expected) writeFileSync(path, 'synthetic')
  const values = await discoverPythonCandidates('python', { env: { PATH: [one,'relative',two].join(windows ? ';' : ':') } })
  assert.deepEqual(values, expected)
})

test('Windows launcher path parser retains spaces and excludes command flags/nonexecutables', () => {
  assert.deepEqual(parsePythonLauncherPaths(' -V:3.13 * C:\\Program Files\\Python313\\python.exe\r\n -3.11-64 C:\\Users\\Some User\\Python311\\python.exe\r\n fake C:\\evil.exe --install'), ['C:\\Program Files\\Python313\\python.exe','C:\\Users\\Some User\\Python311\\python.exe'])
})

test('neither launcher generation can inherit permission for automatic installation', () => {
  const env = pythonProbeEnvironment({ PATH: 'test', PYLAUNCHER_ALLOW_INSTALL: '0', PYLAUNCHER_ALWAYS_INSTALL: '1', PYTHON_MANAGER_AUTOMATIC_INSTALL: 'true' })
  assert.equal('PYLAUNCHER_ALLOW_INSTALL' in env, false)
  assert.equal('PYLAUNCHER_ALWAYS_INSTALL' in env, false)
  assert.equal(env.PYTHON_MANAGER_AUTOMATIC_INSTALL, 'false')
})

test('concurrent resolves share one probe and cancellation prevents persistence', async t => {
  const f = fixture(t), python = join(f.root, 'python'); f.candidates.push(python)
  let entered, release
  const started = new Promise(resolve => { entered = resolve })
  const resolver = createPythonRuntimeResolver({ ...f.options, execute: async (_path, _args, { signal }) => {
    entered(); return new Promise((resolve, reject) => { release = () => reject(signal.reason); signal.addEventListener('abort', release, { once: true }) })
  } })
  const one = resolver.resolve({}), two = resolver.resolve({})
  assert.equal(one, two)
  const rejected = assert.rejects(one, { code: 'VOICE_PYTHON_CANCELLED' })
  await started; await resolver.cancel(); await rejected
  assert.equal(existsSync(f.bindingPath), false)
})

test('real stdlib-only probe reports exact interpreter and import failures without recording', async () => {
  const python = process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3')
  const result = await runPythonProbeProcess(python, ['-c', PYTHON_PROBE, JSON.stringify(['json','whale_nonexistent_dependency_20261114'])])
  const value = JSON.parse(result.stdout.trim().slice('WHALE_PYTHON_PROBE='.length))
  assert.equal(value.modules.json.available, true)
  assert.equal(value.modules.whale_nonexistent_dependency_20261114.available, false)
  assert.match(value.modules.whale_nonexistent_dependency_20261114.error, /ModuleNotFoundError/)
  assert.ok(value.executable)
})

test('probe cancellation waits for close and never treats kill acceptance as exit', async () => {
  const abort = new AbortController(), child = new EventEmitter()
  child.stdout = new PassThrough(); child.stderr = new PassThrough()
  let killed = 0, settled = false
  child.kill = () => { killed++; return true }
  const pending = runPythonProbeProcess('synthetic', [], { signal: abort.signal, spawnProcess: () => child, closeTimeoutMs: 1000 })
  pending.catch(() => { settled = true })
  abort.abort(); await new Promise(resolve => setImmediate(resolve))
  assert.equal(killed, 1); assert.equal(settled, false)
  child.emit('close', null)
  await assert.rejects(pending, { code: 'VOICE_PYTHON_CANCELLED' })
})

test('an unconfirmed probe exit blocks future resolution in the same resolver', async t => {
  const f = fixture(t); f.candidates.push(join(f.root,'python'))
  let calls = 0
  const resolver = createPythonRuntimeResolver({ ...f.options, execute: async () => { calls++; throw Object.assign(Error('uncertain exit'), { code: 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED' }) } })
  await assert.rejects(resolver.resolve({}), { code: 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED' })
  await assert.rejects(resolver.resolve({}), { code: 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED' })
  await assert.rejects(resolver.cancel(), { code: 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED' })
  assert.equal(calls, 1)
})

test('probe timeout escalates an absent close receipt instead of hanging forever', async () => {
  const child = new EventEmitter(); child.stdout = new PassThrough(); child.stderr = new PassThrough(); child.kill = () => true
  await assert.rejects(runPythonProbeProcess('synthetic', [], { spawnProcess: () => child, timeoutMs: 5, closeTimeoutMs: 5 }), { code: 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED' })
})

test('spawn error still requires close, with a bounded failure when it never arrives', async () => {
  const child = new EventEmitter(); child.stdout = new PassThrough(); child.stderr = new PassThrough(); child.kill = () => false
  const pending = runPythonProbeProcess('synthetic', [], { spawnProcess: () => child, timeoutMs: 50, closeTimeoutMs: 5 })
  child.emit('error', Object.assign(Error('ENOENT synthetic'), { code: 'ENOENT' }))
  await assert.rejects(pending, { code: 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED' })
})


test('Windows native capture accepts ASR Python without sounddevice, including stable endpoints', async t => {
  const f = fixture(t), python = join(f.root, 'native-python')
  f.candidates.push(python); f.versions.set(python, { version: '3.11.9', missing: ['sounddevice'] })
  const resolver = createPythonRuntimeResolver({ ...f.options, platform: 'win32' })
  for (const device of [null, { backend: 'winmm', id: 'endpoint', name: 'Microphone' }]) {
    const selected = await resolver.resolve({ device, turnSignals: { enabled: true, headphonesConfirmed: true } })
    assert.equal(selected.executable, python)
    assert.equal(selected.required.includes('sounddevice'), false)
  }
})

test('legacy Windows capture and active legacy cues still require sounddevice', async t => {
  const f = fixture(t), python = join(f.root, 'legacy-python')
  f.candidates.push(python); f.versions.set(python, { version: '3.11.9', missing: ['sounddevice'] })
  const resolver = createPythonRuntimeResolver({ ...f.options, platform: 'win32' })
  for (const config of [
    { device: 0 }, { device: 'Microphone' },
    { turnSignals: { enabled: true, headphonesConfirmed: true, outputDevice: 0 } },
    { outputDevice: 'Speaker', turnSignals: { headphonesConfirmed: true } },
  ]) await assert.rejects(resolver.resolve(config), error => error.code === 'VOICE_PYTHON_DEPENDENCIES' && /sounddevice/.test(error.message))
  for (const config of [
    { turnSignals: { enabled: false, headphonesConfirmed: true, outputDevice: 0 } },
    { turnSignals: { headphonesConfirmed: false, outputDevice: 0 } },
    { outputDevice: null, turnSignals: { headphonesConfirmed: true, outputDevice: 0 } },
  ]) assert.equal(pythonRequirements(config, 'win32').includes('sounddevice'), false)
})

test('non-Windows capture requires sounddevice even with a stable device identity', async t => {
  const f = fixture(t), python = join(f.root, 'posix-python')
  f.candidates.push(python); f.versions.set(python, { version: '3.11.9', missing: ['sounddevice'] })
  for (const platform of ['linux', 'darwin']) {
    const resolver = createPythonRuntimeResolver({ ...f.options, platform })
    await assert.rejects(resolver.resolve({ device: { backend: 'portaudio', id: 'endpoint', name: 'Microphone' } }), error => error.code === 'VOICE_PYTHON_DEPENDENCIES' && /sounddevice/.test(error.message))
  }
})


test('read-only bound executable reuses only the matching persisted interpreter', t => {
  const f = fixture(t), python = join(f.root, 'bound-python')
  const resolver = createPythonRuntimeResolver({ ...f.options,
    execute: () => assert.fail('read-only lookup must not probe'),
    discover: () => assert.fail('read-only lookup must not discover') })
  assert.equal(resolver.boundExecutable({}), null)
  writeFileSync(f.bindingPath, JSON.stringify({ schema: 1, requested: 'python', executable: python }))
  assert.equal(resolver.boundExecutable({}), python)
  assert.equal(resolver.boundExecutable({ pythonPath: 'other-python' }), null)
  writeFileSync(f.bindingPath, JSON.stringify({ schema: 1, requested: 'python', executable: 'relative/python' }))
  assert.equal(resolver.boundExecutable({}), null)
  writeFileSync(f.bindingPath, 'broken JSON')
  assert.equal(resolver.boundExecutable({}), null)
})
