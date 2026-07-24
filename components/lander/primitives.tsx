"use client"

/* Hardware primitives ported from the Agentenna design system
   (components/modules + components/actions + components/display).
   Rack → Module → Submodule: pages are racks of modules; submodules embed
   (recessed wells, screens) or extrude (raised plates, buttons) inside the
   module frame. Every LED reflects a real state. */

import * as React from "react"

/* ── Led — the brand's signature status primitive ─────────────────────── */

export type LedStatus = "ok" | "warn" | "alert" | "live" | "off"

const LED_COLORS: Record<LedStatus, string> = {
  ok: "var(--led-ok)",
  warn: "var(--led-warn)",
  alert: "var(--led-alert)",
  live: "var(--red-500)",
  off: "var(--led-off)",
}

const LED_GLOWS: Partial<Record<LedStatus, string>> = {
  ok: "var(--glow-ok)",
  warn: "var(--glow-warn)",
  alert: "var(--glow-alert)",
  live: "var(--glow-live)",
}

export function Led({
  status = "ok",
  blink = false,
  size = 8,
  label,
  style,
}: {
  status?: LedStatus
  blink?: boolean
  size?: number
  label?: string
  style?: React.CSSProperties
}) {
  const dot = (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        flex: "none",
        background: LED_COLORS[status],
        boxShadow: LED_GLOWS[status] ?? "inset 0 1px 1px rgba(0,0,0,0.45)",
        animation: blink ? "led-blink 1.6s ease-in-out infinite" : "none",
        ...(label ? {} : style),
      }}
    />
  )
  if (!label) return dot
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: 6, ...style }}
    >
      {dot}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        {label}
      </span>
    </span>
  )
}

/* ── Module — the mounted faceplate / chassis panel ───────────────────── */

type ScrewPos = [
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined,
]

function Screw({ pos, dark }: { pos: ScrewPos; dark: boolean }) {
  const ring = dark ? "#111210" : "#B9B7B0"
  const face = dark
    ? "radial-gradient(circle at 42% 36%,#33342F,#1C1D1B 78%)"
    : "radial-gradient(circle at 42% 36%,#E3E1DA,#C2C0B9 78%)"
  const dot = dark ? "#0B0C0A" : "#2A2B28"
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        width: "var(--fastener-size)",
        height: "var(--fastener-size)",
        borderRadius: "50%",
        background: face,
        border: `1px solid ${ring}`,
        boxShadow: dark
          ? "inset 0 1px 1px rgba(255,255,255,0.10),0 1px 1px rgba(0,0,0,0.45)"
          : "inset 0 1px 1px rgba(255,255,255,0.7),0 1px 1px rgba(0,0,0,0.28)",
        top: pos[0],
        bottom: pos[1],
        left: pos[2],
        right: pos[3],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: "32%",
          height: "32%",
          borderRadius: "50%",
          background: dot,
          boxShadow: "0 0.5px 0.5px rgba(255,255,255,0.35)",
        }}
      />
    </span>
  )
}

const SCREW_POSITIONS: ScrewPos[] = [
  [7, undefined, 7, undefined],
  [7, undefined, undefined, 7],
  [undefined, 7, 7, undefined],
  [undefined, 7, undefined, 7],
]

