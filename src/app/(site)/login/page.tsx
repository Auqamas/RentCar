import type { Metadata } from "next";
import Link from "next/link";
import { loginAction } from "@/actions/auth";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Client login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="px-5 py-16">
      <AuthForm
        action={loginAction}
        title="Client login"
        subtitle="Sign in to see your booking requests and saved details."
        submitLabel="Sign in"
      />
      <p className="mx-auto mt-6 max-w-md text-sm text-muted">
        New here?{" "}
        <Link href="/register" className="text-white underline decoration-brand">
          Register
        </Link>
      </p>
    </div>
  );
}
