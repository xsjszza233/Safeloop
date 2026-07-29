"use client";

import Link from "next/link";
import { useState } from "react";
import type { InspectionTask } from "@/types";

export function InspectionForm({ task }: { task: InspectionTask }) {
  const [submitted, setSubmitted] = useState(false);
  return <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="mx-auto max-w-2xl space-y-4">
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs text-slate-400">{task.id} · 截止 {task.deadline}</p><h2 className="mt-1 text-lg font-bold">{task.device} · 点检记录</h2><p className="mt-2 text-sm text-slate-500">请逐项选择现场检查结果；发现问题时应提交异常，不能直接创建隐患。</p></section>
    {["安全防护装置完好", "急停与联锁功能正常", "设备运行无异常声响"].map((item, index) => <fieldset key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><legend className="font-medium text-slate-800">{index + 1}. {item}</legend><div className="mt-4 grid grid-cols-2 gap-3"><label className="cursor-pointer rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-sm text-emerald-700"><input required defaultChecked={index !== 1} className="mr-2" type="radio" name={`item-${index}`} value="正常" />正常</label><label className="cursor-pointer rounded-lg border border-amber-200 bg-amber-50 p-3 text-center text-sm text-amber-700"><input required className="mr-2" type="radio" name={`item-${index}`} value="异常" />发现异常</label></div></fieldset>)}
    <textarea className="min-h-28 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-emerald-500" placeholder="点检记录说明（选填）" />
    {submitted && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">已模拟提交点检记录。此演示不会写入数据库。</p>}
    <div className="flex flex-col gap-3 sm:flex-row"><button className="rounded-lg bg-[#167864] px-5 py-3 text-sm font-semibold text-white hover:bg-[#116653]" type="submit">提交点检记录</button><Link className="rounded-lg border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-600" href="/anomalies/new">提交异常</Link></div>
  </form>;
}
