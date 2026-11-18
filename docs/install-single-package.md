> 0.5.14 Agent 接口及分层权限见 [说明](agent-controls-v0514.md)。升级要使用整套新目录或完整重启宿主，不能只热替换入口。

# 鱼应单包安装核心与界面

当前仓库版本对应的 `dsh-fish-voice-<version>.tgz` 是完整安装包，包含核心、Python 帮工、已构建的浏览器界面、窗内设置与首次引导、自动 bundle 注册和模型校验清单。不需要另装 `dsh-whale-ear-ui`，不需要本机编译 JSX，也不需要手写核心和界面的两份注册。

## 先拿到安装包

从仓库构建本地安装包时，在当前版本的仓库根目录运行：

```sh
npm pack --ignore-scripts
```

命令会在当前目录生成文件名带当前 `package.json` 版本的 `.tgz`。这一步只打包 `package.json` 配置包含的文件，不需 `npm install`、`pnpm install`、构建 UI、下载模型或运行安装脚本。需本机已有 Node/npm。

如果当前分支已设置跟踪分支，Windows PowerShell 可以先快进同步再打包：

```powershell
git pull --ff-only
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
$packed = npm pack --ignore-scripts --json | ConvertFrom-Json
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
(Resolve-Path -LiteralPath $packed[0].filename).Path
```

同步不能快进或本地修改冲突时停止，不自动覆盖、切分支或丢弃修改。成功后最后一行就是可复制到 DSH 的完整安装路径。

## 安装

1. 在 DSH 插件管理器的安装输入框填入这个 `.tgz` 在运行 DSH 的机器上的完整绝对路径。安装完成后点击宿主提供的「立即启用」。核心、界面和设置一起注册，不再手工改 YAML。当前宿主 GUI 刻意把安装与启用分成两步，插件包不能越过这个开关；单独运行 npm install 也不等于启用 bundle。
2. 安装完成后，鱼应面板和面板内的设置由同一个 bundle 提供。首次引导预选 Edge「晓伊」。点「启用在线朗读并继续」确认由微软合成朗读文字。Edge 运行组件随包提供。联网失败时，回答在鱼应面板显示文字。已有 Windows 系统语音配置按文字模式运行。本地 ASR 模型在设置中安装。当前会话状态与配置会自动读取。模型来源、固定文件及 SHA-256 见 [模型准备](model-setup.md)。安装包不含本地模型权重。已保存的本地模型、Edge 音色及不发声选择会继续使用。
3. 配置向导不需要先打开 DSH 对话。鱼应默认创建隐藏语音对话。没有原生隐藏接口时，鱼应在兼容的 DSH 会话侧栏和搜索中隐藏新语音根。「设置 → 会话管理」可分别取消隐藏或恢复归档。
4. 需要录音时，在鱼应悬浮窗点击「开麦」。启用插件会自动下载默认的本地 Whisper Base 模型和 WASM 运行时。可在「设置 → 模型 → 模型下载」查看进度和重试。装有 Microsoft Visual C++ v14 运行库的 Windows x64 另外准备原生 CPU 加速文件。朗读配置可先试听当前选择，再保存。DeepSeek 语音合成复用 DSH 中的 DEEPSEEK_API_KEY 开放平台凭据，选用后向 DeepSeek 发送朗读文本。下载期间可以使用文字。开麦时才会启动识别及录音，旧录音授权不会恢复。

包内 helper 自动按安装位置解析，不要求填写绝对路径。包模式始终使用本包配套 Python 文件；已有 config 中的旧 helperPath 保留给回退，但不会让新 Node 调旧 Python。ASR 路径、用户选择、语音目录及数据保留。

语音识别所需的 Python 和录音依赖由现有环境提供。Edge 朗读组件由包内 Node 工作进程运行。安装包不会改系统 Python、下载运行时、安装音频驱动或接受模型条款。它也不会自动修改宿主 app.asar 来提供隐藏能力。

## 从已安装的同名包升级

1. 先关麦并确认语音任务已停止，保留当前安装包，以及 profile 和 `whale-ear` 配置目录的备份。升级会停止旧插件，不能承诺保留运行中的任务。
2. 如果管理器返回 `already-installed`，按宿主升级流程先移除 `dsh-fish-voice` bundle，再安装当前版本的 `.tgz` 并启用。不要删除配置、模型或语音历史目录。即使版本号不同，HMR 也可能要求先移除；反复点击安装不会解决。
3. 核对管理器版本与 `voice_status` 报告的版本均与包的 `package.json` 一致，确认激活成功；仅安装成功或文件名变化不证明正在运行新代码。若宿主要求重启，完整重启后再核对。

