import Link from "next/link";
import { PublicImage } from "@/components/PublicImage";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <PublicImage
        src="/logo.png"
        alt="Ali Baba Rent a Car"
        width={compact ? 150 : 190}
        height={compact ? 48 : 58}
        className={compact ? "h-10 w-auto object-contain" : "h-12 w-auto object-contain sm:h-14"}
        preload
      />
    </Link>
  );
}
