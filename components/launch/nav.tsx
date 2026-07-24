import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { CHEATSHEET, GITHUB, MANIFESTO, QUICKSTART } from "./links"

const LINKS: [string, string][] = [
  ["Docs", CHEATSHEET],
  ["Manifesto", MANIFESTO],
  ["GitHub", GITHUB],
]

export function Nav() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="chassis mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-md pr-3 pl-4 sm:pl-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-inherit no-underline"
        >
          <Image
            src="/logo-small.png"
            alt=""
            width={30}
            height={30}
            priority
            className="rounded-[7px]"
          />
          <span className="font-brand text-lg font-medium tracking-tight">
            agentenna
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 sm:flex">
          {LINKS.map(([name, href]) => (
            <a
              key={name}
              href={href}
              className="font-brand text-dim hover:text-foreground rounded-sm px-3 py-2 text-sm font-medium no-underline transition-colors duration-100 hover:bg-white/4"
            >
              {name}
            </a>
          ))}
        </nav>

        <span className="ag-label-sm text-muted ml-auto hidden items-center gap-2 pr-3 md:flex">
          <span className="bg-lime animate-led-pulse size-1.5 rounded-full" />
          Live
        </span>

        <a
          href={QUICKSTART}
          className="bg-signal hover:bg-signal-hover active:bg-signal-pressed font-brand ml-auto inline-flex h-9 items-center gap-1.5 rounded-sm border border-white/12 px-3.5 text-sm font-medium text-white no-underline transition-colors duration-100 md:ml-0"
        >
          Get started
          <ArrowUpRight size={14} strokeWidth={2} />
        </a>
      </div>
    </header>
  )
}
