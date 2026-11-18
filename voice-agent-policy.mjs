/** Persistent first-use authorization. No token, password or OS permission lives here. */
import { createHash, randomUUID } from 'node:crypto'
import { closeSync, existsSync, fsyncSync, mkdirSync, openSync, readFileSync, renameSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

export const ORDINARY_OPERATIONS = ['set-performance-mode', 'set-visibility', 'set-output-volume']
export const USAGE_AGREEMENT_VERSION = 1
export const USAGE_AGREEMENT_TEXT = Object.freeze([
  '允许 Agent 管理鱼应的麦克风、聆听方式、本地音频、设置和下列模型下载。',
  '选用 Edge 在线朗读时，朗读文字发送至微软。音色样本使用本人或已获使用授权的声音。',
])
export const TTS_CLOUD_CONSENT = Object.freeze({
  __proto__: null,
  edge: { field: 'edgeTextTransmissionAccepted', scope: 'edge-text' },
  deepseek: { field: 'deepseekTextTransmissionAccepted', scope: 'deepseek-text' },
})
export const AUTHORIZATION_SCOPES = Object.freeze([
  { id: 'microphone', title: '麦克风与连续聆听', description: '开关麦克风、按住录音、自由麦和本地唤醒词。' },
  { id: 'local-audio', title: '本地音频与朗读', description: '本机转写、分析音频、保存声纹样本及播放语音。' },
  { id: 'settings', title: '设置与语音对话', description: '修改插件设置，新建或接续语音对话。' },
  { id: 'edge-text', title: 'Edge 在线朗读', description: '选用 Edge 时，向微软发送朗读文字以合成语音。' },
  { id: 'deepseek-text', title: 'DeepSeek 语音合成', description: '在朗读设置启用后，向 DeepSeek API 发送朗读文字以合成语音。' },
  { id: 'model-download', title: '下列来源的模型下载', description: '下载、校验、暂停、恢复和应用下列模型及运行组件。' },
])
const hash = text => createHash('sha256').update(text).digest('hex')
const object = value => value && typeof value === 'object' && !Array.isArray(value)
const fresh = () => ({ schema: 2, grants: Object.fromEntries(ORDINARY_OPERATIONS.map(name => [name, { allowed: false, baseline: null }])), authorization: { completed: false, scopes: [], modelSources: [], grantedAt: null, usageAgreementVersion: null, blockedOperations: [], revocationUnconfirmed: false }, pins: {} })
const parse = text => {
  let value = text ? JSON.parse(text) : fresh()
  // Migrate explicit ordinary choices, never invent consent for microphone or cloud.
  if (value?.schema === 1) value = { ...fresh(), grants: value.grants }
  const auth = value?.authorization
  if(auth){auth.blockedOperations??=[];auth.revocationUnconfirmed??=false;auth.usageAgreementVersion??=null}
  if (value?.schema !== 2 || !object(value.grants) || Object.keys(value.grants).sort().join() !== [...ORDINARY_OPERATIONS].sort().join()
    || Object.values(value.grants).some(item => !object(item) || Object.keys(item).sort().join() !== 'allowed,baseline' || typeof item.allowed !== 'boolean' || !(item.baseline === null || typeof item.baseline === 'string' && /^[a-f0-9]{64}$/.test(item.baseline)))
    || !object(auth) || typeof auth.completed !== 'boolean' || !Array.isArray(auth.scopes) || new Set(auth.scopes).size !== auth.scopes.length || auth.scopes.some(id => !AUTHORIZATION_SCOPES.some(scope => scope.id === id))
    || !(auth.usageAgreementVersion === null || auth.usageAgreementVersion === USAGE_AGREEMENT_VERSION)
    || !Array.isArray(auth.modelSources) || auth.modelSources.length > 32 || auth.modelSources.some(item => !object(item) || typeof item.modelId !== 'string' || typeof item.source !== 'string' || !Array.isArray(item.licenseUrls) || item.licenseUrls.some(url => typeof url !== 'string') || typeof item.licenseNote !== 'string')
    || !Array.isArray(auth.blockedOperations) || auth.blockedOperations.some(operation=>typeof operation!=='string') || typeof auth.revocationUnconfirmed!=='boolean'
    || !(auth.grantedAt === null || Number.isFinite(auth.grantedAt)) || !object(value.pins) || JSON.stringify(value.pins).length > 32768) throw new Error('鱼应授权记录无效，未授予自动调用权限')
  return { ...value, revision: hash(text), initialized: Boolean(text) }
}
const serialized = value => JSON.stringify({ schema: 2, grants: value.grants, authorization: value.authorization, pins: value.pins }, null, 2) + '\n'
export function createMemoryAgentPermissions() {
  let text = ''
  return {
    read: () => parse(text),
    write(value, revision) {
      if (hash(text) !== revision) throw new Error('鱼应授权已改变，请重新读取')
      const next = serialized(value); parse(next); text = next
      return parse(text)
    },
  }
}
export function createFileAgentPermissions(path) {
  const readText = () => { try { return readFileSync(path, 'utf8') } catch (error) { if (error.code === 'ENOENT') return ''; throw error } }
  return {
    read: () => parse(readText()),
    write(value, revision) {
      const text = readText()
      if (hash(text) !== revision) throw new Error('鱼应授权已改变，请重新读取')
      const next = serialized(value); parse(next)
      mkdirSync(dirname(path), { recursive: true })
      const temp = `${path}.${randomUUID()}.tmp`
      let fd
      try {
        fd = openSync(temp, 'wx', 0o600)
        writeFileSync(fd, next, 'utf8'); fsyncSync(fd); closeSync(fd); fd = undefined
        if (readText() !== text) throw new Error('鱼应授权正在变化，请重新读取')
        renameSync(temp, path)
      } finally {
        if (fd !== undefined) closeSync(fd)
        if (existsSync(temp)) unlinkSync(temp)
      }
      return parse(next)
    },
  }
}
