import { VoicePreflightError } from './voice-operation-outcome.mjs'
/** Configuration executes directly; operational consent and explicit revocations remain enforced.
 * New human edits invalidate concurrent plans. Plans are in-memory,
 * one-shot and never replayed after restart; no agent-supplied approval is trusted.
 */
import { randomUUID, createHash } from 'node:crypto'
import { actionRequestCodec } from './ui/conversation-contract.mjs'
import { AUTHORIZATION_SCOPES, ORDINARY_OPERATIONS, USAGE_AGREEMENT_VERSION, USAGE_AGREEMENT_TEXT, TTS_CLOUD_CONSENT, CUSTOM_TTS_SCOPE, createMemoryAgentPermissions } from './voice-agent-policy.mjs'
import { VoiceRootOwnershipError } from './voice-session.mjs'
import { dispatchUiAction } from './ui/host.mjs'

const READS = ['conversation-models','read-audio-devices','status','read-settings','list','inspect-performance','inspect-tts','model-installer','inspect-model-compute','plan-model-install','conversation','read-output-volume','setup-status']
const WRITES = ['save-voice-prompt','save-conversation-model','save-audio-device','enable','disable','listen-mode','new','resume','save-settings','save-models','set-performance-mode','set-visibility','save-tts','complete-setup','preview-tts','cancel-tts','set-output-volume','start-model-install','control-model-install','apply-model-install']
const separateTtsScopes = new Set([TTS_CLOUD_CONSENT.deepseek.scope, CUSTOM_TTS_SCOPE])
const CONFIGURATION_OPERATIONS = ['save-voice-prompt','save-conversation-model','save-audio-device','save-settings','save-models','save-tts','set-performance-mode','set-visibility','set-output-volume','complete-setup','apply-model-install']
const HUMAN_METHODS = ['updateVoicePrompt','updateConversationModel','captureBindings','updateBindings','updateAudioDevice','change','changeForCaller','setListenMode','newVoiceSession','resumeVoiceSession','updateSettings','updateModelSettings','setPerformanceMode','setVisibility','updateTtsSettings','completeSetup','previewTts','cancelTts','setOutputVolume','startModelInstall','controlModelInstall','applyModelInstall']
const PARAMETERS = Object.freeze({
  'save-voice-prompt':['revision','values: {text: string, maximum 32768 characters; appended after AGENTS; empty clears additional preferences}'],
  'save-conversation-model':['revision','values: {mode: auto | manual, provider, model}'],
  'save-audio-device':['revision (read-settings)','direction: input | output','selection: null | {backend,id,name} from read-audio-devices'],
  'plan-model-install':['modelId','compute: cpu | cuda','sourceDirectory? (local Qwen weights)','modelVariant?: q4_k_m | q8_0'], enable:['expectedOwnerSessionId?'], disable:[], 'listen-mode':['mode: ptt | always | wake'], new:[], resume:['id'], list:['cursor?'],
  'save-settings':['revision (read-settings)','values (complete audio settings)'], 'save-models':['revision','values (complete modelSetup)'],
  'set-performance-mode':['revision','performanceMode: fast | balanced | high | compatibility'], 'set-visibility':['revision','visibility: hidden | workspace'],
  'save-tts':['revision','values (complete ttsSetup, omit customTts, deepseekTextTransmissionAccepted and legacy referenceAudioAccepted)'], 'complete-setup':['revision'], 'preview-tts':[], 'cancel-tts':[],
  'set-output-volume':['revision (read-output-volume)','volume: 0..1'], 'start-model-install':['modelId','compute: cpu | cuda','sourceDirectory? (local Qwen weights)','modelVariant?: q4_k_m | q8_0'], 'control-model-install':['id','operation: pause | resume | cancel'], 'apply-model-install':['id','revision'],
})
const LABELS = {'save-voice-prompt':'修改语音提示词','save-conversation-model':'修改对话供应商和模型','save-audio-device':'切换音频设备',enable:'开启麦克风',disable:'关闭麦克风','listen-mode':'切换说话方式',new:'新建语音对话',resume:'接续语音对话','save-settings':'修改音频设置','save-models':'修改本地模型','set-performance-mode':'修改回答速度','set-visibility':'修改对话显示范围','save-tts':'修改朗读服务','complete-setup':'完成首次配置','preview-tts':'试听固定示例','cancel-tts':'停止试听','set-output-volume':'修改助手音量','start-model-install':'下载模型','control-model-install':'控制模型下载','apply-model-install':'应用已安装模型'}
const ACKS = {
  microphone:'我允许此请求的会话开启麦克风。',
  always:'我允许麦克风持续聆听，直到切回按住说话或关麦。',
  transfer:'我同意接管当前麦克风；这会中断原窗口的语音。',
  conversation:'我同意切换语音对话；这可能结束原语音后台工作。',
  settings:'我同意按下面的完整计划更改已有设置，其余人工设置不变。',
  headphones:'我确认当前正在佩戴耳机。',
  download:'我已查看下方来源、许可、大小和保存位置，并同意下载此模型。',
}
const clone = value => JSON.parse(JSON.stringify(value))
const object = value => value && typeof value==='object' && !Array.isArray(value)
const fail = (code,message) => { throw Object.assign(new Error(message),{code}) }
const exact = (value,keys) => { if(!object(value)||Object.keys(value).some(key=>!keys.includes(key)))fail('INVALID_REQUEST','请求包含不支持的字段') }
const fingerprint = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')

