import test from 'node:test'
import assert from 'node:assert/strict'
import { createVoiceCatalog } from '../voice-catalog.mjs'

const POLICY = 'a'.repeat(64), OTHER_POLICY = 'b'.repeat(64)
const deferred = () => { let resolve, reject; const promise = new Promise((a, b) => { resolve = a; reject = b }); return { promise, resolve, reject } }

// Minimal validating fixture for the official zod operations this module uses.
// Real-host persistence/schema coverage is separate from these keyless unit tests.
function schema(parse) {
  const rule = predicate => schema(value => { const result = parse(value); assert.ok(predicate(result), 'schema rejected record'); return result })
  return {
    parse,
    min: min => rule(value => typeof value === 'number' ? value >= min : value.length >= min),
    max: max => rule(value => typeof value === 'number' ? value <= max : value.length <= max),
    regex: pattern => rule(value => pattern.test(value)), int: () => rule(Number.isSafeInteger),
    optional: () => schema(value => value === undefined ? undefined : parse(value)),
    refine: predicate => rule(predicate),
  }
}
const z = {
  string: () => schema(value => { assert.equal(typeof value, 'string'); return value }),
  number: () => schema(value => { assert.equal(typeof value, 'number'); assert.ok(Number.isFinite(value)); return value }),
  enum: values => schema(value => { assert.ok(values.includes(value)); return value }),
  object: fields => {
    let strict = false
    const result = schema(value => {
      assert.ok(value && !Array.isArray(value) && typeof value === 'object')
      if (strict) assert.ok(Object.keys(value).every(key => Object.hasOwn(fields, key)))
      const parsed = {}
      for (const [key, validator] of Object.entries(fields)) {
        const item = validator.parse(value[key]); if (item !== undefined) parsed[key] = item
      }
      return parsed
    })
    result.strict = () => { strict = true; return result }
    return result
  },
}
const runtimeApi = { z, defineDomain: value => value, domainTable: valueSchema => ({ valueSchema }) }

function fixture({ records = new Map(), now = () => 10000, options = {} } = {}) {
  const live = new Map(), persisted = new Map(), presentations = new Map(), titles = new Map()
  const calls = { opens: 0, closes: 0, flushes: 0, puts: 0, updates: 0, stats: [], titleReads: [] }
  const root = (id, createdAt = 100) => {
    const agent = { id, session: { id, header: { id, version: 1, createdAt, isSeeded: false } } }
    live.set(id, agent); persisted.set(id, { header: { ...agent.session.header } })
    presentations.set(id, { purpose: 'voice', visibility: 'hidden' })
    return agent
  }
  const origin = root('origin', 1)
  const services = {
    agents: { get: id => live.get(id) },
    workspaceRegistry: { archivedSessionIds: [], sessionPresentation: { apiVersion: 1, get: id => presentations.get(id) } },
    sessionPersistence: {
      async flush() { calls.flushes++ },
      async stat(id) { calls.stats.push(id); return persisted.get(id) },
      async list() { assert.fail('Do not scan the user’s ordinary sessions') },
      async open() { assert.fail('Catalog must never open a native session handle') },
    },
    sessionProjections: { snapshot(session, keys) { assert.deepEqual(keys, ['title']); calls.titleReads.push(['live', session.id]); return { values: { title: titles.get(session.id) } } } },
    sessionProjectionCache: { cachedSnapshot(header, keys) { assert.deepEqual(keys, ['title']); calls.titleReads.push(['cached', header.id]); return { values: { title: titles.get(header.id) } } } },
    storage: { domain: { async open(spec) {
      calls.opens++; assert.equal(spec.name, 'whale_voice_catalog'); assert.equal(spec.layout, 'single')
      for (const value of records.values()) spec.tables.roots.valueSchema.parse(value)
      const table = {
        get: id => records.get(id), entries: () => [...records.entries()][Symbol.iterator](),
        async put(id, value) { calls.puts++; records.set(id, structuredClone(value)) },
        async update(id, updater) { calls.updates++; assert.ok(records.has(id)); const value = updater(records.get(id)); records.set(id, structuredClone(value)); return structuredClone(value) },
      }
      f.table = table
      return { table(name) { assert.equal(name, 'roots'); return table }, async close() { calls.closes++ } }
    } } },
  }
  const ctx = { get: name => services[name] }
  const f = { root, origin, services, ctx, live, persisted, presentations, titles, records, calls }
  f.catalog = createVoiceCatalog(ctx, { runtimeApi, now, ...options })
  f.register = agent => f.catalog.registerKnownRoot({ root: agent, origin, policyFingerprint: POLICY, visibility: 'hidden' })
  f.read = extra => f.catalog.list({ policyFingerprint: POLICY, ...extra })
  f.select = (id, extra) => f.catalog.inspectSelection(id, { policyFingerprint: POLICY, ...extra })
  return f
}
const code = expected => cause => cause.code === expected

