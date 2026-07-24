import type { CSSProperties, ReactNode } from "react"
import { Plug, Route, ScanText, Send, Star, Zap } from "lucide-react"

import { AntennaMark } from "./mark"
import { Demo } from "./demo"
import { PipBar } from "./pip"
import { AwarenessSurface } from "./surface"
import {
  Button,
  Led,
  Module,
  Plate,
  Screen,
  type LedStatus,
} from "./primitives"
import {
  dimOnDark,
  DOCS,
  GITHUB,
  label,
  labelSm,
  MANIFESTO,
  MONO,
} from "./styles"

/* ── shared section furniture ─────────────────────────────────────────── */

const displayStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  lineHeight: "var(--leading-display)",
  letterSpacing: "var(--tracking-display)",
  color: "var(--text-on-page)",
}

function SectionHeader({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow: string
  title: ReactNode
  sub?: ReactNode
  center?: boolean
}) {
  return (
    <div
      style={{ marginBottom: 36, ...(center ? { textAlign: "center" } : {}) }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          color: "var(--text-on-page-muted)",
          ...(center ? { justifyContent: "center" } : {}),
        }}
      >
        <Led status="ok" size={7} />
        <span style={label}>{eyebrow}</span>
      </div>
      <h2
        style={{
          ...displayStyle,
          fontSize: "clamp(30px, 4.2vw, 44px)",
          margin: "16px 0 0",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--text-on-page-muted)",
            maxWidth: "68ch",
            margin: center ? "16px auto 0" : "16px 0 0",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

function QuoteBand({ line, sub }: { line: ReactNode; sub?: ReactNode }) {
  return (
    <div className="px-6 py-20 text-center md:py-28">
      <p
        style={{
          ...displayStyle,
          fontSize: "clamp(30px, 5vw, 56px)",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {line}
      </p>
      {sub && (
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--text-on-page-muted)",
            maxWidth: "62ch",
            margin: "20px auto 0",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

const codeComment: CSSProperties = { color: "var(--text-on-dark-faint)" }
const codeSignal: CSSProperties = { color: "var(--red-400)" }

function CodeScreen({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <Screen padding="12px 14px" style={{ overflowX: "auto", ...style }}>
      <div style={{ whiteSpace: "pre", fontSize: 12.5, lineHeight: 1.8 }}>
        {children}
      </div>
    </Screen>
  )
}

/* ── 1. Hero ──────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <div className="grid items-start gap-10 px-6 pt-10 pb-6 md:px-12 md:pt-14 xl:[grid-template-columns:1fr_1.15fr] xl:gap-14">
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            color: "var(--text-on-page-muted)",
          }}
        >
          <Led status="ok" size={7} />
          <span style={label}>The awareness layer for AI agents</span>
        </div>
        <h1
          style={{
            ...displayStyle,
            fontSize: "clamp(44px, 6.4vw, 72px)",
            lineHeight: 1.02,
            margin: "22px 0 24px",
          }}
        >
          Your agent already&nbsp;knows.
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            maxWidth: "46ch",
            color: "var(--text-on-page)",
            margin: "0 0 28px",
          }}
        >
          Agentenna gives agents a live, token-bounded view of what&apos;s
          happening — messages, logs, alerts, tickets — rendered straight into
          context, refreshed every turn. Inspect the details, rewind the
          history, wake up when it matters.
        </p>
        <PipBar style={{ maxWidth: 480 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
            marginTop: 24,
          }}
        >
          <Button size="lg" href={GITHUB}>
            <Star size={15} strokeWidth={1.5} />
            Star on GitHub
            <span aria-hidden>↗</span>
          </Button>
          <a
            href={MANIFESTO}
            style={{
              fontFamily: MONO,
              fontSize: 13,
              color: "var(--text-on-page)",
              marginLeft: 8,
            }}
          >
            Read the manifesto →
          </a>
        </div>
        <div
          style={{
            marginTop: 44,
            fontFamily: MONO,
            fontSize: 12,
            lineHeight: 1.9,
            color: "var(--text-on-page-muted)",
          }}
        >
          Apache 2.0 · self-hostable · MCP-native ·
          <br />
          pip install to rendered surface in under 60 seconds.
        </div>
      </div>
      <div className="min-w-0">
        <Demo />
      </div>
    </div>
  )
}

/* ── 2. The rack row: PLUG IN → ACT, with the power-cable brand moment ── */

const STEPS: {
  icon: typeof Plug
  label: string
  desc: string
  leds: LedStatus[]
}[] = [
  {
    icon: Plug,
    label: "Plug in",
    desc: "Bring your feeds.",
    leds: ["live", "ok", "off"],
  },
  {
    icon: Route,
    label: "Route",
    desc: "Channels and triggers.",
    leds: ["ok", "ok", "ok"],
  },
  {
    icon: Send,
    label: "Deliver",
    desc: "Per-reader delivery.",
    leds: ["ok", "ok", "off"],
  },
  {
    icon: ScanText,
    label: "Render",
    desc: "Bounded to fit context.",
    leds: ["ok", "off", "ok"],
  },
  {
    icon: Zap,
    label: "Act",
    desc: "Wake and respond.",
    leds: ["ok", "off", "off"],
  },
]

export function Rack() {
  return (
    <div className="grid grid-cols-2 items-stretch gap-2.5 px-6 pt-2 pb-6 md:grid-cols-3 md:px-12 xl:[grid-template-columns:repeat(5,minmax(0,1fr))_96px_190px]">
      {STEPS.map((s, i) => {
        const Icon = s.icon
        return (
          <div
            key={s.label}
            style={{
              position: "relative",
              background: "var(--surface-chassis)",
              border: "1px solid var(--border-on-dark)",
              borderRadius: "var(--radius-module)",
              boxShadow: "var(--shadow-card-dark)",
              padding: "16px 16px 14px",
              color: "var(--text-on-dark)",
            }}
          >
            {i === 0 && (
              <span
                aria-hidden
                className="hidden xl:block"
                style={{
                  position: "absolute",
                  left: -30,
                  top: "54%",
                  width: 44,
                  height: 9,
                  borderRadius: 5,
                  background:
                    "linear-gradient(180deg,var(--red-400),var(--red-600))",
                  boxShadow: "0 2px 3px rgba(0,0,0,0.5)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    right: -4,
                    top: -3,
                    width: 10,
                    height: 15,
                    borderRadius: 2,
                    background: "#0E0F0D",
                  }}
                />
              </span>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  border: "1px solid var(--border-on-dark)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--surface-chassis-raised)",
                }}
              >
                <Icon size={14} strokeWidth={1.5} />
              </span>
              <span
                style={{
                  ...label,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                {s.label}
              </span>
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "var(--text-on-dark-muted)",
                margin: "9px 0 14px",
              }}
            >
              {s.desc}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {s.leds.map((st, j) => (
                <Led key={j} status={st} size={5} />
              ))}
            </div>
          </div>
        )
      })}
      <Plate
        dark
        texture="vent"
        className="hidden xl:block"
        style={{ borderRadius: "var(--radius-module)" }}
      />
      <div
        className="col-span-2 md:col-span-3 xl:col-auto"
        style={{
          background: "var(--surface-chassis)",
          border: "1px solid var(--border-on-dark)",
          borderRadius: "var(--radius-module)",
          boxShadow: "var(--shadow-card-dark)",
          padding: 16,
          color: "var(--text-on-dark)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Led status="live" size={7} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 19,
            }}
          >
            agentenna
          </span>
        </span>
        <span style={{ ...labelSm, color: "var(--text-on-dark-muted)" }}>
          Station v2
        </span>
      </div>
    </div>
  )
}

/* ── 3. Problem strip — a recessed well in the rack ───────────────────── */

export function Problem() {
  return (
    <div
      className="mt-12"
      style={{
        background: "var(--page-well)",
        borderTop: "1px solid #0F100E",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow:
          "inset 0 2px 6px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <div className="mx-auto w-full max-w-[760px] px-6 py-20 md:py-24">
        <h2
          style={{
            ...displayStyle,
            fontSize: "clamp(28px, 3.8vw, 40px)",
            margin: 0,
          }}
        >
          Your agent works in the dark. Turn the lights on.
        </h2>
        <p
          style={{
            fontSize: "clamp(18px, 2.2vw, 22px)",
            lineHeight: 1.5,
            color: "var(--text-on-page)",
            margin: "32px 0 0",
          }}
        >
          The error spiked at{" "}
          <span style={{ fontFamily: MONO, color: "var(--red-400)" }}>
            2:03
          </span>
          . Your agent heard about it at{" "}
          <span style={{ fontFamily: MONO, color: "var(--red-400)" }}>
            2:47
          </span>
          , from a human.
        </p>
        <p
          style={{
            fontSize: "clamp(18px, 2.2vw, 22px)",
            lineHeight: 1.5,
            color: "var(--text-on-page)",
            margin: "16px 0 0",
          }}
        >
          Right now your agent only knows what someone typed into it.
        </p>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 13,
            lineHeight: 1.8,
            color: "var(--text-on-page-muted)",
            margin: "32px 0 0",
          }}
        >
          Every team rebuilds the same plumbing: poll, dedupe, summarize,
          trigger, repeat.
        </p>
      </div>
    </div>
  )
}

/* ── 4. The surface — a HUD for AI agents ─────────────────────────────── */

export function Surface() {
  return (
    <section
      id="surface"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeader
        eyebrow="The surface"
        title="A HUD for AI agents."
        sub={
          <>
            Glanceable, bounded by design, drill-down on demand. A live view of
            your agent&apos;s operational sphere, rendered straight into context
            and refreshed every turn — awareness at a fixed token cost, this
            turn and every turn after.
          </>
        }
      />
      <AwarenessSurface />
      <p
        style={{
          ...displayStyle,
          fontSize: "clamp(20px, 2.6vw, 28px)",
          textAlign: "center",
          maxWidth: 760,
          margin: "64px auto 0",
        }}
      >
        Webhooks deliver payloads to your server.
        <br />
        Agentenna delivers awareness to your agent.
      </p>
    </section>
  )
}

/* ── 5. How it works — three verbs ────────────────────────────────────── */

export function Verbs() {
  return (
    <section
      id="how"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeader
        eyebrow="How it works"
        title="Three verbs."
        sub="Emit from anywhere, listen anywhere else."
      />
      <div className="grid items-stretch gap-2.5 lg:grid-cols-3">
        <Module
          variant="chassis"
          led="live"
          label="01 · Emit"
          padding="var(--space-3)"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <CodeScreen>
            {`ch = ant.channel(`}
            <span style={codeSignal}>&quot;prod.errors&quot;</span>
            {`)\nch.emit(`}
            <span style={codeSignal}>
              &quot;Stripe webhook failed: KeyError customer_id&quot;
            </span>
            {`,\n        severity="high", kind="prod.error", source="stripe_webhook_handler")`}
          </CodeScreen>
          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.6,
              color: "var(--text-on-dark-muted)",
              margin: "12px 2px 0",
            }}
          >
            A webhook, a log line, a cron job, another agent — one line each.{" "}
            <code style={{ fontFamily: MONO }}>emit</code> takes an event, a
            State gauge, or a Task for the inbox.
          </p>
        </Module>
        <Module
          variant="chassis"
          led="ok"
          label="02 · Listen + inject"
          padding="var(--space-3)"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <CodeScreen>
            {`signals = ch.listen(new_only=True)\nmessages = inject_awareness(messages, signals)   `}
            <span
              style={codeComment}
            >{`# learnings · states · tasks · events — one bounded block`}</span>
            {`\nresponse = await agent.run(messages)\nsignals.ack()`}
          </CodeScreen>
          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.6,
              color: "var(--text-on-dark-muted)",
              margin: "12px 2px 0",
            }}
          >
            Only what&apos;s new to this reader; inspect and rewind for depth.
          </p>
        </Module>
        <Module
          variant="chassis"
          led="alert"
          label="03 · Wake"
          padding="var(--space-3)"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <CodeScreen>
            {`@ant.on(`}
            <span style={codeSignal}>&quot;service&quot;</span>
            {`)\nasync def service(event):\n    await service_agent(event)\n    await event.ack()\n\nant.run_receiver()`}
          </CodeScreen>
          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.6,
              color: "var(--text-on-dark-muted)",
              margin: "12px 2px 0",
            }}
          >
            Triggers are deliberate and rare — redelivered until acked.
          </p>
        </Module>
      </div>
      <div
        style={{ textAlign: "center", margin: "72px auto 0", maxWidth: 720 }}
      >
        <p
          style={{
            ...displayStyle,
            fontSize: "clamp(24px, 3vw, 34px)",
            margin: 0,
          }}
        >
          Emit once. Every agent knows.
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--text-on-page-muted)",
            margin: "16px 0 0",
          }}
        >
          A channel is a broadcast, not a point-to-point delivery. One emit, N
          listeners — each with its own place in the stream, each rendered
          within its own token budget.
        </p>
      </div>
    </section>
  )
}

