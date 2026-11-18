import assert from 'node:assert/strict'
import test from 'node:test'
import { createHash } from 'node:crypto'
import { mkdtemp, readFile, rm, stat, utimes, writeFile } from 'node:fs/promises'
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

