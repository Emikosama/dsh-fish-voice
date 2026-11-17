/** One-shot Edge TTS worker. Text stays on stdin and never appears in diagnostics. */
import { createRequire } from 'node:module'
import { open, lstat, rm } from 'node:fs/promises'
import { StringDecoder } from 'node:string_decoder'
import { extname, dirname, isAbsolute, normalize } from 'node:path'
import { EDGE_VOICES, splitLocalTtsText } from './voice-tts.mjs'

const MAX_STDIN_BYTES = 128 * 1024
const MAX_TEXT_BYTES = 64 * 1024
const MAX_AUDIO_BYTES = 10 * 1024 * 1024
const TOTAL_BUDGET_MS = 21_000
const MAX_CHUNK_TIMEOUT_MS = 12_000
const OUTPUT_FORMAT = 'audio-24khz-48kbitrate-mono-mp3'
const voiceSet = new Set(EDGE_VOICES)
const reply = value => process.stdout.write(JSON.stringify(value))

function validateMp3Segment(audio) {
  if (!Buffer.isBuffer(audio) || audio.length < 4) throw new Error('invalid audio')
  const mpeg1Bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]
  const mpeg2Bitrates = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
  const baseRates = [44100, 48000, 32000]
  let offset = 0, frames = 0
  while (offset < audio.length) {
    if (offset + 4 > audio.length) throw new Error('truncated audio')
    const header = audio.readUInt32BE(offset)
    const version = (header >>> 19) & 0b11
    const layer = (header >>> 17) & 0b11
    const bitrateIndex = (header >>> 12) & 0b1111
    const rateIndex = (header >>> 10) & 0b11
    const padding = (header >>> 9) & 1
    const channelMode = (header >>> 6) & 0b11
    if ((header >>> 21) !== 0x7ff || version === 0b01 || layer !== 0b01 || bitrateIndex === 0 || bitrateIndex === 0b1111 || rateIndex === 0b11) throw new Error('invalid frame')
    const sampleRate = Math.floor(baseRates[rateIndex] / (version === 0b11 ? 1 : version === 0b10 ? 2 : 4))
    const bitrate = (version === 0b11 ? mpeg1Bitrates : mpeg2Bitrates)[bitrateIndex] * 1000
    const frameBytes = Math.floor((version === 0b11 ? 144 : 72) * bitrate / sampleRate) + padding
    const channels = channelMode === 0b11 ? 1 : 2
    if (sampleRate !== 24000 || channels !== 1 || frameBytes < 4 || offset + frameBytes > audio.length) throw new Error('unexpected MP3 format')
    offset += frameBytes
    frames++
  }
  if (!frames || offset !== audio.length) throw new Error('empty audio')
  return Math.ceil(frames * 576 * 1000 / 24000)
}

function decodeRequest() {
  return (async () => {
    const decoder = new StringDecoder('utf8')
    let body = '', bytes = 0
    for await (const chunk of process.stdin) {
      bytes += chunk.length
      if (bytes > MAX_STDIN_BYTES) throw new Error('request too large')
      body += decoder.write(chunk)
    }
    body += decoder.end()
    return JSON.parse(body)
  })()
}

async function outputHandle(output) {
  if (typeof output !== 'string' || output.length > 4096 || !isAbsolute(output) || normalize(output) !== output || /[\x00-\x1f]/.test(output) || extname(output).toLowerCase() !== '.mp3') throw new Error('invalid output')
  const directory = dirname(output)
  const dirInfo = await lstat(directory)
  if (!dirInfo.isDirectory()) throw new Error('invalid output directory')
  try {
    await lstat(output)
    throw new Error('output already exists')
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }
}

async function synthesize(request) {
  const keys = ['op', 'text', 'voice', 'output']
  if (!request || typeof request !== 'object' || Array.isArray(request) || Object.keys(request).length !== keys.length || keys.some(key => !Object.hasOwn(request, key))) throw new Error('invalid request')
  if (request.op !== 'synthesize' || typeof request.text !== 'string' || !request.text.trim() || !voiceSet.has(request.voice)) throw new Error('invalid request')
  const textBytes = Buffer.byteLength(request.text, 'utf8')
  if (textBytes > MAX_TEXT_BYTES) throw new Error('text too large')
  if (Array.from(request.text).some(character => character.length === 1 && /[\uD800-\uDFFF]/u.test(character))) throw new Error('invalid unicode')

  const chunks = splitLocalTtsText(request.text)
  if (!chunks.length || chunks.length > 180) throw new Error('invalid text chunks')
  const startedAt = Date.now()
  const deadline = startedAt + TOTAL_BUDGET_MS
  const language = request.voice.split('-').slice(0, 2).join('-')
  const { EdgeTTS } = createRequire(import.meta.url)('./vendor/edge-tts.cjs')
  if (typeof EdgeTTS !== 'function') throw new Error('vendor unavailable')

  await outputHandle(request.output)
  const audioSegments = []
  let outputBytes = 0, outputDurationMs = 0
  for (let index = 0; index < chunks.length; index++) {
    const remaining = deadline - Date.now()
    if (remaining <= 0) throw new Error('synthesis deadline')
    const fairShare = Math.max(1, Math.floor(remaining / (chunks.length - index)))
    const timeout = Math.min(MAX_CHUNK_TIMEOUT_MS, fairShare)
    const tts = new EdgeTTS({ voice: request.voice, lang: language, outputFormat: OUTPUT_FORMAT, saveSubtitles: false, timeout })
    const audioParts = []
    let chunkBytes = 0
    for await (const part of tts.streamAudio(chunks[index])) {
      if (!Buffer.isBuffer(part)) throw new Error('unexpected stream payload')
      chunkBytes += part.length
      if (outputBytes + chunkBytes > MAX_AUDIO_BYTES) throw new Error('audio too large')
      audioParts.push(part)
    }
    const audio = Buffer.concat(audioParts, chunkBytes)
    const durationMs = validateMp3Segment(audio)
    outputBytes += audio.length
    outputDurationMs += durationMs
    audioSegments.push(audio)
    if (Date.now() >= deadline) throw new Error('synthesis deadline')
  }

  if (!outputBytes || outputBytes > MAX_AUDIO_BYTES || Date.now() >= deadline) throw new Error('audio bounds')
  const completeAudio = Buffer.concat(audioSegments, outputBytes)
  let outputFile = null, ownsOutput = false, committed = false
  try {
    outputFile = await open(request.output, 'wx', 0o600)
    ownsOutput = true
    await outputFile.writeFile(completeAudio)
    await outputFile.sync()
    await outputFile.close()
    outputFile = null
    const info = await lstat(request.output)
    if (!info.isFile() || info.isSymbolicLink() || info.size !== outputBytes || Date.now() >= deadline) throw new Error('incomplete output')
    committed = true
    return { ok: true, synthesized: true, durationMs: outputDurationMs }
  } finally {
    if (outputFile) await outputFile.close().catch(() => {})
    if (ownsOutput && !committed) await rm(request.output, { force: true }).catch(() => {})
  }
}

try {
  const request = await decodeRequest()
  reply(await synthesize(request))
} catch {
  reply({ ok: false, code: 'EDGE_SYNTHESIS_FAILED' })
  process.exitCode = 1
}
