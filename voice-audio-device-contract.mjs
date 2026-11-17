/** Shared browser/backend device protocol; no native calls. */
export function validAudioDevice(value) {
  return value === null || value && typeof value === 'object' && !Array.isArray(value)
    && Object.keys(value).sort().join(',') === 'backend,id,name'
    && ['winmm','portaudio'].includes(value.backend)
    && typeof value.id === 'string' && value.id.length > 0 && value.id.length <= 1024
    && typeof value.name === 'string' && value.name.trim().length > 0 && value.name.length <= 256
    && !/[\u0000-\u001f\u007f]/.test(value.id + value.name)
}
export function validAudioInventory(value) {
  return value && value.schema === 1 && ['input','output'].every(direction => {
    const row = value[direction]
    if (!row || !['available','empty','unavailable'].includes(row.status) || !Array.isArray(row.items) || row.items.length > 128 || !(row.reason === null || typeof row.reason === 'string' && row.reason.length <= 128)) return false
    return row.items.every(item => item !== null && validAudioDevice(item)) && new Set(row.items.map(item => item.backend + ':' + item.id)).size === row.items.length
      && (row.status === 'available' ? row.items.length > 0 : row.items.length === 0)
  })
}
