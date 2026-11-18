import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'
import { apply } from '../host.mjs'
import { createController } from './action-harness.mjs'
import { clampPosition } from '../src/geometry.mjs'

const response = (action, value) => ({ ok: true, value: { result: { kind: 'success', text: JSON.stringify({ protocol: 1, action, value }) } } })
const status = { ownerSessionId: 'A', enabled: true, helper: { online: false } }
function host(api) {
  let command, disposer = false
  apply({ whaleVoiceSession: api, commands: { register(value) { command = value; return () => { disposer = true } } }, effect: fn => fn() })
  return { invoke: (request, agent = { session: { id: 'actual' } }, signal = new AbortController().signal) => command.handler({ agent, signal, rawInput: JSON.stringify(request) }), command, get disposed() { return disposer } }
}

test('human bridge uses the real invocation identity, never a caller-supplied agent or owner', async () => {
  const calls = []
  const api = { changeForCaller: (...args) => calls.push(args), status: () => status }
  const h = host(api)
  const result = await h.invoke({ action: 'enable', sessionId: 'forged', agent: { session: { id: 'forged' } } })
  assert.equal(result.kind, 'error')
  assert.equal(calls.length, 0)
  assert.equal((await h.invoke({ action: 'enable' })).kind, 'success')
  assert.equal(calls[0][0].session.id, 'actual')
  assert.equal(calls[0][1], true)
  assert.equal(h.command.recordInput, false)
})

test('missing actor, cancelled input, unsupported command and malformed JSON cannot call the backend', async () => {
  let calls = 0
  const h = host({ change() { calls++ } })
  assert.equal((await h.invoke({ action: 'enable' }, {})).kind, 'error')
  const controller = new AbortController(); controller.abort()
  assert.equal((await h.invoke({ action: 'enable' }, { session: { id: 'actual' } }, controller.signal)).kind, 'error')
  assert.equal((await h.invoke({ action: 'delete-everything' })).kind, 'error')
  assert.equal((await h.command.handler({ agent: { session: { id: 'A' } }, rawInput: '{', signal: new AbortController().signal })).kind, 'error')
  assert.equal(calls, 0)
})

test('read-only status never starts audio and settings/catalog have separate exact adapters', async () => {
  const seen = []
  const actor = { session: { id: 'A' } }
  const h = host({
    status(agent) { seen.push(['status', agent]); return status },
    readSettings() { seen.push(['settings']); return { revision: '1', values: {} } },
    listVoiceSessions(agent, signal, options) { seen.push(['list', agent, options]); return { items: [], nextCursor: null } },
    resumeVoiceSession(agent, id) { seen.push(['resume', agent, id]) },
    updateSettings(request, agent) { seen.push(['save', request, agent]); return { revision: '2', values: request.values } },
  })
  await h.invoke({ action: 'status' }, actor)
  await h.invoke({ action: 'read-settings' }, actor)
  await h.invoke({ action: 'list', cursor: 'next' }, actor)
  await h.invoke({ action: 'resume', id: 'voice-7' }, actor)
  await h.invoke({ action: 'save-settings', revision: '1', values: { device: null } }, actor)
  assert.deepEqual(seen.map(item => item[0]), ['status', 'settings', 'list', 'resume', 'status', 'save'])
  assert.equal(seen[0][1], actor)
  assert.deepEqual(seen[2][2], { cursor: 'next' })
})

test('controller captures click identity, rejects double clicks, and never grants on focus changes', async () => {
  let release, calls = []
  const ui = createController((id, line) => { calls.push([id, line]); return new Promise(resolve => { release = resolve }) })
  const pending = ui.run('A', 'enable')
  assert.equal(await ui.run('B', 'enable'), false)
  assert.equal(calls.length, 1)
  assert.equal(calls[0][0], 'A')
  release(response('enable', status)); assert.equal(await pending, true)
  assert.equal(ui.getSnapshot().checkedFor, 'A')
  assert.equal(ui.getSnapshot().busy, false)
})

test('failed mutations preserve data, expose uncertainty, and do not retry', async () => {
  let calls = 0
  const ui = createController(async (_id, line) => {
    calls++
    if (calls === 1) return response('status', status)
    throw new Error('Connection lost after send')
  })
  await ui.run('A', 'status')
  assert.equal(await ui.run('A', 'disable'), false)
  assert.equal(calls, 2)
  assert.deepEqual(ui.getSnapshot().status, status)
  assert.equal(ui.getSnapshot().uncertain, true)
  assert.match(ui.getSnapshot().error, /Connection lost/)
})

test('catalog merges pages only for the original actor and retains unique identities', async () => {
  let calls = 0
  const ui = createController(async () => response('list', { items: [{ id: ++calls === 1 ? 'one' : 'two', archived: false, available: true, canResume: true }], nextCursor: calls === 1 ? 'next' : null }))
  await ui.run('A', 'list')
  await ui.run('A', 'list', { cursor: 'next' })
  assert.deepEqual(ui.getSnapshot().catalog.items.map(i => i.id), ['one', 'two'])
  await ui.run('B', 'list')
  assert.deepEqual(ui.getSnapshot().catalog.items.map(i => i.id), ['two'])
  assert.equal(ui.getSnapshot().catalogFor, 'B')
})

