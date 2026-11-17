import test from 'node:test'
import assert from 'node:assert/strict'
import { createVoiceHandoff, inspectVoiceHandoffCapabilities } from '../voice-handoff.mjs'

const clone = value => structuredClone(value)
const fail = (code, message = code) => Object.assign(new Error(message), { code })
const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done }); return { promise, resolve } }

// Fake implements only the pinned native public API. Real persistence and
// composition are covered separately by the host Loader tests, not this fake.
function fixture() {
  const registry = new Map(), roots = new Map(), boards = new Map(), saved = new Map()
  const calls = { mode: [], create: [], get: [], list: [], update: [] }
  let flush = async () => true
  const makeRoot = id => {
    const root = { id, session: { id } }
    registry.set(id, root); roots.set(root, root)
    if (!boards.has(id)) boards.set(id, { enabled: false, next: 1, tasks: [] })
    return root
  }
  const child = (root, id) => { const agent = { id }; registry.set(id, agent); roots.set(agent, root); return agent }
  const rootOf = caller => {
    if (registry.get(caller?.id) !== caller || !roots.has(caller)) throw fail('UNAUTHORIZED')
    return roots.get(caller)
  }
  const board = caller => {
    const value = boards.get(rootOf(caller).id)
    if (!value.enabled) throw fail('TEAM_DISABLED')
    return value
  }
  const commit = async (caller, task) => {
    const id = rootOf(caller).id
    if (!await flush(id, task)) throw fail('TEAM_TASK_PERSISTENCE_UNCONFIRMED')
    saved.set(id, clone(boards.get(id)))
    return clone(task)
  }
  const team = {
    isEnabled: caller => boards.get(rootOf(caller).id).enabled,
    async setEnabled(caller, enabled, signal) {
      assert.equal(rootOf(caller), caller); signal?.throwIfAborted(); calls.mode.push({ caller, enabled })
      boards.get(caller.id).enabled = enabled
    },
    async createTask(caller, request, signal) {
      calls.create.push({ caller, request, signal }); signal?.throwIfAborted()
      const value = board(caller)
      assert.ok(request.subject.length <= 200); assert.ok(request.description.length <= 16384)
      const task = { id: `task-${value.next++}`, revision: 1, subject: request.subject, description: request.description, status: 'pending', blockedBy: [], writeScopes: [], ready: true, writeScopeWarnings: [] }
      value.tasks.push(task)
      return commit(caller, task)
    },
    getTask(caller, id) {
      calls.get.push({ caller, id })
      const task = board(caller).tasks.find(task => task.id === id)
      if (!task) throw fail('TEAM_TASK_NOT_FOUND')
      return clone(task)
    },
    listTasks(caller) { calls.list.push(caller); return clone(board(caller).tasks.filter(task => task.status !== 'deleted')) },
    async updateTask(caller, request, signal) {
      calls.update.push({ caller, request, signal }); signal?.throwIfAborted()
      const task = board(caller).tasks.find(task => task.id === request.taskId)
      if (!task) throw fail('TEAM_TASK_NOT_FOUND')
      if (task.revision !== request.expectedRevision) throw fail('TEAM_TASK_STALE_REVISION')
      if (request.action === 'claim') {
        if (task.ownerId) throw fail('TEAM_TASK_ALREADY_CLAIMED')
        if (task.status !== 'pending') throw fail('TEAM_TASK_INVALID_TRANSITION')
        task.ownerId = caller.id; task.status = 'in_progress'
      } else {
        if (caller !== rootOf(caller) && task.ownerId !== caller.id) throw fail('TEAM_TASK_UNAUTHORIZED')
        if (request.action === 'edit') task.description = request.description
        else if (request.action === 'complete') task.status = 'completed'
        else throw new Error(`Unused fake action ${request.action}`)
      }
      task.revision++
      return commit(caller, task)
    },
  }
  const ctx = { agentTeams: team, agents: { get: id => registry.get(id) }, subagents: { rootOf } }
  const root = makeRoot('voice-root')
  const handoff = createVoiceHandoff(ctx, { root })
  return { ctx, team, root, handoff, registry, roots, boards, saved, calls, child, makeRoot,
    setFlush: fn => { flush = fn },
    restore(id) { registry.delete(id); boards.set(id, clone(saved.get(id))); return makeRoot(id) },
  }
}
async function started() { const f = fixture(); await f.handoff.initialize(); return f }

