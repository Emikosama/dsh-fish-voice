import test from 'node:test'
import assert from 'node:assert/strict'
import { createVoiceAgentControl } from '../voice-agent-control.mjs'
import { dispatchUiAction } from '../ui/host.mjs'
import { decodeReply } from '../ui/src/protocol.mjs'

function fixture(options = {}) {
  const agent = { session: { id: 'origin-a' } }, other = { session: { id: 'origin-b' } }
  const live = new Map([[agent.session.id, agent], [other.session.id, other]])
  const calls = [], state = {
    voicePrompt:{text:'',mode:'agents',customSupported:false,unsupportedReason:'unsupported'}, conversationModel:{mode:'auto',provider:null,model:null}, clock: 1000, revision: 'r1', epoch: 'e1', listenMode: 'ptt', ownerSessionId: null,
    performanceMode: 'balanced', visibility: 'hidden', volume: { supported: true, revision: 1, volume: .5 }, modelHash: 'model-hash', ttsSetup: { provider: 'off', edgeTextTransmissionAccepted: false },
    modelSetup: { asr: 'sensevoice', models: { sensevoiceDir: '/models/sensevoice', campplus: '' } },
    installedJob: { id: 'job-1', status: 'installed', recommendedSettings: { asr: 'sensevoice', models: { sensevoiceDir: '/models/downloaded-sensevoice' }, modelCompute: 'cpu' } },
  }
  const settings = () => ({ voicePrompt:structuredClone(state.voicePrompt), conversationModel:structuredClone(state.conversationModel), audioDevices:{input:null,output:null}, revision: state.revision, listenMode: state.listenMode,
    values: { device: null, pttMouse: 1, pttKeyboard: null, speakerVerification: { enabled: false }, turnSignals: { enabled: true, volume: .2, headphonesConfirmed: false, experimentalAutomaticBargeIn: false } },
    voiceSession: { performanceMode: state.performanceMode, visibility: state.visibility },
    modelSetup: structuredClone(state.modelSetup),
    ttsSetup: structuredClone(state.ttsSetup), onboarding: { version: 1, completed: false },
  })
  const api = {
    readSettings: settings,
    updateVoicePrompt(request){calls.push(['save-voice-prompt',request]);state.voicePrompt={...state.voicePrompt,text:request.values.text};state.revision+='x';return settings()},
    readConversationModels:()=>({providers:[]}),
    updateConversationModel(request){calls.push(['save-conversation-model',request]);state.conversationModel=structuredClone(request.values);return settings()},
    readAudioDevices: () => ({schema:1,input:{status:'empty',items:[],reason:null},output:{status:'empty',items:[],reason:null}}),
    updateAudioDevice(request) {calls.push(['save-audio-device',request]);state.revision+='x';return settings()},
    status: () => ({ ownerSessionId: state.ownerSessionId, enabled: state.ownerSessionId !== null, listenMode: state.listenMode }),
    readOutputVolume: () => ({ ...state.volume }),
    readConversation: () => ({ items: [] }),
    listVoiceSessions: () => ({ items: [] }), inspectPerformanceModes: () => ({ modes: [] }),
    inspectTts: () => ({ providers: [] }), readModelInstaller: () => ({ jobs: [structuredClone(state.installedJob)] }), inspectModelCompute: () => ({ backends: {} }),
    planModelInstall: ({ modelId, compute }) => ({ modelId, compute, planHash: state.modelHash, source: 'https://huggingface.co', totalBytes: 1024, licenseUrls: ['https://example.org/license'], destination: '/models/test' }),
    changeForCaller(agent, enabled, signal, expectedOwner) { signal?.throwIfAborted(); calls.push(['enable', enabled, expectedOwner]); state.ownerSessionId = enabled ? agent.session.id : null },
    setListenMode(agent, mode, signal) { signal?.throwIfAborted(); calls.push(['listen-mode', mode]); state.listenMode = mode; return api.status() },
    newVoiceSession() { calls.push(['new']) }, resumeVoiceSession(agent, id) { calls.push(['resume', id]) },
    updateSettings(request, agent, signal) { signal?.throwIfAborted(); calls.push(['save-settings', structuredClone(request)]); state.revision = 'r2'; return settings() },
    setOutputVolume(request, agent, signal) { signal?.throwIfAborted(); assert.equal(request.revision, state.volume.revision); calls.push(['set-output-volume', request]); return state.volume = { ...state.volume, volume: request.volume, revision: request.revision + 1 } },
    startModelInstall(request) { calls.push(['start-model-install', request]); return { id: 'job-1', status: 'queued' } },
    updateTtsSettings(request) { calls.push(['save-tts', request]); state.ttsSetup=structuredClone(request.values); return settings() },
  }
  for (const name of ['updateModelSettings','setPerformanceMode','setVisibility','completeSetup','previewTts','cancelTts','controlModelInstall','applyModelInstall']) api[name] = (...args) => { calls.push([name,...args.slice(0,1)]); return settings() }
  api.setPerformanceMode = request => { calls.push(['set-performance-mode', request]); state.performanceMode=request.performanceMode; state.revision+='x'; return settings() }
  api.setVisibility = request => { calls.push(['set-visibility', request]); state.visibility=request.visibility; state.revision+='x'; return settings() }
  api.updateModelSettings = request => { calls.push(['save-models', request]); state.modelSetup=structuredClone(request.values); state.revision+='x'; return settings() }
  api.applyModelInstall = request => { calls.push(['apply-model-install', request]); const target=state.installedJob.recommendedSettings; if(target.tts)state.ttsSetup={...state.ttsSetup,...target.tts};else state.modelSetup={asr:target.asr,models:{...state.modelSetup.models,...target.models}}; state.revision+='x'; return settings() }
  const make = () => createVoiceAgentControl({ authorizationSources:()=>[api.planModelInstall({modelId:'sensevoice',compute:'cpu'})],...options, api, assertCaller(a) { assert.equal(live.get(a?.session?.id), a, 'exact live identity required') }, runtimeToken: () => [state.ownerSessionId,state.epoch,state.listenMode], now: () => state.clock, ttlMs: 100 })
  const control = make()
  const prepare = (operation, params = {}) => control.prepare(agent, operation, params)
  const approve = request => control.humanApi.decideAgentRequest({ id: request.id, approve: true, acknowledgements: request.acknowledgements.map(ack => ack.id) }, other)
  return { agent, other, live, calls, state, api, control, prepare, approve, make, settings }
}

test('capability discovery and reads never mutate; local-only UI gaps are honest', async () => {
  const f = fixture(), cap = await f.control.read(f.agent, 'capabilities')
  assert.equal(cap.confirmation, 'direct-configuration-scoped-operations')
  assert.equal(cap.localUi.supported, false)
  assert.ok(cap.parameters['save-settings'].includes('revision (read-settings)'))
  for (const operation of cap.reads) await f.control.read(f.agent, operation, operation === 'plan-model-install' ? { modelId: 'sensevoice', compute: 'cpu' } : {})
  assert.deepEqual(f.calls, [])
})
test('trusted human overrides never enter agent reads, approved plans or automatic execution', async () => {
  const humanCalls = []
  const f = fixture({ humanApiOverrides: {
    changeForCaller: (agent, enabled) => { humanCalls.push(['grant', agent.session.id, enabled]) },
    readConversation: () => ({ items: ['human-global'] }),
  } })
  assert.deepEqual(f.control.humanApi.readConversation(f.other).items, ['human-global'])
  assert.deepEqual((await f.control.read(f.other, 'conversation')).items, [])
  await f.control.humanApi.changeForCaller(f.other, true)
  assert.deepEqual(humanCalls, [['grant', f.other.session.id, true]])
  assert.deepEqual(f.calls, [])
  const pending = await f.prepare('enable')
  await f.approve(pending.request)
  assert.equal(f.calls.length, 1)
  assert.equal(humanCalls.length, 1, 'approval is for the exact agent plan, not an owner impersonation')
  await f.control.execute(f.agent, 'disable')
  assert.equal(f.calls.length, 2)
  assert.equal(humanCalls.length, 1)
})

