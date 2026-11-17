import test from 'node:test'
import assert from 'node:assert/strict'
import { createVoiceConfigAssistant, VOICE_CONFIG_ACTION_IDS } from '../voice-config-assistant.mjs'

const NOW = 10_000
const REV_A = 'a'.repeat(64)
const REV_B = 'b'.repeat(64)
const FAILURE = { status: 'failed', operation: 'enable', failureId: 'failure-1', failedAt: NOW }
const ALL_REPAIRS = [
  { id: 'restore_bundled_helper_path', phaseId: 'helper', reasonId: 'configured_helper_missing' },
  { id: 'select_verified_python_binding', phaseId: 'python', reasonId: 'python_probe_failed' },
  { id: 'select_existing_asr_route', phaseId: 'asr', reasonId: 'invalid_asr_route' },
  { id: 'select_verified_local_tts_route', phaseId: 'tts', reasonId: 'invalid_tts_route' },
]

function present({ revision = REV_A, repairs = [ALL_REPAIRS[0]], blockers = [], incidentId = 'incident-1', title = '严重配置问题', summary = '配置检查失败。' } = {}) {
  return {
    schema: 1,
    status: 'present',
    observedAt: NOW,
    revision,
    incident: { id: incidentId, severity: 'severe', title, summary },
    repairs,
    blockers,
  }
}

function absent(revision = REV_A) {
  return { schema: 1, status: 'absent', observedAt: NOW, revision, incident: null, repairs: [], blockers: [] }
}

function applied(repairId, revision = REV_B) {
  return { schema: 1, ok: true, repairId, revision }
}

function failure(operation = 'enable', failedAt = NOW) {
  return { ...FAILURE, operation, failedAt }
}

function assistant(t, options = {}) {
  const events = []
  const controller = createVoiceConfigAssistant({ now: () => NOW, emit: event => events.push(event), ...options })
  t.after(() => controller.dispose())
  return { controller, events }
}

test('offers require a recent actual failed read or enable and a current severe incident', async t => {
  let diagnoses = 0
  const f = assistant(t, { diagnose: async () => { diagnoses += 1; return present() }, decide: async () => ({ repairId: null }), apply: async () => assert.fail('must not apply') })
  assert.equal(await f.controller.offer(failure('save-audio-device')), null)
  assert.equal(await f.controller.offer({ ...failure(), status: 'succeeded' }), null)
  assert.equal(await f.controller.offer(failure('enable', NOW - 30_001)), null)
  assert.equal(diagnoses, 0)

  const offer = await f.controller.offer(FAILURE)
  assert.ok(offer?.id)
  assert.equal(offer.repairs[0].id, 'restore_bundled_helper_path')
  assert.deepEqual(VOICE_CONFIG_ACTION_IDS, ALL_REPAIRS.map(repair => repair.id))
  assert.equal(diagnoses, 1)
})

test('admission is limited to actual trusted host operations', async t => {
  let diagnoses = 0
  const f = assistant(t, {
    diagnose: async () => { diagnoses += 1; return present() },
    decide: async () => ({ repairId: null }),
    apply: async () => assert.fail('must not apply'),
  })
  for (const [index, operation] of ['read-settings', 'enable', 'new', 'resume', 'save-settings', 'save-models', 'save-tts', 'complete-setup', 'preview-tts'].entries()) {
    const result = await f.controller.offer({ ...failure(operation), failureId: `failure-${index}` })
    assert.ok(result?.id, operation)
  }
  assert.equal(diagnoses, 9)
  assert.equal(await f.controller.offer(failure('inspect-tts')), null)
  assert.equal(diagnoses, 9)
})

