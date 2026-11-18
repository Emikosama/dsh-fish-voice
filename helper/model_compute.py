"""Probe installed inference backends only. No model download, recording, upload or GPU brand guesses."""
import datetime
import importlib
import json


GPU_COMPUTE_TYPES = ("int8_float16", "float16", "int8_float32", "float32", "int8")
MAX_GPU_DEVICES = 8


def select_whisper_gpu(ct):
    """Query the installed CT2 backend, including HIP builds using device=cuda.

    No hardware-name inference, driver installation, model loading, or memory
    guarantee. A broken device does not hide a later usable device; enumerate
    at most eight devices so a malformed runtime cannot cause an unbounded scan.
    """
    try:
        count = ct.get_cuda_device_count()
        if isinstance(count, bool) or not isinstance(count, int) or count < 1:
            return None
    except (ImportError, AttributeError, TypeError, ValueError, RuntimeError, OSError, MemoryError):
        return None
    for index in range(min(count, MAX_GPU_DEVICES)):
        try:
            supported = set(ct.get_supported_compute_types("cuda", index))
        except (ImportError, AttributeError, TypeError, ValueError, RuntimeError, OSError, MemoryError):
            continue
        precision = next((kind for kind in GPU_COMPUTE_TYPES if kind in supported), None)
        if precision:
            return {"device": "cuda", "deviceIndex": index, "computeType": precision,
                    "supportedComputeTypes": sorted(kind for kind in supported if isinstance(kind, str)),
                    "deviceCount": count}
    return None


def probe():
    result = {"schema": 1, "default": "cpu", "observedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(), "backends": {}}
    def unavailable(reason):
        return {"available": False, "reason": reason, "runtimeLoaded": False}
    def available(**extra):
        return {"available": True, "reason": None, "runtimeLoaded": False, **extra}
    sense = {"cpu": unavailable("未安装 sherpa-onnx。"), "cuda": unavailable("未证实 sherpa-onnx CUDA provider；CPU 为默认选择。")}
    try:
        sherpa = importlib.import_module("sherpa_onnx")
        if not callable(getattr(getattr(sherpa, "OfflineRecognizer", None), "from_sense_voice", None)):
            raise ImportError("SenseVoice API unavailable")
        sense["cpu"] = available(backend="sherpa-onnx", provider="cpu")
        # ONNX Runtime package GPU availability is not proof sherpa-onnx was built with CUDA.
        providers_fn = getattr(sherpa, "get_available_providers", None)
        providers = list(providers_fn()) if callable(providers_fn) else []
        if "cuda" in [str(x).lower() for x in providers]:
            sense["cuda"] = unavailable("sherpa-onnx 报告 CUDA provider，但这份固定 SenseVoice INT8 模型的 CUDA 组合尚未验证；请使用 CPU。")
            sense["cuda"]["providerAdvertised"] = True
    except Exception:
        pass
    whisper = {"cpu": unavailable("未安装兼容的 faster-whisper / CTranslate2。"), "cuda": unavailable("未检测到可用的 CTranslate2 GPU 后端。")}
    try:
        fw = importlib.import_module("faster_whisper")
        ct = importlib.import_module("ctranslate2")
        if not callable(getattr(fw, "WhisperModel", None)):
            raise ImportError("Whisper API unavailable")
        try:
            cpu_types = sorted(ct.get_supported_compute_types("cpu"))
            if "int8" in cpu_types:
                whisper["cpu"] = available(backend="ctranslate2", device="cpu", computeType="int8", supportedComputeTypes=cpu_types)
        except Exception:
            pass
        gpu = select_whisper_gpu(ct)
        if gpu:
            whisper["cuda"] = available(backend="ctranslate2", **gpu, validation="backend-device-query",
                                        note="以已安装 CTranslate2 GPU 构建的设备查询为准；未测显存，实际模型加载与推理仍需验证。")
    except Exception:
        pass
    result["backends"] = {"sensevoice": sense, "whisper": whisper}
    return result


if __name__ == "__main__":
    # Keep the JSON pipe ASCII-safe regardless of Windows code page.
    print(json.dumps(probe()))
