import { createRequire } from 'node:module'
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
// The production artifact includes its zod codec; only transport is synthetic.
// Keep DSH renderer and primitives sourced from the pinned host below.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export function resolveHostReactAliases(source) {
  // pnpm exposes React at the package that declares it, not the monorepo root.
  // Resolve both libraries from the renderer so plugin hooks and the host share
  // exactly one instance even if another package has a different React copy.
  const rendererRequire = createRequire(join(source, 'packages/client/ui-renderer/package.json'))
  return {
    react: dirname(rendererRequire.resolve('react/package.json')),
    'react-dom': dirname(rendererRequire.resolve('react-dom/package.json')),
  }
}
export async function buildFixture(source) {
const require = createRequire(join(source, 'package.json'))
const { build } = await import(pathToFileURL(createRequire(require.resolve('vite/package.json')).resolve('esbuild')))
const { transform } = require('lightningcss')
const temp = await mkdtemp(join(tmpdir(), 'whale-ui-fixture-'))
const published = process.env.WHALE_UI_PUBLISHED_ROOT
const runtime = process.env.WHALE_UI_RUNTIME_ROOT
const publishedAliases = {}
if (published) {
  if (!runtime) throw new Error('Published renderer checks require WHALE_UI_RUNTIME_ROOT with official Cordis installed')
  const rendererPath = join(published, 'dsh-client-ui-renderer/package/lib/client.js')
  const rendererManifest = JSON.parse(await readFile(join(published, 'dsh-client-ui-renderer/package/package.json'), 'utf8'))
  const slotsManifest = JSON.parse(await readFile(join(published, 'dsh-client-ui-slots/package/package.json'), 'utf8'))
  if (rendererManifest.version !== '0.2.2-rc.1' || slotsManifest.version !== '0.2.2-rc.1') throw new Error('Expected the actual published rc.1 renderer and slots')
  const wrapper = join(temp, 'published-renderer.mjs')
  await writeFile(wrapper, `import * as React from 'react';import * as ReactDom from 'react-dom';import * as ReactDomClient from 'react-dom/client';import * as Jsx from 'react/jsx-runtime';import * as Slots from '@deepseek-ai/dsh-client-ui-slots';import * as Cordis from '@deepseek-ai/cordis';
let registration;const before=window.__ModuleLoader__;window.__ModuleLoader__={load:value=>{registration=value}};
${await readFile(rendererPath, 'utf8')}
window.__ModuleLoader__=before;const shared={react:React,'react-dom':ReactDom,'react-dom/client':ReactDomClient,'react/jsx-runtime':Jsx,'@deepseek-ai/dsh-client-ui-slots':Slots,'@deepseek-ai/cordis':Cordis};const renderer=registration.factory(name=>{if(!(name in shared))throw new Error('Unexpected published import '+name);return shared[name]});export const apply=renderer.apply;export const inject=renderer.inject;`)
  publishedAliases['dsh-fixture-renderer'] = wrapper
  publishedAliases['@deepseek-ai/dsh-client-ui-slots'] = join(published, 'dsh-client-ui-slots/package/lib/index.js')
  publishedAliases['@deepseek-ai/cordis'] = join(runtime, 'node_modules/@deepseek-ai/cordis/lib/index.js')
}
await build({
  entryPoints: [join(root, 'tests/fixture.jsx')], outfile: join(temp, 'fixture.js'), bundle: true, format: 'esm', platform: 'browser', target: 'es2022', jsx: 'automatic',
  tsconfig: join(source, 'tsconfig.base.json'),
  nodePaths: [join(source, 'node_modules'), join(source, 'packages/client/ui-primitives/node_modules')],
  alias: {
    // One host React instance must own both renderer hooks and plugin controls.
    ...resolveHostReactAliases(source),
    'dsh-fixture-renderer': join(source, 'packages/client/ui-renderer/src/client/index.ts'),
    'dsh-fixture-button': join(source, 'packages/client/ui-primitives/src/Button.tsx'),
    'dsh-fixture-checkbox': join(source, 'packages/client/ui-primitives/src/Checkbox.tsx'),
    'dsh-fixture-input': join(source, 'packages/client/ui-primitives/src/Input.tsx'),
    'dsh-fixture-menu-surface': join(source, 'packages/client/ui-primitives/src/MenuSurface.tsx'),
    ...publishedAliases,
  },
  plugins: [{ name: 'fixture-css', setup(build) { build.onLoad({ filter: /\.module\.css$/ }, async ({ path }) => {
    const result = transform({ filename: path, code: await readFile(path), cssModules: true })
    const classes = Object.fromEntries(Object.entries(result.exports).map(([key, item]) => [key, item.name]))
    return { contents: `const tag=document.createElement('style');tag.textContent=${JSON.stringify(result.code.toString())};document.head.append(tag);export default ${JSON.stringify(classes)}`, loader: 'js' }
  }) } }],
})

return temp
}
