/** A model-only request for the existing voice root. No Agent turn is admitted. */
import { inspectNativeDeepSeekFastRoute, prepareNativeDeepSeekFastCall } from './voice-fast-route.mjs'

const PREWARM_INPUT_TOKEN_THRESHOLD = 100_000
const textHistoryBlocks = new Set(['text', 'reasoning', 'tool-call', 'tool-addition', 'tool-removal'])
const placeholder = Object.freeze({
  role: 'user',
  content: Object.freeze([Object.freeze({ type: 'text', text: '·' })]),
})

async function loadPromptApi(ctx) {
  const loader = ctx.get?.('loader') ?? ctx.loader
  const load = typeof loader?.import === 'function' ? name => loader.import(name) : name => import(name)
  const [prompt, llm] = await Promise.all([load('@deepseek-ai/dsh-system-prompt'), load('@deepseek-ai/dsh-llm')])
  return { renderPrompt: prompt.renderPrompt, createSystemMessage: llm.createSystemMessage, projectToolUpdates: llm.projectToolUpdates }
}

function modelOutput(chunk) {
  switch (chunk?.type) {
    case 'text-delta':
    case 'reasoning-delta': return typeof chunk.text === 'string' && chunk.text.length > 0
    case 'tool-call-delta': return Boolean(chunk.name || chunk.argumentsDelta)
    case 'block-end': return Boolean(chunk.block?.text || chunk.block?.type === 'tool-call' && chunk.block.name)
    default: return false
  }
}

function projectedHistory(session, rendered, inHistory, createSystemMessage, tools) {
  const history = session.deriveMessages()
  const system = history.filter(message => message.role === 'system')
  const textOf = message => message.content.map(block => block.text).join('')
  // A warmup should never upload a cached attachment or replay unknown data.
  // For a changed system snapshot, start with the new rendering rather than
  // guessing how the Agent's private per-step update policy will fold history.
  if (history.some(message => message.content.some(block => !textHistoryBlocks.has(block.type))) ||
    inHistory && system.length && textOf(system.findLast(message => textOf(message)) ?? system[0]) !== rendered) {
    return { messages: [createSystemMessage(rendered), placeholder] }
  }
  const prefix = inHistory && system.length
    ? history
    : [createSystemMessage(rendered), ...history.filter(message => message.role !== 'system')]
  // Native Messages uses the folded model header instead of current schemas
  // when toolHistory is present. A fresh or changed root has no matching header
  // yet; omitting the fold sends the same current declarations as its first turn.
  const previous = session.requestHeader?.()
  const matches = previous && JSON.stringify(previous.tools ?? []) === JSON.stringify(tools)
  return { messages: [...prefix, placeholder], ...(matches ? { toolHistory: session.toolHistory() } : {}) }
}

function estimateInputTokens(messages, tools) {
  // Price model-visible content only. Session IDs and assistant replay metadata
  // don't count. The English estimate uses the local DeepSeek long-context
  // benchmark; the estimate for Han characters uses DeepSeek's published ratio.
  const visible = JSON.stringify({ messages: messages.map(({ role, content }) => ({ role, content })), tools })
  let hanCharacters = 0, hanCodeUnits = 0
  for (const [character] of visible.matchAll(/\p{Script=Han}/gu)) {
    hanCharacters++
    hanCodeUnits += character.length
  }
  return Math.ceil((visible.length - hanCodeUnits) / 4.7 + hanCharacters * 0.6)
}

