import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, CarFront, Check, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Services" };

const groups = [
  {
    icon: CarFront,
    title: "Hire options",
    items: [
      "Self-drive with CNIC, licence and deposit",
      "With driver for city, airport and outstation",
      "Daily, weekly and monthly rates",
      "Same-day cars when the board is free",
    ],
  },
  {
    icon: MapPin,
    title: "Pickup & delivery",
    items: [
      "Lahore Airport, DHA, Gulberg, Johar Town",
      "Outstation pickup on request",
      "Home and hotel delivery in Lahore",
      "Outstation drop on request",
    ],
  },
  {
    icon: CalendarDays,
    title: "Typical jobs",
    items: [
      "Office commute and client meetings",
      "Wedding sedan / Grande / Prado / guest transfer",
      "Family tours to Islamabad, Murree, Naran",
      "Staff vans for offices and factories",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="px-5 py-14 sm:px-8 lg:px-12">
      <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#211010] to-[#101010] px-6 py-10 sm:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-brand">Services</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          One booking desk for city, airport and outstation travel.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Choose self-drive where available or travel with a professional driver. We confirm
          the vehicle, route and terms before your booking.
        </p>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {groups.map((group) => (
          <article key={group.title} className="panel p-6 transition hover:-translate-y-1 hover:border-brand">
            <group.icon className="size-6 text-brand" />
            <h2 className="mt-4 font-display text-xl font-bold">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/cars" className="btn-primary h-12 px-6 text-xs">
          View available cars <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/book"
          className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-xs font-bold uppercase tracking-wide hover:border-white"
        >
          Send booking request
        </Link>
      </div>
    </div>
  );
}
