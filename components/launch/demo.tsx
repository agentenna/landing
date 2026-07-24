"use client"

/* The two-terminal demo: an HTML replay of the launch moment. One emit on
   the left; the awareness block updating inside a Claude Code session on the
   right. Motion is signal-shaped — lines appear and replace, nothing
   bounces. Renders the final frame statically (SSR / reduced motion); loops
   after hydration. Ported from the original landing (components/lander/demo)
   onto the new design system. */

import * as React from "react"
import { VolumeX } from "lucide-react"

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

const EASE = "cubic-bezier(0.2, 0, 0, 1)"

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
  transition: `opacity 280ms ${EASE}`,
})

function Caret({ on = true }: { on?: boolean }) {
  return (
    <span
      aria-hidden
      className="animate-caret-blink bg-foreground/80 inline-block h-[13px] w-[7px] align-[-2px]"
      style={{ opacity: on ? undefined : 0 }}
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
    <div className="display-panel flex min-w-0 flex-col rounded-md">
      <div className="flex items-center gap-2 border-b border-(--color-line-subtle) px-3 py-2">
        <span className="bg-lime size-1.5 shrink-0 rounded-full" />
        <span className="ag-label-sm text-muted">
          Terminal {num} · {title}
        </span>
      </div>
      <div className="text-foreground/85 flex-1 p-3.5 font-mono text-xs leading-[1.8]">
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
    <div className="relative">
      <div aria-hidden className="invisible">
        {prefix} {text}
      </div>
      <div className="absolute inset-0">
        {prefix} {done && doneNode ? doneNode : typed}
        {caret && <Caret />}
      </div>
    </div>
  )
}

function OkBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-lime rounded-xs border border-(--color-lime)/30 px-1 text-[10px] uppercase">
      {children}
    </span>
  )
}

const AwarenessPanel = React.memo(function AwarenessPanel() {
  const row = "flex justify-between gap-3 px-2.5 py-[3px]"
  const sec = "ag-label-sm text-muted px-2.5 pt-1.5 pb-0.5"
  return (
    <div className="my-2 rounded-sm border border-white/12 bg-black/45 text-[11.5px]">
      <div className="text-muted border-b border-(--color-line-subtle) px-2.5 py-1.5">
        {"<"}
        <span className="text-foreground/85">agentenna-awareness</span>
        {' slot="agentenna:events">'}
      </div>
      <div className={sec}>Events · New (1)</div>
      <div className="border-l-2 border-(--color-signal) bg-(--color-signal)/8 py-1 pr-2.5 pl-2">
        <div className="flex justify-between gap-3">
          <span>
            <span className="text-signal">●NEW</span>
            &nbsp;&nbsp;Checkout 5xx rate jumped to 12%
          </span>
          <span className="text-muted">14:31:58</span>
        </div>
        <div className="text-muted">prod.errors · checkout_api · high</div>
      </div>
      <div className={sec}>Other events (2)</div>
      <div className={row}>
        <span>Payment timeouts elevated</span>
        <span className="text-muted">14:25:11</span>
      </div>
      <div className={row}>
        <span>DB slow query rate high</span>
        <span className="text-muted">14:12:07</span>
      </div>
      <div className={sec}>States (2)</div>
      <div className={row}>
        <span>checkout.incident</span>
        <span className="inline-flex items-center gap-2.5">
          <OkBadge>active</OkBadge>
          <span className="text-muted">14:30:02</span>
        </span>
      </div>
      <div className={`${row} pb-1.5`}>
        <span>deploy.rollout</span>
        <span className="inline-flex items-center gap-2.5">
          <OkBadge>ok</OkBadge>
          <span className="text-muted">14:28:44</span>
        </span>
      </div>
      <div className="text-muted border-t border-(--color-line-subtle) px-2.5 py-1.5">
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
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div ref={rootRef} className="chassis rounded-lg p-2 sm:p-2.5">
        <div className="flex items-center justify-between px-1.5 pt-0.5 pb-2">
          <span className="ag-label-sm text-dim flex items-center gap-2">
            <span className="bg-lime animate-led-pulse size-1.5 rounded-full" />
            Live demo · Two terminals
          </span>
          <span className="text-muted flex items-center gap-2.5 font-mono text-xs tabular-nums">
            {timer}
            <VolumeX size={13} strokeWidth={1.5} aria-label="Muted" />
          </span>
        </div>

        <div className="grid items-stretch gap-2 lg:[grid-template-columns:1fr_1.35fr]">
          <Term num={1} title="Producer">
            <TypedLine
              prefix={<span className="text-muted">$</span>}
              text={EMIT_CMD}
              done={at(T.typeEnd)}
              typed={emitTyped}
              caret={t !== null && !at(T.typeEnd)}
              doneNode={
                <>
                  agentenna emit prod.errors{" "}
                  <span className="text-signal">
                    &quot;Checkout 5xx rate jumped to 12%&quot;
                  </span>{" "}
                  --severity high
                </>
              }
            />
            <div style={reveal(at(T.ack))}>
              <span className="text-lime">✓</span> emitted to prod.errors
            </div>
            <Caret on={at(T.ack)} />
          </Term>

          <Term num={2} title="Claude Code (with agentenna)">
            <div>$ agentenna install claude-code</div>
            <div>
              <span className="text-lime">✓</span> Installed agentenna plugin
              for Claude Code
            </div>
            <div className="h-2" />
            <div>$ claude</div>
            <div style={reveal(t === null || t >= T.qStart)}>
              <TypedLine
                prefix={<span className="text-muted">&gt;</span>}
                text={QUESTION}
                done={at(T.qEnd)}
                typed={qTyped}
                caret={t !== null && t >= T.qStart && !at(T.qEnd)}
              />
            </div>
            <div style={reveal(at(T.think))}>
              <span className="text-muted">●</span>
              {" I'll check the awareness feed for checkout."}
            </div>
            <div style={reveal(at(T.panel))}>
              <AwarenessPanel />
            </div>
            <div style={reveal(at(T.reply1))}>
              Checkout is experiencing elevated 5xx errors — current rate is
              12%. This started ~2 minutes ago and an incident is active.
            </div>
            <div className="mt-2" style={reveal(at(T.reply2))}>
              I can pull the details or recent related events if you want.
            </div>
          </Term>
        </div>

        <div className="mx-0.5 mt-3 flex gap-1.5" aria-hidden>
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-[2px] transition-colors duration-200 ${
                i <= filled ? "bg-lime/80" : "bg-white/10"
              }`}
            />
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between px-0.5 pb-0.5 font-mono text-xs">
          <span
            className={`transition-colors duration-300 ${
              at(T.caption) ? "text-foreground" : "text-muted/60"
            }`}
          >
            It already knew.
          </span>
          <span className="text-muted">Auto-loop · Muted</span>
        </div>
      </div>
    </section>
  )
}
