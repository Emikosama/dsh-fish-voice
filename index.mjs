import { conversationModel, conversationModels, assertConversationModel } from './voice-conversation-model.mjs'
import { createBindingCapture } from './voice-binding-capture.mjs'
import { applyBindingTransaction } from './voice-binding-transaction.mjs'
// 鱼应 DSH 核心插件
// ===========================================================================
// 一句话：把「对着麦克风说话」变成一条能进 DSH 会话的文本消息。
//
// 这一版只做「听」这一层，但代码里把它当成**一个完整的耳朵入口**（`ear` 对象），
// 不是五个散装小功能：
//     ear.start() / ear.stop()      一次 PTT 录音的开始与收尾
//     ear.listenOnce()              一次完整的听：录音→VAD→声纹→ASR→情感/韵律
//     ear.enroll(name, path?)       声纹注册（有麦克风就录，没有就用现成音频）
//     ear.transcribe(path)          离线转写一个文件
//     ear.prosody(path)             只算韵律
//     ear.status()                  设备 / 模型 / 声纹 / 阈值
//     ear.deliver(result)           把结果投进会话（声纹不过关的不投）
// 后面接「看屏」「说话」时，直接拿 globalThis.__dshWhaleEar__.ear 组合，不必再重写一遍。
//
// 独立性：通过 ctx.tools.register 注册原始 ToolDefinition，不依赖安装位置解析 dsh-tools，
// 不 monkey-patch 宿主，任何异常都在插件内部吞掉——最坏情况是「耳朵不工作」，宿主不受影响。
//
// 运行期配置：~/.dsh/whale-ear/config.json（改文件即时生效，不用重载插件）
// 声纹库：    ~/.dsh/whale-ear/voiceprints.json（Python 帮工写）
// 日志：      ~/.dsh/whale-ear/whale-ear.log
//
// 升级：Node 缓存整个依赖 URL 图。仅换入口名/id 不足以更新依赖；使用完整新版本目录或关闭后完整重启宿主。

import { spawn } from 'node:child_process'
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve as resolvePath } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import { performance } from 'node:perf_hooks'
import { createVoiceSessionManager, VoiceRootOwnershipError } from './voice-session.mjs'
import { createExistingVoiceSessions, EXISTING_VOICE_PLATFORM, splitBoundReply } from './voice-existing-session.mjs'
import { createOperationLog, operationLogDirectory, operationLogClientScope } from './voice-operation-log.mjs'
import { VoicePreflightError } from './voice-operation-outcome.mjs'
import { safeDeepSeekDiagnostic } from './voice-tts-deepseek.mjs'
import { uiOperationName } from './ui/host.mjs'
import { mergeVoiceSessionConfig } from './voice-performance.mjs'
import { createModelInstaller } from './voice-model-installer.mjs'
import { createFileAgentPermissions, TTS_CLOUD_CONSENT } from './voice-agent-policy.mjs'
import { createVoiceAgentControl } from './voice-agent-control.mjs'
import { createVoiceUiBridge, ownerSettings } from './voice-ui-bridge.mjs'
import { createVoicePresentation } from './voice-presentation.mjs'
import { createStandaloneVoiceOrigin } from './voice-standalone-origin.mjs'
import { inspectAudioDevices } from './voice-audio-devices.mjs'
import { createTtsRuntime, createWindowsTtsAdapter, TTS_DEFAULTS, ttsSettings } from './voice-tts.mjs'
import { createVoiceConversation } from './voice-output.mjs'
import { createVoiceTurnSignals } from './voice-turn-signals.mjs'
import { createPythonRuntimeResolver } from './voice-python-runtime.mjs'
import { createSenseVoiceAsr, createSherpaRuntime } from './voice-sensevoice-asr.mjs'
import { createWakeSpotter } from './voice-wake-spotter.mjs'
import { voiceUpdateInstalling } from './voice-update-service.mjs'

const VERSION = '0.5.39-rc.28'
// Stable compatibility identity: existing integrations and stored data keep their keys.
const GLOBAL_KEY = '__dshWhaleEar__'

// Core identity is retained for file-mount integrations; the bundle has the new name.
export const name = 'dsh-whale-ear'
export const inject = ['tools', 'agents', 'sessions']

// ToolsService.register accepts raw JSON Schema. defineTool is a separate authoring
// DSL (parameter-name -> value schema), not an identity wrapper for this contract.
// Keep file mounts and installed bundles on the same registry path.

const HOME = process.env.DSH_HOME || join(homedir(), '.dsh')
const DIR = join(HOME, 'whale-ear')
const CONFIG_PATH = join(DIR, 'config.json')
const LOG_PATH = join(DIR, 'whale-ear.log')
const DEFAULT_HELPER = fileURLToPath(new URL('./helper/voice_helper.py', import.meta.url))

const DEFAULTS = {
  pythonPath: 'python',
  helperPath: DEFAULT_HELPER,
  tts: { ...TTS_DEFAULTS },
  autoStart: false, // Installation never starts Python, audio devices or models.
  asr: 'sensevoice',
  device: null, // null = 系统默认输入；新菜单保存端点标识，兼容旧序号或名字
  outputDevice: null, // null = 每次播放跟随系统默认；手动选择保存稳定端点标识
  threshold: 0.5, // 声纹余弦阈值
  turnSignals: { enabled: true, volume: 0.2, headphonesConfirmed: false, experimentalAutomaticBargeIn: false },
  speakerVerification: { enabled: false }, // 实验性声纹匹配；仅显式 true 开启
  voiceSession: {
    enabled: true,
    visibility: 'hidden',
    handoffBackend: 'compat_domain_v1', // New roots only; stored roots retain their verified backend.
    subagentApiProfile: 'compatible_v1', // One shared task envelope for published rc.1 and flat rc.3 hosts.
    provider: null,
    model: null,
    subagentProvider: 'spawn',
    maxDepth: 1,
    allowedSessionIds: [],
  },
  models: {
    campplus: join(DIR, 'models', 'campplus.onnx'),
    sileroVad: join(DIR, 'models', 'silero_vad.onnx'),
    sensevoiceDir: join(DIR, 'models', 'sensevoice'),
  },
  vad: {
    frameMs: 20,
    minRms: 0.006,
    noiseMult: 1.8,
    silenceMs: 1200,
    minSpeechMs: 300,
    maxRecordMs: 15000,
    noSpeechMs: 5000,
    startFrames: 3,
  },
  enrollSeconds: 8,
  // ---- 鼠标侧键按住说话（全局低级鼠标钩子；0=关, 1=XButton1, 2=XButton2）----
  pttKeyboard: null, // Windows global key/chord binding, e.g. { code: "F8", modifiers: [] }
  pttMouse: 2, // 默认前进键（XButton2）；0 = 关掉侧键 PTT
  pttMouseMaxSeconds: 15, // 按住最长多久（到点自动停，仍算一次有效投递）
  // 投递
  delivery: 'followup', // followup | steer
  header: '【语音】',
  dropWhenSpeakerFails: true, // 声纹不过关不投递
  voiceSessionId: null, // Only an explicit voice_listen(enable) grants one caller ownership.
  workspaceCwd: null,
  maxPerMinute: 12,
  replyHint: '', // 附在消息末尾的提示，留空就不加
  // ---- 自由麦（默认直接处理有效语音；listenMode=ptt 不影响现有 PTT）----
  listenMode: 'ptt', // ptt | always | wake（always = 帮工一起来就开常听）
  wakeWordAliases: ['小鲸鱼'],
  wakeListenTimeoutMs: 10000,
  retainRecordings: false, // Manual diagnostic opt-in only; not exposed to agent control.
  preferredListenMode: 'ptt', // Selection only. Never grants or starts capture.
  wakeWords: ['依依', '一一', '一依', '依一', '伊伊', '小鲸鱼', 'emik', 'emiko'],
  conversationWindowMs: 30000, // 唤醒后对话模式窗口
  idleExitMs: 25000, // 对话模式里静音多久自动退出
  alwaysMinSpeechMs: 350,
  alwaysSilenceMs: 600,
  alwaysMaxSegmentMs: 15000,
  // ---- v0.3 语义初筛 + 滚动窗口 ----
  windowSec: 60, // 「最近」窗口：最近多少秒的段进投递上下文
  semantic: {
    enabled: false, // Historical field is not consent to experimental wake gating.
    experimentalEnabled: false,
    url: 'http://127.0.0.1:8093/v1/embeddings',
    model: 'qwen3-embed-4b',
    threshold: 0.62, // max(cos(句, 参考句)) >= 它 = 疑似在叫我
    timeoutMs: 2000,
    refs: ['依依', '在吗', '在不在', '帮我看看', '你觉得呢', '陪我说说话'],
  },
}

// ---------------------------------------------------------------------------
// 小工具
// ---------------------------------------------------------------------------

function logger(path) {
  return (msg) => {
    try {
      mkdirSync(dirname(path), { recursive: true })
      appendFileSync(path, `${new Date().toISOString()} ${msg}\n`, 'utf8')
      return true
    } catch {
      return false
    }
  }
}

function readJson(path, fallback = null) {
  try {
    return JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''))
  } catch {
    return fallback
  }
}

function writeJson(path, value) {
  try {
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, JSON.stringify(value, null, 2), 'utf8')
  } catch {
    /* ignore */
  }
}

export function apply(ctx, config) {
  const log = logger(LOG_PATH)
  let operationProfile, operationProfileHost
  try {
    const profile = ctx.get?.('profileContext')
    const manager = ctx.get?.('pluginManager')
    operationProfile = profile?.dir ?? manager?.profile?.dir
    operationProfileHost = profile?.dir ? profile : manager
  } catch { /* Older host compositions may not publish a profile. */ }
  const operationDirectory = operationLogDirectory(DIR, operationProfile)
  const clientOperationScope = operationLogClientScope(operationDirectory, operationProfile, operationProfileHost)
  const operationLog = createOperationLog({
    directory: operationDirectory,
    onProblem: code => log(`操作日志本地写入或清理未完成 [${code}]`),
  })
  const startupOperationId = randomUUID()
  operationLog.record({ source: 'host', action: 'plugin.start', phase: 'requested', operationId: startupOperationId })
  let instance = null
  try {
    const predecessor = globalThis[GLOBAL_KEY]
    let priorCleanup = predecessor?.dispose?.()
    // Pre-.16 instances returned before their helper/TTS/root cleanup. A bare
    // registry read cannot establish that their audio process really exited.
    if (predecessor && typeof priorCleanup?.then !== 'function') priorCleanup = Promise.reject(Object.assign(new Error('旧版语音插件无法确认资源已退出，请完整重启 DSH；原授权会保留。'), { code: 'VOICE_PREDECESSOR_STOP_UNCONFIRMED' }))
    instance = boot(ctx, config ?? {}, log, priorCleanup, operationLog, clientOperationScope)
    ctx.provide('whaleVoiceSession', instance.uiBridge)
    operationLog.record({ source: 'host', action: 'plugin.start', phase: 'finished', result: 'ok', operationId: startupOperationId })
  } catch (err) {
    operationLog.record({ source: 'host', action: 'plugin.start', phase: 'finished', result: 'failed', error: err, operationId: startupOperationId })
    void operationLog.dispose()
    log(`apply 异常（插件未启动，宿主不受影响）: ${String(err?.stack ?? err)}`)
    return
  }
  try {
    ctx.effect(() => () => instance?.dispose(), 'whale-ear lifecycle')
  } catch {
    /* Isolated test harnesses may omit lifecycle ownership. */
  }
}

