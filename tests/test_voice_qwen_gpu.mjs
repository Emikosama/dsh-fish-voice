import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, access, rm, symlink, realpath } from 'node:fs/promises'
import { join, dirname, basename } from 'node:path'
import { tmpdir } from 'node:os'
import { createManagedLocalTtsAdapter } from '../voice-tts-local.mjs'
import { parseQwenGpuDevices, qwenRuntimeCandidates, qwenComputeArgs, qwenCanRetryCpu } from '../voice-qwen-gpu.mjs'
import { validRuntimeManifest } from '../voice-runtime-archive.mjs'
const failure = (code, extra = {}) => Object.assign(new Error('PRIVATE path/text must not escape'), { code, ...extra })
function wav() {
  const b=Buffer.alloc(46); b.write('RIFF'); b.writeUInt32LE(38,4); b.write('WAVEfmt ',8); b.writeUInt32LE(16,16); b.writeUInt16LE(1,20); b.writeUInt16LE(1,22); b.writeUInt32LE(24000,24); b.writeUInt32LE(48000,28); b.writeUInt16LE(2,32); b.writeUInt16LE(16,34); b.write('data',36); b.writeUInt32LE(2,40); return b
}
const arg = (args, name) => args[args.indexOf(name)+1]
async function fixture(t, { preference = 'auto', backends = ['vulkan'], run, play, clock, prepare } = {}) {
  const root=await realpath(await mkdtemp(join(tmpdir(),'whale-qwen-gpu-test-'))), calls=[], played=[]
  t.after(()=>rm(root,{recursive:true,force:true}))
  const value={engine:'llama-qwen3',modelId:'qwen',executable:join(root,'cpu','llama-tts'),model:join(root,'model.gguf'),mmproj:join(root,'mmproj.gguf'),computeRequested:preference,runtimeId:'1'.repeat(64),runtimeCandidates:backends.map((backend,i)=>({backend,executable:join(root,backend,'llama-tts'),runtimeId:String(i+2).repeat(64)}))}
  for(const path of [value.executable,value.model,value.mmproj,...value.runtimeCandidates.map(c=>c.executable)]) {await mkdir(dirname(path),{recursive:true});await writeFile(path,'stub')}
  const config={localModelId:'qwen'}
  const runner=async(executable,args,payload,options)=>{
    calls.push({executable,args,payload,options})
    assert.equal(options.env.LD_PRELOAD,undefined);assert.equal(options.env.GGML_BACKEND_PATH,undefined)
    if(run)return run({executable,args,payload,options,value,calls,root})
    if(args.includes('--list-devices'))return {stdout:'Available devices:\n  Vulkan0: Device (8192 MiB, 6000 MiB free)\n',stderr:''}
    await writeFile(arg(args,'--output'),wav());return {audioFrames:12,gpuLayers:arg(args,'-ngl')==='all'?29:0}
  }
  const adapter=createManagedLocalTtsAdapter({resolveManagedLocalTts:async()=>{prepare?.();return value},clock,runner,playback:async(path,c,s)=>{played.push(path);return play?play(path,c,s):{completed:true}}})
  return {adapter,value,config,calls,played,root}
}
test('strict device parser ignores software renderers, wrong backend, malformed fields and injected switches',()=>{
  const out='Available devices:\n  Vulkan0: llvmpipe (LLVM) (8000 MiB, 8000 MiB free)\n  Vulkan1: NVIDIA (8000 MiB, 4000 MiB free)\n  Vulkan2: AMD (8000 MiB, 6000 MiB free)\n  Vulkan3: Intel (4000 MiB, 5000 MiB free)\n  CUDA0: NVIDIA (8000 MiB, 7000 MiB free)\n  Vulkan0 --rpc evil: X (8000 MiB, 7000 MiB free)\n  Vulkan4: SwiftShader (8000 MiB, 7000 MiB free)\n'
  assert.deepEqual(parseQwenGpuDevices(out,'vulkan'),[{device:'Vulkan2',freeMiB:6000},{device:'Vulkan1',freeMiB:4000}])
  assert.deepEqual(parseQwenGpuDevices('Vulkan0: Device (8000 MiB, 4000 MiB free)','vulkan'),[])
  assert.deepEqual(parseQwenGpuDevices('Available devices:\n  ROCm0: AMD (8000 MiB, 4000 MiB free)','hip'),[{device:'ROCm0',freeMiB:4000}])
  assert.deepEqual(parseQwenGpuDevices('x'.repeat(65537),'vulkan'),[])
})
test('runtime planner only considers installer-pinned candidates, in CUDA HIP Vulkan order',()=>{
  const descriptor={executable:'/cpu',runtimeCandidates:['vulkan','hip','cuda'].map(backend=>({backend,executable:`/${backend}`,runtimeId:'a'.repeat(64)}))}
  assert.deepEqual(qwenRuntimeCandidates(descriptor,'auto').map(c=>c.backend),['cuda','hip','vulkan'])
  assert.deepEqual(qwenRuntimeCandidates(descriptor,'cpu'),[])
  assert.deepEqual(qwenRuntimeCandidates(descriptor,'hip').map(c=>c.backend),['hip'])
  assert.deepEqual(qwenRuntimeCandidates({executable:'/cpu'},'auto'),[])
  assert.throws(()=>qwenRuntimeCandidates({...descriptor,runtimeCandidates:[{backend:'vulkan',executable:'/cpu',runtimeId:'a'.repeat(64)}]},'auto'),{code:'TTS_LOCAL_COMPUTE_INVALID'})
  assert.throws(()=>qwenComputeArgs('vulkan','Vulkan0,--rpc evil'),{code:'TTS_LOCAL_COMPUTE_INVALID'})
  assert.deepEqual(qwenComputeArgs('cpu'),['--device','none','-ngl','0','--no-mmproj-offload'])
})
test('verified GPU uses explicit device/backbone/projector offload and keeps text private',async t=>{
  const f=await fixture(t)
  const before=await f.adapter.inspect(f.config);assert.equal(before.localComputeVerified,false);assert.equal(before.localComputeBackend,null);assert.equal(f.calls.length,0)
  const result=await f.adapter.speak('PRIVATE',f.config)
  assert.equal(result.localComputeBackend,'vulkan');assert.equal(result.localComputeVerified,true);assert.equal(result.localComputeFallback,false)
  assert.equal(f.calls.length,2);const c=f.calls[1];assert.equal(arg(c.args,'-ngl'),'all');assert.equal(arg(c.args,'--device'),'Vulkan0');assert.equal(arg(c.args,'--mmproj-device'),'Vulkan0');assert.ok(c.args.includes('--mmproj-offload'));assert.equal(c.options.captureCompute,true)
  assert.equal(c.args.includes('PRIVATE'),false);assert.equal(c.payload,null);assert.equal(c.options.captureText,undefined)
  assert.equal(f.played.length,1);await assert.rejects(access(arg(c.args,'-f')))
  assert.equal((await f.adapter.inspect(f.config)).localComputeBackend,'vulkan')
})
test('CPU preference does not enumerate GPU and old CPU-only descriptors never advertise GPU',async t=>{
  const f=await fixture(t,{preference:'cpu'});await f.adapter.speak('hello',f.config)
  assert.equal(f.calls.length,1);assert.equal(f.calls[0].executable,f.value.executable);assert.equal(arg(f.calls[0].args,'-ngl'),'0')
  f.value.computeRequested='auto';f.value.runtimeCandidates=[];f.calls.length=0
  const result=await f.adapter.speak('hello',f.config);assert.equal(f.calls.length,1);assert.equal(result.localComputeBackend,'cpu');assert.equal(result.localComputeReason,'TTS_GPU_RUNTIME_MISSING');assert.equal(result.localComputeFallback,true)
})
test('auto checks unavailable installed GPU backends before GPU attempt; driver names stay private',async t=>{
  const f=await fixture(t,{backends:['vulkan','hip','cuda'],run:async({args,executable})=>{
    if(args.includes('--list-devices')) {if(basename(dirname(executable))==='cuda')throw failure('TTS_PROCESS_START_FAILED');return {stdout:basename(dirname(executable))==='hip'?'Available devices:\n  (none)\n':'Available devices:\n  Vulkan0: PRIVATE driver name (8000 MiB, 4000 MiB free)\n'}}
    await writeFile(arg(args,'--output'),wav());return {audioFrames:12,gpuLayers:29}
  }})
  const result=await f.adapter.speak('hello',f.config);assert.equal(f.calls.length,4);assert.equal(result.localComputeBackend,'vulkan');assert.equal(JSON.stringify(result).includes('PRIVATE'),false)
})
test('pre-playback GPU OOM retries same model and exact reference snapshot once on CPU',async t=>{
  let referenceBytes, gpuOutput, cpuOutput, gpuPrompt, gpuModel, gpuProjector
  const f=await fixture(t,{run:async({args,executable,value})=>{
    if(args.includes('--list-devices'))return{stdout:'Available devices:\n  Vulkan0: GPU (8000 MiB, 4000 MiB free)\n'}
    const reference=await readFile(arg(args,'--tts-speaker-file'))
    if(executable!==value.executable){referenceBytes=reference;gpuOutput=arg(args,'--output');gpuPrompt=arg(args,'-f');gpuModel=arg(args,'-m');gpuProjector=arg(args,'--mmproj');await writeFile(gpuOutput,wav());throw failure('TTS_PROCESS_FAILED')}
    assert.deepEqual(reference,referenceBytes);assert.equal(arg(args,'-f'),gpuPrompt);assert.equal(arg(args,'-m'),gpuModel);assert.equal(arg(args,'--mmproj'),gpuProjector);cpuOutput=arg(args,'--output');assert.notEqual(cpuOutput,gpuOutput);await writeFile(cpuOutput,wav());return{audioFrames:12,gpuLayers:0}
  }})
  const reference=join(f.root,'reference.wav');await writeFile(reference,wav());f.config.referenceAudioPath=reference
  const result=await f.adapter.speak('PRIVATE',f.config);assert.equal(result.localComputeBackend,'cpu');assert.equal(result.localComputeReason,'TTS_GPU_SYNTHESIS_FAILED');assert.equal(f.played.length,1);assert.equal(f.calls.length,3)
  assert.deepEqual(await readFile(reference),referenceBytes);await assert.rejects(access(gpuOutput));await assert.rejects(access(cpuOutput))
})
test('successful CPU-like GPU process is not reported GPU without positive offload evidence',async t=>{
  const f=await fixture(t,{run:async({args})=>{if(args.includes('--list-devices'))return{stdout:'Available devices:\n  Vulkan0: GPU (8000 MiB, 4000 MiB free)'};await writeFile(arg(args,'--output'),wav());return{audioFrames:12,gpuLayers:0}}})
  const result=await f.adapter.speak('hello',f.config);assert.equal(result.localComputeBackend,'cpu');assert.equal(result.localComputeFallback,true);assert.equal(f.calls.length,3);assert.equal(f.played.length,1)
})
test('invalid GPU audio falls back once; invalid CPU audio stops without playback',async t=>{
  const f=await fixture(t,{run:async({args})=>{if(args.includes('--list-devices'))return{stdout:'Available devices:\n  Vulkan0: GPU (8000 MiB, 4000 MiB free)'};await writeFile(arg(args,'--output'),'bad');return{audioFrames:12,gpuLayers:29}}})
  await assert.rejects(f.adapter.speak('hello',f.config),{code:'TTS_INVALID_AUDIO'});assert.equal(f.calls.length,3);assert.equal(f.played.length,0)
})
test('playback failure is never retried or played on another backend',async t=>{
  const f=await fixture(t,{play:()=>{throw failure('TTS_PROCESS_FAILED')}})
  await assert.rejects(f.adapter.speak('hello',f.config),{code:'TTS_PROCESS_FAILED'});assert.equal(f.calls.length,2);assert.equal(f.played.length,1)
})
test('cancel during GPU failure, and revoke after GPU enumeration, cannot start CPU or synthesis',async t=>{
  for(const boundary of ['enumeration','synthesis']){
    const controller=new AbortController()
    const f=await fixture(t,{run:async({args})=>{if(args.includes('--list-devices')){if(boundary==='enumeration')controller.abort();return{stdout:'Available devices:\n  Vulkan0: GPU (8000 MiB, 4000 MiB free)'}}controller.abort();throw failure('TTS_PROCESS_FAILED')}})
    await assert.rejects(f.adapter.speak('hello',f.config,controller.signal));assert.equal(f.calls.length,boundary==='enumeration'?1:2);assert.equal(f.played.length,0)
  }
})
test('unconfirmed child termination quarantines temp files, never retries CPU',async t=>{
  let prompt
  const f=await fixture(t,{run:async({args})=>{if(args.includes('--list-devices'))return{stdout:'Available devices:\n  Vulkan0: GPU (8000 MiB, 4000 MiB free)'};prompt=arg(args,'-f');throw failure('TTS_TERMINATION_UNCONFIRMED',{uncertain:true})}})
  await assert.rejects(f.adapter.speak('hello',f.config),{code:'TTS_TERMINATION_UNCONFIRMED'});assert.equal(f.calls.length,2);assert.equal(f.played.length,0);await access(prompt)
  // Fixture has no live child. Only the test may clean this quarantined directory.
  await rm(dirname(prompt),{recursive:true,force:true})
})
test('probing same model verifies GPU synthesis without playback; requested mode and runtime digest invalidate cache',async t=>{
  const f=await fixture(t);let result=await f.adapter.probe(f.config);assert.equal(result.synthesisVerified,true);assert.equal(result.localComputeBackend,'vulkan');assert.equal(f.played.length,0)
  f.value.computeRequested='cpu';result=await f.adapter.inspect(f.config);assert.equal(result.synthesisVerified,false);assert.equal(result.localComputeVerified,false)
  f.value.computeRequested='auto';f.value.runtimeCandidates[0].runtimeId='f'.repeat(64);result=await f.adapter.inspect(f.config);assert.equal(result.synthesisVerified,false);assert.equal(result.localComputeVerified,false)
})
test('unknown failures and cancellations never authorize a CPU retry',()=>{
  for(const code of ['TTS_CANCELLED','TTS_CONFIG_CHANGED','TTS_CONSENT_REQUIRED','unexpected'])assert.equal(qwenCanRetryCpu(failure(code)),false)
  assert.equal(qwenCanRetryCpu(failure('TTS_PROCESS_FAILED',{uncertain:true})),false)
  assert.equal(qwenCanRetryCpu(failure('TTS_INVALID_AUDIO')),false)
  assert.equal(qwenCanRetryCpu(failure('TTS_INVALID_AUDIO'),undefined,{completed:true}),true)
})
test('new pinned Vulkan manifests retain bounded extraction and cannot choose arbitrary directories',async()=>{
  const cat=JSON.parse(await readFile(new URL('../runtime-catalog.json',import.meta.url)))
  const gpu=cat.runtimes.filter(r=>r.backend==='vulkan');assert.equal(gpu.length,2)
  for(const r of gpu){assert.equal(validRuntimeManifest(r),true);assert.ok(r.bytes<64*1024**2);assert.equal(r.installDir,'backends/vulkan');assert.ok(r.entries.some(e=>/ggml-vulkan\.(?:dll|so)$/.test(e.file)));assert.equal(validRuntimeManifest({...r,installDir:'../escape'}),false);assert.equal(validRuntimeManifest({...r,installDir:'/absolute'}),false);assert.equal(validRuntimeManifest({...r,installDir:'backends/cuda'}),false)}
  assert.equal(cat.runtimes.filter(r=>!r.backend).length,2)
})


