const settingsActions = new Map([
  ['audio','settings-audio'], ['interaction','settings-interaction'], ['prompt','settings-prompt'],
  ['models','settings-models'], ['advanced','settings-advanced'], ['pets','settings-pets'],
  ['repair','page-repair'], ['sessions','page-session-management'],
])

function eventElement(event) {
  if (event.nativeEvent?.isTrusted !== true) return null
  const element = event.target
  if (!element?.closest) return null
  const log = element.closest('[data-whale-operation-log]')
  if (log && !(event.type === 'click' && element.closest('summary')?.parentElement === log)) return null
  return element
}

/** Classify only controls and navigation. The journal receives no DOM content or values. */
export function classifyUserOperation(event) {
  const element = eventElement(event)
  if (!element) return null
  if (event.type === 'submit') return 'commit-form'
  if (event.type === 'keydown') {
    if (event.key === 'Escape') return 'dismiss'
    return ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)
      && element.closest('[data-settings-nav], [role="listbox"]') ? 'keyboard-navigation' : null
  }
  if (event.type === 'change') {
    if (element.matches('input[type="radio"]') && ['listen-mode-ptt','listen-mode-always','listen-mode-wake'].includes(element.dataset.whaleOperation)) return element.dataset.whaleOperation
    if (element.closest('[data-audio-device-controls] select')) return 'change-audio-device'
    return element.matches('select, input[type="radio"], input[type="checkbox"]') ? 'edit-choice' : null
  }
  if (event.type !== 'click') return null
  const control = element.closest('button, a[href], summary')
  if (!control || (control.type === 'submit' && control.form)) return null
  const explicit = control.dataset.whaleOperation
  if (explicit === 'open-feedback' && control.matches('summary') && control.parentElement.open) return 'dismiss'
  if (control.matches('summary') && ['session-history','subagent-history'].includes(explicit))
    return explicit + (control.parentElement.open ? '-close' : '-open')
  if (explicit) return explicit
  if (control.hasAttribute('data-settings-tab'))
    return settingsActions.get(control.dataset.settingsTab) ?? 'page-settings-tab'
  if (control.closest('[data-whale-session-management], [data-whale-existing-session]')) return 'manage-session'
  if (control.closest('[data-settings-page-heading] nav')) return 'page-model-tab'
  if (control.matches('summary')) return 'details-toggle'
  return 'activate-control'
}
