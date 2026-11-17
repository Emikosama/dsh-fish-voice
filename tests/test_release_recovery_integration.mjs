import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createVoiceConfigRepairRuntime } from '../voice-config-repair-runtime.mjs'
import { explainVoiceProviderFailure } from '../voice-provider-errors.mjs'
import { conversationRemote } from '../ui/conversation-contract.mjs'
import { apply as applyRemote } from '../ui/conversation-remote.mjs'

async function fixture(t, chunks, bundled = false) {
  const dir = await mkdtemp(join(tmpdir(), 'whale-release-repair-'))
  t.after(() => rm(dir, { recursive: true, force: true }))
  const configPath = join(dir, 'config.json'), helper = join(dir, 'helper.py')
  const initial = { helperPath: join(dir, 'missing.py'), custom: { credential: 'fake-private-model-key' }, tts: { provider: 'off' } }
  await writeFile(configPath, JSON.stringify(initial))
  await writeFile(helper, '# fixture')
  const calls = [], notes = []
  const llm = { async prepareCall(route, signal) {
    calls.push(route)
    return { config: {}, async *stream(request) {
      assert.equal(request.signal, signal)
      assert.deepEqual(request.tools, [])
      assert.doesNotMatch(JSON.stringify(request.messages), /fake-private-model-key|helper\.py|missing\.py/)
      yield* chunks
    }}
  } }
  const runtime = createVoiceConfigRepairRuntime({
    ctx: { get: name => name === 'llm' ? llm : name === 'agentDefaultModel' ? { currentSelection: () => ({ provider: 'fixture', model: 'test' }) } : null },
    configPath, bundledHelperPath: helper, bundled, getSafeToWrite: () => true,
    log: note => notes.push(note), verifyHealth: ({ config }) => config.helperPath === helper,
  })
  t.after(() => runtime.dispose())
  return { runtime, initial, configPath, helper, calls, notes }
}

async function terminal(runtime) {
  for (let index = 0; index < 40; index++) {
    const state = runtime.request({ operation: 'status' })
    if (state.state !== 'running') return state
    await new Promise(resolve => setTimeout(resolve, 5))
  }
  assert.fail('repair did not settle')
}

test('actual failure and fresh owner confirmation select a fixed repair using a tool-free model', async t => {
  const response = [
    { type: 'text-delta', text: '{"repairId":"restore_bundled_helper_path"}' },
    { type: 'finish', reason: { kind: 'stop' } },
  ]
  const { runtime, calls, configPath, initial, helper } = await fixture(t, response)
  runtime.request({ operation: 'start', id: 'fake', confirmed: true })
  assert.equal(calls.length, 0)
  await runtime.failed('enable', { code: 'VOICE_HELPER_COMPONENT_MISSING' })
  const offer = runtime.request({ operation: 'status' }).offer
  assert.equal(offer.repairs[0].id, 'restore_bundled_helper_path')
  runtime.request({ operation: 'start', id: offer.id, confirmed: false })
  assert.equal(calls.length, 0)
  runtime.request({ operation: 'start', id: offer.id, confirmed: true })
  runtime.request({ operation: 'start', id: offer.id, confirmed: true })
  const result = await terminal(runtime)
  assert.equal(result.state, 'completed')
  assert.equal(calls.length, 1)
  assert.deepEqual(JSON.parse(await readFile(configPath, 'utf8')), { ...initial, helperPath: helper })
})

test('model instructions and tool requests cannot write or replace the original config', async t => {
  const { runtime, calls, configPath } = await fixture(t, [
    { type: 'tool-call', name: 'shell', arguments: { command: 'fixture' } },
  ])
  const original = await readFile(configPath)
  await runtime.failed('enable', { code: 'VOICE_HELPER_COMPONENT_MISSING' })
  const { offer } = runtime.request({ operation: 'status' })
  runtime.request({ operation: 'start', confirmed: true, id: offer.id })
  const result = await terminal(runtime)
  assert.equal(result.state, 'needs-feedback')
  assert.equal(calls.length, 1)
  assert.deepEqual(await readFile(configPath), original)
})

test('broken JSON and missing bundled helper offer recovery without sending a model request', async t => {
  const { runtime, calls, configPath, helper } = await fixture(t, [], true)
  await writeFile(configPath, '{"broken')
  await rm(helper)
  await runtime.failed('read-settings', new Error('configuration parse failed'))
  const { offer, recovery } = runtime.request({ operation: 'status' })
  assert.equal(recovery, 'manual-package-manager')
  assert.deepEqual(offer.repairs, [])
  assert.equal(calls.length, 0)
  assert.equal(await readFile(configPath, 'utf8'), '{"broken')
})

test('Windows UTF-8 BOM is accepted and ordinary UI errors with inherited defaults do not offer AI', async t => {
  const { runtime, calls, configPath } = await fixture(t, [], true)
  await writeFile(configPath, '\uFEFF{"custom":{"sentinel":true}}')
  await runtime.failed('save-tts', new Error('unrelated UI validation failed'))
  assert.equal(runtime.request({ operation: 'status' }).offer, null)
  assert.equal(calls.length, 0)
  assert.equal(await readFile(configPath, 'utf8'), '\uFEFF{"custom":{"sentinel":true}}')
})

test('official adapter 402 translates and similarly named third-party adapter keeps its message', () => {
  class DeepSeekAdapter { providerInfo(id) { return { id, name: 'DeepSeek' } } }
  const host = { adapters: new Map([['deepseek-official', { adapter: new DeepSeekAdapter() }]]) }
  assert.match(explainVoiceProviderFailure(host, 'deepseek-official', { status: 402, message: 'private' }).message, /额度不足/)
  const thirdParty = explainVoiceProviderFailure({}, 'deepseek-official', {
    status: 402, code: 'credit_limit', message: 'Upstream credit exceeded. Authorization: Bearer fake-secret-example https://example.test/?api_key=fake-credential',
  })
  assert.match(thirdParty.message, /第三方.*Upstream credit exceeded/)
  assert.doesNotMatch(thirdParty.message, /fake-secret-example|fake-credential/)
})

test('owner Gateway repair rejects non-owner and strict decoder rejects extra fields', async () => {
  let Remote, count = 0
  const ctx = {
    plugin: service => { Remote = service },
    effect() {},
    get: () => ({ import: async () => ({ TypertRemoteService: class { constructor(context) { this.ctx = context } } }) }),
    invocation: { peer: { principal: { kind: 'guest' } } },
    whaleVoiceSession: { repairAction() { count++; return { state: 'idle' } } },
  }
  await applyRemote(ctx)
  const remote = new Remote(ctx)
  assert.throws(() => remote.repairAction({ operation: 'status' }), /所有者/)
  assert.equal(count, 0)
  ctx.invocation.peer.principal.kind = 'owner'
  assert.deepEqual(JSON.parse(remote.repairAction({ operation: 'status' })), { state: 'idle' })
  const codec = conversationRemote.descriptors.find(item => item.method === 'repairAction').parameters[0].codec.create()
  assert.equal(codec.safeParse({ operation: 'start', id: 'example', confirmed: false }).success, false)
  assert.equal(codec.safeParse({ operation: 'start', id: 'example', confirmed: true, path: 'foreign' }).success, false)
  assert.equal(codec.safeParse({ operation: 'start', id: 'example', confirmed: true }).success, true)
})
