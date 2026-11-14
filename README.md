# CapitalEcho web

Mobile-first Next.js app for CapitalEcho, an African business and financial news platform.
Nine editorial series are browsed through a rotating wheel, with a reader for each edition
(Articles, Videos, Shorts), favourites, search, a local account and an "Echo" Q&A assistant.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Notes

- Article text is **demonstration content** (`lib/content.ts`), to be replaced by real editorial content or a CMS.
- Echo Intelligence is a local extractive stand-in (`lib/echo.ts`), not a real AI model.
- Accounts, favourites and the selected series are stored in the browser's `localStorage` only; there is no backend.
- Videos have no media yet (placeholder player).
- Motion respects `prefers-reduced-motion` (see `app/motion.css`, `lib/motion.ts`).

Stack: Next.js (App Router), React, TypeScript, plain CSS.
