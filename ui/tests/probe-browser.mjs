/** Real Chromium + production bundle; synthetic delayed capability transport only. */
import { buildFixture } from './build-fixture.mjs'
import { createRequire } from 'node:module'
import { readFile, mkdir, writeFile, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import { resolve, join } from 'node:path'
import assert from 'node:assert/strict'
const root = resolve(import.meta.dirname, '..'), source = process.env.DSH_SOURCE_ROOT
if (!source) throw new Error('DSH_SOURCE_ROOT is required')
const { chromium } = createRequire(join(process.env.WHALE_UI_BROWSER_MODULE_ROOT || root, 'package.json'))('playwright')
const temp = await buildFixture(source), out = process.env.WHALE_UI_EVIDENCE || join(root, 'test-results/probe')
await mkdir(out, {recursive:true})
const theme = (await Promise.all(['base.css','design-platform.css','corner-shape.css','focus.css'].map(name=>readFile(join(source,'packages/client/ui-theme/src/styles',name),'utf8')))).join('\n')
const html=`<!doctype html><html><head><meta charset="utf-8"><link rel="icon" href="data:,"><style>${theme}\nhtml,body,#root{margin:0;min-height:100%;font-family:var(--dsw-font-family)}.fixture-overlay{position:fixed;inset:0;z-index:20;pointer-events:none}.fixture-overlay>*{pointer-events:auto}</style></head><body><div id="root"></div><script>window.__ModuleLoader__={load:value=>{window.__whaleRegistration=value}}</script><script src="/client.js"></script><script type="module" src="/fixture.js"></script></body></html>`
const server=createServer(async(req,res)=>{const path=new URL(req.url,'http://localhost').pathname;const value=path==='/'?html:path==='/client.js'?await readFile(join(root,'../lib/client.js')):path==='/fixture.js'?await readFile(join(temp,'fixture.js')):null;if(value===null)return res.writeHead(404).end();res.writeHead(200,{'Content-Type':path==='/'?'text/html':'text/javascript'}).end(value)})
await new Promise(r=>server.listen(0,'127.0.0.1',r))
let browser,page;const checks=[],errors=[]
const check=(name,value)=>{assert.ok(value,name);checks.push(name)}
try {
 browser=await chromium.launch({headless:true,...process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}})
 page=await browser.newPage({viewport:{width:1280,height:900}});page.setDefaultTimeout(4000)
 page.on('pageerror',error=>errors.push(String(error)))
 const home=`http://127.0.0.1:${server.address().port}/?probe=hold`
 const panel=page.locator('[data-whale-panel]'), button=name=>panel.getByRole('button',{name,exact:true})
 const count=action=>page.evaluate(action=>window.fixture.calls.filter(c=>c.action===action).length,action)
 await page.goto(home);await page.waitForFunction(()=>window.fixtureReady&&window.fixture.pendingProbeCount===1)
 check('startup probe is genuinely suspended',await count('inspect-performance')===1)
 // Repeated quick-mode DOM clicks must not launch another pending model check.
 check('only the performance control is disabled while checking',await button('快 [实验性]').isDisabled())
 const fastBox=await button('快 [实验性]').boundingBox();assert.ok(fastBox)
 for(let attempt=0;attempt<3;attempt++)await page.mouse.click(fastBox.x+fastBox.width/2,fastBox.y+fastBox.height/2)
 await page.waitForTimeout(120)
 check('repeated quick-mode clicks do not duplicate the pending probe',await count('inspect-performance')===1)
 check('pending quick-mode intent never saved a setting',await count('set-performance-mode')===0)
 await button('设置').click();await page.locator('[data-whale-settings]').waitFor({state:'visible'})
 check('settings navigation remains usable during pending probe',await page.locator('[data-whale-settings]').isVisible())
 await page.waitForTimeout(1600)
 const statusBefore=await count('status');await page.evaluate(()=>window.dispatchEvent(new Event('focus')))
 await page.waitForFunction(before=>window.fixture.calls.filter(c=>c.action==='status').length>before,statusBefore)
 check('status stays readable while probe is suspended',await count('status')>statusBefore)
 await button('返回语音').click()
 await button('开始对话').click();await page.waitForFunction(()=>window.fixture.owner==='session-A')
 await button('结束对话').click();await page.waitForFunction(()=>window.fixture.owner===null)
 check('enable and disable remain actionable while probe is suspended',await count('enable')===1&&await count('disable')===1)
 const before=await page.evaluate(()=>({owner:window.fixture.owner,mode:window.fixture.performanceMode}))
 await page.evaluate(()=>window.fixture.releaseProbes());await page.waitForTimeout(150)
 check('late probe completion cannot reverse completed stop or save stale intent',await page.evaluate(before=>window.fixture.owner===before.owner&&window.fixture.performanceMode===before.mode,before))
 check('late response causes no deferred mode save',await count('set-performance-mode')===0)
 // Cancellation-resistant old reply must also be ignored after a source switch.
 await page.goto(home);await page.waitForFunction(()=>window.fixtureReady&&window.fixture.pendingProbeCount===1)
 const nextSource='session-B-with-a-long-identity-for-viewport-verification'
 await page.getByRole('button',{name:'会话 B',exact:true}).click()
 await page.waitForFunction(id=>window.fixture.calls.some(c=>c.id===id&&c.action==='status'),nextSource)
 await page.waitForFunction(id=>window.fixture.calls.some(c=>c.id===id&&c.action==='inspect-performance'),nextSource)
 check('fixture source genuinely changed and started its own probe',await page.evaluate(id=>window.fixture.pendingProbeCount===2&&window.fixture.calls.some(c=>c.id===id&&c.action==='read-settings'),nextSource))
 await button('开始对话').click();await page.waitForFunction(id=>window.fixture.owner===id,nextSource)
 await page.evaluate(()=>window.fixture.releaseProbes('old probe failed'))
 await page.waitForTimeout(150)
 check('late old-source probe failure does not undo a newer source write',await page.evaluate(id=>window.fixture.owner===id,nextSource))
 check('probe failure never takes over the page-wide error alert',!await panel.getByRole('alert').count())
 // Slow local diagnostics retain serialized writes, but cannot trap an open
 // microphone behind their read. Only explicit mute preempts the read lane;
 // the backend stop receipt, not a client-side abort, determines completion.
 for (const action of ['inspect-tts','inspect-model-compute']) {
  await page.goto(home.replace('?probe=hold',''))
  await page.waitForFunction(()=>window.fixtureReady)
  await button('开始对话').click();await page.waitForFunction(()=>window.fixture.owner==='session-A')
  await page.evaluate(action=>window.fixture.holdDiagnostic(action),action)
  await button('设置').click();await panel.locator('[data-settings-tab="models"]').click()
  if(action==='inspect-tts')await button('朗读方式').click()
  if(action==='inspect-model-compute'){
   // Entering the model page immediately triggers a silent host-owned refresh.
   check('hardware detection has no manual button',await panel.getByRole('button',{name:'检测硬件与后端',exact:true}).count()===0)
  }
  await page.waitForFunction(action=>window.fixture.pendingDiagnostics.some(item=>item.action===action),action)
  check(`${action}: diagnostic is genuinely suspended`,await page.evaluate(()=>window.fixture.pendingDiagnostics.length===1))
  const stop=panel.getByRole('button',{name:'停止语音以编辑',exact:true}).first()
  await stop.click({trial:true})
  check(`${action}: existing stop remains available`,!await stop.isDisabled())
  const stopBox=await stop.boundingBox();assert.ok(stopBox)
  await stop.click()
  await page.waitForFunction(()=>window.fixture.calls.filter(c=>c.action==='disable').length===1)
  if(action==='inspect-tts'){
   check('TTS stop control stays locked while its backend receipt is pending',await stop.isDisabled())
   for(let attempt=0;attempt<3;attempt++)await page.mouse.click(stopBox.x+stopBox.width/2,stopBox.y+stopBox.height/2)
   check('TTS stop waits for the backend cleanup receipt',await page.evaluate(()=>window.fixture.owner==='session-A'))
  }
  else {await page.waitForFunction(()=>window.fixture.owner===null);check('non-audio compute does not delay microphone stop',await page.evaluate(()=>window.fixture.pendingDiagnostics.length===1))}
  check(`${action}: only one stop is dispatched`,await count('disable')===1)
  check(`${action}: stopping does not trigger unexpected settings writes or a new grant`,await count('enable')===1&&await count('save-tts')===0&&await count('save-models')===0)
  check(`${action}: diagnostic RPC stays observable, without a global cancel`,await page.evaluate(()=>!window.fixture.pendingDiagnostics[0].cancelled)&&await count('cancel-tts')===0)
  await page.evaluate(()=>window.fixture.releaseDiagnostics())
  await page.waitForFunction(()=>window.fixture.owner===null&&window.fixture.calls.filter(c=>c.action==='disable').length===1)
  await button('返回语音').click()
  await button('开始对话').click({trial:true})
  check(`${action}: one stop completes without another grant`,await count('disable')===1&&await count('enable')===1&&await button('开始对话').isEnabled())
  check(`${action}: late successful read cannot restore microphone or show a failure`,await page.evaluate(()=>window.fixture.owner===null)&&!await panel.getByRole('alert').count())
 }
 await page.goto(home.replace('?probe=hold',''));await page.waitForFunction(()=>window.fixtureReady)
 await button('开始对话').click();await page.waitForFunction(()=>window.fixture.owner==='session-A')
 await page.evaluate(()=>window.fixture.holdDiagnostic('inspect-tts'))
 await button('设置').click();await panel.locator('[data-settings-tab="models"]').click()
 await button('朗读方式').click()
 await page.waitForFunction(()=>window.fixture.pendingDiagnostics.length===1)
 await button('返回语音').click()
 await button('结束对话').waitFor({state:'visible'})
  await button('结束对话').click({trial:true})
 check('navigation leaves bounded diagnostics live without audio mutations',await count('disable')===0&&await count('enable')===1&&await count('cancel-tts')===0&&await page.evaluate(()=>window.fixture.pendingDiagnostics.length===1&&!window.fixture.pendingDiagnostics[0].cancelled))
 check('returning home during diagnostics leaves manual mute usable',await button('结束对话').isEnabled())
 await button('结束对话').click();await page.waitForFunction(()=>window.fixture.calls.filter(c=>c.action==='disable').length===1)
 check('home mute does not claim completion before backend cleanup',await page.evaluate(()=>window.fixture.owner==='session-A'))
 await page.screenshot({path:join(out,'diagnostic-stop-pending.png')})
 await page.evaluate(()=>window.fixture.releaseDiagnostics());await page.waitForFunction(()=>window.fixture.owner===null)
 await button('开始对话').click({trial:true})
 check('Chromium reports no uncaught page errors',errors.length===0)
 await page.screenshot({path:join(out,'probe-responsive.png')})
 await writeFile(join(out,'probe-browser-report.json'),JSON.stringify({checks,errors,scope:'Real Chromium production UI; synthetic delayed transport. No model, microphone or desktop session.'},null,2))
 console.log(JSON.stringify({passed:checks.length,checks,out},null,2))
} catch(error) {if(page)await page.screenshot({path:join(out,'probe-failure.png')});await writeFile(join(out,'probe-browser-report.json'),JSON.stringify({checks,errors,error:String(error)},null,2));throw error}
finally {await browser?.close();await new Promise(r=>server.close(r));await rm(temp,{recursive:true,force:true})}
