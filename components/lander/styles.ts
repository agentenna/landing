import type { CSSProperties } from "react"

export const MONO = "var(--font-mono)"

/* uppercase tracked mono — the label voice */
export const label: CSSProperties = {
  fontFamily: MONO,
  fontSize: "var(--text-label)",
  fontWeight: 500,
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
}

export const labelSm: CSSProperties = {
  ...label,
  fontSize: "var(--text-label-sm)",
}

/* display type — tight, on the room */
export const display: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  lineHeight: "var(--leading-display)",
  letterSpacing: "var(--tracking-display)",
  color: "var(--text-on-page)",
}

export const dimOnDark: CSSProperties = { color: "var(--text-on-dark-faint)" }

export const GITHUB = "https://github.com/agentenna/agentenna"
export const MANIFESTO = `${GITHUB}/blob/main/docs/manifesto.md`
export const DOCS = `${GITHUB}#readme`
