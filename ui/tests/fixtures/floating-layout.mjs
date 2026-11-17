/** Same-renderer layout only. This service never carries capture, voice, or session controls. */
const IDS = new Set(['whale-watch', 'whale-voice'])
const opposite = { left: 'right', right: 'left', top: 'bottom', bottom: 'top' }
const finite = value => typeof value === 'number' && Number.isFinite(value)
const clean = value => Math.round(value * 100) / 100
const samePosition = (a, b) => Math.abs(a.x - b.x) < .5 && Math.abs(a.y - b.y) < .5
function validRect(value) {
  return value && ['x', 'y', 'width', 'height'].every(key => finite(value[key])) && value.width > 0 && value.height > 0
}
function inside(rect, bounds) {
  return rect.x >= bounds.x && rect.y >= bounds.y && rect.x + rect.width <= bounds.x + bounds.width + .5 && rect.y + rect.height <= bounds.y + bounds.height + .5
}
function clamp(rect, bounds) {
  return {
    x: clean(Math.max(bounds.x, Math.min(rect.x, bounds.x + Math.max(0, bounds.width - rect.width)))),
    y: clean(Math.max(bounds.y, Math.min(rect.y, bounds.y + Math.max(0, bounds.height - rect.height)))),
  }
}
function overlap(a, b, horizontal) {
  const axis = horizontal ? 'y' : 'x', extent = horizontal ? 'height' : 'width'
  return Math.min(a[axis] + a[extent], b[axis] + b[extent]) - Math.max(a[axis], b[axis])
}
function position(anchor, member, edge, offset, gap) {
  switch (edge) {
    case 'left': return { x: anchor.x - member.width - gap, y: anchor.y + offset }
    case 'right': return { x: anchor.x + anchor.width + gap, y: anchor.y + offset }
    case 'top': return { x: anchor.x + offset, y: anchor.y - member.height - gap }
    case 'bottom': return { x: anchor.x + offset, y: anchor.y + anchor.height + gap }
    default: throw new Error('Unsupported docking edge')
  }
}

/**
 * Provide this object through Cordis `whaleFloatingLayout`. Consumers only read
 * their own CSS viewport rectangles and apply positions to their own element.
 * @param {{threshold?: number, gap?: number}} options Magnetic distance and gap in CSS pixels.
 * @returns {{version: number, register: Function, dispose: Function}} Reversible same-renderer service.
 */
