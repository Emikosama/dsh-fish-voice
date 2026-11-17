import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
const root = process.env.DSH_SOURCE_ROOT
if (!root) throw new Error('Set DSH_SOURCE_ROOT to the verified DSH source checkout')
const require = createRequire(root + '/package.json')
const { readFileSync } = await import('node:fs')
const config = require('typescript').readConfigFile(root + '/tsconfig.base.json', p => readFileSync(p,'utf8')).config
const alias=Object.entries(config.compilerOptions.paths).filter(([k])=>!k.includes('*')).map(([find, targets])=>({find,replacement:root+'/'+targets[0]}))
const { default: paths } = await import(pathToFileURL(require.resolve('vite-tsconfig-paths')))
const { standardDecoratorPlugin } = await import(root + '/vitest.shared.ts')
export default { resolve: { alias: [{ find: '@deepseek-ai/dsh-api-gateway/client', replacement: root + '/packages/api/gateway/src/client/index.ts' }, ...alias] }, root, plugins: [standardDecoratorPlugin(), paths({ projects: [root + '/tsconfig.base.json'] })], test: { include: [new URL('./output-gateway.spec.ts', import.meta.url).pathname], environment: 'node', testTimeout:10000 } }
