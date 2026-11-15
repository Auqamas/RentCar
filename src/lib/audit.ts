import { prisma } from "@/lib/prisma";

export async function writeAudit(input: {
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  ip?: string | null;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId ?? undefined,
        action: input.action.slice(0, 80),
        entity: input.entity.slice(0, 80),
        entityId: input.entityId ?? undefined,
        ip: input.ip ?? undefined,
      },
    });
  } catch {
    // Audit writes should never break the primary action.
  }
}
