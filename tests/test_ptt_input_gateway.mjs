/** Exercise the actual index input gate in a tiny lexical harness, without helper/audio. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createVoiceTurnSignals } from '../voice-turn-signals.mjs'
const source=readFileSync(new URL('../index.mjs',import.meta.url),'utf8')
const start=source.indexOf('  function currentInput(message) {')
const end=source.indexOf('  const transcriptReceivedAt',start)
assert.ok(start>=0 && end>start)
const makeReceiver=new Function('sameGrant','sameCapture','turnSignals','conversation','voiceSessions','existingVoice','recordOperation',`let continuousDeliveryGeneration=0,inputSequence=0,inputAttempt=null,captureFencing=true,inputGrant=null,outputStartObservation=null,conservativeCueSuppression=null;${source.slice(start,end)};return receiveInputSignal`)
function fixture() {
  const active=[], accepted=[], cacheWarmups=[], boundSpeechStops=[], records=[]
  const voiceSessions={cancelCacheWarmup(){cacheWarmups.push(true)}}
  const receive=makeReceiver(
    msg=>msg.voiceSessionId==='voice' && msg.voiceSessionEpoch==='epoch',
    msg=>msg.captureId !== 'stale-capture',
    {handleInput:msg=>{accepted.push(msg);return true}}, {setInputActive:value=>active.push(value)}, voiceSessions,
    {cancelSpeech:()=>boundSpeechStops.push(true)},event=>records.push(event))
  return {receive,active,accepted,cacheWarmups,boundSpeechStops,records}
}
test('keyboard PTT input gate accepts exact grant and rejects forged mode, stale epoch and replay',()=>{
  const f=fixture(), input={mode:'ptt-keyboard',state:'start',inputSequence:1,inputTurnId:'abcdef0123456789abcdef01',voiceSessionId:'voice',voiceSessionEpoch:'epoch'}
  for(const delta of [{mode:'keyboard'},{captureId:'stale-capture'},{voiceSessionEpoch:'old'},{voiceSessionId:'owner'},{inputTurnId:'bad'},{inputSequence:0}]) assert.equal(f.receive({...input,...delta}),false)
  assert.equal(f.cacheWarmups.length,0,'rejected input must not cancel a cache warmup')
  assert.equal(f.receive(input),true);assert.equal(f.receive(input),false)
  assert.equal(f.cacheWarmups.length,1,'one accepted input onset cancels one cache warmup')
  assert.equal(f.boundSpeechStops.length,1,'one accepted PTT onset interrupts the bound reply')
  assert.equal(f.receive({...input,state:'end'}),true)
  assert.deepEqual(f.active,[true,false]);assert.equal(f.accepted.length,2)
  assert.equal(f.records.length,2,'record only the accepted start and end')
})
test('keyboard PTT mode requests the same safe output interruption as mouse PTT',()=>{
  const requests=[]
  const signals=createVoiceTurnSignals({getConfig:()=>({enabled:false}),getOutput:()=>({cancel:reason=>{requests.push(reason)}})})
  assert.equal(signals.inputStart({inputTurnId:'keyboard-turn',mode:'ptt-keyboard'}),true)
  assert.deepEqual(requests,['voice-input'])
  assert.equal(signals.status().cancellation.status,'requested')
  signals.dispose()
})

test('processing-input cancellation clears cue and UI activity without cancelling a newer turn',()=>{
  const active=[],timers=new Set(),cueCancellations=[],voiceSessions={cancelCacheWarmup(){}}
  const signals=createVoiceTurnSignals({
    getConfig:()=>({enabled:false}),now:()=>1000,
    setTimer:callback=>{timers.add(callback);return callback},clearTimer:callback=>timers.delete(callback),
    getCueOutput:()=>({cancelCue:request=>cueCancellations.push(request)}),
  })
  const receive=makeReceiver(
    msg=>msg.voiceSessionId==='voice'&&msg.voiceSessionEpoch==='epoch',()=>true,signals,{setInputActive:value=>active.push(value)},voiceSessions,{cancelSpeech(){}},()=>{})
  const old={mode:'ptt-keyboard',state:'start',inputSequence:1,inputTurnId:'abcdef0123456789abcdef01',voiceSessionId:'voice',voiceSessionEpoch:'epoch'}
  assert.equal(receive(old),true)
  assert.equal(receive({...old,state:'end',lastVoicedAt:1000,releasedAt:1100}),true)
  assert.equal(signals.status().phase,'processing');assert.equal(timers.size,1)
  assert.equal(receive({...old,state:'cancel',reason:'escape'}),true)
  assert.equal(signals.status().phase,'idle');assert.equal(timers.size,0)
  assert.deepEqual(active,[true,false,false])
  const newer={...old,inputSequence:2,inputTurnId:'abcdef0123456789abcdef02'}
  assert.equal(receive(newer),true)
  const count=cueCancellations.length
  assert.equal(receive({...old,state:'cancel',reason:'focus-changed'}),false)
  assert.equal(cueCancellations.length,count)
  assert.equal(signals.status().phase,'listening')
  assert.equal(signals.status().inputTurnId,newer.inputTurnId)
  assert.equal(active.at(-1),true)
  signals.dispose()
})