test('confirmed GPU synthesis failure stays on CPU across chunks until descriptor identity changes',async t=>{
  const f=await fixture(t,{run:async({args,executable,value})=>{
    if(args.includes('--list-devices'))return{stdout:'Available devices:\n  Vulkan0: GPU (8000 MiB, 4000 MiB free)'}
    if(executable!==value.executable)throw failure('TTS_TIMEOUT')
    await writeFile(arg(args,'--output'),wav());return{audioFrames:12,gpuLayers:0}
  }})
  await f.adapter.speak('first chunk',f.config);assert.equal(f.calls.length,3)
  await f.adapter.speak('second chunk',f.config);assert.equal(f.calls.length,4);assert.equal(f.calls[3].executable,f.value.executable)
  await f.adapter.probe(f.config);assert.equal(f.calls.length,5);assert.equal(f.calls[4].executable,f.value.executable)
  f.value.runtimeCandidates[0].runtimeId='f'.repeat(64)
  await f.adapter.speak('updated runtime',f.config);assert.equal(f.calls.length,8)
  f.value.computeRequested='cpu';await f.adapter.speak('explicit CPU',f.config);assert.equal(f.calls.length,9)
  f.value.computeRequested='auto';await f.adapter.speak('changed selection',f.config);assert.equal(f.calls.length,12)
})


