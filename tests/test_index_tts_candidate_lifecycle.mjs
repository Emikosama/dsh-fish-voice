/** Executes the real index/bridge/policy; only model installer and native TTS are fakes. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
const defer = () => { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b }); return { promise, resolve, reject } }
const tick = () => new Promise(resolve => setImmediate(resolve))
for (const uncertain of [false, true]) test(`real index candidate stop, revoke and disposal (${uncertain ? 'unconfirmed' : 'confirmed'})`, async t => {
  const home = mkdtempSync(join(tmpdir(), 'index-tts-stop-')), priorHome = process.env.DSH_HOME
  process.env.DSH_HOME = home; mkdirSync(join(home, 'whale-ear'))
  writeFileSync(join(home, 'whale-ear', 'config.json'), JSON.stringify({ autoStart:false, voiceSession:{enabled:false}, tts:{provider:'system'} }))
  const key = '__ttsTest' + randomUUID().replaceAll('-', '')
  const probe = defer(), cleanup = defer(), state = { busy: false, blocked: false, candidateCancels: 0, mainCancels: 0, cleanupStarted: false }
  const runtime = candidate => ({
    status: () => ({ busy: candidate && state.busy, blocked: candidate && state.blocked, state: candidate && state.blocked ? 'blocked' : candidate && state.busy ? 'verifying' : 'idle' }),
    async verifyLocalTts() { state.busy = true; return probe.promise },
    async cancel() { if (!candidate) { state.mainCancels++; return {status:'idle'} } state.candidateCancels++; state.busy=false; state.blocked=uncertain; probe.reject(Object.assign(new Error('cancelled'), { code:'ABORTED' })); return {status: uncertain ? 'unconfirmed' : 'cancelled'} },
    async dispose() { if(candidate) { state.cleanupStarted=true; await cleanup.promise } },
    inspect: async () => ({}), preview: async () => ({}), speak: async () => { throw Error('must not speak') },
  })
  let count=0
  const job = { id:'job', modelId:'qwen', purpose:'tts', status:'installed', recommendedSettings:{tts:{provider:'local',localModelId:'qwen',localModelPath:'/managed/qwen'}} }
  globalThis[key] = { createTtsRuntime: () => runtime(count++ > 0), createModelInstaller: () => ({ snapshot:()=>({jobs:[job],models:[]}), verifyInstalled:async()=>job, subscribe:()=>()=>{}, close:async()=>{} }) }
  const ttsUrl = new URL('../voice-tts.mjs', import.meta.url).href
  const hooks=registerHooks({ resolve(specifier,context,next) {
    if(context.parentURL?.includes('/index.mjs?') && specifier==='./voice-tts.mjs') return {url:'data:text/javascript,'+encodeURIComponent(`export {TTS_DEFAULTS,ttsSettings,createWindowsTtsAdapter} from ${JSON.stringify(ttsUrl)};export const createTtsRuntime=globalThis.${key}.createTtsRuntime;`),shortCircuit:true}
    if(context.parentURL?.includes('/index.mjs?') && specifier==='./voice-model-installer.mjs') return {url:'data:text/javascript,'+encodeURIComponent(`export const createModelInstaller=globalThis.${key}.createModelInstaller;`),shortCircuit:true}
    return next(specifier,context)
  } })
  const actor={session:{id:'owner'}}, tools=new Map(), agents=new Map([['owner',actor]])
  const ctx={agents,tools:{register(spec){tools.set(spec.name,spec);return()=>{}}},sessions:{},provide(){},effect(){},on(){return()=>{}},get(){}}
  let instance
  try { const module=await import(`../index.mjs?candidate=${randomUUID()}`); module.apply(ctx,{autoStart:false}); instance=globalThis.__dshWhaleEar__; assert.ok(instance) } finally { hooks.deregister() }
  t.after(async()=>{ cleanup.resolve(); probe.reject(Error('cleanup')); await instance?.dispose().catch(()=>{}); delete globalThis.__dshWhaleEar__;delete globalThis[key]; if(priorHome===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=priorHome; rmSync(home,{recursive:true,force:true}) })
  const ui=instance.uiBridge
  await ui.saveAuthorization({revision:ui.readAuthorization().revision,grant:true})
  const applying=ui.applyModelInstall({id:'job',revision:ui.readSettings(actor).revision},actor); applying.catch(()=>{})
  await tick(); assert.equal(ui.status(actor).ttsRuntime.busy,true)
  await assert.rejects(ui.changeForCaller(actor,true), {code:'TTS_BUSY'})
  await assert.rejects(ui.inspectTts(actor), {code:'TTS_BUSY'})
  let stopSettled=false
  const stopping=ui.cancelTts(actor).finally(()=>stopSettled=true); stopping.catch(()=>{})
  await tick(); assert.equal(state.cleanupStarted,true); assert.equal(stopSettled,false,'cancel waits for candidate disposal')
  const revoking=ui.saveAuthorization({revision:ui.readAuthorization().revision,grant:false}); revoking.catch(()=>{})
  const disposing=instance.dispose(); disposing.catch(()=>{}); let disposed=false;disposing.finally(()=>disposed=true).catch(()=>{})
  await tick();assert.equal(disposed,false,'predecessor disposal waits for candidate cleanup')
  cleanup.resolve()
  await assert.rejects(applying)
  if(uncertain){ await assert.rejects(stopping,{code:'TTS_TERMINATION_UNCONFIRMED'});await assert.rejects(disposing,AggregateError);assert.equal(ui.status(actor).ttsRuntime.blocked,true) }
  else { assert.equal((await stopping).status,'cancelled'); await disposing }
  await assert.rejects(revoking, /插件已卸载/) // response races unload, but durable policy must retain cleanup outcome
  const policy=JSON.parse(readFileSync(join(home,'whale-ear','config.json.agent-permissions.json'),'utf8'))
  assert.equal(policy.authorization.revocationUnconfirmed,uncertain,'revocation retains unconfirmed cleanup evidence')
  assert.ok(state.mainCancels>0)
})
