import test from 'node:test'
import assert from 'node:assert/strict'
import { createVoiceSessionManager } from '../voice-session.mjs'
import { createVoicePresentation } from '../voice-presentation.mjs'
import { isCompatHiddenVoiceId } from '../voice-presentation-id.mjs'
import { ownerSettings } from '../voice-ui-bridge.mjs'
import { mkdtempSync, rmSync, rmdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const deferred = () => { let resolve, reject; const promise = new Promise((a,b) => { resolve=a; reject=b }); return {promise,resolve,reject} }
function fixture(overrides = {}, managerOptions = {}) {
  let config = { enabled: true, handoffBackend: 'native_team', subagentApiProfile: 'source_flat_v1', ...overrides }, domainOpen=false
  const hooks=new Map();let workerSequence=0
  const registry = new Map(), persisted=new Map(), identities=new Map(), presentations=new Map(), boards=new Map(), catalogs=new Map()
  const creates=[],resumes=[],starts=[],sends=[],drained=[],disposed=[],timings=[],scopes=[],interrupts=[],flushes=[],unarchives=[]
  const registeredTools=new Map()
  const tools = { register(def){registeredTools.set(def.name,def);return()=>registeredTools.delete(def.name)},restrict(){},guard(){},get(name){return {name}},setExecutor(){} }
  const systemPrompt = {section(){},context(){}}
  const agent = id => {
    let selection={provider:'mock',model:'quality',reasoningEffort:'high'}
    const session={header:{id,cwd:'/tmp',createdAt:1000,version:4},events:[],snapshotEvents(){return this.events},append(type,data){this.events.push({type,data})}}
    const inbox={nextTurn:[],nextStep:[],clear(){for(const key of ['nextStep','nextTurn']){if(this[key].length)session.append('agent/inbox/spliced',{outcome:'canceled',removed:[...this[key]]});this[key]=[]}}}
    return {id,status:'idle',session,inbox,ctx:{get(){}},model:{current:()=>({...selection}),select:s=>{selection={...s};session.append('agent/model-selected',s)}},whenIdle:async()=>{},followup:function(m){this.last=m;this.session.events.push({type:'user',data:m})},steer:function(m){this.last=m;this.session.events.push({type:'user',data:m})}}
  }
  const owner=agent('owner');registry.set(owner.id,owner)
  const subagents={
    getProvider:()=>({inheritsParentContext:false,prepareContinuable(){},capabilities:{agentOptions:true,depthLimit:true}}),
    rootOf:a=>a,
    async startActivation(spec){starts.push(spec);spec.signal.throwIfAborted();const id=spec.childId??`worker-${starts.length}`,child=agent(id);child.model.current=()=>({...spec.agentOptions});child.session.header.parentSession=spec.parent.id;child.session.header.origin='subagent';registry.set(id,child);persisted.set(id,child);const rows=catalogs.get(spec.parent.id)??[];rows.push({kind:'child',id,parentId:spec.parent.id,depth:1,mode:'continuable',path:'worker',activity:'running'});catalogs.set(spec.parent.id,rows);return {childId:id,name:'worker',messageId:`m-${starts.length}`,result:Promise.resolve({stopReason:'completed'}),dispose:async()=>{disposed.push(id);registry.delete(id)}}},
    async sendMessage(from,id,content,options){options.signal.throwIfAborted();sends.push({from,id,content,options});if(!registry.has(id))registry.set(id,agent(id));return 'sent-id'},
    interrupt(id,authority){interrupts.push({id,authority})},
    async listDescendants(id){return catalogs.get(id)??[]},
    async drainDescendants(roots){drained.push(...roots);for(const root of roots)for(const row of catalogs.get(root.id)??[])registry.delete(row.id)},
  }
  const agentTeams={
    isEnabled:root=>boards.get(root.id)?.enabled===true,
    async setEnabled(root,enabled){const board=boards.get(root.id)??{tasks:[]};board.enabled=enabled;boards.set(root.id,board)},
    listTasks:root=>boards.get(root.id)?.tasks??[],
    getTask(root,id){const task=this.listTasks(root).find(t=>t.id===id);if(!task)throw new Error('missing native task');return task},
    async createTask(root,request){const tasks=this.listTasks(root),task={...request,id:`task-${tasks.length+1}`,revision:1,status:'pending',blockedBy:[],writeScopes:[]};tasks.push(task);return task},
    async updateTask(){throw new Error('not needed in fake')},
  }
  const llm={listProviders:()=>[{id:'voice-fast',name:'Fast'},{id:'same-provider',name:'Same'}],listModels:async provider=>[{provider,id:provider==='voice-fast'?'voice-small':'same-model',name:'Model'}],async resolveModelInfo(provider,model,signal){signal.throwIfAborted();return {reasoning:{efforts:[{id:'off'},{id:'low'},{id:'high'}]}}}}
  const exactEffort = {version:1,revision:'fixture-v1',protocol:'deepseek-messages-v1',budget:'total-output-including-reasoning',efforts:['off','low','high']}
  llm.inspectExactEffort = async () => exactEffort
  llm.prepareCall = async config => ({config,exactEffort,stream:async function*(){yield {type:'finish',reason:{kind:'stop'}}}})
  async function materialize(spec,resume){
    const id=resume?spec.resumeSessionId:spec.sessionId;spec.signal.throwIfAborted();if(registry.has(id))throw new Error('already live')
    if(resume&&!persisted.has(id))throw new Error('missing stored session')
    const voice=agent(id),scope={}
    if(resume){const old=persisted.get(id);voice.session.events=[...old.session.events];voice.inbox.nextTurn=[...old.inbox.nextTurn];voice.inbox.nextStep=[...old.inbox.nextStep]}
    const scopedTools={...tools,restrict:r=>{scope.restriction=r},guard:g=>{scope.guard=g},setExecutor:e=>{scope.executor=e}}
    const scopedPrompt={section:p=>{scope.prompt=p},context:p=>{scope.promptContext=p}},voiceCtx={get:n=>({tools:scopedTools,systemPrompt:scopedPrompt}[n])}
    voice.ctx=voiceCtx;scopes.push(scope);const commit=await spec.setup(voiceCtx,voice);spec.signal.throwIfAborted();commit?.commit();registry.set(id,voice);persisted.set(id,voice)
    return {agent:voice,dispose:async()=>{disposed.push(id);registry.delete(id);persisted.set(id,voice)}}
  }
  const agents={get:id=>registry.get(id),async create(spec){creates.push(spec);return materialize(spec,false)},async resume(spec){resumes.push(spec);return materialize(spec,true)}}
  const identityTable={entries:()=>identities.entries(),get:id=>identities.get(id),async put(id,value){identities.set(id,{...value})}}
  const catalogRows=new Map()
  const catalogTable={get:id=>catalogRows.get(id),entries:()=>catalogRows.entries(),async put(id,value){catalogRows.set(id,{...value})},async update(id,fn){const value=fn(catalogRows.get(id));catalogRows.set(id,value);return value}}
  const backendDomains=new Map()
  const storage={domain:{async open(spec){if(spec.name.startsWith('whale_handoff_')){let tables=backendDomains.get(spec.name);if(!tables){tables=new Map(Object.keys(spec.tables).map(name=>[name,new Map()]));backendDomains.set(spec.name,tables)}return {table:name=>{const rows=tables.get(name);return {get:key=>rows.get(key),entries:()=>rows.entries(),async put(key,value){spec.tables[name].valueSchema.parse(value);rows.set(key,structuredClone(value))}}},async close(){}}};if(spec.name==='whale_voice_catalog')return {table:()=>catalogTable,async close(){}};if(domainOpen)throw new Error('already-open');domainOpen=true;for(const [key,value]of identities)spec.tables.origins.valueSchema.parse(value);return {table:()=>identityTable,async close(){domainOpen=false}}}}}
  const sessionPersistence={async flush(){flushes.push(true)},async stat(id){const a=persisted.get(id);return a?{header:a.session.header}:undefined}}
  const workspaceRegistry={archivedSessionIds:[],async unarchiveSession(id){unarchives.push(id);this.archivedSessionIds=this.archivedSessionIds.filter(value=>value!==id)},sessionPresentation:{apiVersion:1,async reserve(id,value){presentations.set(id,{...value})},get:id=>presentations.get(id)}}
  const services={agents,subagents,llm,tools,systemPrompt,agentTeams,storage,sessionPersistence,workspaceRegistry,sessions:{flush:async()=>true}}
  const ctx={agents,get:name=>services[name],on(event,fn){hooks.set(event,fn);return()=>{hooks.delete(event)}}}
  const stringSchema=()=>({min(){return this},max(){return this},regex(){return this},refine(){return this},parse:v=>{if(typeof v!=='string'||!v)throw new Error('invalid record');return v}})
  const z={custom:fn=>({parse:v=>{if(!fn(v))throw new Error('invalid custom');return v}}),literal:expected=>({parse:v=>{if(v!==expected)throw new Error('invalid literal');return v}}),number:()=>({int(){return this},min(){return this},max(){return this},optional(){return {parse:v=>v}},parse:v=>v}),string:stringSchema,enum:values=>({optional(){return {parse:v=>v}},parse:v=>{if(!values.includes(v))throw new Error('invalid enum');return v}}),object:shape=>({strict(){return this},refine(){return this},parse:v=>{for(const[key,schema]of Object.entries(shape))schema.parse(v[key]);return v}})}
  const policyApi={captureDelegatedPolicyOverrides:()=>({approvalPolicy:'never'}),appendDelegatedPolicyOverrides:(session,policy)=>{session.policy=policy},NativeToolExecutor:class NativeToolExecutor{},defineDomain:s=>s,domainTable:valueSchema=>({valueSchema}),z}
  const createManager=()=>createVoiceSessionManager(ctx,{getConfig:()=>config,onTiming:m=>timings.push(m),policyApi,mintWorkerId:()=>`worker-${++workerSequence}`,...managerOptions})
  const manager=createManager()
  return {manager,createManager,ctx,owner,agent,registry,persisted,identities,presentations,boards,catalogs,services,subagents,llm,creates,resumes,starts,sends,drained,disposed,timings,scopes,interrupts,policyApi,identityTable,catalogTable,catalogRows,backendDomains,registeredTools,sessionPersistence,flushes,unarchives,setConfig:v=>{config={...config,...v}},emitEvent:(name,...args)=>hooks.get(name)?.(...args),emit:(a,type)=>hooks.get('agent/assistant-stream')?.({agent:a,frame:{type:'chunk',chunk:{type}}})}
}

test('off independent root is lazy, empty-history, resident across turns; owner unchanged', async()=>{
 const f=fixture(),before=f.owner.model.current(),info=await f.manager.prepare(f.owner,'e')
 assert.equal(f.creates.length,0);await f.manager.deliver({text:'hello',epoch:'e',voiceSessionId:'owner'})
 const spec=f.creates[0],voice=f.registry.get(info.id)
 assert.deepEqual(spec.agentOptions,{provider:'mock',model:'quality',reasoningEffort:'off'})
 for(const name of ['parentSession','origin','delegationDepth','isSeeded']) assert.equal(spec.meta?.[name],undefined)
 assert.equal(spec.seed,undefined);assert.equal(voice.last.content[0].text,'hello')
 assert.equal(voice.session.policy.approvalPolicy,'never');assert.match(f.scopes[0].prompt.text,/Do NOT plan tasks/);assert.match(f.scopes[0].prompt.text,/a brief pause is not automatically your turn/);assert.match(f.scopes[0].prompt.text,/Use the speak tool for audible replies/);assert.match(f.scopes[0].prompt.text,/plain assistant text is not audio playback/);assert.match(f.scopes[0].prompt.text,/If speak is unavailable or fails/);assert.match(f.scopes[0].prompt.text,/do not repeatedly retry the same failed call/)
 await f.manager.deliver({text:'second'});assert.equal(f.registry.get(info.id),voice);assert.equal(f.creates.length,1)
 assert.equal(f.starts.length,0);assert.deepEqual(f.owner.model.current(),before)
 await f.manager.close();assert.deepEqual(f.drained,[voice]);assert.ok(f.registry.has('owner'));assert.equal(f.manager.allows(info.id),false)
})

async function speechReminderFixture(t) {
  const receipts = []
  let authorized = true
  const f = fixture({}, { canRemindSpeech: () => authorized, onSpeechReminder: entry => receipts.push(entry) })
  t.after(() => f.manager.dispose())
  const info = await f.manager.prepare(f.owner, 'epoch')
  await f.manager.deliver({ text: 'PRIVATE synthetic microphone input' })
  const voice = f.registry.get(info.id)
  const firstInput = voice.last
  const inbox = voice.inbox
  Object.defineProperty(inbox, 'hasPending', { get() { return Boolean(inbox.nextTurn.length || inbox.nextStep.length) } })
  inbox.remove = id => {
    const index = inbox.nextTurn.findIndex(message => message.id === id)
    if (index < 0) return false
    inbox.nextTurn.splice(index, 1)
    return true
  }
  voice.followup = message => {
    inbox.nextTurn.push(message)
    f.emitEvent('agent/inbox/inserted', { agent: voice, message })
  }
  const claimed = new Map()
  const begin = async (turn, messages = [firstInput]) => {
    const decision = await f.emitEvent('agent/pre-step', { agent: voice, modelSelection: voice.model.current(), turn, step: 1, messages },
      async () => ({ kind: 'enter', messages }))
    claimed.set(turn, decision.messages)
    return decision
  }
  const emit = (type, data, surfaceOp, session = voice.session) => f.emitEvent('session/event', session, { type, data, surfaceOp })
  function finalText(turn, session = voice.session) {
    emit('step/start', { turn, step: 1 }, undefined, session)
    for (const message of claimed.get(turn)) emit('user/message', message, 'append', session)
    emit('assistant/message', { turn, step: 1, message: {
      id: 'answer-' + turn, role: 'assistant', content: [{ type: 'text', text: 'PRIVATE synthetic final answer' }],
    } }, 'append', session)
    emit('turn/end', { turn, reason: { kind: 'completed' } }, undefined, session)
  }
  return { ...f, voice, inbox, begin, emit, finalText, receipts, revoke: () => { authorized = false } }
}

test('a silent final reply queues one fixed notice to the same voice root and never repeats a reminder turn', async t => {
  const f = await speechReminderFixture(t)
  await f.begin(1)
  f.finalText(1, f.owner.session)
  assert.deepEqual(f.receipts, [])
  f.finalText(1)
  f.finalText(1)
  await Promise.resolve()
  const [notice] = f.inbox.nextTurn
  assert.equal(f.inbox.nextTurn.length, 1)
  assert.equal(notice.source.kind, 'whale-ear-speech-reminder')
  assert.match(notice.content[0].text, /当前没有调用朗读/)
  assert.doesNotMatch(JSON.stringify(notice), /PRIVATE/)
  assert.deepEqual(f.receipts, [{ action: 'queued', id: notice.id, rootSessionId: f.voice.id }])
  await f.begin(2, f.inbox.nextTurn.splice(0))
  f.finalText(2)
  await Promise.resolve()
  assert.deepEqual(f.receipts.map(entry => entry.action), ['queued', 'claimed'])
  assert.equal(f.inbox.hasPending, false)
})

for (const scenario of ['new-input-queued', 'revoked', 'cancelled', 'closed', 'new-input-races-claim']) test(`speech reminder does not supersede real input or active authorization (${scenario})`, async t => {
  const f = await speechReminderFixture(t)
  const typed = { id: 'native-owner-input', role: 'user', source: { kind: 'user', rpcId: 'typed-ground-truth' } }
  await f.begin(1)
  if (scenario === 'new-input-queued') f.voice.followup(typed)
  if (scenario === 'revoked') f.revoke()
  if (scenario === 'cancelled') f.manager.cancelSpeechOutput()
  if (scenario === 'closed') await f.manager.close()
  f.finalText(1)
  await Promise.resolve()
  if (scenario === 'new-input-races-claim') {
    const [notice] = f.inbox.nextTurn.splice(0)
    const decision = await f.begin(2, [typed, notice])
    assert.deepEqual(decision.messages, [typed])
    f.finalText(2)
    assert.deepEqual(f.receipts.map(entry => entry.action), ['queued', 'withdrawn'])
  } else assert.deepEqual(f.receipts, [])
  assert.deepEqual(f.inbox.nextTurn, scenario === 'new-input-queued' ? [typed] : [])
})

test('a native input withdraws exactly the pending reminder without touching another message', async t => {
  const f = await speechReminderFixture(t)
  await f.begin(1)
  f.finalText(1)
  await Promise.resolve()
  const [notice] = f.inbox.nextTurn
  assert.ok(notice)
  const typed = { id: 'new-user', role: 'user', source: { kind: 'user', rpcId: 'typed' } }
  f.voice.followup(typed)
  assert.deepEqual(f.receipts.map(entry => entry.action), ['queued', 'withdrawn'])
  assert.deepEqual(f.inbox.nextTurn, [typed])
})

test('a reminder waits outside native turn completion and yields to new input before idle', async t => {
  const f = await speechReminderFixture(t)
  const idle = Promise.withResolvers()
  f.voice.whenIdle = () => idle.promise
  await f.begin(1)
  f.finalText(1)
  assert.deepEqual(f.inbox.nextTurn, [])
  const typed = { id: 'intervening-input', role: 'user', source: { kind: 'user', rpcId: 'typed' } }
  f.voice.followup(typed)
  idle.resolve()
  await Promise.resolve()
  assert.deepEqual(f.inbox.nextTurn, [typed])
  assert.deepEqual(f.receipts, [])
})

test('compatibility hiding retains a real root and explicitly reveals only an owned session', async () => {
 const directory=mkdtempSync(join(tmpdir(),'whale-presentation-')), file=join(directory,'state.json')
 const presentation=createVoicePresentation(file)
 const f=fixture({}, {compatPresentation:presentation})
 delete f.services.workspaceRegistry.sessionPresentation
 let changes=0
 const detach=presentation.subscribe(()=>{changes++})
 try {
   assert.equal(f.manager.capabilities().hidden.supported,true)
   const info=await f.manager.prepare(f.owner,'first')
   assert.equal(isCompatHiddenVoiceId(info.id),true)
   await f.manager.deliver({text:'independent voice'})
   const root=f.registry.get(info.id)
   assert.equal(root.session.header.origin,undefined)
   assert.equal(root.session.header.parentSession,undefined)
   assert.equal(f.manager.status().presentation.hidden,true)
   const worker=await f.manager.delegate(root,'local fixture worker')
   const list=await f.manager.manageSessions(f.owner,{operation:'list',rootId:info.id})
   assert.ok(list.items.every(row=>row.canUnhide&&row.visibility==='hidden'))
   await assert.rejects(f.manager.manageSessions(f.owner,{operation:'unhide',rootId:info.id,id:'outside'}),{code:'VOICE_SESSION_MANAGEMENT_UNKNOWN_SESSION'})
   assert.equal((await f.manager.manageSessions(f.owner,{operation:'unhide',rootId:info.id,id:worker.sessionId})).changed,true)
   assert.equal((await f.manager.manageSessions(f.owner,{operation:'unhide',rootId:info.id,id:worker.sessionId})).changed,false)
   assert.deepEqual(createVoicePresentation(file).snapshot(),{shown:[{ id:worker.sessionId,parentId:info.id,mode:'continuable' }]})
   assert.equal(f.persisted.get(worker.sessionId).session.header.origin,'subagent')
   assert.equal((await f.manager.manageSessions(f.owner,{operation:'unhide',rootId:info.id,id:info.id})).changed,true)
   assert.equal(f.manager.status().presentation.hidden,false)
   assert.equal(changes,2)
   await f.manager.close()
   const resumed=await f.manager.prepareSelected(f.owner,info.id,'second')
   assert.equal(resumed.id,info.id)
   assert.equal(f.resumes[0].resumeSessionId,info.id)
   assert.deepEqual(f.unarchives,[])
 } finally {
   detach()
   await f.manager.dispose()
   rmSync(file,{force:true})
   rmdirSync(directory)
 }
})

test('restricted native execution blocks local and later capabilities, no worker speech grant',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id),scope=f.scopes[0]
 assert.equal(typeof scope.executor.describe,'function');assert.equal(scope.guard({agent:voice,name:'speak'}),undefined)
 assert.match(scope.guard({agent:voice,name:'shell'}),/delegate/);assert.match(scope.guard({agent:voice,name:'run_code'}),/delegate/)
 await f.manager.delegate(voice,'Plan and execute task');assert.deepEqual(f.starts[0].agentOptions,f.owner.model.current());assert.equal(f.starts[0].maxDepth,1)
 assert.equal(f.starts[0].delivery,'parent');assert.equal(f.manager.allows('worker-1'),false)
 assert.equal(scope.guard({agent:f.registry.get('worker-1'),name:'shell'}),undefined)
 await assert.rejects(f.manager.delegate({...voice},'spoof'),/exact live/);await assert.rejects(f.manager.delegate(f.owner,'bad'),/Only the dedicated/)
 await f.manager.message(voice,'worker-1','update');assert.equal(f.sends[0].id,'worker-1')
 await f.manager.close();assert.match(scope.guard({agent:voice,name:'speak'}),/no longer active/)
})

