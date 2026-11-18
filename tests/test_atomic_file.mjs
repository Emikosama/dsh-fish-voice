import assert from 'node:assert/strict'
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { atomicWriteText } from '../voice-atomic-file.mjs'

test('failed precommit leaves the previous voice configuration readable and discards staging', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'fish-atomic-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const path = join(directory, 'config.json')
  await writeFile(path, '{"voiceSessionId":null}')
  assert.throws(() => atomicWriteText(path, '{"voiceSessionId":"candidate"}', { beforeReplace() {
    throw new Error('changed revision')
  } }), /changed revision/)
  assert.deepEqual(JSON.parse(await readFile(path, 'utf8')), { voiceSessionId: null })
  assert.deepEqual(await readdir(directory), ['config.json'])
  atomicWriteText(path, '{"voiceSessionId":"confirmed"}')
  assert.deepEqual(JSON.parse(await readFile(path, 'utf8')), { voiceSessionId: 'confirmed' })
})
