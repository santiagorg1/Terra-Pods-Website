import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = "https://terrapods.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Terra Pods — Architectural Living Pods, Engineered for Life",
    template: "%s · Terra Pods",
  },
  description:
    "Terra Pods designs and manufactures premium prefabricated living pods. Off-grid capable, architecturally crafted, delivered ready to inhabit.",
  keywords: [
    "Terra Pods",
    "prefab home",
    "modular pod",
    "luxury tiny home",
    "off-grid living",
    "ADU",
    "backyard studio",
    "sustainable architecture",
  ],
  authors: [{ name: "Terra Pods" }],
  creator: "Terra Pods",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Terra Pods — Architectural Living Pods",
    description:
      "Premium prefabricated living pods. Off-grid capable, architecturally crafted, delivered ready to inhabit.",
    siteName: "Terra Pods",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terra Pods — Architectural Living Pods",
    description:
      "Premium prefabricated living pods. Off-grid capable, architecturally crafted, delivered ready to inhabit.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen antialiased">
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
              name: "Terra Pods",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.svg`,
              sameAs: [
                "https://instagram.com/terrapods",
                "https://twitter.com/terrapods",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
