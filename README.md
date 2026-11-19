# 鱼应

鱼应是由 [Emikosama](https://github.com/Emikosama) 开发的第三方 DeepSeek Harness（DSH）语音插件。「鱼应」谐音「语音」。默认使用独立的语音会话。rc.21 起也可绑定已有 DSH 会话，接着那段聊天讲话。

[鱼应官方仓库](https://github.com/Emikosama/dsh-fish-voice) · [鱼应 npm 发布页](https://www.npmjs.com/package/dsh-fish-voice) · [反馈问题](https://github.com/Emikosama/dsh-fish-voice/issues)

npm 发布账号为 `emikow`。从 rc.20 起，可在「鱼应设置 → 高级 → 关于鱼应」核对作者及官方渠道。

## 在 DSH 安装

Windows 用户可从 [RC32 GitHub 发布页](https://github.com/Emikosama/dsh-fish-voice/releases/tag/v0.5.39-rc.32) 下载安装包，在 DSH 侧栏的「插件」面板选择本地文件安装并启用。RC32 已在 Windows x64 的 DSH 0.2.2-rc.5 上完成隔离验收。

从 npm 安装时，请在 DSH 安装框填写 [npm 已发布列表](https://www.npmjs.com/package/dsh-fish-voice?activeTab=versions) 中显示的精确版本。升级后完整退出并重新打开 DSH，再到「鱼应设置 → 高级 → 关于鱼应」核对运行版本。

已安装旧名称 `dsh-whale-voice` 的用户，请先结束语音并停用旧包，再安装鱼应。已有设置、模型和会话继续使用。[包名迁移](docs/package-name-migration.md) · [单包安装指南](docs/install-single-package.md)

## 首次使用

1. 打开鱼应悬浮窗，阅读使用协议并完成授权。选择说话方式后，可在朗读步骤试听 Windows 系统音色，或配置自定义 TTS 并试听。
2. 从 rc.25 起，鱼应用 **SenseVoice INT8** 在本机 CPU 上转写。默认模型约 240 MB，启用后自动准备。在「设置 → 模型 → 模型下载」可以查看进度和重试。鱼应按环境选择 Python 原生识别或本机托管，两种方式使用同一份模型，准备好后即可离线识别。
3. 在首页点击「开始对话」（早期版本为「开麦」）。空白首页也可以开始。对话模型可沿用当前 DSH 对话或 DSH 默认模型，也可以在「鱼应设置 → 模型 → 对话模型」指定。

升级后鱼应自动使用 SenseVoice，已有模型文件和其他设置会保留。普通话语音转写统一用简体字，模型仍可能听错词。已有可用的本地 SenseVoice 可在「设置 → 模型 → 高级路径」指定目录。

## 日常操作

| 想做什么 | 操作 |
| --- | --- |
| 按键说话 | 在「设置 → 交互」录入实体键或选择鼠标侧键，点「保存按键」。中文输入法也可录入。对话中点「按键说话」，按住录音，松开提交；松键后可以继续等后台工作。 |
| 自由麦 | 对话中点「自由麦」，直接讲话。短暂停顿时可提前转写，接着说会合在同一句里。说完后，浮窗字幕显示投递状态和会话标题。 |
| 唤醒词 | 点「唤醒词」，叫称呼后接指令，或单独叫名字再说下一句。首次准备声学组件时会使用已有的近音识别。详见[唤醒词说明](docs/phonetic-wake.md)。 |
| 选投递会话 | rc.24 起，点首页「投递到」可展开会话列表。点「使用当前打开会话」可选用右侧标题对应的对话，再点「回到鱼应」恢复独立语音会话。切换 DSH 标签页会保留已选目标。 |
| 原会话忙时补发 | 绑定会话忙时，浮窗会保留该句原文和目标。等目标空闲，点字幕旁的「重发」发送到原会话。结束语音或撤销授权会清空暂存。 |
| 换会话 | 点击悬浮窗的「＋ 新会话」。在「设置 → 会话管理」可展开历史、重命名或恢复归档。 |
| 换声音 | 打开「设置 → 模型 → 朗读方式」，选择声音并试听。 |
| 结束本次对话 | 点击「结束对话」释放麦克风、停止朗读。使用独立语音会话时，其本轮后台工作一并结束。绑定已有会话时，原会话和它的工作可继续。 |
| 检查更新 | rc.21 起会自动检查适配本机的版本。收到更新提醒后可阅读简短公告，点击「一键更新」或「稍后」。也可从设置的高级页查看。[内置更新说明](docs/plugin-updates.md) |

默认使用 Windows 已安装的系统音色。首次引导和「设置 → 模型 → 朗读方式」都可以选音色并试听，无须先下载鱼应朗读模型或等语音识别准备完成。DeepSeek 官方朗读可在引导或设置中单独选用，须配置官方 API Key，并确认将朗读文字发送给 DeepSeek。既有明确启用的 DeepSeek、已选本地模型、自定义 TTS 和不发声配置继续使用。录音在本机转写，识别出的文字作为指令交给所选 DSH 对话模型。

已允许朗读时，如果独立语音会话完成一轮语音回复、只给出了文字且没有尝试朗读，鱼应会在这一轮结束后提醒模型一次。是否调用朗读仍由模型决定。

绑定只使用当前 DSH 实例可访问的原生会话。转写以用户消息写入选中的会话，原来的 Agent 读取原上下文并将回答写回同一段历史。首页「打开原会话」可查到两边的消息。长期记忆是否提炼这轮内容取决于该会话已有的记忆设置。鱼应只在本机播放回答；其他插件的转发由其设置决定。若需本地合成，可选本地音色。当前会话忙、归档或已失效时，请按提示处理后再说。结束对话后可在原设置页更换目标或解除绑定。

### 自定义 TTS

在首次引导的朗读步骤或「设置 → 模型 → 朗读方式」选「自定义 TTS」。填写运行 DSH 的电脑能访问的 OpenAI 兼容服务地址、模型和音色，选择 WAV 或 MP3。比如本机 Kokoro-FastAPI 的服务地址可填 `http://127.0.0.1:8880/v1`，模型填 `kokoro`，音色填写服务支持的 ID。也可以粘贴以 `/audio/speech` 结尾的完整接口地址。

服务需要密钥时，在启动 DSH 的环境中设置密钥，并在鱼应填环境变量名。本机服务允许 HTTP，其他地址使用 HTTPS。确认将朗读文字发送给所填服务，保存后点击「试听已保存配置」。试听只发送固定示例，语音由鱼应已有的 Windows 播放器播到所选输出设备。更换配置时请确认服务接收方。

### 遇到问题

- 模型下载失败时，从「设置 → 模型 → 模型下载」查看原因并重试。
- 开麦前检查 Windows 麦克风权限、音频输入和 DSH 的模型配置。若鱼应提示缺少 Python，请安装 Python 3.11 后重启 DSH，再按界面提示检查运行环境。
- 反馈时请在本仓库的 [Issues](https://github.com/Emikosama/dsh-fish-voice/issues) 附上 DSH 版本、鱼应版本和复现步骤。
- 排查浮窗问题时，可在「设置 → 高级 → 排查与反馈」查看或保存最近七天的本机操作日志（`.log`），自行决定是否附在反馈中。

## 构建源码

源码根目录包含预构建文件，运行 `npm pack --ignore-scripts` 即可打包。重新构建需要 Node.js `24.9` 或更新版本。

```sh
npm ci --ignore-scripts
npm ci --prefix ui --ignore-scripts
npm run build
npm run test:package
npm pack --ignore-scripts
```

生成的 `.tgz` 可以用 [DSH 单包安装方式](docs/install-single-package.md) 安装。模型与第三方运行时来源见 [模型准备](docs/model-setup.md)。

## 首发记录

2026 年 11 月 18 日，项目在 [Git 提交 `240517a`](https://github.com/Emikosama/dsh-fish-voice/commit/240517ac62db7b6ed3646b883be88fc51e966e51) 中采用「鱼应」名称。同日发布 [npm `dsh-fish-voice@0.5.39-rc.19`](https://www.npmjs.com/package/dsh-fish-voice/v/0.5.39-rc.19)。版本包和校验值见 [GitHub 首发存档](https://github.com/Emikosama/dsh-fish-voice/releases/tag/v0.5.39-rc.19)。

## 许可证

鱼应以 [Apache-2.0](LICENSE) 许可发布。第三方组件各有许可声明，SenseVoice 模型和运行时适用各自的条款。[模型来源与许可](docs/model-setup.md)

包内附 [Zod](ui/conversation-contract.LICENSE)、[唤醒词词典](helper/wake_pinyin.LICENSE) 和 [转写简体字词表](helper/asr_zh_dictionary.NOTICES) 的声明。`ui/package.json` 是复现旧独立 UI 构建用的历史子包清单。
