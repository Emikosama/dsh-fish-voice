# 鲸应

鲸应是 DeepSeek Harness（DSH）的语音插件。用悬浮窗开麦，让 Agent 听懂指令并朗读回复。语音会话有独立历史，默认隐藏，可在「会话管理」里打开。[DSH 官方仓库](https://github.com/deepseek-ai/deepseek-harness)

## 在 DSH 安装

在 Windows 版 DSH 的侧栏打开「插件」。在安装框填入下面的 npm 包和版本，安装完成后点「立即启用」。本版已在 Windows 11、DSH `0.2.2-rc.3` 上从 npm 安装和启动通过。

```text
dsh-whale-voice@0.5.39-rc.16
```

如果 DSH 显示已安装旧版，先关麦，在插件管理器里更新鲸应。安装和升级的备用路径见 [单包安装指南](docs/install-single-package.md)。

## 首次使用

1. 打开鲸应悬浮窗，阅读使用协议并完成授权。向导里选择说话方式和朗读方式。
2. 默认识别模型 **Whisper Base** 会自动下载，基础文件约 110 MB。在「设置 → 模型 → 模型下载」查看进度。下载完成后，语音可在本机离线识别。
3. 点击「开麦」。在空白首页也可以开始语音会话。模型可沿用当前 DSH 对话或 DSH 默认模型，也可以在「鲸应设置 → 模型 → 对话模型」指定。

## 日常操作

| 想做什么 | 操作 |
| --- | --- |
| 按住说话 | 在「设置 → 交互」录入按键。开麦后按住说话，松开提交。 |
| 自由麦 | 切到「自由麦」，开麦后直接讲话。 |
| 唤醒词 | 选择「唤醒词」，设置唤醒称呼。开麦后先叫称呼再说指令。 |
| 换会话 | 点击悬浮窗的「＋ 新会话」。在「设置 → 会话管理」可展开历史、重命名或恢复归档。 |
| 换声音 | 打开「设置 → 模型 → 朗读方式」，选择声音并试听。 |
| 停止收音 | 点击「关麦」。 |

默认在线朗读声音为 Edge「晓伊」。启用后，朗读文字会发送给微软。断网或无可用音频输出时保留文字回复。也可以选「不发声」或配置本地朗读。录音在本机转写，识别出的文字作为指令交给所选 DSH 对话模型。

### 遇到问题

- 模型下载失败时，从「设置 → 模型 → 模型下载」查看原因并重试。
- 开麦前检查 Windows 麦克风权限、音频输入和 DSH 的模型配置。若鲸应提示缺少 Python，请安装 Python 3.11 后重启 DSH，再按界面提示检查运行环境。
- 反馈时请在本仓库的 [Issues](https://github.com/Emikosama/dsh-whale-echo/issues) 附上 DSH 版本、鲸应版本和复现步骤。

## 构建源码

本仓库的 `v0.5.39-rc.16` 标签对应已发布的 [npm rc.16](https://www.npmjs.com/package/dsh-whale-voice/v/0.5.39-rc.16)。仓库 README 扩充了安装和操作说明。根目录保留 npm 发布时的生成文件，直接运行 `npm pack --ignore-scripts` 即可打包。重新构建会生成当前源码目录对应的 CSS 模块标识。需要 Node.js `24.9` 或更新版本。

```sh
npm ci --ignore-scripts
npm ci --prefix ui --ignore-scripts
npm run build
npm run test:package
npm pack --ignore-scripts
```

生成的 `.tgz` 可以用 [DSH 单包安装方式](docs/install-single-package.md) 安装。模型与第三方运行时来源见 [模型准备](docs/model-setup.md)。

## 许可证

鲸应以 [Apache-2.0](LICENSE) 许可发布。随包分发的组件带有各自的许可证和声明，例如 [Edge TTS](vendor/edge-tts.NOTICES.txt)、[Zod](ui/conversation-contract.LICENSE) 和 [唤醒词词典](helper/wake_pinyin.LICENSE)。`ui/package.json` 是复现旧独立 UI 构建用的历史子包清单。
