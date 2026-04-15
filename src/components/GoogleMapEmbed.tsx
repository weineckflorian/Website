"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getGoogleMapsEmbedSrc } from "@/config/maps";

type Props = {
  title: string;
  linkLabel: string;
  placeUrl: string;
};

/**
 * Loads the iframe only when near the viewport to avoid blocking the main thread on first paint.
 */
export function GoogleMapEmbed({ title, linkLabel, placeUrl }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={wrapRef} className="mt-4">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:aspect-[21/9]">
        {src ? (
          <iframe
            title={title}
            src={src}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div
            className="absolute inset-0 animate-pulse bg-slate-200"
            aria-hidden
          />
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
