"use client"

import * as React from "react"
import Link from "next/link"
import { Star } from "lucide-react"

import { AntennaMark } from "./mark"
import { Led, Module, Plate, Screen } from "./primitives"
import { DOCS, GITHUB, label, labelSm, MONO } from "./styles"

const LINKS: [string, string][] = [
  ["Product", "#surface"],
  ["Examples", "#how"],
  ["Self-host", "#self-host"],
  ["MCP", "#stack"],
  ["Docs", DOCS],
]

export function Nav() {
  const link: React.CSSProperties = {
    ...label,
    color: "var(--text-body)",
    textDecoration: "none",
    padding: "8px 14px",
    display: "inline-block",
    whiteSpace: "nowrap",
  }
  const [t, setT] = React.useState<string | null>(null)
  React.useEffect(() => {
    const tick = () => setT(new Date().toTimeString().slice(0, 8))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <header style={{ padding: "14px 24px 6px" }}>
      <Module
        fasteners
        padding="10px 26px 10px 18px"
        style={{ display: "block" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingRight: 16,
              borderRight: "1px solid var(--border-default)",
              textDecoration: "none",
            }}
          >
            <AntennaMark size={22} />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 21,
                letterSpacing: "-0.01em",
                color: "var(--text-strong)",
              }}
            >
              agentenna
            </span>
          </Link>
          <Plate
            mode="recessed"
            padding="3px 6px"
            className="hidden lg:flex"
            style={{ alignItems: "center", gap: 2 }}
          >
            {LINKS.map(([l, href]) => (
              <a key={l} href={href} style={link}>
                {l}
              </a>
            ))}
          </Plate>
          <Screen
            padding="5px 12px"
            className="hidden md:flex"
            style={{
              marginLeft: "auto",
              flexDirection: "column",
              gap: 2,
              lineHeight: 1.3,
            }}
          >
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
            >
              <Led status="ok" size={5} />
              <span style={{ ...labelSm, color: "var(--text-on-dark-muted)" }}>
                Live
              </span>
            </span>
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
            >
              <Led status="ok" size={6} />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: "var(--screen-text)",
                }}
              >
                {t ?? "--:--:--"}
              </span>
            </span>
          </Screen>
          <a
            href={GITHUB}
            className="ml-auto md:ml-0"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 14px",
              background: "var(--surface-chassis)",
              border: "1px solid var(--border-strong)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-on-dark)",
              fontFamily: MONO,
              fontSize: 12,
              textDecoration: "none",
            }}
          >
            <Star size={12} strokeWidth={1.5} />
            GitHub
          </a>
        </div>
      </Module>
    </header>
  )
}