/* ── 6. Quote band A — the memory contrast ────────────────────────────── */

export function QuoteA() {
  return (
    <QuoteBand
      line={
        <>
          <span style={{ color: "var(--text-on-page-muted)" }}>
            Memory is what mattered.
          </span>
          <br />
          Awareness is what&apos;s happening.
        </>
      }
      sub="Agentenna sits beside your memory layer, your framework, and your tools — it is the missing half, not a replacement."
    />
  )
}

/* ── 7. Seeing vs waking ──────────────────────────────────────────────── */

export function SeeWake() {
  return (
    <section
      id="see-wake"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeader
        eyebrow="Seeing vs waking"
        title="Some things your agent should just see. Some things should wake it up."
      />
      <div className="grid items-stretch gap-2.5 md:grid-cols-2">
        <Module
          label="See · passive"
          led="ok"
          padding="var(--space-3)"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Screen padding="12px 14px" style={{ overflowX: "auto", flex: 1 }}>
            <div style={{ whiteSpace: "pre", fontSize: 12, lineHeight: 1.9 }}>
              <span style={dimOnDark}>19:04:33 home.fridge </span>low Milk
              expired yesterday
              {"\n\n"}
              <span style={dimOnDark}>&gt;</span> plan dinner for tonight
              {"\n"}
              <span style={dimOnDark}>●</span> One thing first — the milk
              expired
              {"\n"}
              {"  "}yesterday, so skip anything that needs it.
            </div>
          </Screen>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--text-muted)",
              margin: "12px 2px 2px",
            }}
          >
            A low-severity event sits quietly on the surface; the agent mentions
            it next time you talk. Most signals should only be seen.
          </p>
        </Module>
        <Module
          variant="chassis"
          label="Wake · active"
          led="alert"
          ledBlink
          padding="var(--space-3)"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Screen padding="12px 14px" style={{ overflowX: "auto", flex: 1 }}>
            <div style={{ whiteSpace: "pre", fontSize: 12, lineHeight: 1.9 }}>
              {`ch.emit(`}
              <span style={codeSignal}>
                &quot;Checkout error rate 12% and climbing&quot;
              </span>
              {`,\n        severity="crit",\n        trigger=Trigger(key="service"))`}
              {"\n\n"}
              <span style={{ color: "var(--red-400)" }}>▸</span> service
              receiver fired · 14:32:01
              {"\n"}
              <span style={dimOnDark}>{`  redelivered until acked`}</span>
            </div>
          </Screen>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--text-on-dark-muted)",
              margin: "12px 2px 2px",
            }}
          >
            Waking is the exception — deliberate, rare, and earned. A surface
            that cries wolf teaches its agent to stop looking.
          </p>
        </Module>
      </div>
    </section>
  )
}

