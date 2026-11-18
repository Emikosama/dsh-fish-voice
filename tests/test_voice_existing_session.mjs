import { EventEmitter } from 'node:events'
import { mkdtemp, mkdir, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import assert from 'node:assert/strict'
import test from 'node:test'
import { createExistingVoiceSessions, EXISTING_VOICE_PLATFORM, splitBoundReply } from '../voice-existing-session.mjs'
import { makeCompatHiddenVoiceId } from '../voice-presentation-id.mjs'

async function fixture(t, { canSendNow } = {}) {
  const root = await mkdtemp(join(tmpdir(), 'fish-voice-bound-'))
  const profile = join(root, 'profile')
  await mkdir(profile)
  const host = new EventEmitter()
  const ctx = { on(name, fn) { host.on(name, fn); return () => host.off(name, fn) } }
  const store = new Map()
  const agents = new Map()
  const liveSessions = new Map()
  const archive = []
  const denied = new Set()
  const shown = new Set(), presentation = new Map()
  const managed = new Set(['managed-root'])
  const input = [], output = [], errors = [], invalid = [], playback = [], resumed = [], activity = []
  const deliveries = []
  let grantEpoch, microphone = true, playbackHandler
  function bindAgent(session) {
    const nextTurn = []
    const agent = {
      id: session.id, session, status: 'idle', maintenance: false, received: [],
      model: { current: () => ({ provider: 'native-synthetic', model: 'fixture' }) },
      inbox: {
        get hasPending() { return nextTurn.length > 0 },
        get nextTurn() { return nextTurn },
      },
      async runMaintenance(fn) {
        if (agent.maintenance || agent.status !== 'idle') throw new Error('DSH maintenance contested')
        agent.maintenance = true
        try { return await fn() } finally {
          agent.maintenance = false
          if (nextTurn.length) agent.status = 'running'
        }
      },
      followup(message) {
        nextTurn.push(message)
        this.received.push(message)
        append(session, 'agent/inbox/spliced', { target: 'next-turn', inserted: [message] })
      },
      cancel() { assert.fail('Bound voice must leave the native Agent and its work alone') },
      steer() { assert.fail('Bound voice must not steer native work') },
      async dispose() { assert.fail('Bound voice cannot dispose of this Agent') },
    }
    agents.set(session.id, agent)
    liveSessions.set(session.id, session)
    return agent
  }
  function add(id, { title = id, cold = false, origin, cwd = root, createdAt = 1 } = {}) {
    const session = { id, header: { id, createdAt, ...(origin === undefined ? {} : { origin }), ...(cwd === null ? {} : { cwd }) }, history: [] }
    store.set(id, { title, session })
    if (cold) return session
    return bindAgent(session)
  }
  function append(session, type, data, surfaceOp) {
    const event = { type, data, ...(surfaceOp === undefined ? {} : { surfaceOp }) }
    session.history.push(event)
    host.emit('session/event', session, event)
  }
  function finish(agent, { turn = 1, text = '最终答复', mixed = false, reason = 'completed' } = {}) {
    append(agent.session, 'turn/start', { turn })
    const request = agent.inbox.nextTurn.shift()
    if (request) {
      append(agent.session, 'agent/inbox/spliced', { target: 'next-turn', inserted: [], removedCount: 1 })
      append(agent.session, 'user/message', request, 'append')
    }
    if (mixed) append(agent.session, 'user/message', { id: 'typed', source: { kind: 'user' } }, 'append')
    append(agent.session, 'assistant/message', {
      turn, message: { id: 'intermediate-' + turn, role: 'assistant', content: [{ type: 'text', text: '工具前置正文' }, { type: 'tool-call', name: 'whale_voice_speak' }] },
    }, 'append')
    if (text !== null) append(agent.session, 'assistant/message', {
      turn, message: { id: 'reply-' + turn, role: 'assistant', content: [{ type: 'reasoning', text: '隐藏推理' }, { type: 'text', text }] },
    }, 'append')
    append(agent.session, 'turn/end', { turn, reason: { kind: reason } })
    agent.status = 'idle'
    host.emit('agent/status', { agent, status: 'idle' })
  }
  const services = {
    profileContext: { dir: profile },
    agents,
    sessions: liveSessions,
    workspaceRegistry: { archivedSessionIds: archive, sessionPresentation: presentation },
    remoteAccess: { allows: resource => resource.kind === 'session' && !denied.has(resource.id) },
    sessionController: {
      async list() {
        return { items: [...store.values()].map(({ session, title }) => ({
          sessionId: session.id, origin: session.header.origin, cwd: session.header.cwd,
          projections: { values: { title } }, updatedAt: session.header.createdAt,
        })) }
      },
      async resolveAgent(id) { resumed.push(id); return { agent: bindAgent(store.get(id).session) } },
    },
    sessionQuery: {
      async observeSession(id) {
        return { header: store.get(id)?.session.header, [Symbol.dispose]() {} }
      },
    },
  }
  function create() {
    const manager = createExistingVoiceSessions(ctx, {
      getService: name => services[name],
      managedRootIds: async () => managed,
      internalSessionId: 'voice-control-origin',
      shownInWorkspace: id => shown.has(id),
      assertMicrophone: () => { if (!microphone) throw Object.assign(new Error('Permission lost'), { code: 'MIC_NOT_ALLOWED' }) },
      isGrantCurrent: epoch => grantEpoch === epoch,
      canSendNow,
      readTitle: session => store.get(session.id)?.title ?? null,
      onInput: (grant, text, id) => input.push({ grant, text, id }),
      onReply: (grant, text, id, state) => output.push({ grant, text, id, state }),
      onError: (_grant, error) => errors.push(error.code),
      onInvalidGrant: (_epoch, error) => invalid.push(error.code),
      onActivity: () => activity.push(manager.retryStatus()),
      onDelivery: (grant, item, state, select) => deliveries.push({
        sessionId: grant.selection.sessionId, id: item.id, text: item.text, title: item.title, state, select,
      }),
      play: async (text, signal) => {
        playback.push(text)
        return playbackHandler ? playbackHandler(text, signal) : { playbackCompleted: true }
      },
    })
    t.after(() => manager.dispose())
    return manager
  }
  const manager = create()
  t.after(() => rm(root, { recursive: true, force: true }))
  return { manager, profile, agents, store, liveSessions, services, create, add, finish, archive, denied, shown, presentation,
    input, output, invalid, errors, playback, resumed, append, host, activity, deliveries,
    setEpoch: epoch => { grantEpoch = epoch },
    dropPermission: () => { microphone = false },
    setPlayback: handler => { playbackHandler = handler },
  }
}
const submit = (manager, text = '从麦克风进入的内容', captureTurnId = 'capture-turn') =>
  manager.deliver({ text, epoch: 'epoch', captureTurnId, isCurrentCapture: () => true })

test('the voice catalog paginates the entire authorized native list', async t => {
  const f = await fixture(t)
  const expected = Array.from({ length:85 }, (_, i) => '分页-' + i)
  for (const id of expected) f.add(id, { cold:true })
  f.add('分页-隐藏')
  f.denied.add('分页-隐藏')
  const first = await f.manager.list({ query:'分页-' })
  const second = await f.manager.list({ query:'分页-', cursor:first.nextCursor })
  const last = await f.manager.list({ query:'分页-', cursor:second.nextCursor })
  assert.deepEqual([first.items.length, second.items.length, last.items.length], [40, 40, 5])
  assert.deepEqual([first, second, last].flatMap(page => page.items.map(row => row.sessionId)), expected)
  assert.equal(last.nextCursor, null)
  assert.deepEqual(f.resumed, [])
})

test('native visible rows include read-only sessions while ordinary roots bind by native identity', async t => {
  const f = await fixture(t)
  f.add('ordinary-a', { title: '普通远足', cold: true })
  f.add('ordinary-b', { title: '另一条聊天', cwd: null })
  f.add('managed-root')
  f.add('subagent', { origin: 'subagent' })
  f.add('shown-subagent', { origin: 'subagent' })
  f.shown.add('shown-subagent')
  f.add('voice-control-origin')
  const hidden = makeCompatHiddenVoiceId('00000000-0000-8001-8000-000000000000')
  const shown = makeCompatHiddenVoiceId('00000000-0000-8002-8000-000000000000')
  f.add(hidden)
  f.add(shown)
  f.shown.add(shown)
  f.add('native-hidden')
  f.presentation.set('native-hidden', { purpose:'voice', visibility:'hidden' })
  f.add('denied')
  f.shown.add('denied')
  f.denied.add('denied')
  f.add('archived')
  f.archive.push('archived')
  assert.deepEqual((await f.manager.list({})).items.map(x => [x.sessionId, x.availability, x.unavailableReason]), [
    ['ordinary-a', 'ready', undefined], ['ordinary-b', 'ready', undefined],
    ['managed-root', 'unavailable', 'managed'], ['shown-subagent', 'unavailable', 'subagent'],
    [shown, 'unavailable', 'managed'], ['archived', 'archived', undefined],
  ])
  for (const sessionId of ['managed-root', 'shown-subagent', shown, hidden, 'native-hidden', 'voice-control-origin', 'denied']) {
    assert.deepEqual((await f.manager.list({ sessionId })).items, [])
    await assert.rejects(f.manager.set({ sessionId, expectedSessionId:null }), { code:'VOICE_EXISTING_UNAVAILABLE' })
  }
  assert.deepEqual((await f.manager.list({ query: '远足' })).items.map(x => x.title), ['普通远足'])
  await assert.rejects(f.manager.set({ sessionId: 'not-listed', expectedSessionId: null }), { code: 'VOICE_EXISTING_UNAVAILABLE' })
  const saved = await f.manager.set({ sessionId: 'ordinary-a', expectedSessionId: null })
  assert.equal(saved.binding.sessionId, 'ordinary-a')
  assert.equal(saved.binding.title, '普通远足')
  await assert.rejects(f.manager.set({ sessionId: 'ordinary-b', expectedSessionId: null }), { code: 'VOICE_EXISTING_BINDING_CHANGED' })
  const disk = JSON.parse(await readFile(join(f.profile, 'whale-existing-voice.json'), 'utf8'))
  assert.deepEqual(Object.keys(disk.selection).sort(), ['identity', 'sessionId'])
  const reopened = f.create()
  assert.equal(reopened.binding().sessionId, 'ordinary-a')
  await delay(0)
  assert.equal(reopened.binding().title, '普通远足')
  assert.equal(reopened.binding().availability, 'ready')
  f.setEpoch('epoch')
  const grant = await reopened.prepare('epoch')
  assert.equal(grant.agent.session, f.store.get('ordinary-a').session)
  assert.deepEqual(f.resumed, ['ordinary-a'])
  reopened.close()
  assert.deepEqual(await reopened.set({ sessionId: null, expectedSessionId: 'ordinary-a' }), { binding: null })
})

test('the exact native session lookup bypasses title matches and accepts full session IDs', async t => {
  const f = await fixture(t)
  for (let n = 0; n < 41; n++) f.add('other-' + n, { title: 'similar short-id title' })
  f.add('short-id')
  const longId = 'a'.repeat(256)
  f.add(longId)
  assert.ok((await f.manager.list({ query: 'short-id' })).items.every(item => item.sessionId !== 'short-id'))
  for (const sessionId of ['short-id', longId]) {
    const result = await f.manager.list({ sessionId })
    assert.deepEqual(result.items.map(item => item.sessionId), [sessionId])
    assert.equal(result.nextCursor, null)
  }
  f.denied.add(longId)
  assert.deepEqual(await f.manager.list({ sessionId: longId }), { items: [], nextCursor: null, binding: null })
  for (const request of [{ sessionId: longId, query: 'short-id' }, { sessionId: longId, cursor: 'other' }, { sessionId: longId + 'a' }]) {
    await assert.rejects(f.manager.list(request), { code: 'VOICE_EXISTING_UNAVAILABLE' })
  }
})

test('one captured utterance reaches the exact original native inbox and only its final visible reply is played', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  const another = f.add('other')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  await f.manager.prepare('epoch')
  assert.equal(await submit(f.manager), true)
  assert.deepEqual(original.received.map(({ role, content, source }) => ({ role, content, source })), [{
    role: 'user',
    content: [{ type: 'text', text: '从麦克风进入的内容' }],
    source: { kind: 'user', platform: EXISTING_VOICE_PLATFORM },
  }])
  f.finish(another, { text: '这条别的会话回复不能播' })
  f.host.emit('agent/status', { agent: original, status: 'idle' })
  f.append(original.session, 'turn/start', { turn: 0 })
  f.append(original.session, 'user/message', { id: 'prior-typed', source: { kind: 'user' } }, 'append')
  f.append(original.session, 'turn/end', { turn: 0, reason: { kind: 'completed' } })
  assert.deepEqual(f.playback, [])
  assert.deepEqual(f.input, [])
  f.finish(original)
  await delay(0)
  assert.deepEqual(f.playback, ['最终答复'])
  assert.deepEqual(f.output.map(({ text, state }) => [text, state]), [['最终答复', 'speech-requested'], ['最终答复', 'reply']])
  assert.equal(original.session.history.filter(x => x.type === 'user/message').length, 2)
  assert.deepEqual(f.input.map(x => x.text), ['从麦克风进入的内容'])
  assert.equal(await submit(f.manager), false)
  assert.equal(original.received.length, 1)
  assert.equal(another.received.length, 0)
  f.manager.close()
  assert.equal(await submit(f.manager, '关麦之后', 'another-capture'), false)
  original.followup({ role: 'user', id: 'native-after-close', content: [{ type: 'text', text: '原会话继续正常输入' }], source: { kind: 'user' } })
  f.finish(original, { turn: 2, text: '普通回复' })
  assert.equal(original.session.history.filter(x => x.type === 'user/message').length, 3)
  assert.deepEqual(f.playback, ['最终答复'])
})

