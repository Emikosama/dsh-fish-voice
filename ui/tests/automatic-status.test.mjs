import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from './action-harness.mjs'
import { createController as createOwnerController } from '../src/controller.mjs'
const tick=()=>new Promise(resolve=>setImmediate(resolve))
const response=(action,value)=>({ok:true,value:{result:{kind:'success',text:JSON.stringify({protocol:1,action,value:action==='inspect-performance'?{modes:['fast','balanced','high'].map(performanceMode=>({performanceMode,available:true}))}:value})}}})
const status={enabled:false,ownerSessionId:null,helper:{online:false},voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true}}
const settings={revision:'r',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{visibility:'hidden'},onboarding:{version:1,completed:true}}
function harness(handler){const calls=[];const ui=createController(async(id,line)=>{const q=JSON.parse(line.slice('/whale-ear-ui '.length));calls.push({id,...q});return handler?handler(id,q):response(q.action,q.action==='read-settings'?settings:status)});return{ui,calls}}
test('completed users get a usable initial status and settings without enabling audio',async()=>{
 const{ui,calls}=harness();ui.enableAutomaticReads();ui.setSession('A');await tick()
 assert.deepEqual(calls.map(x=>x.action),['read-settings','status','inspect-performance']);assert.equal(ui.getSnapshot().checkedFor,'A');assert.equal(ui.getSnapshot().settingsFor,'A');assert.equal(ui.getSnapshot().uncertain,false)
 ui.dispose()
})
test('focus and reopen bursts are coalesced and never poll',async()=>{
 const{ui,calls}=harness();ui.enableAutomaticReads();ui.setSession('A');await tick()
 const count=calls.length;for(let i=0;i<10;i++)ui.refresh();await tick();assert.equal(calls.length,count)
 ui.refresh({force:true});ui.refresh({force:true});await tick();assert.equal(calls.length,count+2)
 await tick();assert.equal(calls.length,count+2);ui.dispose()
})
test('focus readback keeps confirmed controls available and yields to a click',async()=>{
 let release, held=false, enabled=false
 const pending=new Promise(resolve=>release=resolve)
 const{ui,calls}=harness(async(_,request)=>{
   if(request.action==='read-settings'){
     if(held){held=false;await pending;return response(request.action,{...settings,revision:'old-read'})}
     return response(request.action,settings)
   }
   if(request.action==='enable')enabled=true
   return response(request.action,enabled?{...status,enabled:true,ownerSessionId:'A'}:status)
 })
 ui.enableAutomaticReads();ui.setSession('A');await tick()
 held=true;ui.refresh({force:true});await tick()
 assert.equal(calls.at(-1).action,'read-settings')
 assert.equal(ui.getSnapshot().busy,false)
 assert.deepEqual(ui.getSnapshot().settings,settings)
 assert.equal(await ui.run('A','enable',{expectedOwnerSessionId:null}),true)
 release();await tick()
 assert.equal(ui.getSnapshot().settings.revision,settings.revision)
 assert.equal(ui.getSnapshot().status.enabled,true)
 ui.dispose()
})
test('sessionless opening cannot issue a host command',async()=>{
 const{ui,calls}=harness();ui.enableAutomaticReads();ui.refresh({force:true});await ui.openSettings();await tick();assert.deepEqual(calls,[]);ui.dispose()
})
test('a newer session replaces a queued read and late data cannot become current',async()=>{
 let release;const blocked=new Promise(resolve=>release=resolve);const{ui,calls}=harness(async(id,q)=>{if(id==='A'&&q.action==='read-settings')await blocked;return response(q.action,q.action==='read-settings'?settings:status)})
 ui.enableAutomaticReads();ui.setSession('A');await tick();ui.setSession('B');ui.setSession('C');release();await tick();await tick()
 assert.equal(ui.getSnapshot().checkedFor,'C');assert.equal(ui.getSnapshot().settingsFor,'C');assert.equal(calls.some(x=>x.id==='B'),false);assert.equal(calls.some(x=>x.id==='A'&&x.action==='status'),false);ui.dispose()
})
test('failed reads keep known status and uncertainty before their delayed recovery',async()=>{
 let fail=false;const{ui,calls}=harness(async(id,q)=>{if(fail&&q.action==='status')throw Error('network lost');return response(q.action,q.action==='read-settings'?settings:status)})
 ui.enableAutomaticReads();ui.setSession('A');await tick();fail=true;ui.refresh({force:true});await tick();const count=calls.length
 assert.deepEqual(ui.getSnapshot().status,status);assert.equal(ui.getSnapshot().uncertain,true);assert.match(ui.getSnapshot().error,/network lost/);await tick();assert.equal(calls.length,count)
 assert.equal(ui.getSnapshot().readOnlyFailure,true,'a failed status read keeps controls fenced without claiming an operation was submitted')
 fail=false;ui.refresh({force:true});await tick();assert.equal(ui.getSnapshot().uncertain,false);ui.dispose()
})
test('refresh queued during a mutation runs afterwards but never repeats the mutation',async()=>{
 let release;const pending=new Promise(resolve=>release=resolve);const{ui,calls}=harness(async(id,q)=>{if(q.action==='enable')await pending;return response(q.action,q.action==='read-settings'?settings:status)})
 ui.enableAutomaticReads();ui.setSession('A');await tick();const start=ui.run('A','enable',{expectedOwnerSessionId:null});ui.refresh({force:true});await tick();assert.equal(calls.at(-1).action,'enable');release();await start;await tick()
 assert.equal(calls.at(-1).action,'status');assert.equal(calls.filter(x=>x.action==='enable').length,1);ui.dispose()
})
test('opening settings automatically re-reads configuration and status',async()=>{
 const{ui,calls}=harness();ui.enableAutomaticReads();ui.setSession('A');await tick();const initial=ui.getSnapshot().settings;await ui.openSettings('interaction');await tick();assert.deepEqual(ui.getSnapshot().settings,initial);assert.equal(calls.filter(x=>x.action==='read-settings').length,2);assert.equal(ui.getSnapshot().settingsTab,'interaction');ui.dispose()
})
test('disposing cancels queued lifecycle reads',async()=>{
 const{ui,calls}=harness();ui.enableAutomaticReads();ui.setSession('A');ui.dispose();await tick();assert.deepEqual(calls,[])
})

