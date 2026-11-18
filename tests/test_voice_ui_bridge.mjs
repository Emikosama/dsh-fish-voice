import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createVoiceUiBridge, inferenceComputeSnapshot } from '../voice-ui-bridge.mjs'

const actor = { session: { id: 'origin' } }
const signal = () => new AbortController().signal
function fixture(t, additions = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'whale-ui-bridge-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const path = join(directory, 'config.json')
  const base = { device: null, pttMouse: 2, speakerVerification: { enabled: false }, listenMode: 'ptt' }
  const persisted = { voiceSessionId: 'origin', voiceSessionEpoch: 'keep-epoch', voiceSession: { allowedSessionIds: ['keep-authorized'] }, privateUnrelated: 'do-not-project', speakerVerification: { custom: 'preserve' } }
  writeFileSync(path, JSON.stringify(persisted))
  const calls = []
  const read = () => JSON.parse(readFileSync(path, 'utf8'))
  const hooks = {
    configPath: path,
    assertCaller: value => { if (value !== actor) throw new Error('无法验证来源会话') },
    readEffectiveConfig: () => ({ ...base, ...read(), speakerVerification: { ...base.speakerVerification, ...read().speakerVerification } }),
    readStatus: () => ({ ownerSessionId: 'origin', enabled: true, helper: { online: false }, voiceSession: { id: 'voice-current', presentation: { hidden: true }, transcript: 'DO NOT PROJECT', privateMemory: 'DO NOT PROJECT' }, listenMode: 'ptt' }),
    sessionControl: { owner: () => 'origin', allowed: id => id === 'origin', change: (...args) => calls.push(['change', ...args]) },
    listVoiceSessions: async (...args) => { calls.push(['list', ...args]); return { items: [{ rootSessionId: 'voice-old', status: 'available', canResume: true, title: 'Old', createdAt: 1 }, { rootSessionId: 'voice-private', status: 'permission-limited', canResume: false, reason: 'policy differs' }, { rootSessionId: 'voice-archived', status: 'archived', canResume: false }], nextCursor: 'next', total: 3 } },
    newVoiceSession: async (...args) => { calls.push(['new', ...args]) },
    resumeVoiceSession: async (...args) => { calls.push(['resume', ...args]) },
    ...additions,
  }
  return { bridge: createVoiceUiBridge(hooks), path, directory, read, calls, hooks, persisted }
}

test('status/settings use core cache only and exclude history, private config and grant edits', t => {
  const f = fixture(t)
  assert.equal(f.bridge.status(actor).helper.online, false)
  assert.equal(f.bridge.status(actor).voiceSession.id, 'voice-current')
  assert.equal(JSON.stringify(f.bridge.status(actor)).includes('DO NOT PROJECT'), false)
  const settings = f.bridge.readSettings()
  assert.equal(settings.revision.length, 64)
  assert.deepEqual(Object.keys(settings.values).sort(), ['device', 'pttKeyboard', 'pttMouse', 'semanticExperimental', 'speakerVerification', 'wakeListenTimeoutMs', 'wakeWordAliases'])
  assert.equal(JSON.stringify(settings).includes('do-not-project'), false)
  assert.equal(settings.capabilities.turnSignals, false)
  assert.equal(f.calls.length, 0)
})

test('audio save is atomic, preserves grant/unknown fields, and returns a new revision', t => {
  const f = fixture(t)
  const before = f.bridge.readSettings()
  const saved = f.bridge.updateSettings({ revision: before.revision, values: { ...before.values, device: 'USB input', pttMouse: 2 } }, actor, signal())
  assert.equal(saved.values.device, 'USB input')
  assert.equal(saved.values.pttMouse, 2)
  assert.notEqual(saved.revision, before.revision)
  assert.equal(f.read().voiceSessionId, 'origin')
  assert.deepEqual(readdirSync(f.directory), ['config.json'])
})

test('unknown request fields and ownership fields are rejected before any write', t => {
  const f = fixture(t)
  const { revision, values } = f.bridge.readSettings()
  const before = readFileSync(f.path, 'utf8')
  assert.throws(() => f.bridge.updateSettings({ revision, values, ignored: true }, actor, signal()), /字段/)
  for (const forbidden of ['voiceSessionId', 'voiceSessionEpoch', 'voiceSession', 'models', 'helperPath', 'pythonPath', '__proto__']) {
    const edited = Object.fromEntries([...Object.entries(values), [forbidden, 'forged']])
    assert.throws(() => f.bridge.updateSettings({ revision, values: edited }, actor, signal()), /字段/)
  }
  assert.equal(readFileSync(f.path, 'utf8'), before)
})

test('audio settings whitelist validates all ranges, mode, nested fields and unsupported sounds', t => {
  const f = fixture(t)
  const { revision, values } = f.bridge.readSettings()
  for (const delta of [{ device: -1 }, { device: 'bad\0device' }, { pttMouse: 3 }, { listenMode: 'secret' }, { speakerVerification: { enabled: true, unexpected: true } }, { speakerVerification: { enabled: 'true' } }, { turnSignals: { enabled: true, volume: 0.5 } }]) {
    assert.throws(() => f.bridge.updateSettings({ revision, values: { ...values, ...delta } }, actor, signal()))
  }
  assert.equal(f.calls.length, 0)
})

test('revision fences stale edits including unrelated authorization changes', t => {
  const f = fixture(t)
  const { revision, values } = f.bridge.readSettings()
  writeFileSync(f.path, JSON.stringify({ ...f.read(), voiceSessionId: 'new-owner' }))
  assert.throws(() => f.bridge.updateSettings({ revision, values }, actor, signal()), /配置已改变/)
  assert.equal(f.read().voiceSessionId, 'new-owner')
  assert.equal(readdirSync(f.directory).length, 1)
})

test('concurrent same-revision saves accept the first only', t => {
  const f = fixture(t)
  const { revision, values } = f.bridge.readSettings()
  const saved = f.bridge.updateSettings({ revision, values: { ...values, device: 7 } }, actor, signal())
  assert.notEqual(saved.revision, revision)
  assert.equal(saved.values.device, 7)
  assert.equal(f.read().voiceSessionId, 'origin')
  assert.equal(f.read().voiceSessionEpoch, 'keep-epoch')
  assert.deepEqual(f.read().voiceSession, f.persisted.voiceSession)
  assert.equal(f.read().privateUnrelated, 'do-not-project')
  assert.equal(f.read().speakerVerification.custom, 'preserve')
  assert.throws(() => f.bridge.updateSettings({ revision, values }, actor, signal()), /配置已改变/)
  assert.equal(f.calls.length, 0, 'saving listenMode never authorizes, starts audio, or creates a model request')
})

test('cancelled and unidentified writes keep the original document', t => {
  const f = fixture(t)
  const { revision, values } = f.bridge.readSettings()
  const abort = new AbortController(); abort.abort()
  const before = readFileSync(f.path, 'utf8')
  assert.throws(() => f.bridge.updateSettings({ revision, values }, actor, abort.signal), /取消/)
  assert.throws(() => f.bridge.updateSettings({ revision, values }, {}, signal()), /来源会话/)
  assert.equal(readFileSync(f.path, 'utf8'), before)
})

test('invalid persisted JSON is not overwritten or treated as empty defaults', t => {
  const f = fixture(t)
  writeFileSync(f.path, '{bad')
  assert.throws(() => f.bridge.readSettings(), /有效 JSON/)
  assert.equal(readFileSync(f.path, 'utf8'), '{bad')
})

test('write failures surface and do not silently report success', t => {
  const f = fixture(t)
  const { revision, values } = f.bridge.readSettings()
  // A file replacing the parent prevents mkdir/write and leaves no successful receipt.
  rmSync(f.path); rmSync(f.directory, { recursive: true }); writeFileSync(f.directory, 'not a directory')
  assert.throws(() => f.bridge.updateSettings({ revision, values }, actor, signal()))
  assert.equal(readFileSync(f.directory, 'utf8'), 'not a directory')
})

