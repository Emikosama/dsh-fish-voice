import test from 'node:test'
import assert from 'node:assert/strict'
import { createResidentTtsLease } from '../voice-tts-resident.mjs'
import { createTtsRuntime, TTS_DEFAULTS } from '../voice-tts.mjs'
const tick = () => new Promise(resolve => setImmediate(resolve))
function fixture({mode='balanced',stop,speak}={}) {
  let creates=0,stops=0, live=false
  const timers=[]
  const lease=createResidentTtsLease({ getMode:()=>mode, setTimer:fn=>{timers.push(fn);return timers.length},clearTimer:()=>{},createSession:()=>{
    creates++;live=true
    return {speak: speak??(async()=>({completion:'complete'})),stop:async()=>{stops++;await stop?.();live=false},residency:()=>({supported:true,modelResident:live})}
  }})
  return {lease,timers,get creates(){return creates},get stops(){return stops}}
}
test('reuse same identity, retire changed model/config/reference identity, idle cancel',async()=>{
 const f=fixture();await f.lease.speak('a',{});await f.lease.speak('a',{});assert.equal(f.creates,1)
 await f.lease.speak('b',{});assert.equal(f.stops,1);assert.equal(f.creates,2)
 assert.equal(f.lease.residency().modelResident,true);await f.lease.close();assert.equal(f.stops,2);assert.equal(f.lease.residency().modelResident,false)
})
test('generation prevents stale idle timer closing next speech; current timer unloads',async()=>{
 const f=fixture();await f.lease.speak('a',{});await f.lease.speak('a',{});f.timers[0]();await tick();assert.equal(f.stops,0)
 f.timers[1]();await tick();assert.equal(f.stops,1)
})
test('fast pins until explicit close',async()=>{const f=fixture({mode:'fast'});await f.lease.speak('a',{});assert.equal(f.timers.length,0);await f.lease.close();assert.equal(f.stops,1)})
test('concurrent starts rejected; stop unknown blocks replacement',async()=>{
 let resolve;const f=fixture({speak:()=>new Promise(r=>resolve=r),stop:()=>{throw Error('uncertain')}})
 const first=f.lease.speak('a',{});await assert.rejects(f.lease.speak('a',{}),{code:'TTS_BUSY'});resolve({});await first
 await assert.rejects(f.lease.close(),{uncertain:true});await assert.rejects(f.lease.speak('b',{}),{uncertain:true});assert.equal(f.creates,1)
})
test('new speech waits in-flight idle unload before replacement',async()=>{
 let finish;const f=fixture({stop:()=>new Promise(r=>finish=r)});await f.lease.speak('a',{});f.timers[0]();const next=f.lease.speak('a',{});await tick();assert.equal(f.creates,1);finish();await next;assert.equal(f.creates,2)
})
test('runtime idle cancel and dispose release local engine; uncertain stop locks speech',async()=>{
 let closes=0,fail=false
 const runtime=createTtsRuntime({getConfig:()=>TTS_DEFAULTS,adapter:{},localAdapter:{close:async()=>{closes++;if(fail)throw Error('unknown')}}})
 assert.equal((await runtime.cancel()).status,'idle');assert.equal(closes,1);fail=true
 assert.equal((await runtime.cancel()).status,'unconfirmed');await assert.rejects(runtime.speak('hi'),{code:'TTS_BLOCKED'});await runtime.dispose();assert.equal(closes,3)
})

