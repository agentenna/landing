import { ArrowUpRight, Star } from "lucide-react"

import { CopyButton } from "./copy-button"
import { GITHUB, MANIFESTO } from "./links"

/* Deterministic signal-activity bars (percent heights). Two alert spikes. */
const BARS = [
  22, 34, 18, 41, 28, 52, 37, 24, 46, 31, 58, 40, 26, 49, 35, 62, 44, 30, 55,
  38, 70, 48, 92, 42, 33, 60, 45, 27, 51, 86, 39, 57, 43, 66, 50, 74,
]
const ALERT_BARS = new Set([22, 29])

const CHANNELS: [string, number][] = [
  ["prod.errors", 12],
  ["ci.builds", 5],
  ["terminal.logs", 28],
  ["support.urgent", 3],
]

const EVENTS: {
  tone: "alert" | "ok"
  message: string
  source: string
  t: string
}[] = [
  {
    tone: "alert",
    message: "Billing worker failed processing webhook",
    source: "prod.errors",
    t: "-2m",
  },
  {
    tone: "ok",
    message: "deploy.prod rolled_back",
    source: "states",
    t: "-2m",
  },
  {
    tone: "ok",
    message: "task opened: investigate checkout 5xx",
    source: "tasks",
    t: "-11m",
  },
]

function SignalPanel() {
  return (
    <div className="chassis rounded-lg p-2 sm:p-2.5">
      <div className="display-panel rounded-md p-4 font-mono sm:p-5">
        {/* rail */}
        <div className="flex items-center justify-between">
          <span className="ag-label-sm text-muted">Signal activity</span>
          <span className="ag-label-sm text-lime flex items-center gap-1.5">
            <span className="bg-lime animate-led-pulse size-1.5 rounded-full" />
            Live
          </span>
        </div>

        {/* chart */}
        <div
          className="mt-4 flex h-20 items-end gap-[3px]"
          role="img"
          aria-label="Signal activity over the last 24 hours: steady event volume with two alert spikes"
        >
          {BARS.map((h, i) => (
            <span
              key={i}
              className={
                ALERT_BARS.has(i)
                  ? "bg-signal min-w-0 flex-1 rounded-[1px]"
                  : "bg-lime/70 min-w-0 flex-1 rounded-[1px]"
              }
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="text-muted mt-2 flex justify-between text-[10px] tracking-wide">
          <span>-24h</span>
          <span>-18h</span>
          <span>-12h</span>
          <span>-6h</span>
          <span>now</span>
        </div>

        {/* channels */}
        <div className="mt-4 border-t border-(--color-line-subtle) pt-4">
          <span className="ag-label-sm text-muted">Channels</span>
          <ul className="mt-2.5 space-y-1.5">
            {CHANNELS.map(([name, count]) => (
              <li
                key={name}
                className="flex items-center gap-2.5 text-[13px]"
              >
                <span className="bg-lime size-1.5 shrink-0 rounded-full" />
                <span className="text-foreground/90">{name}</span>
                <span className="text-muted ml-auto tabular-nums">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* recent events */}
        <div className="mt-4 border-t border-(--color-line-subtle) pt-4">
          <span className="ag-label-sm text-muted">Recent events</span>
          <ul className="mt-2.5 space-y-2">
            {EVENTS.map((e) => (
              <li key={e.message} className="flex items-baseline gap-2.5">
                <span
                  className={
                    e.tone === "alert"
                      ? "bg-signal size-1.5 shrink-0 self-center rounded-full"
                      : "bg-lime size-1.5 shrink-0 self-center rounded-full"
                  }
                />
                <span className="text-foreground/90 min-w-0 truncate text-[13px]">
                  {e.message}
                </span>
                <span className="text-muted ml-auto shrink-0 text-[11px] tabular-nums">
                  {e.source} · {e.t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      <div>
        <p className="ag-label text-signal">
          — The awareness layer for AI agents
        </p>
        <h1 className="font-brand mt-5 text-[42px] leading-[1.02] font-normal tracking-tight text-balance sm:text-6xl">
          Your agent already knows.
        </h1>
        <p className="text-dim mt-6 max-w-lg text-lg leading-relaxed">
          Agentenna gives agents a live, token-bounded view of what&apos;s
          happening — messages, logs, alerts, tickets — rendered straight into
          context, refreshed every turn. Inspect the details, rewind the
          history, wake up when it matters.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="display-panel flex h-11 items-center gap-3 rounded-sm pr-1.5 pl-4 font-mono text-sm">
            <span aria-hidden className="text-muted select-none">
              $
            </span>
            pip install agentenna
            <CopyButton text="pip install agentenna" label="Copy install command" />
          </span>
          <a
            href={GITHUB}
            className="bg-surface-3 hover:bg-surface-2 font-brand inline-flex h-11 items-center gap-2 rounded-sm border border-white/10 px-4 text-sm font-medium text-inherit no-underline transition-colors duration-100"
          >
            <Star size={14} strokeWidth={1.5} />
            Star on GitHub
          </a>
        </div>

        <a
          href={MANIFESTO}
          className="text-dim hover:text-foreground mt-7 inline-flex items-center gap-1 font-mono text-sm no-underline transition-colors duration-100"
        >
          Read the manifesto
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>
      </div>

      <SignalPanel />
    </section>
  )
}
