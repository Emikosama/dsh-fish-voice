import {
  UPDATE_PACKAGE, UpdateCatalogError, compareUpdateVersions,
  exactUpdateVersion, findReviewedUpdate, updateChannel,
} from './voice-update-catalog.mjs'
import { installReviewedBundle, verifiedLocalUpdateArchive } from './voice-update-installer.mjs'

const STARTUP_DELAY = 5_000
const CHECK_INTERVAL = 6 * 60 * 60_000
const NETWORK_TIMEOUT = 20_000
const OPEN_MANAGER = '请在当前 DSH 的「插件」管理器查看鱼应。'
const APPLIED_STATES = new Set(['installed', 'restart-required', 'enable-required'])
// One live DSH profile per host process. The flag survives a bundle's HMR scope.
const NATIVE_INSTALL = Symbol.for('dsh-fish-voice.native-update-in-progress')
export const voiceUpdateInstalling = () => globalThis[NATIVE_INSTALL] !== undefined

async function installReadiness(manager, currentVersion, targetVersion, sources) {
  if (typeof manager?.listBundles !== 'function' || typeof manager?.updateBundle !== 'function') {
    return { status: 'unsupported', message: `当前 DSH 没有可用的一键更新接口。${OPEN_MANAGER}` }
  }
  const bundle = (await manager.listBundles()).find(item => item.name === UPDATE_PACKAGE)
  if (!bundle?.installed || !exactUpdateVersion(bundle.version)) {
    return { status: 'unsupported', message: `无法确认当前安装的鱼应包。${OPEN_MANAGER}` }
  }
  if (compareUpdateVersions(bundle.version, currentVersion) > 0) {
    return {
      status: bundle.enabled ? 'restart-required' : 'enable-required',
      message: bundle.enabled
        ? `DSH 已登记鱼应 ${bundle.version}。请完整重启 DSH 后查看当前版本。`
        : `DSH 已登记鱼应 ${bundle.version}。请在「插件」管理器启用鱼应。`,
      sameRelease: bundle.version === targetVersion,
    }
  }
  if (bundle.version !== currentVersion || compareUpdateVersions(targetVersion, bundle.version) <= 0) {
    return { status: 'unsupported', message: `已安装的包和正在运行的鱼应版本不一致。${OPEN_MANAGER}` }
  }
  if (bundle.update === 'registry') return { plan: {} }
  if (typeof manager.installBundle === 'function' && typeof manager.removeBundle === 'function'
    && typeof manager.setBundleEnabled === 'function') {
    const archive = await verifiedLocalUpdateArchive(bundle, sources)
    if (archive) return { plan: { bundle, archive } }
  }
  return { status: 'unsupported', message: `一键更新需要 npm 安装或可校验的官方本地安装包。${OPEN_MANAGER}` }
}

function installOutcome(receipt, version) {
  const result = receipt?.result
  if (receipt?.step === 'install' && result?.bundle === UPDATE_PACKAGE && result.version === version) {
    if (result.application === 'overridden' || result.enabled === false && result.application === 'applied') {
      return { status: 'enable-required', message: '新版本已经安装。请在 DSH 的「插件」管理器检查并启用鱼应。' }
    }
    if (result.application === 'restart-required') {
      const action = result.enabled === false ? '在「插件」管理器启用鱼应，再完整重启 DSH' : '完整重启 DSH'
      return { status: 'restart-required', message: `更新已安装。请${action}后核对运行版本。` }
    }
    if (result.application === 'applied') {
      return { status: 'installed', message: `DSH 已启用鱼应 ${version}。` }
    }
  }
  if (receipt?.restore) {
    const application = receipt.restore.application
    if (application === 'applied' || application === 'restart-required') {
      return {
        status: 'error', canInstall: application === 'applied',
        message: application === 'applied' ? '更新失败，DSH 已恢复之前的版本。' : '更新失败，DSH 已重新安装之前的版本。请完整重启 DSH。',
      }
    }
    return { status: 'error', message: `更新和恢复均未完成。${OPEN_MANAGER}` }
  }
  if (receipt?.step === 'check' && result?.error?.code === 'incompatible-version') {
    return { status: 'incompatible', message: 'DSH 判断此版本与当前宿主不兼容。' }
  }
  if (receipt?.step === 'check' || result?.application === 'cancelled') {
    return { status: 'error', canInstall: true, message: `DSH 未能开始或完成安装，请重试。${OPEN_MANAGER}` }
  }
  if (receipt?.step === 'remove') {
    return { status: 'error', message: `DSH 未能停用旧版本。${OPEN_MANAGER}` }
  }
  return { status: 'error', message: `DSH 没有确认安装结果。${OPEN_MANAGER}` }
}

