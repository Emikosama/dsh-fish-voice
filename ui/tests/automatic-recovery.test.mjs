import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
import { createConnectionRecovery } from '../src/connection-recovery.mjs'
const tick=()=>new Promise(resolve=>setImmediate(resolve))
const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no});return{promise,resolve,reject}}
const settings={revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{visibility:'hidden',performanceMode:'balanced'},onboarding:{version:1,completed:true}}
const status={enabled:false,ownerSessionId:null,helper:{online:false},voiceControlBusy:false,listenMode:'ptt',voiceSession:{id:null,fullyStopped:true}}
const performance={modes:['fast','balanced','high'].map(performanceMode=>({performanceMode,available:true}))}
const conversation={revision:1,rootSessionId:null,title:null,latest:null,items:[],inputActive:false,playbackConfirmed:false}
const installer={schema:1,models:[],jobs:[],hardware:{},compute:{}}
const authorization={schema:1,revision:'r',completed:true,granted:false,blockedOperations:[],revocationUnconfirmed:false,scopes:[],modelSources:[],restrictions:[]}
function clock(){let count=0;const jobs=new Map();return{jobs,schedule(fn,delay){jobs.set(++count,{fn,delay});return count},unschedule(id){jobs.delete(id)},async fire(){assert.ok(jobs.size,'a timer exists');const[id,{fn}]=jobs.entries().next().value;jobs.delete(id);fn();await tick()}}}
function fixture(handler){const timer=clock(),calls=[];const ui=createController(async(id,q,signal)=>{calls.push([id,q.action]);return handler?handler(id,q,signal):q.action==='read-settings'?settings:q.action==='inspect-performance'?performance:status},timer);ui.enableAutomaticReads();ui.setSession('A');return{ui,timer,calls}}

test('failed visible cache reads back off to 30 seconds, recover without a click, then stop',async()=>{
 let failing=true
 const f=fixture((_id,q)=>{if(q.action==='status'&&failing)throw Error('offline');return q.action==='read-settings'?settings:q.action==='inspect-performance'?performance:status})
 await tick();assert.equal(f.timer.jobs.size,1)
 const delays=[]
 for(let i=0;i<8;i++){delays.push([...f.timer.jobs.values()][0].delay);await f.timer.fire()}
 assert.deepEqual(delays,[750,1500,3000,6000,12000,24000,30000,30000])
 failing=false;await f.timer.fire();assert.equal(f.ui.getSnapshot().uncertain,false);assert.equal(f.timer.jobs.size,0)
 assert.equal(f.calls.filter(([,action])=>action==='inspect-performance').length,1,'recovery does not add paid probes')
 const count=f.calls.length;await tick();assert.equal(f.calls.length,count);f.ui.dispose()
})

test('hidden and collapsed panels pause failed reads, reopening resumes and unload cancels timers',async()=>{
 const f=fixture((_id,q)=>{if(q.action==='status')throw Error('offline');return q.action==='read-settings'?settings:performance})
 await tick();f.ui.setReadVisibility(false);assert.equal(f.timer.jobs.size,0)
 f.ui.refresh({force:true});await tick();const count=f.calls.length
 f.ui.setPanelVisible(false);f.ui.setReadVisibility(true);await tick();assert.equal(f.calls.length,count)
 f.ui.setPanelVisible(true);await tick();assert.ok(f.calls.length>count);assert.equal(f.timer.jobs.size,1)
 f.ui.dispose();assert.equal(f.timer.jobs.size,0)
})

