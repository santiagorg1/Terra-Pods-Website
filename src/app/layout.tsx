import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://isnbroker.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ISN Customs Broker International — Take Control of Your Border",
    template: "%s · ISN Customs Broker",
  },
  description:
    "Licensed U.S. Customs Brokerage, Freight Forwarding, and Logistics — simplified through a single point of contact and 35 years on the U.S.–Mexico border. C-TPAT validated. RLF nationwide. 24/7 operations.",
  keywords: [
    "customs broker",
    "U.S. customs brokerage",
    "freight forwarding",
    "logistics",
    "Del Rio Texas",
    "U.S. Mexico border",
    "C-TPAT",
    "ACE entries",
    "ISF filing",
    "bonded warehouse",
    "cross-border trade",
  ],
  authors: [{ name: "ISN Customs Broker International" }],
  creator: "ISN Customs Broker International",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ISN Customs Broker International",
    description:
      "Licensed U.S. customs brokerage, freight forwarding, and logistics. 35 years on the U.S.–Mexico border. One team. One invoice.",
    siteName: "ISN Customs Broker",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISN Customs Broker International",
    description:
      "Licensed U.S. customs brokerage, freight forwarding, and logistics. 35 years on the U.S.–Mexico border.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#04060b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-ink-950 antialiased">
        <SmoothScroll />
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ISN Customs Broker International",
              url: SITE_URL,
              logo: `${SITE_URL}/isn/logo-isn.png`,
              telephone: "+1-830-775-1666",
              email: "isn@isnbroker.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "594 Industrial Blvd, Unit A",
                addressLocality: "Del Rio",
                addressRegion: "TX",
                postalCode: "78840",
                addressCountry: "US",
              },
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
