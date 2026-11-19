import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import { actionRequestCodec } from '../src/conversation-contract.mjs'
import { decodeSetupReply, validateSetupFields } from '../src/setup-protocol.mjs'
import { createController } from '../src/controller.mjs'

const require = createRequire(new URL('../package.json', import.meta.url))
const renderAvailable = (()=>{ try { require.resolve('jsdom'); require.resolve('esbuild'); return true } catch { return false } })()
const initial = { provider:'off', deepseekVoice:'stella', deepseekTextTransmissionAccepted:false, volume:.8 }
const config = { baseUrl:'http://localhost:8765/v1/audio/speech', model:'tts-test', voice:'test-voice', apiKeyEnv:'TEST_TTS_KEY', format:'mp3', textTransmissionAccepted:true }
const receipt = { provider:'custom', fallback:false, playbackCompleted:true, acousticConfirmation:false }
const status = { enabled:false, ownerSessionId:null, voiceControlBusy:false, helper:{online:false}, voiceSession:{id:null,fullyStopped:true}, ttsRuntime:{state:'idle',busy:false,blocked:false} }

test('custom TTS contracts accept a saved configuration and completed playback only', ()=>{
  const values = { ...initial, provider:'custom', customTts:config }
  const schema = actionRequestCodec.create()
  assert.equal(schema.safeParse({action:'save-tts',revision:'r1',values}).success,true)
  assert.equal(schema.safeParse({action:'save-tts',revision:'r1',values:{...values,customTts:{...config,apiKey:'raw'}}}).success,false)
  assert.equal(schema.safeParse({action:'preview-tts',revision:'r1',values}).success,false)
  assert.equal(schema.safeParse({action:'preview-tts'}).success,true)
  assert.doesNotThrow(()=>validateSetupFields({ttsSetup:initial}))
  assert.doesNotThrow(()=>validateSetupFields({ttsSetup:values,ttsRuntime:{...status.ttsRuntime,provider:'custom'}}))
  assert.throws(()=>validateSetupFields({ttsSetup:{...initial,provider:'custom'}}))
  assert.deepEqual(decodeSetupReply('preview-tts',receipt),receipt)
})

test('a confirmed custom synthesis failure is displayed with a retryable preview', async t=>{
  const calls = []
  const controller = createController(async (_id, request)=>{
    calls.push(request.action)
    if (request.action === 'preview-tts') throw Object.assign(new Error('自定义朗读服务请求超时'),{code:'TTS_CUSTOM_TIMEOUT'})
    if (request.action === 'cancel-tts') return {status:'idle'}
    return status
  })
  t.after(()=>controller.dispose())
  controller.setSession('A')
  assert.equal(await controller.run('A','preview-tts'),false)
  assert.deepEqual(calls,['preview-tts','cancel-tts'])
  assert.deepEqual(controller.getSnapshot().ttsPreview,{status:'failed',provider:'custom',detail:'自定义朗读服务请求超时'})
  assert.equal(controller.getSnapshot().ttsUncertain,false)
})

