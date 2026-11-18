import { EventEmitter } from 'node:events'
import { mkdtemp, mkdir, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import assert from 'node:assert/strict'
import test from 'node:test'
import { createExistingVoiceSessions, EXISTING_VOICE_PLATFORM, splitBoundReply } from '../voice-existing-session.mjs'

async function fixture(t) {
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
  const managed = new Set(['managed-root'])
  const input = [], output = [], errors = [], invalid = [], playback = [], resumed = []
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
      turn, message: { id: 'intermediate-' + turn, role: 'assistant', content: [{ type: 'text', text: '工具前置正文' }, { type: 'tool-call' }] },
    }, 'append')
    append(agent.session, 'assistant/message', {
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
    workspaceRegistry: { archivedSessionIds: archive },
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
      assertMicrophone: () => { if (!microphone) throw Object.assign(new Error('Permission lost'), { code: 'MIC_NOT_ALLOWED' }) },
      isGrantCurrent: epoch => grantEpoch === epoch,
      onInput: (grant, text, id) => input.push({ grant, text, id }),
      onReply: (grant, text, id, state) => output.push({ grant, text, id, state }),
      onError: (_grant, error) => errors.push(error.code),
      onInvalidGrant: (_epoch, error) => invalid.push(error.code),
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
  return { manager, profile, agents, store, liveSessions, services, create, add, finish, archive, denied,
    input, output, invalid, errors, playback, resumed, append, host,
    setEpoch: epoch => { grantEpoch = epoch },
    dropPermission: () => { microphone = false },
    setPlayback: handler => { playbackHandler = handler },
  }
}
const submit = (manager, text = '从麦克风进入的内容', captureTurnId = 'capture-turn') =>
  manager.deliver({ text, epoch: 'epoch', captureTurnId, isCurrentCapture: () => true })

test('only owner-visible ordinary roots are listed, bound by native identity and persisted within their profile', async t => {
  const f = await fixture(t)
  f.add('ordinary-a', { title: '普通远足', cold: true })
  f.add('ordinary-b', { title: '另一条聊天', cwd: null })
  f.add('managed-root')
  f.add('subagent', { origin: 'subagent' })
  f.add('denied')
  f.denied.add('denied')
  f.add('archived')
  f.archive.push('archived')
  assert.deepEqual((await f.manager.list({})).items.map(x => [x.sessionId, x.availability]), [
    ['ordinary-a', 'ready'], ['ordinary-b', 'ready'], ['archived', 'archived'],
  ])
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

test('archived, occupied, foreign and mixed-in native work never causes playback or a fallback chat', async t => {
  const f = await fixture(t)
  const original = f.add('ordinary')
  f.add('other')
  await f.manager.set({ sessionId: 'ordinary', expectedSessionId: null })
  f.setEpoch('epoch')
  f.archive.push('ordinary')
  await assert.rejects(f.manager.prepare('epoch'), { code: 'VOICE_EXISTING_ARCHIVED' })
  f.archive.pop()
  original.status = 'running'
  await assert.rejects(f.manager.prepare('epoch'), { code: 'VOICE_EXISTING_BUSY' })
  original.status = 'idle'
  await f.manager.prepare('epoch')
  original.maintenance = true
  assert.equal(await submit(f.manager, '等待已有操作', 'busy'), false)
  assert.deepEqual(f.errors, ['VOICE_EXISTING_BUSY'])
  original.maintenance = false
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

