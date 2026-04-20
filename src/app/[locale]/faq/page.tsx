import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { JsonLdFaq } from "@/components/JsonLdFaq";
import { Link, getPathname } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "FaqPageMeta" });
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.schluesseldienst-rheinneckar.de"
  ).replace(/\/$/, "");
  const path = getPathname({ locale, href: "/faq" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        de: `${base}${getPathname({ locale: "de", href: "/faq" })}`,
        en: `${base}${getPathname({ locale: "en", href: "/faq" })}`,
        "x-default": `${base}${getPathname({ locale: "de", href: "/faq" })}`,
      },
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");
  const tNav = await getTranslations("Nav");

  return (
    <>
      <JsonLdFaq locale={locale} />
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ring focus:shadow-lg focus:outline-none"
      >
        {tNav("skipToContent")}
      </a>
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-orange-700 hover:underline"
          >
            ← {t("backHome")}
          </Link>
        </div>
        <Faq standalonePage />
      </main>
      <Footer />
    </>
  );
}