async function knownCold(f, id, createdAt = 100) {
  const root = f.root(id, createdAt)
  await f.register(root)
  f.live.delete(id)
  return root
}

test('empty catalog neither guesses legacy voice chats nor scans ordinary sessions', async () => {
  const f = fixture(); f.root('unnamed-v050-root'); f.root('ordinary-work-session')
  assert.deepEqual(await f.read(), { items: [], nextCursor: null, total: 0, selectionRequired: true })
  await assert.rejects(f.select('unnamed-v050-root'), code('VOICE_CATALOG_UNKNOWN_ROOT'))
  assert.deepEqual(f.calls.stats, []); assert.equal(f.calls.flushes, 0); assert.equal(f.calls.puts, 0)
  await f.catalog.dispose(); assert.equal(f.calls.closes, 1)
})

test('register confirms native durability before minimal metadata and keeps every old root', async () => {
  const f = fixture(), barrier = deferred(), entered = deferred(), first = f.root('first', 100)
  f.services.sessionPersistence.flush = async () => { f.calls.flushes++; entered.resolve(); await barrier.promise }
  const write = f.register(first); await entered.promise
  assert.equal(f.records.size, 0); barrier.resolve(); await write
  const second = f.root('second', 200); await f.register(second)
  assert.equal(f.records.size, 2); assert.equal(f.calls.puts, 2)
  assert.deepEqual(f.records.get('first'), { rootSessionId: 'first', originSessionId: 'origin', createdAt: 100, policyFingerprint: POLICY, visibility: 'hidden' })
  await f.register(first); assert.equal(f.calls.puts, 2)
  assert.equal(f.calls.flushes, 2)
  await f.catalog.dispose()
})

test('registration rejects ID substitutes, ordinary origins, fork/child roots and missing hiding', async () => {
  const f = fixture(), root = f.root('voice')
  assert.throws(() => f.catalog.registerKnownRoot({ root: { ...root }, origin: f.origin, policyFingerprint: POLICY, visibility: 'hidden' }), code('VOICE_CATALOG_CALLER_NOT_LIVE'))
  assert.throws(() => f.catalog.registerKnownRoot({ root, origin: { ...f.origin }, policyFingerprint: POLICY, visibility: 'hidden' }), code('VOICE_CATALOG_CALLER_NOT_LIVE'))
  await assert.rejects(f.register(f.origin), code('VOICE_CATALOG_NOT_INDEPENDENT'))
  for (const mutation of [{ parentSession: 'origin' }, { origin: 'subagent' }, { isSeeded: true }]) {
    const candidate = f.root(`child-${Object.keys(mutation)[0]}`); Object.assign(candidate.session.header, mutation)
    await assert.rejects(f.register(candidate), code('VOICE_CATALOG_NOT_INDEPENDENT'))
  }
  f.presentations.delete('voice')
  await assert.rejects(f.register(root), code('VOICE_CATALOG_PRESENTATION_MISMATCH'))
  assert.equal(f.calls.puts, 0)
})

test('cross-source explicit selection returns the known root without merging or replacing origin', async () => {
  const f = fixture(), root = await knownCold(f, 'voice-root'), otherOrigin = f.root('other-origin')
  const result = await f.select('voice-root')
  assert.equal(result.action, 'resume'); assert.equal(result.identity.originSessionId, 'origin')
  assert.equal(result.entry.status, 'available'); assert.equal(f.calls.puts, 1)
  f.live.set(root.id, root)
  await f.catalog.registerKnownRoot({ root, origin: otherOrigin, policyFingerprint: POLICY, visibility: 'hidden' })
  await f.catalog.markSelected(root.id, { root, policyFingerprint: POLICY })
  assert.equal(f.records.get(root.id).originSessionId, 'origin')
  assert.equal(f.records.get(root.id).lastSelectedAt, 10000)
  assert.equal(f.records.size, 1)
})

