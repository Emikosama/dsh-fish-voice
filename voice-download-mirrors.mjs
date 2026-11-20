const npmPackage = /^https:\/\/registry\.npmjs\.org\/(sherpa-onnx-(?:node|linux-x64|win-x64))\/-\/\1-1\.13\.8\.tgz$/
const llamaRelease = /^https:\/\/github\.com\/ggml-org\/llama\.cpp\/releases\/download\/b12110\/llama-b12110-bin-(?:ubuntu-x64\.tar\.gz|win-cpu-x64\.zip|ubuntu-vulkan-x64\.tar\.gz|win-vulkan-x64\.zip)$/
const sherpaWasm = /^https:\/\/cdn\.jsdelivr\.net\/npm\/sherpa-onnx@2\.0\.1\/sherpa-onnx-(?:wasm-nodejs\.(?:js|wasm)|kws\.js)$/
const fixedHfFile = /^https:\/\/huggingface\.co\/(?:csukuangfj\/(?:sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17|vits-melo-tts-zh_en)|ggml-org\/Qwen3-TTS-12Hz-1\.7B-Base-GGUF)\/resolve\/[a-f0-9]{40}\/[a-zA-Z0-9._/-]+$/

export function modelDownloadSources({ file, source_url: primary, upstream_url }) {
  const npm = npmPackage.exec(primary)
  if (npm) return [`https://registry.npmmirror.com/${npm[1]}/-/${npm[1]}-1.13.8.tgz`, primary]
  if (llamaRelease.test(primary) && primary.split('/').at(-1) === file) {
    return [`https://gh-proxy.com/${primary}`, primary]
  }
  const upstream = upstream_url ?? primary
  if (!fixedHfFile.test(upstream)) return [primary]
  const mirror = upstream.replace('https://huggingface.co/', 'https://hf-mirror.net/')
  return upstream === primary ? [mirror, primary] : [primary, mirror]
}

export function modelFileDownloadPlan(file) {
  const urls = modelDownloadSources(file)
  return { name: file.file, bytes: file.bytes, sha256: file.sha256, url: file.source_url,
    ...(urls.length > 1 ? { downloadUrls: urls } : {}) }
}

export function isNpmMirrorRedirect(source, target) {
  const upstream = source.replace('https://registry.npmmirror.com/', 'https://registry.npmjs.org/')
  if (upstream === source) return false
  const npm = npmPackage.exec(upstream)
  return !!npm && target === `https://cdn.npmmirror.com/packages/${npm[1]}/1.13.8/${npm[1]}-1.13.8.tgz`
}

export function asrDownloadSources({ url, fallbackUrl, upstreamUrl }) {
  if (sherpaWasm.test(url)) return [url.replace('cdn.jsdelivr.net', 'cdn.jsdmirror.com'), url, fallbackUrl].filter(Boolean)
  return [...modelDownloadSources({ source_url: url, upstream_url: upstreamUrl }), fallbackUrl].filter(Boolean)
}

export function strongETag(value) {
  return typeof value === 'string' && /^"[^"\r\n]{1,256}"$/.test(value) ? value : null
}

export function validDownloadRange(headers, offset, bytes, etag) {
  const range = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(headers.get('content-range') ?? '')
  return !!range && Number(range[1]) === offset && Number(range[2]) === bytes - 1 &&
    Number(range[3]) === bytes && (!offset || strongETag(headers.get('etag')) === etag)
}

export function isDownloadInterrupted(error) {
  const code = error?.cause?.code ?? error?.code
  return error instanceof TypeError || error?.name === 'TimeoutError' ||
    ['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'EAI_AGAIN',
      'UND_ERR_SOCKET', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_RES_CONTENT_LENGTH_MISMATCH'].includes(code)
}
