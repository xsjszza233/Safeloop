import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { hazardRecords } from "@/data/hazard-record-data";
import { getRectificationRecords } from "@/data/rectification-review-data";

export default function ReviewsPage() {
  const pendingReviews = hazardRecords
    .filter((record) => record.status === "待复查")
    .map((record) => {
      const records = getRectificationRecords(record.id);
      return { record, completedAt: records.at(-1)?.submittedAt ?? "暂无整改提交时间" };
    });

  return <>
    <PageHeader title="EHS 复查" description="自动汇总已提交整改、等待 EHS 复查的隐患记录；当前数据为本地模拟数据。" />
    <section className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block"><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500"><tr><th className="px-5 py-3">隐患编号</th><th className="px-5 py-3">关联设备</th><th className="px-5 py-3">隐患描述</th><th className="px-5 py-3">整改责任人</th><th className="px-5 py-3">整改完成时间</th><th className="px-5 py-3">当前状态</th><th className="px-5 py-3">操作</th></tr></thead><tbody className="divide-y divide-slate-100">{pendingReviews.map(({ record, completedAt }) => <tr key={record.id} className="hover:bg-slate-50"><td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">{record.hazardNumber}</td><td className="px-5 py-4 font-medium text-slate-800">{record.deviceName}</td><td className="max-w-sm px-5 py-4 leading-6 text-slate-600">{record.description}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{record.rectificationOwner}</td><td className="whitespace-nowrap px-5 py-4 text-slate-600">{completedAt}</td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant="violet">待复查</StatusBadge></td><td className="whitespace-nowrap px-5 py-4"><Link href={`/hazard-records/${record.id}/review`} className="inline-flex min-h-10 items-center rounded-lg bg-emerald-700 px-3 text-sm font-semibold text-white no-underline hover:bg-emerald-800">开始复查</Link></td></tr>)}</tbody></table></div></section>
    <section className="space-y-3 sm:hidden">{pendingReviews.map(({ record, completedAt }) => <article key={record.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-semibold text-slate-900">{record.deviceName}</p><p className="mt-1 text-xs text-slate-500">{record.hazardNumber}</p></div><StatusBadge variant="violet">待复查</StatusBadge></div><p className="mt-4 text-sm leading-6 text-slate-700">{record.description}</p><dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm"><ReviewItem label="整改责任人" value={record.rectificationOwner} /><ReviewItem label="整改完成时间" value={completedAt} /></dl><Link href={`/hazard-records/${record.id}/review`} className="mt-4 flex min-h-11 items-center justify-center rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white no-underline">开始复查</Link></article>)}</section>
    {pendingReviews.length === 0 && <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">当前暂无待复查隐患。</p>}
  </>;
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-slate-500">{label}</dt><dd className="mt-1 break-words font-medium leading-5 text-slate-800">{value}</dd></div>;
}
