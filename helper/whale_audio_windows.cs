// Windows-only, dependency-free PCM decoding and output for the one-shot TTS helper.
// Device IDs are opaque endpoint IDs, never friendly names or persisted waveOut indices.
// https://learn.microsoft.com/windows/win32/coreaudio/endpoint-id-strings
// https://learn.microsoft.com/windows/win32/medfound/tutorial--decoding-audio
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using System.Threading;

namespace WhaleAudio
{
    public sealed class AudioException : Exception
    {
        public string Code { get; private set; }
        public AudioException(string code) : base(code) { Code = code; }
    }

    public sealed class OutputDevice
    {
        public string Backend { get { return "winmm"; } }
        public string Id { get; internal set; }
        public string Name { get; internal set; }
        internal uint Index;
    }

    public sealed class DecodedAudio
    {
        public byte[] Samples { get; internal set; }
        public int SampleRate { get { return (int)Format.SamplesPerSecond; } }
        public int Channels { get { return Format.Channels; } }
        public double DurationSeconds { get { return (double)Samples.Length / Format.AverageBytesPerSecond; } }
        internal WaveFormat Format;
    }

    public static partial class WindowsAudio
    {
        public const int MaxEncodedBytes = 32 * 1024 * 1024;
        public const int MaxPcmBytes = 48 * 1024 * 1024;
        public const int MaxDurationSeconds = 120;
        internal const uint WaveMapper = 0xFFFFFFFF;
        private const uint QueryEndpointId = 0x811;
        private const uint QueryEndpointIdSize = 0x812;
        private const uint FirstAudioStream = 0xFFFFFFFD;
        private const uint AllStreams = 0xFFFFFFFE;
        private static readonly Guid MajorType = new Guid("48eba18e-f8c9-4687-bf11-0a74c9f96a8f");
        private static readonly Guid Subtype = new Guid("f7e34c9a-42e8-4714-b74b-cb29d72c35e5");
        private static readonly Guid AudioType = new Guid("73647561-0000-0010-8000-00aa00389b71");
        private static readonly Guid PcmType = new Guid("00000001-0000-0010-8000-00aa00389b71");
        private static readonly Guid BitsPerSample = new Guid("f2deb57f-40fa-4764-aa33-ed4f2d1ff669");

        public static OutputDevice[] EnumerateOutputs()
        {
            var devices = new List<OutputDevice>();
            uint count = Native.waveOutGetNumDevs();
            if (count > 256) throw new AudioException("AUDIO_DEVICE_ENUMERATION_FAILED");
            for (uint index = 0; index < count; index++)
            {
                string id = ReadEndpointId(index);
                WaveOutCaps caps;
                if (id == null || Native.waveOutGetDevCaps(new UIntPtr(index), out caps,
                    (uint)Marshal.SizeOf(typeof(WaveOutCaps))) != 0) continue;
                devices.Add(new OutputDevice { Index = index, Id = id, Name = caps.Name });
            }
            return devices.ToArray();
        }

        private static string ReadEndpointId(uint index)
        {
            IntPtr sizeBuffer = Marshal.AllocHGlobal(sizeof(uint));
            IntPtr textBuffer = IntPtr.Zero;
            try
            {
                Marshal.WriteInt32(sizeBuffer, 0);
                if (Native.waveOutMessage(new IntPtr((long)index), QueryEndpointIdSize,
                    sizeBuffer, IntPtr.Zero) != 0) return null;
                int bytes = Marshal.ReadInt32(sizeBuffer);
                if (bytes < 4 || bytes > 8192 || bytes % 2 != 0) return null;
                textBuffer = Marshal.AllocHGlobal(bytes);
                // A failed or malformed driver response must not expose uninitialized memory.
                Marshal.Copy(new byte[bytes], 0, textBuffer, bytes);
                if (Native.waveOutMessage(new IntPtr((long)index), QueryEndpointId,
                    textBuffer, new IntPtr(bytes)) != 0) return null;
                string value = Marshal.PtrToStringUni(textBuffer, bytes / 2);
                int terminator = value.IndexOf('\0');
                if (terminator <= 0) return null;
                value = value.Substring(0, terminator);
                return IsEndpointId(value) ? value : null;
            }
            finally
            {
                if (textBuffer != IntPtr.Zero) Marshal.FreeHGlobal(textBuffer);
                Marshal.FreeHGlobal(sizeBuffer);
            }
        }

