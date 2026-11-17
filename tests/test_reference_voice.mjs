import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, readFile, rm, mkdir, symlink, truncate, access, utimes, realpath } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { readLocalReferenceAudio, createManagedLocalTtsAdapter, REFERENCE_AUDIO_MAX_BYTES } from '../voice-tts-local.mjs'
import { ttsSettings, TTS_DEFAULTS } from '../voice-tts.mjs'
function wav({ channels=1, bits=16, encoding=1, seconds=.01, rate=24000 }={}) {
  const block=channels*bits/8, size=Math.ceil(rate*seconds)*block, b=Buffer.alloc(44+size+(size%2))
  b.write('RIFF'); b.writeUInt32LE(b.length-8,4); b.write('WAVEfmt ',8); b.writeUInt32LE(16,16); b.writeUInt16LE(encoding,20); b.writeUInt16LE(channels,22); b.writeUInt32LE(rate,24); b.writeUInt32LE(rate*block,28); b.writeUInt16LE(block,32); b.writeUInt16LE(bits,34); b.write('data',36); b.writeUInt32LE(size,40); return b
}
async function fixture(t) {
  const root=await realpath(await mkdtemp(join(tmpdir(),'whale-reference-test-')))
  t.after(()=>rm(root,{recursive:true,force:true}))
  const path=join(root,'selected.wav'); await writeFile(path,wav())
  for(const name of ['llama-tts','model.gguf','tokenizer.gguf'])await writeFile(join(root,name),'stub')
  const descriptor={engine:'llama-qwen3',modelId:'qwen',executable:join(root,'llama-tts'),model:join(root,'model.gguf'),mmproj:join(root,'tokenizer.gguf')}
  const config={...TTS_DEFAULTS,provider:'local',localModelId:'qwen',referenceAudioPath:path,referenceAudioAccepted:true}
  return {root,path,descriptor,config}
}
test('reference settings retain legacy flags without requiring per-file consent; no IO on settings reads',()=>{
  assert.equal(ttsSettings({provider:'off'}).referenceAudioPath,null)
  assert.equal(ttsSettings({provider:'off'}).referenceAudioAccepted,false)
  assert.equal(ttsSettings({referenceAudioPath:'/selected.wav'}).referenceAudioPath,'/selected.wav')
  assert.equal(ttsSettings({referenceAudioPath:'/selected.wav'}).referenceAudioAccepted,false)
  assert.throws(()=>ttsSettings({referenceAudioPath:'relative.wav',referenceAudioAccepted:true}),{code:'TTS_INVALID_SETTINGS'})
  assert.equal(ttsSettings({referenceAudioPath:'/not-read.wav',referenceAudioAccepted:true}).referenceAudioPath,'/not-read.wav')
})
test('ordinary mono/stereo PCM and float WAV reference formats are accepted unchanged',async t=>{
  const f=await fixture(t)
  for(const channels of [1,2])for(const [encoding,bits] of [[1,8],[1,16],[1,24],[1,32],[3,32],[3,64]]){
    const bytes=wav({channels,encoding,bits});await writeFile(f.path,bytes)
    assert.deepEqual((await readLocalReferenceAudio(f.path)).bytes,bytes)
  }
})
test('missing, malformed, oversized, too long, unnormalized and nonfinite reference audio fails closed',async t=>{
  const f=await fixture(t)
  for(const path of [join(f.root,'missing.wav'),f.root,join(f.root,'a')+'/../selected.wav'])await assert.rejects(readLocalReferenceAudio(path),{code:'TTS_REFERENCE_AUDIO_INVALID'})
  for(const bytes of [Buffer.from('not audio'),wav({seconds:30.001}),wav({channels:3})]){
    await writeFile(f.path,bytes);await assert.rejects(readLocalReferenceAudio(f.path),{code:'TTS_REFERENCE_AUDIO_INVALID'})
  }
  const bytes=wav({encoding:3,bits:32});bytes.writeFloatLE(NaN,44);await writeFile(f.path,bytes)
  await assert.rejects(readLocalReferenceAudio(f.path),{code:'TTS_REFERENCE_AUDIO_INVALID'})
  await truncate(f.path,REFERENCE_AUDIO_MAX_BYTES+1);await assert.rejects(readLocalReferenceAudio(f.path),{code:'TTS_REFERENCE_AUDIO_INVALID'})
})
test('file symlinks and parent redirects are rejected without modifying the target',async t=>{
  const f=await fixture(t),bytes=await readFile(f.path)
  try {await symlink(f.path,join(f.root,'link.wav'),'file');await symlink(f.root,join(f.root,'linked-parent'),'junction')}
  catch(error){if(['EPERM','EACCES'].includes(error.code)){t.skip('symlinks unavailable');return}throw error}
  await assert.rejects(readLocalReferenceAudio(join(f.root,'link.wav')),{code:'TTS_REFERENCE_AUDIO_INVALID'})
  await assert.rejects(readLocalReferenceAudio(join(f.root,'linked-parent','selected.wav')),{code:'TTS_REFERENCE_AUDIO_INVALID'})
  assert.deepEqual(await readFile(f.path),bytes)
})
test('probe and actual speech use selected private snapshots; content changes invalidate probe and original is untouched',async t=>{
  const f=await fixture(t),bytes=await readFile(f.path);let calls=0,snapshot,played=0
  const adapter=createManagedLocalTtsAdapter({resolveManagedLocalTts:async()=>f.descriptor,runner:async(_exe,args)=>{
    calls++;snapshot=args[args.indexOf('--tts-speaker-file')+1];assert.ok(args.includes('--tts-speaker-file'));assert.notEqual(snapshot,f.path)
    assert.deepEqual(await readFile(snapshot),bytes)
    // Changing the external file after dispatch cannot redirect native input.
    await writeFile(f.path,Buffer.from('changed'));assert.deepEqual(await readFile(snapshot),bytes)
    await writeFile(args[args.indexOf('--output')+1],wav());return {audioFrames:10}
  },playback:async()=>{played++;return{completed:true}}})
  const result=await adapter.probe(f.config)
  assert.equal(result.localSynthesisSupported,false);assert.equal(result.localReason,'TTS_REFERENCE_AUDIO_INVALID')
  await assert.rejects(access(snapshot));assert.equal(played,0)
  await writeFile(f.path,bytes);assert.equal((await adapter.inspect(f.config)).localSynthesisSupported,true)
  await adapter.speak('测试',f.config);assert.equal(played,1);assert.equal(calls,2);await assert.rejects(access(snapshot))
  await assert.rejects(adapter.speak('测试',f.config),{code:'TTS_REFERENCE_AUDIO_INVALID'});assert.equal(calls,2)
})
test('reference content hash invalidates verification even when size and mtime are restored',async t=>{
  const f=await fixture(t)
  const adapter=createManagedLocalTtsAdapter({resolveManagedLocalTts:async()=>f.descriptor,runner:async(_exe,args)=>{await writeFile(args[args.indexOf('--output')+1],wav());return{audioFrames:10}}})
  assert.equal((await adapter.probe(f.config)).localSynthesisSupported,true)
  const {stat}=await import('node:fs/promises'),info=await stat(f.path),bytes=await readFile(f.path);bytes[44]=1;await writeFile(f.path,bytes);await utimes(f.path,info.atime,info.mtime)
  assert.equal((await adapter.inspect(f.config)).localSynthesisSupported,false)
  assert.equal((await adapter.inspect({...f.config,referenceAudioPath:null})).localSynthesisSupported,false)
})
test('explicit selected sample wins over historical A/B filenames; a missing selection never falls back',async t=>{
  const f=await fixture(t),samples=new Map(),seen=[]
  for(const [index,name] of ['reference-a.wav','reference-b.wav','cute24k.wav'].entries()){
    const path=join(f.root,name),bytes=wav();bytes.writeInt16LE(1000+index,44)
    await writeFile(path,bytes);samples.set(path,bytes)
  }
  const selected=join(f.root,'cute24k.wav'),oldB=join(f.root,'reference-b.wav')
  const config={...f.config,referenceAudioPath:selected}
  const adapter=createManagedLocalTtsAdapter({resolveManagedLocalTts:async()=>f.descriptor,runner:async(_exe,args)=>{
    const snapshot=args[args.indexOf('--tts-speaker-file')+1]
    assert.notEqual(snapshot,config.referenceAudioPath)
    seen.push(await readFile(snapshot))
    await writeFile(args[args.indexOf('--output')+1],wav());return{audioFrames:10}
  },playback:async()=>({completed:true})})
  assert.equal((await adapter.probe(config)).localSynthesisSupported,true)
  await adapter.speak('选择的音色',config)
  assert.deepEqual(seen,[samples.get(selected),samples.get(selected)])
  assert.notDeepEqual(seen[1],samples.get(oldB))
  assert.equal((await adapter.inspect({...config,referenceAudioPath:oldB})).localSynthesisSupported,false)
  await rm(selected)
  await assert.rejects(adapter.speak('不会换用旁边的样本',config),{code:'TTS_REFERENCE_AUDIO_INVALID'})
  assert.equal(seen.length,2)
  assert.deepEqual(await readFile(oldB),samples.get(oldB))
})
test('selected reference works without legacy acceptance; Melo never silently uses default voice',async t=>{
  const f=await fixture(t);let calls=0,played=0
  const adapter=createManagedLocalTtsAdapter({resolveManagedLocalTts:async()=>f.descriptor,runner:async(_exe,args)=>{
    calls++;assert.deepEqual(await readFile(args[args.indexOf('--tts-speaker-file')+1]),await readFile(f.path))
    await writeFile(args[args.indexOf('--output')+1],wav());return {audioFrames:10}
  },playback:async()=>{played++;return {completed:true}}})
  await adapter.speak('测试',{...f.config,referenceAudioAccepted:false})
  assert.equal(calls,1);assert.equal(played,1)
  f.descriptor.engine='sherpa-melo'
  await assert.rejects(adapter.speak('测试',f.config),{code:'TTS_REFERENCE_VOICE_UNSUPPORTED'})
  assert.equal(calls,1);assert.equal(played,1)
})
test('failed synthesis and cancellation remove reference snapshots without deleting selected samples',async t=>{
  const f=await fixture(t),bytes=await readFile(f.path);let snapshot,calls=0
  const adapter=createManagedLocalTtsAdapter({resolveManagedLocalTts:async()=>f.descriptor,runner:async(_exe,args)=>{
    calls++;snapshot=args[args.indexOf('--tts-speaker-file')+1];throw Object.assign(new Error('failure'),{code:'TTS_PROCESS_FAILED'})
  },playback:async()=>assert.fail('must not play')})
  await assert.rejects(adapter.speak('测试',f.config),{code:'TTS_PROCESS_FAILED'});await assert.rejects(access(snapshot));assert.deepEqual(await readFile(f.path),bytes)
  const controller=new AbortController();controller.abort();await assert.rejects(adapter.speak('测试',f.config,controller.signal));assert.equal(calls,1)
})
