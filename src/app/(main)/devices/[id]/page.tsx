import { notFound } from "next/navigation";
import Link from "next/link";

import { BackButton } from "@/components/back-button";
import { DeviceDemoActions } from "@/components/device-demo-actions";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { getDeviceDetailData } from "@/data/device-detail-data";
import { inspectionManagementTasks } from "@/data/inspection-task-data";
import { devices } from "@/data/mock-data";
import type { DeviceStatus, InspectionTimeTag } from "@/types";

function deviceStatusVariant(status: DeviceStatus) {
  if (status === "在用") return "green";
  if (status === "维修中") return "amber";
  if (status === "停用") return "blue";
  return "slate";
}

function riskVariant(risk: "低" | "中" | "高") {
  if (risk === "高") return "red";
  if (risk === "中") return "amber";
  return "green";
}

function timeTagVariant(tag: InspectionTimeTag) {
  if (tag === "已逾期") return "red";
  if (tag === "即将到期") return "amber";
  return "green";
}

function anomalyVariant(status: "待确认" | "一般异常" | "已确认隐患") {
  if (status === "已确认隐患") return "violet";
  if (status === "待确认") return "amber";
  return "blue";
}

function hazardVariant(status: "待整改" | "整改中" | "待复查" | "已关闭") {
  if (status === "待复查") return "violet";
  if (status === "整改中") return "amber";
  if (status === "已关闭") return "green";
  return "blue";
}

export default async function DeviceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const device = devices.find((item) => item.id === id);

  if (!device) notFound();

  const detail = getDeviceDetailData(device);
  const inspectionTask = inspectionManagementTasks.find((task) => task.deviceId === device.id && task.status !== "已取消") ?? inspectionManagementTasks.find((task) => task.deviceId === device.id);

  return (
    <>
      <BackButton fallbackHref="/devices" label="返回设备台账" />
      <PageHeader title={device.name} description={`设备编号：${device.code}`} />

      <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="设备当前状态">
        <StatusBadge variant={deviceStatusVariant(device.status)}>{device.status}</StatusBadge>
        <span className="text-sm text-slate-500">设备风险等级</span>
        <StatusBadge variant={riskVariant(device.riskLevel)}>{device.riskLevel}</StatusBadge>
      </div>

      {inspectionTask && <Link href={`/inspection-tasks/${inspectionTask.id}/execute`} className="mb-5 inline-flex min-h-11 items-center rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white no-underline hover:bg-emerald-800">开始点检</Link>}

      <div className="space-y-5">
        <DeviceDemoActions />

        <div className="grid gap-5 xl:grid-cols-2">
          <Section title="基本信息">
            <dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2">
              <InfoItem label="设备类别" value={device.category} />
              <InfoItem label="所属部门" value={device.department} />
              <InfoItem label="所在区域" value={detail.area} />
              <InfoItem label="具体位置" value={detail.specificLocation} />
              <InfoItem label="责任人" value={device.owner} />
              <InfoItem label="投用日期" value={detail.commissionedAt} />
              <InfoItem label="设备说明" value={detail.description} wide />
            </dl>
          </Section>

          <Section title="点检设置">
            <dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2">
              <InfoItem label="类别默认周期" value={detail.defaultCycle} />
              <InfoItem label="当前实际周期" value={detail.actualCycle} />
              <InfoItem label="关联点检模板" value={detail.template} wide />
              <InfoItem label="上次点检日期" value={detail.lastInspectionDate} />
              <InfoItem label="下次点检日期" value={device.nextInspectionDate} />
              <div><dt className="text-slate-500">当前时间标记</dt><dd className="mt-1"><StatusBadge variant={timeTagVariant(device.inspectionTag)}>{device.inspectionTag}</StatusBadge></dd></div>
            </dl>
          </Section>
        </div>

        <Section title="最近点检记录" description="展示该设备最近 5 条本地模拟点检记录。">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-slate-200 text-xs text-slate-500"><tr><th className="pb-3 font-medium">记录编号</th><th className="pb-3 font-medium">执行人</th><th className="pb-3 font-medium">实际点检日期</th><th className="pb-3 font-medium">结果</th><th className="pb-3 font-medium">时间标记</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {detail.inspectionRecords.map((record) => <tr key={record.id}><td className="py-3 font-medium text-slate-800">{record.id}</td><td className="py-3 text-slate-600">{record.inspector}</td><td className="py-3 text-slate-600">{record.inspectedAt}</td><td className="py-3"><StatusBadge variant={record.result === "发现异常" ? "amber" : "green"}>{record.result}</StatusBadge></td><td className="py-3"><StatusBadge variant={timeTagVariant(record.timeTag)}>{record.timeTag}</StatusBadge></td></tr>)}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="grid gap-5 xl:grid-cols-2">
          <Section title="相关异常" description="检查人员提交的是异常；只有经 EHS 确认后才会形成隐患。">
            {detail.anomalies.length === 0 ? <EmptyState text="该设备暂无相关异常记录。" /> : <div className="space-y-3">{detail.anomalies.map((record) => <div key={record.id} className="rounded-lg border border-slate-200 p-3"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-medium text-slate-800">{record.title}</p><p className="mt-1 text-xs text-slate-500">{record.id} · {record.reportedAt} · {record.reporter}</p></div><StatusBadge variant={anomalyVariant(record.status)}>{record.status}</StatusBadge></div></div>)}</div>}
          </Section>

          <Section title="相关隐患" description="仅展示经 EHS 管理员确认后形成的隐患记录。">
            {detail.hazards.length === 0 ? <EmptyState text="该设备暂无经确认形成的隐患记录。" /> : <div className="space-y-3">{detail.hazards.map((record) => <div key={record.id} className="rounded-lg border border-slate-200 p-3"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-medium text-slate-800">{record.title}</p><p className="mt-1 text-xs text-slate-500">{record.id} · 隐患风险等级：{record.level}</p></div><StatusBadge variant={hazardVariant(record.status)}>{record.status}</StatusBadge></div></div>)}</div>}
          </Section>
        </div>

        <Section title="操作记录" description="以下内容为设备台账的本地模拟操作记录。">
          <ol className="space-y-4 border-l border-slate-200 pl-4">
            {detail.operations.map((record) => <li key={`${record.time}-${record.summary}`} className="relative"><span className="absolute -left-[21px] top-1.5 size-2.5 rounded-full bg-emerald-600" /><p className="text-sm font-medium text-slate-800">{record.summary}</p><p className="mt-1 text-xs text-slate-500">{record.time} · {record.operator}</p></li>)}
          </ol>
        </Section>
      </div>
    </>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><h2 className="text-base font-bold text-slate-900">{title}</h2>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}<div className="mt-5">{children}</div></section>;
}

function InfoItem({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={wide ? "sm:col-span-2" : ""}><dt className="text-slate-500">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>;
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">{text}</div>;
}
