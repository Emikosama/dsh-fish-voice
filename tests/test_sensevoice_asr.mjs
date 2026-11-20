import assert from 'node:assert/strict'
import { mkdtemp, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { createSenseVoiceAsr, createSherpaRuntime } from '../voice-sensevoice-asr.mjs'

test('preparing default SenseVoice weights leaves the shared WASM runtime idle', async t => {
  const cache = await mkdtemp(join(tmpdir(), 'fish-sensevoice-assets-'))
  const requests = []
  const fetcher = url => {
    requests.push(url)
    return new Response('', { status: 503 })
  }
  const runtime = createSherpaRuntime({ rootDirectory: join(cache, 'runtime'), fetcher })
  const service = createSenseVoiceAsr({ rootDirectory: join(cache, 'model'), sherpaRuntime: runtime, fetcher })
  t.after(async () => { await service.dispose(); await runtime.dispose(); await rm(cache, { recursive: true, force: true }) })
  await assert.rejects(service.prepare(), { code: 'SENSEVOICE_DOWNLOAD_FAILED' })
  assert.equal(service.snapshot().totalBytes, 239_549_735)
  assert.equal(runtime.snapshot().state, 'idle')
  assert.equal(requests.length, 2)
  assert.match(requests[0], /FilePath=model\.int8\.onnx$/)
  assert.match(requests[1], /^https:\/\/hf-mirror\.net\/.*\/model\.int8\.onnx$/)
})

test('invalid external SenseVoice weights are checked without downloads or directory writes', async t => {
  const external = await mkdtemp(join(tmpdir(), 'fish-sensevoice-external-'))
  await writeFile(join(external, 'tokens.txt'), 'old custom tokens')
  const fetcher = () => assert.fail('must not fetch on an invalid external model')
  const service = createSenseVoiceAsr({ rootDirectory: join(external, 'managed'), fetcher })
  t.after(async () => { await service.dispose(); await rm(external, { recursive: true, force: true }) })
  await assert.rejects(service.open({ modelDirectory: external }), { code: 'SENSEVOICE_UNVERIFIED_MODEL' })
  assert.deepEqual(await readdir(external), ['tokens.txt'])
  assert.equal(service.snapshot().state, 'idle')
})

