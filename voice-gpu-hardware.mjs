/** Local inventory only. GPU detection does not validate CUDA/Vulkan or model loading. */
import { win32 } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runTtsProcess } from './voice-tts.mjs'

const unknown = reason => ({ gpuMemoryBytes: null, gpuMemoryReason: reason, gpuSource: null, gpuAdapters: [] })
const bytes = value => Number.isSafeInteger(value) && value >= 0

export function normalizeGpuInventory(value) {
  if (value?.ok !== true || !Array.isArray(value.adapters) || value.adapters.length > 32) throw new Error('Invalid GPU inventory')
  const seen = new Set(), adapters = []
  for (const item of value.adapters) {
    if (typeof item?.name !== 'string' || !item.name.trim() || item.name.length > 256 || /[\x00-\x1f]/.test(item.name)
      || !/^[a-f0-9]{16}$/i.test(item.luid ?? '') || !bytes(item.flags) || item.flags > 0xffffffff
      || !bytes(item.vendorId) || item.vendorId > 0xffffffff || !bytes(item.deviceId) || item.deviceId > 0xffffffff
      || !bytes(item.dedicatedVideoMemoryBytes) || !bytes(item.sharedSystemMemoryBytes)) throw new Error('Invalid GPU inventory')
    // Preserve distinct LUIDs, including identical-card systems. Never sum their memory.
    if (seen.has(item.luid.toLowerCase())) continue
    seen.add(item.luid.toLowerCase())
    // Software and remote adapters are not hardware candidates. Virtual display
    // names are excluded conservatively; this is not a runtime-eligibility test.
    if ((item.flags & 3) || /virtual|remote|basic render|displaylink|indirect display/i.test(item.name)) continue
    adapters.push({ name: item.name.trim(), dedicatedVideoMemoryBytes: item.dedicatedVideoMemoryBytes, sharedSystemMemoryBytes: item.sharedSystemMemoryBytes })
  }
  const memory = adapters.length ? Math.max(...adapters.map(a => a.dedicatedVideoMemoryBytes)) : null
  return {
    gpuMemoryBytes: memory, gpuSource: 'dxgi', gpuAdapters: adapters,
    gpuMemoryReason: memory === null ? '未检测到可用的硬件显卡。' : 'Windows DXGI：显示单张显卡的最大专用显存，共享内存不计入；不代表模型已通过 GPU 运行验证。',
  }
}

/** One bounded cache and one in-flight query per installer. No persistence. */
export function createGpuHardwareProbe({ platform = process.platform, env = process.env, runner = runTtsProcess, now = Date.now, cacheMs = 300000 } = {}) {
  let cached = null, expiresAt = 0, pending = null, uncertain = null
  return function inspect({ signal } = {}) {
    if (signal?.aborted) return Promise.reject(Object.assign(new Error('Hardware inspection cancelled'), { code: 'TTS_CANCELLED' }))
    if (uncertain) return Promise.reject(uncertain)
    if (platform !== 'win32') return Promise.resolve(unknown('当前平台尚未接入专用显存检测。'))
    if (pending) return pending
    if (cached && now() < expiresAt) return Promise.resolve(structuredClone(cached))
    // Sysnative reaches 64-bit PowerShell from a WOW64 Node host; System32 is
    // native otherwise. Never resolve a same-named executable from the cwd/PATH.
    const shell = win32.join(env.SystemRoot || 'C:\\Windows', env.PROCESSOR_ARCHITEW6432 ? 'Sysnative' : 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe')
    pending = Promise.resolve().then(() => runner(shell, ['-NoLogo', '-NoProfile', '-NonInteractive', '-File', fileURLToPath(new URL('./helper/gpu_hardware_windows.ps1', import.meta.url))], {}, { signal, timeoutMs: 8000, maxOutput: 32768 }))
      .then(normalizeGpuInventory)
      .catch(error => {
        if (error?.uncertain) { uncertain = error; throw error }
        if (signal?.aborted) throw error
        // Do not leak native stderr, paths or arbitrary subprocess messages.
        return unknown('Windows 显卡查询未完成；暂时无法读取专用显存。')
      })
      .then(value => { cached = value; expiresAt = now() + Math.max(0, Math.min(cacheMs, 300000)); return structuredClone(value) })
      .finally(() => { pending = null })
    return pending
  }
}
