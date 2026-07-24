export function Channels() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <p className="ag-label text-signal">Channels</p>
        <h2 className="font-brand mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
          Emit once. Every agent knows.
        </h2>
        <p className="text-dim mt-4 max-w-xl text-base leading-relaxed">
          A channel is a named shared bus, not point-to-point delivery. Many
          producers emit to it, many readers tune in — and each reader keeps
          its own position. One reader moving forward never hides the signal
          from another.
        </p>

        <div className="display-panel mt-8 rounded-md p-4 sm:p-5">
          <svg
            viewBox="0 0 760 248"
            role="img"
            aria-label="Diagram: producers such as tickets, webhooks, loggers, health checks, and terminals emit onto named channels — support.urgent, prod.errors, terminal.logs — while a support agent, an AI assistant, and a coding agent each listen to the channels they care about"
            className="hidden h-auto w-full sm:block"
          >
            <defs>
              <marker
                id="channel-arrow"
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0 0L8 4L0 8Z" className="fill-foreground/55" />
              </marker>
            </defs>

            <g
              className="fill-muted font-mono text-[11px]"
              textAnchor="middle"
            >
              <text x="190" y="18">
                ticket
              </text>
              <text x="282" y="18">
                webhook
              </text>
              <text x="370" y="18">
                logger
              </text>
              <text x="452" y="18">
                health
              </text>
              <text x="542" y="18">
                terminal
              </text>
            </g>

            <g className="stroke-foreground/55" strokeWidth="1.25">
              <path d="M190 27V61M282 27V61M370 27V105M452 27V105M542 27V149" />
              <path d="M136 62H724M136 106H724M136 150H724" />
            </g>
            <g className="fill-foreground/80 font-mono text-[12px]">
              <text x="0" y="66">
                support.urgent
              </text>
              <text x="0" y="110">
                prod.errors
              </text>
              <text x="0" y="154">
                terminal.logs
              </text>
            </g>
            <g className="fill-lime">
              <circle cx="190" cy="62" r="4" />
              <circle cx="282" cy="62" r="4" />
              <circle cx="370" cy="106" r="4" />
              <circle cx="452" cy="106" r="4" />
              <circle cx="542" cy="150" r="4" />
              <circle cx="606" cy="62" r="4" />
              <circle cx="662" cy="106" r="4" />
              <circle cx="702" cy="62" r="4" />
            </g>

            <g className="stroke-foreground/55" strokeWidth="1.25">
              <path d="M606 62V184M662 106V184M702 62V184" />
              <path
                d="M724 62H748M724 106H748M724 150H748"
                markerEnd="url(#channel-arrow)"
              />
            </g>
            <g
              className="fill-muted font-mono text-[11px]"
              textAnchor="middle"
            >
              <text x="606" y="202">
                support
              </text>
              <text x="606" y="217">
                agent
              </text>
              <text x="662" y="202">
                AI
              </text>
              <text x="662" y="217">
                assistant
              </text>
              <text x="716" y="202">
                coding
              </text>
              <text x="716" y="217">
                agent
              </text>
            </g>
            <g className="font-mono text-[10px]">
              <circle cx="8" cy="238" r="3.5" className="fill-lime" />
              <text x="19" y="241" className="fill-muted">
                tap: emit above · listen below
              </text>
              <text x="314" y="241" className="fill-foreground/55">
                ┼
              </text>
              <text x="329" y="241" className="fill-muted">
                crossing, no connection
              </text>
              <text x="567" y="241" className="fill-foreground/55">
                ▶
              </text>
              <text x="582" y="241" className="fill-muted">
                time
              </text>
            </g>
          </svg>

          <div
            className="space-y-5 sm:hidden"
            role="img"
            aria-label="Three shared channels connect producers to independent agent readers"
          >
            {[
              ["support.urgent", "ticket · webhook", "support · coding"],
              ["prod.errors", "logger · health", "AI · coding"],
              ["terminal.logs", "terminal", "support · AI"],
            ].map(([channel, producers, readers]) => (
              <div key={channel}>
                <div className="flex items-center justify-between gap-3 font-mono text-[11px]">
                  <span className="text-foreground/85">{channel}</span>
                  <span className="text-muted">shared bus</span>
                </div>
                <div className="my-2 flex items-center">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-lime" />
                  <span className="bg-foreground/45 h-px flex-1" />
                  <span className="h-2 w-2 shrink-0 rounded-full bg-lime" />
                  <span className="bg-foreground/45 h-px flex-1" />
                  <span className="text-foreground/55 font-mono text-[10px]">
                    ▶
                  </span>
                </div>
                <div className="flex justify-between gap-4 font-mono text-[10px] leading-relaxed">
                  <span className="text-muted">emit: {producers}</span>
                  <span className="text-muted text-right">
                    listen: {readers}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-dim mt-5 text-sm">
          One emit can update all your running agents — without N copies of
          the same webhook glue.
        </p>
      </div>
    </section>
  )
}