test('policy mismatch preserves identity while hiding titles and rejecting restoration', async () => {
  const f = fixture(); await knownCold(f, 'voice'); f.titles.set('voice', 'private title')
  f.calls.stats.length = 0
  const result = await f.read({ policyFingerprint: OTHER_POLICY })
  assert.equal(result.items[0].status, 'permission-limited'); assert.equal(result.items[0].reason, 'policy_mismatch')
  assert.equal(result.items[0].title, null); assert.equal(result.items[0].canResume, false)
  assert.deepEqual(f.calls.stats, []); assert.deepEqual(f.calls.titleReads, [])
  await assert.rejects(f.catalog.inspectSelection('voice', { policyFingerprint: OTHER_POLICY }), cause => cause.code === 'VOICE_CATALOG_SELECTION_BLOCKED' && cause.reason === 'policy_mismatch')
  assert.equal(f.records.size, 1); assert.equal(f.calls.updates, 0)
})

test('catalog withholds the live title when the registered ID now refers to a different session', async () => {
  const f = fixture()
  const root = await knownCold(f, 'voice')
  const replacement = { ...root, session: { ...root.session, header: { ...root.session.header, createdAt: 200 } } }
  f.live.set(root.id, replacement)
  f.titles.set(root.id, 'unrelated session title')
  const page = await f.read()
  assert.equal(page.items[0].status, 'unavailable')
  assert.equal(page.items[0].reason, 'root_identity_mismatch')
  assert.equal(page.items[0].title, null)
  assert.deepEqual(f.calls.titleReads, [])
  await f.catalog.dispose()
})

test('archiving is separate from hiding and never silently unarchives or replaces a root', async () => {
  const f = fixture(); await knownCold(f, 'archived'); f.services.workspaceRegistry.archivedSessionIds.push('archived')
  const result = (await f.read()).items[0]
  assert.equal(result.status, 'archived'); assert.equal(result.reason, 'restore_in_host'); assert.equal(result.canResume, false)
  await assert.rejects(f.select('archived'), cause => cause.reason === 'restore_in_host')
  assert.deepEqual(f.services.workspaceRegistry.archivedSessionIds, ['archived']); assert.equal(f.records.size, 1)
  delete f.services.workspaceRegistry.archivedSessionIds
  assert.equal((await f.read()).items[0].reason, 'archive_state_unavailable')
  await assert.rejects(f.select('archived'), cause => cause.reason === 'archive_state_unavailable')
})

test('live roots held elsewhere are not resumed; only the manager’s exact live root can be reused', async () => {
  const f = fixture(), root = f.root('voice'); await f.register(root)
  const elsewhere = (await f.read()).items[0]
  assert.equal(elsewhere.status, 'live'); assert.equal(elsewhere.residency, 'elsewhere'); assert.equal(elsewhere.canResume, false)
  await assert.rejects(f.select(root.id), cause => cause.reason === 'live_elsewhere')
  await assert.rejects(f.select(root.id, { ownedRoot: { ...root } }), code('VOICE_CATALOG_CALLER_NOT_LIVE'))
  const owned = await f.select(root.id, { ownedRoot: root })
  assert.equal(owned.action, 'use-owned-root'); assert.equal(owned.entry.residency, 'owned')
  f.live.delete(root.id)
  await assert.rejects(f.select(root.id, { ownedRoot: root }), code('VOICE_CATALOG_CALLER_NOT_LIVE'))
  assert.equal((await f.select(root.id)).action, 'resume')
})