        private static bool IsEndpointId(string id)
        {
            if (String.IsNullOrWhiteSpace(id) || id.Length > 4095) return false;
            foreach (char c in id) if (Char.IsControl(c)) return false;
            return true;
        }

        // Name is deliberately absent: duplicate, renamed, and truncated display
        // names cannot change the device receiving private speech.
        internal static uint ResolveOutputIndex(string endpointId, OutputDevice[] devices)
        {
            if (endpointId == null) return WaveMapper;
            if (!IsEndpointId(endpointId)) throw new AudioException("AUDIO_OUTPUT_DEVICE_INVALID");
            OutputDevice found = null;
            foreach (OutputDevice device in devices)
            {
                if (!String.Equals(endpointId, device.Id, StringComparison.Ordinal)) continue;
                if (found != null) throw new AudioException("AUDIO_OUTPUT_DEVICE_UNAVAILABLE");
                found = device;
            }
            if (found == null) throw new AudioException("AUDIO_OUTPUT_DEVICE_UNAVAILABLE");
            return found.Index;
        }

        public static void ValidateOutput(string backend, string endpointId)
        {
            if (backend == null && endpointId == null)
            {
                if (Native.waveOutGetNumDevs() == 0)
                    throw new AudioException("AUDIO_OUTPUT_DEVICE_UNAVAILABLE");
                return;
            }
            if (backend != "winmm" || !IsEndpointId(endpointId))
                throw new AudioException("AUDIO_OUTPUT_DEVICE_INVALID");
            ResolveOutputIndex(endpointId, EnumerateOutputs());
        }

        public static bool DecoderAvailable()
        {
            bool uninitialize = false, started = false;
            try
            {
                int initialized = Native.CoInitializeEx(IntPtr.Zero, 0);
                uninitialize = initialized >= 0;
                if (initialized < 0 && initialized != unchecked((int)0x80010106)) return false;
                Check(Native.MFStartup(0x20070, 0), "AUDIO_DECODER_UNAVAILABLE");
                started = true;
                return true;
            }
            catch { return false; }
            finally
            {
                if (started) Native.MFShutdown();
                if (uninitialize) Native.CoUninitialize();
            }
        }

        public static byte[] ReadAudioFile(string path)
        {
            // Only local files generated/authorized by the parent, never URLs, UNC
            // paths, device namespaces, or alternate streams passed to a resolver.
            if (String.IsNullOrWhiteSpace(path) || path.Length > 4096 || !Path.IsPathRooted(path)
                || path.Length < 3 || path[1] != ':' || path[2] != '\\'
                || path.IndexOf(':', 2) >= 0 || path.IndexOf('\0') >= 0)
                throw new AudioException("AUDIO_FILE_INVALID");
            using (var file = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                if (file.Length < 12 || file.Length > MaxEncodedBytes) throw new AudioException("AUDIO_TOO_LARGE");
                byte[] bytes = new byte[(int)file.Length];
                int position = 0;
                while (position < bytes.Length)
                {
                    int read = file.Read(bytes, position, bytes.Length - position);
                    if (read == 0) throw new AudioException("AUDIO_FILE_INVALID");
                    position += read;
                }
                return bytes;
            }
        }

