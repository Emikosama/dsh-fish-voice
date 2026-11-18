import { atomicWriteText } from './voice-atomic-file.mjs'
/** Local model installer. Only explicit human actions start network work; no secrets or audio enter requests. */
import { extractRuntimeArchive, validRuntimeManifest } from './voice-runtime-archive.mjs'
import { runTtsProcess } from './voice-tts.mjs'
import { createGpuHardwareProbe } from './voice-gpu-hardware.mjs'
import { createHash, randomUUID } from 'node:crypto'
import { constants, closeSync, existsSync, fsyncSync, lstatSync, mkdirSync, openSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { open, rename, rm, statfs, readdir } from 'node:fs/promises'
import { dirname, isAbsolute, join, parse, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { totalmem, freemem, cpus, platform, arch } from 'node:os'

const ACTIVE = new Set(['queued', 'running'])
const processLocks = new Map()
const ID = /^[a-f0-9-]{36}$/
const SHA = /^[a-f0-9]{64}$/
const ERROR_CODE = /^[A-Z_]{2,60}$/
const clone = value => structuredClone(value)
const failure = (code, message) => Object.assign(new Error(message), { code })
const hash = value => createHash('sha256').update(typeof value === 'string' ? value : JSON.stringify(value)).digest('hex')
const now = () => new Date().toISOString()
const runtimePackages = runtime => runtime ? [runtime, ...(runtime.dependencies ?? [])] : []
const runtimeSummary = runtime => runtime ? { release: runtime.release, source: runtime.source_url, sources: runtimePackages(runtime).map(r => r.source_url), redirectHost: runtime.kind === 'node-package' ? 'registry.npmjs.org' : 'release-assets.githubusercontent.com', platform: runtime.platform, arch: runtime.arch, executable: runtime.executable ?? runtime.entrypoint, licenseUrls: runtime.license_urls } : null
const QWEN_ID = 'qwen3-tts-base-1.7b-gguf'
const RETIRED_ASR = 'faster-whisper-small'
const QWEN_MAIN = Object.freeze({ q4_k_m: 'Qwen3-TTS-12Hz-1.7B-Base-Q4_K_M.gguf', q8_0: 'Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf' })
const qwenServerCatalog = JSON.parse(readFileSync(new URL('./qwen-server-catalog.json', import.meta.url), 'utf8')).servers
const QWEN_MMPROJ = 'mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf'
const isReusedFile = (job, file) => job.reused === true && (file === QWEN_MAIN[job.modelVariant] || file === QWEN_MMPROJ)
const receivedBytes = job => job.files.reduce((n, f) => n + (isReusedFile(job, f.name) ? 0 : f.receivedBytes), 0)
const MELO_PATHS = new Set(['model.int8.onnx','lexicon.txt','tokens.txt','date.fst','number.fst','phone.fst','new_heteronym.fst','LICENSE','dict/README.md','dict/hmm_model.utf8','dict/idf.utf8','dict/jieba.dict.utf8','dict/stop_words.utf8','dict/user.dict.utf8','dict/pos_dict/char_state_tab.utf8','dict/pos_dict/prob_emit.utf8','dict/pos_dict/prob_start.utf8','dict/pos_dict/prob_trans.utf8'])

const modelMeta = {
  'vits-melo-tts-zh_en-int8': { engine: 'sherpa-melo', title: 'MeloTTS 中英文 · 轻量 CPU', backend: 'sherpa-onnx-node 1.13.8', purpose: 'tts' },
  'qwen3-tts-base-1.7b-gguf': { engine: 'qwen3-tts', title: 'Qwen3-TTS 1.7B · CPU / Vulkan', backend: 'llama.cpp b12110', purpose: 'tts' },
  'sensevoice-int8-2024-07-17': { engine: 'sensevoice', setting: 'sensevoiceDir', title: 'SenseVoice INT8', backend: 'sherpa-onnx' },
}
const safeMessage = error => ({ code: ERROR_CODE.test(error?.code ?? '') ? error.code : 'INSTALL_FAILED', message: error?.code === 'EACCES' || error?.code === 'EPERM' ? '模型目录不可写，请检查所选数据目录的权限。' : error?.code === 'ENOSPC' ? '磁盘空间不足；已保留下载进度。' : error?.code && ERROR_CODE.test(error.code) && !['ECONNRESET','ECONNREFUSED','ETIMEDOUT'].includes(error.code) ? String(error.message).slice(0, 360) : '网络中断或本地操作失败；已保留进度，请检查网络和目录后恢复。' })

function restoreJobError(stored) {
  if (ACTIVE.has(stored.status)) return { code: 'HOST_RESTARTED', message: '主程序曾退出，下载已暂停；点击恢复继续。' }
  const { error } = stored
  if ((stored.status !== 'paused' && stored.status !== 'failed') || typeof error?.code !== 'string'
    || !ERROR_CODE.test(error.code) || typeof error.message !== 'string') return null
  return { code: error.code, message: error.message.slice(0, 360) }
}

function secureDirectory(path) {
  path = resolve(path)
  const root = parse(path).root
  let cursor = root
  for (const piece of path.slice(root.length).split(/[\\/]/).filter(Boolean)) {
    cursor = join(cursor, piece)
    try {
      const info = lstatSync(cursor)
      if (info.isSymbolicLink() || !info.isDirectory()) throw failure('UNSAFE_PATH', '模型数据目录含符号链接或非目录，未写入。')
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      mkdirSync(cursor, { mode: 0o700 })
    }
  }
  return path
}
// External reuse paths are read-only: never create directories or mutate a source.
function sourceDirectory(value) {
  if (typeof value !== 'string' || !value || value.length > 4096 || !isAbsolute(value) || /[\x00-\x1f]/.test(value)) throw failure('INVALID_SOURCE_DIRECTORY', '请提供本机已有模型的完整目录。')
  return resolve(value)
}
function checkSourceDirectory(value) {
  const path = sourceDirectory(value), root = parse(path).root
  let cursor = root
  for (const piece of path.slice(root.length).split(/[\\/]/).filter(Boolean)) {
    cursor = join(cursor, piece)
    let info
    try { info = lstatSync(cursor) } catch (error) { if (error.code === 'ENOENT') throw failure('SOURCE_DIRECTORY_MISSING', '本机模型目录不存在；未创建目录或下载替代文件。'); throw error }
    if (info.isSymbolicLink() || !info.isDirectory()) throw failure('UNSAFE_PATH', '本机模型目录含链接或非目录，未读取或修改。')
  }
  return path
}
function regular(path) {
  try {
    const info = lstatSync(path)
    if (!info.isFile() || info.isSymbolicLink() || info.nlink !== 1) throw failure('UNSAFE_PATH', '模型文件不是独立普通文件，未写入。')
    return info
  } catch (error) { if (error.code === 'ENOENT') return null; throw error }
}
function atomicJson(path, value) {
  secureDirectory(dirname(path)); regular(path)
  atomicWriteText(path, JSON.stringify(value))
}
function strongETag(value) { return typeof value === 'string' && /^"[^"\r\n]{1,256}"$/.test(value) ? value : null }
function trustedUrl(value) {
  try {
    const u = new URL(value)
    return u.protocol === 'https:' && !u.username && !u.password && !u.port && (u.hostname === 'registry.npmjs.org' && !u.search && !u.hash && /^\/sherpa-onnx-(node|linux-x64|win-x64)\/-\/sherpa-onnx-(node|linux-x64|win-x64)-1\.13\.8\.tgz$/.test(u.pathname) || u.hostname === 'huggingface.co' && /^\/csukuangfj\/vits-melo-tts-zh_en\/resolve\/a0d5c6a264c0ef92d70d8661d8cc502d79627cd6\//.test(u.pathname) && MELO_PATHS.has(decodeURIComponent(u.pathname.split('/resolve/a0d5c6a264c0ef92d70d8661d8cc502d79627cd6/')[1])) || u.hostname === 'modelscope.cn' || u.hostname.endsWith('.modelscope.cn') || u.hostname === 'github.com' && !u.search && !u.hash && /^\/ggml-org\/llama\.cpp\/releases\/download\/b12110\/llama-b12110-bin-(ubuntu-x64\.tar\.gz|win-cpu-x64\.zip|ubuntu-vulkan-x64\.tar\.gz|win-vulkan-x64\.zip)$/.test(u.pathname))
  } catch { return false }
}
function validatedModel(model, allowUrl) {
  if (!modelMeta[model.id] || !Array.isArray(model.files)) return false
  if (model.runtimePackage && (runtimePackages(model.runtimePackage).length > 2 || new Set(runtimePackages(model.runtimePackage).map(r => r.installDir ?? '')).size !== runtimePackages(model.runtimePackage).length || (model.runtimePackage.dependencies ?? []).some(r => r.dependencies?.length))) return false
  if (modelMeta[model.id].purpose === 'tts' && (!validRuntimeManifest(model.runtimePackage) || !runtimePackages(model.runtimePackage).every(r => validRuntimeManifest(r) && model.files.some(f => f.file === r.file && f.sha256 === r.sha256 && f.bytes === r.bytes)))) return false
  return typeof model.revision === 'string' && /^[a-f0-9]{40}$/.test(model.revision) && Array.isArray(model.files) && model.files.length > 0 && model.files.length <= (model.id === 'vits-melo-tts-zh_en-int8' ? 24 : 12) && new Set(model.files.map(f => f.file)).size === model.files.length && model.files.every(f => typeof f.file === 'string' && (/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,140}$/.test(f.file) || model.id === 'vits-melo-tts-zh_en-int8' && MELO_PATHS.has(f.file)) && !/^\.+$/.test(f.file) && SHA.test(f.sha256) && Number.isSafeInteger(f.bytes) && f.bytes > 0 && allowUrl(f.source_url))
}

/** Measured on the machine running the plugin, not a remote TTS server. No inventory leaves this process. */
export function inspectModelHardware() {
  const limit = typeof process.constrainedMemory === 'function' ? process.constrainedMemory() : 0
  const total = totalmem()
  const effectiveTotal = limit > 0 ? Math.min(total, limit) : total
  const free = typeof process.availableMemory === 'function' ? process.availableMemory() : freemem()
  return { observedAt: now(), scope: 'plugin-host', platform: platform(), arch: arch(), cpuLogicalCores: cpus().length || null, totalMemoryBytes: effectiveTotal > 0 ? effectiveTotal : null, availableMemoryBytes: free >= 0 ? Math.min(free, effectiveTotal) : null, gpuMemoryBytes: null, gpuMemoryReason: '等待本地显卡检测。' }
}

/** UI preference, not a model minimum requirement or proof that inference works. */
export function recommendModel(modelId, hardware) {
  if (modelId === 'vits-melo-tts-zh_en-int8') {
    const total = hardware?.totalMemoryBytes, free = hardware?.availableMemoryBytes
    const known = Number.isFinite(total) && Number.isFinite(free)
    const recommended = known && total < 8 * 1024 ** 3 && free >= 1024 ** 3
    return { modelId, confidence: known ? 'heuristic-only' : 'unknown', recommended, badge: recommended ? '低内存推荐' : null, state: !known ? 'unknown' : recommended ? 'recommended-lightweight' : 'manual-choice', reason: recommended ? '内存较少时可选轻量 Melo 中英文语音；只在明确选择后下载。' : 'Melo 提供轻量离线中英文朗读，选择本地模型后可下载。', policy: '云 Linux 短句实测峰值约 256 MiB；低于 8 GiB 总内存且当前可用至少 1 GiB 时建议 Melo，不是长句或所有设备的最低要求保证。', runtimeValidated: false, gpuValidated: false }
  }
  if (modelId !== 'qwen3-tts-base-1.7b-gguf') return { modelId, confidence: 'not-assessed', recommended: false, badge: null, state: 'manual-choice', reason: '可手动选择；不会自动切换模型。' }
  const total = hardware?.totalMemoryBytes, free = hardware?.availableMemoryBytes
  if (!Number.isFinite(total) || !Number.isFinite(free)) return { modelId, confidence: 'unknown', recommended: false, badge: null, state: 'unknown', reason: '内存检测不完整，配置级别未知；可手动了解 Qwen。' }
  // Qwen-first recommendation with headroom over the measured ~4.60 GiB
  // Linux short-phrase RSS at context 4096. This is not a long-text guarantee.
  const adequate = total >= 8 * 1024 ** 3 && free >= 6 * 1024 ** 3
  return { modelId, confidence: 'heuristic-only', recommended: adequate, badge: adequate ? '推荐' : null, state: adequate ? 'recommended-pending-runtime-validation' : total >= 8 * 1024 ** 3 ? 'busy-memory' : 'limited-memory', reason: adequate ? '按当前内存与 Qwen 优先偏好推荐；可下载 CPU 运行时和模型，实际速度需安装后试听验证。' : total >= 8 * 1024 ** 3 ? '本机内存规格适合优先考虑 Qwen，但当前可用内存不足 6 GiB；可先关闭其他程序，或明确选择继续。' : '本机总内存较少，建议先用轻量 Melo；仍可手动选择尝试 Qwen。', policy: 'Qwen 优先的界面启发式：总内存至少 8 GiB、当前可用至少 6 GiB；Linux 短句 CPU 实测峰值约 4.60 GiB（上下文 4096），预留余量；不是模型最低要求，不保证长句、速度或其他机器可加载。', runtimeValidated: false, gpuValidated: false }
}

/** Executes only the local, bundled probe. No shell, model loading, downloads, API keys, or device recording. */
export async function inspectModelCompute({ pythonPath = 'python', signal } = {}) {
  try {
    const { stdout } = await runTtsProcess(pythonPath, [fileURLToPath(new URL('./helper/model_compute.py', import.meta.url))], null, { timeoutMs: 12000, maxOutput: 32768, captureText: true, signal, env: { ...process.env, HF_HUB_OFFLINE: '1', TRANSFORMERS_OFFLINE: '1' } })
    const value = JSON.parse(stdout)
    if (value?.schema !== 1 || !value.backends) throw new Error('invalid probe')
    return value
  } catch (error) {
    if (error.uncertain) throw Object.assign(failure(error.code, '未能确认本地计算检查已停止；请重启宿主后再试。'), { uncertain: true })
    if (signal?.aborted) throw failure(error.code, '本地计算检查已取消。')
    return { schema: 1, default: 'cpu', observedAt: now(), backends: {}, reason: 'Python 或本地计算依赖不可用；未安装软件、未下载模型。' }
  }
}

/**
 * root must be an application-owned local data directory, never user input from the UI.
 * fetchImpl/allowUrl/probe/runtimeRunner are test seams for trusted application code, never command fields.
 * Host lifetime owns this instance. UI unmount does not pause it; close() pauses for host shutdown.
 */
export function createModelInstaller({ root, catalog: suppliedCatalog, fetchImpl = globalThis.fetch, allowUrl = trustedUrl, probe = inspectModelCompute, pythonPath = () => 'python', minFreeBytes = 32 * 1024 * 1024, hardwareProbe = inspectModelHardware, gpuProbe = createGpuHardwareProbe(), runtimeRunner = runTtsProcess, refreshIntervalMs = 300000, scheduleRefresh = setTimeout, cancelRefresh = clearTimeout } = {}) {
  if (typeof root !== 'string' || !root) throw failure('INVALID_ROOT', '缺少模型数据目录。')
  root = secureDirectory(root)
  const stageRoot = secureDirectory(join(root, '.jobs'))
  const installedRoot = secureDirectory(join(root, 'installed'))
  const statePath = join(root, 'jobs.json')
  const lockPath = join(root, 'installer.lock')
  const catalog = clone(suppliedCatalog ?? JSON.parse(readFileSync(new URL('./model-catalog.json', import.meta.url), 'utf8')))
  const qwenSourceFiles = clone(catalog.models?.find(m => m.id === QWEN_ID)?.files ?? [])
  const runtimeCatalog = !suppliedCatalog ? JSON.parse(readFileSync(new URL('./runtime-catalog.json', import.meta.url), 'utf8')) : { runtimes: [] }
  const gpuRuntime = runtimeCatalog.runtimes.find(r => r.platform === platform() && r.arch === arch() && r.backend === 'vulkan')
  // Only the new TTS entry is prepared; existing ASR manifest hashes stay byte-for-byte stable.
  if (!suppliedCatalog) {
    const qwen = catalog.models?.find(m => m.id === 'qwen3-tts-base-1.7b-gguf')
    const runtimePackage = runtimeCatalog.runtimes.find(r => r.platform === platform() && r.arch === arch() && !r.backend)
    if (qwen && runtimePackage) {
      qwen.revision = qwen.domestic_revision
      qwen.source_repository = qwen.domestic_repository
      qwen.publisher = qwen.publisher_identity
      qwen.files = qwen.files.filter(f => f.file === 'Qwen3-TTS-12Hz-1.7B-Base-Q4_K_M.gguf' || f.file === 'mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf')
      qwen.files.push({ file: runtimePackage.file, bytes: runtimePackage.bytes, sha256: runtimePackage.sha256, source_url: runtimePackage.source_url })
      qwen.runtimePackage = runtimePackage
      qwen.license_urls = [...qwen.license_urls, ...runtimePackage.license_urls]
      qwen.license_note += ' ' + runtimePackage.license_note
    }
  }
  if (!suppliedCatalog) {
    const melo = JSON.parse(readFileSync(new URL('./melo-catalog.json', import.meta.url), 'utf8'))
    const runtimePackage = melo.runtimes.find(r => r.platform === platform() && r.arch === arch())
    if (runtimePackage) {
      melo.model.runtimePackage = runtimePackage
      melo.model.files.push(...runtimePackages(runtimePackage).map(r => ({ file:r.file, bytes:r.bytes, sha256:r.sha256, source_url:r.source_url })))
      melo.model.license_urls.push(...runtimePackage.license_urls)
      melo.model.license_note += ' ' + runtimePackage.license_note
    }
    catalog.models.push(melo.model)
  }
  const models = new Map((catalog.models ?? []).map(m => [m.id, m]))
  const jobs = new Map(), retiredJobs = new Map(), running = new Map(), cancellations = new Map(), listeners = new Set()
  // An unconfirmed native process keeps its own job quarantined for this host lifetime.
  const uncertainRuntimes = new Map(), activeVerifications = new Set(), activeComputeProbes = new Set()
  let uncertainCompute = null
  const assertComputeStopped = () => { if (uncertainCompute) throw uncertainCompute }
  const assertRuntimeStopped = id => { if (uncertainRuntimes.has(id)) throw uncertainRuntimes.get(id) }
  let hardware = hardwareProbe()
  let closed = false, compute = { schema: 1, default: 'cpu', observedAt: null, backends: {}, reason: '尚未检测本地计算后端。' }
  let refreshTimer = null, refreshPending = null
  let refresh = { pending:false, observedAt:null, attemptedAt:null, error:null, intervalMs:300000 }
  // Host-owned cadence survives hidden/unmounted UI. It never downloads, loads
  // a model, changes a setting, or starts/stops microphone capture.
  const armRefresh = () => {
    if (closed || uncertainCompute || refreshTimer !== null || !(refreshIntervalMs > 0)) return
    refreshTimer = scheduleRefresh(() => {
      refreshTimer = null; armRefresh()
      void refreshCompute().catch(() => {})
    }, refreshIntervalMs)
    refreshTimer?.unref?.()
  }
  function refreshCompute() {
    if (closed) return Promise.reject(failure('INSTALLER_CLOSED','安装器已关闭。'))
    if (uncertainCompute) return Promise.reject(uncertainCompute)
    if (refreshPending) return refreshPending
    refresh = { ...refresh,pending:true,attemptedAt:now(),error:null }
    refreshPending = Promise.resolve().then(async () => {
      const measured = await inspectHardwareProbe()
      const inspected = await inspectComputeProbe()
      assertComputeStopped()
      if (closed) throw failure('INSTALLER_CLOSED','安装器已关闭。')
      hardware = measured; compute = inspected
      refresh = { ...refresh,observedAt:now(),error:null }
      return clone(compute)
    }).catch(error => {
      refresh = { ...refresh,error:error.uncertain?'检测进程退出未确认，已暂停后续检测':'本次硬件检测未完成' }
      if (uncertainCompute && refreshTimer !== null) { cancelRefresh(refreshTimer); refreshTimer = null }
      throw error
    }).finally(() => {
      refreshPending = null; refresh = { ...refresh,pending:false }
      if (!closed) emit()
    })
    emit(); return refreshPending
  }
  // Both explicit inspection and ASR install checks belong to the host lifetime.
  // An unconfirmed shared Python probe quarantines further probes and the root.
  async function runComputeProbe(signal, inspect, job) {
    if (closed) throw failure('INSTALLER_CLOSED', '安装器已关闭。')
    assertComputeStopped()
    const controller = new AbortController()
    const combined = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal
    const check = () => {
      assertComputeStopped()
      if (closed || combined.aborted) throw failure('TTS_CANCELLED', '本地计算检查已取消。')
    }
    const pending = { controller, promise: null }
    activeComputeProbes.add(pending)
    pending.promise = Promise.resolve().then(async () => {
      check()
      const value = await inspect(combined)
      check()
      return value
    }).catch(error => {
      if (error.uncertain) {
        uncertainCompute = error
        if (job) uncertainRuntimes.set(job.id, error)
      }
      throw error
    })
    try { return await pending.promise } finally { activeComputeProbes.delete(pending) }
  }
  const inspectHardwareProbe = signal => runComputeProbe(signal, async combined => ({
    ...hardwareProbe(), ...await gpuProbe({ signal: combined }),
  }))
  const inspectComputeProbe = (signal, job) =>
    runComputeProbe(signal, combined => probe({ pythonPath: pythonPath(), signal: combined }), job)
  const paths = job => ({ staging: join(stageRoot, job.id), destination: join(installedRoot, job.id) })
  const publicJob = job => {
    const value = clone(job)
    delete value.manifestHash
    for (const file of value.files) delete file.etag
    if (job.status === 'installed') {
      const meta = modelMeta[job.modelId]
      value.installedPath = paths(job).destination
      value.purpose = meta.purpose ?? 'asr'
      value.recommendedSettings = meta.purpose === 'tts' ? { tts: { provider: 'local', localModelId: job.modelId, localModelPath: value.installedPath } } : { asr: meta.engine, models: { [meta.setting]: value.installedPath }, modelCompute: job.compute }
    }
    return value
  }
  const save = (entries = jobs) => atomicJson(statePath, { schema: 1, jobs: [...entries.values(), ...retiredJobs.values()] })
  const emit = () => { const value = snapshot(); for (const listener of listeners) { try { listener(value) } catch { /* Observers cannot break work. */ } } }
  const update = (job, patch = {}, persist = true) => { Object.assign(job, patch, { updatedAt: now() }); if (persist) save(); emit() }
  const manifestHash = model => hash(model)
  const computeOptionsFor = model => model.id === QWEN_ID && (gpuRuntime || model.runtimePackage?.dependencies?.some(r => r.backend === 'vulkan')) ? ['cpu','auto','vulkan'] : modelMeta[model.id]?.purpose === 'tts' ? ['cpu'] : ['cpu','auto']
  const modelFor = (id, variant, selected = 'cpu') => {
    let model = models.get(id)
    if (variant !== undefined) {
      if (id !== QWEN_ID || !Object.hasOwn(QWEN_MAIN, variant)) throw failure('INVALID_MODEL_VARIANT', '只支持复用清单中的 Qwen Q4_K_M 或 Q8_0。')
      const main = qwenSourceFiles.find(f => f.file === QWEN_MAIN[variant])
      const mmproj = qwenSourceFiles.find(f => f.file === QWEN_MMPROJ)
      if (!main || !mmproj || !model?.runtimePackage) throw failure('MODEL_UNAVAILABLE', '所选 Qwen 文件组合没有完整固定清单，未读取或下载。')
      model = { ...model, files: [main, mmproj, ...model.files.filter(f => runtimePackages(model.runtimePackage).some(r => r.file === f.file))] }
    }
    // The old CPU manifest remains byte-for-byte stable for installed jobs.
    // GPU plans include a separate pinned executable plus the CPU fallback package.
    if (id === QWEN_ID && ['auto','vulkan'].includes(selected) && gpuRuntime) {
      model = { ...model, runtimePackage: { ...model.runtimePackage, dependencies: [gpuRuntime] },
        files: [...model.files, { file:gpuRuntime.file, bytes:gpuRuntime.bytes, sha256:gpuRuntime.sha256, source_url:gpuRuntime.source_url }],
        license_urls: [...new Set([...(model.license_urls ?? []), ...gpuRuntime.license_urls])],
        license_note: `${model.license_note ?? ''} ${gpuRuntime.license_note}` }
    }
    if (!model || !validatedModel(model, allowUrl)) throw failure('MODEL_UNAVAILABLE', '该模型没有已核实的完整安装清单或兼容运行时，暂不可一键安装。')
    return model
  }
  function jobFor(id) {
    if (retiredJobs.has(id)) throw failure('MODEL_RETIRED', '这个旧识别模型已退役，文件和安装记录仍保留。')
    if (!ID.test(id ?? '') || !jobs.has(id)) throw failure('UNKNOWN_JOB', '找不到这个安装任务。')
    return jobs.get(id)
  }
  const stopped = (job, run) => { if (run.stop || closed || run.controller.signal.aborted) throw failure('INTERRUPTED', '安装已暂停。') }
  function snapshot() {
    return {
      schema: 1, compute: clone(compute), hardware: clone(hardware), refresh: clone(refresh),
      models: [...models.values()].map(model => ({ id: model.id, runtime: runtimeSummary(model.runtimePackage), purpose: modelMeta[model.id]?.purpose ?? 'asr', computeOptions: computeOptionsFor(model), recommendation: recommendModel(model.id, hardware), title: modelMeta[model.id]?.title ?? model.model ?? model.id, backend: modelMeta[model.id]?.backend ?? null, available: validatedModel(model, allowUrl), reason: validatedModel(model, allowUrl) ? null : '没有接入兼容的本地运行时或完整已核实安装清单。', totalBytes: model.files?.reduce((sum, f) => sum + f.bytes, 0) ?? null, source: model.source_repository ?? model.domestic_repository ?? null, licenseUrls: model.license_urls ?? [], licenseNote: model.license_note ?? null, verification: modelMeta[model.id]?.purpose === 'tts' ? '完整固定模型与运行时文件已在云 Linux 下载验哈希并通过 CPU 短句合成；Windows 仅归档与 PE 依赖检查，未验证用户设备、国内网速或听感。' : catalog.verification_scope, runtimeLoaded: false })),
      jobs: [...jobs.values()].map(publicJob),
    }
  }
  function plan(modelId, selected = 'cpu', reuse = {}) {
    if (!reuse || typeof reuse !== 'object' || Array.isArray(reuse) || Object.keys(reuse).some(k => !['sourceDirectory','modelVariant'].includes(k))) throw failure('INVALID_REUSE_PLAN', '复用计划包含未知选项。')
    const reused = reuse.sourceDirectory !== undefined || reuse.modelVariant !== undefined
    if (reused && (reuse.sourceDirectory === undefined || reuse.modelVariant === undefined)) throw failure('INVALID_REUSE_PLAN', '请同时选择已有模型目录和 Qwen 文件版本。')
    const source = reused ? sourceDirectory(reuse.sourceDirectory) : null
    const sourceRelative = source ? relative(root, source) : null
    if (source && !(sourceRelative === '..' || sourceRelative.startsWith(`..${sep}`) || isAbsolute(sourceRelative))) throw failure('INVALID_SOURCE_DIRECTORY', '请选择安装器目录之外的已有模型目录。')
    const model = modelFor(modelId, reused ? reuse.modelVariant : undefined, selected)
    if (!computeOptionsFor(model).includes(selected)) throw failure('INVALID_COMPUTE', '此模型没有接通所选计算后端；请使用列表中的 CPU 或自动方案。')
    const value = { schema: 1, modelId, compute: selected, revision: model.revision, source: model.source_repository, publisher: model.publisher, files: model.files.map(f => ({ name: f.file, bytes: f.bytes, sha256: f.sha256, url: f.source_url })), totalBytes: model.files.reduce((sum, f) => sum + f.bytes, 0), licenseUrls: model.license_urls, licenseNote: model.license_note, verification: modelMeta[model.id]?.purpose === 'tts' ? '完整固定模型与运行时文件已在云 Linux 下载验哈希并通过 CPU 短句合成；Windows 仅归档与 PE 依赖检查，未验证用户设备、国内网速或听感。' : catalog.verification_scope, destination: root, notice: '仅下载这些公开模型文件到本地；不安装 Python 软件、不上传录音/声纹/密钥、不改变现有模型设置。完成后仍需显式应用，下载成功不等于已加载。' }
    if (model.runtimePackage) {
      value.purpose = 'tts'
      value.runtime = runtimeSummary(model.runtimePackage)
      value.notice = '下载所列公开模型和官方 llama.cpp CPU 程序；GitHub 可能重定向至 release-assets.githubusercontent.com。校验后仅在应用私有目录解包并执行版本检查，不安装 Python 包、不上传文字/录音/声纹/密钥、不采集参考音频。下载完成不代表已成功合成语音；启用后可试听。'
    }
    if (model.runtimePackage?.kind === 'node-package') value.notice = '下载所列 Hugging Face 固定模型文件（大权重 CDN us.aws.cdn.hf.co）和 npm registry 固定 sherpa-onnx CPU 组件。校验后只在应用私有目录解包，不执行 npm 安装脚本，不安装 Python，不上传文字/录音/声纹。下载完成不等于合成成功；启用后可试听。'
    if (selected !== 'cpu') value.notice += ' 自动优先尝试已接通且实际可用的本地 GPU；失败后使用同一模型的 CPU。不会安装或修改系统显卡驱动，取消或无法确认进程退出时不会启动兜底。'
    if (reused) {
      Object.assign(value, { sourceDirectory: source, modelVariant: reuse.modelVariant, reused: true, reusedBytes: 0 })
      value.files = value.files.map(f => ({ ...f, reused: f.name === QWEN_MAIN[reuse.modelVariant] || f.name === QWEN_MMPROJ }))
      value.reusedBytes = value.files.filter(f => f.reused).reduce((n, f) => n + f.bytes, 0)
      value.totalBytes -= value.reusedBytes
      value.verification = '已有权重须逐文件校验大小和 SHA-256；通过后使用固定 b12110 CPU 组件，启用前还需短句合成验证。Q8 主模型与本机 Windows 合成未在此计划中得到验证。'
      value.notice = '先校验指定目录内的两个模型文件，原地复用，不复制、不移动、不删除、不重新下载权重；只下载上列固定 b12110 运行组件并校验。不会执行目录里已有的 build 12001 或其他程序。任一模型不匹配时停止，不自动改为下载。原目录必须保持可用；启用前另做短句合成验证。'
    }
    if (['auto','vulkan'].includes(selected) && model.id === QWEN_ID) { value.verification = '已核对官方 b12110 CPU/Vulkan 归档与逐文件哈希；尚未完成此设备的 GPU 短句验证。启动后按设备枚举和实际 GPU 层卸载记录确认，无可用 GPU 时 CPU 兜底。'; value.notice += ' 本计划包含独立的 Vulkan 组件及 CPU 兜底组件，下载大小已计入；需要系统已有兼容 Vulkan 驱动，不能保证所有独显或核显。' }
    return { ...value, planHash: hash(value) }
  }
  // Cooperating hosts cannot write the same queue simultaneously. A dead process lock
  // is recoverable; malformed lock files fail closed instead of guessing ownership.
  if (processLocks.has(root)) throw failure('INSTALLER_BUSY', '另一个安装器正在使用同一目录。')
  if (regular(lockPath)) {
    let owner
    try { owner = JSON.parse(readFileSync(lockPath, 'utf8')) } catch { throw failure('LOCK_INVALID', '安装器锁记录损坏，未开始工作。') }
    if (!Number.isSafeInteger(owner.pid) || owner.pid <= 0 || !ID.test(owner.token ?? '')) throw failure('LOCK_INVALID', '安装器锁记录无效。')
    let alive = true
    try { process.kill(owner.pid, 0) } catch (error) { if (error.code === 'ESRCH') alive = false }
    if (alive) throw failure('INSTALLER_BUSY', '另一个主程序正在管理模型下载。')
    unlinkSync(lockPath)
  }
  const lockToken = randomUUID()
  const lockFd = openSync(lockPath, 'wx', 0o600)
  try { writeFileSync(lockFd, JSON.stringify({ pid: process.pid, token: lockToken })); fsyncSync(lockFd) } finally { closeSync(lockFd) }
  processLocks.set(root, lockToken)
  const unlock = () => {
    if (processLocks.get(root) !== lockToken) return
    try { if (regular(lockPath) && JSON.parse(readFileSync(lockPath, 'utf8')).token === lockToken) unlinkSync(lockPath) } finally { processLocks.delete(root) }
  }
  try {
  // Recovery is fail-closed: a host restart never resumes downloads or applies a model by itself.
  if (regular(statePath)) {
    if (regular(statePath).size > 4 * 1024 * 1024) throw failure('STATE_INVALID', '安装任务记录过大，未载入。')
    let state
    try { state = JSON.parse(readFileSync(statePath, 'utf8')) } catch { throw failure('STATE_INVALID', '安装任务记录损坏；未开始下载或覆盖原模型。') }
    if (state.schema !== 1 || !Array.isArray(state.jobs) || state.jobs.length > 1000) throw failure('STATE_INVALID', '安装任务记录版本不支持。')
    for (const stored of state.jobs) {
      if (!ID.test(stored?.id ?? '') || jobs.has(stored.id) || retiredJobs.has(stored.id)) throw failure('STATE_INVALID', '安装任务记录无效。')
      if (stored.modelId === RETIRED_ASR) {
        // Preserve the original record and its files for rollback without
        // putting an unsupported model back into the active queue.
        retiredJobs.set(stored.id, stored)
        continue
      }
      if (!['cpu','auto','cuda','vulkan'].includes(stored.compute) || !['queued','running','paused','failed','cancelled','installed'].includes(stored.status)) throw failure('STATE_INVALID', '安装任务记录无效。')
      const reused = stored.reused === true
      if (stored.reused !== undefined && !reused || !reused && (stored.sourceDirectory !== undefined || stored.modelVariant !== undefined)) throw failure('STATE_INVALID', '模型复用记录无效。')
      const reusePlan = reused ? plan(stored.modelId, stored.compute, { sourceDirectory: stored.sourceDirectory, modelVariant: stored.modelVariant }) : null
      const model = modelFor(stored.modelId, reused ? stored.modelVariant : undefined, stored.compute)
      if (stored.manifestHash !== manifestHash(model)) throw failure('CATALOG_CHANGED', '安装清单已经变化；旧任务不会用新来源继续下载。')
      const status = ACTIVE.has(stored.status) ? 'paused' : stored.status
      const job = { id: stored.id, modelId: model.id, compute: stored.compute, manifestHash: stored.manifestHash, status, stage: status, createdAt: typeof stored.createdAt === 'string' && stored.createdAt.length < 40 ? stored.createdAt : now(), updatedAt: now(), totalBytes: model.files.reduce((n, f) => n + f.bytes, 0), receivedBytes: 0, files: model.files.map(f => ({ name: f.file, bytes: f.bytes, receivedBytes: 0, verified: false, etag: strongETag(stored.files?.find(x => x.name === f.file)?.etag) })), error: restoreJobError(stored), runtimeLoaded: false }
      if (reused) Object.assign(job, { reused: true, sourceDirectory: reusePlan.sourceDirectory, modelVariant: reusePlan.modelVariant, reusedBytes: reusePlan.reusedBytes, totalBytes: reusePlan.totalBytes })
      // A crash may leave a promoted destination without an installed checkpoint.
      // Keep it untouched until explicit resume validates and reconciles the tree.
      const directory = paths(job)[job.status === 'installed' ? 'destination' : 'staging']
      if (existsSync(directory)) secureDirectory(directory)
      for (const f of job.files) {
        // Source presence/hash is checked only on an explicit resume/apply, not startup.
        if (isReusedFile(job, f.name)) { f.reused = true; continue }
        if (existsSync(directory)) secureDirectory(dirname(join(directory, f.name)))
        const info = regular(join(directory, f.name)); f.receivedBytes = Math.min(f.bytes, info?.size ?? 0)
      }
      job.receivedBytes = receivedBytes(job)
      if (job.status === 'installed' && job.files.some(f => !isReusedFile(job, f.name) && f.receivedBytes !== f.bytes && !(model.id === QWEN_ID && runtimePackages(model.runtimePackage).some(r => r.file === f.name) && !regular(join(directory, f.name))))) { job.status = 'failed'; job.stage = 'failed'; job.error = { code: 'INSTALLED_FILES_MISSING', message: '安装文件不完整；未自动启用。' } }
      jobs.set(job.id, job)
    }
    save()
  }
  } catch (error) { unlock(); throw error }
  async function request(file, model, options) {
    let url = file.source_url
    if (!allowUrl(url)) throw failure('UNTRUSTED_SOURCE', '下载来源不在已核实清单的可信站点范围内。')
    const sourceHost = trustedUrl(url) ? new URL(url).hostname : null
    const approvedMeloSource = model.id === 'vits-melo-tts-zh_en-int8' && sourceHost === 'huggingface.co'
    const meloRedirect = value => { try { const u = new URL(value); return approvedMeloSource && u.protocol === 'https:' && !u.username && !u.password && !u.port && (u.hostname === 'us.aws.cdn.hf.co' && u.pathname === '/xet-bridge-us/6693f810fdcd7b1c6c7e43ee/149cbc11497e01a7f0c6da468ae91acfcde30df2129c2d265cec9ca090aea293' || u.hostname === 'huggingface.co' && u.pathname.startsWith('/api/resolve-cache/models/csukuangfj/vits-melo-tts-zh_en/a0d5c6a264c0ef92d70d8661d8cc502d79627cd6/') && MELO_PATHS.has(decodeURIComponent(u.pathname.split('/a0d5c6a264c0ef92d70d8661d8cc502d79627cd6/')[1]))) } catch { return false } }
    const approvedRuntimeSource = sourceHost === 'github.com' && runtimePackages(model.runtimePackage).some(runtime =>
      runtime.file === file.file && runtime.bytes === file.bytes && runtime.sha256 === file.sha256 && runtime.source_url === file.source_url)
    const runtimeRedirect = value => { try { const u = new URL(value); return approvedRuntimeSource && u.protocol === 'https:' && !u.username && !u.password && !u.port && u.hostname === 'release-assets.githubusercontent.com' && /^\/github-production-release-asset\/[0-9]+\/[a-f0-9-]+$/.test(u.pathname) } catch { return false } }
    for (let count = 0; count <= 5; count++) {
      if (!allowUrl(url) && !runtimeRedirect(url) && !meloRedirect(url)) throw failure('UNTRUSTED_SOURCE', '下载或重定向来源不在已核实清单的可信站点范围内。')
      const response = await fetchImpl(url, { ...options, redirect: 'manual', credentials: 'omit', referrerPolicy: 'no-referrer' })
      if (![301,302,303,307,308].includes(response.status)) return response
      const location = response.headers.get('location')
      await response.body?.cancel()
      if (!location) throw failure('DOWNLOAD_REDIRECT', '下载来源返回无效重定向。')
      url = new URL(location, url).href
    }
    throw failure('DOWNLOAD_REDIRECT', '下载重定向次数过多。')
  }
  async function verify(path, file, job, run) {
    if (isReusedFile(job, file.file)) checkSourceDirectory(dirname(path))
    else secureDirectory(dirname(path))
    const info = regular(path)
    if (!info || info.size !== file.bytes) return false
    const fd = await open(path, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0))
    const digest = createHash('sha256'), buffer = Buffer.alloc(1024 * 1024)
    try {
      const opened = await fd.stat()
      if (!opened.isFile() || opened.nlink !== 1 || opened.dev !== info.dev || opened.ino !== info.ino || opened.size !== file.bytes) throw failure('UNSAFE_PATH', '模型文件在打开时发生变化，未使用。')
      let count = 0
      for (;;) { stopped(job, run); const { bytesRead } = await fd.read(buffer, 0, buffer.length, null); if (!bytesRead) break; count += bytesRead; if (count > file.bytes) return false; digest.update(buffer.subarray(0, bytesRead)) }
      const after = await fd.stat(), current = regular(path)
      if (isReusedFile(job, file.file)) checkSourceDirectory(dirname(path))
      if (count !== file.bytes || !current || current.dev !== opened.dev || current.ino !== opened.ino || after.size !== opened.size || after.mtimeMs !== opened.mtimeMs || after.ctimeMs !== opened.ctimeMs) throw failure('UNSAFE_PATH', '模型文件在校验时发生变化，未使用。')
    } finally { await fd.close() }
    return digest.digest('hex') === file.sha256
  }
  async function download(file, progress, job, run, model) {
    const path = join(paths(job).staging, file.file)
    secureDirectory(dirname(path))
    let offset = regular(path)?.size ?? 0
    // A partial file without a strong validator cannot safely be joined to a new response.
    if (offset > file.bytes || offset > 0 && offset < file.bytes && !progress.etag) offset = 0
    const headers = { 'Accept-Encoding': 'identity' }
    if (offset > 0) { headers.Range = `bytes=${offset}-`; headers['If-Range'] = progress.etag }
    // This is an idle timeout, not a total-download deadline: slow connections may
    // take hours as long as bytes keep arriving. Abort always cancels the socket.
    const idle = new AbortController()
    let timer
    const touch = () => { clearTimeout(timer); timer = setTimeout(() => idle.abort(), 45000); timer.unref?.() }
    touch()
    const signal = AbortSignal.any([run.controller.signal, idle.signal])
    try {
    const response = await request(file, model, { headers, signal })
    touch()
    const etag = strongETag(response.headers.get('etag'))
    let append = false
    if (response.status === 206) {
      const match = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(response.headers.get('content-range') ?? '')
      if (!match || Number(match[1]) !== offset || Number(match[2]) !== file.bytes - 1 || Number(match[3]) !== file.bytes || offset > 0 && etag !== progress.etag) { progress.etag = null; await response.body?.cancel(); throw failure('RANGE_MISMATCH', '服务器的续传范围或版本标识变化，未混合文件；可恢复后重试。') }
      append = offset > 0
    } else if (response.status === 200) offset = 0
    else { await response.body?.cancel(); throw failure('DOWNLOAD_HTTP', `下载来源返回 HTTP ${response.status}；未切换来源。`) }
    const length = response.headers.get('content-length')
    const encoding = response.headers.get('content-encoding')
    if (encoding && encoding !== 'identity' || length !== null && Number(length) !== file.bytes - offset) { await response.body?.cancel(); throw failure('SIZE_MISMATCH', '下载响应大小或编码与固定清单不符。') }
    if (!response.body) throw failure('EMPTY_DOWNLOAD', '下载来源未返回模型数据。')
    stopped(job, run)
    regular(path)
    const fd = await open(path, constants.O_WRONLY | constants.O_CREAT | (append ? constants.O_APPEND : constants.O_TRUNC) | (constants.O_NOFOLLOW ?? 0), 0o600)
    // Checkpoint writes can fail too (for example, a Windows sharing violation).
    // Own the handle before any fallible operation so an explicit retry never
    // inherits a leaked handle that prevents directory promotion.
    try {
      progress.etag = etag; progress.receivedBytes = offset; progress.verified = false
      job.receivedBytes = receivedBytes(job)
      update(job)
      let lastSaved = Date.now()
      for await (const chunk of response.body) {
        touch()
        stopped(job, run)
        if (progress.receivedBytes + chunk.byteLength > file.bytes) throw failure('SIZE_MISMATCH', '下载超过清单中的固定字节数，已停止。')
        // FileHandle.write is allowed to be short; never count bytes before they were written.
        let written = 0
        while (written < chunk.byteLength) { const result = await fd.write(chunk, written, chunk.byteLength - written); if (!result.bytesWritten) throw failure('WRITE_FAILED', '写入模型文件失败。'); written += result.bytesWritten }
        progress.receivedBytes += written
        job.receivedBytes = receivedBytes(job)
        const persist = Date.now() - lastSaved >= 500
        update(job, {}, persist)
        if (persist) lastSaved = Date.now()
      }
      await fd.sync()
    } finally { await fd.close() }
    if (progress.receivedBytes !== file.bytes) throw failure('INCOMPLETE_DOWNLOAD', '下载提前中断，已保留可恢复的部分文件。')
    } finally { clearTimeout(timer); idle.abort() }
  }
  // Recovery is confined to this job's fixed manifest, never an external reuse source.
  const recoveryPath = job => join(paths(job).staging, '.recovery-install')
  async function checkRecoveryTree(directory, model, job, run, includeBackup = false) {
    const files = [...model.files.map(f => f.file), 'whale-install.json', ...runtimePackages(model.runtimePackage).flatMap(r => [...r.entries, ...(r.bundledFiles ?? [])].map(f => ['runtime', r.installDir, f.file].filter(Boolean).join('/')))]
    if (includeBackup) files.push(...files.map(file => `.recovery-install/${file}`))
    const allowed = new Set(files), directories = new Set()
    for (const file of files) { const parts = file.split('/'); parts.pop(); while (parts.length) { directories.add(parts.join('/')); parts.pop() } }
    async function visit(prefix = '') {
      stopped(job, run)
      secureDirectory(join(directory, prefix))
      for (const item of await readdir(join(directory, prefix), { withFileTypes: true })) {
        const name = prefix ? `${prefix}/${item.name}` : item.name
        if (item.isDirectory() && directories.has(name)) await visit(name)
        else if (!allowed.has(name) || !regular(join(directory, name))) throw failure('UNSAFE_PATH', '待恢复安装包含未核实文件或目录，未移动或删除。')
      }
    }
    await visit()
  }
  async function recoverInstallation(job, model, run) {
    const { staging, destination } = paths(job), backup = recoveryPath(job)
    if (!existsSync(destination) && !existsSync(backup)) return
    assertRuntimeStopped(job.id)
    if (existsSync(destination) && existsSync(backup)) throw failure('RECOVERY_CONFLICT', '此任务存在多份待恢复安装，未覆盖或删除；请检查本地模型目录。')
    if (existsSync(destination)) await checkRecoveryTree(destination, model, job, run)
    if (existsSync(staging)) await checkRecoveryTree(staging, model, job, run, true)
    stopped(job, run)
    if (existsSync(destination)) {
      // Existing staging can come from a failed repair on an older release.
      // Keep both copies until every required file is independently verified.
      if (existsSync(staging)) renameSync(destination, backup)
      else renameSync(destination, staging)
    }
    for (const file of model.files) {
      if (isReusedFile(job, file.file)) continue
      const path = join(staging, file.file), candidate = join(backup, file.file)
      if (existsSync(backup) && !await verify(path, file, job, run) && await verify(candidate, file, job, run)) {
        stopped(job, run); secureDirectory(dirname(path)); regular(path); regular(candidate)
        renameSync(candidate, path)
      }
      const progress = job.files.find(f => f.name === file.file)
      progress.receivedBytes = Math.min(file.bytes, regular(path)?.size ?? 0)
    }
    job.receivedBytes = receivedBytes(job)
    update(job)
  }
  async function work(job, run) {
    const model = modelFor(job.modelId, job.modelVariant, job.compute)
    try {
      update(job, { status: 'running', stage: 'checking-runtime', error: null })
      if (model.runtimePackage) { if (!computeOptionsFor(model).includes(job.compute)) throw failure('INVALID_COMPUTE', '此 TTS 计算方案不可用。') }
      else {
        const inspected = await inspectComputeProbe(run.controller.signal, job)
        assertComputeStopped(); stopped(job, run)
        compute = inspected
      }
      stopped(job, run)
      const backend = compute.backends?.[modelMeta[model.id].engine]
      const capability = model.runtimePackage ? { available: true } : job.compute === 'auto' ? backend?.cpu : backend?.[job.compute]
      if (capability?.available !== true) throw failure('RUNTIME_UNAVAILABLE', capability?.reason ?? '所选本地计算后端不可用；请先配置对应 Python 依赖。未下载权重。')
      // Finish every external weight check before ANY network request, including runtime.
      if (job.reused) {
        checkSourceDirectory(job.sourceDirectory)
        for (const file of model.files.filter(f => isReusedFile(job, f.file))) {
          update(job, { stage: 'verifying-local', currentFile: file.file })
          if (!await verify(join(job.sourceDirectory, file.file), file, job, run)) throw failure('LOCAL_MODEL_MISMATCH', `${file.file} 的大小或 SHA-256 不匹配；未下载替代文件。`)
          job.files.find(f => f.name === file.file).verified = true
        }
      }
      await recoverInstallation(job, model, run)
      stopped(job, run)
      secureDirectory(paths(job).staging)
      const space = await statfs(root)
      if (space.bavail * space.bsize < job.totalBytes - job.receivedBytes + runtimePackages(model.runtimePackage).reduce((n, r) => n + r.entries.reduce((a, f) => a + f.bytes, 0), 0) + minFreeBytes) throw failure('ENOSPC', '磁盘空间不足。')
      for (let index = 0; index < model.files.length; index++) {
        stopped(job, run)
        const file = model.files[index], progress = job.files[index], path = join(paths(job).staging, file.file)
        if (isReusedFile(job, file.file)) continue
        update(job, { stage: 'verifying', currentFile: file.file })
        if (!await verify(path, file, job, run)) {
          // A full but corrupt previous attempt must start afresh, never issue bytes=size-.
          const corrupt = regular(path)
          if (corrupt && corrupt.size >= file.bytes) {
            // Windows can reject O_TRUNC without O_CREAT with EINVAL. Open only
            // the existing file, check its identity, then truncate that handle.
            const fd = await open(path, constants.O_WRONLY | (constants.O_NOFOLLOW ?? 0))
            try {
              const opened = await fd.stat(), current = regular(path)
              if (!opened.isFile() || opened.nlink !== 1 || !current ||
                  opened.dev !== corrupt.dev || opened.ino !== corrupt.ino ||
                  opened.dev !== current.dev || opened.ino !== current.ino) {
                throw failure('UNSAFE_PATH', '模型文件在校验后发生变化，未截断。')
              }
              await fd.truncate(0)
            } finally { await fd.close() }
            progress.etag = null; progress.receivedBytes = 0; progress.verified = false
            job.receivedBytes = receivedBytes(job)
          }
          update(job, { stage: 'downloading' })
          await download(file, progress, job, run, model)
          update(job, { stage: 'verifying' })
          if (!await verify(path, file, job, run)) { progress.etag = null; throw failure('HASH_MISMATCH', 'SHA-256 校验失败；文件未安装、未启用。恢复时将重新下载该文件。') }
        }
        progress.receivedBytes = file.bytes; progress.verified = true
        job.receivedBytes = receivedBytes(job); update(job)
      }
      stopped(job, run)
      update(job, { stage: 'installing' })
      if (model.runtimePackage) {
        for (const runtime of runtimePackages(model.runtimePackage)) {
          const destination = secureDirectory(join(paths(job).staging, 'runtime', runtime.installDir ?? ''))
          await extractRuntimeArchive(join(paths(job).staging, runtime.file), destination, runtime, run.controller.signal)
        }
        await checkRuntime(paths(job).staging, model, job, run)
      }
      const recovery = recoveryPath(job)
      if (existsSync(recovery)) { await checkRecoveryTree(recovery, model, job, run); stopped(job, run); await rm(recovery, { recursive: true, force: true }) }
      stopped(job, run)
      atomicJson(join(paths(job).staging, 'whale-install.json'), { schema: 1, modelId: model.id, revision: model.revision, compute: job.compute, source: model.source_repository, licenseUrls: model.license_urls, licenseNote: model.license_note, runtime: runtimeSummary(model.runtimePackage), files: model.files.map(f => ({ name: f.file, sha256: f.sha256, bytes: f.bytes })), ...(job.reused ? { reused: true, sourceDirectory: job.sourceDirectory, modelVariant: job.modelVariant } : {}), verifiedAt: now(), runtimeLoaded: false })
      // A new immutable location preserves all earlier models and configurations.
      if (existsSync(paths(job).destination)) throw failure('DESTINATION_EXISTS', '安装目标已存在，未覆盖。')
      await rename(paths(job).staging, paths(job).destination)
      update(job, { status: 'installed', stage: 'installed', error: null, currentFile: null })
    } catch (error) {
      const status = error.uncertain ? 'failed' : run.stop ?? (closed ? 'paused' : 'failed')
      update(job, { status, stage: status, error: status === 'paused' || status === 'cancelled' ? null : safeMessage(error) })
    }
  }
  async function checkRuntime(directory, model, job, run, probeRuntime = true) {
    const runtime = model.runtimePackage
    if (!runtime) return
    secureDirectory(join(directory, 'runtime'))
    const runtimeFiles = runtimePackages(runtime).flatMap(r => [...r.entries, ...(r.bundledFiles ?? [])].map(f => ({ ...f, file: r.installDir ? `${r.installDir}/${f.file}` : f.file })))
    const expectedDirs = new Set([''])
    for (const file of runtimeFiles) { const parts = file.file.split('/'); parts.pop(); while (parts.length) { expectedDirs.add(parts.join('/')); parts.pop() } }
    async function checkDirectory(relative = '') {
      for (const item of await readdir(join(directory, 'runtime', relative), { withFileTypes: true })) {
        const name = relative ? `${relative}/${item.name}` : item.name
        if (item.isDirectory() && expectedDirs.has(name)) { secureDirectory(join(directory, 'runtime', name)); await checkDirectory(name) }
        else if (!item.isFile() || !runtimeFiles.some(f => f.file === name)) throw failure('UNSAFE_PATH', '运行时目录包含未核实文件，未执行。')
      }
    }
    await checkDirectory()
    for (const file of runtimeFiles) {
      if (!await verify(join(directory, 'runtime', file.file), file, job, run)) throw failure('HASH_MISMATCH', '本地 TTS 运行时已变化，未执行。')
    }
    assertRuntimeStopped(job.id)
    stopped(job, run)
    if (!probeRuntime) return
    try {
      const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => /^(PATH|SYSTEMROOT|WINDIR|TEMP|TMP|TMPDIR|HOME|USERPROFILE|LANG|LC_[A-Z_]+|NUMBER_OF_PROCESSORS|PROCESSOR_ARCHITECTURE)$/i.test(k)))
      if (runtime.kind === 'node-package') {
        const modulePath = join(directory, 'runtime', runtime.installDir, runtime.entrypoint)
        await runtimeRunner(process.execPath, ['-e', 'const m=require(process.argv[1]); if(typeof m.OfflineTts?.createAsync!=="function")process.exit(1)', modulePath], null, { cwd: join(directory, 'runtime'), timeoutMs: 15000, maxOutput: 32768, captureText: true, signal: run.controller.signal, env: { ...env, ELECTRON_RUN_AS_NODE:'1' } })
        return
      }
      const { stdout, stderr } = await runtimeRunner(join(directory, 'runtime', runtime.executable), ['--version'], null, { cwd: join(directory, 'runtime'), timeoutMs: 15000, maxOutput: 32768, captureText: true, signal: run.controller.signal, env: { ...env, HF_HUB_OFFLINE: '1', TRANSFORMERS_OFFLINE: '1' } })
      if (!/12110/.test(stdout + stderr)) throw new Error('version')
    } catch (error) {
      if (error.uncertain) { uncertainRuntimes.set(job.id, error); throw error }
      if (run.controller.signal.aborted) throw error
      throw failure('RUNTIME_UNAVAILABLE', runtime.platform === 'win32' && runtime.kind !== 'node-package' ? '模型已下载，但 CPU 程序未能启动。Windows 需 Microsoft Visual C++ x64 运行库与系统 UCRT；请安装或修复后点恢复。不会自动安装系统组件或切换在线语音。' : '模型已下载，但本机无法运行已校验的 CPU 组件；请检查系统兼容性后恢复。未切换为在线语音。') }
  }
  function launch(job) {
    if (closed) throw failure('INSTALLER_CLOSED', '安装器已关闭。')
    const run = { controller: new AbortController(), stop: null, promise: null }
    running.set(job.id, run)
    run.promise = Promise.resolve().then(() => work(job, run)).catch(() => { job.status = 'failed'; job.stage = 'failed'; job.error = { code: 'STATE_WRITE_FAILED', message: '无法保存安装状态，下载已停止。' }; emit() }).finally(() => running.delete(job.id))
  }
  function enqueue(job) {
    const proposed = new Map(jobs)
    proposed.set(job.id, job)
    save(proposed)
    jobs.set(job.id, job)
    launch(job)
    emit()
    return publicJob(job)
  }
  armRefresh()
  return {
    snapshot,
    plan,
    refreshCompute,
    subscribe(listener) { if (typeof listener !== 'function') throw new TypeError('listener'); listeners.add(listener); return () => listeners.delete(listener) },
    async inspectCompute(signal) {
      if (closed) throw failure('INSTALLER_CLOSED', '安装器已关闭。')
      assertComputeStopped()
      // Drain both queries before deciding: cancellation must never mask an
      // unconfirmed native exit from the other query.
      const results = await Promise.allSettled([inspectComputeProbe(signal), inspectHardwareProbe(signal)])
      assertComputeStopped()
      const rejected = results.find(result => result.status === 'rejected')
      if (rejected) throw rejected.reason
      const [inspected, measured] = results.map(result => result.value)
      if (closed || signal?.aborted) throw failure('TTS_CANCELLED', '本地计算检查已取消。')
      hardware = measured; compute = inspected; emit(); return clone(compute)
    },
    start(request) {
      if (closed) throw failure('INSTALLER_CLOSED', '安装器已关闭。')
      if (!request || Object.keys(request).some(k => !['modelId','compute','planHash','accepted','sourceDirectory','modelVariant'].includes(k)) || request.accepted !== true) throw failure('CONSENT_REQUIRED', '请先查看并确认具体模型、来源、下载大小、保存位置及许可说明。')
      const expected = plan(request.modelId, request.compute, { ...('sourceDirectory' in request ? {sourceDirectory: request.sourceDirectory} : {}), ...('modelVariant' in request ? {modelVariant: request.modelVariant} : {}) })
      if (request.planHash !== expected.planHash) throw failure('PLAN_CHANGED', '安装计划已变化，请重新查看并确认。')
      if ([...jobs.values()].some(j => j.modelId === request.modelId && !['installed','cancelled'].includes(j.status))) throw failure('JOB_EXISTS', '这个模型已有安装任务，请恢复或取消原任务。')
      if (jobs.size + retiredJobs.size >= 1000) throw failure('JOB_LIMIT', '安装任务记录已达到上限。')
      const model = modelFor(request.modelId, expected.modelVariant, expected.compute)
      if (!model.runtimePackage) assertComputeStopped()
      const job = { id: randomUUID(), modelId: model.id, compute: expected.compute, manifestHash: manifestHash(model), status: 'queued', stage: 'queued', createdAt: now(), updatedAt: now(), totalBytes: expected.totalBytes, receivedBytes: 0, runtimeLoaded: false, error: null, files: model.files.map(f => ({ name: f.file, bytes: f.bytes, receivedBytes: 0, verified: false, etag: null })) }
      if (expected.reused) { Object.assign(job, { reused: true, sourceDirectory: expected.sourceDirectory, modelVariant: expected.modelVariant, reusedBytes: expected.reusedBytes }); for (const f of job.files) if (isReusedFile(job, f.name)) f.reused = true }
      return enqueue(job)
    },
    async pause(id) {
      const job = jobFor(id), run = running.get(id)
      assertRuntimeStopped(id)
      if (run) { run.stop = 'paused'; run.controller.abort(); await run.promise }
      assertRuntimeStopped(id)
      return publicJob(job)
    },
    cancel(id) {
      if (closed) return Promise.reject(failure('INSTALLER_CLOSED', '安装器已关闭。'))
      if (cancellations.has(id)) return cancellations.get(id)
      // Latch before any await or abort callback; resume cannot race cleanup.
      const pending = Promise.resolve().then(async () => {
        const job = jobFor(id)
        assertRuntimeStopped(id)
        if (job.status === 'installed') throw failure('ALREADY_INSTALLED', '已安装的模型不会被取消操作删除。')
        const run = running.get(id)
        if (run) { run.stop = 'cancelled'; run.controller.abort(); await run.promise }
        assertRuntimeStopped(id)
        if (job.status === 'installed') throw failure('ALREADY_INSTALLED', '已安装的模型不会被取消操作删除。')
        const staging = paths(job).staging
        if (existsSync(staging)) { secureDirectory(staging); await rm(staging, { recursive: true, force: true }) }
        for (const f of job.files) { f.receivedBytes = 0; f.etag = null; f.verified = false }
        update(job, { status: 'cancelled', stage: 'cancelled', receivedBytes: 0, error: null })
        return publicJob(job)
      }).finally(() => cancellations.delete(id))
      cancellations.set(id, pending)
      return pending
    },
    resume(id) {
      if (closed) throw failure('INSTALLER_CLOSED', '安装器已关闭。')
      if (cancellations.has(id)) throw failure('CANCEL_IN_PROGRESS', '此任务正在取消，请等待清理完成。')
      const job = jobFor(id)
      assertRuntimeStopped(id)
      if (running.has(id)) return publicJob(job)
      if (!['paused','failed'].includes(job.status)) throw failure('NOT_RESUMABLE', '只有暂停或失败任务可恢复；取消会删除临时文件。')
      if (!modelFor(job.modelId, job.modelVariant, job.compute).runtimePackage) assertComputeStopped()
      return enqueue({ ...job, status: 'queued', stage: 'queued', error: null, updatedAt: now() })
    },
    async verifyInstalled(id, signal, { probeRuntime = true, allowMissingArchives = false } = {}) {
      if (closed) throw failure('INSTALLER_CLOSED', '安装器已关闭。')
      const job = jobFor(id), model = modelFor(job.modelId, job.modelVariant, job.compute)
      assertRuntimeStopped(id)
      if (job.status !== 'installed') throw failure('NOT_INSTALLED', '模型尚未完整安装。')
      const controller = new AbortController()
      const run = { controller: { signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal }, stop: null }
      const verification = { controller, promise: null }
      activeVerifications.add(verification)
      verification.promise = (async () => {
        secureDirectory(paths(job).destination)
        for (const file of model.files) {
          // CLI can use fully verified extracted files when an old archive was removed.
          // A present archive, even malformed, must still pass the original checksum.
          if (allowMissingArchives && model.id === QWEN_ID && runtimePackages(model.runtimePackage).some(r => r.file === file.file) && !regular(join(paths(job).destination, file.file))) continue
          if (!await verify(join(isReusedFile(job, file.file) ? job.sourceDirectory : paths(job).destination, file.file), file, job, run)) throw failure('HASH_MISMATCH', `${file.file} 的大小或哈希已变化，未应用模型。`)
        }
        await checkRuntime(paths(job).destination, model, job, run, probeRuntime)
        return { ...publicJob(job), runtimeReady: Boolean(model.runtimePackage) }
      })()
      try { return await verification.promise } finally { activeVerifications.delete(verification) }
    },
    async resolveManagedLocalTts(config, signal) {
      const job = [...jobs.values()].find(j => j.status === 'installed' && j.modelId === config?.localModelId && paths(j).destination === config?.localModelPath && modelMeta[j.modelId]?.purpose === 'tts')
      if (!job) throw failure('NOT_INSTALLED', '所选 TTS 不是已校验的托管安装，请先完成模型下载。')
      await this.verifyInstalled(job.id, signal, { probeRuntime: false, allowMissingArchives: true })
      const model = modelFor(job.modelId, job.modelVariant, job.compute), directory = paths(job).destination
      if (model.runtimePackage.kind === 'node-package') return { engine:'sherpa-melo', modelId:job.modelId, directory, modulePath:join(directory, 'runtime', model.runtimePackage.installDir, model.runtimePackage.entrypoint) }
      // Supplemental metadata never enters model/job manifests or the install tree.
      const serverRuntime = runtime => {
        const supplement = qwenServerCatalog[runtime.sha256]
        if (!supplement || supplement.file !== runtime.file || supplement.bytes !== runtime.bytes || supplement.backend !== (runtime.backend ?? 'cpu') || !regular(join(directory, runtime.file))) return {}
        return { serverRuntime: { archivePath: join(directory, runtime.file), runtimeId: runtime.sha256, backend: runtime.backend ?? 'cpu' } }
      }
      return { ...serverRuntime(model.runtimePackage), engine: 'llama-qwen3', modelId: job.modelId, executable: join(directory, 'runtime', model.runtimePackage.executable), model: join(job.reused ? job.sourceDirectory : directory, QWEN_MAIN[job.modelVariant ?? 'q4_k_m']), mmproj: join(job.reused ? job.sourceDirectory : directory, QWEN_MMPROJ), runtimeId:model.runtimePackage.sha256, computeRequested:job.compute, runtimeCandidates:(model.runtimePackage.dependencies ?? []).filter(r => r.backend === 'vulkan').map(r => ({...serverRuntime(r),backend:r.backend, executable:join(directory,'runtime',r.installDir,r.executable),runtimeId:r.sha256})) }
    },
    async settled(id) { await running.get(id)?.promise; return publicJob(jobFor(id)) },
    async close() {
      closed = true
      if (refreshTimer !== null) { cancelRefresh(refreshTimer); refreshTimer = null }
      try {
        const verifications = [...activeVerifications], probes = [...activeComputeProbes]
        for (const verification of [...verifications, ...probes]) verification.controller.abort()
        await Promise.allSettled([...running.keys()].map(id => this.pause(id)).concat([...verifications, ...probes].map(value => value.promise), [...cancellations.values()], refreshPending ? [refreshPending] : []))
        if (uncertainCompute) throw uncertainCompute
        if (uncertainRuntimes.size) throw uncertainRuntimes.values().next().value
      } finally {
        listeners.clear()
        // Keep both the in-process and PID lock: a replacement instance must not
        // reuse or remove a directory whose native process may still be running.
        if (!uncertainRuntimes.size && !uncertainCompute) unlock()
      }
    },
  }
}
