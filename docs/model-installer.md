# 本地模型安装器

## 使用边界

安装器只在你确认具体模型、固定来源、文件大小、保存位置和许可说明后下载公开模型。它不上传录音、声纹、个人文件或密钥，不替你安装 Python 依赖，不修改系统权限，不自动换源、换模型或启用语音。

当前可安装清单：SenseVoice INT8（约 239.5 MB）、Whisper small（约 486.2 MB）。逐文件 SHA-256 来自已核查的固定版本清单；主权重元数据与上游匹配，小文件以镜像元数据为准。此前核查是元数据和 HEAD，不是用户网络完整下载或实际推理验收。安装后会重新计算所有本地文件的哈希。

Qwen3-TTS Base 1.7B GGUF 在 Linux x64 / Windows x64 提供 CPU 下载计划：Q4 主模型 1,035,965,280 字节、Q8 mmproj 446,422,912 字节，加官方 llama.cpp b12110 CPU 归档（Linux 23,051,958 字节；Windows 24,708,445 字节）。其他平台保持不可安装。Melo 中英文 INT8 提供独立轻量 CPU 下载入口，需明确选择，不会从 Qwen 静默切换。CAM++、Kokoro、MOSS 等没有完整核实且接入的安装清单时，不显示成已可用。

“已安装”仅表示完整字节和哈希验证通过，不等于“已加载”或“听感已验证”。应用安装结果前再次验哈希，并要求语音完全停止；配置采用版本校验，保留其他模型路径和私人数据。应用后提示重新启动帮工，不在进行中的会话热切换。

## CPU、GPU 与推荐

CPU 默认。探测只运行随包 Python 检测器，不下载权重、不打开麦克风。Whisper CUDA 必须由已安装 CTranslate2 实际报告 CUDA 设备和 int8_float16 支持；运行时再次验证，不偷偷回落 CPU。SenseVoice 固定 INT8 模型的 CUDA 组合尚未验证，即使后端报告 CUDA provider 也保持不可选。没有 Vulkan/DirectML、AMD GPU 或显存的虚构支持。

硬件信息来自运行鱼应插件的机器，不代表远程 TTS 服务器。内存同时考虑进程/容器限制，显存未有可靠查询时为未知。Qwen 推荐与可安装状态分离：总内存至少 8 GiB、当前可用至少 6 GiB 时，按 Qwen 优先偏好显示“推荐”。这是可调整的界面启发式，不是模型最低要求、速度保证或实测兼容结论。检测不完整显示未知，资源紧张时可选择 Edge 或轻量本地模型。

## 任务与恢复

- 下载属于主程序，不属于设置页面。关闭设置页或取消订阅不会停止下载。
- `pause` 保留临时文件；`resume` 恢复同一固定模型和来源。
- `cancel` 删除该任务自己的临时文件，不删除任何已安装模型；取消后需新建任务，不能恢复已删除的部分。
- 主程序退出或崩溃后，未完成任务恢复为“暂停”，不会自动联网。手动恢复前重新检测运行依赖。
- 只对强 ETag 使用 Range + If-Range。服务器返回 200 时安全重下；没有强 ETag 时不拼接旧片段。206 的范围、总长和版本必须一致；变化时停止，下次恢复从头重下。
- 大文件逐块读取、写入与哈希，不整体读进内存。网络使用 45 秒无进展超时，不是 45 秒下载总期限。
- 检查磁盘余量、字节数、SHA-256、目录与文件类型。临时文件和元数据是独立随机路径及私有权限；拒绝符号链接和硬链接目标，原子提交到新的安装目录，不覆盖旧模型。
- 同一数据目录有进程锁。普通重启可识别死亡进程；损坏锁或未知持有者会阻止工作，不盲目删锁。

## 已安装文件缺失后的恢复

重启发现托管安装文件缺失或变短时，任务会显示失败。点击恢复后，先检查同一任务目录中的文件类型，再逐文件验证原安装和已下载的临时文件；只补下载缺失或校验不通过的文件。旧版本失败恢复留下的两份目录也按同一固定清单处理，不覆盖其他安装，不修改复用的外部模型源。未知文件、链接或无法确认已退出的运行进程会阻止恢复。

