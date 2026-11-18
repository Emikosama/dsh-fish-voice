import { decodeReply } from './protocol.mjs'
import { liveVoiceRootId } from './conversation-view.mjs'
import { ownerSettingsActions } from '../conversation-contract.mjs'
const SETTINGS = ['save-voice-prompt','save-conversation-model','save-bindings','read-settings','save-settings','save-audio-device','save-models','set-visibility','set-performance-mode','save-tts','complete-setup','apply-model-install']
const WRITES = SETTINGS.filter(x=>x!=='read-settings')
const STATUS = ['status','enable','disable','new','resume','listen-mode']
const BOUND_SESSION_ACTIONS = new Set(['status','enable','disable','listen-mode','read-history'])
const INTERRUPTIBLE_READS = ['save-bindings','inspect-tts','inspect-model-compute']
// Cached/read-only facts only. Diagnostic subprocesses and paid effort probes are excluded.
const RECOVERABLE_READS = new Set(['conversation-models','status','read-settings','read-output-volume','model-installer','agent-permissions','agent-requests'])
const SAFE_READS = ['conversation-models','agent-permissions','agent-requests','status','read-settings','list','read-output-volume','inspect-performance','inspect-tts','model-installer','inspect-model-compute','plan-model-install']
/** UI identity is captured per request. Private streams never grant microphone access. */
export function createController(actionTransport, { schedule = (fn, delay) => globalThis.setTimeout(fn, delay), unschedule = timer => globalThis.clearTimeout(timer), observe = () => {} } = {}) {
  let historyRequest = 0
  const emptyHistory = {conversationHistory:null,conversationHistoryFor:null,conversationHistoryError:null,conversationHistoryLoading:false,conversationHistoryRequestCursor:null}
  let snapshot = {...emptyHistory, conversationModels:null,conversationModelsFor:null,conversationModelsError:null, authorization:null,authorizationOpen:false,authorizationLoading:false,authorizationBusy:false,authorizationUncertain:false,authorizationError:null,agentRequests:null,agentRequestsFor:null, busy:false,interruptibleRead:null,diagnosticStopPending:false,error:null,status:null,settings:null,settingsFor:null,visibilityUncertain:false,visibilityReadbackFor:null,catalog:null,checkedFor:null,catalogFor:null,uncertain:false,performance:null,performanceFor:null,performancePending:false,performanceError:null,conversation:null,conversationFor:null,conversationError:null,outputVolume:null,outputVolumeFor:null,outputVolumeUncertain:false,setupStatus:null,setupOpen:false,panelView:'home',setupError:null,ttsCapabilities:null,ttsCapabilitiesFor:null,ttsPreview:null,ttsPreviewFor:null,ttsCancelling:false,ttsUncertain:false,installer:null,installerFor:null,installerError:null,installerUncertain:false,installPlan:null,installPlanFor:null }
  const settingsEdited=new Set()
  let pendingSettings=null,browserVisible=true,panelVisible=true
  let navigation=0,interruptibleRead=null,diagnosticStop=null,pendingActions=0
  const backgroundReads=new Map()
  const discardBackgroundReads=()=>{
    for(const read of backgroundReads.values()){read.stale=true;read.abort.abort()}
    backgroundReads.clear()
  }
  // Page changes discard presentation only. Keep the bounded read RPC alive: an
  // aborted transport response is not evidence that its native process exited.
  const discardDiagnostics=()=>{discardBackgroundReads();if(interruptibleRead){interruptibleRead.stale=true;if(RECOVERABLE_READS.has(interruptibleRead.action))interruptibleRead.abort.abort()}}
  let automaticReads=false,pendingRefresh=null,refreshing=false,lastRefreshId=null,lastRefreshAt=0,readScope=0
  const readRecoveries=new Map()
  let alive=true,client=null,selected=null,stopConversation=null,conversationSource,stopModels=null,generation=0,modelGeneration=0,watchingModels=false,preview=null,cancelTask=null
  const listeners=new Set(),pendingReads=new Set(),setupPrepared=new Set(),probePrepared=new Set()
  const publish=patch=>{
    if(!alive)return
    const readOnlyFailure = Object.hasOwn(patch,'uncertain') ? patch.readOnlyFailure === true : snapshot.readOnlyFailure
    snapshot={...snapshot,...patch,readOnlyFailure}
    for(const fn of listeners)fn()
  }
  let updateStream, updateRequest, updateObservation = 0
  const updateInProgress = value => ['checking','installing'].includes(value?.status)
  const acceptUpdate = (updates, stream) => {
    if (stream?.revision !== undefined && updates.revision < stream.revision) return
    if (stream && updates.revision !== undefined) stream.revision = updates.revision
    publish({ updates, updatesUnavailable:false })
  }
  const refreshUpdates = () => {
    if (!alive || !client?.subscribeUpdates || updateStream || !browserVisible) return
    const source = client
    const stream = {}
    updateStream = stream
    stream.stop = source.subscribeUpdates(updates => {
      if (!alive || updateStream !== stream) return
      updateObservation++
      clearReadRecovery('update-stream')
      acceptUpdate(updates, stream)
    }, () => {
      if (!alive || updateStream !== stream) return
      updateStream = null
      publish({ updatesUnavailable:true })
      recoverRead(selected,'update-stream')
    })
  }
  const resetUpdates = () => {
    const stream = updateStream
    updateStream = null
    stream?.stop?.()
    updateRequest?.abort()
    updateRequest = null
    publish({ updates:null, updatePending:null, updatesUnavailable:false })
  }
  const updateAction = async request => {
    if (!alive || !client?.updateAction || updateRequest) return
    const { action, version } = request
    if (action === 'install' && (snapshot.updatesUnavailable || snapshot.updates?.canInstall !== true || snapshot.updates?.release?.version !== version)) return
    const source = client, abort = new AbortController()
    updateRequest = abort
    refreshUpdates()
    const stream = updateStream, observation = updateObservation
    publish({ updatePending:action })
    try {
      const updates = await source.updateAction(request, abort.signal)
      if (alive && updateRequest === abort && updateStream === stream) {
        // The previous protocol has no sequence. An install acceptance cannot
        // supersede a result that already arrived over the live stream.
        const oldAcceptance = updates.revision === undefined && updateInProgress(updates)
          && updateObservation !== observation && !updateInProgress(snapshot.updates)
        if (!oldAcceptance) acceptUpdate(updates, stream)
      }
    } catch {
      // The host may reload the plugin as part of an update. Only the next
      // snapshot can confirm the installed version or an application failure.
      const observedResult = updateObservation !== observation && !updateInProgress(snapshot.updates)
      if (alive && updateRequest === abort && updateStream === stream && !observedResult) publish({ updatesUnavailable:true })
    } finally {
      if (updateRequest === abort) {
        updateRequest = null
        publish({ updatePending:null })
      }
    }
  }
  // Late successful reads/stops cannot erase a newer unconfirmed output.
  let ttsUncertainty=0
  const markTtsUncertain=patch=>{ttsUncertainty++;publish({...patch,ttsUncertain:true})}
  const conversationScope = () => snapshot.status?.existingVoiceSession ? null : selected
  let transcriptRetry = null
  const finishTranscriptRetry = () => {
    transcriptRetry = null
    publish({ transcriptRetry: null })
  }
  const reconcileTranscriptRetry = conversation => {
    if (!transcriptRetry?.receipt || conversation?.rootSessionId !== transcriptRetry.sessionId) return
    const row = conversation.retryTranscripts?.items.find(item => item.id === transcriptRetry.id)
    if (!row || row.state !== 'ready' || transcriptRetry.receipt === 'unconfirmed' && conversation.revision > transcriptRetry.revision) finishTranscriptRetry()
  }
  const retryVoiceTranscript = async (sessionId, id) => {
    const { status, conversation, checkedFor, conversationFor, uncertain, busy } = snapshot
    const bound = status?.existingVoiceSession?.sessionId
    if (!alive || !client?.retryVoiceTranscript || transcriptRetry || uncertain || busy || selected !== sessionId || checkedFor !== sessionId
      || conversationFor !== sessionId || !status?.enabled || !bound || conversation?.rootSessionId !== bound
      || conversation.retryTranscripts?.sessionId !== bound || !conversation.retryTranscripts.items.some(item => item.id === id && item.state === 'ready')) return
    const source = client, abort = new AbortController()
    const request = transcriptRetry = { id, sessionId: bound, revision: conversation.revision, receipt: null }
    pendingReads.add(abort)
    publish({ transcriptRetry: { id, state:'sending' } })
    try {
      const result = await source.retryVoiceTranscript({ id }, abort.signal)
      if (!alive || transcriptRetry !== request) return
      if (result.accepted === false) finishTranscriptRetry()
      else request.receipt = 'accepted'
    } catch {
      if (!alive || transcriptRetry !== request) return
      request.receipt = 'unconfirmed'
    } finally {
      pendingReads.delete(abort)
      if (transcriptRetry === request) {
        if (request.receipt === 'unconfirmed') publish({ transcriptRetry: { id, state:'uncertain' } })
        reconcileTranscriptRetry(snapshot.conversation)
      }
    }
  }
  const read=async(sessionId,request,signal)=>{
    const action=actionTransport??client?.action
    if(!action)throw new Error('鱼应界面接口尚未就绪')
    const source = (snapshot.status?.existingVoiceSession && BOUND_SESSION_ACTIONS.has(request.action)
      || snapshot.existingSessionUnconfirmed && request.action === 'status') ? null : sessionId
    const value = await action(source,request,signal)
    try { return decodeReply(request.action, value) }
    catch (error) { observe('ui-render-error', 'finished', 'failed'); throw error }
  }
  let audioRequest=null
  const cancelAudioDevices=({clear=false}={})=>{
    const request=audioRequest;audioRequest=null;request?.abort.abort()
    publish({audioDevicesPending:false,audioDevicesError:null,...(clear?{audioDevices:null,audioDevicesFor:null}:{})})
  }
  const inspectAudioDevices=id=>{
    if(!alive||selected!==id)return Promise.resolve(false)
    if(audioRequest?.id===id&&audioRequest.client===client)return audioRequest.promise
    cancelAudioDevices()
    const request={id,client,scope:readScope,abort:new AbortController(),promise:null}
    audioRequest=request;pendingReads.add(request.abort)
    publish({audioDevicesPending:true,audioDevicesError:null})
    const current=()=>alive&&audioRequest===request&&selected===id&&client===request.client&&readScope===request.scope
    request.promise=(async()=>{
      let onAbort
      try{
        const aborted=new Promise((_,reject)=>{onAbort=()=>reject(new Error('Device read cancelled'));request.abort.signal.addEventListener('abort',onAbort,{once:true})})
        const value=await Promise.race([read(id,{action:'read-audio-devices'},request.abort.signal),aborted])
        if(!current())return false
        publish({audioDevices:value,audioDevicesFor:id});return true
      }catch(error){if(current()&&!request.abort.signal.aborted)publish({audioDevicesError:String(error?.message??error)});return false}
      finally{request.abort.signal.removeEventListener('abort',onAbort);pendingReads.delete(request.abort);if(current()){audioRequest=null;publish({audioDevicesPending:false})}}
    })()
    return request.promise
  }
  let modelComputeRequest=null
  const refreshModelCompute=id=>{
    if(!alive||selected!==id)return Promise.resolve(false)
    if(modelComputeRequest?.id===id&&modelComputeRequest.scope===readScope)return modelComputeRequest.promise
    const request={id,scope:readScope,client,promise:null}
    modelComputeRequest=request
    const current=()=>alive&&modelComputeRequest===request&&selected===id&&readScope===request.scope&&client===request.client
    publish({modelComputePending:true,modelComputeError:null})
    // Host-owned single-flight diagnosis: abandoning a view does not cancel its
    // subprocess or imply it exited. No global busy flag or microphone command.
    request.promise=(async()=>{
      try{
        await read(id,{action:'inspect-model-compute'})
        if(!current())return false
        const installer=await read(id,{action:'model-installer'})
        if(!current())return false
        publish({installer,installerFor:id,installerError:null})
        if(!watchingModels){watchingModels=true;subscribeModels(true)}
        return true
      }catch(error){
        if(!current())return false
        const uncertain=error?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(error?.code??'')+' '+String(error?.message??''))
        publish({modelComputeError:String(error?.message??error),...(uncertain?{installerUncertain:true,installerTerminationUnconfirmed:true}:{})})
        return false
      }finally{if(current()){modelComputeRequest=null;publish({modelComputePending:false})}}
    })()
    return request.promise
  }
  let performanceRequest=null,performanceGeneration=0
  const cancelPerformance=({clear=false}={})=>{
    performanceGeneration++
    const request=performanceRequest;performanceRequest=null;request?.abort.abort()
    publish({performancePending:false,performanceError:null,...(clear?{performance:null,performanceFor:null}:{})})
  }
  const inspectPerformance=id=>{
    if(!alive||selected!==id)return Promise.resolve(false)
    if(performanceRequest?.id===id&&performanceRequest.client===client)return performanceRequest.promise
    cancelPerformance()
    const request={id,client,epoch:performanceGeneration,abort:new AbortController(),promise:null}
    performanceRequest=request;pendingReads.add(request.abort)
    publish({performancePending:true,performanceError:null})
    const current=()=>alive&&performanceRequest===request&&request.epoch===performanceGeneration&&selected===id&&client===request.client
    request.promise=(async()=>{
      let onAbort
      try{
        const aborted=new Promise((_,reject)=>{onAbort=()=>reject(new Error('Probe cancelled'));request.abort.signal.addEventListener('abort',onAbort,{once:true})})
        const value=await Promise.race([read(id,{action:'inspect-performance'},request.abort.signal),aborted])
        if(!current())return false
        publish({performance:value,performanceFor:id});return true
      }catch(error){
        if(current()&&!request.abort.signal.aborted)publish({performanceError:String(error?.message??error)})
        return false
      }finally{
        request.abort.signal.removeEventListener('abort',onAbort);pendingReads.delete(request.abort)
        if(current()){performanceRequest=null;publish({performancePending:false})}
      }
    })()
    return request.promise
  }
  const subscribeConversation=()=>{
    const retry=readRecoveries.get('conversation-stream');if(retry){if(retry.timer!==null)unschedule(retry.timer);retry.timer=null;retry.ready=false}
    const epoch=++generation;stopConversation?.();stopConversation=null
    historyRequest++;publish({...emptyHistory,conversation:null,conversationFor:null,conversationError:null,listenModeReceiptRevision:null})
    conversationSource = undefined
    if(!alive||!client)return
    const id=selected
    conversationSource = conversationScope()
    stopConversation=client.subscribe(conversationSource,(value,meta)=>{if(!alive||epoch!==generation||selected!==id)return;try{const conversation=decodeReply('conversation',value);if(!meta?.initial)clearReadRecovery('conversation-stream');if(snapshot.conversationHistory && (snapshot.conversationHistory.rootSessionId!==conversation.rootSessionId || snapshot.conversationHistory.scope!=='voice-session'&&snapshot.conversationHistory.generation!==conversation.historyGeneration)){historyRequest++;publish({...emptyHistory})}const history=snapshot.conversationHistory
      let historyPatch={}
      if(history?.rootSessionId && history.rootSessionId===conversation.rootSessionId){
        const rows=new Map(history.items.map(row=>[row.id,row]));for(const row of conversation.items)rows.set(row.id,row)
        const ordered=[...rows.values()].sort((a,b)=>a.at-b.at),items=ordered.slice(-4000)
        let chars=items.reduce((sum,row)=>sum+row.text.length,0),clipped=ordered.length>4000
        while(chars>4*1024*1024){chars-=items.shift().text.length;clipped=true}
        historyPatch={conversationHistory:{...history,items,truncated:history.truncated||clipped}}
      }
      publish({...historyPatch,conversation,conversationFor:id,conversationError:null});reconcileTranscriptRetry(conversation)}catch(error){historyRequest++;publish({...emptyHistory,conversation:null,conversationFor:null,conversationError:String(error.message)});recoverRead(id,'conversation-stream')}},error=>{if(alive&&epoch===generation){historyRequest++;publish({...emptyHistory,conversation:null,conversationFor:null,conversationError:String(error?.message??error)});recoverRead(id,'conversation-stream')}})
  }
  const subscribeModels=(preserve=false)=>{
    const retry=readRecoveries.get('model-stream');if(retry){if(retry.timer!==null)unschedule(retry.timer);retry.timer=null;retry.ready=false}
    const epoch=++modelGeneration;stopModels?.();stopModels=null
    if(!preserve)publish({installer:null,installerFor:null,installerError:null})
    if(!alive||!client?.subscribeModels||!watchingModels)return
    const id=selected
    stopModels=client.subscribeModels(id,(value,meta)=>{if(!alive||epoch!==modelGeneration||selected!==id||meta?.initial)return;try{const installer=decodeReply('model-installer',value),previous=snapshot.installer?.ttsInstallIntent;clearReadRecovery('model-stream');publish({installer,installerFor:id,installerError:null});if(installer.ttsInstallIntent&&(previous?.jobId!==installer.ttsInstallIntent.jobId||previous?.status!==installer.ttsInstallIntent.status)){const applied=installer.ttsInstallIntent.status==='applied';publish({checkedFor:null});requestRefresh({settings:applied,force:true})}}catch(error){publish({installer:null,installerFor:null,installerError:String(error.message)});recoverRead(id,'model-stream')}},error=>{if(alive&&epoch===modelGeneration){publish({installer:null,installerFor:null,installerError:String(error?.message??error)});recoverRead(id,'model-stream')}})
  }
  const cancelPreview=()=>{
    if(cancelTask)return cancelTask
    if(!preview)return Promise.resolve(true)
    const current=preview,observation=ttsUncertainty;current.cancelled=true;current.abort.abort()
    publish({ttsCancelling:true,ttsPreview:{status:'cancelling'}})
    cancelTask=(async()=>{
      let confirmed=false
      try{
        const result=await read(current.id,{action:'cancel-tts'})
        if(result.status==='unconfirmed'){pendingRefresh=null;markTtsUncertain({ttsPreview:result,uncertain:true,error:'无法确认朗读停止，请完整重启宿主后再试。'});return false}
        confirmed=true;publish({ttsPreview:result,...(observation===ttsUncertainty?{ttsUncertain:false}:{})});return true
      }catch(error){pendingRefresh=null;markTtsUncertain({ttsPreview:{status:'unconfirmed'},uncertain:true,error:String(error?.message??error)});return false}
      finally{if(confirmed&&preview===current)preview=null;publish({ttsCancelling:false});cancelTask=null;queueMicrotask(()=>{void prepareSetup();void drainRefresh()})}
    })()
    return cancelTask
  }
  const clearReadRecovery=action=>{
    const entry=readRecoveries.get(action)
    if(entry?.timer!=null)unschedule(entry.timer)
    readRecoveries.delete(action)
  }
  const clearReadRecoveries=()=>{for(const action of readRecoveries.keys())clearReadRecovery(action)}
  const recoverRead=(id,action)=>{
    if(!alive||!automaticReads||selected!==id||!['authorization','setup-status','conversation-stream','model-stream','update-stream'].includes(action)&&!RECOVERABLE_READS.has(action))return
    let entry=readRecoveries.get(action)
    if(!entry){entry={id,scope:readScope,attempts:0,timer:null,ready:false};readRecoveries.set(action,entry)}
    if(entry.timer!==null||entry.ready||!browserVisible||!panelVisible)return
    entry.attempts++
    observe('ui-read-recovery', 'requested')
    entry.timer=schedule(()=>{
      entry.timer=null
      if(!alive||selected!==id||entry.scope!==readScope||readRecoveries.get(action)!==entry)return
      entry.ready=true;void drainRefresh()
    },Math.min(30000,750*2**Math.min(entry.attempts-1,6)))
    entry.timer?.unref?.()
  }
  let recoveryTimer=null,recoveryAttempts=0
  const stopRecoveryReads=()=>{if(recoveryTimer!==null)unschedule(recoveryTimer);recoveryTimer=null;recoveryAttempts=0}
  const scheduleRecoveryRead=id=>{
    if(!alive||!browserVisible||!panelVisible||selected!==id||recoveryTimer!==null||recoveryAttempts>=10)return
    recoveryTimer=schedule(()=>{recoveryTimer=null;if(!alive||selected!==id||!['predecessor-cleanup-pending','helper-cleanup-pending'].includes(snapshot.status?.voiceSession?.recovery?.kind))return;if(snapshot.busy||snapshot.ttsCancelling){scheduleRecoveryRead(id);return}recoveryAttempts++;void api.run(id,'status')},1000)
    recoveryTimer?.unref?.()
  }
  let api,authorizationGeneration=0,authorizationRead=null,authorizationWrite=null,pendingAuthorizationRead=null,authorizationDismissed=false
  const readOperationLog = async signal => {
    const source = client, pages = [], seen = new Set()
    if (!alive || !source?.readOperationLog) throw new Error('诊断日志接口未就绪')
    let cursor = null
    do {
      signal?.throwIfAborted()
      const result = await source.readOperationLog(cursor ? { cursor } : {}, signal)
      if (!alive || client !== source || signal?.aborted) throw new Error('诊断日志连接已变化')
      if (typeof result?.text !== 'string' || !(result.nextCursor === null || typeof result.nextCursor === 'string' && result.nextCursor) || seen.has(result.nextCursor))
        throw new Error('诊断日志分页无效')
      pages.push(result.text)
      cursor = result.nextCursor
      seen.add(cursor)
    } while (cursor)
    return pages
  }
  const manageSessions = async (request, signal) => {
    if (!alive || !client?.manageSessions) throw new Error('鱼应会话管理尚未就绪')
    const source = client
    const result = await source.manageSessions(null, request, signal)
    if (!alive || client !== source || signal?.aborted) throw new Error('会话管理连接已变化，请刷新重试')
    return result
  }
  const listExistingVoiceSessions = async (request, signal) => {
    if (!alive || !client?.listExistingVoiceSessions) throw new Error('DSH 会话列表暂不可用')
    const source = client
    const value = await source.listExistingVoiceSessions(request, signal)
    if (!alive || client !== source || signal?.aborted) throw new Error('会话列表连接已变化，请刷新重试')
    return value
  }
  let existingSessionWrite = null
  const setExistingVoiceSession = async request => {
    if (!alive || !client?.setExistingVoiceSession || existingSessionWrite || snapshot.existingSessionUnconfirmed) throw new Error('DSH 会话绑定暂不可用')
    const source = client, abort = new AbortController()
    existingSessionWrite = abort
    pendingReads.add(abort)
    for (const statusRead of [backgroundReads.get('status'), interruptibleRead]) {
      if (statusRead?.action === 'status') { statusRead.stale = true; statusRead.abort.abort() }
    }
    publish({ existingSessionWritePending: true })
    try {
      const value = await source.setExistingVoiceSession(request, abort.signal)
      if (!alive || client !== source || abort.signal.aborted) throw new Error('会话绑定连接已变化，请刷新确认')
      if (snapshot.status) publish({ status: { ...snapshot.status, existingVoiceSession: value.binding } })
      if (conversationSource !== conversationScope()) subscribeConversation()
      return value
    } catch (error) {
      publish({ existingSessionUnconfirmed:true })
      throw error
    } finally {
      pendingReads.delete(abort)
      existingSessionWrite = null
      publish({ existingSessionWritePending: false })
      requestRefresh({ force:true })
    }
  }
  const senseVoiceAsrAction = async (request, signal) => {
    if (!alive || !client?.senseVoiceAsrAction) throw new Error('识别模型管理暂不可用')
    const source = client
    const value = await source.senseVoiceAsrAction(request, signal)
    if (!alive || client !== source || signal?.aborted) throw new Error('识别模型状态已切换')
    const validProgress = progress => progress && ['idle', 'downloading', 'ready', 'error'].includes(progress.state)
      && Number.isSafeInteger(progress.receivedBytes) && Number.isSafeInteger(progress.totalBytes)
      && progress.receivedBytes >= 0 && progress.receivedBytes <= progress.totalBytes
    if (!validProgress(value) || typeof value.selected !== 'boolean'
      || (value.message !== null && (typeof value.message !== 'string' || value.message.length > 512))) {
      throw new Error('识别模型状态无效')
    }
    return value
  }
  const refreshAuthorization=async({open=false,initial=false}={})=>{
    if(!client?.readAuthorization)return false
    if(authorizationWrite){pendingAuthorizationRead={open:open||pendingAuthorizationRead?.open,initial:initial||pendingAuthorizationRead?.initial};if(open)publish({authorizationOpen:true});return false}
    const generation=++authorizationGeneration,request=new AbortController();pendingReads.add(request)
    authorizationRead=request
    publish({authorizationLoading:true,authorizationError:null,...(open?{authorizationOpen:true}:{})})
    try{
      const value=decodeReply('authorization',await client.readAuthorization(request.signal))
      if(!alive||generation!==authorizationGeneration)return false
      clearReadRecovery('authorization')
      publish({authorization:value,authorizationUncertain:value.revocationUnconfirmed,...(initial&&!authorizationDismissed&&(!value.completed||value.usageAgreement?.accepted!==true||value.revocationUnconfirmed)?{authorizationOpen:true}:{})});return true
    }catch(error){if(alive&&generation===authorizationGeneration){publish({authorizationError:String(error?.message??error),authorizationUncertain:true,...(initial?{authorizationOpen:true}:{})});recoverRead(selected,'authorization')}return false}
    finally{pendingReads.delete(request);if(authorizationRead===request){authorizationRead=null;if(alive)publish({authorizationLoading:false})}}
  }
  const saveAuthorization=async grant=>{
    if(!client?.saveAuthorization||!snapshot.authorization||snapshot.authorizationBusy||snapshot.authorizationUncertain)return false
    const request=new AbortController(),generation=++authorizationGeneration,authorizationClient=client;pendingReads.add(request)
    authorizationWrite=request
    publish({authorizationBusy:true,authorizationError:null})
    try{
      const value=decodeReply('authorization',await authorizationClient.saveAuthorization({revision:snapshot.authorization.revision,grant},request.signal))
      if(!alive||generation!==authorizationGeneration||client!==authorizationClient)return false
      authorizationDismissed=false
      publish({authorization:value,authorizationOpen:value.revocationUnconfirmed,authorizationUncertain:value.revocationUnconfirmed,...(value.revocationUnconfirmed?{authorizationError:'权限已撤回，但当前音频停止尚未确认，请核查状态。'}:{})});if(grant&&!value.revocationUnconfirmed)api.openSetup();requestRefresh({settings:true,force:true});return true
    }catch(error){
      // Read back an uncertain write; never submit the authorization twice.
      try{
        const value=decodeReply('authorization',await authorizationClient.readAuthorization(request.signal))
        if(alive&&client===authorizationClient&&generation===authorizationGeneration&&value.completed&&value.granted===grant&&!value.revocationUnconfirmed){authorizationDismissed=false;publish({authorization:value,authorizationOpen:false,authorizationUncertain:false});if(grant)api.openSetup();return true}
      }catch{}
      if(alive&&client===authorizationClient&&generation===authorizationGeneration){publish({authorizationUncertain:true,authorizationError:String(error?.message??error)});recoverRead(selected,'authorization')}
      return false
    }finally{pendingReads.delete(request);if(authorizationWrite===request){authorizationWrite=null;if(alive)publish({authorizationBusy:false});if(alive&&(pendingAuthorizationRead||client!==authorizationClient)){const next=pendingAuthorizationRead??{initial:true};pendingAuthorizationRead=null;void refreshAuthorization(next)}}}
  }
  let setupRead=null,setupNavigation=0
  const readSetupStatus=()=>{
    if(!client?.readSetup||setupRead)return setupRead?.promise
    const source=client,intent=setupNavigation,request=new AbortController(),task={promise:null}
    setupRead=task;pendingReads.add(request)
    task.promise=(async()=>{
      try{
        const setup=decodeReply('setup-status',await source.readSetup(request.signal))
        if(!alive||client!==source)return false
        clearReadRecovery('setup-status')
        publish({setupStatus:setup,...(navigation===intent&&!authorizationDismissed?{setupOpen:!setup.completed}:{}),setupError:null})
        if(setup.completed)requestRefresh({settings:true})
        else void prepareSetup()
        return true
      }catch(error){if(alive&&client===source){publish({setupError:String(error?.message??error)});recoverRead(selected,'setup-status')}return false}
      finally{pendingReads.delete(request);if(setupRead===task)setupRead=null}
    })()
    return task.promise
  }
  // Lifecycle reads plus bounded read-only recovery while a known predecessor is closing. Never replay a write.
  const drainRefresh=async()=>{
    if(!(actionTransport||client?.action||client?.readAuthorization||client?.readSetup||client?.subscribeUpdates)||!alive||!automaticReads||!browserVisible||!panelVisible||refreshing||existingSessionWrite||snapshot.busy||snapshot.ttsCancelling||!pendingRefresh&&![...readRecoveries.values()].some(entry=>entry.ready))return
    if(!pendingRefresh){
      const [action,entry]=[...readRecoveries].find(([,entry])=>entry.ready)
      entry.ready=false
      if(entry.id!==selected||entry.scope!==readScope){clearReadRecovery(action);return}
      refreshing=true
      try{if(action==='authorization')await refreshAuthorization();else if(action==='setup-status')await readSetupStatus();else if(action==='conversation-stream')subscribeConversation();else if(action==='model-stream')subscribeModels(true);else if(action==='update-stream')refreshUpdates();else await api.run(entry.id,action)}finally{refreshing=false;queueMicrotask(()=>void drainRefresh())}
      return
    }
    const request=pendingRefresh;pendingRefresh=null
    const current=()=>alive&&request.id===selected&&request.scope===readScope
    if(!current())return
    // Page preparation may take the read lane after either publication. Preserve
    // only unstarted phases, without notifying the page again on continuation.
    const pause=()=>{
      if(!current())return true
      if(!browserVisible||!panelVisible||existingSessionWrite||snapshot.busy||snapshot.ttsCancelling){
        if(!pendingRefresh)pendingRefresh=request // A newer lifecycle request wins.
        return true
      }
      return false
    }
    refreshing=true
    try{
      if(!request.notified){request.notified=true;lastRefreshId=request.id;lastRefreshAt=Date.now();publish({readRefresh:(snapshot.readRefresh??0)+1})}
      if(pause())return
      if(request.settings){request.settings=false;await api.run(request.id,'read-settings',{},true)}
      if(pause())return
      if(request.status){request.status=false;await api.run(request.id,'status',{},true)}
      // One bounded check when a concrete source session becomes available.
      // Focus/status refreshes do not schedule another model request loop.
      if(current()&&request.id&&!probePrepared.has(request.id)){probePrepared.add(request.id);void api.run(request.id,'inspect-performance')}
    }finally{refreshing=false;queueMicrotask(()=>void drainRefresh())}
  }
  const requestRefresh=({settings=false,force=false}={})=>{
    refreshUpdates()
    if(!alive||!automaticReads)return
    if(!force&&!settings&&lastRefreshId===selected&&Date.now()-lastRefreshAt<1500)return
    if(snapshot.authorizationUncertain&&!authorizationRead&&!authorizationWrite)void refreshAuthorization()
    if(snapshot.setupError&&!setupRead)void readSetupStatus()
    if(!selected&&!snapshot.setupOpen&&snapshot.setupStatus===null)return
    if(snapshot.installerError&&watchingModels)subscribeModels(true)
    // A later lifecycle event is a new recovery opportunity after the bounded burst.
    for(const entry of readRecoveries.values())if(entry.id===selected){if(entry.timer!==null)unschedule(entry.timer);entry.timer=null;entry.attempts=0;entry.ready=true}
    if(recoveryTimer===null)recoveryAttempts=0
    if (!pendingRefresh || pendingRefresh.scope !== readScope) observe('ui-status-refresh', 'requested')
    pendingRefresh={id:selected,scope:readScope,settings:true,status:true,notified:false}
    queueMicrotask(()=>void drainRefresh())
  }
  const syncReadVisibility=()=>{
    const visible=browserVisible&&panelVisible
    if(snapshot.readVisible===visible)return
    publish({readVisible:visible})
    if(!visible){discardBackgroundReads();for(const entry of readRecoveries.values()){if(entry.timer!==null)unschedule(entry.timer);entry.timer=null;entry.ready=false}stopRecoveryReads();return}
    requestRefresh({force:true})
  }
  const prepareSetup=async()=>{
    const id=selected
    if(!(actionTransport||client?.action)||snapshot.setupStatus?.completed!==false||setupPrepared.has(id)||snapshot.busy||snapshot.ttsCancelling)return
    setupPrepared.add(id)
    if(await api.run(id,'read-settings') && selected===id)await api.run(id,'status')
  }
  api={
    getSnapshot:()=>snapshot,
    async pickPath(id, kind, signal) {
      if (!alive || selected !== id) return null
      const epoch = readScope, transport = actionTransport ?? client?.action
      if (!transport) throw new Error('鱼应界面接口尚未就绪')
      const value = await transport(id, {action:'pick-local-path',kind}, signal)
      if (!alive || selected !== id || epoch !== readScope || signal?.aborted) return null
      if (!value || !(value.path === null || typeof value.path === 'string' && value.path.length > 0 && value.path.length <= 4096 && !/[\u0000-\u001f\u007f]/.test(value.path))) throw new Error('路径选择结果无效')
      return value.path
    },
    async captureBindings(id, request) {
      const result = await read(id, {action:'capture-bindings', ...request})
      if (!result || typeof result.token !== 'string' || typeof result.paused !== 'boolean') throw new Error('按键录入回执无效')
      return result
    },
    setReadVisibility(value){browserVisible=Boolean(value);syncReadVisibility()},
    setPanelVisible(value){panelVisible=Boolean(value);syncReadVisibility()},
    markSettingsEdited(action='save-settings'){if(WRITES.includes(action)){settingsEdited.add(action);publish({settingsDraftActions:[...settingsEdited]})}},
    discardSettingsDraft(action){if(action)settingsEdited.delete(action);else settingsEdited.clear();publish({settingsDraftActions:[...settingsEdited]});if(settingsEdited.size)return;if(pendingSettings)publish({settings:pendingSettings,settingsFor:selected});pendingSettings=null;publish({settingsConflict:false,settingsKey:snapshot.settings?.revision})},
    enableAutomaticReads(){automaticReads=true;requestRefresh({settings:true,force:true})},
    refresh:requestRefresh,
    refreshModelCompute,
    subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},
    setSession(id) {
      if (selected === id) return
      selected = id
      readScope++
      modelComputeRequest = null
      settingsEdited.clear()
      pendingSettings = null
      publish({
        sourcePending: true, checkedFor: undefined, settingsFor: undefined,
        modelComputePending: false, modelComputeError: null, enableError: null, listenModeError: false,
        newChatFor: undefined, settingsConflict: false, settingsDraftActions: [],
        installPlan: null, installPlanFor: null,
      })
      clearReadRecoveries()
      cancelPerformance({ clear: true })
      cancelAudioDevices({ clear: true })
      stopRecoveryReads()
      void cancelPreview()
      discardDiagnostics()
      subscribeConversation()
      subscribeModels()
      requestRefresh({ settings: true, force: true })
      void prepareSetup()
    },
    attachConversationClient(value){if(client!==value){resetUpdates();readScope++;modelComputeRequest=null;publish({modelComputePending:false,modelComputeError:null});clearReadRecoveries();cancelPerformance({clear:true});cancelAudioDevices({clear:true});discardDiagnostics();probePrepared.clear()}client=value;void refreshAuthorization({initial:true});subscribeConversation();subscribeModels();requestRefresh({settings:true,force:true});if(client.readSetup){setupRead=null;setupNavigation=navigation;void readSetupStatus()}},
    conversationUnavailable(error){historyRequest++;publish({...emptyHistory,error:String(error?.message??error),conversation:null,conversationFor:null,conversationError:String(error?.message??error)})},
    async dismissSetup(){const intent=++navigation;const stopped=await cancelPreview();if(stopped&&intent===navigation){discardDiagnostics();api.discardSettingsDraft();publish({setupOpen:false})}return stopped&&intent===navigation},
    async showHome(){const intent=++navigation;const stopped=await cancelPreview();if(stopped&&intent===navigation){discardDiagnostics();api.discardSettingsDraft();publish({setupOpen:false,panelView:'home'});requestRefresh()}return stopped&&intent===navigation},
    async openSettings(tab='audio',modelTab='conversation'){const intent=++navigation;const stopped=await cancelPreview();if(stopped&&intent===navigation){discardDiagnostics();publish({setupOpen:false,panelView:'settings',settingsTab:['audio','interaction','prompt','models','advanced','sessions','pets'].includes(tab)?tab:'audio',settingsModelTab:modelTab,sessionManagementRoot:null,sessionHistoryOpen:false});requestRefresh({settings:true})}return stopped&&intent===navigation},
    readOperationLog,
    manageSessions,
    listExistingVoiceSessions,
    retryVoiceTranscript,
    setExistingVoiceSession,
    setSettingsTab(tab) {
      if (tab !== snapshot.settingsTab) publish({ settingsTab: tab, sessionManagementRoot: null, sessionHistoryOpen: false })
    },
    setSettingsModelTab(settingsModelTab) { publish({ settingsModelTab }) },
    setSessionManagement({ rootId = snapshot.sessionManagementRoot, historyOpen }) {
      publish({ sessionManagementRoot: rootId, sessionHistoryOpen: historyOpen })
    },
    senseVoiceAsrAction,
    updateAction,
    dismissUpdate(version) { if (version) publish({ dismissedUpdateVersion:version }) },
    openSetup(){++navigation;discardDiagnostics();publish({setupOpen:true});requestRefresh({settings:true,force:true});if(!automaticReads&&!snapshot.busy)void (async()=>{const id=selected;if(await api.run(id,'read-settings')&&selected===id)await api.run(id,'status')})()},
    cancelPreview,discardDiagnostics,
    refreshAuthorization,saveAuthorization,openAuthorization:()=>refreshAuthorization({open:true}),
    closeAuthorization({resumeSetup=false}={}){if(!snapshot.authorizationBusy&&!snapshot.authorizationLoading){authorizationDismissed=!resumeSetup;++navigation;setupNavigation=navigation;publish({authorizationOpen:false,setupOpen:resumeSetup});if(resumeSetup)requestRefresh({settings:true});return true}return false},
    async run(id,action,details={},automaticRead=false){
      if(!alive || existingSessionWrite && action==='status'
        || (existingSessionWrite || snapshot.existingSessionUnconfirmed) && ['enable','new','resume'].includes(action))return false
      // Revalidation uses the last complete snapshot while an exact, current
      // source is known. An explicit interaction can supersede these reads.
      const background=Boolean(automaticRead&&RECOVERABLE_READS.has(action)&&!snapshot.uncertain&&snapshot.checkedFor===id&&snapshot.settingsFor===id&&snapshot.status&&snapshot.settings)
      if(background&&backgroundReads.has(action))return false
      if(!automaticRead)discardBackgroundReads()
      if(action==='read-history') {
        if(selected!==id || snapshot.conversationHistoryLoading)return false
        const token=++historyRequest, scope=readScope, liveGeneration=generation
        publish({conversationHistoryLoading:true,conversationHistoryError:null,conversationHistoryRequestCursor:details.cursor??null})
        try {
          const value=await read(id,{action,...details})
          if(!alive||selected!==id||scope!==readScope||token!==historyRequest||liveGeneration!==generation)return false
          if(snapshot.conversation?.rootSessionId && (snapshot.conversation.rootSessionId!==value.rootSessionId || value.scope!=='voice-session'&&snapshot.conversation.historyGeneration!==value.generation))return false
          const previous=snapshot.conversationHistory
          if(details.cursor && (!previous||previous.generation!==value.generation||previous.rootSessionId!==value.rootSessionId))return false
          const rows=new Map(value.items.map(row=>[row.id,row]))
          if(details.cursor)for(const row of previous.items)rows.set(row.id,row)
          // Live rows override stale page states. Pagination never replaces newer text.
          if(snapshot.conversation?.rootSessionId===value.rootSessionId)for(const row of snapshot.conversation?.items??[])rows.set(row.id,row)
          const ordered=[...rows.values()].sort((a,b)=>a.at-b.at)
          const items=details.cursor?ordered.slice(0,4000):ordered.slice(-4000)
          let chars=items.reduce((sum,row)=>sum+row.text.length,0), clipped=ordered.length>4000
          while(chars>4*1024*1024){chars-=(details.cursor?items.pop():items.shift()).text.length;clipped=true}
          publish({conversationHistory:{...value,items,truncated:value.truncated||clipped||Boolean(details.cursor&&previous?.truncated)},conversationHistoryFor:id})
          return true
        } catch(error) {if(token===historyRequest)publish({conversationHistoryError:String(error?.message??error)});return false}
        finally {if(token===historyRequest)publish({conversationHistoryLoading:false})}
      }
      if(action==='apply-model-install'&&['save-models','save-tts'].some(value=>settingsEdited.has(value))){publish({error:'请先保存或放弃模型设置草稿，再切换模型。'});return false}
      if(action==='read-audio-devices')return inspectAudioDevices(id)
      if(action==='inspect-performance')return inspectPerformance(id)
      if(action==='cancel-tts'){
        if(preview)return cancelPreview()
        try{const value=await read(id,{action});publish({ttsPreview:value,ttsPreviewFor:id});if(value.status==='unconfirmed'){markTtsUncertain({uncertain:true,error:'无法确认朗读停止，请完整重启宿主。'});return false}return true}catch(error){markTtsUncertain({error:String(error?.message??error),uncertain:true});return false}
      }
      // Only microphone shutdown may overlap these read-only diagnostics. Its
      // own un-aborted host receipt, not the read response, confirms audio stop.
      const interruptsRead=action==='disable'&&interruptibleRead&&!diagnosticStop
      if(snapshot.busy&&!interruptsRead||snapshot.ttsCancelling)return false
      if(snapshot.settingsConflict&&WRITES.includes(action))return false
      if(snapshot.agentPermissionUncertain&&action==='save-agent-permissions')return false
      if(snapshot.agentRequestUncertain&&action==='decide-agent-request')return false
      if(snapshot.ttsUncertain&&!SAFE_READS.includes(action)&&action!=='disable')return false
      if(snapshot.visibilityUncertain&&!SAFE_READS.includes(action))return false
      if(snapshot.outputVolumeUncertain&&action==='set-output-volume')return false
      if(snapshot.installerUncertain&&['start-model-install','control-model-install','apply-model-install'].includes(action))return false
      if(!id&&(id!==null||!ownerSettingsActions.has(action))){publish({error:'此操作需要会话来源'});return false}
      let stopToken
      if(interruptsRead){interruptibleRead.stale=true;if(RECOVERABLE_READS.has(interruptibleRead.action))interruptibleRead.abort.abort();stopToken=diagnosticStop=Symbol('diagnostic-stop')}
      if(!SAFE_READS.includes(action)){stopRecoveryReads();for(const value of RECOVERABLE_READS)clearReadRecovery(value)}
      if(WRITES.includes(action)||STATUS.includes(action)&&action!=='status')cancelPerformance({clear:action!=='set-performance-mode'})
      let currentRead
      if(INTERRUPTIBLE_READS.includes(action)||RECOVERABLE_READS.has(action)){
        currentRead={id,action,abort:new AbortController(),stale:false}
        if(background)backgroundReads.set(action,currentRead)
        else interruptibleRead=currentRead
      }
      if(!background){
        pendingActions++
        publish({busy:true,error:null,...(action==='enable'?{enableError:null}:{}),...(action==='save-bindings'?{bindingError:null}:{}),interruptibleRead:interruptibleRead?.action??null,diagnosticStopPending:!!diagnosticStop,
          ...(action==='listen-mode'?{listenModePending:details.mode,listenModeBefore:snapshot.conversation?.helper?.listenMode??snapshot.status?.listenMode}:{}),
          ...(action!=='status'&&STATUS.includes(action)?{listenModeError:false}:{})})
      }
      let currentPreview
      const actionScope=readScope
      const previousRoot=liveVoiceRootId(snapshot.status), previousSource=snapshot.checkedFor,ttsObservation=ttsUncertainty
      try{
        if(currentRead?.stale)return false
        let value
        if(['read-output-volume','set-output-volume'].includes(action)){
          if(!client)throw new Error('语音输出接口尚未就绪')
          const request=currentRead?.abort??new AbortController();pendingReads.add(request)
          let onAbort
          try{
            const work=action==='read-output-volume'?client.readVolume(id,request.signal):client.setVolume(id,details,request.signal)
            const result=action==='read-output-volume'?await Promise.race([work,new Promise((_,reject)=>{onAbort=()=>reject(new Error('Read cancelled'));request.signal.addEventListener('abort',onAbort,{once:true})})]):await work
            value=decodeReply('output-volume',result)
          }finally{request.signal.removeEventListener('abort',onAbort);pendingReads.delete(request)}
        }else{
          if(action==='preview-tts'){currentPreview={id,abort:new AbortController(),cancelled:false};preview=currentPreview;publish({ttsPreview:{status:'preparing'},ttsPreviewFor:id})}
          if(RECOVERABLE_READS.has(action)){
            let onAbort
            const aborted=new Promise((_,reject)=>{onAbort=()=>reject(new Error('Read cancelled'));currentRead.abort.signal.addEventListener('abort',onAbort,{once:true})})
            try{value=await Promise.race([read(id,{...details,action},currentRead.abort.signal),aborted])}
            finally{currentRead.abort.signal.removeEventListener('abort',onAbort)}
          }else value=await read(id,{...details,action},currentPreview?.abort.signal??currentRead?.abort.signal)
          if(currentRead?.stale)return false
        }
        if(currentRead?.stale||SAFE_READS.includes(action)&&(!alive||actionScope!==readScope))return false
        if(RECOVERABLE_READS.has(action))clearReadRecovery(action)
        if(['agent-permissions','save-agent-permissions'].includes(action))publish({agentPermissions:value,agentPermissionsFor:id,agentPermissionUncertain:false})
        if(['agent-requests','decide-agent-request'].includes(action)){
          publish({agentRequests:value,agentRequestsFor:id,agentRequestUncertain:false})
          if(action==='decide-agent-request'&&value.lastOutcome?.state==='completed'){publish({checkedFor:null});requestRefresh({settings:true,force:true})}
          if(action==='decide-agent-request'&&value.lastOutcome?.state==='unknown')publish({uncertain:true,error:'操作结果尚未确认，请先读取实际状态，不要重试。'})
        }
        if(STATUS.includes(action)){
          if(action==='listen-mode'){
            if(selected!==id||actionScope!==readScope)return false
            if(value.listenMode!==details.mode)throw new Error('说话方式的回执尚未确认')
          }
          // Deliver the confirmed write receipt to its caller while keeping
          // the current source's panel state.
          if(actionScope!==readScope)return true
          if(['status','disable'].includes(action)&&value.ttsRuntime){
            // Normal playback is busy, not an unknown result. Existing uncertainty
            // clears only after a confirmed idle/unblocked readback, including stop.
            const unresolved=Boolean(value.ttsRuntime.blocked||snapshot.ttsUncertain&&(value.ttsRuntime.busy||ttsObservation!==ttsUncertainty))
            if(value.ttsRuntime.blocked)ttsUncertainty++
            publish({ttsUncertain:unresolved})
            if(!unresolved&&!value.ttsRuntime.busy&&!cancelTask&&preview?.cancelled)preview=null
          }
          const uncertain=snapshot.visibilityUncertain&&!(action==='status'&&snapshot.visibilityReadbackFor===id)
          // Listen-mode returns the audio bridge status. The owner adapter adds
          // binding metadata to explicit status reads and start/stop receipts.
          const hasBinding = Object.hasOwn(value, 'existingVoiceSession')
          if (!hasBinding && Object.hasOwn(snapshot.status ?? {}, 'existingVoiceSession')) {
            value = { ...value, existingVoiceSession:snapshot.status.existingVoiceSession,
              existingVoiceSessionSupported:snapshot.status.existingVoiceSessionSupported }
          }
          publish({status:value,checkedFor:id,uncertain,visibilityUncertain:uncertain,...(uncertain?{}:{visibilityReadbackFor:null}),...(background?{error:null}:{}),
            ...(selected===id?{sourcePending:false}:{}),
            ...(action==='status'&&hasBinding?{existingSessionUnconfirmed:false}:{}),
            ...(action==='listen-mode'?{listenModeReceiptRevision:snapshot.conversation?.revision??null}:{})})
          if (transcriptRetry && (!value.enabled || value.existingVoiceSession?.sessionId !== transcriptRetry.sessionId)) finishTranscriptRetry()
          if(['predecessor-cleanup-pending','helper-cleanup-pending'].includes(value.voiceSession?.recovery?.kind))scheduleRecoveryRead(id);else stopRecoveryReads()
        }
        if(SETTINGS.includes(action)){
          if(action!=='read-settings'&&actionScope===readScope){settingsEdited.delete(action);publish({settingsDraftActions:[...settingsEdited]})}
          const conflict=action==='read-settings'&&settingsEdited.size>0&&snapshot.settingsFor===id&&snapshot.settings?.revision!==value.revision
          if(conflict){pendingSettings=value;publish({settingsConflict:true})}
          else{pendingSettings=null;publish({settings:value,settingsFor:id,settingsConflict:false,settingsKey:settingsEdited.size>0?snapshot.settingsKey:value.revision})}
          if(value.onboarding)clearReadRecovery('setup-status')
          publish({...(value.onboarding?{setupStatus:value.onboarding,setupError:null}:{}),...(action==='read-settings'&&snapshot.visibilityUncertain&&['hidden','workspace'].includes(value.voiceSession?.visibility)?{visibilityReadbackFor:id}:{})})
        }
        if(action==='read-settings'&&snapshot.visibilityUncertain)recoverRead(id,'status')
        if(action==='conversation-models')publish({conversationModels:value,conversationModelsFor:id,conversationModelsError:null})
        if(action==='inspect-tts')publish({ttsCapabilities:value,ttsCapabilitiesFor:id})
        if(action==='preview-tts'&&!currentPreview.cancelled)publish({ttsPreview:{...value,status:value.textOnly===true?'text-only':'completed'},ttsPreviewFor:id})
        if(['read-output-volume','set-output-volume'].includes(action))publish({outputVolume:value,outputVolumeFor:id,outputVolumeUncertain:false})
        if(['save-voice-prompt','save-conversation-model','set-visibility','set-performance-mode','save-tts','apply-model-install'].includes(action)){publish({status:null,checkedFor:null,catalog:null,catalogFor:null});requestRefresh({force:true})}
        if(action==='plan-model-install')publish({installPlan:value,installPlanFor:id,installPlanRequest:{...details}})
        if(action==='model-installer'){
          publish({installer:value,installerFor:id,installerUncertain:Boolean(snapshot.installerTerminationUnconfirmed)})
          if(selected===id&&!watchingModels){watchingModels=true;subscribeModels(true)}
        }
        if(action==='inspect-model-compute'){
          if(snapshot.installerFor===id&&snapshot.installer)publish({installer:{...snapshot.installer,compute:value}})
        }
        if(action==='start-model-install')publish({installPlan:null,installPlanFor:null})
        if(action==='list'){
          const previous=details.cursor&&snapshot.catalogFor===id?snapshot.catalog?.items??[]:[]
          publish({catalog:{...value,items:[...new Map([...previous,...value.items].map(row=>[row.id,row])).values()]},catalogFor:id})
        }
        if(['new','resume','listen-mode'].includes(action))publish({catalog:null})
        if(['new','resume'].includes(action)&&selected===id&&actionScope===readScope){
          historyRequest++
          publish({...emptyHistory,newChatFor:action==='new'&&details.expectedOwnerSessionId!==undefined?id:undefined})
        }
        if(action==='listen-mode'){requestRefresh({settings:true,force:true})}
        if(['status','enable','disable','new','resume'].includes(action)&&selected===id){
          if(action!=='status'||previousSource!==id||previousRoot!==liveVoiceRootId(value)||conversationSource!==conversationScope()||snapshot.conversationError)subscribeConversation()
        }
        return true
      }catch(error){
        if(action==='listen-mode'&&(selected!==id||actionScope!==readScope))return false
        // A stale diagnosis cannot repaint a newer stop, but confirmed unknown
        // process exit remains a safety fact even after leaving its page.
        if(currentRead&&(error?.uncertain||/TTS_TERMINATION_UNCONFIRMED/.test(String(error?.code??'')+' '+String(error?.message??'')))){
          if(action==='inspect-tts')markTtsUncertain({})
          else publish({installerUncertain:true,installerTerminationUnconfirmed:true})
        }
        if(currentRead?.stale||SAFE_READS.includes(action)&&actionScope!==readScope)return false
        if(currentPreview?.cancelled)return false
        if(action==='status'){stopRecoveryReads();if(selected===id&&actionScope===readScope)publish({sourcePending:false})}
        // A pre-existing focus event must not erase a failed mutation or its uncertainty.
        if(!SAFE_READS.includes(action))pendingRefresh=null
        if(/AUTHORIZATION_REQUIRED/.test(String(error?.message??error)))void refreshAuthorization({open:true})
        if(currentPreview)await cancelPreview()
        if(action==='preview-tts')ttsUncertainty++
        if(action==='enable'&&selected===id&&actionScope===readScope)publish({enableError:String(error?.message??error)+(error?.code?' ['+error.code+']':'')})
        if(action==='listen-mode'&&selected===id&&actionScope===readScope)publish({listenModeError:true})
        publish({error:String(error?.message??error),...(action==='conversation-models'?{conversationModelsError:String(error?.message??error),conversationModels:null,conversationModelsFor:id}:{}),...(action==='save-bindings'?{bindingError:String(error?.message??error)+(error?.code?' ['+error.code+']':'')}:{}),...(action==='save-agent-permissions'?{agentPermissionUncertain:true}:{}),...(action==='decide-agent-request'?{agentRequestUncertain:true}:{}),...(action==='preview-tts'?{ttsPreviewFor:id,ttsUncertain:true}:{}),...(action==='set-output-volume'?{outputVolumeUncertain:true}:{}),...(WRITES.includes(action)?{uncertain:true,visibilityUncertain:true,visibilityReadbackFor:null}:{}),...(['start-model-install','control-model-install'].includes(action)?{installerUncertain:true}:{}),...(STATUS.includes(action)?{uncertain:true,readOnlyFailure:action==='status'&&(!snapshot.uncertain||snapshot.readOnlyFailure===true)}:{})})
        // Recover facts, never the action that may already have executed.
        if(RECOVERABLE_READS.has(action))recoverRead(id,action)
        if(WRITES.includes(action)){recoverRead(id,'read-settings');recoverRead(id,'status')}
        else if(STATUS.includes(action)&&action!=='status')recoverRead(id,'status')
        else if(action==='set-output-volume')recoverRead(id,'read-output-volume')
        else if(action==='save-agent-permissions')recoverRead(id,'agent-permissions')
        else if(action==='decide-agent-request')recoverRead(id,'agent-requests')
        else if(['start-model-install','control-model-install'].includes(action))recoverRead(id,'model-installer')
        return false
      }finally{
        if(backgroundReads.get(action)===currentRead)backgroundReads.delete(action)
        if(currentPreview&&preview===currentPreview&&!currentPreview.cancelled)preview=null
        if(currentRead&&interruptibleRead===currentRead)interruptibleRead=null
        if(stopToken&&diagnosticStop===stopToken)diagnosticStop=null
        if(!background){
          pendingActions--
          publish({busy:pendingActions>0,interruptibleRead:interruptibleRead?.action??null,diagnosticStopPending:!!diagnosticStop,...(action==='listen-mode'?{listenModePending:null}:{})})
        }
        queueMicrotask(()=>{void prepareSetup();void drainRefresh()})
      }
    },
    dispose(){if(!alive)return;readScope++;clearReadRecoveries();settingsEdited.clear();pendingSettings=null;publish({settingsConflict:false,settingsDraftActions:[]});cancelPerformance({clear:true});cancelAudioDevices({clear:true});stopRecoveryReads();void cancelPreview();discardDiagnostics();interruptibleRead?.abort.abort();resetUpdates();alive=false;generation++;modelGeneration++;stopConversation?.();stopModels?.();for(const request of pendingReads)request.abort();pendingReads.clear();listeners.clear()},
  }
  return api
}
