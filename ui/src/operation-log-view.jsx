import { useEffect, useRef, useState } from 'react'
import { Button } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './panel.module.css'

const name = 'fish-voice-operation-log.log'
const previewLimit = 256 * 1024
const previewTail = (tail, text) => (tail + text).slice(-previewLimit)

export function OperationLogView({ readOperationLog }) {
  const [open, setOpen] = useState(false), [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState(null), [message, setMessage] = useState(null)
  const pending = useRef(null)
  useEffect(() => () => pending.current?.abort(), [])
  if (!readOperationLog) return null

  const run = async save => {
    if (pending.current) return
    const request = new AbortController()
    pending.current = request
    setBusy(true); setMessage(null)
    try {
      const pages = await readOperationLog(request.signal)
      if (request.signal.aborted) return
      if (save) {
        const url = URL.createObjectURL(new Blob(pages, { type:'text/plain;charset=utf-8' }))
        const link = document.createElement('a')
        link.href = url
        link.download = name
        rootDownload(link)
        setTimeout(() => URL.revokeObjectURL(url), 1000)
        setMessage('已请求保存诊断日志。')
      } else setPreview({ text:pages.reduce(previewTail, ''), shortened:pages.reduce((sum, page) => sum + page.length, 0) > previewLimit })
    } catch {
      if (!request.signal.aborted) setMessage('暂时无法读取诊断日志，请重试。')
    } finally {
      if (pending.current === request) pending.current = null
      if (!request.signal.aborted) setBusy(false)
    }
  }
  const toggle = event => {
    const opened = event.currentTarget.open
    setOpen(opened)
    if (!opened) {
      pending.current?.abort()
      pending.current = null
      setBusy(false); setPreview(null); setMessage(null)
    }
  }
  return <details className={css.section} data-whale-operation-log open={open} onToggle={toggle}>
    <summary data-whale-operation="open-feedback">排查与反馈</summary>
    {open && <>
      <p className={css.hint}>最近七天的操作日志。可先查看，再自行决定是否随反馈提交。</p>
      <div className={css.actions}>
        <Button variant="outline" disabled={busy} onClick={() => void run(false)}>查看诊断日志</Button>
        <Button variant="outline" disabled={busy} onClick={() => void run(true)}>保存诊断日志</Button>
      </div>
      {busy && <p role="status" className={css.hint}>正在读取诊断日志…</p>}
      {message && <p role="status" className={css.hint}>{message}</p>}
      {preview?.shortened && <p className={css.hint}>这里只显示最近一段，保存可取得完整日志。</p>}
      {preview && <pre className={css.requestDetails} tabIndex={0} aria-label="操作日志预览">{preview.text || '暂无操作日志。'}</pre>}
    </>}
  </details>
}

function rootDownload(link) {
  document.body.append(link)
  try { link.click() }
  finally { link.remove() }
}
