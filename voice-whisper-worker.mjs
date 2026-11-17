import { readFileSync } from 'node:fs'
import { readFile as readFileAsync } from 'node:fs/promises'
import { registerHooks } from 'node:module'
import { availableParallelism } from 'node:os'
import { isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parentPort, workerData } from 'node:worker_threads'

const MAX_AUDIO_BYTES = 16000 * 4 * 120
const MODEL_ID = 'onnx-community/whisper-base'
const MODEL_ORIGIN = 'https://whale-model.invalid'
const ERROR_TEXT_LIMIT = 240

const send = value => parentPort?.postMessage(value)
const safeError = error => String(error?.message ?? error ?? 'Whisper worker failed')
  .replace(/https?:\/\/\S+/g, '[address]').replace(/[\r\n\0]/g, ' ').slice(0, ERROR_TEXT_LIMIT)

let transcriber = null
let backend = 'wasm'
let busy = false
let closing = false
let readyPromise

function readCatalog() {
  const file = new URL('./whisper-base-catalog.json', import.meta.url)
  return JSON.parse(readFileSync(file, 'utf8'))
}

function responseFor(bytes, file) {
  const contentType = file.endsWith('.json') ? 'application/json; charset=utf-8'
    : file.endsWith('.wasm') ? 'application/wasm'
      : file.endsWith('.mjs') || file.endsWith('.js') ? 'text/javascript; charset=utf-8'
        : 'application/octet-stream'
  return new Response(bytes, { status: 200, headers: { 'Content-Type': contentType, 'Content-Length': String(bytes.byteLength) } })
}

async function localOnlyFetch(input) {
  const rawUrl = input instanceof URL ? input.href : typeof input === 'string' ? input : input?.url
  if (typeof rawUrl !== 'string') throw new Error('Whisper local asset request is invalid')
  const url = new URL(rawUrl)
  let relativeFile
  if (url.origin === MODEL_ORIGIN) {
    const prefix = `/${MODEL_ID}/`
    if (!url.pathname.startsWith(prefix)) throw new Error('Whisper requested an unpinned model path')
    relativeFile = `model/${decodeURIComponent(url.pathname.slice(prefix.length))}`
    if (!assetByPath.has(relativeFile)) return new Response(null, { status: 404 })
  } else if (url.protocol === 'file:') {
    const target = resolve(fileURLToPath(url))
    const allowed = runtimeAssetPaths.get(target.toLowerCase())
    if (!allowed) throw new Error('Whisper requested an unpinned runtime file')
    relativeFile = allowed
  } else {
    throw new Error('Whisper worker network access is disabled')
  }
  const asset = assetByPath.get(relativeFile)
  if (!asset) throw new Error('Whisper requested a file outside its pinned catalog')
  const bytes = await readFileAsync(resolve(rootDirectory, ...relativeFile.split('/')))
  if (bytes.byteLength !== asset.bytes) throw new Error('Whisper verified asset changed while loading')
  return responseFor(bytes, relativeFile)
}

let rootDirectory
let assetByPath
let runtimeAssetPaths

async function initializeNative(nativeDirectory) {
  const entry = pathToFileURL(join(nativeDirectory, 'node_modules', '@huggingface', 'transformers', 'dist', 'transformers.node.mjs')).href
  // The official bundle imports its image dependency eagerly. This worker only
  // runs ASR, so it does not load a second native add-on for image tools.
  const hooks = registerHooks({ resolve(specifier, context, next) {
    if (specifier === 'sharp' && context.parentURL === entry) {
      return { url: 'data:text/javascript,export default function sharp(){throw Error("Audio worker only")}', shortCircuit: true }
    }
    return next(specifier, context)
  } })
  let transformers
  try { transformers = await import(entry) } finally { hooks.deregister() }
  const { env, pipeline } = transformers
  env.allowRemoteModels = false
  env.allowLocalModels = true
  env.localModelPath = rootDirectory
  env.useFSCache = false
  env.useBrowserCache = false
  env.logLevel = 50
  transcriber = await pipeline('automatic-speech-recognition', 'model', {
    device: 'cpu', dtype: 'q8', local_files_only: true,
    session_options: { intraOpNumThreads: Math.min(8, availableParallelism()), interOpNumThreads: 1, graphOptimizationLevel: 'all' },
  })
  backend = 'native-cpu'
}

