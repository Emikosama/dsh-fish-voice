/** Fixture-only Chromium checks for production chat view, layout and pointer code. */
import { createRequire } from 'node:module'
import { readFile,writeFile,mkdir,mkdtemp } from 'node:fs/promises'
import { createServer } from 'node:http'
import { join,resolve } from 'node:path'
import { tmpdir } from 'node:os'
import assert from 'node:assert/strict'
const root=resolve(import.meta.dirname,'../..'),deps=process.env.WHALE_RENDER_DEPS
if(!deps)throw Error('WHALE_RENDER_DEPS must contain esbuild, lightningcss, React and Playwright')
const require=createRequire(join(deps,'package.json')),{build}=require('esbuild'),{transform}=require('lightningcss'),{chromium}=require('playwright')
const out=process.env.WHALE_UI_EVIDENCE||join(root,'ui/test-results/chat'),temp=await mkdtemp(join(tmpdir(),'whale-chat-browser-'));await mkdir(out,{recursive:true})
const primitives=join(temp,'primitives.jsx');await writeFile(primitives,`import React from 'react';const native=tag=>React.forwardRef(({children,variant,...props},ref)=>React.createElement(tag,{...props,ref},children));export const Button=native('button'),Input=native('input'),MenuSurface=native('div');export const Checkbox=({label,...props})=><label><input type="checkbox" {...props}/>{label}</label>;`)
await build({entryPoints:[join(root,'ui/tests/chat-ui-fixture.jsx')],outfile:join(temp,'fixture.js'),bundle:true,format:'esm',platform:'browser',jsx:'automatic',nodePaths:[join(deps,'node_modules')],alias:{'@deepseek-ai/dsh-client-ui-primitives':primitives},plugins:[{name:'styles',setup(build){build.onLoad({filter:/\.module\.css$/},async({path})=>{const result=transform({filename:path,code:await readFile(path),cssModules:true});return{loader:'js',contents:`export default ${JSON.stringify({...Object.fromEntries(Object.entries(result.exports).map(([k,v])=>[k,v.name])),text:result.code.toString()})}`}})}}]})
const theme=`:root{--dsw-font-family:system-ui,sans-serif;--dsw-alias-border-l2:#485574;--dsw-alias-bg-layer-1:#101e3b;--dsw-alias-bg-layer-2:#243657;--dsw-alias-bg-module-platform:#203052;--dsw-alias-label-primary:#f1f4ff;--dsw-alias-label-secondary:#b7c2df;--dsw-alias-brand-primary:#a89af1;--dsw-radius-lg:12px;--dsw-radius-md:8px;--dsw-radius-sm:6px;--dsw-alias-state-warn-primary:#e4c68f;--dsw-alias-state-error-primary:#f09f9f}body{margin:0;background:#071020;color:#f1f4ff;font-family:system-ui,sans-serif}button,input,select{font:inherit;color:inherit}button{background:transparent;border:1px solid var(--dsw-alias-border-l2);border-radius:7px;padding:5px 9px;display:inline-flex;gap:4px;align-items:center;justify-content:center;cursor:pointer}button:disabled{opacity:.5}input{background:#101e3b;border:1px solid #899cdd;border-radius:5px}button svg{flex:none}#label{padding:32px;font-size:14px;color:#9daac9}`
const html=`<!doctype html><html data-ds-dark-theme><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><style>${theme}</style><div id="label">鱼应交互验收 · 合成会话 / 主机控件替身</div><div id="root"></div><script type="module" src="/fixture.js"></script></html>`
const server=createServer(async(req,res)=>res.end(req.url==='/fixture.js'?(res.setHeader('Content-Type','text/javascript'),await readFile(join(temp,'fixture.js'))):html));await new Promise(r=>server.listen(0,'127.0.0.1',r))
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']})
const page=await browser.newPage({viewport:{width:1100,height:1000}}),errors=[],checks=[];page.on('pageerror',e=>errors.push(String(e)))
const check=(name,okay)=>{assert.ok(okay,name);checks.push(name)}
try{
 await page.goto(`http://127.0.0.1:${server.address().port}`);const panel=page.locator('[data-whale-panel]');await panel.waitFor();await page.waitForTimeout(650)
 const initial=await panel.boundingBox();check('closed panel follows content instead of fixed blank height',await panel.evaluate(el=>{const home=el.querySelector('[data-home-controls]'),css=getComputedStyle(el);return Math.abs(el.getBoundingClientRect().height-home.getBoundingClientRect().height-parseFloat(css.paddingTop)-parseFloat(css.paddingBottom)-parseFloat(css.borderTopWidth)-parseFloat(css.borderBottomWidth))<2}))
 check('speed selection includes visible check icon',await page.getByRole('button',{name:'标准 [推荐]',exact:true}).locator('svg').count()===1)
 await page.screenshot({path:join(out,'01-microphone-off.png')})
 await page.getByRole('button',{name:'开麦',exact:true}).click();await page.waitForTimeout(650)
 const active=await panel.boundingBox();check('active panel removes unused speed space',active.height<initial.height)
 await page.screenshot({path:join(out,'02-microphone-on.png')})
 await page.getByRole('button',{name:'对话',exact:true}).click();await page.waitForTimeout(700)
 const list=page.locator('[data-conversation-messages]');check('recent list contains ten user-led turns',await list.locator('[data-role=user]').count()===10)
 check('user bubbles right and assistant bubbles left',await list.locator('[data-role=user]').first().evaluate(el=>getComputedStyle(el).alignSelf==='flex-end')&&await list.locator('[data-role=assistant]').first().evaluate(el=>getComputedStyle(el).alignSelf==='flex-start'))
 await page.getByRole('button',{name:'助手',exact:true}).last().click();await page.getByRole('textbox',{name:'助手称呼'}).fill('小鲸');await page.getByRole('textbox',{name:'助手称呼'}).press('Enter')
 check('renaming updates every assistant label',await page.getByRole('button',{name:'小鲸',exact:true}).count()===10);check('brand remains fixed',await panel.locator('strong').first().innerText()==='鱼应')
 check('keyboard rename returns focus to the name',await page.getByRole('button',{name:'小鲸',exact:true}).last().evaluate(el=>el===document.activeElement))
 await page.getByRole('button',{name:'小鲸',exact:true}).last().click();await page.getByRole('textbox',{name:'助手称呼'}).fill('取消此名字');await page.getByRole('textbox',{name:'助手称呼'}).press('Escape');check('Escape cancels rename',await page.getByRole('button',{name:'小鲸',exact:true}).count()===10)
 check('cancelling returns focus without closing the history',await page.getByRole('button',{name:'小鲸',exact:true}).last().evaluate(el=>el===document.activeElement))
 await page.getByRole('button',{name:'展开全部',exact:true}).click();check('all records includes more than old forty-row stream',await list.locator('[data-message-id]').count()===50)
 await list.evaluate(el=>{el.scrollTop=150;el.dispatchEvent(new Event('scroll'))});const before=await list.evaluate(el=>el.scrollTop),panelBefore=await panel.boundingBox()
 await page.evaluate(()=>window.chatFixture.append());await page.waitForTimeout(100)
 check('new messages preserve a reader scroll position',Math.abs(await list.evaluate(el=>el.scrollTop)-before)<2)
 check('new-message button appears while reading earlier records',await page.getByRole('button',{name:'2 条新消息'}).count()===1)
 const panelAfter=await panel.boundingBox();check('message refresh leaves panel position and size unchanged',JSON.stringify(panelBefore)===JSON.stringify(panelAfter))
 await page.screenshot({path:join(out,'03-all-records-scrolled.png')})
 await page.getByRole('button',{name:'2 条新消息'}).click();check('new-message button resumes following bottom',await list.evaluate(el=>el.scrollHeight-el.clientHeight-el.scrollTop<2))
 await page.getByRole('button',{name:'收起',exact:true}).click();await page.waitForTimeout(650)
 check('collapsed panel has real standby status',await page.locator('[data-voice-state=standby]').count()===1)
 await page.evaluate(()=>window.chatFixture.input(true));check('only active input animates microphone bars',await page.locator('[data-voice-state=listening]').count()===1)
 await page.screenshot({path:join(out,'04-capsule-listening.png')})
 // Real mouse input must glide toward the throw and stay inside the viewport.
 // Exact velocity scaling/decay is covered with a controlled clock in geometry-inertia.test.mjs.
 // Do not reinstate the old <40px cap: fast throws are intentionally able to reach an edge.
 const box=await panel.boundingBox();await page.mouse.move(box.x+35,box.y+20);await page.mouse.down();await page.mouse.move(box.x-140,box.y-80,{steps:8});await page.mouse.up();const release=await panel.boundingBox();check('drag moves the capsule before release glide',release.x<box.x-100)
 const trajectory=await panel.evaluate(el=>new Promise(resolve=>{const frames=[],start=performance.now();const sample=time=>{const r=el.getBoundingClientRect();frames.push({x:r.x,y:r.y,width:r.width,height:r.height,time});if(time-start<2500)requestAnimationFrame(sample);else resolve(frames)};requestAnimationFrame(sample)}))
 check('release glide follows the throw without reversing',trajectory.every((frame,i)=>{const previous=i?trajectory[i-1]:release;return frame.x<=previous.x+1&&frame.y<=previous.y+1}))
 check('fast release glide remains inside the viewport',trajectory.every(frame=>frame.x>=11.5&&frame.y>=11.5&&frame.x+frame.width<=1088.5&&frame.y+frame.height<=988.5))
 const settled=await panel.boundingBox();await page.waitForTimeout(100);const stopped=await panel.boundingBox();check('release glide settles without a lingering drift',Math.abs(stopped.x-settled.x)<.1&&Math.abs(stopped.y-settled.y)<.1)
 await page.setViewportSize({width:390,height:700});await page.waitForTimeout(700);const narrow=await panel.boundingBox();check('capsule remains inside narrow viewport',narrow.x>=12&&narrow.x+narrow.width<=378)
 await page.locator('[data-whale-reopen]').click();await page.waitForTimeout(650);await page.getByRole('button',{name:'关麦',exact:true}).click();await page.waitForTimeout(650);await page.screenshot({path:join(out,'05-narrow-off.png')})
 const newChat=page.getByRole('button',{name:'新会话',exact:true})
 check('new chat is visible and enabled on the narrow main panel',await newChat.isVisible()&&await newChat.isEnabled())
 await newChat.click()
 check('new chat submits the known muted owner without opening the microphone',await page.evaluate(()=>window.chatFixture.getState().lastNewRequest?.expectedOwnerSessionId===null&&!window.chatFixture.getState().status.enabled))
 check('new chat has visible confirmation',await page.getByText('已新建会话',{exact:true}).isVisible())
 await page.screenshot({path:join(out,'06-narrow-new-chat.png')})
 check('no runtime page errors',errors.length===0)
 await writeFile(join(out,'report.json'),JSON.stringify({scope:'Fixture only: production React views/CSS/geometry, synthetic transport and host primitive substitutes. No physical microphone or Windows audio validation.',checks,errors},null,2));console.log(JSON.stringify({checks,errors,out},null,2))
}catch(error){await page.screenshot({path:join(out,'failure.png')});throw error}finally{await browser.close();await new Promise(r=>server.close(r))}
