/** Isolated real DSH CommandRuntime + SessionStore integration; no audio, model, or user profile. */
import { Context } from '@deepseek-ai/cordis'
import CommandRuntime from '@deepseek-ai/dsh-commands'
import SessionStore, { SessionId } from '@deepseek-ai/dsh-session'
import { createScope } from '@deepseek-ai/dsh-scope'
import type { Agent } from '@deepseek-ai/dsh-agent'
import { expect, it, onTestFinished, vi } from 'vitest'
import * as Ui from './fixtures/whale-ear-ui-host.mjs'

it('dispatches the UI command through the native exact-Agent path and unregisters on unload', async () => {
  const ctx = new Context()
  onTestFinished(() => ctx.fiber.dispose())
  await ctx.plugin(SessionStore)
  await ctx.plugin(CommandRuntime)
  const session = ctx.sessions.create(SessionId('ui-source-fixture'))
  // Same source-plane Agent fixture used by the owning CommandRuntime tests.
  const agent = { id: session.id, session } as Agent
  await ctx.plugin(Object.assign((scope: Context) => { createScope(scope, agent) }, { inject: ['commands'] }))
  const status = vi.fn(() => ({ ownerSessionId: session.id, enabled: true, helper: { online: false } }))
  const changeForCaller = vi.fn()
  ctx.provide('whaleVoiceSession', { status, changeForCaller } as never)
  const plugin = ctx.plugin(Ui)
  await plugin.await()
  expect(ctx.commands.list(agent).some(item => item.name === 'whale-ear-ui')).toBe(true)
  const forged = await ctx.commands.execute(agent, '/whale-ear-ui {"action":"enable","sessionId":"forged","source":{"kind":"agent"}}', [], new AbortController().signal)
  expect(forged?.result.kind).toBe('error')
  expect(changeForCaller).not.toHaveBeenCalled()
  const result = await ctx.commands.execute(agent, '/whale-ear-ui {"action":"enable"}', [], new AbortController().signal)
  expect(result?.result.kind).toBe('success')
  expect(changeForCaller).toHaveBeenCalledOnce()
  expect(changeForCaller.mock.calls[0]?.[0]).toBe(agent)
  expect(status).toHaveBeenCalledWith(agent)
  expect(session.snapshotEvents().filter(event => event.type === 'command/run')).toHaveLength(2)
  expect(session.snapshotEvents().filter(event => event.type === 'command/done')).toHaveLength(2)
  expect(session.snapshotEvents().filter(event => event.type === 'command/run').every(event => event.data.source.kind === 'user')).toBe(true)
  await plugin.dispose()
  expect(ctx.commands.list(agent).some(item => item.name === 'whale-ear-ui')).toBe(false)
})
