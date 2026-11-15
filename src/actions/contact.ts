"use server";

import { getClientIp } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema, firstZodError, type ActionState } from "@/lib/validators";

export async function contactAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (String(formData.get("website") ?? "").length > 0) return { ok: true };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });
  if (!parsed.success) return { error: firstZodError(parsed.error) };

  const ip = await getClientIp();
  const limited = rateLimit(`contact:${ip}`, 6);
  if (!limited.ok) {
    return { error: "Too many messages. Please wait a little while." };
  }

  // Database storage comes later. For now accept the message and ask WhatsApp follow-up.
  return {
    ok: true,
    error: undefined,
  };
}
