import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

export async function Faq() {
  const t = await getTranslations("Faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-b border-slate-200/80 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-lg text-slate-600">{t("subtitle")}</p>
        </Reveal>
        <div className="mt-10 flex flex-col gap-3">
          {items.map((item, i) => (
            <details
              key={item.q}
              name="faq"
              open={i === 0}
              className="faq-details group overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 shadow-sm transition-[border-color,background-color] duration-200 open:border-orange-200/80 open:bg-white hover:border-orange-200/60"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left text-base font-semibold text-slate-900 sm:px-5">
                <span>{item.q}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ease-out group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="faq-panel">
                <div className="faq-panel-inner border-t border-slate-200 bg-white px-4 py-4 text-slate-600 sm:px-5">
                  {item.a}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
