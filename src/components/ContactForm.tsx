"use client";

import { useActionState } from "react";
import { contactAction } from "@/actions/contact";
import type { ActionState } from "@/lib/validators";

export function ContactForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(contactAction, {});

  if (state.ok) {
    return (
      <p className="panel p-8 text-sm leading-6">
        Thank you. For the fastest reply, follow up on WhatsApp — the desk is available around the
        clock.
      </p>
    );
  }

  return (
    <form action={action} className="panel space-y-4 p-6">
      {state.error && (
        <p className="rounded-2xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm">{state.error}</p>
      )}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <label className="block text-sm">
        Name
        <input name="name" required className="field mt-2" />
      </label>
      <label className="block text-sm">
        Email
        <input name="email" type="email" required className="field mt-2" />
      </label>
      <label className="block text-sm">
        Phone
        <input name="phone" className="field mt-2" />
      </label>
      <label className="block text-sm">
        Subject
        <input name="subject" required className="field mt-2" />
      </label>
      <label className="block text-sm">
        Message
        <textarea name="message" required rows={5} className="field mt-2" />
      </label>
      <button type="submit" disabled={pending} className="btn-primary h-12 w-full text-sm">
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
