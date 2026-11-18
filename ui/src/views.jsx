import { createPortal } from 'react-dom'
import { ConversationView } from './conversation-view.jsx'
import { compactVoiceState, liveVoiceRootId } from './conversation-view.mjs'
import { MotionRange, MotionCollapse, MotionToggle } from './motion.jsx'
import { PathField } from './path-field.jsx'
import { AudioDeviceControls } from './audio-device-controls.jsx'
import { ExistingSessionBinding, CurrentDshConversation, canOpenExistingSession, existingBindingIdle, sessionName, sessionAvailability } from './existing-session.jsx'
import { UpdateDialog, UpdateSettings } from './update-view.jsx'
import { classifyUserOperation } from './operation-view-events.mjs'
import { OperationLogView } from './operation-log-view.jsx'
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Button, Input, Checkbox, MenuSurface } from '@deepseek-ai/dsh-client-ui-primitives'
import { WhaleMark, Icon } from './icons.jsx'
import { mayStartDrag, capturedBinding } from './ui-preferences.mjs'
import css from './panel.module.css'
import {LISTEN_MODES,modeLabel,wakeLabel,parseWakeAliases,validWakeAliases} from './listen-modes.mjs'
import { TtsSetupEditor, ModelInstallerEditor, InstalledModelSwitcher, LocalTtsPaths, SetupWizard } from './setup.jsx'
import { author as projectAuthor, homepage as projectHomepage, name as projectPackage } from '../../package.json'

const needsSetup = state => state.setupOpen || state.setupStatus?.completed !== true
const existingSessionStartErrors = {
  ARCHIVED: '绑定的会话已归档。恢复原会话或更换绑定后再开始语音。',
  BUSY: '绑定的会话正在处理消息。等这轮结束后再开始语音。',
  UNAVAILABLE: '绑定的会话暂不可用。可更换绑定或解除绑定。',
}
const showsAuthorization = state => state.authorizationOpen || state.authorizationLoading && !state.authorization

/** One stable floating root owns every surface; only its content and measured size change. */
export function FloatingFrame(props) {
  const [collapsed, setCollapsed] = useState(false)
  const frame = useRef(null)
  const viewport = useRef(null)
  const gesture = useRef(null)
  const previousView = useRef(null)
  const preferences = props.useWhalePreferences(value => value)
  const state = props.useWhaleUi(value => value)
  const authorization = showsAuthorization(state)
  const view = authorization||needsSetup(state) ? 'setup' : state.panelView ?? 'home'
  const compact = collapsed && view !== 'settings'
  const frameRef = useCallback(node => { frame.current=node; props.geometry.ref(node); props.sizing.ref(node) }, [props.geometry, props.sizing])
  const contentRef = useCallback(node => { viewport.current=node; props.sizing.contentRef(node) }, [props.sizing])
  useEffect(() => { props.setPanelVisible?.(!compact) }, [compact])
  useLayoutEffect(() => { if(viewport.current) viewport.current.scrollTop=0 }, [view])
  useLayoutEffect(() => props.sizing.update(), [view, compact, authorization, state.sourcePending])
  useEffect(() => {
    const panel = frame.current
    const document = panel?.ownerDocument
    if (previousView.current && panel && document && (document.activeElement === document.body || panel.contains(document.activeElement))) {
      if (view === 'home') panel.querySelector('[data-whale-settings-trigger]')?.focus({ preventScroll:true })
      else if (view !== previousView.current) panel.focus({ preventScroll:true })
    }
    previousView.current = view
  }, [view])
  const observeControl = event => {
    const operation = classifyUserOperation(event)
    if (operation) props.recordUserOperation?.(operation)
  }
  const collapse = () => { setCollapsed(true); requestAnimationFrame(() => frame.current?.querySelector('[data-whale-reopen]')?.focus()) }
  const expand = () => { props.refresh?.(); setCollapsed(false); requestAnimationFrame(() => frame.current?.focus()) }
  return createPortal(<section ref={frameRef} className={css.floating} data-whale-panel data-view={view}
    data-collapsed={compact || undefined} data-source-pending={state.sourcePending || undefined} data-motion={preferences.motion} tabIndex={0} aria-label={props.t('drag')} title={props.t('dragHint')}
    onPointerDownCapture={() => props.geometry.activate?.()} onFocusCapture={() => props.geometry.activate?.()}
    onPointerDown={event => {
      if (event.button !== 0 || event.pointerType && event.pointerType !== 'mouse' || !mayStartDrag(event.target, event.currentTarget)) { gesture.current = null; return }
      const node=event.target, rect=node.getBoundingClientRect?.()
      if (rect && node.scrollHeight>node.clientHeight && node.offsetWidth>node.clientWidth && event.clientX>=rect.left+node.clientLeft+node.clientWidth) return
      gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false }
      if (!event.target.closest?.('button')) event.currentTarget.focus({ preventScroll: true })
      props.geometry.pointerDown(event, event.target.closest?.('[data-drag-surface]') ?? event.currentTarget)
    }}
    onPointerMove={event => { const drag = gesture.current; if (!drag || event.pointerId !== drag.id) return; if (Math.hypot(event.clientX-drag.x,event.clientY-drag.y) >= 4) drag.moved=true; props.geometry.pointerMove(event) }}
    onPointerUp={event => {
      if (event.nativeEvent?.isTrusted && gesture.current?.id === event.pointerId && gesture.current.moved) props.recordUserOperation?.('panel-move')
      props.geometry.pointerEnd(event)
    }} onPointerCancel={event => { props.geometry.pointerEnd(event); gesture.current=null }}
    onLostPointerCapture={props.geometry.pointerEnd}
    onClickCapture={event => {
      if (gesture.current?.moved && event.detail !== 0) { event.preventDefault(); event.stopPropagation() }
      else observeControl(event)
      gesture.current = null
    }}
    onChangeCapture={observeControl} onSubmitCapture={observeControl} onKeyDownCapture={observeControl}
    onKeyDown={event => {
      if (event.key !== 'Escape') return
      event.stopPropagation()
      if (view === 'setup' && !compact) collapse()
      else if (view === 'settings') void props.showHome()
      else if (!compact) collapse()
    }}>
    <div ref={contentRef} className={css.panelViewport} data-whale-content>
      {props.renderSlot('whale-ear.panel.controls', { collapsed:compact, collapse, expand })}
    </div>
  </section>, document.body)
}

const noSubscription = () => () => {}

/** Keep the panel's source consistent for status, subscriptions and subsequent owner actions. */
export function Controls(props) {
  const { controlContext } = props
  const source = useSyncExternalStore(controlContext?.subscribe ?? noSubscription,
    () => controlContext ? controlContext.sourceFor(controlContext.selectedSession()) : props.sessionId ?? null)
  const currentConversationId = useSyncExternalStore(controlContext?.subscribe ?? noSubscription, () => {
    const current = controlContext?.currentConversation()
    return current === source ? current : null
  })
  props = { ...props, sessionId: source, currentConversationId }
  const state=props.useWhaleUi(value=>value)
  const [updateOpen, setUpdateOpen] = useState(false)
  useLayoutEffect(() => { props.setSession?.(source) }, [source])
  const authorization = showsAuthorization(state)
  const updateVersion = state.updates?.release?.version
  const autoUpdate = !props.collapsed && !authorization && !needsSetup(state)
    && state.panelView === 'home' && state.checkedFor === props.sessionId && state.status?.enabled === false && state.status.ownerSessionId === null
    && !state.status.voiceControlBusy && state.status.voiceSession?.fullyStopped !== false
    && !state.busy && !state.uncertain && !state.updatesUnavailable && state.updates?.status === 'available'
    && updateVersion && updateVersion !== state.dismissedUpdateVersion
  useEffect(() => { if (autoUpdate) setUpdateOpen(true) }, [autoUpdate])
  if (authorization || needsSetup(state)) {
    const inSetup = needsSetup(state)
    return <>
      {props.collapsed && <ReopenButton t={props.t} expand={props.expand}/>}
      {authorization
        ? <div hidden={props.collapsed}><Authorization state={state} save={props.saveAuthorization} close={inSetup?props.collapse:props.closeAuthorization} continueSetup={inSetup?()=>props.closeAuthorization({resumeSetup:true}):null}/></div>
        : <div role="dialog" aria-modal="false" aria-label="鱼应首次配置" data-whale-setup hidden={props.collapsed}>
          <SetupWizard pickPath={props.pickPath} state={state} sessionId={props.sessionId} run={props.run} onDismiss={props.dismissSetup} onMinimize={props.collapse} onBackToAuthorization={props.openAuthorization} asrStatus={<SenseVoiceProgress action={props.senseVoiceAsrAction} active={!props.collapsed}/>}/>
        </div>}
    </>
  }
  const openUpdate = check => {
    setUpdateOpen(true)
    if (check) void props.updateAction?.({ action:'check' })
  }
  const closeUpdate = () => { props.dismissUpdate?.(updateVersion); setUpdateOpen(false) }
  return <>
    {state.panelView==='settings' ? <Settings {...props} openUpdate={openUpdate}/> : <HomeControls {...props}/>}
    {updateOpen && <UpdateDialog state={state} close={closeUpdate} run={props.updateAction} t={props.t}/>}
  </>
}

export function Authorization({state,save,close,continueSetup}) {
  const value=state.authorization,busy=state.authorizationBusy||state.authorizationLoading
  const accepted=value?.usageAgreement?.accepted===true
  const agreement=value?.usageAgreement?.text??[]
  return <section role="dialog" aria-modal="false" aria-label="鱼应使用协议" data-whale-authorization data-whale-intrinsic className={`${css.settings} ${css.authorization}`}>
    <header className={css.settingsHeader}><WhaleMark/><h2>{accepted?'鱼应使用协议':'欢迎使用鱼应'}</h2>{accepted&&!continueSetup&&<Button variant="outline" disabled={busy} onClick={close}>返回</Button>}</header>
    <div className={css.authorizationBody} data-whale-authorization-body data-no-drag><div data-whale-natural-content>
      {!accepted&&<p className={css.authorizationSteps}>1 使用协议　·　2 基础配置</p>}
      <h3>鱼应操作范围</h3>
      <div className={css.agreement}>{agreement.map(text=><p key={text}>{text}</p>)}</div>
      {state.authorizationLoading&&!value&&<p role="status" className={css.hint}>正在读取…</p>}
      {value&&<details className={css.section}><summary>服务与模型来源</summary><ul className={css.permissionList}>{value.scopes.map(scope=><li key={scope.id}><strong>{scope.title}</strong><p className={css.hint}>{scope.description}</p></li>)}</ul>{value.modelSources.map(source=><div key={source.modelId}><strong>{source.modelId}</strong><p className={css.hint}>{source.source}</p>{source.runtime&&<p className={css.hint}>运行组件：{(source.runtime.sources??[source.runtime.source]).join('、')}</p>}<p className={css.hint}>{source.licenseNote}</p>{source.licenseUrls.map(url=><p key={url} className={css.hint}><a href={url} target="_blank" rel="noreferrer">{url}</a></p>)}</div>)}</details>}
      {(state.authorizationError||value?.revocationUnconfirmed)&&<p role="alert" className={css.error}>{value?.revocationUnconfirmed?'停止设备尚未确认，请检查或重启宿主。':state.authorizationUncertain?'保存结果待确认，正在核查。':'暂时无法读取，请稍后重试。'}</p>}
    </div></div><div className={`${css.actions} ${css.authorizationActions}`}>
      <Button className={css.primary} variant="primary" disabled={!value||busy||state.authorizationUncertain} onClick={()=>accepted&&value?.granted?(continueSetup??close)():void save(true)}>{accepted&&value?.granted?(continueSetup?'继续配置':'返回'):'一键授权并继续'}</Button>
      <Button variant="outline" disabled={busy} onClick={accepted&&value?.granted&&!continueSetup?()=>void save(false):close}>{accepted&&value?.granted?(continueSetup?'稍后':'撤销授权'):'暂不使用'}</Button>
    </div>
    {!accepted&&<p className={css.hint}>下一步：选择说话方式与语音模型</p>}
  </section>
}

function ReopenButton({t,expand,markState='idle',compactState='off',enabled=false}) {
  return <Button className={css.bubble} data-whale-reopen data-whale-operation="panel-open" data-drag-surface aria-label={t('reopen')} title={t('title')} onClick={expand}>
    <WhaleMark small state={markState}/><span className={css.bubbleBrand}>{t('title')}</span>
    <span className={css.bubbleStatus} data-voice-state={compactState}><Icon name={enabled===false?'micOff':'mic'}/><span>{t('compact_'+compactState)}</span></span>
    <span className={css.voiceBars} data-active={compactState==='listening'||undefined} aria-hidden="true">{[0,1,2,3,4].map(index=><i key={index}/>)}</span><Icon name="down"/>
  </Button>
}

