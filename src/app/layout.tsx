import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umbra — Dark Web Threat Intelligence | CVE House",
  description:
    "Continuous dark web monitoring for breached credentials, leaked PII, financial data, source code, and ransomware exposure targeting your domain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
