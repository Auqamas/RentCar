"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  destroySession,
  getAdminSession,
  getClientIp,
  getCustomerSession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { writeAudit } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";
import {
  adminPasswordSchema,
  fieldErrorsFrom,
  firstZodError,
  loginSchema,
  passwordChangeSchema,
  registerSchema,
  type ActionState,
} from "@/lib/validators";

const LOCK_MINUTES = 15;
const MAX_FAILURES = 5;

function honeypotFailed(formData: FormData) {
  const website = String(formData.get("website") ?? "");
  return website.length > 0;
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (honeypotFailed(formData)) return { ok: true };

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    password: formData.get("password"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed.error), fieldErrors: fieldErrorsFrom(parsed.error) };
  }

  const ip = await getClientIp();
  const limited = rateLimit(`register:${ip}`);
  if (!limited.ok) {
    return { error: "Too many attempts. Please wait a few minutes and try again." };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      passwordHash: await hashPassword(parsed.data.password),
      role: "CUSTOMER",
    },
  });

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: "CUSTOMER",
  });

  redirect("/account");
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return authenticate(formData, "CUSTOMER", "/account");
}

export async function adminLoginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return authenticate(formData, "ADMIN", "/admin");
}

async function authenticate(
  formData: FormData,
  role: "ADMIN" | "CUSTOMER",
  successPath: string,
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
  const limited = rateLimit(`login:${role}:${ip}:${parsed.data.email}`);
  if (!limited.ok) {
    return { error: "Too many attempts. Please wait 15 minutes and try again." };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  const invalid = { error: "Invalid email or password." };

  if (!user || user.role !== role) {
    return invalid;
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return { error: "This account is temporarily locked. Try again later." };
  }

  const matches = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!matches) {
    const failures = user.failedLoginAttempts + 1;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: failures,
        lockedUntil:
          failures >= MAX_FAILURES
            ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000)
            : null,
      },
    });
    await writeAudit({
      userId: user.id,
      action: "LOGIN_FAILED",
      entity: "User",
      entityId: user.id,
      ip,
    });
    return invalid;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { failedLoginAttempts: 0, lockedUntil: null },
  });

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as "ADMIN" | "CUSTOMER",
  });

  await writeAudit({
    userId: user.id,
    action: "LOGIN",
    entity: "User",
    entityId: user.id,
    ip,
  });

  redirect(successPath);
}

export async function logoutAction() {
  const session = await getCustomerSession();
  if (session) await destroySession("CUSTOMER");
  redirect("/");
}

export async function adminLogoutAction() {
  const session = await getAdminSession();
  if (session) {
    await writeAudit({
      userId: session.id,
      action: "LOGOUT",
      entity: "User",
      entityId: session.id,
      ip: await getClientIp(),
    });
    await destroySession("ADMIN");
  }
  redirect("/admin/login");
}

export async function changeAdminPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await getAdminSession();
  if (!session) return { error: "You need to sign in again." };

  const parsed = passwordChangeSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    nextPassword: formData.get("nextPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { error: firstZodError(parsed.error) };
  }

  const ip = await getClientIp();
  const limited = rateLimit(`password:${session.id}:${ip}`, 8);
  if (!limited.ok) {
    return { error: "Too many attempts. Please wait and try again." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.id } });
  if (!user) return { error: "Account not found." };

  const matches = await verifyPassword(parsed.data.currentPassword, user.passwordHash);
  if (!matches) return { error: "Current password is incorrect." };

  const same = await verifyPassword(parsed.data.nextPassword, user.passwordHash);
  if (same) return { error: "Choose a password you have not used before." };

  const strength = adminPasswordSchema.safeParse(parsed.data.nextPassword);
  if (!strength.success) return { error: firstZodError(strength.error) };

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(parsed.data.nextPassword) },
  });

  await writeAudit({
    userId: user.id,
    action: "PASSWORD_CHANGE",
    entity: "User",
    entityId: user.id,
    ip,
  });

  return { ok: true };
}