export function createVoiceAgentControl({ api, humanApiOverrides={}, assertCaller, runtimeToken=()=>null, now=Date.now, ttlMs=600000, permissions=createMemoryAgentPermissions(), authorizationSources=()=>[], onAuthorizationRevoked=async()=>{} }) {
  const plans=new Map(), installAuthorizations=new WeakMap(), incarnation=randomUUID()
  let humanRevision=0, disposed=false, revocationCleanup=null
  const check=(agent,signal)=>{if(disposed)fail('DISPOSED','插件已卸载');assertCaller(agent);signal?.throwIfAborted()}
  const settingValue=(operation,snapshot)=>operation==='set-performance-mode'?snapshot.voiceSession?.performanceMode:operation==='set-visibility'?snapshot.voiceSession?.visibility:snapshot.volume
  const currentValue=(operation,agent)=>operation==='set-output-volume'?api.readOutputVolume(agent).volume:settingValue(operation,api.readSettings(agent))
  const valueHash=value=>fingerprint(value??null)
  const ensurePermissions=agent=>{
    const policy=permissions.read()
    if(policy.initialized)return policy
    return permissions.write(policy,policy.revision)
  }
  const runtimeSources=runtime=>[...new Set([runtime.source,...(runtime.sources??[])])].sort()
  const sourceView=source=>({modelId:source.modelId??source.id,source:source.source,licenseUrls:[...(source.licenseUrls??[])],licenseNote:source.licenseNote??'',...(source.runtime?{runtime:{source:source.runtime.source,...(runtimeSources(source.runtime).length>1?{sources:runtimeSources(source.runtime)}:{}),licenseUrls:[...(source.runtime.licenseUrls??[])],redirectHost:source.runtime.redirectHost??null}}:{})})
  const currentSources=()=>authorizationSources().filter(row=>row.available!==false&&typeof row.source==='string').map(sourceView).slice(0,32)
  const authorizationSnapshot=()=>{
    const policy=permissions.read(),sources=currentSources(),auth=policy.authorization
    const accepted=auth.usageAgreementVersion===USAGE_AGREEMENT_VERSION
    const modelSourcesChanged=sources.some(source=>!auth.modelSources.some(granted=>fingerprint(sourceView(granted))===fingerprint(source)))
    const ordinaryScopes=AUTHORIZATION_SCOPES.filter(scope=>!separateTtsScopes.has(scope.id))
    return {schema:1,revision:fingerprint({policy:policy.revision,sources}),completed:auth.completed,
      usageAgreement:{version:USAGE_AGREEMENT_VERSION,accepted,text:[...USAGE_AGREEMENT_TEXT]},
      blockedOperations:auth.blockedOperations,revocationUnconfirmed:auth.revocationUnconfirmed,
      granted:accepted&&ordinaryScopes.every(scope=>auth.scopes.includes(scope.id)),modelSourcesChanged,
      scopes:AUTHORIZATION_SCOPES.map(scope=>({...scope,allowed:auth.scopes.includes(scope.id)})),modelSources:sources,restrictions:[]}
  }
  const safetyOperation=(operation,request)=>operation==='disable'||operation==='cancel-tts'||operation==='listen-mode'&&request.mode==='ptt'||operation==='control-model-install'&&['pause','cancel'].includes(request.operation)
  const requiredScopes=(operation,request,before)=>{
    if(safetyOperation(operation,request))return []
    if(operation==='enable'||operation==='listen-mode')return ['microphone']
    if(operation==='new'||operation==='resume')return ['microphone','settings']
    if(operation==='start-model-install'||operation==='control-model-install')return ['model-download']
    if(operation==='preview-tts'||operation==='save-tts'){
      if(operation==='preview-tts'&&before.ttsSetup?.provider==='custom')return ['local-audio',CUSTOM_TTS_SCOPE]
      const consent=TTS_CLOUD_CONSENT[request.values?.provider??before.ttsSetup?.provider]
      return [...(operation==='preview-tts'?['local-audio']:[]),...(consent?[consent.scope]:[])]
    }
    if(CONFIGURATION_OPERATIONS.includes(operation))return []
    return ['settings']
  }
  // Legacy pins retain explicit denials, not permanent ownership of old values.
  const configurationDenied=(policy,operation)=>policy.authorization.revocationUnconfirmed
    || policy.authorization.completed&&!policy.authorization.scopes.includes('settings')
    || policy.pins[operation]?.__blockedByOwner===true
  const pinnedConflict=(policy,operation,request,modelApplyTarget)=>{
    const targetOperation=operation==='apply-model-install'?(modelApplyTarget?.tts?'save-tts':'save-models'):operation
    return configurationDenied(policy,operation)||configurationDenied(policy,targetOperation)?'__blockedByOwner':null
  }
  const readModelApplyTarget=async(id,agent,before)=>{
    const snapshot=await api.readModelInstaller(agent)
    const job=snapshot?.jobs?.find(item=>item.id===id),selected=job?.recommendedSettings
    if(job?.status==='installed'&&job.purpose==='tts'&&object(selected)){
      const tts=selected.tts
      if(Object.keys(selected).some(key=>key!=='tts')||!object(tts)||Object.keys(tts).sort().join()!=='localModelId,localModelPath,provider'||tts.provider!=='local'||typeof tts.localModelId!=='string'||!tts.localModelId||tts.localModelId.length>256||typeof tts.localModelPath!=='string'||!tts.localModelPath||tts.localModelPath.length>2048||/[\u0000-\u001f]/.test(tts.localModelPath)||/^[a-z][a-z0-9+.-]*:\/\//i.test(tts.localModelPath))fail('INVALID_MODEL_TARGET','已安装朗读模型的目标设置无效，未应用')
      return {tts:{...clone(before.ttsSetup),...clone(tts)}}
    }
    if(job?.status!=='installed'||!object(selected)||'tts' in selected||job.purpose==='tts'||selected.asr!=='sensevoice'||!['cpu','auto'].includes(selected.modelCompute)||!object(selected.models))fail('MODEL_NOT_INSTALLED','未找到可应用的已安装模型及其完整目标设置')
    const entries=Object.entries(selected.models),setting='sensevoiceDir'
    if(!entries.length||!selected.models[setting]||entries.some(([key,value])=>key!=='sensevoiceDir'||typeof value!=='string'||!value||value.length>2048||/[\u0000-\u001f]/.test(value)||/^[a-z][a-z0-9+.-]*:\/\//i.test(value)))fail('INVALID_MODEL_TARGET','已安装模型的目标设置无效，未应用')
    return {asr:selected.asr,models:{...before.modelSetup.models,...clone(selected.models)},modelCompute:selected.modelCompute}
  }
  const changedLeaves=(before,after,prefix='')=>{
    const result={}
    for(const [key,value] of Object.entries(after??{})){
      const path=prefix?prefix+'.'+key:key
      if(object(value))Object.assign(result,changedLeaves(before?.[key],value,path))
      else if(JSON.stringify(before?.[key])!==JSON.stringify(value))result[path]=clone(value)
    }
    return result
  }
  const recordPins=(operation,before,after,force=false)=>{
    if(!after)return
    const leaves=changedLeaves(force?null:before,after)
    if(!Object.keys(leaves).length)return
    const policy=permissions.read()
    const retained=Object.fromEntries(Object.entries(policy.pins[operation]??{}).filter(([path])=>!Object.keys(leaves).some(next=>path===next||path.startsWith(next+'.')||next.startsWith(path+'.'))))
    policy.pins[operation]={...retained,...leaves};permissions.write(policy,policy.revision)
  }
  const permissionSnapshot=agent=>{
    const policy=ensurePermissions(agent)
    return {schema:1,revision:policy.revision,items:ORDINARY_OPERATIONS.map(operation=>{
      const denied=configurationDenied(policy,operation),blocked=policy.authorization.blockedOperations.includes(operation)
      return {operation,title:LABELS[operation],allowed:!denied&&!blocked,reason:blocked?'上次结果未确认，自动调用已暂停。':denied?'主人已撤销此配置权限。':null}
    })}
  }
  const revokePermission=operation=>{
    if(!ORDINARY_OPERATIONS.includes(operation))return
    const policy=permissions.read()
    if(policy.grants[operation].allowed){policy.grants[operation]={allowed:false,baseline:null};permissions.write(policy,policy.revision)}
  }
  const anchor=()=>({humanRevision,incarnation,settingsRevision:api.readSettings().revision,permissionsRevision:permissions.read().revision,runtime:runtimeToken()})
  const valid=plan=>fingerprint(anchor())===plan.anchorHash
  const invalidate=(except=null)=>{humanRevision++;for(const plan of plans.values())if(plan!==except&&['pending','executing'].includes(plan.state)){plan.state='superseded';plan.error={code:'HUMAN_CHANGED',message:'人工操作优先，此请求已失效，请重新准备。'};plan.abort.abort()}}
  const sweep=()=>{for(const plan of plans.values())if(plan.state==='pending'&&(now()>plan.expiresAt||!valid(plan))){plan.state='expired';plan.error={code:'STALE_PLAN',message:'设置、麦克风归属或时间已改变，此请求不能继续执行。'}}}
  const projection=plan=>({id:plan.id,sourceSessionId:plan.agent.session.id,operation:plan.request.action,title:LABELS[plan.request.action],state:plan.state,createdAt:plan.createdAt,expiresAt:plan.expiresAt,humanRevision:plan.humanRevision,request:clone(plan.request),before:clone(plan.before),...(plan.installPlan?{installPlan:clone(plan.installPlan)}:{}),...(plan.modelApplyTarget?{modelApplyTarget:clone(plan.modelApplyTarget)}:{}),acknowledgements:plan.acks.map(id=>({id,text:ACKS[id]})),result:plan.result===undefined?null:clone(plan.result),error:plan.error??null,nextAction:plan.state==='unknown'&&plan.request.action==='enable'?'请先执行 disable 核查鱼应已完整停止。核查通过后可按原授权执行 enable；核查前不要重试上次未知操作。':plan.state==='pending'?'预览尚未执行；使用 execute 按已授权范围执行。':plan.state==='unknown'?'执行结果未知，请先读取实际状态，不要重试。':plan.state==='blocked'?'目标会话正在 DSH 中使用。请在鱼应界面选择其他会话或新建会话；若要继续该会话，可在重启 DSH 后先从鱼应开启。':null})
  const read=async(agent,operation,params={},signal)=>{
    check(agent,signal);ensurePermissions(agent);sweep()
    if(operation==='capabilities'){exact(params,[]);return {schema:1,reads:READS,operations:WRITES,parameters:PARAMETERS,confirmation:'direct-configuration-scoped-operations',directConfigurationOperations:CONFIGURATION_OPERATIONS,ownerSettingChanges:{supported:true,action:'request-owner-change',mode:'direct-configuration-alias',priorNaturalLanguageEvidence:false},authorization:authorizationSnapshot(),permissions:permissionSnapshot(agent),directSafetyOperations:['disable','cancel-tts','listen-mode(mode=ptt)','control-model-install(operation=pause|cancel)'],humanPriority:'Configuration executes directly with revision checks. New human edits supersede concurrent plans; explicit revocations and unknown results block execution. request-owner-change is a configuration alias and does not ask again. Microphone, playback, downloads, external text transmission and physical facts retain their authorization boundaries.',localUi:{supported:false,reason:'动效、折叠、位置属于浏览器本地状态，后端本批未提供控制通道。'},pendingRequests:[...plans.values()].filter(p=>p.agent===agent).map(projection)}}
    if(!READS.includes(operation))fail('UNSUPPORTED_OPERATION','不支持的读取操作')
    if(operation==='conversation'){exact(params,[]);return api.readConversation(agent)}
    if(operation==='read-output-volume'){exact(params,[]);return api.readOutputVolume(agent)}
    if(operation==='setup-status'){exact(params,[]);return api.readSettings(agent).onboarding}
    const request=actionRequestCodec.create().parse({...params,action:operation})
    const result=await dispatchUiAction(api,agent,request,signal)
    check(agent,signal);return result.value
  }
  const prepare=async(agent,operation,params={},signal)=>{
    check(agent,signal);ensurePermissions(agent);sweep()
    if(!WRITES.includes(operation))fail('UNSUPPORTED_OPERATION','不支持的操作')
    if(!object(params))fail('INVALID_REQUEST','操作参数必须是对象')
    if(['source','actor','human','accepted','approval','approvalToken'].some(key=>key in params))fail('FORGED_APPROVAL','Agent 不得声明人工身份或批准')
    if([...plans.values()].filter(p=>p.state==='pending').length>=20||[...plans.values()].filter(p=>p.state==='pending'&&p.agent===agent).length>=5)fail('TOO_MANY_REQUESTS','待确认请求过多，请先处理或撤销已有请求')
    const initial=anchor(),before=clone(api.readSettings(agent)),acks=[]
    let request={...clone(params),action:operation},installPlan,modelApplyTarget
    if(operation==='start-model-install'){
      exact(params,['modelId','compute','useWhenReady','sourceDirectory','modelVariant'])
      const {useWhenReady, ...planParams}=params
      installPlan=await api.planModelInstall(planParams,agent,signal)
      request={action:operation,...planParams,planHash:installPlan.planHash,...('useWhenReady' in params?{useWhenReady:params.useWhenReady}:{})};acks.push('download')
    }else if(operation==='apply-model-install'){
      exact(params,['id','revision'])
      modelApplyTarget=await readModelApplyTarget(params.id,agent,before)
    }else if(operation==='set-output-volume'){
      exact(params,['revision','volume'])
      if(!Number.isSafeInteger(params.revision)||params.revision<0||!Number.isFinite(params.volume)||params.volume<0||params.volume>1)fail('INVALID_REQUEST','音量和版本无效')
      before.outputVolume=clone(await api.readOutputVolume(agent))
      if(params.revision!==before.outputVolume.revision)fail('STALE_PLAN','输出音量已改变，请重新读取后再准备')
    }else if(operation==='save-tts'){
      if(!object(params.values))fail('INVALID_REQUEST','需要完整朗读设置')
      if(params.values.provider==='custom'||Object.hasOwn(params.values,'customTts'))fail('VOICE_OWNER_REQUIRED','请由主人在鱼应朗读设置中配置或启用自定义 TTS。')
      const {field}=TTS_CLOUD_CONSENT.deepseek
      const accepted=before.ttsSetup[field]===true
      if(field in params.values&&params.values[field]!==accepted)fail('FORGED_CONSENT','Agent 不能声明在线朗读的文本传输同意；请省略该字段，由主人确认。')
      request.values[field]=accepted
      // Reference samples are an ordinary local setting after first use.
      // Keep the old per-file flag only for an unchanged legacy sample; never
      // manufacture a statement that a new sample's owner granted rights.
      const currentReference=before.ttsSetup.referenceAudioPath??null
      if(!('referenceAudioPath' in params.values))request.values.referenceAudioPath=currentReference
      if('referenceAudioAccepted' in params.values&&params.values.referenceAudioAccepted!==(before.ttsSetup.referenceAudioAccepted??false))fail('INVALID_REQUEST','请省略旧版参考音频确认字段')
      request.values.referenceAudioAccepted=request.values.referenceAudioPath===currentReference?(before.ttsSetup.referenceAudioAccepted??false):false
    }else if(operation==='save-settings'){
      if(!object(params.values))fail('INVALID_REQUEST','需要完整音频设置')
      // A proposed fact remains false until the owner checks its exact acknowledgement.
      if(params.values.turnSignals?.headphonesConfirmed===true&&before.values?.turnSignals?.headphonesConfirmed!==true)acks.push('headphones')
    }
    if(operation==='enable'){
      const current=api.status(agent)
      if(!('expectedOwnerSessionId' in request))request.expectedOwnerSessionId=current.ownerSessionId
      acks.push('microphone');if(current.ownerSessionId&&current.ownerSessionId!==agent.session.id)acks.push('transfer')
      if(request.expectedOwnerSessionId!==current.ownerSessionId)fail('STALE_PLAN','麦克风归属已改变，请重新读取后再准备')
      if(['always','wake'].includes(before.listenMode))acks.push('always')
    }
    if(operation==='listen-mode'&&['always','wake'].includes(params.mode))acks.push('always')
    if(['new','resume'].includes(operation)){acks.push('conversation','microphone');if(['always','wake'].includes(before.listenMode))acks.push('always')}
    if(['save-settings','save-models','set-performance-mode','set-visibility','save-tts','complete-setup','set-output-volume','apply-model-install'].includes(operation))acks.push('settings')
    if(operation!=='set-output-volume'&&'revision' in request&&request.revision!==before.revision)fail('STALE_PLAN','设置已改变，请重新读取后再准备')
    if(operation!=='set-output-volume'){request=actionRequestCodec.create().parse(operation==='start-model-install'?{...request,accepted:true}:request);if(operation==='start-model-install')delete request.accepted}
    check(agent,signal)
    if(fingerprint(initial)!==fingerprint(anchor()))fail('STALE_PLAN','准备期间人工设置或麦克风归属已改变，请重新准备')
    // Completed requests are bounded too; never evict a pending/executing request.
    for(const [id,p] of plans)if(plans.size>=100&&!['pending','executing'].includes(p.state))plans.delete(id)
    const plan={id:randomUUID(),agent,request:clone(request),before,installPlan:installPlan&&clone(installPlan),modelApplyTarget,acks:[...new Set(acks)],anchorHash:fingerprint(initial),humanRevision,createdAt:now(),expiresAt:now()+ttlMs,state:'pending',abort:new AbortController()}
    plans.set(plan.id,plan)
    return {schema:1,ok:false,status:'confirmation-required',request:projection(plan)}
  }
  const ownPlan=(agent,id)=>{check(agent);sweep();const plan=plans.get(id);if(!plan||plan.agent!==agent)fail('UNKNOWN_REQUEST','请求不存在或不属于此会话');return plan}
  const decide=async(selectedAgent,decision,signal)=>{
    exact(decision,['id','approve','acknowledgements'])
    const {id,approve,acknowledgements=[]}=decision
    check(selectedAgent,signal);sweep()
    const plan=plans.get(id)
    if(!plan||plan.state!=='pending')fail('REQUEST_NOT_PENDING','请求已处理、取消或失效；不会重复执行')
    check(plan.agent,signal)
    if(approve!==true&&approve!==false)fail('INVALID_REQUEST','请明确同意或拒绝')
    if(!approve){plan.state='rejected';return projection(plan)}
    if(!Array.isArray(acknowledgements)||plan.acks.some(key=>!acknowledgements.includes(key))||acknowledgements.some(key=>!plan.acks.includes(key)))fail('CONFIRMATION_REQUIRED','请逐项确认本次操作的实际影响')
    if(!valid(plan))fail('STALE_PLAN','人工设置已变化，请重新准备请求')
    return runPlan(plan,signal,{human:true})
  }
  const runPlan=async(plan,signal,{human=false,permission=null}={})=>{
    const combined=signal?AbortSignal.any([signal,plan.abort.signal]):plan.abort.signal
    if(!valid(plan))fail('STALE_PLAN','人工设置或权限已变化，请重新准备请求')
    if(human){revokePermission(plan.request.action);invalidate(plan)}
    plan.state='executing'
    try{
      if(plan.installPlan){const live=await api.planModelInstall({modelId:plan.request.modelId,compute:plan.request.compute,...(plan.request.sourceDirectory!==undefined?{sourceDirectory:plan.request.sourceDirectory}:{}),...(plan.request.modelVariant!==undefined?{modelVariant:plan.request.modelVariant}:{})},plan.agent,combined);if(fingerprint(live)!==fingerprint(plan.installPlan))fail('MODEL_PLAN_CHANGED','模型来源、许可或安装计划已变化，请重新确认')}
      if(plan.modelApplyTarget){const live=await readModelApplyTarget(plan.request.id,plan.agent,api.readSettings(plan.agent));if(fingerprint(live)!==fingerprint(plan.modelApplyTarget))fail('MODEL_TARGET_CHANGED','已安装模型的目标设置已变化，未应用，请重新核查')}
      check(plan.agent,combined)
      if(plan.request.action==='set-output-volume')plan.result=await api.setOutputVolume({revision:plan.request.revision,volume:plan.request.volume},plan.agent,combined)
      else {
        const approved=clone(plan.request)
        if(approved.action==='start-model-install')approved.accepted=true
        plan.result=(await dispatchUiAction(api,plan.agent,approved,combined)).value
      }
      check(plan.agent,combined)
      if(permission?.authorization&&permissions.read().revision!==permission.policy.revision)fail('HUMAN_CHANGED','执行期间授权或人工设置已改变，请核查结果')
      // Only a completed stop with the session manager's registry verification
      // reconciles an uncertain enable. It says nothing about other operations.
      if (plan.request.action === 'disable' && plan.result?.enabled === false && plan.result?.ownerSessionId === null && plan.result?.voiceControlBusy === false && plan.result?.voiceSession?.id === null && plan.result?.voiceSession?.fullyStopped === true && plan.result?.voiceSession?.recovery?.kind === 'none' && plan.result?.voiceSession?.recovery?.stopVerified === true) {
        const policy = permissions.read()
        if (policy.authorization.blockedOperations.includes('enable')) {
          policy.authorization.blockedOperations = policy.authorization.blockedOperations.filter(operation => operation !== 'enable')
          permissions.write(policy, policy.revision)
        }
      }
      plan.state='completed';return projection(plan)
    }catch(error){
      if (error instanceof VoicePreflightError && error.operation === plan.request.action) {
        plan.state='rejected'
        plan.error={code:String(error.code).slice(0,80),message:String(error.message).slice(0,1024)}
        return projection(plan)
      }
      if (plan.request.action === 'enable' && error instanceof VoiceRootOwnershipError && error.enableNotStarted === true) {
        plan.state = 'blocked'
        plan.error = { code: error.code, message: error.message }
        return projection(plan)
      }
      // Once execution began, an exception is not evidence that nothing happened.
      try{revokePermission(plan.request.action);const blocked=permissions.read();blocked.authorization.blockedOperations=[...new Set([...blocked.authorization.blockedOperations,plan.request.action])];permissions.write(blocked,blocked.revision)}catch{/* Permission storage is already fail-closed; preserve the original uncertain outcome. */}
      plan.state='unknown';plan.error={code:String(error.code??'OUTCOME_UNKNOWN').slice(0,80),message:String(error.message??error).slice(0,1024)}
      return projection(plan)
    }
  }
  const execute=async(agent,operation,params={},signal)=>{
    const prepared=await prepare(agent,operation,params,signal)
    const plan=plans.get(prepared.request.id)
    const safety=safetyOperation(operation,params)
    const policy=permissions.read()
    if(policy.authorization.blockedOperations.includes(operation)&&!safety){plan.state='unknown';plan.error={code:'OUTCOME_UNKNOWN',message:operation==='enable'?'上次开麦结果尚未核实。请先关闭语音并核查鱼应已完整停止；核查通过后保留原授权。':'上次操作结果未知，先由主人核查实际状态，再在授权页解除暂停。'};return {schema:1,ok:false,status:'outcome-unknown',request:projection(plan)}}
    const conflict=CONFIGURATION_OPERATIONS.includes(operation)&&pinnedConflict(policy,operation,plan.request,plan.modelApplyTarget)
    if(conflict&&!safety){plan.state='superseded';plan.error={code:'HUMAN_OVERRIDE',message:'主人已撤销此配置权限，请在权限设置中重新允许。'};return {schema:1,ok:false,status:'human-override',request:projection(plan)}}
    const missing=requiredScopes(operation,plan.request,plan.before).filter(scope=>!policy.authorization.scopes.includes(scope)
      || scope===TTS_CLOUD_CONSENT.deepseek.scope&&plan.before.ttsSetup[TTS_CLOUD_CONSENT.deepseek.field]!==true)
    if(operation==='save-tts'&&plan.request.values.referenceAudioPath!=null&&policy.authorization.usageAgreementVersion!==USAGE_AGREEMENT_VERSION)missing.push('usage-agreement')
    if(plan.acks.includes('headphones'))missing.push('headphones-fact')
    if(plan.installPlan&&!policy.authorization.modelSources.some(source=>fingerprint(sourceView(source))===fingerprint(sourceView({...plan.installPlan,modelId:plan.request.modelId}))))missing.push('model-source')
    const authorized=missing.length===0
    if(!safety&&!authorized)return {...prepared,missingPermissions:[...new Set(missing)],nextAction:missing.includes(TTS_CLOUD_CONSENT.deepseek.scope)?TTS_CLOUD_CONSENT.deepseek.requiredMessage:missing.includes('headphones-fact')?'请先由主人在音效设置确认佩戴耳机；授权不能代替这个事实。':policy.authorization.completed?'当前操作不在已有授权范围内。':'首次使用请完成鱼应的一键授权。'}
    const result=await runPlan(plan,signal,{permission:safety?null:{authorization:true,policy}})
    return {schema:1,ok:result.state==='completed',status:result.state,request:result}
  }
  // Compatibility alias: this never opens an owner question or grants consent.
  const requestOwnerChange=async(agent,operation,params={},signal)=>{
    check(agent,signal)
    if(!CONFIGURATION_OPERATIONS.includes(operation))fail('UNSUPPORTED_OPERATION','此入口只支持修改设置，不会开麦、下载或试听')
    return execute(agent,operation,params,signal)
  }
  // These host-owned overrides are never used by model reads, plans or dispatch.
  const humanApi={...api,...humanApiOverrides}
  const permissionMethods={updateVoicePrompt:'save-voice-prompt',updateConversationModel:'save-conversation-model',updateBindings:'save-settings',updateAudioDevice:'save-audio-device',setPerformanceMode:'set-performance-mode',setVisibility:'set-visibility',setOutputVolume:'set-output-volume',updateSettings:'save-settings',updateModelSettings:'save-models',updateTtsSettings:'save-tts'}
  const settingsPart=(operation,snapshot)=>operation==='save-voice-prompt'?{mode:snapshot.voicePrompt?.mode,textDigest:fingerprint(snapshot.voicePrompt?.text??'')}:operation==='save-conversation-model'?snapshot.conversationModel:operation==='save-audio-device'?snapshot.audioDevices:operation==='save-settings'?snapshot.values:operation==='save-models'?snapshot.modelSetup:operation==='save-tts'?snapshot.ttsSetup:operation==='set-performance-mode'?{performanceMode:snapshot.voiceSession?.performanceMode}:operation==='set-visibility'?{visibility:snapshot.voiceSession?.visibility}:{volume:snapshot.volume}
  for(const method of HUMAN_METHODS)if(typeof humanApi[method]==='function'){
    const operationMethod=humanApi[method]
    humanApi[method]=(...args)=>{
    const operation=permissionMethods[method]
    const modelBefore=method==='applyModelInstall'?clone(api.readSettings(args[1])):null
    let before
    if(operation){check(args[1],args[2]);ensurePermissions(args[1]);before=settingsPart(operation,operation==='set-output-volume'?api.readOutputVolume(args[1]):api.readSettings(args[1]))}
    if(method==='updateTtsSettings'&&args[0]?.values?.referenceAudioPath!=null&&args[0].values.referenceAudioPath!==before?.referenceAudioPath&&permissions.read().authorization.usageAgreementVersion!==USAGE_AGREEMENT_VERSION)fail('USAGE_AGREEMENT_REQUIRED','请先完成首次使用协议')
    revokePermission(operation);invalidate()
    const result=operationMethod(...args)
    const complete=value=>{
      if(modelBefore){recordPins('save-models',modelBefore.modelSetup,value.modelSetup);recordPins('save-tts',modelBefore.ttsSetup,value.ttsSetup)}
      if(operation)recordPins(operation,before,settingsPart(operation,value),ORDINARY_OPERATIONS.includes(operation))
      // A saved owner choice authorizes only the selected provider.
      const consent=method==='updateTtsSettings'&&TTS_CLOUD_CONSENT[value.ttsSetup?.provider]
      if(consent&&args[0]?.values?.provider===value.ttsSetup?.provider&&args[0]?.values?.[consent.field]===true&&value.ttsSetup[consent.field]===true){
        const policy=permissions.read()
        if(!policy.authorization.scopes.includes(consent.scope)){policy.authorization.scopes.push(consent.scope);permissions.write(policy,policy.revision)}
      }
      if(method==='updateTtsSettings'&&value.ttsSetup?.provider==='custom'&&args[0]?.values?.customTts?.textTransmissionAccepted===true&&value.ttsSetup.customTts?.textTransmissionAccepted===true){
        const policy=permissions.read()
        if(!policy.authorization.scopes.includes(CUSTOM_TTS_SCOPE)){policy.authorization.scopes.push(CUSTOM_TTS_SCOPE);permissions.write(policy,policy.revision)}
      }
      return value
    }
    return result&&typeof result.then==='function'?result.then(complete):complete(result)
    }
  }
  humanApi.readAuthorization=()=>{if(disposed)fail('DISPOSED','插件已卸载');return authorizationSnapshot()}
  humanApi.saveAuthorization=async(request,signal)=>{
    if(revocationCleanup)await revocationCleanup
    if(disposed)fail('DISPOSED','插件已卸载');signal?.throwIfAborted();exact(request,['revision','grant'])
    if(typeof request.grant!=='boolean'||request.revision!==authorizationSnapshot().revision)fail('STALE_AUTHORIZATION','授权说明或状态已变化，请重新读取')
    const policy=permissions.read()
    const hadGrant=policy.authorization.scopes.length>0||policy.authorization.revocationUnconfirmed
    // This explicit first-use click covers the services listed by the snapshot.
    // Existing persisted grants are not migrated or silently expanded.
    const scopes=AUTHORIZATION_SCOPES.map(scope=>scope.id).filter(scope=>!separateTtsScopes.has(scope)||policy.authorization.scopes.includes(scope))
    policy.authorization={completed:true,blockedOperations:[],revocationUnconfirmed:false,
      usageAgreementVersion:request.grant?USAGE_AGREEMENT_VERSION:policy.authorization.usageAgreementVersion,
      scopes:request.grant?scopes:[],modelSources:request.grant?currentSources():[],grantedAt:request.grant?now():null}
    if(!request.grant)for(const operation of ORDINARY_OPERATIONS)policy.grants[operation]={allowed:false,baseline:null}
    invalidate();permissions.write(policy,policy.revision)
    // Once the decision is durable, the host owns cleanup even if the settings window closes.
    if(!request.grant&&hadGrant){
      const finished=Promise.withResolvers()
      revocationCleanup=finished.promise
      try{await onAuthorizationRevoked()}
      catch{const uncertain=permissions.read();uncertain.authorization.revocationUnconfirmed=true;permissions.write(uncertain,uncertain.revision)}
      finally{revocationCleanup=null;finished.resolve()}
    }
    return authorizationSnapshot()
  }
  humanApi.readAgentPermissions=agent=>{check(agent);return permissionSnapshot(agent)}
  humanApi.updateAgentPermissions=(request,agent,signal)=>{
    check(agent,signal);exact(request,['revision','allowed']);exact(request.allowed,ORDINARY_OPERATIONS)
    if(ORDINARY_OPERATIONS.some(key=>typeof request.allowed[key]!=='boolean'))fail('INVALID_REQUEST','需要每一项普通操作的明确许可')
    const policy=ensurePermissions(agent)
    if(request.revision!==policy.revision)fail('STALE_PLAN','Agent 权限已改变，请重新读取')
    for(const operation of ORDINARY_OPERATIONS){policy.grants[operation]={allowed:request.allowed[operation],baseline:request.allowed[operation]?valueHash(currentValue(operation,agent)):null};if(request.allowed[operation])delete policy.pins[operation];else policy.pins[operation]={...policy.pins[operation],__blockedByOwner:true}}
    invalidate();permissions.write(policy,request.revision)
    return permissionSnapshot(agent)
  }
  humanApi.readAgentRequests=agent=>{check(agent);sweep();return {schema:1,humanRevision,items:[...plans.values()].map(projection)}}
  humanApi.decideAgentRequest=(request,agent,signal)=>decide(agent,request,signal)
  const checkInstallAuthorization=(agent,modelId,signal)=>{
    check(agent,signal)
    const policy=permissions.read(),source=currentSources().find(item=>item.modelId===modelId)
    if(['settings','local-audio','model-download'].some(scope=>!policy.authorization.scopes.includes(scope))||!source||!policy.authorization.modelSources.some(item=>fingerprint(sourceView(item))===fingerprint(source)))fail('AUTHORIZATION_REQUIRED','需要补充当前模型来源或朗读设置授权，尚未应用。')
    if(policy.authorization.blockedOperations.some(operation=>['apply-model-install','save-tts','start-model-install'].includes(operation)))fail('OUTCOME_UNKNOWN','上次操作结果尚未核查，未自动应用。')
    return policy
  }
  const captureInstall=(agent,request,signal,human=false)=>{
      if(human&&request.useWhenReady!==true)fail('INVALID_REQUEST','需要明确选择下载后使用。')
      const policy=checkInstallAuthorization(agent,request.modelId,signal)
      const token=Object.freeze({revision:policy.revision,humanRevision,modelId:request.modelId,ttsBaseline:fingerprint(api.readSettings(agent).ttsSetup)})
      installAuthorizations.set(token,{agent,human,target:null});return token
  }
  return {
    humanApi,read,prepare,execute,requestOwnerChange,
    captureModelInstallAuthorization:(agent,request,signal)=>captureInstall(agent,request,signal),
    captureHumanModelInstallAuthorization:(agent,request,signal)=>captureInstall(agent,request,signal,true),
    assertModelInstallAuthorization(agent,token,targetTtsSetup,signal){
      check(agent,signal)
      if(!object(token)||installAuthorizations.get(token)?.agent!==agent)fail('STALE_AUTHORIZATION','安装恢复需要重新核查当前授权。')
      const policy=checkInstallAuthorization(agent,token.modelId,signal)
      if(policy.revision!==token.revision||humanRevision!==token.humanRevision||fingerprint(api.readSettings(agent).ttsSetup)!==token.ttsBaseline)fail('HUMAN_CHANGED','授权或人工朗读设置已改变，未自动应用。')
      if(targetTtsSetup===undefined)return true // Preliminary identity/scope check; application must supply the complete target.
      if(!object(targetTtsSetup)||targetTtsSetup.provider!=='local'||targetTtsSetup.localModelId!==token.modelId)fail('INVALID_MODEL_TARGET','自动应用目标与授权模型不符。')
      const expected={...api.readSettings(agent).ttsSetup,provider:'local',localModelId:token.modelId,localModelPath:targetTtsSetup.localModelPath}
      if(fingerprint(expected)!==fingerprint(targetTtsSetup))fail('INVALID_MODEL_TARGET','自动应用只能修改本地模型相关设置。')
      const authority=installAuthorizations.get(token)
      const conflict=pinnedConflict(policy,'save-tts',{values:targetTtsSetup})
      if(conflict)fail('HUMAN_OVERRIDE','主人已撤销此配置权限。')
      authority.target=fingerprint(targetTtsSetup)
      return true
    },
    completeModelInstallAuthorization(agent,token,targetTtsSetup,signal){
      check(agent,signal)
      const authority=object(token)&&installAuthorizations.get(token)
      if(!authority||authority.agent!==agent||!authority.target||authority.target!==fingerprint(targetTtsSetup))fail('STALE_AUTHORIZATION','应用目标尚未核准，不能记录人工选择。')
      const policy=checkInstallAuthorization(agent,token.modelId,signal)
      if(policy.revision!==token.revision||humanRevision!==token.humanRevision||fingerprint(api.readSettings(agent).ttsSetup)!==authority.target)fail('HUMAN_CHANGED','授权或实际设置已改变，未记录人工选择。')
      if(authority.human)recordPins('save-tts',null,Object.fromEntries(['provider','localModelId','localModelPath'].map(key=>[key,targetTtsSetup[key]])),true)
      installAuthorizations.delete(token)
      return true
    },
    requireScopes(agent,scopes,signal){
      check(agent,signal)
      const policy=permissions.read(),deepseek=TTS_CLOUD_CONSENT.deepseek
      if(scopes.includes(deepseek.scope)&&!policy.authorization.scopes.includes(deepseek.scope))fail('TTS_DEEPSEEK_CONSENT_REQUIRED',deepseek.requiredMessage)
      if(scopes.includes(CUSTOM_TTS_SCOPE)&&!policy.authorization.scopes.includes(CUSTOM_TTS_SCOPE))fail('TTS_CUSTOM_CONSENT_REQUIRED','请在朗读设置确认发送文字，再使用自定义 TTS。')
      if(scopes.some(scope=>!policy.authorization.scopes.includes(scope)))fail('AUTHORIZATION_REQUIRED','需要鱼应首次一键授权或补充缺失权限，尚未执行。')
    },
    inspect:(agent,id)=>projection(ownPlan(agent,id)),
    cancel(agent,id){const plan=ownPlan(agent,id);if(plan.state!=='pending')fail('REQUEST_NOT_PENDING','请求不再等待确认；不能声称执行已撤销');plan.state='cancelled';plan.abort.abort();return projection(plan)},
    noteStop:()=>invalidate(),
    dispose(){disposed=true;for(const p of plans.values())p.abort.abort();plans.clear()},
  }
}
