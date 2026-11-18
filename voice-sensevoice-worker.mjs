import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parentPort, workerData } from 'node:worker_threads'
import { loadCommonJS, loadSherpaRuntime, readVerifiedAssets } from './voice-sherpa-runtime.mjs'

const SAMPLE_RATE = 16_000
const MAX_AUDIO_BYTES = SAMPLE_RATE * 4 * 120
const catalog = JSON.parse(readFileSync(new URL('./sensevoice-catalog.json', import.meta.url), 'utf8'))
const recognizerAsset = catalog.runtime.recognizer

function tag(value) {
  const text = typeof value === 'string' ? value.trim().replace(/^<\|(.+)\|>$/, '$1') : ''
  return /^[a-zA-Z][a-zA-Z0-9_-]{0,31}$/.test(text) ? text : undefined
}

async function initialize({ rootDirectory, runtimeDirectory }) {
  const runtime = await loadSherpaRuntime(runtimeDirectory)
  const vendor = fileURLToPath(new URL('./vendor/', import.meta.url))
  const scripts = readVerifiedAssets(vendor, [recognizerAsset])
  const { OfflineRecognizer } = loadCommonJS(vendor, recognizerAsset.file, scripts)
  // The runtime uses NODERAWFS. The parent has verified these pinned files before launching the worker.
  const recognizer = new OfflineRecognizer({
    featConfig: { sampleRate: SAMPLE_RATE, featureDim: 80 },
    modelConfig: {
      senseVoice: {
        model: join(rootDirectory, 'model.int8.onnx'),
        language: 'auto',
        useInverseTextNormalization: 1,
      },
      tokens: join(rootDirectory, 'tokens.txt'),
      numThreads: 1,
      provider: 'cpu',
      debug: 0,
    },
    decodingMethod: 'greedy_search',
  }, runtime)
  if (!recognizer.handle) throw new Error('SenseVoice recognizer unavailable')
  return recognizer
}

function transcribe(recognizer, pcm) {
  if (!(pcm instanceof ArrayBuffer) || pcm.byteLength === 0 || pcm.byteLength > MAX_AUDIO_BYTES || pcm.byteLength % 4 !== 0) {
    throw new Error('SenseVoice input audio is invalid')
  }
  const samples = new Float32Array(pcm)
  if (samples.some(sample => !Number.isFinite(sample))) throw new Error('SenseVoice input audio contains invalid samples')
  const stream = recognizer.createStream()
  try {
    stream.acceptWaveform(SAMPLE_RATE, samples)
    recognizer.decode(stream)
    const result = recognizer.getResult(stream)
    return {
      text: String(result.text ?? '').trim(),
      language: tag(result.lang)?.toLowerCase(),
      emotion: tag(result.emotion),
      event: tag(result.event),
    }
  } finally {
    stream.free()
  }
}

try {
  const recognizer = await initialize(workerData)
  parentPort.on('message', ({ id, pcm }) => {
    try { parentPort.postMessage({ id, ...transcribe(recognizer, pcm) }) }
    catch { parentPort.postMessage({ id, error: true }) }
  })
  parentPort.postMessage({ type: 'ready' })
} catch (error) {
  parentPort.postMessage({
    type: 'error',
    error: String(error?.message ?? error).replace(/[\r\n\0]/g, ' ').slice(0, 240),
  })
  parentPort.close()
}

