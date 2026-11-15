"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { logoutAction } from "@/actions/auth";
import { site } from "@/lib/site";

const links = [
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/features", label: "Services" },
  { href: "/help", label: "Help" },
  { href: "/contact", label: "Contact" },
];

export function Header({ userName }: { userName: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 py-3">
        <Logo />

        <nav className="hidden lg:flex items-center gap-7 text-sm">
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
          {userName ? (
            <>
              <Link
                href="/account"
                className="hidden text-sm text-white/80 hover:text-white sm:inline"
              >
                My bookings
              </Link>
              <form action={logoutAction} className="hidden sm:block">
                <button type="submit" className="text-sm text-white/70 hover:text-white">
                  Sign out
                </button>
              </form>
            </>
          ) : null}
          <Link href="/book" className="btn-primary hidden h-10 px-5 text-[11px] sm:inline-flex">
            Book now
          </Link>
          <a
            href={site.phoneHref}
            className="hidden items-center gap-1.5 text-sm font-semibold text-white md:inline-flex"
          >
            <Phone className="size-3.5 text-brand" /> {site.phone}
          </a>
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
        <div className="lg:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-3 bg-black">
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
          <Link href="/book" onClick={() => setOpen(false)} className="text-brand font-semibold">
            Book now
          </Link>
          {userName ? (
            <>
              <Link href="/account" onClick={() => setOpen(false)}>
                My bookings
              </Link>
              <form action={logoutAction}>
                <button type="submit">Sign out</button>
              </form>
            </>
          ) : null}
          <a href={site.phoneHref} className="font-semibold">
            {site.phone}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
