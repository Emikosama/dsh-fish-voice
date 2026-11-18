import { randomUUID } from 'node:crypto'
import { pickNativePath } from '../voice-path-picker.mjs'
import { ownerSettings } from '../voice-ui-bridge.mjs'
/** Official human-command adapter. It never constructs an Agent or changes a grant in config. */
export const name = 'dsh-whale-ear-ui'
export const inject = ['commands', 'whaleVoiceSession']

const FIELDS = Object.freeze({
  'read-history': ['cursor'],
  'conversation-models': [], 'save-conversation-model': ['revision','values'], 'save-voice-prompt': ['revision','values'],
  'capture-bindings': ['operation','token','inactive'],
  'save-bindings': ['revision','values','bindingContext'],
  'pick-local-path': ['kind'],
  'read-audio-devices': [], 'save-audio-device': ['revision','direction','selection'],
  'agent-permissions': [], 'save-agent-permissions': ['revision','allowed'], 'agent-requests': [], 'decide-agent-request': ['id','approve','acknowledgements'],
  'model-installer': [], 'inspect-model-compute': [], 'plan-model-install': ['modelId', 'compute', 'sourceDirectory', 'modelVariant'], 'start-model-install': ['modelId', 'compute', 'planHash', 'accepted', 'useWhenReady', 'sourceDirectory', 'modelVariant'], 'control-model-install': ['id', 'operation'], 'apply-model-install': ['id', 'revision'],
  status: [], enable: ['expectedOwnerSessionId', 'expectedExistingSessionId'], disable: [], 'read-settings': [], new: ['expectedOwnerSessionId'], 'inspect-performance': [], 'set-performance-mode': ['revision', 'performanceMode'],
  'inspect-tts': [], 'save-tts': ['revision', 'values'], 'complete-setup': ['revision'], 'preview-tts': ['revision', 'values'], 'cancel-tts': [],
  list: ['cursor'], resume: ['id'], 'listen-mode': ['mode'],
  'set-visibility': ['revision', 'visibility'], 'save-settings': ['revision', 'values'], 'save-models': ['revision', 'values'],
})
const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key)
export function uiOperationName(request) {
  const action = typeof request?.action === 'string' && own(FIELDS, request.action) ? request.action : 'invalid'
  const mode = action === 'listen-mode' && ['ptt','always','wake'].includes(request.mode) ? '.' + request.mode : ''
  return 'ui.' + action + mode
}
export function errorText(error) {
  const parts = [String(error?.message ?? error).slice(0, 1024)]
  if (typeof error?.code === 'string' && /^[A-Z][A-Z0-9_]{0,79}$/.test(error.code)) parts.push(`[${error.code}]`)
  if (typeof error?.rootSessionId === 'string' && error.rootSessionId.length <= 256 && !/[\u0000-\u001f\u007f]/.test(error.rootSessionId)) parts.push(`语音聊天 ID: ${error.rootSessionId}`)
  if (error?.persistenceConfirmed === false) parts.push('写入结果未确认；请先按 ID 核查，不要重试。')
  return parts.join('\n')
}

/** Shared owner-UI dispatcher. Callers must admit the owner and resolve the exact
 * live Agent first; this is not an agent tool and cannot elevate an agent call. */
export async function dispatchUiAction(api, agent, request, signal, ownerUi = false, record = true) {
  validateUiAction(request, signal)
  const capture = record && own(api, 'recordOperation') && typeof api.recordOperation === 'function'
  const operationId = capture ? randomUUID() : undefined
  const log = (phase, result, error) => {
    if (!capture) return
    try { api.recordOperation({ source: 'owner', action: uiOperationName(request), phase, result, error, operationId, subjectId: agent?.session?.id }) }
    catch { /* Recording cannot control operation dispatch. */ }
  }
  log('requested')
  try {
    const reply = await performUiAction(api, agent, request, signal, ownerUi)
    log('finished', 'ok')
    return reply
  } catch (error) {
    log('finished', error?.name === 'AbortError' ? 'cancelled' : 'failed', error)
    throw error
  }
}

