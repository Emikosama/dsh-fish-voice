import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import vm from 'node:vm'
import {join} from 'node:path'
import {createController} from '../src/controller.mjs'
import {decodeReply} from '../src/protocol.mjs'
import {zh} from '../src/locales.mjs'
const require=createRequire(import.meta.url)
const buildRequire=process.env.WHALE_RENDER_DEPS?createRequire(join(process.env.WHALE_RENDER_DEPS,'package.json')):require
const reactRequire=process.env.WHALE_REACT_DEPS?createRequire(join(process.env.WHALE_REACT_DEPS,'package.json')):require
let renderAvailable=true
try{buildRequire.resolve('esbuild');buildRequire.resolve('jsdom');reactRequire.resolve('react-dom/client')}catch{renderAvailable=false}
const status={enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true},helper:{online:false}}
const prompt={text:'',mode:'agents',customSupported:false,unsupportedReason:'unsupported'}
const settings={revision:'r1',values:{device:null,pttMouse:2,speakerVerification:{enabled:false}},voicePrompt:prompt}
test('voice prompt settings reject malformed snapshots and retain unsupported saved text for clearing',()=>{
 for(const value of [{...prompt,text:1},{...prompt,text:'x'.repeat(32769)},{...prompt,mode:'custom'},{...prompt,customSupported:'yes'}])assert.throws(()=>decodeReply('save-voice-prompt',{...settings,voicePrompt:value}))
 assert.equal(decodeReply('read-settings',{...settings,voicePrompt:{...prompt,text:'old'}}).voicePrompt.text,'old')
 assert.equal(decodeReply('read-settings',{...settings,voicePrompt:{text:'saved',mode:'custom',customSupported:true,unsupportedReason:null}}).voicePrompt.mode,'custom')
})
test('prompt draft survives background conflict and cancellation adopts latest settings',async()=>{
 let revision='r1';const ui=createController(async(id,{action,values})=>action==='status'?status:{...settings,revision,...(action==='save-voice-prompt'?{voicePrompt:{...prompt,text:values.text}}:{})})
 ui.setSession('A');await ui.run('A','read-settings');ui.markSettingsEdited('save-voice-prompt');revision='r2';await ui.run('A','read-settings');assert.equal(ui.getSnapshot().settingsConflict,true);assert.equal(ui.getSnapshot().settings.revision,'r1');ui.discardSettingsDraft('save-voice-prompt');assert.equal(ui.getSnapshot().settings.revision,'r2');assert.equal(ui.getSnapshot().settingsConflict,false)
 ui.markSettingsEdited('save-voice-prompt');assert.equal(await ui.run('A','save-voice-prompt',{revision:'r2',values:{text:''}}),true);assert.deepEqual(ui.getSnapshot().settingsDraftActions,[]);ui.dispose()
})
test('prompt editor handles unsupported nonempty draft, cancel, clearing, repeat save, failures and voice lock',{skip:!renderAvailable},async t=>{
 const {transformSync}=buildRequire('esbuild'),{JSDOM}=buildRequire('jsdom'),React=reactRequire('react'),{createRoot}=reactRequire('react-dom/client'),{Simulate,act:oldAct}=reactRequire('react-dom/test-utils'),act=React.act??oldAct
 const dom=new JSDOM('<div id="root"></div>',{url:'http://localhost'}),keys=['window','document','navigator','IS_REACT_ACT_ENVIRONMENT'],old=Object.fromEntries(keys.map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]))
 for(const [k,v]of Object.entries({window:dom.window,document:dom.window.document,navigator:dom.window.navigator,IS_REACT_ACT_ENVIRONMENT:true}))Object.defineProperty(globalThis,k,{value:v,writable:true,configurable:true})
 const source=readFileSync(new URL('../src/views.jsx',import.meta.url),'utf8'),section=source.slice(source.indexOf('export function VoicePromptEditor'),source.indexOf('/** Minimal desktop-pet boundary:'))
 const context={module:{exports:{}},require:reactRequire,css:{},Button:({variant,...props})=>React.createElement('button',props),...React};vm.runInNewContext(transformSync(section,{loader:'jsx',format:'cjs',jsx:'automatic'}).code,context)
 const root=createRoot(document.getElementById('root')),container=document.getElementById('root'),calls=[],discard=[];let resolve
 let state={settingsFor:'A',checkedFor:'A',settings,status},key='A'
 const render=()=>root.render(React.createElement(context.module.exports.VoicePromptEditor,{key,state,sessionId:'A',t:k=>zh[k]??k,run:(...args)=>{calls.push(args);return new Promise(r=>resolve=r)},discardSettingsDraft:x=>discard.push(x)}))
 const button=text=>[...container.querySelectorAll('button')].find(n=>n.textContent===text),change=async text=>act(async()=>Simulate.change(container.querySelector('textarea'),{target:{value:text}}))
 t.after(async()=>{await act(async()=>root.unmount());dom.window.close();for(const k of keys){if(old[k])Object.defineProperty(globalThis,k,old[k]);else delete globalThis[k]}})
 await act(async()=>render());assert.equal(calls.length,0);assert.equal(button(zh.voicePromptSave).disabled,true);assert.match(container.textContent,/当前 DSH 暂不支持自定义提示词/,'capability limitation is visible before typing')
 await change('hello');assert.equal(button(zh.voicePromptSave).disabled,true);assert.match(container.textContent,/当前 DSH 暂不支持自定义提示词/)
 await act(async()=>button('取消修改').click());assert.equal(container.querySelector('textarea').value,'');assert.deepEqual(discard,['save-voice-prompt'])
 state={...state,settings:{...settings,voicePrompt:{...prompt,customSupported:true,unsupportedReason:null}}};key='supported';await act(async()=>render());await change('saved additional text')
 assert.equal(button(zh.voicePromptSave).disabled,false)
 await act(async()=>{button(zh.voicePromptSave).click();button(zh.voicePromptSave).click()});assert.equal(calls.length,1);assert.equal(calls[0][2].values.text,'saved additional text');await act(async()=>resolve(true));assert.match(container.textContent,/已保存，下次开启语音时生效/);calls.length=0
 state={...state,settings:{...settings,voicePrompt:{...prompt,text:'old'}}};key='B';await act(async()=>render());await change('  \n');assert.equal(button(zh.voicePromptSave).disabled,false)
 await act(async()=>{button(zh.voicePromptSave).click();button(zh.voicePromptSave).click()});assert.equal(calls.length,1);assert.equal(calls[0][1],'save-voice-prompt');assert.equal(calls[0][2].values.text,'');await act(async()=>resolve(false));assert.match(container.textContent,/草稿已保留/);assert.doesNotMatch(container.querySelector('[role=status]').textContent,/暂不支持/,'save feedback takes precedence over capability note')
 state={...state,status:{...status,enabled:true}};await act(async()=>render());assert.equal(container.querySelector('textarea').disabled,true);assert.equal(button(zh.voicePromptSave).disabled,true)
 state={...state,status,settingsConflict:true};await act(async()=>render());assert.equal(container.querySelector('textarea').disabled,true)
 state={...state,settingsConflict:false};await act(async()=>render());await change('x'.repeat(32769));assert.equal(button(zh.voicePromptSave).disabled,true);assert.equal(container.querySelector('textarea').maxLength,32768)
})
test('prompt page stays mounted across settings navigation and uses saved mode only',()=>{
 const source=readFileSync(new URL('../src/views.jsx',import.meta.url),'utf8')
 assert.match(source,/SETTINGS_TABS = \['audio', 'interaction', 'prompt', 'models'/)
 assert.match(source,/\(tab === 'prompt' \|\| visited\.has\('prompt'\)\)&&settings&&<div hidden=\{tab!=='prompt'\}/)
 assert.match(source,/settings\.voicePrompt\?\.mode==='custom'&&settings\.voicePrompt\?\.customSupported===true/)
 assert.match(source,/key=\{'prompt:'\+sessionId\+':'.*state\.settingsKey/)
})


test('prompt page can be selected through the settings navigation controller',async()=>{
 const ui=createController();assert.equal(await ui.openSettings('prompt'),true);assert.equal(ui.getSnapshot().settingsTab,'prompt');ui.dispose()
})
