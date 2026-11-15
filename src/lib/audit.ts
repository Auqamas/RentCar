type AuditInput = {
  userId?: string | null;
  action: string;
  entity?: string;
  entityId?: string;
  ip?: string | null;
  meta?: Record<string, unknown>;
};

/** No-op while the database is disconnected. */
export async function writeAudit(_input: AuditInput) {
  return;
}