test('catalog adapter projects only voice roots and passes exact caller, cursor and signal', async t => {
  const f = fixture(t)
  const abort = signal()
  const page = await f.bridge.listVoiceSessions(actor, abort, { cursor: 'page' })
  assert.equal(page.activeId, 'voice-current')
  assert.equal(page.nextCursor, 'next')
  assert.deepEqual(page.items.map(row => [row.id, row.available, row.archived, row.canResume]), [['voice-old', true, false, true], ['voice-private', false, false, false], ['voice-archived', false, true, false]])
  assert.equal('title' in page.items[1], false)
  assert.equal(f.calls[0][1], actor)
  assert.deepEqual(f.calls[0][2], { cursor: 'page', limit: 20 })
  assert.equal(f.calls[0][3], abort)
})

test('new/resume and legacy grant methods preserve exact core ownership and never select automatically', async t => {
  const f = fixture(t)
  const abort = signal()
  assert.equal(f.bridge.owner(), 'origin'); assert.equal(f.bridge.allowed('origin'), true)
  await f.bridge.newVoiceSession(actor, abort)
  await f.bridge.resumeVoiceSession(actor, 'chosen-voice-root', abort)
  f.bridge.change('origin', false, abort)
  assert.deepEqual(f.calls.map(call => call[0]), ['new', 'resume', 'change'])
  assert.equal(f.calls[1][1], actor); assert.equal(f.calls[1][2], 'chosen-voice-root'); assert.equal(f.calls[1][3], abort)
})

test('sound controls can only become writable when core explicitly supports the exact fields', t => {
  const f = fixture(t)
  const bridge = createVoiceUiBridge({ ...f.hooks, turnSignalsSupported: true, readEffectiveConfig: () => ({ ...f.hooks.readEffectiveConfig(), turnSignals: f.read().turnSignals ?? { enabled: true, volume: 0.3, headphonesConfirmed: false, experimentalAutomaticBargeIn: false } }) })
  const { revision, values } = bridge.readSettings()
  const saved = bridge.updateSettings({ revision, values: { ...values, turnSignals: { enabled: false, volume: 0.7, headphonesConfirmed: true, experimentalAutomaticBargeIn: false } } }, actor, signal())
  assert.deepEqual(saved.values.turnSignals, { enabled: false, volume: 0.7, headphonesConfirmed: true, experimentalAutomaticBargeIn: false })
  assert.equal(saved.capabilities.turnSignals, true)
})

test('forged same-id objects cannot read privileged UI state, change grants, write settings or inspect history', async t => {
  const f = fixture(t)
  const impostor = { session: { id: actor.session.id } }
  const request = f.bridge.readSettings()
  assert.throws(() => f.bridge.status(impostor), /来源会话/)
  assert.throws(() => f.bridge.readSettings(impostor), /来源会话/)
  assert.throws(() => f.bridge.updateSettings({ revision: request.revision, values: request.values }, impostor, signal()), /来源会话/)
  await assert.rejects(f.bridge.changeForCaller(impostor, true, signal()), /来源会话/)
  await assert.rejects(f.bridge.listVoiceSessions(impostor, signal()), /来源会话/)
  assert.equal(f.calls.length, 0)
})

test('listening mode is explicit, permission checked and reported only from confirmed core cache', async t => {
  let mode = null, calls = 0
  const f = fixture(t, { readStatus: () => ({ ownerSessionId: 'origin', enabled: true, helper: { online: false }, listenMode: mode }), setListenMode: async (agent, value) => { assert.equal(agent, actor); calls++; mode = value } })
  assert.equal(f.bridge.status().listenMode, null)
  assert.equal(f.bridge.readSettings().listenMode, null)
  const snapshot = f.bridge.readSettings()
  assert.throws(() => f.bridge.updateSettings({ revision: snapshot.revision, values: { ...snapshot.values, listenMode: 'always' } }, actor, signal()), /字段/)
  assert.equal(calls, 0)
  assert.equal((await f.bridge.setListenMode(actor, 'always', signal())).listenMode, 'always')
  assert.equal(calls, 1)
  assert.equal(f.read().listenMode, undefined)
  await assert.rejects(f.bridge.setListenMode(actor, 'invalid', signal()))
})

test('manual local model paths use separate CAS, preserve other model fields and never load a model', t => {
  const f = fixture(t)
  writeFileSync(f.path, JSON.stringify({ ...f.read(), models: { sileroVad: '/keep/vad.onnx' } }))
  const { revision } = f.bridge.readSettings()
  const values = { asr: 'sensevoice', models: { sensevoiceDir: '/models/sensevoice', campplus: '' } }
  const saved = f.bridge.updateModelSettings({ revision, values }, actor, signal())
  assert.equal(saved.modelSetup.asr, 'sensevoice')
  assert.equal(f.read().models.sileroVad, '/keep/vad.onnx')
  assert.equal(f.read().voiceSessionId, 'origin')
  assert.equal(f.calls.length, 0)
  assert.throws(() => f.bridge.updateModelSettings({ revision, values }, actor, signal()), /配置已改变/)
  const current = f.bridge.readSettings()
  for (const path of ['small', 'https://models.example/model', 'bad\0path']) {
    assert.throws(() => f.bridge.updateModelSettings({ revision: current.revision, values: { ...values, models: { ...values.models, sensevoiceDir: path } } }, actor, signal()))
  }
  assert.throws(() => f.bridge.updateModelSettings({ revision: current.revision, values: { ...values, models: { ...values.models, helperPath: 'forged' } } }, actor, signal()), /字段/)
})

test('SenseVoice can return to its managed directory without erasing old model files or metadata', t => {
  const f = fixture(t)
  writeFileSync(f.path, JSON.stringify({...f.read(),asr:'whisper-wasm',models:{whisper:'/existing/retained',sensevoiceDir:'/custom/sensevoice'}}))
  const current = f.bridge.readSettings(actor)
  assert.equal(current.modelSetup.asr,'sensevoice')
  const values = {asr:'sensevoice',modelCompute:'cpu',models:{sensevoiceDir:'',campplus:''}}
  assert.throws(() => f.bridge.updateModelSettings({revision:current.revision,values:{...values,asr:'whisper'}},actor,signal()), /SenseVoice/)
  const result = f.bridge.updateModelSettings({revision:current.revision,values},actor,signal())
  assert.equal(result.modelSetup.models.sensevoiceDir,'')
  assert.equal(f.read().models.whisper,'/existing/retained')
})

test('SenseVoice status and retry use only the narrow runtime hook', async t => {
  const replies = [
    { state: 'idle', selected: false, receivedBytes: 0, totalBytes: 0, message: null },
    { state: 'ready', selected: true, receivedBytes: 42, totalBytes: 42, message: '模型文件已验证' },
  ]
  const calls = []
  const f = fixture(t, {
    readEffectiveConfig: () => { throw new Error('must not inspect configuration') },
    readStatus: () => { throw new Error('must not inspect assistant status') },
    senseVoiceAsrAction: async (request, abortSignal) => { calls.push([request, abortSignal]); return replies.shift() },
  })
  const abortSignal = signal()
  assert.deepEqual(await f.bridge.senseVoiceAsrAction({ operation: 'status' }, abortSignal), {
    state: 'idle', selected: false, receivedBytes: 0, totalBytes: 0, message: null,
  })
  assert.deepEqual(await f.bridge.senseVoiceAsrAction({ operation: 'retry' }, abortSignal), {
    state: 'ready', selected: true, receivedBytes: 42, totalBytes: 42, message: '模型文件已验证',
  })
  assert.deepEqual(calls.map(([request]) => request), [{ operation: 'status' }, { operation: 'retry' }])
  assert.ok(calls.every(([, passedSignal]) => passedSignal === abortSignal))
  for (const request of [{ operation: 'status', path: '/private/model' }, { operation: 'start' }, {}]) {
    await assert.rejects(f.bridge.senseVoiceAsrAction(request, abortSignal))
  }
  assert.equal(calls.length, 2)

  const privateMessages = ['Failed at C:\\private\\model.bin', 'Download failed: https://models.example/file.bin']
  const unsafe = fixture(t, { senseVoiceAsrAction: async () => ({ state: 'error', selected: false, receivedBytes: 0, totalBytes: 0, message: privateMessages.shift() }) })
  for (let n = 0; n < 2; n++) await assert.rejects(unsafe.bridge.senseVoiceAsrAction({ operation: 'status' }, abortSignal), /不能包含本地路径或网址/)
})

