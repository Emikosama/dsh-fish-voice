// Opt-in, private binary protocol. Never interpret network response bytes here.
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
namespace WhaleAudio {
 public static partial class WindowsAudio {
  private sealed class StreamBuffer { internal IntPtr Data, Header; internal bool Prepared; }
  private static void ReadExact(Stream input, byte[] bytes) {
   int offset = 0;
   while (offset < bytes.Length) { int n = input.Read(bytes, offset, bytes.Length-offset); if(n == 0) throw new AudioException("AUDIO_STREAM_TRUNCATED"); offset += n; }
  }
  private static uint ReadUInt(Stream input) { byte[] b = new byte[4]; ReadExact(input,b); return BitConverter.ToUInt32(b,0); }
  // Header: WPCM v1, encoding byte (1=s16,2=f32), rate u32 LE,
  // volume f64 LE, UTF8 endpoint length u32 + bytes (0=default).
  // Frames: u32 byte length + raw samples; zero explicitly ends the stream.
  public static void PlayPcmStream(Stream input, TextWriter output) {
   byte[] magic=new byte[6]; ReadExact(input,magic);
   if(magic[0]!=87 || magic[1]!=80 || magic[2]!=67 || magic[3]!=77 || magic[4]!=1 || (magic[5]!=1 && magic[5]!=2)) throw new AudioException("AUDIO_STREAM_INVALID");
   int width=magic[5]==1?2:4; uint rate=ReadUInt(input);
   if(rate<8000 || rate>48000) throw new AudioException("AUDIO_STREAM_INVALID");
   byte[] v=new byte[8]; ReadExact(input,v); double volume=BitConverter.ToDouble(v,0);
   if(Double.IsNaN(volume)||Double.IsInfinity(volume)||volume<0||volume>1) throw new AudioException("AUDIO_STREAM_INVALID");
   uint idLength=ReadUInt(input); if(idLength>16380) throw new AudioException("AUDIO_STREAM_INVALID");
   byte[] idBytes=new byte[(int)idLength]; ReadExact(input,idBytes);
   string endpoint=idLength==0?null:new UTF8Encoding(false,true).GetString(idBytes);
   ValidateOutput(endpoint==null?null:"winmm",endpoint);
   uint index=ResolveOutputIndex(endpoint,endpoint==null?new OutputDevice[0]:EnumerateOutputs());
   WaveFormat format=new WaveFormat {Tag=1,Channels=1,SamplesPerSecond=rate,AverageBytesPerSecond=rate*2,BlockAlign=2,BitsPerSample=16};
   IntPtr handle=IntPtr.Zero; var queue=new Queue<StreamBuffer>(); uint size=(uint)Marshal.SizeOf(typeof(WaveHeader));
   long total=0; var timer=Stopwatch.StartNew();
   try {
    if(Native.waveOutOpen(out handle,index,ref format,IntPtr.Zero,IntPtr.Zero,0)!=0) throw new AudioException("AUDIO_OUTPUT_DEVICE_UNAVAILABLE");
    AssertOpenedEndpoint(handle,endpoint); output.WriteLine("ready"); output.Flush();
    while(true) {
     uint length=ReadUInt(input); if(length==0) { if(total==0) throw new AudioException("AUDIO_STREAM_INVALID"); break; }
     if(length>4096 || length%width!=0 || total+length/width>rate*120L) throw new AudioException("AUDIO_TOO_LARGE");
     byte[] bytes=new byte[(int)length]; ReadExact(input,bytes);
     byte[] pcm=new byte[(int)length/width*2];
     for(int i=0;i<bytes.Length/width;i++) {
      double sample=width==2?BitConverter.ToInt16(bytes,i*2):BitConverter.ToSingle(bytes,i*4)*32767.0;
      if(Double.IsNaN(sample)||Double.IsInfinity(sample)||sample < -32768 || sample>32767) throw new AudioException("AUDIO_STREAM_INVALID");
      short scaled=(short)Math.Round(sample*volume); pcm[i*2]=(byte)scaled; pcm[i*2+1]=(byte)(scaled>>8);
     }
     if(queue.Count>=3) RetireStreamBuffer(handle,queue,size,endpoint,timer);
     AssertOpenedEndpoint(handle,endpoint);
     var item=new StreamBuffer(); queue.Enqueue(item);
     item.Data=Marshal.AllocHGlobal(pcm.Length); Marshal.Copy(pcm,0,item.Data,pcm.Length);
     item.Header=Marshal.AllocHGlobal((int)size); Marshal.StructureToPtr(new WaveHeader {Data=item.Data,BufferLength=(uint)pcm.Length},item.Header,false);
     CheckWave(Native.waveOutPrepareHeader(handle,item.Header,size)); item.Prepared=true;
     AssertOpenedEndpoint(handle,endpoint); CheckWave(Native.waveOutWrite(handle,item.Header,size));
     total+=length/width; output.WriteLine("ack"); output.Flush();
    }
    while(queue.Count>0) RetireStreamBuffer(handle,queue,size,endpoint,timer);
    AssertOpenedEndpoint(handle,endpoint);
   } finally {
    bool released=true;
    if(handle!=IntPtr.Zero) {
     Native.waveOutReset(handle);
     foreach(var item in queue) {
      bool safe=!item.Prepared;
      if(item.Prepared) for(int n=0;n<50;n++) { uint r=Native.waveOutUnprepareHeader(handle,item.Header,size); if(r==0){safe=true;break;} if(r!=33)break; Thread.Sleep(10); }
      if(safe) {if(item.Header!=IntPtr.Zero)Marshal.FreeHGlobal(item.Header);if(item.Data!=IntPtr.Zero)Marshal.FreeHGlobal(item.Data);} else released=false;
     }
     if(Native.waveOutClose(handle)!=0)released=false;
    }
    if(!released)throw new AudioException("AUDIO_CLEANUP_FAILED");
   }
   output.WriteLine("completed"); output.Flush();
  }
  private static void RetireStreamBuffer(IntPtr handle, Queue<StreamBuffer> queue,uint size,string endpoint,Stopwatch timer) {
   var item=queue.Peek(); var wait=Stopwatch.StartNew();
   while((((WaveHeader)Marshal.PtrToStructure(item.Header,typeof(WaveHeader))).Flags&1u)==0) {
    if(wait.ElapsedMilliseconds>6000 || timer.Elapsed.TotalSeconds>150)throw new AudioException("AUDIO_PLAYBACK_TIMEOUT");
    AssertOpenedEndpoint(handle,endpoint); Thread.Sleep(5);
   }
   CheckWave(Native.waveOutUnprepareHeader(handle,item.Header,size)); item.Prepared=false;
   Marshal.FreeHGlobal(item.Header); Marshal.FreeHGlobal(item.Data); queue.Dequeue();
  }
 }
}
