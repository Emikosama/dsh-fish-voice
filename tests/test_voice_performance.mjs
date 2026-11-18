import test from 'node:test'
import assert from 'node:assert/strict'
import {performancePreference,chooseVoiceEffort,inspectPerformanceModes,mergeVoiceSessionConfig,ttsResidencyCapability} from '../voice-performance.mjs'
test('canonical modes validate conflicts and preserve absent legacy source',()=>{
 assert.deepEqual(performancePreference({}),{performanceMode:null,policy:'legacy_compatible',reasoningEffort:'off',preferenceSource:'default'})
 for(const raw of [{performanceMode:'fast',reasoningEffort:'low'},{performanceMode:'high',reasoningEffort:'off'},{performanceMode:null},{performanceMode:['fast']},{performanceMode:'constructor'}])assert.throws(()=>performancePreference(raw))
 assert.equal(performancePreference({performanceMode:'balanced',reasoningEffort:'low'}).reasoningEffort,'low')
})
test('strict modes never inherit advertised default; legacy makes fallback visible',()=>{
 for(const info of [{},{reasoning:{efforts:[{id:'high'}],defaultEffort:'high'}}]){
  assert.throws(()=>chooseVoiceEffort(info,{performanceMode:'fast'}),{code:'VOICE_EXACT_EFFORT_HOST_REQUIRED'})
  const legacy=chooseVoiceEffort(info,{reasoningEffort:'off'})
  assert.equal(legacy.requestedAdvertised,false);assert.notEqual(legacy.selectedEffort,'off')
  assert.equal(inspectPerformanceModes(info).providerEnforcement,'not_verified')
 }
})

test('explicit follow model preserves an advertised source selection and otherwise delegates to the host default',()=>{
 const info={reasoning:{efforts:[{id:'off'},{id:'high'}],defaultEffort:'off'}}
 const follow={performanceMode:'compatibility'}
 assert.equal(performancePreference(follow).reasoningEffort,null)
 assert.equal(chooseVoiceEffort(info,follow,null,{sourceEffort:'high'}).selectedEffort,'high')
 assert.equal(chooseVoiceEffort(info,follow,null,{sourceEffort:'unknown'}).selectedEffort,undefined)
 assert.equal(chooseVoiceEffort(info,follow).selectedEffort,undefined)
 assert.equal(chooseVoiceEffort(info,{reasoningEffort:'off'}).selectedEffort,'off')
})

test('higher-precedence canonical preference replaces legacy alias without hiding same-source conflicts',()=>{
 const merged=mergeVoiceSessionConfig({provider:'keep',reasoningEffort:'low'},{performanceMode:'high'})
 assert.equal(merged.reasoningEffort,undefined);assert.equal(merged.provider,'keep');assert.equal(performancePreference(merged).reasoningEffort,'high')
 assert.equal(performancePreference(mergeVoiceSessionConfig({performanceMode:'high'},{reasoningEffort:'off'})).policy,'legacy_compatible')
 assert.throws(()=>performancePreference(mergeVoiceSessionConfig({}, {performanceMode:'high',reasoningEffort:'off'})),/Conflicting/)
})


test('nullish legacy effort preserves old default behavior and never conflicts with canonical mode',()=>{
 for(const reasoningEffort of [null,undefined]){
  const raw={reasoningEffort}
  assert.deepEqual(performancePreference(raw),performancePreference({}))
  assert.equal(chooseVoiceEffort({},raw).selectionReason,'provider_default_unverified')
  assert.equal(performancePreference({performanceMode:'balanced',reasoningEffort}).reasoningEffort,'low')
  const merged=mergeVoiceSessionConfig({performanceMode:'high'},raw)
  assert.equal(performancePreference(merged).policy,'legacy_compatible')
  assert.equal(performancePreference(merged).reasoningEffort,'off')
 }
})


test('residency projection is passive, fixed-shape and uses only owned runtime evidence', () => {
 const cases = [
  [undefined, false, 'unverified'], [null, false, 'unverified'], [[], false, 'unverified'],
  [{supported:false,modelResident:true}, false, 'unverified'],
  [{supported:'true',modelResident:true}, false, 'unverified'],
  [{supported:true,modelResident:'true'}, false, 'unverified'],
  [{supported:true}, false, 'unverified'],
  [{supported:true,modelResident:false}, true, 'not-resident'],
  [{supported:true,modelResident:true}, true, 'resident'],
  [{supported:true,modelResident:true,blocked:true}, true, 'blocked'],
  [{supported:false,modelResident:false,blocked:true}, false, 'blocked'],
  [{supported:true,modelResident:false,blocked:false,status:'resident'}, true, 'not-resident'],
 ]
 for (const [state,supported,status] of cases) {
  const privateState=state && !Array.isArray(state) ? {...state,reason:'PRIVATE_PATH',compute:{path:'PRIVATE_PATH'},log:'PRIVATE_LOG'} : state
  let reads=0
  const result=ttsResidencyCapability(()=>{reads++;return privateState})
  assert.equal(reads,1);assert.deepEqual(Object.keys(result).sort(),['reason','status','supported'])
  assert.equal(result.supported,supported);assert.equal(result.status,status)
  assert.doesNotMatch(JSON.stringify(result),/PRIVATE/)
  assert.deepEqual(ttsResidencyCapability(result),result,'UI re-projection keeps the same safe shape')
 }
 assert.deepEqual(ttsResidencyCapability(()=>{throw Error('PRIVATE_PATH')}),ttsResidencyCapability())
})
