import { createController as createQuietController } from '../src/controller.mjs'
// Adapt existing command-shaped test fixtures only. Production controllers never
// receive this adapter and have no command transport or fallback path.
export function createController(fixture) {
  return createQuietController(fixture && (async (id, request, signal) => {
    const response = await fixture(id, `/whale-ear-ui ${JSON.stringify(request)}`, [], signal)
    if (!response?.ok) throw new Error(response?.error?.message ?? '鱼应连接不可用')
    const result = response.value?.result
    if (!result || result.kind !== 'success') throw new Error(result?.text ?? '鱼应界面接口未就绪')
    const parsed = JSON.parse(result.text)
    if (parsed?.protocol !== 1 || parsed.action !== request.action || !parsed.value || typeof parsed.value !== 'object') throw new Error('Fish Voice UI protocol mismatch')
    return parsed.value
  }))
}
