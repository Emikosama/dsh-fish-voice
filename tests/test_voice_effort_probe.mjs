import test from 'node:test'
import assert from 'node:assert/strict'
import { createEffortProbe } from '../voice-effort-probe.mjs'
import { chooseVoiceEffort, inspectPerformanceModes } from '../voice-performance.mjs'
const cap = revision => ({ version: 1, revision, protocol: 'deepseek-messages-v1', budget: 'total-output-including-reasoning', efforts: ['off','low','high'] })
const route = { provider: 'p', model: 'm' }
function host(outcomes = {}) {
 const llm = { calls: [], revision: 'r1', async inspectExactEffort() { return cap(this.revision) }, async prepareCall(config, signal) {
  const exactEffort = cap(this.revision)
  return { config, exactEffort, stream: async function* (options) {
   llm.calls.push(options)
   if (outcomes[config.reasoningEffort] === 'throw') throw Object.assign(new Error('auth'), { code: 'AUTH' })
   const code = outcomes[config.reasoningEffort]
   yield { type: 'finish', reason: code ? { kind: 'error', failure: { code } } : { kind: 'stop' } }
  } }
 } }
 return llm
}
test('probe uses exactly three bounded fixed-text requests, preserves explicit off and no private context', async () => {
 const llm = host(), probe = createEffortProbe({ getLlm: () => llm })
 const result = await probe.inspect(route)
 assert.equal(result.status,'checked'); assert.equal(llm.calls.length,3)
 assert.deepEqual(llm.calls.map(c => c.reasoningEffort),['off','low','high'])
 for (const request of llm.calls) {
  assert.equal(request.maxTokens,16); assert.deepEqual(request.tools,[])
  assert.equal(request.messages.length,1); assert.equal(request.messages[0].content[0].text,'Reply OK.')
  assert.equal(request.system,undefined); assert.equal(request.sessionId,undefined)
 }
 assert.equal((await probe.inspect(route)).cached,true); assert.equal(llm.calls.length,3)
 probe.dispose()
})
test('provider rejection, transient failure and local admission failure are distinguished', async () => {
 const llm=host({off:'PROVIDER_UNSUPPORTED_REASONING_EFFORT',low:'RATE_LIMIT',high:'UNSUPPORTED_REASONING_EFFORT'})
 const probe=createEffortProbe({getLlm:()=>llm}), result=await probe.inspect(route)
 assert.equal(result.results.off.status,'unsupported'); assert.equal(result.results.low.status,'unknown'); assert.equal(result.results.high.reason,'host_contract_blocked')
 const modes=inspectPerformanceModes({}, {}, result).modes
 assert.deepEqual(modes.map(m=>m.available),[false,true,false])
 assert.deepEqual(modes.map(m=>m.reason),['provider_unsupported','unknown','host_contract_blocked'])
 assert.throws(()=>chooseVoiceEffort({}, {performanceMode:'fast'},result),{code:'VOICE_UNSUPPORTED_REASONING_EFFORT'})
 probe.dispose()
})
test('catalog miss requires the exact-effort capability and fast never inherits high',()=>{
 const info={reasoning:{efforts:[{id:'high'}],defaultEffort:'high'}}
 assert.throws(()=>chooseVoiceEffort(info,{performanceMode:'fast'}),{code:'VOICE_EXACT_EFFORT_HOST_REQUIRED'})
 assert.equal(inspectPerformanceModes(info).modes[0].reason,'host_contract_blocked')
})
test('old host exposes only its supported advertised thinking levels without model I/O',async()=>{
 const probe=createEffortProbe({getLlm:()=>({})})
 const result=await probe.inspect(route)
 assert.equal(result.status,'host_contract_blocked')
 const info={reasoning:{efforts:[{id:'off'},{id:'high'}]}}
 assert.deepEqual(inspectPerformanceModes(info, {}, result).modes.map(mode=>mode.available),[false,false,true])
 probe.dispose()
})
test('configuration revision invalidates cache and fresh load refreshes after short cooldown',async()=>{
 const llm=host();let time=0
 const p=createEffortProbe({getLlm:()=>llm,now:()=>time})
 await p.inspect(route);llm.revision='r2';await p.inspect(route);assert.equal(llm.calls.length,6)
 p.dispose();time=16000
 const next=createEffortProbe({getLlm:()=>llm,now:()=>time});await next.inspect(route);assert.equal(llm.calls.length,9);next.dispose()
})
test('auth errors never become unsupported and retry only after explicit call and cooldown',async()=>{
 const llm=host({off:'throw',low:'AUTH',high:'SERVER'});let time=0
 const p=createEffortProbe({getLlm:()=>llm,now:()=>time})
 assert.equal((await p.inspect(route)).status,'unknown');time=100;await p.inspect(route);assert.equal(llm.calls.length,3)
 time=16000;await p.inspect(route);assert.equal(llm.calls.length,6);p.dispose()
})
test('single-flight deduplicates concurrent inspections',async()=>{
 const llm=host(),p=createEffortProbe({getLlm:()=>llm})
 await Promise.all([p.inspect(route),p.inspect(route),p.inspect(route)])
 assert.equal(llm.calls.length,3);p.dispose()
})
test('timeout never starts another request while an uncooperative transport is alive',async()=>{
 const llm=host();let release
 llm.prepareCall=async config=>({config,exactEffort:cap('r1'),stream:async function*(){llm.calls.push(config);await new Promise(r=>release=r);yield {type:'finish',reason:{kind:'stop'}}}})
 const p=createEffortProbe({getLlm:()=>llm,timeoutMs:10})
 assert.equal((await p.inspect(route)).status,'unknown');assert.equal(llm.calls.length,1)
 release();p.dispose()
})
test('revision changes during response cannot publish stale capability evidence',async()=>{
 const llm=host();let calls=0
 const read=llm.inspectExactEffort.bind(llm)
 llm.inspectExactEffort=async()=>{if(++calls>1)llm.revision='new';return read()}
 const p=createEffortProbe({getLlm:()=>llm})
 await assert.rejects(p.inspect(route),/configuration changed/);assert.equal(p.status(),null);p.dispose()
})
test('owner-derived route switch aborts previous probe and does not retain its result',async()=>{
 const llm=host();let release
 const original=llm.prepareCall.bind(llm)
 llm.prepareCall=async(config,signal)=>{
  if(config.model!=='m')return original(config,signal)
  return {config,exactEffort:cap('r1'),stream:async function*(){await new Promise(r=>release=r);yield {type:'finish',reason:{kind:'stop'}}}}
 }
 const p=createEffortProbe({getLlm:()=>llm,timeoutMs:50})
 const old=p.inspect(route);await new Promise(r=>setTimeout(r,2))
 await p.inspect({...route,model:'new'});release();await assert.rejects(old)
 assert.equal(p.status(),null);p.dispose()
})
test('prepared config or revision mismatch blocks dispatch, never maps to provider unsupported',async()=>{
 const llm=host();let dispatched=0
 llm.prepareCall=async config=>({config:{...config,reasoningEffort:'low'},exactEffort:cap('different'),stream:async function*(){dispatched++;yield {type:'finish',reason:{kind:'stop'}}}})
 const p=createEffortProbe({getLlm:()=>llm}),result=await p.inspect(route)
 assert.equal(dispatched,0);assert.ok(Object.values(result.results).every(r=>r.status==='unknown'&&r.reason==='host_contract_blocked'));p.dispose()
})
test('explicit host deployment restrictions do not look like service rejection',async()=>{
 const llm=host();llm.inspectExactEffort=async()=>({...cap('r1'),efforts:['off']})
 const p=createEffortProbe({getLlm:()=>llm}),result=await p.inspect(route)
 assert.equal(llm.calls.length,1);assert.equal(result.results.low.reason,'host_contract_blocked');assert.equal(result.results.low.status,'unknown');p.dispose()
})
test('cancelled same-route single-flight returns fresh unknown to a live successor without another request',async()=>{
 const llm=host();const normalPrepare=llm.prepareCall.bind(llm);let release,started
 const ready=new Promise(r=>started=r)
 llm.prepareCall=async config=>({config,exactEffort:cap('r1'),stream:async function*(){llm.calls.push(config);started();await new Promise(r=>release=r);yield {type:'finish',reason:{kind:'stop'}}}})
 const p=createEffortProbe({getLlm:()=>llm}),owner=new AbortController()
 const original=p.inspect(route,owner.signal);const cancelled=assert.rejects(original)
 await ready
 // Join before cancellation, as well as after the old promise has rejected.
 const joined=p.inspect(route)
 owner.abort(new Error('UI probe cancelled for enable'))
 await cancelled
 const result=await p.inspect(route)
 assert.equal(result.status,'unknown');assert.equal(result.revision,'r1')
 assert.ok(Object.values(result.results).every(r=>r.status==='unknown'))
 assert.equal((await joined).status,'unknown')
 assert.equal(llm.calls.length,1,'no duplicate billed probe while old transport is alive')
 assert.equal(result.checkedAt,null,'cancellation is not provider evidence')
 const inspect=llm.inspectExactEffort.bind(llm)
 llm.inspectExactEffort=async()=>({...cap('r2'),efforts:['high']})
 const changed=await p.inspect(route)
 assert.equal(changed.revision,'r2');assert.equal(changed.results.off.reason,'host_contract_blocked')
 assert.equal(llm.calls.length,1,'a new revision also cannot overlap the draining request')
 llm.inspectExactEffort=inspect;llm.prepareCall=normalPrepare
 release();await new Promise(r=>setImmediate(r))
 assert.equal((await p.inspect(route)).status,'checked','explicit retry works after old transport settles')
 assert.equal(llm.calls.length,4);p.dispose()
})