export function createVoiceCacheWarmup(ctx, { timeoutMs = 10_000, loadApi = loadPromptApi } = {}) {
  const service = name => ctx.get?.(name) ?? ctx[name]
  let promptApi
  function supported() {
    try {
      return typeof service('tools')?.resolve === 'function' &&
        typeof service('systemPrompt')?.assemble === 'function' &&
        typeof service('llm')?.prepareCall === 'function'
    } catch { return false }
  }

  async function run(voice, controller, routeCapabilities = {}) {
    const { signal } = controller
    const { session } = voice
    if (!supported() || typeof session?.deriveMessages !== 'function' || typeof session?.toolHistory !== 'function') return { status: 'unsupported' }
    if (signal.aborted || voice.status !== 'idle') return { status: 'cancelled' }
    let expired = false
    let firstOutputMs
    const timer = setTimeout(() => {
      if (!signal.aborted) { expired = true; controller.abort() }
    }, timeoutMs)
    timer.unref?.()
    async function request() {
      const modelSelection = voice.model.current()
      if (!modelSelection?.provider || !modelSelection?.model) return { status: 'unsupported' }
      // Import only on a user-triggered warmup in a compatible host.
      promptApi ??= loadApi(ctx).catch(error => { promptApi = null; throw error })
      const { renderPrompt, createSystemMessage, projectToolUpdates } = await promptApi
      if (typeof renderPrompt !== 'function' || typeof createSystemMessage !== 'function') return { status: 'unsupported' }
      signal.throwIfAborted()
      const toolSet = await service('tools').resolve({ agent: voice, modelSelection, signal })
      let assembly
      try {
        assembly = await service('systemPrompt').assemble({ agent: voice, scope: voice, modelSelection, toolSet, signal })
      } finally { toolSet.dispose() }
      signal.throwIfAborted()
      const rendered = renderPrompt(assembly)
      function projectRequest(capabilities) {
        const history = projectedHistory(session, rendered, capabilities.systemPromptUpdate === 'in-history', createSystemMessage, assembly.tools)
        const visible = projectToolUpdates?.(history.messages, assembly.tools, capabilities.toolUpdate, history.toolHistory)
        const estimatedInputTokens = estimateInputTokens(visible?.messages ?? history.messages, visible?.tools ?? assembly.tools)
        return { history, estimatedInputTokens }
      }
      let projection = projectRequest(routeCapabilities)
      const belowThreshold = () => ({ status: 'skipped-short-input', estimatedInputTokens: projection.estimatedInputTokens })
      if (projection.estimatedInputTokens <= PREWARM_INPUT_TOKEN_THRESHOLD) return belowThreshold()

      const llm = service('llm')
      const prepared = modelSelection.reasoningEffort === 'off' && inspectNativeDeepSeekFastRoute(llm, modelSelection.provider).supported
        ? (await prepareNativeDeepSeekFastCall(llm, { ...modelSelection, maxTokens: 1, signal })).call
        : await llm.prepareCall({ ...modelSelection, maxTokens: 1 }, signal)
      signal.throwIfAborted()
      if (voice.status !== 'idle' || JSON.stringify(voice.model.current()) !== JSON.stringify(modelSelection)) return { status: 'cancelled' }
      // Adapter capabilities can change after the voice session is opened.
      // Re-read the surface and validate the actual prepared request before sending.
      projection = projectRequest(prepared)
      if (projection.estimatedInputTokens <= PREWARM_INPUT_TOKEN_THRESHOLD) return belowThreshold()
      const started = performance.now()
      for await (const chunk of prepared.stream({
        ...prepared.config, ...projection.history, ...(assembly.tools.length ? { tools: assembly.tools } : {}), sessionId: session.id, signal,
      })) {
        signal.throwIfAborted()
        if (modelOutput(chunk)) {
          firstOutputMs = performance.now() - started
          controller.abort()
          break
        }
        if (chunk?.type === 'finish' && chunk.reason?.kind === 'error') return { status: 'failed' }
      }
      if (firstOutputMs !== undefined) return { status: 'first-output', firstOutputMs, estimatedInputTokens: projection.estimatedInputTokens }
      signal.throwIfAborted()
      return { status: 'no-output' }
    }
    try {
      const agents = service('agents')
      return await (typeof agents?.withInitiator === 'function' ? agents.withInitiator(voice, request) : request())
    } catch {
      if (firstOutputMs !== undefined) return { status: 'first-output', firstOutputMs }
      return { status: expired ? 'timeout' : signal.aborted ? 'cancelled' : 'failed' }
    } finally { clearTimeout(timer) }
  }

  return { supported, run }
}