        public static DecodedAudio Decode(byte[] encoded)
        {
            if (encoded == null || encoded.Length < 12 || encoded.Length > MaxEncodedBytes)
                throw new AudioException("AUDIO_TOO_LARGE");
            // Restrict source resolution to the two formats we generate. Passing
            // in-memory bytes also prevents Media Foundation from opening a URL.
            bool wave = encoded[0] == 'R' && encoded[1] == 'I' && encoded[2] == 'F' && encoded[3] == 'F'
                && encoded[8] == 'W' && encoded[9] == 'A' && encoded[10] == 'V' && encoded[11] == 'E';
            bool mp3 = (encoded[0] == 'I' && encoded[1] == 'D' && encoded[2] == '3')
                || (encoded[0] == 0xFF && (encoded[1] & 0xE0) == 0xE0);
            if (!wave && !mp3) throw new AudioException("AUDIO_FORMAT_UNSUPPORTED");
            int initialized = Native.CoInitializeEx(IntPtr.Zero, 0);
            bool uninitialize = initialized >= 0;
            // PowerShell can already own an STA. Media Foundation works there too.
            if (initialized < 0 && initialized != unchecked((int)0x80010106))
                throw new AudioException("AUDIO_DECODER_UNAVAILABLE");
            bool started = false;
            IntPtr byteStream = IntPtr.Zero, partialType = IntPtr.Zero, currentType = IntPtr.Zero;
            IMFSourceReader reader = null;
            IMFAttributes attributes = null;
            var stream = new ReadOnlyComStream(encoded);
            var timer = Stopwatch.StartNew();
            try
            {
                Check(Native.MFStartup(0x20070, 0), "AUDIO_DECODER_UNAVAILABLE");
                started = true;
                Check(Native.MFCreateMFByteStreamOnStream(stream, out byteStream), "AUDIO_DECODE_FAILED");
                Check(Native.MFCreateSourceReaderFromByteStream(byteStream, IntPtr.Zero, out reader), "AUDIO_DECODE_FAILED");
                Check(reader.SetStreamSelection(AllStreams, false), "AUDIO_DECODE_FAILED");
                Check(reader.SetStreamSelection(FirstAudioStream, true), "AUDIO_DECODE_FAILED");
                Check(Native.MFCreateMediaType(out partialType), "AUDIO_DECODE_FAILED");
                attributes = (IMFAttributes)Marshal.GetObjectForIUnknown(partialType);
                Check(attributes.SetGUID(MajorType, AudioType), "AUDIO_DECODE_FAILED");
                Check(attributes.SetGUID(Subtype, PcmType), "AUDIO_DECODE_FAILED");
                Check(attributes.SetUINT32(BitsPerSample, 16), "AUDIO_DECODE_FAILED");
                Check(reader.SetCurrentMediaType(FirstAudioStream, IntPtr.Zero, partialType), "AUDIO_FORMAT_UNSUPPORTED");
                Check(reader.GetCurrentMediaType(FirstAudioStream, out currentType), "AUDIO_DECODE_FAILED");
                WaveFormat format = ReadWaveFormat(currentType);
                long durationLimit = (long)format.AverageBytesPerSecond * MaxDurationSeconds;
                using (var output = new MemoryStream())
                {
                    int emptySamples = 0;
                    while (true)
                    {
                        // This bounds normal decode loops. A blocked native call
                        // cannot be interrupted safely in-process; the parent owns
                        // the hard one-shot process timeout and cancellation fence.
                        if (timer.Elapsed.TotalSeconds > 30) throw new AudioException("AUDIO_DECODE_TIMEOUT");
                        uint actualStream, flags;
                        long timestamp;
                        IMFSample sample = null;
                        IMFMediaBuffer buffer = null;
                        bool locked = false;
                        try
                        {
                            Check(reader.ReadSample(FirstAudioStream, 0, out actualStream, out flags,
                                out timestamp, out sample), "AUDIO_DECODE_FAILED");
                            // Error, new stream, or format change: never interpret
                            // a different encoding as the originally negotiated PCM.
                            if ((flags & (1u | 4u | 16u | 32u)) != 0)
                                throw new AudioException("AUDIO_FORMAT_CHANGED");
                            if (sample != null)
                            {
                                emptySamples = 0;
                                Check(sample.ConvertToContiguousBuffer(out buffer), "AUDIO_DECODE_FAILED");
                                IntPtr data;
                                uint maximum, length;
                                Check(buffer.Lock(out data, out maximum, out length), "AUDIO_DECODE_FAILED");
                                locked = true;
                                if (length > maximum || length > MaxPcmBytes || output.Length + length > MaxPcmBytes)
                                    throw new AudioException("AUDIO_TOO_LARGE");
                                if (output.Length + length > durationLimit) throw new AudioException("AUDIO_TOO_LONG");
                                if (length % format.BlockAlign != 0) throw new AudioException("AUDIO_DECODE_FAILED");
                                byte[] chunk = new byte[(int)length];
                                Marshal.Copy(data, chunk, 0, chunk.Length);
                                output.Write(chunk, 0, chunk.Length);
                            }
                            else if (++emptySamples > 1024) throw new AudioException("AUDIO_DECODE_FAILED");
                            if ((flags & 2u) != 0) break; // ENDOFSTREAM may accompany a final sample.
                        }
                        finally
                        {
                            if (locked) buffer.Unlock();
                            Release(buffer);
                            Release(sample);
                        }
                    }
                    if (output.Length == 0) throw new AudioException("AUDIO_DECODE_FAILED");
                    return new DecodedAudio { Samples = output.ToArray(), Format = format };
                }
            }
            finally
            {
                Release(attributes);
                if (currentType != IntPtr.Zero) Marshal.Release(currentType);
                if (partialType != IntPtr.Zero) Marshal.Release(partialType);
                Release(reader);
                if (byteStream != IntPtr.Zero) Marshal.Release(byteStream);
                GC.KeepAlive(stream);
                if (started) Native.MFShutdown();
                if (uninitialize) Native.CoUninitialize();
            }
        }

