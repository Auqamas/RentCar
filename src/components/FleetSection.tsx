"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CarCard } from "@/components/CarCard";
import { CATEGORIES } from "@/lib/site";
import { cn } from "@/lib/utils";

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

export function FleetSection({
  cars,
  initialCategory,
  initialBrand,
  title = "Available cars",
  intro,
  limit,
}: {
  cars: FleetCar[];
  initialCategory?: string;
  initialBrand?: string;
  title?: string;
  intro?: string;
  limit?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const availableCategories = useMemo(
    () => CATEGORIES.filter((category) => cars.some((car) => car.category === category)),
    [cars],
  );
  const validInitial =
    initialCategory &&
    availableCategories.includes(initialCategory as (typeof CATEGORIES)[number])
      ? initialCategory
      : "ALL";
  const [selected, setSelected] = useState(validInitial);

  const filtered = useMemo(() => {
    const list = cars.filter((car) => {
      const brandOk = initialBrand ? car.brand === initialBrand : true;
      const categoryOk = selected === "ALL" || car.category === selected;
      return brandOk && categoryOk;
    });
    return limit ? list.slice(0, limit) : list;
  }, [cars, initialBrand, selected, limit]);

  function choose(filter: string) {
    setSelected(filter);
    if (!pathname.startsWith("/cars")) return;
    const params = new URLSearchParams();
    if (initialBrand) params.set("brand", initialBrand);
    if (filter !== "ALL") params.set("category", filter);
    const query = params.toString();
    router.replace(query ? `/cars/?${query}` : "/cars/");
  }

  return (
    <section id="fleet" className="px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-brand">Fleet</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          {intro ??
            "From Alto, Wagon R and Yaris to Civic, Grande, Prado, Land Cruiser and Range Rover."}
        </p>
      </div>

      {initialBrand && (
        <p className="mt-5 text-sm text-muted">
          Showing {initialBrand}.{" "}
          <Link href="/cars/" className="text-white underline decoration-brand">
            View full fleet
          </Link>
        </p>
      )}

      <div className="mt-7 flex flex-wrap gap-2">
        {["ALL", ...availableCategories].map((filter) => {
          const active = selected === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => choose(filter)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
                active
                  ? "border-brand bg-brand text-white"
                  : "border-white/20 text-white/80 hover:border-white",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((car) => (
          <CarCard key={car.slug} {...car} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-muted">No cars match this filter yet.</p>
      )}

      {limit && cars.length > limit ? (
        <div className="mt-10">
          <Link href="/cars/" className="btn-primary h-12 px-6 text-xs">
            View all cars
          </Link>
        </div>
      ) : null}
    </section>
  );
}
