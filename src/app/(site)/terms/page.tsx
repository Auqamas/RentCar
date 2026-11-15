import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Hire" };

export default function TermsPage() {
  return (
    <article className="px-5 sm:px-8 lg:px-12 py-14 max-w-3xl space-y-5 text-sm leading-7 text-muted">
      <h1 className="font-display text-4xl font-extrabold text-white">Terms of Hire</h1>
      <p>
        A request on this website is not a confirmed booking until Ali Baba Rent a Car confirms
        the car, rate, and pickup on WhatsApp or phone.
      </p>
      <p>
        Self-drive requirements, identification, security deposit, fuel, mileage and driver
        arrangements depend on the selected car and trip. We confirm every applicable condition
        before the booking is accepted.
      </p>
      <p>
        The car may only be used by the agreed driver and for the agreed journey. Smoking,
        racing, unlawful use and unapproved off-road travel are not permitted. Tell us as early
        as possible if the return time or route changes.
      </p>
      <p>
        Cancel as soon as plans change by calling or messaging {site.phone}. These terms follow
        the laws of Pakistan.
      </p>
    </article>
  );
}