test('strict model preflight and configuration bounds fail before creation',async()=>{
 for(const config of [{reasoningEffort:'invalid'},{subagentProvider:'fork'},{maxDepth:2},{allowedSessionIds:Array(33).fill('x')},{instructions:'x'.repeat(32769)}]){
  const f=fixture(config);await assert.rejects(f.manager.prepare(f.owner,'e'));assert.equal(f.creates.length,0)
 }
 const f=fixture();f.llm.resolveModelInfo=async()=>({reasoning:{efforts:[{id:'low'}]}});const fallback=await f.manager.prepare(f.owner,'e');assert.equal(fallback.reasoningEffort,null)
 f.subagents.getProvider=()=>undefined;await assert.rejects(f.manager.prepare(f.owner,'e'),/spawn/)
})

test('approved bridge verifies live caller, voice endpoint, grant changes, bounds',async()=>{
 const f=fixture({allowedSessionIds:['peer','peer2']}),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'})
 const voice=f.registry.get(info.id),peer=f.agent('peer'),peer2=f.agent('peer2');f.registry.set('peer',peer);f.registry.set('peer2',peer2)
 await f.manager.message(voice,'owner','feedback');assert.equal(f.owner.last.source.sourceSessionId,info.id)
 await f.manager.message(voice,'peer','relay');assert.equal(peer.last.content[0].text,'relay')
 await f.manager.message(peer,info.id,'reply');assert.equal(voice.last.content[0].text,'reply')
 await assert.rejects(f.manager.message({...voice},'peer','spoof'),/exact live/);await assert.rejects(f.manager.message(peer,'peer2','bad'),/endpoint/)
 f.setConfig({allowedSessionIds:[]});await assert.rejects(f.manager.message(peer,info.id,'revoked'),/approved/)
 for(const m of [{text:'x',epoch:'old'},{text:'x',voiceSessionId:'wrong'},{text:''},{text:'x'.repeat(32769)}])await assert.rejects(f.manager.deliver(m))
 f.setConfig({reasoningEffort:'low'});assert.equal(f.manager.allows(info.id),false);await assert.rejects(f.manager.deliver({text:'x'}),/configuration changed/);await f.manager.close()
})

test('concurrent deliveries create one independent root',async()=>{
 const f=fixture();await f.manager.prepare(f.owner,'e');await Promise.all([f.manager.deliver({text:'one'}),f.manager.deliver({text:'two'})]);assert.equal(f.creates.length,1);await f.manager.close()
})

test('cache warmup uses the exact new voice root once and yields to the first real input', async () => {
  const started = deferred(), finished = deferred()
  const calls = []
  const f = fixture({}, {cacheWarmup: {supported: () => true, async run(voice, controller) {
    calls.push({voice, signal: controller.signal})
    started.resolve()
    return finished.promise
  }}})
  try {
    const info = await f.manager.prepare(f.owner, 'mic-epoch')
    f.manager.warmCache('stale-epoch')
    assert.equal(f.creates.length, 0)
    f.manager.warmCache('mic-epoch')
    f.manager.warmCache('mic-epoch')
    await started.promise
    const voice = f.registry.get(info.id)
    assert.equal(calls.length, 1)
    assert.equal(calls[0].voice, voice)
    assert.equal(voice.last, undefined)
    await f.manager.deliver({text: 'first actual input', epoch: 'mic-epoch'})
    assert.equal(calls[0].signal.aborted, true)
    assert.equal(voice.last.content[0].text, 'first actual input')
    assert.equal(f.creates.length, 1)
    await f.manager.close()
    assert.equal(f.registry.has(info.id), false)
  } finally {
    finished.resolve({status:'cancelled'})
    await f.manager.dispose()
  }
})

test('capture before scheduled cache warmup skips it, and close aborts an already running one', async () => {
  const started = deferred(), finished = deferred()
  const f = fixture({}, {cacheWarmup: {supported: () => true, async run(_voice, controller) {
    started.resolve(controller.signal)
    return finished.promise
  }}})
  try {
    await f.manager.prepare(f.owner, 'first')
    f.manager.cancelCacheWarmup()
    f.manager.warmCache('first')
    await f.manager.close()
    assert.equal(f.creates.length, 0)
    await f.manager.prepare(f.owner, 'second')
    f.manager.warmCache('second')
    const signal = await started.promise
    assert.equal(signal.aborted, false)
    await f.manager.close()
    assert.equal(signal.aborted, true)
  } finally {
    finished.resolve({status:'cancelled'})
    await f.manager.dispose()
  }
})

test('close revokes immediately, awaits raced create and disposes root',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e'),gate=deferred(),entered=deferred(),original=f.ctx.agents.create
 f.ctx.agents.create=async spec=>{const h=await original(spec);entered.resolve();await gate.promise;return h}
 const pending=f.manager.deliver({text:'race'});await entered.promise;const closed=f.manager.close();assert.equal(f.manager.allows(info.id),false);gate.resolve();await assert.rejects(pending);await closed
 assert.ok(f.disposed.includes(info.id));assert.equal(f.registry.has(info.id),false)
})

