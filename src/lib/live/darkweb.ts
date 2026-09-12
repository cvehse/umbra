// ── Global dark-web feed ───────────────────────────────────────────────────
// Real ransomware leak-site intelligence via ransomware.live, which crawls
// 396+ ransomware groups' .onion leak blogs and exposes them over a free
// clearnet HTTPS API. IMPORTANT: this connects only to that clearnet API — the
// host machine never touches Tor or any .onion / threat-actor infrastructure.

import type { RansomHit } from "@/lib/live/scan";

const UA = { "user-agent": "Umbra-ThreatIntel/1.0" };
const API = "https://api.ransomware.live/v2";

interface RwVictim {
  victim: string; group: string; domain?: string; country?: string; activity?: string;
  description?: string; data_size?: string; attackdate?: string; discovered?: string; claim_url?: string; url?: string;
}

function clean(s?: string): string | undefined {
  if (!s) return undefined;
  // eslint-disable-next-line no-control-regex
  const out = s.replace(/\uFFFD/g, "").replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
  return out || undefined;
}

function mapVictim(v: RwVictim): RansomHit {
  return {
    victim: clean(v.victim) || v.victim, group: v.group, domain: v.domain || undefined, country: v.country || undefined,
    sector: v.activity || undefined, description: clean(v.description),
    dataSize: v.data_size || undefined, attackDate: v.attackdate, discovered: v.discovered,
    claimUrl: v.claim_url || undefined, url: v.url || undefined,
  };
}

export interface GlobalDarkWeb {
  ok: boolean;
  fetchedAt: string;
  totalGroups: number;
  victims: RansomHit[];
  stats: {
    recentCount: number;
    last7d: number;
    topGroups: { name: string; count: number }[];
    topCountries: { name: string; count: number }[];
    topSectors: { name: string; count: number }[];
    timeline: { date: string; count: number }[];
  };
}

export async function getGlobalDarkWeb(): Promise<GlobalDarkWeb> {
  try {
    const [rv, gr] = await Promise.all([
      fetch(`${API}/recentvictims`, { headers: UA, next: { revalidate: 900 } }),
      fetch(`${API}/groups`, { headers: UA, next: { revalidate: 86400 } }),
    ]);
    const victimsRaw = rv.ok ? ((await rv.json()) as RwVictim[]) : [];
    const groupsRaw = gr.ok ? ((await gr.json()) as unknown[]) : [];
    const victims = (Array.isArray(victimsRaw) ? victimsRaw : []).map(mapVictim);

    const now = Date.now();
    const weekAgo = now - 7 * 86400000;
    const last7d = victims.filter((v) => v.discovered && new Date(v.discovered).getTime() >= weekAgo).length;

    return {
      ok: true, fetchedAt: new Date().toISOString(),
      totalGroups: Array.isArray(groupsRaw) ? groupsRaw.length : 0,
      victims,
      stats: {
        recentCount: victims.length,
        last7d,
        topGroups: tally(victims.map((v) => v.group)),
        topCountries: tally(victims.map((v) => v.country).filter(Boolean) as string[]),
        topSectors: tally(victims.map((v) => v.sector).filter(Boolean) as string[]),
        timeline: timelineByDay(victims, 21),
      },
    };
  } catch {
    return {
      ok: false, fetchedAt: new Date().toISOString(), totalGroups: 0, victims: [],
      stats: { recentCount: 0, last7d: 0, topGroups: [], topCountries: [], topSectors: [], timeline: [] },
    };
  }
}

// Search the leak-site feed by keyword (company/domain).
export async function searchDarkWeb(keyword: string): Promise<RansomHit[]> {
  try {
    const res = await fetch(`${API}/searchvictims/${encodeURIComponent(keyword)}`, { headers: UA, cache: "no-store" });
    if (!res.ok) return [];
    const arr = (await res.json()) as RwVictim[];
    return (Array.isArray(arr) ? arr : []).map(mapVictim)
      .sort((a, b) => new Date(b.discovered || 0).getTime() - new Date(a.discovered || 0).getTime());
  } catch { return []; }
}

function tally(items: string[], top = 6): { name: string; count: number }[] {
  const m = new Map<string, number>();
  for (const i of items) m.set(i, (m.get(i) ?? 0) + 1);
  return Array.from(m.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, top);
}

function timelineByDay(victims: RansomHit[], days: number): { date: string; count: number }[] {
  const buckets = new Map<string, number>();
  const today = new Date(); today.setUTCHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 86400000);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }
  for (const v of victims) {
    if (!v.discovered) continue;
    const key = new Date(v.discovered).toISOString().slice(0, 10);
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return Array.from(buckets.entries()).map(([date, count]) => ({ date, count }));
}
