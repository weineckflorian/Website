type Props = {
  locale: string;
};

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://schluesselnotdienst-weineck.de";

export function JsonLd({ locale }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "@id": `${SITE}/#business`,
    name: "Schlüsselnotdienst Florian Weineck",
    description:
      locale === "de"
        ? "Türöffnungen und Schlossservice im Raum Heidelberg. Festpreise, Tag und Nacht."
        : "Door opening and lock services in the Heidelberg area. Fixed prices, 24/7.",
    url: SITE,
    telephone: "+491747120901",
    email: "info@schlüsselnotdienst-weineck.de",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Laubenweg 3",
      addressLocality: "Heidelberg",
      postalCode: "69123",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.40936,
      longitude: 8.69367,
    },
    areaServed: {
      "@type": "City",
      name: "Heidelberg",
    },
    priceRange: "€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    inLanguage: ["de", "en"],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
