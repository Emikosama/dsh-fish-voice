# 鱼应界面源码

悬浮窗和设置页的源码在 `src/`，从项目根目录运行构建即可生成浏览器包。正式用户入口为 `dsh-fish-voice` 单包。[安装指南](../docs/install-single-package.md)

以下记录历史独立 UI 的实现。该子包供旧版兼容。

## 实际扩展方式

- `shell.overlay`：正式可叠加悬浮层，跨工作区导航保留，不替换侧栏或聊天组件。
- 0.5.9 不再注册 `plugins.bundle.config`，也不依赖 `pluginNavigation`；设置按钮仅切换原浮窗内的内容。
- 注册两个内部 `session-maybe` slot，由 DSH renderer 提供操作时的准确 Session 身份。改变前台会话不会改变麦克风授权；旧状态及旧目录不被当成新会话的授权。
- browser half 通过 `package.json` 中的 `dsh.client`、`./client` 和 bare package Loader row 加载；`lib/client.js` 是 DSH 的 `window.__ModuleLoader__.load({id,factory})` 格式，React 与 UI primitives 使用宿主共享模块。
- 必须把该包安装为 profile 可解析的依赖，再启用其 bundle。原有 `file:///.../index-v051.mjs` 仍是主插件，但不会自动发现这一个 browser half。不要只复制 JSX 或给主插件路径追加 `/client`。
- 本包需要提供完整 `whaleVoiceSession` UI bridge 的新主插件。界面与主插件均需在同一宿主中启用。没有服务时 Cordis 保持等待，不创建假状态。

## 控件与权限

初次打开只显示未读取状态，不启动音频或模型。刷新读取主插件缓存。开启、关闭、常听切换、新建和接续都通过正式 `/whale-ear-ui` human command；DSH 给出真实 `invocation.agent`，bridge 再调用 core 的 exact-live 身份校验。界面不会伪造 `exec.agent`，也不会通过写配置授予语音权限。该固定 DSH 版本的 `CommandInvocation` 没有 `source` 字段；执行器在 `command/run` 中记录 `source.kind=user`。本包不注册模型工具，也不接受请求中自带的 `source`、`agent`、`sessionId` 或权限字段。可信宿主代码和 SDK 本来可以程序调用该执行器，因此日志标签不是不可伪造的人类手势证明。

控制条只保留状态、授权来源/操作会话、开启或关闭、刷新与设置入口。长 ID 默认缩写，可展开完整标识。非交互背景仅鼠标拖动，方向键/Home/End不移动位置；Escape关闭菜单或返回。收起不是关闭语音。收起后的按钮同样可直接用鼠标拖动，拖拽不会误展开；点击或 Enter/Space 才展开。关闭或切换语音可能结束该语音根的后台任务，界面明确告知。

同一浮窗的设置视图分区管理：

- 输入设备、鼠标侧键 PTT、实验性声纹过滤。
- 显式常听/按住说话按钮，只有本会话已经获得语音权限、状态已确认、core 支持该 hook 时可用。常听按钮明确说明麦克风持续开启。普通保存不写 `listenMode`。
- 轮次提示音开关、音量、明确耳机确认、实验性自动打断。使用 `turnSignals` 的真实四字段；core 未接入时禁用，不伪装播放。未确认耳机不能开启实验自动打断。提示音不是 AEC，也不裁剪用户人声。
- ASR 及 SenseVoice/Whisper/CAM++ 本地路径。独立「保存模型路径」只写白名单，不下载、执行或加载模型。所选 ASR 必须为本地目录，不能以网络地址/在线模型名触发下载；路径保存不等于文件已验证或模型 ready。CAM++ 可选，填路径不自动开启声纹过滤。外部 TTS 不在本插件伪造配置。准备与来源说明见主插件 `docs/model-setup.md`。
- 仅插件确证的语音聊天目录，手动新建或按具体 root ID 接续，支持分页。归档、权限不足、不可用或正在别处运行的条目不能被 UI 强行接续；不自动取消归档或选择列表首项。

状态是最后一次显式读取的快照，不是实时麦克风/VAD灯。没有宿主事件通道时不通过轮询 human command 刷写会话日志。停止播放的 `requested` 与 `confirmed` 显示为不同状态，不能把已发取消请求当作已经停声。真实播音开始事件未接入时会明确显示不可确认，不将转写投递或原生 speak 请求当成已经出声。

