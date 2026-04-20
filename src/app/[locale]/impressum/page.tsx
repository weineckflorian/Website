import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalPageContent } from "@/components/LegalPageContent";
import { Link, getPathname } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.schluesseldienst-rheinneckar.de"
  ).replace(/\/$/, "");
  const path = getPathname({ locale, href: "/impressum" });

  return {
    title: t("impressumTitle"),
    description: t("impressumDescription"),
    alternates: {
      canonical: `${base}${path}`,
      languages: {
        de: `${base}${getPathname({ locale: "de", href: "/impressum" })}`,
        en: `${base}${getPathname({ locale: "en", href: "/impressum" })}`,
        "x-default": `${base}${getPathname({ locale: "de", href: "/impressum" })}`,
      },
    },
  };
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href="/"
            className="text-sm font-medium text-orange-700 hover:underline"
          >
            ← {t("backHome")}
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            {t("impressumTitle")}
          </h1>
          <LegalPageContent locale={locale} namespace="ImpressumPage" />
        </article>
      </main>
      <Footer />
    </>
  );
}
