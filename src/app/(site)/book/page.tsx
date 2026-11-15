import type { Metadata } from "next";
import { Suspense } from "react";
import { BookPageClient } from "@/components/BookPageClient";
import { getPublicCars } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Request a Car",
  description: "Send your preferred car, dates and pickup point to Ali Baba Rent a Car.",
};

export default async function BookPage() {
  const cars = await getPublicCars();

  return (
    <Suspense
      fallback={
        <div className="px-5 py-20 text-center text-muted sm:px-8 lg:px-12">Loading booking…</div>
      }
    >
      <BookPageClient
        cars={cars.map((car) => ({
          id: car.id,
          slug: car.slug,
          name: car.name,
          brand: car.brand,
          dailyRate: car.dailyRate,
          imageUrl: car.imageUrl,
        }))}
      />
    </Suspense>
  );
}
