import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from './action-harness.mjs'
import { decodeSetupReply } from '../src/setup-protocol.mjs'

const response = (action, value) => ({ ok: true, value: { result: { kind: 'success', text: JSON.stringify({ protocol: 1, action, value }) } } })
const request = line => JSON.parse(line.slice('/whale-ear-ui '.length))
const tick = () => new Promise(resolve => setImmediate(resolve))
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no }); return { promise, resolve, reject } }
const settings = { revision: 'r1', values: { device: null, pttMouse: 2, speakerVerification: { enabled: false } }, onboarding: { version: 1, completed: false }, voiceSession: { visibility: 'hidden' } }
const status = { ownerSessionId: null, enabled: false, helper: { online: false } }
const installer = (id = 'model-A') => ({ schema: 1, models: [{ id, available: true, runtimeLoaded: false }], jobs: [], hardware: {}, compute: {} })
const previewResult = { provider: 'deepseek', fallback: false, playbackCompleted: true, acousticConfirmation: false }
const makeClient = extra => ({ subscribe() { return () => {} }, ...extra })

test('owner setup reads settings and status without a session or starting audio or downloads', async () => {
  const calls = [], signals = []
  const ui = createController(async (id, line) => {
    const { action } = request(line); calls.push([id, action])
    return response(action, action === 'read-settings' ? settings : status)
  })
  ui.attachConversationClient(makeClient({ readSetup(signal) { signals.push(signal); return Promise.resolve({ version: 1, completed: false }) } }))
  await tick()
  assert.equal(ui.getSnapshot().setupOpen, true)
  assert.deepEqual(ui.getSnapshot().setupStatus, { version: 1, completed: false })
  assert.deepEqual(calls, [[null, 'read-settings'], [null, 'status']])
  assert.equal(signals[0] instanceof AbortSignal, true)
  ui.dispose()
})

test('a completed owner flag leaves setup closed and selecting a session never enables voice', async () => {
  const calls = []
  const ui = createController((...args) => { calls.push(args); throw Error('Unexpected command') })
  ui.attachConversationClient(makeClient({ readSetup: async () => ({ version: 1, completed: true }) }))
  await tick(); ui.setSession('A'); await tick()
  assert.equal(ui.getSnapshot().setupOpen, false)
  assert.deepEqual(calls, [])
  ui.dispose()
})

test('first usable session prepares only settings and status, with idempotent source selection', async () => {
  const calls = []
  const ui = createController(async (id, line) => {
    const { action } = request(line); calls.push([id, action])
    return response(action, action === 'read-settings' ? settings : status)
  })
  ui.attachConversationClient(makeClient({ readSetup: async () => ({ version: 1, completed: false }) }))
  await tick(); ui.setSession('A'); await tick()
  ui.setSession('A'); await tick()
  assert.deepEqual(calls, [[null, 'read-settings'], [null, 'status'], ['A', 'read-settings'], ['A', 'status']])
  ui.setSession('B'); await tick()
  assert.deepEqual(calls.slice(4), [['B', 'read-settings'], ['B', 'status']])
  ui.dispose()
})

test('preview gets AbortSignal and cancellation stays bound to original session after source change', async () => {
  const pending = deferred(), cancel = deferred(), calls = []
  const ui = createController((id, line, _attachments, signal) => {
    const { action } = request(line); calls.push({ id, action, signal })
    return action === 'preview-tts' ? pending.promise : cancel.promise
  })
  ui.setSession('A')
  const running = ui.run('A', 'preview-tts', {})
  assert.equal(calls[0].signal instanceof AbortSignal, true)
  ui.setSession('B')
  assert.equal(calls[0].signal.aborted, true)
  assert.deepEqual(calls.map(({ id, action }) => [id, action]), [['A', 'preview-tts'], ['A', 'cancel-tts']])
  assert.equal(await ui.run('B', 'preview-tts'), false)
  const stopping = ui.cancelPreview()
  assert.equal(calls.length, 2, 'cancel must be deduplicated')
  cancel.resolve(response('cancel-tts', { status: 'cancelled' })); assert.equal(await stopping, true)
  pending.resolve(response('preview-tts', previewResult)); await running
  assert.equal(ui.getSnapshot().ttsPreview.status, 'cancelled', 'late success cannot overwrite cancellation')
  ui.dispose()
})

