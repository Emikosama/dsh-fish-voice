import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import { actionRequestCodec } from '../src/conversation-contract.mjs'
import { decodeSetupReply, validateSetupFields } from '../src/setup-protocol.mjs'
import { createController } from '../src/controller.mjs'
import { normalizeCustomTtsSettings } from '../../voice-tts-custom.mjs'

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

for (const [provider,code,detail] of [['custom','TTS_CUSTOM_PLAYBACK_UNAVAILABLE','Windows 本机音频检查失败，请检查系统播放组件后重试'],['system','TTS_SYSTEM_VOICE_UNAVAILABLE','所选 Windows 音色已不可用']]) test(`a confirmed ${provider} failure through the owner transport leaves a retryable preview`, async t=>{
  const calls = []
  const controller = createController(async (_id, request)=>{
    calls.push(request.action)
    if (request.action === 'preview-tts') throw Object.assign(new Error(`${detail}\n[${code}]`),{code:'REMOTE_ERROR'})
    if (request.action === 'cancel-tts') return {status:'idle'}
    return status
  })
  t.after(()=>controller.dispose())
  controller.setSession('A')
  assert.equal(await controller.run('A','preview-tts'),false)
  assert.deepEqual(calls,['preview-tts','cancel-tts'])
  assert.deepEqual(controller.getSnapshot().ttsPreview,{status:'failed',provider,detail})
  assert.equal(controller.getSnapshot().ttsUncertain,false)
})

async function mountTts(t, {wizard=false, ttsSetup=initial}={}) {
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
  const make = tag=>React.forwardRef(({children,variant,...props},ref)=>React.createElement(tag,{...props,ref},children))
  const modules = new Map()
  function load(name) {
    if (modules.has(name)) return modules.get(name)
    const scope = { URL, AbortController, module:{exports:{}}, require(id) {
      if (id.endsWith('.module.css')) return {text:''}
      if (id === '@deepseek-ai/dsh-client-ui-primitives') return {Button:make('button'), Input:make('input'), MenuSurface:make('div')}
      return id.startsWith('./') ? load(id) : require(id)
    } }
    const source = readFileSync(new URL('../src/'+name,import.meta.url),'utf8')
    vm.runInNewContext(transformSync(source,{loader:'jsx',format:'cjs',jsx:'automatic'}).code,scope)
    modules.set(name,scope.module.exports)
    return scope.module.exports
  }
  const {TtsSetupEditor,SetupWizard} = load('./setup.jsx')
  let state = { settings:{revision:'r1',ttsSetup}, settingsFor:'A', status, checkedFor:'A', authorization:{revision:'a1',scopes:[]} }
  const calls = []
  const render = ()=>root.render(React.createElement(wizard?SetupWizard:TtsSetupEditor,{state,sessionId:'A',run,prepared:true}))
  async function run(_id, action, params) {
    calls.push({action,params})
    if (action === 'save-tts') {
      const savedTts = params.values.customTts ? {...params.values,customTts:normalizeCustomTtsSettings(params.values.customTts)} : params.values
      state = { ...state, settings:{revision:'r2',ttsSetup:savedTts}, authorization:{revision:'a2',scopes:[{id:'custom-tts-text',allowed:true}]} }
      render()
    } else if (action === 'inspect-tts') {
      state = {...state,ttsCapabilitiesFor:'A',ttsCapabilities:systemCapabilities}
      render()
    }
    return true
  }
  const button = label=>[...rootNode.querySelectorAll('button')].find(node=>node.textContent===label)
  const consent = ()=>rootNode.querySelector('[data-custom-tts] input[type=checkbox]')
  const textInputs = ()=>rootNode.querySelectorAll('[data-custom-tts] input:not([type=checkbox])')
  const change = (node, value)=>React.act(async()=>{ node.value=value; Simulate.change(node) })
  const click = node=>React.act(async()=>node.click())
  const update = patch=>React.act(async()=>{state={...state,...patch}; render()})
  await update({})
  const choose = label=>click([...rootNode.querySelectorAll('input[type=radio]')].find(node=>node.closest('label').textContent.includes(label)))
  return {rootNode,calls,button,consent,textInputs,change,click,update,choose}
}

