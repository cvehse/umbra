import { NextResponse } from "next/server";
import { searchCVEs } from "@/lib/live/cve";

// GET /api/cve?q=apache  (or a CVE id, e.g. CVE-2024-3094)
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ items: [] });
  const items = await searchCVEs(q);
  return NextResponse.json({ items }, { headers: { "cache-control": "no-store" } });
}
