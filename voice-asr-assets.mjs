import { createHash, randomUUID } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { lstat, mkdir, open, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, join } from 'node:path'

const failure = (code, message) => Object.assign(new Error(message), { code })
const safePath = file => typeof file === 'string' && file.length <= 240
  && file.split('/').every(part => /^[A-Za-z0-9_@.-]+$/.test(part) && part !== '.' && part !== '..')
const sameStamp = (a, b) => a.dev === b.dev && a.ino === b.ino && a.mtimeNs === b.mtimeNs
  && a.ctimeNs === b.ctimeNs && a.size === b.size
const hashPair = () => ({ md5: createHash('md5'), sha256: createHash('sha256') })
function hashMatches(hash, asset) {
  return hash.md5.digest('hex') === asset.md5 && hash.sha256.digest('hex') === asset.sha256
}

export function createAsrAssets({ rootDirectory, files, log = () => {}, fetcher = globalThis.fetch, label, prefix, receiptName = ".fish-asr-assets.json", readOnly = false } = {}) {
  if (!label || !/^[A-Z][A-Z_]+$/.test(prefix ?? "") || !safePath(receiptName) || receiptName.includes("/")
    || !rootDirectory || !isAbsolute(rootDirectory) || !Array.isArray(files) || !files.length
    || new Set(files.map(asset => asset?.file)).size !== files.length
    || files.some(asset => !safePath(asset?.file) || typeof asset.url !== 'string' || !asset.url.startsWith('https://')
      || (asset.fallbackUrl !== undefined && (typeof asset.fallbackUrl !== 'string' || !asset.fallbackUrl.startsWith('https://')))
      || !Number.isSafeInteger(asset.bytes) || asset.bytes <= 0 || !/^[a-f0-9]{32}$/.test(asset.md5)
      || !/^[a-f0-9]{64}$/.test(asset.sha256))) throw new Error('Invalid pinned ASR catalog')
  const assets = files.map(asset => Object.freeze({ ...asset, path: join(rootDirectory, asset.file) }))
  const revision = createHash('sha256').update(JSON.stringify(files)).digest('hex')
  const statePath = join(rootDirectory, receiptName)
  const totalBytes = assets.reduce((sum, asset) => sum + asset.bytes, 0)
  const lifetime = new AbortController()
  const stamps = new Map()
  const knownCode = value => typeof value === 'string' && value.startsWith(prefix + '_') && /^[A-Z_]+$/.test(value)
  const fail = (code, message) => failure(prefix + "_" + code, label + " " + message)
  const receipt = { revision, installed: false, repaired: false, blocked: null }
  let diskRead = false, state = 'idle', receivedBytes = 0, error = null, generation = 0
  let active = null, checking = null

  const snapshot = () => ({ state, receivedBytes, totalBytes, error })
  const stopped = () => fail('PREPARE_BLOCKED', '自动下载已停止，请手动重试。')
  async function saveReceipt() {
    if (readOnly) return
    const file = `${statePath}.${randomUUID()}.tmp`
    try {
      await writeFile(file, JSON.stringify(receipt) + '\n', { flag: 'wx' })
      await rename(file, statePath)
    } finally { await rm(file, { force: true }).catch(() => {}) }
  }
  async function readReceipt() {
    if (diskRead || readOnly) return
    await mkdir(rootDirectory, { recursive: true })
    try {
      const previous = JSON.parse(await readFile(statePath, 'utf8'))
      if (previous?.revision === revision) {
        receipt.installed = previous.installed === true
        receipt.repaired = previous.repaired === true
        receipt.blocked = knownCode(previous.blocked) ? previous.blocked : null
      }
    } catch (error) {
      if (error.code !== 'ENOENT' && !(error instanceof SyntaxError)) throw error
    }
    diskRead = true
  }
  async function valid(asset) {
    const signal = lifetime.signal
    signal.throwIfAborted()
    try {
      const before = await lstat(asset.path, { bigint: true })
      if (!before.isFile() || before.size !== BigInt(asset.bytes)) return false
      // A verified file can be reused while its identity and change stamp match.
      const previous = stamps.get(asset.path)
      if (previous && sameStamp(previous, before)) return true
      const hash = hashPair()
      for await (const part of createReadStream(asset.path, { signal, highWaterMark: 1024 * 1024 })) {
        hash.md5.update(part)
        hash.sha256.update(part)
      }
      const after = await lstat(asset.path, { bigint: true })
      const checked = sameStamp(before, after) && hashMatches(hash, asset)
      if (checked) stamps.set(asset.path, after)
      return checked
    } catch (error) {
      signal.throwIfAborted()
      if (error.code === 'ENOENT') return false
      throw error
    }
  }
  async function missingAssets() {
    const missing = []
    let presentBytes = 0
    for (let index = 0; index < assets.length; index += 4) {
      const group = assets.slice(index, index + 4)
      const checked = await Promise.all(group.map(valid))
      for (const [position, asset] of group.entries()) {
        if (checked[position]) presentBytes += asset.bytes
        else missing.push(asset)
      }
    }
    return { missing, presentBytes }
  }
  async function download(asset, url) {
    const stall = new AbortController()
    const signal = AbortSignal.any([lifetime.signal, stall.signal, AbortSignal.timeout(600_000)])
    const hash = hashPair()
    const temp = `${asset.path}.${randomUUID()}.part`
    let handle, idleTimer, size = 0
    const observeProgress = () => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => stall.abort(fail('DOWNLOAD_STALLED', '下载长时间没有进度。')), 45_000)
      idleTimer.unref?.()
    }
    try {
      await mkdir(dirname(asset.path), { recursive: true })
      observeProgress()
      const response = await fetcher(url, { signal, headers: { 'Accept-Encoding': 'identity' } })
      if (!response.ok || !response.body) {
        await response.body?.cancel?.().catch(() => {})
        throw Object.assign(fail('DOWNLOAD_FAILED', '文件下载失败。'), { httpStatus: response.status })
      }
      handle = await open(temp, 'wx')
      for await (const chunk of response.body) {
        signal.throwIfAborted()
        observeProgress()
        size += chunk.byteLength
        if (size > asset.bytes) throw fail('CHECKSUM_FAILED', '下载文件大小不符。')
        await handle.writeFile(chunk)
        hash.md5.update(chunk)
        hash.sha256.update(chunk)
        receivedBytes += chunk.byteLength
      }
      if (size !== asset.bytes || !hashMatches(hash, asset)) throw fail('CHECKSUM_FAILED', '下载文件校验失败。')
      await handle.sync()
      await handle.close()
      handle = null
      signal.throwIfAborted()
      await rename(temp, asset.path)
    } catch (error) {
      const cause = stall.signal.aborted ? stall.signal.reason : error
      const detail = cause?.cause?.code ?? cause?.code ?? cause?.name
      log(`${label} asset ${asset.file} (${new URL(url).hostname}): ${/^[A-Za-z0-9_-]{1,90}$/.test(detail ?? '') ? detail : 'download-interrupted'}`)
      throw cause
    } finally {
      clearTimeout(idleTimer)
      await handle?.close().catch(() => {})
      await rm(temp, { force: true }).catch(() => {})
    }
  }
  function prepareInternal(retry, detected = null) {
    if (lifetime.signal.aborted) return Promise.reject(lifetime.signal.reason)
    if (active) return active
    if (!retry && !detected && state === 'ready') return Promise.resolve(snapshot())
    state = 'downloading'
    error = null
    active = Promise.resolve().then(async () => {
      await readReceipt()
      const { missing, presentBytes } = detected ?? await missingAssets()
      receivedBytes = presentBytes
      if (missing.length) {
        if (readOnly) throw fail('UNVERIFIED_MODEL', '选择的模型未通过版本和完整性校验。')
        if (!retry && (receipt.blocked || (receipt.installed && receipt.repaired))) throw stopped()
        if (!retry && receipt.installed) {
          receipt.repaired = true
          await saveReceipt()
        }
        for (const asset of missing) {
          const previousBytes = receivedBytes
          try { await download(asset, asset.url) }
          catch (error) {
            lifetime.signal.throwIfAborted()
            const code = error.cause?.code ?? error.code
            const transient = error instanceof TypeError || error.name === 'TimeoutError'
              || ['ECONNRESET','ECONNREFUSED','ETIMEDOUT','ENOTFOUND','EAI_AGAIN','UND_ERR_SOCKET'].includes(code)
              || error.code === prefix + '_DOWNLOAD_STALLED' || error.httpStatus === 404 || error.httpStatus >= 500
            if (!asset.fallbackUrl || !transient) throw error
            receivedBytes = previousBytes
            await download(asset, asset.fallbackUrl)
          }
        }
        generation++
      }
      if (retry) receipt.repaired = false
      receipt.installed = true
      receipt.blocked = null
      await saveReceipt()
      state = 'ready'
      return snapshot()
    }).catch(async cause => {
      if (lifetime.signal.aborted) throw lifetime.signal.reason
      const code = knownCode(cause?.code) ? cause.code : prefix + "_PREPARE_FAILED"
      error = { code }
      state = 'error'
      // Keep failures across reloads. Other files already verified stay in place.
      if (!readOnly) receipt.blocked ??= code
      if (diskRead) await saveReceipt().catch(() => {})
      log(`${label} assets: ${code}`)
      throw knownCode(cause?.code) ? cause : fail('PREPARE_FAILED', '准备失败，请在设置中重试。')
    }).finally(() => { active = null })
    return active
  }
  return {
    snapshot,
    prepare: ({ retry = false } = {}) => prepareInternal(retry),
    verifyForUse() {
      if (checking) return checking
      checking = Promise.resolve().then(async () => {
        if (active) await active
        if (state !== 'ready') throw stopped()
        const detected = await missingAssets()
        if (detected.missing.length) await prepareInternal(false, detected)
        return generation
      }).finally(() => { checking = null })
      return checking
    },
    async dispose() {
      lifetime.abort(fail('DISPOSED', '已卸载。'))
      await Promise.allSettled([active, checking].filter(Boolean))
    },
  }
}