test('all exposed backend mutations prepare an exact bounded plan without execution', async t => {
  const actions = {
    enable: {}, disable: {}, 'listen-mode': { mode: 'always' }, new: {}, resume: { id: 'history-a' },
    'save-voice-prompt':{revision:'r1',values:{text:''}},
    'save-conversation-model':{revision:'r1',values:{mode:'auto',provider:null,model:null}},
    'save-audio-device': {revision:'r1',direction:'output',selection:null},
    'save-settings': { revision: 'r1', values: fixture().settings().values }, 'save-models': { revision: 'r1', values: fixture().settings().modelSetup },
    'set-performance-mode': { revision: 'r1', performanceMode: 'fast' }, 'set-visibility': { revision: 'r1', visibility: 'workspace' },
    'save-tts': { revision: 'r1', values: { provider: 'off' } }, 'complete-setup': { revision: 'r1' }, 'preview-tts': {}, 'cancel-tts': {},
    'set-output-volume': { revision: 1, volume: .4 }, 'start-model-install': { modelId: 'sensevoice', compute: 'cpu' },
    'control-model-install': { id: 'job-1', operation: 'pause' }, 'apply-model-install': { id: 'job-1', revision: 'r1' },
  }
  const f = fixture()
  assert.deepEqual(Object.keys(actions).sort(), (await f.control.read(f.agent, 'capabilities')).operations.sort())
  for (const [operation, params] of Object.entries(actions)) await t.test(operation, async () => {
    const f = fixture(), result = await f.prepare(operation, params)
    assert.equal(result.ok, false); assert.equal(result.status, 'confirmation-required')
    assert.equal(result.request.state, 'pending'); assert.equal(result.request.sourceSessionId, f.agent.session.id)
    assert.deepEqual(f.calls, [])
  })
})

test('tool callers cannot forge approval, owner identity or a UI action', async () => {
  const f = fixture()
  for (const key of ['source','actor','human','accepted','approval','approvalToken']) await assert.rejects(f.prepare('enable', { [key]: true }), /人工身份或批准/)
  for (const operation of ['approve','decide-agent-request','agent-requests']) await assert.rejects(f.prepare(operation), /不支持/)
  await assert.rejects(f.prepare('enable', { unknown: true }))
  await assert.rejects(f.prepare('enable', null), /参数必须是对象/)
  await assert.rejects(f.control.read({ session: { id: f.agent.session.id } }, 'status'), /exact live identity/)
  assert.deepEqual(f.calls, [])
})

test('only owner decision with every impact acknowledgement executes once', async () => {
  const f = fixture(); f.state.listenMode = 'always'; f.state.ownerSessionId = f.other.session.id
  const { request } = await f.prepare('enable')
  assert.deepEqual(request.acknowledgements.map(x => x.id), ['microphone','transfer','always'])
  await assert.rejects(f.control.humanApi.decideAgentRequest({ id: request.id, approve: true, acknowledgements: ['microphone'] }, f.other), /逐项确认/)
  assert.equal(f.calls.length, 0)
  const outcome = await f.approve(request)
  assert.equal(outcome.state, 'completed'); assert.equal(f.calls.length, 1); assert.equal(f.state.ownerSessionId, f.agent.session.id)
  await assert.rejects(f.approve(request), /不会重复执行/)
  assert.equal(f.calls.length, 1)
})

test('manual operations supersede every queued agent plan, even equal-value writes', async () => {
  const f = fixture(), first = await f.prepare('enable'), second = await f.prepare('listen-mode', { mode: 'always' })
  await f.control.humanApi.updateSettings({ revision: 'r1', values: f.settings().values }, f.other)
  for (const { request } of [first, second]) {
    assert.equal(f.control.inspect(f.agent, request.id).state, 'superseded')
    await assert.rejects(f.approve(request), /不会重复执行/)
  }
  assert.equal(f.calls.length, 1)
})

test('approving one exact plan supersedes the others', async () => {
  const f = fixture(), first = await f.prepare('enable'), second = await f.prepare('listen-mode', { mode: 'always' })
  await f.approve(first.request)
  assert.equal(f.control.inspect(f.agent, second.request.id).state, 'superseded')
})

test('external revision, runtime owner/epoch, timeout, restart and actor replacement fail closed', async t => {
  for (const change of [f => f.state.revision = 'r2', f => f.state.epoch = 'e2', f => f.state.ownerSessionId = 'other', f => f.state.clock += 101]) await t.test(String(change), async () => {
    const f = fixture(), { request } = await f.prepare('enable'); change(f)
    assert.equal((await f.control.read(f.agent, 'capabilities')).pendingRequests[0].state, 'expired')
    await assert.rejects(f.approve(request), /不会重复执行/); assert.equal(f.calls.length, 0)
  })
  const f = fixture(), { request } = await f.prepare('enable')
  await assert.rejects(f.make().humanApi.decideAgentRequest({ id: request.id, approve: true, acknowledgements: ['microphone'] }, f.other), /不会重复执行/)
  f.live.set(f.agent.session.id, { session: { id: f.agent.session.id } })
  await assert.rejects(f.approve(request), /exact live identity/); assert.equal(f.calls.length, 0)
})

test('request status/cancel is origin-scoped; reject/cancel cannot replay', async () => {
  const f = fixture(), a = await f.prepare('enable'), b = await f.prepare('enable')
  assert.throws(() => f.control.inspect(f.other, a.request.id), /不属于/)
  assert.throws(() => f.control.cancel(f.other, a.request.id), /不属于/)
  assert.equal(f.control.cancel(f.agent, a.request.id).state, 'cancelled')
  assert.equal((await f.control.humanApi.decideAgentRequest({ id: b.request.id, approve: false }, f.other)).state, 'rejected')
  for (const { request } of [a,b]) await assert.rejects(f.approve(request), /不会重复执行/)
  assert.equal(f.calls.length, 0)
})

test('model acceptance is synthesized only after exact owner acknowledgement', async () => {
  const f = fixture(), { request } = await f.prepare('start-model-install', { modelId: 'sensevoice', compute: 'cpu' })
  assert.equal('accepted' in request.request, false)
  assert.equal(request.installPlan.totalBytes, 1024)
  assert.equal(f.calls.length, 0)
  assert.equal((await f.approve(request)).state, 'completed')
  assert.equal(f.calls[0][1].accepted, true)
})

test('changed model source/plan is never downloaded; outcome cannot be replayed', async () => {
  const f = fixture(), { request } = await f.prepare('start-model-install', { modelId: 'sensevoice', compute: 'cpu' })
  f.state.modelHash = 'changed-source'
  const result = await f.approve(request)
  assert.equal(result.state, 'unknown'); assert.equal(result.error.code, 'MODEL_PLAN_CHANGED')
  assert.equal(f.calls.length, 0); await assert.rejects(f.approve(request), /不会重复执行/)
})