test('closing setup waits for cancellation and AbortError does not replace cancelled state', async () => {
  const pending = deferred(), cancel = deferred()
  const ui = createController(async (_id, line) => {
    const { action } = request(line)
    if (action === 'preview-tts') return pending.promise
    if (action === 'cancel-tts') return cancel.promise
    return response(action, action === 'read-settings' ? settings : status)
  })
  ui.setSession('A'); ui.openSetup(); await tick()
  const running = ui.run('A', 'preview-tts')
  const closing = ui.dismissSetup()
  assert.equal(ui.getSnapshot().setupOpen, true)
  pending.reject(Object.assign(Error('aborted'), { name: 'AbortError' })); await running
  cancel.resolve(response('cancel-tts', { status: 'cancelled' }))
  assert.equal(await closing, true)
  assert.equal(ui.getSnapshot().setupOpen, false)
  assert.equal(ui.getSnapshot().error, null)
  ui.dispose()
})

test('dispose aborts owner setup reads and active preview, cancelling the captured source', async () => {
  const setup = deferred(), pending = deferred(), calls = []; let setupSignal
  const ui = createController((id, line, _files, signal) => {
    const { action } = request(line); calls.push({ id, action, signal })
    return action === 'preview-tts' ? pending.promise : Promise.resolve(response(action, { status: 'cancelled' }))
  })
  ui.attachConversationClient(makeClient({ readSetup(signal) { setupSignal = signal; return setup.promise } }))
  const running = ui.run('A', 'preview-tts'); ui.dispose()
  assert.equal(setupSignal.aborted, true); assert.equal(calls[0].signal.aborted, true)
  assert.equal(calls[1].id, 'A'); assert.equal(calls[1].action, 'cancel-tts')
  const snapshot = ui.getSnapshot()
  setup.resolve({ version: 1, completed: false }); pending.resolve(response('preview-tts', previewResult)); await running; await tick()
  assert.equal(ui.getSnapshot(), snapshot)
})

test('model subscriptions reject old source callbacks, errors and replaced-client emissions', async () => {
  const streams = [], stopped = []
  const client = makeClient({ subscribeModels(id, next, error) { streams.push({ id, next, error }); return () => stopped.push(id) } })
  const ui = createController(async (_id, line) => response(request(line).action, installer()))
  ui.attachConversationClient(client); ui.setSession('A'); await ui.run('A', 'model-installer')
  streams[0].next(installer('A')); assert.equal(ui.getSnapshot().installerFor, 'A')
  ui.setSession('B'); streams[1].next(installer('B'))
  streams[0].next(installer('stale')); streams[0].error(Error('stale error'))
  assert.equal(ui.getSnapshot().installer.models[0].id, 'B'); assert.equal(ui.getSnapshot().installerError, null)
  ui.attachConversationClient(client); streams[2].next(installer('new-client'))
  streams[1].next(installer('old-client')); streams[1].error(Error('old error'))
  assert.equal(ui.getSnapshot().installer.models[0].id, 'new-client')
  ui.dispose(); streams[2].next(installer('after-disposal'))
  assert.equal(ui.getSnapshot().installer.models[0].id, 'new-client')
  assert.deepEqual(stopped, ['A', 'B', 'B'])
})