宿主行为依据：[固定版本升级说明](https://github.com/deepseek-ai/deepseek-harness/blob/fcc0ad462172522aaf5c93a7b2e01f6b9f0b0159/docs/upgrade-guide/v0.2.1-alpha.2/plugin-install-over-installed/guide.zh.md)。这不是本轮 Windows 实机升级通过声明。

## 组件缺失时的完整包恢复

先关闭语音并保存一份当前 DSH profile 和 `DSH_HOME/whale-ear` 的备份。保留 `config.json`、模型目录、声纹、会话存储和日志。通过 DSH 插件管理器移除损坏的鱼应 bundle，安装同一发行线的完整包并启用，然后重启 DSH。核对 `voice_status` 的版本，打开鱼应设置确认原有选择，再测试麦克风和朗读。

若故障发生在鱼应界面加载前，从 DSH 的插件管理器和宿主日志开始排查。完整包可恢复随包发布的组件，外置 Python、驱动和模型需按各自提示检查。JSON 内容损坏时可用已知配置备份恢复原文件。重装包保留现有用户数据，不会替换损坏的配置。

## 从旧包名升级

从 `dsh-whale-voice` 或 `dsh-whale-ear` 升级时，先关闭语音并备份 profile 和 `whale-ear` 配置目录。停用旧 bundle、手工 file URL 核心及独立 `dsh-whale-ear-ui`，再安装并启用 `dsh-fish-voice`，完整重启 DSH。鱼应继续使用原有配置、模型和语音会话。详细检查与回退见 [包名迁移](package-name-migration.md)。

## 从 0.5.11 激活失败升级

本包将 Zod 校验器构建进 ui/conversation-contract.mjs，不需要插件内 node_modules/zod，也不依赖 pnpm 提升。整体安装并完整重启宿主，不要只拷入口；不要求删除 profile 根的 Zod 或其他插件依赖。

确认管理器已激活、日志中的启动版本与包一致、工具及 voice_status 可调用，而不只是安装退出码 0。隔离包导入和桌面式解析限制的官方 Loader 回归通过。见 [根因与边界](activation-v0512.md)。

## 从 0.5.3 失败安装升级

0.5.4 统一直接使用宿主 ToolsService 的原始 ToolDefinition 契约，修复安装位置改变时误用 defineTool 参数 DSL 的问题。先关闭语音并停用手工回退版本，再从插件管理器安装当前版本的包、启用并完整重启宿主；不要只替换入口文件。检查日志启动版本与包一致、工具注册成功，再调用 `voice_status`（只查任务可传 `scope: tasks`，不会启动音频帮工）。若安装/启用仍失败，停用新包后恢复备份注册，不同时开两份核心。

## 从旧手工版本升级

先关闭语音，备份 profile 和配置，停用原来 `file:///.../index-v052.mjs` 的手工注册及独立 `dsh-whale-ear-ui` bundle，再从插件管理器装这个单包并完整重启宿主。只保留 `dsh-fish-voice` 一份 bundle 注册，避免重复核心/浮条。不要同时留旧 file URL 和新包运行。此说明不会自动改动用户 profile 或删除历史。

回退时先停用新 bundle，再恢复备份注册；旧 helperPath 与模型文件没有被删除或重写。不要跨版本仅拷入口文件。

## 构建与检查

发布包已含 `lib/client.js`。开发者可从固定 DSH checkout 复用构建依赖：

```sh
npm install --ignore-scripts --package-lock=false
DSH_SOURCE_ROOT=/path/to/deepseek-harness npm run build
npm test
DSH_SOURCE_ROOT=/path/to/deepseek-harness WHALE_SINGLE_PACKAGE=1 node --test ui/tests/assembled.test.mjs
npm pack --ignore-scripts
```

包内 Edge 组件使用固定版本的 `node-edge-tts`，依赖与许可证记录在 `vendor/edge-tts.NOTICES.txt`。更新该组件时，用 `node scripts/build-edge-tts-vendor.mjs` 按固定包完整性重新构建。常规安装或打包使用已构建的组件。

`tests/test_single_package.mjs` 检查清单、浏览器模块 ID、包内容和没有模型/用户数据；`tests/host/published-rc1/single-package.spec.mjs` 将真实 npm 压缩包解包到临时 node_modules，以官方已发布 Loader 加上插件范围内的桌面式 Zod 解析限制，验证核心+命令适配一体挂载、10 个工具在真实注册表中存在且通过宿主 schema 检查、原生执行器调用 voice_status、停用后清理与重载后再次可调用、默认不启动帮工及旧设置保留。测试命令服务是生命周期替身，不把它当真实桌面插件管理器点击安装验收。

插件管理器安装/启用和浏览器发现协议已核对固定宿主源码；完整 Windows 安装入口、实际麦克风/扬声器、Python 依赖和模型推理仍需本机验收。离线/模拟测试不代表真实设备或端到端延迟通过。

## 协议升级注意

本版命令与响应使用 `whale-request/1` 关联协议。必须整体安装同版入口和包内 helper；旧自定义 helper 不支持此协议时会明确拒绝，不回退到按顺序匹配请求。修复与尚未完成的 UI/TTS 边界见 [问题复核](issue-review-2026-11-11.md)。


ui/src/conversation-contract.mjs 是唯一校验定义源码。构建先生成宿主自包含 ESM，再生成浏览器模块。Zod 4.6.7 只在构建时需要，MIT 声明随包提供。修改协议必须重建，CI 检查宿主产物同步。单包测试另含无依赖目录中禁止裸导入后仍可加载的独立进程断言。
