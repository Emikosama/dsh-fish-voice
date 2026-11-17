import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, readdirSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createVoiceConfigRepairs } from '../voice-config-repairs.mjs'

function fixture(t, options = {}) {
  const root = mkdtempSync(join(tmpdir(), 'whale-config-repairs-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const configPath = join(root, 'config.json')
  const bundledHelperPath = join(root, 'voice_helper.py')
  writeFileSync(bundledHelperPath, '# fixture helper\n')
  if (options.config !== undefined) writeFileSync(configPath, options.rawConfig ?? JSON.stringify(options.config))
  const api = createVoiceConfigRepairs({
    configPath,
    bundledHelperPath,
    verifyHealth: options.verifyHealth ?? (() => true),
    bundled: options.bundled ?? false,
    bundleComponents: options.bundleComponents,
    verifiedPythonPath: options.verifiedPythonPath ?? null,
    verifiedRoutes: options.verifiedRoutes ?? {},
    canWrite: options.canWrite,
    atomicWrite: options.atomicWrite,
  })
  const read = () => JSON.parse(readFileSync(configPath, 'utf8'))
  return { root, configPath, bundledHelperPath, api, read }
}

test('bundled mode ignores stale stored helperPath and keeps an absent config normal', async t => {
  const f = fixture(t, { bundled: true, config: { helperPath: 'Z:\\old-install\\voice_helper.py', custom: 'preserve' } })
  const report = await f.api.inspect()
  assert.match(report.revision, /^[a-f0-9]{64}$/)
  assert.deepEqual(report.repairs, [])
  assert.equal(report.blockers.some(item => item.phaseId === 'helper'), false)
  assert.equal(JSON.stringify(report).includes(f.configPath), false)
  assert.equal(f.read().helperPath, 'Z:\\old-install\\voice_helper.py')

  const missing = fixture(t)
  const empty = await missing.api.inspect()
  assert.match(empty.revision, /^[a-f0-9]{64}$/)
  assert.deepEqual(empty.blockers, [])
  assert.deepEqual(empty.repairs, [])
})

test('restores a missing configured helper atomically and preserves all unrelated config', async t => {
  const original = {
    helperPath: join(tmpdir(), 'nonexistent-whale-helper.py'),
    pythonPath: 'python',
    custom: { nested: ['keep', 9] },
    voiceSession: { visibility: 'hidden', enabled: false },
    tts: { provider: 'off', edgeTextTransmissionAccepted: false },
  }
  let checked = null
  const f = fixture(t, { config: original, verifyHealth: async value => { checked = value; return { healthy: true } } })
  const report = await f.api.inspect({ failure: { phaseId: 'helper', reasonId: 'configured_helper_missing' } })
  assert.deepEqual(report.repairs.map(item => item.id), ['restore_bundled_helper_path'])
  assert.deepEqual(report.blockers, [])
  assert.equal(JSON.stringify(report).includes(f.bundledHelperPath), false)
  const result = await f.api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision })
  assert.equal(result.ok, true)
  assert.equal(checked.repairId, 'restore_bundled_helper_path')
  assert.equal(checked.config.helperPath, f.bundledHelperPath)
  const actual = f.read()
  assert.equal(actual.helperPath, f.bundledHelperPath)
  assert.deepEqual({ ...actual, helperPath: original.helperPath }, original)
  assert.deepEqual(readdirSync(f.root).sort(), ['config.json', 'voice_helper.py'])
})

test('stale revision refuses the repair and preserves the newer human edit', async t => {
  const original = { helperPath: join(tmpdir(), 'missing-helper-stale.py'), retained: 'before' }
  let healthCalls = 0
  const f = fixture(t, { config: original, verifyHealth: () => { healthCalls++; return true } })
  const report = await f.api.inspect({ failure: { phaseId: 'helper', reasonId: 'configured_helper_missing' } })
  const newer = { ...original, retained: 'human edit' }
  writeFileSync(f.configPath, JSON.stringify(newer))
  const result = await f.api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision })
  assert.equal(result.ok, false)
  assert.equal(result.reasonId, 'stale_config')
  assert.deepEqual(f.read(), newer)
  assert.equal(healthCalls, 0)
})

test('rejects model-supplied paths and unknown actions without changing config', async t => {
  const original = { helperPath: join(tmpdir(), 'missing-helper-forgery.py'), retained: true }
  const f = fixture(t, { config: original })
  const report = await f.api.inspect({ failure: { phaseId: 'helper', reasonId: 'configured_helper_missing' } })
  const before = readFileSync(f.configPath)
  const forged = await f.api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision, path: 'C:\\model-choice.py' })
  const unknown = await f.api.apply({ repairId: 'write_arbitrary_path', expectedRevision: report.revision })
  assert.equal(forged.ok, false)
  assert.equal(unknown.ok, false)
  assert.deepEqual(readFileSync(f.configPath), before)
})

