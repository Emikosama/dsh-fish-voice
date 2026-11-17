import test from 'node:test'
import assert from 'node:assert/strict'
import { decodeReply } from '../src/protocol.mjs'
import { createController } from '../src/controller.mjs'
const operations=['set-performance-mode','set-visibility','set-output-volume']
const policy={schema:1,revision:'r1',items:operations.map(operation=>({operation,title:'普通设置',allowed:false,reason:null}))}
const request={id:'r1',sourceSessionId:'A',operation:'enable',title:'开麦',state:'pending',createdAt:1,expiresAt:100,humanRevision:0,request:{action:'enable'},before:{},acknowledgements:[{id:'microphone',text:'同意开麦'}],error:null,nextAction:'核对'}
const requests={schema:1,humanRevision:0,items:[request]}

test('request and permission snapshots reject malformed nested UI data',()=>{
  assert.equal(decodeReply('agent-permissions',policy),policy)
  assert.equal(decodeReply('agent-requests',requests),requests)
  for(const input of [{...policy,items:[...policy.items.slice(0,2),{...policy.items[0]}]},{...policy,items:policy.items.map(x=>({...x,allowed:'yes'}))}])assert.throws(()=>decodeReply('agent-permissions',input))
  for(const bad of [null,{...request,acknowledgements:[{id:'x',text:{bad:true}}]},{...request,before:null},{...request,error:{code:'X',message:{bad:true}}}])assert.throws(()=>decodeReply('agent-requests',{...requests,items:[bad]}))
  assert.throws(()=>decodeReply('decide-agent-request',{...requests,lastOutcome:{...request,id:'unknown'}}))
})

test('uncertain owner permission write requires readback before another write',async()=>{
  let writes=0
  const c=createController(async(id,r)=>{if(r.action==='save-agent-permissions'){writes++;throw Error('lost response')}if(r.action==='agent-permissions')return policy;throw Error('unexpected')})
  assert.equal(await c.run('A','save-agent-permissions',{revision:'r1',allowed:{}}),false)
  assert.equal(c.getSnapshot().agentPermissionUncertain,true)
  await c.run('A','save-agent-permissions',{});assert.equal(writes,1)
  assert.equal(await c.run('A','agent-permissions'),true)
  assert.equal(c.getSnapshot().agentPermissionUncertain,false)
  c.dispose()
})

test('uncertain decision never automatically repeats, and request readback unlocks controls',async()=>{
  let writes=0
  const c=createController(async(id,r)=>{if(r.action==='decide-agent-request'){writes++;throw Error('lost response')}if(r.action==='agent-requests')return requests;throw Error('unexpected')})
  await c.run('A','decide-agent-request',{id:'r1',approve:true,acknowledgements:['microphone']})
  assert.equal(c.getSnapshot().agentRequestUncertain,true)
  await c.run('A','decide-agent-request',{});assert.equal(writes,1)
  await c.run('A','agent-requests');assert.equal(c.getSnapshot().agentRequestUncertain,false)
  c.dispose()
})

test('ownership-blocked decision and readback stay readable without a false unknown result',async()=>{
  const blocked={...request,state:'blocked',error:{code:'VOICE_ROOT_OWNED_ELSEWHERE',message:'旧语音会话尚未退出。'},nextAction:'请核查并停止；若持续占用，请重启 DSH。'}
  const snapshot={...requests,items:[blocked]}
  let decisions=0
  const c=createController(async(id,r)=>{
    if(r.action==='decide-agent-request'){decisions++;return {...snapshot,lastOutcome:blocked}}
    if(r.action==='agent-requests')return snapshot
    throw Error('unexpected')
  })
  assert.equal(await c.run('A','decide-agent-request',{id:request.id,approve:true,acknowledgements:['microphone']}),true)
  assert.equal(c.getSnapshot().agentRequestUncertain,false)
  assert.equal(await c.run('A','agent-requests'),true)
  assert.equal(c.getSnapshot().agentRequests.items[0].state,'blocked')
  assert.equal(c.getSnapshot().error,null)
  assert.equal(decisions,1,'readback does not replay the blocked action')
  assert.throws(()=>decodeReply('agent-requests',{...snapshot,items:[{...blocked,state:'invented'}]}))
  c.dispose()
})


test('production explicitly injects the dotted namespace and home hides raw internals', async()=>{
 const { readFile }=await import('node:fs/promises')
 const entry=await readFile(new URL('../conversation-client.mjs',import.meta.url),'utf8')
 assert.match(entry,/ctx\.inject\(\['remote','remote\.whaleConversation'\]/)
 assert.ok(entry.indexOf('await ctx.remote.$mount') < entry.indexOf('ctx.inject'))
 const views=await readFile(new URL('../src/views.jsx',import.meta.url),'utf8')
 assert.match(views,/t\('operationUnavailable'\)/)
 assert.doesNotMatch(views,/role="alert" className=\{css.error\}>\{state.error\}/)
})