export function Module({
  variant = "plate",
  label,
  meta,
  led,
  ledBlink = false,
  padding = "var(--space-4)",
  fasteners = false,
  id,
  className,
  style,
  children,
}: {
  variant?: "plate" | "chassis"
  label?: React.ReactNode
  meta?: React.ReactNode
  led?: LedStatus
  ledBlink?: boolean
  padding?: string | number
  fasteners?: boolean
  id?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  const dark = variant === "chassis"
  const border = dark ? "var(--border-on-dark)" : "var(--border-default)"
  return (
    <section
      id={id}
      className={className}
      style={{
        position: "relative",
        minWidth: 0,
        background: dark
          ? "linear-gradient(180deg,#1F201F 0%,var(--surface-chassis) 60%)"
          : "linear-gradient(180deg,#DFDDD7 0%,var(--surface-plate) 55%,#D1CFC8 100%)",
        color: dark ? "var(--text-on-dark)" : "var(--text-body)",
        border: `1px solid ${border}`,
        borderRadius: "var(--radius-module)",
        boxShadow: dark ? "var(--shadow-card-dark)" : "var(--shadow-card)",
        ...style,
      }}
    >
      {(label || meta || led) && (
        <header
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-2)",
            minHeight: "var(--rail-h)",
            padding: "6px var(--space-3)",
            borderBottom: `1px solid ${border}`,
            boxShadow: dark
              ? "0 1px 0 rgba(255,255,255,0.04)"
              : "0 1px 0 rgba(255,255,255,0.45)",
          }}
        >
          {led && <Led status={led} blink={ledBlink} />}
          {label && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                fontWeight: 500,
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          )}
          {meta && (
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                letterSpacing: "0.04em",
                color: dark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
              }}
            >
              {meta}
            </span>
          )}
        </header>
      )}
      <div style={{ padding }}>{children}</div>
      {fasteners &&
        SCREW_POSITIONS.map((p, i) => <Screw key={i} pos={p} dark={dark} />)}
    </section>
  )
}

/* ── Plate — raised subplate or recessed well inside a module ─────────── */

