import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { abnormalRecords } from "@/data/abnormal-record-data";
import { hazardRecords } from "@/data/hazard-record-data";
import { inspectionManagementTasks } from "@/data/inspection-task-data";
import { devices } from "@/data/mock-data";
import { rectificationRecords, reviewRecords } from "@/data/rectification-review-data";

const demoToday = "2026-07-30";
const deviceStatuses = ["在用", "停用", "维修中", "报废"] as const;
const riskLevels = ["低", "中", "高"] as const;
const taskStatuses = ["待执行", "执行中", "已提交", "已完成", "已取消"] as const;
const abnormalStatuses = ["待确认", "已确认隐患", "一般异常", "已驳回"] as const;
const abnormalSources = ["点检异常", "主动上报"] as const;
const hazardStatuses = ["待整改", "整改中", "待复查", "已关闭"] as const;

function countBy<T extends string>(items: readonly T[], values: readonly { value: T }[]) {
  return items.map((item) => ({ label: item, value: values.filter((value) => value.value === item).length }));
}

function deviceStatusVariant(status: (typeof deviceStatuses)[number]) {
  if (status === "在用") return "green";
  if (status === "维修中") return "amber";
  if (status === "停用") return "blue";
  return "slate";
}

function riskVariant(level: (typeof riskLevels)[number]) {
  if (level === "高") return "red";
  if (level === "中") return "amber";
  return "green";
}

function taskStatusVariant(status: (typeof taskStatuses)[number]) {
  if (status === "已完成") return "green";
  if (status === "已取消") return "slate";
  if (status === "执行中" || status === "已提交") return "blue";
  return "amber";
}

function abnormalStatusVariant(status: (typeof abnormalStatuses)[number]) {
  if (status === "已确认隐患") return "violet";
  if (status === "待确认") return "amber";
  if (status === "一般异常") return "blue";
  return "slate";
}

function hazardStatusVariant(status: (typeof hazardStatuses)[number]) {
  if (status === "已关闭") return "green";
  if (status === "待复查") return "violet";
  if (status === "整改中") return "blue";
  return "amber";
}