test('disposal prevents late writes and invalid protocol data is surfaced', async () => {
  let resolve
  const ui = createController(() => new Promise(done => { resolve = done }))
  const pending = ui.run('A', 'status')
  ui.dispose(); resolve(response('status', status)); await pending
  assert.equal(ui.getSnapshot().status, null)
  const invalid = createController(async () => ({ ok: true, value: { result: { kind: 'success', text: '{}' } } }))
  assert.equal(await invalid.run('A', 'status'), false)
  assert.match(invalid.getSnapshot().error, /protocol/)
})

test('movement clamps both boundaries and oversized content keeps its reachable top edge', () => {
  const bounds = { left: 0, top: 32, right: 390, bottom: 640 }
  assert.deepEqual(clampPosition({ x: -100, y: -100 }, bounds, { width: 302, height: 300 }), { x: 12, y: 44 })
  assert.deepEqual(clampPosition({ x: 1000, y: 1000 }, bounds, { width: 302, height: 300 }), { x: 76, y: 328 })
  assert.deepEqual(clampPosition({ x: 100, y: 100 }, bounds, { width: 900, height: 900 }), { x: 12, y: 44 })
})

test('built browser artifact is a lazy DSH module with only supported shared imports', async () => {
  let registration
  vm.runInNewContext(await readFile(new URL('../lib/client.js', import.meta.url), 'utf8'), { window: { __ModuleLoader__: { load: value => { registration = value } } } })
  assert.equal(registration.id, 'dsh-whale-ear-ui')
  assert.equal(typeof registration.factory, 'function')
  const seen = []
  const exports = registration.factory(id => { seen.push(id); return id === 'react/jsx-runtime' ? {} : { forwardRef: value => value } })
  assert.equal(typeof exports.apply, 'function')
  assert.deepEqual([...new Set(seen)].sort(), ['@deepseek-ai/dsh-client-ui-primitives', 'react', 'react-dom', 'react/jsx-runtime'].sort())
})

test('locale dictionaries cover the same product labels', async () => {
  const { zh, en } = await import('../src/locales.mjs')
  assert.deepEqual(Object.keys(zh).sort(), Object.keys(en).sort())
  assert.equal(zh.title, '鱼应')
  assert.equal(en.title, '鱼应')
})

