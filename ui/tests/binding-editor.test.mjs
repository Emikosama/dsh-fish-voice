import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
import { renderAvailable, renderControls } from '../../tests/helpers/render-controls.mjs'
const status={enabled:true,ownerSessionId:'A',helper:{online:true},voiceControlBusy:false,listenMode:'ptt',voiceSession:{id:'root',fullyStopped:false}}
const initial={revision:'r1',bindingContext:{ownerSessionId:'A',epoch:'e1',rootSessionId:'root'},values:{device:null,pttMouse:2,pttKeyboard:{code:'F8',modifiers:[]},speakerVerification:{enabled:false}},voiceSession:{visibility:'hidden',performanceMode:'balanced'},capabilities:{pttKeyboard:{supported:true,scope:'global',platform:'win32',status:'available',reason:null}},modelSetup:{asr:'sensevoice',models:{sensevoiceDir:'',whisper:'',campplus:''}}}
async function fixture(t,capture){let settings=initial;const calls=[];const controller=createController(async(_id,q)=>{calls.push(q);if(q.action==='capture-bindings'&&capture)return capture(q);if(q.action==='capture-bindings')return{token:'capture-1',paused:q.operation==='begin'};if(q.action==='save-bindings'){settings={...settings,revision:'r2',values:{...settings.values,...q.values}};return settings}if(q.action==='read-settings')return settings;if(q.action==='inspect-performance')return{modes:[]};return status});controller.setSession('A');await controller.run('A','read-settings');await controller.run('A','status');await controller.openSettings('interaction');const view=await renderControls(t,{controller,owner:{id:'A'}});t.after(()=>controller.dispose());return{controller,view,calls}}
test('live microphone capture pauses native PTT, resumes on key release, and applies separately',{skip:!renderAvailable},async t=>{
 const{view,calls}=await fixture(t)
 await view.act(async()=>view.button('录入按键').click())
 assert.equal(calls.filter(q=>q.action==='capture-bindings')[0].operation,'begin')
 await view.act(async()=>{window.dispatchEvent(new window.KeyboardEvent('keydown',{code:'F9',key:'F9',bubbles:true}));window.dispatchEvent(new window.KeyboardEvent('keyup',{code:'F9',key:'F9',bubbles:true}))})
 assert.equal(calls.filter(q=>q.action==='capture-bindings').at(-1).operation,'end')
 assert.equal(calls.some(q=>q.action==='save-bindings'),false)
 await view.act(async()=>view.button('应用按键').click())
 const saves=calls.filter(q=>q.action==='save-bindings');assert.equal(saves.length,1)
 assert.deepEqual(JSON.parse(JSON.stringify(saves[0].values)),{pttMouse:2,pttKeyboard:{code:'F9',modifiers:[]}})
 assert.equal(calls.some(q=>['disable','enable','save-settings'].includes(q.action)),false)
})
test('capture blur restores old native binding without applying a draft',{skip:!renderAvailable},async t=>{
 const{view,calls}=await fixture(t);await view.act(async()=>view.button('录入按键').click());await view.act(async()=>window.dispatchEvent(new window.Event('blur')))
 assert.equal(calls.filter(q=>q.action==='capture-bindings').at(-1).operation,'end');assert.equal(view.button('应用按键').disabled,true)
})
test('cancelling a mouse draft performs no helper action and restores the saved selection',{skip:!renderAvailable},async t=>{const{view,calls}=await fixture(t);const radio=view.container.querySelector('input[name="whale-ear-mouse"][value="1"]');assert.equal(radio.disabled,false);await view.act(async()=>radio.click());assert.equal(view.button('应用按键').disabled,false);await view.act(async()=>view.button('取消修改').click());assert.equal(view.container.querySelector('input[name="whale-ear-mouse"][value="2"]').checked,true);assert.equal(view.button('应用按键').disabled,true);assert.equal(calls.some(q=>['save-bindings','disable'].includes(q.action)),false)})

test('Escape abandons capture and unmount restores the native lease',{skip:!renderAvailable},async t=>{
 const{view,calls}=await fixture(t);await view.act(async()=>view.button('录入按键').click());await view.act(async()=>window.dispatchEvent(new window.KeyboardEvent('keyup',{code:'Escape',key:'Escape'})))
 assert.equal(view.button('应用按键').disabled,true);await view.act(async()=>view.button('录入按键').click());await view.close();assert.equal(calls.filter(q=>q.action==='capture-bindings'&&q.operation==='end').length,2)
})
test('capture is unavailable until native pause confirms; closing during begin restores late receipt',{skip:!renderAvailable},async t=>{
 let resolve;const response=new Promise(r=>resolve=r);const{view,calls}=await fixture(t,q=>q.operation==='begin'?response:{token:'late',paused:false})
 await view.act(async()=>view.button('录入按键').click());assert.equal(view.container.textContent.includes('按住说话已暂停'),false)
 await view.close();resolve({token:'late',paused:true});await new Promise(r=>setImmediate(r));assert.equal(calls.filter(q=>q.action==='capture-bindings').at(-1).operation,'end')
})
