import test from 'node:test'
import assert from 'node:assert/strict'
import { createVoiceConversation, createSpeakVolume } from '../voice-output.mjs'
function setup() {
  const owner = { session: { id: 'owner' } }, root = { session: { id: 'root' } }, other = { session: { id: 'other' } }
  const agents = new Map([['owner', owner], ['root', root], ['other', other]])
  const state = { enabled: true, rootSessionId: 'root', ownerSessionId: 'owner', epoch: 'one' }
  const conversation = createVoiceConversation({ getScope: () => state, getAgent: id => agents.get(id), assertCaller(agent) { if (agents.get(agent?.session?.id) !== agent) throw Error('stale') } })
  const event = (seq, text, extra = {}) => ({ type: 'assistant/message', seq, surfaceOp: 'append', data: { message: { content: [{ type: 'text', text }, { type: 'reasoning', text: 'PRIVATE' }] }, ...extra } })
  const say = (text, agent = root, options = {}) => {
    const exec = { name:'speak', agent, arguments:{text}, token:Symbol('speech'), ...options }
    conversation.requestSpeech(exec)
    return exec
  }
  return { owner, root, other, agents, state, conversation, event, say }
}
test('captions use the exact authorized speech-tool text, never ordinary assistant output', () => {
  const f = setup()
  f.say('foreign', f.other)
  f.say('forged', { session:{id:'root'} })
  f.say('private worker output', f.root, {name:'voice_message'})
  const call=f.say('听到了别急')
  f.conversation.requestSpeech(call)
  f.conversation.observe(f.root.session, f.event(3, '（没有主人的新语音，先不说话。）'))
  const snapshot = f.conversation.read(f.owner)
  assert.equal(snapshot.items.length, 1)
  assert.equal(snapshot.latest.text, '听到了别急')
  assert.equal(snapshot.latest.state, 'speech-requested')
  assert.equal(snapshot.playbackConfirmed, false)
  assert.equal(JSON.stringify(snapshot).includes('PRIVATE'), false)
  f.conversation.finishSpeech(call,{isError:false,value:'spoken',content:[]})
  assert.equal(f.conversation.read(f.owner).latest.state,'reply')
  assert.equal(f.conversation.read(f.other).items.length, 0)
  assert.throws(() => f.conversation.read({ session: { id: 'owner' } }), /stale/)
})
test('ordinary output alone never appears as speech and late text cannot overwrite multiple spoken segments',()=>{
  const f=setup()
  f.conversation.observe(f.root.session,f.event(1,'not spoken'))
  assert.equal(f.conversation.read(f.owner).latest,null)
  f.say('first');f.say('second',f.root,{name:'whale_voice_speak'})
  f.conversation.observe(f.root.session,f.event(2,'not the tool text'))
  assert.deepEqual(f.conversation.read(f.owner).items.map(row=>row.text),['first','second'])
})
test('denied, failed, aborted, invalid and old-generation calls never become confirmed speech',()=>{
  const f=setup(),aborted=new AbortController();aborted.abort()
  f.say('never dispatched',f.root,{signal:aborted.signal})
  f.say('',f.root);f.say('x'.repeat(8001),f.root)
  assert.equal(f.conversation.read(f.owner).latest,null)
  const failed=f.say('failed');f.conversation.finishSpeech(failed,{isError:true,error:{message:'private error'}})
  assert.equal(f.conversation.read(f.owner).latest.state,'speech-failed')
  const local=f.say('local failure',f.root,{name:'whale_voice_speak'})
  f.conversation.finishSpeech(local,{isError:false,value:'❌ whale_voice_speak 失败：private'})
  assert.equal(f.conversation.read(f.owner).latest.state,'speech-failed')
  const cancel=new AbortController(),interrupted=f.say('cancelled',f.root,{signal:cancel.signal})
  cancel.abort();f.conversation.finishSpeech(interrupted,{isError:true})
  assert.equal(f.conversation.read(f.owner).latest.state,'interrupted')
  const old=f.say('old');f.state.epoch='two';f.conversation.invalidate()
  f.conversation.finishSpeech(old,{isError:false,value:'late'})
  assert.equal(f.conversation.read(f.owner).latest,null)
  assert.equal(JSON.stringify(f.conversation.read(f.owner)).includes('private'),false)
})
test('epoch, revoke, replacement and bounds fence retained speech data', () => {
  const f = setup(), frames = []
  const off = f.conversation.subscribe(f.owner, v => frames.push(v))
  const call=f.say('cancel prefix');f.conversation.finishSpeech(call,{isError:true})
  assert.equal(frames.at(-1).latest.state, 'speech-failed')
  f.state.epoch = 'two'; f.conversation.invalidate()
  assert.equal(frames.at(-1).items.length, 0)
  f.conversation.input('stale', { rootSessionId: 'root', ownerSessionId: 'owner', epoch: 'one' }, 'a')
  assert.equal(f.conversation.read(f.owner).items.length, 0)
  for (let i=2; i<50; i++) f.say('x'.repeat(8000))
  assert.equal(frames.at(-1).items.length, 40)
  assert.equal(frames.at(-1).latest.text.length, 8000)
  f.conversation.setInputActive(true)
  assert.equal(frames.at(-1).inputActive, true)
  f.conversation.setInputActive(false)
  assert.equal(frames.at(-1).inputActive, false)
  f.state.enabled = false; f.conversation.invalidate()
  assert.equal(frames.at(-1).rootSessionId, null)
  off(); f.conversation.dispose()
})
test('owner-admitted human projections follow the same root across windows without granting agents access', () => {
  const f = setup(), frames = []
  const off = f.conversation.subscribeForHuman(f.other, value => frames.push(value))
  f.say('global voice reply')
  f.conversation.setInputActive(true)
  assert.equal(f.conversation.readForHuman(f.other).latest.text, 'global voice reply')
  assert.equal(frames.at(-1).rootSessionId, 'root')
  assert.equal(frames.at(-1).inputActive, true)
  assert.equal(f.conversation.read(f.other).rootSessionId, null)
  assert.equal(f.conversation.read(f.other, true).rootSessionId, null, 'extra model arguments cannot select human authority')
  f.agents.delete('owner')
  assert.equal(f.conversation.readForHuman(f.other).latest.text, 'global voice reply')
  assert.throws(() => f.conversation.readForHuman({ session: { id: 'other' } }), /stale/)
  f.agents.set('other', { session: { id: 'other' } })
  f.say('later reply')
  assert.equal(frames.at(-1).rootSessionId, null, 'a replaced UI actor loses its subscription')
  off(); f.conversation.dispose()
})
test('pending bound transcripts appear only in the matching owner stream while its voice grant is active', () => {
  const owner = {}, ordinary = {session:{id:'ordinary'}}
  const grant = {enabled:true, humanOnly:true, rootSessionId:'bound', ownerSessionId:'voice-owner', epoch:'one'}
  const pending = {sessionId:'bound',items:[{id:'abcd',text:'retained synthetic input',state:'busy'}]}
  const view = createVoiceConversation({
    getScope: () => grant, getAgent: () => ordinary, assertCaller() {},
    getRetryTranscripts: actor => actor === owner ? pending : null,
  })
  const frames = []
  const off = view.subscribeForHuman(owner, frame => frames.push(frame))
  assert.deepEqual(frames.at(-1).retryTranscripts, pending)
  assert.equal(view.read(ordinary).retryTranscripts, undefined)
  assert.equal(view.readForHuman(ordinary).retryTranscripts, undefined)
  grant.enabled = false
  view.refreshRetryTranscripts()
  assert.equal(frames.at(-1).retryTranscripts, undefined)
  off(); view.dispose()
})

