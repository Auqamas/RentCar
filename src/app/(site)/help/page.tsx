import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <div className="px-5 sm:px-8 lg:px-12 py-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-brand">Help</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Common questions
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Call {site.phone} or WhatsApp the desk. We answer {site.hours.toLowerCase()}.
        </p>
        <Link href="/contact" className="btn-primary mt-8 h-12 px-6 text-sm">
          Contact the desk
        </Link>
      </div>
      <FaqList />
    </div>
  );
}
