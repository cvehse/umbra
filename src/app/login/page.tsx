import Link from "next/link";
import { ShieldHalf, ArrowRight, Radio, KeyRound, Database, Bell } from "lucide-react";

const highlights = [
  { icon: KeyRound, text: "Breached & stealer-logged credentials" },
  { icon: Database, text: "Leaked PII, financial, source-code & client data" },
  { icon: Radio, text: "Threat-actor chatter & ransomware leak sites" },
  { icon: Bell, text: "Real-time alerts the moment you surface" },
];

export default function LoginPage() {
  return (
    <div className="umbra-bg grid min-h-screen lg:grid-cols-2">
      {/* Left: brand / value prop */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 shadow-glow">
            <ShieldHalf className="h-6 w-6 text-brand-soft" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-ink">Umbra</div>
            <div className="text-[10px] uppercase tracking-widest text-ink-faint">by CVE House</div>
          </div>
        </Link>

        <div className="max-w-md">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink">
            Know what the dark web knows about your company.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Umbra continuously sweeps breach dumps, stealer logs, forums, markets, paste sites,
            Telegram and ransomware leak sites for your domain&apos;s fingerprints — and alerts you
            before attackers act on them.
          </p>
          <ul className="mt-6 space-y-3">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-ink-soft">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/12 text-brand-soft">
                  <Icon size={16} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-ink-faint">© 2026 CVE House · Dark Web Threat Intelligence</div>
      </div>

      {/* Right: sign-in */}
      <div className="flex items-center justify-center p-6">
        <div className="panel w-full max-w-sm p-7">
          <div className="mb-1 flex items-center gap-2 lg:hidden">
            <ShieldHalf className="h-6 w-6 text-brand-soft" />
            <span className="text-lg font-semibold text-ink">Umbra</span>
          </div>
          <h2 className="text-lg font-semibold text-ink">Sign in to Umbra</h2>
          <p className="mt-1 text-sm text-ink-faint">Access your organization&apos;s threat intelligence.</p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Work email</label>
              <input
                type="email"
                defaultValue="analyst@northwind-aero.com"
                className="w-full rounded-lg border border-base-700 bg-base-850 px-3 py-2.5 text-sm text-ink focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-soft">Password</label>
              <input
                type="password"
                defaultValue="demo-password"
                className="w-full rounded-lg border border-base-700 bg-base-850 px-3 py-2.5 text-sm text-ink focus:border-brand/60 focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <Link href="/" className="btn-primary w-full">
              Enter dashboard <ArrowRight size={16} />
            </Link>
          </form>

          <div className="mt-4 rounded-lg border border-base-800 bg-base-850/50 p-3 text-center text-xs text-ink-faint">
            Demo mode · no credentials required — just click <span className="text-ink-soft">Enter dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