        private static WaveFormat ReadWaveFormat(IntPtr mediaType)
        {
            IntPtr pointer = IntPtr.Zero;
            try
            {
                uint size;
                Check(Native.MFCreateWaveFormatExFromMFMediaType(mediaType, out pointer, out size, 0), "AUDIO_FORMAT_UNSUPPORTED");
                if (size < 18) throw new AudioException("AUDIO_FORMAT_UNSUPPORTED");
                WaveFormat format = (WaveFormat)Marshal.PtrToStructure(pointer, typeof(WaveFormat));
                if (format.Tag == 0xFFFE && size >= 40 && format.ExtraSize >= 22)
                {
                    Guid subtype = (Guid)Marshal.PtrToStructure(IntPtr.Add(pointer, 24), typeof(Guid));
                    if (subtype != PcmType || Marshal.ReadInt16(pointer, 18) != 16)
                        throw new AudioException("AUDIO_FORMAT_UNSUPPORTED");
                    format.Tag = 1;
                    format.ExtraSize = 0;
                }
                if (format.Tag != 1 || format.BitsPerSample != 16 || format.Channels < 1 || format.Channels > 2
                    || format.SamplesPerSecond < 8000 || format.SamplesPerSecond > 192000
                    || format.BlockAlign != format.Channels * 2
                    || format.AverageBytesPerSecond != format.SamplesPerSecond * format.BlockAlign)
                    throw new AudioException("AUDIO_FORMAT_UNSUPPORTED");
                format.ExtraSize = 0;
                return format;
            }
            finally { if (pointer != IntPtr.Zero) Marshal.FreeCoTaskMem(pointer); }
        }

        internal static void ScalePcm16(byte[] samples, double volume)
        {
            if (Double.IsNaN(volume) || Double.IsInfinity(volume) || volume < 0 || volume > 1)
                throw new AudioException("AUDIO_VOLUME_INVALID");
            if (samples == null || samples.Length % 2 != 0) throw new AudioException("AUDIO_DECODE_FAILED");
            if (volume == 1) return;
            for (int index = 0; index < samples.Length; index += 2)
            {
                short value = (short)(samples[index] | (samples[index + 1] << 8));
                short scaled = (short)Math.Round(value * volume);
                samples[index] = (byte)scaled;
                samples[index + 1] = (byte)(scaled >> 8);
            }
        }

        public static void PlayDefault(DecodedAudio audio, double volume)
        {
            Play(audio, volume, null, null);
        }

