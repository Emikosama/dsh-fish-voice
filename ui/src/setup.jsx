import { MotionRange, MotionToggle } from './motion.jsx'
import { PathField } from './path-field.jsx'
import { useId, useRef, useState, useLayoutEffect, useEffect } from 'react'
import { Button, Input, Checkbox, MenuSurface } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './setup.module.css'

const speechSources = [
  ['edge', 'Edge 在线朗读', '默认晓伊 · 连不上时显示文字'],
  ['local', '本地语音模型', '在本机合成，首次需要下载'],
  ['off', '不发声', '只显示文字'],
]
const settingsSpeechSources = [speechSources[0], ['deepseek', 'DeepSeek 语音合成', '使用 DeepSeek 开放平台的 API Key'], ...speechSources.slice(1)]
const providerNames = { edge:'Edge 在线朗读', deepseek:'DeepSeek 语音合成', local:'本地语音模型' }
const initialTts = { provider: 'unconfigured', edgeVoice: 'zh-CN-XiaoyiNeural', deepseekVoice:'stella', deepseekTextTransmissionAccepted:false, systemVoice: null, systemFallback: false, edgeTextTransmissionAccepted: false, volume: .8, localModelId:null, localModelPath:null, referenceAudioPath:null }
const ttsValues = values => { const result={...values}; delete result.referenceAudioAccepted; return result }
const auditionValues = (values, saved) => ({
  ...ttsValues(values), referenceAudioAccepted: values.referenceAudioPath === saved?.referenceAudioPath && saved?.referenceAudioAccepted === true,
})
export const setupStyles = css.text
const intentReason = reason => ({'restart-requires-resume':'宿主已重启，请继续后重新核验，不会自动覆盖设置。','authorization-changed':'授权已改变，请在权限中核查后继续。','MODEL_SOURCE_AUTHORIZATION_REQUIRED':'模型来源授权已变化，请补充一次授权后继续。','HUMAN_SETTING_PINNED':'设置权限已撤销，请在权限中核查后继续。'})[reason] ?? (typeof reason==='string'&&/^[A-Z_:-]+$/.test(reason)?'运行检查未通过，请检查依赖或查看高级设置中的错误。':reason)
export const formatBytes = value => Number.isFinite(value) && value >= 0 ? `${(value / 1024 ** 2).toFixed(1)} MiB` : '未知'
function setupReady(state, sessionId) {
  const s = state.status
  return Boolean(state.checkedFor === sessionId && state.settingsFor === sessionId && state.settings?.revision && !state.ttsCancelling && !state.ttsUncertain && !state.uncertain && !state.settingsConflict && s?.enabled === false && s?.ownerSessionId === null && s?.voiceControlBusy === false && s?.voiceSession?.fullyStopped === true && s?.voiceSession?.id === null && !s?.ttsRuntime?.busy && !s?.ttsRuntime?.blocked)
}
export function setupWritable(state, sessionId) { return !state.busy && setupReady(state, sessionId) }
function useCommand(run, sessionId) {
  const lock = useRef(false)
  const [pending, setPending] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  // External-store renders may expose a completed read before this hook's
  // finally runs. Automatic preparation needs both the live lock and a wakeup.
  const [settled, setSettled] = useState(0)
  const execute = async (action, payload) => {
    if (lock.current) return false
    lock.current = true; setPending(true); setPendingAction(action)
    try { return await run(sessionId, action, payload) } catch { return false }
    finally { lock.current = false; setPending(false); setPendingAction(null); setSettled(value=>value+1) }
  }
  return [execute, pending, pendingAction, { isLocked:()=>lock.current, settled }]
}
function Gate({ state, sessionId, run }) {
  if (setupReady(state, sessionId)) return null
  const active = state.checkedFor === sessionId && (state.status?.enabled || state.status?.ownerSessionId)
  return <div className={css.note} role="status"><p>{state.busy ? '正在读取或保存，请稍候…' : active ? '请先停止语音，再编辑或试听。' : state.ttsUncertain || state.uncertain ? '正在核查上次操作。' : '正在准备设置…'}</p>{active && sessionId && run && <Button variant="outline" disabled={state.busy && (!state.interruptibleRead || state.diagnosticStopPending) || state.ttsCancelling} onClick={()=>void run(sessionId,'disable')}>停止语音以编辑</Button>}</div>
}
export function TtsSetupEditor(props) {
  const original = props.state.settingsFor === props.sessionId ? props.state.settings : null
  const edgeGranted=props.state.authorization?.scopes?.some(scope=>scope.id==='edge-text'&&scope.allowed)===true
  const settings=original&&edgeGranted?{...original,ttsSetup:{...original.ttsSetup,edgeTextTransmissionAccepted:true}}:original
  return <TtsForm key={`${props.sessionId}:${props.state.settingsKey ?? settings?.revision ?? 'unread'}`} {...props} settings={settings}/>
}
function TtsForm({ state, sessionId, run, settings, prepared = false, active = true, markSettingsEdited, pickPath }) {
  const [draft, setDraft] = useState(() => ({ ...initialTts, ...settings?.ttsSetup }))
  const [execute, pending, pendingAction] = useCommand(run, sessionId)
  const name = useId()
  const [chooseLocal,setChooseLocal] = useState(false)
  const capabilities = state.ttsCapabilitiesFor === sessionId ? state.ttsCapabilities : null
  const runtime = state.checkedFor === sessionId ? state.status?.ttsRuntime : null
  const preview = state.ttsPreviewFor === sessionId ? state.ttsPreview : null
  const currentLocalJob = state.installerFor === sessionId ? state.installer?.jobs?.find(job=>configuredModelJob(job,settings)) : null
  const locked = !setupWritable(state, sessionId) || pending
  const changed = JSON.stringify(draft) !== JSON.stringify({ ...initialTts, ...settings?.ttsSetup })
  const patch = value => { markSettingsEdited?.('save-tts'); setDraft(current => ({ ...current, ...value })) }
  const referenceSupported = draft.localModelId === 'qwen3-tts-base-1.7b-gguf'
  const valid = draft.provider !== 'unconfigured' && (draft.provider !== 'local' || Boolean(draft.localModelId && draft.localModelPath) && (!draft.referenceAudioPath || referenceSupported)) && (draft.provider !== 'edge' || draft.edgeTextTransmissionAccepted) && (draft.provider !== 'deepseek' || draft.deepseekTextTransmissionAccepted && capabilities?.deepseekKeyAvailable===true) && draft.volume !== '' && Number.isFinite(Number(draft.volume)) && Number(draft.volume) >= 0 && Number(draft.volume) <= 1
  return <section className={css.section} aria-label="朗读设置" data-settings-draft="save-tts">
    <header><h3>回答怎么发声</h3></header>
    {(!prepared || sessionId && !(state.checkedFor === sessionId && (state.status?.enabled || state.status?.ownerSessionId))) && <Gate state={state} sessionId={sessionId} run={run}/>}
    {(!prepared || !settings || !capabilities || state.uncertain || state.ttsUncertain || draft.provider==='deepseek'&&capabilities.deepseekKeyAvailable!==true) && <div className={css.actions}><Button variant="outline" disabled={state.busy || pending} onClick={() => execute('inspect-tts')}>{draft.provider==='deepseek'?'检查 DeepSeek API Key':'检测本机语音'}</Button></div>}
    <fieldset className={`${css.choices} ${css.sourceChoices}`} disabled={locked || !settings}><legend>朗读来源</legend>
      {settingsSpeechSources.map(([value,label,hint]) => <label key={value} className={css.choice} data-selected={draft.provider === value}><input type="radio" name={name} checked={draft.provider === value} onChange={() => patch({ provider: value, ...(value==='edge'?{edgeTextTransmissionAccepted:true}:value==='deepseek'?{deepseekTextTransmissionAccepted:true}:{}) })}/><span><strong>{label}</strong><small>{hint}</small></span></label>)}
    </fieldset>
    {draft.provider === 'edge' && <div className={css.section}>
      <p className={css.hint}>朗读文字会发送给微软。联网失败时，回答会显示为文字。</p>
      {capabilities?.edgeDependency === 'missing' && <p role="status" className={css.hint}>Edge 朗读组件暂不可用。回答会显示为文字。</p>}
    </div>}
    {draft.provider==='deepseek'&&<div className={css.section}><p className={css.hint}>试听或保存后朗读时，文字会发送给 DeepSeek。</p>
      {capabilities?.deepseekKeyAvailable!==true&&<p role="status" className={css.hint}>请先在 DSH 的 DeepSeek API Key 提供商中配置开放平台密钥，再点「检查 DeepSeek API Key」。</p>}
      <label className={css.inlineField}>DeepSeek 音色<select value={draft.deepseekVoice} disabled={locked} onChange={event=>patch({deepseekVoice:event.target.value})}><option value="stella">海星 · 女声</option><option value="tide">暗潮 · 男声</option></select></label>
    </div>}
    {draft.provider === 'local' && (draft.localModelId ? <div className={css.section}><div className={css.currentModel}><span>当前朗读模型 <strong>{draft.localModelId.startsWith('qwen3')?'Qwen3-TTS':draft.localModelId.includes('melo')?'MeloTTS':draft.localModelId}</strong></span><Button variant="outline" aria-expanded={chooseLocal} disabled={changed} onClick={()=>setChooseLocal(value=>!value)}>切换当前模型</Button></div>{chooseLocal&&<><InstalledModelSwitcher state={state} sessionId={sessionId} run={run} purpose="tts"/><details className={css.details}><summary>安装其他朗读模型</summary><LocalTtsDownload pickPath={pickPath} state={state} sessionId={sessionId} run={run} active={active}/></details></>}</div> : <LocalTtsDownload pickPath={pickPath} state={state} sessionId={sessionId} run={run} active={active}/>)}
    {draft.provider === 'local' && !changed && currentLocalJob?.modelId === 'qwen3-tts-base-1.7b-gguf' && <p className={css.hint}>当前安装方案：{computeLabel(currentLocalJob.compute)}。{currentLocalJob.compute === 'cpu' ? '此安装只使用 CPU。可在“切换当前模型 → 安装其他朗读模型”选择自动 GPU；下载运行组件前仍需确认。' : '是否实际使用 GPU，以完成合成后的本地计算状态为准。'}</p>}
    <details className={css.details}><summary>音色与音量</summary><div className={css.section}>
      {draft.provider === 'local' && (referenceSupported || draft.referenceAudioPath) && <div className={css.section} data-reference-voice>
        <PathField className={css.field} label="参考音频（WAV）" kind="referenceAudio" value={draft.referenceAudioPath} disabled={locked || !referenceSupported} active={active} scope={draft.provider+':'+draft.localModelId} pickPath={pickPath} sessionId={sessionId} placeholder="请点击选择文件" onChange={value=>patch({referenceAudioPath:value.trim() || null})}/>
        {draft.referenceAudioPath && <Button variant="outline" disabled={locked} onClick={()=>patch({referenceAudioPath:null})}>清除参考音色</Button>}
      </div>}
      {draft.provider !== 'local' && draft.referenceAudioPath && <div className={css.section}><p className={css.hint}>本地参考音色已保留。</p><Button variant="outline" disabled={locked} onClick={()=>patch({referenceAudioPath:null})}>清除参考音色</Button></div>}
      {draft.provider === 'edge' && <label className={css.inlineField}>Edge 音色<select value={draft.edgeVoice} disabled={locked} onChange={event => patch({ edgeVoice: event.target.value })}><option value="zh-CN-XiaoxiaoNeural">晓晓 · 普通话</option><option value="zh-CN-YunxiNeural">云希 · 普通话</option><option value="zh-CN-XiaoyiNeural">晓伊 · 普通话</option><option value="zh-CN-YunjianNeural">云健 · 普通话</option><option value="zh-TW-HsiaoChenNeural">晓臻 · 台湾中文</option><option value="zh-HK-HiuMaanNeural">晓曼 · 香港粤语</option></select></label>}
      <label className={css.inlineField}>朗读音量<MotionRange aria-label="朗读音量滑块" min="0" max="1" step="0.05" value={draft.volume} disabled={locked} onChange={event=>patch({volume:Number(event.target.value)})}/><Input type="number" min="0" max="1" step="0.05" value={draft.volume} disabled={locked} onChange={event => patch({ volume: event.target.value })}/></label>
    </div></details>
    <div className={css.actions}><Button variant="primary" className={css.primary} disabled={locked || !valid || !changed} onClick={() => execute('save-tts', { revision: settings.revision, values: ttsValues({ ...draft, volume: Number(draft.volume) }) })}>{pending ? '处理中…' : '保存朗读设置'}</Button>
      <Button variant="outline" disabled={locked || !settings?.ttsSetup || !valid || !['edge','deepseek','local'].includes(draft.provider)} onClick={() => execute('preview-tts', changed ? {
        revision: settings.revision, values: auditionValues({ ...draft, volume: Number(draft.volume) }, settings.ttsSetup),
      } : undefined)}>{changed ? '试听当前选择' : '试听已保存配置'}</Button>
      <Button variant="outline" disabled={!(runtime?.busy || runtime?.blocked || state.ttsUncertain || state.ttsCancelling || preview?.status === 'preparing' || pendingAction === 'preview-tts')} onClick={() => { void run(sessionId, 'cancel-tts') }}>停止试听</Button></div>
    {preview && <p role="status" className={css.hint}>{({preparing:'试听准备中',cancelling:'正在停止试听',cancelled:'试听已取消',idle:'试听已停止',completed:'试听已结束','text-only':'Edge 暂不可用，回答会显示为文字',failed:'试听失败，正在核查状态',unconfirmed:'无法确认试听停止，请完整重启宿主'})[preview.status] ?? preview.status}{preview.status !== 'text-only' && providerNames[preview.provider] ? ` · ${providerNames[preview.provider]}` : ''}</p>}
    {runtime && <p role="status" className={css.hint}>{runtime.blocked ? '试听尚未停止，请重启宿主。' : `朗读状态：${({ idle:'空闲',preparing:'准备中',synthesizing:'合成中', 'playback-requested':'已请求播放','text-only':'在线朗读暂不可用，已显示文字',completed:'试听已结束',cancelled:'已取消',failed:'失败' })[runtime.state] ?? runtime.state}`}{runtime.localComputeBackend ? ` · 本地计算：${runtime.localComputeBackend.toUpperCase()}${runtime.localComputeVerified ? '（已完成合成）' : '（待验证）'}` : ''}{runtime.localComputeFallback ? ' · 已回退同模型 CPU' : ''}</p>}
    {runtime?.localTimings && <details className={css.details}><summary>已完成朗读片段耗时</summary><p className={css.hint}>准备 {(runtime.localTimings.preparationMs/1000).toFixed(2)} 秒 · 设备选择 {(runtime.localTimings.deviceSelectionMs/1000).toFixed(2)} 秒 · 合成 {(runtime.localTimings.synthesisMs/1000).toFixed(2)} 秒 · 播放 {(runtime.localTimings.playbackMs/1000).toFixed(2)} 秒</p><p className={css.hint}>{runtime.localTimings.chunks} 段 · {runtime.localTimings.modelResident ? '上次片段结束时模型仍驻留，完整合成后播放。准备包含文件校验；合成包含首次加载和服务响应。' : '当前本地模型逐段启动，完整合成后播放。准备包含文件校验；合成包含加载与失败重试。'}耗时不是首音延迟或 GPU 加速比。</p></details>}
  </section>
}