test('missing, replaced, child, migrated, visibility-changed and unavailable roots remain in history', async () => {
  const f = fixture(); await knownCold(f, 'voice')
  const original = f.persisted.get('voice')
  for (const [snapshot, reason] of [
    [undefined, 'session_missing'],
    [{ header: { ...original.header, id: 'wrong' } }, 'root_identity_mismatch'],
    [{ header: { ...original.header, createdAt: 999 } }, 'root_identity_mismatch'],
    [{ header: { ...original.header, origin: 'subagent' } }, 'root_identity_mismatch'],
    [{ ...original, formatStatus: 'migration-required' }, 'native_migration_required'],
  ]) {
    f.persisted.set('voice', snapshot)
    assert.equal((await f.read()).items[0].reason, reason)
    await assert.rejects(f.select('voice'), cause => cause.reason === reason)
  }
  f.persisted.set('voice', original)
  assert.equal((await f.read({ visibility: 'workspace' })).items[0].reason, 'visibility_mismatch')
  f.presentations.delete('voice')
  assert.equal((await f.read()).items[0].reason, 'presentation_mismatch')
  assert.equal(f.records.size, 1)
})

test('catalog sorts stable creation-time/ID pages with opaque bounded cursors and no default selection', async () => {
  const f = fixture()
  for (const [id, time] of [['b', 200], ['a', 200], ['old', 100], ['new', 300]]) await knownCold(f, id, time)
  const first = await f.read({ limit: 2 })
  assert.deepEqual(first.items.map(item => item.rootSessionId), ['new', 'a'])
  assert.equal(typeof first.nextCursor, 'string'); assert.equal(first.selectionRequired, true)
  // A new chat ahead of the cursor neither duplicates nor hides earlier history.
  await knownCold(f, 'newer', 400)
  const second = await f.read({ limit: 2, cursor: first.nextCursor })
  assert.deepEqual(second.items.map(item => item.rootSessionId), ['b', 'old']); assert.equal(second.nextCursor, null); assert.equal(second.total, 5)
  for (const limit of [0, -1, 51, 1.5, '2', NaN]) await assert.rejects(f.read({ limit }), code('VOICE_CATALOG_INVALID_ARGUMENT'))
  for (const cursor of ['', '%%%', 'x'.repeat(2049), Buffer.from('[2,100,"a"]').toString('base64url'), Buffer.from('[1,-1,"a"]').toString('base64url'), Buffer.from('[1,100,"a",5]').toString('base64url')]) await assert.rejects(f.read({ cursor }), code('VOICE_CATALOG_INVALID_ARGUMENT'))
})

test('display uses only existing title projections, marks cached hints and preserves surrogate pairs', async () => {
  const f = fixture(), root = f.root('live-title'); await f.register(root)
  await knownCold(f, 'cached-title', 200); f.titles.set('cached-title', '旧的现有标题')
  f.titles.set(root.id, `${'x'.repeat(511)}😀tail`)
  const result = await f.read({ ownedRoot: root })
  assert.equal(result.items[0].titleSource, 'cached'); assert.equal(result.items[0].title, '旧的现有标题')
  assert.equal(result.items[1].titleSource, 'live'); assert.equal(result.items[1].title.length, 511); assert.equal(result.items[1].titleTruncated, true)
  f.services.sessionProjectionCache.cachedSnapshot = () => { throw new Error('optional cache offline') }
  assert.equal((await f.read()).items[0].title, null)
  assert.equal(f.calls.updates, 0)
})

test('schema and input limits reject malformed persisted identities rather than silently dropping rows', async () => {
  const baseline = { rootSessionId: 'voice', originSessionId: 'origin', createdAt: 100, policyFingerprint: POLICY, visibility: 'hidden' }
  for (const mutation of [
    { rootSessionId: 'x'.repeat(257) }, { originSessionId: ' ' }, { createdAt: 1.5 }, { createdAt: -1 },
    { createdAt: 8640000000000001 }, { lastSelectedAt: 99 }, { policyFingerprint: 'not-a-sha' },
    { visibility: 'public' }, { transcript: 'never store transcripts here' }, { rootSessionId: 'origin' },
  ]) {
    const f = fixture({ records: new Map([['voice', { ...baseline, ...mutation }]]) })
    await assert.rejects(f.read(), code('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED'))
    assert.equal(f.records.size, 1); assert.equal(f.calls.puts, 0)
  }
  const wrongKey = fixture({ records: new Map([['wrong-key', baseline]]) })
  await assert.rejects(wrongKey.read(), code('VOICE_CATALOG_INVALID_RECORD'))
  const f = fixture(), root = f.root('x'.repeat(256)); await f.register(root)
  assert.equal((await f.read()).items[0].rootSessionId.length, 256)
  assert.throws(() => f.catalog.registerKnownRoot({ root, origin: f.origin, policyFingerprint: 'f'.repeat(65), visibility: 'hidden' }), code('VOICE_CATALOG_INVALID_ARGUMENT'))
})