test('unknown installer writes block retries; stream events and unrelated reads cannot unlock them', async () => {
  let next, failRead = false; const writes = []
  const ui = createController(async (_id, line) => {
    const { action } = request(line)
    if (['start-model-install', 'control-model-install', 'apply-model-install'].includes(action)) { writes.push(action); throw Error('write outcome unknown') }
    if (action === 'model-installer' && failRead) throw Error('read failed')
    return response(action, action === 'status' ? status : installer())
  })
  ui.attachConversationClient(makeClient({ subscribeModels(_id, callback) { next = callback; return () => {} } }))
  ui.setSession('A'); await ui.run('A', 'model-installer')
  for (const failedAction of ['start-model-install', 'control-model-install']) {
    assert.equal(await ui.run('A', failedAction), false)
    assert.equal(ui.getSnapshot().installerUncertain, true)
    next(installer()); await ui.run('A', 'status')
    assert.equal(ui.getSnapshot().installerUncertain, true)
    const count = writes.length
    for (const action of ['start-model-install', 'control-model-install', 'apply-model-install']) assert.equal(await ui.run('A', action), false)
    assert.equal(writes.length, count)
    failRead = true; await ui.run('A', 'model-installer'); assert.equal(ui.getSnapshot().installerUncertain, true)
    failRead = false; await ui.run('A', 'model-installer'); assert.equal(ui.getSnapshot().installerUncertain, false)
  }
  assert.deepEqual(writes, ['start-model-install', 'control-model-install'])
  ui.dispose()
})

test('explicit installer read remains visible while the initial model stream is pending', async () => {
  const ui = createController(async (_id, line) => response(request(line).action, installer()))
  ui.attachConversationClient(makeClient({ subscribeModels() { return () => {} } })); ui.setSession('A')
  assert.equal(await ui.run('A', 'model-installer'), true)
  assert.equal(ui.getSnapshot().installerFor, 'A')
  assert.deepEqual(ui.getSnapshot().installer, installer())
  ui.dispose()
})

test('replaced owner-setup client cannot publish a late rejection into the current client', async () => {
  const stale = deferred()
  const ui = createController(() => { throw Error('No command expected') })
  ui.attachConversationClient(makeClient({ readSetup: () => stale.promise }))
  ui.attachConversationClient(makeClient({ readSetup: async () => ({ version: 1, completed: true }) }))
  await tick(); stale.reject(Error('old client disconnected')); await tick()
  assert.equal(ui.getSnapshot().setupError, null)
  assert.equal(ui.getSnapshot().setupStatus.completed, true)
  ui.dispose()
})

test('setup and preview protocol reject malformed or falsely acoustic-confirmed replies', () => {
  for (const value of [{}, { version: 1, completed: 'false' }, { version: 2, completed: false }]) assert.throws(() => decodeSetupReply('setup-status', value))
  for (const patch of [{ acousticConfirmation: true }, { playbackCompleted: false }, { provider: 'unknown' }, { fallback: null }]) assert.throws(() => decodeSetupReply('preview-tts', { ...previewResult, ...patch }))
  for (const patch of [{ schema: 2 }, { jobs: [{ id: 'j' }] }, { models: [{ id: 'm', available: true, runtimeLoaded: true }] }]) assert.throws(() => decodeSetupReply('model-installer', { ...installer(), ...patch }))
  assert.throws(() => decodeSetupReply('cancel-tts', { status: 'success' }))
})

test('unconfirmed cancellation locks new preview until a valid idle TTS runtime readback', async () => {
  const pending = deferred(), calls = []; let runtime
  const ui = createController((id, line) => {
    const { action } = request(line); calls.push([id, action])
    if (action === 'preview-tts') return pending.promise
    if (action === 'cancel-tts') return Promise.resolve(response(action, { status: 'unconfirmed' }))
    if (action === 'read-settings') return Promise.resolve(response(action, settings))
    return Promise.resolve(response(action, { ...status, ...(runtime ? { ttsRuntime: runtime } : {}) }))
  })
  ui.setSession('A'); ui.openSetup(); await tick()
  const running = ui.run('A', 'preview-tts')
  assert.equal(await ui.dismissSetup(), false)
  pending.resolve(response('preview-tts', previewResult)); await running
  assert.equal(ui.getSnapshot().setupOpen, true)
  assert.equal(await ui.run('A', 'preview-tts'), false)
  assert.equal(await ui.run('A', 'save-tts'), false)
  await ui.run('A', 'status')
  assert.equal(await ui.run('A', 'preview-tts'), false, 'status without runtime cannot clear TTS uncertainty')
  runtime = { state: 'unconfirmed', busy: false, blocked: true }; await ui.run('A', 'status')
  assert.equal(await ui.run('A', 'preview-tts'), false)
  runtime = { state: 'idle', busy: false, blocked: false }; await ui.run('A', 'status')
  assert.equal(await ui.run('A', 'preview-tts'), true)
  assert.equal(calls.filter(([, action]) => action === 'preview-tts').length, 2)
  ui.dispose()
})

