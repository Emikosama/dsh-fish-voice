# 0.5.14：Agent 后端操作与人工优先

本批在 0.5.13 紧凑浮窗、静默 RPC 基础上增加 `voice_manage`。快捷首页不加入权限或任务面板；权限与精确确认都在「设置 → 高级 → Agent 请求」。不发布 npm，不自动升级用户正在运行的宿主。

## 操作方式

- `action: inspect`：默认 `operation: capabilities`，返回支持的读取、操作、参数、权限与能力缺口。其他读取包括设置、状态、性能、朗读、模型目录/安装计划、语音历史、当前对话和输出音量。
- `action: execute`：执行已获普通权限的操作；关麦、停止试听、退出自由麦、暂停/取消模型下载可直接执行，但仍经过原来的会话归属检查。没有普通权限或涉及敏感操作时只返回 `confirmation-required`，并不执行。
- `action: prepare`：始终只准备计划，即使该普通操作已经允许自主执行。
- `action: request-status` 与 `requestId`：查询本来源会话的请求。
- `action: cancel` 与 `requestId`：撤销本来源会话尚未执行的请求。不能把执行中的操作谎报为已撤销。

参数示例：先 inspect/read-settings 取得真实 revision，再 execute/set-performance-mode，params 为 `{ "revision": "读取所得版本", "performanceMode": "fast" }`。保存音频与模型设置仍需完整 values。save-tts 必须省略 edgeTextTransmissionAccepted；start-model-install 接收 modelId/compute 及可选 useWhenReady，来源、许可、哈希和 accepted 由服务端计划及主人决定。首次引导预选 Edge 晓伊，由主人确认在线朗读。需要离线朗读时可选择 `vits-melo-tts-zh_en-int8` 和 `cpu`，经现有下载授权启动并传 `useWhenReady: true`，静默合成验证后应用。

## 普通功能不必每次确认

普通音频、按键、本地模型、朗读方式、速度、显示、音量与首次配置完成状态可直接由 Agent 修改，应用已验证的安装结果也不再询问。无需首次授权点击或解除旧人工固定值。`request-owner-change` 是配置执行兼容别名，不再使用宿主提问服务。

新的人工操作仍中止并发计划；过期 revision、显式撤销总授权或对应普通配置权限、未知结果仍阻止执行。设置权限本身只有 owner Remote 通道能操作，Agent 工具没有授权接口。旧存储结构继续可读，默认空 scopes 与明确撤权分开处理。

## 运行操作仍核对授权范围

开麦/接管麦克风、持续监听、切换语音对话、Edge 文本传输同意、模型下载许可等不能使用普通许可。主人可以在高级页查看来源会话、现有配置、完整请求、下载来源/许可/大小/位置，然后逐项确认或拒绝。已有明确范围授权时 voice_listen(enable/always-on) 可直接执行，不能绕过授权边界；已授权录音 start/stop 保留原行为。

Agent 不能传入 human/source/actor/approval/accepted 自批，也不能声明已佩戴耳机或自行勾选 Edge 同意。耳机事实和文本传输是明确的独立确认项。既有敏感文本发送规则仍适用，选择 Edge 不等于允许发送任何敏感内容。

## 并发、失效和未知结果

请求绑定服务端实际存活的 Agent 对象，不仅检查同名 session ID。请求包含配置版本、运行中归属/epoch、权限版本与 10 分钟期限。人工操作优先，使旧请求失效并中止尚在等待的请求。重启不会重放或恢复待确认请求。每个来源最多 5 个待确认请求，全局最多 20 个，历史最多 100 个。

下载前再次核对计划；原来的 CAS、完全关麦检查、原生会话身份、安装字节校验等都保留。任意执行后异常均标为 unknown，不声称「失败且未改变」。自主普通操作出现未知结果时撤销对应权限，防止盲目自动重试。界面丢失确认响应也锁住相应写入口，先读回状态再处理。文件 CAS 无法替代外部程序的 OS 级事务锁；同进程人工操作与插件写入有明确顺序和取消信号。

## 本批边界

这是后端操作接口批次，不声称整个桌面所有功能都已自动化。动效偏好、折叠和拖动位置仍属于浏览器本地状态，capabilities 明确返回 localUi.supported=false；尚无跨浏览器控制通道。未验证的 Qwen 模型、GPU 加速、声音克隆等能力不会因 Agent 接口变成已支持。

## 验证

新增离线回归覆盖全部 17 个后端变更计划、伪造批准、精确身份、计划失效/拒绝/重启、来源/许可变化、人工覆盖、普通自主权限、未知结果与落盘 CAS。真实 Host/Client Gateway 验证 guest 无法确认请求或修改权限。历史 Chromium fixture 不代表本次真实 renderer 已验收；本次修改以纯 Node 回归为准。

测试使用合成数据与假录音/helper，不代表用户 Windows 实机麦克风、扬声器、GPU 或真实模型下载已验收。

## 同批修复 #9 / #10

- #9：0.5.13 的 fixture 把 remote 当作普通对象，漏掉了 Cordis 的带点服务注入检查。现改为先 `$mount` 契约，再以声明了 `remote` 和 `remote.whaleConversation` 的子上下文调用它；不能简单在创建它的顶层插件上等待该服务，否则会形成依赖循环。真实 Gateway 正反例分别验证挂载后绑定可用、遗漏 namespace 的旧式访问必定失败。浏览器 fixture 也改用真正的 Cordis Service。首页只显示简短处理提示，原始错误保留在高级诊断中。
- #10：身份故障注入原用 `ino += 1`，NTFS inode 超出 Number 安全整数范围时可能没有改变实际值，落入故意抛 EPERM 的 truncate mock。现用必定不同的 inode 哨兵并检查确实改变，仍严格要求 UNSAFE_PATH、零次 truncate、关闭句柄。新增独立 open EPERM 拒绝用例与大 inode 的确定性复现。没有放宽身份断言；未取得用户本机原始 inode 值，不把可能原因冒称为已观察到的本机事实。
