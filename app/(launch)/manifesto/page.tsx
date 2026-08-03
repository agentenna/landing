import type { Metadata } from "next"
import Link from "next/link"

import { Footer } from "@/components/launch/footer"
import { MANIFESTO_SOURCE } from "@/components/launch/links"
import { Nav } from "@/components/launch/nav"

/* Upstream source of truth: agentenna/docs/manifesto.md (separate repo, so it
   cannot be imported at build time — hand-mirrored here). Keep in sync. */

const TITLE = "The Agentenna Manifesto"
const DESCRIPTION =
  "Intelligence was never the bottleneck — perception is. Why agents need an awareness surface: a live, token-bounded view of their world, refreshed every turn."

const PRINCIPLES: { n: number; title: string; body: string }[] = [
  {
    n: 1,
    title: "The surface is the product.",
    body: "Transport, storage, and connectors exist in service of what the agent perceives. When in doubt, improve the render, not the pipe.",
  },
  {
    n: 2,
    title: "Awareness has a budget.",
    body: "Perception costs a fixed, small number of tokens per turn — this turn, and every turn after. A firehose is not awareness. Compression is.",
  },
  {
    n: 3,
    title: "Compact in front, complete behind.",
    body: "Every fact on the surface is a summary that can be expanded and a history that can be searched. The agent is never forced to choose between cheap and true.",
  },
  {
    n: 4,
    title: "Seeing is not waking.",
    body: "Most signals should only be seen. Waking is the exception — deliberate, rare, and earned. A surface that cries wolf teaches its agent to stop looking.",
  },
  {
    n: 5,
    title: "Awareness compounds.",
    body: "Instructions carry the operator's intent forward; learnings carry the agent's experience forward. The surface becomes easier to read the longer it is read.",
  },
  {
    n: 6,
    title: "One shape, any world.",
    body: "Anything that can be shaped into a signal belongs: a stack trace, a customer message, a camera frame, another agent's outcome. New senses are new transmitters, never new systems.",
  },
  {
    n: 7,
    title: "Beside every runtime, inside none.",
    body: "Awareness belongs to no framework and no vendor. It sits next to whatever runs the agent and speaks a protocol small enough to outlive all of them.",
  },
  {
    n: 8,
    title: "Ownable by anyone.",
    body: "One container, one key, your infrastructure. The perception of your world is too sensitive to exist only as a rental.",
  },
  {
    n: 9,
    title: "Measured, not vibed.",
    body: "Tokens per turn, false wakes, missed criticals, time from change to perception. Awareness is an engineering discipline, and disciplines have numbers.",
  },
]

export const metadata: Metadata = {
  title: `${TITLE} — Agentenna`,
  description: DESCRIPTION,
  alternates: { canonical: "/manifesto" },
  openGraph: {
    title: `${TITLE} — Agentenna`,
    description: DESCRIPTION,
    url: "/manifesto",
    type: "article",
  },
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 font-brand text-2xl font-normal tracking-tight sm:text-3xl">
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 leading-relaxed text-dim">{children}</p>
}

function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-medium text-foreground">{children}</strong>
}

