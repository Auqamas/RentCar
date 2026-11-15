"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

const FLEET_BRANDS = new Set(["Suzuki", "Toyota", "Honda", "KIA", "Land Rover"]);

const BRANDS = [
  { name: "Suzuki", file: "/brands/suzuki.svg" },
  { name: "Toyota", file: "/brands/toyota.png", photo: true },
  { name: "MG", file: "/brands/mg.svg" },
  { name: "Changan", file: "/brands/changan.png", photo: true },
  { name: "Audi", file: "/brands/audi.svg" },
  { name: "Honda", file: "/brands/honda.svg" },
  { name: "BMW", file: "/brands/bmw.png", photo: true },
  { name: "Hyundai", file: "/brands/hyundai.svg" },
  { name: "KIA", file: "/brands/kia.svg" },
  { name: "BYD", file: "/brands/byd.png", photo: true },
  { name: "Mercedes", file: "/brands/mercedes.svg" },
  { name: "Deepal", file: "/brands/deepal.svg" },
  { name: "GWM Haval", file: "/brands/haval.png", photo: true },
  { name: "Land Rover", file: "/brands/land-rover.svg" },
] as const;

function brandHref(name: string) {
  if (FLEET_BRANDS.has(name)) {
    const queryBrand = name === "KIA" ? "Kia" : name;
    return `/cars/?brand=${encodeURIComponent(queryBrand)}`;
  }
  return `${site.whatsapp}?text=${encodeURIComponent(`Hi, do you have a ${name} available?`)}`;
}

function BrandContent({
  name,
  file,
  photo,
}: {
  name: string;
  file: string;
  photo?: boolean;
}) {
  return (
    <>
      <span className={`brand-disc ${photo ? "brand-disc-photo" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(file)} alt="" className={photo ? "brand-mark-photo" : "brand-mark"} />
      </span>
      <span className="brand-name">{name}</span>
    </>
  );
}

function BrandItem({
  name,
  file,
  photo,
  interactive,
}: {
  name: string;
  file: string;
  photo?: boolean;
  interactive: boolean;
}) {
  const href = brandHref(name);
  const external = href.startsWith("http");

  if (!interactive) {
    return (
      <span className="brand-item" aria-hidden>
        <BrandContent name={name} file={file} photo={photo} />
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="brand-item"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <BrandContent name={name} file={file} photo={photo} />
    </Link>
  );
}

function Track({
  reverse = false,
  interactive = false,
}: {
  reverse?: boolean;
  interactive?: boolean;
}) {
  const row = reverse ? [...BRANDS].reverse() : BRANDS;
  return (
    <div className={`brands-track ${reverse ? "brands-track-reverse" : ""}`}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="brands-set"
          aria-hidden={copy === 1 || !interactive ? true : undefined}
        >
          {row.map((brand) => (
            <BrandItem
              key={`${copy}-${brand.name}`}
              {...brand}
              interactive={interactive && copy === 0}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function BrandsScroller() {
  return (
    <div className="brands-marquee" aria-label="Brands we keep">
      <Track interactive />
      <Track reverse />
    </div>
  );
}