test('permission failure is explicit and never reports success or probes health', async t => {
  const original = { helperPath: join(tmpdir(), 'missing-helper-permission.py'), retained: 'keep' }
  let healthCalls = 0
  let writeTarget = null
  const f = fixture(t, {
    config: original,
    verifyHealth: () => { healthCalls++; return true },
    atomicWrite: (path, _nextBytes, expectedBytes) => {
      writeTarget = path
      assert.deepEqual(readFileSync(path), expectedBytes)
      throw Object.assign(new Error('permission denied'), { code: 'EACCES' })
    },
  })
  const report = await f.api.inspect({ failure: { phaseId: 'helper', reasonId: 'configured_helper_missing' } })
  const result = await f.api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision })
  assert.equal(result.ok, false)
  assert.equal(result.reasonId, 'config_write_denied')
  assert.equal(writeTarget, f.configPath)
  assert.deepEqual(f.read(), original)
  assert.equal(healthCalls, 0)
})

test('requires a stopped runtime and honors cancellation immediately before writing', async t => {
  const original = { helperPath: join(tmpdir(), 'missing-helper-running.py') }
  let writes = 0
  const f = fixture(t, {
    config: original,
    canWrite: () => false,
    atomicWrite: () => { writes++ },
  })
  const report = await f.api.inspect({ failure: { phaseId: 'helper', reasonId: 'configured_helper_missing' } })
  const refused = await f.api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision })
  assert.equal(refused.reasonId, 'runtime_not_stopped')
  assert.equal(writes, 0)
  assert.deepEqual(f.read(), original)

  const f2 = fixture(t, { config: original, atomicWrite: () => { writes++ } })
  const report2 = await f2.api.inspect({ failure: { phaseId: 'helper', reasonId: 'configured_helper_missing' } })
  const controller = new AbortController(); controller.abort()
  const cancelled = await f2.api.apply({ repairId: report2.repairs[0].id, expectedRevision: report2.revision }, controller.signal)
  assert.equal(cancelled.reasonId, 'repair_cancelled')
  assert.equal(writes, 0)
  assert.deepEqual(f2.read(), original)
})

test('corrupt JSON is nonrepairable and remains byte-for-byte intact', async t => {
  const f = fixture(t, { config: { retained: true } })
  const corrupt = '{"helperPath": '
  writeFileSync(f.configPath, corrupt)
  const report = await f.api.inspect({ failure: { phaseId: 'helper', reasonId: 'configured_helper_missing' } })
  assert.match(report.revision, /^[a-f0-9]{64}$/)
  assert.deepEqual(report.repairs, [])
  assert.equal(report.blockers.some(item => item.reasonId === 'invalid_json'), true)
  const result = await f.api.apply({ repairId: 'restore_bundled_helper_path', expectedRevision: report.revision })
  assert.equal(result.reasonId, 'invalid_json')
  assert.equal(readFileSync(f.configPath, 'utf8'), corrupt)
})

test('failed corrected-health probe rolls back only when the repair bytes are still current', async t => {
  const original = { helperPath: join(tmpdir(), 'missing-helper-health.py'), keep: 1 }
  const rawOriginal = `${JSON.stringify(original)}\n`
  const f = fixture(t, { config: original, rawConfig: rawOriginal, verifyHealth: () => false })
  const report = await f.api.inspect({ failure: { phaseId: 'helper', reasonId: 'configured_helper_missing' } })
  const result = await f.api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision })
  assert.equal(result.ok, false)
  assert.equal(result.reasonId, 'post_repair_probe_failed')
  assert.equal(result.rolledBack, true)
  assert.equal(readFileSync(f.configPath, 'utf8'), rawOriginal)
})

test('uses only an app-verified Python candidate and never returns its path', async t => {
  const f = fixture(t, { config: { pythonPath: join(tmpdir(), 'missing-python.exe'), retained: 5 } })
  const candidate = join(f.root, 'verified-python.exe')
  writeFileSync(candidate, 'verified fixture')
  let getterCalls = 0
  const api = createVoiceConfigRepairs({
    configPath: f.configPath,
    bundledHelperPath: f.bundledHelperPath,
    verifyHealth: ({ config, signal }) => { assert.equal(config.pythonPath, candidate); assert.equal(signal?.aborted, false); return true },
    verifiedPythonPath: async () => { getterCalls++; return candidate },
  })
  const report = await api.inspect({ failure: { phaseId: 'python', reasonId: 'explicit_python_binding_invalid' } })
  assert.deepEqual(report.repairs.map(item => item.id), ['select_verified_python_binding'])
  assert.equal(JSON.stringify(report).includes(candidate), false)
  const result = await api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision }, new AbortController().signal)
  assert.equal(result.ok, true)
  assert.equal(getterCalls, 1, 'apply reuses only the core-held candidate from the inspected revision')
  assert.equal(f.read().pythonPath, candidate)
})

