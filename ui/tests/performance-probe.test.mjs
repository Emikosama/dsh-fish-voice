import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import vm from 'node:vm'
import { zh, en } from '../src/locales.mjs'
const views = readFileSync(new URL('../src/views.jsx', import.meta.url), 'utf8')
const setup = readFileSync(new URL('../src/setup.jsx', import.meta.url), 'utf8')
test('performance diagnostics retain model probe details outside first setup', () => {
  assert.doesNotMatch(setup, /模型检测与费用|按模型计费/)
  assert.match(views, /<summary>检测范围与费用<\/summary><p>\{t\('performanceProbeCost'\)\}/)
  for (const locale of [zh, en]) {
    for (const key of ['performanceProbeCost','performanceProbeScope','performanceProbeUnknown','performanceProbeAccepted']) assert.ok(locale[key])
  }
  assert.match(zh.performanceProbeCost, /最多 3 个固定短请求/)
  assert.match(zh.performanceProbeCost, /计费/)
  assert.doesNotMatch(zh.performanceProbeCost, /不包含聊天历史/)
})
let render
if (process.env.DSH_SOURCE_ROOT) {
  const root = process.env.DSH_SOURCE_ROOT
  const hostRequire = createRequire(join(root, 'package.json'))
  const { transformSync } = createRequire(hostRequire.resolve('vite/package.json'))('esbuild')
  const require = createRequire(join(root, 'packages/client/ui-primitives/package.json'))
  const React = require('react'), { renderToStaticMarkup } = require('react-dom/server')
  const source = views.slice(views.indexOf('export function PerformanceProbeStatus'), views.indexOf('function PerformanceEditor'))
  const context = { module: { exports: {} }, require, css: {} }
  vm.runInNewContext(transformSync(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code, context)
  render = (capability, compact = false) => renderToStaticMarkup(React.createElement(context.module.exports.PerformanceProbeStatus, { capability, compact, t: key => zh[key] }))
}
test('the performance status explains blocked fast and distinguishes temporary unknown', { skip: !render }, () => {
  const blocked = { modes: [{performanceMode:'fast',reason:'host_contract_blocked',available:false}] }
  const host = render(blocked)
  assert.match(host,/无法确认关闭思考/)
  assert.match(render(blocked,true),/跟随模型/)
  assert.doesNotMatch(host,/提供商已明确拒绝/)
  const unknown = render({ probe:{status:'unknown'},modes:[{reason:'unknown',available:true}] })
  assert.match(unknown,/暂未确认/)
  assert.match(unknown,/重新检测/)
  assert.doesNotMatch(unknown,/提供商已明确拒绝/)
})
test('successful request reports the interface check and compact display avoids extra success chatter', { skip: !render }, () => {
  const result = {modes:[{reason:'accepted',available:true}]}
  assert.match(render(result),/档位请求检测通过/)
  assert.doesNotMatch(render(result,true),/档位请求检测通过/)
  assert.match(render({probe:{status:'pending'}}),/正在检查/)
})