        public static void Play(DecodedAudio audio, double volume, string backend, string endpointId)
        {
            if (audio == null || audio.Samples == null || audio.Samples.Length == 0
                || audio.Samples.Length > MaxPcmBytes || audio.DurationSeconds > MaxDurationSeconds)
                throw new AudioException("AUDIO_TOO_LARGE");
            if (!(backend == null && endpointId == null) && (backend != "winmm" || !IsEndpointId(endpointId)))
                throw new AudioException("AUDIO_OUTPUT_DEVICE_INVALID");
            // Re-enumerate immediately before every open, not when the menu was
            // populated or before synthesis. Null remains WAVE_MAPPER every time.
            uint index = ResolveOutputIndex(endpointId, endpointId == null ? new OutputDevice[0] : EnumerateOutputs());
            byte[] samples = (byte[])audio.Samples.Clone();
            ScalePcm16(samples, volume);
            IntPtr handle = IntPtr.Zero, data = IntPtr.Zero, header = IntPtr.Zero;
            bool prepared = false;
            uint headerSize = (uint)Marshal.SizeOf(typeof(WaveHeader));
            try
            {
                WaveFormat format = audio.Format;
                if (Native.waveOutOpen(out handle, index, ref format, IntPtr.Zero, IntPtr.Zero, 0) != 0)
                    throw new AudioException("AUDIO_OUTPUT_DEVICE_UNAVAILABLE");
                AssertOpenedEndpoint(handle, endpointId);
                data = Marshal.AllocHGlobal(samples.Length);
                Marshal.Copy(samples, 0, data, samples.Length);
                header = Marshal.AllocHGlobal((int)headerSize);
                var value = new WaveHeader { Data = data, BufferLength = (uint)samples.Length };
                Marshal.StructureToPtr(value, header, false);
                CheckWave(Native.waveOutPrepareHeader(handle, header, headerSize));
                prepared = true;
                AssertOpenedEndpoint(handle, endpointId);
                CheckWave(Native.waveOutWrite(handle, header, headerSize));
                var timer = Stopwatch.StartNew();
                long nextDeviceCheck = 0;
                while (true)
                {
                    var current = (WaveHeader)Marshal.PtrToStructure(header, typeof(WaveHeader));
                    if ((current.Flags & 1u) != 0) break; // WHDR_DONE
                    if (timer.Elapsed.TotalSeconds > Math.Min(MaxDurationSeconds, audio.DurationSeconds + 5))
                        throw new AudioException("AUDIO_PLAYBACK_TIMEOUT");
                    if (endpointId != null && timer.ElapsedMilliseconds >= nextDeviceCheck)
                    {
                        AssertOpenedEndpoint(handle, endpointId);
                        nextDeviceCheck = timer.ElapsedMilliseconds + 200;
                    }
                    Thread.Sleep(10);
                }
                AssertOpenedEndpoint(handle, endpointId);
            }
            finally
            {
                // Reset returns queued buffers before unpreparing/freeing them.
                // If a broken driver refuses cleanup, retain its unmanaged memory
                // until this one-shot process exits rather than causing use-after-free.
                bool released = !prepared;
                if (handle != IntPtr.Zero)
                {
                    Native.waveOutReset(handle);
                    if (prepared)
                    {
                        for (int attempt = 0; attempt < 50; attempt++)
                        {
                            uint result = Native.waveOutUnprepareHeader(handle, header, headerSize);
                            if (result == 0) { released = true; break; }
                            if (result != 33) break; // WAVERR_STILLPLAYING
                            Thread.Sleep(10);
                        }
                    }
                    uint closeResult = Native.waveOutClose(handle);
                    if (closeResult != 0) released = false;
                }
                if (released)
                {
                    if (header != IntPtr.Zero) Marshal.FreeHGlobal(header);
                    if (data != IntPtr.Zero) Marshal.FreeHGlobal(data);
                }
                else throw new AudioException("AUDIO_CLEANUP_FAILED");
            }
        }

        private static void AssertOpenedEndpoint(IntPtr handle, string endpointId)
        {
            if (endpointId == null) return;
            uint actual;
            if (Native.waveOutGetID(handle, out actual) != 0
                || !String.Equals(ReadEndpointId(actual), endpointId, StringComparison.Ordinal))
                throw new AudioException("AUDIO_OUTPUT_DEVICE_UNAVAILABLE");
        }
        private static void Check(int result, string code) { if (result < 0) throw new AudioException(code); }
        private static void CheckWave(uint result) { if (result != 0) throw new AudioException("AUDIO_PLAYBACK_FAILED"); }
        private static void Release(object value) { if (value != null && Marshal.IsComObject(value)) Marshal.ReleaseComObject(value); }
    }

