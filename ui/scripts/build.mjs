import './build-contract.mjs'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { readFile, mkdir } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = process.env.DSH_SOURCE_ROOT
const require = createRequire(sourceRoot ? join(sourceRoot, 'package.json') : join(root, 'package.json'))
const esbuildPath = (() => { try { return require.resolve('esbuild') } catch { return createRequire(require.resolve('vite/package.json')).resolve('esbuild') } })()
const esbuild = await import(pathToFileURL(esbuildPath))
const { transform } = require('lightningcss')

export const cssPlugin = {
  name: 'whale-css-modules',
  setup(build) {
    build.onLoad({ filter: /\.module\.css$/ }, async ({ path }) => {
      const result = transform({ filename: path, code: await readFile(path), cssModules: true, minify: false })
      const classes = Object.fromEntries(Object.entries(result.exports).map(([key, item]) => [key, item.name]))
      return { contents: `export default ${JSON.stringify({ ...classes, text: result.code.toString() })}`, loader: 'js' }
    })
  },
}

const bundleManifest = JSON.parse(await readFile(join(root, '..', 'package.json'), 'utf8'))
const legacyUiManifest = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
for (const [bundleId, outputRoot] of [[legacyUiManifest.name, root], [bundleManifest.name, resolve(root, '..')]]) {
  await mkdir(join(outputRoot, 'lib'), { recursive: true })
  await esbuild.build({
    entryPoints: [join(root, 'src/index.jsx')], outfile: join(outputRoot, 'lib/client.js'),
    nodePaths: sourceRoot ? [join(sourceRoot, 'node_modules')] : [],
    bundle: true, format: 'cjs', platform: 'browser', target: 'es2022', jsx: 'automatic',
    minify: true,
    external: ['react', 'react-dom', 'react/jsx-runtime', '@deepseek-ai/dsh-client-ui-primitives'],
    define: { __WHALE_BUNDLE_ID__: JSON.stringify(bundleId) },
    // Browser bundling consumes the same schema source directly. The host uses
    // the committed self-contained artifact generated above.
    plugins: [cssPlugin, { name: 'whale-contract-source', setup(build) {
      build.onResolve({ filter: /conversation-contract\.mjs$/ }, () => ({ path: join(root, 'src/conversation-contract.mjs') }))
    } }],
    banner: { js: `window.__ModuleLoader__.load({id:${JSON.stringify(bundleId)},factory:(require)=>{var module={exports:{}};var exports=module.exports;` },
    footer: { js: 'return module.exports;}});' },
  })
  console.log(`Built ${bundleId} browser module (DSH lazy-CJS factory)`)
}
