import { createHash } from 'node:crypto'
import { makeCompatHiddenVoiceId } from './voice-presentation-id.mjs'

const fault = (code, message) => Object.assign(new Error(message), { code })

// One blank control Agent per Whale data directory. It supplies the native
// Agent scope for standalone controls and is never selected in the DSH UI.
export function createStandaloneVoiceOrigin({ configPath, getService, compatPresentation }) {
  const key = process.platform === 'win32' ? configPath.toLowerCase() : configPath
  const hash = createHash('sha256').update('whale-standalone-origin\0').update(key).digest('hex')
  const id = makeCompatHiddenVoiceId(`00000000-0000-8${hash.slice(0,3)}-8${hash.slice(3,6)}-${hash.slice(6,18)}`)
  let handle, opening, closed = false
  const current = () => handle?.agent && getService('agents')?.get?.(id) === handle.agent ? handle.agent : null
  function assertOpen(signal) {
    signal?.throwIfAborted()
    if (closed) throw fault('VOICE_ORIGIN_CLOSED', '鱼应独立会话已关闭，请重新打开插件。')
  }
  async function open(selection, signal) {
    const agents = getService('agents'), persistence = getService('sessionPersistence')
    const native = getService('workspaceRegistry')?.sessionPresentation
    if (native?.apiVersion === 1 && typeof native.reserve === 'function' && typeof native.get === 'function') {
      await native.reserve(id, { purpose: 'voice', visibility: 'hidden' })
      if (native.get(id)?.visibility !== 'hidden') throw fault('VOICE_HIDDEN_UNSUPPORTED', '宿主未确认隐藏鱼应的独立会话。')
    } else if (!compatPresentation?.active()) {
      throw fault('VOICE_HIDDEN_UNSUPPORTED', '鱼应还没连接到 DSH 侧栏，请刷新桌面界面后重试。')
    }
    assertOpen(signal)
    if (agents?.get?.(id)) throw fault('VOICE_ORIGIN_BUSY', '鱼应的独立会话正被旧实例占用，请稍后重试。')
    if (typeof persistence?.stat !== 'function') throw fault('VOICE_ORIGIN_UNAVAILABLE', 'DSH 暂未提供独立会话所需的存储能力。')
    const stored = await persistence.stat(id, { signal })
    assertOpen(signal)
    const header = stored?.header
    if (stored && (header?.id !== id || header.parentSession !== undefined || header.origin !== undefined || header.isSeeded === true || header.cwd !== undefined)) {
      throw fault('VOICE_ORIGIN_MISMATCH', '无法确认鱼应独立会话的身份。')
    }
    const options = { ...(selection ? { agentOptions: selection } : {}), signal }
    const created = stored
      ? await agents.resume({ ...options, resumeSessionId: id })
      : await agents.create({ ...options, sessionId: id })
    try {
      assertOpen(signal)
      if (created?.agent?.session?.id !== id || agents.get(id) !== created.agent) throw fault('VOICE_ORIGIN_MISMATCH', 'DSH 未确认鱼应独立会话的身份。')
      handle = created
    } catch (error) {
      await created?.dispose?.()
      throw error
    }
  }
  return {
    id, current,
    async acquire(selection, signal) {
      assertOpen(signal)
      if (!current()) {
        opening ??= open(selection, signal).finally(() => { opening = null })
        await opening
      }
      assertOpen(signal)
      const agent = current()
      if (!agent) throw fault('VOICE_ORIGIN_UNAVAILABLE', '鱼应独立会话已退出，请重试。')
      if (selection) {
        const prior = agent.model.current()
        if (prior?.provider !== selection.provider || prior?.model !== selection.model || prior?.reasoningEffort !== selection.reasoningEffort) agent.model.select(selection)
      }
      return agent
    },
    async dispose() {
      closed = true
      try { await opening } catch { /* Creation either failed or disposed its handle. */ }
      const previous = handle
      handle = null
      await previous?.dispose()
    },
  }
}
