import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

export async function SeoIntro() {
  const t = await getTranslations("SeoIntro");

  return (
    <section
      id="ueber-uns"
      aria-labelledby="seo-intro-heading"
      className="scroll-mt-24 border-b border-slate-200/80 bg-white py-14 sm:py-16"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h2
            id="seo-intro-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t("title")}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
