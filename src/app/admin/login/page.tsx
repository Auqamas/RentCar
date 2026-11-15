import type { Metadata } from "next";
import { adminLoginAction } from "@/actions/auth";
import { AuthForm } from "@/components/AuthForm";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Staff login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <div className="mb-10">
        <Logo />
      </div>
      <AuthForm
        action={adminLoginAction}
        title="Staff login"
        subtitle="Admin access is separate from client accounts and expires after 8 hours."
        submitLabel="Sign in securely"
      />
    </div>
  );
}
