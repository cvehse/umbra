"use client";

import { useSearchParams } from "next/navigation";
import { ScanView } from "@/components/ScanView";

// Reads ?domain= (set by the topbar search / shareable links) and seeds the scan.
export function ScanParamBridge() {
  const params = useSearchParams();
  const domain = params.get("domain") ?? "";
  return <ScanView key={domain} initialDomain={domain} />;
}
