import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './panel.module.css'

const availabilityText = { busy: '会话正在处理消息', archived: '会话已归档', unavailable: '会话暂不可用' }

export const sessionName = session => session.title?.trim() || `未命名会话 · ${session.sessionId.slice(-6).toUpperCase()}`
export const sessionAvailability = session => availabilityText[session.availability]
export const canOpenExistingSession = session => ['ready','busy'].includes(session?.availability)

export function ExistingSessionBinding({ state, sessionId, listExistingVoiceSessions, setExistingVoiceSession, openExistingVoiceSession, showHome }) {
  const [result, setResult] = useState(null)
  const [changing, setChanging] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [readError, setReadError] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const request = useRef(null), mounted = useRef(false)
  const radioName = useId()
  const status = state.status
  const binding = Object.hasOwn(status ?? {}, 'existingVoiceSession') ? status.existingVoiceSession : result?.binding
  const supported = status?.existingVoiceSessionSupported !== false
  const readyToChange = state.checkedFor === sessionId && !state.uncertain && !state.busy && !state.ttsCancelling
    && !state.existingSessionUnconfirmed && status?.voiceControlBusy === false && status?.voiceSession?.fullyStopped === true && !status?.enabled
  const saving = state.existingSessionWritePending
  const selected = result?.items.find(item => item.sessionId === selectedId)
  const canUnbind = readyToChange && !loading && !saving && Boolean(binding)
  const canChoose = readyToChange && supported && !loading && !readError && !saving && Boolean(result)

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
      setResult(previous => previous && { ...previous, binding: saved })
      setChanging(false)
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

  return <section className={css.section} data-whale-existing-session>
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
        setChanging(!changing); setSelectedId(null); setQuery('')
        if (!changing) void load()
      }}>{changing ? '关闭会话列表' : binding ? '更换绑定' : '选择已有会话'}</Button>
      {canOpenExistingSession(binding) && openExistingVoiceSession && <Button variant="outline" data-whale-operation="open-native-session" onClick={async () => {
        setFeedback(null)
        try { await openExistingVoiceSession(binding.sessionId); await showHome?.() }
        catch { if (mounted.current) setFeedback({ error:true, text:'DSH 暂时无法打开原会话，请稍后重试。' }) }
      }}>打开原会话</Button>}
      {binding && <Button variant="outline" data-whale-operation="unbind-existing-session" disabled={!canUnbind} onClick={() => void change(null)}>解除绑定</Button>}
    </div>
    {changing && <div className={css.existingSessionPicker} aria-busy={loading}>
      <form className={css.existingSessionSearch} onSubmit={search}>
        <Input type="search" aria-label="搜索会话标题或 ID" placeholder="搜索会话标题或 ID" value={query} maxLength={128} disabled={saving} onChange={event => setQuery(event.target.value)}/>
        <Button type="submit" variant="outline" disabled={saving}>搜索</Button>
      </form>
      {result?.items.length > 0 && <ul className={css.existingSessionList} aria-label="已有 DSH 会话">
        {result.items.map(item => {
          const bound = binding?.sessionId === item.sessionId
          return <li key={item.sessionId}>
            <label title={item.sessionId}>
              <input type="radio" name={radioName} value={item.sessionId} checked={selectedId === item.sessionId} disabled={Boolean(bound || item.availability !== 'ready' || loading || saving)} onChange={() => { setSelectedId(item.sessionId); setFeedback(null) }}/>
              <span>
                <strong className={css.sessionTitle}>{sessionName(item)}</strong>
                <span className={css.hint}>{bound ? '当前绑定 · ' : ''}{sessionAvailability(item) ?? '可用'} · {item.sessionId}</span>
              </span>
            </label>
          </li>
        })}
      </ul>}
      {!loading && !readError && result?.items.length === 0 && <p role="status" className={css.hint}>{result.query ? '没有找到匹配的会话。' : '暂无可绑定的会话。'}</p>}
      {selected && <p id={radioName+'-tts'} className={css.hint}>使用在线音色时，回答文字会交给已授权的语音合成服务。若要离线朗读，可在「模型 → 朗读方式」选用本地音色。</p>}
      <div className={css.actions}>
        <Button variant="primary" data-whale-operation="bind-existing-session" aria-describedby={selected ? radioName+'-tts' : undefined} disabled={!canChoose || selected?.availability !== 'ready' || selected.sessionId === binding?.sessionId} onClick={() => void change(selectedId)}>{saving ? '正在保存…' : '绑定选中会话'}</Button>
        {!!result?.nextCursor && <Button variant="outline" disabled={loading || saving} onClick={() => void load(result.query, result.nextCursor)}>加载更多</Button>}
      </div>
    </div>}
    {loading && <p role="status" className={css.hint}>正在读取 DSH 会话…</p>}
    {readError && <div role="alert" className={css.notice}>无法读取 DSH 会话。 <Button variant="outline" disabled={saving} onClick={() => void load(query.trim())}>重试读取</Button></div>}
    {feedback && <p role={feedback.error ? 'alert' : 'status'} className={feedback.error ? css.notice : css.hint}>{feedback.text}</p>}
  </section>
}
