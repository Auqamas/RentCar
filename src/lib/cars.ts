import { FLEET, getFleetCarBySlug, type FleetCar } from "@/lib/fleet";

export type PublicCar = FleetCar;

export async function getPublicCars() {
  return FLEET.filter((car) => car.available && car.published).sort((a, b) => {
    if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    if (a.dailyRate !== b.dailyRate) return a.dailyRate - b.dailyRate;
    return a.brand.localeCompare(b.brand);
  });
}

export async function getFeaturedCars(take = 6) {
  return (await getPublicCars()).filter((car) => car.featured).slice(0, take);
}

export async function getFleetBrands() {
  const cars = await getPublicCars();
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
  return getFleetCarBySlug(slug);
}
