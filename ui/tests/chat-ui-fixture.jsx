// Production view/geometry; host transport and visual primitives are fixtures.
import React, { useSyncExternalStore } from 'react'
import { createRoot } from 'react-dom/client'
import { Controls, FloatingFrame } from '../src/views.jsx'
import { createFloatingGeometry } from '../src/geometry.mjs'
import { createPanelSizing } from '../src/panel-sizing.mjs'
import { createUiPreferences } from '../src/ui-preferences.mjs'
import { zh } from '../src/locales.mjs'
import css from '../src/panel.module.css'
import setup from '../src/setup.module.css'
import motion from '../src/motion.module.css'
const tag=document.createElement('style');tag.textContent=css.text+setup.text+motion.text;document.head.append(tag)
const rows=[]
for(let i=0;i<25;i++)rows.push({id:`u${i}`,role:'user',text:`第 ${i+1} 轮：我上翻的时候，请留在当前位置。`,state:'delivered',at:i*2},{id:`a${i}`,role:'assistant',text:`第 ${i+1} 轮：明白。新消息不会打断查看，点击提示可以回到底部。`,state:'reply',at:i*2+1})
const listeners=new Set()
let state={busy:false,uncertain:false,checkedFor:'A',settingsFor:'A',status:{enabled:false,ownerSessionId:null,voiceControlBusy:false,listenMode:'ptt',voiceSession:{id:null,fullyStopped:true},helper:{online:false},capabilities:{listenMode:true}},settings:{revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{performanceMode:'balanced'}},conversationFor:'A',conversation:null,performanceFor:'A',performance:{modes:['fast','balanced','high'].map(performanceMode=>({performanceMode,available:true}))},audioDevicesFor:'A',audioDevices:{input:[],output:[]}}
const publish=patch=>{state={...state,...patch};listeners.forEach(fn=>fn())}
const preferences=createUiPreferences(window),geometry=createFloatingGeometry(),sizing=createPanelSizing(window,{onResize:geometry.fit})
const useWhaleUi=select=>select(useSyncExternalStore(fn=>{listeners.add(fn);return()=>listeners.delete(fn)},()=>state))
const useWhalePreferences=select=>select(useSyncExternalStore(preferences.subscribe,preferences.getSnapshot))
const conversation=()=>({revision:rows.length,rootSessionId:'voice-A',historyGeneration:1,title:null,latest:rows.filter(x=>x.role==='assistant').at(-1),items:rows.slice(-40),inputActive:false,inputError:null,playbackConfirmed:false,helper:{online:true,listenMode:'ptt'}})
const enable=()=>publish({status:{...state.status,enabled:true,ownerSessionId:'A',voiceSession:{id:'voice-A',fullyStopped:false},helper:{online:true}},conversation:conversation()})
const run=async(id,action,request)=>{
 if(action==='enable')enable()
 if(action==='disable')publish({status:{...state.status,enabled:false,ownerSessionId:null,voiceSession:{id:null,fullyStopped:true},helper:{online:false}},conversation:null})
 if(action==='new')publish({lastNewRequest:request,newChatFor:id,conversationHistory:null})
 if(action==='read-history')publish({conversationHistoryFor:'A',conversationHistory:{rootSessionId:'voice-A',generation:1,items:[...rows],scope:'voice-session',nextCursor:null,truncated:false}})
 if(action==='set-performance-mode')publish({settings:{...state.settings,voiceSession:{performanceMode:request.performanceMode}}})
 return true
}
const props={useWhaleUi,useWhalePreferences,geometry,sizing,sessionId:'A',t:key=>zh[key]??key,run,readState:()=>state,setAssistantName:preferences.setAssistantName,openSettings(){},refresh(){}}
function App(){return <FloatingFrame {...props} renderSlot={(_,controls)=><Controls {...props} {...controls}/>}/>}
window.chatFixture={enable,append(){const i=rows.length;rows.push({id:`u${i}`,role:'user',text:'新收到的一条消息',state:'delivered',at:i},{id:`a${i}`,role:'assistant',text:'这是局部更新，不会让面板重建。',state:'reply',at:i+1});publish({conversation:conversation()})},input(active){publish({conversation:{...state.conversation,inputActive:active}})},update:publish,getState:()=>state}
createRoot(document.getElementById('root')).render(<App/>);
