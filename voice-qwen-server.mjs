/** Inactive by default. Only a trusted installer resolver may supply descriptors.
 * No downloads, settings executables, port reservations, or installation mutations.
 */
import { spawn as nodeSpawn } from 'node:child_process'
import { readFile, mkdtemp, rm, lstat } from 'node:fs/promises'
import { tmpdir, availableParallelism } from 'node:os'
import { join, isAbsolute } from 'node:path'
import { extractRuntimeArchive } from './voice-runtime-archive.mjs'
import { qwenComputeArgs } from './voice-qwen-gpu.mjs'

const catalog = JSON.parse(await readFile(new URL('./qwen-server-catalog.json', import.meta.url), 'utf8')).servers
const fault = (code, uncertain = false) => Object.assign(new Error('本地语音服务未能安全启动或停止。'), { code, ...(uncertain ? { uncertain: true } : {}) })
const environment = (apiKey, directory) => {
  const allowed = new Set(['PATH', 'SystemRoot', 'SYSTEMROOT', 'WINDIR', 'LANG', 'LC_ALL', 'LC_CTYPE', 'NUMBER_OF_PROCESSORS', 'PROCESSOR_ARCHITECTURE'])
  // A private HOME/TEMP also prevents discovery of ambient runtime configuration.
  return { ...Object.fromEntries(Object.entries(process.env).filter(([key]) => allowed.has(key))), HOME: directory, USERPROFILE: directory, TMP: directory, TEMP: directory, TMPDIR: directory, LLAMA_API_KEY: apiKey }
}

/** Each factory owns at most one child. Failed stop permanently poisons the factory.
 * resolveDescriptor({signal}) must verify the model/mmproj and owned archive paths.
 * spawn/extractArchive are trusted application test seams, never settings fields.
 * Runtime IDs are the unchanged installed archive SHA256, not executable hashes.
 */
