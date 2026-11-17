import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, readFile, rm, realpath } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { createManagedLocalTtsAdapter } from '../voice-tts-local.mjs'

const sampling = { '--temp': '0.8', '--top-k': '40', '--top-p': '0.95', '--seed': '42' }
const arg = (args, name) => args[args.indexOf(name) + 1]
function wav() {
  const bytes = Buffer.alloc(46)
  bytes.write('RIFF'); bytes.writeUInt32LE(38, 4); bytes.write('WAVEfmt ', 8)
  bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(1, 22)
  bytes.writeUInt32LE(24000, 24); bytes.writeUInt32LE(48000, 28)
  bytes.writeUInt16LE(2, 32); bytes.writeUInt16LE(16, 34)
  bytes.write('data', 36); bytes.writeUInt32LE(2, 40)
  return bytes
}

for (const mode of ['cpu', 'vulkan', 'vulkan-fallback']) {
  for (const reference of [false, true]) {
    test(`Qwen ${mode}, reference=${reference}: probe and repeated speech pin every sampling argument`, async t => {
      const root = await realpath(await mkdtemp(join(tmpdir(), 'whale-qwen-sampling-')))
      t.after(() => rm(root, { recursive: true, force: true }))
      const value = {
        engine: 'llama-qwen3', modelId: 'qwen', runtimeId: '1'.repeat(64),
        executable: join(root, 'cpu', 'llama-tts'), model: join(root, 'model.gguf'), mmproj: join(root, 'mmproj.gguf'),
        computeRequested: mode === 'cpu' ? 'cpu' : 'auto',
        runtimeCandidates: [{ backend: 'vulkan', executable: join(root, 'vulkan', 'llama-tts'), runtimeId: '2'.repeat(64) }],
      }
      for (const path of [value.executable, value.model, value.mmproj, value.runtimeCandidates[0].executable]) {
        await mkdir(dirname(path), { recursive: true }); await writeFile(path, 'stub')
      }
      const config = { localModelId: 'qwen' }
      if (reference) {
        config.referenceAudioPath = join(root, 'reference.wav')
        await writeFile(config.referenceAudioPath, wav())
      }
      const calls = [], plays = []
      const adapter = createManagedLocalTtsAdapter({
        resolveManagedLocalTts: async () => value,
        runner: async (executable, args) => {
          if (args.includes('--list-devices')) {
            assert.deepEqual(args, ['--offline', '--list-devices'])
            return { stdout: 'Available devices:\n  Vulkan0: GPU (8192 MiB, 6000 MiB free)\n' }
          }
          calls.push({ executable, args, text: await readFile(arg(args, '-f'), 'utf8') })
          for (const [flag, expected] of Object.entries(sampling)) {
            assert.equal(args.filter(item => item === flag).length, 1, `${flag} must appear exactly once`)
            assert.equal(arg(args, flag), expected)
          }
          assert.equal(arg(args, '-c'), '4096')
          assert.equal(arg(args, '-n'), '2048')
          assert.equal(args.includes('--tts-speaker-file'), reference)
          if (reference) assert.deepEqual(await readFile(arg(args, '--tts-speaker-file')), wav())
          if (mode === 'vulkan-fallback' && executable !== value.executable) {
            throw Object.assign(new Error('simulated GPU failure before playback'), { code: 'TTS_PROCESS_FAILED' })
          }
          await writeFile(arg(args, '--output'), wav())
          return { audioFrames: 12, gpuLayers: executable === value.executable ? 0 : 29 }
        },
        playback: async path => { plays.push(path); return { completed: true } },
      })
      assert.equal((await adapter.probe(config)).synthesisVerified, true)
      assert.equal(plays.length, 0)
      for (let i = 0; i < 2; i++) {
        const result = await adapter.speak('同一句话。', config)
        assert.equal(result.completed, true)
        assert.equal(result.localComputeBackend, mode === 'vulkan' ? 'vulkan' : 'cpu')
      }
      assert.equal(plays.length, 2)
      assert.equal(calls.length, mode === 'vulkan-fallback' ? 4 : 3)
      assert.deepEqual(calls.slice(-2).map(call => call.text), ['同一句话。', '同一句话。'])
      if (mode === 'vulkan-fallback') {
        assert.notEqual(calls[0].executable, value.executable)
        assert.equal(calls[1].executable, value.executable)
        assert.equal(arg(calls[0].args, '-f'), arg(calls[1].args, '-f'))
        if (reference) assert.equal(arg(calls[0].args, '--tts-speaker-file'), arg(calls[1].args, '--tts-speaker-file'))
      }
    })
  }
}
