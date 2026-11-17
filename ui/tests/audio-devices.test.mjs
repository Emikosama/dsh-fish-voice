/** Real production React controls and controller; synthetic transport, no hardware. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
import { renderAvailable, renderControls } from '../../tests/helpers/render-controls.mjs'
const mic={backend:'winmm',id:'mic-a',name:'USB 麦克风'},speaker={backend:'winmm',id:'out-a',name:'USB 耳机'}
const stopped={enabled:false,ownerSessionId:null,helper:{online:false},voiceControlBusy:false,listenMode:'ptt',voiceSession:{id:null,fullyStopped:true}}
const inventory={schema:1,input:{status:'available',items:[mic],reason:null},output:{status:'available',items:[speaker],reason:null}}
const initial={revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{visibility:'hidden',performanceMode:'balanced'},audioDevices:{input:null,output:null}}
function fixture(){
 let saved=structuredClone(initial),status=stopped,listing=structuredClone(inventory),revision=1
 const calls=[]
 const create=()=>createController(async (_id,q)=>{
  calls.push(q)
  if(q.action==='read-settings')return structuredClone(saved)
  if(q.action==='read-audio-devices')return structuredClone(listing)
  if(q.action==='status')return structuredClone(status)
  if(q.action==='inspect-performance')return {modes:[]}
  if(q.action==='save-audio-device'){
   assert.equal(q.revision,saved.revision)
   saved={...saved,revision:`r${++revision}`,audioDevices:{...saved.audioDevices,[q.direction]:q.selection},values:{...saved.values,...(q.direction==='input'?{device:q.selection}:{})}}
   return structuredClone(saved)
  }
  throw Error(`Unexpected operation: ${q.action}`)
 })
 return{create,calls,saved:()=>saved,setStatus:value=>status=value,setInventory:value=>listing=value}
}
async function mount(t,f){
 const controller=f.create();controller.setSession('A');await controller.run('A','read-settings');await controller.run('A','status')
 const ui=await renderControls(t,{controller,owner:{id:'A'}});t.after(()=>controller.dispose())
 const input=()=>ui.container.querySelector('select[aria-label="音频输入"]'),output=()=>ui.container.querySelector('select[aria-label="音频输出"]')
 const select=async(node,value)=>ui.act(async()=>{Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype,'value').set.call(node,value);node.dispatchEvent(new window.Event('change',{bubbles:true}))})
 return{ui,controller,input,output,select}
}
test('home defaults are read-only; explicit choices save once and persist across remount',{skip:!renderAvailable},async t=>{
 const f=fixture();let v=await mount(t,f)
 assert.equal(v.input().value,'');assert.equal(v.output().value,'')
 assert.ok(f.calls.every(q=>['read-settings','read-audio-devices','status','inspect-performance'].includes(q.action)))
 await v.select(v.input(),'winmm:mic-a');await v.select(v.output(),'winmm:out-a')
 assert.deepEqual(f.saved().audioDevices,{input:mic,output:speaker})
 assert.equal(f.calls.filter(q=>q.action==='save-audio-device').length,2)
 assert.equal(f.calls.some(q=>['enable','start','always-on'].includes(q.action)),false)
 await v.ui.close();v.controller.dispose()
 v=await mount(t,f)
 assert.equal(v.input().value,'winmm:mic-a');assert.equal(v.output().value,'winmm:out-a')
 await v.select(v.output(),'');assert.equal(f.saved().audioDevices.output,null)
 assert.equal(f.saved().audioDevices.input.id,'mic-a')
})
test('unplug preserves selected identity, warns without a fallback, and recovers on later inventory',{skip:!renderAvailable},async t=>{
 const f=fixture(),v=await mount(t,f)
 await v.select(v.output(),'winmm:out-a')
 const saves=()=>f.calls.filter(q=>q.action==='save-audio-device').length
 const before=saves()
 f.setInventory({...inventory,output:{status:'empty',items:[],reason:null}})
 await v.ui.act(async()=>v.controller.run('A','read-audio-devices'))
 assert.equal(v.output().value,'winmm:out-a');assert.equal(v.output().getAttribute('data-device-missing'),'true')
 assert.match(v.output().selectedOptions[0].textContent,/未连接/)
 assert.match(v.ui.container.textContent,/不会切到/)
 assert.equal(saves(),before);assert.deepEqual(f.saved().audioDevices.output,speaker)
 f.setInventory({...inventory,output:{status:'unavailable',items:[],reason:'OUTPUT_ENUMERATION_FAILED'}})
 await v.ui.act(async()=>v.controller.run('A','read-audio-devices'))
 assert.equal(v.output().getAttribute('data-device-missing'),null,'an unavailable probe is not a confirmed disconnect')
 f.setInventory(inventory);await v.ui.act(async()=>v.controller.run('A','read-audio-devices'))
 assert.equal(v.output().value,'winmm:out-a');assert.equal(v.output().getAttribute('data-device-missing'),null)
 assert.equal(saves(),before)
})
test('live or unconfirmed input is disabled while output remains separately selectable',{skip:!renderAvailable},async t=>{
 const f=fixture(),v=await mount(t,f)
 for(const status of [{...stopped,enabled:true,ownerSessionId:'A',helper:{online:true},voiceSession:{id:'voice',fullyStopped:false}},{...stopped,voiceControlBusy:true},{...stopped,voiceSession:{id:null,fullyStopped:false}}]){
  f.setStatus(status);await v.ui.act(async()=>v.controller.run('A','status'))
  assert.equal(v.input().disabled,true);assert.equal(v.output().disabled,false)
 }
 f.setStatus(stopped);await v.ui.act(async()=>v.controller.run('A','status'));assert.equal(v.input().disabled,false)
 f.setInventory({...inventory,output:{status:'unavailable',items:[],reason:'AUDIO_PLATFORM_UNSUPPORTED'}})
 await v.ui.act(async()=>v.controller.run('A','read-audio-devices'));assert.equal(v.output().disabled,true)
})

test('a cancelled or old-session inventory never overwrites the current selector state',async()=>{
 let resolveOld,signal
 const c=createController(async(id,q,s)=>{
  assert.equal(q.action,'read-audio-devices')
  if(id==='A'){signal=s;return new Promise(resolve=>resolveOld=resolve)}
  return inventory
 })
 c.setSession('A');const pending=c.run('A','read-audio-devices')
 c.setSession('B');assert.equal(signal.aborted,true);assert.equal(await pending,false)
 assert.equal(c.getSnapshot().audioDevicesPending,false)
 assert.equal(await c.run('B','read-audio-devices'),true)
 resolveOld({...inventory,input:{status:'empty',items:[],reason:null}});await new Promise(resolve=>setTimeout(resolve,0))
 assert.equal(c.getSnapshot().audioDevicesFor,'B');assert.deepEqual(c.getSnapshot().audioDevices,inventory)
 c.dispose()
})
