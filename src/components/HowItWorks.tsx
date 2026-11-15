"use client";

import { useEffect, useRef } from "react";
import { PublicImage } from "@/components/PublicImage";

const steps = [
  {
    n: "01",
    t: "Tell us your dates",
    d: "Share when and where you need the car—city, airport or outstation.",
    img: "/cars/civic.jpg",
    alt: "Send your dates",
  },
  {
    n: "02",
    t: "Select the car",
    d: "Choose from the available economy, sedan, family or premium fleet.",
    img: "/cars/corolla.jpg",
    alt: "Corolla from the fleet",
  },
  {
    n: "03",
    t: "We deliver — or you collect",
    d: "Arrange delivery in Lahore, airport pickup, or collect from our agreed pickup point.",
    img: "/cars/grande.jpg",
    alt: "Car delivered or collected",
  },
];

export function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = root.current?.querySelectorAll(".how-step");
    if (!nodes?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        }
      },
      { threshold: 0.35 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-5 sm:px-8 lg:px-12 mt-16">
      <p className="text-xs tracking-[0.22em] uppercase text-brand">How it works</p>
      <h2 className="mt-2 font-display text-3xl font-extrabold">Three steps</h2>
      <div ref={root} className="how-timeline mt-10">
        {steps.map((step) => (
          <article key={step.n} className="how-step">
            <div className="how-copy">
              <p className="text-brand font-display text-2xl font-extrabold">{step.n}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{step.t}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.d}</p>
            </div>
            <div className="how-frame relative">
              <PublicImage
                src={step.img}
                alt={step.alt}
                fill
                className="how-photo"
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