function boot(ctx, baseConfig, log, priorCleanup, operationLog, clientOperationScope) {
  const recordOperation = operationLog.record
  const trackOperation = operationLog.track
  let predecessorRecovery = priorCleanup ? 'predecessor-cleanup-pending' : null
  const predecessorCleanup = Promise.resolve(priorCleanup)
  predecessorCleanup.then(() => { predecessorRecovery = null }, () => { predecessorRecovery = 'predecessor-stop-unconfirmed' })
  // YAML 给基线，~/.dsh/whale-ear/config.json 每次用的时候再覆盖（改文件即时生效）
  const defaults = DEFAULTS
  let cfg = { ...defaults, ...baseConfig }

  const asObject = (value) =>
    value && typeof value === 'object' && !Array.isArray(value) ? value : {}

  function refresh() {
    const live = readJson(CONFIG_PATH, null)
    if (live && typeof live === 'object' && !Array.isArray(live)) {
      cfg = {
        ...defaults,
        ...baseConfig,
        ...live,
        models: { ...DEFAULTS.models, ...asObject(baseConfig.models), ...asObject(live.models) },
        vad: { ...DEFAULTS.vad, ...asObject(baseConfig.vad), ...asObject(live.vad) },
        semantic: { ...DEFAULTS.semantic, ...asObject(baseConfig.semantic), ...asObject(live.semantic) },
        preferredListenMode: ['always', 'wake'].includes(live.preferredListenMode ?? baseConfig.preferredListenMode ?? live.listenMode ?? baseConfig.listenMode) ? (live.preferredListenMode ?? baseConfig.preferredListenMode ?? live.listenMode ?? baseConfig.listenMode) : 'ptt',
        speakerVerification: { ...DEFAULTS.speakerVerification, ...asObject(baseConfig.speakerVerification), ...asObject(live.speakerVerification) },
        tts: { ...asObject(baseConfig.tts), ...asObject(live.tts) },
        turnSignals: { ...DEFAULTS.turnSignals, ...asObject(baseConfig.turnSignals), ...asObject(live.turnSignals) },
        voiceSession: mergeVoiceSessionConfig(DEFAULTS.voiceSession, asObject(baseConfig.voiceSession), asObject(live.voiceSession)),
      }
    }
    cfg.asr = 'sensevoice'
    cfg.modelCompute = 'cpu'
    cfg.models = { ...DEFAULTS.models, ...asObject(cfg.models) }
    if (typeof cfg.models.sensevoiceDir !== 'string' || !cfg.models.sensevoiceDir.trim()) cfg.models.sensevoiceDir = DEFAULTS.models.sensevoiceDir
    // A package owns its matching helper, including when upgrading an old file-URL install.
    // Retain the old stored override for rollback; do not mix its Python with this version.
    if (baseConfig.bundled === true) {
      cfg.helperPath = DEFAULT_HELPER
      cfg.autoStart = false
    }
  }

  // 首次运行把默认配置写出来，主人知道该改哪个文件
  refresh()
  const ALWAYS_KEYS = [
    'listenMode',
    'preferredListenMode',
    'wakeWords',
    'wakeWordAliases',
    'wakeListenTimeoutMs',
    'retainRecordings',
    'conversationWindowMs',
    'idleExitMs',
    'alwaysMinSpeechMs',
    'alwaysSilenceMs',
    'alwaysMaxSegmentMs',
    'windowSec',
    'semantic',
    'pttKeyboard',
    'pttMouse', // 鼠标侧键 PTT（老配置补字段用）
    'pttMouseMaxSeconds',
    'speakerVerification',
    'turnSignals',
    'voiceSession',
  ]
  if (!existsSync(CONFIG_PATH)) {
    writeJson(CONFIG_PATH, {
      pythonPath: cfg.pythonPath,
      // Omit the computed helper path so package upgrades remain relocatable.
      asr: cfg.asr,
      device: cfg.device,
      outputDevice: cfg.outputDevice,
      threshold: cfg.threshold,
      models: cfg.models,
      vad: cfg.vad,
      delivery: cfg.delivery,
      workspaceCwd: cfg.workspaceCwd,
      voiceSessionId: cfg.voiceSessionId,
      ...Object.fromEntries(ALWAYS_KEYS.map((k) => [k, cfg[k]])),
    })
    log(`已写出默认配置 ${CONFIG_PATH}`)
  } else {
    // 老配置补上常听字段（只补缺失的 key，不动主人已经改过的值）
    const live = readJson(CONFIG_PATH, null)
    if (live && typeof live === 'object' && !Array.isArray(live)) {
      let changed = false
      if (live.asr !== 'sensevoice' || live.modelCompute !== undefined && live.modelCompute !== 'cpu') {
        live.asr = 'sensevoice'
        live.modelCompute = 'cpu'
        changed = true
      }
      for (const key of ALWAYS_KEYS) {
        if (live[key] === undefined) {
          live[key] = cfg[key]
          changed = true
        }
      }
      const savedTts = asObject(live.tts)
      const legacyKeys = ['edgeVoice', 'edgeTextTransmissionAccepted', 'systemVoice', 'systemFallback']
      const needsTtsMigration = ['edge', 'system', 'unconfigured'].includes(savedTts.provider)
        || legacyKeys.some(key => Object.hasOwn(savedTts, key))
      const validLegacyTts = ['edgeTextTransmissionAccepted', 'systemFallback', 'deepseekTextTransmissionAccepted']
        .every(key => !Object.hasOwn(savedTts, key) || typeof savedTts[key] === 'boolean')
        && (!Object.hasOwn(savedTts, 'edgeVoice') || typeof savedTts.edgeVoice === 'string' && savedTts.edgeVoice.trim())
        && (!Object.hasOwn(savedTts, 'systemVoice') || savedTts.systemVoice === null || typeof savedTts.systemVoice === 'string' && savedTts.systemVoice.trim())
        && (!Object.hasOwn(savedTts, 'deepseekVoice') || ['stella', 'tide'].includes(savedTts.deepseekVoice))
      if (needsTtsMigration && validLegacyTts) {
        try {
          live.tts = ttsSettings(savedTts)
          changed = true
        } catch { /* Keep the original settings available for diagnosis. */ }
      }
      if (changed) {
        writeJson(CONFIG_PATH, live)
        log(`已更新兼容配置 ${CONFIG_PATH}`)
      }
    }
  }

  const startedAt = Date.now()
  let disposed = false
  const pythonRuntime = createPythonRuntimeResolver({ bindingPath: join(DIR, 'python-runtime.json'), log })
  const sherpaRuntime = createSherpaRuntime({ rootDirectory: join(DIR, 'models', 'wake-spotter'), log })
  const senseVoiceAsr = createSenseVoiceAsr({ rootDirectory: DEFAULTS.models.sensevoiceDir, sherpaRuntime, log })
  const wakeSpotter = createWakeSpotter({ rootDirectory: join(DIR, 'models', 'wake-spotter'), sherpaRuntime, log })
  const usesStandardWeights = () => resolvePath(cfg.models.sensevoiceDir) === resolvePath(DEFAULTS.models.sensevoiceDir)
  const usesDefaultAsrModel = () => baseConfig.bundled === true && cfg.helperPath === DEFAULT_HELPER && usesStandardWeights()
  let managedRuntimeNeeded = false
  function prepareSenseVoice(retry = false) {
    refresh()
    if (disposed || !usesDefaultAsrModel() || !retry && senseVoiceAsr.snapshot().state !== 'idle') return
    void predecessorCleanup.then(() => {
      refresh()
      if (!disposed && usesDefaultAsrModel()) return trackOperation('asr', retry ? 'sensevoice.retry' : 'sensevoice.prepare', () => senseVoiceAsr.prepare({ retry }))
    }).catch(error => log(`SenseVoice 下载未完成 [${error?.code ?? 'ASR_PREPARE_FAILED'}]`))
  }

  // -------------------------------------------------------------------------
  // Python 帮工
  // -------------------------------------------------------------------------

  let child = null
  let readyAt = 0
  let readyInfo = null
  let restartTimer = null
  let stableHelperTimer = null
  let restarts = 0
  let stdoutBuf = ''
  let starting = null
  let rejectStarting = null
  const pending = new Set()
  let requestSequence = 0
  let helperProtocolError = null
  let helperShutdown = null
  let helperStopFailure = null
  let helperGeneration = 0
  // Whole grant cleanup, including root/TTS waits before physical readback.
  let audioCleanupPending = 0
  const deliveries = []
  const capturedVoiceInputs = new Set()
  let delivered = 0
  let dropped = 0
  let lastLatency = null
  const voicePresentation = createVoicePresentation(CONFIG_PATH + '.presentation.json', log)
  const hostService = name => ctx.get?.(name) ?? ctx[name]
  const standalone = createStandaloneVoiceOrigin({configPath:CONFIG_PATH,getService:hostService,compatPresentation:voicePresentation})
  function standaloneModel() {
    refresh()
    const saved = conversationModel(cfg.voiceSession)
    const choice = saved.mode === 'manual' ? saved : hostService('agentDefaultModel')?.currentSelection?.()
    if (!choice?.provider || !choice?.model) {
      throw Object.assign(new Error('请选择鱼应的默认对话模型，或在 DSH 设置默认模型后重试。'), { code: 'VOICE_MODEL_REQUIRED' })
    }
    return {provider:choice.provider,model:choice.model,...(choice.reasoningEffort===undefined?{}:{reasoningEffort:choice.reasoningEffort})}
  }
  const currentVoiceOrigin = () => ctx.agents?.get?.(owner()) ?? standalone.current()
  async function acquireStandalone(signal) {
    const selection = standaloneModel()
    try {
      if (!await hostService('llm')?.resolveModelInfo?.(selection.provider, selection.model, signal)) throw new Error('模型不可用')
    } catch (cause) {
      signal?.throwIfAborted()
      throw Object.assign(new Error('DSH 默认对话模型暂不可用，请选择已配置的模型后重试。', { cause }), { code:'VOICE_MODEL_REQUIRED' })
    }
    return standalone.acquire(selection, signal)
  }
  const voiceSessions = createVoiceSessionManager(ctx, {
    compatPresentation: voicePresentation,
    controlOriginId: standalone.id,
    getTtsResidency: () => tts.residency?.(),
    getExternalRecovery: () => predecessorRecovery ?? (helperStopFailure ? 'helper-stop-unconfirmed' : helperShutdown || audioCleanupPending ? 'helper-cleanup-pending' : null),
    getConfig: () => { refresh(); return { ...cfg.voiceSession, speechTool: 'whale_voice_speak' } },
    log,
    onTiming: timing => { if (timing.traceId) log(`llm_timing ${JSON.stringify(timing)}`) },
    onProviderFailure: message => {
      recordOperation({ source: 'host', action: 'conversation.provider', phase: 'finished', result: 'failed' })
      conversation.setProviderError(message)
    },
    canRemindSpeech(agent, epoch, signal) {
      refresh()
      if (epoch !== cfg.voiceSessionEpoch || !sessionControl.allowed(agent.session.id)) return false
      const settings = ttsSettings(cfg.tts)
      if (settings.provider === 'off') return false
      assertSpeechAuthorization(agent, settings, signal)
      return true
    },
    onSpeechReminder({ action, id, rootSessionId }) {
      recordOperation({ source: 'host', action: 'conversation.speech-reminder.' + action, phase: 'changed',
        subjectId: id, targetId: rootSessionId, result: action === 'unconfirmed' ? 'unknown' : action === 'withdrawn' ? 'cancelled' : 'accepted' })
    },
  })
  const optionalService = name => typeof ctx.get === 'function' ? ctx.get(name) : ctx[name]
  function voiceTargetTitle(session) {
    if (!session) return null
    try {
      const title = optionalService('sessionTitle')?.get?.(session)?.title
      return typeof title === 'string' && title.trim() ? title.trim().slice(0, 256).toWellFormed() : null
    } catch { return null }
  }
  const existingVoice = createExistingVoiceSessions(ctx, {
    getService: optionalService,
    managedRootIds: signal => voiceSessions.managedRootIds(signal),
    internalSessionId: standalone.id,
    shownInWorkspace: id => voicePresentation.active() && voicePresentation.shown(id),
    canSendNow: () => !deliveryLimitReached(Date.now()),
    readTitle: voiceTargetTitle,
    assertMicrophone: signal => agentControl.requireScopes(ownerSettings, ['microphone'], signal),
    isGrantCurrent: epoch => !disposed && !grantPersistenceFailure && !authorizationStopping
      && owner() === standalone.id && cfg.voiceSessionEpoch === epoch,
    onActivity: () => conversation.refreshRetryTranscripts(),
    onRetained: (grant, captureTurnId) => recordOperation({ source: 'host', action: 'voice.transcript-retained',
      phase: 'finished', result: 'ok', subjectId: captureTurnId, targetId: grant.selection.sessionId }),
    onDelivery(grant, item, state, select) {
      if (select) conversation.selectInputDelivery({
        id: item.id, text: item.text, sessionId: grant.selection.sessionId, title: item.title, state,
      })
      else conversation.updateInputDelivery(item.id, state)
    },
    onDispatch: (grant, item) => conversation.bindInputDelivery(item.id, grant.agent.session, { kind: 'user', platform: EXISTING_VOICE_PLATFORM }),
    onInput: (grant, text, id) => conversation.input(text, existingReplyGrant(grant), id),
    onReply: (grant, text, id, state) => conversation.boundReply(text, existingReplyGrant(grant), id, state),
    onError: (_grant, error) => conversation.setProviderError(error.message),
    onInvalidGrant: (epoch, error) => {
      recordOperation({ source: 'host', action: 'microphone.scope-lost', phase: 'finished', result: 'denied', error })
      log(`bound voice authorization ended: ${String(error?.code ?? error?.name ?? 'unknown')}`)
      void revokeVoiceFromOwner(epoch).catch(failure => log(`bound voice cleanup failed: ${String(failure?.code ?? failure?.name ?? 'unknown')}`))
    },
    play: async (text, signal) => {
      refresh()
      const provider = ttsSettings(cfg.tts).provider
      if (provider === 'off') return { skipped: true }
      assertNoTtsVerification()
      turnSignals.suppressEndCue('speech_requested')
      let outcome, completedSegments = 0
      for (const segment of splitBoundReply(text.toWellFormed())) {
        refresh()
        const settings = ttsSettings(cfg.tts)
        if (settings.provider !== provider || !existingVoice.allowed(cfg.voiceSessionEpoch))
          throw Object.assign(new Error('语音授权或朗读服务已改变，已停止本轮朗读。'), { code: 'VOICE_EXISTING_OUTPUT_CHANGED' })
        outcome = await speakReply(segment, settings, ownerSettings, signal)
        if (outcome.playbackCompleted !== true) {
          reportSpeechFailure(outcome, completedSegments > 0)
          return outcome
        }
        completedSegments++
      }
      return outcome
    },
    log,
  })
  function existingReplyGrant(grant) {
    return { rootSessionId: grant.selection.sessionId, ownerSessionId: standalone.id, epoch: grant.epoch }
  }
  const conversation = createVoiceConversation({
    getRetryTranscripts: agent => agent === ownerSettings ? existingVoice.retryStatus() : null,
    getHelperState: () => ({ online: Boolean(child && readyAt), listenMode: child && readyAt ? cachedListenMode : null }),
    getWakeState: () => child && readyAt && cfg.voiceSessionId && cachedListenMode === 'wake' ? cachedWake : null,
    getScope: () => {
      const bound = existingVoice.active
      if (bound) return { ...existingReplyGrant(bound), enabled: sessionControl.allowed(standalone.id), humanOnly: true }
      const voice = voiceSessions.status()
      return { enabled: voice.enabled && sessionControl.allowed(voice.id) && voice.epoch === cfg.voiceSessionEpoch,
        rootSessionId: voice.id, ownerSessionId: voice.ownerSessionId, epoch: voice.epoch }
    },
    getAgent: id => ctx.agents?.get?.(id), assertCaller: assertUiCaller,
  })
  const resolveDeepSeekApiKey = async () => {
    const credential = await ctx.get?.('credentials')?.resolve?.('DEEPSEEK_API_KEY')
    return credential?.value ?? process.env.DEEPSEEK_API_KEY
  }
  const getTtsOutputDevice = () => { refresh(); return cfg.outputDevice ?? null }
  const windowsTts = createWindowsTtsAdapter({ outputDevice: getTtsOutputDevice })
  const tts = createTtsRuntime({ getResidencyMode: () => { refresh(); return cfg.voiceSession?.performanceMode ?? 'compatibility' }, resolveManagedLocalTts: (config, signal) => getModelInstaller().resolveManagedLocalTts(config, signal), resolveDeepSeekApiKey, outputDevice: getTtsOutputDevice, getConfig: () => { refresh(); return cfg.tts }, adapter: windowsTts })
  function assertSpeechAuthorization(agent, settings, signal) {
    signal?.throwIfAborted()
    const consent = TTS_CLOUD_CONSENT[settings.provider]
    if (consent && !settings[consent.field]) throw Object.assign(new Error(consent.requiredMessage), { code: 'TTS_DEEPSEEK_CONSENT_REQUIRED' })
    agentControl.requireScopes(agent, ['local-audio', ...(consent ? [consent.scope] : [])], signal)
  }
  const classifyPlayback = value => {
    if (value?.playbackCompleted) return 'ok'
    if (value?.reason) return { result: 'failed', error: { code: value.reason, deepseekDiagnostic: value.deepseekDiagnostic } }
    return 'unavailable'
  }
  function reportSpeechFailure(outcome, previousPlayback = false) {
    if (!outcome.textOnly || typeof outcome.message !== 'string') return
    const detail = previousPlayback ? '。前面的语音已完成播放。'
      : outcome.deepseekDiagnostic?.playbackPossible ? '。部分语音可能已播放。' : ''
    conversation.setProviderError(outcome.message + detail)
  }
  function speakReply(text, settings, agent, signal, speechId = randomUUID()) {
    return trackOperation('tts', 'playback', async () => {
      if (settings.provider !== 'deepseek') {
        assertSpeechAuthorization(agent, settings, signal)
        return tts.speak(text, { signal })
      }
      const started = performance.now()
      const onTiming = phase => log(`tts_timing ${JSON.stringify({ speechId, phase, elapsedMs: Math.round(performance.now() - started) })}`)
      onTiming('requested')
      try {
        assertSpeechAuthorization(agent, settings, signal)
        const result = await tts.speak(text, {
          signal, onTiming,
          beforeRequest: activeSignal => assertSpeechAuthorization(agent, settings, activeSignal),
        })
        onTiming(result.textOnly ? 'text-only' : 'completed')
        return result
      } catch (error) {
        if (!signal?.aborted && !error?.uncertain && (
          typeof error?.code === 'string' && (error.code.startsWith('TTS_DEEPSEEK_')
            || ['TTS_PLATFORM_UNSUPPORTED', 'TTS_INVALID_AUDIO', 'AUDIO_OUTPUT_DEVICE_UNAVAILABLE', 'AUDIO_OUTPUT_DEVICE_INVALID',
              'TTS_PROCESS_START_FAILED', 'TTS_PROCESS_FAILED', 'TTS_INVALID_RESPONSE', 'TTS_TIMEOUT'].includes(error.code))
        )) {
          const deepseekDiagnostic = safeDeepSeekDiagnostic(error.deepseekDiagnostic)
          onTiming('text-only')
          return {
            provider: 'deepseek', textOnly: true, fallback: false, playbackCompleted: false, acousticConfirmation: false,
            reason: error.code, message: error.message, ...(deepseekDiagnostic ? { deepseekDiagnostic } : {}),
          }
        }
        onTiming(error?.name === 'AbortError' || error?.code === 'TTS_CANCELLED' ? 'cancelled' : 'failed')
        throw error
      }
    }, { operationId: speechId, classify: classifyPlayback })
  }
  let ttsVerification = null, ttsVerificationDone = null, ttsVerificationCleanupFailure = null
  const ttsRuntimeStatus = () => {
    const main = tts.status(), candidate = ttsVerification?.status()
    if (!candidate) return main
    return { ...(candidate.blocked || candidate.busy || ttsVerificationCleanupFailure ? candidate : main), ...(ttsVerificationCleanupFailure ? {state:'blocked',reason:'TTS_TERMINATION_UNCONFIRMED'} : {}), busy: main.busy || candidate.busy, blocked: main.blocked || candidate.blocked || Boolean(ttsVerificationCleanupFailure) }
  }
  const assertNoTtsVerification = () => {
    if (ttsVerification) throw Object.assign(new Error('朗读试听或验证正在进行，请先等待或停止'), { code: ttsVerification.status().blocked ? 'TTS_TERMINATION_UNCONFIRMED' : 'TTS_BUSY' })
  }
  async function withAuditionRuntime(config, run) {
    if (ttsVerification || tts.status().busy || tts.status().blocked) throw new Error('请先停止当前朗读')
    const runtime = createTtsRuntime({
      getConfig: () => config,
      resolveManagedLocalTts: (value, signal) => getModelInstaller().resolveManagedLocalTts(value, signal),
      resolveDeepSeekApiKey, outputDevice: getTtsOutputDevice,
      adapter: windowsTts,
    })
    ttsVerification = runtime
    const completion = (async () => {
      try { return await run(runtime) }
      finally {
        try { await runtime.dispose() }
        catch (error) { ttsVerificationCleanupFailure = error; throw error }
        if (!runtime.status().blocked && ttsVerification === runtime) ttsVerification = null
      }
    })()
    ttsVerificationDone = completion
    try { return await completion }
    finally { if (ttsVerificationDone === completion && !runtime.status().blocked) ttsVerificationDone = null }
  }
  let inputSequence = 0
  let inputAttempt = null
  let inputGrant = null
  let outputStartObservation = { status: 'unsupported', reason: 'backend-playback-events-unavailable' }
  let conservativeCueSuppression = { status: 'available', source: 'native-speak-request' }
  const sameGrant = (message) => {
    refresh()
    return Boolean(cfg.voiceSessionId && cfg.voiceSessionEpoch
      && message?.voiceSessionId === cfg.voiceSessionId
      && message?.voiceSessionEpoch === cfg.voiceSessionEpoch
      && sessionControl.allowed(cfg.voiceSessionId))
  }
  function cueCommand(op, request) {
    // A cue must never start/restart the helper or delay recognition.
    if (!child?.stdin?.writable || !readyAt || readyInfo?.turnSignals?.protocol !== 'whale-input-cue/1')
      return { status: 'unsupported', reason: 'cue-helper-unavailable' }
    refresh()
    if (op === 'cue' && (!inputGrant || !sameGrant(inputGrant)))
      return { status: 'unsupported', reason: 'stale-permission' }
    recordOperation({ source: 'helper', action: op === 'cue' ? 'cue.play' : 'cue.cancel', phase: 'requested', subjectId: request?.inputTurnId })
    child.stdin.write(JSON.stringify({ op, ...request, voiceSessionId: cfg.voiceSessionId, voiceSessionEpoch: cfg.voiceSessionEpoch }) + '\n', 'utf8')
    return { status: 'requested' }
  }
  const turnSignals = createVoiceTurnSignals({
    getConfig: () => { refresh(); return cfg.turnSignals },
    getOutput: () => {
      refresh()
      return {
        capabilities: { acousticIsolation: cfg.turnSignals?.headphonesConfirmed === true ? 'headphones-confirmed' : 'none' },
        async requestCancel(request) {
          voiceSessions.cancelSpeechOutput()
          existingVoice.cancelSpeech()
          const result = await trackOperation('tts', 'cancel-for-input', () => tts.cancel(),
            { classify: receipt => receipt.status === 'unconfirmed' ? 'unknown' : 'ok' })
          return { ...request, status: ['cancelled', 'idle'].includes(result.status) ? 'confirmed' : 'requested', queueFlushed: result.status !== 'unconfirmed', staleGenerationDiscarded: result.status !== 'unconfirmed' }
        },
      }
    },
    getCueOutput: () => readyInfo?.turnSignals?.protocol === 'whale-input-cue/1' ? {
      capabilities: { acousticIsolation: cfg.turnSignals?.headphonesConfirmed === true ? 'headphones-confirmed' : 'none' },
      playCue: request => cueCommand('cue', request),
      cancelCue: request => cueCommand('cue-cancel', request),
    } : null,
  })
  function signalStatus() { return { ...turnSignals.status(), outputStartObservation: { ...outputStartObservation }, conservativeCueSuppression: { ...conservativeCueSuppression } } }
  function currentInput(message) {
    return sameGrant(message) && sameCapture(message) && inputAttempt
      && message.inputTurnId === inputAttempt.id && message.mode === inputAttempt.mode
      && message.voiceSessionId === inputAttempt.voiceSessionId && message.voiceSessionEpoch === inputAttempt.voiceSessionEpoch
      && message.captureId === inputAttempt.captureId
      && !inputAttempt.terminal
  }
  function receiveInputSignal(message) {
    if (!sameGrant(message) || !/^[a-f0-9]{24}$/.test(message?.inputTurnId ?? '')
      || !['ptt', 'ptt-mouse', 'ptt-keyboard', 'always', 'wake'].includes(message.mode)
      || !sameCapture(message)) return false
    if (message.state === 'error') {
      if (!captureFencing || !currentInput(message) || message.inputSequence !== inputSequence
        || !['device', 'recognition', 'no-speech'].includes(message.code)) return false
      inputAttempt.terminal = true
      turnSignals.cancel('input-error')
      conversation.setInputActive(false)
      conversation.setInputError(message.code)
      return true
    }
    if (message.state === 'attempt' || message.state === 'start') {
      const startingAttempt = message.state === 'start' && currentInput(message)
        && !inputAttempt.started && message.inputSequence === inputSequence
      if (!Number.isSafeInteger(message.inputSequence) || message.inputSequence < 1
        || !startingAttempt && message.inputSequence <= inputSequence) return false
      inputSequence = message.inputSequence
      inputAttempt = { id: message.inputTurnId, mode: message.mode, voiceSessionId: message.voiceSessionId,
        voiceSessionEpoch: message.voiceSessionEpoch, captureId: message.captureId, started: message.state === 'start', terminal: false }
      // A retry is not evidence that capture or recognition has recovered.
      if (message.state === 'attempt') return true
      voiceSessions.cancelCacheWarmup()
      // A validated explicit PTT onset supersedes only unsent continuous input.
      // Ordinary VAD starts and rejected/replayed signals keep their queues.
      if (['ptt', 'ptt-mouse', 'ptt-keyboard'].includes(message.mode)) {
        existingVoice.cancelSpeech()
        continuousDeliveryGeneration += 1
      }
      inputGrant = { voiceSessionId: message.voiceSessionId, voiceSessionEpoch: message.voiceSessionEpoch }
      outputStartObservation = { status: 'unsupported', reason: 'backend-playback-events-unavailable' }
      conservativeCueSuppression = { status: 'available', source: 'native-speak-request' }
    }
    const accepted = turnSignals.handleInput(message)
    if (accepted && ['start', 'end', 'cancel'].includes(message.state)) recordOperation({
      source: 'helper', action: `capture.${message.mode}`, phase: message.state === 'start' ? 'requested' : 'finished',
      result: message.state === 'cancel' ? 'cancelled' : message.state === 'end' ? 'ok' : undefined, subjectId: message.inputTurnId,
    })
    if (message.state === 'cancel' && currentInput(message)) inputAttempt.terminal = true
    if (accepted) conversation.setInputActive(message.state === 'start')
    return accepted
  }
  const transcriptReceivedAt = new WeakMap()
  const timingKeys = ['normalizeMs', 'asrMs', 'earlyAsrLeadMs', 'speakerMs', 'prosodyMs', 'semanticMs', 'saveMs', 'processingMs', 'stopToTranscriptMs']

  function latencySnapshot(result) {
    const values = Object.fromEntries(timingKeys.filter((key) => Number.isFinite(result?.timings?.[key]) && result.timings[key] >= 0).map((key) => [key, result.timings[key]]))
    return {
      traceId: /^[a-f0-9]{16}$/.test(result?.traceId ?? '') ? result.traceId : null,
      ...values,
    }
  }

  function pendingFor(types, timeoutMs, label, requestId) {
    return new Promise((resolve, reject) => {
      const entry = {
        requestId,
        types: new Set(types),
        resolve,
        reject,
        label,
        timer: null,
      }
      entry.timer = setTimeout(() => {
        pending.delete(entry)
        reject(new Error(`${label} 超时（>${Math.round(timeoutMs / 1000)}s）`))
      }, timeoutMs)
      pending.add(entry)
    })
  }

  function settle(message) {
    for (const entry of Array.from(pending)) {
      if (message.requestId !== entry.requestId || !entry.types.has(message.event)) continue
      clearTimeout(entry.timer)
      pending.delete(entry)
      entry.resolve(message)
      return true
    }
    return false
  }

  function failPending(message) {
    for (const entry of Array.from(pending)) {
      if (message.requestId !== entry.requestId) continue
      clearTimeout(entry.timer)
      pending.delete(entry)
      entry.reject(new Error(message?.message ?? '帮工报错'))
      return true
    }
    return false
  }

  function handleLine(line) {
    let msg
    try {
      msg = JSON.parse(line)
    } catch {
      recordOperation({ source: 'helper', action: 'protocol.invalid-message', phase: 'finished', result: 'failed' })
      log(`非 JSON 输出: ${line.slice(0, 200)}`)
      return
    }
    const event = msg?.event
    // Expired/completed correlated replies cannot become unsolicited input.
    if (msg.requestId != null && !Array.from(pending).some(entry => entry.requestId === msg.requestId)) return
    if (event === 'ready') {
      if (msg.requestProtocol !== 'whale-request/1') {
        helperProtocolError = Object.assign(new Error('帮工协议不兼容：需要 whale-request/1，请使用当前插件附带的 helper。'), { code: 'VOICE_HELPER_PROTOCOL' })
        lastError = { at: new Date().toISOString(), message: helperProtocolError.message }
        void stopHelper(helperProtocolError, true).catch(() => {})
        return
      }
      inputSequence = 0
      inputAttempt = null
      conversation.setInputError(null)
      turnSignals.cancel('helper-ready')
      inputGrant = null
      readyAt = Date.now()
      readyInfo = msg
      captureFencing = msg.captureProtocol === 'whale-capture/1'
      captureId = msg.captureId ?? null
      cachedListenMode = ['always', 'wake'].includes(msg.listenMode) ? msg.listenMode : 'ptt'
      conversation.refreshHelperState()
      log(`helper ready pid=${msg.pid} python=${msg.python} asr=${msg.asr}`)
      if (Array.isArray(msg.warnings) && msg.warnings.length) log(`helper 警告: ${msg.warnings.join(' | ')}`)
      settle(msg)
      return
    }
    if (event === 'wake-state') {
      if (sameGrant(msg) && sameCapture(msg)) {
        cachedWake = { state: msg.state, deadlineAt: msg.deadlineAt, streamOpen: msg.streamOpen, detection: msg.detection === 'acoustic-after-utterance' ? msg.detection : 'asr-after-utterance' }
        conversation.refreshWakeState()
      }
      return
    }
    if (event === 'voice-input') { receiveInputSignal(msg); return }
    if (event === 'cue') {
      if (sameGrant(msg)) {
        turnSignals.reportCue(msg)
        const result = { played: 'ok', cancelled: 'cancelled', unsupported: 'unavailable', disabled: 'unavailable' }[msg.status]
        if (result) recordOperation({ source: 'helper', action: 'cue.play', phase: 'finished', result, subjectId: msg.inputTurnId })
      }
      return
    }
    if (event === 'error') {
      recordOperation({ source: 'helper', action: 'protocol.error', phase: 'finished', result: 'failed', error: { code: msg.code } })
      log(`helper error: ${msg.message ?? ''}${msg.detail ? ` :: ${String(msg.detail).slice(0, 300)}` : ''}`)
      if (!failPending(msg)) {
        // 没有等待者（比如 PTT 自动停之后的失败），当成一条状态记下来
        lastError = { at: new Date().toISOString(), message: String(msg.message ?? '') }
      }
      return
    }
    if (event === 'transcript') {
      transcriptReceivedAt.set(msg, performance.now())
      recordOperation({ source: 'asr', action: 'transcribe', phase: 'finished',
        result: typeof msg.text === 'string' && msg.text.trim() ? 'ok' : 'unavailable', subjectId: msg.inputTurnId ?? msg.traceId })
      log(
        `transcript${msg.mode === 'always' ? '(always)' : ''} dur=${msg.dur} emotion=${msg.emotion} score=${
          msg.speaker_score
        } ok=${msg.speaker_ok}${msg.wake ? ` wake=${msg.wake}(${msg.wake_source ?? '?'})` : ''}${
          msg.semantic_score != null ? ` sem=${msg.semantic_score}` : ''
        }${Array.isArray(msg.recent) && msg.recent.length ? ` recent=${msg.recent.length}` : ''}`,
      )
      if (msg.path) {
        // 文件转写：直接回给等待的工具
        if (!settle(msg)) log('没有等待者接受 transcript（path 模式）')
        return
      }
      if (!sameCapture(msg)) return
      if (currentInput(msg) && typeof msg.text === 'string' && msg.text.trim()) {
        inputAttempt.terminal = true
        conversation.setInputError(null)
      }
      // 常听模式的段：只投递，不去抢 PTT/文件转写的等待者
      if (msg.mode === 'always' || msg.mode === 'wake') {
        deliverVoice(msg).catch((err) => log(`投递失败: ${String(err?.message ?? err)}`))
        return
      }
      // PTT 结果：投进会话
      deliverVoice(msg).catch((err) => log(`投递失败: ${String(err?.message ?? err)}`))
      settle(msg)
      return
    }
    if (event === 'always-drop') {
      recordOperation({ source: 'asr', action: 'capture.discarded', phase: 'finished', result: 'cancelled' })
      const extra = msg.speaker_score != null ? ` score=${msg.speaker_score}` : ''
      const sem =
        msg.semantic_score != null ? ` sem=${msg.semantic_score}` : msg.semantic_error ? ' semantic-unavailable' : ''
      log(`always-drop: [${msg.reason ?? '?'}]${extra}${sem}`)
      return
    }
    if (event === 'always-event') {
      if (['started','stopped','error','exit'].includes(msg.state)) recordOperation({
        source: 'helper', action: `continuous.${msg.state}`, phase: 'changed', result: msg.state === 'error' ? 'failed' : 'ok',
      })
      lastAlwaysEvent = msg.state ?? null
      log(
        `always: ${msg.state ?? '?'}${msg.wake ? ` wake=${msg.wake}` : ''}${
          msg.reason ? ` reason=${msg.reason}` : ''
        }${msg.message ? ` ${msg.message}` : ''}`,
      )
      return
    }
    if (event === 'ptt-mouse' || event === 'ptt-mouse-event') {
      if (event === 'ptt-mouse' && msg.state === 'down' && sameGrant(msg)) {
        voiceSessions.cancelCacheWarmup()
        stopSpeechForInput()
      }
      const dur = msg.durMs != null ? ` dur=${(Number(msg.durMs) / 1000).toFixed(2)}s` : ''
      log(
        `ptt-mouse: ${msg.state ?? '?'}${msg.buttonName ? ` ${msg.buttonName}` : ''}${dur}${
          msg.reason ? ` reason=${msg.reason}` : ''
        }`,
      )
      return
    }
    if (event === 'prosody') {
      if (!settle(msg)) log('没有等待者接受 prosody')
      return
    }
    if (
      event === 'capture-status' ||
      event === 'input-devices' ||
      event === 'status' ||
      event === 'enrolled' ||
      event === 'started' ||
      event === 'stopped' ||
      event === 'pong' ||
      event === 'recent' ||
      event === 'ptt-status'
    ) {
      if (event === 'status') cachedInferenceCompute = msg.inferenceCompute ?? null
      if (event === 'status' || event === 'input-devices') cachedInputDevices = { items: msg.inputDevices, observedAt: Date.now() }
      if (event === 'ptt-status' || event === 'status' && msg.ptt) cachedPtt = { ...(event === 'ptt-status' ? msg : msg.ptt), observedAt: Date.now() }
      settle(msg)
      return
    }
    if (event === 'inference-compute') { cachedInferenceCompute = msg.inferenceCompute ?? null; return }
    if (event === 'always' || event === 'always-status') {
      const observed = msg.status ?? msg
      if (typeof observed.enabled === 'boolean') cachedListenMode = observed.enabled ? (observed.listenMode === 'wake' ? 'wake' : 'always') : 'ptt'
      cachedWake = observed.wake ?? { state: 'disabled', deadlineAt: null, streamOpen: false, detection: 'asr-after-utterance' }
      conversation.refreshWakeState()
      settle(msg)
      return
    }
    if (event === 'recording') {
      log(`recording (${msg.mode ?? '?'})`)
      return
    }
    if (event === 'bye') {
      log('helper bye')
      return
    }
    log(`未处理事件: ${JSON.stringify(msg).slice(0, 200)}`)
  }

  let lastError = null
  let lastAlwaysEvent = null
  let cachedInferenceCompute = null
  let cachedInputDevices = null
  let cachedPtt = null
  let cachedListenMode = 'ptt'
  let captureId = null
  let captureFencing = false
  let continuousDeliveryGeneration = 0
  let cachedWake = { state: 'disabled', deadlineAt: null, streamOpen: false, detection: 'asr-after-utterance' }
  function sameCapture(message) {
    return !captureFencing || Boolean(readyAt && message.captureId === captureId)
  }
  function invalidateCapture() {
    existingVoice.cancelSpeech()
    inputAttempt = null
    conversation.setInputError(null)
    captureId = randomUUID()
    cachedWake = { state: 'disabled', deadlineAt: null, streamOpen: false, detection: 'asr-after-utterance' }
    turnSignals.cancel('listen-mode-changed')
    conversation.setInputActive(false)
    conversation.refreshWakeState()
  }

  function stopTtsConfirmed() {
    return trackOperation('tts', 'stop', stopTtsOutput)
  }
  async function stopTtsOutput() {
    voiceSessions.cancelSpeechOutput()
    existingVoice.cancelSpeech()
    const candidate = ttsVerification, completion = ttsVerificationDone
    // Always attempt to stop both resources, even if one stop is uncertain.
    const results = await Promise.allSettled([candidate?.cancel(), tts.cancel()])
    if (completion) await completion.catch(() => {}) // includes candidate disposal, not just synthesis
    if (ttsVerificationCleanupFailure) throw ttsVerificationCleanupFailure
    const failed = results.find(result => result.status === 'rejected')
    if (failed) throw failed.reason
    if (results.some(result => result.value?.status === 'unconfirmed') || candidate?.status().blocked || tts.status().blocked) {
      throw Object.assign(new Error('未能确认朗读或模型验证已停止；请完整重启宿主后再试'), { code: 'TTS_TERMINATION_UNCONFIRMED' })
    }
    return { status: results.some(result => result.value?.status === 'cancelled') ? 'cancelled' : 'idle' }
  }

  function stopSpeechForInput() {
    existingVoice.cancelSpeech()
    turnSignals.cancel('voice-input')
    // Capture continues while the owned playback queue shuts down.
    return turnSignals.requestCancellation('voice-input')
  }

  function owner() {
    refresh()
    return typeof cfg.voiceSessionId === 'string' ? cfg.voiceSessionId : null
  }

  let grantPersistenceFailure = null
  let existingVoiceEpoch = null
  let authorizationStopping = false
  let grantFailureShutdown = null
  function lockAudioAfterUnconfirmedGrant(error) {
    if (grantFailureShutdown) return grantFailureShutdown
    grantPersistenceFailure = error
    existingVoice.close()
    inputAttempt = null
    conversation.invalidate()
    clearTimeout(restartTimer)
    turnSignals.cancel('grant-persistence-unconfirmed')
    inputGrant = null
    readyAt = 0
    readyInfo = null
    cachedInputDevices = null
    cachedInferenceCompute = null
    cachedPtt = null
    cachedListenMode = null
    rejectStarting?.(error)
    for (const entry of Array.from(pending)) {
      clearTimeout(entry.timer)
      pending.delete(entry)
      entry.reject(error)
    }
    const exited = stopHelper(error, true)
    grantFailureShutdown = Promise.allSettled([exited, voiceSessions.close()]).then(results => {
      const failed = results.find(result => result.status === 'rejected')
      if (failed) throw failed.reason
    })
    grantFailureShutdown.catch(error => log(`授权失败后的关闭未确认: ${String(error?.code ?? error?.name ?? 'unknown')}`))
    return grantFailureShutdown
  }
  function saveOwner(id, epoch = randomUUID()) {
    return trackOperation('host', id === null ? 'microphone.revoke' : 'microphone.grant', () => saveVoiceOwner(id, epoch), { subjectId: id ?? cfg.voiceSessionId })
  }
  function saveVoiceOwner(id, epoch) {
    if (grantPersistenceFailure) throw grantPersistenceFailure
    if (id !== null) assertVoiceAuthorizationActive()
    if (id === null) existingVoiceEpoch = null
    inputAttempt = null
    conversation.invalidate()
    tts.cancel().catch(() => {})
    turnSignals.cancel('permission-changed')
    inputGrant = null
    outputStartObservation = { status: 'unsupported', reason: 'backend-playback-events-unavailable' }
    conservativeCueSuppression = { status: 'available', source: 'native-speak-request' }
    const readGrantDocument = (allowMissing = false) => {
      try {
        let raw
        try { raw = readFileSync(CONFIG_PATH, 'utf8') } catch (error) {
          if (allowMissing && error?.code === 'ENOENT') return {}
          throw error
        }
        const value = JSON.parse(raw.replace(/^\uFEFF/, ''))
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Configuration must be a JSON object')
        return value
      } catch {
        const error = Object.assign(new Error('语音授权配置无法安全读取，已停止音频且未覆盖原文件；请修复配置后完整重新加载。'), { code: 'VOICE_GRANT_PERSISTENCE_UNCONFIRMED', persistenceConfirmed: false })
        lockAudioAfterUnconfirmedGrant(error)
        throw error
      }
    }
    const live = readGrantDocument(true)
    delete live.sessionIds
    writeJson(CONFIG_PATH, { ...live, voiceSessionId: id, voiceSessionEpoch: epoch, listenMode: 'ptt' })
    refresh()
    const observed = readGrantDocument()
    if (observed.voiceSessionId !== id || observed.voiceSessionEpoch !== epoch || observed.listenMode !== 'ptt') {
      grantPersistenceFailure = Object.assign(new Error('语音授权保存未获确认，已阻止继续授权；请检查配置保存状态后重新加载，不能自动重试。'), { code: 'VOICE_GRANT_PERSISTENCE_UNCONFIRMED', persistenceConfirmed: false })
      lockAudioAfterUnconfirmedGrant(grantPersistenceFailure)
      throw grantPersistenceFailure
    }
    conversation.invalidate()
  }

  let permissionChange = Promise.resolve()
  let permissionPending = 0
  function queuePermission(action) {
    permissionPending++
    const operation = permissionChange.then(() => predecessorCleanup).then(action)
    permissionChange = operation.catch(() => {})
    operation.then(() => { permissionPending-- }, () => { permissionPending-- })
    return operation
  }
  async function checkVoiceHost(operation, signal) {
    try { await voiceSessions.preflightHost(signal) }
    catch (error) {
      signal?.throwIfAborted()
      throw new VoicePreflightError(operation, error)
    }
  }
  const sessionControl = {
    owner,
    allowed(id) {
      if (disposed || grantPersistenceFailure || authorizationStopping) return false
      const currentOwner = owner()
      if (existingVoiceEpoch !== null) return id === standalone.id && currentOwner === id && existingVoice.allowed(cfg.voiceSessionEpoch)
      const grant = voiceSessions.status()
      const voiceGrantMatches = grant?.ownerSessionId === currentOwner && grant?.epoch === cfg.voiceSessionEpoch
      if (cfg.voiceSession?.enabled !== false) return Boolean(currentOwner && id && voiceGrantMatches && grant.enabled && (currentOwner === id || voiceSessions.allows(id)))
      return Boolean(currentOwner && id && currentOwner === id)
    },
    change(id, enabled, signal, expectedOwnerSessionId) {
      return changeVoiceGrant(id, enabled, signal, expectedOwnerSessionId)
    },
  }

  async function enableExistingVoice(signal) {
    const epoch = randomUUID()
    const assertBoundCurrent = () => {
      signal?.throwIfAborted()
      assertNoUpdateInstallation()
      if (!existingVoice.allowed(epoch)) throw new Error('原会话授权已改变，请重新开启语音。')
    }
    audioCleanupPending++
    try {
      saveOwner(null)
      stopSpeechForInput()
      await voiceSessions.close()
      await stopTtsConfirmed()
      await stopCaptureConfirmed()
      assertNoUpdateInstallation()
      const grant = await existingVoice.prepare(epoch, signal)
      signal?.throwIfAborted()
      existingVoiceEpoch = epoch
      saveOwner(standalone.id, epoch)
      await ear.pttStatus(assertBoundCurrent)
      await refreshInputDevices()
      if (['always', 'wake'].includes(cfg.preferredListenMode)) await ear.alwaysOn(cfg.preferredListenMode, assertBoundCurrent)
      assertBoundCurrent()
      existingVoice.watch(grant)
      return standalone.id
    } catch (error) {
      existingVoice.close()
      if (grantPersistenceFailure) { await grantFailureShutdown; throw grantPersistenceFailure }
      try {
        if (owner() === standalone.id && cfg.voiceSessionEpoch === epoch) saveOwner(null)
        else if (existingVoiceEpoch === epoch) existingVoiceEpoch = null
      } finally {
        await stopCaptureConfirmed()
      }
      throw error
    } finally { audioCleanupPending-- }
  }

  // Only the owner-admitted UI receives this route. Agent tools retain the
  // session-scoped path above; a selected window is attribution, not ownership.
  function changeVoiceGrant(requestedId, enabled, signal, expectedOwnerSessionId, human = false, expectedExistingSessionId) {
      // Pin the initiating instance before queuing: a replacement Agent with the
      // same ID is a different authorization source.
      const requestedCaller = requestedId === null ? null : ctx.agents?.get?.(requestedId)
      const standaloneRequest = human && requestedId === null
      const operation = queuePermission(async () => {
        const assertInitial = () => {
          signal?.throwIfAborted()
          if (enabled) {
            assertVoiceAuthorizationActive(); assertNoUpdateInstallation()
            if (human && expectedExistingSessionId !== undefined && (existingVoice.binding()?.sessionId ?? null) !== expectedExistingSessionId) {
              throw Object.assign(new Error('语音目标已更改，请核对首页显示的会话后再开始。'), { code: 'VOICE_EXISTING_BINDING_CHANGED' })
            }
          }
          if (disposed || !standaloneRequest && (!requestedCaller || ctx.agents?.get?.(requestedId) !== requestedCaller))
            throw Object.assign(new Error('发起会话已改变，未授予新语音权限'), { code: 'VOICE_ACTOR_SCOPE_CHANGED' })
          if (grantPersistenceFailure) throw grantPersistenceFailure
        }
        assertInitial()
        if (enabled && bindingCapture.active) throw new Error('请先结束按键录入，再开启语音')
        if (enabled) assertNoTtsVerification()
        if (enabled && expectedOwnerSessionId !== undefined && owner() !== expectedOwnerSessionId) throw Object.assign(new Error('语音所属会话已改变，请刷新后重新确认'), { code: 'VOICE_OWNER_CHANGED' })
        const previousVoice = voiceSessions.status()
        if (human && enabled && owner() !== null) {
          if (!sessionControl.allowed(owner()) || previousVoice.lifecycle?.archived === true) throw new Error('当前语音状态不可继续，请先关闭并核查；不会随窗口切换创建替代会话')
          return owner()
        }
        if (enabled && existingVoice.hasSelection()) {
          if (!human) throw new Error('请在鱼应界面明确开启已绑定原会话的语音。')
          return enableExistingVoice(signal)
        }
        if (enabled && cfg.voiceSession?.enabled !== false) await checkVoiceHost('enable', signal)
        const caller = standaloneRequest ? await acquireStandalone(signal) : requestedCaller
        const id = standaloneRequest ? assertUiCaller(caller) : requestedId
        assertInitial()
        const callerIsVoice = voiceSessions.allows(id) && sessionControl.allowed(id)
        const controllingId = human ? id : callerIsVoice ? owner() : id
        const initiatingAgent = ctx.agents?.get?.(controllingId)
        if (!initiatingAgent) throw new Error('发起会话不在线，无法变更语音授权')
        let closed = false
        const assertFresh = () => {
          signal?.throwIfAborted()
          if (enabled) { assertVoiceAuthorizationActive(); assertNoUpdateInstallation() }
          const closedUiRoot = human && closed && id === previousVoice.id
          if (disposed || !closedUiRoot && (ctx.agents?.get?.(controllingId) !== initiatingAgent || (!closed || !callerIsVoice) && ctx.agents?.get?.(id) !== caller))
            throw Object.assign(new Error('发起会话已改变，未授予新语音权限'), { code: 'VOICE_ACTOR_SCOPE_CHANGED' })
          if (grantPersistenceFailure) throw grantPersistenceFailure
        }
        if (enabled && previousVoice.ownerSessionId === controllingId && previousVoice.lifecycle?.archived === true) throw Object.assign(new Error('语音聊天已归档。请先在 DSH 恢复该聊天；不会自动取消归档或新建替代聊天。'), { code: 'VOICE_SESSION_ARCHIVED', stage: 'voice_lifecycle' })
        if (!human && !enabled && owner() && owner() !== controllingId) throw new Error('语音属于其他会话，本会话无权关闭')
        let grantedEpoch = null
        audioCleanupPending++
        try {
          saveOwner(null)
          stopSpeechForInput()
          await voiceSessions.close(); closed = true;
          await stopTtsConfirmed(); assertFresh()
          await stopCaptureConfirmed(); assertFresh()
          if (enabled) {
            const epoch = randomUUID()
            if (cfg.voiceSession?.enabled !== false) {
              await voiceSessions.prepare(initiatingAgent, epoch, signal); assertFresh()
            }
            saveOwner(controllingId, epoch)
            grantedEpoch = epoch
            await ear.pttStatus(assertFresh)
            await refreshInputDevices(); assertFresh()
            if (['always', 'wake'].includes(cfg.preferredListenMode)) {
              await ear.alwaysOn(cfg.preferredListenMode, assertFresh)
            }
            if (human) voiceSessions.warmCache(epoch)
          }
          if (!enabled) await voiceSessions.verifyStopped(signal)
          return owner()
        } catch (error) {
          // This operation still owns the serial queue. Never revoke a newer
          // external grant, and never repeat a write with an uncertain outcome.
          if (grantPersistenceFailure) { await grantFailureShutdown; throw grantPersistenceFailure }
          let cleanupError
          try { if (!grantPersistenceFailure && grantedEpoch && owner() === controllingId && cfg.voiceSessionEpoch === grantedEpoch) saveOwner(null) } catch (failure) { cleanupError = failure }
          if (grantPersistenceFailure) { await grantFailureShutdown; throw grantPersistenceFailure }
          for (const cleanup of [() => voiceSessions.close(), () => stopCaptureConfirmed()]) {
            try { await cleanup() } catch (failure) { cleanupError ??= failure }
          }
          if (!cleanupError && enabled && error instanceof VoiceRootOwnershipError && grantedEpoch === null && owner() === null) error.enableNotStarted = true
          throw cleanupError ?? error
        } finally { audioCleanupPending-- }
      })
      return operation
  }

  function assertUiCaller(agent) {
    if (agent === ownerSettings && !disposed) return null
    const id = agent?.id ?? agent?.session?.id
    if (!id || ctx.agents?.get?.(id) !== agent)
      throw Object.assign(new Error('操作来源不是当前真实会话'), { code: 'VOICE_ACTOR_SCOPE_CHANGED' })
    return id
  }
  function revokeVoiceFromOwner(boundEpoch) {
    // The owner-principal authorization page is sessionless. Revocation must
    // remain possible after the session that originally opened audio is gone.
    return queuePermission(async () => {
      if (boundEpoch !== undefined && (owner() !== standalone.id || cfg.voiceSessionEpoch !== boundEpoch)) return
      const wasBound = existingVoiceEpoch !== null || boundEpoch !== undefined
      audioCleanupPending++
      try {
        existingVoice.close()
        saveOwner(null)
        stopSpeechForInput()
        try {
          await voiceSessions.close()
          await stopTtsConfirmed()
        } finally {
          // Withdrawal must still stop capture if root or output cleanup fails.
          await stopCaptureConfirmed()
        }
        if (!wasBound) await voiceSessions.verifyStopped()
      } finally { audioCleanupPending-- }
    })
  }
  function assertNoUpdateInstallation() {
    if (voiceUpdateInstalling()) throw Object.assign(new Error('鱼应正在更新，安装完成后即可开始对话。'), { code: 'VOICE_UPDATE_INSTALLING' })
  }
  function assertVoiceAuthorizationActive() {
    if (disposed) throw new Error('插件已卸载')
    if (authorizationStopping) throw Object.assign(new Error('语音授权正在撤销，已取消开麦。'), { code: 'AUTHORIZATION_REVOKED' })
  }
  function selectVoiceSession(agent, rootId, signal, expectedOwnerSessionId) {
    const operation = queuePermission(async () => {
      assertUiCaller(agent)
      signal?.throwIfAborted()
      assertNoUpdateInstallation()
      if (existingVoice.hasSelection()) throw Object.assign(new Error('已绑定原会话。请先解除绑定，再选择鱼应独立会话。'), { code: 'VOICE_EXISTING_BINDING_ACTIVE' })
      const manual = expectedOwnerSessionId !== undefined
      const previous = voiceSessions.status()
      const currentOwner = owner()
      if (manual && currentOwner !== expectedOwnerSessionId) throw Object.assign(new Error('麦克风所属会话已改变，请刷新后重试'), { code: 'VOICE_OWNER_CHANGED' })
      await checkVoiceHost(rootId === null ? 'new' : 'resume', signal)
      const caller = agent === ownerSettings
        ? currentOwner ? ctx.agents?.get?.(currentOwner) : await acquireStandalone(signal)
        : agent
      const id = assertUiCaller(caller)
      const replacingVisibleRoot = manual && currentOwner !== null && previous.id === id && previous.ownerSessionId === currentOwner
      if (manual && currentOwner !== null && id !== currentOwner && !replacingVisibleRoot) throw new Error('请在当前语音会话或开启麦克风的窗口中新建')
      const origin = replacingVisibleRoot ? ctx.agents?.get?.(currentOwner) : caller
      const originId = assertUiCaller(origin)
      const startAudio = !manual || currentOwner !== null
      const assertSelectionCurrent = () => {
        assertNoUpdateInstallation()
        if (startAudio) assertVoiceAuthorizationActive()
        assertUiCaller(origin)
        if (!replacingVisibleRoot) assertUiCaller(caller)
        signal?.throwIfAborted()
      }
      let grantedEpoch = null
      audioCleanupPending++
      try {
        saveOwner(null)
        if (owner() !== null) throw new Error('撤回旧语音授权未能保存；未开启新授权')
        stopSpeechForInput()
        await voiceSessions.close()
        await stopTtsConfirmed()
        await stopCaptureConfirmed()
        const epoch = randomUUID()
        assertSelectionCurrent()
        const result = rootId === null
          ? await voiceSessions.prepareNew(origin, epoch, signal)
          : await voiceSessions.prepareSelected(origin, rootId, epoch, signal)
        assertSelectionCurrent()
        if (!startAudio) {
          await voiceSessions.close()
          return result
        }
        saveOwner(originId, epoch)
        grantedEpoch = epoch
        if (owner() !== originId || cfg.voiceSessionEpoch !== epoch) throw new Error('新语音授权未能保存')
        await ear.pttStatus(assertSelectionCurrent)
        await refreshInputDevices()
        assertSelectionCurrent()
        if (['always', 'wake'].includes(cfg.preferredListenMode)) {
          await ear.alwaysOn(cfg.preferredListenMode, assertSelectionCurrent)
          if (!sessionControl.allowed(originId)) throw new Error('语音授权已改变')
        }
        if (manual) voiceSessions.warmCache(epoch)
        return result
      } catch (error) {
        if (grantPersistenceFailure) { await grantFailureShutdown; throw grantPersistenceFailure }
        try {
          if (grantedEpoch && owner() === originId && cfg.voiceSessionEpoch === grantedEpoch) saveOwner(null)
        } catch (failure) {
          if (grantPersistenceFailure) await grantFailureShutdown
          throw failure
        }
        try { await voiceSessions.close() }
        finally { await stopCaptureConfirmed() }
        throw error
      } finally { audioCleanupPending-- }
    })
    return operation
  }
  function changeListenMode(agent, mode, signal, savePreference, human = false) {
    const operation = queuePermission(async () => {
      const id = assertUiCaller(agent)
      signal?.throwIfAborted()
      if (!['ptt', 'always', 'wake'].includes(mode)) throw new Error('听取模式无效')
      if (typeof savePreference !== 'function') throw new Error('听取方式偏好保存尚未接入')
      if (owner() === null) {
        if (voiceSessions.status()?.id) throw new Error('请先等待语音完全关闭后再预选听取方式')
        savePreference()
        refresh()
        return { selected: mode, enabled: false, apply: 'next-voice-enable' }
      }
      const assertGrantAllowed = () => {
        if (!sessionControl.allowed(human ? owner() : id)) throw new Error('语音授权已改变，请先明确开启或选择语音聊天')
      }
      assertGrantAllowed()
      // Enabling persistent capture is an explicit human action, not a settings read.
      const result = mode !== 'ptt' ? await ear.alwaysOn(mode, assertGrantAllowed) : await ear.alwaysOff()
      try {
        signal?.throwIfAborted()
        assertUiCaller(agent)
        assertGrantAllowed()
        savePreference()
        refresh()
      } catch (error) {
        if (mode !== 'ptt') await ear.alwaysOff()
        throw error
      }
      return result
    })
    return operation
  }

  function resetHelperState(reason) {
    clearTimeout(stableHelperTimer)
    stableHelperTimer = null
    readyAt = 0
    readyInfo = null
    cachedInputDevices = null
    cachedInferenceCompute = null
    cachedPtt = null
    cachedListenMode = null
    cachedWake = { state: 'disabled', deadlineAt: null, streamOpen: false, detection: 'asr-after-utterance' }
    inputGrant = null
    conversation.setInputActive(false)
    turnSignals.cancel(reason)
    invalidateCapture()
  }

  // kill() only confirms signal delivery. Retain the owned handle and fence its
  // output until exit is observed; a failed confirmation stays locked on reload.
  function stopHelper(error = new Error('帮工启动已取消'), force = false) {
    return trackOperation('helper', 'process.stop', () => stopHelperProcess(error, force))
  }
  function stopHelperProcess(error, force) {
    helperGeneration++
    clearTimeout(restartTimer)
    rejectStarting?.(error)
    resetHelperState('helper-stopping')
    for (const entry of Array.from(pending)) {
      clearTimeout(entry.timer)
      pending.delete(entry)
      entry.reject(error)
    }
    if (helperShutdown) return helperShutdown.promise
    if (helperStopFailure) return Promise.reject(helperStopFailure)
    const dying = child
    // Dependency probes cannot outlive a stop or launch a helper after revocation.
    const preflightStopped = pythonRuntime.cancel()
    if (!dying) return preflightStopped
    preflightStopped.catch(error => log(`运行环境检查退出未确认: ${error.message}`))
    let resolve, reject
    const promise = new Promise((yes, no) => { resolve = yes; reject = no })
    const shutdown = helperShutdown = { child: dying, promise }
    let killTimer
    const fail = cause => {
      clearTimeout(timeout)
      clearTimeout(killTimer)
      helperStopFailure = Object.assign(new Error('帮工退出尚未确认，请完整重启 DSH 后再试。', { cause }), { code: 'VOICE_HELPER_STOP_UNCONFIRMED' })
      lastError = { at: new Date().toISOString(), message: helperStopFailure.message }
      reject(helperStopFailure)
    }
    const timeout = setTimeout(() => fail(new Error('helper exit timed out')), 5000)
    const exited = () => { clearTimeout(timeout); clearTimeout(killTimer); resolve() }
    dying.once('exit', exited)
    dying.once('close', () => { if (dying.pid == null) exited() })
    const kill = () => { try { dying.kill('SIGKILL') } catch (failure) { fail(failure) } }
    promise.then(() => { if (helperShutdown === shutdown) helperShutdown = null }, () => {})
    // A failed spawn has no process to signal; close also confirms that case.
    if (dying.exitCode != null || dying.signalCode != null) exited()
    else if (force) kill()
    else {
      try { if (dying.stdin?.writable) dying.stdin.write('{"op":"quit"}\n', 'utf8') } catch {}
      killTimer = setTimeout(kill, 1500)
    }
    return promise
  }

  // Called only after revoking the grant, inside the permission queue. A
  // logical stop reply cannot prove that a native stream released its device.
  // Keep a healthy, released helper warm; otherwise wait for actual process exit.
  async function stopCaptureConfirmed() {
    clearTimeout(restartTimer)
    if (helperStopFailure) throw helperStopFailure
    if (helperShutdown) return helperShutdown.promise
    const stopping = child
    if (!stopping) return
    audioCleanupPending++
    try {
      if (readyAt) {
        try {
          invalidateCapture()
          turnSignals.cancel('always-off')
          // existingOnly prevents a stop/read race from starting a replacement.
          await send('always', { enabled: false, captureId }, { expect: ['always'], timeoutMs: 15_000, existingOnly: true })
          await send('stop', {}, { expect: ['stopped'], timeoutMs: 10_000, existingOnly: true })
          await send('ptt-status', {}, { expect: ['ptt-status'], timeoutMs: 8_000, existingOnly: true })
          if (child === stopping && readyInfo?.captureDeviceProtocol === 'whale-capture-device/1') {
            const observed = await send('capture-status', {}, { expect: ['capture-status'], timeoutMs: 1500, existingOnly: true })
            if (child === stopping && observed.captureDevice?.state === 'released') return
          }
        } catch {
          // Missing/malformed/late receipts are not evidence of release. Shutdown
          // below owns confirmation; never retry a capture or start a helper.
        }
      }
      await stopHelper(new Error(readyAt ? '麦克风释放未获确认，正在关闭语音帮工' : '帮工启动已取消'), !readyAt)
    } finally { audioCleanupPending-- }
  }

  async function ensureHelper() {
    const generation = helperGeneration
    await predecessorCleanup
    if (generation !== helperGeneration) throw new Error('帮工启动已取消')
    if (helperProtocolError) return Promise.reject(helperProtocolError)
    if (grantPersistenceFailure) return Promise.reject(grantPersistenceFailure)
    if (disposed) return Promise.reject(new Error('插件已卸载'))
    if (helperStopFailure) throw helperStopFailure
    if (helperShutdown) throw Object.assign(new Error('帮工正在停止，退出确认前不能重新启动'), { code: 'VOICE_HELPER_STOPPING' })
    if (child && !child.killed && readyAt) return Promise.resolve(readyInfo)
    if (starting) return starting
    if (child) throw Object.assign(new Error('帮工退出尚未确认，不能重新启动'), { code: 'VOICE_HELPER_STOP_UNCONFIRMED' })
    refresh()

    const attempt = trackOperation('helper', 'process.start', async () => {
      let python = String(cfg.pythonPath || 'python')
      let asrBinding = null, wakeBinding = null, asrBackend = 'native'
      const script = String(cfg.helperPath || DEFAULT_HELPER)
      if (!existsSync(script)) throw Object.assign(new Error('语音帮工脚本不存在，请检查鱼应安装。'), { code: 'VOICE_HELPER_COMPONENT_MISSING' })
      // Custom helpers own their own language/dependencies. The packaged helper
      // must prove its selected ASR imports before it can report ready or record.
      if (script === DEFAULT_HELPER) {
        const configuration = JSON.stringify([cfg.pythonPath, cfg.models.sensevoiceDir, cfg.speakerVerification?.enabled, cfg.device, cfg.outputDevice, cfg.turnSignals])
        if (usesDefaultAsrModel()) {
          prepareSenseVoice()
          const { state } = senseVoiceAsr.snapshot()
          if (state !== 'ready') {
            throw state === 'error'
              ? Object.assign(new Error('SenseVoice 准备失败，请到设置中的模型下载重试。'), { code: 'VOICE_ASR_PREPARE_FAILED' })
              : Object.assign(new Error('SenseVoice 正在准备，请稍后开麦。'), { code: 'VOICE_ASR_PREPARING' })
          }
        }
        const selected = await pythonRuntime.resolve(cfg)
        // Phonetic recognition remains available when the optional local spotter cannot start.
        wakeBinding = await wakeSpotter.binding().catch(() => null)
        asrBackend = selected.senseVoiceBackend
        managedRuntimeNeeded = asrBackend === 'managed'
        if (asrBackend === 'native' && usesDefaultAsrModel()) await senseVoiceAsr.verifyDefaultWeights()
        if (asrBackend === 'managed') {
          if (usesStandardWeights() && !usesDefaultAsrModel()) await senseVoiceAsr.prepare()
          try { asrBinding = await senseVoiceAsr.open({ modelDirectory: resolvePath(cfg.models.sensevoiceDir) }) }
          catch (error) {
            log(`SenseVoice 启动失败 [${error?.code ?? 'ASR_OPEN_FAILED'}]`)
            throw Object.assign(new Error('SenseVoice 暂不可用，请在设置查看准备状态。'), { code: 'VOICE_ASR_PREPARE_FAILED' })
          }
        }
        refresh()
        if (configuration !== JSON.stringify([cfg.pythonPath, cfg.models.sensevoiceDir, cfg.speakerVerification?.enabled, cfg.device, cfg.outputDevice, cfg.turnSignals]) || String(cfg.helperPath || DEFAULT_HELPER) !== script) throw new Error('运行环境检查期间配置已改变，请重新开启语音。')
        python = selected.executable
        log(`已绑定语音 Python ${selected.version}: ${python}${selected.optionalMissing.length ? `；可选依赖不可用: ${selected.optionalMissing.join(',')}` : ''}`)
      }
      if (disposed || generation !== helperGeneration || helperShutdown || grantPersistenceFailure) throw new Error('帮工启动已取消')
      return new Promise((resolve, reject) => {
      log(`spawn helper: ${python} ${script}`)
      let settled = false
      const timer = setTimeout(() => {
        if (settled) return
        const error = new Error('帮工启动超时（>45s）')
        lastError = { at: new Date().toISOString(), message: error.message }
        void stopHelper(error, true).catch(() => {})
      }, 45_000)

      rejectStarting = error => { if (!settled) { settled = true; clearTimeout(timer); starting = null; reject(error) } }
      try {
        child = spawn(python, [script], {
          windowsHide: true,
          stdio: ['pipe', 'pipe', 'pipe'],
          env: {
            ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8',
            SENSEVOICE_ASR_BACKEND: asrBackend,
            SENSEVOICE_MODEL_DIR: resolvePath(cfg.models.sensevoiceDir),
            SENSEVOICE_ASR_URL: asrBinding?.url ?? '',
            SENSEVOICE_ASR_TOKEN: asrBinding?.token ?? '',
            WHALE_WAKE_URL: wakeBinding?.url ?? '',
            WHALE_WAKE_TOKEN: wakeBinding?.token ?? '',
          },
        })
      } catch (err) {
        clearTimeout(timer)
        settled = true
        starting = null
        reject(err)
        return
      }

      stdoutBuf = ''
      const sourceChild = child
      let transportFailed = false
      // ChildProcess 'error' does not handle errors emitted by its Writable
      // stdin. Keep this listener attached through exit/dispose: EPIPE is often
      // emitted asynchronously after a final quit/cue write returned normally.
      const failTransport = error => {
        if (sourceChild !== child || disposed || transportFailed || helperShutdown) return
        transportFailed = true
        lastError = { at: new Date().toISOString(), message: `帮工通信中断: ${String(error?.message ?? error)}` }
        log(lastError.message)
        void stopHelper(error, true).catch(() => {})
      }
      sourceChild.stdin.on('error', failTransport)
      child.stdout.setEncoding('utf8')
      child.stdout.on('data', (chunk) => {
        if (sourceChild !== child || disposed || grantPersistenceFailure || transportFailed || helperShutdown) return
        stdoutBuf += chunk
        let at
        while (!helperShutdown && (at = stdoutBuf.indexOf('\n')) >= 0) {
          const line = stdoutBuf.slice(0, at).trim()
          stdoutBuf = stdoutBuf.slice(at + 1)
          if (!line) continue
          const wasReady = readyAt
          try {
            handleLine(line)
          } catch (err) {
            log(`handleLine 异常: ${String(err?.stack ?? err)}`)
          }
          if (!wasReady && readyAt && !settled) {
            settled = true
            clearTimeout(timer)
            starting = null
            // A ready packet alone is not a healthy run. Count rapid post-ready
            // crashes too; only this same child surviving the backoff horizon
            // earns a fresh retry budget. Stop/exit cancels its timer.
            stableHelperTimer = setTimeout(() => {
              if (sourceChild === child && readyAt && !disposed && !helperShutdown && !transportFailed) restarts = 0
            }, 30_000)
            stableHelperTimer.unref?.()
            resolve(readyInfo)
          }
        }
      })
      child.stderr.setEncoding('utf8')
      child.stderr.on('data', (chunk) => {
        const text = String(chunk).trim()
        if (text) log(`helper stderr: ${text.slice(0, 500)}`)
      })
      child.on('error', (err) => {
        if (sourceChild !== child) return
        log(`helper spawn error: ${String(err?.message ?? err)}`)
        void stopHelper(err, true).catch(() => {})
      })
      const onExit = (code, signal) => {
        log(`helper 退出 code=${code} signal=${signal}`)
        if (sourceChild !== child) return
        const expected = Boolean(disposed || helperShutdown)
        recordOperation({ source: 'helper', action: 'process.exit', phase: 'finished', result: expected ? 'ok' : 'failed',
          error: expected ? undefined : { code: 'HELPER_UNEXPECTED_EXIT' } })
        if (!disposed && !helperShutdown && !grantPersistenceFailure) {
          lastError = { at: new Date().toISOString(), message: '语音帮工意外退出，录音已中断。' }
        }
        resetHelperState('helper-exit')
        child = null
        starting = null
        for (const entry of Array.from(pending)) {
          clearTimeout(entry.timer)
          pending.delete(entry)
          entry.reject(new Error('帮工进程退出'))
        }
        if (!settled) { settled = true; clearTimeout(timer); reject(grantPersistenceFailure ?? new Error('帮工在就绪前退出')) }
        if (disposed || grantPersistenceFailure || helperProtocolError || helperShutdown || helperStopFailure) return
        if (restarts < 5) {
          const delay = Math.min(30_000, 1000 * 2 ** restarts)
          restarts += 1
          log(`helper ${Math.round(delay / 1000)}s 后重启（第 ${restarts} 次）`)
          clearTimeout(restartTimer)
          restartTimer = setTimeout(() => {
            ensureHelper().catch((err) => log(`重启失败: ${String(err?.message ?? err)}`))
          }, delay)
          restartTimer.unref?.()
        } else {
          log('helper 连续退出 5 次，不再自动重启（可用 voice_status 手动拉起不了，需要重载插件）')
        }
      }
      child.on('exit', onExit)
      child.once('close', () => {
        // Node emits no exit when spawn failed before creating a process.
        if (sourceChild.pid == null) onExit(null, null)
      })
      })
    }).catch(error => {
      if (generation === helperGeneration && !disposed) {
        lastError = { at: new Date().toISOString(), message: String(error.message ?? error) }
        log(`帮工启动失败: ${lastError.message}`)
      }
      throw error
    })

    starting = attempt
    attempt.then(() => { if (starting === attempt) starting = null }, () => { if (starting === attempt) starting = null })
    return attempt
  }

  function send(op, args, options) {
    return trackOperation('helper', `rpc.${op}`, () => sendHelperRequest(op, args, options))
  }
  async function sendHelperRequest(op, args = {}, { expect = [], timeoutMs = 30_000, label = op, existingOnly = false, assertAllowed } = {}) {
    assertAllowed?.()
    if (existingOnly) {
      if (!child || !readyAt) throw new Error('帮工未就绪')
    } else await ensureHelper()
    if (grantPersistenceFailure) throw grantPersistenceFailure
    if (disposed || helperShutdown || helperStopFailure || !readyAt) throw helperStopFailure ?? new Error('帮工已停止或正在退出')
    if (!child?.stdin?.writable) throw new Error('帮工 stdin 不可写')
    // Startup is asynchronous. Check the live caller, scope and cancellation
    // again immediately before crossing the helper/file-processing boundary.
    assertAllowed?.()
    const requestId = `request-${++requestSequence}`
    const payload = JSON.stringify({ op, ...args, requestId })
    const waiter = expect.length ? pendingFor(expect, timeoutMs, label, requestId) : null
    const failed = error => { if (error) failPending({ requestId, message: error.message }) }
    try { child.stdin.write(payload + '\n', 'utf8', failed) }
    catch (error) { failed(error); if (!waiter) throw error }
    if (!waiter) return null
    const result = await waiter
    assertAllowed?.()
    return result
  }

  let localAudioPending = 0, localAudioGeneration = 0
  async function sendLocalAudio(op, path, assertAllowed) {
    localAudioPending++
    try {
      return await send(op, { path }, { expect: [op === 'transcribe' ? 'transcript' : 'prosody'], timeoutMs: 180_000, label: `voice_${op}`, assertAllowed })
    } finally { localAudioPending-- }
  }
  function localAudioGuard(exec) {
    const generation = localAudioGeneration
    return () => {
      agentControl.requireScopes(exec?.agent, ['local-audio'], exec?.signal)
      if (generation !== localAudioGeneration) throw Object.assign(new Error('本地音频授权已改变，请重新发起请求'), { code: 'AUTHORIZATION_CHANGED' })
    }
  }

  async function refreshInputDevices() {
    if (!child || !readyAt || readyInfo?.inputDeviceEnumeration !== true) return
    try {
      await send('input-devices', {}, { expect: ['input-devices'], timeoutMs: 1500, existingOnly: true })
    } catch {
      // Device discovery cannot fail an otherwise valid enable; never restart a
      // helper for this optional query or leak its raw exception into the UI.
      cachedInputDevices = { items: null, observedAt: Date.now() }
    }
  }

  async function callStatus() {
    return send('status', {}, { expect: ['status'], timeoutMs: 15_000, label: 'voice_status' })
  }

  async function callAlwaysStatus() {
    return send('always-status', {}, { expect: ['always-status'], timeoutMs: 8_000, label: 'always-status' })
  }

  // -------------------------------------------------------------------------
  // 投递会话
  // -------------------------------------------------------------------------

  function targets() {
    const id = owner()
    const ids = id ? [id] : []
    const out = []
    for (const id of ids) {
      let handle = null
      try {
        handle = ctx.agents?.get?.(id) ?? null
      } catch (err) {
        log(`agent get 失败: ${String(err?.message ?? err)}`)
      }
      if (handle && (typeof handle.followup === 'function' || typeof handle.steer === 'function')) {
        out.push({ id, handle })
      } else {
        log(`没有活体会话 ${String(id).slice(0, 20)}`)
      }
    }
    return out
  }

  function formatMessage(result) {
    const text = String(result.text ?? '').trim()
    const parts = [`${cfg.header ?? '【语音】'}${text}`]
    // v0.3：把常听窗口里的前几句带进来，主模型才能判断「这句」是在接哪一句
    const recent = Array.isArray(result.recent) ? result.recent : []
    const recentItems = recent
      .map((item) => String(item ?? '').trim())
      .filter(Boolean)
      .slice(-6)
      .map((item) => (item.length > 40 ? `${item.slice(0, 40)}…` : item))
    if (recentItems.length) parts.push(`最近：${recentItems.join(' ｜ ')}`)
    if (result.emotion) parts.push(`情感:${result.emotion}`)
    if (cfg.speakerVerification?.enabled === true && result.speaker_score != null && Number.isFinite(Number(result.speaker_score))) {
      parts.push(`声纹:${Number(result.speaker_score).toFixed(2)}`)
    }
    if (Number.isFinite(Number(result.dur))) parts.push(`时长:${Number(result.dur).toFixed(1)}s`)
    const prosody = result.prosody
    if (prosody && Number.isFinite(Number(prosody.meanF0))) {
      parts.push(`音高:${Math.round(prosody.meanF0)}Hz`)
    }
    const hint = String(cfg.replyHint ?? '').trim()
    if (hint) parts.push(hint)
    return parts.join('｜')
  }

  function deliveryLimitReached(now) {
    while (deliveries.length && now - deliveries[0] > 60_000) deliveries.shift()
    return deliveries.length >= (Number(cfg.maxPerMinute) || DEFAULTS.maxPerMinute)
  }

  async function deliver(result) {
    const continuousGeneration = continuousDeliveryGeneration
    if (!sessionControl.allowed(result?.voiceSessionId)) {
      dropped += 1
      log('drop: 语音已关闭或录音来自旧授权会话')
      return false
    }
    if (cfg.voiceSessionEpoch && result?.voiceSessionEpoch !== cfg.voiceSessionEpoch) {
      dropped += 1
      log('drop: 录音来自旧的语音授权轮次')
      return false
    }
    const text = String(result?.text ?? '').trim()
    if (!text) {
      log('drop: 空文本')
      return false
    }
    if (cfg.speakerVerification?.enabled === true && cfg.dropWhenSpeakerFails !== false && result.speaker_ok === false) {
      dropped += 1
      log(`drop: 声纹不匹配 score=${result.speaker_score} (阈值 ${cfg.threshold})`)
      return false
    }
    const isCurrentDelivery = () => sameCapture(result)
      && (!['always', 'wake'].includes(result.mode) || continuousGeneration === continuousDeliveryGeneration)
    if (!isCurrentDelivery()) return false
    const captureTurnId = result.inputTurnId ?? (transcriptReceivedAt.has(result) ? result.traceId : undefined)
    const now = Date.now()
    if (existingVoice.active) {
      const dispatchAt = performance.now()
      const accepted = await existingVoice.deliver({
        text,
        epoch: result.voiceSessionEpoch,
        captureTurnId,
        isCurrentCapture: isCurrentDelivery,
      })
      if (!accepted) return false
      delivered++
      deliveries.push(now)
      lastLatency = {
        ...latencySnapshot(result),
        receiptToDispatchMs: Math.max(0, dispatchAt - (transcriptReceivedAt.get(result) ?? dispatchAt)),
        dispatchAwaitMs: Math.max(0, performance.now() - dispatchAt),
      }
      log(`latency: ${JSON.stringify(lastLatency)}`)
      return true
    }
    if (typeof captureTurnId === 'string' && captureTurnId) {
      const captureKey = JSON.stringify([result.voiceSessionEpoch, captureTurnId])
      if (capturedVoiceInputs.has(captureKey)) return false
      capturedVoiceInputs.add(captureKey)
      if (capturedVoiceInputs.size > 256) capturedVoiceInputs.delete(capturedVoiceInputs.values().next().value)
    }
    const dedicated = cfg.voiceSession?.enabled !== false
    const preparedVoice = dedicated ? voiceSessions.status() : null
    const recipients = dedicated
      ? (preparedVoice?.id ? [{ id: preparedVoice.id, handle: ctx.agents?.get?.(preparedVoice.id), managed: true }] : [])
      : targets()
    if (!recipients.length) {
      log('drop: 没有接收会话；独立语音模式需要重新明确开启语音')
      return false
    }
    const body = formatMessage(result)
    for (const { id, handle, managed } of recipients) {
      recordOperation({ source: 'host', action: 'voice.target', phase: 'changed', targetId: id })
      const message = {
        role: 'user',
        id: randomUUID(),
        content: [{ type: 'text', text: body }],
        source: {
          kind: 'dsh-whale-ear',
          form: 'notice',
          summary: `语音输入（${result.emotion ?? '未知情感'}，声纹 ${
            cfg.speakerVerification?.enabled !== true ? '实验功能关闭' : result.speaker_score != null && Number.isFinite(Number(result.speaker_score)) ? Number(result.speaker_score).toFixed(2) : '未注册'
          }）`,
        },
      }
      const receipt = { id: message.id, text: text.toWellFormed(), sessionId: id,
        title: voiceTargetTitle(handle?.session) ?? (managed ? '鱼应独立会话' : null), state: 'sending' }
      conversation.selectInputDelivery(receipt)
      if (deliveryLimitReached(now)) {
        conversation.updateInputDelivery(message.id, 'failed')
        log(`drop: 每分钟上限 ${deliveries.length}`)
        return false
      }
      let attempted = false
      const markDispatch = (session, source) => {
        attempted = true
        conversation.bindInputDelivery(message.id, session, source)
      }
      try {
        const replyScope = voiceSessions.status()
        const replyGrant = { rootSessionId: replyScope.id, ownerSessionId: owner(), epoch: cfg.voiceSessionEpoch }
        const dispatchAt = performance.now()
        const latency = {
          ...latencySnapshot(result),
          receiptToDispatchMs: Math.max(0, dispatchAt - (transcriptReceivedAt.get(result) ?? dispatchAt)),
        }
        const mode = String(cfg.delivery ?? 'followup')
        const busy = handle?.status === 'running'
        let deliveredInput
        if (managed) deliveredInput = await voiceSessions.deliver({
          text: body, voiceSessionId: result.voiceSessionId, epoch: result.voiceSessionEpoch, traceId: result.traceId,
          isCurrentCapture: isCurrentDelivery, messageId: message.id, onDispatch: markDispatch,
        })
        else {
          markDispatch(handle.session, message.source)
          if (mode === 'steer' && typeof handle.steer === 'function' && busy) await handle.steer(message)
          else await handle.followup(message)
        }
        conversation.updateInputDelivery(message.id, 'queued')
        latency.dispatchAwaitMs = Math.max(0, performance.now() - dispatchAt)
        lastLatency = latency
        // Content-free diagnostics. Await completion is not LLM TTFT or first audio.
        log(`latency: ${JSON.stringify(latency)}`)
        if (deliveredInput) conversation.input(text, replyGrant, deliveredInput.messageId)
        delivered += 1
        deliveries.push(now)
        log(`deliver: ${result.mode ?? 'ptt'} (${mode}/${busy ? 'running' : 'idle'})`)
        try {
          const deliveredHandle = managed ? ctx.agents?.get?.(id) : handle
          const flushed = deliveredHandle?.session ? ctx.sessions?.flush?.(deliveredHandle.session) : null
          if (flushed && typeof flushed.catch === 'function') {
            flushed.catch((err) => log(`flush 失败: ${String(err?.message ?? err)}`))
          }
        } catch (err) {
          log(`flush 调用失败: ${String(err?.message ?? err)}`)
        }
      } catch (err) {
        conversation.updateInputDelivery(message.id, attempted ? 'uncertain' : isCurrentDelivery() ? 'failed' : 'discarded')
        log(`deliver 失败: ${String(err?.message ?? err)}`)
        const failed = managed ? voiceSessions.status() : null
        if (failed && !failed.enabled && failed.id === preparedVoice.id && failed.epoch === preparedVoice.epoch && owner() === result.voiceSessionId && cfg.voiceSessionEpoch === result.voiceSessionEpoch) {
          // Revoke this exact failed grant immediately. Serialized helper
          // shutdown must never tear down a later successful grant.
          saveOwner(null)
          stopSpeechForInput()
          const closed = voiceSessions.close().then(() => null, error => ({ error }))
          const shutdown = queuePermission(async () => {
            const failure = await closed
            if (failure) throw failure.error
            if (owner()) return
            await stopCaptureConfirmed()
          })
          permissionChange = shutdown.catch(error => log(`失败语音授权清理未完成: ${String(error?.code ?? error?.name ?? 'unknown')}`))
          await permissionChange
        }
        return false
      }
    }
    return true
  }

  async function deliverVoice(result) {
    return trackOperation('host', 'voice.deliver', () => deliver(result),
      { subjectId: result?.inputTurnId ?? result?.traceId,
        targetId: existingVoice.active?.selection.sessionId,
        classify: accepted => accepted ? 'accepted' : 'cancelled' })
  }

  // -------------------------------------------------------------------------
  // 对外的「耳朵」——将来和看屏/说话并进同一个陪玩系统时就用它
  // -------------------------------------------------------------------------

  const ear = {
    version: VERSION,
    /** 开始一次 PTT 录音（静音 1.2s 或最长 15s 自动停，结果自动投递） */
    async start() {
      voiceSessions.cancelCacheWarmup()
      stopSpeechForInput()
      return send('start', {}, { expect: ['started'], timeoutMs: 10_000, label: 'voice_listen(start)' })
    },
    /** 立刻结束当前录音 */
    async stop() {
      if (!readyAt) {
        await stopHelper(new Error('帮工启动已取消'), true)
        return { event: 'stopped' }
      }
      return send('stop', {}, { expect: ['stopped'], timeoutMs: 10_000, label: 'voice_listen(stop)' })
    },
    /** 一次完整的听：等一次 PTT 的结果回来（不自动投递以外的副作用） */
    async listenOnce(timeoutMs = 60_000) {
      voiceSessions.cancelCacheWarmup()
      stopSpeechForInput()
      return send('start', { awaitTranscript: true }, { expect: ['transcript'], timeoutMs, label: 'listenOnce' })
    },
    /** 开自由麦；默认有效语音直接投递，显式实验开关才使用唤醒筛选。 */
    async alwaysOn(mode = 'always', assertAllowed) {
      if (!['always', 'wake'].includes(mode)) throw new Error('听取模式无效')
      assertAllowed?.()
      await ensureHelper()
      assertAllowed?.()
      if (mode === 'wake') {
        if (readyInfo?.captureProtocol !== 'whale-capture/1') throw new Error('当前帮工不支持独立唤醒模式，请使用本版本附带的帮工')
        if ((cfg.helperPath || DEFAULT_HELPER) === DEFAULT_HELPER) {
          void trackOperation('asr', 'wake.prepare', () => wakeSpotter.prepare({ retry: wakeSpotter.snapshot().state === 'error' }))
            .catch(() => log('声学唤醒组件暂不可用，本轮可继续使用近音唤醒。'))
        }
      }
      invalidateCapture()
      try {
        return await send(
          'always',
          { enabled: true, mode, captureId },
          { expect: ['always'], timeoutMs: 20_000, label: 'voice_listen(always-on)', assertAllowed },
        )
      } catch (error) {
        // A rejected/timed-out transition must not leave an old listener
        // capturing forever with a now-invalid generation. Never retry enable.
        try { await ear.alwaysOff() } catch (stopError) { log(`听取模式切换后的关闭未确认: ${String(stopError?.message ?? stopError)}`) }
        throw error
      }
    },
    /** 关常听 */
    async alwaysOff() {
      if (!readyAt) {
        await stopHelper(new Error('帮工启动已取消'), true)
        return { event: 'always', enabled: false }
      }
      await ensureHelper()
      invalidateCapture()
      turnSignals.cancel('always-off')
      return send(
        'always',
        { enabled: false, captureId },
        { expect: ['always'], timeoutMs: 15_000, label: 'voice_listen(always-off)' },
      )
    },
    /** 常听状态快照（线程/对话模式/上次唤醒/计数） */
    async alwaysStatus() {
      return callAlwaysStatus()
    },
    /** 鼠标侧键 PTT 状态（pttMouse 配置 + 钩子是否在线；顺带热装/卸钩子） */
    async pttStatus(assertAllowed) {
      return send('ptt-status', {}, { expect: ['ptt-status'], timeoutMs: 8_000, label: 'ptt-status', assertAllowed })
    },
    /** v0.3 滚动窗口快照（最近 windowSec 秒里过了垃圾过滤的段） */
    async recent() {
      return send('recent', {}, { expect: ['recent'], timeoutMs: 8_000, label: 'voice_recent' })
    },
    async enroll(name, path) {
      const args = { name }
      if (path) args.path = path
      return send('enroll', args, {
        expect: ['enrolled'],
        timeoutMs: path ? 180_000 : 150_000,
        label: 'voice_enroll',
      })
    },
    async transcribe(path, assertAllowed) {
      return sendLocalAudio('transcribe', path, assertAllowed)
    },
    async prosody(path, assertAllowed) {
      return sendLocalAudio('prosody', path, assertAllowed)
    },
    async status() {
      const raw = await callStatus()
      let always = raw?.always ?? null
      try {
        always = await callAlwaysStatus()
      } catch (err) {
        log(`always-status 不可用（退回 status 快照）: ${String(err?.message ?? err)}`)
      }
      always = always ?? null
      if (always) always.lastAlwaysEvent = lastAlwaysEvent
      let ptt = raw?.ptt ?? null
      try {
        ptt = await send('ptt-status', {}, { expect: ['ptt-status'], timeoutMs: 8_000, label: 'ptt-status' })
      } catch (err) {
        log(`ptt-status 不可用（退回 status 快照）: ${String(err?.message ?? err)}`)
      }
      return {
        ...raw,
        always,
        ptt: ptt ?? raw?.ptt ?? null,
        helper: {
          online: Boolean(child && readyAt),
          pid: readyInfo?.pid ?? null,
          startedAt: readyAt ? new Date(readyAt).toISOString() : null,
          restarts,
          lastError,
        },
        delivery: {
          mode: cfg.delivery,
          delivered,
          dropped,
          voiceprintsRequired: cfg.speakerVerification?.enabled === true && cfg.dropWhenSpeakerFails !== false,
        },
        speakerVerification: { enabled: cfg.speakerVerification?.enabled === true, experimental: true },
        latency: lastLatency ? { ...lastLatency } : null,
        voiceSession: voiceSessions.status(),
        voiceCapabilities: voiceSessions.capabilities(),
        voiceTurnSignals: signalStatus(),
        configPath: CONFIG_PATH,
      }
    },
    deliver,
    // Local adapter boundary only. The supplied TTS backend has no verified
    // playback-start API; text submission is NOT treated as audio playback.
    reportOutputStarted(event) {
      if (event?.protocol !== 'whale-voice-output/1' || !sameGrant(event)
        || event.generation !== turnSignals.status().generation
        || event.inputTurnId !== turnSignals.status().inputTurnId) return false
      const accepted = turnSignals.responseStarted(event.inputTurnId)
      if (accepted) outputStartObservation = { status: 'observed', source: 'output-adapter' }
      return accepted
    },
    turnSignals: () => signalStatus(),
    latency: () => lastLatency ? { ...lastLatency } : null,
    config: () => cfg,
  }

  // Lazy and host-owned: merely installing the package opens no network connection.
  let modelInstaller = null
  const modelJobStages = new Map()
  const modelStages = new Set(['queued','paused','cancelled','failed','blocked','error','checking-runtime','verifying-local','verifying','downloading','installing','installed'])
  const getModelInstaller = () => {
    if (disposed) throw new Error('插件已卸载')
    if (!modelInstaller) {
      modelInstaller = createModelInstaller({ root: join(DIR, 'model-installer'), pythonPath: () => { refresh(); return cfg.pythonPath } })
      modelInstaller.subscribe(({ jobs }) => {
        for (const job of jobs) {
          const stamp = job.status + ':' + job.stage
          if (modelJobStages.get(job.id) === stamp) continue
          modelJobStages.set(job.id, stamp)
          const result = ['failed', 'blocked'].includes(job.status) ? 'failed' : job.status === 'cancelled' ? 'cancelled' : 'ok'
          recordOperation({ source: 'model', action: `install.${modelStages.has(job.stage) ? job.stage : 'state'}`, phase: 'changed', result, error: job.error, subjectId: job.id })
        }
      })
    }
    return modelInstaller
  }
  const bindingCapture = createBindingCapture({ rpc: (op, args) => send(op, args, { expect: ['bindings-result'], timeoutMs: 30000, existingOnly: true }) })
  let bindingTransactionFailure = null
  const rawUiBridge = createVoiceUiBridge({
    senseVoiceAsrAction({ operation }) {
      refresh()
      const selected = usesDefaultAsrModel()
      const weights = senseVoiceAsr.snapshot()
      const runtime = sherpaRuntime.snapshot()
      const preparingRuntime = managedRuntimeNeeded && (!selected || weights.state === 'ready') && runtime.state !== 'ready'
      if (operation === 'retry') {
        if (preparingRuntime) void sherpaRuntime.prepare({retry:true}).catch(() => {})
        else if (selected) prepareSenseVoice(true)
      }
      const { state, receivedBytes, totalBytes } = preparingRuntime ? sherpaRuntime.snapshot() : senseVoiceAsr.snapshot()
      return { selected: selected || preparingRuntime, state, receivedBytes, totalBytes,
        message: state === 'error' ? 'SenseVoice 本地资源准备失败，可在这里重试。' : null }
    },
    readConversationModels: signal => conversationModels(ctx.get?.('llm') ?? ctx.llm, signal),
    assertConversationModel: (value, signal) => assertConversationModel(ctx.get?.('llm') ?? ctx.llm, value, signal),
    modelInstaller: getModelInstaller,
    configPath: CONFIG_PATH,
    captureTtsInstallAuthorization: (agent, request, signal, human) => human ? agentControl.captureHumanModelInstallAuthorization(agent, request, signal) : agentControl.captureModelInstallAuthorization(agent, request, signal),
    completeTtsInstallAuthorization: (agent, token, values) => agentControl.completeModelInstallAuthorization(agent, token, values),
    assertTtsInstallAuthorization: (agent, token, target) => agentControl.assertModelInstallAuthorization(agent, token, target),
    verifyInstalledTts: (config, signal) => withAuditionRuntime(config, runtime => runtime.verifyLocalTts({ signal })),
    inspectAudioDevices: signal => { refresh(); return inspectAudioDevices({pythonPath:pythonRuntime.boundExecutable(cfg) ?? cfg.pythonPath,signal}) },
    assertCaller: assertUiCaller,
    readEffectiveConfig: () => { refresh(); return cfg },
    readStatus: () => ({
      voiceControlBusy: permissionPending > 0,
      ownerSessionId: owner(), enabled: sessionControl.allowed(owner()),
      helper: { online: Boolean(child && readyAt), lastError: lastError?.message ?? null },
      inputDevices: child && readyAt ? cachedInputDevices : null,
      inferenceCompute: child && readyAt ? cachedInferenceCompute : null,
      ptt: child && readyAt ? cachedPtt : null,
      voiceSession: voiceSessions.status(), voiceCapabilities: voiceSessions.capabilities(), listenMode: owner() === null ? cfg.preferredListenMode : cachedListenMode,
      wake: child && readyAt && owner() !== null ? cachedWake : null,
      voiceTurnSignals: signalStatus(),
      ttsRuntime: ttsRuntimeStatus(),
    }),
    sessionControl,
    turnSignalsSupported: true,
    readTtsStatus: ttsRuntimeStatus,
    readTtsResidency: () => tts.residency?.(),
    inspectTts: signal => { assertNoTtsVerification(); return tts.inspect(signal) },
    previewTts: signal => {
      assertNoTtsVerification()
      refresh()
      const settings = ttsSettings(cfg.tts)
      if (settings.provider !== 'deepseek') return tts.preview({ signal })
      assertSpeechAuthorization(ownerSettings, settings, signal)
      return tts.preview({ signal, beforeRequest: activeSignal => assertSpeechAuthorization(ownerSettings, settings, activeSignal) })
    },
    previewDraftTts: (config, signal) => withAuditionRuntime(config, runtime => runtime.preview({ signal })),
    cancelTts: stopTtsConfirmed,
    readConversation: agent => conversation.read(agent),
    subscribeConversation: (agent, listener) => conversation.subscribe(agent, listener),
    readOutputVolume: () => ({ supported: false, backend: null, volume: null, revision: null, apply: null, reason: 'whale-tts-volume-is-in-tts-settings' }),
    setOutputVolume: () => { throw new Error('请在鱼应朗读设置调整音量') },
    inspectPerformanceModes: (agent, signal) => agent === ownerSettings
      ? voiceSessions.inspectPerformanceModes(owner() === null ? null : currentVoiceOrigin(), signal, standaloneModel)
      : voiceSessions.inspectPerformanceModes(agent, signal),
    listVoiceSessions: (agent, options, signal) => voiceSessions.listVoiceSessions(agent, options, signal),
    newVoiceSession: (agent, signal, expectedOwnerSessionId) => selectVoiceSession(agent, null, signal, expectedOwnerSessionId),
    resumeVoiceSession: (agent, rootId, signal) => selectVoiceSession(agent, rootId, signal),
    captureBindings: (agent, request, prepare) => queuePermission(async () => {
      assertUiCaller(agent)
      return request.operation === 'begin' ? bindingCapture.begin(prepare()) : bindingCapture.end(request.token)
    }),
    changeBindings: (agent, signal, transaction) => queuePermission(async () => {
      assertUiCaller(agent)
      if (bindingCapture.active) throw new Error('请先结束按键录入')
      if (bindingTransactionFailure) throw bindingTransactionFailure
      try { await applyBindingTransaction({ transaction, signal, rpc: (op, args) => send(op, args, { expect: ['bindings-result'], timeoutMs: 30000, existingOnly: true }) }) }
      catch (error) { if (error.code === 'BINDINGS_UNCONFIRMED') bindingTransactionFailure = error; throw error }
      finally { refresh() }
    }),
    setListenMode: changeListenMode,
    changeForHuman: (agent, enabled, signal, expectedOwner, expectedExistingSessionId) => {
      const id = assertUiCaller(agent)
      return !enabled && (agent === ownerSettings || existingVoiceEpoch !== null)
        ? revokeVoiceFromOwner()
        : changeVoiceGrant(id, enabled, signal, expectedOwner, true, expectedExistingSessionId)
    },
    setListenModeForHuman: (agent, mode, signal, savePreference) => changeListenMode(agent, mode, signal, savePreference, true),
  })

  const agentControl = createVoiceAgentControl({
    api:rawUiBridge,permissions:createFileAgentPermissions(CONFIG_PATH+'.agent-permissions.json'),assertCaller:assertUiCaller,
    humanApiOverrides: {
      startModelInstall: rawUiBridge.startModelInstallForHuman,
      controlModelInstall: rawUiBridge.controlModelInstallForHuman,
      changeForCaller: rawUiBridge.changeForHuman,
      setListenMode: rawUiBridge.setListenModeForHuman,
      readConversation: agent => conversation.readForHuman(agent),
      readConversationHistory: (agent, request, signal) => {
        if (existingVoice.hasSelection()) {
          assertUiCaller(agent)
          signal?.throwIfAborted()
          const view = conversation.readForHuman(agent)
          return { rootSessionId: view.rootSessionId, generation: view.historyGeneration, revision: 0, scope:'voice-session', items:[], nextCursor:null, truncated:false }
        }
        const source = agent === ownerSettings ? currentVoiceOrigin() : agent
        return source ? voiceSessions.readVoiceHistory(source, request, signal)
          : { rootSessionId:null, generation:0, revision:0, scope:'voice-session', items:[], nextCursor:null, truncated:false }
      },
      subscribeConversation: (agent, listener) => conversation.subscribeForHuman(agent, listener),
    },
    authorizationSources:()=>getModelInstaller().snapshot().models,
    onAuthorizationRevoked:async ()=>{
      authorizationStopping = true
      try {
        rawUiBridge.suspendTtsInstallIntent()
        localAudioGeneration++
        // A released microphone does not prove that file inference has stopped.
        // Revoke admission immediately and await actual exit for in-flight local
        // audio, including startup, even when no microphone session was opened.
        const audioStopped = localAudioPending
          ? stopHelper(Object.assign(new Error('本地音频授权已撤销，正在停止处理'), { code: 'AUTHORIZATION_REVOKED' }), true)
          : Promise.resolve()
        const cleanup = async () => {
          if(permissionPending || owner() || voiceSessions.status()?.id)await revokeVoiceFromOwner()
          await stopTtsConfirmed()
          if(modelInstaller)for(const job of modelInstaller.snapshot().jobs)if(['running','queued'].includes(job.status))await modelInstaller.pause(job.id)
        }
        const results = await Promise.allSettled([audioStopped, cleanup()])
        const failed = results.find(result => result.status === 'rejected')
        if (failed) throw failed.reason
      } finally { authorizationStopping = false }
    },
    runtimeToken:()=>({owner:owner(),epoch:cfg.voiceSessionEpoch??null,mode:cachedListenMode,root:voiceSessions.status()?.id??null}),
  })
  const uiBridge = {
    ...agentControl.humanApi,
    recordOperation,
    trackOperation,
    readClientOperationScope: agent => {
      if (agent !== ownerSettings) throw Object.assign(new Error('只允许宿主所有者核对操作日志归属'), { code:'VOICE_OWNER_REQUIRED' })
      assertUiCaller(agent)
      return { scope:clientOperationScope }
    },
    recordClientOperations: (request, agent) => {
      if (agent !== ownerSettings) throw Object.assign(new Error('只允许宿主所有者记录界面操作'), { code: 'VOICE_OWNER_REQUIRED' })
      assertUiCaller(agent)
      if (request?.scope !== clientOperationScope) return { accepted:false }
      return operationLog.recordClient(request.events)
    },
    readOperationLog: (request, agent) => {
      if (agent !== ownerSettings) throw Object.assign(new Error('只允许宿主所有者读取操作日志'), { code: 'VOICE_OWNER_REQUIRED' })
      assertUiCaller(agent)
      return operationLog.read(request?.cursor)
    },
    status: agent => ({
      ...agentControl.humanApi.status(agent),
      existingVoiceSession: existingVoice.binding(),
      existingVoiceSessionSupported: existingVoice.supported(),
    }),
    async retryVoiceTranscript(request, agent, signal) {
      if (agent !== ownerSettings) throw Object.assign(new Error('只有宿主所有者可以重发语音。'), { code: 'VOICE_OWNER_REQUIRED' })
      assertUiCaller(agent)
      signal?.throwIfAborted()
      assertNoUpdateInstallation()
      const accepted = await existingVoice.retry(request, signal)
      if (accepted) { delivered++; deliveries.push(Date.now()) }
      return { accepted }
    },
    listExistingVoiceSessions(request, agent, signal) {
      if (agent !== ownerSettings) throw new Error('只有宿主所有者可以选择原会话。')
      assertUiCaller(agent)
      return existingVoice.list(request, signal)
    },
    setExistingVoiceSession(request, agent, signal) {
      if (agent !== ownerSettings) throw new Error('只有宿主所有者可以绑定原会话。')
      return queuePermission(async () => {
        assertUiCaller(agent)
        signal?.throwIfAborted()
        assertNoUpdateInstallation()
        if (owner() !== null || !voiceSessions.status().fullyStopped || ttsRuntimeStatus().busy || bindingCapture.active)
          throw Object.assign(new Error('请先关闭麦克风及朗读，再更改原会话绑定。'), { code: 'VOICE_EXISTING_REQUIRES_STOP' })
        agentControl.noteStop()
        return existingVoice.set(request, signal)
      })
    },
    manageSessions: (agent, request, signal) => voiceSessions.manageSessions(agent, request, signal),
    readPresentation: () => voicePresentation.snapshot(),
    subscribePresentation: listener => voicePresentation.subscribe(listener),
    async updateModelSettings(...args) {
      const result = await agentControl.humanApi.updateModelSettings(...args)
      prepareSenseVoice()
      return result
    },
  }

  // -------------------------------------------------------------------------
  // 工具
  // -------------------------------------------------------------------------

  function text(value) {
    return typeof value === 'string' ? value : JSON.stringify(value, null, 2)
  }


  function safeRoute(value) {
    if (!value || typeof value !== 'object') return null
    const out = {}
    for (const key of ['provider', 'model', 'reasoningEffort']) {
      if (typeof value[key] === 'string' && value[key].length <= 256) out[key] = value[key]
    }
    return out
  }

  function safeRouting(value) {
    if (!value || typeof value !== 'object') return null
    const out = {}
    for (const key of ['sourceSessionId', 'sessionId', 'source', 'verification', 'stage']) {
      if (typeof value[key] === 'string' && value[key].length <= 256) out[key] = value[key]
    }
    if (typeof value.snapshotStale === 'boolean') out.snapshotStale = value.snapshotStale
    for (const key of ['sourceRoute', 'voiceRoute', 'workerRequested', 'workerObserved']) {
      if (value[key] === null) out[key] = null
      else if (value[key] !== undefined) out[key] = safeRoute(value[key])
    }
    return out
  }

  function routeText(value) {
    const route = safeRoute(value)
    return route ? `${route.provider ?? '?'} / ${route.model ?? '?'}${route.reasoningEffort ? ` (${route.reasoningEffort})` : ''}` : '尚未确认'
  }

  function formatRouting(state) {
    const routing = state?.routing
    const lifecycleLines = [`语音生命周期: ${state?.lifecycle?.archived === true ? '已归档，需先在 DSH 恢复，不能用归档代替隐藏' : state?.lifecycle?.archived === false ? '未归档' : '归档状态未知'}`]
    if (!routing) return lifecycleLines
    const source = routing.source === 'live_source' ? '当前在线来源' : routing.source === 'enable_snapshot' ? '来源已关闭，使用开启时快照' : '来源不可用'
    const lines = [
      ...lifecycleLines,
      `来源模型: ${routeText(routing.sourceRoute)}（${source}）`,
      `语音模型: ${routeText(routing.voiceRoute)}（仅语音入口）`,
    ]
    const mode = state.routing?.voiceMode
    if (mode) lines.push(`思考核验: 请求=${mode.requestedEffort ?? '?'}；选择=${mode.selectedEffort ?? '提供商默认（未验证）'}；选择原因=${mode.selectionReason ?? 'unknown'}；reasoning片段=${mode.reasoningDeltaObserved ? '已观察到' : '未观察到'}；不保证服务端执行`)
    const worker = routing.lastWorker
    if (worker) {
      lines.push(`最近后台请求路由: ${routeText(worker.workerRequested)}（${worker.source === 'enable_snapshot' ? '开启时快照，非当前来源' : '派工时来源选择'}）`)
      lines.push(`最近后台观察路由: ${routeText(worker.workerObserved)}；验证=${worker.verification ?? 'requested_only'}，不代表连接成功`)
    }
    for (const item of (state.diagnostics ?? []).slice(-4)) {
      lines.push(`诊断阶段: ${item.stage ?? 'unknown'}${item.code ? `；code=${item.code}` : ''}${item.sessionId ? `；session=${item.sessionId}` : ''}`)
    }
    return lines
  }

  function formatAlways(a) {
    if (!a) return '常听: 未知（帮工没返回 always 状态）'
    const thread = a.enabled ? (a.threadAlive ? '在线' : '启动中') : '未运行'
    const conv = a.inConversation
      ? `对话中（窗口剩 ${Math.max(0, Math.round(((a.wakeUntil ?? 0) - Date.now()) / 1000))}s）`
      : '未在对话'
    const lastWake = a.lastWakeAt
      ? `${new Date(a.lastWakeAt).toLocaleString('zh-CN', { hour12: false })}（${a.lastWakeWord ?? '?'}）`
      : '还没唤醒过'
    const words = Array.isArray(a.wakeWords) ? a.wakeWords.join(' / ') : (cfg.wakeWords ?? []).join(' / ')
    return [
      `常听: ${a.enabled ? '开' : '关'}（listenMode=${a.listenMode ?? cfg.listenMode}）  线程=${thread}${
        a.paused ? '（已让给 PTT）' : ''
      }  ${conv}`,
      `唤醒: 上次=${lastWake}  唤醒词=${words || '-'}  对话窗口=${Math.round(
        (a.conversationWindowMs ?? cfg.conversationWindowMs ?? 30000) / 1000,
      )}s  静音退出=${Math.round((a.idleExitMs ?? cfg.idleExitMs ?? 25000) / 1000)}s`,
      `常听计数: 分段 ${a.segments ?? 0}  唤醒 ${a.wakes ?? 0}  投递 ${a.delivered ?? 0}  丢弃 ${
        a.dropped ?? 0
      }  窗口 ${a.recentCount ?? (a.recent ?? []).length ?? 0} 条/${
        a.windowSec ?? a.settings?.windowSec ?? cfg.windowSec ?? 60
      }s${a.lastDrop ? `  最近丢弃=${a.lastDrop.reason}` : ''}${a.lastError ? `  最近错误=${a.lastError}` : ''}`,
    ].join('\n')
  }

  function formatPtt(p) {
    const button = Number(p?.pttMouse ?? cfg.pttMouse ?? 0)
    if (!button) return '鼠标侧键: 关（pttMouse=0）'
    const name = p?.buttonName ?? (button === 1 ? 'XButton1' : 'XButton2')
    const hook = p?.hookInstalled ? '已装' : p?.enabled === false ? '未启用' : '未装'
    const max = Number(p?.maxSeconds ?? p?.pttMouseMaxSeconds ?? cfg.pttMouseMaxSeconds ?? 15)
    const head =
      `鼠标侧键: ${name} 按住说话（钩子=${hook}${p?.hookAlive ? '/线程在线' : ''}）  最长=${max}s` +
      `${p?.recording ? '  正在录' : ''}`
    const tail =
      `侧键计数: 按下 ${p?.presses ?? 0} 次` +
      `${p?.lastDurMs != null ? `  上次 ${(Number(p.lastDurMs) / 1000).toFixed(2)}s` : ''}` +
      `${p?.lastFinishReason && p.lastFinishReason !== 'stopped' ? `  上次结束=${p.lastFinishReason}` : ''}`
    const lines = [head, tail]
    if (p?.hookError) lines.push(`钩子错误: ${String(p.hookError).slice(0, 120)}`)
    if (p?.lastError) lines.push(`侧键最近错误: ${String(p.lastError).slice(0, 120)}`)
    return lines.join('\n')
  }

  function formatSemantic(sem, windowSec) {
    if (!sem) return `实验性唤醒判断: 未知（windowSec=${windowSec ?? cfg.windowSec ?? 60}）`
    const enabled = sem.enabled === true
    if (!enabled) return '实验性唤醒判断: 关（默认）；已授权自由麦直接处理有效语音，不请求语义模型。外放可能误触发，建议使用耳机。'
    const threshold = Number.isFinite(Number(sem.threshold)) ? Number(sem.threshold).toFixed(2) : '?'
    const reach = sem.reachable === true ? '可达' : sem.reachable === false ? '不可达' : '未探测'
    const last =
      sem.lastScore != null && Number.isFinite(Number(sem.lastScore)) ? Number(sem.lastScore).toFixed(3) : '-'
    const head =
      `实验性唤醒判断: 开（阈值 ${threshold}）  服务=${reach}  最近语义分=${last}` +
      `${sem.lastText ? `（${String(sem.lastText).slice(0, 20)}）` : ''}`
    const tail =
      `窗口=${windowSec ?? cfg.windowSec ?? 60}s  参考句=${Array.isArray(sem.refs) ? sem.refs.length : '?'} 条` +
      `  调用 ${sem.calls ?? 0} / 降级 ${sem.errors ?? 0}` +
      `${sem.lastError ? `  降级原因=${String(sem.lastError).slice(0, 80)}` : ''}`
    return `${head}\n${tail}`
  }

  function voiceToolOperation(name, args) {
    const options = {
      voice_manage: ['inspect','execute','request-owner-change','request-status','cancel','prepare'],
      voice_control: ['status','steer','resume','stop'],
      voice_listen: ['enable','disable','start','stop','always-on','always-off'],
    }[name]
    const action = args?.action
    if (!options?.includes(action)) return name
    if (name !== 'voice_manage') return `${name}.${action}`
    const operation = uiOperationName({ action: args.operation })
    return `${name}.${action}.${operation.slice(3)}`
  }

  function voiceToolOutcome(value) {
    if (typeof value !== 'string') return
    if (value.startsWith('本会话没有麦克风权限') || value.startsWith('本会话没有语音权限')) return 'denied'
    if (!value.startsWith('{')) return
    try {
      const data = JSON.parse(value)
      if (['confirmation-required','human-override','blocked'].includes(data.status)) return 'denied'
      if (data.status === 'outcome-unknown') return { result: 'unknown', error: { code: 'OUTCOME_UNKNOWN' } }
      if (data.textOnly && data.reason) return classifyPlayback(data)
      if (data.ok === false) return { result: 'failed', error: { code: data.request?.error?.code ?? data.reason } }
    } catch { /* Tool content is never copied into the operation log. */ }
  }

  const toolSpecs = [
    {
      name:'voice_manage',
      description:'鱼应操作接口：inspect 查询能力、设置和状态；execute 在首次授权范围内直接完成插件操作；request-owner-change 是配置执行的兼容别名。request-status 查询结果，cancel 取消未执行计划。操作列表及参数见 capabilities。',
      parameters:{type:'object',properties:{action:{type:'string',enum:['inspect','execute','request-owner-change','request-status','cancel']},operation:{type:'string',description:'inspect 可先用 capabilities 获取完整操作列表与现有权限；execute 使用列表中的 operation。'},params:{type:'object',description:'该操作的精确参数。禁止 source/actor/human/accepted/approval。save-tts 省略 deepseekTextTransmissionAccepted。默认 DeepSeek 官方 Stella，须主人在朗读设置单独启用。inspect-tts 可检查 DeepSeek 官方 API Key 是否可用。离线朗读可选本地模型。start-model-install 的 useWhenReady 可在静默验证成功后应用模型。复用已有 Qwen 文件时同时传 sourceDirectory/modelVariant。'},requestId:{type:'string'}},required:['action'],additionalProperties:false},
      async execute(args,exec){
        assertUiCaller(exec.agent);exec.signal?.throwIfAborted()
        if(Object.keys(args).some(key=>!['action','operation','params','requestId'].includes(key)))throw new Error('不支持的 Agent 接口字段')
        if(args.action==='inspect')return JSON.stringify(await agentControl.read(exec.agent,args.operation??'capabilities',args.params??{},exec.signal))
        if(args.action==='execute')return JSON.stringify(await agentControl.execute(exec.agent,args.operation,args.params??{},exec.signal))
        if(args.action==='request-owner-change')return JSON.stringify(await agentControl.requestOwnerChange(exec.agent,args.operation,args.params??{},exec.signal))
        if(args.action==='prepare')return JSON.stringify(await agentControl.prepare(exec.agent,args.operation,args.params??{},exec.signal))
        if(args.action==='request-status')return JSON.stringify(agentControl.inspect(exec.agent,args.requestId))
        if(args.action==='cancel')return JSON.stringify(agentControl.cancel(exec.agent,args.requestId))
        throw new Error('不支持的 Agent 接口动作')
      },
    },
    {
      name: 'whale_voice_speak',
      description: '朗读回复，语音不可用时显示文字。完整答复用 final=true，仍需派工或调用工具时省略。若回执中 deepseekDiagnostic.playbackPossible=true，部分语音可能已播放，勿整条重播。遇到限流时稍后重试。仅语音主入口可用。启用 DeepSeek 官方朗读后会将朗读文字发送至 DeepSeek，敏感个人内容须先获同意。',
      timeoutMs: 150_000,
      parameters: { type: 'object', properties: {
        text: { type: 'string', minLength: 1, maxLength: 4000, description: '朗读文本。敏感个人内容须先获同意。' },
        final: { type: 'boolean', description: '完整答复且无需再调用工具时为 true。' },
      }, required: ['text'], additionalProperties: false },
      async execute(args, exec, speechId) {
        assertUiCaller(exec.agent)
        refresh()
        const voice = voiceSessions.status()
        if (!voice.enabled || exec.agent.session.id !== voice.id || voice.epoch !== cfg.voiceSessionEpoch || !sessionControl.allowed(voice.id)) throw new Error('只有当前已授权的独立语音主入口能朗读')
        voiceSessions.assertSpeechCurrent(exec)
        if (typeof args.text !== 'string' || !args.text.trim() || args.text.length > 4000) throw Object.assign(new Error('回复应为 1 至 4000 个字符'), { code: 'TTS_INVALID_TEXT' })
        const completeReply = result => {
          if (args.final === true && !exec.signal?.aborted && voiceSessions.isOnlySpeechCall(exec) && typeof exec.concludeTurn === 'function') exec.concludeTurn()
          return JSON.stringify(result)
        }
        const settings = ttsSettings(cfg.tts)
        if (settings.provider === 'off') return completeReply({ textOnly: true, playbackCompleted: false, acousticConfirmation: false })
        assertNoTtsVerification()
        turnSignals.suppressEndCue('speech_requested')
        const outcome = await speakReply(args.text, settings, exec.agent, exec.signal, speechId)
        reportSpeechFailure(outcome)
        return completeReply(outcome)
      },
    },
    {
      name: 'voice_control',
      description: '仅语音主入口可用，限自己创建的后台代理：status 查询真实运行状态；steer 追加指导或插话，运行时在下一步接收，闲置时会唤醒；resume 继续同一代理，宿主支持时可恢复已卸载的会话，不另开替身；stop 打断当前执行。steer/resume/stop 只按用户明确指令执行，不把后台错误当作授权。消息受理不等于已执行，停止不清空待处理队列、不撤销外部操作，后续消息可能重新唤醒。',
      parameters: {
        type: 'object',
        properties: {
          target: { type: 'string', description: 'voice_delegate 返回的后台代理会话 ID；不能是语音入口、原会话或无关会话。' },
          action: { type: 'string', enum: ['status', 'steer', 'resume', 'stop'] },
          instruction: { type: 'string', description: 'steer/resume/stop 时原样转达用户本次明确的追加指导、继续或打断要求；不得伪造用户指令。status 省略。' },
        },
        required: ['target', 'action'], additionalProperties: false,
      },
      async execute(args, exec) {
        return JSON.stringify(await voiceSessions.control(exec?.agent, String(args?.target ?? ''), String(args?.action ?? ''), args?.instruction, exec?.signal))
      },
    },
    {
      name: 'voice_delegate',
      description: '仅独立语音主入口可用：为新任务创建后台子代理。先查看已有任务及代理，相关且可复用信息的后续工作交回同一代理；只有没有合适可续接代理时才新建。一两句话可答的直接在前台答，需要查询、规划或实际工作的才委派。子代理沿用授权来源会话的模型思考设置，结果回到语音入口；不会获得听说权限，不预设固定角色。',
      parameters: {
        type: 'object',
        properties: { prompt: { type: 'string', description: '完整任务、背景、限制和期望结果；不要附带无关私人历史。' } },
        required: ['prompt'], additionalProperties: false,
      },
      async execute(args, exec) {
        const result = await voiceSessions.delegate(exec?.agent, String(args?.prompt ?? ''), exec?.signal)
        recordOperation({ source: 'agent', action: 'subagent.create', phase: 'finished', result: 'ok', targetId: result?.sessionId })
        return JSON.stringify(result)
      },
    },
    {
      name: 'voice_message',
      description: '给当前语音入口的已有后台代理追加相关任务、指导或转达信息，也可与发起会话及显式授权的会话通信。优先复用处理同类事项的代理，不为每次补充另开一个。后台运行时在下一步接收，闲置时会唤醒，可续接的冷会话由宿主恢复。受理不等于已执行，不会复制整个历史或共享私人记忆。',
      parameters: {
        type: 'object',
        properties: {
          target: { type: 'string', description: 'owner=发起会话，voice=独立语音会话，或显式授权的会话 ID。' },
          text: { type: 'string', description: '仅包含这次协作需要传递的消息。' },
        },
        required: ['target', 'text'], additionalProperties: false,
      },
      async execute(args, exec) {
        const state = voiceSessions.status()
        const target = args?.target === 'owner' ? state?.ownerSessionId : args?.target === 'voice' ? state?.id : String(args?.target ?? '')
        return JSON.stringify(await voiceSessions.message(exec?.agent, target, String(args?.text ?? ''), exec?.signal))
      },
    },
    {
      name: 'voice_status',
      description:
        '鱼应状态：帮工是否在线、录音设备、ASR 引擎与模型、声纹注册情况、比对阈值、' +
        '语义初筛（开关/阈值/embedding 服务是否可达/最近一次语义分）、常听窗口、' +
        '鼠标侧键按住说话（pttMouse 配置 + 钩子是否在线），以及独立语音入口的隐藏和恢复状态。' +
        '仅当前语音入口或当前授权来源可读取本树的短任务交接摘要；保存的任务不等于后台正在运行。' +
        '用它确认鱼应的语音输入和会话状态。',
      timeoutMs: 30_000,
      parameters: {
        type: 'object',
        properties: {
          scope: { type: 'string', enum: ['all', 'tasks'], description: '只问后台进度时用 tasks，不启动或等待音频帮工；默认 all 同时查设备。' },
          taskId: { type: 'string', description: '可选：仅查本语音根下的明确原生任务 ID。' },
          cursor: { type: 'integer', description: '可选：上一页返回的非负整数任务游标；不按全局最近任务猜测。' },
        },
        additionalProperties: false,
      },
      async execute(_args, exec) {
        const tasksOnly = _args?.scope === 'tasks'
        let audioStatusUnavailable = false
        let info = { voiceSession: voiceSessions.status() }
        if (!tasksOnly) {
          try { info = await ear.status() }
          catch (error) {
            audioStatusUnavailable = true
            log(`音频状态读取未完成: ${String(error?.code ?? error?.name ?? 'unavailable')}`)
          }
        }
        let lines = [
          `语音权限: ${owner() ? `已绑定 ${owner()}` : '关闭；请在需要的会话明确要求开启语音'}`,
          `帮工: ${info.helper?.online ? '在线' : '离线'}  pid=${info.helper?.pid ?? '-'}  重启次数=${info.helper?.restarts ?? 0}`,
          `设备: ${info.device?.name ?? '?'}（index=${info.device?.index ?? '-'}）`,
          `ASR: ${info.asr}  已加载模型: ${(info.models?.loaded ?? []).join(', ') || '无'}`,
          `实验性声纹识别: ${info.speakerVerification?.enabled === true ? '开启' : '关闭（默认，不按声纹过滤）'}`,
          `独立语音会话: ${info.voiceSession?.id ?? '未建立'}  思考: ${info.voiceSession?.routing?.voiceMode?.selectedEffort ?? info.voiceSession?.reasoningEffort ?? '提供商默认（未验证）'}（只影响语音会话）`,
          `工作区显示: ${info.voiceSession?.presentation?.hidden === true ? '隐藏（已确认宿主支持）' : info.voiceSession?.presentation?.requested === 'workspace' ? '可见（显式兼容配置）' : '尚未确认隐藏'}`,
          `会话恢复: ${info.voiceSession?.persistence?.restored ? '已恢复同一语音根' : info.voiceSession?.persistence?.restoreRequested ? '待恢复' : '本轮新建/尚未建立'}；身份${info.voiceSession?.persistence?.identitySaved ? '已持久保存' : '尚未保存'}${info.voiceSession?.persistence?.blocked ? '；持久化阻塞' : ''}`,
          `旧输入: 撤回 ${info.voiceSession?.restore?.withdrawnPendingInputCount ?? 0} 条未处理输入；不自动重跑旧任务`,
          `阈值: ${info.threshold}  投递: ${info.delivery?.mode}（已投 ${info.delivery?.delivered}，拦截 ${info.delivery?.dropped}）`,
          formatSemantic(info.semantic ?? info.always?.semantic, info.windowSec ?? info.always?.windowSec),
          formatAlways(info.always),
          formatPtt(info.ptt),
          `声纹: ${
            Object.keys(info.voiceprints ?? {}).length
              ? Object.entries(info.voiceprints)
                  .map(([k, v]) => `${k}(${v.samples} 次/${v.dim ?? '?'}维)`)
                  .join(', ')
              : '未注册'
          }`,
          `配置: ${info.configPath}`,
        ]
        if (tasksOnly || audioStatusUnavailable) {
          lines = lines.filter(line => /^(?:语音权限|独立语音会话|工作区显示|会话恢复|旧输入):/u.test(line))
          if (audioStatusUnavailable) lines.push('音频设备状态: 读取未完成；任务交接仍单独查询')
        }
        lines.push(...formatRouting(info.voiceSession))
        if (info.helper?.lastError) lines.push(`最近错误: ${info.helper.lastError.message}`)
        // Task content is not part of the generic ear.status() surface. A task
        // snapshot must be authorized against the exact live caller each time.
        const state = voiceSessions.status()
        const caller = exec?.agent
        const callerId = caller?.id ?? caller?.session?.id
        const current = ctx.agents?.get?.(callerId)
        if (caller && current === caller && (callerId === state.id || callerId === state.ownerSessionId)) {
          try {
            const tasks = await voiceSessions.handoffStatus(caller, { limit: 8, summaryMaxLength: 512, ...(_args?.taskId === undefined ? {} : { taskId: _args.taskId }), ...(_args?.cursor === undefined ? {} : { cursor: _args.cursor }) })
            if (tasks.initialized === false) lines.push('任务交接: 尚未建立语音根，不为查询启动任务')
            else {
              lines.push(`任务交接: ${(tasks.tasks ?? []).length} 项；后端=${tasks.backend ?? state.handoff?.backend ?? 'unknown'}；保存状态与运行状态分别显示`)
              if (tasks.persistenceConfirmed === false) lines.push('注意: 本树有未确认落盘的任务；可见记录不等于持久成功，不要重复创建或自动派工')
              for (const item of tasks.tasks ?? []) {
                lines.push(`[${item.taskId} r${item.revision}] ${item.subject} | 保存=${item.status} | 后台=${item.runtimeState ?? 'unknown'} | owner=${item.ownerId ?? '未领取'}`)
                if (item.summary) lines.push(`${String(item.summary)}${item.summaryTruncated ? '（摘要已截短）' : ''}`)
                if (item.pendingDecisions != null) lines.push(`待决定: ${String(item.pendingDecisions)}${item.pendingDecisionsTruncated ? '（已截短）' : ''}`)
              }
              if (tasks.nextCursor !== undefined) lines.push(`还有其他任务；下页 cursor=${tasks.nextCursor}，或按明确 taskId 查询，勿猜测“最近一个”`)
            }
          } catch (error) {
            log(`任务状态读取未完成: ${String(error?.code ?? error?.name ?? 'unavailable')}`)
            lines.push('任务交接: 本次读取未完成，未确认任务状态；不会据此自动重试或重新派工')
          }
        } else lines.push('任务交接: 仅当前语音入口或授权来源可读取摘要')
        const devices = (info.inputDevices ?? []).slice(0, 6)
        if (devices.length) {
          lines.push(
            `候选输入设备: ${devices.map((d) => `${d.index}=${d.name}`).join(' / ')}`,
          )
        }
        return lines.join('\n')
      },
    },
    {
      name: 'voice_listen',
      description:
        '首次一键授权后 action=enable/always-on 直接执行，不重复请求授权；仅缺少许可或遇到安全障碍时返回 confirmation-required。enable 将唯一语音权限固定到当前调用会话；disable 收回权限。其他会话不可听说，绝不按活跃度自动切换。' +
        '获得权限后，action=start 开始一次 PTT 录音（说完自动停：静音 1.2s 或最长 15s），' +
        'action=stop 立刻结束。action=always-on 开自由麦：在当前明确授权内，VAD/ASR 的有效语音默认直接投递，不需要唤醒词，也不请求语义模型。' +
        '只有 semantic.experimentalEnabled=true 才启用实验性唤醒词/语义筛选，唤醒后按对话窗口投递；旧 semantic.enabled=true 不会自动启用。' +
        '噪声、过短和重复片段仍过滤；外放可能误触发，建议使用耳机，不宣称具备回声消除。投递消息会带「最近：」窗口上下文。' +
        'action=always-off 关闭自由麦。声纹识别为实验性功能、默认关闭；仅开启后才按声纹过滤。',
      timeoutMs: 20_000,
      parameters: {
        type: 'object',
        properties: {
          action: {
            type: 'string',
            enum: ['enable', 'disable', 'start', 'stop', 'always-on', 'always-off'],
            description:
              'enable/always-on=首次授权范围内直接开启；未授权才返回障碍。disable=关闭；start/stop=已授权的一次录音；always-off=关闭常听。后四项仍遵守真实会话归属。',
          },
        },
        required: ['action'],
        additionalProperties: false,
      },
      async execute(args, exec) {
        const action = String(args?.action ?? 'start')
        const id = exec?.agent?.session?.id
        if (!exec?.agent || ctx.agents?.get?.(id) !== exec.agent) throw new Error('无法验证发起会话身份')
        if (action === 'enable') return JSON.stringify(await agentControl.execute(exec.agent,'enable',{},exec.signal))
        if (action === 'always-on') return JSON.stringify(await agentControl.execute(exec.agent,'listen-mode',{mode:'always'},exec.signal))
        if (action === 'disable') {
          agentControl.noteStop()
          const granted = await sessionControl.change(id, action === 'enable', exec.signal)
          const separate = voiceSessions.status()
          return granted ? `语音权限由本会话 ${granted} 控制；${separate?.id ? `语音将进入独立会话 ${separate.id}（思考 ${separate.routing?.voiceMode?.selectedEffort ?? separate.reasoningEffort ?? '提供商默认（未验证）'}，${separate.persistence?.restored ? `已恢复同一根；撤回 ${separate.restore?.withdrawnPendingInputCount ?? 0} 条旧排队输入，历史保留、不自动重跑` : '首句时建立'}）` : '语音使用原会话'}；侧键可用，全文自动朗读关闭。` : '语音已关闭，已停止录音和播音，并收回侧键和独立语音会话权限。'
        }
        if (!sessionControl.allowed(id)) return '本会话没有语音权限。只有用户明确要求开启语音时，才可调用 enable 将唯一权限绑定本会话。'
        if (action === 'stop') {
          await ear.stop()
          return '已停止录音，正在识别…（结果会以 [语音] 消息投进会话）'
        }
        if (action === 'always-off') {
          agentControl.noteStop()
          const res = await ear.alwaysOff()
          const a = res?.status ?? null
          return `常听已关闭（分段 ${a?.segments ?? 0}，唤醒 ${a?.wakes ?? 0}，投递 ${
            a?.delivered ?? 0
          }，丢弃 ${a?.dropped ?? 0}）。`
        }
        agentControl.requireScopes(exec.agent,['microphone'],exec.signal)
        await ear.start()
        return '开始录音：直接说话，说完停 1.2 秒就自动结束（最长 15 秒）。'
      },
    },
    {
      name: 'voice_enroll',
      description:
        '注册一段声纹（CAM++）。默认录 8 秒（对着麦克风说几句就行）；' +
        '也可以给 path 用现成音频文件注册（没有可用麦克风时用这个）。' +
        '声纹识别为实验功能、默认关闭；注册会保留样本，只有显式开启 speakerVerification.enabled 后才参与识别和常听过滤。',
      timeoutMs: 200_000,
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: '给这个声纹起的名字，比如「主人」' },
          path: { type: 'string', description: '可选：用这个音频文件注册，不传就现场录 ~8s' },
        },
        required: ['name'],
        additionalProperties: false,
      },
      async execute(args, exec) {
        const callerId = exec?.agent?.session?.id
        if (!exec?.agent || ctx.agents?.get?.(callerId) !== exec.agent) throw new Error('无法验证发起会话身份')
        if (!args?.path && !sessionControl.allowed(exec?.agent?.session?.id)) return '本会话没有麦克风权限，请先由用户明确要求开启语音。'
        agentControl.requireScopes(exec.agent,['local-audio',...(!args?.path?['microphone']:[])],exec.signal)
        const who = String(args?.name ?? '').trim() || '主人'
        const res = await ear.enroll(who, args?.path ? String(args.path) : undefined)
        return `声纹已注册：${res.name}（第 ${res.samples} 次，${res.dim} 维，样本 ${res.dur}s）`
      },
    },
    {
      name: 'voice_transcribe',
      description:
        '转写一个本地音频文件（m4a/mp3/wav 等）：返回文本、情感、事件标签、声纹分数和韵律。' +
        '测耳朵有没有配好时用它，不用对着麦克风说话。',
      timeoutMs: 200_000,
      parameters: {
        type: 'object',
        properties: { path: { type: 'string', description: '音频文件绝对路径' } },
        required: ['path'],
        additionalProperties: false,
      },
      async execute(args, exec) {
        const path = String(args?.path ?? '').trim()
        if (!path) return '缺少 path'
        const assertAllowed = localAudioGuard(exec)
        const res = await ear.transcribe(path, assertAllowed)
        assertAllowed()
        return [
          `文本: ${res.text || '(空)'}`,
          `语言: ${res.lang ?? '?'}  情感: ${res.emotion ?? '?'}  事件: ${res.event_tag ?? '?'}`,
          `时长: ${res.dur}s  声纹: ${res.speaker_verification === false ? '实验功能关闭' : res.speaker_score ?? '未注册'}  通过: ${
            res.speaker_verification === false ? '未执行' : res.speaker_ok === null ? '未注册' : res.speaker_ok
          }`,
        ].join('\n')
      },
    },
    {
      name: 'voice_prosody',
      description:
        '只算一段音频的韵律（parselmouth）：平均 F0、F0 范围、强度、语速、停顿占比。' +
        '想知道「这句话说得是高是低、快还是慢」时用。',
      timeoutMs: 200_000,
      parameters: {
        type: 'object',
        properties: { path: { type: 'string', description: '音频文件绝对路径' } },
        required: ['path'],
        additionalProperties: false,
      },
      async execute(args, exec) {
        const path = String(args?.path ?? '').trim()
        if (!path) return '缺少 path'
        const assertAllowed = localAudioGuard(exec)
        const res = await ear.prosody(path, assertAllowed)
        assertAllowed()
        const p = res.prosody ?? {}
        return [
          `文本: ${res.text || '(空)'}`,
          `平均音高: ${p.meanF0}Hz  范围: ${p.f0P10}-${p.f0P90}Hz（跨度 ${p.f0Range}）`,
          `强度均值: ${p.intensityMean}dB  极差: ${p.intensityRange}dB`,
          `语速: ${p.speechRate} 字/秒  停顿占比: ${p.pauseRatio}`,
        ].join('\n')
      },
    },
  ]

  const disposers = []
  const offInputDelivery = ctx.on?.('session/event', (session, event) => conversation.observeInputDelivery(session, event))
  if (typeof offInputDelivery === 'function') disposers.push(offInputDelivery)
  const offSpeechResult = ctx.on?.('tools/result', (exec, result) => conversation.finishSpeech(exec, result))
  if (typeof offSpeechResult === 'function') disposers.push(offSpeechResult)
  disposers.push(() => conversation.dispose())
  // Verified native ToolsService middleware (tools/src/events.ts). This runs
  // when speak execution is requested, not when TTS queues or speakers start.
  const offSpeakRequest = ctx.on?.('tools/execute', (exec, next) => {
    conversation.requestSpeech(exec)
    const id = exec?.agent?.id ?? exec?.agent?.session?.id
    const voice = voiceSessions.status()
    if (['speak', 'whale_voice_speak'].includes(exec?.name) && !exec.signal?.aborted && voice?.enabled
      && id === voice.id && ctx.agents?.get?.(id) === exec.agent
      && voice.epoch === cfg.voiceSessionEpoch && sessionControl.allowed(id)
      && turnSignals.suppressEndCue('speech_requested')) {
      conservativeCueSuppression = { status: 'observed', source: 'native-speak-request' }
    }
    return next()
  })
  if (typeof offSpeakRequest === 'function') disposers.push(offSpeakRequest)
  else conservativeCueSuppression = { status: 'unsupported', source: 'native-speak-request' }
  try {
    if (!ctx?.tools?.register) {
      log('ctx.tools 不可用，语音工具没有注册（插件其余部分照常）')
    } else {
      for (const spec of toolSpecs) {
        const definition = {
          ...spec,
          output: {
            schema: { type: 'string' },
            render: (_args, value) => [{ type: 'text', text: String(value ?? '') }],
          },
          async execute(args, exec) {
            try {
              const speechId = spec.name === 'whale_voice_speak' ? randomUUID() : undefined
              return await trackOperation('agent', voiceToolOperation(spec.name, args), () => spec.execute(args ?? {}, exec, speechId),
                { subjectId: exec?.agent?.session?.id, targetId: ['voice_control','voice_message'].includes(spec.name) ? args?.target : undefined,
                  operationId: speechId, classify: voiceToolOutcome })
            } catch (err) {
              if (spec.name === 'whale_voice_speak' && err?.code === 'TTS_CANCELLED') conversation.recordSpeechCancellation(exec)
              const message = String(err?.message ?? err)
              log(`工具 ${spec.name} 失败: ${message}`)
              const details = {}
              const deepseekDiagnostic = spec.name === 'whale_voice_speak' && safeDeepSeekDiagnostic(err?.deepseekDiagnostic)
              if (deepseekDiagnostic) details.deepseekDiagnostic = deepseekDiagnostic
              for (const key of ['code', 'rootSessionId', 'taskId', 'readback', 'stage', 'source']) {
                if (typeof err?.[key] === 'string' && err[key].length <= 256) details[key] = err[key]
              }
              if (Number.isSafeInteger(err?.revision) && err.revision >= 0) details.revision = err.revision
              if (typeof err?.persistenceConfirmed === 'boolean') details.persistenceConfirmed = err.persistenceConfirmed
              if (typeof err?.snapshotStale === 'boolean') details.snapshotStale = err.snapshotStale
              if (err?.routing) details.routing = safeRouting(err.routing)
              if (Array.isArray(err?.observedTasks)) details.observedTasks = err.observedTasks.slice(0, 8).map(item => ({
                ...(typeof item?.taskId === 'string' && item.taskId.length <= 256 ? { taskId: item.taskId } : {}),
                ...(Number.isSafeInteger(item?.revision) && item.revision >= 0 ? { revision: item.revision } : {}),
              }))
              return `❌ ${spec.name} 失败：${message}${Object.keys(details).length ? `\n${JSON.stringify(details)}` : ''}`
            }
          },
        }
        const dispose = ctx.tools.register(definition)
        if (typeof dispose === 'function') disposers.push(dispose)
      }
      log(`已注册工具: ${toolSpecs.map((s) => s.name).join(', ')}`)
    }
  } catch (err) {
    log(`注册工具失败: ${String(err?.stack ?? err)}`)
  }

  // -------------------------------------------------------------------------
  // 生命周期
  // -------------------------------------------------------------------------

  // Persisted ownership is not a microphone grant for this newly loaded
  // instance. Revoke it before any helper can install PTT or start always-on.
  // This does not change the native voice history/catalog or restart tasks.
  try { saveOwner(null) } catch (error) {
    // saveOwner has latched audio off and observed root/helper shutdown. Keep
    // the service available to report the failure without leaking registration.
    lastError = { at: new Date().toISOString(), message: '启动时无法确认旧语音授权已撤回；音频已锁定，请修复配置后完整重新加载。' }
    log(`冷启动语音撤权未确认: ${String(error?.code ?? error?.name ?? 'unknown')}`)
  }

  if (!grantPersistenceFailure) prepareSenseVoice()

  // Fixed synthetic text only; an unresolved owner-derived route waits for inspection.
  void voiceSessions.probeConfiguredRoute().catch(() => log('档位检查暂未完成；可在性能设置重试。'))

  if (cfg.autoStart !== false && !grantPersistenceFailure) {
    ensureHelper().catch((err) => log(`预启动帮工失败（工具调用时会再试）: ${String(err?.message ?? err)}`))
  }

  log(
    `start ${VERSION} pid=${process.pid} delivery=${cfg.delivery} asr=${cfg.asr} helper=${cfg.helperPath}`,
  )

  let disposal = null
  const instance = {
    version: VERSION,
    startedAt,
    ear,
    sessionControl,
    uiBridge,
    tts,
    dispose() {
      if (disposed) return disposal
      const shutdownOperationId = randomUUID()
      recordOperation({ source: 'host', action: 'plugin.stop', phase: 'requested', operationId: shutdownOperationId })
      rawUiBridge.suspendTtsInstallIntent()
      agentControl.dispose()
      turnSignals.dispose()
      const installerStopped = modelInstaller?.close()
      const speechStopped = stopTtsConfirmed().then(() => tts.dispose())
      disposed = true
      existingVoice.dispose()
      const recognitionStopped = senseVoiceAsr.dispose()
      const wakeStopped = wakeSpotter.dispose()
      const runtimeStopped = Promise.allSettled([recognitionStopped, wakeStopped]).then(() => sherpaRuntime.dispose())
      const rootsStopped = voiceSessions.dispose().finally(() => standalone.dispose())
      clearTimeout(restartTimer)
      for (const dispose of disposers) {
        try {
          dispose()
        } catch {
          /* ignore */
        }
      }
      for (const entry of Array.from(pending)) {
        clearTimeout(entry.timer)
        pending.delete(entry)
        entry.reject(new Error('插件已卸载'))
      }
      const helperStopped = stopHelper(new Error('插件已卸载'))
      disposal = Promise.allSettled([predecessorCleanup, rootsStopped, speechStopped, helperStopped, recognitionStopped, wakeStopped, runtimeStopped, installerStopped]).then(async results => {
        const failures = results.filter(result => result.status === 'rejected').map(result => result.reason)
        recordOperation({ source: 'host', action: 'plugin.stop', phase: 'finished', result: failures.length ? 'failed' : 'ok', error: failures[0], operationId: shutdownOperationId })
        let timeout
        try {
          await Promise.race([operationLog.dispose(), new Promise(resolveLog => {
            timeout = setTimeout(resolveLog, 500)
            timeout.unref?.()
          })])
        } finally { clearTimeout(timeout) }
        if (failures.length) throw new AggregateError(failures, 'Old voice resource cleanup is unconfirmed; restart DSH.')
      })
      disposal.catch((err) => log(`Voice disposal incomplete: ${String(err?.message ?? err)}`))
      // Keep the predecessor discoverable until its owned handle really closes.
      disposal.then(() => { if (globalThis[GLOBAL_KEY] === instance) delete globalThis[GLOBAL_KEY] }, () => {})
      log('dispose: admission revoked; waiting for owned voice resources to exit')
      return disposal
    },
  }

  // 给「看屏」「说话」留的合入口：以后它们在同一个陪玩系统里直接合 ear
  globalThis[GLOBAL_KEY] = instance
  return instance
}
