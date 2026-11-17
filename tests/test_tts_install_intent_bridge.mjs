import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { requireFileSymlink } from './helpers/symlink.mjs'
import { createVoiceUiBridge } from '../voice-ui-bridge.mjs'
import { createVoiceAgentControl } from '../voice-agent-control.mjs'
import { TTS_DEFAULTS } from '../voice-tts.mjs'
const actor = { session: { id: 'owner' } }
const tick = () => new Promise(resolve => setImmediate(resolve))
function fixture(t, initialProvider = 'system') {
  const dir = mkdtempSync(join(tmpdir(), 'tts-intent-')); t.after(() => rmSync(dir, { recursive: true, force: true }))
  const path = join(dir, 'config.json')
  writeFileSync(path, JSON.stringify({ device: null, pttMouse: 2, speakerVerification: { enabled: false }, asr: 'whisper', modelCompute: 'cuda', models: { whisper: '/old', campplus: '/keep' }, tts: { ...TTS_DEFAULTS, provider: initialProvider, volume: 0.31 } }))
  const read = () => JSON.parse(readFileSync(path, 'utf8'))
  const listeners = new Set(), jobs = []
  let probes = 0, revision = 1, beforeProbe = async () => {}, ready = true, starts = 0
  const installer = {
    snapshot: () => ({ jobs }), subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },
    plan: () => ({ purpose: 'tts' }),
    start(request) { starts++; assert.equal(request.useWhenReady, undefined); const job = { id: 'job', modelId: 'qwen', status: 'queued' }; jobs.push(job); return { ...job } },
    resume(id) { jobs.find(j => j.id === id).status = 'queued' },
    pause(id) { jobs.find(j => j.id === id).status = 'paused' },
    cancel(id) { jobs.find(j => j.id === id).status = 'cancelled' },
    async verifyInstalled(id) { const job = jobs.find(j => j.id === id); if (job?.status !== 'installed') throw Error('not installed'); return { ...job } },
  }
  const hooks = { configPath: path, readEffectiveConfig: read, assertCaller(a) { assert.equal(a, actor) }, readStatus: () => ({ enabled: false, voiceControlBusy: false, ownerSessionId: null, voiceSession: { fullyStopped: true, id: null } }), sessionControl: { owner: () => null }, modelInstaller: () => installer,
    captureTtsInstallAuthorization: () => ({ revision }),
    assertTtsInstallAuthorization(a, token) { assert.equal(a, actor); if (revision !== token.revision) throw Error('grant changed') },
    async verifyInstalledTts(config) { probes++; assert.equal(config.provider, 'local'); assert.equal(read().tts.provider, initialProvider, 'never writes candidate before verification'); await beforeProbe(); return { synthesisVerified: ready } },
  }
  const bridge = createVoiceUiBridge(hooks)
  function installed() { Object.assign(jobs[0], { status: 'installed', purpose: 'tts', recommendedSettings: { tts: { provider: 'local', localModelId: 'qwen', localModelPath: '/managed/qwen' } } }); for (const fn of listeners) fn(installer.snapshot()) }
  const start = useWhenReady => bridge.startModelInstall({ modelId: 'qwen', compute: 'cpu', accepted: true, planHash: 'plan', ...(useWhenReady ? { useWhenReady: true } : {}) }, actor)
  return { bridge, hooks, read, path, installed, start, probes: () => probes, starts: () => starts, revoke: () => revision++, beforeProbe: fn => beforeProbe = fn, unready: () => ready = false, changeConfig: () => writeFileSync(path, JSON.stringify({ ...read(), manualSetting: true })) }
}
test('download and use survives UI unsubscribe, verifies once, and preserves ASR/volume', async t => {
  const f = fixture(t); const off = f.bridge.subscribeModelInstaller(actor, () => {}); f.start(true); off(); f.installed(); await tick()
  assert.equal(f.probes(), 1); assert.equal(f.read().tts.provider, 'local'); assert.equal(f.read().tts.volume, 0.31)
  assert.equal(f.read().asr, 'whisper'); assert.equal(f.read().modelCompute, 'cuda'); assert.deepEqual(f.read().models, { whisper: '/old', campplus: '/keep' })
  assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status, 'applied')
  f.installed(); await tick(); assert.equal(f.probes(), 1)
})
test('download alone and installer reads never synthesize or apply', async t => {
  const f = fixture(t); f.start(false); f.installed(); f.bridge.readModelInstaller(actor); await tick()
  assert.equal(f.probes(), 0); assert.equal(f.read().tts.provider, 'system')
})
test('explicit TTS apply validates silently before atomic save', async t => {
  const f = fixture(t); f.start(false); f.installed()
  const result = await f.bridge.applyModelInstall({ id: 'job', revision: f.bridge.readSettings(actor).revision }, actor)
  assert.equal(result.synthesisVerified, true); assert.equal(result.runtimeLoaded, false); assert.equal(f.probes(), 1)
})
for (const change of ['unready', 'revoke', 'changeConfig']) test(`download and use preserves old settings when ${change}`, async t => {
  const f = fixture(t); f.start(true); f[change](); f.installed(); await tick()
  assert.equal(f.read().tts.provider, 'system'); assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status, 'blocked')
})
for (const change of ['revoke', 'changeConfig']) test(`change during synthesis (${change}) fences write`, async t => {
  const f = fixture(t); f.beforeProbe(async () => f[change]()); f.start(true); f.installed(); await tick()
  assert.equal(f.probes(), 1); assert.equal(f.read().tts.provider, 'system'); assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status, 'blocked')
})
test('restart never replays settings or download; explicit resume can reactivate installed job', async t => {
  const f = fixture(t); f.start(true); f.bridge.suspendTtsInstallIntent(); f.installed()
  const restarted = createVoiceUiBridge(f.hooks); await tick()
  assert.equal(f.probes(), 0); assert.equal(f.starts(), 1); assert.equal(restarted.readModelInstaller(actor).ttsInstallIntent.reason, 'restart-requires-resume')
  await restarted.controlModelInstall({ id: 'job', operation: 'resume' }, actor); await tick()
  assert.equal(f.probes(), 1); assert.equal(f.starts(), 1); assert.equal(f.read().tts.provider, 'local')
})
test('restart with changed manual config cannot resume stale intent', async t => {
  const f = fixture(t); f.start(true); f.bridge.suspendTtsInstallIntent(); f.installed(); f.changeConfig()
  const restarted = createVoiceUiBridge(f.hooks)
  await assert.rejects(restarted.controlModelInstall({ id: 'job', operation: 'resume' }, actor), /配置已改变/)
  assert.equal(f.probes(), 0)
})
test('cancel pending intent prevents later installed event from applying', async t => {
  const f = fixture(t); f.start(true); await f.bridge.controlModelInstall({ id: 'job', operation: 'cancel' }, actor); f.installed(); await tick()
  assert.equal(f.probes(), 0); assert.equal(f.read().tts.provider, 'system'); assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status, 'cancelled')
})