test('close aborts and waits for preflight; stale prepare cannot publish',async()=>{
 const f=fixture(),entered=deferred(),gate=deferred();let signal
 f.llm.resolveModelInfo=async(p,m,s)=>{signal=s;entered.resolve();await gate.promise;return {reasoning:{efforts:[{id:'off'}]}}}
 const pending=f.manager.prepare(f.owner,'e');await entered.promise;const closed=f.manager.close();assert.equal(signal.aborted,true);gate.resolve();await assert.rejects(pending);await closed;assert.equal(f.manager.status().id,null)
})

test('closing during persisted root restore disposes the owned root exactly once', async () => {
  const f = fixture()
  const { id } = await f.manager.prepare(f.owner, 'first')
  await f.manager.deliver({ text: 'persisted voice input' })
  await f.manager.close()
  const entered = deferred(), gate = deferred()
  const resume = f.ctx.agents.resume
  f.ctx.agents.resume = async spec => {
    const handle = await resume(spec)
    entered.resolve()
    await gate.promise
    return handle
  }
  const restoring = f.manager.prepare(f.owner, 'restore')
  await entered.promise
  const closing = f.manager.close()
  gate.resolve()
  await assert.rejects(restoring)
  await closing
  assert.deepEqual(f.disposed, [id, id])
  assert.deepEqual(f.drained.map(agent => agent.id), [id, id])
  assert.equal(f.manager.status().fullyStopped, true)
})

test('failed disposal after a restore error keeps cleanup blocked', async () => {
  const f = fixture()
  const { id } = await f.manager.prepare(f.owner, 'first')
  await f.manager.deliver({ text: 'persisted voice input' })
  await f.manager.close()
  f.services.agentTeams.setEnabled = async () => { throw new Error('restore setup failed') }
  const resume = f.ctx.agents.resume
  f.ctx.agents.resume = async spec => ({
    ...await resume(spec),
    async dispose() { throw new Error('restored root did not exit') },
  })
  await assert.rejects(f.manager.prepare(f.owner, 'restore'), /cleanup incomplete/)
  assert.equal(f.registry.has(id), true)
  assert.equal(f.manager.status().cleanupBlocked, true)
  assert.equal(f.manager.status().fullyStopped, false)
  await assert.rejects(f.manager.prepare(f.owner, 'next'), /cleanup failed/)
  assert.equal(f.resumes.length, 1)
})

test('repeat cycles and bounded content-free telemetry including immediate stream events',async()=>{
 const f=fixture(),first=await f.manager.prepare(f.owner,'one');await f.manager.close();const info=await f.manager.prepare(f.owner,'two');assert.notEqual(info.id,first.id)
 const original=f.ctx.agents.create
 f.ctx.agents.create=async spec=>{const h=await original(spec);h.agent.followup=()=>{f.emit(h.agent,'text-delta')};return h}
 await f.manager.deliver({text:'secret',traceId:'0123456789abcdef'});assert.equal(f.timings[0].deltaBeforeReceipt,true)
 f.emitEvent('agent/assistant-stream',{agent:f.registry.get(info.id),frame:{type:'chunk',chunk:{type:'usage',usage:{inputTokens:17,cacheReadTokens:256,cacheWriteTokens:64,text:'secret'}}}})
 assert.equal(f.timings.at(-1).cacheReadTokens,256)
 assert.equal(f.timings.at(-1).cacheWriteTokens,64)
 assert.ok(f.timings.at(-1).firstModelDeltaMs>=0)
 for(let n=0;n<70;n++){await f.manager.deliver({text:'secret',traceId:'not valid'});f.emit(f.registry.get(info.id),'text-delta');f.emit(f.registry.get(info.id),'tool-call-delta')}
 const status=f.manager.status();assert.equal(status.timings.length,64);assert.ok(status.timings.at(-1).firstToolCallDeltaMs>=0);assert.ok(!JSON.stringify(status).includes('secret'))
 await f.manager.dispose();await assert.rejects(f.manager.prepare(f.owner,'last'),/disposed/)
})

test('workers with origin default effort do not accidentally inherit voice off',async()=>{
 const f=fixture();f.owner.model.current=()=>({provider:'mock',model:'quality'});const info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});await f.manager.delegate(f.registry.get(info.id),'do work');assert.ok(Object.hasOwn(f.starts[0].agentOptions,'reasoningEffort'));assert.equal(f.starts[0].agentOptions.reasoningEffort,undefined);await f.manager.close()
})

test('independent voice survives origin disposal; offline origin bridge fails clearly',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id);f.registry.delete('owner');assert.equal(f.manager.allows(info.id),true);await f.manager.deliver({text:'still here'});await f.manager.delegate(voice,'do work');await assert.rejects(f.manager.message(voice,'owner','feedback'),/must be live/);await f.manager.close()
})

test('failed cleanup prevents unsafe re-enable while still revoking grant',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});f.subagents.drainDescendants=async()=>{throw new Error('cleanup failure')};await assert.rejects(f.manager.close(),/cleanup incomplete/);assert.equal(f.manager.allows(info.id),false);assert.equal(f.manager.status().cleanupBlocked,true);await assert.rejects(f.manager.prepare(f.owner,'new'),/cleanup failed/)
})


test('official host Loader imports helpers with bound receiver before any root creation',async()=>{
 const f=fixture({}, {policyApi:undefined}), imports=[]
 f.ctx.loader={marker:'host',async import(name){assert.equal(this.marker,'host');imports.push(name);return name.endsWith('dsh-subagent')?{captureDelegatedPolicyOverrides:f.policyApi.captureDelegatedPolicyOverrides,appendDelegatedPolicyOverrides:f.policyApi.appendDelegatedPolicyOverrides}:name.endsWith('dsh-tool-executor-native')?{NativeToolExecutor:f.policyApi.NativeToolExecutor}:name==='zod'?{z:f.policyApi.z}:{defineDomain:f.policyApi.defineDomain,domainTable:f.policyApi.domainTable}}}
 const info=await f.manager.prepare(f.owner,'e');assert.equal(info.reasoningEffort,'off');assert.deepEqual(imports.sort(),['@deepseek-ai/dsh-subagent','@deepseek-ai/dsh-tool-executor-native','@deepseek-ai/dsh-storage-domain','zod'].sort());assert.equal(f.creates.length,0);await f.manager.close()
})

test('host Loader errors identify the missing official executor module or export',async t=>{
 for(const mode of ['reject','missing']){
  const f=fixture({}, {policyApi:null})
  t.after(()=>f.manager.dispose())
  f.services.loader={async import(name){
   if(name==='@deepseek-ai/dsh-tool-executor-native'){
    if(mode==='reject')throw new Error('PRIVATE_MODULE_ERROR')
    return {}
   }
   if(name==='@deepseek-ai/dsh-subagent')return {captureDelegatedPolicyOverrides:f.policyApi.captureDelegatedPolicyOverrides,appendDelegatedPolicyOverrides:f.policyApi.appendDelegatedPolicyOverrides}
   if(name==='zod')return {z:f.policyApi.z}
   return {defineDomain:f.policyApi.defineDomain,domainTable:f.policyApi.domainTable}
  }}
  await assert.rejects(f.manager.preflightHost(),error=>{
   assert.equal(error.code,'VOICE_HOST_CAPABILITY_MISMATCH')
   assert.equal(error.stage,'host_capability_preflight')
   assert.deepEqual(error.missingCapabilities,[mode==='reject'?'@deepseek-ai/dsh-tool-executor-native':'@deepseek-ai/dsh-tool-executor-native.NativeToolExecutor'])
   assert.doesNotMatch(error.message,/PRIVATE_MODULE_ERROR/)
   return true
  })
  assert.equal(f.creates.length,0)
  assert.equal(f.manager.status().id,null)
 }
})

test('voice control rejects forged/foreign callers and unrelated targets',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id);await f.manager.delegate(voice,'task')
 for(const id of [info.id,'owner','unrelated'])await assert.rejects(f.manager.control(voice,id,'stop'),/exact worker owned/)
 await assert.rejects(f.manager.control({...voice},'worker-1','stop'),/exact live/);await assert.rejects(f.manager.control(f.owner,'worker-1','stop'),/current voice root/)
 await assert.rejects(f.manager.control(voice,'worker-1','delete'),/status, steer, resume, or stop/);await assert.rejects(f.manager.control(voice,'worker-1','status','extra'),/Status does not accept/);assert.equal(f.interrupts.length,0)
 await f.manager.close()
})

test('correction uses official sendMessage including cold owned workers; acceptance is not applied',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id);await f.manager.delegate(voice,'task');f.registry.delete('worker-1')
 const result=await f.manager.control(voice,'worker-1','steer','User correction: focus on latency')
 assert.equal(result.accepted,true);assert.equal(result.correctionApplied,'not_verified');assert.equal(f.sends[0].from,voice);assert.equal(f.sends[0].content[0].text,'User correction: focus on latency');assert.equal(result.externalEffects,'not_verified_or_rolled_back');await f.manager.close()
})

test('stop reports pending cancellation until actual idle, never guarantees external rollback',async()=>{
 const f=fixture({}, {controlWaitMs:1}),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id);await f.manager.delegate(voice,'task');const worker=f.registry.get('worker-1');worker.status='running';worker.whenIdle=()=>new Promise(()=>{})
 assert.equal((await f.manager.control(voice,'worker-1','status')).state,'running')
 const pending=await f.manager.control(voice,'worker-1','stop','The user asked to stop this worker');assert.equal(pending.state,'cancellation_requested');assert.equal(pending.cancellationRequested,true);assert.equal(pending.pendingWorkMayRemain,true);assert.equal(pending.externalEffects,'not_verified_or_rolled_back');assert.equal(f.interrupts[0].authority.agent,voice)
 worker.whenIdle=async()=>{worker.status='idle'};assert.equal((await f.manager.control(voice,'worker-1','stop','The user asked to stop this worker')).state,'idle')
 f.registry.delete('worker-1');const finished=await f.manager.control(voice,'worker-1','stop','The user asked to stop this worker');assert.equal(finished.state,'not_running');assert.equal(finished.cancellationRequested,false);assert.equal(finished.scope,'agent_loop');await f.manager.close()
})

test('unsettled maintenance, failed idle observation and aborted control stay truthful',async()=>{
 const f=fixture({}, {controlWaitMs:1}),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id);await f.manager.delegate(voice,'task');const worker=f.registry.get('worker-1');worker.whenIdle=()=>new Promise(()=>{})
 assert.equal((await f.manager.control(voice,'worker-1','stop','The user asked to stop this worker')).state,'cancellation_requested')
 worker.whenIdle=async()=>{throw new Error('observation failed')};assert.equal((await f.manager.control(voice,'worker-1','stop','The user asked to stop this worker')).state,'unknown')
 const controller=new AbortController();controller.abort();const count=f.interrupts.length;await assert.rejects(f.manager.control(voice,'worker-1','stop','The user asked to stop this worker',controller.signal));assert.equal(f.interrupts.length,count);await f.manager.close()
})

test('stop requires bounded user instruction context without pretending to prove intent',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id);await f.manager.delegate(voice,'task')
 for(const instruction of [undefined,'','   ','x'.repeat(32769)])await assert.rejects(f.manager.control(voice,'worker-1','stop',instruction),/user stop instruction/)
 assert.equal(f.interrupts.length,0)
 const result=await f.manager.control(voice,'worker-1','stop','用户说这个方向不对，先停下。');assert.equal(result.state,'idle');assert.equal(f.interrupts.length,1);assert.equal(Object.hasOwn(result,'userIntentVerified'),false)
 await f.manager.close()
})

test('same origin restores durable identity and tasks without replaying stale input or restarting workers',async()=>{
 const f=fixture(),first=await f.manager.prepare(f.owner,'first');await f.manager.deliver({text:'private first transcript'});const voice=f.registry.get(first.id)
 const delegated=await f.manager.delegate(voice,'persist this task');const task=f.boards.get(first.id).tasks[0];task.ownerId=delegated.sessionId;task.status='in_progress'
 await f.manager.dispose();f.persisted.get(first.id).inbox.nextTurn.push({id:'old-audio',content:[{type:'text',text:'never replay'}]})
 const restored=f.createManager(),info=await restored.prepare(f.owner,'fresh');assert.equal(info.id,first.id);assert.equal(info.restored,true);assert.equal(f.resumes.length,1);assert.equal(f.creates.length,1)
 assert.equal(f.starts.length,1);assert.equal(f.sends.length,0);assert.equal(f.registry.get(first.id).last,undefined)
 assert.equal(restored.status().restore.withdrawnPendingInputCount,1);assert.equal(restored.status().restore.historyPreserved,true);assert.equal(restored.status().restore.automaticTaskRestart,false)
 assert.ok(f.registry.get(first.id).session.events.some(e=>e.type==='user'&&e.data.content[0].text==='private first transcript'))
 assert.ok(f.registry.get(first.id).session.events.some(e=>e.type==='agent/inbox/spliced'&&e.data.outcome==='canceled'))
 const snapshot=await restored.handoffStatus(f.owner);assert.equal(snapshot.tasks[0].taskId,delegated.taskId);assert.equal(snapshot.tasks[0].status,'in_progress');assert.equal(snapshot.tasks[0].runtimeState,'not_running');assert.equal(snapshot.tasks[0].ownerVerifiedInVoiceTree,true)
 await assert.rejects(restored.deliver({text:'stale audio',epoch:'first'}));assert.equal(f.registry.get(first.id).last,undefined)
 await restored.deliver({text:'fresh user request',epoch:'fresh'});assert.equal(f.registry.get(first.id).last.content[0].text,'fresh user request')
 await restored.dispose()
})

