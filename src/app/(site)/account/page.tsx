import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCustomerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPKR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My bookings",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await getCustomerSession();
  if (!session) redirect("/login");

  const bookings = await prisma.booking.findMany({
    where: { OR: [{ userId: session.id }, { guestEmail: session.email }] },
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="px-5 py-16 sm:px-8 lg:px-12">
      <h1 className="font-display text-4xl font-extrabold">Hello, {session.name}</h1>
      <p className="mt-2 text-sm text-muted">Your recent hire requests.</p>
      <div className="mt-10 space-y-4">
        {bookings.length === 0 && (
          <p className="text-muted">
            No bookings yet.{" "}
            <Link href="/book" className="text-white underline decoration-brand">
              Reserve a car
            </Link>
          </p>
        )}
        {bookings.map((booking) => {
          const quotePending = booking.status === "PENDING" || booking.status === "CANCELLED";
          return (
            <article key={booking.id} className="rounded-[24px] border border-white/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-xl font-bold">
                    {booking.car.brand} {booking.car.name}
                  </p>
                  <p className="text-sm text-muted">
                    {formatDate(booking.pickupDate)} — {formatDate(booking.dropoffDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.16em] text-brand">{booking.status}</p>
                  <p className="text-sm">
                    {quotePending ? "Quote pending" : formatPKR(booking.totalAmount)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
