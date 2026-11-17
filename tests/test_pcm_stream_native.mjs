/** Windows compilation and header rejection only. Never opens an output device. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { localTtsProcessEnvironment } from '../voice-tts-local.mjs'
test('native Windows PCM helper compiles and rejects invalid headers before device access',{skip:process.platform!=='win32',timeout:60000},async()=>{
 const script=fileURLToPath(new URL('../scripts/test_windows_pcm_stream.ps1',import.meta.url))
 const {stdout}=await promisify(execFile)('powershell.exe',['-NoLogo','-NoProfile','-NonInteractive','-ExecutionPolicy','Bypass','-File',script],{timeout:55000,windowsHide:true,env:localTtsProcessEnvironment()})
 assert.match(stdout,/PCM stream managed rejection checks passed; no output device opened/)
})
