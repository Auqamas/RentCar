import { cookies, headers } from "next/headers";
import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";

export type UserRole = "ADMIN" | "CUSTOMER";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

type TokenPayload = JWTPayload & SessionUser;

const CUSTOMER_COOKIE = "ab_session";
const ADMIN_COOKIE = "ab_admin";
const BCRYPT_ROUNDS = 12;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be set to at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser) {
  const isAdmin = user.role === "ADMIN";
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(isAdmin ? "8h" : "7d")
    .sign(getSecret());

  const jar = await cookies();
  jar.set(isAdmin ? ADMIN_COOKIE : CUSTOMER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: isAdmin ? 60 * 60 * 8 : 60 * 60 * 24 * 7,
  });
}

export async function destroySession(role: UserRole) {
  const jar = await cookies();
  jar.set(role === "ADMIN" ? ADMIN_COOKIE : CUSTOMER_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

async function readSession(cookieName: string): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(cookieName)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    const data = payload as TokenPayload;
    if (!data.id || !data.email || !data.role) return null;
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
    };
  } catch {
    return null;
  }
}

export async function getCustomerSession() {
  const session = await readSession(CUSTOMER_COOKIE);
  if (!session || session.role !== "CUSTOMER") return null;
  return session;
}

export async function getAdminSession() {
  const session = await readSession(ADMIN_COOKIE);
  if (!session || session.role !== "ADMIN") return null;
  return session;
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) return null;
  return session;
}

export async function getClientIp() {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim().slice(0, 64);
  return (h.get("x-real-ip") ?? "unknown").slice(0, 64);
}

export function cookieNameFor(role: UserRole) {
  return role === "ADMIN" ? ADMIN_COOKIE : CUSTOMER_COOKIE;
}