test('a failed mutation drops older queued lifecycle refresh and preserves its visible error',async()=>{
 let reject;const pending=new Promise((_,no)=>reject=no);const{ui,calls}=harness(async(id,q)=>{if(q.action==='enable')await pending;return response(q.action,q.action==='read-settings'?settings:status)})
 ui.enableAutomaticReads();ui.setSession('A');await tick();const writing=ui.run('A','enable');ui.refresh({force:true});reject(Error('network lost'));await writing;await tick()
 assert.equal(calls.at(-1).action,'enable');assert.equal(ui.getSnapshot().uncertain,true);assert.match(ui.getSnapshot().error,/network lost/)
 ui.refresh({force:true});await tick();assert.equal(calls.at(-1).action,'status');assert.equal(ui.getSnapshot().uncertain,false);ui.dispose()
})

test('a new session refresh resumes after asynchronous preview cancellation',async()=>{
 let cancel;const cancelled=new Promise(resolve=>cancel=resolve),calls=[]
 const ui=createController(async(id,line,_,signal)=>{const q=JSON.parse(line.slice('/whale-ear-ui '.length));calls.push({id,...q});if(q.action==='preview-tts')return new Promise((_,no)=>signal.addEventListener('abort',()=>no(Error('aborted'))));if(q.action==='cancel-tts')return cancelled;return response(q.action,q.action==='read-settings'?settings:status)})
 ui.enableAutomaticReads();ui.setSession('A');await tick();const preview=ui.run('A','preview-tts');ui.setSession('B');await tick()
 assert.equal(ui.getSnapshot().ttsCancelling,true);cancel(response('cancel-tts',{status:'cancelled'}));await preview;await tick();await tick()
 assert.equal(ui.getSnapshot().checkedFor,'B');assert.equal(ui.getSnapshot().settingsFor,'B');assert.deepEqual(calls.slice(-3).map(x=>[x.id,x.action]),[['B','read-settings'],['B','status'],['B','inspect-performance']]);ui.dispose()
})