/** Readback facts are never rendered as a live microphone meter. */
function HomeControls(props) {
  const { t, sessionId } = props
  const state = props.useWhaleUi(value => value)
  const status = state.status
  const busy = state.busy
  const sourceConfirmed = state.checkedFor === sessionId
  const stale = state.uncertain || !sourceConfirmed
  const preferences = props.useWhalePreferences(value => value)
  const activeRoot = liveVoiceRootId(status)
  const liveConversation = activeRoot && state.conversationFor === sessionId && state.conversation?.rootSessionId === activeRoot && !stale ? state.conversation : null
  const history=state.conversationHistoryFor===sessionId && !stale && (!status?.enabled || liveConversation?.rootSessionId===state.conversationHistory?.rootSessionId) ? state.conversationHistory : null
  const displayedConversation=liveConversation ?? {rootSessionId:history?.rootSessionId??null,items:[],latest:history?.items?.filter(row=>row.role==='assistant').at(-1)??null}
  const activityUnknown = Boolean(status?.enabled && (state.conversationError || state.conversationFor === sessionId && state.conversation?.rootSessionId !== activeRoot))
  const helperRecovery=status?.voiceSession?.recovery?.kind?.startsWith('helper-')
  const recoveryPending=['predecessor-cleanup-pending','helper-cleanup-pending'].includes(status?.voiceSession?.recovery?.kind)
  const restartRequired=['predecessor-stop-unconfirmed','helper-stop-unconfirmed'].includes(status?.voiceSession?.recovery?.kind)||/VOICE_(PREDECESSOR|HELPER)_STOP_UNCONFIRMED/.test(state.error??'')
  const recovering=status?.voiceSession?.recovery?.kind==='live-root-conflict'||/VOICE_ROOT_OWNED_ELSEWHERE/.test(state.error??'')
  const liveHelper=liveConversation?.helper??status?.helper
  const listenMode = state.listenModePending ? state.listenModeBefore
    : liveConversation?.helper && liveConversation.revision !== state.listenModeReceiptRevision
      ? liveConversation.helper.listenMode : status?.listenMode
  const helperUnavailable=Boolean(status?.enabled && liveHelper?.online===false)
  const inputStateUnknown=activityUnknown || Boolean(status?.enabled && listenMode==null)
  const modeCurrent = !stale && !helperUnavailable && !inputStateUnknown && LISTEN_MODES.includes(listenMode)
  const modeBlocked = busy || !modeCurrent || recoveryPending || restartRequired || recovering || !status?.capabilities?.listenMode || status?.voiceControlBusy || state.visibilityUncertain || state.ttsUncertain || state.ttsCancelling
  const inputError=status?.enabled ? liveConversation?.inputError : null
  const enableError=!status?.enabled && state.enableError
  const existingSessionStartError = existingSessionStartErrors[/VOICE_EXISTING_(ARCHIVED|BUSY|UNAVAILABLE)/.exec(enableError ?? '')?.[1]]
  const voiceTargetChanged = /VOICE_EXISTING_BINDING_CHANGED/.test(enableError ?? '')
  const fastEnableError=enableError && state.settings?.voiceSession?.performanceMode==='fast' && /VOICE_EXACT_EFFORT_HOST_REQUIRED|VOICE_FAST_/.test(enableError)
  const otherVoiceOwner=sessionId && status?.ownerSessionId && status.ownerSessionId!==sessionId && activeRoot!==sessionId
  const boundSession = status?.existingVoiceSession
  const boundSessionId = boundSession?.sessionId
  const bindingPending = state.existingSessionWritePending || state.existingSessionUnconfirmed
  const targetCurrent = status && !stale && state.checkedFor === sessionId && !bindingPending
  const existingSession = targetCurrent && status.existingVoiceSession
  const targetName = !targetCurrent ? t('checkingVoiceTarget') : existingSession ? sessionName(existingSession) : t('dedicatedVoiceTarget')
  const targetId = useId()
  const targetPickerId = useId()
  const retryTranscripts = status?.enabled && existingSession && liveConversation?.retryTranscripts?.sessionId === existingSession.sessionId
    ? liveConversation.retryTranscripts.items : []
  const supportsTargetPicker = status?.existingVoiceSessionSupported === true && Object.hasOwn(status, 'existingVoiceSession')
    && props.listExistingVoiceSessions && props.setExistingVoiceSession
  const canChangeTarget = supportsTargetPicker && existingBindingIdle(state, sessionId)
  const showCurrentChoice = props.currentConversationId && supportsTargetPicker && status.enabled === false
  const canCreate=Boolean(!existingSession && !bindingPending && state.checkedFor===sessionId && status && !busy && !status.voiceControlBusy && !stale && !state.ttsUncertain && !state.ttsCancelling && !recoveryPending && !recovering && !restartRequired && !otherVoiceOwner)
  const wake=liveConversation?.wake??status?.wake
  const markState = recoveryPending ? 'pending' : restartRequired || recovering || stale || inputStateUnknown || helperUnavailable ? 'unknown' : busy ? 'pending' : liveConversation?.inputActive === true ? 'input-active' : status?.enabled ? 'authorized' : 'idle'
  const [panel, setPanel] = useState(null)
  const [originalOpenError, setOriginalOpenError] = useState(false)
  const showTargetPicker = panel === 'targets' && supportsTargetPicker && status.enabled === false
  const restoreTargetFocus = useRef(false)
  const inputSettings=state.settingsFor===sessionId ? state.settings?.values : null
  const bindingHint=inputSettings?.pttKeyboard ? [...(inputSettings.pttKeyboard.modifiers||[]),inputSettings.pttKeyboard.code].join(' + ') : inputSettings?.pttMouse ? t('sideButton')+' '+inputSettings.pttMouse : null
  const triggers = useRef({})
  const closeTargetPicker = () => { restoreTargetFocus.current = true; setPanel(null) }
  useLayoutEffect(() => {
    setPanel(current => props.collapsed || current === 'targets' ? null : current)
    setOriginalOpenError(false)
  }, [sessionId, props.collapsed])
  useEffect(() => {
    setOriginalOpenError(false)
    if (boundSessionId) setPanel(current => current === 'conversation' ? null : current)
  }, [boundSessionId])
  useEffect(() => {
    if (status?.enabled) setPanel(current => current === 'targets' ? null : current)
  }, [status?.enabled])
  useEffect(() => {
    if (showTargetPicker || !canChangeTarget || !restoreTargetFocus.current || !triggers.current.targets) return
    restoreTargetFocus.current = false
    triggers.current.targets.focus()
  }, [showTargetPicker, canChangeTarget, props.collapsed])
  useEffect(() => { if(!stale && !boundSessionId && panel==='conversation' && status?.enabled===false) void props.run(sessionId,'read-history') }, [panel,stale,status?.enabled,sessionId,boundSessionId])
  const compactState=compactVoiceState({enabled:status?.enabled,active:liveConversation?.inputActive===true,unknown:!status||stale||inputStateUnknown||helperUnavailable||restartRequired||recovering||Boolean(inputError),pending:busy||recoveryPending})
  const dropdown = () => !boundSessionId && panel === 'conversation' && <ConversationView key={displayedConversation.rootSessionId??'empty'} conversation={displayedConversation}
    history={history} historyLoading={state.sourcePending || !stale && state.conversationHistoryLoading} historyError={stale ? null : state.conversationHistoryError} historyRetryCursor={state.conversationHistoryRequestCursor}
    loadHistory={cursor=>props.run(sessionId,'read-history',cursor?{cursor}:{})}
    assistantName={preferences.assistantName||t('assistant')} setAssistantName={props.setAssistantName} t={t}
    close={()=>{setPanel(null);triggers.current.conversation?.focus()}}/>
  if (props.collapsed) return <ReopenButton t={t} expand={props.expand} markState={markState} compactState={compactState} enabled={status?.enabled??null}/>
  return <div className={css.panelContent} data-home-controls data-has-transcript-retry={retryTranscripts.length > 0 || undefined} data-home-layout={[status?(status.enabled?'active':'idle'):'loading',performanceConfigurable(state,sessionId),Boolean(state.error||enableError),Boolean(inputError),helperUnavailable,recoveryPending,restartRequired,Boolean(existingSession)].join(':')} data-size-detail={panel==='conversation' || showTargetPicker ? 'true' : 'false'}
    onKeyDown={event => {
      if (!showTargetPicker || event.key !== 'Escape') return
      event.preventDefault()
      event.stopPropagation()
      closeTargetPicker()
    }}>
    <div className={css.header}><span className={css.brand}><WhaleMark state={markState}/><strong>{t('title')}</strong></span><div className={css.headerActions}>
      <Button className={css.newChatButton} data-whale-operation="new-voice-session" aria-label={t('newChat')} title={existingSession ? '解除已有会话绑定后可新建鱼应会话' : t(otherVoiceOwner ? 'newChatOtherOwner' : status?.enabled ? 'newChatActive' : 'newChat')} disabled={!canCreate} onClick={()=>void props.run(sessionId,'new',{expectedOwnerSessionId:status.ownerSessionId})}><Icon name="plus"/><span>{t('newChat')}</span></Button>
      <Button data-whale-settings-trigger data-whale-operation="page-settings" className={css.iconButton} aria-label={t('settings')} title={t('settings')} onClick={props.openSettings}><Icon name="settings"/></Button>
      <Button data-whale-operation="panel-close" className={css.iconButton} aria-label={t('collapse')} title={t('collapseHint')} onClick={props.collapse}><Icon name="minus"/></Button>
    </div></div>
    <div className={css.statusRow} data-bound={Boolean(existingSession) || undefined} data-recording={markState==='input-active'||undefined}>
      <div id={targetId} className={css.voiceTarget} data-whale-voice-target>
        {supportsTargetPicker
          ? <Button ref={node => { triggers.current.targets=node }} variant="outline" className={css.existingSessionHome}
            data-whale-bound-session={existingSession ? true : undefined} data-whale-target-trigger title={targetName}
            aria-expanded={Boolean(showTargetPicker)} aria-controls={showTargetPicker ? targetPickerId : undefined}
            disabled={!showTargetPicker && !canChangeTarget} onClick={() => showTargetPicker ? closeTargetPicker() : setPanel('targets')}>
            <span>{t('voiceTarget')}</span><strong className={css.ellipsis}>{targetName}</strong><Icon name={showTargetPicker ? 'down' : 'chevron'}/>
          </Button>
          : <><span>{t('voiceTarget')}</span><strong className={css.ellipsis} title={targetName}>{targetName}</strong></>}
      </div>
      <div className={css.voiceStatus}><Icon name={status?.enabled?"mic":"micOff"}/><span className={css.status} role="status">{state.listenModePending ? t(status?.enabled ? 'modeSwitching' : 'modeSaving') : busy ? t('pending') : !status ? t('unknown') : recoveryPending ? t('voiceCleanupPending') : restartRequired ? t('voiceRestartPending') : recovering ? t('voiceRecoveryPending') : stale ? t('stale') : helperUnavailable ? t('voiceInputUnavailable') : inputStateUnknown ? t('unknown') : inputError ? t('inputError_'+inputError) : liveConversation?.inputActive === true ? t('inputActive') : status.enabled&&listenMode==='wake' ? t(wakeLabel(wake)) : status.enabled ? t('enabled') : t('disabled')}</span></div>
    </div>
    {showTargetPicker ? <ExistingSessionBinding {...props} state={state} homePickerId={targetPickerId} closeHomePicker={closeTargetPicker}/> : <>
    {showCurrentChoice && <CurrentDshConversation key={props.currentConversationId} {...props}
      sessionId={props.currentConversationId} boundSession={boundSession} state={state}/>}
    <div className={css.quickActions}>
    <Button data-whale-operation={status?.enabled||recovering ? "stop-voice" : "start-voice"} className={`${css.mainAction} ${status?.enabled ? '' : css.primary}`} variant={status?.enabled ? 'outline' : 'primary'} aria-describedby={targetId} disabled={!sourceConfirmed || Boolean(bindingPending) || busy && !(status?.enabled && state.interruptibleRead && !state.diagnosticStopPending) || recoveryPending || restartRequired&&!status?.enabled || !status || stale&&!recovering&&!helperUnavailable || !status.enabled && !recovering && (!targetCurrent || existingSession && !canOpenExistingSession(existingSession))} title={status?.enabled ? t('stopConsequence') : undefined} onClick={() => { void props.run(sessionId, status?.enabled||recovering ? 'disable' : 'enable', status?.enabled||recovering ? {} : { expectedOwnerSessionId:null, expectedExistingSessionId:existingSession?.sessionId ?? null }) }}>
      {recoveryPending ? t('voiceCleanupPending') : restartRequired ? t(status?.enabled ? 'endConversation' : 'voiceRestartPending') : recovering ? t('voiceRecoveryCheck') : status?.enabled ? t('endConversation') : t('startConversation')}
    </Button>
    <div className={css.quickSegments} role="group" aria-label={t('mode')} aria-busy={Boolean(state.listenModePending)}
      data-listen-mode={modeCurrent ? listenMode : 'unknown'}>
      {LISTEN_MODES.map(mode => <Button key={mode} data-whale-operation={`listen-mode-${mode}`} aria-pressed={modeCurrent && listenMode === mode}
        disabled={Boolean(modeBlocked)} onClick={() => { if (listenMode !== mode) void props.run(sessionId,'listen-mode',{mode}) }}>
        {t(modeLabel(mode))}
      </Button>)}
    </div>
    </div>
    {retryTranscripts.length > 0 && <VoiceTranscriptRetries items={retryTranscripts} pending={state.transcriptRetry} busy={busy}
      retry={id => props.retryVoiceTranscript?.(sessionId, id)} t={t}/>}
    {(!status || stale || recoveryPending || restartRequired || recovering) && <p className={css.hint} data-home-important={recoveryPending || restartRequired || recovering || undefined}>{recoveryPending ? t(helperRecovery ? 'voiceHelperCleanupHint' : 'voiceCleanupHint') : restartRequired ? t(helperRecovery ? 'voiceHelperRestartHint' : 'voiceRestartHint') : recovering ? t('voiceRecoveryHint') : t(busy ? 'readingStatus' : 'statusRetry')}</p>}
    {!stale && (!inputStateUnknown || helperUnavailable) && status?.enabled && !recoveryPending && !restartRequired && <p className={css.hint} data-whale-input-hint data-home-important={inputError || helperUnavailable ? true : undefined}>{helperUnavailable ? t('voiceInputRecoveryHint') : inputError ? t('inputHelp_'+inputError) : listenMode==='wake' ? t(wake?.streamOpen && wake.detection==='asr-after-utterance' ? 'wakeFallbackHint' : 'wakeHint') : listenMode==='always' ? t('alwaysWarning') : bindingHint ? t('holdToSpeak')+' '+bindingHint : t('bindingMissing')}</p>}
    {status && !stale && !status.capabilities?.listenMode && <p className={css.hint}>{t('modeUnavailable')}</p>}
    {state.listenModeError && <p role="alert" data-whale-mode-error className={css.error}>{t(state.uncertain ? 'modeSwitchUnconfirmed' : 'modeSwitchFailed')}</p>}
    {state.readOnlyFailure && stale && !recovering && !restartRequired &&
      <Button variant="outline" disabled={busy} onClick={() => void props.run(sessionId,'status')}>{t('retryStatus')}</Button>}
    {(state.error||enableError) && !state.readOnlyFailure && !existingSessionStartError && !state.listenModeError && !recovering && !restartRequired && <p role="alert" className={css.error}>{t(voiceTargetChanged?'voiceTargetChanged':fastEnableError?'performanceFastUnavailable':!state.uncertain&&enableError?'enableFailed':'operationUnavailable')}</p>}
    {existingSessionStartError && <p role="alert" className={css.notice}>{existingSessionStartError} <Button variant="outline" disabled={!canChangeTarget} onClick={() => setPanel('targets')}>管理绑定</Button></p>}
    {/VOICE_SESSION_ARCHIVED/.test(enableError ?? state.error ?? '') && <p className={css.notice}>
      原语音会话已归档。<Button variant="outline" onClick={() => void props.openSettings('sessions')}>恢复原会话</Button>
    </p>}
    {/VOICE_ASR_(?:PREPARING|PREPARE_FAILED)/.test(enableError ?? state.error ?? '') && <p className={css.notice}>
      SenseVoice 尚未就绪。<Button variant="outline" onClick={() => void props.openSettings('models', 'download')}>查看模型进度</Button>
    </p>}
    {/VOICE_MODEL_REQUIRED/.test(enableError ?? state.error ?? '') && <p className={css.notice}>
      请先选择可用的对话模型。<Button variant="outline" onClick={() => void props.openSettings('models', 'conversation')}>设置对话模型</Button>
    </p>}
    {existingSession && !canOpenExistingSession(existingSession) && <p className={css.hint} data-home-important>{sessionAvailability(existingSession)}</p>}
    {liveConversation?.providerError && <p role="alert" data-home-important data-whale-provider-error className={css.error}>{liveConversation.providerError}</p>}
    <AudioDeviceControls {...props} state={state}/>
    {!existingSession && !state.error && !inputError && !recovering && !restartRequired && !recoveryPending && !helperUnavailable && !inputStateUnknown && <QuickPerformance {...props} state={state}/>}
    {originalOpenError && <p role="alert" className={css.notice}>DSH 暂时无法打开原会话，请稍后重试。</p>}
    {canOpenExistingSession(existingSession) && props.openExistingVoiceSession && <Button className={css.caption} data-whale-operation="open-native-session" aria-label="打开原会话" onClick={async () => {
      setOriginalOpenError(false)
      try { await props.openExistingVoiceSession(existingSession.sessionId) }
      catch { setOriginalOpenError(true) }
    }}>
      {liveConversation?.latest?.text && <span className={css.ellipsis}>{liveConversation.latest.text}</span>}
      <span className={css.openOriginal}>打开原会话</span><Icon name="chevron"/>
    </Button>}
    {status && !boundSessionId && <Button ref={node => { triggers.current.conversation=node }} className={css.caption} onClick={() => {const opening=panel!=='conversation';setPanel(opening?'conversation':null);if(opening)void props.run(sessionId,'read-history')}} aria-label={t('recentConversation')} aria-expanded={panel==='conversation'}>
      <span className={css.ellipsis}>{displayedConversation.latest?.state==='speech-failed' ? t('speechFailed')+': ' : displayedConversation.latest?.state==='interrupted' ? t('speechInterrupted')+': ' : ''}{displayedConversation.latest?.text??t(state.newChatFor===sessionId?'newChatCreated':'viewConversation')}</span><Icon name="chevron"/>
    </Button>}
    {dropdown()}
    </>}

  </div>
}

