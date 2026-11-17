using System;
using System.IO;
using System.Runtime.InteropServices;
using WhaleAudio;

public static class WindowsAudioNativeTests
{
    private static int checks;
    private static void Assert(bool value, string message)
    {
        checks++;
        if (!value) throw new Exception(message);
    }
    private static void Expect(string code, Action action)
    {
        try { action(); }
        catch (AudioException error) { Assert(error.Code == code, "Unexpected error code: " + error.Code); return; }
        throw new Exception("Expected " + code);
    }
    private static byte[] Wave(int sampleRate, int channels, int frames)
    {
        using (var stream = new MemoryStream())
        using (var writer = new BinaryWriter(stream))
        {
            int bytes = frames * channels * 2;
            writer.Write(new char[] { 'R', 'I', 'F', 'F' }); writer.Write(36 + bytes);
            writer.Write(new char[] { 'W', 'A', 'V', 'E', 'f', 'm', 't', ' ' }); writer.Write(16);
            writer.Write((ushort)1); writer.Write((ushort)channels); writer.Write(sampleRate);
            writer.Write(sampleRate * channels * 2); writer.Write((ushort)(channels * 2)); writer.Write((ushort)16);
            writer.Write(new char[] { 'd', 'a', 't', 'a' }); writer.Write(bytes);
            for (int i = 0; i < frames * channels; i++) writer.Write((short)(i % 2 == 0 ? 1234 : -2345));
            return stream.ToArray();
        }
    }

    public static string RunManaged()
    {
        checks = 0;
        Assert(Marshal.SizeOf(typeof(WaveFormat)) == 18, "WAVEFORMATEX ABI");
        Assert(Marshal.SizeOf(typeof(WaveOutCaps)) == 84, "WAVEOUTCAPSW ABI");
        Assert(Marshal.SizeOf(typeof(WaveHeader)) == (IntPtr.Size == 8 ? 48 : 32), "WAVEHDR ABI");
        Assert(Marshal.OffsetOf(typeof(WaveFormat), "SamplesPerSecond").ToInt32() == 4, "WAVEFORMATEX rate offset");
        Assert(Marshal.OffsetOf(typeof(WaveFormat), "ExtraSize").ToInt32() == 16, "WAVEFORMATEX cbSize offset");
        Assert(Marshal.OffsetOf(typeof(WaveOutCaps), "Name").ToInt32() == 8, "WAVEOUTCAPSW UTF-16 name offset");
        Assert(Marshal.OffsetOf(typeof(WaveOutCaps), "Support").ToInt32() == 80, "WAVEOUTCAPSW support offset");
        Assert(Marshal.OffsetOf(typeof(WaveHeader), "BufferLength").ToInt32() == IntPtr.Size, "WAVEHDR length offset");
        Assert(Marshal.OffsetOf(typeof(WaveHeader), "User").ToInt32() == (IntPtr.Size == 8 ? 16 : 12), "WAVEHDR DWORD_PTR offset");
        Assert(Marshal.OffsetOf(typeof(WaveHeader), "Flags").ToInt32() == (IntPtr.Size == 8 ? 24 : 16), "WAVEHDR flags offset");
        Assert(Marshal.OffsetOf(typeof(WaveHeader), "Next").ToInt32() == (IntPtr.Size == 8 ? 32 : 24), "WAVEHDR pointer offset");
        var first = new OutputDevice { Id = "opaque-A", Name = "Same display name", Index = 1 };
        var second = new OutputDevice { Id = "opaque-B", Name = "Same display name", Index = 4 };
        Assert(WindowsAudio.ResolveOutputIndex(null, new OutputDevice[0]) == 0xFFFFFFFF, "Default must use WAVE_MAPPER");
        Assert(WindowsAudio.ResolveOutputIndex("opaque-B", new[] { first, second }) == 4, "Select exact endpoint");
        second.Index = 0; second.Name = "Renamed";
        Assert(WindowsAudio.ResolveOutputIndex("opaque-B", new[] { second, first }) == 0, "Replug/reorder preserves endpoint identity");
        Expect("AUDIO_OUTPUT_DEVICE_UNAVAILABLE", delegate { WindowsAudio.ResolveOutputIndex("opaque-B", new[] { first }); });
        Expect("AUDIO_OUTPUT_DEVICE_UNAVAILABLE", delegate { WindowsAudio.ResolveOutputIndex("same display name", new[] { first, second }); });
        Expect("AUDIO_OUTPUT_DEVICE_UNAVAILABLE", delegate { WindowsAudio.ResolveOutputIndex("OPAQUE-B", new[] { first, second }); });
        Expect("AUDIO_OUTPUT_DEVICE_UNAVAILABLE", delegate { WindowsAudio.ResolveOutputIndex("opaque-B", new[] { second, second }); });
        Expect("AUDIO_OUTPUT_DEVICE_INVALID", delegate { WindowsAudio.ResolveOutputIndex("", new[] { first }); });
        Expect("AUDIO_OUTPUT_DEVICE_INVALID", delegate { WindowsAudio.ResolveOutputIndex("bad\0id", new[] { first }); });
        byte[] pcm = { 0xFF, 0x7F, 0x00, 0x80, 0x10, 0x27, 0xF0, 0xD8 };
        WindowsAudio.ScalePcm16(pcm, 0.5);
        Assert(BitConverter.ToInt16(pcm, 0) == 16384 && BitConverter.ToInt16(pcm, 2) == -16384, "Scale signed extrema");
        Assert(BitConverter.ToInt16(pcm, 4) == 5000 && BitConverter.ToInt16(pcm, 6) == -5000, "Scale samples rather than mixer volume");
        WindowsAudio.ScalePcm16(pcm, 0);
        Assert(BitConverter.ToInt64(pcm, 0) == 0, "Zero volume");
        Expect("AUDIO_VOLUME_INVALID", delegate { WindowsAudio.ScalePcm16(pcm, Double.NaN); });
        Expect("AUDIO_VOLUME_INVALID", delegate { WindowsAudio.ScalePcm16(pcm, -0.01); });
        Expect("AUDIO_VOLUME_INVALID", delegate { WindowsAudio.ScalePcm16(pcm, 1.01); });
        Expect("AUDIO_DECODE_FAILED", delegate { WindowsAudio.ScalePcm16(new byte[3], 1); });
        Expect("AUDIO_TOO_LARGE", delegate { WindowsAudio.Decode(new byte[0]); });
        Expect("AUDIO_TOO_LARGE", delegate { WindowsAudio.Decode(new byte[WindowsAudio.MaxEncodedBytes + 1]); });
        Expect("AUDIO_FORMAT_UNSUPPORTED", delegate { WindowsAudio.Decode(new byte[12]); });
        Expect("AUDIO_FILE_INVALID", delegate { WindowsAudio.ReadAudioFile("https://example.invalid/private.mp3"); });
        Expect("AUDIO_FILE_INVALID", delegate { WindowsAudio.ReadAudioFile("\\\\server\\share\\private.mp3"); });
        Expect("AUDIO_FILE_INVALID", delegate { WindowsAudio.ReadAudioFile("C:\\audio.wav:stream"); });
        return checks + " managed/ABI checks passed";
    }

