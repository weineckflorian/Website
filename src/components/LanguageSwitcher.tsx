"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="inline-flex rounded-full border border-slate-200 bg-white p-0.5 text-xs font-semibold shadow-sm"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          className={
            locale === l
              ? "rounded-full bg-ring px-2.5 py-1 text-white transition-colors"
              : "rounded-full px-2.5 py-1 text-slate-600 transition-colors hover:text-ring"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
