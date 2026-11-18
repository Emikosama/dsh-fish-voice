# 语音 Python 运行环境

打包插件启动音频帮工前，会检查已有 Python 的实际依赖导入结果。安装插件或只读界面缓存不会启动这项检查；检查本身不会加载语音模型、打开麦克风、下载或安装依赖。

- 配置仍为 `python`、`python3` 或 `py` 时，先复核上次成功绑定的绝对解释器，再查找已有候选。Windows 使用 PATH、当前虚拟环境、Python 启动器的只读 `-0p` 列表和当前用户标准 Python 安装目录；其他平台查看 PATH 中已有 Python 3 程序。
- 首个通过当前识别引擎依赖检查的解释器保存到鱼应配置目录的 `python-runtime.json`。以后重新启动帮工先重新验证该绝对路径，不再随 PATH 顺序变化换解释器。
- 显式配置的绝对/相对解释器路径或其他命令名只验证指定目标，失败时不会静默切换到别的环境。修改 `pythonPath` 会使旧绑定不再适用。
- 默认 Whisper Base 使用本地 WASM 推理。Windows 默认或按稳定标识选择的麦克风使用 WinMM，识别这条路径只需要 Python 标准库。旧数值设备选择可能仍需要 sounddevice。
- 手动选择 SenseVoice 或 faster-whisper 时继续检查 NumPy 和对应后端。开启声纹需要 NumPy 与 sherpa_onnx。默认 Whisper Base 可直接读取 PCM WAV。在 Windows 上，未安装 faster-whisper 时可用系统 Media Foundation 解码其支持的 MP3 和 AAC/M4A 文件。
- 依赖导入失败会在启动录音前报告解释器版本与失败模块；详细候选路径及检查结果写入原有鱼应日志。诊断成功不代表麦克风硬件、模型文件或识别质量已验证。
- 每个检查进程有超时和退出确认；关麦、撤权或卸载会取消检查，迟到结果不得启动帮工。无法确认检查进程退出时拒绝继续启动。
- 不调用 pip、不升级 Python、不修改系统 PATH，不让 Windows 新旧 Python 启动器自行安装缺失版本。绑定写入失败时不把运行环境冒充为已固定。
- 自定义 `helperPath` 保留原来的自定义解释器协议，不强加官方 Python 帮工的依赖检查。

Windows 启动器只读列表及自动安装开关依据 Python 官方文档：
https://docs.python.org/3/using/windows.html
https://docs.python.org/3.13/using/windows.html

验收应覆盖：3.13 缺依赖而现有 3.11 可用；PATH 重排后的重启；绑定路径消失；显式解释器更改；必需与可选依赖区分；检查中停止；写入失败。自动化使用合成安装与标准库探针，不代替 Windows 真机和真实麦克风验收。
