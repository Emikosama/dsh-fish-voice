import { randomUUID } from 'node:crypto'
import { createVoiceConfigAssistant } from './voice-config-assistant.mjs'
import { createVoiceConfigRepairs } from './voice-config-repairs.mjs'
import { explainVoiceProviderFailure } from './voice-provider-errors.mjs'

const descriptions = {
  invalid_json: '鲸应配置文件读取失败。请用最近的配置备份恢复，或反馈给作者。',
  config_shape_invalid: '鲸应配置文件的格式有误。请用最近的配置备份恢复，或反馈给作者。',
  config_permission_denied: '鲸应无法读写配置。请检查当前账户对配置目录的权限。',
  config_read_failed: '鲸应无法读取配置。请检查磁盘和配置目录是否可用。',
  bundled_component_missing: '鲸应安装包中的语音组件缺失或无法读取。请通过 DSH 重装完整包。',
  component_incompatible: '当前运行组件与鲸应不兼容。请检查 DSH 版本并重装完整包。',
  configured_helper_missing: '当前配置指向的语音组件不可用。',
  explicit_python_binding_invalid: '当前指定的 Python 运行环境不可用。',
  python_probe_failed: '当前 Python 运行环境未通过语音依赖检查。',
  invalid_asr_route: '当前语音识别配置不可用。',
  invalid_tts_route: '当前朗读配置不可用。',
}
const operations = new Set(['read-settings', 'enable', 'new', 'resume', 'complete-setup', 'save-settings', 'save-models', 'save-tts', 'preview-tts'])
const runtimeOperations = new Set(['enable', 'new', 'resume'])
const applicationErrors = {
  VOICE_PYTHON_DEPENDENCIES: { phaseId: 'python', reasonId: 'explicit_python_binding_invalid' },
  VOICE_HELPER_COMPONENT_MISSING: { phaseId: 'helper', reasonId: 'configured_helper_missing' },
  VOICE_HELPER_PROTOCOL: { phaseId: 'package', reasonId: 'component_incompatible' },
}

async function chooseRepair(ctx, selection, snapshot, { round, repairs, prior }, signal, onFailure) {
  const llm = ctx.get?.('llm')
  const route = selection ?? ctx.get?.('agentDefaultModel')?.currentSelection?.()
  if (!llm?.prepareCall || !route?.provider || !route?.model) {
    throw Object.assign(new Error('无法加载设置中的模型'), { code: 'REPAIR_MODEL_UNAVAILABLE' })
  }
  const deadline = AbortSignal.any([signal, AbortSignal.timeout(20_000)])
  const message = [
    'Select one allowed configuration repair. Return only a JSON object with exactly one key repairId.',
    'Use null if no action applies. Never propose a command, path, code, or settings value.',
    JSON.stringify({ round, issue: snapshot.incident.id, allowed: repairs.map(({ id, phaseId, reasonId }) => ({ id, phaseId, reasonId })), tried: prior.map(item => item.repairId) }),
  ].join('\n')
  let output = ''
  let finished = false
  let watchdog
  try {
    deadline.throwIfAborted()
    const timedOut = new Promise((_, reject) => {
      watchdog = () => reject(deadline.reason)
      deadline.addEventListener('abort', watchdog, { once: true })
    })
    await Promise.race([(async () => {
      const call = await llm.prepareCall({ provider: route.provider, model: route.model, maxTokens: 128 }, deadline)
      deadline.throwIfAborted()
      for await (const chunk of call.stream({
        ...call.config, signal: deadline, tools: [],
        messages: [{ role: 'user', content: [{ type: 'text', text: message }] }],
      })) {
        deadline.throwIfAborted()
        if (chunk.type === 'text-delta' && typeof chunk.text === 'string') output += chunk.text
        if (output.length > 1024 || chunk.type.startsWith('tool-')) throw new Error('配置助手模型返回无效')
        if (chunk.type === 'finish') {
          if (chunk.reason?.kind === 'error') throw chunk.reason.failure ?? chunk.reason
          finished = chunk.reason?.kind === 'stop'
          break
        }
      }
    })(), timedOut])
  } catch (error) {
    if (!signal.aborted) onFailure(explainVoiceProviderFailure(llm, route.provider, error))
    throw Object.assign(new Error('配置助手模型响应失败'), { code: 'REPAIR_MODEL_FAILED' })
  } finally { if (watchdog) deadline.removeEventListener('abort', watchdog) }
  if (!finished) return { repairId: null }
  let result
  try { result = JSON.parse(output) } catch { return { repairId: null } }
  if (!result || Object.keys(result).length !== 1 || !repairs.some(repair => repair.id === result.repairId)) return { repairId: null }
  return { repairId: result.repairId }
}

