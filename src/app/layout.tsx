import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import {
  SITE_NAME,
  SITE_URL,
  OG_DEFAULT,
  organizationLd,
  personLd,
} from "@/lib/content";
import HieloEnCasaChatWidget from "@/components/HieloEnCasaChatWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { JsonLd } from "@/components/Breadcrumbs";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "HieloEnCasa.com: Guía de Máquinas de Hielo de Sobremesa (Cubitos y Nugget) en Amazon EE. UU.",
    template: "%s | HieloEnCasa.com",
  },
  description:
    "Guía en español para elegir máquinas de hielo de sobremesa en Amazon Estados Unidos. Compara modelos de cubitos y de hielo tipo nugget según su precio, capacidad, tamaño y nivel de ruido para uso diario o reuniones en casa.",
  applicationName: SITE_NAME,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "es_US",
    siteName: SITE_NAME,
    url: `${SITE_URL}/`,
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "HieloEnCasa.com – Guía en Español de Máquinas de Hielo de Sobremesa en Amazon Estados Unidos",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [
      "google07464c8c60a81e7a",
      "172C7_Myoxhj0Y7awkbiE22513T05NSfBYUdmPFvxgY",
    ],
  },
  other: {
    "google-adsense-account": "ca-pub-1070738569472471",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0284C7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1070738569472471"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased selection:bg-[#38BDF8] selection:text-[#0F172A]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: `${SITE_URL}/`,
                name: SITE_NAME,
                inLanguage: "es",
                publisher: { "@id": `${SITE_URL}/#org` },
              },
              organizationLd,
              personLd,
            ],
          }}
        />
        {children}
        <HieloEnCasaChatWidget />
        <SmoothScroll />
      </body>
    </html>
  );
}
