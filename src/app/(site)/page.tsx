import Link from "next/link";
import {
  ArrowRight,
  Plane,
  Car,
  MapPinned,
  CalendarDays,
  ShieldCheck,
  Users,
  Building2,
  KeyRound,
  CircleCheck,
  Phone,
} from "lucide-react";
import { BrandsScroller } from "@/components/BrandsScroller";
import { FleetSection } from "@/components/FleetSection";
import { HomeSearch } from "@/components/HomeSearch";
import { HowItWorks } from "@/components/HowItWorks";
import { PublicImage } from "@/components/PublicImage";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { getFeaturedCars, getPublicCars } from "@/lib/cars";
import { routes, site } from "@/lib/site";

const categories = [
  {
    href: "/cars/?category=ECONOMY",
    title: "Economy",
    text: "Alto, Wagon R and Yaris for practical city travel.",
    icon: KeyRound,
    external: false,
  },
  {
    href: "/cars/?category=SEDAN",
    title: "Sedans",
    text: "Corolla, Grande, Civic and City for work or family.",
    icon: Car,
    external: false,
  },
  {
    href: "/cars/?category=SUV",
    title: "SUVs",
    text: "Comfortable crossovers for city and motorway.",
    icon: MapPinned,
    external: false,
  },
  {
    href: "/cars/?category=FAMILY",
    title: "Family",
    text: "More seats and luggage room for group travel.",
    icon: Users,
    external: false,
  },
  {
    href: "/cars/?category=PREMIUM",
    title: "Premium",
    text: "Land Cruiser, Prado and Range Rover.",
    icon: ShieldCheck,
    external: false,
  },
  {
    href: site.whatsapp,
    title: "Need another car?",
    text: "Tell us the model and dates—we will check availability.",
    icon: Phone,
    external: true,
  },
];

const services = [
  {
    icon: KeyRound,
    title: "Self-drive",
    text: "CNIC + licence, security deposit, and a clean car handed over in Lahore.",
  },
  {
    icon: Users,
    title: "With driver",
    text: "Urdu and English speaking drivers for city, airport, and outstation.",
  },
  {
    icon: Plane,
    title: "Airport pickup",
    text: "Meet at Allama Iqbal Airport. Share your flight time on WhatsApp.",
  },
  {
    icon: MapPinned,
    title: "Outstation",
    text: "Lahore to Islamabad, Karachi, Multan, Murree, Naran and more.",
  },
  {
    icon: Building2,
    title: "Weddings & events",
    text: "Grande, Civic, Prado or Land Cruiser for baraat and guest transfers.",
  },
  {
    icon: CalendarDays,
    title: "Weekly & monthly",
    text: "Better rates if you need a car for work, a visit, or a long stay.",
  },
];

const serviceStandards = [
  {
    title: "Clear before you book",
    text: "Car, dates, driver, pickup point and fuel policy are confirmed before your trip.",
  },
  {
    title: "Clean, checked cars",
    text: "Every available car is prepared for handover with its AC, tyres and papers checked.",
  },
  {
    title: "Flexible collection",
    text: "Collect from us or arrange delivery to your home, hotel or Lahore Airport.",
  },
  {
    title: "Support when travelling",
    text: "Our WhatsApp desk stays available for city, airport and outstation bookings.",
  },
];

