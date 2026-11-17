/** Pinned-runtime planning only. A CPU archive never gains GPU support from flags. */
export const QWEN_GPU_BACKENDS = Object.freeze(['cuda', 'hip', 'vulkan'])
const preferences = new Set(['auto', 'cpu', ...QWEN_GPU_BACKENDS])
const prefixes = Object.freeze({ cuda: 'CUDA', hip: 'ROCm', vulkan: 'Vulkan' })
const fault = () => Object.assign(new Error('本地语音计算组件与设置不匹配'), { code: 'TTS_LOCAL_COMPUTE_INVALID' })
export function qwenComputePreference(config, descriptor) {
  const value = descriptor.computeRequested ?? 'cpu'
  if (!preferences.has(value)) throw fault()
  return value
}
/** The installer, not settings, supplies these hash-verified executable descriptors. */
export function qwenRuntimeCandidates(descriptor, requested) {
  if (!preferences.has(requested)) throw fault()
  const candidates = descriptor.runtimeCandidates ?? []
  if (!Array.isArray(candidates) || candidates.length > QWEN_GPU_BACKENDS.length || new Set(candidates.map(c => c?.backend)).size !== candidates.length) throw fault()
  for (const candidate of candidates) {
    if (!candidate || !QWEN_GPU_BACKENDS.includes(candidate.backend) || typeof candidate.executable !== 'string' || !/^[a-f0-9]{64}$/.test(candidate.runtimeId ?? '') || candidate.executable === descriptor.executable) throw fault()
  }
  if (requested === 'cpu') return []
  return QWEN_GPU_BACKENDS.flatMap(backend => candidates.filter(c => c.backend === backend && (requested === 'auto' || backend === requested)))
}
/** Only fixed upstream device IDs escape this parser. Hardware names/diagnostics do not. */
export function parseQwenGpuDevices(stdout, backend) {
  if (typeof stdout !== 'string' || Buffer.byteLength(stdout) > 65536 || !QWEN_GPU_BACKENDS.includes(backend)) return []
  const result = [], pattern = new RegExp(`^\\s*(${prefixes[backend]}[0-9]{1,3}): ([^\\r\\n]+) \\(([0-9]+) MiB, ([0-9]+) MiB free\\)\\s*$`)
  let inDevices = false
  for (const line of stdout.split(/\r?\n/)) {
    if (line.trim() === 'Available devices:') { inDevices = true; continue }
    if (!inDevices) continue
    const match = line.match(pattern)
    if (!match || /llvmpipe|lavapipe|swiftshader|software rasterizer|microsoft basic render|\bCPU\b/i.test(match[2])) continue
    const total = Number(match[3]), free = Number(match[4])
    if (!Number.isSafeInteger(total) || !Number.isSafeInteger(free) || total <= 0 || free < 0 || free > total || result.some(v => v.device === match[1])) continue
    result.push({ device: match[1], freeMiB: free })
  }
  // One device per invocation avoids implicit multi-device/model placement changes.
  return result.sort((a, b) => b.freeMiB - a.freeMiB || a.device.localeCompare(b.device)).slice(0, 32)
}
export function qwenComputeArgs(backend, device) {
  if (backend === 'cpu') return ['--device', 'none', '-ngl', '0', '--no-mmproj-offload']
  if (!QWEN_GPU_BACKENDS.includes(backend) || !new RegExp(`^${prefixes[backend]}[0-9]{1,3}$`).test(device ?? '')) throw fault()
  return ['--device', device, '--mmproj-device', device, '-ngl', 'all', '--mmproj-offload']
}
/** These runner failures are emitted only after close or confirmed failure to spawn. */
export function qwenCanRetryCpu(error, signal, { completed = false } = {}) {
  if (signal?.aborted || error?.uncertain) return false
  return ['TTS_PROCESS_START_FAILED', 'TTS_PROCESS_FAILED', 'TTS_TIMEOUT', 'TTS_INVALID_RESPONSE'].includes(error?.code) || completed && ['TTS_GPU_OFFLOAD_UNCONFIRMED', 'TTS_COMPLETION_UNCONFIRMED', 'TTS_INVALID_AUDIO'].includes(error?.code)
}
