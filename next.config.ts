import type { NextConfig } from "next";

/**
 * Custom domain (alibabarentacars.com) serves from the site root.
 * Do not set basePath — that breaks CSS/JS on the custom domain.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
