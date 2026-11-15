import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR, formatDate } from "@/lib/utils";
import { CATEGORIES } from "@/lib/site";

export const metadata: Metadata = { title: "Admin dashboard" };

export default async function AdminDashboardPage() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [cars, bookings, customers, unread, monthBookings, visits, visitsToday, uniqueVisitors, carClicks] =
    await Promise.all([
      prisma.car.findMany(),
      prisma.booking.findMany({
        include: { car: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.booking.findMany({
        where: { createdAt: { gte: monthStart } },
      }),
      prisma.siteVisit.count(),
      prisma.siteVisit.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.siteVisit.groupBy({ by: ["visitorId"] }),
      prisma.carClick.groupBy({
        by: ["carId"],
        _count: { carId: true },
        orderBy: { _count: { carId: "desc" } },
        take: 8,
      }),
    ]);

  const clickCars = await prisma.car.findMany({
    where: { id: { in: carClicks.map((item) => item.carId) } },
  });
  const clickRows = carClicks.map((item) => {
    const car = clickCars.find((entry) => entry.id === item.carId);
    return {
      name: car ? `${car.brand} ${car.name}` : "Removed car",
      count: item._count.carId,
    };
  });
  const maxClicks = Math.max(1, ...clickRows.map((item) => item.count));

  const available = cars.filter((car) => car.available).length;
  const activeHires = bookings.filter((item) => item.status === "ACTIVE").length;
  const paid = bookings.filter((item) =>
    ["CONFIRMED", "ACTIVE", "COMPLETED"].includes(item.status),
  );
  const revenue = paid.reduce((sum, item) => sum + item.totalAmount, 0);
  const monthRevenue = monthBookings
    .filter((item) => ["CONFIRMED", "ACTIVE", "COMPLETED"].includes(item.status))
    .reduce((sum, item) => sum + item.totalAmount, 0);

  const byCategory = CATEGORIES.map((category) => ({
    category,
    count: cars.filter((car) => car.category === category).length,
  }));
  const maxCat = Math.max(1, ...byCategory.map((item) => item.count));

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const inMonth = bookings.filter(
      (item) => item.createdAt >= date && item.createdAt < next,
    );
    return {
      label: date.toLocaleString("en-GB", { month: "short" }),
      count: inMonth.length,
      revenue: inMonth
        .filter((item) => ["CONFIRMED", "ACTIVE", "COMPLETED"].includes(item.status))
        .reduce((sum, item) => sum + item.totalAmount, 0),
    };
  });
  const maxMonth = Math.max(1, ...months.map((item) => item.count));

  const stats = [
    { label: "People who visited", value: String(uniqueVisitors.length), hint: "Unique browsers" },
    { label: "Site visits", value: String(visits), hint: "All page views" },
    { label: "Visits today", value: String(visitsToday), hint: "Page views since midnight" },
    { label: "Cars in fleet", value: String(cars.length), hint: `${available} listed as available` },
    { label: "On hire now", value: String(activeHires), hint: "Active bookings" },
    { label: "This month", value: formatPKR(monthRevenue), hint: `${monthBookings.length} requests` },
    { label: "All-time revenue", value: formatPKR(revenue), hint: `${customers} client accounts` },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-brand">Overview</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">Stats</h1>
        </div>
        <Link href="/admin/cars/new" className="btn-primary h-11 px-5 text-xs">
          Add a car
        </Link>
      </div>

      {unread > 0 && (
        <p className="mt-6 text-sm">
          {unread} unread message{unread > 1 ? "s" : ""}.{" "}
          <Link href="/admin/messages" className="underline decoration-brand">
            Open inbox
          </Link>
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="panel p-5">
            <p className="text-xs tracking-[0.18em] uppercase text-muted">{stat.label}</p>
            <p className="mt-3 font-display text-3xl font-extrabold">{stat.value}</p>
            <p className="mt-2 text-sm text-muted">{stat.hint}</p>
          </article>
        ))}
      </div>

      <article className="panel mt-8 p-5">
        <h2 className="font-display text-xl font-bold">Most clicked cars</h2>
        <div className="mt-5 space-y-3">
          {clickRows.length === 0 && <p className="text-sm text-zinc-400">No car clicks yet.</p>}
          {clickRows.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-xs mb-1">
                <span>{item.name}</span>
                <span className="text-zinc-400">{item.count} clicks</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-brand"
                  style={{ width: `${(item.count / maxClicks) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel p-5">
          <h2 className="font-display text-xl font-bold">Requests by month</h2>
          <div className="mt-6 flex items-end gap-3 h-40">
            {months.map((month) => (
              <div key={month.label} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-brand"
                  style={{ height: `${Math.max(8, (month.count / maxMonth) * 100)}%` }}
                  title={formatPKR(month.revenue)}
                />
                <span className="text-[11px] text-muted">{month.label}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="panel p-5">
          <h2 className="font-display text-xl font-bold">Fleet by category</h2>
          <div className="mt-5 space-y-3">
            {byCategory.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{item.category}</span>
                  <span className="text-muted">{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-brand"
                    style={{ width: `${(item.count / maxCat) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="panel mt-8 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Recent bookings</h2>
          <Link href="/admin/bookings" className="text-sm hover:text-brand">
            View all
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted text-xs tracking-wider uppercase">
              <tr>
                <th className="py-2">Client</th>
                <th>Car</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 8).map((booking) => (
                <tr key={booking.id} className="border-t border-white/10">
                  <td className="py-3">{booking.guestName}</td>
                  <td>
                    {booking.car.brand} {booking.car.name}
                  </td>
                  <td>
                    {formatDate(booking.pickupDate)} – {formatDate(booking.dropoffDate)}
                  </td>
                  <td>{booking.status}</td>
                  <td>{formatPKR(booking.totalAmount)}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-muted">
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
