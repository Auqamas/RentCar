import type { Metadata } from "next";
import Link from "next/link";
import { getCarBySlug } from "@/lib/cars";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Booking received",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{
    ref?: string;
    car?: string;
    name?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const params = await searchParams;
  const car = params.car ? await getCarBySlug(params.car) : null;
  const pickup = params.from ? new Date(params.from) : null;
  const dropoff = params.to ? new Date(params.to) : null;
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
      params.name ? `Name: ${params.name}` : null,
      params.ref ? `Reference: ${params.ref}` : null,
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
          {params.ref ? (
            <p>
              Reference <span className="text-white">{params.ref}</span>.
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
