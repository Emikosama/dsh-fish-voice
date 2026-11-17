/** Fixed, preconditioned config repairs for the opt-in voice repair assistant.
 * The model receives only repair IDs and a revision; all paths and write values
 * are derived from the core-owned constructor inputs or the config itself.
 */
import { createHash, randomUUID } from 'node:crypto'
import {
  accessSync, closeSync, constants as fsConstants, fsyncSync,
  lstatSync, openSync, readFileSync, renameSync, rmSync, statSync, writeFileSync,
} from 'node:fs'
import { isAbsolute, win32 } from 'node:path'

const object = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const jsonBytes = value => Buffer.from(`${JSON.stringify(value, null, 2)}\n`, 'utf8')
const cloneJson = value => JSON.parse(JSON.stringify(value))
const isPath = value => typeof value === 'string' && value.length > 0 && value.length <= 4096
  && !/[\u0000-\u001f\u007f]/.test(value) && (isAbsolute(value) || win32.isAbsolute(value))
const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key)

export const VOICE_CONFIG_REPAIR_IDS = Object.freeze([
  'restore_bundled_helper_path',
  'select_verified_python_binding',
  'select_existing_asr_route',
  'select_verified_local_tts_route',
])

const FAILURE_IDS = Object.freeze({
  config: new Set(['invalid_json', 'config_shape_invalid', 'config_permission_denied', 'config_read_failed', 'config_missing']),
  helper: new Set(['configured_helper_missing', 'helper_unreadable', 'bundled_component_missing']),
  python: new Set(['explicit_python_binding_invalid', 'python_probe_failed']),
  asr: new Set(['invalid_asr_route']),
  tts: new Set(['invalid_tts_route']),
  package: new Set(['bundled_component_missing', 'component_missing', 'component_incompatible']),
})

const BUNDLE_COMPONENT_PHASE = Object.freeze({
  voice_helper: 'helper',
  edge_tts_worker: 'tts',
  edge_tts_vendor: 'tts',
  tts_windows_player: 'tts',
  pcm_windows_player: 'tts',
  browser_client: 'helper',
  audio_device_helper: 'helper',
  audio_input_helper: 'helper',
  native_audio_helper: 'helper',
})

const failureOf = value => {
  if (!object(value) || Object.keys(value).some(key => !['phaseId', 'reasonId', 'componentId'].includes(key))) return null
  const { phaseId, reasonId, componentId } = value
  if (!FAILURE_IDS[phaseId]?.has(reasonId)) return null
  if (componentId !== undefined && !own(BUNDLE_COMPONENT_PHASE, componentId)) return null
  return { phaseId, reasonId, ...(componentId ? { componentId } : {}) }
}

function fileUsable(path, kind = 'file') {
  if (!isPath(path)) return false
  try {
    const info = statSync(path)
    if (kind === 'file' && !info.isFile() || kind === 'directory' && !info.isDirectory()) return false
    accessSync(path, fsConstants.R_OK)
    return true
  } catch { return false }
}

function routeSet(routes, key, allowed) {
  const values = object(routes) && Array.isArray(routes[key]) ? routes[key] : []
  return new Set(values.filter(value => allowed.includes(value)))
}

function readConfig(path) {
  let bytes
  try { bytes = readFileSync(path) }
  catch (error) {
    if (error.code === 'ENOENT') return { ok: false, reasonId: 'config_missing', revision: hash(Buffer.from('missing-config')), missing: true }
    const reasonId = ['EACCES', 'EPERM'].includes(error.code) ? 'config_permission_denied' : 'config_read_failed'
    return { ok: false, reasonId, revision: hash(Buffer.from(`config-read:${error.code ?? 'unknown'}`)) }
  }
  const revision = hash(bytes)
  let value
  try { value = JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/, '')) }
  catch { return { ok: false, reasonId: 'invalid_json', revision, bytes } }
  if (!object(value)) return { ok: false, reasonId: 'config_shape_invalid', revision, bytes }
  return { ok: true, revision, bytes, value }
}

