import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { mkdtemp, writeFile, readFile, rm, symlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { extractRuntimeArchive } from '../voice-runtime-archive.mjs'
import { createModelInstaller } from '../voice-model-installer.mjs'
import { requireFileSymlink } from './helpers/symlink.mjs'
const hash = b => createHash('sha256').update(b).digest('hex')
function tar(name, bytes, type = '0') {
  const h = Buffer.alloc(512)
  h.write(name); h.write('0000700\0',100); h.write(bytes.length.toString(8).padStart(11,'0')+'\0',124); h.fill(32,148,156); h.write(type,156); h.write('ustar\0',257)
  h.write([...h].reduce((n,b)=>n+b,0).toString(8).padStart(6,'0')+'\0 ',148)
  return Buffer.concat([h,bytes,Buffer.alloc((512-bytes.length%512)%512),Buffer.alloc(1024)])
}
function fixture(name='bin/llama-tts',type='0') {
  const data = Buffer.from('#!/bin/sh\nprintf "version: 12110\\n"\n'), archive=gzipSync(tar(name,data,type))
  const runtime={file:'runtime.tar.gz',format:'tar.gz',bytes:archive.length,sha256:hash(archive),executable:'llama-tts',entries:[{entry:name,file:'llama-tts',bytes:data.length,sha256:hash(data),executable:true}]}
  return {data,archive,runtime}
}
async function root(t) { const dir=await mkdtemp(join(tmpdir(),'whale-tts-install-'));t.after(()=>rm(dir,{recursive:true,force:true}));return dir }
test('fixed regular tar entries extract, executable permission explicit; repeat is safe',async t=>{
  const dir=await root(t),f=fixture(),path=join(dir,'a.tar.gz');await writeFile(path,f.archive)
  await extractRuntimeArchive(path,join(dir,'runtime'),f.runtime)
  await extractRuntimeArchive(path,join(dir,'runtime'),f.runtime)
  assert.deepEqual(await readFile(join(dir,'runtime','llama-tts')),f.data)
})
test('archive extraction fails closed for traversal, links, digest and size mismatches',async t=>{
  for(const kind of ['traversal','symlink','hardlink','hash','size','entryHash','entrySize']) await t.test(kind,async t=>{
    const dir=await root(t),f=fixture(kind==='traversal'?'../llama-tts':'bin/llama-tts',kind==='symlink'?'2':kind==='hardlink'?'1':'0'),path=join(dir,'a.tar.gz');await writeFile(path,f.archive)
    if(kind==='hash')f.runtime.sha256='0'.repeat(64)
    if(kind==='size')f.runtime.bytes++
    if(kind==='entryHash')f.runtime.entries[0].sha256='0'.repeat(64)
    if(kind==='entrySize')f.runtime.entries[0].bytes++
    await assert.rejects(extractRuntimeArchive(path,join(dir,'runtime'),f.runtime),{code:'INVALID_RUNTIME_ARCHIVE'})
  })
})
test('extraction refuses output symlink without touching victim',async t=>{
  const dir=await root(t),f=fixture(),path=join(dir,'a.tar.gz');await writeFile(path,f.archive)
  if(!requireFileSymlink(t,dir))return
  await extractRuntimeArchive(path,join(dir,'runtime'),f.runtime)
  await rm(join(dir,'runtime','llama-tts'));await writeFile(join(dir,'victim'),'untouched');await symlink(join(dir,'victim'),join(dir,'runtime','llama-tts'),'file')
  await assert.rejects(extractRuntimeArchive(path,join(dir,'runtime'),f.runtime),{code:'INVALID_RUNTIME_ARCHIVE'});assert.equal(await readFile(join(dir,'victim'),'utf8'),'untouched')
})
test('Qwen has concrete CPU plan with scoped runtime source and TTS purpose; no network on read',async t=>{
  const dir=await root(t),i=createModelInstaller({root:dir,fetchImpl:()=>{throw Error('unexpected network')}});t.after(()=>i.close())
  const q=i.snapshot().models.find(m=>m.id==='qwen3-tts-base-1.7b-gguf')
  if(process.arch!=='x64'||!['linux','win32'].includes(process.platform)){assert.equal(q.available,false);return}
  assert.equal(q.available,true);assert.equal(q.purpose,'tts');assert.deepEqual(q.computeOptions,['cpu','auto','vulkan'])
  const p=i.plan(q.id);assert.equal(p.files.length,3);assert(p.files.some(f=>f.url.startsWith('https://github.com/ggml-org/llama.cpp/releases/download/b12110/')));assert.equal(p.runtime.redirectHost,'release-assets.githubusercontent.com');assert.equal(p.purpose,'tts')
  await assert.rejects(i.resolveManagedLocalTts({localModelId:q.id,localModelPath:'/arbitrary'}),{code:'NOT_INSTALLED'})
  assert.throws(()=>i.plan(q.id,'cuda'),{code:'INVALID_COMPUTE'})
})
test('GitHub CDN redirects are scoped to the selected runtime file and approved origin', async t => {
  const id = 'qwen3-tts-base-1.7b-gguf'
  const release = 'https://github.com/ggml-org/llama.cpp/releases/download/b12110/'
  const cpuSource = release + 'llama-b12110-bin-ubuntu-x64.tar.gz'
  const gpuSource = release + 'llama-b12110-bin-ubuntu-vulkan-x64.tar.gz'
  const cdn = 'https://release-assets.githubusercontent.com/github-production-release-asset/123'
  const cpuCdn = cdn + '/abcd-0001?signature=fixture'
  const gpuCdn = cdn + '/abcd-0002?signature=fixture'
  const cpu = fixture()
  const gpu = fixture()
  Object.assign(cpu.runtime, { source_url: cpuSource, dependencies: [gpu.runtime] })
  Object.assign(gpu.runtime, { file: 'vulkan.tar.gz', source_url: gpuSource, backend: 'vulkan', installDir: 'backends/vulkan' })
  const files = [cpu.runtime, gpu.runtime].map(({ file, bytes, sha256, source_url }) => ({ file, bytes, sha256, source_url }))
  const qwen = { id, revision: 'a'.repeat(40), runtimePackage: cpu.runtime, files }
  const sensevoice = { id: 'sensevoice-int8-2024-07-17', revision: 'a'.repeat(40), files: [{ ...files[0], file: 'model.int8.onnx' }] }
  const urls = new Map([[cpuSource, cpuCdn], [gpuSource, gpuCdn]])
  const archives = new Map([[cpuCdn, cpu.archive], [gpuCdn, gpu.archive]])
  const execute = async (t, catalog, modelId, compute, allowUrl) => {
    const requested = []
    const installer = createModelInstaller({
      root: await root(t), catalog: { schema: 1, models: catalog }, allowUrl,
      probe: async () => ({ backends: { sensevoice: { cpu: { available: true } } } }),
      runtimeRunner: async () => ({ stdout: 'version 12110', stderr: '' }),
      fetchImpl: async (url, options) => {
        requested.push(url)
        assert.equal(options.redirect, 'manual')
        assert.equal(options.credentials, 'omit')
        if (urls.has(url)) return new Response(null, { status: 302, headers: { Location: urls.get(url) } })
        const bytes = archives.get(url)
        assert.ok(bytes)
        return new Response(bytes, { headers: { 'content-length': String(bytes.length) } })
      },
    })
    t.after(() => installer.close())
    const plan = installer.plan(modelId, compute)
    const job = installer.start({ modelId, compute, planHash: plan.planHash, accepted: true })
    return { result: await installer.settled(job.id), requested }
  }
  await t.test('Vulkan dependency and CPU fallback both use their CDN assets', async t => {
    const { result, requested } = await execute(t, [qwen], id, 'auto')
    assert.equal(result.status, 'installed', JSON.stringify(result.error))
    assert.deepEqual(requested, [cpuSource, cpuCdn, gpuSource, gpuCdn])
  })
  await t.test('matching another job runtime URL does not grant a CDN redirect', async t => {
    const { result, requested } = await execute(t, [qwen, sensevoice], sensevoice.id, 'cpu')
    assert.equal(result.error?.code, 'UNTRUSTED_SOURCE')
    assert.deepEqual(requested, [cpuSource])
  })
  await t.test('runtime manifest with a non-release source cannot grant a CDN redirect', async t => {
    const source = 'https://test.invalid/runtime'
    urls.set(source, cpuCdn)
    const runtime = { ...cpu.runtime, source_url: source, dependencies: [] }
    const model = { ...qwen, runtimePackage: runtime, files: [{ ...files[0], source_url: source }] }
    const { result, requested } = await execute(t, [model], id, 'cpu', url => url === source)
    assert.equal(result.error?.code, 'UNTRUSTED_SOURCE')
    assert.deepEqual(requested, [source])
  })
})
test('synthetic managed TTS install, resolver and readiness checks never become ASR settings', {skip: process.platform==='win32'},async t=>{
  const dir=await root(t),f=fixture(),weights=Buffer.from('synthetic gguf fixture'),id='qwen3-tts-base-1.7b-gguf'
  f.runtime.source_url='https://test.invalid/runtime'
  const main='Qwen3-TTS-12Hz-1.7B-Base-Q4_K_M.gguf',mmproj='mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf'
  const catalog={schema:1,models:[{id,revision:'a'.repeat(40),runtimePackage:f.runtime,files:[main,mmproj].map(file=>({file,bytes:weights.length,sha256:hash(weights),source_url:'https://test.invalid/model'})).concat([{file:f.runtime.file,bytes:f.archive.length,sha256:hash(f.archive),source_url:f.runtime.source_url}])}]}
  const i=createModelInstaller({root:dir,catalog,allowUrl:u=>new URL(u).hostname==='test.invalid',probe:()=>{throw Error('TTS must not need Python')},fetchImpl:async u=>{const b=u.endsWith('/runtime')?f.archive:weights;return new Response(b,{headers:{'content-length':String(b.length)}})}});t.after(()=>i.close())
  const p=i.plan(id),j=i.start({modelId:id,compute:'cpu',planHash:p.planHash,accepted:true}),done=await i.settled(j.id)
  assert.equal(done.status,'installed',JSON.stringify(done.error));assert.equal(done.runtimeLoaded,false);assert.equal(done.purpose,'tts');assert.equal(done.recommendedSettings.asr,undefined)
  assert.equal((await i.verifyInstalled(j.id)).runtimeReady,true)
  const config=done.recommendedSettings.tts,descriptor=await i.resolveManagedLocalTts(config)
  assert.equal(descriptor.model,join(done.installedPath,main));assert.equal(descriptor.engine,'llama-qwen3')
  await writeFile(join(done.installedPath,'runtime','extra.so'),'unexpected')
  await assert.rejects(i.resolveManagedLocalTts(config),{code:'UNSAFE_PATH'})
  await rm(join(done.installedPath,'runtime','extra.so'))
  // Reading an already installed descriptor never launches a runtime or downloads.
  const before = JSON.parse(await readFile(join(dir,'jobs.json'),'utf8')).jobs[0].manifestHash
  const originalArchive = join(done.installedPath,f.runtime.file)
  await writeFile(originalArchive,Buffer.alloc(f.archive.length))
  await assert.rejects(i.resolveManagedLocalTts(config),{code:'HASH_MISMATCH'})
  await rm(originalArchive)
  const cli = await i.resolveManagedLocalTts(config)
  assert.equal(cli.serverRuntime,undefined)
  assert.equal(cli.executable,descriptor.executable)
  await i.close()
  const reopened = createModelInstaller({root:dir,catalog,allowUrl:u=>new URL(u).hostname==='test.invalid',runtimeRunner:()=>{throw Error('descriptor lookup must not spawn')},fetchImpl:()=>{throw Error('descriptor lookup must not download')}})
  t.after(()=>reopened.close())
  assert.equal(reopened.snapshot().jobs[0].status,'installed')
  assert.equal((await reopened.resolveManagedLocalTts(config)).executable,descriptor.executable)
  assert.equal(JSON.parse(await readFile(join(dir,'jobs.json'),'utf8')).jobs[0].manifestHash,before)
  // Restore the original archive for explicit legacy verification below.
  await writeFile(originalArchive,f.archive)
  await writeFile(descriptor.executable,'corrupt')
  await assert.rejects(reopened.verifyInstalled(j.id),{code:'HASH_MISMATCH'})
})
function zip(name, data, mode = 0x81c0) {
  const n=Buffer.from(name),local=Buffer.alloc(30),central=Buffer.alloc(46),end=Buffer.alloc(22)
  local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt32LE(data.length,18);local.writeUInt32LE(data.length,22);local.writeUInt16LE(n.length,26)
  central.writeUInt32LE(0x02014b50);central.writeUInt16LE(0x0314,4);central.writeUInt16LE(20,6);central.writeUInt32LE(data.length,20);central.writeUInt32LE(data.length,24);central.writeUInt16LE(n.length,28);central.writeUInt32LE((mode*65536)>>>0,38)
  const offset=local.length+n.length+data.length
  end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,8);end.writeUInt16LE(1,10);end.writeUInt32LE(central.length+n.length,12);end.writeUInt32LE(offset,16)
  return Buffer.concat([local,n,data,central,n,end])
}
test('ZIP only writes manifest ordinary files and rejects symlinks, traversal and corrupt index',async t=>{
  for(const kind of ['valid','symlink','traversal','centralOffset'])await t.test(kind,async t=>{
    const dir=await root(t),f=fixture(),name=kind==='traversal'?'../llama-tts':'llama-tts',archive=zip(name,f.data,kind==='symlink'?0xa1ff:0x81c0)
    if(kind==='centralOffset')archive.writeUInt32LE(0xffffffff,archive.length-22+16)
    const runtime={...f.runtime,format:'zip',file:'runtime.zip',bytes:archive.length,sha256:hash(archive),entries:[{...f.runtime.entries[0],entry:name}]}
    const path=join(dir,'runtime.zip');await writeFile(path,archive)
    if(kind==='valid'){await extractRuntimeArchive(path,join(dir,'out'),runtime);assert.deepEqual(await readFile(join(dir,'out','llama-tts')),f.data)}
    else await assert.rejects(extractRuntimeArchive(path,join(dir,'out'),runtime),{code:'INVALID_RUNTIME_ARCHIVE'})
  })
})
test('adding a TTS catalog entry preserves existing ASR installed jobs',async t=>{
  const dir=await root(t),data=Buffer.from('legacy ASR fixture'),id='sensevoice-int8-2024-07-17'
  const model={id,revision:'a'.repeat(40),files:[{file:'model.int8.onnx',bytes:data.length,sha256:hash(data),source_url:'https://test.invalid/model'}]},catalog={schema:1,models:[model]}
  const options={root:dir,catalog,allowUrl:u=>new URL(u).hostname==='test.invalid',probe:async()=>({schema:1,backends:{sensevoice:{cpu:{available:true}}}}),fetchImpl:async()=>new Response(data,{headers:{'content-length':String(data.length)}})}
  let i=createModelInstaller(options);const p=i.plan(id),j=i.start({modelId:id,compute:'cpu',planHash:p.planHash,accepted:true});assert.equal((await i.settled(j.id)).status,'installed');await i.close()
  catalog.models.push({id:'qwen3-tts-base-1.7b-gguf',files:[]})
  i=createModelInstaller(options);t.after(()=>i.close());assert.equal(i.snapshot().jobs[0].status,'installed');assert.equal((await i.verifyInstalled(j.id)).recommendedSettings.asr,'sensevoice')
})
test('Melo plan includes complete model, both pinned runtime sources, and only explicit low-memory recommendation',async t=>{
  const {recommendModel}=await import('../voice-model-installer.mjs'),dir=await root(t),i=createModelInstaller({root:dir});t.after(()=>i.close())
  const m=i.snapshot().models.find(m=>m.id==='vits-melo-tts-zh_en-int8')
  if(process.arch!=='x64'||!['linux','win32'].includes(process.platform)){assert.equal(m.available,false);return}
  const p=i.plan(m.id);assert.equal(m.available,true);assert.equal(m.purpose,'tts');assert.equal(p.files.length,20);assert.equal(p.runtime.sources.length,2);assert.deepEqual(m.runtime,p.runtime);assert(p.files.some(f=>f.name==='dict/pos_dict/char_state_tab.utf8'))
  assert.equal(recommendModel(m.id,{totalMemoryBytes:4*1024**3,availableMemoryBytes:2*1024**3}).recommended,true)
  assert.equal(recommendModel(m.id,{totalMemoryBytes:16*1024**3,availableMemoryBytes:2*1024**3}).recommended,false)
  assert.equal(recommendModel('qwen3-tts-base-1.7b-gguf',{totalMemoryBytes:16*1024**3,availableMemoryBytes:2*1024**3}).state,'busy-memory')
})
test('Melo nested data paths and two private Node packages install; unknown package directory rejected',async t=>{
  const dir=await root(t),id='vits-melo-tts-zh_en-int8',modelData=Buffer.from('synthetic model data')
  const pkg=(name,filename,bytes)=>{const archive=gzipSync(tar('package/'+filename,bytes));return {kind:'node-package',package:name,installDir:'node_modules/'+name,file:name+'.tgz',format:'tar.gz',bytes:archive.length,sha256:hash(archive),source_url:'https://test.invalid/'+name,entries:[{entry:'package/'+filename,file:filename,bytes:bytes.length,sha256:hash(bytes)}],archive}}
  const js=pkg('sherpa-onnx-node','sherpa-onnx.js',Buffer.from('module.exports={OfflineTts:{createAsync:async()=>{}}}')),native=pkg('sherpa-onnx-linux-x64','native.bin',Buffer.from('test native placeholder'))
  const assets=new Map([[js.source_url,js.archive],[native.source_url,native.archive],['https://test.invalid/model',modelData]])
  delete js.archive;delete native.archive;js.dependencies=[native];js.entrypoint='sherpa-onnx.js'
  const files=['model.int8.onnx','dict/hmm_model.utf8'].map(file=>({file,bytes:modelData.length,sha256:hash(modelData),source_url:'https://test.invalid/model'})).concat([js,native].map(r=>({file:r.file,bytes:r.bytes,sha256:r.sha256,source_url:r.source_url})))
  const i=createModelInstaller({root:dir,catalog:{schema:1,models:[{id,revision:'a'.repeat(40),files,runtimePackage:js}]},allowUrl:u=>new URL(u).hostname==='test.invalid',fetchImpl:async url=>new Response(assets.get(url),{headers:{'content-length':String(assets.get(url).length)}})});t.after(()=>i.close())
  const p=i.plan(id),j=i.start({modelId:id,compute:'cpu',planHash:p.planHash,accepted:true}),done=await i.settled(j.id);assert.equal(done.status,'installed',JSON.stringify(done.error));const d=await i.resolveManagedLocalTts(done.recommendedSettings.tts);assert.equal(d.engine,'sherpa-melo');assert.equal(d.directory,done.installedPath);assert.match(d.modulePath,/sherpa-onnx-node[\\/]sherpa-onnx\.js$/)
  await writeFile(join(done.installedPath,'runtime','node_modules','unexpected.js'),'bad');await assert.rejects(i.verifyInstalled(j.id),{code:'UNSAFE_PATH'})
  const bad={...js,installDir:'../outside'};const archivePath=join(dir,'bad.tgz');await writeFile(archivePath,assets.get(js.source_url));await assert.rejects(extractRuntimeArchive(archivePath,join(dir,'bad'),bad),{code:'INVALID_RUNTIME_ARCHIVE'})
})
