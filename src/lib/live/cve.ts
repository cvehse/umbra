// ── Vulnerability Intelligence (CVEs) ──────────────────────────────────────
// Real CVE data from NVD (National Vulnerability Database), free & keyless.
// A free NVD_API_KEY raises rate limits; set it in .env.local to enable
// heavier querying. Clearnet HTTPS only.

import type { Severity } from "@/lib/types";

const UA = { "user-agent": "Umbra-ThreatIntel/1.0" };
const API = "https://services.nvd.nist.gov/rest/json/cves/2.0";

export interface CveItem {
  id: string;
  published?: string;
  lastModified?: string;
  cvss?: number;
  severity: Severity;
  vector?: string;
  description: string;
  cwe?: string;
  refs: string[];
  source?: string;
}

interface NvdMetricEntry { cvssData?: { baseScore?: number; baseSeverity?: string; vectorString?: string } }
interface NvdCve {
  cve: {
    id: string; published?: string; lastModified?: string; sourceIdentifier?: string;
    descriptions?: { lang: string; value: string }[];
    metrics?: { cvssMetricV31?: NvdMetricEntry[]; cvssMetricV30?: NvdMetricEntry[]; cvssMetricV2?: NvdMetricEntry[] };
    weaknesses?: { description?: { lang: string; value: string }[] }[];
    references?: { url: string }[];
  };
}

function sevFromScore(score?: number, label?: string): Severity {
  if (label) {
    const l = label.toLowerCase();
    if (l === "critical") return "critical";
    if (l === "high") return "high";
    if (l === "medium") return "medium";
    if (l === "low") return "low";
  }
  if (score == null) return "info";
  if (score >= 9) return "critical";
  if (score >= 7) return "high";
  if (score >= 4) return "medium";
  if (score > 0) return "low";
  return "info";
}

function normalize(v: NvdCve): CveItem {
  const c = v.cve;
  const m = c.metrics?.cvssMetricV31?.[0] || c.metrics?.cvssMetricV30?.[0] || c.metrics?.cvssMetricV2?.[0];
  const cvss = m?.cvssData?.baseScore;
  const severity = sevFromScore(cvss, m?.cvssData?.baseSeverity);
  const description = c.descriptions?.find((d) => d.lang === "en")?.value || c.descriptions?.[0]?.value || "(no description)";
  const cwe = c.weaknesses?.[0]?.description?.find((d) => d.lang === "en")?.value;
  return {
    id: c.id, published: c.published, lastModified: c.lastModified,
    cvss, severity, vector: m?.cvssData?.vectorString, description,
    cwe: cwe && cwe.startsWith("CWE") ? cwe : undefined,
    refs: (c.references || []).slice(0, 5).map((r) => r.url),
    source: c.sourceIdentifier,
  };
}

async function query(params: string): Promise<CveItem[]> {
  const key = process.env.NVD_API_KEY;
  const headers: Record<string, string> = { ...UA };
  if (key) headers.apiKey = key;
  const res = await fetch(`${API}?${params}`, { headers, next: { revalidate: 1800 } });
  if (!res.ok) throw new Error(`NVD ${res.status}`);
  const data = (await res.json()) as { vulnerabilities?: NvdCve[]; totalResults?: number };
  return (data.vulnerabilities || []).map(normalize);
}

export async function getRecentCVEs(): Promise<CveItem[]> {
  try {
    const end = new Date();
    const start = new Date(end.getTime() - 8 * 86400000);
    const params = `pubStartDate=${encodeURIComponent(start.toISOString())}&pubEndDate=${encodeURIComponent(end.toISOString())}&resultsPerPage=60`;
    const items = await query(params);
    return items.sort((a, b) =>
      (b.cvss ?? 0) - (a.cvss ?? 0) ||
      new Date(b.published || 0).getTime() - new Date(a.published || 0).getTime(),
    );
  } catch {
    return [];
  }
}

export async function searchCVEs(keyword: string): Promise<CveItem[]> {
  const kw = keyword.trim();
  if (!kw) return [];
  try {
    // Exact CVE id lookup, else keyword search.
    if (/^cve-\d{4}-\d+$/i.test(kw)) {
      return await query(`cveId=${encodeURIComponent(kw.toUpperCase())}`);
    }
    const items = await query(`keywordSearch=${encodeURIComponent(kw)}&resultsPerPage=40`);
    return items.sort(
      (a, b) => new Date(b.published || 0).getTime() - new Date(a.published || 0).getTime(),
    );
  } catch {
    return [];
  }
}
