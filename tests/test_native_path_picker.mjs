import test from 'node:test'
import assert from 'node:assert/strict'
import { createNativePathPicker, pickerCommand } from '../voice-path-picker.mjs'
import { dispatchUiAction } from '../ui/host.mjs'
import { actionRequestCodec } from '../ui/conversation-contract.mjs'
import { createController } from '../ui/src/controller.mjs'
const file = {isFile:()=>true,isDirectory:()=>false}, directory={isFile:()=>false,isDirectory:()=>true}
function picker(output, info=file, error=null) {return createNativePathPicker({platform:'linux',statPath:async()=>info,run:(_c,_a,_o,cb)=>queueMicrotask(()=>cb(error,output))})}
test('native commands use fixed non-shell args and WAV/directory filters',()=>{
  assert.match(pickerCommand('referenceAudio','win32')[1].at(-1),/OpenFileDialog.*WAV/)
  assert.match(pickerCommand('sensevoiceDir','win32')[1].at(-1),/FolderBrowserDialog/)
  assert.match(pickerCommand('referenceAudio','darwin')[1][1],/choose file of type/)
  assert.ok(pickerCommand('whisper','linux')[1].includes('--directory'))
  assert.throws(()=>pickerCommand('__proto__'))
})
test('selection returns Unicode path, checks type and extension, cancellation preserves draft',async()=>{
  assert.deepEqual(await picker('/tmp/鲸语.wav\n')('referenceAudio'),{path:'/tmp/鲸语.wav'})
  assert.deepEqual(await picker('')('referenceAudio'),{path:null})
  assert.deepEqual(await picker('',file,{code:1})('referenceAudio'),{path:null})
  await assert.rejects(picker('/tmp/a.mp3')('referenceAudio'),/WAV/)
  await assert.rejects(picker('/tmp/model',file)('sensevoiceDir'),/正确/)
  assert.deepEqual(await picker('/tmp/model',directory)('sourceDirectory'),{path:'/tmp/model'})
  await assert.rejects(picker('/fakepath/a.wav')('referenceAudio'),/无效/)
  await assert.rejects(picker('relative.wav')('referenceAudio'),/无效/)
})
test('single outstanding dialog, abort and unavailable errors never become successful cancellation',async()=>{
  let settle;const choose=createNativePathPicker({platform:'linux',statPath:async()=>file,run:(_c,_a,_o,cb)=>settle=cb})
  const abort=new AbortController(),pending=choose('referenceAudio',abort.signal)
  await assert.rejects(choose('referenceAudio'),/已有/)
  abort.abort();settle(null,'/tmp/a.wav');await assert.rejects(pending,/取消/)
  await assert.rejects(picker('',file,{code:'ENOENT'})('referenceAudio'),/无法打开/)
  await assert.rejects(choose('referenceAudio',abort.signal),/取消/)
})
test('strict contract and owner boundary deny agent path requests',async()=>{
  assert.equal(actionRequestCodec.create().safeParse({action:'pick-local-path',kind:'referenceAudio'}).success,true)
  assert.equal(actionRequestCodec.create().safeParse({action:'pick-local-path',kind:'referenceAudio',path:'/tmp/x'}).success,false)
  await assert.rejects(dispatchUiAction({}, {}, {action:'pick-local-path',kind:'referenceAudio'}),/只有用户/)
  await assert.rejects(dispatchUiAction({}, {}, {action:'pick-local-path',kind:'nope'},undefined,true),/不支持/)
})
test('controller ignores old session results and does not save',async()=>{
  let complete; const calls=[]
  const controller=createController(async(id,request)=>{calls.push(request);return await new Promise(r=>complete=r)})
  controller.setSession('first')
  const promise=controller.pickPath('first','referenceAudio')
  controller.setSession('second');complete({path:'/tmp/a.wav'})
  assert.equal(await promise,null);assert.deepEqual(calls,[{action:'pick-local-path',kind:'referenceAudio'}]);controller.dispose()
})
test('Windows paths are absolute under Windows rules and preserve Unicode',async()=>{
 const select=output=>createNativePathPicker({platform:'win32',statPath:async()=>file,run:(_c,_a,_o,cb)=>cb(null,output)})
 assert.deepEqual(await select('C:\\音频 空格\\a.wav')('referenceAudio'),{path:'C:\\音频 空格\\a.wav'})
 await assert.rejects(select('C:a.wav')('referenceAudio'),/无效/)
 await assert.rejects(select('\\a.wav')('referenceAudio'),/无效/)
})
