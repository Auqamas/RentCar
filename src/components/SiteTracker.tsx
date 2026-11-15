"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function visitorId() {
  const key = "ab_vid";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function trackCarClick(carId: string) {
  if (typeof window === "undefined") return;
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "click",
      carId,
      visitorId: visitorId(),
      path: window.location.pathname,
    }),
    keepalive: true,
  }).catch(() => undefined);
}

export function SiteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "visit",
        path: pathname,
        visitorId: visitorId(),
      }),
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
