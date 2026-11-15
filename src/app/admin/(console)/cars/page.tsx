import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/utils";

export const metadata: Metadata = { title: "Fleet" };

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({ orderBy: [{ brand: "asc" }, { name: "asc" }] });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-brand">Inventory</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">Fleet</h1>
        </div>
        <Link href="/admin/cars/new" className="btn-primary h-11 px-5 text-xs">
          Add a car
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto rounded-[24px] border border-white/10">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Car</th>
              <th>Category</th>
              <th>Rate</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-t border-white/10">
                <td className="px-4 py-3">
                  <p className="font-semibold">
                    {car.brand} {car.name}
                  </p>
                  <p className="text-xs text-muted">{car.year}</p>
                </td>
                <td>{car.category}</td>
                <td>{formatPKR(car.dailyRate)}</td>
                <td>{car.published ? (car.available ? "Live" : "Hidden") : "Draft"}</td>
                <td className="pr-4 text-right">
                  <Link href={`/admin/cars/${car.id}`} className="text-brand">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
