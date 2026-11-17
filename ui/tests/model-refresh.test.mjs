import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
import { decodeSetupReply } from '../src/setup-protocol.mjs'
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return{promise,resolve,reject}}
const reply=(action,value)=>value
const installer={schema:1,models:[],jobs:[],hardware:{},compute:{backends:{}}}
const tick=()=>new Promise(r=>setImmediate(r))
test('silent entry inspection does not take global busy and stop microphone stays available',async()=>{
 const pending=deferred(),calls=[]
 const ui=createController(async(id,request)=>{calls.push(request.action);if(request.action==='inspect-model-compute')return pending.promise;if(request.action==='model-installer')return reply(request.action,installer);if(request.action==='disable')return reply(request.action,{enabled:false,ownerSessionId:null,helper:{online:false}});throw Error(request.action)})
 ui.setSession('A');const first=ui.refreshModelCompute('A'),second=ui.refreshModelCompute('A');assert.equal(first,second);assert.equal(ui.getSnapshot().busy,false);assert.equal(ui.getSnapshot().modelComputePending,true)
 assert.equal(await ui.run('A','disable'),true);assert.equal(ui.getSnapshot().status.enabled,false)
 pending.resolve(reply('inspect-model-compute',{backends:{}}));assert.equal(await first,true);assert.equal(ui.getSnapshot().modelComputePending,false);assert.deepEqual(calls,['inspect-model-compute','disable','model-installer']);ui.dispose()
})
test('returning to the model page refreshes again even inside the five-minute interval',async()=>{
 let count=0;const ui=createController(async(id,{action})=>{if(action==='inspect-model-compute'){count++;return reply(action,{backends:{}})}return reply(action,installer)})
 ui.setSession('A');assert.equal(await ui.refreshModelCompute('A'),true);assert.equal(await ui.refreshModelCompute('A'),true);assert.equal(count,2);ui.dispose()
})
test('late old-session inspection cannot replace current model data or hold pending state',async()=>{
 const pending=deferred();const ui=createController(async(id,{action})=>action==='inspect-model-compute'?pending.promise:reply(action,installer))
 ui.setSession('A');const work=ui.refreshModelCompute('A');ui.setSession('B');assert.equal(ui.getSnapshot().modelComputePending,false);pending.resolve(reply('inspect-model-compute',{backends:{}}));assert.equal(await work,false);assert.notEqual(ui.getSnapshot().installerFor,'A');ui.dispose()
})
test('silent failure preserves the last snapshot and never turns into a model mutation',async()=>{
 let bad=false;const ui=createController(async(id,{action})=>{if(action==='inspect-model-compute'){if(bad)throw Error('no backend');return reply(action,{backends:{}})}return reply(action,installer)})
 ui.setSession('A');await ui.refreshModelCompute('A');const before=ui.getSnapshot().installer;bad=true;assert.equal(await ui.refreshModelCompute('A'),false);assert.equal(ui.getSnapshot().installer,before);assert.equal(ui.getSnapshot().busy,false);assert.match(ui.getSnapshot().modelComputeError,/no backend/);ui.dispose()
})
test('background refresh metadata is validated before UI rendering',()=>{
 for(const refresh of [{pending:'yes'},{pending:false,error:{}},{pending:false,error:'x'.repeat(513)},{pending:false,intervalMs:-1}])assert.throws(()=>decodeSetupReply('model-installer',{...installer,refresh}))
 assert.equal(decodeSetupReply('model-installer',{...installer,refresh:{pending:false,observedAt:null,attemptedAt:null,error:null,intervalMs:300000}}).refresh.intervalMs,300000)
})