test('explicit consent is required; the one-use offer rechecks and applies only the exact listed repair', async t => {
  const snapshots = [present(), present(), present(), absent(REV_B)]
  const calls = { decide: [], apply: [], phases: [] }
  const f = assistant(t, {
    diagnose: async ({ phase }) => { calls.phases.push(phase); return snapshots.shift() },
    decide: async (snapshot, options) => {
      calls.decide.push({ snapshot, options })
      return { repairId: 'restore_bundled_helper_path' }
    },
    apply: async (repair, before, signal) => {
      calls.apply.push({ repair, before, signal })
      return applied(repair.id, REV_B)
    },
  })
  const offer = await f.controller.offer(FAILURE)
  assert.equal((await f.controller.start({ id: offer.id, confirmed: false })).state, 'offered')
  assert.equal(calls.apply.length, 0)
  assert.equal(calls.decide.length, 0)

  const result = await f.controller.start({ id: offer.id, confirmed: true })
  assert.equal(result.state, 'completed')
  assert.equal(calls.apply.length, 1)
  assert.deepEqual(calls.apply[0].repair, ALL_REPAIRS[0])
  assert.equal(calls.apply[0].before.revision, REV_A)
  assert.equal(calls.apply[0].signal.aborted, false)
  assert.deepEqual(calls.phases, ['offer', 'round', 'before-write', 'verify'])
  assert.deepEqual(calls.decide[0].options, {
    round: 1,
    maxRounds: 3,
    repairs: [ALL_REPAIRS[0]],
    prior: [],
  })
  assert.equal((await f.controller.start({ id: offer.id, confirmed: true })).state, 'stale')
  assert.equal(calls.apply.length, 1)
})

test('changed revision before the write stops without applying', async t => {
  const snapshots = [present(), present(), present({ revision: REV_B })]
  let applyCalls = 0
  const f = assistant(t, {
    diagnose: async () => snapshots.shift(),
    decide: async () => ({ repairId: 'restore_bundled_helper_path' }),
    apply: async () => { applyCalls += 1; return applied('restore_bundled_helper_path') },
  })
  const offer = await f.controller.offer(FAILURE)
  const result = await f.controller.start({ id: offer.id, confirmed: true })
  assert.equal(result.state, 'stale')
  assert.equal(applyCalls, 0)
})

test('a verified repair may expose the next severe blocker at the new revision', async t => {
  const asr = ALL_REPAIRS[2]
  const snapshots = [
    present({ repairs: [ALL_REPAIRS[0], asr], incidentId: 'configured_helper_missing' }),
    present({ repairs: [ALL_REPAIRS[0], asr], incidentId: 'configured_helper_missing' }),
    present({ repairs: [ALL_REPAIRS[0], asr], incidentId: 'configured_helper_missing' }),
    present({ revision: REV_B, repairs: [asr], incidentId: 'invalid_asr_route' }),
    present({ revision: REV_B, repairs: [asr], incidentId: 'invalid_asr_route' }),
    present({ revision: REV_B, repairs: [asr], incidentId: 'invalid_asr_route' }),
    absent('c'.repeat(64)),
  ]
  const chosen = []
  const f = assistant(t, {
    diagnose: async () => snapshots.shift(),
    decide: async (_snapshot, options) => {
      const repairId = options.repairs[0].id
      chosen.push(repairId)
      return { repairId }
    },
    apply: async repair => applied(repair.id, repair.id === ALL_REPAIRS[0].id ? REV_B : 'c'.repeat(64)),
  })
  const offer = await f.controller.offer(FAILURE)
  const result = await f.controller.start({ id: offer.id, confirmed: true })
  assert.equal(result.state, 'completed')
  assert.deepEqual(chosen, [ALL_REPAIRS[0].id, asr.id])
})

test('model output cannot select an action outside the current trusted repair list', async t => {
  let applyCalls = 0
  const f = assistant(t, {
    diagnose: async () => present(),
    decide: async () => ({ repairId: 'run-shell-command', feedback: 'try this' }),
    apply: async () => { applyCalls += 1; return applied('restore_bundled_helper_path') },
  })
  const offer = await f.controller.offer(FAILURE)
  const result = await f.controller.start({ id: offer.id, confirmed: true })
  assert.equal(result.state, 'needs-feedback')
  assert.equal(applyCalls, 0)
})

test('diagnostics and repair events redact paths, links, and secret-like values', async t => {
  const f = assistant(t, {
    diagnose: async () => present({ title: 'Bad C:\\private\\cfg.json', summary: 'api_key=abc https://private.example/a' }),
    decide: async () => ({ repairId: null }),
    apply: async () => assert.fail('must not apply'),
  })
  const offer = await f.controller.offer(FAILURE)
  const rendered = JSON.stringify({ offer, events: f.events })
  assert.equal(rendered.includes('C:\\private'), false)
  assert.equal(rendered.includes('api_key=abc'), false)
  assert.equal(rendered.includes('https://private'), false)
})

