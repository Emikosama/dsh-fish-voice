import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { validAudioDevice, validAudioInventory, audioPreferences, inspectAudioDevices } from '../voice-audio-devices.mjs'
import { createVoiceUiBridge } from '../voice-ui-bridge.mjs'
import { createWindowsTtsAdapter } from '../voice-tts.mjs'
import { decodeReply } from '../ui/src/protocol.mjs'
const device = (id='endpoint-a',name='USB') => ({backend:'winmm',id,name})
const inventory = {schema:1,input:{status:'available',items:[device()],reason:null},output:{status:'available',items:[device('endpoint-out','Headphones')],reason:null}}

test('device protocol accepts stable identities and rejects malformed/ambiguous inventories',()=>{
  assert.equal(validAudioDevice(device()),true)
  for(const value of [{}, {...device(),index:0}, {...device(),id:''}, {...device(),name:'bad\nname'}, {...device(),backend:'guess'}])assert.ok(!validAudioDevice(value))
  assert.equal(validAudioInventory(inventory),true)
  assert.equal(validAudioInventory({...inventory,input:{...inventory.input,items:[device(),device()]}}),false)
  assert.throws(()=>decodeReply('read-audio-devices',{}),/inventory/)
  assert.deepEqual(audioPreferences({device:7}),{input:7,output:null})
})

test('standalone enumeration invokes only the bounded helper, never a voice enable',async()=>{
  const calls=[]
  assert.deepEqual(await inspectAudioDevices({pythonPath:'python-known',runner:async(...args)=>{calls.push(args);return inventory}}),inventory)
  assert.equal(calls[0][0],'python-known')
  assert.deepEqual(calls[0][1].slice(-1),['enumerate'])
  assert.equal(calls[0][3].timeoutMs,8000)
})

function fixture(t){
  const directory=mkdtempSync(join(tmpdir(),'whale-devices-')),path=join(directory,'config.json')
  t.after(()=>rmSync(directory,{recursive:true,force:true}))
  writeFileSync(path,JSON.stringify({device:null,pttMouse:2,speakerVerification:{enabled:false},privateKeep:'untouched'}))
  const read=()=>JSON.parse(readFileSync(path,'utf8'))
  let state={enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{fullyStopped:true,id:null}}
  let listing=inventory,gate=null
  const actor={session:{id:'A'}}
  const bridge=createVoiceUiBridge({configPath:path,readEffectiveConfig:read,readStatus:()=>state,assertCaller:value=>assert.equal(value,actor),sessionControl:{owner:()=>null},inspectAudioDevices:async()=>{if(gate)await gate;return listing}})
  return {bridge,actor,read,path,setState:value=>state=value,setListing:value=>listing=value,setGate:value=>gate=value}
}
test('automatic persistence survives a new reader, preserves unrelated config, and default remains null',async t=>{
  const f=fixture(t),before=f.bridge.readSettings(f.actor)
  let saved=await f.bridge.updateAudioDevice({revision:before.revision,direction:'input',selection:device('endpoint-a','forged label')},f.actor)
  assert.deepEqual(f.read().device,device())
  assert.deepEqual(saved.audioDevices.input,device())
  assert.equal(f.read().privateKeep,'untouched')
  saved=await f.bridge.updateAudioDevice({revision:saved.revision,direction:'output',selection:device('endpoint-out','Headphones')},f.actor)
  assert.deepEqual(f.read().outputDevice,device('endpoint-out','Headphones'))
  saved=await f.bridge.updateAudioDevice({revision:saved.revision,direction:'input',selection:null},f.actor)
  assert.equal(f.read().device,null)
  assert.deepEqual(saved.audioDevices.output,device('endpoint-out','Headphones'))
})
test('missing endpoint, stale revision and active/unknown input cannot change the preference',async t=>{
  const f=fixture(t),before=f.bridge.readSettings(f.actor)
  await assert.rejects(f.bridge.updateAudioDevice({revision:before.revision,direction:'output',selection:device('unplugged')},f.actor),/断开/)
  assert.equal(f.read().outputDevice,undefined)
  for(const state of [{enabled:true,ownerSessionId:'A',voiceControlBusy:false,voiceSession:{fullyStopped:false,id:'voice'}},{enabled:false,ownerSessionId:null,voiceControlBusy:true,voiceSession:{fullyStopped:true,id:null}}]){
    f.setState(state)
    await assert.rejects(f.bridge.updateAudioDevice({revision:before.revision,direction:'input',selection:device()},f.actor),/关麦/)
  }
  await assert.rejects(f.bridge.updateAudioDevice({revision:'stale',direction:'output',selection:null},f.actor),/改变/)
  assert.equal(f.read().device,null)
})
test('selection rechecks permission state and disk revision after async enumeration',async t=>{
  const f=fixture(t),before=f.bridge.readSettings(f.actor)
  let release;f.setGate(new Promise(r=>release=r))
  const saving=f.bridge.updateAudioDevice({revision:before.revision,direction:'output',selection:device('endpoint-out','Headphones')},f.actor)
  writeFileSync(f.path,JSON.stringify({...f.read(),privateKeep:'newer'}));release()
  await assert.rejects(saving,/改变/)
  assert.equal(f.read().outputDevice,undefined)
  assert.equal(f.read().privateKeep,'newer')
})
test('file playback receives the current exact route without global changes',async()=>{
  const calls=[];let selected=device('a')
  const adapter=createWindowsTtsAdapter({platform:'win32',outputDevice:()=>selected,runner:async(...args)=>{calls.push(args);return {ok:true,completed:true}}})
  await adapter.play('/local/edge.mp3',{volume:.4},null)
  selected=device('b');await adapter.play('/local/audio.wav',{volume:.6},null)
  selected=null;await adapter.play('/local/next.wav',{volume:.6},null)
  assert.deepEqual(calls.map(call=>call[2].outputDevice),[device('a'),device('b'),null])
})

test('changing output withdraws old headphone isolation without changing unrelated sound preferences',async t=>{
  const f=fixture(t)
  writeFileSync(f.path,JSON.stringify({...f.read(),turnSignals:{enabled:true,volume:.3,headphonesConfirmed:true,experimentalAutomaticBargeIn:true}}))
  const before=f.bridge.readSettings(f.actor)
  await f.bridge.updateAudioDevice({revision:before.revision,direction:'output',selection:device('endpoint-out','Headphones')},f.actor)
  assert.deepEqual(f.read().turnSignals,{enabled:true,volume:.3,headphonesConfirmed:false,experimentalAutomaticBargeIn:false})
})
