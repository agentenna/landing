import type { Metadata, Viewport } from "next"
import { Chakra_Petch, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-chakra",
})

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
})

const TITLE = "Agentenna — the awareness layer for AI agents"
const DESCRIPTION =
  "Agentenna gives agents a live, token-bounded view of what's happening — messages, logs, alerts, tickets — rendered straight into context, refreshed every turn. Open source, self-hostable, MCP-native."

export const metadata: Metadata = {
  metadataBase: new URL("https://agentenna.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://agentenna.com",
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
  themeColor: "#0D1012",
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
      className={cn(
        "antialiased",
        chakraPetch.variable,
        plexSans.variable,
        plexMono.variable,
      )}
    >
      <body>{children}</body>
    </html>
  )
}
