import test from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'

const available = Boolean(process.env.WHALE_RENDER_DEPS && process.env.WHALE_BROWSER_DEPS)
test('native sliders animate pointer, keyboard and external changes without delaying state; low motion wins', { skip: !available }, async () => {
  const require = createRequire(join(process.env.WHALE_RENDER_DEPS, 'package.json'))
  const { build } = require('esbuild'), { transform } = require('lightningcss')
  const { chromium } = createRequire(join(process.env.WHALE_BROWSER_DEPS, 'package.json'))('playwright')
  const dir = await mkdtemp(join(tmpdir(), 'whale-motion-'))
  let browser
  try {
    const entry = join(dir, 'entry.jsx'), output = join(dir, 'bundle.js')
    await writeFile(entry, `import React,{useState} from 'react';import {createRoot} from 'react-dom/client';import {MotionRange,MotionCollapse,MotionToggle} from ${JSON.stringify(fileURLToPath(new URL('../src/motion.jsx',import.meta.url)))};import panel from ${JSON.stringify(fileURLToPath(new URL('../src/panel.module.css',import.meta.url)))};
function App(){const[value,setValue]=useState(.2),[open,setOpen]=useState(true),[disabled,setDisabled]=useState(false),[motion,setMotion]=useState('spring'),[checked,setChecked]=useState(false);window.controls={setValue,setOpen,setDisabled,setMotion};return <section className={panel.floating} data-motion={motion} style={{position:'relative',width:400}}><MotionRange aria-label="音量" min="0" max="1" step="0.01" value={value} disabled={disabled} onChange={event=>{window.changes.push(event.target.value);setValue(Number(event.target.value))}}/><output>{value}</output><MotionToggle label="朗读" checked={checked} onChange={setChecked}/><MotionCollapse open={open}><input aria-label="草稿" defaultValue="preserved"/><p>Manual settings</p></MotionCollapse><details><summary>更多选项</summary><p>内容</p></details><button onClick={()=>setOpen(v=>!v)}>展开收起</button></section>};window.changes=[];createRoot(document.getElementById('root')).render(<App/>);`)
    await build({entryPoints:[entry],outfile:output,bundle:true,jsx:'automatic',nodePaths:[join(process.env.WHALE_RENDER_DEPS,'node_modules')],plugins:[{name:'css',setup(build){build.onLoad({filter:/\.module\.css$/},async({path})=>{const result=transform({filename:path,code:await readFile(path),cssModules:true});return {loader:'js',contents:`const style=document.createElement('style');style.textContent=${JSON.stringify(result.code.toString())};document.head.append(style);export default ${JSON.stringify(Object.fromEntries(Object.entries(result.exports).map(([key,item])=>[key,item.name])))}`}})}}]})
    browser=await chromium.launch({headless:true,...(process.env.WHALE_CHROMIUM_PATH?{executablePath:process.env.WHALE_CHROMIUM_PATH}:{})})
    const page=await browser.newPage(), errors=[];page.on('pageerror',error=>errors.push(error.message))
    await page.setContent('<html><body><div id="root"></div></body></html>');await page.addScriptTag({path:output})
    const slider=page.getByRole('slider',{name:'音量'}), wrapper=page.locator('[data-whale-motion-range]')
    await slider.waitFor();assert.equal(await slider.inputValue(),'0.2')
    const thumb=wrapper.locator('[aria-hidden] > span').last(), fill=wrapper.locator('[aria-hidden] > span').first()
    await slider.focus();await page.keyboard.press('ArrowRight');assert.equal(await slider.inputValue(),'0.21');assert.equal(await page.locator('output').textContent(),'0.21')
    assert.equal(await thumb.evaluate(el=>getComputedStyle(el).transitionProperty),'left, box-shadow')
    await page.keyboard.press('End');assert.equal(await slider.inputValue(),'1');await page.keyboard.press('Home');assert.equal(await slider.inputValue(),'0')
    for(let i=0;i<12;i++)await page.keyboard.press('ArrowRight')
    assert.equal(await slider.inputValue(),'0.12')
    await page.evaluate(()=>window.controls.setValue(.85));await page.waitForTimeout(240)
    assert.equal(await wrapper.evaluate(el=>el.style.getPropertyValue('--whale-range-position')),'85%')
    assert.ok(await fill.evaluate(el=>el.getBoundingClientRect().width/el.parentElement.getBoundingClientRect().width)>.84)
    const box=await slider.boundingBox();await page.mouse.move(box.x+box.width*.2,box.y+16);await page.mouse.down();await page.mouse.move(box.x+box.width*.7,box.y+16,{steps:8})
    assert.equal(await wrapper.getAttribute('data-dragging'),'true');assert.ok(Number(await slider.inputValue())>.65);await page.mouse.up();assert.equal(await wrapper.getAttribute('data-dragging'),null)
    const before=await page.evaluate(()=>window.changes.length);await page.evaluate(()=>window.controls.setDisabled(true));await page.waitForTimeout(20);await slider.press('ArrowRight',{force:true});assert.equal(await page.evaluate(()=>window.changes.length),before)
    await page.evaluate(()=>{window.controls.setDisabled(false);window.controls.setMotion('off');window.controls.setValue(.3)});await page.waitForTimeout(20)
    assert.equal(await thumb.evaluate(el=>getComputedStyle(el).transitionDuration),'0s')
    await page.evaluate(()=>window.controls.setMotion('firm'));await page.waitForTimeout(20);assert.equal(await thumb.evaluate(el=>getComputedStyle(el).transitionDuration.split(',')[0]),'0.1s')
    await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await thumb.evaluate(el=>getComputedStyle(el).transitionDuration),'0s')
    const draft=page.getByRole('textbox',{name:'草稿'});await draft.fill('draft survives');await page.getByRole('button',{name:'展开收起'}).click();assert.equal(await page.locator('[aria-hidden=true][inert]').count(),1)
    await page.getByRole('button',{name:'展开收起'}).click();assert.equal(await draft.inputValue(),'draft survives')
    await page.getByRole('switch',{name:'朗读'}).check();assert.equal(await page.getByRole('switch',{name:'朗读'}).isChecked(),true)
    await page.locator('summary').click();assert.equal(await page.locator('details').getAttribute('open'),'');await page.locator('summary').click();assert.equal(await page.locator('details').getAttribute('open'),null)
    assert.deepEqual(errors,[])
  } finally { await browser?.close();await rm(dir,{recursive:true,force:true}) }
})
