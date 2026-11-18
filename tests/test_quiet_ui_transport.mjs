import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { apply as mountRemote } from '../ui/conversation-remote.mjs'
import { dispatchUiAction } from '../ui/host.mjs'
import { mountConversationClient } from '../ui/conversation-client.mjs'
import { actionRequestCodec, conversationRemote } from '../ui/src/conversation-contract.mjs'
import { createController } from '../ui/src/controller.mjs'
import { ownerSettings } from '../voice-ui-bridge.mjs'
const tick = () => new Promise(resolve => setImmediate(resolve))
const status = { enabled: false, ownerSessionId: null, helper: { online: false } }
const settings = { revision: 'one', values: { device: null, pttMouse: 2, speakerVerification: { enabled: false } } }
async function host(api = {}) {
  const agent = { session: { id: 'A' } }, agents = new Map([['A', agent]])
  let service
  const disposers = []
  const ctx = {
    invocation: { peer: { principal: { kind: 'owner' } } }, agents,
    whaleVoiceSession: { status: async a => { assert.equal(a, agent); return status }, ...api },
    get: () => ({ import: async () => ({ TypertRemoteService: class { constructor(ctx) { this.ctx = ctx } } }) }),
    effect(fn) { const dispose = fn(); if (typeof dispose === 'function') disposers.push(dispose) },
    plugin(Service) { service = new Service(ctx) }, typert: { register() {} },
  }
  await mountRemote(ctx)
  return { ctx, service, agent, agents, dispose: () => disposers.forEach(fn => fn()) }
}
test('typed action request rejects impersonation, unknown actions, malformed writes and excessive payloads', () => {
  const schema = actionRequestCodec.create()
  assert.equal(conversationRemote.descriptors.find(x => x.method === 'action').parameters[1].codec, actionRequestCodec)
  for (const request of [{ action: 'status', source: 'human' }, { action: 'enable', agent: {} }, { action: 'arbitrary' }, { action: 'save-settings', revision: 2, values: {} }, { action: 'start-model-install', modelId: 'x', compute: 'cpu', planHash: 'r', accepted: false }, { action: 'save-settings', revision: 'r', values: { text: 'x'.repeat(9000) } }]) assert.equal(schema.safeParse(request).success, false)
  for (const request of [{ action: 'status' }, { action: 'enable', expectedOwnerSessionId: null }, { action: 'save-settings', revision: 'r', values: {} }, { action: 'listen-mode', mode: 'ptt' }, {action:'set-performance-mode',revision:'r',performanceMode:'compatibility'}]) assert.equal(schema.safeParse(request).success, true)
})
test('SenseVoice RPC has one strict sessionless request and a fixed JSON result', () => {
  const descriptor = conversationRemote.descriptors.find(item => item.method === 'senseVoiceAsrAction')
  assert.ok(descriptor)
  assert.deepEqual(descriptor.parameters.map(item => item.name), ['request'])
  const request = descriptor.parameters[0].codec.create()
  const result = descriptor.result.create()
  assert.equal(request.safeParse({ operation: 'status' }).success, true)
  assert.equal(request.safeParse({ operation: 'retry' }).success, true)
  for (const invalid of [{ operation: 'status', sessionId: 'A' }, { operation: 'start' }, {}, null]) assert.equal(request.safeParse(invalid).success, false)
  const snapshot = { state: 'downloading', selected: true, receivedBytes: 12, totalBytes: 34, message: '正在准备模型' }
  assert.deepEqual(result.parse(snapshot), snapshot)
  assert.equal(result.safeParse({ ...snapshot, localPath: 'C:\\private\\model' }).success, false)
})
test('existing DSH session binding is typed and accessible from a blank owner workspace only', async t => {
  const bound = { sessionId:'session-A',title:'Walkthrough',availability:'ready',updatedAt:2 }
  const list = conversationRemote.descriptors.find(item => item.method === 'listExistingVoiceSessions')
  const set = conversationRemote.descriptors.find(item => item.method === 'setExistingVoiceSession')
  const snapshot = { items:[bound],nextCursor:null,binding:null }
  const request = { sessionId:bound.sessionId,expectedSessionId:null }
  assert.deepEqual(list.result.create().parse(snapshot), snapshot)
  assert.equal(list.result.create().safeParse({ ...snapshot, items:[{...bound,history:'private'}] }).success, false)
  assert.equal(list.parameters[0].codec.create().safeParse({ source:'human' }).success, false)
  assert.deepEqual(set.parameters[0].codec.create().parse(request), request)
  assert.equal(set.parameters[0].codec.create().safeParse({sessionId:bound.sessionId}).success, false)
  const calls = []
  const h = await host({
    listExistingVoiceSessions(query, caller) { assert.equal(caller, ownerSettings); calls.push(query); return snapshot },
    setExistingVoiceSession(value, caller) { assert.equal(caller, ownerSettings); calls.push(value); return {binding:bound} },
  })
  t.after(h.dispose)
  h.agents.clear()
  for (const kind of ['agent','guest',undefined]) {
    h.ctx.invocation.peer.principal.kind = kind
    await assert.rejects(h.service.listExistingVoiceSessions({}), /所有者/)
    await assert.rejects(h.service.setExistingVoiceSession(request), /所有者/)
  }
  assert.deepEqual(calls, [])
  h.ctx.invocation.peer.principal.kind = 'owner'
  assert.deepEqual(await h.service.listExistingVoiceSessions({query:'Walk'}), snapshot)
  assert.deepEqual(await h.service.setExistingVoiceSession(request), {binding:bound})
  assert.deepEqual(calls, [{query:'Walk'}, request])
})
test('retry admits only the owner and accepts an opaque item ID without caller-provided text or destination', async t => {
  const request = { id:'05d3dcb4-4633-47e8-9ef8-dfe77aa4bc61' }
  const descriptor = conversationRemote.descriptors.find(item => item.method === 'retryVoiceTranscript')
  const schema = descriptor.parameters[0].codec.create()
  assert.deepEqual(schema.parse(request), request)
  for (const extra of [{text:'another message'}, {sessionId:'other'}, {id:'not-an-item'}]) {
    assert.equal(schema.safeParse({...request,...extra}).success, false)
  }
  let count = 0
  const h = await host({ retryVoiceTranscript(value, actor) {
    assert.equal(actor, ownerSettings)
    assert.deepEqual(value, request)
    count++
    return {accepted:true}
  } })
  t.after(h.dispose)
  h.ctx.invocation.peer.principal.kind = 'guest'
  await assert.rejects(h.service.retryVoiceTranscript(request), /所有者/)
  assert.equal(count, 0)
  h.ctx.invocation.peer.principal.kind = 'owner'
  assert.deepEqual(await h.service.retryVoiceTranscript(request), {accepted:true})
  assert.equal(count, 1)
})

