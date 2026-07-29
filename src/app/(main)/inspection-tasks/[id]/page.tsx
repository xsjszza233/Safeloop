import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { getInspectionManagementTask } from "@/data/inspection-task-data";
import { getInspectionTemplate } from "@/data/inspection-templates";
import { devices } from "@/data/mock-data";
import type { DeviceStatus, InspectionTimeTag, TaskStatus } from "@/types";

function taskStatusVariant(status: TaskStatus) {
  if (status === "已完成") return "green";
  if (status === "已取消") return "slate";
  if (status === "执行中" || status === "已提交") return "blue";
  return "amber";
}

function timeTagVariant(tag: InspectionTimeTag) {
  if (tag === "已逾期") return "red";
  if (tag === "即将到期") return "amber";
  return "green";
}

function deviceStatusVariant(status: DeviceStatus) {
  if (status === "在用") return "green";
  if (status === "维修中") return "amber";
  if (status === "停用") return "blue";
  return "slate";
}

export default async function InspectionTaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = getInspectionManagementTask(id);
  const device = task ? devices.find((item) => item.id === task.deviceId) : undefined;
  const template = task ? getInspectionTemplate(task.templateId) : undefined;

  if (!task || !device || !template) notFound();

  return (
    <>
      <BackButton fallbackHref="/inspection-tasks" label="返回点检任务" />
      <PageHeader title={`点检任务 ${task.taskNumber}`} description={`${task.deviceName} · ${task.templateName}`} />

      <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="任务当前状态"><StatusBadge variant={taskStatusVariant(task.status)}>{task.status}</StatusBadge><StatusBadge variant={timeTagVariant(task.timeTag)}>{task.timeTag}</StatusBadge><span className="text-sm text-slate-500">{task.type}</span></div>

      <div className="space-y-5">
        <div className="grid gap-5 xl:grid-cols-2">
          <Section title="任务基本信息"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label="任务编号" value={task.taskNumber} /><InfoItem label="任务类型" value={task.type} /><InfoItem label="计划日期" value={task.planDate} /><InfoItem label="截止时间" value={task.deadline} /><InfoItem label="执行人员" value={task.assignee} /><div><dt className="text-slate-500">当前状态</dt><dd className="mt-1"><StatusBadge variant={taskStatusVariant(task.status)}>{task.status}</StatusBadge></dd></div><div><dt className="text-slate-500">时间标记</dt><dd className="mt-1"><StatusBadge variant={timeTagVariant(task.timeTag)}>{task.timeTag}</StatusBadge></dd></div></dl></Section>

          <Section title="关联设备信息"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2"><InfoItem label="设备编号" value={device.code} /><InfoItem label="设备名称" value={device.name} /><InfoItem label="设备类别" value={device.category} /><InfoItem label="所属部门" value={device.department} /><InfoItem label="所在位置" value={device.location} /><InfoItem label="设备责任人" value={device.owner} /><div><dt className="text-slate-500">设备状态</dt><dd className="mt-1"><StatusBadge variant={deviceStatusVariant(device.status)}>{device.status}</StatusBadge></dd></div></dl></Section>
        </div>

        <Section title="关联点检模板"><dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3"><InfoItem label="模板编号" value={task.templateCode} /><InfoItem label="模板名称" value={task.templateName} /><InfoItem label="适用设备类别" value={template.category} /><InfoItem label="模板版本" value={`V${template.version}`} /><InfoItem label="检查周期" value={template.cycle} /><InfoItem label="检查项目数量" value={`${template.items.length} 项`} /></dl></Section>

        <Section title="检查项目预览" description="以下内容为任务生成时关联的本地模拟模板项目，仅供查看；本阶段不提供开始点检或提交结果操作。">
          <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[900px] text-left text-sm"><thead className="border-b border-slate-200 text-xs font-medium text-slate-500"><tr><th className="pb-3 pr-4">项目名称</th><th className="pb-3 pr-4">检查内容</th><th className="pb-3 pr-4">检查方法</th><th className="pb-3">判断标准</th></tr></thead><tbody className="divide-y divide-slate-100">{template.items.map((item) => <tr key={item.id}><td className="py-4 pr-4 font-medium text-slate-800">{item.order}. {item.name}</td><td className="py-4 pr-4 leading-6 text-slate-600">{item.content}</td><td className="py-4 pr-4 leading-6 text-slate-600">{item.method}</td><td className="py-4 leading-6 text-slate-600">{item.criterion}</td></tr>)}</tbody></table></div>
          <div className="space-y-3 md:hidden">{template.items.map((item) => <article key={item.id} className="rounded-lg border border-slate-200 p-4"><p className="font-semibold text-slate-800">{item.order}. {item.name}</p><DetailLine label="检查内容" value={item.content} /><DetailLine label="检查方法" value={item.method} /><DetailLine label="判断标准" value={item.criterion} /></article>)}</div>
        </Section>
      </div>
    </>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><h2 className="text-base font-bold text-slate-900">{title}</h2>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}<div className="mt-5">{children}</div></section>;
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-slate-500">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>;
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return <div className="mt-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm leading-6 text-slate-700">{value}</p></div>;
}
