import { randomUUID } from 'node:crypto'
import { once } from 'node:events'
import { existsSync, readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { join } from 'node:path'
import { Worker } from 'node:worker_threads'
import { createWhisperAssets } from './voice-whisper-assets.mjs'

const catalog = JSON.parse(readFileSync(new URL('./whisper-base-catalog.json', import.meta.url), 'utf8'))
const nativeCatalog = JSON.parse(readFileSync(new URL('./whisper-native-catalog.json', import.meta.url), 'utf8'))
const workerUrl = new URL('./voice-whisper-worker.mjs', import.meta.url)
const MAX_AUDIO_BYTES = 16_000 * 4 * 120
const asrError = (code, message) => Object.assign(new Error(message), { code })
const stopped = () => asrError('WHISPER_DISPOSED', '鱼应已卸载。')

function windowsNativeAvailable() {
  const windows = process.env.SystemRoot || process.env.WINDIR
  return process.platform === 'win32' && process.arch === 'x64' && Boolean(windows)
    && ['msvcp140.dll', 'vcruntime140.dll', 'vcruntime140_1.dll'].every(file => existsSync(join(windows, 'System32', file)))
}

/** Host-owned download and process-local microphone bridge. No audio is uploaded. */
export function createWhisperAsr({ rootDirectory, log = () => {}, fetcher = globalThis.fetch } = {}) {
  const assets = createWhisperAssets({ rootDirectory, files: catalog.assets, log, fetcher })
  const nativeDirectory = join(rootDirectory, 'native-runtime')
  const nativeAssets = windowsNativeAvailable() ? createWhisperAssets({ rootDirectory: nativeDirectory, files: nativeCatalog.assets, log, fetcher }) : null
  const token = randomUUID() + randomUUID()
  let server, listening, worker, workerGeneration, pending, workerReady = false, disposed = false, serving = false
  let retirement = Promise.resolve()
  let warming = null
  let nextId = 0

  async function stopWorker(error) {
    pending?.finish(error)
    const previous = worker
    worker = null
    workerGeneration = undefined
    workerReady = false
    if (previous) retirement = previous.terminate()
    await retirement
  }
  async function selectGeneration() {
    const nativeCheck = nativeAssets?.snapshot().state === 'ready' ? nativeAssets.verifyForUse().catch(() => null) : null
    const base = await assets.verifyForUse()
    const native = await nativeCheck
    if (native !== null) return { key: `${base}:native:${native}`, native: true }
    return { key: `${base}:wasm`, native: false }
  }

  async function startWorker(generation, warmOnly = false) {
    await retirement
    if (disposed) throw stopped()
    if (warmOnly && (serving || worker)) return
    if (worker && workerGeneration !== generation.key) await stopWorker(stopped())
    if (disposed) throw stopped()
    if (!worker) {
      const current = new Worker(workerUrl, {
        workerData: { rootDirectory, nativeDirectory: generation.native ? nativeDirectory : null },
        execArgv: ['--conditions=onnxruntime-web-use-extern-wasm'],
      })
      worker = current
      workerGeneration = generation.key
      workerReady = false
      const failed = () => {
        if (worker !== current) return
        worker = null
        workerGeneration = undefined
        workerReady = false
        pending?.finish(asrError('WHISPER_INFERENCE_FAILED', 'Whisper Base 推理进程不可用。'))
      }
      current.on('error', failed)
      current.on('exit', failed)
      current.on('message', result => {
        if (worker !== current) return
        if (result?.type === 'ready') {
          workerReady = true
          log(`Whisper Base backend: ${result.backend === 'native-cpu' ? 'native-cpu' : 'wasm'}`)
          pending?.send()
          return
        }
        if (result?.type === 'native-unavailable') {
          log(`Whisper Base native CPU unavailable; using verified WASM: ${String(result.error ?? '').replace(/[\r\n]/g, ' ').slice(0, 250)}`)
          return
        }
        if (result?.type === 'error') {
          log(`Whisper Base WASM initialization failed: ${String(result.error ?? '').replace(/[\r\n]/g, ' ').slice(0, 250)}`)
          void stopWorker(asrError('WHISPER_INFERENCE_FAILED', 'Whisper Base 推理进程不可用。')).catch(() => {})
          return
        }
        if (!pending || result?.id !== pending.id) return
        if (result.error || typeof result.text !== 'string' || result.text.length > 20_000) {
          pending.finish(asrError('WHISPER_INFERENCE_FAILED', 'Whisper Base 识别失败。'))
          return
        }
        const language = typeof result.language === 'string' && /^[a-z]{2,3}$/.test(result.language) ? result.language : undefined
        pending.finish(null, { text: result.text, ...(language ? { language } : {}) })
      })
    }
  }
  async function transcribe(body, generation, signal) {
    signal.throwIfAborted()
    await startWorker(generation)
    signal.throwIfAborted()
    return new Promise((resolve, reject) => {
      const id = ++nextId
      const cancel = () => {
        void stopWorker(asrError('WHISPER_CANCELLED', '识别请求已取消。')).catch(() => {})
      }
      const timeout = setTimeout(() => {
        void stopWorker(asrError('WHISPER_TIMEOUT', 'Whisper Base 识别超时。')).catch(() => {})
      }, 45000)
      timeout.unref?.()
      pending = { id, send() {
        try {
          const pcm = body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength)
          worker.postMessage({ id, pcm }, [pcm])
        } catch { pending?.finish(asrError('WHISPER_INFERENCE_FAILED', 'Whisper Base 识别进程不可用。')) }
      }, finish(error, value) {
        if (pending?.id !== id) return
        pending = null
        clearTimeout(timeout)
        signal.removeEventListener('abort', cancel)
        if (error) reject(error)
        else resolve(value)
      } }
      signal.addEventListener('abort', cancel, { once: true })
      if (signal.aborted) { cancel(); return }
      if (workerReady) pending.send()
    })
  }
  const reply = (res, status, result) => {
    if (!res.destroyed && !res.writableEnded) {
      res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', connection: 'close' })
      res.end(JSON.stringify(result))
    }
  }
  async function handle(req, res) {
    if (req.method !== 'POST' || req.url !== '/asr' || req.headers.authorization !== `Bearer ${token}`) {
      reply(res, 403, { code: 'WHISPER_UNAUTHORIZED' })
      return
    }
    const length = Number(req.headers['content-length'])
    if (req.headers['content-type'] !== 'application/octet-stream' || req.headers['x-audio-format'] !== 'float32le'
      || req.headers['x-audio-sample-rate'] !== '16000' || req.headers['x-audio-channels'] !== '1'
      || !Number.isSafeInteger(length) || length <= 0 || length > MAX_AUDIO_BYTES || length % 4 !== 0) {
      reply(res, 400, { code: 'WHISPER_INVALID_AUDIO' })
      return
    }
    if (disposed || serving) { reply(res, 429, { code: 'WHISPER_BUSY' }); return }
    serving = true
    const abort = new AbortController()
    const closed = () => { if (!res.writableEnded) abort.abort(stopped()) }
    res.on('close', closed)
    try {
      const data = Buffer.alloc(length)
      let offset = 0
      for await (const chunk of req) {
        if (offset + chunk.length > length) throw asrError('WHISPER_INVALID_AUDIO', '录音长度不符。')
        offset += chunk.copy(data, offset)
      }
      if (offset !== length) throw asrError('WHISPER_INVALID_AUDIO', '录音长度不符。')
      const generation = await selectGeneration()
      const result = await transcribe(data, generation, abort.signal)
      reply(res, 200, result)
    } catch (error) {
      const code = typeof error?.code === 'string' && /^WHISPER_[A-Z_]+$/.test(error.code) ? error.code : 'WHISPER_INFERENCE_FAILED'
      log(`Whisper Base ASR: ${code}`)
      reply(res, code === 'WHISPER_INVALID_AUDIO' ? 400 : 503, { code })
    } finally {
      res.off('close', closed)
      serving = false
    }
  }
  async function open() {
    if (disposed) throw stopped()
    if (assets.snapshot().state !== 'ready') throw asrError('WHISPER_NOT_READY', 'Whisper Base 尚未就绪。')
    if (!listening) {
      const created = createServer({ requestTimeout: 15000, headersTimeout: 10000 }, (req, res) => { void handle(req, res) })
      server = created
      listening = once(created, 'listening').then(() => ({ url: `http://127.0.0.1:${created.address().port}/asr`, token })).catch(error => {
        created.close()
        if (server === created) { server = null; listening = null }
        throw error
      })
      created.listen(0, '127.0.0.1')
      created.unref()
    }
    if (!worker && !warming) {
      warming = selectGeneration().then(generation => startWorker(generation, true)).catch(() => {}).finally(() => { warming = null })
    }
    return listening
  }
  return {
    prepare(options) {
      if (nativeAssets) void nativeAssets.prepare(options).catch(() => log('Whisper Base fast runtime unavailable; WASM remains available'))
      return assets.prepare(options)
    },
    snapshot() {
      const base = assets.snapshot()
      if (!nativeAssets) return base
      const { state, totalBytes, receivedBytes } = nativeAssets.snapshot()
      return { ...base, acceleration: { state, totalBytes, receivedBytes } }
    },
    open,
    async dispose() {
      if (disposed) return
      disposed = true
      const current = server
      server = null
      const listenerClosed = current && new Promise(resolve => {
        current.close(() => resolve())
        current.closeAllConnections()
      })
      await Promise.allSettled([listenerClosed, stopWorker(stopped()), assets.dispose(), nativeAssets?.dispose(), warming])
    },
  }
}