test('agent cannot invent cloud text consent or headphone evidence', async () => {
  const f = fixture()
  await assert.rejects(f.prepare('save-tts', { revision: 'r1', values: { provider: 'edge', edgeTextTransmissionAccepted: true } }), /不能声明/)
  await assert.rejects(f.prepare('save-tts', { revision: 'r1', values: { provider: 'deepseek', deepseekTextTransmissionAccepted: true } }), {code:'FORGED_CONSENT'})
  const tts = await f.prepare('save-tts', { revision: 'r1', values: { provider: 'edge' } })
  assert.equal(tts.request.request.values.edgeTextTransmissionAccepted, false)
  assert.ok(tts.request.acknowledgements.some(x => x.id === 'edge'))
  await f.approve(tts.request)
  assert.equal(f.calls[0][1].values.edgeTextTransmissionAccepted, true)
  const audio = f.settings().values; audio.turnSignals.headphonesConfirmed = true
  const sound = await f.prepare('save-settings', { revision: 'r1', values: audio })
  assert.ok(sound.request.acknowledgements.some(x => x.id === 'headphones'))
})

test('stale parameter revisions are refused before creating a request', async () => {
  const f = fixture()
  await assert.rejects(f.prepare('set-performance-mode', { revision: 'old', performanceMode: 'high' }), /重新读取/)
  await assert.rejects(f.prepare('set-output-volume', { revision: 0, volume: .3 }), /重新读取/)
  await assert.rejects(f.prepare('enable', { expectedOwnerSessionId: 'old-owner' }), /重新读取/)
  assert.equal(f.control.humanApi.readAgentRequests(f.agent).items.length, 0)
})

test('human action aborts an in-flight agent-approved operation; never blindly retry', async () => {
  const f = fixture(); let started, finish
  const began = new Promise(resolve => started = resolve)
  const gate = new Promise(resolve => finish = resolve)
  f.api.changeForCaller = async (agent, enabled, signal) => { started(); await gate; signal.throwIfAborted(); f.calls.push(['should-never-run']) }
  const { request } = await f.prepare('enable'), running = f.approve(request)
  await began
  await f.control.humanApi.setListenMode(f.other, 'ptt')
  finish()
  const result = await running
  assert.equal(result.state, 'unknown'); assert.match(result.nextAction, /不要重试/)
  assert.deepEqual(f.calls, [['listen-mode','ptt']]); await assert.rejects(f.approve(request), /不会重复执行/)
})

test('exceptions after a side effect stay unknown instead of claiming failed/no change', async () => {
  const f = fixture()
  f.api.changeForCaller = () => { f.calls.push(['changed']); throw new Error('connection lost after write') }
  const { request } = await f.prepare('enable'), result = await f.approve(request)
  assert.equal(result.state, 'unknown'); assert.equal(f.calls.length, 1)
  await assert.rejects(f.approve(request), /不会重复执行/)
})

test('pending requests and payloads are bounded', async () => {
  const f = fixture()
  await assert.rejects(f.prepare('save-settings', { revision: 'r1', values: { big: 'x'.repeat(9000) } }))
  for (let i = 0; i < 5; i++) await f.prepare('enable')
  await assert.rejects(f.prepare('enable'), /待确认请求过多/)
})

function permit(f, operations) {
  const snapshot = f.control.humanApi.readAgentPermissions(f.other)
  return f.control.humanApi.updateAgentPermissions({ revision: snapshot.revision, allowed: Object.fromEntries(snapshot.items.map(item => [item.operation, operations.includes(item.operation)])) }, f.other)
}

test('ordinary permissions default to direct configuration with no owner callback', async () => {
  const f = fixture()
  const before = await f.control.execute(f.agent, 'set-output-volume', { revision: 1, volume: .4 })
  assert.equal(before.status, 'completed'); assert.equal(f.calls.length, 1)
  permit(f, ['set-output-volume','set-performance-mode'])
  for (const volume of [.4,.6]) {
    const result = await f.control.execute(f.agent, 'set-output-volume', { revision: f.state.volume.revision, volume })
    assert.equal(result.ok, true); assert.equal(result.status, 'completed'); assert.equal(f.state.volume.volume, volume)
  }
  for (const performanceMode of ['fast','high']) {
    const result = await f.control.execute(f.agent, 'set-performance-mode', { revision: f.state.revision, performanceMode })
    assert.equal(result.ok, true); assert.equal(f.state.performanceMode, performanceMode)
  }
  assert.equal(f.calls.length, 5)
})

test('explicit prepare never executes even when owner permits autonomy', async () => {
  const f = fixture(); permit(f, ['set-output-volume'])
  assert.equal((await f.prepare('set-output-volume', { revision: 1, volume: .1 })).status, 'confirmation-required')
  assert.equal(f.calls.length, 0)
})

test('old manual values no longer revoke configuration permission', async () => {
  const f = fixture(); permit(f, ['set-output-volume','set-performance-mode'])
  await f.control.humanApi.setOutputVolume({ revision: 1, volume: .8 }, f.other)
  const policy = f.control.humanApi.readAgentPermissions(f.other)
  assert.equal(policy.items.find(x => x.operation === 'set-output-volume').allowed, true)
  assert.equal(policy.items.find(x => x.operation === 'set-performance-mode').allowed, true)
  const attempt = await f.control.execute(f.agent, 'set-output-volume', { revision: 2, volume: .1 })
  assert.equal(attempt.status, 'completed'); assert.equal(f.state.volume.volume, .1)
})

test('ordinary grants cannot cover mic, continuous listening, Edge consent or downloads', async () => {
  const f = fixture(); permit(f, ['set-output-volume','set-performance-mode','set-visibility'])
  for (const [operation, params] of [['enable',{}],['listen-mode',{mode:'always'}],['start-model-install',{modelId:'sensevoice',compute:'cpu'}]]) {
    assert.equal((await f.control.execute(f.agent,operation,params)).status, 'confirmation-required')
  }
  const policy = f.control.humanApi.readAgentPermissions(f.other)
  assert.throws(() => f.control.humanApi.updateAgentPermissions({ revision: policy.revision, allowed: { enable: true } }, f.other), /不支持的字段/)
  assert.equal(f.calls.length, 0)
})

test('stop/cancel operations remain directly available without ordinary grants', async () => {
  const f = fixture()
  for (const [operation, params] of [['disable',{}],['cancel-tts',{}],['listen-mode',{mode:'ptt'}],['control-model-install',{id:'job-1',operation:'pause'}],['control-model-install',{id:'job-1',operation:'cancel'}]]) {
    assert.equal((await f.control.execute(f.agent,operation,params)).status, 'completed')
  }
  assert.equal((await f.control.execute(f.agent,'control-model-install',{id:'job-1',operation:'resume'})).status, 'confirmation-required')
})

test('freshly read external values may be changed but stale revisions still fail', async () => {
  const f = fixture(); permit(f, ['set-output-volume']); f.state.volume.volume = .9; f.state.volume.revision++
  assert.equal(f.control.humanApi.readAgentPermissions(f.other).items.find(x => x.operation === 'set-output-volume').allowed, true)
  await assert.rejects(f.control.execute(f.agent,'set-output-volume',{revision:1,volume:.1}),{code:'STALE_PLAN'})
  assert.equal((await f.control.execute(f.agent,'set-output-volume',{revision:2,volume:.1})).status, 'completed')
  assert.equal(f.calls.length, 1)
})

