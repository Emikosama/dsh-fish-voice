/** Explicit narrow Remote contribution; no globally forwarded text events. */
import { array, boolean, discriminatedUnion, enum as enumeration, json, literal, null as nullValue, number, record, strictObject, string, union } from 'zod'
import { CLIENT_OPERATION_NAMES, CLIENT_OPERATION_PAGE_BYTES, CLIENT_OPERATION_BATCH_SIZE } from '../../voice-operation-log-contract.mjs'
const service = 'whaleConversation'
const codec = (name, create) => ({ mode: 'strict', typeSymbol: `dsh-fish-voice/conversation#${name}`, create })
const sessionCodec = codec('sessionId', () => string().min(1).max(256))
const settingsSessionCodec = codec('settingsSessionId', () => sessionCodec.create().nullable())
export const ownerSettingsActions = new Set([
  'status', 'read-settings', 'listen-mode', 'complete-setup', 'set-visibility',
  'inspect-tts', 'save-tts', 'preview-tts', 'cancel-tts', 'save-models',
  'model-installer', 'inspect-model-compute', 'plan-model-install', 'start-model-install',
  'control-model-install', 'apply-model-install', 'pick-local-path',
  'enable','disable','new','resume','read-history',
  'read-audio-devices','save-audio-device','save-settings','capture-bindings','save-bindings',
  'save-voice-prompt','conversation-models','save-conversation-model','inspect-performance','set-performance-mode',
  'read-output-volume','set-output-volume',
])
const requestCodec = codec('volumeRequest', () => strictObject({ revision: number().int().nonnegative(), volume: number().min(0).max(1) }))
const itemSchema = strictObject({ id: string(), role: enumeration(['user', 'assistant']), text: string().max(8000), state: enumeration(['reply','interrupted','delivered','speech-requested','speech-failed']), at: number() })
const wakeSchema = strictObject({state:enumeration(['disabled','starting','waiting','listening','paused','error']),deadlineAt:number().nonnegative().nullable(),streamOpen:boolean(),detection:enumeration(['asr-after-utterance','acoustic-after-utterance'])})
const retryId = string().uuid()
const inputDeliverySchema = strictObject({
  id: retryId, text: string().max(8000), sessionId: sessionCodec.create(), title: string().max(256).nullable(),
  state: enumeration(['sending','queued','busy','ready','delivered','uncertain','failed','discarded']),
})
const retryTranscripts = strictObject({
  sessionId: sessionCodec.create(),
  items: array(strictObject({ id: retryId, text: string().max(8000), title: string().max(256).nullable().optional(), state: enumeration(['busy', 'ready', 'sending', 'uncertain']) })).max(8),
})
const snapshotCodec = codec('snapshot', () => strictObject({ revision: number().int().nonnegative(), historyGeneration: number().int().nonnegative().optional(), rootSessionId: string().nullable(), title: nullValue(), latest: itemSchema.nullable(), items: array(itemSchema).max(40), inputActive: boolean(), inputError: enumeration(['device','recognition','no-speech']).nullable().optional(), providerError: string().max(480).optional(), inputDelivery: inputDeliverySchema.optional(), retryTranscripts: retryTranscripts.nullable().optional(), playbackConfirmed: literal(false),wake:wakeSchema.optional(), helper: strictObject({online:boolean(),listenMode:enumeration(['ptt','always','wake']).nullable()}).refine(value => value.online || value.listenMode === null).optional() }))
const volumeCodec = codec('volume', () => strictObject({ supported: boolean(), backend: literal('dsh-speak').nullable(), volume: number().min(0).max(1).nullable(), revision: number().int().nullable(), apply: literal('next-output').nullable(), reason: string().nullable() }))
// Strict installer projection. No private config, authorization headers, ETags,
// arbitrary source files or executable command fields are part of this stream.
const text = string().max(4096)
const count = number().int().nonnegative().max(Number.MAX_SAFE_INTEGER)
const modelError = strictObject({ code: string().max(64), message: string().max(512) })
const capability = strictObject({ available: boolean(), reason: text.nullable(), runtimeLoaded: literal(false), backend: text.optional(), provider: text.optional(), device: text.optional(), computeType: text.optional(), supportedComputeTypes: array(text).max(32).optional(), deviceCount: count.optional(), deviceIndex: count.optional(), validation: text.optional(), note: text.optional(), providerAdvertised: boolean().optional() })
const computeSchema = strictObject({ schema: literal(1), default: literal('cpu'), observedAt: text.nullable(), reason: text.optional(), backends: strictObject({ sensevoice: strictObject({ cpu: capability, cuda: capability }).optional() }) })
const hardwareSchema = strictObject({ observedAt: text, scope: literal('plugin-host'), platform: text, arch: text, cpuLogicalCores: count.nullable(), totalMemoryBytes: count.nullable(), availableMemoryBytes: count.nullable(), gpuMemoryBytes: count.nullable(), gpuMemoryReason: text, gpuSource: literal('dxgi').nullable().optional(), gpuAdapters: array(strictObject({ name: string().min(1).max(256), dedicatedVideoMemoryBytes: count, sharedSystemMemoryBytes: count })).max(32).optional() })
const recommendationSchema = strictObject({ modelId: text, confidence: enumeration(['not-assessed','unknown','heuristic-only']), recommended: boolean(), badge: text.nullable(), state: enumeration(['manual-choice','unknown','recommended-pending-runtime-validation','limited-memory','busy-memory','recommended-lightweight']), reason: text, policy: text.optional(), runtimeValidated: literal(false).optional(), gpuValidated: literal(false).optional() })
const runtimeSchema = strictObject({release:text,source:text,sources:array(text).max(16).optional(),redirectHost:text,platform:text,arch:text,executable:text,licenseUrls:array(text).max(20)})
const ttsIntentSchema = strictObject({jobId:text,modelId:text,status:enumeration(['waiting','verifying','applied','blocked','paused','cancelled']),reason:text.nullable()})
const modelSchema = strictObject({ id: text, runtime:runtimeSchema.nullable().optional(),purpose:enumeration(['tts','asr']).optional(),computeOptions:array(enumeration(['cpu','auto','cuda','vulkan'])).max(4).optional(), recommendation: recommendationSchema, title: text, backend: text.nullable(), available: boolean(), reason: text.nullable(), totalBytes: count.nullable(), source: text.nullable(), licenseUrls: array(text).max(20), licenseNote: text.nullable(), verification: text.optional(), runtimeLoaded: literal(false) })
const jobSchema = strictObject({ id: string().uuid(), modelId: text, compute: enumeration(['cpu','auto','cuda','vulkan']), status: enumeration(['queued','running','paused','failed','cancelled','installed']), stage: enumeration(['queued','running','paused','failed','cancelled','installed','checking-runtime','verifying-local','downloading','verifying','installing']), createdAt: text, updatedAt: text, totalBytes: count, receivedBytes: count, runtimeLoaded: literal(false), error: modelError.nullable(), currentFile: text.nullable().optional(), files: array(strictObject({ name: text, bytes: count, receivedBytes: count, verified: boolean(), reused:boolean().optional() })).max(200), installedPath: text.optional(), sourceDirectory:text.optional(), modelVariant:enumeration(['q4_k_m','q8_0']).optional(), reused:literal(true).optional(), reusedBytes:count.optional(), purpose:enumeration(['tts','asr']).optional(), recommendedSettings: union([strictObject({tts:strictObject({provider:literal('local'),localModelId:text,localModelPath:text})}),strictObject({ asr: literal('sensevoice'), models: strictObject({ sensevoiceDir: text.optional() }), modelCompute: enumeration(['cpu','auto','cuda']) })]).optional() })
export const modelSnapshotCodec = codec('modelSnapshot', () => strictObject({ schema: literal(1), hardware: hardwareSchema, compute: computeSchema, refresh:strictObject({pending:boolean(),observedAt:string().max(64).nullable(),attemptedAt:string().max(64).nullable(),error:string().max(512).nullable(),intervalMs:literal(300000)}).optional(), models: array(modelSchema).max(32), jobs: array(jobSchema).max(1000),ttsInstallIntent:ttsIntentSchema.nullable().optional() }))
const authorizationRequestCodec = codec('authorizationRequest', () => strictObject({ revision: string().min(1).max(256), grant: boolean() }))
const senseVoiceAsrRequestCodec = codec('senseVoiceAsrRequest', () => discriminatedUnion('operation', [
  strictObject({ operation: literal('status') }),
  strictObject({ operation: literal('retry') }),
]))
const asrProgressFields = {
  state: enumeration(['idle', 'downloading', 'ready', 'error']),
  receivedBytes: count,
  totalBytes: count,
}
const senseVoiceAsrResultCodec = codec('senseVoiceAsrResult', () => strictObject({
  ...asrProgressFields,
  selected: boolean(),
  message: string().max(512).nullable(),
}))
const authorizationCodec = codec('authorization', () => strictObject({schema:literal(1),revision:string().min(1).max(256),completed:boolean(),granted:boolean(),usageAgreement:strictObject({version:literal(1),accepted:boolean(),text:array(text).max(16)}).optional(),modelSourcesChanged:boolean().optional(),blockedOperations:array(text).max(32),revocationUnconfirmed:boolean(),scopes:array(strictObject({id:text,title:text,description:text,allowed:boolean()})).max(16),modelSources:array(strictObject({modelId:text,source:text,licenseUrls:array(text).max(20),licenseNote:text,runtime:strictObject({source:text,sources:array(text).max(16).optional(),licenseUrls:array(text).max(20),redirectHost:text.nullable()}).optional()})).max(32),restrictions:array(text).max(16)}))
const setupCodec = codec('setup', () => strictObject({ version: literal(1), completed: boolean() }))
// Closed action vocabulary: no caller/source/grant fields can cross this boundary.
// Nested settings are validated by the existing revision-fenced core before writes.
const revision = string().min(1).max(256)
const identifier = string().min(1).max(256)
const compute = enumeration(['cpu','auto','cuda','vulkan'])
const reuseFields = { sourceDirectory: string().min(1).max(4096).optional(), modelVariant: enumeration(['q4_k_m','q8_0']).optional() }
const values = record(string(), json())
const ttsDraftValues = strictObject({
  provider: enumeration(['deepseek','local']),
  deepseekVoice: enumeration(['stella','tide']), deepseekTextTransmissionAccepted: boolean(),
  volume: number().min(0).max(1), localModelId: string().max(128).nullable(), localModelPath: string().max(4096).nullable(),
  referenceAudioPath: string().max(4096).nullable(), referenceAudioAccepted: boolean(),
})
const audioDevice = strictObject({backend:enumeration(['winmm','portaudio']),id:string().min(1).max(1024),name:string().min(1).max(256)}).nullable()
const actionShapes = {
  'read-history': {cursor:string().max(128).optional()},
  'read-audio-devices': {}, 'save-audio-device': {revision,direction:enumeration(['input','output']),selection:audioDevice},
  'agent-permissions': {}, 'save-agent-permissions': {revision,allowed:strictObject({'set-performance-mode':boolean(),'set-visibility':boolean(),'set-output-volume':boolean()})},
  'agent-requests': {}, 'decide-agent-request': {id:identifier,approve:boolean(),acknowledgements:array(string().max(80)).max(10)},
  'model-installer': {}, 'inspect-model-compute': {},
  'plan-model-install': { modelId: identifier, compute, ...reuseFields },
  'start-model-install': { modelId: identifier, compute, ...reuseFields, planHash: revision, accepted: literal(true), useWhenReady:boolean().optional() },
  'control-model-install': { id: identifier, operation: enumeration(['pause','resume','cancel']) },
  'apply-model-install': { id: identifier, revision },
  status: {}, enable: { expectedOwnerSessionId: identifier.nullable().optional(), expectedExistingSessionId: identifier.nullable().optional() }, disable: {},
  'read-settings': {}, new: { expectedOwnerSessionId: identifier.nullable().optional() }, 'inspect-performance': {},
  'set-performance-mode': { revision, performanceMode: enumeration(['fast','balanced','high','compatibility']) },
  'inspect-tts': {}, 'save-tts': { revision, values }, 'complete-setup': { revision },
  'preview-tts': { revision: revision.optional(), values: ttsDraftValues.optional() }, 'cancel-tts': {}, list: { cursor: string().max(2048).optional() },
  resume: { id: identifier }, 'listen-mode': { mode: enumeration(['ptt','always','wake']) },
  'set-visibility': { revision, visibility: enumeration(['hidden','workspace']) },
  'pick-local-path': { kind: enumeration(['referenceAudio','sensevoiceDir','campplus','sourceDirectory']) },
  'capture-bindings': { operation:enumeration(['begin','end']),token:identifier.optional(),inactive:boolean().optional() },
  'save-bindings': { revision, values, bindingContext: strictObject({ownerSessionId:identifier.nullable(),epoch:identifier.nullable(),rootSessionId:identifier.nullable()}) },
  'save-voice-prompt': {revision, values:strictObject({text:string().max(32768)})},
  'conversation-models': {}, 'save-conversation-model': {revision, values: strictObject({mode:enumeration(['auto','manual']),provider:string().min(1).max(256).nullable(),model:string().min(1).max(256).nullable()})},
  'save-settings': { revision, values }, 'save-models': { revision, values },
}
export const actionRequestCodec = codec('uiActionRequest', () => discriminatedUnion('action',
  Object.entries(actionShapes).map(([action, fields]) => strictObject({ action: literal(action), ...fields }))
).refine(value => value.action !== 'preview-tts' || Object.hasOwn(value, 'revision') === Object.hasOwn(value, 'values'), '草稿试听必须同时提供配置版本和设置')
  .refine(value => JSON.stringify(value).length <= (value.action === 'save-voice-prompt' ? 200000 : 8192), '操作数据过长'))
