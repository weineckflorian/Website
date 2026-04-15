"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "fw_cookie_consent_v1";

export function CookieConsentBanner() {
  const t = useTranslations("CookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (!value) {
      queueMicrotask(() => setVisible(true));
    }
  }, []);

  const saveConsent = (value: "accepted" | "declined") => {
    window.localStorage.setItem(CONSENT_KEY, value);
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
            onClick={() => saveConsent("declined")}
          >
            {t("decline")}
          </button>
          <button
            type="button"
            className="rounded-full bg-ring px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            onClick={() => saveConsent("accepted")}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
