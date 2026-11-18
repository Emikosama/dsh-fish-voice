import { CLIENT_OPERATION_NAMES, CLIENT_OPERATION_BATCH_SIZE, CLIENT_OPERATION_TTL_MS } from '../../voice-operation-log-contract.mjs'

const actions = new Set(CLIENT_OPERATION_NAMES)
const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const capacity = 256
const storageKey = 'dsh-fish-voice.pending-operation-log.v1'
const overflowAction = 'ui-buffer-overflow'

function eventId() {
  const crypto = globalThis.crypto
  if (crypto?.randomUUID) return crypto.randomUUID()
  const bytes = crypto?.getRandomValues(new Uint8Array(16))
  if (!bytes) return null
  bytes[6] = (bytes[6] & 15) | 64
  bytes[8] = (bytes[8] & 63) | 128
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
  return [hex.slice(0,8),hex.slice(8,12),hex.slice(12,16),hex.slice(16,20),hex.slice(20)].join('-')
}

function tabStorage() {
  try { return globalThis.sessionStorage } catch { return undefined }
}

function restoreEvent(row, overflow = false) {
  if (!row || typeof row.id !== 'string' || !idPattern.test(row.id) || !Number.isSafeInteger(row.at) || row.at < 0
    || !actions.has(row.action) || !['user','ui'].includes(row.source) || overflow !== (row.action === overflowAction)
    || overflow && (row.source !== 'ui' || !Number.isSafeInteger(row.count) || row.count < 1)) return null
  const { id, at, action, source } = row
  return {
    id, at, action, source, ...(overflow ? { count:row.count } : {}),
    ...(['requested','finished'].includes(row.phase) ? { phase:row.phase } : {}),
    ...(['ok','failed','cancelled'].includes(row.result) ? { result:row.result } : {}),
  }
}

/** Same-tab recovery is admitted only after the owner Remote attests the Host/profile scope. */
export function createClientOperationJournal({
  schedule = setTimeout, unschedule = clearTimeout, now = Date.now, identify = eventId, storage = tabStorage(),
} = {}) {
  let pending = [], overflow = null, dropped = null, scope = null, verified = false
  let client, timer, active, failures = 0, disposed = false
  const cancelTimer = () => { if (timer !== undefined) { unschedule(timer); timer = undefined } }
  const fresh = row => row && row.at >= now() - CLIENT_OPERATION_TTL_MS
  const prune = () => {
    pending = pending.filter(fresh)
    if (!fresh(overflow)) overflow = null
    if (!fresh(dropped)) dropped = null
  }
  const hasEvents = () => pending.length > 0 || overflow !== null || dropped !== null
  const persist = () => {
    if (!scope || !storage) return
    try {
      if (hasEvents()) storage.setItem(storageKey, JSON.stringify({ scope, pending, overflow, dropped }))
      else storage.removeItem(storageKey)
    } catch { /* Live delivery remains available when the tab denies storage. */ }
  }
  const noteDropped = (count, at) => {
    dropped = { count:Math.min(Number.MAX_SAFE_INTEGER, (dropped?.count ?? 0) + count), at:Math.max(dropped?.at ?? 0, at) }
  }
  const enqueue = event => {
    if (pending.length >= capacity) noteDropped(1, event.at)
    else pending.push(event)
  }
  const confirmScope = next => {
    if (scope === null) {
      let saved
      try { saved = JSON.parse(storage?.getItem(storageKey) ?? 'null') }
      catch { /* Ignore unreadable browser state. */ }
      if (saved?.scope === next) {
        const startup = pending, startupDropped = dropped
        const recovered = Array.isArray(saved.pending) ? saved.pending.slice(0, capacity).map(row => restoreEvent(row)).filter(fresh) : []
        pending = [...new Map(recovered.map(row => [row.id,row])).values()]
        overflow = restoreEvent(saved.overflow, true)
        dropped = saved.dropped && Number.isSafeInteger(saved.dropped.count) && saved.dropped.count > 0
          && Number.isSafeInteger(saved.dropped.at) && fresh(saved.dropped)
          ? { count:saved.dropped.count, at:saved.dropped.at } : null
        if (startupDropped) noteDropped(startupDropped.count, startupDropped.at)
        for (const event of startup) if (fresh(event)) enqueue(event)
      }
    } else if (scope !== next) {
      pending = []; overflow = null; dropped = null
    }
    scope = next
    verified = true
    prune()
    persist()
  }
  const queue = (delay = 160) => {
    if (disposed || active || timer !== undefined || verified && !hasEvents()
      || !client?.readClientOperationScope || !client?.recordClientOperations) return
    timer = schedule(() => { timer = undefined; void flush() }, delay)
    timer?.unref?.()
  }
  async function flush() {
    const abort = new AbortController(), source = client
    active = abort
    const current = () => !disposed && client === source && active === abort
    try {
      const signal = AbortSignal.any([abort.signal, AbortSignal.timeout(10000)])
      if (!verified) {
        const value = await source.readClientOperationScope(signal)
        if (!current()) return
        if (typeof value?.scope !== 'string' || !idPattern.test(value.scope)) throw new Error('Operation scope unavailable')
        confirmScope(value.scope)
      }
      prune()
      if (!overflow && dropped) {
        const id = identify()
        if (id) {
          overflow = { id, at:dropped.at, action:overflowAction, source:'ui', phase:'finished', count:dropped.count }
          dropped = null
        }
      }
      persist()
      const events = overflow
        ? [overflow, ...pending.slice(0, CLIENT_OPERATION_BATCH_SIZE - 1)]
        : pending.slice(0, CLIENT_OPERATION_BATCH_SIZE)
      if (!events.length) return
      const result = await source.recordClientOperations({ scope, events }, signal)
      if (!current()) return
      if (result?.accepted !== true) throw new Error('Operation batch was not accepted')
      const sent = new Set(events.map(event => event.id))
      pending = pending.filter(event => !sent.has(event.id))
      if (overflow && sent.has(overflow.id)) overflow = null
      failures = 0
      persist()
    } catch {
      if (current()) { verified = false; failures++ }
    } finally {
      if (current()) {
        active = undefined
        queue(failures ? Math.min(30000, 750 * 2 ** Math.min(failures - 1, 6)) : 160)
      }
    }
  }
  function observe(action, source, phase, result) {
    if (disposed || !actions.has(action) || action === overflowAction) return
    let id
    try { id = identify() } catch { return }
    if (!id) return
    prune()
    enqueue({ id, at:now(), action, source, ...(phase ? { phase } : {}), ...(result ? { result } : {}) })
    persist()
    queue()
  }
  return {
    user(action) { observe(action, 'user') },
    internal(action, phase, result) { observe(action, 'ui', phase, result) },
    attach(next) {
      if (client === next || disposed) return
      cancelTimer()
      active?.abort()
      active = undefined
      client = next
      verified = false
      failures = 0
      queue(0)
    },
    dispose() {
      disposed = true
      cancelTimer()
      active?.abort()
      pending = []; overflow = null; dropped = null
    },
  }
}
