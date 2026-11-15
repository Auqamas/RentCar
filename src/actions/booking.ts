"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getClientIp, getCustomerSession } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { bookingSchema, firstZodError, type ActionState } from "@/lib/validators";
import { CHAUFFEUR_DAILY_RATE } from "@/lib/site";
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

  const car = await prisma.car.findUnique({ where: { id: parsed.data.carId } });
  if (!car || !car.available) {
    return { error: "This vehicle is not available." };
  }

  const clash = await prisma.booking.findFirst({
    where: {
      carId: car.id,
      status: { in: ["PENDING", "CONFIRMED", "ACTIVE"] },
      pickupDate: { lt: dropoffDate },
      dropoffDate: { gt: pickupDate },
    },
  });
  if (clash) {
    return { error: "This car is already reserved for those dates. Please choose different dates." };
  }

  const days = rentalDays(pickupDate, dropoffDate);
  const chauffeurFee = parsed.data.chauffeur ? CHAUFFEUR_DAILY_RATE * days : 0;
  const totalAmount = car.dailyRate * days + chauffeurFee;
  const session = await getCustomerSession();

  const booking = await prisma.booking.create({
    data: {
      carId: car.id,
      userId: session?.id,
      guestName: parsed.data.guestName,
      guestEmail: parsed.data.guestEmail,
      guestPhone: parsed.data.guestPhone,
      pickupDate,
      dropoffDate,
      pickupLocation: parsed.data.pickupLocation,
      dropoffLocation: parsed.data.dropoffLocation,
      chauffeur: Boolean(parsed.data.chauffeur),
      notes: parsed.data.notes,
      status: "PENDING",
      totalAmount,
    },
  });

  redirect(`/book/confirmation?id=${booking.id}`);
}