test('custom settings require confirmation, save before audition, and reset confirmation when edited or revoked', {skip:!renderAvailable}, async t=>{
  const {rootNode,calls,button,consent,textInputs,change,click,update,choose} = await mountTts(t)
  const save = ()=>button('保存朗读设置')
  const audition = ()=>button('试听已保存配置')
  assert.equal(rootNode.querySelector('[data-custom-tts]'),null)
  await choose('自定义 TTS')
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
  await update({authorization:{revision:'a3',scopes:[{id:'custom-tts-text',allowed:false}]}})
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

const systemCapabilities = {
  platform:'win32', playbackSupported:true, deepseekKeyAvailable:false, autoDownload:false, gpuSupported:false,
  systemVoices:[{id:'voice-zh',name:'中文音色',language:'zh-CN'},{id:'voice-en',name:'English voice',language:'en-US'}],
  systemDefaultVoiceId:'voice-en',
}
const freshSystem = {...initial,provider:'system',systemVoiceId:null}
const systemDraft = {...freshSystem,localModelId:null,localModelPath:null,referenceAudioPath:null,referenceAudioAccepted:false}

test('Windows system TTS decodes a bounded inventory, settings, runtime and audition receipt', ()=>{
  const {safeParse} = actionRequestCodec.create()
  assert.equal(safeParse({action:'preview-tts',revision:'r1',values:{...systemDraft,systemVoiceId:'voice-zh'}}).success,true)
  assert.equal(safeParse({action:'save-tts',revision:'r1',values:{...freshSystem,systemVoiceId:'x'.repeat(513)}}).success,false)
  assert.equal(safeParse({action:'preview-tts',revision:'r1',values:{...systemDraft,systemVoiceId:[]}}).success,false)
  assert.deepEqual(decodeSetupReply('inspect-tts',systemCapabilities),systemCapabilities)
  assert.throws(()=>decodeSetupReply('inspect-tts',{...systemCapabilities,systemVoices:[{id:'voice',name:'Voice'}]}))
  assert.doesNotThrow(()=>validateSetupFields({ttsSetup:freshSystem,ttsRuntime:{...status.ttsRuntime,provider:'system'}}))
  assert.doesNotThrow(()=>decodeSetupReply('preview-tts',{...receipt,provider:'system',systemVoiceId:'voice-zh'}))
})

test('the first response setup lists system voices and previews the selected draft without saving or starting downloads', {skip:!renderAvailable}, async t=>{
  const {rootNode,calls,button,click,change,update} = await mountTts(t,{wizard:true,ttsSetup:freshSystem})
  await click(button('下一步'))
  const voice = rootNode.querySelector('[data-system-tts] select')
  assert.deepEqual([...voice.options].map(option=>option.value),['','voice-zh','voice-en'])
  assert.match(voice.selectedOptions[0].textContent,/自动选择/)
  await change(voice,'voice-zh')
  assert.equal(button('试听系统音色').disabled,false)
  assert.ok(button('试听系统音色').closest('footer'),'system audition stays visible while provider fields scroll')
  await click(button('试听系统音色'))
  const json = JSON.parse(JSON.stringify(calls))
  assert.deepEqual(json.map(call=>call.action),['listen-mode','inspect-tts','preview-tts'])
  assert.deepEqual(json[2].params,{revision:'r1',values:{...systemDraft,systemVoiceId:'voice-zh'}})
  await update({ttsCapabilities:{...systemCapabilities,systemVoices:[systemCapabilities.systemVoices[1]]}})
  assert.equal(button('试听系统音色').disabled,true,'a removed selected voice is not used for preview')
  await change(voice,'voice-en')
  await click(button('下一步'))
  assert.equal(calls.at(-1).action,'save-tts')
  assert.equal(calls.at(-1).params.values.systemVoiceId,'voice-en')
  assert.match(rootNode.textContent,/准备语音识别/)
})

test('first-run custom TTS exposes editable fields and can audition saved consent before ASR', {skip:!renderAvailable}, async t=>{
  const {rootNode,calls,button,click,choose,change,consent,textInputs} = await mountTts(t,{wizard:true,ttsSetup:freshSystem})
  await click(button('下一步'))
  await choose('自定义 TTS')
  const [baseUrl, model, voice, credentials] = textInputs()
  for (const [node,value] of [[baseUrl,config.baseUrl],[model,config.model],[voice,config.voice],[credentials,config.apiKeyEnv]]) await change(node,value)
  await change(rootNode.querySelector('[data-custom-tts] select'),config.format)
  assert.equal(button('保存朗读设置').disabled,true)
  assert.equal(button('下一步').disabled,true)
  await click(consent())
  assert.equal(button('试听已保存配置').disabled,true)
  await click(button('保存朗读设置'))
  assert.equal(button('试听已保存配置').disabled,false)
  assert.equal(textInputs()[0].value,'http://localhost:8765/v1','audition uses the backend-normalized saved endpoint')
  await click(button('试听已保存配置'))
  assert.deepEqual(calls.map(call=>call.action),['listen-mode','inspect-tts','save-tts','preview-tts'])
  assert.deepEqual(JSON.parse(JSON.stringify(calls[2].params.values.customTts)),config)
  assert.equal(calls[3].params,undefined)
  assert.match(rootNode.textContent,/怎么听回答/)
  await click(button('下一步'))
  assert.match(rootNode.textContent,/准备语音识别/)
  assert.equal(calls.filter(call=>call.action==='save-tts').length,1)
})