/** Installation history is not the model inventory. Keep every job and path intact. */
export function configuredModelJob(job, settings) {
  if (job.status !== 'installed' || !job.installedPath || !settings) return false
  if (job.purpose === 'tts' || job.recommendedSettings?.tts) return settings.ttsSetup?.provider === 'local' && settings.ttsSetup.localModelId === job.modelId && settings.ttsSetup.localModelPath === job.installedPath
  const wanted = job.recommendedSettings
  if (!wanted || wanted.asr !== settings.modelSetup?.asr) return false
  return Object.entries(wanted.models ?? {}).some(([key,path]) => path === job.installedPath && settings.modelSetup?.models?.[key] === path)
}
export function groupedModelCards(snapshot, settings) {
  return (snapshot?.models ?? []).map(model => {
    const jobs = (snapshot.jobs ?? []).filter(job => job.modelId === model.id)
    const installed = jobs.filter(job => job.status === 'installed').sort((a,b) => String(b.updatedAt ?? b.createdAt ?? '').localeCompare(String(a.updatedAt ?? a.createdAt ?? '')))
    const current = installed.find(job => configuredModelJob(job,settings))
    return {model,jobs,installed,current,preferred:current ?? installed[0],active:jobs.find(job=>['queued','running','paused','failed'].includes(job.status))}
  })
}
const shortModelTitle = model => (model?.title ?? model?.id ?? '').split(' · ')[0]
const computeLabel = value => ({cpu:'CPU',auto:'自动 GPU',cuda:'CUDA / HIP',vulkan:'Vulkan'})[value] ?? value ?? '未知'
const jobTime = value => { const date=new Date(value);return Number.isFinite(date.getTime())?date.toLocaleString():'时间未知' }
export function InstalledModelSwitcher({ state, sessionId, run, purpose }) {
  const [execute,pending] = useCommand(run,sessionId)
  const snapshot=state.installerFor===sessionId?state.installer:null
  const settings=state.settingsFor===sessionId?state.settings:null
  const cards=groupedModelCards(snapshot,settings).filter(card=>(!purpose||card.model.purpose===purpose)&&card.preferred)
  const writable=setupWritable(state,sessionId)&&!pending&&!state.settingsDraftActions?.some(action=>['save-models','save-tts'].includes(action))
  return <section className={css.switcher} aria-label="切换已安装模型" data-no-settings-draft>
    {!snapshot?<p className={css.hint}>正在读取已安装模型。</p>:!cards.length?<p className={css.hint}>尚无可切换的已安装模型，请先在模型下载中安装。</p>:cards.map(({model,preferred,current})=><div key={model.id} className={css.switchRow}>
      <span><strong>{shortModelTitle(model)}</strong><small>{model.purpose==='tts'?'朗读':'识别'} · {computeLabel(preferred.compute)}{current?' · 当前配置':''}</small></span>
      <div className={css.actions}>
        {model.purpose === 'tts' && !current && <Button variant="outline" disabled={!writable || !preferred.installedPath} onClick={() => execute('preview-tts', {
          revision: settings.revision, values: auditionValues({ ...settings.ttsSetup, provider:'local', localModelId:model.id, localModelPath:preferred.installedPath, referenceAudioPath:null }, settings.ttsSetup),
        })}>先试听</Button>}
        <Button variant="outline" disabled={!writable||Boolean(current)} onClick={()=>execute('apply-model-install',{id:preferred.id,revision:settings.revision})}>{current?'当前模型':'验证并切换'}</Button>
      </div>
    </div>)}
    {!!cards.length&&!writable&&<p className={css.hint}>切换模型前需停止语音，已安装文件不会重新下载。</p>}
  </section>
}
function InstallationJob({ job, snapshot, settings, disabled, writable, execute, history = false }) {
  const current=configuredModelJob(job,settings)
  return <article className={css.job} data-model-job={job.id}>
    <div className={css.jobHeading}><strong>{shortModelTitle(snapshot.models.find(item=>item.id===job.modelId))||job.modelId}</strong><small>{computeLabel(job.compute)} · {jobTime(job.createdAt)}</small></div>
    <p role="status">{current?'当前配置 · ':''}{({queued:'等待中',running:'处理中',paused:'已暂停',failed:'失败',cancelled:'已取消',installed:'已安装，字节校验通过','checking-runtime':'检查运行依赖','verifying-local':'校验本机已有模型',downloading:'下载中',verifying:'校验文件',installing:'提交安装'})[job.stage]??job.stage}</p>
    {!history&&Number.isFinite(job.totalBytes)&&job.totalBytes>0&&Number.isFinite(job.receivedBytes)&&<><progress max={job.totalBytes} value={Math.min(job.receivedBytes,job.totalBytes)} aria-label="下载字节进度"/><small>下载 {formatBytes(job.receivedBytes)} / {formatBytes(job.totalBytes)}</small></>}
    {job.error&&<p role="alert">{job.error.message}</p>}{history&&job.installedPath&&<details className={css.installPath}><summary>安装位置</summary><p>{job.installedPath}</p></details>}
    <div className={css.actions}>{['queued','running'].includes(job.status)&&<Button variant="outline" disabled={disabled} onClick={()=>execute('control-model-install',{id:job.id,operation:'pause'})}>暂停，保留进度</Button>}{['paused','failed'].includes(job.status)&&<Button variant="outline" disabled={disabled} onClick={()=>execute('control-model-install',{id:job.id,operation:'resume'})}>恢复同一来源下载</Button>}{['queued','running','paused','failed'].includes(job.status)&&<Button variant="outline" disabled={disabled} onClick={()=>execute('control-model-install',{id:job.id,operation:'cancel'})}>取消并清除此任务临时文件</Button>}{job.status==='installed'&&!current&&<Button variant="outline" disabled={!writable} onClick={()=>execute('apply-model-install',{id:job.id,revision:settings.revision})}>验证并切换</Button>}</div>
    {job.status==='installed'&&<small>切换前停止语音；重新开麦后使用新模型。</small>}
  </article>
}
export function ModelInstallerEditor({ state, sessionId, run }) {
  const [modelId,setModelId]=useState(''),[compute,setCompute]=useState('cpu'),[switching,setSwitching]=useState(false)
  const [execute,pending]=useCommand(run,sessionId)
  const snapshot=state.installerFor===sessionId?state.installer:null
  const settings=state.settingsFor===sessionId?state.settings:null
  const cards=groupedModelCards(snapshot,settings)
  const selected=cards.find(card=>card.model.id===modelId),model=selected?.model
  const plan=state.installPlanFor===sessionId&&state.installPlan?.modelId===modelId&&state.installPlan?.compute===compute&&!state.installPlan?.sourceDirectory?state.installPlan:null
  const disabled=Boolean(state.busy)||state.uncertain||state.installerUncertain||pending
  const writable=!pending&&setupWritable(state,sessionId)&&!state.settingsDraftActions?.some(action=>['save-models','save-tts'].includes(action))
  const backendKey=model?.id==='faster-whisper-small'?'whisper':model?.id==='sensevoice-int8-2024-07-17'?'sensevoice':null
  const gpuAvailable=backendKey==='whisper'&&snapshot?.compute?.backends?.[backendKey]?.cuda?.available===true
  const name=useId(),history=(snapshot?.jobs??[]).filter(job=>['installed','cancelled'].includes(job.status)).slice().reverse()
  const hardware=snapshot?.hardware,observedAt=snapshot?.refresh?.observedAt??snapshot?.compute?.observedAt
  return <section className={`${css.section} ${css.modelInstaller}`} aria-label="模型安装">
    <div className={css.hardwareSummary}><span>内存 {formatBytes(hardware?.totalMemoryBytes)} · 可用 {formatBytes(hardware?.availableMemoryBytes)} · 显存 {formatBytes(hardware?.gpuMemoryBytes)}</span><small>{observedAt?'更新于 '+jobTime(observedAt):'等待检测'} · 每 5 分钟</small></div>
    {(snapshot?.refresh?.error||state.modelComputeError)&&<p className={css.hint} role="status">{snapshot?.refresh?.error??'本次硬件检测未完成'}；保留上次结果。</p>}
    {state.installerError&&<p role="alert" className={css.note}>{state.installerError}</p>}{state.installerUncertain&&<p role="status" className={css.note}>正在核查安装状态。</p>}
    <div className={css.currentModel}><span>识别 <strong>{{'whisper-wasm':'Whisper Base',whisper:'Whisper',sensevoice:'SenseVoice'}[settings?.modelSetup?.asr]??'未配置'}</strong> · 朗读 <strong>{settings?.ttsSetup?.provider==='local'?(settings.ttsSetup.localModelId?.startsWith('qwen3')?'Qwen3-TTS':settings.ttsSetup.localModelId?.startsWith('vits-melo')?'MeloTTS':settings.ttsSetup.localModelId??'本地模型'):({edge:'Edge',deepseek:'DeepSeek',off:'不发声'})[settings?.ttsSetup?.provider]??'未配置'}</strong></span><Button variant="outline" aria-expanded={switching} onClick={()=>setSwitching(value=>!value)}>切换当前模型</Button></div>
    {switching&&<InstalledModelSwitcher state={state} sessionId={sessionId} run={run}/>}
    {!snapshot?<p className={css.note}>正在读取模型列表。</p>:<fieldset className={`${css.choices} ${css.modelChoices}`} disabled={disabled}><legend>选择模型</legend>{cards.map(({model:item,current,preferred,active})=><label key={item.id} className={css.choice} data-selected={modelId===item.id}><input type="radio" name={name} checked={modelId===item.id} onChange={()=>{setModelId(item.id);setCompute(item.computeOptions?.includes('auto')?'auto':'cpu')}}/><span><strong>{shortModelTitle(item)}{item.recommendation?.recommended&&<span className={css.badge}>推荐</span>}</strong><small>{item.purpose==='tts'?'朗读':'识别'} · {formatBytes(item.totalBytes)}</small><small>{current?'当前配置':active?({queued:'等待下载',running:'下载处理中',paused:'下载已暂停',failed:'下载失败'})[active.status]:preferred?'已安装，可切换':item.available?'可准备安装':'暂不可安装'}</small>{!item.available&&<small>{item.reason??item.recommendation?.reason}</small>}</span></label>)}</fieldset>}
    {model&&<div className={css.selectedModel}><label className={css.inlineField}>推理设备<select value={compute} disabled={disabled} onChange={event=>setCompute(event.target.value)}>{(model.computeOptions??['cpu']).map(value=><option key={value} value={value}>{computeLabel(value)}{value==='cpu'?'':' · CPU 兜底'}</option>)}</select></label><div className={css.actions}>{selected.preferred&&<Button variant="outline" disabled={!writable||Boolean(selected.current)} onClick={()=>execute('apply-model-install',{id:selected.preferred.id,revision:settings.revision})}>{selected.current?'当前模型':'验证并切换'}</Button>}<Button variant="outline" disabled={disabled||!model.available} onClick={()=>execute('plan-model-install',{modelId,compute})}>{selected.preferred?'查看其他安装方案':'查看安装计划'}</Button></div><details className={css.details}><summary>推荐依据与设备说明</summary><p className={css.hint}>{model.recommendation?.reason??'推荐依据未知，可手动选择。'}</p><p className={css.hint}>{model.purpose==='tts'?(compute==='cpu'?'仅准备 CPU 运行时。':'准备固定 Vulkan 与 CPU 组件，实际可用性仍需本机合成验证。'):backendKey==='sensevoice'?'此 SenseVoice INT8 组合目前使用 CPU。':gpuAvailable?'已检测到 CTranslate2 GPU；模型加载及显存仍待验证。':'未证实 GPU 可用，自动模式使用同模型 CPU。'}</p></details></div>}
    {plan && <MenuSurface className={css.plan} aria-label="模型安装计划"><h4>模型安装</h4><dl><dt>模型</dt><dd>{model?.title ?? plan.modelId}</dd><dt>来源</dt><dd>{plan.source}</dd><dt>下载大小</dt><dd>{formatBytes(plan.totalBytes)}</dd><dt>保存位置</dt><dd>{plan.destination}</dd><dt>推理设备</dt><dd>{plan.compute}</dd></dl><p>{plan.licenseNote ?? '请阅读下列模型许可。'}</p>{plan.licenseUrls?.map(url => <a key={url} href={url} target="_blank" rel="noreferrer">{url}</a>)}<p className={css.hint}>{plan.notice}</p><details className={css.details}><summary>文件和校验详情</summary><ul>{plan.files?.map(file => <li key={file.name}>{file.name} · {formatBytes(file.bytes)}<small>SHA-256: {file.sha256}</small><small>{file.url}</small></li>)}</ul></details><Button variant="primary" className={css.primary} disabled={disabled || !model?.available || !plan.planHash} onClick={() => execute('start-model-install', { modelId: plan.modelId, compute: plan.compute, planHash: plan.planHash, accepted: true })}>开始下载</Button></MenuSurface>}
    <div className={css.jobs}>{(snapshot?.jobs??[]).filter(job=>!['installed','cancelled'].includes(job.status)).map(job=><InstallationJob key={job.id} job={job} snapshot={snapshot} settings={settings} disabled={disabled} writable={writable} execute={execute}/>)}</div>
    {!!history.length&&<details className={css.installHistory}><summary>安装记录（{history.length}）<small>时间 · 设备 · 位置</small></summary><div className={css.jobs}>{history.map(job=><InstallationJob key={job.id} job={job} snapshot={snapshot} settings={settings} disabled={disabled} writable={writable} execute={execute} history/>)}</div></details>}
    <p className={css.hint}>模型下载可在后台继续。检测静默进行，进入本页立即刷新。</p>
  </section>
}

