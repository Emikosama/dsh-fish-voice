/** Native metadata for explicitly known Fish Voice voice roots, never a session scanner.
 * Checked against DSH fcc0ad462172522aaf5c93a7b2e01f6b9f0b0159.
 * This is a trusted host helper: keep mutators and policy arguments out of model tools.
 * The human-command bridge owns action-time authorization and exact live caller binding.
 */
const MAX_ID = 256
const MAX_TITLE = 512
const MAX_CURSOR = 2048
const MAX_TIME = 8640000000000000
const ID_PATTERN = /^[^\s\u0000-\u001f\u007f]+$/u
const HASH_PATTERN = /^[a-f0-9]{64}$/
const idOf = agent => agent?.id ?? agent?.session?.id
const error = (code, message, details = {}) => Object.assign(new Error(message), { code, ...details })

function checkedId(value) {
  if (typeof value !== 'string' || value.length < 1 || value.length > MAX_ID || !ID_PATTERN.test(value) || !value.isWellFormed()) throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'A bounded, exact session ID is required')
  return value
}
function checkedPolicy(value) {
  if (typeof value !== 'string' || !HASH_PATTERN.test(value)) throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'The current delegated policy fingerprint is required')
  return value
}
function checkedTime(value) {
  if (!Number.isSafeInteger(value) || value < 0 || value > MAX_TIME) throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'A valid epoch-millisecond timestamp is required')
  return value
}
function checkedVisibility(value) {
  if (!['hidden', 'workspace'].includes(value)) throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'Voice visibility must be hidden or workspace')
  return value
}
function independent(header, id) {
  return !!header && header.id === id && header.parentSession === undefined && header.origin !== 'subagent' && header.isSeeded !== true
}
function clipTitle(raw) {
  if (typeof raw !== 'string') return { title: null, titleTruncated: false }
  const text = raw.replace(/[\u0000-\u001f\u007f]/g, ' ').trim()
  let end = Math.min(text.length, MAX_TITLE)
  if (end < text.length && /[\uD800-\uDBFF]/.test(text[end - 1])) end--
  return { title: text ? text.slice(0, end) : null, titleTruncated: end < text.length }
}
function compare(a, b) { return b.createdAt - a.createdAt || (a.rootSessionId < b.rootSessionId ? -1 : a.rootSessionId > b.rootSessionId ? 1 : 0) }
function decodeCursor(cursor) {
  if (cursor === undefined || cursor === null) return null
  if (typeof cursor !== 'string' || !cursor || cursor.length > MAX_CURSOR || !/^[A-Za-z0-9_-]+$/.test(cursor)) throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'Invalid voice catalog cursor')
  let value
  try { value = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8')) } catch (cause) { throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'Invalid voice catalog cursor', { cause }) }
  if (!Array.isArray(value) || value.length !== 3 || value[0] !== 1) throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'Invalid voice catalog cursor')
  return { createdAt: checkedTime(value[1]), rootSessionId: checkedId(value[2]) }
}
const encodeCursor = row => Buffer.from(JSON.stringify([1, row.createdAt, row.rootSessionId])).toString('base64url')

async function loadOfficialApi(ctx) {
  const loader = ctx.get?.('loader') ?? ctx.loader
  const importModule = typeof loader?.import === 'function' ? specifier => loader.import(specifier) : specifier => import(specifier)
  const [domain, schema] = await Promise.all([importModule('@deepseek-ai/dsh-storage-domain'), importModule('zod')])
  return { ...domain, z: schema.z }
}

/**
 * Open on demand one native catalog, owned and disposed by the voice manager.
 * @param ctx - Real host context with storage.domain, agents, sessionPersistence and workspaceRegistry.
 * @param options - Official runtime exports (or authoritative Loader importer) and a test clock.
 * @returns Read-only selection inspection plus host-only registration and selection bookkeeping.
 */
