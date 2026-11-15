import type { Metadata } from "next";
import { PasswordForm } from "@/components/admin/PasswordForm";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await getAdminSession();
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="text-xs tracking-[0.25em] uppercase text-brand">Security</p>
        <h1 className="mt-2 mb-2 font-display text-4xl font-extrabold">Settings</h1>
        <p className="mb-8 text-sm text-muted">
          Signed in as {session?.email}. Admin sessions last 8 hours. Change the default
          password as soon as you can.
        </p>
        <PasswordForm />
      </div>
      <div>
        <h2 className="font-display text-2xl font-bold">Recent staff activity</h2>
        <ul className="mt-5 space-y-3 text-sm">
          {logs.map((log) => (
            <li key={log.id} className="rounded-2xl border border-white/10 px-4 py-3">
              <p className="font-semibold">{log.action}</p>
              <p className="text-xs text-muted">
                {log.entity}
                {log.ip ? ` · ${log.ip}` : ""} · {formatDateTime(log.createdAt)}
              </p>
            </li>
          ))}
          {logs.length === 0 && <li className="text-muted">No activity recorded yet.</li>}
        </ul>
      </div>
    </div>
  );
}
