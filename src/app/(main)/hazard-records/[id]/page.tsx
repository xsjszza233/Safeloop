import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
import { HazardClosurePanel } from "@/components/hazard-closure-panel";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { getAbnormalRecord } from "@/data/abnormal-record-data";
import { getHazardRecord } from "@/data/hazard-record-data";
import { getRectificationRecords, getReviewRecords } from "@/data/rectification-review-data";
import type { HazardRecordStatus } from "@/types";

function levelVariant(level: "低" | "中" | "高") {
  if (level === "高") return "red";
  if (level === "中") return "amber";
  return "green";
}

function statusVariant(status: HazardRecordStatus) {
  if (status === "已关闭") return "green";
  if (status === "待复查") return "violet";
  if (status === "整改中") return "blue";
  return "amber";
}

export default async function HazardRecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hazard = getHazardRecord(id);
  const abnormal = hazard ? getAbnormalRecord(hazard.sourceAbnormalId) : undefined;

  if (!hazard || !abnormal) notFound();

  const rectifications = getRectificationRecords(hazard.id);
  const reviews = getReviewRecords(hazard.id);

  return (
    <>
      <BackButton fallbackHref="/hazard-records" label="返回隐患列表" />
      <PageHeader title={`隐患记录 ${hazard.hazardNumber}`} description={`${hazard.deviceName} · 来源 ${hazard.sourceAbnormalNumber}`} />
      <div className="mb-5 flex flex-wrap items-center gap-2"><StatusBadge variant={statusVariant(hazard.status)}>{hazard.status}</StatusBadge><span className="text-sm text-slate-500">隐患等级</span><StatusBadge variant={levelVariant(hazard.level)}>{hazard.level}</StatusBadge></div>

      <div className="space-y-5">
        <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">该隐患由 EHS 对来源异常确认后形成。异常记录保留现场事实，隐患记录用于后续整改闭环。</section>

        <Section title="来源追溯"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label="来源异常编号" value={hazard.sourceAbnormalNumber} /><InfoItem label="来源类型" value={hazard.sourceType} /><InfoItem label="异常描述" value={abnormal.description} wide /><InfoItem label="发现时间" value={abnormal.foundAt} /></dl><Link href={`/abnormal-records/${abnormal.id}`} className="mt-5 inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50">返回异常详情</Link></Section>

        <Section title="关联设备"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3"><InfoItem label="设备编号" value={hazard.deviceCode} /><InfoItem label="设备名称" value={hazard.deviceName} /><InfoItem label="设备类别" value={hazard.deviceCategory} /><InfoItem label="所在区域" value={hazard.area} /><InfoItem label="具体位置" value={hazard.specificLocation} /></dl><Link href={`/devices/${hazard.deviceId}`} className="mt-5 inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50">查看设备详情</Link></Section>

        <Section title="确认信息"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label="确认人员" value={hazard.confirmedBy} /><InfoItem label="确认时间" value={hazard.confirmedAt} /><InfoItem label="确认意见" value={hazard.confirmationOpinion} wide /></dl></Section>

        <Section title="整改信息"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label="整改责任人" value={hazard.rectificationOwner} /><InfoItem label="整改期限" value={hazard.rectificationDeadline} /><div><dt className="text-slate-500">当前状态</dt><dd className="mt-1"><StatusBadge variant={statusVariant(hazard.status)}>{hazard.status}</StatusBadge></dd></div><InfoItem label="整改措施" value={hazard.rectificationMeasure} wide /></dl></Section>

        <HazardClosurePanel hazard={hazard} rectifications={rectifications} reviews={reviews} />

        {hazard.status === "已关闭" && <Section title="关闭信息"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label="复查人员" value={hazard.reviewer ?? "—"} /><InfoItem label="复查时间" value={hazard.reviewedAt ?? "—"} /><InfoItem label="复查意见" value={hazard.reviewOpinion ?? "—"} wide /></dl></Section>}
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><h2 className="text-base font-bold text-slate-900">{title}</h2><div className="mt-5">{children}</div></section>;
}

function InfoItem({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={wide ? "sm:col-span-2" : ""}><dt className="text-slate-500">{label}</dt><dd className="mt-1 break-words font-medium leading-6 text-slate-800">{value}</dd></div>;
}
