# Bridge AI

An AI networking assistant that generates a LinkedIn message, coffee chat
questions, a follow-up email, and a networking strategy from your
background, a target contact, and your career goal.

## Local development

```bash
npm install
npm run dev
```

The app calls `/api/generate`, a serverless function — running it purely
with `vite` (no Vercel) means that endpoint won't resolve. To test the AI
generation locally, install the Vercel CLI and run:

```bash
npm install -g vercel
vercel dev
```

## Deploying to Vercel

1. Push this folder to a GitHub repo (or run `vercel` from inside it).
2. Import the repo in [vercel.com/new](https://vercel.com/new) — Vercel
   auto-detects the Vite frontend and the `/api` serverless function, no
   extra config needed.
3. In the project's **Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` — your Anthropic API key (from
     [console.anthropic.com](https://console.anthropic.com))
4. Deploy. The key stays server-side inside `api/generate.js` and is never
   exposed to the browser.

## Data storage

Sessions (History / Saved Templates) are stored in the browser's
`localStorage`, per-device. There's no backend database — clearing browser
data will clear saved sessions.

## Project structure

```
├── api/
│   └── generate.js     # Serverless function that calls the Anthropic API
├── src/
│   ├── App.jsx          # Main app component
│   └── main.jsx         # React entry point
├── index.html
├── package.json
└── vite.config.js
```
