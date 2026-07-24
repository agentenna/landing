import * as React from "react"

import { cn } from "@/lib/utils"
import { Led, type LedStatus } from "./led"
import { Screen } from "./screen"

/* Terminal — a composed Screen with a title rail, typed lines, and an
   optional footer. Not a separate visual system: everything dark and mono
   comes from Screen. */

export interface TerminalLine {
  text: string
  kind?: "cmd" | "out" | "ok" | "err" | "dim"
}

const LINE_CLASSES: Record<NonNullable<TerminalLine["kind"]>, string> = {
  cmd: "font-medium text-[var(--text-on-dark)]",
  out: "text-[color-mix(in_srgb,var(--text-on-dark)_82%,var(--screen))]",
  ok: "text-[var(--led-ok)]",
  err: "text-[var(--signal)]",
  dim: "text-[var(--text-on-dark-muted)]",
}

export interface TerminalProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: React.ReactNode
  lines?: TerminalLine[]
  footer?: React.ReactNode
  meta?: React.ReactNode
  status?: LedStatus
}

const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      className,
      title,
      lines,
      footer,
      meta,
      status = "online",
      children,
      ...props
    },
    ref
  ) => (
    <Screen ref={ref} className={cn("flex flex-col p-0", className)} {...props}>
      <div className="flex min-h-9 flex-wrap items-center gap-2 border-b border-[rgba(255,255,255,0.07)] px-3 py-1.5">
        <Led status={status} size="sm" />
        <span className="ag-label text-[var(--text-on-dark)]">{title}</span>
        {meta != null && (
          <span className="ml-auto pl-2 ag-label-sm text-[var(--text-on-dark-muted)]">
            {meta}
          </span>
        )}
      </div>
      <div className="flex-1 p-3">
        {lines?.map((line, i) => (
          <div
            key={i}
            className={cn(
              "break-words whitespace-pre-wrap",
              LINE_CLASSES[line.kind ?? "out"]
            )}
          >
            {line.kind === "cmd" ? (
              <>
                <span className="text-[var(--text-on-dark-muted)] select-none">
                  {"$ "}
                </span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
        {children}
      </div>
      {footer != null && (
        <div className="border-t border-[rgba(255,255,255,0.07)] px-3 py-2">
          {footer}
        </div>
      )}
    </Screen>
  )
)
Terminal.displayName = "Terminal"

export { Terminal }