test('inference compute projection accepts SenseVoice and still rejects unknown engine values', () => {
  const raw = { requested: 'cpu', actual: 'cpu', engine: 'sensevoice', computeType: 'int8', deviceIndex: null, fallbackReason: null, validated: true }
  assert.deepEqual(inferenceComputeSnapshot(raw), raw)
  assert.equal(inferenceComputeSnapshot({ ...raw, engine: 'future-engine' }), null)
  assert.equal(inferenceComputeSnapshot({ ...raw, computeType: 'future-type' }), null)
  assert.equal(inferenceComputeSnapshot({ ...raw, actual: 'vulkan' }), null)
})

test('headphones and explicit experimental permission are required together', t => {
  const f = fixture(t)
  const bridge = createVoiceUiBridge({ ...f.hooks, turnSignalsSupported: true, readEffectiveConfig: () => ({ ...f.hooks.readEffectiveConfig(), turnSignals: { enabled: true, volume: 0.2, headphonesConfirmed: false, experimentalAutomaticBargeIn: false } }) })
  const { revision, values } = bridge.readSettings()
  assert.throws(() => bridge.updateSettings({ revision, values: { ...values, turnSignals: { ...values.turnSignals, experimentalAutomaticBargeIn: true } } }, actor, signal()), /耳机/)
})


test('sound read projects only UI fields with defaults and preserves internal settings on write', t => {
  const f = fixture(t)
  writeFileSync(f.path, JSON.stringify({ ...f.read(), turnSignals: { outputDevice: 'keep-output', enabled: false } }))
  const bridge = createVoiceUiBridge({ ...f.hooks, turnSignalsSupported: true })
  const { revision, values } = bridge.readSettings()
  assert.deepEqual(values.turnSignals, { enabled: false, volume: 0.2, headphonesConfirmed: false, experimentalAutomaticBargeIn: false })
  bridge.updateSettings({ revision, values }, actor, signal())
  assert.equal(f.read().turnSignals.outputDevice, 'keep-output')
  const current = bridge.readSettings()
  assert.throws(() => bridge.updateSettings({ revision: current.revision, values: { ...current.values, turnSignals: { ...current.values.turnSignals, outputDevice: 'forged' } } }, actor, signal()), /字段/)
})


function stoppedVisibilityHooks() {
  return {
    sessionControl: { owner: () => null, allowed: () => false, change: () => { throw new Error('must not grant') } },
    readStatus: () => ({ voiceControlBusy: false, ownerSessionId: null, enabled: false, helper: { online: false }, voiceSession: { id: null }, voiceCapabilities: { configuredVisibility: 'hidden', hidden: { supported: false, reason: 'native-presentation-unavailable' }, workspace: { supported: true, reason: null }, taskHandoff: { mode: 'compat_log_v1', reason: null }, privateData: 'must-not-project' } }),
  }
}

test('capability reads are cached, narrow and never infer hidden support or visible fallback', t => {
  const f = fixture(t, stoppedVisibilityHooks())
  const status = f.bridge.status(actor), settings = f.bridge.readSettings(actor)
  assert.equal(status.voiceCapabilities.hidden.supported, false)
  assert.equal(settings.voiceSession.visibility, 'hidden')
  assert.equal(status.voiceCapabilities.workspace.supported, true)
  assert.equal(status.voiceCapabilities.taskHandoff.mode, 'compat_log_v1')
  assert.equal(JSON.stringify(settings).includes('must-not-project'), false)
  assert.equal(f.read().voiceSession.visibility, undefined)
  assert.equal(f.calls.length, 0)
})

test('explicit visibility CAS changes only preference and never grants, migrates or chooses history', t => {
  const f = fixture(t, stoppedVisibilityHooks())
  const { revision } = f.bridge.readSettings(actor)
  const saved = f.bridge.setVisibility({ revision, visibility: 'workspace' }, actor, signal())
  assert.equal(saved.voiceSession.visibility, 'workspace')
  assert.deepEqual(f.read().voiceSession.allowedSessionIds, ['keep-authorized'])
  assert.equal(f.read().voiceSessionId, 'origin')
  assert.equal(f.read().voiceSessionEpoch, 'keep-epoch')
  assert.equal(f.calls.length, 0)
  assert.throws(() => f.bridge.setVisibility({ revision, visibility: 'hidden' }, actor, signal()), /配置已改变/)
  const next = f.bridge.readSettings(actor)
  assert.equal(f.bridge.setVisibility({ revision: next.revision, visibility: 'hidden' }, actor, signal()).voiceSession.visibility, 'hidden')
})

test('visibility writes reject every live grant signal, caller forgery, extra fields and unknown capability', t => {
  for (const state of [{ enabled: true }, { enabled: undefined }, { ownerSessionId: 'A' }, { ownerSessionId: undefined }, { voiceSession: undefined }, { voiceSession: { id: 'prepared-root' } }]) {
    const stopped = stoppedVisibilityHooks()
    const f = fixture(t, { ...stopped, readStatus: () => ({ ...stopped.readStatus(), ...state }) })
    assert.throws(() => f.bridge.setVisibility({ revision: f.bridge.readSettings(actor).revision, visibility: 'workspace' }, actor, signal()), /先明确关闭语音/)
  }
  const stopped = stoppedVisibilityHooks()
  const f = fixture(t, { ...stopped, sessionControl: { ...stopped.sessionControl, owner: () => 'persisted-owner' } })
  assert.throws(() => f.bridge.setVisibility({ revision: f.bridge.readSettings(actor).revision, visibility: 'workspace' }, actor, signal()), /先明确关闭语音/)
  const off = fixture(t, stopped)
  const request = { revision: off.bridge.readSettings(actor).revision, visibility: 'workspace' }
  assert.throws(() => off.bridge.setVisibility(request, { session: { id: 'origin' } }, signal()), /来源/)
  assert.throws(() => off.bridge.setVisibility({ ...request, ownerSessionId: 'forged' }, actor, signal()), /字段/)
  assert.throws(() => off.bridge.setVisibility({ ...request, visibility: 'automatic' }, actor, signal()), /显示模式/)
  const aborted = new AbortController(); aborted.abort()
  assert.throws(() => off.bridge.setVisibility(request, actor, aborted.signal), /取消/)
  const unknown = fixture(t, { ...stopped, readStatus: () => ({ voiceControlBusy: false, ownerSessionId: null, enabled: false, voiceSession: null, helper: { online: false } }) })
  assert.throws(() => unknown.bridge.setVisibility({ revision: unknown.bridge.readSettings(actor).revision, visibility: 'workspace' }, actor, signal()), /未确认支持/)
  assert.equal(unknown.read().voiceSession.visibility, undefined)
})


test('visibility saving fails closed throughout queued or unknown voice control work', t => {
  for (const busy of [true, undefined, null]) {
    const stopped = stoppedVisibilityHooks()
    const f = fixture(t, { ...stopped, readStatus: () => ({ ...stopped.readStatus(), voiceControlBusy: busy }) })
    assert.throws(() => f.bridge.setVisibility({ revision: f.bridge.readSettings(actor).revision, visibility: 'workspace' }, actor, signal()), /仍在处理或状态未确认/)
    assert.equal(f.read().voiceSession.visibility, undefined)
    assert.equal(f.calls.length, 0)
  }
})