test('first-run preparation follows a new source selected while previous settings read is pending', async () => {
  const pending = deferred(), calls = []
  const ui = createController((id, line) => {
    const { action } = request(line); calls.push([id, action])
    if (id === 'A' && action === 'read-settings') return pending.promise
    return Promise.resolve(response(action, action === 'read-settings' ? settings : status))
  })
  ui.attachConversationClient(makeClient({ readSetup: async () => ({ version: 1, completed: false }) }))
  await tick(); ui.setSession('A'); ui.setSession('B')
  pending.resolve(response('read-settings', settings)); await tick(); await tick()
  assert.deepEqual(calls, [[null, 'read-settings'], [null, 'status'], ['A', 'read-settings'], ['B', 'read-settings'], ['B', 'status']])
  assert.equal(ui.getSnapshot().settingsFor, 'B'); assert.equal(ui.getSnapshot().checkedFor, 'B')
  ui.dispose()
})

test('failed first-run settings read can be retried by reopening setup', async () => {
  let fail = true; const calls = []
  const ui = createController(async (id, line) => {
    const { action } = request(line); calls.push([id, action])
    if (fail) throw Error('temporary read outage')
    return response(action, action === 'read-settings' ? settings : status)
  })
  ui.attachConversationClient(makeClient({ readSetup: async () => ({ version: 1, completed: false }) }))
  await tick(); ui.setSession('A'); await tick()
  fail = false; ui.openSetup(); await tick()
  assert.deepEqual(calls, [[null, 'read-settings'], ['A', 'read-settings'], ['A', 'read-settings'], ['A', 'status']])
  ui.dispose()
})

test('install plan rejects malformed file entries and executable license links before rendering', () => {
  const plan = { modelId: 'sensevoice', compute: 'cpu', planHash: 'a'.repeat(64), files: [{ name: 'model.onnx', bytes: 42, sha256: 'b'.repeat(64), url: 'https://example.org/model.onnx' }], totalBytes: 42, destination: '/models', source: 'https://example.org/model', licenseUrls: ['https://example.org/LICENSE'] }
  assert.equal(decodeSetupReply('plan-model-install', plan), plan)
  for (const files of [[null], [{}], [{ ...plan.files[0], name: {} }], [{ ...plan.files[0], bytes: -1 }]]) assert.throws(() => decodeSetupReply('plan-model-install', { ...plan, files }))
  assert.throws(() => decodeSetupReply('plan-model-install', { ...plan, licenseUrls: ['javascript:alert(1)'] }))
})

test('model control replies validate job state instead of accepting arbitrary objects', () => {
  assert.throws(() => decodeSetupReply('control-model-install', {}))
  assert.throws(() => decodeSetupReply('control-model-install', { status: 'done' }))
})

test('reuse plan validates explicit local metadata and rejects malformed variants', () => {
  const plan={modelId:'qwen3-tts-base-1.7b-gguf',compute:'cpu',planHash:'abc',totalBytes:10,destination:'/managed',licenseUrls:[],sourceDirectory:'D:\\models',modelVariant:'q8_0',reused:true,reusedBytes:1024,files:[{name:'weights.gguf',bytes:1024,sha256:'a'.repeat(64),url:'https://example.org/weights.gguf',reused:true}]}
  assert.equal(decodeSetupReply('plan-model-install',plan),plan)
  for(const patch of [{modelVariant:'unknown'},{reusedBytes:-1},{sourceDirectory:''},{reused:false},{files:[{...plan.files[0],reused:'yes'}]}])assert.throws(()=>decodeSetupReply('plan-model-install',{...plan,...patch}))
})
