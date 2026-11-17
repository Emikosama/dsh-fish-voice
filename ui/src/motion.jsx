import { useEffect, useState } from 'react'
import css from './motion.module.css'
export const motionStyles = css.text

/** The native input owns focus, keyboard, touch, bounds and events. Decoration
 * follows the value; it never queues, throttles or delays application state. */
export function MotionRange({ value, defaultValue = 0, min = 0, max = 100, disabled, onChange, onPointerDown, onPointerUp, onPointerCancel, onLostPointerCapture, className = '', style, ...props }) {
  const [local, setLocal] = useState(defaultValue)
  const [dragging, setDragging] = useState(false)
  useEffect(() => { if (disabled) setDragging(false) }, [disabled])
  const numeric = Number(value ?? local), low = Number(min), high = Number(max)
  const fraction = high > low && Number.isFinite(numeric) ? Math.max(0, Math.min(1, (numeric - low) / (high - low))) : 0
  const finish = callback => event => { setDragging(false); callback?.(event) }
  return <span className={css.range} data-whale-motion-range data-dragging={dragging && !disabled || undefined} data-disabled={disabled || undefined} style={{ '--whale-range-position': `${fraction * 100}%` }}>
    <span className={css.rail} aria-hidden="true"><span className={css.fill}/><span className={css.thumb}/></span>
    <input {...props} className={`${css.input} ${className}`} style={style} type="range" min={min} max={max} value={value ?? local} disabled={disabled}
      onChange={event => { if (disabled) return; if (value === undefined) setLocal(event.target.value); onChange?.(event) }}
      onPointerDown={event => { if (!disabled) setDragging(true); onPointerDown?.(event) }}
      onPointerUp={finish(onPointerUp)} onPointerCancel={finish(onPointerCancel)} onLostPointerCapture={finish(onLostPointerCapture)}
      onBlur={event => { setDragging(false); props.onBlur?.(event) }}/>
  </span>
}

/** Keep drafts mounted. Closed content leaves the accessibility and focus tree
 * immediately; its visual height alone finishes the short closing transition. */
export function MotionCollapse({ open, children, className = '', ...props }) {
  return <div {...props} className={`${css.collapse} ${className}`} data-open={Boolean(open)} aria-hidden={!open} inert={open ? undefined : ''}>
    <div className={css.collapseInner}>{children}</div>
  </div>
}

/** Boolean preferences only: acknowledgments retain their checkbox semantics. */
export function MotionToggle({ label, checked, disabled, onChange, ...props }) {
  return <label className={css.toggle} data-disabled={disabled || undefined}>
    <input {...props} type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={event => onChange?.(event.target.checked)}/>
    <span className={css.toggleTrack} aria-hidden="true"><span/></span><span>{label}</span>
  </label>
}