test('sessionless SenseVoice RPC is owner-only and does not require an agent', async () => {
  const snapshot = { state: 'ready', selected: true, receivedBytes: 42, totalBytes: 42, message: '模型文件已验证' }
  const calls = []
  const h = await host({ senseVoiceAsrAction: async (...args) => { calls.push(args); return snapshot } })
  const abortController = new AbortController()
  const abortSignal = abortController.signal
  h.agents.clear()
  assert.deepEqual(await h.service.senseVoiceAsrAction({ operation: 'status' }, abortSignal), snapshot)
  const [request, forwardedSignal] = calls[0]
  assert.deepEqual(request, { operation: 'status' })
  assert.notEqual(forwardedSignal, abortSignal)
  assert.equal(forwardedSignal.aborted, false)
  for (const kind of ['agent', 'guest', undefined]) {
    h.ctx.invocation.peer.principal.kind = kind
    await assert.rejects(h.service.senseVoiceAsrAction({ operation: 'retry' }, abortSignal), /所有者/)
  }
  assert.equal(calls.length, 1)
  abortController.abort()
  assert.equal(forwardedSignal.aborted, true, 'the Remote composite signal follows caller cancellation')
  h.dispose()
  await assert.rejects(h.service.senseVoiceAsrAction({ operation: 'status' }), /abort/i)
})
test('presentation updates reach only the owner and release compatibility admission on disconnect', async () => {
  let listener, snapshot = { shown: [] }
  const h = await host({
    readPresentation: () => snapshot,
    subscribePresentation(callback) { listener = callback; return () => { listener = null } },
  })
  h.agents.clear()
  h.ctx.invocation.peer.principal.kind = 'guest'
  await assert.rejects(h.service.followPresentation().next(), /所有者/)
  assert.equal(listener, undefined)
  h.ctx.invocation.peer.principal.kind = 'owner'
  const controller = new AbortController()
  const stream = h.service.followPresentation(controller.signal)
  assert.deepEqual((await stream.next()).value, snapshot)
  snapshot = { shown: [{ id: 'worker-id', parentId: 'root-id', mode: 'continuable' }] }
  listener()
  assert.deepEqual((await stream.next()).value, snapshot)
  const pending = stream.next()
  controller.abort()
  assert.equal((await pending).done, true)
  assert.equal(listener, null)
  h.dispose()
})
test('quiet host dispatch admits only owner and exact live sessions; agent identity cannot be supplied', async () => {
  const h = await host()
  assert.deepEqual(JSON.parse(await h.service.action('A', { action: 'status' })), { protocol: 1, action: 'status', value: status })
  for (const kind of ['agent', 'guest', undefined]) {
    h.ctx.invocation.peer.principal.kind = kind
    await assert.rejects(h.service.action('A', { action: 'status' }), /所有者/)
  }
  h.ctx.invocation.peer.principal.kind = 'owner'
  await assert.rejects(h.service.action('missing', { action: 'status' }), /失效/)
  h.agents.set('A', { session: { id: 'B' } })
  await assert.rejects(h.service.action('A', { action: 'status' }), /失效/)
  await assert.rejects(dispatchUiAction(h.ctx.whaleVoiceSession, h.agent, { action: 'status', source: 'human' }), /不支持/)
  h.dispose()
})
test('only the owner can save first-run settings without a session', async () => {
  const calls = []
  const h = await host({
    readSettings: (caller) => { assert.equal(caller, ownerSettings); return settings },
    setListenMode: (caller, mode) => { assert.equal(caller, ownerSettings); calls.push(mode); return status },
    changeForCaller: () => assert.fail('settings must not open the microphone'),
    newVoiceSession: () => assert.fail('settings must not create an Agent'),
  })
  h.agents.clear()
  const rpc = method => conversationRemote.descriptors.find(item => item.method === method).parameters[0].codec.create()
  assert.equal(rpc('action').parse(null), null)
  assert.equal(rpc('followModels').parse(null), null)
  assert.equal(rpc('follow').parse(null), null)
  assert.equal(rpc('action').safeParse(undefined).success, false)
  assert.deepEqual(JSON.parse(await h.service.action(null, { action: 'read-settings' })).value, settings)
  await h.service.action(null, { action: 'listen-mode', mode: 'wake' })
  await assert.rejects(h.service.action(null, { action: 'new' }), /明确创建新会话/)
  await assert.rejects(h.service.action(null, { action: 'agent-requests' }), /需要打开一个 DSH 对话/)
  for (const kind of ['agent', 'guest', undefined]) {
    h.ctx.invocation.peer.principal.kind = kind
    await assert.rejects(h.service.action(null, { action: 'listen-mode', mode: 'ptt' }), /所有者/)
  }
  assert.deepEqual(calls, ['wake'])
  h.dispose()
})
test('explicit standalone controls use the owner marker without accepting an agent or guest as caller', async () => {
  const calls = []
  const h = await host({
    status(caller) { assert.ok(caller === ownerSettings || caller === undefined); return status },
    changeForCaller(caller, enabled, _signal, expected) {
      assert.equal(caller, ownerSettings); calls.push([enabled ? 'enable' : 'disable', expected])
    },
    newVoiceSession(caller, _signal, expected) {
      assert.equal(caller, ownerSettings); calls.push(['new', expected])
    },
  })
  h.agents.clear()
  await h.service.action(null, { action:'enable', expectedOwnerSessionId:null })
  await h.service.action(null, { action:'disable' })
  await h.service.action(null, { action:'new', expectedOwnerSessionId:null })
  assert.deepEqual(calls, [['enable',null], ['disable',undefined], ['new',null]])
  h.ctx.invocation.peer.principal.kind = 'agent'
  await assert.rejects(h.service.action(null, { action:'enable', expectedOwnerSessionId:null }), /所有者/)
  h.dispose()
})
test('pending responses are suppressed after agent replacement or plugin disposal', async () => {
  let finish
  const pending = new Promise(resolve => { finish = resolve })
  const h = await host({ status: () => pending })
  const result = h.service.action('A', { action: 'status' })
  h.agents.set('A', { session: { id: 'A' } }); finish(status)
  await assert.rejects(result, /替换/)
  h.dispose()
  await assert.rejects(h.service.action('A', { action: 'status' }), /abort/i)
})
test('quiet dispatch preserves CAS, owner expectation, consent and uncertain-write messages', async () => {
  const calls = []
  const h = await host({
    updateSettings: async (...args) => { calls.push(args); throw new Error('CAS mismatch') },
    changeForCaller: async (...args) => calls.push(args),
    startModelInstall: async (...args) => { calls.push(args); throw Object.assign(new Error('uncertain'), { code: 'PERSISTENCE_UNKNOWN', persistenceConfirmed: false, rootSessionId: 'voice-A' }) },
  })
  const signal = new AbortController().signal
  await assert.rejects(h.service.action('A', { action: 'save-settings', revision: 'old', values: {} }, signal), /CAS mismatch/)
  assert.deepEqual(calls[0][0], { revision: 'old', values: {} }); assert.equal(calls[0][1], h.agent)
  await h.service.action('A', { action: 'enable', expectedOwnerSessionId: 'old-owner' }, signal)
  assert.equal(calls[1][0], h.agent); assert.equal(calls[1][3], 'old-owner')
  await assert.rejects(h.service.action('A', { action: 'start-model-install', modelId: 'x', compute: 'cpu', planHash: 'r', accepted: true }), /PERSISTENCE_UNKNOWN.*\n语音聊天 ID: voice-A\n写入结果未确认/s)
  assert.deepEqual(calls[2][0], { modelId: 'x', compute: 'cpu', planHash: 'r', accepted: true })
  h.dispose()
})
test('controller waits for Remote mount, sends actions silently and does not auto-list history', async () => {
  const calls = []
  const ui = createController()
  ui.enableAutomaticReads(); ui.setSession('A'); await tick()
  assert.equal(ui.getSnapshot().error, null)
  ui.attachConversationClient({ subscribe: () => () => {}, action: async (id, request) => { calls.push([id, request.action]); return request.action === 'read-settings' ? settings : request.action === 'inspect-performance' ? {modes:['fast','balanced','high'].map(performanceMode=>({performanceMode,available:true}))} : status } })
  await tick(); await tick()
  assert.deepEqual(calls, [['A', 'read-settings'], ['A', 'status'], ['A', 'inspect-performance']])
  await ui.run('A', 'enable'); assert.equal(calls.at(-1)[1], 'enable')
  ui.dispose()
  const source = readFileSync(new URL('../ui/src/controller.mjs', import.meta.url), 'utf8')
  assert.doesNotMatch(source, /commands\.execute|\/whale-ear-ui/)
})
test('client Remote failure never falls back to commands and protocol mismatches fail closed', async () => {
  let commands = 0, action = async () => { throw new Error('transport lost') }
  const client = await mountConversationClient({ inject(keys,callback){callback(this);return {await:async()=>{},dispose:async()=>{}}}, remote: { $mount: async () => () => {}, commands: { execute: () => commands++ }, whaleConversation: { action: (...args) => action(...args) } } })
  await assert.rejects(client.action('A', { action: 'status' }), /transport lost/)
  action = async () => ({ ok: true, value: JSON.stringify({ protocol: 1, action: 'disable', value: status }) })
  await assert.rejects(client.action('A', { action: 'status' }), /mismatch/)
  assert.equal(commands, 0)
  await client.dispose()
  await assert.rejects(client.action('A', { action: 'status' }), /卸载/)
})

