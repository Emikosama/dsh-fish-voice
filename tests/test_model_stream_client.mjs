import test from 'node:test'
import assert from 'node:assert/strict'
import { mountConversationClient } from '../ui/conversation-client.mjs'
import { modelSnapshotCodec, conversationRemote } from '../ui/conversation-contract.mjs'
import { createModelInstaller } from '../voice-model-installer.mjs'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
const tick = () => new Promise(resolve => setImmediate(resolve))

function fixture() {
  let release, capturedSignal, opened = 0, unmounted = 0
  const ctx = { remote: {
    $mount: async () => async () => { unmounted++ },
    whaleConversation: {
      followModels: async function* (_id, signal) { opened++; capturedSignal = signal; await new Promise(resolve => { release = resolve }); yield { schema: 1, jobs: [{ id: 'late-private-state' }] } },
      readSetup: async () => ({ ok: true, value: { version: 1, completed: false } }),
    },
  } }
  ctx.inject = (keys, callback) => { callback(ctx); return { await: async()=>{}, dispose: async()=>{} } }
  return { ctx, release: () => release?.(), signal: () => capturedSignal, opened: () => opened, unmounted: () => unmounted }
}

test('model client discards late frames after unsubscribe and never owns installation lifetime', async () => {
  const f = fixture(), client = await mountConversationClient(f.ctx), frames = [], errors = []
  const off = client.subscribeModels('owner', value => frames.push(value), error => errors.push(error))
  await tick(); off(); assert.equal(f.signal().aborted, true)
  f.release(); await tick()
  assert(frames.every(frame => frame.jobs.length === 0)); assert.equal(errors.length, 0)
  await client.dispose(); assert.equal(f.unmounted(), 1)
})

test('model client disposal clears snapshots and forbids new subscriptions', async () => {
  const f = fixture(), client = await mountConversationClient(f.ctx), frames = [], errors = []
  client.subscribeModels('owner', value => frames.push(value), error => errors.push(error))
  await tick(); await client.dispose(); f.release(); await tick()
  client.subscribeModels('other', value => frames.push(value), error => errors.push(error))
  assert.equal(f.opened(), 1); assert.equal(errors.length, 1)
  assert(frames.every(frame => frame.jobs.length === 0))
})

test('readSetup exposes only the minimal response and uses no active session', async () => {
  const f = fixture(), client = await mountConversationClient(f.ctx)
  assert.deepEqual(await client.readSetup(), { version: 1, completed: false })
  assert.equal(f.opened(), 0)
  await client.dispose()
})

test('strict model snapshot codec accepts actual catalog and rejects secrets/unknown fields', async t => {
  const root = await mkdtemp(join(tmpdir(), 'whale-model-codec-'))
  const installer = createModelInstaller({ root })
  t.after(async () => { await installer.close(); await rm(root, { recursive: true, force: true }) })
  const snapshot = installer.snapshot(), schema = modelSnapshotCodec.create()
  assert.equal(schema.safeParse(snapshot).success, true)
  assert.equal(schema.safeParse({ ...snapshot, apiKey: 'never-publish' }).success, false)
  assert.equal(schema.safeParse({ ...snapshot, compute: { ...snapshot.compute, auth: 'never-publish' } }).success, false)
  assert.equal(conversationRemote.descriptors.find(item => item.method === 'readSetup').parameters.length, 0)
})

test('unexpected normal EOF reports a reconnectable error, unlike intentional unsubscribe',async()=>{
 for(const method of ['follow','followModels']){
  const errors=[],frames=[]
  const ctx={remote:{$mount:async()=>async()=>{},whaleConversation:{[method]:async function*(){}}}}
  ctx.inject=(_keys,callback)=>{callback(ctx);return{await:async()=>{},dispose:async()=>{}}}
  const client=await mountConversationClient(ctx)
  client[method==='follow'?'subscribe':'subscribeModels']('owner',value=>frames.push(value),error=>errors.push(error))
  await tick();assert.equal(errors.length,1);assert.match(errors[0].message,/重新连接/)
  await client.dispose();assert.equal(errors.length,1)
 }
})