export function LocalTtsDownload({ state, sessionId, run, active = true, pickPath, initialModelId = null, initialReuse = false, reuseOnly = false, onboarding = false }) {
  const [execute,pending,,admission]=useCommand(run,sessionId)
  const [choice,setChoice] = useState(initialModelId),[computeChoice,setComputeChoice]=useState(null)
  const [reuse,setReuse]=useState(initialReuse),[sourceDirectory,setSourceDirectory]=useState(''),[modelVariant,setModelVariant]=useState('q8_0')
  const snapshot=state.installerFor===sessionId?state.installer:null
  const localModels=snapshot?.models?.filter(model=>model.purpose==='tts'||['qwen3-tts-base-1.7b-gguf','vits-melo-tts-zh_en-int8'].includes(model.id))??[]
  const recommended=localModels.find(model=>model.recommendation?.recommended&&model.available)
  const modelId=choice??recommended?.id??localModels.find(model=>model.available)?.id??localModels[0]?.id
  const model=localModels.find(model=>model.id===modelId)
  const compute=computeChoice??(model?.computeOptions?.includes('auto')?'auto':'cpu')
  const reuseActive=reuse&&modelId==='qwen3-tts-base-1.7b-gguf'
  const reuseOptions=reuseActive?{sourceDirectory,modelVariant}:{}
  const plan=state.installPlanFor===sessionId&&state.installPlan?.modelId===modelId&&state.installPlan?.compute===compute&&(reuseActive?state.installPlan?.reused===true&&(state.installPlanRequest?.sourceDirectory??state.installPlan?.sourceDirectory)===sourceDirectory&&state.installPlan?.modelVariant===modelVariant:!state.installPlan?.sourceDirectory)?state.installPlan:null
  const job=[...(snapshot?.jobs??[])].reverse().find(item=>item.modelId===modelId&&item.status!=='cancelled')
  const installIntent=snapshot?.ttsInstallIntent
  const intent=installIntent&&job&&installIntent.modelId===modelId&&installIntent.jobId===job.id?installIntent:null
  const installationPending=['waiting','verifying'].includes(installIntent?.status)
  const configured=state.settingsFor===sessionId&&state.settings?.ttsSetup?.provider==='local'&&state.settings.ttsSetup.localModelId===modelId&&job?.status==='installed'&&Boolean(job.installedPath)&&state.settings.ttsSetup.localModelPath===job.installedPath
  const inspected=useRef(undefined),planned=useRef(null)
  useEffect(()=>{if(!active||snapshot||state.busy||pending||admission.isLocked()||inspected.current===sessionId)return;inspected.current=sessionId;void execute('model-installer')},[active,sessionId,Boolean(snapshot),state.busy,pending,admission.settled])
  useEffect(()=>{const key=sessionId+':'+modelId+':'+compute;if(reuseActive||!active||!model?.available||state.busy||pending||admission.isLocked()||plan||planned.current===key)return;planned.current=key;void execute('plan-model-install',{modelId,compute})},[active,sessionId,modelId,compute,model?.available,state.busy,pending,Boolean(plan),reuseActive,admission.settled])
  const locked=pending||state.busy||state.installerUncertain
  return <section className={css.section} aria-label="下载本地语音模型" data-no-settings-draft>
    {!snapshot?<><p className={css.hint}>正在读取可安装模型…</p></>:<>
    {!reuseOnly&&<label className={css.inlineField}>语音模型<select aria-label="语音模型" value={modelId??''} disabled={locked||intent?.status==='verifying'} onChange={event=>{setChoice(event.target.value);setComputeChoice(null)}}>{localModels.map(item=><option key={item.id} value={item.id}>{item.title??item.id}{item.recommendation?.recommended?' · 推荐':''}{item.available?'':' · 暂不可用'}</option>)}</select></label>}
    {!onboarding&&<><p className={css.hint}>{model?.recommendation?.reason}</p><label className={css.inlineField}>本地计算<select aria-label="本地计算" value={compute} disabled={locked||installationPending} onChange={event=>setComputeChoice(event.target.value)}>{(model?.computeOptions??['cpu']).map(value=><option key={value} value={value}>{({cpu:'CPU',auto:'自动 GPU · CPU 兜底',vulkan:'Vulkan · CPU 兜底'})[value]}</option>)}</select></label></>}
    {!model?.available&&<p role="status" className={css.note}>{model?.reason??'此设备暂没有兼容的安装包。可选择其他支持的模型，或先使用文字。'}</p>}
    {plan&&<div className={css.plan}><strong>下载 {formatBytes(plan.totalBytes)} · {plan.compute.toUpperCase()}</strong>{plan.reused&&<p>复用模型 {formatBytes(plan.reusedBytes)} · {plan.modelVariant}</p>}<details className={css.details}><summary>来源、许可与保存位置</summary><p>{plan.source}</p>{plan.runtime&&<p>{plan.runtime.source}</p>}<p>{plan.notice}</p><p>{plan.verification}</p><p>{plan.licenseNote}</p>{plan.licenseUrls?.map(url=><a key={url} href={url} target="_blank" rel="noreferrer">{url}</a>)}<p>{plan.destination}</p></details></div>}
    <div className={css.actions}>
      {(!job||(reuseActive||job.compute!==compute)&&job.status==='installed'&&!installationPending)&&<Button variant="primary" className={css.primary} disabled={locked||!setupWritable(state,sessionId)||!model?.available||!plan} onClick={()=>execute('start-model-install',{modelId,compute,planHash:plan.planHash,accepted:true,useWhenReady:true,...(plan.reused?{sourceDirectory:plan.sourceDirectory,modelVariant:plan.modelVariant}:{})})}>{reuseActive?'验证并使用':'下载并使用'}</Button>}
      {modelId==='qwen3-tts-base-1.7b-gguf'&&!reuseOnly&&<Button variant="outline" aria-expanded={reuseActive} disabled={locked||installationPending} onClick={()=>setReuse(value=>!value)}>使用本机已有文件</Button>}
    </div>
    {reuseActive&&<div className={css.section}><PathField className={css.field} label="插件所在机器的模型目录" kind="sourceDirectory" value={sourceDirectory} disabled={locked} active={active} scope={modelId+':'+modelVariant} pickPath={pickPath} sessionId={sessionId} onChange={setSourceDirectory}/><label className={css.inlineField}>已有模型量化版本<select aria-label="已有模型量化版本" value={modelVariant} disabled={locked} onChange={event=>setModelVariant(event.target.value)}><option value="q8_0">Q8_0</option><option value="q4_k_m">Q4_K_M</option></select></label><Button variant="outline" disabled={locked||!sourceDirectory.trim()||!model?.available} onClick={()=>execute('plan-model-install',{modelId,compute,...reuseOptions})}>检查复用计划</Button></div>}
    {reuseActive&&job&&['failed','paused'].includes(job.status)&&<p className={css.note}>已有未完成的安装任务。可继续重试；如需更换目录或量化版本，请先取消该任务，再检查新的复用计划。</p>}
    {!reuseActive&&model?.available&&!plan&&!job&&<Button variant="outline" disabled={locked} onClick={()=>execute('plan-model-install',{modelId,compute})}>重新读取安装计划</Button>}
    {job&&<div className={css.job}><p role="status">{intent?.status==='verifying'?'正在验证合成，首次可能需要几分钟':intent?.status==='applied'&&configured?'合成验证通过，已设为朗读来源':intent?.status==='blocked'?'需要处理后再继续':({queued:'等待下载',running:job.stage==='verifying-local'?'校验本机已有模型':'下载处理中',paused:'已暂停',failed:'下载失败',installed:'文件已校验，尚未确认合成'})[job.status]??job.status}</p>{job.totalBytes>0&&<><progress aria-label="语音模型下载进度" max={job.totalBytes} value={Math.min(job.receivedBytes,job.totalBytes)}/><small>{formatBytes(job.receivedBytes)} / {formatBytes(job.totalBytes)}</small></>}{job.error&&<p role="alert">{job.error.message}</p>}{intent?.reason&&<p className={css.note}>{intentReason(intent.reason)}</p>}<div className={css.actions}>{intent?.status==='verifying'&&<Button variant="outline" disabled={locked} onClick={()=>execute('control-model-install',{id:job.id,operation:'pause'})}>停止验证</Button>}{['queued','running'].includes(job.status)&&<Button variant="outline" disabled={locked} onClick={()=>execute('control-model-install',{id:job.id,operation:'pause'})}>暂停</Button>}{(['paused','failed'].includes(job.status)||intent?.status==='blocked'||intent?.status==='paused')&&<Button variant="outline" disabled={locked} onClick={()=>execute('control-model-install',{id:job.id,operation:'resume'})}>继续下载并使用</Button>}{['queued','running','paused','failed'].includes(job.status)&&<Button variant="outline" disabled={locked} onClick={()=>execute('control-model-install',{id:job.id,operation:'cancel'})}>取消下载</Button>}{job.status==='installed'&&!configured&&(!intent||['applied','cancelled'].includes(intent.status))&&<Button variant="outline" disabled={locked||installationPending||!setupWritable(state,sessionId)} onClick={()=>execute('apply-model-install',{id:job.id,revision:state.settings.revision})}>验证并使用</Button>}</div></div>}
    {configured&&<p className={css.hint}>本地模型已保存，可试听。</p>}
    </>}{state.installerError&&<p role="alert" className={css.note}>{state.installerError}</p>}{state.installerUncertain&&<p role="status">正在核查下载状态。</p>}
  </section>
}

