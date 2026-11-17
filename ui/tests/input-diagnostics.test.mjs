/** Synthetic transport and React DOM only; no physical microphone assertions. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'
import { decodeReply } from '../src/protocol.mjs'
import { renderAvailable, renderControls } from '../../tests/helpers/render-controls.mjs'

const initialStatus = { ownerSessionId: 'A', enabled: true, helper: { online: true, lastError: null }, voiceControlBusy: false, voiceSession: { id: 'voice-A', fullyStopped: false }, listenMode: 'ptt' }
const settings = { revision: '1', values: { device: null, pttMouse: 2, speakerVerification: { enabled: false } }, voiceSession: { visibility: 'hidden' } }

test('status diagnostics accept the bounded optional string and reject malformed error payloads', () => {
  for (const lastError of [undefined, null, '', 'a'.repeat(512)]) assert.doesNotThrow(() => decodeReply('status', { ...initialStatus, helper: { online: true, lastError } }))
  for (const lastError of [{ message: 'bad' }, [], 42, 'a'.repeat(513)]) assert.throws(() => decodeReply('status', { ...initialStatus, helper: { online: true, lastError } }), /audio diagnostic/)
})

test('advanced diagnostics expose the latest native error as escaped text without starting audio', { skip: !renderAvailable }, async t => {
  const calls = []
  let status = structuredClone(initialStatus)
  const controller = createController(async (_id, { action }) => {
    calls.push(action)
    if (action === 'status') return structuredClone(status)
    if (action === 'read-settings') return settings
    if (action === 'read-output-volume') return { supported: false, volume: null, revision: null }
    if (action === 'agent-requests') return { schema: 1, humanRevision: 0, items: [] }
    if (action === 'inspect-performance') return { modes: [] }
    throw Error(`Unexpected mutation or read: ${action}`)
  })
  controller.setSession('A')
  await controller.run('A', 'status')
  await controller.run('A', 'read-settings')
  const ui = await renderControls(t, { owner: { id: 'A' }, controller })
  t.after(() => controller.dispose())
  assert.equal(ui.container.querySelector('[data-whale-helper-error]'), null, 'raw errors never appear on home')
  await ui.act(async () => controller.openSettings('audio'))
  // The settings page already has a valid older status. Selecting Advanced must
  // still read the newer backend cache instead of requiring a manual refresh.
  status.helper.lastError = 'PortAudio: <img src=x onerror=bad()> invalid sample rate'
  const readsBefore = calls.filter(action => action === 'status').length
  await ui.act(async () => { ui.button('高级').click(); await new Promise(resolve => setTimeout(resolve, 60)) })
  const diagnostic = ui.container.querySelector('[data-whale-helper-error]')
  assert.ok(diagnostic, 'the native error is visible inside advanced diagnostics')
  assert.ok(calls.filter(action => action === 'status').length > readsBefore)
  assert.equal(diagnostic.querySelector('pre').textContent, status.helper.lastError)
  assert.equal(diagnostic.querySelector('img'), null, 'backend strings remain text, not markup')
  assert.match(diagnostic.textContent, /可能来自之前的尝试/)
  assert.equal(diagnostic.closest('details').open, false, 'private details remain collapsed by default')
  await ui.act(async () => controller.showHome())
  assert.equal(ui.container.querySelector('[data-whale-helper-error]'), null)
  assert.doesNotMatch(ui.container.textContent, /PortAudio|invalid sample rate/)
  // Returning to the diagnostic page must not keep a previous error after a
  // newer status has explicitly cleared it.
  status.helper.lastError = null
  await ui.act(async () => controller.openSettings('advanced'))
  assert.equal(ui.container.querySelector('[data-whale-helper-error]'), null)
  assert.ok(calls.every(action => ['status', 'read-settings', 'read-output-volume', 'agent-requests', 'inspect-performance', 'read-audio-devices'].includes(action)), 'opening and leaving diagnostics performs only reads')
})

test('diagnostic text is hidden for an unverified or different-session snapshot', { skip: !renderAvailable }, async t => {
  const listeners = new Set()
  let state = { panelView: 'settings', settingsTab: 'advanced', busy: true, settings, settingsFor: 'A', checkedFor: 'B', status: { ...initialStatus, helper: { online: true, lastError: 'older session native error' } } }
  const controller = { getSnapshot: () => state, subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn) }, run: async () => false }
  const ui = await renderControls(t, { owner: { id: 'A' }, controller })
  assert.equal(ui.container.querySelector('[data-whale-helper-error]'), null)
  const update = async patch => ui.act(async () => { state = { ...state, ...patch }; for (const listener of listeners) listener() })
  await update({ checkedFor: 'A' })
  assert.equal(ui.container.querySelector('[data-whale-helper-error] pre').textContent, 'older session native error')
  await update({ uncertain: true })
  assert.equal(ui.container.querySelector('[data-whale-helper-error]'), null)
})