export default async function HomePage() {
  const [cars, featured] = await Promise.all([
    getPublicCars(),
    getFeaturedCars(6),
  ]);

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="hero-glow" />
        <div className="relative grid min-h-[620px] items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-16">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
              <span className="size-1.5 rounded-full bg-brand" />
              Lahore · Airport · Outstation
            </div>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              The right car.
              <span className="block text-brand">Ready when you are.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
              Self-drive or with a professional driver. From Alto and Corolla to Prado,
              Land Cruiser and Range Rover—book for a day, a month or an outstation trip.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={site.whatsapp}
                className="btn-primary h-12 px-6 text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Check availability <ArrowRight className="size-4" />
              </a>
              <Link
                href="/cars"
                className="inline-flex h-12 items-center rounded-full border border-white/25 px-6 text-xs font-bold uppercase tracking-wide transition hover:border-white hover:bg-white hover:text-black"
              >
                Explore fleet
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-300">
              {["Clean & checked", "Driver available", "24/7 WhatsApp"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CircleCheck className="size-4 text-brand" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#111] shadow-2xl lg:min-h-[520px]">
            <PublicImage
              src="/cars/range-rover.jpg"
              alt="White Range Rover available from Ali Baba Rent a Car"
              fill
              preload
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
              Available on request
            </div>
            <div className="absolute bottom-4 right-4 z-20 rounded-2xl border border-white/15 bg-black/75 px-4 py-3 backdrop-blur sm:right-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand">Premium fleet</p>
              <p className="mt-1 font-display text-lg font-bold">Range Rover · Prado · Land Cruiser</p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 mx-5 -mt-5 sm:mx-8 lg:mx-12">
        <HomeSearch />
      </div>

      <section className="mx-5 mt-5 grid grid-cols-2 divide-x divide-y divide-white/15 overflow-hidden rounded-2xl border border-white/20 bg-[#161616] sm:mx-8 lg:mx-12 lg:grid-cols-4 lg:divide-y-0">
        {[
          { n: `${cars.length}+`, l: "cars on the list" },
          { n: "24/7", l: "booking assistance" },
          { n: "Lahore", l: "city, airport & outstation" },
          { n: "Daily+", l: "weekly & monthly hire" },
        ].map((item) => (
          <div key={item.l} className="px-5 py-6 transition hover:bg-white/[0.03]">
            <p className="font-display text-2xl font-extrabold text-white">{item.n}</p>
            <p className="mt-1 text-xs text-muted">{item.l}</p>
          </div>
        ))}
      </section>

      <section className="px-5 sm:px-8 lg:px-12 mt-16">
        <p className="text-xs tracking-[0.22em] uppercase text-brand">Browse by type</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold">What do you need the car for?</h2>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="panel group p-5 transition hover:-translate-y-1 hover:border-brand"
            >
              <item.icon className="size-5 text-brand" />
              <p className="font-display text-xl font-bold">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white/70 group-hover:text-brand">
                Explore <ArrowRight className="size-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="px-5 sm:px-8 lg:px-12">
          <p className="text-xs tracking-[0.22em] uppercase text-brand">Brands we keep</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold">The names people ask for</h2>
          <p className="mt-3 max-w-xl text-sm text-zinc-300">
            Core fleet plus additional makes on request. Ask us for current model availability.
          </p>
        </div>
        <div className="mt-8">
          <BrandsScroller />
        </div>
      </section>

      <div className="mt-16">
        <FleetSection
          cars={featured.length ? featured : cars}
          title="Popular right now"
          intro="These are the cars people book most — Corolla, Civic, Grande, Prado, Land Cruiser and Range Rover."
          limit={6}
        />
      </div>

      <section className="px-5 sm:px-8 lg:px-12 mt-16">
        <p className="text-xs tracking-[0.22em] uppercase text-brand">How we hire</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold">Services</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <article key={item.title} className="panel p-5">
              <item.icon className="size-5 text-brand" />
              <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <HowItWorks />

      <section className="px-5 sm:px-8 lg:px-12 mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-brand">Routes</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">City and outstation</h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Fuel and motorway tolls are billed separately on outstation. Ask on WhatsApp for a
            packed rate if you want it all-in.
          </p>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <div key={`${route.from}-${route.to}`} className="panel p-4">
              <p className="font-semibold">
                {route.from} → {route.to}
              </p>
              <p className="mt-1 text-sm text-muted">{route.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 px-5 py-14 sm:px-8 lg:px-12">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-brand">Our standard</p>
        <h2 className="mt-2 text-center font-display text-3xl font-extrabold sm:text-4xl">
          What you can expect
        </h2>
        <div className="mt-10 grid overflow-hidden rounded-2xl border border-white/15 sm:grid-cols-2 xl:grid-cols-4">
          {serviceStandards.map((item, index) => (
            <article
              key={item.title}
              className="border-b border-white/15 p-6 last:border-b-0 sm:border-r xl:border-b-0"
            >
              <span className="font-display text-sm font-bold text-brand">0{index + 1}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{item.text}</p>
              <CircleCheck className="mt-5 size-5 text-brand" />
            </article>
          ))}
        </div>
      </section>

      <section className="mx-5 mt-16 flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#211010] via-[#151515] to-[#0b0b0b] p-8 sm:mx-8 sm:p-10 lg:mx-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand">
            <Car className="size-5" />
            <p className="text-xs tracking-[0.2em] uppercase">Follow the fleet</p>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold">See the cars on Instagram</h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            See current vehicles, recent trips and service updates from {site.owner} and the
            Ali Baba Rent a Car team.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary h-12 px-6 text-xs"
          >
            <InstagramIcon className="size-4" /> Instagram
          </a>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-xs font-bold uppercase tracking-wide hover:border-white"
          >
            <FacebookIcon className="size-4" /> Facebook
          </a>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-12 mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-brand px-6 py-8 text-white">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Need a car today?</h2>
          <p className="mt-1 text-sm text-white/85">
            Ali Baba Rent a Car — call {site.phone}. We confirm the car, driver, and pickup.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={site.phoneHref} className="btn-white h-12 px-6 text-xs">
            {site.phone}
          </a>
          <Link href="/book" className="inline-flex h-12 items-center rounded-full border border-white/40 px-6 text-xs font-bold uppercase tracking-wide">
            Book on site
          </Link>
          <a
            href={site.whatsapp}
            className="inline-flex h-12 items-center rounded-full border border-white/40 px-6 text-xs font-bold uppercase tracking-wide"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted">
        <ShieldCheck className="size-4 text-brand" />
        CNIC required · Insured cars · Fuel policy explained before you leave
      </div>
    </div>
  );
}