async function initializeWasm() {
  const catalog = readCatalog()
  assetByPath = new Map(catalog.assets.map(asset => [asset.file, asset]))
  runtimeAssetPaths = new Map()
  for (const asset of catalog.assets) {
    if (asset.file.startsWith('runtime/node_modules/onnxruntime-web/dist/')) {
      const path = resolve(rootDirectory, ...asset.file.split('/'))
      runtimeAssetPaths.set(path.toLowerCase(), asset.file)
    }
  }

  // The web distribution selects ONNX Runtime Web only while Node's process
  // global is absent. Restore it immediately after import; the rest of this
  // isolated worker remains a normal Node worker.
  const nodeProcess = globalThis.process
  const previousFetch = globalThis.fetch
  globalThis.fetch = localOnlyFetch
  let transformers
  try {
    globalThis.process = undefined
    transformers = await import(pathToFileURL(resolve(rootDirectory,
      'runtime/node_modules/@huggingface/transformers/dist/transformers.web.js')).href)
  } finally {
    globalThis.process = nodeProcess
  }

  const { env, pipeline } = transformers
  if (!env || typeof pipeline !== 'function') throw new Error('Transformers.js web entry is unavailable')
  env.allowRemoteModels = true
  env.allowLocalModels = false
  env.useFS = false
  env.useFSCache = false
  env.useBrowserCache = false
  env.useWasmCache = false
  env.remoteHost = `${MODEL_ORIGIN}/`
  env.remotePathTemplate = '{model}/'
  env.fetch = localOnlyFetch
  env.logLevel = 50

  const wasm = env.backends?.onnx?.wasm
  if (!wasm) throw new Error('ONNX Runtime Web WASM backend is unavailable')
  wasm.numThreads = 1
  wasm.proxy = false
  const wasmFile = 'runtime/node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.asyncify.wasm'
  const factoryFile = 'runtime/node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.asyncify.mjs'
  const wasmPath = resolve(rootDirectory, ...wasmFile.split('/'))
  const factoryPath = resolve(rootDirectory, ...factoryFile.split('/'))
  wasm.wasmBinary = await readFileAsync(wasmPath)
  wasm.wasmPaths = { wasm: pathToFileURL(wasmPath).href, mjs: pathToFileURL(factoryPath).href }

  // Do not let the web build silently select Node CPU/native execution.
  const supported = env.backends.onnx.getSupportedDevices?.() ?? []
  if (!supported.includes('wasm')) throw new Error('Whisper WASM CPU device is unavailable')
  transcriber = await pipeline('automatic-speech-recognition', MODEL_ID, { device: 'wasm', dtype: 'q8' })
  if (previousFetch !== undefined) globalThis.fetch = previousFetch
}

async function initialize() {
  if (!workerData || typeof workerData.rootDirectory !== 'string' || !isAbsolute(workerData.rootDirectory)) {
    throw new Error('Whisper worker cache path is invalid')
  }
  rootDirectory = resolve(workerData.rootDirectory)
  if (typeof workerData.nativeDirectory === 'string' && isAbsolute(workerData.nativeDirectory)) {
    try { await initializeNative(workerData.nativeDirectory); return }
    catch (error) { send({ type: 'native-unavailable', error: safeError(error) }) }
  }
  await initializeWasm()
}

async function transcribe(message) {
  const id = message?.id
  try {
    if (!(typeof id === 'string' && id.length > 0 && id.length <= 80)
      && !(Number.isSafeInteger(id) && id > 0)) throw new Error('Whisper request id is invalid')
    if (closing) throw new Error('Whisper worker is stopping')
    if (busy) throw new Error('Whisper worker is busy')
    const pcm = message.pcm
    if (!(pcm instanceof ArrayBuffer) || pcm.byteLength === 0 || pcm.byteLength > MAX_AUDIO_BYTES || pcm.byteLength % 4 !== 0) {
      throw new Error('Whisper input audio is invalid')
    }
    const samples = new Float32Array(pcm)
    for (let index = 0; index < samples.length; index++) {
      if (!Number.isFinite(samples[index])) throw new Error('Whisper input contains invalid samples')
    }
    busy = true
    await readyPromise
    if (!transcriber) throw new Error('Whisper model is unavailable')
    const result = await transcriber(samples, { task: 'transcribe', language: 'zh' })
    send({ id, text: String(result?.text ?? '').trim(), language: 'zh' })
  } catch (error) {
    send({ id, error: safeError(error) })
  } finally {
    busy = false
  }
}

async function close() {
  if (closing) return
  closing = true
  try { await transcriber?.dispose?.() } catch { /* the worker exits below */ }
  transcriber = null
  send({ type: 'disposed' })
  parentPort?.close()
}

if (!parentPort) throw new Error('Whisper worker requires a parent port')
parentPort.on('message', message => {
  if (message?.type === 'dispose' || message?.type === 'close') {
    void close()
  } else {
    void transcribe(message)
  }
})

readyPromise = initialize()
readyPromise.then(() => send({ type: 'ready', backend })).catch(error => {
  send({ type: 'error', error: safeError(error) })
  parentPort.close()
})
