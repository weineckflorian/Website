import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://schluesselnotdienst-weineck.de";

  return {
    title: {
      default: t("title"),
      template: `%s · Florian Weineck`,
    },
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    metadataBase: new URL(base),
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      siteName: "Schlüsselnotdienst Florian Weineck",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
        "x-default": "/de",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html className={`${dmSans.variable} h-full scroll-smooth`} lang={locale}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <JsonLd locale={locale} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