test('three rounds is the hard limit and prior history contains only repair IDs and status', async t => {
  const decisions = [], applications = []
  const f = assistant(t, {
    diagnose: async () => present({ repairs: ALL_REPAIRS }),
    decide: async (_snapshot, options) => {
      decisions.push(options)
      return { repairId: options.repairs[0].id }
    },
    apply: async (repair, before) => {
      applications.push({ repair, revision: before.revision })
      return { schema: 1, ok: false, phaseId: 'config', reasonId: 'repair_no_longer_applicable', revision: before.revision }
    },
  })
  const offer = await f.controller.offer(FAILURE)
  const result = await f.controller.start({ id: offer.id, confirmed: true })
  assert.equal(result.state, 'needs-feedback')
  assert.equal(result.round, 3)
  assert.equal(decisions.length, 3)
  assert.equal(applications.length, 3)
  assert.deepEqual(decisions[1].prior, [{ repairId: applications[0].repair.id, status: 'unchanged' }])
  assert.deepEqual(decisions[2].prior, [
    { repairId: applications[0].repair.id, status: 'unchanged' },
    { repairId: applications[1].repair.id, status: 'unchanged' },
  ])
  assert.equal(decisions.some(options => options.prior.some(entry => 'summary' in entry || 'path' in entry)), false)
})

test('missing bundled components route to the human package manager and never call the model', async t => {
  let decisionCalls = 0, applyCalls = 0
  const f = assistant(t, {
    diagnose: async () => present({
      repairs: [],
      blockers: [{ phaseId: 'helper', reasonId: 'bundled_component_missing', componentId: 'voice_helper', resolutionId: 'full_package_reinstall' }],
    }),
    decide: async () => { decisionCalls += 1; return { repairId: null } },
    apply: async () => { applyCalls += 1 },
  })
  const offer = await f.controller.offer(FAILURE)
  assert.equal(offer.recovery, 'manual-package-manager')
  assert.equal(offer.repairs.length, 0)
  const result = await f.controller.start({ id: offer.id, confirmed: true })
  assert.equal(result.state, 'needs-manual')
  assert.equal(result.recovery, 'manual-package-manager')
  assert.equal(decisionCalls, 0)
  assert.equal(applyCalls, 0)
})

test('invalid config JSON permits feedback only and never invokes a repair model', async t => {
  let decisionCalls = 0, applyCalls = 0
  const f = assistant(t, {
    diagnose: async () => present({ repairs: [], blockers: [{ phaseId: 'config', reasonId: 'invalid_json' }] }),
    decide: async () => { decisionCalls += 1; return { repairId: null } },
    apply: async () => { applyCalls += 1 },
  })
  const offer = await f.controller.offer(failure('read-settings'))
  assert.equal(offer.recovery, 'feedback')
  assert.equal((await f.controller.start({ id: offer.id, confirmed: true })).state, 'needs-feedback')
  assert.equal(decisionCalls, 0)
  assert.equal(applyCalls, 0)
})

test('stop aborts a pending decision and prevents the subsequent write', async t => {
  let applyCalls = 0
  let sawAbort = false
  const f = assistant(t, {
    diagnose: async () => present(),
    decide: async (_snapshot, _options, signal) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => { sawAbort = true; reject(signal.reason) }, { once: true })
    }),
    apply: async () => { applyCalls += 1; return applied('restore_bundled_helper_path') },
  })
  const offer = await f.controller.offer(FAILURE)
  const running = f.controller.start({ id: offer.id, confirmed: true })
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(f.controller.stop().stage, 'stop-requested')
  const result = await running
  assert.equal(result.state, 'stopped')
  assert.equal(sawAbort, true)
  assert.equal(applyCalls, 0)
})

test('non-severe diagnosis, stale failure, and unknown diagnosis fields fail closed', async t => {
  let calls = 0
  const f = assistant(t, {
    diagnose: async () => {
      calls += 1
      if (calls === 1) return { ...present(), incident: { id: 'warning', severity: 'warning' } }
      return { ...present(), extra: 'must not pass' }
    },
    decide: async () => ({ repairId: null }),
    apply: async () => assert.fail('must not apply'),
  })
  assert.equal(await f.controller.offer(FAILURE), null)
  assert.equal(await f.controller.offer({ ...FAILURE, failedAt: NOW - 60_000 }), null)
  assert.equal(await f.controller.offer({ ...FAILURE, failureId: 'failure-2' }), null)
})
