import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

type Props = {
  children: ReactNode;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://schluesselnotdienst-weineck.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Schlüsseldienst Heidelberg | Schlüsselnotdienst Florian Weineck",
  description:
    "Schlüsseldienst in Heidelberg und Rhein-Neckar: Türöffnung, Schlosswechsel und Einbruchschutz mit transparenten Festpreisen.",
  keywords: [
    "Schlüsseldienst Heidelberg",
    "Schlüsselnotdienst Heidelberg",
    "Türöffnung Heidelberg",
    "Schlosswechsel Heidelberg",
    "Einbruchschutz Heidelberg",
    "Schlüsseldienst Rhein-Neckar",
  ],
  alternates: {
    canonical: "/",
    languages: {
      de: "/de",
      en: "/en",
      "x-default": "/de",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Schlüsselnotdienst Florian Weineck",
    title: "Schlüsseldienst Heidelberg | Schlüsselnotdienst Florian Weineck",
    description:
      "Schnelle Hilfe bei Türöffnung und Schlossproblemen in Heidelberg und Umgebung.",
    images: [
      {
        url: "/images/heidelberg-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Schlüsseldienst Heidelberg Einsatzfahrzeug",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schlüsseldienst Heidelberg | Florian Weineck",
    description:
      "Türöffnung, Schlosswechsel und Notdienst im Raum Heidelberg.",
    images: ["/images/heidelberg-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
