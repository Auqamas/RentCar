"use client";

import { useActionState, useMemo, useRef, useState } from "react";
import type { ActionState } from "@/lib/validators";
import { CATEGORIES } from "@/lib/site";

type CarValues = {
  name: string;
  brand: string;
  category: string;
  year: number;
  dailyRate: number;
  seats: number;
  transmission: string;
  fuel: string;
  horsepower?: number | null;
  topSpeed?: number | null;
  description: string;
  imageUrl: string;
  images?: string[];
  featured: boolean;
  available: boolean;
  published?: boolean;
};

type ExistingPreview = { id: string; src: string };
type NewPreview = { id: string; src: string; file: File };

export function CarForm({
  action,
  car,
  submitLabel,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  car?: CarValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const fileRef = useRef<HTMLInputElement>(null);
  const initial = useMemo<ExistingPreview[]>(() => {
    const urls = car?.images?.length ? car.images : car?.imageUrl ? [car.imageUrl] : [];
    return urls.map((src, index) => ({ id: `keep-${index}-${src}`, src }));
  }, [car]);
  const [existing, setExisting] = useState<ExistingPreview[]>(initial);
  const [uploads, setUploads] = useState<NewPreview[]>([]);

  const previews = [
    ...existing.map((item) => ({ ...item, kind: "saved" as const })),
    ...uploads.map((item) => ({ ...item, kind: "new" as const })),
  ];

  function writeFiles(files: File[]) {
    const transfer = new DataTransfer();
    files.forEach((file) => transfer.items.add(file));
    if (fileRef.current) fileRef.current.files = transfer.files;
  }

  function onFiles(files: FileList | null) {
    if (!files?.length) return;
    const added: NewPreview[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
      src: URL.createObjectURL(file),
      file,
    }));
    setUploads((current) => {
      const keys = new Set(current.map((item) => `${item.file.name}-${item.file.size}-${item.file.lastModified}`));
      const unique = added.filter((item) => !keys.has(`${item.file.name}-${item.file.size}-${item.file.lastModified}`));
      if (!unique.length) return current;
      const next = [...current, ...unique];
      writeFiles(next.map((item) => item.file));
      return next;
    });
  }

  function removePreview(id: string, kind: "saved" | "new") {
    if (kind === "saved") {
      setExisting((current) => current.filter((item) => item.id !== id));
      return;
    }
    setUploads((current) => {
      const next = current.filter((item) => item.id !== id);
      writeFiles(next.map((item) => item.file));
      return next;
    });
  }

  return (
    <form action={formAction} className="max-w-3xl space-y-4">
      {state.error && (
        <p className="rounded-2xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm">{state.error}</p>
      )}
      {state.ok && (
        <p className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm">Saved.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Model name
          <input name="name" required defaultValue={car?.name} className="field mt-2" />
        </label>
        <label className="text-sm">
          Brand
          <input name="brand" required defaultValue={car?.brand} className="field mt-2" />
        </label>
        <label className="text-sm">
          Category
          <select name="category" defaultValue={car?.category ?? "SEDAN"} className="field mt-2">
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Year
          <input name="year" type="number" required defaultValue={car?.year ?? 2024} className="field mt-2" />
        </label>
        <label className="text-sm">
          Daily rate (PKR)
          <input name="dailyRate" type="number" required defaultValue={car?.dailyRate} className="field mt-2" />
        </label>
        <label className="text-sm">
          Seats
          <input name="seats" type="number" required defaultValue={car?.seats ?? 5} className="field mt-2" />
        </label>
        <label className="text-sm">
          Transmission
          <select name="transmission" defaultValue={car?.transmission ?? "Automatic"} className="field mt-2">
            <option>Automatic</option>
            <option>Manual</option>
          </select>
        </label>
        <label className="text-sm">
          Fuel
          <select name="fuel" defaultValue={car?.fuel ?? "Petrol"} className="field mt-2">
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </select>
        </label>
        <label className="text-sm">
          Horsepower
          <input name="horsepower" type="number" defaultValue={car?.horsepower ?? ""} className="field mt-2" />
        </label>
        <label className="text-sm">
          Top speed (km/h)
          <input name="topSpeed" type="number" defaultValue={car?.topSpeed ?? ""} className="field mt-2" />
        </label>
      </div>
      <label className="block text-sm">
        Description
        <textarea name="description" required rows={5} defaultValue={car?.description} className="field mt-2" />
      </label>

      <div className="panel p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">Photos</p>
            <p className="mt-1 text-xs text-muted">
              {previews.length === 0
                ? "No photos yet. Upload one or more — the first image is the cover."
                : `${previews.length} photo${previews.length === 1 ? "" : "s"} · first is the cover`}
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
            {previews.length} added
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previews.map((item, index) => (
            <div key={item.id} className="relative overflow-hidden rounded-xl border border-white/15 bg-black">
              {item.kind === "saved" && <input type="hidden" name="keepImage" value={item.src} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.kind === "saved" ? "Saved photo" : item.file.name} className="h-28 w-full object-cover" />
              <p className="truncate px-2 py-1 text-[10px] text-white/80">
                {index === 0 ? "Cover" : `Image ${index + 1}`} · {item.kind === "saved" ? "saved" : item.file.name}
              </p>
              <button
                type="button"
                onClick={() => removePreview(item.id, item.kind)}
                className="absolute right-2 top-2 rounded-full bg-black/75 px-2 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <label className="mt-4 block text-sm">
          Upload photos
          <input
            ref={fileRef}
            name="images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="field mt-2"
            onChange={(event) => onFiles(event.target.files)}
          />
        </label>
        <label className="mt-3 block text-sm">
          Or paste an image URL
          <input name="imageUrl" className="field mt-2" placeholder="https://..." />
        </label>
      </div>

      <label className="flex items-center gap-3 text-sm">
        <input name="featured" type="checkbox" defaultChecked={car?.featured} className="size-4 accent-[#e10600]" />
        Featured on the homepage
      </label>
      <label className="flex items-center gap-3 text-sm">
        <input
          name="available"
          type="checkbox"
          defaultChecked={car?.available ?? true}
          className="size-4 accent-[#e10600]"
        />
        Available for hire
      </label>
      <p className="text-xs text-muted">
        Publish puts the car on the public site. Save as draft keeps it in admin only.
      </p>
      <div className="flex flex-wrap gap-3">
        <button name="intent" value="publish" type="submit" disabled={pending} className="btn-primary h-12 px-8 text-sm">
          {pending ? "Saving..." : submitLabel}
        </button>
        <button
          name="intent"
          value="draft"
          type="submit"
          disabled={pending}
          className="h-12 rounded-full border border-white/25 px-6 text-sm hover:border-white"
        >
          {car?.published === false ? "Keep as draft" : "Save as draft"}
        </button>
      </div>
    </form>
  );
}
