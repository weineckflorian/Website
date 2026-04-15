"use client";

import { ExternalLink, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { GOOGLE_MAPS_PLACE_URL } from "@/config/maps";
import type { ReviewsPayload } from "@/lib/reviews";

function Stars({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4 sm:h-5 sm:w-5";
  return (
    <span className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${cls} ${
            i < Math.round(value)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </span>
  );
}

type Props = {
  data: ReviewsPayload;
};

export function ReviewsSection({ data }: Props) {
  const t = useTranslations("Reviews");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const n = data?.reviews?.length ?? 0;
    if (n === 0) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
    return () => cancelAnimationFrame(id);
  }, [data?.reviews?.length]);

  const reviews = data.reviews ?? [];
  const showCards = reviews.length > 0;

  return (
    <section
      id="bewertungen"
      className="scroll-mt-24 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{t("subtitle")}</p>
        </Reveal>

        {showCards ? (
          <>
            {data.rating != null && (
              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-amber-200/60 bg-amber-50/50 px-5 py-4">
                <span className="text-3xl font-bold tabular-nums text-slate-900">
                  {data.rating.toFixed(1)}
                </span>
                <Stars value={data.rating} />
                {data.user_ratings_total != null ? (
                  <span className="text-sm text-slate-600">
                    {t("basedOn", { count: data.user_ratings_total })}
                  </span>
                ) : null}
              </div>
            )}

            <div
              className={`reviews-scroller mt-10 flex gap-5 pb-2 sm:grid sm:grid-cols-2 sm:pb-0 lg:grid-cols-3 ${animate ? "reviews-animated" : ""}`.trim()}
            >
              {reviews.map((rev, i) => (
                <article
                  key={`${rev.author_name}-${i}`}
                  className="review-card group flex min-w-[min(100%,320px)] shrink-0 flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:min-w-0"
                  style={{ animationDelay: `${0.06 + i * 0.09}s` }}
                >
                  <div className="flex items-start gap-3">
                    {rev.profile_photo_url ? (
                      <Image
                        src={rev.profile_photo_url}
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white ring-offset-2 ring-offset-slate-50"
                        unoptimized
                      />
                    ) : (
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ring text-sm font-bold text-white"
                        aria-hidden
                      >
                        {rev.author_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">
                        {rev.author_name}
                      </p>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2">
                        <Stars value={rev.rating} size="sm" />
                        <span className="text-xs text-slate-500">
                          {rev.relative_time_description}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700 line-clamp-6">
                    {rev.text}
                  </p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center text-slate-600">
            {data.configured === false
              ? t("missingKey")
              : data.placeResolved === false
                ? t("placeNotFound")
                : t("empty")}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <a
            href={GOOGLE_MAPS_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-ring underline-offset-4 hover:underline"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            {t("openOnGoogle")}
          </a>
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <svg
              viewBox="0 0 272 92"
              className="h-4 w-16 shrink-0"
              aria-hidden
            >
              <title>Google</title>
              <path
                fill="#4285F4"
                d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
              />
              <path
                fill="#EA4335"
                d="M163.75 47.18c0 12.77-9.9 22.18-22 22.18-12.1 0-22-9.41-22-22.18s9.9-22.18 22-22.18c12.1 0 22 9.41 22 22.18zm-9.6 0c0-7.98-5.78-13.44-12.5-13.44S129.15 39.2 129.15 47.18c0 7.9 5.78 13.44 12.5 13.44s12.5-5.55 12.5-13.44z"
              />
              <path
                fill="#FBBC05"
                d="M209.75 26.34v39.82c0 16.38-9.66 23.16-21.08 23.16-10.75 0-17.31-7.24-19.75-13.07l8.57-3.59c1.51 3.65 5.21 7.98 11.18 7.98 7.31 0 12.01-4.51 12.01-15.07V49.1h-.34c-2.2 2.75-6.39 5.18-11.68 5.18-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.43 11.68 5.18h.34v-3.87h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
              />
              <path fill="#34A853" d="M225 3v65h-9V3h9z" />
              <path
                fill="#4285F4"
                d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 13.93z"
              />
              <path
                fill="#EA4335"
                d="M35.29 41.41V32H67c.31 1.9.47 3.77.47 5.88 0 7.27-2.5 16.3-10.56 22.66C50.85 65.69 43.62 68 35.35 68c-13.19 0-24.68-9.01-24.68-24.03C10.67 28.95 22.18 20 35.35 20c7.27 0 13.19 2.5 17.6 6.85l-6.03 5.85c-3.77-3.62-8.9-5.38-14.24-5.38-9.01 0-16.3 6.22-16.3 15.65 0 9.42 7.27 15.63 16.3 15.63 5.85 0 9.17-2.35 11.34-4.5 1.73-1.62 2.87-3.93 3.32-7.09H35.29z"
              />
            </svg>
            <span>{t("googleAttribution")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
