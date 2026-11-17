import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
import { recentTurns, compactVoiceState, mergeConversationItems } from '../src/conversation-view.mjs'
import { createUiPreferences } from '../src/ui-preferences.mjs'
import { renderAvailable, renderControls } from '../../tests/helpers/render-controls.mjs'
const rows=()=>Array.from({length:25},(_,i)=>[{id:`u${i}`,role:'user',text:`User ${i}`,state:'delivered',at:i*2},{id:`a${i}`,role:'assistant',text:`Assistant ${i}`,state:'reply',at:i*2+1}]).flat()
test('recent ten counts user-led turns and keeps all assistant chunks',()=>{
 const values=rows();values.push({id:'extra',role:'assistant',text:'extra chunk',at:50})
 const recent=recentTurns(values);assert.equal(recent.filter(r=>r.role==='user').length,10);assert.equal(recent.length,21);assert.equal(recent[0].id,'u15')
 assert.deepEqual(recentTurns(values.slice(0,2)),values.slice(0,2));assert.equal(mergeConversationItems(values,[{...values[0],state:'interrupted'}])[0].state,'interrupted')
})
test('capsule states reflect real input and do not equate enabled with listening',()=>{
 assert.equal(compactVoiceState({enabled:false}),'off');assert.equal(compactVoiceState({enabled:true}),'standby');assert.equal(compactVoiceState({enabled:true,active:true}),'listening');assert.equal(compactVoiceState({enabled:true,pending:true}),'pending');assert.equal(compactVoiceState({enabled:true,unknown:true}),'unknown')
})
test('assistant name preference persists separately, preserves motion and rejects blank/long names',()=>{
 const values=new Map(),win={localStorage:{getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)},addEventListener(){},removeEventListener(){}}
 const ui=createUiPreferences(win);assert.equal(ui.setAssistantName(' 小鲸 '),true);assert.equal(ui.getSnapshot().assistantName,'小鲸');ui.setMotion('off');assert.equal(ui.getSnapshot().assistantName,'小鲸');assert.equal(ui.setAssistantName(' '),false);assert.equal(ui.setAssistantName('x'.repeat(41)),false);assert.equal(createUiPreferences(win).getSnapshot().assistantName,'小鲸');ui.dispose()
})
test('production chat view: ten turns, all records, rename/cancel, IME, stable DOM and manual scroll',{skip:!renderAvailable},async t=>{
 const listeners=new Set(),items=rows();let name=null
 let state={busy:false,checkedFor:'A',settingsFor:'A',uncertain:false,status:{enabled:true,ownerSessionId:'A',listenMode:'ptt',helper:{online:true},capabilities:{listenMode:true},voiceSession:{id:'voice-A'}},settings:{revision:'r1',values:{pttMouse:2}},conversationFor:'A',conversation:{rootSessionId:'voice-A',historyGeneration:1,items:items.slice(-40),latest:items.at(-1),inputActive:false,helper:{online:true,listenMode:'ptt'}},conversationHistoryFor:'A',conversationHistory:{rootSessionId:'voice-A',items,scope:'voice-session',nextCursor:null}}
 const publish=patch=>{state={...state,...patch};listeners.forEach(fn=>fn())},calls=[]
 const controller={subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},getSnapshot:()=>state,run:async(id,action)=>{calls.push(action);return true}}
 const view=await renderControls(t,{controller,owner:{id:'A'},props:{useWhalePreferences:select=>select({motion:'spring',assistantName:name}),setAssistantName(value){name=value;publish({})}}})
 const {container,act}=view,click=async n=>{assert.ok(n);await act(async()=>n.click())}
 await click(container.querySelector('[aria-label="对话"]'));let list=container.querySelector('[data-conversation-messages]');assert.equal(list.querySelectorAll('[data-role=user]').length,10);assert.ok(calls.includes('read-history'))
 const labels=()=>[...list.querySelectorAll('[data-role=assistant] button')]
 await click(labels().at(-1));let input=container.querySelector('input[aria-label="助手称呼"]');assert.equal(document.activeElement,input)
 const require=(await import('node:module')).createRequire((process.env.WHALE_REACT_DEPS||process.env.WHALE_RENDER_DEPS)+'/package.json'),{Simulate}=require('react-dom/test-utils')
 await act(async()=>Simulate.change(input,{target:{value:'小鲸'}}));await act(async()=>Simulate.keyDown(input,{key:'Enter'}));assert.equal(labels().every(n=>n.textContent==='小鲸'),true);assert.equal(container.querySelector('strong').textContent,'鲸应')
 await click(labels().at(-1));input=container.querySelector('input[aria-label="助手称呼"]');await act(async()=>Simulate.change(input,{target:{value:'不保存'}}));await act(async()=>Simulate.compositionStart(input));await act(async()=>Simulate.keyDown(input,{key:'Enter'}));assert.ok(container.querySelector('input[aria-label="助手称呼"]'),'IME Enter does not save');await act(async()=>Simulate.compositionEnd(input));await act(async()=>Simulate.keyDown(input,{key:'Escape'}));assert.equal(labels().every(n=>n.textContent==='小鲸'),true)
 await click(view.button('展开全部'));assert.equal(list.querySelectorAll('[data-message-id]').length,50)
 Object.defineProperties(list,{scrollHeight:{configurable:true,get:()=>2000},clientHeight:{configurable:true,get:()=>250}});list.scrollTop=200
 await act(async()=>Simulate.scroll(list));const firstRow=list.querySelector('[data-message-id]'),beforeRoot=container.firstElementChild
 const newer=[{id:'u26',role:'user',text:'new',state:'delivered',at:51},{id:'a26',role:'assistant',text:'reply',state:'reply',at:52}]
 await act(async()=>publish({conversation:{...state.conversation,items:[...state.conversation.items,...newer],latest:newer[1]}}))
 assert.equal(container.firstElementChild,beforeRoot);assert.equal(list.querySelector('[data-message-id]'),firstRow);assert.equal(list.scrollTop,200);assert.ok(view.button('2 条新消息'))
 await click(view.button('2 条新消息'));assert.equal(list.scrollTop,2000);assert.equal(view.button('2 条新消息'),undefined)
})
test('sparse latest event pages automatically load enough recent turns and explicit collapse returns to ten',{skip:!renderAvailable},async t=>{
 const listeners=new Set(),items=rows(),calls=[]
 let state={busy:false,checkedFor:'A',settingsFor:'A',status:{enabled:false,ownerSessionId:null,listenMode:'ptt',helper:{online:false},capabilities:{listenMode:true},voiceSession:{id:null,fullyStopped:true}},settings:{revision:'r1',values:{pttMouse:2}},conversationHistoryFor:'A',conversationHistory:{rootSessionId:'saved',items:[],scope:'voice-session',nextCursor:'1:100'}}
 const publish=patch=>{state={...state,...patch};listeners.forEach(fn=>fn())}
 const controller={subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},getSnapshot:()=>state,async run(id,action,request){if(action==='read-history'){calls.push(request);if(request?.cursor)publish({conversationHistory:{...state.conversationHistory,items,nextCursor:null}})}return true}}
 const view=await renderControls(t,{controller,owner:{id:'A'}}),{container,act}=view
 await act(async()=>container.querySelector('[aria-label="对话"]').click())
 assert.ok(calls.some(x=>x?.cursor==='1:100'));const list=container.querySelector('[data-conversation-messages]');assert.equal(list.querySelectorAll('[data-role=user]').length,10)
 await act(async()=>view.button('展开全部').click());assert.equal(list.querySelectorAll('[data-role=user]').length,25)
 Object.defineProperties(list,{scrollHeight:{configurable:true,get:()=>2000},clientHeight:{configurable:true,get:()=>250}});list.scrollTop=100
 const require=(await import('node:module')).createRequire((process.env.WHALE_REACT_DEPS||process.env.WHALE_RENDER_DEPS)+'/package.json'),{Simulate}=require('react-dom/test-utils');await act(async()=>Simulate.scroll(list))
 await act(async()=>view.button('收起至 10 轮').click());assert.equal(list.querySelectorAll('[data-role=user]').length,10);assert.equal(list.scrollTop,2000)
})

test('first reply does not request a home layout resize',()=>{
 const source=readFileSync(new URL('../src/views.jsx',import.meta.url),'utf8')
 const layout=source.match(/data-home-layout=\{([^}]+)\}/)[1]
 assert.doesNotMatch(layout,/displayedConversation|latest|items/)
})
