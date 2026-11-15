import Link from "next/link";
import { Clock3, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/features", label: "Services" },
      { href: "/help", label: "Help" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Cars",
    links: [
      { href: "/cars", label: "All cars" },
      { href: "/cars?category=ECONOMY", label: "Economy" },
      { href: "/cars?category=SEDAN", label: "Sedans" },
      { href: "/cars?category=SUV", label: "SUVs" },
      { href: "/book", label: "Book now" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Hire" },
      { href: "/admin/login", label: "Staff login" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 px-5 sm:px-8 lg:px-12 py-12">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Car rental from Lahore — Toyota, Honda, Suzuki and SUVs. Self-drive or
            with driver, daily to monthly, city, airport and outstation.
          </p>
          <p className="mt-5 text-sm">
            <a href={site.phoneHref} className="hover:text-brand">
              {site.phone}
            </a>
          </p>
          <div className="mt-4 space-y-2 text-xs leading-5 text-muted">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-brand" /> {site.address}
            </p>
            <p className="flex items-center gap-2">
              <Clock3 className="size-3.5 shrink-0 text-brand" /> Open {site.hours}
            </p>
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-semibold hover:border-brand hover:text-brand"
            >
              <InstagramIcon className="size-4" /> Instagram
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-semibold hover:border-brand hover:text-brand"
            >
              <FacebookIcon className="size-4" /> Facebook
            </a>
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs tracking-[0.2em] uppercase text-muted">{column.title}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-10 text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
