# 鱼应包名迁移

鱼应在 DSH 中的安装标识为 `dsh-fish-voice`。已安装 `dsh-whale-voice` 或更早 `dsh-whale-ear` 的用户按以下步骤升级。

1. 关闭语音并保存工作。备份当前 profile 的 `cordis.patch.yml` 和 `$DSH_HOME/whale-ear/`，保留旧安装包以便回退。
2. 在 DSH 插件管理器停用旧 bundle。曾手工挂载核心或独立 `dsh-whale-ear-ui` 的用户也需要停用这些条目。新旧包只启用一份。
3. 在 DSH 插件管理器按 [鱼应发布页](https://www.npmjs.com/package/dsh-fish-voice) 的说明安装，或选取 [单包安装指南](install-single-package.md) 生成的完整包。点击「立即启用」并重启 DSH。
4. 打开鱼应设置，核对音色、设备、模型及「会话管理」中的历史，再按需打开麦克风。

已有配置、模型缓存、声纹和语音会话继续沿用原路径。鱼应保留激活行 `id: dsh-whale-ear`，方便现有 profile override 按 ID 继续定位。如果自定义配置的行还按旧模块名导入或匹配，将该字段改为 `name: dsh-fish-voice`，保留该行配置值。

要回退，先关麦并停用鱼应，再恢复旧安装包及其 profile 注册，重启 DSH。请保留当前的配置和会话目录。
