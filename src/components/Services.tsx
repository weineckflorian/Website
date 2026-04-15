import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

export async function Services() {
  const t = await getTranslations("Services");

  const blocks = [
    {
      key: "simple" as const,
      emphasis: "border-orange-200 bg-orange-50/50",
    },
    {
      key: "difficult" as const,
      emphasis: "border-slate-200 bg-white",
    },
    {
      key: "cylinder" as const,
      emphasis: "border-slate-200 bg-white",
    },
  ];

  const extraItems = t.raw("extra.items") as string[];

  return (
    <section
      id="leistungen"
      className="scroll-mt-24 border-b border-slate-200/80 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{t("subtitle")}</p>
          <p className="mt-6 text-base font-medium text-slate-800">{t("intro")}</p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {blocks.map(({ key, emphasis }) => {
            const bullets = t.raw(`${key}.bullets`) as string[];
            return (
              <article
                key={key}
                className={`flex flex-col rounded-2xl border-2 p-6 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md ${emphasis}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t(`${key}.title`)}
                  </h3>
                  <span className="shrink-0 rounded-full bg-ring px-3 py-1 text-sm font-bold text-white">
                    {t(`${key}.price`)}
                  </span>
                </div>
                <p className="mt-4 text-slate-600">{t(`${key}.description`)}</p>
                <ul className="mt-6 flex flex-col gap-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-slate-700">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-orange-600"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900">
            {t("extra.title")}
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {extraItems.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-slate-700">
                <span className="text-orange-600" aria-hidden>
                  •
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
