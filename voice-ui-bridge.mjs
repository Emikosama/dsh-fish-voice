import { conversationModel, validateConversationModel } from './voice-conversation-model.mjs'
import { VoicePreflightError } from './voice-operation-outcome.mjs'
/** Narrow human UI adapter: cached status, revision-fenced audio preferences, and explicit voice-history actions. */
import { createTtsInstallIntent } from './voice-tts-install-intent.mjs'
import { audioPreferences, validAudioDevice, validAudioInventory } from './voice-audio-devices.mjs'
import { ttsSettings, validateTtsSettings, TTS_SETUP_VERSION } from './voice-tts.mjs'
import { performancePreference, ttsResidencyCapability } from './voice-performance.mjs'
import { createHash, randomUUID } from 'node:crypto'
import { closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const AUDIO_KEYS = new Set(['device', 'pttMouse', 'pttKeyboard', 'speakerVerification', 'turnSignals', 'semanticExperimental', 'wakeWordAliases', 'wakeListenTimeoutMs'])
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key)
const fail = message => { throw new Error(message) }
// Set only by the owner-authenticated Gateway, never supplied in a request.
export const ownerSettings = Symbol('whale-owner-settings')

/** Candidate inventory from an already requested helper status; never probe on UI reads.
 * Availability describes enumeration only, not permission or a working microphone.
 */
export function inputDevicesSnapshot(raw, online = true) {
  const unknown = { status: 'unknown', items: [], observedAt: null }
  if (!online || !raw || !Number.isFinite(raw.observedAt) || raw.observedAt < 0) return unknown
  const unavailable = { status: 'unavailable', items: [], observedAt: raw.observedAt }
  if (!Array.isArray(raw.items) || raw.items.length > 128) return unavailable
  const seen = new Set()
  const items = []
  for (const item of raw.items) {
    if (!object(item) || !Number.isSafeInteger(item.index) || item.index < 0 || seen.has(item.index)
      || typeof item.name !== 'string' || !item.name.trim() || item.name.length > 256 || /[\u0000-\u001f\u007f]/.test(item.name)) return unavailable
    seen.add(item.index)
    items.push({ index: item.index, name: item.name })
  }
  return { status: items.length ? 'available' : 'empty', items, observedAt: raw.observedAt }
}
export function inferenceComputeSnapshot(raw) {
  if (!object(raw) || !['cpu','auto','cuda'].includes(raw.requested) || !['cpu','cuda',null].includes(raw.actual)
    || raw.engine !== 'sensevoice' || !(raw.computeType === null || ['int8','float16','int8_float16','int8_float32','float32'].includes(raw.computeType))
    || !(raw.deviceIndex === null || Number.isSafeInteger(raw.deviceIndex) && raw.deviceIndex >= 0 && raw.deviceIndex < 8)
    || ![null,'gpu-unavailable','gpu-load-failed','gpu-inference-failed','model-gpu-unverified'].includes(raw.fallbackReason) || typeof raw.validated !== 'boolean') return null
  return Object.fromEntries(['requested','actual','engine','computeType','deviceIndex','fallbackReason','validated'].map(key => [key,raw[key]]))
}
function validateExpectedOwner(value) {
  if (!(value === undefined || value === null || typeof value === 'string' && value.length > 0 && value.length <= 256 && !/[\u0000-\u001f\u007f]/.test(value))) fail('语音所属会话校验无效')
}

