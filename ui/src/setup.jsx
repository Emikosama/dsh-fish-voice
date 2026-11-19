import { MotionRange, MotionToggle } from './motion.jsx'
import { PathField } from './path-field.jsx'
import { useId, useRef, useState, useLayoutEffect, useEffect } from 'react'
import { Button, Input, Checkbox, MenuSurface } from '@deepseek-ai/dsh-client-ui-primitives'
import css from './setup.module.css'

const speechSources = [
  ['deepseek', 'DeepSeek 语音合成', '官方 API · 默认音色海星'],
  ['local', '本地语音模型', '在本机合成，首次需要下载'],
  ['custom', '自定义 TTS', '兼容 OpenAI 音频接口的语音服务'],
  ['off', '不发声', '只显示文字'],
]
const providerNames = { deepseek:'DeepSeek 语音合成', local:'本地语音模型', custom:'自定义 TTS' }
const initialTts = { provider:'deepseek', deepseekVoice:'stella', deepseekTextTransmissionAccepted:false, volume:.8, localModelId:null, localModelPath:null, referenceAudioPath:null }
const initialCustomTts = { baseUrl:'', model:'', voice:'', apiKeyEnv:null, format:'wav', textTransmissionAccepted:false }
const deepseekKeyHelp = '请在 DSH 的 DeepSeek API Key 提供商中配置开放平台密钥，再重新检查。'
const deepseekDisclosure = '朗读和试听会向 DeepSeek 发送待朗读的文字，按字符用量计费。'
export const hasDeepSeekPermission = state => state.authorization?.scopes?.some(scope=>scope.id==='deepseek-text'&&scope.allowed) === true
export const hasCustomTtsPermission = state => state.authorization?.scopes?.some(scope=>scope.id==='custom-tts-text'&&scope.allowed) === true
const ttsValues = values => { const result={...values}; delete result.referenceAudioAccepted; return result }
const auditionValues = (values, saved) => {
  const result = ttsValues(values)
  delete result.customTts
  return { ...result, referenceAudioAccepted: values.referenceAudioPath === saved?.referenceAudioPath && saved?.referenceAudioAccepted === true }
}
export const setupStyles = css.text
const intentReason = reason => ({'restart-requires-resume':'宿主已重启，请继续后重新核验，不会自动覆盖设置。','authorization-changed':'授权已改变，请在权限中核查后继续。','MODEL_SOURCE_AUTHORIZATION_REQUIRED':'模型来源授权已变化，请补充一次授权后继续。','HUMAN_SETTING_PINNED':'设置权限已撤销，请在权限中核查后继续。'})[reason] ?? (typeof reason==='string'&&/^[A-Z_:-]+$/.test(reason)?'运行检查未通过，请检查依赖或查看高级设置中的错误。':reason)
export const formatBytes = value => Number.isFinite(value) && value >= 0 ? `${(value / 1024 ** 2).toFixed(1)} MiB` : '未知'
const voiceRecoveries = {
  'live-root-conflict': { kind:'conflict', label:'voiceRecoveryPending', hint:'voiceRecoveryHint' },
  'predecessor-cleanup-pending': { kind:'cleanup', label:'voiceCleanupPending', hint:'voiceCleanupHint' },
  'helper-cleanup-pending': { kind:'cleanup', label:'voiceCleanupPending', hint:'voiceHelperCleanupHint' },
  'predecessor-stop-unconfirmed': { kind:'restart', label:'voiceRestartPending', hint:'voiceRestartHint' },
  'helper-stop-unconfirmed': { kind:'restart', label:'voiceRestartPending', hint:'voiceHelperRestartHint' },
  'root-stop-unconfirmed': { kind:'restart', label:'voiceRestartPending', hint:'voiceRootRestartHint' },
}
export function getVoiceRecovery(state, sessionId) {
  if (state.checkedFor !== sessionId) return null
  return voiceRecoveries[state.status?.voiceSession?.recovery?.kind] ?? null
}
export const canRequestVoiceStop = state =>
  !state.ttsCancelling && !state.voiceStopUnconfirmed && (!state.busy || Boolean(state.interruptibleRead && !state.diagnosticStopPending))
