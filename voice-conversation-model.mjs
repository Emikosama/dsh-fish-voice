/** Only registered host LLM adapters and their advertised models are selectable. */
const id = value => typeof value === 'string' && !!value.trim() && value.length <= 256 && !/[\u0000-\u001f\u007f]/.test(value)
export function conversationModel(config = {}) {
  const mode = config.conversationModelMode ?? (config.provider != null || config.model != null ? 'manual' : 'auto')
  if (!['auto','manual'].includes(mode)) throw new Error('对话模型选择方式无效')
  return {mode, provider: mode === 'auto' ? null : config.provider ?? null, model: mode === 'auto' ? null : config.model ?? null}
}
export function validateConversationModel(value) {
  if (!value || Object.keys(value).sort().join() !== 'mode,model,provider' || !['auto','manual'].includes(value.mode) || (value.mode === 'auto' ? value.provider !== null || value.model !== null : !id(value.provider) || !id(value.model))) throw new Error('请选择完整的对话供应商和模型')
  return {...value}
}
export async function conversationModels(llm, signal) {
  signal?.throwIfAborted()
  if (typeof llm?.listProviders !== 'function' || typeof llm?.listModels !== 'function') throw new Error('宿主对话模型目录暂不可用')
  const rows = await llm.listProviders()
  if (!Array.isArray(rows) || rows.length > 256) throw new Error('对话供应商目录无效')
  const providers = [], seen = new Set()
  for (const row of rows) {
    if (!id(row?.id) || !id(row.name) || seen.has(row.id)) throw new Error('对话供应商目录无效')
    seen.add(row.id)
    const models = await llm.listModels(row.id)
    signal?.throwIfAborted()
    if (!Array.isArray(models) || models.length > 2048 || models.some(m => !id(m?.id) || !id(m.name) || m.provider !== row.id) || new Set(models.map(m=>m.id)).size !== models.length) throw new Error('对话模型目录无效')
    providers.push({id:row.id,name:row.name,models:models.map(({id,name})=>({id,name}))})
  }
  signal?.throwIfAborted()
  return {providers}
}
export async function assertConversationModel(llm, value, signal) {
  validateConversationModel(value)
  if (value.mode === 'auto') return
  const catalog = await conversationModels(llm, signal)
  if (!catalog.providers.find(p=>p.id===value.provider)?.models.some(m=>m.id===value.model)) throw new Error('所选对话供应商或模型已不可用，请重新选择')
}