function stoppedModeHooks() {
 const base=stoppedVisibilityHooks()
 return {...base,readStatus:()=>({...base.readStatus(),voiceSession:{id:null,fullyStopped:true}})}
}
test('mode save is stopped-only CAS, preserves unrelated values and clears legacy effort',t=>{
 const f=fixture(t,stoppedModeHooks());writeFileSync(f.path,JSON.stringify({...f.read(),voiceSession:{...f.read().voiceSession,reasoningEffort:'low'}}))
 const before=f.bridge.readSettings();assert.equal(before.voiceSession.performanceMode,null);assert.equal(before.voiceSession.policy,'legacy_compatible')
 const saved=f.bridge.setPerformanceMode({revision:before.revision,performanceMode:'high'},actor,signal())
 assert.equal(saved.voiceSession.performanceMode,'high');assert.equal(saved.voiceSession.policy,'strict');assert.equal(saved.apply,'next-voice-enable')
 assert.equal(f.read().voiceSession.reasoningEffort,undefined);assert.deepEqual(f.read().voiceSession.allowedSessionIds,['keep-authorized'])
 assert.equal(f.read().voiceSessionEpoch,'keep-epoch');assert.equal(f.calls.length,0)
 assert.throws(()=>f.bridge.setPerformanceMode({revision:before.revision,performanceMode:'fast'},actor,signal()),/改变/)
 for(const performanceMode of ['bogus',null,{},['fast']]) assert.throws(()=>f.bridge.setPerformanceMode({revision:saved.revision,performanceMode},actor,signal()))
 const compat=f.bridge.setPerformanceMode({revision:saved.revision,performanceMode:'compatibility'},actor,signal());assert.equal(compat.voiceSession.policy,'legacy_compatible')
})
test('mode save rejects active, cleaning, unknown or failed state without touching workers or disk',t=>{
 for(const state of [{voiceControlBusy:true},{voiceControlBusy:undefined},{enabled:true},{ownerSessionId:'owner'},{voiceSession:{id:'root',fullyStopped:false}},{voiceSession:{id:null}},{voiceSession:{id:null,fullyStopped:false}}]){
  const base=stoppedModeHooks(),f=fixture(t,{...base,readStatus:()=>({...base.readStatus(),...state})}),before=readFileSync(f.path,'utf8')
  assert.throws(()=>f.bridge.setPerformanceMode({revision:f.bridge.readSettings().revision,performanceMode:'fast'},actor,signal()),/关闭语音/)
  assert.equal(readFileSync(f.path,'utf8'),before);assert.equal(f.calls.length,0)
 }
})

test('status projects actual current mode separately from saved preference without private routes',t=>{
 const f=fixture(t,{readStatus:()=>({voiceSession:{id:'live',fullyStopped:false,routing:{voiceMode:{requestedMode:null,policy:'legacy_compatible',preferenceSource:'default',requestedEffort:'off',selectedEffort:'high',advertisedEfforts:['high',{}],selectionReason:'advertised_default',selected:{reasoningEffort:'high',apiKey:'PRIVATE'},requestObserved:{reasoningEffort:'high',baseURL:'PRIVATE'},providerEnforcement:'verified',privateText:'PRIVATE'}}}})})
 const current=f.bridge.status(actor).voiceSession
 assert.equal(current.fullyStopped,false);assert.equal(current.performance.policy,'legacy_compatible');assert.equal(current.performance.requestedMode,null)
 assert.equal(current.performance.selectedEffort,'high');assert.equal(current.performance.runtimeSelectedEffort,'high');assert.equal(current.performance.requestObservedEffort,'high')
 assert.equal(current.performance.providerEnforcement,'not_verified');assert.deepEqual(current.performance.advertisedEfforts,['high']);assert.equal(JSON.stringify(current).includes('PRIVATE'),false)
 assert.equal(current.ttsResidency.supported,false)
})


test('keyboard bindings persist with CAS, canonical modifiers and no authorization side effects', t => {
  const f = fixture(t, stoppedModeHooks())
  const before = f.bridge.readSettings()
  assert.equal(before.values.pttKeyboard, null)
  const saved = f.bridge.updateSettings({ revision: before.revision, values: { ...before.values, pttKeyboard: {code:'Space', modifiers:['Alt','Control']} } }, actor, signal())
  assert.deepEqual(saved.values.pttKeyboard, {code:'Space', modifiers:['Control','Alt']})
  assert.equal(f.read().voiceSessionId, f.persisted.voiceSessionId)
  assert.equal(f.read().voiceSessionEpoch, f.persisted.voiceSessionEpoch)
  assert.equal(f.calls.length, 0)
  assert.throws(() => f.bridge.updateSettings({ revision: before.revision, values: before.values }, actor, signal()), /改变/)
  assert.equal(saved.capabilities.pttKeyboard.supported, process.platform === 'win32')
})

test('keyboard invalid/reserved bindings fail without writing', t => {
  const f = fixture(t)
  const before = f.bridge.readSettings()
  for (const pttKeyboard of [{code:'F25', modifiers:[]}, {code:'KeyA'}, {code:'Space', modifiers:['Meta']}, {code:'F4', modifiers:['Alt']}, {code:'F8', modifiers:['Control','Control']}, {code:'F8', modifiers:[], enabled:true}]) {
    assert.throws(() => f.bridge.updateSettings({revision:before.revision,values:{...before.values,pttKeyboard}},actor,signal()))
    assert.equal(f.bridge.readSettings().revision,before.revision)
  }
})


test('PTT binding changes fail closed for grants, queued control, live roots and incomplete cleanup', t => {
  const states = [{voiceControlBusy:true},{voiceControlBusy:undefined},{enabled:true},{enabled:undefined},{ownerSessionId:'owner'},{ownerSessionId:undefined},{voiceSession:{id:'root',fullyStopped:true}},{voiceSession:{id:null,fullyStopped:false}},{voiceSession:{id:null}},{voiceSession:null}]
  for (const delta of states) {
    const base=stoppedModeHooks(), f=fixture(t,{...base,readStatus:()=>({...base.readStatus(),...delta})})
    const before=f.bridge.readSettings(), disk=readFileSync(f.path,'utf8')
    for (const change of [{pttMouse:1},{pttKeyboard:{code:'F8',modifiers:[]}}]) {
      assert.throws(()=>f.bridge.updateSettings({revision:before.revision,values:{...before.values,...change}},actor,signal()),/关闭语音/)
      assert.equal(readFileSync(f.path,'utf8'),disk)
      assert.equal(f.calls.length,0)
    }
  }
  const base=stoppedModeHooks(), f=fixture(t,{...base,sessionControl:{...base.sessionControl,owner:()=> 'live-owner'}})
  const before=f.bridge.readSettings()
  assert.throws(()=>f.bridge.updateSettings({revision:before.revision,values:{...before.values,pttMouse:0}},actor,signal()),/关闭语音/)
})

test('PTT write rechecks a new live grant after the settings read without changing disk', t => {
  const base=stoppedModeHooks();let active=false
  const f=fixture(t,{...base,readStatus:()=>({...base.readStatus(),enabled:active,voiceControlBusy:active})})
  const before=f.bridge.readSettings(), disk=readFileSync(f.path,'utf8');active=true
  assert.throws(()=>f.bridge.updateSettings({revision:before.revision,values:{...before.values,pttMouse:0}},actor,signal()),/关闭语音/)
  assert.equal(readFileSync(f.path,'utf8'),disk)
})

test('PTT unchanged canonical binding and omitted legacy field do not block ordinary live audio edits', t => {
  const f=fixture(t)
  writeFileSync(f.path,JSON.stringify({...f.read(),pttKeyboard:{code:'Space',modifiers:['Control','Alt']}}))
  let before=f.bridge.readSettings()
  let saved=f.bridge.updateSettings({revision:before.revision,values:{...before.values,device:'USB',pttKeyboard:{code:'Space',modifiers:['Alt','Control']}}},actor,signal())
  assert.deepEqual(saved.values.pttKeyboard,{code:'Space',modifiers:['Control','Alt']})
  before=saved;const {pttKeyboard,...legacy}=before.values
  saved=f.bridge.updateSettings({revision:before.revision,values:{...legacy,device:'Other USB'}},actor,signal())
  assert.deepEqual(saved.values.pttKeyboard,pttKeyboard)
  assert.equal(f.calls.length,0)
  assert.throws(()=>f.bridge.updateSettings({revision:saved.revision,values:{...saved.values,pttKeyboard:null}},actor,signal()),/关闭语音/)
})

