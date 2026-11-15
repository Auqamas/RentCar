const KNOWN = ["toyota", "honda", "suzuki", "kia"] as const;

export function brandLogoSrc(brand: string) {
  const key = brand.trim().toLowerCase();
  return (KNOWN as readonly string[]).includes(key) ? `/brands/${key}.svg` : null;
}

export function BrandLogo({
  brand,
  className = "h-12 w-auto",
}: {
  brand: string;
  className?: string;
}) {
  const src = brandLogoSrc(brand);
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className={className} />
    );
  }

  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-extrabold text-white">
      {brand.slice(0, 1).toUpperCase()}
    </span>
  );
}
