import type { Metadata } from "next";
import { Clock3, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PhoneLink } from "@/components/PhoneLink";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="grid gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-brand">Contact</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight">
          Speak to the desk.
        </h1>
        <div className="panel mt-8 space-y-4 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-brand">Booking lines</p>
          {site.phones.map((item) => (
            <PhoneLink
              key={item.href}
              phone={item.label}
              href={item.href}
              className="block font-display text-2xl font-extrabold text-white"
            />
          ))}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-2 inline-flex h-11 px-5 text-xs"
          >
            WhatsApp now
          </a>
        </div>
        <div className="mt-8 space-y-4 text-sm leading-7 text-muted">
          <p className="flex items-start gap-3">
            <MapPin className="mt-1 size-4 shrink-0 text-brand" /> {site.address}
          </p>
          <div className="space-y-2">
            {site.phones.map((item) => (
              <p key={item.href} className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-brand" />
                <PhoneLink phone={item.label} href={item.href} className="text-white hover:text-brand" />
              </p>
            ))}
          </div>
          <p className="flex items-center gap-3">
            <Clock3 className="size-4 shrink-0 text-brand" /> {site.hours}
          </p>
          <div className="flex gap-3 pt-2">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              Instagram
            </a>
            <span className="text-white/20">·</span>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              Facebook
            </a>
            <span className="text-white/20">·</span>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