test('PTT bindings can change or clear only after confirmed stopped state', t => {
  const f=fixture(t,stoppedModeHooks());let before=f.bridge.readSettings()
  before=f.bridge.updateSettings({revision:before.revision,values:{...before.values,pttMouse:1,pttKeyboard:{code:'F8',modifiers:[]}}},actor,signal())
  const saved=f.bridge.updateSettings({revision:before.revision,values:{...before.values,pttMouse:0,pttKeyboard:null}},actor,signal())
  assert.equal(saved.values.pttMouse,0);assert.equal(saved.values.pttKeyboard,null);assert.equal(f.calls.length,0)
})

test('TTS setup is explicit stopped-only CAS; onboarding completion is not a readiness claim', async t => {
  const f = fixture(t, {
    readStatus: () => ({ voiceControlBusy: false, enabled: false, ownerSessionId: null, voiceSession: { id: null, fullyStopped: true } }),
    sessionControl: { owner: () => null },
    readTtsStatus: () => ({ busy: false, blocked: false }),
  })
  const first = f.bridge.readSettings(actor)
  assert.equal(first.ttsSetup.provider, 'deepseek')
  assert.equal(first.ttsSetup.deepseekVoice, 'stella')
  assert.equal(first.ttsSetup.deepseekTextTransmissionAccepted, false)
  assert.equal(first.onboarding.completed, false)
  await assert.rejects(f.bridge.previewTts(actor, signal(), { revision: first.revision, values: first.ttsSetup }, true), { code: 'TTS_DEEPSEEK_CONSENT_REQUIRED' })
  const selected = f.bridge.updateTtsSettings({ revision: first.revision, values: { ...first.ttsSetup, provider: 'off' } }, actor, signal())
  assert.equal(selected.onboarding.completed, false)
  assert.throws(() => f.bridge.completeSetup({ revision: first.revision }, actor, signal()), /配置已改变/)
  const done = f.bridge.completeSetup({ revision: selected.revision }, actor, signal())
  assert.deepEqual(done.onboarding, { version: 1, completed: true })
  assert.equal(f.read().privateUnrelated, 'do-not-project')
  assert.equal(f.read().voiceSessionId, 'origin')
  assert.equal('ready' in done.onboarding, false)
})

test('TTS UI rejects active/unknown/unfinished audio, arbitrary preview text, extra fields and forged callers', async t => {
  let busy = false, raw = { voiceControlBusy: false, enabled: false, ownerSessionId: null, voiceSession: { id: null, fullyStopped: true } }
  const previews = []
  const f = fixture(t, { readStatus: () => raw, sessionControl: { owner: () => null }, readTtsStatus: () => ({ busy }), previewTts: value => { previews.push(value); return 'preview' } })
  const settings = f.bridge.readSettings(actor), values = { ...settings.ttsSetup, provider: 'off' }
  for (const invalid of [{ ...raw, enabled: true }, { ...raw, voiceControlBusy: null }, { ...raw, voiceSession: { id: null, fullyStopped: false } }]) {
    const prior = raw; raw = invalid
    assert.throws(() => f.bridge.updateTtsSettings({ revision: settings.revision, values }, actor, signal()), { code: 'TTS_VOICE_ACTIVE' })
    await assert.rejects(f.bridge.previewTts(actor, signal()), { code: 'TTS_VOICE_ACTIVE' })
    raw = prior
  }
  busy = true
  assert.throws(() => f.bridge.updateTtsSettings({ revision: settings.revision, values }, actor, signal()), { code: 'TTS_BUSY' })
  busy = false
  assert.throws(() => f.bridge.updateTtsSettings({ revision: settings.revision, values, consent: true }, actor, signal()), /字段/)
  await assert.rejects(f.bridge.previewTts({ session: { id: actor.session.id } }, signal()), /来源/)
  await f.bridge.previewTts(actor, signal())
  assert.equal(previews.length, 1)
  assert.equal(previews[0] instanceof AbortSignal, true)
})

test('enable owner compare-and-swap rejects stale or invalid claims before change', async t => {
  const f = fixture(t)
  for (const expected of [null, 'other']) await assert.rejects(f.bridge.changeForCaller(actor, true, signal(), expected), { code: 'VOICE_OWNER_CHANGED' })
  for (const expected of ['', 123, {}, 'x\n', 'x'.repeat(257)]) await assert.rejects(f.bridge.changeForCaller(actor, true, signal(), expected), /校验/)
  assert.equal(f.calls.length, 0)
  await f.bridge.changeForCaller(actor, true, signal(), 'origin')
  assert.equal(f.calls[0][4], 'origin')
  await f.bridge.changeForCaller(actor, true, signal())
  assert.equal(f.calls.length, 2, 'legacy call remains supported')
})

test('device status projects only cached inventory without probing or changing config', t => {
  const f = fixture(t, { readStatus: () => ({ helper: { online: true }, inputDevices: { items: [{ index: 2, name: 'Mic', private: 'omit' }], observedAt: 12 } }) })
  const before = readFileSync(f.path, 'utf8')
  assert.deepEqual(f.bridge.status(actor).inputDevices, { status: 'available', items: [{ index: 2, name: 'Mic' }], observedAt: 12 })
  assert.equal(readFileSync(f.path, 'utf8'), before)
  assert.equal(f.calls.length, 0)
})

test('experimental semantic setting requires explicit opt-in and preserves legacy details on omitted writes', t => {
  const f = fixture(t)
  writeFileSync(f.path, JSON.stringify({ ...f.read(), semantic: { enabled: true, url: 'http://127.0.0.1:8093/v1/embeddings', model: 'existing-model', threshold: 0.7 } }))
  let snapshot = f.bridge.readSettings()
  assert.equal(snapshot.values.semanticExperimental, false, 'old enabled=true was a default, not a new experimental opt-in')
  assert.throws(() => f.bridge.updateSettings({ revision: snapshot.revision, values: { ...snapshot.values, semanticExperimental: 'true' } }, actor, signal()), /开关/)
  snapshot = f.bridge.updateSettings({ revision: snapshot.revision, values: { ...snapshot.values, semanticExperimental: true } }, actor, signal())
  assert.equal(snapshot.values.semanticExperimental, true)
  assert.deepEqual(f.read().semantic, { enabled: true, experimentalEnabled: true, url: 'http://127.0.0.1:8093/v1/embeddings', model: 'existing-model', threshold: 0.7 })
  const { semanticExperimental, ...legacyValues } = snapshot.values
  snapshot = f.bridge.updateSettings({ revision: snapshot.revision, values: legacyValues }, actor, signal())
  assert.equal(snapshot.values.semanticExperimental, true, 'older clients omitting the optional field must preserve the setting')
  snapshot = f.bridge.updateSettings({ revision: snapshot.revision, values: { ...snapshot.values, semanticExperimental: false } }, actor, signal())
  assert.equal(snapshot.values.semanticExperimental, false)
  assert.equal(f.calls.length, 0, 'saving the option cannot enable capture or call a model')
})

test('stopped listening-mode selection saves only the preference through the serialized hook', async t => {
  let f
  f = fixture(t, {
    sessionControl: { owner: () => null, allowed: () => false },
    readStatus: () => ({ ownerSessionId: null, enabled: false, helper: { online: false }, listenMode: f?.read().preferredListenMode ?? 'ptt' }),
    setListenMode: async (agent, mode, requestSignal, savePreference) => { assert.equal(agent, actor); assert.equal(mode, 'always'); requestSignal.throwIfAborted(); savePreference() },
  })
  const before = f.read()
  const result = await f.bridge.setListenMode(actor, 'always', signal())
  assert.equal(result.listenMode, 'always')
  assert.equal(result.enabled, false)
  assert.deepEqual(f.read(), { ...before, preferredListenMode: 'always' })
  assert.equal(f.calls.length, 0)
})


