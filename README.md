# FloWebsite

## Local development

```bash
npm install
npm run dev
```

## Cloudflare Pages (static export)

This project is configured for static export (`output: "export"`), so it can be deployed to Cloudflare Pages using the Next.js static workflow.

In Cloudflare Pages, use:

- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npx next build`
- Build output directory: `out`

### Environment variables for build

If you want Google reviews baked into the static build, set these in Cloudflare Pages:

- `GOOGLE_PLACES_API_KEY` (required for reviews)
- `GOOGLE_PLACE_ID` (recommended)
- Optional fallback: `GOOGLE_PLACES_PHONE`, `GOOGLE_PLACES_SEARCH_QUERY`
- `NEXT_PUBLIC_SITE_URL` (canonical URLs/sitemap base)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional — GA4 ID `G-…`, only loads after cookie “Accept all”; see `GOOGLE_ANALYTICS_SETUP.md`)