test('real dsh-speak volume uses narrow CAS mutate, not cue config or system volume', async () => {
  let revision = 4, volume = 50
  const calls = []
  const settings = { describe(options) { assert.equal(options.redactSecrets, true); return [{ ns:'dsh-speak', revision, applies:'live', value:{ volume, queueAllMessages:false, cleanMarkdownFormatting:true } }] }, async mutate(ns, ops, rev) { calls.push({ns,ops,rev}); assert.equal(rev,revision); volume=ops[0].value; revision++ } }
  const api=createSpeakVolume({getSettings:()=>settings,platform:'win32'})
  assert.equal(api.read().volume,0.5)
  assert.equal((await api.set({revision:4,volume:0.37})).volume,0.37)
  assert.deepEqual(calls,[{ns:'dsh-speak',ops:[{op:'set',path:['volume'],value:37}],rev:4}])
  await assert.rejects(api.set({revision:4,volume:1}),/改变/)
  await assert.rejects(api.set({revision:5,volume:NaN}),/无效/)
  await assert.rejects(api.set({revision:5,volume:0.2,extra:true}),/无效/)
  for (const platform of ['darwin','linux']) assert.equal(createSpeakVolume({getSettings:()=>settings,platform}).read().supported,false)
  assert.equal(createSpeakVolume({getSettings:()=>null,platform:'win32'}).read().supported,false)
})

