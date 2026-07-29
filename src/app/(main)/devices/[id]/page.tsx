import { notFound } from "next/navigation";

import { BackButton } from "@/components/back-button";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { devices } from "@/data/mock-data";

function statusVariant(status: (typeof devices)[number]["status"]) {
  if (status === "在用") return "green";
  if (status === "维修中") return "amber";
  if (status === "停用") return "blue";
  return "slate";
}

export default async function DeviceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const device = devices.find((item) => item.id === id);

  if (!device) notFound();

  return (
    <>
      <BackButton fallbackHref="/devices" label="返回设备台账" />
      <PageHeader title={device.name} description={`${device.code} · 设备详情与历史记录`} action="编辑基础信息" />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="font-bold">基本信息</h2>
          <dl className="mt-5 grid grid-cols-2 gap-5 text-sm sm:grid-cols-3">
            <InfoItem label="设备编号" value={device.code} />
            <InfoItem label="设备类别" value={device.category} />
            <InfoItem label="所属部门" value={device.department} />
            <InfoItem label="责任人" value={device.owner} />
            <InfoItem label="所在位置" value={device.location} />
            <div><dt className="text-slate-400">设备状态</dt><dd className="mt-1"><StatusBadge variant={statusVariant(device.status)}>{device.status}</StatusBadge></dd></div>
            <InfoItem label="设备风险等级" value={device.riskLevel} />
            <InfoItem label="下次点检日期" value={device.nextInspectionDate} />
            <InfoItem label="点检时间标记" value={device.inspectionTag} />
          </dl>
        </section>
        <section className="rounded-xl bg-[#167864] p-5 text-white shadow-sm">
          <p className="text-sm text-emerald-100">一物一码</p>
          <div className="mt-4 grid h-28 w-28 place-items-center rounded-lg bg-white text-4xl text-[#167864]">▣</div>
          <p className="mt-4 text-sm">二维码能力将在后续版本接入。</p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
          <h2 className="font-bold">点检记录、异常与隐患历史</h2>
          <p className="mt-3 text-sm text-slate-500">当前为界面骨架，后续将在接入业务数据后展示此设备的完整可追溯记录。</p>
        </section>
      </div>
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-slate-400">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>;
}
