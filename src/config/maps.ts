/**
 * Google Maps embed (iframe src). From Google Maps: Share → Embed a map → copy the `src` URL.
 * Override with NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL in .env.local if Google updates the embed.
 *
 * Listing: Schlüsselnotdienst Florian Weineck (place id in pb string).
 */
export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Schl%C3%BCsselnotdienst+Florian+Weineck/@49.3864816,8.6461491,23484m/data=!3m2!1e3!4b1!4m6!3m5!1s0x499e3d9433856d19:0x9d06b933e1100581!8m2!3d49.3864816!4d8.646149!16s%2Fg%2F11z1wgjyvj?hl=de-DE";

/** Regional zoom (~23 km) similar to your Maps link; pin shows the business listing. */
export const GOOGLE_MAPS_EMBED_SRC_DEFAULT =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23484.0!2d8.646149!3d49.3864816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x499e3d9433856d19%3A0x9d06b933e1100581!2sSchl%C3%BCsselnotdienst%20Florian%20Weineck!5e0!3m2!1sde!2sde!4v1713038400000!5m2!1sde!2sde";

export function getGoogleMapsEmbedSrc(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
    GOOGLE_MAPS_EMBED_SRC_DEFAULT
  );
}
