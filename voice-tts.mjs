/** Explicit, opt-in TTS. No installer, remote discovery, or transcript subscription. */
import { spawn } from 'node:child_process'
import { StringDecoder } from 'node:string_decoder'
import { fileURLToPath } from 'node:url'
import { isAbsolute } from 'node:path'
import { createManagedLocalTtsAdapter } from './voice-tts-local.mjs'
import { createDeepSeekTtsAdapter, safeDeepSeekDiagnostic } from './voice-tts-deepseek.mjs'
import { assertCustomTtsConsent, createCustomTtsAdapter, normalizeCustomTtsSettings } from './voice-tts-custom.mjs'

export const TTS_SETUP_VERSION = 1
export const TTS_SAMPLE = '你好，我是鱼应。这是一段语音试听。'
export const TTS_DEFAULTS = Object.freeze({ provider: 'deepseek', deepseekVoice: 'stella', deepseekTextTransmissionAccepted: false, volume: 0.8, localModelId: null, localModelPath: null, referenceAudioPath: null, referenceAudioAccepted: false })
const keys = Object.keys(TTS_DEFAULTS)
const fault = (code, message, extra = {}) => Object.assign(new Error(message), { code, ...extra })
const aborted = () => fault('TTS_CANCELLED', '朗读已取消')
const plain = x => x !== null && typeof x === 'object' && !Array.isArray(x)
const nativeAudioMessages = {
  AUDIO_OUTPUT_DEVICE_UNAVAILABLE: '所选输出设备已断开或不可用；已停止播放，未切换到其他设备',
  AUDIO_OUTPUT_DEVICE_INVALID: '输出设备设置无效，请重新选择',
  AUDIO_TOO_LONG: '音频超过本地播放时长上限',
  AUDIO_TOO_LARGE: '音频超过本地播放大小或时长上限',
  AUDIO_CLEANUP_FAILED: '音频组件未能正常释放设备，请重试',
}
const playbackCheckMessages = {
  ...nativeAudioMessages,
  TTS_PROCESS_START_FAILED: 'Windows 本机音频组件无法启动，请检查系统播放组件后重试',
  TTS_PROCESS_FAILED: 'Windows 本机音频检查失败，请检查系统播放组件后重试',
  TTS_INVALID_RESPONSE: 'Windows 本机音频检查返回异常，请检查系统播放组件后重试',
  TTS_TIMEOUT: 'Windows 本机音频检查超时，请检查系统播放组件后重试',
}
function nativeAudioError(value) {
  if (value?.ok === false && typeof value.code === 'string' && Object.hasOwn(nativeAudioMessages, value.code)
    && Object.keys(value).every(key => ['ok', 'code'].includes(key))) return fault(value.code, nativeAudioMessages[value.code])
}
export function ttsSettings(raw) {
  const { provider, edgeVoice, edgeTextTransmissionAccepted, systemVoice, systemFallback, ...saved } = plain(raw) ? raw : {}
  const value = { ...TTS_DEFAULTS, ...saved }
  if (provider === undefined || provider === 'edge' || provider === 'unconfigured') {
    // An old selection, including a Microsoft consent, cannot authorize DeepSeek.
    value.deepseekVoice = TTS_DEFAULTS.deepseekVoice
    value.deepseekTextTransmissionAccepted = false
  } else {
    value.provider = provider === 'system' ? 'off' : provider
  }
  return validateTtsSettings(value)
}
export function validateTtsSettings(value) {
  if (!plain(value) || keys.some(k => !Object.hasOwn(value, k)) || Object.keys(value).some(k => k !== 'customTts' && !keys.includes(k))) throw fault('TTS_INVALID_SETTINGS', '朗读设置字段无效')
  if (!['deepseek', 'local', 'off', 'custom'].includes(value.provider) || !['stella', 'tide'].includes(value.deepseekVoice)) throw fault('TTS_INVALID_SETTINGS', '朗读服务或音色无效')
  if (typeof value.deepseekTextTransmissionAccepted !== 'boolean' || typeof value.volume !== 'number' || !Number.isFinite(value.volume) || value.volume < 0 || value.volume > 1) throw fault('TTS_INVALID_SETTINGS', '朗读音量或同意选项无效')
  if (value.localModelId !== null && (typeof value.localModelId !== 'string' || !/^[a-zA-Z0-9._-]{1,128}$/.test(value.localModelId))) throw fault('TTS_INVALID_SETTINGS', '本地语音模型标识无效')
  if (value.localModelPath !== null && (typeof value.localModelPath !== 'string' || !isAbsolute(value.localModelPath) || /[\x00-\x1f]/.test(value.localModelPath))) throw fault('TTS_INVALID_SETTINGS', '本地语音模型目录无效')
  if (value.referenceAudioPath !== null && (typeof value.referenceAudioPath !== 'string' || value.referenceAudioPath.length > 4096 || !isAbsolute(value.referenceAudioPath) || /[\x00-\x1f]/.test(value.referenceAudioPath))) throw fault('TTS_INVALID_SETTINGS', '参考音频路径无效')
  // Kept for old saved configurations only. Sample-use responsibility is
  // acknowledged once in the owner usage agreement, not asserted per file.
  if (typeof value.referenceAudioAccepted !== 'boolean') throw fault('TTS_INVALID_SETTINGS', '参考音频设置无效')
  const customTts = Object.hasOwn(value, 'customTts') || value.provider === 'custom' ? normalizeCustomTtsSettings(value.customTts) : undefined
  return customTts ? { ...value, customTts } : { ...value }
}
/** Preserve every Unicode code point; prefer sentence boundaries within native context limits. */
export function splitLocalTtsText(text) {
  const points = Array.from(text), chunks = []
  let start = 0
  while (start < points.length) {
    let end = start, chars = 0, bytes = 0, boundary = -1
    while (end < points.length && chars + points[end].length <= 400 && bytes + Buffer.byteLength(points[end], 'utf8') <= 1200) {
      chars += points[end].length; bytes += Buffer.byteLength(points[end], 'utf8')
      if (/[。！？!?；;\n]/u.test(points[end]) || /\s/u.test(points[end])) boundary = end + 1
      end++
    }
    if (end < points.length && boundary > start) end = boundary
    const chunk = points.slice(start, end).join('')
    if (chunk.trim()) chunks.push(chunk)
    start = end
  }
  return chunks
}
/** Subprocess completion is observed before resolving cancellation. No shell or text in argv. */
export function runTtsProcess(command, args, payload, { signal, timeoutMs = 20000, spawnProcess = spawn, killGraceMs = 1500, maxOutput = 65536, env, cwd, captureJson = true, captureText = false, nativeAudioErrors = false, captureCompute = false } = {}) {
  if (signal?.aborted) return Promise.reject(aborted())
  return new Promise((resolve, reject) => {
    const stdoutDecoder = new StringDecoder('utf8')
    const stderrDecoder = captureText ? new StringDecoder('utf8') : null
    let outputBytes = 0
    let child, stdout = '', stderr = '', diagnosticTail = '', audioFrames = null, gpuLayers = 0, finished = false, stopping = null, timer, forceTimer, uncertainTimer
    const cleanup = () => { clearTimeout(timer); clearTimeout(forceTimer); clearTimeout(uncertainTimer); signal?.removeEventListener('abort', onAbort) }
    const finish = (error, result) => { if (finished) return; finished = true; cleanup(); error ? reject(error) : resolve(result) }
    const stop = error => {
      if (stopping || finished) return
      stopping = error
      try { child.kill() } catch {}
      forceTimer = setTimeout(() => { try { child.kill('SIGKILL') } catch {} }, Math.max(1, killGraceMs / 2))
      uncertainTimer = setTimeout(() => finish(fault('TTS_TERMINATION_UNCONFIRMED', '未能确认朗读进程已停止；请关闭鱼应后重启宿主，暂不继续播放', { uncertain: true })), killGraceMs)
    }
    const onAbort = () => stop(aborted())
    try { child = spawnProcess(command, args, { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true, shell: false, ...(env ? { env } : {}), ...(cwd ? { cwd } : {}) }) } catch { finish(fault('TTS_PROCESS_START_FAILED', '朗读组件无法启动')); return }
    child.on('error', () => {
      if (child.pid) stop(fault('TTS_PROCESS_FAILED', '朗读进程发生错误'))
      else finish(fault('TTS_PROCESS_START_FAILED', '朗读组件无法启动'))
    })
    child.stdout.on('data', chunk => {
      if ((!captureJson && !captureText) || stopping || finished) return
      outputBytes += chunk.length
      if (outputBytes > maxOutput) return stop(fault('TTS_INVALID_RESPONSE', '朗读组件返回数据过大'))
      stdout += stdoutDecoder.write(chunk)
    })
    // Only static runtime version/import checks opt in to bounded text capture.
    // Speech diagnostics are drained, never returned or added to errors.
    child.stderr.on('data', chunk => {
      if (stopping || finished) return
      if (captureText) {
        outputBytes += chunk.length
        if (outputBytes > maxOutput) return stop(fault('TTS_INVALID_RESPONSE', '朗读组件返回数据过大'))
        stderr += stderrDecoder.write(chunk)
        return
      }
      if (captureJson) return
      // Scan this entire pipe chunk before retaining only the bounded suffix.
      // Native timings and a long output path can follow the completion line.
      const diagnostic = diagnosticTail + chunk.toString('utf8')
      const match = diagnostic.match(/generated (\d+) frames, \d+ bytes of WAV audio \(\d+ Hz\)/)
      if (match) audioFrames = Number(match[1])
      if (captureCompute) { for (const offload of diagnostic.matchAll(/offloaded (\d+)\/\d+ layers to GPU/g)) { const count = Number(offload[1]); if (Number.isSafeInteger(count) && count > 0) gpuLayers = Math.max(gpuLayers, count) } }
      diagnosticTail = diagnostic.slice(-512)
    })
    child.stdin.on('error', () => {})
    child.on('close', code => {
      if (stopping) return finish(stopping)
      if (code !== 0) {
        // Opt-in helper codes only. Never expose subprocess stderr, paths,
        // endpoint IDs, or an arbitrary error message from child output.
        if (nativeAudioErrors && captureJson) {
          try {
            const value = JSON.parse((stdout + stdoutDecoder.end()).replace(/^\uFEFF/, ''))
            const error = nativeAudioError(value)
            if (error) return finish(error)
          } catch {}
        }
        return finish(fault('TTS_PROCESS_FAILED', '朗读组件执行失败'))
      }
      if (captureText) return finish(null, { ok: true, stdout: stdout + stdoutDecoder.end(), stderr: stderr + stderrDecoder.end() })
      if (!captureJson) return finish(null, { ok: true, completed: true, audioFrames, ...(captureCompute ? { gpuLayers } : {}) })
      stdout += stdoutDecoder.end()
      try { const value = JSON.parse(stdout.replace(/^\uFEFF/, '')); if (!plain(value) || value.ok !== true) throw new Error(); finish(null, value) }
      catch { finish(fault('TTS_INVALID_RESPONSE', '朗读组件返回结果无效')) }
    })
    signal?.addEventListener('abort', onAbort, { once: true })
    timer = setTimeout(() => stop(fault('TTS_TIMEOUT', '朗读服务超时')), timeoutMs)
    if (signal?.aborted) onAbort()
    if (!stopping) { try { child.stdin.end(JSON.stringify(payload), 'utf8') } catch { stop(fault('TTS_PROCESS_FAILED', '无法发送朗读请求')) } }
  })
}