test('readback failure after an unconfirmed start keeps its write warning and never resubmits it',async()=>{
  const {ui,calls}=harness(async(_id,request)=>{
    if(request.action==='enable'||request.action==='status')throw Error('lost response')
    return response(request.action,settings)
  })
  try {
    ui.setSession('A')
    await ui.run('A','enable',{expectedOwnerSessionId:null})
    await ui.run('A','status')
    assert.equal(ui.getSnapshot().uncertain,true)
    assert.equal(ui.getSnapshot().readOnlyFailure,false)
    assert.equal(calls.filter(call=>call.action==='enable').length,1)
  } finally { ui.dispose() }
})

test('the requested desktop pet entry can be opened without changing voice state',async()=>{
 const{ui,calls}=harness();ui.enableAutomaticReads();ui.setSession('A');await tick()
 await ui.openSettings('pets');await tick();assert.equal(ui.getSnapshot().settingsTab,'pets');assert.equal(ui.getSnapshot().panelView,'settings')
 assert.ok(calls.every(x=>['read-settings','status','inspect-performance'].includes(x.action)));assert.equal(ui.getSnapshot().status.enabled,false);ui.dispose()
})


test('owner transport prepares an empty DSH home while setup status is temporarily unavailable',async()=>{
 const calls=[]
 const ui=createOwnerController()
 ui.enableAutomaticReads()
 ui.attachConversationClient({subscribe(){return()=>{}},async action(id,q){calls.push([id,q.action]);return q.action==='read-settings'?settings:status},async readSetup(){throw Error('setup read unavailable')}})
 await tick()
 assert.deepEqual(calls,[[null,'read-settings'],[null,'status']])
 assert.equal(ui.getSnapshot().sourcePending,false)
 assert.equal(ui.getSnapshot().status.enabled,false)
 ui.dispose()
})

test('a DeepSeek 401 encoded by the gateway stays a failed preview with a settings action',async()=>{
 const calls=[]
 const ui=createOwnerController(async(_id,{action})=>{
  calls.push(action)
  if(action==='preview-tts')throw Error('Host operation failed\n[TTS_DEEPSEEK_API_KEY_INVALID]')
  if(action==='cancel-tts')return {status:'idle'}
  return status
 })
 ui.setSession('A')
 assert.equal(await ui.run('A','preview-tts'),false)
 assert.equal(ui.getSnapshot().ttsPreview.status,'failed')
 assert.match(ui.getSnapshot().ttsPreview.detail,/401.*DSH 模型设置/)
 assert.equal(ui.getSnapshot().authorizationOpen,false)
 assert.equal(ui.getSnapshot().ttsUncertain,false)
 assert.deepEqual(calls,['preview-tts','cancel-tts'])
 ui.dispose()
})

test('an uncertain stop cannot be sent again before its readback',async()=>{
 const calls=[]
 const ui=createOwnerController(async(_id,{action})=>{
  calls.push(action)
  if(action==='disable'&&calls.length===2)throw Error('lost stop response')
  return {...status,enabled:true,ownerSessionId:'A'}
 })
 ui.setSession('A')
 await ui.run('A','status')
 assert.equal(await ui.run('A','disable'),false)
 assert.equal(ui.getSnapshot().voiceStopUnconfirmed,true)
 assert.equal(await ui.run('A','disable'),false)
 assert.equal(await ui.run('A','status'),true)
 assert.equal(await ui.run('A','disable'),true)
 assert.deepEqual(calls,['status','disable','status','disable'])
 ui.dispose()
})
