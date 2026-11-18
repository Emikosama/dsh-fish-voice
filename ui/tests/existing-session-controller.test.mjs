import assert from 'node:assert/strict'
import test from 'node:test'
import { createController } from '../src/controller.mjs'

const idle = { enabled:false, ownerSessionId:null, helper:{online:false}, voiceControlBusy:false, listenMode:'ptt', voiceSession:{id:null,fullyStopped:true} }
const bound = { sessionId:'existing-D', title:'项目记录', availability:'ready' }
const deferred = () => Promise.withResolvers()
const tick = () => new Promise(resolve => setImmediate(resolve))

test('changing a binding reopens the current stream with its new owner source', async () => {
  const subscriptions = []
  const ui = createController()
  ui.attachConversationClient({
    subscribe(id) { subscriptions.push(id); return () => {} },
    action: async () => ({ ...idle, existingVoiceSession:null }),
    setExistingVoiceSession: async ({ sessionId }) => ({ binding:sessionId ? bound : null }),
  })
  try {
    ui.setSession('ordinary-A')
    await ui.run('ordinary-A','status')
    await ui.setExistingVoiceSession({ sessionId:bound.sessionId, expectedSessionId:null })
    assert.equal(subscriptions.at(-1), null, 'bound conversations belong to the owner stream')
    await ui.setExistingVoiceSession({ sessionId:null, expectedSessionId:bound.sessionId })
    assert.equal(subscriptions.at(-1), 'ordinary-A', 'unbinding restores the selected source')
  } finally { ui.dispose() }
})

test('read started before a binding write cannot overwrite its receipt', async () => {
  const earlierStatus = deferred()
  const ui = createController()
  let subsequentStatus = false
  ui.attachConversationClient({
    subscribe() { return () => {} },
    action: async () => subsequentStatus ? earlierStatus.promise : { ...idle, existingVoiceSession:null },
    setExistingVoiceSession: async () => ({ binding:bound }),
  })
  try {
    ui.setSession('ordinary-A')
    await ui.run('ordinary-A','status')
    subsequentStatus = true
    const reading = ui.run('ordinary-A','status')
    await ui.setExistingVoiceSession({ sessionId:bound.sessionId, expectedSessionId:null })
    earlierStatus.resolve({ ...idle, existingVoiceSession:null })
    await reading
    assert.deepEqual(ui.getSnapshot().status.existingVoiceSession, bound)
  } finally { ui.dispose() }
})

test('an unconfirmed binding write prevents starting the wrong conversation until a fresh status read', async () => {
  const requests = []
  let current = null
  const ui = createController()
  ui.attachConversationClient({
    subscribe() { return () => {} },
    action: async (id, request) => {
      requests.push([id,request.action])
      return { ...idle, existingVoiceSession:current }
    },
    async setExistingVoiceSession() {
      current = bound
      throw new Error('lost reply after write')
    },
  })
  try {
    ui.setSession('ordinary-A')
    await ui.run('ordinary-A','status')
    await assert.rejects(ui.setExistingVoiceSession({ sessionId:bound.sessionId, expectedSessionId:null }))
    assert.equal(await ui.run('ordinary-A','enable'),false)
    assert.equal(await ui.run('ordinary-A','status'),true)
    assert.equal(await ui.run('ordinary-A','enable'),true)
    assert.deepEqual(requests.filter(([,action]) => action === 'enable'),[[null,'enable']])
  } finally { ui.dispose() }
})

test('listen-mode replies without binding metadata preserve the current binding', async () => {
  const requests = []
  const ui = createController()
  ui.attachConversationClient({
    subscribe() { return () => {} },
    action: async (id, request) => {
      requests.push([id,request.action])
      if (request.action === 'listen-mode') return { ...idle, listenMode:request.mode }
      return { ...idle, existingVoiceSession:bound, existingVoiceSessionSupported:true }
    },
  })
  try {
    ui.setSession('ordinary-A')
    await ui.run('ordinary-A','status')
    assert.equal(await ui.run('ordinary-A','listen-mode',{ mode:'wake' }),true)
    assert.equal(ui.getSnapshot().status.listenMode,'wake')
    assert.deepEqual(ui.getSnapshot().status.existingVoiceSession,bound)
    await ui.run('ordinary-A','enable')
    assert.deepEqual(requests.slice(-2),[[null,'listen-mode'],[null,'enable']])
  } finally { ui.dispose() }
})