function VoiceTranscriptRetries({ items, pending, busy, retry, t }) {
  const labelId = useId()
  return <section className={css.transcriptRetries} aria-labelledby={labelId} data-whale-transcript-retries data-no-drag>
    <header><h2 id={labelId}>{t('retryTranscripts')}</h2><p>{t('endDiscardsRetries')}</p></header>
    <ul className={css.transcriptRetryList} tabIndex={0} aria-labelledby={labelId}>
      {items.map(item => {
        const state = pending?.id === item.id && item.state === 'ready' ? pending.state : item.state
        const status = { busy:'retryTranscriptBusy', sending:'retryTranscriptSending', uncertain:'retryTranscriptUncertain' }[state]
        return <li key={item.id} className={css.transcriptRetry} data-retry-state={state}>
          <div>
            <p className={css.transcriptRetryText}>{item.text}</p>
            {status && <p className={css.hint} role="status">{t(status)}</p>}
          </div>
          <Button variant="outline" disabled={busy || Boolean(pending) || state !== 'ready'} onClick={() => void retry(item.id)}
            data-whale-operation="retry-voice-transcript">{t('retryTranscript')}</Button>
        </li>
      })}
    </ul>
  </section>
}

function performanceConfigurable(state,sessionId) {
  const status=state.status
  return Boolean(state.settings?.revision && state.checkedFor===sessionId && state.settingsFor===sessionId && !state.uncertain && !state.visibilityUncertain && !state.settingsConflict && !state.ttsUncertain && !state.ttsCancelling && status?.enabled===false && status.ownerSessionId===null && status.voiceControlBusy===false && status.voiceSession?.fullyStopped===true && status.voiceSession?.id===null)
}

/** One-click presets only mutate a fully stopped, fresh session, with the same CAS gate as settings. */
function QuickPerformance({state, sessionId, t, run, readState}) {
  const intent=useRef(0)
  useEffect(()=>()=>{intent.current++},[sessionId])
  const stopped=performanceConfigurable(state,sessionId)
  const mode=state.settings?.voiceSession?.performanceMode
  const capability=state.performanceFor===sessionId ? state.performance : null
  const choices=['fast','balanced','high']
  const savedBlocked=capability?.modes?.some(item=>item.performanceMode===mode && !item.available)
  const blocked=state.busy || state.performancePending || state.uncertain || state.visibilityUncertain || !stopped
  const choose=async performanceMode=>{
    if(blocked || performanceMode===mode)return
    const token=++intent.current
    if(performanceMode!=='compatibility' && !await run(sessionId,'inspect-performance'))return
    if(token!==intent.current)return
    const fresh=readState?.()
    if(!fresh || !performanceConfigurable(fresh,sessionId) || fresh.busy)return
    if(performanceMode!=='compatibility' && (fresh.performanceFor!==sessionId || !fresh.performance?.modes?.find(item=>item.performanceMode===performanceMode)?.available))return
    await run(sessionId,'set-performance-mode',{revision:fresh.settings.revision,performanceMode})
  }
  if(!stopped)return null
  return <section className={css.quickSpeed} aria-label={t('performanceTitle')}>
    <div className={css.quickSpeedHeader}><span>{t('performanceTitle')}</span>{mode==='compatibility' && <small>{t('performance_compatibility')}</small>}</div>
    <div className={css.quickSegments}>{choices.map(value=><Button key={value} aria-pressed={mode===value} disabled={blocked || Boolean(performanceDisabledHint(capability, value))} title={t(performanceDisabledHint(capability, value) || (value==='fast' ? 'performanceFastHint' : 'performance_'+value))} onClick={()=>void choose(value)}>{mode===value&&<Icon name="check"/>}<PerformanceChoice value={value} t={t}/></Button>)}</div>
    <PerformanceProbeStatus capability={capability} t={t} compact pending={state.performancePending} error={state.performanceError}/>
    {savedBlocked && <Button variant="outline" disabled={blocked} onClick={()=>void choose('compatibility')}>{t('performance_compatibility')}</Button>}
  </section>
}

