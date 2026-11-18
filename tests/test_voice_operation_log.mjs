import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { mkdtemp, readFile, readdir, rm, unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { createOperationLog, operationLogDirectory, operationLogClientScope, OPERATION_LOG_RETENTION_MS } from '../voice-operation-log.mjs'
import { CLIENT_OPERATION_BATCH_SIZE, CLIENT_OPERATION_PAGE_BYTES } from '../voice-operation-log-contract.mjs'
import { createTtsRuntime } from '../voice-tts.mjs'
import { apply as applyConversationRemote } from '../ui/conversation-remote.mjs'
import { ownerSettings } from '../voice-ui-bridge.mjs'

function parse(text) {
  return text.trim() ? text.trim().split('\n').map(line => JSON.parse(line)) : []
}
async function fixture(t, start = Date.parse('2026-11-18T00:00:28Z')) {
  const home = await mkdtemp(join(tmpdir(), 'fish-voice-op-log-'))
  const directory = join(home, 'log-private')
  const timers = new Set()
  const stores = new Set()
  const problems = []
  let now = start
  function open() {
    const log = createOperationLog({
      directory, now: () => now, onProblem: code => problems.push(code),
      setTimer: cb => (timers.add(cb), cb), clearTimer: cb => timers.delete(cb),
    })
    stores.add(log)
    return log
  }
  async function raw() {
    const files = (await readdir(directory)).filter(name => name.endsWith('.log'))
    return parse((await Promise.all(files.map(name => readFile(join(directory, name), 'utf8')))).join(''))
  }
  t.after(async () => {
    await Promise.all([...stores].map(log => log.dispose()))
    await rm(home, { recursive: true, force: true })
  })
  return { open, directory, timers, raw, problems, time: () => now, advance: ms => { now += ms } }
}
const client = (at, action = 'start-voice') => ({ id: randomUUID(), at, action, phase: 'finished', result: 'ok', source: 'user' })

test('same DSH data root stores separate profiles under opaque stable partitions', () => {
  const data = join(tmpdir(), 'private-whale-ear')
  const profile = join(tmpdir(), 'private-profile-a')
  assert.equal(operationLogDirectory(data, profile), operationLogDirectory(data, join(profile, '..', 'private-profile-a')))
  assert.notEqual(operationLogDirectory(data, profile), operationLogDirectory(data, join(tmpdir(), 'private-profile-b')))
  assert.match(operationLogDirectory(data, profile), /profile-[a-f0-9]{24}$/)
  assert.ok(!operationLogDirectory(data, profile).includes('private-profile-a'))
  assert.equal(operationLogDirectory(data), join(data, 'operation-log', 'legacy'))
})

test('operation records keep chronology and correlation, with codes and opaque subjects only', async t => {
  const f = await fixture(t), store = f.open()
  const privateValue = 'real-person 私聊 D:/local/private.txt NO_ONE_SHOULD_READ_THIS'
  const error = Object.assign(new Error(privateValue), { code: 'AUTHORIZATION_REQUIRED', details: privateValue })
  await assert.rejects(store.track('owner', 'ui.enable', async () => {
    await store.track('helper', 'rpc.start', async () => 42)
    throw error
  }, { subjectId: privateValue, targetId: 'SYNTHETIC_PRIVATE_TARGET_ID' }), error)
  assert.equal(store.track('host', 'health', () => 7), 7)
  store.record({ source: 'host', action: 'diagnostic', phase: 'finished', result: 'failed',
    error: { code: 'NO_ONE_SHOULD_READ_THIS', message: privateValue } })
  const result = await store.read()
  const rows = parse(result.text)
  assert.deepEqual(rows.map(row => [row.action,row.phase,row.result]), [
    ['ui.enable','requested',undefined], ['rpc.start','requested',undefined], ['rpc.start','finished','ok'],
    ['ui.enable','finished','failed'], ['health','requested',undefined], ['health','finished','ok'],
    ['diagnostic','finished','failed'],
  ])
  assert.ok(rows.slice(0, 4).every(row => row.operationId === rows[0].operationId))
  assert.equal(rows[0].subject, rows[3].subject)
  assert.match(rows[0].target, /^[a-f0-9]{20}$/)
  assert.ok(!result.text.includes('SYNTHETIC_PRIVATE_TARGET_ID'))
  assert.equal(rows[3].errorCode, 'AUTHORIZATION_REQUIRED')
  assert.equal(rows[6].errorCode, 'OPERATION_FAILED')
  assert.ok(!result.text.includes(privateValue) && !result.text.includes('NO_ONE_SHOULD_READ_THIS'))
})

test('text-only Edge replies retain the native output error code without speech or endpoint data', async t => {
  const f = await fixture(t), store = f.open()
  const privateValue = 'SYNTHETIC_PRIVATE_OUTPUT_DEVICE'
  const reason = 'AUDIO_OUTPUT_DEVICE_INVALID'
  const classify = value => ({ result: 'failed', error: { code: value.reason } })
  await store.track('agent', 'whale_voice_speak',
    () => store.track('tts', 'playback', async () => ({ textOnly: true, reason, text: privateValue }), { classify }), { classify })
  const result = await store.read()
  assert.deepEqual(parse(result.text).filter(row => row.phase === 'finished').map(row => [row.source, row.result, row.errorCode]), [
    ['tts', 'failed', reason], ['agent', 'failed', reason],
  ])
  assert.ok(!result.text.includes(privateValue))
})

test('ending playback records cancellation on the playback and speech-tool operations', async t => {
  const f = await fixture(t), store = f.open()
  const trackSpeech = job => store.track('agent', 'whale_voice_speak',
    () => store.track('tts', 'playback', job))
  const { promise: playbackStarted, resolve: markPlaybackStarted } = Promise.withResolvers()
  const runtime = createTtsRuntime({
    getConfig: () => ({ provider: 'edge', edgeTextTransmissionAccepted: true }),
    adapter: {
      async inspect() { return { playbackSupported: true, edgePlaybackSupported: true, edgeDependency: 'installed' } },
      edge(_text, _config, signal) {
        return new Promise((resolve, reject) => {
          signal.addEventListener('abort', () => reject(signal.reason), { once: true })
          markPlaybackStarted()
        })
      },
    },
  })
  t.after(() => runtime.dispose())
  const speech = trackSpeech(() => runtime.speak('测试'))
  const cancelled = assert.rejects(speech, { code: 'TTS_CANCELLED' })
  await Promise.race([playbackStarted, speech])
  assert.deepEqual(await runtime.cancel(), { status: 'cancelled' })
  await cancelled
  await assert.rejects(trackSpeech(() => runtime.speak('测试', { signal: AbortSignal.abort() })), { name: 'AbortError' })
  for (const code of ['TTS_TERMINATION_UNCONFIRMED', 'TTS_DEEPSEEK_PLAYBACK_FAILED']) {
    const error = Object.assign(new Error('测试失败'), { code })
    await assert.rejects(trackSpeech(async () => { throw error }), { code })
  }
  const rows = parse((await store.read()).text).filter(row => row.phase === 'finished')
  assert.equal(rows.length, 8)
  for (const [i, [result, errorCode]] of [
    ['cancelled', 'TTS_CANCELLED'], ['cancelled', 'ABORTED'],
    ['failed', 'TTS_TERMINATION_UNCONFIRMED'], ['failed', 'OPERATION_FAILED'],
  ].entries()) {
    const pair = rows.slice(i * 2, i * 2 + 2)
    assert.deepEqual(pair.map(row => [row.source, row.action, row.result, row.errorCode]), [
      ['tts', 'playback', result, errorCode],
      ['agent', 'whale_voice_speak', result, errorCode],
    ])
    assert.equal(pair[0].operationId, pair[1].operationId)
  }
})

test('seven days are enforced by event time, on periodic pruning, writes, and restart', async t => {
  const f = await fixture(t), original = f.open()
  const boundary = f.time() - OPERATION_LOG_RETENTION_MS
  const old = client(boundary - 1), edge = client(boundary), next = client(boundary + 1)
  const yesterday = client(f.time() - 90_000)
  assert.deepEqual(await original.recordClient([old, edge, next, yesterday]), { accepted: true })
  assert.deepEqual((await f.raw()).map(row => row.id).sort(), [edge.id,next.id,yesterday.id].sort())
  f.advance(1)
  for (const tick of f.timers) tick()
  await original.flush()
  assert.deepEqual((await f.raw()).map(row => row.id).sort(), [next.id,yesterday.id].sort(), 'timer physically compacts the partial cutoff hour')
  f.advance(60_000)
  original.record({ source: 'host', action: 'health', phase: 'finished', result: 'ok' })
  await original.flush()
  assert.ok(!(await f.raw()).some(row => row.id === next.id), 'active write schedules retention cleanup')
  await original.dispose()
  f.advance(OPERATION_LOG_RETENTION_MS + 1)
  const reopened = f.open()
  await reopened.flush()
  assert.deepEqual(await f.raw(), [], 'startup removes fully expired .log files')
  assert.deepEqual(await reopened.read(), { text: '', nextCursor: null })
})

test('offline client batches retain original timestamps and repeated receipts are deduplicated across restarts', async t => {
  const f = await fixture(t), first = f.open()
  const event = client(f.time() - 2 * 60 * 60 * 1000)
  assert.deepEqual(await first.recordClient([event,event]), { accepted: true })
  await first.dispose()
  const restarted = f.open()
  assert.deepEqual(await restarted.recordClient([event]), { accepted: true })
  assert.equal((await f.raw()).filter(row => row.id === event.id).length, 1)
  await assert.rejects(restarted.recordClient([{ ...client(f.time()), action: 'print-secret-value' }]), /事件无效/)
  await assert.rejects(restarted.recordClient([{ ...event, details: 'private' }]), /事件无效/)
  assert.equal(parse((await restarted.read()).text)[0].at, event.at)
})

test('explicit feedback pages bound UTF-8 output and preserve every row at identical wall times', async t => {
  const f = await fixture(t), store = f.open()
  const events = Array.from({ length: 420 }, () => client(f.time(), 'page-session-management'))
  for (let start = 0; start < events.length; start += CLIENT_OPERATION_BATCH_SIZE) {
    assert.deepEqual(await store.recordClient(events.slice(start, start + CLIENT_OPERATION_BATCH_SIZE)), { accepted: true })
  }
  let cursor, pages = 0
  const seen = []
  do {
    const result = await store.read(cursor)
    assert.ok(Buffer.byteLength(result.text) <= CLIENT_OPERATION_PAGE_BYTES)
    seen.push(...parse(result.text).map(row => row.id))
    cursor = result.nextCursor
    pages++
  } while (cursor)
  assert.ok(pages > 1)
  assert.deepEqual(seen, events.map(row => row.id))
  await assert.rejects(store.read('../../outside-private.log'), /页码无效/)
})

test('a logging filesystem failure does not change product outcomes and retry can resume logging', async t => {
  const f = await fixture(t)
  await writeFile(f.directory, 'blocking file fixture')
  const store = f.open()
  assert.equal(await store.track('owner', 'ui.enable', async () => 'product-ok'), 'product-ok')
  assert.deepEqual(await store.recordClient([client(f.time())]), { accepted: false })
  assert.equal(f.problems.length, 1)
  await unlink(f.directory)
  assert.deepEqual(await store.recordClient([client(f.time())]), { accepted: true })
  assert.equal((await f.raw()).length, 1)
})

test('browser journal scope is stable across a plugin reload inside one trusted Host/profile only', async t => {
  const f = await fixture(t), host = {}, anotherHost = {}
  const directory = operationLogDirectory(f.directory, f.directory)
  const scope = operationLogClientScope(directory, f.directory, host)
  assert.equal(operationLogClientScope(directory, f.directory, host), scope)
  assert.notEqual(operationLogClientScope(directory, f.directory, anotherHost), scope)
  assert.notEqual(operationLogClientScope(join(directory,'other'), f.directory, host), scope)
  assert.notEqual(operationLogClientScope(directory, undefined, host), operationLogClientScope(directory, undefined, host))
})

test('overflow count survives export without allowing arbitrary client fields', async t => {
  const f = await fixture(t), store = f.open()
  const marker = { ...client(f.time()), action:'ui-buffer-overflow', source:'ui', count:44 }
  await store.recordClient([marker])
  await store.recordClient([marker])
  assert.deepEqual(parse((await store.read()).text).map(row => [row.action,row.count]), [['ui-buffer-overflow',44]])
  await assert.rejects(store.recordClient([{...client(f.time()),count:4}]), /无效/)
})

test('host UI dispatch records operations and restricts diagnostic transport to the exact owner', async t => {
  const f = await fixture(t), store = f.open()
  let remote
  const operationScope = randomUUID(), lifecycle = []
  const ctx = {
    invocation: { peer: { principal: { kind: 'owner' } } }, agents: new Map(),
    whaleVoiceSession: {
      trackOperation: store.track, recordOperation: store.record,
      status: actor => {
        if (actor !== ownerSettings) ctx.agents.set(actor.session.id, { session: { id: actor.session.id } })
        return { enabled: false }
      },
      readOperationLog(request, actor) { assert.equal(actor, ownerSettings); return store.read(request.cursor) },
      readClientOperationScope(actor) { assert.equal(actor, ownerSettings); return { scope:operationScope } },
      recordClientOperations(request, actor) {
        assert.equal(actor, ownerSettings)
        return request.scope === operationScope ? store.recordClient(request.events) : { accepted:false }
      },
    },
    get: name => name === 'loader' ? { import: async () => ({ TypertRemoteService: class {
      constructor(context) { this.ctx = context }
    } }) } : undefined,
    typert: { register() {} },
    effect(setup) { const cleanup = setup(); if (cleanup) lifecycle.push(cleanup) },
    plugin(Remote) { remote = new Remote(this) },
  }
  await applyConversationRemote(ctx)
  t.after(() => { for (const cleanup of lifecycle) cleanup() })
  const signal = new AbortController().signal
  assert.deepEqual(JSON.parse(await remote.action(null, { action: 'status' }, signal)).value, { enabled: false })
  assert.deepEqual(await remote.readClientOperationScope(signal), { scope:operationScope })
  assert.deepEqual(await remote.recordClientOperations({ scope:randomUUID(), events:[client(f.time())] }, signal), { accepted:false })
  await remote.recordClientOperations({ scope:operationScope, events:[client(f.time())] }, signal)
  const output = await remote.readOperationLog({}, signal)
  assert.deepEqual(parse(output.text).map(row => row.action), ['ui.status', 'ui.status', 'start-voice'])
  ctx.invocation.peer.principal = { kind: 'guest' }
  await assert.rejects(remote.readOperationLog({}, signal), { code: 'VOICE_OWNER_REQUIRED' })
  assert.throws(() => remote.readClientOperationScope(signal), { code:'VOICE_OWNER_REQUIRED' })
  await assert.rejects(remote.recordClientOperations({ scope:operationScope, events: [client(f.time())] }, signal), { code: 'VOICE_OWNER_REQUIRED' })
  await assert.rejects(remote.action(null, { action: 'status' }, signal), { code: 'VOICE_OWNER_REQUIRED' })
  ctx.invocation.peer.principal = { kind: 'owner' }
  assert.equal(parse((await remote.readOperationLog({}, signal)).text).at(-1).result, 'denied')
  await assert.rejects(remote.action('synthetic-resident', { action: 'status' }, signal), { code: 'VOICE_CALLER_SESSION_LOST' })
  ctx.agents.set('synthetic-resident', { session: { id: 'synthetic-resident' } })
  await assert.rejects(remote.action('synthetic-resident', { action: 'status' }, signal), { code: 'VOICE_CALLER_SESSION_REPLACED' })
  const codes = parse((await remote.readOperationLog({}, signal)).text).map(row => row.errorCode).filter(Boolean)
  assert.deepEqual(codes, ['VOICE_OWNER_REQUIRED','VOICE_CALLER_SESSION_LOST','VOICE_CALLER_SESSION_REPLACED'])
})

