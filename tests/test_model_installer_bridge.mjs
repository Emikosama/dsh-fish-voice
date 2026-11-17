import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createVoiceUiBridge } from '../voice-ui-bridge.mjs'

const actor = { session: { id: 'origin' } }
function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'whale-model-bridge-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  const path = join(dir, 'config.json')
  writeFileSync(path, JSON.stringify({ device: null, pttMouse: 2, speakerVerification: { enabled: false }, models: { campplus: '/private/keep.onnx', whisper: '/old/whisper' }, voiceSession: { allowedSessionIds: ['keep'] } }))
  const read = () => JSON.parse(readFileSync(path, 'utf8'))
  const state = { voiceControlBusy: false, enabled: false, ownerSessionId: null, voiceSession: { fullyStopped: true, id: null } }
  const calls = []
  let listener, beforeVerify = async () => {}
  const result = { recommendedSettings: { asr: 'whisper', modelCompute: 'cuda', models: { whisper: '/managed/new-whisper' } } }
  const installer = {
    snapshot: () => ({ jobs: [] }), subscribe: callback => { listener = callback; return () => { listener = null } },
    inspectCompute: async () => ({ default: 'cpu' }), plan: (...args) => { calls.push(['plan', ...args]); return {} },
    start: value => { calls.push(['start', value]); return {} }, pause: id => calls.push(['pause', id]),
    verifyInstalled: async () => { await beforeVerify(); return result },
  }
  let authorized = actor
  const bridge = createVoiceUiBridge({ configPath: path, readEffectiveConfig: read, readStatus: () => state, assertCaller: value => { if (value !== authorized) throw Error('unauthorized') }, sessionControl: { owner: () => null }, modelInstaller: () => installer })
  return { bridge, read, path, state, calls, invoke: () => listener?.({ jobs: [] }), setAuthorized: value => { authorized = value }, setBeforeVerify: value => { beforeVerify = value } }
}

test('installer commands require the exact live actor and reject extra fields', async t => {
  const f = fixture(t), forged = { session: { id: 'origin' } }
  assert.throws(() => f.bridge.readModelInstaller(forged), /unauthorized/)
  assert.throws(() => f.bridge.planModelInstall({ modelId: 'x', compute: 'cpu', url: 'evil' }, actor), /字段/)
  await assert.rejects(f.bridge.controlModelInstall({ id: 'x', operation: 'deleteEverything' }, actor), /不支持/)
  assert.equal(f.calls.length, 0)
  f.bridge.planModelInstall({ modelId: 'x', compute: 'cpu' }, actor)
  assert.deepEqual(f.calls, [['plan','x','cpu']])
})

test('installer subscription rechecks identity before each update', t => {
  const f = fixture(t)
  let delivered = 0
  const unsubscribe = f.bridge.subscribeModelInstaller(actor, () => delivered++)
  f.invoke(); assert.equal(delivered, 1)
  f.setAuthorized({ session: { id: 'origin' } })
  assert.throws(f.invoke, /unauthorized/)
  assert.equal(delivered, 1)
  unsubscribe()
})

test('apply is explicit, stopped-only, hash-verified and preserves unrelated private config', async t => {
  const f = fixture(t)
  const revision = f.bridge.readSettings(actor).revision
  const result = await f.bridge.applyModelInstall({ id: 'job', revision }, actor)
  assert.equal(f.read().modelCompute, 'cuda')
  assert.equal(f.read().models.whisper, '/managed/new-whisper')
  assert.equal(f.read().models.campplus, '/private/keep.onnx')
  assert.deepEqual(f.read().voiceSession.allowedSessionIds, ['keep'])
  assert.equal(result.runtimeLoaded, false)
  assert.equal(result.apply, 'restart-helper-required')
})

test('apply fails closed for a grant or config change during hash verification', async t => {
  for (const change of ['active', 'revision', 'actor', 'hash']) {
    const f = fixture(t)
    const revision = f.bridge.readSettings(actor).revision
    const before = f.read().models.whisper
    f.setBeforeVerify(async () => {
      if (change === 'active') f.state.enabled = true
      if (change === 'revision') writeFileSync(f.path, JSON.stringify({ ...f.read(), newField: true }))
      if (change === 'actor') f.setAuthorized({ session: { id: 'origin' } })
      if (change === 'hash') throw Error('hash mismatch')
    })
    await assert.rejects(f.bridge.applyModelInstall({ id: 'job', revision }, actor))
    assert.equal(f.read().models.whisper, before)
  }
})

test('local reuse plan and start preserve explicit directory and variant without applying', t => {
  const f=fixture(t), options={sourceDirectory:'D:\\models\\qwen',modelVariant:'q8_0'}
  f.bridge.planModelInstall({modelId:'qwen3-tts-base-1.7b-gguf',compute:'cpu',...options},actor)
  assert.deepEqual(f.calls[0],['plan','qwen3-tts-base-1.7b-gguf','cpu',options])
  const request={modelId:'qwen3-tts-base-1.7b-gguf',compute:'cpu',...options,planHash:'reuse-hash',accepted:true}
  f.bridge.startModelInstall(request,actor)
  assert.deepEqual(f.calls[1],['start',request])
  assert.equal(f.read().ttsSetup,undefined)
})
