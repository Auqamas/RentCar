"use server";

import type { ActionState } from "@/lib/validators";

const paused: ActionState = {
  error: "Admin writes are paused until the database is connected again.",
};

export async function createCarAction(
  _prev: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  return paused;
}

export async function updateCarAction(
  _prev: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  return paused;
}

export async function deleteCarAction(_id?: string): Promise<ActionState> {
  return paused;
}

export async function updateBookingStatusAction(
  _bookingId?: string,
  _status?: string,
): Promise<ActionState> {
  return paused;
}

export async function markMessageReadAction(_id?: string): Promise<ActionState> {
  return paused;
}