test('successful GPU selection is reused but every utterance re-verifies assets and positive offload',async t=>{
  let prepared=0, failGpu=false
  const f=await fixture(t,{prepare:()=>prepared++,run:async({args,executable,value})=>{
    if(args.includes('--list-devices'))return{stdout:'Available devices:\n  Vulkan0: GPU (8000 MiB, 4000 MiB free)'}
    await writeFile(arg(args,'--output'),wav());return{audioFrames:12,gpuLayers:executable===value.executable||failGpu?0:29}
  }})
  await f.adapter.speak('first',f.config)
  await f.adapter.speak('second',f.config)
  assert.equal(prepared,2);assert.equal(f.calls.length,3);assert.equal(f.calls.filter(c=>c.args.includes('--list-devices')).length,1)
  failGpu=true
  const third=await f.adapter.speak('lost offload',f.config)
  assert.equal(third.localComputeBackend,'cpu');assert.equal(third.localComputeReason,'TTS_GPU_SYNTHESIS_FAILED')
  assert.equal(f.calls.length,5);assert.equal(f.played.length,3)
  failGpu=false;f.value.runtimeCandidates[0].runtimeId='f'.repeat(64)
  await f.adapter.speak('changed runtime',f.config)
  assert.equal(f.calls.length,7);assert.equal(f.calls.filter(c=>c.args.includes('--list-devices')).length,2)
})

