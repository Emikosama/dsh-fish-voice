/** Real entry/session/UI/runtime wiring; native residency ownership is injected. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { createTtsRuntime } from '../voice-tts.mjs'
import { createResidentTtsLease } from '../voice-tts-resident.mjs'

const tick = () => new Promise(resolve => setImmediate(resolve))
test('real entry projects live owned residency without starting audio or extending idle retention', async t => {
 const home=mkdtempSync(join(tmpdir(),'index-tts-residency-')),priorHome=process.env.DSH_HOME
 process.env.DSH_HOME=home;mkdirSync(join(home,'whale-ear'))
 writeFileSync(join(home,'whale-ear','config.json'),JSON.stringify({autoStart:false,voiceSession:{enabled:false},tts:{provider:'system'}}))
 const key='__ttsResidency'+randomUUID().replaceAll('-',''),timers=[],cleared=[]
 let starts=0,stops=0,inspectionCalls=0,runtimeCount=0
 const lease=createResidentTtsLease({
  getMode:()=> 'balanced',setTimer:(callback,delay)=>{const timer={callback,delay,unref(){}};timers.push(timer);return timer},clearTimer:timer=>cleared.push(timer),
  createSession:()=>{starts++;let live=true;return {
   speak:async()=>({completion:'complete'}),stop:async()=>{stops++;live=false},
   residency:()=>({supported:true,modelResident:live,compute:{path:'PRIVATE_PATH'},reason:'PRIVATE_LOG'}),
  }},
 })
 globalThis[key]={create:options=>{runtimeCount++;return createTtsRuntime({...options,localAdapter:{
  residency:()=>lease.residency(),close:()=>lease.close(),
  inspect:async()=>{inspectionCalls++;throw Error('Unexpected inspection')},
  speak:async()=>{throw Error('Unexpected synthesis')},probe:async()=>{throw Error('Unexpected probe')},
 }})}}
 const ttsUrl=new URL('../voice-tts.mjs',import.meta.url).href
 const hook=registerHooks({resolve(specifier,context,next){
  if(context.parentURL?.includes('/index.mjs?')&&specifier==='./voice-tts.mjs')return {url:'data:text/javascript,'+encodeURIComponent(`export {TTS_DEFAULTS,ttsSettings,createWindowsTtsAdapter} from ${JSON.stringify(ttsUrl)};export const createTtsRuntime=globalThis.${key}.create;`),shortCircuit:true}
  return next(specifier,context)
 }})
 const actor={session:{id:'owner'}},agents=new Map([['owner',actor]])
 const ctx={agents,tools:{register(){return()=>{}}},sessions:{},provide(){},effect(){},on(){return()=>{}},get(){}}
 let instance
 t.after(async()=>{hook.deregister();await instance?.dispose().catch(()=>{});delete globalThis.__dshWhaleEar__;delete globalThis[key];if(priorHome===undefined)delete process.env.DSH_HOME;else process.env.DSH_HOME=priorHome;rmSync(home,{recursive:true,force:true})})
 try {const module=await import(`../index.mjs?residency=${randomUUID()}`);module.apply(ctx,{autoStart:false});instance=globalThis.__dshWhaleEar__} finally {hook.deregister()}
 await tick() // Let cold-start grant revocation finish before simulating an owned utterance.
 assert.ok(instance);assert.equal(runtimeCount,1)
 assert.equal(instance.uiBridge.status(actor).voiceSession.ttsResidency.status,'unverified')
 assert.equal(starts,0);assert.equal(timers.length,0);assert.equal(inspectionCalls,0)
 // Simulate one completed owned utterance using the real lease, not the public status path.
 await lease.speak('identity',{signal:new AbortController().signal},{})
 assert.equal(starts,1);assert.equal(timers.length,1);assert.equal(timers[0].delay,60000)
 for(let i=0;i<5;i++){
  const status=instance.uiBridge.status(actor).voiceSession.ttsResidency
  assert.equal(status.supported,true);assert.equal(status.status,'resident')
  assert.deepEqual(Object.keys(status).sort(),['reason','status','supported'])
  assert.doesNotMatch(JSON.stringify(status),/PRIVATE/)
 }
 assert.equal(starts,1);assert.equal(stops,0);assert.equal(inspectionCalls,0)
 assert.equal(timers.length,1);assert.equal(cleared.length,0,'polling does not renew the idle lease')
 timers[0].callback();await tick()
 assert.equal(stops,1);assert.equal(instance.tts.residency().modelResident,false)
 assert.notEqual(instance.uiBridge.status(actor).voiceSession.ttsResidency.status,'resident')
 assert.equal(starts,1);assert.equal(timers.length,1);assert.equal(inspectionCalls,0)
})
