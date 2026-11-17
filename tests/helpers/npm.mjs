import { execFile } from 'node:child_process'
import { realpath, stat } from 'node:fs/promises'
import { delimiter, dirname, basename, join } from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(execFile)

// Windows cannot execFile npm.cmd. Run npm's JavaScript entry with Node instead
// of enabling a shell, so spaces and shell metacharacters remain literal args.
export async function resolveNpmCli({ env = process.env, execPath = process.execPath } = {}) {
  const path = Object.entries(env).find(([key]) => key.toLowerCase() === 'path')?.[1] || ''
  const dirs = [dirname(execPath), ...path.split(delimiter).filter(Boolean)]
  const candidates = [env.npm_execpath]
  for (const dir of dirs) {
    candidates.push(
      join(dir, 'node_modules', 'npm', 'bin', 'npm-cli.js'),
      join(dir, '..', 'lib', 'node_modules', 'npm', 'bin', 'npm-cli.js'),
      join(dir, 'npm'), // Unix npm is normally a symlink to npm-cli.js.
    )
  }
  for (const candidate of candidates.filter(Boolean)) {
    try {
      const resolved = await realpath(candidate)
      if (basename(resolved) === 'npm-cli.js' && (await stat(resolved)).isFile()) return resolved
    } catch (error) {
      if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error
    }
  }
  throw new Error('Cannot find npm-cli.js. Install npm alongside Node or run these tests through npm test.')
}

export async function runNpm(args, options = {}) {
  const cli = await resolveNpmCli({ env: options.env ?? process.env })
  return exec(process.execPath, [cli, ...args], { ...options, shell: false })
}
