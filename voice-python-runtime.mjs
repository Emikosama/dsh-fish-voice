/** Verify and pin an existing Python. No package install, model load, or capture. */
import { spawn } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync, renameSync, rmSync } from 'node:fs'
import { dirname, join, isAbsolute, resolve, win32 } from 'node:path'
import { randomUUID } from 'node:crypto'

const PREFIX = 'WHALE_PYTHON_PROBE='
export const PYTHON_PROBE = `import sys,json,importlib,contextlib,io\nmods=json.loads(sys.argv[1])\nresult={"schema":1,"executable":sys.executable,"version":sys.version.split()[0],"modules":{}}\nfor name in mods:\n try:\n  with contextlib.redirect_stdout(io.StringIO()),contextlib.redirect_stderr(io.StringIO()):\n   importlib.import_module(name)\n  result["modules"][name]={"available":True}\n except Exception as exc:\n  result["modules"][name]={"available":False,"error":type(exc).__name__+": "+str(exc)[:200]}\nprint("${PREFIX}"+json.dumps(result,ensure_ascii=True))\n`
const optionalModules = ['parselmouth', 'faster_whisper.audio']
const fault = (code, message, cause) => Object.assign(new Error(message, { cause }), { code })
const abortError = () => fault('VOICE_PYTHON_CANCELLED', '语音运行环境检查已取消。')
const absolute = value => typeof value === 'string' && value.length > 0 && value.length <= 4096 && !/[\u0000-\u001f\u007f]/.test(value) && (isAbsolute(value) || win32.isAbsolute(value))
export function pythonRequirements(config = {}, platform = process.platform) {
  const backend = String(config.asr || 'sensevoice').toLowerCase()
  if (!['sensevoice','whisper','whisper-wasm'].includes(backend)) throw fault('VOICE_PYTHON_ASR', '语音识别后端配置无效。')
  // Windows default/stable endpoint capture and cues use native WinMM. Keep
  // PortAudio required only for paths which actually open its streams.
  const nativeSelection = value => value == null || typeof value === 'object'
  const cues = config.turnSignals ?? {}
  const output = Object.hasOwn(config, 'outputDevice') ? config.outputDevice : cues.outputDevice
  const needsSounddevice = platform !== 'win32' || !nativeSelection(config.device)
    || (cues.enabled !== false && cues.headphonesConfirmed === true && !nativeSelection(output))
  const speaker = config.speakerVerification?.enabled === true
  return [...new Set([
    ...(backend !== 'whisper-wasm' || speaker ? ['numpy'] : []),
    ...(needsSounddevice ? ['sounddevice'] : []),
    ...(backend === 'whisper' ? ['faster_whisper'] : []),
    ...(backend === 'sensevoice' || speaker ? ['sherpa_onnx'] : []),
  ])]
}
export function pythonProbeEnvironment(env = process.env) {
  const safe = { ...env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8', PYTHONDONTWRITEBYTECODE: '1', PYTHON_MANAGER_AUTOMATIC_INSTALL: 'false' }
  // Legacy launcher treats even a value of "0" as permission to install.
  delete safe.PYLAUNCHER_ALLOW_INSTALL
  delete safe.PYLAUNCHER_ALWAYS_INSTALL
  return safe
}

/** Settle only after process close; a killed-but-not-closed probe blocks reuse. */
export function runPythonProbeProcess(command, args, { signal, timeoutMs = 20_000, env = process.env, spawnProcess = spawn, closeTimeoutMs = 2000 } = {}) {
  signal?.throwIfAborted()
  return new Promise((resolveResult, reject) => {
    let child, stdout = '', stderr = '', failure = null, done = false, closeTimer
    const finish = (error, result) => { if (done) return; done = true; clearTimeout(timer); clearTimeout(closeTimer); signal?.removeEventListener('abort', cancel); error ? reject(error) : resolveResult(result) }
    const stop = error => {
      if (done || failure) return
      failure = error
      closeTimer = setTimeout(() => finish(fault('VOICE_PYTHON_PROBE_STOP_UNCONFIRMED', '运行环境检查进程退出未确认，请完整重启 DSH。')), closeTimeoutMs)
      try { child.kill('SIGKILL') } catch {}
    }
    const cancel = () => stop(typeof signal?.reason?.code === 'string' && signal.reason.code.startsWith('VOICE_PYTHON_') ? signal.reason : abortError())
    const timer = setTimeout(() => stop(fault('VOICE_PYTHON_PROBE_TIMEOUT', 'Python 依赖检查超时。')), timeoutMs)
    try { child = spawnProcess(command, args, { windowsHide: true, shell: false, stdio: ['ignore', 'pipe', 'pipe'], env: pythonProbeEnvironment(env) }) }
    catch (error) { finish(error); return }
    signal?.addEventListener('abort', cancel, { once: true })
    if (signal?.aborted) cancel()
    child.stdout.setEncoding('utf8'); child.stderr.setEncoding('utf8')
    child.stdout.on('data', text => { if (failure) return; stdout += text; if (stdout.length > 65536) stop(fault('VOICE_PYTHON_PROBE_OUTPUT', 'Python 检查输出过长。')) })
    child.stderr.on('data', text => { if (failure) return; stderr += text; if (stderr.length > 65536) stop(fault('VOICE_PYTHON_PROBE_OUTPUT', 'Python 检查输出过长。')) })
    child.on('error', error => stop(error))
    child.once('close', code => finish(failure ?? (code !== 0 ? fault('VOICE_PYTHON_PROBE_FAILED', `Python 检查失败（退出码 ${code}）：${stderr.slice(0, 240)}`) : null), { stdout, stderr }))
  })
}
export function parsePythonLauncherPaths(text) {
  return String(text).split(/\r?\n/).map(line => line.match(/(?:^|\s)((?:[A-Za-z]:\\|\\\\)[^\r\n]+?python(?:\d+(?:\.\d+)?)?\.exe)\s*$/i)?.[1]).filter(Boolean).slice(0, 16)
}
function requestedCandidates(requested, { platform, env }) {
  const pathApi = platform === 'win32' ? win32 : { join, isAbsolute, resolve }
  if (pathApi.isAbsolute(requested) || /[\\/]/.test(requested)) return [pathApi.resolve(requested)]
  const paths = String(env.PATH ?? env.Path ?? '').split(platform === 'win32' ? ';' : ':').filter(path => pathApi.isAbsolute(path))
  const names = platform === 'win32' ? [requested.endsWith('.exe') ? requested : `${requested}.exe`] : [requested]
  return paths.flatMap(path => names.map(name => pathApi.join(path, name))).filter(existsSync)
}
export async function discoverPythonCandidates(requested, { platform = process.platform, env = process.env, execute = runPythonProbeProcess, signal } = {}) {
  const automatic = /^(python(?:3)?|py)(?:\.exe)?$/i.test(requested)
  const result = requestedCandidates(requested, { platform, env })
  if (!automatic) return result
  const pathApi = platform === 'win32' ? win32 : { join, isAbsolute }
  for (const prefix of [env.VIRTUAL_ENV, env.CONDA_PREFIX]) if (prefix && pathApi.isAbsolute(prefix)) {
    if (platform === 'win32') result.push(pathApi.join(prefix, 'Scripts', 'python.exe'), pathApi.join(prefix, 'python.exe'))
    else result.push(pathApi.join(prefix, 'bin', 'python'))
  }
  if (platform === 'win32') {
    // Listing is read-only and works with both launcher generations. Never ask
    // either manager to run/install a missing version by tag.
    for (const launcher of requestedCandidates('py', { platform, env }).slice(0, 1)) {
      try { const output = await execute(launcher, ['-0p'], { signal, env, timeoutMs: 5000 }); result.push(...parsePythonLauncherPaths(output.stdout + '\n' + output.stderr)) }
      catch (error) { if (signal?.aborted || error.code === 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED') throw error }
    }
    const root = env.LOCALAPPDATA && win32.join(env.LOCALAPPDATA, 'Programs', 'Python')
    if (root) { try { for (const item of readdirSync(root, { withFileTypes: true }).slice(0, 32)) if (item.isDirectory() && /^Python\d+/i.test(item.name)) result.push(win32.join(root, item.name, 'python.exe')) } catch {} }
  } else {
    for (const path of String(env.PATH ?? '').split(':').filter(isAbsolute)) {
      try { for (const name of readdirSync(path).filter(name => /^python3(?:\.\d{1,2})?$/.test(name)).slice(0, 16)) result.push(join(path, name)) } catch {}
    }
  }
  return [...new Set(result)].filter(path => absolute(path) && !/[\\/]WindowsApps[\\/]python(?:3)?\.exe$/i.test(path) && !/[\\/]py\.exe$/i.test(path)).slice(0, 16)
}

function readBinding(path, requested) {
  try { const raw = readFileSync(path, 'utf8'); if (raw.length > 16384) return null; const value = JSON.parse(raw); return value.schema === 1 && value.requested === requested && absolute(value.executable) ? value : null } catch { return null }
}
function saveBinding(path, value) {
  const temp = `${path}.${randomUUID()}.tmp`
  try { mkdirSync(dirname(path), { recursive: true }); writeFileSync(temp, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' }); renameSync(temp, path) }
  catch (error) { throw fault('VOICE_PYTHON_BINDING_WRITE', '已找到可用 Python，但无法保存运行环境绑定；未启动录音，请检查鱼应配置目录是否可写。', error) }
  finally { try { rmSync(temp, { force: true }) } catch {} }
}

export function createPythonRuntimeResolver({ bindingPath, execute = runPythonProbeProcess, discover = discoverPythonCandidates, platform = process.platform, env = process.env, log = () => {} } = {}) {
  let active = null, blocked = null
  async function select(config, signal) {
    const requested = String(config.pythonPath || 'python'), required = pythonRequirements(config, platform)
    const optional = config.asr === 'whisper-wasm' ? [] : optionalModules
    const modules = [...new Set([...required, ...optional])], reports = [], seen = new Set()
    const probe = async executable => {
      signal.throwIfAborted()
      if (seen.has(executable)) return null
      seen.add(executable)
      try {
        const output = await execute(executable, ['-c', PYTHON_PROBE, JSON.stringify(modules)], { signal, env })
        const line = output.stdout.split(/\r?\n/).findLast(line => line.startsWith(PREFIX))
        const value = JSON.parse(line?.slice(PREFIX.length) ?? 'null')
        if (value?.schema !== 1 || !absolute(value.executable) || typeof value.version !== 'string' || value.version.length > 64 || !/^3\.\d+\.\d+(?:[a-z0-9.+-]+)?$/i.test(value.version) || !value.modules || modules.some(name => typeof value.modules[name]?.available !== 'boolean')) throw Error('Python 检查返回无效')
        const missing = required.filter(name => !value.modules[name].available)
        reports.push({ executable: value.executable, version: value.version, missing, errors: Object.fromEntries(missing.map(name => [name, String(value.modules[name].error ?? 'import failed').slice(0, 200)])) })
        log(`Python check ${value.executable} version=${value.version} missing=${missing.join(',') || 'none'}${missing.length ? ` details=${JSON.stringify(reports.at(-1).errors)}` : ''}`)
        if (missing.length) return null
        const result = { schema: 1, requested, executable: value.executable, version: value.version, required, optionalMissing: optional.filter(name => !value.modules[name].available), verifiedAt: new Date().toISOString() }
        signal.throwIfAborted()
        saveBinding(bindingPath, result)
        return result
      } catch (error) {
        if (signal.aborted || ['VOICE_PYTHON_PROBE_STOP_UNCONFIRMED', 'VOICE_PYTHON_BINDING_WRITE'].includes(error.code)) throw error
        reports.push({ executable, failure: String(error.message).slice(0, 240) }); log(`Python check failed ${executable}: ${error.message}`)
        return null
      }
    }
    const binding = readBinding(bindingPath, requested)
    if (binding) { const selected = await probe(binding.executable); if (selected) return selected }
    const candidates = await discover(requested, { platform, env, execute, signal })
    for (const candidate of candidates) { const selected = await probe(candidate); if (selected) return selected }
    const missing = reports.filter(value => value.missing?.length).map(value => `Python ${value.version} 缺少 ${value.missing.join('、')}`).join('；')
    const message = `语音运行环境不可用：${missing || '未找到可通过依赖检查的 Python'}。尚未启动麦克风。请指定已装好当前识别依赖的 Python；不会自动安装或更改系统 PATH。`
    throw Object.assign(fault('VOICE_PYTHON_DEPENDENCIES', message), { diagnostics: reports })
  }
  return {
    // Read-only reuse for stdlib device enumeration; never probe, install, load
    // ASR, or open capture merely to inspect settings. A stale path fails at
    // its caller instead of silently selecting a different interpreter.
    boundExecutable(config = {}) {
      return readBinding(bindingPath, String(config.pythonPath || 'python'))?.executable ?? null
    },
    resolve(config) {
      if (blocked) return Promise.reject(blocked)
      if (active) return active.promise
      const abort = new AbortController(), entry = { abort }
      const timeout = setTimeout(() => abort.abort(fault('VOICE_PYTHON_DISCOVERY_TIMEOUT', '语音运行环境检查超时（>60秒），尚未启动麦克风。')), 60_000)
      active = entry
      entry.promise = select(config, abort.signal).catch(error => { if (error.code === 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED') blocked = error; throw error }).finally(() => { clearTimeout(timeout); if (active === entry) active = null })
      return entry.promise
    },
    async cancel() {
      const current = active
      current?.abort.abort(abortError())
      if (current) { try { await current.promise } catch (error) { if (error.code === 'VOICE_PYTHON_PROBE_STOP_UNCONFIRMED') throw error } }
      if (blocked) throw blocked
    },
  }
}