export function createVoiceCatalog(ctx, { runtimeApi, loadRuntimeApi = loadOfficialApi, now = Date.now, readPresentation } = {}) {
  const service = name => ctx.get?.(name) ?? ctx[name]
  let opening, schema, blocked = null, disposed = false, disposal
  let writes = Promise.resolve()
  function assertReady(signal) {
    signal?.throwIfAborted()
    if (disposed) throw error('VOICE_CATALOG_CLOSED', 'Voice catalog is closed')
    if (blocked) throw error('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED', 'Voice catalog persistence is unconfirmed; inspect the original root before reopening or creating another', { cause: blocked, persistenceConfirmed: false })
  }
  function uncertain(cause) {
    blocked = cause
    return error('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED', 'Voice catalog persistence is unconfirmed; no automatic retry or replacement is safe', { cause, persistenceConfirmed: false })
  }
  function assertLive(agent) {
    const id = checkedId(idOf(agent))
    if (service('agents')?.get?.(id) !== agent) throw error('VOICE_CATALOG_CALLER_NOT_LIVE', 'An exact live Agent is required')
    return id
  }
  async function table(signal) {
    assertReady(signal)
    if (!opening) opening = (async () => {
      const api = runtimeApi ?? await loadRuntimeApi(ctx)
      const facility = service('storage')?.domain ?? service('storageDomain')
      if (!facility?.open || !api.defineDomain || !api.domainTable || !api.z?.object) throw error('VOICE_CATALOG_UNAVAILABLE', 'Native storage.domain and official zod schemas are required')
      const str = () => api.z.string().min(1).max(MAX_ID).regex(ID_PATTERN).refine(value => value.isWellFormed())
      const time = () => api.z.number().int().min(0).max(MAX_TIME)
      schema = api.z.object({
        rootSessionId: str(), originSessionId: str(), createdAt: time(), lastSelectedAt: time().optional(),
        policyFingerprint: api.z.string().regex(HASH_PATTERN), visibility: api.z.enum(['hidden', 'workspace']), handoffBackend: api.z.enum(['native_team','compat_domain_v1']).optional(),
      }).strict().refine(row => row.rootSessionId !== row.originSessionId && (row.lastSelectedAt === undefined || row.lastSelectedAt >= row.createdAt))
      return facility.open(api.defineDomain({ name: 'whale_voice_catalog', version: 1, layout: 'single', tables: { roots: api.domainTable(schema) } }))
    })()
    let domain
    try { domain = await opening } catch (cause) { throw uncertain(cause) }
    assertReady(signal)
    return domain.table('roots')
  }
  function parseRow(key, value) {
    const row = schema.parse(value)
    if (checkedId(key) !== row.rootSessionId) throw error('VOICE_CATALOG_INVALID_RECORD', 'Voice catalog key does not match its root identity')
    return row
  }
  function queue(operation, signal) {
    const result = writes.then(() => { assertReady(signal); return operation() })
    writes = result.catch(() => {})
    return result
  }
  function archiveState(id) {
    const ids = service('workspaceRegistry')?.archivedSessionIds
    return Array.isArray(ids) ? ids.includes(id) : null
  }
  function visibilityMatches(row) {
    const presentation = service('workspaceRegistry')?.sessionPresentation
    const record = readPresentation
      ? readPresentation(row.rootSessionId)
      : presentation?.apiVersion === 1 ? presentation.get(row.rootSessionId) : undefined
    if (row.visibility === 'hidden') return record?.purpose === 'voice' && record.visibility === 'hidden'
    return record?.visibility !== 'hidden'
  }
  function titleFor(header, liveRoot) {
    try {
      const snapshot = liveRoot
        ? service('sessionProjections')?.snapshot?.(liveRoot.session, ['title'])
        : service('sessionProjectionCache')?.cachedSnapshot?.(header, ['title'])
      const result = clipTitle(snapshot?.values?.title)
      return { ...result, titleSource: result.title === null ? 'none' : liveRoot ? 'live' : 'cached' }
    } catch (cause) {
      // Titles are optional display hints. Never generate one or read the log as fallback.
      return { title: null, titleTruncated: false, titleSource: 'none' }
    }
  }
  async function inspect(row, { policyFingerprint, visibility, ownedRoot, signal, hostOwner }) {
    const base = {
      rootSessionId: row.rootSessionId, originSessionId: row.originSessionId, createdAt: row.createdAt,
      lastSelectedAt: row.lastSelectedAt ?? null, shortId: Array.from(row.rootSessionId).slice(0, 8).join(''),
      visibility: row.visibility, title: null, titleTruncated: false, titleSource: 'none',
      status: 'unavailable', reason: null, canResume: false, residency: 'unknown',
    }
    const limited = reason => ({ ...base, status: 'permission-limited', reason })
    if (!hostOwner) {
      if (row.policyFingerprint !== policyFingerprint) return limited('policy_mismatch')
      if (visibility !== undefined && row.visibility !== visibility) return limited('visibility_mismatch')
      if (!visibilityMatches(row)) return limited('presentation_mismatch')
    }
    if (archiveState(row.rootSessionId) === null) return { ...base, reason: 'archive_state_unavailable' }
    const persistence = service('sessionPersistence')
    if (typeof persistence?.stat !== 'function') return { ...base, reason: 'session_persistence_unavailable' }
    let snapshot
    try { snapshot = await persistence.stat(row.rootSessionId, { signal }) } catch (cause) {
      signal?.throwIfAborted()
      return { ...base, reason: 'session_metadata_unavailable' }
    }
    assertReady(signal)
    if (!snapshot) return { ...base, reason: 'session_missing' }
    if (!independent(snapshot.header, row.rootSessionId) || snapshot.header.createdAt !== row.createdAt) return { ...base, reason: 'root_identity_mismatch' }
    if (snapshot.formatStatus === 'migration-required') return { ...base, reason: 'native_migration_required' }
    // Native metadata reads yield. Recheck mutable admission facts afterwards.
    if (!hostOwner && !visibilityMatches(row)) return limited('presentation_mismatch')
    const archived = archiveState(row.rootSessionId)
    if (archived === null) return { ...base, reason: 'archive_state_unavailable' }
    const agents = service('agents')
    if (typeof agents?.get !== 'function') return { ...base, reason: 'live_state_unavailable' }
    const liveRoot = agents.get(row.rootSessionId)
    const title = titleFor(snapshot.header, liveRoot)
    const residency = liveRoot ? liveRoot === ownedRoot ? 'owned' : 'elsewhere' : 'cold'
    if (archived) return { ...base, ...title, residency, status: 'archived', reason: 'restore_in_host' }
    if (liveRoot) return { ...base, ...title, residency, status: 'live', reason: liveRoot === ownedRoot ? null : 'live_elsewhere', canResume: liveRoot === ownedRoot }
    return { ...base, ...title, residency, status: 'available', canResume: true }
  }
  function inspectionOptions(options = {}, hostOwner = false) {
    const result = { ...options, hostOwner }
    if (!hostOwner) result.policyFingerprint = checkedPolicy(options.policyFingerprint)
    if (options.visibility !== undefined) result.visibility = checkedVisibility(options.visibility)
    if (options.ownedRoot !== undefined) assertLive(options.ownedRoot)
    return result
  }

  /** Register only a root the manager just created or independently knows is a voice root.
   * Exact live Agents and native metadata are checked, but calling this is NOT human authorization.
   * No legacy discovery is performed. Existing roots retain their original origin and timestamps.
   */
  function registerKnownRoot({ root, origin, policyFingerprint, visibility, handoffBackend }, { signal } = {}) {
    const rootSessionId = assertLive(root), originSessionId = assertLive(origin)
    checkedPolicy(policyFingerprint); checkedVisibility(visibility)
    if (handoffBackend !== undefined && !['native_team','compat_domain_v1'].includes(handoffBackend)) throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'Unknown durable handoff backend')
    if (rootSessionId === originSessionId || !independent(root.session?.header, rootSessionId)) return Promise.reject(error('VOICE_CATALOG_NOT_INDEPENDENT', 'Only an independent voice root can be registered'))
    const createdAt = checkedTime(root.session.header.createdAt)
    return queue(async () => {
      const rows = await table(signal)
      assertLive(root); assertLive(origin)
      const previous = rows.get(rootSessionId)
      if (previous !== undefined) {
        const row = parseRow(rootSessionId, previous)
        if (row.policyFingerprint !== policyFingerprint || row.visibility !== visibility || row.createdAt !== createdAt || handoffBackend !== undefined && (row.handoffBackend ?? 'native_team') !== handoffBackend) throw error('VOICE_CATALOG_IDENTITY_CONFLICT', 'The known voice root identity or permission scope changed')
        return { ...row }
      }
      const row = schema.parse({ rootSessionId, originSessionId, createdAt, policyFingerprint, visibility, ...(handoffBackend === undefined ? {} : { handoffBackend }) })
      if (!visibilityMatches(row)) throw error('VOICE_CATALOG_PRESENTATION_MISMATCH', 'The native voice presentation does not match')
      if (archiveState(rootSessionId) !== false) throw error('VOICE_CATALOG_ARCHIVE_STATE', 'The root must be confirmed unarchived before registration')
      const persistence = service('sessionPersistence')
      if (typeof persistence?.flush !== 'function' || typeof persistence?.stat !== 'function') throw error('VOICE_CATALOG_UNAVAILABLE', 'Native session durability and metadata are required')
      try { await persistence.flush() } catch (cause) { throw uncertain(cause) }
      assertReady(signal); assertLive(root); assertLive(origin)
      const snapshot = await persistence.stat(rootSessionId, { signal })
      assertReady(signal); assertLive(root); assertLive(origin)
      if (!independent(snapshot?.header, rootSessionId) || snapshot.header.createdAt !== createdAt) throw error('VOICE_CATALOG_IDENTITY_CONFLICT', 'The durable root identity was not confirmed; no catalog entry was written')
      if (!visibilityMatches(row)) throw error('VOICE_CATALOG_PRESENTATION_MISMATCH', 'The native voice presentation changed before registration')
      if (archiveState(rootSessionId) !== false) throw error('VOICE_CATALOG_ARCHIVE_STATE', 'The root is no longer confirmed unarchived')
      try { await rows.put(rootSessionId, row) } catch (cause) { throw uncertain(cause) }
      return { ...row }
    }, signal)
  }

  /** List only recorded voice identities; no selection, resume, microphone or model action. */
  async function listPage(options, hostOwner) {
    const inspected = inspectionOptions(options, hostOwner)
    const after = decodeCursor(options.cursor), limit = options.limit ?? 20
    if (!Number.isInteger(limit) || limit < 1 || limit > 50) throw error('VOICE_CATALOG_INVALID_ARGUMENT', 'Voice catalog limit must be between 1 and 50')
    const tableHandle = await table(options.signal)
    const all = [...tableHandle.entries()].map(([key, value]) => parseRow(key, value)).sort(compare)
    const candidates = after ? all.filter(row => compare(row, after) > 0) : all
    const page = candidates.slice(0, limit), items = []
    for (const row of page) items.push(await inspect(row, inspected))
    assertReady(options.signal)
    return { items, nextCursor: candidates.length > limit ? encodeCursor(page[page.length - 1]) : null, total: all.length, selectionRequired: true }
  }

  const list = (options = {}) => listPage(options, false)
  // The owner-only Gateway authenticates this view independently of Agent tool policy.
  const listForHostOwner = options => listPage(options, true)
  async function readForHostOwner(rootSessionId, options) {
    checkedId(rootSessionId)
    const rows = await table(options.signal), value = rows.get(rootSessionId)
    return value === undefined ? null : inspect(parseRow(rootSessionId, value), inspectionOptions(options, true))
  }

  /** Recheck one explicit ID. The returned data grants no authority and reserves no native handle. */
  async function inspectSelection(rootSessionId, options = {}) {
    checkedId(rootSessionId)
    const inspected = inspectionOptions(options), rows = await table(options.signal)
    const value = rows.get(rootSessionId)
    if (value === undefined) throw error('VOICE_CATALOG_UNKNOWN_ROOT', 'This ID is not a known voice chat; no session was opened')
    const identity = parseRow(rootSessionId, value), entry = await inspect(identity, inspected)
    if (!entry.canResume) throw error('VOICE_CATALOG_SELECTION_BLOCKED', 'The selected voice chat cannot currently be continued', { rootSessionId, status: entry.status, reason: entry.reason })
    return { identity: { ...identity }, entry, action: entry.residency === 'owned' ? 'use-owned-root' : 'resume' }
  }

  /** After the human-command manager successfully owns the chosen root, save only selection time. */
  function markSelected(rootSessionId, { root, policyFingerprint, signal } = {}) {
    checkedId(rootSessionId); checkedPolicy(policyFingerprint)
    if (assertLive(root) !== rootSessionId) return Promise.reject(error('VOICE_CATALOG_IDENTITY_CONFLICT', 'The selected root must match the exact owned live Agent'))
    return queue(async () => {
      const rows = await table(signal)
      await inspectSelection(rootSessionId, { policyFingerprint, ownedRoot: root, signal })
      assertReady(signal); assertLive(root)
      const timestamp = checkedTime(now())
      let updated
      try {
        updated = await rows.update(rootSessionId, previous => {
          const row = parseRow(rootSessionId, previous)
          if (row.policyFingerprint !== policyFingerprint) throw error('VOICE_CATALOG_IDENTITY_CONFLICT', 'The selected permission scope changed')
          return schema.parse({ ...row, lastSelectedAt: Math.max(timestamp, row.createdAt, row.lastSelectedAt ?? 0) })
        })
      } catch (cause) { throw uncertain(cause) }
      return { ...updated }
    }, signal)
  }
  return {
    registerKnownRoot, list, listForHostOwner, readForHostOwner, inspectSelection, markSelected,
    status: () => ({ blocked: blocked !== null, closed: disposed }),
    dispose() {
      if (!disposal) {
        disposed = true
        disposal = (async () => {
          await writes
          if (opening) {
            let domain
            try { domain = await opening } catch (cause) { return } // Failed open owns no domain handle.
            await domain.close()
          }
        })()
      }
      return disposal
    },
  }
}