test('wake refresh streams only current scoped state without deleting conversation text', () => {
  const owner={session:{id:'owner'}},other={session:{id:'other'}},agents=new Map([['owner',owner],['other',other]])
  const grant={enabled:true,ownerSessionId:'owner',rootSessionId:'root',epoch:'one'}
  let wake={state:'starting',streamOpen:false,deadlineAt:null,detection:'asr-after-utterance'}
  const c=createVoiceConversation({getScope:()=>grant,getAgent:id=>agents.get(id),assertCaller:a=>assert.equal(agents.get(a.session.id),a),getWakeState:()=>wake})
  const frames=[],off=c.subscribe(owner,value=>frames.push(value))
  c.input('accepted text',grant,'a')
  wake={...wake,state:'waiting',streamOpen:true};c.refreshWakeState()
  assert.equal(frames.at(-1).wake.state,'waiting')
  assert.equal(frames.at(-1).items[0].text,'accepted text')
  wake={...wake,state:'listening',deadlineAt:1700000010000,privateText:'never expose'};c.refreshWakeState()
  assert.equal(frames.at(-1).wake.deadlineAt,1700000010000)
  assert.equal(JSON.stringify(frames.at(-1)).includes('never expose'),false)
  assert.equal(c.read(other).wake.state,'disabled')
  assert.equal(c.readForHuman(other).wake.state,'listening')
  grant.enabled=false;c.invalidate()
  assert.deepEqual(frames.at(-1).wake,{state:'disabled',deadlineAt:null,streamOpen:false,detection:'asr-after-utterance'})
  off();c.dispose()
})

test('canonical host cancellation survives restoration of a wrapper signal', () => {
  for (const code of ['ABORTED', 'ABORTED_BEFORE_DISPATCH']) {
    const f = setup(), caller = new AbortController(), wrapper = new AbortController()
    const exec = f.say('cancelled speech', f.root, { signal: caller.signal })
    // tools/execute wrappers restore their temporary signal before tools/result.
    exec.signal = wrapper.signal
    wrapper.abort()
    exec.signal = caller.signal
    f.conversation.finishSpeech(Object.freeze(exec), Object.freeze({
      isError: true, error: { message: 'tool call aborted', info: { name: 'AbortError', code } }, content: [],
    }))
    assert.equal(caller.signal.aborted, false)
    assert.equal(f.conversation.read(f.owner).latest.state, 'interrupted', code)
    assert.equal(f.conversation.read(f.owner).playbackConfirmed, false)
  }
})

test('out-of-order speech results update only their matching caption and preserve latest text', () => {
  const f = setup(), first = f.say('first segment'), second = f.say('second segment')
  f.conversation.finishSpeech(second, { isError: false, value: 'ok', content: [] })
  f.conversation.finishSpeech(first, { isError: true, error: { message: 'backend failed' }, content: [] })
  const snapshot = f.conversation.read(f.owner)
  assert.deepEqual(snapshot.items.map(({ text, state }) => ({ text, state })), [
    { text: 'first segment', state: 'speech-failed' }, { text: 'second segment', state: 'reply' },
  ])
  assert.equal(snapshot.latest.text, 'second segment')
  assert.equal(snapshot.latest.state, 'reply')
})