function SettingsEditor({ settings, sessionId, busy, run, t, status, verified, statusFresh, tab, markSettingsEdited, discardSettingsDraft, bindingError, captureBindings }) {
  const [device, setDevice] = useState(settings.values.device ?? null)
  const [pttMouse, setPttMouse] = useState(settings.values.pttMouse)
  const [pttKeyboard, setPttKeyboard] = useState(settings.values.pttKeyboard ?? null)
  const [speakerEnabled, setSpeakerEnabled] = useState(settings.values.speakerVerification.enabled)
  const supportedSounds = settings.capabilities?.turnSignals === true
  const [soundEnabled, setSoundEnabled] = useState(settings.values.turnSignals?.enabled ?? false)
  const [volume, setVolume] = useState(settings.values.turnSignals?.volume?.toString() ?? '')
  const [wakeAliases,setWakeAliases]=useState((settings.values.wakeWordAliases??['小鲸鱼']).join('，'))
  const [wakeWait,setWakeWait]=useState(String((settings.values.wakeListenTimeoutMs??10000)/1000))
  const aliases=parseWakeAliases(wakeAliases),wakeValid=validWakeAliases(aliases)&&Number.isInteger(Number(wakeWait)*1000)&&Number(wakeWait)>=3&&Number(wakeWait)<=30
  const wakeChanged=JSON.stringify(aliases)!==JSON.stringify(settings.values.wakeWordAliases??['小鲸鱼'])||Number(wakeWait)*1000!==(settings.values.wakeListenTimeoutMs??10000)
  const [semanticExperimental, setSemanticExperimental] = useState(settings.values.semanticExperimental === true)
  const [headphones, setHeadphones] = useState(settings.values.turnSignals?.headphonesConfirmed ?? false)
  const [automaticBargeIn, setAutomaticBargeIn] = useState(settings.values.turnSignals?.experimentalAutomaticBargeIn ?? false)
  const bindingChanged = pttMouse !== settings.values.pttMouse || JSON.stringify(pttKeyboard) !== JSON.stringify(settings.values.pttKeyboard ?? null)
  const [manualDevice, setManualDevice] = useState(false)
  const devices = statusFresh ? status?.inputDevices : null
  const stableDevice = device !== null && typeof device === 'object'
  const deviceKnown = stableDevice || device==null || device==='' || devices?.items?.some(item=>typeof device==='number' && item.index===device)
  const invalidDeviceIndex = manualDevice==='index' && (String(device ?? '').trim()==='' || !/^\d+$/.test(String(device).trim()) || !Number.isSafeInteger(Number(device)))
  const bindingLocked = busy || !statusFresh || status?.enabled !== false || status?.ownerSessionId !== null || status?.voiceControlBusy !== false || status?.voiceSession?.fullyStopped !== true
  const save = () => {
    if (busy || !wakeValid || invalidDeviceIndex || (wakeChanged && bindingLocked)) return
    const savedDevice = stableDevice && !manualDevice ? device : manualDevice==='index' ? Number(device) : device == null || device === '' ? null : manualDevice==='name' ? String(device).trim() : typeof device === 'number' ? device : device.trim()
    void run(sessionId, 'save-settings', {
      revision: settings.revision,
      values: { wakeWordAliases:aliases,wakeListenTimeoutMs:Number(wakeWait)*1000,semanticExperimental, device: savedDevice, pttMouse: settings.values.pttMouse, ...(settings.capabilities?.pttKeyboard ? { pttKeyboard: settings.values.pttKeyboard ?? null } : {}), speakerVerification: { enabled: speakerEnabled }, ...(supportedSounds ? { turnSignals: { enabled: soundEnabled, volume: Number(volume), headphonesConfirmed: headphones, experimentalAutomaticBargeIn: automaticBargeIn } } : {}) },
    })
  }
  const saveButton = <Button className={css.primary} variant="primary" disabled={busy || !wakeValid || invalidDeviceIndex || (wakeChanged && bindingLocked) || (supportedSounds && (volume.trim() === '' || !Number.isFinite(Number(volume)) || Number(volume) < 0 || Number(volume) > 1))} onClick={save}>{busy ? t('pending') : t('save')}</Button>
  const deviceLabel = stableDevice ? device.name : devices?.items?.find(item=>item.index===device)?.name ?? (device==null||device===''?t('deviceDefault'):String(device))
  return <div className={css.section} data-settings-draft="save-settings">
    <div hidden={tab !== 'audio'} className={css.section}>
    <h3>{t('mode')}</h3><p className={css.hint}>当前：{t(modeLabel(status?.listenMode??settings.listenMode))}</p>
    <div className={css.segmented}>{['ptt','always','wake'].map(mode=><Button key={mode} data-whale-operation={`listen-mode-${mode}`} variant="outline" aria-pressed={(status?.listenMode??settings.listenMode)===mode} disabled={!settings.capabilities?.listenMode || !verified || busy} onClick={()=>void run(sessionId,'listen-mode',{mode})}>{t(modeLabel(mode))}</Button>)}</div>
    {(!settings.capabilities?.listenMode || !verified) && <p className={css.hint}>{t(!settings.capabilities?.listenMode ? 'modeUnavailable' : 'modeNeedsGrant')}</p>}
    <div className={css.inlineActions}><label className={css.inlineField}>{t('device')}<select title={deviceLabel} className={css.deviceSelect} aria-label={t('device')} disabled={busy} value={manualDevice ? '__manual-'+manualDevice : stableDevice ? '__stable' : deviceKnown ? (device ?? '') : '__saved'} onChange={event=>{const value=event.target.value;if(value.startsWith('__manual-')){setManualDevice(value.slice('__manual-'.length));if(stableDevice)setDevice('')}else if(value!=='__saved' && value!=='__stable'){setManualDevice(false);setDevice(value===''?null:Number(value))}}}>
      <option value="">{t('deviceDefault')}</option>{stableDevice&&<option value="__stable">{device.name}</option>}{devices?.items?.map(item=><option key={item.index} value={String(item.index)}>{item.name} ({item.index})</option>)}{!deviceKnown && <option value="__saved">{t('deviceSaved')}: {device}</option>}<option value="__manual-index">{t('deviceManualIndex')}</option><option value="__manual-name">{t('deviceManualName')}</option>
    </select></label>{saveButton}</div>
    {deviceLabel.length>22&&<details className={css.fullName}><summary>查看设备全名</summary><p>{deviceLabel}</p></details>}
    {(manualDevice || !deviceKnown) && <label className={css.field}>{t('deviceManual')}<Input aria-label={t('deviceManual')} disabled={busy} value={device ?? ''} onChange={event=>{if(!manualDevice)setManualDevice(typeof device==='number'?'index':'name');setDevice(event.target.value)}}/></label>}
    {invalidDeviceIndex && <p className={css.notice}>{t('deviceIndexInvalid')}</p>}
    {devices?.status!=='available'&&<p className={css.hint}>{t(devices?.status==='empty' ? 'deviceEmpty' : 'deviceUnknown')}</p>}
    </div><div hidden={tab !== 'interaction'} className={css.section}>
    <div className={css.bindingEditor} data-settings-draft="save-bindings">
      <KeyboardBinding captureBindings={captureBindings} sessionId={sessionId} active={tab==='interaction'} value={pttKeyboard} onChange={value=>{markSettingsEdited?.('save-bindings');setPttKeyboard(value)}} capability={settings.capabilities?.pttKeyboard} disabled={busy || !statusFresh} t={t}/>
      <fieldset className={`${css.radios} ${css.mouseBinding}`} disabled={busy || !statusFresh}>
        <legend>{t('sideButton')}</legend>
        {[0, 1, 2].map((value, index) => <label key={value}><input type="radio" name="whale-ear-mouse" value={value} checked={pttMouse === value} onChange={() => {markSettingsEdited?.('save-bindings');setPttMouse(value)}} />{t(['sideOff', 'sideOne', 'sideTwo'][index])}</label>)}
      </fieldset>
      {bindingError && <p role="alert" className={css.notice}>{/RECORDING|KEYS_HELD/.test(bindingError)?'请先松开按键，等待录音处理完成，再保存。':/UNCONFIRMED|STOP_UNCONFIRMED|ROLLBACK_UNCONFIRMED/.test(bindingError)?'按键状态尚未确认，请重启 DSH 再核查按键。':/STALE|配置已改变|语音会话已改变/.test(bindingError)?'配置或语音会话已改变，请重新读取后再保存。':/UNSUPPORTED/.test(bindingError)?'当前系统不支持在对话中更换全局按键。':'未能保存按键，请查看高级详情。'}</p>}
      <div className={`${css.actions} ${css.bindingActions}`}>
        <Button className={css.primary} variant="primary" disabled={busy || !statusFresh || !bindingChanged || !settings.bindingContext || (pttKeyboard?.code==='F4'&&pttKeyboard.modifiers.includes('Alt'))} onClick={()=>void run(sessionId,'save-bindings',{revision:settings.revision,bindingContext:settings.bindingContext,values:{pttMouse,pttKeyboard}})}>{t('saveBindings')}</Button>
        {bindingChanged && <Button variant="outline" disabled={busy} onClick={()=>{setPttMouse(settings.values.pttMouse);setPttKeyboard(settings.values.pttKeyboard??null);discardSettingsDraft?.('save-bindings')}}>{t('discardBindings')}</Button>}
      </div>
    </div></div><div hidden={tab !== 'advanced' || !settings.values.speakerVerification.enabled} className={css.section}>
    {settings.values.speakerVerification.enabled && <><MotionToggle label={t('speaker')} checked={speakerEnabled} disabled={busy} onChange={setSpeakerEnabled} /><p className={css.hint}>{t('speakerHint')}</p></>}
    <p className={css.hint}>{t('savedHint')}</p>
    </div><div hidden={tab !== 'audio'} className={css.disclosureRow}>
    <details className={css.section}><summary>{t('wakeSettings')}</summary><p className={css.hint}>{t('wakeMethod')}</p><label className={css.field}>{t('wakeAliases')}<Input aria-label={t('wakeAliases')} maxLength={208} value={wakeAliases} disabled={bindingLocked} onChange={event=>setWakeAliases(event.target.value)}/></label><p className={css.hint}>{t('wakeAliasesHint')}</p><label className={css.field}>{t('wakeTimeout')}<Input aria-label={t('wakeTimeout')} type="number" min="3" max="30" step="1" value={wakeWait} disabled={bindingLocked} onChange={event=>setWakeWait(event.target.value)}/></label>{bindingLocked&&<p className={css.hint}>{t('wakeStopToEdit')}</p>}{!wakeValid&&<p role="alert" className={css.notice}>{t('wakeInvalid')}</p>}</details>
    <details className={css.section}><summary>{t('soundTitle')}</summary>
    <MotionToggle label={t('soundEnabled')} checked={soundEnabled} disabled={!supportedSounds || busy} onChange={setSoundEnabled} />
    <label className={css.field}>{t('soundVolume')}<MotionRange aria-label={t('soundVolume')+'滑块'} min="0" max="1" step="0.05" value={volume} disabled={!supportedSounds || busy} onChange={event=>setVolume(event.target.value)}/><Input type="number" min="0" max="1" step="0.05" aria-label={t('soundVolume')} disabled={!supportedSounds || busy} value={volume} onChange={event => setVolume(event.target.value)} /></label>
    <MotionToggle label="实验性唤醒判断（默认关闭）" checked={semanticExperimental} disabled={busy} onChange={setSemanticExperimental}/>
    <p className={css.hint}>关闭时，自由麦直接听取有效语音；开启后使用唤醒词或语义判断，可能漏唤醒。建议使用耳机减少回声。</p>
    <Checkbox label={t('headphones')} checked={headphones} disabled={!supportedSounds || busy} onChange={next => { setHeadphones(next); if (!next) setAutomaticBargeIn(false) }} />
    <p className={css.hint}>{t('headphonesHint')}</p>
    <MotionToggle label={t('automaticBargeIn')} checked={automaticBargeIn} disabled={!supportedSounds || !headphones || busy} onChange={setAutomaticBargeIn} />
    {supportedSounds && !headphones && <p className={css.hint}>{t('headphonesRequired')}</p>}
    <p className={css.hint}>{supportedSounds ? t('soundAvailable') : t('soundUnavailable')}</p></details>
    </div>
    {tab==='advanced' && settings.values.speakerVerification.enabled && <div className={css.formActions}>{saveButton}</div>}
  </div>
}

function SenseVoiceProgress({ action, active }) {
  const [status, setStatus] = useState(null), [request, setRequest] = useState(0)
  const handledRetry = useRef(0)
  useEffect(() => {
    if (!action || !active) return
    const lifecycle = new AbortController()
    let timer
    const read = async operation => {
      try {
        const value = await action({ operation }, lifecycle.signal)
        if (lifecycle.signal.aborted) return
        setStatus(value)
        if (value.selected && (operation === 'retry' || ['idle','downloading'].includes(value.state))) {
          timer = setTimeout(() => void read('status'), 1000)
        }
      } catch {
        if (!lifecycle.signal.aborted) setStatus({ state: 'unavailable' })
      }
    }
    const operation = request > handledRetry.current ? 'retry' : 'status'
    handledRetry.current = request
    void read(operation)
    return () => { clearTimeout(timer); lifecycle.abort() }
  }, [action, active, request])
  if (!action || !active) return null
  const progress = status?.totalBytes > 0 && status?.state === 'downloading'
  const mb = value => (value / 1e6).toFixed(1)
  return <div className={css.section} data-whale-sensevoice>
    <h3>SenseVoice</h3>
    <p role="status">{status?.selected === false ? '使用高级路径中指定的本地 SenseVoice 模型。' : status?.state === 'ready' ? '已就绪，在本机离线识别。'
      : status?.state === 'error' ? status.message
      : status?.state === 'unavailable' ? '暂时无法读取模型状态。'
      : progress ? `正在下载 · ${mb(status.receivedBytes)} / ${mb(status.totalBytes)} MB` : '正在准备本地识别模型…'}</p>
    {progress && <progress aria-label="SenseVoice 下载进度" value={status.receivedBytes} max={status.totalBytes}/>}
    {status?.selected && status?.state === 'error' && <Button variant="outline" onClick={() => { setStatus(null); setRequest(value => value + 1) }}>重试下载</Button>}
  </div>
}