/* ── 8. Beside your stack ─────────────────────────────────────────────── */

function Jack({ live = false }: { live?: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 16,
        height: 16,
        borderRadius: "var(--radius-sm)",
        background: "var(--port-well)",
        border: "1px solid var(--border-on-dark-strong)",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
        flex: "none",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: live ? "var(--port-live)" : "var(--port-quiet)",
        }}
      />
    </span>
  )
}

const TILES = [
  "Cursor",
  "Codex",
  "Gemini CLI",
  "VS Code",
  "Pydantic AI",
  "LangGraph",
  "MCP",
  "raw messages",
]

export function Stack() {
  return (
    <section
      id="stack"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 py-16 md:py-24"
    >
      <SectionHeader
        eyebrow="Beside your stack"
        title="Beside every runtime, inside none."
        sub="Works with Claude Code, Cursor, Codex, Gemini CLI, VS Code, and any Python agent framework."
      />
      <Module
        variant="chassis"
        led="live"
        label="Flagship · Claude Code plugin"
        padding="var(--space-4)"
      >
        <div className="grid items-center gap-4 md:[grid-template-columns:1.2fr_1fr]">
          <p
            style={{
              fontSize: 14.5,
              lineHeight: 1.65,
              color: "var(--text-on-dark)",
              margin: 0,
            }}
          >
            One command —{" "}
            <code style={{ fontFamily: MONO, fontSize: 13 }}>
              agentenna install claude-code
            </code>{" "}
            — and every session starts aware: a snapshot on start, the delta
            every turn, fail-open if the Station is down.
          </p>
          <Screen padding="10px 14px" style={{ overflowX: "auto" }}>
            <div style={{ whiteSpace: "pre", fontSize: 12.5, lineHeight: 1.8 }}>
              <span style={dimOnDark}>$</span>
              {` agentenna install claude-code\n`}
              <span style={{ color: "var(--status-ok-text-on-dark)" }}>✓</span>
              {` every session starts aware`}
            </div>
          </Screen>
        </div>
      </Module>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {TILES.map((t) => (
          <Plate
            key={t}
            dark
            padding="12px 14px"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Jack />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 13,
                color: "var(--text-on-dark)",
              }}
            >
              {t}
            </span>
          </Plate>
        ))}
      </div>
      <div style={{ marginTop: 32, display: "grid", gap: 14, maxWidth: 820 }}>
        {[
          "MCP-native from day one — Claude and Cursor pick it up with zero code.",
          "Not a framework. Two functions and a URL away from whatever you already run.",
          "Your terminal, your logs, your CI, any webhook — on your agent's surface in 15 minutes, self-hosted.",
          "Running an always-on assistant? Point its world — calendar, inbox, home, chat — at a channel and it's on the surface.",
        ].map((line) => (
          <div
            key={line}
            style={{ display: "flex", alignItems: "baseline", gap: 12 }}
          >
            <Led
              status="ok"
              size={6}
              style={{ transform: "translateY(-1px)" }}
            />
            <span
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--text-on-page)",
              }}
            >
              {line}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── 9. Quote band B + quickstart / self-host ─────────────────────────── */

