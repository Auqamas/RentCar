import { PasswordForm } from "@/components/admin/PasswordForm";
import { getAdminSession } from "@/lib/auth";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-brand">Settings</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold">Account</h1>
        <p className="mt-3 text-sm text-muted">
          Signed in as {session?.email}. Without the database, change the admin password by updating{" "}
          <code className="text-white">ADMIN_PASSWORD</code> in your environment variables.
        </p>
      </div>
      <PasswordForm />
    </div>
  );
}