function olderHostFixture() {
 const f=fixture({visibility:'workspace'},{policyApi:null,controlWaitMs:0}),imports=[]
 f.services.tools.setExecutor=undefined
 f.services.loader={async import(name){
  imports.push(name)
  if(name==='@deepseek-ai/dsh-storage-domain')return {defineDomain:f.policyApi.defineDomain,domainTable:f.policyApi.domainTable}
  if(name==='zod')return {z:f.policyApi.z}
  if(name==='@deepseek-ai/dsh-subagent')return {captureDelegatedPolicyOverrides:f.policyApi.captureDelegatedPolicyOverrides,appendDelegatedPolicyOverrides:f.policyApi.appendDelegatedPolicyOverrides}
  throw Object.assign(new Error(`Cannot find package ${name}`),{code:'ERR_MODULE_NOT_FOUND'})
 }}
 return {...f,imports}
}

test('older host rejects independent preparation before loading packages', async t => {
 const f=olderHostFixture()
 t.after(()=>f.manager.dispose())
 await assert.rejects(f.manager.prepare(f.owner,'old-host'),error=>{
  assert.equal(error.code,'VOICE_HOST_CAPABILITY_MISMATCH')
  assert.ok(error.missingCapabilities.includes('tools.setExecutor'))
  assert.match(error.message,/0\.2\.2-rc\.1.*0\.2\.2-rc\.3/)
  return true
 })
 assert.deepEqual(f.imports,[])
 assert.equal(f.creates.length,0)
 assert.equal(f.resumes.length,0)
 assert.deepEqual(f.drained,[])
})

test('older host verifies idle stop and can list binding exclusions without an executor', async t => {
 const f=olderHostFixture()
 t.after(()=>f.manager.dispose())
 await f.manager.close()
 await f.manager.verifyStopped()
 await f.manager.verifyStopped()
 assert.equal(f.manager.status().recovery.stopVerified,true)
 assert.deepEqual(f.imports.sort(),['@deepseek-ai/dsh-storage-domain','zod'])
 assert.deepEqual([...await f.manager.managedRootIds()].filter(Boolean),[])
 assert.ok(!f.imports.includes('@deepseek-ai/dsh-tool-executor-native'))
})

test('older host detects a registered root that is still live without loading an executor', async t => {
 const f=olderHostFixture(),root=f.agent('registered-root')
 t.after(()=>f.manager.dispose())
 f.identities.set('owner',{originSessionId:'owner',rootSessionId:root.id,lastEpoch:'old-epoch',policyFingerprint:'a'.repeat(64),visibility:'workspace'})
 f.registry.set(root.id,root)
 await assert.rejects(f.manager.verifyStopped(),{code:'VOICE_ROOT_OWNED_ELSEWHERE'})
 assert.equal(f.manager.status().recovery.stopVerified,false)
 assert.equal(f.registry.get(root.id),root)
 assert.deepEqual(f.drained,[])
 f.registry.delete(root.id)
 await f.manager.verifyStopped()
 assert.equal(f.manager.status().recovery.stopVerified,true)
 assert.ok(!f.imports.includes('@deepseek-ai/dsh-tool-executor-native'))
})

test('exact origins never share voice history or private handoff snapshots',async()=>{
 const f=fixture(),first=await f.manager.prepare(f.owner,'first');await f.manager.deliver({text:'secret'});await f.manager.delegate(f.registry.get(first.id),'private task');await f.manager.close()
 const other=f.agent('different-origin');f.registry.set(other.id,other);const second=await f.manager.prepare(other,'second');assert.notEqual(second.id,first.id);assert.equal(second.restored,false)
 assert.deepEqual((await f.manager.handoffStatus(other)).tasks,[]);await assert.rejects(f.manager.handoffStatus(f.owner),/only to this voice root/);await assert.rejects(f.manager.handoffStatus({...other}),/exact live/)
 await f.manager.deliver({text:'other conversation'});assert.equal(f.registry.get(second.id).session.events.some(e=>e.data?.content?.[0]?.text==='secret'),false)
 assert.equal(f.identities.get('owner').rootSessionId,first.id);assert.equal(f.identities.get('different-origin').rootSessionId,second.id);await f.manager.dispose()
})

test('stale persisted epoch and changed policy block reopening instead of copying history',async()=>{
 const f=fixture(),first=await f.manager.prepare(f.owner,'first');await f.manager.deliver({text:'saved'});await f.manager.close()
 await assert.rejects(f.manager.prepare(f.owner,'first'),/fresh voice epoch/)
 f.policyApi.captureDelegatedPolicyOverrides=()=>({approvalPolicy:'never',sandboxMode:'read-only'})
 await assert.rejects(f.manager.prepare(f.owner,'new'),/permission scope changed/);assert.equal(f.resumes.length,0);assert.equal(f.creates.length,1);assert.equal(f.identities.get('owner').rootSessionId,first.id);await f.manager.dispose()
})

test('missing native persistence, Teams or hidden capability refuses grant; explicit workspace is truthful',async()=>{
 for(const name of ['agentTeams','storage','sessionPersistence','workspaceRegistry']){
  const f=fixture();f.services[name]=undefined;await assert.rejects(f.manager.prepare(f.owner,'e'));assert.equal(f.manager.status().enabled,false);assert.equal(f.creates.length,0);await f.manager.dispose()
 }
 const f=fixture({visibility:'workspace'});f.services.workspaceRegistry={archivedSessionIds:[]};const info=await f.manager.prepare(f.owner,'e');assert.equal(f.manager.status().presentation.hidden,false);await f.manager.deliver({text:'visible compatibility'});assert.equal(f.identities.get('owner').visibility,'workspace');assert.equal(f.registry.has(info.id),true);await f.manager.dispose()
})

test('uncertain identity durability blocks input and automatic retry without claiming restoration',async()=>{
 const f=fixture();await f.manager.prepare(f.owner,'e');let puts=0;f.identityTable.put=async()=>{puts++;throw new Error('unknown-state')}
 await assert.rejects(f.manager.deliver({text:'not delivered'}),/persistence was not confirmed/);assert.equal(puts,1);assert.equal(f.manager.status().persistence.blocked,true);assert.equal([...f.registry.values()].some(a=>a.last),false)
 await assert.rejects(f.manager.deliver({text:'do not retry'}));assert.equal(puts,1);await f.manager.close();await assert.rejects(f.manager.prepare(f.owner,'new'),/persistence is unconfirmed/);await f.manager.dispose()
})

test('task is saved before worker launch; failed launch does not mark task completed',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id)
 f.subagents.startActivation=async()=>{assert.equal(f.boards.get(info.id).tasks.length,1);throw new Error('start failure')}
 const err=await f.manager.delegate(voice,'do useful work').then(()=>null,e=>e);assert.equal(err.taskId,'task-1');assert.equal(err.persistenceConfirmed,true);assert.match(err.message,/inspect the task/)
 const snapshot=await f.manager.handoffStatus(voice);assert.equal(snapshot.tasks[0].status,'pending');assert.equal(snapshot.tasks[0].runtimeState,'unassigned');await f.manager.dispose()
})

test('missing or already-owned persisted root does not silently allocate replacement',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'saved'});await f.manager.close();const saved=f.persisted.get(info.id);f.persisted.delete(info.id)
 await assert.rejects(f.manager.prepare(f.owner,'new'),/missing or is not an independent root/);assert.equal(f.creates.length,1)
 f.persisted.set(info.id,saved);f.registry.set(info.id,f.agent(info.id));await assert.rejects(f.manager.prepare(f.owner,'newer'),/already live/);assert.equal(f.resumes.length,0);f.registry.delete(info.id);await f.manager.dispose()
})

test('policy index stores only fixed digest; long reordered policies restore and changed scope blocks',async()=>{
 const f=fixture();const detail='long private scope detail '.repeat(300)
 f.policyApi.captureDelegatedPolicyOverrides=()=>({approvalPolicy:'never',detail,nested:{b:2,a:1}})
 const initial=await f.manager.prepare(f.owner,'first');await f.manager.deliver({text:'hello'});await f.manager.close()
 const row=f.identities.get('owner');assert.match(row.policyFingerprint,/^[a-f0-9]{64}$/);assert.equal(JSON.stringify(row).includes(detail),false)
 f.policyApi.captureDelegatedPolicyOverrides=()=>({nested:{a:1,b:2},detail,approvalPolicy:'never'})
 const same=await f.manager.prepare(f.owner,'second');assert.equal(same.id,initial.id);assert.equal(same.restored,true);await f.manager.close()
 f.policyApi.captureDelegatedPolicyOverrides=()=>({nested:{a:1,b:3},detail,approvalPolicy:'never'})
 await assert.rejects(f.manager.prepare(f.owner,'third'),/permission scope changed/);await f.manager.dispose()
})

test('worker uses live source route changes, not custom voice route or enable snapshot',async()=>{
 const f=fixture({provider:'voice-fast',model:'voice-small'}),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id)
 const first=await f.manager.delegate(voice,'first');assert.equal(first.routing.source,'live_source');assert.equal(first.routing.workerRequested.provider,'mock')
 f.owner.model.current=()=>({provider:'changed-source',model:'new-work-model',reasoningEffort:'low',apiKey:'NEVER-COPY'})
 const second=await f.manager.delegate(voice,'second');assert.deepEqual(f.starts[1].agentOptions,{provider:'changed-source',model:'new-work-model',reasoningEffort:'low'});assert.equal(second.routing.voiceRoute.provider,'voice-fast');assert.equal(second.routing.workerObserved.provider,'changed-source');assert.equal(second.routing.verification,'resident_selection');assert.equal(second.routing.snapshotStale,false)
 assert.equal(f.manager.status().routing.sourceRoute.provider,'changed-source');assert.equal(JSON.stringify(f.manager.status()).includes('NEVER-COPY'),false);await f.manager.close()
})

test('closed source is explicitly stale snapshot; absent source route never borrows voice defaults',async()=>{
 const f=fixture({provider:'voice-fast',model:'voice-small'}),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});f.registry.delete('owner')
 const result=await f.manager.delegate(f.registry.get(info.id),'offline source');assert.equal(result.routing.source,'enable_snapshot');assert.equal(result.routing.snapshotStale,true);assert.equal(result.routing.workerRequested.provider,'mock');await f.manager.close()
 const g=fixture({provider:'voice-fast',model:'voice-small'});g.owner.model.current=()=>undefined;const other=await g.manager.prepare(g.owner,'e');await g.manager.deliver({text:'hello'})
 let error=await g.manager.delegate(g.registry.get(other.id),'cannot choose').catch(e=>e);assert.equal(error.code,'VOICE_SOURCE_ROUTE_UNAVAILABLE');assert.equal(error.stage,'worker_route_selection');assert.equal(g.starts.length,0)
 g.registry.delete('owner');error=await g.manager.delegate(g.registry.get(other.id),'still cannot choose').catch(e=>e);assert.equal(error.snapshotStale,true);assert.equal(g.starts.length,0);await g.manager.close()
})

test('incomplete live source does not fall back to a formerly valid snapshot',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});f.owner.model.current=()=>({provider:'changed-without-model'})
 await assert.rejects(f.manager.delegate(f.registry.get(info.id),'work'),e=>e.code==='VOICE_SOURCE_ROUTE_UNAVAILABLE');assert.equal(f.starts.length,0);assert.equal(f.manager.status().routing.source,'unavailable');await f.manager.close()
})

test('startup and observed failure layers stay distinct and never copy raw errors',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id),original=f.subagents.startActivation
 f.subagents.startActivation=async()=>{throw Object.assign(new Error('Connection error https://PRIVATE-HOST?key=PRIVATE-KEY'),{code:'ECONNREFUSED'})}
 const error=await f.manager.delegate(voice,'attempt').catch(e=>e);assert.equal(error.stage,'worker_startup');assert.equal(error.routing.source,'live_source');assert.equal(JSON.stringify(error).includes('PRIVATE-KEY'),false)
 f.subagents.startActivation=async spec=>({...await original(spec),result:Promise.resolve({stopReason:'error'})});const result=await f.manager.delegate(voice,'next attempt');await Promise.resolve()
 let diagnostic=f.manager.status().diagnostics.find(d=>d.sessionId===result.sessionId);assert.equal(diagnostic.stage,'worker_result_unknown_source')
 const worker=f.registry.get(result.sessionId);f.emitEvent('tools/result',{agent:worker,arguments:{password:'PRIVATE-KEY'}},{isError:true,error:{code:'CONNECTION_ERROR',message:'PRIVATE-KEY'}})
 diagnostic=f.manager.status().diagnostics.find(d=>d.sessionId===result.sessionId);assert.equal(diagnostic.stage,'worker_tool_execution')
 let relayed=0;await f.emitEvent('agent/request-error',{agent:worker,failure:{code:'TRANSPORT_ERROR',message:'PRIVATE-KEY'}},async()=>{relayed++;return undefined})
 assert.equal(relayed,1);diagnostic=f.manager.status().diagnostics.find(d=>d.sessionId===result.sessionId);assert.equal(diagnostic.stage,'worker_llm_request');assert.equal(diagnostic.code,'TRANSPORT_ERROR');assert.equal(JSON.stringify(f.manager.status()).includes('PRIVATE-KEY'),false);await f.manager.close()
})

