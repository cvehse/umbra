"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard, Radar, Waves, Bug, Crosshair, Settings, ShieldHalf, ArrowUpRight,
} from "lucide-react";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard, hint: "Global threat picture" },
  { href: "/scan", label: "Domain Scan", icon: Radar, hint: "Scan any domain" },
  { href: "/radar", label: "Dark Web Radar", icon: Waves, hint: "Live ransomware feed" },
  { href: "/vulnerabilities", label: "Vulnerabilities", icon: Bug, hint: "Live CVE feed" },
  { href: "/watchlist", label: "Watchlist", icon: Crosshair, hint: "Your monitored domains" },
  { href: "/settings", label: "Settings", icon: Settings, hint: "Sources & plan" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-[264px] shrink-0 flex-col border-r border-white/[0.06] bg-base-970/60 px-3.5 py-5 lg:flex">
      <Link href="/" className="mb-7 flex items-center gap-3 px-2">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 shadow-glow">
          <ShieldHalf className="h-5 w-5 text-brand-soft" />
        </div>
        <div className="leading-tight">
          <div className="text-[17px] font-bold tracking-tight text-ink">Umbra</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-faint">CVE House</div>
        </div>
      </Link>

      <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">Intelligence</div>
      <nav className="flex-1 space-y-1">
        {nav.map(({ href, label, icon: Icon, hint }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={clsx("nav-link group", active && "nav-link-active")}>
              <Icon className={clsx("h-[18px] w-[18px] shrink-0", active ? "text-brand-soft" : "text-ink-faint group-hover:text-ink-soft")} />
              <span className="flex-1">{label}</span>
              {active && <span className="h-1.5 w-1.5 rounded-full bg-brand-soft shadow-glow" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-brand/[0.12] to-transparent p-4">
        <div className="text-xs font-semibold text-ink">Business plan</div>
        <div className="mt-0.5 text-[11px] text-ink-faint">Unlimited scans · live dark-web feed</div>
        <Link href="/settings" className="mt-3 flex items-center justify-between rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-brand-soft hover:bg-white/[0.1]">
          Upgrade to Enterprise <ArrowUpRight size={13} />
        </Link>
      </div>
    </aside>
  );
}
