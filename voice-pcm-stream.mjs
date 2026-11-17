// Opt-in PCM sink. The caller must independently verify the upstream wire format.
// No retries, no fallback device, no network decoder, no default runtime wiring.
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { localTtsProcessEnvironment } from './voice-tts-local.mjs'
export const MAX_PCM_STREAM_CHUNK = 4096
function fault(code, extra = {}) { return Object.assign(new Error(code), { code, ...extra }) }
function deferred() { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b }); promise.catch(() => {}); return {promise,resolve,reject} }
export function startPcmPlayback({ format, outputDevice = null, volume, signal, platform = process.platform, spawnProcess = spawn, timeoutMs = 150000, killGraceMs = 1500 } = {}) {
  const width = format?.encoding === 'pcm_s16le' ? 2 : format?.encoding === 'pcm_f32le' ? 4 : 0
  if (!width || format.channels !== 1 || !Number.isInteger(format.sampleRate) || format.sampleRate < 8000 || format.sampleRate > 48000 || typeof volume !== 'number' || !Number.isFinite(volume) || volume < 0 || volume > 1)
    throw fault('PCM_FORMAT_INVALID')
  if (outputDevice !== null && (outputDevice?.backend !== 'winmm' || typeof outputDevice.id !== 'string' || !outputDevice.id.trim() || outputDevice.id.length > 4095 || /[\u0000-\u001f\u007f-\u009f]/u.test(outputDevice.id))) throw fault('PCM_DEVICE_INVALID')
  if (platform !== 'win32') throw fault('PCM_PLATFORM_UNSUPPORTED')
  if (!Number.isFinite(timeoutMs) || timeoutMs < 1 || timeoutMs > 180000 || !Number.isFinite(killGraceMs) || killGraceMs < 1 || killGraceMs > 10000) throw fault('PCM_LIMIT_INVALID')
  if (signal?.aborted) throw fault('PCM_ABORTED', { possiblePlayback:false })
  const id = Buffer.from(outputDevice?.id ?? '', 'utf8')
  const header = Buffer.alloc(22 + id.length)
  header.write('WPCM'); header[4]=1; header[5]=width===2?1:2; header.writeUInt32LE(format.sampleRate,6); header.writeDoubleLE(volume,10); header.writeUInt32LE(id.length,18); id.copy(header,22)
  const ready=deferred(), result=deferred()
  let child, settled=false, stopping=null, isReady=false, completed=false, ending=false, busy=false, possiblePlayback=false, samples=0, pending=null, tail='', outputBytes=0, timer, forceTimer, uncertainTimer
  const finish = error => {
    if(settled)return; settled=true
    clearTimeout(timer); clearTimeout(forceTimer); clearTimeout(uncertainTimer); signal?.removeEventListener('abort',onAbort)
    const e=error ? Object.assign(error,{possiblePlayback}) : null
    if(e) {ready.reject(e); pending?.reject(e);result.reject(e)} else result.resolve({completed:true,possiblePlayback})
  }
  const stop = error => {
    if(settled || stopping)return
    stopping=error
    try {child.kill()} catch {}
    forceTimer=setTimeout(()=>{try{child.kill('SIGKILL')}catch{}},Math.max(1,killGraceMs/2))
    uncertainTimer=setTimeout(()=>finish(fault('PCM_TERMINATION_UNCONFIRMED',{uncertain:true})),killGraceMs)
  }
  const onAbort=()=>stop(fault('PCM_ABORTED'))
  try {child=spawnProcess('powershell.exe',['-NoLogo','-NoProfile','-NonInteractive','-ExecutionPolicy','Bypass','-File',fileURLToPath(new URL('./helper/pcm_stream_windows.ps1',import.meta.url))],{stdio:['pipe','pipe','pipe'],windowsHide:true,shell:false,env:localTtsProcessEnvironment()})}
  catch {throw fault('PCM_PROCESS_START_FAILED',{possiblePlayback:false})}
  child.on('error',()=>{if(child.pid)stop(fault('PCM_PROCESS_FAILED'));else finish(fault('PCM_PROCESS_START_FAILED'))})
  child.stdin.on('error',()=>stop(fault('PCM_PIPE_FAILED')))
  child.stderr.on('data',()=>{}) // Drain only; never retain or expose native diagnostics.
  child.stdout.on('data',chunk=>{
    if(settled || stopping)return
    outputBytes+=chunk.length
    if(outputBytes>2*1024*1024 || tail.length+chunk.length>8192)return stop(fault('PCM_PROTOCOL_INVALID'))
    tail+=chunk.toString('ascii')
    let at
    while((at=tail.indexOf('\n'))>=0){
      const line=tail.slice(0,at).replace(/\r$/u,'');tail=tail.slice(at+1)
      if(line==='ready' && !isReady && !ending){isReady=true;ready.resolve()}
      else if(line==='ack' && pending && isReady && !ending){const p=pending;pending=null;p.resolve()}
      else if(line==='completed' && ending && !completed){completed=true}
      else {stop(fault('PCM_PROTOCOL_INVALID'));return}
    }
  })
  child.on('close',code=>{
    if(stopping)return finish(stopping)
    if(code!==0 || !ending || !completed || tail.length || pending)return finish(fault('PCM_PROCESS_FAILED'))
    finish()
  })
  signal?.addEventListener('abort',onAbort,{once:true})
  timer=setTimeout(()=>stop(fault('PCM_TIMEOUT')),timeoutMs)
  if(signal?.aborted)onAbort()
  if(!stopping)try{child.stdin.write(header)}catch{stop(fault('PCM_PIPE_FAILED'))}
  function assertOpen(){if(stopping || settled || ending)throw fault('PCM_STREAM_CLOSED',{possiblePlayback})}
  return {
    ready:ready.promise, done:result.promise,
    get possiblePlayback(){return possiblePlayback},
    async write(bytes){
      assertOpen()
      if(busy)throw fault('PCM_WRITE_CONCURRENT',{possiblePlayback})
      if(!Buffer.isBuffer(bytes) || bytes.length===0 || bytes.length>MAX_PCM_STREAM_CHUNK || bytes.length%width || samples+bytes.length/width>format.sampleRate*120) {stop(fault('PCM_CHUNK_INVALID'));return result.promise}
      // Copy before awaiting: a caller must not mutate a validated buffer in flight.
      const frame=Buffer.alloc(4+bytes.length);frame.writeUInt32LE(bytes.length);bytes.copy(frame,4)
      if(width===4)for(let i=4;i<frame.length;i+=4){const v=frame.readFloatLE(i);if(!Number.isFinite(v)||v < -1 || v > 1){stop(fault('PCM_CHUNK_INVALID'));return result.promise}}
      busy=true
      try {
        await ready.promise;assertOpen()
        samples+=bytes.length/width;pending=deferred();const ack=pending.promise
        possiblePlayback=true // Sending is the irreversible boundary, not the ack.
        try{child.stdin.write(frame)}catch{stop(fault('PCM_PIPE_FAILED'))}
        await ack
      } finally {busy=false}
    },
    async end(){
      assertOpen()
      if(busy)throw fault('PCM_WRITE_CONCURRENT',{possiblePlayback})
      if(samples===0){stop(fault('PCM_EMPTY'));return result.promise}
      ending=true
      try{child.stdin.end(Buffer.alloc(4))}catch{stop(fault('PCM_PIPE_FAILED'))}
      return result.promise
    },
    cancel(){stop(fault('PCM_ABORTED'));return result.promise},
  }
}
