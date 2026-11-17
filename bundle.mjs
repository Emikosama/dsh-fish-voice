/** One DSH bundle owns the core and human-command UI adapter. No installation hooks. */
import * as core from './index.mjs'
import * as ui from './ui/host.mjs'
import * as conversationRemote from './ui/conversation-remote.mjs'

export const name = 'dsh-whale-voice'
export const inject = core.inject

export async function apply(ctx, config) {
  await ctx.plugin(core, { ...config, bundled: true })
  ctx.plugin(ui)
  ctx.plugin(conversationRemote)
}
