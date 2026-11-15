import { getPublicCars } from "@/lib/cars";

export default async function AdminCarsPage() {
  const cars = await getPublicCars();

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Inventory</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold">Cars</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Showing the static fleet. Add, edit and draft cars will return when the database is
        connected again.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-4 py-3">Car</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-t border-white/10">
                <td className="px-4 py-3">
                  <p className="font-semibold">
                    {car.brand} {car.name}
                  </p>
                  <p className="text-xs text-muted">{car.slug}</p>
                </td>
                <td className="px-4 py-3">{car.category}</td>
                <td className="px-4 py-3">{car.year}</td>
                <td className="px-4 py-3 text-brand">Published</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
