import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`track:${ip}`, 80, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let payload: { type?: string; path?: string; carId?: string; visitorId?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const visitorId = String(payload.visitorId ?? "").slice(0, 80);
  const path = String(payload.path ?? "/").slice(0, 180);
  if (!visitorId) return NextResponse.json({ ok: false }, { status: 400 });

  if (payload.type === "visit" && !path.startsWith("/admin")) {
    await prisma.siteVisit.create({ data: { visitorId, path } });
  }

  if (payload.type === "click" && payload.carId) {
    const car = await prisma.car.findUnique({
      where: { id: String(payload.carId) },
      select: { id: true },
    });
    if (car) {
      await prisma.carClick.create({
        data: { carId: car.id, visitorId },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
