import { conversationRemote } from './conversation-contract.mjs'
export const emptyConversation = () => ({ revision: 0, rootSessionId: null, title: null, latest: null, items: [], inputActive: false, inputError: null, playbackConfirmed: false })
export const emptyModels = () => ({ schema: 1, hardware: null, compute: { schema: 1, default: 'cpu', observedAt: null, backends: {}, reason: '尚未检测本地计算后端。' }, models: [], jobs: [] })
/** Mount once per UI plugin. A subscription owns exactly one selected session. */
export async function mountConversationClient(ctx, observe = () => {}) {
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
  const unwrap = result => {
    if (result?.ok !== true) throw result?.error ?? new Error('语音接口响应无效')
    return result.value
  }
  const invoke = async (send, signal, journal = true) => {
    let result
    try { result = await send() }
    catch (error) {
      if (journal && !disposed) observe('ui-request', 'finished', signal?.aborted ? 'cancelled' : 'failed')
      throw error
    }
    if (journal && result?.ok !== true && result?.error == null && !signal?.aborted) observe('ui-render-error', 'finished', 'failed')
    return unwrap(result)
  }
  return {
    subscribeUpdates(onValue, onError) {
      const controller = new AbortController()
      active.add(controller)
      void Promise.resolve().then(async () => {
        if (controller.signal.aborted) return
        try {
          for await (const value of namespace.followUpdates(controller.signal)) {
            if (!controller.signal.aborted) onValue(value)
          }
          if (!controller.signal.aborted) { observe('ui-stream', 'finished', 'failed'); onError() }
        } catch {
          if (!controller.signal.aborted) { observe('ui-stream', 'finished', 'failed'); onError() }
        } finally { active.delete(controller) }
      })
      return () => { controller.abort(); active.delete(controller) }
    },
    updateAction(request, signal) {
      if (disposed) throw new Error('更新接口已卸载')
      return invoke(() => namespace.updateAction(request, signal), signal)
    },
    subscribePresentation(onValue, onError) {
      const controller = new AbortController()
      active.add(controller)
      void (async () => {
        try {
          for await (const value of namespace.followPresentation(controller.signal)) {
            if (!controller.signal.aborted) onValue(value)
          }
          if (!controller.signal.aborted) { observe('ui-stream', 'finished', 'failed'); onError(new Error('会话显示连接已结束')) }
        } catch (error) {
          if (!controller.signal.aborted) { observe('ui-stream', 'finished', 'failed'); onError(error) }
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
          if (!controller.signal.aborted) { observe('ui-stream', 'finished', 'failed'); onValue(emptyConversation(), { initial:true }); onError(new Error('语音状态连接已结束，正在重新连接')) }
        } catch (error) {
          if (!controller.signal.aborted) { observe('ui-stream', 'finished', 'failed'); onValue(emptyConversation(), { initial:true }); onError(error) }
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
          if (!ended && !disposed && !controller.signal.aborted) { observe('ui-stream', 'finished', 'failed'); clear(); onError(new Error('模型进度连接已结束，正在重新连接')) }
        } catch (error) {
          if (!ended && !disposed && !controller.signal.aborted) { observe('ui-stream', 'finished', 'failed'); clear(); onError(error) }
        } finally { modelSubscriptions.delete(controller) }
      })()
      return clear
    },
    async action(id, request, signal) {
      if (disposed) throw new Error('语音接口已卸载')
      const text = await invoke(() => namespace.action(id, request, signal), signal)
      try {
        const result = JSON.parse(text)
        if (result?.protocol !== 1 || result.action !== request.action || !result.value || typeof result.value !== 'object' || Array.isArray(result.value)) throw new Error('Fish Voice UI protocol mismatch')
        return result.value
      } catch (error) {
        observe('ui-render-error', 'finished', 'failed')
        throw error
      }
    },
    readAuthorization: signal=>invoke(() => namespace.readAuthorization(signal), signal),
    saveAuthorization: (request,signal)=>invoke(() => namespace.saveAuthorization(request,signal), signal),
    async senseVoiceAsrAction(request, signal) {
      if (disposed) throw new Error('语音接口已卸载')
      return invoke(() => namespace.senseVoiceAsrAction(request, signal), signal)
    },
    async manageSessions(id,request,signal) {
      if (disposed) throw new Error('语音接口已卸载')
      return JSON.parse(await invoke(() => namespace.manageSessions(id,request,signal), signal))
    },
    listExistingVoiceSessions(request, signal) {
      if (disposed) throw new Error('会话绑定接口已卸载')
      return invoke(() => namespace.listExistingVoiceSessions(request, signal), signal)
    },
    setExistingVoiceSession(request, signal) {
      if (disposed) throw new Error('会话绑定接口已卸载')
      return invoke(() => namespace.setExistingVoiceSession(request, signal), signal)
    },
    retryVoiceTranscript(request, signal) {
      if (disposed) throw new Error('语音重发接口已卸载')
      return invoke(() => namespace.retryVoiceTranscript(request, signal), signal)
    },
    readClientOperationScope(signal) {
      if (disposed) throw new Error('诊断日志接口已卸载')
      return invoke(() => namespace.readClientOperationScope(signal), signal, false)
    },
    recordClientOperations(eventBatch, signal) {
      if (disposed) throw new Error('诊断日志接口已卸载')
      return invoke(() => namespace.recordClientOperations(eventBatch, signal), signal, false)
    },
    readOperationLog(page, signal) {
      if (disposed) throw new Error('诊断日志接口已卸载')
      return invoke(() => namespace.readOperationLog(page, signal), signal, false)
    },
    readSetup: signal => invoke(() => namespace.readSetup(signal), signal),
    readVolume: (id, signal) => invoke(() => namespace.readVolume(id, signal), signal),
    setVolume: (id, request, signal) => invoke(() => namespace.setVolume(id, request, signal), signal),
    async dispose() { disposed = true; for (const clear of [...modelSubscriptions.values()]) clear(); modelSubscriptions.clear(); for (const controller of active) controller.abort(); active.clear(); await binding.dispose(); await unmount() },
  }
}
