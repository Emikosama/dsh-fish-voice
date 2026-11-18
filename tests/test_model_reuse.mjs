import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { mkdtemp, mkdir, readFile, writeFile, rm, symlink, link, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createModelInstaller } from '../voice-model-installer.mjs'
import { requireFileSymlink } from './helpers/symlink.mjs'
const hash = b => createHash('sha256').update(b).digest('hex')
const id = 'qwen3-tts-base-1.7b-gguf'
const main = 'Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf'
const q4 = 'Qwen3-TTS-12Hz-1.7B-Base-Q4_K_M.gguf'
const mmproj = 'mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf'
function tar(name, bytes) {
  const h = Buffer.alloc(512)
  h.write(name); h.write('0000700\0',100); h.write(bytes.length.toString(8).padStart(11,'0')+'\0',124); h.fill(32,148,156); h.write('0',156); h.write('ustar\0',257)
  h.write([...h].reduce((n,b)=>n+b,0).toString(8).padStart(6,'0')+'\0 ',148)
  return Buffer.concat([h,bytes,Buffer.alloc((512-bytes.length%512)%512),Buffer.alloc(1024)])
}
async function fixture(t) {
  const base=await mkdtemp(join(tmpdir(),'whale-reuse-'));t.after(()=>rm(base,{recursive:true,force:true}))
  const source=join(base,'已有模型 with spaces'),root=join(base,'managed');await mkdir(source)
  const bytes=Buffer.from('synthetic Q8 weights'), data=Buffer.from('#!/bin/sh\nprintf "version: 12110\\n"\n'), archive=gzipSync(tar('bin/llama-tts',data))
  const runtime={file:'runtime.tar.gz',source_url:'https://test.invalid/runtime',format:'tar.gz',bytes:archive.length,sha256:hash(archive),executable:'llama-tts',entries:[{entry:'bin/llama-tts',file:'llama-tts',bytes:data.length,sha256:hash(data),executable:true}]}
  const files=[main,q4,mmproj].map(file=>({file,bytes:bytes.length,sha256:hash(bytes),source_url:'https://test.invalid/'+file}));files.push({file:runtime.file,bytes:runtime.bytes,sha256:runtime.sha256,source_url:runtime.source_url})
  for(const file of [main,q4,mmproj])await writeFile(join(source,file),bytes)
  const requests=[]
  let runtimeResponse = async (archive) => new Response(archive,{headers:{'content-length':String(archive.length)}})
  const options={root,catalog:{schema:1,models:[{id,revision:'a'.repeat(40),runtimePackage:runtime,files}]},allowUrl:u=>new URL(u).hostname==='test.invalid',fetchImpl:async (url,request)=>{requests.push(url);assert.equal(url,runtime.source_url,'must never download reused model weights');return runtimeResponse(archive,request)}}
  const i=createModelInstaller(options);t.after(()=>i.close())
  return {i,options,source,root,base,bytes,archive,requests,setRuntimeResponse:fn=>runtimeResponse=fn}
}
const start=(f,variant='q8_0',source=f.source)=>{const p=f.i.plan(id,'cpu',{sourceDirectory:source,modelVariant:variant});return f.i.start({modelId:id,compute:'cpu',sourceDirectory:source,modelVariant:variant,planHash:p.planHash,accepted:true})}
test('production Q8 reuse plan preserves catalog identities and discloses only runtime download',async t=>{
  const root=await mkdtemp(join(tmpdir(),'whale-reuse-catalog-'));t.after(()=>rm(root,{recursive:true,force:true}));const i=createModelInstaller({root,fetchImpl:()=>{throw Error('unexpected network')}});t.after(()=>i.close())
  if(process.arch!=='x64'||!['linux','win32'].includes(process.platform))return
  const p=i.plan(id,'cpu',{sourceDirectory:join(tmpdir(),'existing'),modelVariant:'q8_0'}),weights=p.files.filter(f=>f.reused)
  assert.equal(weights.length,2);assert.equal(weights[0].name,main);assert.equal(weights[0].sha256,'ac7931aeb2e7aad1a6ed6602d353a5679c9d096b18ce8204ac730a8408d572e1');assert.equal(weights[1].sha256,'6fd65188839bcd6ecc91b277ad471e22a0edfada4699a0fe82f1165c18cfcce2')
  assert.equal(p.reusedBytes,1847874400+446422912);assert.equal(p.totalBytes,process.platform==='win32'?24708445:23051958);assert.match(p.notice,/12001/);assert.match(p.runtime.source,/b12110/)
  assert(!p.files.some(f=>f.name===q4));assert.equal(i.snapshot().jobs.length,0)
})
test('reuse plan binds directory and variant, rejects unsupported fields and managed sources',async t=>{
  const f=await fixture(t),p=f.i.plan(id,'cpu',{sourceDirectory:f.source,modelVariant:'q8_0'})
  assert.throws(()=>f.i.start({modelId:id,compute:'cpu',sourceDirectory:f.base,modelVariant:'q8_0',planHash:p.planHash,accepted:true}),{code:'PLAN_CHANGED'})
  assert.throws(()=>f.i.start({modelId:id,compute:'cpu',sourceDirectory:f.source,modelVariant:'q4_k_m',planHash:p.planHash,accepted:true}),{code:'PLAN_CHANGED'})
  assert.throws(()=>f.i.plan(id,'cpu',{sourceDirectory:f.source}),{code:'INVALID_REUSE_PLAN'})
  assert.throws(()=>f.i.plan(id,'cpu',{sourceDirectory:f.source,modelVariant:'bf16'}),{code:'INVALID_MODEL_VARIANT'})
  assert.throws(()=>f.i.plan(id,'cpu',{sourceDirectory:'relative',modelVariant:'q8_0'}),{code:'INVALID_SOURCE_DIRECTORY'})
  for(const source of [f.root,join(f.root,'..models')])assert.throws(()=>f.i.plan(id,'cpu',{sourceDirectory:source,modelVariant:'q8_0'}),{code:'INVALID_SOURCE_DIRECTORY'})
  assert.equal(f.requests.length,0)
})
test('missing, short or same-size wrong local files fail before runtime requests without touching originals',async t=>{
  for(const mode of ['missing','short','digest'])await t.test(mode,async t=>{
    const f=await fixture(t);if(mode==='missing')await rm(join(f.source,mmproj));else await writeFile(join(f.source,mmproj),mode==='short'?'bad':Buffer.alloc(f.bytes.length,42))
    const before=await readFile(join(f.source,main)),j=start(f),done=await f.i.settled(j.id)
    assert.equal(done.status,'failed');assert.equal(done.error.code,'LOCAL_MODEL_MISMATCH');assert.match(done.error.message,/mmproj/);assert.equal(f.requests.length,0);assert.deepEqual(await readFile(join(f.source,main)),before)
    assert.equal(done.receivedBytes,0);assert.equal(existsSync(join(f.root,'.jobs',j.id,main)),false)
  })
})
test('absent source directory is never created; cancel only removes managed staging',async t=>{
  const f=await fixture(t),source=join(f.base,'absent','child'),j=start(f,'q8_0',source),done=await f.i.settled(j.id)
  assert.equal(done.status,'failed');assert.equal(done.error.code,'SOURCE_DIRECTORY_MISSING');assert.equal(existsSync(source),false);assert.equal(f.requests.length,0)
  await f.i.cancel(j.id);assert.equal(existsSync(join(f.root,'.jobs',j.id)),false);assert.deepEqual(await readFile(join(f.source,main)),f.bytes)
})
test('external symlink files, symlink ancestors and hardlinked weights fail closed',async t=>{
  for(const kind of ['file','directory','hardlink'])await t.test(kind,async t=>{
    const f=await fixture(t);if(kind!=='hardlink'&&!requireFileSymlink(t,f.base))return
    let source=f.source
    if(kind==='file'){await rm(join(f.source,main));await symlink(join(f.source,q4),join(f.source,main),'file')}
    if(kind==='directory'){source=join(f.base,'linked');await symlink(f.source,source,process.platform==='win32'?'junction':'dir')}
    if(kind==='hardlink'){await rm(join(f.source,main));try{await link(join(f.source,q4),join(f.source,main))}catch(e){if(['EPERM','EACCES','ENOTSUP'].includes(e.code)){t.skip('hardlink unavailable');return}throw e}}
    const done=await f.i.settled(start(f,'q8_0',source).id);assert.equal(done.status,'failed');assert.equal(done.error.code,'UNSAFE_PATH');assert.equal(f.requests.length,0)
  })
})
test('pause during local validation performs no requests and leaves sources intact',async t=>{
  const f=await fixture(t);let paused
  const off=f.i.subscribe(s=>{const j=s.jobs.find(j=>j.stage==='verifying-local');if(j&&!paused)paused=f.i.pause(j.id)})
  const j=start(f),done=await f.i.settled(j.id);off();await paused
  assert.equal(done.status,'paused');assert.equal(f.requests.length,0);assert.deepEqual(await readFile(join(f.source,main)),f.bytes)
  await f.i.cancel(j.id);assert.equal(f.i.snapshot().jobs[0].status,'cancelled');assert.equal(existsSync(f.source),true)
})
test('Q8 reuse resolves original files, separates byte quota and survives restart without duplicate downloads', {skip:process.platform==='win32'},async t=>{
  const f=await fixture(t);await writeFile(join(f.source,'llama-tts'),'untrusted build 12001 must never run')
  const j=start(f),done=await f.i.settled(j.id);assert.equal(done.status,'installed',JSON.stringify(done.error));assert.equal(done.reused,true);assert.equal(done.modelVariant,'q8_0');assert.equal(done.reusedBytes,2*f.bytes.length);assert.equal(done.totalBytes,f.archive.length);assert.equal(done.receivedBytes,f.archive.length);assert.equal(done.runtimeLoaded,false)
  assert.equal(f.requests.length,1);assert.equal(existsSync(join(done.installedPath,main)),false);assert.equal(existsSync(join(done.installedPath,mmproj)),false)
  const d=await f.i.resolveManagedLocalTts(done.recommendedSettings.tts);assert.equal(d.model,join(f.source,main));assert.equal(d.mmproj,join(f.source,mmproj));assert.equal(d.executable,join(done.installedPath,'runtime','llama-tts'))
  await f.i.close();const restored=createModelInstaller(f.options);t.after(()=>restored.close());const recovered=restored.snapshot().jobs[0];assert.equal(recovered.status,'installed');assert.equal(recovered.totalBytes,f.archive.length);assert.equal(recovered.receivedBytes,f.archive.length);assert.equal(recovered.modelVariant,'q8_0')
  assert.equal((await restored.resolveManagedLocalTts(done.recommendedSettings.tts)).model,d.model);assert.equal(f.requests.length,1)
  await writeFile(d.model,Buffer.alloc(f.bytes.length,42));await assert.rejects(restored.verifyInstalled(j.id),{code:'HASH_MISMATCH'});assert.equal(f.requests.length,1)
})
test('Q4 local reuse selects Q4 without altering standard download plans', {skip:process.platform==='win32'},async t=>{
  const f=await fixture(t),before=f.i.plan(id).planHash,done=await f.i.settled(start(f,'q4_k_m').id)
  assert.equal(done.status,'installed');assert.equal((await f.i.resolveManagedLocalTts(done.recommendedSettings.tts)).model,join(f.source,q4));assert.equal(f.i.plan(id).planHash,before)
})
test('reuse download-and-use bridge verifies selected Q8 descriptor before applying existing local TTS route', {skip:process.platform==='win32'},async t=>{
  const {createVoiceUiBridge}=await import('../voice-ui-bridge.mjs'),{TTS_DEFAULTS}=await import('../voice-tts.mjs'),{readFileSync}=await import('node:fs')
  const f=await fixture(t),configPath=join(f.base,'config.json'),actor={session:{id:'owner'}},read=()=>JSON.parse(readFileSync(configPath,'utf8'))
  await writeFile(configPath,JSON.stringify({device:null,pttMouse:2,speakerVerification:{enabled:false},asr:'sensevoice',modelCompute:'cpu',tts:{...TTS_DEFAULTS,provider:'system',volume:.37},models:{sensevoiceDir:'/keep'}}))
  let probes=0
  const bridge=createVoiceUiBridge({configPath,readEffectiveConfig:read,assertCaller:a=>assert.equal(a,actor),readStatus:()=>({enabled:false,voiceControlBusy:false,ownerSessionId:null,voiceSession:{fullyStopped:true,id:null}}),sessionControl:{owner:()=>null},modelInstaller:()=>f.i,captureTtsInstallAuthorization:()=>({}),assertTtsInstallAuthorization:()=>{},async verifyInstalledTts(config){probes++;assert.equal(read().tts.provider,'system');const descriptor=await f.i.resolveManagedLocalTts(config);assert.equal(descriptor.model,join(f.source,main));return{synthesisVerified:true}}})
  const reuse={sourceDirectory:f.source,modelVariant:'q8_0'},plan=bridge.planModelInstall({modelId:id,compute:'cpu',...reuse},actor)
  const job=bridge.startModelInstall({modelId:id,compute:'cpu',...reuse,planHash:plan.planHash,accepted:true,useWhenReady:true},actor)
  assert.equal((await f.i.settled(job.id)).status,'installed')
  for(let n=0;n<200&&bridge.readModelInstaller(actor).ttsInstallIntent.status==='verifying';n++)await new Promise(r=>setTimeout(r,5))
  assert.equal(bridge.readModelInstaller(actor).ttsInstallIntent.status,'applied');assert.equal(probes,1);assert.equal(read().tts.provider,'local');assert.equal(read().tts.localModelId,id);assert.equal(read().tts.volume,.37);assert.equal(read().models.sensevoiceDir,'/keep');assert.equal(f.requests.length,1)
})
for(const operation of ['pause','cancel'])test(`${operation} during runtime transfer preserves source; resume after restart rechecks weights before network`,async t=>{
  const f=await fixture(t)
  f.setRuntimeResponse((bytes,{signal})=>new Response(new ReadableStream({start(controller){controller.enqueue(bytes.subarray(0,7));signal.addEventListener('abort',()=>controller.error(signal.reason),{once:true})}}),{headers:{'content-length':String(f.archive.length)}}))
  let stopping
  const off=f.i.subscribe(s=>{const j=s.jobs.find(j=>j.receivedBytes>0&&j.status==='running');if(j&&!stopping)stopping=f.i[operation](j.id)})
  const j=start(f);await f.i.settled(j.id);off();await stopping
  assert.equal(f.i.snapshot().jobs[0].status,operation==='pause'?'paused':'cancelled');assert.deepEqual(await readFile(join(f.source,main)),f.bytes);assert.deepEqual(await readFile(join(f.source,mmproj)),f.bytes);assert.equal(f.requests.length,1)
  if(operation==='cancel'){assert.equal(existsSync(join(f.root,'.jobs',j.id)),false);return}
  await f.i.close();await writeFile(join(f.source,main),Buffer.alloc(f.bytes.length,42))
  const restarted=createModelInstaller(f.options);t.after(()=>restarted.close());assert.equal(restarted.snapshot().jobs[0].status,'paused')
  const resumed=await restarted.settled(restarted.resume(j.id).id);assert.equal(resumed.status,'failed');assert.equal(resumed.error.code,'LOCAL_MODEL_MISMATCH');assert.equal(f.requests.length,1,'invalid source must not resume network')
})
test('missing source on installed restart does not break startup and explicit apply fails closed', {skip:process.platform==='win32'},async t=>{
  const f=await fixture(t),done=await f.i.settled(start(f).id);assert.equal(done.status,'installed');await f.i.close();await rm(f.source,{recursive:true})
  const restarted=createModelInstaller(f.options);t.after(()=>restarted.close());assert.equal(restarted.snapshot().jobs[0].status,'installed')
  await assert.rejects(restarted.verifyInstalled(done.id),{code:'SOURCE_DIRECTORY_MISSING'});assert.equal(f.requests.length,1);assert.equal(existsSync(f.source),false)
})
