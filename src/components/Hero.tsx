"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

const PHONE = "+491747120901";

export function Hero() {
  const t = useTranslations("Hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [hiResReady, setHiResReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.min(Math.max(-rect.top / viewport, 0), 1);
      section.style.setProperty("--hero-scroll-progress", progress.toFixed(3));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden border-b border-slate-200/80"
      style={{ ["--hero-scroll-progress" as string]: 0 }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/heidelberg-hero-sm.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={60}
            sizes="100vw"
            className="hero-scroll-image -scale-x-100 object-cover object-[center_35%] blur-[2px] sm:object-center"
            aria-hidden
          />
          <Image
            src="/images/heidelberg-hero.jpg"
            alt={t("imageAlt")}
            fill
            loading="lazy"
            quality={72}
            sizes="100vw"
            onLoad={() => setHiResReady(true)}
            className={`hero-scroll-image -scale-x-100 object-cover object-[center_35%] transition-opacity duration-700 ease-out sm:object-center ${
              hiResReady ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/75 to-slate-900/25 sm:from-slate-950/88 sm:via-slate-900/60"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30"
          aria-hidden
        />
      </div>

      <div className="hero-scroll-content relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-20 text-white sm:px-6">
        <div className="max-w-3xl">
          <p className="hero-line hero-line-1 mb-3 text-sm font-semibold uppercase tracking-widest text-amber-100/95">
            {t("eyebrow")}
          </p>
          <h1 className="hero-line hero-title max-w-3xl text-4xl font-bold leading-tight tracking-tight drop-shadow-sm sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="hero-line hero-subtitle mt-6 max-w-2xl text-lg leading-relaxed text-slate-100/95 sm:text-xl">
            {t("subtitle")}
          </p>
          <p className="hero-line hero-line-4 mt-4 max-w-2xl text-sm font-medium text-slate-200/90 sm:text-base">
            {t("trustLine")}
          </p>
          <div className="hero-line hero-line-5 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b45309] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-black/25 ring-1 ring-white/15 transition-transform duration-200 hover:bg-[#c2410c] active:scale-[0.98] sm:hover:scale-[1.02]"
              aria-label={t("phoneAria")}
            >
              <Phone className="h-5 w-5 shrink-0" aria-hidden />
              {t("ctaCall")}
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/12 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 active:scale-[0.98] sm:hover:scale-[1.02]"
            >
              {t("ctaServices")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
