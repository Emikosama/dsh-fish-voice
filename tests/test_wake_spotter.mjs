import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { once } from 'node:events'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Worker } from 'node:worker_threads'

test('the Node KWS runtime opens verified cache paths, including on a read-only system drive', async t => {
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
        return { handle: 1, free() {} }
      }`,
  }))
  const assets = [...files].map(([file, body]) => ({
    file, url: 'https://example.test/' + file, bytes: Buffer.byteLength(body),
    sha256: createHash('sha256').update(body).digest('hex'), md5: createHash('md5').update(body).digest('hex'),
  }))
  await Promise.all([...files].map(([name, body]) => writeFile(join(rootDirectory, name), body)))
  const worker = new Worker(new URL('../voice-wake-worker.mjs', import.meta.url), {workerData: {rootDirectory, files: assets}})
  t.after(async () => { await worker.terminate(); await rm(rootDirectory, { recursive: true, force: true }) })
  const [ready] = await once(worker, 'message')
  assert.equal(ready.type, 'ready')
})
