/** Local, non-sensitive presentation only. Never stores voice identities or transcripts. */
export const MOTION_PRESETS = ['spring', 'firm', 'off']
export function createUiPreferences(win = window) {
  const key = 'dsh-whale-voice:motion:v1'
  const nameKey = 'dsh-whale-voice:assistant-name:v1'
  const readName = () => { try { const value = win.localStorage.getItem(nameKey)?.trim(); return value && value.length<=40 ? value : null } catch { return null } }
  const listeners = new Set()
  const read = () => { try { const value = win.localStorage.getItem(key); return MOTION_PRESETS.includes(value) ? value : 'spring' } catch { return 'spring' } }
  let state = { motion: read(), assistantName: readName(), error: null }
  const publish = value => { state = value; for (const listener of listeners) listener() }
  const onStorage = event => { if ([key,nameKey,null].includes(event.key)) publish({ motion: read(), assistantName:readName(), error: null }) }
  win.addEventListener('storage', onStorage)
  return {
    getSnapshot: () => state, subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },
    setMotion(motion) {
      if (!MOTION_PRESETS.includes(motion)) return false
      // Apply immediately even when durable storage is unavailable; surface that failure.
      let error = null
      try { win.localStorage.setItem(key, motion) } catch { error = 'storage-unavailable' }
      publish({ ...state, motion, error }); return !error
    },
    setAssistantName(name) {
      if (typeof name!=='string' || !name.trim() || name.trim().length>40) return false
      const assistantName=name.trim(); let error=null
      try { win.localStorage.setItem(nameKey,assistantName) } catch { error='storage-unavailable' }
      publish({...state,assistantName,error}); return !error
    },
    dispose() { win.removeEventListener('storage', onStorage); listeners.clear() },
  }
}
export function currentVoiceTitle(state, sessionId, fallback = '语音会话') {
  if (!sessionId || state.checkedFor !== sessionId || state.uncertain) return fallback
  const id = state.status?.voiceSession?.id
  if (!id) return fallback
  const live = state.conversationFor === sessionId && state.conversation?.rootSessionId === id ? state.conversation : null
  if (live?.title?.trim()) return live.title.trim()
  const item = state.catalogFor === sessionId && state.catalog?.activeId === id ? state.catalog.items.find(item => item.id === id) : null
  return item?.title?.trim() || `${fallback} · ${id.length > 14 ? `${id.slice(0, 8)}…${id.slice(-4)}` : id}`
}
export const DRAG_EXCLUSIONS = 'button,input,textarea,select,a,label,summary,[role="button"],[role="slider"],[role="tab"],[contenteditable="true"],[data-no-drag]'
export function mayStartDrag(target, container) {
  if (!target || !container?.contains(target)) return false
  const interactive = target.closest?.(DRAG_EXCLUSIONS)
  return !interactive || interactive.hasAttribute('data-drag-surface')
}

/** Windows hook uses logical VK letters/digits, not browser physical key codes. */
export function capturedBinding(event) {
  if (event.repeat || event.isComposing || event.metaKey) return null
  let code = event.code
  if (/^Key[A-Z]$/.test(code)) {
    if (!/^[a-z]$/i.test(event.key ?? '')) return null
    code = 'Key' + event.key.toUpperCase()
  } else if (/^Digit[0-9]$/.test(code)) {
    if (!/^[0-9]$/.test(event.key ?? '')) return null
    code = 'Digit' + event.key
  }
  if (!/^(F([1-9]|1[0-9]|2[0-4])|Key[A-Z]|Digit[0-9]|Space)$/.test(code) || (event.altKey && code === 'F4')) return null
  return { code, modifiers: [event.ctrlKey && 'Control', event.altKey && 'Alt', event.shiftKey && 'Shift'].filter(Boolean) }
}
