import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { compileFunction } from 'node:vm'
import { createAsrAssets } from './voice-asr-assets.mjs'

const catalog = JSON.parse(readFileSync(new URL('./sensevoice-catalog.json', import.meta.url), 'utf8'))
const runtimeFiles = catalog.runtime.assets

export function createSherpaRuntime({ rootDirectory, fetcher, log } = {}) {
  const assets = createAsrAssets({
    rootDirectory, files: runtimeFiles, fetcher, log,
    label: 'Sherpa-ONNX WASM', prefix: 'SHERPA_RUNTIME', receiptName: '.fish-sherpa-runtime.json',
  })
  return { rootDirectory, files: runtimeFiles, ...assets }
}

export function readVerifiedAssets(directory, files) {
  return new Map(files.map(asset => {
    const bytes = readFileSync(join(directory, asset.file))
    if (bytes.length !== asset.bytes || createHash('sha256').update(bytes).digest('hex') !== asset.sha256) {
      throw new Error('Sherpa-ONNX asset verification failed')
    }
    return [asset.file, bytes]
  }))
}

export function loadCommonJS(directory, name, assets) {
  const path = join(directory, name)
  const module = { exports: {} }
  const load = compileFunction(assets.get(name).toString('utf8'),
    ['exports', 'require', 'module', '__filename', '__dirname'], { filename: path })
  load(module.exports, createRequire(path), module, path, dirname(path))
  return module.exports
}

export function loadSherpaRuntime(directory, files = runtimeFiles) {
  const bytes = readVerifiedAssets(directory, files)
  const wasm = loadCommonJS(directory, 'sherpa-onnx-wasm-nodejs.js', bytes)
  return wasm({ wasmBinary: bytes.get('sherpa-onnx-wasm-nodejs.wasm'), print() {}, printErr() {} })
}


