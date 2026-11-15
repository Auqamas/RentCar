"use client";

import Link from "next/link";
import { Fuel, Settings2, Users } from "lucide-react";
import { PublicImage } from "@/components/PublicImage";
type CarCardProps = {
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

export function CarCard({
  slug,
  name,
  brand,
  category,
  imageUrl,
  year,
  seats,
  transmission,
  fuel,
}: CarCardProps) {
  return (
    <Link
      href={`/cars/${slug}`}
      className="group panel flex flex-col overflow-hidden transition-colors hover:border-brand/70"
    >
      <div className="relative aspect-[16/10] bg-[#111]">
        <PublicImage
          src={imageUrl}
          alt={`${brand} ${name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-zinc-300">{brand} · {year}</p>
        <h3 className="mt-1 font-display text-lg font-bold">{name}</h3>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-300">
          {seats ? (
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" /> {seats} seats
            </span>
          ) : null}
          {transmission ? (
            <span className="inline-flex items-center gap-1">
              <Settings2 className="size-3.5" /> {transmission}
            </span>
          ) : null}
          {fuel ? (
            <span className="inline-flex items-center gap-1">
              <Fuel className="size-3.5" /> {fuel}
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex items-center justify-end border-t border-white/15 pt-3">
          <span className="text-xs font-semibold text-brand">View car →</span>
        </div>
      </div>
    </Link>
  );
}
