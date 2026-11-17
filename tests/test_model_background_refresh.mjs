import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp,rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createModelInstaller } from '../voice-model-installer.mjs'
const tick=()=>new Promise(resolve=>setImmediate(resolve))
async function fixture(t,probe){
 const root=await mkdtemp(join(tmpdir(),'model-refresh-')),timers=new Map();let seq=0,hardwareReads=0
 // This fixture owns every clock and probe; never launch real DXGI on Windows.
 const installer=createModelInstaller({root,catalog:{models:[]},probe,gpuProbe:async()=>({gpuMemoryBytes:null,gpuMemoryReason:'Synthetic GPU inventory'}),hardwareProbe:()=>({gpuMemoryBytes:null,totalMemoryBytes:100,availableMemoryBytes:++hardwareReads}),scheduleRefresh:(fn,ms)=>{const id=++seq;timers.set(id,{fn,ms});return id},cancelRefresh:id=>timers.delete(id)})
 t.after(async()=>{await installer.close().catch(error=>{if(!error.uncertain)throw error});await rm(root,{recursive:true,force:true})})
 return {installer,timers,hardwareReads:()=>hardwareReads,fire(){const [id,{fn,ms}]=timers.entries().next().value;assert.equal(ms,300000);timers.delete(id);fn()}}
}
test('host refresh runs every five minutes without a UI subscriber or network access',async t=>{
 let probes=0;const f=await fixture(t,async()=>({schema:1,backends:{},observedAt:String(++probes)}))
 assert.equal(probes,0);assert.equal(f.timers.size,1)
 f.fire();await tick();assert.equal(probes,1);assert.equal(f.hardwareReads(),2);assert.equal(f.installer.snapshot().refresh.pending,false)
 const before=f.installer.snapshot().refresh.observedAt;assert.ok(before)
 f.fire();await tick();assert.equal(probes,2);assert.equal(f.timers.size,1)
 await f.installer.close();assert.equal(f.timers.size,0)
})
test('page entry refreshes immediately, coalesces with a timer and never changes model jobs',async t=>{
 let resolve,probes=0;const f=await fixture(t,()=>{probes++;return new Promise(r=>{resolve=r})})
 const a=f.installer.refreshCompute(),b=f.installer.refreshCompute();assert.equal(a,b)
 await tick();f.fire();await tick();assert.equal(probes,1)
 resolve({schema:1,backends:{cpu:{available:true}}});await a;assert.equal(f.installer.snapshot().jobs.length,0)
 assert.equal(f.installer.snapshot().refresh.error,null)
 const c=f.installer.refreshCompute();await tick();assert.equal(probes,2);resolve({schema:1,backends:{}});await c
})
test('failed refresh retains last successful hardware/backend and timestamp',async t=>{
 let failure=false;const f=await fixture(t,async()=>{if(failure)throw new Error('probe failure');return {schema:1,backends:{cpu:{available:true}}}})
 await f.installer.refreshCompute();const before=f.installer.snapshot();failure=true
 await assert.rejects(f.installer.refreshCompute(),/probe failure/);const after=f.installer.snapshot()
 assert.deepEqual(after.hardware,before.hardware);assert.deepEqual(after.compute,before.compute);assert.equal(after.refresh.observedAt,before.refresh.observedAt);assert.match(after.refresh.error,/未完成/)
 assert.equal(f.timers.size,1)
})
test('uncertain subprocess exit quarantines background refresh and removes timer',async t=>{
 const f=await fixture(t,async()=>{throw Object.assign(new Error('unconfirmed'),{uncertain:true,code:'TTS_TERMINATION_UNCONFIRMED'})})
 await assert.rejects(f.installer.refreshCompute(),{uncertain:true});assert.equal(f.timers.size,0)
 await assert.rejects(f.installer.refreshCompute(),{uncertain:true})
 // The permanent quarantine intentionally retains the lock; close reports it.
 await assert.rejects(f.installer.close(),{uncertain:true})
})
