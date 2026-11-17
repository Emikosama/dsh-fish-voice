import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { requestQwenLoopback } from '../voice-qwen-loopback.mjs'
const opts={method:'POST',headers:{Authorization:'Bearer test','Content-Type':'application/json'},body:'{}',redirect:'error'}
async function listen(handler){const server=createServer(handler);await new Promise(r=>server.listen(0,'127.0.0.1',r));return {server,url:`http://127.0.0.1:${server.address().port}/tts`,close:async()=>{server.closeAllConnections();await new Promise(r=>server.close(r))}}}
test('rejects nonliteral loopback, credentials, paths and redirects',async()=>{
 for(const url of ['http://localhost:123/tts','https://127.0.0.1:123/tts','http://127.0.0.1:123/tts?q=1','http://a@127.0.0.1:123/tts'])await assert.rejects(requestQwenLoopback(url,opts))
 let followed=false;const s=await listen((req,res)=>{if(req.url!='/tts')followed=true;res.writeHead(302,{Location:'/follow'});res.end()})
 try{await assert.rejects(requestQwenLoopback(s.url,opts),{code:'TTS_INVALID_RESPONSE'});assert.equal(followed,false)}finally{await s.close()}
})
test('body cancel closes direct socket',async()=>{
 let closed;const done=new Promise(r=>closed=r)
 const s=await listen((req,res)=>{res.on('close',closed);res.writeHead(200,{'Content-Type':'audio/pcm'});res.write('abcd')})
 try{const r=await requestQwenLoopback(s.url,opts);await r.body.cancel();await done}finally{await s.close()}
})
test('abort while response is pending rejects and closes socket',async()=>{
 let arrived;const got=new Promise(r=>arrived=r)
 const s=await listen(req=>arrived())
 try{const c=new AbortController();const pending=requestQwenLoopback(s.url,{...opts,signal:c.signal});await got;c.abort();await assert.rejects(pending,{name:'AbortError'})}finally{await s.close()}
})
test('Node env proxy mode still uses direct request and never reaches proxy',async()=>{
 let proxyRequests=0,directRequests=0
 const proxy=await listen((req,res)=>{proxyRequests++;res.end('proxy')})
 const target=await listen((req,res)=>{directRequests++;assert.equal(req.headers.authorization,'Bearer test');res.end('direct')})
 try{
  const code=`import {requestQwenLoopback} from ${JSON.stringify(new URL('../voice-qwen-loopback.mjs',import.meta.url).href)};globalThis.fetch=()=>{throw Error('must not use fetch')};const r=await requestQwenLoopback(${JSON.stringify(target.url)},${JSON.stringify(opts)});process.stdout.write(await r.text());`
  const env={...process.env,NODE_USE_ENV_PROXY:'1',HTTP_PROXY:new URL(proxy.url).origin,HTTPS_PROXY:new URL(proxy.url).origin,http_proxy:new URL(proxy.url).origin,https_proxy:new URL(proxy.url).origin,NO_PROXY:'',no_proxy:''}
  const child=spawn(process.execPath,['--input-type=module','-e',code],{env,stdio:['ignore','pipe','pipe']});let output='',err='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>err+=b)
  assert.equal(await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',resolve)}),0,err);assert.equal(output,'direct');assert.equal(directRequests,1);assert.equal(proxyRequests,0)
 }finally{await proxy.close();await target.close()}
})
test('abort after headers rejects body reader and closes connection',async()=>{
 const s=await listen((req,res)=>{res.writeHead(200);res.write('abcd')})
 try{const c=new AbortController();const response=await requestQwenLoopback(s.url,{...opts,signal:c.signal});const reader=response.body.getReader();await reader.read();const next=reader.read();c.abort();await assert.rejects(next);reader.releaseLock()}finally{await s.close()}
})
