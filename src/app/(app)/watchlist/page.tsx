import { PageHeader } from "@/components/ui/PageHeader";
import { Watchlist } from "@/components/Watchlist";

export default function WatchlistPage() {
  return (
    <div>
      <PageHeader
        title="Watchlist"
        subtitle="Continuously monitor your organization's domains — each is scanned live for breach, dark-web and attack-surface exposure"
      />
      <Watchlist />
    </div>
  );
}
