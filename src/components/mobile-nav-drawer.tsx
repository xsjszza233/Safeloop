"use client";

import Link from "next/link";

export interface NavItem { label: string; href: string; icon: string; }

export function MobileNavDrawer({ activePath, isOpen, items, onClose }: { activePath: string; isOpen: boolean; items: NavItem[]; onClose: () => void }) {
  return <div className={`fixed inset-0 z-[100] lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} role="dialog" aria-modal={isOpen} aria-hidden={!isOpen} aria-label="主导航">
    <button type="button" tabIndex={isOpen ? 0 : -1} aria-label="关闭导航菜单" onClick={onClose} className={`absolute inset-0 z-40 bg-slate-950/40 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`} />
    <aside className={`fixed left-0 top-0 z-50 flex h-dvh w-72 max-w-[85vw] touch-manipulation flex-col bg-white shadow-2xl transition-transform duration-200 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5"><div className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded-lg bg-[#167864] text-sm font-bold text-white">S</div><div><p className="font-bold text-slate-900">SafeLoop</p><p className="text-[10px] font-medium text-slate-400">EHS MANAGEMENT</p></div></div><button type="button" tabIndex={isOpen ? 0 : -1} aria-label="关闭菜单" onClick={onClose} className="grid h-11 w-11 touch-manipulation place-items-center rounded-lg text-xl text-slate-500 hover:bg-slate-100">×</button></div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">{items.map((item) => { const active = activePath === item.href || activePath.startsWith(`${item.href}/`); return <Link key={item.href} tabIndex={isOpen ? 0 : -1} href={item.href} onClick={onClose} className={`flex no-underline items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${active ? "bg-emerald-50 text-[#167864]" : "text-slate-600 hover:bg-slate-50"}`}><span className="grid h-5 w-5 place-items-center">{item.icon}</span>{item.label}</Link>; })}</nav>
      <p className="m-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">演示原型 · 数据仅供学习展示</p>
    </aside>
  </div>;
}
