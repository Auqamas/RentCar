import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Booking received",
  robots: { index: false, follow: false },
};

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "your email";
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}***@${domain}`;
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const booking = id
    ? await prisma.booking.findUnique({
        where: { id },
        include: { car: true },
      })
    : null;

  return (
    <div className="max-w-2xl px-5 py-20 sm:px-8 lg:px-12">
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Thank you</p>
      <h1 className="mt-3 font-display text-5xl font-extrabold">Request received</h1>
      {booking ? (
        <div className="mt-8 space-y-3 text-sm leading-7 text-muted">
          <p>
            We have your request for the {booking.car.brand} {booking.car.name} from{" "}
            {formatDate(booking.pickupDate)} to {formatDate(booking.dropoffDate)}.
          </p>
          <p>The desk will confirm the rate on WhatsApp before anything is charged.</p>
          <p>
            Reference <span className="text-white">{booking.id.slice(-8).toUpperCase()}</span>.
            A coordinator will follow up at {maskEmail(booking.guestEmail)}.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-muted">Your booking request is with the desk.</p>
      )}
      <Link href="/" className="btn-primary mt-10 h-12 px-8 text-sm">
        Back to home
      </Link>
    </div>
  );
}
