/** Fixed-manifest extraction, never general-purpose archive installation. */
import { createHash } from 'node:crypto'
import { gunzipSync, inflateRawSync } from 'node:zlib'
import { constants } from 'node:fs'
import { readFile, open, lstat, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
const digest = bytes => createHash('sha256').update(bytes).digest('hex')
const bad = () => Object.assign(new Error('运行时压缩包与核实清单不符，未执行。'), { code: 'INVALID_RUNTIME_ARCHIVE' })
const MAX_ARCHIVE = 64 * 1024 ** 2, MAX_EXPANDED = 512 * 1024 ** 2
const safeName = name => typeof name === 'string' && name.length < 240 && !name.includes('\\') && !name.includes('\0') && !name.startsWith('/') && !name.includes(':') && name.replace(/^\.\//, '').split('/').every(p => p !== '..' && p !== '.')
const runtimeInstallDir = runtime => runtime.installDir == null || runtime.kind === 'node-package' || ['cuda', 'hip', 'vulkan'].includes(runtime.backend) && runtime.installDir === `backends/${runtime.backend}`
const flatName = name => /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,140}$/.test(name)
export function validRuntimeManifest(runtime) {
  return runtime && runtimeInstallDir(runtime) && (runtime.backend == null || ['cpu','cuda','hip','vulkan'].includes(runtime.backend)) && ['tar.gz','zip'].includes(runtime.format) && flatName(runtime.file) && Number.isSafeInteger(runtime.bytes) && runtime.bytes > 0 && runtime.bytes <= MAX_ARCHIVE && /^[a-f0-9]{64}$/.test(runtime.sha256) && Array.isArray(runtime.entries) && runtime.entries.length > 0 && runtime.entries.length <= 64 && new Set(runtime.entries.map(e => e.file)).size === runtime.entries.length && runtime.entries.every(e => safeName(e.entry) && flatName(e.file) && Number.isSafeInteger(e.bytes) && e.bytes > 0 && e.bytes <= 128 * 1024 ** 2 && /^[a-f0-9]{64}$/.test(e.sha256) && (!e.executable || ['llama-tts','llama-tts.exe','llama-server','llama-server.exe'].includes(e.file))) && (runtime.kind === 'node-package' ? ['sherpa-onnx-node','sherpa-onnx-linux-x64','sherpa-onnx-win-x64'].includes(runtime.package) && runtime.installDir === `node_modules/${runtime.package}` : runtime.entries.some(e => e.file === runtime.executable && e.executable === true)) && (!runtime.bundledFiles || Array.isArray(runtime.bundledFiles) && runtime.bundledFiles.length <= 4 && runtime.bundledFiles.every(f => /^LICENSE[a-zA-Z0-9._-]*$/.test(f.file) && !runtime.entries.some(e => e.file === f.file) && typeof f.content === 'string' && Buffer.byteLength(f.content) === f.bytes && f.bytes < 32768 && digest(Buffer.from(f.content)) === f.sha256))
}
function tarEntries(archive) {
  const data = gunzipSync(archive, { maxOutputLength: MAX_EXPANDED }), entries = new Map()
  for (let offset = 0; offset + 512 <= data.length;) {
    const header = data.subarray(offset, offset + 512)
    if (header.every(b => b === 0)) break
    const string = (start, size) => header.subarray(start, start + size).toString('utf8').split('\0')[0]
    const name = [string(345, 155), string(0, 100)].filter(Boolean).join('/')
    const sizeText = string(124, 12).trim(), checksum = string(148, 8).trim()
    if (!safeName(name) || !/^[0-7]+$/.test(sizeText) || !/^[0-7]+$/.test(checksum)) throw bad()
    const size = parseInt(sizeText, 8), expected = parseInt(checksum, 8)
    let actual = 0; for (let i = 0; i < 512; i++) actual += i >= 148 && i < 156 ? 32 : header[i]
    if (actual !== expected || !Number.isSafeInteger(size) || offset + 512 + size > data.length || entries.has(name) || entries.size >= 2048) throw bad()
    // Only ordinary files are ever candidates. Links, device nodes, PAX and GNU
    // long-path records cannot change the interpretation of a later path.
    const type = header[156]
    entries.set(name, { regular: type === 0 || type === 48, bytes: size, read: () => data.subarray(offset + 512, offset + 512 + size) })
    // Capture each offset independently of the loop variable.
    const body = data.subarray(offset + 512, offset + 512 + size)
    entries.get(name).read = () => body
    offset += 512 + Math.ceil(size / 512) * 512
  }
  return entries
}
function zipEntries(data) {
  let eocd = -1
  for (let i = data.length - 22; i >= Math.max(0, data.length - 65557); i--) if (data.readUInt32LE(i) === 0x06054b50 && i + 22 + data.readUInt16LE(i + 20) === data.length) { eocd = i; break }
  if (eocd < 0 || data.readUInt16LE(eocd + 4) || data.readUInt16LE(eocd + 6)) throw bad()
  const count = data.readUInt16LE(eocd + 10), end = data.readUInt32LE(eocd + 16) + data.readUInt32LE(eocd + 12)
  if (count > 2048 || count !== data.readUInt16LE(eocd + 8) || end > eocd) throw bad()
  let cursor = data.readUInt32LE(eocd + 16), total = 0
  const entries = new Map()
  for (let index = 0; index < count; index++) {
    if (cursor + 46 > end || data.readUInt32LE(cursor) !== 0x02014b50) throw bad()
    const flags = data.readUInt16LE(cursor + 8), method = data.readUInt16LE(cursor + 10), compressed = data.readUInt32LE(cursor + 20), size = data.readUInt32LE(cursor + 24), nameLen = data.readUInt16LE(cursor + 28), extraLen = data.readUInt16LE(cursor + 30), commentLen = data.readUInt16LE(cursor + 32), local = data.readUInt32LE(cursor + 42)
    const name = data.subarray(cursor + 46, cursor + 46 + nameLen).toString('utf8'), mode = data.readUInt32LE(cursor + 38) >>> 16
    total += size
    if (!safeName(name) || entries.has(name) || flags & 1 || ![0,8].includes(method) || total > MAX_EXPANDED || cursor + 46 + nameLen + extraLen + commentLen > end || local + 30 > data.length || data.readUInt32LE(local) !== 0x04034b50) throw bad()
    const localNameLen = data.readUInt16LE(local + 26), start = local + 30 + localNameLen + data.readUInt16LE(local + 28)
    if (data.subarray(local + 30, local + 30 + localNameLen).toString('utf8') !== name || start + compressed > data.readUInt32LE(eocd + 16) || data.readUInt16LE(local + 8) !== method || data.readUInt16LE(local + 6) !== flags) throw bad()
    entries.set(name, { regular: !name.endsWith('/') && (!(mode & 0xf000) || (mode & 0xf000) === 0x8000), bytes: size, read: () => method === 0 ? data.subarray(start, start + compressed) : inflateRawSync(data.subarray(start, start + compressed), { maxOutputLength: Math.max(1, size) }) })
    cursor += 46 + nameLen + extraLen + commentLen
  }
  if (cursor !== end) throw bad()
  return entries
}
export async function extractRuntimeArchive(archivePath, destination, runtime, signal) {
  if (!validRuntimeManifest(runtime)) throw bad()
  const info = await lstat(archivePath)
  if (!info.isFile() || info.isSymbolicLink() || info.nlink !== 1 || info.size !== runtime.bytes) throw bad()
  const archive = await readFile(archivePath)
  if (archive.length !== runtime.bytes || digest(archive) !== runtime.sha256) throw bad()
  const entries = runtime.format === 'zip' ? zipEntries(archive) : tarEntries(archive)
  // Validate everything before writing even the first executable byte.
  const output = runtime.entries.map(file => {
    const entry = entries.get(file.entry)
    if (!entry?.regular || entry.bytes !== file.bytes) throw bad()
    const bytes = entry.read()
    if (bytes.length !== file.bytes || digest(bytes) !== file.sha256) throw bad()
    return { file, bytes }
  })
  for (const file of runtime.bundledFiles ?? []) output.push({ file, bytes: Buffer.from(file.content) })
  await mkdir(destination, { mode: 0o700 }).catch(e => { if (e.code !== 'EEXIST') throw e })
  const dir = await lstat(destination); if (!dir.isDirectory() || dir.isSymbolicLink()) throw bad()
  for (const { file, bytes } of output) {
    signal?.throwIfAborted()
    const path = join(destination, file.file)
    const previous = await lstat(path).catch(e => { if (e.code !== 'ENOENT') throw e; return null })
    if (previous && (!previous.isFile() || previous.isSymbolicLink() || previous.nlink !== 1)) throw bad()
    const handle = await open(path, constants.O_WRONLY | constants.O_CREAT | (constants.O_NOFOLLOW ?? 0), 0o600)
    try {
      const opened = await handle.stat()
      if (!opened.isFile() || opened.nlink !== 1 || previous && (opened.ino !== previous.ino || opened.dev !== previous.dev)) throw bad()
      await handle.truncate(0); await handle.writeFile(bytes); await handle.chmod(file.executable ? 0o700 : 0o600); await handle.sync()
    } finally { await handle.close() }
  }
}
