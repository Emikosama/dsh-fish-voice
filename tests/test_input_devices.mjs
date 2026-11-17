import test from 'node:test'
import assert from 'node:assert/strict'
import { inputDevicesSnapshot } from '../voice-ui-bridge.mjs'
import { validInputDevices, deviceSelection } from '../ui/src/input-devices.mjs'
import { decodeReply } from '../ui/src/protocol.mjs'
const observe = items => inputDevicesSnapshot({ items, observedAt: 42 })
const status = inputDevices => ({ ownerSessionId: null, enabled: false, helper: { online: false }, inputDevices })

test('missing and offline enumeration remain unknown, not no microphones', () => {
  assert.deepEqual(inputDevicesSnapshot(), { status: 'unknown', items: [], observedAt: null })
  assert.equal(inputDevicesSnapshot({ items: [{ index: 0, name: 'Mic' }], observedAt: 42 }, false).status, 'unknown')
  assert.equal(observe([]).status, 'empty')
  assert.equal(observe(undefined).status, 'unavailable')
  assert.doesNotThrow(() => decodeReply('status', status(undefined)))
})
test('candidate names remain text; extras are not projected', () => {
  const value = observe([{ index: 0, name: '<img src=x onerror=alert(1)>', hostApi: 'PRIVATE' }, { index: 7, name: 'USB mic' }])
  assert.equal(value.status, 'available')
  assert.deepEqual(value.items[0], { index: 0, name: '<img src=x onerror=alert(1)>' })
  assert.equal(validInputDevices(value), true)
  assert.equal(decodeReply('status', status(value)).inputDevices, value)
})
test('malformed, duplicate and oversized inventories cannot become selectable', () => {
  for (const items of [null, {}, [{ error: 'private error' }], [{ index: -1, name: 'Mic' }], [{ index: 1.5, name: 'Mic' }], [{ index: 0, name: {} }], [{ index: 0, name: '' }], [{ index: 0, name: 'x'.repeat(257) }], [{ index: 0, name: 'bad\nname' }], [{ index: 0, name: 'A' }, { index: 0, name: 'B' }], Array.from({ length: 129 }, (_, index) => ({ index, name: 'Mic' }))]) {
    assert.equal(observe(items).status, 'unavailable')
    assert.throws(() => decodeReply('status', status({ status: 'available', items, observedAt: 42 })), /inventory/)
  }
  for (const value of [{ status: 'unknown', items: [], observedAt: 42 }, { status: 'empty', items: [], observedAt: null }, { status: 'available', items: [], observedAt: 42 }]) assert.equal(validInputDevices(value), false)
})
test('unknown configured devices and manual names are preserved without guessing', () => {
  const inventory = observe([{ index: 0, name: 'USB mic' }])
  assert.deepEqual(deviceSelection(null, inventory), { kind: 'default', value: null })
  assert.deepEqual(deviceSelection(0, inventory), { kind: 'candidate', value: 0 })
  for (const value of [99, 'USB mic', '0', 'Unplugged mic']) assert.deepEqual(deviceSelection(value, inventory), { kind: 'manual', value })
  assert.deepEqual(deviceSelection(0, inputDevicesSnapshot()), { kind: 'manual', value: 0 })
})
