import test from 'node:test'
import assert from 'node:assert/strict'
import { createFloatingGeometry } from '../src/geometry.mjs'

function fixture() {
  const captured = new Set()
  const element = {
    style: {}, closest: () => null,
    getBoundingClientRect: () => ({ width: 320, height: 200 }),
    setPointerCapture(id) { captured.add(id) }, hasPointerCapture: id => captured.has(id), releasePointerCapture(id) { captured.delete(id) },
  }
  const win = { innerWidth: 1000, innerHeight: 800, getComputedStyle: () => ({ getPropertyValue: () => '0' }), addEventListener() {}, removeEventListener() {}, ResizeObserver: class { observe() {} disconnect() {} } }
  const geometry = createFloatingGeometry(win)
  geometry.ref(element)
  let prevented = 0
  const event = overrides => ({ pointerType: 'mouse', button: 0, pointerId: 1, clientX: 700, clientY: 600, currentTarget: element, preventDefault() { prevented++ }, ...overrides })
  return { geometry, element, win, captured, event, prevented: () => prevented }
}

test('mouse drag changes position synchronously and clamps to screen', () => {
  const f = fixture()
  f.geometry.pointerDown(f.event())
  f.geometry.pointerMove(f.event({ clientX: 600, clientY: 500 }))
  assert.equal(f.element.style.left, '560px'); assert.equal(f.element.style.top, '480px')
  assert.equal(f.element.style.transitionProperty, 'none')
  f.geometry.pointerMove(f.event({ clientX: -500, clientY: -500 }))
  assert.equal(f.element.style.left, '12px'); assert.equal(f.element.style.top, '12px')
  f.geometry.pointerEnd(f.event()); assert.equal(f.captured.size, 0)
})

test('touch, pen, right button and keyboard cannot move the window', () => {
  const f = fixture()
  const initial = { ...f.element.style }
  for (const pointerType of ['touch', 'pen']) {
    f.geometry.pointerDown(f.event({ pointerType }))
    f.geometry.pointerMove(f.event({ pointerType, clientX: 0, clientY: 0 }))
  }
  f.geometry.pointerDown(f.event({ button: 2 }))
  for (const key of ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab', 'Enter']) f.geometry.keyDown(f.event({ key }))
  assert.deepEqual(f.element.style, initial); assert.equal(f.prevented(), 0); assert.equal(f.captured.size, 0)
})

test('public fit clamps after resize and disposal releases capture', () => {
  const f = fixture()
  f.geometry.pointerDown(f.event()); f.win.innerWidth = 600; f.win.innerHeight = 400; f.geometry.fit()
  assert.equal(f.element.style.left, '268px'); assert.equal(f.element.style.top, '188px')
  f.geometry.dispose(); assert.equal(f.captured.size, 0)
})

test('release preserves a fast throw; cancellation and new interactions stop it',()=>{
 const f=fixture(),frames=new Map();let time=0,id=0
 f.win.performance={now:()=>time};f.win.requestAnimationFrame=fn=>{frames.set(++id,fn);return id};f.win.cancelAnimationFrame=id=>frames.delete(id);f.element.dataset={motion:'spring'}
 const step=()=>{time+=16;const jobs=[...frames.values()];frames.clear();jobs.forEach(fn=>fn(time))}
 f.geometry.pointerDown(f.event());time=16;f.geometry.pointerMove(f.event({clientX:650,clientY:560}));step();const release=Number.parseFloat(f.element.style.left)
 f.geometry.pointerEnd(f.event({type:'pointerup'}));for(let i=0;i<160;i++)step()
 const end=Number.parseFloat(f.element.style.left);assert.ok(end<release&&release-end>300);assert.equal(frames.size,0)
 f.geometry.pointerDown(f.event());time+=16;f.geometry.pointerMove(f.event({clientX:750}));step();f.geometry.pointerEnd(f.event({type:'pointerup'}));assert.ok(frames.size>0);f.geometry.activate();assert.equal(frames.size,0)
 f.element.dataset.motion='off';f.geometry.pointerDown(f.event());time+=16;f.geometry.pointerMove(f.event({clientX:600}));step();f.geometry.pointerEnd(f.event({type:'pointerup'}));assert.equal(frames.size,0)
 f.element.dataset.motion='spring';f.geometry.pointerDown(f.event());time+=16;f.geometry.pointerMove(f.event({clientX:600}));f.geometry.pointerEnd(f.event({type:'pointercancel'}));assert.equal(frames.size,0);f.geometry.dispose()
})