function validateUiAction(request, signal) {
  if (JSON.stringify(request)?.length > (request?.action === 'save-voice-prompt' ? 200000 : 8192)) throw new Error('操作数据过长')
  if (!request || typeof request !== 'object' || Array.isArray(request) || typeof request.action !== 'string' || !own(FIELDS, request.action)) throw new Error('不支持的界面操作')
  if (Object.keys(request).some(key => key !== 'action' && !FIELDS[request.action].includes(key))) throw new Error('界面操作包含不支持的字段')
  if (signal?.aborted) throw new Error('操作已取消')
}
async function performUiAction(api, agent, request, signal, ownerUi) {
  let value
  switch (request.action) {
    case 'read-history':
      if (!ownerUi) throw new Error('只有用户界面可以读取记录')
      value = await api.readConversationHistory(agent, request.cursor === undefined ? {} : {cursor:request.cursor}, signal); break
    case 'conversation-models': value = await api.readConversationModels(agent, signal); break
    case 'save-voice-prompt': value = await api.updateVoicePrompt({revision:request.revision,values:request.values},agent,signal); break
    case 'save-conversation-model': value = await api.updateConversationModel({revision:request.revision,values:request.values},agent,signal); break
    case 'capture-bindings':
      if (!ownerUi) throw new Error('只有用户界面可以录入按键')
      value = await api.captureBindings({ operation: request.operation, token: request.token, inactive: request.inactive }, agent, signal); break
    case 'pick-local-path':
      if (!ownerUi) throw new Error('只有用户界面可以打开路径选择器')
      value = await pickNativePath(request.kind, signal); break
    case 'agent-permissions': value=api.readAgentPermissions(agent); break
    case 'save-agent-permissions': value=api.updateAgentPermissions({revision:request.revision,allowed:request.allowed},agent,signal); break
    case 'agent-requests': value = api.readAgentRequests(agent); break
    case 'decide-agent-request': { const lastOutcome=await api.decideAgentRequest({id:request.id,approve:request.approve,acknowledgements:request.acknowledgements},agent,signal); value={...api.readAgentRequests(agent),lastOutcome}; break }
    case 'model-installer': value = await api.readModelInstaller(agent); break
    case 'inspect-model-compute': value = await api.inspectModelCompute(agent, signal); break
    case 'plan-model-install': value = await api.planModelInstall({ modelId: request.modelId, compute: request.compute, ...(own(request,'sourceDirectory')?{sourceDirectory:request.sourceDirectory}:{}), ...(own(request,'modelVariant')?{modelVariant:request.modelVariant}:{}) }, agent, signal); break
    case 'start-model-install': value = await api.startModelInstall({ modelId: request.modelId, compute: request.compute, ...(own(request,'sourceDirectory')?{sourceDirectory:request.sourceDirectory}:{}), ...(own(request,'modelVariant')?{modelVariant:request.modelVariant}:{}), planHash: request.planHash, accepted: request.accepted, ...(own(request,'useWhenReady')?{useWhenReady:request.useWhenReady}:{}) }, agent, signal); break
    case 'control-model-install': value = await api.controlModelInstall({ id: request.id, operation: request.operation }, agent, signal); break
    case 'apply-model-install': value = await api.applyModelInstall({ id: request.id, revision: request.revision }, agent, signal); break
    case 'inspect-tts': value = await api.inspectTts(agent, signal); break
    case 'save-tts': value = await api.updateTtsSettings({ revision: request.revision, values: request.values }, agent, signal); break
    case 'complete-setup': value = await api.completeSetup({ revision: request.revision }, agent, signal); break
    case 'preview-tts': {
      const hasRevision = own(request, 'revision'), hasValues = own(request, 'values')
      if (hasRevision !== hasValues) throw new Error('草稿试听需要同时提供配置版本和设置')
      if (hasRevision) {
        if (!ownerUi) throw new Error('只有用户界面可以试听朗读草稿')
        value = await api.previewTts(agent, signal, { revision: request.revision, values: request.values }, true)
      } else value = await api.previewTts(agent, signal)
      break
    }
    case 'cancel-tts': value = await api.cancelTts(agent, signal); break
    case 'status': value = await api.status(agent); break
    case 'inspect-performance': value = await api.inspectPerformanceModes(agent, signal); break
    case 'set-performance-mode': value = await api.setPerformanceMode({ revision: request.revision, performanceMode: request.performanceMode }, agent, signal); break
    case 'enable': await api.changeForCaller(agent, true, signal, request.expectedOwnerSessionId, request.expectedExistingSessionId); value = await api.status(agent); break
    // An admitted owner can close the visible voice root itself. Read the
    // global status receipt after its expected retirement, not its old Agent.
    case 'disable': await api.changeForCaller(agent, false, signal); value = await api.status(ownerUi ? undefined : agent); break
    case 'listen-mode': value = await api.setListenMode(agent, request.mode, signal); break
    case 'set-visibility': value = await api.setVisibility({ revision: request.revision, visibility: request.visibility }, agent, signal); break
    case 'read-audio-devices': value = await api.readAudioDevices(agent, signal); break;
    case 'save-audio-device': value = await api.updateAudioDevice({revision:request.revision,direction:request.direction,selection:request.selection},agent,signal); break;
    case 'read-settings': value = await api.readSettings(agent); break
    case 'save-models': value = await api.updateModelSettings({ revision: request.revision, values: request.values }, agent, signal); break
    case 'save-bindings': value = await api.updateBindings({ revision: request.revision, values: request.values, bindingContext: request.bindingContext }, agent, signal); break
    case 'save-settings': value = await api.updateSettings({ revision: request.revision, values: request.values }, agent, signal); break
    case 'list': value = await api.listVoiceSessions(agent, signal, { cursor: request.cursor }); break
    case 'new': {
      const manual = own(request, 'expectedOwnerSessionId')
      if (agent === ownerSettings && !manual) throw new Error('请在鱼应界面明确创建新会话')
      if (manual && !ownerUi) throw new Error('只有用户界面可以直接新建语音聊天')
      const expected = request.expectedOwnerSessionId
      if (manual && expected !== null && (typeof expected !== 'string' || !expected || expected.length > 256)) throw new Error('麦克风所属会话标识无效')
      await api.newVoiceSession(agent, signal, expected)
      value = await api.status(manual ? undefined : agent)
      break
    }
    case 'resume':
      if (typeof request.id !== 'string' || !request.id || request.id.length > 256) throw new Error('请选择一个语音聊天')
      await api.resumeVoiceSession(agent, request.id, signal)
      value = await api.status(agent)
      break
  }
  return { protocol: 1, action: request.action, value }
}

// Pinned DSH CommandInvocation has no source field. Only the native command gateway
// constructs this invocation; it records command/run.source.kind=user, outside model history.
// This adapter is deliberately not registered as an agent tool. Core checks exact live Agent.
/** Register the one command whose target Agent is resolved by the DSH command gateway. */
export function apply(ctx) {
  ctx.effect(() => ctx.commands.register({
    name: 'whale-ear-ui',
    description: '鱼应悬浮窗与独立设置界面操作',
    input: { hint: 'JSON UI action' },
    recordInput: false,
    async handler(invocation) {
      try {
        const id = invocation.agent?.session?.id
        if (typeof id !== 'string' || !id) throw new Error('无法确认操作来源会话')
        if (invocation.rawInput.length > 200000) throw new Error('操作数据过长')
        const request = JSON.parse(invocation.rawInput)
        const result = await dispatchUiAction(ctx.whaleVoiceSession, invocation.agent, request, invocation.signal, true)
        return { kind: 'success', text: JSON.stringify(result) }
      } catch (error) {
        return { kind: 'error', text: errorText(error) }
      }
    },
  }), 'whale-ear-ui: human commands')
}