test('wrong initial worker route is rejected before next and the activation is stopped',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id),original=f.subagents.startActivation;let nextCalls=0
 f.subagents.startActivation=async spec=>{const activation=await original(spec),worker=f.registry.get(activation.childId);const decision=await f.emitEvent('agent/pre-step',{agent:worker,modelSelection:{provider:'unexpected-provider',model:'wrong-model'}},async()=>{nextCalls++;return {kind:'enter',messages:[]}});assert.equal(decision.kind,'reject');return activation}
 const error=await f.manager.delegate(voice,'task').catch(e=>e);assert.equal(error.code,'VOICE_WORKER_ROUTE_MISMATCH');assert.equal(error.stage,'worker_route_verification');assert.equal(nextCalls,0);assert.ok(f.disposed.includes('worker-1'));assert.equal(f.registry.has('worker-1'),false);assert.equal(f.interrupts[0].authority.agent,voice);await f.manager.close()
})

test('matching initial worker route preserves native next behavior and reports verification',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id),original=f.subagents.startActivation;let nextCalls=0
 f.subagents.startActivation=async spec=>{const activation=await original(spec),worker=f.registry.get(activation.childId);const decision=await f.emitEvent('agent/pre-step',{agent:worker,modelSelection:spec.agentOptions},async()=>{nextCalls++;return {kind:'enter',messages:[]}});assert.equal(decision.kind,'enter');return activation}
 const result=await f.manager.delegate(voice,'task');assert.equal(nextCalls,1);assert.equal(result.routing.initialRouteVerified,true);assert.equal(result.routing.verification,'resident_selection');await f.manager.close()
})

test('off preference gracefully uses verified default or unverified provider default without changing route',async()=>{
 for(const [reasoning,expected,why]of [[{efforts:[{id:'high'}],defaultEffort:'high'},'high','advertised_default'],[{efforts:[{id:'low'}]},null,'provider_default_unverified'],[undefined,null,'provider_default_unverified'],[{efforts:[{id:'low'}],defaultEffort:'unsupported'},null,'provider_default_unverified']]){
  const f=fixture({provider:'same-provider',model:'same-model'});f.llm.resolveModelInfo=async()=>({reasoning});const info=await f.manager.prepare(f.owner,'e');assert.equal(info.reasoningEffort,expected);await f.manager.deliver({text:'hello'});assert.equal(f.creates[0].agentOptions.provider,'same-provider');assert.equal(f.creates[0].agentOptions.model,'same-model');assert.equal(f.creates[0].agentOptions.reasoningEffort,expected??undefined)
  const mode=f.manager.status().routing.voiceMode;assert.equal(mode.requestedEffort,'off');assert.equal(mode.selectedEffort,expected);assert.equal(mode.selectionReason,why);assert.equal(mode.requestedAdvertised,false);assert.equal(mode.providerEnforcement,'not_verified');await f.manager.close()
 }
})

test('observed reasoning is content-free evidence, not a guarantee the server honored off',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id)
 voice.session.requestHeader=()=>({config:{provider:'mock',model:'quality',reasoningEffort:'off',baseURL:'PRIVATE-URL',apiKey:'PRIVATE-KEY'}})
 f.emitEvent('agent/assistant-stream',{agent:voice,frame:{type:'chunk',chunk:{type:'reasoning-delta',text:'PRIVATE-THOUGHT'}}})
 const mode=f.manager.status().routing.voiceMode;assert.equal(mode.requestedEffort,'off');assert.equal(mode.requestObserved.reasoningEffort,'off');assert.equal(mode.reasoningDeltaObserved,true);assert.equal(mode.providerEnforcement,'not_verified');assert.equal(JSON.stringify(mode).includes('PRIVATE'),false);await f.manager.close()
})

test('archived voice rejects wakeup without changing grants or silently replacing its context',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const workspace=f.ctx.get('workspaceRegistry');workspace.archivedSessionIds=[info.id]
 assert.equal(f.manager.status().lifecycle.archived,true);assert.equal(f.manager.status().enabled,true)
 await assert.rejects(f.manager.deliver({text:'wake'}),e=>e.code==='VOICE_SESSION_ARCHIVED');await assert.rejects(f.manager.prepare(f.owner,'new'),e=>e.code==='VOICE_SESSION_ARCHIVED');assert.equal(f.creates.length,1);assert.equal(f.registry.has(info.id),true)
 workspace.archivedSessionIds=[];await f.manager.deliver({text:'restored in DSH'});assert.equal(f.creates.length,1);assert.equal(f.manager.status().lifecycle.archived,false)
 workspace.archivedSessionIds=[info.id];await f.manager.close();await assert.rejects(f.manager.prepare(f.owner,'new'),e=>e.code==='VOICE_SESSION_ARCHIVED');assert.equal(f.creates.length,1);assert.equal(workspace.archivedSessionIds[0],info.id)
})


test('explicit catalog new keeps prior roots, selects exact cross-origin history without model input', async()=>{
 const f=fixture(); const first=await f.manager.prepareNew(f.owner,'new-one');
 assert.equal(f.creates.length,1);assert.equal(f.registry.get(first.id).last,undefined);assert.equal(f.catalogRows.size,1)
 const second=await f.manager.prepareNew(f.owner,'new-two');assert.notEqual(first.id,second.id);assert.equal(f.catalogRows.size,2)
 const listing=await f.manager.listVoiceSessions(f.owner,{limit:20});assert.equal(listing.items.length,2);assert.equal(listing.selectionRequired,true)
 const peer=f.agent('other-origin');f.registry.set(peer.id,peer)
 const restored=await f.manager.prepareSelected(peer,first.id,'selected-three');assert.equal(restored.id,first.id);assert.equal(restored.restored,true)
 assert.equal(f.registry.get(first.id).last,undefined);assert.equal(f.starts.length,0);assert.equal(f.manager.status().ownerSessionId,peer.id)
 assert.equal(f.catalogRows.get(first.id).originSessionId,'owner');assert.equal(f.catalogRows.size,2)
 await assert.rejects(f.manager.listVoiceSessions({...peer}),/exact live/)
 await f.manager.dispose()
})

test('explicit catalog rejects unknown, archived, changed-policy and occupied roots without replacement', async()=>{
 for(const scenario of ['unknown','archived','policy','occupied']) {
  const f=fixture(),first=await f.manager.prepareNew(f.owner,'new');await f.manager.close()
  let id=first.id
  if(scenario==='unknown')id='unregistered'
  if(scenario==='archived')f.services.workspaceRegistry.archivedSessionIds.push(id)
  if(scenario==='policy')f.policyApi.captureDelegatedPolicyOverrides=()=>({approvalPolicy:'different'})
  if(scenario==='occupied')f.registry.set(id,f.agent(id))
  await assert.rejects(f.manager.prepareSelected(f.owner,id,'resume'))
  assert.equal(f.creates.length,1);assert.equal(f.resumes.length,0);assert.equal(f.manager.status().id,null)
  await f.manager.dispose()
 }
})

test('catalog unconfirmed write prevents a replacement or accepted input', async()=>{
 const f=fixture();f.catalogTable.put=async()=>{throw new Error('durability uncertain')}
 await assert.rejects(f.manager.prepareNew(f.owner,'new'),e=>e.persistenceConfirmed===false)
 assert.equal(f.creates.length,1);assert.equal(f.manager.status().enabled,false)
 await assert.rejects(f.manager.prepareNew(f.owner,'retry'))
 assert.equal(f.creates.length,1);assert.equal(f.starts.length,0);await f.manager.dispose()
})

test('session management lists only verified Whale roots and persisted descendants with exact DSH addresses',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'manage-list');await f.manager.deliver({text:'create root'});const voice=f.registry.get(info.id)
 const worker=await f.manager.delegate(voice,'create owned worker')
 const roots=await f.manager.manageSessions(f.owner,{operation:'list'})
 assert.equal(roots.items.length,1);assert.equal(roots.items[0].kind,'root');assert.equal(roots.items[0].childrenLoaded,false)
 const page=await f.manager.manageSessions(f.owner,{operation:'list',rootId:info.id})
 assert.equal(page.nextCursor,null);assert.equal(page.total,1);assert.equal(page.items.length,2)
 const [root,child]=page.items
 assert.deepEqual({id:root.id,rootId:root.rootId,parentId:root.parentId,kind:root.kind,depth:root.depth,status:root.status,archived:root.archived,visibility:root.visibility,canRestore:root.canRestore},
  {id:info.id,rootId:info.id,parentId:null,kind:'root',depth:0,status:'live',archived:false,visibility:'hidden',canRestore:false})
 assert.equal(root.childrenAvailable,true);assert.equal(root.childrenIncomplete,false)
 assert.deepEqual({id:child.id,rootId:child.rootId,parentId:child.parentId,kind:child.kind,depth:child.depth,mode:child.mode,status:child.status,archived:child.archived,visibility:child.visibility,canUnhide:child.canUnhide},
  {id:worker.sessionId,rootId:info.id,parentId:info.id,kind:'subagent',depth:1,mode:'continuable',status:'live',archived:false,visibility:'hidden',canUnhide:false})
 assert.equal(page.capabilities.restore.supported,true);assert.equal(page.capabilities.unhide.supported,false);assert.match(page.capabilities.unhide.reason,/尚未连接/)
 await assert.rejects(f.manager.manageSessions({...f.owner},{operation:'list'}),/exact live/)
 await f.manager.close();await f.manager.dispose()
})

test('session management restores only archived roots or descendants after native unarchive readback',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'manage-restore');await f.manager.deliver({text:'create root'});const voice=f.registry.get(info.id)
 const worker=await f.manager.delegate(voice,'create owned worker'),workspace=f.services.workspaceRegistry
 workspace.archivedSessionIds=[info.id,worker.sessionId]
 const page=await f.manager.manageSessions(f.owner,{operation:'list',rootId:info.id})
 assert.deepEqual(page.items.map(row=>[row.id,row.archived,row.canRestore]),[[info.id,true,true],[worker.sessionId,true,true]])
 const childResult=await f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:worker.sessionId})
 assert.deepEqual(childResult,{operation:'restore',id:worker.sessionId,rootId:info.id,archived:false,visibility:'hidden',changed:true})
 const repeated=await f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:worker.sessionId})
 assert.equal(repeated.changed,false);assert.deepEqual(f.unarchives,[worker.sessionId])
 const rootResult=await f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:info.id})
 assert.equal(rootResult.changed,true);assert.equal(rootResult.archived,false);assert.deepEqual(f.unarchives,[worker.sessionId,info.id])
 assert.deepEqual(workspace.archivedSessionIds,[])
 await assert.rejects(f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:'foreign'}),error=>error.code==='VOICE_SESSION_MANAGEMENT_UNKNOWN_SESSION')
 workspace.archivedSessionIds=[info.id];workspace.unarchiveSession=async()=>{throw new Error('PRIVATE-HOST-DETAIL')}
 await assert.rejects(f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:info.id}),error=>error.code==='VOICE_SESSION_RESTORE_FAILED'&&!error.message.includes('PRIVATE-HOST-DETAIL'))
 assert.deepEqual(workspace.archivedSessionIds,[info.id])
 await f.manager.close();await f.manager.dispose()
})

test('owner session management survives a different foreground policy and finds an older active root', async () => {
 const f = fixture()
 try {
   const root = await f.manager.prepare(f.owner, 'owner-session-management')
   await f.manager.deliver({text:'create root'})
   const record = f.catalogRows.get(root.id)
   for (let i = 0; i < 22; i++) {
     const id = `history-${i}`, createdAt = record.createdAt + i + 1
     const agent = f.agent(id)
     agent.session.header.createdAt = createdAt
     f.persisted.set(id, agent)
     f.presentations.set(id, f.presentations.get(root.id))
     f.catalogRows.set(id, {...record, rootSessionId:id, createdAt})
   }
   const foreground = f.agent('unrelated-foreground')
   f.registry.set(foreground.id, foreground)
   f.policyApi.captureDelegatedPolicyOverrides = agent => ({approvalPolicy:agent === f.owner ? 'never' : 'different'})
   const scoped = await f.manager.manageSessions(foreground, {operation:'list'})
   assert.ok(scoped.items.every(row => row.reason === 'policy_mismatch'))
   const page = await f.manager.manageSessions(ownerSettings, {operation:'list'})
   assert.deepEqual(page.items.filter(row => row.active).map(row => row.id), [root.id])
   const history = page.items.filter(row => !row.active)
   assert.equal(history.length, 20)
   assert.ok(history.every((row, i) => i === 0 || row.createdAt < history[i - 1].createdAt))
   assert.equal(page.total, 23)
   assert.equal(page.items.find(row => row.id === 'history-21').status, 'available')
   await assert.rejects(f.manager.manageSessions(ownerSettings, {operation:'restore', rootId:foreground.id, id:foreground.id}), {code:'VOICE_SESSION_MANAGEMENT_UNKNOWN_ROOT'})
 } finally { await f.manager.dispose() }
})

