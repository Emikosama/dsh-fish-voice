import test from 'node:test'
import assert from 'node:assert/strict'
import {createController} from '../src/controller.mjs'
import {decodeReply} from '../src/protocol.mjs'
import {dispatchUiAction} from '../host.mjs'
const row=(id,at=1)=>({id,role:'user',text:id,state:'delivered',at})
const page=(items=[],extra={})=>({rootSessionId:'root',generation:1,revision:1,scope:'current-voice-session',items,nextCursor:null,truncated:false,...extra})
test('history dispatch is owner UI only and validates page data',async()=>{
  assert.throws(()=>decodeReply('read-history',page(Array.from({length:101},(_,i)=>row(String(i))))))
  assert.throws(()=>decodeReply('read-history',page([row('same'),row('same')])) )
  await assert.rejects(dispatchUiAction({}, {}, {action:'read-history'},null,false),/用户界面/)
  const result=await dispatchUiAction({readConversationHistory:()=>page()}, {}, {action:'read-history'},null,true)
  assert.equal(result.action,'read-history')
})
test('history loading is independent and stale selected-session responses are discarded',async()=>{
  let release
  const controller=createController(async()=>new Promise(resolve=>{release=resolve}))
  controller.setSession('owner')
  const pending=controller.run('owner','read-history')
  assert.equal(controller.getSnapshot().busy,false)
  assert.equal(controller.getSnapshot().conversationHistoryLoading,true)
  controller.setSession('other')
  release(page([row('private')]))
  assert.equal(await pending,false)
  assert.equal(controller.getSnapshot().conversationHistory,null)
  controller.dispose()
})
test('history pages prepend and preserve newer records',async()=>{
  let next=page([row('new',2)],{nextCursor:'1:2'})
  const controller=createController(async()=>next)
  controller.setSession('owner')
  assert.equal(await controller.run('owner','read-history'),true)
  next=page([row('old',1)])
  assert.equal(await controller.run('owner','read-history',{cursor:'1:2'}),true)
  assert.deepEqual(controller.getSnapshot().conversationHistory.items.map(x=>x.id),['old','new'])
  controller.dispose()
})
test('all-record history retains new rows after the forty-row live window advances',async()=>{
 let send
 const controller=createController(async()=>page(Array.from({length:50},(_,i)=>row('r'+i,i)),{scope:'voice-session'}))
 controller.setSession('owner');controller.attachConversationClient({subscribe(_id,listener){send=listener;return()=>{}}})
 const stream=items=>({revision:1,historyGeneration:1,rootSessionId:'root',title:null,latest:null,items,inputActive:false,playbackConfirmed:false})
 send(stream(Array.from({length:40},(_,i)=>row('r'+(i+10),i+10))))
 await controller.run('owner','read-history')
 for(let i=50;i<92;i++)send(stream(Array.from({length:40},(_,j)=>row('r'+(i-39+j),i-39+j))))
 assert.equal(controller.getSnapshot().conversationHistory.items.length,92)
 assert.equal(controller.getSnapshot().conversationHistory.items[50].id,'r50')
 controller.dispose()
})
test('failed earlier page retains its cursor and retry preserves already loaded records',async()=>{
 let failure=true
 const controller=createController(async(_id,{cursor})=>{if(cursor==='1:2'&&failure)throw Error('temporary');return cursor?page([row('older',0)]):page([row('new',2)],{nextCursor:'1:2'})})
 controller.setSession('owner');await controller.run('owner','read-history')
 assert.equal(await controller.run('owner','read-history',{cursor:'1:2'}),false)
 assert.equal(controller.getSnapshot().conversationHistoryRequestCursor,'1:2');failure=false
 await controller.run('owner','read-history',{cursor:controller.getSnapshot().conversationHistoryRequestCursor})
 assert.deepEqual(controller.getSnapshot().conversationHistory.items.map(row=>row.id),['older','new']);controller.dispose()
})
test('an earlier-page merge never hides a previous limited-window notice',async()=>{
 let next=page([row('new',2)],{truncated:true,nextCursor:'1:2'})
 const controller=createController(async()=>next);controller.setSession('owner');await controller.run('owner','read-history')
 next=page([]);await controller.run('owner','read-history',{cursor:'1:2'});assert.equal(controller.getSnapshot().conversationHistory.truncated,true)
 await controller.run('owner','read-history');assert.equal(controller.getSnapshot().conversationHistory.truncated,false);controller.dispose()
})
