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

test('installed local TTS can be explicitly restored without trusting stale install intents', {skip:!rendererAvailable}, async t=>{
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
  const primitives={Button:native('button'),Input:native('input'),MenuSurface:React.forwardRef(({children,...props},ref)=>React.createElement('div',{...props,ref},children)),Checkbox:({label,...props})=>React.createElement('label',null,React.createElement('input',{...props,type:'checkbox'}),label)}
  const context={module:{exports:{}},require(id){if(id==='./path-field.jsx'||id==='./motion.jsx'){const child={...context,AbortController,module:{exports:{}}};vm.runInNewContext(transformSync(readFileSync(new URL('../src/'+id.slice(2),import.meta.url),'utf8'),{loader:'jsx',format:'cjs',jsx:'automatic'}).code,child);return child.module.exports}if(id.endsWith('.css'))return {text:''};if(id.includes('dsh-client-ui-primitives'))return primitives;return require(id)}}
  vm.runInNewContext(code,context)
  const {LocalTtsDownload,SetupWizard}=context.module.exports
  const container=document.getElementById('root'),root=createRoot(container)
  t.after(async()=>{await act(async()=>root.unmount());dom.window.close();for(const [key,descriptor] of Object.entries(previous)){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key]}})
  const modelId='vits-melo-tts-zh_en-int8',calls=[]
  const base=provider=>({checkedFor:'A',settingsFor:'A',settings:{revision:'r2',listenMode:'ptt',ttsSetup:{provider,localModelId:modelId,localModelPath:'/models/old'}},status:{enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true}},ttsCapabilitiesFor:'A',ttsCapabilities:{installedChineseVoices:[{id:'zh'}]},installerFor:'A',installer:{models:[{id:modelId,title:'Melo',purpose:'tts',available:true,recommendation:{recommended:true}}],jobs:[{id:'job1',modelId,status:'installed',stage:'installed',installedPath:'/models/current',totalBytes:100,receivedBytes:100}],ttsInstallIntent:{jobId:'job1',modelId,status:'applied'}},installPlanFor:'A',installPlan:{modelId,compute:'cpu',planHash:'p',totalBytes:100}})
  let state,key=0,Component=SetupWizard
  const render=()=>root.render(React.createElement(Component,{key,state,sessionId:'A',run}))
  async function run(id,action,params){
    calls.push({id,action,params})
    if(action==='apply-model-install'){
      assert.equal(params.id,'job1');assert.equal(params.revision,'r2')
      state={...state,settings:{...state.settings,revision:'r3',ttsSetup:{provider:'local',localModelId:modelId,localModelPath:'/models/current'}}}
      render()
    }
    return true
  }
  const button=text=>[...container.querySelectorAll('button')].find(node=>node.textContent===text)
  const click=async node=>{assert.ok(node,'expected rendered control');await act(async()=>node.click())}
  const localChoice=()=>[...container.querySelectorAll('input[name="setup-provider"]')].find(input=>input.closest('label').textContent.includes('本地语音模型'))
  for(const provider of ['edge','off']){
    state=base(provider);key++
    await act(async()=>render())
    await click(button('下一步'))
    await act(async()=>Simulate.change(localChoice()))
    assert.equal(button('下一步').disabled,true)
    assert.doesNotMatch(container.textContent,/合成验证通过，已设为朗读来源/)
    assert.equal(button('验证并使用').disabled,false)
    await click(button('验证并使用'))
    assert.equal(button('下一步').disabled,false)
    assert.match(container.textContent,/合成验证通过，已设为朗读来源/)
    assert.equal(button('验证并使用'),undefined)
    await click(button('下一步'))
    assert.match(container.textContent,/第 3 \/ 3 步/)
    assert.match(container.textContent,/配置已保存/)
  }
  state=base('unconfigured');key++
  state.settings.ttsSetup.localModelId=null
  state.settings.ttsSetup.localModelPath=null
  state.installer.jobs=[]
  state.installer.ttsInstallIntent=null
  state.installer.models[0].recommendation.recommended=false
  state.installer.models.unshift({id:'qwen3-tts-base-1.7b-gguf',title:'Qwen',purpose:'tts',available:true,recommendation:{recommended:true}})
  const before=calls.length
  await act(async()=>render())
  await click(button('下一步'))
  const choices=[...container.querySelectorAll('input[name="setup-provider"]')]
  assert.equal(choices.length,4)
  assert.equal(choices[0].checked,true)
  assert.match(choices[0].closest('label').textContent,/Edge.*晓伊/)
  assert.doesNotMatch(container.textContent,/系统语音/)
  assert.match(container.textContent,/朗读文字会发送给微软/)
  assert.deepEqual(calls.slice(before).map(call=>call.action),['listen-mode'])
  await click(button('启用在线朗读并继续'))
  const edgeSave=calls.at(-1)
  assert.equal(edgeSave.action,'save-tts')
  assert.equal(edgeSave.params.values.provider,'edge')
  assert.equal(edgeSave.params.values.edgeVoice,'zh-CN-XiaoyiNeural')
  assert.equal(edgeSave.params.values.edgeTextTransmissionAccepted,true)
  assert.equal(edgeSave.params.values.systemFallback,false)
  await click(button('上一步'))
  await act(async()=>Simulate.change(localChoice()))
  const recommendedChoice=container.querySelector('select[aria-label="语音模型"]')
  assert.equal(recommendedChoice.value,'qwen3-tts-base-1.7b-gguf')
  await act(async()=>Simulate.change(recommendedChoice,{target:{value:modelId}}))
  assert.equal(recommendedChoice.value,modelId)
  assert.equal(button('下一步').disabled,true)
  assert.equal(button('下载并使用').disabled,false)
  assert.deepEqual(calls.slice(before).map(call=>call.action),['listen-mode','save-tts','plan-model-install'])
  await click(button('下载并使用'))
  assert.deepEqual(structuredClone(calls.at(-1)),{id:'A',action:'start-model-install',params:{modelId,compute:'cpu',planHash:'p',accepted:true,useWhenReady:true}})

  assert.equal(calls.filter(call=>call.action==='apply-model-install').length,2)
  assert.equal(calls.filter(call=>call.action==='start-model-install').length,1)
  Component=LocalTtsDownload;key++;state=base('local')
  await act(async()=>render())
  assert.equal(button('验证并使用').disabled,false,'same model ID at another path is not this installation')
  assert.doesNotMatch(container.textContent,/合成验证通过，已设为朗读来源/)
  state={...state,installer:{...state.installer,ttsInstallIntent:{jobId:'old-job',modelId,status:'applied'}}}
  await act(async()=>render())
  assert.equal(button('验证并使用').disabled,false,'old job intent cannot hide current installed job')
  assert.doesNotMatch(container.textContent,/合成验证通过，已设为朗读来源/)
  for(const status of ['waiting','verifying']){
    state={...state,installer:{...state.installer,ttsInstallIntent:{jobId:'old-job',modelId,status}}}
    await act(async()=>render())
    assert.equal(button('验证并使用').disabled,true,'another pending intent blocks competing application')
  }
  for(const flag of ['busy','uncertain','ttsUncertain','ttsCancelling','installerUncertain']){
    state={...base('off'),[flag]:true}
    await act(async()=>render())
    assert.equal(button('验证并使用').disabled,true,flag+' must fence explicit application')
  }
  state={...base('off'),uncertain:true}
  state.installer.jobs[0]={...state.installer.jobs[0],status:'running',stage:'downloading'}
  state.installer.ttsInstallIntent.status='waiting'
  await act(async()=>render())
  assert.equal(button('暂停').disabled,false,'general uncertainty must not newly disable existing download pause')
  assert.equal(button('取消下载').disabled,false,'general uncertainty must not newly disable existing download cancel')
  await click(button('暂停'))
  await click(button('取消下载'))
  assert.deepEqual(calls.filter(call=>call.action==='control-model-install').map(call=>({...call.params})),[
    {id:'job1',operation:'pause'},{id:'job1',operation:'cancel'}
  ])
  for(const status of ['waiting','verifying']){
    state=base('off');state.installer.ttsInstallIntent.status=status
    await act(async()=>render())
    assert.equal(button('验证并使用'),undefined,'matching active intent cannot be reapplied')
  }
})

// Exercise the actual controller as well as disabled controls: a caller cannot
// bypass an unknown preview outcome by dispatching application directly.
test('controller refuses local model restoration while TTS outcome is unknown', async()=>{
  const {createController}=await import('./action-harness.mjs')
  const calls=[]
  const ui=createController(async(_id,line)=>{
    const {action}=JSON.parse(line.slice('/whale-ear-ui '.length));calls.push(action)
    throw Error('transport outcome unknown')
  })
  try {
    ui.setSession('A')
    assert.equal(await ui.run('A','preview-tts'),false)
    assert.equal(ui.getSnapshot().ttsUncertain,true)
    assert.equal(await ui.run('A','apply-model-install',{id:'job1',revision:'r2'}),false)
    assert.equal(calls.includes('apply-model-install'),false)
  } finally {ui.dispose()}
})
