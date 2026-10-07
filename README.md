# PhoenixTechs — landing page

Next.js (App Router) + Three.js.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure
- `app/[lang]/page.jsx` — page composition, served at `/en` and `/ar` (`proxy.js` redirects `/` by browser language) (Hero → Solutions → Products → Get started → Footer)
- `components/` — one component per section; `LeadForm.jsx` powers both forms
- `components/Experience.jsx` — background scene, nav state, gentle fade-in reveals
- `lib/scene.js` — WebGL scene (planet horizon, giant word, embers). Scroll poses live in `KEYS`.
- `app/api/lead/route.js` — receives form submissions and stores them
- `app/[lang]/dashboard/page.jsx` — leads dashboard (shadcn table)

## Leads
Submissions are saved to `data/leads.json` (gitignored) and listed at `/dashboard`.
Copy `.env.example` to `.env.local` to set:

- `LEAD_WEBHOOK_URL` — also forward each lead (Formspree, Make/Zapier, Slack, CRM…). Optional.
- `DASHBOARD_PASSWORD` — lock `/dashboard`. Leave empty while you are working locally.

## Logo
`npm run logo` regenerates `public/logo*.svg`, `public/favicon.svg` and `components/logo-svg.js`
from `scripts/build-logo.mjs` (text is outlined, so the SVGs need no fonts).

## To customise
- Product examples in `components/Work.jsx` are placeholders — swap in real case studies.
- Stats (hero), rating (get started) and contact details (footer) are placeholders.
- Hero word: `word` option in `createScene` (`lib/scene.js`), default `PHOENIX`.
- Copy lives in `lib/i18n/en.js` and `lib/i18n/ar.js` (Arabic is written natively, not translated line by line).
