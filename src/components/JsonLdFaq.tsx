import { getTranslations } from "next-intl/server";

const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.schluesseldienst-rheinneckar.de"
).replace(/\/$/, "");

type Props = {
  locale: string;
};

/** FAQPage: only on pages that show the same FAQ content as markup. */
export async function JsonLdFaq({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "Faq" });
  const items = t.raw("items") as { q: string; a: string }[];

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
