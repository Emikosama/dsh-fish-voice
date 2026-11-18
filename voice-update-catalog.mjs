import { compare, parse, satisfies, validRange } from './voice-update-semver.mjs'

export const UPDATE_PACKAGE = 'dsh-fish-voice'
export const UPDATE_REGISTRY = 'https://registry.npmjs.org/'
export const UPDATE_CATALOG = 'https://raw.githubusercontent.com/Emikosama/dsh-fish-voice/refs/heads/main/updates.json'
const RELEASE_PAGE = 'https://github.com/Emikosama/dsh-fish-voice/releases/tag/v'
const MAX_RESPONSE_BYTES = 256 * 1024
const SHA512 = /^sha512-[A-Za-z0-9+/]{86}==$/

export const exactUpdateVersion = value => typeof value === 'string' && value.length <= 128
  && parse(value)?.version === value
export const updateChannel = version => parse(version)?.prerelease.length ? 'preview' : 'stable'
export const compareUpdateVersions = compare
const validRequirement = value => typeof value === 'string' && value.length <= 256 && value.trim() !== ''
  && validRange(value) !== null
const list = value => Array.isArray(value) && value.length > 0 && value.length <= 32
  && value.every(item => typeof item === 'string' && /^!?[a-z0-9_-]{1,32}$/.test(item))
const allowed = (rule, value, negation = false) => {
  if (!list(rule)) return false
  if (!negation) return rule.includes(value)
  const positive = rule.filter(item => !item.startsWith('!'))
  return !rule.includes(`!${value}`) && (positive.length === 0 || positive.includes(value) || positive.includes('any'))
}
const object = value => value && typeof value === 'object' && !Array.isArray(value)

export class UpdateCatalogError extends Error {}

async function readJson(fetchImpl, url, signal, failure) {
  try {
    const response = await fetchImpl(url, {
      signal, redirect: 'error', credentials: 'omit', cache: 'no-store',
      headers: { accept: 'application/json' },
    })
    if (!response.ok || !response.body || Number(response.headers.get('content-length')) > MAX_RESPONSE_BYTES) {
      await response.body?.cancel()
      throw new Error(`HTTP ${response.status}`)
    }
    const chunks = []
    let size = 0
    for await (const chunk of response.body) {
      size += chunk.length
      if (size > MAX_RESPONSE_BYTES) throw new Error('update metadata exceeds size limit')
      chunks.push(chunk)
    }
    return JSON.parse(Buffer.concat(chunks, size).toString('utf8'))
  } catch (error) {
    signal.throwIfAborted()
    throw new UpdateCatalogError(failure, { cause: error })
  }
}

export async function readOfficialUpdatePackage(version, fetchImpl, signal) {
  if (!exactUpdateVersion(version)) throw new UpdateCatalogError('无法确认鱼应包的精确版本。')
  const escaped = encodeURIComponent(version)
  const packageUrl = `${UPDATE_REGISTRY}${UPDATE_PACKAGE}`
  const manifest = await readJson(fetchImpl, `${packageUrl}/${escaped}`, signal, '无法向官方 npm 源确认更新版本，请稍后重试。')
  if (!object(manifest) || manifest.name !== UPDATE_PACKAGE || manifest.version !== version
    || typeof manifest.dist?.integrity !== 'string' || !SHA512.test(manifest.dist.integrity)
    || manifest.dist?.tarball !== `${packageUrl}/-/${UPDATE_PACKAGE}-${escaped}.tgz`
    || !object(manifest.dsh?.bundle)) {
    throw new UpdateCatalogError('无法确认官方 npm 包的身份或下载地址。')
  }
  return manifest
}

function readReviewedReleases(catalog) {
  if (catalog?.schema !== 1 || !Array.isArray(catalog.releases) || catalog.releases.length > 64) {
    throw new UpdateCatalogError('鱼应官方更新目录格式无效。')
  }
  const seen = new Set()
  for (const release of catalog.releases) {
    if (!exactUpdateVersion(release?.version) || seen.has(release.version)
      || release.channel !== updateChannel(release.version) || !SHA512.test(release.integrity)
      || !validRequirement(release.dsh) || !list(release.platforms) || !list(release.architectures)
      || typeof release.announcement !== 'string' || !release.announcement.trim()
      || release.announcement.length > 600 || /[\u0000-\u0008\u000b-\u001f\u007f]/u.test(release.announcement)) {
      throw new UpdateCatalogError('鱼应官方更新目录含无效的版本记录。')
    }
    seen.add(release.version)
  }
  return catalog.releases
}

function packageCompatibility(manifest, reviewed, environment) {
  const { platform, arch, nodeVersion, dshVersion, evaluateDsh } = environment
  if (!allowed(reviewed.platforms, platform) || !allowed(reviewed.architectures, arch)
    || manifest.os !== undefined && !allowed(manifest.os, platform, true)
    || manifest.cpu !== undefined && !allowed(manifest.cpu, arch, true)
    || manifest.dsh.bundle.platforms !== undefined && !allowed(manifest.dsh.bundle.platforms, platform)) {
    return '此版本暂未适配当前系统或处理器。'
  }
  const node = manifest.engines?.node
  if (!validRequirement(node) || !satisfies(nodeVersion, node)) return '此版本需要不同的 Node.js 运行环境。'
  if (!satisfies(dshVersion, reviewed.dsh, { includePrerelease: true })
    || evaluateDsh(manifest, {}, dshVersion)) return '此版本暂未适配正在运行的 DSH。'
  return null
}

export async function findReviewedUpdate({ currentVersion, channel, environment, fetchImpl, signal }) {
  const catalog = await readJson(fetchImpl, UPDATE_CATALOG, signal, '无法读取鱼应官方更新目录，请稍后重试。')
  const releases = readReviewedReleases(catalog)
    .filter(release => compare(release.version, currentVersion) > 0
      && (release.channel === 'stable' || channel === 'preview'))
    .sort((left, right) => compare(right.version, left.version))
  let incompatible = null
  let verificationError = null
  for (const reviewed of releases) {
    try {
      const manifest = await readOfficialUpdatePackage(reviewed.version, fetchImpl, signal)
      if (manifest.dist.integrity !== reviewed.integrity) {
        throw new UpdateCatalogError('官方 npm 包与更新审核记录不一致，已停止提供该更新。')
      }
      if (manifest.deprecated) continue
      const release = Object.freeze({
        version: reviewed.version, announcement: reviewed.announcement.trim(), url: `${RELEASE_PAGE}${encodeURIComponent(reviewed.version)}`,
      })
      const message = packageCompatibility(manifest, reviewed, environment)
      if (!message) return { status: 'available', release, message: null }
      incompatible ??= { status: 'incompatible', release, message }
    } catch (error) {
      signal.throwIfAborted()
      verificationError ??= error
    }
  }
  if (verificationError) throw verificationError
  return incompatible ?? { status: 'current', release: null, message: '当前已是适用的最新版本。' }
}
