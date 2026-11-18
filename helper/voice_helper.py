# -*- coding: utf-8 -*-
"""dsh-whale-ear / 语音帮工（常驻，stdin/stdout 一行一个 JSON）

为什么是一个常驻进程：
    SenseVoice / CAM++ / faster-whisper 每次冷加载要几秒到十几秒。按「一次调用起一个
    python」的做法，按一下说话就得等模型重载，体验是死的。所以这里常驻，模型懒加载、
    只加载一次。

协议（一行一个 JSON，UTF-8，不 BOM）：
    入站  {"op":"start"}                     开始一次 PTT 录音（静音 1.2s 或最长 15s 自动停）
          {"op":"stop"}                      立刻结束当前录音
          {"op":"cue", ...}                  已确认耳机的独立提示音（带授权/turn/generation）
          {"op":"cue-cancel", ...}           取消过期提示，不碰 TTS 或麦克风
          {"op":"always","enabled":true}     开自由麦（默认有效语音直投；实验开关开启才用唤醒筛选）
          {"op":"always","enabled":false}    关常听
          {"op":"always-status"}             常听状态（含语义初筛状态与窗口摘要）
          {"op":"recent"}                    v0.3：当前滚动窗口（最近 windowSec 秒过了垃圾过滤的段）
          {"op":"enroll","name":"主人"}       录 ~8s 注册声纹
          {"op":"transcribe","path":"..."}   转写本地文件
          {"op":"prosody","path":"..."}      只算韵律
          {"op":"status"}                    状态（含语义服务探测）
          {"op":"ping"}                      探活
          {"op":"quit"}                      退出
    出站  {"event":"ready", ...}             帮工起来了
          {"event":"voice-input", ...}       start/end/cancel 和最后有声帧/松键时间
          {"event":"cue", ...}               提示音 requested/played/unsupported/cancelled
          {"event":"started"}                PTT 已开始
          {"event":"stopped"}                PTT 收到停止
          {"event":"recording", ...}         录音结束，正在识别
          {"event":"transcript", ...}        识别结果（含情感 / 声纹 / 韵律；常听段还有 recent / semantic_score）
          {"event":"recent", ...}            滚动窗口快照
          {"event":"enrolled","name":...,"samples":n}
          {"event":"prosody", ...}
          {"event":"status", ...}
          {"event":"error","message":"..."}
          {"event":"pong"}

约束：
    · 每条命令都可以失败，失败只回 error，绝不把整个帮工带崩（外层 try/except 兜住循环）。
    · 每个长任务是独立线程 + 看门狗；超时回 error 而不是挂死主循环。
    · 录音设备可配（config.device，null = 系统默认输入）。
"""

import ctypes
import gzip
import importlib.util
import json
import statistics
import os
import math
import queue
import unicodedata
import sys
import threading
import time
import traceback
import urllib.error
import urllib.request
from contextlib import contextmanager, nullcontext
from functools import lru_cache
from collections import deque
from difflib import SequenceMatcher

# The sibling is a packaged, pure device helper; importing it never opens audio.
import importlib.util as _device_import
_device_spec = _device_import.spec_from_file_location("whale_audio_devices", os.path.join(os.path.dirname(__file__), "audio_devices.py"))
_audio_devices = _device_import.module_from_spec(_device_spec)
_device_spec.loader.exec_module(_audio_devices)

# The loopback ASR/PCM adapter is stdlib-only and is safe to load at startup.
_wasm_spec = _device_import.spec_from_file_location("whale_asr_wasm", os.path.join(os.path.dirname(__file__), "whale_asr_wasm.py"))
_whale_asr_wasm = _device_import.module_from_spec(_wasm_spec)
_wasm_spec.loader.exec_module(_whale_asr_wasm)

_wake_spec = _device_import.spec_from_file_location("whale_wake_acoustic", os.path.join(os.path.dirname(__file__), "wake_acoustic.py"))
_wake_acoustic = _device_import.module_from_spec(_wake_spec)
_wake_spec.loader.exec_module(_wake_acoustic)

SR = 16000
FRAME = 320  # 20ms @16k

HOME = os.environ.get("DSH_HOME") or os.path.join(os.path.expanduser("~"), ".dsh")
DATA_DIR = os.path.join(HOME, "whale-ear")
CONFIG_PATH = os.path.join(DATA_DIR, "config.json")
VOICEPRINTS_PATH = os.path.join(DATA_DIR, "voiceprints.json")

DEFAULT_MODELS = {
    "campplus": os.path.join(DATA_DIR, "models", "campplus.onnx"),
    "sileroVad": os.path.join(DATA_DIR, "models", "silero_vad.onnx"),
    "sensevoiceDir": os.path.join(DATA_DIR, "models", "sensevoice"),
    "whisper": os.path.join(DATA_DIR, "models", "whisper"),
}

DEFAULTS = {
    "asr": "sensevoice",          # sensevoice | whisper
    "modelCompute": "cpu",       # cpu | auto | cuda; existing installs remain CPU-only
    "retainRecordings": False,     # Manual diagnostic opt-in only; never enabled by a voice tool.
    "device": None,               # null = 系统默认输入；也可写设备序号/名字
    "threshold": 0.5,             # 声纹余弦阈值
    "sampleRate": SR,
    "models": DEFAULT_MODELS,
    "vad": {
        "frameMs": 20,
        "minRms": 0.006,
        "noiseMult": 1.8,
        "silenceMs": 1200,
        "minSpeechMs": 300,
        "maxRecordMs": 15000,
        "noSpeechMs": 5000,
        "startFrames": 3,
    },
    "enrollSeconds": 8.0,
    "numThreads": 4,
    # Experimental speaker matching. Enrollment remains available when disabled.
    "speakerVerification": {"enabled": False},
    "turnSignals": {"enabled": True, "volume": 0.2, "headphonesConfirmed": False,
                    "experimentalAutomaticBargeIn": False},
    # ---- 鼠标侧键按住说话（全局低级鼠标钩子；0=关, 1=XButton1, 2=XButton2）----
    "pttKeyboard": None,         # {code: "F8", modifiers: []}; Windows global hold
    "pttMouse": 2,                # 默认前进键（XButton2）；0 = 关掉侧键 PTT
    "pttMouseMaxSeconds": 15.0,   # 按住最长多久（到点自动停，仍算一次有效投递）
    # ---- 自由麦（listenMode=ptt 时完全不影响现有 PTT 行为）----
    "listenMode": "ptt",          # ptt | always | wake; only after a voice grant
    "wakeWordAliases": ["小鲸鱼"],  # Independent mode; never inherits legacy fuzzy aliases.
    "wakeListenTimeoutMs": 10000,  # One next utterance, not a continued-conversation window.
    "wakeWords": ["依依", "一一", "一依", "依一", "伊伊", "小鲸鱼", "emik", "emiko"],
    "conversationWindowMs": 30000,  # 唤醒后对话模式窗口
    "idleExitMs": 25000,            # 对话模式里静音多久自动退出
    "alwaysMinSpeechMs": 350,       # 常听一段语音的最短有效时长
    "alwaysSilenceMs": 600,         # 段间静音多久收段
    "alwaysMaxSegmentMs": 15000,    # 单段最长
    # ---- v0.3 语义初筛 + 滚动窗口 ----
    "windowSec": 60,                # 「最近」窗口：最近多少秒的段进投递上下文
    "semantic": {
        "enabled": False,           # Legacy field retained for old config readers, not an opt-in.
        "experimentalEnabled": False,  # Explicit opt-in to wake-word/semantic gating.
        "url": "http://127.0.0.1:8093/v1/embeddings",
        "model": "qwen3-embed-4b",
        "threshold": 0.62,          # max(cos(句, 参考句)) >= 它 = 疑似在叫我
        "timeoutMs": 2000,
        "refs": ["依依", "在吗", "在不在", "帮我看看", "你觉得呢", "陪我说说话"],
    },
}

_log_lock = threading.Lock()


def _merge(base, over):
    out = dict(base)
    for k, v in (over or {}).items():
        if isinstance(v, dict) and isinstance(out.get(k), dict):
            out[k] = _merge(out[k], v)
        else:
            out[k] = v
    return out


def load_config():
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8-sig") as fh:
            live = json.load(fh)
        if isinstance(live, dict):
            merged = _merge(DEFAULTS, live)
            # A valid Node-provided binding selects the new route only when
            # the user has not explicitly selected a legacy ASR engine.
            if "asr" not in live and _whale_asr_wasm.binding_from_env() is not None:
                merged["asr"] = "whisper-wasm"
            return merged
    except Exception:
        pass
    defaults = dict(DEFAULTS)
    if _whale_asr_wasm.binding_from_env() is not None:
        defaults["asr"] = "whisper-wasm"
    return defaults


CFG = load_config()


def cfg(*path, default=None):
    cur = CFG
    for key in path:
        if not isinstance(cur, dict) or key not in cur:
            return default
        cur = cur[key]
    return cur if cur is not None else default


def asr_engine():
    return str(cfg("asr", default="sensevoice") or "sensevoice").strip().lower()


def _stdlib_pcm_route():
    return asr_engine() == "whisper-wasm"


# Explicitly propagate command context to worker threads. Background microphone,
# cue and always-on events remain unsolicited rather than borrowing a waiter.
_request_context = threading.local()
_capture_id = os.urandom(12).hex()
_TERMINAL_EVENTS = {"error", "transcript", "prosody", "enrolled"}


def emit(event, _recording=None, **fields):
    context = getattr(_request_context, "current", None)
    if event in {"voice-input", "cue", "always-event", "always-drop", "wake-state", "inference-compute"}:
        context = None
    # A captured input can be cancelled after ASR or even after the final
    # configuration read. Commit its protocol result under the same lock as
    # cancellation, in watchdog-compatible context -> recorder lock order.
    with context["lock"] if context is not None else nullcontext():
        with _rec_lock if _recording is not None else nullcontext():
            if _recording is not None:
                rec, generation = _recording
                if getattr(rec, "cancelled", False) or generation != _gen:
                    return
            if context is not None:
                if context.get("done"):
                    return
                if event in _TERMINAL_EVENTS and context.get("watchdog"):
                    context["done"] = True
                    context["timer"].cancel()
                if context.get("requestId") is not None:
                    fields["requestId"] = context["requestId"]
            if _recording is not None:
                rec.result_emitted = True
            _emit_payload(event, fields)


def _emit_payload(event, fields):
    payload = {"event": event}
    payload.update(fields)
    line = json.dumps(payload, ensure_ascii=False, default=_json_default)
    with _log_lock:
        try:
            sys.stdout.write(line + "\n")
            sys.stdout.flush()
        except Exception:
            pass


def _json_default(value):
    try:
        return float(value)
    except Exception:
        return str(value)


def log(msg):
    """stderr 只给人看，不参与协议。"""
    try:
        sys.stderr.write("[whale-ear] " + str(msg) + "\n")
        sys.stderr.flush()
    except Exception:
        pass


_DEBUG = os.environ.get("WHALE_DEBUG") not in (None, "", "0", "false")


def dbg(msg):
    if _DEBUG:
        log(msg)


class StageTimings:
    """Monotonic, content-free processing measurements (not end-to-end latency)."""

    def __init__(self):
        self.started = time.perf_counter()
        self.values = {}
        self.trace_id = os.urandom(8).hex()

    @contextmanager
    def stage(self, name):
        start = time.perf_counter()
        try:
            yield
        finally:
            self.values[name] = round((time.perf_counter() - start) * 1000, 3)

    def snapshot(self):
        return {**self.values, "processingMs": round((time.perf_counter() - self.started) * 1000, 3)}


# Content-free turn signals. Cue playback never gates microphone capture or ASR.
# Output routing is explicitly opt-in: energy VAD is NOT an echo canceller.
_cue_lock = threading.Lock()
_cue_stop = threading.Event()
_cue_turn_id = None
_cue_phase = "idle"
_input_sequence = 0


def _cue_invalidate(turn_id=None, phase="idle"):
    global _cue_stop, _cue_turn_id, _cue_phase
    with _cue_lock:
        _cue_stop.set()
        _cue_stop = threading.Event()
        _cue_turn_id = turn_id
        _cue_phase = phase


class InputTurn:
    """One input turn, in epoch milliseconds shared with the Node scheduler."""

    def __init__(self, mode):
        self.mode = mode
        self.id = os.urandom(12).hex()
        self.session_id = cfg("voiceSessionId")
        self.epoch = cfg("voiceSessionEpoch")
        self.capture_id = _capture_id
        self.last_voiced_at = None
        self.started = False
        self.finished = False
        self.cancelled = False
        self.released_at = None
        self.sequence = None

    def _emit(self, state, **fields):
        emit("voice-input", state=state, mode=self.mode, inputTurnId=self.id,
             voiceSessionId=self.session_id, voiceSessionEpoch=self.epoch,
             inputSequence=self.sequence, captureId=self.capture_id, **fields)

    def _assign_sequence(self):
        global _input_sequence
        if self.sequence is not None or not self.session_id:
            return
        with _cue_lock:
            _input_sequence += 1
            self.sequence = _input_sequence
        return True

    def attempt(self):
        """Identify work without claiming that the microphone has opened."""
        if self._assign_sequence():
            self._emit("attempt")

    def fail(self, code):
        # Only a closed vocabulary crosses the live UI boundary. Diagnostic
        # exceptions may contain recognized speech, paths, or device names.
        if self.sequence is not None and not self.cancelled and code in ("device", "recognition", "no-speech"):
            self._emit("error", code=code)

    def start(self, at=None):
        if self.started or self.finished or not self.session_id:
            return
        self._assign_sequence()
        self.started = True
        _cue_invalidate(self.id, "listening")
        self._emit("start", at=time.time() * 1000 if at is None else at)

    def voiced(self, at):
        if not self.finished:
            self.last_voiced_at = float(at)

    def end(self, reason="silence", at=None):
        global _cue_phase
        if self.finished or not self.started:
            return
        if self.last_voiced_at is None:
            self.cancel("no-speech")
            return
        self.finished = True
        with _cue_lock:
            if _cue_turn_id == self.id:
                _cue_phase = "processing"
        end_at = self.released_at if self.released_at is not None else self.last_voiced_at
        self._emit("end", reason=reason, endAt=end_at, lastVoicedAt=self.last_voiced_at,
                   releasedAt=self.released_at,
                   detectedAt=time.time() * 1000 if at is None else at)

    def cancel(self, reason="cancelled", allow_ended=False):
        global _cue_phase
        # Explicit cancellation also withdraws an ended input still in ASR.
        # Ordinary finish cleanup must not cancel an already submitted input.
        if self.cancelled or (self.finished and not allow_ended):
            return
        self.cancelled = True
        self.finished = True
        with _cue_lock:
            if _cue_turn_id == self.id:
                _cue_stop.set()
                _cue_phase = "idle"
        if self.started:
            self._emit("cancel", reason=reason)


def cue_status():
    enabled = cfg("turnSignals", "enabled", default=True) is not False
    headphones = cfg("turnSignals", "headphonesConfirmed", default=False) is True
    return {"protocol": "whale-input-cue/1", "enabled": enabled,
            "available": enabled and headphones,
            "acousticIsolation": "headphones-confirmed" if headphones else "none",
            "reason": None if enabled and headphones else
            "disabled" if not enabled else "headphones-not-confirmed",
            "verifiedAec": False}


def _cue_wave(kind, volume, sample_rate=48000):
    """Short synthesized ding/dong; no downloaded assets or new dependencies."""
    if _stdlib_pcm_route():
        duration = 0.055 if kind == "start" else 0.075
        count = int(duration * sample_rate)
        hz = 1174.66 if kind == "start" else 523.25
        values = []
        for index in range(count):
            t = index / sample_rate
            envelope = min(t / 0.004, 1.0) * math.exp(-t / (duration / 3))
            envelope *= min((duration - t) / 0.008, 1.0)
            values.append(float(volume) * 0.18 * envelope *
                          (math.sin(2 * math.pi * hz * t) +
                           0.2 * math.sin(2 * math.pi * hz * 2 * t)))
        return _whale_asr_wasm.Float32Audio.from_samples(values)
    import numpy as np
    duration = 0.055 if kind == "start" else 0.075
    count = int(duration * sample_rate)
    t = np.arange(count, dtype="float32") / sample_rate
    hz = 1174.66 if kind == "start" else 523.25
    envelope = np.minimum(t / 0.004, 1.0) * np.exp(-t / (duration / 3))
    envelope *= np.minimum((duration - t) / 0.008, 1.0)
    # Conservative gain: user volume is still an explicit 0..1 scalar.
    return (float(volume) * 0.18 * envelope *
            (np.sin(2 * np.pi * hz * t) + 0.2 * np.sin(2 * np.pi * hz * 2 * t))).astype("float32")


def op_cue(msg):
    """Schedule output only. Never mute/discard microphone frames to hide cues."""
    reload_cfg()
    turn_id = msg.get("inputTurnId")
    kind = msg.get("kind")
    base = {"inputTurnId": turn_id, "kind": kind, "generation": msg.get("generation"),
            "voiceSessionId": msg.get("voiceSessionId"), "voiceSessionEpoch": msg.get("voiceSessionEpoch")}
    cap = cue_status()
    if not cap["available"]:
        emit("cue", status="unsupported", reason=cap["reason"], **base)
        return
    if kind not in ("start", "end"):
        emit("cue", status="unsupported", reason="unknown-cue", **base)
        return
    # Commands must name the live input turn and the same authorization epoch.
    if (msg.get("voiceSessionId") != cfg("voiceSessionId") or not cfg("voiceSessionId")
            or msg.get("voiceSessionEpoch") != cfg("voiceSessionEpoch")):
        emit("cue", status="unsupported", reason="stale-permission", **base)
        return
    with _cue_lock:
        if turn_id != _cue_turn_id or _cue_phase not in (("listening",) if kind == "start" else ("processing",)):
            emit("cue", status="cancelled", reason="stale-turn", **base)
            return
        stop = _cue_stop
    volume = cfg("turnSignals", "volume", default=0.2)
    if isinstance(volume, bool) or not isinstance(volume, (float, int)):
        volume = 0.2
    volume = min(1.0, max(0.0, float(volume)))
    if not volume:
        emit("cue", status="disabled", **base)
        return

    def play():
        try:
            reload_cfg()
            if (not cue_status()["available"] or msg.get("voiceSessionId") != cfg("voiceSessionId")
                    or msg.get("voiceSessionEpoch") != cfg("voiceSessionEpoch")):
                emit("cue", status="unsupported", reason="playback-permission-changed", **base)
                return
            wave = _cue_wave(kind, volume)
            if stop.is_set():
                return
            selected_output = CFG.get("outputDevice", cfg("turnSignals", "outputDevice"))
            if sys.platform != "win32" and isinstance(selected_output, dict):
                raise RuntimeError("OUTPUT_DEVICE_UNAVAILABLE")
            if sys.platform == "win32" and (selected_output is None or isinstance(selected_output, dict)):
                pcm = (wave.to_pcm16_bytes() if isinstance(wave, _whale_asr_wasm.Float32Audio)
                       else (wave.clip(-1, 1) * 32767).astype("<i2").tobytes())
                _audio_devices.play_cue(pcm, 48000, selected_output, stop)
                if not stop.is_set():
                    emit("cue", status="played", **base)
                return
            import sounddevice as sd
            # Own output stream, not sd.play()/sd.stop(): never stop another
            # backend's TTS or microphone stream as a side effect of a cue.
            with sd.RawOutputStream(samplerate=48000, blocksize=240,
                                    device=selected_output,
                                    channels=1, dtype="float32") as output:
                for offset in range(0, len(wave), 240):
                    if stop.is_set():
                        output.abort()
                        return
                    output.write(wave[offset:offset + 240].tobytes())
            if not stop.is_set():
                emit("cue", status="played", **base)
        except Exception as exc:
            log("cue playback failed: %s" % type(exc).__name__)
            emit("cue", status="unsupported", reason="output-device-unavailable", **base)

    emit("cue", status="requested", **base)
    threading.Thread(target=play, name="whale-cue", daemon=True).start()


def op_cue_cancel(msg):
    # Node cancels on response start, revocation and disposal, even if the
    # helper's ASR thread is still processing an earlier segment.
    reload_cfg()
    if (msg.get("voiceSessionId") != cfg("voiceSessionId")
            or msg.get("voiceSessionEpoch") != cfg("voiceSessionEpoch")):
        return
    # A new onset has already invalidated its predecessor in the helper.
    # Do not let a delayed cancel for that predecessor invalidate the new turn.
    with _cue_lock:
        requested_turn = msg.get("inputTurnId")
        if msg.get("reason") == "new-input" or (requested_turn is None and msg.get("reason") == "voice-input"):
            return
        if requested_turn is not None and requested_turn != _cue_turn_id:
            return
    _cue_invalidate()


# ---------------------------------------------------------------------------
# 模型（懒加载，各自只加载一次）
# ---------------------------------------------------------------------------

_models = {}
_models_lock = threading.Lock()
# Hold through lazy segment iteration as well as load/cache replacement. Native
# calls cannot be forcibly stopped; cancellation only prevents further work.
_whisper_inference_lock = threading.RLock()
_whisper_state = {}
_sensevoice_key = None
_inference_context = threading.local()
_compute_status_lock = threading.Lock()
_compute_status = None
_compute_status_key = None
_compute_config_epoch = 0
_BACKEND_ERRORS = (RuntimeError, ValueError, OSError, ImportError, MemoryError)


class _InferenceCancelled(RuntimeError):
    pass


@contextmanager
def _inference_authorization(predicate):
    previous = getattr(_inference_context, "predicate", None)
    _inference_context.predicate = predicate
    try:
        yield
    finally:
        _inference_context.predicate = previous


def _inference_allowed():
    context = getattr(_request_context, "current", None)
    if context is not None and context.get("done"):
        return False
    predicate = getattr(_inference_context, "predicate", None)
    if predicate is not None and not predicate():
        return False
    # The predicate may perform a config read while the request times out.
    return context is None or not context.get("done")


def _check_inference_allowed():
    if not _inference_allowed():
        raise _InferenceCancelled("识别任务已取消或授权已撤回。")