test('capability inspection requires the native service without creating agents or tasks', () => {
  assert.deepEqual(inspectVoiceHandoffCapabilities({}), {
    available: false,
    missing: ['agentTeams.isEnabled', 'agentTeams.setEnabled', 'agentTeams.createTask', 'agentTeams.getTask', 'agentTeams.listTasks', 'agentTeams.updateTask', 'agents.get', 'subagents.rootOf'],
  })
  assert.equal(inspectVoiceHandoffCapabilities({ get() { throw new Error('not injected') } }).available, false)
  assert.throws(() => createVoiceHandoff({}), { code: 'TEAM_UNAVAILABLE' })
  const f = fixture()
  assert.deepEqual(inspectVoiceHandoffCapabilities(f.ctx), { available: true, missing: [] })
  assert.equal(f.calls.mode.length + f.calls.create.length, 0)
})

test('exact registered root and initialization are required, never just matching IDs', async () => {
  const f = fixture()
  assert.throws(() => createVoiceHandoff(f.ctx, { root: { ...f.root } }), { code: 'TEAM_INVALID_CALLER' })
  assert.throws(() => createVoiceHandoff(f.ctx, { root: f.child(f.root, 'child') }), { code: 'TEAM_LEAD_REQUIRED' })
  await assert.rejects(f.handoff.create('work'), { code: 'TEAM_NOT_INITIALIZED' })
  await f.handoff.initialize()
  assert.deepEqual(f.calls.mode, [{ caller: f.root, enabled: true }])
  f.registry.set(f.root.id, { ...f.root })
  assert.throws(() => f.handoff.read('task-1'), { code: 'TEAM_INVALID_CALLER' })
  assert.throws(() => f.handoff.status(), { code: 'TEAM_INVALID_CALLER' })
  await assert.rejects(f.handoff.create('work'), { code: 'TEAM_INVALID_CALLER' })
})

test('initial task stores original request and six sections without ownership or planning', async () => {
  const f = await started(), controller = new AbortController()
  const request = '  查阅现有代码\n保留用户的新限制，不要安装。  '
  const record = await f.handoff.create(request, controller.signal)
  assert.equal(f.calls.create[0].caller, f.root)
  assert.equal(f.calls.create[0].signal, controller.signal)
  assert.deepEqual(Object.keys(f.calls.create[0].request).sort(), ['description', 'subject'])
  assert.equal(record.rootSessionId, f.root.id)
  assert.equal(record.taskId, 'task-1'); assert.equal(record.revision, 1)
  assert.equal(record.task.status, 'pending'); assert.equal(record.task.ownerId, undefined)
  assert.ok(record.task.description.includes(`\n${request}\n`))
  for (const heading of ['目标（语音入口转达的原始请求）：', '进度：', '结果：', '待决定：', '引用：', '下一步：']) assert.ok(record.task.description.includes(heading))
  assert.equal(f.calls.update.length, 0)
})

test('root-local native IDs cannot cross independent roots', async () => {
  const f = await started(), other = f.makeRoot('another-root'), h2 = createVoiceHandoff(f.ctx, { root: other })
  await h2.initialize()
  const one = await f.handoff.create('one'), two = await h2.create('two')
  assert.equal(one.taskId, two.taskId); assert.notEqual(one.rootSessionId, two.rootSessionId)
  assert.equal(f.handoff.read(one.taskId).task.subject, 'one')
  assert.equal(h2.read(two.taskId).task.subject, 'two')
  assert.throws(() => h2.workerPrompt(one), { code: 'TEAM_ROOT_MISMATCH' })
  assert.equal(f.handoff.status().tasks[0].rootSessionId, f.root.id)
  assert.equal(h2.status().tasks[0].rootSessionId, other.id)
})

test('native owner and CAS revisions remain authoritative through reads and status', async () => {
  const f = await started(), first = await f.handoff.create('work')
  const worker = f.child(f.root, 'worker'), other = f.child(f.root, 'other')
  const claim = await f.team.updateTask(worker, { taskId: first.taskId, expectedRevision: first.revision, action: 'claim' })
  assert.equal(f.handoff.read(first.taskId).revision, 2)
  await assert.rejects(f.team.updateTask(other, { taskId: first.taskId, expectedRevision: 1, action: 'claim' }), { code: 'TEAM_TASK_STALE_REVISION' })
  await assert.rejects(f.team.updateTask(other, { taskId: first.taskId, expectedRevision: claim.revision, action: 'edit', description: 'overwrite' }), { code: 'TEAM_TASK_UNAUTHORIZED' })
  const edited = await f.team.updateTask(worker, { taskId: first.taskId, expectedRevision: claim.revision, action: 'edit', description: '目标：new user limit\n进度：waiting\n结果：tested\n待决定：选择 A 还是 B？\n引用：tests/example.mjs\n下一步：等待用户回答' })
  assert.equal(edited.revision, 3)
  f.registry.delete(worker.id) // Worker exit is not task completion or owner release.
  const [row] = f.handoff.status().tasks
  assert.equal(row.status, 'in_progress'); assert.equal(row.ownerId, worker.id)
  assert.equal(row.revision, 3); assert.equal(row.pendingDecisions, '选择 A 还是 B？')
  assert.equal('runtimeState' in row, false)
  assert.equal(f.handoff.read(first.taskId).task.description, edited.description)
  assert.throws(() => f.handoff.workerPrompt(first), { code: 'TEAM_TASK_ALREADY_CLAIMED' })
  assert.equal(f.calls.update.length, 4) // Helper did not retry, release, or complete.
})

