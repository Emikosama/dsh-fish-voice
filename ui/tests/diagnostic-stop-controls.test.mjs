/** Diagnostics retain their bounded RPC; only an explicit microphone stop may overlap. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
const tick=()=>new Promise(resolve=>setImmediate(resolve))
const status=enabled=>({ownerSessionId:enabled?'A':null,enabled,helper:{online:true},voiceControlBusy:false,voiceSession:{id:null,fullyStopped:!enabled},ttsRuntime:{state:'idle',busy:false,blocked:false}})
const capability={platform:'win32',playbackSupported:true,systemSupported:true,edgePlaybackSupported:true,edgeDependency:'installed',installedChineseVoices:[],autoDownload:false,gpuSupported:false,edgeOfficialApi:false,edgeRecipient:'Microsoft',edgePurpose:'speech-synthesis'}
function fixture(t,action){
  const diagnostic=Promise.withResolvers(),stopped=Promise.withResolvers(),calls=[]
  const ui=createController(async(id,request,signal)=>{
    calls.push({id,action:request.action,signal})
    if(request.action===action)return diagnostic.promise
    if(request.action==='disable')return stopped.promise
    return status(true)
  })
  t.after(()=>ui.dispose());ui.setSession('A')
  return {ui,calls,diagnostic,stopped,value:action==='inspect-tts'?capability:{schema:1,backends:{}}}
}
for(const action of ['inspect-tts','inspect-model-compute']){
  for(const late of ['success','error'])for(const first of ['read','stop'])test(`${action}: ${late}, ${first} finishes first without unlocking the other operation`,async t=>{
    const f=fixture(t,action);await f.ui.run('A','status')
    const read=f.ui.run('A',action),stop=f.ui.run('A','disable')
    assert.equal(await f.ui.run('A','disable'),false,'double click cannot send another stop')
    assert.equal(f.calls.find(row=>row.action===action).signal.aborted,false,'keep the diagnostic result channel alive')
    assert.equal(f.calls.find(row=>row.action==='disable').signal,undefined,'independent stop receipt must not inherit diagnostic cancellation')
    assert.equal(f.ui.getSnapshot().diagnosticStopPending,true)
    assert.equal(await f.ui.run('A','save-tts'),false)
    assert.equal(await f.ui.run('A','listen-mode'),false)
    assert.equal(f.calls.filter(row=>row.action==='disable').length,1)
    const finishRead=async()=>{
      if(late==='success')f.diagnostic.resolve(f.value)
      else f.diagnostic.reject(Object.assign(new Error('cancelled by host stop'),{code:'TTS_CANCELLED'}))
      assert.equal(await read,false)
    }
    if(first==='read'){
      await finishRead()
      assert.equal(f.ui.getSnapshot().status.enabled,true,'read completion is not microphone stop evidence')
      assert.equal(f.ui.getSnapshot().diagnosticStopPending,true)
    }else{
      f.stopped.resolve(status(false));assert.equal(await stop,true)
      assert.equal(f.ui.getSnapshot().status.enabled,false)
    }
    assert.equal(f.ui.getSnapshot().busy,true,'one pending operation keeps ordinary writes fenced')
    assert.equal(await f.ui.run('A','save-settings'),false)
    if(first==='read'){f.stopped.resolve(status(false));assert.equal(await stop,true)}else await finishRead()
    assert.equal(f.ui.getSnapshot().status.enabled,false)
    assert.equal(f.ui.getSnapshot().busy,false)
    assert.equal(f.ui.getSnapshot().diagnosticStopPending,false)
    assert.equal(f.ui.getSnapshot().ttsCapabilities,null)
    assert.equal(f.ui.getSnapshot().error,null)
  })
  test(`${action}: navigation detaches presentation without globally cancelling output or preventing stop`,async t=>{
    const f=fixture(t,action);await f.ui.run('A','status');await f.ui.openSettings('models')
    const read=f.ui.run('A',action)
    assert.equal(await f.ui.showHome(),true)
    assert.equal(f.ui.getSnapshot().panelView,'home')
    assert.equal(f.ui.getSnapshot().busy,true)
    assert.equal(f.calls.find(row=>row.action===action).signal.aborted,false)
    assert.equal(f.calls.some(row=>row.action==='cancel-tts'),false)
    const stop=f.ui.run('A','disable')
    assert.equal(f.calls.filter(row=>row.action==='disable').length,1)
    f.stopped.resolve(status(false));await stop
    f.diagnostic.resolve(f.value);assert.equal(await read,false)
    assert.equal(f.ui.getSnapshot().status.enabled,false)
    assert.equal(f.ui.getSnapshot().ttsCapabilities,null)
  })
  for(const event of ['session','unload','client'])test(`${action}: ${event} ignores old presentation and unload alone requests abort`,async t=>{
    const f=fixture(t,action);await f.ui.run('A','status')
    const read=f.ui.run('A',action),pending=f.calls.find(row=>row.action===action)
    if(event==='session')f.ui.setSession('B')
    else if(event==='unload')f.ui.dispose()
    else f.ui.attachConversationClient({subscribe(){return()=>{}}})
    assert.equal(pending.signal.aborted,event==='unload')
    f.diagnostic.resolve(f.value);assert.equal(await read,false);await tick()
    assert.equal(f.ui.getSnapshot().ttsCapabilities,null)
    assert.equal(f.calls.some(row=>row.action==='disable'||row.action==='cancel-tts'),false)
    if(event!=='unload')assert.equal(f.ui.getSnapshot().busy,false)
  })
  test(`${action}: late diagnostic failure cannot hide an unconfirmed microphone stop`,async t=>{
    const f=fixture(t,action);await f.ui.run('A','status')
    const read=f.ui.run('A',action),stop=f.ui.run('A','disable')
    f.stopped.reject(new Error('microphone release unconfirmed'));assert.equal(await stop,false)
    f.diagnostic.reject(Object.assign(new Error('late diagnostic failure'),{uncertain:true}));assert.equal(await read,false)
    assert.match(f.ui.getSnapshot().error,/microphone release unconfirmed/)
    assert.equal(f.ui.getSnapshot().uncertain,true)
    assert.equal(f.ui.getSnapshot().status.enabled,true)
    assert.equal(f.ui.getSnapshot()[action==='inspect-tts'?'ttsUncertain':'installerUncertain'],true)
  })
  test(`${action}: navigation cannot hide a later genuine unknown process exit`,async t=>{
    const f=fixture(t,action);await f.ui.run('A','status')
    const read=f.ui.run('A',action);await f.ui.showHome()
    f.diagnostic.reject(new Error('[TTS_TERMINATION_UNCONFIRMED] process exit was not observed'))
    assert.equal(await read,false)
    assert.equal(f.ui.getSnapshot()[action==='inspect-tts'?'ttsUncertain':'installerUncertain'],true)
    assert.equal(f.ui.getSnapshot().status.enabled,true)
    assert.equal(f.ui.getSnapshot().error,null,'no obsolete page error replaces current presentation')
  })
}
test('an in-flight settings write is never preempted or allowed to overlap a stop',async t=>{
  const pending=Promise.withResolvers(),calls=[]
  const ui=createController(async(_id,request)=>{calls.push(request.action);if(request.action==='save-tts')return pending.promise;return status(true)})
  t.after(()=>ui.dispose())
  const save=ui.run('A','save-tts')
  assert.equal(ui.getSnapshot().interruptibleRead,null)
  assert.equal(await ui.run('A','disable'),false)
  assert.deepEqual(calls,['save-tts'])
  pending.reject(new Error('synthetic write failure'));assert.equal(await save,false)
})
test('subscriber stop before diagnostic dispatch prevents obsolete inspection startup',async t=>{
  const f=fixture(t,'inspect-tts');let stop
  const unsubscribe=f.ui.subscribe(()=>{if(f.ui.getSnapshot().interruptibleRead&&!stop){unsubscribe();stop=f.ui.run('A','disable')}})
  const read=f.ui.run('A','inspect-tts')
  assert.deepEqual(f.calls.map(row=>row.action),['disable'])
  assert.equal(await read,false);assert.equal(f.ui.getSnapshot().busy,true)
  f.stopped.resolve(status(false));assert.equal(await stop,true)
})