export function createFloatingLayout({ threshold = 18, gap = 6 } = {}) {
  if (!finite(threshold) || threshold < 0 || threshold > 64 || !finite(gap) || gap < 0 || gap > 32) throw new Error('Invalid floating layout distances')
  const entries = new Map()
  let relation, preview, dragging, front, processing = false, disposed = false
  function read(entry) {
    try {
      const value = entry.read()
      return value && validRect(value.rect) && validRect(value.bounds) ? value : undefined
    } catch { return undefined }
  }
  function notify(entry, value) {
    const key = value ? `${value.peer}:${value.edge}:${value.phase}` : ''
    if (key === entry.notice) return
    entry.notice = key
    try { entry.onDock?.(value) } catch { /* Presentation failure cannot move or control a peer. */ }
  }
  function announce() {
    for (const entry of entries.values()) {
      const link = preview ?? relation
      if (!link) { notify(entry, null); continue }
      const phase = preview ? 'preview' : 'docked'
      if (entry.id === link.member) notify(entry, { peer: link.anchor, edge: link.edge, phase })
      else if (entry.id === link.anchor) notify(entry, { peer: link.member, edge: opposite[link.edge], phase })
      else notify(entry, null)
    }
  }
  function unlink() { relation = undefined; preview = undefined; announce() }
  function apply(entry, next) {
    if (entries.get(entry.id) !== entry) return false
    const before = read(entry)
    if (!before) return false
    const target = { x: clean(next.x), y: clean(next.y) }
    if (samePosition(before.rect, target)) return true
    try { entry.apply(target) } catch { return false }
    const after = read(entry)
    return Boolean(entries.get(entry.id) === entry && after && samePosition(after.rect, target))
  }
  function fit(entry) {
    const value = read(entry)
    return value ? apply(entry, clamp(value.rect, value.bounds)) : false
  }
  function activate(id) {
    front = id
    for (const entry of entries.values()) {
      const next = entry.id === front
      if (entry.front === next) continue
      entry.front = next
      try { entry.onFront?.(next) } catch { /* Layer presentation cannot affect a peer's business state. */ }
    }
  }
  function separate(anchor, member) {
    const a = read(anchor), m = read(member)
    if (!a || !m || overlap(a.rect, m.rect, true) <= 0 || overlap(a.rect, m.rect, false) <= 0) return
    for (const edge of ['right', 'left', 'bottom', 'top']) {
      const next = position(a.rect, m.rect, edge, 0, gap)
      if (inside({ ...m.rect, ...next }, m.bounds) && apply(member, next)) return
    }
    // A narrow viewport may not fit both bodies. Keep their header rows reachable.
    for (const [moving, fixed, value, other] of [[member, anchor, m, a], [anchor, member, a, m]]) {
      for (const offset of [44, -44]) {
        const next = { x: value.rect.x, y: other.rect.y + offset }
        if (inside({ ...value.rect, ...next }, value.bounds) && apply(moving, next)) {
          activate(offset > 0 ? moving.id : fixed.id)
          return
        }
      }
    }
  }
  function candidates(member) {
    const own = read(member)
    if (!own || !inside(own.rect, own.bounds)) return []
    const found = []
    for (const anchor of entries.values()) {
      if (anchor === member) continue
      const target = read(anchor)
      if (!target || !inside(target.rect, target.bounds)) continue
      for (const edge of ['right', 'left', 'bottom', 'top']) {
        const horizontal = edge === 'right' || edge === 'left'
        if (overlap(own.rect, target.rect, horizontal) < Math.min(24, (horizontal ? Math.min(own.rect.height, target.rect.height) : Math.min(own.rect.width, target.rect.width)) / 2)) continue
        const axis = horizontal ? 'y' : 'x'
        let offset = own.rect[axis] - target.rect[axis]
        if (Math.abs(offset) <= threshold) offset = 0
        const next = position(target.rect, own.rect, edge, offset, gap)
        const distance = Math.abs(next.x - own.rect.x) + Math.abs(next.y - own.rect.y)
        if (distance > threshold || !inside({ ...own.rect, ...next }, own.bounds)) continue
        found.push({ anchor: anchor.id, member: member.id, edge, offset, next, distance })
      }
    }
    return found.sort((a, b) => a.distance - b.distance)
  }
  function fitTogether(driver) {
    const link = relation, anchor = entries.get(link.anchor), member = entries.get(link.member)
    const a = anchor && read(anchor), m = member && read(member)
    if (!a || !m) return false
    const ar = { ...a.rect }, mr = { ...m.rect }
    // The dragged end owns the desired position. Either end can lead the pair.
    if (driver === link.member) Object.assign(ar, position(mr, ar, opposite[link.edge], -link.offset, gap))
    else Object.assign(mr, position(ar, mr, link.edge, link.offset, gap))
    if (overlap(ar, mr, ['left', 'right'].includes(link.edge)) <= 0) return false
    const correction = {}
    for (const [axis, extent] of [['x', 'width'], ['y', 'height']]) {
      // Intersect both movement ranges instead of clamping each window apart.
      const min = Math.max(a.bounds[axis] - ar[axis], m.bounds[axis] - mr[axis])
      const max = Math.min(a.bounds[axis] + a.bounds[extent] - ar[axis] - ar[extent], m.bounds[axis] + m.bounds[extent] - mr[axis] - mr[extent])
      if (min > max) return false
      correction[axis] = Math.max(min, Math.min(0, max))
    }
    for (const [entry, rect] of [[anchor, ar], [member, mr]]) {
      if (relation !== link || !apply(entry, { x: rect.x + correction.x, y: rect.y + correction.y })) return false
    }
    return relation === link
  }
  function stabilize() {
    if (processing || disposed) return
    processing = true
    try {
      if (relation) {
        const anchor = entries.get(relation.anchor), member = entries.get(relation.member)
        if (!fitTogether(dragging?.id)) {
          unlink()
          for (const entry of entries.values()) fit(entry)
          if (anchor && member && entries.get(anchor.id) === anchor && entries.get(member.id) === member) separate(anchor, member)
        }
      } else if (!dragging) for (const entry of entries.values()) fit(entry)
      // Independent drags only preview. A broken group cannot silently re-dock.
      const entry = dragging && entries.get(dragging.id)
      preview = entry && !dragging.grouped ? candidates(entry)[0] : undefined
      announce()
    } finally { processing = false }
  }
  return Object.freeze({
    version: 1,
    register({ id, read: readRect, apply: applyPosition, onDock, onFront }) {
      if (disposed) throw new Error('Floating layout is disposed')
      if (!IDS.has(id) || entries.has(id) || typeof readRect !== 'function' || typeof applyPosition !== 'function') throw new Error('Invalid or duplicate floating widget')
      const entry = { id, read: readRect, apply: applyPosition, onDock, onFront, notice: undefined }
      entries.set(id, entry); notify(entry, null); activate(front ?? id)
      let removed = false
      const active = () => !disposed && !removed && entries.get(id) === entry
      return Object.freeze({
        beginDrag() {
          if (!active()) return
          preview = undefined; dragging = { id, grouped: Boolean(relation) }; activate(id); announce()
        },
        move() {
          if (!active() || dragging?.id !== id) return
          stabilize()
        },
        endDrag() {
          if (!active() || dragging?.id !== id) return
          const grouped = dragging.grouped
          if (grouped) stabilize()
          preview = undefined; dragging = undefined
          if (!grouped) {
            fit(entry)
            relation = candidates(entry)[0]
          }
          stabilize()
        },
        resize() { if (active()) stabilize() },
        activate() { if (active()) activate(id) },
        detach() { if (active()) { dragging = undefined; unlink(); stabilize() } },
        dispose() {
          if (!active()) return
          removed = true; entries.delete(id)
          if (dragging?.id === id) dragging = undefined
          notify(entry, null); unlink(); activate(front === id ? entries.keys().next().value : front); stabilize()
        },
      })
    },
    dispose() {
      if (disposed) return
      disposed = true; relation = undefined; preview = undefined; dragging = undefined
      for (const entry of entries.values()) notify(entry, null)
      entries.clear()
    },
  })
}
