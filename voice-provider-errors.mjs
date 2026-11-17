import { inspectNativeDeepSeekFastRoute } from './voice-fast-route.mjs'

const officialMessages = {
  400: '请求格式有误。请检查模型和请求设置。',
  401: 'API 密钥无效或已失效。请检查 DeepSeek 授权。',
  402: '账号额度不足。请充值后重试。',
  403: '当前账号无权访问该资源。',
  404: '请求的模型或资源不存在。',
  408: '请求超时。请重试。',
  413: '请求内容过长。请缩短输入后重试。',
  422: '请求参数有误。请检查模型和档位设置。',
  429: '请求过于频繁。请稍后重试。',
  500: 'DeepSeek 服务发生内部错误。请稍后重试。',
  503: 'DeepSeek 服务繁忙。请稍后重试。',
  504: '服务响应超时。请稍后重试。',
}

const safeCode = value => typeof value === 'string' && /^[a-zA-Z0-9_.:-]{1,64}$/.test(value) ? value : null

function safeProviderText(message) {
  if (typeof message !== 'string') return ''
  return message.slice(0, 2048)
    .replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, ' ')
    .replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, ' ')
    .replace(/\bBearer\s+[^\s,;"}]+/gi, '[授权已隐藏]')
    .replace(/\b(api[ _-]?key|key|token|secret|authorization|password)["']?\s*[:=]\s*["']?[^\s,;"'}]+/gi, '$1=[已隐藏]')
    .replace(/\b(?:sk|rk|pk)-[A-Za-z0-9_-]{8,}\b/g, '[密钥已隐藏]')
    .replace(/https?:\/\/[^\s"'<>]+/gi, '[网址已隐藏]')
    .replace(/\s+/g, ' ').trim().slice(0, 320)
}

export function explainVoiceProviderFailure(llm, provider, failure) {
  const name = safeCode(provider)
  if (!name) return null
  const rawStatus = failure?.status ?? failure?.statusCode
  const status = typeof rawStatus === 'number' && Number.isInteger(rawStatus) && rawStatus >= 100 && rawStatus <= 599 ? rawStatus : null
  const code = safeCode(failure?.code)
  const official = inspectNativeDeepSeekFastRoute(llm, name).supported
  const detail = official ? officialMessages[status] ?? '模型请求失败。请检查连接和模型设置。' : safeProviderText(failure?.message) || '提供商未返回错误说明。'
  return { provider: name, official, status, code, message: `${official ? 'DeepSeek 官方' : `第三方提供商 ${name}`} 报错${status ? `（${status}）` : code ? `（${code}）` : ''}。 ${detail}` }
}
