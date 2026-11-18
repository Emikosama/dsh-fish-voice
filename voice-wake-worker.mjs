import { join } from 'node:path'
import { parentPort, workerData } from 'node:worker_threads'
import { loadCommonJS, loadSherpaRuntime, readVerifiedAssets } from './voice-sherpa-runtime.mjs'

const sampleRate = 16000
const tailPadding = new Float32Array(6400)

function speechOnset(samples) {
  const step = sampleRate / 100
  const count = Math.min(120, Math.floor(samples.length / step))
  const rms = []
  for (let frame = 0; frame < count; frame++) {
    let energy = 0
    for (let index = frame * step; index < (frame + 1) * step; index++) energy += samples[index] ** 2
    rms.push(Math.sqrt(energy / step))
  }
  const threshold = Math.max(0.004, Math.min(0.025, Math.max(...rms) * 0.07))
  const first = rms.findIndex((value, index) => value >= threshold && rms[index + 1] >= threshold)
  return first >= 0 ? first / 100 : null
}

async function initialize({ rootDirectory, runtimeDirectory, runtimeFiles, files }) {
  const assets = readVerifiedAssets(rootDirectory, files)
  const module = await loadSherpaRuntime(runtimeDirectory, runtimeFiles)
  const { createKws } = loadCommonJS(rootDirectory, 'sherpa-onnx-kws.js', assets)
  // The upstream Node build uses NODERAWFS, so model paths resolve on the
  // host filesystem. Open the verified cache files directly on every drive.
  const modelPath = file => join(rootDirectory, file)
  const vocabulary = new Set(assets.get('tokens.txt').toString('utf8').trim().split(/\r?\n/).map(line => line.split(' ')[0]).filter(token => !token.startsWith('<')))
  let spotter, previousKeywords

  function configure(keywords) {
    if (keywords === previousKeywords) return
    spotter?.free()
    spotter = createKws(module, {
      featConfig: { samplingRate: sampleRate, featureDim: 80 },
      modelConfig: {
        transducer: { encoder: modelPath('encoder.onnx'), decoder: modelPath('decoder.onnx'), joiner: modelPath('joiner.onnx') },
        tokens: modelPath('tokens.txt'), provider: 'cpu', numThreads: 1,
      },
      maxActivePaths: 8, numTrailingBlanks: 1, keywordsScore: 1, keywordsThreshold: 0.46, keywords,
    })
    if (!spotter.handle) throw new Error('Wake model initialization failed')
    previousKeywords = keywords
  }
  configure('x iǎo j īng y ú @0')

  return function detect(pcm, candidates) {
    const valid = candidates.filter(candidate => candidate.phones.every(phone => vocabulary.has(phone)))
    if (!valid.length) return { supported: false, match: null }
    const samples = new Float32Array(pcm)
    if (samples.some(sample => !Number.isFinite(sample))) throw new Error('Wake input contains invalid samples')
    const onset = speechOnset(samples)
    if (onset === null) return { supported: true, match: null }
    const keywords = valid.map(({ id, phones, variant }) => `${phones.join(' ')} #${variant ? '0.52' : '0.46'} @${id}`).join('\n')
    configure(keywords)
    const stream = spotter.createStream()
    try {
      stream.acceptWaveform(sampleRate, samples)
      stream.acceptWaveform(sampleRate, tailPadding)
      stream.inputFinished()
      while (spotter.isReady(stream)) {
        spotter.decode(stream)
        const result = spotter.getResult(stream)
        if (!result.keyword) continue
        const start = result.start_time + result.timestamps[0]
        const end = result.start_time + result.timestamps.at(-1)
        if (start > onset + 0.23) break
        if (Number.isFinite(start) && Number.isFinite(end) && start >= 0 && end > start && end <= samples.length / sampleRate + 0.08) {
          return { supported: true, match: { id: Number(result.keyword), startMs: Math.round(start * 1000), endMs: Math.round(end * 1000) } }
        }
      }
      return { supported: true, match: null }
    } finally { stream.free() }
  }
}

const detect = await initialize(workerData)
parentPort.postMessage({ type: 'ready' })
parentPort.on('message', ({ id, pcm, candidates }) => {
  try { parentPort.postMessage({ id, result: detect(pcm, candidates) }) }
  catch { parentPort.postMessage({ id, error: true }) }
})