test('cancellation classification requires native error codes, not provider text or generic errors', () => {
  const f = setup()
  const success = f.say('successful speech')
  f.conversation.finishSpeech(success, { isError: false, value: 'ABORTED', content: [] })
  assert.equal(f.conversation.read(f.owner).latest.state, 'reply')
  const failure = f.say('failed speech')
  f.conversation.finishSpeech(failure, { isError: true, error: { message: 'ABORTED', info: { code: 'INVALID_TOOL_OUTPUT' } }, content: [] })
  assert.equal(f.conversation.read(f.owner).latest.state, 'speech-failed')
})

test('a replaced root cannot finalize a prior root instance speech call', () => {
  const f = setup(), old = f.say('prior instance')
  const replacement = { session: { id: 'root' } }
  f.agents.set('root', replacement)
  const current = f.say('current instance', replacement)
  f.conversation.finishSpeech(old, { isError: true, error: { message: 'late failure' } })
  f.conversation.finishSpeech(current, { isError: false, value: 'ok', content: [] })
  assert.equal(f.conversation.read(f.owner).latest.text, 'current instance')
  assert.equal(f.conversation.read(f.owner).latest.state, 'reply')
  assert.equal(f.conversation.read(f.owner).items[0].state, 'speech-requested')
})

test('built-in cancellation markers are scoped to the exact live speech call', () => {
  const f = setup()
  const external = f.say('external'), first = f.say('first', f.root, { name: 'whale_voice_speak' })
  const second = f.say('second', f.root, { name: 'whale_voice_speak' })
  f.conversation.recordSpeechCancellation(external)
  f.conversation.recordSpeechCancellation({ ...second, agent: f.other })
  f.conversation.recordSpeechCancellation(first)
  const failure = { isError: false, value: '❌ whale_voice_speak 失败：朗读已取消\n{"code":"TTS_CANCELLED"}' }
  f.conversation.finishSpeech(first, failure)
  f.conversation.finishSpeech(second, failure)
  f.conversation.finishSpeech(external, { isError: false, value: 'ok' })
  assert.deepEqual(f.conversation.read(f.owner).items.map(row => row.state), ['reply', 'interrupted', 'speech-failed'])
  f.state.epoch = 'two'
  f.conversation.invalidate()
  f.conversation.recordSpeechCancellation(first)
  f.conversation.finishSpeech(first, failure)
  assert.equal(f.conversation.read(f.owner).latest, null)
  const current = f.say('current', f.root, { name: 'whale_voice_speak' })
  f.conversation.finishSpeech(current, { isError: false, value: 'ok' })
  assert.equal(f.conversation.read(f.owner).latest.state, 'reply')
})

test('speech fence keys native step admission, not mutable signals or model text', async () => {
  const { createVoiceSpeechFence } = await import('../voice-output.mjs')
  const fence = createVoiceSpeechFence(), agent = {}, other = {}, toolSet = {}, signal = new AbortController().signal
  const input = { agent, toolSet, signal, log: { turn: 1, step: 1 } }
  fence.beginStep({ turn: 1, step: 1 }); fence.enterBatch(input)
  fence.assertCurrent({ agent, toolSet, signal })
  fence.rememberInput('old-pending-input'); fence.cancel()
  assert.throws(() => fence.assertCurrent({ agent, toolSet, signal: AbortSignal.any([signal]) }), { code: 'TTS_CANCELLED' })
  // A duplicate executor entry cannot re-stamp an old toolSet after cancellation.
  fence.enterBatch(input)
  assert.throws(() => fence.assertCurrent({ agent, toolSet }), { code: 'TTS_CANCELLED' })
  for (const messages of [[{ id: 'worker-feedback' }], [{ id: 'old-pending-input' }]]) {
    const nextSet = {}
    fence.beginStep({ turn: 1, step: 2, messages })
    fence.enterBatch({ ...input, toolSet: nextSet, log: { turn: 1, step: 2 } })
    assert.throws(() => fence.assertCurrent({ agent, toolSet: nextSet }), { code: 'TTS_CANCELLED' })
  }
  fence.rememberInput('fresh-input')
  fence.beginStep({ turn: 1, step: 3, messages: [{ id: 'fresh-input' }] })
  const fresh = {}; fence.enterBatch({ ...input, toolSet: fresh, log: { turn: 1, step: 3 } })
  fence.assertCurrent({ agent, toolSet: fresh })
  assert.throws(() => fence.assertCurrent({ agent: other, toolSet: fresh }), { code: 'TTS_OUTPUT_SCOPE_UNVERIFIED' })
  assert.throws(() => fence.assertCurrent({ agent, toolSet: {} }), { code: 'TTS_OUTPUT_SCOPE_UNVERIFIED' })
  const unknown = {}; fence.enterBatch({ ...input, toolSet: unknown, log: { turn: 99, step: 1 } })
  assert.throws(() => fence.assertCurrent({ agent, toolSet: unknown }), { code: 'TTS_OUTPUT_SCOPE_UNVERIFIED' })
  fence.assertCurrent({ agent, signal }) // explicit invocation outside a model step
})

