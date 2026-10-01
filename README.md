# PhoenixTechs — landing page

Next.js (App Router) + Three.js.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure
- `app/page.jsx` — page composition (Hero → Solutions → Products → Get started → Footer)
- `components/` — one component per section; `LeadForm.jsx` powers both forms
- `components/Experience.jsx` — background scene, nav state, gentle fade-in reveals
- `lib/scene.js` — WebGL scene (planet horizon, giant word, embers). Scroll poses live in `KEYS`.
- `app/api/lead/route.js` — receives form submissions

## Leads
Copy `.env.example` to `.env.local` and set `LEAD_WEBHOOK_URL` (Formspree, Make/Zapier, Slack, CRM…).
Without it, leads are logged to the server console.

## Logo
`npm run logo` regenerates `public/logo*.svg`, `public/favicon.svg` and `components/logo-svg.js`
from `scripts/build-logo.mjs` (text is outlined, so the SVGs need no fonts).

## To customise
- Product examples in `components/Work.jsx` are placeholders — swap in real case studies.
- Stats (hero), rating (get started) and contact details (footer) are placeholders.
- Hero word: `word` option in `createScene` (`lib/scene.js`), default `PHOENIX`.
