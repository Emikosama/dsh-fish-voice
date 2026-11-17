import { randomUUID } from 'node:crypto'
import { VOICE_CONFIG_REPAIR_IDS } from './voice-config-repairs.mjs'

const MAX_ROUNDS = 3
const MAX_REPAIRS = 4
const MAX_BLOCKERS = 8
const MAX_FAILURE_AGE_MS = 30_000
const MAX_SNAPSHOT_AGE_MS = 30_000
const MAX_EVENT_COUNT = 24

const FAILED_OPERATIONS = new Set([
  'read-settings', 'enable', 'new', 'resume', 'save-settings', 'save-models',
  'save-tts', 'complete-setup', 'preview-tts',
])

// These IDs are labels for host-owned, narrowly scoped config repairs. They
// never contain an executable command, target path, patch, or model argument.
export const VOICE_CONFIG_ACTION_IDS = VOICE_CONFIG_REPAIR_IDS
const ACTION_IDS = new Set(VOICE_CONFIG_REPAIR_IDS)
const REPAIR_REASON = new Map([
  ['restore_bundled_helper_path', ['helper', 'configured_helper_missing']],
  ['select_verified_python_binding', ['python', 'explicit_python_binding_invalid', 'python_probe_failed']],
  ['select_existing_asr_route', ['asr', 'invalid_asr_route']],
  ['select_verified_local_tts_route', ['tts', 'invalid_tts_route']],
])
const REASON_IDS = new Set([
  'invalid_json', 'config_shape_invalid', 'config_permission_denied', 'config_read_failed', 'config_missing',
  'configured_helper_missing', 'helper_unreadable', 'bundled_component_missing',
  'explicit_python_binding_invalid', 'python_probe_failed', 'invalid_asr_route', 'invalid_tts_route',
  'component_missing', 'component_incompatible', 'no_safe_repair', 'repair_no_longer_applicable',
  'stale_config', 'config_write_denied', 'config_write_failed', 'post_repair_probe_failed', 'repair_failed',
  'repair_cancelled', 'runtime_not_stopped',
])
const PHASE_IDS = new Set(['config', 'helper', 'python', 'asr', 'tts', 'package'])
const COMPONENT_PHASE = Object.freeze({
  voice_helper: 'helper', edge_tts_worker: 'tts', edge_tts_vendor: 'tts', tts_windows_player: 'tts', pcm_windows_player: 'tts',
  browser_client: 'helper', audio_device_helper: 'helper', audio_input_helper: 'helper', native_audio_helper: 'helper',
})
const BLOCKER_REASONS = Object.freeze({
  config: new Set(['invalid_json', 'config_shape_invalid', 'config_permission_denied', 'config_read_failed', 'config_missing', 'no_safe_repair']),
  helper: new Set(['configured_helper_missing', 'helper_unreadable', 'bundled_component_missing']),
  python: new Set(['explicit_python_binding_invalid', 'python_probe_failed']),
  asr: new Set(['invalid_asr_route']),
  tts: new Set(['invalid_tts_route', 'bundled_component_missing']),
  package: new Set(['bundled_component_missing', 'component_missing', 'component_incompatible']),
})
const PHASES = new Set(['offer', 'round', 'before-write', 'verify'])
const TERMINAL = new Set(['completed', 'needs-manual', 'needs-feedback', 'stale', 'failed', 'stopped', 'disposed'])
const STAGES = new Set([
  'idle', 'offered', 'starting', 'diagnosing', 'deciding', 'rechecking', 'applying',
  'verifying', 'completed', 'needs-manual', 'needs-feedback', 'stale',
  'failed', 'stop-requested', 'stopped', 'disposed',
])

const exactObject = (value, keys, required = keys) => value !== null && typeof value === 'object' && !Array.isArray(value)
  && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)
  && Object.keys(value).every(key => keys.includes(key))
  && required.every(key => Object.prototype.hasOwnProperty.call(value, key))
const isHash = value => typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value)
const isId = value => typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(value)

