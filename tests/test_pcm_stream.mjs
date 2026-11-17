import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { startPcmPlayback } from '../voice-pcm-stream.mjs'
const format={encoding:'pcm_f32le',sampleRate:24000,channels:1}
function setup(extra={}) {
 const child=new EventEmitter();child.pid=42;child.stdout=new EventEmitter();child.stderr=new EventEmitter();child.stdin=new EventEmitter();child.writes=[];child.kills=[]
 child.stdin.write=b=>{child.writes.push(Buffer.from(b));return false};child.stdin.end=b=>child.writes.push(Buffer.from(b));child.kill=s=>{child.kills.push(s)}
 const sink=startPcmPlayback({platform:'win32',format,volume:.5,spawnProcess:()=>child,timeoutMs:5000,killGraceMs:30,...extra})
 const line=s=>child.stdout.emit('data',Buffer.from(s+'\r\n'))
 return {child,sink,line}
}
const turn=()=>new Promise(r=>setImmediate(r))
test('explicit validated header, bounded ack writes, completion waits close',async()=>{
 const {child,sink,line}=setup({outputDevice:{backend:'winmm',id:'endpoint-test'}})
 assert.equal(child.writes[0].subarray(0,4).toString(),'WPCM');assert.equal(child.writes[0].readUInt32LE(6),24000)
 line('ready');await sink.ready
 const p=sink.write(Buffer.alloc(4096));await turn();assert.equal(sink.possiblePlayback,true)
 await assert.rejects(sink.write(Buffer.alloc(4)),{code:'PCM_WRITE_CONCURRENT'})
 line('ack');await p
 const end=sink.end();let done=false;end.then(()=>done=true);line('completed');await turn();assert.equal(done,false)
 child.emit('close',0);assert.deepEqual(await end,{completed:true,possiblePlayback:true})
})
test('cancellation does not settle before close; never sends after cancellation',async()=>{
 const {child,sink,line}=setup();line('ready');const p=sink.write(Buffer.alloc(4));await turn()
 const cancel=sink.cancel();let settled=false;cancel.catch(()=>settled=true);await turn();assert.equal(settled,false)
 child.emit('close',null);await assert.rejects(cancel,{code:'PCM_ABORTED',possiblePlayback:true});await assert.rejects(p,{code:'PCM_ABORTED'})
 await assert.rejects(sink.write(Buffer.alloc(4)),{code:'PCM_STREAM_CLOSED'})
})
test('unknown termination is not claimed cancelled',async()=>{
 const {sink,child}=setup();await assert.rejects(sink.cancel(),{code:'PCM_TERMINATION_UNCONFIRMED',uncertain:true,possiblePlayback:false});assert.equal(child.kills.length,2)
})
test('validation prevents spawn and non-Windows fails closed',()=>{
 let spawned=false;assert.throws(()=>startPcmPlayback({platform:'win32',format:{...format,sampleRate:0},volume:1,spawnProcess:()=>{spawned=true}}),{code:'PCM_FORMAT_INVALID'});assert.equal(spawned,false)
 assert.throws(()=>startPcmPlayback({platform:'linux',format,volume:1}),{code:'PCM_PLATFORM_UNSUPPORTED'})
})
test('invalid float or oversized frame never submits PCM',async()=>{
 for(const bytes of [Buffer.alloc(4097),Buffer.from([0,0,128,127])]){
 const {sink,child,line}=setup();line('ready');const p=sink.write(bytes);child.emit('close',1);await assert.rejects(p,{code:'PCM_CHUNK_INVALID',possiblePlayback:false});assert.equal(child.writes.length,1)
 }
})
test('ready required; failed validation is terminal and cannot trigger replay',async()=>{
 const {sink,child,line}=setup();const p=sink.write(Buffer.alloc(4));line('failed');child.emit('close',1);await assert.rejects(p,{code:'PCM_PROTOCOL_INVALID',possiblePlayback:false});assert.equal(child.writes.length,1)
})
test('unexpected close, unsolicited ack and success without completion fail closed',async()=>{
 for(const mode of ['close','ack','missing-completed']){
 const {sink,child,line}=setup();line('ready')
 if(mode==='ack')line('ack')
 if(mode==='missing-completed'){const p=sink.write(Buffer.alloc(4));await turn();line('ack');await p;sink.end().catch(()=>{})}
 child.emit('close',0);await assert.rejects(sink.done)
 }
})
test('pending caller buffer is copied before ready',async()=>{
 const {sink,child,line}=setup();const bytes=Buffer.alloc(4);const p=sink.write(bytes);bytes.writeFloatLE(Infinity);line('ready');await turn();assert.equal(child.writes[1].readFloatLE(4),0);line('ack');await p;const end=sink.end();line('completed');child.emit('close',0);await end
})
test('frame acknowledgement may be fragmented; duration budget is enforced',async()=>{
 const {sink,child,line}=setup({format:{encoding:'pcm_s16le',sampleRate:8000,channels:1}});line('ready')
 for(let i=0;i<468;i++){const p=sink.write(Buffer.alloc(4096));await turn();child.stdout.emit('data',Buffer.from('a'));child.stdout.emit('data',Buffer.from('ck\n'));await p}
 const p=sink.write(Buffer.alloc(3072));await turn();line('ack');await p
 const overflow=sink.write(Buffer.alloc(2));child.emit('close',1);await assert.rejects(overflow,{code:'PCM_CHUNK_INVALID',possiblePlayback:true})
})
test('timeout and pipe error wait for close; native diagnostic text is never surfaced',async()=>{
 for(const mode of ['timeout','pipe']){
 const {sink,child}=setup({timeoutMs:mode==='timeout'?5:5000});child.stderr.emit('data',Buffer.from('PRIVATE_RAW_DIAGNOSTIC'))
 if(mode==='pipe')child.stdin.emit('error',new Error('PRIVATE_RAW_DIAGNOSTIC'))
 else await new Promise(r=>setTimeout(r,10))
 child.emit('close',1);await assert.rejects(sink.done,e=>e.code===(mode==='timeout'?'PCM_TIMEOUT':'PCM_PIPE_FAILED')&&!e.message.includes('PRIVATE'))
 }
})
