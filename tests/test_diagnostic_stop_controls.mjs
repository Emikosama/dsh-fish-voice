/** Real plugin entry, deterministic process events and startup/exit clock. No audio. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { registerHooks } from 'node:module'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { createController } from '../ui/src/controller.mjs'
import { dispatchUiAction } from '../ui/host.mjs'
import { renderAvailable, renderControls } from './helpers/render-controls.mjs'
import { createWindowsTtsAdapter, runTtsProcess } from '../voice-tts.mjs'
import { createModelInstaller } from '../voice-model-installer.mjs'

const tick = () => new Promise(resolve => setImmediate(resolve))
const indexUrl = new URL('../index.mjs', import.meta.url).href
const ttsUrl = new URL('../voice-tts.mjs', import.meta.url).href
async function fixture(t) {
  const home = mkdtempSync(join(tmpdir(), 'whale-diagnostic-stop-'))
  const previousHome = process.env.DSH_HOME
  process.env.DSH_HOME = home
  mkdirSync(join(home, 'whale-ear'))
  const config = { autoStart: false, voiceSession: { enabled: false }, tts: { provider: 'system' }, preferredListenMode: 'always' }
  writeFileSync(join(home, 'whale-ear', 'config.json'), JSON.stringify(config))
  const children = [], ttsChildren = []
  const key = '__diagnosticStop' + randomUUID().replaceAll('-', '')
  globalThis[key] = () => {
    const child = new EventEmitter()
    child.pid = 1000 + children.length; child.exitCode = null; child.signalCode = null; child.killed = false
    child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough()
    const record = { child, kills: [], writes: [], closed: false, captureState: 'released', captureReply: true,
      emit(value) { child.stdout.write(JSON.stringify(value) + '\n') },
      ready(capabilities = {}) { this.emit({ event: 'ready', requestProtocol: 'whale-request/1', captureProtocol: 'whale-capture/1', captureDeviceProtocol: 'whale-capture-device/1', pid: child.pid, ...capabilities }) },
      exit() { if (this.closed) return; this.closed = true; child.exitCode = 0; child.emit('exit', 0, null); child.emit('close', 0, null) },
    }
    child.kill = signal => { record.kills.push(signal ?? 'SIGTERM'); child.killed = true; return true }
    child.stdin.on('data', chunk => {
      for (const line of String(chunk).trim().split('\n')) {
        const message = JSON.parse(line); record.writes.push(message)
        if (message.op === 'always') record.captureState = message.enabled ? 'active' : 'released'
        if (message.op === 'capture-status') {
          if (record.captureReply) queueMicrotask(() => record.emit({ event: 'capture-status', requestId: message.requestId, captureDevice: { state: record.captureState } }))
          continue
        }
        const event = { transcribe: 'transcript', prosody: 'prosody', 'ptt-status': 'ptt-status', always: 'always', stop: 'stopped' }[message.op]
        if (event) queueMicrotask(() => record.emit({ event, requestId: message.requestId, path: message.path, text: message.path, enabled: message.enabled, mode: message.enabled ? message.mode : 'ptt' }))
      }
    })
    children.push(record)
    return child
  }
  const runner = (command, args, payload, processOptions) => {
    const child = new EventEmitter(); child.pid = 8000 + ttsChildren.length
    child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough()
    const record = { child, payload, signal: processOptions.signal, kills: [], closed: false,
      close(value) { if(this.closed) return; this.closed = true; child.stdout.write(JSON.stringify(value)); child.emit('close',0) }
    }
    child.kill = value => { record.kills.push(value ?? 'SIGTERM'); return true }
    ttsChildren.push(record)
    return runTtsProcess(command, args, payload, { ...processOptions, spawnProcess: () => child })
  }
  globalThis[key + 'tts'] = options => createWindowsTtsAdapter({ ...options, platform: 'win32', runner })
  // The mocked process list and timers must not include an untracked DXGI child.
  globalThis[key + 'models'] = options => createModelInstaller({ ...options, gpuProbe: async () => ({ gpuMemoryBytes: null, gpuMemoryReason: 'Synthetic GPU inventory' }), probe: ({signal}) => runner('python',[],{op:'compute'},{signal,timeoutMs:12000}) })
  const hook = registerHooks({ resolve(specifier, context, next) {
    if (context.parentURL?.startsWith(`${indexUrl}?`) && specifier === './voice-python-runtime.mjs') return { url: 'data:text/javascript,' + encodeURIComponent(`export const createPythonRuntimeResolver = () => ({ resolve: async () => ({ executable: 'python', version: 'synthetic', optionalMissing: [] }), cancel: async () => {} });`), shortCircuit: true }
    if (context.parentURL?.startsWith(`${indexUrl}?`) && specifier === 'node:child_process') return { url: 'data:text/javascript,' + encodeURIComponent(`export const spawn = globalThis.${key}`), shortCircuit: true }
    if (context.parentURL?.startsWith(`${indexUrl}?`) && specifier === './voice-tts.mjs') return { url:'data:text/javascript,' + encodeURIComponent(`export { TTS_DEFAULTS,ttsSettings,createTtsRuntime } from ${JSON.stringify(ttsUrl)};export const createWindowsTtsAdapter = globalThis[${JSON.stringify(key + 'tts')}];`), shortCircuit:true }
    if (context.parentURL?.startsWith(`${indexUrl}?`) && specifier === './voice-model-installer.mjs') return { url:'data:text/javascript,'+encodeURIComponent(`export const createModelInstaller=globalThis[${JSON.stringify(key + 'models')}];`),shortCircuit:true }
    return next(specifier, context)
  } })
  const actor = { id: 'owner', session: { id: 'owner' } }
  const ctx = { agents: new Map([['owner', actor]]), tools: { register() { return () => {} } }, sessions: {}, provide() {}, effect() {}, on() { return () => {} }, get(name) {
    if (name === 'loader') return { import: async () => ({ z, defineDomain: value => value, domainTable: value => value }) }
    if (name === 'storageDomain') return { open: async () => ({ table: () => new Map() }) }
  } }
  let plugin
  try { plugin = await import(`${indexUrl}?diagnosticStop=${randomUUID()}`) } finally { hook.deregister(); delete globalThis[key]; delete globalThis[key + 'tts']; delete globalThis[key + 'models'] }
  plugin.apply(ctx, { autoStart: false })
  const instance = globalThis.__dshWhaleEar__; assert.ok(instance)
  t.mock.timers.enable({ apis: ['setTimeout'] })
  t.after(async () => {
    for (const record of ttsChildren) record.close({ok:true,completed:true})
    for (const record of children) record.exit()
    await instance.dispose().catch(() => {})
    delete globalThis.__dshWhaleEar__
    if (previousHome === undefined) delete process.env.DSH_HOME; else process.env.DSH_HOME = previousHome
    rmSync(home, { recursive: true, force: true })
  })
  return { instance, children, ttsChildren, actor }
}

async function enabled(t) {
  const f=await fixture(t),calls=[]
  const controller=createController(async(id,request,signal)=>{
    calls.push(request.action)
    return (await dispatchUiAction(f.instance.uiBridge,f.actor,request,signal,true)).value
  })
  t.after(()=>controller.dispose());controller.setSession('owner')
  const enabling=controller.run('owner','enable')
  await tick();f.children[0].ready();assert.equal(await enabling,true,controller.getSnapshot().error)
  assert.equal(f.children[0].captureState,'active')
  return {...f,controller,calls}
}
const finishInspection=f=>{
  for(const row of f.ttsChildren)row.close(row.payload.op==='voices'
    ?{ok:true,systemSupported:false,edgePlaybackSupported:true,voices:[]}
    :{ok:true,available:true,schema:1,backends:{}})
}

for(const action of ['inspect-tts','inspect-model-compute'])test(`${action}: existing microphone stop preempts diagnostics while ordinary writes remain fenced`,async t=>{
  const f=await enabled(t)
  const view=renderAvailable?await renderControls(t,{owner:f.actor,controller:f.controller}):null
  const act=fn=>view?view.act(fn):fn()
  let inspecting,stopping,stopped=false
  await act(async()=>{inspecting=f.controller.run('owner',action);await tick()})
  assert.equal(f.ttsChildren.length,1)
  assert.equal(f.controller.getSnapshot().interruptibleRead,action)
  if(view)assert.equal(view.button('关麦').disabled,false)
  for(const write of ['enable','save-tts','listen-mode'])assert.equal(await f.controller.run('owner',write),false)
  await act(async()=>{
    stopping=f.controller.run('owner','disable').then(value=>{stopped=true;return value})
    assert.equal(await f.controller.run('owner','disable'),false)
    await tick()
  })
  assert.equal(f.calls.filter(value=>value==='disable').length,1,'stop must reach host without waiting for diagnostic RPC')
  if(action==='inspect-tts'){
    assert.ok(f.ttsChildren.every(row=>row.signal.aborted&&row.kills.length===1))
    assert.equal(stopped,false,'host stop must wait for the native output process to exit')
    assert.equal(f.children[0].captureState,'active')
    if(view)assert.equal(view.button('关麦').disabled,true)
    await tick()
    assert.equal(stopped,false,'a running output process cannot confirm its own stop')
    f.ttsChildren[0].close({ok:true})
    assert.equal(await stopping,true,'confirmed output-process close lets microphone stop finish')
    assert.equal(stopped,true)
  }else{
    assert.ok(f.ttsChildren.every(row=>!row.signal.aborted&&row.kills.length===0),'bounded compute result channel stays alive')
    assert.equal(await stopping,true,'non-audio compute cannot delay microphone release')
    assert.equal(f.children[0].captureState,'released')
    assert.equal(f.controller.getSnapshot().busy,true,'compute still fences other writes until settled')
  }
  await act(async()=>{finishInspection(f);assert.equal(await inspecting,false);assert.equal(await stopping,true)})
  assert.equal(f.children[0].captureState,'released')
  assert.equal(f.controller.getSnapshot().status.enabled,false)
  assert.equal(f.controller.getSnapshot().ttsCapabilities,null)
  assert.equal(f.controller.getSnapshot().diagnosticStopPending,false)
  assert.equal(f.controller.getSnapshot().busy,false)
  if(view)await view.close()
})
test('unconfirmed inspection still dispatches microphone cleanup and retains output block',async t=>{
  const f=await enabled(t)
  const inspecting=f.controller.run('owner','inspect-tts');await tick()
  const stopping=f.controller.run('owner','disable')
  await tick()
  t.mock.timers.tick(1500);await tick()
  assert.equal(await inspecting,false);assert.equal(await stopping,false)
  assert.equal(f.calls.filter(value=>value==='disable').length,1)
  assert.equal(f.children[0].captureState,'released','host cleanup must release capture even when TTS stop fails')
  assert.equal(f.instance.tts.status().blocked,true)
  assert.equal(f.controller.getSnapshot().uncertain,true)
  f.ttsChildren[0].close({ok:true});await tick()
  assert.equal(f.instance.tts.status().blocked,true,'late close must not clear an uncertain exit')
  assert.equal(await f.controller.run('owner','status'),true)
  assert.equal(f.controller.getSnapshot().status.enabled,false)
  assert.equal(f.controller.getSnapshot().ttsUncertain,true)
  assert.equal(await f.controller.run('owner','preview-tts'),false)
})
test('automatic models-page read exposes existing stop controls, including after returning home', {skip:!renderAvailable},async t=>{
  const f=await enabled(t),view=await renderControls(t,{owner:f.actor,controller:f.controller})
  await view.act(async()=>{await f.controller.openSettings('models');await tick();await tick()})
  await view.act(async()=>{view.button('朗读方式').click();await tick();await tick()})
  assert.equal(f.ttsChildren.length,1,'entering the reading settings tab starts inspection')
  const mute=[...view.container.querySelectorAll('button')].filter(button=>button.textContent==='停止语音以编辑')
  assert.ok(mute.length);assert.ok(mute.every(button=>!button.disabled))
  await view.act(async()=>assert.equal(await f.controller.showHome(),true))
  assert.equal(f.controller.getSnapshot().panelView,'home')
  assert.ok(f.ttsChildren.every(row=>!row.signal.aborted&&row.kills.length===0),'navigation must not cancel unrelated newer audio')
  assert.equal(f.calls.includes('disable'),false);assert.equal(f.calls.includes('cancel-tts'),false)
  assert.equal(f.children[0].captureState,'active')
  assert.equal(view.button('关麦').disabled,false)
  let stopping
  await view.act(async()=>{stopping=f.controller.run('owner','disable');await tick()})
  assert.ok(f.ttsChildren.every(row=>row.signal.aborted))
  assert.equal(f.controller.getSnapshot().status.enabled,true,'UI cannot claim stop before host receipt')
  await view.act(async()=>{finishInspection(f);assert.equal(await stopping,true)})
  assert.equal(f.controller.getSnapshot().status.enabled,false)
  assert.equal(f.children[0].captureState,'released')
  assert.equal(f.controller.getSnapshot().ttsCapabilities,null)
  await view.close()
})
