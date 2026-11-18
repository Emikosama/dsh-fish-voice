import { dispatchUiAction, errorText } from './host.mjs'
import { conversationRemote, ownerSettingsActions } from './conversation-contract.mjs'
import { ownerSettings } from '../voice-ui-bridge.mjs'
export const name = 'dsh-whale-conversation-remote'
export const inject = ['typert', 'typertGateway', 'whaleVoiceSession', 'agents']

/** Plugin lifecycle, typed Gateway admission, owner principal and exact live Agent. */
export async function apply(ctx) {
  const lifetime = new AbortController()
  ctx.effect(() => () => lifetime.abort(), 'whale-conversation-stream-lifetime')
  const loader = ctx.get?.('loader')
  const protocol = await (typeof loader?.import === 'function'
    ? loader.import('@deepseek-ai/dsh-typert-protocol') : import('@deepseek-ai/dsh-typert-protocol'))
  class ConversationRemote extends protocol.TypertRemoteService {
    constructor(ctx) { super(ctx, 'whaleConversation') }
    caller(sessionId, signal) {
      signal?.throwIfAborted()
      if (this.ctx.invocation?.peer?.principal?.kind !== 'owner') throw new Error('只允许宿主所有者读取语音聊天')
      if (typeof sessionId !== 'string' || !sessionId || sessionId.length > 256) throw new Error('无效会话')
      const agent = this.ctx.agents.get(sessionId)
      if (!agent || agent.session?.id !== sessionId) throw new Error('操作来源会话已失效')
      return agent
    }
    settingsCaller(sessionId, signal) {
      if (sessionId !== null) return this.caller(sessionId, signal)
      this.owner(signal)
      return ownerSettings
    }
    async *follow(sessionId, signal) {
      const agent = this.settingsCaller(sessionId, signal)
      let pending, wake
      const onAbort = () => { wake?.(); wake = undefined }
      const off = this.ctx.whaleVoiceSession.subscribeConversation(agent, value => { pending = value; wake?.(); wake = undefined })
      signal.addEventListener('abort', onAbort, { once: true })
      try {
        while (!signal.aborted) {
          if (pending === undefined) await new Promise(resolve => { wake = resolve; if (signal.aborted) resolve() })
          if (signal.aborted) break
          // Recheck caller identity even if a buffered snapshot predates replacement.
          if (this.settingsCaller(sessionId, signal) !== agent) throw new Error('来源会话已替换')
          const value = this.ctx.whaleVoiceSession.readConversation(agent)
          pending = undefined
          yield value
        }
      } finally { off(); signal.removeEventListener('abort', onAbort) }
    }
    async *followModels(sessionId, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      const agent = this.settingsCaller(sessionId, combined)
      let pending = true, wake, invalid = null
      const notify = () => { wake?.(); wake = undefined }
      const check = () => {
        try { if (this.settingsCaller(sessionId, combined) !== agent) throw new Error('来源会话已替换') }
        catch (error) { invalid = error; notify() }
      }
      // The core is host-owned. Unsubscribing releases this observer, never the job.
      const off = this.ctx.whaleVoiceSession.subscribeModelInstaller(agent, () => { pending = true; notify() })
      const watchdog = setInterval(check, 1000)
      watchdog.unref?.()
      combined.addEventListener('abort', notify, { once: true })
      try {
        while (!combined.aborted) {
          if (!pending && !invalid) await new Promise(resolve => { wake = resolve; if (combined.aborted) resolve() })
          if (combined.aborted) break
          check()
          if (invalid) throw invalid
          pending = false
          // Re-read only after admission, rather than trusting a buffered update.
          yield this.ctx.whaleVoiceSession.readModelInstaller(agent)
        }
      } finally {
        clearInterval(watchdog); off(); combined.removeEventListener('abort', notify)
      }
    }
    async *followPresentation(signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      this.owner(combined)
      let pending = true, wake
      const changed = () => { pending = true; wake?.(); wake = undefined }
      const off = this.ctx.whaleVoiceSession.subscribePresentation(changed)
      combined.addEventListener('abort', changed, { once: true })
      try {
        while (!combined.aborted) {
          if (!pending) await new Promise(resolve => { wake = resolve; if (combined.aborted) resolve() })
          if (combined.aborted) break
          this.owner(combined)
          pending = false
          yield this.ctx.whaleVoiceSession.readPresentation()
        }
      } finally { off(); combined.removeEventListener('abort', changed) }
    }
    async action(sessionId, request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      const agent = this.settingsCaller(sessionId, combined)
      if (agent === ownerSettings && !ownerSettingsActions.has(request.action)) throw new Error('此操作需要打开一个 DSH 对话')
      const retiresCaller = agent !== ownerSettings && request.action === 'disable'
        && this.ctx.whaleVoiceSession.status(agent).voiceSession?.id === sessionId
      try {
        const result = await dispatchUiAction(this.ctx.whaleVoiceSession, agent, request, combined, true)
        // Closing the visible voice root intentionally retires that exact Agent.
        // The owner principal still owns the status receipt, not a replacement.
        if (retiresCaller && this.ctx.agents.get(sessionId) === undefined) {
          this.owner(combined)
          return JSON.stringify(result)
        }
        // Do not return private data to a session replaced while awaiting a write/read.
        if (this.settingsCaller(sessionId, combined) !== agent) throw new Error('来源会话已替换')
        return JSON.stringify(result)
      } catch (error) {
        this.owner(combined)
        if (agent === ownerSettings || this.ctx.agents.get(sessionId) === agent) {
          try { await this.ctx.whaleVoiceSession.noteConfigFailure?.(request.action, error, agent === ownerSettings ? undefined : agent) } catch {}
          this.owner(combined)
        }
        throw new Error(errorText(error))
      }
    }
    owner(signal) {
      signal?.throwIfAborted();lifetime.signal.throwIfAborted()
      if(this.ctx.invocation?.peer?.principal?.kind!=='owner')throw new Error('只允许宿主所有者管理鱼应设置')
    }
    readAuthorization(signal){this.owner(signal);return this.ctx.whaleVoiceSession.readAuthorization()}
    async saveAuthorization(request,signal){
      const combined=signal?AbortSignal.any([signal,lifetime.signal]):lifetime.signal
      this.owner(combined)
      const value=await this.ctx.whaleVoiceSession.saveAuthorization(request,combined)
      this.owner(combined);return value
    }
    async whisperAsrAction(request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      this.owner(combined)
      const result = await this.ctx.whaleVoiceSession.whisperAsrAction(request, combined)
      this.owner(combined)
      return result
    }
    repairAction(request, signal) {
      this.owner(signal)
      return JSON.stringify(this.ctx.whaleVoiceSession.repairAction(request))
    }
    async manageSessions(sessionId, request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      const agent = this.settingsCaller(sessionId, combined)
      const result = await this.ctx.whaleVoiceSession.manageSessions(agent, request, combined)
      if (this.settingsCaller(sessionId, combined) !== agent) throw new Error('来源会话已替换')
      return JSON.stringify(result)
    }
    async readSetup(signal) {
      this.owner(signal)
      try {
        const { onboarding } = this.ctx.whaleVoiceSession.readSettings()
        return { version: onboarding.version, completed: onboarding.completed }
      } catch (error) {
        try { await this.ctx.whaleVoiceSession.noteConfigFailure?.('read-settings', error) } catch {}
        this.owner(signal)
        throw new Error(errorText(error))
      }
    }
    readVolume(sessionId, signal) { return this.ctx.whaleVoiceSession.readOutputVolume(this.settingsCaller(sessionId, signal)) }
    setVolume(sessionId, request, signal) { return this.ctx.whaleVoiceSession.setOutputVolume(request, this.settingsCaller(sessionId, signal), signal) }
  }
  ctx.plugin(ConversationRemote)
  ctx.effect(() => ctx.typert.register({ package: conversationRemote.package, face: 'host', schemas: [],
    invocations: conversationRemote.descriptors, model: { services: [], events: [], objects: [] } }))
}
