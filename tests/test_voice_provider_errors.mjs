import test from 'node:test'
import assert from 'node:assert/strict'
import { explainVoiceProviderFailure } from '../voice-provider-errors.mjs'

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