test('unconfirmed flush blocks queued registrations and does not create a replacement or retry', async () => {
  const f = fixture(), first = f.root('first'), second = f.root('second'), gate = deferred(), entered = deferred()
  f.services.sessionPersistence.flush = async () => { f.calls.flushes++; entered.resolve(); await gate.promise }
  const firstWrite = f.register(first); await entered.promise; const nextWrite = f.register(second)
  gate.reject(new Error('native flush outcome unknown'))
  await assert.rejects(firstWrite, code('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED'))
  await assert.rejects(nextWrite, code('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED'))
  await assert.rejects(f.read(), code('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED'))
  await assert.rejects(f.register(first), code('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED'))
  assert.equal(f.calls.flushes, 1); assert.equal(f.calls.puts, 0); assert.equal(f.catalog.status().blocked, true)
  assert.equal(f.persisted.size, 3)
})

test('native metadata write uncertainty preserves observed history and forbids retry or false confirmation', async () => {
  const f = fixture(); await f.read(); const root = f.root('voice')
  f.table.put = async (id, value) => { f.calls.puts++; f.records.set(id, value); throw new Error('unknown-state after write') }
  await assert.rejects(f.register(root), cause => cause.code === 'VOICE_CATALOG_PERSISTENCE_UNCONFIRMED' && cause.persistenceConfirmed === false)
  await assert.rejects(f.register(root), code('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED'))
  assert.equal(f.records.size, 1); assert.equal(f.calls.puts, 1); assert.equal(f.calls.flushes, 1)
  await f.catalog.dispose(); assert.equal(f.calls.closes, 1)
})

test('selection bookkeeping is explicit, monotonic and does not rewrite immutable identity', async () => {
  let now = 500
  const f = fixture({ now: () => now }), root = f.root('voice', 100); await f.register(root)
  await f.read({ ownedRoot: root }); await f.select(root.id, { ownedRoot: root })
  assert.equal(f.records.get(root.id).lastSelectedAt, undefined)
  await f.catalog.markSelected(root.id, { root, policyFingerprint: POLICY }); now = 200
  await f.catalog.markSelected(root.id, { root, policyFingerprint: POLICY })
  assert.equal(f.records.get(root.id).lastSelectedAt, 500)
  const previous = structuredClone(f.records.get(root.id))
  await assert.rejects(f.catalog.markSelected(root.id, { root, policyFingerprint: OTHER_POLICY }), cause => cause.reason === 'policy_mismatch')
  assert.deepEqual(f.records.get(root.id), previous)
})

test('cancel and dispose stop pending admission without fabricating a successful mutation', async () => {
  const f = fixture(), root = f.root('voice'), controller = new AbortController()
  controller.abort()
  await assert.rejects(f.catalog.registerKnownRoot({ root, origin: f.origin, policyFingerprint: POLICY, visibility: 'hidden' }, { signal: controller.signal }), { name: 'AbortError' })
  assert.equal(f.calls.opens, 0); assert.equal(f.calls.flushes, 0)
  await f.read(); await Promise.all([f.catalog.dispose(), f.catalog.dispose()])
  await assert.rejects(f.read(), code('VOICE_CATALOG_CLOSED'))
  assert.equal(f.calls.closes, 1)
})

test('runtime importer is authoritative and unavailable native storage never becomes an in-memory success', async () => {
  const f = fixture({ options: { runtimeApi: undefined, loadRuntimeApi: async () => { throw new Error('official loader unavailable') } } })
  await assert.rejects(f.read(), code('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED'))
  assert.equal(f.calls.opens, 0)
  const g = fixture(); delete g.services.storage
  await assert.rejects(g.read(), code('VOICE_CATALOG_PERSISTENCE_UNCONFIRMED'))
  assert.equal(g.records.size, 0)
})