test('custom settings require confirmation, save before audition, and reset confirmation when edited or revoked', {skip:!renderAvailable}, async t=>{
  const {transformSync} = require('esbuild')
  const {JSDOM} = require('jsdom')
  const React = require('react'), {createRoot} = require('react-dom/client'), {Simulate} = require('react-dom/test-utils')
  const dom = new JSDOM('<div id="root"></div>')
  const names = {window:dom.window, document:dom.window.document, IS_REACT_ACT_ENVIRONMENT:true}
  const previous = Object.fromEntries(Object.keys(names).map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]))
  for (const [key,value] of Object.entries(names)) Object.defineProperty(globalThis,key,{value,configurable:true,writable:true})
  const rootNode = dom.window.document.getElementById('root')
  const root = createRoot(rootNode)
  t.after(async()=>{
    await React.act(async()=>root.unmount())
    dom.window.close()
    for (const [key,descriptor] of Object.entries(previous)) {
      if (descriptor) Object.defineProperty(globalThis,key,descriptor)
      else delete globalThis[key]
    }
  })
  const make = tag=>({children,variant,...props})=>React.createElement(tag,props,children)
  const modules = new Map()
  function load(name) {
    if (modules.has(name)) return modules.get(name)
    const scope = { URL, AbortController, module:{exports:{}}, require(id) {
      if (id.endsWith('.module.css')) return {text:''}
      if (id === '@deepseek-ai/dsh-client-ui-primitives') return {Button:make('button'), Input:make('input')}
      return id.startsWith('./') ? load(id) : require(id)
    } }
    const source = readFileSync(new URL('../src/'+name,import.meta.url),'utf8')
    vm.runInNewContext(transformSync(source,{loader:'jsx',format:'cjs',jsx:'automatic'}).code,scope)
    modules.set(name,scope.module.exports)
    return scope.module.exports
  }
  const {TtsSetupEditor} = load('./setup.jsx')
  let state = { settings:{revision:'r1',ttsSetup:initial}, settingsFor:'A', status, checkedFor:'A', authorization:{revision:'a1',scopes:[]} }
  const calls = []
  const render = ()=>root.render(React.createElement(TtsSetupEditor,{state,sessionId:'A',run,prepared:true}))
  async function run(_id, action, params) {
    calls.push({action,params})
    if (action === 'save-tts') {
      state = { ...state, settings:{revision:'r2',ttsSetup:params.values}, authorization:{revision:'a2',scopes:[{id:'custom-tts-text',allowed:true}]} }
      render()
    }
    return true
  }
  const button = label=>[...rootNode.querySelectorAll('button')].find(node=>node.textContent===label)
  const save = ()=>button('保存朗读设置')
  const audition = ()=>button('试听已保存配置')
  const consent = ()=>rootNode.querySelector('[data-custom-tts] input[type=checkbox]')
  const textInputs = ()=>rootNode.querySelectorAll('[data-custom-tts] input:not([type=checkbox])')
  const change = (node, value)=>React.act(async()=>{ node.value=value; Simulate.change(node) })
  const click = node=>React.act(async()=>node.click())
  await React.act(async()=>render())
  assert.equal(rootNode.querySelector('[data-custom-tts]'),null)
  await click([...rootNode.querySelectorAll('input[type=radio]')].find(node=>node.closest('label').textContent.includes('自定义 TTS')))
  assert.equal(save().disabled,true)
  const [baseUrl, model, voice, credentials] = textInputs()
  for (const [node,value] of [[baseUrl,config.baseUrl],[model,config.model],[voice,config.voice],[credentials,config.apiKeyEnv]]) await change(node,value)
  await click(consent())
  assert.equal(save().disabled,false)
  await change(rootNode.querySelector('[data-custom-tts] select'),config.format)
  assert.equal(consent().checked,false)
  assert.equal(save().disabled,true)
  await click(consent())
  assert.equal(audition().disabled,true)
  assert.deepEqual(calls,[])
  await click(save())
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0].params.values.customTts)),config)
  assert.equal(audition().disabled,false)
  await click(audition())
  assert.deepEqual(calls[1],{action:'preview-tts',params:undefined})
  await React.act(async()=>{
    state = {...state,authorization:{revision:'a3',scopes:[{id:'custom-tts-text',allowed:false}]}}
    render()
  })
  assert.equal(consent().checked,false)
  assert.equal(audition().disabled,true)
  assert.equal(save().disabled,true)
  await click(consent())
  assert.equal(save().disabled,false)
  assert.equal(audition().disabled,true)
  await change(textInputs()[0],'http://tts.example.com/v1')
  assert.equal(consent().checked,false)
  assert.match(rootNode.querySelector('[data-custom-tts] [role=status]').textContent,/HTTPS/)
})
