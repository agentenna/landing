import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  Box,
  CheckCircle2,
  Database,
  Eye,
  Filter,
  Hexagon,
  Link2,
  Lock,
  Monitor,
  Plug,
  Radio,
  RotateCcw,
  ShieldCheck,
  SquareTerminal,
  Terminal,
  Ticket,
  Webhook,
  type LucideIcon,
} from "lucide-react"
import { AntennaMark } from "./mark"

/* The awareness-flow diagram: a ground-to-peak antenna tower at center,
   EMIT and READ nodes on the ground line at the corners, and dashed lime
   signal beams converging at the peak — the whole composition draws the
   same "A" the AntennaMark does. Desktop (lg+) is a fixed-aspect stage:
   two SVG layers (tower/ground below, beams above) with HTML overlays
   positioned by percentages; below lg the flow stacks vertically. */

const SOURCES: { icon: LucideIcon; label: string }[] = [
  { icon: Terminal, label: "Logs" },
  { icon: Activity, label: "Metrics" },
  { icon: AlertTriangle, label: "Alerts" },
  { icon: Ticket, label: "Tickets" },
  { icon: Webhook, label: "Webhooks" },
  { icon: Monitor, label: "Terminal" },
  { icon: Bot, label: "Other agents" },
]

const READERS: { icon: LucideIcon; label: string }[] = [
  { icon: SquareTerminal, label: "Claude Code" },
  { icon: Hexagon, label: "Pydantic AI" },
  { icon: Link2, label: "LangChain" },
  { icon: Plug, label: "Any MCP Host" },
  { icon: Box, label: "Your Agent" },
]

const CAPABILITIES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Database, title: "Stores everything", desc: "Durable history" },
  { icon: Filter, title: "Organizes & deduplicates", desc: "Signals become context" },
  { icon: RotateCcw, title: "Lets you rewind", desc: "Full-text search" },
  { icon: CheckCircle2, title: "Tracks acknowledgements", desc: "Per-reader positions" },
  { icon: Bell, title: "Triggers & tasks", desc: "Wake when it matters" },
]

const TRAITS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: ShieldCheck, title: "Reliable", desc: "At-least-once delivery" },
  { icon: Activity, title: "Observable", desc: "Inspect details. See what the agent sees." },
  { icon: Lock, title: "Private", desc: "Self-hosted. Your data stays yours." },
]

const EMIT_TAGLINE = "Any system. Any format. One signal at a time."
const READ_TAGLINE = "Plug in easily. Stay aware with minimal tokens."

/* Circular ground node shared by both layouts. */
function FlowNode({
  icon: Icon,
  label,
  sub,
}: {
  icon: LucideIcon
  label: string
  sub: string
}) {
  return (
    <div className="display-panel flex h-32 w-32 flex-col items-center justify-center gap-1.5 rounded-full text-center">
      <Icon size={18} strokeWidth={1.5} className="text-lime" />
      <div className="font-brand text-lg font-medium leading-none tracking-widest text-foreground">
        {label}
      </div>
      <div className="font-mono text-[9px] uppercase tracking-wider text-muted">
        {sub}
      </div>
    </div>
  )
}

/* Vertical dashed connector for the stacked (mobile) flow. */
function FlowBeam({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-5">
      <span className="ag-label-sm text-lime/80">{label}</span>
      <span className="h-8 border-l border-dashed border-lime/50" />
      <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden className="fill-lime/70">
        <path d="M0 0h10L5 6Z" />
      </svg>
    </div>
  )
}

function StationHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="font-brand text-lime text-lg font-medium tracking-widest">
        STATION
      </h3>
      <p className="ag-label-sm text-muted mt-1.5">Your self-hosted hub</p>
    </div>
  )
}

