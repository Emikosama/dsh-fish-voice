import { randomUUID } from 'node:crypto'
// A host-owned lease gates native PTT before the browser records a key. No config writes.
export function createBindingCapture({ rpc, schedule = setTimeout, cancel = clearTimeout }) {
  let lease = null, ended = null
  async function end(token) {
    if (!lease && ended === token) return {token,paused:false}
    if (!lease || lease.token !== token) throw new Error('按键录入会话已改变')
    const current = lease
    if (current.inactive) { cancel(current.timer); lease = null; ended=token; return { token, paused: false } }
    const result = await rpc('bindings-abort', { transactionId: token })
    if (result?.transactionId !== token || result.phase !== 'aborted' || result.confirmed !== true) throw new Error('按键恢复未确认，请松开按键后取消录入')
    cancel(current.timer); lease = null; ended=token
    return { token, paused: false }
  }
  return {
    async begin(state) {
      if (lease) throw new Error('已有按键录入尚未结束')
      const token = randomUUID()
      if (!state.active) { lease = {token, inactive:true,timer:schedule(()=>{void end(token).catch(()=>{})},15000)};lease.timer?.unref?.();return { token, paused: false } }
      lease = { token, timer: null }
      try {
        const result = await rpc('bindings-prepare', { ...state, transactionId: token })
        if (result?.transactionId === token && result.phase === 'failed' && result.blocked === false) lease = null
        if (result?.transactionId !== token || result.phase !== 'prepared' || result.confirmed !== true) throw new Error(result?.code || '按键暂停未确认')
        lease.timer = schedule(() => { void end(token).catch(() => {}) }, 15000)
        lease.timer?.unref?.()
        return { token, paused: true }
      } catch (error) {
        try { await end(token) } catch { /* Keep the lease: never claim the native gate resumed. */ }
        throw error
      }
    },
    end,
    get active() { return lease !== null },
  }
}
