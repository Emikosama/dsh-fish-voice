/** Fail closed for the new setup surfaces before rendering server data. */
const object = x => x !== null && typeof x === 'object' && !Array.isArray(x)
const text = (x,max=1024) => typeof x === 'string' && x.length <= max
const finite = x => typeof x === 'number' && Number.isFinite(x)
const flag = x => typeof x === 'boolean'
const url = x => { if (!text(x,4096)) return false; try { const u=new URL(x); return ['https:','http:'].includes(u.protocol) && !u.username && !u.password } catch { return false } }
const optionalText = (x,max=4096) => x == null || text(x,max)
const id = x => text(x,256) && x.length > 0
const ttsProviders = ['deepseek','local','custom','off']
const nonemptyText = (x,max) => text(x,max) && Boolean(x.trim())
const customTtsKeys = ['baseUrl','model','voice','apiKeyEnv','format','textTransmissionAccepted']
const customTts = x => object(x) && Object.keys(x).every(key=>customTtsKeys.includes(key))
  && nonemptyText(x.baseUrl,2048) && nonemptyText(x.model,256) && nonemptyText(x.voice,256)
  && (x.apiKeyEnv === null || nonemptyText(x.apiKeyEnv,128) && /^[A-Za-z_][A-Za-z0-9_]*$/.test(x.apiKeyEnv))
  && ['wav','mp3'].includes(x.format) && flag(x.textTransmissionAccepted)
