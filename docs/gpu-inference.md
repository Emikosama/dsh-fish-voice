# 本地 GPU 推理：第一阶段范围

本功能按模型、运行时和本机设备检测选择后端。显卡品牌、操作系统或安装成功都不等于 GPU 推理已经通过验证；不承诺“所有显卡/核显通用”，不安装或修改系统驱动，不把本地失败切换为在线服务。

## 已接通的路径

| 模型 | 自动路径 | CPU 兜底 | 当前边界 |
| --- | --- | --- | --- |
| Whisper / faster-whisper | 已安装 CTranslate2 的 `cuda` 设备接口，逐设备查询可用精度 | 同一份本地模型 CPU INT8 | 兼容的 NVIDIA CUDA 与 AMD HIP 构建均使用这套接口，不能由 `cuda` 字样推断品牌。未自动分发 CUDA、cuDNN 或 HIP 包；未接通 Intel GPU。 |
| Qwen3-TTS GGUF | 官方 llama.cpp b12110 Windows/Linux x64 Vulkan 运行包 | 独立固定 CPU 程序，同一模型、提示与参考音频 | Vulkan 是覆盖 NVIDIA/AMD/Intel（含兼容核显）的路线，仍受驱动、显存、模型算子和系统依赖限制。 |
| SenseVoice INT8 | CPU | CPU | 固定 INT8 模型与 sherpa-onnx GPU 组合尚未验证；自动模式如实使用 CPU，不能仅凭 ONNX Runtime/provider 名称启用。 |
| MeloTTS INT8、CAM++、VAD | 现有 CPU | 现有 CPU | 本阶段未改成 GPU。 |

旧配置和已安装 CPU 任务保持 CPU，不静默下载新组件。新 Qwen 安装界面可选择自动/Vulkan/CPU，自动与 Vulkan 计划明确包含 CPU 兜底程序。已存在的本机 Qwen 权重可按固定大小和 SHA-256 原地复用，GPU 程序单独下载；这不是对任意目录中的程序执行授权。

识别“模型路径”页可以为已有 Whisper 选择自动；只查已经安装的 CTranslate2，不安装依赖，不联网下载缺失权重。自动模式依次使用实际设备支持的 `int8_float16`、`float16`、`int8_float32`、`float32`、`int8`，按实现选取首个可用设备。精度与设备检测不保证有足够显存，加载和完整推理仍可能失败。

## 成功证据与可见状态

- Whisper 只有完整消费转写结果后才把当前计算状态标为已验证。UI 显示最近识别的引擎、实际 CPU/GPU 与兜底情况。
- Qwen 先运行固定程序的 `--offline --list-devices`，只接受指定后端的严格设备 ID，排除软件渲染器；实际合成必须有正数 GPU 层卸载证据、完整帧数和有效 WAV，才标为 GPU 成功。它证明 GPU 参与计算，不表示所有算子都在 GPU 上。
- 本地 GPU → CPU 兜底会报告实际计算后端。Edge 暂不可用时以文字显示回复。
- 设备名、驱动日志、原始异常、私有文字、录音路径不进入能力状态。TTS 子进程只继承必要系统环境变量。

## 失败与取消

GPU 加载或推理发生已确认失败时，只重试同一模型 CPU 一次，不更换 ASR 引擎、不更换 TTS 模型、不重新采集音色。失败在相同模型/运行组件/配置身份下记住，避免每个后续片段重复失败成本；配置变化或宿主重启允许重新尝试。

取消、撤销语音授权、看门狗过期或无法确认子进程退出时不启动 CPU 兜底。TTS 播放在推理重试区外，播放失败或可能已播放时绝不重复播报。TTS 原生进程终止不明时保留隔离状态及它仍可能使用的临时文件，先完整退出宿主再恢复。

Whisper 的当前 CTranslate2 在 Python 帮工进程内运行：本阶段兜底覆盖可捕获的设备查询、加载、推理异常，不承诺原生段错误、驱动死锁或整个帮工崩溃后的自动 CPU 恢复。底层无法确认停止时保留原有安全停止边界。

## 运行包与系统依赖

仅新增官方 b12110 的两个 Vulkan 归档。Linux 为 35,858,360 字节；Windows 为 37,661,146 字节。下载归档及每个允许解出的文件均固定 SHA-256，路径与解包大小限制不放宽。旧 CPU 清单不变。

- Linux：系统须有兼容 Vulkan 驱动/`libvulkan.so.1`，以及运行包所需 glibc/libstdc++/OpenSSL 3。
- Windows：系统须有兼容 Vulkan 驱动/`vulkan-1.dll`、Microsoft Visual C++ x64 运行库与 UCRT。
- 不附带驱动、Vulkan SDK、CUDA/cuDNN/HIP 安装器。GPU 程序无法启动或没有真实设备时可以使用独立 CPU 程序。
- 官方 CUDA/HIP llama.cpp 包虽有候选选择接口，但本阶段未分发、未广告为可安装选项；更大的归档、附属运行库和许可证需要独立审查。

llama.cpp/Whisper/CTranslate2 代码采用 MIT；sherpa-onnx 采用 Apache-2.0；这些不能替代模型、微软 DirectML 或 NVIDIA CUDA 等附属组件各自的许可。现有 SenseVoice 模型许可提示继续保留。

## 尚未接通的路线

Windows DirectML 能覆盖多家 DX12 GPU，但 sherpa-onnx 是否编译相应 EP、固定 SenseVoice INT8 算子是否成功运行以及真实 GPU 是否生效须分别核实。当前代码没有把“请求了 dml”当成功。ONNX Runtime DirectML 文档已说明维护状态与会话限制；引入时须禁用 memory pattern、顺序执行并保证同会话 Run 不并发。