test('unknown settings write reads settings then status, never resubmits, and keeps physical blockers',async()=>{
 let current=settings,blocked=false
 const f=fixture((_id,q)=>{
  if(q.action==='save-settings'){current={...settings,revision:'r2'};blocked=true;throw Error('response lost')}
  if(q.action==='read-settings')return current
  if(q.action==='inspect-performance')return performance
  return blocked?{...status,ttsRuntime:{state:'blocked',busy:false,blocked:true},voiceSession:{id:null,fullyStopped:false,recovery:{kind:'helper-stop-unconfirmed',rootSessionId:null,stopVerified:false}}}:status
 })
 await tick();await f.ui.run('A','save-settings');await f.timer.fire();await f.timer.fire()
 assert.deepEqual(f.calls.slice(-2),[['A','read-settings'],['A','status']]);assert.equal(f.calls.filter(([,action])=>action==='save-settings').length,1)
 assert.equal(f.ui.getSnapshot().settings.revision,'r2');assert.equal(f.ui.getSnapshot().visibilityUncertain,false)
 assert.equal(f.ui.getSnapshot().ttsUncertain,true);assert.equal(f.ui.getSnapshot().status.voiceSession.fullyStopped,false);f.ui.dispose()
})

test('same-session external settings refresh preserves edited revision until a real discard choice',async()=>{
 let current=settings
 const f=fixture((_id,q)=>q.action==='read-settings'?current:q.action==='inspect-performance'?performance:status)
 await tick();f.ui.markSettingsEdited();current={...settings,revision:'r2',values:{...settings.values,pttMouse:1}}
 f.ui.refresh({force:true});await tick()
 assert.equal(f.ui.getSnapshot().settings.revision,'r1');assert.equal(f.ui.getSnapshot().settingsConflict,true)
 assert.equal(await f.ui.run('A','save-settings'),false,'known stale CAS cannot be submitted')
 f.ui.discardSettingsDraft();assert.equal(f.ui.getSnapshot().settings.revision,'r2');assert.equal(f.ui.getSnapshot().settingsConflict,false)
 current={...current,revision:'r3'};await f.ui.openSettings();await tick();assert.equal(f.ui.getSnapshot().settings.revision,'r3');f.ui.dispose()
})

test('shutdown can cancel a stuck cached read without letting its late response overwrite shutdown',async()=>{
 const waiting=deferred();let defer=false
 const f=fixture((_id,q)=>q.action==='read-settings'?defer?waiting.promise:settings:q.action==='inspect-performance'?performance:status)
 await tick();defer=true;const read=f.ui.run('A','read-settings');await tick()
 assert.equal(f.ui.getSnapshot().interruptibleRead,'read-settings');assert.equal(await f.ui.run('A','disable'),true);assert.equal(await read,false)
 waiting.resolve({...settings,revision:'late'});await tick();assert.equal(f.ui.getSnapshot().settings.revision,'r1');assert.equal(f.ui.getSnapshot().busy,false);f.ui.dispose()
})

test('late reads from replaced clients or sessions cannot clear a newer unknown state',async()=>{
 for(const boundary of ['session','client']){
  const old=deferred(),timer=clock();let failing=false
  const ui=createController(async(_id,q)=>{if(q.action==='read-settings'&&!failing)return old.promise;if(q.action==='status')throw Error('new offline');return performance},timer)
  ui.setSession('A');const read=ui.run('A','read-settings');await tick();failing=true
  if(boundary==='session'){ui.setSession('B');ui.setSession('A')}else ui.attachConversationClient({subscribe:()=>()=>{}})
  old.resolve({...settings,revision:'old'});assert.equal(await read,false);assert.equal(ui.getSnapshot().settings,null)
  await ui.run('A','status');assert.equal(ui.getSnapshot().uncertain,true);ui.dispose()
 }
})

