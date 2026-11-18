/** In-memory caption projection for the current voice grant. Never claims acoustic playback. */
export function createVoiceConversation({ getScope, getAgent, assertCaller, getWakeState, getHelperState, getRetryTranscripts, now = Date.now }) {
  let key = null, rows = [], revision = 0, historyGeneration = 0, inputActive = false, inputError = null, providerError = null
  const disabledWake = () => ({ state: 'disabled', deadlineAt: null, streamOpen: false, detection: 'asr-after-utterance' })
  const wakeFields = allowed => {
    if (typeof getWakeState !== 'function') return {}
    const value = allowed ? getWakeState() : null
    const state = ['disabled', 'starting', 'waiting', 'listening', 'paused', 'error'].includes(value?.state) ? value.state : 'disabled'
    const streamOpen = value?.streamOpen === true
    const effective = ['waiting', 'listening'].includes(state) && !streamOpen ? 'starting' : state
    return { wake: { ...disabledWake(), state: effective, detection: value?.detection === 'acoustic-after-utterance' ? value.detection : 'asr-after-utterance',
      streamOpen, deadlineAt: effective === 'listening' && Number.isFinite(value?.deadlineAt) ? value.deadlineAt : null } }
  }
  const helperFields = allowed => {
    if (typeof getHelperState !== 'function') return {}
    const value = allowed ? getHelperState() : null
    const online = value?.online === true
    return { helper: { online, listenMode: online && ['ptt', 'always', 'wake'].includes(value?.listenMode) ? value.listenMode : null } }
  }
  // Native execution tokens are non-registered Symbols. Keep identity while the
  // host retains it, without retaining old executions or evicting a live token
  // merely because the 40-row caption window has rolled over.
  let speechCalls = new WeakMap()
  const speechToken = exec => {
    const token = exec?.token ?? exec
    return token !== null && (typeof token === 'object' || typeof token === 'function'
      || typeof token === 'symbol' && Symbol.keyFor(token) === undefined) ? token : undefined
  }
  let speechSequence = 0
  const listeners = new Set()
  let timer
  const stopTimer = () => { if (!listeners.size) { clearInterval(timer); timer = undefined } }
  const scope = () => {
    const s = getScope()
    const next = s?.enabled && s.rootSessionId && s.ownerSessionId && s.epoch
      ? JSON.stringify([s.rootSessionId, s.ownerSessionId, s.epoch]) : null
    if (key !== next) { key = next; rows = []; historyGeneration++; speechCalls = new WeakMap(); inputActive = false; inputError = null; providerError = null; revision++ }
    return next ? s : null
  }
  function read(agent, human = false) {
    assertCaller(agent)
    const s = scope(), id = human ? null : agent.session.id
    const allowed = s && (human || !s.humanOnly && [s.rootSessionId, s.ownerSessionId].includes(id))
    const items = allowed ? rows.map(row => ({ ...row })) : []
    const retries = allowed && human && s.humanOnly ? getRetryTranscripts?.(agent) : null
    return { revision, historyGeneration, rootSessionId: allowed ? s.rootSessionId : null, title: null,
      latest: items.filter(row => row.role === 'assistant').at(-1) ?? null, items, inputActive: Boolean(allowed && inputActive === true), inputError: allowed ? inputError : null, playbackConfirmed: false,
      ...(allowed && human && providerError ? { providerError } : {}), ...(retries ? { retryTranscripts: retries } : {}), ...wakeFields(allowed), ...helperFields(allowed) }
  }
  function notify() {
    scope()
    for (const listener of listeners) {
      try { listener.send(read(listener.agent, listener.human)) } catch {
        try { listener.send({ revision, rootSessionId: null, title: null, latest: null, items: [], inputActive: false, inputError: null, playbackConfirmed: false, ...wakeFields(false), ...helperFields(false) }) } catch {}
        listeners.delete(listener); stopTimer()
      }
    }
  }
  function append(role, text, state, id) {
    if (typeof text !== 'string' || !text.trim()) return
    if (rows.some(row => row.id === id)) return
    rows.push({ id, role, text: text.trim().slice(0, 8000), state, at: now() })
    rows = rows.slice(-40)
    revision++; notify()
  }
  function subscribe(agent, send, human = false) {
      if (typeof send !== 'function') throw new Error('订阅回调无效')
      const initial = read(agent, human), entry = { agent, send, human }
      listeners.add(entry)
      if (!timer) {
        // Host-side permission liveness only. No command, history fetch, or
        // model invocation; shared by all streams and removed at last detach.
        timer = setInterval(() => {
          try {
            const before = key
            scope()
            if (before !== key || [...listeners].some(item => item.agent.session && getAgent(item.agent.session.id) !== item.agent)) notify()
          } catch {
            rows = []; historyGeneration++; speechCalls = new WeakMap(); inputActive = false; inputError = null; providerError = null; key = null; revision++
            for (const item of listeners) {
              try { item.send({ revision, rootSessionId: null, title: null, latest: null, items: [], inputActive: false, inputError: null, playbackConfirmed: false, ...wakeFields(false), ...helperFields(false) }) } catch {}
            }
          }
        }, 1000)
        timer.unref?.()
      }
      try { send(initial) } catch (error) { listeners.delete(entry); stopTimer(); throw error }
      return () => { listeners.delete(entry); stopTimer() }
  }
  return {
    read: agent => read(agent),
    subscribe: (agent, send) => subscribe(agent, send),
    // Kept separate from the model-facing projection by the owner UI adapter.
    readForHuman: agent => read(agent, true),
    subscribeForHuman: (agent, send) => subscribe(agent, send, true),
    invalidate() {
      // Never read configuration inside an authorization transaction. Drop the
      // previous projection synchronously; a later authorized event/read can
      // establish the next generation.
      key = null; rows = []; historyGeneration++; speechCalls = new WeakMap(); inputActive = false; inputError = null; providerError = null; revision++
      for (const listener of listeners) {
        try { assertCaller(listener.agent); listener.send({ revision, rootSessionId: null, title: null, latest: null, items: [], inputActive: false, inputError: null, playbackConfirmed: false, ...wakeFields(false), ...helperFields(false) }) }
        catch { listeners.delete(listener); stopTimer() }
      }
    },
    refreshWakeState() { revision++; notify() },
    refreshHelperState() { revision++; notify() },
    refreshRetryTranscripts() { revision++; notify() },
    setInputActive(value) {
      const s = scope()
      const active = Boolean(s && value === true)
      if (active !== inputActive) { inputActive = active; revision++; notify() }
    },
    setInputError(code) {
      const value = scope() && ['device', 'recognition', 'no-speech'].includes(code) ? code : null
      if (inputError !== value) { inputError = value; revision++; notify() }
    },
    setProviderError(message) {
      const value = scope() && typeof message === 'string' ? message.slice(0, 480) : null
      if (providerError !== value) { providerError = value; revision++; notify() }
    },
    observe() {},
    boundReply(text, grant, id, state) {
      const s = scope()
      if (!s?.humanOnly || grant?.ownerSessionId !== s.ownerSessionId || grant?.epoch !== s.epoch || grant?.rootSessionId !== s.rootSessionId) return
      const row = rows.find(item => item.id === id && item.role === 'assistant')
      if (!row) append('assistant', text, state, id)
      else if (row.state !== state) { row.state = state; revision++; notify() }
    },
    requestSpeech(exec) {
      const s = scope(), agent = exec?.agent
      if (!s || s.humanOnly || !['speak', 'whale_voice_speak'].includes(exec?.name) || exec.signal?.aborted
        || agent?.session?.id !== s.rootSessionId || getAgent(s.rootSessionId) !== agent) return
      const text = exec.arguments?.text
      if (typeof text !== 'string' || !text.trim() || text.length > 8000) return
      const token = speechToken(exec)
      if (token === undefined || speechCalls.has(token)) return
      const entry = { scope: key, agent, id: typeof exec.callId === 'string' && exec.callId.length <= 240 ? `tool:${exec.callId}` : `speech:${++speechSequence}` }
      speechCalls.set(token, entry)
      append('assistant', text, 'speech-requested', entry.id)
    },
    recordSpeechCancellation(exec) {
      const s = scope(), entry = speechCalls.get(speechToken(exec))
      if (!entry || !s || exec.name !== 'whale_voice_speak' || entry.scope !== key
        || entry.agent !== exec.agent || getAgent(s.rootSessionId) !== entry.agent) return
      // Only the built-in runtime's trusted catch calls this. Internal TTS
      // cancellation does not abort the host's caller-owned signal.
      entry.cancelled = true
    },
    finishSpeech(exec, result) {
      const s = scope(), entry = speechCalls.get(speechToken(exec))
      if (!entry || !s || entry.scope !== key || entry.agent !== exec.agent
        || getAgent(s.rootSessionId) !== entry.agent) return
      // Native failures and the built-in tool's historical string error envelope
      // are both failures. Do not infer success from arbitrary provider output.
      const failed = result?.isError === true || exec.name === 'whale_voice_speak'
        && typeof result?.value === 'string' && result.value.startsWith('❌ whale_voice_speak 失败：')
      // Around-dispatch wrappers restore exec.signal before tools/result. Their
      // cancellation can therefore survive only in the host's canonical code.
      const interrupted = entry.cancelled === true || exec.signal?.aborted || result?.isError === true
        && ['ABORTED', 'ABORTED_BEFORE_DISPATCH'].includes(result.error?.info?.code)
      const state = interrupted ? 'interrupted' : failed ? 'speech-failed'
        : result?.isError === false ? 'reply' : 'speech-requested'
      const row = rows.find(row => row.id === entry.id)
      if (row && row.state !== state) { row.state = state; revision++; notify() }
    },
    input(text, grant, id) {
      const s = scope()
      if (!s || grant?.ownerSessionId !== s.ownerSessionId || grant?.epoch !== s.epoch || grant?.rootSessionId !== s.rootSessionId) return
      if (providerError) { providerError = null; revision++; notify() }
      append('user', text, 'delivered', id)
    },
    dispose() { rows = []; historyGeneration++; speechCalls = new WeakMap(); key = null; listeners.clear(); stopTimer() },
  }
}

