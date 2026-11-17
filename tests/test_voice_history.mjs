import test from 'node:test'
import assert from 'node:assert/strict'
import {readNativeVoiceHistory} from '../voice-history.mjs'
const user=(seq,kind='whale-ear')=>({seq,time:seq,type:'user/message',surfaceOp:'append',data:{id:`user-${seq}`,source:{kind},content:[{type:'text',text:`voice-${seq}`}]}})
function fixture(events){let closed=0;const requests=[];return{requests,get closed(){return closed},persistence:{async open(id,access){assert.equal(access,'read');return{header:{id},async read(offset,length){requests.push({offset,length});return{events:events.slice(offset,offset+length)}},async close(){closed++}}}}}}
test('native history backward pages cross 40 rows and remain bounded and ordered with new appends',async()=>{
 const events=Array.from({length:231},(_,i)=>user(i)),f=fixture(events)
 const request={persistence:f.persistence,rootSessionId:'root',generation:1,assertCurrent(){}}
 const first=await readNativeVoiceHistory(request);assert.equal(first.items.length,100)
 events.push(user(231))
 const second=await readNativeVoiceHistory({...request,cursor:first.nextCursor})
 const third=await readNativeVoiceHistory({...request,cursor:second.nextCursor})
 assert.deepEqual([...third.items,...second.items,...first.items].map(x=>x.text),Array.from({length:231},(_,i)=>`voice-${i}`))
 assert.equal(third.nextCursor,null);assert.equal(f.closed,3);assert.ok(f.requests.every(r=>r.length<=100))
 await assert.rejects(readNativeVoiceHistory({...request,generation:2,cursor:first.nextCursor}),/已改变/)
})
test('native history excludes ordinary/worker text and closes handle on revoked admission',async()=>{
 const f=fixture([user(0,'user'),user(1,'agent'),user(2),{seq:3,time:3,type:'assistant/message',data:{message:{content:[{type:'text',text:'private'}]}}}])
 const request={persistence:f.persistence,rootSessionId:'root',generation:1,assertCurrent(){}}
 assert.deepEqual((await readNativeVoiceHistory(request)).items.map(x=>x.text),['voice-2'])
 let calls=0
 await assert.rejects(readNativeVoiceHistory({...request,assertCurrent(){if(++calls>2)throw Error('revoked')}}),/revoked/)
 assert.equal(f.closed,2)
})