export function LocalTtsPaths({ state, sessionId, run, pickPath, active }) {
  const settings=state.settingsFor===sessionId?state.settings:null
  const snapshot=state.installerFor===sessionId?state.installer:null
  const path=settings?.ttsSetup?.localModelPath
  const [execute,pending]=useCommand(run,sessionId)
  const [selected,setSelected]=useState(''),[reuseOpen,setReuseOpen]=useState(false)
  const installed=(snapshot?.jobs??[]).filter(job=>job.status==='installed'&&(job.purpose==='tts'||job.recommendedSettings?.tts))
  const job=installed.find(item=>item.id===selected)
  return <section className={css.section} aria-label="朗读模型本地路径" data-no-settings-draft><h3>朗读模型本地路径</h3>
    <p className={css.hint}>{path?path:'尚未配置本地朗读模型路径。'}</p>
    {!!installed.length&&<><label className={css.inlineField}>已安装目录<select value={selected} onChange={event=>setSelected(event.target.value)}><option value="">选择已校验的安装目录</option>{installed.map(item=><option key={item.id} value={item.id}>{shortModelTitle(snapshot.models.find(model=>model.id===item.modelId))} · {computeLabel(item.compute)} · {jobTime(item.createdAt)}</option>)}</select></label>{job&&<><p className={css.hint}>{job.installedPath}</p><Button variant="outline" disabled={pending||!setupWritable(state,sessionId)||configuredModelJob(job,settings)} onClick={()=>execute('apply-model-install',{id:job.id,revision:settings.revision})}>验证并使用所选路径</Button></>}</>}
    <details className={css.details} onToggle={event=>setReuseOpen(event.currentTarget.open)}><summary>复用本机 Qwen 模型文件</summary><p className={css.hint}>选择已有模型目录后校验文件；校验通过后安装运行组件。</p>{reuseOpen&&<LocalTtsDownload state={state} sessionId={sessionId} run={run} active={active} pickPath={pickPath} initialModelId="qwen3-tts-base-1.7b-gguf" initialReuse reuseOnly/>}</details>
  </section>
}

