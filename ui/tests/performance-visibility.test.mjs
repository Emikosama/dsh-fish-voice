import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
import { renderAvailable, renderControls } from '../../tests/helpers/render-controls.mjs'
const stopped={enabled:false,ownerSessionId:null,helper:{online:false},voiceControlBusy:false,listenMode:'ptt',voiceSession:{id:null,fullyStopped:true}}
const settings={revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{visibility:'hidden',performanceMode:'balanced'},modelSetup:{asr:'sensevoice',models:{sensevoiceDir:'',campplus:''}}}
const performance={modes:[{performanceMode:'fast',available:false,reason:'host_contract_blocked'},{performanceMode:'balanced',available:true},{performanceMode:'high',available:true}]}

test('quick and settings speed options exist only after a confirmed stop and retain accessible capability gates',{skip:!renderAvailable},async t=>{
 let status=stopped
 const calls=[]
 const controller=createController(async(_id,q)=>{calls.push(q.action);return q.action==='read-settings'?settings:q.action==='inspect-performance'?performance:status})
 controller.setSession('A');await controller.run('A','read-settings');await controller.run('A','status');await controller.run('A','inspect-performance')
 const rendered=await renderControls(t,{controller,owner:{id:'A'}})
 const section=()=>rendered.container.querySelector('section[aria-label="回答速度"]')
 assert.ok(section());const buttons=[...section().querySelectorAll('button')]
 assert.equal(buttons.length,3);assert.equal(buttons[0].disabled,true);assert.equal(buttons[1].getAttribute('aria-pressed'),'true');assert.equal(buttons[2].disabled,false);assert.match(section().textContent,/无法确认关闭思考/)
 for(const value of [
  {...stopped,enabled:true,ownerSessionId:'A',helper:{online:true},voiceSession:{id:'voice',fullyStopped:false}},
  {...stopped,voiceControlBusy:true},
  {...stopped,voiceSession:{id:null,fullyStopped:false}},
  {...stopped,ownerSessionId:'A'},
 ]){status=value;await rendered.act(async()=>controller.run('A','status'));assert.equal(section(),null,'unavailable presets are absent from DOM and keyboard order')}
 status=stopped;await rendered.act(async()=>controller.run('A','status'));assert.ok(section())
 await rendered.act(async()=>controller.openSettings('interaction'))
 assert.ok(rendered.container.querySelector('[data-whale-performance]'))
 status={...stopped,enabled:true,ownerSessionId:'A',helper:{online:true},voiceSession:{id:'voice',fullyStopped:false}}
 await rendered.act(async()=>controller.run('A','status'))
 assert.equal(rendered.container.querySelector('[data-whale-performance]'),null)
 assert.equal(rendered.button('停止语音以编辑'),undefined,'interaction bindings no longer require stopping voice')
 status=stopped;await rendered.act(async()=>controller.run('A','status'))
 assert.ok(rendered.container.querySelector('[data-whale-performance]'))
 assert.equal(rendered.container.querySelector('button[aria-label="刷新状态"]'),null)
 assert.ok(calls.every(action=>['read-settings','status','inspect-performance','read-audio-devices'].includes(action)))
 await rendered.close();controller.dispose()
})

test('home offers one click back to following the model when the saved fast mode is blocked',{skip:!renderAvailable},async t=>{
 let saved={...settings,voiceSession:{...settings.voiceSession,performanceMode:'fast'}}
 const writes=[]
 const controller=createController(async(_id,q)=>{
  if(q.action==='inspect-performance')return performance
  if(q.action==='set-performance-mode'){
   writes.push(q)
   saved={...saved,revision:'r2',voiceSession:{...saved.voiceSession,performanceMode:q.performanceMode}}
  }
  return ['read-settings','set-performance-mode'].includes(q.action)?saved:stopped
 })
 controller.setSession('A');await controller.run('A','read-settings');await controller.run('A','status');await controller.run('A','inspect-performance')
 const rendered=await renderControls(t,{controller,owner:{id:'A'}})
 assert.equal(rendered.button('快 无思考').disabled,true)
 await rendered.act(async()=>rendered.button('跟随模型').click())
 assert.equal(writes.length,1)
 assert.equal(writes[0].revision,'r1')
 assert.equal(writes[0].performanceMode,'compatibility')
 assert.equal(controller.getSnapshot().settings.voiceSession.performanceMode,'compatibility')
 await rendered.close();controller.dispose()
})

