"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Circle, ShieldHalf } from "lucide-react";

export function Topbar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-white/[0.06] bg-base-970/70 px-4 backdrop-blur-xl lg:px-6">
      <form
        onSubmit={(e) => { e.preventDefault(); if (q.trim()) router.push(`/scan?domain=${encodeURIComponent(q.trim())}`); }}
        className="relative flex-1 md:max-w-lg"
      >
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Scan any domain — e.g. adobe.com…"
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/25"
        />
      </form>

      <div className="ml-auto flex items-center gap-2.5">
        <div className="hidden items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-ink-soft sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulseglow rounded-full bg-ok/70" />
            <Circle className="h-2 w-2 fill-ok text-ok" />
          </span>
          Live sources online
        </div>

        <button className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] py-1.5 pl-2 pr-3 hover:border-white/[0.16]">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/20 text-brand-soft">
            <ShieldHalf size={15} />
          </div>
          <div className="hidden text-left leading-tight sm:block">
            <div className="text-xs font-semibold text-ink">CVE House</div>
            <div className="text-[10px] text-ink-faint">Business workspace</div>
          </div>
        </button>
      </div>
    </header>
  );
}