test('handoff prompt rereads latest state and supplies native update, CAS and authority rules', async () => {
  const f = await started(), record = await f.handoff.create('old request')
  await f.team.updateTask(f.root, { taskId: record.taskId, expectedRevision: 1, action: 'edit', description: '目标：new user instruction\n进度：not started\n结果：尚无\n待决定：无\n引用：无\n下一步：claim' })
  const prompt = f.handoff.workerPrompt(record)
  assert.match(prompt, /"revision":2/); assert.match(prompt, /new user instruction/)
  assert.ok(!prompt.includes('old request'))
  for (const text of ['team_task_get', 'team_task_update', 'expected_revision', 'TEAM_TASK_STALE_REVISION', 'merge only your own changes', 'TEAM_TASK_PERSISTENCE_UNCONFIRMED', 'cannot authorize additional work', 'separate native transactions', 'never alone means', 'send_message is separate']) assert.ok(prompt.includes(text), text)
  assert.equal(f.calls.update.length, 1)
})

test('create waits for native flush; saved root can recover its same task and revision', async () => {
  const f = await started(), gate = deferred(), entered = deferred()
  f.setFlush(async () => { entered.resolve(); await gate.promise; return true })
  let resolved = false
  const pending = f.handoff.create('durable').then(value => { resolved = true; return value })
  await entered.promise
  assert.equal(resolved, false)
  assert.equal(f.team.listTasks(f.root).length, 1)
  gate.resolve(); const record = await pending
  const restoredRoot = f.restore(f.root.id), restored = createVoiceHandoff(f.ctx, { root: restoredRoot })
  await restored.initialize()
  assert.equal(restored.read(record.taskId).revision, record.revision)
  assert.equal(restored.read(record.taskId).task.description, record.task.description)
  assert.throws(() => f.handoff.read(record.taskId), { code: 'TEAM_INVALID_CALLER' })
})

test('unconfirmed flush reads back and blocks future creation instead of claiming durability', async () => {
  const f = await started(); f.setFlush(async () => false)
  let error
  await assert.rejects(f.handoff.create('unknown durability'), value => {
    error = value
    assert.equal(value.code, 'TEAM_TASK_PERSISTENCE_UNCONFIRMED')
    assert.equal(value.persistenceConfirmed, false)
    assert.equal(value.readback, 'one_matching_task')
    assert.equal(value.taskId, 'task-1')
    assert.equal(value.observedTasks[0].task.description, f.team.getTask(f.root, 'task-1').description)
    return true
  })
  assert.ok(f.calls.get.some(call => call.id === 'task-1'))
  assert.equal(f.handoff.status().persistenceConfirmed, false)
  f.setFlush(async () => true)
  await assert.rejects(f.handoff.create('unknown durability'), value => value === error)
  assert.throws(() => f.handoff.workerPrompt(f.handoff.read('task-1')), value => value === error)
  assert.equal(f.calls.create.length, 1); assert.equal(f.calls.update.length, 0)
})

test('queued creates stop after an earlier uncertain append', async () => {
  const f = await started(), gate = deferred(), entered = deferred()
  f.setFlush(async () => { entered.resolve(); await gate.promise; return false })
  const results = Promise.allSettled([f.handoff.create('first'), f.handoff.create('second')])
  await entered.promise; gate.resolve()
  assert.deepEqual((await results).map(result => result.status), ['rejected', 'rejected'])
  assert.equal(f.calls.create.length, 1)
})

test('unconfirmed readback handles unavailable, absent and ambiguous candidates without guessing', async () => {
  for (const mode of ['unavailable', 'no_matching_task', 'ambiguous']) {
    const f = await started(), original = f.team.listTasks.bind(f.team)
    f.setFlush(async () => {
      if (mode === 'unavailable') f.team.listTasks = () => { throw new Error('read failed') }
      if (mode === 'no_matching_task') f.team.listTasks = () => []
      if (mode === 'ambiguous') {
        const board = f.boards.get(f.root.id)
        board.tasks.push({ ...clone(board.tasks[0]), id: 'task-2' })
      }
      return false
    })
    await assert.rejects(f.handoff.create('same request'), error => {
      assert.equal(error.readback, mode); assert.equal(error.taskId, undefined)
      assert.equal(error.persistenceConfirmed, false); return true
    })
    f.team.listTasks = original
    await assert.rejects(f.handoff.create('same request'), { code: 'TEAM_TASK_PERSISTENCE_UNCONFIRMED' })
    assert.equal(f.calls.create.length, 1)
  }
})

