import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/paths";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl().replace(/\/$/, "");

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/account/", "/login/", "/register/"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
