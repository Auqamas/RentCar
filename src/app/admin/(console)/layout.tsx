import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const unread = await prisma.contactMessage.count({ where: { read: false } });

  return (
    <AdminShell unread={unread} adminName={session.name}>
      {children}
    </AdminShell>
  );
}
