import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/console", "/login", "/console/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
