import type { MetadataRoute } from "next"

import { SITE } from "@/components/launch/links"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE}/manifesto`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
