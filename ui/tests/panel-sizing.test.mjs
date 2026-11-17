import test from 'node:test'
import assert from 'node:assert/strict'
import { createPanelSizing } from '../src/panel-sizing.mjs'

function fixture() {
  let id = 0, time = 0
  const pending = new Map(), listeners = new Map(), observers = []
  const media = { matches: false, addEventListener(_, fn) { this.changed = fn }, removeEventListener() {} }
  const win = {
    innerWidth: 1000, innerHeight: 800,
    addEventListener(name, fn) { listeners.set(name, fn) }, removeEventListener(name) { listeners.delete(name) },
    matchMedia: () => media,
    getComputedStyle: () => ({ paddingTop: '12px', paddingBottom: '12px', borderTopWidth: '0px', borderBottomWidth: '0px', getPropertyValue: () => '0' }),
    requestAnimationFrame(fn) { pending.set(++id, fn); return id }, cancelAnimationFrame(key) { pending.delete(key) },
    ResizeObserver: class { constructor(fn) { this.callback = fn; observers.push(this) } observe() {} disconnect() { this.disconnected = true } },
    MutationObserver: class { observe() {} disconnect() {} },
  }
  const frame = { style: {}, dataset: { view: 'home', motion: 'spring' }, closest: () => null, hasAttribute: name => name === 'data-collapsed' && 'collapsed' in frame.dataset }
  const content = { style: {}, scrollHeight: 180, getBoundingClientRect: () => ({ height: content.scrollHeight }) }
  let clamps = 0
  const adapter = createPanelSizing(win, { onResize() { clamps++ } })
  adapter.ref(frame); adapter.contentRef(content)
  function step() { time += 16; const jobs = [...pending.values()]; pending.clear(); jobs.forEach(fn => fn(time)) }
  function settle() { for (let i = 0; pending.size && i < 150; i++) step(); assert.equal(pending.size, 0) }
  return { adapter, frame, content, win, media, observers, listeners, pending, step, settle, clamps: () => clamps }
}

test('initial size, expanding view and natural content height animate actual layout', () => {
  const f = fixture()
  assert.equal(f.frame.style.width, '320.000px')
  assert.equal(f.frame.style.height, '320.000px')
  f.frame.dataset.view = 'settings'; f.content.scrollHeight = 400; f.adapter.update()
  assert.equal(f.frame.style.width, '320.000px')
  f.step()
  assert.ok(parseFloat(f.frame.style.width) > 320 && parseFloat(f.frame.style.width) < 660)
  assert.ok(parseFloat(f.frame.style.height) > 320 && parseFloat(f.frame.style.height) < 480)
  f.settle()
  assert.equal(f.frame.style.width, '660.000px'); assert.equal(f.frame.style.height, '480.000px')
  assert.ok(f.clamps() > 2)
  assert.equal(f.frame.style.transform, undefined)
})

test('reentrant transitions reverse from current layout without queuing or input guards', () => {
  const f = fixture()
  f.frame.dataset.view = 'setup'; f.adapter.update(); f.step(); f.step()
  const interrupted = f.frame.style.width
  f.frame.dataset.collapsed = 'true'; f.content.scrollHeight = 36; f.adapter.update()
  assert.equal(f.frame.style.width, interrupted)
  f.settle()
  assert.equal(f.frame.style.width, '216.000px')
  assert.equal(f.frame.style.pointerEvents, undefined)
})

test('firm transitions, off snapping, and live reduced-motion precedence', () => {
  const f = fixture()
  f.frame.dataset.motion = 'firm'; f.frame.dataset.view = 'settings'; f.adapter.update(); f.step()
  assert.ok(f.pending.size)
  f.media.matches = true; f.media.changed()
  assert.equal(f.pending.size, 0); assert.equal(f.frame.style.width, '660.000px')
  f.media.matches = false; f.frame.dataset.motion = 'off'; f.frame.dataset.view = 'home'; f.adapter.update()
  assert.equal(f.frame.style.width, '320.000px'); assert.equal(f.pending.size, 0)
})