修复使用原任务的安装路径，原配置不用重写；不会因此重新授权或自动应用另一模型。修复进行时原路径可能暂不可用，完成后由正常使用流程重新校验。暂停或退出保留修复进度。取消只删除本任务临时目录（包括已经纳入修复的旧文件），不会删除其他安装或外部复用源；取消不能恢复，需要新建任务并明确应用。若尚未开始修复，取消会保留原有损坏安装目录，但不会将其重新登记为可恢复任务。取消与最终提交同时发生时，若安装已经提交成功，会返回“已安装”，保留安装结果。

上述恢复、双目录、暂停重启、取消和复用源边界由离线合成文件测试覆盖；不代表真实模型、Windows 文件占用或音频设备验收。

## 宿主接入契约

新增文件 `voice-model-installer.mjs`、`voice-runtime-archive.mjs`、`runtime-catalog.json` 和 `helper/model_compute.py` 必须随 npm 包交付。`voice-*.mjs` 已被现有 files 规则覆盖，但需额外加入 `runtime-catalog.json`、`helper/model_compute.py` 和本文档。不要把测试临时数据或模型权重打入包。

```js
const installer = createModelInstaller({
  root: join(appDataDirectory, 'model-installer'),
  pythonPath: () => effectiveConfig.pythonPath,
})
```

`root` 和 `pythonPath` 只由可信宿主提供，不能作为 UI 任意路径/命令字段。安装器应懒创建，宿主卸载时调用 `await installer.close()`；不在面板关闭时调用。快照与订阅通过已验证会话的只读私有 Gateway 发送，不把每个进度事件写入普通聊天历史。

方法：

```js
installer.snapshot()
installer.subscribe(snapshot => { /* unsubscribe function returned */ })
await installer.inspectCompute(signal)
const plan = installer.plan(modelId, 'cpu')
// 显示 plan.source, files, totalBytes, destination, licenseUrls, licenseNote, notice。
// 只有用户明确点击确认后，原样发送计划哈希：
const job = installer.start({ modelId, compute: 'cpu', planHash: plan.planHash, accepted: true })
await installer.pause(job.id)
installer.resume(job.id)
await installer.cancel(job.id)
const verified = await installer.verifyInstalled(job.id, signal)
await installer.close()
```

`planHash` 绑定具体模型、计算设备、revision、全部文件的 URL/大小/SHA、许可与目的地，旧计划不能授权改变后的内容。后端拒绝额外请求字段和重复未完成任务。

快照 schema 1：

```json
{
  "schema": 1,
  "hardware": {
    "scope": "plugin-host",
    "totalMemoryBytes": 17179869184,
    "availableMemoryBytes": 4294967296,
    "gpuMemoryBytes": null
  },
  "compute": { "default": "cpu", "backends": {} },
  "models": [{
    "id": "qwen3-tts-base-1.7b-gguf",
    "available": true,
    "runtimeLoaded": false,
    "recommendation": {
      "modelId": "qwen3-tts-base-1.7b-gguf",
      "recommended": true,
      "badge": "推荐",
      "confidence": "heuristic-only",
      "state": "recommended-pending-runtime-validation",
      "runtimeValidated": false
    }
  }],
  "jobs": [{
    "id": "随机 UUID",
    "modelId": "sensevoice-int8-2024-07-17",
    "compute": "cpu",
    "status": "running",
    "stage": "downloading",
    "receivedBytes": 8192,
    "totalBytes": 239549735,
    "runtimeLoaded": false,
    "files": [{ "name": "model.int8.onnx", "bytes": 239233841, "receivedBytes": 8192, "verified": false }],
    "error": null
  }]
}
```

实际字段还包括观察时间、当前文件、各来源说明、状态原因及完成后的 `installedPath`、`recommendedSettings`。快照不暴露 ETag。固定清单中的下载总量均已知；UI仍应兼容模型摘要的 `totalBytes: null`，未知时不要显示虚假百分比。

任务 status：`queued | running | paused | failed | cancelled | installed`。stage 除对应状态外还有 `checking-runtime | downloading | verifying | installing`。百分比仅表示下载字节，不代表整个安装/加载流程完成。错误为有界的 `{code,message}`，不要把原始异常或网络 URL query 展示给用户。

人类命令窄接口由 `ui/host.mjs` 转发到 `voice-ui-bridge.mjs`：

- `model-installer` / `inspect-model-compute`
- `plan-model-install`：modelId、compute
- `start-model-install`：modelId、compute、planHash、accepted
- `control-model-install`：id、operation（pause/resume/cancel）
- `apply-model-install`：id、revision

