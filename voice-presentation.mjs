import { randomUUID } from 'node:crypto'
import { closeSync, fsyncSync, mkdirSync, openSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const validId = id => typeof id === 'string' && id.length > 0 && id.length <= 256 && id.isWellFormed() && !/[\s\u0000-\u001f\u007f]/u.test(id)
function read(file) {
  try { return readFileSync(file, 'utf8') }
  catch (error) { if (error.code !== 'ENOENT') throw error; return null }
}
function parse(text) {
  if (text === null) return new Map()
  const document = JSON.parse(text)
  if (document?.version !== 1 || !Array.isArray(document.shown)) throw new Error('鱼应会话显示记录格式无效')
  const rows = new Map()
  for (const row of document.shown) {
    if (!validId(row?.id) || (row.parentId === null ? row.mode !== null : !validId(row.parentId) || !['one-shot', 'continuable', 'unknown'].includes(row.mode)) || rows.has(row.id)) throw new Error('鱼应会话显示记录含有无效 ID')
    const { id, parentId, mode } = row
    rows.set(id, { id, parentId, mode })
  }
  return rows
}

/** Per-session display choices. Ownership is established by the voice manager. */
export function createVoicePresentation(file, log = () => {}) {
  let text, rows, failure
  const listeners = new Set()
  try { text = read(file); rows = parse(text) }
  catch (error) { failure = error; log(`读取鱼应会话显示选择失败 ${error.code ?? error.name}`) }
  const assertReady = () => {
    if (failure) throw Object.assign(new Error('会话显示记录读取失败，请检查鱼应日志。'), { code: 'VOICE_PRESENTATION_STORE_INVALID' })
  }
  return {
    active: () => !failure && listeners.size > 0,
    shown: id => rows?.has(id) === true,
    snapshot() { assertReady(); return { shown: [...rows.values()].map(row => ({ ...row })) } },
    subscribe(listener) {
      assertReady()
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    show(row) {
      assertReady()
      if (rows.has(row.id)) return false
      const next = JSON.stringify({ version: 1, shown: [...rows.values(), row] }) + '\n'
      const verified = parse(next)
      mkdirSync(dirname(file), { recursive: true })
      const temporary = file + '.' + randomUUID() + '.tmp'
      let handle
      try {
        handle = openSync(temporary, 'wx', 0o600)
        writeFileSync(handle, next, 'utf8')
        fsyncSync(handle)
        closeSync(handle)
        handle = undefined
        if (read(file) !== text) throw new Error('鱼应会话显示记录同时被修改，请刷新后重试。')
        renameSync(temporary, file)
      } finally {
        if (handle !== undefined) closeSync(handle)
        try { unlinkSync(temporary) } catch (error) { if (error.code !== 'ENOENT') log(`会话显示临时文件清理失败 ${error.code}`) }
      }
      text = next
      rows = verified
      for (const listener of listeners) listener()
      return true
    },
  }
}