## 后端与持久化

主插件 `voice-ui-bridge.mjs` 暴露缓存状态、白名单 CAS 设置、模型路径保存和目录适配。准确接口在 `src/contracts.d.ts`；core constructor hooks 为 `configPath`、`readEffectiveConfig`、`readStatus`、同步 `assertCaller`、原有 `sessionControl`、`setListenMode`、`listVoiceSessions(agent,options,signal)`、`newVoiceSession(agent,signal)`、`resumeVoiceSession(agent,id,signal)`，以及明确的 `turnSignalsSupported` 标记。

配置读取失败或 JSON 无效会报告错误，不把损坏文件当作默认值覆盖。保存验证读取时的 revision，重新读取原始配置后只合并所需白名单字段，保留权限、路由和其他字段；临时文件 flush 后原子 rename，失败不会被吞掉。并发同 revision 只允许首个保存。该保证适用于同进程及已可观察的外部变更，不宣称对不遵守协议的外部编辑器有 OS 级事务锁。

请求进行中全部变更按钮禁用，捕获点击时的会话 ID。未知写结果不自动重试，保留原状态、错误及表单草稿，需刷新确认。卸载移除 slot、样式、观察者和订阅。

## 构建与检查

在独立包安装其开发依赖后可运行 `npm run build`、`npm test`。本次云端复用固定 DSH checkout 的已安装构建依赖，没有改用户桌面或安装模型：

```sh
DSH_SOURCE_ROOT=/path/to/dsh-source node ui/scripts/build.mjs
DSH_SOURCE_ROOT=/path/to/dsh-source node --test ui/tests/*.test.mjs tests/test_voice_ui_bridge.mjs
DSH_SOURCE_ROOT=/path/to/dsh-source node ui/tests/browser.mjs
```

`DSH_SOURCE_ROOT` 对应 DSH commit `fcc0ad462172522aaf5c93a7b2e01f6b9f0b0159`。打包路径不修改其源码或现有隐藏会话补丁。`ui/tests/host-commands.spec.ts` 可复制到 DSH `packages/interaction/commands/tests/whale-ear-ui-bridge.spec.ts`，同时把 `ui/host.mjs` 复制到邻近 `fixtures/whale-ear-ui-host.mjs`，通过该仓库 Vitest 运行原生 CommandRuntime/SessionStore 适配验证。

`assembled.test.mjs` 使用生产 browser bundle、真实 DSH Cordis/SlotRegistry/renderer/UI primitives，传输、Session source 与 locale 使用显式 fixture。覆盖授权身份、焦点切换、重复点击、键盘、收起重开、设置分离、语音历史分页/归档保护、错误、模型/音效控件及 HMR 卸载。几何尺寸在 jsdom 中模拟，因此这不等于视觉或浏览器拖拽验收。

