# Read-only DXGI inventory. No device/context creation, model loading or network.
# SIZE_T is pointer-sized: refuse a 32-bit process rather than truncate VRAM.
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
if ([IntPtr]::Size -ne 8) { throw '64-bit PowerShell required' }
$source = @'
using System;
using System.Runtime.InteropServices;
using System.Collections.Generic;
public class WhaleGpuInventory {
 [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
 public struct Desc {
  [MarshalAs(UnmanagedType.ByValTStr, SizeConst=128)] public string Description;
  public uint VendorId, DeviceId, SubSysId, Revision;
  public UIntPtr DedicatedVideoMemory, DedicatedSystemMemory, SharedSystemMemory;
  public uint LuidLow; public int LuidHigh; public uint Flags;
 }
 [DllImport("dxgi.dll")] static extern int CreateDXGIFactory1(ref Guid id, out IntPtr factory);
 [UnmanagedFunctionPointer(CallingConvention.StdCall)] delegate int EnumAdapters1(IntPtr self, uint index, out IntPtr adapter);
 [UnmanagedFunctionPointer(CallingConvention.StdCall)] delegate int GetDesc1(IntPtr self, out Desc desc);
 static T Fn<T>(IntPtr p, int slot) {
  return (T)(object)Marshal.GetDelegateForFunctionPointer(Marshal.ReadIntPtr(Marshal.ReadIntPtr(p), slot*IntPtr.Size), typeof(T));
 }
 public static object[] Read() {
  var id = new Guid("770aae78-f26f-4dba-a829-253c83d1b387");
  IntPtr factory; Marshal.ThrowExceptionForHR(CreateDXGIFactory1(ref id, out factory));
  var list = new List<object>();
  try {
   var enumerate = Fn<EnumAdapters1>(factory, 12);
   for (uint i=0; i<32; i++) {
    IntPtr adapter; int hr = enumerate(factory, i, out adapter);
    if (hr == unchecked((int)0x887A0002)) break;
    Marshal.ThrowExceptionForHR(hr);
    try {
     Desc d; Marshal.ThrowExceptionForHR(Fn<GetDesc1>(adapter, 10)(adapter, out d));
     list.Add(new {
      name=d.Description, vendorId=d.VendorId, deviceId=d.DeviceId,
      luid=d.LuidHigh.ToString("x8")+d.LuidLow.ToString("x8"), flags=d.Flags,
      dedicatedVideoMemoryBytes=d.DedicatedVideoMemory.ToUInt64(),
      sharedSystemMemoryBytes=d.SharedSystemMemory.ToUInt64()
     });
    } finally { Marshal.Release(adapter); }
   }
  } finally { Marshal.Release(factory); }
  return list.ToArray();
 }
}
'@
Add-Type -TypeDefinition $source
@{ ok=$true; adapters=@([WhaleGpuInventory]::Read()) } | ConvertTo-Json -Depth 4 -Compress
