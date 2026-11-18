import { AsyncLocalStorage } from 'node:async_hooks'
import { createHash, randomUUID } from 'node:crypto'
import { appendFile, mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises'
import { isAbsolute, join, resolve } from 'node:path'
import { CLIENT_OPERATION_NAMES, CLIENT_OPERATION_BATCH_SIZE, CLIENT_OPERATION_PAGE_BYTES, CLIENT_OPERATION_TTL_MS } from './voice-operation-log-contract.mjs'

export const OPERATION_LOG_RETENTION_MS = CLIENT_OPERATION_TTL_MS
const PRUNE_INTERVAL = 60_000
const HOUR = 60 * 60 * 1000
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const FILENAME = /^(\d{10})-[0-9a-f]{16}(?:-[0-9a-f]{16})?\.log$/
const TOKEN = /^[a-z][a-z0-9._-]{0,79}$/
const SOURCES = new Set(['owner', 'user', 'ui', 'agent', 'host', 'helper', 'asr', 'tts', 'model', 'update'])
const PHASES = new Set(['requested', 'finished', 'changed'])
const RESULTS = new Set(['ok', 'failed', 'cancelled', 'denied', 'accepted', 'unknown', 'unavailable'])
const KNOWN_ERRORS = new Set([
  'ABORTED', 'ABORTED_BEFORE_DISPATCH', 'AUTHORIZATION_REQUIRED', 'AUTHORIZATION_REVOKED', 'AUTHORIZATION_STOPPING',
  'BINDINGS_UNCONFIRMED', 'STALE_AUTHORIZATION', 'TTS_CANCELLED', 'TTS_TERMINATION_UNCONFIRMED',
  'VOICE_OWNER_CHANGED', 'VOICE_EXISTING_BUSY', 'VOICE_EXISTING_ARCHIVED', 'VOICE_EXISTING_UNAVAILABLE',
  'VOICE_EXISTING_MODEL_REQUIRED', 'VOICE_EXISTING_BINDING_CHANGED', 'VOICE_EXISTING_REQUIRES_STOP',
  'VOICE_EXISTING_REPLY_INCOMPLETE', 'VOICE_GRANT_PERSISTENCE_UNCONFIRMED', 'VOICE_UPDATE_INSTALLING',
  'VOICE_SESSION_ARCHIVED', 'VOICE_HOST_CAPABILITY_MISMATCH', 'VOICE_MODEL_REQUIRED', 'VOICE_WORKER_ROUTE_MISMATCH',
  'VOICE_OWNER_REQUIRED', 'VOICE_HELPER_PROTOCOL', 'VOICE_HELPER_STOPPING', 'VOICE_HELPER_STOP_UNCONFIRMED',
  'VOICE_CALLER_SESSION_INVALID', 'VOICE_CALLER_SESSION_LOST', 'VOICE_CALLER_SESSION_REPLACED', 'VOICE_CALLER_SESSION_REQUIRED',
  'VOICE_ACTOR_SCOPE_CHANGED',
  'VOICE_HELPER_COMPONENT_MISSING', 'VOICE_ASR_NOT_READY', 'VOICE_ASR_SETUP_FAILED', 'HELPER_UNEXPECTED_EXIT',
  'TTS_BUSY', 'TTS_EDGE_FAILED', 'TTS_EDGE_NOT_INSTALLED', 'TTS_INVALID_TEXT',
  'HOST_RESTARTED', 'MODEL_DOWNLOAD_FAILED', 'INVALID_COMPUTE', 'INVALID_REUSE_PLAN', 'OUTCOME_UNKNOWN',
  'ENOENT', 'EACCES', 'ENOSPC', 'EPIPE', 'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT',
])
const CLIENT_NAMES = new Set(CLIENT_OPERATION_NAMES)
const overflowCount = row => row.action === 'ui-buffer-overflow' && Number.isSafeInteger(row.count) && row.count > 0 ? row.count : undefined
const compare = (a, b) => a.at - b.at || a.sequence - b.sequence || a.id.localeCompare(b.id)
const bucketOf = at => Math.floor(at / HOUR)
const nonce = () => randomUUID().replaceAll('-', '').slice(0, 16)
const bucketName = (bucket, shard) => `${String(bucket).padStart(10, '0')}-${shard}.log`
const serialize = row => JSON.stringify(row) + '\n'
const opaqueSubject = value => typeof value === 'string' && value.length > 0 && value.length <= 256
  ? createHash('sha256').update('fish-voice-operation\0').update(value).digest('hex').slice(0, 20) : undefined
const missing = error => error?.code === 'ENOENT'

export function operationLogDirectory(dataDirectory, profileDirectory) {
  const root = join(dataDirectory, 'operation-log')
  if (typeof profileDirectory !== 'string' || !isAbsolute(profileDirectory)) return join(root, 'legacy')
  const absolute = resolve(profileDirectory)
  const normalized = process.platform === 'win32' ? absolute.toLowerCase() : absolute
  const key = createHash('sha256').update('fish-voice-profile\0').update(normalized).digest('hex').slice(0, 24)
  return join(root, 'profile-' + key)
}

const scopesKey = Symbol.for('dsh-fish-voice/operation-log-client-scopes')
export function operationLogClientScope(directory, profileDirectory, profileHost) {
  if (typeof profileDirectory !== 'string' || !isAbsolute(profileDirectory) || !profileHost || typeof profileHost !== 'object')
    return randomUUID()
  const scopes = globalThis[scopesKey] ??= new WeakMap()
  let hostScopes = scopes.get(profileHost)
  if (!hostScopes) scopes.set(profileHost, hostScopes = new Map())
  let token = hostScopes.get(directory)
  if (!token) hostScopes.set(directory, token = randomUUID())
  return token
}

export function safeOperationError(error) {
  if (error?.name === 'AbortError') return 'ABORTED'
  if (KNOWN_ERRORS.has(error?.code)) return error.code
  return 'OPERATION_FAILED'
}

function cursorFor(row, until) {
  return Buffer.from(JSON.stringify([row.at, row.sequence, row.id, until])).toString('base64url')
}
function readCursor(value) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{1,160}$/.test(value)) throw new Error('操作日志页码无效')
  try {
    const [at, sequence, id, until] = JSON.parse(Buffer.from(value, 'base64url').toString())
    if (Number.isSafeInteger(at) && Number.isSafeInteger(until) && Number.isSafeInteger(sequence)
      && sequence >= 0 && at >= 0 && until >= at && UUID.test(id)) return { at, sequence, id, until }
  } catch { /* invalid cursor */ }
  throw new Error('操作日志页码无效')
}
function parseRows(text) {
  const rows = []
  for (const line of text.split('\n')) {
    if (!line) continue
    try {
      const row = JSON.parse(line)
      if (Number.isSafeInteger(row.at) && row.at >= 0 && UUID.test(row.id) && SOURCES.has(row.source)
        && TOKEN.test(row.action) && PHASES.has(row.phase) && UUID.test(row.operationId)) rows.push({
        at: row.at, sequence: Number.isSafeInteger(row.sequence) && row.sequence > 0 ? row.sequence : 0,
        id: row.id, source: row.source, action: row.action, phase: row.phase,
        ...(RESULTS.has(row.result) ? { result: row.result } : {}),
        ...(KNOWN_ERRORS.has(row.errorCode) || row.errorCode === 'OPERATION_FAILED' ? { errorCode: row.errorCode } : {}),
        operationId: row.operationId,
        ...(overflowCount(row) ? { count: row.count } : {}),
        ...(typeof row.subject === 'string' && /^[a-f0-9]{20}$/.test(row.subject) ? { subject: row.subject } : {}),
        ...(typeof row.target === 'string' && /^[a-f0-9]{20}$/.test(row.target) ? { target: row.target } : {}),
      })
    } catch { /* interrupted or damaged final line */ }
  }
  return rows
}
function normalize(row, now, ambient) {
  if (!SOURCES.has(row.source) || !TOKEN.test(row.action) || !PHASES.has(row.phase)) return null
  const id = UUID.test(row.id ?? '') ? row.id : randomUUID()
  const result = RESULTS.has(row.result) ? row.result : undefined
  const correlation = UUID.test(row.operationId ?? '') ? row.operationId : ambient ?? id
  return {
    at: Number.isSafeInteger(row.at) ? row.at : now(), id, source: row.source, action: row.action, phase: row.phase,
    ...(result ? { result } : {}),
    ...(row.error ? { errorCode: safeOperationError(row.error) } : {}),
    operationId: correlation,
    ...(overflowCount(row) ? { count: row.count } : {}),
    ...(row.subjectId ? { subject: opaqueSubject(row.subjectId) } : {}),
    ...(row.targetId ? { target: opaqueSubject(row.targetId) } : {}),
  }
}
function normalizeClient(events, now) {
  if (!Array.isArray(events) || events.length > CLIENT_OPERATION_BATCH_SIZE) throw new Error('操作日志批次无效')
  return events.map(row => {
    if (!row || typeof row !== 'object' || Object.keys(row).some(key => !['id','at','source','action','phase','result','count'].includes(key))
      || typeof row.id !== 'string' || !UUID.test(row.id) || !Number.isSafeInteger(row.at) || row.at < 0
      || !['user','ui'].includes(row.source) || !CLIENT_NAMES.has(row.action)
      || row.phase !== undefined && !['requested','finished'].includes(row.phase)
      || row.result !== undefined && !['ok','failed','cancelled'].includes(row.result)
      || (row.action === 'ui-buffer-overflow' ? row.source !== 'ui' || !overflowCount(row) : row.count !== undefined)) throw new Error('操作日志事件无效')
    return normalize({ ...row, phase: row.phase ?? 'finished' }, now)
  })
}