    [StructLayout(LayoutKind.Sequential, Pack = 2)]
    internal struct WaveFormat
    {
        public ushort Tag, Channels;
        public uint SamplesPerSecond, AverageBytesPerSecond;
        public ushort BlockAlign, BitsPerSample, ExtraSize;
    }
    [StructLayout(LayoutKind.Sequential)]
    internal struct WaveHeader
    {
        public IntPtr Data;
        public uint BufferLength, BytesRecorded;
        public UIntPtr User;
        public uint Flags, Loops;
        public IntPtr Next;
        public UIntPtr Reserved;
    }
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    internal struct WaveOutCaps
    {
        public ushort Manufacturer, Product;
        public uint Version;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 32)] public string Name;
        public uint Formats;
        public ushort Channels, Reserved;
        public uint Support;
    }

    // Media Foundation reads from an in-memory IStream, never a URL resolver.
    // Each clone has its own cursor; the immutable encoded data is shared.
    [ComVisible(true), ClassInterface(ClassInterfaceType.None)]
    public sealed class ReadOnlyComStream : IStream
    {
        private readonly MemoryStream stream;
        private readonly byte[] bytes;
        internal ReadOnlyComStream(byte[] value) { bytes = value; stream = new MemoryStream(value, false); }
        public void Read(byte[] buffer, int count, IntPtr read)
        {
            lock (stream)
            {
                int result = stream.Read(buffer, 0, count);
                if (read != IntPtr.Zero) Marshal.WriteInt32(read, result);
            }
        }
        public void Seek(long offset, int origin, IntPtr position)
        {
            lock (stream)
            {
                long result = stream.Seek(offset, (SeekOrigin)origin);
                if (position != IntPtr.Zero) Marshal.WriteInt64(position, result);
            }
        }
        public void Stat(out System.Runtime.InteropServices.ComTypes.STATSTG value, int flags)
        {
            value = new System.Runtime.InteropServices.ComTypes.STATSTG { type = 2, cbSize = bytes.Length, grfMode = 0 };
        }
        public void Clone(out IStream clone)
        {
            var other = new ReadOnlyComStream(bytes);
            lock (stream) other.stream.Position = stream.Position;
            clone = other;
        }
        public void Commit(int flags) { }
        public void Write(byte[] buffer, int count, IntPtr written) { throw new COMException("Read only", unchecked((int)0x80030005)); }
        public void SetSize(long size) { throw new COMException("Read only", unchecked((int)0x80030005)); }
        public void CopyTo(IStream target, long count, IntPtr read, IntPtr written) { throw new COMException("Not supported", unchecked((int)0x80004001)); }
        public void Revert() { throw new COMException("Not supported", unchecked((int)0x80004001)); }
        public void LockRegion(long offset, long count, int type) { throw new COMException("Not supported", unchecked((int)0x80004001)); }
        public void UnlockRegion(long offset, long count, int type) { throw new COMException("Not supported", unchecked((int)0x80004001)); }
    }

    internal static class Native
    {
        [DllImport("winmm.dll")] internal static extern uint waveOutGetNumDevs();
        [DllImport("winmm.dll", CharSet = CharSet.Unicode, EntryPoint = "waveOutGetDevCapsW")] internal static extern uint waveOutGetDevCaps(UIntPtr device, out WaveOutCaps caps, uint size);
        [DllImport("winmm.dll")] internal static extern uint waveOutMessage(IntPtr device, uint message, IntPtr first, IntPtr second);
        [DllImport("winmm.dll")] internal static extern uint waveOutOpen(out IntPtr handle, uint device, ref WaveFormat format, IntPtr callback, IntPtr instance, uint flags);
        [DllImport("winmm.dll")] internal static extern uint waveOutGetID(IntPtr handle, out uint device);
        [DllImport("winmm.dll")] internal static extern uint waveOutPrepareHeader(IntPtr handle, IntPtr header, uint size);
        [DllImport("winmm.dll")] internal static extern uint waveOutWrite(IntPtr handle, IntPtr header, uint size);
        [DllImport("winmm.dll")] internal static extern uint waveOutReset(IntPtr handle);
        [DllImport("winmm.dll")] internal static extern uint waveOutUnprepareHeader(IntPtr handle, IntPtr header, uint size);
        [DllImport("winmm.dll")] internal static extern uint waveOutClose(IntPtr handle);
        [DllImport("ole32.dll")] internal static extern int CoInitializeEx(IntPtr reserved, uint flags);
        [DllImport("ole32.dll")] internal static extern void CoUninitialize();
        [DllImport("mfplat.dll", ExactSpelling = true)] internal static extern int MFStartup(uint version, uint flags);
        [DllImport("mfplat.dll", ExactSpelling = true)] internal static extern int MFShutdown();
        [DllImport("mfplat.dll", ExactSpelling = true)] internal static extern int MFCreateMFByteStreamOnStream([MarshalAs(UnmanagedType.Interface)] IStream stream, out IntPtr byteStream);
        [DllImport("mfplat.dll", ExactSpelling = true)] internal static extern int MFCreateMediaType(out IntPtr mediaType);
        [DllImport("mfplat.dll", ExactSpelling = true)] internal static extern int MFCreateWaveFormatExFromMFMediaType(IntPtr mediaType, out IntPtr format, out uint size, uint flags);
        [DllImport("mfreadwrite.dll", ExactSpelling = true)] internal static extern int MFCreateSourceReaderFromByteStream(IntPtr stream, IntPtr attributes, out IMFSourceReader reader);
    }

    [ComImport, Guid("70ae66f2-c809-4e4f-8915-bdcb406b7993"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    internal interface IMFSourceReader
    {
        [PreserveSig] int GetStreamSelection(uint stream, [MarshalAs(UnmanagedType.Bool)] out bool selected);
        [PreserveSig] int SetStreamSelection(uint stream, [MarshalAs(UnmanagedType.Bool)] bool selected);
        [PreserveSig] int GetNativeMediaType(uint stream, uint index, out IntPtr mediaType);
        [PreserveSig] int GetCurrentMediaType(uint stream, out IntPtr mediaType);
        [PreserveSig] int SetCurrentMediaType(uint stream, IntPtr reserved, IntPtr mediaType);
        [PreserveSig] int SetCurrentPosition([In, MarshalAs(UnmanagedType.LPStruct)] Guid format, IntPtr position);
        [PreserveSig] int ReadSample(uint stream, uint flags, out uint actualStream, out uint streamFlags, out long timestamp, out IMFSample sample);
        [PreserveSig] int Flush(uint stream);
        [PreserveSig] int GetServiceForStream(uint stream, [In, MarshalAs(UnmanagedType.LPStruct)] Guid service, [In, MarshalAs(UnmanagedType.LPStruct)] Guid iid, out IntPtr value);
        [PreserveSig] int GetPresentationAttribute(uint stream, [In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value);
    }

    [ComImport, Guid("045fa593-8799-42b8-bc8d-8968c6453507"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    internal interface IMFMediaBuffer
    {
        [PreserveSig] int Lock(out IntPtr data, out uint maximum, out uint length);
        [PreserveSig] int Unlock();
        [PreserveSig] int GetCurrentLength(out uint length);
        [PreserveSig] int SetCurrentLength(uint length);
        [PreserveSig] int GetMaxLength(out uint length);
    }

    [ComImport, Guid("2cd2d921-c447-44a7-a13c-4adabfc247e3"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    internal interface IMFAttributes
    {
        [PreserveSig] int GetItem([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value);
        [PreserveSig] int GetItemType([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out uint type);
        [PreserveSig] int CompareItem([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value, [MarshalAs(UnmanagedType.Bool)] out bool result);
        [PreserveSig] int Compare(IMFAttributes other, uint matchType, [MarshalAs(UnmanagedType.Bool)] out bool result);
        [PreserveSig] int GetUINT32([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out uint value);
        [PreserveSig] int GetUINT64([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out ulong value);
        [PreserveSig] int GetDouble([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out double value);
        [PreserveSig] int GetGUID([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out Guid value);
        [PreserveSig] int GetStringLength([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out uint length);
        [PreserveSig] int GetString([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value, uint size, out uint length);
        [PreserveSig] int GetAllocatedString([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out IntPtr value, out uint length);
        [PreserveSig] int GetBlobSize([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out uint size);
        [PreserveSig] int GetBlob([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value, uint size, out uint length);
        [PreserveSig] int GetAllocatedBlob([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out IntPtr value, out uint size);
        [PreserveSig] int GetUnknown([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, [In, MarshalAs(UnmanagedType.LPStruct)] Guid iid, out IntPtr value);
        [PreserveSig] int SetItem([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value);
        [PreserveSig] int DeleteItem([In, MarshalAs(UnmanagedType.LPStruct)] Guid key);
        [PreserveSig] int DeleteAllItems();
        [PreserveSig] int SetUINT32([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, uint value);
        [PreserveSig] int SetUINT64([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, ulong value);
        [PreserveSig] int SetDouble([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, double value);
        [PreserveSig] int SetGUID([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, [In, MarshalAs(UnmanagedType.LPStruct)] Guid value);
        [PreserveSig] int SetString([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, [MarshalAs(UnmanagedType.LPWStr)] string value);
        [PreserveSig] int SetBlob([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value, uint size);
        [PreserveSig] int SetUnknown([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, [MarshalAs(UnmanagedType.IUnknown)] object value);
        [PreserveSig] int LockStore();
        [PreserveSig] int UnlockStore();
        [PreserveSig] int GetCount(out uint count);
        [PreserveSig] int GetItemByIndex(uint index, out Guid key, IntPtr value);
        [PreserveSig] int CopyAllItems(IMFAttributes destination);
    }

    // IMFSample inherits all 30 IMFAttributes methods. Keep these in native
    // declaration order; ConvertToContiguousBuffer is vtable slot 41.
    [ComImport, Guid("c40a00f2-b93a-4d80-ae8c-5a1c634f58e4"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    internal interface IMFSample
    {
        [PreserveSig] int GetItem([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value);
        [PreserveSig] int GetItemType([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out uint type);
        [PreserveSig] int CompareItem([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value, [MarshalAs(UnmanagedType.Bool)] out bool result);
        [PreserveSig] int Compare(IMFAttributes other, uint matchType, [MarshalAs(UnmanagedType.Bool)] out bool result);
        [PreserveSig] int GetUINT32([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out uint value);
        [PreserveSig] int GetUINT64([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out ulong value);
        [PreserveSig] int GetDouble([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out double value);
        [PreserveSig] int GetGUID([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out Guid value);
        [PreserveSig] int GetStringLength([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out uint length);
        [PreserveSig] int GetString([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value, uint size, out uint length);
        [PreserveSig] int GetAllocatedString([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out IntPtr value, out uint length);
        [PreserveSig] int GetBlobSize([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out uint size);
        [PreserveSig] int GetBlob([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value, uint size, out uint length);
        [PreserveSig] int GetAllocatedBlob([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, out IntPtr value, out uint size);
        [PreserveSig] int GetUnknown([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, [In, MarshalAs(UnmanagedType.LPStruct)] Guid iid, out IntPtr value);
        [PreserveSig] int SetItem([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value);
        [PreserveSig] int DeleteItem([In, MarshalAs(UnmanagedType.LPStruct)] Guid key);
        [PreserveSig] int DeleteAllItems();
        [PreserveSig] int SetUINT32([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, uint value);
        [PreserveSig] int SetUINT64([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, ulong value);
        [PreserveSig] int SetDouble([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, double value);
        [PreserveSig] int SetGUID([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, [In, MarshalAs(UnmanagedType.LPStruct)] Guid value);
        [PreserveSig] int SetString([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, [MarshalAs(UnmanagedType.LPWStr)] string value);
        [PreserveSig] int SetBlob([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, IntPtr value, uint size);
        [PreserveSig] int SetUnknown([In, MarshalAs(UnmanagedType.LPStruct)] Guid key, [MarshalAs(UnmanagedType.IUnknown)] object value);
        [PreserveSig] int LockStore();
        [PreserveSig] int UnlockStore();
        [PreserveSig] int GetCount(out uint count);
        [PreserveSig] int GetItemByIndex(uint index, out Guid key, IntPtr value);
        [PreserveSig] int CopyAllItems(IMFAttributes destination);
        [PreserveSig] int GetSampleFlags(out uint flags);
        [PreserveSig] int SetSampleFlags(uint flags);
        [PreserveSig] int GetSampleTime(out long time);
        [PreserveSig] int SetSampleTime(long time);
        [PreserveSig] int GetSampleDuration(out long duration);
        [PreserveSig] int SetSampleDuration(long duration);
        [PreserveSig] int GetBufferCount(out uint count);
        [PreserveSig] int GetBufferByIndex(uint index, out IMFMediaBuffer buffer);
        [PreserveSig] int ConvertToContiguousBuffer(out IMFMediaBuffer buffer);
        [PreserveSig] int AddBuffer(IMFMediaBuffer buffer);
        [PreserveSig] int RemoveBufferByIndex(uint index);
        [PreserveSig] int RemoveAllBuffers();
        [PreserveSig] int GetTotalLength(out uint length);
        [PreserveSig] int CopyToBuffer(IMFMediaBuffer buffer);
    }
}