function ModelEditor({ settings, sessionId, busy, run, t, pickPath, active, modelTab, markSettingsEdited, senseVoiceAsrAction }) {
  const [models,setModels]=useState(settings.modelSetup.models)
  const locked=busy
  const edited=()=>markSettingsEdited?.('save-models')
  const save=()=>void run(sessionId,'save-models',{revision:settings.revision,values:{asr:'sensevoice', modelCompute:'cpu',models}})
  return <section className={css.section} data-settings-draft="save-models" hidden={!['download','paths'].includes(modelTab)}>
    <div data-whale-tab-panel hidden={modelTab!=='download'}>
      <SenseVoiceProgress action={senseVoiceAsrAction} active={active&&modelTab==='download'}/>
    </div>
    <div hidden={modelTab!=='paths'} className={css.section}><h3>识别模型本地路径</h3><p className={css.hint}>可在“模型下载”查看准备进度，或在这里指定本机已有的 SenseVoice 目录。</p>
    {[['sensevoiceDir','sensevoicePath'],['campplus','campplusPath']].map(([key,label])=><PathField key={key} className={css.pathRow} label={t(label)} kind={key} value={models[key]} disabled={locked} active={active&&modelTab==='paths'} pickPath={pickPath} sessionId={sessionId} scope="sensevoice" onChange={value=>{edited();setModels(current=>({...current,[key]:value}))}}/>)}
    <Button variant="outline" disabled={locked} onClick={save}>{t('saveModels')}</Button></div>
  </section>
}

/** Visibility is a separate explicit preference; changing it never grants or moves a root. */
function VisibilityEditor({ settings, state, sessionId, run, t }) {
  const [visibility, setVisibility] = useState(settings.voiceSession.visibility)
  const settingsCurrent = state.settingsFor === sessionId
  const statusCurrent = state.checkedFor === sessionId && state.status !== null
  const caps = statusCurrent ? state.status.voiceCapabilities : settings.voiceCapabilities
  const voice = statusCurrent ? state.status.voiceSession : null
  const granted = statusCurrent && (state.status.enabled || state.status.ownerSessionId !== null || voice?.id != null)
  const controlIdle = statusCurrent && state.status.voiceControlBusy === false
  const blocked = state.busy || state.uncertain || !settingsCurrent || !statusCurrent || !controlIdle || granted
  const label = mode => t(mode === 'workspace' ? 'workspaceMode' : 'hiddenMode')
  return <section className={css.section} data-whale-visibility data-settings-draft="set-visibility">
    <h3>{t('capabilityTitle')}</h3>
    <dl className={css.details}>{['hidden', 'workspace'].map(mode => <div className={css.capabilityRow} key={mode}>
      <dt>{label(mode)}</dt><dd>{t(caps?.[mode]?.supported ? 'supported' : 'unsupported')}{caps?.[mode]?.reason ? ` · ${caps[mode].reason}` : ''}</dd>
    </div>)}</dl>
    <p className={css.hint}>{t('taskCapability')}: {t(caps?.taskHandoff?.supported ? 'supported' : 'unsupported')} · {caps?.taskHandoff?.mode ?? t('unknown')}{caps?.taskHandoff?.reason ? ` · ${caps.taskHandoff.reason}` : ''}</p>
    <p>{t('configuredMode')}: {label(settings.voiceSession.visibility)}</p>
    <p className={css.hint}>{!statusCurrent ? t('modeReadFirst') : voice?.id ? `${t('currentVoiceMode')}: ${voice.presentation?.requested ? label(voice.presentation.requested) : t('unknown')} · ${voice.id}` : t('noActiveVoice')}</p>
    <fieldset className={css.radios} disabled={blocked}><legend>{t('chooseVisibility')}</legend>
      <label><input type="radio" name="whale-ear-visibility" checked={visibility === 'hidden'} onChange={() => setVisibility('hidden')} />{t('hiddenMode')}</label>
      <label><input type="radio" name="whale-ear-visibility" checked={visibility === 'workspace'} disabled={!caps?.workspace?.supported} onChange={() => setVisibility('workspace')} />{t('workspaceMode')}</label>
    </fieldset>
    <p className={css.hint}>{t('workspaceWarning')}</p>
    <p className={css.hint}>{t('visibilityNoMigration')}</p>
    {(!settingsCurrent || !statusCurrent) && <p className={css.hint}>{t('modeReadFirst')}</p>}
    {granted && <p className={css.hint}>{t('closeBeforeMode')}</p>}
    {statusCurrent && !controlIdle && <p className={css.hint}>{t('modeControlPending')}</p>}
    <div><Button variant="outline" disabled={blocked || visibility === settings.voiceSession.visibility || (visibility === 'workspace' && !caps?.workspace?.supported)} onClick={() => { void run(sessionId, 'set-visibility', { revision: settings.revision, visibility }) }}>{t(visibility === 'workspace' ? 'saveWorkspace' : 'saveHidden')}</Button></div>
  </section>
}

/** Native gate must acknowledge before any real shortcut is recorded. */
function KeyboardBinding({ value, onChange, capability, disabled, t, captureBindings, sessionId, active }) {
  const [capturing, setCapturing] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const lease = useRef(null), generation = useRef(0), button = useRef(null), mounted = useRef(true)
  const finish = async next => {
    generation.current++
    if(mounted.current)setCapturing(false)
    const current = lease.current
    if (!current) return
    if(mounted.current)setPending(true)
    try {
      await captureBindings(current.sessionId,{operation:'end',token:current.token})
      if (lease.current===current) lease.current=null
      if (mounted.current && next) onChange(next)
      if (mounted.current) setError(null)
    } catch (e) { if(mounted.current)setError(String(e.message||e)) }
    finally { if(mounted.current)setPending(false) }
  }
  const begin = async () => {
    if (lease.current || pending) return
    const epoch=++generation.current
    setPending(true);setError(null)
    try {
      const result=await captureBindings(sessionId,{operation:'begin'})
      lease.current={...result,sessionId}
      if (!mounted.current || epoch!==generation.current) { await finish(); return }
      setCapturing(true);button.current?.focus()
    } catch(e) { if(mounted.current)setError(String(e.message||e)) }
    finally { if(mounted.current)setPending(false) }
  }
  useEffect(()=>{ mounted.current=true;return()=>{mounted.current=false;void finish()} },[])
  useEffect(()=>{if(!active||disabled){generation.current++;void finish()}},[active,disabled,sessionId])
  useEffect(()=>{
    if(!capturing)return
    let candidate=null, primaryReleased=false, settled=false
    const complete=next=>{ if(!settled){settled=true;void finish(next)} }
    const down=event=>{
      event.preventDefault();event.stopPropagation()
      if(event.code==='Escape'){candidate=null;return}
      if(event.repeat||['ControlLeft','ControlRight','AltLeft','AltRight','ShiftLeft','ShiftRight'].includes(event.code))return
      candidate=capturedBinding(event)
      primaryReleased=false
      setError(candidate ? null : t('bindingUnsupported'))
    }
    const up=event=>{
      event.preventDefault();event.stopPropagation()
      if(event.code==='Escape'){complete();return}
      if(!candidate)return
      if(event.code===candidate.code)primaryReleased=true
      if(primaryReleased&&!event.ctrlKey&&!event.altKey&&!event.shiftKey)complete(candidate)
    }
    const cancel=()=>complete()
    const visibility=()=>{if(document.hidden)cancel()}
    window.addEventListener('keydown',down,true);window.addEventListener('keyup',up,true);window.addEventListener('blur',cancel);document.addEventListener('visibilitychange',visibility)
    const timer=setTimeout(cancel,10000)
    return()=>{clearTimeout(timer);window.removeEventListener('keydown',down,true);window.removeEventListener('keyup',up,true);window.removeEventListener('blur',cancel);document.removeEventListener('visibilitychange',visibility)}
  },[capturing])
  const label=value?[...(value.modifiers||[]),value.code].join(' + '):t('bindingOff')
  return <section className={css.keyBinding}>
    <h3>{t('keyboardBinding')}</h3>
    <div className={css.keyBindingRow}>
      <span>{label}</span>
      <div className={css.actions}>
        <Button variant="outline" ref={button} onBlur={()=>{if(capturing)void finish()}} disabled={disabled||pending||!capability?.supported||!captureBindings} onClick={()=>capturing?void finish():void begin()}>{pending?'正在交接…':capturing?'取消录入':'录入按键'}</Button>
        {value && <Button variant="outline" disabled={disabled||pending||capturing} onClick={()=>onChange(null)}>{t('clearBinding')}</Button>}
        {lease.current&&!capturing&&!pending&&<Button variant="outline" onClick={()=>void finish()}>恢复原按键</Button>}
      </div>
    </div>
    {capturing&&<p role="status" className={css.notice}>按键说话已暂停。请按下组合键后全部松开；Esc 取消。</p>}
    {!capability?.supported&&<p className={css.hint}>{capability?.reason||t('bindingUnavailable')}</p>}
    {error&&<p role="alert">{error}</p>}
  </section>
}

function PerformanceChoice({ value, t }) {
  const note = { fast: 'performanceNoThinking', balanced: 'performanceRecommended' }[value]
  return <span className={css.performanceChoice}>{t('performance_' + value)}{note && <> <small>{t(note)}</small></>}</span>
}

function performanceDisabledHint(capability, mode) {
  const entry = capability?.modes?.find(item => item.performanceMode === mode)
  if (!entry || entry.available) return null
  if (entry.reason === 'provider_unsupported') return 'performanceUnavailable'
  if (entry.reason === 'unknown') return 'performanceProbeUnknown'
  return mode === 'fast' ? 'performanceFastUnavailable' : 'performanceHostUnavailable'
}

export function PerformanceProbeStatus({ capability, t, compact = false, pending: checking = false, error = null }) {
  const modes = capability?.modes ?? []
  const reasons = modes.map(item => item.reason)
  const status = capability?.probe?.status
  const unknown = status === 'unknown' || reasons.includes('unknown')
  const pending = checking || status === 'pending' || status === 'running'
  const accepted = !compact && (status === 'accepted' || reasons.includes('accepted'))
  const explicitOff = !compact && reasons.includes('explicit_off')
  const fastBlocked = modes.some(item => item.performanceMode === 'fast' && !item.available && item.reason === 'host_contract_blocked')
  const providerRejected = reasons.includes('provider_unsupported')
  const otherBlocked = modes.some(item => item.performanceMode !== 'fast' && !item.available && item.reason === 'host_contract_blocked')
  if (!unknown && !pending && !accepted && !explicitOff && !fastBlocked && !providerRejected && !otherBlocked && !error) return null
  if (compact) {
    const text = error || t(pending ? 'performanceProbePending' : fastBlocked ? 'performanceFastUnavailable' : providerRejected ? 'performanceUnavailable' : unknown ? 'performanceProbeUnknown' : 'performanceHostUnavailable')
    return <div role="status" className={css.quickHint} data-whale-probe-status title={text}>{text}</div>
  }
  return <div role="status" className={css.hint} data-whale-probe-status>
    {pending && <p>{t('performanceProbePending')}</p>}
    {error && <p data-whale-probe-error>{error}</p>}
    {fastBlocked && <p>{t('performanceFastUnavailable')}</p>}
    {providerRejected && <p>{t('performanceUnavailable')}</p>}
    {otherBlocked && <p>{t('performanceHostUnavailable')}</p>}
    {unknown && <p>{t('performanceProbeUnknown')}</p>}
    {accepted && <p>{t('performanceProbeAccepted')}</p>}
    {explicitOff && <p>{t('performanceFastHint')}</p>}
  </div>
}

function PerformanceEditor({ state, sessionId, run, t, markSettingsEdited }) {
  const settings = state.settings
  const savedMode = settings?.voiceSession?.performanceMode ?? null
  const [mode, setMode] = useState(savedMode)
  const stopped = performanceConfigurable(state,sessionId)
  const capability = state.performanceFor === sessionId ? state.performance : null
  const selected = capability?.modes?.find(item => item.performanceMode === mode)
  const blocked = state.busy || state.performancePending || state.uncertain || !stopped || !mode || (mode !== 'compatibility' && !selected?.available)
  if(!stopped)return null
  return <section className={css.section} data-whale-performance data-settings-draft="set-performance-mode"><h3>{t('performanceTitle')}</h3><p className={css.hint}>{t('performanceHint')}</p>
    <p className={css.hint} data-whale-probe-cost>部分模型的检测会发送计费短请求。</p><details className={css.details}><summary>检测范围与费用</summary><p>{t('performanceProbeCost')}</p><p>{t('performanceProbeScope')}</p></details>
    <PerformanceProbeStatus capability={capability} t={t} pending={state.performancePending} error={state.performanceError}/>
    {!capability && <p className={css.hint}>{t('performanceReadFirst')}</p>}
    {savedMode && <p className={css.hint}>当前：{t('performance_'+savedMode)}</p>}
    <div className={css.segmented}>{['fast','balanced','high','compatibility'].map(value => {
      const unsupported = value==='compatibility' ? null : capability ? performanceDisabledHint(capability, value) : 'performanceReadFirst'
      return <Button key={value} title={unsupported ? t(unsupported) : undefined} aria-pressed={mode === value} disabled={state.busy || state.performancePending || Boolean(unsupported)} onClick={() => { markSettingsEdited?.('set-performance-mode'); setMode(value) }}><PerformanceChoice value={value} t={t}/></Button>
    })}</div>
    <div className={css.actions}><Button variant="outline" disabled={state.busy || state.performancePending} onClick={()=>void run(sessionId,'inspect-performance')}>{t('inspectPerformance')}</Button><Button variant="outline" disabled={blocked || mode === savedMode} onClick={() => { void run(sessionId, 'set-performance-mode', { revision: settings.revision, performanceMode: mode }) }}>{t('savePerformance')}</Button></div>
  </section>
}

