"use server";

import { redirect } from "next/navigation";
import { getFleetCarById } from "@/lib/fleet";
import { getClientIp } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { bookingSchema, firstZodError, type ActionState } from "@/lib/validators";
import { rentalDays } from "@/lib/utils";

export async function createBookingAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (String(formData.get("website") ?? "").length > 0) return { ok: true };

  const parsed = bookingSchema.safeParse({
    carId: formData.get("carId"),
    guestName: formData.get("guestName"),
    guestEmail: formData.get("guestEmail"),
    guestPhone: formData.get("guestPhone"),
    pickupDate: formData.get("pickupDate"),
    dropoffDate: formData.get("dropoffDate"),
    pickupLocation: formData.get("pickupLocation"),
    dropoffLocation: formData.get("dropoffLocation"),
    chauffeur: formData.get("chauffeur") === "on",
    notes: formData.get("notes") || undefined,
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed.error) };
  }

  const ip = await getClientIp();
  const limited = rateLimit(`booking:${ip}:${parsed.data.guestEmail}`, 8);
  if (!limited.ok) {
    return { error: "Too many booking attempts. Please wait and try again." };
  }

  const pickupDate = new Date(parsed.data.pickupDate);
  const dropoffDate = new Date(parsed.data.dropoffDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (pickupDate < now) {
    return { error: "Pickup date cannot be in the past." };
  }

  const car = getFleetCarById(parsed.data.carId);
  if (!car || !car.available) {
    return { error: "This vehicle is not available." };
  }

  const days = rentalDays(pickupDate, dropoffDate);
  const ref = `TMP-${Date.now().toString(36).toUpperCase()}`;
  const params = new URLSearchParams({
    ref,
    car: car.slug,
    name: parsed.data.guestName,
    from: parsed.data.pickupDate,
    to: parsed.data.dropoffDate,
    days: String(days),
    chauffeur: parsed.data.chauffeur ? "1" : "0",
  });

  redirect(`/book/confirmation?${params.toString()}`);
}
