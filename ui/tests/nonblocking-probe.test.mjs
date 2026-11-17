import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return{promise,resolve,reject}}
const tick=()=>new Promise(r=>setImmediate(r))
const capability={modes:['fast','balanced','high'].map(performanceMode=>({performanceMode,available:true}))}
const status={enabled:false,ownerSessionId:null,helper:{online:false},voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true}}
const settings={revision:'new',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{performanceMode:'high'}}
function fixture(){const probe=deferred(),write=deferred(),calls=[];let signal
 const ui=createController(async(id,request,s)=>{calls.push([id,request.action]);if(request.action==='inspect-performance'){signal=s;return probe.promise}if(request.action==='save-agent-permissions')return write.promise;return ['read-settings','save-settings'].includes(request.action)?settings:status})
 ui.setSession('A');return{ui,probe,write,calls,get signal(){return signal}}
}
test('startup probe does not own busy: status, settings and disable remain usable',async()=>{
 const f=fixture();f.ui.enableAutomaticReads();await tick()
 assert.equal(f.ui.getSnapshot().performancePending,true);assert.equal(f.ui.getSnapshot().busy,false)
 assert.equal(await f.ui.run('A','status'),true)
 assert.equal(await f.ui.openSettings('interaction'),true);await tick();assert.equal(f.ui.getSnapshot().panelView,'settings')
 assert.equal(await f.ui.run('A','disable'),true);assert.equal(f.signal.aborted,true)
 f.probe.resolve(capability);await tick();assert.equal(f.ui.getSnapshot().status.enabled,false);assert.equal(f.ui.getSnapshot().performance,null);f.ui.dispose()
})
test('repeated probe requests share one transport while other writes remain serialized',async()=>{
 const f=fixture();const a=f.ui.run('A','inspect-performance'),b=f.ui.run('A','inspect-performance')
 assert.equal(f.calls.filter(c=>c[1]==='inspect-performance').length,1)
 const write=f.ui.run('A','save-agent-permissions');assert.equal(f.ui.getSnapshot().busy,true)
 assert.equal(await f.ui.run('A','disable'),false,'do not allow write/write concurrency')
 f.probe.resolve(capability);assert.equal(await a,true);assert.equal(await b,true)
 assert.equal(f.ui.getSnapshot().busy,true,'probe finally must not clear another write busy')
 f.write.reject(Error('write failed'));await write;assert.match(f.ui.getSnapshot().error,/write failed/);f.ui.dispose()
})
test('probe success or failure cannot erase an already completed write failure',async()=>{
 for(const fail of [false,true]){const f=fixture();const probe=f.ui.run('A','inspect-performance');const write=f.ui.run('A','save-agent-permissions')
 f.write.reject(Error('write failed'));await write
 if(fail)f.probe.reject(Error('probe offline'));else f.probe.resolve(capability)
 await probe;assert.equal(f.ui.getSnapshot().error,'write failed');assert.equal(f.ui.getSnapshot().agentPermissionUncertain,true)
 assert.equal(f.ui.getSnapshot().performanceError,fail?'probe offline':null);f.ui.dispose()}
})
test('session switch cancels probe and fences ignored cancellation late answer',async()=>{
 const f=fixture();const pending=f.ui.run('A','inspect-performance');f.ui.setSession('B')
 assert.equal(f.signal.aborted,true);assert.equal(await pending,false)
 f.probe.resolve(capability);await tick();assert.equal(f.ui.getSnapshot().performanceFor,null);assert.equal(f.ui.getSnapshot().performancePending,false);f.ui.dispose()
})
test('client replacement and unload cancel their probe without publishing stale errors',async()=>{
 for(const dispose of [false,true]){const ui=createController(),first=deferred();let signal
 const client={subscribe:()=>()=>{},action:async(id,request,s)=>{signal=s;return first.promise}}
 ui.setSession('A');ui.attachConversationClient(client);const pending=ui.run('A','inspect-performance')
 if(dispose)ui.dispose();else ui.attachConversationClient({...client,action:async()=>capability})
 assert.equal(signal.aborted,true);assert.equal(await pending,false);first.reject(Error('late old client'));await tick()
 assert.equal(ui.getSnapshot().performanceError,null);assert.equal(ui.getSnapshot().performancePending,false);ui.dispose()}
})
test('settings mutation fences a probe and late answer cannot replace saved state',async()=>{
 const f=fixture();const probe=f.ui.run('A','inspect-performance');assert.equal(await f.ui.run('A','save-settings'),true)
 const saved=f.ui.getSnapshot().settings;assert.equal(await probe,false);f.probe.resolve(capability);await tick()
 assert.equal(f.ui.getSnapshot().settings,saved);assert.equal(f.ui.getSnapshot().performance,null);f.ui.dispose()
})
