import { useEffect, useRef } from 'react'
import { Icon } from './icons.jsx'
import css from './panel.module.css'

const keyOf = value => value && typeof value === 'object' ? `${value.backend}:${value.id}` : value == null ? '' : '__legacy'

/** Saved preference and observed inventory are separate: never select a fallback. */
export function AudioDeviceControls({ state, sessionId, run, t }) {
  const latest = useRef({ state, sessionId, run })
  const initialRead = useRef(undefined)
  latest.current = { state, sessionId, run }
  useEffect(() => {
    if (!state.settings || state.settingsFor !== sessionId || state.busy || state.audioDevicesPending || initialRead.current === sessionId) return
    initialRead.current = sessionId
    void run(sessionId, 'read-audio-devices')
  }, [sessionId, state.settingsFor, state.busy, state.audioDevicesPending])
  useEffect(() => {
    let ended = false, timer
    const refresh = async () => {
      const current = latest.current
      if (!ended && current.sessionId === sessionId && !current.state.busy && !document.hidden) {
        if (current.state.settingsFor !== sessionId) await current.run(sessionId, 'read-settings')
        if (!ended) await current.run(sessionId, 'read-audio-devices')
      }
      if (!ended) timer = document.defaultView.setTimeout(refresh, 10000)
    }
    void refresh()
    return () => { ended = true; document.defaultView.clearTimeout(timer) }
  }, [sessionId])
  const current = Boolean(state.settings && state.settingsFor === sessionId)
  const settings = current ? state.settings : null
  const preferences = settings?.audioDevices ?? { input: settings?.values?.device ?? null, output: null }
  const inventory = state.audioDevicesFor === sessionId ? state.audioDevices : null
  const stopped = state.checkedFor === sessionId && !state.uncertain && state.status?.enabled === false
    && state.status?.ownerSessionId === null && state.status?.voiceControlBusy === false
    && state.status?.voiceSession?.fullyStopped === true && state.status?.voiceSession?.id == null
  const notices = []
  return <section className={css.audioDevices} aria-label={t('audioDevices')} data-audio-device-controls data-no-drag>
    <div className={css.audioDeviceGrid}>{['input','output'].map(direction => {
      const selected = preferences[direction]
      const list = inventory?.[direction]
      const selectionKey = keyOf(selected)
      const found = list?.items?.some(item => keyOf(item) === selectionKey)
      const missing = selected && typeof selected === 'object' && list && list.status !== 'unavailable' && !found
      const label = selected == null ? t('audioSystemDefault') : typeof selected === 'object' ? selected.name : String(selected)
      const unsupported = direction === 'output' && list?.reason === 'AUDIO_PLATFORM_UNSUPPORTED'
      const disabled = !current || state.busy || state.uncertain || state.settingsConflict || unsupported || direction === 'input' && !stopped
      if (missing) notices.push(t(direction === 'input' ? 'inputDeviceMissing' : 'outputDeviceMissing'))
      return <label key={direction} className={css.audioDeviceField}>
        <span><Icon name={direction === 'input' ? 'mic' : 'volume'}/>{t(direction === 'input' ? 'audioInput' : 'audioOutput')}</span>
        <select aria-label={t(direction === 'input' ? 'audioInput' : 'audioOutput')} data-device-missing={missing || undefined}
          title={disabled && direction === 'input' && !stopped ? t('inputDeviceStopFirst') : unsupported ? t('outputDeviceUnsupported') : label}
          disabled={disabled} value={selectionKey}
          onFocus={() => { if (!state.audioDevicesPending) void run(sessionId, 'read-audio-devices') }}
          onChange={event => {
            const value = event.target.value
            if (value === '__legacy' || value === selectionKey) return
            const selection = value === '' ? null : list?.items?.find(item => keyOf(item) === value)
            if (selection !== undefined) void run(sessionId, 'save-audio-device', { revision: settings.revision, direction, selection })
          }}>
          <option value="">{t('audioSystemDefault')}</option>
          {selected != null && !found && <option value={selectionKey}>{label}{missing ? ' · ' + t('deviceDisconnected') : typeof selected === 'object' ? '' : ' · ' + t('deviceSaved')}</option>}
          {list?.items?.map(item => <option key={keyOf(item)} value={keyOf(item)}>{item.name}</option>)}
        </select>
      </label>
    })}</div>
    {notices.length > 0 ? <p className={css.audioDeviceNotice} role="status">{notices.join('；')}</p>
      : state.audioDevicesError || inventory?.input?.status === 'unavailable' || inventory?.output?.status === 'unavailable' && inventory?.output?.reason !== 'AUDIO_PLATFORM_UNSUPPORTED' ? <p className={css.audioDeviceHint} role="status">{t('deviceListRetry')}</p>
      : inventory?.output?.reason === 'AUDIO_PLATFORM_UNSUPPORTED' ? <p className={css.audioDeviceHint}>{t('outputDeviceUnsupported')}</p>
      : !stopped && current ? <p className={css.audioDeviceHint}>{t('inputDeviceStopFirst')}</p> : null}
  </section>
}