test('wake aliases use an independent validated settings key and preserve legacy experimental words', t => {
  const f = fixture(t, {sessionControl:{owner:()=>null},readStatus:()=>({voiceControlBusy:false,enabled:false,ownerSessionId:null,voiceSession:{id:null,fullyStopped:true}})})
  writeFileSync(f.path, JSON.stringify({ ...f.read(), wakeWords: ['一一', '依依'], retainRecordings: false }))
  const before=f.bridge.readSettings()
  assert.deepEqual(before.values.wakeWordAliases, ['小鲸鱼'])
  assert.equal(before.values.wakeListenTimeoutMs, 10000)
  const values={...before.values,wakeWordAliases:['小鲸鱼','emik'],wakeListenTimeoutMs:12000}
  f.bridge.updateSettings({revision:before.revision,values},actor,signal())
  assert.deepEqual(f.read().wakeWords,['一一','依依'])
  assert.deepEqual(f.read().wakeWordAliases,['小鲸鱼','emik'])
  assert.equal(f.read().wakeListenTimeoutMs,12000)
  const current=f.bridge.readSettings()
  for (const value of [[],['a'],['emik','EMIK'],['小鲸鱼\n'],Array(9).fill('小鲸鱼')]) {
    assert.throws(()=>f.bridge.updateSettings({revision:current.revision,values:{...current.values,wakeWordAliases:value}},actor,signal()),/唤醒词/)
  }
  for (const value of [true,'5000',2999,30001,NaN]) {
    assert.throws(()=>f.bridge.updateSettings({revision:current.revision,values:{...current.values,wakeListenTimeoutMs:value}},actor,signal()),/时限/)
  }
  assert.throws(()=>f.bridge.updateSettings({revision:current.revision,values:{...current.values,retainRecordings:true}},actor,signal()),/不支持/)
})

test('wake status uses helper evidence and cannot report listening while stopped or stream is unopened', t => {
  let raw={enabled:true,ownerSessionId:'origin',listenMode:'wake',helper:{online:true},wake:{state:'listening',deadlineAt:1700000010000,streamOpen:true,privateText:'never project'}}
  const f=fixture(t,{readStatus:()=>raw})
  assert.deepEqual(f.bridge.status(actor).wake,{state:'listening',deadlineAt:1700000010000,streamOpen:true,detection:'asr-after-utterance'})
  raw={...raw,wake:{...raw.wake,streamOpen:false}}
  assert.equal(f.bridge.status(actor).wake.state,'starting')
  for (const override of [{enabled:false},{helper:{online:false}},{listenMode:'always'}]) {
    raw={...raw,...override}
    assert.deepEqual(f.bridge.status(actor).wake,{state:'disabled',deadlineAt:null,streamOpen:false,detection:'asr-after-utterance'})
  }
})

test('wake can be preselected while stopped without granting audio', async t => {
  let f
  f=fixture(t,{sessionControl:{owner:()=>null,allowed:()=>false},
    readStatus:()=>({enabled:false,helper:{online:false},listenMode:f?.read().preferredListenMode??'ptt'}),
    setListenMode:async(agent,mode,requestSignal,savePreference)=>{assert.equal(mode,'wake');savePreference()}})
  const result=await f.bridge.setListenMode(actor,'wake',signal())
  assert.equal(result.listenMode,'wake')
  assert.equal(result.wake.state,'disabled')
  assert.equal(result.enabled,false)
  assert.equal(f.read().preferredListenMode,'wake')
})


test('wake alias and timeout changes are stopped-only and legacy omitted writes preserve them', t => {
  const f=fixture(t),before=f.bridge.readSettings()
  assert.throws(()=>f.bridge.updateSettings({revision:before.revision,values:{...before.values,wakeWordAliases:['另一称呼']}},actor,signal()),/关闭语音/)
  assert.throws(()=>f.bridge.updateSettings({revision:before.revision,values:{...before.values,wakeListenTimeoutMs:15000}},actor,signal()),/关闭语音/)
  const {wakeWordAliases,wakeListenTimeoutMs,...legacy}=before.values
  f.bridge.updateSettings({revision:before.revision,values:{...legacy,device:2}},actor,signal())
  assert.equal(f.read().device,2)
  assert.equal(f.read().wakeWordAliases,undefined)
})

test('live old-root recovery is projected without private fields or a false fully-stopped claim',t=>{
 const f=fixture(t,{readStatus:()=>({ownerSessionId:null,enabled:false,helper:{online:false},voiceSession:{id:null,fullyStopped:true,recovery:{kind:'live-root-conflict',rootSessionId:'old-root',privateHandle:'DO NOT PROJECT'}}})})
 const value=f.bridge.status(actor)
 assert.equal(value.voiceSession.fullyStopped,false)
 assert.deepEqual(value.voiceSession.recovery,{stopVerified:false,kind:'live-root-conflict',rootSessionId:'old-root'})
 assert.equal(JSON.stringify(value).includes('DO NOT PROJECT'),false)
})

test('unconfirmed predecessor exit stays blocked in projected status',t=>{
 const f=fixture(t,{readStatus:()=>({ownerSessionId:null,enabled:false,helper:{online:false},voiceSession:{id:null,fullyStopped:true,recovery:{kind:'predecessor-stop-unconfirmed',rootSessionId:null,stopVerified:true}}})})
 const value=f.bridge.status(actor)
 assert.equal(value.voiceSession.fullyStopped,false)
 assert.deepEqual(value.voiceSession.recovery,{stopVerified:false,kind:'predecessor-stop-unconfirmed',rootSessionId:null})
})

for (const kind of ['helper-cleanup-pending','helper-stop-unconfirmed']) test(`${kind} cannot project a verified physical stop`, t => {
 const f=fixture(t,{readStatus:()=>({ownerSessionId:null,enabled:false,helper:{online:false},voiceSession:{id:null,fullyStopped:true,recovery:{kind,rootSessionId:null,stopVerified:true}}})})
 const value=f.bridge.status(actor)
 assert.equal(value.voiceSession.fullyStopped,false)
 assert.deepEqual(value.voiceSession.recovery,{stopVerified:false,kind,rootSessionId:null})
})

test('owner reference voice persists across restart and legacy-client save; stale and active edits cannot replace it',t=>{
  let busy=false
  const f=fixture(t,{readStatus:()=>({voiceControlBusy:false,enabled:false,ownerSessionId:null,voiceSession:{id:null,fullyStopped:true}}),sessionControl:{owner:()=>null},readTtsStatus:()=>({busy,blocked:false})})
  const first=f.bridge.readSettings(actor)
  const values={...first.ttsSetup,provider:'local',referenceAudioPath:join(f.directory,'owner.wav'),referenceAudioAccepted:true}
  let saved=f.bridge.updateTtsSettings({revision:first.revision,values},actor)
  assert.equal(saved.ttsSetup.referenceAudioPath,values.referenceAudioPath)
  const restarted=createVoiceUiBridge(f.hooks);assert.deepEqual(restarted.readSettings(actor).ttsSetup,saved.ttsSetup)
  const {referenceAudioPath,referenceAudioAccepted,...legacy}=saved.ttsSetup
  saved=restarted.updateTtsSettings({revision:saved.revision,values:{...legacy,volume:.42}},actor)
  assert.equal(saved.ttsSetup.referenceAudioPath,referenceAudioPath);assert.equal(saved.ttsSetup.referenceAudioAccepted,true)
  assert.throws(()=>restarted.updateTtsSettings({revision:first.revision,values:{...saved.ttsSetup,referenceAudioPath:null,referenceAudioAccepted:false}},actor),/配置已改变/)
  busy=true
  assert.throws(()=>restarted.updateTtsSettings({revision:saved.revision,values:{...saved.ttsSetup,referenceAudioPath:null,referenceAudioAccepted:false}},actor),{code:'TTS_BUSY'})
  busy=false
  const cleared=restarted.updateTtsSettings({revision:saved.revision,values:{...saved.ttsSetup,referenceAudioPath:null,referenceAudioAccepted:false}},actor)
  assert.equal(cleared.ttsSetup.referenceAudioPath,null)
})