test('uncertain autonomous result revokes permission instead of allowing blind retries', async () => {
  const f = fixture(); permit(f, ['set-output-volume'])
  f.api.setOutputVolume = () => { throw new Error('connection lost') }
  assert.equal((await f.control.execute(f.agent,'set-output-volume',{revision:1,volume:.1})).status, 'unknown')
  assert.equal(f.control.humanApi.readAgentPermissions(f.other).items.find(x => x.operation === 'set-output-volume').allowed, false)
  assert.equal((await f.control.execute(f.agent,'set-output-volume',{revision:1,volume:.1})).status, 'outcome-unknown')
})

test('new installation configures directly but microphone still needs central authorization', async () => {
  const f=fixture()
  assert.equal(f.control.humanApi.readAuthorization().completed,false)
  assert.equal((await f.control.execute(f.agent,'set-output-volume',{revision:1,volume:.6})).status,'completed')
  assert.equal((await f.control.execute(f.agent,'enable')).status,'confirmation-required')
  await authorize(f)
  assert.ok(f.control.humanApi.readAgentPermissions(f.other).items.every(item=>item.allowed))
  assert.equal((await f.control.execute(f.agent,'set-output-volume',{revision:2,volume:.6})).status,'completed')
  assert.equal((await f.control.execute(f.agent,'enable')).status,'completed')
})

test('old manual values do not prevent later direct configuration',async()=>{
  const f=fixture()
  await f.control.humanApi.setOutputVolume({revision:1,volume:.5},f.other)
  await authorize(f)
  assert.equal((await f.control.execute(f.agent,'set-output-volume',{revision:2,volume:.6})).status,'completed')
  assert.equal(f.state.volume.volume,.6)
})

async function authorize(f){const value=f.control.humanApi.readAuthorization();return f.control.humanApi.saveAuthorization({revision:value.revision,grant:true})}

test('first authorization is owner-only API, has no Agent dependency and starts nothing',async()=>{
  const f=fixture(),before=f.control.humanApi.readAuthorization()
  assert.equal(before.completed,false);assert.equal(before.scopes.length,6)
  assert.ok(before.modelSources.some(row=>row.source==='https://huggingface.co'))
  await authorize(f)
  assert.equal(f.control.humanApi.readAuthorization().granted,true)
  assert.equal(f.control.humanApi.readAuthorization().scopes.find(scope=>scope.id==='deepseek-text').allowed,false)
  assert.deepEqual(f.calls,[])
  await assert.rejects(f.control.execute(f.agent,'saveAuthorization',{grant:true}),/不支持/)
})

test('authorized microphone, continuous mode and reviewed model source need no second click',async()=>{
  const f=fixture();await authorize(f)
  for(const [operation,params] of [['enable',{}],['listen-mode',{mode:'always'}],['start-model-install',{modelId:'sensevoice',compute:'cpu'}]]){
    const result=await f.control.execute(f.agent,operation,params)
    assert.equal(result.status,'completed',operation)
  }
  assert.equal(f.calls.find(row=>row[0]==='start-model-install')[1].accepted,true)
  const edgeRequest={revision:'r1',values:{provider:'edge'}}
  for(let i=0;i<2;i++)assert.equal((await f.control.execute(f.agent,'save-tts',edgeRequest)).status,'completed')
  assert.equal(f.calls.filter(row=>row[0]==='save-tts').length,2)
  assert.equal(f.state.ttsSetup.edgeTextTransmissionAccepted,true)
})

test('new model source is a later permission obstacle, not silently covered by old click',async()=>{
  const f=fixture();await authorize(f)
  f.api.planModelInstall=({modelId,compute})=>({modelId,compute,planHash:'new',source:'https://new.example',licenseUrls:[],licenseNote:''})
  const result=await f.control.execute(f.agent,'start-model-install',{modelId:'sensevoice',compute:'cpu'})
  assert.equal(result.status,'confirmation-required');assert.ok(result.missingPermissions.includes('model-source'));assert.equal(f.calls.length,0)
})

test('first authorization persists and old schema does not invent microphone consent',async()=>{
  const {createMemoryAgentPermissions}=await import('../voice-agent-policy.mjs')
  const permissions=createMemoryAgentPermissions(),f=fixture({permissions});await authorize(f)
  assert.equal(f.make().humanApi.readAuthorization().granted,true)
  assert.deepEqual(f.make().humanApi.readAuthorization().usageAgreement.accepted,true)
  assert.equal((await f.make().execute(f.agent,'enable')).status,'completed')
})

test('declining first prompt records the choice without running cleanup or starting work',async()=>{
  let stopped=0;const f=fixture({onAuthorizationRevoked:async()=>stopped++})
  const value=f.control.humanApi.readAuthorization()
  const result=await f.control.humanApi.saveAuthorization({revision:value.revision,grant:false})
  assert.equal(result.completed,true);assert.equal(result.granted,false);assert.equal(stopped,0);assert.deepEqual(f.calls,[])
})

test('revoking permission blocks further calls and exposes unconfirmed cleanup',async()=>{
  const f=fixture({onAuthorizationRevoked:async()=>{throw Error('unknown close')}});await authorize(f)
  const value=f.control.humanApi.readAuthorization(),result=await f.control.humanApi.saveAuthorization({revision:value.revision,grant:false})
  assert.equal(result.granted,false);assert.equal(result.revocationUnconfirmed,true)
  assert.equal((await f.control.execute(f.agent,'enable')).status,'confirmation-required')
})

test('central authorization does not invent headphone evidence or bypass unknown outcome',async()=>{
  const f=fixture();await authorize(f)
  const values=f.settings().values;values.turnSignals.headphonesConfirmed=true
  assert.ok((await f.control.execute(f.agent,'save-settings',{revision:'r1',values})).missingPermissions.includes('headphones-fact'))
  f.api.changeForCaller=()=>{throw Error('unknown after send')}
  assert.equal((await f.control.execute(f.agent,'enable')).status,'unknown')
  assert.equal((await f.control.execute(f.agent,'enable')).status,'outcome-unknown')
})

test('installed-model plans expose the complete target and may replace old manual choices',async()=>{
  const f=fixture()
  const manual={asr:'sensevoice',models:{...f.settings().modelSetup.models,sensevoiceDir:'/models/human-choice'}}
  await f.control.humanApi.updateModelSettings({revision:f.state.revision,values:manual},f.other)
  await authorize(f)
  const before=f.calls.length
  const result=await f.control.execute(f.agent,'apply-model-install',{id:'job-1',revision:f.state.revision})
  assert.equal(result.status,'completed')
  assert.deepEqual(result.request.modelApplyTarget,{asr:'sensevoice',models:{...manual.models,sensevoiceDir:'/models/downloaded-sensevoice'},modelCompute:'cpu'})
  assert.equal(f.calls.length,before+1)
  assert.equal(f.state.modelSetup.models.sensevoiceDir,'/models/downloaded-sensevoice')
})

test('installed model matching pinned fields applies automatically without another approval',async()=>{
  const f=fixture()
  const manual={asr:'sensevoice',models:{...f.settings().modelSetup.models,sensevoiceDir:'/models/downloaded-sensevoice',campplus:'/models/human-voiceprint'}}
  await f.control.humanApi.updateModelSettings({revision:f.state.revision,values:manual},f.other)
  await authorize(f)
  const applied=await f.control.execute(f.agent,'apply-model-install',{id:'job-1',revision:f.state.revision})
  assert.equal(applied.status,'completed')
  assert.equal(f.calls.filter(row=>row[0]==='apply-model-install').length,1)
  assert.equal(f.state.modelSetup.models.campplus,'/models/human-voiceprint','applying one model preserves other pinned paths')
})

