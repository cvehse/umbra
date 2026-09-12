import { getGlobalDarkWeb } from "@/lib/live/darkweb";
import { PageHeader } from "@/components/ui/PageHeader";
import { RadarFeed } from "@/components/RadarFeed";

export const revalidate = 900;

export default async function RadarPage() {
  const dw = await getGlobalDarkWeb();
  const groups = dw.stats.topGroups.map((g) => g.name);

  return (
    <div>
      <PageHeader
        title="Dark Web Radar"
        subtitle="Live ransomware leak-site victims aggregated from 396+ groups' .onion blogs — search for any company, sector or domain"
      />
      <RadarFeed initialVictims={dw.victims} groups={groups} />
    </div>
  );
}
