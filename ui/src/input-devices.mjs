/** Validate cached device enumeration without interpreting device names as markup. */
export function validInputDevices(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || !['unknown', 'available', 'empty', 'unavailable'].includes(value.status)
    || !Array.isArray(value.items) || value.items.length > 128) return false
  if (value.status === 'unknown') return value.observedAt === null && value.items.length === 0
  if (!Number.isFinite(value.observedAt) || value.observedAt < 0) return false
  if (value.status !== 'available') return value.items.length === 0
  const seen = new Set()
  return value.items.length > 0 && value.items.every(item => {
    if (!item || typeof item !== 'object' || Array.isArray(item) || !Number.isSafeInteger(item.index) || item.index < 0
      || seen.has(item.index) || typeof item.name !== 'string' || !item.name.trim() || item.name.length > 256
      || /[\u0000-\u001f\u007f]/.test(item.name)) return false
    seen.add(item.index)
    return true
  })
}

/** Default and manual values must survive even when absent from the candidate list. */
export function deviceSelection(value, inventory) {
  if (value === null || value === undefined || value === '') return { kind: 'default', value: null }
  const item = validInputDevices(inventory) && inventory.status === 'available'
    ? inventory.items.find(item => typeof value === 'number' && item.index === value) : null
  return item ? { kind: 'candidate', value: item.index } : { kind: 'manual', value }
}