test('late preparation cannot dispatch after caller cancellation, unload, route change or timeout', async t => {
 for (const reason of ['caller cancellation', 'unload', 'route change', 'timeout']) {
  await t.test(reason, async () => {
   const llm = host(), normalPrepare = llm.prepareCall.bind(llm)
   let release, started, preparations = 0
   const ready = new Promise(resolve => { started = resolve })
   const prepared = new Promise(resolve => { release = resolve })
   // Preparation may ignore its signal while loading an adapter or credentials.
   // Count stream invocation itself, not only a cooperative stream's first yield.
   llm.prepareCall = async config => {
    preparations++; started(); await prepared
    return { config, exactEffort: cap('r1'), stream() {
     llm.calls.push(config)
     return (async function* () { yield { type: 'finish', reason: { kind: 'stop' } } })()
    } }
   }
   const probe = createEffortProbe({ getLlm: () => llm, timeoutMs: reason === 'timeout' ? 10 : 5000 })
   const owner = new AbortController()
   const pending = probe.inspect(route, owner.signal)
   const settled = reason === 'timeout' ? pending : assert.rejects(pending)
   try {
    await ready
    if (reason === 'caller cancellation') owner.abort(new Error('Owner cancelled'))
    if (reason === 'unload') probe.dispose()
    if (reason === 'route change') assert.equal((await probe.inspect({ ...route, model: 'new' })).status, 'unknown')
    const result = await settled
    if (reason === 'timeout') assert.equal(result.status, 'unknown')
    assert.equal(llm.calls.length, 0)
    const blockedSuccessor = createEffortProbe({ getLlm: () => llm, now: () => Date.now() + 16000 })
    try {
     assert.equal((await blockedSuccessor.inspect(route)).status, 'unknown')
     assert.equal(preparations, 1, 'the draining preparation still owns the shared slot')
    } finally { blockedSuccessor.dispose() }
    release(); await new Promise(resolve => setImmediate(resolve))
    assert.equal(llm.calls.length, 0, 'a cancelled preparation must never invoke the billable stream')
    // Cancellation frees its single-flight slot only after preparation drains.
    // A separate live instance can then perform a normal explicit retry.
    llm.prepareCall = normalPrepare
    const successor = createEffortProbe({ getLlm: () => llm, now: () => Date.now() + 16000 })
    try { assert.equal((await successor.inspect(route)).status, 'checked'); assert.equal(llm.calls.length, 3) }
    finally { successor.dispose() }
   } finally { release(); probe.dispose() }
  })
 }
})