test('ordinary content refresh never resizes; viewport caps at sixty percent without home scrolling', () => {
  const f = fixture()
  f.frame.dataset.motion = 'off'
  f.content.scrollHeight = 2000; f.observers.at(-1).callback()
  assert.equal(f.frame.style.height, '320.000px')
  assert.equal(f.content.style.maxHeight, '456px'); assert.equal(f.content.style.overflowY, 'hidden')
  f.win.innerWidth = 280; f.win.innerHeight = 300; f.listeners.get('resize')()
  assert.equal(f.frame.style.width, '256.000px'); assert.equal(f.frame.style.height, '180.000px')
  f.content.scrollHeight = 50; f.adapter.update()
  assert.equal(f.frame.style.height, '180.000px')
})

test('cleanup cancels animation and observation', () => {
  const f = fixture()
  f.frame.dataset.view = 'setup'; f.adapter.update()
  assert.equal(f.pending.size, 1)
  f.adapter.dispose()
  assert.equal(f.pending.size, 0); assert.equal(f.listeners.size, 0)
  assert.ok(f.observers.every(observer => observer.disconnected))
})

test('only an explicit recent-chat expansion grows home, never transcript size',()=>{const f=fixture();f.frame.dataset.motion='off';f.content.querySelector=()=>({});f.adapter.update();assert.equal(f.frame.style.height,'480.000px');f.content.scrollHeight=9000;f.adapter.update();assert.equal(f.frame.style.height,'480.000px');f.content.querySelector=()=>null;f.adapter.update();assert.equal(f.frame.style.height,'320.000px')})

test('settings keep their fixed header and the setup frame follows its visible surface',()=>{
 const f=fixture();f.frame.dataset.motion='off'
 f.frame.dataset.view='settings';f.adapter.update()
 assert.equal(f.frame.style.height,'480.000px')
 let height=260
 const currentPage={getBoundingClientRect:()=>({height})}
 f.content.querySelector=selector=>selector==='[data-whale-intrinsic]'?currentPage:null
 f.frame.dataset.view='setup';f.adapter.update()
 assert.equal(f.frame.style.height,'284.000px')
 assert.equal(f.content.style.height,'auto')
 assert.equal(f.content.style.overflowY,'hidden')
 height=322;f.frame.dataset.motion='spring';f.observers.at(-1).callback();f.step();f.step()
 assert.ok(parseFloat(f.frame.style.height)>284 && parseFloat(f.frame.style.height)<346)
 f.settle();assert.equal(f.frame.style.height,'346.000px')
 f.win.innerHeight=400;f.adapter.update();f.settle()
 assert.equal(f.frame.style.height,'240.000px')
 f.frame.dataset.view='home';f.adapter.update();assert.equal(f.content.style.overflowY,'hidden')
})

test('short shells activate a compact non-scrolling home layout',()=>{const f=fixture();assert.equal(f.frame.dataset.compactHeight,'false');f.win.innerHeight=360;f.adapter.update();f.settle();assert.equal(f.frame.dataset.compactHeight,'true');assert.equal(f.content.style.overflowY,'hidden');f.win.innerHeight=800;f.adapter.update();f.settle();assert.equal(f.frame.dataset.compactHeight,'false')})

test('late device hints resize intrinsic home controls but never observe the expanded chat',()=>{
 const f=fixture();f.frame.dataset.motion='off';let height=180,expanded=false
 const home={getBoundingClientRect:()=>({height})}
 f.content.querySelector=selector=>selector==='[data-home-controls]'?home:expanded?{}:null
 f.adapter.update();assert.equal(f.frame.style.height,'204.000px')
 const homeObserver=f.observers.at(-1);height=202;homeObserver.callback();f.settle()
 assert.equal(f.frame.style.height,'226.000px');assert.equal(f.content.style.height,'202px')
 expanded=true;f.adapter.update();assert.equal(homeObserver.disconnected,true)
 assert.equal(f.frame.style.height,'480.000px');height=9000;homeObserver.callback();f.settle()
 assert.equal(f.frame.style.height,'480.000px');f.adapter.dispose()
})
