/** Regression coverage from the independent TTS integration review. No real audio. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from './action-harness.mjs'
const reply = (action,value)=>({ok:true,value:{result:{kind:'success',text:JSON.stringify({protocol:1,action,value})}}})
const request = line=>JSON.parse(line.slice('/whale-ear-ui '.length))

test('an Edge text-only preview settles with a visible text fallback status', async()=>{
  const ui=createController(async(_id,line)=>reply(request(line).action,{
    provider:'edge',fallback:false,textOnly:true,playbackCompleted:false,acousticConfirmation:false,reason:'TTS_EDGE_FAILED'
  }))
  try{
    ui.setSession('source-A')
    assert.equal(await ui.run('source-A','preview-tts'),true)
    assert.equal(ui.getSnapshot().ttsPreview.status,'text-only')
    assert.equal(ui.getSnapshot().ttsUncertain,false)
  }finally{ui.dispose()}
})

test('unknown preview transport outcome must retain a real way to stop before dismissal', async()=>{
  const calls=[]
  const ui=createController(async(id,line,_files,signal)=>{
    const {action}=request(line);calls.push({id,action,signal})
    if(action==='preview-tts') throw Error('connection lost after backend accepted playback')
    return reply(action,{status:'cancelled'})
  })
  ui.openSetup();ui.setSession('source-A')
  await ui.run('source-A','preview-tts')
  const preview=calls.find(c=>c.action==='preview-tts')
  assert.equal(preview.signal.aborted, true, 'unknown preview outcome must abort the original request immediately')
  await ui.dismissSetup()
  assert.ok(calls.some(c=>c.action==='cancel-tts'&&c.id==='source-A'),'unknown accepted playback was not cancelled through its original source')
  ui.dispose()
})

test('successful explicit cancellation aborts original request before sending captured-source stop',async()=>{
  let release
  const pending=new Promise(resolve=>{release=resolve}),calls=[]
  const ui=createController(async(id,line,_files,signal)=>{
    const {action}=request(line);calls.push({id,action,signal})
    if(action==='preview-tts')return pending
    assert.equal(calls[0].signal.aborted,true)
    return reply(action,{status:'cancelled'})
  })
  ui.setSession('source-A')
  const running=ui.run('source-A','preview-tts')
  ui.setSession('source-B');await ui.cancelPreview()
  release(reply('preview-tts',{provider:'edge',textOnly:true,reason:'TTS_EDGE_FAILED',fallback:false,playbackCompleted:false,acousticConfirmation:false}))
  await running
  assert.equal(calls.find(c=>c.action==='cancel-tts').id,'source-A')
  assert.equal(ui.getSnapshot().ttsPreview.status,'cancelled')
  ui.dispose()
})


test('repeated dismissal cannot forget an unconfirmed cancellation handle',async()=>{
  let release
  const pending=new Promise(resolve=>{release=resolve}),calls=[]
  const ui=createController(async(id,line,_files,signal)=>{
    const {action}=request(line);calls.push({id,action,signal})
    if(action==='preview-tts')return pending
    return reply(action,{status:'unconfirmed'})
  })
  ui.openSetup();ui.setSession('source-A')
  const running=ui.run('source-A','preview-tts')
  assert.equal(await ui.dismissSetup(),false)
  release(reply('preview-tts',{provider:'edge',fallback:false,playbackCompleted:true,acousticConfirmation:false}))
  await running
  assert.equal(await ui.dismissSetup(),false,'a second close must not hide an unconfirmed still-running output')
  assert.equal(ui.getSnapshot().setupOpen,true)
  assert.ok(calls.filter(c=>c.action==='cancel-tts').length>=2,'the retained handle must still target backend cancellation')
  ui.dispose()
})