test('a bound turn containing only a speech tool attempt does not read its intermediate text', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  await f.manager.prepare('epoch')
  assert.equal(await submit(f.manager), true)
  f.finish(original, { text: null })
  assert.deepEqual(f.errors, ['VOICE_EXISTING_REPLY_INCOMPLETE'])
  assert.deepEqual(f.output, [])
  assert.deepEqual(f.playback, [])
})

test('archived, foreign and mixed-in native work never causes playback or a fallback chat', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  f.add('other')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  f.archive.push('ordinary')
  await assert.rejects(f.manager.prepare('epoch'), { code: 'VOICE_EXISTING_ARCHIVED' })
  f.archive.pop()
  await f.manager.prepare('epoch')
  assert.equal(await submit(f.manager), true)
  original.inbox.nextTurn.shift()
  f.append(original.session, 'agent/inbox/spliced', { target: 'next-turn', inserted: [], removedCount: 1 })
  original.status = 'idle'
  assert.equal(await submit(f.manager, '取消旧输入后继续', 'following-capture'), true)
  f.finish(original, { mixed: true })
  assert.deepEqual(f.playback, [])
  f.denied.add('ordinary')
  assert.equal(await submit(f.manager, '撤权后', 'denied'), false)
  assert.deepEqual(f.invalid, ['VOICE_EXISTING_UNAVAILABLE'])
  assert.equal(f.manager.active, null)
  assert.deepEqual(f.resumed, [])
})

