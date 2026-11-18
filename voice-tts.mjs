/** Explicit, opt-in TTS. No installer, remote discovery, or transcript subscription. */
import { spawn } from 'node:child_process'
import { StringDecoder } from 'node:string_decoder'
import { access, constants as fsConstants, mkdtemp, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isAbsolute } from 'node:path'
import { createManagedLocalTtsAdapter, localTtsProcessEnvironment } from './voice-tts-local.mjs'
import { createDeepSeekTtsAdapter } from './voice-tts-deepseek.mjs'

export const TTS_SETUP_VERSION = 1
export const TTS_SAMPLE = '你好，我是鱼应。这是一段语音试听。'
export const EDGE_VOICES = Object.freeze(['zh-CN-XiaoxiaoNeural', 'zh-CN-YunxiNeural', 'zh-CN-XiaoyiNeural', 'zh-CN-YunjianNeural', 'zh-TW-HsiaoChenNeural', 'zh-HK-HiuMaanNeural'])
export const TTS_DEFAULTS = Object.freeze({ provider: 'unconfigured', edgeVoice: 'zh-CN-XiaoyiNeural', deepseekVoice: 'stella', deepseekTextTransmissionAccepted: false, systemVoice: null, systemFallback: false, edgeTextTransmissionAccepted: false, volume: 0.8, localModelId: null, localModelPath: null, referenceAudioPath: null, referenceAudioAccepted: false })
const keys = Object.keys(TTS_DEFAULTS)
const fault = (code, message, extra = {}) => Object.assign(new Error(message), { code, ...extra })
const aborted = () => fault('TTS_CANCELLED', '朗读已取消')
const plain = x => x !== null && typeof x === 'object' && !Array.isArray(x)
const EDGE_SYNTHESIS_BUDGET_MS = 21000
const EDGE_PLAYBACK_BUDGET_MS = 120000
export function ttsSettings(raw) {
  const value = { ...TTS_DEFAULTS, ...(plain(raw) ? raw : {}) }
  return validateTtsSettings(value)
}
export function validateTtsSettings(value) {
  if (!plain(value) || Object.keys(value).length !== keys.length || keys.some(k => !Object.hasOwn(value, k)) || Object.keys(value).some(k => !keys.includes(k))) throw fault('TTS_INVALID_SETTINGS', '朗读设置字段无效')
  if (!['unconfigured', 'edge', 'deepseek', 'system', 'local', 'off'].includes(value.provider) || !EDGE_VOICES.includes(value.edgeVoice) || !['stella', 'tide'].includes(value.deepseekVoice)) throw fault('TTS_INVALID_SETTINGS', '朗读服务或音色无效')
  if (value.systemVoice !== null && (typeof value.systemVoice !== 'string' || !value.systemVoice.trim() || value.systemVoice.length > 256 || /[\x00-\x1f]/.test(value.systemVoice))) throw fault('TTS_INVALID_SETTINGS', '系统语音标识无效')
  if (typeof value.systemFallback !== 'boolean' || typeof value.edgeTextTransmissionAccepted !== 'boolean' || typeof value.deepseekTextTransmissionAccepted !== 'boolean' || typeof value.volume !== 'number' || !Number.isFinite(value.volume) || value.volume < 0 || value.volume > 1) throw fault('TTS_INVALID_SETTINGS', '朗读音量或同意选项无效')
  if (value.localModelId !== null && (typeof value.localModelId !== 'string' || !/^[a-zA-Z0-9._-]{1,128}$/.test(value.localModelId))) throw fault('TTS_INVALID_SETTINGS', '本地语音模型标识无效')
  if (value.localModelPath !== null && (typeof value.localModelPath !== 'string' || !isAbsolute(value.localModelPath) || /[\x00-\x1f]/.test(value.localModelPath))) throw fault('TTS_INVALID_SETTINGS', '本地语音模型目录无效')
  if (value.referenceAudioPath !== null && (typeof value.referenceAudioPath !== 'string' || value.referenceAudioPath.length > 4096 || !isAbsolute(value.referenceAudioPath) || /[\x00-\x1f]/.test(value.referenceAudioPath))) throw fault('TTS_INVALID_SETTINGS', '参考音频路径无效')
  // Kept for old saved configurations only. Sample-use responsibility is
  // acknowledged once in the owner usage agreement, not asserted per file.
  if (typeof value.referenceAudioAccepted !== 'boolean') throw fault('TTS_INVALID_SETTINGS', '参考音频设置无效')
  if (value.provider === 'edge' && value.edgeTextTransmissionAccepted !== true) throw fault('TTS_CONSENT_REQUIRED', '选择 Edge 前，请明确同意将朗读文本发送给微软。此接口由第三方实现，非微软官方支持 API。')
  if (value.provider === 'deepseek' && value.deepseekTextTransmissionAccepted !== true) throw fault('TTS_DEEPSEEK_CONSENT_REQUIRED', '选择 DeepSeek 在线朗读前，请明确同意将朗读文本发送给 DeepSeek。')
  // `system` and its voice/fallback switches remain in the stored schema for
  // compatibility, but no longer select or start a system speech engine.
  return { ...value, provider: value.provider === 'system' ? 'off' : value.provider, systemVoice: null, systemFallback: false }
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
/** Put the first complete sentence in its own bounded Edge request. */
export function splitEdgeTtsText(text) {
  const points = Array.from(text), chunks = []
  const sentenceEnd = /[。！？!?…]/u
  const closing = new Set(Array.from('”’\"\'」』】）)]}'))
  let start = 0
  while (start < points.length) {
    let end = start, chars = 0, bytes = 0
    while (end < points.length && chars + points[end].length <= 400 && bytes + Buffer.byteLength(points[end], 'utf8') <= 1200) {
      chars += points[end].length
      bytes += Buffer.byteLength(points[end], 'utf8')
      end++
    }
    if (end === start) throw fault('TTS_INVALID_TEXT', '朗读文本无效')
    const maxEnd = end
    const sentenceEnds = []
    for (let index = start; index < maxEnd; index++) {
      if (!sentenceEnd.test(points[index])) continue
      let boundary = index + 1
      while (boundary < maxEnd && closing.has(points[boundary])) boundary++
      while (boundary < maxEnd && /\s/u.test(points[boundary])) boundary++
      sentenceEnds.push(boundary)
    }
    if (!chunks.length && sentenceEnds.length) {
      const first = sentenceEnds[0]
      // Do not send a tiny acknowledgment as a complete utterance when the next
      // sentence is available in the same bounded request; its terminal contour
      // sounds abrupt when synthesized in isolation.
      end = first - start < 8 && sentenceEnds.length > 1 ? sentenceEnds[1]
        : first - start < 8 && maxEnd === points.length ? maxEnd : first
    }
    else if (maxEnd === points.length) end = maxEnd
    else if (sentenceEnds.length) end = sentenceEnds[sentenceEnds.length - 1]
    else {
      let boundary = -1
      for (let index = start; index < maxEnd; index++) if (/\s|[；;]/u.test(points[index])) boundary = index + 1
      end = boundary > start ? boundary : maxEnd
    }
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
        // Opt-in native helper codes only. Never expose subprocess stderr, paths,
        // endpoint IDs, or an arbitrary error message from child output.
        if (nativeAudioErrors && captureJson) {
          try {
            const value = JSON.parse((stdout + stdoutDecoder.end()).replace(/^\uFEFF/, ''))
            const messages = {
              AUDIO_OUTPUT_DEVICE_UNAVAILABLE: '所选输出设备已断开或不可用；已停止播放，未切换到其他设备',
              AUDIO_OUTPUT_DEVICE_INVALID: '输出设备设置无效，请重新选择',
              AUDIO_TOO_LONG: '音频超过本地播放时长上限',
              AUDIO_TOO_LARGE: '音频超过本地播放大小或时长上限',
              AUDIO_CLEANUP_FAILED: '音频组件未能正常释放设备，请重试',
            }
            if (value?.ok === false && Object.keys(value).every(key => ['ok', 'code'].includes(key)) && Object.hasOwn(messages, value.code))
              return finish(fault(value.code, messages[value.code]))
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

/** One PowerShell process per Edge reply. It is reused for all sentence files. */
function createEdgePlaybackSession({ script, volume, outputDevice, signal, spawnProcess = spawn }) {
  const ready = Promise.withResolvers()
  const closedPromise = Promise.withResolvers()
  closedPromise.promise.catch(() => {})
  let child, isReady = false, closed = false, ending = false, endAck = false
  let failure = null, stopping = null, possiblePlayback = false, settledClose = false
  let outputBytes = 0, tail = '', startTimer, playbackTimer, forceTimer, uncertainTimer
  const decoder = new StringDecoder('utf8')
  const pending = []
  const settleClose = error => {
    if (settledClose) return
    settledClose = true
    error ? closedPromise.reject(error) : closedPromise.resolve()
  }
  const rejectPending = error => {
    if (!isReady) ready.reject(error)
    for (const waiter of pending.splice(0)) waiter.reject(error)
  }
  const clearTimers = () => { clearTimeout(startTimer); clearTimeout(playbackTimer); clearTimeout(forceTimer); clearTimeout(uncertainTimer) }
  const stop = error => {
    if (closed || stopping) return
    stopping = error
    failure ??= error
    rejectPending(error)
    try { child.kill() } catch {}
    if (closed) return
    forceTimer = setTimeout(() => { try { child.kill('SIGKILL') } catch {} }, 750)
    uncertainTimer = setTimeout(() => {
      const uncertain = fault('TTS_TERMINATION_UNCONFIRMED', '未能确认朗读进程已停止；请关闭鱼应后重启宿主，暂不继续播放', { uncertain: true })
      failure = uncertain
      rejectPending(uncertain)
      clearTimers()
      signal?.removeEventListener('abort', onAbort)
      settleClose(uncertain)
    }, 1500)
  }
  const onAbort = () => stop(aborted())
  const failClosed = error => {
    if (failure) return
    failure = error
    rejectPending(error)
  }
  const fail = error => {
    failClosed(error)
    stop(error)
  }
  const onLine = line => {
    let value
    try { value = JSON.parse(line) } catch { fail(fault('TTS_INVALID_RESPONSE', '朗读组件返回结果无效')); return }
    if (!plain(value)) { fail(fault('TTS_INVALID_RESPONSE', '朗读组件返回结果无效')); return }
    if (!isReady) {
      if (value.ok === true && value.ready === true && Object.keys(value).every(key => ['ok', 'ready'].includes(key))) {
        isReady = true
        clearTimeout(startTimer)
        ready.resolve(value)
      } else {
        fail(fault('TTS_EDGE_PLAYBACK_UNAVAILABLE', '当前环境不支持 Edge 音频播放', { fallbackSafe: true }))
      }
      return
    }
    const waiter = pending.shift()
    if (!waiter) { fail(fault('TTS_INVALID_RESPONSE', '朗读组件返回结果无效')); return }
    const expected = waiter.expected
    if (value.ok === true && value[expected] === true && Object.keys(value).every(key => ['ok', expected].includes(key))) {
      if (expected === 'completed') endAck = true
      waiter.resolve(value)
      return
    }
    const code = waiter.kind === 'playback-start' ? 'TTS_EDGE_PLAYBACK_UNAVAILABLE' : 'TTS_PROCESS_FAILED'
    waiter.reject(fault(code, code === 'TTS_EDGE_PLAYBACK_UNAVAILABLE' ? '当前环境不支持 Edge 音频播放' : '朗读组件执行失败'))
    fail(fault(code, code === 'TTS_EDGE_PLAYBACK_UNAVAILABLE' ? '当前环境不支持 Edge 音频播放' : '朗读组件执行失败'))
  }
  const send = (value, expected, kind) => {
    if (failure || closed || ending && expected !== 'completed') return Promise.reject(failure ?? fault('TTS_PROCESS_FAILED', '朗读组件执行失败'))
    const waiter = Promise.withResolvers()
    pending.push({ ...waiter, expected, kind })
    try { child.stdin.write(`${JSON.stringify(value)}\n`, 'utf8') }
    catch { fail(fault('TTS_PROCESS_FAILED', '朗读组件执行失败')) }
    return waiter.promise
  }

  function start() {
    if (signal?.aborted) return Promise.reject(aborted())
    try {
      child = spawnProcess('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', script, '-EdgeStream'], {
        stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true, shell: false, env: localTtsProcessEnvironment(),
      })
    } catch { closed = true; settleClose(); return Promise.reject(fault('TTS_PROCESS_START_FAILED', '朗读组件无法启动')) }
    child.on('error', () => fail(fault(child.pid ? 'TTS_PROCESS_FAILED' : 'TTS_PROCESS_START_FAILED', '朗读组件无法启动')))
    child.stdin.on('error', () => fail(fault('TTS_PROCESS_FAILED', '朗读组件执行失败')))
    child.stderr.on('data', () => {})
    child.stdout.on('data', chunk => {
      if (failure || closed) return
      outputBytes += chunk.length
      if (outputBytes > 65536) { fail(fault('TTS_INVALID_RESPONSE', '朗读组件返回数据过大')); return }
      tail += decoder.write(chunk)
      if (tail.length > 8192) { fail(fault('TTS_INVALID_RESPONSE', '朗读组件返回数据过大')); return }
      let boundary
      while ((boundary = tail.indexOf('\n')) >= 0) {
        const line = tail.slice(0, boundary).replace(/\r$/u, '')
        tail = tail.slice(boundary + 1)
        if (!line || line.length > 8192) { fail(fault('TTS_INVALID_RESPONSE', '朗读组件返回结果无效')); return }
        onLine(line)
        if (failure) return
      }
    })
    child.on('close', code => {
      closed = true
      clearTimers()
      signal?.removeEventListener('abort', onAbort)
      if (stopping) { settleClose(); return }
      if (code === 0 && ending && endAck && !tail.trim()) { settleClose(); return }
      const error = fault('TTS_PROCESS_FAILED', '朗读组件执行失败')
      failClosed(error)
      settleClose()
    })
    signal?.addEventListener('abort', onAbort, { once: true })
    startTimer = setTimeout(() => stop(fault('TTS_TIMEOUT', '朗读服务超时')), 8000)
    if (signal?.aborted) onAbort()
    if (!stopping) {
      try { child.stdin.write(`${JSON.stringify({ op: 'edge-start', volume, outputDevice })}\n`, 'utf8') }
      catch { stop(fault('TTS_PROCESS_FAILED', '朗读组件执行失败')) }
    }
    return ready.promise
  }
  function play(path) {
    if (!isReady || ending) return Promise.reject(fault('TTS_PROCESS_FAILED', '朗读组件执行失败'))
    if (playbackTimer == null) playbackTimer = setTimeout(() => stop(fault('TTS_TIMEOUT', '朗读服务超时')), EDGE_SYNTHESIS_BUDGET_MS + EDGE_PLAYBACK_BUDGET_MS)
    possiblePlayback = true
    return send({ op: 'edge-play', path }, 'played', 'playback')
  }
  async function end() {
    if (!isReady || ending) throw fault('TTS_PROCESS_FAILED', '朗读组件执行失败')
    ending = true
    const reply = await send({ op: 'edge-end' }, 'completed', 'end')
    child.stdin.end()
    await closedPromise.promise
    return reply
  }
  async function abort(error) {
    if (!child) {
      closed = true
      clearTimers()
      signal?.removeEventListener('abort', onAbort)
      settleClose()
      return
    }
    stop(error)
    await closedPromise.promise
  }
  return { start, play, end, abort, get possiblePlayback() { return possiblePlayback } }
}

/** Windows native-media playback and device readiness. Non-Windows fails closed. */
export function createWindowsTtsAdapter({ platform = process.platform, outputDevice = () => null, runner = runTtsProcess, spawnProcess = spawn } = {}) {
  const script = fileURLToPath(new URL('./helper/tts_windows.ps1', import.meta.url))
  const edgeWorker = fileURLToPath(new URL('./voice-tts-edge-worker.mjs', import.meta.url))
  const edgeVendor = fileURLToPath(new URL('./vendor/edge-tts.cjs', import.meta.url))
  const powershell = (payload, options) => runner('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-File', script], payload, { ...options, nativeAudioErrors: true })
  const requireWindows = () => { if (platform !== 'win32') throw fault('TTS_PLATFORM_UNSUPPORTED', '本版原生朗读仅支持 Windows，未调用其他语音供应商') }
  const edgeWorkerAvailable = async () => {
    try {
      for (const path of [edgeWorker, edgeVendor]) {
        const info = await stat(path)
        if (!info.isFile()) return false
        await access(path, fsConstants.R_OK)
      }
      return true
    } catch { return false }
  }
  return {
    async inspect(signal, { checkEdgeDependency = true, checkPlayback = true } = {}) {
      if (platform !== 'win32') return { platform, playbackSupported: false, systemSupported: false, edgePlaybackSupported: false, edgeDependency: 'unchecked', installedChineseVoices: [], reason: 'windows-native-playback-required' }
      const outcomes = await Promise.allSettled([
        checkPlayback
          ? (async () => powershell({ op: 'voices' }, { signal, timeoutMs: 8000 }))().catch(error => { if (signal?.aborted || error?.uncertain) throw error; return { voices: [], edgePlaybackSupported: false, reason: error.code } })
          : Promise.resolve({ voices: [], edgePlaybackSupported: null, reason: null }),
        checkEdgeDependency ? edgeWorkerAvailable().then(available => ({ available })) : Promise.resolve(null),
      ])
      // Do not release the output lock until every inspection child has stopped.
      const failures = outcomes.filter(result => result.status === 'rejected')
      const failure = failures.find(result => result.reason?.uncertain) ?? failures[0]
      if (failure) throw failure.reason
      const [audio, edge] = outcomes.map(result => result.value)
      const playbackSupported = audio.edgePlaybackSupported === null ? null : audio.edgePlaybackSupported === true
      return { platform, playbackSupported, systemSupported: false, edgePlaybackSupported: playbackSupported, edgeDependency: checkEdgeDependency ? edge.available === true ? 'installed' : 'missing' : 'unchecked', installedChineseVoices: [], reason: audio.reason ?? null }
    },
    async edge(text, config, signal, onTiming) {
      requireWindows()
      const chunks = splitEdgeTtsText(text)
      if (!chunks.length || chunks.length > 180) throw fault('TTS_INVALID_TEXT', '朗读文本无效')
      const selectedOutput = outputDevice()
      const directory = await mkdtemp(join(tmpdir(), 'whale-tts-'))
      const player = createEdgePlaybackSession({ script, volume: config.volume, outputDevice: selectedOutput, signal, spawnProcess })
      const playerAbort = new AbortController()
      const combined = signal ? AbortSignal.any([signal, playerAbort.signal]) : playerAbort.signal
      const playbackFailure = Promise.withResolvers()
      playbackFailure.promise.catch(() => {})
      const activeSynthesis = new Set(), playbackAcks = []
      let firstPlaybackError = null, workerUncertainError = null, audioBytes = 0, audioDurationMs = 0, preserveDirectory = false
      const deadline = Date.now() + EDGE_SYNTHESIS_BUDGET_MS
      const synthesize = index => {
        const remaining = deadline - Date.now()
        if (remaining <= 0) return Promise.reject(fault('TTS_TIMEOUT', '朗读服务超时'))
        const path = join(directory, `speech-${index}.mp3`)
        const request = runner(process.execPath, [edgeWorker], { op: 'synthesize', text: chunks[index], voice: config.edgeVoice, output: path }, {
          signal: combined, timeoutMs: remaining, env: { ...localTtsProcessEnvironment(), ELECTRON_RUN_AS_NODE: '1' },
        }).then(async result => {
          if (result?.synthesized !== true || !Number.isSafeInteger(result.durationMs) || result.durationMs < 1) throw fault('TTS_INVALID_RESPONSE', '朗读组件返回结果无效')
          const file = await stat(path)
          if (!file.isFile() || file.size <= 0 || file.size > 10 * 1024 * 1024) throw fault('TTS_INVALID_AUDIO', '语音音频无效或过大')
          audioBytes += file.size
          audioDurationMs += result.durationMs
          if (audioBytes > 10 * 1024 * 1024 || audioDurationMs > EDGE_PLAYBACK_BUDGET_MS) throw fault('TTS_INVALID_AUDIO', '语音音频无效或过大')
          return path
        }).catch(error => {
          if (error?.uncertain) workerUncertainError ??= error
          throw error
        })
        activeSynthesis.add(request)
        request.finally(() => activeSynthesis.delete(request)).catch(() => {})
        request.catch(() => {})
        return request
      }
      const queuePlayback = path => {
        const ack = player.play(path).catch(error => {
          if (!firstPlaybackError) {
            firstPlaybackError = error
            playerAbort.abort(error)
            playbackFailure.reject(error)
          }
          throw error
        })
        ack.catch(() => {})
        playbackAcks.push(ack)
        return ack
      }
      try {
        await player.start()
        signal?.throwIfAborted()
        onTiming?.('player-ready')
        // One lookahead keeps at most two Edge workers active and lets the
        // second sentence synthesize while the first sentence is being made.
        const firstSynthesis = synthesize(0)
        const lookaheadSynthesis = chunks.length > 1 ? synthesize(1).then(path => ({ path }), error => ({ error })) : null
        const firstPath = await Promise.race([firstSynthesis, playbackFailure.promise])
        signal?.throwIfAborted()
        const firstAck = queuePlayback(firstPath)
        onTiming?.('first-segment-queued')
        if (lookaheadSynthesis) {
          const lookahead = await Promise.race([lookaheadSynthesis, playbackFailure.promise])
          if (lookahead.error) {
            await Promise.race([firstAck, playbackFailure.promise])
            await player.end()
            throw lookahead.error
          }
          queuePlayback(lookahead.path)
        }
        for (let index = 2; index < chunks.length; index++) {
          const path = await Promise.race([synthesize(index), playbackFailure.promise])
          queuePlayback(path)
        }
        await Promise.race([player.end(), playbackFailure.promise])
        return { ok: true, completed: true }
      } catch (error) {
        playerAbort.abort(error)
        let failure = error instanceof Error ? error : fault('TTS_EDGE_FAILED', 'Edge 朗读失败')
        preserveDirectory = !!failure.uncertain
        await Promise.allSettled([...activeSynthesis])
        if (workerUncertainError) { failure = workerUncertainError; preserveDirectory = true }
        try { await player.abort(failure) } catch (stopError) { if (stopError?.uncertain) { failure = stopError; preserveDirectory = true } }
        failure.fallbackSafe = !player.possiblePlayback && !failure.uncertain
        throw failure
      } finally { if (!preserveDirectory) await rm(directory, { recursive: true, force: true }).catch(() => {}) }
    },
    async play(path, config, signal) {
      requireWindows()
      return powershell({ op: 'play', path, volume: config.volume, outputDevice: outputDevice() }, { signal, timeoutMs: 120000 })
    },
  }
}

export function createTtsRuntime({ getConfig, adapter = createWindowsTtsAdapter(), localAdapter, localRuntimeModulePath, resolveManagedLocalTts, resolveDeepSeekApiKey, deepseekAdapter, outputDevice = () => null, getResidencyMode, now = Date.now } = {}) {
  if (typeof getConfig !== 'function') throw new Error('TTS requires an effective-config reader')
  // Only our managed adapter verifies every chunk itself. Injected adapters keep
  // their existing inspection contract, and a missing resolver still fails closed.
  const managedLocal = localAdapter == null && typeof resolveManagedLocalTts === 'function'
  const deepseek = deepseekAdapter ?? createDeepSeekTtsAdapter({ resolveDeepSeekApiKey, outputDevice })
  const localOptions = { getResidencyMode, runner: runTtsProcess, playback: adapter.play?.bind(adapter), modulePath: localRuntimeModulePath }
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
  const edgeTextOnlyReasons = new Set([
    'TTS_EDGE_DEPENDENCY_MISSING', 'TTS_EDGE_PLAYBACK_UNAVAILABLE', 'TTS_PROCESS_START_FAILED',
    'TTS_PROCESS_FAILED', 'TTS_INVALID_RESPONSE', 'TTS_TIMEOUT', 'TTS_INVALID_AUDIO',
    'TTS_EDGE_SYNTHESIS_FAILED', 'TTS_EDGE_PREFLIGHT_FAILED', 'TTS_EDGE_FAILED',
  ])
  const edgeErrorsToPreserve = new Set([
    'TTS_BLOCKED', 'TTS_BUSY', 'TTS_CANCELLED', 'TTS_CONFIG_CHANGED', 'TTS_CONSENT_REQUIRED',
    'TTS_COMPLETION_UNCONFIRMED', 'TTS_INVALID_SETTINGS', 'TTS_INVALID_TEXT',
    'TTS_NOT_CONFIGURED', 'TTS_PLATFORM_UNSUPPORTED', 'TTS_TERMINATION_UNCONFIRMED',
  ])
  function edgeTextOnly(error, signal, config) {
    if (error?.uncertain || error?.fallbackSafe === false || signal?.aborted || edgeErrorsToPreserve.has(error?.code)) throw error
    if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
    const reason = edgeTextOnlyReasons.has(error?.code) ? error.code : 'TTS_EDGE_FAILED'
    publish({ state: 'text-only', provider: 'edge', fallback: false, reason })
    return { provider: 'edge', textOnly: true, fallback: false, playbackCompleted: false, acousticConfirmation: false, reason }
  }
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
        const reason = combined.aborted && !error?.uncertain ? 'TTS_CANCELLED' : error?.code ?? defaultReason
        publish({ state: locked ? 'blocked' : combined.aborted ? 'cancelled' : 'failed', reason })
        throw fault(reason, reason === 'TTS_CANCELLED' ? '朗读已取消' : error?.message ?? '朗读操作失败', error?.uncertain ? { uncertain: true } : {})
      } finally { if (active === current) active = null }
    }
    execute().then(resolve, reject)
    return promise
  }
  async function inspectCapabilities(config, signal, { checkEdgeDependency = true, checkLocal = true, checkPlayback = true, checkDeepSeekKey = false } = {}) {
    assertRunning(signal)
    const capabilities = await adapter.inspect(signal, { checkEdgeDependency, checkPlayback })
    assertRunning(signal)
    const localInfo = config.provider === 'local' && checkLocal ? await local.inspect(config, signal) : { localRuntime: 'unchecked', localSynthesisSupported: false }
    assertRunning(signal)
    const deepseekKeyAvailable = checkDeepSeekKey ? await deepseek.keyAvailable(signal) : undefined
    if (checkDeepSeekKey) assertRunning(signal)
    if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
    inspection = capabilities
    return { ...capabilities, ...localInfo, ...(checkDeepSeekKey ? { deepseekKeyAvailable } : {}), edgeOfficialApi: false, edgeRecipient: 'Microsoft', edgePurpose: 'speech-synthesis', autoDownload: false, gpuSupported: localInfo.localComputeVerified === true && ['vulkan','cuda','hip'].includes(localInfo.localComputeBackend), executionTargets: { edge: 'microsoft-service', deepseek: 'deepseek-api', system: 'unsupported', local: localInfo.localComputeBackend ? `local-${localInfo.localComputeBackend}` : 'local-unverified' } }
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
  function speak(text, { signal, onTiming } = {}) {
    return operate(signal, async combined => {
      if (typeof text !== 'string' || !text.trim() || text.length > 4000) throw fault('TTS_INVALID_TEXT', '朗读文本应为 1 至 4000 个字符')
      const config = ttsSettings(getConfig())
      if (['unconfigured', 'off'].includes(config.provider)) throw fault('TTS_NOT_CONFIGURED', '请用文字回答。可在鱼应设置中安装本地语音模型或选择朗读服务。')
      publish({ state: 'preparing', provider: config.provider, fallback: false, reason: null, localTimings:null,localComputeRequested:null,localComputeBackend:null,localComputeDevice:null,localComputeVerified:false,localComputeFallback:false,localComputeReason:null })
      // Speech checks only its selected provider; public inspection still diagnoses every dependency.
      // Managed speech verifies artifacts in each local.speak, not twice for the
      // first chunk. This skips diagnostics, not verification or a cached lease.
      let capabilities
      try {
        capabilities = await inspectCapabilities(config, combined, { checkEdgeDependency: config.provider === 'edge', checkLocal: !managedLocal, checkPlayback: config.provider !== 'edge' })
      } catch (error) {
        if (config.provider === 'edge') return edgeTextOnly(error, combined, config)
        throw error
      }
      assertRunning(combined)
      if (config.provider === 'local') {
        if (!capabilities.playbackSupported) throw fault('TTS_PLATFORM_UNSUPPORTED', '当前环境没有受支持的原生播放组件')
        if (!managedLocal && !capabilities.localReady && !capabilities.localSynthesisSupported) throw fault(capabilities.localReason ?? 'TTS_LOCAL_UNAVAILABLE', '本地语音模型尚未加载成功，请检查模型与运行组件')
        if (capabilities.edgePlaybackSupported === false) throw fault('TTS_LOCAL_PLAYBACK_UNAVAILABLE', '当前环境不支持本地音频播放')
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
      if (config.provider === 'edge') {
        try {
          if (capabilities.reason === 'windows-native-playback-required') throw fault('TTS_PLATFORM_UNSUPPORTED', '当前平台不支持 Edge 原生音频播放')
          if (capabilities.playbackSupported === false || capabilities.edgePlaybackSupported === false) throw fault('TTS_EDGE_PLAYBACK_UNAVAILABLE', '当前环境不支持 Edge 音频播放', { fallbackSafe: true })
          if (capabilities.edgeDependency !== 'installed') throw fault('TTS_EDGE_DEPENDENCY_MISSING', '未检测到已安装的 edge-tts 组件', { fallbackSafe: true })
          // The only network boundary. Consent is validated again immediately before it.
          const latest = ttsSettings(getConfig())
          if (JSON.stringify(latest) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
          assertRunning(combined)
          publish({ state: 'synthesizing', provider: 'edge' })
          assertRunning(combined)
          const result = await adapter.edge(text, config, combined, onTiming)
          assertRunning(combined)
          if (result?.completed !== true) throw fault('TTS_COMPLETION_UNCONFIRMED', '未能确认朗读完成')
          publish({ state: 'completed', provider: 'edge', fallback: false })
          return { provider: 'edge', fallback: false, playbackCompleted: true, acousticConfirmation: false }
        } catch (error) { return edgeTextOnly(error, combined, config) }
      }
      if (config.provider === 'deepseek') {
        if (capabilities.playbackSupported !== true) throw fault('TTS_PLATFORM_UNSUPPORTED', '当前环境不支持 DeepSeek 原生音频播放')
        if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
        assertRunning(combined)
        publish({ state: 'synthesizing', provider: 'deepseek' })
        const result = await deepseek.synthesize({ text, voice: config.deepseekVoice, volume: config.volume, signal: combined })
        assertRunning(combined)
        if (JSON.stringify(ttsSettings(getConfig())) !== JSON.stringify(config)) throw fault('TTS_CONFIG_CHANGED', '朗读设置已改变，请重新开始')
        if (result?.completed !== true) throw fault('TTS_COMPLETION_UNCONFIRMED', '未能确认 DeepSeek 朗读完成')
        publish({ state: 'completed', provider: 'deepseek', fallback: false })
        return { provider: 'deepseek', fallback: false, playbackCompleted: true, acousticConfirmation: false, ...(Number.isSafeInteger(result.bytes) ? { audioBytes: result.bytes } : {}), ...(Number.isFinite(result.audioSeconds) ? { audioSeconds: result.audioSeconds } : {}) }
      }
      throw fault('TTS_NOT_CONFIGURED', '请用文字回答。可在鱼应设置中安装本地语音模型或选择朗读服务。')
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
