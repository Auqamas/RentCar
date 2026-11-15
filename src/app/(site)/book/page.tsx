import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { CarSelect } from "@/components/CarSelect";
import { getCustomerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Car",
  description: "Send your preferred car, dates and pickup point to Ali Baba Rent a Car.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ car?: string }>;
}) {
  const { car: slug } = await searchParams;
  const session = await getCustomerSession();
  const cars = await prisma.car.findMany({
    where: { available: true, published: true },
    orderBy: [{ featured: "desc" }, { brand: "asc" }, { name: "asc" }],
  });

  if (!cars.length) {
    return (
      <div className="px-5 py-20 text-center text-muted">
        No cars are listed right now. Please check back shortly.
      </div>
    );
  }

  const selected = slug ? cars.find((item) => item.slug === slug) : cars[0];

  if (!selected) {
    return (
      <div className="space-y-4 px-5 py-20 text-center sm:px-8 lg:px-12">
        <p className="text-muted">That car is not available for booking right now.</p>
        <CarSelect cars={cars} selectedSlug={cars[0].slug} />
      </div>
    );
  }

  return (
    <div className="grid gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:px-12">
      <div className="order-2 space-y-6 lg:order-1">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand">Reservations</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">Book a car</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            Pick the car, dates and pickup. We confirm on WhatsApp — no charge until the desk
            agrees the rate, driver, and fuel policy.
          </p>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/15">
          <Image
            src={selected.imageUrl}
            alt={`${selected.brand} ${selected.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 font-display text-2xl font-bold">
            {selected.brand} {selected.name}
          </p>
        </div>

        <CarSelect cars={cars} selectedSlug={selected.slug} />

        <div className="panel p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-brand">Ali Baba Rent a Car</p>
          <a href={site.phoneHref} className="mt-2 block font-display text-2xl font-extrabold">
            {site.phone}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-zinc-300 hover:text-white"
          >
            WhatsApp the desk
          </a>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <BookingForm
          carId={selected.id}
          carName={`${selected.brand} ${selected.name}`}
          dailyRate={selected.dailyRate}
          defaultName={session?.name}
          defaultEmail={session?.email}
        />
      </div>
    </div>
  );
}