test('a busy native session keeps consecutive captures for manual delivery even when already busy at grant creation', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary', { title: '原会话标题' })
  const other = f.add('other', { title: '原会话标题' })
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  original.status = 'running'
  f.manager.watch(await f.manager.prepare('epoch'))
  for (let n = 1; n <= 3; n++) assert.equal(await submit(f.manager, '语音 ' + n, 'capture-' + n), false)
  assert.equal(await submit(f.manager, '重复的识别退出', 'capture-2'), false)
  assert.equal(await f.manager.deliver({ text: '过期', epoch: 'epoch', captureTurnId: 'stale', isCurrentCapture: () => false }), false)
  assert.equal(await f.manager.deliver({ text: '旧授权', epoch: 'old-epoch', captureTurnId: 'old', isCurrentCapture: () => true }), false)
  const held = f.manager.retryStatus()
  assert.equal(held.sessionId, 'ordinary')
  assert.deepEqual(held.items.map(({ text, state }) => [text, state]), [['语音 1', 'busy'], ['语音 2', 'busy'], ['语音 3', 'busy']])
  assert.deepEqual(held.items.map(item => item.title), Array(3).fill('原会话标题'))
  assert.deepEqual(f.deliveries.map(item => item.id), held.items.map(item => item.id), 'duplicate and stale captures produce no new receipt')
  f.store.get(original.id).title = '重试前改名'
  assert.equal(await f.manager.retry({ id: held.items[0].id }), false)
  f.finish(original)
  assert.equal(f.activity.at(-1).items[0].state, 'ready')
  assert.equal(original.received.length, 0)
  assert.equal(other.received.length, 0)
  assert.deepEqual(await Promise.all([f.manager.retry({ id: held.items[0].id }), f.manager.retry({ id: held.items[0].id })]), [true, false])
  assert.deepEqual(original.received.map(message => message.content[0].text), ['语音 1'])
  assert.deepEqual(f.deliveries.slice(-2), [
    { sessionId: 'ordinary', id: held.items[0].id, text: '语音 1', title: '原会话标题', state: 'sending', select: true },
    { sessionId: 'ordinary', id: held.items[0].id, text: '语音 1', title: '原会话标题', state: 'queued', select: undefined },
  ])
  assert.deepEqual(f.manager.retryStatus().items.map(item => item.state), ['busy', 'busy'])
  f.finish(original, { turn: 2 })
  assert.equal(original.received.length, 1)
  assert.equal(await f.manager.retry({ id: held.items[1].id }), true)
  f.finish(original, { turn: 3 })
  assert.equal(await f.manager.retry({ id: held.items[2].id }), true)
  assert.equal(f.manager.retryStatus(), null)
})

