# 本地参考音色后台接口

Qwen3-TTS 可以保存并使用用户当前选定的参考音色。未选择样本时保留原有默认行为；不建立音色库，不自动寻找样本。设置 → 模型 → 朗读 → 音色与音量提供本机 WAV 选择、清除和保存，使用宿主原生文件选择器。已保存样本在重开面板后恢复。界面交互使用 DOM 夹具验证，Windows 实机路径与听感须另外验收。

## 参考音色选择更正（issue #15）

[2026-11-14 的更正与实测记录](https://github.com/Emikosama/dsh-whale-ear/issues/15#issuecomment-6886202570) 确认：该「肥鱼」环境的实际生产参考是 `cute24k.wav`，此前建议改用 `reference-b.wav` 是错误的。`reference-a.wav`、`reference-b.wav` 是历史 `qwen-v09` 双参考生成使用的样本，不能据此认定为当前交付音色的参考。

该评论记录了同模型、同固定采样参数，仅更换参考音频的对比，并报告用户听后确认「D 是对的」。这是该次本机样本的听感反馈，不是鲸语在所有设备或句子上的音色一致性承诺。采样参数修复见下文；这次参考选择问题不以添加旧融合流程解决。

迁移已有音色时，选择实际生产配置使用的本机 WAV。鲸语只使用明确选定文件的已验证字节；文件名不作为自动识别音色或替换样本的依据。文件缺失、内容变化或格式无效时停止，不改用旁边的 A/B 文件。程序不内置、自动复制或分发该参考音频。

## 设置与权限

- `tts.referenceAudioPath`: 默认 `null`；选择时使用本机绝对、规范化 WAV 路径。
- `tts.referenceAudioAccepted`: 默认 `false`，仅为读取旧配置保留。当前样本使用责任由首次使用协议说明；不要求每个文件再次勾选，也不把选择文件当作新的权属声明。清除路径时传 `null`。
- 保存仍使用已有 `save-tts`、停止状态约束与 revision CAS。保存不读取样本、不合成、不联网。
- 在既有设置授权和首次使用协议范围内，Agent 可通过 `save-tts` 保存或清除参考路径。省略路径时沿用当前选择；Agent 不得自行改写旧版 `referenceAudioAccepted` 声明。人工更改使旧计划失效。
- 旧配置缺少字段时补默认值；旧客户端保存缺少字段时保留现存选择。安装/应用新本地模型合并旧设置，因此保留路径与声明，并用完整候选配置验证。选中样本但换到不支持参考音色的 Melo 时明确失败，不忽略样本。
- 设置文件仅保存路径及声明，原 WAV 不被覆盖或删除。参考文件必须继续存在；移动、删除或格式改变后检查/朗读失败并要求重新选择。

## 执行边界

每次本地检查、验证与正式朗读重新检查样本。Qwen 验证和每段朗读把已验证字节写入本次私有临时目录，再以 `--tts-speaker-file` 传给固定运行组件；不将用户路径直接交给原生进程。已确认进程结束后清理自己的临时目录，不改动原文件；无法确认进程停止时保留临时文件并沿用隔离锁。

输入范围是 RIFF/WAVE，PCM 8/16/24/32 位或 IEEE float32/64，单/双声道，8–96 kHz，非空、最长 30 秒且最大 12 MiB。拒绝 NaN/Infinity、错误块长度、重复 data/fmt、截断及容器长度不符。压缩 WAV、WAVE_FORMAT_EXTENSIBLE、MP3 等不在此版本的输入范围。30 秒和 12 MiB 是本插件的有界资源限制，不是声称上游只支持这些长度。

文件必须是普通文件。逐级检查目录与文件，禁止符号链接/Windows junction；拒绝非规范路径、控制字符、UNC/device 路径及 Windows alternate streams。打开后比较文件身份，并在有界读取后复核元数据和目录链。POSIX 可用时采用 O_NOFOLLOW。原生进程读取私有快照，避免用户路径在启动之后重定向。此机制不是对同一 OS 用户的恶意并发写入或管理员攻击的隔离沙箱；跨平台 Node API 无法提供完整 openat/句柄相对目录链原子解析。受限读取、前后检查与私有快照缩小这一窗口。

验证缓存包含运行文件签名、参考路径与实际 WAV SHA-256。恢复旧大小/mtime 不会伪造内容命中。probe 记录真正合成时的快照摘要，随后 inspect 对当前文件再次检查；测试过程中更换文件不会把新文件标为已验证。正式朗读不以缓存替代逐次验证。

现有 `local-audio` 试听/播放授权和设置权限不扩大。inspect 只读取已明确选择的本机样本并检查，不播放或启动麦克风。未上传音频或下载模型/样本。

## 上游依据与验证状态

- 固定版本 [b12110 TTS 文档](https://github.com/ggml-org/llama.cpp/blob/b12110/tools/tts/README.md) 支持 Qwen `--tts-speaker-file`。
- [b12110 tts.cpp](https://github.com/ggml-org/llama.cpp/blob/b12110/tools/tts/tts.cpp) 把文件交给 mtmd loader。
- [b12110 mtmd-helper.cpp](https://github.com/ggml-org/llama.cpp/blob/b12110/tools/mtmd/mtmd-helper.cpp#L298-L332) 通过 miniaudio 解码到模型采样率的 mono float32，故输入接受 stereo，而不是套用输出文件的 mono 限制。

已验证：Linux Node 测试中的合法程序生成 WAV 与 runner 桩覆盖参数传递、实际选定字节、内容缓存失效、文件/目录链接、文件失效、旧配置兼容、Agent 路径选择与既有授权、配置持久化/旧客户端/安装应用，以及失败/取消清理。

未验证：真实 Qwen 推理、Windows 文件选择和路径兼容、耳听相似度。没有使用任何人的录音进行测试；桩通过不等于真实音色效果通过。

## Qwen 采样基线（b12110）

本地 Qwen 的检查合成、正式朗读和播放前 CPU 回退均显式传入 `--temp 0.8 --top-k 40 --top-p 0.95 --seed 42`，不再依赖随机 seed 默认值。有无参考样本都使用同一组参数；不采用时间戳或随机数重置 seed。参数由 [b12110 common/arg.cpp](https://github.com/ggml-org/llama.cpp/blob/b12110/common/arg.cpp) 解析，[TTS 入口](https://github.com/ggml-org/llama.cpp/blob/b12110/tools/tts/tts.cpp) 使用主采样器，并把 top-k、top-p、seed 传给音频生成器。

固定参数提供可比较的生成输入，不承诺跨硬件、计算后端或模型版本生成逐字节相同的音频。当前上下文仍为 4096、最多生成 2048 帧；没有把服务器并发参数或旧管线的 512 上下文直接套到 CLI 上。真实重复合成、长句稳定性与听感仍需使用相同模型、运行组件、参考样本和设备验收。

参考音频仍是单样本输入，可以选择经过外部处理的合规 WAV；导入样本不等于对生成结果执行该样本原来的处理流程。这里没有历史 `qwen-v09` 的双参考生成与融合处理。该管线为同一句话分别生成 A/B 两段，先测量响度并施加线性增益，再经对齐进行 35% 高频包络融合，最后重新测量并调整线性增益；不是把原始 A 样本混入任意新句子，也不是直接使用 loudnorm 重渲染。固定采样参数本身不代表已还原这一历史音色。

对齐现有音色前，应核对实际供应商路由、当前参考文件和运行组件。`qwen-feiyu` 与 `qwen-v09` 是不同路由名称，不能仅凭「肥鱼」称呼推断正在使用双参考融合。鲸语不会自动寻找其他插件的个人音频、导入其配置或分发样本。

已验证：离线 runner 夹具逐项检查 CPU、Vulkan 和 GPU 失败后 CPU 重试的参数，有/无参考样本、检查合成与重复朗读均覆盖。未验证：真实模型输出一致性、音色相似度和 Windows 实机合成。

## Qwen 显卡运行组件（b12110）

本地 Qwen 使用托管安装描述中的 `computeRequested`（`cpu`、`auto`、`vulkan`）选择计算方式。历史安装缺少该字段时仍按 CPU 执行。CPU 组件的模型参数不能凭空获得 GPU 能力；只有安装器完成归档及全部落地文件校验后提供的独立 GPU 组件，才进入检测和调用。

当前新增已固定的组件是 Windows x64 和 Linux x64 的 Vulkan 版本，用于已有兼容驱动的 NVIDIA、AMD、Intel 独显或核显。设备和算子是否支持须在本机检测和实际合成后确认。未安装显卡驱动、Vulkan loader、Visual C++ 或其他系统组件；不请求管理员权限。macOS、ARM64 和 DirectML 不在这次托管 Qwen 组件范围内。

- GPU 组件保存在 `runtime/backends/vulkan`，CPU 组件保留在原 `runtime` 目录；不覆盖 CPU 二进制。
- `--offline --list-devices` 是有时限、可取消、输出有界的静态设备检查，不带模型、正文或参考音频。只接受固定格式的设备 ID，过滤 llvmpipe、lavapipe、SwiftShader 等软件渲染器；设备名称和驱动日志不进入状态或错误。
- 从已安装且可用的后端中选择，单次只使用一个设备，优先设备报告的空闲显存。GPU 调用同时为 backbone 和 mmproj 指定设备，使用 `-ngl all --mmproj-offload`。CPU 调用明确指定 `--device none -ngl 0 --no-mmproj-offload`。
- 完整音频、正常子进程退出，以及大于零的实际 GPU layer offload 证据都成立，才将本次 GPU 合成标为已验证。设备枚举成功不等于合成成功，也不代表音色效果或速度通过验收。
- GPU 组件缺失或没有可用设备时使用同一模型的 CPU 组件。GPU 生成在播放开始前失败，且已确认子进程结束时，只允许再进行一次 CPU 生成。正文、模型路径、mmproj 和已验证的参考音频快照均不改变。两次生成使用不同输出文件，失败输出不会被误播放。已确认的 GPU 生成失败会在当前适配器生命周期内记住，后续同模型、组件、参考音频和计算选择的分段直接使用 CPU，不重复支付 GPU 超时；这些身份变化或重启后才重新尝试。
- 取消、权限撤销、设置变化、无法确认进程结束均不重试；进入播放之后的失败不重试。没有在线回退或换模型、换音色。若进程停止状态不明，临时目录暂时保留，不移除仍可能被进程使用的文件，并沿用宿主进程隔离锁；重启后再检查。
- 检查和结果只返回固定的请求/实际计算后端、验证与回退状态。未运行前实际后端是 `null`；一次实际合成成功后才报告 CPU 或 GPU。缓存包含计算选择、组件摘要、模型文件身份和参考音频内容摘要，不以缓存替代逐次托管校验。

### 固定归档核验记录

2026-11-14 从 [官方 b12110 发布](https://github.com/ggml-org/llama.cpp/releases/tag/b12110) 下载完整归档，独立计算 SHA-256，并与该发布 API 的 digest 比较。清单只保留 TTS、依赖库和许可证，不解包网络 RPC 或其他命令行程序。所有实际落地文件另有独立大小和 SHA-256；Linux 所需的库别名由已核实的普通文件复制创建，不落地符号链接。

- Linux `llama-b12110-bin-ubuntu-vulkan-x64.tar.gz`：35,858,360 字节，SHA-256 `a5d741940956ec62e8783aee7e5a4c7c761af867d6f027c3277a51e1a3ac59b0`。
- Windows `llama-b12110-bin-win-vulkan-x64.zip`：37,661,146 字节，SHA-256 `9732a5e48887ca54d0bfe4af4324dc85fd56cd8cda19b52df3542fa6ebe6874f`。

Linux ELF 动态依赖检查确认 Vulkan 库依赖 `libvulkan.so.1`；现有 TTS 组件还依赖 OpenSSL 3、glibc、libstdc++ 等系统库。Windows PE 导入检查确认 Vulkan 库依赖 `vulkan-1.dll`，并使用现有 VC++/UCRT 系统库。Vulkan loader/驱动不随包分发。保留 llama.cpp MIT 许可证和 Windows LLVM OpenMP 许可证。

`voice-qwen-gpu.mjs` 的后端候选协议可接受经过固定校验的 CUDA/HIP 组件，自动顺序为 CUDA、HIP、Vulkan，再到 CPU。但这次**没有分发 CUDA/HIP 清单**，也不会把它们显示成已安装能力。b12110 的相关主包及 CUDA 运行库超过当前有界内存解包上限，还需要完整逐文件核验、依赖与许可证审查；未通过简单提高解包上限来绕过这些工作。

上游参数及设备格式依据：[b12110 common/arg.cpp](https://github.com/ggml-org/llama.cpp/blob/b12110/common/arg.cpp)，TTS 对 backbone/mmproj 的参数使用依据：[b12110 tools/tts/tts.cpp](https://github.com/ggml-org/llama.cpp/blob/b12110/tools/tts/tts.cpp)。

已验证：两个完整官方 GPU 归档及所有选择文件的大小/哈希、安全解包；Linux ELF/Windows PE 导入依赖；Node 夹具覆盖设备过滤、GPU 调用参数、实际 offload 证据门槛、同模型 CPU 重试、引用音频快照不变、取消/撤销、播放后不重试、停止状态不明时不重试。

未验证：Windows 真机运行、NVIDIA/AMD/Intel 实机 GPU 合成、显存不足的真实驱动行为、性能与耳听效果。夹具结果不是这些实机项目的验收。
