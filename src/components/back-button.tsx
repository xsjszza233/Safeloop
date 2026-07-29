"use client";

import { useRouter } from "next/navigation";

export function BackButton({ fallbackHref, label = "返回" }: { fallbackHref: string; label?: string }) {
  const router = useRouter();
  const handleBack = () => router.push(fallbackHref);
  return <button type="button" onClick={handleBack} className="mb-3 inline-flex min-h-11 min-w-11 touch-manipulation items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-[#167864]" aria-label={`返回${label}`}>← {label}</button>;
}
