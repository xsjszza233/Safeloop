"use client";

import { useState } from "react";
import { mockUsers, type MockUserRole } from "@/data/mock-user-data";
import { StatusBadge } from "@/components/status-badge";

const roleDescriptions: Array<{ role: MockUserRole; description: string }> = [
  { role: "EHS管理员", description: "审核异常、确认与定级隐患、指派整改、复查并关闭隐患。" },
  { role: "部门EHS Coordinator", description: "本部门兼职安全联络人，协助点检、提交异常和跟踪整改。" },
  { role: "设备责任人", description: "查看本人设备与相关点检记录，接收并提交整改措施。" },
  { role: "Facility工程师", description: "负责配电、消防、电梯等公辅设施的维护与整改。" },
  { role: "点检执行人员", description: "按任务执行现场点检，提交点检结果和异常。" },
  { role: "系统管理员", description: "负责账号、角色、权限和系统技术配置，不参与业务审批。" },
];

function roleVariant(role: MockUserRole) {
  if (role === "EHS管理员") return "violet" as const;
  if (role === "部门EHS Coordinator") return "blue" as const;
  if (role === "Facility工程师") return "amber" as const;
  if (role === "点检执行人员") return "green" as const;
  return "slate" as const;
}

export default function UsersPage() {
  const [notice, setNotice] = useState("");

  return <>
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div><h1 className="text-2xl font-bold tracking-tight text-slate-900">用户与权限管理</h1><p className="mt-1 text-sm text-slate-500">展示本地模拟用户及其在 EHS 业务中的职责边界。</p></div>
      <button type="button" onClick={() => setNotice("新增用户：演示功能暂未开放。")} className="min-h-11 rounded-lg bg-[#167864] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#116653]">新增用户</button>
    </div>

    {notice && <p role="status" className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{notice}</p>}

    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div><h2 className="text-base font-bold text-slate-900">角色说明</h2><p className="mt-1 text-sm text-slate-500">专职 EHS 管理员与部门兼职安全联络人职责分离，避免业务审批边界混淆。</p></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {roleDescriptions.map((item) => <article key={item.role} className="rounded-lg border border-slate-200 p-4"><StatusBadge variant={roleVariant(item.role)}>{item.role}</StatusBadge><p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p></article>)}
      </div>
    </section>

    <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-4 sm:px-5"><h2 className="text-base font-bold text-slate-900">模拟用户列表</h2><p className="mt-1 text-sm text-slate-500">共 {mockUsers.length} 名本地模拟用户；当前不提供真实账号、密码或权限控制。</p></div>
      <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[820px] text-left text-sm"><thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500"><tr><th className="px-5 py-3">姓名</th><th className="px-5 py-3">部门</th><th className="px-5 py-3">角色</th><th className="px-5 py-3">管理范围 / 负责区域</th></tr></thead><tbody className="divide-y divide-slate-100">{mockUsers.map((user) => <tr key={`${user.name}-${user.role}`} className="hover:bg-slate-50"><td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">{user.name}</td><td className="px-5 py-4 text-slate-600">{user.organization}</td><td className="whitespace-nowrap px-5 py-4"><StatusBadge variant={roleVariant(user.role)}>{user.role}</StatusBadge></td><td className="px-5 py-4 leading-6 text-slate-600">{user.responsibility}</td></tr>)}</tbody></table></div>
      <div className="space-y-3 p-4 md:hidden">{mockUsers.map((user) => <article key={`${user.name}-${user.role}`} className="rounded-lg border border-slate-200 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-900">{user.name}</p><p className="mt-1 text-xs text-slate-500">{user.organization}</p></div><StatusBadge variant={roleVariant(user.role)}>{user.role}</StatusBadge></div><div className="mt-4 border-t border-slate-100 pt-3"><p className="text-xs font-medium text-slate-500">管理范围 / 负责区域</p><p className="mt-1 text-sm leading-6 text-slate-700">{user.responsibility}</p></div></article>)}</div>
    </section>
  </>;
}