function awaitWithAbort(value, signal) {
  if (!signal) return Promise.resolve(value)
  if (signal.aborted) return Promise.reject(signal.reason ?? Object.assign(new Error('Aborted'), { name: 'AbortError' }))
  return new Promise((resolve, reject) => {
    const onAbort = () => reject(signal.reason ?? Object.assign(new Error('Aborted'), { name: 'AbortError' }))
    signal.addEventListener('abort', onAbort, { once: true })
    Promise.resolve(value).then(resolve, reject).finally(() => signal.removeEventListener('abort', onAbort))
  })
}

function cleanText(value, maxLength, fallback) {
  if (typeof value !== 'string') return fallback
  let text = value
    .replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, ' ')
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ')
    .replace(/\b(?:token|api[-_ ]?key|secret|password|authorization)\s*[:=]\s*[^\s,;]+/gi, '[敏感信息已隐藏]')
    .replace(/https?:\/\/[^\s)\]}>,;]+/gi, '[链接已隐藏]')
    .replace(/\b[A-Za-z]:[\\/](?:[^\\/\s]+[\\/]?)+/g, '[路径已隐藏]')
    .replace(/\\\\[^\\\s]+\\[^\\\s]+(?:\\[^\\\s]+)*/g, '[路径已隐藏]')
    .replace(/(^|\s)\/(?:[^/\s]+\/)+[^\s]*/g, '$1[路径已隐藏]')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text) text = fallback
  return text.slice(0, maxLength)
}

function safeErrorCode(error) {
  const code = error?.code
  return typeof code === 'string' && /^[A-Z][A-Z0-9_]{0,47}$/.test(code) ? code : null
}

function normalizeRepair(row) {
  if (!exactObject(row, ['id', 'phaseId', 'reasonId']) || !ACTION_IDS.has(row.id)) return null
  const schema = REPAIR_REASON.get(row.id)
  if (!schema || row.phaseId !== schema[0] || !schema.slice(1).includes(row.reasonId)) return null
  return Object.freeze({ id: row.id, phaseId: row.phaseId, reasonId: row.reasonId })
}

function normalizeBlocker(row) {
  if (!exactObject(row, ['phaseId', 'reasonId', 'componentId', 'resolutionId'], ['phaseId', 'reasonId'])
    || !PHASE_IDS.has(row.phaseId) || !BLOCKER_REASONS[row.phaseId]?.has(row.reasonId)
    || row.componentId !== undefined && !Object.hasOwn(COMPONENT_PHASE, row.componentId)
    || row.componentId !== undefined && row.phaseId !== 'package' && COMPONENT_PHASE[row.componentId] !== row.phaseId
    || row.componentId !== undefined && row.phaseId === 'package' && row.resolutionId !== 'full_package_reinstall'
    || row.resolutionId !== undefined && row.resolutionId !== 'full_package_reinstall') return null
  return Object.freeze({
    phaseId: row.phaseId,
    reasonId: row.reasonId,
    ...(row.componentId ? { componentId: row.componentId } : {}),
    ...(row.resolutionId ? { resolutionId: row.resolutionId } : {}),
  })
}

