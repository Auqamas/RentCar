import Link from "next/link";
import { FLEET, getFleetCarById } from "@/lib/fleet";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return FLEET.map((car) => ({ id: car.id }));
}

export default async function EditCarPage({ params }: Props) {
  const { id } = await params;
  const car = getFleetCarById(id);

  return (
    <div className="max-w-xl space-y-4">
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Inventory</p>
      <h1 className="font-display text-4xl font-extrabold">
        {car ? `Edit ${car.brand} ${car.name}` : "Car"}
      </h1>
      <p className="text-sm leading-7 text-muted">
        Editing cars needs the database on a server host. GitHub Pages serves the static fleet
        only.
      </p>
      <Link href="/admin/cars/" className="btn-primary inline-flex h-11 px-5 text-xs">
        Back to cars
      </Link>
    </div>
  );
}