function OutputVolumeEditor({ state, sessionId, run, t }) {
  const output = state.outputVolumeFor === sessionId ? state.outputVolume : null
  const [draft, setDraft] = useState(null), [draftRevision,setDraftRevision]=useState(null)
  const value = draft ?? output?.volume ?? 1
  const conflict=draft!==null&&draftRevision!==output?.revision
  useEffect(() => { setDraft(null);setDraftRevision(null) }, [sessionId])
  return <section className={css.section}><h3>{t('outputVolume')}</h3>
    {output && !output.supported && <p className={css.hint}>{t('outputVolumeUnavailable')}</p>}
    {output?.supported && <><div className={css.volumeRow}><label className={css.volumeControl}><MotionRange aria-label={t('outputVolume')} min="0" max="1" step="0.01" value={value} disabled={!output.supported || state.busy || state.outputVolumeUncertain} onChange={event => { if(draft===null)setDraftRevision(output.revision);setDraft(Number(event.target.value)) }}/><span>{Math.round(value*100)}%</span></label><Button variant="outline" disabled={!output.supported || state.busy || state.outputVolumeUncertain || conflict || draft === null} onClick={async() => { if(await run(sessionId, 'set-output-volume', { revision: draftRevision, volume: draft }))setDraft(null) }}>{t('saveOutputVolume')}</Button></div><p className={css.hint}>下一段播放生效</p></>}

    {conflict&&<p role="status" className={css.notice}>音量已在别处更新，当前选择已保留。<Button variant="outline" disabled={state.busy} onClick={()=>setDraft(null)}>使用当前音量</Button></p>}
    {!output && <p role="status" className={css.hint}>{state.busy ? t('pending') : t('statusRetry')}</p>}
    {state.outputVolumeUncertain && <p role="status" className={css.notice}>{t('outputVolumeUnknown')}</p>}
  </section>
}

function TtsCapabilities({ t }) {
  return <section className={css.section} data-whale-tts><h3>{t('voiceClone')}</h3><p className={css.hint}>{t('voiceCloneAvailable')}</p><p className={css.hint}>{t('voiceClonePrivacy')}</p></section>
}
/** Dedicated conversation LLM defaults. These choices never configure ASR or TTS. */
export function ConversationModelEditor({state,sessionId,run,markSettingsEdited,discardSettingsDraft}) {
  const settings=state.settingsFor===sessionId?state.settings:null
  const saved=settings?.conversationModel??{mode:'auto',provider:null,model:null}
  const [draft,setDraft]=useState(saved)
  const [feedback,setFeedback]=useState('')
  const [saving,setSaving]=useState(false)
  const pending=useRef(false),mounted=useRef(true)
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false}},[])
  const inventory=state.conversationModelsFor===sessionId?state.conversationModels:null
  const providers=inventory?.providers??[]
  const provider=providers.find(item=>item.id===draft.provider)
  const valid=draft.mode==='auto'||Boolean(provider?.models.some(item=>item.id===draft.model))
  const changed=JSON.stringify(draft)!==JSON.stringify(saved)
  const status=state.status
  const stopped=state.checkedFor===sessionId&&!state.uncertain&&status?.enabled===false&&status?.ownerSessionId===null&&status?.voiceControlBusy===false&&status?.voiceSession?.fullyStopped===true&&status?.voiceSession?.id===null
  const locked=!settings||!stopped||state.busy||state.settingsConflict||state.visibilityUncertain||saving
  const patch=value=>{markSettingsEdited?.('save-conversation-model');setDraft(current=>({...current,...value}));setFeedback('')}
  const save=async()=>{
    if(locked||pending.current||!changed||!valid)return
    pending.current=true;setSaving(true);setFeedback('')
    const ok=await run(sessionId,'save-conversation-model',{revision:settings.revision,values:draft.mode==='auto'?{mode:'auto',provider:null,model:null}:draft})
    pending.current=false
    if(mounted.current){setSaving(false);setFeedback(ok?'默认已保存，下次开启语音生效。':'保存未成功，草稿已保留。请核查提示后再操作。')}
  }
  return <section className={css.section} data-conversation-model data-settings-draft="save-conversation-model">
    <h3>默认对话模型</h3><p className={css.hint}>接收语音识别后的文字，用于生成回答。</p>
    <fieldset className={css.radios} disabled={locked} aria-label="对话模型选择方式">
      {[['auto','自动'],['manual','手动指定']].map(([mode,label])=><label key={mode}><input type="radio" name={'conversation-mode-'+sessionId} checked={draft.mode===mode} onChange={()=>patch(mode==='auto'?{mode,provider:null,model:null}:{mode})}/>{label}</label>)}
    </fieldset>
    {draft.mode==='auto'&&<div className={css.section}><p className={css.hint}>跟随当前对话所选模型。空白首页使用 DSH 的默认模型。</p><p>开启语音时确定模型来源</p></div>}<MotionCollapse open={draft.mode==='manual'}><div className={css.section} data-conversation-manual>
      <ConversationModelChoice label="供应商" value={draft.provider} options={providers} disabled={locked||!inventory} onChange={provider=>patch({provider,model:null})}/>
      <ConversationModelChoice label="模型" value={draft.model} options={provider?.models??[]} disabled={locked||!provider} onChange={model=>patch({model})}/>
      <p className={css.hint}>仅列出宿主已配置的对话供应商与模型，保存时再次验证。</p>
      {!inventory&&<p role="status">{state.conversationModelsError?'暂时无法读取供应商，请重试。':'正在读取供应商…'}</p>}
      {inventory&&!providers.length&&<p role="status">暂无可用对话模型，请先在 DSH 中配置供应商。</p>}
      {draft.provider&&!valid&&<p role="status">请选择当前可用的供应商与模型。原选择不会自动替换。</p>}
      <Button variant="outline" disabled={state.busy} onClick={()=>void run(sessionId,'conversation-models')}>刷新供应商</Button>
    </div></MotionCollapse>
    <div className={css.actions}><Button variant="primary" disabled={locked||!changed||!valid} onClick={()=>void save()}>{saving?'保存中…':'保存默认'}</Button><Button variant="outline" disabled={locked||!changed} onClick={()=>{setDraft(saved);setFeedback('');discardSettingsDraft?.('save-conversation-model')}}>取消修改</Button></div>
    <p role="status" className={css.hint}>{feedback||(changed?'尚未保存':saved.mode==='auto'?'已保存：自动 · 跟随当前对话':`已保存：${saved.provider} / ${saved.model}`)}</p>
  </section>
}
/** Small keyboard-accessible listbox keeps dropdown motion under our control. */
function ConversationModelChoice({label,value,options,disabled,onChange}) {
  const [open,setOpen]=useState(false),[index,setIndex]=useState(0)
  const root=useRef(null),trigger=useRef(null),list=useRef(null),id=useId()
  const selected=options.find(item=>item.id===value)
  useEffect(()=>{if(disabled)setOpen(false)},[disabled])
  useEffect(()=>{if(open)list.current?.querySelector('[data-option-index="'+index+'"]')?.focus()},[open,index])
  const close=()=>{setOpen(false);trigger.current?.focus()}
  const choose=item=>{onChange(item.id);close()}
  return <div ref={root} className={css.conversationChoice} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setOpen(false)}}>
    <span id={id+'-label'}>{label}</span>
    <Button ref={trigger} variant="outline" className={css.deviceSelect} aria-label={label} aria-haspopup="listbox" aria-expanded={open} aria-controls={id} disabled={disabled||!options.length} onClick={()=>{setIndex(Math.max(0,options.findIndex(item=>item.id===value)));setOpen(!open)}} onKeyDown={event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();setIndex(Math.max(0,options.findIndex(item=>item.id===value)));setOpen(true)}}}>{selected?.name||value||'请选择'}<span aria-hidden="true">⌄</span></Button>
    {open&&<MenuSurface ref={list} id={id} className={css.conversationOptions} role="listbox" aria-labelledby={id+'-label'} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close()}else if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();setIndex(current=>event.key==='Home'?0:event.key==='End'?options.length-1:(current+(event.key==='ArrowDown'?1:-1)+options.length)%options.length)}}}>
      {options.map((item,i)=><button type="button" key={item.id} role="option" aria-selected={value===item.id} tabIndex={i===index?0:-1} data-option-index={i} onClick={()=>choose(item)}>{item.name}{value===item.id&&<span aria-hidden="true"> ✓</span>}</button>)}
    </MenuSurface>}
  </div>
}

/** Optional voice-session prompt. Saved mode is never inferred from an unsaved draft. */
export function VoicePromptEditor({state,sessionId,run,markSettingsEdited,discardSettingsDraft,t}) {
  const settings=state.settingsFor===sessionId?state.settings:null
  const saved=settings?.voicePrompt
  const savedText=saved?.text??''
  const [draft,setDraft]=useState(savedText),[saving,setSaving]=useState(false),[feedback,setFeedback]=useState('')
  const pending=useRef(false),mounted=useRef(true),baseline=useRef(savedText)
  const id=useId()
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false}},[])
  useEffect(()=>{if(baseline.current!==savedText){const previous=baseline.current;setDraft(current=>current===previous?savedText:current);baseline.current=savedText}},[savedText])
  const text=draft.trim()?draft:''
  const changed=text!==(savedText.trim()?savedText:'')
  const status=state.status
  const stopped=state.checkedFor===sessionId&&!state.uncertain&&status?.enabled===false&&status?.ownerSessionId===null&&status?.voiceControlBusy===false&&status?.voiceSession?.fullyStopped===true&&status?.voiceSession?.id===null
  const locked=!settings||!stopped||state.busy||state.settingsConflict||state.visibilityUncertain||saving
  const unsupported=Boolean(text)&&saved?.customSupported!==true
  const valid=draft.length<=32768&&!unsupported
  const save=async()=>{
    if(locked||pending.current||!changed||!valid)return
    pending.current=true;setSaving(true);setFeedback('')
    let ok=false
    try {ok=await run(sessionId,'save-voice-prompt',{revision:settings.revision,values:{text}})}
    catch {ok=false}
    finally {pending.current=false;if(mounted.current){setSaving(false);setFeedback(t(ok?'voicePromptSaved':'voicePromptSaveFailed'))}}
  }
  return <section className={`${css.section} ${css.voicePrompt}`} data-voice-prompt data-settings-draft="save-voice-prompt">
    <label htmlFor={id}>{t('voicePromptLabel')} <span className={css.hint}>{t('voicePromptOptional')}</span></label>
    <textarea id={id} className={css.voicePromptInput} value={draft} maxLength={32768} disabled={locked} placeholder={t('voicePromptPlaceholder')} aria-describedby={id+'-count '+id+'-feedback'} onChange={event=>{markSettingsEdited?.('save-voice-prompt');setDraft(event.target.value);setFeedback('')}}/>
    <div id={id+'-count'} className={css.voicePromptCount}>{draft.length.toLocaleString('en-US')} / 32,768</div>
    <div className={css.voicePromptActions}><div className={css.actions}><Button variant="primary" disabled={locked||!changed||!valid} onClick={()=>void save()}>{t(saving?'voicePromptSaving':'voicePromptSave')}</Button><Button variant="outline" disabled={locked||draft===savedText} onClick={()=>{setDraft(savedText);setFeedback('');discardSettingsDraft?.('save-voice-prompt')}}>{t('voicePromptCancel')}</Button></div><span className={css.hint}>{t('voicePromptStopToEdit')}</span></div>
    <p id={id+'-feedback'} role="status" className={css.hint}>{feedback||(draft.length>32768?t('voicePromptTooLong'):saved?.customSupported===false||unsupported?t('voicePromptUnsupported'):changed?t('voicePromptUnsaved'):'')}</p>
  </section>
}

/** Minimal desktop-pet boundary: a read-only placeholder, no simulated pet runtime. */
export const desktopPetPlaceholder = Object.freeze({ version: 1, available: false, reason: 'planned' })
const SETTINGS_TABS = ['audio', 'interaction', 'prompt', 'models', 'advanced', 'sessions', 'pets']
const PAGE_HINTS = {
  audio: '选择麦克风、说话方式与提示音。',
  interaction: '设置按键、回答速度与界面动画。',
  prompt: '设置语音对话的表达方式。',
  models: '选择朗读方式，或管理本地模型。',
  advanced: '查看权限、请求与运行详情。',
  sessions: '选择语音对话目标，查看鱼应会话和子代理。',
  pets: '桌宠功能尚未开放。',
}

