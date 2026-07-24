"use client"

/* The hero demo: an HTML replay of the two-terminal moment. One emit on the
   left; the awareness block updating inside a Claude Code session on the
   right. Motion is signal-shaped — lines appear and replace, nothing bounces.
   Renders the final frame statically (SSR / reduced motion); loops after
   hydration. */

import * as React from "react"
import { VolumeX } from "lucide-react"

import { Badge, Led, Module } from "./primitives"
import { dimOnDark, labelSm, MONO } from "./styles"

const LOOP = 16000
const T = {
  typeStart: 600,
  typeEnd: 4200,
  ack: 4800,
  qStart: 6000,
  qEnd: 7200,
  think: 7800,
  panel: 8600,
  reply1: 10400,
  reply2: 11800,
  caption: 12800,
}

const EMIT_CMD = `agentenna emit prod.errors "Checkout 5xx rate jumped to 12%" --severity high`
const QUESTION = `what's up with checkout?`

const BEATS = Object.values(T)

/* Ticks only when the frame actually changes: at beat boundaries, every
   ~33ms inside the two typing windows, once per second for the timer.
   Pauses when the demo is off-screen. */
function useReplayClock(ref: React.RefObject<HTMLDivElement | null>) {
  /* null → static final frame (server render, first paint, reduced motion) */
  const [t, setT] = React.useState<number | null>(null)
  const elapsedRef = React.useRef(0)

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let timer: number | undefined
    let start = 0

    const tick = () => {
      const e = (performance.now() - start) % LOOP
      elapsedRef.current = e
      setT(e)
      const typing =
        (e >= T.typeStart && e < T.typeEnd) || (e >= T.qStart && e < T.qEnd)
      const nextBeat = Math.min(...BEATS.filter((b) => b > e), LOOP)
      const nextSecond = (Math.floor(e / 1000) + 1) * 1000
      const next = typing ? e + 33 : Math.min(nextBeat, nextSecond)
      timer = window.setTimeout(tick, Math.max(16, next - e))
    }

    const stop = () => window.clearTimeout(timer)
    const observer = new IntersectionObserver(([entry]) => {
      stop()
      if (entry.isIntersecting) {
        start = performance.now() - elapsedRef.current
        tick()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => {
      stop()
      observer.disconnect()
    }
  }, [ref])

  return t
}

function slice(text: string, t: number | null, from: number, to: number) {
  if (t === null || t >= to) return text
  if (t <= from) return ""
  return text.slice(0, Math.floor(((t - from) / (to - from)) * text.length))
}

const reveal = (on: boolean): React.CSSProperties => ({
  opacity: on ? 1 : 0,
  transition: "opacity var(--dur-slow) var(--ease-out)",
})

function Caret({ on = true }: { on?: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 7,
        height: 13,
        background: "var(--screen-text)",
        animation: "led-blink 1.2s ease-in-out infinite",
        verticalAlign: "-2px",
        opacity: on ? 1 : 0,
      }}
    />
  )
}

