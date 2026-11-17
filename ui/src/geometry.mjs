/** Keep the floating control inside its shell and the visible viewport, including native chrome. */
export function clampPosition(position, bounds, size, margin = 12) {
  const left = bounds.left + margin
  const top = bounds.top + margin
  return {
    x: Math.max(left, Math.min(position.x, Math.max(left, bounds.right - size.width - margin))),
    y: Math.max(top, Math.min(position.y, Math.max(top, bounds.bottom - size.height - margin))),
  }
}

/** DOM measurement belongs to the registration-injected adapter, not the product component. */
export function createFloatingGeometry(win = window) {
  let element = null
  let observer = null
  let drag = null
  let position = null
  let measured = null, pendingPointer = null, pointerFrame = null
  let glideFrame = null, glide = null
  const clock = () => win.performance?.now?.() ?? Date.now()
  const reduced = win.matchMedia?.('(prefers-reduced-motion: reduce)')
  const cancelGlide = () => {
    if (glideFrame !== null) win.cancelAnimationFrame?.(glideFrame)
    glideFrame = null
    if (glide) { glide = null; notifyLayout('endDrag') }
  }
  const glideStep = time => {
    glideFrame = null
    if (!glide || !element) return
    if (reduced?.matches || element.dataset?.motion === 'off') { cancelGlide(); return }
    // Integrate the exponential exactly. Frame stalls must not lose travel.
    const dt = Math.max(0, time - glide.time)
    glide.time = time
    const next = { ...position }
    let moving = false
    for (const axis of ['x', 'y']) {
      const state = glide[axis]
      const remaining = (state.target - position[axis]) * Math.exp(-dt / state.tau)
      next[axis] = Math.abs(remaining) < .5 ? state.target : state.target - remaining
      if (next[axis] !== state.target) moving = true
    }
    position = clampPosition(next, measured.box, measured.size)
    paintPosition()
    notifyLayout('move')
    // The coordinator may clamp the whole docked group before our own bounds.
    // Stop only the blocked axis, preserving travel along the other edge.
    for (const axis of ['x', 'y']) {
      if (Math.abs(position[axis] - next[axis]) > .01) glide[axis].target = position[axis]
    }
    if (!moving || time - glide.start >= 2400) cancelGlide()
    else glideFrame = win.requestAnimationFrame(glideStep)
  }
  const setStyle = (key, value) => { if (element.style[key] !== value) element.style[key] = value }
  const paintPosition = () => { setStyle('left', `${position.x}px`); setStyle('top', `${position.y}px`) }
  let layoutService = null, layout = null, originalZIndex = ''
  const bounds = () => {
    const shell = (element?.closest('[data-shell-overlay]') ?? element?.ownerDocument?.querySelector?.('[data-shell-overlay]'))?.getBoundingClientRect()
    const viewport = win.visualViewport
    const left = Math.max(shell?.left ?? 0, viewport?.offsetLeft ?? 0)
    const top = Math.max(shell?.top ?? 0, viewport?.offsetTop ?? 0)
    const right = Math.min(shell?.right ?? win.innerWidth, (viewport?.offsetLeft ?? 0) + (viewport?.width ?? win.innerWidth))
    const bottom = Math.min(shell?.bottom ?? win.innerHeight, (viewport?.offsetTop ?? 0) + (viewport?.height ?? win.innerHeight))
    const clearance = parseFloat(win.getComputedStyle(element).getPropertyValue('--dsh-frame-top-clearance')) || 0
    return { left, top: top + clearance, right, bottom }
  }
  const fit = knownSize => {
    if (!element) return
    // Sizing already knows the physical size it just wrote. Reuse it instead of
    // forcing a write/read layout flush on every spring-animation frame.
    const supplied = Number.isFinite(knownSize?.width) && Number.isFinite(knownSize?.height)
    const box = supplied && measured ? measured.box : bounds()
    setStyle('maxWidth', `${Math.max(1, box.right - box.left - 24)}px`)
    setStyle('maxHeight', `${Math.max(1, box.bottom - box.top - 24)}px`)
    const size = supplied ? knownSize : element.getBoundingClientRect()
    measured = { box, size: { width: size.width, height: size.height } }
    position = clampPosition(position ?? { x: box.right - size.width - 20, y: box.bottom - size.height - 20 }, box, size)
    paintPosition()
    if (!drag && !glide) notifyLayout('resize')
  }
  const cancelPointerFrame = () => {
    if (pointerFrame !== null) win.cancelAnimationFrame?.(pointerFrame)
    pointerFrame = null
  }
  const flushPointer = () => {
    cancelPointerFrame()
    const next = pendingPointer
    pendingPointer = null
    if (!drag || !element || !next) return
    position = clampPosition(next, measured.box, measured.size)
    paintPosition()
    notifyLayout('move')
  }
  const dock = state => {
    if (!element?.dataset) return
    if (state && ['left','right','top','bottom'].includes(state.edge) && ['preview','docked'].includes(state.phase)) {
      element.dataset.whaleDockEdge = state.edge
      element.dataset.whaleDockPhase = state.phase
    } else {
      delete element.dataset.whaleDockEdge
      delete element.dataset.whaleDockPhase
    }
  }
  const releaseLayout = () => {
    const previous = layout
    layout = null
    try { previous?.dispose() } catch { /* A peer layout failure cannot disable voice controls. */ }
    dock(null)
    if (element) element.style.zIndex = originalZIndex
  }
  const notifyLayout = method => {
    try { if (typeof layout?.[method] === 'function') layout[method]() } catch { releaseLayout() }
  }
  const connectLayout = () => {
    releaseLayout()
    if (!element || layoutService?.version !== 1 || typeof layoutService.register !== 'function') return
    try { layout = layoutService.register({
      id: 'whale-voice',
      read() {
        const { box, size } = measured
        return {
          rect: { ...position, width: size.width, height: size.height },
          bounds: { x: box.left + 12, y: box.top + 12, width: Math.max(1, box.right - box.left - 24), height: Math.max(1, box.bottom - box.top - 24) },
          collapsed: element.hasAttribute?.('data-collapsed') === true,
        }
      },
      apply(next) {
        if (!element || !Number.isFinite(next?.x) || !Number.isFinite(next?.y)) return
        position = clampPosition(next, measured.box, measured.size)
        paintPosition()
      },
      onDock: dock,
      onFront: active => { if (element) element.style.zIndex = active === true ? '901' : '900' },
    })
      if (!['beginDrag','move','endDrag','resize','detach','dispose'].every(method => typeof layout?.[method] === 'function')) releaseLayout()
    } catch { releaseLayout() }
  }
  const stop = (commit = false, coast = false) => {
    if (commit) flushPointer()
    else { cancelPointerFrame(); pendingPointer = null }
    const previous = drag
    drag = null
    if (previous?.target.hasPointerCapture?.(previous.id)) previous.target.releasePointerCapture(previous.id)
    const time = clock()
    const samples = previous?.samples ?? []
    const last = samples.at(-1), first = samples[0]
    const duration = last && first ? last.time - first.time : 0
    // Recent pointer history, not a single event spike or a fixed throw speed.
    const idle = last ? time - last.time : Infinity
    const freshness = Math.max(0, 1 - Math.max(0, idle - 24) / 56)
    const vx = duration > 0 ? (last.x - first.x) / duration * freshness : 0
    const vy = duration > 0 ? (last.y - first.y) / duration * freshness : 0
    if (previous && coast && !reduced?.matches && element?.dataset?.motion !== 'off' && typeof win.requestAnimationFrame === 'function' && Math.hypot(vx, vy) > .04) {
      const target = clampPosition({ x: position.x + vx * 240, y: position.y + vy * 240 }, measured.box, measured.size)
      const axis = (name, velocity) => ({ target: target[name], tau: velocity ? Math.max(1, Math.abs((target[name] - position[name]) / velocity)) : 240 })
      // A nearby edge shortens the braking distance while preserving release
      // speed, instead of hitting a wall abruptly or crawling at a speed cap.
      glide = { x: axis('x', vx), y: axis('y', vy), time, start: time }
      glideFrame = win.requestAnimationFrame(glideStep)
    } else if (previous) notifyLayout(commit ? 'endDrag' : 'detach')
  }
  const detach = () => {
    cancelGlide()
    stop()
    releaseLayout()
    observer?.disconnect()
    observer = null
    win.removeEventListener('resize', fit)
    win.visualViewport?.removeEventListener('resize', fit)
    win.visualViewport?.removeEventListener('scroll', fit)
    element = null
    measured = null
  }
  return {
    ref(node) {
      if (node === element) return
      detach()
      if (!node) return
      element = node
      originalZIndex = node.style.zIndex || ''
      // Pointer updates paint once per display frame, with no host transition lag.
      element.style.transitionProperty = 'none'
      observer = new win.ResizeObserver(entries => {
        const own = entries?.find?.(entry => entry.target === element)
        const size = own?.borderBoxSize?.[0] ?? own?.borderBoxSize
        // The observer already measured the border box. Shell changes still
        // refresh viewport bounds, but our own size animation needs no reread.
        if (Number.isFinite(size?.inlineSize) && Number.isFinite(size?.blockSize) && entries.every(entry => entry.target === element)) fit({ width: size.inlineSize, height: size.blockSize })
        else fit()
      })
      observer.observe(element)
      const shell = (element.closest('[data-shell-overlay]') ?? element.ownerDocument?.querySelector?.('[data-shell-overlay]'))
      if (shell) observer.observe(shell)
      win.addEventListener('resize', fit)
      win.visualViewport?.addEventListener('resize', fit)
      win.visualViewport?.addEventListener('scroll', fit)
      fit()
      connectLayout()
    },
    // Optional Cordis layout service; it never receives a session, grant or command.
    useLayoutService(service) {
      layoutService = service
      connectLayout()
      return () => { if (layoutService === service) { releaseLayout(); layoutService = null; fit() } }
    },
    activate() { cancelGlide(); notifyLayout('activate') },
    pointerDown(event, captureTarget = event.currentTarget) {
      if (event.button !== 0 || (event.pointerType && event.pointerType !== 'mouse') || !element) return
      cancelGlide()
      fit()
      notifyLayout('beginDrag')
      drag = { id: event.pointerId, target: captureTarget, x: event.clientX, y: event.clientY, start: { ...position }, samples: [{ x: event.clientX, y: event.clientY, time: clock() }] }
      captureTarget.setPointerCapture(event.pointerId)
      event.preventDefault()
    },
    pointerMove(event) {
      if (!drag || event.pointerId !== drag.id) return
      const time = clock()
      let events = [event]
      try { events = [...(event.getCoalescedEvents?.() ?? []), event] } catch { /* Ordinary pointer event remains sufficient. */ }
      for (const sample of events) {
        if (!Number.isFinite(sample.clientX) || !Number.isFinite(sample.clientY)) continue
        const offset = Number.isFinite(sample.timeStamp) && Number.isFinite(event.timeStamp) ? Math.min(0, sample.timeStamp - event.timeStamp) : 0
        const at = time + Math.max(-60, offset)
        const last = drag.samples.at(-1)
        if (at < last.time) continue
        const point = { x: sample.clientX, y: sample.clientY, time: at }
        if (at === last.time) drag.samples[drag.samples.length - 1] = point
        else drag.samples.push(point)
      }
      const cutoff = time - 60
      while (drag.samples.length > 2 && drag.samples[1].time <= cutoff) drag.samples.shift()
      // Interpolate at the history boundary so 30/60/120 Hz input agrees.
      const first = drag.samples[0], next = drag.samples[1]
      if (next && first.time < cutoff && next.time > cutoff) {
        const fraction = (cutoff - first.time) / (next.time - first.time)
        drag.samples[0] = { x: first.x + (next.x - first.x) * fraction, y: first.y + (next.y - first.y) * fraction, time: cutoff }
      }
      pendingPointer = { x: drag.start.x + event.clientX - drag.x, y: drag.start.y + event.clientY - drag.y }
      if (typeof win.requestAnimationFrame !== 'function') flushPointer()
      else if (pointerFrame === null) pointerFrame = win.requestAnimationFrame(flushPointer)
    },
    pointerEnd(event) { if (event.pointerId === drag?.id) stop(!['pointercancel','lostpointercapture'].includes(event.type),event.type==='pointerup') },
    // Kept as an inert compatibility hook. Navigation keys belong to controls.
    keyDown() {},
    fit,
    dispose: detach,
  }
}
