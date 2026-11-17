/** Device identities, not enumeration positions. Never opens microphone streams. */
import { fileURLToPath } from 'node:url'
import { runTtsProcess } from './voice-tts.mjs'
import { validAudioDevice, validAudioInventory } from './voice-audio-device-contract.mjs'
export { validAudioDevice, validAudioInventory } from './voice-audio-device-contract.mjs'
export function audioPreferences(config) {
  const input = config.device ?? null, output = config.outputDevice ?? null
  if (!(validAudioDevice(input) || typeof input === 'string' && input.length <= 256 || Number.isSafeInteger(input) && input >= 0) || !validAudioDevice(output)) throw new Error('音频设备设置无效，请检查原设置')
  return { input, output }
}
export async function inspectAudioDevices({pythonPath='python',signal,runner=runTtsProcess}={}) {
  const helper = fileURLToPath(new URL('./helper/audio_devices.py', import.meta.url))
  const value = await runner(pythonPath,['-B',helper,'enumerate'],{}, {signal,timeoutMs:8000,maxOutput:400000})
  if (!validAudioInventory(value)) throw new Error('设备列表无效，请重试')
  return value
}
