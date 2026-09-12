import type { ExposureSource, LeakCategory, Severity } from "@/lib/types";

// Relative time helper.
export function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  if (diff < 0) return "just now";
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.round(months / 12)}y ago`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function shortDate(isoDate: string): string {
  const d = new Date(isoDate);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export function dayLabel(isoDate: string): string {
  const d = new Date(isoDate);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

export function nf(n: number): string {
  return n.toLocaleString("en-US");
}

export function money(n?: number): string {
  if (n == null) return "—";
  return `$${n.toLocaleString("en-US")}`;
}

// ── Taxonomy: labels + colors ──────────────────────────────────────────────
export const severityMeta: Record<Severity, { label: string; color: string; bg: string; dot: string }> = {
  critical: { label: "Critical", color: "text-sev-critical", bg: "bg-sev-critical/12", dot: "bg-sev-critical" },
  high: { label: "High", color: "text-sev-high", bg: "bg-sev-high/12", dot: "bg-sev-high" },
  medium: { label: "Medium", color: "text-sev-medium", bg: "bg-sev-medium/12", dot: "bg-sev-medium" },
  low: { label: "Low", color: "text-sev-low", bg: "bg-sev-low/12", dot: "bg-sev-low" },
  info: { label: "Info", color: "text-sev-info", bg: "bg-sev-info/12", dot: "bg-sev-info" },
};

export const severityRank: Record<Severity, number> = {
  critical: 4, high: 3, medium: 2, low: 1, info: 0,
};

export const categoryMeta: Record<LeakCategory, { label: string; icon: string }> = {
  credentials: { label: "Credentials", icon: "KeyRound" },
  pii: { label: "PII Data", icon: "UserRound" },
  financial: { label: "Financial Data", icon: "CreditCard" },
  source_code: { label: "Source Code", icon: "Code2" },
  documents: { label: "Documents", icon: "FileText" },
  client_data: { label: "Client Data", icon: "Users" },
  api_keys: { label: "API Keys", icon: "Webhook" },
  session_tokens: { label: "Session Tokens", icon: "Cookie" },
  infrastructure: { label: "Infrastructure Access", icon: "Server" },
};

export const sourceMeta: Record<ExposureSource, { label: string }> = {
  breach: { label: "Data Breach" },
  stealer_log: { label: "Stealer Log" },
  combolist: { label: "Combolist" },
  paste: { label: "Paste Site" },
  forum: { label: "Dark Web Forum" },
  marketplace: { label: "Marketplace" },
  telegram: { label: "Telegram" },
  ransomware_blog: { label: "Ransomware Blog" },
};
