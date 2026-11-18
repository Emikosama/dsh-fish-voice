/** Owner-UI-only native chooser on the plugin host, never a browser upload. */
import { execFile } from 'node:child_process'
import { stat } from 'node:fs/promises'
import { isAbsolute, win32 } from 'node:path'

export const PATH_KINDS = Object.freeze({ referenceAudio: 'wav', sensevoiceDir: 'directory', whisper: 'directory', campplus: 'file', sourceDirectory: 'directory' })
export function pickerCommand(kind, platform = process.platform) {
  if (!Object.hasOwn(PATH_KINDS, kind)) throw new Error('不支持的路径类型')
  const type = PATH_KINDS[kind]
  if (platform === 'win32') {
    const dialog = type === 'directory'
      ? "$d = New-Object System.Windows.Forms.FolderBrowserDialog; $d.ShowNewFolderButton = $false; $p = 'SelectedPath'"
      : "$d = New-Object System.Windows.Forms.OpenFileDialog; $d.Multiselect = $false; $d.CheckFileExists = $true; " + (type === 'wav' ? "$d.Filter = 'WAV (*.wav)|*.wav'; " : '') + "$p = 'FileName'"
    const script = "[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false); Add-Type -AssemblyName System.Windows.Forms; " + dialog + "; try { if ($d.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { [Console]::Write($d.$p) } } finally { $d.Dispose() }"
    return ['powershell.exe', ['-NoProfile', '-NonInteractive', '-STA', '-Command', script]]
  }
  if (platform === 'darwin') return ['/usr/bin/osascript', ['-e', `try\nreturn POSIX path of (choose ${type === 'directory' ? 'folder' : 'file'}${type === 'wav' ? ' of type {"wav"}' : ''} with prompt "鱼应：选择插件所在机器的路径")\non error number -128\nreturn ""\nend try`]]
  if (platform === 'linux') return ['zenity', ['--file-selection', '--title=鱼应：选择插件所在机器的路径', ...(type === 'directory' ? ['--directory'] : type === 'wav' ? ['--file-filter=WAV | *.wav *.WAV'] : [])]]
  throw new Error('当前系统没有受支持的原生路径选择器。请在支持的桌面宿主上选择文件或文件夹。')
}
export function createNativePathPicker({ run = execFile, statPath = stat, platform = process.platform } = {}) {
  let busy = false
  return async (kind, signal) => {
    const [command, args] = pickerCommand(kind, platform)
    if (signal?.aborted) throw new Error('路径选择已取消')
    if (busy) throw new Error('已有路径选择窗口，请先完成或取消。')
    busy = true
    try {
      const output = await new Promise((resolve, reject) => {
        run(command, args, { encoding: 'utf8', windowsHide: false, signal, timeout: 120000, maxBuffer: 32768 }, (error, stdout, stderr) => {
          if (error) {
            if (platform === 'linux' && error.code === 1 && !String(stderr ?? '').trim() && !error.killed && !signal?.aborted) return resolve('')
            return reject(new Error(signal?.aborted ? '路径选择已取消' : '无法打开原生选择窗口。请确认插件宿主有桌面环境（Linux 需要 zenity），然后重新选择。'))
          }
          resolve(stdout)
        })
      })
      if (signal?.aborted) throw new Error('路径选择已取消')
      const path = String(output).replace(/[\r\n]+$/, '')
      if (!path) return { path: null }
      if (path.length > 4096 || /[\u0000-\u001f\u007f]/.test(path) || !(platform === 'win32' ? win32.isAbsolute(path) && !/^[/\\](?![/\\])/.test(path) : isAbsolute(path)) || /[\\/]fakepath[\\/]/i.test(path)) throw new Error('选择器返回了无效绝对路径')
      const info = await statPath(path)
      if (PATH_KINDS[kind] === 'directory' ? !info.isDirectory() : !info.isFile()) throw new Error('请选择正确的文件或目录')
      if (PATH_KINDS[kind] === 'wav' && !/\.wav$/i.test(path)) throw new Error('参考音频必须为 WAV 文件')
      if (signal?.aborted) throw new Error('路径选择已取消')
      return { path }
    } finally { busy = false }
  }
}
export const pickNativePath = createNativePathPicker()
