import test from 'node:test'
import assert from 'node:assert/strict'
import { createUiPreferences, currentVoiceTitle, mayStartDrag, capturedBinding } from '../src/ui-preferences.mjs'
import { createController } from './action-harness.mjs'
import { decodeReply } from '../src/protocol.mjs'
const reply = (action,value) => ({ok:true,value:{result:{kind:'success',text:JSON.stringify({protocol:1,action,value})}}})
const status = {enabled:true,ownerSessionId:'A',helper:{online:true},voiceSession:{id:'voice-A'}}
const chat = (id='voice-A') => ({revision:1,rootSessionId:id,title:null,latest:null,items:[],inputActive:false,playbackConfirmed:false})
test('motion defaults to spring, persists immediately, syncs other windows and removes listener',()=>{
 const values=new Map(), events=new Set(), win={localStorage:{getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)},addEventListener:(k,v)=>events.add(v),removeEventListener:(k,v)=>events.delete(v)}
 const pref=createUiPreferences(win);assert.equal(pref.getSnapshot().motion,'spring')
 assert.equal(pref.setMotion('firm'),true);const other=createUiPreferences(win);assert.equal(other.getSnapshot().motion,'firm')
 const key=[...values.keys()][0];values.set(key,'off');for(const fn of events)fn({key});assert.equal(pref.getSnapshot().motion,'off');assert.equal(other.getSnapshot().motion,'off');assert.equal(pref.setMotion('invalid'),false)
 pref.dispose();other.dispose();assert.equal(events.size,0)
})
test('storage denial does not delay preview and is not falsely reported saved',()=>{
 const pref=createUiPreferences({localStorage:{getItem(){throw Error()},setItem(){throw Error()}},addEventListener(){},removeEventListener(){}})
 assert.equal(pref.setMotion('off'),false);assert.equal(pref.getSnapshot().motion,'off');assert.equal(pref.getSnapshot().error,'storage-unavailable')
})
test('capsule title uses exact root and source, never another foreground session or first history item',()=>{
 const state={checkedFor:'A',status,catalogFor:'A',catalog:{activeId:'voice-A',items:[{id:'wrong',title:'Private wrong title'},{id:'voice-A',title:'Correct title'}]}}
 assert.equal(currentVoiceTitle(state,'A'),'Correct title');assert.equal(currentVoiceTitle(state,'B'),'语音会话')
 assert.notEqual(currentVoiceTitle({...state,catalog:{...state.catalog,activeId:'wrong'}},'A'),'Private wrong title')
 assert.equal(currentVoiceTitle({...state,uncertain:true},'A'),'语音会话')
})
test('entire background drags while buttons sliders and editable regions retain interaction',()=>{
 const container={contains:()=>true}
 assert.equal(mayStartDrag({closest:()=>null},container),true)
 assert.equal(mayStartDrag({closest:()=>({hasAttribute:()=>false})},container),false)
 assert.equal(mayStartDrag({closest:()=>({hasAttribute:()=>true})},container),true)
 assert.equal(mayStartDrag(null,container),false)
})
test('conversation stream clears synchronously on source switch and rejects late old-source frames',()=>{
 const sinks=[], ui=createController(async(_,line)=>reply('status',status))
 ui.attachConversationClient({subscribe(id,send){sinks.push([id,send]);return()=>send(chat())}})
 ui.setSession('A');sinks.at(-1)[1](chat());assert.equal(ui.getSnapshot().conversationFor,'A')
 const old=sinks.at(-1)[1];ui.setSession('B');assert.equal(ui.getSnapshot().conversation,null)
 old(chat());assert.equal(ui.getSnapshot().conversation,null)
 sinks.at(-1)[1](chat('voice-B'));assert.equal(ui.getSnapshot().conversationFor,'B');ui.dispose();sinks.at(-1)[1](chat());assert.equal(ui.getSnapshot().conversationFor,'B')
})
test('conversation projection validates bounds and requires latest reply to belong to its exact items',()=>{
 assert.doesNotThrow(()=>decodeReply('conversation',chat()))
 assert.throws(()=>decodeReply('conversation',{...chat(),latest:{id:'external',role:'assistant',text:'borrowed'}}))
 assert.throws(()=>decodeReply('conversation',{...chat(),items:Array(41).fill({id:'a',role:'user',text:'x'})}))
 assert.throws(()=>decodeReply('conversation',{...chat(),playbackConfirmed:true}))
})
test('output volume never falls back to a human command and uncertain writes require readback',async()=>{
 let reads=0,writes=0,commands=0
 const ui=createController(async()=>{commands++;throw Error('not allowed')})
 ui.attachConversationClient({subscribe(){return()=>{}},readVolume:async()=>{reads++;return{supported:true,volume:.4,revision:1}},setVolume:async()=>{writes++;throw Error('lost reply')}})
 assert.equal(await ui.run('A','read-output-volume'),true);assert.equal(await ui.run('A','set-output-volume',{revision:1,volume:.2}),false)
 assert.equal(await ui.run('A','set-output-volume',{revision:1,volume:.2}),false);assert.equal(writes,1)
 await ui.run('A','read-output-volume');assert.equal(ui.getSnapshot().outputVolumeUncertain,false);assert.equal(reads,2);assert.equal(commands,0)
})
test('unknown performance save cannot automatically close/reopen voice or retry',async()=>{
 const calls=[],ui=createController(async(id,line)=>{const q=JSON.parse(line.slice('/whale-ear-ui '.length));calls.push(q.action);if(q.action==='set-performance-mode')throw Error('lost reply');return reply(q.action,q.action==='read-settings'?{revision:'r',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{visibility:'hidden'}}:{...status,enabled:false,ownerSessionId:null})})
 await ui.run('A','set-performance-mode',{revision:'r',performanceMode:'high'});assert.equal(await ui.run('A','enable'),false)
 assert.deepEqual(calls,['set-performance-mode']);await ui.run('A','read-settings');await ui.run('A','status');assert.equal(ui.getSnapshot().uncertain,false)
})
test('keyboard protocol rejects malformed capability, arbitrary keys and unsafe shortcuts',()=>{
 const base={revision:'1',values:{device:null,pttMouse:0,speakerVerification:{enabled:false}}}
 for(const pttKeyboard of [{code:'Escape',modifiers:[]},{code:'F4',modifiers:['Alt']},{code:'Space',modifiers:['Control','Control']},{code:'Space',modifiers:[],execute:'x'}]) assert.throws(()=>decodeReply('read-settings',{...base,values:{...base.values,pttKeyboard}}))
 assert.doesNotThrow(()=>decodeReply('read-settings',{...base,values:{...base.values,pttKeyboard:{code:'F8',modifiers:['Control']}}}))
 assert.throws(()=>decodeReply('read-settings',{...base,capabilities:{pttKeyboard:{supported:true,scope:'global',platform:'win32',status:'unsupported'}}}))
})
test('explicit status and foreground changes never fetch history automatically',async()=>{
 const calls=[],ui=createController(async(id,line)=>{const q=JSON.parse(line.slice('/whale-ear-ui '.length));calls.push(q.action);return reply(q.action,status)})
 ui.setSession('A');assert.deepEqual(calls,[]);await ui.run('A','status');assert.deepEqual(calls,['status']);ui.setSession('B');assert.deepEqual(calls,['status']);ui.dispose()
})

