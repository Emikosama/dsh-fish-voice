import test from 'node:test'
import assert from 'node:assert/strict'
import { createCompatVoiceHandoff, inspectCompatHandoffCapabilities, inspectCompatHandoffBackend } from '../voice-handoff-compat.mjs'

const clone = value => structuredClone(value)
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done }); return { promise, resolve } }
const chain = () => ({ int() { return this }, strict() { return this } })
const api = { defineDomain: spec => spec, domainTable: schema => ({ schema }), z: { custom: () => chain(), object: () => chain(), string: chain, number: chain, literal: chain } }
function world() {
  const disk = new Map(), handles = new Set(), calls = [], registry = new Map(), definitions = new Map()
  let write = async () => {}, flush = async () => true, count = 0
  function root(id) { const agent = { id, session: { header: { id, version: 4, createdAt: ++count }, events: [], snapshotEvents() { return this.events } } }; registry.set(id, agent); return agent }
  function worker(owner, id) { const agent = { id, session: { header: { id, parentSession: owner.id } } }; registry.set(id, agent); return agent }
  const facility = { async open(spec) {
    calls.push(['open', spec.name]); if (handles.has(spec.name)) throw new Error('already-open')
    handles.add(spec.name)
    const data = clone(disk.get(spec.name) ?? { binding: {}, tasks: {} }), tables = {}
    for (const name of ['binding', 'tasks']) tables[name] = {
      get(key) { return clone(data[name][key]) }, entries() { return Object.entries(clone(data[name])) },
      async put(key, value) { calls.push(['put', name, key]); await write(name, key, value, spec.name, data); data[name][key] = clone(value); disk.set(spec.name, clone(data)) },
    }
    return { table: name => tables[name], async close() { handles.delete(spec.name); calls.push(['close', spec.name]) } }
  } }
  const ctx = { agents: { get: id => registry.get(id) }, sessions: { flush: (...args) => flush(...args) }, sessionPersistence: { async flush() { calls.push(['flush']) }, async stat(id) { return registry.has(id) ? { header: clone(registry.get(id).session.header) } : null } }, storage: { domain: facility }, tools: { register(definition, options) { if (definitions.has(definition.name)) throw new Error('duplicate tool'); definitions.set(definition.name, { definition, options }); return () => definitions.delete(definition.name) } } }
  const bind = (r, extra = {}) => createCompatVoiceHandoff(ctx, { root: r, isOwnedWorker: caller => registry.get(caller.id) === caller && caller.session.header.parentSession === r.id, runtimeApi: api, ...extra })
  return { disk, handles, calls, registry, definitions, ctx, root, worker, bind, setWrite: fn => { write = fn }, setFlush: fn => { flush = fn } }
}
async function start() { const w = world(), root = w.root('voice-root'), h = w.bind(root); await h.initialize(); return { ...w, rootAgent: root, h } }

test('preflight is dependency-specific; readonly inspection never writes an absent domain', async () => {
  assert.equal(inspectCompatHandoffCapabilities({}).available, false)
  const w = world()
  assert.equal(inspectCompatHandoffCapabilities(w.ctx).backend, 'compat_domain_v1')
  assert.equal(await inspectCompatHandoffBackend(w.ctx, 'voice', { runtimeApi: api }), 'unbound')
  assert.equal(w.disk.size, 0); assert.equal(w.handles.size, 0)
  assert.ok(w.calls.every(call => call[0] !== 'put'))
})

test('fresh root gets its own durable binding; exact identity and root lease are required', async () => {
  const w = world(), root = w.root('r')
  assert.throws(() => w.bind({ ...root }), { code: 'VOICE_TASK_CALLER_INVALID' })
  assert.throws(() => w.bind(w.worker(root, 'nested')), { code: 'VOICE_TASK_ROOT_REQUIRED' })
  w.setFlush(async () => false)
  const h = w.bind(root)
  await assert.rejects(h.initialize(), { code: 'VOICE_TASK_LEASE_UNCONFIRMED' })
  assert.equal(w.disk.size, 0)
  w.setFlush(async () => true)
  await h.initialize()
  assert.equal(w.disk.size, 1)
  const [[name, data]] = w.disk
  assert.match(name, /^whale_handoff_[a-f0-9]{64}$/u)
  assert.deepEqual(data.binding.root, { rootSessionId: root.id, backend: 'compat_domain_v1', version: 1, sessionVersion: 4, rootCreatedAt: root.session.header.createdAt })
  await h.dispose()
})

