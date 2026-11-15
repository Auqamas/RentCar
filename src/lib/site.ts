export const CATEGORIES = [
  "ECONOMY",
  "SEDAN",
  "SUV",
  "FAMILY",
  "PREMIUM",
  "VAN",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const BRANDS = ["Toyota", "Honda", "Suzuki", "Kia", "Land Rover"] as const;

export const LOCATIONS = [
  "Lahore — Allama Iqbal International Airport",
  "Lahore — DHA",
  "Lahore — Gulberg",
  "Lahore — Johar Town",
  "Lahore — Home / hotel delivery",
  "Lahore — Agreed pickup point",
] as const;

export const BOOKING_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
] as const;

export const CHAUFFEUR_DAILY_RATE = 2500;

export const site = {
  name: "Ali Baba Rent a Car",
  shortName: "Ali Baba",
  tagline: "Rent a car in Lahore — city or outstation",
  description:
    "Ali Baba Rent a Car is a trusted rental service in Lahore. Toyota, Honda, Suzuki and SUV hire with self-drive or driver, for daily, weekly and monthly use.",
  phone: "+92 321 8366776",
  phoneHref: "tel:+923218366776",
  whatsapp: "https://wa.me/923218366776",
  instagram: "https://www.instagram.com/official_alibabatourrentacar_1/",
  facebook: "https://www.facebook.com/Alibabarentacab",
  address: "Lahore, Punjab — pickup from Airport, DHA, Gulberg and Johar Town",
  hours: "24 hours, 7 days a week",
  cities: ["Lahore"],
  owner: "Muhammad Ali",
} as const;

export const routes = [
  { from: "Lahore", to: "Islamabad", note: "Motorway, sedan or premium SUV" },
  { from: "Lahore", to: "Karachi", note: "Long route, driver recommended" },
  { from: "Lahore", to: "Sialkot", note: "Same-day business and family travel" },
  { from: "Lahore", to: "Multan", note: "Family SUV or Grande" },
  { from: "Lahore Airport", to: "DHA / Gulberg", note: "Meet & greet on arrival" },
  { from: "Lahore", to: "Murree / Naran", note: "Tour cars with driver" },
];