这些不是代理可随意调用的工具。维持现有精确 live Agent 来源校验，不用仅同 ID 的伪对象代替调用者。

## 已验证与未验证

使用本地 HTTP 合成字节的单元/集成测试覆盖成功、断网、Range 与强/弱 ETag、服务器忽略范围、哈希与长度失败、重启与 SIGKILL、取消、目录权限（POSIX）、符号链接、进程锁、来源重定向限制、无密钥、清单变化与应用前复验。Python probe 使用模拟依赖验证真实后端查询与默认 CPU。

Qwen Q4/Q8 模型已在云 Linux 真实下载并用 CPU 合成短句。上下文 4096 峰值 RSS 约 4.60 GiB；6 GiB 可用内存的建议预留余量，不是长句保证。未在用户 Windows/显卡上实际推理，未验证用户国内网络下载速度，Melo 云 Linux 短句峰值约 256 MiB；未做用户设备的听感验收或 Kokoro 实测。依赖缺失、未经验证的 GPU/模型组合会明确不可用。

## 已接入的私有进度与首次引导接口

`mountConversationClient(ctx)` 返回 `subscribeModels(sessionId, onValue, onError) -> dispose`。它使用严格 codec 的 `whaleConversation/followModels` 流，不产生普通聊天命令记录。初始及清理帧为 `{schema:1, hardware:null, compute:{schema:1,default:'cpu',observedAt:null,backends:{},reason:'尚未检测本地计算后端。'},models:[],jobs:[]}`，客户端应将其显示为尚未读取而非模型不存在。宿主帧的 hardware 为实际检测对象。

流要求宿主 owner principal 与精确 live Agent，每次输出重新检查身份；空闲时也检查替换/失效。取消订阅、会话更换和插件卸载会清理观察者、丢弃晚到帧，但不会暂停或取消安装任务。

无需已有会话的 `client.readSetup(signal)` 只读返回 `{version:1,completed:boolean}`，同样要求 owner principal，不公开模型路径、完整配置或录音；没有无会话写入接口。

第一次读取模型快照会懒创建宿主安装器，建立应用私有目录并持有同目录进程锁，读取任务 JSON 以及已管理文件的大小，恢复未完成任务为暂停。不读取权重内容、不探测 Python、不联网或启用模型；计算后端检查须显式执行 inspect-model-compute。进程锁直到宿主卸载而非设置页关闭才释放。


## 托管 TTS 运行时

Qwen 的 `plan()` 额外返回 `purpose: "tts"`、官方运行时 URL、固定版本、CPU 平台、许可，以及 GitHub 资源重定向域名。确认覆盖下载模型及本地可执行程序，不只有权重。模型来源仍是固定 ModelScope 版本；只允许指定 b12110 GitHub 归档路径，其重定向只允许 release-assets.githubusercontent.com 的 release-asset 路径。没有放开所有 GitHub 下载，也不会将模型请求重定向到运行时 CDN。

运行时归档与内部需要的每个文件分别固定字节数和 SHA-256。归档最大 64 MiB、总展开上限 512 MiB、条目有固定数量与大小界限；只有批准的普通文件输出到私有 runtime 目录。不会执行 shell 解包命令、包安装脚本，或提取符号链接、硬链接、设备文件、路径穿越、额外可执行程序。Linux 的 `.so.0` 别名通过复制已验证的普通文件得到。Windows MIT 许可文本随清单保存，LLVM OpenMP 许可来自归档。已有 ASR 清单内容和旧任务哈希保持不变。

`installed` 表示下载/提取哈希通过，且本机 `llama-tts --version` 成功；依然不表示模型合成成功。`verifyInstalled(id)` 重新校验模型、归档、每个运行文件和版本，拒绝 runtime 目录多余文件，返回 `runtimeReady: true`。真正的语音合成由 TTS 运行时另行检查。没有 GPU、在线 TTS、参考录音或音色资产的隐式回退。

TTS 完成结果是 `purpose: "tts"` 和 `recommendedSettings.tts = {provider:"local",localModelId,localModelPath}`，不会污染 ASR 设置。可信宿主可以调用 `resolveManagedLocalTts(config, signal)` 获取校验后的固定程序和 GGUF 路径；任意用户提供的程序路径不能进入解析器。首次引导“下载并使用”的应用意图由宿主按 job.id 独立保存，完成后先调用 `verifyInstalled`，再检查授权、配置版本和用户是否改过选择，最后应用。安装器不会替外部命令接受任意回调或默默切换配置。

