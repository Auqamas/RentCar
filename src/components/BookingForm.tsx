"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCATIONS, site } from "@/lib/site";
import { rentalDays } from "@/lib/utils";

type BookingFormProps = {
  carId: string;
  carSlug: string;
  carName: string;
  dailyRate: number;
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function BookingForm({ carSlug, carName }: BookingFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [chauffeur, setChauffeur] = useState(false);
  const minPickup = todayIso();

  const estimate = useMemo(() => {
    if (!pickup || !dropoff) return null;
    const start = new Date(pickup);
    const end = new Date(dropoff);
    if (Number.isNaN(start.getTime()) || end <= start) return null;
    return { days: rentalDays(start, end), chauffeur };
  }, [pickup, dropoff, chauffeur]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(event.currentTarget);
    if (String(form.get("website") ?? "").length > 0) {
      setPending(false);
      return;
    }

    const guestName = String(form.get("guestName") ?? "").trim();
    const guestPhone = String(form.get("guestPhone") ?? "").trim();
    const pickupDate = String(form.get("pickupDate") ?? "");
    const dropoffDate = String(form.get("dropoffDate") ?? "");
    const pickupLocation = String(form.get("pickupLocation") ?? "");
    const dropoffLocation = String(form.get("dropoffLocation") ?? "");
    const notes = String(form.get("notes") ?? "").trim();
    const withDriver = form.get("chauffeur") === "on";

    if (!guestName || !guestPhone || !pickupDate || !dropoffDate) {
      setError("Please fill in your name, phone and dates.");
      setPending(false);
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      setError("Pickup date cannot be in the past.");
      setPending(false);
      return;
    }
    if (end <= start) {
      setError("Return date must be after pickup.");
      setPending(false);
      return;
    }

    const days = rentalDays(start, end);
    const ref = `TMP-${Date.now().toString(36).toUpperCase()}`;
    const text = [
      "Hi Ali Baba, I want to book a car.",
      `Car: ${carName}`,
      `Name: ${guestName}`,
      `Phone: ${guestPhone}`,
      `Dates: ${pickupDate} to ${dropoffDate} (${days} day${days > 1 ? "s" : ""})`,
      `Pickup: ${pickupLocation}`,
      `Return: ${dropoffLocation}`,
      withDriver ? "Driver: yes" : "Driver: no",
      notes ? `Notes: ${notes}` : null,
      `Ref: ${ref}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");

    const params = new URLSearchParams({
      ref,
      car: carSlug,
      name: guestName,
      from: pickupDate,
      to: dropoffDate,
      days: String(days),
      chauffeur: withDriver ? "1" : "0",
    });
    router.push(`/book/confirmation/?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6" aria-busy={pending}>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <h2 className="font-display text-2xl font-bold">Reserve {carName}</h2>
      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-2xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm"
        >
          {error}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          Full name
          <input name="guestName" required autoComplete="name" className="field mt-2" />
        </label>
        <label className="text-sm">
          Email
          <input name="guestEmail" type="email" autoComplete="email" className="field mt-2" />
        </label>
        <label className="text-sm">
          Phone
          <input name="guestPhone" type="tel" required autoComplete="tel" className="field mt-2" />
        </label>
        <label className="text-sm">
          Pickup location
          <select name="pickupLocation" required className="field mt-2">
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Return location
          <select name="dropoffLocation" required className="field mt-2">
            {LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          Pickup date
          <input
            name="pickupDate"
            type="date"
            required
            min={minPickup}
            className="field mt-2"
            value={pickup}
            onChange={(event) => {
              const value = event.target.value;
              setPickup(value);
              if (dropoff && dropoff < value) setDropoff("");
            }}
          />
        </label>
        <label className="text-sm">
          Return date
          <input
            name="dropoffDate"
            type="date"
            required
            min={pickup || minPickup}
            className="field mt-2"
            value={dropoff}
            onChange={(event) => setDropoff(event.target.value)}
          />
        </label>
      </div>
      <label className="flex items-center gap-3 text-sm">
        <input
          name="chauffeur"
          type="checkbox"
          className="size-4 accent-[#e10600]"
          onChange={(event) => setChauffeur(event.target.checked)}
        />
        Add a driver (rate on WhatsApp)
      </label>
      <label className="block text-sm">
        Notes
        <textarea
          name="notes"
          rows={3}
          className="field mt-2"
          placeholder="Flight number, outstation city, extra stops..."
        />
      </label>
      {estimate && (
        <p className="text-sm text-muted">
          {estimate.days} day{estimate.days > 1 ? "s" : ""} — quote confirmed on WhatsApp
          {estimate.chauffeur ? " · with driver" : ""}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary h-14 w-full text-sm">
        {pending ? "Opening WhatsApp..." : "Confirm on WhatsApp"}
      </button>
    </form>
  );
}