test('owner session titles prefer the native title and fall back to a bounded local voice excerpt', async () => {
 const f = fixture()
 try {
   const root = await f.manager.prepare(f.owner, 'owner-session-title')
   await f.manager.deliver({text:'create root'})
   const header = f.persisted.get(root.id).session.header
   let reads = 0
   f.sessionPersistence.open = async (id, mode) => {
     assert.equal(id, root.id)
     assert.equal(mode, 'read')
     return {header, async read(offset, limit) {
       assert.equal(offset, 0)
       assert.equal(limit, 96)
       reads++
       const message = (kind, text) => ({type:'user/message', surfaceOp:'append', data:{source:{kind}, content:[{type:'text', text}]}})
       return {events:[message('user', '其他来源'), message('whale-ear', '   核对\n模型下载   ')]}
     }, async close() {}}
   }
   const list = () => f.manager.manageSessions(ownerSettings, {operation:'list'})
   assert.equal((await list()).items[0].title, '核对 模型下载')
   f.services.sessionProjections = {snapshot: () => ({values:{title:'手动改名'}})}
   assert.equal((await list()).items[0].title, '手动改名')
   assert.equal(reads, 1)
 } finally { await f.manager.dispose() }
})

test('session management rejects unhide explicitly and sanitizes child modes from the DSH catalog',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'manage-unhide');await f.manager.deliver({text:'create root'});const voice=f.registry.get(info.id)
 const worker=await f.manager.delegate(voice,'create owned worker'),entry=f.catalogs.get(info.id)[0]
 entry.mode='future-mode'
 const page=await f.manager.manageSessions(f.owner,{operation:'list',rootId:info.id})
 assert.equal(page.items[1].mode,'unknown')
 await assert.rejects(f.manager.manageSessions(f.owner,{operation:'unhide',rootId:info.id,id:worker.sessionId}),{code:'VOICE_SESSION_UNHIDE_UNAVAILABLE'})
 assert.equal(f.presentations.get(worker.sessionId),undefined)
 entry.mode='continuable';f.registry.get(worker.sessionId).session.header.parentSession='wrong-parent'
 const mismatched=await f.manager.manageSessions(f.owner,{operation:'list',rootId:info.id})
 assert.equal(mismatched.items.some(row=>row.id===worker.sessionId),false);assert.equal(mismatched.items[0].childrenIncomplete,true)
 await assert.rejects(f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:worker.sessionId}),error=>error.code==='VOICE_SESSION_MANAGEMENT_UNKNOWN_SESSION')
 await f.manager.close();await f.manager.dispose()
})

test('session management disables restore when native unarchive is absent',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'manage-capabilities');await f.manager.deliver({text:'create root'})
 const workspace=f.services.workspaceRegistry;delete workspace.unarchiveSession;workspace.archivedSessionIds=[info.id]
 const page=await f.manager.manageSessions(f.owner,{operation:'list',rootId:info.id})
 assert.equal(page.capabilities.restore.supported,false);assert.equal(page.items[0].canRestore,false);assert.equal(page.items[0].reason,'restore_unavailable')
 await assert.rejects(f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:info.id}),error=>error.code==='VOICE_SESSION_RESTORE_UNAVAILABLE')
 assert.deepEqual(workspace.archivedSessionIds,[info.id]);await f.manager.close();await f.manager.dispose()
})

test('archived catalog root can be unarchived after presentation support disappears, but only with matching policy and durable identity',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'manage-stock-host');await f.manager.deliver({text:'create root'});const voice=f.registry.get(info.id)
 const worker=await f.manager.delegate(voice,'create owned worker')
 const workspace=f.services.workspaceRegistry
 delete workspace.sessionPresentation;workspace.archivedSessionIds=[worker.sessionId]
 const page=await f.manager.manageSessions(f.owner,{operation:'list',rootId:info.id})
 assert.equal(page.items[0].status,'live');assert.equal(page.items[0].childrenLoaded,true)
 assert.equal(page.items[1].status,'archived');assert.equal(page.items[1].archived,true);assert.equal(page.items[1].canRestore,true)
 const restoredWorker=await f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:worker.sessionId})
 assert.equal(restoredWorker.changed,true);assert.deepEqual(workspace.archivedSessionIds,[])

 workspace.archivedSessionIds=[info.id]
 const archivedRoot=await f.manager.manageSessions(f.owner,{operation:'list',rootId:info.id})
 assert.equal(archivedRoot.items[0].status,'archived');assert.equal(archivedRoot.items[0].archived,true);assert.equal(archivedRoot.items[0].canRestore,true)
 const restored=await f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:info.id})
 assert.equal(restored.changed,true);assert.deepEqual(workspace.archivedSessionIds,[])

 workspace.archivedSessionIds=[info.id];f.policyApi.captureDelegatedPolicyOverrides=()=>({approvalPolicy:'changed'})
 await assert.rejects(f.manager.manageSessions(f.owner,{operation:'restore',rootId:info.id,id:info.id}),error=>error.code==='VOICE_SESSION_MANAGEMENT_SCOPE_DENIED')
 assert.deepEqual(workspace.archivedSessionIds,[info.id]);await f.manager.close();await f.manager.dispose()
})


test('ordinary first transcript registers forward history and exact identity restore is idempotent', async()=>{
 const f=fixture(), first=await f.manager.prepare(f.owner,'first');assert.equal(f.catalogRows.size,0)
 await f.manager.deliver({text:'ordinary creation'});assert.equal(f.catalogRows.size,1)
 assert.equal((await f.manager.listVoiceSessions(f.owner,{})).items[0].rootSessionId,first.id)
 await f.manager.close();await f.manager.prepare(f.owner,'second');assert.equal(f.catalogRows.size,1)
 // Simulate a verified pre-catalog identity from the unpublished v051 prototype.
 await f.manager.close();f.catalogRows.clear();await f.manager.prepare(f.owner,'third')
 assert.equal(f.catalogRows.size,1);assert.equal(f.catalogRows.get(first.id).originSessionId,'owner')
 await f.manager.close();const other=f.agent('other');f.registry.set(other.id,other)
 await f.manager.prepareSelected(other,first.id,'fourth');await f.manager.close()
 await f.manager.prepare(other,'fifth');assert.equal(f.catalogRows.get(first.id).originSessionId,'owner')
 assert.equal(f.creates.length,1);await f.manager.dispose()
})


test('published host missing Team/rootOf fails before creating or granting any voice root', async()=>{
 const f=fixture();delete f.services.agentTeams;delete f.subagents.rootOf
 await assert.rejects(f.manager.prepare(f.owner,'unsupported'),error=>error.code==='VOICE_HOST_CAPABILITY_MISMATCH'&&error.stage==='host_capability_preflight'&&error.missingCapabilities.includes('subagents.rootOf')&&/Published 0.2.2-rc.1/.test(error.message))
 assert.equal(f.creates.length,0);assert.equal(f.manager.status().enabled,false);assert.equal(f.catalogRows.size,0)
 await f.manager.dispose()
})

test('published rc1 workspace backend persists bound tasks without Team/rootOf and uses one compatible activation', async()=>{
 const f=fixture({handoffBackend:'compat_domain_v1',subagentApiProfile:'published_rc1',visibility:'workspace'})
 delete f.services.agentTeams;delete f.subagents.rootOf;delete f.services.workspaceRegistry.sessionPresentation
 const original=f.subagents.startActivation,nested=[]
 f.subagents.startActivation=async spec=>{nested.push(spec);assert.equal(spec.parent,spec.request.parent);assert.equal(spec.prompt,spec.request.prompt);assert.equal(spec.agentOptions,spec.request.agentOptions);assert.equal(spec.maxDepth,spec.request.maxDepth);return original({...spec,...spec.request})}
 assert.equal(f.manager.capabilities().workspace.supported,true);assert.equal(f.manager.capabilities().hidden.supported,false)
 const info=await f.manager.prepare(f.owner,'compat-one');await f.manager.deliver({text:'hello'});const root=f.registry.get(info.id)
 assert.equal(f.manager.status().handoff.backend,'compat_domain_v1')
 const task=await f.manager.delegate(root,'Do the assigned work');assert.equal(nested.length,1);assert.equal(nested[0].request.parent,root)
 const worker=f.registry.get(task.sessionId),get=f.registeredTools.get('voice_task_get'),update=f.registeredTools.get('voice_task_update'),signal=new AbortController().signal
 assert.ok(get);assert.ok(update);assert.equal(f.scopes[0].restriction.allow.includes('voice_task_update'),false)
 const pending=JSON.parse(await get.execute({task_id:task.taskId},{agent:worker,signal}));assert.equal(pending.task.assignedWorkerId,worker.id)
 await update.execute({task_id:task.taskId,expected_revision:1,action:'claim'},{agent:worker,signal})
 await update.execute({task_id:task.taskId,expected_revision:2,action:'edit',progress:'Waiting for the user',pending_decisions:['Which option?']},{agent:worker,signal})
 const snap=await f.manager.handoffStatus(f.owner);assert.equal(snap.tasks[0].status,'in_progress');assert.equal(snap.tasks[0].ownerId,worker.id)
 await assert.rejects(get.execute({task_id:task.taskId},{agent:root,signal}))
 const sibling=f.agent('sibling');sibling.session.header.parentSession=root.id;f.registry.set(sibling.id,sibling)
 await assert.rejects(get.execute({task_id:task.taskId},{agent:sibling,signal}))
 f.setConfig({handoffBackend:'native_team'});await f.manager.deliver({text:'Preference only affects future new roots'})
 await f.manager.close();assert.equal(f.registeredTools.has('voice_task_update'),false)
 const restored=await f.manager.prepare(f.owner,'compat-two');assert.equal(restored.id,info.id);assert.equal(f.manager.status().handoff.backend,'compat_domain_v1')
 assert.equal((await f.manager.handoffStatus(f.owner)).tasks[0].revision,3);assert.equal(nested.length,1)
 await f.manager.dispose()
})

for (const profile of [undefined, 'compatible_v1', 'published_rc1']) {
 for (const host of ['nested_rc1', 'flat_rc3']) test(`compatible activation ${String(profile)} dispatches once through ${host}`, async()=>{
  const f=fixture({handoffBackend:'compat_domain_v1',visibility:'workspace',subagentApiProfile:profile})
  const original=f.subagents.startActivation;let calls=0
  f.subagents.startActivation=async spec=>{
   calls++
   assert.equal(spec.parent,spec.request.parent)
   assert.equal(spec.prompt,spec.request.prompt)
   assert.equal(spec.agentOptions,spec.request.agentOptions)
   assert.equal(spec.maxDepth,1);assert.equal(spec.request.maxDepth,1)
   assert.equal(spec.provider,'spawn');assert.equal(spec.delivery,'parent')
   return original(host==='nested_rc1'?{...spec,...spec.request}:spec)
  }
  try {
   assert.equal(f.manager.capabilities().subagentApiProfile,'compatible_v1')
   const info=await f.manager.prepare(f.owner,'compat');await f.manager.deliver({text:'hello'})
   const result=await f.manager.delegate(f.registry.get(info.id),'One task')
   assert.equal(calls,1);assert.equal(f.starts.length,1)
   assert.equal(result.sessionId,'worker-1')
   assert.equal((await f.manager.handoffStatus(f.owner)).tasks.length,1)
  } finally {await f.manager.dispose()}
 })
}

test('compatible activation failure keeps one saved task and never retries another shape',async()=>{
 const f=fixture({handoffBackend:'compat_domain_v1',visibility:'workspace',subagentApiProfile:'compatible_v1'})
 let calls=0
 f.subagents.startActivation=async()=>{calls++;throw Error('synthetic host startup failure')}
 try {
  const info=await f.manager.prepare(f.owner,'compat-failure');await f.manager.deliver({text:'hello'})
  await assert.rejects(f.manager.delegate(f.registry.get(info.id),'One task'),error=>error.stage==='worker_startup'&&error.persistenceConfirmed===true)
  assert.equal(calls,1);assert.equal(f.starts.length,0)
  assert.equal((await f.manager.handoffStatus(f.owner)).tasks.length,1)
 } finally {await f.manager.dispose()}
})

test('explicit source_flat_v1 remains a flat-only activation',async()=>{
 const f=fixture({subagentApiProfile:'source_flat_v1'})
 try {
  const info=await f.manager.prepare(f.owner,'flat-only');await f.manager.deliver({text:'hello'})
  await f.manager.delegate(f.registry.get(info.id),'One task')
  assert.equal(f.starts.length,1);assert.equal(Object.hasOwn(f.starts[0],'request'),false)
  assert.equal(f.starts[0].parent,f.registry.get(info.id))
 } finally {await f.manager.dispose()}
})

