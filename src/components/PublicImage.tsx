import Image, { type ImageProps } from "next/image";
import { asset } from "@/lib/asset";

type Props = Omit<ImageProps, "src"> & { src: string };

/** next/image wrapper that respects the GitHub Pages base path. */
export function PublicImage({ src, alt, ...props }: Props) {
  return <Image src={asset(src)} alt={alt} {...props} />;
}