function normalizeSnapshot(raw, now, maxAgeMs) {
  if (!exactObject(raw, ['schema', 'status', 'observedAt', 'revision', 'incident', 'repairs', 'blockers'])) return null
  if (raw.schema !== 1 || !['present', 'absent', 'stale'].includes(raw.status)
    || !Number.isFinite(raw.observedAt) || raw.observedAt < 0 || raw.observedAt > now + 1000
    || !isHash(raw.revision) || !Array.isArray(raw.repairs) || raw.repairs.length > MAX_REPAIRS
    || !Array.isArray(raw.blockers) || raw.blockers.length > MAX_BLOCKERS) return null
  if (raw.status === 'stale' || now - raw.observedAt > maxAgeMs) return Object.freeze({ status: 'stale' })

  const repairs = []
  const seen = new Set()
  for (const row of raw.repairs) {
    const repair = normalizeRepair(row)
    if (!repair || seen.has(repair.id)) return null
    seen.add(repair.id)
    repairs.push(repair)
  }
  const blockers = []
  for (const row of raw.blockers) {
    const blocker = normalizeBlocker(row)
    if (!blocker) return null
    blockers.push(blocker)
  }

  if (raw.status === 'absent') {
    if (raw.incident !== null || repairs.length || blockers.length) return null
    return Object.freeze({
      schema: 1, status: 'absent', observedAt: raw.observedAt,
      revision: raw.revision.toLowerCase(), incident: null,
      repairs: Object.freeze([]), blockers: Object.freeze([]),
    })
  }

  const incident = raw.incident
  if (!exactObject(incident, ['id', 'severity', 'title', 'summary', 'manualRecovery'], ['id', 'severity'])
    || !isId(incident.id) || !['severe', 'warning', 'moderate', 'minor', 'info'].includes(incident.severity)
    || incident.manualRecovery !== undefined && !['package-manager', 'feedback', 'none'].includes(incident.manualRecovery)) return null
  return Object.freeze({
    schema: 1,
    status: 'present',
    observedAt: raw.observedAt,
    revision: raw.revision.toLowerCase(),
    incident: Object.freeze({
      id: incident.id,
      severity: incident.severity,
      ...(incident.title !== undefined ? { title: cleanText(incident.title, 80, '严重配置问题') } : {}),
      ...(incident.summary !== undefined ? { summary: cleanText(incident.summary, 240, '检测到严重配置问题。') } : {}),
      manualRecovery: incident.manualRecovery ?? 'feedback',
    }),
    repairs: Object.freeze(repairs),
    blockers: Object.freeze(blockers),
  })
}

function publicSnapshot(snapshot) {
  if (!snapshot || snapshot.status === 'stale') return null
  return Object.freeze({
    schema: snapshot.schema,
    status: snapshot.status,
    observedAt: snapshot.observedAt,
    revision: snapshot.revision,
    incident: snapshot.incident,
    repairs: snapshot.repairs,
    blockers: snapshot.blockers,
  })
}

function publicState(state, events) {
  const view = {
    state: state.state,
    stage: STAGES.has(state.stage) ? state.stage : 'failed',
    round: state.round,
    maxRounds: MAX_ROUNDS,
    incidentId: state.incidentId,
    offerId: state.offerId,
    recovery: state.recovery,
    message: state.message,
    lastRepairId: state.lastRepairId,
    events: events.map(event => ({ ...event })),
  }
  return Object.freeze(view)
}

/**
 * Build a bounded, sessionless configuration repair controller.
 *
 * `diagnose({phase, signal})` returns bounded current state, repairs, and blockers.
 * `decide(snapshot, options, signal)` may select only a listed repair ID.
 * `apply(repair, before, signal)` uses a single revision-fenced repair and
 * returns the schema from voice-config-repairs.mjs.
 */
