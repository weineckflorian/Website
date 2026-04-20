import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { JsonLdLocksmith } from "@/components/JsonLd";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.schluesseldienst-rheinneckar.de"
  ).replace(/\/$/, "");
  const baseUrl = new URL(`${base}/`);
  const homePath = getPathname({ locale, href: "/" });
  const twitterSite = process.env.NEXT_PUBLIC_TWITTER_SITE?.trim();

  return {
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      shortcut: ["/icon.svg"],
      apple: [{ url: "/icon.svg" }],
    },
    title: {
      default: t("title"),
      template: `%s · Florian Weineck`,
    },
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    metadataBase: baseUrl,
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      siteName: "Schlüsselnotdienst Florian Weineck",
      url: new URL(homePath, baseUrl).toString(),
    },
    twitter: {
      card: "summary_large_image",
      ...(twitterSite ? { site: twitterSite } : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${base}${homePath}`,
      languages: {
        de: `${base}${getPathname({ locale: "de", href: "/" })}`,
        en: `${base}${getPathname({ locale: "en", href: "/" })}`,
        "x-default": `${base}${getPathname({ locale: "de", href: "/" })}`,
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
    <div
      className={`${dmSans.variable} min-h-full scroll-smooth font-sans antialiased`}
      lang={locale}
    >
      <JsonLdLocksmith locale={locale} />
      <NextIntlClientProvider messages={messages}>
        {children}
        <CookieConsentBanner />
        <GoogleAnalytics />
      </NextIntlClientProvider>
    </div>
  );
}