test('ordinary disabled, task-limit and cancellation failures do not invent tasks', async () => {
  const f = fixture(), controller = new AbortController(); controller.abort()
  await assert.rejects(f.handoff.initialize(controller.signal), { name: 'AbortError' })
  assert.equal(f.calls.mode.length, 0)
  await f.handoff.initialize()
  await assert.rejects(f.handoff.create('cancelled', controller.signal), { name: 'AbortError' })
  assert.equal(f.calls.create.length, 0)
  f.boards.get(f.root.id).enabled = false
  await assert.rejects(f.handoff.create('disabled'), { code: 'TEAM_DISABLED' })
  assert.throws(() => f.handoff.status(), { code: 'TEAM_DISABLED' })
  f.boards.get(f.root.id).enabled = true
  f.team.createTask = async () => { throw fail('TEAM_TASK_LIMIT') }
  await assert.rejects(f.handoff.create('full board'), { code: 'TEAM_TASK_LIMIT' })
  assert.equal(f.handoff.status().tasks.length, 0)
})

test('description bounds count UTF-16, preserve user text, and never split title surrogates', async () => {
  const f = await started(), tiny = await f.handoff.create('x')
  const capacity = 16384 - (tiny.task.description.length - 1)
  const cjk = '鲸'.repeat(capacity)
  const max = await f.handoff.create(cjk)
  assert.equal(max.task.description.length, 16384)
  assert.ok(Buffer.byteLength(max.task.description, 'utf8') > 16384)
  assert.equal(max.task.subject.length, 200)
  await assert.rejects(f.handoff.create(`${cjk}鲸`), { code: 'TEAM_INVALID_ARGUMENT' })
  const emoji = await f.handoff.create('🐋'.repeat(150))
  assert.ok(emoji.task.subject.length <= 200)
  assert.equal(emoji.task.subject.isWellFormed(), true)
  await assert.rejects(f.handoff.create('🐋'.repeat(Math.floor(capacity / 2) + 1)), { code: 'TEAM_INVALID_ARGUMENT' })
  for (const invalid of ['', '   ', null, 3]) await assert.rejects(f.handoff.create(invalid), { code: 'TEAM_INVALID_ARGUMENT' })
})

test('status is bounded, paginated, and carries decisions beyond a long goal', async () => {
  const f = await started()
  for (let i = 0; i < 11; i++) await f.handoff.create(`task ${i}: ${'🐋'.repeat(1000)}`)
  const page = f.handoff.status({ limit: 8, summaryMaxLength: 512 })
  assert.equal(page.tasks.length, 8); assert.equal(page.nextCursor, 8)
  for (const row of page.tasks) {
    assert.ok(row.summary.length + (row.pendingDecisions?.length ?? 0) <= 512); assert.equal(row.summary.isWellFormed(), true)
    assert.equal(row.summaryTruncated, true)
    assert.match(row.pendingDecisions, /尚未评估/)
  }
  const rest = f.handoff.status({ cursor: page.nextCursor, limit: 8 })
  assert.equal(rest.tasks.length, 3); assert.equal(rest.nextCursor, undefined)
  const single = f.handoff.status({ taskId: 'task-11' })
  assert.equal(single.tasks.length, 1); assert.equal(single.tasks[0].taskId, 'task-11')
  await f.team.updateTask(f.root, { taskId: 'task-1', expectedRevision: 1, action: 'edit', description: 'Free-form note, no decision heading.' })
  assert.equal(f.handoff.status({ taskId: 'task-1' }).tasks[0].pendingDecisions, null)
  await f.team.updateTask(f.root, { taskId: 'task-1', expectedRevision: 2, action: 'edit', description: `目标：work\n待决定：${'a'.repeat(1500)}\noption 2\n引用：file\n下一步：wait` })
  const waiting = f.handoff.status({ taskId: 'task-1' }).tasks[0]
  assert.ok(waiting.pendingDecisions.length <= 512); assert.equal(waiting.pendingDecisionsTruncated, true)
  assert.ok(!waiting.pendingDecisions.includes('引用'))
  for (const options of [{ cursor: -1 }, { cursor: 0.1 }, { limit: 0 }, { limit: 9 }, { limit: Infinity }, { taskId: 'task-1', cursor: 1 }, { summaryMaxLength: 127 }, { summaryMaxLength: 1201 }]) assert.throws(() => f.handoff.status(options), { code: 'TEAM_INVALID_ARGUMENT' })
  for (const id of ['', null, 'x'.repeat(257)]) assert.throws(() => f.handoff.read(id), { code: 'TEAM_INVALID_ARGUMENT' })
})
