import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import vm from 'node:vm'
import { isCompatHiddenVoiceId, makeCompatHiddenVoiceId } from '../voice-presentation-id.mjs'

const root = new URL('..', import.meta.url).pathname.replace(/^\//, '')
const uiRequire = createRequire(join(root, 'ui/package.json'))
const { transformSync } = uiRequire('esbuild')
const react = {
  createElement(type, props) { return { type, props } },
  useCallback(callback) { return callback },
  useEffect(callback) { callback() },
  useMemo(factory) { return factory() },
}
const module = { exports: {} }
const source = readFileSync(new URL('../ui/src/workspace-presentation.jsx', import.meta.url), 'utf8')
const transformed = transformSync(source, { loader: 'jsx', format: 'cjs', target: 'node24' }).code
vm.runInNewContext(transformed, {
  module,
  exports: module.exports,
  require(id) {
    if (id === 'react') return react
    if (id === '../../voice-presentation-id.mjs') return { isCompatHiddenVoiceId }
    return uiRequire(id)
  },
})
const { mountWorkspacePresentation } = module.exports

const childSlots = [
  'sidebar.workspaces.directoryFlow',
  'sidebar.workspaces.session.row.action',
  'sidebar.session.row.leading',
  'sidebar.session.row.trailing',
  'sidebar.session.row.hover',
]
function workspaceEntry(component = function WorkspaceBrowser() {}) {
  return {
    component,
    registrant: '@deepseek-ai/dsh-client-ui-workspace',
    locale: 'workspace',
    options: {},
    children: Object.fromEntries(childSlots.map(key => [key, {}])),
    inject: () => ({ open: () => {} }),
    store: { marker: 'official-store' },
  }
}
function slotFixture(initial = []) {
  let entries = initial
  const listeners = new Set()
  const roots = []
  let removedRoots = 0
  const slots = {
    entries(name) { assert.equal(name, 'sidebar.workspaces'); return entries },
    subscribe(name, listener) {
      assert.equal(name, 'sidebar.workspaces')
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    provideRoot(contribution) {
      roots.push(contribution)
      return () => { removedRoots++ }
    },
    replace(next) { entries = next; for (const listener of [...listeners]) listener() },
  }
  return { slots, roots, listeners, replace: next => slots.replace(next), removedRoots: () => removedRoots }
}

function summary(id, options = {}) {
  return { id, displayTitle: id, running: false, retainedBy: {}, blank: false, updatedAt: 1, ...options }
}

function renderEntry(entry, list, view, calls) {
  const originalOpen = id => calls.push({ kind: 'plain', value: id })
  const wrapperResult = entry.component({
    useSessions: selector => selector(list),
    useWhaleWorkspacePresentation: selector => selector(view),
    useSessionStatus: selector => selector(new Map()),
    useSessionAccess: () => true,
    useWorkspaceAccess: () => true,
    searchSessions: async () => ({ items: [], hasMore: false }),
    open: originalOpen,
    children: 'preserved child slot',
    renderSlot: 'preserved slot renderer',
    renderFactorySlot: 'preserved factory renderer',
    hooks: { original: true },
  })
  return wrapperResult.type.name === 'PresentedWorkspace'
    ? wrapperResult.type(wrapperResult.props)
    : wrapperResult
}

test('the stock sidebar entry receives an immutable root-scoped list projection and child-open route', () => {
  const stock = workspaceEntry(), fixture = slotFixture([stock]), calls = [], updates = []
  const normalId = 'ordinary-session'
  const voiceId = makeCompatHiddenVoiceId('5e6f4780-8200-4c04-8a4d-7c4ef2c16e09')
  const childId = 'child-session'
  const raw = {
    ids: [normalId, voiceId, childId],
    byId: {
      [normalId]: summary(normalId),
      [voiceId]: summary(voiceId),
      [childId]: summary(childId, { origin: 'subagent', parentId: 'parent-session' }),
    },
    phase: 'ready',
    projectionsBySession: {
      [voiceId]: { values: { privateVoiceProjection: true } },
      [childId]: { values: { retainedChildProjection: true } },
    },
  }
  const originalComponent = stock.component
  const originalChildren = stock.children
  const originalInject = stock.inject
  const adapter = mountWorkspacePresentation(fixture.slots, target => calls.push({ kind: 'workspace', value: target }))
  const rootSource = fixture.roots[0].hooks.whaleWorkspacePresentation
  assert.deepEqual(Object.keys(fixture.roots[0].hooks), ['whaleWorkspacePresentation'])
  assert.equal(rootSource.getSnapshot(), rootSource.getSnapshot(), 'root hook snapshots retain reference identity')
  assert.equal(adapter.supported(), false, 'support awaits the wrapped browser component’s first valid render')
  adapter.subscribe(() => updates.push(adapter.supported()))
  assert.equal(stock.children, originalChildren)
  assert.equal(stock.inject, originalInject)

  let view = rootSource.getSnapshot()
  let rendered = renderEntry(stock, raw, view, calls)
  assert.equal(adapter.supported(), true)
  let visible = rendered.props.useSessions(state => state)
  assert.equal(rendered.type, originalComponent)
  assert.equal(rendered.props.children, 'preserved child slot')
  assert.equal(rendered.props.renderSlot, 'preserved slot renderer')
  assert.equal(rendered.props.hooks.original, true)
  assert.deepEqual(visible.ids, [normalId, childId])
  assert.equal(visible.byId[voiceId], undefined)
  assert.equal(visible.projectionsBySession[voiceId], undefined)
  assert.equal(raw.byId[childId].origin, 'subagent', 'projection never mutates source summaries')

  assert.equal(adapter.setOverrides([{ id: childId, parentId: 'parent-session', mode: 'continuable' }]), true)
  view = rootSource.getSnapshot()
  rendered = renderEntry(stock, raw, view, calls)
  visible = rendered.props.useSessions(state => state)
  assert.deepEqual(visible.ids, [normalId, childId])
  assert.equal(visible.byId[childId].origin, undefined)
  assert.equal(visible.byId[childId].parentId, 'parent-session')
  assert.equal(raw.byId[childId].origin, 'subagent')
  rendered.props.open(childId)
  assert.equal(JSON.stringify(calls), JSON.stringify([{
    kind: 'workspace',
    value: { childSessionId: childId, parentSessionId: 'parent-session', mode: 'continuable' },
  }]))

  const voiceOverrides = [
    { id: voiceId, parentId: null, mode: null },
    { id: childId, parentId: 'parent-session', mode: 'continuable' },
  ]
  assert.equal(adapter.setOverrides(voiceOverrides), true)
  view = rootSource.getSnapshot()
  rendered = renderEntry(stock, raw, view, calls)
  visible = rendered.props.useSessions(state => state)
  assert.deepEqual(visible.ids, [normalId, voiceId, childId])
  assert.equal(visible.byId[voiceId], raw.byId[voiceId], 'a shown voice root uses its original summary')
  assert.equal(visible.byId[childId].origin, undefined)
  rendered.props.open(voiceId)
  assert.deepEqual(calls.at(-1), { kind: 'plain', value: voiceId })

  assert.equal(adapter.setOverrides([{ id: 'unverified-child', parentId: 'parent-session', mode: 'continuable' }]), true)
  view = rootSource.getSnapshot()
  visible = renderEntry(stock, raw, view, calls).props.useSessions(state => state)
  assert.equal(visible.byId[voiceId], undefined, 'removing the explicit root override hides the tagged root again')
  assert.equal(visible.byId[childId].origin, 'subagent', 'a child with no explicit verified override remains hidden')

  assert.equal(adapter.setOverrides([{ id: 'malformed', parentId: null, mode: 'continuable' }]), false)
  view = rootSource.getSnapshot()
  visible = renderEntry(stock, raw, view, calls).props.useSessions(state => state)
  assert.equal(visible.byId[voiceId], undefined, 'malformed refreshes fail closed')
  assert.ok(updates.length > 0)
  adapter.dispose()
  assert.equal(stock.component, originalComponent)
  assert.equal(adapter.supported(), false)
  assert.equal(fixture.listeners.size, 0)
  assert.equal(fixture.removedRoots(), 1)
})

test('HMR rewraps a new official entry and only restores the component it owns', () => {
  const first = workspaceEntry(), fixture = slotFixture([first])
  const adapter = mountWorkspacePresentation(fixture.slots, () => {})
  const originalFirst = first.component
  assert.equal(adapter.supported(), false)
  const wrapper = first.component
  first.component = function hostReplacement() {}
  fixture.replace([])
  assert.equal(first.component.name, 'hostReplacement', 'disposal never overwrites a later host owner')
  assert.equal(adapter.supported(), false)
  const second = workspaceEntry()
  const originalSecond = second.component
  fixture.replace([second])
  assert.equal(adapter.supported(), false)
  renderEntry(second, { ids: [], byId: {}, phase: 'ready', projectionsBySession: {} }, {
    revision: 1, items: [],
  }, [])
  assert.equal(adapter.supported(), true)
  assert.notEqual(second.component, originalSecond)
  adapter.dispose()
  assert.equal(second.component, originalSecond)
  assert.equal(first.component.name, 'hostReplacement')
  assert.notEqual(wrapper, second.component)
  assert.notEqual(originalFirst, originalSecond)
})

test('the adapter fails closed for ambiguous, foreign, or immutable slot owners', () => {
  const foreign = workspaceEntry(function ThirdPartyWorkspace() {})
  foreign.registrant = 'third-party-workspace'
  const fixture = slotFixture([foreign])
  const adapter = mountWorkspacePresentation(fixture.slots, () => {})
  assert.equal(adapter.supported(), false)
  assert.equal(foreign.component.name, 'ThirdPartyWorkspace')
  fixture.replace([workspaceEntry(), workspaceEntry()])
  assert.equal(adapter.supported(), false)
  const frozen = workspaceEntry()
  Object.freeze(frozen)
  fixture.replace([frozen])
  assert.equal(adapter.supported(), false)
  assert.equal(frozen.component.name, 'WorkspaceBrowser')
  adapter.dispose()
})
