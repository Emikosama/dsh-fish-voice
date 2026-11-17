/** Async setup navigation regressions. No microphone, model, or real-device claims. */
import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import vm from 'node:vm'
import {createController} from '../src/controller.mjs'

const source=readFileSync(new URL('../src/setup.jsx',import.meta.url),'utf8')
const deferred=()=>{let resolve;const promise=new Promise(done=>{resolve=done});return{promise,resolve}}
const tick=()=>new Promise(done=>setImmediate(done))
const settings={revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},ttsSetup:{provider:'off',edgeVoice:'zh-CN-XiaoxiaoNeural',systemVoice:null,systemFallback:true,edgeTextTransmissionAccepted:false,volume:.8},onboarding:{version:1,completed:false},voiceSession:{visibility:'hidden'}}
const status={ownerSessionId:null,enabled:false,helper:{online:false},voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true},listenMode:'ptt'}
const stateFor=id=>({settings,settingsFor:id,status,checkedFor:id})

// Execute the production callback prefix with explicit synthetic hook lifecycles.
// This always runs without a renderer dependency. The DOM test below separately
// exercises real React mounting when the pinned host toolchain is available.
function callbackFixture(initial={}) {
  const setupStart=source.indexOf('export function SetupWizard(')
  assert.ok(setupStart>=0)
  const prefix=source.slice(setupStart,source.indexOf('  return <MenuSurface',setupStart)).replace('export function','function')
  const helpers=source.slice(source.indexOf('function setupReady('),source.indexOf('function Gate(')).replace('export function','function')
  const initialTts=source.match(/^const initialTts = .*$/m)?.[0]
  assert.ok(initialTts)
  let owner
  const hooks={
    useState(initial){const index=owner.index++,instance=owner;if(!instance.slots[index])instance.slots[index]={value:typeof initial==='function'?initial():initial};const slot=instance.slots[index];return[slot.value,value=>{slot.value=typeof value==='function'?value(slot.value):value}]},
    useRef(value){const index=owner.index++;return owner.slots[index]??={current:value}},
    useLayoutEffect(callback,deps){const index=owner.index++,previous=owner.slots[index];if(!previous||deps.some((value,i)=>value!==previous.deps[i])){previous?.cleanup?.();owner.slots[index]={deps:[...deps],cleanup:callback()}}},
    useEffect(){owner.index++},
  }
  const setup=new Function(...Object.keys(hooks),`${initialTts}\n${source.match(/^const ttsValues = .*$/m)[0]}\n${helpers}\n${prefix}\nreturn {next,leave,step,setProvider,pending};}\nreturn SetupWizard`)(...Object.values(hooks))
  const instance={slots:[],index:0}
  let props={state:stateFor('A'),sessionId:'A',run:async()=>true,...initial}
  const render=(next={})=>{props={...props,...next};owner=instance;owner.index=0;return setup(props)}
  return{render,unmount(){for(const slot of instance.slots)slot?.cleanup?.()}}
}

async function advance(f,step){while(f.render().step<step)await f.render().next()}

test('current setup writes advance normally and a successful final save dismisses once',async()=>{
  const calls=[];let dismisses=0
  const f=callbackFixture({run:async(_id,action)=>{calls.push(action);return true},onDismiss:()=>{dismisses++}})
  await advance(f,2);await f.render().next()
  assert.deepEqual(calls,['listen-mode','complete-setup']);assert.equal(dismisses,1)
  f.unmount()
})

test('a current provider save advances, while a failed write remains on its step',async()=>{
  let success=false
  const f=callbackFixture()
  await advance(f,1);f.render().setProvider('off')
  f.render({state:{...stateFor('A'),settings:{...settings,ttsSetup:{...settings.ttsSetup,provider:'unconfigured'}}},run:async()=>success})
  await f.render().next();assert.equal(f.render().step,1)
  success=true;await f.render().next();assert.equal(f.render().step,2)
  f.unmount()
})

for(const [step,action] of [[0,'listen-mode'],[1,'save-tts'],[2,'complete-setup']]){
  for(const boundary of ['leave','unmount','session'])test(`${action} cannot advance or dismiss after ${boundary}`,async()=>{
    const pending=deferred(),calls=[];let defer=false,dismisses=0
    const f=callbackFixture({run:async(id,kind)=>{calls.push([id,kind]);return defer&&kind===action?pending.promise:true},onDismiss:()=>{dismisses++}})
    await advance(f,step)
    if(action==='save-tts'){f.render().setProvider('off');f.render({state:{...stateFor('A'),settings:{...settings,ttsSetup:{...settings.ttsSetup,provider:'unconfigured'}}}})}
    defer=true;const running=f.render().next()
    assert.deepEqual(calls.at(-1),['A',action])
    if(boundary==='leave')f.render().leave(()=>{})
    if(boundary==='unmount')f.unmount()
    if(boundary==='session')f.render({sessionId:'B',state:stateFor('B')})
    pending.resolve(true);await running
    assert.equal(f.render().step,step,'stale success cannot advance the screen')
    assert.equal(dismisses,0,'stale success cannot issue a new dismiss intent')
    f.unmount()
  })
}

