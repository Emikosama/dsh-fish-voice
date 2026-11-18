/** Ten turns are user-led groups, not ten individual messages. */
export function recentTurns(items, count = 10) {
  let turns = 0
  for (let index = items.length - 1; index >= 0; index--) {
    if (items[index].role === 'user' && ++turns === count) return items.slice(index)
  }
  return items
}
export function mergeConversationItems(history = [], live = []) {
  const rows = new Map(history.map(row => [row.id, row]))
  for (const row of live) rows.set(row.id, row)
  return [...rows.values()].sort((a,b) => a.at - b.at)
}
export function nearConversationBottom(node, distance = 36) {
  return node.scrollHeight - node.scrollTop - node.clientHeight <= distance
}
export function compactVoiceState({enabled, active, unknown, pending}) {
  return unknown ? 'unknown' : pending ? 'pending' : !enabled ? 'off' : active ? 'listening' : 'standby'
}

export function liveVoiceRootId(status) {
  return status?.enabled ? status.existingVoiceSession?.sessionId ?? status.voiceSession?.id ?? null : null
}