test('shortcut capture uses the physical code during IME composition and across layouts',()=>{
 assert.deepEqual(capturedBinding({code:'KeyQ',key:'Process',keyCode:229,isComposing:true,ctrlKey:true}),{code:'KeyQ',modifiers:['Control']})
 assert.deepEqual(capturedBinding({code:'KeyQ',key:'a'}),{code:'KeyQ',modifiers:[]})
 assert.deepEqual(capturedBinding({code:'KeyA',key:'ф'}),{code:'KeyA',modifiers:[]})
 assert.deepEqual(capturedBinding({code:'Digit1',key:'!',shiftKey:true}),{code:'Digit1',modifiers:['Shift']})
 for(const event of [{code:'Unidentified',key:'q'},{code:'Numpad1',key:'1'},{code:'KeyQ',repeat:true},{code:'KeyQ',metaKey:true},{code:'F4',altKey:true}])assert.equal(capturedBinding(event),null)
})

test('speech-requested and failed captions decode without acoustic confirmation',()=>{
 for(const state of ['speech-requested','speech-failed','interrupted','reply']){
  const item={id:'speech:1',role:'assistant',text:'听到了别急',state,at:1}
  assert.equal(decodeReply('conversation',{...chat(),items:[item],latest:item}).latest.state,state)
 }
})
