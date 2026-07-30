"use client";

import { useState } from "react";

import { StatusBadge } from "@/components/status-badge";
import type { HazardRecord, RectificationRecord } from "@/types";

export function HazardReviewForm({ hazard, rectifications }: { hazard: HazardRecord; rectifications: RectificationRecord[] }) {
  const [result, setResult] = useState<"通过" | "不通过">("通过");
  const [opinion, setOpinion] = useState("");
  const [submittedStatus, setSubmittedStatus] = useState<"已关闭" | "整改中" | null>(null);
  const [error, setError] = useState("");

  function submitReview() {
    if (!opinion.trim()) {
      setError("请填写复查意见后再提交。");
      return;
    }
    setError("");
    setSubmittedStatus(result === "通过" ? "已关闭" : "整改中");
  }

  const currentStatus = submittedStatus ?? hazard.status;

  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-base font-bold text-slate-900">提交 EHS 复查</h2><p className="mt-1 text-sm text-slate-500">复查人员：陈小安（EHS Coordinator，演示）</p></div><StatusBadge variant={currentStatus === "已关闭" ? "green" : currentStatus === "整改中" ? "blue" : "violet"}>{currentStatus}</StatusBadge></div>
    <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-600"><p>整改责任人：<span className="font-medium text-slate-800">{hazard.rectificationOwner}</span></p><p className="mt-2">已关联整改记录：{rectifications.length} 条</p></div>
    <fieldset disabled={submittedStatus !== null} className="mt-5 space-y-4"><legend className="text-sm font-medium text-slate-700">复查结果</legend><div className="flex flex-wrap gap-3"><label className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-4 text-sm ${result === "通过" ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-slate-200"}`}><input type="radio" name="review-result" value="通过" checked={result === "通过"} onChange={() => setResult("通过")} />通过</label><label className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-4 text-sm ${result === "不通过" ? "border-rose-400 bg-rose-50 text-rose-800" : "border-slate-200"}`}><input type="radio" name="review-result" value="不通过" checked={result === "不通过"} onChange={() => setResult("不通过")} />不通过</label></div><label className="block"><span className="text-sm font-medium text-slate-700">复查意见</span><textarea value={opinion} onChange={(event) => setOpinion(event.target.value)} rows={4} placeholder="填写现场复查结论和后续要求" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-emerald-500 focus:ring-2" /></label></fieldset>
    {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
    {submittedStatus ? <p className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">复查提交成功（演示）。当前页面状态已更新为“{submittedStatus}”，不会写入数据库或修改列表数据。</p> : <button type="button" onClick={submitReview} className="mt-5 min-h-11 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800">提交复查</button>}
  </section>;
}
