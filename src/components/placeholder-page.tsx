import { PageHeader } from "./page-header";

export function PlaceholderPage({ title, description, action, sections }: { title: string; description: string; action?: string; sections: Array<{ title: string; text: string }> }) {
  return <><PageHeader title={title} description={description} action={action} /><div className="grid gap-4 lg:grid-cols-2">{sections.map((section) => <section key={section.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="font-semibold text-slate-800">{section.title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{section.text}</p><div className="mt-5 h-2 rounded-full bg-slate-100"><div className="h-2 w-2/5 rounded-full bg-emerald-100" /></div></section>)}</div></>;
}
