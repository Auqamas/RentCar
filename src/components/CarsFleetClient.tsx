"use client";

import { useSearchParams } from "next/navigation";
import { FleetSection } from "@/components/FleetSection";

type FleetCar = {
  id?: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  dailyRate: number;
  imageUrl: string;
  year: number;
  seats?: number;
  transmission?: string;
  fuel?: string;
};

export function CarsFleetClient({ cars }: { cars: FleetCar[] }) {
  const searchParams = useSearchParams();
  return (
    <FleetSection
      cars={cars}
      initialCategory={searchParams.get("category") ?? undefined}
      initialBrand={searchParams.get("brand") ?? undefined}
    />
  );
}
