import type { MetadataRoute } from "next"

import { SITE } from "@/components/launch/links"

/* Legacy routes are deliberately crawlable: they carry `noindex`, and a
   blocked crawler never reads it. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