test('Qwen timing separates verification, device selection, synthesis and playback without private data',async t=>{
  let time=0
  const f=await fixture(t,{clock:()=>time,prepare:()=>{time+=3},run:async({args})=>{
    if(args.includes('--list-devices')){time+=5;return{stdout:'Available devices:\n  Vulkan0: PRIVATE GPU (8000 MiB, 4000 MiB free)'}}
    time+=7;await writeFile(arg(args,'--output'),wav());return{audioFrames:12,gpuLayers:29}
  },play:()=>{time+=11;return{completed:true}}})
  const result=await f.adapter.speak('PRIVATE text',f.config)
  assert.deepEqual(result.localTimings,{preparationMs:3,deviceSelectionMs:5,synthesisMs:7,playbackMs:11,totalMs:26,chunks:1,modelResident:false})
  assert.equal(JSON.stringify(result).includes('PRIVATE'),false)
  const next=await f.adapter.speak('next',f.config)
  assert.equal(next.localTimings.deviceSelectionMs,0);assert.equal(next.localTimings.totalMs,21)
})


test('cached GPU selection never bypasses cancellation or uncertain termination boundaries',async t=>{
  for(const uncertain of [false,true])await t.test(uncertain?'uncertain':'cancelled',async t=>{
    const controller=new AbortController();let fail=false,prompt
    const f=await fixture(t,{run:async({args})=>{
      if(args.includes('--list-devices'))return{stdout:'Available devices:\n  Vulkan0: GPU (8000 MiB, 4000 MiB free)'}
      if(fail){prompt=arg(args,'-f');if(!uncertain)controller.abort();throw failure(uncertain?'TTS_TERMINATION_UNCONFIRMED':'TTS_PROCESS_FAILED',{uncertain})}
      await writeFile(arg(args,'--output'),wav());return{audioFrames:12,gpuLayers:29}
    }})
    await f.adapter.speak('first',f.config);fail=true
    await assert.rejects(f.adapter.speak('second',f.config,controller.signal))
    assert.equal(f.calls.length,3);assert.equal(f.played.length,1)
    if(uncertain){await access(prompt);await rm(dirname(prompt),{recursive:true,force:true})}
  })
})
