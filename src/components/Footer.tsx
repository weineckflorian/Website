import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-semibold text-white">{t("tagline")}</p>
            <p className="mt-1 text-sm text-slate-400">
              © {year}{" "}
              <a
                href="mailto:info@schlüsselnotdienst-weineck.de"
                className="underline decoration-slate-500 underline-offset-4 transition-colors hover:text-white"
              >
                Florian Weineck
              </a>
              . {t("rights")}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {t("designerLabel")}{" "}
              <a
                href="mailto:info@tim-strohmenger.de"
                className="underline decoration-slate-500 underline-offset-4 transition-colors hover:text-white"
              >
                Tim Strohmenger
              </a>
            </p>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm font-medium">
            <Link href="/faq" className="transition-colors hover:text-white">
              {t("faq")}
            </Link>
            <Link href="/impressum" className="transition-colors hover:text-white">
              {t("imprint")}
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-white">
              {t("privacy")}
            </Link>
          </nav>
        </div>
      </Reveal>
    </footer>
  );
}
