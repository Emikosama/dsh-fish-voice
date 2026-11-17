import test from 'node:test'
import assert from 'node:assert/strict'
import { createStandaloneVoiceOrigin } from '../voice-standalone-origin.mjs'
import { isCompatHiddenVoiceId } from '../voice-presentation-id.mjs'

function fixture() {
  const runtime = new Map(), stored = new Map(), calls = []
  let enabled = true
  function attach(id, options) {
    const session = stored.get(id) ?? { id, header: { id } }
    stored.set(id, session)
    let model = options.agentOptions
    const agent = { session, model: { current: () => model, select: value => { model = value } } }
    runtime.set(id, agent)
    return { agent, async dispose() { runtime.delete(id) } }
  }
  const services = {
    agents: {
      get: id => runtime.get(id),
      async create(options) { calls.push(['create', options]); return attach(options.sessionId, options) },
      async resume(options) { calls.push(['resume', options]); return attach(options.resumeSessionId, options) },
    },
    sessionPersistence: { async stat(id) { return stored.get(id) } },
  }
  const context = { configPath: 'fixture/whale/config.json', getService: name => services[name], compatPresentation: { active: () => enabled } }
  return { context, calls, stored, disable: () => { enabled = false } }
}

test('opening standalone mode uses one hidden blank Agent and resumes the same origin on reload', async () => {
  const f = fixture()
  const origin = createStandaloneVoiceOrigin(f.context)
  assert.equal(origin.current(), null)
  assert.equal(f.calls.length, 0)
  const selection = { provider: 'local-fixture', model: 'test' }
  const [first, second] = await Promise.all([origin.acquire(selection), origin.acquire(selection)])
  assert.equal(first, second)
  assert.equal(isCompatHiddenVoiceId(first.session.id), true)
  assert.equal(f.calls.length, 1)
  assert.equal(f.calls[0][0], 'create')
  assert.equal(f.calls[0][1].meta, undefined)
  assert.deepEqual(first.model.current(), selection)
  await origin.dispose()
  assert.equal(origin.current(), null)
  const reloaded = createStandaloneVoiceOrigin(f.context)
  const resumed = await reloaded.acquire({ ...selection, model: 'latest-default' })
  assert.equal(resumed.session.id, first.session.id)
  assert.equal(resumed.model.current().model, 'latest-default')
  assert.equal(f.calls[1][0], 'resume')
  await reloaded.dispose()
})

test('standalone control fails closed if the hidden view is unavailable or ownership does not match', async () => {
  const f = fixture(), origin = createStandaloneVoiceOrigin(f.context)
  f.stored.set(origin.id, { id: origin.id, header: { id: origin.id, parentSession: 'foreign' } })
  await assert.rejects(origin.acquire(), { code: 'VOICE_ORIGIN_MISMATCH' })
  f.disable()
  await assert.rejects(origin.acquire(), { code: 'VOICE_HIDDEN_UNSUPPORTED' })
  assert.deepEqual(f.calls, [])
  await origin.dispose()
})
