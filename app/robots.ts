import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/auth/",
        "/category",
        "/dashboard",
        "/reports",
        "/reset-password",
        "/settings",
        "/transaction",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
