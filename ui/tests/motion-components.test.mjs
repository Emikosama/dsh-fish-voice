import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import vm from 'node:vm'
const deps=process.env.WHALE_RENDER_DEPS
function load(){
 const require=createRequire(join(deps,'package.json')),React=require('react'),renderer=require('react-test-renderer'),{transformSync}=require('esbuild')
 const scope={module:{exports:{}},require(id){if(id.endsWith('.css'))return {text:'styles',range:'range',input:'input',rail:'rail',fill:'fill',thumb:'thumb',collapse:'collapse',collapseInner:'collapseInner',toggle:'toggle',toggleTrack:'toggleTrack'};return require(id)}}
 vm.runInNewContext(transformSync(readFileSync(new URL('../src/motion.jsx',import.meta.url),'utf8'),{loader:'jsx',format:'cjs',jsx:'automatic'}).code,scope)
 return {...scope.module.exports,React,...renderer}
}
test('range forwards immediate native events, external updates, rapid changes and drag cleanup',{skip:!deps},()=>{
 const {MotionRange,React,create,act,motionStyles}=load();let view;const seen=[]
 const props={value:.2,min:0,max:1,step:.01,'aria-label':'音量',onChange:e=>seen.push(e)}
 act(()=>view=create(React.createElement(MotionRange,props)))
 const input=()=>view.root.findByType('input'),wrapper=()=>view.root.findByProps({'data-whale-motion-range':true})
 assert.equal(motionStyles,'styles');assert.equal(input().props.type,'range');assert.equal(input().props['aria-label'],'音量');assert.equal(input().props.onKeyDown,undefined,'native keyboard semantics are never replaced')
 for(let i=0;i<30;i++){const event={target:{value:String(i/30)}};act(()=>{input().props.onChange(event);view.update(React.createElement(MotionRange,{...props,value:i/30}))});assert.equal(seen.at(-1),event);assert.equal(input().props.value,i/30)}
 act(()=>input().props.onPointerDown({}));assert.equal(wrapper().props['data-dragging'],true)
 act(()=>input().props.onPointerCancel({}));assert.equal(wrapper().props['data-dragging'],undefined)
 act(()=>input().props.onPointerDown({}));act(()=>input().props.onLostPointerCapture({}));assert.equal(wrapper().props['data-dragging'],undefined)
 act(()=>view.update(React.createElement(MotionRange,{...props,value:.9,disabled:true})));assert.equal(wrapper().props.style['--whale-range-position'],'90%');const count=seen.length
 act(()=>input().props.onChange({target:{value:'1'}}));assert.equal(seen.length,count)
 act(()=>view.update(React.createElement(MotionRange,{...props,value:2})));assert.equal(wrapper().props.style['--whale-range-position'],'100%')
 act(()=>view.unmount())
})
test('collapse preserves the draft subtree and immediately fences closed content; switch keeps semantics',{skip:!deps},()=>{
 const {MotionCollapse,MotionToggle,React,create,act}=load();let view;let mounts=0
 function Draft(){const [value,setValue]=React.useState('draft');React.useEffect(()=>{mounts++},[]);return React.createElement('input',{value,onChange:e=>setValue(e.target.value)})}
 act(()=>view=create(React.createElement(MotionCollapse,{open:true},React.createElement(Draft))))
 act(()=>view.root.findByType('input').props.onChange({target:{value:'edited'}}))
 act(()=>view.update(React.createElement(MotionCollapse,{open:false},React.createElement(Draft))))
 assert.equal(view.root.findAllByType('div')[0].props.inert,'');assert.equal(view.root.findAllByType('div')[0].props['aria-hidden'],true)
 act(()=>view.update(React.createElement(MotionCollapse,{open:true},React.createElement(Draft))))
 assert.equal(view.root.findByType('input').props.value,'edited');assert.equal(mounts,1)
 act(()=>view.unmount());let change
 act(()=>view=create(React.createElement(MotionToggle,{label:'朗读',checked:false,onChange:v=>change=v})))
 assert.equal(view.root.findByType('input').props.role,'switch');act(()=>view.root.findByType('input').props.onChange({target:{checked:true}}));assert.equal(change,true);act(()=>view.unmount())
})
test('all motion CSS compiles and explicitly suppresses transitions in off/reduced modes',{skip:!deps},()=>{
 const require=createRequire(join(deps,'package.json')),{transform}=require('lightningcss')
 for(const name of ['motion','panel','setup']){
  const code=readFileSync(new URL('../src/'+name+'.module.css',import.meta.url));assert.doesNotThrow(()=>transform({filename:name+'.module.css',code,cssModules:true}))
  assert.match(code.toString(),/prefers-reduced-motion:reduce/);assert.match(code.toString(),/data-motion=off/)
 }
})

// New control feedback must not overwrite the existing accepted-input indicator.
test('accepted input retains mark breathing while reduced-motion still overrides it',()=>{
 const css=readFileSync(new URL('../src/panel.module.css',import.meta.url),'utf8')
 const rules=[...css.matchAll(/\.mark\[data-state=input-active\],\.markSmall\[data-state=input-active\]\s*\{([^}]+)\}/g)]
 assert.equal(rules.length,1,'one active-input rule prevents a later silent animation override')
 assert.match(rules[0][1],/animation:whaleBreathe/)
 assert.match(css,/\[data-motion=off\].floating[^}]+animation:none!important/)
 assert.match(css,/@media \(prefers-reduced-motion:reduce\)[^}]+animation:none!important/)
})

test('toggle decoration cannot intercept the native checkbox pointer target',()=>{
 const css=readFileSync(new URL('../src/motion.module.css',import.meta.url),'utf8')
 assert.match(css,/\.toggleTrack\s*\{[^}]*pointer-events:none/)
})