test('ASR compute preference is explicit, revision fenced, legacy writes preserve it, and SenseVoice CUDA stays blocked', t => {
  const f=fixture(t),values={asr:'sensevoice',modelCompute:'auto',models:{sensevoiceDir:'/models/sensevoice',campplus:''}}
  let settings=f.bridge.readSettings()
  assert.equal(settings.modelSetup.modelCompute,'cpu')
  settings=f.bridge.updateModelSettings({revision:settings.revision,values},actor,signal())
  assert.equal(f.read().modelCompute,'cpu');assert.equal(settings.modelSetup.modelCompute,'cpu');assert.equal(f.calls.length,0)
  settings=f.bridge.updateModelSettings({revision:settings.revision,values:{asr:values.asr,models:values.models}},actor,signal())
  assert.equal(f.read().modelCompute,'cpu','legacy client must not reset compute preference')
  assert.throws(()=>f.bridge.updateModelSettings({revision:settings.revision,values:{...values,modelCompute:'vulkan'}},actor,signal()))
  assert.throws(()=>f.bridge.updateModelSettings({revision:settings.revision,values:{...values,asr:'sensevoice',modelCompute:'cuda'}},actor,signal()))
  assert.equal(f.read().modelCompute,'cpu')
})

test('independent binding save works during active voice and preserves wake, grant and root', async t => {
  const f=fixture(t,{changeBindings:async(_actor,_signal,tx)=>{const state=tx.prepare();assert.equal(state.active,true);assert.equal(state.expectedSessionId,'origin');tx.assertCurrent();tx.persist()},readStatus:()=>({enabled:true,ownerSessionId:'origin',helper:{online:true},voiceSession:{id:'voice-current',fullyStopped:false}})})
  const settings=f.bridge.readSettings(actor)
  const saved=await f.bridge.updateBindings({revision:settings.revision,bindingContext:settings.bindingContext,values:{pttMouse:1,pttKeyboard:{code:'F8',modifiers:[]}}},actor,signal())
  assert.equal(saved.values.pttMouse,1);assert.equal(saved.values.pttKeyboard.code,'F8');assert.equal(f.read().voiceSessionId,'origin');assert.equal(f.read().voiceSessionEpoch,'keep-epoch');assert.deepEqual(f.read().voiceSession,f.persisted.voiceSession)
})
test('binding save refuses stale revision and session context before transaction persistence',async t=>{
 const f=fixture(t,{changeBindings:async(_a,_s,tx)=>{tx.prepare();tx.persist()},readStatus:()=>({enabled:true,ownerSessionId:'origin',helper:{online:true},voiceSession:{id:'voice-current'}})})
 const s=f.bridge.readSettings(actor),request={revision:s.revision,bindingContext:s.bindingContext,values:{pttMouse:1,pttKeyboard:null}}
 await assert.rejects(f.bridge.updateBindings({...request,revision:'0'.repeat(64)},actor,signal()),/配置已改变/)
 await assert.rejects(f.bridge.updateBindings({...request,bindingContext:{...s.bindingContext,epoch:'stale'}},actor,signal()),/语音会话已改变/)
 assert.equal(f.read().pttMouse,undefined)
})
test('independent binding save rejects unrelated settings',async t=>{
 const f=fixture(t,{changeBindings:async()=>assert.fail('must not dispatch')});const s=f.bridge.readSettings(actor)
 await assert.rejects(f.bridge.updateBindings({revision:s.revision,bindingContext:s.bindingContext,values:{pttMouse:1,pttKeyboard:null,wakeWordAliases:['别动']}},actor,signal()),/字段无效/)
})

test('issue #16: real TTS preflight rejection preserves config and permits a fresh save', async t => {
  const { createVoiceAgentControl } = await import('../voice-agent-control.mjs')
  const { createMemoryAgentPermissions } = await import('../voice-agent-policy.mjs')
  for (const reason of ['voice', 'busy', 'blocked']) {
    let stopped = false
    const f = fixture(t, {
      readStatus: () => ({ voiceControlBusy: false, enabled: reason === 'voice' && !stopped, ownerSessionId: null, voiceSession: { id: null, fullyStopped: true } }),
      sessionControl: { owner: () => null },
      readTtsStatus: () => ({ busy: reason === 'busy' && !stopped, blocked: reason === 'blocked' && !stopped }),
    })
    const permissions = createMemoryAgentPermissions()
    const control = createVoiceAgentControl({ api: f.bridge, assertCaller: f.hooks.assertCaller, permissions })
    const settings = f.bridge.readSettings(actor)
    const { deepseekTextTransmissionAccepted, referenceAudioAccepted, ...values } = settings.ttsSetup
    const params = { revision: settings.revision, values: { ...values, provider: 'off' } }
    const before = readFileSync(f.path, 'utf8')
    const result = await control.execute(actor, 'save-tts', params)
    assert.equal(result.status, 'rejected', reason)
    assert.equal(result.ok, false)
    assert.equal(result.request.error.code, reason === 'voice' ? 'TTS_VOICE_ACTIVE' : 'TTS_BUSY')
    assert.equal(readFileSync(f.path, 'utf8'), before)
    assert.deepEqual(permissions.read().authorization.blockedOperations, [])
    stopped = true
    assert.equal((await control.execute(actor, 'save-tts', params)).status, 'completed')
    assert.equal(f.read().tts.provider, 'off')
  }
})

test('issue #16: same-code failure after the write remains unknown and cannot retry', async t => {
  const { createVoiceAgentControl } = await import('../voice-agent-control.mjs')
  const { createMemoryAgentPermissions } = await import('../voice-agent-policy.mjs')
  let failAfterWrite = true
  const f = fixture(t, {
    readStatus: () => {
      if (failAfterWrite && f.read().tts?.provider === 'off') throw Object.assign(new Error('post-write status unavailable'), { code: 'TTS_BUSY' })
      return { voiceControlBusy: false, enabled: false, ownerSessionId: null, voiceSession: { id: null, fullyStopped: true } }
    },
    sessionControl: { owner: () => null },
  })
  const permissions = createMemoryAgentPermissions()
  const control = createVoiceAgentControl({ api: f.bridge, assertCaller: f.hooks.assertCaller, permissions })
  const settings = f.bridge.readSettings(actor)
  const { deepseekTextTransmissionAccepted, referenceAudioAccepted, ...values } = settings.ttsSetup
  const result = await control.execute(actor, 'save-tts', { revision: settings.revision, values: { ...values, provider: 'off' } })
  assert.equal(result.status, 'unknown')
  assert.equal(result.request.error.code, 'TTS_BUSY')
  assert.equal(f.read().tts.provider, 'off', 'write really occurred before the read failed')
  assert.deepEqual(permissions.read().authorization.blockedOperations, ['save-tts'])
  failAfterWrite = false
  assert.equal((await control.execute(actor, 'save-tts', { revision: f.bridge.readSettings(actor).revision, values: { ...values, provider: 'deepseek' } })).status, 'outcome-unknown')
  assert.equal(f.read().tts.provider, 'off')
})

test('conversation selection validates catalog, revisions and fully stopped state before writes', async t => {
  let busy=false, reject=false
  const f=fixture(t,{sessionControl:{owner:()=>null},readStatus:()=>({voiceControlBusy:busy,enabled:false,ownerSessionId:null,voiceSession:{id:null,fullyStopped:true}}),assertConversationModel:async()=>{if(reject)throw new Error('unavailable')},readConversationModels:async()=>({providers:[]})})
  const initial=f.bridge.readSettings(actor)
  assert.deepEqual(initial.conversationModel,{mode:'auto',provider:null,model:null})
  assert.deepEqual(await f.bridge.readConversationModels(actor),{providers:[]})
  const values={mode:'manual',provider:'real',model:'advertised'}
  const saved=await f.bridge.updateConversationModel({revision:initial.revision,values},actor)
  assert.deepEqual(saved.conversationModel,values)
  assert.equal(f.read().voiceSession.allowedSessionIds[0],'keep-authorized')
  await assert.rejects(f.bridge.updateConversationModel({revision:initial.revision,values},actor),{name:'VoicePreflightError'})
  busy=true
  await assert.rejects(f.bridge.updateConversationModel({revision:saved.revision,values},actor),{name:'VoicePreflightError'})
  busy=false;reject=true
  await assert.rejects(f.bridge.updateConversationModel({revision:saved.revision,values},actor),{name:'VoicePreflightError'})
  const auto=await f.bridge.updateConversationModel({revision:saved.revision,values:{mode:'auto',provider:null,model:null}},actor)
  assert.deepEqual(auto.conversationModel,{mode:'auto',provider:null,model:null})
  assert.equal(f.read().voiceSession.provider,null)
})

