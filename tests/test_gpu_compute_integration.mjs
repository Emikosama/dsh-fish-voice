import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdir, mkdtemp, rm, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { createHash, randomUUID } from 'node:crypto'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { createModelInstaller } from '../voice-model-installer.mjs'
import { modelSnapshotCodec } from '../ui/conversation-contract.mjs'
import { inferenceComputeSnapshot } from '../voice-ui-bridge.mjs'
import { runTtsProcess, localComputeStatus, localTimingStatus, createTtsRuntime, TTS_DEFAULTS } from '../voice-tts.mjs'
import { decodeSetupReply } from '../ui/src/setup-protocol.mjs'
const hash = value => createHash('sha256').update(value).digest('hex')
const QWEN='qwen3-tts-base-1.7b-gguf'
async function root(t) { const path=await mkdtemp(join(tmpdir(),'whale-gpu-integration-'));t.after(()=>rm(path,{recursive:true,force:true}));return path }

test('CPU/auto/Vulkan plans are distinct, pinned, bounded, and readable without native/GPU/network work',async t=>{
  const i=createModelInstaller({root:await root(t),fetchImpl:()=>{throw Error('no network')},probe:()=>{throw Error('no Python')}});t.after(()=>i.close())
  modelSnapshotCodec.create().parse(i.snapshot())
  assert.ok(i.snapshot().models.every(model => model.id !== 'faster-whisper-small'))
  if(process.arch!=='x64'||!['linux','win32'].includes(process.platform))return
  const cpu=i.plan(QWEN,'cpu'),auto=i.plan(QWEN,'auto'),vulkan=i.plan(QWEN,'vulkan')
  assert.equal(cpu.files.length,3);assert.equal(auto.files.length,4);assert.equal(vulkan.files.length,4)
  const gpu=auto.files.find(f=>f.name.includes('vulkan'))
  assert.ok(gpu);assert.ok(gpu.bytes<40*1024*1024);assert.match(gpu.url,/github\.com\/ggml-org\/llama\.cpp\/releases\/download\/b12110\//)
  assert.equal(auto.totalBytes,cpu.totalBytes+gpu.bytes);assert.notEqual(auto.planHash,cpu.planHash);assert.notEqual(auto.planHash,vulkan.planHash)
  assert.match(auto.notice,/不会安装/);assert.match(auto.verification,/尚未/)
  for(const p of [cpu,auto,vulkan])decodeSetupReply('plan-model-install',p)
  assert.throws(()=>i.plan('sensevoice-int8-2024-07-17','vulkan'),{code:'INVALID_COMPUTE'})
})

test('retired Whisper jobs preserve their recovery records and files without blocking SenseVoice jobs', async t => {
  const directory = await root(t)
  const bytes = Buffer.from('synthetic SenseVoice weights')
  const modelId = 'sensevoice-int8-2024-07-17'
  const retiredId = 'faster-whisper-small'
  const url = 'https://fixture.invalid/model'
  const catalog = { schema: 1, models: [{
    id: modelId, revision: 'a'.repeat(40),
    files: [{ file: 'model.int8.onnx', bytes: bytes.length, sha256: hash(bytes), source_url: url }],
  }] }
  let requests = 0
  const options = {
    root: directory, catalog, allowUrl: value => value === url,
    probe: async () => ({ backends: { sensevoice: { cpu: { available: true } } } }),
    fetchImpl: async () => {
      requests++
      return new Response(bytes, { headers: { 'content-length': String(bytes.length) } })
    },
  }
  const start = installer => {
    const plan = installer.plan(modelId, 'auto')
    return installer.start({ modelId, compute: plan.compute, planHash: plan.planHash, accepted: true })
  }
  const initial = createModelInstaller(options)
  t.after(() => initial.close())
  const existing = await initial.settled(start(initial).id)
  assert.equal(existing.status, 'installed', JSON.stringify(existing.error))
  await initial.close()
  const stateFile = join(directory, 'jobs.json')
  const state = JSON.parse(await readFile(stateFile, 'utf8'))
  const oldJobs = ['running', 'installed'].map(status => ({
    id: randomUUID(), modelId: retiredId, compute: 'cuda', status, stage: status,
    manifestHash: 'd'.repeat(64), receivedBytes: 7, files: [{ name: 'model.bin', etag: '"old-resume-receipt"' }],
  }))
  const oldPath = job => join(directory, job.status === 'installed' ? 'installed' : '.jobs', job.id, 'model.bin')
  for (const job of oldJobs) {
    await mkdir(dirname(oldPath(job)), { recursive: true })
    await writeFile(oldPath(job), 'retired weights')
  }
  await writeFile(stateFile, JSON.stringify({ ...state, jobs: [oldJobs[0], ...state.jobs, oldJobs[1]] }))
  const current = createModelInstaller(options)
  t.after(() => current.close())
  assert.deepEqual(current.snapshot().jobs.map(job => job.id), [existing.id])
  assert.throws(() => current.plan(retiredId), { code: 'MODEL_UNAVAILABLE' })
  assert.throws(() => current.resume(oldJobs[0].id), { code: 'MODEL_RETIRED' })
  await assert.rejects(current.cancel(oldJobs[0].id), { code: 'MODEL_RETIRED' })
  await assert.rejects(current.verifyInstalled(oldJobs[1].id), { code: 'MODEL_RETIRED' })
  const next = await current.settled(start(current).id)
  assert.equal(next.status, 'installed', JSON.stringify(next.error))
  assert.equal(next.recommendedSettings.modelCompute, 'auto')
  assert.equal(requests, 2)
  const saved = JSON.parse(await readFile(stateFile, 'utf8'))
  assert.deepEqual(saved.jobs.filter(job => job.modelId === retiredId), oldJobs)
  for (const job of oldJobs) assert.equal(await readFile(oldPath(job), 'utf8'), 'retired weights')
})

test('ASR status projection is closed and refuses unknown backend/precision/index',()=>{
  const state={requested:'auto',actual:'cpu',engine:'sensevoice',computeType:null,deviceIndex:null,fallbackReason:'model-gpu-unverified',validated:true}
  assert.deepEqual(inferenceComputeSnapshot({...state,secret:'PRIVATE',driverName:'PRIVATE'}),state)
  for(const change of [{actual:'directml'},{deviceIndex:99},{computeType:'unknown'},{fallbackReason:'PRIVATE'},{validated:'yes'}])assert.equal(inferenceComputeSnapshot({...state,...change}),null)
})

test('runner exposes only positive numeric GPU offload evidence and drains private diagnostics',async()=>{
  const child=new EventEmitter();child.stdout=new PassThrough();child.stderr=new PassThrough();child.stdin=new PassThrough();child.kill=()=>{};child.pid=100
  const p=runTtsProcess('synthetic',[],null,{captureJson:false,captureCompute:true,spawnProcess:()=>child})
  child.stderr.write('PRIVATE /audio/path offloa');child.stderr.write('ded 27/28 layers to GPU\ngenerated 12 frames, 4096 bytes of WAV audio (24000 Hz)\n');child.emit('close',0)
  const result=await p;assert.deepEqual(result,{ok:true,completed:true,audioFrames:12,gpuLayers:27});assert.equal(JSON.stringify(result).includes('PRIVATE'),false)
})

test('runtime exposes actual same-model CPU fallback and clears stale compute',async()=>{
  let config={...TTS_DEFAULTS,provider:'local',localModelId:'qwen',localModelPath:'/model'}
  const compute={localComputeRequested:'auto',localComputeBackend:'cpu',localComputeDevice:null,localComputeVerified:true,localComputeFallback:true,localComputeReason:'TTS_GPU_SYNTHESIS_FAILED'}
  const adapter={inspect:async()=>({platform:'win32',playbackSupported:true,filePlaybackSupported:true})}
  let fail=false
  const localAdapter={inspect:async()=>({localReady:true,...compute}),speak:async()=>{if(fail)throw Object.assign(Error('failed'),{code:'TTS_PROCESS_FAILED'});return{completed:true,...compute}}}
  const runtime=createTtsRuntime({getConfig:()=>config,adapter,localAdapter})
  const out=await runtime.speak('hello');assert.equal(out.fallback,false);assert.equal(out.localComputeFallback,true);assert.equal(runtime.status().localComputeBackend,'cpu')
  assert.equal((await runtime.inspect()).gpuSupported,false)
  assert.deepEqual(localComputeStatus({...compute,localComputeBackend:'private-path'}),{})
  assert.deepEqual(localComputeStatus({...compute,secret:'PRIVATE'}),compute)
  fail=true;await assert.rejects(runtime.speak('next'),{code:'TTS_PROCESS_FAILED'});assert.equal(runtime.status().localComputeBackend,null);assert.equal(runtime.status().localComputeVerified,false)
  await runtime.dispose()
})


test('timing projection accepts only numeric complete evidence and UI rejects malformed timings',()=>{
  const localTimings={preparationMs:1,deviceSelectionMs:2,synthesisMs:3,playbackMs:4,totalMs:10,chunks:1,modelResident:false}
  assert.deepEqual(localTimingStatus({localTimings:{...localTimings,private:'SECRET'}}),{localTimings})
  assert.deepEqual(localTimingStatus({localTimings:{...localTimings,modelResident:true}}),{localTimings:{...localTimings,modelResident:true}})
  assert.doesNotThrow(()=>decodeSetupReply('cancel-tts',{status:'idle',ttsRuntime:{state:'idle',busy:false,blocked:false,localTimings:{...localTimings,modelResident:true}}}))
  for(const change of [{synthesisMs:NaN},{preparationMs:-1},{totalMs:Infinity},{chunks:0},{chunks:4001},{modelResident:'yes'}]){
    assert.deepEqual(localTimingStatus({localTimings:{...localTimings,...change}}),{})
    assert.throws(()=>decodeSetupReply('cancel-tts',{status:'idle',ttsRuntime:{state:'idle',busy:false,blocked:false,localTimings:{...localTimings,...change}}}))
  }
})

test('runtime totals all local chunks and clears timing when next speech fails',async()=>{
  const config={...TTS_DEFAULTS,provider:'local',localModelId:'qwen',localModelPath:'/model'}
  let calls=0,fail=false
  const localTimings={preparationMs:1,deviceSelectionMs:2,synthesisMs:3,playbackMs:4,totalMs:10,chunks:1,modelResident:false}
  const localAdapter={inspect:async()=>({localReady:true}),speak:async()=>{calls++;if(fail)throw Object.assign(Error('failed'),{code:'TTS_PROCESS_FAILED'});return{completed:true,localTimings}}}
  const adapter={inspect:async()=>({playbackSupported:true,filePlaybackSupported:true})}
  const runtime=createTtsRuntime({getConfig:()=>config,adapter,localAdapter})
  const result=await runtime.speak('长'.repeat(800))
  assert.ok(calls>1);assert.equal(result.localTimings.chunks,calls);assert.equal(result.localTimings.synthesisMs,calls*3);assert.deepEqual(runtime.status().localTimings,result.localTimings)
  fail=true;await assert.rejects(runtime.speak('next'));assert.equal(runtime.status().localTimings,null)
  await runtime.dispose()
})


test('missing timing and overflowing totals are never published as complete request evidence',async()=>{
  for(const scenario of ['missing','overflow','failure']){
    let calls=0
    const base={preparationMs:1,deviceSelectionMs:2,synthesisMs:3,playbackMs:4,totalMs:10,chunks:1,modelResident:false}
    const config={...TTS_DEFAULTS,provider:'local',localModelId:'qwen',localModelPath:'/model'}
    const localAdapter={inspect:async()=>({localReady:true}),speak:async()=>{
      calls++
      if(calls===2&&scenario==='failure')throw Object.assign(Error('failed'),{code:'TTS_PROCESS_FAILED'})
      return{completed:true,...(calls===2&&scenario==='missing'?{}:{localTimings:{...base,totalMs:scenario==='overflow'?Number.MAX_SAFE_INTEGER:10}})}
    }}
    const runtime=createTtsRuntime({getConfig:()=>config,adapter:{inspect:async()=>({playbackSupported:true,filePlaybackSupported:true})},localAdapter})
    if(scenario==='failure'){
      await assert.rejects(runtime.speak('长'.repeat(800)));assert.equal(runtime.status().localTimings.chunks,1);assert.equal(runtime.status().localTimings.totalMs,10)
    }else{
      const result=await runtime.speak('长'.repeat(800));assert.equal(result.localTimings,undefined);assert.equal(runtime.status().localTimings,null)
    }
    await runtime.dispose()
  }
})
