/** Plugin-level offline tests. Fake helper is Node, never Python/mic/network. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { randomUUID } from 'node:crypto'
import { registerHooks } from 'node:module'
import { spawn as nativeSpawn } from 'node:child_process'
import { createTtsRuntime, createWindowsTtsAdapter, runTtsProcess, TTS_DEFAULTS } from '../voice-tts.mjs'
import { ownerSettings } from '../voice-ui-bridge.mjs'
import { edgePlaybackFixture, edgeSynthesisFixture } from './helpers/edge-playback-fixture.mjs'

async function eventually(predicate, label) {
  for (let n = 0; n < 150; n++) {
    if (predicate()) return
    await new Promise(resolve => setTimeout(resolve, 10))
  }
  assert.fail(`Timed out: ${label}`)
}

async function fixture(t, { authorized = true, efforts = ['off', 'low'], voiceSession, missing, cueSupport = false, turnSignals, requestProtocol = 'whale-request/1', captureProtocol, tts } = {}) {
  const home = mkdtempSync(join(tmpdir(), 'whale-integration-'))
  const dir = join(home, 'whale-ear')
  mkdirSync(dir)
  const helper = join(home, 'fake-helper.mjs')
  const commandFile = join(home, 'commands.jsonl')
  writeFileSync(helper, `
import { createInterface } from 'node:readline';
import { appendFileSync, readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
const emit = payload => process.stdout.write(JSON.stringify(payload) + '\\n');
appendFileSync(${JSON.stringify(join(home, 'helper-started'))}, 'started');
const pause = () => new Promise(resolve => setTimeout(resolve, 5));
while (existsSync(${JSON.stringify(join(home, 'helper-ready-block'))})) await pause();
emit({event:'ready', captureDeviceProtocol:'whale-capture-device/1', requestProtocol:${JSON.stringify(requestProtocol)}, pid:process.pid, python:'fake-node', asr:'fake', ...${JSON.stringify(captureProtocol ? {captureProtocol} : {})}, ...${JSON.stringify(cueSupport ? {turnSignals:{protocol:'whale-input-cue/1'}} : {})}});
let liveCapture=null, liveMode='ptt';
for await (const line of createInterface({input:process.stdin})) {
 const msg=JSON.parse(line);
 appendFileSync(${JSON.stringify(commandFile)}, JSON.stringify(msg)+'\\n');
 if (msg.op==='transcribe' || msg.op==='prosody') {
   while (existsSync(${JSON.stringify(join(home, 'audio-read-block'))})) await pause();
   if (msg.path===${JSON.stringify(join(home, 'synthetic-local-audio.wav'))}) { const bytes=readFileSync(msg.path); appendFileSync(${JSON.stringify(join(home, 'audio-reads.jsonl'))}, JSON.stringify({op:msg.op,bytes:bytes.length})+'\\n'); }
   if (msg.path==='crash') { process.exit(1); }
   const delay = msg.path==='slow' ? 80 : 5;
   emit({event:'error',message:'unsolicited background failure'});
   setTimeout(async () => {
     while (existsSync(${JSON.stringify(join(home, 'audio-result-block'))})) await pause();
     emit(msg.path==='fail'
     ? {event:'error',requestId:msg.requestId,message:'only this request failed'}
     : {event:msg.op==='transcribe'?'transcript':'prosody',requestId:msg.requestId,path:msg.path,text:msg.path});
   }, delay);
   continue;
 }
 if (msg.op==='start' && msg.awaitTranscript && existsSync(${JSON.stringify(join(home, 'listen-plan.json'))})) {
   const plan=JSON.parse(readFileSync(${JSON.stringify(join(home, 'listen-plan.json'))},'utf8'));
   const item=plan.shift(); writeFileSync(${JSON.stringify(join(home, 'listen-plan.json'))}, JSON.stringify(plan));
   emit({event:'started',requestId:msg.requestId});
   setTimeout(() => emit({event:'transcript',requestId:msg.requestId,text:item.text,mode:'ptt'}), item.delay);
   continue;
 }
 if(msg.op==='always' && msg.enabled && existsSync(${JSON.stringify(join(home, 'reject-always-on'))})) { emit({event:'error',requestId:msg.requestId,message:'PTT recording in progress'}); continue; }
 if(msg.op==='status' && existsSync(${JSON.stringify(join(home, 'fail-status'))})) { emit({event:'error', requestId:msg.requestId, message:'SYNTHETIC-PRIVATE-HELPER-ERROR'}); continue; }
 if(msg.op==='capture-status') { emit({event:'capture-status',requestId:msg.requestId,captureDevice:{state:'released'}}); continue; }
 if(msg.op==='quit') { emit({event:'bye',requestId:msg.requestId}); process.exit(0); }
 const event = {'always':'always', 'stop':'stopped', 'start':'started', 'ptt-status':'ptt-status', 'status':'status', 'always-status':'always-status'}[msg.op];
 if(msg.op==='cue' || msg.op==='cue-cancel') { emit({event:'cue',...msg,status:msg.op==='cue'?'played':'cancelled'}); continue; }
 if(!event) throw new Error('Unexpected helper command '+msg.op);
 if(msg.op==='always'){liveCapture=msg.captureId;liveMode=msg.enabled?(msg.mode??'always'):'ptt'}
 emit({event, requestId:msg.requestId, status:{enabled:liveMode!=='ptt',listenMode:liveMode,captureId:liveCapture,wake:{state:liveMode==='wake'?'starting':'disabled',deadlineAt:null,streamOpen:false,detection:'asr-after-utterance'}}, models:{loaded:[]}, voiceprints:{}, asr:'fake'});
 if(existsSync(${JSON.stringify(join(home, 'queued-events.json'))})) { const events=JSON.parse(readFileSync(${JSON.stringify(join(home, 'queued-events.json'))},'utf8')); unlinkSync(${JSON.stringify(join(home, 'queued-events.json'))}); for(const item of events) emit(item); }
 if(msg.op==='start' && existsSync(${JSON.stringify(join(home, 'next-transcript.json'))})) emit({...JSON.parse(readFileSync(${JSON.stringify(join(home, 'next-transcript.json'))}, 'utf8')), ...(msg.awaitTranscript ? {requestId:msg.requestId} : {})});
}
`)
  const configPath = join(dir, 'config.json')
  const config = { pythonPath: process.execPath, helperPath: helper, autoStart: false, pttMouse: 0, voiceSession: { enabled: true, visibility: 'hidden', handoffBackend: 'native_team', subagentApiProfile: 'source_flat_v1', ...voiceSession }, ...(turnSignals ? {turnSignals} : {}), ...(tts ? {tts} : {}) }
  writeFileSync(configPath, JSON.stringify(config))
  const calls = { resume: [], taskReads: [], taskLists: [], reserves: [], create: [], rootFollowup: [], rootSteer: [], drain: [], restrictions: [], guards: [], prompt: [], activation: [], send: [], interrupt: [], dispose: [], flush: [], speechCancel: [], ownerFollowup: [], ownerSteer: [], model: [], coldResume: [] }
  const residents = new Map(), parents = new Map(), registrations = new Map(), listeners = new Map(), services = new Map()
  const sessionObservers = new Set()
  const faults = {}
  const catalogs = new Map(), backendDomains = new Map()
  const identities = new Map(), archive = new Map(), boards = new Map(), presentations = new Map(), enabledTeams = new Set()
  function agent(id, model = { provider: 'fake-provider', model: 'fake-model', reasoningEffort: 'high' }) {
    const inbox = []; inbox.nextTurn = []; inbox.nextStep = []; inbox.clear = () => { inbox.nextTurn.length = 0; inbox.nextStep.length = 0 }
    return { id, session: { id, header: { id, createdAt: Date.now(), isSeeded: false } }, status: 'idle', inbox, model: { current: () => ({ ...model }), select: selected => { model = { ...selected } } }, whenIdle: async () => {}, followup: async msg => calls.ownerFollowup.push(msg), steer: async msg => calls.ownerSteer.push(msg) }
  }
  const owner = agent('owner-session')
  residents.set(owner.id, owner)
  const foreign = agent('foreign-session')
  residents.set(foreign.id, foreign)
  const scopedTools = {
    get: name => registrations.get(name) ?? (name === 'speak' ? { name } : undefined),
    setExecutor: executor => { calls.executor = executor },
    // Mirrors the verified Native exclusive-call contract. No model/runtime host.
    async executeBatch(input) {
      const results = []
      let concluded = false
      for (const call of input.calls) {
        if (input.signal.aborted) break
        const exec = { name: call.name, callId: call.id, rootCallId: call.id, arguments: JSON.parse(call.arguments),
          agent: input.agent, toolSet: input.toolSet, token: Symbol(call.id), signal: input.signal, concludeTurn() { concluded = true } }
        const caller = exec.signal
        // Native timeout wrappers derive a different signal for each call.
        exec.signal = AbortSignal.any([caller, new AbortController().signal])
        const value = await listeners.get('tools/execute')(exec, () => registrations.get(exec.name).execute(exec.arguments, exec))
        exec.signal = caller
        const result = { isError: false, value, content: [] }
        listeners.get('tools/result')(exec, result)
        results.push({ callId: call.id, result })
      }
      return { results, additionalContexts: [], concluded }
    },
    restrict: value => calls.restrictions.push(value),
    guard: callback => calls.guards.push(callback),
  }
  const systemPrompt = { section: spec => calls.prompt.push(spec), context: spec => calls.prompt.push(spec) }
  const agents = {
    get: id => residents.get(id),
    async create(options) {
      calls.create.push(options)
      const root = agent(options.sessionId, options.agentOptions)
      if (archive.has(root.id)) root.session.header = { ...archive.get(root.id).header }
      root.followup = async message => calls.rootFollowup.push({ root, message })
      root.steer = async message => calls.rootSteer.push({ root, message })
      const voiceCtx = { get: name => name === 'tools' ? scopedTools : name === 'systemPrompt' ? systemPrompt : undefined }
      const setup = await options.setup(voiceCtx, root)
      setup?.commit?.()
      residents.set(root.id, root)
      archive.set(root.id, root.session)
      return { agent: root, async dispose() { calls.dispose.push(root.id); residents.delete(root.id) } }
    },
  }
  agents.resume = async options => {
    calls.resume.push(options)
    const before = calls.create.length
    const handle = await agents.create({ ...options, sessionId: options.resumeSessionId })
    calls.create.splice(before, 1)
    return handle
  }
  const board = root => {
    if (!boards.has(root.id)) boards.set(root.id, [])
    return boards.get(root.id)
  }
  const agentTeams = {
    isEnabled: root => enabledTeams.has(root.id),
    async setEnabled(root, enabled) { if (faults.teamInitialize) throw new Error('Synthetic Team initialization failure'); if (enabled) enabledTeams.add(root.id) },
    listTasks(root) { calls.taskLists.push(root.id); return board(root) },
    getTask(root, id) { calls.taskReads.push({ root: root.id, id }); const task = board(root).find(x => x.id === id); if (!task) throw new Error('Task not in this root'); return task },
    async createTask(root, request) { if (faults.unconfirmedTasks) { for (let n = 0; n < faults.unconfirmedTasks; n++) board(root).push({ id: randomUUID(), revision: n + 1, status: 'pending', ...request }); throw Object.assign(new Error('PRIVATE-PERSISTENCE-CAUSE'), { code: 'TEAM_TASK_PERSISTENCE_UNCONFIRMED', cause: new Error('SECRET-STACK-CAUSE') }) } const task = { id: randomUUID(), revision: 1, status: 'pending', ...request }; board(root).push(task); return task },
    async updateTask() { throw new Error('Unexpected task mutation in integration fixture') },
  }
  const subagents = {
    rootOf: root => root,
    getProvider(name) {
      assert.equal(name, 'spawn')
      return { inheritsParentContext: false, prepareContinuable() {}, capabilities: { agentOptions: true, depthLimit: true } }
    },
    async startActivation(options) {
      calls.activation.push(options)
      if (faults.activation) throw new Error('PRIVATE-WORKER-START-CAUSE')
      const childId = options.childId ?? randomUUID()
      parents.set(childId, options.parent.id)
      residents.set(childId, agent(childId, options.agentOptions))
      return { childId, name: options.name ?? 'voice-worker', messageId: randomUUID(), result: Promise.resolve(), async dispose() { calls.dispose.push(childId); residents.delete(childId) } }
    },
    async sendMessage(source, targetId, content, options) {
      if (faults.sendError) throw faults.sendError
      assert.equal(residents.get(source.id), source, 'source must be exact live Agent')
      if (!residents.has(targetId)) {
        assert.ok(parents.has(targetId), 'cold target must be a known managed child')
        calls.coldResume.push(targetId)
        residents.set(targetId, agent(targetId))
      }
      calls.send.push({ source, targetId, content, options })
      return randomUUID()
    },
    async drainDescendants(roots) { calls.drain.push(roots.map(root => root.id)) },
    interrupt(id, source) { calls.interrupt.push({ id, source }) },
    async listDescendants(id) { return [...parents].filter(([, parent]) => parent === id).map(([child]) => ({ kind: 'child', id: child, parentId: id, depth: 1 })) },
  }
  const llm = { async resolveModelInfo(provider, model, signal) { calls.model.push({ provider, model, signal }); return { reasoning: { efforts: efforts.map(id => ({ id })) } } } }
  const ctx = {
    agents,
    agentTeams,
    storage: { domain: { async open(spec) {
      if (spec.name.startsWith('whale_handoff_')) {
        let tables = backendDomains.get(spec.name); if (!tables) { tables = new Map(Object.keys(spec.tables).map(name => [name,new Map()])); backendDomains.set(spec.name,tables) }
        return { table: name => { const records=tables.get(name); return { get:key=>records.get(key),entries:()=>records.entries(),async put(key,value){records.set(key,spec.tables[name].valueSchema.parse(value))} } },async close(){} }
      }
      const tableName = spec.name === 'whale_voice_catalog' ? 'roots' : 'origins'
      const records = tableName === 'roots' ? catalogs : identities
      const shape = spec.tables[tableName].valueSchema
      const table = {
        get: key => records.get(key), entries: () => records.entries(),
        async put(key, value) { records.set(key, shape.parse(value)) },
        async update(key, updater) { const value = shape.parse(updater(records.get(key))); records.set(key, value); return structuredClone(value) },
      }
      return { table: name => { assert.equal(name, tableName); return table }, async close() {} }
    } } },
    sessionPersistence: { async flush() { if (faults.sessionFlush) throw new Error('Synthetic session flush failure') }, async stat(id) { return archive.has(id) ? { header: archive.get(id).header } : null } },
    workspaceRegistry: { archivedSessionIds: [], sessionPresentation: { apiVersion: 1, async reserve(id, options) { calls.reserves.push({ id, options }); presentations.set(id, options) }, get: id => presentations.get(id) } },
    subagents,
    llm,
    sessions: { flush(session) { calls.flush.push(session.id) } },
    systemPrompt,
    tools: { ...scopedTools, register(definition) { registrations.set(definition.name, definition); return () => registrations.delete(definition.name) } },
    get(name) { return services.get(name) ?? this[name] },
    provide(name, value) { services.set(name, value) },
    on(name, callback) {
      if (name === 'session/event') {
        sessionObservers.add(callback)
        listeners.set(name, (...args) => { for (const observe of sessionObservers) observe(...args) })
        return () => sessionObservers.delete(callback)
      }
      listeners.set(name, callback)
      return () => listeners.delete(name)
    },
    effect(callback) { callback() },
  }
  if (missing === 'rootOf') delete ctx.subagents.rootOf
  else if (missing === 'presentation') delete ctx.workspaceRegistry.sessionPresentation
  else if (missing) delete ctx[missing]
  services.set('dstuberVoice', { cancel(reason) { calls.speechCancel.push(reason) } })
  // Replace only the policy helper package, never host implementation files.
  const policyUrl = 'data:text/javascript,' + encodeURIComponent(`
    import assert from 'node:assert/strict';
function schema(parse) {
  const rule = predicate => schema(value => { const result = parse(value); assert.ok(predicate(result), 'schema rejected record'); return result })
  return {
    parse,
    min: min => rule(value => typeof value === 'number' ? value >= min : value.length >= min),
    max: max => rule(value => typeof value === 'number' ? value <= max : value.length <= max),
    regex: pattern => rule(value => pattern.test(value)), int: () => rule(Number.isSafeInteger),
    optional: () => schema(value => value === undefined ? undefined : parse(value)),
    refine: predicate => rule(predicate),
  }
}
export const z = {
  custom: predicate => schema(value => { assert.ok(predicate(value)); return value }),
  literal: expected => schema(value => { assert.equal(value,expected); return value }),
  string: () => schema(value => { assert.equal(typeof value, 'string'); return value }),
  number: () => schema(value => { assert.equal(typeof value, 'number'); assert.ok(Number.isFinite(value)); return value }),
  enum: values => schema(value => { assert.ok(values.includes(value)); return value }),
  object: fields => {
    let strict = false
    const result = schema(value => {
      assert.ok(value && !Array.isArray(value) && typeof value === 'object')
      if (strict) assert.ok(Object.keys(value).every(key => Object.hasOwn(fields, key)))
      const parsed = {}
      for (const [key, validator] of Object.entries(fields)) {
        const item = validator.parse(value[key]); if (item !== undefined) parsed[key] = item
      }
      return parsed
    })
    result.strict = () => { strict = true; return result }
    return result
  },
}
    export const defineDomain = value => value;
    export const domainTable = valueSchema => ({valueSchema});
    export class NativeToolExecutor { constructor(ctx) { this.ctx = ctx } execute(input) { return this.ctx.get('tools').executeBatch(input) } }
    export function captureDelegatedPolicyOverrides(owner) { return { testOrigin: owner.id } }
    export function appendDelegatedPolicyOverrides(session, policy) { session.testPolicy = policy }
  `)
  const spawned = []
  const spawnKey = `__whale_test_spawn_${randomUUID()}`
  globalThis[spawnKey] = (...args) => {
    const process = nativeSpawn(...args)
    const closed = new Promise(resolve => process.once('close', resolve))
    spawned.push({ process, closed })
    return process
  }
  const spawnUrl = 'data:text/javascript,' + encodeURIComponent(`export const spawn = globalThis[${JSON.stringify(spawnKey)}]`)
  const hooks = registerHooks({ resolve(specifier, context, next) {
    if (specifier === 'node:child_process' && context.parentURL?.includes('/index.mjs?test=')) return { url: spawnUrl, shortCircuit: true }
    if (['@deepseek-ai/dsh-subagent', '@deepseek-ai/dsh-tool-executor-native', '@deepseek-ai/dsh-storage-domain', 'zod'].includes(specifier)) return { url: policyUrl, shortCircuit: true }
    return next(specifier, context)
  } })
  const previousHome = process.env.DSH_HOME
  process.env.DSH_HOME = home
  let plugin
  try { plugin = await import(`${pathToFileURL(join(import.meta.dirname, '..', 'index.mjs'))}?test=${randomUUID()}`) }
  finally { if (previousHome === undefined) delete process.env.DSH_HOME; else process.env.DSH_HOME = previousHome }
  plugin.apply(ctx, { autoStart: false })
  const instance = globalThis.__dshWhaleEar__
  assert.ok(instance, 'plugin booted')
  if(authorized){const authorization=instance.uiBridge.readAuthorization();await instance.uiBridge.saveAuthorization({revision:authorization.revision,grant:true})}
  const readConfig = () => JSON.parse(readFileSync(configPath, 'utf8'))
  const commands = () => existsSync(commandFile) ? readFileSync(commandFile, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : []
  async function invokeRaw(name, args, caller = owner, signal = new AbortController().signal) {
    const definition = registrations.get(name)
    assert.ok(definition, `tool ${name} registered`)
    return definition.execute(args, { agent: caller, signal })
  }
  // Existing lifecycle cases explicitly exercise the human-approval path. New
  // authorization regressions use invokeRaw and never auto-approve a tool result.
  async function invoke(name, args, caller = owner) {
    const result = await invokeRaw(name, args, caller)
    if (name !== 'voice_listen' || !['enable', 'always-on'].includes(args.action)) return result
    let pending
    try { pending = JSON.parse(result) } catch { return result }
    if (pending.status !== 'confirmation-required') return result
    const outcome = await instance.uiBridge.decideAgentRequest({
      id: pending.request.id, approve: true,
      acknowledgements: pending.request.acknowledgements.map(item => item.id),
    }, owner, new AbortController().signal)
    return outcome.state === 'completed' ? JSON.stringify(outcome.result) : '❌ ' + outcome.error?.message
  }
  const status = async () => (await instance.ear.status()).voiceSession
  const transcript = (extra = {}) => ({ text: 'synthetic transcript', mode: 'ptt', speaker_ok: false, voiceSessionId: owner.id, voiceSessionEpoch: readConfig().voiceSessionEpoch, traceId: '0123456789abcdef', ...extra })
  t.after(async () => {
    instance.dispose()
    // Await actual pipe/process closure, not a quit command which may lose an
    // exit race or be skipped when an already-broken helper must be killed.
    await Promise.all(spawned.map(async ({ closed }) => {
      let timer
      try { await Promise.race([closed, new Promise((_, reject) => { timer=setTimeout(()=>reject(new Error('fake helper did not close')),4000) })]) }
      finally { clearTimeout(timer) }
    }))
    hooks.deregister()
    delete globalThis[spawnKey]
    rmSync(home, { recursive: true, force: true })
  })
  return { agents, faults, boards, identities, home, instance, calls, residents, owner, foreign, registrations, listeners, services, commands, readConfig, invoke, invokeRaw, status, transcript, spawned }
}

test('plugin reserves independent root; first transcript starts it; subsequent turns stay on root', async t => {
  const f = await fixture(t)
  for (const name of ['voice_listen', 'voice_status', 'voice_delegate', 'voice_message', 'voice_control']) assert.ok(f.registrations.has(name))
  assert.equal(f.readConfig().speakerVerification.enabled, false)
  assert.equal(f.readConfig().voiceSession.enabled, true)
  const reply = await f.invoke('voice_listen', { action: 'enable' })
  assert.doesNotMatch(reply, /❌/)
  const reserved = await f.status()
  assert.equal(reserved.started, false)
  assert.equal(reserved.reasoningEffort, 'off')
  assert.equal(f.calls.create.length, 0, 'enable must not create an agent or send a greeting/model prompt')
  assert.equal(f.calls.activation.length, 0)
  assert.equal(f.readConfig().voiceSessionId, f.owner.id)
  assert.equal(reserved.epoch, f.readConfig().voiceSessionEpoch)
  assert.deepEqual(f.commands().slice(0, 4).map(x => x.op), ['ptt-status', 'status', 'always-status', 'ptt-status'])
  assert.equal(await f.instance.ear.deliver(f.transcript()), true, 'speaker failure ignored while experimental feature off')
  assert.equal(f.calls.create.length, 1)
  assert.equal(f.calls.activation.length, 0, 'voice entry is not a managed subagent')
  const creation = f.calls.create[0]
  assert.equal(creation.sessionId, reserved.id)
  assert.equal(creation.meta?.parentSession, undefined)
  assert.equal(creation.meta?.origin, undefined)
  assert.equal(creation.seed, undefined)
  assert.equal(creation.agentOptions.reasoningEffort, 'off')
  assert.match(f.calls.rootFollowup[0].message.content[0].text, /synthetic transcript/)
  assert.equal(f.instance.uiBridge.readConversation(f.owner).items[0].id, f.calls.rootFollowup[0].message.id, 'live and persisted history use the same native input identity')
  assert.equal(f.calls.ownerFollowup.length, 0)
  assert.equal(f.calls.ownerSteer.length, 0)
  assert.equal(f.owner.model.current().reasoningEffort, 'high', 'owner thinking settings unchanged')
  assert.deepEqual(f.residents.get(reserved.id).session.testPolicy, { testOrigin: f.owner.id })
  assert.ok(f.calls.restrictions[0].allow.includes('voice_delegate'))
  assert.ok(!f.calls.restrictions[0].allow.includes('shell'))
  assert.match(f.calls.prompt[0].text, /Do NOT plan tasks/)
  assert.equal(await f.instance.ear.deliver(f.transcript({ text: 'second synthetic turn' })), true)
  assert.equal(f.calls.create.length, 1)
  assert.equal(f.calls.activation.length, 0)
  assert.equal(f.calls.send.length, 0, 'voice turns do not take subagent sendMessage/cold-resume path')
  assert.equal(f.calls.rootSteer.at(-1).root.id, reserved.id)
  assert.equal(f.readConfig().voiceSessionId, f.owner.id)
  assert.equal((await f.status()).id, reserved.id)
})

test('delegate/message wrappers use official manager route and deny workers, foreign and forged callers', async t => {
  const f = await fixture(t)
  await f.invoke('voice_listen', { action: 'enable' })
  await f.instance.ear.deliver(f.transcript())
  const state = await f.status(), child = f.residents.get(state.id)
  const control = f.services.get('whaleVoiceSession')
  assert.equal(control.allowed(child.id), true)
  assert.equal(control.allowed(f.owner.id), true, 'origin retains control and explicit speaking permission')
  const guard = f.calls.guards[0]
  assert.equal(guard({ agent: child, name: 'whale_voice_speak' }), undefined)
  assert.match(guard({ agent: child, name: 'speak' }), /delegate/)
  assert.match(guard({ agent: child, name: 'shell' }), /delegate/)
  assert.equal(control.allowed(f.foreign.id), false)
  const delegation = JSON.parse(await f.invoke('voice_delegate', { prompt: 'Synthetic offline delegated work' }, child))
  const worker = f.residents.get(delegation.sessionId)
  assert.equal(f.calls.activation.at(-1).parent, child)
  assert.equal(f.calls.activation.at(-1).delivery, 'parent')
  assert.equal(f.calls.activation.at(-1).agentOptions.reasoningEffort, 'high')
  assert.equal(control.allowed(worker.id), false)
  const toOwner = JSON.parse(await f.invoke('voice_message', { target: 'owner', text: 'Synthetic status' }, child))
  assert.equal(toOwner.sessionId, f.owner.id)
  assert.equal(f.calls.ownerSteer.at(-1).source.sourceSessionId, child.id)
  const toVoice = JSON.parse(await f.invoke('voice_message', { target: 'voice', text: 'Synthetic context' }))
  assert.equal(toVoice.sessionId, child.id)
  assert.equal(f.calls.rootSteer.at(-1).message.source.sourceSessionId, f.owner.id)
  for (const caller of [f.foreign, worker, { ...child }]) {
    assert.match(await f.invoke('voice_delegate', { prompt: 'forbidden' }, caller), /❌/)
    assert.match(await f.invoke('voice_message', { target: 'owner', text: 'forbidden' }, caller), /❌/)
  }
  assert.match(await f.invoke('voice_message', { target: f.foreign.id, text: 'forbidden' }, child), /❌/)
})

test('disable/re-enable restores same root but rejects old authorization epoch', async t => {
  const f = await fixture(t)
  await f.invoke('voice_listen', { action: 'enable' })
  await f.instance.ear.deliver(f.transcript())
  const old = await f.status(), oldTranscript = f.transcript()
  assert.doesNotMatch(await f.invoke('voice_listen', { action: 'disable' }), /❌/)
  assert.equal(f.readConfig().voiceSessionId, null)
  assert.equal(f.services.get('whaleVoiceSession').allowed(old.id), false)
  assert.equal(await f.instance.ear.deliver(oldTranscript), false)
  assert.ok(f.calls.drain.some(ids => ids.includes(old.id)))
  assert.ok(f.calls.dispose.includes(old.id))
  await f.invoke('voice_listen', { action: 'enable' })
  const next = await f.status()
  assert.equal(next.id, old.id)
  assert.equal(next.persistence.restored, true)
  assert.equal(f.calls.resume.length, 1)
  assert.notEqual(next.epoch, old.epoch)
  assert.equal(f.services.get('whaleVoiceSession').allowed(old.id), true)
  assert.equal(await f.instance.ear.deliver(oldTranscript), false)
  assert.equal(f.calls.create.length, 1, 're-enable and rejected results must not start another model turn')
  assert.equal(await f.instance.ear.deliver(f.transcript()), true)
  assert.equal(f.calls.resume[0].resumeSessionId, next.id)
})

test('unadvertised off keeps selected provider/model and defers effort to provider default', async t => {
  const f = await fixture(t, { efforts: ['high'] })
  assert.doesNotMatch(await f.invoke('voice_listen', { action: 'enable' }), /❌/)
  assert.equal(f.readConfig().voiceSessionId, f.owner.id)
  const mode = (await f.status()).routing.voiceMode
  assert.equal(mode.requestedEffort, 'off')
  assert.equal(mode.selectedEffort, null)
  assert.equal(mode.selectionReason, 'provider_default_unverified')
  assert.equal(mode.providerEnforcement, 'not_verified')
  assert.equal(f.calls.activation.length, 0)
  assert.equal(await f.instance.ear.deliver(f.transcript()), true)
  assert.equal(f.calls.create[0].agentOptions.reasoningEffort, undefined)
  assert.equal(f.calls.create[0].agentOptions.provider, 'fake-provider')
  assert.equal(f.calls.create[0].agentOptions.model, 'fake-model')
})

test('voice_listen rejects forged executor identity for enable and microphone controls', async t => {
  const f = await fixture(t)
  const forged = { ...f.owner, session: { id: f.owner.id } }
  assert.match(await f.invoke('voice_listen', { action: 'enable' }, forged), /❌/)
  assert.equal(f.calls.model.length, 0)
  await f.invoke('voice_listen', { action: 'enable' })
  const before = f.commands().length
  assert.match(await f.invoke('voice_listen', { action: 'start' }, forged), /❌/)
  assert.equal(f.commands().length, before, 'forged identity must not send a microphone command')
  assert.match(await f.invoke('voice_listen', { action: 'disable' }, forged), /❌/)
  assert.equal(f.readConfig().voiceSessionId, f.owner.id)
})


test('fake helper stdout transcript flows through parser to independent voice root', async t => {
  const f = await fixture(t)
  assert.doesNotMatch(await f.invoke('voice_listen', { action: 'enable' }), /❌/)
  const reserved = await f.status()
  writeFileSync(join(f.home, 'next-transcript.json'), JSON.stringify({
    event: 'transcript', ...f.transcript({ text: 'helper protocol synthetic utterance' }),
    timings: { asrMs: 3, processingMs: 5, stopToTranscriptMs: 6 },
  }))
  assert.doesNotMatch(await f.invoke('voice_listen', { action: 'start' }), /❌/)
  await eventually(() => f.calls.rootFollowup.length === 1, 'stdout transcript root delivery')
  assert.equal(f.calls.create[0].sessionId, reserved.id)
  assert.match(f.calls.rootFollowup[0].message.content[0].text, /helper protocol synthetic utterance/)
  assert.equal(f.calls.ownerFollowup.length, 0)
  const info = await f.instance.ear.status()
  assert.equal(info.delivery.delivered, 1)
  assert.equal(info.latency.asrMs, 3)
  assert.equal(info.latency.traceId, '0123456789abcdef')
  assert.equal(f.calls.activation.length, 0)
})


async function controlledWorker(f) {
  assert.doesNotMatch(await f.invoke('voice_listen', { action: 'enable' }), /❌/)
  assert.equal(await f.instance.ear.deliver(f.transcript()), true)
  const root = f.residents.get((await f.status()).id)
  const delegated = JSON.parse(await f.invoke('voice_delegate', { prompt: 'Synthetic worker for control regression' }, root))
  return { root, worker: f.residents.get(delegated.sessionId) }
}

test('voice_control routes status/correction/stop and reports actual loop state without rollback claims', async t => {
  const f = await fixture(t)
  const { root, worker } = await controlledWorker(f)
  assert.ok(f.calls.restrictions[0].allow.includes('voice_control'))
  assert.equal(f.calls.guards[0]({ agent: root, name: 'voice_control' }), undefined)
  worker.status = 'running'
  worker.inbox.push({ id: 'pending-work', text: 'Unclaimed queued work' })
  const pending = [...worker.inbox]
  const status = JSON.parse(await f.invoke('voice_control', { target: worker.id, action: 'status' }, root))
  assert.equal(status.sessionId, worker.id)
  assert.equal(status.action, 'status')
  assert.equal(status.state, 'running')
  assert.equal(status.resident, true)
  assert.equal(status.scope, 'agent_loop')
  assert.equal(status.externalEffects, 'not_verified_or_rolled_back')
  assert.equal(f.calls.interrupt.length, 0)
  const correction = 'User says: correct the test output format only.'
  const steered = JSON.parse(await f.invoke('voice_control', { target: worker.id, action: 'steer', instruction: correction }, root))
  assert.equal(steered.action, 'steer')
  assert.equal(steered.accepted, true)
  assert.equal(steered.correctionApplied, 'not_verified')
  assert.equal(steered.state, 'running')
  assert.equal(f.calls.send.at(-1).source, root)
  assert.equal(f.calls.send.at(-1).targetId, worker.id)
  assert.deepEqual(f.calls.send.at(-1).content, [{ type: 'text', text: correction }])
  assert.equal(f.calls.send.at(-1).options.signal.aborted, false)
  let waits = 0
  worker.whenIdle = async () => { waits++; worker.status = 'idle' }
  const stopped = JSON.parse(await f.invoke('voice_control', { target: worker.id, action: 'stop', instruction: 'User says: stop that worker now.' }, root))
  assert.equal(stopped.action, 'stop')
  assert.equal(stopped.sessionId, worker.id)
  assert.equal(stopped.cancellationRequested, true)
  assert.equal(stopped.state, 'idle')
  assert.equal(stopped.pendingWorkMayRemain, true)
  assert.equal(stopped.scope, 'agent_loop')
  assert.equal(stopped.externalEffects, 'not_verified_or_rolled_back')
  assert.equal(waits, 1)
  assert.deepEqual(f.calls.interrupt.at(-1), { id: worker.id, source: { kind: 'ancestor', agent: root } })
  assert.deepEqual([...worker.inbox], pending, 'stop admission must not imply queued work or external effects were undone')
})

test('voice_control denies foreign/self/origin/forged targets and non-root/forged callers', async t => {
  const f = await fixture(t)
  const { root, worker } = await controlledWorker(f)
  const before = { sends: f.calls.send.length, interrupts: f.calls.interrupt.length }
  for (const target of [f.foreign.id, root.id, f.owner.id, 'fabricated-worker-id', { id: worker.id }]) {
    for (const action of ['status', 'steer', 'resume', 'stop']) {
      assert.match(await f.invoke('voice_control', { target, action, ...(action === 'status' ? {} : { instruction: 'User-requested action' }) }, root), /❌/)
    }
  }
  for (const caller of [f.owner, f.foreign, worker, { ...root }, { id: root.id, session: { id: root.id } }]) {
    assert.match(await f.invoke('voice_control', { target: worker.id, action: 'status' }, caller), /❌/)
    assert.match(await f.invoke('voice_control', { target: worker.id, action: 'stop', instruction: 'User asks to stop' }, caller), /❌/)
  }
  assert.equal(f.calls.send.length, before.sends)
  assert.equal(f.calls.interrupt.length, before.interrupts)
})

test('voice_control requires explicit instructions and distinguishes missing or still-running workers', async t => {
  const f = await fixture(t)
  const { root, worker } = await controlledWorker(f)
  for (const action of ['steer', 'resume', 'stop']) {
    for (const instruction of [undefined, '', '   ', 42]) {
      assert.match(await f.invoke('voice_control', { target: worker.id, action, instruction }, root), /❌/)
    }
  }
  assert.match(await f.invoke('voice_control', { target: worker.id, action: 'status', instruction: 'unexpected' }, root), /❌/)
  assert.match(await f.invoke('voice_control', { target: worker.id, action: 'restart' }, root), /❌/)
  assert.equal(f.calls.send.length, 0)
  assert.equal(f.calls.interrupt.length, 0)
  worker.status = 'running'
  worker.whenIdle = async () => {} // Deliberately does not claim that the loop became idle.
  const stopping = JSON.parse(await f.invoke('voice_control', { target: worker.id, action: 'stop', instruction: 'Stop on the user request' }, root))
  assert.equal(stopping.state, 'cancellation_requested')
  assert.equal(stopping.cancellationRequested, true)
  assert.equal(stopping.pendingWorkMayRemain, true)
  assert.equal(stopping.externalEffects, 'not_verified_or_rolled_back')
  f.residents.delete(worker.id)
  const missing = JSON.parse(await f.invoke('voice_control', { target: worker.id, action: 'status' }, root))
  assert.equal(missing.state, 'not_running')
  assert.equal(missing.resident, false)
  const count = f.calls.interrupt.length
  const stopped = JSON.parse(await f.invoke('voice_control', { target: worker.id, action: 'stop', instruction: 'Stop if still active' }, root))
  assert.equal(stopped.state, 'not_running')
  assert.equal(stopped.cancellationRequested, false)
  assert.equal(stopped.pendingWorkMayRemain, true)
  assert.equal(f.calls.interrupt.length, count)
})


test('required persistence, Team and hidden-host capabilities fail closed before microphone grant', async t => {
  for (const missing of ['storage', 'agentTeams', 'rootOf', 'presentation', 'workspaceRegistry', 'sessionPersistence']) {
    await t.test(missing, async subtest => {
      const f = await fixture(subtest, { missing })
      const result = await f.invoke('voice_listen', { action: 'enable' })
      assert.equal(JSON.parse(result).ok, false)
      if (['agentTeams','rootOf'].includes(missing)) assert.match(result, /Published 0.2.2-rc.1/)
      if (missing === 'presentation') assert.match(result, /VOICE_HIDDEN_UNSUPPORTED/)
      assert.equal(existsSync(join(f.home, 'helper-started')), false, 'cold failed capability preflight must not spawn a helper')
      assert.equal(f.readConfig().voiceSessionId, null)
      assert.equal(f.calls.create.length, 0)
      assert.equal(f.calls.resume.length, 0)
      assert.equal(f.calls.activation.length, 0)
      assert.ok(!f.commands().some(command => command.op === 'start' || command.op === 'always' && command.enabled === true))
    })
  }
})

test('voice_status task summaries are private to exact current root and origin; generic status contains no tasks', async t => {
  const f = await fixture(t)
  const { root } = await controlledWorker(f)
  const secret = 'PRIVATE-HANDOFF-SUMMARY-ONLY'
  f.boards.set(root.id, [{ id: 'task-secret', revision: 4, subject: 'Private task subject', status: 'in_progress', description: secret, ownerId: 'absent-worker' }])
  const before = f.calls.taskLists.length
  const generic = JSON.stringify(await f.instance.ear.status())
  assert.doesNotMatch(generic, /PRIVATE-HANDOFF|task-secret|Private task subject/)
  assert.equal(f.calls.taskLists.length, before)
  for (const caller of [f.foreign, { ...root }, { ...f.owner }, null]) {
    const output = await f.invoke('voice_status', { taskId: 'task-secret' }, caller)
    assert.doesNotMatch(output, /PRIVATE-HANDOFF|task-secret|Private task subject/)
    assert.match(output, /仅当前语音入口或授权来源/)
  }
  assert.equal(f.calls.taskLists.length, before)
  assert.ok(!f.calls.taskReads.some(x => x.id === 'task-secret'))
  for (const caller of [root, f.owner]) {
    const output = await f.invoke('voice_status', { taskId: 'task-secret' }, caller)
    assert.match(output, /PRIVATE-HANDOFF-SUMMARY-ONLY/)
    assert.match(output, /保存=in_progress/)
    assert.match(output, /后台=not_running/)
    assert.match(output, /隐藏（已确认宿主支持）/)
    assert.match(output, /身份已持久保存/)
  }
  assert.deepEqual(f.calls.taskReads.slice(-2), [{ root: root.id, id: 'task-secret' }, { root: root.id, id: 'task-secret' }])
  assert.equal(f.readConfig().voiceSession.visibility, 'hidden')
  assert.deepEqual(f.calls.reserves[0], { id: root.id, options: { purpose: 'voice', visibility: 'hidden' } })
})

test('voice_status forwards explicit task/cursor and bounds summaries to eight rows and 512 characters', async t => {
  const f = await fixture(t)
  const { root } = await controlledWorker(f)
  f.boards.set(root.id, Array.from({ length: 10 }, (_, n) => ({ id: `page-task-${n}`, revision: 1, subject: `Task row ${n}`, status: 'pending', description: `summary-${n}:` + 'x'.repeat(600) + 'SHOULD-NOT-BE-DISCLOSED-TAIL' })))
  const first = await f.invoke('voice_status', {}, root)
  assert.match(first, /任务交接: 8 项/)
  assert.match(first, /下页 cursor=8/)
  assert.doesNotMatch(first, /page-task-8|page-task-9|SHOULD-NOT-BE-DISCLOSED-TAIL/)
  const summary = first.split('\n').find(line => line.startsWith('summary-0:'))
  assert.equal(summary.replace('（摘要已截短）', '').length, 512)
  assert.match(summary, /摘要已截短/)
  const second = await f.invoke('voice_status', { cursor: 8 }, f.owner)
  assert.match(second, /任务交接: 2 项/)
  assert.match(second, /page-task-8/)
  assert.match(second, /page-task-9/)
  assert.doesNotMatch(second, /page-task-0|下页 cursor=/)
  const exact = await f.invoke('voice_status', { taskId: 'page-task-7' }, root)
  assert.match(exact, /任务交接: 1 项/)
  assert.match(exact, /page-task-7/)
  assert.doesNotMatch(exact, /page-task-6|page-task-8/)
  assert.deepEqual(f.calls.taskReads.at(-1), { root: root.id, id: 'page-task-7' })
  const invalid = await f.invoke('voice_status', { taskId: 'page-task-7', cursor: 8 }, root)
  assert.match(invalid, /本次读取未完成/)
  assert.doesNotMatch(invalid, /summary-7/)
})

test('new-root status does not materialize; origin switch isolates saved roots and task contents', async t => {
  const f = await fixture(t)
  await f.invoke('voice_listen', { action: 'enable' })
  const unstarted = await f.invoke('voice_status', {}, f.owner)
  assert.match(unstarted, /尚未建立语音根/)
  assert.equal(f.calls.create.length, 0)
  assert.equal(f.calls.activation.length, 0)
  await f.instance.ear.deliver(f.transcript())
  const first = await f.status()
  f.boards.set(first.id, [{ id: 'origin-a-private', revision: 1, subject: 'Origin A private task', description: 'ORIGIN-A-SECRET', status: 'pending' }])
  assert.doesNotMatch(await f.invoke('voice_listen', { action: 'enable' }, f.foreign), /❌/)
  const other = await f.status()
  assert.notEqual(other.id, first.id)
  assert.equal(other.ownerSessionId, f.foreign.id)
  assert.equal(await f.instance.ear.deliver(f.transcript({ voiceSessionId: f.foreign.id })), true)
  assert.doesNotMatch(await f.invoke('voice_status', { taskId: 'origin-a-private' }, f.foreign), /ORIGIN-A-SECRET|Origin A private task/)
  assert.doesNotMatch(await f.invoke('voice_status', {}, f.owner), /ORIGIN-A-SECRET/)
  assert.doesNotMatch(await f.invoke('voice_listen', { action: 'enable' }, f.owner), /❌/)
  const restored = await f.status()
  assert.equal(restored.id, first.id)
  assert.equal(restored.persistence.restored, true)
  assert.equal(f.calls.resume.at(-1).resumeSessionId, first.id)
  assert.match(await f.invoke('voice_status', { taskId: 'origin-a-private' }, f.owner), /ORIGIN-A-SECRET/)
  assert.equal(f.calls.activation.length, 0, 'restoration never restarts saved tasks')
})


test('tasks-only status never starts the audio helper on a fresh plugin', async t => {
  const f = await fixture(t)
  const result = await f.invoke('voice_status', { scope: 'tasks' })
  assert.match(result, /任务交接:/)
  assert.doesNotMatch(result, /帮工:|设备:|ASR:/)
  assert.deepEqual(f.commands(), [])
  assert.equal(existsSync(join(f.home, 'helper-started')), false)
  assert.equal(f.calls.create.length, 0)
  assert.equal(f.calls.activation.length, 0)
})

test('tasks-only reads authorized summaries without helper commands and still denies foreign/spoofed callers', async t => {
  const f = await fixture(t)
  const { root } = await controlledWorker(f)
  f.boards.set(root.id, [{ id: 'task-offline', revision: 2, subject: 'Offline task', description: 'TASKS-ONLY-PRIVATE-CONTENT', status: 'pending' }])
  const commands = f.commands().length
  for (const caller of [root, f.owner]) {
    assert.match(await f.invoke('voice_status', { scope: 'tasks', taskId: 'task-offline' }, caller), /TASKS-ONLY-PRIVATE-CONTENT/)
  }
  const reads = f.calls.taskReads.length, lists = f.calls.taskLists.length
  for (const caller of [f.foreign, { ...root }, { ...f.owner }]) {
    const result = await f.invoke('voice_status', { scope: 'tasks', taskId: 'task-offline' }, caller)
    assert.doesNotMatch(result, /TASKS-ONLY-PRIVATE-CONTENT|task-offline|Offline task/)
    assert.match(result, /仅当前语音入口或授权来源/)
  }
  assert.equal(f.calls.taskReads.length, reads)
  assert.equal(f.calls.taskLists.length, lists)
  assert.equal(f.commands().length, commands)
})

test('all scope retains safe task summaries after a helper protocol error', async t => {
  const f = await fixture(t)
  const { root } = await controlledWorker(f)
  f.boards.set(root.id, [{ id: 'task-after-error', revision: 3, subject: 'Task still available', description: 'SAFE-AUTHORIZED-TASK-SUMMARY', status: 'in_progress' }])
  writeFileSync(join(f.home, 'fail-status'), 'fail only audio status')
  const output = await f.invoke('voice_status', { scope: 'all', taskId: 'task-after-error' }, f.owner)
  assert.match(output, /音频设备状态: 读取未完成/)
  assert.match(output, /SAFE-AUTHORIZED-TASK-SUMMARY/)
  assert.match(output, /task-after-error r3/)
  assert.doesNotMatch(output, /SYNTHETIC-PRIVATE-HELPER-ERROR|帮工: 离线|设备:|ASR:/)
  const foreign = await f.invoke('voice_status', { scope: 'all', taskId: 'task-after-error' }, f.foreign)
  assert.match(foreign, /音频设备状态: 读取未完成/)
  assert.doesNotMatch(foreign, /SAFE-AUTHORIZED-TASK-SUMMARY|task-after-error|Task still available|SYNTHETIC-PRIVATE-HELPER-ERROR/)
})


function errorDetails(output) {
  assert.match(output, /^❌/)
  return JSON.parse(output.slice(output.indexOf('\n') + 1))
}

test('status preserves pending decisions beyond clipped summary and labels truncation', async t => {
  const f = await fixture(t)
  const { root } = await controlledWorker(f)
  f.boards.set(root.id, [{ id: 'task-decision', revision: 2, subject: 'Decision test', status: 'pending', description: '目标：' + 'x'.repeat(700) + '\n待决定：需要用户选择具体交付时间。\n下一步：等待答复。' }])
  const result = await f.invoke('voice_status', { scope: 'tasks', taskId: 'task-decision' }, root)
  assert.match(result, /摘要已截短/)
  assert.match(result, /待决定: 需要用户选择具体交付时间。/)
  assert.doesNotMatch(result, /下一步：等待答复/)
})

test('delegate startup failure keeps durable task identity without exposing raw cause', async t => {
  const f = await fixture(t)
  await f.invoke('voice_listen', { action: 'enable' })
  await f.instance.ear.deliver(f.transcript())
  const root = f.residents.get((await f.status()).id)
  f.faults.activation = true
  const result = await f.invoke('voice_delegate', { prompt: 'Task whose worker cannot start' }, root)
  const details = errorDetails(result)
  assert.equal(details.rootSessionId, root.id)
  assert.equal(details.persistenceConfirmed, true)
  assert.equal(details.revision, 1)
  assert.equal(details.taskId, f.boards.get(root.id)[0].id)
  assert.deepEqual(Object.keys(details).sort(), ['persistenceConfirmed', 'revision', 'rootSessionId', 'routing', 'snapshotStale', 'source', 'stage', 'taskId'])
  assert.equal(details.stage, 'worker_startup')
  assert.equal(details.routing.source, 'live_source')
  assert.equal(details.routing.verification, 'requested_only')
  assert.equal(details.routing.workerObserved, null)
  assert.doesNotMatch(result, /PRIVATE-WORKER-START-CAUSE|stack|cause/)
  assert.equal(f.boards.get(root.id).length, 1)
  assert.equal(f.calls.activation.length, 1)
  const status = await f.invoke('voice_status', { scope: 'tasks', taskId: details.taskId }, root)
  assert.match(status, /Task whose worker cannot start/)
  assert.equal(f.calls.activation.length, 1, 'status must not retry worker startup')
})

test('unconfirmed task flush reports exact readback identity, blocks replay and warns in status', async t => {
  const f = await fixture(t)
  await f.invoke('voice_listen', { action: 'enable' })
  await f.instance.ear.deliver(f.transcript())
  const root = f.residents.get((await f.status()).id)
  f.faults.unconfirmedTasks = 1
  const result = await f.invoke('voice_delegate', { prompt: 'UNCERTAIN-TASK-PRIVATE-DESCRIPTION' }, root)
  const details = errorDetails(result)
  assert.equal(details.code, 'TEAM_TASK_PERSISTENCE_UNCONFIRMED')
  assert.equal(details.rootSessionId, root.id)
  assert.equal(details.readback, 'one_matching_task')
  assert.equal(details.persistenceConfirmed, false)
  assert.equal(details.taskId, f.boards.get(root.id)[0].id)
  assert.deepEqual(details.observedTasks, [{ taskId: details.taskId, revision: 1 }])
  assert.doesNotMatch(result, /UNCERTAIN-TASK-PRIVATE-DESCRIPTION|PRIVATE-PERSISTENCE-CAUSE|SECRET-STACK-CAUSE|description|stack/)
  assert.equal(f.calls.activation.length, 0)
  await f.invoke('voice_delegate', { prompt: 'Do not duplicate the uncertain task' }, root)
  assert.equal(f.boards.get(root.id).length, 1)
  assert.equal(f.calls.activation.length, 0)
  const status = await f.invoke('voice_status', { scope: 'tasks' }, root)
  assert.match(status, /未确认落盘/)
  assert.match(status, /可见记录不等于持久成功/)
  assert.match(status, /不要重复创建或自动派工/)
})

test('tool error metadata whitelist caps observed tasks and strips descriptions, causes and unknown fields', async t => {
  const f = await fixture(t)
  const { root, worker } = await controlledWorker(f)
  f.faults.sendError = Object.assign(new Error('Synthetic safe summary'), {
    code: 'TEST_UNCONFIRMED', rootSessionId: root.id, taskId: 'explicit-task', readback: 'ambiguous', revision: 7, persistenceConfirmed: false,
    rawDescription: 'RAW-PRIVATE-TEXT', cause: new Error('PRIVATE-CAUSE'), extraField: 'PRIVATE-EXTRA',
    observedTasks: Array.from({ length: 12 }, (_, n) => ({ taskId: `observed-${n}`, revision: n, task: { description: 'RAW-OBSERVED-DESCRIPTION' }, description: 'RAW-OBSERVED-DESCRIPTION', rootSessionId: 'not-forwarded', cause: 'PRIVATE-CAUSE' })),
  })
  const result = await f.invoke('voice_message', { target: worker.id, text: 'Synthetic message' }, root)
  const details = errorDetails(result)
  assert.deepEqual(Object.keys(details).sort(), ['code', 'observedTasks', 'persistenceConfirmed', 'readback', 'revision', 'rootSessionId', 'taskId'])
  assert.equal(details.observedTasks.length, 8)
  assert.deepEqual(details.observedTasks, Array.from({ length: 8 }, (_, n) => ({ taskId: `observed-${n}`, revision: n })))
  assert.doesNotMatch(result, /RAW-PRIVATE|PRIVATE-CAUSE|PRIVATE-EXTRA|RAW-OBSERVED|not-forwarded|description|cause|stack/)
})


test('first-transcript initialization or persistence failure immediately revokes grant and stops helper', async t => {
  for (const failure of ['teamInitialize', 'sessionFlush']) {
    await t.test(failure, async subtest => {
      const f = await fixture(subtest)
      assert.doesNotMatch(await f.invoke('voice_listen', { action: 'enable' }), /❌/)
      const reserved = await f.status()
      const control = f.services.get('whaleVoiceSession')
      assert.equal(control.allowed(f.owner.id), true)
      const oldRecording = f.transcript()
      const commandCount = f.commands().length
      const cancellations = f.calls.speechCancel.length
      f.faults[failure] = true
      assert.equal(await f.instance.ear.deliver(oldRecording), false)
      assert.equal(f.readConfig().voiceSessionId, null)
      assert.equal(control.allowed(f.owner.id), false)
      assert.equal(control.allowed(reserved.id), false)
      assert.ok(f.calls.speechCancel.length > cancellations)
      const shutdown = f.commands().slice(commandCount)
      assert.ok(shutdown.some(command => command.op === 'always' && command.enabled === false))
      assert.ok(shutdown.some(command => command.op === 'stop'))
      assert.equal(f.calls.rootFollowup.length, 0, 'no input may reach the model before durable initialization')
      assert.equal(f.calls.rootSteer.length, 0)
      const creations = f.calls.create.length
      assert.equal(await f.instance.ear.deliver(oldRecording), false)
      assert.equal(f.calls.create.length, creations, 'old recording must not rematerialize failed root')
      if (failure === 'teamInitialize') {
        f.faults.teamInitialize = false
        assert.doesNotMatch(await f.invoke('voice_listen', { action: 'enable' }), /❌/)
        const fresh = f.readConfig()
        assert.notEqual(fresh.voiceSessionEpoch, oldRecording.voiceSessionEpoch)
        assert.equal(await f.instance.ear.deliver(oldRecording), false)
        assert.equal(f.readConfig().voiceSessionId, f.owner.id, 'late old input must not revoke the new grant')
        assert.equal(f.readConfig().voiceSessionEpoch, fresh.voiceSessionEpoch)
        assert.equal(control.allowed(f.owner.id), true)
        assert.equal(await f.instance.ear.deliver(f.transcript()), true)
      }
    })
  }
})

// Sound/control integration still uses the Node fake helper, never an audio device.
async function inputEvents(f, events) {
  writeFileSync(join(f.home, 'queued-events.json'), JSON.stringify(events))
  await f.instance.ear.status()
}
function inputEvent(f, id, sequence, extra={}) {
  return {event:'voice-input',state:'start',mode:'ptt',inputTurnId:id.repeat(24),inputSequence:sequence,
    voiceSessionId:f.owner.id,voiceSessionEpoch:f.readConfig().voiceSessionEpoch,...extra}
}

test('input cue integration validates grant/turn and emits actual helper playback commands', async t => {
  const f=await fixture(t,{cueSupport:true,turnSignals:{headphonesConfirmed:true}})
  await f.invoke('voice_listen',{action:'enable'})
  await inputEvents(f,[inputEvent(f,'a',1)])
  await eventually(()=>f.commands().some(c=>c.op==='cue'),'start cue')
  let commands=f.commands().filter(c=>c.op==='cue')
  assert.equal(commands.length,1);assert.equal(commands[0].kind,'start')
  assert.equal(commands[0].voiceSessionEpoch,f.readConfig().voiceSessionEpoch)
  await inputEvents(f,[inputEvent(f,'a',1)])
  assert.equal(f.commands().filter(c=>c.op==='cue').length,1,'duplicate onset makes no second tone')
  await inputEvents(f,[inputEvent(f,'a',1,{state:'end',lastVoicedAt:Date.now()-800})])
  await eventually(()=>f.commands().filter(c=>c.op==='cue').length===2,'end cue')
  commands=f.commands().filter(c=>c.op==='cue')
  assert.equal(commands[1].kind,'end')
  assert.equal(f.instance.uiBridge.status(f.owner).turnSignals.available,true)
  assert.equal(f.instance.ear.turnSignals().cancellation.status,'requested','legacy cancel never proves queue flush')
  assert.equal(f.instance.ear.turnSignals().outputStartObservation.status,'unsupported','no invented playback hook')
})

test('old grant, old sequence and unscoped mouse-down cannot cancel or replace current input', async t => {
  const f=await fixture(t,{cueSupport:true,turnSignals:{headphonesConfirmed:true}})
  await f.invoke('voice_listen',{action:'enable'})
  await inputEvents(f,[inputEvent(f,'b',10)])
  const old=f.instance.ear.turnSignals(), count=f.calls.speechCancel.length
  await inputEvents(f,[inputEvent(f,'a',9),inputEvent(f,'c',11,{voiceSessionEpoch:'old'}),
    {event:'ptt-mouse',state:'down'}])
  assert.equal(f.calls.speechCancel.length,count)
  assert.equal(f.instance.ear.turnSignals().inputTurnId,old.inputTurnId)
  assert.equal(f.instance.ear.turnSignals().generation,old.generation)
})

test('speaker-only VAD does not auto-cancel; explicit experiment plus headphones does', async t => {
  const f=await fixture(t,{cueSupport:true})
  await f.invoke('voice_listen',{action:'enable'})
  let count=f.calls.speechCancel.length
  await inputEvents(f,[inputEvent(f,'a',1,{mode:'always'})])
  assert.equal(f.calls.speechCancel.length,count)
  assert.equal(f.commands().filter(c=>c.op==='cue').length,0)
  const settings=f.instance.uiBridge.readSettings(f.owner)
  f.instance.uiBridge.updateSettings({values:{...settings.values,turnSignals:{enabled:true,volume:0.2,headphonesConfirmed:true,experimentalAutomaticBargeIn:true}},revision:settings.revision},f.owner)
  await inputEvents(f,[inputEvent(f,'b',2,{mode:'always'})])
  assert.equal(f.calls.speechCancel.length,count+1)
})

test('native speak request suppresses end cue for exact voice root without claiming playback started', async t => {
  const f=await fixture(t,{cueSupport:true,turnSignals:{headphonesConfirmed:true}})
  await f.invoke('voice_listen',{action:'enable'})
  await f.instance.ear.deliver(f.transcript())
  const state=await f.status(), child=f.residents.get(state.id)
  await inputEvents(f,[inputEvent(f,'a',1),inputEvent(f,'a',1,{state:'end',lastVoicedAt:Date.now()+1000})])
  const before=f.commands().filter(c=>c.op==='cue').length
  const hook=f.listeners.get('tools/execute');assert.equal(typeof hook,'function')
  let next=0
  await hook({name:'speak',agent:f.foreign},async()=>{next++;return 'foreign'})
  assert.equal(f.instance.ear.turnSignals().cue.status,'played')
  await hook({name:'speak',agent:{...child}},async()=>{next++;return 'impostor'})
  assert.equal(f.instance.ear.turnSignals().cue.status,'played')
  assert.equal(await hook({name:'speak',agent:child},async()=>{next++;return 'native result'}),'native result')
  assert.equal(next,3)
  assert.equal(f.instance.ear.turnSignals().conservativeCueSuppression.status,'observed')
  assert.equal(f.instance.ear.turnSignals().outputStartObservation.status,'unsupported')
  assert.equal(f.instance.ear.turnSignals().phase,'processing')
  assert.equal(f.instance.ear.turnSignals().cue.reason,'speech_requested')
  assert.equal(f.commands().filter(c=>c.op==='cue').length,before)
})

test('output start acknowledgement is scoped and cannot be inferred from text delivery', async t => {
  const f=await fixture(t,{cueSupport:true,turnSignals:{headphonesConfirmed:true}})
  await f.invoke('voice_listen',{action:'enable'})
  await inputEvents(f,[inputEvent(f,'a',1)])
  const signal=f.instance.ear.turnSignals()
  const event={protocol:'whale-voice-output/1',voiceSessionId:f.owner.id,voiceSessionEpoch:f.readConfig().voiceSessionEpoch,inputTurnId:signal.inputTurnId,generation:signal.generation}
  assert.equal(f.instance.ear.reportOutputStarted({...event,voiceSessionEpoch:'old'}),false)
  assert.equal(f.instance.ear.reportOutputStarted({...event,generation:signal.generation-1}),false)
  assert.equal(f.instance.ear.reportOutputStarted(event),true)
  assert.equal(f.instance.ear.turnSignals().phase,'responding')
  assert.equal(f.instance.ear.turnSignals().outputStartObservation.status,'observed')
})


test('correlated helper requests resolve out of order without consuming background errors', async t => {
  const f = await fixture(t)
  const slow = f.instance.ear.transcribe('slow')
  const fast = f.instance.ear.transcribe('fast')
  const [a, b] = await Promise.all([slow, fast])
  assert.equal(a.path, 'slow')
  assert.equal(b.path, 'fast')
  const commands = f.commands().filter(x => x.op === 'transcribe')
  assert.equal(new Set(commands.map(x => x.requestId)).size, 2)
})

test('a correlated failure rejects only its own concurrent request', async t => {
  const f = await fixture(t)
  const slow = f.instance.ear.transcribe('slow')
  const failed = f.instance.ear.prosody('fail')
  await assert.rejects(failed, /only this request failed/)
  assert.equal((await slow).path, 'slow')
})

test('listen timeout removes waiter; late result cannot settle a newer listen', async t => {
  const f = await fixture(t)
  await f.instance.ear.pttStatus()
  writeFileSync(join(f.home, 'listen-plan.json'), JSON.stringify([
    {text:'expired result',delay:100}, {text:'new result',delay:180},
  ]))
  await assert.rejects(f.instance.ear.listenOnce(30), /超时/)
  assert.equal((await f.instance.ear.listenOnce(1000)).text, 'new result')
  assert.equal(f.calls.rootFollowup.some(x => JSON.stringify(x).includes('expired result')), false)
})

test('helper exit rejects old requests and replacement helper has fresh correlation IDs', async t => {
  const f = await fixture(t)
  await assert.rejects(f.instance.ear.transcribe('crash'), /进程退出/)
  assert.equal((await f.instance.ear.transcribe('fast')).path, 'fast')
  const commands = f.commands().filter(x => x.op === 'transcribe')
  assert.notEqual(commands[0].requestId, commands[1].requestId)
})


test('legacy custom helper is rejected explicitly before commands can wait', async t => {
  const f = await fixture(t, { requestProtocol: null })
  await assert.rejects(f.instance.ear.transcribe('fast'), /协议不兼容/)
  await assert.rejects(f.instance.ear.prosody('fast'), /whale-request\/1/)
  assert.equal(f.commands().some(x => x.op === 'transcribe' || x.op === 'prosody'), false)
})


test('asynchronous stdin EPIPE rejects pending requests without crashing the host', async t => {
  const f = await fixture(t)
  await f.instance.ear.pttStatus()
  const process=f.spawned.at(-1).process
  const failure=Object.assign(new Error('synthetic write EPIPE'),{code:'EPIPE'})
  process.stdin.write=(_data,_encoding,callback)=>{
    queueMicrotask(()=>{ callback?.(failure); process.stdin.emit('error',failure) })
    return false
  }
  await assert.rejects(f.instance.ear.transcribe('slow'),/EPIPE/)
  await f.spawned.at(-1).closed
  assert.equal((await f.instance.ear.transcribe('fast')).path,'fast')
  assert.notEqual(f.spawned.at(-1).process,process)
  // Late errors from the closed pipe must not reject replacement requests.
  const next=f.instance.ear.prosody('slow')
  assert.doesNotThrow(()=>process.stdin.emit('error',failure))
  assert.equal((await next).path,'slow')
})

test('dispose retains stdin error ownership after final quit and child detachment', async t => {
  const f = await fixture(t)
  await f.instance.ear.pttStatus()
  const process=f.spawned.at(-1).process
  const write=process.stdin.write.bind(process.stdin)
  process.stdin.write=(...args)=>{
    const result=write(...args)
    queueMicrotask(()=>process.stdin.emit('error',Object.assign(new Error('late quit EPIPE'),{code:'EPIPE'})))
    return result
  }
  f.instance.dispose()
  await f.spawned.at(-1).closed
  assert.equal(f.spawned.length,1)
})

test('a stdin stream failure settles every owned waiter, not only a write callback', async t => {
  const f = await fixture(t)
  await f.instance.ear.pttStatus()
  const process=f.spawned.at(-1).process
  const results=Promise.allSettled([f.instance.ear.transcribe('slow'),f.instance.ear.prosody('slow')])
  await new Promise(resolve=>setImmediate(resolve))
  assert.doesNotThrow(()=>process.stdin.emit('error',Object.assign(new Error('broken helper command pipe'),{code:'EPIPE'})))
  for(const result of await results) {
    assert.equal(result.status,'rejected')
    assert.match(result.reason.message,/broken helper command pipe/)
  }
})

test('agent control and legacy enable cannot bypass initial owner authorization', async t => {
  const f = await fixture(t,{authorized:false})
  const capability = JSON.parse(await f.invokeRaw('voice_manage', { action: 'inspect' }))
  assert.equal(capability.confirmation, 'direct-configuration-scoped-operations')
  const pending = JSON.parse(await f.invokeRaw('voice_listen', { action: 'enable' }))
  assert.equal(pending.status, 'confirmation-required')
  assert.equal(f.readConfig().voiceSessionId, null)
  assert.equal(f.calls.create.length, 0)
  const before = f.commands().length
  assert.match(await f.invokeRaw('voice_listen', { action: 'start' }), /没有语音权限/)
  assert.equal(f.commands().length, before)
  assert.match(await f.invokeRaw('voice_manage', { action: 'approve', requestId: pending.request.id }), /❌/)
  assert.match(await f.invokeRaw('voice_manage', { action: 'prepare', operation: 'enable', params: { accepted: true } }), /❌/)
  await f.instance.uiBridge.decideAgentRequest({ id: pending.request.id, approve: true, acknowledgements: pending.request.acknowledgements.map(x => x.id) }, f.owner, new AbortController().signal)
  assert.equal(f.readConfig().voiceSessionId, f.owner.id)
  assert.equal(JSON.parse(await f.invokeRaw('voice_manage', { action: 'request-status', requestId: pending.request.id })).state, 'completed')
})

test('manual mode choice invalidates pending legacy always-on and tool cannot resurrect it', async t => {
  const f = await fixture(t,{authorized:false})
  const pending = JSON.parse(await f.invokeRaw('voice_listen', { action: 'always-on' }))
  assert.equal(pending.status, 'confirmation-required')
  assert.equal(f.commands().filter(x => x.op === 'always').length, 0)
  await f.instance.uiBridge.updateSettings({ revision: f.instance.uiBridge.readSettings(f.owner).revision, values: f.instance.uiBridge.readSettings(f.owner).values }, f.owner)
  const state = JSON.parse(await f.invokeRaw('voice_manage', { action: 'request-status', requestId: pending.request.id }))
  assert.equal(state.state, 'superseded')
  await assert.rejects(f.instance.uiBridge.decideAgentRequest({ id: pending.request.id, approve: true, acknowledgements: ['always'] }, f.owner), /不会重复执行/)
  assert.equal(f.commands().filter(x => x.op === 'always').length, 0)
})


test('independent wake mode requires matching helper support and is only ready after stream acknowledgement', async t => {
  const f=await fixture(t,{captureProtocol:'whale-capture/1'})
  await f.invoke('voice_listen',{action:'enable'})
  await f.instance.uiBridge.setListenMode(f.owner,'wake',new AbortController().signal)
  assert.equal(f.instance.uiBridge.status(f.owner).listenMode,'wake')
  assert.equal(f.instance.uiBridge.status(f.owner).wake.state,'starting')
  assert.equal(f.readConfig().preferredListenMode,'wake')
  const start=f.commands().filter(c=>c.op==='always'&&c.enabled).at(-1)
  assert.equal(start.mode,'wake')
  assert.ok(start.captureId)
  const frames=[],off=f.instance.uiBridge.subscribeConversation(f.owner,value=>frames.push(value))
  t.after(off)
  const wake={event:'wake-state',voiceSessionId:f.owner.id,voiceSessionEpoch:f.readConfig().voiceSessionEpoch,captureId:start.captureId,state:'waiting',streamOpen:true,deadlineAt:null}
  // Use ping-through status to deliver unsolicited helper events. Status ack is
  // deliberately 'starting'; the subsequent real event advances the UI stream.
  writeFileSync(join(f.home,'queued-events.json'),JSON.stringify([wake]))
  await f.instance.ear.pttStatus()
  await eventually(()=>frames.at(-1)?.wake?.state==='waiting','wake stream waiting')
  assert.equal(f.instance.uiBridge.status(f.owner).wake.state,'waiting')
  await f.instance.uiBridge.setListenMode(f.owner,'ptt',new AbortController().signal)
  writeFileSync(join(f.home,'queued-events.json'),JSON.stringify([
    {...wake,state:'listening',deadlineAt:Date.now()+10000},
    {event:'transcript',...f.transcript({mode:'wake',text:'stale wake command',captureId:start.captureId})},
  ]))
  await f.instance.ear.pttStatus()
  assert.equal(f.instance.uiBridge.status(f.owner).wake.state,'disabled')
  assert.equal(f.calls.rootFollowup.length,0)
})

test('requesting wake on an older helper fails without turning on unfiltered free microphone', async t => {
  const f=await fixture(t)
  await f.invoke('voice_listen',{action:'enable'})
  const before=f.commands().length
  await assert.rejects(f.instance.uiBridge.setListenMode(f.owner,'wake',new AbortController().signal),/不支持独立唤醒/)
  assert.equal(f.commands().slice(before).some(c=>c.op==='always'&&c.enabled),false)
  assert.notEqual(f.readConfig().preferredListenMode,'wake')
})


test('failed listening-mode change closes the obsolete listener rather than retrying enable', async t => {
  const f=await fixture(t,{captureProtocol:'whale-capture/1'})
  await f.invoke('voice_listen',{action:'enable'})
  await f.instance.uiBridge.setListenMode(f.owner,'always',new AbortController().signal)
  writeFileSync(join(f.home,'reject-always-on'),'1')
  const before=f.commands().length
  await assert.rejects(f.instance.uiBridge.setListenMode(f.owner,'wake',new AbortController().signal),/PTT recording/)
  const changes=f.commands().slice(before).filter(c=>c.op==='always')
  assert.deepEqual(changes.map(c=>c.enabled),[true,false])
  assert.equal(f.instance.uiBridge.status(f.owner).listenMode,'ptt')
  assert.equal(f.instance.uiBridge.status(f.owner).wake.state,'disabled')
})


test('native speech dispatch projects tool text and outcome without assistant message overwrite', async t => {
  const f=await fixture(t)
  await f.invoke('voice_listen',{action:'enable'})
  await f.instance.ear.deliver(f.transcript())
  const state=await f.status(), child=f.residents.get(state.id)
  const exec={name:'speak',agent:child,arguments:{text:'听到了别急'},token:Symbol('caption')}
  const hook=f.listeners.get('tools/execute'),finish=f.listeners.get('tools/result')
  await hook(exec,async()=>({isError:false,value:'done'}))
  assert.equal(f.instance.uiBridge.readConversation(f.owner).latest.text,'听到了别急')
  f.listeners.get('session/event')?.(child.session,{type:'assistant/message',surfaceOp:'append',seq:999,data:{message:{content:[{type:'text',text:'not speech'}]}}})
  assert.equal(f.instance.uiBridge.readConversation(f.owner).latest.text,'听到了别急')
  finish(exec,{isError:true,error:{message:'failure'}})
  assert.equal(f.instance.uiBridge.readConversation(f.owner).latest.state,'speech-failed')
  assert.equal(f.instance.uiBridge.readConversation(f.owner).playbackConfirmed,false)
})


const edgeSpeechSettings = { ...TTS_DEFAULTS, provider: 'edge', edgeTextTransmissionAccepted: true }

test('a nonzero Edge worker preserves HTTP 429 in the receipt and seven-day operation export', async t => {
  const f = await fixture(t, { tts: edgeSpeechSettings })
  await f.invoke('voice_listen', { action: 'enable' })
  await f.instance.ear.deliver(f.transcript())
  const root = f.residents.get((await f.status()).id)
  const privateText = '合成文本隐私标记'
  const privateDiagnostic = 'PRIVATE https://worker.invalid/a D:/private/path MY_ENDPOINT_ID'
  const failingWorker = response => `
    process.stdin.resume()
    process.stdin.on('end', () => {
      process.stderr.write(${JSON.stringify(privateDiagnostic)})
      process.stdout.write(${JSON.stringify(JSON.stringify({ ok: false, ...response }))})
      process.exitCode = 1
    })
  `
  let requests = 0, plays = 0
  const adapter = createWindowsTtsAdapter({
    platform: 'win32',
    runner(command, args, payload, options) {
      requests++
      if (requests === 2 || requests === 3) return edgeSynthesisFixture(command, args, payload, options)
      const response = requests === 1
        ? { code: 'EDGE_STREAM_CLOSED', closeCode: 1006 }
        : requests === 4 ? { code: 'EDGE_HTTP_FORBIDDEN', httpStatus: 403 }
          : { code: 'EDGE_HTTP_RATE_LIMITED', httpStatus: 429, retryAfterMs: 90000 }
      return runTtsProcess(command, ['-e', failingWorker(response)], payload, options)
    },
    spawnProcess: edgePlaybackFixture((_path, complete) => { plays++; complete() }),
  })
  const runtime = createTtsRuntime({ getConfig: () => f.readConfig().tts, adapter })
  t.after(() => runtime.dispose())
  f.instance.tts.speak = runtime.speak

  const recovered = JSON.parse(await f.invokeRaw('whale_voice_speak', { text: privateText }, root))
  const longerReply = privateText + '。' + '后续段落在此用于验证已经完成的播放进度。'.repeat(6)
  const partial = await f.invokeRaw('whale_voice_speak', { text: longerReply }, root)
  const partialError = JSON.parse(partial.split('\n').at(-1))
  const first = JSON.parse(await f.invokeRaw('whale_voice_speak', { text: privateText }, root))
  const next = JSON.parse(await f.invokeRaw('whale_voice_speak', { text: privateText }, root))
  assert.equal(recovered.playbackCompleted, true)
  assert.equal(partialError.code, 'TTS_EDGE_HTTP_FORBIDDEN')
  assert.deepEqual(partialError.edgeDiagnostic, {
    stage: 'network', httpStatus: 403, segment: 2, segments: 2, attempt: 1,
    playedSegments: 1, playbackPossible: true,
  })
  assert.equal(first.textOnly, true)
  assert.equal(first.reason, 'TTS_EDGE_HTTP_RATE_LIMITED')
  assert.deepEqual(first.edgeDiagnostic, {
    stage: 'network', httpStatus: 429, retryAfterMs: 90000, cooldownMs: 90000, segment: 1, segments: 1, attempt: 1,
    playedSegments: 0, playbackPossible: false,
  })
  assert.equal(next.textOnly, true)
  assert.equal(next.reason, 'TTS_EDGE_RATE_LIMIT_COOLDOWN')
  assert.equal(next.edgeDiagnostic.attempt, undefined)
  assert.equal(requests, 5, 'the next call honors the remaining cooldown without making a request')
  assert.equal(plays, 2)

  const { text: exported } = await f.instance.uiBridge.readOperationLog({}, ownerSettings)
  const rows = exported.trim().split('\n').map(JSON.parse)
  const finished = rows.filter(row =>
    row.phase === 'finished' && (row.action === 'whale_voice_speak' || row.action === 'playback'))
  assert.deepEqual(finished.map(row => [row.source, row.result, row.errorCode]), [
    ['tts', 'ok', undefined], ['agent', 'ok', undefined],
    ['tts', 'failed', partialError.code], ['agent', 'failed', partialError.code],
    ['tts', 'failed', first.reason], ['agent', 'failed', first.reason],
    ['tts', 'failed', next.reason], ['agent', 'failed', next.reason],
  ])
  assert.deepEqual(finished.slice(2).map(row => row.edgeDiagnostic),
    [partialError.edgeDiagnostic, partialError.edgeDiagnostic, first.edgeDiagnostic, first.edgeDiagnostic, next.edgeDiagnostic, next.edgeDiagnostic])
  const retry = rows.find(row => row.action === 'playback.retry')
  assert.equal(retry.errorCode, 'TTS_EDGE_STREAM_CLOSED')
  assert.deepEqual(retry.edgeDiagnostic, {
    stage: 'stream', closeCode: 1006, segment: 1, segments: 1, attempt: 1,
    playedSegments: 0, playbackPossible: false,
  })
  assert.deepEqual(finished.filter(row => row.source === 'tts').map(row => row.operationId),
    finished.filter(row => row.source === 'agent').map(row => row.operationId))
  assert.equal(new Set(finished.map(row => row.operationId)).size, 4)
  assert.equal(retry.operationId, finished[0].operationId)
  for (const privateValue of [privateText, 'worker.invalid', 'D:/private/path', 'MY_ENDPOINT_ID']) {
    assert.ok(!JSON.stringify(first).includes(privateValue))
    assert.ok(!partial.includes(privateValue))
    assert.ok(!exported.includes(privateValue))
  }
})

test('built-in speech internal cancellation remains an interrupted caption', async t => {
  const f = await fixture(t, { tts: edgeSpeechSettings })
  await f.invoke('voice_listen', { action: 'enable' })
  await f.instance.ear.deliver(f.transcript())
  const root = f.residents.get((await f.status()).id)
  const config = f.readConfig()
  let started
  const playing = new Promise(resolve => { started = resolve })
  const runtime = createTtsRuntime({ getConfig: () => config.tts, adapter: {
    async inspect() { return { playbackSupported: true, edgePlaybackSupported: true, edgeDependency: 'installed' } },
    async edge(_text, _config, signal) {
      started()
      await new Promise((_, reject) => signal.addEventListener('abort', () => reject(new Error('adapter stopped')), { once: true }))
    },
  } })
  t.after(() => runtime.dispose())
  f.instance.tts.speak = runtime.speak
  f.instance.tts.cancel = runtime.cancel
  const caller = new AbortController()
  const exec = { name: 'whale_voice_speak', agent: root, arguments: { text: '被打断的朗读' }, token: Symbol('speech'), signal: caller.signal }
  const pending = f.listeners.get('tools/execute')(exec, () => f.registrations.get(exec.name).execute(exec.arguments, exec))
    .then(value => ({ isError: false, value }), error => ({ isError: true, error: { message: error.message } }))
  const first = await Promise.race([playing.then(() => 'playing'), pending])
  assert.equal(first, 'playing', JSON.stringify(first))
  // The input path cancels TTS's own controller, not the tool caller signal.
  await f.instance.ear.start()
  const result = await pending
  assert.equal(caller.signal.aborted, false)
  assert.equal(result.isError, false, 'legacy tool result envelope stays compatible')
  assert.match(result.value, /TTS_CANCELLED/)
  f.listeners.get('tools/result')(exec, result)
  const snapshot = f.instance.uiBridge.readConversation(f.owner)
  assert.equal(snapshot.latest.state, 'interrupted')
  assert.equal(snapshot.latest.text, exec.arguments.text)
  assert.equal(snapshot.playbackConfirmed, false)
})


const speechDeferred = () => Promise.withResolvers()
async function speechFenceFixture(t, { holdFirst = true } = {}) {
  const f = await fixture(t, { tts: edgeSpeechSettings })
  await f.invoke('voice_listen', { action: 'enable' })
  await f.instance.ear.deliver(f.transcript())
  const root = f.residents.get((await f.status()).id), played = [], started = speechDeferred()
  const spawnProcess = edgePlaybackFixture((path, complete) => {
    played.push(readFileSync(path, 'utf8')); started.resolve()
    if (!holdFirst || played.length > 1) setImmediate(complete)
  })
  const adapter = createWindowsTtsAdapter({ platform: 'win32', runner: edgeSynthesisFixture, spawnProcess })
  const runtime = createTtsRuntime({ getConfig: () => f.readConfig().tts, adapter })
  Object.assign(f.instance.tts, runtime)
  t.after(() => runtime.dispose())
  const caller = new AbortController()
  const begin = async (turn, step, messages = []) => {
    await f.listeners.get('agent/pre-step')({ agent: root, turn, step, messages, signal: caller.signal, modelSelection: root.model.current() }, async () => ({ kind: 'enter' }))
    return { agent: root, signal: caller.signal, log: { turn, step }, toolSet: Object.freeze({ view() { return f.registrations }, dispose() {} }) }
  }
  const batch = (input, texts) => f.calls.executor.execute({ ...input, calls: texts.map((text, i) => ({ id: `speech-${i}`, name: 'whale_voice_speak', arguments: JSON.stringify({ text }) })) })
  const nextInput = async text => { await f.instance.ear.deliver(f.transcript({ text })); return f.calls.rootSteer.at(-1).message }
  return { ...f, root, runtime, played, started: started.promise, caller, begin, batch, nextInput }
}

test('a microphone turn with a text-only model response is reminded once and only an explicit model call plays speech', async t => {
  const f = await speechFenceFixture(t, { holdFirst: false })
  f.root.inbox.hasPending = false
  f.root.inbox.remove = () => false
  const speakFromModel = '这是模型选择的简短朗读。'
  const emit = f.listeners.get('session/event')
  const input = f.calls.rootFollowup[0].message
  await f.begin(1, 1, [input])
  emit(f.root.session, { type: 'step/start', data: { turn: 1, step: 1 } })
  emit(f.root.session, { type: 'user/message', surfaceOp: 'append', data: input })
  emit(f.root.session, { type: 'assistant/message', surfaceOp: 'append', data: {
    turn: 1, step: 1, message: { role: 'assistant', content: [{ type: 'text', text: 'SYNTHETIC_PRIVATE_FINAL_MESSAGE' }] },
  } })
  emit(f.root.session, { type: 'turn/end', data: { turn: 1, reason: { kind: 'completed' } } })
  await Promise.resolve()
  assert.deepEqual(f.played, [])
  assert.equal(f.calls.rootFollowup.length, 2)
  const { root, message: reminder } = f.calls.rootFollowup[1]
  assert.equal(root, f.root)
  assert.match(reminder.content[0].text, /当前没有调用朗读/)
  assert.doesNotMatch(JSON.stringify(reminder), /SYNTHETIC_PRIVATE_FINAL_MESSAGE/)
  const correction = await f.begin(2, 1, [reminder])
  emit(f.root.session, { type: 'step/start', data: { turn: 2, step: 1 } })
  const result = await f.batch(correction, [speakFromModel])
  assert.equal(JSON.parse(result.results[0].result.value).playbackCompleted, true)
  emit(f.root.session, { type: 'turn/end', data: { turn: 2, reason: { kind: 'completed' } } })
  assert.deepEqual(f.played, [speakFromModel])
  assert.equal(f.calls.rootFollowup.length, 2)
})

for (const stop of ['ptt', 'cancel-tts']) test(`speech-step fence discards queued old speech after ${stop} and admits a later step`, async t => {
  const f = await speechFenceFixture(t), first = await f.begin(1, 1)
  const pending = f.batch(first, ['first old segment', 'second old segment'])
  await f.started
  if (stop === 'ptt') await f.instance.ear.start()
  else await f.instance.uiBridge.cancelTts(f.owner)
  const result = await pending
  assert.deepEqual(f.played, ['first old segment'])
  assert.equal(f.caller.signal.aborted, false, 'only output is cancelled, not the model batch or its other tools')
  assert.ok(result.results.every(row => row.result.value.includes('TTS_CANCELLED')))
  assert.deepEqual(f.instance.uiBridge.readConversation(f.owner).items.filter(row => row.role === 'assistant').map(row => row.state), ['interrupted', 'interrupted'])
  if (stop === 'ptt') {
    // Capturing input intentionally does not await output shutdown. The old
    // tool batch can settle before the separate cancellation acknowledgement
    // is published, especially while an idle resident engine is being closed.
    await eventually(() => f.instance.ear.turnSignals().cancellation.status === 'confirmed', 'owned speech cancellation acknowledgement')
    assert.equal(f.instance.ear.turnSignals().cancellation.status, 'confirmed')
  }
  const retry = await f.batch(await f.begin(1, 2), ['automatic old-turn retry'])
  assert.match(retry.results[0].result.value, /TTS_CANCELLED/)
  const fresh = await f.nextInput('a genuine new microphone input')
  await f.batch(await f.begin(1, 3, [fresh]), ['new model step'])
  await f.batch(await f.begin(2, 1), ['new user turn'])
  await f.invokeRaw('whale_voice_speak', { text: 'explicit new speech' }, f.root)
  assert.deepEqual(f.played, ['first old segment', 'new model step', 'new user turn', 'explicit new speech'])
})

test('a complete spoken answer stops the native turn only when speech is the entire tool batch', async t => {
  const f = await speechFenceFixture(t, { holdFirst: false })
  const run = async (input, final, extra = []) => f.calls.executor.execute({
    ...input,
    calls: [{ id: `reply-${input.log.turn}`, name: 'whale_voice_speak', arguments: JSON.stringify({ text: '收到。', final }) }, ...extra],
  })
  const complete = await run(await f.begin(1, 1), true)
  assert.equal(complete.concluded, true)
  assert.equal(JSON.parse(complete.results[0].result.value).playbackCompleted, true)
  assert.equal((await run(await f.begin(2, 1), false)).concluded, false)
  const withOtherTool = await run(await f.begin(3, 1), true, [{ id: 'status', name: 'voice_status', arguments: '{"scope":"tasks"}' }])
  assert.equal(withOtherTool.concluded, false)
  assert.equal(withOtherTool.results.length, 2)
})

test('speech-step fence covers a slow non-speech call before first speech without cancelling that tool', async t => {
  const f = await speechFenceFixture(t, { holdFirst: false }), input = await f.begin(1, 1)
  const started = speechDeferred(), release = speechDeferred(); let completed = false, toolAborted
  const original = f.registrations.get('voice_status').execute
  f.registrations.get('voice_status').execute = async (args, exec) => {
    started.resolve(); await release.promise; toolAborted = exec.signal.aborted
    completed = true
    return original(args, exec)
  }
  const pending = f.calls.executor.execute({ ...input, calls: [
    { id: 'slow', name: 'voice_status', arguments: JSON.stringify({ scope: 'tasks' }) },
    { id: 'speech', name: 'whale_voice_speak', arguments: JSON.stringify({ text: 'old speech after slow tool' }) },
  ] })
  await started.promise
  await f.instance.ear.start()
  release.resolve(); const result = await pending
  assert.equal(completed, true); assert.equal(toolAborted, false)
  assert.deepEqual(f.played, [])
  assert.match(result.results[1].result.value, /TTS_CANCELLED/)
  await f.batch(await f.begin(1, 2, [await f.nextInput('new input')]), ['next step'])
  assert.deepEqual(f.played, ['next step'])
})

test('speech-step fence covers PTT before the old model step begins tool dispatch', async t => {
  const f = await speechFenceFixture(t, { holdFirst: false }), input = await f.begin(1, 1)
  await f.instance.ear.start()
  const result = await f.batch(input, ['late model output'])
  assert.deepEqual(f.played, [])
  assert.match(result.results[0].result.value, /TTS_CANCELLED/)
  await f.batch(await f.begin(1, 2, [await f.nextInput('new input')]), ['fresh model output'])
  assert.deepEqual(f.played, ['fresh model output'])
})

test('speech-step fence leaves ordinary sequential speech and default VAD output unchanged', async t => {
  const f = await speechFenceFixture(t, { holdFirst: false }), input = await f.begin(1, 1)
  await inputEvents(f, [inputEvent(f, 'a', 1, { mode: 'always' })])
  await f.batch(input, ['ordinary first', 'ordinary second'])
  assert.deepEqual(f.played, ['ordinary first', 'ordinary second'])
  assert.equal(f.instance.ear.turnSignals().cancellation.status, 'unsupported')
})

test('speech-step fence admits only freshly inserted owner RPC text before reopening the same turn', async t => {
  const f = await speechFenceFixture(t, { holdFirst: false })
  await f.begin(1, 1)
  const inserted = (message, agent = f.root) => f.listeners.get('agent/inbox/inserted')?.({ agent, message })
  const message = (id, source) => ({ role: 'user', id, content: [{ type: 'text', text: 'please speak again' }], source })
  const old = message('old-owner-prompt', { kind: 'user', rpcId: 'old-owner-rpc' })
  inserted(old)
  await f.instance.ear.start()
  // Even a second insertion of the same previously queued ID cannot re-stamp it.
  inserted(old)
  let step = 2
  for (const [item, agent] of [
    [old, f.root],
    [message('worker', { kind: 'subagent-message' }), f.root],
    [message('unverified', { kind: 'user' }), f.root],
    [message('guest', { kind: 'user', rpcId: 'guest-rpc', principal: { kind: 'guest' } }), f.root],
    [message('replaced', { kind: 'user', rpcId: 'replaced-rpc' }), { ...f.root }],
  ]) {
    if (item !== old) inserted(item, agent)
    const result = await f.batch(await f.begin(1, step++, [item]), ['not fresh owner input'])
    assert.match(result.results[0].result.value, /TTS_CANCELLED/)
  }
  assert.deepEqual(f.played, [])
  const owner = message('fresh-owner-prompt', { kind: 'user', rpcId: 'fresh-owner-rpc' })
  inserted(owner)
  await f.batch(await f.begin(1, step, [owner]), ['fresh owner text response'])
  assert.deepEqual(f.played, ['fresh owner text response'])
})

// These events follow the real helper's _consume_frames -> PTT start/release ->
// resume order. Hardware/ASR are not exercised here. The real asynchronous
// agents.create contract holds first materialization while helper events arrive
// separately. Agent.steer/followup stay synchronous, as they are in DSH.
async function continuousInputFixture(t, mode) {
  const f = await fixture(t, { captureProtocol: 'whale-capture/1' })
  await f.invoke('voice_listen', { action: 'enable' })
  await f.instance.uiBridge.setListenMode(f.owner, mode, new AbortController().signal)
  const captureId = f.commands().filter(c => c.op === 'always' && c.enabled).at(-1).captureId
  const transcript = (id, text, inputMode = mode) => ({ event: 'transcript', ...f.transcript({
    inputTurnId: id.repeat(24), text, mode: inputMode, captureId }) })
  const signal = (id, sequence, extra = {}) => inputEvent(f, id, sequence, { mode, captureId, ...extra })
  const continuous = (id, sequence, text) => [
    ...(mode === 'wake' ? [signal(id, sequence, { state: 'attempt' })] : []),
    signal(id, sequence), signal(id, sequence, { state: 'end', lastVoicedAt: Date.now() }), transcript(id, text),
  ]
  let releaseCreate, createEntered = false
  const createGate = new Promise(resolve => { releaseCreate = resolve }), create = f.agents.create
  f.agents.create = async options => {
    createEntered = true
    await createGate
    const handle = await create(options), root = handle.agent
    root.followup = message => { f.calls.rootFollowup.push({ root, message }) }
    root.steer = message => { f.calls.rootSteer.push({ root, message }) }
    return handle
  }
  const initial = f.instance.ear.deliver(f.transcript({ text: 'initial PTT input', captureId }))
  try { await eventually(() => createEntered, 'initial voice materialization entered') }
  catch (error) { releaseCreate(); await initial; throw error }
  async function batch(events) {
    try {
      for (const event of events) {
        writeFileSync(join(f.home, 'queued-events.json'), JSON.stringify([event]))
        await f.instance.ear.pttStatus()
        // The second ack follows this event even when the OS splits pipe reads.
        // Keep creation blocked until every PTT signal has reached Node.
        await f.instance.ear.pttStatus()
      }
    } finally { releaseCreate(); await initial }
    await f.instance.ear.deliver(f.transcript({ text: 'dispatch barrier', captureId }))
  }
  const texts = () => [...f.calls.rootFollowup, ...f.calls.rootSteer].map(x => x.message.content[0].text)
  return { batch, continuous, signal, transcript, texts }
}

for (const [mode, pttMode] of [['wake', 'ptt-keyboard'], ['always', 'ptt-mouse']]) {
  test(`${mode} queued input expires at accepted PTT start, without recalling submitted input or PTT`, async t => {
    const f = await continuousInputFixture(t, mode)
    await f.batch([
      ...f.continuous('a', 1, 'old continuous input'),
      f.signal('b', 2, { mode: pttMode }),
      f.signal('b', 2, { mode: pttMode, state: 'end', lastVoicedAt: Date.now() }),
      f.transcript('b', 'new PTT input', pttMode),
    ])
    assert.equal(f.texts().some(x => x.includes('old continuous input')), false)
    assert.equal(f.texts().some(x => x.includes('new PTT input')), true)
    assert.equal(f.texts().filter(x => x.includes('initial PTT input')).length, 1)
    // A later PTT cannot recall messages already submitted in the first batch.
    await f.batch([f.signal('d', 3, { mode: pttMode }), ...f.continuous('c', 4, 'resumed continuous input')])
    assert.equal(f.texts().some(x => x.includes('resumed continuous input')), true)
    assert.equal(f.texts().filter(x => x.includes('initial PTT input')).length, 1)
    assert.equal(f.texts().filter(x => x.includes('new PTT input')).length, 1)
  })
}

test('ordinary continuous starts do not supersede prior queued utterances', async t => {
  for (const mode of ['always', 'wake']) {
    const f = await continuousInputFixture(t, mode)
    await f.batch([...f.continuous('a', 1, 'first ordinary utterance'), ...f.continuous('b', 2, 'second ordinary utterance')])
    assert.equal(f.texts().filter(x => x.includes('first ordinary utterance')).length, 1)
    assert.equal(f.texts().filter(x => x.includes('second ordinary utterance')).length, 1)
  }
})

test('replayed or stale-grant PTT starts cannot withdraw a fresh continuous queue', async t => {
  const f = await continuousInputFixture(t, 'wake')
  const start = f.signal('a', 1, { mode: 'ptt' })
  await f.batch([
    start, ...f.continuous('b', 2, 'fresh continuous input'), start,
    { ...start, inputSequence: 3, voiceSessionEpoch: 'old-epoch' },
    { ...start, inputSequence: 3, captureId: 'old-capture' },
  ])
  assert.equal(f.texts().filter(x => x.includes('fresh continuous input')).length, 1)
})

// All files and helper audit records below are synthetic and fixture-owned.
function syntheticLocalAudio(f) {
  const path = join(f.home, 'synthetic-local-audio.wav')
  const wave = Buffer.alloc(44 + 320)
  wave.write('RIFF'); wave.writeUInt32LE(wave.length - 8, 4); wave.write('WAVEfmt ', 8)
  wave.writeUInt32LE(16, 16); wave.writeUInt16LE(1, 20); wave.writeUInt16LE(1, 22)
  wave.writeUInt32LE(16000, 24); wave.writeUInt32LE(32000, 28); wave.writeUInt16LE(2, 32)
  wave.writeUInt16LE(16, 34); wave.write('data', 36); wave.writeUInt32LE(320, 40)
  writeFileSync(path, wave)
  return path
}
const localAudioReads = f => {
  const path = join(f.home, 'audio-reads.jsonl')
  return existsSync(path) ? readFileSync(path, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : []
}
const changeAudioAuthorization = (f, grant) => f.instance.uiBridge.saveAuthorization({ revision: f.instance.uiBridge.readAuthorization().revision, grant })
const audioCommands = f => f.commands().filter(row => ['transcribe', 'prosody'].includes(row.op))

for (const state of ['never-granted', 'revoked']) test(`local audio tools reject ${state} before helper startup or file access`, async t => {
  const f = await fixture(t, { authorized: state === 'revoked' })
  if (state === 'revoked') assert.equal((await changeAudioAuthorization(f, false)).granted, false)
  const path = syntheticLocalAudio(f)
  for (const name of ['voice_transcribe', 'voice_prosody']) {
    assert.match(await f.invokeRaw(name, { path }), /AUTHORIZATION_REQUIRED/)
  }
  assert.equal(f.spawned.length, 0)
  assert.deepEqual(audioCommands(f), [])
  assert.deepEqual(localAudioReads(f), [])
})

test('local audio tools accept a live caller with local-audio alone, without microphone or network permission', async t => {
  const f = await fixture(t), path = syntheticLocalAudio(f)
  const permissionPath = join(f.home, 'whale-ear/config.json.agent-permissions.json')
  const policy = JSON.parse(readFileSync(permissionPath, 'utf8'))
  policy.authorization.scopes = ['local-audio']
  writeFileSync(permissionPath, JSON.stringify(policy))
  for (const name of ['voice_transcribe', 'voice_prosody']) assert.match(await f.invokeRaw(name, { path }), /文本:/)
  assert.equal(f.readConfig().voiceSessionId, null)
  assert.deepEqual(localAudioReads(f), [{ op: 'transcribe', bytes: 364 }, { op: 'prosody', bytes: 364 }])
  assert.deepEqual(audioCommands(f).map(row => row.op), ['transcribe', 'prosody'])
  assert.equal(f.commands().some(row => row.op === 'start' || row.op === 'always' && row.enabled), false)
})

for (const name of ['voice_transcribe', 'voice_prosody']) {
  test(`local audio ${name} rejects missing or forged caller and pre-aborted requests`, async t => {
    const f = await fixture(t), path = syntheticLocalAudio(f)
    for (const caller of [null, { ...f.owner }]) assert.match(await f.invokeRaw(name, { path }, caller), /操作来源不是当前真实会话/)
    const controller = new AbortController(); controller.abort(new Error('synthetic-cancelled'))
    assert.match(await f.invokeRaw(name, { path }, f.owner, controller.signal), /synthetic-cancelled/)
    assert.equal(f.spawned.length, 0)
    assert.deepEqual(localAudioReads(f), [])
  })

  for (const change of ['revoke', 'revoke-and-regrant', 'abort', 'replace-caller', 'remove-scope']) test(`local audio ${name} rechecks ${change} during helper startup`, async t => {
    const f = await fixture(t), path = syntheticLocalAudio(f), controller = new AbortController()
    const barrier = join(f.home, 'helper-ready-block'); writeFileSync(barrier, '')
    const requested = f.invokeRaw(name, { path }, f.owner, controller.signal)
    await eventually(() => existsSync(join(f.home, 'helper-started')), 'helper is waiting before ready')
    if (change.startsWith('revoke')) {
      const revoking = changeAudioAuthorization(f, false)
      if (change === 'revoke-and-regrant') assert.equal((await changeAudioAuthorization(f, true)).granted, true)
      await revoking
      await f.spawned[0].closed
    } else if (change === 'abort') controller.abort(new Error('synthetic-cancelled'))
    else if (change === 'replace-caller') f.residents.set(f.owner.id, { ...f.owner })
    else {
      const permissionPath = join(f.home, 'whale-ear/config.json.agent-permissions.json')
      const policy = JSON.parse(readFileSync(permissionPath, 'utf8')); policy.authorization.scopes = ['microphone']
      writeFileSync(permissionPath, JSON.stringify(policy))
    }
    unlinkSync(barrier)
    assert.match(await requested, /❌/)
    assert.deepEqual(audioCommands(f), [], 'no local file command crossed the helper boundary')
    assert.deepEqual(localAudioReads(f), [], 'no audio bytes were read')
    if (change === 'revoke-and-regrant') {
      assert.match(await f.invokeRaw(name, { path }), /文本:/)
      assert.equal(localAudioReads(f).length, 1, 'only the new authorized request reads the file')
    }
  })

  for (const stage of ['before-read', 'after-read']) test(`local audio ${name} revocation ${stage} terminates processing without a microphone owner`, async t => {
    const f = await fixture(t), path = syntheticLocalAudio(f)
    const barrier = join(f.home, stage === 'before-read' ? 'audio-read-block' : 'audio-result-block')
    writeFileSync(barrier, '')
    const requested = f.invokeRaw(name, { path })
    await eventually(() => stage === 'before-read' ? audioCommands(f).length === 1 : localAudioReads(f).length === 1, 'local audio request is in flight')
    assert.equal(f.readConfig().voiceSessionId, null)
    const revoking = changeAudioAuthorization(f, false)
    const regranted = await changeAudioAuthorization(f, true)
    assert.equal(regranted.granted, true)
    await revoking
    await f.spawned[0].closed
    assert.match(await requested, /AUTHORIZATION_REVOKED/)
    assert.equal(localAudioReads(f).length, stage === 'before-read' ? 0 : 1)
    unlinkSync(barrier)
    assert.equal(f.spawned.length, 1, 'old request cannot restart its helper after regrant')
    assert.match(await f.invokeRaw(name, { path }), /文本:/)
    assert.equal(localAudioReads(f).length, stage === 'before-read' ? 1 : 2)
  })

  test(`local audio ${name} withholds a completed result after caller cancellation`, async t => {
    const f = await fixture(t), path = syntheticLocalAudio(f), controller = new AbortController()
    const barrier = join(f.home, 'audio-result-block'); writeFileSync(barrier, '')
    const requested = f.invokeRaw(name, { path }, f.owner, controller.signal)
    await eventually(() => localAudioReads(f).length === 1, 'authorized request read the fixture')
    controller.abort(new Error('synthetic-cancelled'))
    unlinkSync(barrier)
    const result = await requested
    assert.match(result, /synthetic-cancelled/)
    assert.doesNotMatch(result, /文本:/)
  })
}

for (const name of ['voice_transcribe', 'voice_prosody']) test(`local audio ${name} rechecks revocation after the service promise settles`, async t => {
  const f = await fixture(t), path = syntheticLocalAudio(f), operation = name.slice('voice_'.length)
  const original = f.instance.ear[operation]
  f.instance.ear[operation] = async (...args) => {
    const result = await original(...args)
    await changeAudioAuthorization(f, false)
    await changeAudioAuthorization(f, true)
    return result
  }
  const result = await f.invokeRaw(name, { path })
  assert.equal(localAudioReads(f).length, 1, 'work was authorized before revocation')
  assert.match(result, /AUTHORIZATION_CHANGED/)
  assert.doesNotMatch(result, /文本:/, 'the revoked result cannot be returned by the registered handler')
})
