import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createModelInstaller, recommendModel } from '../voice-model-installer.mjs'
import { modelSnapshotCodec, actionRequestCodec, conversationRemote } from '../ui/conversation-contract.mjs'
import { createVoiceAgentControl } from '../voice-agent-control.mjs'
import { dispatchUiAction } from '../ui/host.mjs'

test('real default catalog including Qwen and Melo crosses strict model and authorization codecs', async t => {
  const root=await mkdtemp(join(tmpdir(),'whale-tts-wire-'))
  const installer=createModelInstaller({root});t.after(async()=>{await installer.close();await rm(root,{recursive:true,force:true})})
  const snapshot={...installer.snapshot(),ttsInstallIntent:null}
  assert.deepEqual(modelSnapshotCodec.create().parse(snapshot),snapshot)
  for(const hardware of [{totalMemoryBytes:4*1024**3,availableMemoryBytes:2*1024**3},{totalMemoryBytes:16*1024**3,availableMemoryBytes:2*1024**3},{totalMemoryBytes:16*1024**3,availableMemoryBytes:8*1024**3},{totalMemoryBytes:null,availableMemoryBytes:null}]){
    const varied={...snapshot,models:snapshot.models.map(model=>({...model,recommendation:recommendModel(model.id,hardware)}))}
    assert.deepEqual(modelSnapshotCodec.create().parse(varied),varied)
  }
  const tts=snapshot.models.filter(model=>model.purpose==='tts'&&model.available)
  if(['linux','win32'].includes(process.platform)&&process.arch==='x64')assert.equal(tts.length,2)
  for(const model of tts){const plan=installer.plan(model.id,'cpu');assert.ok(plan.runtime.sources.length);assert.equal(plan.purpose,'tts')}
  const control=createVoiceAgentControl({api:{},assertCaller(){},authorizationSources:()=>snapshot.models})
  const auth=control.humanApi.readAuthorization()
  const codec=conversationRemote.descriptors.find(row=>row.method==='readAuthorization').result
  assert.deepEqual(codec.create().parse(auth),auth)
})
test('explicit download-use intent survives strict request and host dispatcher without arbitrary fields',async()=>{
  const request={action:'start-model-install',modelId:'qwen3-tts-base-1.7b-gguf',compute:'cpu',planHash:'bounded',accepted:true,useWhenReady:true}
  assert.deepEqual(actionRequestCodec.create().parse(request),request)
  let received
  await dispatchUiAction({startModelInstall(value){received=value;return{}}},{session:{id:'owner'}},request)
  assert.equal(received.useWhenReady,true)
  assert.throws(()=>actionRequestCodec.create().parse({...request,executable:'/bin/sh'}))
  assert.throws(()=>actionRequestCodec.create().parse({...request,useWhenReady:'yes'}))
})
