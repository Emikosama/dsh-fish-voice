import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { once } from 'node:events'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Worker } from 'node:worker_threads'

test('the Node KWS runtime uses verified cache paths and recovers the previous keywords after a failed reconfiguration', async t => {
  const rootDirectory = await mkdtemp(join(tmpdir(), '鱼应 wake cache '))
  const files = new Map(Object.entries({
    'tokens.txt': 'x 0\niǎo 1\n',
    'encoder.onnx': 'encoder', 'decoder.onnx': 'decoder', 'joiner.onnx': 'joiner',
    'sherpa-onnx-wasm-nodejs.wasm': 'runtime',
    'sherpa-onnx-wasm-nodejs.js': 'module.exports = async () => ({ FS: { writeFile() { throw Error("host disk write"); } } })',
    'sherpa-onnx-kws.js': `const path = require('node:path')
      const fs = require('node:fs')
      exports.createKws = (_runtime, config) => {
        const model = config.modelConfig
        for (const file of [model.tokens, ...Object.values(model.transducer)]) {
          if (path.dirname(file) !== __dirname || !fs.statSync(file).isFile()) throw Error('not a verified cache path')
        }
        if (config.keywords.endsWith(' @1')) throw Error('synthetic model initialization failure')
        let released = false
        return {
          handle: 1,
          free() { if (released) throw Error('double free'); released = true },
          createStream() {
            if (released) throw Error('freed model')
            return { acceptWaveform() {}, inputFinished() {}, free() {} }
          },
          isReady() { return false },
        }
      }`,
  }))
  const assets = [...files].map(([file, body]) => ({
    file, url: 'https://example.test/' + file, bytes: Buffer.byteLength(body),
    sha256: createHash('sha256').update(body).digest('hex'), md5: createHash('md5').update(body).digest('hex'),
  }))
  await Promise.all([...files].map(([name, body]) => writeFile(join(rootDirectory, name), body)))
  const runtimeFiles = assets.filter(asset => asset.file.startsWith('sherpa-onnx-wasm-nodejs.'))
  const modelFiles = assets.filter(asset => !runtimeFiles.includes(asset))
  const worker = new Worker(new URL('../voice-wake-worker.mjs', import.meta.url), {workerData: { rootDirectory, runtimeDirectory: rootDirectory, files: modelFiles, runtimeFiles }})
  t.after(async () => { await worker.terminate(); await rm(rootDirectory, { recursive: true, force: true }) })
  const [ready] = await once(worker, 'message')
  assert.equal(ready.type, 'ready')
  async function recognize(id) {
    const samples = new Float32Array(480).fill(0.1)
    const response = once(worker, 'message')
    worker.postMessage({ id, pcm: samples.buffer, candidates: [{ id, variant: false, phones: ['x', 'iǎo'] }] }, [samples.buffer])
    return (await response)[0]
  }
  assert.deepEqual(await recognize(0), { id: 0, result: { supported: true, match: null } })
  assert.deepEqual(await recognize(1), { id: 1, error: true })
  assert.deepEqual(await recognize(0), { id: 0, result: { supported: true, match: null } })
})