function actorId(agent) {
  const id = agent?.session?.id
  if (typeof id !== 'string' || !id || id.length > 256) fail('无法确认操作来源会话')
  return id
}
function notAborted(signal) { if (signal?.aborted) fail('操作已取消') }
function exactly(value, keys, label) {
  if (!object(value) || Object.keys(value).some(key => !keys.includes(key)) || keys.some(key => !own(value, key))) fail(`${label}字段无效`)
}
function soundValues(value) {
  exactly(value, ['enabled', 'volume', 'headphonesConfirmed', 'experimentalAutomaticBargeIn'], '音效')
  if (typeof value.enabled !== 'boolean' || typeof value.volume !== 'number' || !Number.isFinite(value.volume) || value.volume < 0 || value.volume > 1) fail('音效音量应在 0 到 1 之间')
  if (typeof value.headphonesConfirmed !== 'boolean' || typeof value.experimentalAutomaticBargeIn !== 'boolean') fail('耳机确认与实验打断开关无效')
  if (value.experimentalAutomaticBargeIn && !value.headphonesConfirmed) fail('实验自动打断需要先明确确认使用耳机')
  return { enabled: value.enabled, volume: value.volume, headphonesConfirmed: value.headphonesConfirmed, experimentalAutomaticBargeIn: value.experimentalAutomaticBargeIn }
}
function audioValues(config, turnSignalsSupported) {
  const value = {
    device: config.device ?? null,
    pttMouse: config.pttMouse,
    pttKeyboard: config.pttKeyboard ?? null,
    speakerVerification: { enabled: config.speakerVerification?.enabled === true },
    semanticExperimental: config.semanticExperimental ?? (config.semantic?.experimentalEnabled === true),
    wakeWordAliases: config.wakeWordAliases ?? ['小鲸鱼'],
    wakeListenTimeoutMs: config.wakeListenTimeoutMs ?? 10000,
  }
  if (turnSignalsSupported) {
    const stored = object(config.turnSignals) ? config.turnSignals : {}
    value.turnSignals = soundValues({ enabled: stored.enabled ?? true, volume: stored.volume ?? 0.2, headphonesConfirmed: stored.headphonesConfirmed ?? false, experimentalAutomaticBargeIn: stored.experimentalAutomaticBargeIn ?? false })
  }
  validateValues(value, turnSignalsSupported)
  if (value.pttKeyboard) value.pttKeyboard = { code: value.pttKeyboard.code, modifiers: ['Control', 'Alt', 'Shift'].filter(x => value.pttKeyboard.modifiers.includes(x)) }
  return value
}
function validateValues(values, turnSignalsSupported) {
  if (!object(values) || Object.keys(values).some(key => !AUDIO_KEYS.has(key))) fail('设置包含不支持的字段；不能在这里改变语音授权或路由')
  if (!own(values, 'device') || !(validAudioDevice(values.device) || typeof values.device === 'string' && values.device.length <= 256 && !/[\u0000-\u001f\u007f]/.test(values.device) || Number.isSafeInteger(values.device) && values.device >= 0)) fail('输入设备必须是有效设备、名称、非负序号或空值')
  if (![0, 1, 2].includes(values.pttMouse)) fail('按住说话侧键应为 0、1 或 2')
  if (own(values, 'pttKeyboard') && values.pttKeyboard !== null) {
    exactly(values.pttKeyboard, ['code', 'modifiers'], '键盘绑定')
    if (typeof values.pttKeyboard.code !== 'string' || !/^(?:F(?:[1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(values.pttKeyboard.code)) fail('键盘主键仅支持 F1–F24、A–Z、0–9、Space')
    const modifiers = values.pttKeyboard.modifiers
    if (!Array.isArray(modifiers) || modifiers.some(x => !['Control', 'Alt', 'Shift'].includes(x)) || new Set(modifiers).size !== modifiers.length) fail('修饰键仅支持 Control、Alt、Shift，不能重复或使用 Meta')
    if (values.pttKeyboard.code === 'F4' && modifiers.includes('Alt')) fail('Alt+F4 是系统保留组合')
  }
  exactly(values.speakerVerification, ['enabled'], '声纹过滤')
  if (typeof values.speakerVerification.enabled !== 'boolean') fail('声纹过滤开关无效')
  if (own(values, 'semanticExperimental') && typeof values.semanticExperimental !== 'boolean') fail('实验性唤醒判断开关无效')
  if (own(values, 'wakeWordAliases') && (!Array.isArray(values.wakeWordAliases) || values.wakeWordAliases.length < 1 || values.wakeWordAliases.length > 8 || values.wakeWordAliases.some(word => typeof word !== 'string' || word.trim().length < 2 || word.trim().length > 24 || /[\p{C}]/u.test(word) || !/[\p{L}\p{N}]/u.test(word)) || new Set(values.wakeWordAliases.map(word => word.trim().toLowerCase())).size !== values.wakeWordAliases.length)) fail('请设置 1–8 个不同唤醒词，每个 2–24 字')
  if (own(values, 'wakeListenTimeoutMs') && (!Number.isInteger(values.wakeListenTimeoutMs) || values.wakeListenTimeoutMs < 3000 || values.wakeListenTimeoutMs > 30000)) fail('唤醒听取时限应为 3–30 秒')
  if (own(values, 'turnSignals')) {
    if (!turnSignalsSupported) fail('音效尚未接入，不能保存为已生效')
    soundValues(values.turnSignals)
  } else if (turnSignalsSupported) fail('缺少音效设置')
}
function modelValues(config) {
  return { asr: 'sensevoice', modelCompute: 'cpu', models: Object.fromEntries(['sensevoiceDir', 'campplus'].map(key => [key, typeof config.models?.[key] === 'string' ? config.models[key] : ''])) }
}
function validateModels(values) {
  exactly(values, Object.hasOwn(values ?? {}, 'modelCompute') ? ['asr', 'models', 'modelCompute'] : ['asr', 'models'], '模型设置')
  if (values.asr !== 'sensevoice') fail('语音识别仅支持 SenseVoice')
  if (values.modelCompute !== undefined && !['cpu','auto'].includes(values.modelCompute)) fail('SenseVoice 使用 CPU 识别')
  exactly(values.models, ['sensevoiceDir', 'campplus'], '模型路径')
  for (const path of Object.values(values.models)) {
    if (typeof path !== 'string' || path.length > 2048 || /[\u0000-\u001f]/.test(path) || /^[a-z][a-z0-9+.-]*:\/\//i.test(path)) fail('这里只接受本地模型路径，不接受下载地址')
  }
  const selected = values.models.sensevoiceDir
  if (selected && !/^(?:[a-z]:[\\/]|[\\/]|\.\.?[\\/])/i.test(selected)) fail('请填写所选 ASR 的本地模型目录，不要填写在线模型名称')
}
function senseVoiceAsrSnapshot(raw) {
  const keys = ['state', 'selected', 'receivedBytes', 'totalBytes', 'message']
  exactly(raw, keys, 'SenseVoice 状态')
  const validProgress = item => ['idle', 'downloading', 'ready', 'error'].includes(item.state)
    && Number.isSafeInteger(item.receivedBytes) && item.receivedBytes >= 0
    && Number.isSafeInteger(item.totalBytes) && item.totalBytes >= 0
  if (!validProgress(raw) || typeof raw.selected !== 'boolean'
    || !(raw.message === null || typeof raw.message === 'string' && raw.message.length <= 512 && !/[\u0000-\u001f\u007f]/.test(raw.message))) fail('SenseVoice 状态无效')
  if (raw.message && /(?:https?:\/\/|file:\/\/|(?:^|\s)[a-z]:[\\/]|(?:^|\s)\\\\[^\\/\s]+[\\/]|(?:^|\s)\/(?:[^\s/]+\/)*[^\s/]*)/i.test(raw.message)) fail('SenseVoice 状态不能包含本地路径或网址')
  return { ...raw }
}
const VOICE_PROMPT_LIMIT = 32768
function customPromptText(value) {
  if (value === undefined || value === null) return ''
  if (typeof value !== 'string' || value.length > VOICE_PROMPT_LIMIT) fail('提示词最多支持 32,768 个字符')
  return value.trim() ? value : ''
}
/** Additional preferences retain host AGENTS and apply at the next voice grant. */
function voicePromptSettings(config) {
  const text = customPromptText(config.voiceSession?.customPrompt)
  return { text, mode: text ? 'custom' : 'agents', customSupported: true, unsupportedReason: null }
}
function readDocument(path) {
  let text
  try { text = readFileSync(path, 'utf8') } catch (error) { if (error.code === 'ENOENT') return { text: '', value: {} }; throw error }
  let value
  try { value = JSON.parse(text.replace(/^\uFEFF/, '')) } catch { fail('配置文件不是有效 JSON，未作修改') }
  if (!object(value)) fail('配置文件必须是对象，未作修改')
  return { text, value }
}
const visibilityOf = value => ['hidden', 'workspace'].includes(value) ? value : null
const safeReason = value => typeof value === 'string' ? value.slice(0, 512) : null
function voiceCapabilitiesOf(raw, configured = null) {
  const value = raw.voiceCapabilities
  const capability = item => ({ supported: item?.supported === true, reason: safeReason(item?.reason) ?? (item ? null : 'capability-status-unavailable') })
  return {
    configuredVisibility: visibilityOf(value?.configuredVisibility) ?? configured,
    hidden: capability(value?.hidden), workspace: capability(value?.workspace),
    taskHandoff: { supported: value?.taskHandoff?.supported === true, mode: typeof value?.taskHandoff?.mode === 'string' ? value.taskHandoff.mode.slice(0, 64) : 'unavailable', reason: safeReason(value?.taskHandoff?.reason) },
  }
}
function performanceStatusOf(source) {
  const mode = source?.routing?.voiceMode
  if (!object(mode)) return null
  const effort = value => typeof value === 'string' && value.length <= 256 && value.trim() ? value : null
  const oneOf = (value, values) => values.includes(value) ? value : null
  return {
    requestedMode: oneOf(mode.requestedMode, ['fast', 'balanced', 'high', 'compatibility']),
    policy: oneOf(mode.policy, ['strict', 'legacy_compatible']),
    preferenceSource: oneOf(mode.preferenceSource, ['performanceMode', 'legacy_reasoningEffort', 'default']),
    requestedEffort: effort(mode.requestedEffort),
    selectedEffort: effort(mode.selectedEffort),
    advertisedEfforts: Array.isArray(mode.advertisedEfforts) ? mode.advertisedEfforts.map(effort).filter(Boolean).slice(0, 256) : [],
    selectionReason: oneOf(mode.selectionReason, ['requested_advertised', 'explicit_unadvertised', 'source_model_selection', 'advertised_default', 'provider_default_unverified']),
    runtimeSelectedEffort: effort(mode.selected?.reasoningEffort),
    requestObservedEffort: effort(mode.requestObserved?.reasoningEffort),
    reasoningDeltaObserved: mode.reasoningDeltaObserved === true,
    providerEnforcement: 'not_verified',
  }
}
const listenModeOf = value => ['ptt', 'always', 'wake'].includes(value) ? value : null
function wakeStatus(raw) {
  const disabled = { state: 'disabled', deadlineAt: null, streamOpen: false, detection: 'asr-after-utterance' }
  if (raw.enabled !== true || raw.listenMode !== 'wake' || raw.helper?.online !== true) return disabled
  const wake = raw.wake
  const state = ['disabled', 'starting', 'waiting', 'listening', 'paused', 'error'].includes(wake?.state) ? wake.state : 'starting'
  const streamOpen = wake?.streamOpen === true
  const effective = ['waiting', 'listening'].includes(state) && !streamOpen ? 'starting' : state
  return { ...disabled, state: effective, detection: wake?.detection === 'acoustic-after-utterance' ? wake.detection : 'asr-after-utterance', streamOpen, deadlineAt: effective === 'listening' && Number.isFinite(wake?.deadlineAt) ? wake.deadlineAt : null }
}
const revisionOf = (document, values) => createHash('sha256').update(document.text).update('\0').update(JSON.stringify(values)).digest('hex')

/**
 * Create the service exposed as whaleVoiceSession. All audio facts come from readStatus's cache.
 * File writes are synchronous and atomic; revision checks reject observable concurrent edits.
 * Non-cooperating external editors are not covered by an OS-level transactional file lock.
 * @param {object} hooks - core-owned status, effective config, grant and catalog adapters.
 * @returns {object} UI methods plus the existing owner/allowed/change service face.
 */
export function createVoiceUiBridge(hooks) {
  const { configPath, readEffectiveConfig, readStatus, sessionControl } = hooks
  if (typeof configPath !== 'string' || !configPath || typeof readEffectiveConfig !== 'function' || typeof readStatus !== 'function' || typeof hooks.assertCaller !== 'function' || !sessionControl) fail('鱼应 UI 桥接配置不完整')
  const turnSignalsSupported = hooks.turnSignalsSupported === true
  const assertCaller = agent => { if (agent !== ownerSettings) actorId(agent); hooks.assertCaller(agent) }
  const status = agent => {
    if (agent !== undefined) assertCaller(agent)
    const raw = readStatus()
    const owner = raw.ownerSessionId ?? sessionControl.owner()
    const source = raw.voiceSession
    return {
      ownerSessionId: typeof owner === 'string' ? owner : null,
      enabled: raw.enabled === true,
      inputDevices: inputDevicesSnapshot(raw.inputDevices, raw.helper?.online === true),
      inferenceCompute: raw.helper?.online === true ? inferenceComputeSnapshot(raw.inferenceCompute) : null,
      voiceControlBusy: typeof raw.voiceControlBusy === 'boolean' ? raw.voiceControlBusy : null,
      ttsRuntime: typeof hooks.readTtsStatus === 'function' ? hooks.readTtsStatus() : null,
      helper: { online: raw.helper?.online === true, lastError: typeof raw.helper?.lastError === 'string' ? raw.helper.lastError.slice(0, 512) : null },
      voiceSession: source ? {
        id: source.id ?? null,
        state: source.state ?? null,
        fullyStopped: source.fullyStopped === true && (!source.recovery?.kind || source.recovery.kind === 'none'),
        recovery: { stopVerified: source.recovery?.stopVerified === true && source.recovery?.kind === 'none' && source.fullyStopped === true, kind: ['live-root-conflict','predecessor-cleanup-pending','predecessor-stop-unconfirmed','helper-cleanup-pending','helper-stop-unconfirmed'].includes(source.recovery?.kind) ? source.recovery.kind : 'none', rootSessionId: source.recovery?.kind === 'live-root-conflict' && typeof source.recovery.rootSessionId === 'string' ? source.recovery.rootSessionId.slice(0, 256) : null },
        performance: performanceStatusOf(source),
        ttsResidency: ttsResidencyCapability(hooks.readTtsResidency ?? source.ttsResidency),
        presentation: { hidden: source.presentation?.hidden === true, requested: visibilityOf(source.presentation?.requested) },
        persistence: { restored: source.persistence?.restored === true, blocked: source.persistence?.blocked === true },
      } : null,
      ptt: { keyboard: raw.ptt?.keyboard ? {
        supported: raw.ptt.keyboard.supported === true,
        scope: 'global',
        status: ['unsupported', 'active', 'inactive'].includes(raw.ptt.keyboard.status) ? raw.ptt.keyboard.status : 'unknown',
        hookInstalled: raw.ptt.keyboard.hookInstalled === true,
        recording: raw.ptt.keyboard.recording === true,
        hookError: typeof raw.ptt.keyboard.hookError === 'string' ? raw.ptt.keyboard.hookError.slice(0, 512) : null,
        reason: typeof raw.ptt.keyboard.reason === 'string' ? raw.ptt.keyboard.reason.slice(0, 512) : null,
        observedAt: Number.isFinite(raw.ptt.observedAt) ? raw.ptt.observedAt : null,
      } : null },
      listenMode: listenModeOf(raw.listenMode),
      wake: wakeStatus(raw),
      turnSignals: { outputStartObservation: { status: raw.voiceTurnSignals?.outputStartObservation?.status === 'observed' ? 'observed' : 'unsupported', reason: raw.voiceTurnSignals?.outputStartObservation?.reason ?? null }, available: turnSignalsSupported, phase: raw.voiceTurnSignals?.phase ?? 'idle', cancellation: raw.voiceTurnSignals?.cancellation ? { status: raw.voiceTurnSignals.cancellation.status, reason: raw.voiceTurnSignals.cancellation.reason ?? null } : { status: 'unsupported', reason: null }, cue: raw.voiceTurnSignals?.cue ? { status: raw.voiceTurnSignals.cue.status, reason: raw.voiceTurnSignals.cue.reason ?? null } : { status: 'unsupported', reason: null } },
      voiceCapabilities: voiceCapabilitiesOf(raw),
      capabilities: { listenMode: typeof hooks.setListenMode === 'function' },
    }
  }
  const settingsSnapshot = () => {
    const document = readDocument(configPath)
    const config = readEffectiveConfig()
    const values = audioValues(config, turnSignalsSupported)
    const modelSetup = modelValues(config)
    const visibility = visibilityOf(config.voiceSession?.visibility ?? 'hidden')
    if (!visibility) fail('语音显示模式配置无效，未作修改')
    const preference = performancePreference(config.voiceSession ?? {})
    const voiceSession = { visibility, ...preference }
    const conversation = conversationModel(config.voiceSession)
    const voicePrompt = voicePromptSettings(config)
    const ttsSetup = ttsSettings(config.tts)
    const onboarding = { version: TTS_SETUP_VERSION, completed: config.onboarding?.version === TTS_SETUP_VERSION && config.onboarding?.completed === true }
    // The effective-config hook may itself read disk. Refuse a torn read rather than issue an unusable revision.
    if (readDocument(configPath).text !== document.text) fail('配置正在变化，请重新读取')
    return { document, revision: revisionOf(document, { values, modelSetup, voiceSession, conversation, voicePrompt, ttsSetup, onboarding }), values, modelSetup, voiceSession, conversationModel: conversation, voicePrompt, ttsSetup, onboarding, audioDevices: audioPreferences(config) }
  }
  const bindingContext = () => {
    const config = readEffectiveConfig(), raw = readStatus()
    return { ownerSessionId: config.voiceSessionId ?? null, epoch: config.voiceSessionEpoch ?? null, rootSessionId: raw.voiceSession?.id ?? null }
  }
  const readSettings = agent => {
    if (agent !== undefined) assertCaller(agent)
    const { revision, values, modelSetup, voiceSession, conversationModel, voicePrompt, ttsSetup, onboarding, audioDevices } = settingsSnapshot()
    const raw = readStatus()
    return { revision, bindingContext: bindingContext(), values, modelSetup, voiceSession, conversationModel, voicePrompt, ttsSetup, onboarding, audioDevices, ttsRuntime: typeof hooks.readTtsStatus === 'function' ? hooks.readTtsStatus() : null, voiceCapabilities: voiceCapabilitiesOf(raw, voiceSession.visibility), capabilities: { pttKeyboard: { supported: process.platform === 'win32', scope: 'global', platform: 'win32', status: process.platform === 'win32' ? 'available' : 'unsupported', reason: process.platform === 'win32' ? null : 'Windows WH_KEYBOARD_LL is required' }, turnSignals: turnSignalsSupported, listenMode: typeof hooks.setListenMode === 'function' }, listenMode: listenModeOf(raw.listenMode), apply: 'next-audio-operation' }
  }
  const atomicWrite = (before, next, signal) => {
    mkdirSync(dirname(configPath), { recursive: true })
    const temporary = `${configPath}.ui-${randomUUID()}.tmp`
    let fd
    try {
      const mode = existsSync(configPath) ? statSync(configPath).mode & 0o777 : 0o600
      fd = openSync(temporary, 'wx', mode)
      writeFileSync(fd, JSON.stringify(next, null, 2) + '\n', 'utf8')
      fsyncSync(fd)
      closeSync(fd); fd = undefined
      notAborted(signal)
      if (readDocument(configPath).text !== before.text) fail('配置已被其他操作修改，请重新读取后再保存')
      renameSync(temporary, configPath)
    } finally {
      if (fd !== undefined) closeSync(fd)
      if (existsSync(temporary)) unlinkSync(temporary)
    }
  }
  const assertTtsStopped = () => {
    const raw = readStatus()
    if (raw.voiceControlBusy !== false || raw.enabled !== false || raw.ownerSessionId !== null || sessionControl.owner() !== null || raw.voiceSession?.fullyStopped !== true || raw.voiceSession?.id !== null) throw Object.assign(new Error('请先明确关闭语音并等待完整清理后再配置或试听朗读'), { code: 'TTS_VOICE_ACTIVE' })
    if (hooks.readTtsStatus?.().busy === true || hooks.readTtsStatus?.().blocked === true) throw Object.assign(new Error('请先停止当前朗读并确认已经结束'), { code: 'TTS_BUSY' })
  }
  async function setListenMode(agent, mode, signal, human = false) {
    assertCaller(agent); const id = agent === ownerSettings ? null : actorId(agent); notAborted(signal)
    if (!['ptt', 'always', 'wake'].includes(mode)) fail('听取模式应为 ptt、always 或 wake')
    if (!human && sessionControl.owner() !== null && !sessionControl.allowed(id)) fail('当前操作会话没有语音权限')
    const control = human ? hooks.setListenModeForHuman : hooks.setListenMode
    if (typeof control !== 'function') fail('听取模式控制尚未接入')
    // The serialized host operation confirms the grant before saving preference.
    const savePreference = () => {
      assertCaller(agent); notAborted(signal)
      const document = readDocument(configPath)
      atomicWrite(document, { ...document.value, preferredListenMode: mode }, signal)
    }
    await control(agent, mode, signal, savePreference)
    return status()
  }
  // Authorization is live host state; the ledger deliberately stores no reusable grant.
  const intent = createTtsInstallIntent(configPath + '.tts-install-intent.json')
  let intentAuthority = null, intentUnsubscribe = null, intentRun = null, intentCompletion = null
  const installerSnapshot = () => ({ ...hooks.modelInstaller().snapshot(), ttsInstallIntent: intent.snapshot() })
  const checkIntent = target => {
    if (!intentAuthority) fail('下载后使用授权需要重新确认')
    assertCaller(intentAuthority.agent)
    hooks.assertTtsInstallAuthorization(intentAuthority.agent, intentAuthority.token, target)
    if (settingsSnapshot().revision !== intent.baseline()) fail('配置已改变，请重新选择朗读模型')
  }
  const blockIntent = error => { intentAuthority = null; intent.set({ status: 'blocked', reason: String(error.code ?? error.message ?? 'verification-failed').replace(/[\u0000-\u001f]/g, ' ').slice(0, 256) }) }
  async function applyInstalled(request, agent, signal, fence = () => {}) {
    assertCaller(agent); notAborted(signal); assertTtsStopped(); fence()
    const installed = await hooks.modelInstaller().verifyInstalled(request.id, signal)
    assertCaller(agent); notAborted(signal); assertTtsStopped(); fence()
    const current = settingsSnapshot()
    if (request.revision !== current.revision) fail('配置已改变，请重新读取后再应用')
    const selected = installed.recommendedSettings
    if (installed.purpose === 'tts') {
      if (!object(selected) || Object.keys(selected).some(key => key !== 'tts') || !object(selected.tts)
        || Object.keys(selected.tts).sort().join() !== 'localModelId,localModelPath,provider' || selected.tts.provider !== 'local') fail('朗读模型安装设置无效')
      const values = validateTtsSettings({ ...current.ttsSetup, ...selected.tts })
      fence(values)
      if (typeof hooks.verifyInstalledTts !== 'function') fail('本地朗读验证尚未接入')
      const verified = await hooks.verifyInstalledTts(values, signal)
      assertCaller(agent); notAborted(signal); assertTtsStopped(); fence(values)
      if (verified?.synthesisVerified !== true) fail('模型已下载，但尚未验证能生成语音')
      atomicWrite(current.document, { ...current.document.value, tts: values }, signal)
      return { ...readSettings(), apply: 'next-tts-operation', runtimeLoaded: false, synthesisVerified: true }
    }
    if (!object(selected) || selected.tts || selected.asr !== 'sensevoice' || !['cpu', 'auto'].includes(selected.modelCompute) || !object(selected.models)) fail('模型安装设置无效')
    atomicWrite(current.document, { ...current.document.value, asr: selected.asr, modelCompute: 'cpu', models: { ...(object(current.document.value.models) ? current.document.value.models : {}), ...selected.models } }, signal)
    return { ...readSettings(), apply: 'restart-helper-required', runtimeLoaded: false }
  }
  function processIntent() {
    const current = intent.snapshot()
    if (!intentAuthority || intentRun || current?.status !== 'waiting') return
    const job = hooks.modelInstaller().snapshot().jobs.find(job => job.id === current.jobId)
    if (job?.status !== 'installed') return
    if (job.purpose !== 'tts' || job.modelId !== current.modelId) { blockIntent(new Error('安装任务与朗读选择不匹配')); return }
    const authority = intentAuthority
    intentRun = new AbortController()
    const controller = intentRun
    intentCompletion = Promise.resolve().then(async () => {
      checkIntent()
      intent.set({ status: 'verifying', reason: null })
      const result = await applyInstalled({ id: current.jobId, revision: intent.baseline() }, authority.agent, controller.signal, checkIntent)
      hooks.completeTtsInstallAuthorization?.(authority.agent, authority.token, result.ttsSetup)
      intent.set({ status: 'applied', reason: null }); intentAuthority = null
    }).catch(error => { if (intentAuthority === authority) blockIntent(error) }).finally(() => { if (intentRun === controller) intentRun = null }).catch(() => { intentAuthority = null })
  }
  function armIntent(agent, jobId, modelId, baseline, token) {
    if (intentRun) fail('已有模型正在验证，请先等待完成')
    intentAuthority = { agent, token }
    intent.set({ jobId, modelId, baseline, status: 'waiting', reason: null })
    intentUnsubscribe ??= hooks.modelInstaller().subscribe(processIntent)
    processIntent()
  }
  const humanInstall = Symbol('trusted-human-install')
  const bridge = {
    async senseVoiceAsrAction(request, signal) {
      notAborted(signal)
      exactly(request, ['operation'], 'SenseVoice 请求')
      if (!['status', 'retry'].includes(request.operation)) fail('SenseVoice 操作无效')
      if (typeof hooks.senseVoiceAsrAction !== 'function') fail('SenseVoice 状态接口尚未接入')
      let result
      try { result = await hooks.senseVoiceAsrAction({ operation: request.operation }, signal) }
      catch { notAborted(signal); fail('SenseVoice 操作失败') }
      notAborted(signal)
      return senseVoiceAsrSnapshot(result)
    },
    async inspectTts(agent, signal) {
      assertCaller(agent); notAborted(signal)
      if (typeof hooks.inspectTts !== 'function') fail('朗读检测尚未接入')
      const result = await hooks.inspectTts(signal)
      assertCaller(agent); notAborted(signal)
      return result
    },
    updateTtsSettings(request, agent, signal) {
      let current, values
      try {
        assertCaller(agent); notAborted(signal)
        exactly(request, ['revision', 'values'], '朗读保存请求')
        current = settingsSnapshot()
        if (!object(request.values)) fail('朗读设置无效')
        // Old per-file acknowledgements remain readable but are not fabricated
        // for a newly selected file. The owner agreement covers ordinary use.
        const sameReference = !Object.hasOwn(request.values, 'referenceAudioPath') || request.values.referenceAudioPath === current.ttsSetup.referenceAudioPath
        values = validateTtsSettings({ referenceAudioPath: current.ttsSetup.referenceAudioPath, referenceAudioAccepted: sameReference ? current.ttsSetup.referenceAudioAccepted : false, ...request.values })
        if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
        assertTtsStopped()
      } catch (error) {
        throw new VoicePreflightError('save-tts', error)
      }
      // From the first filesystem mutation onward, failures remain uncertain.
      atomicWrite(current.document, { ...current.document.value, tts: values }, signal)
      return readSettings()
    },
    completeSetup(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['revision'], '引导完成请求')
      const current = settingsSnapshot()
      if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
      assertTtsStopped()
      if (current.ttsSetup.provider === 'unconfigured') throw Object.assign(new Error('请选择朗读服务，或明确选择暂不启用'), { code: 'TTS_NOT_CONFIGURED' })
      atomicWrite(current.document, { ...current.document.value, onboarding: { ...(object(current.document.value.onboarding) ? current.document.value.onboarding : {}), version: TTS_SETUP_VERSION, completed: true } }, signal)
      return readSettings()
    },
    async previewTts(agent, signal, draft, ownerUi = false) {
      assertCaller(agent); notAborted(signal)
      if (draft === undefined) {
        assertTtsStopped()
        if (typeof hooks.previewTts !== 'function') fail('朗读试听尚未接入')
        return hooks.previewTts(signal)
      }
      if (ownerUi !== true) fail('只有用户界面可以试听朗读草稿')
      assertTtsStopped()
      exactly(draft, ['revision', 'values'], '朗读草稿试听请求')
      const current = settingsSnapshot()
      if (draft.revision !== current.revision) fail('配置已改变，请重新读取后再试听')
      const config = validateTtsSettings(draft.values)
      if (!['edge', 'deepseek', 'local'].includes(config.provider)) fail('草稿设置未选择朗读服务')
      if (typeof hooks.previewDraftTts !== 'function') fail('朗读草稿试听尚未接入')
      return hooks.previewDraftTts(config, signal)
    },
    async cancelTts(agent, signal) {
      assertCaller(agent); notAborted(signal)
      if (typeof hooks.cancelTts !== 'function') fail('朗读取消尚未接入')
      return hooks.cancelTts()
    },
    owner: (...args) => sessionControl.owner(...args),
    allowed: (...args) => sessionControl.allowed(...args),
    change: (...args) => sessionControl.change(...args),
    status,
    readSettings,
    async readAudioDevices(agent, signal) {
      assertCaller(agent); notAborted(signal)
      if (typeof hooks.inspectAudioDevices !== 'function') fail('设备枚举尚未接入')
      const value = await hooks.inspectAudioDevices(signal)
      assertCaller(agent); notAborted(signal)
      if (!validAudioInventory(value)) fail('设备列表无效，请重试')
      return value
    },
    async updateAudioDevice(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['revision', 'direction', 'selection'], '音频设备请求')
      if (!['input','output'].includes(request.direction) || !validAudioDevice(request.selection)) fail('音频设备选择无效')
      const before = settingsSnapshot()
      if (request.revision !== before.revision) fail('配置已改变，请重新读取后再选择')
      const assertIdleInput = () => {
        if (request.direction !== 'input') return
        const raw = readStatus()
        if (raw.enabled !== false || raw.ownerSessionId !== null || raw.voiceControlBusy !== false
          || raw.voiceSession?.fullyStopped !== true || raw.voiceSession?.id != null) fail('请先关麦，等待停止后再切换输入设备')
      }
      assertIdleInput()
      if (request.selection !== null) {
        if (typeof hooks.inspectAudioDevices !== 'function') fail('设备枚举尚未接入')
        const inventory = await hooks.inspectAudioDevices(signal)
        assertCaller(agent); notAborted(signal); assertIdleInput()
        const row = validAudioInventory(inventory) && inventory[request.direction]
        const found = row && row.items.find(item => item.id === request.selection.id && item.backend === request.selection.backend)
        if (!found) fail('所选设备已断开或不可用，请重新选择')
        // A caller may choose a verified identity, but cannot invent its display name.
        request = { ...request, selection: found }
      }
      const current = settingsSnapshot()
      if (request.revision !== current.revision) fail('配置已改变，请重新读取后再选择')
      const key = request.direction === 'input' ? 'device' : 'outputDevice'
      const next = { ...current.document.value, [key]: request.selection }
      // Earphone isolation was confirmed for the previous route, not an arbitrary
      // newly selected speaker. Keep sound preferences but withdraw that assumption.
      const previous = before.audioDevices?.output
      if (request.direction === 'output' && JSON.stringify(previous) !== JSON.stringify(request.selection)) {
        next.turnSignals = { ...next.turnSignals, headphonesConfirmed: false, experimentalAutomaticBargeIn: false }
      }
      atomicWrite(current.document, next, signal)
      return { ...readSettings(), apply: request.direction === 'input' ? 'next-voice-enable' : 'next-playback' }
    },
    readModelInstaller(agent) { assertCaller(agent); return installerSnapshot() },
    subscribeModelInstaller(agent, listener) { assertCaller(agent); const publish = () => { assertCaller(agent); listener(installerSnapshot()) }; const a = hooks.modelInstaller().subscribe(publish), b = intent.subscribe(publish); return () => { a(); b() } },
    async inspectModelCompute(agent, signal) { assertCaller(agent); notAborted(signal); const installer=hooks.modelInstaller(); return installer.refreshCompute ? installer.refreshCompute() : installer.inspectCompute(signal) },
    planModelInstall(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['modelId', 'compute', ...(['sourceDirectory','modelVariant'].filter(key => own(request, key)))], '模型安装计划')
      return hooks.modelInstaller().plan(request.modelId, request.compute, ...(request.sourceDirectory !== undefined || request.modelVariant !== undefined ? [{ sourceDirectory: request.sourceDirectory, modelVariant: request.modelVariant }] : []))
    },
    startModelInstall(request, agent, signal, origin) {
      assertCaller(agent); notAborted(signal)
      if (request.useWhenReady !== undefined && typeof request.useWhenReady !== 'boolean') fail('下载后使用选项无效')
      const { useWhenReady, ...download } = request
      if (!useWhenReady) return hooks.modelInstaller().start(download)
      intent.assertWritable()
      if (intentRun || ['waiting', 'verifying'].includes(intent.snapshot()?.status)) fail('已有待使用的朗读下载，请先暂停或取消')
      const plan = bridge.planModelInstall({ modelId: request.modelId, compute: request.compute, ...(request.sourceDirectory !== undefined ? { sourceDirectory: request.sourceDirectory } : {}), ...(request.modelVariant !== undefined ? { modelVariant: request.modelVariant } : {}) }, agent, signal)
      if (plan.purpose !== 'tts') fail('仅朗读模型支持下载后使用')
      assertTtsStopped()
      if (typeof hooks.captureTtsInstallAuthorization !== 'function' || typeof hooks.assertTtsInstallAuthorization !== 'function') fail('下载后使用授权尚未接入')
      const token = hooks.captureTtsInstallAuthorization(agent, request, signal, origin === humanInstall)
      const baseline = settingsSnapshot().revision
      const job = hooks.modelInstaller().start(download)
      armIntent(agent, job.id, request.modelId, baseline, token)
      return { ...job, ttsInstallIntent: intent.snapshot() }
    },
    async controlModelInstall(request, agent, signal, origin) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['id', 'operation'], '模型安装操作')
      if (!['pause', 'resume', 'cancel'].includes(request.operation)) fail('不支持的安装操作')
      const current = intent.snapshot()
      if (current?.jobId === request.id && !['applied', 'cancelled'].includes(current.status)) {
        if (request.operation !== 'resume') {
          const verification = intentRun, completion = intentCompletion
          intentAuthority = null; verification?.abort()
          if (verification) {
            try {
              if (typeof hooks.cancelTts !== 'function') fail('朗读取消尚未接入')
              const stopped = await hooks.cancelTts()
              if (stopped?.status === 'unconfirmed') throw Object.assign(new Error('未能确认模型验证已停止'), { code: 'TTS_TERMINATION_UNCONFIRMED' })
              await completion
              assertCaller(agent); notAborted(signal)
              assertTtsStopped()
            } catch (error) { blockIntent(error); throw error }
          }
          intent.set({ status: request.operation === 'cancel' ? 'cancelled' : 'paused', reason: null })
        } else {
          if (intentRun) fail('请先等待当前验证停止')
          const baseline = settingsSnapshot().revision
          if (origin !== humanInstall && baseline !== intent.baseline()) fail('配置已改变，请重新选择朗读模型')
          const token = hooks.captureTtsInstallAuthorization(agent, { modelId: current.modelId, useWhenReady: true }, signal, origin === humanInstall)
          hooks.assertTtsInstallAuthorization(agent, token)
          assertTtsStopped()
          const job = hooks.modelInstaller().snapshot().jobs.find(job => job.id === request.id)
          if (!job || job.modelId !== current.modelId) fail('安装任务与朗读选择不匹配')
          if (job?.status !== 'installed') await hooks.modelInstaller().resume(request.id)
          armIntent(agent, request.id, current.modelId, baseline, token)
          return { ...job, ttsInstallIntent: intent.snapshot() }
        }
      }
      return hooks.modelInstaller()[request.operation](request.id)
    },
    async applyModelInstall(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['id', 'revision'], '应用模型请求')
      const result = await applyInstalled(request, agent, signal)
      if (result.synthesisVerified === true && intent.snapshot()?.jobId === request.id) {
        intentAuthority = null
        intent.set({ status: 'applied', reason: null })
      }
      return result
    },
    suspendTtsInstallIntent() {
      intentAuthority = null; intentRun?.abort(); intentUnsubscribe?.(); intentUnsubscribe = null
      if (['waiting', 'verifying'].includes(intent.snapshot()?.status)) intent.set({ status: 'blocked', reason: 'authorization-or-host-stopped' })
    },
    readConversation(agent) { assertCaller(agent); return hooks.readConversation(agent) },
    subscribeConversation(agent, listener) { assertCaller(agent); return hooks.subscribeConversation(agent, listener) },
    readOutputVolume(agent) { assertCaller(agent); return hooks.readOutputVolume() },
    async setOutputVolume(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      return hooks.setOutputVolume(request, agent, signal)
    },
    async readConversationModels(agent, signal) {
      assertCaller(agent); notAborted(signal)
      if (typeof hooks.readConversationModels !== 'function') fail('宿主对话模型目录暂不可用')
      const result = await hooks.readConversationModels(signal)
      assertCaller(agent); notAborted(signal)
      return result
    },
    updateVoicePrompt(request, agent, signal) {
      let current, text
      try {
        assertCaller(agent); notAborted(signal)
        exactly(request, ['revision','values'], '提示词请求')
        exactly(request.values, ['text'], '提示词')
        if (typeof request.values.text !== 'string') fail('提示词必须是文字')
        text = customPromptText(request.values.text)
        current = settingsSnapshot()
        if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
        const raw = readStatus()
        if (raw.voiceControlBusy !== false || raw.enabled !== false || raw.ownerSessionId !== null || sessionControl.owner() !== null || raw.voiceSession?.fullyStopped !== true || raw.voiceSession?.id !== null || raw.voiceSession?.recovery?.kind && raw.voiceSession.recovery.kind !== 'none') fail('请先关闭语音并等待完整清理后再修改提示词')
      } catch (error) { throw new VoicePreflightError('save-voice-prompt', error) }
      // An explicit empty override also clears text inherited from the plugin's base configuration.
      const voiceSession = {...current.document.value.voiceSession, customPrompt:text}
      atomicWrite(current.document, {...current.document.value, voiceSession}, signal)
      return {...readSettings(), apply:'next-voice-enable'}
    },
    async updateConversationModel(request, agent, signal) {
      let current, values
      try {
        assertCaller(agent); notAborted(signal)
        exactly(request, ['revision','values'], '对话模型请求')
        values = validateConversationModel(request.values)
        current = settingsSnapshot()
        if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
        if (values.mode === 'manual') {
          if (typeof hooks.assertConversationModel !== 'function') fail('宿主对话模型目录暂不可用')
          await hooks.assertConversationModel(values, signal)
        }
        assertCaller(agent); notAborted(signal)
        current = settingsSnapshot()
        if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
        const raw = readStatus()
        if (raw.voiceControlBusy !== false || raw.enabled !== false || raw.ownerSessionId !== null || sessionControl.owner() !== null || raw.voiceSession?.fullyStopped !== true || raw.voiceSession?.id !== null || raw.voiceSession?.recovery?.kind && raw.voiceSession.recovery.kind !== 'none') fail('请先关闭语音并等待完整清理后再修改对话模型')
      } catch (error) { throw new VoicePreflightError('save-conversation-model', error) }
      const voiceSession = {...current.document.value.voiceSession, conversationModelMode: values.mode, provider: values.provider, model: values.model}
      atomicWrite(current.document, {...current.document.value, voiceSession}, signal)
      return {...readSettings(), apply:'next-voice-enable'}
    },
    async inspectPerformanceModes(agent, signal) {
      assertCaller(agent); notAborted(signal)
      if (typeof hooks.inspectPerformanceModes !== 'function') fail('语音性能档位检查尚未接入')
      return hooks.inspectPerformanceModes(agent, signal)
    },
    setPerformanceMode(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['revision', 'performanceMode'], '性能档位请求')
      performancePreference({ performanceMode: request.performanceMode })
      const current = settingsSnapshot()
      if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
      const raw = readStatus()
      if (raw.voiceControlBusy !== false || raw.enabled !== false || raw.ownerSessionId !== null || sessionControl.owner() !== null || raw.voiceSession?.fullyStopped !== true || raw.voiceSession?.id !== null) fail('请先明确关闭语音并等待完整清理后再修改性能档位；不会自动停止工作会话')
      const voiceSession = { ...(object(current.document.value.voiceSession) ? current.document.value.voiceSession : {}), performanceMode: request.performanceMode }
      delete voiceSession.reasoningEffort
      atomicWrite(current.document, { ...current.document.value, voiceSession }, signal)
      return { ...readSettings(), apply: 'next-voice-enable', providerEnforcement: 'not_verified', ttsResidency: ttsResidencyCapability(hooks.readTtsResidency ?? raw.voiceSession?.ttsResidency) }
    },
    async changeForCaller(agent, enabled, signal, expectedOwnerSessionId) {
      assertCaller(agent); notAborted(signal)
      if (typeof enabled !== 'boolean') fail('语音授权开关无效')
      validateExpectedOwner(expectedOwnerSessionId)
      if (enabled && expectedOwnerSessionId !== undefined && sessionControl.owner() !== expectedOwnerSessionId) throw Object.assign(new Error('语音所属会话已改变，请刷新后重新确认'), { code: 'VOICE_OWNER_CHANGED' })
      return sessionControl.change(actorId(agent), enabled, signal, expectedOwnerSessionId)
    },
    async changeForHuman(agent, enabled, signal, expectedOwnerSessionId, expectedExistingSessionId) {
      assertCaller(agent); notAborted(signal)
      if (typeof enabled !== 'boolean') fail('语音授权开关无效')
      validateExpectedOwner(expectedOwnerSessionId)
      validateExpectedOwner(expectedExistingSessionId)
      if (typeof hooks.changeForHuman !== 'function') fail('全局人工语音控制尚未接入')
      return hooks.changeForHuman(agent, enabled, signal, expectedOwnerSessionId, expectedExistingSessionId)
    },
    async captureBindings(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['operation', 'token', 'inactive'], '按键录入请求')
      if (!['begin','end'].includes(request.operation) || request.operation === 'end' && (typeof request.token !== 'string' || request.token.length > 128)) fail('按键录入请求无效')
      if (typeof hooks.captureBindings !== 'function') fail('当前宿主不支持安全录入按键')
      return hooks.captureBindings(agent, request, () => {
        const current = settingsSnapshot(), raw = readStatus(), context = bindingContext()
        if (!context.ownerSessionId && raw.voiceSession?.fullyStopped !== true) fail('请等待语音停止完成')
        if (context.ownerSessionId && (raw.enabled !== true || raw.helper?.online !== true || !context.epoch)) fail('当前语音状态未确认')
        return { active: !!context.ownerSessionId, expectedSessionId: context.ownerSessionId, expectedSessionEpoch: context.epoch, pttMouse: current.values.pttMouse, pttKeyboard: current.values.pttKeyboard }
      })
    },
    async updateBindings(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['revision', 'values', 'bindingContext'], '按键保存请求')
      exactly(request.values, ['pttMouse', 'pttKeyboard'], '按键设置')
      exactly(request.bindingContext, ['ownerSessionId', 'epoch', 'rootSessionId'], '按键会话')
      if (typeof hooks.changeBindings !== 'function') fail('当前宿主不支持安全更换按键')
      let current, written
      const assertCurrent = () => {
        assertCaller(agent)
        if (JSON.stringify(bindingContext()) !== JSON.stringify(request.bindingContext)) fail('语音会话已改变，请重新读取后再修改按键')
        if (settingsSnapshot().revision !== request.revision) fail('配置已改变，请重新读取后再保存')
      }
      const transaction = {
        prepare() {
          notAborted(signal); assertCurrent(); current = settingsSnapshot()
          validateValues({ ...current.values, ...request.values }, turnSignalsSupported)
          const raw = readStatus(), context = bindingContext()
          if (!context.ownerSessionId && (raw.voiceSession?.fullyStopped !== true || raw.voiceSession?.id != null)) fail('语音正在清理，请等待后再应用按键')
          if (context.ownerSessionId && (!context.epoch || raw.enabled !== true || raw.helper?.online !== true)) fail('当前语音状态未确认，请重新读取')
          return { active: !!context.ownerSessionId, expectedSessionId: context.ownerSessionId, expectedSessionEpoch: context.epoch, ...request.values }
        },
        assertCurrent,
        persist() {
          assertCurrent(); notAborted(signal)
          atomicWrite(current.document, { ...current.document.value, ...request.values }, signal)
          written = readDocument(configPath)
        },
        rollback() {
          if (!written || readDocument(configPath).text !== written.text) fail('配置已被其他操作修改，未覆盖')
          atomicWrite(written, current.document.value)
        },
      }
      await hooks.changeBindings(agent, signal, transaction)
      return readSettings(agent)
    },
    updateSettings(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['revision', 'values'], '保存请求')
      if (typeof request.revision !== 'string' || !/^[a-f0-9]{64}$/.test(request.revision)) fail('设置版本无效，请重新读取')
      validateValues(request.values, turnSignalsSupported)
      const current = settingsSnapshot()
      if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
      const values = audioValues(request.values, turnSignalsSupported)
      const bindingChanged = values.pttMouse !== current.values.pttMouse
        || own(request.values, 'pttKeyboard') && JSON.stringify(values.pttKeyboard) !== JSON.stringify(current.values.pttKeyboard)
      const wakeChanged = own(request.values, 'wakeWordAliases') && JSON.stringify(values.wakeWordAliases) !== JSON.stringify(current.values.wakeWordAliases)
        || own(request.values, 'wakeListenTimeoutMs') && values.wakeListenTimeoutMs !== current.values.wakeListenTimeoutMs
      if (bindingChanged || wakeChanged) {
        // Check live state at write time, not the UI's earlier read. This path is
        // synchronous through atomicWrite, so queued control work cannot interleave.
        const raw = readStatus()
        if (raw.voiceControlBusy !== false || raw.enabled !== false || raw.ownerSessionId !== null
          || sessionControl.owner() !== null || raw.voiceSession?.fullyStopped !== true || raw.voiceSession?.id !== null) {
          fail(`请先明确关闭语音并等待完整清理后再修改${wakeChanged ? '唤醒词或听取时限' : '按键绑定'}；不会自动停止工作会话`)
        }
      }
      const next = {
        ...current.document.value,
        device: values.device,
        pttMouse: values.pttMouse,
        ...(own(request.values, 'pttKeyboard') ? { pttKeyboard: values.pttKeyboard } : {}),
        speakerVerification: { ...(object(current.document.value.speakerVerification) ? current.document.value.speakerVerification : {}), enabled: values.speakerVerification.enabled },
        ...(own(request.values, 'wakeWordAliases') ? { wakeWordAliases: values.wakeWordAliases.map(word => word.trim()) } : {}),
        ...(own(request.values, 'wakeListenTimeoutMs') ? { wakeListenTimeoutMs: values.wakeListenTimeoutMs } : {}),
        ...(own(request.values, 'semanticExperimental') ? { semantic: { ...(object(current.document.value.semantic) ? current.document.value.semantic : {}), experimentalEnabled: values.semanticExperimental } } : {}),
        ...(turnSignalsSupported ? { turnSignals: { ...(object(current.document.value.turnSignals) ? current.document.value.turnSignals : {}), ...values.turnSignals } } : {}),
      }
      atomicWrite(current.document, next, signal)
      return readSettings()
    },
    updateModelSettings(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['revision', 'values'], '模型保存请求')
      validateModels(request.values)
      const current = settingsSnapshot()
      if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
      const next = { ...current.document.value, asr: request.values.asr, modelCompute: 'cpu', models: { ...(object(current.document.value.models) ? current.document.value.models : {}), ...request.values.models } }
      atomicWrite(current.document, next, signal)
      return readSettings()
    },
    setVisibility(request, agent, signal) {
      assertCaller(agent); notAborted(signal)
      exactly(request, ['revision', 'visibility'], '显示模式请求')
      if (typeof request.revision !== 'string' || !/^[a-f0-9]{64}$/.test(request.revision)) fail('设置版本无效，请重新读取')
      if (!visibilityOf(request.visibility)) fail('语音显示模式应为 hidden 或 workspace')
      const current = settingsSnapshot()
      if (request.revision !== current.revision) fail('配置已改变，请重新读取后再保存')
      const raw = readStatus()
      if (raw.voiceControlBusy !== false) fail('语音控制仍在处理或状态未确认，请完成当前操作并刷新状态后再修改显示模式')
      if (raw.enabled !== false || raw.ownerSessionId !== null || sessionControl.owner() !== null || !(raw.voiceSession === null || object(raw.voiceSession) && raw.voiceSession.id === null)) fail('请先明确关闭语音，确认没有授权或运行中的语音聊天后再切换显示模式')
      if (request.visibility === 'workspace' && voiceCapabilitiesOf(raw).workspace.supported !== true) fail('当前宿主未确认支持工作区可见兼容模式，未修改配置')
      const next = { ...current.document.value, voiceSession: { ...(object(current.document.value.voiceSession) ? current.document.value.voiceSession : {}), visibility: request.visibility } }
      atomicWrite(current.document, next, signal)
      // Saving a preference never prepares a root, migrates history, or grants microphone access.
      return readSettings()
    },
    setListenMode: (agent, mode, signal) => setListenMode(agent, mode, signal),
    setListenModeForHuman: (agent, mode, signal) => setListenMode(agent, mode, signal, true),
    async listVoiceSessions(agent, signal, options = {}) {
      assertCaller(agent); notAborted(signal)
      if (options.cursor !== undefined && (typeof options.cursor !== 'string' || options.cursor.length > 2048)) fail('语音聊天游标无效')
      if (typeof hooks.listVoiceSessions !== 'function') fail('语音聊天目录尚未接入')
      const page = await hooks.listVoiceSessions(agent, { cursor: options.cursor, limit: 20 }, signal)
      const activeId = readStatus().voiceSession?.id ?? null
      return {
        items: page.items.map(row => ({
          id: row.rootSessionId,
          ...(typeof row.title === 'string' ? { title: row.title } : {}),
          archived: row.status === 'archived',
          available: row.status === 'available' || row.status === 'live',
          canResume: row.canResume === true,
          ...(typeof row.reason === 'string' ? { reason: row.reason } : {}),
          ...(Number.isFinite(row.createdAt) ? { createdAt: row.createdAt } : {}),
          ...(Number.isFinite(row.lastSelectedAt) ? { updatedAt: row.lastSelectedAt } : {}),
        })),
        activeId,
        nextCursor: page.nextCursor ?? null,
        total: page.total,
      }
    },
    async newVoiceSession(agent, signal, expectedOwnerSessionId) {
      assertCaller(agent); notAborted(signal)
      if (typeof hooks.newVoiceSession !== 'function') fail('新建语音聊天尚未接入')
      return hooks.newVoiceSession(agent, signal, expectedOwnerSessionId)
    },
    async resumeVoiceSession(agent, rootSessionId, signal) {
      assertCaller(agent); notAborted(signal)
      if (typeof rootSessionId !== 'string' || !rootSessionId || rootSessionId.length > 256) fail('语音聊天标识无效')
      if (typeof hooks.resumeVoiceSession !== 'function') fail('接续语音聊天尚未接入')
      return hooks.resumeVoiceSession(agent, rootSessionId, signal)
    },
  }
  bridge.startModelInstallForHuman = (request, agent, signal) => bridge.startModelInstall(request, agent, signal, humanInstall)
  bridge.controlModelInstallForHuman = (request, agent, signal) => bridge.controlModelInstall(request, agent, signal, humanInstall)
  return bridge
}