/** Verified dsh-speak 1.8.4 Windows engine contract, not system or cue volume. */
export function createSpeakVolume({ getSettings, platform = process.platform }) {
  function descriptor() {
    const settings = getSettings()
    if (platform !== 'win32' || typeof settings?.describe !== 'function' || typeof settings?.mutate !== 'function') return null
    const rows = settings.describe({ redactSecrets: true })
    if (!Array.isArray(rows)) return null
    const row = rows.find(row => row.ns === 'dsh-speak')
    // Fail closed for missing, renamed or incompatible plugin configuration.
    if (!row || row.applies !== 'live' || !Number.isSafeInteger(row.revision)
      || !Number.isInteger(row.value?.volume) || row.value.volume < 0 || row.value.volume > 100
      || typeof row.value?.queueAllMessages !== 'boolean' || typeof row.value?.cleanMarkdownFormatting !== 'boolean') return null
    return row
  }
  return {
    read() {
      const row = descriptor()
      return row ? { supported: true, backend: 'dsh-speak', volume: row.value.volume / 100, revision: row.revision, apply: 'next-output', reason: null }
        : { supported: false, backend: null, volume: null, revision: null, apply: null, reason: 'verified-windows-dsh-speak-volume-unavailable' }
    },
    async set(request, signal) {
      if (!request || Object.keys(request).some(key => !['revision', 'volume'].includes(key)) || !Number.isSafeInteger(request.revision)
        || typeof request.volume !== 'number' || !Number.isFinite(request.volume) || request.volume < 0 || request.volume > 1) throw new Error('助手音量请求无效')
      signal?.throwIfAborted()
      const row = descriptor()
      if (!row) throw new Error('当前语音后端不支持已核实的独立音量接口')
      if (row.revision !== request.revision) throw new Error('助手音量配置已改变，请重新读取')
      await getSettings().mutate('dsh-speak', [{ op: 'set', path: ['volume'], value: Math.round(request.volume * 100) }], row.revision)
      return this.read()
    },
  }
}