test('conversation selection rechecks state and revision after catalog await',async t=>{
  let mutate
  const f=fixture(t,{sessionControl:{owner:()=>null},readStatus:()=>({voiceControlBusy:false,enabled:false,ownerSessionId:null,voiceSession:{id:null,fullyStopped:true}}),assertConversationModel:async()=>mutate()})
  const revision=f.bridge.readSettings(actor).revision
  mutate=()=>writeFileSync(f.path,JSON.stringify({...f.read(),changedByOther:true}))
  await assert.rejects(f.bridge.updateConversationModel({revision,values:{mode:'manual',provider:'a',model:'b'}},actor),{name:'VoicePreflightError'})
  assert.equal(f.read().voiceSession.conversationModelMode,undefined)
})


test('UI uses the passive owned TTS reader for status and mode-save replies without extra work', t => {
 let state={supported:true,modelResident:true,blocked:false,compute:{path:'PRIVATE_PATH'},reason:'PRIVATE_LOG'}, reads=0
 const f=fixture(t,{...stoppedModeHooks(),readTtsResidency:()=>{reads++;return state}})
 const initial=f.bridge.status(actor).voiceSession.ttsResidency
 assert.equal(initial.status,'resident');assert.equal(initial.supported,true);assert.equal(reads,1)
 assert.deepEqual(Object.keys(initial).sort(),['reason','status','supported']);assert.doesNotMatch(JSON.stringify(initial),/PRIVATE/)
 const saved=f.bridge.setPerformanceMode({revision:f.bridge.readSettings().revision,performanceMode:'fast'},actor,signal())
 assert.deepEqual(saved.ttsResidency,initial);assert.equal(reads,2);assert.equal(f.calls.length,0)
 state={...state,modelResident:false}
 assert.equal(f.bridge.status(actor).voiceSession.ttsResidency.status,'not-resident')
 state={...state,modelResident:true,blocked:true}
 assert.equal(f.bridge.status(actor).voiceSession.ttsResidency.status,'blocked')
 const before=reads
 assert.throws(()=>f.bridge.status({session:{id:'spoof'}}),/来源/);assert.equal(reads,before)
})

test('UI sanitizes projected session residency and fails closed when the passive reader throws', t => {
 const f=fixture(t,{readStatus:()=>({voiceSession:{id:'live',ttsResidency:{supported:true,status:'resident',reason:'PRIVATE_PATH',log:'PRIVATE_LOG'}}})})
 const state=f.bridge.status(actor).voiceSession.ttsResidency
 assert.equal(state.supported,true);assert.equal(state.status,'resident');assert.doesNotMatch(JSON.stringify(state),/PRIVATE/)
 f.hooks.readTtsResidency=()=>{throw Error('PRIVATE_PATH')}
 const unknown=f.bridge.status(actor).voiceSession.ttsResidency
 assert.equal(unknown.supported,false);assert.equal(unknown.status,'unverified');assert.doesNotMatch(JSON.stringify(unknown),/PRIVATE/)
})

test('prompt settings save supported additional text with full allowance and revision fencing', t => {
 const f=fixture(t,stoppedModeHooks());let snapshot=f.bridge.readSettings(actor)
 assert.deepEqual(snapshot.voicePrompt,{text:'',mode:'agents',customSupported:true,unsupportedReason:null})
 for(const text of ['用中文回答','x'.repeat(32768)]){
  snapshot=f.bridge.updateVoicePrompt({revision:snapshot.revision,values:{text}},actor,signal())
  assert.equal(snapshot.voicePrompt.text,text);assert.equal(snapshot.voicePrompt.mode,'custom');assert.equal(f.read().voiceSession.customPrompt,text)
 }
 assert.equal(f.calls.length,0)
})

test('clearing custom prompt restores default without touching legacy or unrelated configuration', t => {
 const f=fixture(t,stoppedModeHooks());writeFileSync(f.path,JSON.stringify({...f.read(),voiceSession:{...f.read().voiceSession,customPrompt:'saved custom text',instructions:'keep legacy additive text'}}))
 const before=f.bridge.readSettings(actor);assert.equal(before.voicePrompt.text,'saved custom text');assert.equal(before.voicePrompt.mode,'custom')
 const saved=f.bridge.updateVoicePrompt({revision:before.revision,values:{text:'  \n\t'}},actor,signal())
 assert.equal(saved.voicePrompt.text,'');assert.equal(saved.voicePrompt.mode,'agents');assert.equal(saved.apply,'next-voice-enable');assert.notEqual(saved.revision,before.revision)
 assert.equal(f.read().voiceSession.customPrompt,'');assert.equal(f.read().voiceSession.instructions,'keep legacy additive text');assert.deepEqual(f.read().voiceSession.allowedSessionIds,['keep-authorized']);assert.equal(f.read().privateUnrelated,'do-not-project')
 assert.throws(()=>f.bridge.updateVoicePrompt({revision:before.revision,values:{text:''}},actor,signal()),/配置已改变/)
})

test('prompt writes reject malformed, stale, aborted and forged requests without writing', t => {
 const f=fixture(t,stoppedModeHooks()),{revision}=f.bridge.readSettings(actor),before=readFileSync(f.path,'utf8')
 for(const request of [{revision,values:{text:12}},{revision,values:{text:'x'.repeat(32769)}},{revision,values:{text:'',customSupported:true}},{revision,values:{text:''},source:'human'},{revision:'stale',values:{text:''}}]) assert.throws(()=>f.bridge.updateVoicePrompt(request,actor,signal()),{name:'VoicePreflightError'})
 assert.throws(()=>f.bridge.updateVoicePrompt({revision,values:{text:''}},{session:{id:'origin'}},signal()),/来源/)
 const aborted=new AbortController();aborted.abort();assert.throws(()=>f.bridge.updateVoicePrompt({revision,values:{text:''}},actor,aborted.signal),/取消/)
 assert.equal(readFileSync(f.path,'utf8'),before)
})

test('prompt writes require confirmed complete stop and do not stop ongoing work implicitly', t => {
 for(const delta of [{enabled:true},{ownerSessionId:'owner'},{voiceControlBusy:true},{voiceSession:{id:null,fullyStopped:false}},{voiceSession:{id:null,fullyStopped:true,recovery:{kind:'live-root-conflict'}}}]){
  const base=stoppedModeHooks(),f=fixture(t,{...base,readStatus:()=>({...base.readStatus(),...delta})}),{revision}=f.bridge.readSettings(actor),before=readFileSync(f.path,'utf8')
  assert.throws(()=>f.bridge.updateVoicePrompt({revision,values:{text:''}},actor,signal()),/关闭语音/);assert.equal(readFileSync(f.path,'utf8'),before);assert.equal(f.calls.length,0)
 }
})


test('empty prompt save overrides inherited custom text rather than exposing it again', t => {
 let f;f=fixture(t,{...stoppedModeHooks(),readEffectiveConfig:()=>{const config=f.read();return {device:null,pttMouse:2,...config,voiceSession:{customPrompt:'inherited unsupported text',...config.voiceSession}}}})
 const before=f.bridge.readSettings(actor);assert.equal(before.voicePrompt.text,'inherited unsupported text')
 const saved=f.bridge.updateVoicePrompt({revision:before.revision,values:{text:''}},actor,signal())
 assert.equal(saved.voicePrompt.text,'');assert.equal(f.read().voiceSession.customPrompt,'')
})
