# Google Analytics 4 — setup checklist

The site loads GA **only after** visitors choose **„Alle akzeptieren“ / “Accept all”** in the cookie banner (same consent gate as the Google Maps embed).

## What you need to do

### 1. Create a GA4 property

1. Open [Google Analytics](https://analytics.google.com/) with the Google account that should own the property.
2. **Admin** (gear) → **Create** → **Property**, or use an existing property.
3. Under **Data collection** → **Data streams**, add a **Web** stream for `www.schluesseldienst-rheinneckar.de` (or your production hostname).
4. Copy the **Measurement ID** — it looks like `G-XXXXXXXXXX`.

### 2. Add the ID to Cloudflare Pages

1. Cloudflare Dashboard → **Workers & Pages** → your Pages project → **Settings** → **Environment variables**.
2. Add:

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` (your real ID) |

3. Apply to **Production** (and **Preview** if you want analytics on preview deployments).

`NEXT_PUBLIC_*` variables are baked in at **build** time for this stack. After changing them, trigger a **new deployment** (re-run the latest build or push a commit).

### 3. Local testing (optional)

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Run `npm run dev`, accept all cookies in the banner, then check **Realtime** in GA4 while you browse the site.

### 4. Privacy policy / legal

- Update your **Datenschutzerklärung** to describe Google Analytics (purpose, provider Google Ireland Ltd., legal basis consent, reference to Google’s privacy policy, opt-out options if you mention them).
- The cookie banner text currently focuses on the map; consider a short mention of analytics under “Accept all” if your lawyer agrees.

### 5. Verify production

After deploy: open the live site → accept all cookies → in GA4 **Reports** → **Realtime**, confirm your visit. Use DevTools → **Network** and filter `google-analytics` / `googletagmanager` to confirm scripts load only after consent.

---

**No env var set:** GA code is inactive; nothing is sent to Google.
