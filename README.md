# Ali Baba Rent a Car

Luxury car hire website with a public booking flow and a private admin desk for the fleet.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Database storage is paused for now. The public fleet runs from static data. Bookings are confirmed on WhatsApp.

## Admin

- URL: `/admin/login`
- Email: `ADMIN_EMAIL` in `.env` (default `admin@alibabarentacar.com`)
- Password: `ADMIN_PASSWORD` in `.env`

Do not commit `.env`.

## What is included

- Public site: home, fleet filters, car pages, booking request flow, about, services, help, contact
- Admin login with environment credentials
- Static fleet inventory (database write features come later)
- Security basics: httpOnly JWT admin cookie, rate limits, origin checks, security headers, Zod validation

## Deploy (Vercel)

1. Import the GitHub repo into Vercel
2. Set environment variables from `.env.example`
3. Set `NEXT_PUBLIC_SITE_URL` to your Vercel URL
4. Deploy

## Later: database

The old Prisma schema remains under `prisma/` for reconnection. When ready:

1. Add `DATABASE_URL`
2. Restore Prisma dependencies and `db:setup` scripts
3. Wire admin create/edit, bookings, messages, and client accounts back to Prisma
