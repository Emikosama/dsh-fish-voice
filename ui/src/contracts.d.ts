/** The UI command's deliberately narrow server snapshots. The command surface excludes transcript text; conversation data uses a separate owner-scoped typed stream. */
export interface VoiceHostCapabilities {
  configuredVisibility: 'hidden' | 'workspace' | null
  hidden: { supported: boolean; reason: string | null }
  workspace: { supported: boolean; reason: string | null }
  taskHandoff: { supported: boolean; mode: string; reason: string | null }
}
/** Cached candidates only: does not prove capture permission, health, or completeness. */
export interface VoiceInputDevices {
  status: 'unknown' | 'available' | 'empty' | 'unavailable'
  items: { index: number; name: string }[]
  observedAt: number | null
}
export interface ExistingVoiceSession {
  sessionId: string
  title: string | null
  availability: 'ready' | 'busy' | 'unavailable' | 'archived'
  updatedAt?: number | null
}
export interface VoiceUiStatus {
  existingVoiceSession?: ExistingVoiceSession | null
  existingVoiceSessionSupported?: boolean
  inferenceCompute?: { requested: 'cpu'|'auto'|'cuda'; actual: 'cpu'|'cuda'|null; engine:'sensevoice'|'whisper'; computeType:string|null; deviceIndex:number|null; fallbackReason:string|null; validated:boolean } | null
  inputDevices?: VoiceInputDevices
  voiceCapabilities?: VoiceHostCapabilities
  ownerSessionId: string | null
  enabled: boolean
  voiceControlBusy?: boolean | null
  helper: { online: boolean; lastError?: string | null }
  voiceSession?: { id?: string | null; state?: string; fullyStopped?: boolean; performance?: Record<string, unknown>; ttsResidency?: { supported: boolean; status: 'unverified' | 'resident' | 'not-resident' | 'blocked'; reason: string }; presentation?: { hidden?: boolean; requested?: 'hidden' | 'workspace' | null }; persistence?: { restored?: boolean; blocked?: boolean } } | null
  listenMode?: 'ptt' | 'always' | 'wake' | null
  turnSignals?: { available: boolean; phase: string; cancellation: { status: 'unsupported' | 'requested' | 'confirmed'; reason: string | null }; cue: { status: 'unsupported' | 'disabled' | 'requested' | 'played'; reason: string | null }; outputStartObservation: { status: 'observed' | 'unsupported'; reason: string | null } }
  capabilities?: { listenMode: boolean }
}
/** Global audio options. Grant, routes, model paths and TTS are deliberately excluded. */
export interface ConversationModelPreference {mode:'auto'|'manual';provider:string|null;model:string|null}
export interface ConversationModelCatalog {providers:{id:string;name:string;models:{id:string;name:string}[]}[]}
export interface VoicePromptPreference {text:string;mode:'agents'|'custom';customSupported:boolean;unsupportedReason:string|null}
export interface VoiceUiSettings {
  voicePrompt?: VoicePromptPreference
  conversationModel?: ConversationModelPreference
  bindingContext?: {ownerSessionId: string | null; epoch: string | null; rootSessionId: string | null}
  voiceSession?: { visibility: 'hidden' | 'workspace'; performanceMode?: 'fast' | 'balanced' | 'high' | 'compatibility' }
  voiceCapabilities?: VoiceHostCapabilities
  revision: string
  values: { device: string | number | null; pttMouse: 0 | 1 | 2; pttKeyboard?: { code: string; modifiers: ('Control' | 'Alt' | 'Shift')[] } | null; speakerVerification: { enabled: boolean }; turnSignals?: { enabled: boolean; volume: number; headphonesConfirmed: boolean; experimentalAutomaticBargeIn: boolean } }
  modelSetup?: { asr: 'sensevoice' | 'whisper'; modelCompute?: 'cpu' | 'auto' | 'cuda'; models: { sensevoiceDir: string; whisper: string; campplus: string } }
  capabilities?: { turnSignals: boolean; listenMode: boolean; pttKeyboard?: { supported: boolean; scope: 'global'; platform: 'win32'; status: 'available' | 'unsupported'; reason: string | null } }
  listenMode?: 'ptt' | 'always' | 'wake' | null
}
/** A page of plugin-verified voice roots, never a generic DSH session list. */
export interface VoiceUiCatalog {
  items: { id: string; title?: string; archived: boolean; available: boolean; canResume: boolean; reason?: string; createdAt?: number; updatedAt?: number }[]
  activeId: string | null
  nextCursor: string | null
  total?: number
}
/** Human-command adapter interface. Agent and AbortSignal come from the DSH command invocation. */
export interface WhaleVoiceUiApi<Agent> {
  status(agent: Agent): VoiceUiStatus | Promise<VoiceUiStatus>
  change(sessionId: string, enabled: boolean, signal: AbortSignal): Promise<unknown>
  changeForCaller(agent: Agent, enabled: boolean, signal: AbortSignal, expectedOwnerSessionId?: string | null, expectedExistingSessionId?: string | null): Promise<unknown>
  readConversationModels(agent: Agent, signal: AbortSignal): Promise<ConversationModelCatalog>
  updateConversationModel(request: {revision:string;values:ConversationModelPreference}, agent: Agent, signal: AbortSignal): Promise<VoiceUiSettings>
  updateVoicePrompt(request: {revision:string;values:{text:string}}, agent: Agent, signal: AbortSignal): Promise<VoiceUiSettings>
  readSettings(agent?: Agent): VoiceUiSettings | Promise<VoiceUiSettings>
  updateModelSettings(request: { revision: string; values: NonNullable<VoiceUiSettings['modelSetup']> }, agent: Agent, signal: AbortSignal): VoiceUiSettings | Promise<VoiceUiSettings>
  captureBindings(request: {operation:'begin'|'end';token?:string}, agent: Agent, signal: AbortSignal): Promise<{token:string;paused:boolean}>
  updateBindings(request: {revision:string; bindingContext: NonNullable<VoiceUiSettings['bindingContext']>; values: Pick<VoiceUiSettings['values'], 'pttMouse' | 'pttKeyboard'>}, agent: Agent, signal: AbortSignal): Promise<VoiceUiSettings>
  updateSettings(request: Pick<VoiceUiSettings, 'revision' | 'values'>, agent: Agent, signal: AbortSignal): VoiceUiSettings | Promise<VoiceUiSettings>
  setVisibility(request: { revision: string; visibility: 'hidden' | 'workspace' }, agent: Agent, signal: AbortSignal): VoiceUiSettings | Promise<VoiceUiSettings>
  setListenMode(agent: Agent, mode: 'ptt' | 'always' | 'wake', signal: AbortSignal): Promise<VoiceUiStatus>
  listVoiceSessions(agent: Agent, signal: AbortSignal, options: { cursor?: string }): VoiceUiCatalog | Promise<VoiceUiCatalog>
  newVoiceSession(agent: Agent, signal: AbortSignal): Promise<unknown>
  resumeVoiceSession(agent: Agent, rootSessionId: string, signal: AbortSignal): Promise<unknown>
}

