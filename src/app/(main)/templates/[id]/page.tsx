import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { getInspectionTemplate } from "@/data/inspection-templates";
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

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = getInspectionTemplate(id);

  if (!template) notFound();

  return (
    <>
      <BackButton fallbackHref="/templates" label="返回检查模板" />
      <PageHeader title={template.name} description={`模板编号：${template.code}`} />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <StatusBadge variant={statusVariant(template.status)}>{template.status}</StatusBadge>
        <span className="text-sm text-slate-500">版本 V{template.version}</span>
      </div>

      <div className="space-y-5">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-base font-bold text-slate-900">模板基本信息</h2>
          <dl className="mt-5 grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem label="模板编号" value={template.code} />
            <InfoItem label="适用设备类别" value={template.category} />
            <div><dt className="text-slate-500">风险等级</dt><dd className="mt-1"><StatusBadge variant={riskVariant(template.riskLevels)}>{template.riskLevels.join("、")}</StatusBadge></dd></div>
            <InfoItem label="检查周期" value={template.cycle} />
            <div><dt className="text-slate-500">模板状态</dt><dd className="mt-1"><StatusBadge variant={statusVariant(template.status)}>{template.status}</StatusBadge></dd></div>
            <InfoItem label="检查项目数量" value={`${template.items.length} 项`} />
            <InfoItem label="创建人" value={template.createdBy} />
            <InfoItem label="更新时间" value={template.updatedAt} />
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2"><div><h2 className="text-base font-bold text-slate-900">检查项目列表</h2><p className="mt-1 text-sm text-slate-500">项目要求来源于本地模拟模板；照片上传功能尚未开放。</p></div><span className="text-sm text-slate-500">共 {template.items.length} 项</span></div>

          <div className="mt-5 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[950px] text-left text-sm"><thead className="border-b border-slate-200 text-xs font-medium text-slate-500"><tr><th className="pb-3 pr-4">项目名称</th><th className="pb-3 pr-4">检查内容</th><th className="pb-3 pr-4">检查方法</th><th className="pb-3 pr-4">判断标准</th><th className="pb-3 pr-4">是否需要备注</th><th className="pb-3">是否需要照片</th></tr></thead><tbody className="divide-y divide-slate-100">{template.items.map((item) => <tr key={item.id}><td className="py-4 pr-4 font-medium text-slate-800">{item.order}. {item.name}</td><td className="py-4 pr-4 leading-6 text-slate-600">{item.content}</td><td className="py-4 pr-4 leading-6 text-slate-600">{item.method}</td><td className="py-4 pr-4 leading-6 text-slate-600">{item.criterion}</td><td className="py-4 pr-4"><RequirementBadge required={item.notesRequired} /></td><td className="py-4"><RequirementBadge required={item.photoRequired} /></td></tr>)}</tbody></table>
          </div>

          <div className="mt-5 space-y-3 md:hidden">{template.items.map((item) => <article key={item.id} className="rounded-lg border border-slate-200 p-4"><p className="font-semibold text-slate-800">{item.order}. {item.name}</p><DetailLine label="检查内容" value={item.content} /><DetailLine label="检查方法" value={item.method} /><DetailLine label="判断标准" value={item.criterion} /><div className="mt-3 flex flex-wrap gap-2"><RequirementBadge required={item.notesRequired} label="备注" /><RequirementBadge required={item.photoRequired} label="照片" /></div></article>)}</div>
        </section>
      </div>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-slate-500">{label}</dt><dd className="mt-1 font-medium text-slate-800">{value}</dd></div>;
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return <div className="mt-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm leading-6 text-slate-700">{value}</p></div>;
}

function RequirementBadge({ required, label }: { required: boolean; label?: string }) {
  const text = label ? `${label}${required ? "必填" : "非必填"}` : required ? "需要" : "不需要";
  return <StatusBadge variant={required ? "amber" : "slate"}>{text}</StatusBadge>;
}
