import { createElement, useCallback, useEffect, useMemo } from 'react'
import { isCompatHiddenVoiceId } from '../../voice-presentation-id.mjs'

const WORKSPACE_SLOT = 'sidebar.workspaces'
const WORKSPACE_LOCALE = 'workspace'
const ROOT_HOOK = 'whaleWorkspacePresentation'
const REQUIRED_CHILDREN = [
  'sidebar.workspaces.directoryFlow',
  'sidebar.workspaces.session.row.action',
  'sidebar.session.row.leading',
  'sidebar.session.row.trailing',
  'sidebar.session.row.hover',
]
const CHILD_MODES = new Set(['one-shot', 'continuable', 'unknown'])

function exactKeys(value, expected) {
  return value && typeof value === 'object'
    && Object.keys(value).length === expected.length
    && expected.every(key => Object.hasOwn(value, key))
}

function normalizeOverrides(items) {
  if (!Array.isArray(items) || items.length > 512) return null
  const normalized = []
  const seen = new Set()
  for (const item of items) {
    if (!exactKeys(item, ['id', 'parentId', 'mode'])
      || typeof item.id !== 'string' || !item.id || item.id.length > 256
      || seen.has(item.id)) return null
    if (item.parentId === null) {
      if (item.mode !== null || !isCompatHiddenVoiceId(item.id)) return null
      normalized.push({ id: item.id, parentId: null, mode: null })
    } else {
      if (typeof item.parentId !== 'string' || !item.parentId || item.parentId === item.id
        || !CHILD_MODES.has(item.mode)) return null
      normalized.push({ id: item.id, parentId: item.parentId, mode: item.mode })
    }
    seen.add(item.id)
  }
  return normalized
}

function projectSessionList(list, items) {
  if (!list || typeof list !== 'object' || !list.byId || !Array.isArray(list.ids)) return list
  const overrides = new Map(items.map(item => [item.id, item]))
  const byId = Object.create(null)
  const hidden = new Set()
  let changed = false

  for (const [id, summary] of Object.entries(list.byId)) {
    const override = overrides.get(id)
    if (isCompatHiddenVoiceId(id) && override === undefined) {
      hidden.add(id)
      changed = true
      continue
    }
    if (override?.parentId === null) {
      if (summary.parentId === undefined && summary.origin !== 'subagent') {
        byId[id] = summary
        continue
      }
      hidden.add(id)
      changed = true
      continue
    }
    if (override && summary.origin === 'subagent' && summary.parentId === override.parentId) {
      const visible = { ...summary }
      delete visible.origin
      byId[id] = visible
      changed = true
      continue
    }
    byId[id] = summary
  }

  for (const item of items) {
    const summary = list.byId[item.id]
    if (!summary) continue
    if (item.parentId === null && (summary.parentId !== undefined || summary.origin === 'subagent')) continue
    if (item.parentId !== null && (summary.origin !== 'subagent' || summary.parentId !== item.parentId)) continue
    if (!list.ids.includes(item.id)) changed = true
  }

  if (!changed) return list

  const ids = list.ids.filter(id => !hidden.has(id) && byId[id] !== undefined)
  for (const item of items) {
    if (byId[item.id] !== undefined && !ids.includes(item.id)) ids.push(item.id)
  }

  let projectionsBySession = list.projectionsBySession
  if (projectionsBySession && hidden.size > 0) {
    const filtered = { ...projectionsBySession }
    for (const id of hidden) delete filtered[id]
    projectionsBySession = filtered
  }
  return { ...list, ids, byId, projectionsBySession }
}

function stockWorkspaceEntry(entry, component) {
  if (!entry || entry.locale !== WORKSPACE_LOCALE
    || entry.options?.id !== undefined || entry.options?.key !== undefined
    || (entry.options?.priority ?? 0) !== 0
    || typeof component !== 'function' || component.name !== 'WorkspaceBrowser') return false
  return REQUIRED_CHILDREN.every(key => Object.hasOwn(entry.children ?? {}, key))
}

function mutableComponentEntry(entry) {
  if (!Object.isExtensible(entry)) return false
  const descriptor = Object.getOwnPropertyDescriptor(entry, 'component')
  return descriptor === undefined || descriptor.writable === true
}

function sameOverrides(left, right) {
  return left.length === right.length && left.every((item, index) => {
    const other = right[index]
    return item.id === other.id && item.parentId === other.parentId && item.mode === other.mode
  })
}

