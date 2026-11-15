import type { Metadata } from "next";
import Link from "next/link";
import { registerAction } from "@/actions/auth";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Register",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="px-5 py-16">
      <AuthForm
        action={registerAction}
        title="Register"
        subtitle="Create a client account to track bookings and pre-fill your details."
        submitLabel="Create account"
        extraFields={
          <>
            <label className="block text-sm">
              Full name
              <input name="name" required autoComplete="name" className="field mt-2" />
            </label>
            <label className="block text-sm">
              Phone
              <input name="phone" autoComplete="tel" className="field mt-2" />
            </label>
          </>
        }
      />
      <p className="mx-auto mt-6 max-w-md text-sm text-muted">
        Already registered?{" "}
        <Link href="/login" className="text-white underline decoration-brand">
          Sign in
        </Link>
      </p>
    </div>
  );
}