const fail = () => { throw new Error('配置接口返回了无效数据，请重新读取') }
export function validateSetupFields(value) {
  if (value.onboarding !== undefined && (!object(value.onboarding) || value.onboarding.version !== 1 || !flag(value.onboarding.completed))) fail()
  if (value.ttsSetup !== undefined) {
    const t=value.ttsSetup
    if (!object(t) || !ttsProviders.includes(t.provider) || !['stella','tide'].includes(t.deepseekVoice) || !flag(t.deepseekTextTransmissionAccepted) || !finite(t.volume) || t.volume<0 || t.volume>1 || !(t.localModelId==null||id(t.localModelId)) || !optionalText(t.localModelPath) || !optionalText(t.referenceAudioPath) || !(t.referenceAudioAccepted===undefined||flag(t.referenceAudioAccepted))
      || (t.customTts === undefined ? t.provider === 'custom' : !customTts(t.customTts))) fail()
  }
  if (value.ttsRuntime?.localComputeBackend != null && (!['cpu','vulkan','cuda','hip'].includes(value.ttsRuntime.localComputeBackend) || !flag(value.ttsRuntime.localComputeVerified) || !flag(value.ttsRuntime.localComputeFallback))) fail()
  if (value.ttsRuntime?.localTimings != null) {
    const t = value.ttsRuntime.localTimings
    if (!object(t) || typeof t.modelResident !== 'boolean' || ['preparationMs','deviceSelectionMs','synthesisMs','playbackMs','totalMs','chunks'].some(key=>!Number.isSafeInteger(t[key])||t[key]<0) || t.chunks<1 || t.chunks>4000) fail()
  }
  if (value.ttsRuntime != null && (!object(value.ttsRuntime) || !text(value.ttsRuntime.state,64) || !flag(value.ttsRuntime.busy) || !flag(value.ttsRuntime.blocked)
    || (value.ttsRuntime.provider != null && !ttsProviders.includes(value.ttsRuntime.provider)))) fail()
  return value
}
export function decodeSetupReply(action,value) {
  if (!object(value)) fail()
  if(action==='setup-status') { if(Object.keys(value).some(k=>!['version','completed'].includes(k)) || value.version!==1 || !flag(value.completed)) fail() }
  if(action==='inspect-tts') {
    if (!text(value.platform,32) || !flag(value.playbackSupported) || !flag(value.deepseekKeyAvailable) || value.autoDownload!==false || !flag(value.gpuSupported)) fail()
  }
  if(action==='preview-tts') {
    if (!['deepseek','local','custom'].includes(value.provider) || value.fallback!==false || value.acousticConfirmation!==false || value.playbackCompleted!==true || value.textOnly!==undefined) fail()
  }
  if(action==='cancel-tts' && !['idle','cancelled','unconfirmed'].includes(value.status))fail()
  if(action==='model-installer') {
    if(value.schema!==1 || !Array.isArray(value.models) || value.models.length>100 || !Array.isArray(value.jobs) || value.jobs.length>1000 || !object(value.hardware) || !object(value.compute)) fail()
    if(value.refresh!=null){const r=value.refresh;if(!object(r)||!flag(r.pending)||!optionalText(r.observedAt,64)||!optionalText(r.attemptedAt,64)||!optionalText(r.error,512)||!(r.intervalMs===undefined||finite(r.intervalMs)&&r.intervalMs>0&&r.intervalMs<=3600000))fail()}
    for(const model of value.models) {
      if(!object(model)||!id(model.id)||!flag(model.available)||model.runtimeLoaded!==false||!optionalText(model.title)||!optionalText(model.reason)||!(model.totalBytes==null||finite(model.totalBytes)&&model.totalBytes>=0))fail()
      if(model.recommendation!=null&&(!object(model.recommendation)||!flag(model.recommendation.recommended)||!optionalText(model.recommendation.reason)))fail()
    }
    for(const job of value.jobs) validateJob(job)
    if(value.ttsInstallIntent!=null){const t=value.ttsInstallIntent;if(!object(t)||!id(t.jobId)||!id(t.modelId)||!['waiting','verifying','applied','blocked','paused','cancelled'].includes(t.status)||!optionalText(t.reason))fail()}
  }
  if(action==='inspect-model-compute' && (!object(value.compute) && !object(value.backends))) fail()
  if(action==='plan-model-install') {
    if(value.reused!==undefined && (!flag(value.reused)||value.reused!==true||!text(value.sourceDirectory,4096)||!value.sourceDirectory||!['q4_k_m','q8_0'].includes(value.modelVariant)||!finite(value.reusedBytes)||value.reusedBytes<0))fail()
    if(value.reused!==true && (value.sourceDirectory!==undefined||value.modelVariant!==undefined||value.reusedBytes!==undefined))fail()
    if(Array.isArray(value.files)&&value.files.some(file=>object(file)&&file.reused!==undefined&&!flag(file.reused)))fail()
    if(!id(value.modelId)||!['cpu','auto','cuda','vulkan'].includes(value.compute)||!text(value.planHash,128)||!Array.isArray(value.files)||value.files.length>200||!finite(value.totalBytes)||value.totalBytes<0||!text(value.destination,4096)||!Array.isArray(value.licenseUrls)||value.licenseUrls.some(link=>!url(link))||!optionalText(value.source)||!optionalText(value.notice)||!optionalText(value.licenseNote)||value.files.some(file=>!object(file)||!id(file.name)||!finite(file.bytes)||file.bytes<0||!text(file.sha256,64)||!/^[a-f0-9]{64}$/i.test(file.sha256)||!url(file.url)))fail()
  }
  if(['start-model-install','control-model-install'].includes(action)) validateJob(value)
  return validateSetupFields(value)
}
function validateJob(job) {
  if(object(job)&&job.error!=null&&(!object(job.error)||!text(job.error.message,512)))fail()
  if(!object(job)||!id(job.id)||!id(job.modelId)||!['cpu','auto','cuda','vulkan'].includes(job.compute)||!['queued','running','paused','failed','cancelled','installed'].includes(job.status)||!text(job.stage,128)||!finite(job.receivedBytes)||job.receivedBytes<0||!(job.totalBytes===null||finite(job.totalBytes)&&job.totalBytes>=0)||job.runtimeLoaded!==false)fail()
}
