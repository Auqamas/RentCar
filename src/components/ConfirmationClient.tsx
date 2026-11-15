"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type CarInfo = { slug: string; brand: string; name: string };

export function ConfirmationClient({ cars }: { cars: CarInfo[] }) {
  const params = useSearchParams();
  const carSlug = params.get("car");
  const car = carSlug ? cars.find((item) => item.slug === carSlug) ?? null : null;
  const name = params.get("name");
  const ref = params.get("ref");
  const from = params.get("from");
  const to = params.get("to");
  const pickup = from ? new Date(from) : null;
  const dropoff = to ? new Date(to) : null;
  const validDates =
    pickup &&
    dropoff &&
    !Number.isNaN(pickup.getTime()) &&
    !Number.isNaN(dropoff.getTime());

  const whatsappText = encodeURIComponent(
    [
      "Hi, I just sent a booking request on the website.",
      car ? `Car: ${car.brand} ${car.name}` : null,
      validDates ? `Dates: ${formatDate(pickup!)} to ${formatDate(dropoff!)}` : null,
      name ? `Name: ${name}` : null,
      ref ? `Reference: ${ref}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return (
    <div className="max-w-2xl px-5 py-20 sm:px-8 lg:px-12">
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Thank you</p>
      <h1 className="mt-3 font-display text-5xl font-extrabold">Request received</h1>
      {car && validDates ? (
        <div className="mt-8 space-y-3 text-sm leading-7 text-muted">
          <p>
            We have your request for the {car.brand} {car.name} from {formatDate(pickup!)} to{" "}
            {formatDate(dropoff!)}.
          </p>
          <p>The desk will confirm the rate on WhatsApp before anything is charged.</p>
          {ref ? (
            <p>
              Reference <span className="text-white">{ref}</span>.
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-6 text-muted">Your booking request is with the desk.</p>
      )}
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`${site.whatsapp}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary h-12 px-8 text-sm"
        >
          Confirm on WhatsApp
        </a>
        <Link href="/" className="btn-white h-12 px-8 text-sm">
          Back to home
        </Link>
      </div>
    </div>
  );
}
