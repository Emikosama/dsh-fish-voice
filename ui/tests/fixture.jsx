// Keyless browser assembly fixture: real Cordis, SlotRegistry, renderer, and DSH primitives.
// Session selection, locale and command transport are fixtures, not the full DSH host.
import * as React from 'react'
import * as Jsx from 'react/jsx-runtime'
import * as ReactDOM from 'react-dom'
import { Context, Service } from '@deepseek-ai/cordis'
import * as Renderer from 'dsh-fixture-renderer'
import { Button } from 'dsh-fixture-button'
import { Checkbox } from 'dsh-fixture-checkbox'
import { Input } from 'dsh-fixture-input'
import { MenuSurface } from 'dsh-fixture-menu-surface'
import { createFloatingLayout } from './fixtures/floating-layout.mjs'

const bundleId = window.__whaleRegistration.id
const ctx = new Context()
await ctx.plugin({ inject: Renderer.inject, apply: Renderer.apply }).await()
const observable = initial => {
  let value = initial
  const listeners = new Set()
  return { getSnapshot: () => value, subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }, set(next) { value = next; for (const fn of listeners) fn() } }
}
const binding = id => ({ key: id, ctx, hooks: {}, keyedHooks: {}, props: { sessionId: id } })
const selection = observable(binding('session-A'))
ctx.slots.installScope('session', { current: selection, bindingSource: () => selection, renderArea: (_binding, props) => props.children })
ctx.slots.installScope('session-maybe', { current: selection, bindingSource: () => selection, renderArea: (_binding, props) => props.children })
const dictionaries = new Map()
const locale = { getSnapshot: () => ({ revision: 0 }), subscribe: () => () => {}, bind: ns => key => dictionaries.get(ns)?.zh[key] ?? key,
  register(ns, values) { dictionaries.set(ns, values); return () => dictionaries.delete(ns) } }
