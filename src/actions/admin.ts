"use server";

import type { ActionState } from "@/lib/validators";

const paused: ActionState = {
  error: "Admin writes are paused until the database is connected again.",
};

export async function createCarAction(): Promise<ActionState> {
  return paused;
}

export async function updateCarAction(): Promise<ActionState> {
  return paused;
}

export async function deleteCarAction(): Promise<ActionState> {
  return paused;
}

export async function updateBookingStatusAction(): Promise<ActionState> {
  return paused;
}

export async function markMessageReadAction(): Promise<ActionState> {
  return paused;
}
