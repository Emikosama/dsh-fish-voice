/** Offline synthesis. Native loading and inference stay in a killable child process. */
import { createResidentTtsLease } from './voice-tts-resident.mjs'
import { createQwenResidentSession } from './voice-qwen-stream.mjs'
import { constants } from 'node:fs'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { open, lstat, realpath, mkdtemp, rm, readFile, writeFile } from 'node:fs/promises'
import { join, isAbsolute, relative, sep, dirname, normalize, parse } from 'node:path'
import { tmpdir, availableParallelism } from 'node:os'
import { fileURLToPath } from 'node:url'
import { qwenComputePreference, qwenRuntimeCandidates, parseQwenGpuDevices, qwenComputeArgs, qwenCanRetryCpu } from './voice-qwen-gpu.mjs'
export const LOCAL_TTS_MODEL_ID = 'vits-melo-tts-zh_en-int8'
// Exact upstream asset sizes, independently hashed by the managed installer.
export const LOCAL_TTS_ASSETS = Object.freeze({
  'model.int8.onnx': 53517430, 'lexicon.txt': 6837671, 'tokens.txt': 655,
  'date.fst': 59154, 'number.fst': 64482, 'phone.fst': 88630, 'new_heteronym.fst': 21974,
  'dict/hmm_model.utf8': 519739, 'dict/idf.utf8': 5998717, 'dict/jieba.dict.utf8': 5071204,
  'dict/stop_words.utf8': 8974, 'dict/user.dict.utf8': 49,
  'dict/pos_dict/char_state_tab.utf8': 327139, 'dict/pos_dict/prob_emit.utf8': 1687686,
  'dict/pos_dict/prob_start.utf8': 4347, 'dict/pos_dict/prob_trans.utf8': 124159,
})
const fault = (code, message) => Object.assign(new Error(message), { code })
// Keep every Qwen probe, utterance and pre-playback CPU retry on one repeatable
// sampling baseline. A fixed seed is not a cross-device audio identity guarantee.
const QWEN_SAMPLING_ARGS = Object.freeze(['--temp', '0.8', '--top-k', '40', '--top-p', '0.95', '--seed', '42'])
export async function validateLocalTtsAssets(directory) {
  if (typeof directory !== 'string' || !isAbsolute(directory) || /[\x00-\x1f]/.test(directory)) throw fault('TTS_LOCAL_MODEL_MISSING', '请先下载推荐语音模型')
  const root = await realpath(directory)
  if (!(await lstat(directory)).isDirectory()) throw fault('TTS_LOCAL_MODEL_INVALID', '语音模型目录无效')
  for (const [name, size] of Object.entries(LOCAL_TTS_ASSETS)) {
    const path = join(root, name), resolved = await realpath(path), rel = relative(root, resolved)
    const info = await lstat(path)
    if (!info.isFile() || info.isSymbolicLink() || info.size !== size || rel.startsWith(`..${sep}`) || rel === '..' || isAbsolute(rel)) throw fault('TTS_LOCAL_MODEL_INVALID', '语音模型文件不完整，请重新下载')
  }
  return root
}
/** Validate container, format, duration and payload before handing a WAV to playback. */
export function validateLocalTtsWav(wav, { reference = false } = {}) {
  const invalid = () => { throw fault('TTS_INVALID_AUDIO', '本地语音音频无效') }
  if (!Buffer.isBuffer(wav) || wav.length < 46 || wav.toString('ascii', 0, 4) !== 'RIFF' || wav.toString('ascii', 8, 12) !== 'WAVE' || wav.readUInt32LE(4) !== wav.length - 8) invalid()
  let format, dataStart, dataBytes = 0, at = 12
  for (; at + 8 <= wav.length;) {
    const name = wav.toString('ascii', at, at + 4), length = wav.readUInt32LE(at + 4), end = at + 8 + length
    if (end > wav.length) invalid()
    if (name === 'fmt ') {
      if (length < 16 || format) invalid()
      format = { encoding: wav.readUInt16LE(at + 8), channels: wav.readUInt16LE(at + 10), rate: wav.readUInt32LE(at + 12), byteRate: wav.readUInt32LE(at + 16), block: wav.readUInt16LE(at + 20), bits: wav.readUInt16LE(at + 22) }
    }
    if (name === 'data') {
      if (dataStart !== undefined) invalid()
      dataStart = at + 8
      dataBytes = length
    }
    at = end + (length % 2)
  }
  if (at !== wav.length) invalid()
  if (!format || ![1, 3].includes(format.encoding) || !(reference ? [1, 2] : [1]).includes(format.channels) || format.rate < 8000 || format.rate > 96000 || !(reference ? (format.encoding === 3 ? [32, 64] : [8, 16, 24, 32]) : [16, 32]).includes(format.bits) || (format.encoding === 3 && !reference && format.bits !== 32) || format.block !== format.bits / 8 * format.channels || format.byteRate !== format.rate * format.block || !dataBytes || dataBytes % format.block || dataBytes / format.byteRate > (reference ? 30 : 300)) invalid()
  if (format.encoding === 3) {
    for (let i = dataStart; i < dataStart + dataBytes; i += format.bits / 8) {
      if (!Number.isFinite(format.bits === 32 ? wav.readFloatLE(i) : wav.readDoubleLE(i))) invalid()
    }
  }
  return { audioSeconds: dataBytes / format.byteRate, sampleRate: format.rate }
}
// Bound reads before allocation. Never give the native process an owner-controlled path.
export const REFERENCE_AUDIO_MAX_BYTES = 12 * 1024 * 1024
const referenceFault = () => fault('TTS_REFERENCE_AUDIO_INVALID', '所选参考音频无效或已改变，请重新选择普通 WAV 文件（单/双声道，最长 30 秒）')
export async function readLocalReferenceAudio(path) {
  let handle
  try {
    if (typeof path !== 'string' || path.length > 4096 || !isAbsolute(path) || normalize(path) !== path || /[\x00-\x1f]/.test(path) || !/\.wav$/i.test(path)) throw referenceFault()
    const root = parse(path).root
    // UNC/device namespaces can read remote data or bypass ordinary filesystem semantics.
    if (process.platform === 'win32' && (!/^[A-Za-z]:\\$/.test(root) || /[<>"|?*]/.test(path.slice(root.length)) || path.slice(root.length).includes(':'))) throw referenceFault()
    const chain = async () => {
      const entries = []
      let current = root
      for (const part of path.slice(root.length).split(sep)) {
        current = join(current, part)
        const info = await lstat(current)
        if (info.isSymbolicLink() || (current === path ? !info.isFile() : !info.isDirectory())) throw referenceFault()
        entries.push([current, info.dev, info.ino])
      }
      // Junctions/reparse redirects must also resolve to this same ordinary path.
      const resolved = await realpath(path)
      if (process.platform === 'win32' ? resolved.toLowerCase() !== path.toLowerCase() : resolved !== path) throw referenceFault()
      return JSON.stringify(entries)
    }
    const before = await chain()
    const info = await lstat(path)
    if (info.size < 46 || info.size > REFERENCE_AUDIO_MAX_BYTES) throw referenceFault()
    handle = await open(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0))
    const opened = await handle.stat()
    if (!opened.isFile() || opened.dev !== info.dev || opened.ino !== info.ino || opened.size !== info.size) throw referenceFault()
    const bytes = Buffer.alloc(info.size)
    let offset = 0
    while (offset < bytes.length) {
      const { bytesRead } = await handle.read(bytes, offset, bytes.length - offset, offset)
      if (!bytesRead) throw referenceFault()
      offset += bytesRead
    }
    const after = await handle.stat()
    if (after.size !== opened.size || after.mtimeMs !== opened.mtimeMs || after.ctimeMs !== opened.ctimeMs || await chain() !== before) throw referenceFault()
    validateLocalTtsWav(bytes, { reference: true })
    return { path, bytes, signature: createHash('sha256').update(bytes).digest('hex') }
  } catch { throw referenceFault() }
  finally { await handle?.close() }
}
/** Resolve only through the ordinary package loader or an explicit host-provided package anchor. */
export function resolveLocalTtsModule(anchor = import.meta.url) {
  try { return createRequire(anchor).resolve('sherpa-onnx-node') } catch { return null }
}
export function createLocalTtsAdapter({ runner, playback, modulePath = () => resolveLocalTtsModule(), executable = process.execPath } = {}) {
  const helper = fileURLToPath(new URL('./voice-tts-local-worker.mjs', import.meta.url))
  const invoke = (payload, signal) => runner(executable, [helper], payload, { signal, timeoutMs: 120000, env: { ...localTtsProcessEnvironment(), ELECTRON_RUN_AS_NODE: '1' } })
  const request = async config => {
    if (config.referenceAudioPath != null) throw fault('TTS_REFERENCE_VOICE_UNSUPPORTED', '当前本地模型不支持参考音色')
    if (config.localModelId !== LOCAL_TTS_MODEL_ID) throw fault('TTS_LOCAL_MODEL_UNSUPPORTED', '尚未选择受支持的本地语音模型')
    const directory = await validateLocalTtsAssets(config.localModelPath)
    const entry = typeof modulePath === 'function' ? await modulePath() : modulePath
    if (!entry || !isAbsolute(entry) || !(await lstat(entry)).isFile()) throw fault('TTS_LOCAL_RUNTIME_MISSING', '宿主缺少本地语音运行组件')
    return { directory, modulePath: entry }
  }
  return {
    async inspect(config, signal) {
      try {
        await request(config); signal?.throwIfAborted()
        return { localModelId: config.localModelId, localAssetsReady: true, localRuntime: 'ready', localReady: true, localSynthesisSupported: false, synthesisVerified: false, modelResident: false }
      } catch (error) {
        if (signal?.aborted || error.uncertain) throw error
        return { localModelId: config.localModelId, localRuntime: 'unavailable', localSynthesisSupported: false, localReason: error.code ?? 'TTS_LOCAL_MODEL_INVALID' }
      }
    },
    async probe(config, signal) {
      return this.synthesize('你好。', config, signal, async (_path, result) => ({ localModelId: config.localModelId, localRuntime: 'ready', localReady: true, localSynthesisSupported: true, synthesisVerified: true, modelResident: false, localSampleRate: result.sampleRate }))
    },
    async synthesize(text, config, signal, consume) {
      const payload = await request(config)
      signal?.throwIfAborted()
      const directory = await mkdtemp(join(tmpdir(), 'whale-local-tts-'))
      try {
        const path = join(directory, 'speech.wav')
        const result = await invoke({ ...payload, op: 'synthesize', text, output: path }, signal)
        signal?.throwIfAborted()
        const info = await lstat(path)
        if (!info.isFile() || info.isSymbolicLink() || info.size < 46 || info.size > 12 * 1024 * 1024 || result.synthesized !== true) throw fault('TTS_INVALID_AUDIO', '本地语音音频无效')
        const wav = await readFile(path)
        validateLocalTtsWav(wav)
        return await consume(path, result)
      } finally { await rm(directory, { recursive: true, force: true }).catch(() => {}) }
    },
    async speak(text, config, signal) {
      if (typeof playback !== 'function') throw fault('TTS_PLATFORM_UNSUPPORTED', '当前环境没有受支持的原生播放组件')
      return this.synthesize(text, config, signal, path => playback(path, config, signal))
    },
  }
}

/** The resolver is trusted host code, not settings: it verifies pinned installer artifacts. */
export function localTtsProcessEnvironment(source = process.env) {
  // Forward OS essentials, not shell/loader hooks, model hub credentials or host secrets.
  const allowed = new Set(['PATH', 'SystemRoot', 'SYSTEMROOT', 'WINDIR', 'TEMP', 'TMP', 'TMPDIR', 'HOME', 'USERPROFILE', 'LANG', 'LC_ALL', 'LC_CTYPE', 'NUMBER_OF_PROCESSORS', 'PROCESSOR_ARCHITECTURE'])
  return Object.fromEntries(Object.entries(source).filter(([key]) => allowed.has(key)))
}
export function createManagedLocalTtsAdapter({ runner, playback, resolveManagedLocalTts, getResidencyMode, createResidentSession = createQwenResidentSession, launchServer, clock = () => performance.now() } = {}) {
  let verifiedProbe = null, lastCompute = null, failedGpuSignature = null, verifiedGpuRuntime = null, failedResidentSignature = null, failedResidentBaseSignature = null
  const resident = createResidentTtsLease({ createSession: createResidentSession, getMode: getResidencyMode })
  const launch = launchServer ?? (async (descriptor, options) => {
    const { createVerifiedQwenServerLauncher } = await import('./voice-qwen-server.mjs')
    return createVerifiedQwenServerLauncher({ resolveDescriptor: async () => descriptor })(options)
  })
  const residentSpeak = async (value, config, text, signal, started) => {
    if (typeof text !== 'string' || !text.trim() || text.length > 400 || Buffer.byteLength(text, 'utf8') > 1200) throw fault('TTS_INVALID_TEXT', '本地朗读文本过长')
    const requested = qwenComputePreference(config, value)
    const reference = await referenceFor(config)
    const signature = await signatureOf(value, reference, requested)
    const supplements = [value.serverRuntime, ...(value.runtimeCandidates ?? []).map(candidate => candidate.serverRuntime)].filter(Boolean)
    const startupSignature = JSON.stringify([signature, config, await Promise.all(supplements.map(async supplement => {
      const info = await lstat(supplement.archivePath)
      if (!info.isFile() || info.isSymbolicLink()) throw fault('TTS_LOCAL_RUNTIME_MISSING', '本地语音运行文件缺失')
      return [supplement, info.size, info.mtimeMs, info.ctimeMs, info.dev, info.ino]
    }))])
    if (failedResidentSignature === startupSignature) {
      failedGpuSignature = signature
      await resident.close()
      return { fallbackToCli: true, reference }
    }
    if (failedResidentSignature !== null) {
      if (failedGpuSignature === failedResidentBaseSignature) failedGpuSignature = null
      failedResidentSignature = failedResidentBaseSignature = null
    }
    const preparationMs = elapsed(started), deviceStarted = clock()
    const selected = verifiedGpuRuntime?.signature === signature ? { ...verifiedGpuRuntime.selected } : await selectRuntime(value, requested, signal)
    const deviceSelectionMs = elapsed(deviceStarted)
    const supplement = selected.backend === 'cpu' ? value.serverRuntime : qwenRuntimeCandidates(value, requested).find(candidate => candidate.executable === selected.executable)?.serverRuntime
    // A missing supplement preserves the verified CLI behavior. Never substitute
    // a CPU archive for a GPU backend selected from a different installed runtime.
    if (!supplement) { await resident.close(); return null }
    if (supplement.backend !== selected.backend) throw fault('TTS_LOCAL_COMPUTE_INVALID', '本地语音运行组件不匹配')
    const archive = await lstat(supplement.archivePath)
    if (!archive.isFile() || archive.isSymbolicLink()) throw fault('TTS_LOCAL_RUNTIME_MISSING', '本地语音运行文件缺失')
    const key = JSON.stringify([signature, config, supplement, archive.size, archive.mtimeMs, archive.ctimeMs, selected.backend, selected.device])
    let playbackMs = 0, synthesisMs = 0
    const synthesisStarted = clock()
    let result
    try {
    result = await resident.speak(key, { text, mode: 'wav', lang: 'zh', referenceAudio: reference?.bytes, signal, volume: config.volume }, {
      launchVerifiedServer: options => launch({ ...supplement, model: value.model, mmproj: value.mmproj, backend: selected.backend, device: selected.device }, options),
      startWavPlayback: ({ wav, signal: playbackSignal }) => {
        const controller = new AbortController()
        const combined = AbortSignal.any([controller.signal, playbackSignal])
        let uncertain = false, directory
        // Return ownership before any I/O: cancel joins preparation and playback.
        const done = Promise.resolve().then(async () => {
          combined.throwIfAborted()
          synthesisMs = elapsed(synthesisStarted)
          directory = await mkdtemp(join(tmpdir(), 'whale-resident-wav-'))
          const path = join(directory, 'speech.wav')
          await writeFile(path, wav, { flag: 'wx', mode: 0o600 })
          combined.throwIfAborted()
          const playbackStarted = clock()
          try {
            const played = await playback(path, config, combined)
            if (played?.completed !== true) throw Object.assign(fault('TTS_COMPLETION_UNCONFIRMED', '未能确认朗读完成'), { uncertain: true })
          } finally { playbackMs = elapsed(playbackStarted) }
        }).catch(cause => { uncertain = !!cause?.uncertain; throw cause }).finally(async () => {
          if (directory && !uncertain) await rm(directory, { recursive: true, force: true }).catch(() => {})
        })
        return { done, async cancel() { controller.abort(); try { await done } catch (cause) { if (cause?.uncertain) throw cause } } }
      },
    })
    } catch (cause) {
      if (selected.backend === 'cpu' || signal?.aborted || cause?.uncertain || cause?.requestStarted !== false || cause?.outputCommitted !== false || cause?.startupClosed !== true || !['TTS_TIMEOUT', 'TTS_PROCESS_START_FAILED', 'TTS_PROCESS_FAILED', 'TTS_GPU_OFFLOAD_UNCONFIRMED'].includes(cause.code)) throw cause
      // The lease already joined the failed server's close. Retry the same
      // reference snapshot once through the existing CPU CLI, never GPU again.
      failedResidentSignature = startupSignature
      failedResidentBaseSignature = failedGpuSignature = signature
      verifiedGpuRuntime = null
      return { fallbackToCli: true, reference, synthesisMs: elapsed(synthesisStarted) }
    }
    if (result.completion !== 'complete') throw fault('TTS_COMPLETION_UNCONFIRMED', '未能确认朗读完成')
    const status = resident.residency(), native = status.compute
    const verified = native?.backend === selected.backend && (selected.backend === 'cpu' || native.gpuOffloadConfirmed === true && native.gpuLayers > 0)
    if (!verified) { await resident.close(); throw fault('TTS_GPU_OFFLOAD_UNCONFIRMED', '未能确认本地计算设备') }
    const compute = computeStatus(requested, selected, selected.fallbackReason, true)
    lastCompute = { signature, ...compute }
    if (selected.backend !== 'cpu') verifiedGpuRuntime = { signature, selected: { ...selected } }
    return { completed: true, ...compute, localTimings: { preparationMs, deviceSelectionMs, synthesisMs, playbackMs, totalMs: elapsed(started), chunks: 1, modelResident: status.modelResident } }
  }
  const elapsed = started => Math.max(0, Math.round(clock() - started))
  const descriptor = async (config, signal) => {
    const value = await resolveManagedLocalTts(config, signal)
    if (!value || value.modelId !== config.localModelId || !['sherpa-melo', 'llama-qwen3'].includes(value.engine)) throw fault('TTS_LOCAL_MODEL_UNSUPPORTED', '本地语音模型与运行组件不匹配')
    if (value.engine === 'llama-qwen3') {
      const candidates = qwenRuntimeCandidates(value, qwenComputePreference(config, value))
      for (const path of [value.executable, value.model, value.mmproj, ...candidates.map(c => c.executable)]) {
        if (typeof path !== 'string' || !isAbsolute(path)) throw fault('TTS_LOCAL_RUNTIME_MISSING', '本地语音运行文件缺失')
        const info = await lstat(path)
        if (!info.isFile() || info.isSymbolicLink()) throw fault('TTS_LOCAL_RUNTIME_MISSING', '本地语音运行文件缺失')
      }
    }
    if (config.referenceAudioPath != null && value.engine !== 'llama-qwen3') throw fault('TTS_REFERENCE_VOICE_UNSUPPORTED', '当前本地模型不支持参考音色')
    return value
  }
  const signatureOf = async (value, reference, requested) => JSON.stringify([requested, value.runtimeId ?? null, await Promise.all([value.executable, value.model, value.mmproj, ...qwenRuntimeCandidates(value, requested).map(c => c.executable)].map(async path => { const info = await lstat(path); return [path, info.size, info.mtimeMs, info.ctimeMs, info.dev, info.ino] })), qwenRuntimeCandidates(value, requested).map(c => [c.backend, c.runtimeId]), reference ? [reference.path, reference.signature] : null])
  const selectRuntime = async (value, requested, signal) => {
    const candidates = qwenRuntimeCandidates(value, requested)
    for (const candidate of candidates) {
      signal?.throwIfAborted()
      try {
        const result = await runner(candidate.executable, ['--offline', '--list-devices'], null, { signal, timeoutMs: 15000, captureJson: false, captureText: true, maxOutput: 65536, cwd: dirname(candidate.executable), env: localTtsProcessEnvironment() })
        signal?.throwIfAborted()
        const device = parseQwenGpuDevices(result.stdout, candidate.backend)[0]?.device
        if (device) return { ...candidate, device, fallbackReason: null }
      } catch (error) { if (!qwenCanRetryCpu(error, signal)) throw error }
    }
    return { executable: value.executable, backend: 'cpu', device: null, fallbackReason: requested === 'cpu' ? null : candidates.length ? 'TTS_GPU_UNAVAILABLE' : 'TTS_GPU_RUNTIME_MISSING' }
  }
  const computeStatus = (requested, selected, fallbackReason, verified) => ({ localComputeRequested: requested, localComputeBackend: selected.backend, localComputeDevice: selected.device, localComputeVerified: verified, localComputeFallback: requested !== 'cpu' && selected.backend === 'cpu', localComputeReason: fallbackReason })
  const referenceFor = config => config.referenceAudioPath == null ? null : readLocalReferenceAudio(config.referenceAudioPath)
  const synthesizeQwen = async (value, config, text, signal, consume, started = clock(), referenceSnapshot, priorSynthesisMs = 0) => {
    if (typeof text !== 'string' || !text.trim() || text.length > 400 || Buffer.byteLength(text, 'utf8') > 1200) throw fault('TTS_INVALID_TEXT', '本地朗读每段最多 400 个字符及 1200 字节，请分段朗读')
    signal?.throwIfAborted()
    const requested = qwenComputePreference(config, value)
    const directory = await mkdtemp(join(tmpdir(), 'whale-qwen-tts-'))
    let uncertain = false
    try {
      const prompt = join(directory, 'prompt.txt')
      await writeFile(prompt, text, { flag: 'wx', mode: 0o600 })
      const reference = referenceSnapshot === undefined ? await referenceFor(config) : referenceSnapshot
      const referenceArgs = []
      if (reference) {
        const snapshot = join(directory, 'reference.wav')
        await writeFile(snapshot, reference.bytes, { flag: 'wx', mode: 0o600 })
        referenceArgs.push('--tts-speaker-file', snapshot)
      }
      const signature = await signatureOf(value, reference, requested)
      // A failed GPU must not impose the same timeout on every following text chunk.
      // Model/runtime/config/reference identity changes allow a fresh attempt.
      if (failedGpuSignature !== signature) failedGpuSignature = null
      if (verifiedGpuRuntime?.signature !== signature) verifiedGpuRuntime = null
      const preparationMs = Math.max(0, elapsed(started) - priorSynthesisMs), deviceStarted = clock()
      // A previous complete synthesis proves this fixed runtime/device can work.
      // Reuse only its selection, never its model verification or GPU success claim.
      // A vanished/busy device still fails in synthesis and follows the CPU boundary.
      let selected = failedGpuSignature === signature
        ? { executable: value.executable, backend: 'cpu', device: null, fallbackReason: failedResidentBaseSignature === signature ? 'TTS_GPU_STARTUP_FAILED' : 'TTS_GPU_SYNTHESIS_FAILED' }
        : verifiedGpuRuntime?.signature === signature
          ? { ...verifiedGpuRuntime.selected }
          : await selectRuntime(value, requested, signal)
      const deviceSelectionMs = elapsed(deviceStarted)
      let fallbackReason = selected.fallbackReason, synthesisMs = priorSynthesisMs
      for (let attempt = 0; attempt < 2; attempt++) {
        signal?.throwIfAborted()
        const output = join(directory, `speech-${attempt}.wav`)
        let completed = false, wav
        const synthesisStarted = clock()
        try {
          const completion = await runner(selected.executable, ['--offline', '--no-escape', '-c', '4096', '-t', String(Math.min(4, availableParallelism())), '-m', value.model, '--mmproj', value.mmproj, '-f', prompt, '--tts-lang', 'zh', ...QWEN_SAMPLING_ARGS, ...qwenComputeArgs(selected.backend, selected.device), '-n', '2048', '--output', output, ...referenceArgs], null,
            { signal, timeoutMs: 300000, captureJson: false, captureCompute: true, cwd: dirname(selected.executable), env: localTtsProcessEnvironment() })
          completed = true
          signal?.throwIfAborted()
          if (!Number.isInteger(completion.audioFrames) || completion.audioFrames < 1 || completion.audioFrames >= 2048) throw fault('TTS_COMPLETION_UNCONFIRMED', '本地语音生成未确认完整结束')
          if (selected.backend !== 'cpu' && (!Number.isInteger(completion.gpuLayers) || completion.gpuLayers < 1)) throw fault('TTS_GPU_OFFLOAD_UNCONFIRMED', '未能确认显卡参与本地语音生成')
          const info = await lstat(output).catch(() => { throw fault('TTS_INVALID_AUDIO', '本地语音音频无效') })
          if (!info.isFile() || info.isSymbolicLink() || info.size < 46 || info.size > 32 * 1024 * 1024) throw fault('TTS_INVALID_AUDIO', '本地语音音频无效')
          wav = await readFile(output)
          validateLocalTtsWav(wav)
        } catch (error) {
          if (attempt || selected.backend === 'cpu' || !qwenCanRetryCpu(error, signal, { completed })) throw error
          signal?.throwIfAborted()
          failedGpuSignature = signature
          verifiedGpuRuntime = null
          selected = { executable: value.executable, backend: 'cpu', device: null }
          fallbackReason = 'TTS_GPU_SYNTHESIS_FAILED'
          continue
        } finally { synthesisMs += elapsed(synthesisStarted) }
        signal?.throwIfAborted()
        const compute = computeStatus(requested, selected, fallbackReason, true)
        lastCompute = { signature, ...compute }
        if (selected.backend !== 'cpu') verifiedGpuRuntime = { signature, selected: { ...selected } }
        const timing = { preparationMs, deviceSelectionMs, synthesisMs }
        // Playback is outside the retry catch. Never replay an uncertain/partly played utterance.
        return await consume(output, signature, compute, timing)
      }
    } catch (error) { uncertain = Boolean(error?.uncertain); throw error }
    finally { if (!uncertain) await rm(directory, { recursive: true, force: true }).catch(() => {}) }
  }

  const melo = value => createLocalTtsAdapter({ runner, playback, modulePath: value.modulePath })
  const meloConfig = (config, value) => ({ ...config, localModelId: LOCAL_TTS_MODEL_ID, localModelPath: value.directory })
  return {
    close: () => resident.close(),
    residency: () => resident.residency(),
    async inspect(config, signal) {
      try {
        const value = await descriptor(config, signal); signal?.throwIfAborted()
        if (value.engine === 'sherpa-melo') return await melo(value).inspect(meloConfig(config, value), signal)
        const requested = qwenComputePreference(config, value)
        const signature = await signatureOf(value, await referenceFor(config), requested)
        const compute = lastCompute?.signature === signature ? Object.fromEntries(Object.entries(lastCompute).filter(([key]) => key !== 'signature')) : { localComputeRequested: requested, localComputeBackend: null, localComputeDevice: null, localComputeVerified: false, localComputeFallback: false, localComputeReason: null }
        return { localModelId: config.localModelId, localAssetsReady: true, localRuntime: 'ready', localReady: true, localSynthesisSupported: verifiedProbe === signature, synthesisVerified: verifiedProbe === signature, modelResident: resident.residency().modelResident, localEngine: value.engine, localReferenceVoice: config.referenceAudioPath != null, localReferenceVoiceSupported: true, ...compute }
      } catch (error) {
        if (signal?.aborted || error.uncertain) throw error
        return { localModelId: config.localModelId, localRuntime: 'unavailable', localSynthesisSupported: false, localReason: error.code ?? 'TTS_LOCAL_MODEL_INVALID' }
      }
    },
    async probe(config, signal) {
      await resident.close()
      const value = await descriptor(config, signal)
      if (value.engine === 'sherpa-melo') return melo(value).probe(meloConfig(config, value), signal)
      verifiedProbe = null
      await synthesizeQwen(value, config, '你好。', signal, async (_path, signature) => { verifiedProbe = signature })
      return this.inspect(config, signal)
    },
    async speak(text, config, signal) {
      try {
      const started = clock()
      const value = await descriptor(config, signal)
      if (value.engine === 'sherpa-melo') { await resident.close(); return melo(value).speak(text, meloConfig(config, value), signal) }
      if (typeof playback !== 'function') throw fault('TTS_PLATFORM_UNSUPPORTED', '当前环境没有受支持的原生播放组件')
      let fallbackReference, priorSynthesisMs = 0
      if (value.serverRuntime || value.runtimeCandidates?.some(candidate => candidate.serverRuntime)) {
        const result = await residentSpeak(value, config, text, signal, started)
        if (result?.fallbackToCli) { fallbackReference = result.reference; priorSynthesisMs = result.synthesisMs ?? 0 }
        else if (result) return result
      } else await resident.close()
      return await synthesizeQwen(value, config, text, signal, async (path, _signature, compute, timing) => {
        const playbackStarted = clock()
        const result = await playback(path, config, signal)
        return { ...result, ...compute, localTimings: { ...timing, playbackMs: elapsed(playbackStarted), totalMs: elapsed(started), chunks: 1, modelResident: false } }
      }, started, fallbackReference, priorSynthesisMs)
      } catch (cause) { await resident.close(); throw cause }
    },
  }
}
