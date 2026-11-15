"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("website") ?? "").length > 0) {
      setSent(true);
      return;
    }

    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const subject = String(form.get("subject") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const text = [
      "Hi Ali Baba, message from the website.",
      name ? `Name: ${name}` : null,
      phone ? `Phone: ${phone}` : null,
      subject ? `Subject: ${subject}` : null,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <p className="panel p-8 text-sm leading-6">
        WhatsApp should open with your message. If it did not, tap WhatsApp on this page and send
        it manually — the desk is available around the clock.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel space-y-4 p-6">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="block text-sm">
        Name
        <input name="name" required className="field mt-2" />
      </label>
      <label className="block text-sm">
        Email
        <input name="email" type="email" className="field mt-2" />
      </label>
      <label className="block text-sm">
        Phone
        <input name="phone" required className="field mt-2" />
      </label>
      <label className="block text-sm">
        Subject
        <input name="subject" required className="field mt-2" />
      </label>
      <label className="block text-sm">
        Message
        <textarea name="message" required rows={5} className="field mt-2" />
      </label>
      <button type="submit" className="btn-primary h-12 w-full text-sm">
        Send on WhatsApp
      </button>
    </form>
  );
}
