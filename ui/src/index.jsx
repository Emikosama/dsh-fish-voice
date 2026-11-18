import { motionStyles } from './motion.jsx'
import { createConnectionRecovery } from './connection-recovery.mjs'
import { createController } from './controller.mjs'
import { createFloatingGeometry } from './geometry.mjs'
import { createPanelSizing } from './panel-sizing.mjs'
import { createUiPreferences } from './ui-preferences.mjs'
import { mountConversationClient } from '../conversation-client.mjs'
import { createClientOperationJournal } from './operation-log.mjs'
import { FloatingFrame, Controls } from './views.jsx'
import { en, zh } from './locales.mjs'
import css from './panel.module.css'
import { setupStyles } from './setup.jsx'
import { mountWorkspacePresentation } from './workspace-presentation.jsx'

const bundleId = typeof __WHALE_BUNDLE_ID__ === 'string' ? __WHALE_BUNDLE_ID__ : 'dsh-whale-ear-ui'

export const inject = ['slots', 'locale', 'remote', 'uiSession']

/** Register additive DSH UI contributions with reversible lifecycle ownership. */
export function apply(ctx) {
  const operations = createClientOperationJournal()
  const controller = createController(undefined, { observe:operations.internal })
  controller.enableAutomaticReads()
  const geometry = createFloatingGeometry()
  ctx.inject(['whaleFloatingLayout'], child => {
    child.effect(() => geometry.useLayoutService(child.whaleFloatingLayout), 'whale-voice: optional magnetic layout')
  })
  const preferences = createUiPreferences()
  const sizing = createPanelSizing(window, { onResize: size => geometry.fit(size) })
  let connection, refreshPresentation = () => {}
  ctx.effect(() => {
    const refresh=()=>{controller.setReadVisibility(document.visibilityState!=='hidden');if(document.visibilityState!=='hidden'){controller.refresh();connection?.refresh();refreshPresentation()}}
    window.addEventListener('focus',refresh);window.addEventListener('online',refresh);document.addEventListener('visibilitychange',refresh);refresh()
    return()=>{window.removeEventListener('focus',refresh);window.removeEventListener('online',refresh);document.removeEventListener('visibilitychange',refresh)}
  }, 'whale-voice: refresh visible state')
  ctx.effect(() => {
    const presentation = mountWorkspacePresentation(ctx.slots, target => ctx.get?.('uiWorkspace')?.openSession(target))
    let client, stopPresentation
    const stop = () => { stopPresentation?.(); stopPresentation = null }
    refreshPresentation = () => {
      if (!presentation.supported()) { stop(); return }
      if (!client || stopPresentation) return
      const source = client
      let initial = true
      stopPresentation = client.subscribePresentation(value => {
        presentation.setOverrides(value.shown)
        if (initial) { initial = false; controller.refresh({ force: true }) }
      }, error => {
        if (client !== source) return
        stop()
        console.warn('鱼应侧栏会话显示连接中断', error?.message ?? error)
      })
    }
    const unsubscribePresentation = presentation.subscribe(refreshPresentation)
    let priorConnectionFailure = false
    connection=createConnectionRecovery(async () => {
      const action = priorConnectionFailure ? 'ui-reconnect' : 'ui-connect'
      operations.internal(action, 'requested')
      try {
        const next = await mountConversationClient(ctx, operations.internal)
        operations.internal(action, 'finished', 'ok')
        return next
      } catch (error) {
        priorConnectionFailure = true
        operations.internal(action, 'finished', 'failed')
        throw error
      }
    },{
      visible:()=>controller.getSnapshot().readVisible!==false,
      onReady:next=>{stop();client=next;operations.attach(next);controller.attachConversationClient(next);refreshPresentation()},
      onError:error=>controller.conversationUnavailable(error),
    })
    let visible=controller.getSnapshot().readVisible
    const unsubscribe=controller.subscribe(()=>{const next=controller.getSnapshot().readVisible;if(next!==visible){visible=next;connection.visibilityChanged()}})
    void connection.start()
    return()=>{refreshPresentation=()=>{};stop();unsubscribePresentation();presentation.dispose();unsubscribe();operations.dispose();connection.dispose();controller.dispose()}
  }, 'whale-voice: private conversation stream')
  ctx.effect(() => () => { controller.dispose(); sizing.dispose(); geometry.dispose(); preferences.dispose() }, 'whale-ear-ui: state and geometry')
  ctx.effect(() => ctx.locale.register('whaleEar', { en, zh }), 'whale-ear-ui: dictionaries')
  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.plugin = 'dsh-whale-ear-ui'
    tag.textContent = css.text + setupStyles + motionStyles
    document.head.append(tag)
    return () => tag.remove()
  }, 'whale-ear-ui: stylesheet')
  const nativeSessions = async id => {
    const sessions = ctx.get?.('sessions')
    if (!sessions) throw new Error('DSH 会话界面尚未就绪，请稍后重试。')
    // Whale can create a durable root outside the browser's current catalog.
    if (!sessions.list.getSnapshot().byId[id]) await sessions.refresh()
    return sessions
  }
  let managedOpenIntent = 0
  const openManagedSession = async row => {
    const intent = ++managedOpenIntent
    if (row.kind === 'root') await nativeSessions(row.id)
    if (intent !== managedOpenIntent) return
    const workspace = ctx.get?.('uiWorkspace')
    if (!workspace?.openSession) throw new Error('DSH 会话界面尚未就绪，请稍后重试。')
    return workspace.openSession(row.kind === 'root' ? row.id : {
      childSessionId: row.id, parentSessionId: row.parentId, mode: row.mode ?? 'unknown',
    })
  }
  const openExistingVoiceSession = id => openManagedSession({ kind:'root', id })
  // A child history tab is a view, including after its Agent has exited. Use
  // the owner's existing sessionless panel route rather than borrowing that ID.
  const controlContext = {
    subscribe(listener) {
      return ctx.get?.('sessions')?.list?.subscribe?.(listener) ?? (() => {})
    },
    sourceFor(id) {
      if (!id) return null
      const sessions = ctx.get?.('sessions')
      const row = sessions?.list?.getSnapshot()?.byId?.[id]
      return sessions?.subagentAddress?.(id) || row?.origin === 'subagent' || row?.parentId ? null : id
    },
  }
  const renameManagedSession = async (id, title) => {
    const sessions = await nativeSessions(id)
    const result = await sessions.using(id, { source: 'workspaceOperation' }, reference => reference.binding.session.rename(title))
    if (!result.ok) throw new Error(result.error.message)
    return result.value.title
  }
  const injected = () => ({ captureBindings:controller.captureBindings, refreshModelCompute:controller.refreshModelCompute, pickPath:controller.pickPath,readState:controller.getSnapshot,markSettingsEdited:controller.markSettingsEdited,discardSettingsDraft:controller.discardSettingsDraft,openAuthorization:controller.openAuthorization,closeAuthorization:controller.closeAuthorization,saveAuthorization:controller.saveAuthorization, repairRequest:controller.repairRequest, dismissRepair:controller.dismissRepair, readOperationLog:controller.readOperationLog, manageSessions:controller.manageSessions, listExistingVoiceSessions:controller.listExistingVoiceSessions, setExistingVoiceSession:controller.setExistingVoiceSession, setSettingsTab:controller.setSettingsTab, setSettingsModelTab:controller.setSettingsModelTab, setSessionManagement:controller.setSessionManagement, whisperAsrAction:controller.whisperAsrAction, updateAction:controller.updateAction, dismissUpdate:controller.dismissUpdate, openExistingVoiceSession, openManagedSession, renameManagedSession, hooks: { whaleUi: controller, whalePreferences: preferences }, setMotion: value => preferences.setMotion(value), setAssistantName: value => preferences.setAssistantName(value), run: (...args) => controller.run(...args), setSession: id => controller.setSession(id), cancelPreview: () => controller.cancelPreview(), discardDiagnostics: () => controller.discardDiagnostics(), dismissSetup: () => controller.dismissSetup(), openSetup: () => controller.openSetup(), showHome: () => controller.showHome(), openSettings: controller.openSettings, refresh: () => controller.refresh() })
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay', id: 'whale-ear', locale: 'whaleEar', inject: () => ({ geometry, sizing, recordUserOperation:operations.user, setPanelVisible:controller.setPanelVisible, closeAuthorization:controller.closeAuthorization, refresh: () => controller.refresh(), showHome: () => controller.showHome(), dismissSetup: () => controller.dismissSetup(), hooks: { whaleUi: controller, whalePreferences: preferences } }),
    children: { 'whale-ear.panel.controls': { kind: 'single', scope: 'session-maybe' } },
  }, FloatingFrame))
  ctx.slots.inject('whale-ear.panel.controls', () => ctx.slots.register({ name: 'whale-ear.panel.controls', locale: 'whaleEar', inject: () => ({...injected(), controlContext}) }, Controls))
}
