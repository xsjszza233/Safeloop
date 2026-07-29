"use client";

import { useState } from "react";
import { devices } from "@/data/mock-data";

export function AnomalyReportForm() {
  const [saved, setSaved] = useState(false);
  return <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="mx-auto max-w-2xl space-y-4"><label className="block text-sm font-medium">关联设备<select required className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-3"><option value="">请选择设备</option>{devices.map((device) => <option key={device.id}>{device.name}</option>)}</select></label><label className="block text-sm font-medium">异常描述<textarea required className="mt-2 min-h-32 w-full rounded-lg border border-slate-200 p-3" placeholder="描述发现的现场异常" /></label><label className="block text-sm font-medium">现场位置<input required className="mt-2 w-full rounded-lg border border-slate-200 p-3" placeholder="例如：A区 1号车间" /></label><p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700">提交后状态为“待确认”，仅 EHS 管理员可以确认其是否形成隐患。</p>{saved && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">已模拟提交异常，当前页面不保存真实数据。</p>}<button className="rounded-lg bg-[#167864] px-5 py-3 text-sm font-semibold text-white" type="submit">提交异常</button></form>;
}
