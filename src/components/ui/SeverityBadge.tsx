import clsx from "clsx";
import { severityMeta } from "@/lib/format";
import type { Severity } from "@/lib/types";

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const m = severityMeta[severity];
  return (
    <span className={clsx("chip", m.bg, m.color, className)}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", m.dot)} />
      {m.label}
    </span>
  );
}

export function SeverityDot({ severity }: { severity: Severity }) {
  return <span className={clsx("inline-block h-2 w-2 rounded-full", severityMeta[severity].dot)} />;
}
