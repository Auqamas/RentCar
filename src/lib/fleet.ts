export type FleetCar = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  year: number;
  dailyRate: number;
  seats: number;
  transmission: string;
  fuel: string;
  horsepower: number | null;
  topSpeed: number | null;
  featured: boolean;
  available: boolean;
  published: boolean;
  imageUrl: string;
  images: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

const now = new Date("2026-01-01T00:00:00.000Z");

function car(
  data: Omit<FleetCar, "id" | "available" | "published" | "images" | "createdAt" | "updatedAt">,
): FleetCar {
  return {
    ...data,
    id: data.slug,
    available: true,
    published: true,
    images: JSON.stringify([data.imageUrl]),
    createdAt: now,
    updatedAt: now,
  };
}

/** Static fleet until the database is reconnected. */
export const FLEET: FleetCar[] = [
  car({
    slug: "toyota-land-cruiser",
    name: "Land Cruiser",
    brand: "Toyota",
    category: "PREMIUM",
    year: 2023,
    dailyRate: 35000,
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 409,
    topSpeed: 210,
    featured: true,
    imageUrl: "/cars/land-cruiser.jpg",
    description:
      "Flagship Toyota for protocol, family tours and long motorway runs. High seating, strong AC, and a driver if you want one.",
  }),
  car({
    slug: "toyota-prado",
    name: "Prado",
    brand: "Toyota",
    category: "PREMIUM",
    year: 2022,
    dailyRate: 25000,
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 163,
    topSpeed: 175,
    featured: true,
    imageUrl: "/cars/prado.jpg",
    description:
      "The Prado most clients already know. Comfortable 4x4 for weddings, hotel transfers and outstation with a driver.",
  }),
  car({
    slug: "kia-sportage",
    name: "Sportage",
    brand: "Kia",
    category: "SUV",
    year: 2024,
    dailyRate: 15000,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 175,
    topSpeed: 195,
    featured: true,
    imageUrl: "/cars/kia-sportage.jpg",
    description:
      "Mid-size Kia SUV between Civic and Prado on price. High driving position and a quiet cabin for city plus motorway.",
  }),
  car({
    slug: "honda-kn",
    name: "KN",
    brand: "Honda",
    category: "FAMILY",
    year: 2023,
    dailyRate: 11000,
    seats: 7,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 118,
    topSpeed: 170,
    featured: false,
    imageUrl: "/cars/kn.jpg",
    description: "Honda KN 7-seater for family and guest transfers.",
  }),
  car({
    slug: "honda-civic",
    name: "Civic",
    brand: "Honda",
    category: "SEDAN",
    year: 2024,
    dailyRate: 12000,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 176,
    topSpeed: 210,
    featured: true,
    imageUrl: "/cars/civic.jpg",
    description:
      "The Honda sedan people ask for by name. Strong AC and a modern cabin for meetings and self-drive weeks in Lahore.",
  }),
  car({
    slug: "toyota-yaris",
    name: "Yaris",
    brand: "Toyota",
    category: "ECONOMY",
    year: 2024,
    dailyRate: 6000,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 106,
    topSpeed: 180,
    featured: true,
    imageUrl: "/cars/yaris.jpg",
    description:
      "Compact Toyota sedan for daily office and airport drops. Easy self-drive and light on fuel.",
  }),
  car({
    slug: "honda-city",
    name: "City",
    brand: "Honda",
    category: "SEDAN",
    year: 2023,
    dailyRate: 7000,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 119,
    topSpeed: 185,
    featured: false,
    imageUrl: "/cars/city.jpg",
    description:
      "Honda City with a useful boot. Good for couples, business travel and light luggage.",
  }),
  car({
    slug: "toyota-grande",
    name: "Grande",
    brand: "Toyota",
    category: "SEDAN",
    year: 2024,
    dailyRate: 8500,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 138,
    topSpeed: 200,
    featured: true,
    imageUrl: "/cars/grande.jpg",
    description:
      "Corolla Grande — leather, sunroof, quieter cabin. Booked for business days and wedding guest pickups.",
  }),
  car({
    slug: "toyota-corolla",
    name: "Corolla",
    brand: "Toyota",
    category: "SEDAN",
    year: 2023,
    dailyRate: 6500,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 120,
    topSpeed: 180,
    featured: true,
    imageUrl: "/cars/corolla.jpg",
    description:
      "Pakistan’s default rental sedan. City, motorway, with driver or self-drive. The car most people book first.",
  }),
  car({
    slug: "suzuki-alto",
    name: "Alto",
    brand: "Suzuki",
    category: "ECONOMY",
    year: 2023,
    dailyRate: 4500,
    seats: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 76,
    topSpeed: 145,
    featured: false,
    imageUrl: "/cars/alto.jpg",
    description:
      "Smallest daily hire. Tight parking, low fuel, short Lahore runs and student self-drive.",
  }),
  car({
    slug: "suzuki-wagon-r",
    name: "Wagon R",
    brand: "Suzuki",
    category: "ECONOMY",
    year: 2022,
    dailyRate: 4800,
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    horsepower: 67,
    topSpeed: 140,
    featured: false,
    imageUrl: "/cars/wagon-r.jpg",
    description:
      "Tall Suzuki hatch — easier entry and more headroom than Alto. Simple cheap city car.",
  }),
  car({
    slug: "land-rover-range-rover",
    name: "Range Rover",
    brand: "Land Rover",
    category: "PREMIUM",
    year: 2024,
    dailyRate: 45000,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    horsepower: 395,
    topSpeed: 225,
    featured: true,
    imageUrl: "/cars/range-rover.jpg",
    description:
      "Land Rover Range Rover for protocol, weddings and long tours. High seating, quiet cabin, with a driver if you want one.",
  }),
];

export function getFleetCarById(id: string) {
  return FLEET.find((item) => item.id === id || item.slug === id) ?? null;
}

export function getFleetCarBySlug(slug: string) {
  return FLEET.find((item) => item.slug === slug) ?? null;
}