test('late completion from a closed wizard preserves a newly opened controller surface',async()=>{
  const finish=deferred(),calls=[]
  let savedSettings=settings
  const ui=createController(async(id,{action})=>{
    calls.push([id,action])
    if(action==='complete-setup')return finish.promise.then(value=>savedSettings=value)
    if(action==='read-settings')return savedSettings
    if(['status','listen-mode'].includes(action))return status
    if(action==='inspect-performance')return{modes:[]}
    throw Error(action)
  })
  ui.enableAutomaticReads();ui.setSession('A');await tick();ui.openSetup();await tick()
  const old=callbackFixture({state:ui.getSnapshot(),run:ui.run,onDismiss:ui.dismissSetup,onOpenSettings:ui.openSettings})
  await old.render().next();await tick();old.render({state:ui.getSnapshot()});await old.render().next()
  const running=old.render().next()
  await old.render().leave(ui.openSettings);old.unmount()
  assert.equal(ui.getSnapshot().setupOpen,false)
  ui.openSetup()
  const reopened=callbackFixture({state:ui.getSnapshot(),run:ui.run,onDismiss:ui.dismissSetup})
  assert.equal(reopened.render().step,0)
  finish.resolve({...settings,revision:'r2',onboarding:{version:1,completed:true}});await running;await tick()
  assert.equal(ui.getSnapshot().setupStatus.completed,true,'the completed write is still acknowledged')
  assert.equal(ui.getSnapshot().setupOpen,true,'old callback must not close the new wizard')
  assert.equal(calls.filter(([,action])=>action==='complete-setup').length,1,'navigation never replays the write')
  reopened.unmount();ui.dispose()
})

const host=process.env.DSH_SOURCE_ROOT,renderDeps=process.env.WHALE_RENDER_DEPS,reactDeps=process.env.WHALE_REACT_DEPS
const rendererAvailable=Boolean(host||renderDeps&&reactDeps)
// Real React + jsdom, native stand-in controls, and synthetic transport only.
test('rendered wizard keeps the reopened instance after its old Finish request settles',{skip:!rendererAvailable},async t=>{
  const require=createRequire((renderDeps||host)+'/package.json'),reactRequire=createRequire((reactDeps||host+'/packages/client/ui-primitives')+'/package.json')
  const {JSDOM}=require('jsdom'),{transformSync}=renderDeps?require('esbuild'):createRequire(require.resolve('vite/package.json'))('esbuild')
  const React=reactRequire('react'),{createRoot}=reactRequire('react-dom/client'),act=React.act??reactRequire('react-dom/test-utils').act
  const dom=new JSDOM('<div id="root"></div>',{url:'http://localhost'})
  const previous=Object.fromEntries(['window','document','navigator','IS_REACT_ACT_ENVIRONMENT'].map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]))
  for(const[key,value]of Object.entries({window:dom.window,document:dom.window.document,navigator:dom.window.navigator,IS_REACT_ACT_ENVIRONMENT:true}))Object.defineProperty(globalThis,key,{value,writable:true,configurable:true})
  const native=tag=>React.forwardRef(({children,variant,...props},ref)=>React.createElement(tag,{...props,ref},children))
  const primitives={Button:native('button'),Input:native('input'),MenuSurface:native('div'),Checkbox:native('input')}
  const context={module:{exports:{}},require(id){if(id==='./path-field.jsx'||id==='./motion.jsx'){const child={...context,AbortController,module:{exports:{}}};vm.runInNewContext(transformSync(readFileSync(new URL('../src/'+id.slice(2),import.meta.url),'utf8'),{loader:'jsx',format:'cjs',jsx:'automatic'}).code,child);return child.module.exports}if(id.endsWith('.css'))return{text:''};if(id.includes('dsh-client-ui-primitives'))return primitives;return reactRequire(id)}}
  vm.runInNewContext(transformSync(source,{loader:'jsx',format:'cjs',jsx:'automatic'}).code,context)
  const {SetupWizard}=context.module.exports,container=document.getElementById('root'),root=createRoot(container)
  const finish=deferred();let dismisses=0
  const run=async(_id,action)=>action==='complete-setup'?finish.promise:true
  const render=()=>root.render(React.createElement(SetupWizard,{state:stateFor('A'),sessionId:'A',run,onDismiss:()=>{dismisses++}}))
  const click=async label=>{const node=[...container.querySelectorAll('button')].find(node=>node.textContent===label);assert.ok(node,label);assert.equal(node.disabled,false);await act(async()=>node.click())}
  t.after(async()=>{await act(async()=>root.unmount());dom.window.close();for(const[key,descriptor]of Object.entries(previous)){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key]}})
  await act(async()=>render());await click('下一步');await click('下一步');await click('完成')
  await act(async()=>root.render(React.createElement('div',null,'different surface')))
  assert.equal(container.textContent,'different surface')
  await act(async()=>render());assert.match(container.textContent,/第 1 \/ 3 步/)
  await act(async()=>{finish.resolve(true);await tick()})
  assert.equal(dismisses,0);assert.match(container.textContent,/第 1 \/ 3 步/)
})
