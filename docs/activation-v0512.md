## 0.5.12：单包激活与 Zod 隔离解析

对应 issue #8，基于 399c970e30e6f14c8546cf8b3ab1159d82a17410 核查。

### 根因与报告核对

0.5.11 安装记录显示 pnpm 成功，但桌面 0.2.2-rc.1 激活时读取插件目录内 node_modules/zod/index.js。Zod 只在 profile 上层存在，模块导入失败，整个 bundle 的 apply 无法开始，9 个工具均未注册。

当前静态路径是 bundle.mjs → ui/conversation-remote.mjs → ui/conversation-contract.mjs → zod。voice-ui-bridge.mjs 本身没有导入 Zod。a73c9ed（0.5.8）的源码已包含同一路径，因此“0.5.11 首次在 Node 侧导入 Zod”不是准确的版本归因。

旧测试已检查工具与 voice_status，但标准 Node 会向上找到测试环境的 Zod，掩盖桌面包内解析限制。本次确认旧测试通过后，加入只对安装包生效的解析限制，原版因整包未激活失败；修复后同一测试通过。

### 修复

- 未放宽的 schema 定义移到 ui/src/conversation-contract.mjs，仍使用固定 Zod 4.4.3。
- 构建生成自包含 ui/conversation-contract.mjs，将真正的 Zod 实现一起打入 ESM。构建元数据不允许外部导入，不要求包内 node_modules 或依赖提升。
- Zod 改为开发依赖，MIT 声明以 ui/conversation-contract.LICENSE 随包提供。没有吞掉校验错误或使用恒成功替身。
- 浏览器从同一份源码构建；源码和生成产物全部提交，CI 重建检查宿主产物同步。
- npm pack --ignore-scripts 仍只打包已提交文件，用户不需先安装构建依赖、执行安装脚本或创建 junction。

### 回归与验证边界

Linux / Node 24.22.1 本地验证：344 个 Node、82 个 Python、8 个已发布 rc.1 集成、129 个 UI/桥接及 2 个真实 Host/Client Gateway 用例通过。

新增真实压缩包的独立进程导入回归：无依赖目录中禁止所有非 Node 内建裸导入，包仍能加载；音量范围及未知字段仍被严格拒绝，导入不启动音频。官方 Loader 回归施加包内 Zod 解析限制，检查 9 个工具、原生执行器调用 voice_status、停用清理、重载、默认不启动帮工和旧配置保留。

Windows CI 包含新增独立压缩包回归和带空格路径；远端结果以对应提交 Actions 为准。本次没有修改用户在用 profile、重装桌面插件或使用麦克风，不代表 Windows 真机安装、模型推理、扬声器或端到端延迟验收。issue #8 保留等待桌面复验。

### 当前变通与升级

旧 junction 仅使旧包找到上层 Zod，下次安装可能丢失。0.5.12 不需要它，也不要求删除 profile 根的 Zod（可能由其他插件使用）。

先关闭语音并保存工作，整体安装 dsh-whale-voice-0.5.12.tgz、启用并完整重启宿主，避免旧 ESM 缓存。确认管理器已激活、日志 start 0.5.12、9 个工具和 voice_status 可用。已有配置、模型、声纹、语音历史保留；失败按单包文档回退。
