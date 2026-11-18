import { randomUUID } from 'node:crypto'
import { closeSync, fsyncSync, openSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'

// The caller owns directory creation, validation and any revision check.
// A failed write or validation only discards our temporary file.
export function atomicWriteText(path, text, { mode = 0o600, beforeReplace } = {}) {
  const temporary = path + '.' + randomUUID() + '.tmp'
  const fd = openSync(temporary, 'wx', mode)
  try {
    try {
      writeFileSync(fd, text, 'utf8')
      fsyncSync(fd)
    } finally {
      closeSync(fd)
    }
    beforeReplace?.()
    renameSync(temporary, path)
  } catch (error) {
    try { unlinkSync(temporary) } catch (cleanup) {
      if (cleanup.code !== 'ENOENT') throw new AggregateError([error, cleanup], 'Atomic write and cleanup failed')
    }
    throw error
  }
}
