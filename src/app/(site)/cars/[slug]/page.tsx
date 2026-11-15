import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gauge, Fuel, Users, Settings2 } from "lucide-react";
import { CarClickTracker } from "@/components/CarClickTracker";
import { PublicImage } from "@/components/PublicImage";
import { asset } from "@/lib/asset";
import { getCarBySlug, getPublicCars } from "@/lib/cars";
import { site } from "@/lib/site";
import { parseCarImages } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const cars = await getPublicCars();
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car || !car.published) return { title: "Car not found" };
  return {
    title: `${car.brand} ${car.name} for Rent`,
    description: car.description,
    openGraph: {
      title: `${car.brand} ${car.name} | Ali Baba Rent a Car`,
      description: car.description,
      images: [asset(car.imageUrl)],
    },
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car || !car.published || !car.available) notFound();

  const photos = parseCarImages(car.imageUrl, car.images);
  const related = (await getPublicCars())
    .filter((item) => item.slug !== car.slug && item.category === car.category)
    .slice(0, 3);

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-10 pb-20">
      <CarClickTracker carId={car.id} />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/15 lg:min-h-[520px]">
            <PublicImage
              src={photos[0]}
              alt={`${car.brand} ${car.name}`}
              fill
              className="object-cover"
              preload
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          {photos.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {photos.map((src, index) => (
                <div key={src} className="relative h-20 overflow-hidden rounded-xl border border-white/15">
                  <PublicImage src={src} alt={`${car.name} ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="panel p-6">
          <p className="text-xs tracking-[0.25em] uppercase text-brand">{car.category}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold">
            {car.brand} {car.name}
          </h1>
          <p className="mt-2 text-zinc-300">{car.year}</p>
          <p className="mt-4 inline-flex rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand">
            Rate and availability confirmed on WhatsApp
          </p>
          <p className="mt-6 text-sm leading-7 text-zinc-300">{car.description}</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: `${car.seats} seats` },
              { icon: Settings2, label: car.transmission },
              { icon: Fuel, label: car.fuel },
              {
                icon: Gauge,
                label: car.horsepower ? `${car.horsepower} hp` : "On request",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-sm flex items-center gap-2">
                <item.icon className="size-4 text-brand" />
                {item.label}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Link href={`/book/?car=${car.slug}`} className="btn-white h-14 px-8 text-sm">
              Send booking request
            </Link>
            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(`Hi, I want to check availability for the ${car.brand} ${car.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-14 px-8 text-sm"
            >
              Ask on WhatsApp
            </a>
            <a href={site.phoneHref} className="text-center text-sm font-semibold">
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-3xl font-bold">In the same class</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/cars/${item.slug}`} className="panel group overflow-hidden hover:border-brand">
                <div className="relative aspect-[16/9]">
                  <PublicImage
                    src={item.imageUrl}
                    alt={`${item.brand} ${item.name}`}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-zinc-300">{item.brand}</p>
                  <p className="font-display text-xl font-bold">{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