function CapabilityRows() {
  return (
    <div className="mt-4 space-y-3 border-t border-line-subtle pt-4">
      {CAPABILITIES.map((item) => (
        <div key={item.title} className="flex gap-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-line-subtle bg-surface-2 text-muted">
            <item.icon size={12} strokeWidth={2} />
          </div>
          <div>
            <div className="text-[13px] font-medium leading-tight text-foreground">
              {item.title}
            </div>
            <div className="text-dim mt-0.5 text-[11px] leading-snug">
              {item.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Architecture() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24">
      {/* Header — top-left so the tower peak owns top-center on desktop */}
      <div className="relative z-10 max-w-md lg:max-w-xs">
        <p className="ag-label text-signal">Awareness Flows</p>
        <h2 className="font-brand mt-4 text-3xl font-medium uppercase tracking-tight sm:text-4xl">
          Through Agentenna
        </h2>
        <p className="text-dim mt-4 text-base leading-relaxed">
          Emit signals from anywhere. Station organizes and preserves. Readers
          stay aware.
        </p>
      </div>

      {/* ── Desktop stage: the "A" diagram ─────────────────────────────── */}
      <div className="relative hidden aspect-[1104/660] lg:-mt-36 lg:block">
        {/* Layer 0 — ground, tower, broadcast arcs, peak node */}
        <svg
          viewBox="0 0 1104 660"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <line
            x1="16"
            y1="581"
            x2="1088"
            y2="581"
            className="stroke-line"
            strokeWidth="1"
          />
          <g
            className="stroke-foreground/80"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* legs — ground to peak (lower half hidden behind the card) */}
            <path d="M552 60 462 581M552 60 642 581" />
            {/* crossbars + lattice bracing on the exposed mast */}
            <path d="M538.2 140h27.6M523.5 225h57" />
            <path d="M538.2 140 580.5 225M565.8 140 523.5 225" />
          </g>
          <g
            className="animate-led-pulse stroke-lime"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="552" cy="60" r="22" strokeDasharray="1 6" opacity="0.6" />
            <circle cx="552" cy="60" r="40" strokeDasharray="1 7" opacity="0.4" />
            <circle cx="552" cy="60" r="58" strokeDasharray="1 8" opacity="0.25" />
          </g>
          <circle cx="552" cy="60" r="6.5" className="fill-lime" />
        </svg>

        {/* EMIT node — on the ground, left corner of the A */}
        <div className="absolute left-[17%] top-[88%] z-10 -translate-x-1/2 -translate-y-1/2">
          <FlowNode icon={Radio} label="EMIT" sub="From everywhere" />
        </div>

        {/* Source list — left flank, dotted leaders toward the emit node */}
        <div className="absolute left-0 top-1/2 z-10 w-44 -translate-y-1/2 space-y-3.5">
          {SOURCES.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <item.icon size={14} strokeWidth={1.5} className="shrink-0 text-muted" />
              <span className="font-mono text-xs text-dim">{item.label}</span>
              <span className="mb-px flex-1 border-b border-dotted border-foreground/20" />
            </div>
          ))}
          <div className="font-mono text-[10px] text-muted">... and more</div>
        </div>

        {/* Station card — grounded at the tower base, inside the triangle */}
        <div className="display-panel absolute left-1/2 top-[88%] z-10 w-72 -translate-x-1/2 -translate-y-full rounded-lg p-5">
          <StationHeader />
          <CapabilityRows />
        </div>

        {/* Reader list — right flank, dotted leaders toward the read node */}
        <div className="absolute right-0 top-1/2 z-10 w-44 -translate-y-1/2 space-y-3.5">
          {READERS.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="mb-px flex-1 border-b border-dotted border-foreground/20" />
              <item.icon size={14} strokeWidth={1.5} className="shrink-0 text-muted" />
              <span className="font-mono text-xs text-dim">{item.label}</span>
            </div>
          ))}
        </div>

        {/* READ node — on the ground, right corner of the A */}
        <div className="absolute left-[83%] top-[88%] z-10 -translate-x-1/2 -translate-y-1/2">
          <FlowNode icon={Eye} label="READ" sub="In any agent" />
        </div>

        {/* Layer 2 — signal beams, above the card so they never get cut */}
        <svg
          viewBox="0 0 1104 660"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          aria-hidden
        >
          <defs>
            <marker
              id="beam-arrow"
              viewBox="0 0 8 8"
              refX="6.5"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L8 4L0 8Z" className="fill-lime/90" />
            </marker>
          </defs>
          <g
            className="stroke-lime/75"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="3 9"
          >
            <path
              d="M232 519 526 98"
              markerEnd="url(#beam-arrow)"
              className="animate-beam-flow"
            />
            <path
              d="M578 98 872 519"
              markerEnd="url(#beam-arrow)"
              className="animate-beam-flow"
            />
          </g>
          <g
            className="fill-lime/80 font-mono text-[11px]"
            textAnchor="middle"
            style={{ letterSpacing: "0.12em" }}
          >
            <text x="364" y="298" transform="rotate(-55 364 298)">
              SIGNALS IN
            </text>
            <text x="740" y="298" transform="rotate(55 740 298)">
              AWARENESS OUT
            </text>
          </g>
        </svg>
      </div>

      {/* Desktop taglines — centered under each ground node */}
      <div className="mt-3 hidden justify-between lg:flex">
        <p className="text-dim w-[34%] text-center text-xs leading-relaxed">
          {EMIT_TAGLINE}
        </p>
        <p className="text-dim w-[34%] text-center text-xs leading-relaxed">
          {READ_TAGLINE}
        </p>
      </div>

      {/* ── Stacked flow below lg: emit → station → read ───────────────── */}
      <div className="mx-auto mt-12 flex max-w-md flex-col items-center lg:hidden">
        <FlowNode icon={Radio} label="EMIT" sub="From everywhere" />
        <div className="surface mt-5 w-full rounded-lg p-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs">
            {SOURCES.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-dim">
                <item.icon size={14} strokeWidth={1.5} className="shrink-0 text-muted" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 font-mono text-[10px] text-muted">
            ... and more
          </div>
          <p className="text-dim mt-4 border-t border-line-subtle pt-3 text-xs">
            {EMIT_TAGLINE}
          </p>
        </div>

        <FlowBeam label="Signals in" />

        <div className="display-panel w-full rounded-lg p-5">
          <div className="flex flex-col items-center">
            <AntennaMark size={40} />
            <div className="mt-3">
              <StationHeader />
            </div>
          </div>
          <CapabilityRows />
        </div>

        <FlowBeam label="Awareness out" />

        <FlowNode icon={Eye} label="READ" sub="In any agent" />
        <div className="surface mt-5 w-full rounded-lg p-5">
          <div className="space-y-3 font-mono text-xs">
            {READERS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-dim">
                <item.icon size={14} strokeWidth={1.5} className="shrink-0 text-muted" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-dim mt-4 border-t border-line-subtle pt-3 text-xs">
            {READ_TAGLINE}
          </p>
        </div>
      </div>

      {/* Footer traits */}
      <div className="chassis mt-10 grid overflow-hidden rounded-lg p-1.5 sm:grid-cols-3">
        {TRAITS.map((item) => (
          <div
            key={item.title}
            className="surface m-1 flex items-center gap-4 rounded-md p-5 sm:m-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-subtle bg-surface-2 text-lime">
              <item.icon size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-wider text-foreground">
                {item.title}
              </h4>
              <p className="text-dim mt-1 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