export default function ManifestoPage() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <Nav />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 pt-16 pb-20 sm:pt-24">
          <p className="ag-label text-signal">— Manifesto</p>
          <h1 className="mt-5 font-brand text-[38px] leading-[1.04] font-normal tracking-tight text-balance sm:text-5xl">
            The Agentenna Manifesto
          </h1>

          <H2>What we believe</H2>
          <P>Intelligence was never the bottleneck.</P>
          <P>
            Today&apos;s agents can reason, plan, write, and act. They remember
            what mattered before. They hold tools for almost anything. And
            still, left alone, they know nothing. An agent is a mind in a dark
            room — brilliant, equipped, and blind — aware only of what someone
            carries in through the door.
          </P>
          <P>
            Humans are not effective because we remember everything. We are
            effective because we notice. We live inside a constant, quiet stream
            of perception: something changed, so we glance, judge, ignore,
            investigate, or act. Nearly every useful thing a person does begins
            not with a question asked of them, but with something they noticed.
          </P>
          <P>
            The next generation of agents will not be invoked. They will
            participate — in codebases, incidents, inboxes, workflows, homes.
            Participation requires perception. That is the layer the agent stack
            is missing, and it is the layer we are building.
          </P>

          <H2>The outcome</H2>
          <P>Everything Agentenna does serves a single outcome:</P>
          <p className="mt-5 border-l-2 border-(--color-signal) pl-5 font-brand text-xl leading-snug text-foreground">
            An agent that carries a live view of its world inside its own
            context.
          </p>
          <P>
            We call it the awareness surface. It is small by design and
            refreshed every turn — perceiving the world costs the same today as
            it will after a year of running. Each fact on it is compact, and
            each compact fact stands in front of its full detail: the surface
            can be glanced at, any item on it inspected, any history behind it
            rewound. Most of the time it simply sits in context, being seen. And
            when something truly matters, it does not wait to be seen — it wakes
            the agent.
          </P>
          <P>
            The test of the entire system is one sentence: when you turn to your
            agent, it already knows.
          </P>

          <H2>What appears on the surface</H2>
          <P>
            Awareness is not one kind of thing. A person glancing at their world
            perceives things that happened, things that are true, and things
            awaiting their judgment — and reads all of them through instruction
            and experience. The surface holds the same five:
          </P>
          <P>
            <Term>Events</Term> are what happened — the ticker. Append-only
            facts about change, newest first, fading with time.
          </P>
          <P>
            <Term>States</Term> are what is true right now — the gauges. A state
            has no timeline and no noise; it is overwritten, not accumulated.
            You do not ask a gauge what it used to say.
          </P>
          <P>
            <Term>Tasks</Term> are what awaits judgment — the inbox. Durable
            work that outlives the moment it arrived.
          </P>
          <P>
            <Term>Instructions</Term> are how the operator wants a kind of
            signal read. They ride alongside the signals they govern, so intent
            arrives with the information.
          </P>
          <P>
            <Term>Learnings</Term> are how the agent itself learned to read a
            kind of signal. Notes it left for its future self, returned the next
            time that kind appears. The surface teaches its own reader.
          </P>
          <P>
            Underneath, all of these are one shape — the signal: a compact
            message in front, full detail behind, an identity, a kind, a
            lifecycle. One parent type is the whole contract between the world
            and the surface.
          </P>

          <H2>How the world reaches it</H2>
          <P>
            A developer&apos;s entire obligation should be one act: shape
            something into a signal. Everything after that — routing, storing,
            deduplicating, budgeting, rendering, waking — is the system&apos;s
            responsibility, never theirs.
          </P>
          <P>
            The <Term>Antenna</Term> is how any process transmits or tunes in: a
            small client that makes emitting a signal as ordinary as logging a
            line. The <Term>Station</Term> is the contained place signals live —
            one deployable unit, one key, running wherever its operator chooses,
            coordinating every channel so that many can broadcast and many can
            listen. The <Term>Decoder</Term> stands in front of it all, turning
            raw reality — sound, sight, screens, noise — into signals before
            they become tokens, so that senses are simply more transmitters.
            Connectors exist to make popular worlds one step away, but they are
            conveniences at the edge: the protocol underneath stays small enough
            that anything — a webhook, a log line, a cron job, another agent —
            can transmit.
          </P>
          <P>
            The name is a promise. An antenna does not store the broadcast; it
            receives what is in the air right now. Radio was the first medium
            through which knowledge could arrive at the moment it existed. That
            is the medium agents are missing, and the one we are building.
          </P>

          <H2>Principles</H2>
          <ol className="mt-5 space-y-5">
            {PRINCIPLES.map(({ n, title, body }) => (
              <li key={n} className="flex gap-4">
                <span className="mt-1.5 w-4 shrink-0 ag-label-sm text-muted tabular-nums">
                  {n}
                </span>
                <p className="leading-relaxed text-dim">
                  <Term>{title}</Term> {body}
                </p>
              </li>
            ))}
          </ol>

          <H2>The north star</H2>
          <P>
            Memory gave agents a past. Tools gave them hands. Agentenna gives
            them the present.
          </P>
          <P>
            We will know we are on course by one measure, forever: the room has
            lights on, the surface is small and honest, and when you turn to
            your agent —
          </P>
          <p className="mt-5 font-brand text-xl text-foreground">
            it already knows.
          </p>

          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-(--color-line) pt-6">
            <Link
              href="/"
              className="font-mono text-sm text-dim no-underline transition-colors duration-100 hover:text-foreground"
            >
              ← Back to agentenna.com
            </Link>
            <a
              href={MANIFESTO_SOURCE}
              className="font-mono text-sm text-muted no-underline transition-colors duration-100 hover:text-foreground"
            >
              Source in the repo
            </a>
          </div>
        </article>
      </main>
      <Footer closing={false} />
    </div>
  )
}
