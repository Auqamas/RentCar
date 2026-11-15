import type { Metadata } from "next";
import { CircleCheck, Phone } from "lucide-react";
import { PhoneLink } from "@/components/PhoneLink";
import { PublicImage } from "@/components/PublicImage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="px-5 py-14 sm:px-8 lg:px-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-brand">About Ali Baba</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Local service. Straight answers. The right car for the trip.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted">
            {site.name} is operated by {site.owner}. We arrange self-drive and with-driver
            vehicles from Lahore for city use, airport transfers, business travel, weddings
            and outstation journeys.
          </p>
          <div className="mt-7 space-y-3">
            {[
              "Economy, sedan, family and premium options",
              "Daily, weekly and monthly arrangements",
              "Pickup, delivery and driver options confirmed before booking",
            ].map((item) => (
              <p key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand" /> {item}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {site.phones.map((item) => (
              <PhoneLink
                key={item.href}
                phone={item.label}
                href={item.href}
                className="btn-primary inline-flex h-12 items-center gap-2 px-6 text-xs"
              >
                <Phone className="size-4" /> Call {item.label}
              </PhoneLink>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl border border-white/15">
            <PublicImage
              src="/cars/land-cruiser.jpg"
              alt="Toyota Land Cruiser from the premium fleet"
              fill
              preload
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/15">
            <PublicImage src="/cars/civic.jpg" alt="Honda Civic sedan" fill className="object-cover" sizes="25vw" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/15">
            <PublicImage
              src="/cars/grande.jpg"
              alt="Toyota Corolla Grande sedan"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {[
          { n: "Lahore", l: "city, airport and outstation" },
          { n: "24/7", l: "WhatsApp booking desk" },
          { n: "Daily+", l: "weekly and monthly hire" },
        ].map((item) => (
          <div key={item.l} className="panel p-6">
            <p className="font-display text-2xl font-extrabold text-brand">{item.n}</p>
            <p className="mt-1 text-sm text-muted">{item.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
