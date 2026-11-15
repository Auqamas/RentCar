import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE = "ab_admin";
const PUBLIC_FILE = /\.[^/]+$/;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

function isAllowedOrigin(request: NextRequest) {
  if (request.method === "GET" || request.method === "HEAD") return true;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/uploads")
  ) {
    return NextResponse.next();
  }

  if (!isAllowedOrigin(request)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const secret = getSecret();
    if (!token || !secret) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ["HS256"],
      });
      if (payload.role !== "ADMIN") {
        throw new Error("forbidden");
      }
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
      return response;
    }
  }

  if (pathname === "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const secret = getSecret();
    if (token && secret) {
      try {
        const { payload } = await jwtVerify(token, secret, {
          algorithms: ["HS256"],
        });
        if (payload.role === "ADMIN") {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch {
        // stay on login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
