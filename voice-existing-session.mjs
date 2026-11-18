import { createHash, randomUUID } from 'node:crypto'
import { readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { isAbsolute, join } from 'node:path'

export const EXISTING_VOICE_PLATFORM = 'whale-ear-local-voice'
const PAGE_SIZE = 40
const RETRY_LIMIT = 8
const RETRY_PREVIEW_LENGTH = 8000
const BOUND_EVENTS = new Set(['agent/inbox/spliced', 'turn/start', 'user/message', 'assistant/message', 'turn/end'])
const fault = (code, message) => Object.assign(new Error(message), { code })
const unavailable = () => fault('VOICE_EXISTING_UNAVAILABLE', '绑定会话在当前 DSH 实例不可用。请核对会话所在实例和访问权限，或重新选择。')
const archived = () => fault('VOICE_EXISTING_ARCHIVED', '绑定会话已归档。请先在 DSH 恢复原会话。')
const busy = () => fault('VOICE_EXISTING_BUSY', '绑定会话正在处理其他输入。空闲后可手动发送保留的转写。')
const unconfirmed = () => fault('VOICE_EXISTING_SEND_UNCONFIRMED', '发送结果未确认。请打开原会话核对这条转写。')
const validId = id => typeof id === 'string' && id.length > 0 && id.length <= 256 && id.isWellFormed() && !/[\u0000-\u001f\u007f]/u.test(id)
const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const identityOf = header => digest([header.id, header.createdAt, header.origin, header.parentSession])
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const textOf = message => Array.isArray(message?.content)
  ? message.content.filter(block => block?.type === 'text' && typeof block.text === 'string').map(block => block.text).join('\n').trim()
  : ''

export function* splitBoundReply(text) {
  const limit = 4000
  let chunk = ''
  for (const { segment } of new Intl.Segmenter(undefined, { granularity: 'sentence' }).segment(text)) {
    if (chunk.length + segment.length <= limit) {
      chunk += segment
      continue
    }
    if (chunk.trim()) yield chunk.trim()
    chunk = ''
    for (const character of segment) {
      if (chunk.length + character.length > limit) {
        if (chunk.trim()) yield chunk.trim()
        chunk = ''
      }
      chunk += character
    }
  }
  if (chunk.trim()) yield chunk.trim()
}

/** Only the profile-local selection is persisted. DSH owns every conversation event. */
function readSelection(path) {
  try {
    const raw = readFileSync(path, 'utf8')
    const value = JSON.parse(raw)
    const selection = value?.selection
    if (value?.version !== 1 || selection !== null && !(validId(selection?.sessionId)
      && /^[a-f0-9]{64}$/.test(selection.identity))) throw new Error('invalid binding')
    return { raw, selection }
  } catch (error) {
    if (error.code === 'ENOENT') return { raw: null, selection: null }
    throw fault('VOICE_EXISTING_BINDING_UNREADABLE', '绑定记录无法读取。请检查当前 DSH 配置目录中的鱼应绑定记录。')
  }
}
function writeSelection(path, previous, selection) {
  const next = JSON.stringify({ version: 1, selection }) + '\n'
  const temp = path + '.' + randomUUID() + '.tmp'
  try {
    writeFileSync(temp, next, { encoding: 'utf8', flag: 'wx', mode: 0o600, flush: true })
    if (readSelection(path).raw !== previous.raw) throw fault('VOICE_EXISTING_BINDING_CHANGED', '原会话绑定已变化，请刷新后再选择。')
    renameSync(temp, path)
  } finally {
    try { unlinkSync(temp) } catch (error) { if (error.code !== 'ENOENT') throw error }
  }
  if (readSelection(path).raw !== next) throw fault('VOICE_EXISTING_BINDING_UNCONFIRMED', '原会话绑定写入结果未确认，请重新打开鱼应设置核对。')
}

export function createExistingVoiceSessions(ctx, {
  getService, managedRootIds, assertMicrophone, isGrantCurrent, canSendNow = () => true,
  onInput, onReply, onError, onInvalidGrant, onActivity = () => {}, onRetained = () => {}, play, log = () => {},
}) {
  let active = null
  let disposed = false
  let timer
  let bindingRefresh
  const lifetime = new AbortController()
  const summaries = new Map()
  const controller = () => getService('sessionController')
  const agents = () => getService('agents')
  const archives = () => {
    const ids = getService('workspaceRegistry')?.archivedSessionIds
    if (!Array.isArray(ids)) throw unavailable()
    return ids
  }
  function selectionPath() {
    const directory = getService('profileContext')?.dir ?? getService('pluginManager')?.profile?.dir
    return typeof directory === 'string' && isAbsolute(directory) ? join(directory, 'whale-existing-voice.json') : null
  }
  function supported() {
    try {
      return Boolean(!disposed && selectionPath() && typeof controller()?.list === 'function'
        && typeof controller()?.resolveAgent === 'function' && typeof ctx.on === 'function'
        && typeof getService('sessionQuery')?.observeSession === 'function'
        && typeof getService('remoteAccess')?.allows === 'function'
        && typeof getService('sessions')?.get === 'function' && archives())
    } catch { return false }
  }
  function selectionDocument() {
    const path = selectionPath()
    return path ? readSelection(path) : { raw: null, selection: null }
  }
  const allowed = id => getService('remoteAccess')?.allows?.({ kind: 'session', id }) === true
  function nativeAccess(id) {
    if (!allowed(id)) throw unavailable()
    if (archives().includes(id)) throw archived()
  }
  const isBusy = agent => agent.status !== 'idle' || agent.inbox?.hasPending !== false
  function assertModel(agent) {
    const model = agent.model?.current?.()
    if (!model?.provider || !model.model)
      throw fault('VOICE_EXISTING_MODEL_REQUIRED', '请先在 DSH 为原会话选择可用的模型。')
  }
  function publicRow(row, state) {
    const title = row.projections?.values?.title
    return {
      sessionId: row.sessionId,
      title: typeof title === 'string' && title.trim() ? title.trim().slice(0, 256).toWellFormed() : null,
      availability: state,
      updatedAt: Number.isSafeInteger(row.updatedAt) && row.updatedAt >= 0 && row.updatedAt <= 8.64e15 ? row.updatedAt : null,
    }
  }
  function availability(row, archivedIds) {
    if (archivedIds.includes(row.sessionId)) return 'archived'
    const agent = agents()?.get(row.sessionId)
    return row.running || agent && isBusy(agent) ? 'busy' : 'ready'
  }
  function binding() {
    let chosen
    try {
      chosen = selectionDocument().selection
      if (!chosen) return null
      const base = summaries.get(chosen.sessionId) ?? { sessionId: chosen.sessionId, title: null, updatedAt: null }
      if (!supported() || !allowed(chosen.sessionId)) return { ...base, title: null, availability: 'unavailable' }
      if (!summaries.has(chosen.sessionId)) warmBinding(chosen)
      const current = active?.selection.sessionId === chosen.sessionId ? active : null
      const live = agents()?.get(chosen.sessionId)
      const missing = live
        ? current && live !== current.agent || !isOrdinaryHeader(live.session.header, chosen.sessionId) || identityOf(live.session.header) !== chosen.identity
        : current || !base.availability
      const state = archives().includes(chosen.sessionId) ? 'archived'
        : missing ? 'unavailable'
        : live && isBusy(live) ? 'busy' : 'ready'
      return { ...base, availability: state }
    } catch {
      return chosen ? { sessionId: chosen.sessionId, title: null, availability: 'unavailable' } : null
    }
  }
  function warmBinding(selection) {
    const identity = selection.identity
    if (bindingRefresh?.identity === identity && Date.now() < bindingRefresh.retryAt) return
    const entry = bindingRefresh = { identity, retryAt: Infinity }
    void inventory(lifetime.signal).then(async rows => {
      const row = rows.find(item => item.sessionId === selection.sessionId)
      if (!row || await nativeIdentity(row.sessionId, lifetime.signal) !== identity
        || bindingRefresh !== entry || selectionDocument().selection?.identity !== identity) return
      summaries.set(row.sessionId, row)
    }).catch(() => {}).finally(() => { entry.retryAt = Date.now() + 15_000 })
  }
  function hostReady(signal) {
    signal?.throwIfAborted()
    if (!supported()) throw fault('VOICE_EXISTING_HOST_UNSUPPORTED', '当前 DSH 宿主未提供可校验的普通会话入口。')
  }
  function isOrdinaryHeader(header, id) {
    return header?.id === id && Number.isSafeInteger(header.createdAt) && header.origin !== 'subagent'
      && getService('workspaceRegistry')?.sessionPresentation?.get?.(id)?.purpose !== 'voice'
  }
  async function inventory(signal) {
    hostReady(signal)
    const excluded = await managedRootIds(signal)
    const native = await controller().list({}, signal)
    hostReady(signal)
    const archivedIds = archives()
    return native.items.flatMap(row => {
      const id = row?.sessionId
      if (!validId(id) || excluded.has(id) || row.origin === 'subagent'
        || !allowed(id) || getService('workspaceRegistry')?.sessionPresentation?.get?.(id)?.purpose === 'voice') return []
      return [publicRow(row, availability(row, archivedIds))]
    })
  }
  async function nativeIdentity(sessionId, signal) {
    const attached = getService('sessions').get(sessionId)
    if (attached && isOrdinaryHeader(attached.header, sessionId)) return identityOf(attached.header)
    let observation
    try {
      observation = await getService('sessionQuery').observeSession(sessionId, { signal })
      signal?.throwIfAborted()
      if (!isOrdinaryHeader(observation?.header, sessionId)) throw unavailable()
      return identityOf(observation.header)
    } catch {
      signal?.throwIfAborted()
      throw unavailable()
    } finally {
      observation?.[Symbol.dispose]?.()
    }
  }

  function assertCurrent(grant) {
    if (disposed || active !== grant || !isGrantCurrent(grant.epoch)) throw unavailable()
    assertMicrophone()
    if (selectionPath() !== grant.path) throw unavailable()
    const chosen = selectionDocument().selection
    if (!chosen || chosen.sessionId !== grant.selection.sessionId || chosen.identity !== grant.selection.identity) throw unavailable()
    const id = chosen.sessionId
    nativeAccess(id)
    if (agents().get(id) !== grant.agent || getService('sessions').get(id) !== grant.agent.session
      || !isOrdinaryHeader(grant.agent.session.header, id) || identityOf(grant.agent.session.header) !== chosen.identity) throw unavailable()
  }
  function cancelSpeech(grant = active) {
    if (!grant) return
    grant.pending?.audio.abort()
    for (const output of grant.output) output.abort()
  }
  function close() {
    const grant = active
    active = null
    clearInterval(timer)
    timer = undefined
    cancelSpeech(grant)
    if (grant) {
      grant.pending = null
      grant.retries.clear()
    }
  }
  function retire(grant, error) {
    if (active !== grant) return
    close()
    onInvalidGrant(grant.epoch, error)
  }
  function watch(grant) {
    try { assertCurrent(grant) }
    catch (error) { retire(grant, error); return }
    refreshActivity(grant)
  }
  function incomplete(grant) {
    onError(grant, fault('VOICE_EXISTING_REPLY_INCOMPLETE', '原会话未完成可播报的回复，请在 DSH 查看当前状态。'))
  }

  const sendBlocked = grant => Boolean(grant.pending || grant.sending || grant.waitingForIdle || isBusy(grant.agent) || !canSendNow())
  function refreshActivity(grant, changed = false) {
    if (active !== grant) return
    const blocked = sendBlocked(grant)
    const changedAvailability = blocked !== grant.retryBlocked
    grant.retryBlocked = blocked
    if (changed || changedAvailability && grant.retries.size) onActivity(grant)
  }
  function retain(grant, item) {
    const isNew = !grant.retries.has(item.id)
    if (isNew && grant.retries.size >= RETRY_LIMIT) {
      onError(grant, fault('VOICE_EXISTING_RETRY_QUEUE_FULL', '待发转写已满，本句未保留。请先处理列表中的转写。'))
      return
    }
    grant.retries.set(item.id, item)
    if (isNew) onRetained(grant, item.captureTurnId)
    refreshActivity(grant, true)
  }
  function waitForNativeIdle(grant) {
    // Native maintenance leaves the public Agent status at idle.
    if (typeof grant.agent.whenIdle !== 'function') return
    grant.waitingForIdle = true
    const settled = () => {
      grant.waitingForIdle = false
      if (active === grant) watch(grant)
    }
    void grant.agent.whenIdle().then(settled, settled)
  }

  async function send(grant, item, isCurrentCapture, signal) {
    const { agent } = grant
    const saved = grant.retries.has(item.id)
    grant.sending = item.id
    refreshActivity(grant, saved)
    const message = {
      role: 'user', id: item.id, content: [{ type: 'text', text: item.text }],
      source: { kind: 'user', platform: EXISTING_VOICE_PLATFORM },
    }
    let entered = false, admitted = false, keep = false, pending
    try {
      await agent.runMaintenance(nativeSignal => {
        entered = true
        assertCurrent(grant)
        if (!isCurrentCapture()) return
        signal?.throwIfAborted()
        nativeSignal?.throwIfAborted()
        if (agent.inbox.hasPending !== false || !canSendNow()) throw busy()
        assertModel(agent)
        pending = { id: item.id, turn: null, queued: false, mixed: false, audio: new AbortController(), recorded: false, reply: null }
        grant.pending = pending
        agent.followup(message)
        admitted = true
      })
    } catch (error) {
      // A synchronous native observer can throw after the inbox write.
      if (!admitted && pending) {
        admitted = pending.queued || pending.recorded
        if (!admitted) {
          try { admitted = agent.inbox.nextTurn.some(message => message.id === item.id) } catch {}
        }
      }
      if (active !== grant || admitted) return admitted
      try { assertCurrent(grant) } catch (failure) { retire(grant, failure); return false }
      if (pending) {
        grant.pending = null
        item.uncertain = true
        keep = true
        onError(grant, unconfirmed())
      } else if (!entered || error?.code === 'VOICE_EXISTING_BUSY') {
        if (!entered) waitForNativeIdle(grant)
        keep = isCurrentCapture() && !signal?.aborted
      } else if (!signal?.aborted && isCurrentCapture()) {
        onError(grant, error?.code === 'VOICE_EXISTING_MODEL_REQUIRED' ? error : unavailable())
      }
    } finally {
      if (admitted) grant.retries.delete(item.id)
      grant.sending = null
      if (active === grant && keep) retain(grant, item)
      else refreshActivity(grant, saved)
    }
    return admitted
  }

  const offStatus = ctx.on?.('agent/status', event => {
    const grant = active
    if (grant && event?.agent === grant.agent && grant.retries.size) watch(grant)
  })

  const offEvent = ctx.on?.('session/event', (session, event) => {
    const grant = active
    const pending = grant?.pending
    if (!pending || grant.agent.session !== session || !BOUND_EVENTS.has(event?.type)) return
    try { assertCurrent(grant) } catch (error) { retire(grant, error); return }
    const data = event?.data
    if (event?.type === 'agent/inbox/spliced' && data?.target === 'next-turn') {
      if (data.inserted?.some(message => message.id === pending.id)) pending.queued = true
      else if (pending.queued && pending.turn === null && data.removedCount > 0
        && !grant.agent.inbox.nextTurn.some(message => message.id === pending.id)) {
        grant.pending = null
        refreshActivity(grant)
        if (!pending.audio.signal.aborted) incomplete(grant)
      }
      return
    }
    if (event?.type === 'turn/start' && Number.isSafeInteger(data?.turn) && !pending.recorded) {
      pending.turn = data.turn
      pending.mixed = false
      return
    }
    if (pending.turn === null) return
    if (event?.type === 'user/message' && event.surfaceOp === 'append' && data?.source?.kind === 'user') {
      if (data.id !== pending.id) pending.mixed = true
      else if (data.source.platform === EXISTING_VOICE_PLATFORM && !pending.recorded) {
        pending.recorded = true
        onInput(grant, textOf(data), pending.id)
      }
      return
    }
    if (pending.turn !== data?.turn) return
    if (event.type === 'assistant/message' && event.surfaceOp === 'append' && pending.recorded) {
      pending.reply = data.interrupted === true || data.message?.content?.some(block => block?.type === 'tool-call')
        ? null : { id: data.message?.id, text: textOf(data.message) }
    }
    if (event.type === 'turn/end') {
      if (!pending.recorded && grant.agent.inbox.nextTurn.some(message => message.id === pending.id)) {
        pending.turn = null
        return
      }
      grant.pending = null
      refreshActivity(grant)
      if (pending.mixed || pending.audio.signal.aborted) return
      if (data.reason?.kind !== 'completed' || !pending.recorded || !pending.reply?.text) {
        incomplete(grant)
        return
      }
      grant.output.add(pending.audio)
      onReply(grant, pending.reply.text, pending.reply.id ?? ('reply:' + pending.id), 'speech-requested')
      void (async () => {
        let state = 'reply'
        try {
          assertCurrent(grant)
          const outcome = await play(pending.reply.text, pending.audio.signal)
          if (!outcome?.skipped && outcome?.playbackCompleted !== true) state = 'speech-failed'
        } catch (error) {
          state = pending.audio.signal.aborted ? 'interrupted' : 'speech-failed'
          if (state !== 'interrupted') {
            log('bound voice playback failed: ' + String(error?.code ?? error?.name ?? 'unknown'))
            if (active === grant) onError(grant, error)
          }
        } finally {
          grant.output.delete(pending.audio)
        }
        if (active !== grant) return
        try { assertCurrent(grant) } catch (error) { retire(grant, error); return }
        onReply(grant, pending.reply.text, pending.reply.id ?? ('reply:' + pending.id), state)
      })()
    }
  })

  return {
    supported,
    binding,
    hasSelection: () => Boolean(selectionDocument().selection),
    get active() { return active },
    allowed(epoch) {
      if (!active || active.epoch !== epoch) return false
      try { assertCurrent(active); return true }
      catch { return false }
    },
    async list(request, signal) {
      if (!object(request) || Object.keys(request).some(key => !['cursor', 'query', 'sessionId'].includes(key))
        || request.query !== undefined && (typeof request.query !== 'string' || request.query.length > 128)
        || request.cursor !== undefined && (typeof request.cursor !== 'string' || request.cursor.length > 512)
        || request.sessionId !== undefined && (!validId(request.sessionId) || request.query !== undefined || request.cursor !== undefined))
        throw unavailable()
      const rows = await inventory(signal)
      summaries.clear()
      for (const row of rows) summaries.set(row.sessionId, row)
      if (request.sessionId !== undefined) {
        const match = summaries.get(request.sessionId)
        return { items: match ? [match] : [], nextCursor: null, binding: binding() }
      }
      const query = (request.query ?? '').trim().toLowerCase()
      const matched = rows.filter(row => row.sessionId.toLowerCase().includes(query) || row.title?.toLowerCase().includes(query))
      const cursorOf = row => digest([query, row.sessionId])
      const previous = request.cursor === undefined ? -1 : matched.findIndex(row => cursorOf(row) === request.cursor)
      if (request.cursor !== undefined && previous < 0) throw fault('VOICE_EXISTING_LIST_CHANGED', '会话列表已变化，请刷新后重新选择。')
      const items = matched.slice(previous + 1, previous + 1 + PAGE_SIZE)
      return { items, nextCursor: matched.length > previous + 1 + items.length ? cursorOf(items.at(-1)) : null, binding: binding() }
    },
    async set(request, signal) {
      signal?.throwIfAborted()
      if (!object(request) || Object.keys(request).length !== 2 || ![request.sessionId, request.expectedSessionId].every(id => id === null || validId(id))) throw unavailable()
      const path = selectionPath()
      if (!path || disposed) throw unavailable()
      const previous = readSelection(path)
      if ((previous.selection?.sessionId ?? null) !== request.expectedSessionId) throw fault('VOICE_EXISTING_BINDING_CHANGED', '原会话绑定已变化，请刷新后再选择。')
      let next = null
      if (request.sessionId !== null) {
        const row = (await inventory(signal)).find(item => item.sessionId === request.sessionId)
        if (!row) throw unavailable()
        nativeAccess(row.sessionId)
        next = { sessionId: row.sessionId, identity: await nativeIdentity(row.sessionId, signal) }
        nativeAccess(row.sessionId)
        summaries.set(row.sessionId, row)
      }
      signal?.throwIfAborted()
      if (selectionPath() !== path || disposed) throw unavailable()
      writeSelection(path, previous, next)
      if (active) watch(active)
      return { binding: binding() }
    },
    async prepare(epoch, signal) {
      hostReady(signal)
      assertMicrophone(signal)
      const path = selectionPath()
      const selection = selectionDocument().selection
      if (!selection) throw unavailable()
      const { sessionId } = selection
      nativeAccess(sessionId)
      if (await nativeIdentity(sessionId, signal) !== selection.identity || disposed) throw unavailable()
      nativeAccess(sessionId)
      const live = agents().get(sessionId)
      const result = live ? { agent: live } : await controller().resolveAgent(sessionId)
      signal?.throwIfAborted()
      assertMicrophone(signal)
      nativeAccess(sessionId)
      if (disposed || selectionPath() !== path || selectionDocument().selection?.identity !== selection.identity) throw unavailable()
      const agent = result?.agent
      if (!agent || agents().get(sessionId) !== agent || getService('sessions').get(sessionId) !== agent.session
        || !isOrdinaryHeader(agent.session.header, sessionId) || identityOf(agent.session.header) !== selection.identity
        || typeof agent.inbox?.hasPending !== 'boolean'
        || typeof agent.runMaintenance !== 'function' || typeof agent.followup !== 'function') throw unavailable()
      assertModel(agent)
      close()
      active = {
        epoch, path, selection, agent, pending: null, output: new Set(), captured: new Set(),
        retries: new Map(), sending: null, waitingForIdle: false, retryBlocked: isBusy(agent),
      }
      return active
    },
    watch(grant) {
      clearInterval(timer)
      watch(grant)
      if (active !== grant) return
      timer = setInterval(() => watch(grant), 750)
      timer.unref?.()
    },
    async deliver({ text, epoch, captureTurnId, isCurrentCapture }) {
      const grant = active
      if (!grant || grant.epoch !== epoch || typeof text !== 'string' || !text.trim() || !isCurrentCapture()) return false
      try { assertCurrent(grant) } catch (error) { retire(grant, error); return false }
      const retries = [...grant.retries.values()]
      if (validId(captureTurnId)) {
        if (grant.captured.has(captureTurnId)
          || retries.some(item => item.captureTurnId === captureTurnId)) return false
        grant.captured.add(captureTurnId)
        if (grant.captured.size > 256) grant.captured.delete(grant.captured.values().next().value)
      }
      const item = { id: randomUUID(), text: text.toWellFormed(), captureTurnId, uncertain: false }
      if (sendBlocked(grant) || retries.length >= RETRY_LIMIT || retries.some(item => !item.uncertain)) {
        retain(grant, item)
        return false
      }
      return send(grant, item, isCurrentCapture)
    },
    retryStatus() {
      const grant = active
      if (!grant?.retries.size) return null
      try { assertCurrent(grant) } catch { return null }
      const waitingState = sendBlocked(grant) ? 'busy' : 'ready'
      return {
        sessionId: grant.selection.sessionId,
        items: Array.from(grant.retries.values(), item => ({
          id: item.id,
          text: item.text.length > RETRY_PREVIEW_LENGTH
            ? item.text.slice(0, RETRY_PREVIEW_LENGTH - 1).replace(/[\uD800-\uDBFF]$/u, '') + '…' : item.text,
          state: item.uncertain ? 'uncertain' : grant.sending === item.id ? 'sending' : waitingState,
        })),
      }
    },
    async retry(request, signal) {
      signal?.throwIfAborted()
      const grant = active
      if (!grant || !object(request) || Object.keys(request).length !== 1 || !validId(request.id)) return false
      try { assertCurrent(grant) } catch (error) { retire(grant, error); return false }
      const item = grant.retries.get(request.id)
      if (!item || item.uncertain || sendBlocked(grant)) return false
      return send(grant, item, () => true, signal)
    },
    close,
    cancelSpeech,
    dispose() {
      disposed = true
      lifetime.abort()
      close()
      if (typeof offEvent === 'function') offEvent()
      if (typeof offStatus === 'function') offStatus()
    },
  }
}

