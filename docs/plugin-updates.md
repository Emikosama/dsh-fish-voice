# 鱼应版本更新

从 `0.5.39-rc.21` 起，鱼应在 DSH 启动后自动检查，随后每 6 小时检查。也可在「鱼应设置 → 高级 → 关于鱼应」手动检查。自动检查仅获取公开发行信息。点「一键更新」才会调用 DSH 的插件管理器安装当前公告对应的精确版本。安装前请结束正在进行的语音会话和朗读。安装回执若提示启用或重启，按回执操作后在「关于鱼应」查看实际运行版本。

从 npm 注册表安装的鱼应，在支持 `pluginManager.updateBundle` 的 DSH 中可一键更新。保留了同版官方 npm `.tgz` 原件的本地安装也可一键迁移到 npm，鱼应先校验本地原件，供安装失败时恢复。旧宿主、开发挂载及缺少可校验原件的用户可以在 DSH 的「插件」管理器按[单包升级指南](install-single-package.md)更新。第一次从 rc.20 及更早版本升级到支持内置更新的版本也走宿主安装入口。鱼应继续使用原有的 `DSH_HOME/whale-ear` 配置、模型与历史存储。

## 维护者发布流程

1. 通过实际宿主的发行检查后，按项目流程将精确版本发布到官方 npm，在 `Emikosama/dsh-fish-voice` 的 GitHub Release 公布同版本 `v<version>` 标签。保留供回退的旧 npm 精确版本。核对下载包及主机生效版本。候选构建和未审核公告留在本地或草稿。
2. 从 `https://registry.npmjs.org/dsh-fish-voice/<version>` 读取实际 `dist.integrity`，核对它对应已验收的归档。确认实际支持的平台、架构和 DSH 版本。经维护者批准后才为该版本向默认分支的 [更新目录](https://github.com/Emikosama/dsh-fish-voice/blob/main/updates.json) 添加条目。目录收录同时代表该版本与对应文本均已审核。初次接入随源码提供空目录，无批准条目时没有更新公告。
3. 从完整发行包实际装载后验证检查结果。确认「高级 → 关于鱼应」显示正确公告，当前或更高版本不会收到降级提示。已安装预发布版会接收比它更高的已审核预发布版或正式版。正式版接收正式版。撤下更新时，从目录移除相应条目。每次安装前重新核对目录与 npm。

每条记录的字段如下。版本、完整性及兼容性值使用该次发布实际验收结果，支持范围可以按版本变更。

| 字段 | 要求 |
| --- | --- |
| `version` | 精确 npm SemVer 同时对应 GitHub Release 标签 `v<version>`。 |
| `channel` | 含预发布段时为 `preview`，正式版本为 `stable`。 |
| `integrity` | 官方 npm 精确版本的 `dist.integrity`，格式为 `sha512-…`。 |
| `dsh` | 实际验证的 DSH SemVer 范围，按宿主规则计算预发布。 |
| `platforms` | 此发行支持的 Node 平台列表，用 `process.platform` 命名。 |
| `architectures` | 此发行支持的 Node 架构列表，用 `process.arch` 命名。 |
| `announcement` | 经审核的纯文本简短公告，最多 600 个字符，完整详情在对应的 Release。 |

鱼应将审核目录与官方 npm 精确版本的包名、版本、下载地址和完整性对照，再核对平台、架构、`engines.node`、DSH 兼容要求和 npm 弃用状态。已公布的目录允许保留最多 64 个仍支持更新的版本。候选按版本从新到旧选取，支持同一发行线的不同环境。

包通过 DSH 官方插件管理器更新。鱼应从固定官方源读取版本信息，将 npm 官方源交给 DSH 作为首选安装源。DSH 负责其安装源、回退源、包管理器完整性校验、旧版本恢复和启用结果。带 HMR 的宿主可在安装时重新挂载鱼应，界面在重新连接后显示正在运行的版本。

实现依据为 [DSH 插件管理器](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/boot/plugin-manager)、[npm node-semver](https://github.com/npm/node-semver) 和本机 DSH 0.2.2-rc.3 的实际 `app.asar` 接口。重新生成内置 node-semver 文件时，先以锁文件安装构建依赖，再从根目录执行 `node scripts/build-update-semver.mjs`。