test('failed stream reconnect is scoped, backs off, and is quiet after live snapshots',async()=>{
 const timer=clock(),streams=[],models=[]
 const ui=createController(async(_id,q)=>q.action==='read-settings'?settings:q.action==='inspect-performance'?performance:q.action==='model-installer'?installer:status,timer)
 ui.enableAutomaticReads();ui.setSession('A')
 ui.attachConversationClient({subscribe(id,value,error){const stream={id,value,error,stopped:false};streams.push(stream);value(conversation,{initial:true});return()=>stream.stopped=true},subscribeModels(id,value,error){const stream={id,value,error,stopped:false};models.push(stream);value(installer,{initial:true});return()=>stream.stopped=true}})
 await tick();streams.at(-1).value(conversation);await ui.run('A','model-installer');models.at(-1).value(installer)
 const streamCount=streams.length,original=streams.at(-1);original.error(Error('EOF'));await timer.fire();assert.equal(original.stopped,true);assert.equal(streams.length,streamCount+1)
 streams.at(-1).value(conversation);assert.equal(timer.jobs.size,0)
 models.at(-1).error(Error('EOF'));await timer.fire();assert.equal(models.length,2);models.at(-1).value(installer);assert.equal(timer.jobs.size,0)
 const stale=streams.at(-1);ui.setSession('B');await tick();stale.error(Error('late A'));assert.equal(timer.jobs.size,0);assert.equal(ui.getSnapshot().conversationError,null)
 ui.dispose();assert.ok(streams.at(-1).stopped);assert.ok(models.at(-1).stopped)
})

test('rapid source changes discard the prior visit to the same source until a fresh status arrives', async () => {
  const waiting = deferred()
  let transitioning = false
  const f = fixture((id, q) => {
    if (q.action === 'read-settings') return settings
    if (q.action === 'inspect-performance') return performance
    return transitioning && id === 'A' ? waiting.promise : status
  })
  try {
    await tick()
    assert.equal(f.ui.getSnapshot().checkedFor, 'A')
    transitioning = true
    f.ui.setSession('B')
    f.ui.setSession('A')
    await tick()
    assert.equal(f.ui.getSnapshot().sourcePending, true)
    assert.equal(f.ui.getSnapshot().checkedFor, undefined)
    waiting.resolve(status)
    await tick()
    assert.equal(f.ui.getSnapshot().sourcePending, false)
    assert.equal(f.ui.getSnapshot().checkedFor, 'A')
  } finally { f.ui.dispose() }
})

test('a confirmed write from the old source cannot become the current status', async () => {
  const writing = deferred()
  const f = fixture((_id, q) => {
    if (q.action === 'read-settings') return settings
    if (q.action === 'inspect-performance') return performance
    if (q.action === 'new') return writing.promise
    return status
  })
  try {
    await tick()
    const completing = f.ui.run('A','new')
    f.ui.setSession('B')
    writing.resolve({ ...status, enabled:true, ownerSessionId:'A', voiceSession:{ id:'root-A', fullyStopped:false } })
    assert.equal(await completing, true)
    await tick()
    assert.equal(f.ui.getSnapshot().checkedFor, 'B')
    assert.equal(f.ui.getSnapshot().status.enabled, false)
  } finally { f.ui.dispose() }
})

test('authorization recovers automatically without a selected session and preserves revocation uncertainty',async()=>{
 const timer=clock();let fail=true,revocation=false,reads=0
 const ui=createController(undefined,timer);ui.enableAutomaticReads()
 ui.attachConversationClient({subscribe:()=>()=>{},readAuthorization:async()=>{reads++;if(fail)throw Error('offline');return{...authorization,revocationUnconfirmed:revocation}}})
 await tick();assert.equal(timer.jobs.size,1);fail=false;revocation=true;await timer.fire()
 assert.equal(reads,2);assert.equal(ui.getSnapshot().authorizationUncertain,true);assert.equal(ui.getSnapshot().authorization.revocationUnconfirmed,true);assert.equal(timer.jobs.size,0);ui.dispose()
})

test('cache success does not unlock an unconfirmed hardware diagnosis',async()=>{
 const timer=clock(),ui=createController(async(_id,q)=>{if(q.action==='inspect-model-compute')throw Object.assign(Error('cannot confirm exit'),{uncertain:true});return installer},timer)
 ui.setSession('A');await ui.run('A','inspect-model-compute');assert.equal(ui.getSnapshot().installerUncertain,true)
 await ui.run('A','model-installer');assert.equal(ui.getSnapshot().installerUncertain,true);ui.dispose()
})

