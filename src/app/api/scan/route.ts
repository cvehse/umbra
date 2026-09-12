import { NextResponse } from "next/server";
import { scanDomain } from "@/lib/live/scan";

// GET /api/scan?domain=example.com
// Live, keyless domain exposure scan across free public intel sources.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain")?.trim();
  if (!domain) {
    return NextResponse.json({ error: "Provide ?domain=" }, { status: 400 });
  }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, ""))) {
    return NextResponse.json({ error: "That doesn't look like a valid domain." }, { status: 400 });
  }
  try {
    const result = await scanDomain(domain);
    return NextResponse.json(result, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Scan failed" },
      { status: 502 },
    );
  }
}
