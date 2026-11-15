import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell unread={0} adminName={session.name}>
      {children}
    </AdminShell>
  );
}
