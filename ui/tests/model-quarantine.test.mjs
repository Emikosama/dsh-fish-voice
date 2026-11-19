import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
import { renderAvailable, renderControls } from '../../tests/helpers/render-controls.mjs'

test('model settings keep a healthy install and offer a new plan beside the quarantined job', { skip:!renderAvailable }, async t => {
  const modelId = 'qwen3-tts-base-1.7b-gguf'
  const ttsSetup = { provider:'local', systemVoiceId:null, deepseekVoice:'stella', deepseekTextTransmissionAccepted:false, volume:.8, localModelId:modelId, localModelPath:'/healthy' }
  const settings = { revision:'r1', values:{device:null,pttMouse:2,speakerVerification:{enabled:false}}, ttsSetup }
  const status = { enabled:false, ownerSessionId:null, helper:{online:false}, voiceControlBusy:false, voiceSession:{id:null,fullyStopped:true}, ttsRuntime:{state:'idle',busy:false,blocked:false} }
  const healthy = { id:'healthy-job', modelId, purpose:'tts', compute:'cpu', status:'installed', stage:'installed', totalBytes:100, receivedBytes:100, installedPath:'/healthy', runtimeLoaded:false }
  const blocked = { id:'old-job', modelId, compute:'cpu', status:'blocked', stage:'blocked', totalBytes:null, receivedBytes:0, runtimeLoaded:false, error:{code:'CATALOG_CHANGED',message:'请重新确认安装计划。'} }
  const installer = { schema:1, hardware:{}, compute:{}, models:[{id:modelId,title:'Qwen3-TTS',purpose:'tts',available:true,runtimeLoaded:false}], jobs:[healthy,blocked], ttsInstallIntent:{jobId:blocked.id, modelId, status:'verifying', reason:null} }
  const calls = []
  const controller = createController(async (_id, request) => {
    calls.push(request)
    if (request.action === 'read-settings') return settings
    if (request.action === 'model-installer') return installer
    if (request.action === 'inspect-tts') return { platform:'win32', playbackSupported:true, deepseekKeyAvailable:false, autoDownload:false, gpuSupported:false }
    if (request.action === 'plan-model-install') return { modelId, compute:'cpu', totalBytes:100, destination:'/new', files:[], planHash:'new-plan', licenseUrls:[] }
    if (request.action === 'start-model-install') return { ...blocked, id:'replacement-job', status:'queued', stage:'queued', totalBytes:100, error:null }
    return status
  })
  t.after(() => controller.dispose())
  controller.setSession('A')
  await controller.run('A', 'read-settings')
  await controller.run('A', 'status')
  await controller.openSettings('models', 'download')
  const view = await renderControls(t, { controller, owner:{id:'A'} })
  const click = button => view.act(async () => button.click())
  const oldRow = view.container.querySelector('[data-model-job="old-job"]')
  assert.match(oldRow.textContent, /安装清单已变更，旧任务已隔离/)
  assert.match(oldRow.textContent, /请重新确认安装计划。/)
  assert.equal(oldRow.querySelector('button, progress'), null)
  assert.match(view.container.querySelector('[data-model-job="healthy-job"]').textContent, /当前配置/)

  await click(view.button('朗读方式'))
  await click([...view.container.querySelectorAll('button[aria-expanded]')].find(button => button.textContent === '切换当前模型' && !button.closest('[hidden]')))
  assert.equal(view.button('试听已保存配置').disabled, false)
  const local = view.container.querySelector('[aria-label="下载本地语音模型"]')
  const details = local.closest('details')
  await click(details.querySelector('summary'))
  assert.equal(details.open, true)
  assert.equal(local.querySelector('select[aria-label="本地计算"]').disabled, false)
  assert.match(local.textContent, /本地模型已保存，可试听/)
  assert.equal(calls.filter(request => request.action === 'start-model-install').length, 0)
  const replacement = view.button('下载并使用')
  assert.equal(replacement.disabled, false)
  await click(replacement)
  assert.deepEqual(calls.filter(request => request.action === 'start-model-install'), [
    { action:'start-model-install', modelId, compute:'cpu', planHash:'new-plan', accepted:true, useWhenReady:true },
  ])
  assert.equal(calls.some(request => request.id === blocked.id), false)
  assert.equal(controller.getSnapshot().settings.ttsSetup.localModelPath, '/healthy')
  await view.close()
})