    public static string RunNative(string mp3Path)
    {
        checks = 0;
        Assert(WindowsAudio.DecoderAvailable(), "Media Foundation startup");
        DecodedAudio mono = WindowsAudio.Decode(Wave(24000, 1, 2400));
        Assert(mono.SampleRate == 24000 && mono.Channels == 1, "Native WAV format negotiation");
        Assert(mono.Samples.Length == 4800 && Math.Abs(mono.DurationSeconds - 0.1) < 0.001, "Native WAV sample length");
        Assert(BitConverter.ToInt16(mono.Samples, 0) == 1234 && BitConverter.ToInt16(mono.Samples, 2) == -2345, "Native WAV exact sample values");
        DecodedAudio stereo = WindowsAudio.Decode(Wave(44100, 2, 4410));
        Assert(stereo.SampleRate == 44100 && stereo.Channels == 2 && stereo.Samples.Length == 17640, "Native stereo WAV");
        DecodedAudio mp3 = WindowsAudio.Decode(File.ReadAllBytes(mp3Path));
        Assert(mp3.SampleRate == 24000 && mp3.Channels == 1, "Native MP3 decoder negotiation");
        Assert(mp3.DurationSeconds >= 0.1 && mp3.DurationSeconds < 0.5, "Native MP3 duration");
        bool nonzero = false;
        foreach (byte value in mp3.Samples) if (value != 0) { nonzero = true; break; }
        Assert(nonzero, "Native MP3 produced actual PCM");
        Expect("AUDIO_TOO_LONG", delegate { WindowsAudio.Decode(Wave(8000, 1, 8000 * 121)); });
        // Enumeration is read-only and works on runners with zero audio devices.
        OutputDevice[] devices = WindowsAudio.EnumerateOutputs();
        foreach (OutputDevice device in devices) Assert(device.Backend == "winmm" && !String.IsNullOrWhiteSpace(device.Id), "WinMM endpoint enumeration");
        string absent = "whale-audio-test-missing-" + Guid.NewGuid().ToString("N");
        Expect("AUDIO_OUTPUT_DEVICE_UNAVAILABLE", delegate { WindowsAudio.ValidateOutput("winmm", absent); });
        // This executes the real playback entry point. It must fail before opening
        // any output, rather than silently play through WAVE_MAPPER.
        Expect("AUDIO_OUTPUT_DEVICE_UNAVAILABLE", delegate { WindowsAudio.Play(mono, 1, "winmm", absent); });
        Expect("AUDIO_OUTPUT_DEVICE_INVALID", delegate { WindowsAudio.Play(mono, 1, "other", absent); });
        // No test ever invokes successful Play/PlayDefault: CI must remain silent.
        return checks + " native decode/endpoint checks passed (no speaker output)";
    }
}