export function Quickstart() {
  return (
    <section id="self-host" className="scroll-mt-24">
      <QuoteBand line="One container, one key." />
      <div className="mx-auto w-full max-w-[1000px] px-6 pb-16 md:pb-24">
        <div className="grid items-stretch gap-2.5 md:grid-cols-2">
          <Module
            variant="chassis"
            led="ok"
            label="Install"
            padding="var(--space-3)"
          >
            <CodeScreen>
              <span style={dimOnDark}>$</span>
              {` pip install agentenna\n`}
              <span style={dimOnDark}>$</span>
              {` agentenna hello   `}
              <span style={codeComment}>
                # ready in 47s — your agent can hear now.
              </span>
            </CodeScreen>
          </Module>
          <Module
            variant="chassis"
            led="ok"
            label="Self-host · Station"
            padding="var(--space-3)"
          >
            <CodeScreen>
              <span style={dimOnDark}>$</span>
              {` docker run -p 1234:1234 -v agentenna:/data \\\n    ghcr.io/agentenna/station`}
            </CodeScreen>
          </Module>
        </div>
        <p
          style={{
            borderLeft: "2px solid var(--red-500)",
            paddingLeft: 18,
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--text-on-page)",
            maxWidth: 640,
            margin: "40px auto 0",
          }}
        >
          Apache 2.0. Everything in the repo is the whole product — no account,
          no telemetry, and your feeds never leave your box.
        </p>
      </div>
    </section>
  )
}