/** Write one config file with same-directory rename and a byte-for-byte CAS. */
function writeConfigAtomically(path, nextBytes, expectedBytes) {
  if (lstatSync(path).isSymbolicLink()) throw Object.assign(new Error('config is a symbolic link'), { code: 'EPERM' })
  const current = readFileSync(path)
  if (!current.equals(expectedBytes)) throw Object.assign(new Error('stale config'), { code: 'ESTALE' })
  const mode = statSync(path).mode & 0o777
  const temporary = `${path}.repair-${randomUUID()}.tmp`
  let fd
  try {
    fd = openSync(temporary, 'wx', mode)
    writeFileSync(fd, nextBytes)
    fsyncSync(fd)
    closeSync(fd)
    fd = undefined
    if (lstatSync(path).isSymbolicLink() || !readFileSync(path).equals(expectedBytes)) throw Object.assign(new Error('stale config'), { code: 'ESTALE' })
    renameSync(temporary, path)
  } finally {
    if (fd !== undefined) closeSync(fd)
    try { rmSync(temporary, { force: true }) } catch {}
  }
}

function safeBlocker(phaseId, reasonId, extra = {}) {
  return { phaseId, reasonId, ...extra }
}

/**
 * Create a deterministic, allowlisted repair surface. Constructor values are
 * trusted core state; `inspect` and `apply` never accept paths from a model.
 *
 * `verifiedPythonPath` may be a path or a core-owned async getter. It is read
 * only for an explicit Python binding failure. `verifiedRoutes` contains route
 * names already checked by the core. `verifyHealth` must prove the written
 * config works; a failed probe triggers a CAS-safe restoration of the old bytes.
 * `atomicWrite` is a narrow writer seam used for deterministic permission tests.
 */
