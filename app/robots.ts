import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cordinit.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
      allow: ["/$", "/aboutus", "/contactus", "/_next/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
