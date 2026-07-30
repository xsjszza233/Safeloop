import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
import { HazardReviewForm } from "@/components/hazard-review-form";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { getHazardRecord } from "@/data/hazard-record-data";
import { getRectificationRecords } from "@/data/rectification-review-data";

export default async function HazardReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hazard = getHazardRecord(id);
  if (!hazard) notFound();

  const rectifications = getRectificationRecords(hazard.id);

  return <>
    <BackButton fallbackHref={`/hazard-records/${hazard.id}`} label="返回隐患详情" />
    <PageHeader title={`EHS 复查 · ${hazard.hazardNumber}`} description="根据整改记录进行现场复查；本页仅演示结果提交，不会写入数据库。" />
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm text-slate-500">关联隐患</p><h2 className="mt-1 text-lg font-bold text-slate-900">{hazard.deviceName}</h2><p className="mt-2 text-sm leading-6 text-slate-700">{hazard.description}</p></div><StatusBadge variant="violet">{hazard.status}</StatusBadge></div><dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2"><Item label="整改责任人" value={hazard.rectificationOwner} /><Item label="整改期限" value={hazard.rectificationDeadline} /><Item label="整改措施" value={hazard.rectificationMeasure} wide /></dl></section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><h2 className="text-base font-bold text-slate-900">整改记录</h2>{rectifications.length === 0 ? <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">暂无模拟整改记录。</p> : <div className="mt-4 space-y-3">{rectifications.map((record) => <article key={record.id} className="rounded-lg border border-slate-200 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold text-slate-800">{record.rectificationOwner}</p><p className="mt-1 text-xs text-slate-500">{record.submittedAt} · {record.result}</p></div><StatusBadge variant={record.result === "整改中" ? "blue" : "violet"}>{record.result}</StatusBadge></div><p className="mt-3 text-sm leading-6 text-slate-700">{record.measure}</p><p className="mt-2 text-sm leading-6 text-slate-600">{record.description}</p><p className="mt-2 text-xs text-slate-500">模拟附件：{record.attachments.length ? record.attachments.join("、") : "无"}</p></article>)}</div>}</section>

      <HazardReviewForm hazard={hazard} rectifications={rectifications} />
    </div>
  </>;
}

function Item({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={wide ? "sm:col-span-2" : ""}><dt className="text-slate-500">{label}</dt><dd className="mt-1 break-words font-medium leading-6 text-slate-800">{value}</dd></div>;
}
