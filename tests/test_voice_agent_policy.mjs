import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createFileAgentPermissions, createMemoryAgentPermissions } from '../voice-agent-policy.mjs'

test('owner permissions persist across restart, and writes require the exact revision', t => {
  const directory = mkdtempSync(join(tmpdir(),'whale-agent-policy-'))
  t.after(() => rmSync(directory,{recursive:true,force:true}))
  const path = join(directory,'permissions.json'), store = createFileAgentPermissions(path)
  const initial = store.read()
  assert.ok(Object.values(initial.grants).every(item => item.allowed === false))
  initial.grants['set-output-volume'] = { allowed:true,baseline:'a'.repeat(64) }
  const changed = store.write(initial,initial.revision)
  assert.notEqual(changed.revision,initial.revision)
  assert.equal(createFileAgentPermissions(path).read().grants['set-output-volume'].allowed,true)
  assert.throws(() => store.write(initial,initial.revision), /已改变/)
  writeFileSync(path,'{"schema":1,"grants":{"enable":{"allowed":true}}}')
  assert.throws(() => store.read(), /无效/)
})

test('malformed or widened grants cannot be persisted', () => {
  const store = createMemoryAgentPermissions(), snapshot = store.read()
  snapshot.grants['enable'] = {allowed:true,baseline:null}
  assert.throws(() => store.write(snapshot,snapshot.revision), /无效/)
  assert.ok(Object.values(store.read().grants).every(item=>item.allowed===false))
})

test('legacy Microsoft consent is discarded while existing independent scopes are retained', t => {
  const directory = mkdtempSync(join(tmpdir(), 'whale-agent-policy-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  const path = join(directory, 'permissions.json'), store = createFileAgentPermissions(path)
  const initial = store.read()
  initial.authorization.completed = true
  initial.authorization.usageAgreementVersion = 1
  initial.authorization.scopes = ['settings', 'edge-text']
  writeFileSync(path, JSON.stringify(initial))
  const migrated = store.read()
  assert.deepEqual(migrated.authorization.scopes, ['settings'])
  migrated.authorization.scopes.push('deepseek-text')
  store.write(migrated, migrated.revision)
  assert.deepEqual(createFileAgentPermissions(path).read().authorization.scopes, ['settings', 'deepseek-text'])
  assert.doesNotMatch(readFileSync(path, 'utf8'), /edge-text/)
})