`browser.mjs` 保留可复跑的 Chromium 测试，涵盖拖拽边界、resize、窄窗/长标识、深浅色、键盘、关闭重开、返回聊天、重复点击、错误与卸载。本开发云环境的 Chromium 受到 Unix socket 限制，云 browser 也无法访问该隔离环境的 localhost。随后 GitHub Actions run [43029122218](https://github.com/Emikosama/dsh-whale-ear/actions/runs/43029122218) 已对 bf9f66972337fa526eebe82cea48d219195f51cd 在 Ubuntu / Playwright 1.61.1 / Chromium 149.0.7827.55 上通过全部 28 项浏览器检查，生成三张截图及零 page error 报告。截图已实际查看：390px 窄窗内浮条与设置可读、未裁切，长标识和聊天名可换行。随后 run [43030588442](https://github.com/Emikosama/dsh-whale-ear/actions/runs/43030588442) 对 ca0031a990b38fb22cfdf25bef7ffbc390d70912 通过全部 32 项检查，确认深色来源链接使用 DSH 语义色、收起按钮可拖动及键盘移动，三张新截图也已实际查看。上述浏览器证据属于兼容模式功能加入之前的版本；0.5.2 新增能力展示与显式模式保存的 Chromium 检查和截图仍待最终提交触发 CI 后核验。该结果不是完整 DSH Web、Windows 桌面或真实设备验收。缩放、触控、真实包发现/安装、首次启用/停用和实际音频设备与音效仍需分别验证，不能由这些 keyless 测试代替。

### 无密钥浏览器 CI

使用 Node 24.9+、固定 DSH checkout 及其 `pnpm@11.28.5` frozen install。DSH 根依赖不包含 Playwright，因此可在独立临时目录安装官方 `playwright@1.61.1`，用其 CLI `install --with-deps chromium`，将 `WHALE_UI_BROWSER_MODULE_ROOT` 指向该目录后运行 `browser.mjs`。默认使用 Playwright 管理的 Chromium；只有明确提供 `CHROMIUM_PATH` 才使用另一个可执行文件。`WHALE_UI_EVIDENCE` 可指定截图目录，默认 `ui/test-results`。脚本非交互并在成功/失败时关闭浏览器及服务；仅手动设置 `WHALE_UI_SERVE_ONLY=1` 才保持服务运行。

证据仅来自合成 fixture：`panel-narrow-light.png`、`panel-narrow-dark.png`、`settings-narrow-dark.png` 和 `browser-report.json`，失败时尝试保存 `failure.png`。即便此 CI 通过，也不代表完整 DSH Web/桌面或真实设备验收。

## 0.5.2：能力状态与显式工作区可见兼容模式

设置页读取 `voiceCapabilities`，分别显示宿主隐藏能力、工作区可见能力与持久交接后端。能力来自核心同步检查，读取不会开启 helper、麦克风、模型、授权或语音根。配置默认仍为 `hidden`；宿主缺少隐藏能力时拒绝启动，不会静默回退到可见聊天。浮条仍只提供简约状态和控制。

用户如选择「工作区可见兼容模式」，界面会明确说明该语音聊天会出现在普通工作区。流程是先独立关闭语音，再读取设置及刷新状态，再明确保存模式，最后另行点击新建或选择匹配历史。`set-visibility` 请求只允许 `revision` 和 `visibility`；桥接核验准确 live caller，并要求核心明确没有 enabled、owner、live/prepared voice root，且 `voiceControlBusy` 为 false（包括入队但尚未创建 root 的控制操作），之后才通过 CAS 原子写入 `voiceSession.visibility`。保存不会改授权、启动 helper、选择会话、迁移旧根、取消隐藏或改变规划路由。旧根的模式不匹配仍由核心拒绝。

设置快照保存其来源。切换操作会话后，旧快照不能直接执行模式写入。未知模式写入结果会锁住变更，必须先显式读取设置，再从同一来源刷新状态核实，不能重发原请求碰运气。普通音频设置保存不接受 visibility 字段。

### 已发布 rc.1 UI API 核验

本次额外读取了 npm 实际发布的 `@deepseek-ai/dsh-client-ui-renderer`、`ui-layout`、`ui-plugin-manager`、`ui-primitives`、`ui-slots` 与 `dsh-commands` 0.2.2-rc.1 包，确认上述正式扩展点及命令参数形状存在。npm 包没有可核验的 gitHead；相同版本字符串不能证明它等同固定源码提交，也不证明宿主具有 rootOf、Team 或隐藏会话扩展。

`build-fixture.mjs` 支持可选 `WHALE_UI_PUBLISHED_ROOT`（含解压后的 `dsh-client-ui-renderer/package` 和 `dsh-client-ui-slots/package`）与 `WHALE_UI_RUNTIME_ROOT`（安装官方 Cordis 4.1.0 的隔离 npm 环境）。此模式真实执行发布版 renderer、slots 和 Cordis，生产插件 bundle 不变；React 与 Button/Input/Checkbox 仍使用固定源码构建依赖与共享控件，Session/transport/locale 仍是合成 fixture。这项 jsdom 通过不等于整个已发布 rc.1 Web、桌面、模型或音频验收。

本轮本地验证：固定源码装配与 bridge 检查共 36/36 通过，切换到上述真实发布 renderer/slots/Cordis 的装配用例 1/1 通过，接口类型检查通过。两种装配均使用合成会话与传输，不能代替真实包发现、安装、完整宿主生命周期或设备验收；新模式界面的浏览器与视觉结果尚未包含在这些通过项中。


## 0.5.12 宿主校验器打包

src/conversation-contract.mjs 保留严格 Zod 源码。根目录安装构建依赖后，正常 build 先生成 conversation-contract.mjs 及 MIT 声明。宿主只导入自包含 ESM，浏览器从同一份源码构建。不要手改生成文件或给宿主恢复裸 Zod 导入。用户无需补 junction。详见 ../docs/activation-v0512.md。
