import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

const base =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.schluesseldienst-rheinneckar.de";

const routes = ["/", "/impressum", "/datenschutz"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          de: `${base}/de`,
          en: `${base}/en`,
          "x-default": `${base}/de`,
        },
      },
    },
  ];

  for (const href of routes) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = `${base}${getPathname({ locale, href })}`;
    }
    languages["x-default"] = `${base}${getPathname({ locale: routing.defaultLocale, href })}`;

    for (const locale of routing.locales) {
      out.push({
        url: `${base}${getPathname({ locale, href })}`,
        lastModified: new Date(),
        changeFrequency: href === "/" ? "weekly" : "monthly",
        priority: href === "/" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  return out;
}
