import test from 'node:test'
import assert from 'node:assert/strict'
import { realpath, mkdtemp, writeFile, readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { createManagedLocalTtsAdapter } from '../voice-tts-local.mjs'
import { createQwenResidentSession } from '../voice-qwen-stream.mjs'
const fail=(code,extra={})=>Object.assign(Error(code),{code,...extra})
const wav=()=>{const b=Buffer.alloc(46);b.write('RIFF');b.writeUInt32LE(38,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(24000,24);b.writeUInt32LE(48000,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(2,40);return b}
const arg=(a,k)=>a[a.indexOf(k)+1]
async function fixture(t,{launch,fetch,cli}={}){
 const root=await realpath(await mkdtemp(join(tmpdir(),'whale-startup-fallback-')));t.after(()=>rm(root,{recursive:true,force:true}));let launches=0,requests=0,plays=0,clis=0
 const value={engine:'llama-qwen3',modelId:'qwen',computeRequested:'auto',runtimeId:'1'.repeat(64),executable:join(root,'cpu'),model:join(root,'model'),mmproj:join(root,'mmproj'),runtimeCandidates:[{backend:'vulkan',runtimeId:'2'.repeat(64),executable:join(root,'gpu'),serverRuntime:{backend:'vulkan',runtimeId:'2'.repeat(64),archivePath:join(root,'archive')}}]}
 for(const p of [value.executable,value.model,value.mmproj,value.runtimeCandidates[0].executable,join(root,'archive')])await writeFile(p,'fixture')
 const config={localModelId:'qwen',referenceAudioPath:join(root,'reference.wav')};await writeFile(config.referenceAudioPath,wav())
 const adapter=createManagedLocalTtsAdapter({getResidencyMode:()=> 'fast',resolveManagedLocalTts:async()=>value,launchServer:async(d,o)=>{launches++;return launch?launch(d,o,{config}):Promise.reject(fail('TTS_GPU_OFFLOAD_UNCONFIRMED',{startupClosed:true}))},createResidentSession:options=>createQwenResidentSession({...options,fetch:async(...args)=>{requests++;return fetch?fetch(...args):new Response(wav(),{headers:{'content-type':'audio/wav'}})}}),runner:async(exe,args)=>{if(args.includes('--list-devices'))return{stdout:'Available devices:\n Vulkan0: GPU (8000 MiB, 6000 MiB free)\n'};clis++;assert.equal(exe,value.executable);assert.equal(arg(args,'--device'),'none');assert.equal(arg(args,'--temp'),'0.8');assert.deepEqual(await readFile(arg(args,'--tts-speaker-file')),wav());if(cli)return cli();await writeFile(arg(args,'--output'),wav());return{audioFrames:10,gpuLayers:0}},playback:async()=>{plays++;return{completed:true}}})
 t.after(()=>adapter.close().catch(()=>{}));return{adapter,config,value,get counts(){return{launches,requests,plays,clis}}}
}
test('confirmed GPU startup close falls back once to CPU with exact reference and remembers failure',async t=>{
 const f=await fixture(t,{launch:async(_d,_o,{config})=>{await writeFile(config.referenceAudioPath,Buffer.from('invalid changed file'));throw fail('TTS_PROCESS_FAILED',{startupClosed:true})}})
 const r=await f.adapter.speak('same text',f.config);assert.equal(r.localComputeBackend,'cpu');assert.equal(r.localComputeReason,'TTS_GPU_STARTUP_FAILED');assert.deepEqual(f.counts,{launches:1,requests:0,plays:1,clis:1})
 // Restore identical reference digest, so the failed signature is remembered.
 await writeFile(f.config.referenceAudioPath,wav());await f.adapter.speak('next',f.config);assert.equal(f.counts.launches,1);assert.equal(f.counts.clis,2)
})
test('changed config or archive allows fresh GPU startup attempt',async t=>{
 const f=await fixture(t);await f.adapter.speak('one',f.config);await f.adapter.speak('two',f.config);assert.equal(f.counts.launches,1)
 await f.adapter.speak('three',{...f.config,volume:.7});assert.equal(f.counts.launches,2)
 await writeFile(f.value.runtimeCandidates[0].serverRuntime.archivePath,'changed archive');await f.adapter.speak('four',{...f.config,volume:.7});assert.equal(f.counts.launches,3)
})
for(const [name,error] of [['unconfirmed',fail('TTS_PROCESS_FAILED')],['uncertain',fail('TTS_PROCESS_FAILED',{startupClosed:true,uncertain:true})],['invalid',fail('TTS_INVALID_RUNTIME',{startupClosed:true})],['cancelled',fail('TTS_CANCELLED',{startupClosed:true})]])test(`no fallback for ${name} startup`,async t=>{const f=await fixture(t,{launch:()=>{throw error}});await assert.rejects(f.adapter.speak('one',f.config));assert.equal(f.counts.clis,0);assert.equal(f.counts.requests,0)})
test('even fetch rejection before response is request-started and never falls back',async t=>{
 const f=await fixture(t,{launch:async()=>({port:1234,stop:async()=>{},status:()=>({running:true}),compute:{backend:'vulkan',gpuLayers:29,gpuOffloadConfirmed:true}}),fetch:()=>{throw fail('TTS_PROCESS_FAILED',{startupClosed:true})}})
 await assert.rejects(f.adapter.speak('one',f.config),{requestStarted:true});assert.deepEqual(f.counts,{launches:1,requests:1,plays:0,clis:0})
})
test('CPU fallback failure never triggers another attempt',async t=>{const f=await fixture(t,{cli:()=>{throw fail('TTS_PROCESS_FAILED')}});await assert.rejects(f.adapter.speak('one',f.config));assert.equal(f.counts.clis,1)})
test('owner cancellation after confirmed startup failure prevents CPU replay',async t=>{const controller=new AbortController();const f=await fixture(t,{launch:()=>{controller.abort();throw fail('TTS_PROCESS_FAILED',{startupClosed:true})}});await assert.rejects(f.adapter.speak('one',f.config,controller.signal));assert.equal(f.counts.clis,0)})
