import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { Worker } from 'node:worker_threads'
import { createAsrAssets } from './voice-asr-assets.mjs'
import { createSherpaRuntime } from './voice-sherpa-runtime.mjs'

const catalog = JSON.parse(readFileSync(new URL('./wake-spotter-catalog.json', import.meta.url), 'utf8'))
const workerUrl = new URL('./voice-wake-worker.mjs', import.meta.url)
const maxAudioBytes = 5 * 16000 * 4
const unavailable = () => new Error('Wake spotter unavailable')

function decodeCandidates(header) {
  if (typeof header !== 'string' || header.length > 12000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(header)) return null
  let candidates
  try { candidates = JSON.parse(Buffer.from(header, 'base64').toString('utf8')) } catch { return null }
  if (!Array.isArray(candidates) || candidates.length < 1 || candidates.length > 72) return null
  return candidates.every(row => row && Number.isInteger(row.id) && row.id >= 0 && row.id < 8
    && typeof row.variant === 'boolean' && Array.isArray(row.phones) && row.phones.length >= 2 && row.phones.length <= 24
    && row.phones.every(phone => typeof phone === 'string' && /^[\p{L}\p{M}0-2]{1,9}$/u.test(phone)))
    ? candidates : null
}

export function createWakeSpotter({ rootDirectory, sherpaRuntime, log = () => {}, fetcher } = {}) {
  const files = catalog.assets
  const assets = createAsrAssets({
    rootDirectory, files, fetcher, log,
    label: 'Wake spotter', prefix: 'WAKE_ASSETS', receiptName: '.fish-wake-assets.json',
  })
  const runtime = sherpaRuntime ?? createSherpaRuntime({ rootDirectory, fetcher, log })
  const token = randomUUID() + randomUUID()
  let server, listening, worker, preparation, pending
  let state = 'idle', error = null, disposed = false, nextId = 0, busy = false

  function snapshot() {
    const models = assets.snapshot()
    const wasm = runtime.snapshot()
    return {
      state, error,
      receivedBytes: models.receivedBytes + wasm.receivedBytes,
      totalBytes: models.totalBytes + wasm.totalBytes,
    }
  }

  function fail() {
    state = 'error'
    error = { code: 'WAKE_SPOTTER_UNAVAILABLE' }
  }

  function startWorker() {
    const current = new Worker(workerUrl, { workerData: { rootDirectory, runtimeDirectory: runtime.rootDirectory, runtimeFiles: runtime.files, files }, execArgv: [], stdout: true, stderr: true })
    // Preserve the boundary between the plugin protocol and native diagnostics.
    current.stdout.resume()
    current.stderr.resume()
    worker = current
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(unavailable())
        void current.terminate()
      }, 10000)
      timeout.unref?.()
      const exited = cause => {
        clearTimeout(timeout)
        reject(unavailable())
        if (worker !== current) return
        worker = null
        pending?.finish(unavailable())
        if (!disposed) {
          fail()
          const code = cause?.code ?? cause?.name
          log(`Acoustic wake worker stopped (${typeof code === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(code) ? code : 'worker-exit'})`)
        }
      }
      current.once('error', exited)
      current.once('exit', exited)
      current.on('message', message => {
        if (worker !== current) return
        if (message?.type === 'ready') {
          clearTimeout(timeout)
          resolve()
        } else if (pending && message?.id === pending.id) {
          pending.finish(message.error ? unavailable() : null, message.result)
        }
      })
    })
  }

  function prepare({ retry = false } = {}) {
    if (disposed) return Promise.reject(unavailable())
    if (preparation) return preparation
    if (state === 'ready') return Promise.resolve(snapshot())
    state = 'downloading'
    error = null
    preparation = (async () => {
      await Promise.all([assets.prepare({ retry }), runtime.prepare({ retry })])
      await runtime.verifyForUse()
      if (disposed) throw unavailable()
      await startWorker()
      if (disposed || !worker) throw unavailable()
      state = 'ready'
      log('Acoustic wake model ready (Sherpa-ONNX WASM CPU)')
      return snapshot()
    })().catch(cause => {
      if (disposed) return snapshot()
      fail()
      log('Acoustic wake model is unavailable')
      throw cause
    }).finally(() => { preparation = null })
    return preparation
  }

  function detect(pcm, candidates, signal) {
    signal.throwIfAborted()
    const current = worker
    if (disposed || !current) throw unavailable()
    const id = ++nextId
    return new Promise((resolve, reject) => {
      const abort = () => {
        if (worker === current) void current.terminate()
        pending?.finish(unavailable())
      }
      const timeout = setTimeout(abort, 3000)
      timeout.unref?.()
      pending = { id, finish(cause, result) {
        if (pending?.id !== id) return
        pending = null
        clearTimeout(timeout)
        signal.removeEventListener('abort', abort)
        if (cause) reject(cause)
        else resolve(result)
      } }
      signal.addEventListener('abort', abort, { once: true })
      if (signal.aborted) { abort(); return }
      try { current.postMessage({ id, pcm, candidates }, [pcm]) }
      catch { pending?.finish(unavailable()) }
    })
  }

  function reply(response, status, body) {
    if (response.destroyed || response.writableEnded) return
    response.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store', connection: 'close' })
    response.end(JSON.stringify(body))
  }

  async function handle(request, response) {
    if (request.headers.authorization !== `Bearer ${token}`) { reply(response, 403, {}); return }
    if (request.method === 'GET' && request.url === '/status') { reply(response, 200, { state }); return }
    if (request.method !== 'POST' || request.url !== '/wake') { reply(response, 404, {}); return }
    if (busy || disposed || state !== 'ready' || !worker) { reply(response, 503, {}); return }
    const length = Number(request.headers['content-length'])
    const candidates = decodeCandidates(request.headers['x-wake-keywords'])
    if (request.headers['content-type'] !== 'application/octet-stream' || !Number.isInteger(length)
      || length < 4 || length > maxAudioBytes || length % 4 !== 0 || !candidates) {
      reply(response, 400, {})
      return
    }
    busy = true
    const controller = new AbortController()
    const closed = () => controller.abort(unavailable())
    response.on('close', closed)
    try {
      const pcm = new ArrayBuffer(length)
      const bytes = Buffer.from(pcm)
      let offset = 0
      for await (const chunk of request) {
        if (offset + chunk.length > length) throw unavailable()
        offset += chunk.copy(bytes, offset)
      }
      if (offset !== length) throw unavailable()
      reply(response, 200, await detect(pcm, candidates, controller.signal))
    } catch { reply(response, 503, {}) }
    finally {
      response.off('close', closed)
      busy = false
    }
  }

  async function binding() {
    if (disposed) throw unavailable()
    if (!listening) {
      server = createServer({ requestTimeout: 5000 }, (request, response) => { void handle(request, response) })
      listening = new Promise((resolve, reject) => {
        const closed = () => reject(unavailable())
        server.once('close', closed)
        server.once('error', reject)
        server.listen(0, '127.0.0.1', () => {
          server.off('close', closed)
          const address = server.address()
          if (disposed || !address?.port) { reject(unavailable()); return }
          server.unref()
          resolve({ url: `http://127.0.0.1:${address.port}`, token })
        })
      })
    }
    return listening
  }

  async function dispose() {
    if (disposed) return
    disposed = true
    state = 'idle'
    pending?.finish(unavailable())
    if (server) {
      server.close()
      server.closeAllConnections()
    }
    await Promise.allSettled([assets.dispose(), worker?.terminate(), preparation, sherpaRuntime ? null : runtime.dispose()])
  }

  return { snapshot, prepare, binding, dispose }
}
