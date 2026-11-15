import type { Metadata } from "next";
import { createCarAction } from "@/actions/admin";
import { CarForm } from "@/components/admin/CarForm";

export const metadata: Metadata = { title: "Add car" };

export default function NewCarPage() {
  return (
    <div>
      <p className="text-xs tracking-[0.25em] uppercase text-brand">Inventory</p>
      <h1 className="mt-2 mb-8 font-display text-4xl font-extrabold">Add a car</h1>
      <CarForm action={createCarAction} submitLabel="Publish car" />
    </div>
  );
}
