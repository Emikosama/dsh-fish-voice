import test from 'node:test'
import assert from 'node:assert/strict'
import { createQwenResidentSession, decodeQwenPcm, parseQwenPcmFormat } from '../voice-qwen-stream.mjs'
const type = 'audio/pcm;rate=24000;encoding=float;bits=32'
const body = chunks => new ReadableStream({ start(c) { for (const b of chunks) c.enqueue(b); c.close() } })
const pcm = Buffer.alloc(10000); for (let i = 0; i < pcm.length; i += 4) pcm.writeFloatLE(0.1, i)
function wav() { const b = Buffer.alloc(48); b.write('RIFF'); b.writeUInt32LE(40,4); b.write('WAVEfmt ',8); b.writeUInt32LE(16,16); b.writeUInt16LE(1,20); b.writeUInt16LE(1,22); b.writeUInt32LE(24000,24); b.writeUInt32LE(48000,28); b.writeUInt16LE(2,32); b.writeUInt16LE(16,34); b.write('data',36); b.writeUInt32LE(4,40); return b }
function harness(options = {}) {
 const calls = {launch:0,stop:0,writes:[],cancel:0,requests:[]}
 const session = createQwenResidentSession({
  launchVerifiedServer: async p => { calls.launch++; calls.launchArgs=p; return {port:12345,stop:async()=>{calls.stop++}} },
  startPcmPlayback: async () => ({write:async b=>calls.writes.push(Buffer.from(b)),end:async()=>{},cancel:async()=>{calls.cancel++},done:Promise.resolve()}),
  startWavPlayback: async ({wav:b}) => { calls.writes.push(b); return {done:Promise.resolve(),cancel:async()=>{calls.cancel++}} },
  fetch: async (url, init) => { calls.requests.push({url,init}); const req=JSON.parse(init.body); return new Response(req.stream?pcm:wav(),{headers:{'content-type':req.stream?type:'audio/wav'}}) },
  ...options,
 }); return {session,calls}
}
test('strict format, duplicate and malformed parameters rejected',()=>{
 assert.deepEqual(parseQwenPcmFormat(type),{encoding:'pcm_f32le',sampleRate:24000,channels:1})
 for(const invalid of ['audio/wav',type+';bits=32',type+';channels=2',type.replace('24000','1e4'),type.replace('float','int')]) assert.throws(()=>parseQwenPcmFormat(invalid))
})
test('arbitrary network boundaries produce bounded aligned exact bytes',async()=>{
 const out=[]; for await(const b of decodeQwenPcm(body([pcm.subarray(0,1),pcm.subarray(1,7),pcm.subarray(7)]),{sampleRate:24000})) { assert.equal(b.length%4,0); assert.ok(b.length<=4096); out.push(b) }
 assert.deepEqual(Buffer.concat(out),pcm)
})
test('rejects nonfinite, truncated, empty and overlong samples',async()=>{
 const nan=Buffer.alloc(4); nan.writeFloatLE(NaN)
 for(const b of [nan,Buffer.alloc(3),Buffer.alloc(0),Buffer.alloc(100)]) await assert.rejects(async()=>{for await(const x of decodeQwenPcm(body([b]),{sampleRate:24000,maxSeconds:0.0001})) {} })
})
test('default resident WAV is lazy and reuses one owned server with authenticated requests',async()=>{
 const {session,calls}=harness(); assert.equal(calls.launch,0)
 for(let i=0;i<2;i++) assert.equal((await session.speak({text:'你好'})).completion,'complete')
 assert.equal(calls.launch,1); assert.equal(calls.stop,0)
 const {url,init}=calls.requests[0]; assert.equal(url,'http://127.0.0.1:12345/tts'); assert.equal(init.redirect,'error')
 assert.match(init.headers.Authorization,/^Bearer [a-f0-9]{64}$/); assert.equal(init.headers.Authorization,'Bearer '+calls.launchArgs.apiKey)
 assert.equal(JSON.parse(init.body).stream,false)
 await session.stop(); assert.equal(calls.stop,1); await assert.rejects(session.speak({text:'x'}),{code:'TTS_SESSION_CLOSED'})
})
test('PCM remains explicit experiment with unconfirmed completion and no replay',async()=>{
 const {session,calls}=harness(); const result=await session.speak({text:'你好',mode:'experimental-pcm'})
 assert.equal(result.completion,'transport-eof-unconfirmed'); assert.equal(result.outputCommitted,true)
 assert.deepEqual(Buffer.concat(calls.writes),pcm); assert.equal(calls.requests.length,1); await session.stop()
})
test('partial playback rejection sets conservative output flag, reaps server, never retries',async()=>{
 const {session,calls}=harness({startPcmPlayback:async()=>({write:async()=>{throw Error('partial')},cancel:async()=>{},done:Promise.resolve()})})
 await assert.rejects(session.speak({text:'x',mode:'experimental-pcm'}),e=>e.outputCommitted===true&&e.retrySafe===false)
 assert.equal(calls.stop,1); assert.equal(calls.requests.length,1); await session.stop(); assert.equal(calls.stop,1)
})
test('invalid WAV never enters playback and reaps server',async()=>{
 const {session,calls}=harness({fetch:async()=>new Response(Buffer.alloc(50),{headers:{'content-type':'audio/wav'}})})
 await assert.rejects(session.speak({text:'x'}),e=>e.outputCommitted===false)
 assert.equal(calls.writes.length,0); assert.equal(calls.stop,1)
})
test('concurrent speak rejected; stop waits pending launch and reaps child without request',async()=>{
 let resolve; const gate=new Promise(r=>resolve=r); let stop=0,requests=0
 const {session}=harness({launchVerifiedServer:async()=>{await gate;return {port:1234,stop:async()=>{stop++}}},fetch:async()=>{requests++;throw Error('unexpected')}})
 const first=session.speak({text:'x'}); const rejected=assert.rejects(first)
 await assert.rejects(session.speak({text:'y'}),{code:'TTS_BUSY'})
 const stopping=session.stop(); resolve(); await rejected; await stopping
 assert.equal(stop,1); assert.equal(requests,0)
})
test('pre-aborted request does not launch',async()=>{
 const {session,calls}=harness(); const c=new AbortController(); c.abort()
 await assert.rejects(session.speak({text:'x',signal:c.signal})); assert.equal(calls.launch,0)
})
test('reader cancellation interrupts pending PCM read',async()=>{
 const c=new AbortController(); let cancelled=false
 const pending=new ReadableStream({cancel(){cancelled=true}})
 const task=(async()=>{for await(const x of decodeQwenPcm(pending,{signal:c.signal,sampleRate:24000})) {}})()
 c.abort(); await assert.rejects(task); assert.equal(cancelled,true)
})
test('uncertain stop poisons session instead of reusing a possibly alive child',async()=>{
 const {session}=harness({launchVerifiedServer:async()=>({port:1234,stop:async()=>{throw Error('no close')}}),fetch:async()=>{throw Error('disconnect')}})
 await assert.rejects(session.speak({text:'x'}),e=>e.uncertain===true)
 await assert.rejects(session.speak({text:'x'}),{code:'TTS_SESSION_CLOSED'})
})
test('invalid reference fails before launching or transmitting',async()=>{
 const {session,calls}=harness()
 await assert.rejects(session.speak({text:'x',referenceAudio:Buffer.from('not audio')}))
 assert.equal(calls.launch,0);assert.equal(calls.requests.length,0)
})
test('real HTTP transport authenticates, rejects redirects and delivers split PCM',async()=>{
 const {createServer}=await import('node:http')
 let key,posts=0,closed=0
 const http=createServer((req,res)=>{
  assert.equal(req.headers.authorization,`Bearer ${key}`)
  req.resume();req.on('end',()=>{
   posts++;res.writeHead(200,{'Content-Type':type});res.write(pcm.subarray(0,3));setImmediate(()=>res.end(pcm.subarray(3)))
  })
 })
 const writes=[]
 const session=createQwenResidentSession({
  launchVerifiedServer:async opts=>{key=opts.apiKey;await new Promise(r=>http.listen(0,'127.0.0.1',r));return {port:http.address().port,stop:async()=>{http.closeAllConnections();await new Promise(r=>http.close(r));closed++}}},
  startPcmPlayback:()=>({write:async b=>writes.push(Buffer.from(b)),end:async()=>{},done:Promise.resolve(),cancel:async()=>{}}),
 })
 try {assert.equal((await session.speak({text:'test',mode:'experimental-pcm'})).bytes,pcm.length);assert.deepEqual(Buffer.concat(writes),pcm);assert.equal(posts,1)} finally {await session.stop()}
 assert.equal(closed,1)
})
test('float WAV NaN is rejected before playback',async()=>{
 const invalid=wav();invalid.writeUInt16LE(3,20);invalid.writeUInt32LE(96000,28);invalid.writeUInt16LE(4,32);invalid.writeUInt16LE(32,34);invalid.writeFloatLE(NaN,44)
 const {session,calls}=harness({fetch:async()=>new Response(invalid,{headers:{'content-type':'audio/wav'}})})
 await assert.rejects(session.speak({text:'x'}),{code:'TTS_INVALID_AUDIO'})
 assert.equal(calls.writes.length,0)
})
