# 鱼应模型准备

从 rc.25 起，鱼应使用 SenseVoice INT8，在本机 CPU 上离线识别。首次启用后会自动准备默认权重和词表，合计约 240 MB。在「设置 → 模型 → 模型下载」查看进度或重试。模型默认存放在 `DSH_HOME/whale-ear/models/sensevoice`。

鱼应自动使用已有 Python 环境的原生 SenseVoice，或在本机托管同一份模型。托管识别按需准备约 15.3 MB 的 Sherpa-ONNX WASM 组件，并与声学唤醒共用。普通话转写会整理为简体字，保留模型识别出的词句。[Python 运行环境](python-runtime-binding.md)

默认模型和托管组件均使用固定版本并校验字节数及哈希。[SenseVoice 固定清单](../sensevoice-catalog.json)

## 使用已有的本地文件

1. 在「设置 → 模型 → 高级路径」填写已有 SenseVoice 目录。将 `model.int8.onnx` 和 `tokens.txt` 放在同一目录，托管运行使用下面列出的固定文件。
2. 旧版本留下的识别模型文件、会话和设置会保留。鱼应自动使用 SenseVoice。
3. 声纹识别默认关闭。需要声纹时再准备兼容的 CAM++ ONNX 并单独测试。

## 固定来源与校验

手动准备或验证以下文件时，请查看固定版本、字节数、SHA-256、上游参照和许可链接。[本地模型清单](../model-catalog.json)

- **SenseVoice** 使用 ModelScope WEAAEW 的第三方镜像，固定版本为 `59ee0bceb05d61d4148341323e509db2899bd9a2`。模型和词表均已校验。Windows Sandbox 使用这份文件完成了本机原生及托管文件转写。[镜像](https://www.modelscope.cn/models/WEAAEW/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17) · [上游 ONNX 转换](https://huggingface.co/csukuangfj/sherpa-onnx-sense-voice-zh-en-ja-ko-yue-2024-07-17/tree/2365baeacb507f821a0c8120fcee3d484dba7a07)
- **Qwen3-TTS Base 1.7B GGUF：外部 TTS 可选。** [ModelScope ggml-org](https://www.modelscope.cn/models/ggml-org/Qwen3-TTS-12Hz-1.7B-Base-GGUF)，revision `10b1535e7f4996866042e0858a853f8ece01c7a0`。五个主模型/mmproj 的元数据与 llama.cpp 官方文档引用的 Hugging Face 上游哈希相同；未独立证明两站同名账号是同一控制人。主模型选一个、mmproj 选一个，保留现有兼容组合。Q4_K_M + Q8_0 mmproj 合计约 1.48 GB，Q8_0 + Q8_0 mmproj 约 2.29 GB；下载体积不是所需显存，不能据此承诺某显卡能运行。原始 safetensors、audio.cpp-native、CustomVoice/VoiceDesign 不是同一个制品。
- **CAM++：没有已核实的国内即用 ONNX 推荐。** 官方国内原始 `.bin` 不能改后缀当 ONNX。清单提供维护者海外 ONNX 参照，暂不自动转换或承诺国内可下载。

其他模型的早期来源检查覆盖元数据与 HEAD。模型下载速度取决于本机网络。遇到识别模型下载失败，可以在「模型下载」重试，或在「高级路径」使用已经准备好的 SenseVoice。

### 下载后的只读校验

在自己选择的目录下载上述固定版本文件后，使用 Python 3.9+（项目建议更高的现有 Python）运行：

```sh
python scripts/verify_model.py sensevoice-int8-2024-07-17 /path/to/sensevoice
python scripts/verify_model.py qwen3-tts-base-1.7b-gguf /path/to/tts --file Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf --file mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf
```

该脚本只读取本地文件，逐块计算 SHA-256，不联网、不加载模型、不覆盖配置。`verified` 仅代表字节数与清单哈希匹配，不是推理兼容/质量验收。`missing` 或 `mismatch` 时停止启用该文件，检查下载是否完整、版本是否正确；别覆盖仍可用的旧模型。

## 许可分别看待

SenseVoice 模型的许可参见 FunASR 模型协议。模型卡与协议的条款表述有差异，商业再分发前请确认适用条款。[模型卡](https://huggingface.co/FunAudioLLM/SenseVoiceSmall) · [固定版本模型协议](https://github.com/modelscope/FunASR/blob/58830eca4012644aac0c3218c3ccc7d98f003fda/MODEL_LICENSE) · [许可澄清讨论](https://github.com/QwenAudio/SenseVoice/issues/334)

Sherpa-ONNX 运行组件采用 Apache-2.0。转写使用的简体字词表来自同为 Apache-2.0 的 OpenCC。[运行时许可声明](../vendor/wake-spotter.LICENSE) · [字词表许可及重建说明](../helper/asr_zh_dictionary.NOTICES)

Qwen 原始模型卡声明 Apache-2.0，但 GGUF 转换仓库缺少单独完整许可，应保留基座来源、作者、条款和转换说明。模型许可不会自动授权任何人的音色、录音或声音资产。

## 报错与恢复

- 模型无法加载或缺少文件时，先在「模型下载」查看进度。使用自备文件时，核对「高级路径」和模型校验结果。
- 运行环境检查失败时，按提示核对现有 Python、麦克风设备和可选功能的依赖。[运行环境说明](python-runtime-binding.md)
- 更换路径前先结束对话。保存后开始新一轮对话，鱼应会使用新路径。
- 若要回退到旧版，先结束对话，再恢复原插件版本和对应配置。保留私人录音、声纹库及已有模型文件。
- TTS 冷加载、取消播放及模型常驻由外部服务实现；本插件的设置不能冒充该服务已预热或已停止。
