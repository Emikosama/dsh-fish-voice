import test from 'node:test'
import assert from 'node:assert/strict'
import { createVoiceCacheWarmup } from '../voice-cache-warmup.mjs'

const message = (role, text) => ({ role, content: [{ type: 'text', text }] })
const longSystem = 'stable system prompt\n' + '鲸'.repeat(167_000)
const fixtureTools = [{ name: 'whale_voice_speak', description: 'speak', parameters: {} }]

function fixture({ chunks = [], history = [], inHistory, stream, timeoutMs, storedTools, systemText = longSystem } = {}) {
  const calls = []
  const tools = fixtureTools
  let preparations = 0
  const toolHistory = { tools: storedTools ?? tools, updates: [] }
  const voice = {
    status: 'idle',
    model: { current: () => ({ provider: 'fixture', model: 'voice', reasoningEffort: 'low' }) },
    session: { id: 'voice-1', deriveMessages: () => history, requestHeader: () => history.length ? {tools: toolHistory.tools} : undefined, toolHistory: () => toolHistory },
    followup() { assert.fail('warmup must not enqueue input') },
  }
  const services = {
    tools: { async resolve(input) {
      assert.equal(input.agent, voice)
      return { dispose() { calls.push('released') } }
    } },
    systemPrompt: { async assemble(input) {
      assert.equal(input.scope, voice)
      assert.equal(input.modelSelection.reasoningEffort, 'low')
      return { tools, text: systemText }
    } },
    llm: { async prepareCall(config, signal) {
      preparations++
      assert.deepEqual(config, { provider: 'fixture', model: 'voice', reasoningEffort: 'low', maxTokens: 1 })
      assert.equal(signal.aborted, false)
      return { config, systemPromptUpdate: inHistory && 'in-history', async *stream(options) {
        assert.deepEqual(calls, ['released'])
        calls.push(options)
        try {
          if (stream) yield* stream(options)
          else yield* chunks
        } finally { calls.push({ streamAborted: options.signal.aborted }) }
      } }
    } },
    agents: { withInitiator(agent, operation) { assert.equal(agent, voice); return operation() } },
  }
  const loadApi = async () => ({ renderPrompt: assembly => assembly.text, createSystemMessage: text => message('system', text) })
  const controller = new AbortController()
  return { calls, tools, toolHistory, voice, controller, services, preparations: () => preparations,
    warmup: createVoiceCacheWarmup(services, {loadApi, timeoutMs}) }
}

test('warmup sends the live route and system/tool/history prefix once and aborts at the first actual output', async () => {
  const history = [message('system', longSystem), message('user', 'Earlier'), message('assistant', 'Response')]
  const f = fixture({ history, chunks: [{ type: 'block-start' }, { type: 'text-delta', text: '' }, { type: 'reasoning-delta', text: 'x' }, { type: 'text-delta', text: 'unused' }] })
  const result = await f.warmup.run(f.voice, f.controller)
  assert.equal(result.status, 'first-output')
  assert.ok(result.firstOutputMs >= 0)
  const request = f.calls[1]
  assert.equal(request.sessionId, 'voice-1')
  assert.deepEqual(request.messages.slice(0, -1), history)
  assert.deepEqual(Object.keys(request.messages.at(-1)), ['role', 'content'])
  assert.equal(request.tools, f.tools)
  assert.equal(request.toolHistory, f.toolHistory)
  assert.deepEqual(f.calls[2], {streamAborted:true})
})

test('fresh roots and roots with changed schemas offer current tools instead of an empty or outdated tool fold', async () => {
  for (const history of [[], [message('system', 'stable system prompt'), message('user', 'Earlier')]]) {
    const f = fixture({ history, storedTools: [{ name: 'older_tool' }], chunks: [{ type: 'text-delta', text: 'x' }] })
    assert.equal((await f.warmup.run(f.voice, f.controller)).status, 'first-output')
    assert.equal(f.calls[1].toolHistory, undefined)
    assert.equal(f.calls[1].tools, f.tools)
  }
})

test('attachment or changed in-history prompt never leaves the session as a warmup payload', async () => {
  for (const history of [
    [message('system', 'stable system prompt'), { role: 'user', content: [{ type: 'image', attachment: {} }] }],
    [message('system', 'old system prompt'), message('user', 'earlier text')],
  ]) {
    const f = fixture({ history, inHistory: true, chunks: [{ type: 'tool-call-delta', name: 'whale_voice_speak' }] })
    assert.equal((await f.warmup.run(f.voice, f.controller)).status, 'first-output')
    assert.equal(f.calls[1].toolHistory, undefined)
    assert.deepEqual(f.calls[1].messages, [message('system', longSystem), message('user', '·')])
    assert.deepEqual(f.calls[2], {streamAborted:true})
  }
})

test('inputs equal to the local 100k-token estimate skip preparing or dispatching', async () => {
  const overhead = JSON.stringify({ messages: [message('system', ''), message('user', '·')], tools: fixtureTools }).length
  const f = fixture({ systemText: 'x'.repeat(470_000 - overhead) })
  assert.deepEqual(await f.warmup.run(f.voice, f.controller), { status: 'skipped-short-input', estimatedInputTokens: 100_000 })
  assert.equal(f.preparations(), 0)
  assert.deepEqual(f.calls, ['released'])
})

test('English input sizes from the 91.6k and 100k real comparisons fall on opposite sides of the gate', async () => {
  const medium = fixture({ systemText: 'x'.repeat(431_906) })
  assert.equal((await medium.warmup.run(medium.voice, medium.controller)).status, 'skipped-short-input')
  assert.equal(medium.preparations(), 0)
  const large = fixture({ systemText: 'x'.repeat(471_572), chunks: [{ type: 'text-delta', text: 'x' }] })
  assert.equal((await large.warmup.run(large.voice, large.controller)).status, 'first-output')
  assert.equal(large.preparations(), 1)
})

test('an alternate adapter projection that removes long history rechecks the gate before dispatch', async () => {
  const f = fixture({
    systemText: 'new short prompt',
    history: [message('system', 'old prompt'), message('user', longSystem)],
    inHistory: true,
  })
  assert.equal((await f.warmup.run(f.voice, f.controller)).status, 'skipped-short-input')
  assert.equal(f.preparations(), 1)
  assert.deepEqual(f.calls, ['released'])
})

test('foreground cancellation aborts the auxiliary stream and a host without prepare support skips the work', async () => {
  const entered = Promise.withResolvers()
  const f = fixture({ async *stream(options) {
    const done = new Promise(resolve => options.signal.addEventListener('abort', resolve, {once:true}))
    entered.resolve()
    await done
  } })
  const pending = f.warmup.run(f.voice, f.controller)
  await entered.promise
  f.controller.abort()
  assert.deepEqual(await pending, {status:'cancelled'})
  assert.deepEqual(f.calls[2], {streamAborted:true})
  f.services.llm = {}
  assert.equal(f.warmup.supported(), false)
  assert.deepEqual(await f.warmup.run(f.voice, new AbortController()), {status:'unsupported'})
})
