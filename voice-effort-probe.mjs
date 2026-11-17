/** Bounded, context-free exact-effort checks. No credentials or responses are retained. */
export const EFFORT_PROBE_LIMITS = Object.freeze({ requests: 3, maxTokens: 16, timeoutMs: 5000, retries: 0, cooldownMs: 15000, ttlMs: 1800000 })
const EFFORTS = ['off', 'low', 'high']
const shared = new WeakMap()
const unknown = reason => Object.fromEntries(EFFORTS.map(e => [e, { status: 'unknown', reason }]))
function stateFor(llm) {
  let state = shared.get(llm)
  if (!state) { state = { cache: new Map(), running: null }; shared.set(llm, state) }
  return state
}
const errorCode = error => typeof error?.code === 'string' ? error.code : 'UNKNOWN'
function bounded(promise, signal) {
  return new Promise((resolve, reject) => {
    const abort = () => reject(signal.reason ?? new Error('Aborted'))
    if (signal.aborted) return abort()
    signal.addEventListener('abort', abort, { once: true })
    Promise.resolve(promise).then(resolve, reject).finally(() => signal.removeEventListener('abort', abort))
  })
}
export function createEffortProbe({ getLlm, timeoutMs = EFFORT_PROBE_LIMITS.timeoutMs, now = Date.now } = {}) {
  const lifetime = new AbortController()
  let generation = 0, currentRoute = null, routeController = null, last = null
  const loadedKeys = new Set()
  async function inspect(route, signal) {
    lifetime.signal.throwIfAborted()
    const routeKey = JSON.stringify([route.provider, route.model])
    if (currentRoute !== routeKey) {
      routeController?.abort(); routeController = new AbortController(); currentRoute = routeKey; generation++; last = null
    }
    const epoch = generation
    const llm = getLlm(), state = llm && stateFor(llm)
    const base = { ...route, limits: EFFORT_PROBE_LIMITS, checkedAt: null, revision: null, results: unknown('host_contract_blocked'), status: 'host_contract_blocked' }
    if (!llm || typeof llm.inspectExactEffort !== 'function' || typeof llm.prepareCall !== 'function') return base
    const outer = AbortSignal.any([lifetime.signal, routeController.signal, ...(signal ? [signal] : [])])
    let capability
    try { capability = await bounded(llm.inspectExactEffort(route.provider, route.model, outer), AbortSignal.any([outer, AbortSignal.timeout(timeoutMs)])) }
    catch { return { ...base, results: unknown('unknown'), status: 'unknown' } }
    outer.throwIfAborted()
    if (epoch !== generation) throw new Error('Voice probe route changed')
    if (capability?.version !== 1 || !['deepseek-messages-v1', 'deepseek-openai-completions-v1'].includes(capability.protocol) || capability.budget !== 'total-output-including-reasoning' || typeof capability.revision !== 'string' || !capability.revision || !Array.isArray(capability.efforts)) return base
    const key = JSON.stringify([route.provider, route.model, capability.revision])
    const cached = state.cache.get(key)
    const firstLoad = !loadedKeys.has(key)
    if (cached && now() - cached.at < (firstLoad ? EFFORT_PROBE_LIMITS.cooldownMs : cached.value.status === 'unknown' ? EFFORT_PROBE_LIMITS.cooldownMs : EFFORT_PROBE_LIMITS.ttlMs)) {
      loadedKeys.add(key); last = { ...cached.value, cached: true }; return last
    }
    if (state.running) {
      const running = state.running
      const pendingUnknown = () => ({ ...base, revision: capability.revision, results: Object.fromEntries(EFFORTS.map(effort => [effort, { status: 'unknown', reason: capability.efforts.includes(effort) ? 'busy' : 'host_contract_blocked' }])), status: 'unknown' })
      // A cancelled UI caller still owns a draining transport, not the next
      // caller's lifetime. Keep the slot occupied but never reuse its rejection.
      if (running.signal.aborted || running.key !== key) return pendingUnknown()
      try { return await bounded(running.promise, outer) }
      catch (error) {
        outer.throwIfAborted()
        if (running.signal.aborted) return pendingUnknown()
        throw error
      }
    }
    loadedKeys.add(key)
    while (loadedKeys.size > 32) loadedKeys.delete(loadedKeys.values().next().value)
    const run = async () => {
      const results = unknown('unknown')
      for (const effort of EFFORTS) {
        if (!capability.efforts.includes(effort)) { results[effort] = { status: 'unknown', reason: 'host_contract_blocked' }; continue }
        outer.throwIfAborted()
        const requestController = new AbortController()
        const timer = setTimeout(() => requestController.abort(new Error('Probe timeout')), timeoutMs)
        const requestSignal = AbortSignal.any([outer, requestController.signal])
        try {
          const operation = (async () => {
            const prepared = await llm.prepareCall({ ...route, reasoningEffort: effort, maxTokens: EFFORT_PROBE_LIMITS.maxTokens }, requestSignal)
            // Adapter preparation may finish after ignoring cancellation. Stop
            // here, before stream invocation can send a billable request.
            requestSignal.throwIfAborted()
            if (prepared.exactEffort?.revision !== capability.revision || prepared.exactEffort?.protocol !== capability.protocol || prepared.exactEffort?.budget !== capability.budget || prepared.config?.reasoningEffort !== effort || prepared.config?.maxTokens !== EFFORT_PROBE_LIMITS.maxTokens) throw Object.assign(new Error('Exact effort contract changed'), { code: 'HOST_CONTRACT_CHANGED' })
            let finished = false
            for await (const chunk of prepared.stream({ ...prepared.config, signal: requestSignal, tools: [], messages: [{ id: 'whale-effort-probe', role: 'user', content: [{ type: 'text', text: 'Reply OK.' }], source: { kind: 'human' } }] })) {
              requestSignal.throwIfAborted()
              if (chunk.type === 'finish') {
                if (chunk.reason?.kind === 'error') throw Object.assign(new Error('Probe request failed'), { code: errorCode(chunk.reason.failure) })
                if (chunk.reason?.kind !== 'stop') throw Object.assign(new Error('Incomplete probe'), { code: 'INCOMPLETE' })
                finished = true
              }
            }
            if (!finished) throw new Error('No final response')
            return { status: 'accepted', reason: 'accepted' }
          })()
          // Do not begin another request while a timed-out transport is still alive.
          try { results[effort] = await bounded(operation, requestSignal) }
          catch (error) {
            if (requestSignal.aborted) {
              state.running.transportPending = operation.catch(() => {})
              throw error
            }
            throw error
          }
        } catch (error) {
          results[effort] = errorCode(error) === 'PROVIDER_UNSUPPORTED_REASONING_EFFORT'
            ? { status: 'unsupported', reason: 'provider_unsupported' }
            : { status: 'unknown', reason: ['HOST_CONTRACT_CHANGED', 'UNSUPPORTED_REASONING_EFFORT', 'EXACT_EFFORT_UNAVAILABLE'].includes(errorCode(error)) ? 'host_contract_blocked' : 'unknown' }
          if (requestSignal.aborted) break
        } finally { clearTimeout(timer); requestController.abort() }
      }
      outer.throwIfAborted()
      // A configuration/key rotation during the network request must not make
      // the old response authoritative for the new adapter snapshot.
      const current = await bounded(llm.inspectExactEffort(route.provider, route.model, outer), AbortSignal.any([outer, AbortSignal.timeout(timeoutMs)]))
      if (current?.revision !== capability.revision) throw new Error('Voice probe configuration changed')
      const value = { ...base, revision: capability.revision, checkedAt: now(), results, status: Object.values(results).some(r => r.status === 'unknown') ? 'unknown' : 'checked', cached: false }
      if (epoch !== generation) throw new Error('Voice probe route changed')
      state.cache.set(key, { at: now(), value })
      while (state.cache.size > 16) state.cache.delete(state.cache.keys().next().value)
      last = value
      return value
    }
    const running = { key, signal: outer, promise: null, transportPending: null }
    state.running = running
    running.promise = run().finally(() => {
      if (running.transportPending) running.transportPending.finally(() => { if (state.running === running) state.running = null })
      else if (state.running === running) state.running = null
    })
    return running.promise
  }
  return { inspect, status: () => last, dispose() { generation++; lifetime.abort(); routeController?.abort(); last = null } }
}