test('initial transport mount retries with backoff, pauses hidden, and disposes a late mount once',async()=>{
 const timer=clock();let visible=true,attempts=0,ready=0,disposes=0
 const connection=createConnectionRecovery(async()=>{attempts++;if(attempts<3)throw Error('not ready');return{dispose(){disposes++}}},{...timer,visible:()=>visible,onReady(){ready++},onError(){}})
 await connection.start();assert.equal(attempts,1);await timer.fire();assert.equal(attempts,2)
 visible=false;connection.visibilityChanged();assert.equal(timer.jobs.size,0);await connection.refresh();assert.equal(attempts,2)
 visible=true;connection.visibilityChanged();await tick();assert.equal(ready,1);assert.equal(timer.jobs.size,0)
 await connection.refresh();assert.equal(attempts,3);connection.dispose();assert.equal(disposes,1)
 const late=deferred();const second=createConnectionRecovery(()=>late.promise,{...timer,onReady(){assert.fail('late mount cannot attach')},onError(){}})
 const work=second.start();second.dispose();late.resolve({dispose(){disposes++}});await work;assert.equal(disposes,2)
})

test('owner setup-status recovers without a session and cannot reopen dismissed onboarding',async()=>{
 const timer=clock();let failing=true
 const ui=createController(undefined,timer);ui.enableAutomaticReads()
 ui.attachConversationClient({subscribe:()=>()=>{},readSetup:async()=>{if(failing)throw Error('offline');return{version:1,completed:false}}})
 await tick();assert.equal(timer.jobs.size,1)
 await ui.dismissSetup();failing=false;await timer.fire()
 assert.equal(ui.getSnapshot().setupStatus.completed,false);assert.equal(ui.getSnapshot().setupOpen,false);assert.equal(ui.getSnapshot().setupError,null);assert.equal(timer.jobs.size,0);ui.dispose()
})

test('saving clears only its own settings draft section, and the last save restores automatic updates',async()=>{
 for(const action of ['save-settings','save-models','save-tts','set-performance-mode','set-visibility']){
  let current=settings
  const ui=createController(async(_id,q)=>{
   if(q.action==='read-settings')return current
   if(q.action===action){current={...current,revision:'saved'};return current}
   return status
  })
  ui.setSession('A');await ui.run('A','read-settings')
  ui.markSettingsEdited(action==='save-settings'?undefined:action)
  await ui.run('A',action)
  current={...current,revision:'external'}
  await ui.run('A','read-settings')
  assert.equal(ui.getSnapshot().settingsConflict,false,action)
  assert.equal(ui.getSnapshot().settings.revision,'external',action)
  assert.equal(ui.getSnapshot().settingsKey,'external',action)
  ui.dispose()
 }
})

// React page preparation can run at the readRefresh publication or the settings
// read's busy:false publication, before the lifecycle continuation gets its turn.
async function contendedRefresh(boundary='after-settings'){
 const volume=deferred(),calls=[],timer=clock()
 const ui=createController(async(id,q)=>{calls.push([id,q.action]);return q.action==='read-settings'?settings:q.action==='inspect-performance'?performance:status},timer)
 const client={subscribe:()=>()=>{},readVolume:()=>{calls.push(['A','readVolume']);return volume.promise}}
 ui.attachConversationClient(client);ui.setSession('A');ui.enableAutomaticReads();await tick()
 calls.length=0
 const refresh=ui.getSnapshot().readRefresh
 let started=false
 const prepare=()=>{const state=ui.getSnapshot();if(!started&&!state.busy&&state.readRefresh>refresh){started=true;void ui.run('A','read-output-volume')}}
 const unsubscribe=ui.subscribe(()=>{if(boundary==='before-settings')prepare();else queueMicrotask(prepare)})
 ui.refresh({force:true});await tick()
 return{ui,volume,calls,timer,refresh,unsubscribe}
}