test('saving audio keeps another section draft mounted and uses the newest CAS revision',{skip:!renderAvailable},async t=>{
 let saved=settings
 const writes=[]
 const controller=createController(async(_id,q)=>{
  if(q.action==='save-settings'){writes.push(q);saved={...saved,revision:'r2',values:{...saved.values,...q.values}};return saved}
  if(q.action==='pick-local-path')return{path:'/draft/model'}
  if(q.action==='save-models'){writes.push(q);saved={...saved,revision:'r3',modelSetup:q.values};return saved}
  if(q.action==='read-settings')return saved
  if(q.action==='inspect-performance')return performance
  if(q.action==='read-output-volume')return{supported:false}
  if(q.action==='model-installer')return{schema:1,models:[],jobs:[],hardware:{},compute:{observedAt:1}}
  if(q.action==='inspect-tts')return{platform:'linux',playbackSupported:false,filePlaybackSupported:false,deepseekKeyAvailable:false,autoDownload:false,gpuSupported:false}
  return stopped
 })
 controller.setSession('A');await controller.run('A','read-settings');await controller.run('A','status');await controller.openSettings('audio')
 const view=await renderControls(t,{controller,owner:{id:'A'}})
 const click=async text=>{const button=view.button(text);assert.ok(button,text);await view.act(async()=>button.click())}
 const input=async(node,value)=>{assert.ok(node);await view.act(async()=>{Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set.call(node,value);node.dispatchEvent(new window.Event('input',{bubbles:true}))})}
 await input(view.container.querySelector('input[aria-label="唤醒称呼"]'),'小海鲸')
 await click('模型');await click('高级路径')
 const path=view.container.querySelector('input[aria-label="SenseVoice 本地目录"]')
 assert.equal(path.readOnly,true)
 await view.act(async()=>view.container.querySelector('[data-native-path=sensevoiceDir] button').click())
 await click('音频');await click('保存设置')
 assert.equal(controller.getSnapshot().settings.revision,'r2')
 await click('模型');await click('高级路径')
 assert.equal(view.container.querySelector('input[aria-label="SenseVoice 本地目录"]'),path,'other editor was not remounted')
 assert.equal(path.value,'model');assert.equal(path.title,'/draft/model')
 await click('保存模型路径');assert.equal(writes.at(-1).revision,'r2');assert.equal(writes.at(-1).values.models.sensevoiceDir,'/draft/model')
 saved={...saved,revision:'r4',modelSetup:{...saved.modelSetup,models:{...saved.modelSetup.models,sensevoiceDir:'/external/model'}}}
 await view.act(async()=>controller.run('A','read-settings'))
 assert.equal(controller.getSnapshot().settingsConflict,false,'both saved sections are clean')
 assert.equal(view.container.querySelector('input[aria-label="SenseVoice 本地目录"]').title,'/external/model')
 await view.close();controller.dispose()
})

test('a saved single-section draft does not block the next external configuration update',{skip:!renderAvailable},async t=>{
 let current=settings
 const controller=createController(async(_id,q)=>{
  if(q.action==='save-settings'){current={...current,revision:'r2',values:{...current.values,...q.values}};return current}
  if(q.action==='read-settings')return current
  if(q.action==='read-output-volume')return{supported:false}
  if(q.action==='inspect-performance')return performance
  return stopped
 })
 controller.setSession('A');await controller.run('A','read-settings');await controller.run('A','status');await controller.openSettings('audio')
 const view=await renderControls(t,{controller,owner:{id:'A'}})
 const wake=()=>view.container.querySelector('input[aria-label="唤醒称呼"]')
 await view.act(async()=>{
  Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set.call(wake(),'小海鲸')
  wake().dispatchEvent(new window.Event('input',{bubbles:true}))
 })
 await view.act(async()=>view.button('保存设置').click())
 assert.equal(controller.getSnapshot().settings.revision,'r2')
 current={...current,revision:'r3',values:{...current.values,wakeWordAliases:['新称呼']}}
 await view.act(async()=>controller.run('A','read-settings'))
 assert.equal(controller.getSnapshot().settingsConflict,false)
 assert.equal(wake().value,'新称呼')
 assert.equal(view.button('放弃草稿并使用最新设置'),undefined)
 await view.close();controller.dispose()
})