export function voiceStopped(state, sessionId) {
  const status = state.checkedFor === sessionId ? state.status : null
  return !state.uncertain && status?.enabled === false && status.ownerSessionId === null && status.voiceControlBusy === false
    && status.voiceSession?.fullyStopped === true && status.voiceSession.id === null && !getVoiceRecovery(state, sessionId)
}
function setupReady(state, sessionId) {
  return Boolean(voiceStopped(state, sessionId) && state.settingsFor === sessionId && state.settings?.revision
    && !state.ttsCancelling && !state.ttsUncertain && !state.visibilityUncertain && !state.settingsConflict
    && !state.status.ttsRuntime?.busy && !state.status.ttsRuntime?.blocked)
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
export function VoiceSettingsGate({ state, sessionId, run, refresh, canStopTts = true, t = key => key }) {
  if (setupReady(state, sessionId)) return null
  const status = state.checkedFor === sessionId ? state.status : null
  const recovery = getVoiceRecovery(state, sessionId)
  const settingsKnown = state.settingsFor === sessionId && state.settings?.revision
  let message, label, action
  if (state.voiceStopUnconfirmed) {
    message = '停止结果尚待确认。'
    label = t('retryStatus')
    action = 'status'
  } else if (recovery) {
    message = t(recovery.hint)
    if (recovery.kind === 'conflict') { label = t('voiceRecoveryCheck'); action = 'disable' }
    if (recovery.kind === 'cleanup') { label = t('retryStatus'); action = 'status' }
  } else if (status?.enabled || status?.ownerSessionId) {
    message = '请先停止语音，再编辑或试听。'
    label = '停止语音以编辑'
    action = 'disable'
  } else if (state.settingsConflict) {
    message = '设置已在别处更新。请先处理当前草稿。'
  } else if (state.ttsCancelling || state.busy && (!status || !settingsKnown)) {
    message = '正在读取、保存或停止语音，请稍候…'
  } else if (status?.ttsRuntime?.blocked) {
    message = '朗读停止尚未确认。请完整重启 DSH。'
  } else if (status?.ttsRuntime?.busy) {
    message = '朗读正在进行，结束后可编辑。'
    if (canStopTts) { label = '停止试听'; action = 'cancel-tts' }
  } else if (state.ttsUncertain || state.uncertain || state.visibilityUncertain) {
    message = '上次操作的状态尚待核查。'
    label = t('retryStatus')
    action = state.visibilityUncertain || !status ? 'read-settings' : 'status'
  } else if (!status || !settingsKnown) {
    message = state.sourcePending && !state.error ? '正在读取语音状态和设置…' : '暂时无法读取语音状态或设置。'
    label = '重新读取'
    action = !settingsKnown ? 'read-settings' : 'status'
  } else {
    message = '语音尚未确认停止。请重新读取状态后编辑。'
    label = t('retryStatus')
    action = 'status'
  }
  // Disabling or cancelling is an explicit action; readback never repeats it.
  const retry = () => {
    if (action === 'read-settings' && refresh) void refresh({ settings:true, force:true })
    else void run?.(sessionId, action)
  }
  return <div className={css.note} role="status" data-whale-settings-gate={recovery?.kind ?? action ?? 'notice'}>
    <p>{message}</p>
    {action && run && <Button variant="outline" data-whale-operation={action === 'disable' ? 'stop-voice' : undefined} disabled={action === 'disable' ? !canRequestVoiceStop(state) : action !== 'cancel-tts' && state.busy} onClick={retry}>{label}</Button>}
  </div>
}
export function TtsSetupEditor(props) {
  const settings = props.state.settingsFor === props.sessionId ? props.state.settings : null
  return <TtsForm key={`${props.sessionId}:${props.state.settingsKey ?? settings?.revision ?? 'unread'}`} {...props} settings={settings}/>
}
function DeepSeekVoiceField({ value, disabled, onChange }) {
  return <label className={css.inlineField}>DeepSeek 音色<select aria-label="DeepSeek 音色" value={value} disabled={disabled} onChange={event=>onChange(event.target.value)}>
    <option value="stella">海星 · 女声</option><option value="tide">暗潮 · 男声</option>
  </select></label>
}
function customTtsFieldError({ baseUrl, model, voice, apiKeyEnv }) {
  const controls = /[\x00-\x1f\x7f-\x9f]/
  if (!baseUrl.trim() || !model.trim() || !voice.trim()) return '请填写服务地址、模型和音色。'
  const base = baseUrl.trim()
  const authority = /^https?:\/\/([^/]+)/i.exec(base)?.[1]
  let parsed
  try { parsed = new URL(base) } catch {}
  if (!parsed || !authority || /[\s\\?#]/.test(base) || authority.includes('@') || controls.test(baseUrl)
    || (parsed.protocol === 'http:' && !/^(?:localhost|127\.0\.0\.1|\[::1\])(?::[0-9]+)?$/i.test(authority))) {
    return '请使用 HTTPS 地址。本机的 localhost、127.0.0.1 和 [::1] 也可使用 HTTP。地址不能包含账号、密码、查询参数或片段。'
  }
  if (controls.test(model) || controls.test(voice)) return '模型和音色不能包含控制字符。'
  if (apiKeyEnv?.trim() && !/^[A-Za-z_][A-Za-z0-9_]*$/.test(apiKeyEnv.trim())) return 'API Key 环境变量名只能包含英文字母、数字和下划线，且不能以数字开头。'
  return null
}
function CustomTtsFields({ value, disabled, fieldError, onChange, onConsent }) {
  return <div className={css.section} data-custom-tts>
    <label className={css.field}>服务地址（Base URL）
      <Input value={value.baseUrl} disabled={disabled} maxLength={2048} inputMode="url" autoComplete="off" spellCheck={false} placeholder="https://tts.example.com/v1" onChange={event=>onChange('baseUrl',event.target.value)}/>
      <small>可填写基础地址或以 /audio/speech 结尾的完整接口地址。</small>
    </label>
    <label className={css.field}>模型
      <Input value={value.model} disabled={disabled} maxLength={256} autoComplete="off" spellCheck={false} onChange={event=>onChange('model',event.target.value)}/>
    </label>
    <label className={css.field}>音色
      <Input value={value.voice} disabled={disabled} maxLength={256} autoComplete="off" spellCheck={false} onChange={event=>onChange('voice',event.target.value)}/>
    </label>
    <label className={css.field}>API Key 环境变量名（可选）
      <Input value={value.apiKeyEnv ?? ''} disabled={disabled} maxLength={128} autoComplete="off" spellCheck={false} placeholder="MY_TTS_API_KEY" onChange={event=>onChange('apiKeyEnv',event.target.value)}/>
      <small>在运行 DSH 的环境中设置密钥，这里只填变量名。服务无需密钥时可留空。</small>
    </label>
    <label className={css.inlineField}>音频格式<select value={value.format} disabled={disabled} onChange={event=>onChange('format',event.target.value)}>
      <option value="wav">WAV</option><option value="mp3">MP3</option>
    </select></label>
    <p className={css.hint}>朗读会向服务发送回答中待朗读的文字。保存设置后可发送固定示例试听。</p>
    <label className={css.inlineField}><input type="checkbox" checked={value.textTransmissionAccepted} disabled={disabled} onChange={event=>onConsent(event.target.checked)}/>同意发送待朗读的文字</label>
    {fieldError && <p className={css.hint} role="status">{fieldError}</p>}
  </div>
}
function TtsForm({ state, sessionId, run, settings, prepared = false, active = true, markSettingsEdited, pickPath }) {
  const [draft, setDraft] = useState(() => ({ ...initialTts, ...settings?.ttsSetup }))
  const [customConsentDraft, setCustomConsentDraft] = useState(null)
  const [execute, pending, pendingAction] = useCommand(run, sessionId)
  const name = useId()
  const [chooseLocal,setChooseLocal] = useState(false)
  const capabilities = state.ttsCapabilitiesFor === sessionId ? state.ttsCapabilities : null
  const runtime = state.checkedFor === sessionId ? state.status?.ttsRuntime : null
  const preview = state.ttsPreviewFor === sessionId ? state.ttsPreview : null
  const currentLocalJob = state.installerFor === sessionId ? state.installer?.jobs?.find(job=>configuredModelJob(job,settings)) : null
  const locked = !setupWritable(state, sessionId) || pending
  const usesDeepSeek = draft.provider === 'deepseek'
  const usesCustom = draft.provider === 'custom'
  const savedTts = { ...initialTts, ...settings?.ttsSetup }
  const { customTts, ...commonDraft } = draft
  const customForSave = usesCustom ? customTts : savedTts.customTts
  const settingsDraft = customForSave ? { ...commonDraft, customTts:customForSave } : commonDraft
  const changed = Object.entries(settingsDraft).some(([key,value])=>JSON.stringify(value)!==JSON.stringify(savedTts[key]))
  const custom = customTts ?? initialCustomTts
  const customError = usesCustom ? customTtsFieldError(custom) : null
  const customPermission = hasCustomTtsPermission(state)
  const customPermissionLoading = usesCustom && (state.authorizationUncertain || savedTts.customTts?.textTransmissionAccepted && !state.authorization)
  const needsCustomConsent = usesCustom && !customPermission
  const requestedConsent = customConsentDraft?.revision === state.authorization?.revision ? customConsentDraft?.accepted : undefined
  const customConsentChecked = requestedConsent ?? (custom.textTransmissionAccepted && customPermission)
  const deepseekPermissionLoading = usesDeepSeek && (state.authorizationUncertain || draft.deepseekTextTransmissionAccepted && !state.authorization)
  const needsDeepSeekConsent = usesDeepSeek && !deepseekPermissionLoading && !(draft.deepseekTextTransmissionAccepted && hasDeepSeekPermission(state))
  const noDeepSeekKey = usesDeepSeek && capabilities?.deepseekKeyAvailable !== true
  const patch = value => { markSettingsEdited?.('save-tts'); setDraft(current => ({ ...current, ...value })) }
  const patchCustomField = (key, value) => {
    if (custom[key] !== value) {
      setCustomConsentDraft(null)
      patch({ customTts:{ ...custom, [key]:value, textTransmissionAccepted:false } })
    }
  }
  const confirmCustomConsent = accepted => {
    setCustomConsentDraft({ revision:state.authorization?.revision, accepted })
    patch({ customTts:{ ...custom, textTransmissionAccepted:accepted } })
  }
  const referenceSupported = draft.localModelId === 'qwen3-tts-base-1.7b-gguf'
  const volume = Number(draft.volume)
  const valid = !noDeepSeekKey && !deepseekPermissionLoading && (!usesCustom || !customError && !customPermissionLoading && customConsentChecked) && (draft.provider !== 'local' || Boolean(draft.localModelId && draft.localModelPath) && (!draft.referenceAudioPath || referenceSupported)) && draft.volume !== '' && Number.isFinite(volume) && volume >= 0 && volume <= 1
  const confirmedDraft = { ...settingsDraft, volume, deepseekTextTransmissionAccepted: usesDeepSeek || draft.deepseekTextTransmissionAccepted }
  if (usesCustom) confirmedDraft.customTts = { ...custom, baseUrl:custom.baseUrl.trim(), model:custom.model.trim(), voice:custom.voice.trim(), apiKeyEnv:custom.apiKeyEnv?.trim() || null, textTransmissionAccepted:customConsentChecked }
  const save = async () => {
    if (await execute('save-tts', { revision:settings.revision, values:ttsValues(confirmedDraft) })) setCustomConsentDraft(null)
  }
  return <section className={css.section} aria-label="朗读设置" data-settings-draft="save-tts">
    <header><h3>回答怎么发声</h3></header>
    {!prepared && <VoiceSettingsGate state={state} sessionId={sessionId} run={run} canStopTts={false}/>}
    {!usesDeepSeek && !usesCustom && (!prepared || !settings || !capabilities || state.uncertain || state.ttsUncertain) && <div className={css.actions}><Button variant="outline" disabled={state.busy || pending} onClick={() => execute('inspect-tts')}>检测本机语音</Button></div>}
    <fieldset className={`${css.choices} ${css.sourceChoices}`} disabled={locked || !settings}><legend>朗读来源</legend>
      {speechSources.map(([value,label,hint]) => <label key={value} className={css.choice} data-selected={draft.provider === value}><input type="radio" name={name} checked={draft.provider === value} onChange={() => patch({ provider: value })}/><span><strong>{label}</strong><small>{hint}</small></span></label>)}
    </fieldset>
    {usesDeepSeek&&<div className={css.section}><p className={css.hint}>{deepseekDisclosure}</p>
      {deepseekPermissionLoading && <p role="status" className={css.hint}>正在读取 DeepSeek 朗读授权…</p>}
      {needsDeepSeekConsent && <p className={css.hint}>启用前，回答只显示文字。试听只发送固定示例。</p>}
      {noDeepSeekKey && <><p role="status" className={css.hint}>{deepseekKeyHelp}</p>
        <Button variant="outline" disabled={state.busy || pending} onClick={() => execute('inspect-tts')}>{capabilities ? '重新检查 DeepSeek API Key' : '检查 DeepSeek API Key'}</Button></>}
      <DeepSeekVoiceField value={draft.deepseekVoice} disabled={locked} onChange={deepseekVoice=>patch({deepseekVoice})}/>
    </div>}
    {usesCustom && <CustomTtsFields value={{ ...custom, textTransmissionAccepted:customConsentChecked }} disabled={locked || customPermissionLoading} fieldError={customPermissionLoading ? '正在读取自定义 TTS 朗读授权…' : customError} onChange={patchCustomField} onConsent={confirmCustomConsent}/>}
    {draft.provider === 'local' && (draft.localModelId ? <div className={css.section}><div className={css.currentModel}><span>当前朗读模型 <strong>{draft.localModelId.startsWith('qwen3')?'Qwen3-TTS':draft.localModelId.includes('melo')?'MeloTTS':draft.localModelId}</strong></span><Button variant="outline" aria-expanded={chooseLocal} disabled={changed} onClick={()=>setChooseLocal(value=>!value)}>切换当前模型</Button></div>{chooseLocal&&<><InstalledModelSwitcher state={state} sessionId={sessionId} run={run} purpose="tts"/><details className={css.details}><summary>安装其他朗读模型</summary><LocalTtsDownload pickPath={pickPath} state={state} sessionId={sessionId} run={run} active={active}/></details></>}</div> : <LocalTtsDownload pickPath={pickPath} state={state} sessionId={sessionId} run={run} active={active}/>)}
    {draft.provider === 'local' && !changed && currentLocalJob?.modelId === 'qwen3-tts-base-1.7b-gguf' && <p className={css.hint}>当前安装方案：{computeLabel(currentLocalJob.compute)}。{currentLocalJob.compute === 'cpu' ? '此安装只使用 CPU。可在“切换当前模型 → 安装其他朗读模型”选择自动 GPU；下载运行组件前仍需确认。' : '是否实际使用 GPU，以完成合成后的本地计算状态为准。'}</p>}
    <details className={css.details}><summary>音色与音量</summary><div className={css.section}>
      {draft.provider === 'local' && (referenceSupported || draft.referenceAudioPath) && <div className={css.section} data-reference-voice>
        <PathField className={css.field} label="参考音频（WAV）" kind="referenceAudio" value={draft.referenceAudioPath} disabled={locked || !referenceSupported} active={active} scope={draft.provider+':'+draft.localModelId} pickPath={pickPath} sessionId={sessionId} placeholder="请点击选择文件" onChange={value=>patch({referenceAudioPath:value.trim() || null})}/>
        {draft.referenceAudioPath && <Button variant="outline" disabled={locked} onClick={()=>patch({referenceAudioPath:null})}>清除参考音色</Button>}
      </div>}
      {draft.provider !== 'local' && draft.referenceAudioPath && <div className={css.section}><p className={css.hint}>本地参考音色已保留。</p><Button variant="outline" disabled={locked} onClick={()=>patch({referenceAudioPath:null})}>清除参考音色</Button></div>}
      <label className={css.inlineField}>朗读音量<MotionRange aria-label="朗读音量滑块" min="0" max="1" step="0.05" value={draft.volume} disabled={locked} onChange={event=>patch({volume:Number(event.target.value)})}/><Input type="number" min="0" max="1" step="0.05" value={draft.volume} disabled={locked} onChange={event => patch({ volume: event.target.value })}/></label>
    </div></details>
    <div className={css.actions}><Button variant="primary" className={css.primary} disabled={locked || !settings || !valid || !(changed || needsDeepSeekConsent || needsCustomConsent)} onClick={()=>void save()}>{pending ? '处理中…' : needsDeepSeekConsent ? '启用 DeepSeek 朗读' : '保存朗读设置'}</Button>
      <Button variant="outline" disabled={locked || !settings?.ttsSetup || !valid || draft.provider === 'off' || usesCustom && (changed || !customPermission)} onClick={() => execute('preview-tts', !usesCustom && (changed || needsDeepSeekConsent) ? {
        revision: settings.revision, values: auditionValues(confirmedDraft, settings.ttsSetup),
      } : undefined)}>{needsDeepSeekConsent ? '发送示例并试听' : !usesCustom && changed ? '试听当前选择' : '试听已保存配置'}</Button>
      <Button variant="outline" disabled={!(runtime?.busy || runtime?.blocked || state.ttsUncertain || state.ttsCancelling || preview?.status === 'preparing' || pendingAction === 'preview-tts')} onClick={() => { void run(sessionId, 'cancel-tts') }}>停止试听</Button></div>
    {preview && <p role="status" className={css.hint}>{({preparing:'试听准备中',cancelling:'正在停止试听',cancelled:'试听已取消',idle:'试听已停止',completed:'试听已结束',failed:preview.detail??'试听失败，正在核查状态',unconfirmed:'无法确认试听停止，请完整重启宿主'})[preview.status] ?? preview.status}{providerNames[preview.provider] ? ` · ${providerNames[preview.provider]}` : ''}</p>}
    {runtime && <p role="status" className={css.hint}>{runtime.blocked ? '试听尚未停止，请重启宿主。' : `朗读状态：${({ idle:'空闲',preparing:'准备中',synthesizing:'合成中', 'playback-requested':'已请求播放','text-only':'已显示文字',completed:'试听已结束',cancelled:'已取消',failed:'失败' })[runtime.state] ?? runtime.state}`}{runtime.localComputeBackend ? ` · 本地计算：${runtime.localComputeBackend.toUpperCase()}${runtime.localComputeVerified ? '（已完成合成）' : '（待验证）'}` : ''}{runtime.localComputeFallback ? ' · 已回退同模型 CPU' : ''}</p>}
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
    {job.status==='installed'&&<small>切换前请结束对话。下次开始对话时使用新模型。</small>}
  </article>
}
export function ModelInstallerEditor({ state, sessionId, run }) {
  const [modelId,setModelId]=useState(''),[compute,setCompute]=useState('cpu'),[switching,setSwitching]=useState(false)
  const [execute,pending]=useCommand(run,sessionId)
  const snapshot=state.installerFor===sessionId?state.installer:null
  const settings=state.settingsFor===sessionId?state.settings:null
  const cards=groupedModelCards(snapshot,settings).filter(card => card.model.id !== 'sensevoice-int8-2024-07-17' || card.active)
  const selected=cards.find(card=>card.model.id===modelId),model=selected?.model
  const plan=state.installPlanFor===sessionId&&state.installPlan?.modelId===modelId&&state.installPlan?.compute===compute&&!state.installPlan?.sourceDirectory?state.installPlan:null
  const disabled=Boolean(state.busy)||state.uncertain||state.installerUncertain||pending
  const writable=!pending&&setupWritable(state,sessionId)&&!state.settingsDraftActions?.some(action=>['save-models','save-tts'].includes(action))
  const name=useId(),history=(snapshot?.jobs??[]).filter(job=>['installed','cancelled'].includes(job.status)).slice().reverse()
  const hardware=snapshot?.hardware,observedAt=snapshot?.refresh?.observedAt??snapshot?.compute?.observedAt
  return <section className={`${css.section} ${css.modelInstaller}`} aria-label="模型安装">
    <div className={css.hardwareSummary}><span>内存 {formatBytes(hardware?.totalMemoryBytes)} · 可用 {formatBytes(hardware?.availableMemoryBytes)} · 显存 {formatBytes(hardware?.gpuMemoryBytes)}</span><small>{observedAt?'更新于 '+jobTime(observedAt):'等待检测'} · 每 5 分钟</small></div>
    {(snapshot?.refresh?.error||state.modelComputeError)&&<p className={css.hint} role="status">{snapshot?.refresh?.error??'本次硬件检测未完成'}；保留上次结果。</p>}
    {state.installerError&&<p role="alert" className={css.note}>{state.installerError}</p>}{state.installerUncertain&&<p role="status" className={css.note}>正在核查安装状态。</p>}
    <div className={css.currentModel}><span>识别 <strong>SenseVoice</strong> · 朗读 <strong>{settings?.ttsSetup?.provider==='local'?(settings.ttsSetup.localModelId?.startsWith('qwen3')?'Qwen3-TTS':settings.ttsSetup.localModelId?.startsWith('vits-melo')?'MeloTTS':settings.ttsSetup.localModelId??'本地模型'):settings?.ttsSetup?.provider==='deepseek'?settings.ttsSetup.deepseekTextTransmissionAccepted&&hasDeepSeekPermission(state)?'DeepSeek':'DeepSeek 待启用':({off:'不发声'})[settings?.ttsSetup?.provider]??'未配置'}</strong></span><Button variant="outline" aria-expanded={switching} onClick={()=>setSwitching(value=>!value)}>切换当前模型</Button></div>
    {switching&&<InstalledModelSwitcher state={state} sessionId={sessionId} run={run}/>}
    {!snapshot?<p className={css.note}>正在读取模型列表。</p>:<fieldset className={`${css.choices} ${css.modelChoices}`} disabled={disabled}><legend>选择模型</legend>{cards.map(({model:item,current,preferred,active})=><label key={item.id} className={css.choice} data-selected={modelId===item.id}><input type="radio" name={name} checked={modelId===item.id} onChange={()=>{setModelId(item.id);setCompute(item.computeOptions?.includes('auto')?'auto':'cpu')}}/><span><strong>{shortModelTitle(item)}{item.recommendation?.recommended&&<span className={css.badge}>推荐</span>}</strong><small>{item.purpose==='tts'?'朗读':'识别'} · {formatBytes(item.totalBytes)}</small><small>{current?'当前配置':active?({queued:'等待下载',running:'下载处理中',paused:'下载已暂停',failed:'下载失败'})[active.status]:preferred?'已安装，可切换':item.available?'可准备安装':'暂不可安装'}</small>{!item.available&&<small>{item.reason??item.recommendation?.reason}</small>}</span></label>)}</fieldset>}
    {model&&<div className={css.selectedModel}><label className={css.inlineField}>推理设备<select value={compute} disabled={disabled} onChange={event=>setCompute(event.target.value)}>{(model.computeOptions??['cpu']).map(value=><option key={value} value={value}>{computeLabel(value)}{value==='cpu'?'':' · CPU 兜底'}</option>)}</select></label><div className={css.actions}>{selected.preferred&&<Button variant="outline" disabled={!writable||Boolean(selected.current)} onClick={()=>execute('apply-model-install',{id:selected.preferred.id,revision:settings.revision})}>{selected.current?'当前模型':'验证并切换'}</Button>}<Button variant="outline" disabled={disabled||!model.available} onClick={()=>execute('plan-model-install',{modelId,compute})}>{selected.preferred?'查看其他安装方案':'查看安装计划'}</Button></div><details className={css.details}><summary>推荐依据与设备说明</summary><p className={css.hint}>{model.recommendation?.reason??'推荐依据未知，可手动选择。'}</p><p className={css.hint}>{model.purpose==='tts'?(compute==='cpu'?'仅准备 CPU 运行时。':'准备固定 Vulkan 与 CPU 组件，实际可用性仍需本机合成验证。'):'此模型使用 CPU。'}</p></details></div>}
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

export function SetupWizard({ state, sessionId, run, refresh, t, onDismiss, onMinimize, onBackToAuthorization, asrStatus, pickPath }) {
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
  const selectedProvider=provider??savedProvider??initialTts.provider
  const capabilities = state.ttsCapabilitiesFor === sessionId ? state.ttsCapabilities : null
  const deepseekKeyKnown = typeof capabilities?.deepseekKeyAvailable === 'boolean'
  const deepseekKeyAvailable = capabilities?.deepseekKeyAvailable === true
  const deepseekCheckKey = `${sessionId ?? 'owner'}:${settings?.revision ?? 'unread'}`
  const [deepseekDraft,setDeepseekVoice]=useState(null)
  const deepseekVoice = deepseekDraft ?? settings?.ttsSetup?.deepseekVoice ?? 'stella'
  const deepseekCheckFailed = !deepseekKeyKnown && !pending && checkedDeepSeekKey.current === deepseekCheckKey && Boolean(state.error)
  const checkDeepSeekKey = () => {
    if(pending||state.busy)return
    checkedDeepSeekKey.current=deepseekCheckKey
    void execute('inspect-tts')
  }
  useEffect(() => {
    if(step!==1||!settings||selectedProvider!=='deepseek'||deepseekKeyKnown||pending||state.busy||checkedDeepSeekKey.current===deepseekCheckKey)return
    checkDeepSeekKey()
  },[step,settings,selectedProvider,deepseekKeyKnown,deepseekCheckKey,pending,state.busy])
  const usesDeepSeek=selectedProvider==='deepseek'
  const deepseekPermissionLoading=usesDeepSeek&&(state.authorizationUncertain||settings?.ttsSetup?.deepseekTextTransmissionAccepted===true&&!state.authorization)
  const enablingDeepSeek=usesDeepSeek&&!deepseekPermissionLoading&&!(settings?.ttsSetup?.deepseekTextTransmissionAccepted===true&&hasDeepSeekPermission(state))
  const locked=pending||!setupWritable(state,sessionId)
  const localConfigured=settings?.ttsSetup?.provider==='local'&&Boolean(settings.ttsSetup.localModelId)
  const next=async()=>{
    if (locked || !settings) return
    const intent=stepScope.current,current=()=>stepScope.current===intent
    if(step===0){if(await execute('listen-mode',{mode:selectedMode})===true&&current())setStep(1)}
    else if(step===1){
      if(usesDeepSeek&&(!deepseekKeyAvailable||deepseekPermissionLoading))return
      const voiceChanged = usesDeepSeek&&deepseekVoice!==(settings.ttsSetup?.deepseekVoice??'stella')
      if(selectedProvider===savedProvider&&!enablingDeepSeek&&!voiceChanged){setStep(2);return}
      const values=ttsValues({...initialTts,...settings.ttsSetup,provider:selectedProvider})
      if(usesDeepSeek){values.deepseekTextTransmissionAccepted=true;values.deepseekVoice=deepseekVoice}
      if(await execute('save-tts',{revision:settings.revision,values})===true&&current())setStep(2)
    }else if(await execute('complete-setup',{revision:settings.revision})===true&&current())onDismiss?.()
  }
  return <MenuSurface ref={wizard} className={css.wizard} role="region" aria-label="鱼应首次配置" data-whale-intrinsic>
    <header className={css.header}><div><h2>开始使用鱼应</h2><p className={css.hint}>第 {step+1} / 3 步 · 其余设置随时再调</p></div><Button onClick={state.setupStatus?.completed === true ? onDismiss : onMinimize}>{state.setupStatus?.completed === true ? '返回设置' : '稍后'}</Button></header>
    <div className={css.wizardBody} data-wizard-body data-no-drag><div className={css.wizardBodyContent} data-whale-natural-content><VoiceSettingsGate state={state} sessionId={sessionId} run={run} refresh={refresh} t={t}/>
    {step===0&&<section className={css.section}><h3>怎么说话？</h3><fieldset className={css.choices} disabled={locked}>{[['ptt','按键说话','按住快捷键时收音'],['always','自由麦','开始对话后持续听取语音'],['wake','唤醒词','先叫设定称呼，再说指令']].map(([value,label,hint])=><label key={value} className={css.choice} data-selected={selectedMode===value}><input type="radio" name="setup-listen" data-whale-operation={`listen-mode-${value}`} checked={selectedMode===value} onChange={()=>setMode(value)}/><span><strong>{label}</strong><small>{hint}</small></span></label>)}</fieldset></section>}
    {step===1&&<section className={css.section}><h3>怎么听回答？</h3><fieldset className={css.choices} disabled={locked}>{speechSources.filter(([value])=>value!=='custom'||savedProvider==='custom').map(([value,label,hint])=><label key={value} className={css.choice} data-selected={selectedProvider===value}><input type="radio" name="setup-provider" checked={selectedProvider===value} onChange={()=>setProvider(value)}/><span><strong>{label}</strong><small>{hint}</small></span></label>)}</fieldset>
    {usesDeepSeek&&<div className={css.note} data-whale-deepseek-setup>
      <p>{deepseekDisclosure}</p>
      {deepseekPermissionLoading&&<p role="status">正在读取 DeepSeek 朗读授权…</p>}
      {!deepseekKeyKnown&&!deepseekCheckFailed&&<p role="status">正在检查 DSH 中保存的 DeepSeek API Key…</p>}
      {deepseekKeyKnown&&!deepseekKeyAvailable&&<p role="status">{deepseekKeyHelp}</p>}
      {deepseekCheckFailed&&<p role="status">暂时无法检查 DeepSeek API Key。</p>}
      {(deepseekCheckFailed||deepseekKeyKnown&&!deepseekKeyAvailable)&&<Button variant="outline" disabled={locked} onClick={checkDeepSeekKey}>重新检查 DeepSeek API Key</Button>}
      <DeepSeekVoiceField value={deepseekVoice} disabled={locked} onChange={setDeepseekVoice}/>
    </div>}
    {selectedProvider==='local'&&<LocalTtsDownload pickPath={pickPath} state={state} sessionId={sessionId} run={run} initialModelId={localConfigured ? settings.ttsSetup.localModelId : null} onboarding/>}
    </section>}
    {step===2&&<section className={css.section}><h3>准备语音识别</h3><p>说话方式和朗读配置已保存。</p>{asrStatus}
    </section>}
    {(state.error||state.setupError)&&<p role="alert" className={css.note}>暂时未能完成，正在核查设置。</p>}
    </div></div><footer className={css.actions}><Button variant="outline" disabled={pending} onClick={()=>step>0?setStep(step-1):leave(onBackToAuthorization)}>上一步</Button>
      <Button variant="primary" className={css.primary} disabled={locked||!settings||step===1&&(selectedProvider==='local'&&!localConfigured||usesDeepSeek&&(!deepseekKeyAvailable||deepseekPermissionLoading))} onClick={()=>void next()}>{pending?'保存中…':step===2?'完成':step===1&&enablingDeepSeek?'启用 DeepSeek 语音合成并继续':'下一步'}</Button></footer>
  </MenuSurface>
}
