"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readCookieConsent } from "@/lib/cookieConsent";

/** GA4 measurement IDs look like G-XXXXXXXXXX */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const GA_ID_VALID = Boolean(GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID));

export function GoogleAnalytics() {
  const [allowAnalytics, setAllowAnalytics] = useState(false);

  useEffect(() => {
    const sync = () => setAllowAnalytics(readCookieConsent() === "all");
    sync();
    window.addEventListener("fw-cookie-consent-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("fw-cookie-consent-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!GA_ID_VALID || !allowAnalytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="fw-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
