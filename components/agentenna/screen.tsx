import * as React from "react"

import { cn } from "@/lib/utils"

/* Screen — the dark inset data surface (terminal, event feed, timeline,
   readout wells). Sinks deepest of all sections; always mono. Stamps the
   chassis tone so nested elements and controls read dark-tone tokens. */

export const screenSurface =
  "min-w-0 rounded-[4px] border-2 border-[var(--border-strong)] bg-[var(--screen)] font-mono text-[12px] leading-[1.7] text-[var(--text-on-dark)] shadow-[var(--shadow-screen)]"

const Screen = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-ag-tone="chassis"
    className={cn(screenSurface, "p-3", className)}
    {...props}
  />
))
Screen.displayName = "Screen"

export { Screen }
