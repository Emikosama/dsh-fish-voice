# 鱼应模型准备

新版首次启用后会自动准备默认 Whisper Base 模型和 WASM 运行时，合计约 110 MB。在「设置 → 模型 → 模型下载」查看进度或重试。下载完毕后可以本地离线识别。

默认 Windows 录音路线使用可用的 Python 3 环境。首次安装按向导即可使用默认路线。另选 SenseVoice、faster-whisper 或启用声纹时，可按下文准备对应依赖和模型文件。[Python 运行环境](python-runtime-binding.md)

Whisper Base 自动下载清单记录每个文件的来源、哈希和许可。[固定清单](../whisper-base-catalog.json)

## 手动配置其他识别引擎

1. 安装与现有环境兼容的 Python 依赖：NumPy、sounddevice、sherpa-onnx，以及原有韵律功能使用的依赖。只选择 Whisper 时才需要 faster-whisper。使用项目已有环境，先确认设备列表与麦克风权限，不自动更改系统权限。
2. 中文语音输入优先从当前兼容的 SenseVoice INT8 组合开始：同目录内需要 `model.int8.onnx` 与 `tokens.txt`。在设置页选 SenseVoice 并填该目录。模型存在不代表识别质量已验收。
3. 若明确选择 Whisper，手动准备完整 faster-whisper-small 目录，至少含 `model.bin`、`config.json`、`tokenizer.json`、`vocabulary.txt`，然后选 Whisper 并填目录。该路线不会提供 SenseVoice 的全部情绪/事件标签。不要把 small.en 当成中文模型。
4. 声纹识别是可选实验项，默认关闭，不必下载 CAM++。仅开启时才准备兼容 ONNX 并单独测试。现有声纹库保留，切换模型后不能默认旧阈值仍然合适。
5. 先在安静环境按键说一句公开测试句，检查识别，再测试常听。陌生环境或共享空间优先 PTT。模型、录音、日志和运行配置都不提交 Git。

## 固定来源与校验

完整固定版本、逐文件字节数、SHA-256、上游参照及许可链接见 [`../model-catalog.json`](../model-catalog.json)。这是下载清单，不是自动安装器。

- **SenseVoice：第三方国内镜像。** [ModelScope WEAAEW](https://www.modelscope.cn/models/WEAAEW/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17)，revision `59ee0bceb05d61d4148341323e509db2899bd9a2`。ONNX 约 239 MB（十进制），权重元数据哈希与 sherpa 维护者上游一致；词表哈希来自镜像元数据，尚未下载独立复算。
- **Whisper：第三方国内镜像。** [ModelScope pengzhendong](https://www.modelscope.cn/models/pengzhendong/faster-whisper-small)，revision `64d190b68b8763d051c645fb876ee6d41e73637b`。主权重约 484 MB，元数据哈希与 SYSTRAN 上游一致。其余必要文件也列在清单中。
- **Qwen3-TTS Base 1.7B GGUF：外部 TTS 可选。** [ModelScope ggml-org](https://www.modelscope.cn/models/ggml-org/Qwen3-TTS-12Hz-1.7B-Base-GGUF)，revision `10b1535e7f4996866042e0858a853f8ece01c7a0`。五个主模型/mmproj 的元数据与 llama.cpp 官方文档引用的 Hugging Face 上游哈希相同；未独立证明两站同名账号是同一控制人。主模型选一个、mmproj 选一个，保留现有兼容组合。Q4_K_M + Q8_0 mmproj 合计约 1.48 GB，Q8_0 + Q8_0 mmproj 约 2.29 GB；下载体积不是所需显存，不能据此承诺某显卡能运行。原始 safetensors、audio.cpp-native、CustomVoice/VoiceDesign 不是同一个制品。
- **CAM++：没有已核实的国内即用 ONNX 推荐。** 官方国内原始 `.bin` 不能改后缀当 ONNX。清单提供维护者海外 ONNX 参照，暂不自动转换或承诺国内可下载。

这些链接在云端核查元数据与 HEAD，不代表用户中国大陆网络的完整下载测速，也未执行权重加载。国内源失效时保留旧模型，不静默改源、改模型或转云端识别。

### 下载后的只读校验

在自己选择的目录下载上述固定版本文件后，使用 Python 3.9+（项目建议更高的现有 Python）运行：

```sh
python scripts/verify_model.py sensevoice-int8-2024-07-17 /path/to/sensevoice
python scripts/verify_model.py faster-whisper-small /path/to/whisper
python scripts/verify_model.py qwen3-tts-base-1.7b-gguf /path/to/tts --file Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf --file mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf
```

该脚本只读取本地文件，逐块计算 SHA-256，不联网、不加载模型、不覆盖配置。`verified` 仅代表字节数与清单哈希匹配，不是推理兼容/质量验收。`missing` 或 `mismatch` 时停止启用该文件，检查下载是否完整、版本是否正确；别覆盖仍可用的旧模型。

## 许可分别看待

SenseVoice 官方 ModelScope 卡、Hugging Face 卡和 FunASR 模型协议存在口径差异，[许可澄清 issue #334](https://github.com/QwenAudio/SenseVoice/issues/334) 尚不能当作许可方最终确认。不能统一标注“全部 Apache-2.0”或承诺商业再分发已获许可。清单逐项保留来源和许可链接；商业再分发前确认适用条款。

Whisper 上游卡声明 MIT。Qwen 原始模型卡声明 Apache-2.0，但 GGUF 转换仓库缺少单独完整许可，应保留基座来源、作者、条款和转换说明。模型许可不会自动授权任何人的音色、录音或声音资产。

## 报错与恢复

- “模型无法加载/缺少文件”：先核对设置中的引擎和完整目录，再做哈希校验；不会替你下载另一份。
- “依赖不存在”：使用原环境安装缺失的官方依赖，不更换系统 Python 或隐藏错误。
- 路径保存后，先停录音，再按正常插件卸载/重载流程重启帮工，使模型缓存与配置一致。不要在进行中的会话热换大模型。
- 恢复只需停语音、恢复原路径/引擎和对应插件版本。不要删除私人录音、声纹库或原模型。
- TTS 冷加载、取消播放及模型常驻由外部服务实现；本插件的设置不能冒充该服务已预热或已停止。
