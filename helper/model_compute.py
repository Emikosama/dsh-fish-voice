"""Probe installed inference backends only. No model download, recording, upload or GPU brand guesses."""
import datetime
import importlib
import json


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
    result["backends"] = {"sensevoice": sense}
    return result


if __name__ == "__main__":
    # Keep the JSON pipe ASCII-safe regardless of Windows code page.
    print(json.dumps(probe()))
