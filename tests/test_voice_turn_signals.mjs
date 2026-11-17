/** Pure fake-clock regressions: no output device, model, service or network. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { createVoiceTurnSignals, isConfirmedCancellation, CANCEL_PROTOCOL, turnSignalSettings } from '../voice-turn-signals.mjs'

const tick = () => new Promise(resolve => setImmediate(resolve))
function fixture({ output = null, headphones = true, config: overrides = {}, cueAvailable = true } = {}) {
  let time = 1000, next = 0
  const timers = new Map(), plays = [], cancelled = [], states = []
  const config = { headphonesConfirmed: headphones, ...overrides }
  const cues = cueAvailable ? {
    capabilities: { acousticIsolation: 'headphones-confirmed' },
    playCue(value) { plays.push({ ...value, at: time }); return { status: 'requested' } },
    cancelCue(value) { cancelled.push(value) },
  } : null
  const signals = createVoiceTurnSignals({ getConfig: () => config, getOutput: () => output,
    getCueOutput: () => cues, onState: state => states.push(state), now: () => time,
    setTimer(fn, delay) { const id = ++next; timers.set(id, { fn, at: time + delay }); return id },
    clearTimer(id) { timers.delete(id) },
  })
  const advance = ms => {
    const end = time + ms
    for (;;) {
      const due = [...timers.entries()].filter(([, t]) => t.at <= end).sort((a,b) => a[1].at-b[1].at)[0]
      if (!due) break
      time = due[1].at; timers.delete(due[0]); due[1].fn()
    }
    time = end
  }
  const start = (id = 'turn-a', mode = 'always') => signals.inputStart({ inputTurnId: id, mode })
  const end = (fields = {}) => signals.inputEnd({ inputTurnId: 'turn-a', lastVoicedAt: 1000, endAt: time, ...fields })
  return { signals, plays, cancelled, states, advance, start, end, config, timers }
}

test('VAD end cue is 750ms from last voiced frame, not 600+750ms', () => {
  const f = fixture(); f.start(); f.advance(600); f.end()
  assert.equal(f.plays.length, 1)
  f.advance(149); assert.equal(f.plays.length, 1)
  f.advance(1); assert.equal(f.plays[1].at, 1750)
  assert.equal(f.plays[1].kind, 'end')
})

test('PTT release anchors delay regardless of older last voiced frame', () => {
  const f = fixture(); f.start('turn-a', 'ptt-mouse'); f.advance(1000)
  f.end({ releasedAt: 2000 }); f.advance(749)
  assert.equal(f.plays.length, 1)
  f.advance(1); assert.equal(f.plays[1].at, 2750)
})

test('late segment notification has zero remaining delay, never adds another 750ms', () => {
  const f = fixture(); f.start(); f.advance(1500); f.end(); f.advance(0)
  assert.equal(f.plays[1].at, 2500)
})

test('new turn, explicit cancellation, response start and dispose each cancel pending end cue', () => {
  for (const action of [f => f.start('turn-b'), f => f.signals.cancel(), f => f.signals.responseStarted('turn-a'), f => f.signals.dispose()]) {
    const f = fixture(); f.start(); f.end(); action(f)
    const count = f.plays.length; f.advance(2000); assert.equal(f.plays.length, count)
  }
})

test('stale end/response and duplicate onset never interfere with current turn', () => {
  const f = fixture(); f.start(); f.start('turn-b')
  assert.equal(f.start('turn-a'), false)
  assert.equal(f.end(), false)
  assert.equal(f.signals.responseStarted('turn-a'), false)
  assert.equal(f.signals.status().inputTurnId, 'turn-b')
  assert.equal(f.plays.length, 2)
})

test('end without a timing reference is explicit unsupported, no fabricated cue clock', () => {
  const f = fixture(); f.start()
  assert.equal(f.signals.inputEnd({inputTurnId:'turn-a'}), false)
  assert.equal(f.signals.status().cue.reason, 'input-end-timestamp-missing')
  assert.equal(f.timers.size, 0)
})

test('defaults and earphone safety: no speaker cues, visual state remains', () => {
  const f = fixture({headphones:false}); f.start(); f.end(); f.advance(750)
  assert.equal(f.plays.length, 0)
  assert.equal(f.signals.status().phase, 'processing')
  assert.equal(f.signals.status().cue.status, 'unsupported')
  const g = fixture({cueAvailable:false}); g.start()
  assert.equal(g.signals.status().cue.reason, 'cue-adapter-unavailable')
  assert.equal(turnSignalSettings().headphonesConfirmed, false)
})

test('disable/mute affects only cues and does not await output cancellation', () => {
  let calls = 0
  const f = fixture({config:{enabled:false}, output:{cancel(){calls++;return new Promise(()=>{})}}})
  assert.equal(f.start('turn-a', 'ptt'), true)
  f.end(); f.advance(750)
  assert.equal(calls, 1); assert.equal(f.plays.length, 0)
  assert.equal(f.signals.status().phase, 'processing')
  assert.equal(f.signals.status().cancellation.status, 'requested')
  f.config.enabled = true; f.config.volume = 0; f.start('b', 'ptt')
  assert.equal(f.plays.length, 0)
})

test('PTT immediately invokes legacy cancel but a return/undefined/ok is never confirmation', async () => {
  for (const answer of [undefined, true, {ok:true}, {status:'confirmed'}]) {
    const calls=[]; const f = fixture({output:{cancel(...args){calls.push(args);return answer}}})
    f.start('turn-a', 'ptt'); assert.equal(calls.length, 1); await tick()
    assert.equal(calls[0][0], 'voice-input')
    assert.equal(f.signals.status().cancellation.status, 'requested')
  }
  const f = fixture(); f.start('turn-a','ptt')
  assert.equal(f.signals.status().cancellation.status,'unsupported')
})

test('auto VAD cannot interrupt TTS by default, even with headphone confirmation', () => {
  let calls=0; const output={cancel(){calls++},capabilities:{acousticIsolation:'headphones-confirmed'}}
  const f=fixture({output}); f.start(); assert.equal(calls,0)
  f.config.experimentalAutomaticBargeIn=true; f.start('b'); assert.equal(calls,1)
  f.config.headphonesConfirmed=false; f.start('c'); assert.equal(calls,1)
})

test('only verified AEC capability plus experiment permits automatic barge-in without headphones', () => {
  let calls=0; const output={cancel(){calls++},capabilities:{acousticIsolation:'aec-verified'}}
  const f=fixture({output,headphones:false}); f.start(); assert.equal(calls,0)
  f.config.experimentalAutomaticBargeIn=true; f.start('b'); assert.equal(calls,1)
})

test('confirmed cancellation requires exact request/generation and BOTH flush/discard acknowledgements', async () => {
  const request={protocol:CANCEL_PROTOCOL,requestId:'r',generation:2}
  const ack={...request,status:'confirmed',queueFlushed:true,staleGenerationDiscarded:true}
  assert.equal(isConfirmedCancellation(ack,request),true)
  for(const changed of [{requestId:'x'},{generation:1},{queueFlushed:false},{staleGenerationDiscarded:false},{protocol:null}])
    assert.equal(isConfirmedCancellation({...ack,...changed},request),false)
  const f=fixture({output:{requestCancel:r=>({...r,status:'confirmed',queueFlushed:true,staleGenerationDiscarded:true})}})
  f.start('turn-a','ptt'); await tick()
  assert.equal(f.signals.status().cancellation.status,'confirmed')
})

test('late previous cancellation acknowledgement cannot confirm a newer input', async () => {
  const pending=[]; const f=fixture({output:{requestCancel:r=>new Promise(resolve=>pending.push({r,resolve}))}})
  f.start('a','ptt'); f.start('b','ptt')
  pending[0].resolve({...pending[0].r,status:'confirmed',queueFlushed:true,staleGenerationDiscarded:true})
  await tick(); assert.equal(f.signals.status().cancellation.status,'requested')
  assert.equal(f.signals.status().cancellation.inputTurnId,'b')
})

test('cancellation rejection remains explicitly unconfirmed', async () => {
  const f=fixture({output:{cancel(){return Promise.reject(new Error('not here'))}}})
  f.start('turn-a','ptt'); await tick()
  assert.equal(f.signals.status().cancellation.status,'requested')
  assert.equal(f.signals.status().cancellation.error,'cancellation-failed-or-unconfirmed')
})

test('helper playback acknowledgements match generation and turn; async scheduling is not played', async () => {
  const f=fixture();f.start();await tick()
  assert.equal(f.signals.status().cue.status,'requested')
  assert.equal(f.signals.reportCue({inputTurnId:'turn-a',generation:0,status:'played'}),false)
  assert.equal(f.signals.reportCue({inputTurnId:'old',generation:1,status:'played'}),false)
  assert.equal(f.signals.reportCue({inputTurnId:'turn-a',generation:1,status:'played',kind:'start'}),true)
  assert.equal(f.signals.status().cue.status,'played')
})

test('native speech-request suppression is not playback-start and ignores delayed end acknowledgement', () => {
  const f=fixture();f.start();f.end()
  assert.equal(f.signals.suppressEndCue('speech_requested'),true)
  assert.equal(f.signals.status().phase,'processing')
  assert.equal(f.signals.status().cue.reason,'speech_requested')
  assert.equal(f.signals.reportCue({inputTurnId:'turn-a',generation:1,status:'played',kind:'end'}),false)
  f.advance(1000);assert.equal(f.plays.length,1)
})

test('a late playback acknowledgement cannot undo response-start cue cancellation', () => {
  const f=fixture();f.start();f.signals.responseStarted('turn-a')
  assert.equal(f.signals.reportCue({inputTurnId:'turn-a',generation:1,status:'played',kind:'start'}),false)
})