test('missing compatibility binding refuses restore instead of silently creating a native board', async()=>{
 const f=fixture({handoffBackend:'compat_domain_v1'});await f.manager.prepare(f.owner,'one');await f.manager.deliver({text:'hello'});await f.manager.close()
 f.backendDomains.clear()
 await assert.rejects(f.manager.prepare(f.owner,'two'),error=>error.code==='VOICE_TASK_BACKEND_MISMATCH')
 assert.equal(f.resumes.length,0);assert.equal(f.boards.size,0);await f.manager.dispose()
})


test('compat catalog selection preserves backend across origins; conflicting metadata refuses before resume',async()=>{
 const f=fixture({handoffBackend:'compat_domain_v1'}),first=await f.manager.prepareNew(f.owner,'first')
 assert.equal(f.catalogRows.get(first.id).handoffBackend,'compat_domain_v1')
 await f.manager.close();const other=f.agent('other');f.registry.set(other.id,other)
 await f.manager.prepareSelected(other,first.id,'second');assert.equal(f.manager.status().handoff.backend,'compat_domain_v1');await f.manager.close()
 f.catalogRows.get(first.id).handoffBackend='native_team'
 const before=f.resumes.length
 await assert.rejects(f.manager.prepare(other,'third'),error=>error.code==='VOICE_TASK_BACKEND_MISMATCH');assert.equal(f.resumes.length,before)
 await f.manager.dispose()
})


test('strict modes select only their advertised effort and inspection does not close a running tree', async()=>{
 for (const [performanceMode, effort] of [['fast','off'],['balanced','low'],['high','high']]) {
  const f=fixture({performanceMode});f.llm.resolveModelInfo=async()=>({reasoning:{efforts:[{id:effort}]}})
  const info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'})
  assert.equal(f.creates[0].agentOptions.reasoningEffort,effort)
  const before=f.manager.status(), inspected=await f.manager.inspectPerformanceModes(f.owner)
  assert.equal(inspected.modes.find(m=>m.performanceMode===performanceMode).available,true)
  assert.equal(f.manager.status().id,before.id);assert.equal(f.drained.length,0)
  assert.equal(before.routing.voiceMode.requestedMode,performanceMode);assert.equal(before.routing.voiceMode.policy,'strict')
  assert.equal(before.ttsResidency.supported,false);await f.manager.close()
 }
})
test('explicit fast attempts missing catalog effort while legacy preference keeps honest fallback',async()=>{
 for(const config of [{},{reasoningEffort:'off'},{performanceMode:'compatibility'}]){
  const f=fixture(config);f.llm.resolveModelInfo=async()=>({reasoning:{efforts:[{id:'high'}],defaultEffort:'high'}})
  await f.manager.prepare(f.owner,'e')
  assert.equal(f.manager.status().routing.voiceMode.policy,'legacy_compatible')
  assert.equal(f.manager.status().routing.voiceMode.selectedEffort,'high');await f.manager.close()
 }
 const f=fixture({performanceMode:'fast'});f.llm.resolveModelInfo=async()=>({reasoning:{efforts:[{id:'high'}],defaultEffort:'high'}})
 await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'})
 assert.equal(f.creates[0].agentOptions.reasoningEffort,'off');await f.manager.dispose()
})

test('stock host keeps an unverified off route out of both inspection and root activation',async()=>{
 const f=fixture({performanceMode:'fast'})
 delete f.llm.inspectExactEffort
 f.llm.prepareCall=()=>assert.fail('inspection must not prepare a provider request without a contract')
 f.llm.resolveModelInfo=async()=>({reasoning:{efforts:[{id:'high'}],defaultEffort:'high'}})
 const inspected=await f.manager.inspectPerformanceModes(f.owner)
 assert.deepEqual(inspected.modes.map(({available,reason})=>[available,reason]),[
  [false,'host_contract_blocked'],[false,'host_contract_blocked'],[true,'advertised'],
 ])
 await assert.rejects(f.manager.prepare(f.owner,'e'),{code:'VOICE_EXACT_EFFORT_HOST_REQUIRED'})
 assert.equal(f.creates.length,0)
 await f.manager.dispose()
})

test('the stock DeepSeek Messages route uses advertised off without a probe request',async()=>{
 const f=fixture({performanceMode:'fast'})
 class DeepSeekAdapter {
  providerInfo(provider) { return {id:provider,name:'DeepSeek'} }
 }
 f.owner.model.select({provider:'deepseek-official',model:'sample',reasoningEffort:'high'})
 f.llm.adapters=new Map([['deepseek-official',{adapter:new DeepSeekAdapter()}]])
 f.llm.inspectExactEffort=()=>assert.fail('native route needs no exact-effort probe')
 f.llm.prepareCall=()=>assert.fail('preparing a root must not dispatch provider requests')
 const inspected=await f.manager.inspectPerformanceModes(f.owner)
 assert.deepEqual(inspected.modes[0],{performanceMode:'fast',requestedEffort:'off',available:true,reason:'explicit_off'})
 await f.manager.prepare(f.owner,'e')
 await f.manager.deliver({text:'hello'})
 assert.equal(f.creates[0].agentOptions.reasoningEffort,'off')
 await f.manager.dispose()
})

test('follow model uses the source effort for auto and leaves exact manual selections to the host default',async()=>{
 const auto=fixture({performanceMode:'compatibility'})
 const manual=fixture({performanceMode:'compatibility',conversationModelMode:'manual',provider:'voice-fast',model:'voice-small'})
 for(const [f,expected] of [[auto,'high'],[manual,undefined]]){
  f.llm.resolveModelInfo=async()=>({reasoning:{efforts:[{id:'off'},{id:'high'}],defaultEffort:'off'}})
  f.llm.inspectExactEffort=()=>assert.fail('follow model needs no exact-effort probe')
  await f.manager.prepare(f.owner,'e')
  await f.manager.deliver({text:'hello'})
  assert.equal(f.creates[0].agentOptions.reasoningEffort,expected)
  assert.equal(f.manager.status().routing.voiceMode.requestedEffort,null)
  await f.manager.dispose()
 }
})
test('fullyStopped is false throughout asynchronous descendant cleanup',async()=>{
 const f=fixture();assert.equal(f.manager.status().fullyStopped,true);assert.equal((await f.manager.inspectPerformanceModes(f.owner)).preferenceSource,'default')
 await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'})
 const gate=deferred();f.subagents.drainDescendants=()=>gate.promise
 const pending=f.manager.close();assert.equal(f.manager.status().id,null);assert.equal(f.manager.status().fullyStopped,false)
 gate.resolve();await pending;assert.equal(f.manager.status().fullyStopped,true)
})

test('direct config mode changes cannot make prepare silently close a live worker tree',async()=>{
 const f=fixture(),prepared=await f.manager.prepare(f.owner,'first');await f.manager.deliver({text:'hello'})
 const voice=f.registry.get(prepared.id);await f.manager.delegate(voice,'work')
 f.setConfig({performanceMode:'high'})
 await assert.rejects(f.manager.prepare(f.owner,'second'),{code:'VOICE_MODE_CHANGE_REQUIRES_STOP'})
 assert.equal(f.manager.status().id,prepared.id);assert.equal(f.drained.length,0);assert.equal(f.registry.get(prepared.id),voice)
 await f.manager.close()
})

test('active voice descendants survive rejected performance changes; explicit close drains only that root', async t => {
  const { createVoiceUiBridge } = await import('../voice-ui-bridge.mjs')
  const { mkdtempSync, writeFileSync, readFileSync, rmSync } = await import('node:fs')
  const { tmpdir } = await import('node:os')
  const { join } = await import('node:path')
  const directory=mkdtempSync(join(tmpdir(),'whale-active-tree-'))
  t.after(()=>rmSync(directory,{recursive:true,force:true}))
  const configPath=join(directory,'config.json')
  writeFileSync(configPath,JSON.stringify({device:null,pttMouse:2,speakerVerification:{enabled:false},voiceSession:{performanceMode:'compatibility'}}))
  const f=fixture(), info=await f.manager.prepare(f.owner,'tree-epoch')
  f.owner.session.id=f.owner.id // UI caller contract; native fixture normally uses header.id.
  await f.manager.deliver({text:'hello'})
  const voice=f.registry.get(info.id)
  await f.manager.delegate(voice,'keep voice work active')
  const workerId=f.starts[0].childId ?? 'worker-1', worker=f.registry.get(workerId)
  assert.ok(worker);worker.status='running'
  const nested=f.agent('voice-nested');nested.status='running';nested.session.header.parentSession=workerId
  f.registry.set(nested.id,nested)
  f.catalogs.get(voice.id).push({kind:'child',id:nested.id,parentId:workerId,depth:2})
  const independent=f.agent('original-chat-worker'), independentNested=f.agent('original-chat-nested')
  for(const a of [independent,independentNested]) {a.status='running';f.registry.set(a.id,a)}
  independent.session.header.parentSession=f.owner.id
  independentNested.session.header.parentSession=independent.id
  f.catalogs.set(f.owner.id,[{kind:'child',id:independent.id,parentId:f.owner.id,depth:1},{kind:'child',id:independentNested.id,parentId:independent.id,depth:2}])
  const bridge=createVoiceUiBridge({configPath,assertCaller:a=>{assert.equal(a,f.owner)},readEffectiveConfig:()=>JSON.parse(readFileSync(configPath,'utf8')),
    readStatus:()=>({enabled:true,ownerSessionId:f.owner.id,voiceControlBusy:false,voiceSession:f.manager.status()}),
    sessionControl:{owner:()=>f.owner.id,allowed:()=>true,change:()=>{throw new Error('must not revoke implicitly')}}})
  const before=readFileSync(configPath,'utf8'), settings=bridge.readSettings(f.owner)
  assert.throws(()=>bridge.setPerformanceMode({revision:settings.revision,performanceMode:'high'},f.owner,new AbortController().signal),/关闭语音/)
  assert.equal(readFileSync(configPath,'utf8'),before)
  assert.equal(f.drained.length,0);assert.equal(f.disposed.length,0);assert.equal(f.interrupts.length,0)
  for(const a of [voice,worker,nested,independent,independentNested]) assert.equal(f.registry.get(a.id),a)
  f.setConfig({performanceMode:'high'})
  await assert.rejects(f.manager.prepare(f.owner,'replacement-epoch'),{code:'VOICE_MODE_CHANGE_REQUIRES_STOP'})
  assert.equal(f.drained.length,0);assert.equal(f.registry.get(workerId),worker);assert.equal(f.registry.get(nested.id),nested)
  await f.manager.close()
  assert.deepEqual(f.drained,[voice]);assert.equal(f.manager.status().fullyStopped,true)
  for(const a of [voice,worker,nested]) assert.equal(f.registry.has(a.id),false)
  for(const a of [f.owner,independent,independentNested]) assert.equal(f.registry.get(a.id),a)
  assert.equal(independent.status,'running');assert.equal(independentNested.status,'running')
  assert.ok(f.interrupts.every(item=>![f.owner.id,independent.id,independentNested.id].includes(item.id)))
})

test('queued old-capture input is cancelled before dispatch without altering accepted history', async () => {
  const f=fixture(),info=await f.manager.prepare(f.owner,'e')
  await f.manager.deliver({text:'already accepted'})
  const root=f.registry.get(info.id),gate=deferred(),entered=deferred(),original=root.steer
  root.steer=async message=>{if(message.content[0].text==='current dispatch'){entered.resolve();await gate.promise};return original.call(root,message)}
  const first=f.manager.deliver({text:'current dispatch'})
  await entered.promise
  let active=true
  const queued=f.manager.deliver({text:'stale queued private speech',isCurrentCapture:()=>active})
  active=false;gate.resolve()
  await first;await assert.rejects(queued)
  assert.deepEqual(root.session.events.filter(e=>e.type==='user').map(e=>e.data.content[0].text),['already accepted','current dispatch'])
  await f.manager.deliver({text:'legacy callers still work'})
  assert.equal(root.last.content[0].text,'legacy callers still work')
  await f.manager.close()
})

test('capture changes during initial materialization cancel the unsent utterance', async () => {
  const f=fixture(),info=await f.manager.prepare(f.owner,'e'),gate=deferred(),entered=deferred()
  const original=f.ctx.agents.create
  f.ctx.agents.create=async spec=>{entered.resolve();await gate.promise;return original(spec)}
  let active=true
  const pending=f.manager.deliver({text:'private speech during materialization',isCurrentCapture:()=>active})
  await entered.promise;active=false;gate.resolve()
  await assert.rejects(pending)
  const root=f.registry.get(info.id)
  assert.equal(root.session.events.filter(e=>e.type==='user').length,0)
  assert.equal(f.manager.status().started,false)
  await f.manager.deliver({text:'fresh capture',isCurrentCapture:()=>true})
  assert.equal(root.last.content[0].text,'fresh capture')
  await f.manager.close()
})