export function EhsDashboard() {
  const deviceStatusData = countBy(deviceStatuses, devices.map((device) => ({ value: device.status })));
  const deviceRiskData = countBy(riskLevels, devices.map((device) => ({ value: device.riskLevel })));
  const taskStatusData = countBy(taskStatuses, inspectionManagementTasks.map((task) => ({ value: task.status })));
  const abnormalSourceData = countBy(abnormalSources, abnormalRecords.map((record) => ({ value: record.sourceType })));
  const abnormalStatusData = countBy(abnormalStatuses, abnormalRecords.map((record) => ({ value: record.status })));
  const hazardStatusData = countBy(hazardStatuses, hazardRecords.map((record) => ({ value: record.status })));
  const hazardRiskData = countBy(riskLevels, hazardRecords.map((record) => ({ value: record.level })));
  const pendingAbnormalCount = abnormalRecords.filter((record) => record.status === "待确认").length;
  const activeHazardCount = hazardRecords.filter((record) => record.status !== "已关闭").length;
  const completedTaskCount = inspectionManagementTasks.filter((task) => task.status === "已完成").length;
  const activeTaskCount = inspectionManagementTasks.filter((task) => task.status !== "已取消").length;
  const inspectionCompletionRate = activeTaskCount === 0 ? 0 : Math.round((completedTaskCount / activeTaskCount) * 100);
  const closedHazardCount = hazardRecords.filter((record) => record.status === "已关闭").length;
  const rectificationClosureRate = hazardRecords.length === 0 ? 0 : Math.round((closedHazardCount / hazardRecords.length) * 100);
  const overdueRectificationCount = hazardRecords.filter((record) => record.status !== "已关闭" && record.rectificationDeadline < demoToday).length;
  const pendingAbnormals = abnormalRecords.filter((record) => record.status === "待确认").slice(0, 3);
  const pendingReviewHazards = hazardRecords.filter((record) => record.status === "待复查").slice(0, 3);
  const imminentRectifications = hazardRecords.filter((record) => record.status !== "已关闭" && record.rectificationDeadline >= demoToday && record.rectificationDeadline <= "2026-08-05").slice(0, 3);

  const recentSafetyEvents = [
    ...inspectionManagementTasks.filter((task) => task.status === "已完成").map((task) => ({ id: `task-${task.id}`, time: task.planDate, title: "点检完成", detail: `${task.deviceName} · ${task.taskNumber}`, href: `/inspection-tasks/${task.id}`, variant: "green" as const })),
    ...abnormalRecords.map((record) => ({ id: `abnormal-${record.id}`, time: record.foundAt, title: "异常发现", detail: `${record.deviceName} · ${record.description}`, href: `/abnormal-records/${record.id}`, variant: "amber" as const })),
    ...hazardRecords.map((record) => ({ id: `hazard-${record.id}`, time: record.confirmedAt, title: "隐患确认", detail: `${record.hazardNumber} · ${record.description}`, href: `/hazard-records/${record.id}`, variant: "violet" as const })),
    ...rectificationRecords.map((record) => ({ id: `rectification-${record.id}`, time: record.submittedAt, title: "整改提交", detail: `${record.id} · ${record.rectificationOwner}`, href: `/hazard-records/${record.hazardId}`, variant: "blue" as const })),
    ...reviewRecords.filter((record) => record.result === "通过").map((record) => ({ id: `review-${record.id}`, time: record.reviewedAt, title: "复查关闭", detail: `${record.id} · EHS 复查通过`, href: `/hazard-records/${record.hazardId}`, variant: "green" as const })),
  ].sort((first, second) => second.time.localeCompare(first.time)).slice(0, 6);

  const highRiskDevices = devices.filter((device) => device.riskLevel === "高").slice(0, 3);
  const highLevelAbnormals = abnormalRecords.filter((record) => record.suggestedLevel === "高").slice(0, 3);
  const highLevelHazards = hazardRecords.filter((record) => record.level === "高" && record.status !== "已关闭").slice(0, 3);

  return (
    <>
      <PageHeader title="EHS Dashboard" description="研发中心设备、点检、异常与隐患状态的本地模拟安全总览。" />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="核心指标">
        <MetricCard label="设备总数" value={devices.length} hint="纳入当前模拟台账" tone="text-slate-900" href="/devices" />
        <MetricCard label="点检完成率" value={`${inspectionCompletionRate}%`} hint={`${completedTaskCount} / ${activeTaskCount} 项有效任务已完成`} tone="text-emerald-700" href="/inspection-tasks" />
        <MetricCard label="待确认异常数量" value={pendingAbnormalCount} hint="等待 EHS 审核" tone="text-amber-700" href="/abnormal-records" />
        <MetricCard label="当前未关闭隐患" value={activeHazardCount} hint="不含已关闭隐患" tone="text-rose-700" href="/hazard-records" />
        <MetricCard label="整改闭环率" value={`${rectificationClosureRate}%`} hint={`${closedHazardCount} / ${hazardRecords.length} 项隐患已关闭`} tone="text-violet-700" href="/hazard-records" />
        <MetricCard label="逾期整改数量" value={overdueRectificationCount} hint={`截至 ${demoToday} 的未关闭逾期项`} tone="text-rose-700" href="/hazard-records" />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <DashboardPanel title="设备统计" href="/devices"><div className="grid gap-6 sm:grid-cols-2"><Distribution title="设备状态分布" data={deviceStatusData} total={devices.length} badgeVariant={deviceStatusVariant} /><Distribution title="设备风险等级" data={deviceRiskData} total={devices.length} badgeVariant={riskVariant} /></div></DashboardPanel>
        <DashboardPanel title="点检统计" href="/inspection-tasks"><Distribution title="任务状态" data={taskStatusData} total={inspectionManagementTasks.length} badgeVariant={taskStatusVariant} /></DashboardPanel>
        <DashboardPanel title="异常分析" href="/abnormal-records"><div className="grid gap-6 sm:grid-cols-2"><Distribution title="异常来源" data={abnormalSourceData} total={abnormalRecords.length} /><Distribution title="异常状态" data={abnormalStatusData} total={abnormalRecords.length} badgeVariant={abnormalStatusVariant} /></div></DashboardPanel>
        <DashboardPanel title="隐患分析" href="/hazard-records"><div className="grid gap-6 sm:grid-cols-2"><Distribution title="整改状态" data={hazardStatusData} total={hazardRecords.length} badgeVariant={hazardStatusVariant} /><Distribution title="隐患等级" data={hazardRiskData} total={hazardRecords.length} badgeVariant={riskVariant} /></div></DashboardPanel>
      </section>

      <section className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-base font-bold text-slate-900">EHS 待办</h2><p className="mt-1 text-sm text-slate-500">聚合需由 EHS 管理员优先跟进的审核、复查和临期整改事项。</p></div><Link href="/ehs-workbench" className="inline-flex min-h-10 items-center rounded-lg bg-[#167864] px-3 text-sm font-semibold text-white no-underline hover:bg-[#116653]">进入 EHS 工作台</Link></div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3"><TodoList title="待审核异常" count={pendingAbnormalCount} href="/ehs-workbench#pending-abnormal" items={pendingAbnormals.map((record) => ({ id: record.id, title: record.abnormalNumber, detail: `${record.deviceName} · ${record.description}`, href: `/abnormal-records/${record.id}`, badge: "待确认", variant: "amber" as const }))} emptyText="暂无待审核异常。" /><TodoList title="待复查隐患" count={pendingReviewHazards.length} href="/ehs-workbench#pending-review" items={pendingReviewHazards.map((record) => ({ id: record.id, title: record.hazardNumber, detail: `${record.deviceName} · 整改责任人：${record.rectificationOwner}`, href: `/hazard-records/${record.id}/review`, badge: "待复查", variant: "violet" as const }))} emptyText="暂无待复查隐患。" /><TodoList title="临期整改" count={imminentRectifications.length} href="/ehs-workbench#pending-rectification" items={imminentRectifications.map((record) => ({ id: record.id, title: record.hazardNumber, detail: `${record.deviceName} · 期限：${record.rectificationDeadline}`, href: `/hazard-records/${record.id}`, badge: "临期", variant: "amber" as const }))} emptyText="暂无临期整改项。" /></div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-bold text-slate-900">最近安全动态</h2><p className="mt-1 text-sm text-slate-500">由现有本地模拟记录生成，不代表实时业务数据。</p></div></div><div className="mt-4 space-y-3">{recentSafetyEvents.map((event) => <Link key={event.id} href={event.href} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 no-underline transition hover:border-emerald-200 hover:bg-emerald-50/30"><StatusBadge variant={event.variant}>{event.title}</StatusBadge><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-800">{event.detail}</p><p className="mt-1 text-xs text-slate-500">{event.time}</p></div><span className="text-sm text-emerald-700">→</span></Link>)}</div></section>
        <section className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 shadow-sm sm:p-5"><h2 className="text-base font-bold text-slate-900">驾驶舱提示</h2><p className="mt-2 text-sm leading-6 text-slate-600">本页用于帮助 EHS 管理员优先识别待审核异常、待复查隐患及即将到期的整改事项。所有指标均基于当前 Mock 数据计算。</p><Link href="/ehs-workbench" className="mt-5 inline-flex min-h-10 items-center text-sm font-semibold text-emerald-700 no-underline hover:text-emerald-900">查看全部 EHS 待办 →</Link></section>
      </section>

      <section className="mt-5"><h2 className="text-base font-bold text-slate-900">高关注对象</h2><p className="mt-1 text-sm text-slate-500">优先展示高风险设备、高建议等级异常和未关闭高等级隐患。</p><div className="mt-4 grid gap-5 xl:grid-cols-3"><ConcernList title="高风险设备" href="/devices" items={highRiskDevices.map((device) => ({ key: device.id, href: `/devices/${device.id}`, title: device.name, meta: `${device.code} · ${device.location}`, badge: "高", variant: "red" as const }))} emptyText="暂无高风险设备。" /><ConcernList title="高建议等级异常" href="/abnormal-records" items={highLevelAbnormals.map((record) => ({ key: record.id, href: `/abnormal-records/${record.id}`, title: record.description, meta: `${record.abnormalNumber} · ${record.deviceName}`, badge: record.status, variant: abnormalStatusVariant(record.status) }))} emptyText="暂无高建议等级异常。" /><ConcernList title="高等级隐患" href="/hazard-records" items={highLevelHazards.map((record) => ({ key: record.id, href: `/hazard-records/${record.id}`, title: record.description, meta: `${record.hazardNumber} · ${record.deviceName}`, badge: record.status, variant: hazardStatusVariant(record.status) }))} emptyText="暂无未关闭高等级隐患。" /></div></section>
    </>
  );
}

function MetricCard({ label, value, hint, tone, href }: { label: string; value: number | string; hint: string; tone: string; href: string }) {
  return <Link href={href} className="block rounded-xl border border-slate-200 bg-white p-5 no-underline shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/30"><p className="text-sm font-medium text-slate-500">{label}</p><p className={`mt-3 text-3xl font-bold ${tone}`}>{value}</p><p className="mt-2 text-xs text-slate-400">{hint}</p></Link>;
}

function TodoList({ title, count, href, items, emptyText }: { title: string; count: number; href: string; items: Array<{ id: string; title: string; detail: string; href: string; badge: string; variant: "slate" | "green" | "amber" | "red" | "blue" | "violet" }>; emptyText: string }) {
  return <article className="rounded-lg border border-slate-200 p-4"><div className="flex items-center justify-between gap-3"><h3 className="font-semibold text-slate-800">{title}</h3><Link href={href} className="text-sm font-semibold text-emerald-700 no-underline hover:text-emerald-900">{count} 项 →</Link></div><div className="mt-3 space-y-2">{items.length === 0 ? <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-500">{emptyText}</p> : items.map((item) => <Link key={item.id} href={item.href} className="block rounded-md bg-slate-50 p-3 no-underline hover:bg-emerald-50"><div className="flex items-start justify-between gap-2"><p className="font-medium text-slate-800">{item.title}</p><StatusBadge variant={item.variant}>{item.badge}</StatusBadge></div><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.detail}</p></Link>)}</div></article>;
}

function DashboardPanel({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-base font-bold text-slate-900">{title}</h2><Link href={href} className="text-sm font-medium text-emerald-700 no-underline hover:text-emerald-900">查看详情 →</Link></div><div className="mt-5">{children}</div></section>;
}

function Distribution({ title, data, total, badgeVariant }: { title: string; data: Array<{ label: string; value: number }>; total: number; badgeVariant?: (label: never) => "slate" | "green" | "amber" | "red" | "blue" | "violet" }) {
  return <div><h3 className="text-sm font-semibold text-slate-700">{title}</h3><div className="mt-4 space-y-3">{data.map((item) => <div key={item.label}><div className="flex items-center justify-between gap-3 text-sm"><span className="text-slate-600">{item.label}</span><span className="flex items-center gap-2">{badgeVariant && <StatusBadge variant={badgeVariant(item.label as never)}>{item.label}</StatusBadge>}<strong className="text-slate-800">{item.value}</strong></span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${total === 0 ? 0 : (item.value / total) * 100}%` }} /></div></div>)}</div></div>;
}

function ConcernList({ title, href, items, emptyText }: { title: string; href: string; items: Array<{ key: string; href: string; title: string; meta: string; badge: string; variant: "slate" | "green" | "amber" | "red" | "blue" | "violet" }>; emptyText: string }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex items-center justify-between gap-3"><h3 className="font-bold text-slate-900">{title}</h3><Link href={href} className="text-sm font-medium text-emerald-700 no-underline hover:text-emerald-900">全部 →</Link></div><div className="mt-4 space-y-3">{items.length === 0 ? <p className="text-sm text-slate-500">{emptyText}</p> : items.map((item) => <Link key={item.key} href={item.href} className="block rounded-lg border border-slate-100 p-3 no-underline transition hover:border-emerald-200 hover:bg-emerald-50/30"><div className="flex items-start justify-between gap-3"><p className="min-w-0 text-sm font-medium leading-5 text-slate-800">{item.title}</p><StatusBadge variant={item.variant}>{item.badge}</StatusBadge></div><p className="mt-2 truncate text-xs text-slate-500">{item.meta}</p></Link>)}</div></section>;
}