test('speech fence keeps every pending input generation across long queues and edits', async () => {
  const { createVoiceSpeechFence } = await import('../voice-output.mjs')
  const fence = createVoiceSpeechFence(), agent = {}
  const checkStep = (step, messages) => {
    const toolSet = {}
    fence.beginStep({ turn: 1, step, messages })
    fence.enterBatch({ agent, toolSet, log: { turn: 1, step } })
    return () => fence.assertCurrent({ agent, toolSet })
  }
  checkStep(1, [])()
  for (let i = 0; i < 80; i++) fence.rememberInput(`old-queued-${i}`)
  fence.cancel()
  // Native queue edit/steer reinserts the same pending ID and source.
  fence.rememberInput('old-queued-0')
  assert.throws(checkStep(2, [{ id: 'old-queued-0' }]), { code: 'TTS_CANCELLED' })
  fence.rememberInput('fresh-next-step')
  for (let i = 0; i < 80; i++) fence.rememberInput(`fresh-next-turn-${i}`)
  // Later queued followups must not evict the genuine steer waiting for this step.
  checkStep(3, [{ id: 'fresh-next-step' }])()
})

const voiceReplyEvent = (step, text, { surfaceOp = 'append', interrupted = false, moreContent = [] } = {}) => ({
  type: 'assistant/message', surfaceOp,
  data: { turn: 1, step, interrupted, message: {
    id: 'message-' + step, role: 'assistant', content: [{ type: 'text', text }, ...moreContent],
  } },
})
const finishVoiceTurn = (kind = 'completed') => ({ type: 'turn/end', data: { turn: 1, reason: { kind } } })
const startVoiceStep = step => ({ type: 'step/start', data: { turn: 1, step } })
const commitVoiceInput = id => ({ type: 'user/message', surfaceOp: 'append', data: { id, role: 'user', source: { kind: 'whale-ear' } } })

test('a single notice is due only after the final committed visible reply after multiple microphone inputs', async () => {
  const { createVoiceSpeechFence } = await import('../voice-output.mjs')
  const fence = createVoiceSpeechFence()
  fence.rememberInput('first', true)
  fence.beginStep({ turn: 1, step: 1, messages: [{ id: 'first' }] })
  fence.observeTurn(startVoiceStep(1))
  fence.observeTurn(commitVoiceInput('first'))
  assert.equal(fence.observeTurn(voiceReplyEvent(1, 'Previous reply')), undefined)
  fence.rememberInput('second', true)
  fence.beginStep({ turn: 1, step: 2, messages: [{ id: 'second' }] })
  fence.observeTurn(startVoiceStep(2))
  fence.observeTurn(commitVoiceInput('second'))
  fence.observeTurn(voiceReplyEvent(2, 'Tool preamble', { moreContent: [{ type: 'tool-call', name: 'voice_status' }] }))
  fence.beginStep({ turn: 1, step: 3 })
  fence.observeTurn(startVoiceStep(3))
  fence.observeTurn(voiceReplyEvent(3, 'Final answer', { moreContent: [{ type: 'reasoning', text: 'Hidden reasoning' }] }))
  fence.beginStep({ turn: 1, step: 4 }) // a native proposal that never opened a step
  const missed = fence.observeTurn(finishVoiceTurn())
  assert.deepEqual(missed, { turn: 1, generation: 0 })
  assert.equal(fence.observeTurn(finishVoiceTurn()), undefined)
  assert.equal(fence.isTurnCurrent(missed), true)
  fence.cancel()
  assert.equal(fence.isTurnCurrent(missed), false)
})

