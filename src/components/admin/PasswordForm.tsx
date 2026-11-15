"use client";

import { useActionState } from "react";
import { changeAdminPasswordAction } from "@/actions/auth";
import type { ActionState } from "@/lib/validators";

export function PasswordForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(
    changeAdminPasswordAction,
    {},
  );

  return (
    <form action={action} className="max-w-md space-y-4">
      {state.error && (
        <p className="rounded-2xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm">{state.error}</p>
      )}
      {state.ok && (
        <p className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm">
          Password updated. Use the new password next time you sign in.
        </p>
      )}
      <label className="block text-sm">
        Current password
        <input name="currentPassword" type="password" required className="field mt-2" />
      </label>
      <label className="block text-sm">
        New password
        <input name="nextPassword" type="password" required className="field mt-2" />
      </label>
      <label className="block text-sm">
        Confirm new password
        <input name="confirmPassword" type="password" required className="field mt-2" />
      </label>
      <p className="text-xs text-muted">
        At least 12 characters, with upper and lower case, a number, and a symbol.
      </p>
      <button type="submit" disabled={pending} className="btn-primary h-12 px-6 text-sm">
        {pending ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
