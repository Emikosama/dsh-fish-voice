import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { normalizeGpuInventory, createGpuHardwareProbe } from '../voice-gpu-hardware.mjs'
import { createModelInstaller, recommendModel } from '../voice-model-installer.mjs'
import { modelSnapshotCodec } from '../ui/src/conversation-contract.mjs'
const adapter = (overrides = {}) => ({ name:'AMD Radeon RX 9070',luid:'0000000000000001',flags:0,vendorId:4098,deviceId:30032,dedicatedVideoMemoryBytes:16974905344,sharedSystemMemoryBytes:16698271744,...overrides })
const inventory = (...adapters) => ({ok:true,adapters})

test('DXGI keeps 64-bit dedicated memory, excludes software/virtual and dedupes only identical LUIDs',()=>{
 const result=normalizeGpuInventory(inventory(adapter(),adapter(),adapter({luid:'0000000000000002'}),adapter({luid:'0000000000000003',name:'GameViewer Virtual Display Adapter'}),adapter({luid:'0000000000000004',name:'Microsoft Basic Render Driver',flags:2}),adapter({luid:'0000000000000005',name:'Remote GPU',flags:1})))
 assert.equal(result.gpuMemoryBytes,16974905344);assert.equal(result.gpuAdapters.length,2)
 assert.equal(result.gpuAdapters[0].sharedSystemMemoryBytes,16698271744)
 assert.equal(result.gpuSource,'dxgi');assert.match(result.gpuMemoryReason,/不代表/)
 assert.equal(normalizeGpuInventory(inventory(adapter({dedicatedVideoMemoryBytes:0}))).gpuMemoryBytes,0)
 assert.equal(normalizeGpuInventory(inventory()).gpuMemoryBytes,null)
})
test('malformed and unsafe numbers fail closed; foreign fields never reach snapshot',()=>{
 for(const bad of [NaN,-1,1.2,Number.MAX_SAFE_INTEGER+1,'16974905344']) assert.throws(()=>normalizeGpuInventory(inventory(adapter({dedicatedVideoMemoryBytes:bad}))))
 assert.throws(()=>normalizeGpuInventory(inventory(adapter({luid:'bad'}))))
 assert.throws(()=>normalizeGpuInventory(inventory(...Array(33).fill(adapter()))))
 assert.equal(JSON.stringify(normalizeGpuInventory(inventory(adapter({secret:'do-not-include'})))).includes('do-not-include'),false)
})
test('query is asynchronous, cached, single-flight, timeout bounded and resolves native 64-bit PowerShell',async()=>{
 let finish,calls=0,clock=0
 const probe=createGpuHardwareProbe({platform:'win32',env:{SystemRoot:'C:\\Windows',PROCESSOR_ARCHITEW6432:'AMD64'},now:()=>clock,runner:(command,args,payload,options)=>{
  calls++;assert.match(command,/Sysnative\\WindowsPowerShell/);assert.ok(args.includes('-NonInteractive'));assert.equal(options.timeoutMs,8000);assert.equal(options.maxOutput,32768)
  return new Promise(resolve=>{finish=resolve})
 }})
 const a=probe(),b=probe();assert.equal(a,b);assert.equal(calls,0)
 await Promise.resolve();finish(inventory(adapter()));const first=await a;assert.equal(calls,1)
 first.gpuAdapters[0].name='mutated';assert.notEqual((await probe()).gpuAdapters[0].name,'mutated')
 clock=300000;const next=probe();await Promise.resolve();assert.equal(calls,2);finish(inventory(adapter()));await next
})
test('failed or unsupported queries are explicit and do not leak errors; uncertain exit is quarantined',async()=>{
 const failed=createGpuHardwareProbe({platform:'win32',runner:async()=>{throw Error('secret/path')}})
 const result=await failed();assert.equal(result.gpuMemoryBytes,null);assert.equal(result.gpuSource,null);assert.ok(!JSON.stringify(result).includes('secret'))
 assert.equal((await createGpuHardwareProbe({platform:'linux',runner:()=>assert.fail()})()).gpuMemoryBytes,null)
 let calls=0;const uncertain=createGpuHardwareProbe({platform:'win32',runner:async()=>{calls++;throw Object.assign(Error('stop'),{uncertain:true})}})
 await assert.rejects(uncertain(),{uncertain:true});await assert.rejects(uncertain(),{uncertain:true});assert.equal(calls,1)
})
test('host snapshot refresh accepts non-null VRAM without making GPU inference available',async t=>{
 const root=await mkdtemp(join(tmpdir(),'gpu-host-'));let release
 const installer=createModelInstaller({root,catalog:{models:[]},refreshIntervalMs:0,gpuProbe:()=>new Promise(resolve=>{release=resolve}),probe:async()=>({schema:1,default:'cpu',observedAt:null,backends:{}})})
 t.after(async()=>{await installer.close();await rm(root,{recursive:true,force:true})})
 const before=installer.snapshot();assert.equal(before.hardware.gpuMemoryBytes,null)
 const pending=installer.refreshCompute();await new Promise(resolve=>setImmediate(resolve));assert.equal(installer.snapshot().refresh.pending,true)
 release(normalizeGpuInventory(inventory(adapter())));await pending
 const after=installer.snapshot();assert.equal(after.hardware.gpuMemoryBytes,16974905344);assert.deepEqual(after.compute.backends,{})
 assert.equal(modelSnapshotCodec.create().safeParse(after).success,true)
 assert.equal(recommendModel('qwen3-tts-base-1.7b-gguf',after.hardware).gpuValidated,false)
})
test('close aborts and drains active hardware query before releasing installer',async t=>{
 const root=await mkdtemp(join(tmpdir(),'gpu-close-'));t.after(()=>rm(root,{recursive:true,force:true}));let aborted=false
 const installer=createModelInstaller({root,catalog:{models:[]},refreshIntervalMs:0,gpuProbe:({signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>{aborted=true;reject(Error('aborted'))},{once:true})),probe:()=>assert.fail('must not start after close')})
 const refresh=installer.refreshCompute();const rejected=assert.rejects(refresh);await new Promise(resolve=>setImmediate(resolve));await installer.close();await rejected;assert.equal(aborted,true)
})
test('native helper and package keep read-only DXGI inventory available',async()=>{
 const manifest=JSON.parse(await readFile(new URL('../package.json',import.meta.url)))
 assert.ok(manifest.files.includes('helper/gpu_hardware_windows.ps1'))
 const script=await readFile(new URL('../helper/gpu_hardware_windows.ps1',import.meta.url),'utf8')
 assert.match(script,/IntPtr\]::Size -ne 8/);assert.match(script,/Marshal.Release\(adapter\)/);assert.match(script,/Marshal.Release\(factory\)/)
 assert.doesNotMatch(script,/Win32_VideoController|AdapterRAM|Invoke-WebRequest|Start-Process/)
})
