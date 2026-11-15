"use client";

import { useEffect } from "react";
import { trackCarClick } from "@/components/SiteTracker";

export function CarClickTracker({ carId }: { carId: string }) {
  useEffect(() => {
    trackCarClick(carId);
  }, [carId]);
  return null;
}
