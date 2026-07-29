"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { StatusBadge } from "@/components/status-badge";
import { hazardRecords } from "@/data/hazard-record-data";
import type { HazardRecordStatus } from "@/types";

const hazardLevels = ["低", "中", "高"] as const;
const hazardStatuses: HazardRecordStatus[] = ["待整改", "整改中", "待复查", "已关闭"];

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

function normalizeSearchKeyword(value: string) {
  return value.trim().replace(/\s+/g, "").toLowerCase();
}

export function HazardRecordRegister() {
  const [keyword, setKeyword] = useState("");
  const [level, setLevel] = useState("全部");
  const [status, setStatus] = useState("全部");

  const filteredRecords = useMemo(() => {
    const normalizedKeyword = normalizeSearchKeyword(keyword);
    return hazardRecords.filter((record) => {
      const matchesKeyword = !normalizedKeyword || [record.hazardNumber, record.sourceAbnormalNumber, record.deviceName, record.description, record.rectificationOwner].some((value) => normalizeSearchKeyword(value).includes(normalizedKeyword));
      return matchesKeyword && (level === "全部" || record.level === level) && (status === "全部" || record.status === status);
    });
  }, [keyword, level, status]);

  function clearFilters() {
    setKeyword("");
    setLevel("全部");
    setStatus("全部");
  }

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><label className="sm:col-span-2 xl:col-span-1"><span className="sr-only">关键词搜索</span><input type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索隐患、来源异常、设备、描述或责任人" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></label><FilterSelect label="隐患等级" value={level} options={hazardLevels} onChange={setLevel} /><FilterSelect label="当前状态" value={status} options={hazardStatuses} onChange={setStatus} /></div><div className="mt-3 flex justify-end"><button type="button" onClick={clearFilters} className="min-h-11 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-200">清除筛选</button></div></section>

      <p className="text-sm text-slate-500">共找到 {filteredRecords.length} 条隐患记录</p>

      <section className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block"><div className="overflow-x-auto"><table className="w-full min-w-[920px] text-left text-sm"><thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500"><tr><th className="px-5 py-3">隐患编号</th><th className="px-5 py-3">来源异常</th><th className="px-5 py-3">设备名称</th><th className="px-5 py-3">隐患等级</th><th className="px-5 py-3">整改责任人</th><th className="px-5 py-3">整改期限</th><th className="px-5 py-3">当前状态</th><th className="px-5 py-3">操作</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredRecords.map((record) => <tr key={record.id} className="hover:bg-slate-50"><td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">{record.hazardNumber}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{record.sourceAbnormalNumber}</td><td className="px-5 py-4"><Link href={`/hazard-records/${record.id}`} className="font-medium text-slate-900 no-underline hover:text-emerald-700">{record.deviceName}</Link></td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={levelVariant(record.level)}>{record.level}</StatusBadge></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{record.rectificationOwner}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{record.rectificationDeadline}</td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={statusVariant(record.status)}>{record.status}</StatusBadge></td><td className="whitespace-nowrap px-5 py-4"><Link href={`/hazard-records/${record.id}`} className="font-medium text-emerald-700 no-underline hover:text-emerald-900">查看详情</Link></td></tr>)}</tbody></table></div></section>

      <section className="space-y-3 sm:hidden" aria-label="隐患记录卡片列表">{filteredRecords.map((record) => <Link key={record.id} href={`/hazard-records/${record.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm active:bg-slate-50"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{record.deviceName}</p><p className="mt-1 text-xs text-slate-500">{record.hazardNumber} · 来源 {record.sourceAbnormalNumber}</p></div><StatusBadge variant={statusVariant(record.status)}>{record.status}</StatusBadge></div><p className="mt-4 text-sm leading-6 text-slate-700">{record.description}</p><dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm"><HazardItem label="隐患等级"><StatusBadge variant={levelVariant(record.level)}>{record.level}</StatusBadge></HazardItem><HazardItem label="整改责任人" value={record.rectificationOwner} /><HazardItem label="整改期限" value={record.rectificationDeadline} /><HazardItem label="来源类型" value={record.sourceType} /></dl><p className="mt-4 text-sm font-medium text-emerald-700">查看详情 →</p></Link>)}</section>

      {filteredRecords.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-sm text-slate-500">未找到符合筛选条件的隐患记录。</div>}
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"><option value="全部">全部{label}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function HazardItem({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return <div className="min-w-0"><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 truncate text-slate-700">{children ?? value}</dd></div>;
}
