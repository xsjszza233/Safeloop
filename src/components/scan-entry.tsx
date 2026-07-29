"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { inspectionTasks } from "@/data/mock-data";

export function ScanEntry() { const [value, setValue] = useState(""); const router = useRouter(); const task = inspectionTasks.find((item) => item.id.toLowerCase() === value.toLowerCase()); return <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="grid h-32 place-items-center rounded-xl bg-emerald-50 text-5xl text-[#167864]">⌘</div><h2 className="mt-5 font-bold">模拟扫码识别</h2><p className="mt-2 text-sm text-slate-500">二维码能力尚未接入。可输入演示任务编号，例如 IT-2026-071，进入移动点检录入页。</p><div className="mt-5 flex gap-2"><input value={value} onChange={(event) => setValue(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-3 text-sm" placeholder="输入点检任务编号" /><button onClick={() => task && router.push(`/inspection-tasks/${task.id}/check`)} type="button" className="rounded-lg bg-[#167864] px-4 text-sm font-semibold text-white disabled:bg-slate-300" disabled={!task}>进入</button></div>{value && !task && <p className="mt-2 text-xs text-rose-600">未找到该演示点检任务。</p>}</div>; }
