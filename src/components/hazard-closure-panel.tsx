"use client";

import { useState } from "react";

import { StatusBadge } from "@/components/status-badge";
import type { HazardRecord, HazardRecordStatus, RectificationRecord, ReviewRecord } from "@/types";

function statusVariant(status: HazardRecordStatus) {
  if (status === "已关闭") return "green";
  if (status === "待复查") return "violet";
  if (status === "整改中") return "blue";
  return "amber";
}

function resultVariant(result: string) {
  if (result === "通过" || result === "已完成") return "green";
  if (result === "驳回整改") return "red";
  if (result === "已提交") return "violet";
  return "blue";
}

export function HazardClosurePanel({
  hazard,
  rectifications,
  reviews,
}: {
  hazard: HazardRecord;
  rectifications: RectificationRecord[];
  reviews: ReviewRecord[];
}) {
  const [status, setStatus] = useState<HazardRecordStatus>(hazard.status);
  const [demoRectification, setDemoRectification] = useState<RectificationRecord | null>(null);
  const [demoReview, setDemoReview] = useState<ReviewRecord | null>(null);
  const allRectifications = demoRectification ? [...rectifications, demoRectification] : rectifications;
  const allReviews = demoReview ? [...reviews, demoReview] : reviews;

  function submitRectification() {
    setDemoRectification({
      id: "RC-DEMO",
      hazardId: hazard.id,
      rectificationOwner: hazard.rectificationOwner,
      measure: "演示整改措施：已完成现场处理并提交复查。",
      description: "本条记录仅用于前端演示，不会保存到本地数据。",
      submittedAt: "刚刚（演示）",
      attachments: ["整改现场照片（演示）"],
      result: "已提交",
    });
    setStatus("待复查");
  }

  function review(result: "通过" | "驳回整改") {
    const passed = result === "通过";
    setDemoReview({
      id: "RV-DEMO",
      hazardId: hazard.id,
      reviewer: "陈小安（EHS管理员）",
      reviewedAt: "刚刚（演示）",
      result,
      opinion: passed ? "演示复查通过：整改措施满足关闭条件。" : "演示复查驳回：请补充整改措施后再次提交。",
    });
    setStatus(passed ? "已关闭" : "整改中");
  }

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-base font-bold text-slate-900">整改记录</h2><p className="mt-1 text-sm text-slate-500">关联隐患：{hazard.hazardNumber}</p></div><StatusBadge variant={statusVariant(status)}>{status}</StatusBadge></div>
        {allRectifications.length === 0 ? <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">暂无整改记录，等待整改责任人提交。</p> : <div className="mt-5 space-y-3">{allRectifications.map((record) => <article key={record.id} className="rounded-lg border border-slate-200 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold text-slate-800">{record.rectificationOwner}</p><p className="mt-1 text-xs text-slate-500">{record.id} · {record.submittedAt}</p></div><StatusBadge variant={resultVariant(record.result)}>{record.result}</StatusBadge></div><dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><Item label="整改措施" value={record.measure} /><Item label="整改说明" value={record.description} /><Item label="模拟附件" value={record.attachments.length ? record.attachments.join("、") : "无"} wide /></dl></article>)}</div>}
        {status === "待整改" && <div className="mt-5"><button type="button" onClick={submitRectification} className="min-h-11 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800">提交整改</button><p className="mt-2 text-xs text-slate-500">点击后仅模拟提交成功，并将当前页面状态切换为“待复查”。</p></div>}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-base font-bold text-slate-900">EHS 复查</h2><p className="mt-1 text-sm text-slate-500">复查人员为模拟 EHS管理员。</p></div><StatusBadge variant={statusVariant(status)}>{status}</StatusBadge></div>
        {allReviews.length === 0 ? <p className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">暂无复查记录。{status === "待复查" ? "可进行演示复查。" : ""}</p> : <div className="mt-5 space-y-3">{allReviews.map((record) => <article key={record.id} className="rounded-lg border border-slate-200 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold text-slate-800">{record.reviewer}</p><p className="mt-1 text-xs text-slate-500">{record.id} · {record.reviewedAt}</p></div><StatusBadge variant={resultVariant(record.result)}>{record.result}</StatusBadge></div><p className="mt-4 text-sm leading-6 text-slate-700">{record.opinion}</p></article>)}</div>}
        {status === "待复查" && <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => review("通过")} className="min-h-11 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800">通过复查</button><button type="button" onClick={() => review("驳回整改")} className="min-h-11 rounded-lg border border-rose-200 px-4 text-sm font-semibold text-rose-700 hover:bg-rose-50">驳回整改</button></div>}
        {demoReview && <p className="mt-3 text-xs text-slate-500">本次复查为前端演示，不会写入隐患主数据。</p>}
      </section>
    </div>
  );
}

function Item({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={wide ? "sm:col-span-2" : ""}><p className="text-slate-500">{label}</p><p className="mt-1 break-words leading-6 text-slate-800">{value}</p></div>;
}
