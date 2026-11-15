import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminShell unread={0} adminName="Ali Baba Admin">
      {children}
    </AdminShell>
  );
}
