using System;
using System.IO;
using WhaleAudio;
// Managed rejection tests never open an output device, even on Windows.
public static class WindowsPcmStreamTests {
 public static void Run() {
  byte[] valid = new byte[22]; valid[0]=87;valid[1]=80;valid[2]=67;valid[3]=77;valid[4]=1;valid[5]=2;
  Array.Copy(BitConverter.GetBytes((uint)24000),0,valid,6,4);Array.Copy(BitConverter.GetBytes(0.5),0,valid,10,8);
  Reject(new byte[0],"AUDIO_STREAM_TRUNCATED");
  var bytes=(byte[])valid.Clone();bytes[4]=2;Reject(bytes,"AUDIO_STREAM_INVALID");
  bytes=(byte[])valid.Clone();bytes[5]=3;Reject(bytes,"AUDIO_STREAM_INVALID");
  bytes=(byte[])valid.Clone();Array.Copy(BitConverter.GetBytes((uint)0),0,bytes,6,4);Reject(bytes,"AUDIO_STREAM_INVALID");
  bytes=(byte[])valid.Clone();Array.Copy(BitConverter.GetBytes(Double.NaN),0,bytes,10,8);Reject(bytes,"AUDIO_STREAM_INVALID");
  bytes=(byte[])valid.Clone();Array.Copy(BitConverter.GetBytes((uint)16381),0,bytes,18,4);Reject(bytes,"AUDIO_STREAM_INVALID");
  Console.WriteLine("PCM stream managed rejection checks passed; no output device opened");
 }
 private static void Reject(byte[] bytes,string code) {
  var output=new StringWriter();
  try {WindowsAudio.PlayPcmStream(new MemoryStream(bytes),output);throw new Exception("Expected rejection");}
  catch(AudioException error){if(error.Code!=code || output.ToString().Length!=0)throw new Exception("Invalid rejection contract");}
 }
}
