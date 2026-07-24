"use client"

/* §3.3 centerpiece: the composed awareness block, annotated, with a
   two-frame turn n / n+1 toggle — same size, new content; the block never
   grows. */

import * as React from "react"

import { Module, Plate, Screen } from "./primitives"
import { dimOnDark, label, labelSm, MONO } from "./styles"

type Marker = "A" | "B" | "C" | "D"

function Dim({ children }: { children: React.ReactNode }) {
  return <span style={dimOnDark}>{children}</span>
}

function MarkerChip({ m }: { m: Marker }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 14,
        height: 14,
        borderRadius: "var(--radius-sm)",
        border: "1px solid rgba(223,58,44,0.55)",
        color: "var(--red-400)",
        fontFamily: MONO,
        fontSize: 9,
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      {m}
    </span>
  )
}

function Line({
  children,
  marker,
  highlight = false,
}: {
  children: React.ReactNode
  marker?: Marker
  highlight?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        whiteSpace: "pre",
        padding: "0 10px 0 6px",
        ...(highlight
          ? {
              borderLeft: "2px solid var(--red-500)",
              background: "rgba(223,58,44,0.07)",
              paddingLeft: 4,
            }
          : {}),
      }}
    >
      <span style={{ width: 14, flex: "none", display: "inline-flex" }}>
        {marker ? <MarkerChip m={marker} /> : null}
      </span>
      <span style={{ minWidth: 0 }}>{children}</span>
    </div>
  )
}

function Frame({ turn }: { turn: 47 | 48 }) {
  const n = turn === 48
  return (
    <div style={{ fontSize: 12, lineHeight: 1.85 }}>
      <Line marker="C">
        <Dim>&lt;</Dim>agentenna-awareness{" "}
        <Dim>slot=&quot;agentenna:main&quot; turn=&quot;</Dim>
        {turn}
        <Dim>&quot;&gt;</Dim>
      </Line>
      <Line marker="D">
        {"  "}
        <Dim>&lt;</Dim>learnings <Dim>channel=&quot;prod.errors&quot;&gt;</Dim>
      </Line>
      <Line>
        {
          "    checkout 5xx usually follows deploy.rollout — check the last deploy first"
        }
      </Line>
      <Line>{"    payment timeouts correlate with db.slow_queries"}</Line>
      <Line>
        {"  "}
        <Dim>&lt;/</Dim>learnings<Dim>&gt;</Dim>
      </Line>
      <Line>
        {"  "}
        <Dim>&lt;</Dim>states<Dim>&gt;</Dim>
      </Line>
      <Line>
        {"    checkout.incident   "}
        {n ? "monitoring" : "active    "}
        {"  "}
        <Dim>{n ? "14:33:20" : "14:30:02"}</Dim>
      </Line>
      <Line>
        {"    deploy.rollout      ok        "}
        {"  "}
        <Dim>14:28:44</Dim>
      </Line>
      <Line>
        {"  "}
        <Dim>&lt;</Dim>tasks <Dim>new=&quot;{n ? 0 : 1}&quot;&gt;</Dim>
      </Line>
      <Line>{"    t-118  triage checkout 5xx spike      open"}</Line>
      <Line>{"    t-117  summarize on-call handoff      open"}</Line>
      <Line>
        {"  "}
        <Dim>&lt;</Dim>events{" "}
        <Dim>channel=&quot;prod.errors&quot; new=&quot;1&quot;&gt;</Dim>
      </Line>
      {n ? (
        <>
          <Line marker="A" highlight>
            {"    e-2042  "}
            <Dim>14:33:12</Dim>
            {"  med   Error rate falling — 3.4% and dropping  "}
            <Dim>has_payload=&quot;true&quot;</Dim>
          </Line>
          <Line>
            {"    e-2041  "}
            <Dim>14:31:58</Dim>
            {"  "}
            <span style={{ color: "var(--red-400)" }}>high</span>
            {"  Checkout 5xx rate jumped to 12%"}
          </Line>
          <Line>
            {"    e-2040  "}
            <Dim>14:25:11</Dim>
            {"  med   Payment timeouts elevated"}
          </Line>
        </>
      ) : (
        <>
          <Line marker="A" highlight>
            {"    e-2041  "}
            <Dim>14:31:58</Dim>
            {"  "}
            <span style={{ color: "var(--red-400)" }}>high</span>
            {"  Checkout 5xx rate jumped to 12%  "}
            <Dim>has_payload=&quot;true&quot;</Dim>
          </Line>
          <Line>
            {"    e-2040  "}
            <Dim>14:25:11</Dim>
            {"  med   Payment timeouts elevated"}
          </Line>
          <Line>
            {"    e-2039  "}
            <Dim>14:12:07</Dim>
            {"  med   DB slow query rate high"}
          </Line>
        </>
      )}
      <Line marker="B">
        {"  "}
        <Dim>&lt;</Dim>actions<Dim>&gt;</Dim>inspect(id) · rewind(channel) ·
        ack(id)<Dim>&lt;/</Dim>actions
        <Dim>&gt;</Dim>
      </Line>
      <Line>
        <Dim>&lt;/</Dim>agentenna-awareness<Dim>&gt;</Dim>
      </Line>
    </div>
  )
}