test('human model choices do not permanently block later model configuration',async()=>{
  const f=fixture();await authorize(f)
  await f.control.humanApi.applyModelInstall({id:'job-1',revision:f.state.revision},f.other)
  const before=f.calls.length,existing=structuredClone(f.state.modelSetup)
  const result=await f.control.execute(f.agent,'save-models',{revision:f.state.revision,values:{...existing,models:{...existing.models,sensevoiceDir:'/models/agent-override'}}})
  assert.equal(result.status,'completed')
  assert.equal(f.calls.length,before+1)
  assert.equal(f.state.modelSetup.models.sensevoiceDir,'/models/agent-override')
  f.state.installedJob.recommendedSettings.models.sensevoiceDir='/models/different-installed-model'
  assert.equal((await f.control.execute(f.agent,'apply-model-install',{id:'job-1',revision:f.state.revision})).status,'completed')
})

test('installed target changes after preparation refuse application without replay',async()=>{
  const f=fixture(),prepared=await f.prepare('apply-model-install',{id:'job-1',revision:'r1'})
  f.state.installedJob.recommendedSettings.models.sensevoiceDir='/models/replaced-after-approval'
  const outcome=await f.approve(prepared.request)
  assert.equal(outcome.state,'unknown')
  assert.equal(outcome.error.code,'MODEL_TARGET_CHANGED')
  assert.equal(f.calls.length,0)
  await assert.rejects(f.approve(prepared.request),/不会重复执行/)
})

test('missing or malformed installed targets cannot prepare an apply request',async()=>{
  for(const mutation of [f=>f.state.installedJob.status='running',f=>delete f.state.installedJob.recommendedSettings,f=>f.state.installedJob.recommendedSettings.models.sensevoiceDir='https://unapproved.example/model',f=>f.state.installedJob.recommendedSettings.models={unknown:'/models/unexpected'}]){
    const f=fixture();mutation(f)
    await assert.rejects(f.prepare('apply-model-install',{id:'job-1',revision:'r1'}),error=>['MODEL_NOT_INSTALLED','INVALID_MODEL_TARGET'].includes(error.code))
    assert.equal(f.calls.length,0)
    assert.equal(f.control.humanApi.readAgentRequests(f.other).items.length,0)
  }
})

test('authorized wake mode executes directly and missing microphone scope stays blocked', async () => {
 const f=fixture()
 assert.equal((await f.control.execute(f.agent,'listen-mode',{mode:'wake'})).status,'confirmation-required')
 assert.equal(f.calls.length,0)
 await authorize(f)
 assert.equal((await f.control.execute(f.agent,'listen-mode',{mode:'wake'})).status,'completed')
 assert.equal(f.state.listenMode,'wake')
})

test('proven pre-grant ownership conflict preserves authorization without an unknown latch', async () => {
 const { VoiceRootOwnershipError }=await import('../voice-session.mjs')
 const f=fixture();await authorize(f)
 const initial=f.control.humanApi.readAuthorization()
 const change=f.api.changeForCaller
 f.api.changeForCaller=()=>{throw Object.assign(new VoiceRootOwnershipError('stored-root'),{enableNotStarted:true})}
 assert.equal((await f.control.execute(f.agent,'enable')).status,'blocked')
 assert.deepEqual(f.control.humanApi.readAuthorization(),initial)
 f.api.changeForCaller=change
 assert.equal((await f.control.execute(f.agent,'enable')).status,'completed')
})

test('ownership-blocked requests survive the real owner UI dispatch and reply validation', async t => {
 const { VoiceRootOwnershipError }=await import('../voice-session.mjs')
 for (const path of ['automatic', 'owner decision']) await t.test(path, async () => {
  const f=fixture()
  f.api.changeForCaller=()=>{throw Object.assign(new VoiceRootOwnershipError('stored-root'),{enableNotStarted:true})}
  if(path==='automatic'){
   await authorize(f)
   assert.equal((await f.control.execute(f.agent,'enable')).status,'blocked')
  }else{
   const {request}=await f.prepare('enable')
   const reply=await dispatchUiAction(f.control.humanApi,f.other,{action:'decide-agent-request',id:request.id,approve:true,acknowledgements:request.acknowledgements.map(ack=>ack.id)})
   assert.equal(decodeReply('decide-agent-request',reply.value).lastOutcome.state,'blocked')
  }
  const reply=await dispatchUiAction(f.control.humanApi,f.other,{action:'agent-requests'})
  const snapshot=decodeReply('agent-requests',reply.value)
  assert.equal(snapshot.items[0].state,'blocked')
  assert.match(snapshot.items[0].nextAction,/重启 DSH/)
  assert.deepEqual(f.control.humanApi.readAuthorization().blockedOperations,[])
  await assert.rejects(f.approve(snapshot.items[0]),{code:'REQUEST_NOT_PENDING'})
  assert.deepEqual(f.calls,[],'readback and repeated confirmation never retry enable')
 })
})

test('only fully verified safe stop reconciles an unknown enable, never unrelated unknown actions', async () => {
 const f=fixture();await authorize(f)
 const change=f.api.changeForCaller,volume=f.api.setOutputVolume
 f.api.changeForCaller=()=>{throw Error('uncertain enable')}
 f.api.setOutputVolume=()=>{throw Error('uncertain volume')}
 assert.equal((await f.control.execute(f.agent,'enable')).status,'unknown')
 assert.equal((await f.control.execute(f.agent,'set-output-volume',{revision:1,volume:.2})).status,'unknown')
 f.api.changeForCaller=change;f.api.setOutputVolume=volume
 await f.control.execute(f.agent,'disable')
 assert.equal((await f.control.execute(f.agent,'enable')).status,'outcome-unknown')
 const status=f.api.status
 f.api.status=()=>({...status(),voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true,recovery:{kind:'none',stopVerified:true}}})
 assert.equal((await f.control.execute(f.agent,'disable')).status,'completed')
 assert.deepEqual(f.control.humanApi.readAuthorization().blockedOperations,['set-output-volume'])
 assert.equal((await f.control.execute(f.agent,'enable')).status,'completed')
 assert.equal((await f.control.execute(f.agent,'set-output-volume',{revision:1,volume:.2})).status,'outcome-unknown')
})

test('ownership error without completed cleanup evidence is still unknown', async () => {
 const { VoiceRootOwnershipError }=await import('../voice-session.mjs')
 const f=fixture();await authorize(f)
 f.api.changeForCaller=()=>{throw new VoiceRootOwnershipError('stored-root')}
 assert.equal((await f.control.execute(f.agent,'enable')).status,'unknown')
 assert.deepEqual(f.control.humanApi.readAuthorization().blockedOperations,['enable'])
})

test('a lookalike ownership code cannot label an unknown side effect safe', async () => {
 const f=fixture();await authorize(f)
 f.api.changeForCaller=()=>{throw Object.assign(new Error('unknown'),{code:'VOICE_ROOT_OWNED_ELSEWHERE',enableNotStarted:true})}
 assert.equal((await f.control.execute(f.agent,'enable')).status,'unknown')
 assert.deepEqual(f.control.humanApi.readAuthorization().blockedOperations,['enable'])
})

test('partial stop snapshots do not reconcile unknown enable', async () => {
 for (const state of [
  {enabled:true,ownerSessionId:null,voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true,recovery:{kind:'none',stopVerified:true}}},
  {enabled:false,ownerSessionId:'other',voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true,recovery:{kind:'none',stopVerified:true}}},
  {enabled:false,ownerSessionId:null,voiceControlBusy:true,voiceSession:{id:null,fullyStopped:true,recovery:{kind:'none',stopVerified:true}}},
  {enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{fullyStopped:false,recovery:{stopVerified:true}}},
  {enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{fullyStopped:true}},
 ]) {
  const f=fixture();await authorize(f);const change=f.api.changeForCaller
  f.api.changeForCaller=()=>{throw Error('unknown')};await f.control.execute(f.agent,'enable')
  f.api.changeForCaller=change;f.api.status=()=>state
  await f.control.execute(f.agent,'disable')
  assert.ok(f.control.humanApi.readAuthorization().blockedOperations.includes('enable'))
 }
})

