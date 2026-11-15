"use client";

import { updateBookingStatusAction } from "@/actions/admin";
import { BOOKING_STATUSES } from "@/lib/site";

export function StatusSelect({ bookingId, status }: { bookingId: string; status: string }) {
  return (
    <select
      defaultValue={status}
      className="field !py-2 !px-3 text-xs"
      onChange={async (event) => {
        await updateBookingStatusAction(bookingId, event.target.value);
      }}
    >
      {BOOKING_STATUSES.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