export function Plate({
  dark = false,
  mode = "raised",
  texture,
  padding = "var(--space-3)",
  className,
  style,
  children,
}: {
  dark?: boolean
  mode?: "raised" | "recessed"
  texture?: "vent"
  padding?: string | number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  const vent = texture === "vent"
  const rec = mode === "recessed"
  const bg = rec
    ? dark
      ? "var(--surface-tray-dark)"
      : "var(--surface-plate-sunken)"
    : dark
      ? "var(--surface-chassis-raised)"
      : "var(--surface-plate-raised)"
  const shadow = rec
    ? dark
      ? "var(--shadow-tray-dark)"
      : "var(--shadow-inset)"
    : dark
      ? "inset 0 1px 0 rgba(255,255,255,0.06),0 1px 2px rgba(0,0,0,0.4)"
      : "var(--shadow-subplate)"
  return (
    <div
      className={className}
      style={{
        background: bg,
        color: dark ? "var(--text-on-dark)" : "var(--text-body)",
        border: `1px solid ${dark ? (rec ? "#0F100E" : "var(--border-on-dark)") : "var(--border-default)"}`,
        borderRadius: "var(--radius-md)",
        boxShadow: shadow,
        padding,
        ...(vent
          ? {
              backgroundImage: `radial-gradient(circle at 3px 3px,${dark ? "var(--vent-dot-on-dark)" : "var(--vent-dot)"} 1.1px,transparent 1.6px)`,
              backgroundSize: "var(--vent-gap) var(--vent-gap)",
            }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── Screen — the dark inset mono well where live data lives ──────────── */

export function Screen({
  padding = "var(--space-3)",
  className,
  style,
  children,
}: {
  padding?: string | number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  return (
    <div
      className={className}
      style={{
        minWidth: 0,
        background: "var(--screen-bg)",
        color: "var(--screen-text)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-mono-sm)",
        lineHeight: 1.7,
        border: "2px solid #0E0F0D",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-inset-deep),0 1px 0 rgba(255,255,255,0.28)",
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── Button — machined action; primary red is THE accent (one per view) ─ */

export function Button({
  variant = "primary",
  size = "md",
  dark = false,
  href,
  style,
  children,
  ...rest
}: {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  dark?: boolean
  href?: string
  style?: React.CSSProperties
  children?: React.ReactNode
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "style"> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style">) {
  const [h, setH] = React.useState(false)
  const [p, setP] = React.useState(false)
  const hs = { sm: 26, md: 32, lg: 40 }[size]
  const fs = { sm: 12, md: 13, lg: 15 }[size]
  const pad = { sm: "0 10px", md: "0 14px", lg: "0 18px" }[size]
  let bg: string
  let color: string
  let border: string
  let shadow = "inset 0 1px 0 rgba(255,255,255,0.25),0 1px 2px rgba(0,0,0,0.35)"
  if (variant === "primary") {
    bg = p ? "var(--red-700)" : h ? "var(--red-600)" : "var(--red-500)"
    color = "var(--text-on-accent)"
    border = "1px solid var(--border-strong)"
  } else if (variant === "secondary") {
    if (dark) {
      bg = p ? "#1C1D1C" : h ? "#282927" : "var(--surface-chassis-raised)"
      color = "var(--text-on-dark)"
      border = `1px solid ${h ? "var(--border-on-dark-strong)" : "var(--border-on-dark)"}`
      shadow = "inset 0 1px 0 rgba(255,255,255,0.06),0 1px 2px rgba(0,0,0,0.4)"
    } else {
      bg = p ? "#CBC9C2" : h ? "#D6D4CD" : "var(--surface-plate-raised)"
      color = "var(--text-body)"
      border = "1px solid var(--border-strong)"
    }
  } else {
    bg = h
      ? dark
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.06)"
      : "transparent"
    color = dark ? "var(--text-on-dark)" : "var(--text-body)"
    border = `1px solid ${h ? (dark ? "var(--border-on-dark-strong)" : "var(--border-strong)") : "transparent"}`
    shadow = "none"
  }
  const shared: React.CSSProperties = {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: hs,
    padding: pad,
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: fs,
    letterSpacing: "0.01em",
    lineHeight: 1,
    color,
    background: bg,
    border,
    borderRadius: "var(--radius-md)",
    boxShadow: shadow,
    cursor: "pointer",
    textDecoration: "none",
    transform: p ? "translateY(1px)" : "none",
    transition:
      "background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out)",
    ...style,
  }
  const handlers = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false)
      setP(false)
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
  }
  if (href) {
    return (
      <a href={href} style={shared} {...handlers} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button style={shared} {...handlers} {...rest}>
      {children}
    </button>
  )
}

/* ── Badge — small status pill ────────────────────────────────────────── */

const BADGE_TONES: Record<
  string,
  { light: [string, string, string]; dark: [string, string, string] }
> = {
  neutral: {
    light: [
      "var(--surface-plate-sunken)",
      "var(--text-muted)",
      "var(--border-default)",
    ],
    dark: [
      "var(--surface-chassis-raised)",
      "var(--text-on-dark-muted)",
      "var(--border-on-dark)",
    ],
  },
  ok: {
    light: [
      "rgba(61,87,0,0.10)",
      "var(--status-ok-text)",
      "rgba(61,87,0,0.35)",
    ],
    dark: [
      "rgba(181,250,21,0.10)",
      "var(--status-ok-text-on-dark)",
      "rgba(181,250,21,0.25)",
    ],
  },
  warn: {
    light: ["rgba(95,98,0,0.10)", "#5F6200", "rgba(95,98,0,0.35)"],
    dark: ["rgba(234,242,18,0.10)", "#D8E014", "rgba(234,242,18,0.25)"],
  },
  alert: {
    light: ["rgba(223,58,44,0.10)", "var(--red-600)", "rgba(223,58,44,0.4)"],
    dark: ["rgba(223,58,44,0.12)", "var(--red-400)", "rgba(223,58,44,0.4)"],
  },
}

export function Badge({
  tone = "neutral",
  dark = false,
  dot = false,
  style,
  children,
}: {
  tone?: "neutral" | "ok" | "warn" | "alert"
  dark?: boolean
  dot?: boolean
  style?: React.CSSProperties
  children?: React.ReactNode
}) {
  const [bg, color, border] = (BADGE_TONES[tone] ?? BADGE_TONES.neutral)[
    dark ? "dark" : "light"
  ]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "2px 8px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-label-sm)",
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        lineHeight: 1.6,
        color,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "var(--radius-pill)",
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: color,
            flex: "none",
          }}
        />
      )}
      {children}
    </span>
  )
}