test('restored unbound and native Team roots never get an empty compatibility board', async () => {
  for (const old of [false, true]) {
    const w = world(), root = w.root('old')
    if (old) root.session.events.push({ type: 'team/task', data: {} })
    const h = w.bind(root, { restore: true })
    await assert.rejects(h.initialize(), { code: old ? 'VOICE_TASK_NATIVE_HISTORY' : 'VOICE_TASK_BACKEND_UNBOUND' })
    assert.equal(w.disk.size, 0); await h.dispose()
  }
})

test('assigned exact worker owns claim and edits; root, foreign and sibling are denied', async () => {
  const w = await start(), worker = w.worker(w.rootAgent, 'worker'), sibling = w.worker(w.rootAgent, 'sibling'), foreignRoot = w.root('foreign'), foreign = w.worker(foreignRoot, 'foreign-worker')
  const saved = await w.h.create('do not install anything', undefined, { workerId: worker.id })
  assert.equal(saved.task.assignedWorkerId, worker.id); assert.equal(saved.task.ownerId, null)
  const get = w.definitions.get('voice_task_get'), update = w.definitions.get('voice_task_update')
  assert.equal(get.definition.parameters.type, 'object'); assert.deepEqual(get.definition.parameters.required, ['task_id'])
  assert.equal(update.definition.parameters.additionalProperties, false); assert.deepEqual(update.definition.parameters.required, ['task_id', 'expected_revision', 'action'])
  for (const caller of [w.rootAgent, foreign, { ...worker }]) {
    assert.equal(await get.options.when({ agent: caller }), false)
    await assert.rejects(w.h.update(caller, { taskId: saved.taskId, expectedRevision: 1, action: 'claim' }), { code: 'VOICE_TASK_UNAUTHORIZED' })
  }
  await assert.rejects(get.definition.execute({ task_id: saved.taskId }, { agent: sibling }), { code: 'VOICE_TASK_UNAUTHORIZED' })
  await assert.rejects(w.h.update(sibling, { taskId: saved.taskId, expectedRevision: 1, action: 'claim' }), { code: 'VOICE_TASK_UNAUTHORIZED' })
  assert.equal(await get.options.when({ agent: worker }), true)
  const claimed = JSON.parse(await update.definition.execute({ task_id: saved.taskId, expected_revision: 1, action: 'claim' }, { agent: worker }))
  assert.equal(claimed.task.ownerId, worker.id); assert.equal(claimed.revision, 2)
  await assert.rejects(w.h.update(worker, { taskId: saved.taskId, expectedRevision: 2, action: 'edit', goal: 'new permission' }), { code: 'VOICE_TASK_INVALID_ARGUMENT' })
  await w.h.dispose()
})

test('CAS rejects concurrent stale updates and preserves newer questions; complete is explicit', async () => {
  const w = await start(), worker = w.worker(w.rootAgent, 'worker')
  const saved = await w.h.create('goal', undefined, { workerId: worker.id })
  await w.h.update(worker, { taskId: saved.taskId, expectedRevision: 1, action: 'claim' })
  const results = await Promise.allSettled([
    w.h.update(worker, { taskId: saved.taskId, expectedRevision: 2, action: 'edit', pendingDecisions: ['User must choose A or B'] }),
    w.h.update(worker, { taskId: saved.taskId, expectedRevision: 2, action: 'edit', result: 'stale overwrite', pendingDecisions: [] }),
  ])
  assert.equal(results[0].status, 'fulfilled'); assert.equal(results[1].reason.code, 'VOICE_TASK_STALE_REVISION')
  assert.deepEqual((await w.h.read(saved.taskId)).task.pendingDecisions, ['User must choose A or B'])
  await assert.rejects(w.h.update(worker, { taskId: saved.taskId, expectedRevision: 3, action: 'complete' }), { code: 'VOICE_TASK_INVALID_TRANSITION' })
  const edited = await w.h.update(worker, { taskId: saved.taskId, expectedRevision: 3, action: 'edit', result: 'Verified result', pendingDecisions: [], references: ['local/test-result'] })
  assert.equal(edited.task.status, 'in_progress')
  const completed = await w.h.update(worker, { taskId: saved.taskId, expectedRevision: edited.revision, action: 'complete' })
  assert.equal(completed.task.status, 'completed'); assert.equal(completed.revision, 5)
  await w.h.dispose()
})

