/** Rebuild the checked-in, one-file Node vendor for node-edge-tts. */
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const VENDOR_DIR = join(ROOT, 'vendor')
const VENDOR_FILE = join(VENDOR_DIR, 'edge-tts.cjs')
const NOTICES_FILE = join(VENDOR_DIR, 'edge-tts.NOTICES.txt')
const ESBUILD_VERSION = '0.25.12'
const BUILD_PACKAGES = Object.freeze([
  { name: 'node-edge-tts', version: '1.2.12', integrity: 'sha512-tvopsQ+XkxHGHM58GUVDM7iwzxVivjqSJb948xg2F0q9r+OWO7bSrJkHnJ0e7BPTxhPiTrxK+9zsl4CL5H5KbQ==' },
  { name: 'ws', version: '8.23.0', integrity: 'sha512-wCkmX8QMOrKjgO8HW2WyDbTSGeqkocxgDzS9iR79rEAexty6/2qzilx3Ag8Tqf9ykop3irLKle0MtVn5qjVnoQ==' },
  { name: 'https-proxy-agent', version: '7.0.6', integrity: 'sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==' },
  { name: 'agent-base', version: '7.1.4', integrity: 'sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==' },
  { name: 'debug', version: '4.4.3', integrity: 'sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==' },
  { name: 'ms', version: '2.1.3', integrity: 'sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==' },
])

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, ...options })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${command} exited with status ${result.status}: ${result.stderr || ''}`)
  return result.stdout ?? ''
}

function npmCli() {
  const adjacent = join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')
  const configured = process.env.npm_execpath
  const path = existsSync(adjacent) ? adjacent : configured
  if (!path || !path.endsWith('.js')) throw new Error('npm CLI is required only to run this vendor build script')
  return path
}

async function unpackPackage(packageInfo, temporaryRoot) {
  const packagePath = packageInfo.name.startsWith('@')
    ? join(temporaryRoot, 'node_modules', ...packageInfo.name.split('/'))
    : join(temporaryRoot, 'node_modules', packageInfo.name)
  const tarPath = join(temporaryRoot, `${packageInfo.name.replaceAll('/', '-')}-${packageInfo.version}.tgz`)
  const url = `https://registry.npmjs.org/${packageInfo.name}/-/${packageInfo.name.split('/').at(-1)}-${packageInfo.version}.tgz`
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) })
  if (!response.ok) throw new Error(`npm registry returned ${response.status} for ${packageInfo.name}`)
  const tarball = Buffer.from(await response.arrayBuffer())
  const actual = `sha512-${createHash('sha512').update(tarball).digest('base64')}`
  if (actual !== packageInfo.integrity) throw new Error(`integrity mismatch for ${packageInfo.name}@${packageInfo.version}`)
  await writeFile(tarPath, tarball, { flag: 'wx' })
  await mkdir(packagePath, { recursive: true })
  run(process.platform === 'win32' ? 'tar.exe' : 'tar', ['-xzf', tarPath, '-C', packagePath, '--strip-components=1'])
  const manifest = JSON.parse(await readFile(join(packagePath, 'package.json'), 'utf8'))
  if (manifest.name !== packageInfo.name || manifest.version !== packageInfo.version) throw new Error(`unexpected package manifest for ${packageInfo.name}`)
  return { ...packageInfo, path: packagePath, manifest }
}

function requiredNpm(args, cwd) {
  return run(process.execPath, [npmCli(), ...args], { cwd, env: { ...process.env, npm_config_audit: 'false', npm_config_fund: 'false', npm_config_update_notifier: 'false' } })
}

async function main() {
  const temporaryRoot = await mkdtemp(join(tmpdir(), 'whale-edge-tts-vendor-'))
  try {
    const unpacked = []
    for (const packageInfo of BUILD_PACKAGES) unpacked.push(await unpackPackage(packageInfo, temporaryRoot))
    const ttsPackage = unpacked[0]
    if (ttsPackage.manifest.license !== 'MIT' || ttsPackage.manifest.main !== 'dist/edge-tts.js') throw new Error('node-edge-tts package metadata changed')

    const esbuildVersion = requiredNpm(['exec', '--yes', `--package=esbuild@${ESBUILD_VERSION}`, '--', 'esbuild', '--version'], temporaryRoot).trim()
    if (esbuildVersion !== ESBUILD_VERSION) throw new Error(`unexpected esbuild version: ${esbuildVersion}`)
    const stagedBundle = join(temporaryRoot, 'edge-tts.cjs')
    const entry = join(ttsPackage.path, 'dist', 'edge-tts.js')
    requiredNpm([
      'exec', '--yes', `--package=esbuild@${ESBUILD_VERSION}`, '--', 'esbuild', entry,
      '--bundle', '--platform=node', '--format=cjs', '--target=node24', '--legal-comments=none',
      '--external:bufferutil', '--external:utf-8-validate',
      '--banner:js=/* node-edge-tts@1.2.12, bundled with esbuild@0.25.12; see edge-tts.NOTICES.txt. */',
      `--outfile=${stagedBundle}`,
    ], temporaryRoot)
    const output = await readFile(stagedBundle)
    if (!output.length || output.length > 512 * 1024) throw new Error('bundled vendor size is outside the expected range')

    const sections = [
      'Fish Voice Edge TTS vendor notices',
      'Generated from exact npm tarballs and integrity hashes by scripts/build-edge-tts-vendor.mjs.',
      'Runtime output: node-edge-tts@1.2.12 (npm publish 2026-10-26), bundled with esbuild@0.25.12.',
      'The node-edge-tts npm package is MIT licensed. Its npm runtime dependency yargs is not part of this API bundle; ws and https-proxy-agent are bundled below with their transitive dependencies.',
    ]
    for (const packageInfo of unpacked) {
      const licensePath = ['LICENSE', 'LICENSE.md', 'license', 'license.md']
        .map(name => join(packageInfo.path, name))
        .find(existsSync)
      if (!licensePath) throw new Error(`license file missing for ${packageInfo.name}`)
      const licenseText = await readFile(licensePath, 'utf8')
      sections.push(`\n===== ${packageInfo.name}@${packageInfo.version} (${packageInfo.manifest.license ?? 'license not declared'}) =====\n${licenseText.trim()}`)
    }
    sections.push('\nBuild tool note: esbuild is used only to create the vendor bundle; esbuild code is not included in edge-tts.cjs.')
    const notices = Buffer.from(`${sections.join('\n')}\n`, 'utf8')

    await mkdir(VENDOR_DIR, { recursive: true })
    const bundleStage = `${VENDOR_FILE}.tmp-${process.pid}`
    const noticeStage = `${NOTICES_FILE}.tmp-${process.pid}`
    await writeFile(bundleStage, output, { flag: 'wx' })
    await writeFile(noticeStage, notices, { flag: 'wx' })
    await rename(bundleStage, VENDOR_FILE)
    await rename(noticeStage, NOTICES_FILE)
    process.stdout.write(`Built ${VENDOR_FILE} (${output.length} bytes) and ${NOTICES_FILE} (${notices.length} bytes).\n`)
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true }).catch(() => {})
  }
}

main().catch(error => {
  process.stderr.write(`${error.message}\n`)
  process.exitCode = 1
})
