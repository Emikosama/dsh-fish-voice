import test from 'node:test'
import assert from 'node:assert/strict'
import { decodeReply } from '../src/protocol.mjs'
import { conversationRemote } from '../src/conversation-contract.mjs'
import { createController } from '../src/controller.mjs'
import { renderControls, renderAvailable } from '../../tests/helpers/render-controls.mjs'

const conversation = helper => ({ revision: 1, rootSessionId: 'voice', title: null, latest: null, items: [], inputActive: false, inputError: null, playbackConfirmed: false, helper })
test('unknown helper mode is valid in cached reads, and the live helper projection is narrow', () => {
  const status = { ownerSessionId: 'owner', enabled: true, helper: { online: false }, listenMode: null }
  assert.equal(decodeReply('status', status), status)
  const schema = conversationRemote.descriptors.find(value => value.method === 'follow').result.create()
  for (const helper of [{ online: false, listenMode: null }, { online: true, listenMode: null }, { online: true, listenMode: 'ptt' }]) {
    const snapshot = conversation(helper)
    assert.equal(decodeReply('conversation', snapshot), snapshot)
    assert.deepEqual(schema.parse(snapshot), snapshot)
  }
  for (const helper of [{ online: false, listenMode: 'always' }, { online: 'yes', listenMode: null }, { online: true, listenMode: 'private-mode' }]) {
    assert.throws(() => decodeReply('conversation', conversation(helper)), /helper state/)
    assert.throws(() => schema.parse(conversation(helper)))
  }
  assert.throws(() => schema.parse(conversation({ online: true, listenMode: 'ptt', path: '/private/path' })))
})

test('unknown live mode and withdrawn root never imply PTT or keep a stale listening claim', { skip: !renderAvailable }, async t => {
  const calls = []
  const status = { ownerSessionId: 'owner', enabled: true, helper: { online: true }, listenMode: 'always', voiceSession: { id: 'voice' }, capabilities: { listenMode: true } }
  const controller = createController(async (_id, request) => { calls.push(request.action); return status })
  controller.setSession('owner'); await controller.run('owner', 'status')
  let send
  controller.attachConversationClient({ subscribe(_id, listener) { send = listener; listener(conversation({ online: true, listenMode: null })); return () => {} } })
  const f = { controller, owner: { id: 'owner' } }, view = await renderControls(t, f)
  try {
    assert.match(view.container.querySelector('[role="status"]').textContent, /读取状态/)
    assert.match(view.container.querySelector('[data-listen-mode]').textContent, /听取方式未知/)
    assert.equal(view.container.querySelector('[data-listen-mode]').disabled, true)
    assert.doesNotMatch(view.container.textContent, /麦克风：已开启|自由麦直接听取|未绑定说话按键/)
    assert.equal(view.button('关麦').disabled, false)
    await view.act(async () => send({ ...conversation({ online: false, listenMode: null }), rootSessionId: null }))
    assert.match(view.container.querySelector('[role="status"]').textContent, /读取状态/)
    assert.doesNotMatch(view.container.textContent, /麦克风：已开启|自由麦直接听取/)
    await view.act(async () => send(conversation({ online: false, listenMode: null })))
    assert.match(view.container.querySelector('[role="status"]').textContent, /录音暂不可用/)
    await view.act(async () => controller.run('owner', 'status'))
    assert.match(view.container.querySelector('[role="status"]').textContent, /录音暂不可用/, 'fresh old status cannot replace newer stream facts')
    assert.equal(view.button('关麦').disabled, false)
    assert.deepEqual(calls, ['status', 'status'])
    await view.act(async () => send(conversation({ online: true, listenMode: 'ptt' })))
    assert.equal(view.container.querySelector('[data-listen-mode]').textContent, '按住说话')
  } finally { await view.close(); controller.dispose() }
})