/* ── 10. Comparison + final CTA ───────────────────────────────────────── */

export function Closing() {
  return (
    <section className="mx-auto w-full max-w-[860px] px-6 py-16 text-center md:py-24">
      <SectionHeader
        center
        eyebrow="The category"
        title="Awareness is a separate primitive from memory. No one owns it yet."
        sub="mem0 remembers your conversations. Agentenna notices your systems."
      />
      <PipBar style={{ maxWidth: 480, margin: "0 auto" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
          marginTop: 24,
        }}
      >
        <Button size="lg" href={GITHUB}>
          <Star size={15} strokeWidth={1.5} />
          Star on GitHub
          <span aria-hidden>↗</span>
        </Button>
        <a
          href={MANIFESTO}
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: "var(--text-on-page)",
          }}
        >
          Read the manifesto →
        </a>
      </div>
      <p
        style={{
          fontSize: 14,
          fontStyle: "italic",
          color: "var(--text-on-page-muted)",
          marginTop: 56,
        }}
      >
        When you turn to your agent — it already knows.
      </p>
    </section>
  )
}

/* ── Footer — faceplate strip ─────────────────────────────────────────── */

export function Footer() {
  const it: CSSProperties = { ...labelSm, color: "var(--text-muted)" }
  const inkLink: CSSProperties = {
    ...labelSm,
    color: "var(--link)",
    textDecorationColor: "rgba(192,46,33,0.4)",
  }
  return (
    <footer
      style={{
        background: "var(--surface-plate)",
        borderTop: "1px solid var(--border-strong)",
        color: "var(--text-body)",
      }}
    >
      <div
        className="flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4"
        style={{ borderBottom: "1px solid var(--border-default)" }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <AntennaMark size={16} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 15,
              color: "var(--text-strong)",
            }}
          >
            agentenna
          </span>
        </span>
        <a href={GITHUB} style={inkLink}>
          GitHub
        </a>
        <a href={DOCS} style={inkLink}>
          Docs
        </a>
        <a href={MANIFESTO} style={inkLink}>
          Manifesto
        </a>
        <span
          className="ml-auto"
          style={{ fontFamily: MONO, fontSize: 11, color: "var(--text-muted)" }}
        >
          Pronounced a-gen-TEN-uh.
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-9 gap-y-3 px-6 py-3.5">
        {["Apache 2.0", "Self-hostable", "MCP-native", "Open source"].map(
          (l) => (
            <span key={l} style={it}>
              {l}
            </span>
          )
        )}
        <span className="ml-auto" style={{ ...it, color: "var(--text-body)" }}>
          Built for agents
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            color: "var(--text-body)",
          }}
        >
          <Led status="ok" size={6} />
          <span style={labelSm}>Link up</span>
        </span>
      </div>
    </footer>
  )
}
