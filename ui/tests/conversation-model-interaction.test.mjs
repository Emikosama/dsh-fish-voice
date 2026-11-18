import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {join} from 'node:path'
import vm from 'node:vm'
import {createController} from '../src/controller.mjs'
const deps=process.env.WHALE_RENDER_DEPS,reactDeps=process.env.WHALE_REACT_DEPS
const status={enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true},helper:{online:false}}
const settings={revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},conversationModel:{mode:'auto',provider:null,model:null}}
const inventory={providers:[{id:'p1',name:'Provider One',models:[{id:'m1',name:'Model One'}]},{id:'p2',name:'Provider Two',models:[{id:'m2',name:'Model Two'}]}]}
test('conversation inventory is session fenced and saving uses normal guarded settings state',async()=>{
 let release; const ui=createController(async(id,{action,...request})=>{if(action==='conversation-models')return new Promise(r=>release=r);if(action==='save-conversation-model')return {...settings,revision:'r2',conversationModel:request.values};return action==='read-settings'?settings:status})
 ui.setSession('A');const read=ui.run('A','conversation-models');ui.setSession('B');release(inventory);assert.equal(await read,false);assert.equal(ui.getSnapshot().conversationModels,null)
 await ui.run('B','read-settings');ui.markSettingsEdited('save-conversation-model');assert.equal(await ui.run('B','save-conversation-model',{revision:'r1',values:{mode:'manual',provider:'p1',model:'m1'}}),true)
 assert.equal(ui.getSnapshot().settings.conversationModel.model,'m1');assert.deepEqual(ui.getSnapshot().settingsDraftActions,[]);ui.dispose()
})
test('conversation defaults require explicit valid selection/save, retain failed draft and support dropdown keyboard cancellation',{skip:!deps||!reactDeps},async t=>{
 const build=createRequire(join(deps,'package.json')),require=createRequire(join(reactDeps,'package.json')),{transformSync}=build('esbuild'),{JSDOM}=build('jsdom')
 const dom=new JSDOM('<div id="root"></div>',{url:'http://localhost'}),keys=['window','document','navigator','IS_REACT_ACT_ENVIRONMENT'],old=Object.fromEntries(keys.map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]))
 for(const [k,v]of Object.entries({window:dom.window,document:dom.window.document,navigator:dom.window.navigator,IS_REACT_ACT_ENVIRONMENT:true}))Object.defineProperty(globalThis,k,{value:v,writable:true,configurable:true})
 const React=require('react'),{createRoot}=require('react-dom/client'),{Simulate,act:oldAct}=require('react-dom/test-utils'),act=React.act??oldAct
 const native=tag=>React.forwardRef(({children,variant,...props},ref)=>React.createElement(tag,{...props,ref},children))
 const setup=readFileSync(new URL('../src/setup.jsx',import.meta.url),'utf8')
 const readiness=setup.slice(setup.indexOf('const voiceRecoveries ='),setup.indexOf('function setupReady(')).replaceAll('export ','')
 const voiceStopped=new Function(readiness+'\nreturn voiceStopped')()
 let source=readFileSync(new URL('../src/views.jsx',import.meta.url),'utf8');source=source.slice(source.indexOf('export function ConversationModelEditor'),source.indexOf('/** Minimal desktop-pet boundary:'))
 const context={module:{exports:{}},require,css:{},Button:native('button'),voiceStopped,MenuSurface:native('div'),...React,MotionCollapse:({children,open})=>React.createElement('div',{hidden:!open},children)}
 vm.runInNewContext(transformSync(source,{loader:'jsx',format:'cjs',jsx:'automatic'}).code,context)
 const root=createRoot(document.getElementById('root')),container=document.getElementById('root'),calls=[],edited=[]
 let state={settingsFor:'A',checkedFor:'A',settings,status,conversationModelsFor:'A',conversationModels:inventory},succeed=false
 const run=async(id,action,details)=>{calls.push({id,action,details});return succeed}
 const render=()=>root.render(React.createElement(context.module.exports.ConversationModelEditor,{state,sessionId:'A',run,markSettingsEdited:x=>edited.push(x)}))
 t.after(async()=>{await act(async()=>root.unmount());dom.window.close();for(const k of keys){if(old[k])Object.defineProperty(globalThis,k,old[k]);else delete globalThis[k]}})
 const button=text=>[...container.querySelectorAll('button')].find(n=>n.textContent===text),click=async n=>{assert.ok(n);await act(async()=>n.click())}
 await act(async()=>render());assert.equal(calls.length,0);assert.equal(button('保存默认').disabled,true)
 await click(container.querySelectorAll('input[type=radio]')[1]);assert.equal(button('保存默认').disabled,true)
 await click(container.querySelector('button[aria-label="供应商"]'));assert.equal(container.querySelector('[role=listbox]').children.length,2)
 await act(async()=>Simulate.keyDown(container.querySelector('[role=listbox]'),{key:'Escape',preventDefault(){},stopPropagation(){}}));assert.equal(container.querySelector('[role=listbox]'),null)
 await click(container.querySelector('button[aria-label="供应商"]'));await click(container.querySelector('[role=option]'))
 await click(container.querySelector('button[aria-label="模型"]'));await click(container.querySelector('[role=option]'));assert.equal(button('保存默认').disabled,false)
 await click(button('保存默认'));assert.equal(calls.length,1);assert.equal(calls[0].action,'save-conversation-model');assert.deepEqual(JSON.parse(JSON.stringify(calls[0].details)),{revision:'r1',values:{mode:'manual',provider:'p1',model:'m1'}});assert.match(container.textContent,/草稿已保留/)
 await click(container.querySelector('button[aria-label="供应商"]'));await click(container.querySelectorAll('[role=option]')[1]);assert.equal(button('保存默认').disabled,true,'provider change clears incompatible model')
 state={...state,status:{...status,enabled:true}};await act(async()=>render());assert.equal(container.querySelector('input').matches(':disabled'),true);assert.equal(button('保存默认').disabled,true)
 state={...state,status};await act(async()=>render());await click(container.querySelector('input'));assert.equal(button('保存默认').disabled,true,'auto equals unchanged saved default');assert.ok(edited.includes('save-conversation-model'))
})
