"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { label, MONO } from "./styles"

/* The primary CTA: the command IS the button. */
export function PipBar({ style }: { style?: React.CSSProperties }) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<number | undefined>(undefined)

  const copy = async () => {
    const text = "pip install agentenna"
    let ok = false
    try {
      await navigator.clipboard.writeText(text)
      ok = true
    } catch {
      const ta = document.createElement("textarea")
      ta.value = text
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      try {
        ok = document.execCommand("copy")
      } catch {
        ok = false
      }
      ta.remove()
    }
    if (!ok) return
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "var(--surface-screen)",
        border: "1px solid #0E0F0D",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-inset-deep)",
        padding: "12px 14px",
        fontFamily: MONO,
        fontSize: 15,
        color: "var(--screen-text)",
        ...style,
      }}
    >
      <span aria-hidden style={{ color: "var(--text-on-dark-faint)" }}>
        $
      </span>
      <span style={{ flex: 1, whiteSpace: "nowrap", textAlign: "left" }}>
        pip <span style={{ color: "var(--red-400)" }}>install</span> agentenna
      </span>
      <button
        onClick={copy}
        aria-label="Copy pip install agentenna"
        style={{
          appearance: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "8px 12px",
          background: "var(--surface-plate-raised)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-subplate)",
          color: "var(--text-body)",
          ...label,
        }}
      >
        {copied ? (
          <Check size={12} strokeWidth={1.5} />
        ) : (
          <Copy size={12} strokeWidth={1.5} />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  )
}
