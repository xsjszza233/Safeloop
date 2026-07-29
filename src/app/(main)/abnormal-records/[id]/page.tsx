import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { getAbnormalRecord } from "@/data/abnormal-record-data";
import { getInspectionManagementTask } from "@/data/inspection-task-data";
import { devices } from "@/data/mock-data";
import type { AbnormalRecordStatus } from "@/types";

function statusVariant(status: AbnormalRecordStatus) {
  if (status === "已确认隐患") return "violet";
  if (status === "待确认") return "amber";
  if (status === "一般异常") return "blue";
  return "slate";
}

function levelVariant(level: "低" | "中" | "高") {
  if (level === "高") return "red";
  if (level === "中") return "amber";
  return "green";
}

export default async function AbnormalRecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = getAbnormalRecord(id);
  const device = record ? devices.find((item) => item.id === record.deviceId) : undefined;
  const task = record?.taskId ? getInspectionManagementTask(record.taskId) : undefined;

  if (!record || !device) notFound();

  return (
    <>
      <BackButton fallbackHref="/abnormal-records" label="返回异常列表" />
      <PageHeader title={`异常记录 ${record.abnormalNumber}`} description={`${record.deviceName} · ${record.sourceType}`} />

      <div className="mb-5 flex flex-wrap items-center gap-2"><StatusBadge variant={statusVariant(record.status)}>{record.status}</StatusBadge><span className="text-sm text-slate-500">建议等级</span><StatusBadge variant={levelVariant(record.suggestedLevel)}>{record.suggestedLevel}</StatusBadge><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{record.sourceType}</span></div>

      <div className="space-y-5">
        <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900">异常经 EHS 确认后才可形成隐患。异常记录反映现场发现的问题，异常不等于隐患。</section>

        <Section title="异常基本信息"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label="异常描述" value={record.description} wide /><InfoItem label="发现人员" value={record.finder} /><InfoItem label="发现时间" value={record.foundAt} /><InfoItem label="提交时间" value={record.submittedAt} /><div className="sm:col-span-2"><dt className="text-slate-500">模拟附件</dt><dd className="mt-2">{record.attachments.length > 0 ? <ul className="space-y-2">{record.attachments.map((attachment) => <li key={attachment} className="inline-flex max-w-full rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">▧ {attachment}</li>)}</ul> : <p className="text-sm text-slate-500">无模拟附件。</p>}</dd></div></dl></Section>

        <Section title="关联设备"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><InfoItem label="设备编号" value={record.deviceCode} /><InfoItem label="设备名称" value={record.deviceName} /><InfoItem label="设备类别" value={record.deviceCategory} /><InfoItem label="所在区域" value={record.area} /><InfoItem label="具体位置" value={record.specificLocation} /><InfoItem label="设备责任人" value={device.owner} /></div><Link href={`/devices/${record.deviceId}`} className="mt-5 inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50">查看设备详情</Link></Section>

        <Section title="点检来源">{record.sourceType === "主动上报" ? <EmptyState text="该异常为主动上报，无关联点检任务。" /> : <div className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label="点检任务编号" value={record.taskNumber ?? "—"} /><InfoItem label="点检记录编号" value={record.inspectionRecordNumber ?? "—"} /><InfoItem label="检查项目名称" value={record.inspectionItemName ?? "—"} />{task ? <div className="sm:col-span-2"><Link href={`/inspection-tasks/${task.id}`} className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50">查看点检任务详情</Link></div> : <div className="sm:col-span-2"><EmptyState text="关联点检任务模拟数据暂不可用。" /></div>}</div>}</Section>

        <Section title="EHS 审核结果"><ReviewResult status={record.status} opinion={record.reviewOpinion} reviewer={record.reviewer} reviewedAt={record.reviewedAt} hazardNumber={record.hazardNumber} /></Section>
      </div>
    </>
  );
}

function ReviewResult({ status, opinion, reviewer, reviewedAt, hazardNumber }: { status: AbnormalRecordStatus; opinion?: string; reviewer?: string; reviewedAt?: string; hazardNumber?: string }) {
  if (status === "待确认") return <EmptyState text="等待 EHS 审核" />;

  const title = status === "已确认隐患" ? "已确认形成隐患" : status === "一般异常" ? "已判定为一般异常" : "已驳回";
  const opinionLabel = status === "已驳回" ? "驳回原因" : "审核意见";
  return <div className="rounded-lg border border-slate-200 p-4"><p className="font-semibold text-slate-900">{title}</p><dl className="mt-4 grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label={opinionLabel} value={opinion ?? "—"} wide /><InfoItem label="审核人" value={reviewer ?? "—"} /><InfoItem label="审核时间" value={reviewedAt ?? "—"} />{status === "已确认隐患" && <InfoItem label="关联隐患编号" value={hazardNumber ?? "—"} />}</dl></div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><h2 className="text-base font-bold text-slate-900">{title}</h2><div className="mt-5">{children}</div></section>;
}

function InfoItem({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={wide ? "sm:col-span-2" : ""}><dt className="text-slate-500">{label}</dt><dd className="mt-1 break-words font-medium leading-6 text-slate-800">{value}</dd></div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">{text}</div>;
}
