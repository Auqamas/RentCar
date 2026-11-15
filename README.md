# Ali Baba Rent a Car

Luxury car hire website with a public booking flow and a private admin desk for the fleet.

## Run locally

```bash
npm install
copy .env.example .env
npm run db:setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin

- URL: `/admin/login`
- Email: `ADMIN_EMAIL` in `.env` (default `admin@alibabarentacar.com`)
- Password: `ADMIN_PASSWORD` in `.env`

Change that password from **Settings** after the first sign-in. Do not commit `.env`.

## What is included

- Public site: home, fleet filters, car pages, booking, about, features, help, contact, register/login
- Admin: stats, add/edit/remove cars, booking status, messages, password change, activity log
- Security: hashed passwords, httpOnly JWT cookies, admin/client sessions split, rate limits, account lockout, origin checks, security headers, Zod validation, CSRF-safe server actions