test('speech reminders exclude ordinary input, cancelled turns, previous reminders and any explicit speech attempt', async () => {
  const { createVoiceSpeechFence } = await import('../voice-output.mjs')
  for (const scenario of ['keyboard', 'mixed', 'cancelled', 'masked', 'interrupted', 'failed', 'worker', 'reminder', 'explicit-batch', 'explicit-event', 'explicit-unconfirmed', 'reasoning-only', 'uncommitted-input']) {
    const fence = createVoiceSpeechFence()
    const messages = [{ id: 'input', role: 'user', source: { kind: 'whale-ear' } }]
    if (scenario === 'keyboard' || scenario === 'mixed') messages.push({ role: 'user', source: { kind: 'user' } })
    if (!['keyboard', 'worker'].includes(scenario)) fence.rememberInput('input', true)
    fence.beginStep({ turn: 1, step: 1, messages, reminder: scenario === 'reminder' })
    fence.observeTurn(startVoiceStep(1))
    if (scenario !== 'uncommitted-input') fence.observeTurn(commitVoiceInput('input'))
    if (scenario === 'cancelled') fence.cancel()
    if (scenario === 'explicit-batch') fence.enterBatch({ toolSet: {}, log: { turn: 1, step: 1 }, calls: [{ name: 'whale_voice_speak' }] })
    if (scenario === 'explicit-event') fence.observeTurn({ type: 'tool/call', data: { turn: 1, step: 1, name: 'whale_voice_speak' } })
    if (scenario === 'explicit-unconfirmed') {
      fence.observeTurn(voiceReplyEvent(1, 'Attempted speech', { moreContent: [{ type: 'tool-call', name: 'whale_voice_speak' }] }))
      fence.beginStep({ turn: 1, step: 2 })
      fence.observeTurn(startVoiceStep(2))
    }
    fence.observeTurn(voiceReplyEvent(scenario === 'explicit-unconfirmed' ? 2 : 1, scenario === 'reasoning-only' ? '' : 'Final text', {
      surfaceOp: scenario === 'masked' ? 'mask' : 'append',
      interrupted: scenario === 'interrupted',
      moreContent: [{ type: 'reasoning', text: 'Hidden reasoning' }],
    }))
    assert.equal(fence.observeTurn(finishVoiceTurn(scenario === 'failed' ? 'failed' : 'completed')), undefined, scenario)
  }
})

test('new microphone input reopens a cancelled turn without reading an older reply', async () => {
  const { createVoiceSpeechFence } = await import('../voice-output.mjs')
  const fence = createVoiceSpeechFence()
  fence.rememberInput('first', true)
  fence.beginStep({ turn: 1, step: 1, messages: [{ id: 'first' }] })
  fence.observeTurn(startVoiceStep(1))
  fence.observeTurn(commitVoiceInput('first'))
  fence.observeTurn(voiceReplyEvent(1, 'Old answer'))
  fence.cancel()
  fence.rememberInput('new', true)
  fence.beginStep({ turn: 1, step: 2, messages: [{ id: 'new' }] })
  fence.observeTurn(startVoiceStep(2))
  fence.observeTurn(commitVoiceInput('new'))
  fence.observeTurn(voiceReplyEvent(1, 'Late old answer'))
  assert.equal(fence.observeTurn(finishVoiceTurn()), undefined)
})