/** Native model-step output admission. Caller signals and other tools stay untouched. */
export function createVoiceSpeechFence() {
  let generation = 0, turn = null, step = null
  const batches = new WeakMap(), inputs = new Map()
  const object = value => value !== null && typeof value === 'object'
  const speechTool = name => name === 'whale_voice_speak' || name === 'speak'
  return {
    rememberInput(id, voice = false) {
      if (inputs.has(id)) return // a previously queued input keeps its original generation
      inputs.set(id, { generation, voice })
    },
    forgetInput(id) { inputs.delete(id) },
    beginStep({ turn: turnId, step: stepId, messages = [], reminder = false, mute = false }) {
      if (!Number.isSafeInteger(turnId) || !Number.isSafeInteger(stepId)) return
      // A genuine new user input can be steered into the SAME native turn.
      // Worker feedback and an automatic retry step cannot reopen old output.
      let inputGeneration
      const voiceInputs = new Map()
      const newTurn = turn?.id !== turnId
      if (newTurn) turn = { id: turnId, generation, voiceGeneration: null, typed: false, reminder: false, explicitSpeech: false, finished: false }
      for (const message of messages) {
        const value = inputs.get(message?.id)
        if (value) {
          inputGeneration = Math.max(inputGeneration ?? value.generation, value.generation)
          if (value.voice) voiceInputs.set(message.id, value.generation)
        }
        if (message?.role === 'user' && message.source?.kind === 'user') turn.typed = true
        inputs.delete(message?.id)
      }
      // If a new turn claims an already-cancelled input, preserve that stamp.
      if (newTurn) turn.generation = inputGeneration ?? generation
      else if (inputGeneration !== undefined) turn.generation = Math.max(turn.generation, inputGeneration)
      if (reminder) turn.reminder = true
      if (mute || inputGeneration !== undefined) turn.reminderMuted = mute
      step = { turn: turnId, step: stepId, generation: turn.reminderMuted ? null : turn.generation, voiceInputs }
    },
    observeTurn({ type, surfaceOp, data } = {}) {
      if (!turn || turn.finished) return
      if (type === 'user/message') {
        const stamp = step?.voiceInputs.get(data?.id)
        if (stamp !== undefined && step.step === turn.modelStep && surfaceOp === 'append' && data.role === 'user' && data.source?.kind === 'whale-ear')
          turn.voiceGeneration = Math.max(turn.voiceGeneration ?? stamp, stamp)
        return
      }
      if (turn.id !== data?.turn) return
      if (type === 'step/start' && step?.step === data.step) {
        turn.modelStep = data.step
        turn.visibleReply = false
      }
      if (type === 'tool/call' && speechTool(data.name)) turn.explicitSpeech = true
      if (type === 'assistant/message' && turn.modelStep === data.step) {
        const message = data.message
        const content = Array.isArray(message?.content) ? message.content : []
        if (content.some(part => part?.type === 'tool-call' && speechTool(part.name))) turn.explicitSpeech = true
        turn.visibleReply = surfaceOp === 'append' && data.interrupted !== true && message?.role === 'assistant'
          && !content.some(part => part?.type === 'tool-call')
          && content.some(part => part?.type === 'text' && typeof part.text === 'string' && Boolean(part.text.trim()))
      }
      if (type === 'turn/end') {
        turn.finished = true
        if (data.reason?.kind === 'completed' && turn.visibleReply && turn.voiceGeneration === generation
          && !turn.typed && !turn.reminder && !turn.explicitSpeech) return { turn: turn.id, generation }
      }
    },
    isTurnCurrent(value) { return value.turn === turn?.id && value.generation === generation },
    enterBatch(input) {
      if (!object(input?.toolSet) || batches.has(input.toolSet)) return
      // log belongs to ToolBatchInput, not ToolExecution. Bind its verified
      // pre-step stamp to the exact toolSet shared by every call in this batch.
      const stamp = input.log === undefined ? generation
        : step?.turn === input.log.turn && step?.step === input.log.step ? step.generation : null
      if (turn && input.log?.turn === turn.id && input.calls?.some(call => speechTool(call.name))) turn.explicitSpeech = true
      const onlySpeech = input.calls?.length === 1 && input.calls[0].name === 'whale_voice_speak'
      batches.set(input.toolSet, { agent: input.agent, generation: stamp, onlySpeech })
    },
    cancel() { generation++ },
    isOnlySpeech(exec) {
      const batch = object(exec?.toolSet) ? batches.get(exec.toolSet) : null
      return batch?.agent === exec?.agent && batch?.generation === generation && batch.onlySpeech === true
    },
    assertCurrent(exec) {
      // Direct calls outside a model step are independent explicit requests.
      if (exec?.toolSet === undefined) return
      const batch = object(exec.toolSet) ? batches.get(exec.toolSet) : null
      if (!batch || batch.agent !== exec.agent || batch.generation === null) {
        throw Object.assign(new Error('无法确认本次朗读所属的模型步骤'), { code: 'TTS_OUTPUT_SCOPE_UNVERIFIED' })
      }
      if (batch.generation !== generation) throw Object.assign(new Error('朗读已取消'), { code: 'TTS_CANCELLED' })
    },
  }
}
