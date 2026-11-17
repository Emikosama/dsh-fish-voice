/** Actual layout sizing: no scaling/rotating content, overlays, or input delay. */
export const PANEL_WIDTHS = Object.freeze({ panel: 320, settings: 660, setup: 420, collapsed: 216 })

export function createPanelSizing(win = window, { onResize = () => {} } = {}) {
  let frame = null, content = null, resizeObserver = null, mutationObserver = null, surfaceObserver = null, observedSurface = null
  let raf = null, surfaceRaf = null, lastTime = null, current = null, target = null
  let bound = null
  let previousCollapsed = null, compactTransition = null, radius = null
  let velocity = { width: 0, height: 0 }
  const reduced = win.matchMedia?.('(prefers-reduced-motion: reduce)')
  const mode = () => reduced?.matches ? 'off' : (frame?.dataset.motion ?? 'spring')
  const px = value => Number.parseFloat(value) || 0
  function limits() {
    const viewport = win.visualViewport
    const shell = (frame.closest?.('[data-shell-overlay]') ?? frame.ownerDocument?.querySelector?.('[data-shell-overlay]'))?.getBoundingClientRect()
    const left = Math.max(shell?.left ?? 0, viewport?.offsetLeft ?? 0)
    const top = Math.max(shell?.top ?? 0, viewport?.offsetTop ?? 0)
    const right = Math.min(shell?.right ?? win.innerWidth, (viewport?.offsetLeft ?? 0) + (viewport?.width ?? win.innerWidth))
    const bottom = Math.min(shell?.bottom ?? win.innerHeight, (viewport?.offsetTop ?? 0) + (viewport?.height ?? win.innerHeight))
    const style = win.getComputedStyle(frame)
    return {
      width: Math.max(1, right - left - 24),
      height: Math.max(1, Math.min((bottom - top) * 0.6, bottom - top - 24 - px(style.getPropertyValue('--dsh-frame-top-clearance')))),
      chrome: px(style.paddingTop) + px(style.paddingBottom) + px(style.borderTopWidth) + px(style.borderBottomWidth),
      horizontalChrome: px(style.paddingLeft) + px(style.paddingRight) + px(style.borderLeftWidth) + px(style.borderRightWidth),
      panelRadius: px(style.getPropertyValue('--dsw-radius-lg')) || 12,
    }
  }
  function cancel() {
    if (raf !== null) win.cancelAnimationFrame(raf)
    raf = null
    lastTime = null
  }
  function paint() {
    if (!frame || !current) return
    current.width = Math.max(1, Math.min(current.width, bound.width))
    current.height = Math.max(1, Math.min(current.height, bound.height))
    frame.style.width = `${current.width.toFixed(3)}px`
    frame.style.height = `${current.height.toFixed(3)}px`
    frame.style.setProperty?.('--whale-visible-content', `${Math.max(1,current.height-bound.chrome)}px`)
    if (radius === null) frame.style.removeProperty?.('--whale-animated-radius')
    else frame.style.setProperty?.('--whale-animated-radius', `${radius.toFixed(2)}px`)
    onResize({ width: current.width, height: current.height })
  }
  function tick(time) {
    raf = null
    if (!frame || !target) return
    const dt = Math.min(0.032, Math.max(0.001, lastTime === null ? 1 / 60 : (time - lastTime) / 1000))
    lastTime = time
    // Both modes are short physical size transitions; firm is critically damped.
    const stiffness = compactTransition ? 560 : mode() === 'firm' ? 420 : 360
    const damping = compactTransition ? 47.4 : mode() === 'firm' ? 41 : 30
    let settled = true
    for (const axis of ['width', 'height']) {
      // Small substeps make variable refresh rates and interrupted updates stable.
      for (let step = 0; step < 4; step++) {
        velocity[axis] += (stiffness * (target[axis] - current[axis]) - damping * velocity[axis]) * dt / 4
        current[axis] += velocity[axis] * dt / 4
      }
      if (Math.abs(target[axis] - current[axis]) > 0.25 || Math.abs(velocity[axis]) > 1) settled = false
    }
    if (compactTransition) {
      const distance = target.height - compactTransition.height
      const fraction = Math.abs(distance) > .25 ? Math.max(0, Math.min(1, (current.height - compactTransition.height) / distance)) : 1
      const end = previousCollapsed ? target.height / 2 : bound.panelRadius
      radius = compactTransition.radius + (end - compactTransition.radius) * fraction
    }
    if (settled || mode() === 'off') {
      current = { ...target }
      velocity = { width: 0, height: 0 }
      lastTime = null
      compactTransition = radius = null
    }
    paint()
    if (!settled && mode() !== 'off') raf = win.requestAnimationFrame(tick)
  }
  function update() {
    if (!frame || !content) return
    bound = limits()
    frame.dataset.compactHeight = bound.height < 300 ? 'true' : 'false'
    const collapsed = frame.hasAttribute('data-collapsed') && frame.dataset.collapsed !== 'false'
    if (current && previousCollapsed !== null && collapsed !== previousCollapsed) {
      const start = radius ?? (previousCollapsed ? current.height / 2 : bound.panelRadius)
      compactTransition = { height: current.height, radius: start }
      radius = start
      frame.style.setProperty?.('--whale-animated-radius', `${start.toFixed(2)}px`)
      velocity = { width: 0, height: 0 }
    }
    previousCollapsed = collapsed
    const view = frame.dataset.view
    const width = Math.min(bound.width, collapsed ? PANEL_WIDTHS.collapsed : (PANEL_WIDTHS[view] ?? PANEL_WIDTHS.panel))
    frame.style.boxSizing = 'border-box'
    frame.style.transitionProperty = 'none'
    frame.style.overflow = 'hidden'
    frame.style.maxWidth = `${bound.width}px`
    frame.style.maxHeight = `${bound.height}px`
    const contentLimit = Math.max(1, bound.height - bound.chrome)
    // Lay out at the destination width before measuring. The frame clips the
    // entrance animation without rewrapping text on every spring tick.
    content.style.width = `${Math.max(1, width - bound.horizontalChrome)}px`
    content.style.maxHeight = `${contentLimit}px`
    content.style.overflowY = 'hidden'
    content.style.minHeight = '0'
    frame.style.setProperty?.('--whale-content-limit', `${contentLimit}px`)
    const expanded = Boolean(content.querySelector?.('[data-size-detail="true"]'))
    const naturalTarget = collapsed ? null : view === 'setup'
      ? content.querySelector?.('[data-whale-intrinsic]')
      : view === 'home' && !expanded ? content.querySelector?.('[data-home-controls]') : null
    const scrollContent = naturalTarget?.querySelector?.('[data-whale-natural-content]')
    const observedTarget = scrollContent ?? naturalTarget
    if (view === 'setup' && !collapsed) content.style.height = 'auto'
    // Watch the natural surface, never the animated frame or transcript.
    if (observedTarget !== observedSurface) {
      surfaceObserver?.disconnect()
      if (surfaceRaf !== null) win.cancelAnimationFrame(surfaceRaf)
      surfaceRaf = null
      surfaceObserver = null
      observedSurface = observedTarget
      if (observedSurface && win.ResizeObserver) {
        surfaceObserver = new win.ResizeObserver(() => {
          if (surfaceRaf !== null) return
          surfaceRaf = win.requestAnimationFrame(() => { surfaceRaf = null; update() })
        })
        surfaceObserver.observe(observedSurface)
      }
    }
    const surfaceHeight = naturalTarget?.getBoundingClientRect?.().height
    const remainingHeight = scrollContent ? Math.max(0,scrollContent.offsetHeight-scrollContent.parentElement.clientHeight) : 0
    const naturalHeight = surfaceHeight + remainingHeight
    const preferredHeight = collapsed ? 44 : naturalHeight > 0 ? Math.ceil(naturalHeight + bound.chrome)
      : view === 'home' ? (expanded ? 520 : 320) : 480
    const height = Math.min(bound.height, preferredHeight)
    if (view !== 'setup' || collapsed) content.style.height = `${Math.max(1, height - bound.chrome)}px`
    target = { width, height }
    if (!current || mode() === 'off') {
      cancel()
      current = { ...target }
      velocity = { width: 0, height: 0 }
      compactTransition = radius = null
      paint()
    } else if (raf === null && (Math.abs(current.width - width) > 0.25 || Math.abs(current.height - height) > 0.25)) {
      lastTime = win.performance?.now?.() ?? null
      raf = win.requestAnimationFrame(tick)
    }
  }
  function disconnect() {
    cancel()
    resizeObserver?.disconnect()
    mutationObserver?.disconnect()
    surfaceObserver?.disconnect()
    if (surfaceRaf !== null) win.cancelAnimationFrame(surfaceRaf)
    surfaceRaf = null
    surfaceObserver = observedSurface = null
    win.removeEventListener('resize', update)
    win.visualViewport?.removeEventListener('resize', update)
    win.visualViewport?.removeEventListener('scroll', update)
    reduced?.removeEventListener?.('change', update)
    resizeObserver = mutationObserver = null
  }
  function connect() {
    disconnect()
    if (!frame || !content) return
    if (win.ResizeObserver) {
      resizeObserver = new win.ResizeObserver(update)
      // Fixed size classes do not depend on content dimensions. Observing the
      // content would re-run measurement on every width-animation frame.
      const shell = (frame.closest?.('[data-shell-overlay]') ?? frame.ownerDocument?.querySelector?.('[data-shell-overlay]'))
      if (shell) resizeObserver.observe(shell)
    }
    if (win.MutationObserver) {
      mutationObserver = new win.MutationObserver(update)
      mutationObserver.observe(frame, { attributes: true, attributeFilter: ['data-view', 'data-motion', 'data-collapsed'] })
      mutationObserver.observe(content, { attributes: true, attributeFilter: ['data-size-detail','data-home-layout'], subtree: true })
    }
    win.addEventListener('resize', update)
    win.visualViewport?.addEventListener('resize', update)
    win.visualViewport?.addEventListener('scroll', update)
    reduced?.addEventListener?.('change', update)
    update()
  }
  return {
    ref(node) { if (frame !== node) { frame = node; current = target = previousCollapsed = compactTransition = radius = null; velocity = { width: 0, height: 0 }; connect() } },
    contentRef(node) { if (content !== node) { content = node; connect() } },
    update,
    dispose() { disconnect(); frame = content = current = target = null },
  }
}
