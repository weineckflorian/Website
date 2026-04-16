import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { Reveal } from "@/components/Reveal";
import { GOOGLE_MAPS_PLACE_URL } from "@/config/maps";

const PHONE = "+491747120901";
const EMAIL = "info@schlüsselnotdienst-weineck.de";
const ADDRESS = "Laubenweg 3, 69123 Heidelberg";

export async function Contact() {
  const t = await getTranslations("Contact");

  return (
    <section
      id="kontakt"
      className="scroll-mt-24 bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">{t("subtitle")}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <a
            href={`tel:${PHONE}`}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
          >
            <Phone className="h-8 w-8 text-orange-600" aria-hidden />
            <span className="mt-4 text-sm font-medium text-slate-500">
              {t("phoneLabel")}
            </span>
            <span className="mt-1 text-lg font-semibold text-slate-900">
              +49 174 7120901
            </span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
          >
            <Mail className="h-8 w-8 text-orange-600" aria-hidden />
            <span className="mt-4 text-sm font-medium text-slate-500">
              {t("emailLabel")}
            </span>
            <span className="mt-1 text-lg font-semibold leading-snug text-slate-900 [overflow-wrap:anywhere] sm:whitespace-nowrap">
              info@<wbr />
              schlüsselnotdienst-weineck.de
            </span>
          </a>
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <MapPin className="h-8 w-8 text-orange-600" aria-hidden />
            <span className="mt-4 text-sm font-medium text-slate-500">
              {t("addressLabel")}
            </span>
            <span className="mt-1 text-lg font-semibold text-slate-900">
              {ADDRESS}
            </span>
            <p className="mt-4 text-sm text-slate-600">{t("hoursNote")}</p>
          </div>
        </div>

        <Reveal>
          <h3 className="mt-14 text-xl font-semibold text-slate-900">
            {t("mapHeading")}
          </h3>
        </Reveal>
        <GoogleMapEmbed
          title={t("mapIframeTitle")}
          linkLabel={t("mapLinkOpen")}
          placeUrl={GOOGLE_MAPS_PLACE_URL}
          consentHint={t("mapConsentHint")}
          loadMapLabel={t("mapLoadEmbed")}
        />
      </div>
    </section>
  );
}