export function SetupWizard({ state, sessionId, run, onDismiss, onMinimize, onBackToAuthorization, asrStatus, pickPath }) {
  const [execute, pending] = useCommand(run, sessionId)
  const [step,setStep] = useState(0)
  const wizard=useRef(null),stepScope=useRef(0)
  const checkedDeepSeekKey = useRef(null)
  // A completed write still updates shared state, but its old screen cannot
  // navigate or advance after leaving, remounting, or changing source session.
  useLayoutEffect(()=>()=>{stepScope.current++},[sessionId])
  const leave=callback=>{stepScope.current++;return callback?.()}
  useLayoutEffect(()=>{const viewport=wizard.current?.closest('[data-whale-content]');if(viewport)viewport.scrollTop=0;const body=wizard.current?.querySelector('[data-wizard-body]');if(body)body.scrollTop=0},[step])
  const settings = state.settingsFor === sessionId ? state.settings : null
  const [mode,setMode] = useState(null)
  const [provider,setProvider] = useState(null)
  const selectedMode=mode??settings?.listenMode??'ptt'
  const savedProvider=settings?.ttsSetup?.provider
  const selectedProvider=provider??(savedProvider!=='unconfigured'?savedProvider:null)??'edge'
  const enablingEdge=selectedProvider==='edge'&&savedProvider!=='edge'
  const capabilities = state.ttsCapabilitiesFor === sessionId ? state.ttsCapabilities : null
  const deepseekKeyKnown = typeof capabilities?.deepseekKeyAvailable === 'boolean'
  const deepseekKeyAvailable = capabilities?.deepseekKeyAvailable === true
  const deepseekCheckKey = `${sessionId ?? 'owner'}:${settings?.revision ?? 'unread'}`
  const [deepseekDraft,setDeepseekVoice]=useState(null)
  const deepseekVoice = deepseekDraft ?? settings?.ttsSetup?.deepseekVoice ?? 'stella'
  const deepseekCheckFailed = !deepseekKeyKnown && !pending && checkedDeepSeekKey.current === deepseekCheckKey && Boolean(state.error)
  const checkDeepSeekKey = () => {
    if(pending)return
    checkedDeepSeekKey.current=deepseekCheckKey
    void execute('inspect-tts')
  }
  useEffect(() => {
    if(step!==1||selectedProvider!=='deepseek'||deepseekKeyKnown||pending||checkedDeepSeekKey.current===deepseekCheckKey)return
    checkDeepSeekKey()
  },[step,selectedProvider,deepseekKeyKnown,deepseekCheckKey,pending])
  const enablingDeepSeek=selectedProvider==='deepseek'&&savedProvider!=='deepseek'
  const locked=pending||!setupWritable(state,sessionId)
  const localConfigured=settings?.ttsSetup?.provider==='local'&&Boolean(settings.ttsSetup.localModelId)
  const next=async()=>{
    const intent=stepScope.current,current=()=>stepScope.current===intent
    if(step===0){if(await execute('listen-mode',{mode:selectedMode})===true&&current())setStep(1)}
    else if(step===1){
      if(selectedProvider==='deepseek'&&!deepseekKeyAvailable)return
      const voiceChanged = selectedProvider==='deepseek'&&deepseekVoice!==(settings.ttsSetup.deepseekVoice??'stella')
      if(provider===null&&settings.ttsSetup.provider!=='unconfigured'&&!voiceChanged||selectedProvider==='local'&&localConfigured){setStep(2);return}
      const values=ttsValues({...initialTts,...settings.ttsSetup,provider:selectedProvider})
      if(selectedProvider==='edge')values.edgeTextTransmissionAccepted=true
      if(selectedProvider==='deepseek'){values.deepseekTextTransmissionAccepted=true;values.deepseekVoice=deepseekVoice}
      if(await execute('save-tts',{revision:settings.revision,values})===true&&current())setStep(2)
    }else if(await execute('complete-setup',{revision:settings.revision})===true&&current())onDismiss?.()
  }
  return <MenuSurface ref={wizard} className={css.wizard} role="region" aria-label="鱼应首次配置" data-whale-intrinsic>
    <header className={css.header}><div><h2>开始使用鱼应</h2><p className={css.hint}>第 {step+1} / 3 步 · 其余设置随时再调</p></div><Button onClick={onMinimize}>稍后</Button></header>
    <div className={css.wizardBody} data-wizard-body data-no-drag><div className={css.wizardBodyContent} data-whale-natural-content><Gate state={state} sessionId={sessionId} run={run}/>
    {step===0&&<section className={css.section}><h3>怎么说话？</h3><fieldset className={css.choices} disabled={locked}>{[['ptt','按住说话','按下快捷键时收音'],['always','自由麦','开麦后直接听取有效语音'],['wake','唤醒词','先叫设定称呼，再说指令']].map(([value,label,hint])=><label key={value} className={css.choice} data-selected={selectedMode===value}><input type="radio" name="setup-listen" checked={selectedMode===value} onChange={()=>setMode(value)}/><span><strong>{label}</strong><small>{hint}</small></span></label>)}</fieldset></section>}
    {step===1&&<section className={css.section}><h3>怎么听回答？</h3><fieldset className={css.choices} disabled={locked}>{settingsSpeechSources.map(([value,label,hint])=><label key={value} className={css.choice} data-selected={selectedProvider===value}><input type="radio" name="setup-provider" checked={selectedProvider===value} onChange={()=>{setProvider(value);if(value==='deepseek')checkDeepSeekKey()}}/><span><strong>{label}</strong><small>{hint}</small></span></label>)}</fieldset>
    {selectedProvider==='edge'&&<p className={css.note}>启用后，朗读文字会发送给微软。联网失败时，回答会显示为文字。</p>}
    {selectedProvider==='deepseek'&&<div className={css.note} data-whale-deepseek-setup>
      <p>确认继续后，朗读文字会发送给 DeepSeek。密钥由 DSH 管理，鱼应不会保存密钥。</p>
      {!deepseekKeyKnown&&!deepseekCheckFailed&&<p role="status">正在检查 DSH 中保存的 DeepSeek API Key…</p>}
      {deepseekKeyKnown&&!deepseekKeyAvailable&&<p role="status">尚未在 DSH 的 DeepSeek API Key 提供商中配置开放平台密钥。</p>}
      {deepseekCheckFailed&&<p role="status">暂时无法检查 DeepSeek API Key。</p>}
      {(deepseekCheckFailed||deepseekKeyKnown&&!deepseekKeyAvailable)&&<Button variant="outline" disabled={locked} onClick={checkDeepSeekKey}>重新检查 DeepSeek API Key</Button>}
      <label className={css.inlineField}>DeepSeek 音色<select aria-label="DeepSeek 音色" value={deepseekVoice} disabled={locked} onChange={event=>setDeepseekVoice(event.target.value)}><option value="stella">海星 · 女声</option><option value="tide">暗潮 · 男声</option></select></label>
    </div>}
    {selectedProvider==='local'&&<LocalTtsDownload pickPath={pickPath} state={state} sessionId={sessionId} run={run} initialModelId={localConfigured ? settings.ttsSetup.localModelId : null} onboarding/>}
    </section>}
    {step===2&&<section className={css.section}><h3>准备语音识别</h3><p>说话方式和朗读配置已保存。</p>{settings?.modelSetup?.asr==='whisper-wasm'&&asrStatus}
    </section>}
    {(state.error||state.setupError)&&<p role="alert" className={css.note}>暂时未能完成，正在核查设置。</p>}
    </div></div><footer className={css.actions}><Button variant="outline" disabled={pending} onClick={()=>step>0?setStep(step-1):leave(onBackToAuthorization)}>上一步</Button>
      <Button variant="primary" className={css.primary} disabled={locked||!settings||step===1&&selectedProvider==='local'&&!localConfigured||step===1&&selectedProvider==='deepseek'&&!deepseekKeyAvailable} onClick={()=>void next()}>{pending?'保存中…':step===2?'完成':step===1&&enablingEdge?'启用在线朗读并继续':step===1&&enablingDeepSeek?'启用 DeepSeek 语音合成并继续':'下一步'}</Button></footer>
  </MenuSurface>
}
