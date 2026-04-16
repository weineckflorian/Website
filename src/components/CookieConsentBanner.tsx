"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { readCookieConsent, writeCookieConsent } from "@/lib/cookieConsent";

export function CookieConsentBanner() {
  const t = useTranslations("CookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      setVisible(readCookieConsent() === "none");
    };
    queueMicrotask(sync);
    window.addEventListener("fw-cookie-consent-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("fw-cookie-consent-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = (level: "essential" | "all") => {
    writeCookieConsent(level);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[90] sm:inset-x-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-5">
        <p className="text-sm leading-relaxed text-slate-700 sm:text-[15px]">
          {t("text")}{" "}
          <Link
            href="/datenschutz"
            className="font-medium text-ring underline underline-offset-4 hover:no-underline"
          >
            {t("privacyLink")}
          </Link>
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            onClick={() => save("essential")}
          >
            {t("essentialOnly")}
          </button>
          <button
            type="button"
            className="rounded-full bg-ring px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            onClick={() => save("all")}
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
