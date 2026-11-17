/** Same-panel navigation never grants voice, installation, or external navigation authority. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createController } from './action-harness.mjs'

const response = (action, value) => ({ ok: true, value: { result: { kind: 'success', text: JSON.stringify({ protocol: 1, action, value }) } } })
const request = line => JSON.parse(line.slice('/whale-ear-ui '.length))
const tick = () => new Promise(resolve => setImmediate(resolve))
const deferred = () => { let resolve; const promise = new Promise(yes => { resolve = yes }); return { promise, resolve } }
const previewResult = { provider: 'edge', fallback: false, playbackCompleted: true, acousticConfirmation: false }
const settings = { revision: 'r1', values: { device: null, pttMouse: 2, speakerVerification: { enabled: false } }, onboarding: { version: 1, completed: true }, voiceSession: { visibility: 'hidden' } }
const status = { ownerSessionId: null, enabled: false, helper: { online: false } }
const client = readSetup => ({ subscribe() { return () => {} }, readSetup })
const surface = ui => ({ panelView: ui.getSnapshot().panelView, setupOpen: ui.getSnapshot().setupOpen })
const assertOnlyReads = calls => assert.ok(calls.every(({ action }) => ['read-settings', 'status'].includes(action)), JSON.stringify(calls))

function pendingPreview() {
  const playback = deferred(), cancellation = deferred(), calls = []
  const ui = createController((id, line, _attachments, signal) => {
    const { action } = request(line)
    calls.push({ id, action, signal })
    if (action === 'preview-tts') return playback.promise
    if (action === 'cancel-tts') {
      assert.equal(calls.find(call => call.action === 'preview-tts').signal.aborted, true, 'abort precedes backend stop')
      return cancellation.promise
    }
    throw Error(`Navigation sent unexpected command ${action}`)
  })
  return { ui, playback, cancellation, calls }
}

test('home, settings, and setup share local controller state without external Navigation', async () => {
  const calls = []
  const ui = createController(async (id, line) => {
    const { action } = request(line); calls.push({ id, action })
    return response(action, action === 'read-settings' ? settings : status)
  })
  try {
    assert.deepEqual(surface(ui), { panelView: 'home', setupOpen: false })
    ui.setSession('A')
    await ui.openSettings()
    assert.deepEqual(surface(ui), { panelView: 'settings', setupOpen: false })
    ui.openSetup()
    assert.deepEqual(surface(ui), { panelView: 'settings', setupOpen: true }, 'setup opens synchronously over its originating surface')
    await tick()
    await ui.dismissSetup()
    assert.deepEqual(surface(ui), { panelView: 'settings', setupOpen: false })
    await ui.showHome()
    ui.openSetup(); await tick(); await ui.dismissSetup()
    assert.deepEqual(surface(ui), { panelView: 'home', setupOpen: false })
    assertOnlyReads(calls)
    assert.deepEqual(calls.map(call => call.action), ['read-settings', 'status', 'read-settings', 'status'])
    for (const filename of ['index.jsx', 'views.jsx', 'setup.jsx', 'controller.mjs']) {
      const source = readFileSync(new URL(`../src/${filename}`, import.meta.url), 'utf8')
      assert.doesNotMatch(source, /\bNavigation\b|\bnavigation\s*\.|\bwindow\.open\s*\(|\b(?:window\.)?location\.(?:assign|replace)\s*\(/, filename)
    }
  } finally { ui.dispose() }
})

for (const method of ['openSettings', 'showHome', 'dismissSetup']) {
  test(`${method} waits for real cancellation of the captured preview source`, async () => {
    const { ui, playback, cancellation, calls } = pendingPreview()
    try {
      await ui.openSettings(); ui.openSetup()
      const running = ui.run('original-source', 'preview-tts')
      const before = surface(ui)
      const navigating = ui[method]()
      assert.deepEqual(surface(ui), before, 'a pending stop must not hide the preview surface')
      assert.equal(calls[0].signal instanceof AbortSignal, true)
      assert.equal(calls[0].signal.aborted, true)
      ui.setSession('new-source')
      assert.deepEqual(calls.map(({ id, action }) => [id, action]), [['original-source', 'preview-tts'], ['original-source', 'cancel-tts']])
      cancellation.resolve(response('cancel-tts', { status: 'cancelled' }))
      assert.equal(await navigating, true)
      assert.deepEqual(surface(ui), { panelView: method === 'showHome' ? 'home' : 'settings', setupOpen: false })
      playback.resolve(response('preview-tts', previewResult)); await running
      assert.equal(ui.getSnapshot().ttsPreview.status, 'cancelled', 'late playback success cannot undo the confirmed stop')
    } finally { ui.dispose() }
  })

  test(`${method} cannot claim to have closed after unconfirmed cancellation`, async () => {
    const { ui, playback, cancellation, calls } = pendingPreview()
    try {
      ui.openSetup()
      const running = ui.run('original-source', 'preview-tts')
      const before = surface(ui), navigating = ui[method]()
      cancellation.resolve(response('cancel-tts', { status: 'unconfirmed' }))
      assert.equal(await navigating, false)
      assert.deepEqual(surface(ui), before)
      playback.resolve(response('preview-tts', previewResult)); await running
      assert.equal(ui.getSnapshot().ttsPreview.status, 'unconfirmed')
      assert.equal(await ui[method](), false, 'repeated navigation cannot discard an unconfirmed cancellation handle')
      assert.deepEqual(surface(ui), before)
      assert.equal(ui.getSnapshot().ttsUncertain, true)
      assert.ok(calls.every(call => call.id === 'original-source' && ['preview-tts', 'cancel-tts'].includes(call.action)))
    } finally { ui.dispose() }
  })
}

for (const older of ['showHome', 'openSettings', 'dismissSetup']) {
  test(`reopening setup wins over an older pending ${older}`, async () => {
    const { ui, playback, cancellation, calls } = pendingPreview()
    try {
      await ui.openSettings(); ui.openSetup()
      const running = ui.run('A', 'preview-tts')
      const leaving = ui[older]()
      ui.openSetup()
      assert.deepEqual(surface(ui), { panelView: 'settings', setupOpen: true })
      cancellation.resolve(response('cancel-tts', { status: 'cancelled' })); await leaving
      playback.resolve(response('preview-tts', previewResult)); await running
      assert.deepEqual(surface(ui), { panelView: 'settings', setupOpen: true }, 'stale close must not override the newest synchronous open')
      assert.deepEqual(calls.map(call => call.action), ['preview-tts', 'cancel-tts'])
    } finally { ui.dispose() }
  })
}

for (const sequence of [['showHome', 'openSettings'], ['openSettings', 'showHome']]) {
  test(`rapid ${sequence.join(' then ')} keeps the last intent and deduplicates cancellation`, async () => {
    const { ui, playback, cancellation, calls } = pendingPreview()
    try {
      ui.openSetup()
      const running = ui.run('A', 'preview-tts')
      const transitions = sequence.map(method => ui[method]())
      assert.equal(ui.getSnapshot().setupOpen, true)
      assert.equal(calls.filter(call => call.action === 'cancel-tts').length, 1)
      cancellation.resolve(response('cancel-tts', { status: 'cancelled' })); await Promise.all(transitions)
      playback.resolve(response('preview-tts', previewResult)); await running
      assert.deepEqual(surface(ui), { panelView: sequence.at(-1) === 'showHome' ? 'home' : 'settings', setupOpen: false })
    } finally { ui.dispose() }
  })
}

for (const completed of [false, true]) {
  for (const choice of ['showHome', 'openSettings', 'openSetup', 'dismissSetup']) {
    test(`late owner read (completed=${completed}) respects explicit ${choice}`, async () => {
      const setup = deferred(), calls = []
      const ui = createController((...args) => { calls.push(args); throw Error('Navigation cannot issue commands without a session') })
      try {
        ui.attachConversationClient(client(() => setup.promise))
        await ui[choice]()
        const chosen = surface(ui)
        setup.resolve({ version: 1, completed }); await tick()
        assert.deepEqual(surface(ui), chosen, 'owner status may update data, not reverse explicit navigation')
        assert.equal(ui.getSnapshot().setupStatus.completed, completed)
        assert.deepEqual(calls, [])
      } finally { ui.dispose() }
    })
  }
}

test('first-run owner read opens setup over home and dismissal returns home without commands', async () => {
  const calls = [], ui = createController((...args) => { calls.push(args); throw Error('Unexpected command') })
  try {
    ui.attachConversationClient(client(async () => ({ version: 1, completed: false })))
    await tick()
    assert.deepEqual(surface(ui), { panelView: 'home', setupOpen: true })
    assert.equal(await ui.dismissSetup(), true)
    assert.deepEqual(surface(ui), { panelView: 'home', setupOpen: false })
    assert.deepEqual(calls, [])
  } finally { ui.dispose() }
})
