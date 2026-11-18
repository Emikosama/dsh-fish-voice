import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './panel.module.css'

const availabilityText = { busy: '会话正在处理消息', archived: '会话已归档', unavailable: '会话暂不可用' }

export const sessionName = session => session.title?.trim() || `未命名会话 · ${session.sessionId.slice(-6).toUpperCase()}`
export const sessionAvailability = session => availabilityText[session.availability]
export const canOpenExistingSession = session => ['ready','busy'].includes(session?.availability)
export const existingBindingIdle = (state, sessionId) => state.checkedFor === sessionId && !state.uncertain && !state.busy && !state.ttsCancelling
  && !state.existingSessionWritePending && !state.existingSessionUnconfirmed && state.status?.voiceControlBusy === false
  && state.status?.voiceSession?.fullyStopped === true && state.status?.enabled === false

export function CurrentDshConversation({ sessionId, boundSession, state, controlContext, listExistingVoiceSessions, setExistingVoiceSession, readState, run, t }) {
  const [row, setRow] = useState()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const scope = useRef(null)
  const titleId = useId()
  const expectedSessionId = boundSession?.sessionId ?? null
  const returning = sessionId === expectedSessionId
  const canChoose = snapshot => existingBindingIdle(snapshot, sessionId) && Object.hasOwn(snapshot.status, 'existingVoiceSession')
    && (snapshot.status.existingVoiceSession?.sessionId ?? null) === expectedSessionId
  const isCurrent = () => controlContext.currentConversation() === sessionId && controlContext.sourceFor(sessionId) === sessionId

  useEffect(() => {
    const abort = new AbortController()
    scope.current = { signal:abort.signal, choosing:false }
    setSaving(false)
    void listExistingVoiceSessions({ sessionId }, abort.signal).then(value => {
      if (abort.signal.aborted || !isCurrent()) return
      setRow(value.items.find(item => item.sessionId === sessionId) ?? null)
      if ((value.binding?.sessionId ?? null) !== expectedSessionId) {
        void run(sessionId,'status')
      }
    }).catch(() => { if (!abort.signal.aborted) setRow(null) })
    return () => abort.abort()
  }, [sessionId, expectedSessionId, controlContext, listExistingVoiceSessions])

  const choose = async () => {
    const active = scope.current
    if (!active || active.signal.aborted || active.choosing || !isCurrent()) return
    if (!canChoose(readState())) return
    active.choosing = true
    setSaving(true)
    setError(false)
    try {
      if (returning) {
        await setExistingVoiceSession({ sessionId:null, expectedSessionId })
        return
      }
      const value = await listExistingVoiceSessions({ sessionId }, active.signal)
      if (active.signal.aborted || !isCurrent()) return
      const match = value.items.find(item => item.sessionId === sessionId)
      const bindingChanged = (value.binding?.sessionId ?? null) !== expectedSessionId
      if (bindingChanged || !canOpenExistingSession(match)) {
        setRow(match ?? null)
        setError(true)
        if (bindingChanged) void run(sessionId,'status')
        return
      }
      if (!canChoose(readState())) return
      await setExistingVoiceSession({ sessionId, expectedSessionId })
    } catch {
      if (!active.signal.aborted) setError(true)
    } finally {
      active.choosing = false
      if (!active.signal.aborted) setSaving(false)
    }
  }

  const current = returning ? boundSession : row
  const checking = row === undefined && !returning
  const visibleAction = returning || checking || canOpenExistingSession(current)
  if (!visibleAction && !error) return null
  const action = t(returning ? 'backToFishVoice' : 'chooseCurrentDshTarget')
  const title = checking ? t('checkingVoiceTarget') : current ? sessionName(current) : ''
  return <div className={css.currentDshTarget} data-whale-current-target data-no-drag>
    {visibleAction && <Button variant="outline" className={css.currentDshAction} data-whale-operation={returning ? 'unbind-existing-session' : 'bind-current-session'}
      aria-label={action} aria-busy={saving || checking} aria-describedby={titleId} disabled={!canChoose(state) || saving || checking} onClick={() => void choose()}>
      <span>{action}</span>
      <span id={titleId} className={css.ellipsis} title={title}>{title}</span>
    </Button>}
    {error && <p role="alert" className={css.hint}>{t('currentDshTargetError')}</p>}
  </div>
}

