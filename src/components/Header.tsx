"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { PhoneLink } from "@/components/PhoneLink";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Services" },
  { href: "/help", label: "Help" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY;

      if (open) {
        setHidden(false);
        lastY = y;
        return;
      }

      if (y < 24) {
        setHidden(false);
      } else if (delta > 8) {
        setHidden(true);
      } else if (delta < -8) {
        setHidden(false);
      }

      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 transition ${
                pathname.startsWith(link.href) ? "text-white" : "text-white/65 hover:text-white"
              }`}
            >
              {link.label}
              {pathname.startsWith(link.href) && (
                <span className="absolute inset-x-0 -bottom-3 h-0.5 rounded-full bg-brand" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/book" className="btn-primary hidden h-10 px-5 text-[11px] sm:inline-flex">
            Book now
          </Link>
          <div className="hidden flex-col items-end gap-0.5 md:flex">
            {site.phones.map((item) => (
              <PhoneLink
                key={item.href}
                phone={item.label}
                href={item.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white"
              >
                <Phone className="size-3.5 text-brand" /> {item.label}
              </PhoneLink>
            ))}
          </div>
          <button
            type="button"
            className="rounded-lg border border-white/20 p-2 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-3 border-t border-white/10 bg-black px-5 py-4 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={pathname.startsWith(link.href) ? "text-brand" : "text-white/85"}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} className="font-semibold text-brand">
            Book now
          </Link>
          {site.phones.map((item) => (
            <PhoneLink
              key={item.href}
              phone={item.label}
              href={item.href}
              className="font-semibold"
            />
          ))}
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
