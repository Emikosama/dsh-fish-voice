import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
import { renderAvailable, renderControls } from '../../tests/helpers/render-controls.mjs'
import { TTS_DEFAULTS, validateTtsSettings } from '../../voice-tts.mjs'

test('selected local voice is saved, restored and used by explicit preview without implicit audio', {skip:!renderAvailable}, async t=>{
  let settings={revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voiceSession:{visibility:'hidden',performanceMode:'compatibility'},ttsSetup:{...TTS_DEFAULTS,provider:'local',localModelId:'qwen3-tts-base-1.7b-gguf',localModelPath:'/managed/qwen'}}
  const status={enabled:false,ownerSessionId:null,helper:{online:false},voiceControlBusy:false,listenMode:'ptt',voiceSession:{id:null,fullyStopped:true},ttsRuntime:{state:'idle',busy:false,blocked:false}}
  const capabilities={platform:'win32',playbackSupported:true,systemSupported:true,edgePlaybackSupported:true,edgeDependency:'missing',autoDownload:false,gpuSupported:false,edgeOfficialApi:false,edgeRecipient:'Microsoft',edgePurpose:'speech-synthesis',installedChineseVoices:[]}
  let nextPath='/chosen/my-voice.wav'; const calls=[]
  const controller=createController(async (_id,q)=>{
    calls.push(q)
    if(q.action==='pick-local-path'){assert.equal(q.kind,'referenceAudio');return {path:nextPath}}
    if(q.action==='save-tts'){assert.equal(q.revision,settings.revision);assert.equal(Object.hasOwn(q.values,'referenceAudioAccepted'),false);settings={...settings,revision:'r'+(Number(settings.revision.slice(1))+1),ttsSetup:validateTtsSettings({referenceAudioAccepted:false,...q.values})};return settings}
    if(q.action==='preview-tts'){assert.equal(settings.ttsSetup.referenceAudioPath,'/chosen/my-voice.wav');assert.equal(settings.ttsSetup.referenceAudioAccepted,false);assert.deepEqual(q,{action:'preview-tts'});return{provider:'local',fallback:false,playbackCompleted:true,acousticConfirmation:false}}
    if(q.action==='read-settings')return settings
    if(q.action==='conversation-models')return{providers:[]}
    if(q.action==='inspect-tts')return capabilities
    if(q.action==='model-installer')return{schema:1,models:[],jobs:[],hardware:{},compute:{observedAt:1}}
    if(q.action==='inspect-performance')return{modes:[]}
    return status
  })
  t.after(()=>controller.dispose())
  controller.setSession('A');await controller.run('A','read-settings');await controller.run('A','status');await controller.run('A','inspect-tts');await controller.openSettings('models')
  let view=await renderControls(t,{controller,owner:{id:'A'}})
  await view.act(async()=>view.button('朗读方式').click())
  const change=async(value)=>view.act(async()=>{nextPath=value;const input=view.container.querySelector('input[aria-label="参考音频（WAV）"]');assert.ok(input.readOnly);view.container.querySelector('[data-native-path=referenceAudio] button').click()})
  await change('/chosen/my-voice.wav')
  assert.equal(view.button('保存朗读设置').disabled,false,'ordinary cloning saves without a per-file declaration')
  assert.equal(calls.some(q=>['save-tts','preview-tts','enable','start-model-install'].includes(q.action)),false)
  assert.equal(view.container.querySelector('[data-reference-voice] input[type="checkbox"]'),null)
  assert.equal(view.button('保存朗读设置').disabled,false)
  await view.act(async()=>view.button('保存朗读设置').click())
  assert.equal(settings.ttsSetup.referenceAudioPath,'/chosen/my-voice.wav')
  await view.act(async()=>controller.run('A','status'))
  await view.close();view=await renderControls(t,{controller,owner:{id:'A'}})
  await view.act(async()=>view.button('朗读方式').click())
  assert.equal(view.container.querySelector('input[aria-label="参考音频（WAV）"]').value,'my-voice.wav');assert.equal(view.container.querySelector('input[aria-label="参考音频（WAV）"]').title,'/chosen/my-voice.wav')
  assert.equal(view.container.querySelector('[data-reference-voice] input[type="checkbox"]'),null,'reopening adds no per-file declaration')
  await view.act(async()=>view.button('试听已保存配置').click())
  assert.equal(calls.filter(q=>q.action==='preview-tts').length,1)
  await change('/chosen/another.wav')
  assert.equal(view.container.querySelector('[data-reference-voice] input[type="checkbox"]'),null,'changing the sample adds no per-file declaration')
  assert.equal(settings.ttsSetup.referenceAudioPath,'/chosen/my-voice.wav','choosing another file does not save it')
  assert.equal(view.button('保存朗读设置').disabled,false)
  await view.act(async()=>[...view.container.querySelectorAll('input[type=radio]')].find(input=>input.closest('label')?.textContent.includes('不发声')).click())
  assert.ok(view.button('清除参考音色'),'an unconfirmed draft stays clearable when its local provider is hidden')
  await view.act(async()=>view.button('清除参考音色').click())
  assert.equal(controller.getSnapshot().settingsKey,'r2','button-based clear preserves the edited revision')
  await view.act(async()=>view.button('保存朗读设置').click())
  assert.equal(settings.ttsSetup.referenceAudioPath,null);assert.equal(settings.ttsSetup.referenceAudioAccepted,false)
  assert.equal(calls.some(q=>['enable','start-model-install'].includes(q.action)),false)
  await view.close()
})