import { createManagedLocalTtsAdapter } from '../voice-tts-local.mjs'
import { createQwenResidentSession } from '../voice-qwen-stream.mjs'
import { realpath, mkdtemp, writeFile, readFile, rm, access } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
function wav(){const b=Buffer.alloc(46);b.write('RIFF');b.writeUInt32LE(38,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(24000,24);b.writeUInt32LE(48000,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(2,40);return b}
async function managed(t,{playback,fetch}={}){
 const root=await realpath(await mkdtemp(join(tmpdir(),'whale-resident-test-')));t.after(()=>rm(root,{recursive:true,force:true}))
 const value={engine:'llama-qwen3',modelId:'qwen',runtimeId:'1'.repeat(64),computeRequested:'cpu',executable:join(root,'cli'),model:join(root,'model'),mmproj:join(root,'mmproj'),serverRuntime:{backend:'cpu',runtimeId:'1'.repeat(64),archivePath:join(root,'archive')}}
 for(const path of [value.executable,value.model,value.mmproj,value.serverRuntime.archivePath])await writeFile(path,'fixture')
 let verified=0,launches=0,stops=0,requests=0;const played=[]
 const adapter=createManagedLocalTtsAdapter({getResidencyMode:()=> 'fast',resolveManagedLocalTts:async()=>{verified++;return value},runner:()=>{throw Error('CLI forbidden')},launchServer:async descriptor=>{assert.equal(descriptor.backend,'cpu');launches++;let running=true;return {port:12345,compute:{backend:'cpu',gpuLayers:0},status:()=>({running}),stop:async()=>{stops++;running=false}}},createResidentSession:options=>createQwenResidentSession({...options,fetch:async(url,options)=>{requests++;const body=JSON.parse(options.body);assert.equal(body.stream,false);assert.equal(body.n_predict,2048);assert.equal(body.repeat_penalty,1.0);assert.equal(body.top_k,40);assert.equal(body.top_p,.95);assert.equal(body.seed,42);return fetch?fetch(url,options):new Response(wav(),{headers:{'content-type':'audio/wav'}})}}),playback:async(path,config,signal)=>{played.push(path);assert.deepEqual(await readFile(path),wav());return playback?playback(path,config,signal):{completed:true}}})
 t.after(()=>adapter.close().catch(()=>{}));return{adapter,value,root,played,config:{localModelId:'qwen',volume:.5},get counts(){return{verified,launches,stops,requests}}}
}
test('managed WAV verifies each utterance, reuses owned server, cleans WAV, preserves config, invalidates artifacts',async t=>{
 const f=await managed(t);await f.adapter.inspect(f.config);assert.equal(f.counts.launches,0)
 const first=await f.adapter.speak('one',f.config);assert.equal(first.localTimings.modelResident,true)
 await f.adapter.speak('two',f.config);assert.equal(f.counts.launches,1);assert.equal(f.counts.verified,3)
 for(const path of f.played)await assert.rejects(access(path))
 await f.adapter.speak('volume',{...f.config,volume:.8});assert.equal(f.counts.launches,2)
 await writeFile(f.value.model,'changed model bytes');await f.adapter.speak('model',f.config);assert.equal(f.counts.launches,3)
 const ref=join(f.root,'reference.wav');await writeFile(ref,wav());await f.adapter.speak('reference',{...f.config,referenceAudioPath:ref});assert.equal(f.counts.launches,4)
 await f.adapter.close();assert.equal(f.adapter.residency().modelResident,false)
})
test('HTTP failure never retries CLI or replays, shuts down owned engine',async t=>{
 const f=await managed(t,{fetch:()=>new Response('bad',{status:500})});await assert.rejects(f.adapter.speak('one',f.config));assert.deepEqual(f.counts,{verified:1,launches:1,stops:1,requests:1});assert.equal(f.played.length,0)
})
test('uncertain playback preserves temp artifact and quarantines future speech',async t=>{
 const f=await managed(t,{playback:()=>{throw Object.assign(Error('uncertain'),{uncertain:true})}})
 await assert.rejects(f.adapter.speak('one',f.config),{uncertain:true});await access(f.played[0]);await assert.rejects(f.adapter.speak('two',f.config),{uncertain:true});assert.equal(f.counts.requests,1)
 // Deliberate test cleanup after fake player is known not to exist.
 await rm(join(f.played[0],'..'),{recursive:true,force:true})
})
test('cancel active WAV waits native playback close and owned server close',async t=>{
 let started,finish;const ready=new Promise(r=>started=r)
 const f=await managed(t,{playback:(_path,_config,signal)=>new Promise((resolve,reject)=>{started();signal.addEventListener('abort',()=>{finish=()=>reject(Object.assign(Error('aborted'),{code:'TTS_CANCELLED'}))})})})
 const controller=new AbortController();const speaking=f.adapter.speak('one',f.config,controller.signal);speaking.catch(()=>{});await ready;controller.abort();await tick();assert.equal(f.counts.stops,0);finish();await assert.rejects(speaking);assert.equal(f.counts.stops,1);await assert.rejects(access(f.played[0]))
})
