"use server";

import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  getAdminSession,
  getClientIp,
  getCustomerSession,
} from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";
import {
  firstZodError,
  loginSchema,
  registerSchema,
  type ActionState,
} from "@/lib/validators";

function honeypotFailed(formData: FormData) {
  const website = String(formData.get("website") ?? "");
  return website.length > 0;
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (honeypotFailed(formData)) return { ok: true };
  registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    password: formData.get("password"),
    website: formData.get("website") ?? "",
  });
  return {
    error: "Client accounts will return when the database is connected. Please book by WhatsApp for now.",
  };
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (honeypotFailed(formData)) return { ok: true };
  return {
    error: "Client login is paused until the database is connected. Please use WhatsApp to book.",
  };
}

export async function adminLoginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (honeypotFailed(formData)) return { ok: true };

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    website: formData.get("website") ?? "",
  });
  if (!parsed.success) {
    return { error: firstZodError(parsed.error) };
  }

  const ip = await getClientIp();
  const limited = rateLimit(`login:ADMIN:${ip}:${parsed.data.email}`);
  if (!limited.ok) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }

  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@alibabarentacar.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!adminPassword || adminPassword.length < 8) {
    return { error: "Admin password is not configured on the server." };
  }

  const emailOk = parsed.data.email === adminEmail;
  const passwordOk = parsed.data.password === adminPassword;
  if (!emailOk || !passwordOk) {
    return { error: "Invalid email or password." };
  }

  await createSession({
    id: "env-admin",
    email: adminEmail,
    name: "Ali Baba Admin",
    role: "ADMIN",
  });

  await writeAudit({
    userId: "env-admin",
    action: "LOGIN",
    entity: "User",
    entityId: "env-admin",
    ip,
  });

  redirect("/admin");
}

export async function logoutAction() {
  const customer = await getCustomerSession();
  if (customer) {
    await destroySession("CUSTOMER");
    redirect("/");
  }
  const admin = await getAdminSession();
  if (admin) {
    await destroySession("ADMIN");
    redirect("/admin/login");
  }
  redirect("/");
}

export async function adminLogoutAction() {
  await destroySession("ADMIN");
  redirect("/admin/login");
}

export async function changeAdminPasswordAction(
  _prev: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  return {
    error: "Password changes need the database. Update ADMIN_PASSWORD in your environment for now.",
  };
}