ctx.provide('locale', locale)
ctx.slots.installLocale(locale)
const panelInfo = observable({ activePanelId:null })
ctx.provide('layout', { panelInfo })
ctx.provide('uiSession', { adapter:{ current:selection } })
// Deliberately no pluginNavigation service or plugins.bundle.config slot.
let owner = null
let activeVoice = null
let existingVoiceSessionId = null, existingSessionSupported = true
const existingSessions = [
  { sessionId:'design-review',title:'产品设计走查',availability:'ready',updatedAt:1784400960000 },
  { sessionId:'project-notes',title:'项目记录',availability:'ready',updatedAt:1784398800000 },
  { sessionId:'last-prototype',title:'上月原型',availability:'archived',updatedAt:1781808960000 },
  { sessionId:'architecture-review',title:'架构复盘',availability:'busy',updatedAt:1781808960000 },
  { sessionId:'same-name-left',title:'同名会话',availability:'ready',updatedAt:1781808960000 },
  { sessionId:'same-name-right',title:'同名会话',availability:'busy',updatedAt:1781808960000 },
  { sessionId:'last-page',title:'追加验收会话',availability:'ready',updatedAt:1781808960000 },
  { sessionId:'lost-workspace',title:'已迁移的会话',availability:'unavailable',updatedAt:1781808960000 },
  { sessionId:'shown-voice',title:'公开显示的语音会话',availability:'unavailable',unavailableReason:'managed',updatedAt:1781808960000 },
]
const existingBinding = () => existingSessions.find(row => row.sessionId === existingVoiceSessionId) ?? null
let recoveryConflict = false
let targetOccupied = false
let recoveryRestart = false
let helperRecovery = null
let version = 1
let listenMode = 'ptt'
let helperOnline = true, helperModeKnown = true
let visibility = 'hidden'
let performanceMode = 'compatibility'
let availableModes = ['fast','balanced','high']
let hiddenSupported = true
const voiceCapabilities = () => ({ configuredVisibility: visibility, hidden: { supported: hiddenSupported, reason: hiddenSupported ? null : 'native-presentation-unavailable' }, workspace: { supported: true, reason: null }, taskHandoff: { supported: true, mode: 'compat_domain_v1', reason: null } })
let signalsSupported = true
let modelSetup = { asr: 'sensevoice', models: { sensevoiceDir: '/fixture/sensevoice', campplus: '' } }
let values = { wakeWordAliases:['小鲸鱼'],wakeListenTimeoutMs:10000,semanticExperimental:false, device: null, pttMouse: 2, pttKeyboard: null, speakerVerification: { enabled: false }, turnSignals: { enabled: true, volume: 0.2, headphonesConfirmed: false, experimentalAutomaticBargeIn: false } }
let outputDevice = null
let audioInventory = {schema:1,input:{status:'available',items:[{backend:'winmm',id:'fixture-mic',name:'USB 麦克风'}],reason:null},output:{status:'available',items:[{backend:'winmm',id:'fixture-speaker',name:'扬声器（Realtek）'},{backend:'winmm',id:'fixture-headphones',name:'USB 耳机'}],reason:null}}
let onboarding = { version: 1, completed: true }
const defaultTts = { provider:'system', systemVoiceId:null, deepseekVoice:'stella', deepseekTextTransmissionAccepted:false, volume:.8, localModelId:null, localModelPath:null, referenceAudioPath:null }
const systemVoices = [{id:'fixture-zh',name:'Microsoft Huihui Desktop',language:'zh-CN'},{id:'fixture-en',name:'Microsoft Zira Desktop',language:'en-US'}]
let ttsSetup = { ...defaultTts, provider:'off' }
let deepseekKeyAvailable = true
let ttsRuntime = { state: 'idle', busy: false, blocked: false }
let finishPreview = null
const modelSubscribers = new Set()
const timestamp = '2026-11-11T00:00:00.000Z'
const capability = available => ({ available, reason: available ? null : 'fixture: backend unavailable', runtimeLoaded: false })
const compute = { schema: 1, default: 'cpu', observedAt: timestamp, backends: { sensevoice: { cpu: capability(true), cuda: capability(false) } } }
const model = (id, title, available) => ({ id, title, available, backend: available ? 'sensevoice' : null, reason: available ? null : 'Qwen adapter not validated', totalBytes: available ? 1048576 : null, source: available ? 'https://models.example.invalid/fixture' : null, licenseUrls: [], licenseNote: 'Fixture license', runtimeLoaded: false, recommendation: { modelId: id, confidence: 'not-assessed', recommended: false, badge: null, state: 'manual-choice', reason: 'Fixture only; choose manually.' } })
const installer = { schema: 1, hardware: { observedAt: timestamp, scope: 'plugin-host', platform: 'win32', arch: 'x64', cpuLogicalCores: 8, totalMemoryBytes: 17179869184, availableMemoryBytes: 8589934592, gpuMemoryBytes: null, gpuMemoryReason: 'Not detected' }, compute, models: [model('sensevoice-int8-2024-07-17', 'SenseVoice INT8', true), model('qwen3-tts', 'Qwen3-TTS', false)], jobs: [] }
const emitModels = () => { for (const listener of modelSubscribers) listener() }
const calls = []
const transportCalls = []
const clientOperationEvents = new Map()
const fixtureOperationScope = '856ece80-e559-4ef5-99d1-b4a763afe619'
let operationTransportDown = false, pendingRequestFailure
const subscribers = new Set()
let mountedRemotes = 0
let replyRows = []
let inputActive = false, inputError = null
let outputVolume = 0.5
let outputRevision = 1
let failVolume = false
let conversationRevision = 0
let inputDelivery, retryTranscripts = null, retryReceipt, existingSessionRead, dropRetryReceipt = false
const updateSubscribers = new Set()
const updateBase = { schema:1,currentVersion:'0.5.39-rc.21',channel:'preview',checkedAt:null,release:null,message:null,canInstall:false }
let update = { ...updateBase,status:'current',revision:0 }
let updateAcceptance, statusReceipt
let senseVoice = { selected:true,state:'ready',receivedBytes:100,totalBytes:100,message:null }
const setUpdate = patch => {
  update = { ...updateBase,...patch,revision:update.revision + 1 }
  for (const notify of updateSubscribers) notify()
}
const conversation = id => ({ revision: conversationRevision, rootSessionId: owner ? activeVoice : null, title: null, latest: owner ? replyRows.filter(item => item.role === 'assistant').at(-1) ?? null : null, items: owner ? replyRows : [], inputActive: Boolean(owner) && inputActive, inputError: owner ? inputError : null, inputDelivery: structuredClone(inputDelivery), retryTranscripts: !id && owner===existingVoiceSessionId ? structuredClone(retryTranscripts) : null, playbackConfirmed: false,helper:{online:Boolean(owner)&&helperOnline,listenMode:owner&&helperOnline&&helperModeKnown?listenMode:null},wake:{state:owner&&listenMode==='wake'?'waiting':'disabled',deadlineAt:null,streamOpen:Boolean(owner&&listenMode==='wake'),detection:'asr-after-utterance'} })
const emitConversation = () => { conversationRevision++; for (const listener of subscribers) listener() }
const volumeSnapshot = () => ({ supported: true, backend: 'dsh-speak', volume: outputVolume, revision: outputRevision, apply: 'next-output', reason: null })
let authRevision=1, authorized=true, authorizationCompleted=true, deepseekAuthorized=false
// Browser-only copy; the Node harnesses compare version and every paragraph
// against voice-agent-policy.mjs without bundling its filesystem/crypto imports.
const usageAgreement={version:1,text:[
  '允许 Agent 管理鱼应的麦克风、聆听方式、本地音频、设置和下列模型下载。',
  'DeepSeek 官方朗读单独启用，启用后会将朗读文字发送至 DeepSeek。音色样本使用本人或已获使用授权的声音。',
]}
const authSnapshot=()=>({schema:1,revision:String(authRevision),completed:authorizationCompleted,granted:authorized,usageAgreement:{...usageAgreement,accepted:authorizationCompleted,text:[...usageAgreement.text]},blockedOperations:[],revocationUnconfirmed:false,scopes:[['microphone','麦克风与自由麦'],['local-audio','本地音频'],['settings','设置与对话'],['deepseek-text','DeepSeek 语音合成'],['model-download','模型下载']].map(([id,title])=>({id,title,description:'仅按列明用途使用，人工设置优先。',allowed:id==='deepseek-text'?deepseekAuthorized:authorized})),modelSources:[{modelId:'sensevoice',source:'https://models.example.invalid/fixture',licenseUrls:['https://models.example.invalid/license'],licenseNote:'Fixture license'}],restrictions:['系统权限按操作系统提示，敏感数据不在普通授权内。']})
const whaleConversation = {
  async *followUpdates(signal) {
    let dirty = true, wake
    const notify = () => { dirty = true; wake?.(); wake = undefined }
    updateSubscribers.add(notify); signal.addEventListener('abort', notify, { once:true })
    try {
      while (!signal.aborted) {
        if (!dirty) await new Promise(resolve => { wake = resolve })
        if (signal.aborted) break
        dirty = false
        yield structuredClone(update)
      }
    } finally { updateSubscribers.delete(notify); signal.removeEventListener('abort', notify) }
  },
  async updateAction(request) {
    transportCalls.push({ method:'updateAction',request })
    if (request.action === 'install') {
      if (request.version !== update.release?.version || !update.canInstall) throw Error('Version changed')
      if (updateAcceptance) {
        const acceptance = updateAcceptance
        setUpdate({ ...update,status:'installing',canInstall:false })
        const snapshot = structuredClone(update)
        await acceptance.promise
        return { ok:true,value:snapshot }
      }
      setUpdate({ ...update,status:'restart-required',canInstall:false })
    }
    return { ok:true,value:structuredClone(update) }
  },
  async readClientOperationScope(signal) {
    signal?.throwIfAborted()
    return { ok:true,value:{ scope:sessionStorage.getItem('fixture-operation-scope') ?? fixtureOperationScope } }
  },
  async recordClientOperations({ scope, events }, signal) {
    signal?.throwIfAborted()
    transportCalls.push({ method:'recordClientOperations' })
    if (operationTransportDown) throw Error('Fixture diagnostic transport unavailable')
    if (scope !== (sessionStorage.getItem('fixture-operation-scope') ?? fixtureOperationScope))
      return { ok:true,value:{ accepted:false } }
    for (const event of events) clientOperationEvents.set(event.id, structuredClone(event))
    return { ok:true, value:{ accepted:true } }
  },
  async readOperationLog({ cursor }, signal) {
    signal?.throwIfAborted()
    transportCalls.push({ method:'readOperationLog' })
    const rows = [...clientOperationEvents.values()]
    const head = cursor ? Math.ceil(rows.length / 2) : 0
    const end = cursor ? rows.length : Math.ceil(rows.length / 2)
    return { ok:true, value:{text:rows.slice(head,end).map(event => JSON.stringify(event)+'\n').join(''),nextCursor:cursor || end === rows.length ? null : 'next'} }
  },
  async manageSessions(id, request, signal) {
    signal?.throwIfAborted()
    transportCalls.push({ method:'manageSessions', id, request })
    return { ok:true, value:JSON.stringify({ items:[],nextCursor:null }) }
  },
  async listExistingVoiceSessions(request, signal) {
    signal?.throwIfAborted()
    transportCalls.push({ method:'listExistingVoiceSessions', request })
    if (!existingSessionSupported) throw Error('会话目录暂不可用')
    if (request.sessionId) {
      if (existingSessionRead) await existingSessionRead.promise
      signal?.throwIfAborted()
      const items = existingSessions.filter(row => row.sessionId === request.sessionId)
      return { ok:true, value:structuredClone({ items, nextCursor:null, binding:existingBinding() }) }
    }
    const query = (request.query ?? '').toLowerCase()
    const matches = existingSessions.filter(row => row.title.toLowerCase().includes(query) || row.sessionId.includes(query))
    const start = +(request.cursor ?? 0), end = start + 3
    return { ok:true, value:structuredClone({ items:matches.slice(start, end), nextCursor:end < matches.length ? String(end) : null, binding:existingBinding() }) }
  },
  async setExistingVoiceSession(request, signal) {
    signal?.throwIfAborted()
    transportCalls.push({ method:'setExistingVoiceSession', request })
    if (owner || request.expectedSessionId !== existingVoiceSessionId) throw Error('会话状态已变化，请重新选择。')
    if (request.sessionId !== null && (!existingSessionSupported || !existingSessions.some(row => row.sessionId === request.sessionId && ['ready','busy'].includes(row.availability)))) throw Error('所选会话暂不可用。')
    existingVoiceSessionId = request.sessionId
    return { ok:true,value:{binding:structuredClone(existingBinding())} }
  },
  async retryVoiceTranscript({ id }, signal) {
    signal?.throwIfAborted()
    transportCalls.push({ method:'retryVoiceTranscript', id })
    const row = retryTranscripts?.items.find(item => item.id === id)
    if (!owner || owner !== existingVoiceSessionId || retryTranscripts?.sessionId !== owner || row?.state !== 'ready') return { ok:true, value:{ accepted:false } }
    if (retryReceipt) await retryReceipt.promise
    if (dropRetryReceipt) { dropRetryReceipt = false; throw Error('Fixture retry response lost') }
    retryTranscripts.items = retryTranscripts.items.filter(item => item.id !== id)
    inputDelivery = { ...row, sessionId:owner, state:'queued' }
    emitConversation()
    return { ok:true, value:{ accepted:true } }
  },
  async senseVoiceAsrAction(request) {
    transportCalls.push({ method:'senseVoiceAsrAction',request })
    return { ok:true,value:structuredClone(senseVoice) }
  },
  async readAuthorization(){transportCalls.push({method:'readAuthorization'});return{ok:true,value:authSnapshot()}},
  async saveAuthorization(request){transportCalls.push({method:'saveAuthorization',request});if(request.revision!==String(authRevision))throw Error('stale authorization');authorized=request.grant;if(!authorized)deepseekAuthorized=false;authorizationCompleted=true;authRevision++;return{ok:true,value:authSnapshot()}},
  async action(id, request, signal) {
    signal?.throwIfAborted()
    transportCalls.push({ method:'action', id, action:request.action })
    if (pendingRequestFailure === request.action) {
      pendingRequestFailure = undefined
      throw Error('Fixture interrupted private response 43b7')
    }
    const value = await executeAction(id, request, signal)
    if (request.action === 'listen-mode') {
      // The raw audio bridge's status does not carry the owner adapter's
      // existing-session metadata. Explicit status reads do.
      delete value.existingVoiceSession
      delete value.existingVoiceSessionSupported
    }
    if (request.action === 'status' && statusReceipt) await statusReceipt.promise
    return { ok:true, value:JSON.stringify({ protocol:1, action:request.action, value }) }
  },
  async readSetup(signal) { signal?.throwIfAborted(); transportCalls.push({ method: 'readSetup' }); return { ok: true, value: { ...onboarding } } },
  async *followModels(id, signal) {
    transportCalls.push({ method: 'followModels', id })
    let dirty = true, wake
    const notify = () => { dirty = true; wake?.(); wake = undefined }
    modelSubscribers.add(notify); signal.addEventListener('abort', notify, { once: true })
    try { while (!signal.aborted) { if (!dirty) await new Promise(resolve => { wake = resolve }); if (signal.aborted) break; dirty = false; yield structuredClone(installer) } }
    finally { modelSubscribers.delete(notify); signal.removeEventListener('abort', notify) }
  },
  async *follow(id, signal) {
    transportCalls.push({ method: 'follow', id })
    let dirty = true, wake
    const notify = () => { dirty = true; wake?.(); wake = undefined }
    subscribers.add(notify); signal.addEventListener('abort', notify, { once: true })
    try { while (!signal.aborted) { if (!dirty) await new Promise(resolve => { wake = resolve }); if (signal.aborted) break; dirty = false; yield conversation(id) } }
    finally { subscribers.delete(notify); signal.removeEventListener('abort', notify) }
  },
  async readVolume(id) { transportCalls.push({ method:'readVolume', id }); return { ok:true, value:volumeSnapshot() } },
  async setVolume(id, request) {
    transportCalls.push({ method:'setVolume', id, request })
    if (failVolume) { failVolume = false; throw new Error('fixture volume write outcome unknown') }
    if (request.revision !== outputRevision) return {ok:false,error:new Error('fixture volume conflict')}
    outputVolume = request.volume; outputRevision++; return {ok:true,value:volumeSnapshot()}
  },
}
let permissionRevision = 1, requestRevision = 0
let agentRequests = []
const agentPermissions = { 'set-performance-mode': false, 'set-visibility': false, 'set-output-volume': false }
const permissionSnapshot = () => ({schema:1,revision:String(permissionRevision),items:Object.entries(agentPermissions).map(([operation,allowed])=>({operation,allowed,title:{'set-performance-mode':'修改回答速度','set-visibility':'修改对话显示范围','set-output-volume':'修改助手音量'}[operation],reason:null}))})
const requestSnapshot = () => ({schema:1,humanRevision:requestRevision,items:structuredClone(agentRequests)})
let delay = 0
let failNext = false
let holdProbe = new URLSearchParams(window.location.search).get('probe') === 'hold'
const pendingProbes = []
let heldDiagnostic = null
const pendingDiagnostics = []
let nextPickedPath
let captureLease = null
let customPrompt = ''
let conversationModel = {mode:'auto',provider:null,model:null}
const bindingContext = () => ({ownerSessionId:owner,epoch:'fixture-binding-epoch',rootSessionId:activeVoice})
async function executeAction(id, request, signal) {
  calls.push({ id, ...request })
  if(request.action==='pick-local-path'){
    const path=nextPickedPath===undefined?(request.kind==='referenceAudio'?'/fixture/authorized-reference.wav':'/fixture/unsaved-path'):nextPickedPath
    nextPickedPath=undefined
    return {path}
  }
  // Deliberately ignores cancellation to exercise client-side stale-reply fences.
  if (request.action === 'inspect-performance' && holdProbe) await new Promise((resolve, reject) => pendingProbes.push({ resolve, reject }))
  if (request.action === heldDiagnostic) {
    const pending = { action: request.action, signal, cancelled: signal?.aborted === true }
    const onAbort = () => { pending.cancelled = true }
    signal?.addEventListener('abort', onAbort, { once: true })
    try {
      // The bounded backend read remains live. A late successful result after
      // navigation or mute must not overwrite the newer UI state.
      pending.done = new Promise(resolve => { pending.resolve = resolve; pendingDiagnostics.push(pending) })
      await pending.done
    } finally { signal?.removeEventListener('abort', onAbort) }
  }
  // Model compute has no audio. The real disable path does wait for the TTS
  // lifecycle before its final stop receipt; mirror that boundary, not fetch abort.
  // Fixture owner is cleared on that receipt, not at production's earlier
  // authorization revocation. It does not model physical capture or grant timing.
  if (request.action === 'disable') await Promise.all(pendingDiagnostics.filter(item => item.action === 'inspect-tts').map(item => item.done))
  if (delay) await new Promise(resolve => setTimeout(resolve, delay))
  if (failNext) { failNext = false; throw new Error('测试连接在发送后中断；结果未知') }
  let value
  if(recoveryRestart&&['enable','disable'].includes(request.action))throw new Error('VOICE_PREDECESSOR_STOP_UNCONFIRMED: fully restart DSH')
  if(recoveryConflict&&['enable','disable'].includes(request.action))throw new Error('VOICE_ROOT_OWNED_ELSEWHERE: previous voice session is still active')
  if(targetOccupied && request.action === 'enable') throw Object.assign(new Error('Target already open in DSH'), {code:'VOICE_ROOT_OWNED_ELSEWHERE'})
  if(request.action==='agent-permissions')value=permissionSnapshot()
  if(request.action==='save-agent-permissions'){
    if(request.revision!==String(permissionRevision))throw new Error('Stale permission revision')
    Object.assign(agentPermissions,request.allowed);permissionRevision++;value=permissionSnapshot()
  }
  if(request.action==='agent-requests')value=requestSnapshot()
  if(request.action==='decide-agent-request'){
    const plan=agentRequests.find(item=>item.id===request.id)
    if(!plan||plan.state!=='pending')throw new Error('Request is not pending')
    if(request.approve&&plan.acknowledgements.some(item=>!request.acknowledgements.includes(item.id)))throw new Error('Missing acknowledgement')
    plan.state=request.approve?'completed':'rejected';plan.nextAction=null;requestRevision++
    value={...requestSnapshot(),lastOutcome:structuredClone(plan)}
  }
  if (request.action === 'enable' && Object.hasOwn(request,'expectedOwnerSessionId') && request.expectedOwnerSessionId!==owner) throw new Error('VOICE_OWNER_CHANGED')
  if (request.action === 'enable' && Object.hasOwn(request,'expectedExistingSessionId') && request.expectedExistingSessionId!==existingVoiceSessionId) throw new Error('VOICE_EXISTING_BINDING_CHANGED')
  if (request.action === 'enable' && existingVoiceSessionId && !['ready','busy'].includes(existingBinding()?.availability)) {
    throw Error(existingBinding()?.availability === 'archived' ? 'VOICE_EXISTING_ARCHIVED' : 'VOICE_EXISTING_UNAVAILABLE')
  }
  if (request.action === 'enable') { helperOnline = true; helperModeKnown = true; owner = existingVoiceSessionId ?? id; activeVoice = existingVoiceSessionId ?? 'voice-current'; replyRows = []; inputActive = false; inputError = null; emitConversation() }
  if (request.action === 'listen-mode') {listenMode = request.mode;version++;emitConversation()}
  if (request.action === 'disable') {
    if (retryTranscripts?.items.some(item => item.id === inputDelivery?.id)) inputDelivery = { ...inputDelivery, state:'discarded' }
    owner = null; activeVoice = null; replyRows = []; inputActive = false; inputError = null; retryTranscripts = null; emitConversation()
  }
  if (request.action === 'new') { owner = id; activeVoice = 'voice-new'; replyRows = []; inputActive = false; inputError = null; emitConversation() }
  if (request.action === 'resume') { owner = id; activeVoice = request.id; replyRows = []; inputActive = false; inputError = null; emitConversation() }
  if (['status', 'enable', 'disable', 'new', 'resume', 'listen-mode'].includes(request.action)) value = { existingVoiceSessionSupported:existingSessionSupported,existingVoiceSession:structuredClone(existingBinding()),ttsRuntime: { ...ttsRuntime }, inputDevices:{status:'available',items:[{index:1,name:'USB 麦克风'},{index:2,name:'Headset <input>'}],observedAt:1}, voiceControlBusy: false, ownerSessionId: owner, enabled: Boolean(owner), helper: { online: Boolean(owner)&&helperOnline }, capabilities: { listenMode:true }, voiceSession: { fullyStopped: !activeVoice&&!recoveryConflict&&!recoveryRestart&&!helperRecovery, recovery:{kind:helperRecovery??(recoveryRestart?'predecessor-stop-unconfirmed':recoveryConflict?'live-root-conflict':'none'),rootSessionId:recoveryConflict?'old-voice-root':null}, id: existingVoiceSessionId===activeVoice ? null : activeVoice, presentation: { requested: activeVoice ? visibility : null, hidden: visibility === 'hidden' } }, listenMode:owner&&(!helperOnline||!helperModeKnown)?null:listenMode, voiceCapabilities: voiceCapabilities() }
  if (request.action === 'inspect-performance') value = { modes: ['fast','balanced','high'].map(mode=>({performanceMode:mode,available:availableModes.includes(mode)})) }
  if (request.action === 'set-performance-mode') {
    if(owner || activeVoice || request.revision!==String(version) || !availableModes.includes(request.performanceMode))throw new Error('Stop voice and read current settings first')
    performanceMode=request.performanceMode;version++
  }
  if (request.action === 'set-visibility') {
    if (owner || activeVoice || request.revision !== String(version)) (() => { throw new Error('请先关麦并读取最新设置') })()
    visibility = request.visibility; version++
  }
  if (request.action === 'read-audio-devices') value = structuredClone(audioInventory)
  if (request.action === 'save-audio-device') {
    if (request.revision !== String(version) || request.direction === 'input' && owner) throw new Error('Stop and read current settings')
    if (request.direction === 'input') values = {...values,device:request.selection}; else outputDevice = request.selection
    version++
  }
  // Synthetic native pause receipt; real hardware is exercised separately.
  if (request.action === 'capture-bindings') {
    if (request.operation === 'begin') {
      if (captureLease) throw new Error('Binding capture is already active')
      captureLease = 'fixture-capture-token'
      value = {token:captureLease,paused:true}
    } else {
      if (request.token !== captureLease) throw new Error('Binding capture token mismatch')
      captureLease = null
      value = {token:request.token,paused:false}
    }
  }
  if (request.action === 'save-bindings') {
    if (captureLease || request.revision !== String(version) || JSON.stringify(request.bindingContext) !== JSON.stringify(bindingContext())) throw new Error('Binding revision or owner changed')
    values = {...values,...request.values}; version++
  }
  if (request.action === 'save-voice-prompt') {
    if (owner || activeVoice || request.revision !== String(version)) throw new Error('Stop and read current settings')
    customPrompt = request.values.text.trim() ? request.values.text : ''; version++
  }
  if (request.action === 'save-conversation-model') {
    if (owner || activeVoice || request.revision !== String(version)) throw new Error('Stop and read current settings')
    conversationModel = {...request.values}; version++
  }
  if (request.action === 'save-models') { modelSetup = request.values; version++ }
  if (request.action === 'save-settings') {
    if (request.revision !== String(version)) (() => { throw new Error('设置已改变，请重新读取') })()
    values = request.values; version++
  }
  if (request.action === 'save-tts') {
    if (request.revision !== String(version)) throw new Error('Stale TTS write')
    ttsSetup = request.values; version++
    if (ttsSetup.provider === 'deepseek' && ttsSetup.deepseekTextTransmissionAccepted && !deepseekAuthorized) { deepseekAuthorized=true; authRevision++ }
  }
  if (request.action === 'complete-setup') { onboarding = { version: 1, completed: true }; version++ }
  if (request.action === 'read-history') value = {rootSessionId:activeVoice??null,generation:1,revision:conversationRevision,scope:'voice-session',items:[...replyRows],nextCursor:null,truncated:false}
  if (request.action === 'conversation-models') value = {providers:[{id:'fixture-llm',name:'Fixture LLM',models:[{id:'chat',name:'Chat'}]}]}
  if (request.action === 'inspect-tts') value = { platform:'win32', playbackSupported:true, filePlaybackSupported:true, deepseekKeyAvailable, autoDownload:false, gpuSupported:false, systemVoices, systemDefaultVoiceId:systemVoices[0].id }
  if (request.action === 'preview-tts') {
    if (Object.keys(request).some(key=>!['action','revision','values'].includes(key))) throw new Error('Preview must use backend fixed text, never user content')
    if (request.values && request.revision!==String(version)) throw new Error('Stale TTS draft')
    const selected = request.values ?? ttsSetup
    if (selected.provider==='deepseek' && (!selected.deepseekTextTransmissionAccepted || !request.values&&!deepseekAuthorized)) throw new Error('DeepSeek confirmation required')
    ttsRuntime = { state: 'synthesizing', busy: true, blocked: false }
    await new Promise(resolve => { finishPreview = resolve })
    value = { provider: selected.provider, fallback: false, playbackCompleted: true, acousticConfirmation: false }
  }
  if (request.action === 'cancel-tts') { ttsRuntime = { state: 'cancelled', busy: false, blocked: false }; finishPreview?.(); finishPreview = null; value = { status: 'cancelled' } }
  if (request.action === 'model-installer') value = structuredClone(installer)
  if (request.action === 'inspect-model-compute') value = compute
  if (request.action === 'plan-model-install') value = { modelId: request.modelId, compute: request.compute, planHash: 'fixture-plan-hash', source: 'https://models.example.invalid/fixture', totalBytes: 1048576, destination: 'C:/fixture/models/sensevoice', licenseUrls: ['https://models.example.invalid/license'], licenseNote: 'Fixture license; no network request.', files: [{ name: 'fixture.onnx', bytes: 1048576, sha256: '0'.repeat(64), url: 'https://models.example.invalid/fixture.onnx' }], notice: 'Fixture plan, no real download' }
  if (request.action === 'start-model-install') {
    if (request.accepted !== true || request.planHash !== 'fixture-plan-hash') throw new Error('Explicit plan acceptance required')
    value = { id: '00000000-0000-4000-8000-000000000001', modelId: request.modelId, compute: request.compute, status: 'running', stage: 'downloading', receivedBytes: 0, totalBytes: 1048576, runtimeLoaded: false, createdAt: timestamp, updatedAt: timestamp, error: null, files: [{ name: 'fixture.onnx', bytes: 1048576, receivedBytes: 0, verified: false }] }
    installer.jobs = [value]; if(request.useWhenReady)installer.ttsInstallIntent={jobId:value.id,modelId:value.modelId,status:'waiting',reason:null}; emitModels()
  }
  if (request.action === 'control-model-install') { const job = installer.jobs.find(job => job.id === request.id); job.status = request.operation === 'pause' ? 'paused' : request.operation === 'resume' ? 'running' : 'cancelled'; job.stage = job.status; if(installer.ttsInstallIntent)installer.ttsInstallIntent.status=request.operation==='pause'?'paused':request.operation==='cancel'?'cancelled':'waiting'; emitModels(); value = { ...job } }
  if (['read-settings', 'save-voice-prompt', 'save-settings', 'save-bindings', 'save-conversation-model', 'save-audio-device', 'save-models', 'set-visibility', 'save-tts', 'complete-setup','set-performance-mode'].includes(request.action)) value = { voicePrompt:{text:customPrompt,mode:customPrompt?'custom':'agents',customSupported:true,unsupportedReason:null},bindingContext:bindingContext(),conversationModel:{...conversationModel},audioDevices:{input:values.device,output:outputDevice}, onboarding, ttsSetup, ttsRuntime, revision: String(version), values, modelSetup, voiceSession: { visibility, performanceMode }, voiceCapabilities: voiceCapabilities(), listenMode, capabilities: { turnSignals: signalsSupported, listenMode: true, pttKeyboard: { supported:true, scope:'global', platform:'win32', status:'available', reason:null } } }
  if (request.action === 'list') value = { activeId: activeVoice, nextCursor: request.cursor ? null : 'page-2', items: request.cursor ? [
    { id: 'voice-last', title: '更早的对话', archived: false, available: true, canResume: true },
  ] : [
    { id: 'voice-current', title: '与鱼应讨论下一次星灭发布计划和长会话名称省略验证', archived: false, available: true, canResume: true },
    { id: 'voice-archived', title: '已归档聊天，不应自动取消归档', archived: true, available: true, canResume: false },
    { id: 'voice-history', title: '很长的历史对话名称，用于验证窄窗口内文字换行及所有操作始终可以访问', archived: false, available: true, canResume: true },
    { id: 'voice-private', title: '', archived: false, available: false, canResume: false, reason: '权限不匹配' },
  ] }
  return value
}
// A real Service preserves Cordis associated namespace injection checks. A
// plain object here would hide production errors such as issue #9.
class FixtureRemote extends Service {
  constructor(ctx){super(ctx,'remote')}
  async $mount(contribution){if(contribution.package!=='dsh-fish-voice/conversation')throw new Error('Unexpected Remote contribution');mountedRemotes++;return async()=>{mountedRemotes--}}
}
new FixtureRemote(ctx)
ctx.provide('remote.whaleConversation',whaleConversation)
ctx.provide('remote.commands',{execute(){throw new Error('UI must never use the chat command transport')}})
const openedSessions = []
ctx.provide('sessions', {
  subagentAddress(id) {
    return id === 'finished-child' ? {childSessionId:id,parentSessionId:'session-A',mode:'continuable'} : undefined
  },
  list:{ getSnapshot: () => ({ byId:Object.fromEntries(existingSessions.map(row => [row.sessionId,row])) }) },
  refresh: async () => {},
})
ctx.provide('uiWorkspace', {
  openSession(id) {
    openedSessions.push(id)
    selection.set(binding(id))
  },
})