export function createVerifiedQwenServerLauncher({ resolveDescriptor, spawn = nodeSpawn, extractArchive = extractRuntimeArchive, startupTimeoutMs = 180000, stopTimeoutMs = 5000 } = {}) {
  if (typeof resolveDescriptor !== 'function' || typeof spawn !== 'function' || typeof extractArchive !== 'function' || !Number.isInteger(startupTimeoutMs) || startupTimeoutMs < 1 || startupTimeoutMs > 600000 || !Number.isInteger(stopTimeoutMs) || stopTimeoutMs < 1 || stopTimeoutMs > 30000) throw new TypeError('Verified server resolver required')
  let occupied = false, poisoned = false
  return async function launchVerifiedServer({ host = '127.0.0.1', apiKey, signal } = {}) {
    if (poisoned) throw fault('TTS_PROCESS_STOP_UNCONFIRMED', true)
    if (occupied) throw fault('TTS_BUSY')
    if (host !== '127.0.0.1' || typeof apiKey !== 'string' || !/^[a-zA-Z0-9_-]{32,256}$/.test(apiKey)) throw fault('TTS_INVALID_RUNTIME')
    occupied = true
    let directory, child, closed = false, stopPromise, timer, startupAbort, detach = () => {}, preserve = false
    const controller = new AbortController()
    const combined = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal
    timer = setTimeout(() => controller.abort(fault('TTS_TIMEOUT')), startupTimeoutMs)
    let closeResolve
    const closePromise = new Promise(resolve => { closeResolve = resolve })
    const cleanup = async () => {
      try { if (!preserve && directory) await rm(directory, { recursive: true, force: true }) }
      catch { throw fault('TTS_RUNTIME_CLEANUP_FAILED') }
      finally { occupied = false }
    }
    const stop = () => stopPromise ??= (async () => {
      if (child && !closed) {
        // kill() returning true, exitCode, and 'exit' are not close confirmation.
        try { child.kill('SIGKILL') } catch { /* still await the owned child's close */ }
        let stopTimer
        const confirmed = await Promise.race([closePromise.then(() => true), new Promise(resolve => { stopTimer = setTimeout(() => resolve(false), stopTimeoutMs) })])
        clearTimeout(stopTimer)
        if (!confirmed) { preserve = poisoned = true; throw fault('TTS_PROCESS_STOP_UNCONFIRMED', true) }
      }
      await cleanup()
    })()
    try {
      combined.throwIfAborted()
      const descriptor = await resolveDescriptor({ signal: combined })
      combined.throwIfAborted()
      const runtime = catalog[descriptor?.runtimeId]
      if (!runtime || runtime.platform !== process.platform || runtime.arch !== process.arch || !['cpu', 'vulkan'].includes(descriptor.backend) || runtime.backend !== descriptor.backend) throw fault('TTS_INVALID_RUNTIME')
      for (const file of [descriptor.archivePath, descriptor.model, descriptor.mmproj]) {
        if (typeof file !== 'string' || !isAbsolute(file)) throw fault('TTS_INVALID_RUNTIME')
        const info = await lstat(file)
        if (!info.isFile() || info.isSymbolicLink() || info.nlink !== 1) throw fault('TTS_INVALID_RUNTIME')
      }
      const computeArgs = qwenComputeArgs(descriptor.backend, descriptor.device)
      directory = await mkdtemp(join(tmpdir(), 'whale-qwen-server-'))
      await extractArchive(descriptor.archivePath, directory, runtime, combined)
      combined.throwIfAborted()
      const args = ['--host', '127.0.0.1', '--port', '0', '--no-webui', '--offline', '-np', '1', '-c', '4096', '-t', String(Math.min(4, availableParallelism())), '--temp', '0.8', '-n', '2048', '-m', descriptor.model, '--mmproj', descriptor.mmproj, ...computeArgs]
      try {
        child = spawn(join(directory, runtime.executable), args, { cwd: directory, env: environment(apiKey, directory), stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, shell: false })
      } catch { throw fault('TTS_PROCESS_START_FAILED') }
      let rejectReady, resolveReady, ready = false, modelLoaded = false, port, gpuLayers = 0
      const readyPromise = new Promise((resolve, reject) => { resolveReady = resolve; rejectReady = reject })
      // Setup can fail before the await below (e.g. missing owned stdio).
      // Keep the close/error rejection observed while stop confirms ownership.
      readyPromise.catch(() => {})
      // Attach before parsing data. Continue draining after ready; never retain raw logs.
      child.once('close', () => {
        closed = true; closeResolve(); rejectReady(fault('TTS_PROCESS_FAILED'))
        // Unsolicited death is also a confirmed close. Cleanup idempotently on stop.
      })
      child.on('error', () => rejectReady(fault('TTS_PROCESS_START_FAILED')))
      const scan = line => {
        for (const match of line.matchAll(/\boffloaded ([0-9]{1,6})\/([0-9]{1,6}) layers to GPU\b/g)) {
          const count = Number(match[1]), total = Number(match[2])
          if (count > 0 && count <= total) gpuLayers = Math.max(gpuLayers, count)
        }
        if (/\bmodel loaded\s*$/.test(line)) modelLoaded = true
        const match = line.match(/\blistening on http:\/\/127\.0\.0\.1:([0-9]{1,5})\s*$/)
        if (match && Number(match[1]) > 0 && Number(match[1]) <= 65535) port = Number(match[1])
        if (!ready && !closed && modelLoaded && port) { ready = true; resolveReady() }
      }
      for (const stream of [child.stdout, child.stderr]) {
        if (!stream || typeof stream.on !== 'function') throw fault('TTS_PROCESS_START_FAILED')
        let pending = '', dropping = false
        stream.on('error', () => rejectReady(fault('TTS_PROCESS_FAILED')))
        stream.on('data', chunk => {
          // Bound memory even for a single giant diagnostic and lines without LF.
          const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
          for (let offset = 0; offset < bytes.length; offset += 4096) {
            const pieces = bytes.subarray(offset, offset + 4096).toString('utf8').split('\n')
            for (let index = 0; index < pieces.length; index++) {
              if (!dropping) { pending += pieces[index]; if (pending.length > 8192) { pending = ''; dropping = true } }
              if (index < pieces.length - 1) { if (!dropping) scan(pending); pending = ''; dropping = false }
            }
          }
        })
      }
      startupAbort = () => rejectReady(fault(combined.reason?.code === 'TTS_TIMEOUT' ? 'TTS_TIMEOUT' : 'TTS_CANCELLED'))
      combined.addEventListener('abort', startupAbort, { once: true })
      detach = () => combined.removeEventListener('abort', startupAbort)
      if (combined.aborted) startupAbort()
      await readyPromise
      combined.throwIfAborted()
      if (closed) throw fault('TTS_PROCESS_FAILED')
      if (descriptor.backend !== 'cpu' && gpuLayers <= 0) throw fault('TTS_GPU_OFFLOAD_UNCONFIRMED')
      clearTimeout(timer); detach()
      const compute = Object.freeze({ backend: descriptor.backend, gpuLayers, gpuOffloadConfirmed: descriptor.backend !== 'cpu' && gpuLayers > 0 })
      return Object.freeze({ port, stop, compute, status: () => Object.freeze({ running: !closed && !preserve && !stopPromise, closed, uncertain: preserve }) })
    } catch (error) {
      clearTimeout(timer); detach()
      await stop() // Stop uncertainty supersedes startup failure and prohibits retries.
      // Do not expose source errors, paths, driver logs, or the API key.
      const failure = fault(['TTS_TIMEOUT', 'TTS_CANCELLED', 'TTS_INVALID_RUNTIME', 'TTS_BUSY', 'TTS_PROCESS_START_FAILED', 'TTS_PROCESS_FAILED', 'TTS_GPU_OFFLOAD_UNCONFIRMED', 'INVALID_RUNTIME_ARCHIVE'].includes(error?.code) ? error.code : combined.aborted ? 'TTS_CANCELLED' : 'TTS_INVALID_RUNTIME')
      // Only this owned lifecycle may attest close. Never parse retry authority
      // from stderr, or carry it through cancellation/security validation errors.
      if (!signal?.aborted && ['TTS_TIMEOUT', 'TTS_PROCESS_START_FAILED', 'TTS_PROCESS_FAILED', 'TTS_GPU_OFFLOAD_UNCONFIRMED'].includes(failure.code)) failure.startupClosed = true
      throw failure
    }
  }
}
