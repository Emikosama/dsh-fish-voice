/** Legacy command adapter → shared UI dispatcher → UI bridge → plugin integration.
 * Host services are isolated fixtures; helper is Node, never microphone/Python/network.
 * Native DSH CommandRuntime coverage lives in ui/tests/host-commands.spec.ts. */
import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { randomUUID } from 'node:crypto'
import { registerHooks } from 'node:module'
import { apply as applyUiHost } from '../ui/host.mjs'
import { createController } from '../ui/tests/action-harness.mjs'
import { renderControls } from './helpers/render-controls.mjs'

async function eventually(predicate, label) {
  for (let n = 0; n < 150; n++) {
    if (predicate()) return
    await new Promise(resolve => setTimeout(resolve, 10))
  }
  assert.fail(`Timed out: ${label}`)
}

async function fixture(t, { efforts = ['off', 'low'], voiceSession, missing, cueSupport = true, captureProtocol = false, turnSignals, coldConfig = {}, rawConfig, compat = false, published = false } = {}) {
  const home = mkdtempSync(join(tmpdir(), 'whale-integration-'))
  const dir = join(home, 'whale-ear')
  mkdirSync(dir)
  const helper = join(home, 'fake-helper.mjs')
  const commandFile = join(home, 'commands.jsonl')
  writeFileSync(helper, `
import { createInterface } from 'node:readline';
import { appendFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
const emit = payload => process.stdout.write(JSON.stringify(payload) + '\\n');
let alwaysEnabled = false;
const pause = () => new Promise(resolve => setTimeout(resolve, 5));
appendFileSync(${JSON.stringify(join(home, 'helper-started'))}, 'started');
appendFileSync(${JSON.stringify(join(home, 'helper-start-config.jsonl'))}, JSON.stringify(readFileSync(${JSON.stringify(join(dir, 'config.json'))}, 'utf8'))+'\\n');
emit({event:'ready', captureDeviceProtocol:'whale-capture-device/1', requestProtocol:'whale-request/1', inputDeviceEnumeration:true, ...${JSON.stringify(captureProtocol ? {captureProtocol:'whale-capture/1',captureId:'initial-capture'} : {})}, pid:process.pid, python:'fake-node', asr:'fake', ...${JSON.stringify(cueSupport ? {turnSignals:{protocol:'whale-input-cue/1'}} : {})}});
for await (const line of createInterface({input:process.stdin})) {
 const msg=JSON.parse(line);
 appendFileSync(${JSON.stringify(commandFile)}, JSON.stringify(msg)+'\\n');
 if(msg.op==='status' && existsSync(${JSON.stringify(join(home, 'fail-status'))})) { emit({event:'error', requestId:msg.requestId, message:'SYNTHETIC-PRIVATE-HELPER-ERROR'}); continue; }
 if(msg.op==='cue'||msg.op==='cue-cancel') continue;
 if(msg.op==='status' && existsSync(${JSON.stringify(join(home, 'inject-events.json'))})) { for (const event of JSON.parse(readFileSync(${JSON.stringify(join(home, 'inject-events.json'))}, 'utf8'))) emit(event); }
 if(msg.op==='capture-status') { emit({event:'capture-status',requestId:msg.requestId,captureDevice:{state:'released'}}); continue; }
 if(msg.op==='quit') { emit({event:'bye',requestId:msg.requestId}); process.exit(0); }
 if(msg.op==='input-devices') { emit({event:'input-devices', requestId:msg.requestId, inputDevices:[{index:3,name:'Fixture microphone'}]}); continue; }
 const event = {'always':'always', 'stop':'stopped', 'start':'started', 'ptt-status':'ptt-status', 'status':'status', 'always-status':'always-status'}[msg.op];
 if(msg.op==='ptt-status' && existsSync(${JSON.stringify(join(home, 'hold-final-ptt'))}) && JSON.parse(readFileSync(${JSON.stringify(join(dir, 'config.json'))}, 'utf8')).voiceSessionId) {
   appendFileSync(${JSON.stringify(join(home, 'at-final-ptt'))}, 'waiting');
   while(existsSync(${JSON.stringify(join(home, 'hold-final-ptt'))})) await pause();
 }
 if(msg.op==='always' && msg.enabled && existsSync(${JSON.stringify(join(home, 'hold-always'))})) {
   appendFileSync(${JSON.stringify(join(home, 'at-always'))}, 'waiting');
   while(existsSync(${JSON.stringify(join(home, 'hold-always'))})) await pause();
 }
 if(msg.op==='always') alwaysEnabled = !!msg.enabled;
 if(!event) throw new Error('Unexpected helper command '+msg.op);
 emit({event, requestId:msg.requestId, status:{enabled:alwaysEnabled}, models:{loaded:[]}, voiceprints:{}, asr:'fake'});
 if(existsSync(${JSON.stringify(join(home, 'queued-events.json'))})) { const events=JSON.parse(readFileSync(${JSON.stringify(join(home, 'queued-events.json'))},'utf8')); unlinkSync(${JSON.stringify(join(home, 'queued-events.json'))}); for(const item of events) emit(item); }
 if(msg.op==='start' && existsSync(${JSON.stringify(join(home, 'next-transcript.json'))})) emit({...JSON.parse(readFileSync(${JSON.stringify(join(home, 'next-transcript.json'))}, 'utf8')), ...(msg.awaitTranscript ? {requestId:msg.requestId} : {})});
}
`)
  const configPath = join(dir, 'config.json')
  const config = { pythonPath: process.execPath, helperPath: helper, autoStart: false, pttMouse: 0, voiceSession: { ...(!compat ? { handoffBackend: 'native_team', subagentApiProfile: 'source_flat_v1' } : {}), ...voiceSession }, ...(turnSignals ? {turnSignals} : {}), ...coldConfig }
  writeFileSync(configPath, rawConfig ?? JSON.stringify(config))
  const calls = { resume: [], taskReads: [], taskLists: [], reserves: [], create: [], rootFollowup: [], rootSteer: [], drain: [], restrictions: [], guards: [], prompt: [], activation: [], send: [], interrupt: [], dispose: [], flush: [], speechCancel: [], ownerFollowup: [], ownerSteer: [], model: [], coldResume: [] }
  const residents = new Map(), parents = new Map(), registrations = new Map(), listeners = new Map(), services = new Map()
  const faults = {}
  const domains = new Map(), openDomains = new Set(), eventLogs = new Map()
  const catalogs = new Map(), policyById = new Map(), commandRegistrations = new Map()
  calls.domainWrites = []; calls.domainOpens = []; calls.domainCloses = []; calls.humanCommands = []; calls.processes = []; calls.configWrites = []
  const ioState = { configPath, faults, calls, blockedReads: 0 }
  globalThis.__whaleUiIntegrationIo = ioState
  const identities = new Map(), archive = new Map(), boards = new Map(), presentations = new Map(), enabledTeams = new Set()
  function agent(id, model = { provider: 'fake-provider', model: 'fake-model', reasoningEffort: 'high' }) {
    const inbox = []; inbox.nextTurn = []; inbox.nextStep = []; inbox.clear = () => { inbox.nextTurn.length = 0; inbox.nextStep.length = 0 }
    return { id, session: { id, header: { id, version: 4, createdAt: Date.now(), isSeeded: false }, snapshotEvents: () => eventLogs.get(id) ?? [] }, status: 'idle', inbox, model: { current: () => ({ ...model }), select: selected => { model = { ...selected } } }, whenIdle: async () => {}, followup: async msg => calls.ownerFollowup.push(msg), steer: async msg => calls.ownerSteer.push(msg) }
  }
  const owner = agent('owner-session')
  residents.set(owner.id, owner)
  const foreign = agent('foreign-session')
  residents.set(foreign.id, foreign)
  const scopedTools = {
    get: name => registrations.get(name) ?? (name === 'speak' ? { name } : undefined),
    setExecutor: executor => { calls.executor = executor },
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
      return { agent: root, async dispose() { calls.dispose.push(root.id); if (faults.rootDisposeGate) await faults.rootDisposeGate; residents.delete(root.id) } }
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
      const request = published ? options.request : options
      if (published) {
        assert.ok(request?.parent, 'published API reads nested request')
        // The official rc.1 service ignores extra outer task fields. The
        // compatibility caller supplies the identical task view for rc.3.
        if (options.parent !== undefined) {
          assert.equal(options.parent, request.parent)
          assert.equal(options.prompt, request.prompt)
          assert.equal(options.agentOptions, request.agentOptions)
          assert.equal(options.maxDepth, request.maxDepth)
        }
      }
      parents.set(childId, request.parent.id)
      const worker = agent(childId, request.agentOptions); worker.session.header.parentSession = request.parent.id
      residents.set(childId, worker)
      return { childId, name: options.name ?? 'voice-worker', messageId: randomUUID(), result: Promise.resolve(), async dispose() { calls.dispose.push(childId); residents.delete(childId) } }
    },
    async sendMessage(source, targetId, content, options) {
      if (faults.sendError) throw faults.sendError
      assert.equal(residents.get(source.id), source, 'source must be exact live Agent')
      if (!residents.has(targetId)) {
        assert.ok(parents.has(targetId), 'cold target must be a known managed child')
        calls.coldResume.push(targetId)
        const cold = agent(targetId); cold.session.header.parentSession = parents.get(targetId); residents.set(targetId, cold)
      }
      calls.send.push({ source, targetId, content, options })
      return randomUUID()
    },
    async drainDescendants(roots) { calls.drain.push(roots.map(root => root.id)) },
    interrupt(id, source) { calls.interrupt.push({ id, source }) },
    async listDescendants(id) { return [...parents].filter(([, parent]) => parent === id).map(([child]) => ({ kind: 'child', id: child, parentId: id, depth: 1 })) },
  }
  const llm = { async resolveModelInfo(provider, model, signal) { calls.model.push({ provider, model, signal }); if (faults.modelGate) await faults.modelGate; return { reasoning: { efforts: efforts.map(id => ({ id })) } } } }
  const ctx = {
    agents,
    agentTeams,
    commands: { register(definition) { commandRegistrations.set(definition.name, definition); return () => commandRegistrations.delete(definition.name) } },
    storage: { domain: { async open(spec) {
      calls.domainOpens.push(spec.name)
      if (openDomains.has(spec.name)) throw new Error('Native domain already open')
      openDomains.add(spec.name)
      if (!domains.has(spec.name)) domains.set(spec.name, new Map(Object.keys(spec.tables).map(name => [name,
        spec.name === 'whale_voice_catalog' ? catalogs : spec.name === 'whale_voice_identity' ? identities : new Map()])))
      const data = domains.get(spec.name)
      const tables = Object.fromEntries(Object.entries(spec.tables).map(([name, descriptor]) => {
        const records = data.get(name), shape = descriptor.valueSchema
        return [name, {
          get: key => records.get(key), entries: () => records.entries(),
          async put(key, value) {
            calls.domainWrites.push({ domain: spec.name, table: name, op: 'put', key })
            if (faults.beforeDomainPut) await faults.beforeDomainPut(spec.name, name, key)
            records.set(key, shape.parse(value))
            if (faults.writeAfterCommit === `${spec.name}:put` || faults.compatUnknown === name && spec.name.startsWith('whale_handoff_')) throw new Error('PRIVATE-UNCERTAIN-WRITE')
          },
          async update(key, updater) {
            calls.domainWrites.push({ domain: spec.name, table: name, op: 'update', key })
            const value = shape.parse(updater(records.get(key))); records.set(key, value)
            if (faults.writeAfterCommit === `${spec.name}:update`) throw new Error('PRIVATE-UNCERTAIN-WRITE')
            return structuredClone(value)
          },
        }]
      }))
      return { table: name => { assert.ok(tables[name], `declared table ${name}`); return tables[name] }, async close() { calls.domainCloses.push(spec.name); openDomains.delete(spec.name) } }
    } } },
    sessionPersistence: { async flush() { if (faults.leaseGate) await faults.leaseGate; if (faults.sessionFlush) throw new Error('Synthetic session flush failure') }, async stat(id) { return archive.has(id) ? { header: archive.get(id).header } : null } },
    workspaceRegistry: { archivedSessionIds: [], sessionPresentation: { apiVersion: 1, async reserve(id, options) { calls.reserves.push({ id, options }); presentations.set(id, options) }, get: id => presentations.get(id) } },
    subagents,
    llm,
    sessions: { flush(session) { calls.flush.push(session.id); return faults.leaseConfirmed !== false } },
    systemPrompt,
    tools: { ...scopedTools, register(definition) { registrations.set(definition.name, definition); return () => registrations.delete(definition.name) } },
    get(name) { return services.get(name) ?? this[name] },
    provide(name, value) { services.set(name, value); this[name] = value },
    on(name, callback) { listeners.set(name, callback); return () => listeners.delete(name) },
    effect(callback) { callback() },
  }
  if (published) { delete ctx.agentTeams; delete subagents.rootOf; delete ctx.workspaceRegistry.sessionPresentation }
  if (missing) delete ctx[missing]
  services.set('dstuberVoice', { cancel(reason) { calls.speechCancel.push(reason) } })
  globalThis.__whaleUiIntegrationPolicies = policyById
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
  literal: expected => schema(value => { assert.equal(value, expected); return value }),
  custom: predicate => schema(value => { assert.ok(predicate(value), 'custom schema rejected record'); return structuredClone(value) }),
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
    export class NativeToolExecutor { constructor(ctx) { this.ctx = ctx } }
    export function captureDelegatedPolicyOverrides(owner) { return globalThis.__whaleUiIntegrationPolicies?.get(owner.id) ?? { testScope: 'shared-allowed-policy' } }
    export function appendDelegatedPolicyOverrides(session, policy) { session.testPolicy = policy }
  `)
  // Fault-inject only the production index's I/O boundary. The fake helper is
  // still a real child process; its observed exit is the no-capture fence.
  const fsUrl = 'data:text/javascript,' + encodeURIComponent(`
    export * from 'node:fs';
    import * as fs from 'node:fs';
    export function writeFileSync(path, data, ...args) {
      const state = globalThis.__whaleUiIntegrationIo;
      if (state && path === state.configPath) {
        let value; try { value = JSON.parse(data) } catch {}
        if (value && Object.hasOwn(value, 'voiceSessionEpoch')) {
          state.calls.configWrites.push({ owner: value.voiceSessionId, epoch: value.voiceSessionEpoch });
          if (state.faults.configIo === 'revoke-write-denied' && value.voiceSessionId === null)
            throw Object.assign(new Error('SYNTHETIC-CONFIG-WRITE-DENIED'), {code:'EACCES'});
          if (state.faults.configIo === 'grant-readback-unknown' && value.voiceSessionId) {
            fs.writeFileSync(path, data, ...args); state.blockedReads = 2; return;
          }
        }
      }
      return fs.writeFileSync(path, data, ...args);
    }
    export function readFileSync(path, ...args) {
      const state = globalThis.__whaleUiIntegrationIo;
      if (state && path === state.configPath && state.faults.configIo === 'config-read-denied') throw Object.assign(new Error('SYNTHETIC-CONFIG-READ-DENIED'), {code:'EACCES'});
      if (state && path === state.configPath && state.blockedReads > 0) {
        state.blockedReads--; throw Object.assign(new Error('SYNTHETIC-CONFIG-READBACK-UNKNOWN'), {code:'EIO'});
      }
      return fs.readFileSync(path, ...args);
    }
  `)
  const processUrl = 'data:text/javascript,' + encodeURIComponent(`
    export * from 'node:child_process';
    import { spawn as realSpawn } from 'node:child_process';
    export function spawn(...args) {
      const child = realSpawn(...args);
      globalThis.__whaleUiIntegrationIo?.calls.processes.push(child);
      return child;
    }
  `)
  const hooks = registerHooks({ resolve(specifier, context, next) {
    if (context.parentURL?.includes('/index.mjs?')) {
      if (specifier === 'node:fs') return { url: fsUrl, shortCircuit: true }
      if (specifier === 'node:child_process') return { url: processUrl, shortCircuit: true }
    }
    if (['@deepseek-ai/dsh-subagent', '@deepseek-ai/dsh-tool-executor-native', '@deepseek-ai/dsh-storage-domain', 'zod'].includes(specifier)) return { url: policyUrl, shortCircuit: true }
    return next(specifier, context)
  } })
  const previousHome = process.env.DSH_HOME
  process.env.DSH_HOME = home
  let plugin
  try { plugin = await import(`${pathToFileURL(join(import.meta.dirname, '..', 'index.mjs'))}?test=${randomUUID()}`) }
  finally { if (previousHome === undefined) delete process.env.DSH_HOME; else process.env.DSH_HOME = previousHome }
  plugin.apply(ctx, { autoStart: coldConfig.autoStart ?? false, pythonPath: process.execPath, helperPath: helper })
  applyUiHost(ctx)
  const instance = globalThis.__dshWhaleEar__
  assert.ok(instance, 'plugin booted')
  const readConfig = () => JSON.parse(readFileSync(configPath, 'utf8'))
  const commands = () => existsSync(commandFile) ? readFileSync(commandFile, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : []
  async function invoke(name, args, caller = owner) {
    const definition = registrations.get(name)
    assert.ok(definition, `tool ${name} registered`)
    return definition.execute(args, { agent: caller, signal: new AbortController().signal })
  }
  async function ui(action, details = {}, caller = owner, signal = new AbortController().signal) {
    const definition = commandRegistrations.get('whale-ear-ui')
    assert.ok(definition, 'production human command registered')
    assert.equal(definition.recordInput, false)
    calls.humanCommands.push({ action, caller })
    return definition.handler({ agent: caller, rawInput: JSON.stringify({ ...details, action }), signal })
  }
  const value = result => { assert.equal(result.kind, 'success', result.text); return JSON.parse(result.text).value }
  const execute = async (id, command) => {
    assert.ok(command.startsWith('/whale-ear-ui '))
    const request = JSON.parse(command.slice('/whale-ear-ui '.length))
    const result = await ui(request.action, request, residents.get(id))
    return { ok: true, value: { result } }
  }
  const controller = createController(execute)
  const status = () => instance.uiBridge.status()
  const transcript = (extra = {}) => ({ text: 'synthetic transcript', mode: 'ptt', speaker_ok: false, voiceSessionId: owner.id, voiceSessionEpoch: readConfig().voiceSessionEpoch, traceId: '0123456789abcdef', ...extra })
  t.after(async () => {
    controller.dispose()
    await instance.dispose().catch(() => {})
    // Each fixture is a separate host; retain failed cleanup only within it.
    if (globalThis.__dshWhaleEar__ === instance) delete globalThis.__dshWhaleEar__
    if (calls.processes.length) await eventually(() => calls.processes.every(process => process.exitCode !== null || process.signalCode !== null), 'every fake helper exited')
    await new Promise(resolve => setTimeout(resolve, 20))
    hooks.deregister()
    delete globalThis.__whaleUiIntegrationPolicies
    delete globalThis.__whaleUiIntegrationIo
    rmSync(home, { recursive: true, force: true })
  })
  return { reload: () => { plugin.apply(ctx, { autoStart:false, pythonPath:process.execPath, helperPath:helper }); return globalThis.__dshWhaleEar__ }, ui, value, controller, execute, ctx, configPath, domains, openDomains, eventLogs, catalogs, policyById, faults, boards, identities, archive, home, instance, calls, residents, owner, foreign, registrations, services, commands, readConfig, invoke, status, transcript, listeners }
}

const deferred = () => { let resolve; const promise = new Promise(done => { resolve = done }); return { promise, resolve } }
const errorResult = result => { assert.equal(result.kind, 'error', result.text); return result.text }

// These tests import all production UI/backend adapters above. No API between
// controller, host command, bridge, core manager or native catalog is mocked.
test('production status, settings and catalog stay read-only before audio is explicitly enabled', async t => {
  const f = await fixture(t)
  f.controller.setSession(f.owner.id)
  assert.equal(await f.controller.run(f.owner.id, 'status'), true)
  assert.equal(f.controller.getSnapshot().status.enabled, false)
  assert.equal(await f.controller.run(f.owner.id, 'read-settings'), true)
  assert.equal(f.controller.getSnapshot().settings.capabilities.turnSignals, true)
  await new Promise(resolve => setTimeout(resolve, 0))
  await eventually(() => !f.controller.getSnapshot().busy, 'first-run settings read settles')
  assert.equal(await f.controller.run(f.owner.id, 'list'), true)
  assert.deepEqual(f.controller.getSnapshot().catalog.items, [])
  assert.equal(f.calls.create.length, 0)
  assert.equal(f.calls.model.length, 0)
  assert.equal(f.calls.activation.length, 0)
  assert.equal(f.calls.domainWrites.length, 0)
  assert.deepEqual(f.commands(), [])
  assert.equal(existsSync(join(f.home, 'helper-started')), false)
})

test('human new creates one hidden independent root, five tools and no model turn; off fallback is honest', async t => {
  const f = await fixture(t, { efforts: ['medium', 'high'] })
  assert.equal(await f.controller.run(f.owner.id, 'new'), true)
  const snapshot = f.controller.getSnapshot(), rootId = snapshot.status.voiceSession.id
  assert.equal(snapshot.status.enabled, true)
  assert.equal(snapshot.status.voiceSession.presentation.hidden, true)
  assert.equal(f.calls.create.length, 1)
  assert.equal(f.calls.create[0].sessionId, rootId)
  assert.equal(f.calls.create[0].seed, undefined)
  assert.equal(f.calls.create[0].meta?.parentSession, undefined)
  assert.equal(f.calls.create[0].agentOptions.reasoningEffort, undefined)
  assert.equal(f.owner.model.current().reasoningEffort, 'high')
  assert.deepEqual(f.calls.restrictions[0].allow.sort(), ['voice_control', 'voice_delegate', 'voice_message', 'voice_status', 'whale_voice_speak'])
  assert.match(f.calls.prompt[0].text, /Do NOT plan tasks/)
  assert.match(f.calls.prompt[0].text, /Do not assume fixed worker roles/)
  assert.deepEqual(f.residents.get(rootId).session.testPolicy, { testScope: 'shared-allowed-policy' })
  assert.equal(f.calls.rootFollowup.length, 0)
  assert.equal(f.calls.rootSteer.length, 0)
  assert.equal(f.calls.activation.length, 0)
  assert.equal(f.catalogs.get(rootId).originSessionId, f.owner.id)
  const detailed = await f.invoke('voice_status', { scope: 'tasks' })
  assert.match(detailed, /请求=off/)
  assert.match(detailed, /provider_default_unverified/)
  assert.match(detailed, /不保证服务端执行/)
})

test('muted main-panel new stores a fresh root without audio, then enable restores that exact root', async t => {
  const f = await fixture(t)
  const created = f.value(await f.ui('new', { expectedOwnerSessionId: null }))
  const rootId = f.calls.create[0]?.sessionId
  assert.ok(rootId)
  assert.equal(created.enabled, false)
  assert.equal(created.ownerSessionId, null)
  assert.equal(created.voiceSession.id, null, 'the muted root is prepared and persisted, then the active manager is closed')
  assert.equal(created.voiceSession.fullyStopped, true)
  assert.equal(f.readConfig().voiceSessionId ?? null, null, 'muted creation never persists a microphone grant')
  assert.equal(f.identities.get(f.owner.id)?.rootSessionId, rootId, 'the fresh root identity is durable for the next enable')
  assert.equal(f.archive.get(rootId)?.header.id, rootId, 'the native Agent session is stored')
  assert.equal(f.calls.create.length, 1)
  assert.equal(f.calls.resume.length, 0)
  assert.equal(f.calls.processes.length, 0, 'muted creation does not launch the audio helper')
  assert.equal(existsSync(join(f.home, 'helper-started')), false)
  assert.deepEqual(f.commands(), [])

  const enabled = f.value(await f.ui('enable', { expectedOwnerSessionId: null }))
  assert.equal(enabled.enabled, true)
  assert.equal(enabled.ownerSessionId, f.owner.id)
  assert.equal(enabled.voiceSession.id, rootId, 'enable resumes the exact root created while muted')
  assert.equal(enabled.voiceSession.persistence.restored, true)
  assert.equal(f.calls.create.length, 1, 'enable must not create a replacement root')
  assert.equal(f.calls.resume.length, 1)
  assert.equal(f.calls.resume[0].resumeSessionId, rootId)
  assert.equal(f.calls.processes.length, 1, 'the explicit enable is the first action to launch audio')
})

test('active main-panel new keeps the grant and leaves the prior root history selectable', async t => {
  const f = await fixture(t)
  const previous = f.value(await f.ui('new'))
  const previousId = previous.voiceSession.id
  const previousAgent = f.residents.get(previousId)
  assert.ok(previousAgent)
  assert.equal(await f.instance.ear.deliver(f.transcript({ text: '旧会话里的转写' })), true)
  assert.equal(f.calls.rootFollowup.length, 1)

  // Model one event already persisted in the old native session. The fixture's
  // snapshotEvents adapter exposes it just as the host session store does.
  const oldEvent = { seq: 0, type: 'user/message', surfaceOp: 'append', time: 1,
    data: { id: 'old-history', source: { kind: 'whale-ear' }, content: [{ type: 'text', text: '旧会话里的转写' }] } }
  f.eventLogs.set(previousId, [oldEvent])
  const oldCatalogEntry = structuredClone(f.catalogs.get(previousId))
  const oldEpoch = f.readConfig().voiceSessionEpoch
  const helper = f.calls.processes[0]

  const next = f.value(await f.ui('new', { expectedOwnerSessionId: f.owner.id }, previousAgent))
  const nextId = next.voiceSession.id
  assert.ok(nextId)
  assert.notEqual(nextId, previousId, 'the main-panel action creates a fresh Agent')
  assert.equal(next.enabled, true, 'an active new chat retains the microphone grant')
  assert.equal(next.ownerSessionId, f.owner.id)
  assert.equal(f.residents.get(nextId)?.id, nextId)
  assert.equal(f.readConfig().voiceSessionId, f.owner.id)
  assert.notEqual(f.readConfig().voiceSessionEpoch, oldEpoch)
  assert.equal(f.status().helper.online, true)
  assert.equal(f.calls.processes.length, 1, 'switching roots reuses the already-running helper')
  assert.equal(helper.exitCode, null)
  assert.equal(helper.signalCode, null)
  assert.equal(f.calls.create.length, 2)
  assert.equal(f.calls.resume.length, 0)

  assert.equal(f.archive.has(previousId), true)
  assert.deepEqual(f.archive.get(previousId).snapshotEvents(), [oldEvent], 'new chat does not erase the old native session history')
  assert.deepEqual(f.catalogs.get(previousId), oldCatalogEntry, 'the prior root remains in the durable voice catalog')
  assert.equal(f.residents.has(previousId), false, 'the previous Agent is retired after its history is saved')
})

test('stale and foreign main-panel new requests are rejected without changing voice state', async t => {
  const f = await fixture(t)
  const beforeStale = {
    config: readFileSync(f.configPath, 'utf8'),
    created: f.calls.create.length,
    resumed: f.calls.resume.length,
    models: f.calls.model.length,
    writes: f.calls.domainWrites.length,
    processes: f.calls.processes.length,
  }
  assert.match(errorResult(await f.ui('new', { expectedOwnerSessionId: 'stale-owner' })), /VOICE_OWNER_CHANGED/)
  assert.equal(readFileSync(f.configPath, 'utf8'), beforeStale.config)
  assert.deepEqual([f.calls.create.length, f.calls.resume.length, f.calls.model.length, f.calls.domainWrites.length, f.calls.processes.length],
    [beforeStale.created, beforeStale.resumed, beforeStale.models, beforeStale.writes, beforeStale.processes])

  const active = f.value(await f.ui('new'))
  const before = {
    config: readFileSync(f.configPath, 'utf8'),
    root: f.status().voiceSession.id,
    owner: f.status().ownerSessionId,
    create: f.calls.create.length,
    resume: f.calls.resume.length,
    model: f.calls.model.length,
    writes: f.calls.domainWrites.length,
    helperCommands: f.commands(),
    processes: f.calls.processes.length,
    catalog: [...f.catalogs.entries()].map(([id, row]) => [id, structuredClone(row)]),
  }
  assert.ok(active.enabled)

  assert.match(errorResult(await f.ui('new', { expectedOwnerSessionId: null }, f.owner)), /VOICE_OWNER_CHANGED/)
  assert.match(errorResult(await f.ui('new', { expectedOwnerSessionId: f.owner.id }, f.foreign)), /当前语音会话|开启麦克风/)
  assert.equal(readFileSync(f.configPath, 'utf8'), before.config)
  assert.equal(f.status().voiceSession.id, before.root)
  assert.equal(f.status().ownerSessionId, before.owner)
  assert.equal(f.status().enabled, true)
  assert.equal(f.calls.create.length, before.create)
  assert.equal(f.calls.resume.length, before.resume)
  assert.equal(f.calls.model.length, before.model)
  assert.equal(f.calls.domainWrites.length, before.writes)
  assert.deepEqual(f.commands(), before.helperCommands)
  assert.equal(f.calls.processes.length, before.processes)
  assert.deepEqual([...f.catalogs.entries()].map(([id, row]) => [id, structuredClone(row)]), before.catalog)
})

test('explicit cross-origin resume restores exact catalog root and keeps tasks without replay', async t => {
  const f = await fixture(t)
  const first = f.value(await f.ui('new')).voiceSession.id
  f.boards.set(first, [{ id: 'saved-task', revision: 7, subject: 'Awaiting decision', description: 'PRIVATE-TASK-TEXT', status: 'pending' }])
  f.value(await f.ui('disable'))
  const list = f.value(await f.ui('list', {}, f.foreign))
  assert.equal(list.items[0].id, first)
  assert.equal(list.items[0].canResume, true)
  assert.doesNotMatch(JSON.stringify(list), /PRIVATE-TASK-TEXT|saved-task/)
  const restored = f.value(await f.ui('resume', { id: first }, f.foreign))
  assert.equal(restored.voiceSession.id, first)
  assert.equal(restored.ownerSessionId, f.foreign.id)
  assert.equal(restored.voiceSession.persistence.restored, true)
  assert.equal(f.calls.create.length, 1)
  assert.equal(f.calls.resume.length, 1)
  assert.equal(f.calls.resume[0].resumeSessionId, first)
  assert.equal(f.catalogs.get(first).originSessionId, f.owner.id, 'catalog provenance never becomes new permission')
  assert.equal(f.calls.rootFollowup.length + f.calls.rootSteer.length + f.calls.activation.length, 0)
  assert.equal(f.boards.get(first)[0].revision, 7)
})

test('same-ID impostors cannot invoke the production bridge and request fields cannot forge the caller', async t => {
  const f = await fixture(t)
  const settings = f.value(await f.ui('read-settings'))
  for (const [action, details] of [
    ['status', {}], ['read-settings', {}], ['list', {}], ['enable', {}], ['disable', {}], ['new', {}],
    ['resume', { id: 'forged-root' }], ['listen-mode', { mode: 'always' }],
    ['save-settings', { revision: settings.revision, values: settings.values }],
    ['save-models', { revision: settings.revision, values: settings.modelSetup }],
  ]) {
    assert.match(errorResult(await f.ui(action, details, { ...f.owner })), /来源|真实/)
  }
  const before = readFileSync(f.configPath, 'utf8')
  assert.match(errorResult(await f.ui('enable', { sessionId: f.foreign.id })), /字段|无效|不支持/)
  assert.equal(readFileSync(f.configPath, 'utf8'), before)
  assert.equal(f.calls.create.length + f.calls.resume.length, 0)
  assert.deepEqual(f.commands(), [])
})

test('settings CAS rejects stale and executable-path fields, and valid model paths never execute or download', async t => {
  const f = await fixture(t)
  const before = f.value(await f.ui('read-settings'))
  for (const key of ['helperPath', 'pythonPath', 'voiceSessionId', 'voiceSessionEpoch', 'voiceSession', 'models', '__proto__']) {
    const values = Object.fromEntries([...Object.entries(before.values), [key, '/do/not/execute']])
    assert.match(errorResult(await f.ui('save-settings', { revision: before.revision, values })), /字段|授权/)
  }
  const saved = f.value(await f.ui('save-settings', { revision: before.revision, values: { ...before.values, device: 'Fixture USB', pttMouse: 2 } }))
  assert.notEqual(saved.revision, before.revision)
  assert.match(errorResult(await f.ui('save-settings', { revision: before.revision, values: before.values })), /配置已改变/)
  const values = { asr: 'whisper', models: { sensevoiceDir: '/models/sensevoice', whisper: '/models/whisper; touch /tmp/forbidden', campplus: '' } }
  const modelSaved = f.value(await f.ui('save-models', { revision: saved.revision, values }))
  assert.equal(modelSaved.modelSetup.models.whisper, values.models.whisper)
  assert.equal(f.readConfig().pythonPath, process.execPath)
  assert.equal(f.readConfig().helperPath, join(f.home, 'fake-helper.mjs'))
  assert.equal(f.readConfig().voiceSessionId ?? null, null)
  assert.equal(f.calls.create.length + f.calls.resume.length + f.calls.model.length, 0)
  assert.equal(existsSync(join(f.home, 'helper-started')), false)
  assert.deepEqual(f.commands(), [])
  for (const models of [{ ...values.models, helperPath: '/evil' }, { ...values.models, whisper: 'https://example.invalid/model' }]) {
    assert.equal((await f.ui('save-models', { revision: modelSaved.revision, values: { ...values, models } })).kind, 'error')
  }
})

test('rapid duplicate clicks create only one root; a focus switch is not permission transfer', async t => {
  const f = await fixture(t), gate = deferred()
  f.faults.modelGate = gate.promise
  const first = f.controller.run(f.owner.id, 'new')
  await eventually(() => f.calls.model.length === 1, 'first UI command at model metadata gate')
  assert.equal(await f.controller.run(f.owner.id, 'new'), false)
  assert.equal(await f.controller.run(f.foreign.id, 'new'), false)
  assert.equal(f.calls.humanCommands.filter(x => x.action === 'new').length, 1)
  gate.resolve()
  assert.equal(await first, true)
  assert.equal(f.controller.getSnapshot().checkedFor, f.owner.id)
  assert.equal(f.controller.getSnapshot().status.ownerSessionId, f.owner.id)
  assert.equal(await f.controller.run(f.foreign.id, 'status'), true)
  assert.equal(f.controller.getSnapshot().checkedFor, f.foreign.id)
  assert.equal(f.controller.getSnapshot().status.ownerSessionId, f.owner.id)
  assert.equal(f.calls.create.length, 1)
})

test('disposed controller ignores a late completed command response without retrying the mutation', async t => {
  const f = await fixture(t), gate = deferred()
  f.faults.modelGate = gate.promise
  const old = f.controller.run(f.owner.id, 'new')
  await eventually(() => f.calls.model.length === 1, 'old request started')
  f.controller.dispose()
  const replacement = createController(f.execute)
  t.after(() => replacement.dispose())
  assert.equal(await replacement.run(f.foreign.id, 'status'), true)
  assert.equal(replacement.getSnapshot().status.enabled, false)
  gate.resolve(); assert.equal(await old, true)
  assert.equal(f.controller.getSnapshot().status, null)
  assert.equal(replacement.getSnapshot().status.enabled, false, 'a late other-window response cannot overwrite this window')
  assert.equal(f.calls.create.length, 1)
})

test('cancelled queued disable cannot revoke the grant completed ahead of it', async t => {
  const f = await fixture(t), gate = deferred(), cancel = new AbortController()
  f.faults.modelGate = gate.promise
  const creating = f.ui('new')
  await eventually(() => f.calls.model.length === 1, 'new at gate')
  const staleDisable = f.ui('disable', {}, f.owner, cancel.signal)
  cancel.abort(); gate.resolve()
  const root = f.value(await creating).voiceSession.id
  assert.match(errorResult(await staleDisable), /取消|abort/i)
  assert.equal(f.status().enabled, true)
  assert.equal(f.status().voiceSession.id, root)
  assert.equal(f.readConfig().voiceSessionId, f.owner.id)
})

test('queued enable retains exact captured live Agent rather than adopting a same-ID replacement', async t => {
  const f = await fixture(t), gate = deferred()
  f.faults.modelGate = gate.promise
  const creating = f.ui('new')
  await eventually(() => f.calls.model.length === 1, 'new at gate')
  const staleEnable = f.ui('enable')
  f.residents.set(f.owner.id, { ...f.owner })
  gate.resolve()
  assert.equal((await creating).kind, 'error')
  assert.match(errorResult(await staleEnable), /来源|真实|会话已改变|live|active/i)
  assert.equal(f.readConfig().voiceSessionId, null)
  assert.equal(f.calls.create.length, 0)
})

test('archived roots and changed origin policy cannot grant or auto-create replacement chats', async t => {
  for (const failure of ['archived', 'policy']) await t.test(failure, async child => {
    const f = await fixture(child)
    const root = f.value(await f.ui('new')).voiceSession.id
    f.value(await f.ui('disable'))
    if (failure === 'archived') f.ctx.workspaceRegistry.archivedSessionIds.push(root)
    else f.policyById.set(f.owner.id, { testScope: 'changed-policy' })
    const list = f.value(await f.ui('list'))
    assert.equal(list.items[0].canResume, false)
    assert.equal((await f.ui('resume', { id: root })).kind, 'error')
    assert.equal(f.readConfig().voiceSessionId, null)
    assert.equal(f.status().enabled, false)
    assert.equal(f.calls.create.length, 1)
    assert.equal(f.calls.resume.length, 0)
    assert.equal(f.catalogs.size, 1)
    assert.equal(f.calls.activation.length, 0)
  })
})

test('uncertain new/resume catalog writes revoke grants, preserve exact root and block automatic retry', async t => {
  for (const operation of ['new', 'resume']) await t.test(operation, async child => {
    const f = await fixture(child)
    let existing
    if (operation === 'resume') {
      existing = f.value(await f.ui('new')).voiceSession.id
      f.value(await f.ui('disable'))
    }
    f.faults.writeAfterCommit = `whale_voice_catalog:${operation === 'new' ? 'put' : 'update'}`
    const result = await f.ui(operation, operation === 'resume' ? { id: existing } : {})
    const root = existing ?? [...f.catalogs.keys()][0]
    const message = errorResult(result)
    assert.ok(root)
    assert.ok(message.includes(root), 'uncertain action must retain its exact root ID for inspection')
    assert.doesNotMatch(message, /PRIVATE-UNCERTAIN-WRITE|stack|cause/)
    assert.equal(f.readConfig().voiceSessionId, null)
    assert.equal(f.status().enabled, false)
    const before = [f.calls.create.length, f.calls.resume.length, f.calls.domainWrites.length]
    assert.equal((await f.ui(operation, operation === 'resume' ? { id: root } : {})).kind, 'error')
    assert.deepEqual([f.calls.create.length, f.calls.resume.length, f.calls.domainWrites.length], before)
    assert.equal(f.calls.rootFollowup.length + f.calls.rootSteer.length + f.calls.activation.length, 0)
  })
})

test('Team initialization failure never grants audio or reports a completed new chat', async t => {
  const f = await fixture(t)
  f.faults.teamInitialize = true
  assert.equal(await f.controller.run(f.owner.id, 'new'), false)
  assert.equal(f.controller.getSnapshot().uncertain, true)
  assert.equal(f.readConfig().voiceSessionId, null)
  assert.equal(f.catalogs.size, 0)
  assert.equal(f.calls.activation.length, 0)
  assert.ok(!f.commands().some(command => command.op === 'start' || command.op === 'always' && command.enabled))
})

test('audio events and cancellation acknowledgements from a previous grant cannot mutate the new one', async t => {
  const f = await fixture(t), cancellations = []
  f.services.set('dstuberVoice', { requestCancel(request) { const gate = deferred(); cancellations.push({ request, ...gate }); return gate.promise } })
  const settings = f.value(await f.ui('read-settings'))
  f.value(await f.ui('save-settings', { revision: settings.revision, values: { ...settings.values, turnSignals: { ...settings.values.turnSignals, headphonesConfirmed: true } } }))
  f.value(await f.ui('new'))
  const firstGrant = { voiceSessionId: f.owner.id, voiceSessionEpoch: f.readConfig().voiceSessionEpoch }
  const oldTurn = 'a'.repeat(24), nextTurn = 'b'.repeat(24)
  async function inject(events) {
    writeFileSync(join(f.home, 'inject-events.json'), JSON.stringify(events))
    await f.instance.ear.status()
    writeFileSync(join(f.home, 'inject-events.json'), '[]')
  }
  await inject([{ event: 'voice-input', state: 'start', mode: 'ptt', inputTurnId: oldTurn, inputSequence: 1, ...firstGrant },
    { event: 'voice-input', state: 'end', mode: 'ptt', inputTurnId: oldTurn, releasedAt: Date.now(), ...firstGrant }])
  const oldState = f.instance.ear.turnSignals(), oldCancellation = cancellations.at(-1)
  assert.equal(oldState.inputTurnId, oldTurn)
  assert.equal(oldState.phase, 'processing')
  await eventually(() => f.commands().some(command => command.op === 'cue' && command.inputTurnId === oldTurn && command.kind === 'start'), 'old grant start cue actually sent')
  f.value(await f.ui('new', {}, f.foreign))
  const nextGrant = { voiceSessionId: f.foreign.id, voiceSessionEpoch: f.readConfig().voiceSessionEpoch }
  await inject([{ event: 'voice-input', state: 'start', mode: 'ptt', inputTurnId: 'c'.repeat(24), inputSequence: 999, ...firstGrant },
    { event: 'voice-input', state: 'start', mode: 'ptt', inputTurnId: nextTurn, inputSequence: 2, ...nextGrant }])
  const current = f.instance.ear.turnSignals()
  assert.equal(current.inputTurnId, nextTurn)
  assert.equal(current.phase, 'listening')
  oldCancellation.resolve({ ...oldCancellation.request, status: 'confirmed', queueFlushed: true, staleGenerationDiscarded: true })
  await new Promise(resolve => setImmediate(resolve))
  assert.equal(f.instance.ear.turnSignals().cancellation.status, 'requested')
  assert.equal(f.instance.ear.reportOutputStarted({ protocol: 'whale-voice-output/1', inputTurnId: oldTurn, generation: oldState.generation, ...firstGrant }), false)
  await inject([{ event: 'cue', status: 'played', inputTurnId: oldTurn, generation: oldState.generation, ...firstGrant },
    { event: 'voice-input', state: 'cancel', mode: 'ptt', inputTurnId: oldTurn, ...firstGrant }])
  assert.equal(f.instance.ear.turnSignals().inputTurnId, nextTurn)
  assert.equal(f.instance.ear.turnSignals().generation, current.generation)
  assert.equal(f.value(await f.ui('status', {}, f.foreign)).turnSignals.phase, 'listening')
  await new Promise(resolve => setTimeout(resolve, 800))
  assert.ok(!f.commands().some(command => command.op === 'cue' && command.kind === 'end' && command.inputTurnId === oldTurn), 'old scheduled end cue was cancelled before grant transfer')
})

test('final helper acknowledgement cannot resurrect cancelled or same-ID-replaced grants', async t => {
  for (const action of ['enable', 'new']) for (const direct of [false, true]) {
    if (action === 'new' && direct) continue
    for (const mutation of ['cancel', 'replace']) await t.test(`${action}/${direct ? 'direct' : 'dedicated'}/${mutation}`, async child => {
      const f = await fixture(child, { voiceSession: { enabled: !direct } }), abort = new AbortController()
      const gateFile = join(f.home, 'hold-final-ptt')
      writeFileSync(gateFile, 'hold only the post-grant helper acknowledgement')
      const pending = f.ui(action, {}, f.owner, abort.signal)
      try {
        await eventually(() => existsSync(join(f.home, 'at-final-ptt')), 'grant persisted while final helper acknowledgement pending')
        assert.equal(f.readConfig().voiceSessionId, f.owner.id)
        if (mutation === 'cancel') abort.abort()
        else f.residents.set(f.owner.id, { ...f.owner })
      } finally { rmSync(gateFile, { force: true }) }
      assert.equal((await pending).kind, 'error')
      assert.equal(f.readConfig().voiceSessionId, null)
      assert.equal(f.status().enabled, false)
      assert.equal(f.calls.rootFollowup.length + f.calls.rootSteer.length + f.calls.activation.length, 0)
      if (direct) assert.equal(f.calls.create.length, 0)
      const next = f.value(await f.ui('enable', {}, f.foreign))
      assert.equal(next.ownerSessionId, f.foreign.id)
      assert.equal(next.enabled, true, 'old failure cleanup finishes before a fresh queued grant')
    })
  }
})

test('cancelled persistent-listening acknowledgement is rolled back rather than reported enabled', async t => {
  const f = await fixture(t), abort = new AbortController()
  f.value(await f.ui('new'))
  const gateFile = join(f.home, 'hold-always')
  writeFileSync(gateFile, 'pause explicit always-on')
  const pending = f.ui('listen-mode', { mode: 'always' }, f.owner, abort.signal)
  try {
    await eventually(() => existsSync(join(f.home, 'at-always')), 'always-on helper acknowledgement pending')
    abort.abort()
  } finally { rmSync(gateFile, { force: true }) }
  assert.equal((await pending).kind, 'error')
  assert.equal(f.status().listenMode, 'ptt')
  assert.equal(f.status().enabled, true, 'audio mode cancellation does not invent a grant transfer')
  assert.equal(f.commands().filter(command => command.op === 'always').at(-1).enabled, false)
})

test('uncertain identity write is fenced even after catalog registration and never duplicates its root', async t => {
  const f = await fixture(t)
  f.faults.writeAfterCommit = 'whale_voice_identity:put'
  const result = await f.ui('new')
  const root = [...f.catalogs.keys()][0]
  assert.ok(root)
  assert.ok(errorResult(result).includes(root))
  assert.equal(f.identities.get(f.owner.id).rootSessionId, root)
  assert.equal(f.readConfig().voiceSessionId, null)
  assert.equal(f.status().enabled, false)
  const before = [f.calls.create.length, f.calls.resume.length, f.calls.domainWrites.length]
  assert.equal((await f.ui('new')).kind, 'error')
  assert.equal((await f.ui('resume', { id: root })).kind, 'error')
  assert.deepEqual([f.calls.create.length, f.calls.resume.length, f.calls.domainWrites.length], before)
})

test('ordinary enable followed by first transcript forward-registers a selectable voice root', async t => {
  const f = await fixture(t)
  const enabled = f.value(await f.ui('enable'))
  const root = enabled.voiceSession.id
  assert.ok(root)
  assert.equal(f.calls.create.length, 0)
  assert.equal(f.catalogs.size, 0, 'an unmaterialized reservation is not durable history')
  assert.equal(await f.instance.ear.deliver(f.transcript()), true)
  assert.equal(f.calls.create.length, 1)
  assert.equal(f.catalogs.get(root).rootSessionId, root)
  assert.equal(f.calls.rootFollowup.length, 1)
  f.value(await f.ui('disable'))
  const listed = f.value(await f.ui('list'))
  assert.equal(listed.items[0].id, root)
  assert.equal(listed.items[0].canResume, true)
  const restored = f.value(await f.ui('resume', { id: root }))
  assert.equal(restored.voiceSession.id, root)
  assert.equal(f.calls.rootFollowup.length, 1, 'resume never replays the first transcript')
  assert.equal(f.calls.rootSteer.length, 0)
})

// Config writes can fail while the helper still holds the preceding on-disk
// grant. Stopping model delivery alone is insufficient: the actual OS process
// that owns the microphone/global PTT hook must exit and never restart.
test('failed initial grant revocation stops the helper even while the old disk owner remains', async t => {
  for (const action of ['disable', 'enable', 'new', 'resume']) await t.test(action, async child => {
    const f = await fixture(child)
    const settings = f.value(await f.ui('read-settings'))
    f.value(await f.ui('save-settings', { revision: settings.revision, values: { ...settings.values, pttMouse: 2 } }))
    const root = f.value(await f.ui('new')).voiceSession.id
    f.value(await f.ui('listen-mode', { mode: 'always' }))
    const process = f.calls.processes.at(-1)
    assert.ok(process.pid && process.exitCode === null && process.signalCode === null)
    f.faults.configIo = 'revoke-write-denied'
    // Human enable is idempotent while already open. The scoped agent grant
    // mutation still exercises its existing revoke-before-regrant I/O path.
    const failed = action === 'enable'
      ? await f.instance.sessionControl.change(f.owner.id, true, new AbortController().signal).then(value => ({ kind: 'success', text: JSON.stringify(value) }), error => ({ kind: 'error', text: error.message }))
      : await f.ui(action, action === 'resume' ? { id: root } : {})
    assert.match(errorResult(failed), /保存|确认|授权/)
    assert.equal(f.readConfig().voiceSessionId, f.owner.id, 'fault preserves stale authorization on disk')
    assert.equal(f.readConfig().pttMouse, 2)
    await eventually(() => process.exitCode !== null || process.signalCode !== null, 'actual audio helper exited after failed revoke')
    assert.equal(f.status().enabled, false)
    assert.equal(f.status().helper.online, false)
    assert.equal(f.residents.has(root), false, 'new/resume initial-revoke failure also closes the old root')
    const writes = f.calls.configWrites.length, spawned = f.calls.processes.length
    await assert.rejects(f.instance.ear.start(), /授权|确认|锁|unconfirm/i)
    await assert.rejects(f.instance.ear.status(), /授权|确认|锁|unconfirm/i)
    assert.equal((await f.ui('enable')).kind, 'error')
    assert.equal((await f.ui('new')).kind, 'error')
    f.value(await f.ui('status'))
    f.value(await f.ui('read-settings'))
    await new Promise(resolve => setTimeout(resolve, 1150))
    assert.equal(f.calls.processes.length, spawned, 'helper exit timer and later reads cannot respawn the hook owner')
    assert.equal(f.calls.configWrites.length, writes, 'unknown write is not retried automatically')
  })
})

test('grant write followed by unknown readback kills audio and blocks resume/restart despite a positive disk owner', async t => {
  for (const action of ['enable', 'new', 'resume']) await t.test(action, async child => {
    const f = await fixture(child)
    const root = f.value(await f.ui('new')).voiceSession.id
    const process = f.calls.processes.at(-1)
    f.faults.configIo = 'grant-readback-unknown'
    const failed = action === 'enable'
      ? await f.instance.sessionControl.change(f.owner.id, true, new AbortController().signal).then(value => ({ kind: 'success', text: JSON.stringify(value) }), error => ({ kind: 'error', text: error.message }))
      : await f.ui(action, action === 'resume' ? { id: root } : {})
    assert.match(errorResult(failed), /保存|确认|授权/)
    assert.equal(f.readConfig().voiceSessionId, f.owner.id, 'grant write reached disk but readback was uncertain')
    await eventually(() => process.exitCode !== null || process.signalCode !== null, 'actual audio helper exited after uncertain grant')
    assert.equal(f.status().enabled, false)
    assert.equal(f.status().helper.online, false)
    assert.equal(f.residents.has(root), false)
    const spawned = f.calls.processes.length, writes = f.calls.configWrites.length
    await assert.rejects(f.instance.ear.status())
    await assert.rejects(f.instance.ear.pttStatus())
    assert.equal((await f.ui('resume', { id: root })).kind, 'error')
    await new Promise(resolve => setTimeout(resolve, 1150))
    assert.equal(f.calls.processes.length, spawned)
    assert.equal(f.calls.configWrites.length, writes)
    assert.equal(f.calls.activation.length, 0)
  })
})

test('invalid or unreadable grant documents are never replaced with empty defaults and audio is terminated', async t => {
  for (const action of ['disable', 'new']) for (const invalid of ['{broken', 'null', '[]', '17', '"plain string"', 'read-denied']) {
    await t.test(`${action}/${invalid}`, async child => {
      const f = await fixture(child)
      const root = f.value(await f.ui('new')).voiceSession.id
      const process = f.calls.processes.at(-1)
      if (invalid === 'read-denied') f.faults.configIo = 'config-read-denied'
      else writeFileSync(f.configPath, invalid)
      const original = readFileSync(f.configPath, 'utf8'), writes = f.calls.configWrites.length
      const failed = await f.ui(action)
      assert.match(errorResult(failed), /配置无法安全读取|未覆盖/)
      assert.equal(readFileSync(f.configPath, 'utf8'), original)
      assert.equal(f.calls.configWrites.length, writes)
      await eventually(() => process.exitCode !== null || process.signalCode !== null, 'audio helper terminated on invalid grant document')
      assert.equal(f.status().enabled, false)
      assert.equal(f.residents.has(root), false)
      await assert.rejects(f.instance.ear.status())
      assert.equal(f.calls.processes.length, 1)
    })
  }
})

test('cold startup clears disk-only PTT and always-listening grants before any helper can start', async t => {
  for (const listenMode of ['ptt', 'always']) await t.test(listenMode, async child => {
    const f = await fixture(child, { coldConfig: { autoStart: true, voiceSessionId: 'owner-session', voiceSessionEpoch: 'previous-runtime-epoch', pttMouse: 2, listenMode } })
    await eventually(() => existsSync(join(f.home, 'helper-start-config.jsonl')), 'cold helper initial snapshot')
    const snapshots = readFileSync(join(f.home, 'helper-start-config.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(JSON.parse(line)))
    assert.equal(snapshots.length, 1)
    assert.equal(snapshots[0].voiceSessionId, null, 'helper cannot observe the previous runtime owner at boot')
    assert.notEqual(snapshots[0].voiceSessionEpoch, 'previous-runtime-epoch')
    assert.equal(snapshots[0].listenMode, 'ptt')
    assert.equal(f.status().enabled, false)
    assert.equal(f.calls.create.length + f.calls.resume.length + f.calls.model.length, 0)
    assert.equal(f.catalogs.size, 0)
    assert.ok(!f.commands().some(command => command.op === 'start' || command.op === 'always' && command.enabled))
    const fresh = f.value(await f.ui('enable'))
    assert.equal(fresh.enabled, true)
    assert.equal(fresh.ownerSessionId, f.owner.id, 'a new explicit action grants this runtime normally')
  })
})

test('invalid cold config locks audio before autoStart and is preserved rather than silently reset', async t => {
  for (const rawConfig of ['{broken', 'null', '[]']) await t.test(rawConfig, async child => {
    const f = await fixture(child, { coldConfig: { autoStart: true }, rawConfig })
    await assert.rejects(f.instance.ear.status(), /配置|授权/)
    assert.equal(f.calls.processes.length, 0)
    assert.equal(existsSync(join(f.home, 'helper-started')), false)
    assert.equal(readFileSync(f.configPath, 'utf8'), rawConfig)
    assert.equal((await f.ui('enable')).kind, 'error')
    assert.equal(f.calls.configWrites.length, 0)
  })
})

test('helper restart within the same explicitly authorized runtime preserves its valid grant', async t => {
  const f = await fixture(t)
  const active = f.value(await f.ui('new')), epoch = f.readConfig().voiceSessionEpoch
  const original = f.calls.processes[0]
  original.kill('SIGKILL')
  await eventually(() => original.exitCode !== null || original.signalCode !== null, 'original helper exit')
  await eventually(() => f.calls.processes.length === 2 && f.status().helper.online, 'automatic helper restart for a live runtime grant')
  const snapshots = readFileSync(join(f.home, 'helper-start-config.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(JSON.parse(line)))
  assert.equal(snapshots.length, 2)
  assert.equal(snapshots[1].voiceSessionId, f.owner.id)
  assert.equal(snapshots[1].voiceSessionEpoch, epoch)
  assert.equal(f.readConfig().voiceSessionEpoch, epoch)
  assert.equal(f.status().enabled, true)
  assert.equal(f.status().voiceSession.id, active.voiceSession.id)
  assert.equal(f.calls.create.length, 1)
  assert.equal(f.calls.resume.length, 0)
})

async function publishedFixture(t, extra = {}) {
  return fixture(t, { compat: true, published: true, ...extra })
}
async function visibleMode(f) {
  const settings = f.value(await f.ui('read-settings'))
  return f.value(await f.ui('set-visibility', { revision: settings.revision, visibility: 'workspace' }))
}
async function delegated(f, root, prompt = 'Prepare a synthetic offline report') {
  const raw = await f.invoke('voice_delegate', { prompt }, root)
  assert.doesNotMatch(raw, /^❌/, raw)
  return JSON.parse(raw)
}
function handoffTables(f, rootId) {
  const found = [...f.domains].find(([name, tables]) => name.startsWith('whale_handoff_') && tables.get('binding')?.get('root')?.rootSessionId === rootId)
  assert.ok(found, 'root has its own persistent handoff domain')
  return { name: found[0], binding: found[1].get('binding'), tasks: found[1].get('tasks') }
}
const parsedTask = async (f, worker, id) => JSON.parse(await f.invoke('voice_task_get', { task_id: id }, worker))
const updateTask = async (f, worker, id, revision, fields) => JSON.parse(await f.invoke('voice_task_update', { task_id: id, expected_revision: revision, ...fields }, worker))

test('rc1 contract: absent hidden/Team/rootOf stays closed until explicit visible preference and new action', async t => {
  const f = await publishedFixture(t)
  const status = f.value(await f.ui('status'))
  assert.equal(status.voiceCapabilities.hidden.supported, false)
  assert.equal(status.voiceCapabilities.workspace.supported, true)
  assert.equal(status.voiceCapabilities.taskHandoff.mode, 'compat_domain_v1')
  assert.match(errorResult(await f.ui('new')), /hidden|Hidden|隐藏/)
  assert.equal(f.readConfig().voiceSessionId, null)
  assert.equal(f.calls.create.length, 0)
  const before = f.commands().length
  const saved = await visibleMode(f)
  assert.equal(saved.voiceSession.visibility, 'workspace')
  assert.equal(f.commands().length, before, 'visibility preference does not touch audio')
  assert.equal(f.calls.create.length + f.calls.activation.length, 0)
  assert.equal(f.readConfig().voiceSessionId, null)
  const made = f.value(await f.ui('new'))
  assert.equal(made.enabled, true)
  assert.equal(made.voiceSession.presentation.hidden, false)
  assert.equal(f.calls.reserves.length, 0)
  const root = f.residents.get(made.voiceSession.id)
  assert.equal(handoffTables(f, root.id).binding.get('root').backend, 'compat_domain_v1')
  assert.equal(await f.instance.ear.deliver(f.transcript()), true)
  assert.equal(f.calls.rootFollowup.length, 1)
  assert.deepEqual(f.calls.restrictions[0].allow.sort(), ['voice_control', 'voice_delegate', 'voice_message', 'voice_status', 'whale_voice_speak'])
  const job = await delegated(f, root)
  const activation = f.calls.activation[0]
  assert.equal(activation.parent, root)
  assert.equal(activation.prompt, activation.request.prompt)
  assert.equal(activation.agentOptions, activation.request.agentOptions)
  assert.equal(activation.request.parent, root)
  assert.equal(activation.request.agentOptions.reasoningEffort, 'high')
  assert.equal(activation.request.maxDepth, 1)
  assert.equal(activation.childId, job.sessionId)
  assert.equal((await parsedTask(f, f.residents.get(job.sessionId), job.taskId)).task.assignedWorkerId, job.sessionId)
})

test('rc1 contract: task owner/revision/results and backend persist across disable and exact resume without restarting work', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const rootId = f.value(await f.ui('new')).voiceSession.id, root = f.residents.get(rootId)
  const job = await delegated(f, root), worker = f.residents.get(job.sessionId)
  const claimed = await updateTask(f, worker, job.taskId, job.revision, { action: 'claim' })
  assert.equal(claimed.task.ownerId, worker.id)
  const saved = await updateTask(f, worker, job.taskId, claimed.revision, { action: 'edit', progress: 'Verified two steps', pending_decisions: ['Which delivery date?'], next_step: 'Wait for user' })
  f.value(await f.ui('disable'))
  const restored = f.value(await f.ui('resume', { id: rootId }))
  assert.equal(restored.voiceSession.id, rootId)
  assert.equal(restored.voiceSession.persistence.restored, true)
  assert.equal(f.calls.activation.length, 1)
  assert.equal(f.calls.rootFollowup.length + f.calls.rootSteer.length, 0)
  assert.equal(handoffTables(f, rootId).tasks.get(job.taskId).revision, saved.revision)
  assert.equal(handoffTables(f, rootId).tasks.get(job.taskId).ownerId, worker.id)
  assert.match(await f.invoke('voice_status', { scope: 'tasks' }), /Which delivery date/)
  await f.ctx.subagents.sendMessage(f.residents.get(rootId), worker.id, [{ type: 'text', text: 'Explicit synthetic continuation' }], {})
  const currentWorker = f.residents.get(worker.id)
  const reread = await parsedTask(f, currentWorker, job.taskId)
  assert.equal(reread.revision, saved.revision)
  const result = await updateTask(f, currentWorker, job.taskId, reread.revision, { action: 'edit', result: 'Verified synthetic result', pending_decisions: [], references: ['fixture://result'], next_step: 'Done' })
  const completed = await updateTask(f, currentWorker, job.taskId, result.revision, { action: 'complete' })
  assert.equal(completed.task.status, 'completed')
  assert.equal(f.calls.activation.length, 1)
})

test('rc1 contract: worker task tools deny origin/root/foreign/forged/sibling and cannot change goal or assigned owner', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const root = f.residents.get(f.value(await f.ui('new')).voiceSession.id)
  const first = await delegated(f, root, 'First task'), second = await delegated(f, root, 'Second task')
  const worker = f.residents.get(first.sessionId), sibling = f.residents.get(second.sessionId)
  for (const actor of [f.owner, root, f.foreign, { ...worker }, sibling]) {
    await assert.rejects(f.invoke('voice_task_get', { task_id: first.taskId }, actor), /worker|assigned|live|root/i)
    await assert.rejects(f.invoke('voice_task_update', { task_id: first.taskId, expected_revision: 1, action: 'claim' }, actor), /worker|assigned|live|root/i)
  }
  const claimed = await updateTask(f, worker, first.taskId, 1, { action: 'claim' })
  for (const field of ['goal', 'assignedWorkerId', 'ownerId', 'rootSessionId', 'backend']) {
    await assert.rejects(updateTask(f, worker, first.taskId, claimed.revision, { action: 'edit', [field]: 'forged' }), /fields|immutable/i)
  }
  assert.equal((await parsedTask(f, worker, first.taskId)).revision, claimed.revision)
  assert.equal(f.instance.uiBridge.allowed(worker.id), false)
  assert.match(f.calls.guards[0]({ agent: root, name: 'voice_task_update' }), /delegate/)
})

test('rc1 contract: same-revision concurrent writes accept once, duplicate claim and stale completion never replay', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const root = f.residents.get(f.value(await f.ui('new')).voiceSession.id), job = await delegated(f, root), worker = f.residents.get(job.sessionId)
  const attempts = await Promise.allSettled([updateTask(f, worker, job.taskId, 1, { action: 'claim' }), updateTask(f, worker, job.taskId, 1, { action: 'claim' })])
  assert.equal(attempts.filter(x => x.status === 'fulfilled').length, 1)
  assert.equal(attempts.find(x => x.status === 'rejected').reason.code, 'VOICE_TASK_STALE_REVISION')
  const claimed = await parsedTask(f, worker, job.taskId)
  await assert.rejects(updateTask(f, worker, job.taskId, claimed.revision, { action: 'claim' }), /owned|claimed/i)
  await assert.rejects(updateTask(f, worker, job.taskId, 1, { action: 'edit', progress: 'stale overwrite' }), error => error.code === 'VOICE_TASK_STALE_REVISION')
  await assert.rejects(updateTask(f, worker, job.taskId, claimed.revision, { action: 'complete' }), /results|decisions/)
  assert.equal((await parsedTask(f, worker, job.taskId)).revision, 2)
  assert.equal(f.calls.activation.length, 1)
})

test('rc1 contract: uncertain task creation reports exact ID, starts no worker and forbids duplicate writes', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const root = f.residents.get(f.value(await f.ui('new')).voiceSession.id)
  f.faults.compatUnknown = 'tasks'
  const result = await f.invoke('voice_delegate', { prompt: 'Uncertain one-time task' }, root)
  assert.match(result, /PERSISTENCE_UNCONFIRMED/)
  assert.match(result, /task-1/)
  assert.doesNotMatch(result, /PRIVATE-UNCERTAIN-WRITE/)
  const writes = f.calls.domainWrites.length
  assert.equal(f.calls.activation.length, 0)
  assert.match(await f.invoke('voice_delegate', { prompt: 'Uncertain one-time task' }, root), /PERSISTENCE_UNCONFIRMED/)
  assert.equal(f.calls.domainWrites.length, writes)
  assert.equal(handoffTables(f, root.id).tasks.size, 1)
  assert.equal(f.calls.activation.length, 0)
})

test('rc1 contract: uncertain worker update stays visibly unconfirmed and later writes cannot replay', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const root = f.residents.get(f.value(await f.ui('new')).voiceSession.id), job = await delegated(f, root), worker = f.residents.get(job.sessionId)
  f.faults.compatUnknown = 'tasks'
  await assert.rejects(updateTask(f, worker, job.taskId, 1, { action: 'claim' }), error => error.code === 'VOICE_TASK_PERSISTENCE_UNCONFIRMED')
  const current = await parsedTask(f, worker, job.taskId)
  assert.equal(current.persistenceConfirmed, false)
  const writes = f.calls.domainWrites.length
  await assert.rejects(updateTask(f, worker, job.taskId, current.revision, { action: 'edit', progress: 'must not replay' }), error => error.code === 'VOICE_TASK_PERSISTENCE_UNCONFIRMED')
  assert.equal(f.calls.domainWrites.length, writes)
  assert.equal(f.calls.activation.length, 1)
})

test('rc1 contract: native lease failure and task binding uncertainty both prevent microphone grant', async t => {
  for (const failure of ['lease', 'binding']) await t.test(failure, async child => {
    const f = await publishedFixture(child); await visibleMode(f)
    if (failure === 'lease') f.faults.leaseConfirmed = false
    else f.faults.compatUnknown = 'binding'
    assert.equal((await f.ui('new')).kind, 'error')
    assert.equal(f.readConfig().voiceSessionId, null)
    assert.equal(f.status().enabled, false)
    assert.equal(f.calls.activation.length, 0)
    assert.ok(!f.commands().some(command => command.op === 'start' || command.op === 'always' && command.enabled))
  })
})

test('rc1 contract: missing compat marker cannot become a new empty board or a Team fallback', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const rootId = f.value(await f.ui('new')).voiceSession.id, root = f.residents.get(rootId)
  await delegated(f, root)
  const tables = handoffTables(f, rootId)
  f.value(await f.ui('disable'))
  tables.binding.clear(); tables.tasks.clear()
  const writes = f.calls.domainWrites.length, creates = f.calls.create.length, resumes = f.calls.resume.length
  assert.match(errorResult(await f.ui('resume', { id: rootId })), /backend|binding|handoff|后端/i)
  assert.equal(f.readConfig().voiceSessionId, null)
  assert.equal(f.calls.domainWrites.length, writes)
  assert.equal(f.calls.create.length, creates)
  assert.equal(f.calls.resume.length, resumes)
  assert.equal(f.calls.activation.length, 1)
  assert.equal(tables.tasks.size, 0)
})

test('rc1 contract: existing Team history never silently switches to compat when native Team is absent', async t => {
  const f = await fixture(t, { voiceSession: { visibility: 'workspace' } })
  const rootId = f.value(await f.ui('new')).voiceSession.id
  f.eventLogs.set(rootId, [{ type: 'team/task', data: { id: 'old-native-task' } }])
  f.boards.set(rootId, [{ id: 'old-native-task', revision: 4, subject: 'Keep old native task', description: 'OLD-TEAM-HISTORY', status: 'pending' }])
  f.value(await f.ui('disable'))
  delete f.ctx.agentTeams; delete f.ctx.subagents.rootOf
  const writes = f.calls.domainWrites.length, resumes = f.calls.resume.length
  assert.match(errorResult(await f.ui('resume', { id: rootId })), /native.*Team|history|capabilit/i)
  assert.equal(f.calls.resume.length, resumes)
  assert.equal(f.calls.domainWrites.length, writes)
  assert.equal(f.boards.get(rootId)[0].revision, 4)
  assert.equal(f.readConfig().voiceSessionId, null)
})

test('rc1 contract: rejected compatible activation is never retried using another API shape', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const root = f.residents.get(f.value(await f.ui('new')).voiceSession.id)
  f.faults.activation = true
  assert.match(await f.invoke('voice_delegate', { prompt: 'Do not replay activation' }, root), /worker_startup/)
  assert.equal(f.calls.activation.length, 1)
  assert.ok(f.calls.activation[0].request)
  assert.equal(f.calls.activation[0].parent, f.calls.activation[0].request.parent)
  assert.equal(handoffTables(f, root.id).tasks.size, 1)
  assert.equal((await f.ui('status')).kind, 'success')
  assert.equal(f.calls.activation.length, 1)
})

test('rc1 contract: display preference cannot mutate a grant, migrate an old root, or cross an in-flight grant gap', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const rootId = f.value(await f.ui('new')).voiceSession.id
  let settings = f.value(await f.ui('read-settings'))
  assert.match(errorResult(await f.ui('set-visibility', { revision: settings.revision, visibility: 'hidden' })), /关闭|授权/)
  f.value(await f.ui('disable')); settings = f.value(await f.ui('read-settings'))
  f.value(await f.ui('set-visibility', { revision: settings.revision, visibility: 'hidden' }))
  assert.equal((await f.ui('resume', { id: rootId })).kind, 'error')
  assert.equal(f.calls.resume.length, 0)
  await visibleMode(f)
  const gate = deferred(); f.faults.modelGate = gate.promise
  const creating = f.ui('new')
  await eventually(() => f.calls.model.length >= 2, 'new root model preflight')
  settings = f.value(await f.ui('read-settings'))
  let changed
  try { changed = await f.ui('set-visibility', { revision: settings.revision, visibility: 'hidden' }) }
  finally { gate.resolve() }
  assert.equal(changed.kind, 'error', 'a temporary no-owner/no-root interval is not a safe settings window')
  assert.equal(f.readConfig().voiceSession.visibility, 'workspace')
  assert.equal((await creating).kind, 'success')
})

test('rc1 contract: unknown visibility response locks mutations until settings then status are reread for the same actor', async t => {
  const f = await publishedFixture(t)
  let loseVisibilityReply = true
  const controller = createController(async (id, command) => {
    const response = await f.execute(id, command)
    if (loseVisibilityReply && command.includes('"action":"set-visibility"')) { loseVisibilityReply = false; throw new Error('Synthetic response loss after persisted preference') }
    return response
  })
  t.after(() => controller.dispose())
  controller.setSession(f.owner.id)
  assert.equal(await controller.run(f.owner.id, 'read-settings'), true)
  await new Promise(resolve => setTimeout(resolve, 0))
  await eventually(() => !controller.getSnapshot().busy, 'first-run settings read settles')
  const revision = controller.getSnapshot().settings.revision
  assert.equal(await controller.run(f.owner.id, 'set-visibility', { revision, visibility: 'workspace' }), false)
  assert.equal(f.readConfig().voiceSession.visibility, 'workspace')
  assert.equal(controller.getSnapshot().visibilityUncertain, true)
  const commands = f.calls.humanCommands.length
  for (const action of ['new', 'enable', 'disable', 'save-settings', 'save-models', 'set-visibility']) assert.equal(await controller.run(f.owner.id, action), false)
  assert.equal(f.calls.humanCommands.length, commands, 'uncertain mutations are not retransmitted')
  assert.equal(await controller.run(f.owner.id, 'status'), true)
  assert.equal(controller.getSnapshot().visibilityUncertain, true)
  assert.equal(await controller.run(f.owner.id, 'read-settings'), true)
  assert.equal(await controller.run(f.foreign.id, 'status'), true)
  assert.equal(controller.getSnapshot().visibilityUncertain, true)
  assert.equal(await controller.run(f.owner.id, 'status'), true)
  assert.equal(controller.getSnapshot().visibilityUncertain, false)
  assert.equal(f.calls.create.length + f.calls.activation.length, 0)
  assert.equal(f.readConfig().voiceSessionId, null)
})

test('rc1 contract: independent roots keep disjoint domains and old task state while neither auto-starts a worker', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const rootA = f.residents.get(f.value(await f.ui('new')).voiceSession.id), taskA = await delegated(f, rootA, 'Root A private request')
  const a = handoffTables(f, rootA.id), expectedA = structuredClone(a.tasks.get(taskA.taskId))
  const rootB = f.residents.get(f.value(await f.ui('new')).voiceSession.id), taskB = await delegated(f, rootB, 'Root B private request')
  const b = handoffTables(f, rootB.id)
  assert.notEqual(a.name, b.name)
  assert.equal(a.tasks.get(taskA.taskId).goal, 'Root A private request')
  assert.equal(b.tasks.get(taskB.taskId).goal, 'Root B private request')
  assert.deepEqual(a.tasks.get(taskA.taskId), expectedA)
  assert.equal(f.openDomains.has(a.name), false, 'old root releases its domain before native root disposal')
  assert.equal(f.openDomains.has(b.name), true)
  f.value(await f.ui('resume', { id: rootA.id }))
  assert.deepEqual(a.tasks.get(taskA.taskId), expectedA)
  assert.equal(f.calls.activation.length, 2)
  assert.equal(f.calls.rootFollowup.length + f.calls.rootSteer.length, 0)
  const summary = await f.invoke('voice_status', { scope: 'tasks' })
  assert.match(summary, /Root A private request/)
  assert.doesNotMatch(summary, /Root B private request/)
})

test('rc1 contract: a worker replaced during the native lease await loses write permission before persistence', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const root = f.residents.get(f.value(await f.ui('new')).voiceSession.id), job = await delegated(f, root), worker = f.residents.get(job.sessionId)
  const gate = deferred(), beforeFlushes = f.calls.flush.length
  f.faults.leaseGate = gate.promise
  const updating = updateTask(f, worker, job.taskId, 1, { action: 'claim' })
  await eventually(() => f.calls.flush.length > beforeFlushes, 'task lease check entered')
  f.residents.set(worker.id, { ...worker })
  gate.resolve()
  await assert.rejects(updating, error => error.code === 'VOICE_TASK_UNAUTHORIZED')
  assert.equal(handoffTables(f, root.id).tasks.get(job.taskId).revision, 1)
  assert.equal(handoffTables(f, root.id).tasks.get(job.taskId).ownerId, null)
})

test('rc1 contract: catalog/backend disagreement fails before resume and cannot erase the persisted board', async t => {
  const f = await publishedFixture(t); await visibleMode(f)
  const rootId = f.value(await f.ui('new')).voiceSession.id, root = f.residents.get(rootId)
  const job = await delegated(f, root), tables = handoffTables(f, rootId)
  f.value(await f.ui('disable'))
  f.catalogs.set(rootId, { ...f.catalogs.get(rootId), handoffBackend: 'native_team' })
  const writes = f.calls.domainWrites.length, resumes = f.calls.resume.length
  assert.match(errorResult(await f.ui('resume', { id: rootId })), /backend|binding|后端/i)
  assert.equal(f.calls.resume.length, resumes)
  assert.equal(f.calls.domainWrites.length, writes)
  assert.equal(tables.tasks.get(job.taskId).goal, 'Prepare a synthetic offline report')
  assert.equal(f.readConfig().voiceSessionId, null)
})

test('fresh and text-only voice roots use Whale speech with no legacy fallback', async t => {
  const f = await fixture(t)
  const authorization = f.instance.uiBridge.readAuthorization()
  await f.instance.uiBridge.saveAuthorization({ revision: authorization.revision, grant: true })
  await f.ui('new')
  assert.equal(f.readConfig().tts?.provider ?? 'unconfigured', 'unconfigured')
  const allow = f.calls.restrictions.at(-1).allow
  assert.equal(allow.includes('speak'), false)
  assert.equal(allow.includes('whale_voice_speak'), true)
  const root = f.residents.get(f.status().voiceSession.id)
  const processCount = f.calls.processes.length
  const exec = { name: 'whale_voice_speak', agent: root, arguments: { text: '文字回复' }, token: Symbol('text-only') }
  const value = await f.listeners.get('tools/execute')(exec, () => f.invoke(exec.name, exec.arguments, root))
  assert.deepEqual(JSON.parse(value), { textOnly: true, playbackCompleted: false, acousticConfirmation: false })
  f.listeners.get('tools/result')(exec, { value, isError: false })
  assert.equal(f.instance.uiBridge.readConversation(root).latest?.text, '文字回复')
  assert.equal(f.instance.uiBridge.readConversation(root).latest?.state, 'reply')
  assert.equal(f.calls.processes.length, processCount)
})

test('legacy system speech reads as text-only and never launches a speech process', async t => {
  const f = await fixture(t, { coldConfig: { tts: { provider: 'system', systemVoice: 'legacy', systemFallback: true } } })
  const settings = f.value(await f.ui('read-settings'))
  assert.equal(settings.ttsSetup.provider, 'off')
  assert.equal(settings.ttsSetup.systemFallback, false)
  await f.ui('new')
  const root = f.residents.get(f.status().voiceSession.id)
  const processes = f.calls.processes.length
  assert.equal(JSON.parse(await f.invoke('whale_voice_speak', { text: '文字回复' }, root)).textOnly, true)
  assert.equal(f.calls.processes.length, processes)
})

test('the selected Edge default retains the requested caption when synthesis returns text-only', async t => {
  const f = await fixture(t)
  const settings = f.value(await f.ui('read-settings'))
  assert.equal(settings.ttsSetup.edgeVoice, 'zh-CN-XiaoyiNeural')
  const saved = f.value(await f.ui('save-tts', {
    revision: settings.revision,
    values: { ...settings.ttsSetup, provider: 'edge', edgeTextTransmissionAccepted: true },
  }))
  assert.equal(saved.ttsSetup.provider, 'edge')
  const authorization = f.instance.uiBridge.readAuthorization()
  await f.instance.uiBridge.saveAuthorization({ revision: authorization.revision, grant: true })
  await f.ui('new')
  const root = f.residents.get(f.status().voiceSession.id)
  const result = { provider: 'edge', textOnly: true, fallback: false, playbackCompleted: false, acousticConfirmation: false, reason: 'TTS_EDGE_FAILED' }
  f.instance.tts.speak = async text => { assert.equal(text, '联网失败时显示这条回复。'); return result }
  const exec = { name: 'whale_voice_speak', agent: root, arguments: { text: '联网失败时显示这条回复。' }, token: Symbol('edge-offline') }
  const value = await f.listeners.get('tools/execute')(exec, () => f.invoke(exec.name, exec.arguments, root))
  assert.deepEqual(JSON.parse(value), result)
  f.listeners.get('tools/result')(exec, { value, isError: false })
  const latest = f.instance.uiBridge.readConversation(root).latest
  assert.equal(latest?.text, exec.arguments.text)
  assert.equal(latest?.state, 'reply')
})

test('TTS human configuration stays local and CAS fenced; off selection removes legacy speech path', async t => {
  const f = await fixture(t)
  const settings = f.value(await f.ui('read-settings'))
  assert.equal(settings.ttsSetup.provider, 'unconfigured')
  if (process.platform !== 'win32') {
    assert.equal(f.value(await f.ui('inspect-tts')).gpuSupported, false)
    assert.equal(f.calls.processes.length, 0, 'Non-Windows capability inspection must not spawn or install')
  }
  assert.match(errorResult(await f.ui('preview-tts', { text: 'PRIVATE-UNREQUESTED-TEXT' })), /不支持的字段/)
  assert.match(errorResult(await f.ui('save-tts', { revision: settings.revision, values: { ...settings.ttsSetup, provider: 'edge' } })), /TTS_CONSENT_REQUIRED/)
  const saved = f.value(await f.ui('save-tts', { revision: settings.revision, values: { ...settings.ttsSetup, provider: 'off' } }))
  assert.equal(saved.ttsSetup.provider, 'off')
  assert.equal(saved.onboarding.completed, false)
  const completed = f.value(await f.ui('complete-setup', { revision: saved.revision }))
  assert.equal(completed.onboarding.completed, true)
  assert.equal(f.calls.processes.length, 0)
  await f.ui('new')
  assert.equal(f.calls.restrictions.at(-1).allow.includes('whale_voice_speak'), true)
  assert.equal(f.calls.restrictions.at(-1).allow.includes('speak'), false)
  assert.match(await f.invoke('whale_voice_speak', { text: 'test' }), /只有当前已授权/)
  const root = f.residents.get(f.status().voiceSession.id)
  const authorization = f.instance.uiBridge.readAuthorization()
  await f.instance.uiBridge.saveAuthorization({ revision: authorization.revision, grant: true })
  assert.equal(JSON.parse(await f.invoke('whale_voice_speak', { text: 'test' }, root)).textOnly, true)
  const guard = f.calls.guards.at(-1)
  assert.match(guard({ agent: root, name: 'speak' }), /delegate/)
  assert.equal(guard({ agent: root, name: 'whale_voice_speak' }), undefined)
})

test('unconfirmed TTS shutdown prevents enable and new voice roots, with the old grant withdrawn', async t => {
  const f = await fixture(t)
  f.instance.tts.cancel = async () => ({ status: 'unconfirmed' })
  for (const action of ['enable', 'new']) {
    assert.match(errorResult(await f.ui(action)), /TTS_TERMINATION_UNCONFIRMED/)
    assert.equal(f.readConfig().voiceSessionId, null)
    assert.equal(f.calls.create.length, 0)
    assert.equal(f.calls.processes.length, 0)
  }
})

test('explicit enable CAS refuses stale state and a different human window keeps the current root', async t => {
  const f = await fixture(t), gate = deferred()
  const initial = f.value(await f.ui('status'))
  assert.equal(initial.inputDevices.status, 'unknown')
  assert.equal(f.calls.processes.length, 0, 'passive status never starts helper')
  f.faults.modelGate = gate.promise
  const creating = f.ui('new')
  await eventually(() => f.calls.model.length === 1, 'new at gate')
  const staleEnable = f.ui('enable', { expectedOwnerSessionId: null }, f.foreign)
  gate.resolve()
  const root = f.value(await creating).voiceSession.id
  assert.match(errorResult(await staleEnable), /VOICE_OWNER_CHANGED/)
  assert.equal(f.readConfig().voiceSessionId, f.owner.id)
  assert.equal(f.status().voiceSession.id, root)
  const commands = f.commands().length
  assert.match(errorResult(await f.ui('enable', { expectedOwnerSessionId: null }, f.foreign)), /VOICE_OWNER_CHANGED/)
  assert.equal(f.commands().length, commands, 'mismatch performs no helper work')
  const accepted = f.value(await f.ui('enable', { expectedOwnerSessionId: f.owner.id }, f.foreign))
  assert.equal(accepted.ownerSessionId, f.owner.id)
  assert.equal(accepted.voiceSession.id, root)
  assert.equal(f.commands().length, commands, 'already enabled is idempotent and never restarts audio')
  assert.equal(accepted.inputDevices.status, 'available')
  assert.deepEqual(accepted.inputDevices.items, [{ index: 3, name: 'Fixture microphone' }])
})

test('listening modes can be preselected while stopped without granting or starting audio', async t => {
  const f = await fixture(t)
  const selected = f.value(await f.ui('listen-mode', { mode: 'always' }))
  assert.equal(selected.enabled, false)
  assert.equal(selected.ownerSessionId, null)
  assert.equal(selected.listenMode, 'always')
  assert.equal(f.readConfig().preferredListenMode, 'always')
  assert.equal(f.readConfig().listenMode, 'ptt', 'runtime capture remains revoked')
  assert.equal(f.calls.processes.length + f.calls.create.length + f.calls.model.length, 0)
  assert.deepEqual(f.commands(), [])
  const authorization = f.instance.uiBridge.readAuthorization()
  assert.equal(authorization.granted, false)
  assert.equal((await f.instance.uiBridge.saveAuthorization({ revision: authorization.revision, grant: true })).granted, true)
  assert.equal(f.calls.processes.length + f.calls.create.length + f.calls.model.length, 0, 'one-time authorization does not start recording')
  const active = f.value(await f.ui('enable'))
  assert.equal(active.enabled, true)
  assert.equal(active.listenMode, 'always')
  assert.ok(f.commands().some(command => command.op === 'always' && command.enabled))
  f.value(await f.ui('disable'))
  assert.equal(f.status().enabled, false)
  assert.equal(f.readConfig().listenMode, 'ptt')
  assert.equal(f.readConfig().preferredListenMode, 'always')
  const commands = f.commands().length
  const stoppedSelection = f.value(await f.ui('listen-mode', { mode: 'ptt' }))
  assert.equal(stoppedSelection.listenMode, 'ptt')
  assert.equal(stoppedSelection.enabled, false)
  assert.equal(f.commands().length, commands, 'a stopped selection does not even send a helper command')
  assert.equal(f.calls.rootFollowup.length + f.calls.rootSteer.length + f.calls.activation.length, 0)
})

test('cancelled mode selection and foreign agents cannot change the live grant; owner UI can', async t => {
  const f = await fixture(t), cancelled = new AbortController()
  cancelled.abort()
  const before = f.readConfig()
  assert.equal((await f.ui('listen-mode', { mode: 'always' }, f.owner, cancelled.signal)).kind, 'error')
  assert.deepEqual(f.readConfig(), before)
  assert.equal(f.calls.processes.length, 0)
  f.value(await f.ui('enable'))
  const active = f.readConfig(), commands = f.commands().length
  const authorization = f.instance.uiBridge.readAuthorization()
  await f.instance.uiBridge.saveAuthorization({ revision: authorization.revision, grant: true })
  const denied = JSON.parse(await f.invoke('voice_manage', { action: 'execute', operation: 'listen-mode', params: { mode: 'always' } }, f.foreign))
  assert.equal(denied.ok, false)
  assert.deepEqual(f.readConfig(), active)
  assert.equal(f.commands().length, commands)
  const changed = f.value(await f.ui('listen-mode', { mode: 'always' }, f.foreign))
  assert.equal(changed.listenMode, 'always')
  assert.equal(changed.ownerSessionId, f.owner.id)
  assert.equal(f.readConfig().voiceSessionEpoch, active.voiceSessionEpoch)
})

test('human window switching preserves voice root, epoch, transcript and agent boundaries after origin disposal', async t => {
  const f = await fixture(t)
  const enabled = f.value(await f.ui('new'))
  const rootId = enabled.voiceSession.id, epoch = f.readConfig().voiceSessionEpoch
  const root = f.residents.get(rootId)
  assert.ok(root)
  const before = f.calls.create.length
  const snapshot = f.instance.uiBridge.readConversation(f.foreign)
  assert.equal(snapshot.rootSessionId, rootId)
  const frames = []
  const off = f.instance.uiBridge.subscribeConversation(f.foreign, value => frames.push(value))
  assert.equal(frames.at(-1).rootSessionId, rootId)
  const reused = f.value(await f.ui('enable', { expectedOwnerSessionId: f.owner.id }, f.foreign))
  assert.equal(reused.voiceSession.id, rootId)
  assert.equal(f.calls.create.length, before)
  assert.equal(f.readConfig().voiceSessionEpoch, epoch)
  assert.equal(f.instance.sessionControl.allowed(f.foreign.id), false)
  assert.match(await f.invoke('voice_listen', { action: 'disable' }, f.foreign), /无权关闭/)
  f.residents.delete(f.owner.id)
  const mode = f.value(await f.ui('listen-mode', { mode: 'always' }, f.foreign))
  assert.equal(mode.listenMode, 'always')
  assert.equal(mode.voiceSession.id, rootId)
  assert.equal(f.readConfig().voiceSessionEpoch, epoch)
  const stopped = f.value(await f.ui('disable', {}, f.foreign))
  assert.equal(stopped.enabled, false)
  assert.equal(stopped.ownerSessionId, null)
  assert.equal(stopped.voiceSession.id, null)
  assert.equal(frames.at(-1).rootSessionId, null)
  assert.equal(f.commands().filter(command => command.op === 'always').at(-1).enabled, false)
  off()
})

test('owner authorization withdrawal closes global audio even after the origin session disappears', async t => {
  const f = await fixture(t)
  const auth = f.instance.uiBridge.readAuthorization()
  await f.instance.uiBridge.saveAuthorization({ revision: auth.revision, grant: true })
  const opened = f.value(await f.ui('new'))
  f.value(await f.ui('listen-mode', { mode: 'always' }))
  f.residents.delete(f.owner.id)
  const before = f.instance.uiBridge.readAuthorization()
  const revoked = await f.instance.uiBridge.saveAuthorization({ revision: before.revision, grant: false })
  assert.equal(revoked.revocationUnconfirmed, false)
  assert.equal(revoked.granted, false)
  assert.equal(f.status().enabled, false)
  assert.equal(f.status().voiceSession.id, null)
  assert.equal(f.residents.has(opened.voiceSession.id), false)
  assert.equal(f.commands().filter(command => command.op === 'always').at(-1).enabled, false)
})

for (const action of ['enable', 'new']) test(`owner authorization withdrawal prevents pending ${action} from granting the microphone`, async t => {
  const f = await fixture(t, { coldConfig: { preferredListenMode: 'always' } })
  const auth = f.instance.uiBridge.readAuthorization()
  await f.instance.uiBridge.saveAuthorization({ revision: auth.revision, grant: true })
  const gate = deferred(), priorModelChecks = f.calls.model.length
  f.faults.modelGate = gate.promise
  const opening = f.ui(action)
  try {
    await eventually(() => f.calls.model.length > priorModelChecks, 'waiting inside voice model preparation')
    const withdrawn = f.instance.uiBridge.saveAuthorization({ revision: f.instance.uiBridge.readAuthorization().revision, grant: false })
    assert.equal(f.instance.uiBridge.readAuthorization().granted, false)
    gate.resolve()
    assert.equal((await opening).kind, 'error')
    const result = await withdrawn
    assert.equal(result.revocationUnconfirmed, false)
    assert.equal(f.status().ownerSessionId, null)
    assert.ok(f.calls.configWrites.every(write => write.owner === null))
    assert.ok(!f.commands().some(command => command.op === 'always' && command.enabled))
    assert.equal(f.calls.processes.length, 0)
  } finally {
    gate.resolve()
    await opening
  }
})

test('human close from the visible voice root tolerates its intended retirement', async t => {
  const f = await fixture(t)
  const rootId = f.value(await f.ui('new')).voiceSession.id
  const root = f.residents.get(rootId)
  const closed = f.value(await f.ui('disable', {}, root))
  assert.equal(closed.enabled, false)
  assert.equal(closed.voiceSession.id, null)
  assert.equal(f.residents.has(rootId), false)
})

test('legacy always preference survives cold revocation without enabling old semantic defaults', async t => {
  const f = await fixture(t, { coldConfig: { listenMode: 'always', voiceSessionId: 'previous-owner', voiceSessionEpoch: 'previous-epoch', semantic: { enabled: true, url: 'http://127.0.0.1:8093/v1/embeddings', model: 'existing-model' } } })
  assert.equal(f.status().enabled, false)
  assert.equal(f.status().listenMode, 'always')
  assert.equal(f.readConfig().listenMode, 'ptt')
  assert.equal(f.readConfig().preferredListenMode, 'always')
  const settings = f.value(await f.ui('read-settings'))
  assert.equal(settings.values.semanticExperimental, false)
  assert.equal(f.readConfig().semantic.model, 'existing-model')
  assert.equal(f.calls.processes.length + f.calls.model.length, 0)
  const fresh = f.value(await f.ui('new'))
  assert.equal(fresh.enabled, true)
  assert.equal(fresh.listenMode, 'always')
})

test('preselected free microphone applies on resume and cancels safely during its final acknowledgement', async t => {
  for (const action of ['enable', 'new', 'resume']) await t.test(action, async child => {
    const f = await fixture(child), abort = new AbortController()
    let rootId
    if (action === 'resume') {
      rootId = f.value(await f.ui('new')).voiceSession.id
      f.value(await f.ui('disable'))
    }
    f.value(await f.ui('listen-mode', { mode: 'always' }))
    const gateFile = join(f.home, 'hold-always')
    writeFileSync(gateFile, 'pause preferred free microphone start')
    const pending = f.ui(action, rootId ? { id: rootId } : {}, f.owner, abort.signal)
    try {
      await eventually(() => existsSync(join(f.home, 'at-always')), 'preferred free microphone awaiting acknowledgement')
      assert.equal(f.readConfig().voiceSessionId, f.owner.id)
      abort.abort()
    } finally { rmSync(gateFile, { force: true }) }
    assert.equal((await pending).kind, 'error')
    assert.equal(f.readConfig().voiceSessionId, null)
    assert.equal(f.readConfig().listenMode, 'ptt')
    assert.equal(f.readConfig().preferredListenMode, 'always', 'cancellation revokes capture, not the prior selection')
    assert.equal(f.status().enabled, false)
    assert.equal(f.commands().filter(command => command.op === 'always').at(-1).enabled, false)
    assert.equal(f.calls.rootFollowup.length + f.calls.rootSteer.length + f.calls.activation.length, 0)
    const resumed = f.value(await f.ui('enable'))
    assert.equal(resumed.enabled, true)
    assert.equal(resumed.listenMode, 'always')
    f.value(await f.ui('disable'))
    if (rootId) {
      const selected = f.value(await f.ui('resume', { id: rootId }))
      assert.equal(selected.voiceSession.id, rootId)
      assert.equal(selected.enabled, true)
      assert.equal(selected.listenMode, 'always')
    }
  })
})

test('hot upgrade waits for the old owned root and helper exit before restoring exact history', async t => {
 const f=await fixture(t)
 const first=f.value(await f.ui('new')).voiceSession.id
 const oldHelper=f.calls.processes[0],gate=deferred()
 f.faults.rootDisposeGate=gate.promise
 const next=f.reload()
 t.after(async()=>{await next.dispose().catch(()=>{});if(globalThis.__dshWhaleEar__===next)delete globalThis.__dshWhaleEar__})
 const enabling=next.uiBridge.changeForCaller(f.owner,true)
 await new Promise(resolve=>setTimeout(resolve,30))
 assert.equal(f.calls.resume.length,0,'resume cannot race predecessor teardown')
 assert.equal(f.calls.processes.length,1,'new helper cannot start before predecessor teardown')
 gate.resolve();await enabling
 assert.equal(next.uiBridge.status().voiceSession.id,first)
 assert.ok(oldHelper.exitCode!==null||oldHelper.signalCode!==null,'old helper actually exited')
 assert.equal(f.calls.resume.length,1)
 assert.equal(f.calls.rootFollowup.length,0,'upgrade never replays input')
 await next.dispose()
})

test('real control recovers legacy unknown enable only after exact stored root release and verified stop', async t => {
 const f=await fixture(t)
 const authorization=f.instance.uiBridge.readAuthorization()
 await f.instance.uiBridge.saveAuthorization({revision:authorization.revision,grant:true})
 const root=f.value(await f.ui('new')).voiceSession.id
 const old=f.residents.get(root)
 f.value(await f.ui('disable'))
 f.residents.set(root,old)
 const manage=async operation=>JSON.parse(await f.invoke('voice_manage',{action:'execute',operation,params:{}}))
 const busy=await manage('enable')
 assert.equal(busy.status,'blocked');assert.equal(busy.request.error.code,'VOICE_ROOT_OWNED_ELSEWHERE')
 assert.equal(f.status().voiceSession.fullyStopped,false)
 assert.equal(f.instance.uiBridge.readAuthorization().granted,true)
 // Old versions persisted only operation names. Exercise migration without
 // inventing a successful recovery or deleting any other uncertain action.
 const path=f.configPath+'.agent-permissions.json',policy=JSON.parse(readFileSync(path,'utf8'))
 policy.authorization.blockedOperations=['enable','save-settings'];writeFileSync(path,JSON.stringify(policy))
 assert.equal((await manage('enable')).status,'outcome-unknown')
 assert.equal((await manage('disable')).status,'unknown')
 assert.equal(f.residents.get(root),old,'unowned live root is untouched')
 f.residents.delete(root)
 assert.equal((await manage('disable')).status,'completed')
 assert.equal(f.instance.uiBridge.readAuthorization().blockedOperations.includes('enable'),false)
 assert.equal(f.instance.uiBridge.readAuthorization().blockedOperations.includes('save-settings'),true)
 assert.equal((await manage('enable')).status,'completed')
 assert.equal(f.status().voiceSession.id,root)
 assert.equal(f.calls.rootFollowup.length,0)
})

test('legacy nonawaitable unload cannot start new audio or be bypassed by another reload', async t => {
 const f=await fixture(t)
 await f.instance.dispose()
 globalThis.__dshWhaleEar__={dispose(){}}
 const next=f.reload()
 await assert.rejects(next.uiBridge.changeForCaller(f.owner,true),{code:'VOICE_PREDECESSOR_STOP_UNCONFIRMED'})
 assert.equal(f.calls.processes.length,0)
 assert.equal(next.uiBridge.status().voiceSession.fullyStopped,false)
 const again=f.reload()
 await assert.rejects(again.uiBridge.changeForCaller(f.owner,true),/cleanup is unconfirmed/)
 assert.equal(f.calls.processes.length,0)
 await again.dispose().catch(()=>{})
 if(globalThis.__dshWhaleEar__===again)delete globalThis.__dshWhaleEar__
})


async function inputFailureFixture(t) {
  const f = await fixture(t, { captureProtocol: true })
  f.controller.setSession(f.owner.id)
  assert.equal(await f.controller.run(f.owner.id, 'enable'), true)
  f.controller.attachConversationClient({ subscribe: (id, send) => f.instance.uiBridge.subscribeConversation(f.residents.get(id), send) })
  const input = (sequence, state = 'start', extra = {}) => ({ event: 'voice-input', state, mode: 'ptt',
    inputTurnId: sequence.toString(16).padStart(24, '0'), inputSequence: sequence,
    voiceSessionId: f.readConfig().voiceSessionId, voiceSessionEpoch: f.readConfig().voiceSessionEpoch,
    captureId: f.commands().filter(command => command.captureId).at(-1)?.captureId ?? 'initial-capture', ...extra })
  const inject = async (...events) => {
    writeFileSync(join(f.home, 'inject-events.json'), JSON.stringify(events))
    try { await f.invoke('voice_status', {}) } finally { rmSync(join(f.home, 'inject-events.json')) }
  }
  return { ...f, input, inject, live: () => f.controller.getSnapshot().conversation }
}

test('live input errors are scoped, sanitized, and only current transcription proves recovery', async t => {
  const f = await inputFailureFixture(t)
  const old = f.input(1)
  await f.inject(old, { ...old, state: 'error', code: 'device', message: 'PRIVATE /home/user/original words' }, { event: 'error', message: 'PRIVATE /home/user/original words' })
  assert.equal(f.live().inputError, 'device')
  assert.equal(f.live().inputActive, false)
  assert.doesNotMatch(JSON.stringify(f.live()), /PRIVATE|\/home\/user/)
  assert.equal(f.controller.getSnapshot().uncertain, false)
  await f.controller.run(f.owner.id, 'status')
  await f.controller.run(f.owner.id, 'read-settings')
  assert.equal(f.live().inputError, 'device', 'status and device enumeration cannot prove capture recovered')
  const retry = f.input(2)
  await f.inject(retry, { ...old, state: 'error', code: 'recognition' }, { ...old, event: 'transcript', text: 'older successful input' })
  assert.equal(f.live().inputError, 'device', 'new start and old transcript do not claim recovery')
  await f.inject({ ...retry, state: 'error', code: 'recognition' })
  assert.equal(f.live().inputError, 'recognition')
  const success = f.input(3)
  await f.inject(success, { ...success, event: 'transcript', text: 'current successful input' }, { ...success, state: 'error', code: 'device' })
  assert.equal(f.live().inputError, null, 'late error after current success cannot resurrect failure')
  const current = f.input(4)
  await f.inject(current)
  for (const extra of [{ voiceSessionId: 'other-root' }, { voiceSessionEpoch: 'old-epoch' }, { captureId: 'old-capture' }, { inputTurnId: old.inputTurnId }, { inputSequence: 3 }, { code: 'PRIVATE arbitrary error' }]) {
    await f.inject({ ...current, state: 'error', code: 'device', ...extra })
    assert.equal(f.live().inputError, null)
  }
  await f.inject({ ...current, state: 'cancel', reason: 'user-stop' }, { ...current, state: 'error', code: 'device' })
  assert.equal(f.live().inputError, null, 'cancelled input cannot publish a late failure')
  const attempt = f.input(5, 'attempt', { mode: 'always' })
  await f.inject(attempt, { ...attempt, state: 'error', code: 'device' })
  assert.equal(f.live().inputError, 'device', 'stream opening may fail before a speech turn starts')
  assert.equal(await f.controller.run(f.owner.id, 'disable'), true)
  assert.equal(f.live().inputError, null)
  assert.equal(f.controller.getSnapshot().status.enabled, false)
  assert.equal(await f.controller.run(f.owner.id, 'enable'), true)
  await f.inject({ ...attempt, state: 'error', code: 'device' })
  assert.equal(f.live().inputError, null, 're-enabling cannot reuse an old grant error')
  const latest = f.input(6)
  await f.inject(latest, { ...latest, state: 'error', code: 'recognition' })
  assert.equal(f.live().inputError, 'recognition')
  assert.equal(await f.controller.run(f.owner.id, 'new'), true)
  assert.equal(f.live().inputError, null, 'new root clears the previous input failure')
})

const renderAvailable = Boolean(process.env.DSH_SOURCE_ROOT || process.env.WHALE_RENDER_DEPS && process.env.WHALE_REACT_DEPS)
test('asynchronous input failures rerender the existing home controls and keep mute reachable', { skip: !renderAvailable }, async t => {
  const { createRequire } = await import('node:module'), { default: vm } = await import('node:vm')
  const host = process.env.DSH_SOURCE_ROOT, renderDeps = process.env.WHALE_RENDER_DEPS, reactDeps = process.env.WHALE_REACT_DEPS
  const buildRequire = createRequire(join(renderDeps || host, 'package.json'))
  const { transformSync } = renderDeps ? buildRequire('esbuild') : createRequire(buildRequire.resolve('vite/package.json'))('esbuild')
  const { JSDOM } = buildRequire('jsdom')
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost' })
  const previous = Object.fromEntries(['window', 'document', 'navigator', 'IS_REACT_ACT_ENVIRONMENT'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, IS_REACT_ACT_ENVIRONMENT: true })) Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
  const require = createRequire(join(reactDeps || join(host, 'packages/client/ui-primitives'), 'package.json'))
  const React = require('react'), { createRoot } = require('react-dom/client'), act = React.act ?? require('react-dom/test-utils').act
  const native = tag => React.forwardRef(({ children, variant, ...props }, ref) => React.createElement(tag, { ...props, ref }, children))
  const primitives = { Button: native('button'), Input: native('input'), MenuSurface: native('div'), Checkbox: ({ label, ...props }) => React.createElement('label', null, React.createElement('input', { ...props, type: 'checkbox' }), label) }
  const modules = new Map()
  const load = name => {
    if (modules.has(name)) return modules.get(name)
    const scope = { module: { exports: {} }, document: dom.window.document, require(id) {
      if (id.endsWith('.css')) return { text: '' }
      if (id === '../../package.json') return JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
      if (id === '@deepseek-ai/dsh-client-ui-primitives') return primitives
      return id.startsWith('./') ? load(id.slice(2)) : require(id)
    } }
    vm.runInNewContext(transformSync(readFileSync(join(import.meta.dirname, '../ui/src', name), 'utf8'), { loader: name.endsWith('.jsx') ? 'jsx' : 'js', format: 'cjs', jsx: 'automatic' }).code, scope)
    modules.set(name, scope.module.exports); return scope.module.exports
  }
  const { Controls } = load('views.jsx'), { zh } = load('locales.mjs')
  const container = document.getElementById('root'), root = createRoot(container)
  try {
    const f = await inputFailureFixture(t)
    const props = { sessionId: f.owner.id, t: key => zh[key] ?? key, run: (...args) => f.controller.run(...args), readState: f.controller.getSnapshot,
      useWhaleUi: select => select(React.useSyncExternalStore(f.controller.subscribe, f.controller.getSnapshot)),
      useWhalePreferences: select => select({ motion: 'spring', error: null, assistantName: '助手' }), openSettings() {} }
    await act(async () => root.render(React.createElement(Controls, props)))
    const initialButtons = container.querySelectorAll('button').length
    const first = f.input(1)
    await act(async () => f.inject(first, { ...first, state: 'error', code: 'device', message: 'PRIVATE /user/path speech' }))
    assert.match(container.querySelector('[role="status"]').textContent, /麦克风不可用/)
    assert.match(container.querySelector('[data-whale-input-hint]').textContent, /结束对话后可在设置中选设备/)
    assert.ok(container.querySelectorAll('button').length <= initialButtons, 'uses existing controls, not a new panel')
    assert.doesNotMatch(container.textContent, /PRIVATE|\/user\/path/)
    const mute = () => [...container.querySelectorAll('button')].find(button => button.textContent === '结束对话')
    assert.equal(mute().disabled, false)
    assert.ok(container.querySelector('[data-whale-settings-trigger]'))
    const retry = f.input(2)
    await act(async () => f.inject(retry))
    assert.match(container.querySelector('[role="status"]').textContent, /麦克风不可用/, 'start is not a recovery receipt')
    await act(async () => f.inject({ ...retry, state: 'error', code: 'recognition' }))
    assert.match(container.querySelector('[data-whale-input-hint]').textContent, /识别模型/)
    const success = f.input(3)
    await act(async () => f.inject(success, { ...success, event: 'transcript', text: 'successful input' }))
    assert.doesNotMatch(container.textContent, /麦克风不可用|语音识别失败|识别模型/)
    const next = f.input(4)
    await act(async () => f.inject(next, { ...next, state: 'error', code: 'no-speech' }))
    assert.match(container.querySelector('[role="status"]').textContent, /没听清/)
    await act(async () => { mute().click(); await eventually(() => f.controller.getSnapshot().status?.enabled === false && !f.controller.getSnapshot().busy, 'mute completed') })
    assert.doesNotMatch(container.textContent, /没听清|麦克风不可用|语音识别失败/)
    assert.ok([...container.querySelectorAll('button')].some(button => button.textContent === '开始对话'))
  } finally {
    await act(async () => root.unmount())
    dom.window.close()
    for (const [key, descriptor] of Object.entries(previous)) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key] }
  }
})

async function realCaptureRecoveryFixture(t, mode) {
  const f = await fixture(t, { turnSignals: { enabled: false, volume: .2, headphonesConfirmed: false, experimentalAutomaticBargeIn: false } })
  const wrapper = join(f.home, 'capture-helper.py')
  const source = join(import.meta.dirname, '..', 'helper', 'voice_helper.py')
  writeFileSync(wrapper, `import os\nos.environ['DSH_HOME'] = ${JSON.stringify(f.home)}\nSOURCE = ${JSON.stringify(source)}\n` + readFileSync(new URL('./fixtures/capture-recovery-helper.py', import.meta.url), 'utf8'))
  writeFileSync(join(f.home, 'capture-close-mode'), mode)
  writeFileSync(f.configPath, JSON.stringify({ ...f.readConfig(), pythonPath: process.env.PYTHON ?? (process.platform === 'win32' ? 'python' : 'python3'), helperPath: wrapper, preload: false, tts: { provider: 'off' } }))
  const lines = name => existsSync(join(f.home, name)) ? readFileSync(join(f.home, name), 'utf8').trim().split(/\r?\n/).filter(Boolean) : []
  f.controller.setSession(f.owner.id)
  assert.equal(await f.controller.run(f.owner.id, 'enable'), true, f.controller.getSnapshot().error)
  f.controller.attachConversationClient({ subscribe: (id, send) => f.instance.uiBridge.subscribeConversation(f.residents.get(id), send) })
  return { ...f, lines, setCloseMode: value => writeFileSync(join(f.home, 'capture-close-mode'), value), async start() {
    const before = lines('capture-starts').length
    await f.instance.ear.start()
    try {
      await eventually(() => lines('capture-starts').length > before, 'real helper opened the fake native stream')
    } catch (error) {
      // Keep the exact failure/deadline, but retain bounded fixture diagnostics
      // before teardown removes the home. This read cannot wake/start a helper.
      const log = join(f.home, 'whale-ear', 'whale-ear.log')
      t.diagnostic(`capture fixture: ${JSON.stringify({ status: f.status().helper, commands: lines('capture-commands').slice(-12) })}`)
      if (existsSync(log)) t.diagnostic(readFileSync(log, 'utf8').slice(-4000))
      throw error
    }
  } }
}

test('real Python close failure recovers through disable then enable, without another authorization', async t => {
  const f = await realCaptureRecoveryFixture(t, 'failed')
  const old = f.calls.processes[0]
  const authorization = f.instance.uiBridge.readAuthorization()
  await f.instance.uiBridge.saveAuthorization({ revision: authorization.revision, grant: true })
  await f.start(); await f.instance.ear.stop()
  await eventually(() => f.controller.getSnapshot().conversation?.inputError === 'device', 'safe native close error')
  assert.equal((await f.instance.ear.status()).captureDevice.state, 'close-unconfirmed')
  f.setCloseMode('healthy')
  assert.equal(await f.controller.run(f.owner.id, 'disable'), true, f.controller.getSnapshot().error)
  assert.ok(old.exitCode !== null || old.signalCode !== null, 'stop receipt requires actual process exit')
  assert.equal(f.calls.processes.length, 1, 'stopping never starts a replacement')
  assert.equal(f.status().helper.online, false)
  assert.equal(f.status().voiceSession.fullyStopped, true)
  assert.equal(f.status().voiceSession.recovery.stopVerified, true)
  assert.equal(await f.controller.run(f.owner.id, 'enable'), true, f.controller.getSnapshot().error)
  assert.equal(f.calls.processes.length, 2)
  assert.equal(f.instance.uiBridge.readAuthorization().granted, true)
  await f.start()
  assert.equal(f.lines('capture-starts').length, 2)
  assert.equal(await f.controller.run(f.owner.id, 'disable'), true)
  assert.equal(f.calls.processes.length, 2, 'replacement stays warm once its native close succeeds')
  assert.equal(f.status().helper.online, true)
  assert.equal(f.calls.rootFollowup.length, 0, 'recovery never replays input or work')
})

test('healthy real Python capture is released without restart or heavy status inspection', async t => {
  const f = await realCaptureRecoveryFixture(t, 'healthy')
  await f.start()
  const before = f.lines('capture-commands').length
  assert.equal(await f.controller.run(f.owner.id, 'disable'), true, f.controller.getSnapshot().error)
  assert.deepEqual(f.lines('capture-commands').slice(before).filter(op => op !== 'cue-cancel'), ['always', 'stop', 'ptt-status', 'capture-status'])
  assert.equal(f.calls.processes.length, 1)
  assert.equal(f.calls.processes[0].exitCode, null)
  assert.equal(f.status().helper.online, true)
  assert.equal(f.status().voiceSession.recovery.stopVerified, true)
  const afterStop = f.lines('capture-commands')
  for (let i = 0; i < 3; i++) assert.equal(await f.controller.run(f.owner.id, 'status'), true)
  assert.deepEqual(f.lines('capture-commands'), afterStop, 'read-only panel status does not contact or start a helper')
  assert.equal(await f.controller.run(f.owner.id, 'enable'), true)
  await f.start()
  assert.equal(f.calls.processes.length, 1, 'healthy toggles retain loaded helper/model lifetime')
})

test('hung real Python close exits before a concurrent new grant can open its replacement', async t => {
  const f = await realCaptureRecoveryFixture(t, 'hung')
  await f.start(); await f.instance.ear.stop()
  await eventually(() => existsSync(join(f.home, 'capture-close-entered')), 'native close is hanging')
  const old = f.calls.processes[0]
  const disabling = f.ui('disable'), enabling = f.ui('enable', { expectedOwnerSessionId: null })
  await new Promise(resolve => setTimeout(resolve, 100))
  assert.equal(f.calls.processes.length, 1, 'queued enable cannot race physical cleanup')
  assert.equal(f.status().voiceSession.fullyStopped, false)
  f.setCloseMode('healthy')
  f.value(await disabling)
  assert.ok(old.exitCode !== null || old.signalCode !== null)
  const next = f.value(await enabling)
  assert.equal(next.enabled, true)
  assert.equal(f.calls.processes.length, 2)
  await f.start()
  assert.equal(f.calls.processes[1].exitCode, null)
  assert.equal(f.calls.processes[1].signalCode, null)
  assert.equal(f.lines('capture-starts').length, 2)
})

for (const operation of ['disable', 'new', 'resume', 'revoke']) test(`whole ${operation} cleanup stays pending while TTS drains and native capture is owned`, async t => {
  const f = await realCaptureRecoveryFixture(t, 'healthy')
  if (operation === 'resume') f.value(await f.ui('new'))
  await f.start()
  if (operation === 'revoke') {
    const authorization = f.instance.uiBridge.readAuthorization()
    await f.instance.uiBridge.saveAuthorization({ revision: authorization.revision, grant: true })
  }
  const root = f.status().voiceSession.id, originalCancel = f.instance.tts.cancel, gate = deferred()
  let entered = 0
  f.instance.tts.cancel = async () => { entered++; await gate.promise; return { status: 'cancelled' } }
  const stopping = operation === 'revoke'
    ? f.instance.uiBridge.saveAuthorization({ revision: f.instance.uiBridge.readAuthorization().revision, grant: false })
    : f.ui(operation, operation === 'resume' ? { id: root } : {})
  try {
    await eventually(() => entered >= 2 && f.status().voiceSession.id === null, 'root closed and explicit TTS shutdown entered')
    const physical = await f.instance.ear.status()
    const beforeReads = f.lines('capture-commands')
    const during = f.value(await f.ui('status'))
    assert.equal(physical.captureDevice.state, 'owned')
    assert.equal(during.voiceSession.fullyStopped, false, 'root cleanup alone is not a physical release receipt')
    assert.equal(during.voiceSession.recovery.kind, 'helper-cleanup-pending')
    assert.equal(during.voiceSession.recovery.stopVerified, false)
    assert.deepEqual(f.lines('capture-commands'), beforeReads, 'cached pending reads do not contact the helper')
  } finally {
    gate.resolve(); f.instance.tts.cancel = originalCancel
    const result = await stopping
    if (operation !== 'revoke') f.value(result)
  }
  assert.equal(f.status().voiceSession.recovery.kind, 'none', 'cleanup finally releases its pending scope')
  assert.equal(f.calls.processes.length, 1)
  if (['disable','revoke'].includes(operation)) {
    assert.equal(f.status().enabled, false)
    assert.equal((await f.instance.ear.status()).captureDevice.state, 'released')
  }
})

test('owner revocation still releases physical capture when TTS cancellation is unconfirmed', async t => {
  const f = await realCaptureRecoveryFixture(t, 'healthy')
  const authorization = f.instance.uiBridge.readAuthorization()
  await f.instance.uiBridge.saveAuthorization({ revision: authorization.revision, grant: true })
  await f.start()
  const originalCancel = f.instance.tts.cancel
  f.instance.tts.cancel = async () => ({ status: 'unconfirmed' })
  let result
  try { result = await f.instance.uiBridge.saveAuthorization({ revision: f.instance.uiBridge.readAuthorization().revision, grant: false }) }
  finally { f.instance.tts.cancel = originalCancel }
  assert.equal(result.granted, false)
  assert.equal(result.revocationUnconfirmed, true)
  assert.equal((await f.instance.ear.status()).captureDevice.state, 'released')
  assert.equal(f.status().enabled, false)
  assert.equal(f.status().voiceSession.recovery.kind, 'none', 'no dangling pending scope after failure')
})

for (const mode of ['ptt', 'always', 'wake']) test(`real Python EPIPE preserves the ${mode} grant and allows in-place mute/re-enable`, async t => {
  const f = await realCaptureRecoveryFixture(t, 'healthy')
  if (mode === 'ptt') await f.start()
  else {
    assert.equal(await f.controller.run(f.owner.id, 'listen-mode', { mode }), true)
    await eventually(() => f.lines('capture-starts').length === 1, 'initial continuous capture')
  }
  const epoch = f.readConfig().voiceSessionEpoch, voiceRoot = f.status().voiceSession.id
  const view = renderAvailable ? await renderControls(t, f) : null
  const act = view?.act ?? (fn => fn())
  const original = f.calls.processes.at(-1)
  await act(async () => {
    original.stdin.write('{"op":"test-break-stdin"}\n')
    await eventually(() => existsSync(join(f.home, 'stdin-closed')), 'actual request pipe closes')
    await assert.rejects(f.instance.ear.pttStatus(), /EPIPE|pipe/i)
    await eventually(() => original.exitCode !== null || original.signalCode !== null, 'failed helper really exits')
  })
  assert.equal(f.controller.getSnapshot().conversation.helper.online, false, 'stream reports failure before a status read')
  assert.equal(f.controller.getSnapshot().conversation.helper.listenMode, null, 'unknown never reuses the old continuous mode')
  assert.equal(f.controller.getSnapshot().conversation.inputActive, false)
  const assertOfflineView = () => {
    if (!view) return
    assert.match(view.container.querySelector('[role="status"]').textContent, /录音暂不可用/)
    assert.equal(view.container.querySelector('[data-listen-mode]').dataset.listenMode, 'unknown')
    assert.ok([...view.container.querySelector('[data-listen-mode]').querySelectorAll('button')].every(button=>button.disabled && button.getAttribute('aria-pressed')==='false'))
    assert.equal(view.button('结束对话').disabled, false, 'the actual rendered revoke control stays usable')
    assert.doesNotMatch(view.container.textContent, /麦克风：已开启|正在接收语音|自由麦直接听取|等待唤醒词/)
  }
  assertOfflineView()
  const commands = f.lines('capture-commands').length, starts = f.lines('capture-starts').length
  for (const action of ['status', 'read-settings', 'status']) await act(async () => {
    assert.equal(await f.controller.run(f.owner.id, action), true, `${action}: ${f.controller.getSnapshot().error ?? 'read was not admitted'}`)
    // First read-settings can schedule the controller's one-time setup reads.
    // Real buttons remain disabled until that read-only chain settles. DOM act
    // drains it too; the headless controller path must observe the same state.
    await eventually(() => !f.controller.getSnapshot().busy, `UI reads settled after ${action}`)
  })
  assertOfflineView()
  assert.equal(f.status().enabled, true)
  assert.equal(f.readConfig().voiceSessionEpoch, epoch)
  assert.equal(f.status().voiceSession.id, voiceRoot)
  assert.equal(f.calls.processes.length, 1, 'pure UI reads never spawn a replacement')
  assert.equal(f.lines('capture-commands').length, commands)
  await act(async () => {
    if (view) { view.button('结束对话').click(); await eventually(() => !f.controller.getSnapshot().status.enabled && !f.controller.getSnapshot().busy, 'rendered mute completed') }
    else assert.equal(await f.controller.run(f.owner.id, 'disable'), true)
  })
  await new Promise(resolve => setTimeout(resolve, 1100))
  assert.equal(f.calls.processes.length, 1, 'explicit mute cannot be undone by a queued retry')
  await act(async () => {
    if (view) { view.button('开始对话').click(); await eventually(() => f.controller.getSnapshot().status.enabled && !f.controller.getSnapshot().busy, 'rendered explicit re-enable completed') }
    else assert.equal(await f.controller.run(f.owner.id, 'enable'), true)
    if (mode === 'ptt') await f.start()
    await eventually(() => f.lines('capture-starts').length > starts, 'new explicit capture works')
  })
  assert.equal(f.calls.processes.length, 2)
  assert.equal(f.status().listenMode, mode)
  await view?.close()
})

for (const ending of ['SIGKILL', 'stdin-EOF']) test(`real Python ${ending} retains the valid grant but does not silently reopen continuous capture`, async t => {
  const f = await realCaptureRecoveryFixture(t, 'healthy')
  assert.equal(await f.controller.run(f.owner.id, 'listen-mode', { mode: 'always' }), true)
  await eventually(() => f.lines('capture-starts').length === 1, 'initial continuous capture')
  const epoch = f.readConfig().voiceSessionEpoch, root = f.status().voiceSession.id, original = f.calls.processes.at(-1)
  if (ending === 'SIGKILL') original.kill('SIGKILL')
  else original.stdin.end()
  await eventually(() => original.exitCode !== null || original.signalCode !== null, 'original process exits')
  assert.equal(f.controller.getSnapshot().conversation.helper.online, false)
  await eventually(() => f.calls.processes.length === 2 && f.status().helper.online, 'same-runtime automatic replacement')
  assert.equal(f.readConfig().voiceSessionEpoch, epoch)
  assert.equal(f.status().voiceSession.id, root)
  assert.equal(f.controller.getSnapshot().conversation.helper.listenMode, 'ptt', 'live stream overrides stale always status on readiness')
  assert.equal(f.lines('capture-starts').length, 1, 'keeping the grant does not add a continuous-capture restart')
  assert.equal(await f.controller.run(f.owner.id, 'status'), true)
  assert.equal(f.status().listenMode, 'ptt')
  assert.equal(await f.controller.run(f.owner.id, 'disable'), true)
  const processes = f.calls.processes.length
  await new Promise(resolve => setTimeout(resolve, 1100))
  assert.equal(f.calls.processes.length, processes)
})

test('real Python repeated ready crashes back off and a subsequent explicit mute cancels recovery', async t => {
  const f = await realCaptureRecoveryFixture(t, 'healthy')
  const first = f.calls.processes.at(-1)
  first.kill('SIGKILL')
  await eventually(() => first.signalCode !== null, 'first helper exits')
  await eventually(() => f.calls.processes.length === 2 && f.status().helper.online, 'first automatic retry')
  const second = f.calls.processes.at(-1)
  second.kill('SIGKILL')
  await eventually(() => second.signalCode !== null, 'second ready helper exits')
  await new Promise(resolve => setTimeout(resolve, 1100))
  assert.equal(f.calls.processes.length, 2, 'second quick failure no longer retries after just one second')
  assert.equal(await f.controller.run(f.owner.id, 'status'), true)
  assert.equal(await f.controller.run(f.owner.id, 'disable'), true)
  await new Promise(resolve => setTimeout(resolve, 1100))
  assert.equal(f.calls.processes.length, 2, 'mute cancels the two-second retry before admission')
  assert.equal(f.status().enabled, false)
})


test('production prompt command saves and clears full-length additional text without starting voice', async t => {
 const f=await fixture(t,{voiceSession:{customPrompt:'saved initial text'}})
 const before=f.value(await f.ui('read-settings'))
 assert.equal(before.voicePrompt.text,'saved initial text');assert.equal(before.voicePrompt.customSupported,true);assert.equal(before.voicePrompt.mode,'custom')
 const text='x'.repeat(32768)
 const saved=f.value(await f.ui('save-voice-prompt',{revision:before.revision,values:{text}}))
 assert.equal(saved.voicePrompt.text,text);assert.equal(f.readConfig().voiceSession.customPrompt,text)
 const cleared=f.value(await f.ui('save-voice-prompt',{revision:saved.revision,values:{text:''}}))
 assert.equal(cleared.voicePrompt.text,'');assert.equal(cleared.voicePrompt.mode,'agents');assert.equal(f.readConfig().voiceSession.customPrompt,'')
 assert.equal(f.calls.create.length,0);assert.equal(f.calls.model.length,0);assert.equal(f.calls.processes.length,0)
})

test('saved additional prompt reaches the same hidden root after stop and enable without changing its system rules',async t=>{
 const f=await fixture(t)
 let settings=f.value(await f.ui('read-settings'))
 settings=f.value(await f.ui('save-voice-prompt',{revision:settings.revision,values:{text:'FIRST_SAVED_VOICE_HINT'}}))
 f.value(await f.ui('new'))
 const first=f.status().voiceSession.id
 assert.ok(first);assert.equal(f.status().voiceSession.presentation.hidden,true)
 let context=f.calls.prompt.filter(x=>x.name==='whale-voice:preferences').at(-1)
 assert.match(context.text,/FIRST_SAVED_VOICE_HINT/);const system=f.calls.prompt.filter(x=>x.name==='whale-voice:main').at(-1).text
 assert.doesNotMatch(system,/FIRST_SAVED_VOICE_HINT/)
 const active=await f.ui('save-voice-prompt',{revision:settings.revision,values:{text:'SHOULD_NOT_APPLY'}})
 assert.equal(active.kind,'error');assert.equal(f.status().voiceSession.id,first)
 f.value(await f.ui('disable'));settings=f.value(await f.ui('read-settings'))
 f.value(await f.ui('save-voice-prompt',{revision:settings.revision,values:{text:'UPDATED_SAVED_VOICE_HINT'}}))
 f.value(await f.ui('enable'))
 assert.equal(f.status().voiceSession.id,first)
 context=f.calls.prompt.filter(x=>x.name==='whale-voice:preferences').at(-1)
 assert.match(context.text,/UPDATED_SAVED_VOICE_HINT/);assert.doesNotMatch(context.text,/FIRST_SAVED_VOICE_HINT|SHOULD_NOT_APPLY/)
 assert.equal(f.calls.prompt.filter(x=>x.name==='whale-voice:main').at(-1).text,system)
})