test('geometry cancels interrupted pointers, reclamps on resize and releases every observer', async () => {
  const { createFloatingGeometry } = await import('../src/geometry.mjs')
  const listeners = new Map()
  let disconnected = 0, capture = false, released = 0
  const win = { innerWidth: 800, innerHeight: 600, getComputedStyle: () => ({ getPropertyValue: () => '32px' }),
    ResizeObserver: class { observe() {} disconnect() { disconnected++ } },
    addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: name => listeners.delete(name) }
  const node = { style: {}, closest: () => null, getBoundingClientRect: () => ({ width: 302, height: 200 }) }
  const target = { setPointerCapture() { capture = true }, hasPointerCapture() { return capture }, releasePointerCapture() { capture = false; released++ } }
  const geo = createFloatingGeometry(win)
  geo.ref(node)
  const initial = node.style.left
  geo.pointerDown({ button: 0, pointerId: 1, currentTarget: target, clientX: 400, clientY: 400, preventDefault() {} })
  geo.pointerMove({ pointerId: 2, clientX: 0, clientY: 0 }); assert.equal(node.style.left, initial)
  geo.pointerMove({ pointerId: 1, clientX: -1000, clientY: -1000 })
  assert.equal(node.style.left, '12px'); assert.equal(node.style.top, '44px')
  geo.pointerEnd({ pointerId: 1 }); assert.equal(released, 1)
  geo.pointerMove({ pointerId: 1, clientX: 1000, clientY: 1000 }); assert.equal(node.style.left, '12px')
  for (const key of ['Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
    geo.keyDown?.({ key, shiftKey: true, preventDefault() { assert.fail('Movement keys must retain their native behavior') } })
    assert.equal(node.style.left, '12px'); assert.equal(node.style.top, '44px')
  }
  geo.pointerDown({ button: 0, pointerId: 3, currentTarget: target, clientX: 20, clientY: 60, preventDefault() {} })
  geo.pointerMove({ pointerId: 3, clientX: 700, clientY: 60 }); geo.pointerEnd({ pointerId: 3 })
  win.innerWidth = 330; listeners.get('resize')(); assert.equal(node.style.left, '16px')
  geo.dispose(); assert.equal(listeners.size, 0); assert.equal(disconnected, 1)
})


test('unknown and sensitive extra fields are rejected before any backend operation', async () => {
  let called = 0
  const api = new Proxy({}, { get: () => () => { called++ } })
  const h = host(api)
  for (const action of ['status', 'enable', 'disable', 'read-settings', 'new', 'list', 'resume', 'listen-mode', 'save-settings', 'save-models', 'set-visibility']) {
    for (const key of ['agent', 'sessionId', 'source', 'voiceSessionId', 'enabledSessionIds', '__proto__']) {
      const request = JSON.parse(JSON.stringify({ action, [key]: 'forged' }))
      assert.equal((await h.invoke(request)).kind, 'error', `${action}: ${key}`)
    }
  }
  assert.equal(called, 0)
})

test('unknown-write error preserves safe identity and verification guidance without exposing cause', async () => {
  const h = host({ newVoiceSession() { throw Object.assign(new Error('catalog uncertain'), { code: 'VOICE_CATALOG_PERSISTENCE_UNCONFIRMED', rootSessionId: 'voice-uncertain', persistenceConfirmed: false, cause: new Error('secret backend path') }) } })
  const result = await h.invoke({ action: 'new' })
  assert.equal(result.kind, 'error')
  assert.match(result.text, /voice-uncertain/)
  assert.match(result.text, /VOICE_CATALOG_PERSISTENCE_UNCONFIRMED/)
  assert.match(result.text, /不要重试/)
  assert.doesNotMatch(result.text, /secret backend/)
})


test('unknown visibility write locks mutation until same-source settings then status are read back', async () => {
  const settings = { revision: 'r', values: { device: null, pttMouse: 2, speakerVerification: { enabled: false } }, voiceSession: { visibility: 'workspace' } }
  const calls = []
  const ui = createController(async (id, line) => {
    const request = JSON.parse(line.slice('/whale-ear-ui '.length)); calls.push([id, request.action])
    if (request.action === 'set-visibility') throw new Error('Connection lost after write')
    return response(request.action, request.action === 'read-settings' ? settings : { ownerSessionId: null, enabled: false, helper: { online: false } })
  })
  assert.equal(await ui.run('A', 'set-visibility', { revision: 'r', visibility: 'workspace' }), false)
  assert.equal(ui.getSnapshot().visibilityUncertain, true)
  assert.equal(await ui.run('A', 'new'), false)
  assert.equal(await ui.run('A', 'set-visibility', { revision: 'r', visibility: 'workspace' }), false)
  await ui.run('A', 'status'); assert.equal(ui.getSnapshot().uncertain, true)
  await ui.run('A', 'read-settings'); await ui.run('B', 'status'); assert.equal(ui.getSnapshot().uncertain, true)
  assert.equal(ui.getSnapshot().settingsFor, 'A')
  await ui.run('B', 'read-settings'); await ui.run('B', 'status')
  assert.equal(ui.getSnapshot().uncertain, false); assert.equal(ui.getSnapshot().settingsFor, 'B')
  assert.equal(calls.filter(([, action]) => action === 'set-visibility').length, 1)
})

test('capsule captures the pointer on its original button so an ordinary click is not retargeted to the frame',async()=>{
 const {createFloatingGeometry}=await import('../src/geometry.mjs')
 const calls=[],win={innerWidth:800,innerHeight:600,getComputedStyle:()=>({getPropertyValue:()=>''}),ResizeObserver:class{observe(){}disconnect(){}},addEventListener(){},removeEventListener(){}}
 const node={style:{},closest:()=>null,getBoundingClientRect:()=>({width:216,height:44})}
 const frame={setPointerCapture(){calls.push('wrong-frame')}},button={setPointerCapture(id){calls.push(['button',id])},hasPointerCapture:()=>true,releasePointerCapture(id){calls.push(['release',id])}}
 const geometry=createFloatingGeometry(win);geometry.ref(node)
 geometry.pointerDown({button:0,pointerId:7,currentTarget:frame,clientX:50,clientY:50,preventDefault(){}},button)
 geometry.pointerEnd({pointerId:7});assert.deepEqual(calls,[['button',7],['release',7]]);geometry.dispose()
})

test('single-panel navigation preserves setup origin and only performs owner reads', async () => {
  const calls = []
  const ui = createController(async (id, line) => {
    const { action } = JSON.parse(line.slice('/whale-ear-ui '.length))
    calls.push([id, action])
    return response(action, action === 'status' ? { ownerSessionId:null, enabled:false, helper:{online:false} }
      : { revision:'r1',values:{device:null,pttMouse:0,speakerVerification:{enabled:false}} })
  })
  assert.equal(ui.getSnapshot().panelView, 'home')
  await ui.openSettings()
  assert.equal(ui.getSnapshot().panelView, 'settings')
  ui.openSetup()
  assert.equal(ui.getSnapshot().setupOpen, true)
  await new Promise(resolve => setImmediate(resolve))
  await ui.dismissSetup()
  assert.equal(ui.getSnapshot().setupOpen, false)
  assert.equal(ui.getSnapshot().panelView, 'settings')
  await ui.showHome(); ui.openSetup(); await new Promise(resolve => setImmediate(resolve)); await ui.dismissSetup()
  assert.equal(ui.getSnapshot().panelView, 'home')
  assert.deepEqual(calls, [[null,'read-settings'],[null,'status'],[null,'read-settings'],[null,'status']])
  ui.dispose()
})
