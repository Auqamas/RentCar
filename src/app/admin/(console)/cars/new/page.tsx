import Link from "next/link";

export default function NewCarPage() {
  return (
    <div className="max-w-xl space-y-4">
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Inventory</p>
      <h1 className="font-display text-4xl font-extrabold">Add car</h1>
      <p className="text-sm leading-7 text-muted">
        Creating cars needs the database. That will be reconnected later. For now the public fleet
        is served from static data in code.
      </p>
      <Link href="/admin/cars" className="btn-primary inline-flex h-11 px-5 text-xs">
        Back to cars
      </Link>
    </div>
  );
}