def _requested_compute():
    requested = cfg("modelCompute", default="cpu")
    if requested not in ("cpu", "auto", "cuda"):
        raise ValueError("modelCompute 必须为 cpu、auto 或 cuda。")
    return requested


def _compute_key(engine, requested):
    path = (_sensevoice_dir() if engine == "sensevoice" else
            cfg("models", "whisper", default=DEFAULT_MODELS["whisper"]) or DEFAULT_MODELS["whisper"])
    return (engine, str(path), requested, _compute_config_epoch)


def inference_compute_status():
    """Content-free snapshot; reading status never imports/probes a backend."""
    if asr_engine() == "whisper-wasm":
        return {"requested": "cpu", "actual": None, "engine": "whisper-wasm",
                "computeType": "float32", "deviceIndex": None,
                "fallbackReason": None, "validated": False}
    engine = "whisper" if str(cfg("asr", default="sensevoice")).lower() == "whisper" else "sensevoice"
    requested = cfg("modelCompute", default="cpu")
    if requested not in ("cpu", "auto", "cuda"):
        requested = "cpu"
    with _compute_status_lock:
        if _compute_status_key == _compute_key(engine, requested) and _compute_status is not None:
            return dict(_compute_status)
    return {"requested": requested, "actual": None, "engine": engine, "computeType": None,
            "deviceIndex": None, "fallbackReason": None, "validated": False}


def _publish_compute(key, actual=None, compute_type=None, device_index=None, reason=None, validated=False):
    global _compute_status, _compute_status_key
    # Values are exclusively closed internal choices, never native exception
    # strings, audio, model paths, or hardware-identifying diagnostics.
    status = {"requested": key[2], "actual": actual, "engine": key[0], "computeType": compute_type,
              "deviceIndex": device_index, "fallbackReason": reason, "validated": bool(validated)}
    engine = "whisper" if str(cfg("asr", default="sensevoice")).lower() == "whisper" else "sensevoice"
    if key != _compute_key(engine, cfg("modelCompute", default="cpu")):
        return  # A completed old selection must not overwrite the new UI state.
    with _compute_status_lock:
        changed = _compute_status_key != key or _compute_status != status
        _compute_status_key, _compute_status = key, status
    if changed:
        emit("inference-compute", inferenceCompute=dict(status))