/** Private in-memory, exact voice-root projection; not a playback receipt. */
export interface VoiceConversationSnapshot {
  retryTranscripts?: { sessionId: string; items: Array<{ id: string; text: string; state: 'busy'|'ready'|'sending'|'uncertain' }> } | null
  revision: number
  rootSessionId: string | null
  title: null
  latest: VoiceConversationItem | null
  items: VoiceConversationItem[]
  helper?: { online: boolean; listenMode: 'ptt' | 'always' | 'wake' | null }
  inputActive: boolean
  inputError?: 'device' | 'recognition' | 'no-speech' | null
  playbackConfirmed: false
}
export interface VoiceConversationItem {
  id: string
  role: 'user' | 'assistant'
  text: string
  state: 'reply' | 'interrupted' | 'delivered' | 'speech-requested' | 'speech-failed'
  at: number
}
export interface VoiceOutputVolume {
  supported: boolean
  backend: 'dsh-speak' | null
  volume: number | null
  revision: number | null
  apply: 'next-output' | null
  reason: string | null
}

export interface FishVoiceUpdateSnapshot {
  schema: 1
  revision?: number
  currentVersion: string
  channel: 'stable' | 'preview'
  status: 'idle' | 'checking' | 'current' | 'available' | 'incompatible' | 'installing' | 'restart-required' | 'enable-required' | 'installed' | 'error' | 'unsupported'
  checkedAt: string | null
  release: { version: string; announcement: string; url: string } | null
  message: string | null
  canInstall: boolean
}

export type FishVoiceUpdateRequest = { action: 'check' } | { action: 'install'; version: string }

/** Owner-only bounded current-activation archive, not persisted host chat history. */
export interface ConversationHistoryPage {
  rootSessionId: string
  generation: number
  revision: number
  scope: 'voice-session' | 'current-voice-session'
  items: Array<{ id:string; role:'user'|'assistant'; text:string; state:'reply'|'interrupted'|'delivered'|'speech-requested'|'speech-failed'; at:number }>
  nextCursor: string | null
  truncated: boolean
}
