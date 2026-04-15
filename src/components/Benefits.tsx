import { Clock, Euro, Sun } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

const icons = [Clock, Euro, Sun];

export async function Benefits() {
  const t = await getTranslations("Benefits");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section
      id="vorteile"
      className="scroll-mt-24 border-b border-slate-200/80 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{t("subtitle")}</p>
        </Reveal>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Clock;
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3 text-orange-800">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
