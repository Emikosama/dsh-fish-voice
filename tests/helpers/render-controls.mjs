/** Production Controls in a DOM, with only host visual primitives substituted. */
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import vm from 'node:vm'
export const renderAvailable = Boolean(process.env.DSH_SOURCE_ROOT || process.env.WHALE_RENDER_DEPS && process.env.WHALE_REACT_DEPS)
export async function renderControls(t, f) {
  const host = process.env.DSH_SOURCE_ROOT, renderDeps = process.env.WHALE_RENDER_DEPS, reactDeps = process.env.WHALE_REACT_DEPS
  const buildRequire = createRequire(join(renderDeps || host, 'package.json'))
  const { transformSync } = renderDeps ? buildRequire('esbuild') : createRequire(buildRequire.resolve('vite/package.json'))('esbuild')
  const { JSDOM } = buildRequire('jsdom'), dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost' })
  const previous = Object.fromEntries(['window', 'document', 'navigator', 'IS_REACT_ACT_ENVIRONMENT'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, IS_REACT_ACT_ENVIRONMENT: true })) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
  const require = createRequire(join(reactDeps || join(host, 'packages/client/ui-primitives'), 'package.json'))
  const React = require('react'), { createRoot } = require('react-dom/client'), act = React.act ?? require('react-dom/test-utils').act
  const native = tag => React.forwardRef(({ children, variant, ...props }, ref) => React.createElement(tag, { ...props, ref }, children))
  const primitives = { Button: native('button'), Input: native('input'), MenuSurface: native('div'), Checkbox: ({ label, ...props }) => React.createElement('label', null, React.createElement('input', { ...props, type: 'checkbox' }), label) }
  const modules = new Map(), load = name => {
    if (modules.has(name)) return modules.get(name)
    const scope = { window:dom.window, setTimeout,clearTimeout, AbortController, module: { exports: {} }, document: dom.window.document, require(id) {
      if (id.endsWith('.css')) return { text: '' }
      if (id === '@deepseek-ai/dsh-client-ui-primitives') return primitives
      return id.startsWith('./') ? load(id.slice(2)) : require(id)
    } }
    vm.runInNewContext(transformSync(readFileSync(join(import.meta.dirname, '../../ui/src', name), 'utf8'), { loader: name.endsWith('.jsx') ? 'jsx' : 'js', format: 'cjs', jsx: 'automatic' }).code, scope)
    modules.set(name, scope.module.exports); return scope.module.exports
  }
  const { Controls } = load('views.jsx'), { zh } = load('locales.mjs'), root = createRoot(document.getElementById('root'))
  const container = document.getElementById('root')
  const props = { captureBindings:f.controller.captureBindings, sessionId: f.owner.id, t: key => zh[key] ?? key, pickPath: f.controller.pickPath, run: f.controller.run, readState: f.controller.getSnapshot,
    useWhaleUi: select => select(React.useSyncExternalStore(f.controller.subscribe, f.controller.getSnapshot)), openSettings: f.controller.openSettings, showHome: f.controller.showHome, cancelPreview: f.controller.cancelPreview, discardDiagnostics: f.controller.discardDiagnostics,
    markSettingsEdited:f.controller.markSettingsEdited,discardSettingsDraft:f.controller.discardSettingsDraft,
    setSettingsTab:f.controller.setSettingsTab,setSettingsModelTab:f.controller.setSettingsModelTab,setSessionManagement:f.controller.setSessionManagement,
    useWhalePreferences: select => select({ motion: 'spring', error: null }), openSetup: f.controller.openSetup, ...f.props }
  await act(async () => root.render(React.createElement(Controls, props)))
  let closed = false
  const close = async () => {
    if (closed) return
    closed = true
    await act(async () => root.unmount()); dom.window.close()
    for (const [key, descriptor] of Object.entries(previous)) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key] }
  }
  t.after(close)
  return { container, act, close, button: text => [...container.querySelectorAll('button')].find(button => button.textContent === text) }
}
