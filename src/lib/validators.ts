import { z } from "zod";
import { CATEGORIES, LOCATIONS } from "@/lib/site";

const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .max(120);

const phone = z
  .string()
  .trim()
  .min(10, "Enter a valid phone number")
  .max(24)
  .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number");

const customerPassword = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long")
  .regex(/[A-Za-z]/, "Password must include a letter")
  .regex(/[0-9]/, "Password must include a number");

export const adminPasswordSchema = z
  .string()
  .min(12, "Admin password must be at least 12 characters")
  .max(72, "Password is too long")
  .regex(/[A-Z]/, "Include an uppercase letter")
  .regex(/[a-z]/, "Include a lowercase letter")
  .regex(/[0-9]/, "Include a number")
  .regex(/[^A-Za-z0-9]/, "Include a symbol");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email,
  phone: z.union([z.literal(""), phone]).optional(),
  password: customerPassword,
  website: z.string().max(0).optional(),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required").max(72),
  website: z.string().max(0).optional(),
});

export const bookingSchema = z
  .object({
    carId: z.string().min(1),
    guestName: z.string().trim().min(2, "Enter your full name").max(80),
    guestEmail: email,
    guestPhone: phone,
    pickupDate: z.string().min(1, "Choose a pickup date"),
    dropoffDate: z.string().min(1, "Choose a return date"),
    pickupLocation: z.string().min(1, "Choose a pickup location"),
    dropoffLocation: z.string().min(1, "Choose a return location"),
    chauffeur: z.boolean().optional(),
    notes: z.string().trim().max(500).optional(),
    website: z.string().max(0).optional(),
  })
  .refine((value) => new Date(value.dropoffDate) > new Date(value.pickupDate), {
    message: "Return date must be after pickup date",
    path: ["dropoffDate"],
  })
  .refine((value) => LOCATIONS.includes(value.pickupLocation as (typeof LOCATIONS)[number]), {
    message: "Choose a valid pickup location",
    path: ["pickupLocation"],
  })
  .refine((value) => LOCATIONS.includes(value.dropoffLocation as (typeof LOCATIONS)[number]), {
    message: "Choose a valid return location",
    path: ["dropoffLocation"],
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email,
  phone: z.string().trim().max(24).optional(),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10, "Please write a short message").max(2000),
  website: z.string().max(0).optional(),
});

export const carSchema = z.object({
  name: z.string().trim().min(2).max(80),
  brand: z.string().trim().min(2).max(40),
  category: z.enum(CATEGORIES),
  year: z.coerce.number().int().min(1990).max(new Date().getFullYear() + 1),
  dailyRate: z.coerce.number().int().min(1000).max(10_000_000),
  seats: z.coerce.number().int().min(1).max(18),
  transmission: z.enum(["Automatic", "Manual"]),
  fuel: z.enum(["Petrol", "Diesel", "Hybrid", "Electric"]),
  horsepower: z.union([z.literal(""), z.coerce.number().int().min(50).max(3000)]).optional(),
  topSpeed: z.union([z.literal(""), z.coerce.number().int().min(80).max(550)]).optional(),
  description: z.string().trim().min(8).max(2000),
  imageUrl: z.string().trim().max(500).optional(),
  featured: z.boolean().optional(),
  available: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1),
    nextPassword: adminPasswordSchema,
    confirmPassword: z.string().min(1),
  })
  .refine((value) => value.nextPassword === value.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

export type ActionState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export function firstZodError(error: z.ZodError) {
  const issue = error.issues[0];
  return issue?.message ?? "Please check the form and try again.";
}

export function fieldErrorsFrom(error: z.ZodError) {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
