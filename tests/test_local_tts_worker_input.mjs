import test from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { access, mkdir, mkdtemp, readFile, realpath, rm, truncate, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { LOCAL_TTS_ASSETS, validateLocalTtsWav } from '../voice-tts-local.mjs'

const worker = new URL('../voice-tts-local-worker.mjs', import.meta.url).href
const failure = { ok: false, code: 'TTS_LOCAL_SYNTHESIS_FAILED' }
// A pipe may coalesce writes. Replace only stdin in an isolated process so the
// production worker receives deterministic Buffer boundaries, not a decoder mock.
const harness = `
  import { readFileSync } from 'node:fs'
  import { Readable } from 'node:stream'
  const input = readFileSync(0), width = Number(process.argv[1])
  function* chunks() {
    for (let at = 0; at < input.length; at += width) yield input.subarray(at, at + width)
  }
  Object.defineProperty(process, 'stdin', { value: Readable.from(chunks(), { objectMode: true }) })
  await import(${JSON.stringify(worker)})
`

function runWorker(input, width = 1) {
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', harness, String(width)], {
    input, encoding: 'utf8', timeout: 10000, windowsHide: true,
  })
  assert.equal(result.error, undefined)
  assert.equal(result.signal, null)
  assert.equal(result.stderr, '')
  return { status: result.status, reply: JSON.parse(result.stdout) }
}

async function fixture(t, unicodePaths = []) {
  const root = await mkdtemp(join(tmpdir(), 'whale-worker-input-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const directory = join(root, unicodePaths.includes('directory') ? '模型-🐋' : 'model')
  // Sparse size-only fixtures exercise the real asset gate without downloading
  // models. The fake native module below does not read or synthesize from them.
  for (const [name, size] of Object.entries(LOCAL_TTS_ASSETS)) {
    const path = join(directory, name)
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, '')
    await truncate(path, size)
  }
  const modulePath = join(root, unicodePaths.includes('modulePath') ? '运行-🎙️.cjs' : 'runtime.cjs')
  const output = join(root, unicodePaths.includes('output') ? '声音-🌊.wav' : 'speech.wav')
  const tracePath = join(root, 'trace.json')
  await writeFile(modulePath, `
    const { writeFileSync } = require('node:fs')
    const tracePath = ${JSON.stringify(tracePath)}
    exports.OfflineTts = { async createAsync(config) {
      const trace = { config }
      writeFileSync(tracePath, JSON.stringify(trace))
      return { sampleRate: 24000, async generateAsync(request) {
        trace.request = request
        writeFileSync(tracePath, JSON.stringify(trace))
        return { samples: new Float32Array([0, 0.25, -0.25]), sampleRate: 24000 }
      } }
    } }
  `)
  return {
    directory, modulePath, output, tracePath,
    request: { op: 'synthesize', directory, modulePath, output, text: '你好 café 🐋。' },
  }
}

for (const width of [65536, 1]) {
  test(`production worker preserves Chinese, two-byte accents and emoji with ${width}-byte chunks`, async t => {
    const f = await fixture(t)
    const result = runWorker(Buffer.from(JSON.stringify(f.request)), width)
    assert.equal(result.status, 0)
    assert.equal(result.reply.synthesized, true)
    const trace = JSON.parse(await readFile(f.tracePath, 'utf8'))
    assert.deepEqual(trace.request, { text: f.request.text, sid: 0, speed: 1 })
    assert.deepEqual(validateLocalTtsWav(await readFile(f.output)), { audioSeconds: 3 / 24000, sampleRate: 24000 })
  })
}

for (const field of ['directory', 'modulePath', 'output']) {
  test(`production worker preserves a split Unicode ${field} path`, async t => {
    const f = await fixture(t, [field])
    f.request.text = 'ASCII sample'
    const result = runWorker(Buffer.from(JSON.stringify(f.request)))
    assert.equal(result.status, 0)
    assert.equal(result.reply.synthesized, true)
    const trace = JSON.parse(await readFile(f.tracePath, 'utf8'))
    const root = await realpath(f.directory)
    assert.equal(trace.config.model.vits.model, `${root}/model.int8.onnx`)
    assert.equal(trace.config.model.vits.dictDir, `${root}/dict`)
    assert.equal(trace.request.text, f.request.text)
    assert.equal(validateLocalTtsWav(await readFile(f.output)).sampleRate, 24000)
  })
}

function sizedRequest(request, size) {
  const base = { ...request, padding: '' }
  const remaining = size - Buffer.byteLength(JSON.stringify(base))
  assert.ok(remaining >= 0)
  base.padding = '界'.repeat(Math.floor(remaining / 3)) + 'x'.repeat(remaining % 3)
  const input = Buffer.from(JSON.stringify(base))
  assert.equal(input.length, size)
  return input
}

test('production worker accepts exactly 65536 raw UTF-8 bytes even across character boundaries', async t => {
  const f = await fixture(t)
  const input = sizedRequest({ op: 'inspect', directory: f.directory, modulePath: f.modulePath }, 65536)
  assert.deepEqual(runWorker(input), { status: 0, reply: { ok: true, loaded: true, sampleRate: 24000 } })
})

for (const width of [65537, 1]) {
  test(`production worker rejects 65537 raw bytes before native loading with ${width}-byte chunks`, async t => {
    const f = await fixture(t)
    const input = sizedRequest({ op: 'inspect', directory: f.directory, modulePath: f.modulePath }, 65537)
    assert.deepEqual(runWorker(input, width), { status: 1, reply: failure })
    await assert.rejects(access(f.tracePath), { code: 'ENOENT' })
    await assert.rejects(access(f.output), { code: 'ENOENT' })
  })
}

test('production worker hides malformed input and private native errors', async t => {
  const f = await fixture(t)
  assert.deepEqual(runWorker(Buffer.from('{"text":"PRIVATE-你好🐋"')), { status: 1, reply: failure })
  const truncated = Buffer.concat([Buffer.from('{"text":"PRIVATE-'), Buffer.from([0xf0, 0x9f])])
  assert.deepEqual(runWorker(truncated), { status: 1, reply: failure })
  await assert.rejects(access(f.tracePath), { code: 'ENOENT' })
  await writeFile(f.modulePath, `exports.OfflineTts = { async createAsync() {
    require('node:fs').writeFileSync(${JSON.stringify(f.tracePath)}, 'native loaded')
    throw Error('PRIVATE-你好🐋 /private/model')
  } }`)
  assert.deepEqual(runWorker(Buffer.from(JSON.stringify(f.request))), { status: 1, reply: failure })
  assert.equal(await readFile(f.tracePath, 'utf8'), 'native loaded')
  await assert.rejects(access(f.output), { code: 'ENOENT' })
})