function Term({
  num,
  title,
  children,
}: {
  num: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-screen)",
        border: "1px solid #0E0F0D",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-inset-deep)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 12px",
          borderBottom: "1px solid var(--border-on-dark)",
        }}
      >
        <Led status="ok" size={6} />
        <span style={{ ...labelSm, color: "var(--text-on-dark-muted)" }}>
          Terminal {num} · {title}
        </span>
      </div>
      <div
        style={{
          padding: "12px 14px",
          fontFamily: MONO,
          fontSize: 12,
          lineHeight: 1.8,
          color: "var(--screen-text)",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* A line that reserves its final space while it types (no layout jumps). */
function TypedLine({
  prefix,
  text,
  done,
  typed,
  caret,
  doneNode,
}: {
  prefix: React.ReactNode
  text: string
  done: boolean
  typed: string
  caret: boolean
  doneNode?: React.ReactNode
}) {
  return (
    <div style={{ position: "relative" }}>
      <div aria-hidden style={{ visibility: "hidden" }}>
        {prefix} {text}
      </div>
      <div style={{ position: "absolute", inset: 0 }}>
        {prefix} {done && doneNode ? doneNode : typed}
        {caret && <Caret />}
      </div>
    </div>
  )
}

const AwarenessPanel = React.memo(function AwarenessPanel() {
  const row: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: "3px 10px",
  }
  const sec: React.CSSProperties = {
    ...labelSm,
    color: "var(--text-on-dark-muted)",
    padding: "6px 10px 3px",
  }
  return (
    <div
      style={{
        border: "1px solid var(--border-on-dark-strong)",
        borderRadius: "var(--radius-sm)",
        margin: "8px 0",
        fontSize: 11.5,
        background: "var(--surface-screen-deep)",
      }}
    >
      <div
        style={{
          padding: "7px 10px",
          borderBottom: "1px solid var(--border-on-dark)",
          ...dimOnDark,
        }}
      >
        {"<"}
        <span style={{ color: "var(--screen-text)" }}>agentenna-awareness</span>
        {' slot="agentenna:events">'}
      </div>
      <div style={sec}>Events · New (1)</div>
      <div
        style={{
          borderLeft: "2px solid var(--red-500)",
          background: "rgba(223,58,44,0.07)",
          padding: "5px 10px 6px 8px",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
        >
          <span>
            <span style={{ color: "var(--red-400)" }}>●NEW</span>
            &nbsp;&nbsp;Checkout 5xx rate jumped to 12%
          </span>
          <span style={dimOnDark}>14:31:58</span>
        </div>
        <div style={dimOnDark}>prod.errors · checkout_api · high</div>
      </div>
      <div style={sec}>Other events (2)</div>
      <div style={row}>
        <span>Payment timeouts elevated</span>
        <span style={dimOnDark}>14:25:11</span>
      </div>
      <div style={row}>
        <span>DB slow query rate high</span>
        <span style={dimOnDark}>14:12:07</span>
      </div>
      <div style={sec}>States (2)</div>
      <div style={row}>
        <span>checkout.incident</span>
        <span style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
          <Badge tone="ok" dark>
            active
          </Badge>
          <span style={dimOnDark}>14:30:02</span>
        </span>
      </div>
      <div style={{ ...row, paddingBottom: 6 }}>
        <span>deploy.rollout</span>
        <span style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
          <Badge tone="ok" dark>
            ok
          </Badge>
          <span style={dimOnDark}>14:28:44</span>
        </span>
      </div>
      <div
        style={{
          padding: "6px 10px",
          borderTop: "1px solid var(--border-on-dark)",
          ...dimOnDark,
        }}
      >
        use inspect(id) for details · rewind for history
      </div>
    </div>
  )
})

export function Demo() {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const t = useReplayClock(rootRef)
  const at = (ms: number) => t === null || t >= ms

  const emitTyped = slice(EMIT_CMD, t, T.typeStart, T.typeEnd)
  const qTyped = slice(QUESTION, t, T.qStart, T.qEnd)

  const secs = Math.floor((t ?? LOOP - 1) / 1000)
  const timer = `00:${String(secs).padStart(2, "0")} / 00:${LOOP / 1000}`
  const filled = t === null ? 7 : Math.min(7, Math.floor((t / LOOP) * 8))

  return (
    <div ref={rootRef}>
      <Module
        variant="chassis"
        led="live"
        ledBlink
        label="Live demo · Two terminals"
        meta={
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
          >
            {timer}
            <VolumeX size={13} strokeWidth={1.5} />
          </span>
        }
        padding="var(--space-3)"
      >
        <div className="grid items-stretch gap-2.5 lg:[grid-template-columns:1fr_1.35fr]">
          <Term num={1} title="Producer">
            <TypedLine
              prefix={<span style={dimOnDark}>$</span>}
              text={EMIT_CMD}
              done={at(T.typeEnd)}
              typed={emitTyped}
              caret={t !== null && !at(T.typeEnd)}
              doneNode={
                <>
                  agentenna emit prod.errors{" "}
                  <span style={{ color: "var(--red-400)" }}>
                    &quot;Checkout 5xx rate jumped to 12%&quot;
                  </span>{" "}
                  --severity high
                </>
              }
            />
            <div style={reveal(at(T.ack))}>
              <span style={{ color: "var(--status-ok-text-on-dark)" }}>✓</span>{" "}
              emitted to prod.errors
            </div>
            <Caret on={at(T.ack)} />
          </Term>
          <Term num={2} title="Claude Code (with agentenna)">
            <div>$ agentenna install claude-code</div>
            <div>
              <span style={{ color: "var(--status-ok-text-on-dark)" }}>✓</span>{" "}
              Installed agentenna plugin for Claude Code
            </div>
            <div style={{ height: 8 }} />
            <div>$ claude</div>
            <div style={reveal(t === null || t >= T.qStart)}>
              <TypedLine
                prefix={<span style={dimOnDark}>&gt;</span>}
                text={QUESTION}
                done={at(T.qEnd)}
                typed={qTyped}
                caret={t !== null && t >= T.qStart && !at(T.qEnd)}
              />
            </div>
            <div style={reveal(at(T.think))}>
              <span style={dimOnDark}>●</span>
              {" I'll check the awareness feed for checkout."}
            </div>
            <div style={reveal(at(T.panel))}>
              <AwarenessPanel />
            </div>
            <div style={reveal(at(T.reply1))}>
              Checkout is experiencing elevated 5xx errors — current rate is
              12%. This started ~2 minutes ago and an incident is active.
            </div>
            <div style={{ marginTop: 8, ...reveal(at(T.reply2)) }}>
              I can pull the details or recent related events if you want.
            </div>
          </Term>
        </div>
        <div
          style={{ display: "flex", gap: 6, margin: "12px 2px 0" }}
          aria-hidden
        >
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background:
                  i <= filled ? "var(--red-500)" : "var(--led-off-dark)",
                transition: "background var(--dur-med) var(--ease-out)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            fontFamily: MONO,
            fontSize: 12,
          }}
        >
          <span
            style={{
              color: at(T.caption)
                ? "var(--text-on-dark)"
                : "var(--text-on-dark-faint)",
              transition: "color var(--dur-slow) var(--ease-out)",
            }}
          >
            It already knew.
          </span>
          <span style={{ color: "var(--text-on-dark-muted)" }}>
            Auto-loop · Muted
          </span>
        </div>
      </Module>
    </div>
  )
}