/** Only closed compute facts, never native diagnostics, reach the UI. */
/** Numeric wall-clock stages only. Never copy diagnostics or owner text. */
export function localTimingStatus(value) {
  const timing = value?.localTimings
  const fields = ['preparationMs','deviceSelectionMs','synthesisMs','playbackMs','totalMs','chunks']
  if (!timing || typeof timing.modelResident !== 'boolean' || fields.some(key => !Number.isSafeInteger(timing[key]) || timing[key] < 0) || timing.chunks < 1 || timing.chunks > 4000) return {}
  return { localTimings: { ...Object.fromEntries(fields.map(key => [key,timing[key]])), modelResident: timing.modelResident } }
}

export function localComputeStatus(value) {
  if (!value || !['auto','cpu','cuda','hip','vulkan'].includes(value.localComputeRequested)
    || ![null,'cpu','cuda','hip','vulkan'].includes(value.localComputeBackend)
    || !(value.localComputeDevice === null || /^(?:Vulkan|CUDA|ROCm)[0-9]{1,3}$/.test(value.localComputeDevice ?? ''))
    || typeof value.localComputeVerified !== 'boolean' || typeof value.localComputeFallback !== 'boolean'
    || ![null,'TTS_GPU_UNAVAILABLE','TTS_GPU_RUNTIME_MISSING','TTS_GPU_SYNTHESIS_FAILED','TTS_GPU_STARTUP_FAILED'].includes(value.localComputeReason)) return {}
  return Object.fromEntries(['localComputeRequested','localComputeBackend','localComputeDevice','localComputeVerified','localComputeFallback','localComputeReason'].map(key => [key,value[key]]))
}

