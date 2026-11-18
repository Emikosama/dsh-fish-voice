import test from 'node:test'
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { CLIENT_OPERATION_TTL_MS } from '../../voice-operation-log-contract.mjs'
import { createClientOperationJournal } from '../src/operation-log.mjs'

const scopeA = randomUUID(), scopeB = randomUUID()
const tab = () => {
  const data = new Map()
  return {
    getItem: key => data.get(key),
    setItem: (key, value) => data.set(key, value),
    removeItem: key => data.delete(key),
    dump: () => [...data.values()],
  }
}
const remote = (recordClientOperations, scope = scopeA) => ({
  readClientOperationScope: async () => ({ scope }),
  recordClientOperations,
})
function fixture(storage, at = 42) {
  const timers = new Map()
  let number = 0
  const journal = createClientOperationJournal({
    storage, schedule(fn, delay) { timers.set(++number, { fn, delay }); return number },
    unschedule(index) { timers.delete(index) },
    now: () => at,
    identify: randomUUID,
  })
  const next = async () => {
    const [index, item] = [...timers][0]
    timers.delete(index)
    item.fn()
    await new Promise(resolve => setImmediate(resolve))
    return item.delay
  }
  return { journal, timers, next }
}

test('operation journal retries a lost receipt with the same ids and excludes unknown operations', async () => {
  const { journal, timers, next } = fixture(tab())
  journal.user('page-settings')
  journal.user('private-content-is-not-an-action')
  assert.equal(timers.size, 0)
  const batches = []
  journal.attach(remote(async batch => {
    batches.push(batch)
    if (batches.length === 1) throw Error('Lost response')
    return { accepted:true }
  }))
  await next()
  journal.internal('ui-connect', 'finished', 'ok')
  assert.equal(await next(), 750)
  assert.equal(batches[0].scope, scopeA)
  assert.deepEqual(batches[0].events.map(({action,source}) => ({action,source})), [{action:'page-settings',source:'user'}])
  assert.deepEqual(batches[1].events[0], batches[0].events[0])
  assert.equal(batches[1].events[1].action, 'ui-connect')
  assert.equal(timers.size, 0)
  journal.dispose()
})

test('bounded operation journal reports overflow and preserves its counted marker across a lost reply', async () => {
  const storage = tab(), { journal, timers, next } = fixture(storage)
  for (let i = 0; i < 300; i++) journal.user('activate-control')
  const batches = []
  journal.attach(remote(async ({events}) => {
    batches.push(events)
    if (batches.length === 1) throw Error('Lost response')
    return { accepted:true }
  }))
  while (timers.size) await next()
  assert.deepEqual(batches.map(batch => batch.length), [64,64,64,64,64,1])
  assert.equal(batches[0][0].action,'ui-buffer-overflow')
  assert.equal(batches[0][0].count,44)
  assert.deepEqual(batches[0],batches[1])
  assert.deepEqual(storage.dump(),[])
  journal.dispose()
})

test('reload resumes unacknowledged same-tab events only after scope verification, then clears storage on ACK', async () => {
  const storage = tab()
  const before = fixture(storage)
  let original
  before.journal.attach(remote(async ({events}) => {
    original = events[0]
    return { accepted:false }
  }))
  before.journal.user('open-native-subagent')
  await before.next()
  assert.ok(storage.dump().some(text => text.includes(original.id)))
  before.journal.dispose()

  const after = fixture(storage)
  let recovered
  after.journal.attach(remote(async ({events,scope}) => {
    assert.equal(scope,scopeA)
    recovered = events
    return { accepted:true }
  }))
  await after.next()
  assert.deepEqual(recovered,[original])
  assert.deepEqual(storage.dump(),[])
  after.journal.dispose()
})

test('a different Host/profile or seven-day expiry prevents cached event replay', async () => {
  for (const [scope, at] of [[scopeB,42],[scopeA,42 + CLIENT_OPERATION_TTL_MS + 1]]) {
    const storage = tab()
    const before = fixture(storage)
    before.journal.attach(remote(async () => ({accepted:false})))
    before.journal.user('open-native-subagent')
    await before.next()
    assert.equal(storage.dump().length,1)
    before.journal.dispose()

    const after = fixture(storage,at)
    let submissions = 0
    after.journal.attach(remote(async () => { submissions++; return { accepted:true } },scope))
    await after.next()
    assert.equal(submissions,0)
    assert.deepEqual(storage.dump(),[])
    after.journal.dispose()
  }
})

test('a stale in-flight scope cannot clear or send events to a replacement scope', async () => {
  const storage = tab(), { journal, next } = fixture(storage)
  let current = scopeA, attempts = 0
  journal.attach({
    readClientOperationScope: async () => ({ scope:current }),
    recordClientOperations: async ({scope}) => { attempts++; assert.equal(scope,scopeA); return { accepted:scope === current } },
  })
  await next()
  journal.user('open-native-subagent')
  current = scopeB
  await next()
  await next()
  assert.equal(attempts,1)
  assert.deepEqual(storage.dump(),[])
  journal.dispose()
})