/**
 * Restrict presentation changes to the stock Workspace sidebar entry. The
 * source list and its session metadata remain Host-owned and untouched.
 *
 * @param {object} slots - the DSH UI SlotRegistry.
 * @param {(target: string | {childSessionId: string, parentSessionId: string, mode: string}) => void} openSession
 *   - the DSH Workspace service's openSession method.
 */
export function mountWorkspacePresentation(slots, openSession) {
  let overrides = []
  let revision = 0
  let sourceSnapshot = { revision, items: overrides }
  let attached = undefined
  let isSupported = false
  let disposed = false
  const subscribers = new Set()
  const sourceSubscribers = new Set()
  const notify = listeners => { for (const listener of [...listeners]) listener() }
  const source = {
    getSnapshot: () => sourceSnapshot,
    subscribe(listener) { sourceSubscribers.add(listener); return () => sourceSubscribers.delete(listener) },
  }
  const publish = () => {
    revision++
    sourceSnapshot = { revision, items: overrides }
    notify(sourceSubscribers)
    notify(subscribers)
  }
  const setSupported = value => {
    if (isSupported === value) return
    isSupported = value
    publish()
  }
  const restore = () => {
    const current = attached
    attached = undefined
    if (current && current.entry.component === current.wrapper) current.entry.component = current.original
  }
  const reconcile = () => {
    if (disposed) return
    let entries
    try { entries = slots.entries(WORKSPACE_SLOT) } catch { entries = undefined }
    const matches = Array.isArray(entries) ? entries.filter(entry => {
      const component = attached && attached.entry === entry && entry.component === attached.wrapper ? attached.original : entry?.component
      return stockWorkspaceEntry(entry, component)
    }) : []
    if (matches.length !== 1 || typeof openSession !== 'function' || !mutableComponentEntry(matches[0])) {
      restore()
      setSupported(false)
      return
    }
    const entry = matches[0]
    if (attached?.entry === entry && entry.component === attached.wrapper) return
    restore()
    setSupported(false)
    const original = entry.component
    const PresentedWorkspace = props => {
      const list = props.useSessions(value => value)
      const view = props.useWhaleWorkspacePresentation(value => value)
      const visibleList = useMemo(() => projectSessionList(list, view.items), [list, view])
      const useSessions = useCallback(selector => selector(visibleList), [visibleList])
      const overridesById = useMemo(() => new Map(view.items.map(item => [item.id, item])), [view])
      const open = useCallback(id => {
        const override = overridesById.get(id)
        const summary = list.byId[id]
        if (override?.parentId && summary?.origin === 'subagent' && summary.parentId === override.parentId) {
          openSession({
            childSessionId: id,
            parentSessionId: override.parentId,
            mode: override.mode,
          })
          return
        }
        props.open?.(id)
      }, [props.open, overridesById, list])
      return createElement(original, { ...props, useSessions, open })
    }
    const wrapper = function WhaleWorkspacePresentation(props) {
      const hasWorkspaceProps = typeof props?.useSessions === 'function'
        && typeof props?.useWhaleWorkspacePresentation === 'function'
        && typeof props?.open === 'function'
      useEffect(() => {
        if (attached?.entry === entry && attached.wrapper === wrapper) setSupported(hasWorkspaceProps)
      }, [hasWorkspaceProps])
      return createElement(hasWorkspaceProps ? PresentedWorkspace : original, props)
    }
    wrapper.displayName = 'WhaleWorkspacePresentation'
    entry.component = wrapper
    attached = { entry, original, wrapper }
  }

  let removeRootSource = () => {}
  let removeSlotListener = () => {}
  try {
    removeRootSource = slots.provideRoot({ hooks: { [ROOT_HOOK]: source } })
    if (typeof removeRootSource !== 'function') removeRootSource = () => {}
    removeSlotListener = slots.subscribe(WORKSPACE_SLOT, reconcile)
    if (typeof removeSlotListener !== 'function') removeSlotListener = () => {}
    reconcile()
  } catch {
    removeSlotListener()
    restore()
    removeRootSource()
    setSupported(false)
  }

  return {
    supported: () => isSupported,
    subscribe(listener) { subscribers.add(listener); return () => subscribers.delete(listener) },
    setOverrides(items) {
      if (disposed) return false
      const next = normalizeOverrides(items)
      if (next === null) {
        if (overrides.length > 0) { overrides = []; publish() }
        return false
      }
      if (sameOverrides(overrides, next)) return true
      overrides = next
      publish()
      return true
    },
    dispose() {
      if (disposed) return
      disposed = true
      removeSlotListener()
      restore()
      isSupported = false
      publish()
      removeRootSource()
      subscribers.clear()
      sourceSubscribers.clear()
    },
  }
}
