import test from 'node:test'
import assert from 'node:assert/strict'
import {nextListenMode,modeLabel,wakeLabel,validWake,parseWakeAliases,validWakeAliases} from '../src/listen-modes.mjs'
import {decodeReply} from '../src/protocol.mjs'
test('three explicit modes cycle without making open microphone depend on wake',()=>{assert.equal(nextListenMode('ptt'),'always');assert.equal(nextListenMode('always'),'wake');assert.equal(nextListenMode('wake'),'ptt');assert.equal(modeLabel('wake'),'wakeMode')})
test('wake state distinguishes selected-off, waiting, listening and uncertain device',()=>{for(const state of ['disabled','starting','waiting','listening','paused','error']){const w={state,deadlineAt:state==='listening'?1800000000000:null,streamOpen:state==='waiting'||state==='listening',detection:'asr-after-utterance'};assert.equal(validWake(w),true);assert.notEqual(wakeLabel(w),'unknown')}for(const bad of [null,{state:'listening',deadlineAt:NaN,streamOpen:true,detection:'asr-after-utterance'},{state:'waiting',deadlineAt:null,streamOpen:'yes',detection:'asr-after-utterance'},{state:'waiting',deadlineAt:null,streamOpen:true,detection:'instant-kws'}])assert.equal(validWake(bad),false)})
test('wake aliases remain narrow editable names, not arbitrary configuration',()=>{assert.deepEqual(parseWakeAliases('小鲸鱼，鲸语, 小鲸鱼'),['小鲸鱼','鲸语']);assert.equal(validWakeAliases(['小鲸鱼','鲸语']),true);for(const v of [[],['一'],['x'.repeat(25)],['小鲸鱼','小鲸鱼'],['小鲸\n鱼'],Array.from({length:9},(_,i)=>'鲸鱼'+i)])assert.equal(validWakeAliases(v),false)})
test('conversation stream validates actual wake metadata before showing state',()=>{const v={revision:1,rootSessionId:'r',title:null,latest:null,items:[],inputActive:false,playbackConfirmed:false,wake:{state:'waiting',deadlineAt:null,streamOpen:true,detection:'asr-after-utterance'}};assert.equal(decodeReply('conversation',v),v);assert.throws(()=>decodeReply('conversation',{...v,wake:{...v.wake,state:'guessed'}}))})

test('selected wake mode does not imply a live microphone',()=>{assert.equal(wakeLabel({state:'waiting',streamOpen:false}),'unknown');assert.equal(wakeLabel({state:'disabled',streamOpen:false}),'wakeDisabled')})

test('stopped status accepts no wake stream without claiming readiness',()=>{const status={ownerSessionId:null,enabled:false,helper:{online:false},listenMode:'wake',wake:null};assert.equal(decodeReply('status',status),status);assert.equal(validWakeAliases(['hello','HELLO']),false);assert.equal(validWakeAliases(['!!!']),false)})

test('recovery readback never accepts an active old root as fully stopped',()=>{
 const status={ownerSessionId:null,enabled:false,helper:{online:false},voiceSession:{fullyStopped:false,recovery:{kind:'live-root-conflict',rootSessionId:'old-root'}}}
 assert.equal(decodeReply('status',status),status)
 assert.throws(()=>decodeReply('status',{...status,voiceSession:{...status.voiceSession,fullyStopped:true}}))
 assert.throws(()=>decodeReply('status',{...status,voiceSession:{...status.voiceSession,recovery:{kind:'claimed',rootSessionId:'old-root'}}}))
})
