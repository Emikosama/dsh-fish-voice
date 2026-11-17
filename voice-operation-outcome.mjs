/** Internal evidence from a read-only preflight, never inferred from an error code.
 * Do not wrap writes, playback, downloads, or post-operation status reads here.
 */
export class VoicePreflightError extends Error {
  constructor(operation, cause) {
    super(String(cause?.message ?? cause), { cause })
    this.name = 'VoicePreflightError'
    this.code = cause?.code ?? 'PREFLIGHT_REJECTED'
    this.operation = operation
  }
}
