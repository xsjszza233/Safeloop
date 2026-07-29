import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { inspectionTemplates } from "@/data/inspection-templates";
import type { InspectionTemplateStatus } from "@/types";

function statusVariant(status: InspectionTemplateStatus) {
  if (status === "启用") return "green";
  if (status === "草稿") return "amber";
  return "slate";
}

function riskVariant(levels: string[]) {
  if (levels.includes("高")) return "red";
  if (levels.includes("中")) return "amber";
  return "green";
}

export default function TemplatesPage() {
  return (
    <>
      <PageHeader title="检查模板管理" description="查看设备类别的默认点检模板与检查项目。本页数据仅用于演示。" />
      <p className="mb-4 text-sm text-slate-500">共 {inspectionTemplates.length} 个本地点检模板</p>

      <section className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500"><tr><th className="px-5 py-3">模板编号</th><th className="px-5 py-3">模板名称</th><th className="px-5 py-3">适用设备类别</th><th className="px-5 py-3">风险等级</th><th className="px-5 py-3">检查周期</th><th className="px-5 py-3">模板状态</th><th className="px-5 py-3">检查项目数量</th><th className="px-5 py-3">操作</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {inspectionTemplates.map((template) => <tr key={template.id} className="hover:bg-slate-50"><td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">{template.code}</td><td className="px-5 py-4"><Link href={`/templates/${template.id}`} className="font-medium text-slate-900 no-underline hover:text-emerald-700">{template.name}</Link></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{template.category}</td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={riskVariant(template.riskLevels)}>{template.riskLevels.join("、")}</StatusBadge></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{template.cycle}</td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={statusVariant(template.status)}>{template.status}</StatusBadge></td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{template.items.length} 项</td><td className="whitespace-nowrap px-5 py-4"><Link href={`/templates/${template.id}`} className="font-medium text-emerald-700 no-underline hover:text-emerald-900">查看详情</Link></td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3 sm:hidden" aria-label="点检模板卡片列表">
        {inspectionTemplates.map((template) => <Link key={template.id} href={`/templates/${template.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 no-underline shadow-sm active:bg-slate-50"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{template.name}</p><p className="mt-1 text-xs text-slate-500">{template.code}</p></div><StatusBadge variant={statusVariant(template.status)}>{template.status}</StatusBadge></div><dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm"><TemplateItem label="适用设备类别" value={template.category} /><TemplateItem label="检查周期" value={template.cycle} /><TemplateItem label="风险等级"><StatusBadge variant={riskVariant(template.riskLevels)}>{template.riskLevels.join("、")}</StatusBadge></TemplateItem><TemplateItem label="检查项目数量" value={`${template.items.length} 项`} /></dl><p className="mt-4 text-sm font-medium text-emerald-700">查看详情 →</p></Link>)}
      </section>
    </>
  );
}

function TemplateItem({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return <div className="min-w-0"><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 truncate text-slate-700">{children ?? value}</dd></div>;
}
