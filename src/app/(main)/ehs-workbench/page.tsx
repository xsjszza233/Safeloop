import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { abnormalRecords } from "@/data/abnormal-record-data";
import { hazardRecords } from "@/data/hazard-record-data";

export default function EhsWorkbenchPage() {
  const pendingAbnormalRecords = abnormalRecords.filter((record) => record.status === "待确认");
  const pendingRectificationHazards = hazardRecords.filter((record) => record.status === "待整改");
  const pendingReviewHazards = hazardRecords.filter((record) => record.status === "待复查");

  return (
    <>
      <PageHeader title="EHS 工作台" description="集中查看待审核异常、待整改隐患和待复查隐患；当前数据均为本地模拟数据。" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="待审核异常" value={pendingAbnormalRecords.length} href="#pending-abnormal" tone="amber" />
        <Metric label="待整改隐患" value={pendingRectificationHazards.length} href="#pending-rectification" tone="blue" />
        <Metric label="待复查隐患" value={pendingReviewHazards.length} href="#pending-review" tone="violet" />
      </div>

      <div className="mt-6 space-y-5">
        <section id="pending-abnormal" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><SectionTitle title="待审核异常" count={pendingAbnormalRecords.length} /><div className="mt-4 space-y-3">{pendingAbnormalRecords.length === 0 ? <Empty text="暂无待审核异常。" /> : pendingAbnormalRecords.map((record) => <Link key={record.id} href={`/abnormal-records/${record.id}`} className="block rounded-lg border border-slate-200 p-4 no-underline transition hover:border-amber-300 hover:bg-amber-50/30"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="font-semibold text-slate-800">{record.abnormalNumber} · {record.deviceName}</p><p className="mt-1 text-sm leading-6 text-slate-600">{record.description}</p><p className="mt-2 text-xs text-slate-500">发现人：{record.finder} · {record.foundAt}</p></div><StatusBadge variant="amber">待确认</StatusBadge></div></Link>)}</div></section>

        <section id="pending-rectification" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><SectionTitle title="待整改隐患" count={pendingRectificationHazards.length} /><div className="mt-4 space-y-3">{pendingRectificationHazards.length === 0 ? <Empty text="暂无待整改隐患。" /> : pendingRectificationHazards.map((record) => <Link key={record.id} href={`/hazard-records/${record.id}`} className="block rounded-lg border border-slate-200 p-4 no-underline transition hover:border-blue-300 hover:bg-blue-50/30"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="font-semibold text-slate-800">{record.hazardNumber} · {record.deviceName}</p><p className="mt-1 text-sm leading-6 text-slate-600">{record.description}</p><p className="mt-2 text-xs text-slate-500">整改责任人：{record.rectificationOwner} · 期限：{record.rectificationDeadline}</p></div><StatusBadge variant="amber">待整改</StatusBadge></div></Link>)}</div></section>

        <section id="pending-review" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><SectionTitle title="待复查隐患" count={pendingReviewHazards.length} /><div className="mt-4 space-y-3">{pendingReviewHazards.length === 0 ? <Empty text="暂无待复查隐患。" /> : pendingReviewHazards.map((record) => <Link key={record.id} href={`/hazard-records/${record.id}/review`} className="block rounded-lg border border-violet-200 bg-violet-50/30 p-4 no-underline transition hover:border-violet-400 hover:bg-violet-50"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="font-semibold text-slate-800">{record.hazardNumber} · {record.deviceName}</p><p className="mt-1 text-sm leading-6 text-slate-600">{record.description}</p><p className="mt-2 text-xs text-slate-500">整改责任人：{record.rectificationOwner} · 整改期限：{record.rectificationDeadline}</p></div><div className="flex items-center gap-3"><StatusBadge variant="violet">待复查</StatusBadge><span className="text-sm font-semibold text-violet-700">进入复查 →</span></div></div></Link>)}</div></section>
      </div>
    </>
  );
}

function Metric({ label, value, href, tone }: { label: string; value: number; href: string; tone: "amber" | "blue" | "violet" }) {
  const toneClass = { amber: "border-amber-200 bg-amber-50 text-amber-700", blue: "border-blue-200 bg-blue-50 text-blue-700", violet: "border-violet-200 bg-violet-50 text-violet-700" }[tone];
  return <a href={href} className={`rounded-xl border p-4 no-underline shadow-sm ${toneClass}`}><p className="text-sm font-medium">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p><p className="mt-1 text-xs">查看待办列表</p></a>;
}

function SectionTitle({ title, count }: { title: string; count: number }) {
  return <div className="flex items-center justify-between gap-3"><h2 className="text-base font-bold text-slate-900">{title}</h2><span className="text-sm text-slate-500">共 {count} 项</span></div>;
}

function Empty({ text }: { text: string }) {
  return <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">{text}</p>;
}
