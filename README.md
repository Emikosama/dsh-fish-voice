# 鱼应

鱼应是由 [Emikosama](https://github.com/Emikosama) 开发的第三方 DeepSeek Harness（DSH）语音插件。「鱼应」谐音「语音」。默认使用独立的语音会话。rc.21 起也可绑定已有 DSH 会话，接着那段聊天讲话。

[鱼应官方仓库](https://github.com/Emikosama/dsh-fish-voice) · [鱼应 npm 发布页](https://www.npmjs.com/package/dsh-fish-voice) · [反馈问题](https://github.com/Emikosama/dsh-fish-voice/issues)

npm 发布账号为 `emikow`。从 rc.20 起，可在「鱼应设置 → 高级 → 关于鱼应」核对作者及官方渠道。

## 在 DSH 安装

在 Windows 版 DSH 的侧栏打开「插件」。在安装框填入下面的 npm 包和版本，安装完成后点「立即启用」。

```text
dsh-fish-voice@0.5.39-rc.19
```

已安装 `dsh-whale-voice` 的用户，请先关麦并停用旧包，再安装鱼应。原有配置、模型和会话可继续使用。详见 [包名迁移](docs/package-name-migration.md) 和 [单包安装指南](docs/install-single-package.md)。

## 首次使用

1. 打开鱼应悬浮窗，阅读使用协议并完成授权。向导里选择说话方式和朗读方式。
2. 默认识别模型 **Whisper Base** 会自动下载，基础文件约 110 MB。适配的 Windows x64 机器还会准备约 31 MB 的 CPU 加速组件。基础文件就绪即可离线识别，在「设置 → 模型 → 模型下载」可分别查看进度。
3. 在 rc.21 的首页点击「开始对话」（早期版本为「开麦」）。在空白首页也可以开始。模型可沿用当前 DSH 对话或 DSH 默认模型，也可以在「鱼应设置 → 模型 → 对话模型」指定。

## 日常操作

| 想做什么 | 操作 |
| --- | --- |
| 按键说话 | 在「设置 → 交互」录入按键。对话中点「按键说话」，按住录音，松开提交；松键后可以继续等后台工作。 |
| 自由麦 | 对话中点「自由麦」，直接讲话。首页三个说话方式可以随时切换。 |
| 唤醒词 | 点「唤醒词」，叫称呼后接指令，或单独叫名字再说下一句。首次准备声学组件时会使用已有的近音识别。详见[唤醒词说明](docs/phonetic-wake.md)。 |
| 在原聊天里接着讲 | 在「设置 → 会话管理 → 语音对话目标」点「选择已有会话」，按标题或 ID 找到目标，点「绑定选中会话」。回首页点「开始对话」后收音。 |
| 换会话 | 点击悬浮窗的「＋ 新会话」。在「设置 → 会话管理」可展开历史、重命名或恢复归档。 |
| 换声音 | 打开「设置 → 模型 → 朗读方式」，选择声音并试听。 |
| 结束本次对话 | 点击「结束对话」释放麦克风、停止朗读。使用独立语音会话时，其本轮后台工作一并结束。绑定已有会话时，原会话和它的工作可继续。 |
| 检查更新 | rc.21 起会自动检查适配本机的版本。收到更新提醒后可阅读简短公告，点击「一键更新」或「稍后」。也可从设置的高级页查看。[内置更新说明](docs/plugin-updates.md) |

默认在线朗读声音为 Edge「晓伊」。启用后，朗读文字会发送给微软。断网或无可用音频输出时保留文字回复。也可以选「不发声」或配置本地朗读。录音在本机转写，识别出的文字作为指令交给所选 DSH 对话模型。

绑定只使用当前 DSH 实例可访问的原生会话。转写以用户消息写入选中的会话，原来的 Agent 读取原上下文并将回答写回同一段历史。首页「打开原会话」可查到两边的消息。长期记忆是否提炼这轮内容取决于该会话已有的记忆设置。鱼应只在本机播放回答；其他插件的转发由其设置决定。若需本地合成，可选本地音色。当前会话忙、归档或已失效时，请按提示处理后再说。结束对话后可在原设置页更换目标或解除绑定。

### 遇到问题

- 模型下载失败时，从「设置 → 模型 → 模型下载」查看原因并重试。
- 开麦前检查 Windows 麦克风权限、音频输入和 DSH 的模型配置。若鱼应提示缺少 Python，请安装 Python 3.11 后重启 DSH，再按界面提示检查运行环境。
- 反馈时请在本仓库的 [Issues](https://github.com/Emikosama/dsh-fish-voice/issues) 附上 DSH 版本、鱼应版本和复现步骤。
- 排查浮窗问题时，可在「设置 → 配置助手 → 排查与反馈」查看或保存最近七天的本机操作日志（`.log`），自行决定是否附在反馈中。

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

鱼应以 [Apache-2.0](LICENSE) 许可发布。随包分发的组件带有各自的许可证和声明，例如 [Edge TTS](vendor/edge-tts.NOTICES.txt)、[Zod](ui/conversation-contract.LICENSE) 和 [唤醒词词典](helper/wake_pinyin.LICENSE)。`ui/package.json` 是复现旧独立 UI 构建用的历史子包清单。
