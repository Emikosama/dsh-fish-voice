import assert from 'node:assert/strict'
import { test } from 'node:test'
import { inspectNativeDeepSeekFastRoute, prepareNativeDeepSeekFastCall } from '../voice-fast-route.mjs'

class DeepSeekAdapter {
  constructor(name = 'DeepSeek Account') { this.name = name }
  providerInfo(provider) { return { id: provider, name: this.name } }
}

function llmWith(provider, adapter) {
  return { adapters: new Map([[provider, { adapter }]]) }
}

test('recognizes only the stock DeepSeek adapter on its fixed rc.3 routes', () => {
  for (const [provider, owner] of [['deepseek-account', 'DeepSeek Account'], ['deepseek-official', 'DeepSeek']]) {
    const llm = llmWith(provider, new DeepSeekAdapter(owner))
    const registration = llm.adapters.get(provider)
    assert.deepEqual(inspectNativeDeepSeekFastRoute(llm, provider), {
      supported: true,
      provider,
      owner,
      protocol: 'deepseek-messages-v1',
      reasoningEffort: 'off',
      thinkingType: 'disabled',
    })
    assert.equal(llm.adapters.get(provider), registration, 'inspection must not rewrite registration')
  }
})

test('a matching provider name does not identify a stock adapter', () => {
  class Impersonator {
    providerInfo(provider) { return { id: provider, name: 'DeepSeek Account' } }
  }
  assert.deepEqual(inspectNativeDeepSeekFastRoute(llmWith('deepseek-account', new Impersonator()), 'deepseek-account'), {
    supported: false,
    reason: 'adapter_not_stock_deepseek',
  })
})

test('unknown routes, changed host registry, and owner mismatches fail closed', () => {
  assert.deepEqual(inspectNativeDeepSeekFastRoute({ adapters: new Map() }, 'custom-provider'), {
    supported: false,
    reason: 'provider_not_stock_deepseek',
  })
  assert.deepEqual(inspectNativeDeepSeekFastRoute({}, 'deepseek-account'), {
    supported: false,
    reason: 'host_registration_shape_changed',
  })
  assert.deepEqual(inspectNativeDeepSeekFastRoute(llmWith('deepseek-account', new DeepSeekAdapter('Renamed')), 'deepseek-account'), {
    supported: false,
    reason: 'provider_identity_mismatch',
  })
})

test('prepares explicit off through the host and leaves dispatch to the actual voice turn', async () => {
  const adapter = new DeepSeekAdapter()
  let preparedConfig
  let streamed = false
  const call = { config: { provider: 'deepseek-account', model: 'uncatalogued', reasoningEffort: 'off' }, stream() { streamed = true } }
  const llm = llmWith('deepseek-account', adapter)
  llm.prepareCall = async (config, signal) => {
    preparedConfig = { config, signal }
    return call
  }
  const signal = new AbortController().signal
  const result = await prepareNativeDeepSeekFastCall(llm, { provider: 'deepseek-account', model: 'uncatalogued', maxTokens: 16, signal })
  assert.deepEqual(preparedConfig, {
    config: { provider: 'deepseek-account', model: 'uncatalogued', maxTokens: 16, reasoningEffort: 'off' },
    signal,
  })
  assert.equal(result.call, call)
  assert.equal(result.route.thinkingType, 'disabled')
  assert.equal(streamed, false)
})

test('propagates host model-admission failures without substituting another effort', async () => {
  const llm = llmWith('deepseek-account', new DeepSeekAdapter())
  const admission = Object.assign(new Error('model refused'), { code: 'MODEL_UNSUPPORTED' })
  llm.prepareCall = async () => { throw admission }
  await assert.rejects(prepareNativeDeepSeekFastCall(llm, { provider: 'deepseek-account', model: 'refused' }), error => error === admission)
})

test('refuses preparation if the host drops off from the captured config', async () => {
  const llm = llmWith('deepseek-account', new DeepSeekAdapter())
  llm.prepareCall = async () => ({ config: { provider: 'deepseek-account', model: 'model' }, stream() {} })
  await assert.rejects(
    prepareNativeDeepSeekFastCall(llm, { provider: 'deepseek-account', model: 'model' }),
    { code: 'VOICE_FAST_PREPARATION_MISMATCH' },
  )
})