test('a contested native maintenance lock retains the transcript without trying again when maintenance ends', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  f.manager.watch(await f.manager.prepare('epoch'))
  const released = Promise.withResolvers()
  original.maintenance = true
  original.whenIdle = () => released.promise
  assert.equal(await submit(f.manager), false)
  const [{ id, state }] = f.manager.retryStatus().items
  assert.equal(state, 'busy')
  assert.equal(f.activity.at(-1).items[0].state, 'busy')
  assert.equal(await f.manager.retry({ id }), false)
  original.maintenance = false
  released.resolve()
  await delay(0)
  assert.equal(f.activity.at(-1).items[0].state, 'ready')
  assert.equal(original.received.length, 0)
  assert.equal(await f.manager.retry({ id }), true)
})

test('new captures join the waiting transcripts after one voice turn has already been admitted', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  await f.manager.prepare('epoch')
  assert.equal(await submit(f.manager, '一', 'first'), true)
  assert.deepEqual(await Promise.all([submit(f.manager, '二', 'second'), submit(f.manager, '三', 'third')]), [false, false])
  f.finish(original)
  assert.equal(await submit(f.manager, '四', 'fourth'), false)
  assert.deepEqual(f.manager.retryStatus().items.map(item => item.text), ['二', '三', '四'])
  assert.deepEqual(original.received.map(message => message.content[0].text), ['一'])
})