/** Per-hour JSONL rotation. Queued I/O keeps logging failure outside product operations. */
export function createOperationLog({
  directory, now = Date.now, setTimer = setInterval, clearTimer = clearInterval, onProblem = () => {},
}) {
  const writer = nonce()
  const operation = new AsyncLocalStorage()
  const clientIds = new Map()
  let pending = Promise.resolve(), disposed = false, nextPrune = -Infinity
  let sequence = 0, lastProblem = -Infinity
  function report(error) {
    if (now() - lastProblem < PRUNE_INTERVAL) return
    lastProblem = now()
    try { onProblem(safeOperationError(error)) } catch { /* diagnostics are best-effort */ }
  }
  function queue(job) {
    const outcome = pending.then(job)
    pending = outcome.catch(report)
    return outcome
  }
  async function listFiles() {
    try {
      return (await readdir(directory)).flatMap(name => {
        const match = name.match(FILENAME)
        return match ? [{ name, bucket: Number(match[1]) }] : []
      })
    } catch (error) { if (!missing(error)) throw error; return [] }
  }
  async function rowsOf(name) {
    try { return parseRows(await readFile(join(directory, name), 'utf8')) }
    catch (error) { if (missing(error)) return []; throw error }
  }
  async function remove(name) {
    try { await unlink(join(directory, name)) } catch (error) { if (!missing(error)) throw error }
  }
  async function publish(name, content) {
    const temporary = name + '.' + nonce() + '.tmp'
    try {
      await writeFile(join(directory, temporary), content, { encoding: 'utf8', flag: 'wx', mode: 0o600 })
      await rename(join(directory, temporary), join(directory, name))
    } finally { await remove(temporary) }
  }
  async function prune(force = false) {
    const current = now()
    if (!force && current < nextPrune) return
    nextPrune = current + PRUNE_INTERVAL
    const cutoff = current - OPERATION_LOG_RETENTION_MS, boundary = bucketOf(cutoff)
    for (const [bucket] of clientIds) if (bucket < boundary) clientIds.delete(bucket)
    for (const { name, bucket } of await listFiles()) {
      if (bucket < boundary) await remove(name)
      else if (bucket === boundary) {
        const rows = await rowsOf(name)
        const kept = rows.filter(row => row.at >= cutoff)
        if (kept.length === 0) await remove(name)
        else if (kept.length !== rows.length) await publish(name, kept.map(serialize).join(''))
      }
    }
  }
  async function write(rows, client = false) {
    await prune()
    const current = now()
    const groups = new Map()
    for (const row of rows) {
      if (row.at < current - OPERATION_LOG_RETENTION_MS || row.at > current + 60_000) continue
      const bucket = bucketOf(row.at)
      const items = groups.get(bucket) ?? []
      items.push(row); groups.set(bucket, items)
    }
    if (!groups.size) return
    await mkdir(directory, { recursive: true, mode: 0o700 })
    for (const [bucket, items] of groups) {
      let selected = items
      if (client) {
        let ids = clientIds.get(bucket)
        if (!ids) {
          ids = new Set()
          for (const file of await listFiles()) if (file.bucket === bucket) {
            for (const row of await rowsOf(file.name)) if (row.source === 'user' || row.source === 'ui') ids.add(row.id)
          }
          clientIds.set(bucket, ids)
        }
        const unique = new Map()
        for (const row of items) if (!ids.has(row.id)) unique.set(row.id, row)
        selected = [...unique.values()]
      }
      if (!selected.length) continue
      const active = bucket === bucketOf(now())
      const name = bucketName(bucket, active ? writer : writer + '-' + nonce())
      const content = selected.map(serialize).join('')
      // A late, out-of-order client batch uses an immutable file. Cleanup never
      // rewrites a file that a second process could still be appending to.
      if (active) await appendFile(join(directory, name), content, { encoding: 'utf8', mode: 0o600 })
      else await publish(name, content)
      if (client) for (const row of selected) clientIds.get(bucket).add(row.id)
    }
  }
  function record(row) {
    if (disposed) return
    try {
      const normalized = normalize(row, now, operation.getStore())
      if (normalized) {
        const entry = { ...normalized, sequence: ++sequence }
        void queue(() => write([entry]))
      }
    } catch (error) { report(error) }
  }
  function track(source, action, job, { subjectId, targetId, classify } = {}) {
    const operationId = operation.getStore() ?? randomUUID()
    record({ source, action, phase: 'requested', operationId, subjectId, targetId })
    const finish = (result, error) => {
      record({ source, action, phase: 'finished', operationId, subjectId, targetId,
        result: result ?? (error?.name === 'AbortError' ? 'cancelled' : error?.code === 'VOICE_OWNER_REQUIRED' ? 'denied' : error ? 'failed' : 'ok'), error })
    }
    const success = value => {
      let outcome
      try { outcome = classify?.(value) } catch { /* a recorder cannot change the result */ }
      if (typeof outcome === 'object' && outcome !== null) finish(outcome.result, outcome.error)
      else finish(outcome)
      return value
    }
    try {
      const value = operation.run(operationId, job)
      return value && typeof value.then === 'function' ? value.then(success, error => { finish(undefined, error); throw error }) : success(value)
    } catch (error) { finish(undefined, error); throw error }
  }
  const timer = setTimer(() => { if (!disposed) void queue(() => prune(true)) }, PRUNE_INTERVAL)
  timer?.unref?.()
  void queue(() => prune(true))
  return {
    record, track,
    async recordClient(events) {
      if (disposed) return { accepted: false }
      const rows = normalizeClient(events, now).map(row => ({ ...row, sequence: ++sequence }))
      try { await queue(() => write(rows, true)); return { accepted: true } }
      catch { return { accepted: false } }
    },
    async read(cursor) {
      if (disposed) throw new Error('操作日志已关闭')
      const after = cursor === undefined ? null : readCursor(cursor)
      return queue(async () => {
        await prune(true)
        const current = now(), cutoff = current - OPERATION_LOG_RETENTION_MS
        const until = after?.until ?? current
        const buckets = new Map()
        for (const file of await listFiles()) {
          if (file.bucket < bucketOf(Math.max(cutoff, after?.at ?? 0)) || file.bucket > bucketOf(until)) continue
          const members = buckets.get(file.bucket) ?? []
          members.push(file.name); buckets.set(file.bucket, members)
        }
        let bytes = 0, text = '', last = null
        for (const [, files] of [...buckets].sort(([a], [b]) => a - b)) {
          const rows = []
          for (const file of files) {
            for (const row of await rowsOf(file)) rows.push(row)
          }
          rows.sort(compare)
          const seen = new Set()
          for (const row of rows) {
            if (seen.has(row.id)) continue
            seen.add(row.id)
            if (row.at < cutoff || row.at > until || after && compare(row, after) <= 0) continue
            const line = serialize(row), length = Buffer.byteLength(line)
            if (last && bytes + length > CLIENT_OPERATION_PAGE_BYTES) return { text, nextCursor: cursorFor(last, until) }
            text += line; bytes += length; last = row
          }
        }
        return { text, nextCursor: null }
      })
    },
    flush: () => pending,
    dispose() { disposed = true; clearTimer(timer); return pending },
  }
}

