"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CATEGORIES } from "@/lib/site";

export function HomeSearch() {
  const router = useRouter();
  const [category, setCategory] = useState("ALL");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (category !== "ALL") params.set("category", category);
    router.push(params.size ? `/cars?${params.toString()}` : "/cars");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="panel grid gap-3 p-4 sm:grid-cols-[1fr_auto]"
    >
      <label className="text-xs text-muted">
        Car type
        <select
          className="field mt-1.5 !py-2.5"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="ALL">All cars</option>
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn-primary h-12 self-end px-6 text-xs">
        Find a car
      </button>
    </form>
  );
}
