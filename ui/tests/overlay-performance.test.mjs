import test from 'node:test'
import assert from 'node:assert/strict'
import { createFloatingGeometry } from '../src/geometry.mjs'
import { performanceFixture } from './fixtures/geometry-performance.mjs'

test('240 pointer events paint twice with cached bounds and size, including coordinator reads', () => {
  const f = performanceFixture(createFloatingGeometry)
  f.geometry.pointerDown(f.event()); f.reset()
  for (let frame = 0; frame < 2; frame++) {
    for (let i = 1; i <= 120; i++) f.geometry.pointerMove(f.event({ clientX: 700 - (frame * 120 + i) / 10, clientY: 590 }))
    assert.equal(f.frames.size, 1); f.frame()
  }
  assert.deepEqual(f.metrics, { rectReads: 0, computedReads: 0, styleWrites: 3, layoutMoves: 2 })
  assert.equal(f.element.style.left, '636px'); assert.equal(f.element.style.top, '570px')
  f.geometry.pointerEnd(f.event()); f.geometry.dispose()
})

test('release flushes the last move before committing, and cancellation discards queued movement', () => {
  const f = performanceFixture(createFloatingGeometry)
  f.geometry.pointerDown(f.event()); f.geometry.pointerMove(f.event({ clientX: 600 })); f.geometry.pointerEnd(f.event({ type: 'pointerup' }))
  assert.equal(f.frames.size, 0); assert.equal(f.element.style.left, '560px'); assert.equal(f.captures.size, 0)
  f.geometry.pointerDown(f.event()); f.geometry.pointerMove(f.event({ clientX: 500 })); f.geometry.pointerEnd(f.event({ type: 'pointercancel' })); f.frame()
  assert.equal(f.element.style.left, '560px'); assert.equal(f.captures.size, 0); f.geometry.dispose()
})

test('a viewport resize refreshes cached limits before a pending drag paints', () => {
  const f = performanceFixture(createFloatingGeometry)
  f.geometry.pointerDown(f.event()); f.geometry.pointerMove(f.event({ clientX: 900, clientY: 800 }))
  f.win.innerWidth = 600; f.win.innerHeight = 400; f.geometry.fit(); f.frame()
  assert.equal(f.element.style.left, '268px'); assert.equal(f.element.style.top, '188px'); f.geometry.dispose()
})

test('sizing supplies physical dimensions without repeated layout reads, and dispose cancels paint', () => {
  const f = performanceFixture(createFloatingGeometry); f.reset()
  f.geometry.fit({ width: 216, height: 44 }); assert.equal(f.metrics.rectReads, 0); assert.equal(f.metrics.computedReads, 0)
  f.geometry.pointerDown(f.event()); f.geometry.pointerMove(f.event({ clientX: 600 })); f.geometry.dispose()
  assert.equal(f.frames.size, 0); assert.equal(f.captures.size, 0); f.reset(); f.frame(); assert.equal(f.metrics.styleWrites, 0)
})

test('size animation reuses limits and hands physical size to geometry on every painted frame', async () => {
  const { createPanelSizing } = await import('../src/panel-sizing.mjs')
  let reads = 0, time = 0, id = 0, notified = 0
  const frames = new Map()
  const win = { innerWidth: 1000, innerHeight: 800, addEventListener() {}, removeEventListener() {},
    getComputedStyle() { reads++; return { paddingTop: '12px', paddingBottom: '12px', getPropertyValue: () => '0' } },
    requestAnimationFrame(fn) { frames.set(++id, fn); return id }, cancelAnimationFrame(id) { frames.delete(id) } }
  const frame = { style: {}, dataset: { view: 'home' }, closest: () => null, hasAttribute: () => false }, content = { style: {} }
  const sizing = createPanelSizing(win, { onResize(size) { notified++; assert.ok(Number.isFinite(size.width) && Number.isFinite(size.height)) } })
  sizing.ref(frame); sizing.contentRef(content); frame.dataset.view = 'settings'; sizing.update(); reads = 0
  for (let i = 0; frames.size && i < 150; i++) { const next = [...frames.values()]; frames.clear(); time += 16; next.forEach(fn => fn(time)) }
  assert.equal(frames.size, 0); assert.equal(reads, 0); assert.ok(notified > 2)
  assert.equal(frame.style.width, '660.000px'); sizing.dispose()
})
