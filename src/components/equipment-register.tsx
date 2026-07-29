"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { devices } from "@/data/mock-data";
import type { Device, DeviceStatus, InspectionTimeTag } from "@/types";
import { StatusBadge } from "./status-badge";

const deviceStatuses: DeviceStatus[] = ["在用", "停用", "维修中", "报废"];
const riskLevels = ["低", "中", "高"] as const;

function statusVariant(status: DeviceStatus) {
  if (status === "在用") return "green";
  if (status === "维修中") return "amber";
  if (status === "停用") return "blue";
  return "slate";
}

function riskVariant(riskLevel: Device["riskLevel"]) {
  if (riskLevel === "高") return "red";
  if (riskLevel === "中") return "amber";
  return "green";
}

function inspectionVariant(tag: InspectionTimeTag) {
  if (tag === "已逾期") return "red";
  if (tag === "即将到期") return "amber";
  return "green";
}

function normalizeSearchKeyword(value: string) {
  return value.trim().replace(/\s+/g, "").toLowerCase();
}

export function EquipmentRegister() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("全部");
  const [department, setDepartment] = useState("全部");
  const [status, setStatus] = useState("全部");
  const [riskLevel, setRiskLevel] = useState("全部");
  const [overdueOnly, setOverdueOnly] = useState(false);

  const categories = Array.from(new Set(devices.map((device) => device.category)));
  const departments = Array.from(new Set(devices.map((device) => device.department)));
  const overdueCount = devices.filter(
    (device) => device.status === "在用" && device.inspectionTag === "已逾期",
  ).length;

  const filteredDevices = useMemo(() => {
    const normalizedKeyword = normalizeSearchKeyword(keyword);
    return devices.filter((device) => {
      const matchesKeyword =
        !normalizedKeyword ||
        [
          device.code,
          device.name,
          device.category,
          device.department,
          // 当前模拟数据将所在区域和具体位置合并保存在 location 字段。
          device.location,
          device.owner,
        ].some((value) => normalizeSearchKeyword(value).includes(normalizedKeyword));
      return (
        matchesKeyword &&
        (category === "全部" || device.category === category) &&
        (department === "全部" || device.department === department) &&
        (status === "全部" || device.status === status) &&
        (riskLevel === "全部" || device.riskLevel === riskLevel) &&
        (!overdueOnly || (device.status === "在用" && device.inspectionTag === "已逾期"))
      );
    });
  }, [category, department, keyword, overdueOnly, riskLevel, status]);

  function clearFilters() {
    setKeyword("");
    setCategory("全部");
    setDepartment("全部");
    setStatus("全部");
    setRiskLevel("全部");
    setOverdueOnly(false);
  }

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="设备统计">
        <StatCard label="设备总数" value={devices.length} tone="text-slate-900" />
        <StatCard label="在用设备数" value={devices.filter((device) => device.status === "在用").length} tone="text-emerald-700" />
        <StatCard label="维修中设备数" value={devices.filter((device) => device.status === "维修中").length} tone="text-amber-700" />
        <StatCard label="逾期未检设备数" value={overdueCount} tone="text-rose-700" />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <label className="sm:col-span-2 xl:col-span-2">
            <span className="sr-only">关键词搜索</span>
            <input type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索设备编号、名称、位置或责任人" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          </label>
          <FilterSelect label="设备类别" value={category} onChange={setCategory} options={categories} />
          <FilterSelect label="所属部门" value={department} onChange={setDepartment} options={departments} />
          <FilterSelect label="设备状态" value={status} onChange={setStatus} options={deviceStatuses} />
          <FilterSelect label="风险等级" value={riskLevel} onChange={setRiskLevel} options={riskLevels} />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <label className="flex min-h-11 items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={overdueOnly} onChange={(event) => setOverdueOnly(event.target.checked)} className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            仅看逾期未检设备
          </label>
          <button type="button" onClick={clearFilters} className="min-h-11 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200">清除筛选</button>
        </div>
      </section>

      <p className="text-sm text-slate-500">共找到 {filteredDevices.length} 台设备</p>

      <section className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500"><tr><th className="px-4 py-3">设备编号</th><th className="px-4 py-3">设备名称</th><th className="px-4 py-3">设备类别</th><th className="px-4 py-3">所属部门</th><th className="px-4 py-3">所在位置</th><th className="px-4 py-3">责任人</th><th className="px-4 py-3">设备状态</th><th className="px-4 py-3">风险等级</th><th className="px-4 py-3">下次点检日期</th><th className="px-4 py-3">点检时间标记</th><th className="px-4 py-3">操作</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDevices.map((device) => <tr key={device.id} className="hover:bg-slate-50"><td className="whitespace-nowrap px-4 py-3 font-medium text-slate-800">{device.code}</td><td className="px-4 py-3"><Link href={`/devices/${device.id}`} className="font-medium text-slate-900 no-underline hover:text-blue-700">{device.name}</Link></td><td className="whitespace-nowrap px-4 py-3 text-slate-600">{device.category}</td><td className="whitespace-nowrap px-4 py-3 text-slate-600">{device.department}</td><td className="whitespace-nowrap px-4 py-3 text-slate-600">{device.location}</td><td className="whitespace-nowrap px-4 py-3 text-slate-600">{device.owner}</td><td className="whitespace-nowrap px-4 py-3"><StatusBadge variant={statusVariant(device.status)}>{device.status}</StatusBadge></td><td className="whitespace-nowrap px-4 py-3"><StatusBadge variant={riskVariant(device.riskLevel)}>{device.riskLevel}</StatusBadge></td><td className="whitespace-nowrap px-4 py-3 text-slate-600">{device.nextInspectionDate}</td><td className="whitespace-nowrap px-4 py-3"><StatusBadge variant={inspectionVariant(device.inspectionTag)}>{device.inspectionTag}</StatusBadge></td><td className="whitespace-nowrap px-4 py-3"><Link href={`/devices/${device.id}`} className="font-medium text-blue-700 no-underline hover:text-blue-900">查看详情</Link></td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3 sm:hidden" aria-label="设备卡片列表">
        {filteredDevices.map((device) => <Link key={device.id} href={`/devices/${device.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm active:bg-slate-50"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{device.name}</p><p className="mt-1 text-xs text-slate-500">{device.code} · {device.category}</p></div><StatusBadge variant={statusVariant(device.status)}>{device.status}</StatusBadge></div><dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm"><DetailItem label="所属部门" value={device.department} /><DetailItem label="责任人" value={device.owner} /><DetailItem label="所在位置" value={device.location} /><DetailItem label="风险等级"><StatusBadge variant={riskVariant(device.riskLevel)}>{device.riskLevel}</StatusBadge></DetailItem><DetailItem label="下次点检日期" value={device.nextInspectionDate} /><DetailItem label="点检时间标记"><StatusBadge variant={inspectionVariant(device.inspectionTag)}>{device.inspectionTag}</StatusBadge></DetailItem></dl><p className="mt-4 text-sm font-medium text-blue-700">查看详情 →</p></Link>)}
      </section>

      {filteredDevices.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center text-sm text-slate-500">未找到符合筛选条件的设备。</div>}
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className={`mt-2 text-2xl font-semibold ${tone}`}>{value}</p></div>;
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return <label><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"><option value="全部">全部{label}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function DetailItem({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return <div className="min-w-0"><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 truncate text-slate-700">{children ?? value}</dd></div>;
}