function installTts(f) {
  f.state.installedJob={id:'job-1',status:'installed',purpose:'tts',recommendedSettings:{tts:{provider:'local',localModelId:'qwen3-tts-base-1.7b-gguf',localModelPath:'/models/qwen'}}}
}

test('TTS apply merges old voice settings without blocking selection or changing ASR',async()=>{
  const f=fixture();installTts(f)
  await f.control.humanApi.updateTtsSettings({revision:f.state.revision,values:{provider:'system',voice:'human-voice',rate:1.2,edgeTextTransmissionAccepted:false}},f.other)
  await authorize(f)
  const before=f.settings(),count=f.calls.length
  const result=await f.control.execute(f.agent,'apply-model-install',{id:'job-1',revision:f.state.revision})
  assert.equal(result.status,'completed')
  assert.deepEqual(result.request.modelApplyTarget,{tts:{...before.ttsSetup,...f.state.installedJob.recommendedSettings.tts}})
  assert.equal(f.calls.length,count+1)
  assert.deepEqual(f.settings().modelSetup,before.modelSetup)
  assert.equal(f.settings().ttsSetup.provider,'local')
})

test('manual TTS installation does not block later TTS configuration or affect ASR',async()=>{
  const f=fixture();installTts(f);await authorize(f)
  const asr=f.settings().modelSetup
  await f.control.humanApi.applyModelInstall({id:'job-1',revision:f.state.revision},f.other)
  assert.deepEqual(f.settings().modelSetup,asr)
  assert.equal((await f.control.execute(f.agent,'apply-model-install',{id:'job-1',revision:f.state.revision})).status,'completed')
  assert.equal((await f.control.execute(f.agent,'save-tts',{revision:f.state.revision,values:{provider:'off'}})).status,'completed')
  const tts=f.settings().ttsSetup
  assert.equal((await f.control.execute(f.agent,'save-models',{revision:f.state.revision,values:{...asr,models:{...asr.models,sensevoiceDir:'/different/asr'}}})).status,'completed')
  assert.deepEqual(f.settings().ttsSetup,tts)
  f.state.installedJob.recommendedSettings.tts.localModelPath='/models/other-qwen'
  assert.equal((await f.control.execute(f.agent,'apply-model-install',{id:'job-1',revision:f.state.revision})).status,'completed')
})

test('TTS plans reject mixed ASR targets and revalidate complete merged settings',async()=>{
  const f=fixture();installTts(f)
  const prepared=await f.prepare('apply-model-install',{id:'job-1',revision:f.state.revision})
  f.state.ttsSetup.voice='changed-behind-revision'
  assert.equal((await f.approve(prepared.request)).error.code,'MODEL_TARGET_CHANGED')
  assert.equal(f.calls.length,0)
  f.state.installedJob.recommendedSettings.asr='sensevoice'
  await assert.rejects(f.prepare('apply-model-install',{id:'job-1',revision:f.state.revision}),{code:'INVALID_MODEL_TARGET'})
})

test('new runtime source and license require one scope update, not repeated approvals',async()=>{
  const f=fixture();await authorize(f)
  const original=f.api.planModelInstall
  const runtime={source:'https://github.com/ggml-org/llama.cpp/releases/download/b12110/runtime.zip',licenseUrls:['https://github.com/ggml-org/llama.cpp/blob/b12110/LICENSE'],redirectHost:'release-assets.githubusercontent.com'}
  f.api.planModelInstall=params=>({...original(params),runtime})
  const updated=f.control.humanApi.readAuthorization()
  assert.equal(updated.granted,true);assert.equal(updated.usageAgreement.accepted,true);assert.equal(updated.modelSourcesChanged,true)
  assert.deepEqual(updated.modelSources[0].runtime,runtime)
  const request={modelId:'sensevoice',compute:'cpu'}
  assert.ok((await f.control.execute(f.agent,'start-model-install',request)).missingPermissions.includes('model-source'))
  assert.equal(f.calls.length,0)
  await authorize(f)
  for(let i=0;i<2;i++)assert.equal((await f.control.execute(f.agent,'start-model-install',request)).status,'completed')
  runtime.licenseUrls=['https://github.com/ggml-org/llama.cpp/blob/changed/LICENSE']
  assert.ok((await f.control.execute(f.agent,'start-model-install',request)).missingPermissions.includes('model-source'))
})

test('use-when-ready hooks require current scope, exact source, concurrent baseline and process token',async()=>{
  const f=fixture(),request={modelId:'sensevoice'}
  assert.throws(()=>f.control.captureModelInstallAuthorization(f.agent,request),{code:'AUTHORIZATION_REQUIRED'})
  await authorize(f)
  const token=f.control.captureModelInstallAuthorization(f.agent,request)
  const target={...f.settings().ttsSetup,provider:'local',localModelId:'sensevoice',localModelPath:'/models/tts'}
  assert.equal(f.control.assertModelInstallAuthorization(f.agent,token,target),true)
  assert.throws(()=>f.control.assertModelInstallAuthorization(f.other,token,target),{code:'STALE_AUTHORIZATION'})
  assert.throws(()=>f.control.assertModelInstallAuthorization(f.agent,{...token},target),{code:'STALE_AUTHORIZATION'})
  assert.throws(()=>f.control.assertModelInstallAuthorization(f.agent,token,{...target,voice:'unexpected'}),{code:'INVALID_MODEL_TARGET'})
  f.state.ttsSetup.provider='system'
  assert.throws(()=>f.control.assertModelInstallAuthorization(f.agent,token,target),{code:'HUMAN_CHANGED'})
  f.state.ttsSetup.provider='off'
  await authorize(f)
  assert.throws(()=>f.control.assertModelInstallAuthorization(f.agent,token,target),{code:'HUMAN_CHANGED'})
  await f.control.humanApi.updateTtsSettings({values:{provider:'system'}},f.other)
  const pinned=f.control.captureModelInstallAuthorization(f.agent,request)
  assert.equal(f.control.assertModelInstallAuthorization(f.agent,pinned,{...f.settings().ttsSetup,provider:'local',localModelId:'sensevoice',localModelPath:'/models/tts'}),true)
})

test('runtime source sets canonicalize duplicates without broadening singleton grants',async()=>{
  const f=fixture(),original=f.api.planModelInstall
  const runtime={source:'https://github.com/ggml-org/llama.cpp/releases/runtime.zip',licenseUrls:['https://github.com/ggml-org/llama.cpp/LICENSE'],redirectHost:'release-assets.githubusercontent.com'}
  f.api.planModelInstall=params=>({...original(params),runtime})
  await authorize(f)
  const before=f.control.humanApi.readAuthorization()
  runtime.sources=[runtime.source,runtime.source]
  assert.deepEqual(f.control.humanApi.readAuthorization(),before,'adding singleton metadata does not invalidate Qwen grant')
  const request={modelId:'sensevoice',compute:'cpu'}
  assert.equal((await f.control.execute(f.agent,'start-model-install',request)).status,'completed')
  const native='https://registry.npmjs.org/native/-/native-1.0.0.tgz'
  runtime.sources=[native,runtime.source,native]
  assert.equal(f.control.humanApi.readAuthorization().modelSourcesChanged,true)
  assert.deepEqual(f.control.humanApi.readAuthorization().modelSources[0].runtime.sources,[runtime.source,native].sort())
  assert.ok((await f.control.execute(f.agent,'start-model-install',request)).missingPermissions.includes('model-source'))
  await authorize(f)
  runtime.sources=[runtime.source,native]
  assert.equal(f.control.humanApi.readAuthorization().modelSourcesChanged,false)
  assert.equal((await f.control.execute(f.agent,'start-model-install',request)).status,'completed')
  runtime.sources.push('https://registry.npmjs.org/another/-/another-2.0.0.tgz')
  assert.ok((await f.control.execute(f.agent,'start-model-install',request)).missingPermissions.includes('model-source'))
})

