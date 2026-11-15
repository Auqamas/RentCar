import Link from "next/link";
import { getPublicCars } from "@/lib/cars";

export default async function AdminDashboardPage() {
  const cars = await getPublicCars();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-brand">Admin</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold">Dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Database features are paused for now. The public site is running on the static fleet.
          Bookings and messages should be handled on WhatsApp until storage is reconnected.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Fleet cars</p>
          <p className="mt-2 font-display text-3xl font-extrabold">{cars.length}</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Bookings</p>
          <p className="mt-2 font-display text-3xl font-extrabold">—</p>
          <p className="mt-1 text-xs text-muted">Needs database</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Messages</p>
          <p className="mt-2 font-display text-3xl font-extrabold">—</p>
          <p className="mt-1 text-xs text-muted">Needs database</p>
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold">Static fleet</h2>
          <Link href="/admin/cars" className="text-sm text-brand hover:underline">
            View cars
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-white/10">
          {cars.slice(0, 8).map((car) => (
            <li key={car.id} className="flex items-center justify-between py-3 text-sm">
              <span>
                {car.brand} {car.name}
              </span>
              <span className="text-muted">{car.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