function Shell(props) {
  return <main className="fixture-shell">
    <header><h1>DSH 插件装配测试</h1><p>生产插件 · 真实 DSH SlotRegistry / renderer · 假传输，无录音或模型</p>
      <button onClick={() => selection.set(binding('session-A'))}>会话 A</button><button onClick={() => selection.set(binding('session-B-with-a-long-identity-for-viewport-verification'))}>会话 B</button>
      <button>返回会话</button><button onClick={() => document.body.toggleAttribute('data-ds-dark-theme')}>切换主题</button>
    </header>
    <article data-host-chat><h2>会话区</h2><textarea aria-label="消息输入" placeholder="悬浮窗不应拦截这个输入框" /></article>
    <div data-shell-overlay className="fixture-overlay">{props.renderSlot('shell.overlay', {})}</div>
  </main>
}
ctx.slots.register({ name: 'root', children: { 'shell.overlay': { kind: 'list', scope: 'root' } } }, Shell)
const moduleTable = { react: React, 'react-dom': ReactDOM, 'react/jsx-runtime': Jsx, '@deepseek-ai/dsh-client-ui-primitives': { Button, Input, Checkbox, MenuSurface } }
const exported = window.__whaleRegistration.factory(name => { if (!moduleTable[name]) throw new Error(`Unexpected module ${name}`); return moduleTable[name] })
let plugin = ctx.plugin(exported)
await plugin.await()
ctx.uiRenderer.mount(document.querySelector('#root'))
let magneticPlugin = null, magneticPeer = null
const magneticRegistrations=[]
async function mountMagneticPeer() {
  if (magneticPlugin) return
  magneticPlugin = ctx.plugin(child => {
    const layout = createFloatingLayout()
    child.reflect.provide('whaleFloatingLayout', { version:1,register(value){magneticRegistrations.push(value.id);return layout.register(value)} })
    child.effect(() => {
      const node = document.createElement('section')
      node.dataset.fixtureWatch = ''
      Object.assign(node.style, { position:'fixed',left:'520px',top:'350px',width:'260px',height:'180px',zIndex:'900',boxSizing:'border-box',padding:'8px',border:'1px solid var(--dsw-alias-border-l2)',borderRadius:'12px',background:'var(--dsw-alias-bg-layer-1)',color:'var(--dsw-alias-label-primary)' })
      const label=document.createElement('strong');label.textContent='鲸曈布局测试'
      const button=document.createElement('button');button.textContent='收起鲸曈';button.style.marginLeft='12px'
      node.append(label,button);document.body.append(node)
      let collapsed=false
      const member=layout.register({id:'whale-watch',read:()=>({rect:{x:parseFloat(node.style.left),y:parseFloat(node.style.top),width:node.getBoundingClientRect().width,height:node.getBoundingClientRect().height},bounds:{x:12,y:12,width:innerWidth-24,height:innerHeight-24},collapsed}),apply:next=>{node.style.left=next.x+'px';node.style.top=next.y+'px'},onDock:state=>{if(state)node.dataset.dock=state.phase;else delete node.dataset.dock},onFront:active=>{node.style.zIndex=active?'901':'900'}})
      node.addEventListener('pointerdown',()=>member.activate?.(),true);node.addEventListener('focus',()=>member.activate?.(),true)
      button.onclick=()=>{collapsed=!collapsed;node.style.width=collapsed?'200px':'260px';node.style.height=collapsed?'44px':'180px';button.textContent=collapsed?'展开鲸曈':'收起鲸曈';node.dataset.collapsed=String(collapsed);member.resize()}
      magneticPeer={node,member}
      return()=>{member.dispose();node.remove();magneticPeer=null;layout.dispose()}
    })
  })
  await magneticPlugin.await()
}
window.fixture = {
  calls, transportCalls, openedSessions,
  get operationEvents() { return [...clientOperationEvents.values()] },
  setOperationTransportDown(value) { operationTransportDown = value },
  dropNextRequest(action) { pendingRequestFailure = action },
  setUpdate,
  holdUpdateAcceptance() { updateAcceptance = Promise.withResolvers() },
  releaseUpdateAcceptance() { updateAcceptance?.resolve(); updateAcceptance = null },
  holdStatusReceipt() { statusReceipt = Promise.withResolvers() },
  releaseStatusReceipt() { statusReceipt?.resolve(); statusReceipt = null },
  setSenseVoice(value) { senseVoice = value },
  setSenseVoiceModel() { modelSetup = { ...modelSetup,asr:'sensevoice' }; version++ },
  get usageAgreement() { return authSnapshot().usageAgreement },
  setNextPickedPath(path) { if(path!==null&&typeof path!=='string')throw Error('Expected a synthetic path or cancellation');nextPickedPath=path },
  holdProbes(value = true) { holdProbe = value },
  releaseProbes(error = null) { holdProbe = false; for (const pending of pendingProbes.splice(0)) error ? pending.reject(new Error(error)) : pending.resolve() },
  get pendingProbeCount() { return pendingProbes.length },
  holdDiagnostic(action) {
    if (!['inspect-tts', 'inspect-model-compute'].includes(action)) throw new Error('Unsupported fixture diagnostic')
    heldDiagnostic = action
  },
  releaseDiagnostics() { heldDiagnostic = null; for (const pending of pendingDiagnostics.splice(0)) pending.resolve() },
  get pendingDiagnostics() { return pendingDiagnostics.map(({ action, cancelled }) => ({ action, cancelled })) },
  mountMagneticPeer,
  magneticRegistrations,
  detachMagneticPeer(){magneticPeer?.member.detach()},
  // Synthetic peer adapter exercises the real coordinator, not Watch UI input.
  moveMagneticPeerBy(dx,dy){
    const peer=magneticPeer;if(!peer)return
    peer.member.beginDrag()
    peer.node.style.left=(parseFloat(peer.node.style.left)+dx)+'px'
    peer.node.style.top=(parseFloat(peer.node.style.top)+dy)+'px'
    peer.member.move();peer.member.endDrag()
  },
  async unmountMagneticPeer(){const plugin=magneticPlugin;magneticPlugin=null;await plugin?.dispose()},
  resetAuthorization() {
    authorized=false; authorizationCompleted=false; deepseekAuthorized=false; authRevision++
    ttsSetup={...defaultTts}; version++
    owner=null; activeVoice=null; replyRows=[]; inputActive=false; inputError=null; emitConversation()
  },
  seedAgentRequests(){agentRequests=['approve','reject'].map(kind=>({id:'agent-'+kind,sourceSessionId:'synthetic-origin',operation:'enable',title:'开启麦克风',state:'pending',createdAt:1,expiresAt:9999999999999,humanRevision:requestRevision,request:{action:'enable',expectedOwnerSessionId:null},before:{enabled:false},acknowledgements:[{id:'microphone',text:'我允许此请求的会话开启麦克风。'}],result:null,error:null,nextAction:'核对后确认'}))},
  blockAgentRequest(){const plan=agentRequests[0];plan.state='blocked';plan.error={code:'VOICE_ROOT_OWNED_ELSEWHERE',message:'旧语音会话尚未退出。'};plan.nextAction='请核查并停止；若持续占用，请重启 DSH，无需重新授权。'},

  setRecoveryConflict(value){recoveryConflict=value},
  setTargetOccupied(value){targetOccupied=value},
  setRecoveryRestart(value){recoveryRestart=value},
  setHelperRecovery(value){helperRecovery=value},
  setHelperAvailability(online, known = true){helperOnline=online;helperModeKnown=known;if(!online)inputActive=false;emitConversation()},
  setAvailableModes(modes) { availableModes=modes },
  get performanceMode(){return performanceMode},
  enableLocalTtsFixture({resetTts=true}={}) {
    installer.models=installer.models.filter(m=>!m.id.startsWith('qwen')&&!m.id.startsWith('vits-melo'))
    const qwen=model('qwen3-tts-base-1.7b-gguf','Qwen3-TTS 1.7B',true)
    installer.models.push({...qwen,purpose:'tts',computeOptions:['cpu'],recommendation:{...qwen.recommendation,recommended:true}},{...model('vits-melo-tts-zh_en-int8','MeloTTS 中英文 · 轻量 CPU',true),purpose:'tts',computeOptions:['cpu']})
    installer.jobs=[];installer.ttsInstallIntent=null
    if(resetTts){ttsSetup={...defaultTts};version++}
    emitModels()
  },
  finishLocalTtsFixture() { const intent=installer.ttsInstallIntent;if(!intent)throw Error('no explicit use intent');const job=installer.jobs.find(j=>j.id===intent.jobId);job.status=job.stage='installed';job.receivedBytes=job.totalBytes;job.files[0].receivedBytes=job.totalBytes;job.files[0].verified=true;ttsSetup={...ttsSetup,provider:'local',localModelId:job.modelId,localModelPath:'/fixture/managed/qwen'};version++;intent.status='applied';emitModels() },
  setTtsFixture(value) { ttsSetup={...ttsSetup,...value};version++ },
  setDeepSeekKeyAvailable(value) { deepseekKeyAvailable=value },
  setOnboarding(completed) { onboarding = { version: 1, completed }; version++ },
  modelProgress(bytes, installed = false) { for (const job of installer.jobs) { job.receivedBytes = bytes; job.files[0].receivedBytes = bytes; if (installed) { job.status = job.stage = 'installed'; job.files[0].verified = true } } emitModels() },
  get ttsSetup() { return ttsSetup }, get previewActive() { return Boolean(finishPreview) },
  inputFailure(code) { inputError = code; inputActive = false; emitConversation() },
  input(active) { inputActive = active; emitConversation() }, reply(text) { replyRows.push({id:'fixture-'+conversationRevision,role:'assistant',text,state:'reply',at:Date.now()}); emitConversation() }, failVolume() { failVolume = true },
  setAudioInventory(value) { audioInventory = value }, get audioSelections() {return {input:values.device,output:outputDevice}},
  get outputVolume() { return outputVolume }, get cueVolume() { return values.turnSignals.volume },
  transportCounts: () => ({ mounted: mountedRemotes, subscribers: subscribers.size + modelSubscribers.size + updateSubscribers.size }),
  compatibilityOnly() { hiddenSupported = false }, enableSignals() { signalsSupported = true; values = { ...values, turnSignals: { enabled: true, volume: 0.2, headphonesConfirmed: false, experimentalAutomaticBargeIn: false } }; version++ }, setDelay: value => { delay = value }, fail: () => { failNext = true },
  async unload() { await plugin.dispose() },
  async reload() { plugin = ctx.plugin(exported); await plugin.await() },
  selectSession(id) { selection.set(binding(id)) },
  setMainPanel(id) { panelInfo.set({ activePanelId:id }) },
  holdExistingSessionRead() { existingSessionRead = Promise.withResolvers() },
  releaseExistingSessionRead() { existingSessionRead?.resolve(); existingSessionRead = null },
  setInputDelivery(row) { inputDelivery = row; emitConversation() },
  setRetryTranscripts(items) {
    retryTranscripts = { sessionId:owner, items }
    if (items.length) inputDelivery = { ...items.at(-1), sessionId:owner }
    emitConversation()
  },
  holdRetryReceipt() { retryReceipt = Promise.withResolvers() },
  releaseRetryReceipt() { retryReceipt?.resolve(); retryReceipt = null },
  dropRetryReceipt() { dropRetryReceipt = true },
  blank() { selection.set(binding(null)) },
  get owner() { return owner },
  get existingVoiceSession() { return existingVoiceSessionId },
  changeBindingInAnotherView(id) { existingVoiceSessionId = id },
  setExistingSessionSupport(value) { existingSessionSupported = value },
  setExistingSessionAvailability(id, availability) { existingSessions.find(row => row.sessionId === id).availability = availability },
  setExistingSessionTitle(id, title) { existingSessions.find(row => row.sessionId === id).title = title },
  counts: () => ({ overlays: ctx.slots.entries('shell.overlay').length, pages: ctx.slots.entries('plugins.bundle.config').length }),
}
window.fixtureReady = true
