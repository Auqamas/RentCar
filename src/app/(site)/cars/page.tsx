import type { Metadata } from "next";
import { Suspense } from "react";
import { CarsFleetClient } from "@/components/CarsFleetClient";
import { getPublicCars } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Cars for Rent in Lahore",
  description:
    "Browse economy cars, sedans, family vehicles and premium SUVs available from Ali Baba Rent a Car.",
};

export default async function CarsPage() {
  const cars = await getPublicCars();

  return (
    <div className="pb-20">
      <section className="border-b border-white/10 bg-gradient-to-br from-[#211010] to-black px-5 py-12 sm:px-8 lg:px-12">
        <p className="text-xs uppercase tracking-[0.22em] text-brand">Available fleet</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Choose the car that fits your trip.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
          City cars, sedans, family options and premium SUVs. Open any car for details, then send
          your dates for current availability.
        </p>
      </section>
      <div className="pt-10">
        <Suspense fallback={<div className="px-5 text-muted sm:px-8 lg:px-12">Loading fleet…</div>}>
          <CarsFleetClient cars={cars} />
        </Suspense>
      </div>
    </div>
  );
}
