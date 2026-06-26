import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nabrix — AI-Powered Neighborhood Reports for Real Estate Agents",
  description:
    "Join the waitlist for Nabrix. Generate stunning, branded neighborhood reports in seconds using AI. Save hours of research and impress your clients.",
  keywords: [
    "real estate",
    "neighborhood reports",
    "AI reports",
    "real estate marketing",
    "Nabrix",
  ],
  openGraph: {
    title: "Nabrix — AI-Powered Neighborhood Reports",
    description:
      "Generate stunning, branded neighborhood reports in seconds. Join the waitlist.",
    type: "website",
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={}>
      <head>
        {GA_ID && (
          <>
            <Script
              src={}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