test('long multibyte IDs round-trip cursors and short labels without splitting Unicode', async () => {
  const f = fixture(), longId = '语'.repeat(256)
  await knownCold(f, longId, 200); await knownCold(f, '😀'.repeat(128), 100)
  const first = await f.read({ limit: 1 })
  assert.equal(first.nextCursor.length > 512, true)
  const second = await f.read({ cursor: first.nextCursor, limit: 1 })
  assert.equal(second.items[0].rootSessionId, '😀'.repeat(128)); assert.equal(second.items[0].shortId, '😀'.repeat(8))
  await assert.rejects(f.select('bad\ud800'), code('VOICE_CATALOG_INVALID_ARGUMENT'))
})

test('archive and presentation changes during metadata reads are rechecked before selection', async () => {
  const f = fixture(); await knownCold(f, 'voice')
  const nativeStat = f.services.sessionPersistence.stat
  f.services.sessionPersistence.stat = async id => { const result = await nativeStat(id); f.services.workspaceRegistry.archivedSessionIds.push(id); return result }
  await assert.rejects(f.select('voice'), cause => cause.reason === 'restore_in_host')
  f.services.workspaceRegistry.archivedSessionIds.length = 0
  f.services.sessionPersistence.stat = async id => { const result = await nativeStat(id); f.presentations.delete(id); return result }
  await assert.rejects(f.select('voice'), cause => cause.reason === 'presentation_mismatch')
  assert.equal(f.calls.titleReads.length, 1)
})

test('registration rechecks exact live Agents and lifecycle after a delayed durability barrier', async () => {
  for (const mutation of [f => f.live.delete('origin'), f => f.services.workspaceRegistry.archivedSessionIds.push('voice')]) {
    const f = fixture(), root = f.root('voice'), entered = deferred(), barrier = deferred()
    f.services.sessionPersistence.flush = async () => { entered.resolve(); await barrier.promise }
    const pending = f.register(root); await entered.promise; mutation(f); barrier.resolve()
    await assert.rejects(pending); assert.equal(f.calls.puts, 0); assert.equal(f.records.size, 0)
  }
})

test('concurrent registration serializes the same root without duplicate native writes', async () => {
  const f = fixture(), root = f.root('voice')
  await Promise.all([f.register(root), f.register(root), f.register(root)])
  assert.equal(f.calls.opens, 1); assert.equal(f.calls.flushes, 1); assert.equal(f.calls.puts, 1); assert.equal(f.records.size, 1)
})

test('official Loader imports keep the receiver and dispose closes an opening native domain once', async () => {
  const f = fixture({ options: { runtimeApi: undefined } }), imports = [], gate = deferred(), entered = deferred()
  f.services.loader = {
    async import(specifier) {
      assert.equal(this, f.services.loader); imports.push(specifier)
      return specifier === 'zod' ? { z } : runtimeApi
    },
  }
  const nativeOpen = f.services.storage.domain.open
  f.services.storage.domain.open = async spec => { entered.resolve(); await gate.promise; return nativeOpen(spec) }
  const opening = f.read(); const refused = assert.rejects(opening, code('VOICE_CATALOG_CLOSED'))
  await entered.promise; const disposing = f.catalog.dispose(); gate.resolve()
  await Promise.all([refused, disposing])
  assert.deepEqual(imports.sort(), ['@deepseek-ai/dsh-storage-domain', 'zod'])
  assert.equal(f.calls.opens, 1); assert.equal(f.calls.closes, 1)
})

test('durable backend provenance is preserved and conflicting re-registration is rejected', async()=>{
 const f=fixture(),root=f.root('compat-root')
 const entry={root,origin:f.origin,policyFingerprint:POLICY,visibility:'hidden',handoffBackend:'compat_domain_v1'}
 await f.catalog.registerKnownRoot(entry)
 assert.equal(f.records.get(root.id).handoffBackend,'compat_domain_v1')
 await assert.rejects(f.catalog.registerKnownRoot({...entry,handoffBackend:'native_team'}),code('VOICE_CATALOG_IDENTITY_CONFLICT'))
 f.live.delete(root.id)
 assert.equal((await f.select(root.id)).identity.handoffBackend,'compat_domain_v1')
 await f.catalog.dispose()
})
