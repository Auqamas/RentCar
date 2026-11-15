export default function AdminBookingsPage() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Desk</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold">Bookings</h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
        Booking storage is paused until the database is added back. Handle requests from the
        website confirmation flow and WhatsApp for now.
      </p>
    </div>
  );
}
