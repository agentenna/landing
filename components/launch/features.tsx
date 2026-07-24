import { Activity, Radio, Zap } from "lucide-react"

const FEATURES = [
  {
    icon: Activity,
    title: "One bounded surface",
    copy: "Events, states, and tasks render into a single named slot, replaced every turn. Your agent sees what changed — never an unbounded feed.",
  },
  {
    icon: Radio,
    title: "Emit once, every agent knows",
    copy: "A channel is a shared bus. Terminals, services, and webhooks emit; every reader tunes in and keeps its own position.",
  },
  {
    icon: Zap,
    title: "Seeing is not waking",
    copy: "Most signals simply appear on the next turn. Attach a trigger to the few that can't wait, and a receiver wakes up.",
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="chassis grid overflow-hidden rounded-lg p-1.5 sm:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, copy }) => (
          <div
            key={title}
            className="surface m-1 rounded-md px-6 py-7 sm:m-0.5"
          >
            <Icon size={18} strokeWidth={1.5} className="text-dim" aria-hidden />
            <h2 className="font-brand mt-4 text-lg font-medium">{title}</h2>
            <p className="text-dim mt-2 text-sm leading-relaxed">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
