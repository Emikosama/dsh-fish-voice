import { atomicWriteText } from './voice-atomic-file.mjs'
/** Host-owned durable intent. Disk state is descriptive only, never executable authority. */
import { existsSync, readFileSync, mkdirSync, openSync, closeSync, lstatSync, constants } from 'node:fs'
import { dirname } from 'node:path'

const states = ['waiting', 'verifying', 'applied', 'blocked', 'paused', 'cancelled']
const text = value => typeof value === 'string' && value.length > 0 && value.length <= 256 && !/[\u0000-\u001f]/.test(value)
const fault = () => Object.assign(new Error('朗读下载记录无法安全读取，请检查本地配置目录后重试'), { code: 'TTS_INTENT_LEDGER_INVALID' })
const checkFile = path => {
  let info
  try { info = lstatSync(path) } catch (error) { if (error.code === 'ENOENT') return; throw error }
  if (!info.isFile() || info.isSymbolicLink() || info.size > 16384) throw fault()
}
export function createTtsInstallIntent(path) {
  let value = null, invalid = false
  const listeners = new Set()
  try {
    checkFile(path)
    if (existsSync(path)) {
      const fd = openSync(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0))
      let saved
      try { saved = JSON.parse(readFileSync(fd, 'utf8')) } finally { closeSync(fd) }
      if (!saved || Object.keys(saved).some(key => !['schema', 'jobId', 'modelId', 'baseline', 'status', 'reason'].includes(key)) || saved.schema !== 1 || !text(saved.jobId) || !text(saved.modelId) || !/^[a-f0-9]{64}$/.test(saved.baseline) || !states.includes(saved.status) || !(saved.reason === null || text(saved.reason))) throw fault()
      value = { ...saved, status: ['applied', 'cancelled'].includes(saved.status) ? saved.status : 'blocked', reason: ['applied', 'cancelled'].includes(saved.status) ? saved.reason : 'restart-requires-resume' }
    }
  } catch { invalid = true }
  const snapshot = () => value && { jobId: value.jobId, modelId: value.modelId, status: value.status, reason: value.reason }
  const assertWritable = () => { if (invalid) throw fault(); checkFile(path) }
  return {
    snapshot, assertWritable,
    baseline: () => value?.baseline,
    set(next) {
      assertWritable()
      const updated = { ...value, ...next, schema: 1 }
      mkdirSync(dirname(path), { recursive: true })
      atomicWriteText(path, JSON.stringify(updated) + '\n', { beforeReplace: () => checkFile(path) })
      value = updated
      for (const listener of listeners) { try { listener(snapshot()) } catch {} }
      return snapshot()
    },
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
  }
}
