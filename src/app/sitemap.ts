import type { MetadataRoute } from "next";
import { getPublicCars } from "@/lib/cars";

const publicPages = [
  "",
  "/cars",
  "/book",
  "/features",
  "/about",
  "/help",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const cars = await getPublicCars();

  return [
    ...publicPages.map((path, index) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: index < 2 ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/cars" ? 0.9 : 0.7,
    })),
    ...cars.map((car) => ({
      url: `${baseUrl}/cars/${car.slug}`,
      lastModified: car.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
