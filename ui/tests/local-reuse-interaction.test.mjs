import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import vm from 'node:vm'

// Isolated DOM interaction test, not a DSH host or Windows acceptance test.
// WHALE_RENDER_DEPS: directory containing esbuild + jsdom in node_modules.
// WHALE_REACT_DEPS: directory containing React 18 + react-dom in node_modules.
// CI falls back to the pinned DSH host; configured dependency errors must fail.
const host=process.env.DSH_SOURCE_ROOT,renderDeps=process.env.WHALE_RENDER_DEPS,reactDeps=process.env.WHALE_REACT_DEPS
const rendererAvailable=Boolean(host||renderDeps&&reactDeps)

test('rendered local reuse requires explicit plan/start, fences edits, and blocks a failed old job', {skip:!rendererAvailable}, async t=>{
  const buildRequire=createRequire(join(renderDeps||host,'package.json'))
  const {transformSync}=renderDeps?buildRequire('esbuild'):createRequire(buildRequire.resolve('vite/package.json'))('esbuild')
  const {JSDOM}=buildRequire('jsdom')
  const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'http://localhost'})
  const previous=Object.fromEntries(['window','document','navigator','IS_REACT_ACT_ENVIRONMENT'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]))
  for(const [key,value] of Object.entries({window:dom.window,document:dom.window.document,navigator:dom.window.navigator,IS_REACT_ACT_ENVIRONMENT:true}))Object.defineProperty(globalThis,key,{value,writable:true,configurable:true})
  const require=createRequire(join(reactDeps||join(host,'packages/client/ui-primitives'),'package.json'))
  const React=require('react'),{createRoot}=require('react-dom/client'),{Simulate}=require('react-dom/test-utils')
  const act=React.act??require('react-dom/test-utils').act
  const source=readFileSync(new URL('../src/setup.jsx',import.meta.url),'utf8')
  const code=transformSync(source,{loader:'jsx',format:'cjs',jsx:'automatic'}).code
  const native=tag=>({children,variant,...props})=>React.createElement(tag,props,children)
  const primitives={Button:native('button'),Input:native('input'),MenuSurface:native('div'),Checkbox:({label,...props})=>React.createElement('label',null,React.createElement('input',{...props,type:'checkbox'}),label)}
  const context={URL:dom.window.URL,module:{exports:{}},require(id){if(id==='./path-field.jsx'||id==='./motion.jsx'){const child={...context,AbortController,module:{exports:{}}};vm.runInNewContext(transformSync(readFileSync(new URL('../src/'+id.slice(2),import.meta.url),'utf8'),{loader:'jsx',format:'cjs',jsx:'automatic'}).code,child);return child.module.exports}if(id.endsWith('.css'))return {text:''};if(id.includes('dsh-client-ui-primitives'))return primitives;return require(id)}}
  vm.runInNewContext(code,context)
  const {LocalTtsDownload}=context.module.exports
  const container=document.getElementById('root'),root=createRoot(container)
  t.after(async()=>{await act(async()=>root.unmount());dom.window.close();for(const [key,descriptor] of Object.entries(previous)){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key]}})
  const modelId='qwen3-tts-base-1.7b-gguf',calls=[]
  let state={checkedFor:'A',settingsFor:'A',settings:{revision:'r1',ttsSetup:{provider:'off'}},status:{enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true}},installerFor:'A',installer:{models:[{id:modelId,title:'Qwen',purpose:'tts',available:true,recommendation:{recommended:true}}],jobs:[]},installPlanFor:'A',installPlan:{modelId,compute:'cpu',planHash:'ordinary',totalBytes:100,licenseUrls:[],files:[{url:'https://www.modelscope.cn/model',downloadUrls:['https://www.modelscope.cn/model','https://hf-mirror.net/model']}]}}
  let selectedPath=null;const pickPath=async()=>selectedPath
  const render=()=>root.render(React.createElement(LocalTtsDownload,{state,sessionId:'A',run,pickPath}))
  async function run(id,action,params){
    calls.push({id,action,params})
    if(action==='plan-model-install'){
      assert.ok(params.sourceDirectory,'reuse must not trigger ordinary automatic planning')
      state={...state,installPlanFor:id,installPlanRequest:{...params},installPlan:{...params,sourceDirectory:params.sourceDirectory.replace(/\/$/,''),reused:true,reusedBytes:100,planHash:'reuse-'+calls.length,totalBytes:10,licenseUrls:[],runtime:{source:'https://example.invalid/qwen-b12110'}}}
      render()
    }
    if(action==='control-model-install'&&params.operation==='cancel'){state={...state,installer:{...state.installer,jobs:[]}};render()}
    return true
  }
  const button=text=>[...container.querySelectorAll('button')].find(node=>node.textContent===text)
  const click=async node=>{assert.ok(node,'expected rendered control');await act(async()=>node.click())}
  const change=async(node,value)=>{await act(async()=>{if(node.tagName==='INPUT'){assert.equal(node.readOnly,true);selectedPath=value;container.querySelector('[data-native-path=sourceDirectory] button').click()}else Simulate.change(node,{target:{value}})})}
  await act(async()=>render())
  assert.equal(calls.length,0)
  assert.match(container.textContent,/www\.modelscope\.cn、hf-mirror\.net/)
  await click(button('使用本机已有文件'))
  const variant=container.querySelector('select[aria-label="已有模型量化版本"]'),path=container.querySelector('input:not([type="checkbox"])')
  assert.equal(variant.value,'q8_0')
  assert.equal(button('验证并使用').disabled,true)
  await change(path,'/models/qwen/')
  assert.equal(calls.length,0,'toggle and typing cannot start downloads or plan reads')
  await click(button('检查复用计划'))
  assert.equal(calls[0].action,'plan-model-install')
  assert.equal(calls[0].params.modelVariant,'q8_0')
  assert.equal(button('验证并使用').disabled,false,'normalized returned path still matches requested input')
  assert.match(container.textContent,/复用模型/)
  assert.match(container.textContent,/b12110/)
  assert.equal(calls.filter(call=>call.action==='start-model-install').length,0)
  await change(path,'/models/other/')
  assert.equal(button('验证并使用').disabled,true,'editing path invalidates prior plan')
  await click(button('检查复用计划'))
  await change(variant,'q4_k_m')
  assert.equal(button('验证并使用').disabled,true,'editing variant invalidates prior plan')
  await click(button('检查复用计划'))
  await click(button('验证并使用'))
  const starts=calls.filter(call=>call.action==='start-model-install')
  assert.equal(starts.length,1)
  assert.equal(starts[0].params.sourceDirectory,'/models/other')
  assert.equal(starts[0].params.modelVariant,'q4_k_m')
  assert.equal(starts[0].params.accepted,true)
  assert.equal(starts[0].params.useWhenReady,true)
  state={...state,installer:{...state.installer,jobs:[{id:'failed-job',modelId,status:'failed',stage:'failed',totalBytes:10,receivedBytes:0}]}}
  await act(async()=>render())
  assert.equal(button('验证并使用'),undefined,'failed old job must not offer a conflicting new start')
  assert.match(container.textContent,/请先取消该任务/)
  assert.ok(button('继续下载并使用'))
  await click(button('取消下载'))
  assert.equal(button('验证并使用').disabled,false)
  assert.equal(calls.filter(call=>call.action==='start-model-install').length,1,'cancellation never auto-starts replacement')
  state={...state,installer:{...state.installer,models:[{...state.installer.models[0],computeOptions:['cpu','auto','vulkan']}]}}
  await act(async()=>render())
  const compute=container.querySelector('select[aria-label="本地计算"]')
  assert.equal(compute.value,'auto','new GPU-capable install defaults to automatic without changing old installed settings')
  assert.equal(button('验证并使用').disabled,true,'new compute choice invalidates the CPU consent plan')
  await click(button('检查复用计划'))
  assert.equal(calls.at(-1).params.compute,'auto')
  assert.equal(button('验证并使用').disabled,false)
  await change(compute,'vulkan')
  assert.equal(button('验证并使用').disabled,true,'changing backend requires a new complete plan')
  assert.equal(calls.filter(call=>call.action==='start-model-install').length,1,'compute choice cannot start a download')
})
