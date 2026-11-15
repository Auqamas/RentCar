"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type PhoneLinkProps = {
  phone: string;
  href: string;
  className?: string;
  children?: React.ReactNode;
};

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      return true;
    } catch {
      return false;
    }
  }
}

export function PhoneLink({ phone, href, className, children }: PhoneLinkProps) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    const ok = await copyText(phone);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <span className="relative inline-flex">
      <a
        href={href}
        onClick={onClick}
        className={cn(className)}
        title="Click to call — number is also copied"
      >
        {children ?? phone}
      </a>
      {copied ? (
        <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black shadow">
          Copied
        </span>
      ) : null}
    </span>
  );
}
