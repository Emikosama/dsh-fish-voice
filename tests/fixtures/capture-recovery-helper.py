"""Real bundled helper lifecycle with a device that supplies no PCM frames."""
import importlib.util
import os
from pathlib import Path
import sys
import threading
import types

# The integration wrapper sets these two explicit fixture-local paths.
spec = importlib.util.spec_from_file_location('capture_recovery_helper', SOURCE)
h = importlib.util.module_from_spec(spec)
spec.loader.exec_module(h)
home = Path(os.environ['DSH_HOME'])


class Stream:
    def __init__(self, **kwargs):
        pass

    def start(self):
        with (home / 'capture-starts').open('a') as output:
            output.write(str(os.getpid()) + '\n')

    def stop(self):
        pass

    def close(self):
        mode = (home / 'capture-close-mode').read_text()
        (home / 'capture-close-entered').write_text(mode)
        if mode == 'failed':
            raise OSError('synthetic native close failure')
        if mode == 'hung':
            # Exited only by production process shutdown, bounded if teardown fails.
            threading.Event().wait(30)


sys.modules['sounddevice'] = types.SimpleNamespace(
    RawInputStream=Stream, default=types.SimpleNamespace(device=[0]),
    query_devices=lambda *args: {'name': 'fixture', 'max_input_channels': 1} if args else [{'name': 'fixture', 'max_input_channels': 1, 'hostapi': 0}],
    query_hostapis=lambda *args: {'name': 'fixture'},
)
# Substitute the device boundary explicitly on Windows as well as Linux.
h._make_input_stream = lambda device, callback: Stream(device=device, callback=callback)
h.device_info = lambda: {'name': 'fixture', 'index': 0}


class EmptySamples(tuple):
    size = 0


def empty_samples(count, *, dtype):
    if count != 0 or dtype != "float32":
        raise AssertionError("capture lifecycle fixture must never process PCM samples")
    return EmptySamples()


# The fake device never calls the audio callback. The helper only allocates
# empty buffers while exercising the real gates, pipe, threads and teardown.
# Requests to interpret, concatenate or process actual samples fail in this
# fixture and belong in the recorder/recognition tests with native NumPy.
sys.modules['numpy'] = types.SimpleNamespace(zeros=empty_samples)


def preload_fixture():
    assert threading.current_thread() is threading.main_thread()
    return []


h.preload = preload_fixture
# No audio is supplied. Even if an unexpected inference path is reached, stop
# before any native model import or provider request.
h.full_result = lambda *args, **kwargs: {'error': 'fixture has no audio'}


def traced(name, handler):
    def run(message):
        with (home / 'capture-commands').open('a') as output:
            output.write(name + '\n')
        return handler(message)
    return run


h.HANDLERS = {name: traced(name, handler) for name, handler in h.HANDLERS.items()}
def break_stdin(message):
    # Close the real OS request pipe while remaining alive. The parent's next
    # normal production command gets EPIPE; only production shutdown ends us.
    os.close(0)
    (home / 'stdin-closed').write_text('closed')
    threading.Event().wait(30)


h.HANDLERS['test-break-stdin'] = break_stdin
h.main()
