/** Ownership scope for a resident engine. No inspection launches or timers renew leases. */
export function createResidentTtsLease({ createSession, getMode = () => 'balanced', idleMs = 60000, setTimer = setTimeout, clearTimer = clearTimeout } = {}) {
  let session, identity, playback, active = false, closing, blocked = false, timer, generation = 0
  const fault = code => Object.assign(new Error(code), { code, ...(blocked ? { uncertain: true } : {}) })
  const invalidate = () => { generation++; if (timer) clearTimer(timer); timer = undefined }
  async function close() {
    invalidate()
    if (closing) return closing
    const owned = session
    if (!owned) { if (blocked) throw fault('TTS_STOP_UNCONFIRMED'); return }
    closing = (async () => {
      try { await owned.stop(); if (session === owned) { session = undefined; identity = undefined } }
      catch (cause) { blocked = true; throw Object.assign(fault('TTS_STOP_UNCONFIRMED'), { cause, uncertain: true }) }
    })()
    try { await closing } finally { closing = undefined }
  }
  function schedule() {
    if (!session || blocked || getMode() === 'fast') return
    const lease = generation
    timer = setTimer(() => {
      if (lease !== generation || active) return
      // close claims its ownership synchronously before another speak can start.
      void close().catch(() => {})
    }, idleMs)
    timer.unref?.()
  }
  return {
    async speak(key, options, factoryOptions) {
      if (blocked) throw fault('TTS_STOP_UNCONFIRMED')
      if (active) throw fault('TTS_BUSY')
      active = true; invalidate()
      try {
        if (closing) await closing
        if (session && identity !== key) await close()
        options.signal?.throwIfAborted()
        playback = factoryOptions?.startWavPlayback
        if (!session) { session = createSession({ ...factoryOptions, ...(playback ? { startWavPlayback: options => playback(options) } : {}) }); identity = key }
        return await session.speak(options)
      } catch (cause) {
        if (cause?.uncertain) blocked = true
        // Every failure retires the scope. There is no synthesis or playback retry.
        try { await close() } catch (stopError) { throw stopError }
        throw cause
      } finally { active = false; if (!blocked) schedule() }
    },
    close,
    residency() { const state = session?.residency?.(); return { supported: !!state?.supported, modelResident: !!state?.modelResident && !blocked, blocked, compute: state?.compute ?? null } },
  }
}
