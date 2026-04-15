import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  pathnames: {
    "/": "/",
    /** Same path for all locales so static export matches `app/[locale]/…` folders and Footer links. */
    "/impressum": "/impressum",
    "/datenschutz": "/datenschutz",
  },
});