export function createVoiceConfigAssistant({
  diagnose,
  decide,
  apply,
  emit = () => {},
  now = Date.now,
  maxSnapshotAgeMs = MAX_SNAPSHOT_AGE_MS,
  maxFailureAgeMs = MAX_FAILURE_AGE_MS,
} = {}) {
  if (typeof diagnose !== 'function' || typeof decide !== 'function' || typeof apply !== 'function') {
    throw new TypeError('diagnose, decide, and apply must be functions')
  }
  if (typeof emit !== 'function' || typeof now !== 'function'
    || !Number.isFinite(maxSnapshotAgeMs) || maxSnapshotAgeMs < 0
    || !Number.isFinite(maxFailureAgeMs) || maxFailureAgeMs < 0) {
    throw new TypeError('invalid assistant options')
  }

  let disposed = false
  let active = null
  let offerController = null
  let pendingOffer = null
  let offerBusy = false
  const eventLog = []
  const state = {
    state: 'idle', stage: 'idle', round: 0, incidentId: null,
    offerId: null, recovery: null, message: '', lastRepairId: null,
  }

  const snapshotView = () => publicState(state, eventLog)
  const publish = (stage, message, extra = {}) => {
    state.stage = STAGES.has(stage) ? stage : 'failed'
    state.message = cleanText(message, 240, '状态已更新。')
    const event = Object.freeze({
      type: stage === 'offered' ? 'offer' : TERMINAL.has(stage) || stage === 'stop-requested' ? 'result' : 'stage',
      stage: state.stage,
      round: Number.isInteger(state.round) ? Math.max(0, Math.min(MAX_ROUNDS, state.round)) : 0,
      message: state.message,
      ...(state.incidentId ? { incidentId: state.incidentId } : {}),
      ...(state.lastRepairId ? { repairId: state.lastRepairId } : {}),
      ...extra,
    })
    eventLog.push(event)
    if (eventLog.length > MAX_EVENT_COUNT) eventLog.splice(0, eventLog.length - MAX_EVENT_COUNT)
    try { emit(event) } catch { /* Event delivery must not control a repair. */ }
    return snapshotView()
  }

  const failClosed = (stage, message, code = null) => {
    state.state = stage
    publish(stage, message, code ? { code } : {})
    return snapshotView()
  }

  const runDiagnosis = async (phase, signal) => {
    if (!PHASES.has(phase)) throw new TypeError('invalid diagnosis phase')
    signal?.throwIfAborted()
    const raw = await awaitWithAbort(diagnose({ phase, signal }), signal)
    signal?.throwIfAborted()
    const snapshot = normalizeSnapshot(raw, now(), maxSnapshotAgeMs)
    if (!snapshot) throw Object.assign(new Error('Invalid diagnostic snapshot'), { code: 'INVALID_DIAGNOSIS' })
    return snapshot
  }

  const checkAgainst = (snapshot, expectedRevision, expectedIncidentId = null, allowedToResolve = false) => {
    if (snapshot.status === 'stale') return { ok: false, code: 'STALE_DIAGNOSIS' }
    if (snapshot.revision !== expectedRevision) return { ok: false, code: 'CONFIG_CHANGED' }
    if (snapshot.status === 'absent') return allowedToResolve ? { ok: true, resolved: true } : { ok: false, code: 'ISSUE_DISAPPEARED' }
    if ((expectedIncidentId && snapshot.incident.id !== expectedIncidentId) || snapshot.incident.severity !== 'severe') {
      return { ok: false, code: 'CONFIG_CHANGED' }
    }
    return { ok: true, resolved: false }
  }

  const packageRecovery = snapshot => snapshot.incident?.manualRecovery === 'package-manager'
    || snapshot.blockers.some(blocker => blocker.resolutionId === 'full_package_reinstall')
  const manualOutcome = snapshot => {
    if (packageRecovery(snapshot)) {
      state.recovery = 'manual-package-manager'
      return failClosed('needs-manual', '没有安全的单项配置修复；请通过宿主的完整安装管理流程处理，并可提交反馈。')
    }
    state.recovery = 'feedback'
    return failClosed('needs-feedback', '没有未尝试的安全单项修复；请提交诊断反馈。')
  }

  const resultView = () => snapshotView()

  async function offer(failedOperation) {
    if (disposed || active || offerBusy) return null
    if (!exactObject(failedOperation, ['status', 'operation', 'failureId', 'failedAt'])
      || failedOperation.status !== 'failed' || !FAILED_OPERATIONS.has(failedOperation.operation)
      || !isId(failedOperation.failureId) || !Number.isFinite(failedOperation.failedAt)) return null
    const currentTime = now()
    if (failedOperation.failedAt > currentTime + 1000 || currentTime - failedOperation.failedAt > maxFailureAgeMs) return null

    // A fresh offer attempt invalidates any older confirmation token.
    pendingOffer = null
    state.offerId = null
    state.state = 'running'
    state.stage = 'diagnosing'
    state.incidentId = null
    state.recovery = null
    state.lastRepairId = null
    publish('diagnosing', '正在核对这次失败后出现的配置问题。')
    offerBusy = true
    const controller = new AbortController()
    offerController = controller
    try {
      const snapshot = await runDiagnosis('offer', controller.signal)
      if (disposed || controller.signal.aborted) return null
      if (snapshot.status !== 'present') {
        state.state = 'idle'
        state.incidentId = null
        state.offerId = null
        state.recovery = null
        publish('idle', '没有当前的严重配置问题；未创建修复邀请。')
        return null
      }
      if (snapshot.incident.severity !== 'severe') {
        state.state = 'idle'
        state.incidentId = null
        state.offerId = null
        state.recovery = null
        publish('idle', '当前问题未达到自动修复条件；未创建修复邀请。')
        return null
      }
      const offerId = randomUUID()
      pendingOffer = Object.freeze({
        id: offerId,
        failureId: failedOperation.failureId,
        operation: failedOperation.operation,
        failedAt: failedOperation.failedAt,
        issuedAt: now(),
        incidentId: snapshot.incident.id,
        revision: snapshot.revision,
        snapshot,
      })
      state.state = 'offered'
      state.round = 0
      state.incidentId = snapshot.incident.id
      state.offerId = offerId
      state.recovery = snapshot.repairs.length ? null : packageRecovery(snapshot) ? 'manual-package-manager' : 'feedback'
      state.lastRepairId = null
      publish('offered', snapshot.incident.summary ?? '检测到严重配置问题。', {
        recovery: state.recovery,
        repairs: snapshot.repairs,
        blockers: snapshot.blockers,
      })
      return Object.freeze({
        id: offerId,
        incidentId: snapshot.incident.id,
        title: snapshot.incident.title ?? '严重配置问题',
        summary: snapshot.incident.summary ?? '检测到严重配置问题。',
        repairs: Object.freeze(snapshot.repairs.map(repair => Object.freeze({ ...repair }))),
        blockers: Object.freeze(snapshot.blockers.map(blocker => Object.freeze({ ...blocker }))),
        ...(snapshot.repairs.length ? {} : { recovery: state.recovery }),
      })
    } catch (error) {
      if (controller.signal.aborted) {
        if (!disposed) failClosed('stopped', '配置问题检查已停止，未创建修复邀请。')
        return null
      }
      const code = safeErrorCode(error)
      failClosed('failed', '无法确认当前配置问题，因此没有提供自动修复。', code)
      return null
    } finally {
      offerBusy = false
      if (offerController === controller) offerController = null
    }
  }

  async function start(request) {
    if (disposed || active) return resultView()
    if (!exactObject(request, ['id', 'confirmed']) || typeof request.id !== 'string' || typeof request.confirmed !== 'boolean') {
      return failClosed('failed', '修复请求无效。')
    }
    if (!pendingOffer || pendingOffer.id !== request.id) return failClosed('stale', '修复邀请已失效，请重新检查问题。')
    if (request.confirmed !== true) {
      publish('offered', '尚未确认，未执行任何修复。')
      return snapshotView()
    }

    const offer = pendingOffer
    pendingOffer = null // A confirmation is consumed even if the next check fails.
    if (now() - offer.issuedAt > maxFailureAgeMs || now() < offer.issuedAt) {
      state.offerId = null
      return failClosed('stale', '修复邀请已过期，请重新检查问题。')
    }
    if (!offer.snapshot.repairs.length) {
      state.offerId = null
      return manualOutcome(offer.snapshot)
    }

    const controller = new AbortController()
    active = { controller, promise: null }
    state.state = 'running'
    state.offerId = null
    state.round = 0
    state.incidentId = offer.incidentId
    state.recovery = null
    state.lastRepairId = null
    publish('starting', '已确认；正在重新检查配置状态。')
    const promise = run(offer, controller)
    active.promise = promise
    return promise
  }

  async function run(offer, controller) {
    let expectedRevision = offer.revision
    let expectedIncidentId = offer.incidentId
    let lastResultCode = ''
    const attemptedRepairs = new Set()
    const attempts = []
    try {
      for (let round = 1; round <= MAX_ROUNDS; round += 1) {
        controller.signal.throwIfAborted()
        state.round = round
        publish('diagnosing', `第 ${round} 轮：重新检查严重问题和配置版本。`)
        const beforeDecision = await runDiagnosis('round', controller.signal)
        const current = checkAgainst(beforeDecision, expectedRevision, expectedIncidentId, round > 1)
        if (!current.ok) return failClosed('stale', '配置状态已变化或诊断已过期，自动修复已停止。')
        if (current.resolved) return failClosed('completed', '复查确认严重配置问题已不存在。')
        const availableRepairs = beforeDecision.repairs.filter(repair => !attemptedRepairs.has(repair.id))
        if (!availableRepairs.length) return manualOutcome(beforeDecision)

        publish('deciding', `第 ${round} 轮：正在评估允许的配置修复。`)
        let decision
        try {
          const decisionSnapshot = Object.freeze({ ...publicSnapshot(beforeDecision), repairs: Object.freeze(availableRepairs) })
          decision = await awaitWithAbort(decide(decisionSnapshot, Object.freeze({
            round,
            maxRounds: MAX_ROUNDS,
            repairs: Object.freeze(availableRepairs),
            prior: Object.freeze(attempts.map(attempt => Object.freeze({ ...attempt }))),
          }), controller.signal), controller.signal)
        } catch (error) {
          if (controller.signal.aborted) throw error
          const code = safeErrorCode(error)
          return failClosed('needs-feedback', '自动评估未能完成；请检查诊断结果并提交反馈。', code)
        }
        controller.signal.throwIfAborted()
        if (!exactObject(decision, ['repairId'], ['repairId'])
          || !(decision.repairId === null || typeof decision.repairId === 'string')) {
          return failClosed('needs-feedback', '自动评估返回了无法核验的结果；未执行修复，请提交反馈。')
        }
        if (decision.repairId === null) {
          state.recovery = 'feedback'
          return failClosed('needs-feedback', '没有可安全执行的修复方案；请提交反馈。')
        }
        const selected = availableRepairs.find(repair => repair.id === decision.repairId)
        if (!selected) return failClosed('needs-feedback', '评估结果不在当前允许的修复范围内；未执行修复。')

        publish('rechecking', `第 ${round} 轮：再次核对配置版本和所选操作。`, { repairId: selected.id })
        const beforeWrite = await runDiagnosis('before-write', controller.signal)
        const writeCheck = checkAgainst(beforeWrite, beforeDecision.revision, beforeDecision.incident.id)
        const selectedForWrite = beforeWrite.repairs.find(repair => repair.id === selected.id)
        if (!writeCheck.ok || writeCheck.resolved || !selectedForWrite) {
          return failClosed('stale', '写入前发现问题或配置范围已变化，自动修复已停止。')
        }

        publish('applying', `第 ${round} 轮：正在应用已确认的配置修复。`, { repairId: selected.id })
        let applied
        try {
          applied = await apply(selectedForWrite, publicSnapshot(beforeWrite), controller.signal)
        } catch (error) {
          if (controller.signal.aborted) throw error
          applied = { schema: 1, ok: false, phaseId: 'config', reasonId: 'repair_failed', revision: beforeWrite.revision }
        }
        const allowedApplyKeys = ['schema', 'ok', 'repairId', 'revision', 'phaseId', 'reasonId', 'written', 'rolledBack']
        if (!exactObject(applied, allowedApplyKeys, ['schema', 'ok', 'revision'])
          || applied.schema !== 1 || typeof applied.ok !== 'boolean' || !isHash(applied.revision)
          || applied.repairId !== undefined && applied.repairId !== selectedForWrite.id
          || applied.phaseId !== undefined && !PHASE_IDS.has(applied.phaseId)
          || applied.reasonId !== undefined && !REASON_IDS.has(applied.reasonId)
          || applied.written !== undefined && typeof applied.written !== 'boolean'
          || applied.rolledBack !== undefined && typeof applied.rolledBack !== 'boolean'
          || applied.ok && (applied.repairId !== selectedForWrite.id || applied.reasonId !== undefined)
          || !applied.ok && typeof applied.reasonId !== 'string') {
          return failClosed('needs-feedback', '配置修复结果无法核验；请先检查当前配置，再提交反馈。')
        }
        expectedRevision = applied.revision.toLowerCase()
        const applyStatus = applied.ok ? 'applied' : applied.reasonId === 'repair_no_longer_applicable' ? 'unchanged' : 'failed'
        attemptedRepairs.add(selectedForWrite.id)
        attempts.push(Object.freeze({ repairId: selectedForWrite.id, status: applyStatus }))
        lastResultCode = applied.reasonId ?? applyStatus
        state.lastRepairId = selectedForWrite.id
        publish('verifying', applied.ok ? '配置修复已应用，正在核验结果。' : `配置修复未应用（${applied.reasonId}），正在重新核验。`, {
          repairId: selectedForWrite.id,
          status: applyStatus,
          ...(applied.reasonId ? { code: applied.reasonId } : {}),
        })
        if (controller.signal.aborted) {
          return failClosed('stopped', applied.ok
            ? `已停止后续轮次；第 ${round} 轮配置操作已应用。`
            : '已停止后续轮次；请查看最后一轮配置操作结果。')
        }
        if (applied.reasonId === 'stale_config') return failClosed('stale', '写入时发现配置版本已变化，自动修复已停止。', 'stale_config')
        if (applied.reasonId === 'runtime_not_stopped') {
          state.recovery = 'feedback'
          return failClosed('needs-feedback', '语音运行仍占用配置；停止语音后再试，并提交此诊断结果。', 'runtime_not_stopped')
        }
        if (applied.reasonId === 'repair_cancelled') return failClosed('stopped', '配置修复已取消；未启动后续轮次。', 'repair_cancelled')

        publish('verifying', `第 ${round} 轮：核验配置问题是否消失。`, { repairId: selectedForWrite.id })
        const verified = await runDiagnosis('verify', controller.signal)
        const verifyCheck = checkAgainst(verified, expectedRevision, null, true)
        if (!verifyCheck.ok) return failClosed('stale', '修复后的配置版本无法确认，自动修复已停止；请检查结果并提交反馈。')
        if (verifyCheck.resolved) return failClosed('completed', '复查确认配置问题已解决。')
        expectedIncidentId = verified.incident.id
        if (!verified.repairs.some(repair => !attemptedRepairs.has(repair.id))) return manualOutcome(verified)
        // A fresh diagnosis is required at the beginning of the next round.
      }
      state.recovery = 'feedback'
      return failClosed('needs-feedback', lastResultCode
        ? `已达到 ${MAX_ROUNDS} 轮上限，问题仍存在；最后结果代码为 ${lastResultCode}。请提交反馈。`
        : `已达到 ${MAX_ROUNDS} 轮上限，问题仍存在；请提交反馈。`)
    } catch (error) {
      if (controller.signal.aborted && state.stage === 'applying') {
        state.recovery = 'feedback'
        return failClosed('needs-feedback', '停止时写入结果未能确认；请检查当前配置并提交反馈。', 'APPLY_OUTCOME_UNKNOWN')
      }
      if (controller.signal.aborted) return failClosed('stopped', '已停止后续配置修复。')
      const code = safeErrorCode(error)
      return failClosed('failed', '配置修复未能安全完成；请检查状态并提交反馈。', code)
    } finally {
      if (active?.controller === controller) active = null
    }
  }

  function stop() {
    if (offerController) {
      offerController.abort()
      pendingOffer = null
      state.offerId = null
      state.state = 'stopped'
      publish('stopped', '修复邀请已关闭，未执行配置更改。')
      return snapshotView()
    }
    if (!active) {
      if (state.state === 'offered') {
        pendingOffer = null
        state.offerId = null
        state.state = 'stopped'
        publish('stopped', '修复邀请已关闭，未执行配置更改。')
      }
      return snapshotView()
    }
    state.state = 'stopping'
    publish('stop-requested', '正在停止后续修复轮次。')
    active.controller.abort()
    return snapshotView()
  }

  async function dispose() {
    if (disposed) return snapshotView()
    disposed = true
    pendingOffer = null
    offerController?.abort()
    if (active) {
      active.controller.abort()
      const running = active.promise
      if (running) await running.catch(() => {})
    }
    state.state = 'disposed'
    state.offerId = null
    publish('disposed', '配置修复控制器已关闭。')
    return snapshotView()
  }

  function getSnapshot() {
    return snapshotView()
  }

  function status() {
    return snapshotView()
  }

  return Object.freeze({ offer, start, stop, dispose, getSnapshot, status })
}