test('browser client exposes the typed sessionless SenseVoice result', async () => {
  const snapshot = { state: 'ready', selected: true, receivedBytes: 42, totalBytes: 42, message: '模型文件已验证' }
  const calls = []
  const client = await mountConversationClient({
    inject(keys, callback) { callback(this); return { await: async () => {}, dispose: async () => {} } },
    remote: { $mount: async () => () => {}, whaleConversation: { senseVoiceAsrAction: async (...args) => { calls.push(args); return { ok: true, value: snapshot } } } },
  })
  const abortSignal = new AbortController().signal
  assert.deepEqual(await client.senseVoiceAsrAction({ operation: 'status' }, abortSignal), snapshot)
  assert.deepEqual(calls, [[{ operation: 'status' }, abortSignal]])
  await client.dispose()
  await assert.rejects(client.senseVoiceAsrAction({ operation: 'retry' }), /卸载/)
})


test('prompt transport accepts full UTF-16 allowance without widening any other action', async () => {
 const schema=actionRequestCodec.create(), calls=[]
 const h=await host({updateVoicePrompt:async(request,agent)=>{calls.push([request,agent]);return settings}})
 try {
  for(const text of ['x'.repeat(32768),'\u0000'.repeat(32768),'😀'.repeat(16384)]){
   const request={action:'save-voice-prompt',revision:'r',values:{text}}
   assert.equal(schema.safeParse(request).success,true)
   const result=JSON.parse(await h.service.action('A',request))
   assert.equal(result.action,'save-voice-prompt');assert.equal(calls.at(-1)[0].values.text,text);assert.equal(calls.at(-1)[1],h.agent)
  }
  for(const request of [{action:'save-voice-prompt',revision:'r',values:{text:'x'.repeat(32769)}},{action:'save-voice-prompt',revision:'r',values:{text:'',customSupported:true}},{action:'save-settings',revision:'r',values:{text:'x'.repeat(9000)}}])assert.equal(schema.safeParse(request).success,false)
  await assert.rejects(dispatchUiAction(h.ctx.whaleVoiceSession,h.agent,{action:'save-settings',revision:'r',values:{text:'x'.repeat(9000)}}),/过长/)
  h.ctx.invocation.peer.principal.kind='agent'
  await assert.rejects(h.service.action('A',{action:'save-voice-prompt',revision:'r',values:{text:''}}),/所有者/)
  assert.equal(calls.length,3)
 } finally {h.dispose()}
})
