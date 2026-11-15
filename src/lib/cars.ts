import { prisma } from "@/lib/prisma";

export async function getPublicCars() {
  return prisma.car.findMany({
    where: { available: true, published: true },
    orderBy: [{ featured: "desc" }, { dailyRate: "asc" }, { brand: "asc" }],
  });
}

export async function getFeaturedCars(take = 6) {
  return prisma.car.findMany({
    where: { available: true, published: true, featured: true },
    orderBy: { dailyRate: "asc" },
    take,
  });
}

export async function getFleetBrands() {
  const cars = await prisma.car.findMany({
    where: { available: true, published: true },
    orderBy: { featured: "desc" },
  });

  const map = new Map<
    string,
    { brand: string; count: number; imageUrl: string; category: string }
  >();

  for (const car of cars) {
    const current = map.get(car.brand);
    if (!current) {
      map.set(car.brand, {
        brand: car.brand,
        count: 1,
        imageUrl: car.imageUrl,
        category: car.category,
      });
    } else {
      current.count += 1;
    }
  }

  return [...map.values()].sort((a, b) => b.count - a.count);
}

export async function getCarBySlug(slug: string) {
  return prisma.car.findUnique({
    where: { slug },
  });
}
