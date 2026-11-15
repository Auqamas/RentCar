"use client";

import { useRouter } from "next/navigation";

type CarOption = {
  id: string;
  slug: string;
  brand: string;
  name: string;
};

export function CarSelect({
  cars,
  selectedSlug,
}: {
  cars: CarOption[];
  selectedSlug: string;
}) {
  const router = useRouter();

  return (
    <label className="block text-sm">
      Choose car
      <select
        className="field mt-2"
        value={selectedSlug}
        onChange={(event) => router.push(`/book/?car=${event.target.value}`)}
      >
        {cars.map((car) => (
          <option key={car.id} value={car.slug}>
            {car.brand} {car.name}
          </option>
        ))}
      </select>
    </label>
  );
}
