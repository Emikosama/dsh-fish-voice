import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { createInterface } from 'node:readline'
import { writeFileSync } from 'node:fs'

export async function edgeSynthesisFixture(_command, _args, payload, { signal } = {}) {
  signal?.throwIfAborted()
  if (payload.op === 'voices') return {ok:true,edgePlaybackSupported:true}
  assert.equal(payload.op, 'synthesize')
  writeFileSync(payload.output, payload.text)
  return {ok:true,synthesized:true,durationMs:24}
}

export function edgePlaybackFixture(onPlay, killDelay = 0) {
  return (command, args) => {
    assert.equal(command, 'powershell.exe')
    assert.ok(args.includes('-EdgeStream'))
    const child = new EventEmitter()
    child.pid = 1000
    child.stdin = new PassThrough(); child.stdout = new PassThrough(); child.stderr = new PassThrough()
    const lines = createInterface({ input: child.stdin })
    const queue = []
    let playing = false, closed = false
    const reply = receipt => child.stdout.write(JSON.stringify({ok:true,...receipt})+'\n')
    const close = code => {
      if (closed) return
      closed = true
      lines.close()
      setTimeout(() => child.emit('close', code), code === null ? killDelay : 0)
    }
    const dispatch = () => {
      if (playing || closed || !queue.length) return
      const request = queue.shift()
      if (request.op === 'edge-play') {
        playing = true
        onPlay(request.path, () => {
          if (closed) return
          playing = false
          reply({played:true})
          dispatch()
        })
        return
      }
      if (request.op === 'edge-start') reply({ready:true})
      else if (request.op === 'edge-end') reply({completed:true})
      else assert.fail('Unexpected native playback operation')
      dispatch()
    }
    lines.on('line', line => { queue.push(JSON.parse(line)); queueMicrotask(dispatch) })
    child.stdin.on('end', () => close(0))
    child.kill = () => { close(null); return true }
    return child
  }
}
