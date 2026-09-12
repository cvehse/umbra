// Domain types for Umbra. These mirror prisma/schema.prisma so the demo
// in-memory store and a future Prisma-backed store are interchangeable.

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type Plan = "free" | "starter" | "business" | "enterprise";

export type AssetType =
  | "domain"
  | "subdomain"
  | "ip"
  | "keyword"
  | "executive"
  | "brand"
  | "bin";

export type LeakCategory =
  | "credentials"
  | "pii"
  | "financial"
  | "source_code"
  | "documents"
  | "client_data"
  | "api_keys"
  | "session_tokens"
  | "infrastructure";

export type ExposureSource =
  | "breach"
  | "stealer_log"
  | "combolist"
  | "paste"
  | "forum"
  | "marketplace"
  | "telegram"
  | "ransomware_blog";

export type AlertStatus = "new" | "investigating" | "resolved" | "false_positive";

export interface Organization {
  id: string;
  name: string;
  domain: string;
  plan: Plan;
  createdAt: string;
}

export interface MonitoredAsset {
  id: string;
  type: AssetType;
  value: string;
  label?: string;
  active: boolean;
  createdAt: string;
}

export interface Exposure {
  id: string;
  email: string;
  username?: string;
  passwordType?: "plaintext" | "md5" | "sha1" | "sha256" | "bcrypt" | null;
  passwordHint?: string;
  ipAddress?: string;
  source: ExposureSource;
  sourceName: string;
  breachDate?: string;
  discoveredAt: string;
  severity: Severity;
  fields: string[];
  isNew: boolean;
}

export interface DarkWebMention {
  id: string;
  source: ExposureSource;
  channel: string;
  actor: string;
  title: string;
  snippet: string;
  url?: string;
  language: string;
  severity: Severity;
  postedAt: string;
  discoveredAt: string;
}

export interface LeakedAsset {
  id: string;
  category: LeakCategory;
  title: string;
  description: string;
  source: ExposureSource;
  sourceName: string;
  recordCount?: number;
  priceUsd?: number;
  severity: Severity;
  discoveredAt: string;
}

export interface AlertRule {
  id: string;
  name: string;
  category?: LeakCategory;
  minSeverity: Severity;
  channels: ("email" | "slack" | "webhook")[];
  enabled: boolean;
}

export interface Alert {
  id: string;
  title: string;
  detail: string;
  severity: Severity;
  status: AlertStatus;
  category?: LeakCategory;
  refType?: "exposure" | "mention" | "leak";
  refId?: string;
  createdAt: string;
}

export interface TimePoint {
  date: string;
  exposures: number;
  mentions: number;
}

// Aggregate payload the dashboard consumes.
export interface IntelSnapshot {
  org: Organization;
  riskScore: number; // 0-100
  riskTrend: number; // delta vs last period
  assets: MonitoredAsset[];
  exposures: Exposure[];
  mentions: DarkWebMention[];
  leaks: LeakedAsset[];
  alerts: Alert[];
  rules: AlertRule[];
  timeline: TimePoint[];
}
