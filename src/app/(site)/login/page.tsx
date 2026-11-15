import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-lg px-5 py-16 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold">Sign in</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        Client accounts are paused on this static site. Book directly on WhatsApp for now.
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
        <Link href="/book/" className="btn-white h-12 px-6 text-sm">
          Request a car
        </Link>
      </div>
    </div>
  );
}
