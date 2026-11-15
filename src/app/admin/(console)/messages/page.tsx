import type { Metadata } from "next";
import { markMessageReadAction } from "@/actions/admin";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Messages" };

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="text-xs tracking-[0.25em] uppercase text-brand">Inbox</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold">Messages</h1>
      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <article key={message.id} className="rounded-[24px] border border-white/10 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-bold">{message.subject}</p>
                <p className="text-sm text-muted">
                  {message.name} · {message.email}
                  {message.phone ? ` · ${message.phone}` : ""}
                </p>
              </div>
              <p className="text-xs text-muted">{formatDateTime(message.createdAt)}</p>
            </div>
            <p className="mt-3 text-sm leading-6">{message.message}</p>
            {!message.read && (
              <form action={markMessageReadAction.bind(null, message.id)} className="mt-4">
                <button type="submit" className="text-sm text-brand">
                  Mark as read
                </button>
              </form>
            )}
          </article>
        ))}
        {messages.length === 0 && <p className="text-muted">No messages yet.</p>}
      </div>
    </div>
  );
}
