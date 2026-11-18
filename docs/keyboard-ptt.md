# Keyboard push to talk

`pttKeyboard` defaults to `null`. A binding is `{ "code": "Space", "modifiers": ["Control", "Alt"] }`.

- Native global keyboard capture requires Windows `WH_KEYBOARD_LL`. Other platforms report unsupported. No browser-only listener is represented as a global binding.
- Primary codes: `F1`–`F24`, `KeyA`–`KeyZ`, `Digit0`–`Digit9`, `Space`. Letter and digit bindings refer to physical key positions. Function keys and Space use their layout-independent Windows virtual keys.
- Modifier names: `Control`, `Alt`, `Shift`, canonical order as listed, no duplicates. Either left or right modifier works. `Meta` combinations and `Alt+F4` are rejected as reserved. This is not a guarantee against shortcuts registered by other applications.
- Keys are never swallowed. An unmodified printable key or Space is global and can also type into other apps. Prefer a deliberate chord. Nothing is enabled by default.
- Press all required modifiers before the primary key. Releasing any participating modifier or the primary key ends the take. Repeating the primary key cannot restart a recording; even after timeout or cancellation, release the primary key before pressing again.
- Escape, a foreground-window change, loss of authorization, binding reconfiguration, helper/hook stop, or a detected missing release cancels the owned take without submitting it. The normal recording maximum (`pttMouseMaxSeconds`, default 15 seconds) applies.
- Existing `pttMouse` 0/1/2 remains supported. Keyboard and mouse share the recording pipeline and cannot release another control's recorder.

## UI contract

`settings.values.pttKeyboard` carries the binding. The existing `save-settings` CAS revision and origin checks apply. Saving does not grant microphone access or start a helper. Hook reconfiguration occurs at the helper's next `status`/`ptt-status`, including the next explicit voice-enable operation. A currently held keyboard take checks for configuration/authorization changes and cancels safely. The dedicated binding editor records keys only after a host-owned capture lease confirms native PTT is gated; key release, cancellation, blur and teardown restore the previous binding. Its `save-bindings` action can apply bindings while voice remains enabled, using a fenced helper prepare/commit/abort transaction. The legacy general `save-settings` path still requires a fully stopped session for binding changes.

`settings.capabilities.pttKeyboard` describes platform support only: `{ supported, scope: 'global', platform: 'win32', status: 'available' | 'unsupported', reason }`. It does not prove a hook was installed.

`status.ptt.keyboard` is null before an observed helper snapshot. Otherwise it contains `supported`, `scope`, `status` (`active`/`inactive`/`unsupported`/`unknown`), `hookInstalled`, `recording`, `hookError`, `reason`, and `observedAt`. It is a timestamped cached observation, not a live meter. No automatic status read starts the helper.

## Verification

Deterministic tests use substituted recorders, configuration and window/key readers. They never install system hooks, open a microphone or load a model. Windows live hook delivery, keyboard-layout behavior, session/secure-desktop boundaries and audio round trips still require Windows acceptance testing.

从 rc.24 起，点「录入按键」后直接读取实体键的位置，中文输入法组合过程中也可录入。松开主键和修饰键后再保存。Windows 帮工按相同位置触发字母和主键盘数字绑定。旧配置中的 Key、Digit 名称现在也表示物理位置；曾在非 QWERTY 布局下按字符绑定的用户，可重新录入想用的键位。

## Live binding updates

The owner UI sends only `pttMouse`, `pttKeyboard`, the settings revision and the observed owner/epoch/root context. The host serializes the transaction with voice permission changes, never starts a helper, grants microphone access or changes the voice root. While PTT recording or processing is in flight, the request is rejected; the user can release the key and retry after completion.

The helper confirms old hook and worker exit before installing new hooks. New hooks stay gated until the config write and commit are confirmed and all related keys are released. The host reconciles lost replies with a transaction receipt before compensation. An unconfirmed result blocks further binding transactions; restart the host and inspect the saved binding before using PTT. Free-mic capture is not intentionally stopped. These guarantees are covered by cloud tests with simulated hooks; Windows device latency and native hook behavior still require real-device validation.
