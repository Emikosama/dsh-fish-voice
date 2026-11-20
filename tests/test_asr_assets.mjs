import assert from 'node:assert/strict'
import test from 'node:test'
import { createHash } from 'node:crypto'
import { mkdtemp, readFile, readdir, rm, stat, utimes, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createAsrAssets } from '../voice-asr-assets.mjs'

const originals = new Map([['model/tokenizer.json', Buffer.from('tokenizer-data')], ['runtime/base.wasm', Buffer.from('wasm-bytes')]])
const files = [...originals].map(([file, body]) => ({
  file, url: `https://example.test/${file}`, bytes: body.length,
  md5: createHash('md5').update(body).digest('hex'),
  sha256: createHash('sha256').update(body).digest('hex'),
}))
async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'fish-asr-assets-'))
  const requests = []
  let corruptResponses = false
  const fetcher = async url => {
    const file = new URL(url).pathname.slice(1)
    requests.push(file)
    const body = originals.get(file)
    return new Response(corruptResponses ? Buffer.alloc(body.length, 45) : body)
  }
  const create = () => {
    const assets = createAsrAssets({ rootDirectory: directory, files, fetcher, label: 'SenseVoice', prefix: 'SENSEVOICE' })
    t.after(() => assets.dispose())
    return assets
  }
  t.after(() => rm(directory, { recursive: true, force: true }))
  return { directory, requests, create, corruptResponses: value => { corruptResponses = value } }
}

test('first prepare is shared; verify before use repairs only a same-size changed file', async t => {
  const { directory, requests, create } = await fixture(t)
  const assets = create()
  const first = assets.prepare()
  assert.equal(assets.prepare(), first)
  assert.equal((await first).state, 'ready')
  assert.deepEqual(requests, [...originals.keys()])
  const sample = files[0]
  const path = join(directory, sample.file)
  const before = await stat(path)
  await writeFile(path, Buffer.alloc(sample.bytes, 62))
  await utimes(path, before.atime, before.mtime)
  const repaired = await Promise.all([assets.verifyForUse(), assets.verifyForUse()])
  assert.equal(repaired[0], repaired[1])
  assert.deepEqual(await readFile(path), originals.get(sample.file))
  assert.deepEqual(requests, [...originals.keys(), sample.file])
  await assets.verifyForUse()
  assert.equal(requests.length, 3)
})

test('repeated missing file stops auto download across reload; manual retry repairs', async t => {
  const { directory, requests, create } = await fixture(t)
  const first = create()
  await first.prepare()
  const file = join(directory, files[0].file)
  await rm(file)
  await first.verifyForUse()
  await rm(file)
  await assert.rejects(first.verifyForUse(), { code: 'SENSEVOICE_PREPARE_BLOCKED' })
  await first.dispose()
  const second = create()
  await assert.rejects(second.prepare(), { code: 'SENSEVOICE_PREPARE_BLOCKED' })
  await assert.rejects(second.verifyForUse(), { code: 'SENSEVOICE_PREPARE_BLOCKED' })
  assert.equal(requests.length, 3)
  await second.prepare({ retry: true })
  assert.deepEqual(await readFile(file), originals.get(files[0].file))
  assert.equal(requests.length, 4)
})

test('a checksum failure cannot commit or repeat downloading until explicit retry', async t => {
  const { directory, requests, create, corruptResponses } = await fixture(t)
  corruptResponses(true)
  const first = create()
  await assert.rejects(first.prepare(), { code: 'SENSEVOICE_CHECKSUM_FAILED' })
  await assert.rejects(readFile(join(directory, files[0].file)), { code: 'ENOENT' })
  await assert.rejects(first.prepare(), { code: 'SENSEVOICE_PREPARE_BLOCKED' })
  await first.dispose()
  const second = create()
  await assert.rejects(second.prepare(), { code: 'SENSEVOICE_PREPARE_BLOCKED' })
  assert.equal(requests.length, 1)
  corruptResponses(false)
  await second.prepare({ retry: true })
  assert.equal(second.snapshot().state, 'ready')
  assert.equal(requests.length, 3)
})


test('a broken download restarts the pinned asset on its mirror and counts committed bytes once', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'fish-asset-mirror-'))
  const file = { ...files[0], fallbackUrl: 'https://mirror.test/asset' }
  const bytes = originals.get(file.file), requests = []
  const fetcher = async url => {
    requests.push(url)
    if (url === file.fallbackUrl) return new Response(bytes)
    return { ok: true, body: (async function* () {
      yield bytes.subarray(0, 4)
      throw Object.assign(new Error('reset'), { code: 'ECONNRESET' })
    })() }
  }
  const assets = createAsrAssets({ rootDirectory: directory, files: [file], fetcher, label: 'Sherpa', prefix: 'SHERPA_RUNTIME' })
  t.after(async () => { await assets.dispose(); await rm(directory, { recursive: true, force: true }) })
  const result = await assets.prepare()
  assert.equal(result.state, 'ready')
  assert.equal(result.receivedBytes, bytes.length)
  assert.deepEqual(requests, [file.url, file.fallbackUrl])
  assert.deepEqual(await readFile(join(directory, file.file)), bytes)
  assert.ok(!(await readdir(directory, { recursive: true })).some(name => name.endsWith('.part')))
})

test('initial preparation automatically resumes a truncated file on the same source', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'fish-asset-resume-'))
  const file = files[0]
  const bytes = originals.get(file.file), requests = []
  const fetcher = async (_url, { headers }) => {
    requests.push(headers)
    if (requests.length === 1) return {
      ok: true, status: 200, headers: new Headers({ ETag: '"pinned"' }),
      body: (async function* () { yield bytes.subarray(0, 4) })(),
    }
    return new Response(bytes.subarray(4), { status: 206, headers: {
      ETag: '"pinned"', 'Content-Range': `bytes 4-${bytes.length - 1}/${bytes.length}`,
    } })
  }
  const assets = createAsrAssets({ rootDirectory: directory, files: [file], fetcher, label: 'SenseVoice', prefix: 'SENSEVOICE' })
  t.after(async () => { await assets.dispose(); await rm(directory, { recursive: true, force: true }) })
  assert.equal((await assets.prepare()).receivedBytes, bytes.length)
  assert.equal(requests[1].Range, 'bytes=4-')
  assert.equal(requests[1]['If-Range'], '"pinned"')
  assert.deepEqual(await readFile(join(directory, file.file)), bytes)
})
