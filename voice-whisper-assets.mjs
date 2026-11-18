import { createHash, randomUUID } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { lstat, mkdir, open, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { dirname, isAbsolute, join } from 'node:path'

const failure = (code, message) => Object.assign(new Error(message), { code })
const safePath = file => typeof file === 'string' && file.length <= 240
  && file.split('/').every(part => /^[A-Za-z0-9_@.-]+$/.test(part) && part !== '.' && part !== '..')
const hashPair = () => ({ md5: createHash('md5'), sha256: createHash('sha256') })
function hashMatches(hash, asset) {
  return hash.md5.digest('hex') === asset.md5 && hash.sha256.digest('hex') === asset.sha256
}

export function createWhisperAssets({ rootDirectory, files, log = () => {}, fetcher = globalThis.fetch } = {}) {
  if (!rootDirectory || !isAbsolute(rootDirectory) || !Array.isArray(files) || !files.length
    || new Set(files.map(asset => asset?.file)).size !== files.length
    || files.some(asset => !safePath(asset?.file) || typeof asset.url !== 'string' || !asset.url.startsWith('https://')
      || !Number.isSafeInteger(asset.bytes) || asset.bytes <= 0 || !/^[a-f0-9]{32}$/.test(asset.md5)
      || !/^[a-f0-9]{64}$/.test(asset.sha256))) throw new Error('Invalid pinned Whisper Base catalog')
  const assets = files.map(asset => Object.freeze({ ...asset, path: join(rootDirectory, asset.file) }))
  const revision = createHash('sha256').update(JSON.stringify(files)).digest('hex')
  const statePath = join(rootDirectory, '.whale-whisper-assets.json')
  const totalBytes = assets.reduce((sum, asset) => sum + asset.bytes, 0)
  const lifetime = new AbortController()
  const receipt = { revision, installed: false, repaired: false, blocked: null }
  let diskRead = false, state = 'idle', receivedBytes = 0, error = null, generation = 0
  let active = null, checking = null

  const snapshot = () => ({ state, receivedBytes, totalBytes, error })
  const stopped = () => failure('WHISPER_PREPARE_BLOCKED', 'Whisper Base 自动下载已停止，请手动重试。')
  async function saveReceipt() {
    const file = `${statePath}.${randomUUID()}.tmp`
    try {
      await writeFile(file, JSON.stringify(receipt) + '\n', { flag: 'wx' })
      await rename(file, statePath)
    } finally { await rm(file, { force: true }).catch(() => {}) }
  }
  async function readReceipt() {
    if (diskRead) return
    await mkdir(rootDirectory, { recursive: true })
    try {
      const previous = JSON.parse(await readFile(statePath, 'utf8'))
      if (previous?.revision === revision) {
        receipt.installed = previous.installed === true
        receipt.repaired = previous.repaired === true
        receipt.blocked = typeof previous.blocked === 'string' && /^WHISPER_[A-Z_]+$/.test(previous.blocked) ? previous.blocked : null
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
      const hash = hashPair()
      for await (const part of createReadStream(asset.path, { signal, highWaterMark: 1024 * 1024 })) {
        hash.md5.update(part)
        hash.sha256.update(part)
      }
      const after = await lstat(asset.path, { bigint: true })
      return before.dev === after.dev && before.ino === after.ino && before.mtimeNs === after.mtimeNs
        && before.ctimeNs === after.ctimeNs && before.size === after.size && hashMatches(hash, asset)
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
  async function download(asset) {
    const stall = new AbortController()
    const signal = AbortSignal.any([lifetime.signal, stall.signal, AbortSignal.timeout(600_000)])
    const hash = hashPair()
    const temp = `${asset.path}.${randomUUID()}.part`
    let handle, idleTimer, size = 0
    const observeProgress = () => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => stall.abort(failure('WHISPER_DOWNLOAD_STALLED', 'Whisper Base 下载长时间没有进度。')), 45_000)
      idleTimer.unref?.()
    }
    try {
      await mkdir(dirname(asset.path), { recursive: true })
      observeProgress()
      const response = await fetcher(asset.url, { signal, headers: { 'Accept-Encoding': 'identity' } })
      if (!response.ok || !response.body) throw failure('WHISPER_DOWNLOAD_FAILED', 'Whisper Base 文件下载失败。')
      handle = await open(temp, 'wx')
      for await (const chunk of response.body) {
        signal.throwIfAborted()
        observeProgress()
        size += chunk.byteLength
        if (size > asset.bytes) throw failure('WHISPER_CHECKSUM_FAILED', 'Whisper Base 下载文件大小不符。')
        await handle.writeFile(chunk)
        hash.md5.update(chunk)
        hash.sha256.update(chunk)
        receivedBytes += chunk.byteLength
      }
      if (size !== asset.bytes || !hashMatches(hash, asset)) throw failure('WHISPER_CHECKSUM_FAILED', 'Whisper Base 下载文件校验失败。')
      await handle.sync()
      await handle.close()
      handle = null
      signal.throwIfAborted()
      await rename(temp, asset.path)
    } catch (error) {
      const cause = stall.signal.aborted ? stall.signal.reason : error
      const detail = cause?.cause?.code ?? cause?.code ?? cause?.name
      log(`Whisper Base asset ${asset.file}: ${/^[A-Za-z0-9_-]{1,90}$/.test(detail ?? '') ? detail : 'download-interrupted'}`)
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
        if (!retry && (receipt.blocked || (receipt.installed && receipt.repaired))) throw stopped()
        if (!retry && receipt.installed) {
          receipt.repaired = true
          await saveReceipt()
        }
        for (const asset of missing) await download(asset)
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
      const code = typeof cause?.code === 'string' && /^WHISPER_[A-Z_]+$/.test(cause.code) ? cause.code : 'WHISPER_PREPARE_FAILED'
      error = { code }
      state = 'error'
      // Keep failures across reloads. Other files already verified stay in place.
      receipt.blocked ??= code
      if (diskRead) await saveReceipt().catch(() => {})
      log(`Whisper Base model assets: ${code}`)
      throw failure(code, code === 'WHISPER_PREPARE_BLOCKED' ? stopped().message : 'Whisper Base 准备失败，请在设置中重试。')
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
      lifetime.abort(failure('WHISPER_DISPOSED', '鱼应已卸载'))
      await Promise.allSettled([active, checking].filter(Boolean))
    },
  }
}
