import { mkdtemp, rmdir, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const systemTtsErrors = {
  TTS_SYSTEM_UNAVAILABLE: 'Windows 系统语音无法使用，请检查系统中的语音设置',
  TTS_SYSTEM_NO_VOICES: 'Windows 没有可用的系统语音，请在系统设置中添加语音',
  TTS_SYSTEM_VOICE_UNAVAILABLE: '所选 Windows 音色已不可用，请重新选择或改用自动选择',
  TTS_SYSTEM_PLAYBACK_FAILED: 'Windows 系统语音播放失败，请检查音频输出设备',
}

const fault = (code, message = systemTtsErrors[code]) => Object.assign(new Error(message), { code })
const voiceText = (value, maxLength) => typeof value === 'string' && value.length <= maxLength && Boolean(value.trim()) && !/[\u0000-\u001f\u007f]/.test(value)
export const validSystemVoiceId = value => voiceText(value, 512)
const script = fileURLToPath(new URL('./helper/tts_system_windows.ps1', import.meta.url))

export function createWindowsSystemTtsAdapter({ platform, runner, outputDevice, playback }) {
  const powershell = (payload, signal, timeoutMs) => runner('powershell.exe', ['-NoLogo', '-NoProfile', '-NonInteractive', '-MTA', '-ExecutionPolicy', 'RemoteSigned', '-File', script], payload, {
    signal, timeoutMs, nativeAudioErrors: true, maxOutput: 256 * 1024,
  })
  return {
    platform,
    usesDefaultOutput: () => outputDevice() == null,
    async inspect(signal) {
      if (platform !== 'win32') return {}
      try {
        const { systemVoices, systemDefaultVoiceId } = await powershell({ op: 'inspect' }, signal, 8000)
        if (!Array.isArray(systemVoices)) return {}
        const voices = new Map()
        for (const row of systemVoices) {
          if (validSystemVoiceId(row?.id) && voiceText(row.name, 256) && voiceText(row.language, 64)) {
            voices.set(row.id, { id: row.id, name: row.name, language: row.language })
            if (voices.size === 128) break
          }
        }
        return { systemVoices: [...voices.values()], systemDefaultVoiceId: voices.has(systemDefaultVoiceId) ? systemDefaultVoiceId : null }
      } catch (error) {
        if (signal?.aborted || error?.uncertain) throw error
        return {}
      }
    },
    async speak(text, config, signal, { preview, beforeRequest }) {
      if (platform !== 'win32') throw fault('TTS_PLATFORM_UNSUPPORTED', 'Windows 系统语音仅在 Windows 上可用')
      const request = {
        text, systemVoiceId: config.systemVoiceId, volume: config.volume, preview,
        preferChinese: /\p{Script=Han}/u.test(text) && !/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text),
      }
      const selectedOutput = outputDevice()
      if (selectedOutput == null) {
        beforeRequest()
        return powershell({ op: 'speak', ...request }, signal, 120000)
      }
      let directory, path
      try {
        try { directory = await mkdtemp(join(tmpdir(), 'fish-system-tts-')) }
        catch { throw fault('TTS_SYSTEM_UNAVAILABLE', '无法准备系统语音文件，请检查 Windows 临时目录') }
        path = join(directory, 'speech.wav')
        beforeRequest()
        const result = await powershell({ op: 'synthesize', ...request, path }, signal, 120000)
        if (result.completed !== true) return result
        beforeRequest()
        const played = await playback(path, config, signal, selectedOutput)
        return { ...result, completed: played?.completed === true }
      } finally {
        if (path) await unlink(path).catch(() => {})
        if (directory) await rmdir(directory).catch(() => {})
      }
    },
  }
}
