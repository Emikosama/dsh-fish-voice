// UUIDv8 distinguishes new Whale-managed hidden roots from ordinary DSH IDs.
// The marker survives a cold session-list load before the Whale RPC connects.
const prefix = '7b94c8e3-d6a1-8'
const tagged = /^7b94c8e3-d6a1-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

export const isCompatHiddenVoiceId = id => typeof id === 'string' && tagged.test(id)
export const makeCompatHiddenVoiceId = randomUuid => prefix + randomUuid.slice(prefix.length)
