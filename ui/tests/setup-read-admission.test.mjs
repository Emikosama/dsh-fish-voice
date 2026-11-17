import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import vm from 'node:vm'
import { TTS_DEFAULTS } from '../../voice-tts.mjs'
import { createController } from '../src/controller.mjs'
const host=process.env.DSH_SOURCE_ROOT,renderDeps=process.env.WHALE_RENDER_DEPS,reactDeps=process.env.WHALE_REACT_DEPS
const available=Boolean(host||renderDeps&&reactDeps)

// Real React scheduling, rather than act() batching: the external-store snapshot
// can commit before the component command's finally releases its synchronous lock.
test('local automatic preparation waits for its command lock and never retries an executed failure',{skip:!available},async t=>{
 const buildRequire=createRequire(join(renderDeps||host,'package.json'))
 const {transformSync}=renderDeps?buildRequire('esbuild'):createRequire(buildRequire.resolve('vite/package.json'))('esbuild')
 const {JSDOM}=buildRequire('jsdom'),dom=new JSDOM('<div id="root"></div>',{url:'http://localhost',pretendToBeVisual:true})
 const previous=Object.fromEntries(['window','document','navigator'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]))
 for(const [key,value] of Object.entries({window:dom.window,document:dom.window.document,navigator:dom.window.navigator}))Object.defineProperty(globalThis,key,{value,writable:true,configurable:true})
 const require=createRequire(join(reactDeps||join(host,'packages/client/ui-primitives'),'package.json'))
 const React=require('react'),{createRoot}=require('react-dom/client')
 const native=tag=>({children,variant,...props})=>React.createElement(tag,props,children)
 const primitives={Button:native('button'),Input:native('input'),MenuSurface:native('div'),Checkbox:({label,...props})=>React.createElement('label',null,React.createElement('input',{...props,type:'checkbox'}),label)}
 const scope={module:{exports:{}},require(id){if(id==='./path-field.jsx'||id==='./motion.jsx'){const child={...scope,AbortController,module:{exports:{}}};vm.runInNewContext(transformSync(readFileSync(new URL('../src/'+id.slice(2),import.meta.url),'utf8'),{loader:'jsx',format:'cjs',jsx:'automatic'}).code,child);return child.module.exports}if(id.endsWith('.css'))return{text:''};if(id.includes('dsh-client-ui-primitives'))return primitives;return require(id)}}
 vm.runInNewContext(transformSync(readFileSync(new URL('../src/setup.jsx',import.meta.url),'utf8')+'\nexport { useCommand };',{loader:'jsx',format:'cjs',jsx:'automatic'}).code,scope)
 const {LocalTtsDownload,useCommand}=scope.module.exports,root=createRoot(document.getElementById('root'))
 const tick=()=>new Promise(resolve=>setTimeout(resolve,20))
 const wait=async(predicate,message)=>{for(let i=0;i<100&&!predicate();i++)await tick();assert.ok(predicate(),typeof message==='function'?message():message)}
 const modelId='qwen3-tts-base-1.7b-gguf',settings={revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{visibility:'hidden'},ttsSetup:{...TTS_DEFAULTS,provider:'off'}},status={enabled:false,ownerSessionId:null,helper:{online:false},voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true}}
 const installer={schema:1,models:[{id:modelId,title:'Qwen',purpose:'tts',available:true,runtimeLoaded:false,recommendation:{recommended:true}}],jobs:[],hardware:{},compute:{}}
 let ui
 t.after(()=>{root.unmount();ui?.dispose();dom.window.close();for(const[key,descriptor]of Object.entries(previous)){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key]}})
 // Deterministically hold the command between admission and finally. The
 // effect's pending value is the old render, but the live lock is authoritative.
 let release,observed=false,settledCount=0
 const held=new Promise(resolve=>{release=resolve})
 function AdmissionProbe(){
  const [execute,pending,,admission]=useCommand(()=>held,'A')
  React.useEffect(()=>{void execute('model-installer');assert.equal(pending,false);assert.equal(admission.isLocked(),true);observed=true},[])
  React.useEffect(()=>{settledCount=admission.settled;if(settledCount)assert.equal(admission.isLocked(),false)},[admission.settled])
  return null
 }
 root.render(React.createElement(AdmissionProbe))
 await wait(()=>observed,'live lock is visible before the pending render')
 release(true);await wait(()=>settledCount===1,'finally publishes one settled opportunity')
 root.render(null);await tick()
 for(const fails of [false,true]){
  const calls=[]
  ui=createController(async(_id,q)=>{calls.push(q.action);if(q.action==='read-settings')return settings;if(q.action==='model-installer')return installer;if(q.action==='plan-model-install'){if(fails)throw Error('actual plan transport failure');return{modelId,compute:'cpu',planHash:'plan',destination:'/managed/qwen',files:[],licenseUrls:[],totalBytes:1}}return status})
  ui.setSession('A');await ui.run('A','read-settings');await ui.run('A','status')
  const current=ui
  function View(){const state=React.useSyncExternalStore(current.subscribe,current.getSnapshot);return React.createElement(LocalTtsDownload,{state,sessionId:'A',run:current.run})}
  root.render(React.createElement(View,{key:String(fails)}))
  await wait(()=>calls.includes('plan-model-install'),()=>JSON.stringify({calls,state:ui.getSnapshot()}))
  await wait(()=>!ui.getSnapshot().busy,'plan settles')
  if(!fails)assert.equal(ui.getSnapshot().installPlan.planHash,'plan')
  else assert.match(ui.getSnapshot().error,/actual plan transport failure/)
  await ui.run('A','status');await tick();await tick()
  assert.equal(calls.filter(action=>action==='model-installer').length,1)
  assert.equal(calls.filter(action=>action==='plan-model-install').length,1,'an admitted failed plan is not automatically replayed')
  assert.equal(calls.some(action=>['start-model-install','preview-tts','enable'].includes(action)),false)
  root.render(null);await tick();ui.dispose()
 }
})