test('lifecycle phases resume after competing page reads without duplicate page notifications',async()=>{
 for(const boundary of ['before-settings','after-settings']){
  const f=await contendedRefresh(boundary)
  assert.deepEqual(f.calls.map(([,action])=>action),boundary==='before-settings'?['readVolume']:['read-settings','readVolume'])
  assert.equal(f.ui.getSnapshot().readRefresh,f.refresh+1)
  f.volume.resolve({supported:false});await tick()
  assert.deepEqual(f.calls.map(([,action])=>action),boundary==='before-settings'?['readVolume','read-settings','status']:['read-settings','readVolume','status'])
  assert.equal(f.ui.getSnapshot().readRefresh,f.refresh+1,'continuation cannot retrigger page preparation')
  assert.equal(f.ui.getSnapshot().busy,false);assert.equal(f.timer.jobs.size,0)
  f.unsubscribe();f.ui.dispose()
 }
})

test('a paused lifecycle remains quiet while hidden or collapsed and resumes only after reopening',async()=>{
 for(const visibility of ['setReadVisibility','setPanelVisible']){
  const f=await contendedRefresh()
  f.ui[visibility](false);f.volume.resolve({supported:false});await tick()
  assert.deepEqual(f.calls.map(([,action])=>action),['read-settings','readVolume'])
  f.ui[visibility](true);await tick()
  assert.deepEqual(f.calls.slice(-2),[['A','read-settings'],['A','status']])
  f.unsubscribe();f.ui.dispose()
 }
})

test('a newer session or client refresh supersedes paused phases and rejects the old read result',async()=>{
 for(const boundary of ['session','client']){
  const f=await contendedRefresh()
  if(boundary==='session')f.ui.setSession('B')
  else f.ui.attachConversationClient({subscribe:()=>()=>{},readVolume:async()=>({supported:false})})
  await tick();f.volume.resolve({supported:true,volume:0.1,revision:'old'});await tick()
  const id=boundary==='session'?'B':'A'
  assert.equal(f.ui.getSnapshot().checkedFor,id)
  assert.equal(f.ui.getSnapshot().outputVolume,null,'old cache reply cannot publish across its scope')
  assert.equal(f.calls.filter(([source,action])=>source===id&&action==='status').length,1,'only the new scope completes status')
  if(boundary==='session')assert.equal(f.calls.some(([source,action])=>source==='A'&&action==='status'),false)
  f.unsubscribe();f.ui.dispose()
 }
})

test('explicit mute preempts the competing cache read without replaying audio or publishing its late result',async()=>{
 const f=await contendedRefresh()
 assert.equal(await f.ui.run('A','disable'),true);await tick()
 f.volume.resolve({supported:true,volume:0.1,revision:'late'});await tick()
 assert.equal(f.calls.filter(([,action])=>action==='disable').length,1)
 assert.equal(f.calls.some(([,action])=>['enable','preview-tts','set-output-volume'].includes(action)),false)
 assert.equal(f.ui.getSnapshot().outputVolume,null)
 assert.equal(f.ui.getSnapshot().status.enabled,false)
 assert.equal(f.ui.getSnapshot().busy,false)
 assert.equal(f.calls.filter(([,action])=>action==='status').length,1)
 f.unsubscribe();f.ui.dispose()
})

test('lifecycle transport failures retain backoff rather than immediately replaying the attempted phase',async()=>{
 const calls=[],timer=clock(),ui=createController(async(_id,q)=>{calls.push(q.action);if(q.action==='read-settings')throw Error('offline');return q.action==='inspect-performance'?performance:status},timer)
 ui.setSession('A');ui.enableAutomaticReads();await tick();await tick()
 assert.deepEqual(calls,['read-settings','status','inspect-performance'])
 assert.equal(timer.jobs.size,1)
 await timer.fire();assert.equal(calls.filter(action=>action==='read-settings').length,2)
 assert.equal([...timer.jobs.values()][0].delay,1500)
 ui.dispose()
})
