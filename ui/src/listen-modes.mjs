export const LISTEN_MODES = Object.freeze(['ptt','always','wake'])
export const modeLabel = mode => ({ptt:'pttMode',always:'alwaysMode',wake:'wakeMode'})[mode] ?? 'modeUnknown'
export const wakeLabel = wake => ['waiting','listening'].includes(wake?.state)&&wake?.streamOpen!==true ? 'unknown' : ({disabled:'wakeDisabled',starting:'wakeStarting',waiting:'wakeWaiting',listening:'wakeListening',paused:'wakePaused',error:'wakeError'})[wake?.state] ?? 'unknown'
export const validWake = value => value !== null && typeof value==='object' && !Array.isArray(value)
  && ['disabled','starting','waiting','listening','paused','error'].includes(value.state)
  && (value.deadlineAt===null||Number.isFinite(value.deadlineAt)&&value.deadlineAt>=0)
  && typeof value.streamOpen==='boolean' && ['asr-after-utterance','acoustic-after-utterance'].includes(value.detection)
export const parseWakeAliases = text => [...new Set(String(text).split(/[,，\n]/).map(value=>value.trim()).filter(Boolean))]
export const validWakeAliases = values => Array.isArray(values)&&values.length>=1&&values.length<=8&&new Set(values.map(value=>typeof value==='string'?value.toLowerCase():value)).size===values.length&&values.every(value=>typeof value==='string'&&value.trim()===value&&value.length>=2&&value.length<=24&&!/[\p{C}]/u.test(value)&&/[\p{L}\p{N}]/u.test(value))
