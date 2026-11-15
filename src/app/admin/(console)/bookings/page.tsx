import type { Metadata } from "next";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPKR } from "@/lib/utils";

export const metadata: Metadata = { title: "Bookings" };

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="text-xs tracking-[0.25em] uppercase text-brand">Operations</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold">Bookings</h1>
      <div className="mt-8 overflow-x-auto rounded-[24px] border border-white/10">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th>Car</th>
              <th>Schedule</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t border-white/10 align-top">
                <td className="px-4 py-3">
                  <p className="font-semibold">{booking.guestName}</p>
                  <p className="text-xs text-muted">{booking.guestEmail}</p>
                  <p className="text-xs text-muted">{booking.guestPhone}</p>
                </td>
                <td>
                  {booking.car.brand} {booking.car.name}
                  {booking.chauffeur ? <p className="text-xs text-muted">Chauffeur</p> : null}
                </td>
                <td>
                  {formatDate(booking.pickupDate)} – {formatDate(booking.dropoffDate)}
                  <p className="text-xs text-muted">{booking.pickupLocation}</p>
                </td>
                <td>{formatPKR(booking.totalAmount)}</td>
                <td className="pr-4 py-3">
                  <StatusSelect bookingId={booking.id} status={booking.status} />
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-muted">
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
