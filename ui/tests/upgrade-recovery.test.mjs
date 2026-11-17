import test from 'node:test'
import assert from 'node:assert/strict'
import {createController} from '../src/controller.mjs'
const tick=()=>new Promise(resolve=>setImmediate(resolve))
function fixture(){
 let next=0,kind='predecessor-cleanup-pending',fail=false
 const jobs=new Map(),calls=[]
 const ui=createController(async(id,request)=>{calls.push([id,request.action]);if(fail)throw Error('read failed');return{ownerSessionId:null,enabled:false,helper:{online:false},voiceSession:{id:null,fullyStopped:kind==='none',recovery:{kind,rootSessionId:null,stopVerified:false}}}}, {schedule:fn=>{jobs.set(++next,fn);return next},unschedule:id=>jobs.delete(id)})
 ui.setSession('origin')
 return {ui,jobs,calls,kind:value=>kind=value,fail:()=>fail=true,async fire(){const [id,fn]=jobs.entries().next().value; jobs.delete(id);fn();await tick()}}
}
test('known predecessor cleanup refreshes only status and stops on confirmed completion',async()=>{
 const f=fixture();try{await f.ui.run('origin','status');assert.equal(f.jobs.size,1);f.kind('none');await f.fire();assert.deepEqual(f.calls,[['origin','status'],['origin','status']]);assert.equal(f.jobs.size,0);assert.equal(f.ui.getSnapshot().status.voiceSession.fullyStopped,true)}finally{f.ui.dispose()}
})
test('pending recovery reads are bounded and never turn timeout into successful stop',async()=>{
 const f=fixture();try{await f.ui.run('origin','status');for(let i=0;i<10;i++)await f.fire();assert.equal(f.jobs.size,0);assert.equal(f.calls.length,11);assert.ok(f.calls.every(([,action])=>action==='status'));assert.equal(f.ui.getSnapshot().status.voiceSession.fullyStopped,false)}finally{f.ui.dispose()}
})
test('navigation and unload cancel recovery reads, and read failure never replays activation',async()=>{
 for(const action of ['navigation','dispose','failure']){const f=fixture();await f.ui.run('origin','status');if(action==='navigation')f.ui.setSession('other');if(action==='dispose')f.ui.dispose();if(action==='failure'){f.fail();await f.fire();assert.equal(f.ui.getSnapshot().uncertain,true)}assert.equal(f.jobs.size,0);assert.ok(f.calls.every(([,name])=>name==='status'));f.ui.dispose()}
})

test('physical helper cleanup refreshes only status and preserves an unconfirmed-exit blocker', async () => {
 const f=fixture()
 try {
  f.kind('helper-cleanup-pending')
  assert.equal(await f.ui.run('origin','status'),true)
  assert.equal(f.jobs.size,1)
  f.kind('helper-stop-unconfirmed');await f.fire()
  assert.equal(f.jobs.size,0)
  assert.equal(f.ui.getSnapshot().status.voiceSession.recovery.kind,'helper-stop-unconfirmed')
  assert.equal(f.ui.getSnapshot().status.voiceSession.fullyStopped,false)
  assert.equal(await f.ui.run('origin','status'),true)
  assert.equal(f.ui.getSnapshot().status.voiceSession.recovery.kind,'helper-stop-unconfirmed')
  assert.ok(f.calls.every(([,action])=>action==='status'))
 } finally { f.ui.dispose() }
})
