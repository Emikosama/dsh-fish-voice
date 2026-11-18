import { conversationRemote } from './conversation-contract.mjs'
export const emptyConversation = () => ({ revision: 0, rootSessionId: null, title: null, latest: null, items: [], inputActive: false, inputError: null, playbackConfirmed: false })
export const emptyModels = () => ({ schema: 1, hardware: null, compute: { schema: 1, default: 'cpu', observedAt: null, backends: {}, reason: '尚未检测本地计算后端。' }, models: [], jobs: [] })
/** Mount once per UI plugin. A subscription owns exactly one selected session. */
export async function mountConversationClient(ctx) {
  const unmount = await ctx.remote.$mount(conversationRemote)
  // Mount first, then bind the dotted namespace in a dependent fiber. Requiring
  // it on the bootstrap plugin would deadlock: that plugin creates the service.
  let namespace, binding
  try {
    binding = ctx.inject(['remote','remote.whaleConversation'], bound => { namespace = bound.remote.whaleConversation })
    await binding.await()
    if (!namespace) throw new Error('语音接口尚未就绪')
  } catch (error) {
    await binding?.dispose(); await unmount(); throw error
  }
  const active = new Set()
  const modelSubscriptions = new Map()
  let disposed = false
  const unwrap = async result => {
    const settled = await result
    if (settled?.ok !== true) throw settled?.error ?? new Error('语音接口响应无效')
    return settled.value
  }
  return {
    subscribePresentation(onValue, onError) {
      const controller = new AbortController()
      active.add(controller)
      void (async () => {
        try {
          for await (const value of namespace.followPresentation(controller.signal)) {
            if (!controller.signal.aborted) onValue(value)
          }
          if (!controller.signal.aborted) onError(new Error('会话显示连接已结束'))
        } catch (error) {
          if (!controller.signal.aborted) onError(error)
        } finally { active.delete(controller) }
      })()
      return () => { controller.abort(); active.delete(controller) }
    },
    subscribe(sessionId, onValue, onError = () => {}) {
      const controller = new AbortController()
      active.add(controller)
      onValue(emptyConversation(), { initial:true })
      void (async () => {
        try {
          for await (const value of namespace.follow(sessionId, controller.signal)) {
            if (!controller.signal.aborted) onValue(value)
          }
          if (!controller.signal.aborted) { onValue(emptyConversation(), { initial:true }); onError(new Error('语音状态连接已结束，正在重新连接')) }
        } catch (error) {
          if (!controller.signal.aborted) { onValue(emptyConversation(), { initial:true }); onError(error) }
        } finally { active.delete(controller) }
      })()
      return () => { controller.abort(); active.delete(controller); onValue(emptyConversation(), { initial:true }) }
    },
    subscribeModels(sessionId, onValue, onError = () => {}) {
      if (disposed) { onValue(emptyModels(), { initial:true }); onError(new Error('模型进度接口已卸载')); return () => {} }
      const controller = new AbortController()
      let ended = false
      const clear = () => {
        if (ended) return
        ended = true; controller.abort(); modelSubscriptions.delete(controller); onValue(emptyModels(), { initial:true })
      }
      modelSubscriptions.set(controller, clear)
      onValue(emptyModels(), { initial:true })
      void (async () => {
        try {
          for await (const value of namespace.followModels(sessionId, controller.signal)) {
            if (!ended && !disposed && !controller.signal.aborted) onValue(value)
          }
          if (!ended && !disposed && !controller.signal.aborted) { clear(); onError(new Error('模型进度连接已结束，正在重新连接')) }
        } catch (error) {
          if (!ended && !disposed && !controller.signal.aborted) { clear(); onError(error) }
        } finally { modelSubscriptions.delete(controller) }
      })()
      return clear
    },
    async action(id, request, signal) {
      if (disposed) throw new Error('语音接口已卸载')
      const text = await unwrap(namespace.action(id, request, signal))
      const result = JSON.parse(text)
      if (result?.protocol !== 1 || result.action !== request.action || !result.value || typeof result.value !== 'object' || Array.isArray(result.value)) throw new Error('Fish Voice UI protocol mismatch')
      return result.value
    },
    readAuthorization: signal=>unwrap(namespace.readAuthorization(signal)),
    saveAuthorization: (request,signal)=>unwrap(namespace.saveAuthorization(request,signal)),
    async whisperAsrAction(request, signal) {
      if (disposed) throw new Error('语音接口已卸载')
      return unwrap(namespace.whisperAsrAction(request, signal))
    },
    async repairAction(request,signal) {
      if (disposed) throw new Error('语音接口已卸载')
      return JSON.parse(await unwrap(namespace.repairAction(request,signal)))
    },
    async manageSessions(id,request,signal) {
      if (disposed) throw new Error('语音接口已卸载')
      return JSON.parse(await unwrap(namespace.manageSessions(id,request,signal)))
    },
    readSetup: signal => unwrap(namespace.readSetup(signal)),
    readVolume: (id, signal) => unwrap(namespace.readVolume(id, signal)),
    setVolume: (id, request, signal) => unwrap(namespace.setVolume(id, request, signal)),
    async dispose() { disposed = true; for (const clear of [...modelSubscriptions.values()]) clear(); modelSubscriptions.clear(); for (const controller of active) controller.abort(); active.clear(); await binding.dispose(); await unmount() },
  }
}