test('the grant watchdog publishes availability without a native status event or a new capture', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  original.status = 'running'
  f.manager.watch(await f.manager.prepare('epoch'))
  assert.equal(await submit(f.manager), false)
  const notifications = f.activity.length
  original.status = 'idle'
  await delay(850)
  assert.equal(f.activity.length, notifications + 1)
  assert.equal(f.activity.at(-1).items[0].state, 'ready')
  assert.equal(original.received.length, 0)
})

test('releasing the delivery limit makes held transcripts eligible for manual send only', async t => {
  let withinLimit = false
  const f = await fixture(t, { canSendNow: () => withinLimit })
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  const grant = await f.manager.prepare('epoch')
  f.manager.watch(grant)
  assert.equal(await submit(f.manager, '原会话空闲时', 'rate-limited'), false)
  original.status = 'running'
  assert.equal(await submit(f.manager, '原会话忙碌时', 'while-busy'), false)
  f.finish(original)
  const entries = f.manager.retryStatus().items
  assert.deepEqual(entries.map(item => item.state), ['busy', 'busy'])
  assert.equal(await f.manager.retry({ id: entries[0].id }), false)
  withinLimit = true
  f.manager.watch(grant)
  assert.deepEqual(f.activity.at(-1).items.map(item => item.state), ['ready', 'ready'])
  assert.equal(original.received.length, 0)
  assert.equal(await f.manager.retry({ id: entries[0].id }), true)
  assert.deepEqual(original.received.map(message => message.content[0].text), ['原会话空闲时'])
})