test('unknown create outcome reads back, locks queued writes, and never emits a worker prompt', async () => {
  const w = await start(), entered = deferred(), gate = deferred()
  w.setWrite(async (name) => { if (name === 'tasks') { entered.resolve(); await gate.promise; throw new Error('uncertain publish') } })
  const tasks = Promise.allSettled([w.h.create('first', undefined, { workerId: 'a' }), w.h.create('second', undefined, { workerId: 'b' })])
  await entered.promise; gate.resolve()
  const results = await tasks
  assert.equal(results[0].reason.code, 'VOICE_TASK_PERSISTENCE_UNCONFIRMED')
  assert.equal(results[0].reason.taskId, 'task-1'); assert.equal(results[0].reason.persistenceConfirmed, false)
  assert.equal(results[1].reason, results[0].reason)
  assert.equal(w.calls.filter(call => call[0] === 'put' && call[1] === 'tasks').length, 1)
  await assert.rejects(w.h.workerPrompt({ rootSessionId: w.rootAgent.id, backend: 'compat_domain_v1', taskId: 'task-1' }), { code: 'VOICE_TASK_PERSISTENCE_UNCONFIRMED' })
  assert.equal((await w.h.status()).persistenceConfirmed, false)
  await w.h.dispose()
})

test('dispose stops admission and waits for the native domain write before closing it', async () => {
  const w = await start(), entered = deferred(), gate = deferred()
  w.setWrite(async name => { if (name === 'tasks') { entered.resolve(); await gate.promise } })
  const creating = w.h.create('work', undefined, { workerId: 'worker' })
  await entered.promise
  const closing = w.h.dispose()
  assert.equal(w.handles.size, 1); assert.equal(w.definitions.size, 0)
  await assert.rejects(w.h.create('late', undefined, { workerId: 'late' }), { code: 'VOICE_TASK_CLOSED' })
  gate.resolve(); await creating; await closing
  assert.equal(w.handles.size, 0)
})

test('same root restores owner/revision while independent root domains cannot overwrite each other', async () => {
  const w = await start(), worker = w.worker(w.rootAgent, 'worker')
  const saved = await w.h.create('first root', undefined, { workerId: worker.id })
  await w.h.update(worker, { taskId: saved.taskId, expectedRevision: 1, action: 'claim' })
  await w.h.dispose()
  const restored = w.bind(w.rootAgent, { restore: true }); await restored.initialize()
  assert.equal((await restored.read(saved.taskId)).task.ownerId, worker.id)
  assert.equal((await restored.read(saved.taskId)).revision, 2)
  await restored.dispose()
  const secondRoot = w.root('second-root'), second = w.bind(secondRoot); await second.initialize()
  const other = await second.create('second root', undefined, { workerId: 'other' })
  assert.equal(other.taskId, saved.taskId); assert.notEqual(other.rootSessionId, saved.rootSessionId)
  await second.dispose()
  assert.equal(w.disk.size, 2)
  const final = w.bind(w.rootAgent, { restore: true }); await final.initialize()
  assert.equal((await final.read(saved.taskId)).task.goal, 'first root')
  await final.dispose()
})

test('corrupt sequences, root substitution and session format changes fail closed', async () => {
  for (const mutation of ['sequence', 'root', 'format']) {
    const w = await start(), saved = await w.h.create('work', undefined, { workerId: 'worker' }); await w.h.dispose()
    const data = w.disk.values().next().value
    if (mutation === 'sequence') { data.tasks[saved.taskId].id = 'task-9007199254740992' }
    if (mutation === 'root') data.binding.root.rootSessionId = 'wrong-root'
    if (mutation === 'format') data.binding.root.sessionVersion = 99
    const restored = w.bind(w.rootAgent, { restore: true })
    await assert.rejects(restored.initialize()); await restored.dispose()
  }
})