test('real permission boundary can capture and apply a human download-and-use intent', async t => {
  const f = fixture(t, 'off')
  let control
  const raw = createVoiceUiBridge({ ...f.hooks,
    captureTtsInstallAuthorization: (agent, request, signal, human) => human ? control.captureHumanModelInstallAuthorization(agent, request, signal) : control.captureModelInstallAuthorization(agent, request, signal),
    completeTtsInstallAuthorization: (agent, token, values) => control.completeModelInstallAuthorization(agent, token, values),
    assertTtsInstallAuthorization: (agent, token, target) => control.assertModelInstallAuthorization(agent, token, target),
  })
  control = createVoiceAgentControl({ api: raw, humanApiOverrides: {startModelInstall:raw.startModelInstallForHuman,controlModelInstall:raw.controlModelInstallForHuman}, assertCaller: a => assert.equal(a, actor),
    authorizationSources: () => [{ modelId: 'qwen', source: 'https://huggingface.co/test', licenseUrls: [], licenseNote: '' }],
  })
  await control.humanApi.saveAuthorization({ revision: control.humanApi.readAuthorization().revision, grant: true })
  const original=raw.readSettings(actor)
  await control.humanApi.updateTtsSettings({revision:original.revision,values:original.ttsSetup},actor) // explicit human pins
  control.humanApi.startModelInstall({ modelId: 'qwen', compute: 'cpu', accepted: true, planHash: 'plan', useWhenReady: true }, actor)
  f.installed(); await tick()
  assert.equal(raw.readModelInstaller(actor).ttsInstallIntent.status, 'applied')
  assert.equal(f.read().tts.provider, 'local')
})