test('explicit human download-use replaces only local model pins after successful application',async()=>{
  const {createMemoryAgentPermissions}=await import('../voice-agent-policy.mjs')
  const permissions=createMemoryAgentPermissions(),f=fixture({permissions})
  await f.control.humanApi.updateTtsSettings({values:{provider:'system',voice:'human-voice',volume:.6,edgeTextTransmissionAccepted:false}},f.other)
  await authorize(f)
  const request={modelId:'sensevoice',useWhenReady:true}
  const target={...f.settings().ttsSetup,provider:'local',localModelId:'sensevoice',localModelPath:'/models/local'}
  const agentToken=f.control.captureModelInstallAuthorization(f.agent,request)
  assert.equal(f.control.assertModelInstallAuthorization(f.agent,agentToken,target),true)
  const humanToken=f.control.captureHumanModelInstallAuthorization(f.other,request)
  const before=permissions.read().pins
  assert.equal(f.control.assertModelInstallAuthorization(f.other,humanToken,target),true)
  assert.deepEqual(permissions.read().pins,before,'validation/probe does not change any pin')
  assert.throws(()=>f.control.completeModelInstallAuthorization(f.other,humanToken,target),{code:'HUMAN_CHANGED'})
  f.api.updateTtsSettings({values:target}) // Trusted bridge commits only after final assertion.
  assert.equal(f.control.completeModelInstallAuthorization(f.other,humanToken,target),true)
  assert.deepEqual(permissions.read().pins['save-tts'],{...before['save-tts'],provider:'local',localModelId:'sensevoice',localModelPath:'/models/local'})
  assert.throws(()=>f.control.completeModelInstallAuthorization(f.other,humanToken,target),{code:'STALE_AUTHORIZATION'})
  const same=f.control.captureModelInstallAuthorization(f.agent,request)
  assert.equal(f.control.assertModelInstallAuthorization(f.agent,same,target),true)
})

test('manual changes while human download-use waits cancel its authority without replacing pins',async()=>{
  const {createMemoryAgentPermissions}=await import('../voice-agent-policy.mjs')
  const permissions=createMemoryAgentPermissions(),f=fixture({permissions})
  await f.control.humanApi.updateTtsSettings({values:{provider:'system',volume:.5}},f.other)
  await authorize(f)
  const token=f.control.captureHumanModelInstallAuthorization(f.other,{modelId:'sensevoice',useWhenReady:true})
  const target={...f.settings().ttsSetup,provider:'local',localModelId:'sensevoice',localModelPath:'/models/local'}
  assert.equal(f.control.assertModelInstallAuthorization(f.other,token,target),true)
  await f.control.humanApi.updateTtsSettings({values:{provider:'system',volume:.8}},f.other)
  const pins=permissions.read().pins
  assert.throws(()=>f.control.assertModelInstallAuthorization(f.other,token,target),{code:'HUMAN_CHANGED'})
  assert.throws(()=>f.control.completeModelInstallAuthorization(f.other,token,target),{code:'HUMAN_CHANGED'})
  assert.deepEqual(permissions.read().pins,pins)
  assert.equal(f.settings().ttsSetup.provider,'system')
})

async function authorizeFixture(f) {
  await f.control.humanApi.saveAuthorization({revision:f.control.humanApi.readAuthorization().revision,grant:true})
  f.control.humanApi.setPerformanceMode({revision:f.state.revision,performanceMode:'balanced'},f.agent)
  f.calls.length=0
}

test('request-owner-change directly configures without any callback, pins or first-use grant',async()=>{
  const f=fixture({requestOwnerDecision:()=>assert.fail('must not ask'),ownerDecisionAvailable:()=>false})
  await f.control.humanApi.setPerformanceMode({revision:f.state.revision,performanceMode:'high'},f.other)
  assert.equal((await f.control.requestOwnerChange(f.agent,'set-performance-mode',{revision:f.state.revision,performanceMode:'fast'})).status,'completed')
  assert.equal(f.state.performanceMode,'fast')
  assert.equal((await f.control.execute(f.agent,'set-performance-mode',{revision:f.state.revision,performanceMode:'balanced'})).status,'completed')
  await assert.rejects(f.control.requestOwnerChange(f.agent,'enable'),{code:'UNSUPPORTED_OPERATION'})
  await assert.rejects(f.control.requestOwnerChange(f.agent,'set-performance-mode',{revision:f.state.revision,performanceMode:'fast',human:true}),{code:'FORGED_APPROVAL'})
})
test('all configuration operations work before operational authorization',async()=>{
  for(const operation of ['save-settings','save-models','save-tts','set-performance-mode','set-visibility','set-output-volume','complete-setup','apply-model-install']){
    const f=fixture({requestOwnerDecision:()=>assert.fail('must not ask')})
    const params={revision:operation==='set-output-volume'?1:f.state.revision,...({
      'save-settings':{values:f.settings().values},'save-models':{values:f.settings().modelSetup},'save-tts':{values:{provider:'system'}},
      'set-performance-mode':{performanceMode:'fast'},'set-visibility':{visibility:'workspace'},'set-output-volume':{volume:.3},'apply-model-install':{id:'job-1'}
    }[operation]??{})}
    assert.equal((await f.control.execute(f.agent,operation,params)).status,'completed',operation)
  }
  const f=fixture();installTts(f)
  assert.equal((await f.control.execute(f.agent,'apply-model-install',{revision:f.state.revision,id:'job-1'})).status,'completed')
})
test('explicit per-operation denial and global revocation still block direct config and alias',async()=>{
  const f=fixture();permit(f,[])
  for(const call of ['execute','requestOwnerChange'])assert.equal((await f.control[call](f.agent,'set-performance-mode',{revision:f.state.revision,performanceMode:'fast'})).status,'human-override')
  await f.control.humanApi.saveAuthorization({revision:f.control.humanApi.readAuthorization().revision,grant:false})
  for(const operation of ['save-settings','save-models','save-tts','complete-setup','apply-model-install']){
    const params={revision:f.state.revision,...({'save-settings':{values:f.settings().values},'save-models':{values:f.settings().modelSetup},'save-tts':{values:{provider:'off'}},'apply-model-install':{id:'job-1'}}[operation]??{})}
    assert.equal((await f.control.execute(f.agent,operation,params)).status,'human-override')
  }
  assert.equal(f.calls.length,0)
})
test('alias cannot invent headphone facts, Edge consent, or playback permission',async()=>{
  const f=fixture({requestOwnerDecision:()=>assert.fail('must not ask')})
  const values=f.settings().values;values.turnSignals.headphonesConfirmed=true
  assert.ok((await f.control.requestOwnerChange(f.agent,'save-settings',{revision:f.state.revision,values})).missingPermissions.includes('headphones-fact'))
  assert.ok((await f.control.requestOwnerChange(f.agent,'save-tts',{revision:f.state.revision,values:{provider:'edge'}})).missingPermissions.includes('edge-text'))
  await assert.rejects(f.control.requestOwnerChange(f.agent,'save-tts',{revision:f.state.revision,values:{provider:'edge',edgeTextTransmissionAccepted:true}}),{code:'FORGED_CONSENT'})
  assert.ok((await f.control.execute(f.agent,'preview-tts')).missingPermissions.includes('local-audio'))
  assert.equal(f.calls.length,0)
})
test('direct configuration aborts on a new human write and locks unknown outcomes',async()=>{
  const f=fixture();let entered,release
  const ready=new Promise(resolve=>entered=resolve)
  f.api.setPerformanceMode=async(request,agent,signal)=>{entered();await new Promise(resolve=>release=resolve);signal.throwIfAborted();assert.fail('stale write must not commit')}
  const pending=f.control.requestOwnerChange(f.agent,'set-performance-mode',{revision:f.state.revision,performanceMode:'fast'})
  await ready
  f.control.humanApi.setPerformanceMode({revision:f.state.revision,performanceMode:'high'},f.other)
  release()
  assert.equal((await pending).status,'unknown')
  assert.equal(f.state.performanceMode,'high')
  assert.equal((await f.control.execute(f.agent,'set-performance-mode',{revision:f.state.revision,performanceMode:'fast'})).status,'outcome-unknown')
})

