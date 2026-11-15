"use client";

import { useActionState } from "react";
import type { ActionState } from "@/lib/validators";

export function AuthForm({
  action,
  title,
  subtitle,
  submitLabel,
  extraFields,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  title: string;
  subtitle: string;
  submitLabel: string;
  extraFields?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="mx-auto w-full max-w-md space-y-4">
      <h1 className="font-display text-4xl font-extrabold">{title}</h1>
      <p className="text-sm text-muted">{subtitle}</p>
      {state.error && (
        <p className="rounded-2xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm">{state.error}</p>
      )}
      {state.ok && (
        <p className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm">
          Saved.
        </p>
      )}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      {extraFields}
      <label className="block text-sm">
        Email
        <input name="email" type="email" required autoComplete="email" className="field mt-2" />
      </label>
      <label className="block text-sm">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="field mt-2"
        />
      </label>
      <button type="submit" disabled={pending} className="btn-primary h-12 w-full text-sm">
        {pending ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
}
