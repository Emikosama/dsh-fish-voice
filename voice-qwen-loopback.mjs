/** Direct numeric loopback HTTP only. Does not use fetch/global dispatchers,
 * environment proxies, DNS, redirects, connection pooling or ambient agents. */
import { request } from 'node:http'
import { Readable } from 'node:stream'
export function requestQwenLoopback(url, { method, headers, body, signal, redirect } = {}) {
  return new Promise((resolve, reject) => {
    let target
    try {
      target = new URL(url)
      if (target.protocol !== 'http:' || target.hostname !== '127.0.0.1' || !/^\d+$/.test(target.port) || Number(target.port) < 1 || Number(target.port) > 65535 || target.username || target.password || target.pathname !== '/tts' || target.search || target.hash || method !== 'POST' || redirect !== 'error' || typeof body !== 'string' || Buffer.byteLength(body) > 20 * 1024 * 1024) throw new TypeError('Invalid local speech request')
      signal?.throwIfAborted()
    } catch (error) { reject(error); return }
    let incoming, settled = false
    const cleanup = () => signal?.removeEventListener('abort', abort)
    const fail = error => { if (!settled) { settled = true; reject(error) } }
    const req = request({ protocol: 'http:', hostname: '127.0.0.1', port: Number(target.port), path: '/tts', method: 'POST', agent: false,
      headers: { ...headers, Host: `127.0.0.1:${target.port}`, 'Content-Length': Buffer.byteLength(body), Connection: 'close' },
    }, res => {
      incoming = res
      res.once('close', cleanup)
      if (res.statusCode >= 300 && res.statusCode < 400) {
        fail(Object.assign(new Error('Local speech redirect refused'), { code: 'TTS_INVALID_RESPONSE' }))
        res.destroy(); req.destroy(); return
      }
      try {
        const responseHeaders = new Headers()
        for (let i = 0; i < res.rawHeaders.length; i += 2) responseHeaders.append(res.rawHeaders[i], res.rawHeaders[i + 1])
        // toWeb propagates backpressure and cancel() to IncomingMessage.destroy.
        const stream = [204, 205, 304].includes(res.statusCode) ? null : Readable.toWeb(res)
        const response = new Response(stream, { status: res.statusCode, headers: responseHeaders })
        if (!stream) res.resume()
        settled = true; resolve(response)
      } catch (error) { fail(error); res.destroy(); req.destroy() }
    })
    const abort = () => {
      const reason = signal.reason instanceof Error ? signal.reason : new DOMException('Aborted', 'AbortError')
      fail(reason); incoming?.destroy(reason); req.destroy(reason)
    }
    req.on('error', error => { cleanup(); fail(error) })
    req.once('close', () => { if (!incoming) cleanup() })
    signal?.addEventListener('abort', abort, { once: true })
    if (signal?.aborted) abort()
    else req.end(body)
  })
}
