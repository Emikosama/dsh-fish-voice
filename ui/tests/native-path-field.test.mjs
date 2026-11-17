import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
// Real React component lifecycle, native dialog transport injected (no OS UI in CI).
const require=createRequire(import.meta.url)
let build,React,renderer
try { ({build}=require('esbuild'));React=require('react');renderer=require('react-test-renderer') } catch {}
test('path field protects drafts through cancellation, draft replacement, navigation and unmount', {skip:!build}, async()=>{
 const temp=await mkdtemp(join(tmpdir(),'whale-path-test-'))
 try {
 const mock=join(temp,'primitives.jsx');await writeFile(mock,"import React from 'react';export const Button=({variant,...props})=>React.createElement('button',props);export const Input=props=>React.createElement('input',props)")
 const output=join(temp,'component.cjs')
 await build({entryPoints:[fileURLToPath(new URL('../src/path-field.jsx',import.meta.url))],outfile:output,bundle:true,format:'cjs',platform:'node',jsx:'automatic',external:['react','react/jsx-runtime'],alias:{'@deepseek-ai/dsh-client-ui-primitives':mock}})
 // Resolve the external React from the repository dependencies, not the temporary directory.
 const Module=require('node:module'),mod=new Module(output);mod.filename=output;mod.paths=modulePaths();mod._compile(await (await import('node:fs/promises')).readFile(output,'utf8'),output)
 const {PathField}=mod.exports,{act,create}=renderer
 let settle,calls=0,signal;const changes=[]
 const props={label:'WAV',value:'/old.wav',kind:'referenceAudio',sessionId:'one',onChange:v=>changes.push(v),pickPath:async(_id,_kind,s)=>{calls++;signal=s;return await new Promise(r=>settle=r)}}
 let view;await act(async()=>{view=create(React.createElement(PathField,props),{createNodeMock:()=>({closest:()=>null})})})
 const choose=()=>view.root.findAllByType('button')[0].props.onClick()
 await act(async()=>{choose();choose()});assert.equal(calls,1)
 await act(async()=>{settle('/new.wav')});assert.deepEqual(changes,['/new.wav'])
 await act(async()=>{choose()});await act(async()=>{view.root.findAllByType('button')[1].props.onClick()});assert.equal(signal.aborted,true)
 await act(async()=>{settle('/cancel.wav')});assert.equal(changes.length,1)
 await act(async()=>{choose()});await act(async()=>{view.update(React.createElement(PathField,{...props,value:'/external.wav'}))})
 await act(async()=>{settle('/late.wav')});assert.deepEqual(changes,['/new.wav']);assert.equal(view.root.findByType('input').props.readOnly,true);assert.equal(view.root.findByType('input').props.onChange,undefined)
 await act(async()=>{choose()});await act(async()=>{view.update(React.createElement(PathField,{...props,active:false}))})
 await act(async()=>{settle('/hidden.wav')});assert.equal(changes.length,1)
 await act(async()=>{view.update(React.createElement(PathField,props))});await act(async()=>{choose()});await act(async()=>{view.unmount()})
 await act(async()=>{settle('/unmounted.wav')});assert.equal(changes.length,1)
 await act(async()=>{view=create(React.createElement(PathField,{...props,kind:'campplus'}),{createNodeMock:()=>({closest:()=>null})})})
 await act(async()=>{choose()});await act(async()=>{view.root.findAllByType('button')[1].props.onClick()})
 assert.equal(signal.aborted,true);assert.deepEqual(changes,['/new.wav',''])
 await act(async()=>{settle('/late-model.onnx')});assert.equal(changes.length,2)
 await act(async()=>{view.unmount()})
 }finally{await rm(temp,{recursive:true,force:true})}
})
function modulePaths(){return [join(require.resolve('react/package.json'), '../..')]}
