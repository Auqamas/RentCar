import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <article className="px-5 sm:px-8 lg:px-12 py-14 max-w-3xl space-y-5 text-sm leading-7 text-muted">
      <h1 className="font-display text-4xl font-extrabold text-white">Privacy Policy</h1>
      <p>
        {site.name} collects the contact and trip details you submit so we can respond to your
        booking request. Additional identification may be requested directly when a hire is
        confirmed.
      </p>
      <p>
        We use this information to arrange the requested service, communicate changes, and keep
        appropriate booking records. We do not sell your personal information.
      </p>
      <p>
        The site also stores a visitor ID in local storage and records page views and car detail
        views so the desk can understand demand. This information is used for operations, not for
        advertising resale.
      </p>
      <p>
        Contact us at {site.phone} if you want personal data updated or removed where the law
        allows.
      </p>
    </article>
  );
}
