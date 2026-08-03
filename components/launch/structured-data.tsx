import { GITHUB, GITHUB_ORG, PYPI, SITE } from "./links"

/* Named identity for the domain. Without it the brand SERP has nothing to
   tie agentenna.com, the GitHub org and the PyPI project together. */
const ORG_ID = `${SITE}/#org`

const LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Agentenna",
      url: SITE,
      description: "Agentenna is the awareness layer for AI agents.",
      sameAs: [GITHUB_ORG, PYPI],
    },
    {
      "@type": "SoftwareApplication",
      name: "Agentenna",
      url: SITE,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS, Windows",
      softwareVersion: "0.1.3",
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      downloadUrl: PYPI,
      codeRepository: GITHUB,
      publisher: { "@id": ORG_ID },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }}
    />
  )
}
