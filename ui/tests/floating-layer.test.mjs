import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import vm from 'node:vm'
import { createFloatingGeometry } from '../src/geometry.mjs'
const available = Boolean(process.env.WHALE_RENDER_DEPS && process.env.WHALE_REACT_DEPS)

test('floating surface escapes shell stacking while retaining bounds, focus, collapse and cleanup', { skip: !available }, async () => {
  const buildRequire = createRequire(join(process.env.WHALE_RENDER_DEPS, 'package.json'))
  const require = createRequire(join(process.env.WHALE_REACT_DEPS, 'package.json'))
  const { JSDOM } = buildRequire('jsdom'), { transformSync } = buildRequire('esbuild')
  const dom = new JSDOM('<body><div data-shell-overlay style="position:fixed;z-index:20"><div id="root"></div></div><nav style="position:fixed;z-index:100">对话 轨迹 上下文</nav></body>', { url: 'http://localhost', pretendToBeVisual: true })
  const { window } = dom, { document } = window
  window.ResizeObserver = class { observe() {} disconnect() {} }
  window.HTMLElement.prototype.getBoundingClientRect = function () {
    if (this.hasAttribute('data-shell-overlay')) return { left: 10, top: 48, right: 900, bottom: 700, width: 890, height: 652 }
    const width = this.hasAttribute('data-collapsed') ? 216 : 320, height = this.hasAttribute('data-collapsed') ? 44 : 300
    return { width, height, left: parseFloat(this.style.left) || 0, top: parseFloat(this.style.top) || 0 }
  }
  const old = Object.fromEntries(['window', 'document', 'navigator', 'IS_REACT_ACT_ENVIRONMENT'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  for (const [key, value] of Object.entries({ window, document, navigator: window.navigator, IS_REACT_ACT_ENVIRONMENT: true })) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
  const React = require('react'), { createRoot } = require('react-dom/client'), act = React.act ?? require('react-dom/test-utils').act
  const native = tag => ({ children, variant, ...props }) => React.createElement(tag, props, children)
  const primitives = { Button: native('button'), Input: native('input'), Checkbox: native('input'), MenuSurface: native('div') }
  const modules = new Map(), load = name => {
    if (modules.has(name)) return modules.get(name)
    const scope = { module: { exports: {} }, document, requestAnimationFrame: fn => window.requestAnimationFrame(fn), require(id) { if (id.endsWith('.css')) return { floating: 'test-floating' };if(id==='../../package.json')return JSON.parse(readFileSync(new URL('../../package.json',import.meta.url),'utf8'));  if (id === '@deepseek-ai/dsh-client-ui-primitives') return primitives; return id.startsWith('./') ? load(id.slice(2)) : require(id) } }
    vm.runInNewContext(transformSync(readFileSync(join(import.meta.dirname, '../src', name), 'utf8'), { loader: name.endsWith('.jsx') ? 'jsx' : 'js', format: 'cjs', jsx: 'automatic' }).code, scope)
    modules.set(name, scope.module.exports); return scope.module.exports
  }
  const { FloatingFrame } = load('views.jsx'), geometry = createFloatingGeometry(window)
  let registration, controls, shown = []
  geometry.useLayoutService({ version: 1, register(value) { registration = value; return Object.fromEntries(['beginDrag','move','endDrag','resize','detach','dispose','activate'].map(name => [name, () => name === 'activate' && value.onFront(true)])) } })
  const props = { geometry, sizing: { ref() {}, contentRef() {}, update() {} }, t: key => key, useWhalePreferences: read => read({ motion: 'off' }), useWhaleUi: read => read({ panelView: 'home' }), setPanelVisible: value => shown.push(value), renderSlot(_name, args) { controls = args; return React.createElement('input', { 'aria-label': '浮窗输入' }) } }
  const root = createRoot(document.getElementById('root'))
  try {
    await act(async () => root.render(React.createElement(FloatingFrame, props)))
    const panel = document.querySelector('[data-whale-panel]'), input = panel.querySelector('input')
    assert.equal(panel.parentElement, document.body, 'not trapped in the z20 shell')
    assert.equal(document.querySelector('[data-shell-overlay] [data-whale-panel]'), null)
    assert.deepEqual(registration.read().bounds, { x: 22, y: 60, width: 866, height: 628 }, 'portal still uses the public shell boundary')
    await act(async () => input.focus()); assert.equal(document.activeElement, input); assert.equal(panel.style.zIndex, '901')
    await act(async () => controls.collapse()); assert.equal(panel.hasAttribute('data-collapsed'), true)
    await act(async () => controls.expand()); assert.equal(panel.hasAttribute('data-collapsed'), false)
    assert.equal(document.querySelector('[data-whale-panel]'), panel, 'collapse preserves the stable mounted root')
    assert.deepEqual(shown, [true, false, true])
    await act(async () => root.unmount()); assert.equal(document.querySelector('[data-whale-panel]'), null)
    assert.equal(document.querySelectorAll('nav').length, 1, 'host siblings untouched')
  } finally {
    geometry.dispose(); dom.window.close()
    for (const [key, value] of Object.entries(old)) { if (value) Object.defineProperty(globalThis, key, value); else delete globalThis[key] }
  }
})