归档提取测试覆盖路径穿越、链接、文件大小/哈希变化、输出符号链接与未知动态库拒绝；既有下载暂停/恢复/断网/崩溃/哈希/原子提交测试保留。2026-11-12 在云 Linux 对两个真实官方归档完成整包与内部文件校验，并通过本解析器提取；Linux 程序 `--version` 实跑成功。Windows 程序未在用户机器执行；这些检查不等于 Windows 合成验收或用户国内网络速度验证。


## Melo 轻量下载

`vits-melo-tts-zh_en-int8` 支持 Linux x64 / Windows x64：从 Hugging Face 固定提交下载 18 个模型/词典/许可文件，并从 npm registry 下载固定 1.13.8 的 `sherpa-onnx-node` 与一个对应平台原生包。没有 npm install、生命周期脚本或 Python 依赖安装；JS、原生模块、ONNX 共享库全部列入固定字节数和 SHA-256 清单。`runtime.source` 保留首个 URL，`runtime.sources` 列出两个完整下载 URL；计划和模型快照完全一致。国内镜像尚未核实，不声称是国内源。大权重只允许固定 Hugging Face CDN 路径重定向。

模型仅为这个 ID 允许固定 `dict/` 与 `dict/pos_dict/` 文件名白名单，下载文件数上限 24；其他模型仍使用原来的平面文件名和 12 文件上限。所有中间目录都拒绝符号链接。每个 npm 归档只提取固定普通文件到 `runtime/node_modules/<批准包名>`，批准包最多两个，不能嵌套更多依赖。应用前重新验证全部 JS、原生模块、库、许可及目录清单，并在隔离子进程尝试加载 `OfflineTts`。不从全局 npm 环境寻找替代组件。

Melo 模型 MIT、sherpa-onnx Apache-2.0、ONNX Runtime MIT 许可各自保留。Windows PE 检查发现 Melo 包内组件仅依赖已下载组件与系统 DLL，没有独立 MSVCP/VCRUNTIME 导入；没有执行 Windows 二进制，不能据此宣称用户设备可运行。Qwen Windows 包则要求系统已有 Microsoft Visual C++ x64 运行库和 UCRT，启动失败时明确提示修复；安装器不会自动安装系统组件。

非低配优先 Qwen。总内存低于 8 GiB 且可用至少 1 GiB 时，Melo 标记低内存推荐；这是按云 Linux 短句峰值约 256 MiB 留余量的启发式，不是最低要求或长句保证。总内存足够但被其他程序占用时，Qwen 标为 `busy-memory`，不会替用户自动改为 Melo。

2026-11-12 真整链检查：把已从公开源完整下载、校验过的字节离线重放到新的安装目录，执行 installer → 运行时解包/哈希 → resolver → `createTtsRuntime.verifyLocalTts`。Qwen 和 Melo 均返回 `synthesisVerified: true`、`localSynthesisSupported: true`，同时 `modelResident: false`、`acousticConfirmation: false`。这验证真实模型、最终安装布局与正式适配器接线，不代表这次重放测试验收了下载网络，也没有假装播放出声。Melo 公开短句输出 44.1 kHz WAV，约 2.04 秒音频、进程约 7.12 秒、峰值 RSS 261,860 KiB；Qwen 上下文 4096 短句峰值约 4.60 GiB。长文本、Windows 真机及用户国内网络仍需单独验证。

## 复用本机已有 Qwen 模型（issue #13）

在本地语音模型区域展开“高级：使用本机已有文件”，填写运行插件那台机器上的完整目录，选择 Q8_0 或 Q4_K_M，查看复用计划后点“验证并使用”。目录必须包含所选主模型和 `mmproj-Qwen3-TTS-12Hz-1.7B-Base-Q8_0.gguf`。不会扫描其他目录、自动寻找模型或在原目录写入文件。

