import { randomUUID } from 'node:crypto'
import { dispatchUiAction, errorText, uiOperationName } from './host.mjs'
import { conversationRemote, ownerSettingsActions } from './conversation-contract.mjs'
import { ownerSettings } from '../voice-ui-bridge.mjs'
import { createVoiceUpdateService } from '../voice-update-service.mjs'
import manifest from '../package.json' with { type: 'json' }
export const name = 'dsh-whale-conversation-remote'
export const inject = ['typert', 'typertGateway', 'whaleVoiceSession', 'agents']
const scopeError = (code, message) => Object.assign(new Error(message), { code })
const replaced = () => scopeError('VOICE_CALLER_SESSION_REPLACED', '来源会话已替换')
const displayError = error => Object.assign(new Error(errorText(error)), { code: error?.code })

/** Plugin lifecycle, typed Gateway admission, owner principal and exact live Agent. */
export async function apply(ctx) {
  const lifetime = new AbortController()
  const loader = ctx.get?.('loader')
  const hostImport = spec => typeof loader?.import === 'function' ? loader.import(spec) : import(spec)
  const protocol = await hostImport('@deepseek-ai/dsh-typert-protocol')
  const logUpdateError = (stage, error) => {
    ctx.whaleVoiceSession.recordOperation?.({ source: 'update',
      action: stage === 'read-runtime-version' ? 'host-version' : 'service.error', phase: 'finished', result: 'failed', error })
    try { ctx.logger?.warn?.(`Fish Voice ${stage}`, error) } catch {}
  }
  const updates = createVoiceUpdateService({
    currentVersion: manifest.version,
    getManager: () => ctx.get?.('pluginManager'),
    hasHmr: () => ctx.get?.('hmr') !== undefined,
    async readDsh() {
      try {
        const boot = await hostImport('@deepseek-ai/dsh-app-boot')
        return { dshVersion: boot.getDshRuntimeVersion(), evaluateDsh: boot.evaluatePluginCompatibility }
      } catch (error) {
        logUpdateError('read-runtime-version', error)
        return {}
      }
    },
    async beforeInstall() {
      const status = await ctx.whaleVoiceSession.status(ownerSettings)
      if (status.ttsRuntime?.blocked) return '上次朗读尚未确认停止。请完整重启 DSH 后再安装更新。'
      if (status.enabled || status.voiceControlBusy || status.voiceSession?.fullyStopped !== true || status.ttsRuntime?.busy) {
        return '请先结束正在进行的语音会话或朗读，再安装更新。已保存的语音历史会继续保留。'
      }
    },
    onHostError: logUpdateError,
  })
  ctx.effect(() => {
    let operationId
    const off = updates.subscribe(() => {
      const { status } = updates.read()
      const started = ['checking', 'installing'].includes(status)
      if (started || !operationId) operationId = randomUUID()
      ctx.whaleVoiceSession.recordOperation?.({
        source: 'update', action: ['checking','installing','available','current','up-to-date','error','unsupported','incompatible','installed','restart-required','enable-required'].includes(status)
          ? 'status.' + status : 'status.changed',
        phase: 'changed', result: status === 'error' ? 'failed' : started ? 'accepted' : 'ok', operationId,
      })
    })
    updates.start()
    return () => { lifetime.abort(); off(); updates.dispose() }
  }, 'whale-conversation-stream-lifetime')
  class ConversationRemote extends protocol.TypertRemoteService {
    constructor(ctx) { super(ctx, 'whaleConversation') }
    caller(sessionId, signal) {
      signal?.throwIfAborted()
      this.owner(signal)
      if (typeof sessionId !== 'string' || !sessionId || sessionId.length > 256) throw scopeError('VOICE_CALLER_SESSION_INVALID', '无效会话')
      const agent = this.ctx.agents.get(sessionId)
      if (!agent || agent.session?.id !== sessionId) throw scopeError('VOICE_CALLER_SESSION_LOST', '操作来源会话已失效')
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
          if (this.settingsCaller(sessionId, signal) !== agent) throw replaced()
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
        try { if (this.settingsCaller(sessionId, combined) !== agent) throw replaced() }
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
    async *followUpdates(signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      this.owner(combined)
      let pending = true, wake
      const changed = () => { pending = true; wake?.(); wake = undefined }
      const off = updates.subscribe(changed)
      combined.addEventListener('abort', changed, { once: true })
      try {
        while (!combined.aborted) {
          if (!pending) await new Promise(resolve => { wake = resolve; if (combined.aborted) resolve() })
          if (combined.aborted) break
          this.owner(combined)
          pending = false
          yield updates.read()
        }
      } finally { off(); combined.removeEventListener('abort', changed) }
    }
    async updateAction(request, signal) {
      this.owner(signal)
      if (request.action === 'install') {
        // Send an acceptance before HMR can unload this Remote. The stream carries
        // the outcome and the manager keeps running if this client disconnects.
        void updates.install(request.version)
        return updates.read()
      }
      const result = await updates.check()
      this.owner(signal)
      return result
    }
    async action(sessionId, request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      const agent = this.settingsCaller(sessionId, combined)
      if (agent === ownerSettings && !ownerSettingsActions.has(request.action)) throw scopeError('VOICE_CALLER_SESSION_REQUIRED', '此操作需要打开一个 DSH 对话')
      const retiresCaller = agent !== ownerSettings && request.action === 'disable'
        && this.ctx.whaleVoiceSession.status(agent).voiceSession?.id === sessionId
      try {
        const result = await dispatchUiAction(this.ctx.whaleVoiceSession, agent, request, combined, true, false)
        // Closing the visible voice root intentionally retires that exact Agent.
        // The owner principal still owns the status receipt, not a replacement.
        if (retiresCaller && this.ctx.agents.get(sessionId) === undefined) {
          this.owner(combined)
          return JSON.stringify(result)
        }
        // Do not return private data to a session replaced while awaiting a write/read.
        if (this.settingsCaller(sessionId, combined) !== agent) throw replaced()
        return JSON.stringify(result)
      } catch (error) {
        this.owner(combined)
        throw displayError(error)
      }
    }
    owner(signal) {
      signal?.throwIfAborted();lifetime.signal.throwIfAborted()
      if(this.ctx.invocation?.peer?.principal?.kind!=='owner')
        throw Object.assign(new Error('只允许宿主所有者管理鱼应设置'), { code: 'VOICE_OWNER_REQUIRED' })
    }
    readAuthorization(signal){this.owner(signal);return this.ctx.whaleVoiceSession.readAuthorization()}
    async saveAuthorization(request,signal){
      const combined=signal?AbortSignal.any([signal,lifetime.signal]):lifetime.signal
      this.owner(combined)
      const value=await this.ctx.whaleVoiceSession.saveAuthorization(request,combined)
      this.owner(combined);return value
    }
    async senseVoiceAsrAction(request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      this.owner(combined)
      const result = await this.ctx.whaleVoiceSession.senseVoiceAsrAction(request, combined)
      this.owner(combined)
      return result
    }
    async manageSessions(sessionId, request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      const agent = this.settingsCaller(sessionId, combined)
      const result = await this.ctx.whaleVoiceSession.manageSessions(agent, request, combined)
      if (this.settingsCaller(sessionId, combined) !== agent) throw replaced()
      return JSON.stringify(result)
    }
    async listExistingVoiceSessions(request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      this.owner(combined)
      const result = await this.ctx.whaleVoiceSession.listExistingVoiceSessions(request, ownerSettings, combined)
      this.owner(combined)
      return result
    }
    async retryVoiceTranscript(request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      this.owner(combined)
      const result = await this.ctx.whaleVoiceSession.retryVoiceTranscript(request, ownerSettings, combined)
      this.owner(combined)
      return result
    }
    async setExistingVoiceSession(request, signal) {
      const combined = signal ? AbortSignal.any([signal, lifetime.signal]) : lifetime.signal
      this.owner(combined)
      try {
        const result = await this.ctx.whaleVoiceSession.setExistingVoiceSession(request, ownerSettings, combined)
        this.owner(combined)
        return result
      } catch (error) {
        this.owner(combined)
        throw displayError(error)
      }
    }
    readClientOperationScope(signal) {
      this.owner(signal)
      return this.ctx.whaleVoiceSession.readClientOperationScope(ownerSettings)
    }
    async recordClientOperations(request, signal) {
      this.owner(signal)
      const value = await this.ctx.whaleVoiceSession.recordClientOperations(request, ownerSettings)
      this.owner(signal)
      return value
    }
    async readOperationLog(request, signal) {
      this.owner(signal)
      const value = await this.ctx.whaleVoiceSession.readOperationLog(request, ownerSettings)
      this.owner(signal)
      return value
    }
    async readSetup(signal) {
      this.owner(signal)
      try {
        const { onboarding } = this.ctx.whaleVoiceSession.readSettings()
        return { version: onboarding.version, completed: onboarding.completed }
      } catch (error) {
        this.owner(signal)
        throw displayError(error)
      }
    }
    readVolume(sessionId, signal) { return this.ctx.whaleVoiceSession.readOutputVolume(this.settingsCaller(sessionId, signal)) }
    setVolume(sessionId, request, signal) { return this.ctx.whaleVoiceSession.setOutputVolume(request, this.settingsCaller(sessionId, signal), signal) }
  }
  const remoteActions = {
    action: (sessionId, request) => [uiOperationName(request), sessionId ?? request?.id],
    readAuthorization: () => ['authorization.read'],
    saveAuthorization: request => [request?.grant ? 'authorization.grant' : 'authorization.revoke'],
    senseVoiceAsrAction: request => [request?.operation === 'retry' ? 'asr.retry' : 'asr.status'],
    updateAction: request => [request?.action === 'install' ? 'update.install' : 'update.check'],
    manageSessions: (sessionId, request) => [
      `session.${['list','detail','unhide','restore'].includes(request?.operation) ? request.operation : 'manage'}`,
      request?.sessionId ?? request?.rootSessionId ?? sessionId,
    ],
    retryVoiceTranscript: () => ['voice.retry'],
    listExistingVoiceSessions: () => ['sessions.existing.list'],
    setExistingVoiceSession: request => [request?.sessionId === null ? 'session.unbind' : 'session.bind', request?.sessionId ?? request?.expectedSessionId],
    readSetup: () => ['setup.read'], readVolume: id => ['volume.read', id], setVolume: id => ['volume.set', id],
  }
  for (const [method, describe] of Object.entries(remoteActions)) {
    const invoke = ConversationRemote.prototype[method]
    ConversationRemote.prototype[method] = function (...args) {
      const api = this.ctx.whaleVoiceSession
      const perform = () => invoke.apply(this, args)
      if (typeof api?.trackOperation !== 'function') return perform()
      const [action, subjectId] = describe(...args)
      return api.trackOperation('owner', action, perform, {
        subjectId, classify: value => method === 'retryVoiceTranscript' ? (value?.accepted ? 'accepted' : 'cancelled')
            : value?.status === 'error' || value?.state === 'error' ? 'failed'
          : value?.status === 'installing' ? 'accepted' : undefined,
      })
    }
  }
  const streams = { follow: 'conversation', followModels: 'models', followPresentation: 'presentation', followUpdates: 'updates' }
  for (const [method, name] of Object.entries(streams)) {
    const follow = ConversationRemote.prototype[method]
    ConversationRemote.prototype[method] = async function* (...args) {
      const action = 'connection.' + name
      const record = this.ctx.whaleVoiceSession?.recordOperation
      const operationId = randomUUID(), signal = args.at(-1)
      const subjectId = ['follow', 'followModels'].includes(method) ? args[0] : undefined
      let result = 'cancelled', error
      record?.({ source: 'owner', action, phase: 'requested', operationId, subjectId })
      try {
        yield* follow.apply(this, args)
        if (!signal?.aborted && !lifetime.signal.aborted) result = 'ok'
      } catch (failure) {
        error = failure
        result = failure?.name === 'AbortError' ? 'cancelled' : failure?.code === 'VOICE_OWNER_REQUIRED' ? 'denied' : 'failed'
        throw failure
      } finally { record?.({ source: 'owner', action, phase: 'finished', result, error, operationId, subjectId }) }
    }
  }
  ctx.plugin(ConversationRemote)
  ctx.effect(() => ctx.typert.register({ package: conversationRemote.package, face: 'host', schemas: [],
    invocations: conversationRemote.descriptors, model: { services: [], events: [], objects: [] } }))
}
