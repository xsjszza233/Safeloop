"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getDeviceByQrCode, scannableDeviceQrMappings } from "@/data/device-qr-data";
import { inspectionTasks } from "@/data/mock-data";
import type { Device } from "@/types";

export function DeviceQrScanEntry() {
  const [device, setDevice] = useState<Device | null>(null);

  function scan() {
    const mapping = scannableDeviceQrMappings[Math.floor(Math.random() * scannableDeviceQrMappings.length)];
    setDevice(getDeviceByQrCode(mapping.qrCode) ?? null);
  }

  return <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="grid h-32 place-items-center rounded-xl bg-emerald-50 text-5xl text-[#167864]">⌘</div><h2 className="mt-5 font-bold">模拟设备二维码扫描</h2><p className="mt-2 text-sm leading-6 text-slate-500">本阶段不调用摄像头或真实二维码识别能力。点击按钮后，将从已有关联点检任务的设备二维码映射中模拟返回一台设备。</p><button type="button" onClick={scan} className="mt-5 min-h-11 rounded-lg bg-[#167864] px-4 text-sm font-semibold text-white hover:bg-[#116653]">开始扫描</button>{device && <section className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-medium text-emerald-700">扫描成功（演示）</p><h3 className="mt-1 font-bold text-slate-900">{device.name}</h3><p className="mt-1 text-sm text-slate-600">设备编号：{device.code}</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700">{device.category}</span></div><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-slate-500">所属区域</dt><dd className="mt-1 font-medium text-slate-800">{device.location}</dd></div><div><dt className="text-slate-500">责任人</dt><dd className="mt-1 font-medium text-slate-800">{device.owner}</dd></div></dl><Link href={`/devices/${device.id}`} className="mt-5 inline-flex min-h-11 items-center rounded-lg border border-emerald-700 px-4 text-sm font-semibold text-emerald-800 no-underline hover:bg-emerald-100">查看设备详情</Link></section>}</div>;
}

export function ScanEntry() { const [value, setValue] = useState(""); const router = useRouter(); const task = inspectionTasks.find((item) => item.id.toLowerCase() === value.toLowerCase()); return <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="grid h-32 place-items-center rounded-xl bg-emerald-50 text-5xl text-[#167864]">⌘</div><h2 className="mt-5 font-bold">模拟扫码识别</h2><p className="mt-2 text-sm text-slate-500">二维码能力尚未接入。可输入演示任务编号，例如 IT-2026-071，进入移动点检录入页。</p><div className="mt-5 flex gap-2"><input value={value} onChange={(event) => setValue(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-3 text-sm" placeholder="输入点检任务编号" /><button onClick={() => task && router.push(`/inspection-tasks/${task.id}/check`)} type="button" className="rounded-lg bg-[#167864] px-4 text-sm font-semibold text-white disabled:bg-slate-300" disabled={!task}>进入</button></div>{value && !task && <p className="mt-2 text-xs text-rose-600">未找到该演示点检任务。</p>}</div>; }
