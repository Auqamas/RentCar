import { NextResponse } from "next/server";

/** Analytics storage is paused until the database is reconnected. */
export async function POST() {
  return NextResponse.json({ ok: true });
}
