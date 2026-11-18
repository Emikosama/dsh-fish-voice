import { validAudioDevice, validAudioInventory } from '../../voice-audio-device-contract.mjs'
import {validWake,validWakeAliases,LISTEN_MODES} from './listen-modes.mjs'
import { validInputDevices } from './input-devices.mjs'
import { existingVoiceSessionSchema } from '../conversation-contract.mjs'
import { decodeSetupReply, validateSetupFields } from './setup-protocol.mjs'
/** Validate the remote command result before a malformed snapshot reaches a renderer. */
export function decodeReply(action, input) {
  const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
  const id = value => typeof value === 'string' && value.length > 0 && value.length <= 256
  const keyboardBinding = value => value === null || object(value) && Object.keys(value).sort().join(',') === 'code,modifiers'
    && typeof value.code === 'string' && /^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(value.code)
    && Array.isArray(value.modifiers) && value.modifiers.length <= 3 && new Set(value.modifiers).size === value.modifiers.length
    && value.modifiers.every(key => ['Control','Alt','Shift'].includes(key)) && !(value.code === 'F4' && value.modifiers.includes('Alt'))
  if (!object(input)) throw new Error('Fish Voice UI returned invalid data')
  if(input.wake!==undefined&&!(input.wake===null&&action!=='conversation')&&!validWake(input.wake))throw new Error('Invalid wake state')
  if(input.listenMode!==undefined&&input.listenMode!==null&&!LISTEN_MODES.includes(input.listenMode))throw new Error('Invalid listening mode')
  if (['status', 'enable', 'disable', 'new', 'resume', 'listen-mode'].includes(action)) {
    if (!(input.ownerSessionId === null || id(input.ownerSessionId)) || typeof input.enabled !== 'boolean' || !object(input.helper) || typeof input.helper.online !== 'boolean') throw new Error('Fish Voice UI returned an invalid status')
    if (input.existingVoiceSessionSupported !== undefined && typeof input.existingVoiceSessionSupported !== 'boolean') throw new Error('Invalid existing session support')
    if (input.existingVoiceSession != null && !existingVoiceSessionSchema.safeParse(input.existingVoiceSession).success) throw new Error('Invalid existing voice session')
    if (input.helper.lastError != null && (typeof input.helper.lastError !== 'string' || input.helper.lastError.length > 512)) throw new Error('Invalid audio diagnostic')
  } else if (['save-voice-prompt','save-conversation-model','save-bindings','read-settings', 'save-settings', 'save-audio-device', 'save-models', 'set-visibility', 'set-performance-mode', 'save-tts', 'complete-setup', 'apply-model-install'].includes(action)) {
    if(input.bindingContext!==undefined&&(!object(input.bindingContext)||['ownerSessionId','epoch','rootSessionId'].some(key=>input.bindingContext[key]!==null&&!id(input.bindingContext[key]))))throw new Error('Invalid binding context')
    const values = input.values
    if (typeof input.revision !== 'string' || !input.revision || !object(values) || ![0, 1, 2].includes(values.pttMouse) || !object(values.speakerVerification) || typeof values.speakerVerification.enabled !== 'boolean'
      || !(validAudioDevice(values.device) || typeof values.device === 'string' && values.device.length <= 256 && !/[\u0000-\u001f\u007f]/.test(values.device) || Number.isSafeInteger(values.device) && values.device >= 0)) throw new Error('Fish Voice UI returned invalid settings')
    if(values.wakeWordAliases!==undefined&&!validWakeAliases(values.wakeWordAliases))throw new Error('Invalid wake aliases')
    if(values.wakeListenTimeoutMs!==undefined&&(!Number.isInteger(values.wakeListenTimeoutMs)||values.wakeListenTimeoutMs<3000||values.wakeListenTimeoutMs>30000))throw new Error('Invalid wake timeout')
    if (values.semanticExperimental !== undefined && typeof values.semanticExperimental !== 'boolean') throw new Error('Invalid experimental wake setting')
    if (values.pttKeyboard !== undefined && !keyboardBinding(values.pttKeyboard)) throw new Error('Invalid keyboard binding')
    if (input.capabilities?.pttKeyboard !== undefined) {
      const cap = input.capabilities.pttKeyboard
      if (!object(cap) || typeof cap.supported !== 'boolean' || cap.scope !== 'global' || cap.platform !== 'win32' || !['available','unsupported'].includes(cap.status) || !(cap.reason == null || typeof cap.reason === 'string') || cap.supported !== (cap.status === 'available')) throw new Error('Invalid keyboard capability')
    }
    if (input.modelSetup !== undefined && (!object(input.modelSetup) || input.modelSetup.asr !== 'sensevoice' || !object(input.modelSetup.models) || input.modelSetup.modelCompute !== undefined && !['cpu','auto','cuda'].includes(input.modelSetup.modelCompute) || ['sensevoiceDir', 'campplus'].some(key => typeof input.modelSetup.models[key] !== 'string'))) throw new Error('Fish Voice UI returned invalid model configuration')
    if (input.capabilities?.turnSignals === true) {
      const sound = values.turnSignals
      if (!object(sound) || typeof sound.enabled !== 'boolean' || typeof sound.headphonesConfirmed !== 'boolean' || typeof sound.experimentalAutomaticBargeIn !== 'boolean' || typeof sound.volume !== 'number' || !Number.isFinite(sound.volume) || sound.volume < 0 || sound.volume > 1) throw new Error('Fish Voice UI returned invalid turn sound settings')
    }
  } else if (action === 'list') {
    if (!Array.isArray(input.items) || input.items.length > 50 || !(input.nextCursor == null || typeof input.nextCursor === 'string' && input.nextCursor.length <= 2048)
      || input.items.some(item => !object(item) || !id(item.id) || typeof item.archived !== 'boolean' || typeof item.available !== 'boolean' || typeof item.canResume !== 'boolean' || (item.title !== undefined && typeof item.title !== 'string') || (item.reason !== undefined && typeof item.reason !== 'string'))) throw new Error('Fish Voice UI returned invalid voice history')
  }
  if (input.voicePrompt !== undefined) {
    const prompt=input.voicePrompt
    if (!object(prompt)||typeof prompt.text!=='string'||prompt.text.length>32768||!['agents','custom'].includes(prompt.mode)||typeof prompt.customSupported!=='boolean'||!(prompt.unsupportedReason===null||typeof prompt.unsupportedReason==='string'&&prompt.unsupportedReason.length<=512)||prompt.mode==='custom'&&(!prompt.text.trim()||!prompt.customSupported)||prompt.mode==='agents'&&prompt.customSupported&&Boolean(prompt.text.trim())) throw new Error('Invalid voice prompt preference')
  }
  if (input.conversationModel !== undefined && (!object(input.conversationModel) || !['auto','manual'].includes(input.conversationModel.mode) || ![input.conversationModel.provider,input.conversationModel.model].every(x=>x===null||id(x)) || input.conversationModel.mode==='auto' && (input.conversationModel.provider!==null||input.conversationModel.model!==null))) throw new Error('Invalid conversation model preference')
  if (action === 'conversation-models' && (!Array.isArray(input.providers) || input.providers.length>256 || new Set(input.providers.map(p=>p?.id)).size!==input.providers.length || input.providers.some(p=>!object(p)||!id(p.id)||!id(p.name)||!Array.isArray(p.models)||p.models.length>2048||new Set(p.models.map(m=>m?.id)).size!==p.models.length||p.models.some(m=>!object(m)||!id(m.id)||!id(m.name))))) throw new Error('Invalid conversation model catalog')
  if (action === 'read-audio-devices' && !validAudioInventory(input)) throw new Error('Invalid audio device inventory')
  if (input.audioDevices !== undefined && (!object(input.audioDevices) || !validAudioDevice(input.audioDevices.output) || !(validAudioDevice(input.audioDevices.input) || typeof input.audioDevices.input === 'string' || Number.isSafeInteger(input.audioDevices.input)))) throw new Error('Invalid audio device preferences')
  if (action === 'inspect-performance' && (!Array.isArray(input.modes) || input.modes.some(item => !object(item) || !['fast','balanced','high'].includes(item.performanceMode) || typeof item.available !== 'boolean'))) throw new Error('Invalid performance capabilities')
  if (action === 'read-history') {
    if (!(input.rootSessionId===null||id(input.rootSessionId)) || !Number.isSafeInteger(input.generation) || input.generation < 0 || !Number.isSafeInteger(input.revision) || input.revision < 0 || !['voice-session','current-voice-session'].includes(input.scope) || typeof input.truncated !== 'boolean' || !(input.nextCursor === null || typeof input.nextCursor === 'string' && /^\d+:\d+$/.test(input.nextCursor)) || !Array.isArray(input.items) || input.items.length > 100 || new Set(input.items.map(row=>row?.id)).size !== input.items.length || input.items.some(row=>!object(row)||!id(row.id)||!['user','assistant'].includes(row.role)||typeof row.text!=='string'||row.text.length>8000||!['reply','interrupted','delivered','speech-requested','speech-failed'].includes(row.state)||!Number.isFinite(row.at))) throw new Error('Invalid conversation history')
  }
  if (action === 'conversation') {
    if (input.helper !== undefined && (!object(input.helper) || typeof input.helper.online !== 'boolean' || !(input.helper.listenMode === null || LISTEN_MODES.includes(input.helper.listenMode)) || !input.helper.online && input.helper.listenMode !== null)) throw new Error('Invalid conversation helper state')
    if (input.inputError != null && !['device','recognition','no-speech'].includes(input.inputError)) throw new Error('Invalid input error')
    if (input.providerError !== undefined && (typeof input.providerError !== 'string' || input.providerError.length > 480)) throw new Error('Invalid provider error')
    if (!Number.isSafeInteger(input.revision) || input.revision < 0 || input.title !== null || !(input.rootSessionId === null || id(input.rootSessionId)) || !Array.isArray(input.items) || input.items.length > 40 || typeof input.inputActive !== 'boolean' || input.playbackConfirmed !== false || input.items.some(row => !object(row) || !id(row.id) || !['user','assistant'].includes(row.role) || typeof row.text !== 'string' || row.text.length > 8000 || !['reply','interrupted','delivered','speech-requested','speech-failed'].includes(row.state) || !Number.isFinite(row.at)) || (input.latest !== null && (!object(input.latest) || !input.items.some(row => row.id === input.latest.id && row.text === input.latest.text && row.role === 'assistant')))) throw new Error('Invalid conversation snapshot')
  }
  if (action === 'output-volume' && (typeof input.supported !== 'boolean' || input.supported && (typeof input.volume !== 'number' || !Number.isFinite(input.volume) || input.volume < 0 || input.volume > 1 || input.revision == null))) throw new Error('Invalid output volume snapshot')
  if (['agent-permissions','save-agent-permissions'].includes(action)) {
    const operations = ['set-performance-mode','set-visibility','set-output-volume']
    if (input.schema !== 1 || !id(input.revision) || !Array.isArray(input.items) || input.items.length !== 3 || new Set(input.items.map(item => item?.operation)).size !== 3 || input.items.some(item => !object(item) || !operations.includes(item.operation) || typeof item.allowed !== 'boolean' || typeof item.title !== 'string' || item.title.length > 128 || !(item.reason === null || typeof item.reason === 'string' && item.reason.length <= 1024))) throw new Error('Invalid agent permissions')
  }
  if (['agent-requests','decide-agent-request'].includes(action)) {
    const validRequest = item => object(item) && id(item.id) && id(item.sourceSessionId) && id(item.operation) && typeof item.title === 'string' && item.title.length <= 128
      && ['pending','executing','completed','blocked','unknown','superseded','expired','cancelled','rejected'].includes(item.state)
      && Number.isFinite(item.createdAt) && Number.isFinite(item.expiresAt) && Number.isSafeInteger(item.humanRevision)
      && object(item.request) && object(item.before) && Array.isArray(item.acknowledgements) && item.acknowledgements.length <= 10
      && item.acknowledgements.every(ack => object(ack) && id(ack.id) && typeof ack.text === 'string' && ack.text.length <= 1024)
      && (item.error === null || object(item.error) && typeof item.error.code === 'string' && typeof item.error.message === 'string' && item.error.message.length <= 1024)
      && (item.nextAction === null || typeof item.nextAction === 'string' && item.nextAction.length <= 1024)
    if (input.schema !== 1 || !Number.isSafeInteger(input.humanRevision) || input.humanRevision < 0 || !Array.isArray(input.items) || input.items.length > 100 || input.items.some(item => !validRequest(item))
      || action === 'decide-agent-request' && (!validRequest(input.lastOutcome) || !input.items.some(item => item.id === input.lastOutcome.id && item.state === input.lastOutcome.state))) throw new Error('Invalid agent request snapshot')
  }
  if (action === 'authorization') {
    if(input.usageAgreement!==undefined&&(!object(input.usageAgreement)||input.usageAgreement.version!==1||typeof input.usageAgreement.accepted!=='boolean'||!Array.isArray(input.usageAgreement.text)||input.usageAgreement.text.length>16||input.usageAgreement.text.some(value=>typeof value!=='string'||value.length>4096)))throw new Error('Invalid usage agreement snapshot')
    if(input.schema!==1||!id(input.revision)||!Array.isArray(input.blockedOperations)||input.blockedOperations.some(operation=>typeof operation!=='string')||typeof input.revocationUnconfirmed!=='boolean'||typeof input.completed!=='boolean'||typeof input.granted!=='boolean'||!Array.isArray(input.scopes)||input.scopes.length>16||new Set(input.scopes.map(row=>row?.id)).size!==input.scopes.length||input.scopes.some(row=>!object(row)||!id(row.id)||typeof row.title!=='string'||typeof row.description!=='string'||typeof row.allowed!=='boolean')||!Array.isArray(input.modelSources)||input.modelSources.length>32||input.modelSources.some(row=>!object(row)||!id(row.modelId)||typeof row.source!=='string'||!Array.isArray(row.licenseUrls)||row.licenseUrls.some(url=>typeof url!=='string')||typeof row.licenseNote!=='string')||!Array.isArray(input.restrictions)||input.restrictions.some(row=>typeof row!=='string'))throw new Error('Invalid authorization snapshot')
  }
  if (input.inferenceCompute != null) {
    const c=input.inferenceCompute
    if (!object(c) || !['cpu','auto','cuda'].includes(c.requested) || ![null,'cpu','cuda'].includes(c.actual) || c.engine !== 'sensevoice' || !(c.computeType===null || ['int8','float16','int8_float16','int8_float32','float32'].includes(c.computeType)) || !(c.deviceIndex===null || Number.isSafeInteger(c.deviceIndex)&&c.deviceIndex>=0&&c.deviceIndex<8) || ![null,'gpu-unavailable','gpu-load-failed','gpu-inference-failed','model-gpu-unverified'].includes(c.fallbackReason) || typeof c.validated!=='boolean') throw new Error('Invalid inference compute status')
  }
  if (input.inputDevices !== undefined && !validInputDevices(input.inputDevices)) throw new Error('Invalid input device inventory')
  if (input.ptt?.keyboard !== undefined && input.ptt.keyboard !== null) {
    const key = input.ptt.keyboard
    if (!object(key) || typeof key.supported !== 'boolean' || key.scope !== 'global' || !['unsupported','active','inactive','unknown'].includes(key.status) || typeof key.hookInstalled !== 'boolean' || typeof key.recording !== 'boolean' || !(key.observedAt == null || Number.isFinite(key.observedAt))) throw new Error('Invalid keyboard status')
  }
  if(input.voiceSession?.recovery!==undefined){const r=input.voiceSession.recovery;if(!object(r)||(r.stopVerified!==undefined&&typeof r.stopVerified!=='boolean')||r.stopVerified===true&&(r.kind!=='none'||input.voiceSession.fullyStopped!==true)||!['none','live-root-conflict','predecessor-cleanup-pending','predecessor-stop-unconfirmed','helper-cleanup-pending','helper-stop-unconfirmed'].includes(r.kind)||!(r.rootSessionId===null||id(r.rootSessionId))||r.kind!=='none'&&input.voiceSession.fullyStopped===true)throw new Error('Invalid voice recovery state')}
  if (input.voiceSession?.visibility !== undefined && !['hidden', 'workspace'].includes(input.voiceSession.visibility)) throw new Error('Fish Voice UI returned invalid visibility')
  if (input.voiceCapabilities !== undefined) {
    const capabilities = input.voiceCapabilities
    if (!object(capabilities) || !(capabilities.configuredVisibility === null || ['hidden', 'workspace'].includes(capabilities.configuredVisibility)) || ['hidden', 'workspace'].some(key => !object(capabilities[key]) || typeof capabilities[key].supported !== 'boolean') || !object(capabilities.taskHandoff) || typeof capabilities.taskHandoff.mode !== 'string') throw new Error('Fish Voice UI returned invalid host capabilities')
  }
  validateSetupFields(input)
  if (['setup-status','inspect-tts','preview-tts','cancel-tts','model-installer','inspect-model-compute','plan-model-install','start-model-install','control-model-install'].includes(action)) decodeSetupReply(action,input)
  return input
}
