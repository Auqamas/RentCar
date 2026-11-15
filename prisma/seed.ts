import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const cars = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
    description:
      "Honda KN 7-seater for family and guest transfers.",
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@alibabarentacar.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "AliBaba#Admin!2026";

  await prisma.carClick.deleteMany();
  await prisma.siteVisit.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany({ where: { role: "CUSTOMER" } });

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: "ADMIN", name: "Ali Baba Admin" },
    create: {
      name: "Ali Baba Admin",
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
      phone: "+92 321 8366776",
    },
  });

  await prisma.car.createMany({
    data: cars.map((car) => ({ ...car, images: JSON.stringify([car.imageUrl]), published: true })),
  });
  console.log(`Seeded ${cars.length} cars and admin ${adminEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
