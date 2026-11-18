import assert from 'node:assert/strict'
import test from 'node:test'
import { createController } from '../src/controller.mjs'

test('the owner update UI fences the displayed version and uses a new host snapshot after a dropped install receipt', async () => {
  const controller = createController()
  let receive, reject
  const requests = []
  const current = {
    schema: 1, currentVersion: '0.5.40', channel: 'stable', status: 'available',
    checkedAt: null, message: null, canInstall: true,
    release: { version: '0.5.41', announcement: '示例更新', url: 'https://github.com/Emikosama/dsh-fish-voice/releases/tag/v0.5.41' },
  }
  controller.attachConversationClient({
    subscribe() { return () => {} },
    subscribeUpdates(onValue) { receive = onValue; return () => {} },
    updateAction(request) {
      requests.push(request)
      return new Promise((_, fail) => { reject = fail })
    },
  })
  try {
    receive(current)
    await controller.updateAction({ action:'install', version:'0.5.42' })
    assert.deepEqual(requests, [], 'a changed release cannot be installed accidentally')
    const action = { action:'install', version:current.release.version }
    const installing = controller.updateAction(action)
    await controller.updateAction(action)
    assert.deepEqual(requests, [action])
    assert.equal(controller.getSnapshot().updatePending, 'install')
    receive({ ...current, currentVersion:action.version, status:'installed', canInstall:false })
    reject(new Error('old updater transport closed during reload'))
    await installing
    assert.equal(controller.getSnapshot().updatesUnavailable, false)
    assert.equal(controller.getSnapshot().updates.currentVersion, action.version)
    assert.equal(controller.getSnapshot().updatePending, null)
  } finally { controller.dispose() }
})

test('a late install acceptance cannot replace the completed result from the update stream', async () => {
  const controller = createController()
  const receipt = Promise.withResolvers()
  let receive
  const offer = { revision:1, status:'available', canInstall:true, release:{ version:'0.5.40' }, currentVersion:'0.5.39' }
  controller.attachConversationClient({
    subscribe() { return () => {} },
    subscribeUpdates(onValue) { receive = onValue; return () => {} },
    updateAction: () => receipt.promise,
  })
  try {
    receive(offer)
    const install = controller.updateAction({ action:'install', version:offer.release.version })
    const accepted = { ...offer, revision:2, status:'installing', canInstall:false }
    receive(accepted)
    const applied = { ...accepted, revision:3, status:'restart-required' }
    receive(applied)
    receipt.resolve(accepted)
    await install
    assert.equal(controller.getSnapshot().updates.status, applied.status)
    assert.equal(controller.getSnapshot().updatePending, null)
  } finally { controller.dispose() }
})

test('a dropped update stream resubscribes while the panel stays open without repeating a write', async () => {
  const jobs = new Map()
  const subscriptions = []
  let actions = 0
  const controller = createController(undefined, {
    schedule(fn) { const timer = Symbol(); jobs.set(timer, fn); return timer },
    unschedule(timer) { jobs.delete(timer) },
  })
  controller.enableAutomaticReads()
  controller.attachConversationClient({
    subscribe() { return () => {} },
    subscribeUpdates(receive, fail) { subscriptions.push({ receive, fail }); return () => {} },
    async updateAction() { actions++; return { status:'installing' } },
  })
  try {
    subscriptions[0].receive({ status:'available', canInstall:true, release:{version:'0.5.40'} })
    await controller.updateAction({ action:'install', version:'0.5.40' })
    subscriptions[0].fail()
    assert.equal(controller.getSnapshot().updatesUnavailable,true)
    assert.equal(jobs.size,1)
    const [timer, retry] = [...jobs][0]
    jobs.delete(timer)
    retry()
    assert.equal(subscriptions.length,2)
    subscriptions[1].receive({ status:'installed' })
    subscriptions[0].receive({ status:'installing' })
    assert.equal(controller.getSnapshot().updates.status,'installed')
    assert.equal(controller.getSnapshot().updatesUnavailable,false)
    assert.equal(actions,1)
  } finally { controller.dispose() }
})

test('an older stream value cannot overwrite a check receipt and a new stream can start at revision zero', async () => {
  const controller = createController()
  const subscriptions = []
  controller.attachConversationClient({
    subscribe() { return () => {} },
    subscribeUpdates(receive, fail) { subscriptions.push({ receive, fail }); return () => {} },
    async updateAction() { return { revision:8, status:'current' } },
  })
  try {
    subscriptions[0].receive({ revision:6, status:'idle' })
    await controller.updateAction({ action:'check' })
    subscriptions[0].receive({ revision:7, status:'checking' })
    assert.equal(controller.getSnapshot().updates.status,'current')
    subscriptions[0].fail()
    controller.refresh()
    subscriptions[1].receive({ revision:0, status:'idle' })
    assert.equal(controller.getSnapshot().updates.status,'idle')
  } finally { controller.dispose() }
})
