import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
})

const TITLE = "Agentenna — the awareness layer for AI agents"
const DESCRIPTION =
  "Make your agents react to what's happening — logs, alerts, Slack, tickets — with a live, token-bounded awareness surface. Open source, self-hostable, MCP-native."

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agentenna.com"),
  title: TITLE,
  description: DESCRIPTION,
  /* Preserved-but-unlinked pages. Crawlable (see app/robots.ts) so this is
     actually read, but never indexed. */
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.agentenna.com",
    siteName: "Agentenna",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#242522",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", spaceGrotesk.variable, plexMono.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
