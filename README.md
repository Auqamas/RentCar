# Ali Baba Rent a Car

**Live website:** [https://auqamas.github.io/RentCar/](https://auqamas.github.io/RentCar/)

Luxury car hire site for Lahore. The public fleet, booking request flow, and WhatsApp desk run as a static site on GitHub Pages.

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
2. Push to `main` (or run the **Deploy GitHub Pages** workflow)
3. Open [https://auqamas.github.io/RentCar/](https://auqamas.github.io/RentCar/)

## Later: database + server host

The Prisma schema remains under `prisma/` for reconnection. When ready, host on Vercel (or similar), restore `DATABASE_URL`, and wire admin create/edit, bookings, messages, and accounts back in.