@lru_cache(maxsize=1)
def _compute_backend_module():
    # Load the sibling explicitly, also when tests/embedder load this helper
    # with spec_from_file_location rather than putting helper/ on sys.path.
    spec = importlib.util.spec_from_file_location("whale_model_compute", os.path.join(os.path.dirname(__file__), "model_compute.py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _probe_whisper_gpu():
    try:
        import ctranslate2
        return _compute_backend_module().select_whisper_gpu(ctranslate2)
    except (ImportError, AttributeError, TypeError, ValueError, RuntimeError, OSError, MemoryError):
        return None


def _sensevoice_dir():
    return cfg("models", "sensevoiceDir", default=DEFAULT_MODELS["sensevoiceDir"])


def get_recognizer():
    global _sensevoice_key
    requested = _requested_compute()
    key = _compute_key("sensevoice", requested)
    # Check before returning an already-cached CPU model: explicit cuda must
    # never silently inherit a model loaded under a different setting.
    if requested == "cuda":
        _publish_compute(key, reason="model-gpu-unverified")
        raise RuntimeError("该 SenseVoice INT8 模型的 GPU 组合尚未验证，请选择 CPU 或自动。")
    reason = "model-gpu-unverified" if requested == "auto" else None
    with _models_lock:
        if _models.get("sensevoice") is not None and _sensevoice_key == key:
            return _models["sensevoice"]
        import sherpa_onnx

        _check_inference_allowed()
        base = key[1]
        rec = sherpa_onnx.OfflineRecognizer.from_sense_voice(
            model=os.path.join(base, "model.int8.onnx"),
            tokens=os.path.join(base, "tokens.txt"),
            use_itn=True,
            language="auto",
            num_threads=int(cfg("numThreads", default=4) or 4),
        )
        _models["sensevoice"] = rec
        _sensevoice_key = key
        _publish_compute(key, actual="cpu", reason=reason)
        return rec


def get_whisper(_key=None):
    with _whisper_inference_lock:
        key = _key or _compute_key("whisper", _requested_compute())
        _check_inference_allowed()
        if _whisper_state.get("key") != key:
            _models.pop("whisper", None)
            _whisper_state.clear()
            _whisper_state.update(key=key, runtime_key=None, gpu=None, fallbackReason=None)
            _publish_compute(key)
            if key[2] != "cpu":
                _whisper_state["gpu"] = _probe_whisper_gpu()
                if _whisper_state["gpu"] is None:
                    _whisper_state["fallbackReason"] = "gpu-unavailable"
        gpu = _whisper_state["gpu"] if not _whisper_state["fallbackReason"] else None
        device, precision, index = ("cuda", gpu["computeType"], gpu["deviceIndex"]) if gpu else ("cpu", "int8", None)
        runtime_key = (key, device, precision, index)
        if _models.get("whisper") is not None and _whisper_state.get("runtime_key") == runtime_key:
            return _models["whisper"]
        _check_inference_allowed()
        from faster_whisper import WhisperModel

        kwargs = {"device": device, "compute_type": precision, "local_files_only": True}
        if index is not None:
            kwargs["device_index"] = index
        try:
            model = WhisperModel(key[1], **kwargs)
        except _BACKEND_ERRORS as exc:
            if device == "cuda":
                _fail_whisper_gpu("gpu-load-failed")
                _check_inference_allowed()
                # Re-enter exactly once on CPU with the same local model.
                return get_whisper(_key=key)
            _publish_compute(key, reason=_whisper_state["fallbackReason"])
            raise RuntimeError(
                "Whisper 本地模型无法加载；请在设置中指定已手动准备的模型目录或完整本地缓存。"
                "不会联网下载模型，也不会自动更换识别引擎。"
            ) from exc
        _models["whisper"] = model
        _whisper_state["runtime_key"] = runtime_key
        _publish_compute(key, actual=device, compute_type=precision, device_index=index,
                         reason=_whisper_state["fallbackReason"])
        return model


def _fail_whisper_gpu(reason):
    # Caller holds the inference lock and has finished/failed generator work.
    _models.pop("whisper", None)
    _whisper_state.update(runtime_key=None, fallbackReason=reason)
    _publish_compute(_whisper_state["key"], reason=reason)


def get_embedder():
    with _models_lock:
        if _models.get("campplus") is not None:
            return _models["campplus"]
        import sherpa_onnx

        path = cfg("models", "campplus", default=DEFAULT_MODELS["campplus"])
        conf = sherpa_onnx.SpeakerEmbeddingExtractorConfig(model=path)
        _models["campplus"] = sherpa_onnx.SpeakerEmbeddingExtractor(conf)
        return _models["campplus"]


def loaded_models():
    return sorted(k for k, v in _models.items() if v is not None)


# ---------------------------------------------------------------------------
# 音频
# ---------------------------------------------------------------------------


def decode_file(path):
    if _stdlib_pcm_route() and os.path.splitext(str(path))[1].lower() in (".wav", ".wave"):
        try:
            return _whale_asr_wasm.decode_pcm_wav(path, sample_rate=SR)
        except _whale_asr_wasm.UnsupportedPcmWav:
            # Compressed/non-PCM WAV remains on the established local decoder.
            pass
    try:
        from faster_whisper.audio import decode_audio
    except (ImportError, OSError):
        if _stdlib_pcm_route() and os.name == "nt":
            return _whale_asr_wasm.decode_windows_file(path, sample_rate=SR)
        raise ValueError("此环境缺少压缩音频解码器；请使用 PCM WAV，或为当前 Python 安装 faster-whisper。") from None

    audio = decode_audio(path, sampling_rate=SR)
    import numpy as np

    return np.asarray(audio, dtype="float32")


def normalize(audio):
    """把音量抬到能识别的范围（不改变波形形状）。"""
    if isinstance(audio, _whale_asr_wasm.Float32Audio):
        return audio.normalized()
    import numpy as np

    a = np.asarray(audio, dtype="float32")
    if a.size == 0:
        return a
    a = a - float(np.mean(a))  # 去直流
    peak = float(np.abs(a).max())
    if peak > 1e-5 and peak < 0.5:
        a = a * min(6.0, 0.9 / peak)
    return a


def rms_of(frame):
    if isinstance(frame, _whale_asr_wasm.Float32Audio):
        return frame.rms()
    import numpy as np

    if frame.size == 0:
        return 0.0
    return float(np.sqrt(np.mean(np.square(frame, dtype="float64"))))


def _make_input_stream(device, callback):
    options = dict(samplerate=SR, blocksize=FRAME, channels=1, dtype="float32", callback=callback)
    if sys.platform == "win32" and (device is None or isinstance(device, dict)):
        # Resolve native endpoint IDs at each open. PortAudio's process-lifetime
        # enumeration cache cannot safely identify a hot-plugged Windows device.
        global _native_input_module
        if "_native_input_module" not in globals():
            spec = _device_import.spec_from_file_location("whale_audio_input_windows", os.path.join(os.path.dirname(__file__), "audio_input_windows.py"))
            module = _device_import.module_from_spec(spec)
            spec.loader.exec_module(module)
            _native_input_module = module
        try:
            return _native_input_module.RawInputStream(device=device, devices=_audio_devices, **options)
        except RuntimeError as exc:
            if str(exc) == "INPUT_CLOSE_UNCONFIRMED":
                raise _CaptureCloseUnconfirmed("麦克风关闭未确认，请重启语音帮工后重试") from exc
            raise
    import sounddevice as sd
    return sd.RawInputStream(device=_audio_devices.resolve_input(device, sd), **options)


def _check_input_error(stream):
    error = getattr(stream, "error", None)
    if error is not None:
        error.audioDeviceFailure = True
        raise error


def device_info():
    try:
        if sys.platform == "win32" and (cfg("device") is None or isinstance(cfg("device"), dict)):
            return _audio_devices.native_input_info(cfg("device"))
        import sounddevice as sd

        dev = _audio_devices.resolve_input(cfg("device"), sd)
        idx = sd.default.device[0] if dev is None else dev
        info = sd.query_devices(idx)
        return {"index": idx, "name": info.get("name"), "channels": info.get("max_input_channels")}
    except Exception as exc:
        return {"error": str(exc)}


# Physical ownership is separate from a logical input turn. Native calls never
# run under this condition or the recorder/listener locks. A hung/failed close
# keeps its lease (and stream reference) until helper restart, never "times out"
# into a second native stream. File analysis and ASR do not use this gate.
CAPTURE_DEVICE_WAIT_S = 2.0


class _CaptureCancelled(RuntimeError):
    pass


class _CaptureCloseUnconfirmed(RuntimeError):
    pass


class _CaptureLease:
    def __init__(self):
        self.stream = None
        self.closing = False
        self.failed = False
        self.closed = threading.Event()


class _CaptureDevice:
    def __init__(self):
        self._condition = threading.Condition()
        self._owner = None
        self._close_failed = False

    def acquire(self, lease, is_current):
        deadline = time.monotonic() + CAPTURE_DEVICE_WAIT_S
        while is_current():
            with self._condition:
                if self._close_failed:
                    raise _CaptureCloseUnconfirmed("麦克风关闭未确认，请重启语音帮工后重试")
                if self._owner is None:
                    self._owner = lease
                    return True
                remaining = deadline - time.monotonic()
                if remaining <= 0:
                    raise TimeoutError("麦克风仍被占用或正在关闭，请稍后重试")
                self._condition.wait(min(.05, remaining))
        return False

    def release(self, lease, failed=False):
        with self._condition:
            if self._owner is lease:
                if failed:
                    lease.failed = True
                    self._close_failed = True
                else:
                    self._owner = None
                    lease.closed.set()
                self._condition.notify_all()

    def status(self, wait_s=0):
        with self._condition:
            # A fixed, bounded drain for explicit shutdown only. No device,
            # model, configuration or capture work is started by this read.
            if wait_s > 0:
                self._condition.wait_for(lambda: self._owner is None or self._close_failed, timeout=wait_s)
            return {"state": "close-unconfirmed" if self._close_failed else
                    "closing" if self._owner is not None and self._owner.closing else
                    "owned" if self._owner is not None else "released"}


_capture_device = _CaptureDevice()


def _close_capture(lease):
    lease.closing = True
    if lease.stream is not None:
        try:
            lease.stream.stop()
        except Exception as exc:
            log("麦克风流停止失败: %r" % (exc,))
        try:
            lease.stream.close()
        except Exception as exc:
            _capture_device.release(lease, failed=True)
            log("麦克风流关闭未确认: %r；重启帮工前不再打开麦克风" % (exc,))
            raise
    _capture_device.release(lease)


class Recorder:
    """一次录音。RawInputStream 16k mono float32，20ms 帧能量 VAD。"""

    def __init__(self, max_seconds=None, silence_ms=None, no_speech_ms=None):
        v = cfg("vad", default=DEFAULTS["vad"])
        self.max_seconds = float(max_seconds if max_seconds is not None else v["maxRecordMs"] / 1000.0)
        self.silence_ms = float(silence_ms if silence_ms is not None else v["silenceMs"])
        self.no_speech_ms = float(no_speech_ms if no_speech_ms is not None else v["noSpeechMs"])
        self.min_rms = float(v["minRms"])
        self.noise_mult = float(v["noiseMult"])
        self.min_speech_ms = float(v["minSpeechMs"])
        self.start_frames = int(v["startFrames"])

        self.stop_event = threading.Event()
        self.cancelled = False
        self.result_emitted = False
        self.blocks = []
        self._lock = threading.Lock()
        self.stream = None
        self.audio = None
        self.reason = None
        self.device = None
        self.input_turn = None
        self._capture_allowed = lambda: True

    def _callback(self, indata, frames, time_info, status):
        try:
            if self.stop_event.is_set():
                return
            if status:
                log("stream status: %s" % status)
            with self._lock:
                if not self.stop_event.is_set():
                    self.blocks.append(bytes(indata))
        except Exception:
            pass

    def _pull(self):
        if _stdlib_pcm_route():
            with self._lock:
                if not self.blocks:
                    return _whale_asr_wasm.Float32Audio.empty()
                raw = b"".join(self.blocks)
                self.blocks = []
            return _whale_asr_wasm.Float32Audio.from_native_bytes(raw)
        import numpy as np

        with self._lock:
            if not self.blocks:
                return np.zeros(0, dtype="float32")
            raw = b"".join(self.blocks)
            self.blocks = []
        return np.frombuffer(raw, dtype="float32").copy()

    def run(self):
        stdlib_pcm = _stdlib_pcm_route()
        if not stdlib_pcm:
            import numpy as np

        chunks = []
        lease = _CaptureLease()
        owned = False
        def current():
            return not self.stop_event.is_set() and self._capture_allowed()
        try:
            try:
                owned = _capture_device.acquire(lease, current)
            except (TimeoutError, _CaptureCloseUnconfirmed):
                # Key-up may race the gate's final timeout/poison check. Recheck
                # outside its condition, never acquiring config/recorder locks
                # in reverse order, before reporting a current device failure.
                if not current():
                    raise _CaptureCancelled("录音启动已取消") from None
                raise
            if not owned or not current():
                raise _CaptureCancelled("录音启动已取消")
            self.stream = lease.stream = _make_input_stream(cfg("device"), self._callback)
            if not current():
                raise _CaptureCancelled("录音启动已取消")
            self.stream.start()
            self.device = device_info()
            t0 = time.time()
            noise_samples = []
            speech_started = False
            voiced_run = 0
            last_voice_at = None
            speech_ms = 0.0
            total = _whale_asr_wasm.Float32Audio.empty() if stdlib_pcm else np.zeros(0, dtype="float32")
            while True:
                time.sleep(0.03)
                _check_input_error(self.stream)
                fresh = self._pull()
                if fresh.size:
                    chunks.append(fresh)
                    if stdlib_pcm:
                        total.append(fresh)
                    else:
                        total = np.concatenate([total, fresh]) if total.size else fresh

                elapsed = time.time() - t0
                if self.stop_event.is_set():
                    self.reason = "stopped"
                    break
                if elapsed >= self.max_seconds:
                    self.reason = "max-seconds"
                    break

                # 逐帧评估还没评估过的部分
                evaluated = getattr(self, "_evaluated", 0)
                while len(total) - evaluated >= FRAME:
                    frame = total[evaluated:evaluated + FRAME]
                    evaluated += FRAME
                    rms = rms_of(frame)
                    if len(noise_samples) < 10 and not speech_started:
                        noise_samples.append(rms)
                        thr = max(self.min_rms, (statistics.median(noise_samples) if noise_samples else 0.0) * self.noise_mult)
                    else:
                        thr = max(
                            self.min_rms,
                            (statistics.median(noise_samples) if noise_samples else 0.0) * self.noise_mult,
                        )
                    voiced = rms > thr
                    now = time.time()
                    if voiced:
                        voiced_run += 1
                        speech_ms += FRAME / SR * 1000.0
                        last_voice_at = now
                        if self.input_turn is not None:
                            self.input_turn.voiced((t0 + evaluated / SR) * 1000)
                        if voiced_run >= self.start_frames:
                            speech_started = True
                    else:
                        voiced_run = 0
                        if speech_started and last_voice_at is not None:
                            if (now - last_voice_at) * 1000.0 >= self.silence_ms:
                                self.reason = "silence"
                                break
                    if not speech_started and (now - t0) * 1000.0 >= self.no_speech_ms:
                        self.reason = "no-speech"
                        break
                self._evaluated = evaluated
                if self.reason:
                    break
        finally:
            # Preserve the capture failure if cleanup also fails. Closing is
            # still attempted after a failed start/stop, and never called on a
            # stream whose constructor did not return.
            capture_error = sys.exc_info()[1]
            self.stop_event.set()  # Late callbacks cannot fill a closing take.
            if owned and isinstance(capture_error, _CaptureCloseUnconfirmed):
                _capture_device.release(lease, failed=True)
            elif owned:
                try:
                    _close_capture(lease)
                except Exception:
                    if capture_error is None:
                        raise

        if chunks:
            self.audio = (_whale_asr_wasm.Float32Audio.concatenate(chunks) if stdlib_pcm
                          else np.concatenate(chunks).astype("float32"))
        else:
            self.audio = (_whale_asr_wasm.Float32Audio.empty() if stdlib_pcm
                          else np.zeros(0, dtype="float32"))
        if self.reason is None:
            self.reason = "done"
        return self.audio

    @property
    def duration(self):
        return len(self.audio) / SR if self.audio is not None else 0.0


# ---------------------------------------------------------------------------
# ASR
# ---------------------------------------------------------------------------


def _clean_tag(value):
    """SenseVoice 把标签包成 <|HAPPY|>，脱壳成 HAPPY。"""
    if value is None:
        return None
    text = str(value).strip()
    if text.startswith("<|") and text.endswith("|>"):
        text = text[2:-2]
    return text or None


def asr_sensevoice(audio):
    import numpy as np

    rec = get_recognizer()
    key = _sensevoice_key
    _check_inference_allowed()
    stream = rec.create_stream()
    stream.accept_waveform(SR, np.asarray(audio, dtype="float32"))
    rec.decode_stream(stream)
    r = stream.result
    _check_inference_allowed()
    _publish_compute(key, actual="cpu", reason="model-gpu-unverified" if key[2] == "auto" else None, validated=True)
    return {
        "text": (getattr(r, "text", "") or "").strip(),
        "lang": _clean_tag(getattr(r, "lang", None)) or "auto",
        "emotion": _clean_tag(getattr(r, "emotion", None)),
        "event_tag": _clean_tag(getattr(r, "event", None)),
    }


def asr_whisper(audio):
    import numpy as np

    with _whisper_inference_lock:
        key = _compute_key("whisper", _requested_compute())
        samples = np.asarray(audio, dtype="float32")
        # No segments are emitted until the entire attempt succeeds. Errors
        # inside faster-whisper's lazy iterator therefore remain retryable.
        for attempt in range(2):
            _check_inference_allowed()
            model = get_whisper(_key=key)
            runtime_key = _whisper_state["runtime_key"]
            device, precision, index = runtime_key[1:]
            segments = None
            try:
                _check_inference_allowed()
                segments, info = model.transcribe(samples, language=None, vad_filter=False, beam_size=5)
                parts = []
                for seg in segments:
                    _check_inference_allowed()
                    parts.append((seg.text or "").strip())
                _check_inference_allowed()
                result = {"text": "".join(parts).strip(), "lang": getattr(info, "language", None) or "auto",
                          "emotion": None, "event_tag": None}
            except _InferenceCancelled:
                raise
            except _BACKEND_ERRORS:
                if device != "cuda" or attempt != 0:
                    _publish_compute(key, actual=device, compute_type=precision, device_index=index,
                                     reason=_whisper_state["fallbackReason"])
                    raise
                _fail_whisper_gpu("gpu-inference-failed")
                # Drop our reference before loading CPU. The exception is not
                # retained in state or telemetry, and the iterator is closed.
                model = None
                _check_inference_allowed()
                continue
            finally:
                close = getattr(segments, "close", None)
                if callable(close):
                    close()
            _publish_compute(key, actual=device, compute_type=precision, device_index=index,
                             reason=_whisper_state["fallbackReason"], validated=True)
            return result


def transcribe_audio(audio):
    engine = asr_engine()
    if engine == "whisper-wasm":
        _check_inference_allowed()
        try:
            result = _whale_asr_wasm.transcribe(audio)
        except _InferenceCancelled:
            raise
        except _whale_asr_wasm.WasmAsrError as exc:
            messages = {
                "binding-unavailable": "Whisper 本地服务未绑定，请重启语音帮工后重试。",
                "binding-invalid": "Whisper 本地服务地址无效；只允许 loopback 地址。",
                "invalid-audio": "Whisper 输入音频格式无效。",
                "empty-audio": "Whisper 输入音频为空。",
                "response-too-large": "Whisper 本地服务返回内容过大。",
                "invalid-response": "Whisper 本地服务返回格式无效。",
                "service-unavailable": "Whisper 本地服务暂不可用，请稍后重试。",
            }
            message = messages.get(exc.code, "Whisper 本地识别失败（%s）。" % exc.code)
            raise RuntimeError(message) from None
        _check_inference_allowed()
        out = {"text": result["text"], "lang": result.get("language") or "auto",
               "emotion": None, "event_tag": None}
    elif engine == "whisper":
        out = asr_whisper(audio)
    elif engine == "sensevoice":
        try:
            out = asr_sensevoice(audio)
        except _InferenceCancelled:
            raise
        except Exception as exc:
            log("sensevoice 本地识别失败（未切换引擎或下载模型）：%s" % type(exc).__name__)
            raise RuntimeError(
                "SenseVoice 本地识别失败；请检查设置中的 ONNX 模型目录、tokens 文件、依赖和输入音频。"
                "不会自动回落 Whisper 或下载模型。"
            ) from exc
    else:
        raise ValueError("未知 ASR 引擎；请明确选择 whisper-wasm、本地 sensevoice 或 whisper。")
    # SenseVoice 偶尔把标点/换行带进来，收干净
    out["text"] = (out.get("text") or "").strip()
    return out


# ---------------------------------------------------------------------------
# 声纹
# ---------------------------------------------------------------------------


def embed_audio(audio, max_windows=6):
    """一段音频 -> 归一化 embedding（多窗口取均值）。太短返回 None。"""
    import numpy as np

    a = np.asarray(audio, dtype="float32")
    if a.size < int(1.0 * SR):
        return None
    ext = get_embedder()
    win = int(2.5 * SR)
    step = int(1.25 * SR)
    vectors = []
    if a.size <= win:
        windows = [a]
    else:
        windows = [a[off:off + win] for off in range(0, a.size - win + 1, step)]
    for chunk in windows:
        if chunk.size < int(1.0 * SR):
            continue
        if rms_of(chunk) < 0.004 and a.size > win:
            continue
        stream = ext.create_stream()
        stream.accept_waveform(SR, chunk)
        stream.input_finished()
        vec = ext.compute(stream)
        if vec is None:
            continue
        vectors.append(np.asarray(vec, dtype="float64"))
        if len(vectors) >= max_windows:
            break
    if not vectors:
        return None
    mean = np.mean(np.stack(vectors, axis=0), axis=0)
    norm = float(np.linalg.norm(mean))
    if norm == 0:
        return None
    return mean / norm


def cosine(a, b):
    import numpy as np

    va = np.asarray(a, dtype="float64")
    vb = np.asarray(b, dtype="float64")
    na = float(np.linalg.norm(va))
    nb = float(np.linalg.norm(vb))
    if na == 0 or nb == 0:
        return 0.0
    return float(va @ vb / (na * nb))


# ---------------------------------------------------------------------------
# 语义初筛（v0.3）：本地 embedding 服务算「这句话像不像在叫我」
# ---------------------------------------------------------------------------
# 设计约束（改动前先读）：
#   · 服务是临时进程，随时可能挂 —— 任何异常都只降级成「只看唤醒词」，绝不往上抛。
#   · 只对 ASR 完成的段调用，不碰音频回调；文本和缺失的 refs 共用 timeoutMs
#     （默认 2s）预算，而不是每个请求各等一次完整超时。
#   · refs 向量与算过的句子都缓存；启动时后台预热一遍 refs，正常一句话只发 1 个请求。
#   · 错误日志限频 30s 一条，别把 stderr 刷爆。

_SEM_CACHE = {}                 # (url, model, text) -> 归一化向量
_SEM_CACHE_LOCK = threading.Lock()
_SEM_STATE = {
    "ok": None,                 # None=没试过；True/False=最近一次调用结果（服务可达性）
    "lastAt": None,
    "lastScore": None,
    "lastText": None,
    "lastError": None,
    "lastErrorAt": None,
    "lastLogAt": 0.0,
    "calls": 0,
    "errors": 0,
}
_SEM_STATE_LOCK = threading.Lock()
_SEM_PROBE_CACHE = {"at": 0.0, "result": None}


def semantic_settings():
    """把 config.semantic 规整成好用的形状；坏值一律回落到 DEFAULTS。"""
    base = DEFAULTS["semantic"]
    live = cfg("semantic", default=None)
    if not isinstance(live, dict):
        live = {}
    refs = live.get("refs")
    if not isinstance(refs, (list, tuple)):
        refs = base["refs"]
    refs = [str(x).strip() for x in refs if str(x).strip()] or list(base["refs"])
    try:
        threshold = float(live.get("threshold", base["threshold"]))
    except (TypeError, ValueError):
        threshold = float(base["threshold"])
    try:
        timeout_ms = float(live.get("timeoutMs", base["timeoutMs"]) or base["timeoutMs"])
    except (TypeError, ValueError):
        timeout_ms = float(base["timeoutMs"])
    return {
        # Older releases wrote enabled=true by default. Do not mistake that
        # historical default (or truthy strings/numbers) for a new opt-in.
        "enabled": live.get("experimentalEnabled") is True,
        "experimentalEnabled": live.get("experimentalEnabled") is True,
        "url": str(live.get("url") or base["url"]),
        "model": str(live.get("model") or base["model"]),
        "threshold": threshold,
        "timeoutMs": max(100.0, timeout_ms),
        "refs": refs,
    }


def _embed_http(text, st, timeout_ms=None):
    """一次 embedding 请求（只在这里发网络请求；失败抛异常，由调用方兜底）。"""
    if not semantic_settings()["enabled"]:
        raise RuntimeError("experimental semantic wake is disabled")
    import numpy as np

    body = json.dumps(
        {"input": str(text), "model": st["model"]}, ensure_ascii=False
    ).encode("utf-8")
    req = urllib.request.Request(
        st["url"],
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    timeout_s = float(st["timeoutMs"] if timeout_ms is None else timeout_ms) / 1000.0
    with urllib.request.urlopen(req, timeout=timeout_s) as resp:
        payload = json.loads(resp.read().decode("utf-8", "replace"))
    data = (payload or {}).get("data") or []
    if not data:
        raise RuntimeError("embedding 响应没有 data")
    vec = np.asarray((data[0] or {}).get("embedding") or [], dtype="float64")
    if vec.size == 0:
        raise RuntimeError("embedding 为空")
    norm = float(np.linalg.norm(vec))
    if norm == 0:
        raise RuntimeError("embedding 是零向量")
    return vec / norm


def _embed_cached(text, st, deadline=None):
    key = (st["url"], st["model"], str(text))
    with _SEM_CACHE_LOCK:
        hit = _SEM_CACHE.get(key)
    if hit is not None:
        return hit
    timeout_ms = st["timeoutMs"]
    if deadline is not None:
        remaining_ms = (deadline - time.monotonic()) * 1000.0
        if remaining_ms <= 0:
            raise TimeoutError("semantic embedding 总预算已耗尽")
        timeout_ms = min(timeout_ms, remaining_ms)
    vec = _embed_http(text, st, timeout_ms=timeout_ms)
    if deadline is not None and time.monotonic() >= deadline:
        raise TimeoutError("semantic embedding 总预算已耗尽")
    with _SEM_CACHE_LOCK:
        if len(_SEM_CACHE) > 256:
            _SEM_CACHE.clear()
        _SEM_CACHE[key] = vec
    return vec


def _sem_note(ok, score=None, text=None, error=None):
    """记录一次语义调用结果；失败日志限频，避免服务挂了以后每句话刷一行。"""
    now = time.time()
    with _SEM_STATE_LOCK:
        _SEM_STATE["ok"] = bool(ok)
        _SEM_STATE["lastAt"] = now
        if ok:
            _SEM_STATE["calls"] += 1
            if score is not None:
                _SEM_STATE["lastScore"] = round(float(score), 4)
                _SEM_STATE["lastText"] = (text or "")[:60]
            _SEM_STATE["lastError"] = None
            _SEM_STATE["lastErrorAt"] = None
            return
        _SEM_STATE["errors"] += 1
        _SEM_STATE["lastError"] = str(error or "")[:200]
        _SEM_STATE["lastErrorAt"] = now
        quiet = now - float(_SEM_STATE.get("lastLogAt") or 0.0) >= 30.0
        if quiet:
            _SEM_STATE["lastLogAt"] = now
    if not ok and quiet:
        log("semantic 降级（只按唤醒词判断）：%s" % str(error or "")[:160])


def semantic_score(text):
    """返回 (best_score, best_ref, error)。

    error 非空 = 这次语义不可用（调用方必须回落到「只看唤醒词」，不能崩）。
    """
    st = semantic_settings()
    if not st["enabled"]:
        return None, None, "disabled"
    probe = (text or "").strip()
    if not probe:
        return None, None, "empty"
    try:
        deadline = time.monotonic() + st["timeoutMs"] / 1000.0
        vec = _embed_cached(probe, st, deadline=deadline)
        best_score, best_ref = -1.0, None
        # refs 正常情况下在启动时已缓存；没缓存时给总预算，别一个接一个卡满 timeout
        for ref in st["refs"]:
            if not semantic_settings()["enabled"]:
                return None, None, "disabled"
            if time.monotonic() >= deadline:
                raise TimeoutError("semantic embedding 总预算已耗尽")
            score = cosine(vec, _embed_cached(ref, st, deadline=deadline))
            if score > best_score:
                best_score, best_ref = score, ref
        if best_ref is None:
            raise RuntimeError("没有可用的参考句")
        best_score = round(best_score, 4)
        _sem_note(True, best_score, probe)
        return best_score, best_ref, None
    except Exception as exc:
        err = "%s: %s" % (type(exc).__name__, exc)
        _sem_note(False, error=err)
        return None, None, err[:240]


def semantic_probe(timeout_s=None):
    """status 用：真打一次服务（绕开缓存）。结果缓存 10s，避免连续 status 拖慢主循环。"""
    st = semantic_settings()
    if not st["enabled"]:
        return None
    now = time.time()
    with _SEM_STATE_LOCK:
        cached = _SEM_PROBE_CACHE.get("result")
        cached_at = float(_SEM_PROBE_CACHE.get("at") or 0.0)
    if cached is not None and now - cached_at < 10.0:
        return dict(cached)
    budget = float(timeout_s if timeout_s is not None else min(1.5, st["timeoutMs"] / 1000.0))
    budget = max(0.2, budget)
    probe_st = dict(st)
    probe_st["timeoutMs"] = budget * 1000.0
    box = {}

    def work():
        try:
            _embed_http("ping", probe_st)
            box["result"] = {"ok": True}
        except Exception as exc:
            box["result"] = {"ok": False, "error": "%s: %s" % (type(exc).__name__, exc)}

    thread = threading.Thread(target=work, name="whale-sem-probe", daemon=True)
    thread.start()
    thread.join(budget + 0.5)
    result = box.get("result") or {"ok": False, "error": "探测超时（%.1fs）" % budget}
    with _SEM_STATE_LOCK:
        _SEM_PROBE_CACHE["at"] = time.time()
        _SEM_PROBE_CACHE["result"] = dict(result)
        if result.get("ok"):
            _SEM_STATE["ok"] = True
            _SEM_STATE["lastError"] = None
        else:
            _SEM_STATE["ok"] = False
            _SEM_STATE["lastError"] = str(result.get("error"))[:200]
    return dict(result)


def semantic_status(probe=False):
    """给 status / voice_status 的快照（probe=False 时只是读快照，不发请求）。"""
    st = semantic_settings()
    with _SEM_STATE_LOCK:
        state = dict(_SEM_STATE)
    out = {
        "enabled": st["enabled"],
        "threshold": st["threshold"],
        "url": st["url"],
        "model": st["model"],
        "timeoutMs": int(st["timeoutMs"]),
        "refs": list(st["refs"]),
        "reachable": state.get("ok"),
        "lastScore": state.get("lastScore"),
        "lastText": state.get("lastText"),
        "lastAt": int(state["lastAt"] * 1000) if state.get("lastAt") else None,
        "lastError": state.get("lastError"),
        "calls": state.get("calls") or 0,
        "errors": state.get("errors") or 0,
    }
    if probe:
        result = semantic_probe()
        if result is not None:
            out["probe"] = result
            out["reachable"] = result.get("ok")
    return out


def warm_semantic():
    """启动后后台把 refs 向量缓存好（不阻塞 ready / stdin 主循环）。"""
    st = semantic_settings()
    if not st["enabled"]:
        log("semantic: 实验性唤醒判断已关闭；已授权自由麦直接处理有效语音")
        return
    t0 = time.time()
    try:
        for ref in st["refs"]:
            if not semantic_settings()["enabled"]:
                return
            _embed_cached(ref, st)
        _sem_note(True, None, None)
        log(
            "semantic: 参考句 %d 条已缓存（阈值 %.2f，耗时 %.2fs）"
            % (len(st["refs"]), st["threshold"], time.time() - t0)
        )
    except Exception as exc:
        _sem_note(False, error="%s: %s" % (type(exc).__name__, exc))


def load_voiceprints():
    try:
        with open(VOICEPRINTS_PATH, "r", encoding="utf-8-sig") as fh:
            data = json.load(fh)
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def speaker_verification_enabled():
    # Only a literal JSON true opts in; malformed config must not enable it.
    return cfg("speakerVerification", "enabled", default=False) is True


def save_voiceprints(data):
    os.makedirs(DATA_DIR, exist_ok=True)
    tmp = VOICEPRINTS_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False)
    os.replace(tmp, VOICEPRINTS_PATH)


def identify(audio):
    """返回 (score, ok, name)。实验开关关闭或没有注册时返回空值。"""
    if not speaker_verification_enabled():
        return None, None, None
    prints = load_voiceprints()
    if not prints:
        return None, None, None
    emb = embed_audio(audio)
    if emb is None:
        return None, None, None
    best_name, best_score = None, -1.0
    for name, record in prints.items():
        vec = (record or {}).get("embedding")
        if not vec:
            continue
        score = cosine(emb, vec)
        if score > best_score:
            best_name, best_score = name, score
    if best_name is None:
        return None, None, None
    threshold = float(cfg("threshold", default=0.5) or 0.5)
    return round(best_score, 4), bool(best_score >= threshold), best_name


# ---------------------------------------------------------------------------
# 韵律
# ---------------------------------------------------------------------------


def prosody(audio, text="", duration=None):
    """parselmouth：F0 / 强度 / 语速 / 停顿占比。短音频或算不出来返回 None。"""
    if isinstance(audio, _whale_asr_wasm.Float32Audio):
        dur = float(duration if duration is not None else len(audio) / SR)
        if len(audio) < int(0.3 * SR):
            return None
        frames = len(audio) // FRAME
        voiced = sum(1 for index in range(frames)
                     if rms_of(audio[index * FRAME:(index + 1) * FRAME]) >
                     float(cfg("vad", "minRms", default=0.006)))
        chars = len([char for char in (text or "") if not char.isspace()])
        return {
            "meanF0": None, "f0P10": None, "f0P90": None, "f0Range": None,
            "intensityMean": None, "intensityHigh": None, "intensityRange": None,
            "speechRate": round(chars / dur, 2) if dur > 0 else None,
            "pauseRatio": round(1.0 - voiced / frames, 3) if frames else None,
            "duration": round(dur, 2), "voicedFrames": int(voiced),
        }
    import numpy as np

    a = np.asarray(audio, dtype="float32")
    dur = float(duration if duration is not None else (a.size / SR if a.size else 0.0))
    if a.size < int(0.3 * SR):
        return None
    try:
        import parselmouth

        snd = parselmouth.Sound(a.astype("float64"), sampling_frequency=SR)
        pitch = snd.to_pitch()
        f0 = pitch.selected_array["frequency"]
        voiced = f0[f0 > 0]
        if voiced.size < 5:
            return None
        p10, p90 = float(np.percentile(voiced, 10)), float(np.percentile(voiced, 90))
        mean_f0 = float(np.mean(voiced))

        intensity = snd.to_intensity()
        vals = intensity.values[0] if intensity.values.size else np.zeros(0)
        # parselmouth 把「没有强度」的帧写成 -300dB，不过滤会把极差拉到 380+
        vals = vals[np.isfinite(vals) & (vals > 0)]
        inten_mean = float(np.mean(vals)) if vals.size else None
        if vals.size >= 10:
            lo, hi = float(np.percentile(vals, 5)), float(np.percentile(vals, 95))
            inten_range = hi - lo
            inten_hi = hi
        else:
            inten_range = float(np.max(vals) - np.min(vals)) if vals.size else None
            inten_hi = float(np.max(vals)) if vals.size else None

        # 停顿占比 = 未发声帧 / 总帧（能量阈值，跟 VAD 同口径）
        frames = a.size // FRAME
        if frames > 0:
            voiced_frames = 0
            for i in range(frames):
                if rms_of(a[i * FRAME:(i + 1) * FRAME]) > float(cfg("vad", "minRms", default=0.006)):
                    voiced_frames += 1
            pause_ratio = round(1.0 - voiced_frames / frames, 3)
        else:
            pause_ratio = None

        chars = len([c for c in (text or "") if not c.isspace()])
        rate = round(chars / dur, 2) if dur > 0 else None
        return {
            "meanF0": round(mean_f0, 1),
            "f0P10": round(p10, 1),
            "f0P90": round(p90, 1),
            "f0Range": round(p90 - p10, 1),
            "intensityMean": round(inten_mean, 1) if inten_mean is not None else None,
            "intensityHigh": round(inten_hi, 1) if inten_hi is not None else None,
            "intensityRange": round(inten_range, 1) if inten_range is not None else None,
            "speechRate": rate,
            "pauseRatio": pause_ratio,
            "duration": round(dur, 2),
            "voicedFrames": int(voiced.size),
        }
    except Exception as exc:
        log("prosody 失败：%r" % (exc,))
        return None


# ---------------------------------------------------------------------------
# 全流程
# ---------------------------------------------------------------------------


RECORDINGS_DIR = os.path.join(DATA_DIR, "recordings")


def save_recording(audio, tag="listen"):
    """Optional manual diagnostics. ASR itself uses in-memory samples."""
    if cfg("retainRecordings", default=False) is not True:
        return None
    try:
        import wave

        os.makedirs(RECORDINGS_DIR, exist_ok=True)
        path = os.path.join(
            RECORDINGS_DIR, "%s-%s.wav" % (tag, time.strftime("%Y%m%d-%H%M%S"))
        )
        if isinstance(audio, _whale_asr_wasm.Float32Audio):
            pcm = audio.to_pcm16_bytes()
        else:
            import numpy as np
            pcm = (np.clip(np.asarray(audio, dtype="float32"), -1.0, 1.0) *
                   32767).astype("<i2").tobytes()
        with wave.open(path, "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes(pcm)
        log("录音落盘: %s" % path)
        return path
    except Exception as exc:
        log("保存录音失败：%r" % (exc,))
        return None


class _LiveInferenceGate:
    """One live pipeline plus its newest waiter; never interrupts native work.

    This does not govern explicit file or enrollment tasks. Gate methods only
    touch their own condition/tokens: no configuration, recorder, request or
    listener locks/callbacks may run under the condition. Callers may invalidate
    from those locks; acquire() checks authorization outside the condition.
    """

    def __init__(self):
        self._condition = threading.Condition()
        self._running = None
        self._latest = None

    def new(self):
        with self._condition:
            if self._latest is not None:
                self._latest.set()
            token = threading.Event()  # Set means withdrawn, not native finished.
            self._latest = token
            self._condition.notify_all()
            return token

    def cancel(self, token):
        with self._condition:
            if token is not None:
                token.set()
                if self._latest is token:
                    self._latest = None
            self._condition.notify_all()

    def cancel_pending(self):
        with self._condition:
            if self._latest is not self._running:
                if self._latest is not None:
                    self._latest.set()
                self._latest = None
            self._condition.notify_all()

    def acquire(self, token, is_current):
        while not token.is_set():
            # Config changes have no event here, so recheck even if native ASR
            # never returns. Supersede/pause/stop notify immediately.
            if not is_current():
                self.cancel(token)
                return False
            with self._condition:
                if token.is_set():
                    return False
                if self._running is None:
                    self._running = token
                    return True
                self._condition.wait(0.1)
        return False

    def release(self, token):
        with self._condition:
            # A cancelled waiter must never free somebody else's native call.
            if self._running is token:
                self._running = None
            if self._latest is token:
                self._latest = None
            self._condition.notify_all()


_live_inference = _LiveInferenceGate()


def full_result(audio, text_hint_duration=None, is_current=None):
    # File callers omit the predicate and retain their existing full pipeline.
    if is_current is not None and not is_current():
        return None
    timing = StageTimings()
    with timing.stage("normalizeMs"):
        audio = normalize(audio)
    dur = float(len(audio) / SR) if audio.size else 0.0
    if dur < 0.25:
        return {"error": "录音太短（%.2fs）" % dur}
    if is_current is not None and not is_current():
        return None
    with timing.stage("asrMs"), _inference_authorization(is_current):
        asr = transcribe_audio(audio)
    if is_current is not None and not is_current():
        return None
    score, ok, who, pros = None, None, None, None
    if speaker_verification_enabled():
        with timing.stage("speakerMs"):
            score, ok, who = identify(audio)
    if is_current is not None and not is_current():
        return None
    with timing.stage("prosodyMs"):
        pros = prosody(audio, asr.get("text") or "", dur)
    return {
        "event": "transcript",
        "text": asr.get("text") or "",
        "lang": asr.get("lang") or "auto",
        "emotion": asr.get("emotion"),
        "event_tag": asr.get("event_tag"),
        "speaker_score": score,
        "speaker_ok": ok,
        "speaker_name": who,
        "dur": round(dur, 2),
        "prosody": pros,
        "speaker_verification": speaker_verification_enabled(),
        "timings": timing.snapshot(),
        "traceId": timing.trace_id,
    }


# ---------------------------------------------------------------------------
# 常听模式（always + 唤醒词）
# ---------------------------------------------------------------------------
# 线程模型（这段是常听唯一的并发入口，改动时先读这里）：
#   · 只有 1 个 always 线程（AlwaysListener._run）。开/关命令在 stdin 主线程里串行，
#     只有主线程创建/销毁 AlwaysListener，worker 自己不创建第二个。
#   · 音频回调（PortAudio 线程）只做 bytes.append，绝不做 VAD/模型；
#     worker 每 ~30ms 取一次，按 20ms 帧跑**能量 VAD**（和 Recorder 同一套阈值口径）。
#   · 段处理（CAM++ 声纹 → SenseVoice ASR → parselmouth 韵律）在 worker 里串行：
#     与 PTT 共用实时推理闸门（1 个运行 + 1 个最新等待）；停止不硬杀 native 调用。
#     回调侧保留 20s 上限；慢推理期间只丢旧音频，不无限积压。
#   · PTT / 注册用 paused Event 抢占：pause() 异步关闭流，不阻塞按键队列；
#     共用物理设备租约，下一次捕获只在旧流确认关闭后打开。录完 finally 里 resume()。
#   · 关闭：stop_event.set()，worker 在 sleep/等待点立刻醒；join 最多 2s。

ALWAYS_DEFAULT_WAKE = ["依依", "一一", "一依", "依一", "伊伊", "小鲸鱼", "emik", "emiko"]
FRAME_MS = FRAME * 1000.0 / SR


def _plain_text(value):
    """去掉标点/空白并转小写。中文标点、空格、感叹号都靠 isalnum 过滤掉。"""
    return "".join(ch for ch in str(value or "") if ch.isalnum()).lower()


def _match_wake(text, words):
    """返回命中的配置词（原样），没命中返回 None。「一一」在默认词表里，收「依依」的误识别。"""
    plain = _plain_text(text)
    if not plain:
        return None
    for word in words or []:
        needle = _plain_text(word)
        if needle and needle in plain:
            return str(word)
    return None


def wake_settings():
    words = cfg("wakeWordAliases", default=["小鲸鱼"])
    if (not isinstance(words, list) or not 1 <= len(words) <= 8
            or any(not isinstance(w, str) or not 2 <= len(w.strip()) <= 24
                   or not _plain_text(w) or any(unicodedata.category(c).startswith("C") for c in w)
                   for w in words)):
        words = ["小鲸鱼"]
    words = list(dict.fromkeys(w.strip() for w in words))
    timeout = cfg("wakeListenTimeoutMs", default=10000)
    if isinstance(timeout, bool) or not isinstance(timeout, (int, float)) or not 3000 <= timeout <= 30000:
        timeout = 10000
    return {"wakeWordAliases": words, "wakeListenTimeoutMs": int(timeout)}


@lru_cache(maxsize=1)
def _wake_pinyin_data():
    """Bundled data only. A broken installation fails visibly, never downloads."""
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "wake_pinyin.json.gz")
    with gzip.open(path, "rt", encoding="utf-8") as source:
        data = json.load(source)
    characters = {c: syllable for syllable, chars in data["characters"].items() for c in chars}
    phrases = data["phrases"]
    lengths = sorted({len(p) for p in phrases}, reverse=True)
    return characters, phrases, lengths


@lru_cache(maxsize=128)
def _wake_pronunciation(value, with_tones=False):
    characters, phrases, lengths = _wake_pinyin_data()
    if not all(c in characters for c in value):
        return None
    result = []
    index = 0
    while index < len(value):
        for length in lengths:
            phrase = value[index:index + length]
            if len(phrase) == length and phrase in phrases:
                result.extend(phrases[phrase])
                index += length
                break
        else:
            result.append(characters[value[index]])
            index += 1
    if with_tones:
        return tuple(result)
    return tuple(_wake_acoustic.toneless(item).replace("ü", "v") for item in result)


def _wake_candidates(words):
    readings = tuple(
        _wake_pronunciation(normalized, with_tones=True)
        if all(unicodedata.category(ch) == "Lo" for ch in normalized) else None
        for normalized in (unicodedata.normalize("NFKC", word) for word in words)
    )
    return _wake_acoustic.candidates(readings)


def _wake_near_syllable(left, right):
    # One explicit pronunciation difference, not edit distance or substring.
    return right in _wake_acoustic.nearby_syllables(left)


def _wake_phonetic_prefix(prefix, alias):
    if len(alias) < 2 or len(prefix) != len(alias):
        return False
    # Do not load data for Latin/mixed aliases; their exact word boundary stays.
    if not all(unicodedata.category(c) == "Lo" for c in alias + prefix):
        return False
    expected = _wake_pronunciation(alias)
    actual = _wake_pronunciation(prefix)
    if not expected or not actual:
        return False
    differences = [(a, b) for a, b in zip(expected, actual) if a != b]
    return not differences or (len(alias) >= 3 and len(differences) == 1
                               and _wake_near_syllable(*differences[0]))


def _wake_edge(ch):
    return ch.isspace() or unicodedata.category(ch).startswith("P")


def _wake_prefix_value(text):
    value = unicodedata.normalize("NFKC", str(text or "")).strip()
    while value and _wake_edge(value[0]):
        value = value[1:]
    return value


def _wake_conflicting_prefix(text, alias, allow_terminal=False):
    # A recognizably different call with one conflicting syllable is stronger
    # evidence than the spotter's fuzzy match (e.g. 小青鱼 for 小鲸鱼).
    normalized = unicodedata.normalize("NFKC", alias)
    prefix = _wake_prefix_value(text)[:len(normalized)]
    if len(prefix) != len(normalized) or prefix == normalized:
        return False
    spoken, expected = _wake_pronunciation(prefix), _wake_pronunciation(normalized)
    if not spoken or not expected:
        return False
    differences = [index for index, (a, b) in enumerate(zip(spoken, expected)) if a != b]
    return (len(differences) == 1 and not _wake_phonetic_prefix(prefix, normalized)
            and not (allow_terminal and differences[0] == len(expected) - 1))


def _preserve_wake_command(text, word, command):
    # Keep a better first-pass command when both transcripts agree on most
    # of the suffix. This preserves syllables close to the acoustic cut.
    value = _wake_prefix_value(text)
    width = len(unicodedata.normalize("NFKC", word))
    expected, actual = _wake_pronunciation(word), _wake_pronunciation(value[:width])
    if not expected or not actual or sum(a == b for a, b in zip(actual, expected)) < width - 1:
        return command
    suffix = _wake_prefix_value(value[width:])
    first, second = _plain_text(suffix)[:128], _plain_text(command)[:128]
    if not first or not second:
        return command
    first = _wake_pronunciation(first) or first
    second = _wake_pronunciation(second) or second
    return suffix if SequenceMatcher(None, first, second, autojunk=False).ratio() >= 0.67 else command


def match_wake_prefix(text, words):
    """ASR text only: leading exact alias or bounded offline Mandarin near-sound.

    CJK commands may follow the alias directly. Latin aliases require a word
    boundary, so 'emik' cannot match 'emiko' or 'emikology'. Punctuation and
    whitespace are allowed at the edges, never removed inside an alias.
    """
    value = _wake_prefix_value(text)
    # Prefer any literal alias before phonetic matches; then longest alias.
    aliases = [(word, unicodedata.normalize("NFKC", word).strip()) for word in words]
    aliases.sort(key=lambda item: len(item[1]), reverse=True)
    def candidates():
        for word, alias in aliases:
            if alias and value.casefold().startswith(alias.casefold()):
                yield word, alias
        for word, alias in aliases:
            if (alias and not value.casefold().startswith(alias.casefold())
                    and _wake_phonetic_prefix(value[:len(alias)], alias)):
                yield word, alias
    for word, alias in candidates():
        rest = value[len(alias):]
        if alias[-1:].isascii() and alias[-1:].isalnum() and rest and rest[0].isascii() and (rest[0].isalnum() or rest[0] == "_"):
            continue
        while rest and _wake_edge(rest[0]):
            rest = rest[1:]
        if not _plain_text(rest):
            rest = ""
        return word, rest.strip()
    return None, None


class AlwaysListener:
    """自由麦 → 20ms 帧能量 VAD 分段 → 可选声纹 → ASR → 有效语音投递。

    唤醒词/语义闸门仅在 semantic.experimentalEnabled 明确开启时使用。

    状态都在实例里；同一个实例可以被 PTT 临时 pause/resume，不影响对话模式窗口。
    """

    def __init__(self, mode="always", capture_id=None):
        self.mode = mode if mode in ("always", "wake") else "always"
        self.capture_id = capture_id
        self._grant_capture_id = _capture_id
        self.session_id = cfg("voiceSessionId")
        self.epoch = cfg("voiceSessionEpoch")
        self._capture_generation = 0
        self._inference_token = None
        self._wake_deadline = 0.0
        self._wake_timer = None
        self._wake_lock = threading.RLock()
        self._wake_detector_ready = False
        self.stop_event = threading.Event()
        self.paused = threading.Event()
        self.thread = None
        self._stream = None
        self._stream_lock = threading.Lock()
        self._stream_lease = None
        self._opening = False
        self._stream_generation = 0
        self._blocks = []
        self._block_bytes = 0
        self._blocks_lock = threading.Lock()
        self._state_lock = threading.Lock()
        self.started_at = None
        self.in_conversation = False
        self.wake_until = 0.0
        self.last_speech_at = 0.0
        self.last_wake_at = None
        self.last_wake_word = None
        self.segments = 0
        self.wakes = 0
        self.dropped = 0
        self.delivered = 0
        self.last_drop = None
        self.last_error = None
        self._recent = deque(maxlen=12)   # (去标点文本, 时间) —— 防重复投递
        # v0.3 滚动窗口：最近 windowSec 秒里过了垃圾过滤的段（供投递带上下文）
        self.recent = deque(maxlen=64)
        self._settings_cache = {}
        self._active_input_turn = None
        self._capture_at = None
        self._pulled_at = None

    # ---- 生命周期 --------------------------------------------------------

    def start(self):
        if self.is_alive():
            return False
        self.thread = threading.Thread(target=self._run, name="whale-always", daemon=True)
        _threads.add(self.thread)
        self.thread.start()
        return True

    def is_alive(self):
        return self.thread is not None and self.thread.is_alive()

    def stop(self, wait_s=2.0):
        self.stop_event.set()
        self._reset_capture("listener-stopped")
        self.paused.clear()
        thread = self.thread
        if thread is not None:
            try:
                thread.join(max(0.1, float(wait_s)))
            except Exception:
                pass
        self._close_stream()

    def _discard_audio(self):
        self._capture_generation += 1
        with self._blocks_lock:
            self._blocks = []
            self._block_bytes = 0
            self._capture_at = self._pulled_at = None

    def _reset_capture(self, reason):
        with self._wake_lock:
            _live_inference.cancel(self._inference_token)
            self._inference_token = None
            if self._wake_timer is not None:
                self._wake_timer.cancel()
                self._wake_timer = None
            self._wake_deadline = 0.0
            with self._state_lock:
                self.in_conversation = False
                self.wake_until = 0.0
                self.recent.clear()
                self._recent.clear()
            self._discard_audio()
            if self._active_input_turn is not None:
                self._active_input_turn.cancel(reason)
            self._active_input_turn = None

    def _wake_snapshot(self):
        active = self._wake_deadline > time.monotonic()
        state = ("disabled" if self.stop_event.is_set() else "paused" if self.paused.is_set()
                 else "error" if self.last_error and self._stream is None
                 else "starting" if self._stream is None else "listening" if active else "waiting")
        return {"state": state, "deadlineAt": int(self.wake_until * 1000) if active else None,
                "streamOpen": self._stream is not None or self._stream_lease is not None,
                "detection": "acoustic-after-utterance" if self._wake_detector_ready else "asr-after-utterance"}

    def _emit_wake_state(self, reason=None):
        if self.mode == "wake":
            emit("wake-state", **self._wake_snapshot(), reason=reason, captureId=self.capture_id,
                 voiceSessionId=cfg("voiceSessionId"), voiceSessionEpoch=cfg("voiceSessionEpoch"))

    def _arm_wake(self, word, st):
        with self._wake_lock:
            self._reset_capture("wake-armed")
            seconds = st["wakeListenTimeoutMs"] / 1000.0
            self._wake_deadline = time.monotonic() + seconds
            self.wake_until = time.time() + seconds
            self.last_wake_at = time.time()
            self.last_wake_word = word
            self.wakes += 1
            generation = self._capture_generation
            def expire():
                with self._wake_lock:
                    if generation != self._capture_generation or self._wake_deadline > time.monotonic():
                        return
                    self._reset_capture("wake-timeout")
                    self._emit_wake_state("timeout")
            self._wake_timer = threading.Timer(seconds, expire)
            self._wake_timer.daemon = True
            self._wake_timer.start()
            self._emit_wake_state("wake-word")

    def pause(self, wait_s=2.0):
        """PTT always wins and invalidates buffered audio, even during slow ASR."""
        self.paused.set()
        self._reset_capture("listener-paused")
        self._close_stream()
        self._emit_wake_state("ptt-override")
        with self._stream_lock:
            return self._stream_lease is None and not self._opening

    def resume(self):
        self._reset_capture("listener-resumed")
        self.paused.clear()
        self._emit_wake_state("resume")

    # ---- 音频流 ----------------------------------------------------------

    def _callback(self, indata, frames, time_info, status, generation=None):
        try:
            if status:
                log("always stream status: %s" % status)
            if self.stop_event.is_set() or self.paused.is_set():
                return
            raw = bytes(indata)
            with self._blocks_lock:
                if (self.stop_event.is_set() or self.paused.is_set()
                        or (generation is not None and generation != self._stream_generation)):
                    return
                self._blocks.append(raw)
                self._capture_at = time.time() * 1000
                self._block_bytes += len(raw)
                # worker 被 ASR/异常卡住时最多留 20s 音频；再久就只保最新的，别把内存吃满
                if self._block_bytes > SR * 4 * 20:
                    self._blocks = [raw]
                    self._block_bytes = len(raw)
        except Exception:
            pass

    def _pull(self):
        if _stdlib_pcm_route():
            with self._blocks_lock:
                if not self._blocks:
                    return _whale_asr_wasm.Float32Audio.empty()
                raw = b"".join(self._blocks)
                self._pulled_at = self._capture_at
                self._blocks = []
                self._block_bytes = 0
            return _whale_asr_wasm.Float32Audio.from_native_bytes(raw)
        import numpy as np

        with self._blocks_lock:
            if not self._blocks:
                return np.zeros(0, dtype="float32")
            raw = b"".join(self._blocks)
            self._pulled_at = self._capture_at
            self._blocks = []
            self._block_bytes = 0
        return np.frombuffer(raw, dtype="float32").copy()

    def _open_stream(self):
        with self._stream_lock:
            if (self._opening or self.stop_event.is_set() or self.paused.is_set()
                    or (self._stream_lease is not None and not self._stream_lease.failed)):
                return False
            self._opening = True
            generation = self._stream_generation
        lease = _CaptureLease()
        owned = False
        attempt = None
        def current(refresh=True):
            return (generation == self._stream_generation and not self.stop_event.is_set()
                    and not self.paused.is_set() and _capture_id == self._grant_capture_id
                    and (not refresh or reload_cfg() is not False)
                    and cfg("voiceSessionId") == self.session_id
                    and cfg("voiceSessionEpoch") == self.epoch)
        def publish_attempt():
            # Pause must see this identity before it returns and PTT publishes
            # its newer one. No native device calls run under this short lock.
            with self._stream_lock:
                if not current(refresh=False):
                    return None
                turn = InputTurn(self.mode)
                turn.session_id, turn.epoch = self.session_id, self.epoch
                turn.capture_id = self.capture_id
                turn.attempt()
                return turn
        def callback(*args):
            # Do not let a late callback from a closing stream enter a resumed
            # listener's new input. No device/control locks on PortAudio's thread.
            if generation == self._stream_generation:
                self._callback(*args, generation=generation)
        try:
            try:
                owned = _capture_device.acquire(lease, current)
            except (TimeoutError, _CaptureCloseUnconfirmed):
                if not current():
                    return False
                raise
            if not owned or not current():
                return False
            attempt = publish_attempt()
            if attempt is None:
                return False
            dev = cfg("device")
            lease.stream = _make_input_stream(dev, callback)
            if not current():
                return False
            lease.stream.start()
            if not current():
                return False
            with self._stream_lock:
                if not current(refresh=False):
                    return False
                self._stream = lease.stream
                self._stream_lease = lease
                owned = False  # The listener now owns cleanup, not this opener.
        except Exception:
            if attempt is None:
                attempt = publish_attempt()
            if attempt is not None:
                attempt.fail("device")
            raise
        finally:
            capture_error = sys.exc_info()[1]
            try:
                if owned and isinstance(capture_error, _CaptureCloseUnconfirmed):
                    _capture_device.release(lease, failed=True)
                elif owned:
                    try:
                        _close_capture(lease)
                    except Exception:
                        if capture_error is None:
                            raise
            finally:
                with self._stream_lock:
                    self._opening = False
        self._emit_wake_state("stream-open")
        log("always: 麦克风已打开 device=%r" % (dev if dev is not None else "default",))
        return True

    def _close_stream(self):
        with self._stream_lock:
            self._stream_generation += 1
            lease = self._stream_lease
            if lease is None or lease.closing:
                return
            lease.closing = True
            self._stream = None
        def close():
            try:
                _close_capture(lease)
            except Exception as exc:
                self.last_error = str(exc)
            finally:
                with self._stream_lock:
                    if lease.closed.is_set() and self._stream_lease is lease:
                        self._stream_lease = None
                _threads.discard(threading.current_thread())
        thread = threading.Thread(target=close, name="whale-always-close", daemon=True)
        _threads.add(thread)
        try:
            thread.start()
        except Exception:
            _threads.discard(thread)
            _capture_device.release(lease, failed=True)
            raise

    # ---- 配置 ------------------------------------------------------------

    def _settings(self):
        words = cfg("wakeWords", default=ALWAYS_DEFAULT_WAKE)
        if not isinstance(words, (list, tuple)):
            words = ALWAYS_DEFAULT_WAKE
        words = [str(w).strip() for w in words if str(w).strip()]
        out = {
            "wakeWords": words or list(ALWAYS_DEFAULT_WAKE),
            **wake_settings(),
            "conversationWindowMs": float(cfg("conversationWindowMs", default=30000) or 30000),
            "idleExitMs": float(cfg("idleExitMs", default=25000) or 25000),
            "minSpeechMs": float(cfg("alwaysMinSpeechMs", default=350) or 350),
            "silenceMs": float(cfg("alwaysSilenceMs", default=600) or 600),
            "maxSegmentMs": float(cfg("alwaysMaxSegmentMs", default=15000) or 15000),
            "windowSec": max(5.0, float(cfg("windowSec", default=60) or 60)),
            "semantic": semantic_settings(),
            "minRms": float(cfg("vad", "minRms", default=0.006) or 0.006),
            "noiseMult": float(cfg("vad", "noiseMult", default=1.8) or 1.8),
            "startFrames": int(cfg("vad", "startFrames", default=3) or 3),
            "dropSpeakerFails": cfg("dropWhenSpeakerFails", default=True) is not False,
        }
        self._settings_cache = out
        return out

    # ---- 主循环 ----------------------------------------------------------

    def _new_state(self):
        return {
            "voiced_run": 0,
            "input_turn": None,
            "last_voiced_at": None,
            "in_seg": False,
            "seg": [],
            "voiced_ms": 0.0,
            "silence_ms": 0.0,
            "last_voiced_len": 0,
            "pre": deque(maxlen=15),   # 300ms 预卷，别把句首切掉
            "noise": deque(maxlen=60),  # 非语音帧 RMS，自适应底噪（~1.2s）
        }

    def _run(self):
        try:
            self._loop()
        except Exception as exc:
            if getattr(exc, "audioDeviceFailure", False):
                turn = self._active_input_turn or InputTurn(self.mode)
                turn.session_id, turn.epoch, turn.capture_id = self.session_id, self.epoch, self.capture_id
                turn.fail("device")
            self.last_error = str(exc)
            log("always 线程异常：%r" % (exc,))
            emit("always-event", state="error", message=str(exc), detail=traceback.format_exc()[-800:])
        finally:
            self._reset_capture("listener-stopped")
            self._close_stream()
            with self._state_lock:
                self.started_at = None
                self.in_conversation = False
            self._emit_wake_state("listener-stopped")
            emit("always-event", state="stopped")
            _threads.discard(threading.current_thread())

    def _loop(self):
        stdlib_pcm = _stdlib_pcm_route()
        if not stdlib_pcm:
            import numpy as np

        st = self._settings()
        self.started_at = time.time()
        emit(
            "always-event",
            state="started",
            device=device_info(),
            settings={
                k: st[k]
                for k in (
                    "wakeWords",
                    "conversationWindowMs",
                    "idleExitMs",
                    "minSpeechMs",
                    "silenceMs",
                    "maxSegmentMs",
                )
            },
        )
        frame_buf = (_whale_asr_wasm.Float32Audio.empty() if stdlib_pcm
                     else np.zeros(0, dtype="float32"))
        state = self._new_state()
        stream_errors = 0
        capture_generation = self._capture_generation
        next_wake_check = 0.0
        while not self.stop_event.is_set():
            if capture_generation != self._capture_generation:
                state = self._new_state()
                frame_buf = (_whale_asr_wasm.Float32Audio.empty() if stdlib_pcm
                             else np.zeros(0, dtype="float32"))
                capture_generation = self._capture_generation
            if self.paused.is_set():
                if state.get("input_turn") is not None:
                    state["input_turn"].cancel("listener-paused")
                state = self._new_state()
                frame_buf = (_whale_asr_wasm.Float32Audio.empty() if stdlib_pcm
                             else np.zeros(0, dtype="float32"))
                self._close_stream()
                with self._blocks_lock:
                    self._blocks = []
                    self._block_bytes = 0
                time.sleep(0.05)
                continue
            if self._stream is None:
                try:
                    if self._open_stream():
                        self.last_error = None
                        stream_errors = 0
                except Exception as exc:
                    stream_errors += 1
                    self.last_error = str(exc)
                    log("always: 打开麦克风失败（第 %d 次）：%r" % (stream_errors, exc))
                    if stream_errors == 1:
                        emit("always-event", state="error", message="打开麦克风失败: %s" % exc)
                        self._emit_wake_state("stream-error")
                    if isinstance(exc, _CaptureCloseUnconfirmed):
                        return  # Restart is required; do not retry/log forever.
                    self.stop_event.wait(min(5.0, 1.0 + stream_errors))
                    continue

            _check_input_error(self._stream)
            if self.mode == "wake" and time.monotonic() >= next_wake_check:
                ready = bool(_wake_candidates(st["wakeWordAliases"]) and _wake_acoustic.ready(_whale_asr_wasm))
                next_wake_check = time.monotonic() + 2
                if self._wake_detector_ready != ready:
                    self._wake_detector_ready = ready
                    self._emit_wake_state("detector-status")
            fresh = self._pull()
            if fresh.size:
                if stdlib_pcm:
                    frame_buf.append(fresh)
                    nframes = frame_buf.size // FRAME
                    if nframes:
                        block = [frame_buf[index * FRAME:(index + 1) * FRAME]
                                 for index in range(nframes)]
                        frame_buf = frame_buf[nframes * FRAME:]
                        self._consume_frames(block, state, st, captured_at=self._pulled_at)
                else:
                    frame_buf = np.concatenate([frame_buf, fresh]) if frame_buf.size else fresh
                    nframes = frame_buf.size // FRAME
                    if nframes:
                        block = frame_buf[: nframes * FRAME].reshape(nframes, FRAME)
                        frame_buf = frame_buf[nframes * FRAME:].copy()
                        self._consume_frames(block, state, st, captured_at=self._pulled_at)
            self._check_idle(st)
            time.sleep(0.02)

    # ---- VAD / 分段 -------------------------------------------------------

    def _consume_frames(self, block, state, st, captured_at=None):
        noise = state["noise"]
        thr = max(
            st["minRms"],
            (statistics.median(noise) if noise else 0.0) * st["noiseMult"],
        )
        captured_at = time.time() * 1000 if captured_at is None else captured_at
        capture_generation = self._capture_generation
        for index, row in enumerate(block):
            if self.stop_event.is_set() or self.paused.is_set() or capture_generation != self._capture_generation:
                state.clear()
                state.update(self._new_state())
                return
            frame_at = captured_at - (len(block) - index - 1) * FRAME_MS
            rms = rms_of(row)
            voiced = rms > thr
            if voiced:
                state["last_voiced_at"] = frame_at
                if state.get("input_turn") is not None:
                    state["input_turn"].voiced(frame_at)
            state["pre"].append(row)
            if not state["in_seg"]:
                if voiced:
                    state["voiced_run"] += 1
                    if state["voiced_run"] >= st["startFrames"]:
                        state["in_seg"] = True
                        turn = InputTurn(self.mode)
                        turn.capture_generation = capture_generation
                        turn.capture_id = self.capture_id
                        state["input_turn"] = self._active_input_turn = turn
                        turn.voiced(frame_at)
                        if self.mode == "wake":
                            turn.attempt()
                        else:
                            turn.start(frame_at)
                        state["seg"] = list(state["pre"])
                        state["voiced_ms"] = state["voiced_run"] * FRAME_MS
                        state["silence_ms"] = 0.0
                        state["last_voiced_len"] = len(state["seg"])
                else:
                    state["voiced_run"] = 0
                    noise.append(rms)
                continue

            state["seg"].append(row)
            if voiced:
                state["voiced_ms"] += FRAME_MS
                state["silence_ms"] = 0.0
                state["last_voiced_len"] = len(state["seg"])
            else:
                state["silence_ms"] += FRAME_MS
            reason = None
            if state["silence_ms"] >= st["silenceMs"]:
                reason = "silence"
            elif len(state["seg"]) * FRAME_MS >= st["maxSegmentMs"]:
                reason = "max"
            if reason:
                audio = self._finish_segment(state, st, reason)
                state["in_seg"] = False
                state["voiced_run"] = 0
                state["silence_ms"] = 0.0
                if audio is not None:
                    # 串行处理：这段 ASR 跑完才继续吃音频，回调那边只是攒 bytes
                    self._handle_segment(audio, st, input_turn=state.get("input_turn"))
                state["input_turn"] = None

    def _finish_segment(self, state, st, reason):
        seg = state["seg"][: max(1, state["last_voiced_len"])]  # 切掉尾巴静音
        voiced_ms = state["voiced_ms"]
        turn = state.get("input_turn")
        if turn is not None:
            if voiced_ms < st["minSpeechMs"]:
                turn.cancel("too-short")
            else:
                turn.end(reason)
        state["seg"] = []
        state["voiced_ms"] = 0.0
        state["last_voiced_len"] = 0
        state["pre"].clear()
        if not seg:
            return None
        if voiced_ms < st["minSpeechMs"]:
            self._drop("too-short", extra={"voicedMs": int(voiced_ms)})
            return None
        dbg("always 分段(%s) %d 帧 / 有声 %.0fms" % (reason, len(seg), voiced_ms))
        if isinstance(seg[0], _whale_asr_wasm.Float32Audio):
            return _whale_asr_wasm.Float32Audio.concatenate(seg)
        import numpy as np
        return np.concatenate([np.asarray(x, dtype="float32") for x in seg])

    # ---- 对话模式 --------------------------------------------------------

    def _in_conversation_now(self):
        now = time.time()
        with self._state_lock:
            return bool(self.in_conversation and now < self.wake_until)

    def _check_idle(self, st):
        if self.mode == "wake":
            with self._wake_lock:
                if self._wake_deadline and time.monotonic() >= self._wake_deadline:
                    self._reset_capture("wake-timeout")
                    self._emit_wake_state("timeout")
            return
        now = time.time()
        with self._state_lock:
            if not self.in_conversation:
                return
            quiet = now - self.last_speech_at
            if quiet * 1000.0 < st["idleExitMs"]:
                return
            self.in_conversation = False
            self.wake_until = 0.0
        log("always: 静音 %.1fs，退出对话模式" % quiet)
        emit("always-event", state="exit", reason="idle", quietMs=int(quiet * 1000))

    def _is_repeat(self, plain, now):
        for old_text, old_at in list(self._recent):
            if old_text == plain and now - old_at < 3.0:
                return True
        self._recent.append((plain, now))
        return False

    # ---- 滚动窗口（v0.3）--------------------------------------------------

    def _prune_window(self, now=None):
        """丢掉超过 windowSec 的段；窗口只保留「过了垃圾过滤」的语音。"""
        now = time.time() if now is None else float(now)
        window_sec = float(self._settings_cache.get("windowSec") or 60.0)
        cutoff = now - window_sec
        with self._state_lock:
            while self.recent and float(self.recent[0].get("at") or 0.0) < cutoff:
                self.recent.popleft()

    def _remember(self, now, text, wake, score, speaker_ok):
        """把当前段记进滚动窗口（在投递/丢弃之前调用，供下一段当上下文）。"""
        self._prune_window(now)
        item = {
            "at": float(now),
            "text": str(text or ""),
            "wake": bool(wake),
            "score": round(float(score), 4) if score is not None else None,
            "speaker_ok": speaker_ok,
        }
        with self._state_lock:
            self.recent.append(item)

    def _recent_texts(self, now=None, limit=8):
        """最近窗口里的文本（按时间正序，最多 limit 条；相邻重复去掉）。"""
        self._prune_window(now)
        with self._state_lock:
            texts = [str(x.get("text") or "") for x in self.recent]
        clean = []
        for text in texts:
            if not text:
                continue
            if clean and clean[-1] == text:
                continue
            clean.append(text)
        return clean[-max(1, int(limit)):]

    def window_snapshot(self, limit=24):
        self._prune_window()
        with self._state_lock:
            items = list(self.recent)
        out = []
        for item in items[-max(1, int(limit)):]:
            out.append(
                {
                    "at": int(float(item.get("at") or 0.0) * 1000),
                    "text": item.get("text") or "",
                    "wake": bool(item.get("wake")),
                    "score": item.get("score"),
                    "speaker_ok": item.get("speaker_ok"),
                }
            )
        return out

    def recent_window(self):
        """op recent 用：给窗口整体（含 windowSec），顺便裁掉过期的。"""
        self._prune_window()
        items = self.window_snapshot(limit=64)
        return {
            "windowSec": float(self._settings_cache.get("windowSec") or 60.0),
            "count": len(items),
            "items": items,
        }

    # ---- 单段处理 --------------------------------------------------------

    def _drop(self, reason, extra=None):
        with self._state_lock:
            self.dropped += 1
            self.last_drop = {"at": int(time.time() * 1000), "reason": reason}
        emit("always-drop", reason=reason, **(extra or {}))

    def _handle_segment(self, audio, st, input_turn=None):
        # Scope the audio to its onset, not whatever grant happens to be active
        # after segmentation/queued processing finishes.
        voice_session_id = input_turn.session_id if input_turn is not None else cfg("voiceSessionId")
        voice_session_epoch = input_turn.epoch if input_turn is not None else cfg("voiceSessionEpoch")
        capture_generation = getattr(input_turn, "capture_generation", self._capture_generation)

        def still_authorized():
            # Inference may finish after stop, pause, or revoke/re-enable of
            # the same session. Missing epochs retain legacy compatibility.
            reload_cfg()
            return bool(
                voice_session_id
                and not self.stop_event.is_set()
                and not self.paused.is_set()
                and capture_generation == self._capture_generation
                and cfg("voiceSessionId") == voice_session_id
                and cfg("voiceSessionEpoch") == voice_session_epoch
                and (token is None or not token.is_set())
            )

        with self._state_lock:
            self.segments += 1
        timing = StageTimings()
        token = None
        try:
            # Serialize reservation with pause/reset, not with native inference.
            # PTT reserves only after pause completes, so a stale listener cannot
            # replace the newer PTT token in the shutdown gap.
            with self._wake_lock:
                if not still_authorized():
                    return
                token = _live_inference.new()
                self._inference_token = token
            if not _live_inference.acquire(token, still_authorized):
                return
            if not still_authorized():
                return
            with timing.stage("normalizeMs"):
                audio = normalize(audio)
            dur = float(len(audio) / SR) if audio.size else 0.0
            if dur < 0.25:
                self._drop("too-short")
                return
            if not still_authorized():
                return
            # 1) 声纹先过闸：别人的声音/环境音不跑 ASR（省时间，也是投递闸门）
            score, ok, who = None, None, None
            if speaker_verification_enabled():
                with timing.stage("speakerMs"):
                    score, ok, who = identify(audio)
            if not still_authorized():
                return
            if ok is False and st["dropSpeakerFails"]:
                self._drop("speaker", extra={"speaker_score": score})
                return
            # 2) ASR 只对过了声纹的段跑
            with timing.stage("asrMs"), _inference_authorization(still_authorized):
                asr = transcribe_audio(audio)
            if not still_authorized():
                return
            text = (asr.get("text") or "").strip()
            plain = _plain_text(text)
            # 和 PTT 同口径的噪声过滤：太短、或纯英文短词（"The."）不当真
            if self.mode != "wake" and (len(plain) < 2 or (plain.isascii() and plain.isalpha() and len(plain) < 4)):
                self._drop("garbage")
                return
            if self.mode == "wake":
                self._handle_wake_text(text, asr, audio, dur, st, input_turn, timing, score, ok, who, still_authorized)
                return
            with timing.stage("prosodyMs"):
                pros = prosody(audio, text, dur)
            if not still_authorized():
                return
            now = time.time()
            if self._is_repeat(plain, now):
                self._drop("repeat")
                return
            # Default free microphone delivery has no wake gate. Only the new
            # literal opt-in enables wake words and semantic-model requests.
            # Observe the live setting after ASR, not a stale segment snapshot.
            sem = semantic_settings()
            experimental_wake = sem["enabled"]
            wake = _match_wake(text, st["wakeWords"]) if experimental_wake else None
            wake_source = "wakeword" if wake else None
            sem_score, sem_ref, sem_error = None, None, None
            if experimental_wake and not wake and not self._in_conversation_now():
                if sem["enabled"]:
                    with timing.stage("semanticMs"):
                        sem_score, sem_ref, sem_error = semantic_score(text)
                    if sem_error is None and sem_score is not None and sem_score >= sem["threshold"]:
                        wake = sem_ref or "语义"
                        wake_source = "semantic"
            if experimental_wake and not semantic_settings()["enabled"]:
                experimental_wake = False
                wake, wake_source = None, None
                sem_score, sem_ref, sem_error = None, None, None
            if not still_authorized():
                return
            # 3.5) 投递上下文：当前段还没进窗口，所以「最近」天然不含它
            recent_texts = self._recent_texts(now, limit=8)
            result = {
                "event": "transcript",
                "mode": "always",
                "captureId": self.capture_id,
                "inputTurnId": input_turn.id if input_turn is not None else None,
                "voiceSessionId": voice_session_id,
                "voiceSessionEpoch": voice_session_epoch,
                "text": text,
                "lang": asr.get("lang") or "auto",
                "emotion": asr.get("emotion"),
                "event_tag": asr.get("event_tag"),
                "speaker_score": score,
                "speaker_ok": ok,
                "speaker_name": who,
                "speaker_verification": speaker_verification_enabled(),
                "traceId": timing.trace_id,
                "dur": round(dur, 2),
                "prosody": pros,
                "recent": recent_texts,
            }
            if sem_score is not None:
                result["semantic_score"] = sem_score
            if sem_error:
                result["semantic_error"] = sem_error
            if wake:
                wake_until = now + st["conversationWindowMs"] / 1000.0
                with self._state_lock:
                    self.in_conversation = True
                    self.wake_until = wake_until
                    self.last_wake_at = now
                    self.last_wake_word = wake
                    self.last_speech_at = now
                    self.wakes += 1
                log(
                    "always: 唤醒 %r（%s%s），进入对话模式 %.0fs"
                    % (
                        wake,
                        wake_source,
                        " %.3f" % sem_score if sem_score is not None else "",
                        st["conversationWindowMs"] / 1000.0,
                    )
                )
                event = {
                    "event": "always-event",
                    "state": "wake",
                    "wake": wake,
                    "wake_source": wake_source,
                    "wakeUntil": int(wake_until * 1000),
                    "conversationWindowMs": int(st["conversationWindowMs"]),
                }
                if sem_score is not None:
                    event["semantic_score"] = sem_score
                if not still_authorized():
                    return
                emit(**event)
                result["wake"] = wake
                result["wake_source"] = wake_source
            elif not experimental_wake or self._in_conversation_now():
                with self._state_lock:
                    self.last_speech_at = now
            else:
                extra = {"dur": round(dur, 2)}
                if sem_score is not None:
                    extra["semantic_score"] = sem_score
                if sem_error:
                    extra["semantic_error"] = True
                self._drop("no-wake", extra=extra)
                return
            if not still_authorized():
                return
            self._remember(now, text, bool(wake), sem_score, ok)
            with self._state_lock:
                self.delivered += 1
            result["timings"] = timing.snapshot()
            emit(**result)
        except Exception as exc:
            if not still_authorized():
                return
            if input_turn is not None:
                input_turn.fail("recognition")
            self.last_error = str(exc)
            log("always 段处理异常：%r" % (exc,))
            emit(
                "always-event",
                state="error",
                message="段处理失败: %s" % exc,
                detail=traceback.format_exc()[-600:],
            )
        finally:
            if token is not None:
                _live_inference.release(token)
                with self._wake_lock:
                    if self._inference_token is token:
                        self._inference_token = None

    def _handle_wake_text(self, text, asr, audio, dur, st, input_turn, timing, score, ok, who, authorized):
        words = st["wakeWordAliases"]
        with self._wake_lock:
            if not authorized():
                return
            self._check_idle(st)
            if not authorized():
                return
            word, command = match_wake_prefix(text, words)
            armed = self._wake_deadline > time.monotonic()
        acoustic = False
        if not word and not armed:
            with timing.stage("wakeMatchMs"), _inference_authorization(authorized):
                word, command, tail_asr = self._match_wake_audio(text, audio, words, authorized)
            acoustic = bool(word)
            if tail_asr is not None:
                asr = tail_asr
        with self._wake_lock:
            if not authorized():
                return
            if not word and not armed:
                # No transcript, raw text log, rolling history, or downstream input
                # activity is emitted for unrelated speech before wake. Only
                # the content-free attempt identity is used for failure fencing.
                self._drop("no-wake")
                return
            if word and not command:
                self._arm_wake(word, st)
                return
            command = command if word else text
            if not _plain_text(command):
                return
            plain = _plain_text(command)
            if self._is_repeat(plain, time.time()):
                self._drop("repeat")
                return
        if not authorized():
            return
        # Model work must never hold the state lock: PTT/stop/timeout can
        # invalidate this turn immediately while optional prosody is running.
        with timing.stage("prosodyMs"):
            pros = prosody(audio, command, dur)
        with self._wake_lock:
            if not authorized():
                return
            # Accepted command is one shot. Do not assume TTS playback completed.
            if self._wake_timer is not None:
                self._wake_timer.cancel()
                self._wake_timer = None
            self._wake_deadline = self.wake_until = 0.0
            if word:
                self.last_wake_at = time.time()
                self.last_wake_word = word
                self.wakes += 1
            if input_turn is not None:
                input_turn.start()
                input_turn.end("wake-command")
            result = {"event": "transcript", "mode": "wake", "captureId": self.capture_id,
                      "inputTurnId": input_turn.id if input_turn else None,
                      "voiceSessionId": input_turn.session_id if input_turn else cfg("voiceSessionId"),
                      "voiceSessionEpoch": input_turn.epoch if input_turn else cfg("voiceSessionEpoch"),
                      "text": command, "lang": asr.get("lang") or "auto", "emotion": asr.get("emotion"),
                      "event_tag": asr.get("event_tag"), "speaker_score": score, "speaker_ok": ok,
                      "speaker_name": who, "speaker_verification": speaker_verification_enabled(),
                      "traceId": timing.trace_id, "dur": round(dur, 2), "prosody": pros, "recent": [],
                      "wake_source": "acoustic" if acoustic else "wakeword", "timings": timing.snapshot()}
            if word:
                result["wake"] = word
            self.delivered += 1
            emit(**result)
            self._discard_audio()
            self._emit_wake_state("command-accepted")

    def _match_wake_audio(self, text, audio, words, authorized):
        if not authorized() or _wake_acoustic.binding(_whale_asr_wasm) is None:
            return None, None, None
        _, match = _wake_acoustic.detect(_whale_asr_wasm, audio, _wake_candidates(words))
        if not authorized() or match is None or match[0] >= len(words):
            return None, None, None
        index, _, end_ms = match
        word = words[index]
        # The terminal phone timestamp is emitted on a 40ms frame grid.
        # Confirm voiced audio past that phone before decoding the instruction.
        remainder = audio[int((end_ms + 65) * SR / 1000):]
        has_command = len(remainder) >= SR * 0.08 and rms_of(remainder) >= 0.012
        if _wake_conflicting_prefix(text, word, allow_terminal=has_command and len(word) >= 3):
            return None, None, None
        if not has_command:
            return word, "", None
        # Try the measured cut first. Some ASR models hallucinate long
        # repeats on a very short clip; one wider cut gives the speech
        # decoder left context before falling back to a one-shot wait.
        for offset in (30, -45):
            if not authorized():
                return None, None, None
            tail = audio[max(0, int((end_ms + offset) * SR / 1000)):]
            try:
                recognized = transcribe_audio(tail)
            except _InferenceCancelled:
                raise
            except _BACKEND_ERRORS as exc:
                dbg("wake tail ASR failed: %s" % type(exc).__name__)
                continue
            if not authorized():
                return None, None, None
            command = (recognized.get("text") or "").strip()
            _, suffix = match_wake_prefix(command, [word])
            if suffix is not None:
                command = suffix
            plain = _plain_text(command)
            if 0 < len(plain) <= max(32, int(len(tail) * 24 / SR)):
                return word, _preserve_wake_command(text, word, command), recognized
        return word, "", None

    # ---- 状态快照 --------------------------------------------------------

    def status(self):
        now = time.time()
        with self._state_lock:
            snap = {
                "enabled": self.is_alive(),
                "listenMode": self.mode,
                "captureId": self.capture_id,
                "wake": self._wake_snapshot() if self.mode == "wake" else {"state": "disabled", "deadlineAt": None, "streamOpen": False, "detection": "asr-after-utterance"},
                "threadAlive": self.is_alive(),
                "streamOpen": self._stream is not None or self._stream_lease is not None,
                "paused": self.paused.is_set(),
                "inConversation": bool(self.in_conversation and now < self.wake_until),
                "wakeUntil": int(self.wake_until * 1000) if self.wake_until else None,
                "lastWakeAt": int(self.last_wake_at * 1000) if self.last_wake_at else None,
                "lastWakeWord": self.last_wake_word,
                "lastSpeechAt": int(self.last_speech_at * 1000) if self.last_speech_at else None,
                "segments": self.segments,
                "wakes": self.wakes,
                "dropped": self.dropped,
                "delivered": self.delivered,
                "lastDrop": self.last_drop,
                "lastError": self.last_error,
                "startedAt": int(self.started_at * 1000) if self.started_at else None,
                "settings": dict(self._settings_cache),
            }
        snap["recent"] = self.window_snapshot(limit=12)
        snap["recentCount"] = len(snap["recent"])
        snap["semantic"] = semantic_status()
        snap["device"] = device_info()
        return snap


_always = None


def _always_pause():
    inst = _always
    if inst is not None and inst.is_alive():
        try:
            inst.pause()
        except Exception as exc:
            log("always pause 失败：%r" % (exc,))


def _always_resume():
    inst = _always
    if inst is not None and inst.is_alive():
        try:
            inst.resume()
        except Exception as exc:
            log("always resume 失败：%r" % (exc,))


def always_status():
    """给 op_status / op_always-status 用的统一快照（没开也返回配置字段）。"""
    words = cfg("wakeWords", default=ALWAYS_DEFAULT_WAKE)
    base = {
        "listenMode": "ptt",
        "wake": {"state": "disabled", "deadlineAt": None, "streamOpen": False, "detection": "asr-after-utterance"},
        "wakeWords": list(words) if isinstance(words, (list, tuple)) else list(ALWAYS_DEFAULT_WAKE),
        "conversationWindowMs": int(cfg("conversationWindowMs", default=30000) or 30000),
        "idleExitMs": int(cfg("idleExitMs", default=25000) or 25000),
        "alwaysMinSpeechMs": int(cfg("alwaysMinSpeechMs", default=350) or 350),
        "alwaysSilenceMs": int(cfg("alwaysSilenceMs", default=600) or 600),
        "alwaysMaxSegmentMs": int(cfg("alwaysMaxSegmentMs", default=15000) or 15000),
        "windowSec": int(cfg("windowSec", default=60) or 60),
        "semantic": semantic_status(),
        "ptt": ptt_status(),
    }
    inst = _always
    if inst is None:
        base.update(
            {
                "enabled": False,
                "threadAlive": False,
                "streamOpen": False,
                "paused": False,
                "inConversation": False,
                "wakeUntil": None,
                "lastWakeAt": None,
                "lastWakeWord": None,
                "lastSpeechAt": None,
                "segments": 0,
                "wakes": 0,
                "dropped": 0,
                "delivered": 0,
                "lastDrop": None,
                "lastError": None,
                "startedAt": None,
                "settings": None,
                "recent": [],
                "recentCount": 0,
            }
        )
        return base
    base.update(inst.status())
    return base


# ---------------------------------------------------------------------------
# 任务线程 + 看门狗
# ---------------------------------------------------------------------------

_current_recorder = None
_rec_lock = threading.Lock()
# Order capture startup and always-on resume without blocking explicit stop on
# microphone/device I/O. Synchronous startup failure can re-enter finish().
_recording_start_lock = threading.RLock()
_gen = 0          # 录音代数：新的一次录音会让旧结果失效，避免重复投递
_threads = set()  # 活着的任务线程（quit 时稍等一下）


def _spawn(name, fn, timeout_s):
    parent = getattr(_request_context, "current", None)
    context = {"requestId": parent.get("requestId") if parent else None,
               "lock": threading.RLock(), "done": False, "watchdog": True}

    def on_timeout():
        with context["lock"]:
            if context["done"]:
                return
            context["done"] = True
            fields = {"message": "%s 超时（>%.0fs）" % (name, timeout_s)}
            if context["requestId"] is not None:
                fields["requestId"] = context["requestId"]
            try:
                _emit_payload("error", fields)
            except Exception:
                pass  # Reporting failure must not skip recorder cleanup.
            # Only an enrollment's own recorder can be cancelled. File tasks
            # never own the microphone, and an old task cannot stop a new one.
            owned = context.get("recorder")
            if owned is not None:
                release_recorder(cancel=True, reason="timeout", expected=owned)

    timer = threading.Timer(timeout_s, on_timeout)
    timer.daemon = True
    context["timer"] = timer

    def guard():
        _request_context.current = context
        try:
            with context["lock"]:
                if context["done"]:
                    return
            fn()
        except Exception as exc:
            emit("error", message="%s 失败: %s" % (name, exc), detail=traceback.format_exc()[-800:])
            log("%s 异常: %r" % (name, exc))
        finally:
            with context["lock"]:
                context["done"] = True
                timer.cancel()
            _request_context.current = None
            _threads.discard(threading.current_thread())

    thread = threading.Thread(target=guard, name=name, daemon=True)
    thread._whale_timer = timer
    _threads.add(thread)
    # The watchdog is installed before even an instant task can complete.
    timer.start()
    thread.start()
    return thread


def release_recorder(cancel=False, reason="stopped", expected=None):
    global _current_recorder, _gen
    with _rec_lock:
        current = _current_recorder
        # ASR no longer owns the microphone slot, but its control still owns
        # this exact input. Cancelling it must never release a newer capture.
        rec = expected if cancel and expected is not None else current
        if expected is not None and rec is not expected:
            return
        if cancel and rec is not None:
            if getattr(rec, "result_emitted", False):
                return  # A submitted input cannot be recalled by this protocol.
            rec.cancelled = True
            _live_inference.cancel(getattr(rec, "_inference_token", None))
        if current is rec:
            _current_recorder = None
            if cancel and rec is not None:
                _gen += 1
                rec.cancelled_generation = _gen
    if rec is not None:
        turn = getattr(rec, "input_turn", None)
        if turn is not None:
            if cancel:
                turn.cancel(reason, allow_ended=True)
            else:
                turn.released_at = time.time() * 1000
        rec.stop_event.set()


def start_recording(*args, **kwargs):
    context = getattr(_request_context, "current", None)
    if context is not None and context.get("watchdog"):
        with context["lock"]:
            if context["done"]:
                raise RuntimeError("录音任务已超时")
    return _start_recording(*args, **kwargs)


def _start_recording(max_seconds=None, silence_ms=None, on_done=None, tag="ptt",
                     no_speech_ms=None, min_seconds=None, on_finish=None):
    """起一次录音。on_done 给了就由它接管结果；否则走 normalize/声纹/ASR/发放 transcript。

    侧键 PTT 复用这条链路（不重复实现识别）：
      no_speech_ms  —— 覆盖 vad.noSpeechMs（按住后隔几秒才开口也不算「没人说话」）
      min_seconds   —— 短于它直接丢（防手滑点一下投一条「没听清人话」）
      on_finish     —— 录音线程收尾回调（在 _always_resume 之后），用来复位侧键状态
    """
    global _current_recorder, _gen
    reload_cfg()
    voice_session_id = cfg("voiceSessionId")
    voice_session_epoch = cfg("voiceSessionEpoch")
    capture_id = _capture_id
    if not voice_session_id:
        raise RuntimeError("语音权限未开启；请在目标会话明确要求开启语音")
    # Construct/validate before changing an existing capture. These objects do
    # not open the microphone until the worker starts.
    rec = Recorder(max_seconds=max_seconds, silence_ms=silence_ms, no_speech_ms=no_speech_ms)
    if tag.startswith("ptt"):
        rec.input_turn = InputTurn(tag)
    rec._inference_token = None
    my_gen = None
    context = getattr(_request_context, "current", None)
    finish_lock = threading.Lock()
    finished = False

    def capture_grant_current():
        return (reload_cfg() is not False and cfg("voiceSessionId") == voice_session_id
                and cfg("voiceSessionEpoch") == voice_session_epoch
                and _capture_id == capture_id)

    def inference_current():
        # Never hold the gate while checking configuration or recorder ownership.
        if not capture_grant_current():
            return False
        with _rec_lock:
            return (my_gen == _gen and not getattr(rec, "cancelled", False)
                    and (rec._inference_token is None or not rec._inference_token.is_set()))

    def assert_capture_current(check_recorder=False):
        # Startup can wait behind another capture or slow device shutdown.
        # Never adopt a new grant just because this queued operation got its turn.
        if not capture_grant_current():
            raise RuntimeError("语音授权或录音轮次已改变，未启动录音")
        if check_recorder:
            with _rec_lock:
                if _current_recorder is not rec or my_gen != _gen or rec.stop_event.is_set():
                    raise _CaptureCancelled("录音启动已取消")

    def capture_allowed():
        if not capture_grant_current():
            return False
        with _rec_lock:
            return _current_recorder is rec and my_gen == _gen and not rec.stop_event.is_set()
    rec._capture_allowed = capture_allowed

    def finish():
        nonlocal finished
        with finish_lock:
            if finished:
                return
            finished = True
        _live_inference.cancel(rec._inference_token)
        # Capture can fail before normal release, or a newer recording can have
        # replaced this one. Only release/resume resources owned by this turn.
        with _rec_lock:
            if _current_recorder is rec:
                globals()["_current_recorder"] = None
        def resume_current():
            # Serialize resume with startup pause, including a pause delayed
            # inside device shutdown. Explicit stop never needs this lock.
            with _recording_start_lock:
                # Revocation is saved before the helper receives always-off.
                # Do not reopen that listener in the intervening cleanup gap.
                if not capture_grant_current():
                    return
                with _rec_lock:
                    current = my_gen == _gen or (getattr(rec, "cancelled_generation", None) == _gen
                                                and _current_recorder is None)
                    if current:
                        _always_resume()
        cleanups = []
        if getattr(rec, "input_turn", None) is not None:
            cleanups.append(lambda: rec.input_turn.cancel("recording-finished"))
        cleanups.append(resume_current)
        if on_finish is not None:
            cleanups.append(lambda: on_finish(rec))
        for cleanup in cleanups:
            try:
                cleanup()
            except Exception as exc:
                # One failed notification cannot prevent the PTT latch or the
                # remaining resource owners from receiving their finish call.
                log("录音收尾失败 (%s): %r" % (tag, exc))

    def report_failure(code):
        if inference_current() and getattr(rec, "input_turn", None) is not None:
            rec.input_turn.attempt()
            rec.input_turn.fail(code)

    def work():
        _request_context.current = context
        failure_code = "device"
        try:
            assert_capture_current(check_recorder=True)
            audio = rec.run()
            failure_code = "recognition"
            if rec.reason == "no-speech":
                report_failure("no-speech")
            if getattr(rec, "input_turn", None) is not None:
                if rec.reason == "no-speech" or (min_seconds is not None and rec.duration < float(min_seconds)):
                    rec.input_turn.cancel("no-speech" if rec.reason == "no-speech" else "too-short")
                else:
                    rec.input_turn.end(rec.reason)
            stopped_at = time.perf_counter()
            with _rec_lock:
                if _current_recorder is rec:
                    globals()["_current_recorder"] = None
                stale = my_gen != _gen or getattr(rec, "cancelled", False)
            if min_seconds is not None and rec.duration < float(min_seconds):
                log("丢弃过短的录音 (%s %.2fs)" % (tag, rec.duration))
                return
            if rec.reason == "no-speech":
                if not stale:
                    emit("error", _recording=(rec, my_gen), message="没听到语音：设备没声音，或麦克风被静音/选错了输入设备")
                return
            if stale:
                log("丢弃过期的录音结果 (%s)" % tag)
                return
            if on_done is not None:
                on_done(rec, audio)
                return
            token = rec._inference_token
            try:
                if not _live_inference.acquire(token, inference_current):
                    return
                result = full_result(audio, is_current=inference_current)
            finally:
                _live_inference.release(token)
            if result is None:
                return
            # Inference may outlive a newer recording or a permission switch.
            with _rec_lock:
                if my_gen != _gen or getattr(rec, "cancelled", False):
                    log("丢弃识别期间已过期的录音 (%s)" % tag)
                    return
            reload_cfg()
            if (cfg("voiceSessionId") != voice_session_id
                    or cfg("voiceSessionEpoch") != voice_session_epoch):
                log("丢弃已撤回授权的录音 (%s)" % tag)
                return
            if capture_id != _capture_id:
                return
            with _rec_lock:
                if my_gen != _gen or getattr(rec, "cancelled", False):
                    return
            if "error" in result:
                report_failure("recognition")
                emit("error", _recording=(rec, my_gen), message=result["error"])
                return
            # 环境音/误识别过滤：太短或纯英文短词（如 "The."）不当真
            plain = "".join(
                ch for ch in (result.get("text") or "")
                if ch.isalnum() or "\u4e00" <= ch <= "\u9fff"
            )
            if len(plain) < 2 or (plain.isascii() and plain.isalpha() and len(plain) < 4):
                report_failure("no-speech")
                emit("error", _recording=(rec, my_gen), message="没听清人话（识别为 %r），已丢弃" % (result.get("text") or "")[:20])
                return
            # 侧键 PTT：按键即意图，声纹不过也放行（声纹只用在常听模式）
            if tag.startswith("ptt") and result.get("speaker_ok") is False:
                log("ptt: 声纹未过（%.3f），按键即意图，放行" % float(result.get("speaker_score") or 0.0))
                result["speaker_ok"] = None
            result["voiceSessionId"] = voice_session_id
            result["voiceSessionEpoch"] = voice_session_epoch
            result["captureId"] = capture_id
            result["mode"] = tag
            result["inputTurnId"] = rec.input_turn.id if getattr(rec, "input_turn", None) else None
            # Do not retain a take cancelled while inference was pending.
            # Inference itself is not forcibly interrupted or reported stopped.
            save_started = time.perf_counter()
            if cfg("retainRecordings", default=False) is True:
                save_recording(audio, "listen")
            save_ms = (time.perf_counter() - save_started) * 1000
            result.setdefault("timings", {}).update({
                "saveMs": round(save_ms, 3),
                "stopToTranscriptMs": round((time.perf_counter() - stopped_at) * 1000, 3),
            })
            emit(_recording=(rec, my_gen), **result)
        except _CaptureCancelled:
            pass  # Key-up or withdrawal while waiting is not a device failure.
        except Exception as exc:
            # Device creation/start/run failures use the same request context as
            # inference errors. A superseded capture must not report into the
            # newer input turn, but its failure still belongs in diagnostics.
            log("录音处理失败 (%s): %r" % (tag, exc))
            if inference_current():
                report_failure(failure_code)
                emit("error", _recording=(rec, my_gen), message="录音处理失败: %s" % exc, detail=traceback.format_exc()[-800:])
        finally:
            try:
                finish()
            finally:
                _request_context.current = None
                _threads.discard(threading.current_thread())

    thread = None
    try:
        with _recording_start_lock:
            assert_capture_current()
            watchdog = context is not None and context.get("watchdog")
            # Timeout may fire while queued behind another startup. Register
            # ownership under its context lock, but release it before device I/O.
            with context["lock"] if watchdog else nullcontext():
                if watchdog and context["done"]:
                    raise RuntimeError("录音任务已超时")
                release_recorder(cancel=True, reason="superseded")
                with _rec_lock:
                    _current_recorder = rec
                    _gen += 1
                    my_gen = _gen
                    # Drop old audio now, even while this new take is recording
                    # or waiting for the previous microphone stream to close.
                    _live_inference.cancel_pending()
                if watchdog:
                    context["recorder"] = rec
            # No recorder lock across stop/close: explicit stop can cancel this
            # startup while the always-on device is still closing.
            _always_pause()
            assert_capture_current(check_recorder=True)
            if on_done is None:
                with _rec_lock:
                    if my_gen != _gen or getattr(rec, "cancelled", False):
                        raise RuntimeError("录音启动已取消")
                    rec._inference_token = _live_inference.new()
            if getattr(rec, "input_turn", None) is not None:
                rec.input_turn.start()
            thread = threading.Thread(target=work, name="whale-rec-" + tag, daemon=True)
            _threads.add(thread)
            thread.start()
    except Exception:
        try:
            report_failure("device")
        finally:
            if thread is not None:
                _threads.discard(thread)
            finish()
        raise

    return rec


# ---------------------------------------------------------------------------
# 鼠标侧键按住说话（全局低级鼠标钩子 WH_MOUSE_LL）
# ---------------------------------------------------------------------------
# 线程模型（改这里先读）：
#   · 钩子线程（1 个）只跑 SetWindowsHookExW + GetMessageW 消息循环。回调里除了
#     「按/放」入队之外什么都不做（微秒级返回），并且**必须 CallNextHookEx 放行**：
#     吞掉 XBUTTON 会让侧键在浏览器/编辑器里失效。
#   · 工作线程（1 个）串行处理 down/up，直接调现有 start_recording()——常听 pause /
#     录音 / normalize / 声纹 / ASR / 韵律 / 垃圾过滤 / emit transcript 全走原链路，
#     这里不重复实现任何识别逻辑。
#   · 录音参数：silence_ms=60s（说话中间停顿不误停），no_speech_ms=最长录音时长
#     （按下后琢磨几秒再开口也不会提前结束），最长 pttMouseMaxSeconds（默认 15s）。
#   · 松键 = release_recorder()：和 voice_listen stop 是同一个动作。
#   · 配置改完不用重启帮工：op status / op ptt-status 会调 _ptt_sync() 热装/卸钩子。

PTT_SILENCE_MS = 60000.0
PTT_MIN_PRESS_S = 0.25
PTT_BUTTON_NAMES = {1: "XButton1", 2: "XButton2"}
WM_XBUTTONDOWN = 0x020B
WM_XBUTTONUP = 0x020C
WM_QUIT = 0x0012
WH_MOUSE_LL = 14
WH_KEYBOARD_LL = 13
WM_KEYDOWN, WM_KEYUP, WM_SYSKEYDOWN, WM_SYSKEYUP = 0x100, 0x101, 0x104, 0x105
PTT_KEY_CODES = {**{"F%d" % n: 0x6F + n for n in range(1, 25)},
                 **{"Key" + chr(n): n for n in range(65, 91)},
                 **{"Digit" + str(n): 48 + n for n in range(10)}, "Space": 0x20}


class _KBDLLHOOKSTRUCT(ctypes.Structure):
    _fields_ = [("vkCode", ctypes.c_uint32), ("scanCode", ctypes.c_uint32),
                ("flags", ctypes.c_uint32), ("time", ctypes.c_uint32),
                ("dwExtraInfo", ctypes.c_size_t)]


def ptt_keyboard_binding():
    value = cfg("pttKeyboard", default=None)
    if value is None:
        return None
    if not isinstance(value, dict) or set(value) != {"code", "modifiers"} or value.get("code") not in PTT_KEY_CODES:
        return None  # Invalid manual configuration fails closed.
    modifiers = value.get("modifiers")
    order = ["Control", "Alt", "Shift"]
    if not isinstance(modifiers, list) or any(x not in order for x in modifiers) or len(set(modifiers)) != len(modifiers):
        return None
    if value["code"] == "F4" and "Alt" in modifiers:
        return None
    return {"code": value["code"], "modifiers": [x for x in order if x in modifiers]}


# 类型/结构在模块导入时（主线程）先建好；钩子线程里只加载 user32（别再做大 import）
_PTT_LRESULT = ctypes.c_ssize_t
_PTT_WPARAM = ctypes.c_size_t
_PTT_LPARAM = ctypes.c_ssize_t


class _POINT(ctypes.Structure):
    _fields_ = [("x", ctypes.c_long), ("y", ctypes.c_long)]


class _MSLLHOOKSTRUCT(ctypes.Structure):
    _fields_ = [
        ("pt", _POINT),
        ("mouseData", ctypes.c_ulong),
        ("flags", ctypes.c_ulong),
        ("time", ctypes.c_ulong),
        ("dwExtraInfo", ctypes.c_size_t),
    ]


class _MSG(ctypes.Structure):
    _fields_ = [
        ("hwnd", ctypes.c_void_p),
        ("message", ctypes.c_uint),
        ("wParam", _PTT_WPARAM),
        ("lParam", _PTT_LPARAM),
        ("time", ctypes.c_ulong),
        ("pt", _POINT),
        ("lPrivate", ctypes.c_ulong),
    ]


_PTT_HOOKPROC = None
if hasattr(ctypes, "WINFUNCTYPE"):  # 非 Windows 上模块仍可 import（测试/静态检查）
    _PTT_HOOKPROC = ctypes.WINFUNCTYPE(_PTT_LRESULT, ctypes.c_int, _PTT_WPARAM, _PTT_LPARAM)


def ptt_mouse_button():
    """配置里的侧键编号；非法值按关闭（0）处理，绝不让坏配置劫持鼠标。"""
    if not cfg("voiceSessionId"):
        return 0
    raw = None
    try:
        raw = cfg("pttMouse", default=DEFAULTS["pttMouse"])
        if isinstance(raw, bool):
            raise ValueError("bool")
        value = int(raw)
    except Exception:
        log("pttMouse=%r 不合法（0/1/2），按关闭处理" % (raw,))
        return 0
    if value not in (0, 1, 2):
        log("pttMouse=%r 不合法（0/1/2），按关闭处理" % (value,))
        return 0
    return value


def ptt_max_seconds():
    try:
        value = float(cfg("pttMouseMaxSeconds", default=DEFAULTS["pttMouseMaxSeconds"]))
    except Exception:
        value = 0.0
    if not (1.0 <= value <= 120.0):
        default = float(DEFAULTS["pttMouseMaxSeconds"])
        if value:
            log("pttMouseMaxSeconds=%r 超出 1~120s，用默认 %.0fs" % (value, default))
        return default
    return value


_binding_gate = threading.Event()
_binding_start_lock = threading.RLock()
_binding_transaction = None
_binding_blocked = False
_binding_receipts = {}


class MousePtt:
    """鼠标侧键按住说话。钩子线程只投事件，工作线程调现有录音管线。"""

    def __init__(self, button=None, max_seconds=None):
        self.button = int(button if button is not None else ptt_mouse_button())
        self.max_seconds = float(max_seconds if max_seconds is not None else ptt_max_seconds())
        self.events = queue.SimpleQueue()
        self.stop_event = threading.Event()
        self.ready = threading.Event()
        self.thread = None
        self.worker = None
        self.thread_id = None
        self.hook = None
        self.hook_error = None
        self.last_error = None
        self._proc = None
        self._post_quit = None
        self._last_try = 0.0
        self._lock = threading.Lock()
        self.active = False
        self.rec = None
        self.attempt = 0  # 每按一次 +1；收尾回调按它判断「我还是不是当前这一次」
        self.pressed_at = None
        self.presses = 0
        self.last_down_at = None
        self.last_up_at = None
        self.last_dur_ms = None
        self.last_finish_reason = None
        self.held = False

    # ---- 生命周期 --------------------------------------------------------

    def start(self):
        """起工作线程 + 钩子线程（幂等）。返回 True = 钩子在线。"""
        if self.stop_event.is_set():
            return False
        if _PTT_HOOKPROC is None:
            self.hook_error = "当前平台不支持 WH_MOUSE_LL"
            return False
        if self.worker is None or not self.worker.is_alive():
            self.worker = threading.Thread(target=self._worker_loop, name="whale-ptt-worker", daemon=True)
            _threads.add(self.worker)
            self.worker.start()
        if self.thread is not None and self.thread.is_alive():
            return bool(self.hook)
        now = time.time()
        if self.hook_error and now - self._last_try < 5.0:  # 失败节流：别被 status 刷爆
            return False
        self._last_try = now
        self.ready.clear()
        self.thread = threading.Thread(target=self._hook_loop, name="whale-ptt-hook", daemon=True)
        _threads.add(self.thread)
        self.thread.start()
        self.ready.wait(5.0)
        return bool(self.hook)

    def stop(self, wait_s=2.0):
        self.stop_event.set()
        self._cancel("disabled")
        try:
            if self._post_quit is not None:
                self._post_quit()  # 往钩子线程的消息队列投 WM_QUIT，让它跳出 GetMessageW
        except Exception as exc:
            log("ptt-mouse 停止钩子线程失败：%r" % (exc,))
        thread = self.thread
        if thread is not None:
            try:
                thread.join(max(0.1, float(wait_s)))
            except Exception:
                pass
        self.hook = None

    # ---- 钩子线程 --------------------------------------------------------

    def _hook_loop(self):
        user32 = None
        try:
            if _PTT_HOOKPROC is None:
                raise RuntimeError("当前平台不支持 WH_MOUSE_LL")
            user32 = ctypes.WinDLL("user32", use_last_error=True)
            kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)
            user32.SetWindowsHookExW.argtypes = [ctypes.c_int, _PTT_HOOKPROC, ctypes.c_void_p, ctypes.c_ulong]
            user32.SetWindowsHookExW.restype = ctypes.c_void_p
            user32.CallNextHookEx.argtypes = [ctypes.c_void_p, ctypes.c_int, _PTT_WPARAM, _PTT_LPARAM]
            user32.CallNextHookEx.restype = _PTT_LRESULT
            user32.UnhookWindowsHookEx.argtypes = [ctypes.c_void_p]
            user32.UnhookWindowsHookEx.restype = ctypes.c_int
            user32.GetMessageW.argtypes = [ctypes.POINTER(_MSG), ctypes.c_void_p, ctypes.c_uint, ctypes.c_uint]
            user32.GetMessageW.restype = ctypes.c_int
            user32.PeekMessageW.argtypes = [
                ctypes.POINTER(_MSG), ctypes.c_void_p, ctypes.c_uint, ctypes.c_uint, ctypes.c_uint
            ]
            user32.PeekMessageW.restype = ctypes.c_int
            user32.TranslateMessage.argtypes = [ctypes.POINTER(_MSG)]
            user32.DispatchMessageW.argtypes = [ctypes.POINTER(_MSG)]
            user32.PostThreadMessageW.argtypes = [ctypes.c_ulong, ctypes.c_uint, _PTT_WPARAM, _PTT_LPARAM]
            user32.PostThreadMessageW.restype = ctypes.c_int
            kernel32.GetCurrentThreadId.argtypes = []
            kernel32.GetCurrentThreadId.restype = ctypes.c_ulong

            holder = {}

            def _on_hook(n_code, w_param, l_param):
                # 钩子回调：只解析 + 入队，必须放行。任何异常都不能冒出去。
                try:
                    wparam = int(w_param)
                    if n_code == 0 and isinstance(self, KeyboardPtt):
                        ptr = ctypes.cast(ctypes.c_void_p(int(l_param)), ctypes.POINTER(_KBDLLHOOKSTRUCT))
                        if not int(ptr.contents.flags) & 0x10:  # Never activate from injected keys.
                            self._on_key_event(wparam, int(ptr.contents.vkCode))
                    elif n_code == 0 and wparam in (WM_XBUTTONDOWN, WM_XBUTTONUP):
                        ptr = ctypes.cast(ctypes.c_void_p(int(l_param)), ctypes.POINTER(_MSLLHOOKSTRUCT))
                        xbutton = (int(ptr.contents.mouseData) >> 16) & 0xFFFF
                        if xbutton == self.button:
                            self._on_hook_event(wparam)
                except Exception:
                    pass
                try:
                    return user32.CallNextHookEx(holder.get("hook"), n_code, w_param, l_param)
                except Exception:
                    return 0

            self._proc = _PTT_HOOKPROC(_on_hook)  # 必须保活，否则回调被 GC 掉会崩
            msg = _MSG()
            user32.PeekMessageW(ctypes.byref(msg), None, 0, 0, 0)  # 先把线程消息队列建出来
            self.thread_id = int(kernel32.GetCurrentThreadId())
            self._post_quit = lambda: user32.PostThreadMessageW(self.thread_id, WM_QUIT, 0, 0)
            if isinstance(self, KeyboardPtt):
                user32.GetForegroundWindow.restype = ctypes.c_void_p
                user32.GetAsyncKeyState.argtypes = [ctypes.c_int]
                user32.GetAsyncKeyState.restype = ctypes.c_short
                self.foreground = lambda: user32.GetForegroundWindow()
                self.key_pressed = lambda: bool(user32.GetAsyncKeyState(self.vk) & 0x8000)
                self.modifiers_pressed = lambda: all(any(user32.GetAsyncKeyState(vk) & 0x8000 for vk in self.modifier_codes[m]) for m in self.binding["modifiers"])
            hook = user32.SetWindowsHookExW(WH_KEYBOARD_LL if isinstance(self, KeyboardPtt) else WH_MOUSE_LL, self._proc, None, 0)
            if not hook:
                code = ctypes.get_last_error()
                self.hook_error = "SetWindowsHookExW error=%s" % code
                log("ptt-mouse 钩子安装失败 error=%s（侧键说话不可用，其余功能不受影响）" % code)
                emit("error", message="鼠标侧键钩子安装失败（WinError=%s）：侧键说话不可用" % code)
                return
            holder["hook"] = hook
            self.hook = hook
            self.ready.set()
            name = PTT_BUTTON_NAMES.get(self.button, str(self.button))
            log("ptt-mouse hook installed (%s)" % name)
            emit(
                "ptt-mouse-event",
                state="installed",
                button=self.button,
                buttonName=name,
                maxSeconds=self.max_seconds,
            )
            while not self.stop_event.is_set():
                ret = user32.GetMessageW(ctypes.byref(msg), None, 0, 0)
                if ret == 0 or ret == -1:  # 0 = WM_QUIT；-1 = 错误
                    break
                user32.TranslateMessage(ctypes.byref(msg))
                user32.DispatchMessageW(ctypes.byref(msg))
        except Exception as exc:
            self.hook_error = "钩子线程异常: %r" % (exc,)
            log("ptt-mouse 钩子线程异常：%r" % (exc,))
            emit("error", message="鼠标侧键钩子线程异常: %s" % exc, detail=traceback.format_exc()[-600:])
        finally:
            self.ready.set()
            hook = self.hook
            self.hook = None
            try:
                if hook and user32 is not None:
                    user32.UnhookWindowsHookEx(hook)
            except Exception:
                pass
            self._cancel("hook-removed")
            self._proc = None
            self._post_quit = None
            emit("ptt-mouse-event", state="removed", button=self.button)

    # ---- 钩子回调 → 工作线程 ---------------------------------------------

    def _on_hook_event(self, wparam):
        if _binding_gate.is_set():
            return
        # 微秒级：只入队。录音/日志/异常处理全在工作线程，钩子回调必须尽快返回。
        self.events.put("down" if wparam == WM_XBUTTONDOWN else "up")

    def _worker_loop(self):
        while not self.stop_event.is_set():
            try:
                kind = self.events.get(timeout=0.05)
            except queue.Empty:
                self._check_hold()
                continue
            try:
                if _binding_gate.is_set():
                    continue  # Never replay events captured during a binding transaction.
                if kind == "down":
                    self._handle_down()
                elif kind == "up":
                    self.held = False
                    self._handle_up()
                elif kind == "release":
                    self._handle_up(retain_hold=True)
                else:
                    self._cancel(kind)
                self._check_hold()
            except Exception as exc:
                self.last_error = "%s: %s" % (kind, exc)
                log("ptt-mouse 处理 %s 失败：%r" % (kind, exc))
                emit("error", message="鼠标侧键处理失败: %s" % exc, detail=traceback.format_exc()[-600:])

    def _check_hold(self):
        pass

    def _cancel(self, reason):
        with self._lock:
            rec = self.rec
            self.rec = None
            self.active = False
            self.pressed_at = None
            self.attempt += 1
        if rec is not None:
            release_recorder(cancel=True, reason=reason, expected=rec)

    def _handle_down(self):
        with _binding_start_lock:
            if _binding_gate.is_set():
                return
            return self._handle_down_armed()

    def _handle_down_armed(self):
        if self.stop_event.is_set() or self.held:
            return
        self.held = True  # Remain latched after timeout/failure until physical key up.
        now = time.time()
        with self._lock:
            if self.active:
                dbg("ptt-mouse down 忽略：上一次还没松键")
                return
        with _rec_lock:
            busy = _current_recorder is not None
        if busy:
            log("ptt-mouse down 忽略：已有录音在跑（先 stop 再按侧键）")
            emit("ptt-mouse", state="skip", reason="busy")
            return
        with self._lock:
            self.active = True
            self.attempt += 1
            tok = self.attempt
            self.pressed_at = now
            self.presses += 1
            self.last_down_at = now
        name = PTT_BUTTON_NAMES.get(self.button, str(self.button))
        log("ptt-mouse down (%s)" % name)
        emit("ptt-mouse", state="down", button=self.button, buttonName=name, maxSeconds=self.max_seconds,
             voiceSessionId=cfg("voiceSessionId"), voiceSessionEpoch=cfg("voiceSessionEpoch"))
        try:
            rec = start_recording(
                max_seconds=self.max_seconds,
                silence_ms=PTT_SILENCE_MS,
                tag="ptt-mouse",
                no_speech_ms=self.max_seconds * 1000.0,
                min_seconds=PTT_MIN_PRESS_S,
                on_finish=lambda r, _tok=tok: self._rec_finished(_tok, r),
            )
        except Exception as exc:
            with self._lock:
                self.active = False
                self.pressed_at = None
            self.last_error = "start_recording: %s" % exc
            log("ptt-mouse 开始录音失败：%r" % (exc,))
            emit("error", message="侧键录音启动失败: %s" % exc)
            return
        with self._lock:
            stale = tok != self.attempt or not self.active or self.stop_event.is_set()
            if not stale:
                self.rec = rec
        if stale:
            release_recorder(cancel=True, reason="cancelled-during-start", expected=rec)

    def _handle_up(self, retain_hold=False):
        self.held = retain_hold
        now = time.time()
        with self._lock:
            self.last_up_at = now
            if not self.active:
                dbg("ptt-mouse up 忽略：当前没有在录（可能已经超过最长时长自动停了）")
                emit("ptt-mouse", state="up-ignored")
                return
            self.active = False
            rec = self.rec
            self.rec = None
            pressed = self.pressed_at
            self.pressed_at = None
        press_ms = int(max(0.0, now - pressed) * 1000) if pressed else None
        name = PTT_BUTTON_NAMES.get(self.button, str(self.button))
        log("ptt-mouse up (%s) dur=%s" % (name, ("%.2fs" % (press_ms / 1000.0)) if press_ms is not None else "?"))
        emit("ptt-mouse", state="up", button=self.button, buttonName=name, durMs=press_ms)
        if rec is not None:
            release_recorder(expected=rec)  # Never release a newer/unrelated recording.

    def _rec_finished(self, tok, rec):
        """录音线程收尾（在 _always_resume 之后）：复位状态，别影响新的一次。

        tok 在 start_recording 之前就定好了（不是等 rec 返回再记），所以就算录音线程
        快到「回调先跑、start_recording 后返回」，也不会把新旧两次的状态搞混。
        """
        with self._lock:
            if tok != self.attempt:
                dbg("ptt-mouse 老录音收尾（已被新的取代），忽略")
                return
            self.rec = None
            self.active = False
            self.pressed_at = None
            reason = getattr(rec, "reason", None) if rec is not None else None
            dur = getattr(rec, "duration", 0.0) if rec is not None else 0.0
            self.last_finish_reason = reason
            if dur:
                self.last_dur_ms = int(dur * 1000)
        if reason not in (None, "stopped"):
            log("ptt-mouse 录音自动结束 reason=%s dur=%.2fs" % (reason, float(dur or 0.0)))
            emit("ptt-mouse", state="auto-stop", reason=reason, durMs=int((dur or 0.0) * 1000))

    # ---- 状态快照 --------------------------------------------------------

    def status(self):
        thread = self.thread
        with self._lock:
            return {
                "pttMouse": self.button,
                "buttonName": PTT_BUTTON_NAMES.get(self.button),
                "maxSeconds": self.max_seconds,
                "hookInstalled": bool(self.hook),
                "hookAlive": bool(thread is not None and thread.is_alive()),
                "hookThreadId": self.thread_id,
                "hookError": self.hook_error,
                "recording": bool(self.active),
                "presses": self.presses,
                "lastDownAt": int(self.last_down_at * 1000) if self.last_down_at else None,
                "lastUpAt": int(self.last_up_at * 1000) if self.last_up_at else None,
                "lastDurMs": self.last_dur_ms,
                "lastFinishReason": self.last_finish_reason,
                "lastError": self.last_error,
            }


class KeyboardPtt(MousePtt):
    """Real Windows global key/chord PTT; hook callbacks never record audio."""
    def __init__(self, binding, max_seconds=None):
        super().__init__(0, max_seconds)
        self.binding = dict(binding)
        self.vk = PTT_KEY_CODES[binding["code"]]
        self.foreground = lambda: None
        self.key_pressed = lambda: True
        self.modifiers_pressed = lambda: True
        self.press_window = None
        self.grant = None
        self.physical_down = False
        self.modifier_keys = set()
        self.modifier_codes = {"Control": {0x11, 0xA2, 0xA3}, "Alt": {0x12, 0xA4, 0xA5}, "Shift": {0x10, 0xA0, 0xA1}}

    def _on_key_event(self, message, vk):
        if _binding_gate.is_set():
            return
        down = message in (WM_KEYDOWN, WM_SYSKEYDOWN)
        up = message in (WM_KEYUP, WM_SYSKEYUP)
        if not (down or up):
            return
        for modifier, codes in self.modifier_codes.items():
            if vk in codes:
                if down:
                    self.modifier_keys.add(vk)
                else:
                    self.modifier_keys.discard(vk)
                    if modifier in self.binding["modifiers"]:
                        self.events.put("release")
                return
        if vk == 0x1B and down:
            self.events.put("escape")
        elif vk == self.vk:
            if down and not self.physical_down:
                self.physical_down = True
                if all(self.modifier_keys & self.modifier_codes[m] for m in self.binding["modifiers"]):
                    self.events.put("down")
            elif up:
                self.physical_down = False
                self.events.put("up")

    def _handle_down(self):
        if not self.held:
            self.press_window = self.foreground()
            reload_cfg()
            self.grant = (cfg("voiceSessionId"), cfg("voiceSessionEpoch"))
        super()._handle_down()

    def _handle_up(self, retain_hold=False):
        # A focus/revoke/reconfigure immediately followed by key-up must cancel,
        # even when the periodic guard has not run yet.
        if self.active:
            reload_cfg()
            if (self.foreground() != self.press_window
                    or (cfg("voiceSessionId"), cfg("voiceSessionEpoch")) != self.grant
                    or ptt_keyboard_binding() != self.binding):
                self._cancel("context-changed-before-release")
        super()._handle_up(retain_hold=retain_hold)

    def _check_hold(self):
        if not self.held:
            return
        # Focus loss cancels (never submits); missing key-up fails closed too.
        if self.active:
            reload_cfg()
            if ptt_keyboard_binding() != self.binding:
                self._cancel("binding-changed")
            elif self.foreground() != self.press_window:
                self._cancel("focus-changed")
            elif (cfg("voiceSessionId"), cfg("voiceSessionEpoch")) != self.grant:
                self._cancel("authorization-changed")
            elif not self.key_pressed() or not self.modifiers_pressed():
                # The hook may have queued a real release during this poll
                # (including configuration I/O). This worker is the sole
                # consumer: process its FIFO before declaring an edge missing.
                if not self.events.empty():
                    return
                self._cancel("key-up-missed")
        if not self.key_pressed():
            if not self.events.empty():
                return  # Do not unlatch ahead of a queued up/down pair either.
            self.held = False
            self.physical_down = False

    def status(self):
        return {**super().status(), "binding": self.binding, "scope": "global"}


_keyboard_ptt = None


def _keyboard_ptt_sync():
    global _keyboard_ptt
    binding = ptt_keyboard_binding()
    inst = _keyboard_ptt
    if inst is not None and (inst.binding != binding or inst.stop_event.is_set()):
        inst.stop()
        _keyboard_ptt = inst = None
    if binding is not None:
        if inst is None:
            _keyboard_ptt = inst = KeyboardPtt(binding, ptt_max_seconds())
        inst.max_seconds = ptt_max_seconds()
        inst.start()
    return inst


def keyboard_ptt_status():
    supported = sys.platform == "win32" and _PTT_HOOKPROC is not None
    inst = _keyboard_ptt
    return {"supported": supported, "scope": "global", "binding": ptt_keyboard_binding(),
            "status": "unsupported" if not supported else "active" if inst and inst.hook else "inactive",
            "reason": None if supported else "Windows WH_KEYBOARD_LL is required",
            "hookInstalled": False, "recording": False,
            **(inst.status() if inst else {})}


_ptt = None
_ptt_lock = threading.Lock()


def _ptt_sync():
    """按当前配置热装/卸侧键钩子（幂等）。"""
    global _ptt
    want = ptt_mouse_button()
    with _ptt_lock:
        if _binding_gate.is_set():
            return _ptt
        _keyboard_ptt_sync()
        inst = _ptt
        if want == 0:
            if inst is not None:
                inst.stop()
                _ptt = None
            return None
        if inst is not None and (inst.button != want or inst.stop_event.is_set()):
            inst.stop()
            inst = None
            _ptt = None
        if inst is None:
            inst = MousePtt(want, ptt_max_seconds())
            _ptt = inst
        else:
            inst.max_seconds = ptt_max_seconds()  # 改了最长时长，下一次按就生效
        try:
            inst.start()
        except Exception as exc:
            inst.hook_error = inst.hook_error or str(exc)
            log("ptt-mouse 启动失败：%r" % (exc,))
        return inst


def ptt_status():
    """侧键 PTT 快照：配置 + 钩子是否在线（没启用也返回配置字段）。"""
    want = ptt_mouse_button()
    max_seconds = ptt_max_seconds()
    base = {
        "keyboard": keyboard_ptt_status(),
        "pttMouse": want,
        "buttonName": PTT_BUTTON_NAMES.get(want),
        "enabled": want != 0,
        "pttMouseMaxSeconds": max_seconds,
        "maxSeconds": max_seconds,
        "hookInstalled": False,
        "hookAlive": False,
        "hookThreadId": None,
        "hookError": None,
        "recording": False,
        "presses": 0,
        "lastDownAt": None,
        "lastUpAt": None,
        "lastDurMs": None,
        "lastFinishReason": None,
        "lastError": None,
    }
    inst = _ptt
    if inst is not None:
        base.update(inst.status())
        base.update(
            {
                "pttMouse": want,
                "buttonName": PTT_BUTTON_NAMES.get(want),
                "enabled": want != 0,
                "pttMouseMaxSeconds": max_seconds,
                "maxSeconds": inst.max_seconds if want == inst.button else max_seconds,
            }
        )
    return base


# ---------------------------------------------------------------------------
# 命令处理
# ---------------------------------------------------------------------------


def op_start(msg):
    if _binding_gate.is_set():
        raise RuntimeError("PTT_BINDINGS_BUSY")
    context = getattr(_request_context, "current", None)
    if not msg.get("awaitTranscript"):
        _request_context.current = None
    try:
        start_recording()
    finally:
        _request_context.current = context
    emit("started")


def op_stop(msg):
    release_recorder()
    emit("stopped")


def reload_cfg():
    """重读 config.json。常听参数（唤醒词/窗口/静音阈值/device）改完再开常听就生效，不用重拉帮工。"""
    global CFG, _compute_config_epoch
    try:
        old_compute = (cfg("asr", default="sensevoice"),
                       _compute_key("whisper", cfg("modelCompute", default="cpu")),
                       _compute_key("sensevoice", cfg("modelCompute", default="cpu")))
        CFG = load_config()
        new_compute = (cfg("asr", default="sensevoice"),
                       _compute_key("whisper", cfg("modelCompute", default="cpu")),
                       _compute_key("sensevoice", cfg("modelCompute", default="cpu")))
        if old_compute != new_compute:
            # Reset sticky decisions on an observed setting change, even when
            # the user toggles back before the next utterance. Never wait for
            # or release a native model from this control/configuration path.
            _compute_config_epoch += 1
        return True
    except Exception as exc:
        log("重读配置失败：%r" % (exc,))
        return False


def op_always(msg):
    global _always, _capture_id
    enabled = bool((msg or {}).get("enabled"))
    mode = (msg or {}).get("mode", "always")
    if mode not in ("always", "wake"):
        emit("error", message="常听模式必须为 always 或 wake")
        return
    reload_cfg()
    if enabled and not cfg("voiceSessionId"):
        emit("error", message="语音权限未开启；请在目标会话明确要求开启语音")
        return
    if enabled:
        if _current_recorder is not None:
            emit("error", message="PTT 正在录音：先 voice_listen stop，再开常听")
            return
        if _always is not None and _always.is_alive():
            if _always.mode == mode and _always.capture_id == msg.get("captureId"):
                emit("always", state="on", changed=False, status=always_status())
                return
            _always.stop(wait_s=2.0)
            _always = None
        _capture_id = msg.get("captureId")
        reload_cfg()  # 常听参数改完直接开也能生效
        _always = AlwaysListener(mode, msg.get("captureId"))
        _always.start()
        emit("always", state="on", changed=True, status=always_status())
        return
    _capture_id = msg.get("captureId")
    inst = _always
    if inst is None:
        emit("always", state="off", changed=False, status=always_status())
        return
    inst.stop(wait_s=2.0)
    snapshot = always_status()  # 先取快照（计数还在），再清引用
    _always = None
    snapshot.update(
        {"listenMode": "ptt", "wake": {"state": "disabled", "deadlineAt": None, "streamOpen": False, "detection": "asr-after-utterance"}, "enabled": False, "threadAlive": False, "streamOpen": False, "paused": False, "inConversation": False}
    )
    emit("always", state="off", changed=True, status=snapshot)


def op_always_status(msg):
    emit("always-status", **always_status())


def op_ptt_status(msg):
    """侧键 PTT 状态；顺带按最新配置热装/卸钩子（改 pttMouse 不用重启帮工）。"""
    reload_cfg()
    try:
        _ptt_sync()
    except Exception as exc:
        log("ptt-mouse 同步失败：%r" % (exc,))
    emit("ptt-status", **ptt_status())


def op_recent(msg):
    """v0.3：返回当前滚动窗口（最近 windowSec 秒过了垃圾过滤的段）。"""
    inst = _always
    if inst is None:
        window_sec = float(cfg("windowSec", default=60) or 60)
        emit("recent", windowSec=window_sec, count=0, items=[], enabled=False)
        return
    try:
        payload = inst.recent_window()
    except Exception as exc:
        emit("recent", error=str(exc)[:200], count=0, items=[], enabled=inst.is_alive())
        return
    emit("recent", enabled=True, **payload)


_voiceprint_write_lock = threading.Lock()


def _enroll_from_audio(name, audio):
    audio = normalize(audio)
    dur = len(audio) / SR if audio.size else 0.0
    if dur < 1.0:
        emit("error", message="注册失败：有效语音太短（%.2fs），请靠近麦克风再说一次" % dur)
        return
    emb = embed_audio(audio)
    if emb is None:
        emit("error", message="注册失败：声纹提取失败，请检查录音电平")
        return
    context = getattr(_request_context, "current", None)
    # Commit and terminal response share the watchdog's lock. Once timed out,
    # late embedding work cannot mutate the user's voiceprints.
    lock = context["lock"] if context and context.get("watchdog") else threading.RLock()
    with lock, _voiceprint_write_lock:
        if context and context.get("done"):
            return
        data = load_voiceprints()
        records = int((data.get(name) or {}).get("samples") or 0)
        data[name] = {
            "embedding": [float(x) for x in emb],
            "samples": records + 1,
            "dim": int(len(emb)),
            "createdAt": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "duration": round(dur, 2),
        }
        save_voiceprints(data)
        emit("enrolled", name=name, samples=records + 1, dur=round(dur, 2), dim=int(len(emb)))


def op_enroll(msg):
    name = str((msg or {}).get("name") or "").strip() or "主人"
    seconds = float(cfg("enrollSeconds", default=8.0) or 8.0)
    path = str((msg or {}).get("path") or "").strip()

    # 用现成音频注册：没有可用麦克风时（比如默认输入是虚拟声卡）也能把声纹链路跑通
    if path:
        if not os.path.isfile(path):
            emit("error", message="文件不存在: " + path)
            return
        _spawn("enroll-file", lambda: _enroll_from_audio(name, decode_file(path)), 180)
        return

    def run():
        done = threading.Event()

        def on_done(rec, audio):
            try:
                _enroll_from_audio(name, audio)
            finally:
                done.set()

        start_recording(
            max_seconds=seconds,
            silence_ms=max(1500, int(seconds * 1000)),
            on_done=on_done,
            tag="enroll",
            on_finish=lambda rec: done.set(),
        )
        done.wait()

    emit("started", mode="enroll", seconds=seconds, name=name)
    _spawn("enroll", run, seconds + 90)


def op_transcribe(msg):
    path = str((msg or {}).get("path") or "").strip()
    if not path:
        emit("error", message="transcribe 需要 path")
        return
    if not os.path.isfile(path):
        emit("error", message="文件不存在: " + path)
        return

    def work():
        t0 = time.time()
        dbg("transcribe: decode start")
        audio = normalize(decode_file(path))
        dbg("transcribe: decode done %.2fs" % (time.time() - t0))
        result = full_result(audio)
        dbg("transcribe: pipeline done %.2fs" % (time.time() - t0))
        if "error" in result:
            emit("error", message=result["error"])
            return
        result["path"] = path
        emit(**result)

    _spawn("transcribe", work, 180)


def op_prosody(msg):
    path = str((msg or {}).get("path") or "").strip()
    if not path:
        emit("error", message="prosody 需要 path")
        return
    if not os.path.isfile(path):
        emit("error", message="文件不存在: " + path)
        return

    def work():
        audio = normalize(decode_file(path))
        dur = float(len(audio) / SR)
        if dur > 90:  # 超长文件只算前 90s，别把帮工占住
            audio = audio[: 90 * SR]
        asr = transcribe_audio(audio) if dur <= 90 else {"text": ""}
        pros = prosody(audio, asr.get("text") or "", float(len(audio) / SR))
        if pros is None:
            emit("error", message="韵律算不出来（音频太短或没有浊音段）")
            return
        emit("prosody", path=path, text=asr.get("text") or "", prosody=pros)

    _spawn("prosody", work, 180)


def input_devices(limit=8):
    """给 status 用：候选输入设备，方便把 config.device 钉到真麦克风。"""
    try:
        import sounddevice as sd

        out = []
        for idx, dev in enumerate(sd.query_devices()):
            if dev.get("max_input_channels", 0) <= 0:
                continue
            try:
                host = sd.query_hostapis(dev["hostapi"])["name"]
            except Exception:
                host = "?"
            out.append({"index": idx, "name": dev["name"], "hostApi": host})
            if len(out) >= limit:
                break
        return out
    except Exception as exc:
        return [{"error": str(exc)}]


def op_capture_status(msg):
    """Lightweight physical-release receipt after explicit logical stop."""
    emit("capture-status", captureDevice=_capture_device.status(wait_s=.5))


def op_input_devices(msg):
    """Enumeration only: no config reload, hooks, capture streams, or models."""
    emit("input-devices", inputDevices=input_devices(limit=128))


def op_status(msg):
    prints = load_voiceprints()
    reload_cfg()  # 老版本 Node 只发 status：这里重读配置，pttMouse 改完也能热生效
    try:
        _ptt_sync()  # voice_status 顺带把侧键钩子按最新配置对齐（热生效）
    except Exception as exc:
        log("ptt-mouse 同步失败：%r" % (exc,))
    emit(
        "status",
        pid=os.getpid(),
        device=device_info(),
        inputDevices=input_devices(limit=128),
        asr=cfg("asr", default="sensevoice"),
        inferenceCompute=inference_compute_status(),
        speakerVerification={"enabled": speaker_verification_enabled(), "experimental": True},
        turnSignals=cue_status(),
        threshold=float(cfg("threshold", default=0.5) or 0.5),
        models={
            "campplus": cfg("models", "campplus"),
            "sensevoiceDir": _sensevoice_dir(),
            "whisper": cfg("models", "whisper"),
            "loaded": loaded_models(),
        },
        voiceprints={
            name: {"samples": (rec or {}).get("samples"), "dim": (rec or {}).get("dim")}
            for name, rec in prints.items()
        },
        recording=_current_recorder is not None,
        captureDevice=_capture_device.status(),
        always=always_status(),
        ptt=ptt_status(),
        semantic=semantic_status(probe=True),
        windowSec=int(cfg("windowSec", default=60) or 60),
        dataDir=DATA_DIR,
    )


def op_quit(msg):
    release_recorder()
    if _always is not None:
        try:
            _always.stop(wait_s=1.0)
        except Exception:
            pass
    if _keyboard_ptt is not None:
        _keyboard_ptt.stop(wait_s=1.0)
    if _ptt is not None:
        try:
            _ptt.stop(wait_s=1.0)
        except Exception:
            pass
    deadline = time.time() + 2.5
    for thread in list(_threads):
        try:
            thread.join(max(0.0, deadline - time.time()))
        except Exception:
            pass
        if time.time() >= deadline:
            break
    emit("bye")
    os._exit(0)



def _binding_values(value):
    mouse, keyboard = value.get("pttMouse"), value.get("pttKeyboard")
    if type(mouse) is not int or mouse not in (0, 1, 2):
        raise ValueError("INVALID_BINDINGS")
    if keyboard is not None:
        if not isinstance(keyboard, dict) or set(keyboard) != {"code", "modifiers"} or keyboard.get("code") not in PTT_KEY_CODES:
            raise ValueError("INVALID_BINDINGS")
        mods = keyboard.get("modifiers")
        if not isinstance(mods, list) or any(m not in ("Control", "Alt", "Shift") for m in mods) or len(set(mods)) != len(mods) or keyboard["code"] == "F4" and "Alt" in mods:
            raise ValueError("INVALID_BINDINGS")
        keyboard = {"code": keyboard["code"], "modifiers": [m for m in ("Control", "Alt", "Shift") if m in mods]}
    return {"pttMouse": mouse, "pttKeyboard": keyboard}


def _binding_disk_values():
    return _binding_values({"pttMouse": cfg("pttMouse", default=0), "pttKeyboard": cfg("pttKeyboard", default=None)})


def _binding_session_matches(tx):
    return cfg("voiceSessionId") == tx["sessionId"] and cfg("voiceSessionEpoch") == tx["sessionEpoch"]


def _binding_keys_released(*values):
    if sys.platform != "win32":
        raise RuntimeError("PTT_BINDINGS_UNSUPPORTED")
    user32 = ctypes.WinDLL("user32", use_last_error=True)
    user32.GetAsyncKeyState.argtypes = [ctypes.c_int]
    user32.GetAsyncKeyState.restype = ctypes.c_short
    keys = set()
    for value in values:
        if value["pttMouse"]:
            keys.add(0x05 if value["pttMouse"] == 1 else 0x06)
        keyboard = value["pttKeyboard"]
        if keyboard:
            keys.add(PTT_KEY_CODES[keyboard["code"]])
            for modifier in keyboard["modifiers"]:
                keys.update({"Control": (0x11, 0xA2, 0xA3), "Alt": (0x12, 0xA4, 0xA5), "Shift": (0x10, 0xA0, 0xA1)}[modifier])
    return not any(user32.GetAsyncKeyState(key) & 0x8000 for key in keys)


def _binding_stop_confirmed(instances):
    confirmed = True
    for inst in instances:
        if inst is None:
            continue
        try:
            inst.stop(wait_s=1.0)
            for thread in (inst.thread, inst.worker):
                if thread is not None:
                    thread.join(1.0)
                    confirmed = not thread.is_alive() and confirmed
        except Exception:
            confirmed = False
    return confirmed


def _binding_install(values):
    global _ptt, _keyboard_ptt
    _ptt = MousePtt(values["pttMouse"], ptt_max_seconds()) if values["pttMouse"] else None
    _keyboard_ptt = KeyboardPtt(values["pttKeyboard"], ptt_max_seconds()) if values["pttKeyboard"] else None
    for inst in (_ptt, _keyboard_ptt):
        if inst is not None and not inst.start():
            raise RuntimeError("PTT_BINDINGS_INSTALL_FAILED")


def _binding_expire(transaction_id):
    global _binding_blocked
    with _ptt_lock:
        if _binding_transaction and _binding_transaction["id"] == transaction_id:
            # Host may have persisted but lost its commit receipt. Never guess.
            _binding_gate.set()
            _binding_blocked = True


def _binding_reply(msg, phase, **extra):
    if phase in ("committed", "aborted"):
        _binding_receipts[msg.get("transactionId")] = {"phase": phase, **extra}
        while len(_binding_receipts) > 32:
            _binding_receipts.pop(next(iter(_binding_receipts)))
    emit("bindings-result", transactionId=msg.get("transactionId"), phase=phase, **extra)


def op_bindings_status(msg):
    with _ptt_lock:
        tx = _binding_transaction
        if tx and tx["id"] == msg.get("transactionId"):
            _binding_reply(msg, "prepared", confirmed=True, blocked=_binding_blocked)
        elif msg.get("transactionId") in _binding_receipts:
            emit("bindings-result", transactionId=msg.get("transactionId"), **_binding_receipts[msg["transactionId"]])
        else:
            _binding_reply(msg, "unknown", confirmed=False, blocked=_binding_blocked)


def op_bindings_prepare(msg):
    global _binding_transaction, _binding_blocked
    token = msg.get("transactionId")
    try:
        if not isinstance(token, str) or not 1 <= len(token) <= 128:
            raise ValueError("INVALID_TRANSACTION")
        new = _binding_values(msg)
        with _ptt_lock:
            if _binding_transaction is not None or _binding_blocked:
                raise RuntimeError("PTT_BINDINGS_BUSY")
            if not reload_cfg():
                raise RuntimeError("PTT_BINDINGS_CONFIG_UNREADABLE")
            tx = {"id": token, "sessionId": msg.get("expectedSessionId"), "sessionEpoch": msg.get("expectedSessionEpoch"), "old": _binding_disk_values(), "new": new}
            if not tx["sessionId"] or not tx["sessionEpoch"] or not _binding_session_matches(tx):
                raise RuntimeError("PTT_BINDINGS_STALE_SESSION")
            if not _binding_start_lock.acquire(timeout=2):
                raise RuntimeError("PTT_BINDINGS_RECORDING")
            try:
                instances = (_ptt, _keyboard_ptt)
                if _current_recorder is not None or any(i and (i.held or i.active or i.rec is not None) for i in instances) or any(t.is_alive() and t.name.startswith("whale-rec-") for t in list(_threads)):
                    raise RuntimeError("PTT_BINDINGS_RECORDING")
                if not _binding_keys_released(tx["old"], new):
                    raise RuntimeError("PTT_BINDINGS_KEYS_HELD")
                _binding_gate.set()
                _binding_transaction = tx
            finally:
                _binding_start_lock.release()
            if not _binding_stop_confirmed(instances):
                _binding_blocked = True
                raise RuntimeError("PTT_BINDINGS_STOP_UNCONFIRMED")
            try:
                _binding_install(new)
            except Exception:
                if not _binding_stop_confirmed((_ptt, _keyboard_ptt)):
                    _binding_blocked = True
                    raise RuntimeError("PTT_BINDINGS_STOP_UNCONFIRMED")
                try:
                    _binding_install(tx["old"])
                    if not _binding_keys_released(tx["old"], new):
                        raise RuntimeError("PTT_BINDINGS_KEYS_HELD")
                    _binding_transaction = None
                    _binding_gate.clear()
                except Exception:
                    _binding_blocked = True
                    raise RuntimeError("PTT_BINDINGS_ROLLBACK_UNCONFIRMED")
                _binding_reply(msg, "failed", confirmed=False, restored=True, blocked=False, code="PTT_BINDINGS_INSTALL_FAILED")
                return
            timer = threading.Timer(20, _binding_expire, args=(token,))
            timer.daemon = True
            tx["timer"] = timer
            timer.start()
            _binding_reply(msg, "prepared", confirmed=True)
    except Exception as exc:
        _binding_reply(msg, "failed", confirmed=False, blocked=_binding_blocked, code=str(exc))


def _binding_finish(msg, abort=False):
    global _binding_transaction, _binding_blocked
    owned = False
    try:
        with _ptt_lock:
            receipt = _binding_receipts.get(msg.get("transactionId"))
            if receipt and receipt["phase"] == ("aborted" if abort else "committed"):
                emit("bindings-result", transactionId=msg.get("transactionId"), **receipt)
                return
            tx = _binding_transaction
            if tx is None or tx["id"] != msg.get("transactionId"):
                raise RuntimeError("PTT_BINDINGS_STALE_TRANSACTION")
            owned = True
            if not reload_cfg() or not _binding_session_matches(tx):
                raise RuntimeError("PTT_BINDINGS_STALE_SESSION")
            if _current_recorder is not None or any(t.is_alive() and t.name.startswith("whale-rec-") for t in list(_threads)):
                raise RuntimeError("PTT_BINDINGS_RECORDING")
            target = tx["old"] if abort else tx["new"]
            if _binding_disk_values() != target:
                raise RuntimeError("PTT_BINDINGS_CONFIG_MISMATCH")
            if abort:
                if not _binding_stop_confirmed((_ptt, _keyboard_ptt)):
                    raise RuntimeError("PTT_BINDINGS_STOP_UNCONFIRMED")
                _binding_install(target)
            elif _binding_blocked:
                raise RuntimeError("PTT_BINDINGS_EXPIRED")
            if any(i is not None and (not i.hook or not i.thread or not i.thread.is_alive() or not i.worker or not i.worker.is_alive()) for i in (_ptt, _keyboard_ptt)):
                raise RuntimeError("PTT_BINDINGS_INSTALL_FAILED")
            if not _binding_keys_released(tx["old"], tx["new"]):
                raise RuntimeError("PTT_BINDINGS_KEYS_HELD")
            for inst in (_ptt, _keyboard_ptt):
                if inst:
                    while not inst.events.empty():
                        inst.events.get_nowait()
                    inst.held = False
                    if isinstance(inst, KeyboardPtt):
                        inst.physical_down = False
                        inst.modifier_keys.clear()
            tx.get("timer") and tx["timer"].cancel()
            _binding_transaction = None
            _binding_blocked = False
            _binding_gate.clear()
            _binding_reply(msg, "aborted" if abort else "committed", confirmed=True)
    except Exception as exc:
        if owned:
            _binding_gate.set()
            _binding_blocked = True
        _binding_reply(msg, "failed", confirmed=False, blocked=_binding_blocked, code=str(exc))


def op_bindings_commit(msg):
    _binding_finish(msg)


def op_bindings_abort(msg):
    _binding_finish(msg, abort=True)


HANDLERS = {
    "bindings-status": op_bindings_status,
    "bindings-prepare": op_bindings_prepare,
    "bindings-commit": op_bindings_commit,
    "bindings-abort": op_bindings_abort,
    "cue": op_cue,
    "cue-cancel": op_cue_cancel,
    "start": op_start,
    "stop": op_stop,
    "always": op_always,
    "always-status": op_always_status,
    "ptt-status": op_ptt_status,
    "recent": op_recent,
    "enroll": op_enroll,
    "transcribe": op_transcribe,
    "prosody": op_prosody,
    "status": op_status,
    "input-devices": op_input_devices,
    "capture-status": op_capture_status,
    "ping": lambda msg: emit("pong"),
    "quit": op_quit,
}


def preload():
    """把重模块和模型都在主线程里先吃下来。

    为什么不能懒加载：实测（2026-11-05）主线程阻塞在 `for line in sys.stdin` 上时，
    子线程里 `import faster_whisper.audio` 会一直挂住（>45s 无进展）；同样的 import
    换到主线程 0.3s 就完了。录音/转写都跑在子线程里，所以 import 必须提前做完，
    否则「说一句话等到天荒地老」。模型也一起预热，第一次说话不用再等加载。
    """
    notes = []
    t0 = time.time()
    engine = asr_engine()
    if engine != "whisper-wasm":
        for mod in ("numpy", "sounddevice", "sherpa_onnx", "parselmouth"):
            try:
                __import__(mod)
            except Exception as exc:
                notes.append("%s 不可用: %s" % (mod, exc))
        try:
            from faster_whisper.audio import decode_audio  # noqa: F401
        except Exception as exc:
            notes.append("faster_whisper 不可用: %s" % (exc,))
    dbg("preload imports %.2fs" % (time.time() - t0))

    if cfg("preload", default=True) and engine != "whisper-wasm":
        loaders = [("whisper", get_whisper)] if engine == "whisper" else [("sensevoice", get_recognizer)]
        if speaker_verification_enabled():
            loaders.append(("campplus", get_embedder))
        for name, loader in loaders:
            t = time.time()
            try:
                loader()
                dbg("preload %s %.2fs" % (name, time.time() - t))
            except Exception as exc:
                notes.append("预热 %s 失败: %s" % (name, exc))
    elif engine == "whisper-wasm" and speaker_verification_enabled():
        # This is an explicit legacy feature opt-in; the ordinary WASM route
        # remains model-free and never imports Sherpa/NumPy at startup.
        try:
            get_embedder()
        except Exception as exc:
            notes.append("预热 campplus 失败: %s" % (exc,))
    return notes


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
    os.makedirs(DATA_DIR, exist_ok=True)
    notes = preload()
    sem = semantic_settings()
    emit(
        "ready",
        version="0.3.1",
        requestProtocol="whale-request/1",
        captureProtocol="whale-capture/1",
        captureDeviceProtocol="whale-capture-device/1",
        captureId=_capture_id,
        inputDeviceEnumeration=True,
        pid=os.getpid(),
        python=sys.version.split()[0],
        device=device_info(),
        asr=cfg("asr", default="sensevoice"),
        speakerVerification={"enabled": speaker_verification_enabled(), "experimental": True},
        turnSignals=cue_status(),
        threshold=float(cfg("threshold", default=0.5) or 0.5),
        models_loaded=loaded_models(),
        voiceprints=list(load_voiceprints().keys()),
        listenMode=str(cfg("listenMode", default="ptt") or "ptt"),
        pttMouse=ptt_mouse_button(),
        pttMouseMaxSeconds=ptt_max_seconds(),
        semantic={"enabled": sem["enabled"], "threshold": sem["threshold"], "url": sem["url"]},
        windowSec=int(cfg("windowSec", default=60) or 60),
        warnings=notes,
    )
    # 鼠标侧键 PTT：配置 pttMouse!=0 就装全局低级鼠标钩子（线程起来就装，不阻塞主循环）
    if ptt_mouse_button() != 0 or ptt_keyboard_binding() is not None:
        try:
            _ptt_sync()
        except Exception as exc:
            log("ptt-mouse 启动失败：%r" % (exc,))
    # No experimental warm-up thread or model request without explicit opt-in.
    if sem["enabled"]:
        try:
            threading.Thread(target=warm_semantic, name="whale-sem-warm", daemon=True).start()
        except Exception as exc:
            log("semantic 预热线程启动失败：%r" % (exc,))
    # config.listenMode = "always" 时帮工一起来就开常听（默认 ptt 不动现有行为）
    if str(cfg("listenMode", default="ptt") or "ptt").lower() in ("always", "wake"):
        try:
            op_always({"enabled": True, "mode": str(cfg("listenMode"))})
        except Exception as exc:
            log("自动开启常听失败：%r" % (exc,))
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        _request_context.current = None
        try:
            msg = json.loads(line)
        except Exception as exc:
            emit("error", message="JSON 解析失败: %s" % exc)
            continue
        _request_context.current = {"requestId": msg.get("requestId"), "lock": threading.Lock()}
        op = str((msg or {}).get("op") or "")
        handler = HANDLERS.get(op)
        if handler is None:
            emit("error", message="未知 op: %r" % op)
            continue
        try:
            ret = handler(msg)
            if callable(ret):  # enroll 需要再起一层线程
                _spawn("enroll", ret, float(cfg("enrollSeconds", default=8.0) or 8.0) + 90)
        except SystemExit:
            raise
        except Exception as exc:
            emit("error", message="%s 执行失败: %s" % (op, exc), detail=traceback.format_exc()[-800:])
        finally:
            _request_context.current = None


if __name__ == "__main__":
    while True:
        try:
            main()
            break
        except KeyboardInterrupt:
            break
        except SystemExit:
            break
        except Exception as exc:  # 帮工绝不整体崩掉
            try:
                emit("error", message="主循环异常，重启：%r" % (exc,))
            except Exception:
                pass
            time.sleep(0.2)