test('upgrade waits for exact old owner release and restores the same persisted identity', async () => {
 const f=fixture({}, {controlWaitMs:100}),info=await f.manager.prepare(f.owner,'e')
 await f.manager.deliver({text:'history'});await f.manager.close()
 const old=f.persisted.get(info.id);f.registry.set(info.id,old)
 setTimeout(()=>f.registry.delete(info.id),15)
 const resumed=await f.manager.prepare(f.owner,'upgrade')
 assert.equal(resumed.id,info.id);assert.equal(resumed.restored,true)
 assert.equal(f.creates.length,1);assert.equal(f.resumes.length,1)
 assert.equal(f.registry.get(info.id).session.events.filter(e=>e.type==='user').length,1)
 await f.manager.dispose()
})

test('unowned live root remains blocked through safe stop; only registry release verifies stop', async () => {
 const f=fixture({}, {controlWaitMs:0}),info=await f.manager.prepare(f.owner,'e')
 await f.manager.deliver({text:'history'});await f.manager.close()
 const foreign=f.agent(info.id);f.registry.set(info.id,foreign)
 const drained=f.drained.length,disposed=f.disposed.length
 await assert.rejects(f.manager.prepare(f.owner,'upgrade'),{code:'VOICE_ROOT_OWNED_ELSEWHERE'})
 assert.equal(f.manager.status().fullyStopped,false)
 assert.equal(f.manager.status().recovery.kind,'live-root-conflict')
 await f.manager.close()
 await assert.rejects(f.manager.verifyStopped(),{code:'VOICE_ROOT_OWNED_ELSEWHERE'})
 assert.equal(f.registry.get(info.id),foreign);assert.equal(f.drained.length,drained);assert.equal(f.disposed.length,disposed)
 f.registry.delete(info.id);await f.manager.verifyStopped()
 assert.equal(f.manager.status().fullyStopped,true);assert.equal(f.manager.status().recovery.stopVerified,true)
 assert.equal((await f.manager.prepare(f.owner,'recovered')).id,info.id)
 assert.equal(f.manager.status().recovery.stopVerified,false)
 await f.manager.dispose()
})

test('stop verification checks other registered origins but does not touch unrelated live sessions', async () => {
 const f=fixture({}, {controlWaitMs:0}),info=await f.manager.prepare(f.owner,'e')
 await f.manager.deliver({text:'history'});await f.manager.close()
 const foreign=f.agent(info.id);f.registry.set(info.id,foreign)
 await assert.rejects(f.manager.verifyStopped(),{code:'VOICE_ROOT_OWNED_ELSEWHERE'})
 f.registry.delete(info.id);f.registry.set('unrelated',f.agent('unrelated'))
 await f.manager.verifyStopped();assert.ok(f.registry.has('unrelated'));await f.manager.dispose()
})
test('capability inspection uses the active voice route rather than a newly changed owner default',async()=>{
 const f=fixture({performanceMode:'fast'})
 await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'})
 const routes=[];f.llm.inspectExactEffort=async(provider,model)=>{routes.push([provider,model]);return {version:1,revision:'fixture-v1',protocol:'deepseek-messages-v1',budget:'total-output-including-reasoning',efforts:['off','low','high']}}
 f.owner.model.select({provider:'different',model:'new-default',reasoningEffort:'high'})
 const result=await f.manager.inspectPerformanceModes(f.owner)
 assert.equal(result.provider,'mock');assert.equal(result.model,'quality');assert.deepEqual(routes[0],['mock','quality'])
 await f.manager.dispose()
})

test('manual conversation route is revalidated before activation and never falls back',async()=>{
 const f=fixture({conversationModelMode:'manual',provider:'selected',model:'small'})
 f.llm.listProviders=()=>[{id:'selected',name:'Selected'}]
 f.llm.listModels=async()=>[{provider:'selected',id:'small',name:'Small'}]
 const info=await f.manager.prepare(f.owner,'e')
 assert.equal(info.provider,'selected');assert.equal(info.model,'small')
 await f.manager.deliver({text:'hello'})
 assert.equal(f.creates[0].agentOptions.provider,'selected')
 assert.equal(f.creates[0].agentOptions.model,'small')
 await f.manager.close()
 f.llm.listModels=async()=>[]
 await assert.rejects(f.manager.prepare(f.owner,'e2'),/不可用/)
 assert.equal(f.creates.length,1)
})
test('automatic conversation route snapshots initiating session at enable, ignoring stale overrides',async()=>{
 const f=fixture({conversationModelMode:'auto',provider:'old',model:'old'})
 f.owner.model.select({provider:'chosen',model:'current'})
 const info=await f.manager.prepare(f.owner,'e')
 assert.equal(info.provider,'chosen');assert.equal(info.model,'current')
 await f.manager.deliver({text:'hello'})
 assert.equal(f.creates[0].agentOptions.provider,'chosen')
 await f.manager.close()
})

test('history resolves only known persisted owner root after shutdown and fences policy changes',async()=>{
 const f=fixture()
 await f.manager.prepare(f.owner,'history-epoch');await f.manager.deliver({text:'record'})
 const root=f.manager.status().id
 let opened=0
 f.sessionPersistence.open=async(id,access)=>{assert.equal(id,root);assert.equal(access,'read');opened++;return{header:f.persisted.get(root).session.header,read:async()=>({events:[]}),close:async()=>{}}}
 const live=await f.manager.readVoiceHistory(f.owner)
 assert.equal(live.rootSessionId,root)
 await f.manager.close()
 const cold=await f.manager.readVoiceHistory(f.owner)
 assert.equal(cold.rootSessionId,root);assert.equal(cold.generation,live.generation)
 const stranger=f.agent('stranger');f.registry.set('stranger',stranger)
 assert.equal((await f.manager.readVoiceHistory(stranger)).rootSessionId,null)
 f.policyApi.captureDelegatedPolicyOverrides=()=>({approvalPolicy:'changed'})
 await assert.rejects(f.manager.readVoiceHistory(f.owner),/权限已改变/)
 assert.equal(opened,2)
})


test('voice instructions distinguish one successful acknowledgment from an explicitly requested repeat', async () => {
  const f = fixture({ speechTool: 'whale_voice_speak' })
  try {
    await f.manager.prepare(f.owner, 'e')
    await f.manager.deliver({ text: '测试编号730，只回复收到。' })
    const prompt = f.scopes[0].prompt.text
    assert.match(prompt, /A successful speech tool call already delivers that reply/)
    assert.match(prompt, /do not echo the spoken text in a final assistant message/)
    assert.match(prompt, /say it once and finish/i)
    assert.match(prompt, /A new user request to repeat is a new reply and may use the same words/)
    assert.match(prompt, /Use the whale_voice_speak tool for audible replies/)
  } finally { await f.manager.close() }
})


test('session status and performance inspection read current owned TTS residency without audio work', async () => {
 let state={supported:true,modelResident:true,blocked:false,compute:{path:'PRIVATE_PATH'},reason:'PRIVATE_LOG'}, reads=0
 const f=fixture({}, {getTtsResidency:()=>{reads++;return state}})
 try {
  assert.equal(f.manager.status().ttsResidency.status,'resident');assert.equal(reads,1)
  const inspected=await f.manager.inspectPerformanceModes(f.owner)
  assert.deepEqual(inspected.ttsResidency,f.manager.status().ttsResidency)
  assert.equal(inspected.ttsResidency.supported,true);assert.doesNotMatch(JSON.stringify(inspected.ttsResidency),/PRIVATE/)
  state={...state,modelResident:false}
  assert.equal(f.manager.status().ttsResidency.status,'not-resident')
  state={...state,modelResident:true,blocked:true}
  assert.equal((await f.manager.inspectPerformanceModes(f.owner)).ttsResidency.status,'blocked')
  assert.equal(f.creates.length,0);assert.equal(f.starts.length,0);assert.equal(f.drained.length,0)
 } finally { await f.manager.dispose() }
})

test('unavailable passive TTS reader cannot break session status or expose diagnostics', async () => {
 const f=fixture({}, {getTtsResidency:()=>{throw Error('PRIVATE_PATH')}})
 try {
  assert.equal(f.manager.status().ttsResidency.status,'unverified')
  assert.equal((await f.manager.inspectPerformanceModes(f.owner)).ttsResidency.supported,false)
  assert.doesNotMatch(JSON.stringify(f.manager.status().ttsResidency),/PRIVATE/)
 } finally { await f.manager.dispose() }
})


test('voice prompt allows short answers and reuses related workers without weakening speech or delegation limits',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'})
 const prompt=f.scopes[0].prompt.text
 for(const phrase of ['one or two short spoken sentences','Do not delegate such simple conversation','requests requiring research, tools, planning, or actual work','essential voice tools','Prefer the same owned worker','Do not create a duplicate worker just because an existing one is idle','unrelated, inaccessible, or non-resumable worker','Do NOT plan tasks','Preserve permissions and confirmations','voice_control resume'])assert.ok(prompt.toLowerCase().includes(phrase.toLowerCase()),phrase)
 assert.deepEqual(f.scopes[0].restriction.allow,['speak','voice_delegate','voice_message','voice_control','voice_status'])
 await f.manager.close()
})

test('resume sends bounded explicit continuation to the same owned worker without another activation',async()=>{
 const f=fixture(),info=await f.manager.prepare(f.owner,'e');await f.manager.deliver({text:'hello'});const voice=f.registry.get(info.id);await f.manager.delegate(voice,'task')
 for(const instruction of [undefined,'','   ','x'.repeat(32769)])await assert.rejects(f.manager.control(voice,'worker-1','resume',instruction),/user continuation instruction/)
 assert.equal(f.sends.length,0)
 for(const residence of ['idle','running','cold']){
   const worker=f.registry.get('worker-1');if(residence==='cold')f.registry.delete('worker-1');else worker.status=residence
   const result=await f.manager.control(voice,'worker-1','resume','继续这个任务，沿用刚才的调查结果。')
   assert.equal(result.accepted,true);assert.equal(result.continuationRequested,true);assert.equal(result.resumedWork,'not_verified');assert.equal(result.preservesUnclaimedQueue,true);assert.equal(result.sessionId,'worker-1');assert.equal(f.starts.length,1)
 }
 assert.equal(f.sends.length,3);assert.equal(f.interrupts.length,0)
 await assert.rejects(f.manager.control(f.owner,'worker-1','resume','继续'),/current voice root/)
 await assert.rejects(f.manager.control(voice,'unrelated','resume','继续'),/exact worker owned/)
 f.services.workspaceRegistry.archivedSessionIds.push('worker-1');await assert.rejects(f.manager.control(voice,'worker-1','resume','继续'),/archived/);assert.equal(f.sends.length,3)
 await f.manager.close()
})

test('additional prompt follows workspace context without changing system rules or tools and updates the same hidden root',async()=>{
 const f=fixture({customPrompt:'first {{literal}} preference'}),first=await f.manager.prepare(f.owner,'first');await f.manager.deliver({text:'hello'})
 const initial=f.scopes[0],voice=f.registry.get(first.id)
 assert.equal(initial.promptContext.name,'whale-voice:preferences');assert.equal(initial.promptContext.required,true);assert.equal(initial.promptContext.interpolate,false)
 assert.match(initial.promptContext.text,/first \{\{literal\}\} preference/)
 assert.doesNotMatch(initial.promptContext.text,/Do NOT plan tasks|one or two short spoken sentences/)
 assert.ok(initial.promptContext.text.length<240,'runtime snapshot carries preferences without repeating the main voice rules')
 assert.doesNotMatch(initial.prompt.text,/first \{\{literal\}\} preference/)
 assert.deepEqual(initial.restriction.allow,['speak','voice_delegate','voice_message','voice_control','voice_status']);assert.equal(voice.session.policy.approvalPolicy,'never')
 f.setConfig({customPrompt:'updated preference'});await assert.rejects(f.manager.deliver({text:'stale grant'}),/configuration changed/)
 await f.manager.close();const next=await f.manager.prepare(f.owner,'second');assert.equal(next.id,first.id);assert.match(f.scopes.at(-1).promptContext.text,/updated preference/);assert.doesNotMatch(f.scopes.at(-1).promptContext.text,/first \{\{literal/)
 await f.manager.close();f.setConfig({customPrompt:'  \n'});await f.manager.prepare(f.owner,'third');assert.match(f.scopes.at(-1).promptContext.text,/No additional voice preferences/);assert.doesNotMatch(f.scopes.at(-1).promptContext.text,/updated preference/);assert.match(f.scopes.at(-1).prompt.text,/Do NOT plan tasks/);await f.manager.close()
})

test('missing ordered context API refuses preparation before stopping an existing root',async()=>{
 const f=fixture(),prepared=await f.manager.prepare(f.owner,'one');await f.manager.deliver({text:'hello'})
 const before=f.drained.length;delete f.services.systemPrompt.context
 await assert.rejects(f.manager.prepare(f.owner,'two'),/systemPrompt.context/)
 assert.equal(f.drained.length,before);assert.equal(f.registry.has(prepared.id),true)
 await f.manager.close()
})
