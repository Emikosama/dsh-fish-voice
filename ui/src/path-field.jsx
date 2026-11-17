import { useEffect, useRef, useState } from 'react'
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives'
/** A selection edits only the local draft. Cancel/late replies never save or upload. */
export function PathField({ label, value, onChange, kind, pickPath, sessionId, disabled, active = true, scope, className, placeholder }) {
  const [pending, setPending] = useState(false), [error, setError] = useState(null)
  const displayName = typeof value === 'string' ? value.split(/[\\/]/).filter(Boolean).at(-1) ?? value : ''
  const request = useRef(null), root = useRef(null)
  const cancel = () => { request.current?.abort(); request.current = null; setPending(false) }
  useEffect(() => { cancel(); setError(null); return cancel }, [sessionId, disabled, active, scope, value])
  const choose = async () => {
    if (request.current || disabled || !active || !pickPath) return
    const abort = new AbortController(); request.current = abort; setPending(true); setError(null)
    try {
      const path = await pickPath(sessionId, kind, abort.signal)
      if (request.current === abort && !abort.signal.aborted && !root.current?.closest('[hidden]') && path !== null) onChange(path)
    } catch (error) { if (request.current === abort && !abort.signal.aborted) setError(String(error?.message ?? error)) }
    finally { if (request.current === abort) { request.current = null; setPending(false) } }
  }
  return <div ref={root} className={className} data-native-path={kind}>
    <div style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:8,minWidth:0}}>
    <label style={{display:'flex',flexWrap:'wrap',alignItems:'center',gap:8,minWidth:0}}>{label}<Input aria-label={label} title={value ?? ''} value={displayName} placeholder={placeholder} disabled={disabled} readOnly style={{width:190,maxWidth:'100%',minWidth:0,textOverflow:'ellipsis'}}/></label>
    <Button variant="outline" disabled={disabled || !active || !pickPath || pending} onClick={() => void choose()}>{pending ? '等待选择…' : kind === 'referenceAudio' || kind === 'campplus' ? '选择文件…' : '选择文件夹…'}</Button>
    </div>
    {kind === 'campplus' && value && <Button variant="outline" disabled={disabled} onClick={() => { cancel(); onChange('') }}>清除可选模型</Button>}
    {pending && <Button variant="outline" onClick={cancel}>取消选择</Button>}
    {value && <details style={{fontSize:12,minWidth:0}}><summary>查看完整路径</summary><p style={{margin:'4px 0',overflowWrap:'anywhere'}}>{value}</p></details>}
    {error && <p role="alert">{error}</p>}
  </div>
}