test('an unconfirmed native send can be read for verification but cannot be replayed', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  await f.manager.prepare('epoch')
  original.status = 'running'
  assert.equal(await submit(f.manager, '请核对是否已送达'), false)
  original.status = 'idle'
  const { id } = f.manager.retryStatus().items[0]
  let attempts = 0
  const followup = original.followup
  original.followup = () => { attempts++; throw new Error('native receipt was lost') }
  assert.equal(await f.manager.retry({ id }), false)
  assert.equal(f.manager.retryStatus().items[0].state, 'uncertain')
  assert.equal(await f.manager.retry({ id }), false)
  assert.deepEqual(f.errors, ['VOICE_EXISTING_SEND_UNCONFIRMED'])
  assert.equal(attempts, 1)
  original.followup = followup
  assert.equal(await submit(f.manager, '下一句新的话', 'new-capture'), true)
  assert.deepEqual(original.received.map(message => message.content[0].text), ['下一句新的话'])
  assert.equal(f.manager.retryStatus().items[0].id, id)
  f.manager.close()
  assert.equal(f.manager.retryStatus(), null)
})

test('a synchronous failure after confirmed native insertion does not expose the same message for replay', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  await f.manager.prepare('epoch')
  original.status = 'running'
  assert.equal(await submit(f.manager), false)
  const [{ id }] = f.manager.retryStatus().items
  original.status = 'idle'
  const followup = original.followup.bind(original)
  original.followup = message => { followup(message); throw new Error('observer failed') }
  assert.equal(await f.manager.retry({ id }), true)
  assert.equal(await f.manager.retry({ id }), false)
  assert.deepEqual(original.received.map(message => message.id), [id])
  assert.equal(f.manager.retryStatus(), null)
})

test('retry cannot write after authorization is revoked while native admission is pending', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  const other = f.add('other')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  await f.manager.prepare('epoch')
  original.status = 'running'
  assert.equal(await submit(f.manager), false)
  const [{ id }] = f.manager.retryStatus().items
  original.status = 'idle'
  const release = Promise.withResolvers()
  const admit = original.runMaintenance.bind(original)
  original.runMaintenance = async callback => { await release.promise; return admit(callback) }
  const retry = f.manager.retry({ id })
  assert.equal(f.manager.retryStatus().items[0].state, 'sending')
  f.setEpoch('new-epoch')
  assert.equal(f.manager.retryStatus(), null)
  await f.manager.set({ sessionId: null, expectedSessionId: 'ordinary' })
  await f.manager.set({ sessionId: 'other', expectedSessionId: null })
  await f.manager.prepare('new-epoch')
  release.resolve()
  assert.equal(await retry, false)
  assert.equal(await f.manager.retry({ id }), false)
  assert.equal(f.manager.retryStatus(), null)
  assert.equal(other.received.length, 0)
  assert.equal(original.received.length, 0)
  assert.equal(f.deliveries.at(-1).id, id)
  assert.equal(f.deliveries.at(-1).state, 'discarded')
})