export function createVoiceConfigRepairs({
  configPath,
  bundledHelperPath,
  bundled = false,
  bundleComponents = {},
  verifiedPythonPath = null,
  verifiedRoutes = {},
  verifyHealth,
  canWrite = () => true,
  atomicWrite = writeConfigAtomically,
} = {}) {
  if (!isPath(configPath)) throw new TypeError('configPath must be an absolute core-owned path')
  if (!isPath(bundledHelperPath)) throw new TypeError('bundledHelperPath must be an absolute core-owned path')
  if (typeof verifyHealth !== 'function') throw new TypeError('verifyHealth is required')
  if (typeof canWrite !== 'function') throw new TypeError('canWrite must be a function')
  if (typeof atomicWrite !== 'function') throw new TypeError('atomicWrite must be a function')
  if (!(verifiedPythonPath === null || isPath(verifiedPythonPath) || typeof verifiedPythonPath === 'function')) throw new TypeError('verifiedPythonPath must be a core-owned path or getter')
  if (!object(bundleComponents)) throw new TypeError('bundleComponents must be a component-to-path map')
  if (!(object(verifiedRoutes) || typeof verifiedRoutes === 'function')) throw new TypeError('verifiedRoutes must be an application-owned route map or function')

  const requiredComponents = { ...bundleComponents }
  if (bundled) requiredComponents.voice_helper ??= bundledHelperPath
  for (const [id, path] of Object.entries(requiredComponents)) {
    if (!own(BUNDLE_COMPONENT_PHASE, id) || !isPath(path)) throw new TypeError('bundleComponents contains an unsupported component')
  }

  const inspectedPlans = new Map()

  async function analyze(failure, { usePlannedPythonCandidate = false, plannedPythonCandidate = null } = {}) {
    const doc = readConfig(configPath)
    const repairs = []
    const blockers = []
    let diagnostics = []
    const targets = new Map()
    const addRepair = (id, phaseId, reasonId, key, value) => {
      if (id && !repairs.some(item => item.id === id)) {
        repairs.push({ id, phaseId, reasonId })
        targets.set(id, { key, value })
      }
    }
    const addBlocker = (phaseId, reasonId, extra) => {
      if (!blockers.some(item => item.phaseId === phaseId && item.reasonId === reasonId && item.componentId === extra?.componentId)) blockers.push(safeBlocker(phaseId, reasonId, extra))
    }

    for (const [componentId, componentPath] of Object.entries(requiredComponents)) {
      if (!fileUsable(componentPath)) addBlocker(BUNDLE_COMPONENT_PHASE[componentId], 'bundled_component_missing', { componentId, resolutionId: 'full_package_reinstall' })
    }

    if (!doc.ok) {
      // A missing config is normal before first-run defaults are written. It is
      // only a repair blocker when a concrete failure was reported alongside it.
      if (!doc.missing || failure?.phaseId === 'config') addBlocker('config', doc.reasonId)
      if (failure && !(bundled && failure.phaseId === 'helper' && ['configured_helper_missing', 'helper_unreadable'].includes(failure.reasonId))) {
        diagnostics = [safeBlocker(failure.phaseId, failure.reasonId, failure.componentId ? { componentId: failure.componentId } : undefined)]
      }
      return { doc, repairs, blockers, diagnostics, targets }
    }

    const config = doc.value
    const edgeConsentMissing = object(config.tts) && config.tts.provider === 'edge' && config.tts.edgeTextTransmissionAccepted !== true
    const inheritedRouteDefault = failure?.phaseId === 'asr' && !own(config, 'asr')
      || failure?.phaseId === 'tts' && (!own(config, 'tts') || edgeConsentMissing)
    if (failure && !inheritedRouteDefault && !(bundled && failure.phaseId === 'helper' && ['configured_helper_missing', 'helper_unreadable'].includes(failure.reasonId))) {
      diagnostics = [safeBlocker(failure.phaseId, failure.reasonId, failure.componentId ? { componentId: failure.componentId } : undefined)]
    }
    const helperIsFailure = failure?.phaseId === 'helper' && ['configured_helper_missing', 'helper_unreadable'].includes(failure.reasonId)
    if (!bundled && (helperIsFailure || own(config, 'helperPath') && config.helperPath !== null && config.helperPath !== '' && !fileUsable(config.helperPath))) {
      if (fileUsable(bundledHelperPath)) addRepair('restore_bundled_helper_path', 'helper', 'configured_helper_missing', 'helperPath', bundledHelperPath)
      else addBlocker('package', 'bundled_component_missing', { componentId: 'voice_helper', resolutionId: 'full_package_reinstall' })
    }

    const asrFailure = failure?.phaseId === 'asr' && failure.reasonId === 'invalid_asr_route'
    const asrConfigured = own(config, 'asr')
    const asrNeedsEvidence = asrFailure || asrConfigured && !['sensevoice', 'whisper', 'whisper-wasm'].includes(config.asr)
    const ttsFailure = failure?.phaseId === 'tts' && failure.reasonId === 'invalid_tts_route'
    const ttsConfigured = own(config, 'tts')
    const configuredTts = object(config.tts) ? config.tts : null
    const routeConsentMissing = configuredTts?.provider === 'edge' && configuredTts.edgeTextTransmissionAccepted !== true
    const ttsProviderInvalid = ttsConfigured && (!configuredTts || !['unconfigured', 'edge', 'system', 'local', 'off'].includes(configuredTts.provider))
    const ttsNeedsEvidence = !routeConsentMissing && (ttsFailure || ttsProviderInvalid)
    let routeEvidence = {}
    if (asrNeedsEvidence || ttsNeedsEvidence) {
      try { routeEvidence = typeof verifiedRoutes === 'function' ? await verifiedRoutes(cloneJson(config)) : verifiedRoutes }
      catch { routeEvidence = {} }
    }
    const verifiedAsr = routeSet(routeEvidence, 'asr', ['sensevoice', 'whisper'])
    const verifiedTts = routeSet(routeEvidence, 'tts', ['local'])

    const pythonFailure = failure?.phaseId === 'python' && ['explicit_python_binding_invalid', 'python_probe_failed'].includes(failure.reasonId)
    if (pythonFailure && verifiedPythonPath !== null) {
      try {
        const candidate = usePlannedPythonCandidate ? plannedPythonCandidate
          : typeof verifiedPythonPath === 'function' ? await verifiedPythonPath() : verifiedPythonPath
        const current = config.pythonPath || 'python'
        if (isPath(candidate) && fileUsable(candidate) && candidate !== current) {
          addRepair('select_verified_python_binding', 'python', failure.reasonId, 'pythonPath', candidate)
        } else {
          addBlocker('python', failure.reasonId)
        }
      } catch {
        addBlocker('python', 'python_probe_failed')
      }
    } else if (pythonFailure) addBlocker('python', failure.reasonId)

    if (asrFailure && !asrConfigured) addBlocker('asr', 'invalid_asr_route')
    if (asrNeedsEvidence && asrConfigured) {
      const current = config.asr
      const candidates = [...verifiedAsr].filter(route => {
        if (route === current) return false
        const modelPath = config.models?.[route === 'sensevoice' ? 'sensevoiceDir' : 'whisper']
        return fileUsable(modelPath, 'directory')
      })
      if (candidates.length === 1) addRepair('select_existing_asr_route', 'asr', 'invalid_asr_route', 'asr', candidates[0])
      else addBlocker('asr', 'invalid_asr_route')
    }

    const tts = configuredTts
    // Edge without transmission consent is handled by setup, not config repair.
    if (routeConsentMissing) {
      // The route remains deliberately unselected until its separate consent flow completes.
    } else if (ttsFailure && !ttsConfigured) addBlocker('tts', 'invalid_tts_route')
    else if ((ttsFailure || ttsProviderInvalid) && ttsConfigured) {
      const localPath = tts?.localModelPath
      const localSettingsExist = typeof tts?.localModelId === 'string' && /^[a-zA-Z0-9._-]{1,128}$/.test(tts.localModelId)
        && fileUsable(localPath, 'directory') && tts.provider !== 'local'
      if (localSettingsExist && verifiedTts.has('local')) addRepair('select_verified_local_tts_route', 'tts', 'invalid_tts_route', 'tts.provider', 'local')
      else addBlocker('tts', 'invalid_tts_route')
    }

    if (failure?.reasonId === 'component_missing' || failure?.reasonId === 'component_incompatible') {
      addBlocker('package', failure.reasonId, { ...(failure.componentId ? { componentId: failure.componentId } : {}), resolutionId: 'full_package_reinstall' })
    }
    if (failure?.phaseId === 'helper' && !bundled && helperIsFailure && !repairs.some(item => item.id === 'restore_bundled_helper_path')) addBlocker('helper', failure.reasonId)
    if (failure?.phaseId === 'python' && pythonFailure && !repairs.some(item => item.id === 'select_verified_python_binding')) addBlocker('python', failure.reasonId)
    if (!repairs.length && !blockers.length && failure && !['helper', 'python', 'asr', 'tts'].includes(failure.phaseId)) addBlocker(failure.phaseId, 'no_safe_repair')
    return { doc, repairs, blockers, diagnostics, targets }
  }

  return Object.freeze({
    async inspect({ failure: rawFailure } = {}) {
      const failure = failureOf(rawFailure)
      const result = await analyze(failure)
      const keyPrefix = result.doc.revision
      for (const key of inspectedPlans.keys()) if (key.startsWith(`${keyPrefix}:`)) inspectedPlans.delete(key)
      for (const [id, target] of result.targets) inspectedPlans.set(`${keyPrefix}:${id}`, { failure, target })
      while (inspectedPlans.size > 32) inspectedPlans.delete(inspectedPlans.keys().next().value)
      return {
        schema: 1,
        revision: result.doc.revision,
        repairs: result.repairs,
        blockers: result.blockers,
        diagnostics: result.diagnostics,
      }
    },

    async apply(request, signal) {
      if (!object(request) || Object.keys(request).some(key => !['repairId', 'expectedRevision'].includes(key))
        || Object.keys(request).length !== 2 || !VOICE_CONFIG_REPAIR_IDS.includes(request.repairId)
        || typeof request.expectedRevision !== 'string' || !/^[a-f0-9]{64}$/.test(request.expectedRevision)) {
        return { schema: 1, ok: false, reasonId: 'repair_no_longer_applicable', revision: readConfig(configPath).revision }
      }
      const { repairId, expectedRevision } = request
      const doc = readConfig(configPath)
      if (!doc.ok) return { schema: 1, ok: false, phaseId: 'config', reasonId: doc.reasonId, revision: doc.revision }
      if (doc.revision !== expectedRevision) return { schema: 1, ok: false, phaseId: 'config', reasonId: 'stale_config', revision: doc.revision }

      const planned = inspectedPlans.get(`${expectedRevision}:${repairId}`)
      inspectedPlans.delete(`${expectedRevision}:${repairId}`)
      if (!planned) return { schema: 1, ok: false, phaseId: 'config', reasonId: 'repair_no_longer_applicable', revision: doc.revision }

      const checked = await analyze(planned.failure, {
        usePlannedPythonCandidate: repairId === 'select_verified_python_binding',
        plannedPythonCandidate: repairId === 'select_verified_python_binding' ? planned.target.value : null,
      })
      const freshTarget = checked.targets.get(repairId)
      if (!checked.doc.ok || checked.doc.revision !== expectedRevision || !freshTarget
        || freshTarget.key !== planned.target.key || freshTarget.value !== planned.target.value) {
        return { schema: 1, ok: false, phaseId: 'config', reasonId: 'repair_no_longer_applicable', revision: checked.doc.revision }
      }

      const nextConfig = cloneJson(doc.value)
      if (freshTarget.key === 'tts.provider') nextConfig.tts = { ...nextConfig.tts, provider: freshTarget.value }
      else nextConfig[freshTarget.key] = freshTarget.value
      // A fixed repair must make a real change to a single, approved field.
      if (JSON.stringify(nextConfig) === JSON.stringify(doc.value)) return { schema: 1, ok: false, phaseId: 'config', reasonId: 'repair_no_longer_applicable', revision: doc.revision }
      const nextBytes = jsonBytes(nextConfig)

      if (signal?.aborted) return { schema: 1, ok: false, phaseId: 'config', reasonId: 'repair_cancelled', revision: doc.revision }
      let writeAllowed = false
      try { writeAllowed = canWrite({ repairId, config: cloneJson(doc.value) }) === true } catch {}
      if (!writeAllowed) return { schema: 1, ok: false, phaseId: 'config', reasonId: 'runtime_not_stopped', revision: doc.revision }
      if (signal?.aborted) return { schema: 1, ok: false, phaseId: 'config', reasonId: 'repair_cancelled', revision: doc.revision }
      try {
        atomicWrite(configPath, nextBytes, doc.bytes)
      } catch (error) {
        const reasonId = ['EACCES', 'EPERM', 'EROFS'].includes(error?.code) ? 'config_write_denied' : error?.code === 'ESTALE' ? 'stale_config' : 'config_write_failed'
        return { schema: 1, ok: false, phaseId: 'config', reasonId, revision: readConfig(configPath).revision }
      }

      const written = readConfig(configPath)
      if (!written.ok || !written.bytes.equals(nextBytes)) return { schema: 1, ok: false, phaseId: 'config', reasonId: 'stale_config', revision: written.revision, written: true }
      let healthy = false
      try {
        const result = await verifyHealth({ repairId, config: cloneJson(nextConfig), revision: written.revision, signal })
        healthy = result === true || result?.healthy === true
      } catch {}
      if (signal?.aborted) healthy = false
      if (healthy) {
        const afterProbe = readConfig(configPath)
        if (afterProbe.ok && afterProbe.bytes.equals(nextBytes)) return { schema: 1, ok: true, repairId, revision: afterProbe.revision }
        return { schema: 1, ok: false, phaseId: 'config', reasonId: 'stale_config', revision: afterProbe.revision, written: true }
      }

      let rolledBack = false
      try {
        const current = readConfig(configPath)
        if (current.ok && current.bytes.equals(nextBytes)) {
          atomicWrite(configPath, doc.bytes, nextBytes)
          const restored = readConfig(configPath)
          rolledBack = restored.ok && restored.bytes.equals(doc.bytes)
        }
      } catch {}
      const afterRollback = readConfig(configPath)
      return { schema: 1, ok: false, phaseId: 'config', reasonId: 'post_repair_probe_failed', revision: afterRollback.revision, rolledBack }
    },
  })
}
