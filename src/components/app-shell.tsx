"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNavDrawer, type NavItem } from "./mobile-nav-drawer";

const nav: NavItem[] = [
  { label: "首页看板", href: "/", icon: "⌂" }, { label: "设备台账", href: "/devices", icon: "▣" }, { label: "我的点检任务", href: "/inspection-tasks", icon: "✓" }, { label: "扫码点检", href: "/scan", icon: "⌘" },
  { label: "异常管理", href: "/abnormal-records", icon: "!" }, { label: "隐患管理", href: "/hazard-records", icon: "◆" }, { label: "我的整改任务", href: "/rectifications", icon: "↺" }, { label: "EHS 复查", href: "/reviews", icon: "◎" }, { label: "检查模板", href: "/templates", icon: "▤" }, { label: "用户与权限", href: "/users", icon: "♙" },
];
const titles: Record<string, string> = { "": "首页看板", dashboard: "首页看板", devices: "设备台账", "inspection-tasks": "我的点检任务", scan: "扫码点检", "abnormal-records": "异常管理", anomalies: "异常管理", "hazard-records": "隐患管理", hazards: "隐患管理", rectifications: "我的整改任务", reviews: "EHS 复查", templates: "检查模板管理", users: "用户与权限" };

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeTitle = titles[pathname.split("/")[1]] ?? "详情";
  const handleMenuOpen = () => setOpen(true);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (!open) return; const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; const originalOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; window.addEventListener("keydown", closeOnEscape); return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", closeOnEscape); }; }, [open]);
  const sidebar = <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white"><div className="flex h-16 items-center gap-3 border-b border-slate-100 px-6"><div className="grid h-8 w-8 place-items-center rounded-lg bg-[#167864] text-sm font-bold text-white">S</div><div><p className="font-bold tracking-tight text-slate-900">SafeLoop</p><p className="text-[10px] font-medium text-slate-400">EHS MANAGEMENT</p></div></div><nav className="flex-1 space-y-1 overflow-y-auto p-3">{nav.map(({ label, href, icon }) => { const active = pathname === href || pathname.startsWith(`${href}/`); return <Link onClick={() => setOpen(false)} key={href} href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-emerald-50 text-[#167864]" : "text-slate-600 hover:bg-slate-50"}`}><span className="grid h-5 w-5 place-items-center text-base">{icon}</span>{label}</Link>; })}</nav><div className="m-3 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">演示原型<br />数据仅供学习展示</div></aside>;
  return <div className="min-h-screen overflow-x-hidden"><div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{sidebar}</div>{open && <MobileNavDrawer activePath={pathname} isOpen items={nav} onClose={() => setOpen(false)} />}<div className="w-full min-w-0 lg:pl-64"><header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7"><div className="flex items-center gap-3"><button type="button" aria-label="打开菜单" aria-expanded={open} onClick={handleMenuOpen} className="grid h-11 w-11 touch-manipulation place-items-center rounded-lg border border-slate-200 text-lg lg:hidden">☰</button><div className="hidden items-center gap-2 text-sm sm:flex"><span className="text-slate-400">工作台</span><span className="text-slate-300">/</span><span className="font-medium text-slate-700">{activeTitle}</span></div></div><div className="flex items-center gap-3"><button type="button" aria-label="通知" className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-50">♧<span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" /></button><div className="flex items-center gap-2 border-l border-slate-200 pl-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">E</div><div className="hidden text-left sm:block"><p className="text-sm font-semibold text-slate-700">陈小安</p><p className="text-[11px] text-slate-400">EHS 管理员</p></div></div></div></header><main className="mx-auto w-full max-w-none p-4 sm:p-7 lg:max-w-7xl">{children}</main></div></div>;
}
