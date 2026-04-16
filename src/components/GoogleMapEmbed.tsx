"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getGoogleMapsEmbedSrc } from "@/config/maps";
import { mapsEmbedAllowed, writeCookieConsent } from "@/lib/cookieConsent";

type Props = {
  title: string;
  linkLabel: string;
  placeUrl: string;
  consentHint: string;
  loadMapLabel: string;
};

/**
 * Loads the iframe only after optional consent and when near the viewport.
 */
export function GoogleMapEmbed({
  title,
  linkLabel,
  placeUrl,
  consentHint,
  loadMapLabel,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [mapsOk, setMapsOk] = useState(false);

  const syncConsent = useCallback(() => {
    setMapsOk(mapsEmbedAllowed());
  }, []);

  useEffect(() => {
    syncConsent();
    const onChange = () => syncConsent();
    window.addEventListener("fw-cookie-consent-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("fw-cookie-consent-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [syncConsent]);

  useEffect(() => {
    if (!mapsOk) return;
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc(getGoogleMapsEmbedSrc());
          io.disconnect();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mapsOk]);

  const activateMaps = () => {
    writeCookieConsent("all");
    setMapsOk(true);
  };

  return (
    <div ref={wrapRef} className="mt-4">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:aspect-[21/9]">
        {mapsOk && src ? (
          <iframe
            title={title}
            src={src}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : mapsOk && !src ? (
          <div
            className="absolute inset-0 animate-pulse bg-slate-200"
            aria-hidden
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
            <MapPin className="h-10 w-10 text-slate-400" aria-hidden />
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              {consentHint}
            </p>
            <button
              type="button"
              className="rounded-full bg-ring px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
              onClick={activateMaps}
            >
              {loadMapLabel}
            </button>
          </div>
        )}
      </div>
      <p className="mt-3 text-center">
        <a
          href={placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-ring underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
        >
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
          {linkLabel}
        </a>
      </p>
    </div>
  );
}
