/** One-shot native worker. Text arrives over stdin, never argv; no network or transcript logging. */
import { createRequire } from 'node:module'
import { writeFile } from 'node:fs/promises'
import { isAbsolute } from 'node:path'
import { StringDecoder } from 'node:string_decoder'
import { validateLocalTtsAssets } from './voice-tts-local.mjs'
const reply = value => process.stdout.write(JSON.stringify(value))
try {
  const decoder = new StringDecoder('utf8')
  let input = '', inputBytes = 0
  for await (const chunk of process.stdin) {
    inputBytes += chunk.length
    if (inputBytes > 65536) throw Error('request size')
    input += decoder.write(chunk)
  }
  input += decoder.end()
  const request = JSON.parse(input)
  if (!['inspect', 'synthesize'].includes(request.op) || !isAbsolute(request.modulePath)) throw Error('request')
  const root = await validateLocalTtsAssets(request.directory)
  const { OfflineTts } = createRequire(import.meta.url)(request.modulePath)
  const tts = await OfflineTts.createAsync({ model: {
    vits: { model: `${root}/model.int8.onnx`, lexicon: `${root}/lexicon.txt`, tokens: `${root}/tokens.txt`, dictDir: `${root}/dict` },
    numThreads: 2, debug: 0, provider: 'cpu',
  }, ruleFsts: ['date.fst', 'number.fst', 'phone.fst', 'new_heteronym.fst'].map(name => `${root}/${name}`).join(','), maxNumSentences: 1 })
  if (!Number.isInteger(tts.sampleRate) || tts.sampleRate < 8000 || tts.sampleRate > 96000) throw Error('sample rate')
  if (request.op === 'inspect') reply({ ok: true, loaded: true, sampleRate: tts.sampleRate })
  else {
    if (typeof request.text !== 'string' || !request.text.trim() || request.text.length > 4000 || !isAbsolute(request.output)) throw Error('request')
    const audio = await tts.generateAsync({ text: request.text, sid: 0, speed: 1 })
    const samples = audio.samples, rate = audio.sampleRate ?? tts.sampleRate
    if (!(samples instanceof Float32Array) || samples.length < 1 || samples.length > 5 * 60 * rate || samples.length * 2 + 44 > 12 * 1024 * 1024) throw Error('audio bounds')
    const wav = Buffer.alloc(44 + samples.length * 2)
    wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16)
    wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 2, 28)
    wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(samples.length * 2, 40)
    for (let i = 0; i < samples.length; i++) {
      if (!Number.isFinite(samples[i])) throw Error('invalid sample')
      wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767), 44 + i * 2)
    }
    await writeFile(request.output, wav, { flag: 'wx', mode: 0o600 })
    reply({ ok: true, synthesized: true, sampleRate: rate, samples: samples.length, audioSeconds: samples.length / rate })
  }
} catch {
  // Native errors can contain user text or local paths. Never forward those details.
  reply({ ok: false, code: 'TTS_LOCAL_SYNTHESIS_FAILED' }); process.exitCode = 1
}