export function Settings(props) {
  const { t, sessionId } = props
  const state = props.useWhaleUi(value => value)
  const preferences = props.useWhalePreferences(value => value)
  const tab = state.settingsTab || 'audio', modelTab = state.settingsModelTab || 'conversation'
  const [visited, setVisited] = useState(()=>new Set([state.settingsTab || 'audio']))
  const [modelVisited, setModelVisited] = useState(()=>new Set([state.settingsModelTab || 'conversation']))
  const [preview, setPreview] = useState(0)
  const settingsBody = useRef(null), nav = useRef(null), navIntent = useRef(0)
  const attempted = useRef(new Set()), readRefresh=useRef(state.readRefresh)
  const headingId = useId()
  useLayoutEffect(() => { if (settingsBody.current) settingsBody.current.scrollTop = 0 }, [tab, modelTab])
  useEffect(() => { props.setSession?.(sessionId) }, [sessionId])
  useEffect(() => () => { navIntent.current++; void props.cancelPreview?.(); props.discardDiagnostics?.() }, [])
  useEffect(() => { attempted.current.clear() }, [sessionId, tab, modelTab])
  useEffect(() => { if(tab==='models')void props.refreshModelCompute?.(sessionId) }, [sessionId,tab,modelTab])
  // Read-only preparation is serialized with the controller. No download, playback,
  // settings write or microphone action runs just because a page became visible.
  useEffect(() => {
    if (state.busy || state.ttsCancelling || ['pets', 'sessions'].includes(tab)) return
    // A child effect can acquire the controller between this render and effect.
    // Do not consume an automatic read attempt before it can be admitted.
    const latest = props.readState?.()
    if (latest?.busy || latest?.ttsCancelling) return
    const refreshed=readRefresh.current!==state.readRefresh
    if(refreshed){readRefresh.current=state.readRefresh;for(const action of ['read-output-volume','model-installer','agent-requests'])attempted.current.delete(action)}
    const reads = [
      ...(!state.settings || state.settingsFor !== sessionId ? ['read-settings'] : []),
      ...(!state.status || state.checkedFor !== sessionId || tab === 'advanced' ? ['status'] : []),
      ...(tab === 'audio' ? ['read-output-volume'] : []),
      ...(tab === 'models' && modelTab === 'conversation' ? ['conversation-models'] : []),
      ...(sessionId && tab === 'advanced' ? ['agent-requests'] : []),
      ...(sessionId && tab === 'interaction' && state.performanceFor !== sessionId ? ['inspect-performance'] : []),
      ...(tab === 'models' && modelTab === 'voice' && (!state.ttsCapabilities || state.ttsCapabilitiesFor !== sessionId) ? ['inspect-tts'] : []),
      ...(tab === 'models' ? ['model-installer'] : []),
    ]
    const action = reads.find(value => !attempted.current.has(value))
    if (action) { attempted.current.add(action); void props.run(sessionId, action, {}, true) }
  }, [sessionId, tab, modelTab, state.readRefresh, state.busy, state.ttsCancelling, state.settingsFor, state.checkedFor, state.outputVolumeFor, state.agentRequestsFor, state.performanceFor, state.ttsCapabilitiesFor, state.installerFor])
  const changeTab = async (value, focus = false) => {
    const intent = ++navIntent.current
    if (props.cancelPreview && !await props.cancelPreview()) return
    props.discardDiagnostics?.()
    if (intent !== navIntent.current) return
    setVisited(current=>new Set([...current,value]))
    props.setSettingsTab(value)
    if (focus) nav.current?.querySelector(`[data-settings-tab="${value}"]`)?.focus({ preventScroll:true })
  }
  const changeModelTab = async value => {
    const intent = ++navIntent.current
    if (props.cancelPreview && !await props.cancelPreview()) return
    props.discardDiagnostics?.()
    if (intent === navIntent.current) { setModelVisited(current=>new Set([...current,value])); props.setSettingsModelTab(value) }
  }
  const settings = state.settingsFor === sessionId ? state.settings : null
  const statusFresh = !state.uncertain && state.checkedFor === sessionId
  const editor = settings && <SettingsEditor key={sessionId+':'+(state.settingsKey??settings.revision)} settings={settings} sessionId={sessionId} busy={state.busy || state.visibilityUncertain || state.settingsConflict} run={props.run} t={t} status={state.status} statusFresh={statusFresh} verified={statusFresh && Boolean(state.status)} tab={tab} markSettingsEdited={props.markSettingsEdited} discardSettingsDraft={props.discardSettingsDraft} bindingError={state.bindingError} captureBindings={props.captureBindings}/>
  return <div className={css.settings} data-whale-settings data-motion={preferences.motion}>
    <header className={css.settingsHeader} data-settings-header>
      <Button className={css.backButton} data-whale-operation="page-home" onClick={props.showHome} aria-label="返回语音"><Icon name="chevron" className={css.backIcon}/><span>返回语音</span></Button>
      <div className={css.settingsBrand}><WhaleMark small/><h2>{t('settingsTitle')}</h2></div>
      <Button className={css.guideButton} data-whale-operation="page-setup" onClick={props.openSetup} aria-label="重新打开配置引导" title="重新打开配置引导">配置引导</Button>
    </header>
    <div className={css.settingsLayout}>
      <nav ref={nav} className={css.settingsNav} data-settings-nav aria-label={t('settingsSections')} onKeyDown={event => {
        const current = SETTINGS_TABS.indexOf(event.target.dataset.settingsTab)
        if (current < 0 || !['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return
        event.preventDefault()
        const index = event.key === 'Home' ? 0 : event.key === 'End' ? SETTINGS_TABS.length-1 : (current + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1) + SETTINGS_TABS.length) % SETTINGS_TABS.length
        void changeTab(SETTINGS_TABS[index], true)
      }}>{SETTINGS_TABS.map(value => <Button key={value} data-settings-tab={value} aria-pressed={tab === value} aria-controls={headingId+'-body'} onClick={() => { void changeTab(value) }}>{t('tab_' + value)}</Button>)}</nav>
      <div className={css.settingsPage}>
        <div className={`${css.pageHeading} ${tab==='models'?css.modelHeading:''}`} data-settings-page-heading data-no-drag><div><h3 id={headingId}>{t('tab_'+tab)}</h3>{tab!=='models'&&<p>{PAGE_HINTS[tab]}</p>}</div>{tab==='prompt'&&settings&&<span className={css.voicePromptMode} data-voice-prompt-mode>{t(settings.voicePrompt?.mode==='custom'&&settings.voicePrompt?.customSupported===true?'voicePromptCustom':'voicePromptAgents')}</span>}{tab==='models'&&<nav className={css.modelNav} aria-label="模型设置分类" data-no-drag>{[['conversation','对话模型'],['voice','朗读方式'],['download','模型下载'],['paths','高级路径']].map(([value,label])=><Button key={value} aria-pressed={modelTab===value} onClick={()=>void changeModelTab(value)}>{label}</Button>)}</nav>}</div>
        <div ref={settingsBody} id={headingId+'-body'} className={css.settingsBody} data-settings-body data-no-drag onChangeCapture={event=>{const section=event.target.closest('[data-settings-draft]');if(section&&!event.target.closest('[data-no-settings-draft]'))props.markSettingsEdited?.(section.dataset.settingsDraft)}} tabIndex={0} aria-label={t('settingsContent')}>
          {tab === 'sessions' ? <>{props.listExistingVoiceSessions && !state.sessionManagementRoot && <ExistingSessionBinding {...props} state={state}/>}<SessionManagement {...props} state={state}/></> : tab === 'pets' ? <section className={css.placeholder} data-whale-pet aria-label={t('tab_pets')}><Icon name="pet"/><h3>{t('tab_pets')}</h3><p>{t('planned')}</p></section> : <>

            {state.error && <div role="alert" className={css.error}>{t('operationUnavailable')}</div>}
            {state.settingsConflict && <p role="status" className={css.notice}>设置已在别处更新，当前草稿已保留。<Button variant="outline" disabled={state.busy} onClick={()=>props.discardSettingsDraft?.()}>放弃草稿并使用最新设置</Button></p>}
            {state.visibilityUncertain && <p role="status" className={css.notice}>{t('configurationUnknown')}</p>}
            {!settings && <p role="status" className={css.hint}>{state.busy ? '正在读取设置…' : '暂时无法读取设置。返回窗口时会自动核查。'}</p>}
            {tab !== 'interaction' && statusFresh && !(tab==='models'&&modelTab==='download') && (state.status?.enabled || state.status?.ownerSessionId) && <div className={css.editNotice} role="status"><div><strong>语音正在使用</strong><span> · 停止后可修改相关设置</span></div><Button variant="outline" disabled={state.busy && (!state.interruptibleRead || state.diagnosticStopPending) || state.ttsCancelling} onClick={()=>void props.run(sessionId,'disable')}>停止语音以编辑</Button></div>}
          </>}
          <div hidden={!['audio','interaction','advanced'].includes(tab)}>{editor}</div>
          {(tab === 'audio' || visited.has('audio')) && <div hidden={tab!=='audio'}><OutputVolumeEditor {...props} state={state}/></div>}
          {(tab === 'interaction' || visited.has('interaction')) && <div hidden={tab!=='interaction'}>
            {settings && <PerformanceEditor key={'performance:'+sessionId+':'+(state.settingsKey??settings.revision)} {...props} state={state}/>}
            <section className={css.section}><h3>{t('motionTitle')}</h3><div className={css.segmented}>{['spring','firm','off'].map(value => <Button key={value} aria-pressed={preferences.motion === value} onClick={() => { props.setMotion(value); setPreview(preview+1) }}>{t('motion_' + value)}</Button>)}</div><div key={preview} className={css.motionPreview} aria-hidden="true"><WhaleMark small/></div><p className={css.hint}>{t('motionHint')}</p>{preferences.error && <p role="status">{t('motionNotSaved')}</p>}</section>
          </div>}
          {(tab === 'prompt' || visited.has('prompt'))&&settings&&<div hidden={tab!=='prompt'}><VoicePromptEditor key={'prompt:'+sessionId+':'+(state.settingsKey??settings.revision)} {...props} state={state}/></div>}
          {(tab === 'models' || visited.has('models')) && <div hidden={tab!=='models'}>
            {settings&&(modelTab === 'conversation' || modelVisited.has('conversation'))&&<div data-whale-tab-panel hidden={modelTab!=='conversation'}><ConversationModelEditor key={'conversation:'+sessionId+':'+(state.settingsKey??settings.revision)} {...props} state={state}/></div>}
            {(modelTab === 'voice' || modelVisited.has('voice')) && <div data-whale-tab-panel hidden={modelTab!=='voice'}><TtsSetupEditor pickPath={props.pickPath} state={state} sessionId={sessionId} run={props.run} markSettingsEdited={props.markSettingsEdited} prepared active={tab==='models'&&modelTab==='voice'}/></div>}
            {(modelTab === 'download' || modelVisited.has('download')) && <div data-whale-tab-panel hidden={modelTab!=='download'}><ModelInstallerEditor state={state} sessionId={sessionId} run={props.run}/></div>}
            {settings?.modelSetup&&<ModelEditor modelTab={modelTab} markSettingsEdited={props.markSettingsEdited} pickPath={props.pickPath} senseVoiceAsrAction={props.senseVoiceAsrAction} active={tab==='models'} key={sessionId+':'+(state.settingsKey??settings.revision)} settings={settings} sessionId={sessionId} busy={state.busy||state.visibilityUncertain||state.settingsConflict} run={props.run} t={t}/>}
            {(modelTab === 'paths' || modelVisited.has('paths')) && <div data-whale-tab-panel hidden={modelTab!=='paths'}><LocalTtsPaths state={state} sessionId={sessionId} run={props.run} pickPath={props.pickPath} active={tab==='models'&&modelTab==='paths'}/></div>}

          </div>}
          {(tab === 'advanced' || visited.has('advanced')) && <div hidden={tab!=='advanced'}>
            {props.updateAction && <UpdateSettings state={state} open={props.openUpdate} t={t}/>}
            <section className={css.section} aria-label={t('projectInfoTitle')}>
              <h3>{t('projectInfoTitle')}</h3>
              <dl className={css.details}>
                <dt>{t('projectAuthor')}</dt>
                <dd><a href={projectAuthor.url} target="_blank" rel="noreferrer noopener">{projectAuthor.name}</a></dd>
                <dt>{t('projectRepository')}</dt>
                <dd><a href={projectHomepage} target="_blank" rel="noreferrer noopener">Emikosama/{projectPackage}</a></dd>
                <dt>{t('projectNpm')}</dt>
                <dd><a href={`https://www.npmjs.com/package/${projectPackage}`} target="_blank" rel="noreferrer noopener">{projectPackage}</a></dd>
              </dl>
            </section>
            <AgentRequests {...props} state={state} active={tab==='advanced'}/>
            <OperationLogView readOperationLog={props.readOperationLog}/>
            <Diagnostics state={state} sessionId={sessionId} t={t}/>
            <details className={css.section}><summary>对话显示与兼容性</summary>{settings?.voiceSession && <VisibilityEditor key={'visibility:'+sessionId+':'+(state.settingsKey??settings.revision)} settings={settings} state={state} sessionId={sessionId} run={props.run} t={t}/>}</details>
          </div>}
        </div>
      </div>
    </div>
  </div>
}

const sessionDate = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
})