test('a full queue retains its contents and projected text stays bounded without altering the native message', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  await f.manager.prepare('epoch')
  original.status = 'running'
  const long = '开' + '🫧'.repeat(4100) + '末尾'
  for (let n = 0; n < 8; n++) assert.equal(await submit(f.manager, n === 0 ? long : String(n), 'capture-' + n), false)
  const snapshot = f.manager.retryStatus()
  assert.equal(snapshot.items.length, 8)
  assert.equal(snapshot.items[0].text.length, 8000)
  assert.ok(snapshot.items[0].text.isWellFormed())
  assert.match(snapshot.items[0].text, /…$/u)
  assert.equal(await submit(f.manager, '超过上限', 'overflow'), false)
  assert.deepEqual(f.errors, ['VOICE_EXISTING_RETRY_QUEUE_FULL'])
  assert.deepEqual(f.manager.retryStatus(), snapshot)
  assert.equal(f.deliveries.at(-1).state, 'failed')
  assert.equal(f.deliveries.at(-1).text, '超过上限')
  original.status = 'idle'
  assert.equal(await f.manager.retry({ id: snapshot.items[0].id }), true)
  assert.equal(original.received[0].content[0].text, long)
})

test('microphone permission revoke stops the pending local playback and leaves original history intact', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  const grant = await f.manager.prepare('epoch')
  f.manager.watch(grant)
  const stopped = Promise.withResolvers()
  f.setPlayback((_text, signal) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => {
    stopped.resolve()
    reject(signal.reason)
  }, { once: true })))
  assert.equal(await submit(f.manager), true)
  f.finish(original)
  assert.deepEqual(f.playback, ['最终答复'])
  f.dropPermission()
  await Promise.race([stopped.promise, delay(1500).then(() => assert.fail('local voice did not stop'))])
  assert.deepEqual(f.invalid, ['MIC_NOT_ALLOWED'])
  assert.equal(f.manager.active, null)
  assert.equal(original.session.history.at(-1).type, 'turn/end')
})

test('bound events cannot expose a reply after access drops before the next watchdog check', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  const grant = await f.manager.prepare('epoch')
  f.manager.watch(grant)
  assert.equal(await submit(f.manager), true)
  f.denied.add('ordinary')
  f.finish(original, { text: '授权结束后的原会话回复' })
  assert.deepEqual(f.input, [])
  assert.deepEqual(f.output, [])
  assert.deepEqual(f.playback, [])
  assert.deepEqual(f.errors, [])
  assert.deepEqual(f.invalid, ['VOICE_EXISTING_UNAVAILABLE'])
  assert.equal(f.manager.active, null)
  assert.equal(original.session.history.at(-1).type, 'turn/end')
})

test('finishing a second native reply cannot unlink a still-playing first reply from cancellation', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  await f.manager.prepare('epoch')
  let firstSignal
  f.setPlayback((text, signal) => {
    if (text === 'second') throw Object.assign(new Error('first reply is still playing'), { code: 'TTS_BUSY' })
    firstSignal = signal
    return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }))
  })
  assert.equal(await submit(f.manager, 'first question', 'first-capture'), true)
  f.finish(original, { text: 'first' })
  assert.equal(await submit(f.manager, 'second question', 'second-capture'), true)
  f.finish(original, { turn: 2, text: 'second' })
  await delay(0)
  assert.deepEqual(f.errors, ['TTS_BUSY'])
  f.manager.cancelSpeech()
  assert.equal(firstSignal.aborted, true)
})

test('a native resolve finishing after plugin disposal cannot publish a bound grant', async t => {
  const f = await fixture(t)
  f.add('ordinary', { cold: true })
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  const entered = Promise.withResolvers(), gate = Promise.withResolvers()
  const resolve = f.services.sessionController.resolveAgent
  f.services.sessionController.resolveAgent = async id => {
    entered.resolve()
    await gate.promise
    return resolve(id)
  }
  const preparing = f.manager.prepare('epoch')
  await entered.promise
  f.manager.dispose()
  gate.resolve()
  await assert.rejects(preparing, { code: 'VOICE_EXISTING_UNAVAILABLE' })
  assert.equal(f.manager.active, null)
})

test('long spoken replies preserve every sentence and Unicode characters', () => {
  const phrase = '尾段也会播。'
  const huge = '🫧'.repeat(2600) + '。'
  const segments = [...splitBoundReply('首句。' + huge + phrase)]
  assert.ok(segments.length > 1)
  assert.ok(segments.every(text => text.length <= 4000 && text.isWellFormed()))
  assert.equal(segments.join(''), '首句。' + huge + phrase)
})