- Q8_0 主模型 1,847,874,400 字节，SHA-256 `ac7931aeb2e7aad1a6ed6602d353a5679c9d096b18ce8204ac730a8408d572e1`；mmproj 446,422,912 字节，SHA-256 `6fd65188839bcd6ecc91b277ad471e22a0edfada4699a0fe82f1165c18cfcce2`。全部来自固定 model-catalog，不接受用户自报哈希替代。
- 两个权重均按完整字节数和 SHA-256 验证，全部通过后才开始任何网络请求。模型原地复用，不复制、不移动、不重新下载。任一文件缺少、不符、是链接或在校验时变化都停止，并指出失败文件；不会偷偷改成下载权重。
- 仍只使用固定、逐文件校验的官方 b12110 CPU 运行组件。当前步骤下载约 23.05 MB（Linux）或 24.71 MB（Windows）的运行组件归档，不会执行已有目录中的 build 12001 或其他程序。模型哈希一致不是两个 runtime 兼容的证据。
- `totalBytes` / `receivedBytes` 仅统计本次运行组件下载量；`reusedBytes` 单独表示复用模型大小。`reused: true`、`sourceDirectory`、`modelVariant` 保存到托管 job 和安装记录。原目录不可删除或移动；每次应用和正式合成前都会重新验证，缺失时停止而非重下。
- 取消只删除本任务的托管临时目录，不删除已有权重。重启后未完成任务暂停，不自动联网；已安装记录保留复用目录与量化选择。首次使用仍走既有无声短句合成验证，成功后才应用本地 TTS，不能把登记为 installed 当成合成已成功。

接口使用现有动作，不另开放任意程序路径：

```js
const reuse = { sourceDirectory: absoluteLocalDirectory, modelVariant: 'q8_0' }
const plan = installer.plan('qwen3-tts-base-1.7b-gguf', 'cpu', reuse)
const job = installer.start({
  modelId: plan.modelId, compute: 'cpu', ...reuse,
  planHash: plan.planHash, accepted: true,
})
```

UI / Agent 的 `plan-model-install` 和 `start-model-install` 均支持上述两个可选字段，且必须同时提供；其余安装授权、来源披露、停止状态与配置版本校验保留。`planHash` 绑定来源目录、量化版本、文件哈希和固定运行组件。修改目录或版本后必须重新取计划。

### 本次验证范围

新增离线回归覆盖 Q8 固定清单、目录/量化计划绑定、缺失/尺寸/同尺寸坏哈希、无网络失败、符号链接/硬链接拒绝、暂停/取消不改原文件、Q4/Q8 路径解析、下载字节独立统计、重启恢复与应用前篡改拒绝。合成小文件测试不是 Q8 真模型验收。

云 Linux 实际复用已有 Q4 权重和 Q8 mmproj，共 1,482,388,192 字节，运行组件从先前下载的真实 b12110 归档离线回放；只有运行组件请求，没有权重请求或权重复制。正式 installer → resolver → `createTtsRuntime.verifyLocalTts()` 返回 `synthesisVerified: true`、`localSynthesisSupported: true`、`modelResident: false`、`acousticConfirmation: false`。这不是实时网络下载或用户听感验收。

Q8 主模型的真实合成、build 12001 兼容性、用户 Windows 机器、国内网络与扬声器听感仍未验证。本次没有放宽旧运行组件信任边界，也没有将其标成与 b12110 一致。

### Windows 显卡信息

模型页面沿用宿主的后台硬件刷新，Windows 通过只读 DXGI 枚举读取专用显存和共享系统内存。专用显存展示的是单个硬件适配器的最大值，不累加多卡或虚拟显示重复条目，也不把共享内存算作显存。该信息仅用于硬件展示，不改变 CUDA/Vulkan 可用性、模型选择或下载条件。

查询使用系统 64 位 PowerShell，无窗口、无网络、无模型加载；单次输出限制 32 KiB、超时 8 秒，并发请求合并，进程内结果最多缓存 5 分钟。关闭安装器时取消并等待查询退出，退出状态不确定则保留隔离。非 Windows、权限/执行策略限制或查询失败时返回未知，不将 WMI 的 32 位 AdapterRAM 当作可靠显存。软件、远程和明确标记为虚拟显示的适配器不作为显存候选；不同 LUID 不冒充物理显卡数量。

已在 Windows RX 9070 设备上验证相同 DXGI 查询代码，包括系统 Windows PowerShell 5.1：专用显存 16,974,905,344 字节，共享内存 16,698,271,744 字节。独立的集成显卡专用显存为 509,353,984 字节。此验证不是模型 GPU 推理或完整安装后界面验收。

字段依据：[DXGI_ADAPTER_DESC1](https://learn.microsoft.com/en-us/windows/win32/api/dxgi/ns-dxgi-dxgi_adapter_desc1)；[Win32_VideoController 的 AdapterRAM 类型](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-videocontroller)。
