# DSH rc.3 兼容改动

2026-11-14。已完成接口适配、独立 Linux 副本测试与前端重建，没有升级任何现用宿主。Windows 新提交 CI、冻结运行包与真实设备验收不在此记录的通过范围内。

## 派工参数

官方 npm `@deepseek-ai/dsh-subagent@0.2.2-rc.1` 的服务与本地启动管理器从 `spec.request` 读取 `parent`、`prompt`、`agentOptions` 和 `maxDepth`。官方 `0.2.2-rc.3` 从外层 `spec` 读取同名字段。本次同时读取了两版正式 npm 包的 JavaScript；rc.3 官方源码与发布包在这些读取点一致。

默认 `voiceSession.subagentApiProfile` 改为 `compatible_v1`。它只调用一次 `startActivation`，外层字段与兼容 `request` 使用同一个父 Agent、提示内容数组和选定模型参数对象；深度仍为 1。`provider: spawn`、预留 `childId`、取消信号和 `delivery: parent` 仍由原激活路径提供。两版已核对的本地启动实现各读取自己使用的一份字段，不进行第二次派工。

旧设置里保存的 `published_rc1` 在读取时作为 `compatible_v1` 的别名，不改写配置文件。显式 `source_flat_v1` 仍保留为扁平调用。未知配置值继续拒绝。失败时保留已落盘任务，报告启动未完成；不更换形状、不自动重试、不声称后台已经启动。

任务后端、旧根恢复、权限、实际模型路由校验、消息、停止以及隐藏能力检查没有改变。兼容参数不能补出缺少的宿主服务，也不能代替隐藏展示或真实模型的验证。

## 已运行的检查与边界

`tests/test_voice_session.mjs` 覆盖默认值、旧配置别名、两种宿主读取形状、单次调用、失败不重试和显式扁平调用。正式 npm rc.1 与 rc.3 两条宿主集成线路分别通过 14 项，使用当前候选源码和真实 Loader、AgentLoop、Session、持久化、写锁与派工服务。模型回复与音频子进程为合成数据，没有使用用户密钥、现用配置、录音或真实模型。

```sh
npm test
python3 -m unittest discover -s tests -p 'test_*.py'
cd tests/host/published-rc3
npm ci --ignore-scripts
npm test
```

同时完成设置交互、一次协议、已配置服务直接保存、原生路径选择、撤销/取消/过期响应、浮窗 portal 与按帧拖动调度检查，并重新生成两份前端产物。真实 rc.3 renderer 源码参与装配测试，但交互运行在 jsdom 中；不能据此宣称桌面像素、Windows 层级或实际帧率已验收。额外无截图 Chromium 冒烟在创建浏览器前因执行环境 socket 权限失败，未计入通过。

物理麦克风、全局快捷键、实际扬声器、真实模型推理与 Windows 发行包仍需相应运行环境验证。未来发布必须对新提交运行 Windows CI，不能沿用旧 SHA 的绿灯。

## 核对来源

- [官方参数迁移说明](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.2-rc.3/docs/upgrade-guide/v0.2.1-rc.2/subagent-activation-options/guide.md)
- [rc.3 服务实现](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.2-rc.3/packages/subagent/subagent/src/index.ts)
- [正式 rc.1 包元数据](https://registry.npmjs.org/@deepseek-ai%2fdsh-subagent/0.2.2-rc.1)
- [正式 rc.3 包元数据](https://registry.npmjs.org/@deepseek-ai%2fdsh-subagent/0.2.2-rc.3)

未来版本若拒绝额外字段，需要按其明确契约再次适配；本次没有宣称任意未来宿主兼容。
