/** Renderer regressions for honest fallback status and reachable cancellation. */
import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import vm from 'node:vm'
// Match setup-views.test.mjs: renderer checks require a verified local DSH toolchain.
let view, React, renderToStaticMarkup
const toolchain = process.env.DSH_SOURCE_ROOT
if (toolchain) {
  const require = createRequire(toolchain + '/package.json')
  const { transformSync } = createRequire(require.resolve('vite/package.json'))('esbuild')
  const reactRequire = createRequire(toolchain + '/packages/client/ui-primitives/package.json')
  React = reactRequire('react')
  ;({ renderToStaticMarkup } = reactRequire('react-dom/server'))
  const source = readFileSync(new URL('../src/setup.jsx', import.meta.url), 'utf8')
  const native = tag => ({ children, ...props }) => React.createElement(tag, props, children)
  const primitives = { Button: native('button'), Input: native('input'), MenuSurface: native('div'), Checkbox: ({ label, ...props }) => React.createElement('label', null, React.createElement('input', { ...props, type: 'checkbox' }), label) }
  const context = { module: { exports: {} }, require(id) { if(id==='./path-field.jsx'||id==='./motion.jsx'){const child={...context,AbortController,module:{exports:{}}};vm.runInNewContext(transformSync(readFileSync(new URL('../src/'+id.slice(2),import.meta.url),'utf8'),{loader:'jsx',format:'cjs',jsx:'automatic'}).code,child);return child.module.exports} if (id.endsWith('.css')) return { text: '' }; if (id.includes('dsh-client-ui-primitives')) return primitives; return reactRequire(id) } }
  vm.runInNewContext(transformSync(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code, context)
  view = context.module.exports
}
const state=()=>({checkedFor:'A',settingsFor:'A',busy:false,uncertain:false,ttsUncertain:false,settings:{revision:'r1',ttsSetup:{provider:'deepseek',deepseekVoice:'stella',deepseekTextTransmissionAccepted:true,volume:.8}},authorization:{scopes:[{id:'deepseek-text',allowed:true}]},status:{enabled:false,ownerSessionId:null,voiceControlBusy:false,voiceSession:{id:null,fullyStopped:true},ttsRuntime:{busy:false,blocked:false,state:'idle'}}})
const render=state=>renderToStaticMarkup(React.createElement(view.TtsSetupEditor,{state,sessionId:'A',run(){}}))
test('DeepSeek preview reports an invalid key in live status', { skip: !view },()=>{
  const value={...state(),ttsPreviewFor:'A',ttsPreview:{status:'failed',provider:'deepseek',detail:'DeepSeek API Key 无效或已失效'}}
  const messages=[...render(value).matchAll(/<p\s+role="status"[^>]*>(.*?)<\/p>/g)].map(m=>m[1]).join('\n')
  assert.match(messages,/DeepSeek API Key 无效或已失效/)
})
test('unknown preview outcome keeps an immediate stop control available', { skip: !view },()=>{
  const value={...state(),ttsPreviewFor:'A',ttsPreview:{status:'failed'},ttsUncertain:true}
  const stop=render(value).match(/<button\b([^>]*)>停止试听<\/button>/)
  assert.ok(stop)
  assert.doesNotMatch(stop[1],/\bdisabled=/)
})

test('saved CPU-only Qwen installation is identified without claiming the GPU is active', { skip: !view },()=>{
  const value=state();value.settings.ttsSetup={...value.settings.ttsSetup,provider:'local',localModelId:'qwen3-tts-base-1.7b-gguf',localModelPath:'/synthetic/installed'}
  value.installerFor='A';value.installer={jobs:[{status:'installed',purpose:'tts',modelId:'qwen3-tts-base-1.7b-gguf',installedPath:'/synthetic/installed',compute:'cpu'}]}
  const html=render(value);assert.match(html,/当前安装方案：CPU/);assert.match(html,/此安装只使用 CPU/);assert.match(html,/下载运行组件前仍需确认/)
  value.installerFor='B';assert.doesNotMatch(render(value),/当前安装方案：CPU/)
})
test('completed numeric timings stay in details and disclose per-chunk cold starts', { skip: !view },()=>{
  const value=state();value.status.ttsRuntime={...value.status.ttsRuntime,state:'completed',localTimings:{preparationMs:300,deviceSelectionMs:100,synthesisMs:2000,playbackMs:1000,totalMs:3400,chunks:2,modelResident:false}}
  const html=render(value);assert.match(html,/<details[^>]*><summary>已完成朗读片段耗时/);assert.match(html,/准备 0.30 秒/);assert.match(html,/合成 2.00 秒/);assert.match(html,/当前本地模型逐段启动，完整合成后播放/)
})
