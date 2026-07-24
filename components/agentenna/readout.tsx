import * as React from "react"

import { cn } from "@/lib/utils"

/* Readout — a labelled mono value (timestamps, counts, rates). Falls back to
   on-rack text colors when used outside a tone scope. */

export interface ReadoutProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode
  value: React.ReactNode
}

const Readout = React.forwardRef<HTMLDivElement, ReadoutProps>(
  ({ className, label, value, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex min-w-0 flex-col gap-1", className)}
      {...props}
    >
      <span className="ag-label-sm text-[var(--ag-text-muted,var(--text-on-rack-muted))]">
        {label}
      </span>
      <span className="truncate font-mono text-[13px] leading-none font-medium text-[var(--ag-text,var(--text-on-rack))]">
        {value}
      </span>
    </div>
  )
)
Readout.displayName = "Readout"

export { Readout }