export function ExistingSessionBinding({ state, sessionId, listExistingVoiceSessions, setExistingVoiceSession, openExistingVoiceSession, showHome, homePickerId, closeHomePicker, t }) {
  const [result, setResult] = useState(null)
  const [settingsPickerOpen, setSettingsPickerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [readError, setReadError] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const request = useRef(null), mounted = useRef(false)
  const radioName = useId()
  const home = Boolean(homePickerId)
  const changing = home || settingsPickerOpen
  const status = state.status
  const binding = Object.hasOwn(status ?? {}, 'existingVoiceSession') ? status.existingVoiceSession : result?.binding
  const supported = status?.existingVoiceSessionSupported !== false
  const readyToChange = existingBindingIdle(state, sessionId)
  const saving = state.existingSessionWritePending
  const selected = result?.items.find(item => item.sessionId === selectedId)
  const canUnbind = readyToChange && !loading && Boolean(binding)
  const canChoose = readyToChange && supported && !loading && !readError && Boolean(result)

  const load = useCallback(async (query = '', cursor) => {
    request.current?.abort()
    const abort = new AbortController()
    request.current = abort
    setLoading(true)
    setReadError(false)
    try {
      const value = await listExistingVoiceSessions({ ...(query ? { query } : {}), ...(cursor ? { cursor } : {}) }, abort.signal)
      if (abort.signal.aborted) return
      setResult(previous => ({
        ...value, query, items: cursor && previous ? [...new Map(
          [...previous.items, ...value.items].map(item => [item.sessionId, item]),
        ).values()] : value.items,
      }))
    } catch {
      if (!abort.signal.aborted) setReadError(true)
    } finally {
      if (request.current === abort) { request.current = null; setLoading(false) }
    }
  }, [listExistingVoiceSessions])

  useEffect(() => {
    mounted.current = true
    if (supported) void load()
    else setLoading(false)
    return () => { mounted.current = false; request.current?.abort(); request.current = null }
  }, [load, supported])

  const search = event => {
    event.preventDefault()
    setSelectedId(null)
    setFeedback(null)
    void load(query.trim())
  }
  const change = async id => {
    if (!(id === null ? canUnbind : canChoose) || id === (binding?.sessionId ?? null)) return
    setFeedback(null)
    try {
      const { binding: saved } = await setExistingVoiceSession({ sessionId: id, expectedSessionId: binding?.sessionId ?? null })
      if (!mounted.current) return
      if (home) { closeHomePicker(); return }
      setResult(previous => previous && { ...previous, binding: saved })
      setSettingsPickerOpen(false)
      setSelectedId(null)
      setQuery('')
      setFeedback({ text:saved ? '已绑定。点击「开始对话」后即可继续该会话。' : '已解除，下一次开始对话将使用鱼应会话。' })
      if (supported) void load()
    } catch (error) {
      if (!mounted.current) return
      setFeedback({
        error: true,
        text: typeof error?.message === 'string' && error.message
          ? error.message.split('\n')[0].slice(0, 160) : '会话绑定未确认，请核对当前绑定。',
      })
      setSelectedId(null)
      if (supported) void load(changing ? query.trim() : '')
    }
  }

  const readStatus = <>
    {loading && <p role="status" className={css.hint}>{t('loadingVoiceTargets')}</p>}
    {readError && <div role="alert" className={css.notice}>{t('voiceTargetListError')} <Button variant="outline" disabled={saving} onClick={() => void load(query.trim())}>{t('retryVoiceTargets')}</Button></div>}
  </>
  const feedbackStatus = feedback && <p role={feedback.error ? 'alert' : 'status'} className={feedback.error ? css.notice : css.hint}>{feedback.text}</p>
  return <section id={homePickerId} className={home ? css.homeTargetPicker : css.section} data-whale-existing-session
    aria-label={home ? t('chooseVoiceTarget') : undefined} data-no-drag={home || undefined}>
    {!home && <>
    <h3>语音对话目标</h3>
    <div className={css.existingSessionTarget}>
      <strong className={css.sessionTitle}>{binding ? sessionName(binding) : '鱼应会话'}</strong>
      <p className={css.hint}>{binding ? '语音和回答写入此会话，鱼应仅在本机播报。其他插件的转发由其设置决定。' : '可绑定已有 DSH 会话，沿用原来的上下文和历史。'}</p>
      {binding && sessionAvailability(binding) && <p role="status" className={css.notice}>{sessionAvailability(binding)}。可解除绑定或选择其他会话。</p>}
      {!supported && <p role="status" className={css.notice}>当前 DSH 版本暂不支持绑定已有会话。</p>}
      {status?.enabled && <p className={css.hint}>结束语音对话后可修改绑定。</p>}
    </div>
    <div className={css.actions}>
      <Button variant="outline" aria-expanded={changing} disabled={!supported || saving} onClick={() => {
        setSettingsPickerOpen(!changing); setSelectedId(null); setQuery('')
        if (!changing) void load()
      }}>{changing ? '关闭会话列表' : binding ? '更换绑定' : '选择已有会话'}</Button>
      {canOpenExistingSession(binding) && openExistingVoiceSession && <Button variant="outline" data-whale-operation="open-native-session" onClick={async () => {
        setFeedback(null)
        try { await openExistingVoiceSession(binding.sessionId); await showHome?.() }
        catch { if (mounted.current) setFeedback({ error:true, text:'DSH 暂时无法打开原会话，请稍后重试。' }) }
      }}>打开原会话</Button>}
      {binding && <Button variant="outline" data-whale-operation="unbind-existing-session" disabled={!canUnbind} onClick={() => void change(null)}>解除绑定</Button>}
    </div>
    </>}
    {changing && <div className={css.existingSessionPicker} aria-busy={loading}>
      <form className={css.existingSessionSearch} onSubmit={search}>
        <Input type="search" aria-label={t('searchVoiceTargets')} placeholder={t('searchVoiceTargets')} value={query} maxLength={128} disabled={saving} onChange={event => setQuery(event.target.value)}/>
        <Button type="submit" variant="outline" disabled={saving}>{t('searchVoiceTargetsAction')}</Button>
      </form>
      {result?.items.length > 0 && <ul className={css.existingSessionList} aria-label={t('existingVoiceTargetList')}>
        {result.items.map(item => {
          const bound = binding?.sessionId === item.sessionId
          const unavailable = bound || !canOpenExistingSession(item)
          const detail = <span className={css.hint}>{bound ? t('boundVoiceTarget') + ' · ' : ''}{t('voiceTargetAvailability_' + (item.unavailableReason ?? item.availability))} · {item.sessionId}</span>
          return <li key={item.sessionId}>
            {home ? <Button variant="ghost" className={css.homeTargetRow} data-whale-operation="bind-existing-session"
              title={item.sessionId} aria-current={bound || undefined} aria-disabled={!canChoose} disabled={unavailable}
              onClick={() => void change(item.sessionId)}>
              <strong className={css.sessionTitle}>{sessionName(item)}</strong>{detail}
            </Button> : <label title={item.sessionId}>
              <input type="radio" name={radioName} value={item.sessionId} checked={selectedId === item.sessionId} disabled={unavailable || loading || saving} onChange={() => { setSelectedId(item.sessionId); setFeedback(null) }}/>
              <span>
                <strong className={css.sessionTitle}>{sessionName(item)}</strong>{detail}
              </span>
            </label>}
          </li>
        })}
      </ul>}
      {readStatus}
      {!loading && !readError && result?.items.length === 0 && <p role="status" className={css.hint}>{t(result.query ? 'voiceTargetNoMatch' : 'voiceTargetEmptyList')}</p>}
      {selected && <p id={radioName+'-tts'} className={css.hint}>{t('voiceTargetSynthesisNotice')}</p>}
      {feedbackStatus}
      {(!home || result?.nextCursor || binding) && <div className={css.actions}>
        {!home && <Button variant="primary" data-whale-operation="bind-existing-session" aria-describedby={selected ? radioName+'-tts' : undefined} disabled={!canChoose || !canOpenExistingSession(selected) || selected.sessionId === binding?.sessionId} onClick={() => void change(selectedId)}>{t(saving ? 'savingVoiceTarget' : 'bindVoiceTarget')}</Button>}
        {!!result?.nextCursor && <Button variant="outline" disabled={loading || saving} onClick={() => void load(result.query, result.nextCursor)}>{t('moreVoiceTargets')}</Button>}
        {home && binding && <Button variant="outline" data-whale-operation="unbind-existing-session" disabled={!canUnbind} onClick={() => void change(null)}>{t('backToFishVoice')}</Button>}
      </div>}
    </div>}
    {!changing && <>{readStatus}{feedbackStatus}</>}
  </section>
}
