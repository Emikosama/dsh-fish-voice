export const CLIENT_OPERATION_NAMES = Object.freeze([
  'panel-open', 'panel-close', 'panel-move', 'page-home', 'page-settings', 'page-settings-tab',
  'page-model-tab', 'page-setup', 'page-authorization', 'page-repair', 'page-session-management',
  'open-native-session', 'open-feedback', 'change-listen-mode', 'change-audio-device', 'edit-choice',
  'commit-form', 'activate-control', 'dismiss', 'details-toggle', 'keyboard-navigation',
  'ui-connect', 'ui-reconnect', 'ui-status-refresh', 'ui-request', 'ui-stream', 'ui-render-error',
  'ui-action-error', 'ui-read-recovery',
  'manage-session', 'start-voice', 'stop-voice', 'ui-buffer-overflow',
  'session-history-open', 'session-history-close', 'subagent-history-open', 'subagent-history-close',
  'show-subagents', 'show-main-sessions', 'open-native-subagent', 'new-voice-session',
  'bind-existing-session', 'unbind-existing-session', 'listen-mode-ptt', 'listen-mode-always', 'listen-mode-wake',
  'settings-audio', 'settings-interaction', 'settings-prompt', 'settings-models', 'settings-advanced', 'settings-pets',
])
export const CLIENT_OPERATION_PAGE_BYTES = 64 * 1024
export const CLIENT_OPERATION_BATCH_SIZE = 64

export const CLIENT_OPERATION_TTL_MS = 7 * 24 * 60 * 60 * 1000
