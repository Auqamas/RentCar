"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What documents do I need?",
    a: "Original CNIC or passport, a valid driving licence for self-drive, and a refundable security deposit. With-driver bookings only need CNIC and the trip details.",
  },
  {
    q: "Self-drive or with driver?",
    a: "Both. Most city hires can go either way. Outstation and airport protocol are usually with a driver.",
  },
  {
    q: "Do you pick up from Lahore airport?",
    a: "Yes. Allama Iqbal International Airport is a standard pickup. Send the flight number on WhatsApp so the car waits.",
  },
  {
    q: "Can I take the car out of Lahore?",
    a: "Yes — Islamabad, Karachi, Multan, Sialkot, Murree, Naran and other routes. Fuel and tolls are extra unless we quote an all-in rate.",
  },
  {
    q: "Is fuel included?",
    a: "City hires are usually full-to-full. Outstation is often fuel-on-you or a packed rate. We confirm this in writing before you leave.",
  },
  {
    q: "Daily, weekly or monthly?",
    a: "All three. Weekly and monthly rates are lower than the daily board. Ask on WhatsApp for the current figure on the car you want.",
  },
];

export function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="panel divide-y divide-white/20 overflow-hidden">
      {faqs.map((item, index) => {
        const answerId = `faq-answer-${index}`;
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpen(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
            >
              <span className="font-display text-base font-semibold">{item.q}</span>
              <span className="text-xl leading-none text-brand" aria-hidden>
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p id={answerId} className="px-5 pb-4 text-sm leading-6 text-muted">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
