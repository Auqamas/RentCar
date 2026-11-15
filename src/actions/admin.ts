"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminSession, getClientIp } from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";
import {
  carSchema,
  firstZodError,
  type ActionState,
} from "@/lib/validators";
import { slugify } from "@/lib/utils";
import { BOOKING_STATUSES } from "@/lib/site";

const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

async function requireAdminOrFail() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

async function saveImage(file: File | null, fallback?: string) {
  if (!file || file.size === 0) return fallback ?? "";
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be 5MB or smaller.");
  }
  const ext = ALLOWED_TYPES.get(file.type);
  if (!ext) {
    throw new Error("Upload a JPG, PNG, or WEBP image.");
  }
  const folder = path.join(process.cwd(), "public", "uploads", "cars");
  await mkdir(folder, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  await writeFile(path.join(folder, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/cars/${filename}`;
}

function toOptionalInt(value: unknown) {
  if (value === "" || value === undefined || value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseCarForm(formData: FormData) {
  return carSchema.safeParse({
    name: formData.get("name"),
    brand: formData.get("brand"),
    category: formData.get("category"),
    year: formData.get("year"),
    dailyRate: formData.get("dailyRate"),
    seats: formData.get("seats"),
    transmission: formData.get("transmission"),
    fuel: formData.get("fuel"),
    horsepower: formData.get("horsepower") || "",
    topSpeed: formData.get("topSpeed") || "",
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl") || "",
    featured: formData.get("featured") === "on",
    available: formData.get("available") === "on",
    published: formData.get("intent") !== "draft",
  });
}

async function collectGallery(formData: FormData, previous: string[] = []) {
  const kept = formData.getAll("keepImage").map(String).filter(Boolean);
  const uploaded: string[] = [];
  const files = formData.getAll("images") as File[];
  for (const file of files) {
    const url = await saveImage(file);
    if (url) uploaded.push(url);
  }
  const extraUrl = String(formData.get("imageUrl") ?? "").trim();
  const merged = [...kept, ...uploaded, extraUrl].filter(Boolean);
  const unique = [...new Set(merged.length ? merged : previous)];
  return unique;
}

export async function createCarAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireAdminOrFail();
  const parsed = parseCarForm(formData);
  if (!parsed.success) return { error: firstZodError(parsed.error) };

  try {
    const gallery = await collectGallery(formData);
    const imageUrl = gallery[0] || "";
    const isDraft = formData.get("intent") === "draft";
    if (!imageUrl && !isDraft) return { error: "Add at least one photo or image URL." };

    const base = slugify(`${parsed.data.brand} ${parsed.data.name}`);
    let slug = base;
    let n = 2;
    while (await prisma.car.findUnique({ where: { slug } })) {
      slug = `${base}-${n}`;
      n += 1;
    }

    const car = await prisma.car.create({
      data: {
        slug,
        name: parsed.data.name,
        brand: parsed.data.brand,
        category: parsed.data.category,
        year: parsed.data.year,
        dailyRate: parsed.data.dailyRate,
        seats: parsed.data.seats,
        transmission: parsed.data.transmission,
        fuel: parsed.data.fuel,
        horsepower: toOptionalInt(parsed.data.horsepower),
        topSpeed: toOptionalInt(parsed.data.topSpeed),
        description: parsed.data.description,
        imageUrl: imageUrl || "/logo.png",
        images: JSON.stringify(gallery),
        featured: Boolean(parsed.data.featured),
        available: parsed.data.available !== false,
        published: !isDraft,
      },
    });

    await writeAudit({
      userId: session.id,
      action: "CAR_CREATE",
      entity: "Car",
      entityId: car.id,
      ip: await getClientIp(),
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save this car." };
  }

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/admin/cars");
  redirect("/admin/cars");
}

export async function updateCarAction(
  carId: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireAdminOrFail();
  const parsed = parseCarForm(formData);
  if (!parsed.success) return { error: firstZodError(parsed.error) };

  const existing = await prisma.car.findUnique({ where: { id: carId } });
  if (!existing) return { error: "Car not found." };

  try {
    const previous = JSON.parse(existing.images || "[]") as string[];
    const start = previous.length ? previous : [existing.imageUrl];
    const isDraft = formData.get("intent") === "draft";
    const gallery = await collectGallery(formData, start);
    const imageUrl = gallery[0] || existing.imageUrl;
    if (!gallery.length && !isDraft) return { error: "Keep or add at least one photo." };

    await prisma.car.update({
      where: { id: carId },
      data: {
        name: parsed.data.name,
        brand: parsed.data.brand,
        category: parsed.data.category,
        year: parsed.data.year,
        dailyRate: parsed.data.dailyRate,
        seats: parsed.data.seats,
        transmission: parsed.data.transmission,
        fuel: parsed.data.fuel,
        horsepower: toOptionalInt(parsed.data.horsepower),
        topSpeed: toOptionalInt(parsed.data.topSpeed),
        description: parsed.data.description,
        imageUrl,
        images: JSON.stringify(gallery),
        featured: Boolean(parsed.data.featured),
        available: parsed.data.available !== false,
        published: !isDraft,
      },
    });

    await writeAudit({
      userId: session.id,
      action: "CAR_UPDATE",
      entity: "Car",
      entityId: carId,
      ip: await getClientIp(),
    });
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not update this car." };
  }

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath(`/cars/${existing.slug}`);
  revalidatePath("/admin/cars");
  return { ok: true };
}

export async function deleteCarAction(formData: FormData): Promise<void> {
  const session = await requireAdminOrFail();
  const carId = String(formData.get("carId") ?? "");
  if (!carId) return;
  const ip = await getClientIp();
  const limited = rateLimit(`delete-car:${session.id}:${ip}`, 20);
  if (!limited.ok) {
    redirect(`/admin/cars/${carId}?error=${encodeURIComponent("Too many requests.")}`);
  }

  const active = await prisma.booking.count({
    where: {
      carId,
      status: { in: ["PENDING", "CONFIRMED", "ACTIVE"] },
    },
  });
  if (active > 0) {
    redirect(
      `/admin/cars/${carId}?error=${encodeURIComponent(
        "This car has active bookings. Cancel or complete them before deleting.",
      )}`,
    );
  }

  try {
    await prisma.car.delete({ where: { id: carId } });
  } catch {
    redirect(
      `/admin/cars/${carId}?error=${encodeURIComponent(
        "This car cannot be deleted because it has booking history. Mark it unavailable instead.",
      )}`,
    );
  }

  await writeAudit({
    userId: session.id,
    action: "CAR_DELETE",
    entity: "Car",
    entityId: carId,
    ip,
  });

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/admin/cars");
  redirect("/admin/cars");
}

export async function updateBookingStatusAction(bookingId: string, status: string) {
  const session = await requireAdminOrFail();
  if (!BOOKING_STATUSES.includes(status as (typeof BOOKING_STATUSES)[number])) {
    return { error: "Invalid status." };
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  await writeAudit({
    userId: session.id,
    action: `BOOKING_${status}`,
    entity: "Booking",
    entityId: bookingId,
    ip: await getClientIp(),
  });

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
  return { ok: true };
}

export async function markMessageReadAction(id: string) {
  await requireAdminOrFail();
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
