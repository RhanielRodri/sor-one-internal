import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/console", "/login", "/console/"],
    },
    sitemap: "https://sor-one-internal.vercel.app/sitemap.xml",
  };
}
