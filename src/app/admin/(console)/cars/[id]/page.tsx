import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deleteCarAction, updateCarAction } from "@/actions/admin";
import { CarForm } from "@/components/admin/CarForm";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> };

export const metadata: Metadata = { title: "Edit car" };

export default async function EditCarPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();

  const update = updateCarAction.bind(null, car.id);

  return (
    <div>
      <p className="text-xs tracking-[0.25em] uppercase text-brand">Inventory</p>
      <h1 className="mt-2 mb-8 font-display text-4xl font-extrabold">
        Edit {car.brand} {car.name}
      </h1>
      {error && (
        <p className="mb-6 max-w-3xl rounded-2xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <CarForm
        action={update}
        car={{
          ...car,
          images: (() => {
            try {
              return JSON.parse(car.images || "[]") as string[];
            } catch {
              return car.imageUrl ? [car.imageUrl] : [];
            }
          })(),
        }}
        submitLabel="Save changes"
      />
      <form action={deleteCarAction} className="mt-10">
        <input type="hidden" name="carId" value={car.id} />
        <button type="submit" className="text-sm text-brand hover:underline">
          Delete this car
        </button>
      </form>
    </div>
  );
}
