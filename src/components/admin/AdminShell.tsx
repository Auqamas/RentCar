"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CarFront,
  CalendarCheck,
  Mail,
  Settings,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cars", label: "Fleet", icon: CarFront },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  unread,
  adminName,
}: {
  children: React.ReactNode;
  unread: number;
  adminName: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-white/10 px-5 py-6 lg:border-b-0 lg:border-r">
        <Logo />
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">Staff</p>
        <nav className="mt-3 flex gap-1 overflow-x-auto lg:flex-col">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin" || pathname === "/admin/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm",
                  active ? "bg-brand text-white" : "text-white/80 hover:bg-white/5",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
                {item.href === "/admin/messages" && unread > 0 && (
                  <span className="ml-auto rounded-full bg-white px-2 text-xs text-black">
                    {unread}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 hidden text-sm lg:block">
          <p className="text-muted">{adminName}</p>
          <p className="mt-2 text-xs leading-5 text-muted">
            Admin login needs a server host. GitHub Pages serves the public site only.
          </p>
          <Link href="/" className="mt-3 inline-flex items-center gap-1 hover:text-brand">
            View site <ExternalLink className="size-3" />
          </Link>
        </div>
      </aside>
      <div className="px-5 py-8 sm:px-8">{children}</div>
    </div>
  );
}