// The existing protocol envelope stays versioned and is decoded per action by the
// UI. Bounded JSON text avoids forwarding arbitrary runtime objects or Errors.
const actionResultCodec = codec('uiActionResult', () => string().max(4 * 1024 * 1024))
const sessionManagementCodec = codec('sessionManagementRequest', () => discriminatedUnion('operation', [
  strictObject({ operation: literal('list'), rootId: identifier.optional(), cursor: string().max(2048).optional() }),
  strictObject({ operation: literal('unhide'), rootId: identifier, id: identifier }),
  strictObject({ operation: literal('restore'), rootId: identifier, id: identifier }),
]))
const presentationCodec = codec('presentation', () => strictObject({
  shown: array(union([
    strictObject({ id: identifier, parentId: nullValue(), mode: nullValue() }),
    strictObject({ id: identifier, parentId: identifier, mode: enumeration(['one-shot', 'continuable', 'unknown']) }),
  ])),
}))
const updateVersion = string().min(1).max(128)
const updateRequestCodec = codec('updateRequest', () => discriminatedUnion('action', [
  strictObject({ action: literal('check') }),
  strictObject({ action: literal('install'), version: updateVersion }),
]))
const updateSnapshotCodec = codec('updateSnapshot', () => strictObject({
  schema: literal(1),
  revision: number().int().nonnegative().optional(),
  currentVersion: updateVersion,
  channel: enumeration(['stable', 'preview']),
  status: enumeration(['idle', 'checking', 'current', 'available', 'incompatible', 'installing', 'restart-required', 'enable-required', 'installed', 'error', 'unsupported']),
  checkedAt: string().max(64).nullable(),
  release: strictObject({
    version: updateVersion,
    announcement: string().min(1).max(600),
    url: string().startsWith('https://github.com/Emikosama/dsh-fish-voice/releases/tag/v').max(256),
  }).nullable(),
  message: string().max(512).nullable(),
  canInstall: boolean(),
}))
const existingSessionId = sessionCodec.create()
export const existingVoiceSessionSchema = strictObject({
  sessionId: existingSessionId,
  title: string().max(256).nullable(),
  availability: enumeration(['ready', 'busy', 'unavailable', 'archived']),
  unavailableReason: enumeration(['managed', 'subagent']).optional(),
  updatedAt: number().int().nonnegative().max(8.64e15).nullable().optional(),
})
const existingSessionCursor = string().min(1).max(512)
const listExistingSessionsRequest = codec('listExistingSessionsRequest', () => union([
  strictObject({ sessionId: existingSessionId }),
  strictObject({ query: string().max(128).optional(), cursor: existingSessionCursor.optional() }),
]))
const listExistingSessionsResult = codec('listExistingSessionsResult', () => strictObject({
  items: array(existingVoiceSessionSchema).max(100), nextCursor: existingSessionCursor.nullable(),
  binding: existingVoiceSessionSchema.nullable(),
}))
const setExistingSessionRequest = codec('setExistingSessionRequest', () => strictObject({
  sessionId: existingSessionId.nullable(), expectedSessionId: existingSessionId.nullable(),
}))
const setExistingSessionResult = codec('setExistingSessionResult', () => strictObject({
  binding: existingVoiceSessionSchema.nullable(),
}))
const operationLogCursor = string().min(1).max(160).regex(/^[A-Za-z0-9_-]+$/)
const operationLogPageRequest = codec('operationLogPageRequest', () => strictObject({ cursor: operationLogCursor.optional() }))
const operationLogPage = codec('operationLogPage', () => strictObject({ text: string().max(CLIENT_OPERATION_PAGE_BYTES), nextCursor: operationLogCursor.nullable() }))
const operationScope = string().uuid()
const operationScopeResult = codec('operationScopeResult', () => strictObject({ scope: operationScope }))
const recordOperationRequest = codec('recordOperationRequest', () => strictObject({
  scope: operationScope,
  events: array(strictObject({
    id: string().uuid(), at: count, action: enumeration(CLIENT_OPERATION_NAMES), source: enumeration(['user','ui']),
    phase: enumeration(['requested','finished']).optional(), result: enumeration(['ok','failed','cancelled']).optional(),
    count: count.positive().optional(),
  }).refine(event => event.action === 'ui-buffer-overflow'
    ? event.source === 'ui' && event.count !== undefined : event.count === undefined)).min(1).max(CLIENT_OPERATION_BATCH_SIZE),
}))
const recordOperationResult = codec('recordOperationResult', () => strictObject({ accepted: boolean() }))
const retryVoiceTranscriptRequest = codec('retryVoiceTranscriptRequest', () => strictObject({ id: retryId }))
const retryVoiceTranscriptResult = codec('retryVoiceTranscriptResult', () => strictObject({ accepted: boolean() }))
const requestCodecs = { retryVoiceTranscript: retryVoiceTranscriptRequest, recordClientOperations: recordOperationRequest, readOperationLog: operationLogPageRequest, action: actionRequestCodec, saveAuthorization: authorizationRequestCodec, manageSessions: sessionManagementCodec, senseVoiceAsrAction: senseVoiceAsrRequestCodec, updateAction: updateRequestCodec, listExistingVoiceSessions: listExistingSessionsRequest, setExistingVoiceSession: setExistingSessionRequest }
const resultCodecs = {
  readClientOperationScope: operationScopeResult, recordClientOperations: recordOperationResult, readOperationLog: operationLogPage,
  action: actionResultCodec, manageSessions: actionResultCodec,
  readAuthorization: authorizationCodec, saveAuthorization: authorizationCodec,
  senseVoiceAsrAction: senseVoiceAsrResultCodec, readSetup: setupCodec,
  followPresentation: presentationCodec, followModels: modelSnapshotCodec,
  followUpdates: updateSnapshotCodec, updateAction: updateSnapshotCodec,
  listExistingVoiceSessions: listExistingSessionsResult, setExistingVoiceSession: setExistingSessionResult,
  retryVoiceTranscript: retryVoiceTranscriptResult,
}
const descriptor = (method, parameters, stream = false) => ({
  id: `dsh-fish-voice#${service}/${method}`, service, namespace: service, method,
  invocation: { kind: 'direct' }, ...(stream ? { mode: 'stream' } : {}),
  parameters: parameters.map(name => ({ name, wire: name, source: 'json', codec: name === 'sessionId' ? settingsSessionCodec : requestCodecs[method] ?? requestCodec })),
  cancellation: { parameter: 'signal' }, result: resultCodecs[method] ?? (stream ? snapshotCodec : volumeCodec),
})
export const conversationRemote = { package: 'dsh-fish-voice/conversation', descriptors: [
  descriptor('action', ['sessionId', 'request']),
  descriptor('follow', ['sessionId'], true),
  descriptor('followModels', ['sessionId'], true),
  descriptor('followPresentation', [], true),
  descriptor('followUpdates', [], true),
  descriptor('updateAction', ['request']),
  descriptor('readSetup', []),
  descriptor('readAuthorization', []),
  descriptor('saveAuthorization', ['request']),
  descriptor('senseVoiceAsrAction', ['request']),
  descriptor('manageSessions', ['sessionId', 'request']),
  descriptor('readClientOperationScope', []),
  descriptor('recordClientOperations', ['request']),
  descriptor('readOperationLog', ['request']),
  descriptor('listExistingVoiceSessions', ['request']),
  descriptor('setExistingVoiceSession', ['request']),
  descriptor('retryVoiceTranscript', ['request']),
  descriptor('readVolume', ['sessionId']),
  descriptor('setVolume', ['sessionId', 'request']),
] }
