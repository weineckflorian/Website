"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const PHONE = "+491747120901";
const PHONE_DISPLAY = "+49 174 7120901";

export function Header() {
  const t = useTranslations("Nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#leistungen" as const, label: t("services") },
    { href: "#vorteile" as const, label: t("benefits") },
    { href: "#faq" as const, label: t("faq") },
    { href: "#bewertungen" as const, label: t("reviews") },
    { href: "#kontakt" as const, label: t("contact") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[box-shadow,border-color] duration-200 ${
        scrolled
          ? "border-slate-200/95 shadow-[0_8px_30px_-8px_rgb(15_23_42/0.12)]"
          : "border-slate-200/80 shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="transition-transform duration-200 hover:scale-[1.02]"
        >
          <Image
            src="/images/download-no-bg.png"
            alt="Schluesseldienst Florian Weineck"
            width={1500}
            height={426}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex"
          aria-label="Main"
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-[color,transform] duration-200 hover:-translate-y-px hover:text-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href={`tel:${PHONE}`}
            className="hidden items-center gap-2 rounded-full bg-ring px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {PHONE_DISPLAY}
          </a>
          <button
            type="button"
            className="inline-flex rounded-full border border-slate-200 p-2 text-ring md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="flex flex-col gap-3 px-4 py-4 text-base font-medium text-slate-800">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2 hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ring px-4 py-3 font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
