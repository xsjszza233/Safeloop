"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { StatusBadge } from "@/components/status-badge";
import { abnormalRecords } from "@/data/abnormal-record-data";
import type { AbnormalRecordStatus, AbnormalSourceType } from "@/types";

const sourceTypes: AbnormalSourceType[] = ["点检异常", "主动上报"];
const recordStatuses: AbnormalRecordStatus[] = ["待确认", "已确认隐患", "一般异常", "已驳回"];
const suggestedLevels = ["低", "中", "高"] as const;

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

function normalizeSearchKeyword(value: string) {
  return value.trim().replace(/\s+/g, "").toLowerCase();
}

export function AbnormalRecordRegister() {
  const [keyword, setKeyword] = useState("");
  const [sourceType, setSourceType] = useState("全部");
  const [status, setStatus] = useState("全部");
  const [suggestedLevel, setSuggestedLevel] = useState("全部");

  const filteredRecords = useMemo(() => {
    const normalizedKeyword = normalizeSearchKeyword(keyword);
    return abnormalRecords.filter((record) => {
      const matchesKeyword = !normalizedKeyword || [record.abnormalNumber, record.deviceCode, record.deviceName, record.description, record.finder, record.specificLocation].some((value) => normalizeSearchKeyword(value).includes(normalizedKeyword));
      return matchesKeyword && (sourceType === "全部" || record.sourceType === sourceType) && (status === "全部" || record.status === status) && (suggestedLevel === "全部" || record.suggestedLevel === suggestedLevel);
    });
  }, [keyword, sourceType, status, suggestedLevel]);

  function clearFilters() {
    setKeyword("");
    setSourceType("全部");
    setStatus("全部");
    setSuggestedLevel("全部");
  }

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="sm:col-span-2 xl:col-span-1"><span className="sr-only">关键词搜索</span><input type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索编号、设备、描述、人员或位置" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></label>
          <FilterSelect label="来源类型" value={sourceType} options={sourceTypes} onChange={setSourceType} />
          <FilterSelect label="当前状态" value={status} options={recordStatuses} onChange={setStatus} />
          <FilterSelect label="建议等级" value={suggestedLevel} options={suggestedLevels} onChange={setSuggestedLevel} />
        </div>
        <div className="mt-3 flex justify-end"><button type="button" onClick={clearFilters} className="min-h-11 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-200">清除筛选</button></div>
      </section>

      <p className="text-sm text-slate-500">共找到 {filteredRecords.length} 条异常记录</p>

      <section className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block"><div className="overflow-x-auto"><table className="w-full min-w-[1030px] text-left text-sm"><thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500"><tr><th className="px-5 py-3">异常编号</th><th className="px-5 py-3">设备名称</th><th className="px-5 py-3">来源类型</th><th className="px-5 py-3">异常描述摘要</th><th className="px-5 py-3">发现人员</th><th className="px-5 py-3">发现时间</th><th className="px-5 py-3">建议等级</th><th className="px-5 py-3">当前状态</th><th className="px-5 py-3">操作</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredRecords.map((record) => <tr key={record.id} className="hover:bg-slate-50"><td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">{record.abnormalNumber}</td><td className="px-5 py-4"><Link href={`/abnormal-records/${record.id}`} className="font-medium text-slate-900 no-underline hover:text-emerald-700">{record.deviceName}</Link></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{record.sourceType}</td><td className="max-w-72 px-5 py-4 text-slate-600"><p className="truncate">{record.description}</p></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{record.finder}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{record.foundAt}</td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={levelVariant(record.suggestedLevel)}>{record.suggestedLevel}</StatusBadge></td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={statusVariant(record.status)}>{record.status}</StatusBadge></td><td className="whitespace-nowrap px-5 py-4"><Link href={`/abnormal-records/${record.id}`} className="font-medium text-emerald-700 no-underline hover:text-emerald-900">查看详情</Link></td></tr>)}</tbody></table></div></section>

      <section className="space-y-3 sm:hidden" aria-label="异常记录卡片列表">{filteredRecords.map((record) => <Link key={record.id} href={`/abnormal-records/${record.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm active:bg-slate-50"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{record.deviceName}</p><p className="mt-1 text-xs text-slate-500">{record.abnormalNumber} · {record.sourceType}</p></div><StatusBadge variant={statusVariant(record.status)}>{record.status}</StatusBadge></div><p className="mt-4 text-sm leading-6 text-slate-700">{record.description}</p><dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm"><RecordItem label="发现人员" value={record.finder} /><RecordItem label="发现时间" value={record.foundAt} /><RecordItem label="建议等级"><StatusBadge variant={levelVariant(record.suggestedLevel)}>{record.suggestedLevel}</StatusBadge></RecordItem><RecordItem label="所在位置" value={`${record.area} ${record.specificLocation}`} wide /></dl><p className="mt-4 text-sm font-medium text-emerald-700">查看详情 →</p></Link>)}</section>

      {filteredRecords.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-sm text-slate-500">未找到符合筛选条件的异常记录。</div>}
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <label><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"><option value="全部">全部{label}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function RecordItem({ label, value, children, wide = false }: { label: string; value?: string; children?: React.ReactNode; wide?: boolean }) {
  return <div className={wide ? "col-span-2 min-w-0" : "min-w-0"}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 truncate text-slate-700">{children ?? value}</dd></div>;
}
