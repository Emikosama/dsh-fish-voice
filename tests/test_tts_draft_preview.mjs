import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { dispatchUiAction } from '../ui/host.mjs'
import { actionRequestCodec } from '../ui/src/conversation-contract.mjs'
import { createVoiceUiBridge } from '../voice-ui-bridge.mjs'
import { TTS_DEFAULTS } from '../voice-tts.mjs'

const actor = { session: { id: 'owner' } }
const signal = () => new AbortController().signal

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'whale-tts-draft-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const path = join(directory, 'config.json')
  writeFileSync(path, JSON.stringify({
    device: null,
    pttMouse: 0,
    speakerVerification: { enabled: false },
    voiceSessionId: null,
    voiceSession: { visibility: 'hidden' },
    tts: { ...TTS_DEFAULTS, provider: 'off' },
  }))
  const savedPreviews = [], draftPreviews = []
  const read = () => JSON.parse(readFileSync(path, 'utf8'))
  const bridge = createVoiceUiBridge({
    configPath: path,
    assertCaller: value => { if (value !== actor) throw new Error('无法验证来源会话') },
    readEffectiveConfig: read,
    readStatus: () => ({ voiceControlBusy: false, enabled: false, ownerSessionId: null, voiceSession: { id: null, fullyStopped: true } }),
    sessionControl: { owner: () => null, allowed: () => false, change: () => {} },
    readTtsStatus: () => ({ busy: false, blocked: false }),
    previewTts: previewSignal => { savedPreviews.push(previewSignal); return 'saved-preview' },
    previewDraftTts: (config, previewSignal) => { draftPreviews.push({ config, signal: previewSignal }); return 'draft-preview' },
  })
  return { bridge, path, directory, read, savedPreviews, draftPreviews }
}

test('preview-tts accepts only a complete owner-UI draft and leaves saved preview/config untouched', async t => {
  const f = fixture(t)
  const settings = f.bridge.readSettings(actor)
  const values = { ...settings.ttsSetup, provider: 'deepseek', deepseekTextTransmissionAccepted: true }
  const rawBefore = readFileSync(f.path, 'utf8')
  const schema = actionRequestCodec.create()

  assert.equal(schema.safeParse({ action: 'preview-tts' }).success, true)
  assert.equal(schema.safeParse({ action: 'preview-tts', revision: settings.revision }).success, false)
  assert.equal(schema.safeParse({ action: 'preview-tts', values }).success, false)
  assert.equal(schema.safeParse({ action: 'preview-tts', revision: settings.revision, values }).success, true)
  assert.equal(schema.safeParse({ action: 'preview-tts', revision: settings.revision, values: { ...values, hidden: true } }).success, false)
  assert.equal(schema.safeParse({ action: 'preview-tts', text: 'custom text' }).success, false)

  await assert.rejects(dispatchUiAction(f.bridge, actor, { action: 'preview-tts', revision: settings.revision, values }, signal(), false), /只有用户界面/)
  await assert.rejects(f.bridge.previewTts(actor, signal(), { revision: settings.revision, values }), /只有用户界面/)
  await assert.rejects(dispatchUiAction(f.bridge, actor, { action: 'preview-tts', revision: settings.revision }, signal(), true), /同时提供/)

  const previewSignal = signal()
  const result = await dispatchUiAction(f.bridge, actor, { action: 'preview-tts', revision: settings.revision, values }, previewSignal, true)
  assert.equal(result.value, 'draft-preview')
  assert.equal(f.draftPreviews.length, 1)
  assert.deepEqual(f.draftPreviews[0].config, values)
  assert.equal(f.draftPreviews[0].signal, previewSignal)
  assert.equal(f.savedPreviews.length, 0)
  assert.equal(readFileSync(f.path, 'utf8'), rawBefore)

  assert.equal(await f.bridge.previewTts(actor, signal()), 'saved-preview')
  assert.equal(f.savedPreviews.length, 1)
  assert.equal(f.savedPreviews[0] instanceof AbortSignal, true)
  assert.equal(f.draftPreviews.length, 1)
})

test('draft preview validates current revision, full TTS settings, provider and DeepSeek text consent', async t => {
  const f = fixture(t)
  const settings = f.bridge.readSettings(actor)
  const local = {
    ...settings.ttsSetup,
    provider: 'local',
    localModelId: 'draft-model',
    localModelPath: join(f.directory, 'model'),
  }
  const before = readFileSync(f.path, 'utf8')
  const result = await f.bridge.previewTts(actor, signal(), { revision: settings.revision, values: local }, true)
  assert.equal(result, 'draft-preview')
  assert.equal(f.draftPreviews[0].config.provider, 'local')
  assert.equal(readFileSync(f.path, 'utf8'), before)

  const deepseekWithoutConsent = { ...settings.ttsSetup, provider: 'deepseek', deepseekTextTransmissionAccepted: false }
  await assert.rejects(f.bridge.previewTts(actor, signal(), { revision: settings.revision, values: deepseekWithoutConsent }, true), { code: 'TTS_DEEPSEEK_CONSENT_REQUIRED' })
  await assert.rejects(f.bridge.previewTts(actor, signal(), { revision: settings.revision, values: { ...local, hidden: true } }, true), { code: 'TTS_INVALID_SETTINGS' })
  await assert.rejects(f.bridge.previewTts(actor, signal(), { revision: settings.revision, values: { ...settings.ttsSetup, provider: 'off' } }, true), /未选择朗读服务/)
  await assert.rejects(f.bridge.previewTts(actor, signal(), { revision: 'stale', values: local }, true), /配置已改变/)
  assert.equal(f.draftPreviews.length, 1)
  assert.equal(readFileSync(f.path, 'utf8'), before)
})
