import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

const SITE_URL = "https://terrapodsusa.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Terra Pods USA — One Pod. Every Market. Every Need.",
    template: "%s · Terra Pods USA",
  },
  description:
    "ADU-ready, code-certified prefab pods from $47,500. 25+ designs. 400+ units/month. Delivered anywhere in the US & Mexico from our Del Rio, TX bonded yard.",
  keywords: [
    "Terra Pods USA",
    "prefab pod",
    "ADU",
    "Section 8 housing",
    "container home",
    "AirBnB pod",
    "disaster relief housing",
    "modular home",
    "Del Rio Texas",
    "US Mexico prefab",
    "tiny home",
    "tax write-off pod",
  ],
  authors: [{ name: "Terra Pods USA" }],
  creator: "Terra Pods USA",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Terra Pods USA — One Pod. Every Market. Every Need.",
    description:
      "ADU-ready, code-certified prefab pods from $47,500. Delivered anywhere in the US & Mexico.",
    siteName: "Terra Pods USA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terra Pods USA — One Pod. Every Market. Every Need.",
    description:
      "ADU-ready, code-certified prefab pods from $47,500. Delivered anywhere in the US & Mexico.",
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
  themeColor: "#d44a26",
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
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Terra Pods USA",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.svg`,
              telephone: "+1-830-422-5062",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Del Rio",
                addressRegion: "TX",
                addressCountry: "US",
              },
              areaServed: ["US", "MX"],
            }),
          }}
        />
      </body>
    </html>
  );
}