/** Windows native output readiness and local audio-file playback. */
export function createWindowsTtsAdapter({ platform = process.platform, outputDevice = () => null, runner = runTtsProcess } = {}) {
  const script = fileURLToPath(new URL('./helper/tts_windows.ps1', import.meta.url))
  const powershell = (payload, options) => runner('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-File', script], payload, { ...options, nativeAudioErrors: true })
  return {
    async inspect(signal) {
      if (platform !== 'win32') return { platform, playbackSupported: false, filePlaybackSupported: false, reason: 'windows-native-playback-required' }
      try {
        const audio = await powershell({ op: 'inspect', outputDevice: outputDevice() }, { signal, timeoutMs: 8000 })
        return { platform, playbackSupported: audio.playbackSupported === true, filePlaybackSupported: audio.filePlaybackSupported === true, reason: null }
      } catch (error) {
        if (signal?.aborted || error?.uncertain) throw error
        return { platform, playbackSupported: false, filePlaybackSupported: false, reason: error?.code ?? 'TTS_PROCESS_FAILED' }
      }
    },
    async play(path, config, signal) {
      if (platform !== 'win32') throw fault('TTS_PLATFORM_UNSUPPORTED', '本版原生朗读仅支持 Windows')
      return powershell({ op: 'play', path, volume: config.volume, outputDevice: outputDevice() }, { signal, timeoutMs: 120000 })
    },
  }
}

