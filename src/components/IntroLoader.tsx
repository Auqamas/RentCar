"use client";

import { useEffect, useState } from "react";

const KEY = "ab_intro";
const TOTAL_MS = 2800;
const LIFT_MS = 2150;

function markSeen() {
  try {
    window.localStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
  document.cookie = `${KEY}=1; Path=/; Max-Age=31536000; SameSite=Lax`;
  document.documentElement.classList.add("intro-done");
}

function alreadySeen() {
  try {
    if (window.localStorage.getItem(KEY) === "1") return true;
  } catch {
    /* ignore */
  }
  return document.cookie.split("; ").some((part) => part === `${KEY}=1`);
}

export function IntroLoader({ initialShow }: { initialShow: boolean }) {
  const [show, setShow] = useState(initialShow);

  useEffect(() => {
    if (!initialShow || alreadySeen()) {
      markSeen();
      setShow(false);
      return;
    }

    setShow(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markSeen();
      setShow(false);
      return;
    }

    const liftTimer = window.setTimeout(() => {
      document.getElementById("intro-overlay")?.classList.add("intro-overlay-up");
    }, LIFT_MS);

    const doneTimer = window.setTimeout(() => {
      markSeen();
      setShow(false);
    }, TOTAL_MS);

    const failsafe = window.setTimeout(() => {
      markSeen();
      setShow(false);
    }, TOTAL_MS + 600);

    // Keep timers alive across React Strict Mode cleanup so dismiss cannot be cancelled.
    return () => {
      void liftTimer;
      void doneTimer;
      void failsafe;
    };
  }, [initialShow]);

  if (!show) return null;

  return (
    <div id="intro-overlay" className="intro-overlay" role="presentation" aria-hidden="true">
      <div className="intro-car intro-car-in">
        <svg viewBox="0 0 280 120" className="h-24 w-auto sm:h-32" fill="none">
          <ellipse cx="140" cy="104" rx="90" ry="8" fill="#111" />
          <path
            d="M48 78c6-22 22-34 48-36l18-22c6-8 16-12 28-12h42c14 0 24 6 32 18l22 32h18c10 0 16 8 16 16v10H48V78z"
            fill="#E10600"
          />
          <path d="M118 28h40c8 0 14 4 18 12l8 18H108l10-30z" fill="#1a1a1a" />
          <path d="M52 70h28c4-10 12-16 22-16H86c-12 2-24 8-34 16z" fill="#fff" opacity=".2" />
          <rect x="38" y="78" width="14" height="8" rx="2" fill="#fff" />
          <rect x="228" y="78" width="10" height="6" rx="2" fill="#f5c518" />
          <g className="intro-wheel">
            <circle cx="86" cy="92" r="18" fill="#111" stroke="#fff" strokeWidth="3" />
            <circle cx="86" cy="92" r="7" fill="#c8c8c8" />
            <path d="M86 76v8M86 100v8M70 92h8M94 92h8" stroke="#fff" strokeWidth="2" />
          </g>
          <g className="intro-wheel">
            <circle cx="198" cy="92" r="18" fill="#111" stroke="#fff" strokeWidth="3" />
            <circle cx="198" cy="92" r="7" fill="#c8c8c8" />
            <path d="M198 76v8M198 100v8M182 92h8M206 92h8" stroke="#fff" strokeWidth="2" />
          </g>
        </svg>
      </div>
      <button
        type="button"
        className="absolute bottom-8 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 hover:border-white hover:text-white"
        onClick={() => {
          markSeen();
          setShow(false);
        }}
      >
        Skip
      </button>
    </div>
  );
}