test('ASR repair requires exactly one verified route with an existing configured model directory', async t => {
  const f = fixture(t, { config: { asr: 'broken-route', models: {} } })
  const sense = join(f.root, 'sensevoice'); const whisper = join(f.root, 'whisper')
  mkdirSync(sense); mkdirSync(whisper)
  const config = { ...f.read(), models: { sensevoiceDir: sense, whisper } }
  writeFileSync(f.configPath, JSON.stringify(config))
  let evidenceCalls = 0
  const api = createVoiceConfigRepairs({
    configPath: f.configPath,
    bundledHelperPath: f.bundledHelperPath,
    verifyHealth: ({ config: current }) => current.asr === 'sensevoice',
    verifiedRoutes: current => { evidenceCalls++; assert.equal(current.asr, 'broken-route'); return { asr: ['sensevoice'] } },
  })
  const report = await api.inspect()
  assert.deepEqual(report.repairs.map(item => item.id), ['select_existing_asr_route'])
  assert.equal(JSON.stringify(report).includes(sense), false)
  const result = await api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision })
  assert.equal(result.ok, true)
  assert.equal(f.read().asr, 'sensevoice')
  assert.deepEqual(f.read().models, { sensevoiceDir: sense, whisper })
  assert.equal(evidenceCalls, 2, 'route evidence is refreshed against the same CAS-fenced config')

  const ambiguous = fixture(t, { config: { asr: 'broken-route', models: { sensevoiceDir: sense, whisper } }, verifiedRoutes: { asr: ['sensevoice', 'whisper'] } })
  const ambiguousReport = await ambiguous.api.inspect()
  assert.deepEqual(ambiguousReport.repairs, [])
  assert.equal(ambiguousReport.blockers.some(item => item.reasonId === 'invalid_asr_route'), true)
})

test('TTS repair selects only a verified local route and preserves consent/privacy settings', async t => {
  const f = fixture(t, { config: { tts: { provider: 'not-a-route', localModelId: 'local-model', localModelPath: null, edgeTextTransmissionAccepted: false }, voiceSession: { visibility: 'hidden' }, privateSetting: 'keep' } })
  const modelPath = join(f.root, 'local-tts')
  mkdirSync(modelPath)
  const current = f.read()
  current.tts.localModelPath = modelPath
  writeFileSync(f.configPath, JSON.stringify(current))
  let received = null
  const api = createVoiceConfigRepairs({
    configPath: f.configPath,
    bundledHelperPath: f.bundledHelperPath,
    verifyHealth: value => { received = value; return true },
    verifiedRoutes: config => ({ tts: config.tts.localModelPath === modelPath ? ['local', 'edge'] : ['edge'] }),
  })
  const report = await api.inspect()
  assert.deepEqual(report.repairs.map(item => item.id), ['select_verified_local_tts_route'])
  assert.equal(JSON.stringify(report).includes(modelPath), false)
  const result = await api.apply({ repairId: report.repairs[0].id, expectedRevision: report.revision })
  assert.equal(result.ok, true)
  assert.equal(received.config.tts.provider, 'local')
  assert.equal(received.config.tts.edgeTextTransmissionAccepted, false)
  assert.deepEqual(f.read().voiceSession, { visibility: 'hidden' })
  assert.equal(f.read().privateSetting, 'keep')

  const consent = fixture(t, { config: { tts: { provider: 'edge', edgeTextTransmissionAccepted: false } }, verifiedRoutes: { tts: ['local'] } })
  const consentReport = await consent.api.inspect({ failure: { phaseId: 'tts', reasonId: 'invalid_tts_route' } })
  assert.deepEqual(consentReport.repairs, [])
  assert.equal(consentReport.blockers.length, 0, 'the separate Edge consent setup owns this state')
  assert.deepEqual(consentReport.diagnostics, [])
})

test('missing shipped component is a full-package-reinstall blocker, never a repair action', async t => {
  const f = fixture(t, { bundled: true, config: { helperPath: 'Z:\\old\\missing.py' } })
  const missing = join(f.root, 'missing-client.mjs')
  const client = join(f.root, 'client.mjs'); writeFileSync(client, '/* client */')
  const api = createVoiceConfigRepairs({
    configPath: f.configPath,
    bundledHelperPath: f.bundledHelperPath,
    bundled: true,
    bundleComponents: { browser_client: client, pcm_windows_player: missing },
    verifyHealth: () => true,
  })
  const report = await api.inspect()
  assert.deepEqual(report.repairs, [])
  assert.equal(report.blockers.some(item => item.reasonId === 'bundled_component_missing' && item.resolutionId === 'full_package_reinstall' && item.componentId === 'pcm_windows_player'), true)
  assert.equal(JSON.stringify(report).includes(missing), false)
})

test('absent ASR/TTS keys inherit healthy defaults and do not produce a repair prompt', async t => {
  const f = fixture(t, { config: { helperPath: null, pythonPath: null, unrelated: true } })
  const report = await f.api.inspect()
  assert.deepEqual(report.repairs, [])
  assert.deepEqual(report.blockers, [])
})
