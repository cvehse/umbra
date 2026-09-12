import { getRecentCVEs } from "@/lib/live/cve";
import { PageHeader } from "@/components/ui/PageHeader";
import { CveView } from "@/components/CveView";

export const revalidate = 1800;

export default async function VulnerabilitiesPage() {
  const recent = await getRecentCVEs();
  return (
    <div>
      <PageHeader
        title="Vulnerability Intelligence"
        subtitle="Live CVE feed from the National Vulnerability Database — track newly published flaws and search by product, vendor or CVE id"
      />
      <CveView recent={recent} />
    </div>
  );
}
