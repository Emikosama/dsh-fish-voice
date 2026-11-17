# 鲸语包名迁移：dsh-whale-voice 0.5.5

正式包名由 `dsh-whale-ear` 改为 `dsh-whale-voice`，中文仍为「鲸语」。本次只提交开发分支源码和预构建界面，没有发布 npm、创建 GitHub Release 或改动用户当前安装。GitHub 仓库地址仍是 `Emikosama/dsh-whale-ear`。

## 改了什么

- 根包、bundle 名称、客户端模块 ID、插件设置页键和打开设置的目标统一为 `dsh-whale-voice`。
- `npm pack --ignore-scripts` 生成 `dsh-whale-voice-0.5.5.tgz`，无需安装开发依赖或编译 JSX。
- 根 `cordis.patch.yml` 的模块 `name` 改为 `dsh-whale-voice`；激活行 `id: dsh-whale-ear` 有意保留，以兼容按 ID 指向该行的 profile 配置。行 ID 不等于包名。
- 当前入口与 `index-v055.mjs` 一致。历史版本入口及验收记录保持原样，不能把历史入口与新模块混搭。

## 保留什么

- `$DSH_HOME/whale-ear/`（默认 `~/.dsh/whale-ear/`）中的 `config.json`、`voiceprints.json`、日志及本地模型目录原位保留，不移动或改名。
- 旧配置字段、本地模型路径、设备设置与语音会话存储名称不变。原生存储域 `whale_voice_identity`、`whale_voice_catalog` 和每根任务域继续使用原有数据；这不是把不兼容的旧任务后端自动迁移到新后端。
- 核心内部名称 `dsh-whale-ear`、`globalThis.__dshWhaleEar__`、`whaleVoiceSession` 服务、`/whale-ear-ui` 命令、UI locale/slot 键及旧来源标签保留。历史独立 UI 包仍叫 `dsh-whale-ear-ui`，只为兼容保留，不要与新单包同时启用。
- 包模式继续强制使用包内同版 Python helper，旧 `helperPath` 值保留给回退。安装与启用不恢复录音授权，不启动 Python、麦克风、侧键监听或模型。

## 从旧名字升级

新旧包名是两个不同的安装身份。安装 `dsh-whale-voice` **不会**自动卸载或停用 `dsh-whale-ear`，也不会创建旧包名的导入别名。

1. 关闭语音并保存工作。备份 profile 的 `cordis.patch.yml`、旧插件完整目录和 `whale-ear` 配置；备份只留本机，不上传录音、声纹或凭证。
2. 停用旧 `dsh-whale-ear` bundle、旧手工 file URL 核心和独立 `dsh-whale-ear-ui`。不要同时运行新旧 bundle；保留旧目录和安装包用于回退即可。
3. 从本仓库 `work/voice-latency` 分支安全同步，在根目录运行 `npm pack --ignore-scripts`。同步冲突时停止，由本地 Agent 合并现有工作，不覆盖未提交内容。
4. 在 DSH 插件管理器安装生成的 `.tgz` 绝对路径，启用 **dsh-whale-voice**，完整重启宿主。普通安装不需要手写 YAML。
5. 若维护的是自定义 profile override：按 `id: dsh-whale-ear` 指向既有行的配置可继续沿用。若 override 带有 `name: dsh-whale-ear` 名称断言或单独定义该导入，则改为 `name: dsh-whale-voice`，保留原 config 值，不叠加第二条核心。旧名称仍解析旧包或报不存在，不会自动跳转到新包。
6. 核对日志 `start 0.5.5`、8 个语音工具注册成功、只有一份鲸语浮条；设置页应打开新包详情，旧模型路径与选择仍在。先执行 `voice_status` 的 `scope: tasks` 只读检查，不启动音频。需要录音时再在目标会话明确开启。

未打隐藏能力补丁的官方 rc.1 仍需显式选择工作区可见兼容模式。包名变更不改变这条限制，也不代表真实音频设备或端到端延迟已验收。

## 回退

关闭语音，停用 **dsh-whale-voice**，恢复备份的旧完整插件和对应 profile 注册，再完整重启；一次只启用一个版本。不删除新录音或历史，不将旧配置备份盲目覆盖到当前配置。旧 `helperPath` 与模型文件仍可使用。包名变更本身不迁移数据，不需要把目录再改回去。

## 验证范围

自动回归覆盖根包名、保留的激活行 ID、新客户端 factory/设置页/导航目标、历史独立 UI 身份、实际 npm tarball 内容，以及新安装目录通过官方发布版 Loader 读取旧配置、保留声纹文件、保持无音频授权、卸载和重载。测试只使用临时数据与假模型，不操作真实 profile。Windows 打包 CI 与完整 DSH 桌面安装/设备验收是不同层级，需分别核对。
