// Fault injection for a separate test process only. No production settings change.
import fs from 'node:fs'
import { syncBuiltinESMExports } from 'node:module'
const denied = () => Object.assign(new Error('simulated unavailable symlink privilege'), { code: 'EPERM', syscall: 'symlink' })
fs.symlinkSync = () => { throw denied() }
fs.symlink = (...args) => queueMicrotask(() => args.at(-1)(denied()))
fs.promises.symlink = async () => { throw denied() }
syncBuiltinESMExports()
