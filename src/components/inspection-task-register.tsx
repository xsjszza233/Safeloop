"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { StatusBadge } from "@/components/status-badge";
import { inspectionManagementTasks } from "@/data/inspection-task-data";
import type { InspectionTaskType, InspectionTimeTag, TaskStatus } from "@/types";

const taskStatuses: TaskStatus[] = ["待执行", "执行中", "已提交", "已完成", "已取消"];
const taskTypes: InspectionTaskType[] = ["常规点检", "临时点检", "维修后专项点检"];
const timeTags: InspectionTimeTag[] = ["正常", "即将到期", "已逾期"];

function statusVariant(status: TaskStatus) {
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

function normalizeSearchKeyword(value: string) {
  return value.trim().replace(/\s+/g, "").toLowerCase();
}

export function InspectionTaskRegister() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("全部");
  const [type, setType] = useState("全部");
  const [timeTag, setTimeTag] = useState("全部");

  const filteredTasks = useMemo(() => {
    const normalizedKeyword = normalizeSearchKeyword(keyword);
    return inspectionManagementTasks.filter((task) => {
      const matchesKeyword = !normalizedKeyword || [task.taskNumber, task.deviceName, task.assignee].some((value) => normalizeSearchKeyword(value).includes(normalizedKeyword));
      return matchesKeyword && (status === "全部" || task.status === status) && (type === "全部" || task.type === type) && (timeTag === "全部" || task.timeTag === timeTag);
    });
  }, [keyword, status, type, timeTag]);

  function clearFilters() {
    setKeyword("");
    setStatus("全部");
    setType("全部");
    setTimeTag("全部");
  }

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="sm:col-span-2 xl:col-span-1"><span className="sr-only">关键词搜索</span><input type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索任务编号、设备名称或执行人员" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></label>
          <FilterSelect label="任务状态" value={status} options={taskStatuses} onChange={setStatus} />
          <FilterSelect label="任务类型" value={type} options={taskTypes} onChange={setType} />
          <FilterSelect label="时间标记" value={timeTag} options={timeTags} onChange={setTimeTag} />
        </div>
        <div className="mt-3 flex justify-end"><button type="button" onClick={clearFilters} className="min-h-11 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-200">清除筛选</button></div>
      </section>

      <p className="text-sm text-slate-500">共找到 {filteredTasks.length} 条点检任务</p>

      <section className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm"><thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500"><tr><th className="px-5 py-3">任务编号</th><th className="px-5 py-3">设备名称</th><th className="px-5 py-3">设备类别</th><th className="px-5 py-3">点检模板</th><th className="px-5 py-3">执行人员</th><th className="px-5 py-3">计划日期</th><th className="px-5 py-3">状态</th><th className="px-5 py-3">时间标记</th><th className="px-5 py-3">操作</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredTasks.map((task) => <tr key={task.id} className="hover:bg-slate-50"><td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">{task.taskNumber}</td><td className="px-5 py-4"><Link href={`/inspection-tasks/${task.id}`} className="font-medium text-slate-900 no-underline hover:text-emerald-700">{task.deviceName}</Link></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{task.deviceCategory}</td><td className="px-5 py-4 text-slate-600">{task.templateName}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{task.assignee}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{task.planDate}</td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={statusVariant(task.status)}>{task.status}</StatusBadge></td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={timeTagVariant(task.timeTag)}>{task.timeTag}</StatusBadge></td><td className="whitespace-nowrap px-5 py-4"><Link href={`/inspection-tasks/${task.id}`} className="font-medium text-emerald-700 no-underline hover:text-emerald-900">查看详情</Link></td></tr>)}</tbody></table>
        </div>
      </section>

      <section className="space-y-3 sm:hidden" aria-label="点检任务卡片列表">{filteredTasks.map((task) => <Link key={task.id} href={`/inspection-tasks/${task.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm active:bg-slate-50"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{task.deviceName}</p><p className="mt-1 text-xs text-slate-500">{task.taskNumber} · {task.deviceCategory}</p></div><StatusBadge variant={statusVariant(task.status)}>{task.status}</StatusBadge></div><dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm"><TaskItem label="执行人员" value={task.assignee} /><TaskItem label="计划日期" value={task.planDate} /><TaskItem label="任务类型" value={task.type} /><TaskItem label="时间标记"><StatusBadge variant={timeTagVariant(task.timeTag)}>{task.timeTag}</StatusBadge></TaskItem><TaskItem label="点检模板" value={task.templateName} wide /></dl><p className="mt-4 text-sm font-medium text-emerald-700">查看详情 →</p></Link>)}</section>

      {filteredTasks.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-sm text-slate-500">未找到符合筛选条件的点检任务。</div>}
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"><option value="全部">全部{label}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function TaskItem({ label, value, children, wide = false }: { label: string; value?: string; children?: React.ReactNode; wide?: boolean }) {
  return <div className={wide ? "col-span-2 min-w-0" : "min-w-0"}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 truncate text-slate-700">{children ?? value}</dd></div>;
}
