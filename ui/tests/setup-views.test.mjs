import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import { join } from 'node:path'
const source = readFileSync(new URL('../src/setup.jsx', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/setup.module.css', import.meta.url), 'utf8')
test('setup uses DSH primitives and opt-in commands, not effect-driven speech or downloads', () => {
  assert.match(source, /import \{ Button, Input, Checkbox, MenuSurface \} from '@deepseek-ai\/dsh-client-ui-primitives'/)
  assert.doesNotMatch(source, /fetch\(|getUserMedia|new Audio|text:\s*['"]你好/)
  assert.match(source, /planHash: plan.planHash, accepted: true/)
  assert.match(source, /edgeTextTransmissionAccepted: false/)
  assert.match(source, /export const setupStyles = css.text/)
  assert.match(css, /prefers-reduced-motion:reduce/)
  assert.match(css, /data-motion=off/)
})
// Compile and render with the local DSH toolchain when available. No remote service or real audio.
let view, React, renderToStaticMarkup
const toolchain = process.env.DSH_SOURCE_ROOT
if (toolchain) {
  const require = createRequire(join(toolchain, 'package.json'))
  const { transformSync } = createRequire(require.resolve('vite/package.json'))('esbuild')
  const reactRequire = createRequire(join(toolchain, 'packages/client/ui-primitives/package.json'))
  React = reactRequire('react')
  ;({ renderToStaticMarkup } = reactRequire('react-dom/server'))
  const code = transformSync(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
  const native = tag => ({ children, ...props }) => React.createElement(tag, props, children)
  const primitives = { Button: native('button'), Input: native('input'), MenuSurface: native('div'), Checkbox: ({ label, ...props }) => React.createElement('label', null, React.createElement('input', { ...props, type:'checkbox' }), label) }
  const context = { module:{ exports:{} }, require(id) { if(id==='./path-field.jsx'||id==='./motion.jsx'){const child={...context,AbortController,module:{exports:{}}};vm.runInNewContext(transformSync(readFileSync(new URL('../src/'+id.slice(2),import.meta.url),'utf8'),{loader:'jsx',format:'cjs',jsx:'automatic'}).code,child);return child.module.exports} if (id.endsWith('.css')) return { text:css }; if (id.includes('dsh-client-ui-primitives')) return primitives; return reactRequire(id) } }
  vm.runInNewContext(code, context)
  view = context.module.exports
}
const full = () => ({ checkedFor:'A', settingsFor:'A', busy:false, uncertain:false, settings:{ revision:'r1', ttsSetup:{ provider:'unconfigured',edgeVoice:'zh-CN-XiaoxiaoNeural',systemVoice:null,systemFallback:true,edgeTextTransmissionAccepted:false,volume:.8 } }, status:{ enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{ id:null,fullyStopped:true },ttsRuntime:{ busy:false,blocked:false,state:'idle' } } })
const render = (Component,state,sessionId='A') => renderToStaticMarkup(React.createElement(Component, { state,sessionId,run(){ throw Error('render must not issue commands') } }))
test('configuration gate rejects stale, active, missing, busy and blocked sources', { skip: !view }, () => {
  assert.equal(view.setupWritable(full(),'A'),true)
  for (const change of [{checkedFor:'B'},{settingsFor:'B'},{uncertain:true},{busy:true},{settings:null}]) assert.equal(view.setupWritable({...full(),...change},'A'),false)
  for (const change of [{enabled:true},{ownerSessionId:'A'},{voiceControlBusy:true},{voiceSession:{id:'voice',fullyStopped:true}},{voiceSession:{id:null,fullyStopped:false}},{ttsRuntime:{blocked:true}}]) assert.equal(view.setupWritable({...full(),status:{...full().status,...change}},'A'),false)
  assert.equal(view.setupWritable(full(),null),false)
})
test('new installation makes no selections, request, speech or consent on render', { skip: !view }, () => {
  const html=render(view.TtsSetupEditor,full())
  assert.doesNotMatch(html,/checked=""/)
  assert.match(html,/disabled=""[^>]*>试听已保存配置/)
  assert.match(render(view.SetupWizard,full(),null),/先在 DSH 侧栏新建或打开一个对话，再回到鱼应。/)
})
test('Edge names its recipient and cannot save an unaccepted legacy configuration', { skip: !view }, () => {
  const state=full();state.settings.ttsSetup.provider='edge'
  const html=render(view.TtsSetupEditor,state)
  assert.match(html,/朗读文字会发送给微软/);assert.doesNotMatch(html,/同意将朗读文本/)
  assert.doesNotMatch(html,/系统语音|type="checkbox"/)
  assert.match(html,/disabled=""[^>]*>保存朗读设置/)
})
test('Qwen recommendation does not enable installation and GPU needs verified model backend', { skip: !view }, () => {
  const state={...full(),installerFor:'A',installer:{hardware:{},compute:{backends:{}},models:[{id:'qwen3-tts-base-1.7b-gguf',title:'Qwen3-TTS',available:false,totalBytes:null,recommendation:{recommended:true,reason:'待运行时验证'}}],jobs:[]}}
  const html=render(view.ModelInstallerEditor,state)
  assert.match(html,/推荐/);assert.match(html,/暂不可安装/);assert.match(html,/待运行时验证/);assert.doesNotMatch(html,/CUDA/)
  assert.match(render(view.ModelInstallerEditor,{...state,installerFor:'B'}),/正在读取模型列表/)
})
test('active progress and collapsed installation history stay distinct', { skip: !view }, () => {
  const state={...full(),installerFor:'A',installer:{models:[],jobs:[{id:'one',modelId:'test',status:'running',stage:'verifying',receivedBytes:100,totalBytes:100,runtimeLoaded:false},{id:'two',modelId:'test',status:'installed',stage:'installed',receivedBytes:100,totalBytes:100,runtimeLoaded:false}]}}
  const html=render(view.ModelInstallerEditor,state)
  assert.match(html,/校验文件/);assert.match(html,/下载字节进度/);assert.match(html,/安装记录（1）/);assert.doesNotMatch(html,/未加载/);assert.match(html,/暂停，保留进度/);assert.match(html,/取消并清除此任务临时文件/);assert.match(html,/重新开麦后使用新模型/)
})

test('local model option exposes explicit download and honest CPU/source boundary without running it on render', { skip: !view }, () => {
  const state={...full(),installerFor:'A',installer:{hardware:{},compute:{backends:{}},models:[{id:'qwen3-tts-base-1.7b-gguf',purpose:'tts',title:'Qwen3-TTS',available:true,totalBytes:1500000000,recommendation:{recommended:true,reason:'实测短句约4.6GiB内存'}}],jobs:[]},installPlanFor:'A',installPlan:{modelId:'qwen3-tts-base-1.7b-gguf',compute:'cpu',planHash:'hash',totalBytes:1500000000,source:'https://model.example/model',runtime:{source:'https://runtime.example/runtime'},licenseUrls:[],destination:'/managed'}}
  const html=render(view.LocalTtsDownload,state)
  assert.match(html,/下载并使用/);assert.match(html,/无声合成公开示例/);assert.match(html,/CPU/);assert.match(html,/https:\/\/runtime.example\/runtime/)
  assert.doesNotMatch(html,/已加载|GPU 已可用/)
})

test('local reuse is opt-in, defaults Q8, fences edited plans and starts only on explicit action', () => {
  assert.match(source,/复用本机 Qwen 模型文件/)
  assert.match(source,/initialReuse = false/);assert.match(source,/\[reuse,setReuse\]=useState\(initialReuse\)/)
  assert.match(source,/\[modelVariant,setModelVariant\]=useState\('q8_0'\)/)
  assert.match(source,/installPlanRequest\?\.sourceDirectory/)
  assert.match(source,/if\(reuseActive\|\|!active/)
  assert.match(source,/验证并使用/)
  assert.match(source,/校验目录中的模型，并安装 b12110 运行组件/)
  assert.match(source,/sourceDirectory:plan.sourceDirectory,modelVariant:plan.modelVariant/)
})

 test('model inventory deduplicates repeated Qwen jobs without deleting any installation', {skip:!view},()=>{
 const installed=(id,path,time)=>({id,modelId:'qwen',purpose:'tts',status:'installed',stage:'installed',installedPath:path,compute:'cpu',createdAt:time,updatedAt:time,recommendedSettings:{tts:{provider:'local',localModelId:'qwen',localModelPath:path}}});
 const first=installed('one','/one','2026-01-01'),second=installed('two','/two','2026-01-02');
 const settings={ttsSetup:{provider:'local',localModelId:'qwen',localModelPath:'/one'}};
 const snapshot={models:[{id:'qwen',title:'Qwen3-TTS',purpose:'tts',available:true}],jobs:[first,second]};
 const cards=view.groupedModelCards(snapshot,settings);assert.equal(cards.length,1);assert.equal(cards[0].current.id,'one');assert.equal(cards[0].preferred.id,'one');assert.equal(cards[0].jobs.length,2);assert.equal(snapshot.jobs.length,2);
 const noCurrent=view.groupedModelCards(snapshot,{ttsSetup:{provider:'system'}});assert.equal(noCurrent[0].preferred.id,'two');
 const html=render(view.ModelInstallerEditor,{...full(),settings:{...full().settings,...settings},installerFor:'A',installer:{...snapshot,hardware:{},compute:{}}});
 assert.match(html,/切换当前模型/);assert.match(html,/安装记录（2）/);assert.match(html,/\/one/);assert.match(html,/\/two/);assert.equal((html.match(/type="radio"/g)||[]).length,1);assert.doesNotMatch(html,/检测硬件与后端/);
});
 test('unified advanced paths expose TTS directories and preserve explicit reuse consent', {skip:!view},()=>{const state={...full(),installerFor:'A',installer:{models:[],jobs:[],hardware:{},compute:{}}}; const html=render(view.LocalTtsPaths,state);assert.match(html,/朗读模型本地路径/);assert.match(html,/复用本机 Qwen 模型文件/);assert.doesNotMatch(html,/开始下载/)});
