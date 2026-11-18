import { useId, useLayoutEffect, useRef } from 'react'
import { Button } from '@deepseek-ai/dsh-client-ui-primitives'
import { bugs } from '../../package.json'
import { WhaleMark } from './icons.jsx'
import css from './panel.module.css'

function updateMessage(state, t) {
  const value = state.updates
  if (state.updatePending === 'install') return t('update_installing')
  if (state.updatePending === 'check') return t('update_checking')
  if (state.updatesUnavailable) return t('updateConnection')
  if (!value) return t('update_idle')
  return value.message || t('update_' + value.status)
}

export function UpdateSettings({ state, open, t }) {
  const value = state.updates
  const hasDetails = !state.updatesUnavailable && (value?.release || ['restart-required', 'enable-required', 'installed'].includes(value?.status))
  return <section className={css.section} data-whale-update-settings>
    <h3>{t('updateTitle')}</h3>
    {value && <p className={css.hint}>{t('updateCurrentVersion')} {value.currentVersion} · {t('updateChannel_' + value.channel)}</p>}
    <p>{updateMessage(state, t)}</p>
    <div className={css.actions}>
      {hasDetails && <Button variant="outline" onClick={() => open(false)}>{t('updateDetails')}</Button>}
      <Button variant="outline" disabled={Boolean(state.updatePending) || !state.updatesUnavailable && value?.status === 'installing'} onClick={() => open(true)}>{t('updateCheck')}</Button>
      <a href={bugs.url} data-whale-operation="open-feedback" target="_blank" rel="noreferrer noopener">{t('updateFeedback')}</a>
    </div>
  </section>
}

export function UpdateDialog({ state, close, run, t }) {
  const dialog = useRef(null), titleId = useId()
  useLayoutEffect(() => {
    const node = dialog.current
    if (typeof node.showModal === 'function') node.showModal()
    else node.setAttribute('open', '')
    return () => { if (node.open) node.close?.() }
  }, [])
  const value = state.updates, release = value?.release
  const pending = Boolean(state.updatePending) || !state.updatesUnavailable && ['checking', 'installing'].includes(value?.status)
  const installable = !state.updatesUnavailable && !pending && value?.canInstall && release
  const mayCheck = !pending && (state.updatesUnavailable || !['restart-required', 'enable-required'].includes(value?.status))
  const isOffer = !state.updatesUnavailable && ['available', 'incompatible'].includes(value?.status)
  const message = installable && !value.message ? null : updateMessage(state, t)
  return <dialog ref={dialog} className={css.updateDialog} data-whale-update-dialog data-no-drag aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); close() }} onKeyDown={event => event.stopPropagation()}>
    <header className={css.updateHeader}><WhaleMark/><h2 id={titleId}>{t(isOffer ? 'updateOfferTitle' : 'updateTitle')}</h2></header>
    {value && <p className={css.hint}>
      {t('updateCurrentVersion')} {value.currentVersion}
      {release && release.version !== value.currentVersion && <> · {t('updateNewVersion')} {release.version}</>}
      {' · '}{t('updateChannel_' + value.channel)}
    </p>}
    {release?.announcement && <p className={css.updateAnnouncement}>{release.announcement}</p>}
    {message && <p className={css.hint} role="status">{message}</p>}
    <div className={css.actions}>
      <Button variant="outline" onClick={close}>{t(isOffer ? 'updateLater' : 'close')}</Button>
      {installable && <Button variant="primary" className={css.primary} onClick={() => void run({ action:'install', version:release.version })}>{t('updateInstall')}</Button>}
      {!installable && mayCheck && <Button variant="outline" onClick={() => void run({ action:'check' })}>{t('updateCheck')}</Button>}
    </div>
    <footer className={css.actions}>
      {release?.url?.startsWith('https://') && <a href={release.url} target="_blank" rel="noreferrer noopener">{t('updateRelease')}</a>}
      <a href={bugs.url} data-whale-operation="open-feedback" target="_blank" rel="noreferrer noopener">{t('updateFeedback')}</a>
    </footer>
  </dialog>
}