const CALLOUTS: { m: Marker; title: string; body: string }[] = [
  {
    m: "A",
    title: "Compact in front",
    body: "One line per signal — id, time, severity, headline. Glanceable, at a fixed token cost.",
  },
  {
    m: "B",
    title: "Complete behind",
    body: "The full payload sits one inspect(id) away; rewind for history. Depth on demand, never in the way.",
  },
  {
    m: "C",
    title: "Bounded",
    body: "Replaces itself every turn — the block never grows. Same size, new content.",
  },
  {
    m: "D",
    title: "It learns the channel",
    body: "Agentenna doesn't just show your agent what changed — it remembers how to read it.",
  },
]

function TurnButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        appearance: "none",
        cursor: "pointer",
        padding: "5px 10px",
        background: active ? "var(--surface-chassis-raised)" : "transparent",
        border: `1px solid ${active ? "var(--red-500)" : "var(--border-on-dark)"}`,
        borderRadius: "var(--radius-sm)",
        color: active ? "var(--red-400)" : "var(--text-on-dark-muted)",
        transition:
          "border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out)",
        ...labelSm,
      }}
    >
      {children}
    </button>
  )
}

export function AwarenessSurface() {
  const [turn, setTurn] = React.useState<47 | 48>(47)
  const [manual, setManual] = React.useState(false)

  React.useEffect(() => {
    if (manual) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(
      () => setTurn((v) => (v === 47 ? 48 : 47)),
      3200
    )
    return () => window.clearInterval(id)
  }, [manual])

  const pick = (v: 47 | 48) => {
    setManual(true)
    setTurn(v)
  }

  return (
    <div className="grid items-start gap-2.5 xl:[grid-template-columns:minmax(0,1fr)_280px]">
      <Module
        variant="chassis"
        led="live"
        label="Rendered surface · XML skin"
        meta={
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <TurnButton active={turn === 47} onClick={() => pick(47)}>
              Turn 47
            </TurnButton>
            <TurnButton active={turn === 48} onClick={() => pick(48)}>
              Turn 48
            </TurnButton>
          </span>
        }
        padding="var(--space-3)"
      >
        <Screen padding="10px 4px" style={{ overflowX: "auto" }}>
          <Frame turn={turn} />
        </Screen>
        <div
          style={{
            marginTop: 10,
            fontFamily: MONO,
            fontSize: 12,
            color: "var(--text-on-dark-muted)",
          }}
        >
          One block, refreshed every turn — awareness at a fixed token cost,
          this turn and every turn after.
        </div>
      </Module>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-1">
        {CALLOUTS.map((c) => (
          <Plate key={c.m} dark padding="12px 14px">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <MarkerChip m={c.m} />
              <span style={{ ...label, color: "var(--text-on-dark)" }}>
                {c.title}
              </span>
            </div>
            <div
              style={{
                marginTop: 7,
                fontSize: 13,
                lineHeight: 1.55,
                color: "var(--text-on-dark-muted)",
              }}
            >
              {c.body}
            </div>
          </Plate>
        ))}
      </div>
    </div>
  )
}
