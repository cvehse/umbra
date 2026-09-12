import { NextResponse } from "next/server";
import { searchDarkWeb } from "@/lib/live/darkweb";

// GET /api/darkweb/search?q=keyword — search ransomware leak-site victims.
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ victims: [] });
  const victims = await searchDarkWeb(q);
  return NextResponse.json({ victims }, { headers: { "cache-control": "no-store" } });
}
