export function PageHeader({ title, description, action }: { title: string; description: string; action?: string }) {
  return <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1><p className="mt-1 text-sm text-slate-500">{description}</p></div>{action && <button className="rounded-lg bg-[#167864] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#116653]">{action}</button>}</div>;
}
