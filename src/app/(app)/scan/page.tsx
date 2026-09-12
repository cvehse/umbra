import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ScanView } from "@/components/ScanView";
import { ScanParamBridge } from "@/components/ScanParamBridge";

export default function ScanPage() {
  return (
    <div>
      <PageHeader
        title="Domain Scan"
        subtitle="Type any domain to pull its real dark-web & breach exposure — live, from free public sources, no API key required"
      />
      <Suspense fallback={<ScanView />}>
        <ScanParamBridge />
      </Suspense>
    </div>
  );
}
