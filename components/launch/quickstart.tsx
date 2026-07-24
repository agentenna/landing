import { CopyButton } from "./copy-button"
import { CHEATSHEET, EXAMPLES, HOST_GUIDES } from "./links"

type Line =
  | { kind: "comment"; text: string }
  | { kind: "command"; text: string }
  | { kind: "continuation"; text: string }
  | { kind: "blank" }

const LINES: Line[] = [
  { kind: "command", text: 'pip install "agentenna[station]"' },
  { kind: "blank" },
  { kind: "comment", text: "# start a Station — stores signals, serves the API" },
  { kind: "command", text: "agentenna serve --db .agentenna/agentenna.db --port 1234" },
  { kind: "blank" },
  { kind: "comment", text: "# emit a fact from anywhere" },
  {
    kind: "command",
    text: 'agentenna emit prod.errors "Checkout 5xx rate jumped to 12%" \\',
  },
  {
    kind: "continuation",
    text: "  --kind fault --severity crit --db .agentenna/agentenna.db",
  },
  { kind: "blank" },
  { kind: "comment", text: "# connect a reader" },
  { kind: "command", text: "agentenna install claude-code" },
]

const COPY_TEXT = LINES.map((l) => (l.kind === "blank" ? "" : l.text)).join(
  "\n",
)

const DOC_LINKS: [string, string][] = [
  ["API cheatsheet", CHEATSHEET],
  ["Host guides", HOST_GUIDES],
  ["Examples", EXAMPLES],
]

export function Quickstart() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="ag-label text-signal">Quickstart</p>
        <h2 className="font-brand mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
          Emit → Station → Reader.
        </h2>
        <p className="text-dim mt-4 max-w-xl text-base leading-relaxed">
          Python 3.12+, one process, one SQLite file. Everything in the repo is
          the whole product — no account, no telemetry, and your feeds never
          leave your box.
        </p>

        <div className="display-panel mt-8 rounded-md">
          <div className="flex items-center justify-between border-b border-(--color-line-subtle) py-1.5 pr-1.5 pl-4">
            <span className="ag-label-sm text-muted">Terminal</span>
            <CopyButton text={COPY_TEXT} label="Copy quickstart commands" />
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.7] sm:p-5">
            <code>
              {LINES.map((line, i) => {
                if (line.kind === "blank") return "\n"
                if (line.kind === "comment")
                  return (
                    <span key={i} className="text-muted">
                      {line.text}
                      {"\n"}
                    </span>
                  )
                if (line.kind === "continuation")
                  return (
                    <span key={i} className="text-foreground/90">
                      {"    "}
                      {line.text.trim()}
                      {"\n"}
                    </span>
                  )
                return (
                  <span key={i} className="text-foreground/90">
                    <span aria-hidden className="text-lime-soft select-none">
                      ${" "}
                    </span>
                    {line.text}
                    {"\n"}
                  </span>
                )
              })}
            </code>
          </pre>
        </div>

        <p className="text-dim mt-5 text-sm">
          Works with Claude Code hooks, any MCP host, or your own agent loop.
          {"  "}
          {DOC_LINKS.map(([name, href], i) => (
            <span key={name}>
              {i > 0 && <span className="text-muted"> · </span>}
              <a
                href={href}
                className="text-foreground underline decoration-(--color-line) underline-offset-4 transition-colors duration-100 hover:decoration-(--color-signal)"
              >
                {name}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
