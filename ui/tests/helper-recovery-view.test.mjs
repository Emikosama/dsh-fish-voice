import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import vm from 'node:vm'
import { createController } from '../src/controller.mjs'

const renderAvailable = Boolean(process.env.DSH_SOURCE_ROOT || process.env.WHALE_RENDER_DEPS && process.env.WHALE_REACT_DEPS)
test('physical shutdown recovery stays in existing controls after readback, with revoke still reachable', { skip: !renderAvailable }, async () => {
 const host=process.env.DSH_SOURCE_ROOT,renderDeps=process.env.WHALE_RENDER_DEPS,reactDeps=process.env.WHALE_REACT_DEPS
 const buildRequire=createRequire(join(renderDeps||host,'package.json'))
 const {transformSync}=renderDeps?buildRequire('esbuild'):createRequire(buildRequire.resolve('vite/package.json'))('esbuild')
 const {JSDOM}=buildRequire('jsdom'),dom=new JSDOM('<div id="root"></div>',{url:'http://localhost'})
 const previous=Object.fromEntries(['window','document','navigator','IS_REACT_ACT_ENVIRONMENT'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]))
 for(const [key,value] of Object.entries({window:dom.window,document:dom.window.document,navigator:dom.window.navigator,IS_REACT_ACT_ENVIRONMENT:true}))Object.defineProperty(globalThis,key,{value,configurable:true,writable:true})
 const require=createRequire(join(reactDeps||join(host,'packages/client/ui-primitives'),'package.json'))
 const React=require('react'),{createRoot}=require('react-dom/client'),act=React.act??require('react-dom/test-utils').act
 const native=tag=>({children,variant,...props})=>React.createElement(tag,props,children)
 const primitives={Button:native('button'),Input:native('input'),MenuSurface:native('div'),Checkbox:({label,...props})=>React.createElement('label',null,React.createElement('input',{...props,type:'checkbox'}),label)}
 const modules=new Map(),load=name=>{
  if(modules.has(name))return modules.get(name)
  const scope={module:{exports:{}},document:dom.window.document,require(id){if(id.endsWith('.css'))return{text:''};if(id==='../../package.json')return JSON.parse(readFileSync(new URL('../../package.json',import.meta.url),'utf8')); if(id==='@deepseek-ai/dsh-client-ui-primitives')return primitives;return id.startsWith('./')?load(id.slice(2)):require(id)}}
  vm.runInNewContext(transformSync(readFileSync(join(import.meta.dirname,'../src',name),'utf8'),{loader:name.endsWith('.jsx')?'jsx':'js',format:'cjs',jsx:'automatic'}).code,scope)
  modules.set(name,scope.module.exports);return scope.module.exports
 }
 const {Controls}=load('views.jsx'),{zh}=load('locales.mjs'),calls=[]
 let kind='helper-cleanup-pending',enabled=false
 const ui=createController(async(_id,request)=>{
  calls.push(request.action)
  if(request.action==='disable')enabled=false
  return{ownerSessionId:enabled?'origin':null,enabled,voiceControlBusy:false,helper:{online:false},listenMode:'ptt',voiceSession:{id:enabled?'voice':null,fullyStopped:false,recovery:{kind,rootSessionId:null,stopVerified:false}}}
 })
 ui.setSession('origin')
 const root=createRoot(document.getElementById('root')),container=document.getElementById('root')
 try{
  await ui.run('origin','status')
  const props={useWhalePreferences:select=>select({motion:'spring'}),sessionId:'origin',t:key=>zh[key]??key,run:ui.run,readState:ui.getSnapshot,useWhaleUi:select=>select({...React.useSyncExternalStore(ui.subscribe,ui.getSnapshot),setupStatus:{version:1,completed:true}}),openSettings(){}}
  await act(async()=>root.render(React.createElement(Controls,props)))
  const buttonCount=container.querySelectorAll('button').length
  assert.match(container.textContent,/正在确认麦克风已释放/)
  kind='helper-stop-unconfirmed'
  await act(async()=>{await ui.run('origin','status');await ui.run('origin','status')})
  assert.match(container.textContent,/麦克风服务退出尚未确认/)
  assert.match(container.textContent,/完整重启 DSH/)
  assert.equal(container.querySelectorAll('[role="dialog"]').length,0)
  assert.ok(container.querySelectorAll('button').length<=buttonCount)
  assert.ok([...container.querySelectorAll('button')].filter(button=>button.textContent===zh.voiceRestartPending).every(button=>button.disabled))
  assert.ok(calls.every(action=>action==='status'),'readback never opens a microphone or replays a mutation')
  enabled=true
  await act(async()=>ui.run('origin','status'))
  const mute=[...container.querySelectorAll('button')].find(button=>button.textContent===zh.endConversation)
  assert.ok(mute&&!mute.disabled,'an outstanding grant can still be explicitly revoked')
  await act(async()=>{mute.click();await new Promise(resolve=>setImmediate(resolve))})
  assert.equal(calls.at(-1),'disable')
  assert.equal(ui.getSnapshot().status.enabled,false)
  assert.match(container.textContent,/麦克风服务退出尚未确认/)
 }finally{
  await act(async()=>root.unmount());ui.dispose();dom.window.close()
  for(const [key,descriptor]of Object.entries(previous)){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key]}
 }
})