test('a discarded notice keeps its automatic model steps muted until genuine input is claimed', async () => {
  const { createVoiceSpeechFence } = await import('../voice-output.mjs')
  const fence = createVoiceSpeechFence(), agent = {}
  function speech(step, options) {
    const toolSet = {}
    fence.beginStep({ turn: 1, step, ...options })
    fence.enterBatch({ toolSet, agent, log: { turn: 1, step } })
    return () => fence.assertCurrent({ toolSet, agent })
  }
  assert.throws(speech(1, { reminder: true, mute: true }), { code: 'TTS_OUTPUT_SCOPE_UNVERIFIED' })
  assert.throws(speech(2), { code: 'TTS_OUTPUT_SCOPE_UNVERIFIED' })
  fence.rememberInput('microphone', true)
  assert.doesNotThrow(speech(3, { messages: [{ id: 'microphone' }] }))
})

test('helper availability uses current scoped cache and is hidden after revocation or for another root', () => {
  const owner = { session: { id: 'owner' } }, root = { session: { id: 'root' } }, other = { session: { id: 'other' } }
  const agents = new Map([['owner', owner], ['root', root], ['other', other]])
  const grant = { enabled: true, rootSessionId: 'root', ownerSessionId: 'owner', epoch: 'one' }
  let helper = { online: true, listenMode: 'always' }
  const c = createVoiceConversation({ getScope: () => grant, getAgent: id => agents.get(id), assertCaller: agent => assert.equal(agents.get(agent.session.id), agent), getHelperState: () => helper })
  const received = [], off = c.subscribe(owner, value => received.push(value))
  assert.deepEqual(received.at(-1).helper, helper)
  assert.deepEqual(c.read(other).helper, { online: false, listenMode: null })
  helper = { online: false, listenMode: 'always' }; c.setInputActive(false); c.refreshHelperState()
  assert.deepEqual(received.at(-1).helper, { online: false, listenMode: null }, 'offline cannot retain a previous listening mode')
  helper = { online: true, listenMode: 'ptt' }; c.refreshHelperState()
  assert.deepEqual(received.at(-1).helper, helper)
  grant.enabled = false; c.invalidate()
  assert.equal(received.at(-1).rootSessionId, null)
  assert.deepEqual(received.at(-1).helper, { online: false, listenMode: null }, 'a previously online child is not projected without a grant')
  off(); c.dispose()
})

test('live spoken rows share persistent tool-call identifiers and invalidate their scope generation',()=>{
 const f=setup();f.say('same record',f.root,{callId:'native-call'})
 const before=f.conversation.read(f.owner);assert.equal(before.latest.id,'tool:native-call')
 f.state.epoch='new';const after=f.conversation.read(f.owner);assert.equal(after.items.length,0);assert.ok(after.historyGeneration>before.historyGeneration);f.conversation.dispose()
})

test('live execution identity stays idempotent after the bounded caption window rolls over', () => {
  const f = setup(), first = f.say('old receipt')
  for (let i = 0; i < 40; i++) f.say(`later ${i}`)
  const before = f.conversation.read(f.owner)
  f.conversation.requestSpeech({ ...first })
  f.conversation.finishSpeech(first, { isError: false, value: 'ok' })
  assert.deepEqual(f.conversation.read(f.owner), before)
})

test('identical speech across distinct executions remains visible, including after a new input', () => {
  const f = setup()
  f.conversation.input('测试编号730，只回复收到。', f.state, 'input-730')
  const first = f.say('收到。')
  f.conversation.finishSpeech(first, { isError: false, value: 'ok' })
  f.conversation.observe(f.root.session, f.event(1, '收到。'))
  assert.equal(f.conversation.read(f.owner).items.length, 2)
  const second = f.say('收到。')
  f.conversation.finishSpeech(second, { isError: false, value: 'ok' })
  assert.equal(f.conversation.read(f.owner).items.length, 3, 'distinct execution must not be hidden by text deduplication')
  f.conversation.input('测试编号731，只回复收到。', f.state, 'input-731')
  f.say('收到。')
  assert.deepEqual(f.conversation.read(f.owner).items.map(row => row.role), ['user', 'assistant', 'assistant', 'user', 'assistant'])
})
