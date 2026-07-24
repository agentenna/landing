import { AntennaMark } from "./mark"
import { CHEATSHEET, GITHUB, MANIFESTO, PYPI } from "./links"

const LINKS: [string, string][] = [
  ["GitHub", GITHUB],
  ["PyPI", PYPI],
  ["Manifesto", MANIFESTO],
  ["API cheatsheet", CHEATSHEET],
]

export function Footer() {
  return (
    <footer className="px-4 pb-6 sm:px-6">
      <p className="text-dim mx-auto max-w-6xl px-2 py-14 text-center text-base">
        Memory gave agents a past. Tools gave them hands.{" "}
        <span className="text-foreground font-medium">
          Agentenna gives them the present.
        </span>
      </p>

      <div className="chassis mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 rounded-md px-5 py-4">
        <span className="text-dim flex items-center gap-2.5">
          <AntennaMark size={20} />
          <span className="ag-label-sm">
            agentenna · the awareness layer for AI agents
          </span>
        </span>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:ml-auto">
          {LINKS.map(([name, href]) => (
            <a
              key={name}
              href={href}
              className="text-dim hover:text-foreground font-mono text-xs no-underline transition-colors duration-100"
            >
              {name}
            </a>
          ))}
        </nav>

        <span className="ag-label-sm text-muted flex items-center gap-4 sm:border-l sm:border-(--color-line) sm:pl-6">
          <span className="flex items-center gap-1.5">
            <span className="bg-lime size-1.5 rounded-full" />
            v0.1
          </span>
          Apache-2.0
        </span>
      </div>
    </footer>
  )
}