export function createTtsRuntime({ getConfig, adapter = createWindowsTtsAdapter(), localAdapter, localRuntimeModulePath, resolveManagedLocalTts, resolveDeepSeekApiKey, resolveCustomTtsKey, deepseekAdapter, outputDevice = () => null, getResidencyMode, now = Date.now } = {}) {
  if (typeof getConfig !== 'function') throw new Error('TTS requires an effective-config reader')
  // Only our managed adapter verifies every chunk itself. Injected adapters keep
  // their existing inspection contract, and a missing resolver still fails closed.
  const managedLocal = localAdapter == null && typeof resolveManagedLocalTts === 'function'
  const deepseek = deepseekAdapter ?? createDeepSeekTtsAdapter({ resolveDeepSeekApiKey, outputDevice })
  const playback = adapter.play?.bind(adapter)
  const custom = createCustomTtsAdapter({ playback, resolveCustomTtsKey })
  const localOptions = { getResidencyMode, runner: runTtsProcess, playback, modulePath: localRuntimeModulePath }
  const local = localAdapter ?? (managedLocal ? createManagedLocalTtsAdapter({ ...localOptions, resolveManagedLocalTts: async (config, signal) => {
    const descriptor = await resolveManagedLocalTts(config, signal)
    // Managed artifact hashing is asynchronous. Recheck the
    // current request before its verified descriptor can be used for synthesis.
    assertRunning(signal)
    if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
    return descriptor
  } }) : {
    async inspect() { return { localRuntime: 'unavailable', localReady: false, localSynthesisSupported: false, synthesisVerified: false, localReason: 'TTS_LOCAL_RESOLVER_MISSING' } },
    async speak() { throw fault('TTS_LOCAL_RESOLVER_MISSING', '尚未连接受信的本地模型安装器') },
    async probe() { throw fault('TTS_LOCAL_RESOLVER_MISSING', '尚未连接受信的本地模型安装器') },
  })
  let active = null, disposed = false, locked = false, inspection = null, stopping = null
  let last = { state: 'idle', provider: null, fallback: false, reason: null, at: now() }
  const listeners = new Set()
  const publish = change => { last = { ...last, ...change, at: now() }; for (const fn of listeners) { try { fn({ ...last }) } catch {} } }
  const assertRunning = signal => {
    signal?.throwIfAborted()
    if (local.residency?.().blocked) locked = true
    if (disposed || locked || stopping) throw fault('TTS_BLOCKED', '朗读已关闭，或上次停止尚未确认')
  }
  // One lifecycle for public inspection, speech and verification, including synchronous failures.
  async function operate(signal, work, defaultReason = 'TTS_FAILED') {
    assertRunning(signal)
    if (active) throw fault('TTS_BUSY', '已有朗读或检查进行中，请先停止当前操作')
    const controller = new AbortController()
    const combined = signal ? AbortSignal.any([controller.signal, signal]) : controller.signal
    const { promise, resolve, reject } = Promise.withResolvers()
    const current = { controller, promise }
    // Register the promise before work or status subscribers can synchronously call stop/dispose.
    active = current
    const execute = async () => {
      try { return await work(combined) }
      catch (error) {
        if (error?.uncertain) locked = true
        const deepseekDiagnostic = safeDeepSeekDiagnostic(error?.deepseekDiagnostic)
        const reason = combined.aborted && !error?.uncertain ? 'TTS_CANCELLED' : error?.code ?? defaultReason
        publish({ state: locked ? 'blocked' : reason === 'TTS_CANCELLED' ? 'cancelled' : 'failed', reason })
        throw fault(reason, reason === 'TTS_CANCELLED' ? '朗读已取消' : error?.message ?? '朗读操作失败', {
          ...(error?.uncertain ? { uncertain: true } : {}), ...(deepseekDiagnostic ? { deepseekDiagnostic } : {}),
        })
      } finally { if (active === current) active = null }
    }
    execute().then(resolve, reject)
    return promise
  }
  async function inspectCapabilities(config, signal, { checkLocal = true, checkDeepSeekKey = false } = {}) {
    assertRunning(signal)
    const capabilities = await adapter.inspect(signal)
    assertRunning(signal)
    const localInfo = config.provider === 'local' && checkLocal ? await local.inspect(config, signal) : { localRuntime: 'unchecked', localSynthesisSupported: false }
    assertRunning(signal)
    const deepseekKeyAvailable = checkDeepSeekKey ? await deepseek.keyAvailable(signal) : undefined
    if (checkDeepSeekKey) assertRunning(signal)
    if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
    inspection = capabilities
    return { ...capabilities, ...localInfo, ...(checkDeepSeekKey ? { deepseekKeyAvailable } : {}), autoDownload: false, gpuSupported: localInfo.localComputeVerified === true && ['vulkan','cuda','hip'].includes(localInfo.localComputeBackend), executionTargets: { deepseek: 'deepseek-api', local: localInfo.localComputeBackend ? `local-${localInfo.localComputeBackend}` : 'local-unverified', ...(config.customTts ? { custom: 'custom-api' } : {}) } }
  }
  function inspect(signal) {
    return operate(signal, combined => inspectCapabilities(ttsSettings(getConfig()), combined, { checkDeepSeekKey: true }))
  }
  function stop() {
    if (stopping) return stopping
    const current = active
    current?.controller.abort()
    // Keep the gate closed while both player and idle native engine are reaped.
    stopping = Promise.resolve().then(async () => {
      try {
        if (current) try { await current.promise } catch {}
        await local.close?.()
      } catch { locked = true; publish({ state: 'blocked', reason: 'TTS_STOP_UNCONFIRMED' }) }
      return { status: locked ? 'unconfirmed' : current ? 'cancelled' : 'idle' }
    }).finally(() => { stopping = null })
    return stopping
  }
  function speak(text, { signal, onTiming, beforeRequest } = {}) {
    return operate(signal, async combined => {
      if (typeof text !== 'string' || !text.trim() || text.length > 4000) throw fault('TTS_INVALID_TEXT', '朗读文本应为 1 至 4000 个字符')
      const config = ttsSettings(getConfig())
      if (config.provider === 'off') throw fault('TTS_NOT_CONFIGURED', '请用文字回答。可在鱼应设置中安装本地语音模型或选择朗读服务。')
      if (config.provider === 'deepseek' && !config.deepseekTextTransmissionAccepted) throw fault('TTS_DEEPSEEK_CONSENT_REQUIRED', '请在鱼应设置中确认将朗读文本发送给 DeepSeek，再使用在线朗读。')
      if (config.provider === 'custom') assertCustomTtsConsent(config.customTts)
      publish({ state: 'preparing', provider: config.provider, fallback: false, reason: null, localTimings:null,localComputeRequested:null,localComputeBackend:null,localComputeDevice:null,localComputeVerified:false,localComputeFallback:false,localComputeReason:null })
      // Managed speech verifies artifacts per chunk, so avoid a duplicate local probe.
      const capabilities = await inspectCapabilities(config, combined, { checkLocal: !managedLocal })
      assertRunning(combined)
      if (capabilities.playbackSupported !== true) {
        if (config.provider === 'custom') throw fault('TTS_CUSTOM_PLAYBACK_UNAVAILABLE',
          Object.hasOwn(playbackCheckMessages, capabilities.reason) ? playbackCheckMessages[capabilities.reason] : '当前环境没有受支持的原生播放组件')
        if (Object.hasOwn(playbackCheckMessages, capabilities.reason)) throw fault(capabilities.reason, playbackCheckMessages[capabilities.reason])
        throw fault('TTS_PLATFORM_UNSUPPORTED', '当前环境没有受支持的原生播放组件')
      }
      if (config.provider === 'local') {
        if (!managedLocal && !capabilities.localReady && !capabilities.localSynthesisSupported) throw fault(capabilities.localReason ?? 'TTS_LOCAL_UNAVAILABLE', '本地语音模型尚未加载成功，请检查模型与运行组件')
        if (capabilities.filePlaybackSupported === false) throw fault('TTS_LOCAL_PLAYBACK_UNAVAILABLE', '当前环境不支持本地音频播放')
        if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
        assertRunning(combined)
        publish({ state: 'synthesizing', provider: 'local' })
        let compute = {}, timings = null
        for (const chunk of splitLocalTtsText(text)) {
          assertRunning(combined)
          if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
          const result = await local.speak(chunk, config, combined)
          assertRunning(combined)
          if (result?.completed !== true) throw fault('TTS_COMPLETION_UNCONFIRMED', '未能确认朗读完成')
          compute = localComputeStatus(result)
          const measured = localTimingStatus(result).localTimings
          // Report complete request totals only when every chunk supplied evidence.
          if (measured && timings !== false) {
            timings ??= { preparationMs:0,deviceSelectionMs:0,synthesisMs:0,playbackMs:0,totalMs:0,chunks:0,modelResident:false }
            for (const key of ['preparationMs','deviceSelectionMs','synthesisMs','playbackMs','totalMs','chunks']) timings[key] += measured[key]
            timings.modelResident = measured.modelResident
          } else timings = false
          if (timings && !localTimingStatus({localTimings:timings}).localTimings) timings = false
          publish({ ...compute, localTimings: timings || null })
        }
        publish({ state: 'completed', provider: 'local', fallback: false, ...compute })
        return { provider: 'local', fallback: false, playbackCompleted: true, acousticConfirmation: false, ...compute, ...(timings ? localTimingStatus({localTimings:timings}) : {}) }
      }
      const assertCurrent = () => {
        assertRunning(combined)
        if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
      }
      if (config.provider === 'custom') {
        if (capabilities.filePlaybackSupported !== true || !playback) throw fault('TTS_CUSTOM_PLAYBACK_UNAVAILABLE', '当前环境无法播放自定义朗读服务返回的音频文件')
        publish({ state: 'synthesizing', provider: 'custom' })
        assertCurrent()
        const result = await custom.synthesize({ text, config, signal: combined, beforeRequest() {
          assertCurrent()
          beforeRequest?.(combined)
          assertCurrent()
        } })
        assertCurrent()
        if (result.completed !== true) throw fault('TTS_COMPLETION_UNCONFIRMED', '未能确认自定义朗读完成')
        publish({ state: 'completed', provider: 'custom', fallback: false })
        return { provider: 'custom', fallback: false, playbackCompleted: true, acousticConfirmation: false, audioBytes: result.bytes }
      }
      publish({ state: 'synthesizing', provider: 'deepseek' })
      assertCurrent()
      const result = await deepseek.synthesize({
        text, voice: config.deepseekVoice, volume: config.volume, signal: combined, onTiming,
        beforeRequest() {
          assertCurrent()
          beforeRequest?.(combined)
        },
      })
      try { assertCurrent() }
      catch (error) {
        if (result?.completed !== true) throw error
        throw fault(error?.code, error?.message, { deepseekDiagnostic: { playbackPossible: true } })
      }
      if (result?.completed !== true) throw fault('TTS_COMPLETION_UNCONFIRMED', '未能确认 DeepSeek 朗读完成')
      publish({ state: 'completed', provider: 'deepseek', fallback: false })
      return { provider: 'deepseek', fallback: false, playbackCompleted: true, acousticConfirmation: false, ...(Number.isSafeInteger(result.bytes) ? { audioBytes: result.bytes } : {}), ...(Number.isFinite(result.audioSeconds) ? { audioSeconds: result.audioSeconds } : {}) }
    })
  }
  function verifyLocalTts({ signal } = {}) {
    return operate(signal, async combined => {
      const config = ttsSettings(getConfig())
      if (typeof local.probe !== 'function') throw fault('TTS_LOCAL_UNAVAILABLE', '本地语音组件不支持验证')
      publish({ state: 'verifying', provider: 'local', fallback: false, reason: null, localTimings:null,localComputeRequested:null,localComputeBackend:null,localComputeDevice:null,localComputeVerified:false,localComputeFallback:false,localComputeReason:null })
      assertRunning(combined)
      const result = await local.probe(config, combined)
      assertRunning(combined)
      if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
      publish({ state: 'idle', provider: 'local', reason: null, ...localComputeStatus(result) })
      return { ...result, acousticConfirmation: false }
    }, 'TTS_LOCAL_UNAVAILABLE')
  }
  return { inspect, speak, verifyLocalTts, preview: options => speak(TTS_SAMPLE, options), cancel: stop,
    residency: () => local.residency?.() ?? { supported: false, modelResident: false },
    status: () => ({ ...last, busy: !!active || !!stopping, blocked: locked || !!local.residency?.().blocked, inspected: inspection !== null }),
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },
    async dispose() { disposed = true; await stop(); listeners.clear() },
  }
}
