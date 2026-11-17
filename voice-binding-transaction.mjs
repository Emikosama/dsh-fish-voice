import { randomUUID } from 'node:crypto'
const failure = message => Object.assign(new Error(message), { code: 'BINDINGS_UNCONFIRMED' })
/** Host-owned, serialized transaction. Never grants audio or starts a helper. */
export async function applyBindingTransaction({ transaction, rpc, signal }) {
  const state = transaction.prepare()
  if (!state.active) { transaction.persist(); return }
  const transactionId = randomUUID()
  let persisted = false
  const request = async (op, args = {}) => {
    const result = await rpc(op, { transactionId, ...args })
    if (result?.transactionId !== transactionId) throw failure('按键变更回执不匹配，请重新读取状态')
    return result
  }
  const assertReceipt = (result, phase) => {
    if (result?.phase !== phase || result.confirmed !== true) throw Object.assign(new Error(result?.message || '按键监听未确认就绪，未应用'), { code: result?.code || 'BINDINGS_UNCONFIRMED' })
  }
  try {
    signal?.throwIfAborted()
    assertReceipt(await request('bindings-prepare', state), 'prepared')
    signal?.throwIfAborted()
    transaction.assertCurrent()
    transaction.persist(); persisted = true
    // Once persisted, cancellation cannot abandon reconciliation.
    assertReceipt(await request('bindings-commit'), 'committed')
  } catch (error) {
    let observed
    try { observed = await request('bindings-status') } catch { throw failure('无法确认按键变更结果；请勿重试，重启语音帮工前先核查配置') }
    if (observed.phase === 'committed' && observed.confirmed === true) return
    if (observed.phase === 'prepared' && observed.confirmed === true || observed.blocked === true) {
      try {
        if (persisted) transaction.rollback()
        const restored = await request('bindings-abort')
        assertReceipt(restored, 'aborted')
      } catch { throw failure('按键恢复未确认，PTT 已保持停用；请重新启动语音后核查') }
    } else if (persisted) {
      throw failure('按键与配置状态无法确认，请勿重试或继续使用 PTT')
    }
    throw error
  }
}