function SessionManagement({ manageSessions, openManagedSession, renameManagedSession, setSessionManagement, state }) {
  const rootId = state.sessionManagementRoot ?? null
  const [result, setResult] = useState(null)
  const [pending, setPending] = useState(null), [busy, setBusy] = useState(false), [message, setMessage] = useState(null)
  const [editing, setEditing] = useState(null)
  const active = useRef(null)
  const execute = useCallback(async (request, { append = false } = {}) => {
    if (!manageSessions) return
    active.current?.abort()
    const abort = new AbortController()
    active.current = abort
    setBusy(true)
    setMessage(null)
    try {
      if (request.operation !== 'list') {
        await manageSessions(request, abort.signal)
        if (!abort.signal.aborted) setMessage(request.operation === 'restore' ? '已取消归档。可打开原会话继续。' : '已公开此会话。')
      }
      const value = await manageSessions(request.operation === 'list' ? request : {
        operation: 'list', ...(rootId ? { rootId } : {}),
      }, abort.signal)
      if (abort.signal.aborted || active.current !== abort) return
      setResult(previous => append && previous ? {
        ...value, items: [...new Map([...previous.items, ...value.items].map(row => [row.id, row])).values()],
      } : value)
    } catch (error) {
      if (!abort.signal.aborted) setMessage(String(error?.message ?? '无法读取鱼应会话').slice(0, 400))
    } finally {
      if (active.current === abort) { active.current = null; setBusy(false) }
    }
  }, [rootId, manageSessions])
  useEffect(() => {
    void execute({ operation: 'list', ...(rootId ? { rootId } : {}) })
    return () => { const abort = active.current; active.current = null; abort?.abort() }
  }, [execute, rootId])
  const navigate = id => { setResult(null); setPending(null); setEditing(null); setSessionManagement({ rootId: id, historyOpen: false }) }
  const confirm = (operation, row) => { setEditing(null); setPending({ operation, id: row.id, rootId: row.rootId }) }
  const open = async row => {
    try { await openManagedSession(row) }
    catch (error) { setMessage(String(error?.message ?? '无法在 DSH 打开会话').slice(0, 400)) }
  }
  const saveName = async event => {
    event.preventDefault()
    const name = editing.title.trim()
    if (!name || busy) return
    setBusy(true)
    setMessage(null)
    try {
      const title = await renameManagedSession(editing.id, name)
      setResult(previous => previous && { ...previous, items: previous.items.map(row => row.id === editing.id ? { ...row, title } : row) })
      setEditing(null)
      setMessage('已保存会话名称。')
    } catch (error) {
      setMessage(String(error?.message ?? '无法重命名会话').slice(0, 400))
    } finally { setBusy(false) }
  }
  const root = rootId ? result?.items?.find(row => row.id === rootId) : null
  const reasonLabel = {
    restore_unavailable: '恢复接口不可用',
    archive_state_unavailable: '无法读取归档状态',
    persistence_unavailable: '会话存储暂时不可用',
    policy_mismatch: '当前会话权限与原会话不同',
    presentation_mismatch: '当前 DSH 无法确认会话的隐藏状态',
    visibility_mismatch: '当前显示设置与原会话不同',
  }
  const rowList = rows => <ul className={css.permissionList}>{rows.map(row => <li key={row.id}>
      <strong className={css.sessionTitle}>{row.title || (row.kind === 'root' ? '未命名会话' : '未命名子代理') + ' · ' + row.id.slice(-6).toUpperCase()}</strong>
      <p className={css.hint}>{row.archived ? '已归档' : row.visibility === 'hidden' ? '已隐藏' : row.visibility === 'visible' || row.visibility === 'workspace' ? '可见' : '可见性未知'}{reasonLabel[row.reason] ? ' · ' + reasonLabel[row.reason] : ''}</p>
      {Number.isFinite(row.createdAt) && <p className={css.hint}>创建于 <time dateTime={new Date(row.createdAt).toISOString()}>{sessionDate.format(row.createdAt)}</time></p>}
      <div className={css.actions}>
        {row.kind === 'root' && !rootId && <Button variant="outline" disabled={busy} data-whale-operation="show-subagents" onClick={() => navigate(row.id)}>查看子代理</Button>}
        {openManagedSession && ['live', 'available'].includes(row.status) && <Button variant="outline" data-whale-operation={row.kind === "root" ? "open-native-session" : "open-native-subagent"} onClick={() => open(row)}>在 DSH 打开</Button>}
        {renameManagedSession && row.kind === 'root' && ['live', 'available', 'archived'].includes(row.status) && <Button variant="outline" disabled={busy} onClick={() => { setPending(null); setEditing({ id: row.id, title: row.title ?? '' }) }}>重命名</Button>}
        {row.canUnhide && <Button variant="outline" disabled={busy} onClick={() => confirm('unhide', row)}>取消隐藏</Button>}
        {row.canRestore && <Button variant="outline" disabled={busy} onClick={() => confirm('restore', row)}>恢复归档</Button>}
      </div>
      {pending?.id === row.id && <div className={css.actions}><span>{pending.operation === 'unhide' ? '确认在 DSH 公开此会话？' : '确认取消此会话的归档？'}</span>
        <Button variant="primary" disabled={busy} onClick={() => { const request = pending; setPending(null); void execute(request) }}>确认</Button>
        <Button variant="outline" onClick={() => setPending(null)}>取消</Button></div>}
      {editing?.id === row.id && <form className={css.sessionRename} onSubmit={saveName}>
        <Input aria-label="会话名称" value={editing.title} maxLength={128} disabled={busy} onChange={event => setEditing({ ...editing, title: event.target.value })}/>
        <div className={css.actions}><Button type="submit" variant="primary" disabled={busy || !editing.title.trim()}>保存名称</Button>
        <Button type="button" variant="outline" disabled={busy} onClick={() => setEditing(null)}>取消</Button></div>
      </form>}
    </li>)}</ul>

  const rows = (result?.items ?? []).filter(row => row.id !== rootId)
  const activeRows = rows.filter(row => row.active)
  const history = rows.filter(row => !row.active).sort((a, b) => (b.createdAt ?? -1) - (a.createdAt ?? -1))
  return <section className={css.section} data-whale-session-management>
    {rootId && <Button variant="outline" disabled={busy} data-whale-operation="show-main-sessions" onClick={() => navigate(null)}>返回主会话</Button>}
    {busy && !result && <p role="status">正在读取鱼应会话…</p>}
    {message && <p role="status" className={css.notice}>{message}</p>}
    {root && rowList([root])}
    {root?.childrenAvailable && root?.childrenIncomplete && <p role="status">部分子代理记录暂时无法核验。当前显示已核验的会话。</p>}
    {root && !root.childrenAvailable && <p role="status">当前无法读取此会话的子代理记录。</p>}
    {root?.childrenAvailable && !root.childrenIncomplete && !rows.length && <p>此会话还没有子代理。</p>}
    {activeRows.length > 0 && rowList(activeRows)}
    {result && !rootId && activeRows.length === 0 && <p className={css.hint}>暂无活跃会话。</p>}
    {(history.length > 0 || result?.nextCursor) && <details className={css.section} data-whale-session-history open={state.sessionHistoryOpen === true}
      onToggle={event => { const { open } = event.currentTarget; if (open !== Boolean(state.sessionHistoryOpen)) setSessionManagement({ historyOpen: open }) }}>
      <summary data-whale-operation={rootId ? 'subagent-history' : 'session-history'}>{rootId ? '历史子代理' : '历史会话'}</summary>
      {rowList(history)}
      {!!result?.nextCursor && <Button disabled={busy} onClick={() => void execute({ operation: 'list', cursor: result.nextCursor }, { append: true })}>加载更多</Button>}
    </details>}
    <Button variant="outline" disabled={busy} onClick={() => void execute({operation:'list', ...(rootId ? { rootId } : {})})}>刷新会话</Button>
    {result?.capabilities?.unhide?.supported === false && <p className={css.hint}>当前 DSH 版本暂时无法把子代理加入侧边栏。</p>}
    {result?.capabilities?.restore?.supported === false && <p className={css.hint}>当前 DSH 版本暂时无法通过鱼应取消归档。</p>}
  </section>
}

function Diagnostics({state,sessionId,t}) {
  const status=state.status,owner=status?.ownerSessionId
  const current = !state.uncertain && state.checkedFor === sessionId
  const helperError = current && typeof status?.helper?.lastError === 'string' ? status.helper.lastError : null
  const error=state.error??state.enableError
  return <details className={css.section}><summary>{t('details')}</summary><dl className={css.details}><dt>{t('source')}</dt><dd data-whale-owner data-session-id={owner ?? ''}>{owner || t('none')}</dd><dt>{t('actor')}</dt><dd data-whale-actor data-session-id={sessionId ?? ''}>{sessionId || t('openSession')}</dd></dl><p className={css.hint}>{t('snapshot')}</p>{error&&<pre className={css.requestDetails}>{error}</pre>}{helperError&&<div data-whale-helper-error><strong>{t('inputDiagnosticTitle')}</strong><pre className={css.requestDetails}>{helperError}</pre><p className={css.hint}>{t('inputDiagnosticHistory')}</p></div>}<p className={css.hint}>{t('consequence')}</p><p className={css.hint}>{status?.helper?.online ? t('helperOnline') : t('helperOffline')}</p>{status?.turnSignals?.outputStartObservation?.status === 'unsupported' && <p className={css.hint}>{t('outputObservationUnavailable')}</p>}</details>
}

/** Operation records and cancellation of legacy previews; authorization is centralized. */
export function AgentRequests({state,sessionId,run,openAuthorization,active=true}) {
  const initialRead=useRef(null), scope=useRef(0)
  useEffect(()=>{initialRead.current=null;scope.current++},[active,sessionId])
  useEffect(()=>{
    if(!active||!sessionId||state.busy||state.agentRequestsFor===sessionId||initialRead.current===sessionId)return
    initialRead.current=sessionId
    const intent=scope.current
    if(scope.current===intent)void run(sessionId,'agent-requests')
  },[active,sessionId,state.busy])
  const current=state.agentRequestsFor===sessionId ? state.agentRequests : null
  return <section className={css.section} data-whale-agent-requests><h3>Agent 操作记录</h3>
    <Button data-whale-operation="page-authorization" onClick={()=>void openAuthorization?.()}>授权范围与撤销</Button>
    {(state.agentPermissionUncertain||state.agentRequestUncertain)&&<p role="alert" className={css.notice}>结果尚未确认，会自动核查对应权限和请求状态，不会重复执行。</p>}
    {current?.items?.length===0&&<p className={css.hint}>没有待处理请求。</p>}
    {current?.items?.map(item=><section key={item.id} className={css.section} data-agent-request={item.id}><strong>{item.title} · {item.state}</strong><p className={css.hint}>发起会话：{item.sourceSessionId}</p>
      <details><summary>核对完整变更计划</summary><pre className={css.requestDetails}>{JSON.stringify({当前设置:item.before,请求:item.request,...(item.installPlan?{下载计划:item.installPlan}:{}),...(item.modelApplyTarget?{模型应用目标:item.modelApplyTarget}:{})},null,2)}</pre></details>
      {item.error&&<p role="alert" className={css.error}>{item.error.message}</p>}
      {item.state==='pending'&&<Button variant="outline" disabled={state.busy||state.agentRequestUncertain} onClick={()=>void run(sessionId,'decide-agent-request',{id:item.id,approve:false,acknowledgements:[]})}>取消预览</Button>}
      {item.nextAction&&<p className={css.hint}>{item.nextAction}</p>}
    </section>)}
  </section>
}
