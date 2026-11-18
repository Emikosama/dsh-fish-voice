import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { isAbsolute, relative, resolve } from 'node:path'
import { Worker } from 'node:worker_threads'
import { createAsrAssets } from './voice-asr-assets.mjs'
import { createSherpaRuntime } from './voice-sherpa-runtime.mjs'

export { createSherpaRuntime } from './voice-sherpa-runtime.mjs'

const catalog = JSON.parse(readFileSync(new URL('./sensevoice-catalog.json', import.meta.url), 'utf8'))
const workerUrl = new URL('./voice-sensevoice-worker.mjs', import.meta.url)
const MAX_AUDIO_BYTES = 16_000 * 4 * 120
const asrError = (code, message) => Object.assign(new Error(message), { code: `SENSEVOICE_${code}` })
const stopped = () => asrError('DISPOSED', '鱼应已卸载。')
const unavailable = () => asrError('INFERENCE_FAILED', 'SenseVoice 识别进程不可用。')

/** Host-owned download and process-local microphone bridge. No audio is uploaded. */
export function createSenseVoiceAsr({ rootDirectory, sherpaRuntime, log = () => {}, fetcher } = {}) {
  const createModel = (directory, readOnly = false) => ({
    directory,
    assets: createAsrAssets({
      rootDirectory: directory, files: catalog.model.assets, log, fetcher, readOnly,
      label: 'SenseVoice INT8', prefix: 'SENSEVOICE',
    }),
  })
  const standardModel = createModel(rootDirectory)
  const runtime = sherpaRuntime ?? createSherpaRuntime({ rootDirectory: resolve(rootDirectory, 'runtime'), log, fetcher })
  const externalModels = new Map()
  const token = randomUUID() + randomUUID()
  let selectedModel = standardModel
  let server, listening, worker, workerModel, workerRevision, pending
  let workerReady = false, disposed = false, serving = false, nextId = 0
  let retirement = Promise.resolve()
  let warming = null
  let retryRuntime = false

  async function stopWorker(error) {
    pending?.finish(error)
    const previous = worker
    worker = null
    workerReady = false
    if (previous) retirement = previous.terminate()
    await retirement
  }

  async function verifiedRevision(model) {
    const [weightRevision, runtimeRevision] = await Promise.all([
      model.assets.verifyForUse(), runtime.verifyForUse(),
    ])
    return `${weightRevision}:${runtimeRevision}`
  }

  async function startWorker(model, revision, warmOnly = false) {
    await retirement
    if (disposed) throw stopped()
    if (warmOnly && (serving || worker)) return
    if (worker && (workerModel !== model || workerRevision !== revision)) await stopWorker(unavailable())
    if (disposed) throw stopped()
    if (worker) return
    const current = new Worker(workerUrl, {
      workerData: { rootDirectory: model.directory, runtimeDirectory: runtime.rootDirectory },
      execArgv: [], stdout: true, stderr: true,
    })
    // Keep model diagnostics out of the host protocol.
    current.stdout.resume()
    current.stderr.resume()
    worker = current
    workerModel = model
    workerRevision = revision
    const failed = () => {
      if (worker !== current) return
      worker = null
      workerReady = false
      pending?.finish(unavailable())
    }
    current.on('error', failed)
    current.on('exit', failed)
    current.on('message', result => {
      if (worker !== current) return
      if (result?.type === 'ready') {
        workerReady = true
        log('SenseVoice backend: wasm')
        pending?.send()
        return
      }
      if (result?.type === 'error') {
        log(`SenseVoice initialization failed: ${String(result.error ?? '').replace(/[\r\n]/g, ' ').slice(0, 240)}`)
        void stopWorker(unavailable()).catch(() => {})
        return
      }
      if (!pending || result?.id !== pending.id) return
      if (result.error || typeof result.text !== 'string' || result.text.length > 20_000) {
        pending.finish(unavailable())
        return
      }
      const response = { text: result.text }
      for (const key of ['language', 'emotion', 'event']) {
        const value = result[key]
        if (typeof value === 'string' && /^[a-zA-Z][a-zA-Z0-9_-]{0,31}$/.test(value)) response[key] = value
      }
      pending.finish(null, response)
    })
  }

  async function transcribe(pcm, model, revision, signal) {
    signal.throwIfAborted()
    await startWorker(model, revision)
    signal.throwIfAborted()
    return new Promise((resolve, reject) => {
      const id = ++nextId
      const cancel = () => {
        void stopWorker(asrError('CANCELLED', '识别请求已取消。')).catch(() => {})
      }
      const timeout = setTimeout(() => {
        void stopWorker(asrError('TIMEOUT', 'SenseVoice 识别超时。')).catch(() => {})
      }, 45_000)
      timeout.unref?.()
      pending = {
        id,
        send() {
          try { worker.postMessage({ id, pcm }, [pcm]) }
          catch { pending?.finish(unavailable()) }
        },
        finish(error, value) {
          if (pending?.id !== id) return
          pending = null
          clearTimeout(timeout)
          signal.removeEventListener('abort', cancel)
          if (error) reject(error)
          else resolve(value)
        },
      }
      signal.addEventListener('abort', cancel, { once: true })
      if (signal.aborted) { cancel(); return }
      if (workerReady) pending.send()
    })
  }

  function reply(res, status, result) {
    if (res.destroyed || res.writableEnded) return
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', connection: 'close' })
    res.end(JSON.stringify(result))
  }

  async function handle(req, res) {
    if (req.method !== 'POST' || req.url !== '/asr' || req.headers.authorization !== `Bearer ${token}`) {
      reply(res, 403, { code: 'SENSEVOICE_UNAUTHORIZED' })
      return
    }
    const length = Number(req.headers['content-length'])
    if (req.headers['content-type'] !== 'application/octet-stream' || req.headers['x-audio-format'] !== 'float32le'
      || req.headers['x-audio-sample-rate'] !== '16000' || req.headers['x-audio-channels'] !== '1'
      || !Number.isSafeInteger(length) || length <= 0 || length > MAX_AUDIO_BYTES || length % 4 !== 0) {
      reply(res, 400, { code: 'SENSEVOICE_INVALID_AUDIO' })
      return
    }
    if (disposed || serving) { reply(res, 429, { code: 'SENSEVOICE_BUSY' }); return }
    serving = true
    const model = selectedModel
    const abort = new AbortController()
    const closed = () => { if (!res.writableEnded) abort.abort(stopped()) }
    res.on('close', closed)
    try {
      const pcm = new ArrayBuffer(length)
      const bytes = Buffer.from(pcm)
      let offset = 0
      for await (const chunk of req) {
        if (offset + chunk.length > length) throw asrError('INVALID_AUDIO', '录音长度不符。')
        offset += chunk.copy(bytes, offset)
      }
      if (offset !== length) throw asrError('INVALID_AUDIO', '录音长度不符。')
      const revision = await verifiedRevision(model)
      reply(res, 200, await transcribe(pcm, model, revision, abort.signal))
    } catch (error) {
      const code = typeof error?.code === 'string' && /^(?:SENSEVOICE|SHERPA_RUNTIME)_[A-Z_]+$/.test(error.code)
        ? error.code : 'SENSEVOICE_INFERENCE_FAILED'
      log(`SenseVoice ASR: ${code}`)
      reply(res, code === 'SENSEVOICE_INVALID_AUDIO' ? 400 : 503, { code })
    } finally {
      res.off('close', closed)
      serving = false
    }
  }

  async function open({ modelDirectory = rootDirectory, retry = false } = {}) {
    if (disposed) throw stopped()
    if (typeof modelDirectory !== 'string' || !isAbsolute(modelDirectory)) {
      throw asrError('UNVERIFIED_MODEL', 'SenseVoice 模型目录无效。')
    }
    let model = standardModel
    if (relative(rootDirectory, modelDirectory)) {
      const directory = resolve(modelDirectory)
      if (!externalModels.has(directory)) externalModels.set(directory, createModel(directory, true))
      model = externalModels.get(directory)
      await model.assets.prepare({ retry: true })
    } else if (model.assets.snapshot().state !== 'ready') {
      throw asrError('NOT_READY', 'SenseVoice 尚未就绪。')
    }
    const retrySharedRuntime = retry || retryRuntime
    retryRuntime = false
    await runtime.prepare({ retry: retrySharedRuntime })
    if (disposed) throw stopped()
    selectedModel = model
    if (!listening) {
      const created = createServer({ requestTimeout: 15_000, headersTimeout: 10_000 }, (req, res) => { void handle(req, res) })
      server = created
      listening = new Promise((resolveBinding, reject) => {
        const closed = () => reject(stopped())
        created.once('close', closed)
        created.once('error', reject)
        created.listen(0, '127.0.0.1', () => {
          created.off('close', closed)
          if (disposed) { reject(stopped()); return }
          created.unref()
          resolveBinding({ url: `http://127.0.0.1:${created.address().port}/asr`, token })
        })
      }).catch(error => {
        created.close()
        if (server === created) { server = null; listening = null }
        throw error
      })
    }
    if (!worker && !warming) {
      warming = verifiedRevision(model).then(revision => startWorker(model, revision, true)).catch(() => {}).finally(() => { warming = null })
    }
    return listening
  }

  return {
    prepare({ retry = false } = {}) {
      if (retry) retryRuntime = true
      return standardModel.assets.prepare({ retry })
    },
    snapshot: standardModel.assets.snapshot,
    verifyDefaultWeights: standardModel.assets.verifyForUse,
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
      await Promise.allSettled([
        listenerClosed, stopWorker(stopped()), standardModel.assets.dispose(), warming,
        ...[...externalModels.values()].map(model => model.assets.dispose()),
        sherpaRuntime ? null : runtime.dispose(),
      ])
    },
  }
}