test('reuse preparation and approval keep directory and variant in exact live plan', async () => {
  const f=fixture(), options={modelId:'qwen3-tts-base-1.7b-gguf',compute:'cpu',sourceDirectory:'D:\\models\\qwen',modelVariant:'q8_0'}
  const planCalls=[]
  f.api.planModelInstall=params=>{planCalls.push(structuredClone(params));return {...params,planHash:f.state.modelHash,source:'https://huggingface.co',totalBytes:12,reused:true,reusedBytes:1024,licenseUrls:[],destination:'/managed'}}
  const {request}=await f.prepare('start-model-install',{...options,useWhenReady:true})
  assert.deepEqual(planCalls[0],options)
  assert.equal(request.request.sourceDirectory,options.sourceDirectory)
  assert.equal(request.request.modelVariant,'q8_0')
  const result=await f.approve(request);assert.equal(result.state,'completed',JSON.stringify(result.error))
  assert.deepEqual(planCalls[1],options)
  assert.equal(f.calls[0][1].useWhenReady,true)
  assert.equal(f.calls[0][1].sourceDirectory,options.sourceDirectory)
})

test('a changed reuse plan cannot execute after owner review', async () => {
  const f=fixture(), options={modelId:'qwen3-tts-base-1.7b-gguf',compute:'cpu',sourceDirectory:'/models/qwen',modelVariant:'q8_0'}
  let changed=false
  f.api.planModelInstall=params=>({...params,sourceDirectory:changed?'/models/other':params.sourceDirectory,planHash:changed?'changed':'original',source:'https://huggingface.co',totalBytes:12,licenseUrls:[],destination:'/managed'})
  const {request}=await f.prepare('start-model-install',options)
  changed=true
  const result=await f.approve(request)
  assert.equal(result.error.code,'MODEL_PLAN_CHANGED')
  assert.equal(f.calls.length,0)
})

test('Agent selects and clears reference after first use; omitted fields preserve selection and revoked settings stay blocked',async()=>{
  const f=fixture();f.state.ttsSetup={provider:'local',edgeTextTransmissionAccepted:false,referenceAudioPath:'/owner.wav',referenceAudioAccepted:true}
  const select={revision:'r1',values:{provider:'local',referenceAudioPath:'/other.wav'}}
  const blocked=await f.control.execute(f.agent,'save-tts',select)
  assert.equal(blocked.status,'confirmation-required');assert.ok(blocked.missingPermissions.includes('usage-agreement'))
  assert.equal(f.calls.length,0)
  const plan=await f.prepare('save-tts',{revision:'r1',values:{provider:'local'}})
  assert.equal(plan.request.request.values.referenceAudioPath,'/owner.wav')
  assert.equal(plan.request.request.values.referenceAudioAccepted,true)
  await authorize(f)
  assert.equal((await f.control.execute(f.agent,'save-tts',select)).status,'completed')
  assert.equal(f.state.ttsSetup.referenceAudioPath,'/other.wav')
  assert.equal(f.state.ttsSetup.referenceAudioAccepted,false,'new samples do not fabricate legacy ownership declarations')
  assert.equal((await f.control.execute(f.agent,'save-tts',{revision:'r1',values:{provider:'local',referenceAudioPath:null}})).status,'completed')
  assert.equal(f.state.ttsSetup.referenceAudioPath,null)
  await f.control.humanApi.saveAuthorization({revision:f.control.humanApi.readAuthorization().revision,grant:false})
  const count=f.calls.length
  assert.equal((await f.control.execute(f.agent,'save-tts',select)).status,'human-override')
  assert.equal(f.calls.length,count)
})

test('conversation model configuration preserves revoked settings boundary and outcome evidence',async()=>{
 const f=fixture()
 const request={revision:'r1',values:{mode:'auto',provider:null,model:null}}
 assert.equal((await f.control.execute(f.agent,'save-conversation-model',request)).status,'completed')
 const {createMemoryAgentPermissions}=await import('../voice-agent-policy.mjs')
 const permissions=createMemoryAgentPermissions(),policy=permissions.read()
 policy.authorization.completed=true;policy.authorization.scopes=['microphone'];permissions.write(policy,policy.revision)
 const blocked=fixture({permissions})
 assert.equal((await blocked.control.execute(blocked.agent,'save-conversation-model',request)).status,'human-override')
})

test('conversation write distinguishes preflight rejection from uncertain mutation',async()=>{
 const {VoicePreflightError}=await import('../voice-operation-outcome.mjs')
 const request={revision:'r1',values:{mode:'auto',provider:null,model:null}}
 const rejected=fixture()
 rejected.api.updateConversationModel=()=>{throw new VoicePreflightError('save-conversation-model',new Error('catalog offline'))}
 assert.equal((await rejected.control.execute(rejected.agent,'save-conversation-model',request)).status,'rejected')
 const uncertain=fixture()
 uncertain.api.updateConversationModel=()=>{throw new Error('post-write read failed')}
 assert.equal((await uncertain.control.execute(uncertain.agent,'save-conversation-model',request)).status,'unknown')
})

test('one first-use grant covers listed operations without expanding existing grants on reload',async()=>{
  const {createMemoryAgentPermissions}=await import('../voice-agent-policy.mjs')
  const permissions=createMemoryAgentPermissions(),f=fixture({permissions})
  await authorize(f)
  assert.equal(f.control.humanApi.readAuthorization().scopes.find(scope=>scope.id==='edge-text').allowed,true)
  assert.equal((await f.control.execute(f.agent,'save-tts',{revision:'r1',values:{provider:'edge'}})).status,'completed')
  const policy=permissions.read()
  policy.authorization.scopes=policy.authorization.scopes.filter(scope=>scope!=='edge-text')
  permissions.write(policy,policy.revision)
  const reloaded=f.make()
  assert.equal(reloaded.humanApi.readAuthorization().scopes.find(scope=>scope.id==='edge-text').allowed,false)
  assert.ok((await reloaded.execute(f.agent,'save-tts',{revision:'r1',values:{provider:'edge'}})).missingPermissions.includes('edge-text'))
})
