import test from 'node:test'
import assert from 'node:assert/strict'
import { createFloatingGeometry } from '../src/geometry.mjs'

function fixture({ reduced = false, width = 1600, height = 1100 } = {}) {
  let time = 0, id = 0, captures = 0
  const frames = new Map(), calls = []
  const element = { style: {}, dataset: { motion: 'spring' }, closest: () => null,
    getBoundingClientRect: () => ({ width: 320, height: 200 }),
    setPointerCapture() { captures++ }, hasPointerCapture() { return captures > 0 }, releasePointerCapture() { captures-- } }
  const media = { matches: reduced }
  const win = { innerWidth: width, innerHeight: height, performance: { now: () => time }, matchMedia: () => media,
    getComputedStyle: () => ({ getPropertyValue: () => '0' }), addEventListener() {}, removeEventListener() {},
    ResizeObserver: class { observe() {} disconnect() {} },
    requestAnimationFrame(fn) { frames.set(++id, fn); return id }, cancelAnimationFrame(id) { frames.delete(id) } }
  const geometry = createFloatingGeometry(win)
  geometry.ref(element)
  geometry.useLayoutService({ version: 1, register: () => Object.fromEntries(['beginDrag','move','endDrag','resize','detach','dispose'].map(key => [key, () => calls.push(key)])) })
  const position = () => ({ x: parseFloat(element.style.left), y: parseFloat(element.style.top) })
  const event = (x = 100, y = 100, more = {}) => ({ pointerType: 'mouse', button: 0, pointerId: 1, clientX: x, clientY: y, currentTarget: element, preventDefault() {}, ...more })
  const frame = (dt = 16) => { time += dt; const jobs = [...frames.values()]; frames.clear(); jobs.forEach(fn => fn(time)); return position() }
  const move = (x, y, dt = 16, more = {}) => { time += dt; geometry.pointerMove(event(x, y, more)) }
  const release = () => geometry.pointerEnd(event(0, 0, { type: 'pointerup' }))
  const settle = dt => { for (let i = 0; frames.size && i < 400; i++) frame(dt); assert.equal(frames.size, 0); return position() }
  return { geometry, element, win, media, event, position, frame, move, release, settle, frames, calls, idle(dt) { time += dt }, captured: () => captures }
}
function throwAt(vx, vy = 0, options, interval = 16) {
  const f = fixture(options); f.geometry.pointerDown(f.event())
  for (let t = interval; t <= 64; t += interval) f.move(100 + vx * t, 100 + vy * t, interval)
  f.release(); return { f, release: f.position() }
}

test('distance scales with actual release velocity without flattening fast throws', () => {
  const slow = throwAt(-.25), medium = throwAt(-1), fast = throwAt(-2)
  const travel = ({ f, release }) => release.x - f.settle().x
  assert.equal(travel(slow), 60)
  assert.equal(travel(medium), 240)
  assert.equal(travel(fast), 480)
})
test('a fast diagonal throw glides smoothly into the corner and commits once', () => {
  const { f, release } = throwAt(-5, -4)
  let previous = release, dx = Infinity, dy = Infinity
  while (f.frames.size) {
    const current = f.frame()
    assert.ok(current.x >= 12 && current.y >= 12)
    assert.ok(previous.x - current.x <= dx + .5)
    assert.ok(previous.y - current.y <= dy + .5)
    dx = previous.x - current.x; dy = previous.y - current.y; previous = current
  }
  assert.deepEqual(previous, { x: 12, y: 12 })
  assert.equal(f.calls.filter(x => x === 'endDrag').length, 1)
  assert.equal(f.captured(), 0)
})
test('the initial coast follows release speed rather than a fixed speed cap', () => {
  const { f, release } = throwAt(-2)
  const next = f.frame(8)
  assert.ok(release.x - next.x > 15 && release.x - next.x < 16)
})
test('frame rate and a stalled animation frame preserve the same trajectory', () => {
  const variants = [8, 16, 32, 128].map(dt => { const { f } = throwAt(-1); for (let time=0; time<256; time+=dt) f.frame(dt); return f.position().x })
  assert.ok(Math.max(...variants) - Math.min(...variants) < 1e-8)
  const inputs = [8, 16, 32, 64].map(dt => { const { f, release } = throwAt(-1, 0, undefined, dt); return release.x - f.settle().x })
  assert.deepEqual(inputs, [240, 240, 240, 240])
})
test('pause before release stops stale motion, and slowing the pointer reduces travel', () => {
  const f = fixture(); f.geometry.pointerDown(f.event()); f.move(0, 100); f.idle(100); f.release()
  assert.equal(f.frames.size, 0)
  const g = fixture(); g.geometry.pointerDown(g.event()); g.move(-100,100,16)
  for (let i=1;i<=4;i++) g.move(-100-i*4,100,16)
  g.release(); const release=g.position(); assert.equal(release.x-g.settle().x,60)
})
test('the latest direction wins after a reversal and coalesced events retain speed', () => {
  const f = fixture(); f.geometry.pointerDown(f.event()); f.move(0, 100)
  for (let i=1;i<=4;i++) f.move(i*4,100)
  f.release(); const release=f.position(); assert.equal(f.settle().x-release.x,60)
  const g=fixture();g.geometry.pointerDown(g.event());g.move(36,100,64,{timeStamp:64,getCoalescedEvents:()=>[16,32,48].map(t=>({clientX:100-t,clientY:100,timeStamp:t}))});g.release()
  const start=g.position();assert.equal(start.x-g.settle().x,240)
})
test('reduced motion, motion off, cancellation, and disposal never leave a glide alive', () => {
  const a=throwAt(-1,0,{reduced:true});assert.equal(a.f.frames.size,0)
  const b=throwAt(-1);b.f.media.matches=true;b.f.frame();assert.equal(b.f.frames.size,0)
  const c=fixture();c.element.dataset.motion='off';c.geometry.pointerDown(c.event());c.move(0,100);c.release();assert.equal(c.frames.size,0)
  for(const type of ['pointercancel','lostpointercapture']){const f=fixture();f.geometry.pointerDown(f.event());f.move(0,100);f.geometry.pointerEnd(f.event(0,100,{type}));assert.equal(f.frames.size,0);assert.equal(f.calls.at(-1),'detach')}
  const d=throwAt(-1);d.f.geometry.dispose();assert.equal(d.f.frames.size,0)
})
test('new drag takes control immediately and viewport changes cannot move the panel outside', () => {
  const {f}=throwAt(-1);f.frame();f.geometry.pointerDown(f.event());assert.equal(f.frames.size,0);f.move(75,75);f.release();f.win.innerWidth=500;f.win.innerHeight=400;f.geometry.fit();f.settle();assert.ok(f.position().x>=12&&f.position().x<=168);assert.ok(f.position().y>=12&&f.position().y<=188)
})