export function createVoiceConfigRepairRuntime({ ctx, log, getSafeToWrite, ...options }) {
  const executor = createVoiceConfigRepairs({ ...options, canWrite: getSafeToWrite })
  let offer = null, offerTime = 0, selection = null, failure = null, modelError = null, checking = false, lastOfferKey = null
  const core = createVoiceConfigAssistant({
    async diagnose({ phase, signal }) {
      signal.throwIfAborted()
      const observed = await executor.inspect({ failure })
      signal.throwIfAborted()
      const blocker = observed.blockers.find(row => row.resolutionId === 'full_package_reinstall')
        ?? observed.blockers.find(row => descriptions[row.reasonId]) ?? observed.repairs[0]
      const issue = blocker?.reasonId
      const key = issue ? `${observed.revision}:${issue}` : null
      if (phase === 'offer' && key && key === lastOfferKey && ['needs-feedback', 'needs-manual', 'failed'].includes(core.getSnapshot().state)) {
        return { schema: 1, status: 'absent', observedAt: Date.now(), revision: observed.revision, incident: null, repairs: [], blockers: [] }
      }
      const incident = issue ? {
        id: issue, severity: 'severe', title: '环境复杂，鲸应配置失败',
        summary: descriptions[issue] ?? '鲸应无法确认当前配置可以正常使用。',
        manualRecovery: blocker.resolutionId === 'full_package_reinstall' ? 'package-manager' : observed.repairs.length ? 'none' : 'feedback',
      } : null
      const repairs = getSafeToWrite() && incident?.manualRecovery !== 'package-manager' ? observed.repairs : []
      if (incident && phase === 'offer') lastOfferKey = key
      log(`config-repair inspect phase=${phase} reason=${issue ?? 'none'} repairs=${repairs.length}`)
      return { schema: 1, status: incident ? 'present' : 'absent', observedAt: Date.now(), revision: observed.revision, incident, repairs, blockers: incident ? observed.blockers : [] }
    },
    decide: (snapshot, round, signal) => chooseRepair(ctx, selection, snapshot, round, signal, detail => {
      modelError = detail?.message ?? '配置助手模型未能完成请求。'
      log(`config-repair model-failed status=${detail?.status ?? 'unknown'} code=${detail?.code ?? 'unknown'}`)
    }),
    async apply(repair, before, signal) {
      const result = await executor.apply({ repairId: repair.id, expectedRevision: before.revision }, signal)
      if (result.ok && repair.phaseId === failure?.phaseId) failure = null
      return result
    },
    emit: event => log(`config-repair phase=${event.stage ?? event.type} round=${event.round ?? 0} incident=${event.incidentId ?? 'none'} repair=${event.repairId ?? 'none'} code=${event.code ?? 'none'}`),
  })
  const read = () => {
    const state = core.getSnapshot()
    return { ...state, offer: state.state === 'offered' && Date.now() - offerTime <= 30_000 ? offer : null, modelError }
  }
  return {
    async failed(operation, error, origin) {
      if (checking || !operations.has(operation) || ['running', 'stopping', 'disposed'].includes(core.getSnapshot().state)) return
      if (offer && Date.now() - offerTime < 30_000 && core.getSnapshot().state === 'offered') return
      checking = true
      try {
        selection = origin?.model?.current?.() ?? null
        failure = runtimeOperations.has(operation) ? applicationErrors[error?.code] ?? null : null
        const next = await core.offer({ status: 'failed', operation, failureId: randomUUID(), failedAt: Date.now() })
        offer = next
        if (next) { offerTime = Date.now(); modelError = null }
      } finally { checking = false }
    },
    request(request) {
      if (request.operation === 'start') {
        if (!offer || Date.now() - offerTime > 30_000 || offer.id !== request.id || request.confirmed !== true) return read()
        void core.start({ id: request.id, confirmed: true }).catch(() => log('config-repair start-failed'))
        offer = null
      } else if (request.operation === 'stop') core.stop()
      return read()
    },
    dispose: () => core.dispose(),
  }
}
