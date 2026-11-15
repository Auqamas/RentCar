import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "My bookings",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <div className="px-5 py-16 sm:px-8 lg:px-12">
      <h1 className="font-display text-4xl font-extrabold">Bookings</h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
        Saved accounts and booking history will return when the database is connected. For now,
        confirm every hire on WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary h-12 px-6 text-sm"
        >
          WhatsApp the desk
        </a>
        <Link href="/book" className="btn-white h-12 px-6 text-sm">
          Request a car
        </Link>
      </div>
    </div>
  );
}
