/** Deterministic frame and DOM-work counters, not a GPU/FPS benchmark. */
export function performanceFixture(createFloatingGeometry) {
  let id = 0
  const frames = new Map(), captures = new Set(), metrics = { rectReads: 0, computedReads: 0, styleWrites: 0, layoutMoves: 0 }
  const element = { style: new Proxy({}, { set(target, key, value) { metrics.styleWrites++; target[key] = value; return true } }), dataset: {}, closest: () => null,
    getBoundingClientRect() { metrics.rectReads++; return { width: 320, height: 200 } },
    setPointerCapture: id => captures.add(id), hasPointerCapture: id => captures.has(id), releasePointerCapture: id => captures.delete(id) }
  const win = { innerWidth: 1000, innerHeight: 800, getComputedStyle() { metrics.computedReads++; return { getPropertyValue: () => '0' } }, addEventListener() {}, removeEventListener() {}, ResizeObserver: class { observe() {} disconnect() {} },
    requestAnimationFrame(fn) { frames.set(++id, fn); return id }, cancelAnimationFrame(id) { frames.delete(id) } }
  const geometry = createFloatingGeometry(win)
  geometry.ref(element)
  let registration
  geometry.useLayoutService({ version: 1, register(value) { registration = value; return { beginDrag() {}, move() { metrics.layoutMoves++; registration.read() }, endDrag() {}, resize() {}, detach() {}, dispose() {} } } })
  const event = (extra = {}) => ({ pointerType: 'mouse', button: 0, pointerId: 1, clientX: 700, clientY: 600, currentTarget: element, preventDefault() {}, ...extra })
  return { geometry, element, win, frames, captures, metrics, event,
    reset() { Object.keys(metrics).forEach(key => { metrics[key] = 0 }) },
    frame() { const next = [...frames.values()]; frames.clear(); next.forEach(fn => fn(16)) } }
}
