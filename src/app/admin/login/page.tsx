import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Staff login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5">
      <div className="mb-10">
        <Logo />
      </div>
      <div className="panel max-w-md space-y-4 p-8 text-center">
        <h1 className="font-display text-3xl font-extrabold">Staff login</h1>
        <p className="text-sm leading-7 text-muted">
          Secure admin login needs a server host (for example Vercel). On GitHub Pages the public
          website is live; the admin desk will return with the database later.
        </p>
        <Link href="/" className="btn-primary inline-flex h-11 px-5 text-xs">
          Back to site
        </Link>
      </div>
    </div>
  );
}