export function createVoiceUpdateService({
  currentVersion, readDsh, getManager, beforeInstall, hasHmr = () => false,
  fetchImpl = globalThis.fetch, platform = process.platform, arch = process.arch,
  nodeVersion = process.versions.node, now = () => new Date(), onHostError = () => {},
}) {
  const channel = updateChannel(currentVersion)
  const lifetime = new AbortController()
  const observers = new Set()
  let snapshot = Object.freeze({
    schema: 1, revision: 0, currentVersion, channel, status: 'idle',
    checkedAt: null, release: null, message: null, canInstall: false,
  })
  let active, startup, periodic
  const inherited = globalThis[NATIVE_INSTALL]
  const pendingInstall = inherited?.from === currentVersion || inherited?.release?.version === currentVersion
    ? inherited : null

  // A native update can finish after HMR has disposed the reporting scope.
  function report(stage, error) {
    try { onHostError(stage, error) } catch { /* diagnostics cannot replace the manager receipt */ }
  }

  function publish(patch) {
    if (!lifetime.signal.aborted) {
      snapshot = Object.freeze({ ...snapshot, ...patch, revision: snapshot.revision + 1 })
      for (const observer of observers) {
        try { observer() } catch (error) { report('update-observer', error) }
      }
    }
    return snapshot
  }

  function job(status, run) {
    if (active) return active
    if (lifetime.signal.aborted) return Promise.resolve(snapshot)
    active = Promise.resolve().then(run).catch(error => {
      if (lifetime.signal.aborted) return snapshot
      report('update-operation', error)
      const message = error instanceof UpdateCatalogError ? error.message
        : error?.name === 'TimeoutError' ? '更新检查超时，请稍后重试。'
          : `无法确认更新状态，请重试。${OPEN_MANAGER}`
      return publish({ status: 'error', message, release: null, canInstall: false, checkedAt: now().toISOString() })
    }).finally(() => { active = undefined })
    publish({ status, message: null, canInstall: false, ...(status === 'checking' ? { release: null } : {}) })
    return active
  }

  async function candidate() {
    const { dshVersion, evaluateDsh } = await readDsh()
    if (!exactUpdateVersion(currentVersion) || !exactUpdateVersion(dshVersion) || typeof evaluateDsh !== 'function') {
      return { value: { status: 'unsupported', release: null, message: '无法确认当前 DSH 运行版本，请在「插件」管理器检查。' } }
    }
    const signal = AbortSignal.any([lifetime.signal, AbortSignal.timeout(NETWORK_TIMEOUT)])
    const found = await findReviewedUpdate({
      currentVersion, channel, environment: { platform, arch, nodeVersion, dshVersion, evaluateDsh }, fetchImpl, signal,
    })
    if (found.status !== 'available') return { value: found }
    const manager = getManager()
    const { plan, status, message, sameRelease } = await installReadiness(manager, currentVersion, found.release.version, { fetchImpl, signal })
    if (plan) return { value: { ...found, canInstall: true }, plan, manager }
    return { value: { status, message, release: APPLIED_STATES.has(status) && !sameRelease ? null : found.release } }
  }

  function check() {
    const waitingForHmr = pendingInstall && snapshot.status === 'installing'
    const newVersionRunning = snapshot.status === 'installed' && snapshot.release?.version === currentVersion
    if (waitingForHmr || APPLIED_STATES.has(snapshot.status) && !newVersionRunning) return Promise.resolve(snapshot)
    return job('checking', async () => publish({
      canInstall: false, ...(await candidate()).value, checkedAt: now().toISOString(),
    }))
  }

  function install(version) {
    if (active) return active
    if (snapshot.release?.version !== version || !snapshot.canInstall) return Promise.resolve(snapshot)
    const announcement = snapshot.release.announcement
    return job('installing', async () => {
      const { value, manager, plan } = await candidate()
      const latest = { canInstall: false, ...value, checkedAt: now().toISOString() }
      if (!latest.canInstall) return publish(latest)
      if (latest.release.version !== version || latest.release.announcement !== announcement) {
        return publish({ ...latest, message: '更新版本或公告已变化，请查看最新公告后再确认安装。' })
      }
      if (voiceUpdateInstalling()) return publish({ ...latest, message: 'DSH 正在安装鱼应，请等待该次更新完成。' })
      const completion = Promise.withResolvers()
      globalThis[NATIVE_INSTALL] = {
        from: currentVersion, release: latest.release, checkedAt: latest.checkedAt, done: completion.promise,
      }
      let result = {
        ...latest, status: 'error', canInstall: false, message: `DSH 没有确认安装结果。${OPEN_MANAGER}`,
      }
      try {
        const refusal = await beforeInstall?.()
        if (refusal) {
          result = { ...latest, message: refusal }
          return publish(result)
        }
        lifetime.signal.throwIfAborted()
        // DSH owns the operation after this call, including while this bundle is unloaded by HMR.
        const receipt = await installReviewedBundle(manager, version, plan, hasHmr())
        const outcome = installOutcome(receipt, version)
        result = { ...latest, canInstall: false, ...outcome }
        if (outcome.status === 'error') report('update-installation', {
          step: receipt?.step, code: receipt?.result?.error?.code, restore: receipt?.restore?.application,
        })
        return publish(result)
      } finally {
        delete globalThis[NATIVE_INSTALL]
        completion.resolve(result)
      }
    })
  }

  if (pendingInstall) {
    publish({ status: 'installing', release: pendingInstall.release, checkedAt: pendingInstall.checkedAt })
    void pendingInstall.done.then(result => publish(
      currentVersion === pendingInstall.release.version && result.status === 'installed'
        ? { ...result, message: `鱼应已更新至 ${currentVersion}。` }
        : result
    ))
  }

  function start() {
    if (startup || periodic || lifetime.signal.aborted) return
    startup = setTimeout(() => {
      startup = undefined
      periodic = setInterval(() => void check(), CHECK_INTERVAL)
      periodic.unref?.()
      if (!snapshot.checkedAt) void check()
    }, STARTUP_DELAY)
    startup.unref?.()
  }

  return {
    read: () => snapshot,
    subscribe(listener) { observers.add(listener); return () => observers.delete(listener) },
    check, install, start,
    dispose() {
      lifetime.abort()
      clearTimeout(startup)
      clearInterval(periodic)
      observers.clear()
    },
  }
}
