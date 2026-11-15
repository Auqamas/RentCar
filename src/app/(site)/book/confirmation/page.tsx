import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmationClient } from "@/components/ConfirmationClient";
import { getPublicCars } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Booking received",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage() {
  const cars = await getPublicCars();

  return (
    <Suspense fallback={<div className="px-5 py-20 text-muted">Loading…</div>}>
      <ConfirmationClient
        cars={cars.map((car) => ({ slug: car.slug, brand: car.brand, name: car.name }))}
      />
    </Suspense>
  );
}
