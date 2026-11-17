import test from 'node:test'
import assert from 'node:assert/strict'
import { createController } from '../src/controller.mjs'

const status = (runtime, enabled = true) => ({
  enabled, ownerSessionId: enabled ? 'A' : null, helper: { online: enabled },
  voiceControlBusy: false, voiceSession: { id: enabled ? 'voice' : null, fullyStopped: !enabled },
  ...(runtime ? { ttsRuntime: runtime } : {}),
})
const busy = { state: 'synthesizing', busy: true, blocked: false }
const idle = { state: 'idle', busy: false, blocked: false }
const blocked = { state: 'blocked', busy: false, blocked: true }

test('ordinary playback status does not silently disable the microphone stop action', async t => {
  const calls = []
  const ui = createController(async (_id, request) => {
    calls.push(request.action)
    return status(request.action === 'disable' ? idle : busy, request.action !== 'disable')
  })
  t.after(() => ui.dispose())
  assert.equal(await ui.run('A', 'status'), true)
  assert.equal(ui.getSnapshot().ttsUncertain, false)
  assert.equal(await ui.run('A', 'disable'), true)
  assert.deepEqual(calls, ['status', 'disable'])
  assert.equal(ui.getSnapshot().status.enabled, false)
  assert.equal(ui.getSnapshot().ttsUncertain, false)
})

test('unknown output stays fenced while busy, but an explicit stop and idle readback can clear it', async t => {
  let runtime = busy
  const calls = []
  const ui = createController(async (_id, request) => {
    calls.push(request.action)
    if (request.action === 'cancel-tts') return { status: 'unconfirmed' }
    if (request.action === 'disable') { runtime = idle; return status(runtime, false) }
    return status(runtime)
  })
  t.after(() => ui.dispose())
  assert.equal(await ui.run('A', 'cancel-tts'), false)
  await ui.run('A', 'status')
  assert.equal(ui.getSnapshot().ttsUncertain, true, 'busy cannot prove an uncertain output stopped')
  for (const action of ['enable', 'preview-tts', 'save-tts']) assert.equal(await ui.run('A', action), false)
  assert.deepEqual(calls, ['cancel-tts', 'status'])
  assert.equal(await ui.run('A', 'disable'), true, 'uncertainty must not prevent stopping')
  assert.equal(ui.getSnapshot().ttsUncertain, false)
  assert.equal(ui.getSnapshot().status.voiceSession.fullyStopped, true)
})

test('blocked or incomplete stop readbacks never unlock new playback', async t => {
  for (const readback of [blocked, busy, null]) {
    const calls = []
    const ui = createController(async (_id, request) => {
      calls.push(request.action)
      return status(request.action === 'status' ? blocked : readback, request.action === 'status')
    })
    t.after(() => ui.dispose())
    await ui.run('A', 'status')
    assert.equal(await ui.run('A', 'disable'), true)
    assert.equal(ui.getSnapshot().ttsUncertain, true)
    assert.equal(await ui.run('A', 'preview-tts'), false)
    assert.deepEqual(calls, ['status', 'disable'])
  }
})

test('confirmed direct cancellation retains a failed-stop lock until a fresh idle readback', async t => {
  let cancelled = false
  const ui = createController(async (_id, request) => {
    if (request.action === 'cancel-tts') return { status: cancelled ? 'cancelled' : 'unconfirmed' }
    if (request.action === 'disable') throw new Error('stop transport lost')
    return status(cancelled ? idle : blocked, !cancelled)
  })
  t.after(() => ui.dispose())
  await ui.run('A', 'cancel-tts')
  assert.equal(await ui.run('A', 'disable'), false)
  assert.equal(ui.getSnapshot().ttsUncertain, true)
  assert.match(ui.getSnapshot().error, /stop transport lost/)
  cancelled = true
  assert.equal(await ui.run('A', 'cancel-tts'), true)
  assert.equal(ui.getSnapshot().ttsUncertain, true)
  assert.equal(ui.getSnapshot().uncertain, true, 'microphone stop still needs status readback')
  await ui.run('A', 'status')
  assert.equal(ui.getSnapshot().ttsUncertain, false)
})

for (const action of ['status', 'disable', 'cancel-tts']) {
  test(`late ${action} success cannot clear a newer unconfirmed stop`, async t => {
    let release, hold = true
    const pending = new Promise(resolve => { release = resolve })
    const calls = []
    const ui = createController(async (_id, request) => {
      calls.push(request.action)
      if (hold && request.action === action) { hold = false; return pending }
      if (request.action === 'cancel-tts') return { status: 'unconfirmed' }
      return status(idle, false)
    })
    t.after(() => ui.dispose())
    const old = ui.run('A', action)
    assert.equal(await ui.run('A', 'cancel-tts'), false)
    release(action === 'cancel-tts' ? { status: 'cancelled' } : status(idle, false))
    await old
    assert.equal(ui.getSnapshot().ttsUncertain, true)
    assert.equal(await ui.run('A', 'preview-tts'), false)
    assert.equal(calls.includes('preview-tts'), false)
    await ui.run('A', 'status')
    assert.equal(ui.getSnapshot().ttsUncertain, false, 'a fresh idle readback can clear the lock')
  })
}
