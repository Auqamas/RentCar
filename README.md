# Ali Baba Rent a Car

**Live website:** [https://alibabarentacars.com](https://alibabarentacars.com)

Luxury car hire site for Lahore. Hosted on GitHub Pages with the custom domain above.

> Opening this GitHub repository shows this README. The real website is the link above.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin

Admin login needs a server host (for example Vercel) and will return with the database later. GitHub Pages serves the public site only.

## Deploy (GitHub Pages)

Every push to `main` builds the static site and deploys to GitHub Pages.

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Custom domain: `alibabarentacars.com` (CNAME file is in `public/`)
3. Push to `main`, then open [https://alibabarentacars.com](https://alibabarentacars.com)

## Later: database + server host

The Prisma schema remains under `prisma/` for reconnection. When ready, host on Vercel (or similar), restore `DATABASE_URL`, and wire admin create/edit, bookings, messages, and accounts back in.
