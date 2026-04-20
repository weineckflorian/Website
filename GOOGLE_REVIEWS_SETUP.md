# Google Maps reviews — setup checklist

> Status: Aktuell nutzt die Website statische Bewertungen (Stand 20.04.2026).  
> Eine Google-Places-API-Integration ist derzeit nicht aktiv.

The homepage **Bewertungen / Reviews** section shows Google Maps reviews. They are fetched **at build time** (static export), not in the visitor’s browser.

- **No API key:** the build shows **mock** placeholder reviews and the yellow notice in that section.
- **With a valid key and place:** the build calls the **Google Places API** and bakes the latest snapshot into the exported HTML.

Implementation reference: `src/lib/reviews.ts`, `src/app/[locale]/page.tsx`, `src/components/ReviewsSection.tsx`.

---

## 1. Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **new project** (or select an existing one) used for this website.

---

## 2. Billing

1. In the project, open **Billing** and link a **billing account**.

Places API usage is billed. Without an active billing account, API calls usually fail.

---

## 3. Enable Places API

1. Go to **APIs & Services → Library**.
2. Search for **Places API** (the API used by `https://maps.googleapis.com/maps/api/place/...`).
3. Click **Enable**.

The app uses **Place Details**, **Find Place from Text**, and **Text Search** on the classic Places endpoints — enabling **Places API** is what you need for those URLs.

---

## 4. Create an API key

1. Go to **APIs & Services → Credentials**.
2. **Create credentials → API key**.
3. **Restrict the key** (recommended):
   - Under **API restrictions**, choose **Restrict key** and allow **Places API** only.
   - Under **Application restrictions**, choose what fits your setup. The key is only used during **CI / Cloudflare build**, not in the browser; IP-based restrictions can be tricky on shared build runners, so teams often rely on **API restrictions** plus a dedicated low-scope key.

Treat `GOOGLE_PLACES_API_KEY` as **secret**. Do **not** prefix it with `NEXT_PUBLIC_` and do **not** commit it to git.

---

## 5. Get the Place ID (strongly recommended)

1. Open the correct business listing on [Google Maps](https://www.google.com/maps).
2. Use Google’s tools to find the **Place ID** (e.g. [Place ID finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) or search “Google Place ID finder”).
3. Copy the **Place ID** string (starts with `ChIJ…` or similar).

Setting **`GOOGLE_PLACE_ID`** avoids picking the wrong business when names or phones are ambiguous.

---

## 6. Environment variables

Set these where the site **builds** (e.g. **Cloudflare Pages → your project → Settings → Environment variables**). For local builds, use `.env.local` (never commit real keys).

| Name | Required | Purpose |
|------|----------|---------|
| `GOOGLE_PLACES_API_KEY` | **Yes** for real reviews | Secret API key from step 4 |
| `GOOGLE_PLACE_ID` | **Strongly recommended** | Exact Maps listing |
| `GOOGLE_PLACES_PHONE` | Optional | Fallback: find place by phone (E.164, e.g. `+491234567890`) |
| `GOOGLE_PLACES_SEARCH_QUERY` | Optional | Fallback text search if phone lookup fails |

Resolution order in code: **`GOOGLE_PLACE_ID`** → else phone lookup → else text search (see `src/lib/reviews.ts`).

---

## 7. Cloudflare Pages

1. **Workers & Pages** → your Pages project → **Settings** → **Environment variables**.
2. Add `GOOGLE_PLACES_API_KEY` (and preferably `GOOGLE_PLACE_ID`).
3. Apply to **Production** (and **Preview** if preview builds should show real reviews too).

`GOOGLE_PLACES_*` variables are read during **`next build`**. After changing them, trigger a **new deployment** (re-run build or push a commit).

---

## 8. Local testing (optional)

In the project root, `.env.local`:

```bash
GOOGLE_PLACES_API_KEY=your_key_here
GOOGLE_PLACE_ID=ChIJ...
```

Then:

```bash
npm run build
```

Inspect the **Bewertungen** section in the built site or run `npm run dev` after a successful fetch path. Google’s **Place Details** response typically includes **up to five** reviews per request; counts and full list still live on Google Maps.

---

## 9. Troubleshooting

| Symptom | What to check |
|---------|----------------|
| Mock / placeholder reviews | `GOOGLE_PLACES_API_KEY` missing or empty at **build** time |
| Empty state / “place not found” style message | Wrong or missing `GOOGLE_PLACE_ID`; or phone/query not matching the listing |
| Build errors or `REQUEST_DENIED` | Billing disabled, Places API not enabled, or API key restrictions blocking Places |
| Reviews in English on `/de` | Place Details uses the page locale for `language=`; if something looks off, confirm build runs per locale as expected |

---

## 10. Attribution and privacy

- Google requires proper **attribution**; the reviews section already includes a Google attribution line (`ReviewsSection`).
- Update **Impressum** and **Datenschutzerklärung** as needed (third-party Google, server-side API calls at build time, etc.).

---

## 11. Yellow “placeholder” notice

The amber banner text comes from `Reviews.mockNotice` in `messages/de.json` and `messages/en.json`. After live reviews work, **rewrite** that copy so visitors are not told reviews are placeholders. (The UI currently always shows that block; adjust translations or the component if you want it only before going live.)

---

## Quick reference

- **Secret:** `GOOGLE_PLACES_API_KEY` — Cloudflare **encrypted** / not `NEXT_PUBLIC_`.
- **Recommended:** `GOOGLE_PLACE_ID`.
- **After any change:** new **build + deploy**.

Also documented briefly in `README.md` under **Environment variables for build**.