OpenVINO 是 Intel GPU/NPU/CPU 路线，不是全品牌统一方案。whisper.cpp Vulkan 可扩展跨品牌识别，但它需要新的运行时与 GGML 模型清单，不能拿当前 faster-whisper 的 CTranslate2 `model.bin` 直接运行。这些留待后续独立交付。

## 验证记录与实机验收

已在云 Linux 下载、验哈希并安全解包官方 Linux/Windows Vulkan 归档，检查所需二进制依赖。真实 Linux b12110 程序 `--help` 确认所用选项，`--offline --list-devices` 成功返回无可用 GPU。因此这里只证明二进制启动与无 GPU 路径，未完成任何 NVIDIA、AMD、Intel 独显或核显的真实 GPU 合成/识别测试，也没有操作用户电脑。

合并后须在 Windows/Linux 与目标 GPU 上分别跑：有设备/无驱动/显存不足/错误模型/取消/授权撤销/进程终止不明/CPU-only；比较首包和热启动延迟、内存/显存、识别结果或完整音频、同一参考音色、取消后无投递/无播放。GPU 未必比 CPU 快，尤其短句、核显和模型冷启动；不标未经实测的加速百分比。

## 官方依据

- [CTranslate2 硬件支持](https://opennmt.net/CTranslate2/hardware_support.html)
- [CTranslate2 安装](https://opennmt.net/CTranslate2/installation.html)
- [llama.cpp b12110 固定发布](https://github.com/ggml-org/llama.cpp/releases/tag/b12110)
- [llama.cpp Vulkan 构建](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md#vulkan)
- [ONNX Runtime DirectML](https://onnxruntime.ai/docs/execution-providers/DirectML-ExecutionProvider.html)
- [ONNX Runtime OpenVINO](https://onnxruntime.ai/docs/execution-providers/OpenVINO-ExecutionProvider.html)
- [whisper.cpp Vulkan](https://github.com/ggml-org/whisper.cpp#vulkan-gpu-support)


## 2026-11-15：默认选择、延迟与实机定位

- 新 Qwen 安装页面在支持的平台上默认选“自动 GPU · CPU 兜底”。旧的 CPU 安装仍只使用 CPU，升级插件不会补下 GPU 运行组件或改写用户选择。朗读设置现显示当前安装方案；“自动”是选择策略，不是已使用 GPU 的证据。
- GPU 完整合成成功后，同一已校验模型/运行组件/参考音色/请求模式的后续片段复用该设备选择，免去每段另开 `--list-devices` 进程。仍逐段验证文件、启动合成进程、检查正数卸载层数和完整音频；设备失效按原有边界回退一次同模型 CPU，取消或退出不明确不重试。运行身份改变重新枚举。
- 当前 `llama-tts` 路径不是常驻或流式：每段冷启动，完整 WAV 写完并验证才播放。快速对话模型不消除这段等待；省一次枚举不是解决模型加载或实现流式。
- 本地 Qwen 的结果与状态增加 `localTimings`，只含准备、设备选择、合成、播放、总时长的整数毫秒，片段数和 `modelResident:false`。准备包括托管文件校验；合成包括加载、生成、验证及确定失败后的 CPU 重试；播放为播放器调用到完成的时间。多段只汇总已完成片段，下一请求清空旧值。它不是声学首音时间、原生内核时间或加速比例，也不包含文字、文件路径、设备名称或原始日志。

短期检查：

1. 先看设置 → 模型 → 朗读方式的“当前安装方案”，区分 CPU 与自动/Vulkan。旧 CPU 安装若要准备 GPU 组件，在“切换当前模型 → 安装其他朗读模型”选择自动；已有外部权重可在高级路径的复用入口校验，确认下载计划后再继续。不要仅改一个 GPU 标志或执行任意目录程序。
2. 一次实际朗读完成后，看“本地计算”：只有 `localComputeVerified:true` 且实际后端为 `vulkan/cuda/hip` 才说明该次 GPU 参与。若 CPU 兜底，区分运行组件缺失、设备不可用和合成失败。CPU 已完成同样不是 GPU 成功。
3. 展开已完成片段耗时，分别记录准备、合成、播放，再用同一句做第二次对照。模型仍逐段启动，不能把第二句叫常驻热启动。

本轮验证使用合成夹具确认选择复用、设备失效兜底、取消边界、计时字段与状态清理；固定 b12110 Linux Vulkan 程序实际启动并返回无可用设备。没有使用用户设备，没有完成真实 GPU 推理或声学延迟测试。

## 后续常驻候选：与逐句 CLI 的区别

在上述逐句 CLI 修复之后，托管 Qwen 新增固定 b12110 常驻服务器路径：仅当当前已校验安装保有对应归档时使用，不改变 CPU/自动/Vulkan 选择，不增加下载。缺少该归档但已安装资产仍完整的旧安装继续走 CLI。后续句子可复用模型进程，仍先取得完整 WAV 再播放；不等于边生成边播放。各性能模式的释放时机、停止确认、严格的启动失败 CPU 兜底和增量 PCM 的终态限制见 [常驻合成契约](./resident-qwen-contract.md)。

`localTimings.modelResident` 现在允许真实片段结束时的布尔快照，公开性能状态则被动读取当前所属进程状态。不要把旧计时快照当成当前显存占用。直接本机请求不使用环境代理或全局 fetch dispatcher。