test('bounds, immutable worker binding, compact status and permission-safe prompt', async () => {
  const w = await start()
  await assert.rejects(w.h.create('x'.repeat(8001), undefined, { workerId: 'worker' }), { code: 'VOICE_TASK_INVALID_ARGUMENT' })
  await assert.rejects(w.h.create('goal'), { code: 'VOICE_TASK_INVALID_ARGUMENT' })
  const a = await w.h.create('🐋'.repeat(3000), undefined, { workerId: 'worker' })
  await assert.rejects(w.h.create('duplicate', undefined, { workerId: 'worker' }), { code: 'VOICE_TASK_WORKER_ALREADY_BOUND' })
  const prompt = await w.h.workerPrompt(a)
  for (const part of ['voice_task_get', 'expected_revision', 'never grant user authorization', 'not task completion', 'merge your own changes']) assert.ok(prompt.includes(part), part)
  const page = await w.h.status({ summaryMaxLength: 512 })
  assert.ok(page.tasks[0].summary.length <= 512); assert.equal(page.tasks[0].summary.isWellFormed(), true)
  assert.equal(page.tasks[0].assignedWorkerId, 'worker')
  for (const options of [{ limit: 9 }, { cursor: -1 }, { summaryMaxLength: 127 }]) await assert.rejects(w.h.status(options), { code: 'VOICE_TASK_INVALID_ARGUMENT' })
  w.registry.delete(w.rootAgent.id)
  await assert.rejects(w.h.read(a.taskId), { code: 'VOICE_TASK_CALLER_INVALID' })
  await w.h.dispose()
})


test('board capacity rejects the next task without deleting unfinished records', async () => {
  const w = await start()
  for (let i = 1; i <= 256; i++) await w.h.create(`goal ${i}`, undefined, { workerId: `worker-${i}` })
  await assert.rejects(w.h.create('overflow', undefined, { workerId: 'overflow' }), { code: 'VOICE_TASK_LIMIT' })
  assert.equal((await w.h.read('task-1')).task.status, 'pending')
  assert.equal((await w.h.read('task-256')).task.goal, 'goal 256')
  assert.equal((await w.h.status({ limit: 8 })).nextCursor, 8)
  await w.h.dispose()
})

test('unknown update outcome never reports a successful revision or retries', async () => {
  const w = await start(), worker = w.worker(w.rootAgent, 'worker')
  const saved = await w.h.create('goal', undefined, { workerId: worker.id })
  await w.h.update(worker, { taskId: saved.taskId, expectedRevision: 1, action: 'claim' })
  const before = w.calls.filter(call => call[0] === 'put').length
  w.setWrite(async () => { throw new Error('unknown durability') })
  for (let i = 0; i < 2; i++) await assert.rejects(w.h.update(worker, { taskId: saved.taskId, expectedRevision: 2, action: 'edit', result: 'not confirmed' }), { code: 'VOICE_TASK_PERSISTENCE_UNCONFIRMED' })
  const read = await w.h.read(saved.taskId)
  assert.equal(read.revision, 2); assert.equal(read.persistenceConfirmed, false)
  assert.equal(w.calls.filter(call => call[0] === 'put').length, before + 1)
  await w.h.dispose()
})


test('cancellation or exact-root replacement during native stat never reaches task put', async () => {
  for (const change of ['abort', 'replace']) {
    const w = await start(), entered = deferred(), gate = deferred(), controller = new AbortController()
    const original = w.ctx.sessionPersistence.stat
    w.ctx.sessionPersistence.stat = async (...args) => { const value = await original(...args); entered.resolve(); await gate.promise; return value }
    const creating = w.h.create('do not commit after cancellation', controller.signal, { workerId: 'worker' })
    const rejected = assert.rejects(creating, change === 'abort' ? { name: 'AbortError' } : { code: 'VOICE_TASK_CALLER_INVALID' })
    await entered.promise
    if (change === 'abort') controller.abort()
    else w.registry.set(w.rootAgent.id, { ...w.rootAgent })
    gate.resolve(); await rejected
    assert.equal(w.calls.filter(call => call[0] === 'put' && call[1] === 'tasks').length, 0)
    await w.h.dispose()
  }
})