for (const damage of ['json', 'oversized', 'symlink', 'shape']) test(`unsafe intent ledger (${damage}) neither breaks reads nor starts download`, t => {
  const f = fixture(t), path = f.path + '.tts-install-intent.json'
  if (damage === 'symlink') {
    if (!requireFileSymlink(t, dirname(f.path))) return
    const target = f.path + '.valid-intent.json'
    writeFileSync(target, JSON.stringify({ schema: 1, jobId: 'job', modelId: 'qwen', baseline: 'a'.repeat(64), status: 'applied', reason: null }))
    symlinkSync(target, path, 'file')
  }
  else writeFileSync(path, damage === 'json' ? '{' : damage === 'oversized' ? 'x'.repeat(17000) : JSON.stringify({ schema: 1, jobId: null }))
  const before = readFileSync(f.path, 'utf8'), raw = createVoiceUiBridge(f.hooks)
  assert.equal(raw.readModelInstaller(actor).ttsInstallIntent, null)
  assert.throws(() => raw.startModelInstall({ modelId: 'qwen', compute: 'cpu', useWhenReady: true }, actor), { code: 'TTS_INTENT_LEDGER_INVALID' })
  assert.equal(f.starts(), 0); assert.equal(readFileSync(f.path, 'utf8'), before)
  if (damage === 'symlink') assert.equal(JSON.parse(readFileSync(f.path + '.valid-intent.json', 'utf8')).status, 'applied')
})

for (const uncertain of [false,true]) test(`pause during installed-model verification waits or reports unconfirmed (${uncertain})`, async t => {
  const f=fixture(t)
  let release
  const cleanup=new Promise(resolve=>release=resolve)
  f.beforeProbe(()=>cleanup)
  f.hooks.cancelTts=async()=>{if(!uncertain)await cleanup;return{status:uncertain?'unconfirmed':'cancelled'}}
  f.start(true);f.installed();await tick()
  assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status,'verifying')
  let finished=false
  const pausing=f.bridge.controlModelInstall({id:'job',operation:'pause'},actor).finally(()=>finished=true)
  pausing.catch(()=>{})
  await tick()
  if(uncertain){await assert.rejects(pausing,{code:'TTS_TERMINATION_UNCONFIRMED'});assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status,'blocked')}
  else {assert.equal(finished,false);assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status,'verifying')}
  release();await tick()
  if(!uncertain){await pausing;assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status,'paused')}
  assert.equal(f.read().tts.provider,'system')
})
for (const restart of [false,true]) test(`trusted human resume renews changed baseline without losing current preferences (${restart})`,async t=>{
  const f=fixture(t);f.start(true);f.bridge.suspendTtsInstallIntent();f.installed()
  writeFileSync(f.path,JSON.stringify({...f.read(),tts:{...f.read().tts,volume:0.22},manualSetting:'keep'}))
  const bridge=restart?createVoiceUiBridge(f.hooks):f.bridge
  await assert.rejects(bridge.controlModelInstall({id:'job',operation:'resume'},actor),/配置已改变/)
  await bridge.controlModelInstallForHuman({id:'job',operation:'resume'},actor);await tick()
  assert.equal(bridge.readModelInstaller(actor).ttsInstallIntent.status,'applied')
  assert.equal(f.read().tts.provider,'local');assert.equal(f.read().tts.volume,0.22);assert.equal(f.read().manualSetting,'keep')
})
test('successful explicit same-job TTS apply clears old blocked intent only after verification',async t=>{
  const f=fixture(t);f.start(true);f.bridge.suspendTtsInstallIntent();f.installed()
  assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status,'blocked')
  await f.bridge.applyModelInstall({id:'job',revision:f.bridge.readSettings(actor).revision},actor)
  assert.equal(f.bridge.readModelInstaller(actor).ttsInstallIntent.status,'applied')
})

test('install apply preserves the owner reference selection and passes it into candidate verification',async t=>{
  const f=fixture(t),referenceAudioPath=join(tmpdir(),'explicit-owner-selection.wav')
  writeFileSync(f.path,JSON.stringify({...f.read(),tts:{...f.read().tts,referenceAudioPath,referenceAudioAccepted:true}}))
  let seen
  const bridge=createVoiceUiBridge({...f.hooks,verifyInstalledTts:async config=>{seen=config;return{synthesisVerified:true}}})
  f.start(false);f.installed()
  await bridge.applyModelInstall({id:'job',revision:bridge.readSettings(actor).revision},actor)
  assert.equal(seen.referenceAudioPath,referenceAudioPath);assert.equal(seen.referenceAudioAccepted,true)
  assert.equal(f.read().tts.referenceAudioPath,referenceAudioPath);assert.equal(f.read().tts.referenceAudioAccepted,true)
})
